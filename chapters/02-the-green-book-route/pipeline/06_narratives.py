"""
06_narratives.py -- M3: Generate road trip narratives via Claude API.

Phase 5 of the Green Book Route pipeline.

Input:  data/safety_scores.json
        data/route_clusters.json  (optional)
        data/schedule_1936_1948.json

Output: data/narratives.json
        One narrative per team-season. Each narrative is labeled
        as AI-generated with a confidence level.

Method: Claude API with structured prompts committed to
        pipeline/prompts/narrative_template.md.

Gate:   Oscar reviews sample narratives for accuracy and voice.
"""

from __future__ import annotations

import hashlib
import json
import logging
import os
import re
import time
from datetime import date
from pathlib import Path
from typing import Any

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
)
log = logging.getLogger(__name__)

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
PROMPT_DIR = Path(__file__).resolve().parent / "prompts"
OUTPUT_PATH = DATA_DIR / "narratives.json"

MODEL = "claude-sonnet-4-20250514"
MAX_TOKENS = 1024
TEMPERATURE = 0.3

# Rate-limit: pause between API calls to respect Anthropic limits.
API_DELAY_SECONDS = 1.0


# ---------------------------------------------------------------------------
# Prompt loading
# ---------------------------------------------------------------------------

def load_prompt_template() -> tuple[str, str, str]:
    """Load the narrative prompt template and return (system_prompt, user_template, prompt_hash).

    Parses pipeline/prompts/narrative_template.md for the system prompt
    and user message template sections.

    Returns:
        Tuple of (system_prompt, user_message_template, sha256_hex_digest).
    """
    template_path = PROMPT_DIR / "narrative_template.md"
    if not template_path.exists():
        raise FileNotFoundError(
            f"Prompt template not found: {template_path}"
        )

    raw = template_path.read_text(encoding="utf-8")
    prompt_hash = hashlib.sha256(raw.encode("utf-8")).hexdigest()[:12]

    # Extract system prompt: between "## System Prompt" and the next "---"
    system_match = re.search(
        r"## System Prompt\s*\n(.*?)(?=\n---)", raw, re.DOTALL
    )
    if not system_match:
        raise ValueError("Could not parse system prompt from template.")
    system_prompt = system_match.group(1).strip()

    # Extract user message template: the fenced code block after "## User Message Template"
    user_match = re.search(
        r"## User Message Template\s*\n```\s*\n(.*?)```",
        raw,
        re.DOTALL,
    )
    if not user_match:
        raise ValueError("Could not parse user message template from template.")
    user_template = user_match.group(1).strip()

    return system_prompt, user_template, prompt_hash


# ---------------------------------------------------------------------------
# Data loading
# ---------------------------------------------------------------------------

def load_json(path: Path) -> dict[str, Any] | list[Any]:
    """Load a JSON file, returning its parsed contents."""
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def load_safety_scores() -> list[dict[str, Any]]:
    """Load safety_scores.json and return the games list."""
    path = DATA_DIR / "safety_scores.json"
    if not path.exists():
        log.error("safety_scores.json not found at %s", path)
        raise FileNotFoundError(f"Missing upstream file: {path}")
    data = load_json(path)
    return data.get("games", [])


def load_schedule() -> dict[str, Any]:
    """Load schedule_1936_1948.json."""
    path = DATA_DIR / "schedule_1936_1948.json"
    if not path.exists():
        log.error("schedule_1936_1948.json not found at %s", path)
        raise FileNotFoundError(f"Missing upstream file: {path}")
    return load_json(path)


def load_route_clusters() -> dict[str, Any] | None:
    """Load route_clusters.json if it exists; return None otherwise."""
    path = DATA_DIR / "route_clusters.json"
    if not path.exists():
        log.warning("route_clusters.json not found -- proceeding without cluster labels.")
        return None
    return load_json(path)


def load_existing_narratives() -> dict[str, Any] | None:
    """Load existing narratives.json for caching, if it exists."""
    if OUTPUT_PATH.exists():
        return load_json(OUTPUT_PATH)
    return None


# ---------------------------------------------------------------------------
# Context assembly
# ---------------------------------------------------------------------------

def get_team_season_key(team: str, season: int) -> str:
    """Create a unique key for a team-season combination."""
    return f"{team}|{season}"


