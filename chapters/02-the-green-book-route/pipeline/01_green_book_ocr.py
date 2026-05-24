"""
01_green_book_ocr.py -- Extract listings from LOC digitized Green Book editions.

Phase 1 of the Green Book Route pipeline.

Input:  Digitized page images from LOC Green Book collection
        https://www.loc.gov/collections/green-book/

Output: data/green_book_listings_raw.json
        One record per listing: business_name, address, city, state,
        category (hotel/tourist home/restaurant/tavern/beauty_shop/etc),
        edition_year, page_number.

Method: Tesseract OCR with custom post-processing for period typography
        and address format normalization.

Gate:   OCR success rate documented before proceeding to Step 2.
"""

from __future__ import annotations

import hashlib
import json
import logging
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests
from PIL import Image, ImageFilter, ImageOps
from tqdm import tqdm

try:
    import pytesseract
except ImportError:
    print(
        "pytesseract is required. Install it and ensure Tesseract is on PATH.",
        file=sys.stderr,
    )
    sys.exit(1)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

PIPELINE_DIR = Path(__file__).resolve().parent
CHAPTER_DIR = PIPELINE_DIR.parent
DATA_DIR = CHAPTER_DIR / "data"
IMAGES_DIR = DATA_DIR / "page_images"
OCR_DIR = DATA_DIR / "ocr_text"
OUTPUT_PATH = DATA_DIR / "green_book_listings_raw.json"

for _d in (DATA_DIR, IMAGES_DIR, OCR_DIR):
    _d.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# LOC Green Book editions (digitized, public domain)
# ---------------------------------------------------------------------------

GREEN_BOOK_EDITIONS: dict[int, str] = {
    1936: "https://www.loc.gov/item/2016298176/",
    1938: "https://www.loc.gov/item/2016298177/",
    1940: "https://www.loc.gov/item/2016298178/",
    1941: "https://www.loc.gov/item/2016298179/",
    1942: "https://www.loc.gov/item/2016298180/",
    1947: "https://www.loc.gov/item/2016298181/",
    1948: "https://www.loc.gov/item/2016298182/",
    1949: "https://www.loc.gov/item/2016298183/",
}

# Image resolution to download. pct:50 gives ~1000px wide pages, which is
# a reasonable trade-off between OCR quality and download size.
IMAGE_PCT: int = 50

# Minimum delay between HTTP requests to LOC (seconds).  Be polite.
REQUEST_DELAY: float = 1.0

# Maximum retries on transient HTTP errors.
MAX_RETRIES: int = 3

# ---------------------------------------------------------------------------
# US state names -- for header detection and abbreviation expansion
# ---------------------------------------------------------------------------

STATE_ABBREVIATIONS: dict[str, str] = {
    "ALA": "Alabama", "AL": "Alabama",
    "ARIZ": "Arizona", "AZ": "Arizona",
    "ARK": "Arkansas", "AR": "Arkansas",
    "CAL": "California", "CALIF": "California", "CA": "California",
    "COLO": "Colorado", "CO": "Colorado",
    "CONN": "Connecticut", "CT": "Connecticut",
    "DEL": "Delaware", "DE": "Delaware",
    "FLA": "Florida", "FL": "Florida",
    "GA": "Georgia",
    "ILL": "Illinois", "IL": "Illinois",
    "IND": "Indiana", "IN": "Indiana",
    "KAN": "Kansas", "KANS": "Kansas", "KS": "Kansas",
    "KY": "Kentucky",
    "LA": "Louisiana",
    "MD": "Maryland",
    "MASS": "Massachusetts", "MA": "Massachusetts",
    "MICH": "Michigan", "MI": "Michigan",
    "MINN": "Minnesota", "MN": "Minnesota",
    "MISS": "Mississippi", "MS": "Mississippi",
    "MO": "Missouri",
    "MONT": "Montana", "MT": "Montana",
    "NEB": "Nebraska", "NEBR": "Nebraska", "NE": "Nebraska",
    "NEV": "Nevada", "NV": "Nevada",
    "NH": "New Hampshire",
    "NJ": "New Jersey",
    "NM": "New Mexico", "N MEX": "New Mexico",
    "NY": "New York",
    "NC": "North Carolina",
    "ND": "North Dakota",
    "OH": "Ohio",
    "OKLA": "Oklahoma", "OK": "Oklahoma",
    "ORE": "Oregon", "OR": "Oregon",
    "PA": "Pennsylvania", "PENN": "Pennsylvania",
    "RI": "Rhode Island",
    "SC": "South Carolina",
    "SD": "South Dakota",
    "TENN": "Tennessee", "TN": "Tennessee",
    "TEX": "Texas", "TX": "Texas",
    "VA": "Virginia",
    "WASH": "Washington", "WA": "Washington",
    "WV": "West Virginia", "W VA": "West Virginia",
    "WIS": "Wisconsin", "WISC": "Wisconsin", "WI": "Wisconsin",
    "WYO": "Wyoming", "WY": "Wyoming",
    "DC": "District of Columbia",
    "D C": "District of Columbia",
}

