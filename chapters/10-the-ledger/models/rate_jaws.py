"""
The Ledger -- Rate JAWS Engine
The Other Box Score, Chapter 10

The platform's core statistical model. Computes rate-adjusted JAWS
(WAR per 600 PA / 200 IP) to correct for the Negro Leagues' shorter
documented seasons.

Standard JAWS (career WAR + peak 7-year WAR / 2) systematically
understates Negro Leagues players because they played ~55 league games
per season vs MLB's 154. Rate JAWS normalizes to a common denominator.

Source: players.json (Seamheads), mlb-comparisons.json (Baseball Reference)
Output: data/rate-jaws.json, data/integrated-leaderboard.json
"""

import json
import numpy as np
import os

np.random.seed(42)

base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
data_dir = os.path.join(base, "data")

# Load real data
with open(os.path.join(data_dir, "players.json")) as f:
    nlb_data = json.load(f)
with open(os.path.join(data_dir, "mlb-comparisons.json")) as f:
    mlb_data = json.load(f)

nlb_players = nlb_data["players"]
mlb_players = mlb_data["players"]

print(f"Loaded {len(nlb_players)} NLB players, {len(mlb_players)} MLB players")

# ============================================================
# RATE JAWS COMPUTATION
# ============================================================

def compute_rate_jaws(player, is_nlb=True):
    """
    Compute Rate JAWS for a player.

    Standard JAWS = (career WAR + peak 7yr WAR) / 2
    Rate JAWS = (rate WAR/600PA * career_factor + peak rate * peak_factor) / 2

    For NLB players, we use WAR/600PA (or WAR/200IP for pitchers)
    to normalize for shorter documented seasons.
    """
    career_war = player.get("careerWAR")
    if career_war is None:
        return None

    rate_war = player.get("rateWAR")  # WAR per 600 PA or 200 IP

    # If we have rate WAR, compute rate JAWS
    if rate_war is not None:
        # Estimate peak rate (best stretch) as ~1.3x career rate
        # This is an approximation -- real peak requires season-by-season data
        peak_rate = rate_war * 1.3

        # Rate JAWS: average of career rate and peak rate
        rate_jaws = (rate_war + peak_rate) / 2

        # Standard JAWS for comparison (using career WAR)
        # Estimate peak 7yr WAR as career WAR * (7 / career_years) * 1.2
        years_str = player.get("yearsActive", "")
        if isinstance(years_str, str) and "-" in years_str:
            parts = years_str.replace(" ", "").split("-")
            try:
                career_years = int(parts[1]) - int(parts[0]) + 1
            except:
                career_years = 12
        else:
            career_years = 12

        peak_7yr_war = career_war * min(7 / max(career_years, 1), 1.0) * 1.2
        standard_jaws = (career_war + peak_7yr_war) / 2

        return {
            "rateWAR": round(rate_war, 2),
            "peakRate": round(peak_rate, 2),
            "rateJAWS": round(rate_jaws, 2),
            "standardJAWS": round(standard_jaws, 1),
            "careerWAR": round(career_war, 1),
            "careerYears": career_years,
            "confidence": "Documented" if not is_nlb else
                         ("Documented" if player.get("warSource") == "seamheads" else "Modeled")
        }
    else:
        # No rate WAR available -- use career WAR only
        return {
            "rateWAR": None,
            "peakRate": None,
            "rateJAWS": None,
            "standardJAWS": round(career_war * 0.75, 1),  # Rough JAWS estimate
            "careerWAR": round(career_war, 1),
            "careerYears": None,
            "confidence": "Estimated"
        }


# ============================================================
# PROCESS ALL PLAYERS
# ============================================================

print("\n=== Computing Rate JAWS ===\n")

all_players = []

# NLB players
for p in nlb_players:
    jaws = compute_rate_jaws(p, is_nlb=True)
    if jaws is None:
        continue

    entry = {
        "name": p["name"],
        "position": p.get("position", "UTIL"),
        "league": "NLB",
        "yearsActive": p.get("yearsActive", ""),
        "careerWAR": jaws["careerWAR"],
        "rateWAR": jaws["rateWAR"],
        "rateJAWS": jaws["rateJAWS"],
        "standardJAWS": jaws["standardJAWS"],
        "peakRate": jaws["peakRate"],
        "careerYears": jaws["careerYears"],
        "confidence": jaws["confidence"],
        "ba": p.get("ba"),
        "obp": p.get("obp"),
        "slg": p.get("slg"),
        "ops": p.get("ops"),
        "era": p.get("era"),
        "source": "Seamheads"
    }
    all_players.append(entry)

# MLB players
for p in mlb_players:
    jaws = compute_rate_jaws(p, is_nlb=False)
    if jaws is None:
        continue

    entry = {
        "name": p["name"],
        "position": p.get("position", "UTIL"),
        "league": "MLB",
        "yearsActive": p.get("yearsActive", ""),
        "careerWAR": jaws["careerWAR"],
        "rateWAR": jaws["rateWAR"],
        "rateJAWS": jaws["rateJAWS"],
        "standardJAWS": jaws["standardJAWS"],
        "peakRate": jaws["peakRate"],
        "careerYears": jaws["careerYears"],
        "confidence": jaws["confidence"],
        "ba": p.get("ba"),
        "obp": p.get("obp"),
        "slg": p.get("slg"),
        "ops": p.get("ops"),
        "era": p.get("era"),
        "source": "Baseball Reference"
    }
    all_players.append(entry)

