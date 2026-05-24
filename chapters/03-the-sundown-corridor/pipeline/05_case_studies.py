"""
05_case_studies.py -- Select and document the 5 case study towns.

Phase 9 of the Sundown Corridor pipeline.

Input:  data/sundown_towns.json          (from 01_sundown_data.py)
        data/ballpark_proximity.json     (from 02_proximity_join.py)
        data/corridor_scores.json        (from 03_corridor_score.py)

Output: data/case_studies.json
        Five selected case study towns/corridors with documentation,
        proximity data, and selection rationale.

Method: Score each documented sundown town against five selection criteria
        from the spec: documentation quality, proximity to Negro Leagues
        activity, historical incident documentation, geographic diversity,
        and named individuals where possible. Select the top 5.

Gate:   Oscar reviews all primary source citations.
"""

from __future__ import annotations

import json
import logging
from collections import Counter, defaultdict
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

SUNDOWN_PATH = DATA_DIR / "sundown_towns.json"
PROXIMITY_PATH = DATA_DIR / "ballpark_proximity.json"
CORRIDOR_SCORES_PATH = DATA_DIR / "corridor_scores.json"
OUTPUT_PATH = DATA_DIR / "case_studies.json"

DATA_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# Selection criteria weights
# ---------------------------------------------------------------------------

# From the spec, case studies are selected for:
# 1. Documentation quality -- confirmed status, primary source evidence
# 2. Proximity to Negro Leagues activity
# 3. Historical incident documentation
# 4. Geographic diversity
# 5. Named individuals where possible

CRITERIA_WEIGHTS: dict[str, float] = {
    "documentation_quality": 0.30,
    "proximity_to_nl_activity": 0.25,
    "incident_documentation": 0.20,
    "geographic_diversity": 0.15,
    "named_individuals": 0.10,
}

# Target geographic regions for diversity
TARGET_REGIONS: list[str] = [
    "Midwest",
    "Northeast",
    "Mid-Atlantic",
    "Southeast",
    "Plains/West",
]


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


def load_proximity_data() -> list[dict[str, Any]]:
    """Load ballpark proximity data."""
    if not PROXIMITY_PATH.exists():
        log.warning(
            "Proximity data not found at %s. "
            "Proximity scoring will use defaults.",
            PROXIMITY_PATH,
        )
        return []
    with PROXIMITY_PATH.open("r", encoding="utf-8") as f:
        data = json.load(f)
    proximity = data.get("ballpark_proximity", [])
    log.info("Loaded proximity data for %d ballparks.", len(proximity))
    return proximity


def load_corridor_scores() -> list[dict[str, Any]]:
    """Load corridor scores for route analysis."""
    if not CORRIDOR_SCORES_PATH.exists():
        log.warning(
            "Corridor scores not found at %s. "
            "Route-based scoring will use defaults.",
            CORRIDOR_SCORES_PATH,
        )
        return []
    with CORRIDOR_SCORES_PATH.open("r", encoding="utf-8") as f:
        data = json.load(f)
    scores = data.get("corridor_scores", [])
    log.info("Loaded corridor scores for %d team-seasons.", len(scores))
    return scores


# ---------------------------------------------------------------------------
# Region classification
# ---------------------------------------------------------------------------

def classify_region(lat: float, lon: float) -> str:
    """Assign a geographic region based on coordinates.

    Args:
        lat: Latitude in decimal degrees.
        lon: Longitude in decimal degrees.

    Returns:
        Region name string.
    """
    if lon > -80:
        if lat > 39:
            return "Northeast"
        if lat >= 36:
            return "Mid-Atlantic"
        return "Southeast"
    if lon > -85:
        if lat < 36:
            return "Southeast"
        return "Midwest"
    if lon >= -95:
        if lat >= 36:
            return "Midwest"
        return "Southeast"
    return "Plains/West"


# ---------------------------------------------------------------------------
# Case study scoring
# ---------------------------------------------------------------------------

def build_proximity_index(
    proximity_data: list[dict[str, Any]],
) -> dict[str, list[dict[str, Any]]]:
    """Build an index of sundown towns that appear in proximity data.

    Maps town_name|state to list of ballparks where the town appears
    in the 10mi proximity band.

    Args:
        proximity_data: Ballpark proximity records.

    Returns:
        Dict mapping town key to list of nearby ballpark records.
    """
    index: dict[str, list[dict[str, Any]]] = defaultdict(list)

    for bp in proximity_data:
        within_10 = bp.get("within_10mi", {})
        towns = within_10.get("towns", [])
        for town in towns:
            key = f"{town.get('town_name', '')}|{town.get('state', '')}"
            index[key].append({
                "ballpark_name": bp.get("ballpark_name", ""),
                "city": bp.get("city", ""),
                "state": bp.get("state", ""),
                "distance_mi": town.get("distance_mi", 0),
            })

    return index


