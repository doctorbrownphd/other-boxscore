"""
06_narratives.py -- M3: Generate case study narratives via Claude API.

Phase 10 of the Sundown Corridor pipeline.

Input:  data/case_studies.json        (from 05_case_studies.py)
        data/sundown_towns.json       (from 01_sundown_data.py)
        data/corridor_scores.json     (from 03_corridor_score.py)

Output: data/narratives.json
        One narrative per case study town. Each narrative is labeled
        as AI-generated with a confidence level.

Method: Claude API with structured prompts committed to
        pipeline/prompts/narrative_template.md.

Gate:   Oscar reviews all five narratives before publication.
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

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------

PIPELINE_DIR = Path(__file__).resolve().parent
CHAPTER_DIR = PIPELINE_DIR.parent
DATA_DIR = CHAPTER_DIR / "data"
PROMPT_DIR = PIPELINE_DIR / "prompts"
OUTPUT_PATH = DATA_DIR / "narratives.json"

DATA_DIR.mkdir(parents=True, exist_ok=True)

# ---------------------------------------------------------------------------
# API configuration
# ---------------------------------------------------------------------------

MODEL = "claude-sonnet-4-20250514"
MAX_TOKENS = 1500
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

def load_json_safe(path: Path, label: str) -> dict[str, Any] | list[Any] | None:
    """Load a JSON file, returning None if missing."""
    if not path.exists():
        log.warning("%s not found at %s.", label, path)
        return None
    with path.open("r", encoding="utf-8") as f:
        return json.load(f)


def load_case_studies() -> list[dict[str, Any]]:
    """Load case studies from Phase 9."""
    path = DATA_DIR / "case_studies.json"
    if not path.exists():
        raise FileNotFoundError(
            f"Case studies not found at {path}. "
            f"Run 05_case_studies.py first."
        )
    with path.open("r", encoding="utf-8") as f:
        data = json.load(f)
    studies = data.get("case_studies", [])
    log.info("Loaded %d case studies.", len(studies))
    return studies


def load_corridor_context() -> dict[str, Any]:
    """Load corridor scores for context in narrative generation."""
    data = load_json_safe(DATA_DIR / "corridor_scores.json", "Corridor scores")
    if data is None:
        return {}
    return data


def load_sundown_context() -> dict[str, Any]:
    """Load sundown towns data for context."""
    data = load_json_safe(DATA_DIR / "sundown_towns.json", "Sundown towns")
    if data is None:
        return {}
    return data


# ---------------------------------------------------------------------------
# Context assembly
# ---------------------------------------------------------------------------

def build_case_study_context(
    case_study: dict[str, Any],
    corridor_data: dict[str, Any],
    sundown_data: dict[str, Any],
) -> dict[str, Any]:
    """Assemble context data for a single case study narrative.

    Args:
        case_study: The case study record.
        corridor_data: Full corridor scores data.
        sundown_data: Full sundown towns data.

    Returns:
        Context dict with all data needed for the prompt.
    """
    town_name = case_study.get("town_name", "")
    state = case_study.get("state", "")

    # Find the town in the sundown data
    town_record: dict[str, Any] = {}
    for town in sundown_data.get("sundown_towns", []):
        if (town.get("town_name", "") == town_name
                and town.get("state", "") == state):
            town_record = town
            break

    # Find route segments that pass through this town
    route_appearances: list[dict[str, Any]] = []
    for entry in corridor_data.get("corridor_scores", []):
        for segment in entry.get("segments", []):
            for seg_town in segment.get("towns", []):
                if (seg_town.get("town_name", "") == town_name
                        and seg_town.get("state", "") == state):
                    route_appearances.append({
                        "team": entry.get("team", ""),
                        "season": entry.get("season", 0),
                        "origin": segment.get("origin_city", ""),
                        "destination": segment.get("dest_city", ""),
                        "date": segment.get("date", ""),
                    })

    return {
        "town_name": town_name,
        "state": state,
        "evidence_tier": case_study.get("evidence_tier", ""),
        "lat": case_study.get("lat", 0),
        "lon": case_study.get("lon", 0),
        "region": case_study.get("region", ""),
        "nearby_ballparks": case_study.get("nearby_ballparks", []),
        "documentation": case_study.get("documentation", {}),
        "town_record": town_record,
        "route_appearances": route_appearances[:10],  # Cap for prompt length
    }


# ---------------------------------------------------------------------------
# Placeholder narrative (no API key)
# ---------------------------------------------------------------------------

def generate_placeholder_narrative(
    context: dict[str, Any],
) -> str:
    """Generate a template-based placeholder narrative when no API key is set.

    Args:
        context: Case study context data.

    Returns:
        Placeholder narrative text.
    """
    town = context.get("town_name", "Unknown")
    state = context.get("state", "Unknown")
    tier = context.get("evidence_tier", "Unknown")
    n_ballparks = len(context.get("nearby_ballparks", []))
    n_routes = len(context.get("route_appearances", []))

    return (
        f"[placeholder -- API key not configured] "
        f"{town}, {state} is a {tier.lower()} sundown town in the "
        f"documented database. It appears within 10 miles of "
        f"{n_ballparks} Negro Leagues ballpark(s) and on "
        f"{n_routes} documented route segment(s). "
        f"Full narrative requires Oscar's primary source review."
    )


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

    text_parts: list[str] = []
    for block in response.content:
        if hasattr(block, "text"):
            text_parts.append(block.text)

    narrative = "\n".join(text_parts).strip()

    # Enforce style rule: no em dashes
    narrative = narrative.replace("\u2014", "--")
    narrative = narrative.replace("\u2013", "--")

    return narrative


def assign_confidence(narrative: str, context: dict[str, Any]) -> str:
    """Assign a confidence level to a generated narrative.

    Args:
        narrative: The generated narrative text.
        context: The case study context data.

    Returns:
        One of "HIGH", "MODERATE", or "LOW".
    """
    lower = narrative.lower()

    speculative_markers = [
        "might have", "could have", "probably", "perhaps",
        "it is likely", "presumably", "one can imagine",
        "it seems", "may have", "possibly",
    ]
    speculation_count = sum(1 for m in speculative_markers if m in lower)

    if speculation_count >= 2:
        return "LOW"

    town = context.get("town_name", "").lower()
    state = context.get("state", "").lower()

    if speculation_count == 0 and town in lower and state in lower:
        return "HIGH"

    return "MODERATE"


# ---------------------------------------------------------------------------
# Main pipeline
# ---------------------------------------------------------------------------

def main() -> None:
    """Run the M3 narrative generation pipeline for case studies."""
    log.info("Case study narrative generation (M3) -- Phase 10")

    # 1. Load upstream data
    case_studies = load_case_studies()
    corridor_data = load_corridor_context()
    sundown_data = load_sundown_context()

    # 2. Load prompt template
    system_prompt, user_template, prompt_hash = load_prompt_template()
    log.info("Prompt template loaded (hash: %s).", prompt_hash)

    # 3. Check for API key
    api_key = os.environ.get("ANTHROPIC_API_KEY", "").strip()
    use_api = bool(api_key)

    client = None
    if use_api:
        try:
            import anthropic
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

    # 4. Generate narratives
    narratives: list[dict[str, Any]] = []

    for case_study in case_studies:
        cs_num = case_study.get("case_study_number", 0)

        # Skip aggregate case study (handled differently)
        if case_study.get("type") == "aggregate":
            narratives.append({
                "case_study_number": cs_num,
                "town_name": "[AGGREGATE]",
                "type": "aggregate",
                "narrative": (
                    "[To be generated from aggregate corridor score data. "
                    "This is the chapter's closing number.]"
                ),
                "confidence": "N/A",
                "source": "pending",
                "requires_oscar_review": True,
            })
            continue

        context = build_case_study_context(case_study, corridor_data, sundown_data)

        if use_api and client is not None:
            context_json = json.dumps(context, indent=2, default=str)
            user_message = user_template.format(
                town_name=context["town_name"],
                state=context["state"],
                evidence_tier=context["evidence_tier"],
                context_json=context_json,
            )

            try:
                narrative_text = call_claude_api(client, system_prompt, user_message)
                source = "claude-api"
                confidence = assign_confidence(narrative_text, context)
                log.info(
                    "Generated narrative for case study #%d: %s, %s "
                    "(%d words, confidence: %s).",
                    cs_num, context["town_name"], context["state"],
                    len(narrative_text.split()), confidence,
                )
                time.sleep(API_DELAY_SECONDS)

            except Exception as exc:
                log.error(
                    "API call failed for case study #%d: %s. "
                    "Using placeholder.",
                    cs_num, exc,
                )
                narrative_text = generate_placeholder_narrative(context)
                source = "placeholder"
                confidence = "HIGH"
        else:
            narrative_text = generate_placeholder_narrative(context)
            source = "placeholder"
            confidence = "HIGH"

        narratives.append({
            "case_study_number": cs_num,
            "town_name": context["town_name"],
            "state": context["state"],
            "evidence_tier": context["evidence_tier"],
            "narrative": narrative_text,
            "word_count": len(narrative_text.split()),
            "confidence": confidence,
            "source": source,
            "model": MODEL if source == "claude-api" else None,
            "prompt_hash": prompt_hash if source == "claude-api" else None,
            "requires_oscar_review": True,
        })

    # 5. Write output
    output: dict[str, Any] = {
        "pipeline_version": "1.0",
        "model": MODEL,
        "generated_date": date.today().isoformat(),
        "total_narratives": len(narratives),
        "source_breakdown": {
            "claude-api": sum(1 for n in narratives if n.get("source") == "claude-api"),
            "placeholder": sum(1 for n in narratives if n.get("source") == "placeholder"),
            "pending": sum(1 for n in narratives if n.get("source") == "pending"),
        },
        "narratives": narratives,
    }

    with OUTPUT_PATH.open("w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    log.info("Wrote %d narratives to %s", len(narratives), OUTPUT_PATH)
    log.info("M3 narrative generation complete.")


if __name__ == "__main__":
    main()
