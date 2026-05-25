"""
Hall Induction Lag Model

For each player in the multi-hall matrix, compute:
  1. Years from career end to first hall induction (any hall)
  2. Years from career end to Cooperstown induction
  3. Years from first non-Cooperstown induction to Cooperstown
  4. Which hall recognized them first

This measures the recognition lag: how long did it take for
Cooperstown to catch up to what other halls already knew?

Input:
  - chapters/12-the-other-hall/data/hall-matrix.json
  - chapters/10-the-ledger/data/players.json (career dates)

Output:
  - chapters/12-the-other-hall/data/induction-lag.json

Confidence: Documented (deterministic calculation on sourced data)
"""

import json
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CH10 = os.path.join(os.path.dirname(BASE), "10-the-ledger")

# --- Load data ---

with open(os.path.join(BASE, "data", "hall-matrix.json")) as f:
    matrix = json.load(f)

with open(os.path.join(CH10, "data", "players.json")) as f:
    players_data = json.load(f)

# --- Build career end year lookup ---

career_end = {}
for p in players_data.get("players", []):
    name = p.get("name", "")
    years = p.get("yearsActive", p.get("years", ""))
    if isinstance(years, str) and "-" in years:
        parts = years.replace("–", "-").replace("—", "-").split("-")
        try:
            career_end[name] = int(parts[-1].strip())
        except ValueError:
            pass

# Known career end years for players not in Ch 10
# (sourced from SABR BioProject, Baseball Reference, Wikipedia)
CAREER_END_SUPPLEMENTS = {
    "Martin Dihigo": 1945,
    "Jose Mendez": 1926,
    "Cristobal Torriente": 1932,
    "Satchel Paige": 1965,
    "Josh Gibson": 1946,
    "Cool Papa Bell": 1946,
    "Oscar Charleston": 1941,
    "Buck Leonard": 1948,
    "Judy Johnson": 1937,
    "Turkey Stearnes": 1940,
    "Willie Wells": 1948,
    "Ray Dandridge": 1953,
    "Leon Day": 1950,
    "Hilton Smith": 1948,
    "Bullet Rogan": 1938,
    "Mule Suttles": 1944,
    "Willard Brown": 1956,
    "Jud Wilson": 1945,
    "Ray Brown": 1945,
    "Biz Mackey": 1947,
    "Andy Cooper": 1941,
    "Dick Lundy": 1937,
    "Pop Lloyd": 1932,
    "Newt Allen": 1944,
    "Monte Irvin": 1956,
    "Larry Doby": 1959,
    "Roy Campanella": 1957,
    "Jackie Robinson": 1956,
    "Minnie Minoso": 1980,
    "Buck O'Neil": 1955,
    "Wild Bill Wright": 1945,
    "Bus Clarkson": 1955,
    "Vic Harris": 1948,
    "Ben Taylor": 1929,
    "Willie Foster": 1938,
    "Rube Foster": 1926,
    "Alex Radcliffe": 1946,
    "Louis Santop": 1926,
    "Alejandro Oms": 1946,
    "John Beckwith": 1938,
    "Dobie Moore": 1926,
    "Pete Hill": 1925,
    "Frank Grant": 1903,
    "Sol White": 1911,
    "Hurley McNair": 1937,
    "Dick Redding": 1938,
    "Home Run Johnson": 1932,
}

HALLS = ["cooperstown", "cuba", "mexico", "venezuela",
         "dominicanRepublic", "puertoRico", "caribbean"]

HALL_LABELS = {
    "cooperstown": "Cooperstown",
    "cuba": "Cuba",
    "mexico": "Mexico",
    "venezuela": "Venezuela",
    "dominicanRepublic": "Dominican Republic",
    "puertoRico": "Puerto Rico",
    "caribbean": "Caribbean",
}


def get_career_end(name):
    """Get career end year from Ch 10 data or supplements."""
    return career_end.get(name) or CAREER_END_SUPPLEMENTS.get(name)


# --- Compute lags ---

results = []