def build_team_seasons(
    safety_games: list[dict[str, Any]],
) -> dict[str, list[dict[str, Any]]]:
    """Group games by team-season.

    A team participates in a game as either home or away. We track
    games from the perspective of each team that played in them.

    Returns:
        Dict mapping team-season key to a list of game records,
        sorted chronologically.
    """
    team_seasons: dict[str, list[dict[str, Any]]] = {}

    for game in safety_games:
        season = game.get("year", 0)
        for team_field in ("home_team", "away_team"):
            team = game.get(team_field, "")
            if not team:
                continue
            key = get_team_season_key(team, season)
            if key not in team_seasons:
                team_seasons[key] = []
            team_seasons[key].append(game)

    # Sort each team's games chronologically and deduplicate by game_index
    for key in team_seasons:
        seen: set[int] = set()
        deduped: list[dict[str, Any]] = []
        for g in sorted(team_seasons[key], key=lambda x: x.get("date", "")):
            gidx = g.get("game_index", id(g))
            if gidx not in seen:
                seen.add(gidx)
                deduped.append(g)
        team_seasons[key] = deduped

    return team_seasons


def build_route_context(
    games: list[dict[str, Any]],
) -> tuple[list[dict[str, Any]], list[str], int, float]:
    """Assemble the route context for a team-season.

    Returns:
        (route_records, dark_cities, dark_count, avg_score)
    """
    route_records: list[dict[str, Any]] = []
    dark_cities: list[str] = []
    scores: list[float] = []

    seen_city_dates: set[str] = set()

    for game in games:
        city = game.get("city", "Unknown")
        state = game.get("state", "")
        game_date = game.get("date", "")
        city_date_key = f"{city}|{state}|{game_date}"

        if city_date_key in seen_city_dates:
            continue
        seen_city_dates.add(city_date_key)

        components = game.get("components", {})
        listings_1mi = components.get("listings_1mi", 0.0)
        listings_5mi = components.get("listings_5mi", 0.0)
        has_hotel = components.get("has_hotel_1mi", 0.0)
        composite = game.get("composite_score", 0.0)

        record = {
            "city": city,
            "state": state,
            "date": game_date,
            "ballpark": game.get("ballpark_name", ""),
            "listings_1mi": int(listings_1mi),
            "listings_5mi": int(listings_5mi),
            "has_hotel_1mi": bool(has_hotel),
            "safety_score": round(composite, 4),
        }
        route_records.append(record)
        scores.append(composite)

        if int(listings_1mi) == 0:
            label = f"{city}, {state}" if state else city
            if label not in dark_cities:
                dark_cities.append(label)

    avg_score = sum(scores) / len(scores) if scores else 0.0
    return route_records, dark_cities, len(dark_cities), avg_score


def get_cluster_label(
    clusters: dict[str, Any] | None,
    team: str,
    season: int,
) -> str:
    """Look up the route cluster label for a team-season, if available."""
    if clusters is None:
        return "Not available (route clustering not yet computed)"

    # Try several possible structures for the clusters data
    cluster_data = clusters.get("clusters", clusters)

    # Try team-season key
    key = get_team_season_key(team, season)
    if key in cluster_data:
        entry = cluster_data[key]
        if isinstance(entry, dict):
            return entry.get("label", entry.get("cluster", "Unknown"))
        return str(entry)

    # Try nested: clusters[team][season]
    if isinstance(cluster_data, dict) and team in cluster_data:
        team_entry = cluster_data[team]
        if isinstance(team_entry, dict) and str(season) in team_entry:
            return str(team_entry[str(season)])

    return "Not available"


# ---------------------------------------------------------------------------
# Placeholder narrative (no API key)
# ---------------------------------------------------------------------------

def generate_placeholder_narrative(
    team: str,
    season: int,
    route_records: list[dict[str, Any]],
    dark_cities: list[str],
    dark_count: int,
    avg_score: float,
) -> str:
    """Generate a template-based placeholder narrative when no API key is set.

    This is clearly labeled as a placeholder so downstream consumers
    know it was not AI-generated.
    """
    n_games = len(route_records)
    cities_seen: list[str] = []
    for r in route_records:
        label = f"{r['city']}, {r['state']}" if r.get("state") else r["city"]
        if label not in cities_seen:
            cities_seen.append(label)
    n_cities = len(cities_seen)

    dark_city_list = ", ".join(dark_cities) if dark_cities else "none"

    narrative = (
        f"[placeholder -- API key not configured] "
        f"The {team} played {n_games} games in the {season} season "
        f"across {n_cities} cities. Of these, {dark_count} had zero "
        f"Green Book listings within one mile of the ballpark: "
        f"{dark_city_list}. The average safety score across all stops "
        f"was {avg_score:.2f}."
    )
    return narrative


