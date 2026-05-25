"""
The Salary Ledger -- Sensitivity Analysis Grid
The Other Box Score, Chapter 08, Model 5

Pre-compute the headline wage gap figure for every combination of
five modeling assumptions. This lets the frontend show how the number
changes under different but defensible choices.

Dimensions (108 total combinations):
  1. Inflator: CPI / Wage Index (2x CPI) / GDP Share (4x CPI)           -- 3
  2. MLB comparison: League Avg / Position Avg (1.1x) / Predicted (model) -- 3
  3. Season length: 5 months / Documented games (0.8x)                    -- 2
  4. Barnstorming: Include (1.15x) / Exclude                              -- 2
  5. Compounding: S&P / T-Bills (0.3x) / None (1x)                       -- 3

Base figure: $82,616,434 (CPI-adjusted gap from Model 1-3)

Sources:
- Base gap: salary-imputed.json aggregate
- Estate compounding: estate-values.json aggregate
- Inflator ratios: BLS CPI-U, Census wage index, Measuring Worth GDP share
- Barnstorming premium: Larry Lester estimates, ~15% of season income
- Season length: 5-month standard vs documented game logs (~0.8x)

Output: data/sensitivity-grid.json
"""

import json
import os
from itertools import product

# ============================================================
# LOAD BASE DATA
# ============================================================

base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_dir = os.path.join(base, "data")

with open(os.path.join(data_dir, "salary-imputed.json")) as f:
    imputed = json.load(f)

with open(os.path.join(data_dir, "estate-values.json")) as f:
    estate = json.load(f)

base_gap_cpi = imputed["aggregate"]["total_gap_2024"]
estate_multiplier = estate["aggregate"]["estate_multiplier_over_cpi"]

print(f"Base CPI gap: ${base_gap_cpi:,.0f}")
print(f"Estate multiplier over CPI: {estate_multiplier:.2f}x")

# ============================================================
# SENSITIVITY DIMENSIONS
# ============================================================

# Each dimension is a list of (label, multiplier) tuples.
# The multiplier is applied to the base CPI gap figure.

inflators = [
    ("CPI", 1.0),
    ("wage_index", 2.0),
    ("gdp_share", 4.0),
]

comparisons = [
    ("league_avg", 1.0),
    ("position_avg", 1.1),
    ("predicted", 1.0),  # Already baked into base; no additional multiplier
]
# Note: "predicted" uses the WAR-based model output directly, which is
# already the base. League avg and position avg are simpler alternatives.
# Position avg adds ~10% because positional scarcity (catchers, CF) paid more.

season_lengths = [
    ("5mo", 1.0),
    ("documented_games", 0.8),
]

barnstorming = [
    ("exclude", 1.0),
    ("include", 1.15),
]

compounding = [
    ("sp500", estate_multiplier),
    ("tbills", estate_multiplier * 0.3),
    ("none", 1.0),
]

# ============================================================
# GENERATE ALL 108 COMBINATIONS
# ============================================================

print(f"\n=== Generating Sensitivity Grid ===\n")

dimensions = [inflators, comparisons, season_lengths, barnstorming, compounding]
dim_names = ["inflator", "comparison", "season", "barnstorming", "compounding"]

combinations = []
for combo in product(*dimensions):
    labels = {dim_names[i]: combo[i][0] for i in range(5)}
    multiplier = 1.0
    for _, m in combo:
        multiplier *= m

    headline = round(base_gap_cpi * multiplier, 2)

    entry = {
        "inflator": labels["inflator"],
        "comparison": labels["comparison"],
        "season": labels["season"],
        "barnstorming": labels["barnstorming"],
        "compounding": labels["compounding"],
        "multiplier": round(multiplier, 4),
        "headline": headline
    }
    combinations.append(entry)

# Sort by headline value
combinations.sort(key=lambda x: x["headline"])

# Summary stats
headlines = [c["headline"] for c in combinations]
print(f"Combinations generated: {len(combinations)}")
print(f"Minimum headline: ${min(headlines):,.0f}")
print(f"Maximum headline: ${max(headlines):,.0f}")
print(f"Median headline:  ${sorted(headlines)[len(headlines)//2]:,.0f}")

# Show the base case (CPI, league avg, 5mo, exclude, none)
base_case = [c for c in combinations
             if c["inflator"] == "CPI"
             and c["comparison"] == "league_avg"
             and c["season"] == "5mo"
             and c["barnstorming"] == "exclude"
             and c["compounding"] == "none"][0]
print(f"\nBase case: ${base_case['headline']:,.0f} (multiplier: {base_case['multiplier']})")

# Show the most conservative and most aggressive
print(f"Most conservative: ${min(headlines):,.0f}")
most_conservative = [c for c in combinations if c["headline"] == min(headlines)][0]
print(f"  {most_conservative}")

print(f"Most aggressive: ${max(headlines):,.0f}")
most_aggressive = [c for c in combinations if c["headline"] == max(headlines)][0]
print(f"  {most_aggressive}")

# ============================================================
# SAVE OUTPUT
# ============================================================

output = {
    "methodology": {
        "model": "Sensitivity analysis grid (108 combinations)",
        "concept": "How does the headline gap figure change under different defensible assumptions?",
        "base_gap_source": "Model 1-3 CPI-adjusted gap (salary-imputed.json)",
        "dimensions": {
            "inflator": {
                "options": ["CPI (1x)", "Wage Index (2x CPI)", "GDP Share (4x CPI)"],
                "source": "BLS CPI-U, Census Bureau wage index, Measuring Worth GDP share"
            },
            "comparison": {
                "options": ["League Average (1x)", "Position Average (1.1x)", "Predicted/WAR-based (1x)"],
                "source": "SABR Business of Baseball, WAR-based model"
            },
            "season": {
                "options": ["5 months (1x)", "Documented games (0.8x)"],
                "source": "Larry Lester documented season lengths, Seamheads game logs"
            },
            "barnstorming": {
                "options": ["Exclude (1x)", "Include (1.15x)"],
                "source": "Larry Lester estimates barnstorming added ~15% income"
            },
            "compounding": {
                "options": ["S&P 500 total returns", "T-Bills (0.3x S&P)", "None (nominal)"],
                "source": "Robert Shiller dataset, Federal Reserve historical T-Bill rates"
            }
        },
        "confidence_vocabulary": "Modeled. Each combination represents a defensible but different set of assumptions."
    },
    "base_gap_cpi": round(base_gap_cpi, 2),
    "estate_multiplier_sp500": round(estate_multiplier, 2),
    "summary": {
        "n_combinations": len(combinations),
        "min_headline": round(min(headlines), 2),
        "max_headline": round(max(headlines), 2),
        "median_headline": round(sorted(headlines)[len(headlines) // 2], 2),
        "base_case_headline": round(base_case["headline"], 2)
    },
    "combinations": combinations
}

output_path = os.path.join(data_dir, "sensitivity-grid.json")
with open(output_path, "w") as f:
    json.dump(output, f, indent=2)

print(f"\nSaved {len(combinations)} combinations to {output_path}")
