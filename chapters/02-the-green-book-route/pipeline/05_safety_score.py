"""
05_safety_score.py -- M2: Compute composite safety scores.

Phase 3 of the Green Book Route pipeline.

Input:  data/game_listings_matched.json  (from 03_geocode.py)
        -- OR --
        data/schedule_1936_1948.json + data/ballparks.json  (fallback)

Output: data/safety_scores.json
        data/safety_summary.json

Method: Composite index from six weighted components. All weights
        are preliminary and subject to Elias review before finalization.
        Full rationale documented in METHODOLOGY.md.

Gate:   Elias reviews methodology and output distribution.
"""

from __future__ import annotations

import json
import logging
import math
import statistics
from pathlib import Path
from typing import Any

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"

# ---------------------------------------------------------------------------
# Safety score component weights.
# Rationale documented in METHODOLOGY.md.
# These are preliminary -- Elias reviews before finalization.
# ---------------------------------------------------------------------------
WEIGHTS: dict[str, float] = {
    "listings_1mi": 0.30,
    "listings_5mi": 0.15,
    "has_hotel_1mi": 0.20,
    "category_diversity": 0.10,
    "black_population_pct": 0.15,
    "sundown_distance_inv": 0.10,
}

# ---------------------------------------------------------------------------
# 1940 Census Black population data for cities in the schedule.
#
# Source: U.S. Census Bureau, Sixteenth Census of the United States: 1940,
#         Population, Volume II, "Characteristics of the Population,"
#         Table 35 -- "Race, by Nativity and Sex, for the Population of
#         Cities of 100,000 or More: 1940."
#
# These are public-domain data. Percentages are Black population as a
# fraction of total city population from the 1940 decennial census.
#
# The key format is "City, ST" to match schedule records.
# ---------------------------------------------------------------------------
CENSUS_1940_BLACK_PCT: dict[str, float] = {
    # Cities in the schedule
    "New York, NY": 0.061,
    "Chicago, IL": 0.082,
    "Philadelphia, PA": 0.131,
    "Pittsburgh, PA": 0.092,
    "Cleveland, OH": 0.098,
    "St. Louis, MO": 0.133,
    "Baltimore, MD": 0.192,
    "Washington, DC": 0.283,
    "Indianapolis, IN": 0.134,
    "Kansas City, MO": 0.107,
    "Memphis, TN": 0.415,
    "Birmingham, AL": 0.407,
    "Newark, NJ": 0.109,
    # Additional major cities for reference and future use
    "Detroit, MI": 0.092,
    "Atlanta, GA": 0.348,
    "New Orleans, LA": 0.305,
    "Houston, TX": 0.228,
    "Cincinnati, OH": 0.122,
    "Louisville, KY": 0.147,
    "Nashville, TN": 0.313,
    "Jacksonville, FL": 0.357,
    "Richmond, VA": 0.316,
    "Norfolk, VA": 0.333,
    "Savannah, GA": 0.433,
    "Charleston, SC": 0.433,
    "Dallas, TX": 0.174,
    "Buffalo, NY": 0.031,
    "Milwaukee, WI": 0.016,
    "Columbus, OH": 0.113,
    "Minneapolis, MN": 0.009,
    "Boston, MA": 0.032,
    "Los Angeles, CA": 0.042,
    "San Francisco, CA": 0.008,
    "Denver, CO": 0.023,
    "Omaha, NE": 0.050,
    "Dayton, OH": 0.089,
    "Toledo, OH": 0.054,
    "Akron, OH": 0.063,
    "Miami, FL": 0.284,
}

# Default Black population percentage when a city is not found in the
# 1940 Census lookup. Set to the median of all values in the table above
# so that missing cities do not receive an extreme score.
_DEFAULT_BLACK_PCT: float = round(
    statistics.median(CENSUS_1940_BLACK_PCT.values()), 3
)

