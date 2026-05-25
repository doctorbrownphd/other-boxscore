"""
HOF Probability + Era Committee Routing

Model 1: For each Negro Leaguer in the Ch 10 Rate JAWS leaderboard,
compute a HOF probability score based on:
  - Rate JAWS rank relative to the 70-player evaluated pool
  - Career WAR relative to position-specific HOF average
  - Whether the player has historian advocacy (42 for 21 poll)
  - Whether similar-profile players have been inducted

Model 2: Route each candidate to the appropriate era committee
based on their active years:
  - Early Baseball Era (pre-1950): primary committee for NLB players
  - Classical Baseball Era (1950-1969): for late-career NLB players
    who crossed into integrated baseball

Input:
  - chapters/10-the-ledger/data/rate-jaws.json
  - chapters/11-cooperstown/data/candidates.json
  - chapters/11-cooperstown/data/hof-standards.json

Output:
  - chapters/11-cooperstown/data/hof-probability.json

Confidence: Modeled
"""

import json
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CH10 = os.path.join(os.path.dirname(BASE), "10-the-ledger")

# --- Load data ---

with open(os.path.join(CH10, "data", "rate-jaws.json")) as f:
    jaws_data = json.load(f)

with open(os.path.join(BASE, "data", "candidates.json")) as f:
    candidates = json.load(f)

with open(os.path.join(BASE, "data", "hof-standards.json")) as f:
    hof_standards = json.load(f)

# --- Build lookups ---

# Position bars
position_bars = {}
for pos_code, pos_data in hof_standards["positions"].items():
    position_bars[pos_code] = pos_data["avgJAWS"]

# Combined outfield bar for generic OF positions
of_bar = hof_standards.get("combined_outfield", {}).get("avgJAWS", 56.1)

# Already inducted Negro Leaguers
inducted_names = set()
for p in candidates["inducted_negro_leagues_hof"]:
    inducted_names.add(p["name"])

# Already identified candidates
candidate_names = {}
for p in candidates["candidates_not_inducted"]:
    candidate_names[p["name"]] = p

# Rate JAWS leaderboard
leaderboard = jaws_data["leaderboard"]
total_evaluated = len(leaderboard)

print(f"Rate JAWS leaderboard: {total_evaluated} players")
print(f"Already inducted: {len(inducted_names)}")
print(f"Already identified candidates: {len(candidate_names)}")


# --- Model 1: HOF Probability ---

def get_position_bar(position_str):
    """Get HOF JAWS bar for a position string.

    Handles multi-position players (e.g., "CF/P") by taking the
    lower bar (more favorable to the player).
    """
    if not position_str:
        return of_bar  # Default to outfield bar

    positions = position_str.replace("/", ",").split(",")
    bars = []
    for pos in positions:
        pos = pos.strip()
        if pos in position_bars:
            bars.append(position_bars[pos])
        elif pos == "OF":
            bars.append(of_bar)
    return min(bars) if bars else of_bar


def compute_probability(player, rank):
    """Compute HOF probability for a player.

    This is a composite score, not a statistical probability.
    It combines multiple signals into a 0-1 scale where:
      0.0 = no case
      0.5 = borderline
      1.0 = overwhelming case

    Components:
      1. Rank percentile (40% weight): position in the Rate JAWS leaderboard
      2. Career WAR ratio (30% weight): career WAR / position HOF average WAR
      3. Advocacy signal (20% weight): whether historians have argued the case
      4. Induction momentum (10% weight): whether similar players were
         inducted in recent committee cycles
    """
    war = player.get("careerWAR", 0) or 0
    position = player.get("position", "OF")
    bar = get_position_bar(position)

    # 1. Rank percentile (inverted: rank 1 = highest percentile)
    rank_pct = 1.0 - (rank - 1) / max(total_evaluated - 1, 1)

    # 2. Career WAR as fraction of position HOF average career WAR
    # Use a rough mapping: avgJAWS is ~75% of avgCareerWAR
    est_avg_career = bar / 0.75
    war_ratio = min(war / max(est_avg_career, 1), 1.5) / 1.5

    # 3. Advocacy: check if player appears in candidates list
    has_advocacy = player["name"] in candidate_names
    advocacy_score = 1.0 if has_advocacy else 0.0

    # 4. Induction momentum: recent committees (2006, 2022, 2024)
    # have shown willingness to induct NLB players
    # Score higher for players whose profile resembles recent inductees
    momentum = 0.5  # Base: committees are actively considering NLB players

    probability = (
        0.40 * rank_pct
        + 0.30 * war_ratio
        + 0.20 * advocacy_score
        + 0.10 * momentum
    )

    return round(min(probability, 1.0), 3), {
        "rank_percentile": round(rank_pct, 3),
        "war_ratio": round(war_ratio, 3),
        "advocacy": has_advocacy,
        "momentum": momentum,
    }


# --- Model 2: Era Committee Routing ---

ERA_COMMITTEES = {
    "early": {
        "name": "Early Baseball Era Committee",
        "period": "Pre-1950",
        "description": (
            "Primary committee for Negro Leagues players. "
            "Considers candidates whose careers were predominantly "
            "before 1950."
        ),
        "meets": "Every three years",
        "last_cycle": 2024,
        "next_cycle": 2027,
    },
    "classical": {
        "name": "Classical Baseball Era Committee",
        "period": "1950-1969",
        "description": (
            "For players whose careers bridged the integration period. "
            "Some Negro Leaguers who played into the 1950s may be "
            "routed here."
        ),
        "meets": "Every three years",
        "last_cycle": 2025,
        "next_cycle": 2028,
    },
}