FULL_STATE_NAMES: set[str] = {
    "Alabama", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "Florida", "Georgia", "Idaho",
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan",
    "Minnesota", "Mississippi", "Missouri", "Montana", "Nebraska",
    "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota",
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia",
    "Washington", "West Virginia", "Wisconsin", "Wyoming",
    "District of Columbia",
}

# ---------------------------------------------------------------------------
# Category keywords -- used to classify listings from OCR text context
# ---------------------------------------------------------------------------

CATEGORY_PATTERNS: list[tuple[str, re.Pattern[str]]] = [
    ("hotel", re.compile(r"\bhotels?\b", re.IGNORECASE)),
    ("tourist_home", re.compile(
        r"\btourist\s+homes?\b|\brooms?\b|\brooming\b|\blodging\b",
        re.IGNORECASE,
    )),
    ("restaurant", re.compile(
        r"\brestaurants?\b|\bdining\b|\bcafe\b|\bcafeteria\b",
        re.IGNORECASE,
    )),
    ("tavern", re.compile(
        r"\btaverns?\b|\bbars?\b|\bcocktail\b|\blounge\b|\bliquor\b",
        re.IGNORECASE,
    )),
    ("beauty_shop", re.compile(
        r"\bbeauty\b|\bbarber\b|\bhairdress\b",
        re.IGNORECASE,
    )),
    ("service_station", re.compile(
        r"\bservice\s+station\b|\bgarage\b|\bauto\b|\bgas\b|\bfilling\b",
        re.IGNORECASE,
    )),
    ("nightclub", re.compile(
        r"\bnightclub\b|\bnight\s+club\b|\bdance\b|\bballroom\b",
        re.IGNORECASE,
    )),
    ("drug_store", re.compile(
        r"\bdrug\s*store\b|\bpharmacy\b",
        re.IGNORECASE,
    )),
    ("tailor", re.compile(
        r"\btailor\b|\bclean\w*\b|\blaundry\b",
        re.IGNORECASE,
    )),
]

# ---------------------------------------------------------------------------
# Address normalization
# ---------------------------------------------------------------------------

ADDRESS_REPLACEMENTS: list[tuple[re.Pattern[str], str]] = [
    (re.compile(r"\bSt\.\b"), "Street"),
    (re.compile(r"\bSt\b(?!\w)"), "Street"),
    (re.compile(r"\bAve\.\b"), "Avenue"),
    (re.compile(r"\bAve\b(?!\w)"), "Avenue"),
    (re.compile(r"\bBlvd\.\b"), "Boulevard"),
    (re.compile(r"\bBlvd\b(?!\w)"), "Boulevard"),
    (re.compile(r"\bDr\.\b"), "Drive"),
    (re.compile(r"\bDr\b(?!\w)"), "Drive"),
    (re.compile(r"\bRd\.\b"), "Road"),
    (re.compile(r"\bRd\b(?!\w)"), "Road"),
    (re.compile(r"\bPl\.\b"), "Place"),
    (re.compile(r"\bPl\b(?!\w)"), "Place"),
    (re.compile(r"\bCt\.\b"), "Court"),
    (re.compile(r"\bCt\b(?!\w)"), "Court"),
    (re.compile(r"\bLn\.\b"), "Lane"),
    (re.compile(r"\bLn\b(?!\w)"), "Lane"),
    (re.compile(r"\bN\.\b"), "North"),
    (re.compile(r"\bS\.\b"), "South"),
    (re.compile(r"\bE\.\b"), "East"),
    (re.compile(r"\bW\.\b"), "West"),
]


def normalize_address(raw: str) -> str:
    """Expand common abbreviations in an address string."""
    result = raw.strip()
    for pattern, replacement in ADDRESS_REPLACEMENTS:
        result = pattern.sub(replacement, result)
    # Collapse multiple whitespace
    result = re.sub(r"\s{2,}", " ", result)
    return result


# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------

_session: requests.Session | None = None


def _get_session() -> requests.Session:
    global _session
    if _session is None:
        _session = requests.Session()
        _session.headers.update({
            "User-Agent": (
                "TheOtherBoxScore-GreenBookPipeline/1.0 "
                "(research project; contact: tobs@example.com)"
            ),
        })
    return _session


def _polite_get(
    url: str,
    *,
    stream: bool = False,
    timeout: int = 60,
) -> requests.Response:
    """GET with retry, back-off, and rate-limit politeness."""
    session = _get_session()
    last_exc: Exception | None = None
    for attempt in range(1, MAX_RETRIES + 1):
        try:
            resp = session.get(url, stream=stream, timeout=timeout)
            resp.raise_for_status()
            time.sleep(REQUEST_DELAY)
            return resp
        except requests.exceptions.HTTPError as exc:
            status = exc.response.status_code if exc.response is not None else 0
            if status == 429 or status >= 500:
                wait = REQUEST_DELAY * (2 ** attempt)
                log.warning(
                    "HTTP %d on attempt %d/%d -- retrying in %.1fs: %s",
                    status, attempt, MAX_RETRIES, wait, url,
                )
                time.sleep(wait)
                last_exc = exc
                continue
            raise
        except (requests.exceptions.ConnectionError, requests.exceptions.Timeout) as exc:
            wait = REQUEST_DELAY * (2 ** attempt)
            log.warning(
                "Network error on attempt %d/%d -- retrying in %.1fs: %s",
                attempt, MAX_RETRIES, wait, url,
            )
            time.sleep(wait)
            last_exc = exc
    raise RuntimeError(
        f"Failed after {MAX_RETRIES} retries: {url}"
    ) from last_exc


# ---------------------------------------------------------------------------
# Step 1: Fetch page image URLs from LOC JSON API
# ---------------------------------------------------------------------------

def fetch_page_image_urls(
    item_url: str,
    year: int,
) -> list[str]:
    """Query the LOC JSON API and return IIIF image URLs for every page."""
    json_url = item_url.rstrip("/") + "/?fo=json"
    log.info("Fetching item metadata for %d: %s", year, json_url)
    resp = _polite_get(json_url)
    data = resp.json()

    resources = data.get("resources", [])
    if not resources:
        log.error("No resources found for %d at %s", year, item_url)
        return []

    file_groups = resources[0].get("files", [])
    log.info("  %d page(s) found for %d edition", len(file_groups), year)

    urls: list[str] = []
    for group in file_groups:
        # Pick the image closest to our target pct. Each group contains
        # multiple resolutions. We look for pct:{IMAGE_PCT} in the URL.
        target_fragment = f"pct:{IMAGE_PCT}"
        best: dict[str, Any] | None = None
        best_full: dict[str, Any] | None = None
        for entry in group:
            if entry.get("mimetype", "").startswith("image/jpeg"):
                if target_fragment in entry.get("url", ""):
                    best = entry
                    break
                if "pct:100" in entry.get("url", ""):
                    best_full = entry
        chosen = best or best_full
        if chosen:
            urls.append(chosen["url"])
        elif group:
            # Fallback: pick the largest JPEG
            jpegs = [
                e for e in group
                if e.get("mimetype", "").startswith("image/jpeg")
            ]
            if jpegs:
                jpegs.sort(key=lambda e: e.get("width", 0), reverse=True)
                urls.append(jpegs[0]["url"])

    return urls


# ---------------------------------------------------------------------------
# Step 2: Download page images (with resume support)
# ---------------------------------------------------------------------------

def download_page_images(
    year: int,
    image_urls: list[str],
) -> list[Path]:
    """Download page images for an edition. Skips already-downloaded files."""
    year_dir = IMAGES_DIR / str(year)
    year_dir.mkdir(parents=True, exist_ok=True)

    paths: list[Path] = []
    for idx, url in enumerate(tqdm(
        image_urls, desc=f"  Downloading {year}", unit="page",
    )):
        page_num = idx + 1
        dest = year_dir / f"page_{page_num:04d}.jpg"

        if dest.exists() and dest.stat().st_size > 0:
            paths.append(dest)
            continue

        try:
            resp = _polite_get(url, stream=True, timeout=120)
            tmp = dest.with_suffix(".tmp")
            with tmp.open("wb") as fh:
                for chunk in resp.iter_content(chunk_size=65536):
                    fh.write(chunk)
            tmp.rename(dest)
            paths.append(dest)
        except Exception:
            log.exception("Failed to download page %d of %d: %s", page_num, year, url)
            # Continue with remaining pages rather than abort the whole edition.

    return paths


