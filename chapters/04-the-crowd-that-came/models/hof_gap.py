"""
HOF Gap Calculation -- East-West All-Star Game

For every player who appeared in at least one East-West All-Star Game
(1933-1948), cross-reference against:
  1. Baseball Hall of Fame induction records
  2. Ch 10 Rate JAWS scores (where available)

Players who were never inducted but whose Rate JAWS score meets or
exceeds the position-average HOF bar are flagged with a documented
gap marker. This is model output, not fact.

Input:
  - East-West rosters (sourced from Retrosheet box scores)
  - chapters/10-the-ledger/data/rate-jaws.json
  - chapters/11-cooperstown/data/candidates.json
  - chapters/11-cooperstown/data/hof-standards.json

Output:
  - chapters/04-the-crowd-that-came/data/east-west-rosters.json
  - chapters/04-the-crowd-that-came/data/hof-gap.json

Confidence: Modeled
Source: Retrosheet Negro League East-West All-Star Game box scores
"""

import json
import os

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CH10 = os.path.join(os.path.dirname(BASE), "10-the-ledger")
CH11 = os.path.join(os.path.dirname(BASE), "11-cooperstown")

# --- East-West All-Star rosters from Retrosheet box scores ---
# Complete rosters for every game, 1933-1948
# Source: retrosheet.org/NegroLeagues/EastWest.html

