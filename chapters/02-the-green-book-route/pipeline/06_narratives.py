"""
06_narratives.py -- M3: Generate road trip narratives via Claude API.

Phase 5 of the Green Book Route pipeline.

Input:  data/safety_scores.json
        data/route_clusters.json
        data/schedule_1936_1948.json

Output: data/narratives.json
        One narrative per team-season. Each narrative is labeled
        as AI-generated with a confidence level.

Method: Claude API with structured prompts committed to
        pipeline/prompts/narrative_template.md.

Gate:   Oscar reviews sample narratives for accuracy and voice.
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
PROMPT_DIR = Path(__file__).resolve().parent / "prompts"


def main() -> None:
    log.info("Narrative generation (M3) -- Phase 5")

    # TODO Phase 5 implementation:
    # 1. Load safety scores and route data
    # 2. For each team-season, assemble context:
    #    a. Chronological game list with cities and safety scores
    #    b. Dark cities (zero listings) highlighted
    #    c. Route cluster label
    #    d. Any documented historical accounts from the period
    # 3. Send to Claude API with the prompt template
    # 4. Parse response, extract narrative + confidence level
    # 5. Human review flag: all narratives require Oscar approval
    # 6. Output with metadata: model version, prompt hash, confidence

    log.warning("Pipeline stub -- requires safety scores from Step 5.")


if __name__ == "__main__":
    main()