for player in matrix["data"]:
    name = player["name"]
    end_year = get_career_end(name)

    # Get all induction years
    inductions = {}
    for hall in HALLS:
        year = player.get(hall)
        if year is not None:
            inductions[hall] = year

    if not inductions:
        continue

    # First induction (any hall)
    first_hall = min(inductions, key=inductions.get)
    first_year = inductions[first_hall]

    # Cooperstown induction
    coop_year = inductions.get("cooperstown")

    # First non-Cooperstown induction
    non_coop = {h: y for h, y in inductions.items() if h != "cooperstown"}
    first_non_coop_hall = min(non_coop, key=non_coop.get) if non_coop else None
    first_non_coop_year = non_coop[first_non_coop_hall] if first_non_coop_hall else None

    entry = {
        "name": name,
        "career_end": end_year,
        "total_halls": len(inductions),
        "halls_inducted": {HALL_LABELS[h]: y for h, y in inductions.items()},
        "first_induction_hall": HALL_LABELS[first_hall],
        "first_induction_year": first_year,
        "cooperstown_year": coop_year,
    }

    # Lag calculations
    if end_year:
        entry["years_career_to_first"] = first_year - end_year
        entry["years_career_to_cooperstown"] = (
            coop_year - end_year if coop_year else None
        )
    else:
        entry["years_career_to_first"] = None
        entry["years_career_to_cooperstown"] = None

    # Cooperstown recognition lag (vs. other halls)
    if coop_year and first_non_coop_year:
        entry["cooperstown_lag_years"] = coop_year - first_non_coop_year
        entry["recognized_elsewhere_first"] = first_non_coop_year < coop_year
        entry["first_recognized_by"] = HALL_LABELS[first_non_coop_hall]
    else:
        entry["cooperstown_lag_years"] = None
        entry["recognized_elsewhere_first"] = False
        entry["first_recognized_by"] = None

    # Was Cooperstown first?
    entry["cooperstown_was_first"] = (
        first_hall == "cooperstown" if coop_year else False
    )

    entry["confidence"] = player.get("confidence", "Documented")
    results.append(entry)

# Sort by Cooperstown lag (largest first)
results.sort(
    key=lambda r: (r.get("cooperstown_lag_years") or 0),
    reverse=True,
)

# --- Summary statistics ---

coop_lags = [
    r["cooperstown_lag_years"]
    for r in results
    if r["cooperstown_lag_years"] is not None
]
career_to_coop = [
    r["years_career_to_cooperstown"]
    for r in results
    if r["years_career_to_cooperstown"] is not None
]
recognized_elsewhere = sum(
    1 for r in results if r["recognized_elsewhere_first"]
)
coop_first = sum(1 for r in results if r["cooperstown_was_first"])

print(f"Total players in matrix: {len(results)}")
print(f"Multi-hall players: {sum(1 for r in results if r['total_halls'] > 1)}")
print(f"Cooperstown-only: {sum(1 for r in results if r['total_halls'] == 1 and r['cooperstown_year'])}")
print()

if coop_lags:
    print(f"Cooperstown lag vs other halls:")
    print(f"  Mean: {sum(coop_lags) / len(coop_lags):.1f} years")
    print(f"  Max:  {max(coop_lags)} years")
    print(f"  Recognized elsewhere first: {recognized_elsewhere}")
    print(f"  Cooperstown was first: {coop_first}")

if career_to_coop:
    print(f"\nCareer end to Cooperstown:")
    print(f"  Mean: {sum(career_to_coop) / len(career_to_coop):.1f} years")
    print(f"  Max:  {max(career_to_coop)} years")

print("\nLargest Cooperstown lags (recognized elsewhere first):")
for r in results:
    if r["cooperstown_lag_years"] and r["cooperstown_lag_years"] > 0:
        print(
            f"  {r['name']:25s}  lag={r['cooperstown_lag_years']}y  "
            f"first={r['first_recognized_by']} ({r['first_induction_year']})  "
            f"Cooperstown={r['cooperstown_year']}  "
            f"halls={r['total_halls']}"
        )

# --- Output ---

summary = {
    "total_players": len(results),
    "multi_hall": sum(1 for r in results if r["total_halls"] > 1),
    "cooperstown_only": sum(
        1 for r in results
        if r["total_halls"] == 1 and r["cooperstown_year"]
    ),
    "recognized_elsewhere_first": recognized_elsewhere,
    "cooperstown_first": coop_first,
}

if coop_lags:
    summary["cooperstown_lag_mean_years"] = round(
        sum(coop_lags) / len(coop_lags), 1
    )
    summary["cooperstown_lag_max_years"] = max(coop_lags)

if career_to_coop:
    summary["career_to_cooperstown_mean_years"] = round(
        sum(career_to_coop) / len(career_to_coop), 1
    )
    summary["career_to_cooperstown_max_years"] = max(career_to_coop)

output = {
    "metadata": {
        "title": "Hall of Fame Induction Lag Analysis",
        "description": (
            "For each Negro Leaguer in the multi-hall matrix, the time "
            "gap between career end and induction, and between first "
            "recognition by any hall and Cooperstown induction."
        ),
        "methodology": (
            "Deterministic calculation. Career end years from Ch 10 "
            "player data and SABR BioProject. Induction years from "
            "institutional records in hall-matrix.json."
        ),
        "source": {
            "hall_matrix": "Ch 12 hall-matrix.json",
            "career_data": "Ch 10 players.json, SABR BioProject",
        },
        "processed_date": "2026-05-25",
    },
    "summary": summary,
    "players": results,
}

out_path = os.path.join(BASE, "data", "induction-lag.json")
with open(out_path, "w") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
print(f"\nSaved to {out_path}")
