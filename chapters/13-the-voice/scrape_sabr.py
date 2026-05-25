"""
SABR Oral History Collection Scraper

Crawls sabr.org/oralhistory A-Z tag pages, discovers all interview
pages, extracts MP3 URLs (hosted on sabr.box.com), and downloads
the audio files.

Phase 1: Build catalog (JSON index of all interviews with metadata)
Phase 2: Download audio for Negro Leagues tagged + integration-era interviews

Usage:
  python scrape_sabr.py catalog    # Build catalog only
  python scrape_sabr.py download   # Download audio from catalog
  python scrape_sabr.py all        # Both

Output:
  chapters/13-the-voice/data/sabr-catalog.json
  chapters/13-the-voice/audio/sabr/
"""

import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
from html.parser import HTMLParser

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")
AUDIO_DIR = os.path.join(BASE_DIR, "audio", "sabr")
CATALOG_PATH = os.path.join(DATA_DIR, "sabr-catalog.json")

SABR_BASE = "https://sabr.org"
TAG_LETTERS = "abcdefghijklmnopqrstuvwxyz"
RATE_LIMIT = 1.5  # seconds between requests


def fetch_url(url, retries=3):
    """Fetch a URL with retries and rate limiting."""
    for attempt in range(retries):
        try:
            req = urllib.request.Request(
                url,
                headers={
                    "User-Agent": (
                        "TOBS-Research/1.0 "
                        "(theotherboxscore.org; "
                        "Negro Leagues research project; "
                        "respectful crawling)"
                    ),
                },
            )
            with urllib.request.urlopen(req, timeout=30) as resp:
                return resp.read().decode("utf-8", errors="replace")
        except (urllib.error.URLError, urllib.error.HTTPError, OSError) as e:
            print(f"  Attempt {attempt + 1} failed for {url}: {e}")
            if attempt < retries - 1:
                time.sleep(3)
    return None


def fetch_binary(url, dest_path, retries=3):
    """Download a binary file with retries."""
    url = url.strip()
    if url.startswith("//"):
        url = "https:" + url
    for attempt in range(retries):
        try:
            req = urllib.request.Request(
                url,
                headers={
                    "User-Agent": (
                        "TOBS-Research/1.0 "
                        "(theotherboxscore.org; "
                        "Negro Leagues research project)"
                    ),
                },
            )
            with urllib.request.urlopen(req, timeout=120) as resp:
                with open(dest_path, "wb") as f:
                    while True:
                        chunk = resp.read(65536)
                        if not chunk:
                            break
                        f.write(chunk)
            return True
        except (urllib.error.URLError, urllib.error.HTTPError, OSError) as e:
            print(f"  Download attempt {attempt + 1} failed: {e}")
            if attempt < retries - 1:
                time.sleep(5)
    return False


class InterviewLinkParser(HTMLParser):
    """Extract interview page links from a tag listing page."""

    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            href = dict(attrs).get("href", "")
            if "/interview/" in href:
                if href.startswith("/"):
                    href = SABR_BASE + href
                if href not in self.links:
                    self.links.append(href)


class InterviewDetailParser(HTMLParser):
    """Extract metadata and audio URLs from an interview detail page."""

    def __init__(self):
        super().__init__()
        self.mp3_urls = []
        self.pdf_urls = []
        self.in_tag = None
        self.text_parts = []
        self.all_text = []
        self.tags_found = []

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        # Audio source elements
        if tag == "source":
            src = attrs_dict.get("src", "")
            if ".mp3" in src.lower():
                if src.startswith("//"):
                    src = "https:" + src
                if src not in self.mp3_urls:
                    self.mp3_urls.append(src)
        # Audio elements with src
        if tag == "audio":
            src = attrs_dict.get("src", "")
            if ".mp3" in src.lower():
                if src.startswith("//"):
                    src = "https:" + src
                if src not in self.mp3_urls:
                    self.mp3_urls.append(src)
        # Links to MP3s or PDFs
        if tag == "a":
            href = attrs_dict.get("href", "")
            if ".mp3" in href.lower():
                if href.startswith("//"):
                    href = "https:" + href
                if href not in self.mp3_urls:
                    self.mp3_urls.append(href)
            if ".pdf" in href.lower() and "box.com" in href:
                if href.startswith("//"):
                    href = "https:" + href
                self.pdf_urls.append(href)
            # Tag links
            if "/tag/" in href:
                tag_name = href.rstrip("/").split("/")[-1]
                if tag_name not in TAG_LETTERS and tag_name:
                    self.tags_found.append(tag_name)

    def handle_data(self, data):
        self.all_text.append(data)


