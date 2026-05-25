"""
M3 Case Study Selection -- Five Sundown Towns

Selects five documented sundown towns for the narrative case studies
based on three criteria:
  1. Proximity to a Negro Leagues ballpark (within 10 miles)
  2. Evidence tier (Confirmed strongly preferred)
  3. Corridor exposure (appears in multiple travel corridors)

Selection methodology:
  - Top 3 by composite score among Confirmed evidence towns
  - 2 additional selected for geographic diversity and historical
    significance (not all from the same region)

The spec requires: "top 3 by ballpark proximity + 2 by documented
incident richness." Since NAACP/FBI primary source assembly is
pending, incident richness is approximated by corridor exposure
count (more corridors = more teams passed through = more documented
potential for encounter).

Input:
  - chapters/03-the-sundown-corridor/data/sundown-towns.json
  - chapters/03-the-sundown-corridor/data/corridors-full.json
  - chapters/03-the-sundown-corridor/data/game-locations.json

Output:
  - chapters/03-the-sundown-corridor/data/case-studies.json

Confidence: Modeled (selection), Documented (evidence tiers)
"""

import json
import math
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(BASE, "data", "corridors-full.json")) as f:
    corridors = json.load(f)

with open(os.path.join(BASE, "data", "sundown-towns.json")) as f:
    sundown = json.load(f)

with open(os.path.join(BASE, "data", "game-locations.json")) as f:
    locations = json.load(f)


def haversine(lat1, lon1, lat2, lon2):
    R = 3959
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = (
        math.sin(dlat / 2) ** 2
        + math.cos(math.radians(lat1))
        * math.cos(math.radians(lat2))
        * math.sin(dlon / 2) ** 2
    )
    return R * 2 * math.asin(math.sqrt(a))


ballparks = [
    (l["city"], l["state"], l["lat"], l["lng"], l["primary_team"])
    for l in locations["locations"]
]

# Build corridor appearance index
corridor_appearances = {}
for c in corridors["corridors"]:
    for t in c.get("nearby_towns", []):
        key = (t["name"], t["state"])
        if key not in corridor_appearances:
            corridor_appearances[key] = []
        corridor_appearances[key].append({
            "corridor": f"{c['from']} -> {c['to']}",
            "danger": c["danger_score"],
            "distance_miles": t["distance_miles"],
        })

# Score all towns
scored = []
seen = set()
for town in sundown["towns"]:
    if not town.get("lat") or not town.get("lng"):
        continue

    # Deduplicate by name+state (some towns have multiple coordinate entries)
    dedup_key = (town["name"], town["state"])
    if dedup_key in seen:
        continue
    seen.add(dedup_key)

    # Nearest ballpark
    min_dist = float("inf")
    nearest_park = None
    nearest_team = None
    for city, state, plat, plng, team in ballparks:
        d = haversine(town["lat"], town["lng"], plat, plng)
        if d < min_dist:
            min_dist = d
            nearest_park = f"{city}, {state}"
            nearest_team = team

    key = (town["name"], town["state"])
    appearances = corridor_appearances.get(key, [])
    ev_weight = {"Confirmed": 3, "Probable": 2, "Possible": 1}.get(
        town["evidence"], 0
    )

    if min_dist < 1:
        prox = 10
    elif min_dist < 5:
        prox = 8
    elif min_dist < 10:
        prox = 6
    elif min_dist < 20:
        prox = 4
    else:
        prox = 0

    composite = prox * 3 + ev_weight * 5 + len(appearances) * 4

    scored.append({
        "name": town["name"],
        "state": town["state"],
        "lat": town["lat"],
        "lng": town["lng"],
        "evidence": town["evidence"],
        "source_url": town.get("source_url"),
        "nearest_ballpark": nearest_park,
        "nearest_team": nearest_team,
        "ballpark_distance_miles": round(min_dist, 1),
        "corridor_appearances": len(appearances),
        "corridors": appearances,
        "composite_score": composite,
    })

scored.sort(key=lambda t: t["composite_score"], reverse=True)

# --- Selection ---
# Top 3 Confirmed towns by composite score
confirmed = [t for t in scored if t["evidence"] == "Confirmed"]

# Track regions to ensure geographic diversity
selected = []
regions_used = set()


def region_of(state):
    midwest = {"IL", "IN", "OH", "MI", "MO", "WI", "MN", "IA"}
    east = {"PA", "NJ", "NY", "CT", "MA", "MD", "DE", "D.C."}
    south = {"AL", "GA", "TN", "SC", "NC", "VA", "FL", "MS", "LA", "KY", "AR", "TX"}
    if state in midwest:
        return "Midwest"
    if state in east:
        return "East"
    if state in south:
        return "South"
    return "Other"