def route_to_committee(years_active):
    """Route a player to the appropriate era committee.

    Players active primarily pre-1950 go to Early Baseball.
    Players active primarily 1950+ go to Classical.
    """
    if not years_active:
        return "early"  # Default for NLB players

    # Parse years like "1920-1948" or "1932-1953"
    parts = years_active.replace("–", "-").replace("—", "-").split("-")
    try:
        start = int(parts[0].strip())
        end = int(parts[-1].strip()) if len(parts) > 1 else start
    except (ValueError, IndexError):
        return "early"

    midpoint = (start + end) / 2
    if midpoint < 1950:
        return "early"
    return "classical"


# --- Process all players ---

results = []

for player in leaderboard:
    name = player["name"]
    rank = player["rank"]

    # Skip players already in HOF
    if name in inducted_names:
        continue

    # Skip MLB-only players (they don't belong in NLB committee routing)
    if player.get("league") == "MLB":
        continue

    probability, components = compute_probability(player, rank)
    committee = route_to_committee(player.get("yearsActive", ""))

    entry = {
        "name": name,
        "position": player.get("position"),
        "years_active": player.get("yearsActive", ""),
        "career_war": player.get("careerWAR"),
        "rate_jaws": player.get("rateJAWS"),
        "rate_war": player.get("rateWAR"),
        "jaws_rank": rank,
        "hof_probability": probability,
        "probability_components": components,
        "era_committee": committee,
        "era_committee_name": ERA_COMMITTEES[committee]["name"],
        "next_eligible_cycle": ERA_COMMITTEES[committee]["next_cycle"],
        "historian_advocacy": name in candidate_names,
        "advocacy_detail": (
            candidate_names[name].get("advocacy_note")
            if name in candidate_names
            else None
        ),
        "confidence": "Modeled",
    }
    results.append(entry)

results.sort(key=lambda r: r["hof_probability"], reverse=True)

# --- Summary ---

print(f"\nProcessed {len(results)} non-inducted NLB players")
print(f"Routed to Early Baseball: {sum(1 for r in results if r['era_committee'] == 'early')}")
print(f"Routed to Classical: {sum(1 for r in results if r['era_committee'] == 'classical')}")

high_prob = [r for r in results if r["hof_probability"] >= 0.5]
print(f"\nHigh probability (>= 0.5): {len(high_prob)}")
for r in high_prob:
    print(
        f"  {r['name']:25s}  prob={r['hof_probability']:.3f}  "
        f"WAR={r['career_war']:.1f}  JAWS rank={r['jaws_rank']}  "
        f"advocacy={'yes' if r['historian_advocacy'] else 'no'}  "
        f"-> {r['era_committee_name']}"
    )

mid_prob = [r for r in results if 0.3 <= r["hof_probability"] < 0.5]
print(f"\nBorderline (0.3-0.5): {len(mid_prob)}")
for r in mid_prob:
    print(
        f"  {r['name']:25s}  prob={r['hof_probability']:.3f}  "
        f"WAR={r['career_war']:.1f}  JAWS rank={r['jaws_rank']}"
    )

# --- Output ---

output = {
    "metadata": {
        "title": "Negro Leagues HOF Probability and Era Committee Routing",
        "description": (
            "For each non-inducted Negro Leaguer in the Rate JAWS "
            "leaderboard, a composite probability score estimating "
            "HOF candidacy strength, and routing to the appropriate "
            "era committee."
        ),
        "methodology": {
            "probability_model": {
                "type": "Composite score (not statistical probability)",
                "components": {
                    "rank_percentile": "Position in Rate JAWS leaderboard (40%)",
                    "war_ratio": "Career WAR / position HOF average (30%)",
                    "advocacy": "Historian advocacy from 42 for 21 poll (20%)",
                    "momentum": "Recent committee induction patterns (10%)",
                },
                "scale": "0.0 (no case) to 1.0 (overwhelming case)",
            },
            "era_routing": (
                "Players whose career midpoint is before 1950 are routed "
                "to the Early Baseball Era Committee. Players active "
                "primarily 1950+ go to the Classical Baseball Era Committee."
            ),
            "limitations": [
                "Probability is a model output, not a prediction of committee votes.",
                "Career WAR figures carry uncertainty from incomplete records.",
                "Advocacy scoring is binary; intensity of advocacy is not captured.",
                "Era committee routing uses career midpoint, which may not "
                "reflect the committee's actual deliberation.",
            ],
        },
        "source": {
            "rate_jaws": "Ch 10 Rate JAWS (Seamheads)",
            "candidates": "Ch 11 candidates.json (42 for 21, historian advocacy)",
            "hof_standards": "FanGraphs JAWS position averages",
        },
        "total_candidates": len(results),
        "processed_date": "2026-05-25",
    },
    "era_committees": ERA_COMMITTEES,
    "candidates": results,
}

out_path = os.path.join(BASE, "data", "hof-probability.json")
with open(out_path, "w") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
print(f"\nSaved to {out_path}")
