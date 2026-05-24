"""
03_corridor_score.py -- M1: Corridor Danger Score calculation.

Phase 4 of the Sundown Corridor pipeline.

Input:  data/sundown_towns.json              (from 01_sundown_data.py)
        data/ballpark_proximity.json          (from 02_proximity_join.py)
        ../02-the-green-book-route/data/schedule_1936_1948.json  (from Ch. 02)
        ../02-the-green-book-route/data/safety_scores.json       (from Ch. 02, optional)

Output: data/corridor_scores.json
        One record per team-season: total documented sundown towns on route,
        weighted by evidence quality and time of travel, with lower bound
        (confirmed-only) and upper bound (extrapolated) uncertainty.

Method: For each team-season, reconstruct the sequence of game cities.
        For each consecutive pair (route segment), calculate the great-circle
        path and count documented sundown towns within 5mi of the segment.
        Weight by evidence quality. Aggregate to a season-level Corridor
        Danger Score with uncertainty bounds.

Gate:   Elias reviews score construction and bounds.
"""

from __future__ import annotations

import json
import logging
import math
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

SUNDOWN_PATH = DATA_DIR / "sundown_towns.json"
PROXIMITY_PATH = DATA_DIR / "ballpark_proximity.json"
SCHEDULE_PATH = CH02_DATA_DIR / "schedule_1936_1948.json"
SAFETY_SCORES_PATH = CH02_DATA_DIR / "safety_scores.json"
OUTPUT_PATH = DATA_DIR / "corridor_scores.json"

DATA_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------

# Distance from route segment to count a sundown town (miles)
CORRIDOR_RADIUS_MI: float = 5.0

# Evidence quality weights
EVIDENCE_WEIGHTS: dict[str, float] = {
    "Confirmed": 1.0,
    "Probable": 0.7,
    "Possible": 0.4,
}

# Night travel multiplier -- sundown enforcement was time-specific.
# Night travel through a sundown town is weighted higher.
# This is a preliminary value subject to Elias review.
NIGHT_TRAVEL_MULTIPLIER: float = 1.5

# Illinois documentation rate -- used to extrapolate upper bound.
# 70% of Illinois towns were estimated to be sundown towns.
ILLINOIS_DOCUMENTATION_RATE: float = 0.70

# Estimated fraction of actual sundown towns captured in the database
# nationally. Derived from Illinois analysis.
ESTIMATED_CAPTURE_RATE: float = 0.15

# Earth radius in miles
EARTH_RADIUS_MI: float = 3958.8


# ---------------------------------------------------------------------------
# Geometry helpers
# ---------------------------------------------------------------------------

