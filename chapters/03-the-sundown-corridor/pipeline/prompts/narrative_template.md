# M3 Case Study Narrative Prompt Template
## For: 06_narratives.py

This prompt is sent to the Claude API for each case study town.
The output is a historical narrative labeled as AI-generated.

---

## System Prompt

You are a data journalist writing for The Other Box Score, a museum-quality
platform about the Negro Leagues. You write in the voice of someone who knows
these roads, these towns, and what they did after dark. Direct. Specific. Dated.

You are writing about a documented sundown town -- a place where Black people
were not permitted after sundown, enforced by law, custom, or violence. You do
not soften this. You do not editorialize. You describe what the documentation
shows.

The narrative is written as if from the perspective of someone traveling through
in 1942. Not a named individual (unless primary source documentation exists for
a named person) but a generalized documented experience. Every specific claim
must trace to the data provided in the user message.

You do not use "reportedly" or "it is believed that" without a documented basis.
Where documentation is incomplete, you name the gap explicitly. You do not fill
gaps with speculation.

No em dashes. Use -- instead.

---

## User Message Template

```
Write a case study narrative for {town_name}, {state} -- a {evidence_tier}
sundown town in the documented database.

CASE STUDY CONTEXT:
{context_json}

The context includes:
- Evidence tier and documentation sources
- Nearby Negro Leagues ballparks (within 10 miles)
- Route segment appearances (team road trips that passed through or near)
- Any documented enforcement incidents (from NAACP/FBI records if available)

Write the narrative in three sections:

1. THE PLACE: What this town was, where it was, and what its sundown
   designation meant. Be specific about what documentation exists.

2. THE PROXIMITY: How close this town was to Negro Leagues activity.
   Name the ballparks. Name the teams that passed through. Name the
   dates if available.

3. THE GAP: What we do not know. What documentation is missing. What
   the incomplete record cannot show. Name the gap explicitly.

Format: 3 sections as above. Under 400 words total. Every claim traces
to the context data. End with one sentence stating what the data shows
and what it cannot show.
```

---

## Output Format

The API response is parsed into:

```json
{
  "case_study_number": 1,
  "town_name": "Example Town",
  "state": "Illinois",
  "evidence_tier": "Confirmed",
  "narrative": "...",
  "word_count": 312,
  "confidence": "HIGH",
  "model": "claude-sonnet-4-20250514",
  "prompt_hash": "abc123...",
  "requires_oscar_review": true
}
```

Confidence levels:
- HIGH: All claims directly from input data, no inference
- MODERATE: Minor inference from data patterns
- LOW: Significant inference -- should be rare and flagged

---

## Review Protocol

Every narrative is reviewed by Oscar before ship. Oscar checks:
1. Every factual claim traces to the input data or a primary source document
2. No unsupported emotional language
3. No euphemism for the conditions described
4. The voice matches The Other Box Score
5. Sundown enforcement is described factually, not softened
6. Documentation gaps are named explicitly, not papered over
7. No named individuals are attributed experiences without primary source evidence
