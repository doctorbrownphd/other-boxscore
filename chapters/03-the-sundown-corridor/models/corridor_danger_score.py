"""
M1: Corridor Danger Score -- Team-Season Aggregation

Computes corridor danger scores for every city pair observed in the
1936-1948 Negro Leagues schedule, then aggregates to team-season level.

For each city pair:
  1. Compute great-circle route between the two cities
  2. Find all documented sundown towns within 5 miles of the route
  3. Apply evidence weights: Confirmed=1.0, Probable=0.7, Possible=0.4
  4. Normalize to weighted towns per 100 route miles
  5. Scale to 0-1 range (8 weighted towns per 100mi = 1.0)
  6. Compute uncertainty bounds:
     - Lower: Confirmed-only towns
     - Upper: 2.5x multiplier for undocumented towns, capped at 1.0

For each team-season:
  1. Extract the away-game sequence (chronological)
  2. Infer travel segments between consecutive different cities
  3. Distance-weighted average danger score across all segments

Input:
  - chapters/02-the-green-book-route/data/schedule_1936_1948.json
  - chapters/03-the-sundown-corridor/data/sundown-towns.json
  - chapters/03-the-sundown-corridor/data/game-locations.json

Output:
  - chapters/03-the-sundown-corridor/data/team-season-danger.json
  - chapters/03-the-sundown-corridor/data/corridors-full.json

Confidence: Modeled
"""

import json
import os
import math
from collections import defaultdict

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CH02 = os.path.join(os.path.dirname(BASE), "02-the-green-book-route")

EVIDENCE_WEIGHTS = {"Confirmed": 1.0, "Probable": 0.7, "Possible": 0.4}
CORRIDOR_RADIUS_MI = 5
NORMALIZATION_BASIS = 8.0  # 8 weighted towns per 100mi = danger 1.0
UPPER_BOUND_MULTIPLIER = 2.5

# --- Load data ---

with open(os.path.join(CH02, "data", "schedule_1936_1948.json")) as f:
    schedule = json.load(f)

with open(os.path.join(BASE, "data", "sundown-towns.json")) as f:
    sundown_data = json.load(f)

with open(os.path.join(BASE, "data", "game-locations.json")) as f:
    locations_data = json.load(f)

print(f"Loaded {len(sundown_data['towns'])} sundown towns")
print(f"Loaded {len(locations_data['locations'])} game locations")
print(f"Loaded {len(schedule['games'])} games")

# --- Utility functions ---


def haversine_miles(lat1, lon1, lat2, lon2):
    """Great-circle distance in miles."""
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
    """Approximate distance from a point to the great-circle segment
    between two endpoints.

    Projects the point onto the line defined by the two endpoints
    (in lat/lon space, which is approximate but sufficient for
    distances under 500 miles in the continental US) and returns
    the haversine distance to the nearest point on the segment.
    """
    # Vector math in lat/lon space (good enough for mid-latitudes)
    dx = lon2 - lon1
    dy = lat2 - lat1
    seg_len_sq = dx * dx + dy * dy

    if seg_len_sq < 1e-12:
        return haversine_miles(plat, plon, lat1, lon1)

    # Project point onto line, clamp to segment
    t = ((plon - lon1) * dx + (plat - lat1) * dy) / seg_len_sq
    t = max(0.0, min(1.0, t))

    proj_lat = lat1 + t * dy
    proj_lon = lon1 + t * dx

    return haversine_miles(plat, plon, proj_lat, proj_lon)


# --- Build city coordinate lookup ---

city_coords = {}
city_to_team_home = {}
for loc in locations_data["locations"]:
    key = f"{loc['city']}, {loc['state']}"
    city_coords[key] = (loc["lat"], loc["lng"])
    city_to_team_home[loc["primary_team"]] = key

# Handle teams with multiple homes
TEAM_HOME_OVERRIDES = {
    "Homestead Grays": "Pittsburgh, PA",
    "Indianapolis Clowns": "Indianapolis, IN",
    "East-West All-Stars (East)": None,
}

# Pre-index sundown towns as (lat, lng, evidence) tuples for fast lookup
sundown_towns = [
    (t["lat"], t["lng"], t["evidence"], t["name"], t["state"])
    for t in sundown_data["towns"]
    if t.get("lat") is not None and t.get("lng") is not None
]
print(f"Indexed {len(sundown_towns)} geocoded sundown towns")


