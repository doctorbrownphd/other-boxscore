"""
M2: Route Counterfactual -- Safer Alternative Route Analysis

For each high-danger travel corridor (danger >= 0.5), determines
whether a safer alternative route existed through intermediate
Negro Leagues cities.

Uses the 13-city network of documented NLB game locations and the
34 computed corridor danger scores. For each high-danger direct
route A->B, finds all 1-stop and 2-stop alternatives A->C->B or
A->C->D->B where the maximum segment danger is lower than the
direct route.

This is a model output, not a historical claim. It shows what was
geographically possible, not what decision-makers considered.

Input:
  - chapters/03-the-sundown-corridor/data/corridors-full.json
  - chapters/03-the-sundown-corridor/data/game-locations.json
  - chapters/03-the-sundown-corridor/data/sundown-towns.json

Output:
  - chapters/03-the-sundown-corridor/data/counterfactual-routes.json

Confidence: Modeled
"""

import json
import math
import os
import time

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# --- Load data ---

with open(os.path.join(BASE, "data", "corridors-full.json")) as f:
    corridors_data = json.load(f)

with open(os.path.join(BASE, "data", "game-locations.json")) as f:
    locations_data = json.load(f)

with open(os.path.join(BASE, "data", "sundown-towns.json")) as f:
    sundown_data = json.load(f)

# --- Build city graph ---

city_coords = {}
for loc in locations_data["locations"]:
    key = f"{loc['city']}, {loc['state']}"
    city_coords[key] = (loc["lat"], loc["lng"])

cities = sorted(city_coords.keys())

# Corridor danger lookup (bidirectional)
corridor_lookup = {}
for c in corridors_data["corridors"]:
    pair = tuple(sorted([c["from"], c["to"]]))
    corridor_lookup[pair] = c


def haversine_miles(lat1, lon1, lat2, lon2):
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


def point_to_segment_distance_miles(plat, plon, lat1, lon1, lat2, lon2):
    dx = lon2 - lon1
    dy = lat2 - lat1
    seg_len_sq = dx * dx + dy * dy
    if seg_len_sq < 1e-12:
        return haversine_miles(plat, plon, lat1, lon1)
    t = ((plon - lon1) * dx + (plat - lat1) * dy) / seg_len_sq
    t = max(0.0, min(1.0, t))
    proj_lat = lat1 + t * dy
    proj_lon = lon1 + t * dx
    return haversine_miles(plat, plon, proj_lat, proj_lon)


EVIDENCE_WEIGHTS = {"Confirmed": 1.0, "Probable": 0.7, "Possible": 0.4}
CORRIDOR_RADIUS_MI = 5
NORMALIZATION_BASIS = 8.0
UPPER_BOUND_MULTIPLIER = 2.5

sundown_towns = [
    (t["lat"], t["lng"], t["evidence"], t["name"], t["state"])
    for t in sundown_data["towns"]
    if t.get("lat") is not None and t.get("lng") is not None
]


def compute_corridor_danger(city_a, city_b):
    """Compute danger score for a city pair (uses cache or computes fresh)."""
    pair = tuple(sorted([city_a, city_b]))
    if pair in corridor_lookup:
        c = corridor_lookup[pair]
        return c["danger_score"], c["route_distance_miles"], c["towns_within_5mi"]

    # Compute fresh for pairs not in the pre-computed set
    if city_a not in city_coords or city_b not in city_coords:
        return None, None, None

    lat1, lon1 = city_coords[city_a]
    lat2, lon2 = city_coords[city_b]
    dist = haversine_miles(lat1, lon1, lat2, lon2)
    if dist < 1:
        return 0, 0, 0

    margin = 0.15
    min_lat = min(lat1, lat2) - margin
    max_lat = max(lat1, lat2) + margin
    min_lon = min(lon1, lon2) - margin
    max_lon = max(lon1, lon2) + margin

    nearby_count = 0
    weighted = 0
    for tlat, tlon, evidence, _, _ in sundown_towns:
        if tlat < min_lat or tlat > max_lat:
            continue
        if tlon < min_lon or tlon > max_lon:
            continue
        d = point_to_segment_distance_miles(tlat, tlon, lat1, lon1, lat2, lon2)
        if d <= CORRIDOR_RADIUS_MI:
            nearby_count += 1
            weighted += EVIDENCE_WEIGHTS.get(evidence, 0.4)

    per_100 = (weighted / dist) * 100
    danger = min(per_100 / NORMALIZATION_BASIS, 1.0)
    return round(danger, 3), round(dist, 1), nearby_count


# --- Compute all pairwise corridor dangers (fill missing pairs) ---