def extract_metadata(html, url):
    """Extract interview metadata from page HTML."""
    parser = InterviewDetailParser()
    parser.feed(html)

    full_text = " ".join(parser.all_text)

    # Extract interviewer
    interviewer = None
    m = re.search(r"[Ii]nterviewer?:?\s*([A-Z][a-z]+ [A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)", full_text)
    if m:
        interviewer = m.group(1).strip()

    # Extract date
    interview_date = None
    m = re.search(r"(\d{1,2}/\d{1,2}/\d{4})", full_text)
    if m:
        interview_date = m.group(1)

    # Extract duration
    duration = None
    m = re.search(r"(\d+:\d{2}:\d{2})", full_text)
    if m:
        duration = m.group(1)

    # Extract file size
    file_size = None
    m = re.search(r"([\d.]+)\s*MB", full_text)
    if m:
        file_size = f"{m.group(1)} MB"

    # Extract name from URL
    slug = url.rstrip("/").split("/")[-1]
    # e.g. "buck-oneil-2000" -> "Buck Oneil", "2000"
    parts = slug.rsplit("-", 1)
    year = None
    if len(parts) == 2 and (parts[1].isdigit() or parts[1] == "unknown"):
        year = parts[1] if parts[1] != "unknown" else None
        name_slug = parts[0]
    else:
        name_slug = slug

    name = " ".join(w.capitalize() for w in name_slug.split("-"))

    return {
        "name": name,
        "url": url,
        "slug": slug,
        "year": year,
        "interviewer": interviewer,
        "interview_date": interview_date,
        "duration": duration,
        "file_size": file_size,
        "mp3_urls": parser.mp3_urls,
        "pdf_urls": parser.pdf_urls,
        "tags": list(set(parser.tags_found)),
        "audio_parts": len(parser.mp3_urls),
    }


def _save_catalog(catalog):
    """Save catalog to disk."""
    os.makedirs(DATA_DIR, exist_ok=True)
    output = {
        "metadata": {
            "title": "SABR Oral History Collection Catalog",
            "source": "sabr.org/oralhistory",
            "description": (
                "Complete catalog of the SABR Oral History Collection, "
                "scraped from sabr.org. Audio hosted on sabr.box.com."
            ),
            "total_interviews": len(catalog),
            "total_with_audio": sum(1 for c in catalog if c["mp3_urls"]),
            "total_audio_parts": sum(c["audio_parts"] for c in catalog),
            "negro_leagues_tagged": sum(
                1 for c in catalog if "negro-leagues" in c["tags"]
            ),
            "scraped_date": time.strftime("%Y-%m-%d"),
            "license": "SABR research use",
        },
        "interviews": catalog,
    }
    with open(CATALOG_PATH, "w") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)


def build_catalog():
    """Crawl all A-Z tag pages and build a complete catalog."""
    print("Phase 1: Building SABR oral history catalog")
    print("=" * 50)

    all_interview_urls = set()

    # Crawl each letter
    for letter in TAG_LETTERS:
        tag_url = f"{SABR_BASE}/tag/{letter}/"
        print(f"Fetching tag page: {letter.upper()} ...", end=" ", flush=True)
        html = fetch_url(tag_url)
        if not html:
            print("FAILED")
            continue

        parser = InterviewLinkParser()
        parser.feed(html)
        new = len(parser.links) - len(all_interview_urls & set(parser.links))
        all_interview_urls.update(parser.links)
        print(f"{len(parser.links)} interviews ({new} new)")
        time.sleep(RATE_LIMIT)

    # Also crawl the Negro Leagues tag specifically
    for tag in ["negro-leagues", "hall-of-fame"]:
        tag_url = f"{SABR_BASE}/tag/{tag}/"
        print(f"Fetching tag page: {tag} ...", end=" ", flush=True)
        html = fetch_url(tag_url)
        if html:
            parser = InterviewLinkParser()
            parser.feed(html)
            new = len(parser.links) - len(all_interview_urls & set(parser.links))
            all_interview_urls.update(parser.links)
            print(f"{len(parser.links)} interviews ({new} new)")
        else:
            print("FAILED")
        time.sleep(RATE_LIMIT)

    print(f"\nTotal unique interview URLs: {len(all_interview_urls)}")

    # Load any existing partial catalog to resume
    catalog = []
    done_slugs = set()
    if os.path.exists(CATALOG_PATH):
        try:
            with open(CATALOG_PATH) as f:
                existing = json.load(f)
            catalog = existing.get("interviews", [])
            done_slugs = {c["slug"] for c in catalog}
            print(f"Resuming from partial catalog: {len(catalog)} already done")
        except (json.JSONDecodeError, KeyError):
            pass

    # Fetch each interview page for metadata
    urls = sorted(all_interview_urls)
    for i, url in enumerate(urls, 1):
        slug = url.rstrip("/").split("/")[-1]
        if slug in done_slugs:
            continue

        print(f"[{i}/{len(urls)}] {slug} ...", end=" ", flush=True)

        html = fetch_url(url)
        if not html:
            print("FAILED")
            continue

        meta = extract_metadata(html, url)
        catalog.append(meta)
        done_slugs.add(slug)
        print(f"{meta['audio_parts']} parts, tags={meta['tags']}")

        # Save incrementally every 25 interviews
        if len(catalog) % 25 == 0:
            _save_catalog(catalog)
            print(f"  [checkpoint: {len(catalog)} saved]")

        time.sleep(RATE_LIMIT)

    # Final save
    _save_catalog(catalog)

    print(f"\nCatalog saved to {CATALOG_PATH}")
    print(f"Total: {len(catalog)} interviews, "
          f"{sum(1 for c in catalog if c['mp3_urls'])} with audio")

    return catalog


