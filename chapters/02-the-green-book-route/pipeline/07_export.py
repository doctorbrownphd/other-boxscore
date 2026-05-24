"""
07_export.py -- Assemble all pipeline outputs into visualization-ready JSON.

Phase 6 of the Green Book Route pipeline.

Input:  All data/ outputs from Steps 1-6.

Output: data/viz_route_animation.json   (per team-season, for Fig 01)
        data/viz_league_map.json         (aggregate, for Fig 02)
        data/viz_heatmap.json            (regional summary, for Fig 03)
        data/meta.json                   (headline stats for the chapter)

Gate:   Vera reviews output format for visualization compatibility.
"""

from __future__ import annotations

import logging
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"


def main() -> None:
    log.info("Export pipeline -- Phase 6")

    # TODO Phase 6 implementation:
    # 1. Load all intermediate outputs
    # 2. Build viz_route_animation.json:
    #    One object per team-season with:
    #    - ordered stops: [{city, lat, lon, date, listings_1mi, safety_score}]
    #    - dark_cities: count of stops with zero listings
    #    - narrative: AI-generated text from Step 6
    # 3. Build viz_league_map.json:
    #    All cities that hosted games, with:
    #    - total games hosted, avg safety score, listing names by year
    # 4. Build viz_heatmap.json:
    #    Regional aggregation of safety scores by season
    # 5. Build meta.json:
    #    Headline statistics for the chapter header

    log.warning("Pipeline stub -- requires all upstream outputs.")


if __name__ == "__main__":
    main()
