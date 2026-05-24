"""
03_geocode.py -- Geocode Green Book listings and match to ballpark locations.

Phase 2 (continued) of the Green Book Route pipeline.

Input:  data/green_book_listings_raw.json (from Step 1)
        data/schedule_1936_1948.json (from Step 2)
        data/ballparks.json (from Step 2)

Output: data/green_book_listings_geocoded.json
        data/game_listings_matched.json

Method: Nominatim (OpenStreetMap) with rate limiting and fallback
        geocoding strategy. Failed geocodes are flagged, not dropped.
        Results are cached to avoid redundant API calls on reruns.

Gate:   Geocoding success rate documented for both datasets.
"""

from __future__ import annotations

import json
import logging
import math
import time
from datetime import datetime, timezone
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

GREEN_BOOK_RAW_PATH = DATA_DIR / "green_book_listings_raw.json"
SCHEDULE_PATH = DATA_DIR / "schedule_1936_1948.json"
BALLPARKS_PATH = DATA_DIR / "ballparks.json"
GEOCODE_CACHE_PATH = DATA_DIR / "geocode_cache.json"

OUTPUT_LISTINGS_PATH = DATA_DIR / "green_book_listings_geocoded.json"
OUTPUT_GAME_MATCH_PATH = DATA_DIR / "game_listings_matched.json"

# Nominatim requires a user agent and rate limiting (1 req/s).
NOMINATIM_USER_AGENT = "theotherboxscore-greenbook/0.1"

# Radius thresholds for matching listings to ballparks (miles).
RADIUS_1MI = 1.0
RADIUS_5MI = 5.0

# Categories that count as lodging for the "hotel within 1 mile" flag.
HOTEL_CATEGORIES = {"hotel", "tourist_home"}


# ---------------------------------------------------------------------------
# Haversine distance (self-contained -- no cross-pipeline imports)
# ---------------------------------------------------------------------------

def haversine_miles(
    lat1: float,
    lon1: float,
    lat2: float,
    lon2: float,
) -> float:
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


# ---------------------------------------------------------------------------
# Geocode cache
# ---------------------------------------------------------------------------

def load_geocode_cache(path: Path) -> dict[str, dict[str, Any]]:
    """Load the geocode cache from disk, or return empty dict."""
    if path.exists():
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
            log.info("Loaded geocode cache with %d entries from %s", len(data), path)
            return data
        except (json.JSONDecodeError, OSError) as exc:
            log.warning("Could not load geocode cache (%s) -- starting fresh", exc)
    return {}