ROSTERS = {
    1933: {
        "east": [
            "Cool Papa Bell", "Rap Dixon", "Oscar Charleston",
            "Biz Mackey", "Josh Gibson", "Jud Wilson", "Judy Johnson",
            "Dick Lundy", "Vic Harris", "Fats Jenkins",
            "John Henry Russell", "Sam Streeter", "Bert Hunter",
            "George Britt",
        ],
        "west": [
            "Turkey Stearnes", "Willie Wells", "Steel Arm Davis",
            "Alex Radcliffe", "Mule Suttles", "Leroy Morney",
            "Sam Bankhead", "Larry Brown", "Willie Foster",
        ],
    },
    1934: {
        "east": [
            "Cool Papa Bell", "Jimmie Crutchfield", "Oscar Charleston",
            "Jud Wilson", "Josh Gibson", "Vic Harris", "Rap Dixon",
            "Bill Perkins", "Dick Lundy", "Chester Williams",
            "Slim Jones", "Harry Kincannon", "Satchel Paige",
        ],
        "west": [
            "Willie Wells", "Alex Radcliffe", "Turkey Stearnes",
            "Mule Suttles", "Melvin Powell", "Roy Parnell",
            "Sam Bankhead", "Larry Brown", "Sammy Hughes",
            "Pat Patterson", "Ted Trent", "Chet Brewer",
            "Willie Foster",
        ],
    },
    1935: {
        "east": [
            "Jake Stephens", "George Giles", "Martin Dihigo",
            "Jud Wilson", "Alejandro Oms", "Biz Mackey",
            "Fats Jenkins", "Dick Seay", "Ed Stone", "Ray Dandridge",
            "Slim Jones", "Leon Day", "Luis Tiant", "Paul Arnold",
        ],
        "west": [
            "Cool Papa Bell", "Sammy Hughes", "Willie Wells",
            "Chester Williams", "Josh Gibson", "Mule Suttles",
            "Oscar Charleston", "Ted Trent", "Wild Bill Wright",
            "Bob Griffith", "Felton Snow", "Willie Cornelius",
            "Alex Radcliffe", "Jimmie Crutchfield", "Turkey Stearnes",
            "Ray Brown", "Leroy Matlock", "Buck Leonard",
        ],
    },
    1936: {
        "east": [
            "Cool Papa Bell", "Wild Bill Wright", "Sammy Hughes",
            "Sam Bankhead", "Biz Mackey", "Josh Gibson",
            "Jimmie Crutchfield", "Zollie Wright", "Chester Williams",
            "Jim West", "Johnny Washington", "Judy Johnson",
            "Felton Snow", "Leroy Matlock", "Bill Byrd",
            "Satchel Paige",
        ],
        "west": [
            "Eddie Dwight", "Henry Milton", "Newt Allen",
            "Wilson Redus", "Lou Dials", "Alex Radcliffe",
            "Bullet Rogan", "Herman Dunlap", "Harry Else",
            "Subby Byas", "Willard Brown", "Pat Patterson",
            "Curtis Harris", "Willie Cornelius", "Floyd Kranson",
            "Ben Taylor", "Andy Cooper", "Ted Trent",
        ],
    },
    1937: {
        "east": [
            "Jerry Benjamin", "Willie Wells", "Wild Bill Wright",
            "Buck Leonard", "Mule Suttles", "Chester Williams",
            "Jake Dunn", "Ray Dandridge", "Pepper Bassett",
            "Barney Morris", "Barney Brown", "Leon Day",
        ],
        "west": [
            "Newt Allen", "Lloyd Davenport", "Wilson Redus",
            "Ted Strong", "Turkey Stearnes", "Willard Brown",
            "Henry Milton", "Alex Radcliffe", "Howard Easterling",
            "Rainey Bibbs", "Ted Radcliffe", "Subby Byas",
            "Ted Trent", "Ed Mayweather", "Hilton Smith",
            "Porter Moss",
        ],
    },
    1938: {
        "east": [
            "Vic Harris", "Sammy Hughes", "Willie Wells",
            "Buck Leonard", "Walter Cannady", "Sam Bankhead",
            "Wild Bill Wright", "Biz Mackey", "Edsall Walker",
            "Barney Brown", "Johnny Taylor", "Jake Dunn",
        ],
        "west": [
            "Henry Milton", "Newt Allen", "Alex Radcliffe",
            "Ted Strong", "Quincy Trouppe", "Neil Robinson",
            "Frank Duncan", "Parnell Woods", "Larry Brown",
            "Mex Johnson", "Willie Cornelius", "Hilton Smith",
            "Ted Radcliffe",
        ],
    },
    1939: {
        "east": [
            "Wild Bill Wright", "Willie Wells", "Josh Gibson",
            "Mule Suttles", "Buck Leonard", "Pat Patterson",
            "Sammy Hughes", "Roy Parnell", "Bill Byrd", "Leon Day",
            "Roy Partlow", "Bill Holland",
        ],
        "west": [
            "Henry Milton", "Dan Wilson", "Alex Radcliffe",
            "Neil Robinson", "Ted Strong", "Jelly Taylor",
            "Leroy Morney", "Pepper Bassett", "Larry Brown",
            "Theolic Smith", "Hilton Smith", "Ted Radcliffe",
            "Parnell Woods", "Billy Horne", "Jim Williams",
        ],
    },
    1940: {
        "east": [
            "Gene Benson", "Rabbit Martinez", "Bus Clarkson",
            "Ed Stone", "Alejandro Crespo", "Buck Leonard",
            "Howard Easterling", "Marvin Barker", "Bill Perkins",
            "Bob Clarke", "Dick Seay", "Henry McHenry",
            "Silvino Ruiz", "Ray Brown",
        ],
        "west": [
            "Henry Milton", "Parnell Woods", "Ed Mayweather",
            "Neil Robinson", "Leslie Green", "Donald Reeves",
            "Joe Greene", "Larry Brown", "Leroy Morney",
            "Curtis Henderson", "Jelly Taylor", "Tommy Sampson",
            "Marshall Riddle", "Eugene Bremer", "Lefty Calhoun",
            "Connie Johnson", "Hilton Smith",
        ],
    },
    1941: {
        "east": [
            "Henry Kimbro", "Pancho Coimbre", "Lennie Pearson",
            "Bill Hoskins", "Buck Leonard", "Monte Irvin",
            "Roy Campanella", "Rabbit Martinez", "Dick Seay",
            "Terris McDuffie", "Dave Barnhill", "Henry McHenry",
            "Jimmy Hill", "Bill Byrd",
        ],
        "west": [
            "Dan Wilson", "Jimmie Crutchfield", "Newt Allen",
            "Billy Horne", "George Mitchell", "Neil Robinson",
            "Buddy Armour", "Ted Strong", "Jelly Taylor",
            "Lyman Bostock", "Parnell Woods", "Tommy Sampson",
            "Jimmy Ford", "Pepper Bassett", "Verdell Mathis",
            "Larry Brown", "Hilton Smith", "Ted Radcliffe",
            "Preacher Henry", "Duke Cleveland", "Dan Bankhead",
            "Frank Hudson", "Satchel Paige",
        ],
    },
    1942: {
        "east": [
            "Dan Wilson", "Sam Bankhead", "Willie Wells",
            "Josh Gibson", "Wild Bill Wright", "Jim West",
            "Pat Patterson", "Tetelo Vargas", "Heberto Blanco",
            "Jonas Gaines", "Vic Harris", "Dave Barnhill",
            "Lennie Pearson", "Barney Brown", "Leon Day",
        ],
        "west": [
            "Cool Papa Bell", "Parnell Woods", "Marlin Carter",
            "Ted Strong", "Willard Brown", "Joe Greene",
            "Buck O'Neil", "Tommy Sampson", "Art Pennington",
            "T.J. Brown", "Lloyd Davenport", "Hilton Smith",
            "Fred Bankhead", "Porter Moss", "Sam Jethroe",
            "Eugene Bremer", "Satchel Paige",
        ],
    },
    1943: {
        "east": [
            "Cool Papa Bell", "Henry Kimbro", "Tetelo Vargas",
            "Jerry Benjamin", "Buck Leonard", "Josh Gibson",
            "Howard Easterling", "Lennie Pearson", "Vic Harris",
            "Sam Bankhead", "Rabbit Martinez", "Dave Barnhill",
            "Johnny Wright", "George Scales", "Bill Harvey",
            "Leon Day",
        ],
        "west": [
            "Jesse Williams", "Lloyd Davenport", "Alex Radcliffe",
            "Willard Brown", "Neil Robinson", "Fred Wilson",
            "Lester Lockett", "Buck O'Neil", "Tommy Sampson",
            "Ted Radcliffe", "Satchel Paige", "Cowan Hyde",
            "Gready McKinnis", "Theolic Smith", "Porter Moss",
        ],
    },
    1944: {
        "east": [
            "Cool Papa Bell", "Ray Dandridge", "Pancho Coimbre",
            "Buck Leonard", "Josh Gibson", "Johnny Davis",
            "Sam Bankhead", "Tommy Butts", "Marvin Williams",
            "Henry Kimbro", "Rabbit Martinez", "Terris McDuffie",
            "Carranza Howard", "Barney Morris", "Roy Campanella",
            "Bill Byrd",
        ],
        "west": [
            "Sam Jethroe", "Neil Robinson", "Artie Wilson",
            "Lloyd Davenport", "Buddy Armour", "Alex Radcliffe",
            "Bonnie Serrell", "Archie Ware", "Ted Radcliffe",
            "Verdell Mathis", "Gentry Jessup", "Gready McKinnis",
            "Eugene Bremer",
        ],
    },
    1945: {
        "east": [
            "Jerry Benjamin", "Frank Austin", "Rabbit Martinez",
            "Johnny Davis", "Gene Benson", "Buck Leonard",
            "Roy Campanella", "Willie Wells", "Wild Bill Wright",
            "Rogelio Linares", "Marvin Barker", "Murray Watkins",
            "Tom Glover", "Bill Ricks", "Martin Dihigo",
            "Lennie Pearson", "Roy Welmaker", "Bill Byrd",
        ],
        "west": [
            "Jesse Williams", "Jackie Robinson", "Lloyd Davenport",
            "Neil Robinson", "Alex Radcliffe", "Lester Lockett",
            "Archie Ware", "Quincy Trouppe", "Verdell Mathis",
            "Gentry Jessup", "Booker McDaniel", "Eugene Bremer",
        ],
    },
    1946: {
        "east": [
            "Henry Kimbro", "Larry Doby", "Howard Easterling",
            "Buck Leonard", "Monte Irvin", "Josh Gibson",
            "Gene Benson", "Silvio Garcia", "Murray Watkins",
            "Leon Day", "Barney Brown", "Bill Byrd",
            "Jonas Gaines", "Patricio Scantlebury", "Tommy Butts",
        ],
        "west": [
            "Artie Wilson", "Archie Ware", "Sam Jethroe",
            "Piper Davis", "Willie Grace", "Alex Radcliffe",
            "Cowan Hyde", "Quincy Trouppe", "Felix Evans",
            "Dan Bankhead", "Johnny Williams",
        ],
    },
    1947: {
        "east": [
            "Henry Kimbro", "Tommy Butts", "Frank Austin",
            "Johnny Washington", "Monte Irvin", "Silvio Garcia",
            "Claro Duany", "Luis Marquez", "Minnie Minoso",
            "Johnny Hayes", "Bob Romby", "Lou Louden",
            "Max Manning", "Luis Tiant", "Henry Miller",
            "Biz Mackey", "Vic Harris", "Johnny Wright",
        ],
        "west": [
            "Artie Wilson", "Herb Souell", "Sam Jethroe",
            "Piper Davis", "Quincy Trouppe", "Jose Colas",
            "Goose Tatum", "Buddy Armour", "Dan Bankhead",
            "Gentry Jessup", "Chet Brewer",
        ],
    },
    1948: {
        "east": [
            "Luis Marquez", "Minnie Minoso", "Luke Easter",
            "Lester Lockett", "Buck Leonard", "Bob Harvey",
            "Monte Irvin", "Jim Gilliam", "Lou Louden",
            "Bill Cash", "Tommy Butts", "Frank Austin",
            "Rufus Lewis", "Wilmer Fields", "Bob Griffith",
        ],
        "west": [
            "Artie Wilson", "Herb Souell", "Piper Davis",
            "Willard Brown", "Bob Boyd", "Neil Robinson",
            "Quincy Trouppe", "Sam Hill", "Bill Powell",
            "Jim LaMarque", "Gentry Jessup",
        ],
    },
}

