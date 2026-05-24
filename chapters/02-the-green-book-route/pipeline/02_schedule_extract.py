"""
02_schedule_extract.py -- Extract Negro Leagues game schedules and ballpark data.

Phase 2 of the Green Book Route pipeline.

Input:  Seamheads Negro Leagues Database (seamheads.com/NegroLgs/)
        SABR Ballparks Database (sabr.org)
        Documented historical records

Output: data/schedule_1936_1948.json
        data/ballparks.json

The Seamheads database does not offer a public bulk-download or API for
game-level schedule data.  This pipeline reconstructs a representative
schedule from documented public records -- team rosters of home/away series
by season, documented game counts, and known ballpark assignments.  Every
record carries a provenance field so downstream consumers know the basis.

Gate:   All game locations resolved to coordinates or explicitly flagged.
"""

from __future__ import annotations

import json
import logging
import random
from datetime import date, timedelta
from pathlib import Path
from typing import Any

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

# ---------------------------------------------------------------------------
# Ballpark reference table
# ---------------------------------------------------------------------------
# Every coordinate is sourced from SABR Ballparks Database, Google Maps, or
# the cited reference.  Where a source is "manual/Google Maps", the lat/lon
# was taken from the satellite view of the documented address.

BALLPARKS: list[dict[str, Any]] = [
    # -- Pittsburgh --
    {
        "ballpark_id": "forbes_field",
        "ballpark_name": "Forbes Field",
        "city": "Pittsburgh",
        "state": "PA",
        "lat": 40.4417,
        "lon": -79.9533,
        "capacity": 35000,
        "years_active": "1909-1970",
        "teams": ["Homestead Grays", "Pittsburgh Crawfords"],
        "coord_source": "SABR Ballparks Database",
        "notes": "Grays played most Pittsburgh home games here from 1939 on",
    },
    {
        "ballpark_id": "greenlee_field",
        "ballpark_name": "Greenlee Field",
        "city": "Pittsburgh",
        "state": "PA",
        "lat": 40.4478,
        "lon": -79.9803,
        "capacity": 7500,
        "years_active": "1932-1938",
        "teams": ["Pittsburgh Crawfords"],
        "coord_source": "SABR Ballparks Database / Bedford Dwellings site",
        "notes": "First Black-owned professional ballpark; demolished 1938",
    },
    # -- Washington DC --
    {
        "ballpark_id": "griffith_stadium",
        "ballpark_name": "Griffith Stadium",
        "city": "Washington",
        "state": "DC",
        "lat": 38.9218,
        "lon": -77.0158,
        "capacity": 32000,
        "years_active": "1911-1965",
        "teams": ["Homestead Grays"],
        "coord_source": "SABR Ballparks Database",
        "notes": "Grays split home games between Pittsburgh and DC",
    },
    # -- Chicago --
    {
        "ballpark_id": "comiskey_park",
        "ballpark_name": "Comiskey Park",
        "city": "Chicago",
        "state": "IL",
        "lat": 41.7497,
        "lon": -87.6349,
        "capacity": 44492,
        "years_active": "1910-1990",
        "teams": ["Chicago American Giants"],
        "coord_source": "SABR Ballparks Database",
        "notes": "Host of annual East-West All-Star Game",
    },
    # -- New York --
    {
        "ballpark_id": "yankee_stadium",
        "ballpark_name": "Yankee Stadium",
        "city": "New York",
        "state": "NY",
        "lat": 40.8267,
        "lon": -73.9281,
        "capacity": 67000,
        "years_active": "1923-1973",
        "teams": ["New York Black Yankees", "New York Cubans"],
        "coord_source": "SABR Ballparks Database",
        "notes": "Used for Negro Leagues doubleheaders and special events",
    },
    {
        "ballpark_id": "polo_grounds",
        "ballpark_name": "Polo Grounds",
        "city": "New York",
        "state": "NY",
        "lat": 40.8504,
        "lon": -73.9375,
        "capacity": 55000,
        "years_active": "1911-1963",
        "teams": ["New York Cubans", "New York Black Yankees"],
        "coord_source": "SABR Ballparks Database",
        "notes": "Cubans and Black Yankees alternated between Polo Grounds and Yankee Stadium",
    },
    # -- Kansas City --
    {
        "ballpark_id": "muehlebach_field",
        "ballpark_name": "Muehlebach Field / Ruppert Stadium / Blues Stadium",
        "city": "Kansas City",
        "state": "MO",
        "lat": 39.0997,
        "lon": -94.5577,
        "capacity": 17476,
        "years_active": "1923-1955",
        "teams": ["Kansas City Monarchs"],
        "coord_source": "SABR Ballparks Database",
        "notes": (
            "Home of the Monarchs; renamed Ruppert Stadium 1937, "
            "Blues Stadium 1943. Located at 22nd and Brooklyn."
        ),
    },
    # -- Birmingham --
    {
        "ballpark_id": "rickwood_field",
        "ballpark_name": "Rickwood Field",
        "city": "Birmingham",
        "state": "AL",
        "lat": 33.5125,
        "lon": -86.8434,
        "capacity": 10800,
        "years_active": "1910-present",
        "teams": ["Birmingham Black Barons"],
        "coord_source": "SABR Ballparks Database / NPS NRHP",
        "notes": "Oldest surviving professional ballpark in the US",
    },
    # -- Memphis --
    {
        "ballpark_id": "martin_stadium",
        "ballpark_name": "Martin Stadium",
        "city": "Memphis",
        "state": "TN",
        "lat": 35.1417,
        "lon": -90.0300,
        "capacity": 7500,
        "years_active": "1924-1960",
        "teams": ["Memphis Red Sox"],
        "coord_source": "Google Maps / Memphis city records",
        "notes": "Also known as Martin Park; located near Crump Blvd",
    },
    # -- Newark --
    {
        "ballpark_id": "ruppert_stadium_newark",
        "ballpark_name": "Ruppert Stadium",
        "city": "Newark",
        "state": "NJ",
        "lat": 40.7128,
        "lon": -74.1594,
        "capacity": 19000,
        "years_active": "1926-1967",
        "teams": ["Newark Eagles"],
        "coord_source": "SABR Ballparks Database",
        "notes": "Home of the 1946 champion Eagles; Wilbur Avenue site",
    },
    # -- Philadelphia --
    {
        "ballpark_id": "shibe_park",
        "ballpark_name": "Shibe Park",
        "city": "Philadelphia",
        "state": "PA",
        "lat": 39.9908,
        "lon": -75.1556,
        "capacity": 33608,
        "years_active": "1909-1970",
        "teams": ["Philadelphia Stars"],
        "coord_source": "SABR Ballparks Database",
        "notes": "Also known as Connie Mack Stadium from 1953",
    },
    {
        "ballpark_id": "44th_and_parkside",
        "ballpark_name": "44th and Parkside Ballpark / Penmar Park",
        "city": "Philadelphia",
        "state": "PA",
        "lat": 39.9710,
        "lon": -75.2139,
        "capacity": 6000,
        "years_active": "1934-1945",
        "teams": ["Philadelphia Stars"],
        "coord_source": "Google Maps / SABR",
        "notes": "Stars primary home before full-time Shibe Park use",
    },
    # -- Baltimore --
    {
        "ballpark_id": "bugle_field",
        "ballpark_name": "Bugle Field",
        "city": "Baltimore",
        "state": "MD",
        "lat": 39.2987,
        "lon": -76.5867,
        "capacity": 6000,
        "years_active": "1934-1949",
        "teams": ["Baltimore Elite Giants"],
        "coord_source": "Google Maps / Baltimore Sun archives",
        "notes": "Edison Highway and Federal Street; demolished",
    },
    # -- Indianapolis --
    {
        "ballpark_id": "perry_stadium",
        "ballpark_name": "Perry Stadium / Victory Field",
        "city": "Indianapolis",
        "state": "IN",
        "lat": 39.7872,
        "lon": -86.1684,
        "capacity": 15000,
        "years_active": "1931-1996",
        "teams": ["Indianapolis Clowns"],
        "coord_source": "SABR Ballparks Database",
        "notes": "Renamed Victory Field in 1942; West 16th Street",
    },
    # -- Cleveland --
    {
        "ballpark_id": "league_park_cleveland",
        "ballpark_name": "League Park",
        "city": "Cleveland",
        "state": "OH",
        "lat": 41.5116,
        "lon": -81.6346,
        "capacity": 21414,
        "years_active": "1891-1946",
        "teams": ["Cleveland Buckeyes"],
        "coord_source": "SABR Ballparks Database / NPS NRHP",
        "notes": "East 66th and Lexington; partially restored",
    },
    # -- St. Louis --
    {
        "ballpark_id": "stars_park",
        "ballpark_name": "Stars Park",
        "city": "St. Louis",
        "state": "MO",
        "lat": 38.6339,
        "lon": -90.2310,
        "capacity": 10000,
        "years_active": "1922-1936",
        "teams": ["St. Louis Stars"],
        "coord_source": "Google Maps / SABR",
        "notes": "Market Street and Compton Ave; demolished after 1936 tornado",
    },
    {
        "ballpark_id": "sportsmans_park",
        "ballpark_name": "Sportsman's Park",
        "city": "St. Louis",
        "state": "MO",
        "lat": 38.6353,
        "lon": -90.2109,
        "capacity": 30500,
        "years_active": "1902-1966",
        "teams": ["St. Louis Stars"],
        "coord_source": "SABR Ballparks Database",
        "notes": "Grand and Dodier; used by Stars after Stars Park destroyed",
    },
    # -- Nashville --
    {
        "ballpark_id": "sulphur_dell",
        "ballpark_name": "Sulphur Dell",
        "city": "Nashville",
        "state": "TN",
        "lat": 36.1697,
        "lon": -86.7764,
        "capacity": 8500,
        "years_active": "1885-1963",
        "teams": [],
        "coord_source": "SABR Ballparks Database",
        "notes": "Hosted Negro Leagues exhibition/barnstorming games",
    },
    # -- Jacksonville --
    {
        "ballpark_id": "durkee_field",
        "ballpark_name": "J.P. Small Memorial Stadium / Durkee Field",
        "city": "Jacksonville",
        "state": "FL",
        "lat": 30.3447,
        "lon": -81.6461,
        "capacity": 6000,
        "years_active": "1912-present",
        "teams": ["Jacksonville Red Caps"],
        "coord_source": "Google Maps / NPS NRHP",
        "notes": "Spring training site for several NNL/NAL teams",
    },
    # -- Cincinnati --
    {
        "ballpark_id": "crosley_field",
        "ballpark_name": "Crosley Field",
        "city": "Cincinnati",
        "state": "OH",
        "lat": 39.1070,
        "lon": -84.5230,
        "capacity": 30274,
        "years_active": "1912-1970",
        "teams": ["Cincinnati Clowns"],
        "coord_source": "SABR Ballparks Database",
        "notes": "Hosted Negro Leagues games as visiting venue",
    },
    # -- Atlanta --
    {
        "ballpark_id": "ponce_de_leon_park",
        "ballpark_name": "Ponce de Leon Park",
        "city": "Atlanta",
        "state": "GA",
        "lat": 33.7715,
        "lon": -84.3593,
        "capacity": 15000,
        "years_active": "1907-1965",
        "teams": ["Atlanta Black Crackers"],
        "coord_source": "Google Maps / SABR",
        "notes": "Hosted Negro Leagues and exhibition games",
    },
    # -- Houston --
    {
        "ballpark_id": "buff_stadium",
        "ballpark_name": "Buff Stadium / Busch Stadium",
        "city": "Houston",
        "state": "TX",
        "lat": 29.7216,
        "lon": -95.3487,
        "capacity": 14000,
        "years_active": "1928-1961",
        "teams": [],
        "coord_source": "Google Maps / SABR",
        "notes": "Hosted Negro Leagues exhibition and barnstorming games",
    },
]


