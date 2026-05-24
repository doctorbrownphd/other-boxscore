"""
03_geocode.py -- Geocode Green Book listings and ballpark locations.

Phase 2 (continued) of the Green Book Route pipeline.

Input:  data/green_book_listings_raw.json (from Step 1)
        data/schedule_1936_1948.json (from Step 2)

Output: data/green_book_listings_geocoded.json
        data/ballparks_geocoded.json

Method: Nominatim (OpenStreetMap) with rate limiting and historical
        address validation. Failed geocodes are flagged, not dropped.

Gate:   Geocoding success rate documented for both datasets.
"""

from __future__ import annotations

import json
import logging
import time
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

# Nominatim requires a user agent and rate limiting (1 req/s).
NOMINATIM_USER_AGENT = "theotherboxscore-greenbook-pipeline/0.1"
NOMINATIM_DELAY_S = 1.1


def geocode_address(address: str, city: str, state: str) -> dict | None:
    """Geocode a single address using Nominatim.

    Returns dict with lat, lon, confidence, or None on failure.
    Respects Nominatim rate limits.
    """
    # TODO: Implement with geopy.geocoders.Nominatim
    # - Construct query from address + city + state
    # - Handle partial matches (city-level fallback)
    # - Log and flag failures
    # - Rate limit: 1 request per second minimum
    return None


def main() -> None:
    log.info("Geocoding pipeline -- Phase 2 (continued)")

    # TODO Phase 2 geocoding implementation:
    # 1. Load Green Book listings from Step 1
    # 2. Load schedule + ballpark data from Step 2
    # 3. Geocode each Green Book address
    #    a. Full address first
    #    b. City + state fallback if full address fails
    #    c. Document match quality (exact / interpolated / city-level)
    # 4. Geocode each ballpark
    #    a. Use SABR coordinates where available
    #    b. Nominatim fallback for missing ballparks
    # 5. Output geocoded files with success/failure metadata

    log.warning("Pipeline stub -- implementation pending.")


if __name__ == "__main__":
    main()
