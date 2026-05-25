# The Other Box Score -- Global Methodology
## theotherboxscore.org

This document describes the data sources, analytical methods, and epistemological standards that govern the entire platform. Each chapter has its own METHODOLOGY.md with chapter-specific details. This document covers what is common across all chapters.

---

## Data Philosophy

Every dataset used is documented below with source, license, and known limitations. Every ML output is labeled with a confidence level. Every claim is citable.

Sources in priority order:
1. Public domain primary sources (newspaper archives, government records, original box scores)
2. CC0 licensed research databases (Seamheads via Lahman, LOC digitized collections)
3. Academic research with open access (SABR journal, peer-reviewed papers)
4. Derived original datasets produced by this project (documented and CC0 licensed)

Nothing behind a paywall. Nothing requiring institutional access to reproduce. The record should be reproducible by anyone with a laptop and time.

---

## Primary Data Sources

| Source | Coverage | License | Notes |
|--------|----------|---------|-------|
| Lahman Database (with Negro Leagues) | MLB + NL 1871-present | CC0 | Released Oct 2025. NL data via Seamheads. |
| Baseball Reference Negro Leagues DB | NNL/NAL 1920-1948 | Research use | 2,300+ players. Some seasons incomplete. |
| Seamheads Negro Leagues Database | 1900-1948 | Research use | Primary NL statistical source |
| Retrosheet | Play-by-play 1918+ | CC BY-NC-SA | Game-level detail |
| SABR Biographical Data | All eras | Research use | Birth dates, debut ages, timelines |
| Pittsburgh Courier (digitized) | 1910-1960 | Public domain | Primary Black press corpus |
| Chicago Defender (digitized) | 1910-1960 | Public domain | Secondary corpus |
| Library of Congress | Various | Public domain | Photographs, archival material |
| PICRYL | 1885-1952 | Public domain | NL images, no attribution required |
| Loewen Sundown Towns Database | 1890-1970 | Academic/open | Used in Ch. 03 |
| Negro Motorist Green Book | 1936-1966 | Public domain | Used in Ch. 02 |

---

## Statistical Standards

**Disputed statistics** are labeled as estimated, reconstructed, or disputed at every appearance. They are never presented as verified fact.

**Cross-league comparisons** document all assumptions required to make them and state the precision cost of those assumptions.

**ML outputs** carry uncertainty bounds. Point estimates without confidence intervals do not ship.

**Data gaps** are documented explicitly. Content that relies on incomplete data says so.

---

## Copyright and Public Domain

All photographs are public domain with complete provenance chains documented in `data/asset-register.json`.

Newspaper excerpts from the Pittsburgh Courier and Chicago Defender are used under established scholarly fair use principles, with full citation, and do not exceed what is necessary to establish the historical record.

No content produced by this platform makes fair use claims about commercially valuable intellectual property. When rights are unclear, the content does not ship.

---

## Coverage Map: Documented Completeness of the Negro Leagues Statistical Record

**Owner:** Elias

The Negro Leagues statistical record is not uniformly complete. The documented completeness varies by year and league, 1920-1948. This section documents that variation as platform-wide methodology infrastructure. Every chapter that uses Negro Leagues statistics references this section.

### The 72% Figure

MLB official historian John Thorn estimated that 72% of Negro Leagues records from 1920 to 1948 are included in the current integrated database (2024 MLB Statistical Review). This is an aggregate figure. The remaining 28% is undocumented: not because it didn't happen, but because nobody with institutional resources thought it was worth recording at the time.

This figure is cited every time it appears in any chapter. It is presented as Thorn's estimate, not as an exact measurement.

### Coverage by Year and League

The coverage is not uniform. Key patterns documented from Seamheads' own database coverage documentation:

- **Higher coverage:** The Negro National League in the late 1930s and early 1940s has relatively good box score recovery, because of consistent Black press reporting from cities with major Black newspapers (Chicago, Pittsburgh, New York).
- **Lower coverage:** Earlier years (1920-1925) and smaller leagues (Negro Southern League, several short-lived circuits) have significant gaps. The Eastern Colored League (1923-1928) has partial coverage.
- **Structural pattern:** The gaps are not random. They correlate with the institutional resources available to the Black press in those years and those cities. Communities with fewer resources left fewer records.

### Leagues Tracked

Seven leagues constitute the primary record:

| League | Years | Notes |
|--------|-------|-------|
| Negro National League (NNL) | 1920-1931 | First organized Negro League. Founded by Rube Foster. |
| Eastern Colored League (ECL) | 1923-1928 | Eastern counterpart to the NNL. |
| American Negro League (ANL) | 1929 | One season. Successor to the ECL. |
| East-West League (EWL) | 1932 | One season. |
| Negro National League (NNL-2) | 1933-1948 | Reorganized. Better coverage in later years. |
| Negro American League (NAL) | 1937-1948 | Southern and western teams. |
| Negro Southern League (NSL) | 1920-1951 | Intermittent operation. Lowest coverage. |

### What the Coverage Map Shows

A grid visualization of documented completeness, year on the X axis (1920-1948), league on the Y axis, with each cell representing the estimated box score recovery rate for that league-year. This visualization makes the structured incompleteness visible as a designed element rather than a stated claim.

The coverage map is a platform-level asset. It lives here in the global methodology because every chapter that cites Negro Leagues statistics must acknowledge which years and leagues its data draws from, and what the coverage limitations are for those specific league-years.

### Data Source for Coverage Estimates

Primary: Seamheads Negro Leagues Database coverage documentation (Gary Ashwill and Kevin Johnson, Agate Type Research). Supplemented by the 2024 MLB Statistical Review Committee findings. Where specific recovery rates by year and league are not published, the chapter uses the aggregate 72% estimate and notes the limitation.

### How Chapters Reference This Section

Every chapter that presents Negro Leagues statistics must:

1. State which years and leagues its data covers
2. Reference this section for the coverage context
3. Include the 72% figure with Thorn attribution where aggregate coverage is relevant
4. Label any claims that rely on league-years with low documented coverage

---

## Versioning

This document is versioned. When methodology changes, the version is updated and the change is documented below.

| Version | Date | Change |
|---------|------|--------|
| 1.0 | May 2026 | Initial document |
| 1.1 | May 2026 | Added Coverage Map section documenting record completeness by year and league |