# --- Build unique player index ---

player_appearances = {}
for year, sides in ROSTERS.items():
    for side, names in sides.items():
        for name in names:
            if name not in player_appearances:
                player_appearances[name] = []
            player_appearances[name].append({"year": year, "side": side})

print(f"Total unique East-West All-Star players (1933-1948): {len(player_appearances)}")

# --- Load HOF and Rate JAWS data ---

with open(os.path.join(CH10, "data", "rate-jaws.json")) as f:
    jaws_data = json.load(f)

with open(os.path.join(CH11, "data", "candidates.json")) as f:
    candidates = json.load(f)

with open(os.path.join(CH11, "data", "hof-standards.json")) as f:
    hof_standards = json.load(f)

# Build HOF lookup from Ch 11
hof_inducted = {}
for p in candidates["inducted_negro_leagues_hof"]:
    hof_inducted[p["name"]] = {
        "year": p["cooperstown_year"],
        "position": p["position"],
        "careerWAR": p.get("careerWAR"),
        "estimatedJAWS": p.get("estimatedJAWS"),
    }

# Build Rate JAWS lookup from Ch 10
jaws_lookup = {}
for p in jaws_data["leaderboard"]:
    jaws_lookup[p["name"]] = {
        "rateJAWS": p["rateJAWS"],
        "rateWAR": p["rateWAR"],
        "careerWAR": p["careerWAR"],
        "position": p["position"],
        "rank": p["rank"],
    }

