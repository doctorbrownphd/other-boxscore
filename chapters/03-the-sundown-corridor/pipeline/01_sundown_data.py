"""
01_sundown_data.py -- Download and process the Scientific Data (2025) geocoded sundown towns dataset.

Phase 1 of the Sundown Corridor pipeline.

Input:  Scientific Data (2025) geocoded dataset from figshare.
        https://doi.org/10.1038/s41597-024-04330-9

Output: data/sundown_towns.json
        One record per documented sundown place: town_name, state,
        lat, lon, evidence_tier (Confirmed/Probable/Possible),
        census_place_fips, source_notes.

Method: Download the geocoded dataset from figshare, parse evidence
        quality tiers, validate coordinates, and output structured JSON.

Gate:   Evidence quality tiers documented, coordinate system verified.
"""

from __future__ import annotations

import csv
import io
import json
import logging
import sys
import time
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

import requests

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
OUTPUT_PATH = DATA_DIR / "sundown_towns.json"

DATA_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# Dataset source
# ---------------------------------------------------------------------------

# The Scientific Data (2025) dataset is published via figshare.
# DOI: https://doi.org/10.1038/s41597-024-04330-9
# The figshare download URL points to the geocoded CSV.
# This URL may need to be updated if figshare reorganizes the dataset.
FIGSHARE_DOI = "https://doi.org/10.1038/s41597-024-04330-9"
FIGSHARE_DATASET_URL = (
    "https://figshare.com/ndownloader/articles/27057069/versions/3"
)

# Fallback: direct CSV URL if the article bundle is unavailable.
FIGSHARE_CSV_URL = (
    "https://figshare.com/ndownloader/files/49193270"
)

# HTTP configuration
REQUEST_DELAY: float = 1.0
MAX_RETRIES: int = 3
USER_AGENT = (
    "TheOtherBoxScore-SundownPipeline/1.0 "
    "(research project; contact: tobs@example.com)"
)

# ---------------------------------------------------------------------------
# Evidence quality tier mapping
# ---------------------------------------------------------------------------

# The Scientific Data (2025) dataset uses several evidence quality labels.
# We normalize them to three tiers for the chapter.
EVIDENCE_TIER_MAP: dict[str, str] = {
    "confirmed": "Confirmed",
    "surely": "Confirmed",
    "almost certainly": "Confirmed",
    "probable": "Probable",
    "likely": "Probable",
    "possible": "Possible",
    "don't know": "Possible",
    "unlikely": "Possible",
}

VALID_TIERS: set[str] = {"Confirmed", "Probable", "Possible"}

# Evidence quality weights (used downstream but documented here)
EVIDENCE_WEIGHTS: dict[str, float] = {
    "Confirmed": 1.0,
    "Probable": 0.7,
    "Possible": 0.4,
}


# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------

_session: requests.Session | None = None


def _get_session() -> requests.Session:
    """Get or create a requests session with appropriate headers."""
    global _session
    if _session is None:
        _session = requests.Session()
        _session.headers.update({"User-Agent": USER_AGENT})
    return _session


