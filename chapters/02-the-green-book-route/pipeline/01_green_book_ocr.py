"""
01_green_book_ocr.py -- Extract listings from LOC digitized Green Book editions.

Phase 1 of the Green Book Route pipeline.

Input:  Digitized page images from LOC Green Book collection
        https://www.loc.gov/collections/green-book/

Output: data/green_book_listings_raw.json
        One record per listing: business_name, address, city, state,
        category (hotel/restaurant/tavern/beauty_shop/etc), edition_year,
        page_number.

Method: Tesseract OCR with custom post-processing for period typography
        and address format normalization.

Gate:   OCR success rate documented before proceeding to Step 2.
"""

from __future__ import annotations

import json
import logging
import sys
from pathlib import Path

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

# LOC Green Book editions available for download (digitized, public domain).
# Each URL points to the collection page for a specific edition year.
# The actual page images must be downloaded separately.
GREEN_BOOK_EDITIONS = {
    1936: "https://www.loc.gov/item/2016298176/",
    1938: "https://www.loc.gov/item/2016298177/",
    1940: "https://www.loc.gov/item/2016298178/",
    1941: "https://www.loc.gov/item/2016298179/",
    1942: "https://www.loc.gov/item/2016298180/",
    1947: "https://www.loc.gov/item/2016298181/",
    1948: "https://www.loc.gov/item/2016298182/",
    1949: "https://www.loc.gov/item/2016298183/",
}


def main() -> None:
    log.info("Green Book OCR pipeline -- Phase 1")
    log.info("Target editions: %s", sorted(GREEN_BOOK_EDITIONS.keys()))

    # TODO Phase 1 implementation:
    # 1. Download page images from LOC for each edition year
    # 2. Run Tesseract OCR on each page
    # 3. Post-process OCR output:
    #    a. Identify state/city headers (typically bold, uppercase)
    #    b. Parse listings below each header into structured records
    #    c. Normalize address formats (St./Street, Ave./Avenue, etc.)
    #    d. Classify listing category from context clues
    # 4. Output structured JSON
    # 5. Document OCR accuracy rate (manual sample of 100 listings)

    log.warning(
        "Pipeline stub -- implementation pending. "
        "Run this script after downloading Green Book page images from LOC."
    )

    # Placeholder output structure
    output = {
        "pipeline_version": "0.1",
        "editions_targeted": sorted(GREEN_BOOK_EDITIONS.keys()),
        "listings": [],
        "metadata": {
            "ocr_tool": "tesseract",
            "ocr_accuracy_rate": None,
            "total_pages_processed": 0,
            "total_listings_extracted": 0,
            "extraction_date": None,
        },
    }

    output_path = DATA_DIR / "green_book_listings_raw.json"
    output_path.write_text(json.dumps(output, indent=2))
    log.info("Wrote placeholder to %s", output_path)


if __name__ == "__main__":
    main()