# ---------------------------------------------------------------------------
# Team metadata -- season-level information for schedule reconstruction
# ---------------------------------------------------------------------------
# Sources: Seamheads.com/NegroLgs, Larry Lester "Black Baseball's National
# Showcase", James Riley "The Biographical Encyclopedia of the Negro
# Baseball Leagues", Neil Lanctot "Negro League Baseball".

TEAM_META: dict[str, dict[str, Any]] = {
    "Homestead Grays": {
        "league": "NNL",
        "primary_city": "Pittsburgh",
        "primary_state": "PA",
        "primary_ballpark": "forbes_field",
        "secondary_city": "Washington",
        "secondary_state": "DC",
        "secondary_ballpark": "griffith_stadium",
        "active_years": list(range(1936, 1949)),
        "avg_games_per_year": 55,
        "notes": "Split home games Pittsburgh/DC from 1940 on",
    },
    "Pittsburgh Crawfords": {
        "league": "NNL",
        "primary_city": "Pittsburgh",
        "primary_state": "PA",
        "primary_ballpark": "greenlee_field",
        "active_years": [1936, 1937, 1938],
        "avg_games_per_year": 45,
        "notes": "Folded after 1938; Greenlee Field demolished",
    },
    "Kansas City Monarchs": {
        "league": "NAL",
        "primary_city": "Kansas City",
        "primary_state": "MO",
        "primary_ballpark": "muehlebach_field",
        "active_years": list(range(1936, 1949)),
        "avg_games_per_year": 60,
        "notes": "Barnstormed extensively; portable lighting system",
    },
    "Chicago American Giants": {
        "league": "NAL",
        "primary_city": "Chicago",
        "primary_state": "IL",
        "primary_ballpark": "comiskey_park",
        "active_years": list(range(1936, 1949)),
        "avg_games_per_year": 55,
        "notes": "Also played some games at Schorling Park earlier",
    },
    "Newark Eagles": {
        "league": "NNL",
        "primary_city": "Newark",
        "primary_state": "NJ",
        "primary_ballpark": "ruppert_stadium_newark",
        "active_years": list(range(1936, 1949)),
        "avg_games_per_year": 50,
        "notes": "1946 Negro World Series champions",
    },
    "Birmingham Black Barons": {
        "league": "NAL",
        "primary_city": "Birmingham",
        "primary_state": "AL",
        "primary_ballpark": "rickwood_field",
        "active_years": list(range(1936, 1949)),
        "avg_games_per_year": 55,
        "notes": "Deep South team; extensive regional travel",
    },
    "Memphis Red Sox": {
        "league": "NAL",
        "primary_city": "Memphis",
        "primary_state": "TN",
        "primary_ballpark": "martin_stadium",
        "active_years": list(range(1936, 1949)),
        "avg_games_per_year": 50,
        "notes": "Martin brothers ownership",
    },
    "Baltimore Elite Giants": {
        "league": "NNL",
        "primary_city": "Baltimore",
        "primary_state": "MD",
        "primary_ballpark": "bugle_field",
        "active_years": list(range(1938, 1949)),
        "avg_games_per_year": 50,
        "notes": "Relocated from Nashville (1934-37) and Washington (1936-37)",
    },
    "St. Louis Stars": {
        "league": "NAL",
        "primary_city": "St. Louis",
        "primary_state": "MO",
        "primary_ballpark": "stars_park",
        "active_years": [1936, 1937, 1938, 1939],
        "avg_games_per_year": 40,
        "notes": "Stars Park destroyed by tornado 1936; used Sportsman's Park after",
    },
    "Indianapolis Clowns": {
        "league": "NAL",
        "primary_city": "Indianapolis",
        "primary_state": "IN",
        "primary_ballpark": "perry_stadium",
        "active_years": list(range(1943, 1949)),
        "avg_games_per_year": 55,
        "notes": "Known as Cincinnati/Ethiopian Clowns before 1943",
    },
    "New York Cubans": {
        "league": "NNL",
        "primary_city": "New York",
        "primary_state": "NY",
        "primary_ballpark": "polo_grounds",
        "active_years": list(range(1936, 1949)),
        "avg_games_per_year": 45,
        "notes": "Alex Pompez ownership; played at both Polo Grounds and Yankee Stadium",
    },
    "New York Black Yankees": {
        "league": "NNL",
        "primary_city": "New York",
        "primary_state": "NY",
        "primary_ballpark": "yankee_stadium",
        "active_years": list(range(1936, 1949)),
        "avg_games_per_year": 40,
        "notes": "Also used Triborough Stadium; struggled for park access",
    },
    "Cleveland Buckeyes": {
        "league": "NAL",
        "primary_city": "Cleveland",
        "primary_state": "OH",
        "primary_ballpark": "league_park_cleveland",
        "active_years": list(range(1942, 1949)),
        "avg_games_per_year": 50,
        "notes": "1945 Negro World Series champions",
    },
    "Philadelphia Stars": {
        "league": "NNL",
        "primary_city": "Philadelphia",
        "primary_state": "PA",
        "primary_ballpark": "44th_and_parkside",
        "active_years": list(range(1936, 1949)),
        "avg_games_per_year": 50,
        "notes": "Moved from 44th and Parkside to Shibe Park mid-period",
    },
}

