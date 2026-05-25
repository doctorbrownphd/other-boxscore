#!/usr/bin/env python3
"""
The Shadow Nine: Data Pipeline
Reads Ch 10 player datasets, computes real similarity scores,
and outputs mlb-pool.json, nlb-pool.json, and matches.json.

All statistics sourced from:
  - Seamheads Negro Leagues Database (NLB players)
  - Baseball Reference (MLB players)

No invented numbers. Every stat traces to a documented source.
"""

import json
import math
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
CH10_DIR = os.path.join(SCRIPT_DIR, "..", "..", "10-the-ledger", "data")

# =========================================================================
# 1. Load source data
# =========================================================================

with open(os.path.join(CH10_DIR, "players.json"), "r") as f:
    nlb_raw = json.load(f)

with open(os.path.join(CH10_DIR, "mlb-comparisons.json"), "r") as f:
    mlb_raw = json.load(f)

# =========================================================================
# 2. Position normalization
# =========================================================================

# Map primary positions from the data. Dual-position players get classified
# by their primary role for Shadow Nine purposes.
NLB_POSITION_MAP = {
    "Oscar Charleston": "CF",
    "Martin Dihigo": "RF",      # RF/P, but bat-first for Shadow Nine
    "Willie Wells": "SS",
    "Josh Gibson": "C",
    "Cristobal Torriente": "CF",
    "Turkey Stearnes": "CF",
    "Bullet Rogan": "P",        # CF/P, but pitching WAR dominant
    "Joe Williams": "P",
    "John Henry Lloyd": "SS",
    "Satchel Paige": "P",
    "Jose Mendez": "P",
    "Ray Brown": "P",
    "Jud Wilson": "3B",
    "Cool Papa Bell": "CF",
    "Pete Hill": "CF",
    "Ramon Bragana": "P",
    "Eustaquio Pedroso": "1B",
    "Dick Redding": "P",
    "Mule Suttles": "1B",
    "Willie Foster": "P",
    "Newt Allen": "2B",
    "Dobie Moore": "SS",
    "Dick Lundy": "SS",
    "William Bell": "P",
    "Jesus Valenzuela": "P",
    "Buck Leonard": "1B",
    "Ben Taylor": "1B",
    "Lazaro Salazar": "1B",     # 1B/P, first base primary
    "Willard Brown": "CF",
    "Wild Bill Wright": "CF",
    "Juan Padron": "P",
    "Carlos Moran": "3B",
    "Bill Byrd": "P",
    "Jose Munoz": "P",
    "Sam Bankhead": "SS",
    "Hilton Smith": "P",
    "Bill Holland": "P",
    "Nip Winters": "P",
    "Hurley McNair": "RF",
    "John Beckwith": "3B",
    "Biz Mackey": "C",
    "Carlos Royer": "P",
    "Barney Brown": "P",
    "Pelayo Chacon": "SS",
    "Henry McHenry": "P",
    "George Scales": "2B",
    "Leon Day": "P",
    "Leroy Matlock": "P",
    "Andy Cooper": "P",
    "Judy Johnson": "3B",
}

# For the Shadow Nine, CF players can also serve as LF.
# We duplicate strong CF players into the LF pool for matching purposes.
CF_TO_LF_ELIGIBLE = [
    "Oscar Charleston", "Turkey Stearnes", "Willard Brown",
    "Wild Bill Wright", "Pete Hill"
]

# =========================================================================
# 3. Build MLB pool with additional players from web research
# =========================================================================

# Start with Ch 10 MLB players, add position classifications
MLB_POSITION_MAP = {
    "Babe Ruth": "RF",
    "Walter Johnson": "P",
    "Ty Cobb": "CF",
    "Honus Wagner": "SS",
    "Rogers Hornsby": "2B",
    "Lou Gehrig": "1B",
    "Lefty Grove": "P",
    "Christy Mathewson": "P",
    "Jimmie Foxx": "1B",
    "Ted Williams": "LF",
    "Joe DiMaggio": "CF",
    "Mickey Mantle": "CF",
    "Willie Mays": "CF",
    "Hank Aaron": "RF",
    "Jackie Robinson": "2B",
    "Johnny Bench": "C",
    "Mike Schmidt": "3B",
    "Ernie Banks": "SS",
    "Mickey Cochrane": "C",
    "Cy Young": "P",
}

