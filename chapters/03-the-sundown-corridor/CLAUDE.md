# The Sundown Corridor -- Chapter Instructions

**Chapter:** 03
**Slug:** the-sundown-corridor
**Part:** One -- The world they played in
**Status:** In build
**Spec:** docs/chapter-03-the-sundown-corridor-spec.md

---

## What This Chapter Does

Overlays every documented Negro Leagues game location (1936--1948) with
the Scientific Data (2025) geocoded sundown towns dataset. The
visualization shows where documented sundown towns were relative to
every game location and every travel corridor. The toggle is the finding.

The original finding: the combination of the geocoded sundown towns
dataset with Seamheads Negro Leagues schedule data does not exist
anywhere. The resulting overlay -- showing the proximity and density of
documented sundown towns to every game location and travel corridor --
is original work.

---

## Build Sequence

Per the spec, fifteen phases. Each phase has a gate.

| Phase | Deliverable | Gate | Status |
|-------|-------------|------|--------|
| 1 | Download and process Scientific Data (2025) geocoded dataset | Evidence quality tiers documented, coordinate system verified | Pending |
| 2 | Join sundown towns to game locations -- proximity calculation | Elias reviews spatial join methodology | Pending |
| 3 | Period-accurate road routing for documented schedules | Routing methodology documented in METHODOLOGY.md | Pending |
| 4 | Corridor Danger Score calculation with uncertainty bounds | Elias reviews score construction and bounds | Pending |
| 5 | M2 counterfactual route analysis | Labeled as model output throughout | Pending |
| 6 | Fig 01 corridor map with toggle mechanic | Oh wow test on toggle reveal | Pending |
| 7 | Fig 02 route danger map | Vera reviews color gradient against platform system | Pending |
| 8 | Fig 03 proximity score chart | Vera reviews accessibility at 375px | Pending |
| 9 | Five case study towns selected and documented | Oscar reviews all primary source citations | Pending |
| 10 | M3 AI narratives generated and reviewed | Oscar reviews all five narratives before publication | Pending |
| 11 | Content sections written | Oscar reviews all historical claims | Pending |
| 12 | The Schedule Question section written | Oscar reviews for overreach beyond documented facts | Pending |
| 13 | METHODOLOGY.md complete with incompleteness statement | Elias and Oscar both approve | Pending |
| 14 | Citation block added | Gates verifies | Pending |
| 15 | Full agent review and oh wow test | All five verdicts, Gates merge | Pending |

---

## Data Sources

| Source | License | Notes |
|--------|---------|-------|
| Historical Sundown Towns (Scientific Data, 2025) | CC-BY | 2,248 documented places, geocoded, evidence-rated |
| Loewen/Berrey Sundown Towns Database | Academic research use | Primary source for the Scientific Data dataset |
| Seamheads Negro Leagues Database | Research use | Game schedule data -- already assembled from Ch. 02 |
| SABR Ballparks Database | Research use | Ballpark coordinates -- already geocoded from Ch. 02 |
| Historical US road network (USGS/LOC) | Public domain | Period-accurate routing for 1920--1950 |
| US Census historical data | Public domain | Black population by place -- context layer |
| NAACP anti-lynching records | Public domain | Documented incidents for case study towns |
| FBI historical records | FOIA/public domain | Select documented incidents in sundown corridor towns |

---

## ML Models

| ID | Name | Type | Status |
|----|------|------|--------|
| M1 | Corridor Danger Score | Spatial composite index | Not started |
| M2 | Route Optimizer (Counterfactual) | Historical route comparison | Not started |
| M3 | Narrative Generator | Claude API | Not started |

---

## Rules

All rules from the root CLAUDE.md apply. Additionally:

- Every sundown town used must trace back to the Scientific Data (2025) dataset with evidence tier
- Evidence quality tiers are labeled on every data point: Confirmed (full opacity), Probable (70%), Possible (40%)
- The incompleteness caveat must appear prominently in the chapter, not as fine print
- AI-generated narratives are labeled as such with confidence levels
- Every Corridor Danger Score shows both a lower bound (confirmed-only) and an upper bound (extrapolated)
- The counterfactual route analysis (M2) is labeled as model output throughout -- it is not a historical claim
- Case study claims are sourced to primary documents; "reportedly" is not acceptable without a documented basis
- The map toggle mechanic ("Show the corridor") is the primary oh wow moment -- the reader activates it
- No em dashes (U+2014). Use -- instead.
