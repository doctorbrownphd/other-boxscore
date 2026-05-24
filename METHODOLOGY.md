# The Other Box Score — Global Methodology
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

## Versioning

This document is versioned. When methodology changes, the version is updated and the change is documented below.

| Version | Date | Change |
|---------|------|--------|
| 1.0 | May 2026 | Initial document |