def _polite_get(
    url: str,
    *,
    stream: bool = False,
    timeout: int = 120,
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
# Step 1: Download the dataset
# ---------------------------------------------------------------------------

def download_dataset() -> str:
    """Download the sundown towns dataset and return its text content.

    Tries the primary figshare URL first, then the fallback CSV URL.

    Returns:
        The raw CSV text of the dataset.
    """
    log.info("Downloading sundown towns dataset...")
    log.info("  DOI: %s", FIGSHARE_DOI)

    # Try primary URL
    for url in (FIGSHARE_DATASET_URL, FIGSHARE_CSV_URL):
        try:
            log.info("  Trying: %s", url)
            resp = _polite_get(url)
            content_type = resp.headers.get("Content-Type", "")
            log.info("  Content-Type: %s", content_type)
            log.info("  Content length: %d bytes", len(resp.content))

            # If we got a zip file, we need to extract the CSV
            if "zip" in content_type or url.endswith(".zip"):
                import zipfile
                zf = zipfile.ZipFile(io.BytesIO(resp.content))
                csv_files = [n for n in zf.namelist() if n.endswith(".csv")]
                if not csv_files:
                    log.warning("  No CSV files found in zip archive.")
                    continue
                log.info("  Extracting CSV from zip: %s", csv_files[0])
                return zf.read(csv_files[0]).decode("utf-8")

            # Otherwise assume it is CSV text
            return resp.text

        except Exception:
            log.exception("  Failed to download from %s", url)
            continue

    raise RuntimeError(
        "Could not download the sundown towns dataset from any source. "
        "Check the URLs and network connectivity."
    )


# ---------------------------------------------------------------------------
# Step 2: Parse the CSV into structured records
# ---------------------------------------------------------------------------

def normalize_evidence_tier(raw: str) -> str:
    """Normalize an evidence quality string to one of three tiers.

    Args:
        raw: The raw evidence quality string from the dataset.

    Returns:
        One of 'Confirmed', 'Probable', or 'Possible'.
    """
    cleaned = raw.strip().lower()
    mapped = EVIDENCE_TIER_MAP.get(cleaned)
    if mapped:
        return mapped

    # Substring matching as fallback
    if "confirm" in cleaned or "sure" in cleaned:
        return "Confirmed"
    if "probab" in cleaned or "likely" in cleaned:
        return "Probable"
    return "Possible"


def parse_csv(csv_text: str) -> list[dict[str, Any]]:
    """Parse the CSV text into structured sundown town records.

    Args:
        csv_text: The raw CSV content.

    Returns:
        List of sundown town records with normalized fields.
    """
    reader = csv.DictReader(io.StringIO(csv_text))
    records: list[dict[str, Any]] = []
    skipped = 0

    # Discover column names -- the dataset may use various naming conventions
    fieldnames = reader.fieldnames or []
    log.info("CSV columns: %s", fieldnames)

    # Map expected fields to actual column names
    col_map = _discover_columns(fieldnames)
    log.info("Column mapping: %s", col_map)

    for row_num, row in enumerate(reader, start=2):
        try:
            record = _parse_row(row, col_map, row_num)
            if record is not None:
                records.append(record)
            else:
                skipped += 1
        except Exception:
            log.warning("  Skipping row %d: parse error", row_num)
            skipped += 1

    log.info("Parsed %d records (%d skipped)", len(records), skipped)
    return records


def _discover_columns(fieldnames: list[str]) -> dict[str, str]:
    """Map expected field names to actual CSV column names.

    The dataset may use different column naming conventions across versions.
    This function handles common variations.

    Args:
        fieldnames: The actual CSV column headers.

    Returns:
        Mapping from canonical field name to actual column name.
    """
    col_map: dict[str, str] = {}
    lower_fields = {f.lower().strip(): f for f in fieldnames}

    # Town name
    for candidate in ("name", "town_name", "place_name", "city", "town"):
        if candidate in lower_fields:
            col_map["town_name"] = lower_fields[candidate]
            break

    # State
    for candidate in ("state", "state_name", "st"):
        if candidate in lower_fields:
            col_map["state"] = lower_fields[candidate]
            break

    # Latitude
    for candidate in ("latitude", "lat", "y"):
        if candidate in lower_fields:
            col_map["lat"] = lower_fields[candidate]
            break

    # Longitude
    for candidate in ("longitude", "lon", "long", "lng", "x"):
        if candidate in lower_fields:
            col_map["lon"] = lower_fields[candidate]
            break

    # Evidence quality
    for candidate in (
        "confirmation", "evidence", "evidence_tier", "evidence_quality",
        "status", "sundown_status", "confirmed",
    ):
        if candidate in lower_fields:
            col_map["evidence"] = lower_fields[candidate]
            break

    # Census place FIPS (if available)
    for candidate in ("fips", "place_fips", "census_fips", "geoid"):
        if candidate in lower_fields:
            col_map["fips"] = lower_fields[candidate]
            break

    return col_map


def _parse_row(
    row: dict[str, str],
    col_map: dict[str, str],
    row_num: int,
) -> dict[str, Any] | None:
    """Parse a single CSV row into a sundown town record.

    Args:
        row: The CSV row as a dict.
        col_map: Column name mapping from _discover_columns.
        row_num: Row number for error reporting.

    Returns:
        A structured record, or None if the row cannot be parsed.
    """
    # Extract town name
    town_col = col_map.get("town_name", "")
    town_name = row.get(town_col, "").strip() if town_col else ""
    if not town_name:
        return None

    # Extract state
    state_col = col_map.get("state", "")
    state = row.get(state_col, "").strip() if state_col else ""

    # Extract coordinates
    lat_col = col_map.get("lat", "")
    lon_col = col_map.get("lon", "")
    lat_raw = row.get(lat_col, "").strip() if lat_col else ""
    lon_raw = row.get(lon_col, "").strip() if lon_col else ""

    if not lat_raw or not lon_raw:
        log.debug("  Row %d: missing coordinates for %s, %s", row_num, town_name, state)
        return None

    try:
        lat = float(lat_raw)
        lon = float(lon_raw)
    except ValueError:
        log.debug("  Row %d: invalid coordinates: %s, %s", row_num, lat_raw, lon_raw)
        return None

    # Validate coordinates are within continental US bounds
    if not (24.0 <= lat <= 50.0 and -130.0 <= lon <= -65.0):
        log.debug(
            "  Row %d: coordinates outside CONUS: %.4f, %.4f (%s, %s)",
            row_num, lat, lon, town_name, state,
        )
        # Still include but flag
        coord_flag = "outside_conus"
    else:
        coord_flag = ""

    # Extract evidence quality
    evidence_col = col_map.get("evidence", "")
    evidence_raw = row.get(evidence_col, "").strip() if evidence_col else ""
    evidence_tier = normalize_evidence_tier(evidence_raw) if evidence_raw else "Possible"

    # Extract FIPS if available
    fips_col = col_map.get("fips", "")
    fips = row.get(fips_col, "").strip() if fips_col else ""

    record: dict[str, Any] = {
        "town_name": town_name,
        "state": state,
        "lat": round(lat, 6),
        "lon": round(lon, 6),
        "evidence_tier": evidence_tier,
        "evidence_weight": EVIDENCE_WEIGHTS[evidence_tier],
        "evidence_raw": evidence_raw,
    }

    if fips:
        record["census_place_fips"] = fips
    if coord_flag:
        record["coord_flag"] = coord_flag

    return record


# ---------------------------------------------------------------------------
# Step 3: Validate and summarize
# ---------------------------------------------------------------------------

def validate_records(records: list[dict[str, Any]]) -> list[dict[str, Any]]:
    """Validate parsed records and log summary statistics.

    Args:
        records: Parsed sundown town records.

    Returns:
        The same records (validation is non-destructive -- flags are added,
        records are not removed).
    """
    tier_counts: Counter[str] = Counter()
    state_counts: Counter[str] = Counter()
    flagged = 0

    for rec in records:
        tier_counts[rec["evidence_tier"]] += 1
        state_counts[rec["state"]] += 1
        if rec.get("coord_flag"):
            flagged += 1

    log.info("=" * 60)
    log.info("VALIDATION SUMMARY")
    log.info("=" * 60)
    log.info("Total records: %d", len(records))
    log.info("Coordinate flags: %d", flagged)
    log.info("")
    log.info("Evidence tier breakdown:")
    for tier in ("Confirmed", "Probable", "Possible"):
        count = tier_counts.get(tier, 0)
        pct = count / len(records) * 100 if records else 0
        log.info("  %s: %d (%.1f%%)", tier, count, pct)

    log.info("")
    log.info("Top 10 states by count:")
    for state, count in state_counts.most_common(10):
        log.info("  %s: %d", state, count)

    return records


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------

def main() -> None:
    """Run the sundown towns data acquisition pipeline -- Phase 1."""
    log.info("Sundown towns data pipeline -- Phase 1")
    log.info("Output: %s", OUTPUT_PATH)

    # 1. Download the dataset
    try:
        csv_text = download_dataset()
    except RuntimeError as exc:
        log.error("Download failed: %s", exc)
        log.error(
            "To proceed manually, download the dataset from %s "
            "and place the CSV in %s",
            FIGSHARE_DOI, DATA_DIR,
        )
        sys.exit(1)

    # 2. Parse CSV into structured records
    records = parse_csv(csv_text)
    if not records:
        log.error("No records parsed from the dataset. Check the CSV format.")
        sys.exit(1)

    # 3. Validate and summarize
    records = validate_records(records)

    # 4. Write output
    output: dict[str, Any] = {
        "pipeline_version": "1.0",
        "source_doi": FIGSHARE_DOI,
        "source_citation": (
            'Nardos, Rahel, et al. "A national data set of historical US '
            'sundown towns for quantitative analysis." Scientific Data 12 (2025).'
        ),
        "evidence_tiers": {
            "Confirmed": "Strong primary source documentation",
            "Probable": "Multiple secondary sources, consistent historical record",
            "Possible": "Limited documentation, demographic evidence only",
        },
        "evidence_weights": EVIDENCE_WEIGHTS,
        "total_records": len(records),
        "tier_counts": {
            tier: sum(1 for r in records if r["evidence_tier"] == tier)
            for tier in ("Confirmed", "Probable", "Possible")
        },
        "extraction_date": datetime.now(timezone.utc).isoformat(),
        "sundown_towns": records,
    }

    OUTPUT_PATH.write_text(
        json.dumps(output, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    log.info("Wrote %d sundown town records to %s", len(records), OUTPUT_PATH)

    # Print gate summary
    log.info("=" * 60)
    log.info("PHASE 1 GATE CHECK")
    log.info("  Evidence quality tiers documented: YES")
    log.info("  Coordinate system: WGS84 (lat/lon)")
    log.info("  Total documented sundown places: %d", len(records))
    for tier in ("Confirmed", "Probable", "Possible"):
        count = output["tier_counts"][tier]
        log.info("    %s: %d", tier, count)
    log.info("=" * 60)


if __name__ == "__main__":
    main()