# --- Compute corridor danger for a city pair ---


def compute_corridor(city_a, city_b):
    """Compute danger score for the travel corridor between two cities.

    Finds all sundown towns within CORRIDOR_RADIUS_MI of the
    great-circle route segment and computes a weighted density score.
    """
    if city_a == city_b:
        return None

    if city_a not in city_coords or city_b not in city_coords:
        return None

    lat1, lon1 = city_coords[city_a]
    lat2, lon2 = city_coords[city_b]
    route_miles = haversine_miles(lat1, lon1, lat2, lon2)

    if route_miles < 1:
        return None

    # Bounding box filter (rough, for speed)
    # 5 miles ~ 0.07 degrees latitude at mid-latitudes
    margin = 0.15  # Generous margin for projection error
    min_lat = min(lat1, lat2) - margin
    max_lat = max(lat1, lat2) + margin
    min_lon = min(lon1, lon2) - margin
    max_lon = max(lon1, lon2) + margin

    nearby = []
    for tlat, tlon, evidence, name, state in sundown_towns:
        if tlat < min_lat or tlat > max_lat:
            continue
        if tlon < min_lon or tlon > max_lon:
            continue

        dist = point_to_segment_distance_miles(
            tlat, tlon, lat1, lon1, lat2, lon2
        )
        if dist <= CORRIDOR_RADIUS_MI:
            nearby.append({
                "name": name,
                "state": state,
                "evidence": evidence,
                "distance_miles": round(dist, 1),
            })

    # Count by evidence tier
    confirmed = sum(1 for t in nearby if t["evidence"] == "Confirmed")
    probable = sum(1 for t in nearby if t["evidence"] == "Probable")
    possible = sum(1 for t in nearby if t["evidence"] == "Possible")

    # Weighted count
    weighted = (
        confirmed * EVIDENCE_WEIGHTS["Confirmed"]
        + probable * EVIDENCE_WEIGHTS["Probable"]
        + possible * EVIDENCE_WEIGHTS["Possible"]
    )

    # Normalize per 100 miles, scale to 0-1
    per_100 = (weighted / route_miles) * 100
    danger = min(per_100 / NORMALIZATION_BASIS, 1.0)

    # Lower bound: confirmed only
    confirmed_per_100 = (confirmed / route_miles) * 100
    lower = min(confirmed_per_100 / NORMALIZATION_BASIS, 1.0)

    # Upper bound: 2.5x for undocumented towns
    upper = min(danger * UPPER_BOUND_MULTIPLIER, 1.0)

    return {
        "from": city_a,
        "to": city_b,
        "route_distance_miles": round(route_miles, 1),
        "danger_score": round(danger, 3),
        "danger_lower_bound": round(lower, 3),
        "danger_upper_bound": round(upper, 3),
        "towns_within_5mi": len(nearby),
        "towns_confirmed": confirmed,
        "towns_probable": probable,
        "towns_possible": possible,
        "weighted_count": round(weighted, 1),
        "nearby_towns": sorted(nearby, key=lambda t: t["distance_miles"]),
    }


# --- Compute all corridors needed by the schedule ---

def resolve_city(city_name, state):
    """Resolve a game city to a canonical city key."""
    key = f"{city_name}, {state}"
    if key in city_coords:
        return key
    for k in city_coords:
        if k.startswith(f"{city_name},"):
            return k
    return None


def get_home_city(team):
    if team in TEAM_HOME_OVERRIDES:
        return TEAM_HOME_OVERRIDES[team]
    return city_to_team_home.get(team)


# Identify all unique city pairs from the schedule
print("\nIdentifying all travel corridors from schedule data...")
all_pairs = set()
team_season_away = defaultdict(list)

for game in schedule["games"]:
    team = game["away_team"]
    if team in TEAM_HOME_OVERRIDES and TEAM_HOME_OVERRIDES[team] is None:
        continue
    year = game["year"]
    city = resolve_city(game["city"], game["state"])
    if city:
        team_season_away[(team, year)].append({
            "date": game["date"],
            "city": city,
        })

for key in team_season_away:
    team_season_away[key].sort(key=lambda g: g["date"])