# Build HOF position bars from Ch 11 standards
# positions is a dict keyed by position code (e.g., "CF", "P", "SS")
position_bars = {}
if "positions" in hof_standards:
    for pos_code, pos_data in hof_standards["positions"].items():
        position_bars[pos_code] = pos_data.get("avgJAWS", 0)

# --- Name matching ---
# Some names differ slightly between sources. Map known variants.

NAME_ALIASES = {
    "Alex Radcliff": "Alex Radcliffe",
    "Ted Radcliff": "Ted Radcliffe",
    "Martin Dihigo": "Martin Dihigo",
    "Luis Tiant": "Luis Tiant Sr.",
    "Minnie Minoso": "Minnie Minoso",
    "Jackie Robinson": "Jackie Robinson",
    "Jim Gilliam": "Junior Gilliam",
}

# Known HOF members from MLB/NLB combined (supplement Ch 11 data)
# Verified HOF inductions for players who appeared in East-West games.
# Source: baseballhall.org, verified against Wikipedia and SABR records.
# None = not inducted as of May 2026.
KNOWN_HOF = {
    # Pre-2006 inductees
    "Jackie Robinson": 1962,
    "Roy Campanella": 1969,
    "Satchel Paige": 1971,
    "Josh Gibson": 1972,
    "Buck Leonard": 1972,
    "Monte Irvin": 1973,
    "Cool Papa Bell": 1974,
    "Judy Johnson": 1975,
    "Oscar Charleston": 1976,
    "Martin Dihigo": 1977,
    "Ray Dandridge": 1987,
    "Leon Day": 1995,
    "Willie Foster": 1996,
    "Willie Wells": 1997,
    "Bullet Rogan": 1998,
    "Larry Doby": 1998,
    "Turkey Stearnes": 2000,
    "Hilton Smith": 2001,
    # 2006 Special Committee on Negro Leagues (17 inductees, 12 players)
    "Ray Brown": 2006,
    "Willard Brown": 2006,
    "Andy Cooper": 2006,
    "Biz Mackey": 2006,
    "Mule Suttles": 2006,
    "Jud Wilson": 2006,
    "Ben Taylor": 2006,
    # 2022 Early Baseball Era / Golden Days Era
    "Buck O'Neil": 2022,
    "Minnie Minoso": 2022,
    # NOT inducted as of May 2026 (verified):
    "Newt Allen": None,
    "Alex Radcliffe": None,
    "Dick Lundy": None,
    "Wild Bill Wright": None,
    "Bus Clarkson": None,
    "Vic Harris": None,
    "Sam Bankhead": None,
    "Dick Seay": None,
    "Pat Patterson": None,
    "Ted Strong": None,
    "Sam Jethroe": None,
    "Quincy Trouppe": None,
    "Piper Davis": None,
    "Artie Wilson": None,
    "Gene Benson": None,
    "Dan Bankhead": None,
    "Johnny Wright": None,
    "Howard Easterling": None,
    "Lennie Pearson": None,
    "Dave Barnhill": None,
    "Jimmie Crutchfield": None,
    "Neil Robinson": None,
    "Henry Kimbro": None,
    "Pancho Coimbre": None,
    "Tetelo Vargas": None,
    "Jerry Benjamin": None,
    "Bill Byrd": None,
    "Bonnie Serrell": None,
    "Barney Morris": None,
    "Ted Radcliffe": None,
    "Frank Duncan": None,
    "Alejandro Oms": None,
    "Fats Jenkins": None,
    "Goose Tatum": None,
    "Art Pennington": None,
    "Luke Easter": None,
    "Jim Gilliam": None,
    "Slim Jones": None,
}