# ---------------------------------------------------------------------------
# Step 3: OCR with Tesseract
# ---------------------------------------------------------------------------

def preprocess_image(img: Image.Image) -> Image.Image:
    """Apply preprocessing to improve OCR on period Green Book typography."""
    # Convert to grayscale
    gray = ImageOps.grayscale(img)
    # Increase contrast via autocontrast
    enhanced = ImageOps.autocontrast(gray, cutoff=1)
    # Light sharpening
    sharpened = enhanced.filter(ImageFilter.SHARPEN)
    return sharpened


def ocr_page(image_path: Path) -> str:
    """Run Tesseract OCR on a single page image, returning raw text."""
    img = Image.open(image_path)
    processed = preprocess_image(img)
    text: str = pytesseract.image_to_string(
        processed,
        lang="eng",
        config="--psm 6",  # Assume a single uniform block of text
    )
    return text


def ocr_edition(
    year: int,
    image_paths: list[Path],
) -> list[tuple[int, str]]:
    """OCR all pages for one edition. Returns list of (page_number, text).
    Caches raw OCR text to disk for resumability."""
    year_ocr_dir = OCR_DIR / str(year)
    year_ocr_dir.mkdir(parents=True, exist_ok=True)

    results: list[tuple[int, str]] = []
    for idx, img_path in enumerate(tqdm(
        image_paths, desc=f"  OCR {year}", unit="page",
    )):
        page_num = idx + 1
        cache_path = year_ocr_dir / f"page_{page_num:04d}.txt"

        if cache_path.exists():
            text = cache_path.read_text(encoding="utf-8")
        else:
            try:
                text = ocr_page(img_path)
                cache_path.write_text(text, encoding="utf-8")
            except Exception:
                log.exception(
                    "OCR failed on page %d of %d (%s)",
                    page_num, year, img_path,
                )
                text = ""

        results.append((page_num, text))

    return results


# ---------------------------------------------------------------------------
# Step 4: Parse OCR text into structured listings
# ---------------------------------------------------------------------------

def _is_state_header(line: str) -> str | None:
    """Return normalized state name if *line* looks like a state header."""
    cleaned = line.strip().rstrip(".")
    # Check full state names (case-insensitive match on all-caps lines)
    upper = cleaned.upper()
    for name in FULL_STATE_NAMES:
        if upper == name.upper():
            return name
    # Check abbreviations
    abbrev = STATE_ABBREVIATIONS.get(upper)
    if abbrev:
        return abbrev
    # Handle "STATE OF ..." or trailing punctuation variants
    for prefix in ("STATE OF ", "-- "):
        if upper.startswith(prefix):
            remainder = upper[len(prefix):].strip()
            for name in FULL_STATE_NAMES:
                if remainder == name.upper():
                    return name
    return None


def _looks_like_city(line: str) -> str | None:
    """Return city name if the line looks like a city sub-header.

    City headers in Green Books are typically short, capitalized lines
    that do not contain digits (no address) and are not state names.
    """
    stripped = line.strip().rstrip(".,;:")
    if not stripped:
        return None
    # Must be reasonably short (city names rarely exceed 30 chars)
    if len(stripped) > 40:
        return None
    # Should not have digits (would be an address)
    if re.search(r"\d", stripped):
        return None
    # Should be mostly uppercase or title case
    if stripped.upper() == stripped or stripped.title() == stripped:
        # Must not be a state
        if _is_state_header(stripped) is not None:
            return None
        # Must be at least 3 chars
        if len(stripped) >= 3:
            return stripped.title()
    return None


def _classify_category(text: str, section_header: str) -> str:
    """Classify a listing into a category based on text content and
    the current section header (if any)."""
    combined = f"{section_header} {text}"
    for category, pattern in CATEGORY_PATTERNS:
        if pattern.search(combined):
            return category
    return "unknown"


_ADDRESS_RE = re.compile(
    r"(\d+[\d\-\s]*(?:[A-Za-z]\.?\s+)*(?:Street|St\.?|Avenue|Ave\.?|"
    r"Boulevard|Blvd\.?|Drive|Dr\.?|Road|Rd\.?|Place|Pl\.?|Court|Ct\.?|"
    r"Lane|Ln\.?|Way|Terrace|Terr\.?|Circle|Cir\.?|Highway|Hwy\.?|"
    r"[NSEW]\.?\s+\w+))",
    re.IGNORECASE,
)