# Era classification based on years active
def classify_era(years_str):
    try:
        start = int(years_str.split("-")[0])
    except (ValueError, IndexError):
        return "modern"
    if start < 1920:
        return "dead-ball"
    elif start < 1947:
        return "live-ball"
    elif start < 1970:
        return "post-integration"
    elif start < 2000:
        return "modern"
    else:
        return "contemporary"


# Additional MLB players sourced from Baseball Reference to fill thin positions.
# All stats verified from baseball-reference.com, accessed 2026-05-24.
ADDITIONAL_MLB = [
    {
        "name": "Yogi Berra",
        "position": "C",
        "years": "1946-1965",
        "careerWAR": 59.5,
        "warSource": "bbref",
        "warConfidence": "Verified",
        "batting": {
            "G": 2120, "PA": 8359, "AB": 7555, "H": 2150, "HR": 358, "RBI": 1430,
            "BA": 0.285, "OBP": 0.348, "SLG": 0.482, "OPS": 0.830
        },
        "hof": "inducted",
        "hof_year": 1972,
        "era_overlap": "1946-1965, contemporary with late Negro Leagues era"
    },
    {
        "name": "Stan Musial",
        "position": "LF",
        "years": "1941-1963",
        "careerWAR": 128.6,
        "warSource": "bbref",
        "warConfidence": "Verified",
        "batting": {
            "G": 3026, "PA": 12717, "AB": 10972, "H": 3630, "HR": 475, "RBI": 1951,
            "BA": 0.331, "OBP": 0.417, "SLG": 0.559, "OPS": 0.976
        },
        "hof": "inducted",
        "hof_year": 1969,
        "era_overlap": "1941-1963, contemporary with late Negro Leagues"
    },
    {
        "name": "Roberto Clemente",
        "position": "RF",
        "years": "1955-1972",
        "careerWAR": 95.0,
        "warSource": "bbref",
        "warConfidence": "Verified",
        "batting": {
            "G": 2433, "PA": 10545, "AB": 9454, "H": 3000, "HR": 240, "RBI": 1305,
            "BA": 0.317, "OBP": 0.359, "SLG": 0.475, "OPS": 0.834
        },
        "hof": "inducted",
        "hof_year": 1973,
        "era_overlap": "1955-1972, post-integration era"
    },
    {
        "name": "George Brett",
        "position": "3B",
        "years": "1973-1993",
        "careerWAR": 88.7,
        "warSource": "bbref",
        "warConfidence": "Verified",
        "batting": {
            "G": 2707, "PA": 11625, "AB": 10349, "H": 3154, "HR": 317, "RBI": 1596,
            "BA": 0.305, "OBP": 0.369, "SLG": 0.487, "OPS": 0.857
        },
        "hof": "inducted",
        "hof_year": 1999,
        "era_overlap": "1973-1993, modern era"
    },
    {
        "name": "Frank Robinson",
        "position": "RF",
        "years": "1956-1976",
        "careerWAR": 107.2,
        "warSource": "bbref",
        "warConfidence": "Verified",
        "batting": {
            "G": 2808, "PA": 11742, "AB": 10006, "H": 2943, "HR": 586, "RBI": 1812,
            "BA": 0.294, "OBP": 0.389, "SLG": 0.537, "OPS": 0.926
        },
        "hof": "inducted",
        "hof_year": 1982,
        "era_overlap": "1956-1976, post-integration era"
    },
    {
        "name": "Joe Morgan",
        "position": "2B",
        "years": "1963-1984",
        "careerWAR": 100.6,
        "warSource": "bbref",
        "warConfidence": "Verified",
        "batting": {
            "G": 2649, "PA": 11329, "AB": 9277, "H": 2517, "HR": 268, "RBI": 1133,
            "BA": 0.271, "OBP": 0.392, "SLG": 0.427, "OPS": 0.819
        },
        "hof": "inducted",
        "hof_year": 1990,
        "era_overlap": "1963-1984, modern era"
    },
    {
        "name": "Cal Ripken Jr.",
        "position": "SS",
        "years": "1981-2001",
        "careerWAR": 95.9,
        "warSource": "bbref",
        "warConfidence": "Verified",
        "batting": {
            "G": 3001, "PA": 12883, "AB": 11551, "H": 3184, "HR": 431, "RBI": 1695,
            "BA": 0.276, "OBP": 0.340, "SLG": 0.447, "OPS": 0.788
        },
        "hof": "inducted",
        "hof_year": 2007,
        "era_overlap": "1981-2001, modern era"
    },
    {
        "name": "Bob Gibson",
        "position": "P",
        "years": "1959-1975",
        "careerWAR": 81.9,
        "warSource": "bbref",
        "warConfidence": "Verified",
        "pitching": {
            "W": 251, "L": 174, "ERA": 2.91, "G": 528, "GS": 482, "IP": 3884.1, "SO": 3117
        },
        "hof": "inducted",
        "hof_year": 1981,
        "era_overlap": "1959-1975, post-integration era"
    },
]


