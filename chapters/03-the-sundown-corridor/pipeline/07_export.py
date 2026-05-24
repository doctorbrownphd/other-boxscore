"""
07_export.py -- Assemble all pipeline outputs into visualization-ready JSON.

Final phase of the Sundown Corridor pipeline.

Input:  All data/ outputs from Steps 1-6.

Output: data/viz_corridor_map.json    (for Fig 01 -- game locations + sundown towns)
        data/viz_route_danger.json    (for Fig 02 -- route segments with danger scores)
        data/viz_proximity.json       (for Fig 03 -- ballpark proximity rankings)
        data/meta.json                (headline stats for the chapter)

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

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

PIPELINE_DIR = Path(__file__).resolve().parent
CHAPTER_DIR = PIPELINE_DIR.parent
DATA_DIR = CHAPTER_DIR / "data"
CH02_DATA_DIR = CHAPTER_DIR.parent / "02-the-green-book-route" / "data"

DATA_DIR.mkdir(parents=True, exist_ok=True)

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
# Data loaders
# ---------------------------------------------------------------------------

def load_sundown_towns() -> list[dict[str, Any]]:
    """Load the sundown towns dataset."""
    path = DATA_DIR / "sundown_towns.json"
    raw = _load_json_safe(path, "Sundown towns")
    if raw is None:
        return []
    return raw.get("sundown_towns", [])


def load_ballpark_proximity() -> list[dict[str, Any]]:
    """Load ballpark proximity data."""
    path = DATA_DIR / "ballpark_proximity.json"
    raw = _load_json_safe(path, "Ballpark proximity")
    if raw is None:
        return []
    return raw.get("ballpark_proximity", [])


def load_corridor_scores() -> list[dict[str, Any]]:
    """Load corridor danger scores."""
    path = DATA_DIR / "corridor_scores.json"
    raw = _load_json_safe(path, "Corridor scores")
    if raw is None:
        return []
    return raw.get("corridor_scores", [])


def load_counterfactuals() -> list[dict[str, Any]]:
    """Load counterfactual route analysis."""
    path = DATA_DIR / "counterfactual_routes.json"
    raw = _load_json_safe(path, "Counterfactual routes")
    if raw is None:
        return []
    return raw.get("counterfactual_routes", [])


def load_case_studies() -> list[dict[str, Any]]:
    """Load case study selections."""
    path = DATA_DIR / "case_studies.json"
    raw = _load_json_safe(path, "Case studies")
    if raw is None:
        return []
    return raw.get("case_studies", [])


def load_narratives() -> dict[int, str]:
    """Load narratives keyed by case study number."""
    path = DATA_DIR / "narratives.json"
    raw = _load_json_safe(path, "Narratives")
    if raw is None:
        return {}
    narr_list = raw.get("narratives", [])
    return {
        n.get("case_study_number", 0): n.get("narrative", "")
        for n in narr_list
    }


def load_schedule() -> list[dict[str, Any]]:
    """Load the game schedule from Ch. 02."""
    path = CH02_DATA_DIR / "schedule_1936_1948.json"
    raw = _load_json_safe(path, "Schedule")
    if raw is None:
        return []
    return raw.get("games", [])


# ---------------------------------------------------------------------------
# Build functions for each output file
# ---------------------------------------------------------------------------

def build_corridor_map(
    schedule: list[dict[str, Any]],
    sundown_towns: list[dict[str, Any]],
) -> dict[str, Any]:
    """Build viz_corridor_map.json -- game locations + sundown towns for Fig 01.

    This powers the toggle-reveal map: amber dots for game locations,
    oxblood dots for documented sundown towns.

    Args:
        schedule: Game schedule records.
        sundown_towns: Documented sundown town records.

    Returns:
        Visualization-ready data structure.
    """
    # Aggregate game locations
    game_locations: dict[str, dict[str, Any]] = {}
    for game in schedule:
        city = game.get("city", "")
        state = game.get("state", "")
        lat = game.get("lat")
        lon = game.get("lon")
        year = game.get("year", 0)

        if lat is None or lon is None:
            continue

        key = f"{city}|{state}"
        if key not in game_locations:
            game_locations[key] = {
                "city": city,
                "state": state,
                "lat": lat,
                "lon": lon,
                "game_count": 0,
                "seasons": set(),
            }
        game_locations[key]["game_count"] += 1
        game_locations[key]["seasons"].add(year)

    # Convert sets to sorted lists for JSON
    locations = []
    for loc in game_locations.values():
        locations.append({
            "city": loc["city"],
            "state": loc["state"],
            "lat": loc["lat"],
            "lon": loc["lon"],
            "game_count": loc["game_count"],
            "seasons": sorted(loc["seasons"]),
            "layer": "game_location",
        })

    # Sundown towns for the toggle layer
    sundown_points = []
    for town in sundown_towns:
        lat = town.get("lat")
        lon = town.get("lon")
        if lat is None or lon is None:
            continue
        sundown_points.append({
            "town_name": town.get("town_name", ""),
            "state": town.get("state", ""),
            "lat": lat,
            "lon": lon,
            "evidence_tier": town.get("evidence_tier", "Possible"),
            "opacity": {
                "Confirmed": 1.0,
                "Probable": 0.7,
                "Possible": 0.4,
            }.get(town.get("evidence_tier", "Possible"), 0.4),
            "layer": "sundown_corridor",
        })

    return {
        "game_locations": locations,
        "sundown_towns": sundown_points,
        "total_game_locations": len(locations),
        "total_sundown_towns": len(sundown_points),
    }


def build_route_danger(
    corridor_scores: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """Build viz_route_danger.json -- route segments with danger scores for Fig 02.

    Args:
        corridor_scores: Team-season corridor score records.

    Returns:
        List of route segment records for visualization.
    """
    segments: list[dict[str, Any]] = []

    for entry in corridor_scores:
        team = entry.get("team", "")
        season = entry.get("season", 0)

        for seg in entry.get("segments", []):
            segments.append({
                "team": team,
                "season": season,
                "origin_city": seg.get("origin_city", ""),
                "origin_state": seg.get("origin_state", ""),
                "dest_city": seg.get("dest_city", ""),
                "dest_state": seg.get("dest_state", ""),
                "segment_length_mi": seg.get("segment_length_mi", 0),
                "danger_score": seg.get("weighted_score", 0),
                "total_sundown_towns": seg.get("total_towns", 0),
                "confirmed_towns": seg.get("confirmed_towns", 0),
                "date": seg.get("date", ""),
            })

    return segments


def build_proximity_viz(
    proximity: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """Build viz_proximity.json -- ballpark proximity rankings for Fig 03.

    Args:
        proximity: Ballpark proximity records.

    Returns:
        Visualization-ready proximity data.
    """
    viz_records: list[dict[str, Any]] = []

    for bp in proximity:
        record: dict[str, Any] = {
            "ballpark_name": bp.get("ballpark_name", ""),
            "city": bp.get("city", ""),
            "state": bp.get("state", ""),
            "lat": bp.get("lat"),
            "lon": bp.get("lon"),
        }

        for radius in (10, 25, 50):
            key = f"within_{radius}mi"
            band = bp.get(key, {})
            record[f"sundown_{radius}mi"] = band.get("total", 0)
            record[f"sundown_{radius}mi_weighted"] = band.get("weighted_total", 0)

        viz_records.append(record)

    # Already sorted by 10mi weighted count from 02_proximity_join.py
    return viz_records


def build_meta(
    sundown_towns: list[dict[str, Any]],
    corridor_scores: list[dict[str, Any]],
    proximity: list[dict[str, Any]],
    schedule: list[dict[str, Any]],
    case_studies: list[dict[str, Any]],
) -> dict[str, Any]:
    """Build meta.json -- headline stats for the chapter header.

    Args:
        sundown_towns: All sundown town records.
        corridor_scores: Team-season corridor scores.
        proximity: Ballpark proximity records.
        schedule: Game schedule records.
        case_studies: Selected case studies.

    Returns:
        Headline stats dict.
    """
    # Total documented sundown towns
    total_towns = len(sundown_towns)
    tier_counts = defaultdict(int)
    for town in sundown_towns:
        tier_counts[town.get("evidence_tier", "Possible")] += 1

    # Game location stats
    total_games = len(schedule)
    unique_cities: set[str] = set()
    for game in schedule:
        city = game.get("city", "")
        state = game.get("state", "")
        if city:
            unique_cities.add(f"{city}, {state}")

    # Corridor score stats
    all_scores = [e.get("corridor_danger_score", 0) for e in corridor_scores]
    avg_danger = round(statistics.mean(all_scores), 2) if all_scores else 0.0
    max_danger = max(all_scores) if all_scores else 0.0

    most_exposed = ""
    if corridor_scores:
        top = corridor_scores[0]  # Already sorted descending
        most_exposed = f"{top.get('team', '')} {top.get('season', '')}"

    # Proximity stats
    max_10mi = 0
    max_10mi_park = ""
    for bp in proximity:
        count = bp.get("within_10mi", {}).get("total", 0)
        if count > max_10mi:
            max_10mi = count
            max_10mi_park = bp.get("ballpark_name", "")

    # Teams and seasons
    teams: set[str] = set()
    seasons: set[int] = set()
    for game in schedule:
        teams.add(game.get("home_team", ""))
        teams.add(game.get("away_team", ""))
        seasons.add(game.get("year", 0))
    teams.discard("")
    seasons.discard(0)

    return {
        "total_documented_sundown_towns": total_towns,
        "tier_counts": dict(tier_counts),
        "total_games": total_games,
        "total_game_cities": len(unique_cities),
        "teams_covered": len(teams),
        "seasons_covered": f"{min(seasons)}--{max(seasons)}" if seasons else "",
        "avg_corridor_danger_score": avg_danger,
        "max_corridor_danger_score": max_danger,
        "most_exposed_team_season": most_exposed,
        "max_sundown_towns_within_10mi": max_10mi,
        "max_10mi_ballpark": max_10mi_park,
        "total_case_studies": len(case_studies),
        "incompleteness_note": (
            "Every number in this chapter is a lower bound. The documented "
            "database captures a fraction of actual sundown places. The actual "
            "danger was greater than the data shows."
        ),
    }


# ---------------------------------------------------------------------------
# Summary logging
# ---------------------------------------------------------------------------

def _log_export_summary(
    corridor_map: dict[str, Any],
    route_danger: list[dict[str, Any]],
    proximity_viz: list[dict[str, Any]],
    meta: dict[str, Any],
) -> None:
    """Log a human-readable summary of what was exported."""
    log.info("=" * 60)
    log.info("EXPORT SUMMARY")
    log.info("=" * 60)
    log.info(
        "viz_corridor_map.json: %d game locations, %d sundown towns",
        corridor_map.get("total_game_locations", 0),
        corridor_map.get("total_sundown_towns", 0),
    )
    log.info("viz_route_danger.json: %d route segments", len(route_danger))
    log.info("viz_proximity.json: %d ballparks", len(proximity_viz))
    log.info("meta.json:")
    log.info("  Documented sundown towns: %d", meta.get("total_documented_sundown_towns", 0))
    log.info("  Total games: %d", meta.get("total_games", 0))
    log.info("  Game cities: %d", meta.get("total_game_cities", 0))
    log.info("  Avg danger score: %.2f", meta.get("avg_corridor_danger_score", 0))
    log.info("  Most exposed: %s", meta.get("most_exposed_team_season", ""))
    log.info("  Max 10mi count: %d (%s)",
             meta.get("max_sundown_towns_within_10mi", 0),
             meta.get("max_10mi_ballpark", ""))
    log.info("=" * 60)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    """Run the export pipeline -- final phase."""
    log.info("Export pipeline -- final phase")

    # 1. Load all upstream data
    sundown_towns = load_sundown_towns()
    proximity = load_ballpark_proximity()
    corridor_scores = load_corridor_scores()
    _counterfactuals = load_counterfactuals()  # Available for future enrichment
    case_studies = load_case_studies()
    _narratives = load_narratives()  # Available for future enrichment
    schedule = load_schedule()

    # 2. Build viz_corridor_map.json (Fig 01)
    log.info("Building viz_corridor_map.json (Fig 01)...")
    corridor_map = build_corridor_map(schedule, sundown_towns)

    # 3. Build viz_route_danger.json (Fig 02)
    log.info("Building viz_route_danger.json (Fig 02)...")
    route_danger = build_route_danger(corridor_scores)

    # 4. Build viz_proximity.json (Fig 03)
    log.info("Building viz_proximity.json (Fig 03)...")
    proximity_viz = build_proximity_viz(proximity)

    # 5. Build meta.json
    log.info("Building meta.json...")
    meta = build_meta(sundown_towns, corridor_scores, proximity, schedule, case_studies)

    # 6. Write output files
    _save_json(DATA_DIR / "viz_corridor_map.json", corridor_map)
    _save_json(DATA_DIR / "viz_route_danger.json", route_danger)
    _save_json(DATA_DIR / "viz_proximity.json", proximity_viz)
    _save_json(DATA_DIR / "meta.json", meta)

    # 7. Log summary
    _log_export_summary(corridor_map, route_danger, proximity_viz, meta)

    log.info("Export pipeline complete.")


if __name__ == "__main__":
    main()
