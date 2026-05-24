"""
07_export.py -- Assemble all pipeline outputs into visualization-ready JSON.

Phase 6 of the Green Book Route pipeline.

Input:  All data/ outputs from Steps 1-6.

Output: data/viz_route_animation.json   (per team-season, for Fig 01)
        data/viz_league_map.json         (aggregate, for Fig 02)
        data/viz_heatmap.json            (regional summary, for Fig 03)
        data/meta.json                   (headline stats for the chapter)

Gate:   Vera reviews output format for visualization compatibility.
"""

from __future__ import annotations

import json
import logging
import statistics
from collections import defaultdict
from pathlib import Path
from typing import Any

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

# ---------------------------------------------------------------------------
# Region classification boundaries (matches 04_route_clustering.py).
# ---------------------------------------------------------------------------
# Northeast:    lon > -80, lat > 39
# Mid-Atlantic: lon > -80, lat 36--39
# Southeast:    lon > -85, lat < 36
# Midwest:      lon -85 to -95, lat > 36
# Deep South:   lon -85 to -95, lat < 36
# Plains:       lon < -95


def classify_region(lat: float, lon: float) -> str:
    """Assign a US region label based on latitude and longitude.

    The region boundaries are intentionally coarse -- they capture the
    broad geographic patterns in the Negro Leagues schedule, not precise
    political boundaries.
    """
    if lon > -80:
        if lat > 39:
            return "Northeast"
        if lat >= 36:
            return "Mid-Atlantic"
        return "Southeast"
    if lon > -85:
        # lon is in (-85, -80]
        if lat < 36:
            return "Southeast"
        return "Midwest"
    if lon >= -95:
        if lat >= 36:
            return "Midwest"
        return "Deep South"
    return "Plains"


# ---------------------------------------------------------------------------
# I/O helpers
# ---------------------------------------------------------------------------

def _load_json(path: Path) -> Any:
    """Load a JSON file and return its parsed content."""
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def _load_json_safe(path: Path, label: str) -> Any | None:
    """Load a JSON file, returning None (with a warning) if it is missing."""
    if not path.exists():
        log.warning("%s not found at %s -- using defaults.", label, path)
        return None
    return _load_json(path)


def _save_json(path: Path, data: Any) -> None:
    """Write data to a JSON file with readable formatting."""
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    log.info("Wrote %s", path)


# ---------------------------------------------------------------------------
# Data loaders -- each returns a usable default when the file is absent.
# ---------------------------------------------------------------------------

def load_schedule() -> list[dict[str, Any]]:
    """Load the game schedule. Required -- exits if missing."""
    path = DATA_DIR / "schedule_1936_1948.json"
    if not path.exists():
        log.error("Schedule file not found: %s", path)
        raise SystemExit(1)
    data = _load_json(path)
    games: list[dict[str, Any]] = data.get("games", [])
    log.info("Loaded %d games from schedule.", len(games))
    return games


def load_safety_scores() -> dict[int, dict[str, Any]]:
    """Load safety scores keyed by game_index.

    Returns an empty dict if the file does not exist, so downstream
    code falls back to a default score of 0.0.
    """
    path = DATA_DIR / "safety_scores.json"
    raw = _load_json_safe(path, "Safety scores")
    if raw is None:
        return {}
    scored_games: list[dict[str, Any]] = raw.get("games", [])
    return {g["game_index"]: g for g in scored_games}


def load_route_clusters() -> dict[str, str]:
    """Load route cluster labels keyed by 'team|season'.

    Returns an empty dict if the file does not exist.
    """
    path = DATA_DIR / "route_clusters.json"
    raw = _load_json_safe(path, "Route clusters")
    if raw is None:
        return {}
    # Expected structure: {"clusters": [{"team": ..., "season": ...,
    #   "cluster_label": ...}, ...]}
    clusters: list[dict[str, Any]] = []
    if isinstance(raw, dict):
        clusters = raw.get("clusters", [])
    elif isinstance(raw, list):
        clusters = raw
    mapping: dict[str, str] = {}
    for c in clusters:
        key = f"{c.get('team', '')}|{c.get('season', '')}"
        mapping[key] = c.get("cluster_label", "unclassified")
    return mapping