# ---------------------------------------------------------------------------
# Sundown town proximity placeholder.
#
# This component awaits integration of the Loewen Sundown Towns database,
# which is shared infrastructure with Chapter 03 (The Sundown Corridor).
# Until that database is loaded, every city receives a neutral score of 0.5.
# This means the sundown component contributes equally (and inertly) for
# all cities -- it neither inflates nor deflates the composite.
# ---------------------------------------------------------------------------
_SUNDOWN_PLACEHOLDER: float = 0.5


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


# ---------------------------------------------------------------------------
# Normalization helpers
# ---------------------------------------------------------------------------

def _normalize_min_max(
    values: list[float],
) -> list[float]:
    """Normalize a list of values to [0, 1] using min-max scaling.

    If all values are identical (or the list is empty), returns a list of
    0.5 values to avoid division by zero and to assign a neutral score.
    """
    if not values:
        return []
    lo = min(values)
    hi = max(values)
    if hi == lo:
        return [0.5] * len(values)
    return [(v - lo) / (hi - lo) for v in values]


def _clamp(value: float, lo: float = 0.0, hi: float = 1.0) -> float:
    """Clamp a value to [lo, hi]."""
    return max(lo, min(hi, value))


# ---------------------------------------------------------------------------
# Core computation
# ---------------------------------------------------------------------------

def compute_components_from_matched(
    game: dict[str, Any],
) -> dict[str, float]:
    """Extract raw component values from a game_listings_matched record.

    Expected fields in *game*:
        listings_1mi  -- int, count of Green Book listings within 1 mile
        listings_5mi  -- int, count within 5 miles
        categories_1mi -- list[str], categories of 1-mile listings
        has_hotel_1mi  -- bool, whether a hotel is within 1 mile
        city           -- str
        state          -- str

    Returns a dict of raw (un-normalized) component values.
    """
    city_key = f"{game['city']}, {game['state']}"

    listings_1mi = game.get("listings_1mi", 0)
    listings_5mi = game.get("listings_5mi", 0)
    has_hotel = 1.0 if game.get("has_hotel_1mi", False) else 0.0

    # Category diversity: unique categories / total listings (within 5 mi).
    categories = game.get("categories_1mi", [])
    if categories:
        unique_cats = len(set(categories))
        cat_diversity = unique_cats / len(categories)
    else:
        cat_diversity = 0.0

    black_pop_pct = CENSUS_1940_BLACK_PCT.get(city_key, _DEFAULT_BLACK_PCT)
    sundown_inv = game.get("sundown_distance_inv", _SUNDOWN_PLACEHOLDER)

    return {
        "listings_1mi": float(listings_1mi),
        "listings_5mi": float(listings_5mi),
        "has_hotel_1mi": has_hotel,
        "category_diversity": cat_diversity,
        "black_population_pct": black_pop_pct,
        "sundown_distance_inv": sundown_inv,
    }


def compute_components_from_schedule(
    game: dict[str, Any],
) -> dict[str, float]:
    """Compute raw component values when only schedule data is available.

    When game_listings_matched.json does not exist, we fall back to
    schedule_1936_1948.json. In that case we have no listing counts
    (no Green Book geocoding has been done), so listing-derived
    components are set to zero and only Census and sundown components
    contribute meaningful differentiation.
    """
    city_key = f"{game['city']}, {game['state']}"
    black_pop_pct = CENSUS_1940_BLACK_PCT.get(city_key, _DEFAULT_BLACK_PCT)

    return {
        "listings_1mi": 0.0,
        "listings_5mi": 0.0,
        "has_hotel_1mi": 0.0,
        "category_diversity": 0.0,
        "black_population_pct": black_pop_pct,
        "sundown_distance_inv": _SUNDOWN_PLACEHOLDER,
    }