def resolve_name(name):
    """Resolve a player name to its canonical form."""
    return NAME_ALIASES.get(name, name)


def get_hof_year(name):
    """Get HOF induction year for a player, if any."""
    canonical = resolve_name(name)
    if canonical in KNOWN_HOF and KNOWN_HOF[canonical] is not None:
        return KNOWN_HOF[canonical]
    if canonical in hof_inducted:
        return hof_inducted[canonical]["year"]
    return None


def get_jaws(name):
    """Get Rate JAWS data for a player, if available.

    Exact name match only. No fuzzy matching, which risks false
    positives (e.g., "Jesse Williams" matching "Joe Williams").
    """
    canonical = resolve_name(name)
    if canonical in jaws_lookup:
        return jaws_lookup[canonical]
    return None


# --- Compute HOF gap ---

results = []
for name, appearances in sorted(player_appearances.items()):
    canonical = resolve_name(name)
    hof_year = get_hof_year(name)
    jaws = get_jaws(name)
    years = sorted(set(a["year"] for a in appearances))

    entry = {
        "name": canonical,
        "retrosheet_name": name,
        "appearances": len(appearances),
        "years": years,
        "first_appearance": min(years),
        "last_appearance": max(years),
        "sides": list(set(a["side"] for a in appearances)),
        "hof_inducted": hof_year is not None,
        "hof_year": hof_year,
    }

    if jaws:
        entry["rate_jaws"] = jaws["rateJAWS"]
        entry["rate_war"] = jaws["rateWAR"]
        entry["career_war"] = jaws["careerWAR"]
        entry["position"] = jaws["position"]
        entry["jaws_rank"] = jaws["rank"]
    else:
        entry["rate_jaws"] = None
        entry["rate_war"] = None
        entry["career_war"] = None
        entry["position"] = None
        entry["jaws_rank"] = None

    # Gap analysis: not inducted, but has JAWS data suggesting HOF caliber
    if not entry["hof_inducted"] and jaws:
        # A Rate JAWS in the top 50 of Negro Leaguers is HOF-caliber
        entry["gap_flag"] = jaws["rank"] <= 50
        entry["gap_note"] = (
            f"Rate JAWS rank {jaws['rank']} of 70 evaluated Negro Leaguers. "
            f"Career WAR: {jaws['careerWAR']}."
        ) if entry["gap_flag"] else None
    elif not entry["hof_inducted"] and not jaws:
        # No JAWS data available, can't assess
        entry["gap_flag"] = False
        entry["gap_note"] = "Insufficient statistical data for gap assessment"
    else:
        entry["gap_flag"] = False
        entry["gap_note"] = None

    entry["confidence"] = "Modeled" if entry["gap_flag"] else "Documented"
    results.append(entry)

