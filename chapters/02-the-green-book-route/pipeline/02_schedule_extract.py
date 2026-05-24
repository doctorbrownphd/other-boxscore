"""
02_schedule_extract.py -- Extract Negro Leagues game schedules from Seamheads.

Phase 2 of the Green Book Route pipeline.

Input:  Seamheads Negro Leagues Database
        https://www.seamheads.com/NescoDatabase/

Output: data/schedule_1936_1948.json
        One record per game: date, home_team, away_team, city, state,
        ballpark_name (where available).

Gate:   All game locations resolved to coordinates or explicitly flagged.
"""

from __future__ import annotations

import json
import logging
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

# Teams active in the 1936-1948 window (NNL + NAL).
# This is the overlap period between Green Book publication (1936+)
# and the last full NNL season (1948).
TEAMS_IN_WINDOW = [
    "Homestead Grays",
    "Pittsburgh Crawfords",
    "Kansas City Monarchs",
    "Chicago American Giants",
    "Newark Eagles",
    "Birmingham Black Barons",
    "Memphis Red Sox",
    "Baltimore Elite Giants",
    "St. Louis Stars",
    "Indianapolis Clowns",
    "New York Cubans",
    "New York Black Yankees",
    "Cleveland Buckeyes",
    "Philadelphia Stars",
]


def main() -> None:
    log.info("Schedule extraction pipeline -- Phase 2")
    log.info("Window: 1936-1948, %d teams", len(TEAMS_IN_WINDOW))

    # TODO Phase 2 implementation:
    # 1. Query Seamheads database for all games 1936-1948
    # 2. Extract: date, home_team, away_team, city, state, ballpark
    # 3. Cross-reference ballpark names with SABR Ballparks Database
    # 4. Flag games with city-only location (no specific ballpark)
    # 5. Output structured JSON

    log.warning(
        "Pipeline stub -- implementation pending. "
        "Requires Seamheads data access."
    )

    output = {
        "pipeline_version": "0.1",
        "window": {"start": 1936, "end": 1948},
        "teams": TEAMS_IN_WINDOW,
        "games": [],
        "metadata": {
            "total_games": 0,
            "games_with_ballpark": 0,
            "games_city_only": 0,
            "extraction_date": None,
        },
    }

    output_path = DATA_DIR / "schedule_1936_1948.json"
    output_path.write_text(json.dumps(output, indent=2))
    log.info("Wrote placeholder to %s", output_path)


if __name__ == "__main__":
    main()