def build_route_appearance_index(
    corridor_scores: list[dict[str, Any]],
) -> Counter[str]:
    """Count how many route segments each sundown town appears in.

    Args:
        corridor_scores: Team-season corridor score records.

    Returns:
        Counter mapping town_name|state to appearance count.
    """
    appearances: Counter[str] = Counter()

    for entry in corridor_scores:
        for segment in entry.get("segments", []):
            for town in segment.get("towns", []):
                key = f"{town.get('town_name', '')}|{town.get('state', '')}"
                appearances[key] += 1

    return appearances


def score_candidate(
    town: dict[str, Any],
    proximity_index: dict[str, list[dict[str, Any]]],
    route_appearances: Counter[str],
    selected_regions: list[str],
) -> dict[str, Any]:
    """Score a single sundown town as a case study candidate.

    Args:
        town: Sundown town record.
        proximity_index: Index of towns appearing near ballparks.
        route_appearances: Count of route segment appearances.
        selected_regions: Regions already represented in selections.

    Returns:
        Scoring record with component scores and total.
    """
    town_key = f"{town.get('town_name', '')}|{town.get('state', '')}"
    tier = town.get("evidence_tier", "Possible")

    # 1. Documentation quality (0-1)
    doc_score = {"Confirmed": 1.0, "Probable": 0.6, "Possible": 0.2}.get(tier, 0.2)

    # 2. Proximity to NL activity (0-1)
    nearby_ballparks = proximity_index.get(town_key, [])
    route_count = route_appearances.get(town_key, 0)
    proximity_score = min(1.0, len(nearby_ballparks) * 0.3 + route_count * 0.05)

    # 3. Incident documentation (0-1)
    # This is a placeholder -- in production, this would check NAACP/FBI
    # records. For now, confirmed towns with high proximity score higher.
    incident_score = doc_score * 0.5 + proximity_score * 0.3

    # 4. Geographic diversity (0-1)
    lat = town.get("lat", 0.0)
    lon = town.get("lon", 0.0)
    region = classify_region(float(lat), float(lon))
    diversity_score = 1.0 if region not in selected_regions else 0.2

    # 5. Named individuals (0-1)
    # Placeholder -- requires manual research. Score as 0 until
    # primary source review identifies named individuals.
    named_score = 0.0

    # Weighted total
    total = (
        CRITERIA_WEIGHTS["documentation_quality"] * doc_score
        + CRITERIA_WEIGHTS["proximity_to_nl_activity"] * proximity_score
        + CRITERIA_WEIGHTS["incident_documentation"] * incident_score
        + CRITERIA_WEIGHTS["geographic_diversity"] * diversity_score
        + CRITERIA_WEIGHTS["named_individuals"] * named_score
    )

    return {
        "town_name": town.get("town_name", ""),
        "state": town.get("state", ""),
        "lat": lat,
        "lon": lon,
        "evidence_tier": tier,
        "region": region,
        "scores": {
            "documentation_quality": round(doc_score, 3),
            "proximity_to_nl_activity": round(proximity_score, 3),
            "incident_documentation": round(incident_score, 3),
            "geographic_diversity": round(diversity_score, 3),
            "named_individuals": round(named_score, 3),
            "total": round(total, 3),
        },
        "nearby_ballparks": nearby_ballparks,
        "route_appearances": route_count,
    }