# Sort by rate JAWS descending (None values at bottom)
all_players.sort(key=lambda x: x["rateJAWS"] if x["rateJAWS"] is not None else -1, reverse=True)

# Assign ranks
for i, p in enumerate(all_players):
    p["rank"] = i + 1

# ============================================================
# PRINT INTEGRATED LEADERBOARD
# ============================================================

print(f"{'Rank':>4s}  {'Name':25s}  {'Pos':5s}  {'League':5s}  "
      f"{'cWAR':>6s}  {'rWAR':>6s}  {'rJAWS':>6s}  {'sJAWS':>6s}")
print("-" * 95)

for p in all_players[:30]:
    rwar = f"{p['rateWAR']:.1f}" if p['rateWAR'] else "  --"
    rjaws = f"{p['rateJAWS']:.1f}" if p['rateJAWS'] else "  --"
    print(f"{p['rank']:>4d}  {p['name']:25s}  {p['position']:5s}  {p['league']:5s}  "
          f"{p['careerWAR']:>6.1f}  {rwar:>6s}  {rjaws:>6s}  {p['standardJAWS']:>6.1f}")

# Count NLB in top 20
nlb_top20 = sum(1 for p in all_players[:20] if p["league"] == "NLB")
print(f"\nNLB players in top 20 by Rate JAWS: {nlb_top20}")
print(f"NLB players in top 10 by Rate JAWS: {sum(1 for p in all_players[:10] if p['league'] == 'NLB')}")

# ============================================================
# POSITION-BY-POSITION COMPARISON
# ============================================================

print("\n=== Position Leaders ===\n")

positions = {}
for p in all_players:
    pos = p["position"].split("/")[0].strip()
    if pos not in positions:
        positions[pos] = []
    positions[pos].append(p)

for pos in ["C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "P"]:
    if pos not in positions:
        continue
    players_at_pos = positions[pos]
    leader = players_at_pos[0]
    nlb_at_pos = [p for p in players_at_pos if p["league"] == "NLB"]
    mlb_at_pos = [p for p in players_at_pos if p["league"] == "MLB"]

    print(f"  {pos}: {leader['name']} ({leader['league']}) "
          f"rJAWS={leader['rateJAWS'] if leader['rateJAWS'] else 'N/A'}  "
          f"[{len(nlb_at_pos)} NLB, {len(mlb_at_pos)} MLB]")

# ============================================================
# SAVE OUTPUTS
# ============================================================

rate_jaws_output = {
    "methodology": {
        "model": "Rate JAWS -- rate-adjusted JAWS for cross-league comparison",
        "formula": "rateJAWS = (rateWAR + peakRate) / 2",
        "rateWAR": "Career WAR per 600 PA (batters) or per 200 IP (pitchers)",
        "peakRate": "Estimated as career rate * 1.3 (approximation pending season-level data)",
        "standardJAWS": "Traditional JAWS = (careerWAR + peak7yrWAR) / 2",
        "nlb_source": "Seamheads Negro Leagues Database",
        "mlb_source": "Baseball Reference (bWAR)",
        "rationale": "Standard JAWS penalizes NLB players for shorter documented seasons "
                    "(~55 games vs MLB's 154). Rate JAWS normalizes to a common PA/IP denominator.",
        "caveat": "Peak rate estimated from career rate * 1.3. True peak requires "
                  "season-by-season WAR data not yet assembled at scale."
    },
    "summary": {
        "total_players": len(all_players),
        "nlb_players": sum(1 for p in all_players if p["league"] == "NLB"),
        "mlb_players": sum(1 for p in all_players if p["league"] == "MLB"),
        "nlb_in_top_10": sum(1 for p in all_players[:10] if p["league"] == "NLB"),
        "nlb_in_top_20": nlb_top20
    },
    "leaderboard": all_players
}

with open(os.path.join(data_dir, "rate-jaws.json"), "w") as f:
    json.dump(rate_jaws_output, f, indent=2)

# Integrated leaderboard (simpler format for the frontend)
leaderboard = [{
    "rank": p["rank"],
    "name": p["name"],
    "position": p["position"],
    "league": p["league"],
    "careerWAR": p["careerWAR"],
    "rateWAR": p["rateWAR"],
    "rateJAWS": p["rateJAWS"],
    "standardJAWS": p["standardJAWS"],
    "confidence": p["confidence"]
} for p in all_players]

with open(os.path.join(data_dir, "integrated-leaderboard.json"), "w") as f:
    json.dump({"leaderboard": leaderboard}, f, indent=2)

print(f"\nSaved rate-jaws.json and integrated-leaderboard.json")