def haversine_miles(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate the great-circle distance between two points in miles."""
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    c = 2 * math.asin(math.sqrt(a))
    return EARTH_RADIUS_MI * c


def point_to_segment_distance_mi(
    p_lat: float,
    p_lon: float,
    a_lat: float,
    a_lon: float,
    b_lat: float,
    b_lon: float,
) -> float:
    """Approximate minimum distance from point P to line segment A-B in miles.

    Uses an equirectangular projection for efficiency. This is accurate
    enough for the short distances involved (< 50 miles).

    Args:
        p_lat, p_lon: The point (sundown town).
        a_lat, a_lon: Segment start (origin city).
        b_lat, b_lon: Segment end (destination city).

    Returns:
        Distance in statute miles.
    """
    # Convert to approximate Cartesian (miles from segment midpoint)
    mid_lat = (a_lat + b_lat) / 2
    cos_mid = math.cos(math.radians(mid_lat))

    # Project to plane (approximate miles)
    def to_xy(lat: float, lon: float) -> tuple[float, float]:
        x = math.radians(lon - a_lon) * cos_mid * EARTH_RADIUS_MI
        y = math.radians(lat - a_lat) * EARTH_RADIUS_MI
        return x, y

    ax, ay = 0.0, 0.0
    bx, by = to_xy(b_lat, b_lon)
    px, py = to_xy(p_lat, p_lon)

    # Vector math: project P onto AB, clamp to segment
    dx = bx - ax
    dy = by - ay
    seg_len_sq = dx * dx + dy * dy

    if seg_len_sq < 1e-10:
        # A and B are the same point
        return math.sqrt((px - ax) ** 2 + (py - ay) ** 2)

    t = max(0.0, min(1.0, ((px - ax) * dx + (py - ay) * dy) / seg_len_sq))
    proj_x = ax + t * dx
    proj_y = ay + t * dy

    return math.sqrt((px - proj_x) ** 2 + (py - proj_y) ** 2)


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------

def load_sundown_towns() -> list[dict[str, Any]]:
    """Load the sundown towns dataset."""
    if not SUNDOWN_PATH.exists():
        raise FileNotFoundError(
            f"Sundown towns data not found at {SUNDOWN_PATH}. "
            f"Run 01_sundown_data.py first."
        )
    with SUNDOWN_PATH.open("r", encoding="utf-8") as f:
        data = json.load(f)
    towns = data.get("sundown_towns", [])
    log.info("Loaded %d sundown town records.", len(towns))
    return towns


def load_schedule() -> list[dict[str, Any]]:
    """Load the game schedule from Ch. 02."""
    if not SCHEDULE_PATH.exists():
        raise FileNotFoundError(
            f"Schedule not found at {SCHEDULE_PATH}. "
            f"Run Chapter 02 pipeline first."
        )
    with SCHEDULE_PATH.open("r", encoding="utf-8") as f:
        data = json.load(f)
    games = data.get("games", [])
    log.info("Loaded %d game records from schedule.", len(games))
    return games


def load_safety_scores() -> dict[str, float]:
    """Load Green Book safety scores from Ch. 02 (optional).

    Returns a mapping of city|state to average safety score.
    Returns empty dict if file is missing.
    """
    if not SAFETY_SCORES_PATH.exists():
        log.warning(
            "Safety scores not found at %s -- Green Book mitigation "
            "adjustment will be skipped.",
            SAFETY_SCORES_PATH,
        )
        return {}

    with SAFETY_SCORES_PATH.open("r", encoding="utf-8") as f:
        data = json.load(f)

    scores: dict[str, list[float]] = defaultdict(list)
    for game in data.get("games", []):
        city = game.get("city", "")
        state = game.get("state", "")
        composite = game.get("composite_score", 0.0)
        if city:
            key = f"{city}|{state}"
            scores[key].append(composite)

    # Average per city
    return {
        key: sum(vals) / len(vals)
        for key, vals in scores.items()
    }


# ---------------------------------------------------------------------------
# Route segment construction
# ---------------------------------------------------------------------------

def build_team_routes(
    games: list[dict[str, Any]],
) -> dict[str, list[dict[str, Any]]]:
    """Group games by team-season and build ordered route sequences.

    A team's route is the chronological sequence of cities it visited
    (as either home or away team). Consecutive games in the same city
    are collapsed into a single stop.

    Args:
        games: All game records from the schedule.

    Returns:
        Dict mapping "team|season" to ordered list of stop records.
    """
    team_games: dict[str, list[dict[str, Any]]] = defaultdict(list)

    for game in games:
        year = game.get("year", 0)
        for team_field in ("home_team", "away_team"):
            team = game.get(team_field, "")
            if not team:
                continue
            key = f"{team}|{year}"
            team_games[key].append(game)

    # Build route sequences
    routes: dict[str, list[dict[str, Any]]] = {}
    for ts_key, ts_games in team_games.items():
        # Sort chronologically
        ts_games.sort(key=lambda g: g.get("date", ""))

        # Collapse consecutive same-city stops
        stops: list[dict[str, Any]] = []
        for game in ts_games:
            city = game.get("city", "")
            state = game.get("state", "")
            lat = game.get("lat")
            lon = game.get("lon")

            if lat is None or lon is None:
                continue

            city_key = f"{city}|{state}"
            if stops and stops[-1].get("city_key") == city_key:
                stops[-1]["game_count"] += 1
                continue

            stops.append({
                "city": city,
                "state": state,
                "city_key": city_key,
                "lat": float(lat),
                "lon": float(lon),
                "date": game.get("date", ""),
                "game_count": 1,
            })

        if len(stops) >= 2:
            routes[ts_key] = stops

    log.info("Built routes for %d team-season combinations.", len(routes))
    return routes


# ---------------------------------------------------------------------------
# Corridor Danger Score calculation
# ---------------------------------------------------------------------------

def score_route_segment(
    a_lat: float,
    a_lon: float,
    b_lat: float,
    b_lon: float,
    sundown_towns: list[dict[str, Any]],
    radius_mi: float = CORRIDOR_RADIUS_MI,
) -> dict[str, Any]:
    """Score a single route segment for sundown town exposure.

    Args:
        a_lat, a_lon: Origin city coordinates.
        b_lat, b_lon: Destination city coordinates.
        sundown_towns: All sundown town records.
        radius_mi: Maximum distance from route to count a town.

    Returns:
        Dict with segment scoring details.
    """
    segment_length_mi = haversine_miles(a_lat, a_lon, b_lat, b_lon)

    towns_in_corridor: list[dict[str, Any]] = []
    confirmed_count = 0
    weighted_sum = 0.0

    for town in sundown_towns:
        t_lat = town.get("lat")
        t_lon = town.get("lon")
        if t_lat is None or t_lon is None:
            continue

        dist = point_to_segment_distance_mi(
            float(t_lat), float(t_lon),
            a_lat, a_lon,
            b_lat, b_lon,
        )

        if dist <= radius_mi:
            tier = town.get("evidence_tier", "Possible")
            weight = EVIDENCE_WEIGHTS.get(tier, 0.4)
            weighted_sum += weight

            if tier == "Confirmed":
                confirmed_count += 1

            towns_in_corridor.append({
                "town_name": town.get("town_name", ""),
                "state": town.get("state", ""),
                "evidence_tier": tier,
                "distance_from_route_mi": round(dist, 2),
            })

    return {
        "segment_length_mi": round(segment_length_mi, 1),
        "total_towns": len(towns_in_corridor),
        "confirmed_towns": confirmed_count,
        "weighted_score": round(weighted_sum, 2),
        "towns": towns_in_corridor,
    }


def calculate_corridor_scores(
    routes: dict[str, list[dict[str, Any]]],
    sundown_towns: list[dict[str, Any]],
    safety_scores: dict[str, float],
) -> list[dict[str, Any]]:
    """Calculate the Corridor Danger Score for every team-season.

    Args:
        routes: Team-season route sequences from build_team_routes.
        sundown_towns: All sundown town records.
        safety_scores: Green Book safety scores by city (optional mitigation).

    Returns:
        List of corridor score records, one per team-season.
    """
    results: list[dict[str, Any]] = []

    for ts_key, stops in sorted(routes.items()):
        team, season_str = ts_key.rsplit("|", 1)
        season = int(season_str)

        segments: list[dict[str, Any]] = []
        total_weighted = 0.0
        total_confirmed = 0
        total_towns = 0
        total_distance_mi = 0.0

        # Score each consecutive segment
        for i in range(len(stops) - 1):
            origin = stops[i]
            dest = stops[i + 1]

            seg_score = score_route_segment(
                origin["lat"], origin["lon"],
                dest["lat"], dest["lon"],
                sundown_towns,
            )

            # Apply night travel multiplier (placeholder -- all segments
            # treated as potentially including night travel for now)
            seg_score["night_adjusted_score"] = round(
                seg_score["weighted_score"] * NIGHT_TRAVEL_MULTIPLIER, 2
            )

            segments.append({
                "origin_city": origin["city"],
                "origin_state": origin["state"],
                "dest_city": dest["city"],
                "dest_state": dest["state"],
                "date": dest.get("date", ""),
                **seg_score,
            })

            total_weighted += seg_score["weighted_score"]
            total_confirmed += seg_score["confirmed_towns"]
            total_towns += seg_score["total_towns"]
            total_distance_mi += seg_score["segment_length_mi"]

        # Green Book mitigation adjustment
        mitigation = 0.0
        if safety_scores:
            city_keys = {s["city_key"] for s in stops}
            gb_scores = [
                safety_scores[ck]
                for ck in city_keys
                if ck in safety_scores
            ]
            if gb_scores:
                mitigation = sum(gb_scores) / len(gb_scores)

        # Calculate bounds
        # Lower bound: confirmed towns only, no night multiplier
        lower_bound = float(total_confirmed)

        # Upper bound: extrapolate from estimated capture rate
        upper_bound = total_weighted / ESTIMATED_CAPTURE_RATE if total_weighted > 0 else 0.0

        corridor_score: dict[str, Any] = {
            "team": team,
            "season": season,
            "total_segments": len(segments),
            "total_route_miles": round(total_distance_mi, 1),
            "total_sundown_towns_on_route": total_towns,
            "total_confirmed_on_route": total_confirmed,
            "corridor_danger_score": round(total_weighted, 2),
            "lower_bound": round(lower_bound, 2),
            "upper_bound": round(upper_bound, 2),
            "green_book_mitigation": round(mitigation, 4),
            "segments": segments,
        }
        results.append(corridor_score)

    # Sort by corridor danger score descending
    results.sort(key=lambda r: r["corridor_danger_score"], reverse=True)

    return results


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------

def main() -> None:
    """Run the Corridor Danger Score pipeline -- Phase 4."""
    log.info("Corridor Danger Score (M1) -- Phase 4")
    log.info("Corridor radius: %.1f miles", CORRIDOR_RADIUS_MI)
    log.info("Output: %s", OUTPUT_PATH)

    # 1. Load data
    sundown_towns = load_sundown_towns()
    games = load_schedule()
    safety_scores = load_safety_scores()

    # 2. Build team routes
    routes = build_team_routes(games)

    # 3. Calculate corridor scores
    log.info(
        "Calculating corridor scores for %d team-seasons "
        "against %d sundown towns...",
        len(routes), len(sundown_towns),
    )
    scores = calculate_corridor_scores(routes, sundown_towns, safety_scores)

    # 4. Write output
    output: dict[str, Any] = {
        "pipeline_version": "1.0",
        "corridor_radius_mi": CORRIDOR_RADIUS_MI,
        "evidence_weights": EVIDENCE_WEIGHTS,
        "night_travel_multiplier": NIGHT_TRAVEL_MULTIPLIER,
        "estimated_capture_rate": ESTIMATED_CAPTURE_RATE,
        "total_team_seasons": len(scores),
        "corridor_scores": scores,
    }

    OUTPUT_PATH.write_text(
        json.dumps(output, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    log.info("Wrote %d corridor scores to %s", len(scores), OUTPUT_PATH)

    # 5. Log summary
    log.info("=" * 60)
    log.info("CORRIDOR DANGER SCORE SUMMARY")
    if scores:
        top5 = scores[:5]
        log.info("Top 5 most exposed team-seasons:")
        for rank, entry in enumerate(top5, 1):
            log.info(
                "  %d. %s %d -- score=%.2f (lower=%.2f, upper=%.2f, "
                "towns=%d, miles=%.0f)",
                rank,
                entry["team"],
                entry["season"],
                entry["corridor_danger_score"],
                entry["lower_bound"],
                entry["upper_bound"],
                entry["total_sundown_towns_on_route"],
                entry["total_route_miles"],
            )
    log.info("=" * 60)


if __name__ == "__main__":
    main()