def select_case_studies(
    sundown_towns: list[dict[str, Any]],
    proximity_data: list[dict[str, Any]],
    corridor_scores: list[dict[str, Any]],
    n_studies: int = 5,
) -> list[dict[str, Any]]:
    """Select the top N case study towns based on weighted criteria.

    The selection process iterates to ensure geographic diversity:
    after each selection, the diversity score for towns in the same
    region is reduced.

    Args:
        sundown_towns: All sundown town records.
        proximity_data: Ballpark proximity records.
        corridor_scores: Team-season corridor scores.
        n_studies: Number of case studies to select.

    Returns:
        List of selected case study records.
    """
    proximity_index = build_proximity_index(proximity_data)
    route_appearances = build_route_appearance_index(corridor_scores)

    # Only consider confirmed and probable towns
    candidates = [
        t for t in sundown_towns
        if t.get("evidence_tier") in ("Confirmed", "Probable")
    ]
    log.info("Candidate pool: %d towns (Confirmed + Probable only).", len(candidates))

    selected: list[dict[str, Any]] = []
    selected_regions: list[str] = []
    selected_keys: set[str] = set()

    for round_num in range(n_studies):
        log.info("Selection round %d/%d...", round_num + 1, n_studies)

        best_score = -1.0
        best_candidate: dict[str, Any] | None = None

        for town in candidates:
            town_key = f"{town.get('town_name', '')}|{town.get('state', '')}"
            if town_key in selected_keys:
                continue

            scored = score_candidate(
                town, proximity_index, route_appearances, selected_regions,
            )

            if scored["scores"]["total"] > best_score:
                best_score = scored["scores"]["total"]
                best_candidate = scored

        if best_candidate is not None:
            town_key = f"{best_candidate['town_name']}|{best_candidate['state']}"
            selected_keys.add(town_key)
            selected_regions.append(best_candidate["region"])

            # Build the case study record
            case_study: dict[str, Any] = {
                "case_study_number": round_num + 1,
                "town_name": best_candidate["town_name"],
                "state": best_candidate["state"],
                "lat": best_candidate["lat"],
                "lon": best_candidate["lon"],
                "evidence_tier": best_candidate["evidence_tier"],
                "region": best_candidate["region"],
                "selection_scores": best_candidate["scores"],
                "nearby_ballparks": best_candidate["nearby_ballparks"],
                "route_segment_appearances": best_candidate["route_appearances"],
                "documentation": {
                    "sundown_status_sources": "[To be documented by Oscar]",
                    "enforcement_documentation": "[To be documented by Oscar]",
                    "naacp_records": "[To be checked]",
                    "fbi_records": "[To be checked]",
                    "newspaper_accounts": "[To be checked]",
                    "named_individuals": "[To be researched]",
                },
                "requires_oscar_review": True,
            }

            selected.append(case_study)
            log.info(
                "  Selected #%d: %s, %s (tier=%s, region=%s, score=%.3f)",
                round_num + 1,
                best_candidate["town_name"],
                best_candidate["state"],
                best_candidate["evidence_tier"],
                best_candidate["region"],
                best_score,
            )

    # The 5th case study is the aggregate (per spec)
    if len(selected) == n_studies:
        selected[-1] = {
            "case_study_number": n_studies,
            "town_name": "[AGGREGATE]",
            "state": "ALL",
            "type": "aggregate",
            "description": (
                "The aggregate Corridor Danger Score for a typical 1942 "
                "Negro Leagues team road trip. Not a specific town -- "
                "the aggregate documented sundown town exposure across "
                "a full season. This is the chapter's closing argument."
            ),
            "requires_oscar_review": True,
            "aggregate_data": "[To be calculated from corridor_scores.json]",
        }
        log.info("  Case study #%d set to aggregate (per spec).", n_studies)

    return selected


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------

def main() -> None:
    """Run the case study selection pipeline -- Phase 9."""
    log.info("Case study selection -- Phase 9")
    log.info("Output: %s", OUTPUT_PATH)

    # 1. Load data
    sundown_towns = load_sundown_towns()
    proximity_data = load_proximity_data()
    corridor_scores = load_corridor_scores()

    # 2. Select case studies
    case_studies = select_case_studies(
        sundown_towns, proximity_data, corridor_scores,
    )

    # 3. Write output
    output: dict[str, Any] = {
        "pipeline_version": "1.0",
        "selection_criteria": CRITERIA_WEIGHTS,
        "total_case_studies": len(case_studies),
        "note": (
            "All case study documentation fields marked '[To be documented]' "
            "or '[To be checked]' require Oscar's primary source review "
            "before publication. No case study ships without Oscar's approval."
        ),
        "case_studies": case_studies,
    }

    OUTPUT_PATH.write_text(
        json.dumps(output, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    log.info("Wrote %d case studies to %s", len(case_studies), OUTPUT_PATH)

    # 4. Log summary
    log.info("=" * 60)
    log.info("CASE STUDY SELECTIONS")
    for cs in case_studies:
        if cs.get("type") == "aggregate":
            log.info("  #%d: [AGGREGATE] -- closing number", cs["case_study_number"])
        else:
            log.info(
                "  #%d: %s, %s (%s, %s)",
                cs["case_study_number"],
                cs["town_name"],
                cs["state"],
                cs["evidence_tier"],
                cs["region"],
            )
    log.info("=" * 60)


if __name__ == "__main__":
    main()
