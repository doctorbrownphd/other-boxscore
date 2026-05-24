"""
02_proximity_join.py -- Spatial join between sundown towns and game locations.

Phase 2 of the Sundown Corridor pipeline.

Input:  data/sundown_towns.json          (from 01_sundown_data.py)
        ../02-the-green-book-route/data/ballparks.json  (from Ch. 02)
        -- OR --
        ../02-the-green-book-route/data/schedule_1936_1948.json  (fallback)

Output: data/ballpark_proximity.json
        For each ballpark: sundown town counts within 10mi, 25mi, 50mi,
        weighted by evidence quality, with individual town listings.

Method: Haversine distance calculation between each ballpark and each
        documented sundown town. Three radius bands.

Gate:   Elias reviews spatial join methodology.
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
BALLPARKS_PATH = CH02_DATA_DIR / "ballparks.json"
SCHEDULE_PATH = CH02_DATA_DIR / "schedule_1936_1948.json"
OUTPUT_PATH = DATA_DIR / "ballpark_proximity.json"

DATA_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# Proximity radii (miles)
# ---------------------------------------------------------------------------

RADIUS_BANDS: list[int] = [10, 25, 50]

# Evidence quality weights (must match 01_sundown_data.py)
EVIDENCE_WEIGHTS: dict[str, float] = {
    "Confirmed": 1.0,
    "Probable": 0.7,
    "Possible": 0.4,
}

# Earth radius in miles (for haversine)
EARTH_RADIUS_MI: float = 3958.8


# ---------------------------------------------------------------------------
# Haversine distance
# ---------------------------------------------------------------------------

def haversine_miles(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate the great-circle distance between two points in miles.

    Args:
        lat1, lon1: Coordinates of point A (decimal degrees).
        lat2, lon2: Coordinates of point B (decimal degrees).

    Returns:
        Distance in statute miles.
    """
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


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------

def load_sundown_towns() -> list[dict[str, Any]]:
    """Load the sundown towns dataset from Phase 1.

    Returns:
        List of sundown town records with lat, lon, evidence_tier.

    Raises:
        FileNotFoundError: If the upstream file is missing.
    """
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


def load_ballpark_locations() -> list[dict[str, Any]]:
    """Load unique ballpark locations from Ch. 02 data.

    Tries ballparks.json first, then falls back to extracting unique
    locations from the schedule file.

    Returns:
        List of ballpark records with lat, lon, city, state, ballpark_name.
    """
    # Try ballparks.json
    if BALLPARKS_PATH.exists():
        with BALLPARKS_PATH.open("r", encoding="utf-8") as f:
            data = json.load(f)
        parks = data.get("ballparks", [])
        log.info("Loaded %d ballparks from ballparks.json.", len(parks))
        return parks

    # Fallback: extract unique locations from schedule
    if SCHEDULE_PATH.exists():
        log.warning(
            "ballparks.json not found. Extracting locations from schedule."
        )
        with SCHEDULE_PATH.open("r", encoding="utf-8") as f:
            data = json.load(f)
        games = data.get("games", [])

        seen: set[str] = set()
        parks: list[dict[str, Any]] = []
        for game in games:
            lat = game.get("lat")
            lon = game.get("lon")
            if lat is None or lon is None:
                continue
            city = game.get("city", "")
            state = game.get("state", "")
            key = f"{city}|{state}"
            if key in seen:
                continue
            seen.add(key)
            parks.append({
                "ballpark_name": game.get("ballpark_name", f"{city} ballpark"),
                "city": city,
                "state": state,
                "lat": lat,
                "lon": lon,
            })

        log.info("Extracted %d unique locations from schedule.", len(parks))
        return parks

    raise FileNotFoundError(
        f"Neither {BALLPARKS_PATH} nor {SCHEDULE_PATH} found. "
        f"Run Chapter 02 pipeline first."
    )


# ---------------------------------------------------------------------------
# Proximity calculation
# ---------------------------------------------------------------------------