# Pick top 3 Confirmed, preferring geographic diversity
for town in confirmed:
    if len(selected) >= 3:
        break
    region = region_of(town["state"])
    # Allow up to 2 from same region for top 3
    if sum(1 for s in selected if region_of(s["state"]) == region) < 2:
        selected.append(town)
        regions_used.add(region)

# If we don't have 3 yet, fill from remaining Confirmed
for town in confirmed:
    if len(selected) >= 3:
        break
    if town not in selected:
        selected.append(town)

# Pick 2 more for incident richness / geographic diversity
# Prefer Confirmed, then Probable, from underrepresented regions
remaining = [
    t for t in scored
    if t not in selected
    and t["evidence"] in ("Confirmed", "Probable")
    and t["corridor_appearances"] >= 2
]

for town in remaining:
    if len(selected) >= 5:
        break
    region = region_of(town["state"])
    # Prefer regions not yet represented
    if region not in regions_used:
        selected.append(town)
        regions_used.add(region)

# Fill remaining slots from highest-scoring remaining
for town in remaining:
    if len(selected) >= 5:
        break
    if town not in selected:
        selected.append(town)

# --- Output ---

print("Selected 5 case study towns:")
for i, t in enumerate(selected, 1):
    print(
        f"  {i}. {t['name']}, {t['state']}  "
        f"evidence={t['evidence']}  "
        f"park={t['ballpark_distance_miles']}mi ({t['nearest_ballpark']})  "
        f"corridors={t['corridor_appearances']}  "
        f"region={region_of(t['state'])}"
    )

# Prepare case study entries
case_studies = []
for i, town in enumerate(selected, 1):
    entry = {
        "id": i,
        "town": town["name"],
        "state": town["state"],
        "lat": town["lat"],
        "lng": town["lng"],
        "sundown_status": town["evidence"],
        "evidence_source": town["source_url"],
        "nearest_ballpark": town["nearest_ballpark"],
        "nearest_team": town["nearest_team"],
        "ballpark_distance_miles": town["ballpark_distance_miles"],
        "corridor_appearances": town["corridor_appearances"],
        "corridors_detail": town["corridors"],
        "selection_reason": (
            "Top composite score among Confirmed evidence towns"
            if i <= 3
            else "Geographic diversity + corridor exposure"
        ),
        "primary_sources_needed": [
            "NAACP anti-lynching records",
            "FBI historical records (FOIA)",
            "Period newspaper accounts",
            "Census data (Black population 1920-1950)",
        ],
        "narrative_status": "Pending primary source assembly",
        "narrative_confidence": "AI-generated (when completed)",
        "confidence": "Documented" if town["evidence"] == "Confirmed" else "Probable",
    }
    case_studies.append(entry)

output = {
    "metadata": {
        "title": "Sundown Corridor Case Study Towns",
        "description": (
            "Five documented sundown towns selected for narrative "
            "case studies, based on ballpark proximity, evidence "
            "tier, corridor exposure, and geographic diversity."
        ),
        "methodology": {
            "selection": (
                "Composite score: proximity to nearest NLB ballpark "
                "(30%), evidence tier (33%), corridor appearances (37%). "
                "Top 3 Confirmed towns by score, then 2 additional "
                "for geographic diversity."
            ),
            "narrative_pipeline": (
                "When primary sources are assembled: Claude API "
                "generates 300-word narrative per town, reviewed "
                "by Oscar against primary source citations."
            ),
        },
        "source": {
            "sundown_towns": (
                "Scientific Data (2025), DOI: 10.1038/s41597-024-04330-9"
            ),
            "evidence_database": "Loewen/Berrey, justice.tougaloo.edu",
            "locations": "Seamheads + SABR Ballparks Database",
        },
        "processed_date": "2026-05-25",
    },
    "case_studies": case_studies,
    "runner_up_towns": [
        {
            "name": t["name"],
            "state": t["state"],
            "evidence": t["evidence"],
            "ballpark_distance_miles": t["ballpark_distance_miles"],
            "nearest_ballpark": t["nearest_ballpark"],
            "corridor_appearances": t["corridor_appearances"],
            "composite_score": t["composite_score"],
        }
        for t in scored[:20]
        if t not in selected
    ],
}

out_path = os.path.join(BASE, "data", "case-studies.json")
with open(out_path, "w") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
print(f"\nSaved to {out_path}")
