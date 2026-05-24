"""
04_route_clustering.py -- M1: Cluster recurring road trip circuits.

Phase 4 of the Green Book Route pipeline.

Input:  data/schedule_1936_1948.json (geocoded)
        data/safety_scores.json     (optional -- for safety profiles)

Output: data/route_clusters.json
        Labeled route clusters per team-season with safety profiles.

Method: HDBSCAN unsupervised clustering over game-to-game travel
        vectors. Surfaces structural patterns in the schedule.

Gate:   Oscar reviews clusters for historical plausibility.
"""

from __future__ import annotations

import json
import logging
import math
from collections import defaultdict
from pathlib import Path
from typing import Any

import numpy as np
from sklearn.cluster import HDBSCAN
from sklearn.preprocessing import StandardScaler

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

# ---------------------------------------------------------------------------
# Constants
# ---------------------------------------------------------------------------

PIPELINE_VERSION = "1.0"
MIN_CLUSTER_SIZE = 3
RANDOM_STATE = 42

# Earth radius in miles (for haversine distance).
EARTH_RADIUS_MI = 3958.8

# Dark city threshold: cities with composite safety score at or below
# this value are counted as "dark" (no meaningful safe infrastructure).
# This aligns with the safety score pipeline where dark cities have
# zero listings within 1 mile -- their composite scores cluster near
# this boundary.
DARK_CITY_THRESHOLD = 0.25

# ---------------------------------------------------------------------------
# Region classification boundaries.
# Approximate US regions for auto-labeling route clusters.
# ---------------------------------------------------------------------------

REGION_RULES: list[tuple[str, dict[str, tuple[float | None, float | None]]]] = [
    # (label, {axis: (min_inclusive, max_exclusive)})
    # Evaluated in order -- first match wins.
    ("Northeast",    {"lon": (-80, None),  "lat": (39, None)}),
    ("Mid-Atlantic", {"lon": (-80, None),  "lat": (36, 39)}),
    ("Southeast",    {"lon": (-85, None),  "lat": (None, 36)}),
    ("Midwest",      {"lon": (-95, -85),   "lat": (36, None)}),
    ("Deep South",   {"lon": (-95, -85),   "lat": (None, 36)}),
    ("Plains",       {"lon": (None, -95),  "lat": (None, None)}),
]


# ---------------------------------------------------------------------------
# Utility functions
# ---------------------------------------------------------------------------