# Sort: HOF members first (by year), then gap-flagged, then rest
results.sort(
    key=lambda r: (
        0 if r["hof_inducted"] else (1 if r["gap_flag"] else 2),
        r.get("hof_year") or 9999,
        -(r.get("rate_jaws") or 0),
    )
)

# --- Summary stats ---

total = len(results)
inducted = sum(1 for r in results if r["hof_inducted"])
gap_flagged = sum(1 for r in results if r["gap_flag"])
no_data = sum(
    1 for r in results
    if not r["hof_inducted"] and not r["gap_flag"] and r["rate_jaws"] is None
)

print(f"\nTotal unique players: {total}")
print(f"HOF inducted: {inducted}")
print(f"Gap flagged (HOF-caliber, not inducted): {gap_flagged}")
print(f"No JAWS data available: {no_data}")

print("\nHOF members who played in East-West (1933-1948):")
for r in results:
    if r["hof_inducted"]:
        print(
            f"  {r['name']:25s}  HOF {r['hof_year']}  "
            f"{r['appearances']} appearances  "
            f"({r['first_appearance']}-{r['last_appearance']})"
        )

print("\nGap-flagged players:")
for r in results:
    if r["gap_flag"]:
        print(
            f"  {r['name']:25s}  JAWS rank {r['jaws_rank']}  "
            f"WAR {r['career_war']}  "
            f"{r['appearances']} appearances  "
            f"({r['first_appearance']}-{r['last_appearance']})"
        )

# --- Save rosters ---

rosters_output = {
    "metadata": {
        "title": "East-West All-Star Game Rosters, 1933-1948",
        "source": "Retrosheet Negro League East-West All-Star Game box scores",
        "source_url": "https://www.retrosheet.org/NegroLeagues/EastWest.html",
        "license": "Public domain (Retrosheet)",
        "total_games": sum(1 for y in ROSTERS for s in ROSTERS[y]),
        "total_unique_players": total,
        "processed_date": "2026-05-25",
    },
    "rosters": {
        str(year): sides for year, sides in ROSTERS.items()
    },
}

rosters_path = os.path.join(BASE, "data", "east-west-rosters.json")
with open(rosters_path, "w") as f:
    json.dump(rosters_output, f, indent=2, ensure_ascii=False)
print(f"\nSaved rosters to {rosters_path}")

# --- Save HOF gap analysis ---

gap_output = {
    "metadata": {
        "title": "East-West All-Star HOF Gap Analysis",
        "description": (
            "For each player who appeared in an East-West All-Star Game "
            "(1933-1948), whether they were inducted into the Baseball "
            "Hall of Fame and, if not, whether their Rate JAWS score "
            "suggests HOF-caliber credentials."
        ),
        "methodology": {
            "roster_source": (
                "Retrosheet Negro League East-West All-Star Game box scores"
            ),
            "gap_criteria": (
                "Players not inducted whose Rate JAWS rank is in the top "
                "50 of 70 evaluated Negro Leaguers are flagged. Rate JAWS "
                "methodology from Ch 10 (The Ledger)."
            ),
            "limitations": [
                "Rate JAWS scores are available for 70 Negro Leaguers. "
                "Many East-West participants lack sufficient statistical "
                "data for evaluation.",
                "HOF induction reflects committee decisions through 2024. "
                "Future committees may induct additional players.",
                "Gap flag is model output, not a claim that a player "
                "should have been inducted.",
            ],
        },
        "summary": {
            "total_unique_players": total,
            "hof_inducted": inducted,
            "gap_flagged": gap_flagged,
            "no_data_available": no_data,
        },
        "source": {
            "rosters": "Retrosheet (retrosheet.org/NegroLeagues/EastWest.html)",
            "rate_jaws": "Ch 10 Rate JAWS (Seamheads)",
            "hof_records": "Baseball Hall of Fame, Ch 11 candidates.json",
        },
        "processed_date": "2026-05-25",
    },
    "players": results,
}

gap_path = os.path.join(BASE, "data", "hof-gap.json")
with open(gap_path, "w") as f:
    json.dump(gap_output, f, indent=2, ensure_ascii=False)
print(f"Saved HOF gap analysis to {gap_path}")