def load_narratives() -> dict[str, str | None]:
    """Load AI-generated narratives keyed by 'team|season'.

    Returns an empty dict if the file does not exist.
    """
    path = DATA_DIR / "narratives.json"
    raw = _load_json_safe(path, "Narratives")
    if raw is None:
        return {}
    narr_list: list[dict[str, Any]] = []
    if isinstance(raw, dict):
        narr_list = raw.get("narratives", [])
    elif isinstance(raw, list):
        narr_list = raw
    mapping: dict[str, str | None] = {}
    for n in narr_list:
        key = f"{n.get('team', '')}|{n.get('season', '')}"
        mapping[key] = n.get("narrative")
    return mapping


def load_green_book_listings() -> list[dict[str, Any]]:
    """Load geocoded Green Book listings.

    Returns an empty list if the file does not exist.
    """
    path = DATA_DIR / "green_book_listings.json"
    raw = _load_json_safe(path, "Green Book listings")
    if raw is None:
        return []
    if isinstance(raw, dict):
        return raw.get("listings", [])
    if isinstance(raw, list):
        return raw
    return []


def load_ballparks() -> dict[str, dict[str, Any]]:
    """Load ballpark data keyed by ballpark_id."""
    path = DATA_DIR / "ballparks.json"
    raw = _load_json_safe(path, "Ballparks")
    if raw is None:
        return {}
    parks: list[dict[str, Any]] = raw.get("ballparks", [])
    return {p["ballpark_id"]: p for p in parks}


# ---------------------------------------------------------------------------
# Green Book listing helpers
# ---------------------------------------------------------------------------

def _listings_near(
    listings: list[dict[str, Any]],
    lat: float,
    lon: float,
    year: int,
    radius_mi: float,
) -> list[dict[str, Any]]:
    """Return Green Book listings within *radius_mi* of (lat, lon) for *year*.

    Each listing is expected to have: lat, lon, year (or edition_year),
    name, category.  Distance is approximated using the equirectangular
    formula -- accurate enough for the short radii involved.
    """
    import math

    results: list[dict[str, Any]] = []
    for entry in listings:
        entry_year = entry.get("year") or entry.get("edition_year")
        if entry_year is not None and int(entry_year) != year:
            continue
        elat = entry.get("lat")
        elon = entry.get("lon")
        if elat is None or elon is None:
            continue
        # Approximate distance in miles (equirectangular).
        dlat = math.radians(float(elat) - lat)
        dlon = math.radians(float(elon) - lon) * math.cos(
            math.radians((lat + float(elat)) / 2)
        )
        dist_mi = math.sqrt(dlat * dlat + dlon * dlon) * 3958.8
        if dist_mi <= radius_mi:
            results.append({
                "name": entry.get("name", ""),
                "category": entry.get("category", ""),
                "distance": round(dist_mi, 2),
            })
    return results


# ---------------------------------------------------------------------------
# Build functions for each output file
# ---------------------------------------------------------------------------

