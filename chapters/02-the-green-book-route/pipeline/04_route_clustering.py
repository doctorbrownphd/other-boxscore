"""
04_route_clustering.py -- M1: Cluster recurring road trip circuits.

Phase 4 of the Green Book Route pipeline.

Input:  data/schedule_1936_1948.json (geocoded)

Output: data/route_clusters.json
        Labeled route clusters per team with safety profiles.

Method: HDBSCAN unsupervised clustering over game-to-game travel
        vectors. Surfaces structural patterns in the schedule.

Gate:   Oscar reviews clusters for historical plausibility.
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
    log.info("Route clustering (M1) -- Phase 4")

    # TODO Phase 4 implementation:
    # 1. Load geocoded schedule data
    # 2. For each team-season, construct travel vectors:
    #    (origin_lat, origin_lon, dest_lat, dest_lon, distance, days_between)
    # 3. Run HDBSCAN with documented hyperparameters
    # 4. Label clusters (e.g., "Eastern corridor", "Southern swing")
    # 5. For each cluster, compute aggregate safety profile
    # 6. Output labeled clusters with safety scores

    log.warning("Pipeline stub -- requires geocoded data from Steps 1-3.")


if __name__ == "__main__":
    main()