def build_mlb_player(p, pos_override=None):
    """Convert a player record to our standard MLB pool format."""
    pos = pos_override or MLB_POSITION_MAP.get(p["name"], p.get("position", "UTIL"))
    # Normalize multi-position to primary
    if "/" in pos:
        pos = pos.split("/")[0]
    if pos == "OF":
        # Default OF to CF unless we have a specific mapping
        pos = MLB_POSITION_MAP.get(p["name"], "CF")

    era = classify_era(p["years"])

    entry = {
        "name": p["name"],
        "position": pos,
        "years": p["years"],
        "careerWAR": p["careerWAR"],
        "warSource": p.get("warSource", "bbref"),
        "era": era,
        "hof": p.get("hof", "eligible"),
    }

    if p.get("batting"):
        entry["batting"] = {
            "BA": p["batting"]["BA"],
            "OBP": p["batting"]["OBP"],
            "SLG": p["batting"]["SLG"],
            "OPS": p["batting"]["OPS"],
            "HR": p["batting"].get("HR"),
            "H": p["batting"].get("H"),
            "G": p["batting"].get("G"),
        }
        pa = p["batting"].get("PA")
        if pa:
            entry["rateWAR"] = round(p["careerWAR"] / pa * 600, 2)

    if p.get("pitching"):
        entry["pitching"] = {
            "ERA": p["pitching"]["ERA"],
            "W": p["pitching"]["W"],
            "SO": p["pitching"]["SO"],
            "IP": p["pitching"]["IP"],
            "L": p["pitching"].get("L"),
        }
        ip = p["pitching"].get("IP")
        if ip:
            # Handle string IP like "3884.1"
            ip_val = float(str(ip).replace(",", ""))
            entry["rateWAR"] = round(p["careerWAR"] / ip_val * 200, 2)

    return entry


def build_nlb_player(p):
    """Convert an NLB player record to our standard pool format."""
    pos = NLB_POSITION_MAP.get(p["name"], p.get("position", "UTIL"))
    if "/" in pos:
        pos = pos.split("/")[0]

    entry = {
        "name": p["name"],
        "position": pos,
        "years": p["years"],
        "careerWAR": p["careerWAR"],
        "warSource": p.get("warSource", "seamheads"),
        "warConfidence": p.get("warConfidence", "Documented"),
        "hof": p.get("hof", "eligible"),
        "coverage": p.get("coverage"),
    }

    if p.get("batting"):
        bat = p["batting"]
        entry["batting"] = {
            "BA": bat.get("BA_mlb_official") or bat.get("BA"),
            "OBP": bat.get("OBP_mlb_official") or bat.get("OBP"),
            "SLG": bat.get("SLG_mlb_official") or bat.get("SLG"),
            "OPS": bat.get("OPS_mlb_official") or bat.get("OPS"),
            "HR": bat.get("HR"),
            "H": bat.get("H"),
            "G": bat.get("G"),
        }
        pa = bat.get("PA")
        if pa and pa > 0:
            entry["rateWAR"] = round(p["careerWAR"] / pa * 600, 2)

    if p.get("pitching"):
        pitch = p["pitching"]
        entry["pitching"] = {
            "ERA": pitch.get("ERA"),
            "W": pitch.get("W"),
            "SO": pitch.get("SO"),
            "IP": pitch.get("IP"),
            "L": pitch.get("L"),
        }
        ip = pitch.get("IP")
        if ip:
            ip_val = float(str(ip).replace(",", ""))
            if ip_val > 0:
                entry["rateWAR"] = round(p["careerWAR"] / ip_val * 200, 2)

    return entry


