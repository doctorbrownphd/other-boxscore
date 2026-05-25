"""
The Collapse -- Franchise Survival Analysis
The Other Box Score, Chapter 06

Survival analysis on Negro Leagues franchise lifespans.
Hazard function before 1947 vs after 1947 shows the integration discontinuity.

Source: franchises.json (Seamheads/SABR verified)
Output: data/survival-output.json
"""

import json
import numpy as np
from scipy import stats
import os

np.random.seed(42)

base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_dir = os.path.join(base, "data")

with open(os.path.join(data_dir, "franchises.json")) as f:
    franchise_data = json.load(f)

franchises = franchise_data["data"]
print(f"Loaded {len(franchises)} franchises")

# ============================================================
# CLASSIFY AND COMPUTE LIFESPANS
# ============================================================

lifespans = []
for fr in franchises:
    start = fr["startYear"]
    end = fr["endYear"]
    lifespan = end - start + 1
    cause = fr.get("causeOfDeath", "unknown")
    league = fr.get("league", "unknown")

    # Did this franchise die before or after 1947?
    died_post_1947 = end >= 1947
    active_in_1947 = start <= 1947 <= end

    lifespans.append({
        "name": fr["name"],
        "league": league,
        "startYear": start,
        "endYear": end,
        "lifespan": lifespan,
        "causeOfDeath": cause,
        "diedPost1947": died_post_1947,
        "activeIn1947": active_in_1947
    })

print(f"\nLifespan summary:")
all_lifespans = [f["lifespan"] for f in lifespans]
print(f"  Mean lifespan: {np.mean(all_lifespans):.1f} years")
print(f"  Median lifespan: {np.median(all_lifespans):.1f} years")
print(f"  Range: {min(all_lifespans)}-{max(all_lifespans)} years")

# ============================================================
# KAPLAN-MEIER ON FRANCHISE LIFESPANS
# ============================================================

print("\n=== Franchise Kaplan-Meier ===")

# Sort by lifespan
sorted_lifespans = sorted(all_lifespans)
n = len(sorted_lifespans)
unique_times = sorted(set(sorted_lifespans))

km_points = [{"years": 0, "survival": 1.0, "at_risk": n}]
at_risk = n
survived = 1.0

for t in unique_times:
    events = sum(1 for ls in sorted_lifespans if ls == t)
    survived *= (at_risk - events) / at_risk
    km_points.append({
        "years": t,
        "survival": round(survived, 4),
        "at_risk": at_risk,
        "events": events
    })
    at_risk -= events

# ============================================================
# HAZARD COMPARISON: PRE-1947 vs POST-1947
# ============================================================

print("\n=== Pre/Post 1947 Hazard Comparison ===")

# Franchises active in 1946 (the year before Robinson)
active_1946 = [f for f in lifespans if f["startYear"] <= 1946 and f["endYear"] >= 1946]
print(f"Franchises active in 1946: {len(active_1946)}")

# Of those, how many died by 1948? by 1950? by 1955? by 1962?
for cutoff in [1948, 1950, 1955, 1962]:
    died = sum(1 for f in active_1946 if f["endYear"] <= cutoff)
    print(f"  Died by {cutoff}: {died}/{len(active_1946)} ({100*died/len(active_1946):.0f}%)")

# Pre-1947 death rate (franchise-years at risk vs deaths per year)
pre_1947_deaths = sum(1 for f in lifespans if f["endYear"] < 1947 and f["endYear"] >= 1920)
pre_1947_franchise_years = sum(min(f["endYear"], 1946) - max(f["startYear"], 1920) + 1
                               for f in lifespans if f["startYear"] <= 1946)
pre_1947_hazard = pre_1947_deaths / max(pre_1947_franchise_years, 1)

# Post-1947 death rate
post_1947_deaths = sum(1 for f in lifespans if f["endYear"] >= 1947 and f["causeOfDeath"] == "integration")
post_1947_franchise_years = sum(min(f["endYear"], 1962) - max(f["startYear"], 1947) + 1
                                for f in lifespans if f["endYear"] >= 1947 and f["startYear"] <= 1962)
post_1947_hazard = post_1947_deaths / max(post_1947_franchise_years, 1)

hazard_ratio = post_1947_hazard / max(pre_1947_hazard, 0.001)

print(f"\n  Pre-1947 annual hazard: {pre_1947_hazard:.4f} ({pre_1947_deaths} deaths / {pre_1947_franchise_years} franchise-years)")
print(f"  Post-1947 annual hazard: {post_1947_hazard:.4f} ({post_1947_deaths} deaths / {post_1947_franchise_years} franchise-years)")
print(f"  Hazard ratio (post/pre): {hazard_ratio:.2f}x")

# ============================================================
# YEAR-BY-YEAR FRANCHISE COUNT
# ============================================================

print("\n=== Year-by-Year Active Franchises ===")

yearly_counts = []
for year in range(1920, 1963):
    active = sum(1 for f in lifespans if f["startYear"] <= year <= f["endYear"])
    died_this_year = sum(1 for f in lifespans if f["endYear"] == year)
    born_this_year = sum(1 for f in lifespans if f["startYear"] == year)

    yearly_counts.append({
        "year": year,
        "active": active,
        "died": died_this_year,
        "born": born_this_year
    })

    if year in [1920, 1928, 1933, 1940, 1946, 1947, 1948, 1950, 1955, 1960, 1962]:
        print(f"  {year}: {active} active, +{born_this_year} born, -{died_this_year} died")

# Peak year
peak = max(yearly_counts, key=lambda x: x["active"])
print(f"\n  Peak: {peak['year']} with {peak['active']} active franchises")

# ============================================================
# CAUSE OF DEATH DISTRIBUTION
# ============================================================

print("\n=== Cause of Death ===")
causes = {}
for f in lifespans:
    c = f["causeOfDeath"]
    causes[c] = causes.get(c, 0) + 1

for cause, count in sorted(causes.items(), key=lambda x: -x[1]):
    print(f"  {cause}: {count}")

# ============================================================
# SAVE OUTPUT
# ============================================================

output = {
    "methodology": {
        "model": "Franchise survival analysis",
        "source": "franchises.json (Seamheads, SABR verified)",
        "n_franchises": len(lifespans),
        "period": "1920-1962"
    },
    "kaplan_meier": km_points,
    "hazard_comparison": {
        "pre_1947": {
            "annual_hazard": round(pre_1947_hazard, 4),
            "deaths": pre_1947_deaths,
            "franchise_years": pre_1947_franchise_years
        },
        "post_1947": {
            "annual_hazard": round(post_1947_hazard, 4),
            "deaths": post_1947_deaths,
            "franchise_years": post_1947_franchise_years
        },
        "hazard_ratio": round(hazard_ratio, 2),
        "interpretation": f"Post-1947 franchise death rate was {hazard_ratio:.1f}x the pre-1947 rate. "
                         f"Integration accelerated franchise collapse by a factor of {hazard_ratio:.1f}."
    },
    "yearly_counts": yearly_counts,
    "peak_year": peak["year"],
    "peak_active": peak["active"],
    "cause_distribution": causes,
    "franchise_details": lifespans
}

with open(os.path.join(data_dir, "survival-output.json"), "w") as f:
    json.dump(output, f, indent=2)

print(f"\nSaved to {data_dir}/survival-output.json")