def normalize_components(
    records: list[dict[str, float]],
) -> list[dict[str, float]]:
    """Normalize each component across all records to [0, 1].

    has_hotel_1mi is already binary (0 or 1) -- no normalization needed.
    sundown_distance_inv is a placeholder constant -- no normalization needed.
    black_population_pct is already a percentage in [0, 1] -- we still
    normalize relative to the dataset so that the highest-pct city in the
    schedule maps to 1.0 and the lowest maps to 0.0.

    listings_1mi, listings_5mi, and category_diversity are min-max
    normalized across the full set of games.
    """
    if not records:
        return []

    # Components that need min-max normalization across the dataset.
    normalize_keys = [
        "listings_1mi",
        "listings_5mi",
        "category_diversity",
        "black_population_pct",
    ]

    # Extract columns, normalize, write back.
    normalized = [dict(r) for r in records]  # deep-ish copy
    for key in normalize_keys:
        raw_values = [r[key] for r in records]
        normed = _normalize_min_max(raw_values)
        for i, val in enumerate(normed):
            normalized[i][key] = val

    # has_hotel_1mi: already 0 or 1 -- leave as-is.
    # sundown_distance_inv: placeholder -- leave as-is.

    return normalized


def composite_score(components: dict[str, float]) -> float:
    """Compute the weighted composite safety score.

    All component values must already be in [0, 1].
    Returns a score in [0, 1]. Higher = more accessible.
    """
    score = 0.0
    for key, weight in WEIGHTS.items():
        score += weight * _clamp(components.get(key, 0.0))
    return round(score, 4)


# ---------------------------------------------------------------------------
# I/O helpers
# ---------------------------------------------------------------------------

def _load_json(path: Path) -> Any:
    """Load a JSON file and return its parsed content."""
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def _save_json(path: Path, data: Any) -> None:
    """Write data to a JSON file with readable formatting."""
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    log.info("Wrote %s", path)


# ---------------------------------------------------------------------------
# Summary statistics
# ---------------------------------------------------------------------------

def build_summary(scored_games: list[dict[str, Any]]) -> dict[str, Any]:
    """Build aggregate summary statistics from scored game records.

    Returns a dict with:
        - average_score_by_city
        - average_score_by_team
        - average_score_by_season
        - dark_cities  (cities where all games have listings_1mi == 0)
        - overall statistics (mean, median, quartiles, min, max)
    """
    if not scored_games:
        return {"error": "No games to summarize."}

    all_scores = [g["composite_score"] for g in scored_games]

    # -- By city --
    city_scores: dict[str, list[float]] = {}
    city_listings: dict[str, list[float]] = {}
    for g in scored_games:
        city = f"{g['city']}, {g['state']}"
        city_scores.setdefault(city, []).append(g["composite_score"])
        city_listings.setdefault(city, []).append(
            g["components"]["listings_1mi"]
        )

    avg_by_city = {
        city: round(statistics.mean(scores), 4)
        for city, scores in sorted(city_scores.items())
    }

    # Dark cities: every game in the city had zero raw listings within 1 mi.
    # We check the raw (pre-normalization) value stored in the record.
    dark_cities = sorted(
        city
        for city, listings in city_listings.items()
        if all(v == 0.0 for v in listings)
    )

    # -- By team (home team) --
    team_scores: dict[str, list[float]] = {}
    for g in scored_games:
        team = g.get("home_team", "Unknown")
        team_scores.setdefault(team, []).append(g["composite_score"])

    avg_by_team = {
        team: round(statistics.mean(scores), 4)
        for team, scores in sorted(team_scores.items())
    }

    # -- By season --
    season_scores: dict[int, list[float]] = {}
    for g in scored_games:
        year = g.get("year", 0)
        season_scores.setdefault(year, []).append(g["composite_score"])

    avg_by_season = {
        str(year): round(statistics.mean(scores), 4)
        for year, scores in sorted(season_scores.items())
    }

    # -- Distribution --
    sorted_scores = sorted(all_scores)
    n = len(sorted_scores)
    q1_idx = n // 4
    q2_idx = n // 2
    q3_idx = (3 * n) // 4

    distribution = {
        "count": n,
        "mean": round(statistics.mean(all_scores), 4),
        "median": round(statistics.median(all_scores), 4),
        "stdev": round(statistics.stdev(all_scores), 4) if n > 1 else 0.0,
        "min": round(min(all_scores), 4),
        "q1": round(sorted_scores[q1_idx], 4),
        "q2": round(sorted_scores[q2_idx], 4),
        "q3": round(sorted_scores[q3_idx], 4),
        "max": round(max(all_scores), 4),
    }

    # -- Safest and least safe --
    safest_city = max(avg_by_city, key=avg_by_city.get)  # type: ignore[arg-type]
    least_safe_city = min(avg_by_city, key=avg_by_city.get)  # type: ignore[arg-type]

    return {
        "average_score_by_city": avg_by_city,
        "average_score_by_team": avg_by_team,
        "average_score_by_season": avg_by_season,
        "dark_cities": dark_cities,
        "safest_city": {"city": safest_city, "score": avg_by_city[safest_city]},
        "least_safe_city": {
            "city": least_safe_city,
            "score": avg_by_city[least_safe_city],
        },
        "distribution": distribution,
    }