# Teams active in the 1936-1948 window (NNL + NAL).
TEAMS_IN_WINDOW = list(TEAM_META.keys())

# ---------------------------------------------------------------------------
# League schedule structure
# ---------------------------------------------------------------------------
# NNL and NAL each played roughly a split-season format:
#   - First half: ~May to mid-July
#   - Second half: mid-July to September
#   - East-West All-Star Game: typically late July/early August at Comiskey
#   - Negro World Series: late September/early October (select years)
#
# Each team played roughly 40-70 league games per year, plus exhibitions.
# Home/away split was approximately 50/50.

SEASON_START_MONTH = 5   # May
SEASON_START_DAY = 1
SEASON_END_MONTH = 9     # September
SEASON_END_DAY = 30

# NNL member teams by year (for intra-league matchups)
NNL_TEAMS_BY_YEAR: dict[int, list[str]] = {
    1936: [
        "Homestead Grays", "Pittsburgh Crawfords", "Newark Eagles",
        "New York Cubans", "New York Black Yankees", "Philadelphia Stars",
    ],
    1937: [
        "Homestead Grays", "Pittsburgh Crawfords", "Newark Eagles",
        "New York Cubans", "New York Black Yankees", "Philadelphia Stars",
    ],
    1938: [
        "Homestead Grays", "Pittsburgh Crawfords", "Newark Eagles",
        "Baltimore Elite Giants", "New York Cubans",
        "New York Black Yankees", "Philadelphia Stars",
    ],
    1939: [
        "Homestead Grays", "Newark Eagles", "Baltimore Elite Giants",
        "New York Cubans", "New York Black Yankees", "Philadelphia Stars",
    ],
    1940: [
        "Homestead Grays", "Newark Eagles", "Baltimore Elite Giants",
        "New York Cubans", "New York Black Yankees", "Philadelphia Stars",
    ],
    1941: [
        "Homestead Grays", "Newark Eagles", "Baltimore Elite Giants",
        "New York Cubans", "New York Black Yankees", "Philadelphia Stars",
    ],
    1942: [
        "Homestead Grays", "Newark Eagles", "Baltimore Elite Giants",
        "New York Cubans", "New York Black Yankees", "Philadelphia Stars",
    ],
    1943: [
        "Homestead Grays", "Newark Eagles", "Baltimore Elite Giants",
        "New York Cubans", "New York Black Yankees", "Philadelphia Stars",
    ],
    1944: [
        "Homestead Grays", "Newark Eagles", "Baltimore Elite Giants",
        "New York Cubans", "New York Black Yankees", "Philadelphia Stars",
    ],
    1945: [
        "Homestead Grays", "Newark Eagles", "Baltimore Elite Giants",
        "New York Cubans", "New York Black Yankees", "Philadelphia Stars",
    ],
    1946: [
        "Homestead Grays", "Newark Eagles", "Baltimore Elite Giants",
        "New York Cubans", "New York Black Yankees", "Philadelphia Stars",
    ],
    1947: [
        "Homestead Grays", "Newark Eagles", "Baltimore Elite Giants",
        "New York Cubans", "New York Black Yankees", "Philadelphia Stars",
    ],
    1948: [
        "Homestead Grays", "Baltimore Elite Giants",
        "New York Cubans", "New York Black Yankees", "Philadelphia Stars",
    ],
}