print("Computing all pairwise corridor dangers...")
all_pairs = {}
for i, ca in enumerate(cities):
    for cb in cities[i + 1:]:
        pair = tuple(sorted([ca, cb]))
        if pair in corridor_lookup:
            c = corridor_lookup[pair]
            all_pairs[pair] = {
                "danger": c["danger_score"],
                "miles": c["route_distance_miles"],
                "towns": c["towns_within_5mi"],
            }
        else:
            danger, miles, towns = compute_corridor_danger(ca, cb)
            if danger is not None:
                all_pairs[pair] = {
                    "danger": danger,
                    "miles": miles,
                    "towns": towns,
                }

print(f"Total city pairs: {len(all_pairs)}")


def get_pair_data(ca, cb):
    pair = tuple(sorted([ca, cb]))
    return all_pairs.get(pair)


# --- Find alternative routes for high-danger corridors ---

HIGH_DANGER_THRESHOLD = 0.4  # Analyze routes above this
SAFER_THRESHOLD = 0.5  # Alternative must reduce max segment danger by this factor

print(f"\nAnalyzing high-danger corridors (danger >= {HIGH_DANGER_THRESHOLD})...")

high_danger = []
for pair, data in sorted(all_pairs.items(), key=lambda x: -x[1]["danger"]):
    if data["danger"] >= HIGH_DANGER_THRESHOLD:
        high_danger.append((pair[0], pair[1], data))

print(f"Found {len(high_danger)} high-danger corridors to analyze")

results = []

for city_a, city_b, direct in high_danger:
    direct_danger = direct["danger"]
    direct_miles = direct["miles"]
    direct_towns = direct["towns"]

    alternatives = []

    # 1-stop alternatives: A -> C -> B
    for city_c in cities:
        if city_c in (city_a, city_b):
            continue

        seg1 = get_pair_data(city_a, city_c)
        seg2 = get_pair_data(city_c, city_b)
        if not seg1 or not seg2:
            continue

        max_seg_danger = max(seg1["danger"], seg2["danger"])
        total_miles = seg1["miles"] + seg2["miles"]
        total_towns = seg1["towns"] + seg2["towns"]

        # Is this meaningfully safer?
        if max_seg_danger < direct_danger * SAFER_THRESHOLD:
            alternatives.append({
                "type": "1-stop",
                "route": [city_a, city_c, city_b],
                "max_segment_danger": max_seg_danger,
                "total_miles": round(total_miles, 1),
                "additional_miles": round(total_miles - direct_miles, 1),
                "mile_increase_pct": round(
                    (total_miles - direct_miles) / max(direct_miles, 1) * 100, 0
                ),
                "total_towns_encountered": total_towns,
                "segments": [
                    {
                        "from": city_a,
                        "to": city_c,
                        "danger": seg1["danger"],
                        "miles": seg1["miles"],
                        "towns": seg1["towns"],
                    },
                    {
                        "from": city_c,
                        "to": city_b,
                        "danger": seg2["danger"],
                        "miles": seg2["miles"],
                        "towns": seg2["towns"],
                    },
                ],
            })

    # 2-stop alternatives: A -> C -> D -> B
    for city_c in cities:
        if city_c in (city_a, city_b):
            continue
        for city_d in cities:
            if city_d in (city_a, city_b, city_c):
                continue

            seg1 = get_pair_data(city_a, city_c)
            seg2 = get_pair_data(city_c, city_d)
            seg3 = get_pair_data(city_d, city_b)
            if not seg1 or not seg2 or not seg3:
                continue

            max_seg_danger = max(seg1["danger"], seg2["danger"], seg3["danger"])
            total_miles = seg1["miles"] + seg2["miles"] + seg3["miles"]

            # Must be meaningfully safer AND not absurdly long
            if (
                max_seg_danger < direct_danger * SAFER_THRESHOLD
                and total_miles < direct_miles * 3
            ):
                total_towns = seg1["towns"] + seg2["towns"] + seg3["towns"]
                alternatives.append({
                    "type": "2-stop",
                    "route": [city_a, city_c, city_d, city_b],
                    "max_segment_danger": max_seg_danger,
                    "total_miles": round(total_miles, 1),
                    "additional_miles": round(total_miles - direct_miles, 1),
                    "mile_increase_pct": round(
                        (total_miles - direct_miles) / max(direct_miles, 1) * 100,
                        0,
                    ),
                    "total_towns_encountered": total_towns,
                    "segments": [
                        {
                            "from": city_a,
                            "to": city_c,
                            "danger": seg1["danger"],
                            "miles": seg1["miles"],
                            "towns": seg1["towns"],
                        },
                        {
                            "from": city_c,
                            "to": city_d,
                            "danger": seg2["danger"],
                            "miles": seg2["miles"],
                            "towns": seg2["towns"],
                        },
                        {
                            "from": city_d,
                            "to": city_b,
                            "danger": seg3["danger"],
                            "miles": seg3["miles"],
                            "towns": seg3["towns"],
                        },
                    ],
                })

    # Sort alternatives by max segment danger (safest first)
    alternatives.sort(key=lambda a: a["max_segment_danger"])

    # Classify
    safer_exists = len(alternatives) > 0
    best = alternatives[0] if alternatives else None

    entry = {
        "from": city_a,
        "to": city_b,
        "direct_danger": direct_danger,
        "direct_miles": direct_miles,
        "direct_towns": direct_towns,
        "safer_alternative_exists": safer_exists,
        "alternatives_found": len(alternatives),
        "best_alternative": best,
        "all_alternatives": alternatives[:5],  # Top 5 only
        "confidence": "Modeled",
    }

    if best:
        entry["danger_reduction"] = round(direct_danger - best["max_segment_danger"], 3)
        entry["danger_reduction_pct"] = round(
            (direct_danger - best["max_segment_danger"]) / direct_danger * 100, 0
        )
        feasibility_miles = best["additional_miles"]
        if feasibility_miles < 50:
            entry["feasibility"] = "Highly feasible (under 50 extra miles)"
        elif feasibility_miles < 150:
            entry["feasibility"] = "Feasible but adds significant distance"
        elif feasibility_miles < 300:
            entry["feasibility"] = "Feasible but adds half a day of travel"
        else:
            entry["feasibility"] = "Theoretically possible but impractical"
    else:
        entry["danger_reduction"] = 0
        entry["danger_reduction_pct"] = 0
        entry["feasibility"] = "No safer alternative given the city network"

    results.append(entry)

    marker = "SAFER EXISTS" if safer_exists else "NO ALTERNATIVE"
    print(
        f"  {city_a:25s} -> {city_b:25s}  "
        f"danger={direct_danger:.3f}  "
        f"{marker}  "
        f"({len(alternatives)} options)"
    )