def _haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Return the great-circle distance in miles between two points."""
    lat1_r, lon1_r = math.radians(lat1), math.radians(lon1)
    lat2_r, lon2_r = math.radians(lat2), math.radians(lon2)
    dlat = lat2_r - lat1_r
    dlon = lon2_r - lon1_r
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(lat1_r) * math.cos(lat2_r) * math.sin(dlon / 2) ** 2
    )
    return 2 * EARTH_RADIUS_MI * math.asin(math.sqrt(a))


def _classify_region(lat: float, lon: float) -> str:
    """Classify a lat/lon point into a US region label."""
    for label, bounds in REGION_RULES:
        match = True
        for axis, (lo, hi) in bounds.items():
            value = lat if axis == "lat" else lon
            if lo is not None and value < lo:
                match = False
                break
            if hi is not None and value >= hi:
                match = False
                break
        if match:
            return label
    return "Other"


def _direction_label(
    origin_lat: float, origin_lon: float, dest_lat: float, dest_lon: float
) -> str:
    """Return a cardinal/intercardinal direction from origin to destination."""
    dlat = dest_lat - origin_lat
    dlon = dest_lon - origin_lon

    if abs(dlat) < 0.5 and abs(dlon) < 0.5:
        return "Local"

    angle = math.degrees(math.atan2(dlon, dlat))  # north = 0, east = 90
    if angle < 0:
        angle += 360

    directions = [
        (22.5, "North"),
        (67.5, "Northeast"),
        (112.5, "East"),
        (157.5, "Southeast"),
        (202.5, "South"),
        (247.5, "Southwest"),
        (292.5, "West"),
        (337.5, "Northwest"),
        (360.1, "North"),
    ]
    for threshold, name in directions:
        if angle < threshold:
            return name
    return "North"


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------


def load_schedule(path: Path) -> dict[str, Any]:
    """Load the geocoded schedule JSON."""
    log.info("Loading schedule from %s", path)
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)
    game_count = len(data.get("games", []))
    log.info("Loaded %d games.", game_count)
    return data


def load_safety_scores(path: Path) -> dict[str, float] | None:
    """Load safety scores and build a lookup by (city, state, year).

    Returns a dict mapping ``"City|State|Year"`` to composite_score,
    or ``None`` if the file does not exist or cannot be parsed.
    """
    if not path.exists():
        log.warning(
            "safety_scores.json not found at %s -- "
            "clusters will lack safety profiles.",
            path,
        )
        return None

    log.info("Loading safety scores from %s", path)
    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    lookup: dict[str, float] = {}
    for game in data.get("games", []):
        city = game.get("city", "")
        state = game.get("state", "")
        year = game.get("year", 0)
        score = game.get("composite_score")
        if score is not None:
            key = f"{city}|{state}|{year}"
            # Keep the first score seen for each city-state-year
            # (scores should be identical for same location in same year).
            if key not in lookup:
                lookup[key] = score

    log.info("Built safety lookup with %d city-state-year entries.", len(lookup))
    return lookup


# ---------------------------------------------------------------------------
# Travel vector construction
# ---------------------------------------------------------------------------


def build_team_season_games(
    games: list[dict[str, Any]],
) -> dict[str, dict[int, list[dict[str, Any]]]]:
    """Group games by team and season.

    Each team appears in every game it played -- both as home and away.
    Games are sorted chronologically within each team-season.

    Returns:
        Nested dict: team_name -> year -> sorted list of game records.
    """
    team_games: dict[str, dict[int, list[dict[str, Any]]]] = defaultdict(
        lambda: defaultdict(list)
    )

    for game in games:
        year = game.get("year")
        if year is None:
            continue

        # Both teams traveled to this location (or played here).
        for team_key in ("home_team", "away_team"):
            team = game.get(team_key)
            if team:
                team_games[team][year].append(game)

    # Sort each team-season by date.
    for team in team_games:
        for year in team_games[team]:
            team_games[team][year].sort(key=lambda g: g.get("date", ""))

    return dict(team_games)


def compute_travel_vectors(
    games: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """Compute game-to-game travel vectors for a chronological game list.

    Each vector represents the trip between consecutive games and contains:
        origin_lat, origin_lon, dest_lat, dest_lon, distance_miles,
        days_between, origin_city, origin_state, dest_city, dest_state,
        dest_date.
    """
    vectors: list[dict[str, Any]] = []

    for i in range(1, len(games)):
        prev = games[i - 1]
        curr = games[i]

        o_lat = prev.get("lat")
        o_lon = prev.get("lon")
        d_lat = curr.get("lat")
        d_lon = curr.get("lon")

        if any(v is None for v in (o_lat, o_lon, d_lat, d_lon)):
            continue

        distance = _haversine(o_lat, o_lon, d_lat, d_lon)

        # Compute days between games.
        prev_date = prev.get("date", "")
        curr_date = curr.get("date", "")
        days_between = 0
        if prev_date and curr_date:
            try:
                from datetime import date as dt_date

                d1 = dt_date.fromisoformat(prev_date)
                d2 = dt_date.fromisoformat(curr_date)
                days_between = (d2 - d1).days
            except (ValueError, TypeError):
                days_between = 0

        vectors.append({
            "origin_lat": o_lat,
            "origin_lon": o_lon,
            "dest_lat": d_lat,
            "dest_lon": d_lon,
            "distance_miles": round(distance, 1),
            "days_between": days_between,
            "origin_city": prev.get("city", ""),
            "origin_state": prev.get("state", ""),
            "dest_city": curr.get("city", ""),
            "dest_state": curr.get("state", ""),
            "dest_date": curr_date,
            "dest_year": curr.get("year", 0),
        })

    return vectors


# ---------------------------------------------------------------------------
# HDBSCAN clustering
# ---------------------------------------------------------------------------


def cluster_vectors(
    vectors: list[dict[str, Any]],
    min_cluster_size: int = MIN_CLUSTER_SIZE,
) -> np.ndarray:
    """Run HDBSCAN on travel vectors and return cluster labels.

    Features used for clustering:
        origin_lat, origin_lon, dest_lat, dest_lon, distance_miles

    All features are standardized with StandardScaler before clustering.

    Returns:
        Array of integer labels (one per vector). Label -1 means noise.
    """
    if len(vectors) < min_cluster_size:
        log.warning(
            "Only %d vectors -- too few for clustering (min_cluster_size=%d). "
            "All marked as noise.",
            len(vectors),
            min_cluster_size,
        )
        return np.full(len(vectors), -1, dtype=int)

    feature_matrix = np.array([
        [
            v["origin_lat"],
            v["origin_lon"],
            v["dest_lat"],
            v["dest_lon"],
            v["distance_miles"],
        ]
        for v in vectors
    ])

    scaler = StandardScaler()
    scaled = scaler.fit_transform(feature_matrix)

    clusterer = HDBSCAN(
        min_cluster_size=min_cluster_size,
        # Allow single-linkage merging for geographic data.
        cluster_selection_method="eom",
        store_centers="centroid",
    )
    labels = clusterer.fit_predict(scaled)

    n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
    n_noise = int(np.sum(labels == -1))
    log.info(
        "HDBSCAN found %d clusters and %d noise points from %d vectors.",
        n_clusters,
        n_noise,
        len(vectors),
    )

    return labels


# ---------------------------------------------------------------------------
# Cluster labeling and profiling
# ---------------------------------------------------------------------------


def label_cluster(vectors: list[dict[str, Any]]) -> tuple[str, list[str]]:
    """Generate a human-readable label for a cluster of travel vectors.

    Returns:
        (label, unique_cities) -- e.g. ("Midwest Circuit", ["Chicago", ...])
    """
    # Compute the geographic centroid of all destinations in the cluster.
    dest_lats = [v["dest_lat"] for v in vectors]
    dest_lons = [v["dest_lon"] for v in vectors]
    centroid_lat = sum(dest_lats) / len(dest_lats)
    centroid_lon = sum(dest_lons) / len(dest_lons)

    region = _classify_region(centroid_lat, centroid_lon)

    # Determine dominant direction of travel.
    directions: list[str] = []
    for v in vectors:
        d = _direction_label(v["origin_lat"], v["origin_lon"],
                             v["dest_lat"], v["dest_lon"])
        directions.append(d)

    # Most common non-Local direction.
    dir_counts: dict[str, int] = defaultdict(int)
    for d in directions:
        if d != "Local":
            dir_counts[d] += 1

    if dir_counts:
        dominant_dir = max(dir_counts, key=dir_counts.get)  # type: ignore[arg-type]
    else:
        dominant_dir = ""

    # Build label.
    if dominant_dir and dominant_dir not in region:
        label = f"{region} {dominant_dir}bound"
    else:
        label = f"{region} Circuit"

    # Collect unique destination cities.
    cities: list[str] = sorted(
        set(v["dest_city"] for v in vectors if v["dest_city"])
    )

    return label, cities


def compute_cluster_safety(
    vectors: list[dict[str, Any]],
    safety_lookup: dict[str, float] | None,
) -> tuple[float | None, int]:
    """Compute average safety score and dark city count for a cluster.

    Returns:
        (avg_safety_score, dark_city_count)
        avg_safety_score is None if no safety data is available.
    """
    if safety_lookup is None:
        return None, 0

    scores: list[float] = []
    dark_cities: set[str] = set()

    for v in vectors:
        city = v["dest_city"]
        state = v["dest_state"]
        year = v["dest_year"]
        key = f"{city}|{state}|{year}"
        score = safety_lookup.get(key)

        if score is not None:
            scores.append(score)
            if score <= DARK_CITY_THRESHOLD:
                dark_cities.add(f"{city}, {state}")

    if not scores:
        return None, 0

    avg = round(sum(scores) / len(scores), 4)
    return avg, len(dark_cities)


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------


def build_route_clusters(
    schedule_data: dict[str, Any],
    safety_lookup: dict[str, float] | None,
) -> dict[str, Any]:
    """Build the complete route_clusters output structure.

    For each team-season:
        1. Construct chronological travel vectors.
        2. Run HDBSCAN clustering.
        3. Label each cluster and compute safety profiles.
    """
    games = schedule_data.get("games", [])
    if not games:
        log.error("No games found in schedule data.")
        return {"pipeline_version": PIPELINE_VERSION, "teams": {}}

    team_season_games = build_team_season_games(games)

    teams_output: dict[str, Any] = {}

    for team in sorted(team_season_games.keys()):
        seasons_output: dict[str, Any] = {}

        for year in sorted(team_season_games[team].keys()):
            season_games = team_season_games[team][year]
            vectors = compute_travel_vectors(season_games)

            if not vectors:
                log.info(
                    "Team=%s Year=%d: no travel vectors (possibly single game).",
                    team,
                    year,
                )
                continue

            labels = cluster_vectors(vectors)

            # Group vectors by cluster label.
            cluster_groups: dict[int, list[dict[str, Any]]] = defaultdict(list)
            for vec, lbl in zip(vectors, labels):
                cluster_groups[int(lbl)].append(vec)

            # Build cluster records.
            clusters: list[dict[str, Any]] = []
            noise_count = 0

            for cluster_id in sorted(cluster_groups.keys()):
                if cluster_id == -1:
                    noise_count = len(cluster_groups[cluster_id])
                    continue

                group = cluster_groups[cluster_id]
                label, cities = label_cluster(group)
                avg_dist = round(
                    sum(v["distance_miles"] for v in group) / len(group), 1
                )
                avg_safety, dark_count = compute_cluster_safety(
                    group, safety_lookup
                )

                cluster_record: dict[str, Any] = {
                    "cluster_id": cluster_id,
                    "label": label,
                    "trip_count": len(group),
                    "avg_distance_miles": avg_dist,
                    "cities": cities,
                }

                if avg_safety is not None:
                    cluster_record["avg_safety_score"] = avg_safety
                    cluster_record["dark_city_count"] = dark_count

                clusters.append(cluster_record)

            seasons_output[str(year)] = {
                "total_trips": len(vectors),
                "clusters": clusters,
                "noise_trips": noise_count,
            }

            log.info(
                "Team=%s Year=%d: %d trips, %d clusters, %d noise.",
                team,
                year,
                len(vectors),
                len(clusters),
                noise_count,
            )

        if seasons_output:
            teams_output[team] = {"seasons": seasons_output}

    return {
        "pipeline_version": PIPELINE_VERSION,
        "teams": teams_output,
    }


def main() -> None:
    """Run the route clustering pipeline (M1) -- Phase 4."""
    log.info("Route clustering (M1) -- Phase 4")
    log.info("HDBSCAN min_cluster_size=%d", MIN_CLUSTER_SIZE)

    # ------------------------------------------------------------------
    # 1. Load schedule data
    # ------------------------------------------------------------------
    schedule_path = DATA_DIR / "schedule_1936_1948.json"
    if not schedule_path.exists():
        log.error("Schedule file not found: %s", schedule_path)
        log.error("Run pipeline steps 01--03 first.")
        return

    schedule_data = load_schedule(schedule_path)

    # ------------------------------------------------------------------
    # 2. Load safety scores (optional)
    # ------------------------------------------------------------------
    safety_path = DATA_DIR / "safety_scores.json"
    safety_lookup = load_safety_scores(safety_path)

    # ------------------------------------------------------------------
    # 3. Build route clusters
    # ------------------------------------------------------------------
    output = build_route_clusters(schedule_data, safety_lookup)

    # ------------------------------------------------------------------
    # 4. Write output
    # ------------------------------------------------------------------
    output_path = DATA_DIR / "route_clusters.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    # Summary stats.
    total_teams = len(output.get("teams", {}))
    total_clusters = 0
    total_noise = 0
    for team_data in output.get("teams", {}).values():
        for season_data in team_data.get("seasons", {}).values():
            total_clusters += len(season_data.get("clusters", []))
            total_noise += season_data.get("noise_trips", 0)

    log.info("Output written to %s", output_path)
    log.info(
        "Summary: %d teams, %d total clusters, %d total noise trips.",
        total_teams,
        total_clusters,
        total_noise,
    )
    log.info("Phase 4 complete. Gate: Oscar reviews for historical plausibility.")


if __name__ == "__main__":
    main()
