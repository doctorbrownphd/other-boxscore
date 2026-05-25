"""
The Salary Ledger -- Compounded Estate Value Model
The Other Box Score, Chapter 08, Model 4

Concept: If the stolen wages had been paid and invested in the S&P 500,
what would each player's estate be worth today?

For each player-season wage gap, compound forward from that year to 2024
using historical S&P 500 total return data (Robert Shiller).

Approximate annual total returns by decade (nominal):
  1920s: ~15%
  1930s: ~0% (Depression)
  1940s: ~9%
  1950s-2024: ~10.5%

Sources:
- Wage gap data: Model 1-3 output (salary-imputed.json)
- S&P 500 returns: Robert Shiller, "Irrational Exuberance" dataset
- Methodology: compound each season's gap_nominal forward year by year

Output: data/estate-values.json
"""

import json
import os

# ============================================================
# HISTORICAL S&P 500 TOTAL RETURN RATES (NOMINAL)
# Source: Robert Shiller dataset, approximate decade averages
# ============================================================

# Year-level return approximations based on decade averages.
# For a production model we would use exact annual returns from Shiller,
# but decade averages are appropriate for a sensitivity-aware estimate.

def get_annual_return(year):
    """Return approximate S&P 500 nominal total return for a given year."""
    if year < 1930:
        return 0.15   # 1920s: ~15%
    elif year < 1940:
        return 0.00   # 1930s: ~0% (Depression)
    elif year < 1950:
        return 0.09   # 1940s: ~9%
    else:
        return 0.105  # 1950s-2024: ~10.5%


def compound_to_2024(amount, start_year):
    """
    Compound a nominal dollar amount from start_year to 2024.

    Uses year-by-year compounding with decade-average S&P 500 returns.
    """
    if amount <= 0:
        return 0.0

    value = amount
    for year in range(start_year, 2024):
        rate = get_annual_return(year)
        value *= (1.0 + rate)

    return value


# ============================================================
# LOAD SALARY IMPUTATION DATA
# ============================================================

base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_dir = os.path.join(base, "data")

with open(os.path.join(data_dir, "salary-imputed.json")) as f:
    imputed = json.load(f)

players = imputed["players"]
print(f"Loaded {len(players)} players from salary-imputed.json")

# ============================================================
# MODEL 4: COMPOUNDED ESTATE VALUE
# ============================================================

print("\n=== Computing Compounded Estate Values ===\n")

results = []
total_estate = 0.0
total_estate_lo = 0.0
total_estate_hi = 0.0

for player in players:
    name = player["name"]
    seasons = player["seasons"]

    estate_value = 0.0
    season_details = []

    for s in seasons:
        year = s["year"]
        gap_nominal = s["gap_nominal"]

        # Compound this season's gap to 2024
        compounded = compound_to_2024(gap_nominal, year)
        estate_value += compounded

        season_details.append({
            "year": year,
            "gap_nominal": round(gap_nominal, 2),
            "compounded_2024": round(compounded, 2),
            "growth_factor": round(compounded / gap_nominal, 1) if gap_nominal > 0 else 0
        })

    # Credible interval: use the same 0.65/1.45 bounds from the base model
    estate_lo = estate_value * 0.65
    estate_hi = estate_value * 1.45

    result = {
        "name": name,
        "position": player["position"],
        "yearsActive": player["yearsActive"],
        "careerWAR": player["careerWAR"],
        "careerGap2024_cpi": player["careerGap2024"],
        "estateValue2024": round(estate_value, 2),
        "estateValue2024_lo": round(estate_lo, 2),
        "estateValue2024_hi": round(estate_hi, 2),
        "estateMultiplier": round(estate_value / player["careerGap2024"], 2) if player["careerGap2024"] > 0 else 0,
        "seasonsCompounded": len(season_details),
        "confidence": "Modeled",
        "seasons": season_details
    }
    results.append(result)

    total_estate += estate_value
    total_estate_lo += estate_lo
    total_estate_hi += estate_hi

    print(f"  {name:25s}  CPI gap=${player['careerGap2024']:>12,.0f}  "
          f"Estate=${estate_value:>14,.0f}  "
          f"({estate_value / player['careerGap2024']:.1f}x)")

# Sort by estate value descending
results.sort(key=lambda x: x["estateValue2024"], reverse=True)

print(f"\n=== AGGREGATE ===")
print(f"Players: {len(results)}")
print(f"Total CPI gap (2024$): ${imputed['aggregate']['total_gap_2024']:,.0f}")
print(f"Total estate value:    ${total_estate:,.0f}")
print(f"  90% CI: ${total_estate_lo:,.0f} to ${total_estate_hi:,.0f}")
print(f"  Estate multiplier:   {total_estate / imputed['aggregate']['total_gap_2024']:.1f}x over CPI")
print(f"  Per player average:  ${total_estate / len(results):,.0f}")

# ============================================================
# SAVE OUTPUT
# ============================================================

output = {
    "methodology": {
        "model": "Compounded estate value (S&P 500 total returns)",
        "concept": "If stolen wages had been paid and invested, what would the estate be worth?",
        "return_source": "Robert Shiller, 'Irrational Exuberance' dataset, decade averages",
        "return_rates": {
            "1920s": "15% nominal",
            "1930s": "0% nominal (Depression)",
            "1940s": "9% nominal",
            "1950s_to_2024": "10.5% nominal"
        },
        "compounding": "Year-by-year from season year to 2024",
        "wage_gap_source": "Model 1-3 output (salary-imputed.json)",
        "confidence_vocabulary": "Modeled, with 90% credible interval propagated from wage gap model"
    },
    "aggregate": {
        "players_modeled": len(results),
        "total_estate_2024": round(total_estate, 2),
        "total_estate_2024_lo": round(total_estate_lo, 2),
        "total_estate_2024_hi": round(total_estate_hi, 2),
        "total_cpi_gap_2024": imputed["aggregate"]["total_gap_2024"],
        "estate_multiplier_over_cpi": round(total_estate / imputed["aggregate"]["total_gap_2024"], 2),
        "per_player_average": round(total_estate / len(results), 2),
        "note": "Top 50 documented NLB players only. The full league estate would be substantially larger."
    },
    "players": results
}

output_path = os.path.join(data_dir, "estate-values.json")
with open(output_path, "w") as f:
    json.dump(output, f, indent=2)

print(f"\nSaved to {output_path}")
