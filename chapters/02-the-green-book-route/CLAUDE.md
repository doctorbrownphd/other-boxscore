# The Green Book Route -- Chapter Instructions

**Chapter:** 02
**Slug:** the-green-book-route
**Part:** One -- The world they played in
**Status:** In build
**Spec:** docs/chapter-02-the-green-book-route-spec.md

---

## What This Chapter Does

Overlays every documented Negro Leagues game location (1936--1948) with
Green Book safe establishment listings from the same period. The
visualization shows where teams could stop and where they could not.
Cities with no Green Book listings go dark.

The original finding: no researcher has previously combined these two
datasets. The geographic overlay does not exist anywhere. This chapter
builds it and publishes it under CC0.

---

## Build Sequence

Per the spec, fourteen phases. Each phase has a gate.

| Phase | Deliverable | Gate | Status |
|-------|-------------|------|--------|
| 1 | Green Book OCR and geocoding pipeline | Success rate documented | Pending |
| 2 | Seamheads schedule extraction + ballpark geocoding | All locations resolved or flagged | Pending |
| 3 | Safety score calculation + JSON output | Elias reviews methodology | Pending |
| 4 | M1 Route clustering | Oscar reviews for historical plausibility | Pending |
| 5 | M3 AI narrative generation | Oscar reviews sample narratives | Pending |
| 6 | M4 Pattern detection | Elias reviews time-series output | Pending |
| 7 | Fig 01 Route animation | Oh wow test on dark city pulse | Pending |
| 8 | Fig 02 League map | Vera reviews at 375/768/1200px | Pending |
| 9 | Fig 03 Heat map conclusion | Elias verifies color encoding | Pending |
| 10 | Fig 04 Green Book facsimile | Oscar verifies PD status | Pending |
| 11 | Content sections written | Oscar reviews narrative claims | Pending |
| 12 | METHODOLOGY.md complete | Elias + Oscar approve | Pending |
| 13 | Citation block added | Gates verifies | Pending |
| 14 | Full agent review | All five verdicts, Gates merge | Pending |

---

## Data Sources

| Source | License | Notes |
|--------|---------|-------|
| Negro Motorist Green Book (LOC) | Public domain | OCR required |
| Seamheads Negro Leagues DB | Research use | Game schedule data |
| SABR Ballparks Database | Research use | Ballpark coordinates |
| OpenStreetMap / Nominatim | ODbL | Geocoding |
| Census Bureau historical | Public domain | Black population context |
| Sundown Towns (Loewen) | Academic/open | Cross-ref with Ch. 03 |

---

## ML Models

| ID | Name | Type | Status |
|----|------|------|--------|
| M1 | Route Clustering | HDBSCAN unsupervised | Not started |
| M2 | Safety Score | Composite index | Not started |
| M3 | Narrative Generator | Claude API | Not started |
| M4 | Pattern Detector | Time-series analysis | Not started |

---

## Rules

All rules from the root CLAUDE.md apply. Additionally:

- Every Green Book listing used must trace back to a specific LOC digitized edition
- Geocoding failures are documented, not silently dropped
- The safety score weights are stated explicitly in METHODOLOGY.md
- AI-generated narratives are labeled as such with confidence levels
- The "dark city" visual treatment (oxblood pulse, then nothing) is the primary "oh wow" moment
- OpenStreetMap usage requires ODbL attribution on every map view