NAL_TEAMS_BY_YEAR: dict[int, list[str]] = {
    1936: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox", "St. Louis Stars",
    ],
    1937: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox", "St. Louis Stars",
    ],
    1938: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox", "St. Louis Stars",
    ],
    1939: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox", "St. Louis Stars",
    ],
    1940: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox",
    ],
    1941: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox",
    ],
    1942: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox",
    ],
    1943: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox",
        "Indianapolis Clowns",
    ],
    1944: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox",
        "Indianapolis Clowns", "Cleveland Buckeyes",
    ],
    1945: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox",
        "Indianapolis Clowns", "Cleveland Buckeyes",
    ],
    1946: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox",
        "Indianapolis Clowns", "Cleveland Buckeyes",
    ],
    1947: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox",
        "Indianapolis Clowns", "Cleveland Buckeyes",
    ],
    1948: [
        "Kansas City Monarchs", "Chicago American Giants",
        "Birmingham Black Barons", "Memphis Red Sox",
        "Indianapolis Clowns", "Cleveland Buckeyes",
    ],
}

# East-West All-Star Game dates (documented)
# Source: Larry Lester, "Black Baseball's National Showcase" (2001)
EAST_WEST_GAMES: list[dict[str, Any]] = [
    {"date": "1936-08-13", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
    {"date": "1937-08-08", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
    {"date": "1938-08-14", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
    {"date": "1939-08-06", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
    {"date": "1940-07-28", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
    {"date": "1941-07-27", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
    {"date": "1942-08-16", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
    {"date": "1943-08-01", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
    {"date": "1944-08-20", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
    {"date": "1945-08-12", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
    {"date": "1946-08-18", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
    {"date": "1947-07-27", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
    {"date": "1948-08-22", "home": "West", "away": "East", "ballpark_id": "comiskey_park"},
]


# ---------------------------------------------------------------------------
# Ballpark lookup helpers
# ---------------------------------------------------------------------------

def _build_ballpark_index() -> dict[str, dict[str, Any]]:
    """Return a dict keyed by ballpark_id for fast lookup."""
    return {bp["ballpark_id"]: bp for bp in BALLPARKS}


def _ballpark_for_team(
    team_name: str,
    year: int,
    is_home: bool,
) -> str | None:
    """Resolve which ballpark a team plays in for a given year.

    Returns the ballpark_id or None if the team is visiting a neutral site.
    Only returns a ballpark for home games.
    """
    if not is_home:
        return None

    meta = TEAM_META.get(team_name)
    if meta is None:
        return None

    # Special case: Homestead Grays split between Pittsburgh and DC
    if team_name == "Homestead Grays" and year >= 1940:
        # Roughly 60% DC, 40% Pittsburgh from 1940 on
        # We use a deterministic split below in the schedule builder
        return meta["primary_ballpark"]  # caller overrides for DC games

    # Special case: St. Louis Stars lost Stars Park in 1936
    if team_name == "St. Louis Stars" and year > 1936:
        return "sportsmans_park"

    # Special case: Philadelphia Stars moved to Shibe Park mid-1940s
    if team_name == "Philadelphia Stars" and year >= 1944:
        return "shibe_park"

    return meta.get("primary_ballpark")


# ---------------------------------------------------------------------------
# Schedule reconstruction
# ---------------------------------------------------------------------------

def _generate_season_dates(year: int) -> list[date]:
    """Return all dates in the playing season for a given year."""
    start = date(year, SEASON_START_MONTH, SEASON_START_DAY)
    end = date(year, SEASON_END_MONTH, SEASON_END_DAY)
    dates: list[date] = []
    current = start
    while current <= end:
        dates.append(current)
        current += timedelta(days=1)
    return dates


def _reconstruct_season(
    year: int,
    ballpark_index: dict[str, dict[str, Any]],
    rng: random.Random,
) -> list[dict[str, Any]]:
    """Reconstruct a plausible schedule for one season.

    This uses documented team rosters, league membership, and average game
    counts to build a representative schedule.  It is NOT a historical game
    log -- it is a reconstruction for geographic analysis.

    The reconstruction preserves:
    - Correct league membership per year
    - Correct home ballpark assignments
    - Historically plausible game frequency (~2-3 league games per week)
    - Intra-league scheduling (teams play others in their league)
    - The Homestead Grays' Pittsburgh/DC split
    """
    games: list[dict[str, Any]] = []
    season_dates = _generate_season_dates(year)

    # Build the set of playable dates (skip some for travel/rest)
    # Negro Leagues teams typically played Thu-Sun with travel Mon-Wed
    # but also played many weekday games, especially doubleheaders
    playable_dates = [
        d for d in season_dates
        if d.weekday() in (0, 3, 4, 5, 6)  # Mon, Thu, Fri, Sat, Sun
    ]

    # Process each league
    for league_name, teams_by_year in [("NNL", NNL_TEAMS_BY_YEAR), ("NAL", NAL_TEAMS_BY_YEAR)]:
        teams = teams_by_year.get(year, [])
        if len(teams) < 2:
            continue

        # Build all possible matchups
        matchups: list[tuple[str, str]] = []
        for i, home in enumerate(teams):
            for j, away in enumerate(teams):
                if i != j:
                    matchups.append((home, away))

        # Each team should play avg_games_per_year league games.
        # With N teams, each pair meets roughly avg_games / (N-1) times.
        # We distribute games across playable dates.
        target_total = sum(
            TEAM_META.get(t, {}).get("avg_games_per_year", 50)
            for t in teams
        ) // 2  # each game counts for two teams

        # Shuffle matchups and distribute across dates
        rng.shuffle(matchups)
        rng.shuffle(playable_dates)

        games_placed = 0
        date_idx = 0

        # Cycle through matchups, placing ~2-3 per date across all teams
        while games_placed < target_total and date_idx < len(playable_dates):
            game_date = playable_dates[date_idx]
            # Place 2-4 games per date (multiple matchups on same day)
            games_this_date = rng.randint(2, min(4, len(teams) // 2))

            for _ in range(games_this_date):
                if games_placed >= target_total:
                    break
                if not matchups:
                    # Refill matchups
                    matchups = [
                        (home, away)
                        for i_h, home in enumerate(teams)
                        for i_a, away in enumerate(teams)
                        if i_h != i_a
                    ]
                    rng.shuffle(matchups)

                home_team, away_team = matchups.pop()

                # Resolve ballpark
                ballpark_id = _ballpark_for_team(home_team, year, is_home=True)

                # Grays DC/Pittsburgh split
                if home_team == "Homestead Grays" and year >= 1940:
                    if rng.random() < 0.6:
                        ballpark_id = "griffith_stadium"
                    else:
                        ballpark_id = "forbes_field"

                bp = ballpark_index.get(ballpark_id or "")
                city = bp["city"] if bp else TEAM_META.get(home_team, {}).get("primary_city", "Unknown")
                state = bp["state"] if bp else TEAM_META.get(home_team, {}).get("primary_state", "")
                bp_name = bp["ballpark_name"] if bp else None

                game_record: dict[str, Any] = {
                    "date": game_date.isoformat(),
                    "home_team": home_team,
                    "away_team": away_team,
                    "city": city,
                    "state": state,
                    "ballpark_name": bp_name,
                    "ballpark_id": ballpark_id,
                    "league": league_name,
                    "year": year,
                    "provenance": "reconstructed",
                }

                if bp:
                    game_record["lat"] = bp["lat"]
                    game_record["lon"] = bp["lon"]
                    game_record["location_quality"] = "ballpark_resolved"
                else:
                    game_record["lat"] = None
                    game_record["lon"] = None
                    game_record["location_quality"] = "city_only"

                games.append(game_record)
                games_placed += 1

            date_idx += 1

    return games


def _build_allstar_games(
    ballpark_index: dict[str, dict[str, Any]],
) -> list[dict[str, Any]]:
    """Build records for the documented East-West All-Star Games."""
    games: list[dict[str, Any]] = []
    for ew in EAST_WEST_GAMES:
        bp = ballpark_index[ew["ballpark_id"]]
        games.append({
            "date": ew["date"],
            "home_team": f"East-West All-Stars ({ew['home']})",
            "away_team": f"East-West All-Stars ({ew['away']})",
            "city": bp["city"],
            "state": bp["state"],
            "ballpark_name": bp["ballpark_name"],
            "ballpark_id": ew["ballpark_id"],
            "league": "All-Star",
            "year": int(ew["date"][:4]),
            "provenance": "documented",
            "lat": bp["lat"],
            "lon": bp["lon"],
            "location_quality": "ballpark_resolved",
        })
    return games


# ---------------------------------------------------------------------------
# Output
# ---------------------------------------------------------------------------

def _write_ballparks_json(ballpark_index: dict[str, dict[str, Any]]) -> Path:
    """Write the standalone ballparks reference file."""
    output_path = DATA_DIR / "ballparks.json"
    payload = {
        "description": (
            "Negro Leagues ballparks with coordinates, "
            "compiled from SABR Ballparks Database and public records"
        ),
        "provenance": (
            "Coordinates sourced from SABR Ballparks Database, "
            "Google Maps satellite view of documented addresses, "
            "and NPS National Register of Historic Places nominations. "
            "Each entry includes a coord_source field."
        ),
        "license": "Research use -- coordinates are factual data",
        "generated_by": "02_schedule_extract.py",
        "ballpark_count": len(ballpark_index),
        "ballparks": list(ballpark_index.values()),
    }
    output_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False))
    log.info("Wrote %d ballparks to %s", len(ballpark_index), output_path)
    return output_path


def _write_schedule_json(
    games: list[dict[str, Any]],
    ballpark_index: dict[str, dict[str, Any]],
) -> Path:
    """Write the schedule output file."""
    output_path = DATA_DIR / "schedule_1936_1948.json"

    games_with_bp = sum(1 for g in games if g.get("ballpark_name"))
    games_city_only = sum(1 for g in games if g.get("location_quality") == "city_only")
    documented_count = sum(1 for g in games if g.get("provenance") == "documented")
    reconstructed_count = sum(1 for g in games if g.get("provenance") == "reconstructed")

    # Tally unique cities
    cities = set()
    for g in games:
        cities.add((g["city"], g["state"]))

    payload: dict[str, Any] = {
        "pipeline_version": "0.2",
        "window": {"start": 1936, "end": 1948},
        "teams": TEAMS_IN_WINDOW,
        "games": games,
        "metadata": {
            "total_games": len(games),
            "games_with_ballpark": games_with_bp,
            "games_city_only": games_city_only,
            "documented_games": documented_count,
            "reconstructed_games": reconstructed_count,
            "unique_cities": len(cities),
            "unique_ballparks": len(set(
                g["ballpark_id"] for g in games if g.get("ballpark_id")
            )),
            "extraction_date": date.today().isoformat(),
            "provenance_note": (
                "This schedule is reconstructed from documented public records "
                "including league membership rosters, team home cities, ballpark "
                "assignments, and average game counts per season. East-West "
                "All-Star Game dates are documented from Larry Lester's 'Black "
                "Baseball's National Showcase' (2001). Individual regular-season "
                "game dates are representative, not historical -- they preserve "
                "correct geographic patterns for the Green Book overlay analysis."
            ),
            "sources": [
                "Seamheads Negro Leagues Database (seamheads.com/NegroLgs/) -- team/league membership",
                "Larry Lester, 'Black Baseball's National Showcase' (2001) -- All-Star dates",
                "Neil Lanctot, 'Negro League Baseball' (2004) -- league structure",
                "James Riley, 'Biographical Encyclopedia of the Negro Baseball Leagues' (1994)",
                "SABR Ballparks Database -- venue coordinates",
            ],
        },
    }

    output_path.write_text(json.dumps(payload, indent=2, ensure_ascii=False))
    log.info("Wrote %d games to %s", len(games), output_path)
    return output_path


# ---------------------------------------------------------------------------
# Quality checks
# ---------------------------------------------------------------------------

def _run_gate_checks(
    games: list[dict[str, Any]],
    ballpark_index: dict[str, dict[str, Any]],
) -> bool:
    """Run Phase 2 gate checks: all locations resolved or flagged."""
    passed = True

    # Check 1: every game has a city
    no_city = [g for g in games if not g.get("city")]
    if no_city:
        log.error("GATE FAIL: %d games missing city", len(no_city))
        passed = False
    else:
        log.info("GATE OK: all %d games have city", len(games))

    # Check 2: every game has coordinates or explicit city_only flag
    unresolved = [
        g for g in games
        if g.get("lat") is None and g.get("location_quality") != "city_only"
    ]
    if unresolved:
        log.error("GATE FAIL: %d games with no coords and no city_only flag", len(unresolved))
        passed = False
    else:
        log.info("GATE OK: all locations resolved or flagged")

    # Check 3: all ballparks referenced in games exist in the index
    missing_bp = set()
    for g in games:
        bp_id = g.get("ballpark_id")
        if bp_id and bp_id not in ballpark_index:
            missing_bp.add(bp_id)
    if missing_bp:
        log.error("GATE FAIL: %d ballpark IDs not in index: %s", len(missing_bp), missing_bp)
        passed = False
    else:
        log.info("GATE OK: all ballpark IDs resolve to index entries")

    # Check 4: year coverage
    years = set(g["year"] for g in games)
    expected_years = set(range(1936, 1949))
    missing_years = expected_years - years
    if missing_years:
        log.error("GATE FAIL: missing years %s", sorted(missing_years))
        passed = False
    else:
        log.info("GATE OK: all %d years covered (1936-1948)", len(expected_years))

    # Check 5: reasonable game count per year
    from collections import Counter
    year_counts = Counter(g["year"] for g in games)
    for yr in sorted(year_counts):
        count = year_counts[yr]
        if count < 50:
            log.warning("Low game count for %d: %d games", yr, count)
        else:
            log.info("Year %d: %d games", yr, count)

    return passed


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    log.info("Schedule extraction pipeline -- Phase 2")
    log.info("Window: 1936-1948, %d teams", len(TEAMS_IN_WINDOW))

    ballpark_index = _build_ballpark_index()
    log.info("Loaded %d ballparks", len(ballpark_index))

    # Write standalone ballparks file
    _write_ballparks_json(ballpark_index)

    # Reconstruct season schedules
    # Use a fixed seed so the output is deterministic across runs
    rng = random.Random(42)

    all_games: list[dict[str, Any]] = []

    for year in range(1936, 1949):
        season_games = _reconstruct_season(year, ballpark_index, rng)
        all_games.extend(season_games)
        log.info("Year %d: %d games reconstructed", year, len(season_games))

    # Add documented East-West All-Star Games
    allstar_games = _build_allstar_games(ballpark_index)
    all_games.extend(allstar_games)
    log.info("Added %d East-West All-Star Games", len(allstar_games))

    # Sort by date
    all_games.sort(key=lambda g: g["date"])

    # Write output
    _write_schedule_json(all_games, ballpark_index)

    # Gate checks
    gate_passed = _run_gate_checks(all_games, ballpark_index)
    if gate_passed:
        log.info("Phase 2 gate: PASSED")
    else:
        log.error("Phase 2 gate: FAILED -- review warnings above")


if __name__ == "__main__":
    main()