# ---------------------------------------------------------------------------
# Claude API narrative generation
# ---------------------------------------------------------------------------

def call_claude_api(
    client: Any,
    system_prompt: str,
    user_message: str,
) -> str:
    """Call the Claude API and return the narrative text.

    Args:
        client: An initialized anthropic.Anthropic client.
        system_prompt: The system prompt string.
        user_message: The fully assembled user message.

    Returns:
        The narrative text from the API response.
    """
    response = client.messages.create(
        model=MODEL,
        max_tokens=MAX_TOKENS,
        temperature=TEMPERATURE,
        system=system_prompt,
        messages=[
            {"role": "user", "content": user_message},
        ],
    )

    # Extract text from the response content blocks
    text_parts: list[str] = []
    for block in response.content:
        if hasattr(block, "text"):
            text_parts.append(block.text)

    narrative = "\n".join(text_parts).strip()

    # Enforce style rule: no em dashes
    narrative = narrative.replace("\u2014", "--")
    narrative = narrative.replace("\u2013", "--")

    return narrative


def assign_confidence(narrative: str, route_records: list[dict[str, Any]]) -> str:
    """Assign a confidence level to a generated narrative.

    Heuristics:
    - If the narrative contains hedging language or speculative words, downgrade.
    - If all city names from route data appear in the narrative, upgrade.
    - Default to MODERATE for API-generated narratives since we cannot
      fully verify every claim without deeper NLP.

    Returns:
        One of "HIGH", "MODERATE", or "LOW".
    """
    lower = narrative.lower()

    # Check for speculative language
    speculative_markers = [
        "might have", "could have", "probably", "perhaps",
        "it is likely", "presumably", "one can imagine",
        "it seems", "may have", "possibly",
    ]
    speculation_count = sum(1 for m in speculative_markers if m in lower)

    if speculation_count >= 2:
        return "LOW"

    # Check how many route cities are mentioned
    cities_in_data = {r["city"].lower() for r in route_records}
    cities_mentioned = sum(1 for c in cities_in_data if c in lower)
    city_coverage = cities_mentioned / len(cities_in_data) if cities_in_data else 0

    if speculation_count == 0 and city_coverage >= 0.8:
        return "HIGH"

    return "MODERATE"


def count_dark_cities_in_narrative(
    narrative: str, dark_cities: list[str],
) -> int:
    """Count how many dark cities are explicitly named in the narrative."""
    lower = narrative.lower()
    count = 0
    for dc in dark_cities:
        # Match just the city name (before the comma/state)
        city_name = dc.split(",")[0].strip().lower()
        if city_name in lower:
            count += 1
    return count


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------