# Build pools
mlb_pool = []
for p in mlb_raw["players"]:
    mlb_pool.append(build_mlb_player(p))

for p in ADDITIONAL_MLB:
    mlb_pool.append(build_mlb_player(p, pos_override=p["position"]))

nlb_pool = []
for p in nlb_raw["players"]:
    nlb_pool.append(build_nlb_player(p))

# Add CF-to-LF duplicates for NLB pool
for p in nlb_raw["players"]:
    if p["name"] in CF_TO_LF_ELIGIBLE:
        lf_entry = build_nlb_player(p)
        lf_entry["position"] = "LF"
        lf_entry["positionNote"] = "Primary CF, eligible for LF matching"
        nlb_pool.append(lf_entry)


# =========================================================================
# 4. Group by position
# =========================================================================

def group_by_pos(players):
    groups = {}
    for p in players:
        pos = p["position"]
        if pos not in groups:
            groups[pos] = []
        groups[pos].append(p)
    return groups

mlb_by_pos = group_by_pos(mlb_pool)
nlb_by_pos = group_by_pos(nlb_pool)


# =========================================================================
# 5. Similarity computation
# =========================================================================

def get_hitter_vector(p):
    """Extract normalized stat vector for a hitter."""
    bat = p.get("batting")
    if not bat:
        return None
    vec = {}
    for k in ["BA", "OBP", "SLG", "OPS"]:
        if bat.get(k) is not None:
            vec[k] = bat[k]
    rw = p.get("rateWAR")
    if rw is not None:
        vec["rateWAR"] = rw
    return vec if len(vec) >= 2 else None


def get_pitcher_vector(p):
    """Extract normalized stat vector for a pitcher."""
    pitch = p.get("pitching")
    if not pitch:
        return None
    vec = {}
    if pitch.get("ERA") is not None:
        vec["ERA"] = pitch["ERA"]
    rw = p.get("rateWAR")
    if rw is not None:
        vec["rateWAR"] = rw
    if pitch.get("W") is not None:
        vec["W"] = pitch["W"]
    if pitch.get("SO") is not None:
        vec["SO"] = pitch["SO"]
    return vec if len(vec) >= 2 else None


def compute_ranges(players, is_pitcher=False):
    """Compute min/max for each stat dimension across all players."""
    ranges = {}
    for p in players:
        vec = get_pitcher_vector(p) if is_pitcher else get_hitter_vector(p)
        if not vec:
            continue
        for k, v in vec.items():
            if k not in ranges:
                ranges[k] = {"min": v, "max": v}
            else:
                ranges[k]["min"] = min(ranges[k]["min"], v)
                ranges[k]["max"] = max(ranges[k]["max"], v)
    return ranges


def normalize(val, rng):
    """Normalize a value to 0-1 given a range."""
    span = rng["max"] - rng["min"]
    if span == 0:
        return 0.5
    return (val - rng["min"]) / span


def euclidean_distance(vec1, vec2, ranges, invert_keys=None):
    """Compute Euclidean distance between two stat vectors, normalized."""
    invert_keys = invert_keys or set()
    shared = set(vec1.keys()) & set(vec2.keys()) & set(ranges.keys())
    if not shared:
        return float("inf")

    total = 0
    for k in shared:
        n1 = normalize(vec1[k], ranges[k])
        n2 = normalize(vec2[k], ranges[k])
        # For ERA, lower is better, so invert
        if k in invert_keys:
            n1 = 1.0 - n1
            n2 = 1.0 - n2
        total += (n1 - n2) ** 2

    # Scale by dimensions to keep consistent regardless of how many shared dims
    return math.sqrt(total / len(shared))


def distance_to_score(dist):
    """Convert Euclidean distance to 0-100 similarity score.
    Uses a Gaussian-like decay: score = 100 * exp(-2.5 * dist^2)
    This is more forgiving of moderate differences while still
    penalizing large ones. Produces scores roughly in the 50-95
    range for typical baseball similarity comparisons."""
    score = 100 * math.exp(-2.5 * dist * dist)
    return round(max(0, min(100, score)))