# --- Aggregate findings ---

total = len(results)
with_alternatives = sum(1 for r in results if r["safer_alternative_exists"])
without = total - with_alternatives

print(f"\nSummary:")
print(f"  High-danger corridors analyzed: {total}")
print(f"  Safer alternative exists: {with_alternatives}")
print(f"  No safer alternative: {without}")
if with_alternatives > 0:
    avg_reduction = sum(
        r["danger_reduction_pct"]
        for r in results if r["safer_alternative_exists"]
    ) / with_alternatives
    print(f"  Average danger reduction: {avg_reduction:.0f}%")

# --- Output ---

output = {
    "metadata": {
        "title": "Negro Leagues Travel Route Counterfactual Analysis",
        "description": (
            "For each high-danger travel corridor between Negro Leagues "
            "cities, whether a documented safer alternative route existed "
            "through other NLB cities in the 13-city network."
        ),
        "methodology": {
            "approach": (
                "Graph routing on the 13-city Negro Leagues network. "
                "For each direct corridor with danger >= "
                f"{HIGH_DANGER_THRESHOLD}, all 1-stop and 2-stop "
                "alternative paths are evaluated."
            ),
            "safer_threshold": (
                f"An alternative is 'safer' if its maximum segment "
                f"danger is below {SAFER_THRESHOLD * 100:.0f}% of the "
                f"direct route's danger score."
            ),
            "distance_limit": (
                "2-stop alternatives are excluded if total distance "
                "exceeds 3x the direct route."
            ),
            "caveat": (
                "This is a model output. It does not claim that "
                "historical decision-makers considered these alternatives. "
                "It shows what was geographically possible within the "
                "Negro Leagues city network."
            ),
            "limitations": [
                "Uses great-circle distances, not period road distances.",
                "Only considers NLB cities as waypoints. Smaller towns "
                "with safe lodging (e.g., Green Book listings) are not "
                "modeled as stops.",
                "Does not account for schedule constraints. Teams had "
                "game dates they could not miss.",
                "Danger scores are based on documented sundown towns. "
                "Actual danger may have been higher.",
            ],
        },
        "source": {
            "corridors": "corridors-full.json (computed from sundown-towns.json)",
            "sundown_towns": "Scientific Data (2025), DOI: 10.1038/s41597-024-04330-9",
            "locations": "Seamheads + SABR Ballparks Database",
        },
        "aggregate": {
            "total_high_danger_corridors": total,
            "safer_alternative_exists_count": with_alternatives,
            "no_safer_alternative_count": without,
            "percent_with_alternatives": round(
                with_alternatives / max(total, 1) * 100, 0
            ),
        },
        "processed_date": "2026-05-25",
    },
    "route_counterfactuals": results,
}

out_path = os.path.join(BASE, "data", "counterfactual-routes.json")
with open(out_path, "w") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
print(f"\nSaved to {out_path}")