_SIMPLE_ADDRESS_RE = re.compile(
    r"(\d+\s+[A-Za-z][\w\s\.]{2,30})",
)


def _extract_address(line: str) -> str:
    """Try to extract an address from a listing line."""
    m = _ADDRESS_RE.search(line)
    if m:
        return normalize_address(m.group(1))
    m = _SIMPLE_ADDRESS_RE.search(line)
    if m:
        return normalize_address(m.group(1))
    return ""


def _extract_business_name(line: str, address: str) -> str:
    """Extract the business name, which typically precedes the address."""
    if address:
        idx = line.find(address[:8]) if len(address) >= 8 else -1
        if idx == -1:
            # Try to split on the first digit cluster
            parts = re.split(r"\s+\d", line, maxsplit=1)
            if parts:
                return parts[0].strip().rstrip(",.- ")
        else:
            return line[:idx].strip().rstrip(",.- ")
    # No address found -- the whole line is probably the name
    return line.strip().rstrip(",.- ")


def parse_ocr_text(
    year: int,
    pages: list[tuple[int, str]],
) -> list[dict[str, Any]]:
    """Parse raw OCR text from one edition into structured listing records."""
    listings: list[dict[str, Any]] = []
    current_state: str = ""
    current_city: str = ""
    current_section: str = ""  # e.g., "HOTELS", "RESTAURANTS"

    for page_num, text in pages:
        lines = text.split("\n")
        for line in lines:
            stripped = line.strip()
            if not stripped:
                continue

            # Check for state header
            state = _is_state_header(stripped)
            if state is not None:
                current_state = state
                current_city = ""
                current_section = ""
                continue

            # Check for category section header (e.g., "HOTELS", "RESTAURANTS")
            upper_stripped = stripped.upper().rstrip(":")
            for _, pattern in CATEGORY_PATTERNS:
                if pattern.search(upper_stripped) and len(stripped) < 30:
                    current_section = stripped
                    break

            # Check for city header
            city = _looks_like_city(stripped)
            if city is not None:
                current_city = city
                continue

            # Skip very short lines or lines that are clearly not listings
            if len(stripped) < 5:
                continue
            # Skip lines that look like page headers/footers
            if re.match(r"^(THE\s+)?GREEN\s*BOOK", stripped, re.IGNORECASE):
                continue
            if re.match(r"^\d+$", stripped):
                continue

            # Try to parse as a listing if we have a state context
            if current_state:
                address = _extract_address(stripped)
                name = _extract_business_name(stripped, address)
                if not name or len(name) < 2:
                    continue

                category = _classify_category(stripped, current_section)

                listing: dict[str, Any] = {
                    "business_name": name,
                    "address": address,
                    "city": current_city,
                    "state": current_state,
                    "category": category,
                    "edition_year": year,
                    "page_number": page_num,
                    "raw_line": stripped,
                }
                listings.append(listing)

    log.info(
        "  Parsed %d listings from %d edition (%d pages)",
        len(listings), year, len(pages),
    )
    return listings


# ---------------------------------------------------------------------------
# Step 5: Deduplicate across editions
# ---------------------------------------------------------------------------

def _listing_fingerprint(record: dict[str, Any]) -> str:
    """Create a dedup fingerprint from name + address + city + state."""
    parts = [
        record.get("business_name", "").lower().strip(),
        record.get("address", "").lower().strip(),
        record.get("city", "").lower().strip(),
        record.get("state", "").lower().strip(),
    ]
    key = "|".join(parts)
    return hashlib.md5(key.encode()).hexdigest()


def deduplicate_listings(
    all_listings: list[dict[str, Any]],
) -> list[dict[str, Any]]:
    """Deduplicate listings that appear in multiple editions.

    Keeps the earliest edition_year for each unique listing and adds
    an ``editions`` list showing all years the listing appeared.
    """
    by_fingerprint: dict[str, dict[str, Any]] = {}
    for record in all_listings:
        fp = _listing_fingerprint(record)
        if fp in by_fingerprint:
            existing = by_fingerprint[fp]
            existing.setdefault("editions", [existing["edition_year"]])
            if record["edition_year"] not in existing["editions"]:
                existing["editions"].append(record["edition_year"])
                existing["editions"].sort()
        else:
            by_fingerprint[fp] = dict(record)

    deduped = list(by_fingerprint.values())
    removed = len(all_listings) - len(deduped)
    log.info(
        "Deduplication: %d total -> %d unique (%d duplicates removed)",
        len(all_listings), len(deduped), removed,
    )
    return deduped