def save_geocode_cache(
    cache: dict[str, dict[str, Any]],
    path: Path,
) -> None:
    """Persist the geocode cache to disk."""
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(
        json.dumps(cache, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    log.info("Saved geocode cache with %d entries to %s", len(cache), path)


def _cache_key(address: str, city: str, state: str) -> str:
    """Deterministic cache key from address components."""
    return "|".join([
        address.strip().lower(),
        city.strip().lower(),
        state.strip().lower(),
    ])


# ---------------------------------------------------------------------------
# Geocoding with geopy
# ---------------------------------------------------------------------------

def _build_geocoder() -> tuple[Any, Any]:
    """Create a Nominatim geocoder and a RateLimiter-wrapped callable.

    Returns (geocoder_instance, rate_limited_geocode_fn).
    """
    from geopy.geocoders import Nominatim
    from geopy.extra.rate_limiter import RateLimiter

    geolocator = Nominatim(user_agent=NOMINATIM_USER_AGENT, timeout=10)
    geocode_fn = RateLimiter(
        geolocator.geocode,
        min_delay_seconds=1.1,
        max_retries=3,
        error_wait_seconds=5.0,
    )
    return geolocator, geocode_fn


def geocode_address(
    address: str,
    city: str,
    state: str,
    geocode_fn: Any,
) -> dict[str, Any]:
    """Geocode a single address using Nominatim with fallback strategy.

    Strategy:
      1. Try full query: "address, city, state"
      2. Fall back to "city, state" if full address fails
      3. Record match_quality: exact | interpolated | city_level | failed

    Returns a dict with: lat, lon, match_quality, query_used.
    """
    result: dict[str, Any] = {
        "lat": None,
        "lon": None,
        "match_quality": "failed",
        "query_used": "",
    }

    # Attempt 1: full address + city + state
    if address:
        full_query = f"{address}, {city}, {state}"
        try:
            location = geocode_fn(full_query, exactly_one=True, addressdetails=True)
            if location is not None:
                result["lat"] = location.latitude
                result["lon"] = location.longitude
                result["query_used"] = full_query

                # Determine match quality from raw response
                raw = location.raw or {}
                match_type = raw.get("type", "")
                osm_class = raw.get("class", "")

                if osm_class in ("place", "boundary"):
                    # Nominatim resolved to a place/city, not a specific address
                    result["match_quality"] = "city_level"
                elif match_type == "interpolated":
                    result["match_quality"] = "interpolated"
                else:
                    result["match_quality"] = "exact"
                return result
        except Exception as exc:
            log.debug("Full-address geocode failed for %r: %s", full_query, exc)

    # Attempt 2: city + state fallback
    city_query = f"{city}, {state}"
    try:
        location = geocode_fn(city_query, exactly_one=True)
        if location is not None:
            result["lat"] = location.latitude
            result["lon"] = location.longitude
            result["match_quality"] = "city_level"
            result["query_used"] = city_query
            return result
    except Exception as exc:
        log.debug("City-level geocode failed for %r: %s", city_query, exc)

    result["query_used"] = city_query
    return result


# ---------------------------------------------------------------------------
# Geocode all Green Book listings
# ---------------------------------------------------------------------------

def geocode_listings(
    listings: list[dict[str, Any]],
    cache: dict[str, dict[str, Any]],
) -> list[dict[str, Any]]:
    """Geocode every listing, using the cache first, then Nominatim.

    Mutates *cache* in place with new results and returns the listings
    with lat/lon/match_quality fields added.
    """
    # Only import geopy if we actually need to geocode
    uncached_count = sum(
        1 for rec in listings
        if _cache_key(rec.get("address", ""), rec.get("city", ""), rec.get("state", ""))
        not in cache
    )

    geocode_fn = None
    if uncached_count > 0:
        log.info(
            "%d of %d listings need geocoding (not in cache)",
            uncached_count, len(listings),
        )
        try:
            _, geocode_fn = _build_geocoder()
        except ImportError:
            log.error(
                "geopy is not installed -- cannot geocode. "
                "Install with: pip install geopy"
            )
            # Mark all uncached listings as failed
            geocode_fn = None
    else:
        log.info("All %d listings found in geocode cache", len(listings))

    geocoded: list[dict[str, Any]] = []
    new_geocodes = 0
    cache_hits = 0

    for idx, rec in enumerate(listings):
        address = rec.get("address", "")
        city = rec.get("city", "")
        state = rec.get("state", "")
        key = _cache_key(address, city, state)

        if key in cache:
            geo = cache[key]
            cache_hits += 1
        elif geocode_fn is not None:
            geo = geocode_address(address, city, state, geocode_fn)
            cache[key] = geo
            new_geocodes += 1

            # Periodic progress and cache save
            if new_geocodes % 50 == 0:
                log.info(
                    "  Geocoded %d / %d new addresses (%.0f%% done)...",
                    new_geocodes, uncached_count,
                    new_geocodes / uncached_count * 100,
                )
                save_geocode_cache(cache, GEOCODE_CACHE_PATH)
        else:
            # No geocoder available -- mark as failed
            geo = {
                "lat": None,
                "lon": None,
                "match_quality": "failed",
                "query_used": "",
            }
            cache[key] = geo

        enriched = dict(rec)
        enriched["lat"] = geo.get("lat")
        enriched["lon"] = geo.get("lon")
        enriched["match_quality"] = geo.get("match_quality", "failed")
        geocoded.append(enriched)

    log.info(
        "Geocoding complete: %d cache hits, %d new geocodes",
        cache_hits, new_geocodes,
    )
    return geocoded


# ---------------------------------------------------------------------------
# Match listings to game ballparks
# ---------------------------------------------------------------------------

def match_listings_to_games(
    games: list[dict[str, Any]],
    listings: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """For each game, find Green Book listings within 1-mile and 5-mile
    radii of the ballpark.

    Returns one record per game with listing counts and details.
    """
    # Pre-filter listings that have valid coordinates
    geo_listings = [
        rec for rec in listings
        if rec.get("lat") is not None and rec.get("lon") is not None
    ]
    log.info(
        "Matching %d geocoded listings against %d games",
        len(geo_listings), len(games),
    )

    results: list[dict[str, Any]] = []

    for game in games:
        bp_lat = game.get("lat")
        bp_lon = game.get("lon")

        record: dict[str, Any] = {
            "date": game.get("date"),
            "home_team": game.get("home_team"),
            "away_team": game.get("away_team"),
            "city": game.get("city"),
            "state": game.get("state"),
            "ballpark_name": game.get("ballpark_name"),
            "ballpark_id": game.get("ballpark_id"),
            "lat": bp_lat,
            "lon": bp_lon,
            "listings_1mi": 0,
            "listings_5mi": 0,
            "listings_within_1mi": [],
            "has_hotel_1mi": False,
        }

        if bp_lat is None or bp_lon is None:
            log.debug(
                "Game %s at %s has no coordinates -- skipping matching",
                game.get("date"), game.get("ballpark_name"),
            )
            results.append(record)
            continue

        within_1mi: list[dict[str, str]] = []
        count_5mi = 0
        has_hotel = False

        for listing in geo_listings:
            dist = haversine_miles(
                bp_lat, bp_lon,
                listing["lat"], listing["lon"],
            )

            if dist <= RADIUS_5MI:
                count_5mi += 1

                if dist <= RADIUS_1MI:
                    entry = {
                        "business_name": listing.get("business_name", ""),
                        "category": listing.get("category", "unknown"),
                        "address": listing.get("address", ""),
                        "distance_mi": round(dist, 3),
                    }
                    within_1mi.append(entry)

                    if listing.get("category", "") in HOTEL_CATEGORIES:
                        has_hotel = True

        record["listings_1mi"] = len(within_1mi)
        record["listings_5mi"] = count_5mi
        record["listings_within_1mi"] = within_1mi
        record["has_hotel_1mi"] = has_hotel
        results.append(record)

    # Summary stats
    games_with_1mi = sum(1 for r in results if r["listings_1mi"] > 0)
    games_with_hotel = sum(1 for r in results if r["has_hotel_1mi"])
    log.info(
        "Matching complete: %d/%d games have listings within 1 mile, "
        "%d/%d have a hotel within 1 mile",
        games_with_1mi, len(results), games_with_hotel, len(results),
    )

    return results


# ---------------------------------------------------------------------------
# Output writers
# ---------------------------------------------------------------------------

def write_geocoded_listings(
    listings: list[dict[str, Any]],
    output_path: Path,
) -> None:
    """Write geocoded listings to JSON with metadata."""
    total = len(listings)
    success = sum(1 for r in listings if r.get("lat") is not None)
    exact = sum(1 for r in listings if r.get("match_quality") == "exact")
    interpolated = sum(
        1 for r in listings if r.get("match_quality") == "interpolated"
    )
    city_level = sum(
        1 for r in listings if r.get("match_quality") == "city_level"
    )
    failed = sum(1 for r in listings if r.get("match_quality") == "failed")

    output: dict[str, Any] = {
        "pipeline_version": "1.0",
        "generated_by": "03_geocode.py",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "geocoder": "Nominatim (OpenStreetMap)",
        "listing_count": total,
        "geocode_stats": {
            "success": success,
            "success_rate": round(success / total, 4) if total else 0.0,
            "exact": exact,
            "interpolated": interpolated,
            "city_level": city_level,
            "failed": failed,
        },
        "listings": listings,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(output, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    log.info("Wrote %d geocoded listings to %s", total, output_path)
    log.info(
        "  Geocode quality -- exact: %d, interpolated: %d, "
        "city_level: %d, failed: %d (%.1f%% success rate)",
        exact, interpolated, city_level, failed,
        (success / total * 100) if total else 0.0,
    )


def write_game_matches(
    matches: list[dict[str, Any]],
    output_path: Path,
) -> None:
    """Write per-game listing match data to JSON."""
    output: dict[str, Any] = {
        "pipeline_version": "1.0",
        "generated_by": "03_geocode.py",
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "description": (
            "Per-game counts of Green Book listings near each ballpark. "
            "Listings within 1 mile include name, category, and distance."
        ),
        "game_count": len(matches),
        "games": matches,
    }

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(
        json.dumps(output, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    log.info("Wrote %d game match records to %s", len(matches), output_path)


# ---------------------------------------------------------------------------
# Ballpark data validation
# ---------------------------------------------------------------------------

def validate_ballpark_data(ballparks_path: Path) -> None:
    """Log a summary of ballpark coordinate coverage."""
    if not ballparks_path.exists():
        log.warning("Ballparks file not found at %s -- skipping validation", ballparks_path)
        return

    data = json.loads(ballparks_path.read_text(encoding="utf-8"))
    parks = data.get("ballparks", [])
    total = len(parks)
    with_coords = sum(
        1 for p in parks
        if p.get("lat") is not None and p.get("lon") is not None
    )
    log.info(
        "Ballpark validation: %d/%d ballparks have coordinates (%.1f%%)",
        with_coords, total, (with_coords / total * 100) if total else 0.0,
    )
    missing = [p["ballpark_name"] for p in parks if p.get("lat") is None]
    if missing:
        log.warning("Ballparks missing coordinates: %s", missing)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    log.info("=" * 60)
    log.info("Geocoding pipeline -- Phase 2 (continued)")
    log.info("=" * 60)

    # Always validate ballpark data, even if Green Book listings are missing
    validate_ballpark_data(BALLPARKS_PATH)

    # ------------------------------------------------------------------
    # Load Green Book listings
    # ------------------------------------------------------------------
    listings_raw: list[dict[str, Any]] = []

    if not GREEN_BOOK_RAW_PATH.exists():
        log.warning(
            "Green Book listings file not found at %s -- "
            "Phase 1 (01_green_book_ocr.py) has not been run yet. "
            "Skipping listing geocoding.",
            GREEN_BOOK_RAW_PATH,
        )
    else:
        try:
            raw_data = json.loads(
                GREEN_BOOK_RAW_PATH.read_text(encoding="utf-8")
            )
            listings_raw = raw_data.get("listings", [])
            log.info(
                "Loaded %d raw Green Book listings from %s",
                len(listings_raw), GREEN_BOOK_RAW_PATH,
            )
        except (json.JSONDecodeError, OSError) as exc:
            log.error("Failed to load Green Book listings: %s", exc)

    # ------------------------------------------------------------------
    # Geocode listings (if any)
    # ------------------------------------------------------------------
    geocoded_listings: list[dict[str, Any]] = []

    if listings_raw:
        cache = load_geocode_cache(GEOCODE_CACHE_PATH)
        geocoded_listings = geocode_listings(listings_raw, cache)
        save_geocode_cache(cache, GEOCODE_CACHE_PATH)
        write_geocoded_listings(geocoded_listings, OUTPUT_LISTINGS_PATH)
    else:
        log.info("No listings to geocode -- skipping geocoded output.")

    # ------------------------------------------------------------------
    # Load schedule and match listings to games
    # ------------------------------------------------------------------
    if not SCHEDULE_PATH.exists():
        log.warning(
            "Schedule file not found at %s -- "
            "Phase 2 (02_schedule_extract.py) has not been run yet. "
            "Skipping game-listing matching.",
            SCHEDULE_PATH,
        )
        return

    try:
        schedule_data = json.loads(
            SCHEDULE_PATH.read_text(encoding="utf-8")
        )
        games = schedule_data.get("games", [])
        log.info("Loaded %d games from %s", len(games), SCHEDULE_PATH)
    except (json.JSONDecodeError, OSError) as exc:
        log.error("Failed to load schedule data: %s", exc)
        return

    game_matches = match_listings_to_games(games, geocoded_listings)
    write_game_matches(game_matches, OUTPUT_GAME_MATCH_PATH)

    # ------------------------------------------------------------------
    # Summary
    # ------------------------------------------------------------------
    log.info("=" * 60)
    log.info("GEOCODING PIPELINE SUMMARY")
    log.info("  Green Book listings loaded:   %d", len(listings_raw))
    log.info("  Listings geocoded:            %d", len(geocoded_listings))
    if geocoded_listings:
        success = sum(
            1 for r in geocoded_listings if r.get("lat") is not None
        )
        log.info(
            "  Geocode success rate:         %.1f%%",
            success / len(geocoded_listings) * 100,
        )
    log.info("  Games processed:              %d", len(games))
    games_with = sum(1 for m in game_matches if m["listings_1mi"] > 0)
    log.info("  Games with listings < 1 mi:   %d", games_with)
    log.info("=" * 60)


if __name__ == "__main__":
    main()
