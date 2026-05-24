# The Crowd That Came -- Chapter Instructions

**Chapter:** 04
**Slug:** the-crowd-that-came
**Part:** Two -- The game they played
**Status:** In build
**Spec:** docs/chapter-04-the-crowd-that-came-spec.md

---

## What This Chapter Does

Documents the East-West All-Star Game attendance record, 1933--1948.
The dual-line chart (gold = East-West, slate = MLB) is the centerpiece.
Seven crossover years where the East-West outdrew the MLB All-Star Game.
Peak attendance 51,723 at Comiskey Park on August 1, 1943.

The original finding: the year-by-year dual-line attendance comparison
has never been presented as a designed, sourced, shareable data
visualization at museum quality. The fact is known to historians.
It has never been shown to a general audience in a form that makes
the argument in ten seconds.

---

## The Tonal Mandate

Part One ended in the dark. Chapter 04 is the first chapter that is
not about what was done to them. It is about what they built.

**Chapter 04 is not grief. It is not outrage. It is wonder. The data
earns the wonder. The wonder is documented.**

This must be protected through every build decision.

---

## Build Sequence

Per the spec, thirteen phases. Each phase has a gate.

| Phase | Deliverable | Gate | Status |
|-------|-------------|------|--------|
| 1 | Verify all attendance figures against Lester primary text | Oscar sign-off on every year-by-year figure | Pending |
| 2 | Cross-reference against Retrosheet and Baseball Almanac | Elias documents all discrepancies | Pending |
| 3 | Build year-by-year dataset as CC0 TSV | Both columns, all years 1933--1948 | Pending |
| 4 | Fig 01 dual-line chart | Oh wow test -- five agents, three must identify the chart moment | Pending |
| 5 | Fig 02 ballot display and pull quote | Oscar reviews Lester attribution | Pending |
| 6 | August 1, 1943 game section written from primary sources | Oscar reviews line by line | Pending |
| 7 | Celebrity layer documented from specific dated press sources | Oscar rejects any undated or unsourced appearance | Pending |
| 8 | Fig 03 roster display with HOF markers | Oscar verifies all HOF dates | Pending |
| 9 | HOF Gap calculation run and labeled | Elias reviews methodology | Pending |
| 10 | Fig 04 press split panel | Oscar sources every coverage claim to specific dated document | Pending |
| 11 | METHODOLOGY.md complete | Elias and Oscar approve | Pending |
| 12 | Citation block added | Gates verifies | Pending |
| 13 | Full agent review | All five verdicts before Gates merge | Pending |

---

## Data Sources

| Source | License | Notes |
|--------|---------|-------|
| Lester, "Black Baseball's National Showcase" (2020) | Research use | Primary canonical source for all attendance |
| Retrosheet Negro League All-Star Games | Public domain | Secondary verification |
| Baseball Almanac MLB ASG attendance | Public domain | MLB comparison figures |
| SABR game accounts | Open access | Supplementary sourcing |
| Chicago Defender historical archive | ProQuest | Primary source, Black press coverage |
| Pittsburgh Courier historical archive | ProQuest | Primary source, Wendell Smith coverage |
| Amsterdam News historical archive | ProQuest | New York perspective |
| Baseball Hall of Fame player records | Public domain | HOF cross-reference |

---

## Attendance Figure Note

Two figures appear in secondary sources for the peak: 51,723 (1943)
and 50,256 (1941). These are two different years. Both are correct.
1941 is the second-highest. 1943 is the record. Oscar verifies both
from Lester's primary text before either appears in the chapter.

---

## Rules

All rules from the root CLAUDE.md apply. Additionally:

- The chart ends at 1948. The collapse after integration belongs in a later chapter.
- Every attendance figure traces back to Lester (2020) as primary source.
- Every celebrity appearance sourced to a specific dated Black-press account.
- The ballot display is an evocation, not a reproduction of any copyrighted original.
- The Press section sources every coverage claim to a specific dated document.
- Documented absences (mainstream press) are cited as such with named papers and dates.
- AI-generated HOF Gap calculations are labeled as model output, not fact.
- No em dashes (U+2014). Use -- instead.
- The tone is wonder. Grief comes later.