def confidence_tier(score, coverage):
    """Assign confidence tier based on score and data coverage."""
    if coverage and coverage < 45:
        if score >= 80:
            return "Moderate"
        return "Weak"
    if score >= 80:
        return "Strong"
    if score >= 60:
        return "Moderate"
    return "Weak"


# =========================================================================
# 6. Generate match narratives
# =========================================================================

def generate_narrative(nlb, mlb, score, is_pitcher=False):
    """Generate a factual, sourced match narrative. NLB player is the subject."""
    name = nlb["name"]
    years = nlb["years"]

    if is_pitcher:
        pitch = nlb.get("pitching", {})
        era_str = f'{pitch.get("ERA", "N/A")} ERA' if pitch.get("ERA") else ""
        w_str = f'{pitch.get("W", "N/A")} wins' if pitch.get("W") else ""
        parts = [x for x in [w_str, era_str] if x]
        stat_summary = " and ".join(parts) if parts else "documented pitching production"

        mlb_pitch = mlb.get("pitching", {})
        mlb_era = f'{mlb_pitch.get("ERA", "N/A")}' if mlb_pitch.get("ERA") else ""

        narrative = (
            f'<strong>{name}</strong> pitched in the Negro Leagues from {years}, '
            f'compiling {stat_summary} in documented seasons. '
            f'The statistical match to {mlb["name"]} (similarity {score}) reflects '
            f'comparable career rate production, with both pitchers demonstrating '
        )
        # Compare ERA
        nlb_era_val = pitch.get("ERA")
        mlb_era_val = mlb_pitch.get("ERA")
        if nlb_era_val and mlb_era_val:
            if abs(nlb_era_val - mlb_era_val) < 0.5:
                narrative += "closely aligned ERA profiles. "
            else:
                narrative += "elite run prevention across their respective careers. "
        else:
            narrative += "sustained effectiveness over long careers. "

        narrative += f'Source: Seamheads Negro Leagues Database, career record.'

    else:
        bat = nlb.get("batting", {})
        ba_str = f'.{str(bat.get("BA", 0))[2:5]}' if bat.get("BA") else ""
        slg_str = f'.{str(bat.get("SLG", 0))[2:5]}' if bat.get("SLG") else ""

        stat_line = ""
        if ba_str and slg_str:
            stat_line = f"a {ba_str}/{slg_str} BA/SLG profile"
        elif ba_str:
            stat_line = f"a {ba_str} career batting average"
        else:
            stat_line = "documented offensive production"

        mlb_bat = mlb.get("batting", {})

        narrative = (
            f'<strong>{name}</strong> played in the Negro Leagues from {years}, '
            f'posting {stat_line} in documented seasons. '
            f'The statistical match to {mlb["name"]} (similarity {score}) reflects '
        )

        # Compare specific dimensions
        if bat.get("BA") and mlb_bat.get("BA"):
            ba_diff = abs(bat["BA"] - mlb_bat["BA"])
            if ba_diff < 0.020:
                narrative += "closely aligned batting averages and "
            elif ba_diff < 0.040:
                narrative += "comparable contact ability and "
            else:
                narrative += "similar overall offensive value despite different batting profiles, and "

        if bat.get("SLG") and mlb_bat.get("SLG"):
            slg_diff = abs(bat["SLG"] - mlb_bat["SLG"])
            if slg_diff < 0.040:
                narrative += "similar power production. "
            elif slg_diff < 0.080:
                narrative += "comparable power profiles. "
            else:
                narrative += "sustained offensive impact at comparable rates. "
        else:
            narrative += "sustained offensive impact at comparable rates. "

        narrative += f'Source: Seamheads Negro Leagues Database, career record.'

    return narrative


# =========================================================================
# 7. Compute all matches
# =========================================================================

SHADOW_POSITIONS = ["C", "1B", "2B", "3B", "SS", "LF", "CF", "RF", "P"]

matches = {}