def build_route_animation(
    games: list[dict[str, Any]],
    scores: dict[int, dict[str, Any]],
    clusters: dict[str, str],
    narratives: dict[str, str | None],
    listings: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """Build viz_route_animation.json -- one object per team-season.

    Each object contains an ordered array of stops for one team in one
    season, annotated with safety information and Green Book listings.
    """
    # Group games by (team, season).  A team appears as away_team when
    # traveling, so we build the route from *away* games for each team,
    # plus any home games to capture the full schedule a team experienced.
    # The task spec says "stops" are the cities the team visits, which
    # includes both home and away games.  We gather every game where the
    # team is either home or away, deduplicate by date+city, and order
    # chronologically.

    team_season_games: dict[tuple[str, int], list[dict[str, Any]]] = defaultdict(list)

    for idx, game in enumerate(games):
        year: int = game.get("year", 0)
        home: str = game.get("home_team", "")
        away: str = game.get("away_team", "")

        scored = scores.get(idx, {})
        composite = scored.get("composite_score", 0.0)
        components = scored.get("components", {})
        listings_1mi_count = int(components.get("listings_1mi", 0))
        listings_5mi_count = int(components.get("listings_5mi", 0))

        stop_info: dict[str, Any] = {
            "city": game.get("city", ""),
            "state": game.get("state", ""),
            "lat": game.get("lat"),
            "lon": game.get("lon"),
            "date": game.get("date", ""),
            "ballpark_name": game.get("ballpark_name", ""),
            "listings_1mi": listings_1mi_count,
            "listings_5mi": listings_5mi_count,
            "safety_score": composite,
            "is_dark": listings_1mi_count == 0,
        }

        # Attach the opponent from the perspective of each team.
        home_stop = {**stop_info, "game_opponent": away}
        away_stop = {**stop_info, "game_opponent": home}

        team_season_games[(home, year)].append(home_stop)
        team_season_games[(away, year)].append(away_stop)

    results: list[dict[str, Any]] = []
    for (team, season), stops in sorted(team_season_games.items()):
        # Sort stops chronologically.
        stops.sort(key=lambda s: s.get("date", ""))

        dark_count = sum(1 for s in stops if s["is_dark"])
        cluster_key = f"{team}|{season}"

        results.append({
            "team": team,
            "season": season,
            "stops": stops,
            "dark_count": dark_count,
            "total_stops": len(stops),
            "narrative": narratives.get(cluster_key),
            "cluster_label": clusters.get(cluster_key, "unclassified"),
        })

    return results


def build_league_map(
    games: list[dict[str, Any]],
    scores: dict[int, dict[str, Any]],
    listings: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """Build viz_league_map.json -- aggregate city-level data for Fig 02.

    Each entry represents a unique city that hosted Negro Leagues games,
    with total games, average safety score, and per-season breakdowns.
    """
    city_data: dict[str, dict[str, Any]] = {}

    for idx, game in enumerate(games):
        city = game.get("city", "")
        state = game.get("state", "")
        city_key = f"{city}, {state}"
        year = game.get("year", 0)

        scored = scores.get(idx, {})
        composite = scored.get("composite_score", 0.0)

        if city_key not in city_data:
            city_data[city_key] = {
                "city": city,
                "state": state,
                "lat": game.get("lat"),
                "lon": game.get("lon"),
                "scores": [],
                "games_by_season": defaultdict(int),
            }

        city_data[city_key]["scores"].append(composite)
        city_data[city_key]["games_by_season"][year] += 1

    # Build listings_by_year for each city using Green Book data.
    city_listings_by_year: dict[str, dict[int, list[dict[str, Any]]]] = defaultdict(
        lambda: defaultdict(list)
    )
    for entry in listings:
        ecity = entry.get("city", "")
        estate = entry.get("state", "")
        eyear = entry.get("year") or entry.get("edition_year")
        if not ecity or eyear is None:
            continue
        ekey = f"{ecity}, {estate}"
        if ekey in city_data:
            city_listings_by_year[ekey][int(eyear)].append({
                "name": entry.get("name", ""),
                "category": entry.get("category", ""),
                "distance": entry.get("distance"),
            })

    results: list[dict[str, Any]] = []
    for city_key, info in sorted(city_data.items()):
        avg_score = round(statistics.mean(info["scores"]), 4) if info["scores"] else 0.0
        games_by_season = {
            str(yr): count
            for yr, count in sorted(info["games_by_season"].items())
        }
        lby = city_listings_by_year.get(city_key, {})
        listings_by_year = {
            str(yr): entries
            for yr, entries in sorted(lby.items())
        }

        results.append({
            "city": info["city"],
            "state": info["state"],
            "lat": info["lat"],
            "lon": info["lon"],
            "total_games": len(info["scores"]),
            "avg_safety_score": avg_score,
            "games_by_season": games_by_season,
            "listings_by_year": listings_by_year,
        })

    return results


def build_heatmap(
    games: list[dict[str, Any]],
    scores: dict[int, dict[str, Any]],
) -> list[dict[str, Any]]:
    """Build viz_heatmap.json -- regional safety summary for Fig 03.

    Each record represents one region-season combination with aggregate
    safety statistics.
    """
    # Accumulate per (region, season).
    region_season: dict[tuple[str, int], dict[str, Any]] = defaultdict(
        lambda: {"scores": [], "cities": set()}
    )

    for idx, game in enumerate(games):
        lat = game.get("lat")
        lon = game.get("lon")
        year = game.get("year", 0)
        if lat is None or lon is None:
            continue

        region = classify_region(lat, lon)
        scored = scores.get(idx, {})
        composite = scored.get("composite_score", 0.0)
        components = scored.get("components", {})
        listings_1mi = int(components.get("listings_1mi", 0))

        city_key = f"{game.get('city', '')}, {game.get('state', '')}"

        bucket = region_season[(region, year)]
        bucket["scores"].append(composite)
        bucket["cities"].add((city_key, listings_1mi == 0))

    results: list[dict[str, Any]] = []
    for (region, season), bucket in sorted(region_season.items()):
        city_set = bucket["cities"]
        dark_cities = {c for c, is_dark in city_set if is_dark}
        all_cities = {c for c, _ in city_set}

        avg_score = (
            round(statistics.mean(bucket["scores"]), 4)
            if bucket["scores"]
            else 0.0
        )

        results.append({
            "region": region,
            "season": season,
            "avg_safety_score": avg_score,
            "game_count": len(bucket["scores"]),
            "dark_city_count": len(dark_cities),
            "total_cities": len(all_cities),
        })

    return results


def build_meta(
    games: list[dict[str, Any]],
    scores: dict[int, dict[str, Any]],
    league_map: list[dict[str, Any]],
) -> dict[str, Any]:
    """Build meta.json -- headline stats for the chapter header.

    Computes the key numbers that appear in the chapter's opening section
    and drives the data-driven conclusion text.
    """
    total_games = len(games)

    # Unique cities.
    all_cities: set[str] = set()
    dark_cities_set: set[str] = set()
    city_scores: dict[str, list[float]] = defaultdict(list)

    for idx, game in enumerate(games):
        city_key = f"{game.get('city', '')}, {game.get('state', '')}"
        all_cities.add(city_key)

        scored = scores.get(idx, {})
        composite = scored.get("composite_score", 0.0)
        components = scored.get("components", {})
        listings_1mi = int(components.get("listings_1mi", 0))

        city_scores[city_key].append(composite)
        if listings_1mi == 0:
            dark_cities_set.add(city_key)

    total_cities = len(all_cities)
    total_dark = len(dark_cities_set)
    pct_dark = round(total_dark / total_cities * 100, 1) if total_cities else 0.0

    # Average safety score across all games.
    all_scores_vals = [
        scores.get(i, {}).get("composite_score", 0.0)
        for i in range(total_games)
    ]
    avg_safety = (
        round(statistics.mean(all_scores_vals), 4)
        if all_scores_vals
        else 0.0
    )

    # Darkest and safest city by average composite score.
    city_avg: dict[str, float] = {
        city: round(statistics.mean(sc), 4)
        for city, sc in city_scores.items()
        if sc
    }
    darkest_city = min(city_avg, key=city_avg.get) if city_avg else ""  # type: ignore[arg-type]
    safest_city = max(city_avg, key=city_avg.get) if city_avg else ""  # type: ignore[arg-type]

    # Seasons covered.
    seasons = sorted({g.get("year", 0) for g in games})
    seasons_str = f"{seasons[0]}--{seasons[-1]}" if seasons else ""

    # Teams covered.
    teams: set[str] = set()
    for g in games:
        teams.add(g.get("home_team", ""))
        teams.add(g.get("away_team", ""))
    teams.discard("")

    # Green Book editions used -- infer from listings data or fall back
    # to the documented set from the spec.
    green_book_editions = [1936, 1938, 1940, 1941, 1942, 1947, 1948, 1949]

    return {
        "total_games": total_games,
        "total_cities": total_cities,
        "total_dark_cities": total_dark,
        "pct_dark": pct_dark,
        "avg_safety_score": avg_safety,
        "seasons_covered": seasons_str,
        "teams_covered": len(teams),
        "green_book_editions_used": green_book_editions,
        "darkest_city": darkest_city,
        "safest_city": safest_city,
    }


# ---------------------------------------------------------------------------
# Summary logging
# ---------------------------------------------------------------------------

def _log_export_summary(
    route_animation: list[dict[str, Any]],
    league_map: list[dict[str, Any]],
    heatmap: list[dict[str, Any]],
    meta: dict[str, Any],
) -> None:
    """Log a human-readable summary of what was exported."""
    log.info("=" * 60)
    log.info("EXPORT SUMMARY")
    log.info("=" * 60)
    log.info(
        "viz_route_animation.json: %d team-season records",
        len(route_animation),
    )
    total_stops = sum(r["total_stops"] for r in route_animation)
    total_dark = sum(r["dark_count"] for r in route_animation)
    log.info("  Total stops across all routes: %d", total_stops)
    log.info("  Total dark stops: %d", total_dark)
    log.info("viz_league_map.json: %d cities", len(league_map))
    log.info("viz_heatmap.json: %d region-season records", len(heatmap))
    log.info("meta.json:")
    log.info("  Total games:      %d", meta.get("total_games", 0))
    log.info("  Total cities:     %d", meta.get("total_cities", 0))
    log.info("  Dark cities:      %d", meta.get("total_dark_cities", 0))
    log.info("  Pct dark:         %.1f%%", meta.get("pct_dark", 0))
    log.info("  Avg safety score: %.4f", meta.get("avg_safety_score", 0))
    log.info("  Seasons:          %s", meta.get("seasons_covered", ""))
    log.info("  Teams:            %d", meta.get("teams_covered", 0))
    log.info("  Darkest city:     %s", meta.get("darkest_city", ""))
    log.info("  Safest city:      %s", meta.get("safest_city", ""))
    log.info("=" * 60)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    """Run the export pipeline -- Phase 6."""
    log.info("Export pipeline -- Phase 6")

    # ------------------------------------------------------------------
    # 1. Load all upstream data
    # ------------------------------------------------------------------
    games = load_schedule()
    scores = load_safety_scores()
    clusters = load_route_clusters()
    narratives = load_narratives()
    listings = load_green_book_listings()
    _ballparks = load_ballparks()  # available for future enrichment

    # ------------------------------------------------------------------
    # 2. Build viz_route_animation.json (Fig 01)
    # ------------------------------------------------------------------
    log.info("Building viz_route_animation.json (Fig 01)...")
    route_animation = build_route_animation(
        games, scores, clusters, narratives, listings
    )

    # ------------------------------------------------------------------
    # 3. Build viz_league_map.json (Fig 02)
    # ------------------------------------------------------------------
    log.info("Building viz_league_map.json (Fig 02)...")
    league_map = build_league_map(games, scores, listings)

    # ------------------------------------------------------------------
    # 4. Build viz_heatmap.json (Fig 03)
    # ------------------------------------------------------------------
    log.info("Building viz_heatmap.json (Fig 03)...")
    heatmap = build_heatmap(games, scores)

    # ------------------------------------------------------------------
    # 5. Build meta.json (headline stats)
    # ------------------------------------------------------------------
    log.info("Building meta.json...")
    meta = build_meta(games, scores, league_map)

    # ------------------------------------------------------------------
    # 6. Write output files
    # ------------------------------------------------------------------
    _save_json(DATA_DIR / "viz_route_animation.json", route_animation)
    _save_json(DATA_DIR / "viz_league_map.json", league_map)
    _save_json(DATA_DIR / "viz_heatmap.json", heatmap)
    _save_json(DATA_DIR / "meta.json", meta)

    # ------------------------------------------------------------------
    # 7. Log summary
    # ------------------------------------------------------------------
    _log_export_summary(route_animation, league_map, heatmap, meta)

    log.info("Export pipeline complete.")


if __name__ == "__main__":
    main()
