"""
M3: Narrative Generator -- Five Case Study Sundown Towns

Uses the Claude API to generate historically grounded narratives
for five case study sundown towns, synthesizing primary sources,
route data, and census context.

Each narrative:
  - 300-400 words
  - Grounded in documented primary sources
  - Written in the "Have you heard" register
  - Every factual claim attributed to a specific source
  - Labeled as AI-generated throughout

The narratives are drafts. Oscar reviews every sentence against
primary sources before publication.

Input:
  - chapters/03-the-sundown-corridor/data/case-studies.json

Output:
  - Updates case-studies.json with generated narratives

Confidence: AI-generated
"""

import anthropic
import json
import os
import time

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(BASE, "data", "case-studies.json")) as f:
    data = json.load(f)

client = anthropic.Anthropic()

SYSTEM_PROMPT = """\
You are a narrative writer for The Other Box Score, a museum-quality \
data journalism platform about the Negro Leagues. Your register is \
conversational, direct, slightly accusatory, never condescending. \
You write as if the reader has never heard these facts and should \
be unsettled by them.

Rules:
- No em dashes. Use commas, colons, or restructure.
- Every factual claim must be attributable to one of the provided sources.
- Do not invent facts. If a source does not support a claim, do not make it.
- Do not use euphemism for segregation or exclusion.
- The subjects are the protagonists. Black players are never supporting \
characters in a white baseball narrative.
- Label the confidence of each claim inline: [Documented], [Verified], \
or [Reported] per the provided evidence tier.
- The tone is controlled anger, not grief. The data speaks.
"""


def build_prompt(study):
    """Build the generation prompt for one case study town."""
    town = study["town"]
    state = study["state"]
    evidence = study["sundown_status"]
    park = study["nearest_ballpark"]
    team = study["nearest_team"]
    dist = study["ballpark_distance_miles"]
    corridors = study.get("corridors_detail", [])
    sources = study.get("primary_sources_found", [])
    angle = study.get("narrative_angle", "")

    # Format sources
    source_block = ""
    for s in sources:
        source_block += f"\nSource: {s['source']}"
        if s.get("url"):
            source_block += f"\nURL: {s['url']}"
        if s.get("key_facts"):
            for fact in s["key_facts"]:
                source_block += f"\n  - {fact}"
        source_block += f"\nConfidence: {s['confidence']}\n"

    # Format corridor context
    corridor_block = ""
    for c in corridors:
        corridor_block += (
            f"\n  - {c['corridor']}: danger score {c['danger']}, "
            f"{c['distance_miles']} miles from route centerline"
        )

    return f"""\
Write a 300-400 word narrative about {town}, {state} as a documented \
sundown town in the path of Negro Leagues travel corridors.

TOWN: {town}, {state}
SUNDOWN STATUS: {evidence}
NEAREST BALLPARK: {park} ({dist} miles)
NEAREST TEAM: {team}

EDITORIAL ANGLE: {angle}

CORRIDOR CONTEXT (this town appears in these travel corridors):
{corridor_block}

PRIMARY SOURCES:
{source_block}

REQUIREMENTS:
1. Open with a specific, sourced fact about the town. Not a question.
2. Connect the town to the specific Negro Leagues team that traveled \
past it, with the distance.
3. Include at least 3 specific documented facts from the sources above.
4. Mark each claim with its confidence level: [Documented], [Verified], \
or [Reported].
5. Close with the distance. The number is the argument.
6. 300-400 words. No em dashes. No euphemism.
7. Do not write "Have you heard" -- that is for chapter openers only.
8. Write in present tense for the historical facts ("is", "sits", "stands").
"""


# --- Generate narratives ---

print("Generating narratives for 5 case study towns...")
print("=" * 50)

for study in data["case_studies"]:
    town = study["town"]
    state = study["state"]

    if study.get("narrative_status") != "Primary sources identified, narrative generation ready":
        print(f"\nSKIP {town}, {state}: not ready")
        continue

    print(f"\n[{study['id']}/5] {town}, {state} ...", end=" ", flush=True)

    prompt = build_prompt(study)

    response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=800,
        system=SYSTEM_PROMPT,
        messages=[{"role": "user", "content": prompt}],
    )

    narrative = response.content[0].text.strip()
    word_count = len(narrative.split())

    study["narrative"] = narrative
    study["narrative_word_count"] = word_count
    study["narrative_confidence"] = "AI-generated"
    study["narrative_model"] = "claude-sonnet-4-20250514"
    study["narrative_generated_date"] = "2026-05-25"
    study["narrative_status"] = "Generated, pending Oscar review"
    study["oscar_approval"] = "PENDING"

    print(f"{word_count} words")
    print(f"  Preview: {narrative[:120]}...")

    time.sleep(1)

# --- Save ---

with open(os.path.join(BASE, "data", "case-studies.json"), "w") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("\n" + "=" * 50)
print("All narratives generated and saved to case-studies.json")
print("Status: PENDING Oscar review for every narrative")
print()
for study in data["case_studies"]:
    print(
        f"  {study['town']}, {study['state']}: "
        f"{study.get('narrative_word_count', 0)} words, "
        f"{study.get('narrative_status', 'unknown')}"
    )