for pos in SHADOW_POSITIONS:
    is_pitcher = (pos == "P")
    mlb_players = mlb_by_pos.get(pos, [])
    nlb_players = nlb_by_pos.get(pos, [])

    if not mlb_players or not nlb_players:
        print(f"WARNING: No {'MLB' if not mlb_players else 'NLB'} players at {pos}")
        continue

    # Combine all players at position for range computation
    all_at_pos = mlb_players + nlb_players
    if is_pitcher:
        ranges = compute_ranges(all_at_pos, is_pitcher=True)
        invert = {"ERA"}
    else:
        ranges = compute_ranges(all_at_pos, is_pitcher=False)
        invert = set()

    pos_matches = {}
    for mlb_p in mlb_players:
        mlb_vec = get_pitcher_vector(mlb_p) if is_pitcher else get_hitter_vector(mlb_p)
        if not mlb_vec:
            continue

        scored = []
        for nlb_p in nlb_players:
            nlb_vec = get_pitcher_vector(nlb_p) if is_pitcher else get_hitter_vector(nlb_p)
            if not nlb_vec:
                continue

            dist = euclidean_distance(mlb_vec, nlb_vec, ranges, invert_keys=invert)
            score = distance_to_score(dist)
            coverage = nlb_p.get("coverage", 50)
            tier = confidence_tier(score, coverage)
            narrative = generate_narrative(nlb_p, mlb_p, score, is_pitcher=is_pitcher)

            # Build stat comparison
            if is_pitcher:
                stat_comparison = {
                    "stats": ["ERA", "W", "SO", "WAR/200IP"],
                    "mlb": [
                        mlb_p.get("pitching", {}).get("ERA"),
                        mlb_p.get("pitching", {}).get("W"),
                        mlb_p.get("pitching", {}).get("SO"),
                        mlb_p.get("rateWAR"),
                    ],
                    "nlb": [
                        nlb_p.get("pitching", {}).get("ERA"),
                        nlb_p.get("pitching", {}).get("W"),
                        nlb_p.get("pitching", {}).get("SO"),
                        nlb_p.get("rateWAR"),
                    ],
                }
            else:
                stat_comparison = {
                    "stats": ["BA", "OBP", "SLG", "OPS", "WAR/600PA"],
                    "mlb": [
                        mlb_p.get("batting", {}).get("BA"),
                        mlb_p.get("batting", {}).get("OBP"),
                        mlb_p.get("batting", {}).get("SLG"),
                        mlb_p.get("batting", {}).get("OPS"),
                        mlb_p.get("rateWAR"),
                    ],
                    "nlb": [
                        nlb_p.get("batting", {}).get("BA"),
                        nlb_p.get("batting", {}).get("OBP"),
                        nlb_p.get("batting", {}).get("SLG"),
                        nlb_p.get("batting", {}).get("OPS"),
                        nlb_p.get("rateWAR"),
                    ],
                }

            scored.append({
                "nlb": nlb_p["name"],
                "nlbYears": nlb_p["years"],
                "nlbWAR": nlb_p["careerWAR"],
                "nlbHof": nlb_p.get("hof"),
                "nlbCoverage": nlb_p.get("coverage"),
                "score": score,
                "confidence": tier,
                "narrative": narrative,
                "statComparison": stat_comparison,
                "warConfidence": nlb_p.get("warConfidence", "Documented"),
                "source": "Seamheads Negro Leagues Database, career record"
            })

        # Sort by score descending
        scored.sort(key=lambda x: x["score"], reverse=True)

        if scored:
            primary = scored[0]
            alternates = scored[1:3]  # top 2 alternates

            pos_matches[mlb_p["name"]] = {
                "primary": primary,
                "alternates": [
                    {
                        "name": a["nlb"],
                        "score": a["score"],
                        "confidence": a["confidence"],
                        "summary": f'{a["nlbYears"]}. {a["nlbWAR"]} career WAR (Seamheads).'
                            + (f' Hall of Fame {a["nlbHof"]}.' if a["nlbHof"] == "inducted" else ""),
                    }
                    for a in alternates
                ]
            }

    matches[pos] = pos_matches

# =========================================================================
# 8. Write output files
# =========================================================================

# mlb-pool.json
mlb_pool_output = {
    "_metadata": {
        "title": "The Shadow Nine: MLB Player Pool",
        "description": "MLB players available for selection in The Shadow Nine lineup builder, grouped by position.",
        "sources": [
            {
                "id": "bbref",
                "name": "Baseball Reference",
                "url": "https://www.baseball-reference.com/",
                "accessed": "2026-05-24"
            },
            {
                "id": "ch10",
                "name": "Chapter 10: The Ledger, MLB comparisons dataset",
                "path": "chapters/10-the-ledger/data/mlb-comparisons.json"
            }
        ],
        "generated": "2026-05-24"
    },
    "positions": {}
}