# ---------------------------------------------------------------------------
# Step 6: Estimate OCR accuracy
# ---------------------------------------------------------------------------

def estimate_ocr_accuracy(listings: list[dict[str, Any]]) -> float:
    """Heuristic OCR accuracy estimate based on parseable fields.

    A listing is considered "well-parsed" if it has:
    - a non-empty business name of length >= 3
    - a non-empty address with at least one digit
    - a recognized state
    - a non-empty city

    Returns a float between 0.0 and 1.0.
    """
    if not listings:
        return 0.0
    well_parsed = 0
    for rec in listings:
        name = rec.get("business_name", "")
        addr = rec.get("address", "")
        state = rec.get("state", "")
        city = rec.get("city", "")
        if (
            len(name) >= 3
            and addr
            and re.search(r"\d", addr)
            and state in FULL_STATE_NAMES
            and len(city) >= 2
        ):
            well_parsed += 1
    return well_parsed / len(listings)


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------

def main() -> None:
    log.info("Green Book OCR pipeline -- Phase 1")
    log.info("Target editions: %s", sorted(GREEN_BOOK_EDITIONS.keys()))
    log.info("Image resolution: pct:%d", IMAGE_PCT)
    log.info("Output: %s", OUTPUT_PATH)

    all_listings: list[dict[str, Any]] = []
    total_pages = 0
    editions_processed: list[int] = []

    for year in sorted(GREEN_BOOK_EDITIONS.keys()):
        item_url = GREEN_BOOK_EDITIONS[year]
        log.info("=" * 60)
        log.info("Processing %d edition: %s", year, item_url)

        # 1. Get page image URLs from LOC JSON API
        try:
            image_urls = fetch_page_image_urls(item_url, year)
        except Exception:
            log.exception("Failed to fetch metadata for %d -- skipping", year)
            continue

        if not image_urls:
            log.warning("No image URLs found for %d -- skipping", year)
            continue

        # 2. Download page images
        image_paths = download_page_images(year, image_urls)
        if not image_paths:
            log.warning("No images downloaded for %d -- skipping", year)
            continue

        # 3. Run OCR
        ocr_results = ocr_edition(year, image_paths)
        total_pages += len(ocr_results)

        # 4. Parse listings from OCR text
        listings = parse_ocr_text(year, ocr_results)
        all_listings.extend(listings)
        editions_processed.append(year)

    # 5. Deduplicate across editions
    log.info("=" * 60)
    deduped = deduplicate_listings(all_listings)

    # 6. Estimate OCR accuracy
    accuracy = estimate_ocr_accuracy(deduped)
    log.info("Estimated OCR accuracy (heuristic): %.1f%%", accuracy * 100)

    # 7. Write output
    output: dict[str, Any] = {
        "pipeline_version": "1.0",
        "editions_targeted": sorted(GREEN_BOOK_EDITIONS.keys()),
        "editions_processed": editions_processed,
        "listings": deduped,
        "metadata": {
            "ocr_tool": "tesseract",
            "ocr_config": "--psm 6",
            "image_resolution_pct": IMAGE_PCT,
            "ocr_accuracy_estimate": round(accuracy, 4),
            "total_pages_processed": total_pages,
            "total_listings_extracted": len(all_listings),
            "unique_listings_after_dedup": len(deduped),
            "extraction_date": datetime.now(timezone.utc).isoformat(),
        },
    }

    OUTPUT_PATH.write_text(json.dumps(output, indent=2, ensure_ascii=False))
    log.info("Wrote %d listings to %s", len(deduped), OUTPUT_PATH)

    # Print summary
    log.info("=" * 60)
    log.info("PIPELINE SUMMARY")
    log.info("  Editions processed: %s", editions_processed)
    log.info("  Total pages OCR'd:  %d", total_pages)
    log.info("  Raw listings:       %d", len(all_listings))
    log.info("  After dedup:        %d", len(deduped))
    log.info("  OCR accuracy est:   %.1f%%", accuracy * 100)

    if accuracy < 0.5:
        log.warning(
            "OCR accuracy estimate is below 50%% -- manual review strongly "
            "recommended before proceeding to Phase 2."
        )


if __name__ == "__main__":
    main()