def download_audio(catalog=None):
    """Download MP3 files from catalog. Prioritizes Negro Leagues tagged."""
    if catalog is None:
        if not os.path.exists(CATALOG_PATH):
            print("No catalog found. Run 'catalog' first.")
            return
        with open(CATALOG_PATH) as f:
            data = json.load(f)
        catalog = data["interviews"]

    os.makedirs(AUDIO_DIR, exist_ok=True)

    # Prioritize: Negro Leagues tagged first, then all others
    negro_leagues = [c for c in catalog if "negro-leagues" in c["tags"]]
    others = [c for c in catalog if "negro-leagues" not in c["tags"]]

    print(f"\nPhase 2: Downloading audio")
    print(f"Negro Leagues tagged: {len(negro_leagues)}")
    print(f"Other interviews: {len(others)}")
    print("=" * 50)

    # Download Negro Leagues first
    queue = negro_leagues + others
    downloaded = 0
    skipped = 0

    for entry in queue:
        if not entry["mp3_urls"]:
            continue

        slug = entry["slug"]

        # Check if already downloaded
        existing = [
            f for f in os.listdir(AUDIO_DIR)
            if f.startswith(slug)
        ] if os.path.exists(AUDIO_DIR) else []

        if len(existing) >= len(entry["mp3_urls"]):
            skipped += 1
            continue

        is_nlb = "negro-leagues" in entry["tags"]
        label = "[NLB] " if is_nlb else ""
        print(f"\n{label}{entry['name']} ({entry.get('year', '?')})")

        for j, mp3_url in enumerate(entry["mp3_urls"], 1):
            if len(entry["mp3_urls"]) == 1:
                filename = f"{slug}.mp3"
            else:
                filename = f"{slug}-part{j}.mp3"

            dest = os.path.join(AUDIO_DIR, filename)
            if os.path.exists(dest) and os.path.getsize(dest) > 1000:
                print(f"  SKIP (exists): {filename}")
                continue

            print(f"  Downloading: {filename} ...", end=" ", flush=True)
            success = fetch_binary(mp3_url, dest)
            if success:
                size_mb = os.path.getsize(dest) / (1024 * 1024)
                print(f"{size_mb:.1f} MB")
                downloaded += 1
            else:
                print("FAILED")
                if os.path.exists(dest):
                    os.remove(dest)

            time.sleep(RATE_LIMIT)

    print(f"\nDownloaded: {downloaded} files")
    print(f"Skipped (already exists): {skipped}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python scrape_sabr.py [catalog|download|all]")
        sys.exit(1)

    cmd = sys.argv[1].lower()

    if cmd == "catalog":
        build_catalog()
    elif cmd == "download":
        download_audio()
    elif cmd == "all":
        catalog = build_catalog()
        download_audio(catalog)
    else:
        print(f"Unknown command: {cmd}")
        print("Usage: python scrape_sabr.py [catalog|download|all]")
        sys.exit(1)


if __name__ == "__main__":
    main()