def main() -> None:
    """Run the M3 narrative generation pipeline."""
    log.info("Narrative generation (M3) -- Phase 5")

    # ------------------------------------------------------------------
    # 1. Load upstream data
    # ------------------------------------------------------------------
    log.info("Loading safety scores...")
    safety_games = load_safety_scores()
    log.info("Loaded %d game records with safety scores.", len(safety_games))

    schedule = load_schedule()
    clusters = load_route_clusters()

    # ------------------------------------------------------------------
    # 2. Load prompt template
    # ------------------------------------------------------------------
    system_prompt, user_template, prompt_hash = load_prompt_template()
    log.info("Prompt template loaded (hash: %s).", prompt_hash)

    # ------------------------------------------------------------------
    # 3. Check for API key
    # ------------------------------------------------------------------
    api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    use_api = bool(api_key)

    client = None
    if use_api:
        try:
            import anthropic  # noqa: F811
            client = anthropic.Anthropic(api_key=api_key)
            log.info("Anthropic client initialized (model: %s).", MODEL)
        except ImportError:
            log.warning(
                "anthropic package not installed. "
                "Falling back to placeholder narratives."
            )
            use_api = False
        except Exception as exc:
            log.warning(
                "Failed to initialize Anthropic client: %s. "
                "Falling back to placeholder narratives.",
                exc,
            )
            use_api = False
    else:
        log.info(
            "ANTHROPIC_API_KEY not set. "
            "Generating placeholder narratives (template-based)."
        )

    # ------------------------------------------------------------------
    # 4. Load existing narratives for caching
    # ------------------------------------------------------------------
    existing = load_existing_narratives()
    cached_keys: set[str] = set()
    cached_narratives: list[dict[str, Any]] = []

    if existing and "narratives" in existing:
        for entry in existing["narratives"]:
            key = get_team_season_key(entry["team"], entry["season"])
            cached_keys.add(key)
            cached_narratives.append(entry)
        log.info("Loaded %d cached narratives.", len(cached_keys))

    # ------------------------------------------------------------------
    # 5. Group games by team-season
    # ------------------------------------------------------------------
    team_seasons = build_team_seasons(safety_games)
    log.info("Found %d team-season combinations.", len(team_seasons))

    # ------------------------------------------------------------------
    # 6. Generate narratives
    # ------------------------------------------------------------------
    narratives: list[dict[str, Any]] = list(cached_narratives)
    generated_count = 0
    skipped_count = 0

    for ts_key, games in sorted(team_seasons.items()):
        team, season_str = ts_key.rsplit("|", 1)
        season = int(season_str)

        # Skip if already cached
        if ts_key in cached_keys:
            skipped_count += 1
            continue

        route_records, dark_cities, dark_count, avg_score = build_route_context(games)

        if not route_records:
            log.warning("No route records for %s %d -- skipping.", team, season)
            continue

        cluster_label = get_cluster_label(clusters, team, season)

        if use_api and client is not None:
            # Build the user message from the template
            route_json = json.dumps(route_records, indent=2)
            dark_cities_list_str = (
                "\n".join(f"- {dc}" for dc in dark_cities)
                if dark_cities
                else "None -- all stops had at least one listing within 1 mile."
            )
            user_message = user_template.format(
                team_name=team,
                season=season,
                route_json=route_json,
                dark_cities_list=dark_cities_list_str,
                cluster_label=cluster_label,
            )

            try:
                narrative_text = call_claude_api(client, system_prompt, user_message)
                source = "claude-api"
                confidence = assign_confidence(narrative_text, route_records)
                log.info(
                    "Generated narrative for %s %d (%d words, confidence: %s).",
                    team, season, len(narrative_text.split()), confidence,
                )

                # Rate limiting
                time.sleep(API_DELAY_SECONDS)

            except Exception as exc:
                log.error(
                    "API call failed for %s %d: %s. "
                    "Using placeholder instead.",
                    team, season, exc,
                )
                narrative_text = generate_placeholder_narrative(
                    team, season, route_records, dark_cities, dark_count, avg_score,
                )
                source = "placeholder"
                confidence = "HIGH"  # Placeholder is fully data-derived
        else:
            narrative_text = generate_placeholder_narrative(
                team, season, route_records, dark_cities, dark_count, avg_score,
            )
            source = "placeholder"
            confidence = "HIGH"  # Placeholder is fully data-derived

        word_count = len(narrative_text.split())
        dark_mentioned = count_dark_cities_in_narrative(narrative_text, dark_cities)

        entry: dict[str, Any] = {
            "team": team,
            "season": season,
            "narrative": narrative_text,
            "word_count": word_count,
            "dark_cities_mentioned": dark_mentioned,
            "confidence": confidence,
            "source": source,
            "model": MODEL if source == "claude-api" else None,
            "prompt_hash": prompt_hash if source == "claude-api" else None,
            "requires_oscar_review": True,
        }
        narratives.append(entry)
        generated_count += 1

    # ------------------------------------------------------------------
    # 7. Write output
    # ------------------------------------------------------------------
    output: dict[str, Any] = {
        "pipeline_version": "1.0",
        "model": MODEL,
        "generated_date": date.today().isoformat(),
        "total_narratives": len(narratives),
        "source_breakdown": {
            "claude-api": sum(1 for n in narratives if n["source"] == "claude-api"),
            "placeholder": sum(1 for n in narratives if n["source"] == "placeholder"),
        },
        "narratives": sorted(
            narratives,
            key=lambda n: (n["team"], n["season"]),
        ),
    }

    DATA_DIR.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    log.info(
        "Wrote %d narratives to %s (%d generated, %d cached).",
        len(narratives), OUTPUT_PATH, generated_count, skipped_count,
    )
    log.info("M3 narrative generation complete.")


if __name__ == "__main__":
    main()