def calculate_proximity(
    ballparks: list[dict[str, Any]],
    sundown_towns: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """Calculate sundown town proximity for each ballpark location.

    For each ballpark, counts documented sundown towns within each radius
    band, weighted by evidence quality.

    Args:
        ballparks: List of ballpark records with lat/lon.
        sundown_towns: List of sundown town records with lat/lon/evidence_tier.

    Returns:
        List of proximity records, one per ballpark.
    """
    results: list[dict[str, Any]] = []

    for bp_idx, ballpark in enumerate(ballparks):
        bp_lat = ballpark.get("lat")
        bp_lon = ballpark.get("lon")

        if bp_lat is None or bp_lon is None:
            log.warning(
                "Skipping ballpark %s -- missing coordinates.",
                ballpark.get("ballpark_name", f"index {bp_idx}"),
            )
            continue

        bp_lat = float(bp_lat)
        bp_lon = float(bp_lon)

        # For each radius band, collect sundown towns
        band_data: dict[int, dict[str, Any]] = {}
        for radius in RADIUS_BANDS:
            band_data[radius] = {
                "count": 0,
                "weighted_count": 0.0,
                "confirmed": 0,
                "probable": 0,
                "possible": 0,
                "towns": [],
            }

        for town in sundown_towns:
            t_lat = town.get("lat")
            t_lon = town.get("lon")
            if t_lat is None or t_lon is None:
                continue

            dist = haversine_miles(bp_lat, bp_lon, float(t_lat), float(t_lon))
            tier = town.get("evidence_tier", "Possible")
            weight = EVIDENCE_WEIGHTS.get(tier, 0.4)

            for radius in RADIUS_BANDS:
                if dist <= radius:
                    band = band_data[radius]
                    band["count"] += 1
                    band["weighted_count"] += weight

                    tier_key = tier.lower()
                    if tier_key in band:
                        band[tier_key] += 1

                    # Include individual town details for the 10mi band
                    if radius == RADIUS_BANDS[0]:
                        band["towns"].append({
                            "town_name": town.get("town_name", ""),
                            "state": town.get("state", ""),
                            "evidence_tier": tier,
                            "distance_mi": round(dist, 2),
                        })

        # Build the proximity record
        proximity: dict[str, Any] = {
            "ballpark_name": ballpark.get("ballpark_name", ""),
            "city": ballpark.get("city", ""),
            "state": ballpark.get("state", ""),
            "lat": bp_lat,
            "lon": bp_lon,
        }

        for radius in RADIUS_BANDS:
            band = band_data[radius]
            key = f"within_{radius}mi"
            proximity[key] = {
                "total": band["count"],
                "weighted_total": round(band["weighted_count"], 2),
                "confirmed": band["confirmed"],
                "probable": band["probable"],
                "possible": band["possible"],
            }
            if radius == RADIUS_BANDS[0]:
                # Sort nearest towns by distance
                band["towns"].sort(key=lambda t: t["distance_mi"])
                proximity[key]["towns"] = band["towns"]

        results.append(proximity)

    # Sort by 10mi weighted count descending (most exposed first)
    results.sort(
        key=lambda r: r.get(f"within_{RADIUS_BANDS[0]}mi", {}).get("weighted_total", 0),
        reverse=True,
    )

    return results


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------

def main() -> None:
    """Run the proximity join pipeline -- Phase 2."""
    log.info("Proximity join pipeline -- Phase 2")
    log.info("Radius bands: %s miles", RADIUS_BANDS)
    log.info("Output: %s", OUTPUT_PATH)

    # 1. Load data
    sundown_towns = load_sundown_towns()
    ballparks = load_ballpark_locations()

    # 2. Calculate proximity
    log.info("Calculating proximity for %d ballparks x %d sundown towns...",
             len(ballparks), len(sundown_towns))
    proximity = calculate_proximity(ballparks, sundown_towns)

    # 3. Write output
    output: dict[str, Any] = {
        "pipeline_version": "1.0",
        "radius_bands_miles": RADIUS_BANDS,
        "evidence_weights": EVIDENCE_WEIGHTS,
        "total_ballparks": len(proximity),
        "total_sundown_towns": len(sundown_towns),
        "ballpark_proximity": proximity,
    }

    OUTPUT_PATH.write_text(
        json.dumps(output, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    log.info("Wrote %d proximity records to %s", len(proximity), OUTPUT_PATH)

    # 4. Log summary
    log.info("=" * 60)
    log.info("PROXIMITY SUMMARY")
    for radius in RADIUS_BANDS:
        key = f"within_{radius}mi"
        counts = [p.get(key, {}).get("total", 0) for p in proximity]
        if counts:
            avg = sum(counts) / len(counts)
            max_count = max(counts)
            max_park = next(
                (p["ballpark_name"] for p in proximity
                 if p.get(key, {}).get("total", 0) == max_count),
                "unknown",
            )
            log.info("  %dmi band: avg=%.1f, max=%d (%s)", radius, avg, max_count, max_park)
    log.info("=" * 60)


if __name__ == "__main__":
    main()
