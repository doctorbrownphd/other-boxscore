"""
05_safety_score.py -- M2: Compute composite safety scores.

Phase 3 of the Green Book Route pipeline.

Input:  data/green_book_listings_geocoded.json
        data/ballparks_geocoded.json
        Census Black population data (external)
        Sundown Towns database (external)

Output: data/safety_scores.json
        One record per game: game_id, city, state, season,
        listings_1mi, listings_5mi, listing_categories,
        black_population, sundown_proximity, composite_score.

Method: Composite index from multiple variables. All weights
        documented and stated in METHODOLOGY.md.

Gate:   Elias reviews methodology and output distribution.
"""

from __future__ import annotations

import logging
import math
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

# Safety score component weights.
# Rationale documented in METHODOLOGY.md.
# These are preliminary -- Elias reviews before finalization.
WEIGHTS = {
    "listings_1mi": 0.30,
    "listings_5mi": 0.15,
    "has_hotel_1mi": 0.20,
    "category_diversity": 0.10,
    "black_population_pct": 0.15,
    "sundown_distance_inv": 0.10,
}


def haversine_miles(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Great-circle distance between two points in miles."""
    r = 3958.8  # Earth radius in miles
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlam = math.radians(lon2 - lon1)
    a = (
        math.sin(dphi / 2) ** 2
        + math.cos(phi1) * math.cos(phi2) * math.sin(dlam / 2) ** 2
    )
    return 2 * r * math.atan2(math.sqrt(a), math.sqrt(1 - a))


def main() -> None:
    log.info("Safety score computation (M2) -- Phase 3")

    # TODO Phase 3 implementation:
    # 1. Load geocoded Green Book listings and ballpark locations
    # 2. For each game location:
    #    a. Count listings within 1-mile radius
    #    b. Count listings within 5-mile radius
    #    c. Check for hotel presence within 1 mile
    #    d. Compute category diversity (unique categories / total)
    #    e. Look up Black population percentage from Census data
    #    f. Compute inverse distance to nearest sundown town
    # 3. Normalize each component to [0, 1]
    # 4. Compute weighted composite score
    # 5. Output per-game safety scores

    log.warning("Pipeline stub -- requires geocoded data from Steps 1-3.")


if __name__ == "__main__":
    main()