for (team, year), away_games in team_season_away.items():
    home = get_home_city(team)
    if not home:
        continue
    prev = home
    for game in away_games:
        dest = game["city"]
        if dest != prev:
            pair = tuple(sorted([prev, dest]))
            all_pairs.add(pair)
            prev = dest
    if prev != home:
        pair = tuple(sorted([prev, home]))
        all_pairs.add(pair)

print(f"Found {len(all_pairs)} unique city pairs to analyze")

# Compute corridor danger for every pair
print("Computing corridor danger scores (spatial analysis)...")
corridor_cache = {}
for i, (ca, cb) in enumerate(sorted(all_pairs)):
    result = compute_corridor(ca, cb)
    if result:
        corridor_cache[(ca, cb)] = result
    if (i + 1) % 10 == 0:
        print(f"  {i + 1}/{len(all_pairs)} corridors computed")

print(f"Computed {len(corridor_cache)} corridor scores")

# Save full corridor analysis
corridors_output = {
    "metadata": {
        "title": "Negro Leagues Travel Corridor Danger Scores (Full)",
        "description": (
            "Danger scores for every city-pair travel corridor observed "
            "in the 1936-1948 Negro Leagues schedule. Each corridor is "
            "analyzed by counting documented sundown towns within 5 miles "
            "of the great-circle route between cities."
        ),
        "methodology": {
            "corridor_radius_miles": CORRIDOR_RADIUS_MI,
            "evidence_weights": EVIDENCE_WEIGHTS,
            "normalization": (
                f"Weighted town count per 100 route miles, scaled to 0-1 "
                f"({NORMALIZATION_BASIS} weighted towns per 100mi = 1.0)"
            ),
            "upper_bound": (
                f"Danger score multiplied by {UPPER_BOUND_MULTIPLIER}x "
                "to estimate undocumented sundown towns, capped at 1.0"
            ),
            "lower_bound": "Confirmed-only towns, same normalization",
            "route_geometry": (
                "Great-circle distance between city pairs. "
                "Period-accurate road routing would increase distances."
            ),
        },
        "source": {
            "sundown_towns": (
                "Scientific Data (2025) geocoded dataset, "
                "DOI: 10.1038/s41597-024-04330-9"
            ),
            "game_locations": "Seamheads Negro Leagues Database, SABR Ballparks Database",
        },
        "total_corridors": len(corridor_cache),
        "processed_date": "2026-05-25",
    },
    "corridors": sorted(
        corridor_cache.values(),
        key=lambda c: c["danger_score"],
        reverse=True,
    ),
}

corridors_path = os.path.join(BASE, "data", "corridors-full.json")
with open(corridors_path, "w") as f:
    json.dump(corridors_output, f, indent=2, ensure_ascii=False)
print(f"\nSaved {len(corridor_cache)} corridors to {corridors_path}")

# --- Aggregate to team-season level ---

print("\nAggregating to team-season danger scores...")
results = []

for (team, year), away_games in sorted(team_season_away.items()):
    home = get_home_city(team)
    if not home:
        continue

    segments = []
    prev_city = home

    for game in away_games:
        dest = game["city"]
        if dest == prev_city:
            continue

        pair = tuple(sorted([prev_city, dest]))
        if pair in corridor_cache:
            segments.append(corridor_cache[pair])
        prev_city = dest

    # Return trip
    if prev_city != home:
        pair = tuple(sorted([prev_city, home]))
        if pair in corridor_cache:
            segments.append(corridor_cache[pair])

    if not segments:
        continue

    total_miles = sum(s["route_distance_miles"] for s in segments)
    total_segments = len(segments)

    if total_miles > 0:
        weighted_danger = sum(
            s["danger_score"] * s["route_distance_miles"] for s in segments
        ) / total_miles
        weighted_lower = sum(
            s["danger_lower_bound"] * s["route_distance_miles"]
            for s in segments
        ) / total_miles
        weighted_upper = sum(
            s["danger_upper_bound"] * s["route_distance_miles"]
            for s in segments
        ) / total_miles
    else:
        weighted_danger = weighted_lower = weighted_upper = 0

    high_danger = [s for s in segments if s["danger_score"] >= 0.75]
    total_towns = sum(s["towns_within_5mi"] for s in segments)
    total_confirmed = sum(s["towns_confirmed"] for s in segments)
    total_probable = sum(s["towns_probable"] for s in segments)
    total_possible = sum(s["towns_possible"] for s in segments)
    total_weighted = sum(s["weighted_count"] for s in segments)

    results.append({
        "team": team,
        "season": year,
        "danger_score": round(weighted_danger, 3),
        "danger_lower_bound": round(weighted_lower, 3),
        "danger_upper_bound": round(min(weighted_upper, 1.0), 3),
        "total_route_miles": round(total_miles, 0),
        "road_segments_analyzed": total_segments,
        "high_danger_segments": len(high_danger),
        "sundown_towns_encountered": total_towns,
        "towns_confirmed": total_confirmed,
        "towns_probable": total_probable,
        "towns_possible": total_possible,
        "weighted_town_exposure": round(total_weighted, 1),
        "away_games": len(away_games),
        "confidence": "Modeled",
    })