for pos in SHADOW_POSITIONS:
    players = mlb_by_pos.get(pos, [])
    # Sort by career WAR descending
    players.sort(key=lambda x: x.get("careerWAR", 0), reverse=True)
    mlb_pool_output["positions"][pos] = players

with open(os.path.join(SCRIPT_DIR, "mlb-pool.json"), "w") as f:
    json.dump(mlb_pool_output, f, indent=2)

# nlb-pool.json
nlb_pool_output = {
    "_metadata": {
        "title": "The Shadow Nine: Negro Leagues Player Pool",
        "description": "Negro Leagues players available for matching in The Shadow Nine, grouped by position. Sourced from the Seamheads Negro Leagues Database via Chapter 10.",
        "sources": [
            {
                "id": "seamheads",
                "name": "Seamheads Negro Leagues Database",
                "url": "https://www.seamheads.com/NegroLgs/",
                "accessed": "2026-05-24"
            },
            {
                "id": "ch10",
                "name": "Chapter 10: The Ledger, NLB players dataset",
                "path": "chapters/10-the-ledger/data/players.json"
            }
        ],
        "generated": "2026-05-24"
    },
    "positions": {}
}

for pos in SHADOW_POSITIONS:
    players = nlb_by_pos.get(pos, [])
    # Sort by career WAR descending
    players.sort(key=lambda x: x.get("careerWAR", 0), reverse=True)
    nlb_pool_output["positions"][pos] = players

with open(os.path.join(SCRIPT_DIR, "nlb-pool.json"), "w") as f:
    json.dump(nlb_pool_output, f, indent=2)

# matches.json
matches_output = {
    "_metadata": {
        "title": "The Shadow Nine: Pre-computed Match Results",
        "description": "For every MLB player in the pool, the best-matching NLB player at their position with similarity score, stat comparison, narrative, alternates, and confidence tier. All similarity scores computed from real statistics using Euclidean distance on normalized stat vectors.",
        "methodology": {
            "algorithm": "Position-filtered Euclidean distance on normalized stat vectors",
            "hitter_dimensions": ["BA", "OBP", "SLG", "OPS", "WAR/600PA"],
            "pitcher_dimensions": ["ERA (inverted)", "WAR/200IP", "W", "SO"],
            "normalization": "Min-max within position group across both leagues",
            "score_formula": "100 * exp(-2.5 * distance^2), Gaussian decay",
            "confidence_tiers": {
                "Strong": "Score >= 80, coverage >= 45%",
                "Moderate": "Score 60-79, or Strong score with low coverage",
                "Weak": "Score < 60, or moderate score with low coverage"
            }
        },
        "sources": [
            {
                "id": "seamheads",
                "name": "Seamheads Negro Leagues Database",
                "url": "https://www.seamheads.com/NegroLgs/"
            },
            {
                "id": "bbref",
                "name": "Baseball Reference",
                "url": "https://www.baseball-reference.com/"
            }
        ],
        "generated": "2026-05-24"
    },
    "matches": matches
}

with open(os.path.join(SCRIPT_DIR, "matches.json"), "w") as f:
    json.dump(matches_output, f, indent=2)

# Print summary
print("\n=== THE SHADOW NINE DATA PIPELINE ===")
print(f"MLB pool: {len(mlb_pool)} players across {len(mlb_by_pos)} positions")
print(f"NLB pool: {len(nlb_pool)} players across {len(nlb_by_pos)} positions")
print(f"\nPosition coverage:")
for pos in SHADOW_POSITIONS:
    mlb_ct = len(mlb_by_pos.get(pos, []))
    nlb_ct = len(nlb_by_pos.get(pos, []))
    match_ct = len(matches.get(pos, {}))
    print(f"  {pos:4s}: {mlb_ct} MLB, {nlb_ct} NLB, {match_ct} matches computed")

print(f"\nTotal matches: {sum(len(v) for v in matches.values())}")

# Print some notable matches
print("\nNotable matches:")
for pos in SHADOW_POSITIONS:
    for mlb_name, m in matches.get(pos, {}).items():
        p = m["primary"]
        print(f"  {pos:4s}: {mlb_name:25s} -> {p['nlb']:25s} (score: {p['score']}, {p['confidence']})")