# ---------------------------------------------------------------------------
# Headline logging
# ---------------------------------------------------------------------------

def log_headlines(
    scored_games: list[dict[str, Any]],
    summary: dict[str, Any],
) -> None:
    """Log the headline findings to the console."""
    dist = summary.get("distribution", {})
    dark = summary.get("dark_cities", [])
    safest = summary.get("safest_city", {})
    least_safe = summary.get("least_safe_city", {})

    log.info("=" * 60)
    log.info("SAFETY SCORE HEADLINE FINDINGS")
    log.info("=" * 60)
    log.info("Total games analyzed:        %d", dist.get("count", 0))
    log.info(
        "Dark cities (0 listings/1mi): %d  %s",
        len(dark),
        dark if dark else "(none)",
    )
    log.info("Average composite score:     %.4f", dist.get("mean", 0))
    log.info(
        "Safest city:                 %s (%.4f)",
        safest.get("city", "N/A"),
        safest.get("score", 0),
    )
    log.info(
        "Least safe city:             %s (%.4f)",
        least_safe.get("city", "N/A"),
        least_safe.get("score", 0),
    )
    log.info("--- Score distribution (quartiles) ---")
    log.info("  Min: %.4f", dist.get("min", 0))
    log.info("  Q1:  %.4f", dist.get("q1", 0))
    log.info("  Q2:  %.4f (median)", dist.get("q2", 0))
    log.info("  Q3:  %.4f", dist.get("q3", 0))
    log.info("  Max: %.4f", dist.get("max", 0))
    log.info("=" * 60)


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    """Run the M2 safety score computation pipeline."""
    log.info("Safety score computation (M2) -- Phase 3")

    matched_path = DATA_DIR / "game_listings_matched.json"
    schedule_path = DATA_DIR / "schedule_1936_1948.json"

    # ------------------------------------------------------------------
    # 1. Load input data
    # ------------------------------------------------------------------
    use_matched = False
    games: list[dict[str, Any]] = []

    if matched_path.exists():
        log.info("Loading matched listings from %s", matched_path)
        matched_data = _load_json(matched_path)
        if isinstance(matched_data, list):
            games = matched_data
        elif isinstance(matched_data, dict):
            games = matched_data.get("games", [])
        use_matched = True
        log.info("Loaded %d game records with listing data.", len(games))
    elif schedule_path.exists():
        log.warning(
            "game_listings_matched.json not found. Falling back to "
            "schedule data only. Listing-derived components will be zero."
        )
        schedule_data = _load_json(schedule_path)
        games = schedule_data.get("games", [])
        log.info(
            "Loaded %d game records from schedule (no listing data).",
            len(games),
        )
    else:
        log.warning(
            "No input data found. Expected one of:\n"
            "  %s\n  %s\n"
            "Run upstream pipeline steps first (01 through 03).",
            matched_path,
            schedule_path,
        )
        return

    if not games:
        log.warning("Input file contained zero game records. Nothing to do.")
        return

    # ------------------------------------------------------------------
    # 2. Compute raw component values for each game
    # ------------------------------------------------------------------
    log.info("Computing raw safety components for %d games...", len(games))

    raw_components: list[dict[str, float]] = []
    for game in games:
        if use_matched:
            comps = compute_components_from_matched(game)
        else:
            comps = compute_components_from_schedule(game)
        raw_components.append(comps)

    # ------------------------------------------------------------------
    # 3. Normalize components to [0, 1]
    # ------------------------------------------------------------------
    log.info("Normalizing components to [0, 1] range...")
    normed_components = normalize_components(raw_components)

    # ------------------------------------------------------------------
    # 4. Compute composite score and build output records
    # ------------------------------------------------------------------
    log.info("Computing composite scores...")
    scored_games: list[dict[str, Any]] = []

    for i, game in enumerate(games):
        normed = normed_components[i]
        raw = raw_components[i]
        score = composite_score(normed)

        record: dict[str, Any] = {
            "game_index": i,
            "date": game.get("date", ""),
            "home_team": game.get("home_team", ""),
            "away_team": game.get("away_team", ""),
            "city": game.get("city", ""),
            "state": game.get("state", ""),
            "ballpark_name": game.get("ballpark_name", ""),
            "ballpark_id": game.get("ballpark_id", ""),
            "year": game.get("year", 0),
            "league": game.get("league", ""),
            "lat": game.get("lat"),
            "lon": game.get("lon"),
            "components": {
                "listings_1mi": raw["listings_1mi"],
                "listings_5mi": raw["listings_5mi"],
                "has_hotel_1mi": raw["has_hotel_1mi"],
                "category_diversity": round(raw["category_diversity"], 4),
                "black_population_pct": raw["black_population_pct"],
                "sundown_distance_inv": raw["sundown_distance_inv"],
            },
            "normalized_components": {
                k: round(v, 4) for k, v in normed.items()
            },
            "composite_score": score,
        }
        scored_games.append(record)

    # ------------------------------------------------------------------
    # 5. Build summary
    # ------------------------------------------------------------------
    log.info("Building summary statistics...")
    summary = build_summary(scored_games)

    # ------------------------------------------------------------------
    # 6. Write output files
    # ------------------------------------------------------------------
    scores_output: dict[str, Any] = {
        "description": (
            "M2 composite safety scores for each Negro Leagues game "
            "location, 1936--1948. Higher score = more accessible."
        ),
        "weights": WEIGHTS,
        "weights_note": (
            "These weights are preliminary and subject to Elias review "
            "before finalization. See METHODOLOGY.md for rationale."
        ),
        "data_source": (
            "game_listings_matched.json" if use_matched
            else "schedule_1936_1948.json (fallback -- no listing data)"
        ),
        "sundown_note": (
            "sundown_distance_inv is set to a neutral placeholder (0.5) "
            "for all cities. This component awaits the Loewen Sundown "
            "Towns database integration in Chapter 03."
        ),
        "census_source": (
            "U.S. Census Bureau, Sixteenth Census of the United States: "
            "1940, Population, Vol. II, Table 35. Public domain."
        ),
        "game_count": len(scored_games),
        "games": scored_games,
    }

    summary_output: dict[str, Any] = {
        "description": (
            "Aggregate safety score statistics by city, team, and season."
        ),
        "weights": WEIGHTS,
        **summary,
    }

    _save_json(DATA_DIR / "safety_scores.json", scores_output)
    _save_json(DATA_DIR / "safety_summary.json", summary_output)

    # ------------------------------------------------------------------
    # 7. Log headlines
    # ------------------------------------------------------------------
    log_headlines(scored_games, summary)

    log.info("Safety score pipeline complete.")


if __name__ == "__main__":
    main()