results.sort(key=lambda r: r["danger_score"], reverse=True)

# --- Output ---

output = {
    "metadata": {
        "title": "Negro Leagues Team-Season Corridor Danger Scores, 1936-1948",
        "description": (
            "For each team-season combination, the distance-weighted average "
            "danger score across all travel corridors. Danger scores measure "
            "documented sundown town density within 5 miles of great-circle "
            "routes between game locations."
        ),
        "methodology": {
            "aggregation": (
                "Away games sorted chronologically. Travel segments inferred "
                "between consecutive different cities. Danger score is the "
                "distance-weighted average across all segments."
            ),
            "corridor_analysis": (
                "Each corridor analyzed directly against the full sundown "
                "towns dataset. Towns within 5 miles of the route centerline "
                "are counted and weighted by evidence tier."
            ),
            "evidence_weights": EVIDENCE_WEIGHTS,
            "normalization": (
                f"{NORMALIZATION_BASIS} weighted towns per 100 route miles = "
                "danger score 1.0"
            ),
            "uncertainty": (
                "Lower bound: confirmed-only sundown towns. "
                f"Upper bound: {UPPER_BOUND_MULTIPLIER}x multiplier for "
                "undocumented towns, capped at 1.0."
            ),
            "limitations": [
                "Route distances use great-circle approximation. Actual "
                "1936-1948 roads were longer.",
                "Schedule data is reconstructed, not complete. Some road "
                "trips may be missing.",
                "Danger scores are lower-bound estimates of actual sundown "
                "town exposure.",
                "Point-to-segment distance uses planar projection, accurate "
                "to within ~1% at US mid-latitudes.",
            ],
        },
        "source": {
            "schedule": (
                "Seamheads Negro Leagues Database, reconstructed 1936-1948"
            ),
            "sundown_towns": (
                "Scientific Data (2025) dataset, "
                "DOI: 10.1038/s41597-024-04330-9"
            ),
            "locations": "Seamheads + SABR Ballparks Database",
        },
        "total_team_seasons": len(results),
        "processed_date": "2026-05-25",
    },
    "team_seasons": results,
}

out_path = os.path.join(BASE, "data", "team-season-danger.json")
with open(out_path, "w") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

print(f"\nWrote {len(results)} team-season records to {out_path}")
print()
print("Top 10 most dangerous team-seasons:")
for r in results[:10]:
    print(
        f"  {r['team']:30s} {r['season']}  "
        f"danger={r['danger_score']:.3f}  "
        f"[{r['danger_lower_bound']:.3f}, {r['danger_upper_bound']:.3f}]  "
        f"{r['total_route_miles']:.0f}mi  "
        f"{r['sundown_towns_encountered']} towns  "
        f"{r['road_segments_analyzed']} segments"
    )

print()
print("Bottom 5 (lowest danger):")
for r in results[-5:]:
    print(
        f"  {r['team']:30s} {r['season']}  "
        f"danger={r['danger_score']:.3f}  "
        f"{r['total_route_miles']:.0f}mi  "
        f"{r['sundown_towns_encountered']} towns"
    )

print()
# Cross-check: show a few high-danger corridors
print("Highest danger corridors:")
for c in corridors_output["corridors"][:10]:
    print(
        f"  {c['from']:25s} -> {c['to']:25s}  "
        f"danger={c['danger_score']:.3f}  "
        f"{c['towns_within_5mi']} towns  "
        f"{c['route_distance_miles']}mi"
    )
