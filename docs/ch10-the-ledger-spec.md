# The Ledger -- Chapter 10
## The Other Box Score · Full Specification v1.0

**Series:** theotherboxscore.org
**URL:** theotherboxscore.org/chapters/the-ledger/
**GitHub:** other-boxscore/chapters/10-the-ledger/
**Part:** Three -- The game they were kept from
**Position:** Chapter 10 of 15
**License:** MIT (code) · CC0 (data)
**Status:** SPEC v1.0
**Last updated:** May 2026

---

## One-Line Thesis

A WAR and Hall of Fame methodology built specifically for the integrated record, calibrated to handle the structural conditions of Negro Leagues play that the existing JAWS framework was not designed for, and applied transparently to every player on both sides of the color line.

---

## Why This Chapter Exists

This is the platform's engine chapter. Chapters 5 through 9 used WAR figures and HOF rankings without showing how they were derived. Chapter 10 shows. The chapter exists because the rest of the platform depends on it, and because the most common defensible critique of platform-wide statistical claims is "your numbers aren't justified." This chapter is the justification.

The chapter is called The Ledger because it functions the way the Birmingham Black Barons ledger functioned for Chapter 8: it is the source-of-truth document. Every WAR figure shown elsewhere on the platform traces back here. Every HOF ranking traces back here. The methodology is documented openly, the code is open source, the data is CC0, and the entire production engine can be reproduced by any researcher.

The chapter does not invent WAR. Seamheads and Baseball Reference already produce per-season Negro Leagues WAR, calibrated through Ashwill and Johnson's normalization methodology. The chapter builds on that foundation. What the chapter contributes is:

First, a Negro-Leagues-aware extension of JAWS that handles seasonal-length variation. The Seamheads team has documented that Negro Leagues teams played 30 to 80 league games per season versus 154 in MLB, and that this seasonal-length disparity makes raw career-WAR comparisons unfair to Negro Leagues players. The chapter operationalizes the rate-based JAWS that has been proposed but never built at scale.

Second, a uniform integrated leaderboard. Not Negro Leagues separate from MLB. Not adjusted-with-asterisks. A single ranked table per position, with both populations of players, using the same methodology applied to the same units of analysis.

Third, an open methodology with sensitivity analysis. The chapter does not hide the methodological choices. It surfaces them, lets the reader see how the rankings shift under alternative assumptions, and documents which findings are robust to assumption changes and which are not.

This chapter is the platform's argument that the comparison is makeable. The methodology is what makes it makeable. The chapter is what shows the methodology.

---

## The Hook

**The numbers exist. The methodology has not.**

Gary Ashwill and Kevin Johnson built the Seamheads Negro Leagues Database over fifteen years. They normalized statistics across leagues, parks, and opponent strength. They produced per-season WAR for every documented Negro Leagues player. Baseball Reference incorporated their work in 2020. FanGraphs incorporated it in 2023. Major League Baseball officially recognized it in 2024.

But the comparison question was never fully answered. Josh Gibson's career WAR is 41.5. Ty Cobb's is 151.5. The first reading says Cobb was nearly four times more valuable. The reading is wrong, and the reason it is wrong is that Cobb played four times as many league games as Gibson. The seasons are not the same unit.

The standard Hall of Fame methodology, JAWS, averages career WAR with seven-year peak WAR. It was built for the MLB record. It does not handle the structural conditions of Negro Leagues play. Applied without adjustment, it understates Negro Leagues players by exactly the seasonal-length disparity their leagues operated under.

This chapter builds the alternative. Rate-based career and peak metrics. Position-by-position integrated leaderboards. The methodology open, the data open, the assumptions auditable. The chapter shows how the engine works. The next chapter, Cooperstown, applies it.

---

## Original Findings (the "oh wow" moments)

### Finding 1 -- The Rate-Based Leaderboard
A complete WAR-per-plate-appearance and WAR-per-game leaderboard, integrated across MLB and Negro Leagues records, for every position. This is the leaderboard that has been theorized in Seamheads blog posts but never produced as a finished platform artifact. The top of this leaderboard contains names like Josh Gibson, Oscar Charleston, Babe Ruth, Mike Trout, and Honus Wagner, ranked by the same methodology. The fact that the ranking is integrable at all is the finding.

### Finding 2 -- The Adjusted JAWS Distribution
For every Hall of Fame eligible position player and pitcher in history, a recalculated JAWS score using the platform's rate-adjusted methodology. Compared side by side with the standard JAWS distribution. Players whose rankings move significantly under the adjustment are identified explicitly.

The headline pattern: Negro Leagues players move up substantially. A small number of MLB compilers (players who accumulated large career WAR through longevity rather than peak production) move down. The pattern is what JAWS was designed to do at MLB; the platform extends that logic across the color line.

### Finding 3 -- The Confidence Bands
Every player's WAR figure on the platform is reported with an uncertainty band that reflects the underlying data completeness. A Negro Leagues player from the well-documented 1940s NAL has a tight band. A player from the sparsely-documented 1920s ECL has a wider band. An MLB player has the standard bWAR uncertainty bands. The figure is not a point estimate; it is a credible interval, and the platform shows the interval everywhere.

This is the methodological honesty move that no existing baseball reference does. Baseball Reference shows point estimates. Seamheads shows point estimates. The chapter argues that the right way to present heterogeneous-quality data is to surface the heterogeneity, not paper over it.

### Finding 4 -- The Methodology Sensitivity
A reader-facing dashboard that allows the methodology to be adjusted: the JAWS peak window length, the rate-versus-count balance, the Negro Leagues seasonal-equivalent assumption, the MLE conversion factor (if applied), the defensive component weighting. The reader sees how the integrated leaderboard shifts under different methodological choices.

This is the chapter's most important visualization for the same reason the Chapter 8 sensitivity dashboard was important: it is the chapter's good-faith engagement with its own methodology. The leaderboard is not produced from a single combination of choices. It is produced from a documented combination, with all other combinations available to the reader.

### Finding 5 -- The Comparable Universe Analysis
A clustering finding. The platform applies dimensionality reduction (UMAP) over the multi-component WAR space (offensive, defensive, baserunning, positional) to every player across both records. The resulting embedding shows which Negro Leagues players occupy similar regions of the value space as which MLB players. Josh Gibson clusters with Mike Piazza and Johnny Bench. Cool Papa Bell clusters with Lou Brock. Oscar Charleston clusters with Willie Mays. The clustering is not a ranking. It is a similarity map, and it gives the comparison question a different vocabulary than ranking alone provides.

---

## The Data

### Foundational Sources

- **Seamheads Negro Leagues Database.** The complete normalized statistical record for every documented Negro Leagues player-season. Ashwill and Johnson's normalization methodology is the foundation; the chapter builds on it rather than replacing it.
- **Baseball Reference integrated record (2020 incorporation).** Per-season WAR for every Negro Leagues player as integrated into the MLB record. Source for the platform's bWAR figures.
- **FanGraphs Negro Leagues player pages (2023 incorporation).** Source for fWAR figures where available, for cross-reference and uncertainty band construction.
- **Baseball Reference complete MLB historical record.** Per-season WAR for every MLB player across the full history of organized professional baseball.

### Methodology Sources

- **Ashwill, Gary. "Normalizing Negro League Statistics" (Seamheads, 2011).** The foundational methodology for park, opponent, and league adjustment that produces per-season Seamheads WAR. The chapter cites it as inherited methodology.
- **Ashwill, Gary. "Building the Seamheads Negro Leagues Database."** The accompanying essay for the FanGraphs integration. Documents the exhibition versus league game distinction that shapes which seasons enter the per-season WAR calculation.
- **Hirsch, Dan. "Major League Equivalencies for the Negro Leagues" (Seamheads, 2020).** The MLE methodology applicable for projecting Negro Leagues performance into the MLB context, used as an optional alternative methodology in the sensitivity dashboard.
- **Jaffe, Jay. JAWS methodology** (Baseball Reference and *The Cooperstown Casebook*, 2017). The foundational JAWS methodology that the platform extends.
- **The 2022 SABR paper "Assessing Hall of Fame Worthiness: Flaws in JAWS."** Establishes the documented limitations of JAWS that the platform's extension addresses.

### Defensive Component Sources

- **Total Zone (TZ) data** for the pre-2003 era, including all Negro Leagues seasons. The Baseball Reference standard for historical defensive evaluation.
- **Defensive Runs Saved (DRS)** for the post-2003 MLB era. Standard JAWS uses both depending on era.
- **Seamheads positional play documentation** for cases where defensive value is heavily inferred rather than directly measured. Flagged with appropriate uncertainty bands.

### Replication Sources

- **All input data files used by the platform are published under CC0.** Researchers can reproduce every platform figure from the published data plus the published methodology. This is non-negotiable.

---

## The ML / AI Pipeline

Six models. The chapter is the platform's deepest ML investment, because it is the engine that produces the figures used elsewhere.

### Model 1 -- Rate-Normalized WAR Engine

**Problem:** Per-season Seamheads-derived WAR uses seasonal counts. Comparing across leagues with different season lengths produces misleading totals. The platform needs WAR expressed as rates (per plate appearance, per inning, per defensive opportunity) so cross-league comparisons are unit-equivalent.

**Approach:** A deterministic computation, not a learned model. For each player-season, the platform computes:
- WAR per 600 plate appearances (the modern full-season equivalent)
- WAR per 162 team games
- WAR per 100 innings (for pitchers, in addition to per-start metrics)

These rate figures are published alongside the existing seasonal WAR figures. The original Seamheads and Baseball Reference figures are preserved unchanged. The platform adds the rate normalization as additional columns.

**Output:** Per player-season, rate-normalized WAR figures with documented denominators.

**Confidence label:** The rate figures inherit the uncertainty of the underlying per-season WAR. The denominators (plate appearances, games, innings) are themselves data-completeness-dependent; this dependence is documented per player-season.

**Why this matters:** This is the precondition for Findings 1 and 2. Without rate normalization, every cross-league comparison is unfair to Negro Leagues players. With it, the comparisons become unit-equivalent and defensible.

### Model 2 -- Extended JAWS Calculation

**Problem:** Standard JAWS averages career WAR with seven-year peak WAR. Negro Leagues careers had different shape and length constraints. The platform needs a JAWS extension that handles these constraints.

**Approach:** The platform produces three JAWS variants for every player:

- **Standard JAWS.** Career bWAR averaged with seven highest seasonal bWAR. The Jaffe benchmark, reproduced unchanged.
- **Rate JAWS.** Career rate-WAR (per 600 PA) averaged with seven-year peak rate-WAR. The platform's primary extension.
- **Adjusted Career JAWS.** Career bWAR projected to MLB-equivalent season counts using a documented seasonal-equivalence assumption, averaged with seven-year peak bWAR (unchanged). This is the variant that most directly answers "what would the career totals have been at MLB season length."

Each variant uses the same peak-seven-season conceptual framework. Each variant is reported with the others to surface the methodological dependence.

**Output:** Per player, three JAWS values with documentation of which inputs differ.

**Confidence label:** The adjusted-career variant carries an additional uncertainty from the seasonal-equivalence assumption. This is documented and surfaced in the sensitivity dashboard.

**Why this and not just one variant:** The chapter argues that there is no single right answer. There are multiple defensible methodologies. Showing three variants forces the reader to confront the methodological choice rather than accepting it implicitly.

### Model 3 -- Uncertainty Quantification

**Problem:** Per-season WAR figures from Seamheads and Baseball Reference are reported as point estimates. The underlying data quality varies substantially across player-seasons. The chapter needs a principled method for attaching uncertainty bands to every figure.

**Approach:** A Bayesian hierarchical model with the following structure:

For each player-season, the observed WAR is treated as a noisy measurement of the true underlying value. The noise variance depends on:
- League-year box score coverage percentage (documented by Seamheads)
- Number of league games for which the player has documented appearances
- Whether the season includes Seamheads-documented exhibition games (excluded from WAR, but their existence indicates higher overall game volume that may shift true production)
- Whether the season is from a well-documented league-year (1930s NNL high-coverage) or a sparsely-documented league-year (1920s ECL low-coverage)

The posterior distribution of true career WAR is constructed by combining the per-season posteriors, properly accounting for the structure of dependence.

**Output:** For each player, a 90% credible interval around career WAR, peak WAR, and JAWS variants.

**Confidence label:** The model's assumptions about coverage-to-uncertainty mapping are themselves uncertain; the sensitivity dashboard exposes this.

**Why Bayesian:** The data quality varies hierarchically (within-season, across-seasons, across-leagues) and the priors are informative. A frequentist confidence interval approach would either understate uncertainty or require ad-hoc adjustments. The Bayesian framework handles the structure naturally.

### Model 4 -- Position Assignment

**Problem:** JAWS compares players within positions. Negro Leagues players, particularly utility players and barnstorming-era multi-position players, do not have clean position assignments. The platform needs a defensible position assignment for every player.

**Approach:** Each player is assigned to the position at which they accumulated the most WAR (the standard JAWS approach). For Negro Leagues players where positional WAR decomposition is not directly available from Seamheads, the assignment uses documented innings/games-at-position data.

For players with substantial WAR at two positions (a common pattern in Negro Leagues), the platform also produces a "secondary position" entry that allows the player to appear on both leaderboards. This is a deliberate departure from standard JAWS, which forces single-position assignment.

**Output:** Per player, primary position and (where applicable) secondary position.

**Confidence label:** Position assignment is flagged when the WAR distribution is near-tied across positions. Readers see this flag explicitly.

### Model 5 -- Comparable Universe Embedding

**Problem:** Ranking is one comparison. Similarity is another. The chapter wants to give readers a vocabulary beyond "X is better than Y" that includes "X is similar to Y."

**Approach:** A UMAP dimensionality reduction over the multi-component WAR space. Each player is represented as a vector of:
- Career offensive WAR (rate-normalized)
- Career defensive WAR (rate-normalized)
- Career baserunning WAR (rate-normalized)
- Positional adjustment (offensive position vs. catcher vs. up-the-middle defender)
- Peak rate-WAR
- Career-rate-to-peak-rate ratio
- Career length (rate-normalized seasons of qualified play)

UMAP produces a two-dimensional embedding that preserves local similarity structure. Players cluster by similarity in the underlying multi-dimensional value space.

**Output:** A 2D embedding of every player in the integrated record, color-coded by era and position, with explicit cluster annotations for the players the chapter's narrative highlights (Gibson-Piazza-Bench, Charleston-Mays, Bell-Brock, etc.).

**Confidence label:** UMAP embeddings depend on hyperparameters (n_neighbors, min_dist). The chapter documents the chosen values and shows the embedding under alternative parameter choices in the methodology document.

**Why this matters:** This is the visualization that does what the chapter cannot do with leaderboards alone. It says "these are the comparable players" rather than "this player is ranked Nth." The ranking is one answer. The clustering is a different answer to a different question.

### Model 6 -- Hall of Fame Probability Estimation

**Problem:** The chapter is the engine for Chapter 11 (Cooperstown), which produces ranked HOF candidates. The engine needs to convert JAWS-and-similar figures into induction probability estimates.

**Approach:** A calibrated logistic regression. Training data: all HOF-eligible players in history, with binary outcome (inducted by BBWAA or Veterans Committee). Features: rate JAWS, adjusted career JAWS, position, era, peak rate WAR, career length, MLB or Negro Leagues primary classification (controlled-for, not predictive).

The model is calibrated using Platt scaling against actual induction rates within deciles of the predicted probability.

**Output:** Per HOF-eligible player, a calibrated induction probability. Compared to actual induction status.

**Confidence label:** The model's predictions for Negro Leagues players involve out-of-distribution extrapolation in some features (peak rate WAR for the very top players is higher than the bulk of MLB training data). This is documented per-player when applicable.

**Why this matters:** This is the engine that produces Chapter 11's ranked HOF candidates. The chapter must build it transparently here so Chapter 11's rankings have a documented basis.

---

## The Visualizations

Five visualizations.

### Fig 01 -- The Integrated Leaderboard

**The chapter's central artifact.**

A sortable, filterable table containing every qualified player in the integrated record. Default columns:

- Player
- Era (1900s-1910s / Negro Leagues + early-MLB / 1947-1976 / 1977-2002 / 2003+)
- Position (primary)
- Career WAR (with uncertainty band visible on hover)
- Career rate WAR (per 600 PA)
- Peak rate WAR (best 7 seasons)
- Standard JAWS
- Rate JAWS
- HOF status (inducted / not inducted / not yet eligible)

The default sort is Rate JAWS, descending. The default filter shows all positions. Readers can filter by position, era, HOF status, and (toggle) Negro Leagues vs. MLB vs. both.

The integration is the point. The reader cannot filter to "only MLB" by default without an explicit click. The default is integrated.

**Tech:** Pre-computed JSON. Virtualized table component for performance. URL-shareable filter and sort state.

**Mobile behavior:** Table collapses to card view at 768px. Each card shows player, position, era, Rate JAWS, and HOF status, with tap-to-expand for full breakdown.

**Oh wow test:** The reader sorts by Rate JAWS and sees Josh Gibson at or near the top of the catcher position, ranked by the same methodology that puts Mike Piazza and Johnny Bench just below. The reader sees Oscar Charleston ranked alongside Mays, Cobb, and Mantle in center field. The integration is the argument.

### Fig 02 -- The Standard JAWS vs. Rate JAWS Distribution

**The methodology comparison.**

A scatter plot where each point is a player. X-axis: standard JAWS. Y-axis: rate JAWS. The diagonal line represents perfect agreement between the two metrics.

Points above the line: players who score higher on rate JAWS than on standard JAWS. Predominantly Negro Leagues players whose career totals were suppressed by short seasons.

Points below the line: players who score lower on rate JAWS than on standard JAWS. Predominantly MLB compilers whose career totals reflect longevity more than peak.

The Negro Leagues players are color-coded distinctly. The visual confirms what the methodology is designed to do: re-weight career-versus-peak in a way that reduces the unfair penalty on shorter careers.

**Annotation:** The five players who move most upward and the five who move most downward are labeled explicitly.

**Tech:** D3 scatter with hover-to-identify. Static data.

**Mobile behavior:** Plot remains usable at 375px. Hover replaced with tap-to-reveal on touch devices.

### Fig 03 -- The Confidence Band Visualization

**The uncertainty made visible.**

For a curated set of high-relevance players (the top 50 by Rate JAWS), a horizontal lollipop chart. Each player's point estimate is the lollipop head. The lollipop "stick" is the 90% credible interval from Model 3.

Negro Leagues players from sparsely-documented eras have visibly wider intervals than MLB players or Negro Leagues players from well-documented eras.

The reader sees the data-quality variance explicitly. The variance is part of the argument: the platform does not paper over uncertainty.

**Annotation:** Each player's row is annotated with the data-coverage percentage (the share of their career for which Seamheads has documented box scores).

**Tech:** D3 lollipop with confidence interval. Static.

**Mobile behavior:** Lollipops stack vertically on mobile. Confidence intervals remain visible.

### Fig 04 -- The Comparable Universe Map

**The similarity embedding.**

The Model 5 UMAP output rendered as a 2D scatter plot. Each player is a point. Points are color-coded by position (catcher, infield, outfield, pitcher). Points are sized by Rate JAWS.

Notable clusters are pre-annotated:

- The Gibson-Piazza-Bench-Cochrane catcher cluster
- The Charleston-Mays-Cobb-Trout center field cluster
- The Bell-Brock-Henderson outfield speed cluster
- The Paige-Johnson-Williams ace pitcher cluster (Walter Johnson, not Smokey Joe, but spec is to add Smokey Joe as well)

Readers can hover or tap any point to see player identity and basic stats. Readers can switch the coloring between position and era to see how the embedding structure changes.

**Tech:** D3 scatter with WebGL acceleration for the full integrated player set. Hover-to-identify. Toggle for color encoding.

**Mobile behavior:** Embedding plot zooms and pans on touch. Pre-annotated cluster labels remain visible at all zoom levels.

### Fig 05 -- The Methodology Sensitivity Dashboard

**The methodology made interactive.**

Reader controls for:

1. **JAWS peak window length:** 5 / 7 (default) / 10 seasons (radio)
2. **Rate-versus-count balance:** 100% rate / 50-50 (default) / 100% count (slider)
3. **Negro Leagues season equivalent:** assume actual / project to 162-game equivalent (radio)
4. **MLE conversion:** off (default) / on (toggle)
5. **Defensive component weighting:** standard JAWS / rate-adjusted (default) / downweighted (radio)

Above the controls: the top-10 integrated leaderboard for the selected position updates in real time.

Below the controls: a "rank stability" indicator showing how much player rankings move under the chosen adjustment, expressed as the Spearman rank correlation between the current ranking and the default ranking.

The reader cannot dismiss the chapter as cherry-picking the methodology because the methodology is exposed. The reader can adjust every choice and see the result.

**Tech:** Pre-computed lookup grid. The top-10 for every combination of the five controls and every position is computed at build time and stored as JSON. The dashboard is a lookup, not a live computation.

**Mobile behavior:** Controls collapse into an accordion. Top-10 leaderboard remains the primary display.

---

## The Asset Register

**Archival images required (chapter is methodology-heavy, image-light):**

- Ashwill and Johnson portraits or photos for the methodology attribution panel (consent and licensing required; alternative: text attribution only)
- Larry Lester portrait for the inherited-methodology attribution panel
- Seamheads logo (with permission)
- Baseball Reference logo (with permission)
- FanGraphs logo (with permission)
- Sample box score from a well-documented Negro Leagues game and a sparsely-documented game, side by side, as a visual demonstration of the data-quality variance the chapter addresses

**Documentation requirements:**

Oscar verifies permissions for all third-party logos and portraits. The chapter's methodological dependence on prior work is acknowledged explicitly in both narrative and citation. Logos appear only with documented permission; if permission cannot be obtained, text attribution stands.

**Pre-computed data files:**

- `data/per-season-war-integrated.json` -- Per player-season, the platform's WAR figures including rate-normalized variants. The foundational data file the rest of the platform depends on.
- `data/career-war-with-bands.json` -- Per player, career WAR figures with 90% credible intervals from Model 3.
- `data/jaws-three-variants.json` -- Per player, standard JAWS, rate JAWS, and adjusted career JAWS.
- `data/positional-assignments.json` -- Per player, primary and (where applicable) secondary position with rationale.
- `data/embedding-coordinates.json` -- Per player, UMAP coordinates with cluster annotations.
- `data/hof-probabilities.json` -- Per HOF-eligible player, calibrated induction probability.
- `data/sensitivity-grid.json` -- Pre-computed lookup for the Fig 05 dashboard.
- `data/data-coverage-meta.json` -- Per league-year, the Seamheads-documented box score coverage percentage used by Model 3.
- `data/asset-register.json` -- Updated for chapter.

**Methodology documentation:**

- `METHODOLOGY.md` -- The chapter's most important document. The full methodology for all six models, including hyperparameters, validation approaches, limitations, and dependencies. Cross-references to the Ashwill normalization methodology, the Hirsch MLE methodology, the Jaffe JAWS methodology, and the SABR critique of JAWS.

- `REPRODUCIBILITY.md` -- A separate document explaining how to reproduce every platform figure from the published data files, including all model training and inference steps.

---

## The Connective Tissue

### Tissue In (from Chapter 09)

> *The forfeited WAR figures in the previous chapter depend on a WAR engine. The platform built its own. This chapter is that engine: how Negro Leagues player value is measured, how the measurements are calibrated, how the uncertainty is quantified, how the Hall of Fame methodology is extended to handle the structural conditions of Negro Leagues play. The engine that produced the forfeited WAR figures, the engine that ranked Josh Gibson at the top of the batting average leaderboard, the engine that the next chapter will use to rank Hall of Fame candidates: this is that engine.*

### Tissue Out (to Chapter 11)

> *The engine produces a ranking. The ranking has not yet been applied to the question Cooperstown was built to answer. The next chapter asks the question the engine was built to address: which players, ranked by the methodology this platform extends from JAWS into the integrated record, belong in the Hall of Fame. The Hall has answered some of the question. The engine answers the rest.*

---

## The Agent Reviews

### Oscar -- Asset and Provenance

Reviews the asset register. Confirms permissions for Seamheads, Baseball Reference, FanGraphs logos. Verifies portraits for the attribution panel. Documents text-only fallbacks where permissions cannot be obtained.

**Specific gates:** Every third-party logo has documented permission. Attribution to Ashwill, Johnson, Lester, Jaffe, Hirsch is complete and accurate. The chapter does not claim invention of methodology it inherits.

### Elias -- Data and Citation Integrity

This chapter is Elias's most intensive review. Verifies that:
- Every rate-normalized WAR figure is reproducible from the Seamheads-derived per-season WAR plus the published rate denominators
- Every JAWS variant is computed correctly from the published formula
- The Bayesian uncertainty model's outputs are reproducible from the published prior specifications and the published per-season-WAR posteriors
- The position assignment matches the documented WAR distribution per player
- The HOF probability model's calibration is documented and reproducible
- The chapter's methodological claims do not overstep what the data supports

**Specific gates:** Reproducibility document is sufficient for an independent researcher to reproduce the platform's figures from the published data. Every methodological extension of inherited work is attributed. The chapter's claims about JAWS limitations are sourced to the SABR critique, not asserted.

### Vera -- Visual and Accessibility

Reviews the five visualizations at 375px, 768px, 1200px. Particular focus:
- Fig 01 (the leaderboard) must remain usable on mobile, with the card view providing enough information at 375px to be the primary mobile reading experience.
- Fig 04 (the UMAP embedding) must work on touch devices. Zoom and pan on touch screens must be intuitive.
- Fig 05 (the sensitivity dashboard) controls must be tappable on mobile.

**Specific gates:** Fig 01 card view passes the oh wow test at 375px. Fig 04 cluster annotations remain readable at all zoom levels. Fig 05 control values are clearly visible after adjustment on mobile.

### Ida -- Spec Adherence and Tenant Compliance

Reviews chapter against tenants. This chapter is the platform's most methodologically dense, so Tenant 10 (ML maximized) compliance is intrinsic. Tenant 14 (citable) compliance requires particular attention because the methodology document is the chapter's central artifact.

**Specific gates:** All six models documented. Methodology document is comprehensive. Reproducibility document is complete. Connective tissue paragraphs in project owner's voice. Citation block present.

### Gates -- Merge Authority

The oh wow test for this chapter is different from prior chapters because the chapter is methodology-heavy. The primary test is whether a reader with statistics background can read the methodology document and reproduce a platform figure. The secondary test is whether a non-technical reader can use Fig 01 and Fig 05 to find a player and understand how the player's rating was produced.

**Specific gates:** Methodology reproducibility test is conducted with at least one external SABR-affiliated researcher (the chapter's strongest claim to credibility is that an independent expert could reproduce it). Non-technical usability test is conducted with five agent instances simulating non-technical readers.

---

## The Oh Wow Test

**Primary oh wow:** Fig 01 sorted by Rate JAWS, filtered to catchers. The reader sees Josh Gibson at the top, with Mike Piazza, Johnny Bench, Yogi Berra ranked immediately below using the same methodology. The reader understands that the comparison is being made because the methodology supports it, not because the platform asserts it.

**Secondary oh wow:** Fig 04 (the UMAP). The reader sees Charleston cluster with Mays. The reader sees Gibson cluster with Piazza. The reader sees the clustering is not narrative assertion but multi-dimensional similarity in the underlying value space. The chapter has given the reader a different vocabulary for the comparison: not "who is better" but "who is similar."

**Tertiary oh wow:** Fig 05 (the sensitivity dashboard). The reader adjusts the methodology and sees the leaderboard shift. The reader understands that the leaderboard is a product of methodological choices, that the platform has documented those choices, and that the platform has shown the alternative results. The methodological transparency is the argument.

**Test protocol:** Five agent instances each read the chapter at 375px and 1200px without prompting. Three must identify the integration argument from Fig 01 alone. Three must identify the similarity argument from Fig 04. Three must identify the transparency argument from Fig 05. If thresholds not met, design returns.

---

## Citation Block

```
Cite this chapter:
Haynes, Jeremy. "The Ledger." The Other Box Score,
theotherboxscore.org/chapters/the-ledger/, [Month Year].
Accessed [access date].

Chicago:
Haynes, Jeremy. "The Ledger." The Other Box Score.
[Month Year]. https://theotherboxscore.org/chapters/the-ledger/.

Data (CC0):
The Other Box Score. "Integrated Baseball Value Dataset." CC0 1.0.
https://github.com/other-boxscore/chapters/10-the-ledger/data/.
[Version date].

Foundational methodology (inherited):
Ashwill, Gary. "Normalizing Negro League Statistics." Seamheads, 2011.
http://seamheads.com/2011/11/22/normalizing-negro-league-statistics/

Ashwill, Gary. "Building the Seamheads Negro Leagues Database."
Baseball Reference, 2020.
https://www.baseball-reference.com/articles/building-the-seamheads-negro-league-database-gary-ashwill.shtml

Major League Equivalency methodology:
Hirsch, Dan. "Major League Equivalencies for the Negro Leagues."
Seamheads, 2020.
https://seamheads.com/blog/2020/02/09/major-league-equivalencies-for-the-negro-leagues/

JAWS methodology (extended):
Jaffe, Jay. The Cooperstown Casebook. St. Martin's Press, 2017.

JAWS critique (acknowledged):
"Assessing Hall of Fame Worthiness: Flaws in JAWS." SABR Journal, 2022.
https://sabr.org/journal/article/assessing-hall-of-fame-worthiness-flaws-in-jaws/

Production data source:
Seamheads Negro Leagues Database. Agate Type Research.
https://www.seamheads.com/NegroLgs/

Integrated record:
Baseball Reference Negro Leagues integration, 2020.
FanGraphs Negro Leagues integration, 2023.
Major League Baseball Negro Leagues integration, 2024.

Uncertainty quantification methodology:
Gelman, A. et al. Bayesian Data Analysis. Third Edition, CRC Press, 2013.

Dimensionality reduction methodology:
McInnes, L., Healy, J., Melville, J. "UMAP: Uniform Manifold Approximation
and Projection for Dimension Reduction." arXiv:1802.03426, 2018.
```

---

## Build Sequence

| Phase | Deliverable | Gate |
|-------|-------------|------|
| 1 | Acquire and ingest complete Seamheads-derived per-season WAR dataset for integrated record | Elias verifies coverage completeness |
| 2 | Implement Model 1 (rate-normalized WAR) and validate against published Seamheads/B-R rate figures where available | Elias verifies arithmetic correctness |
| 3 | Implement Model 2 (extended JAWS) for all three variants | Elias verifies standard JAWS reproduces published values |
| 4 | Implement Model 3 (Bayesian uncertainty) with documented priors | Elias verifies posterior intervals contain documented Seamheads values for well-covered cases |
| 5 | Implement Model 4 (position assignment) with WAR-distribution tie-breaking | Elias verifies primary positions match consensus where consensus exists |
| 6 | Implement Model 5 (UMAP embedding) with hyperparameter documentation | Elias verifies clusters are reproducible from fixed random seed |
| 7 | Implement Model 6 (HOF probability) with calibration | Elias verifies calibration plot shows good fit |
| 8 | Build Fig 01 (integrated leaderboard) with virtualized table | Vera verifies mobile card view |
| 9 | Build Fig 02 (JAWS comparison scatter) | Vera verifies hover/tap interaction |
| 10 | Build Fig 03 (confidence bands lollipop) | Vera verifies interval visibility |
| 11 | Build Fig 04 (UMAP embedding) with WebGL acceleration | Vera verifies touch zoom and pan |
| 12 | Build Fig 05 (sensitivity dashboard) | Vera verifies tap targets |
| 13 | Write methodology and reproducibility documents | Elias conducts independent reproduction test |
| 14 | External reviewer test (SABR-affiliated researcher reproduces a platform figure) | Gates documents result |
| 15 | Write narrative copy and connective tissue paragraphs | Ida reviews tenant compliance |
| 16 | Oh wow test with five agent instances | Gates conducts, documents |
| 17 | All five agents APPROVED | Gates issues MERGE |

---

## Open Questions for Project Owner

**Question 1: External reviewer engagement.**
Phase 14 specifies an external SABR-affiliated researcher reproducing a platform figure. This is the chapter's strongest credibility move but requires outreach. Candidates include Larry Lester, Gary Ashwill, Kevin Johnson, or any SABR Negro Leagues Research Committee member. Recommend reaching out to one of them as a courtesy and possible reviewer before merge. Flagging because the outreach is yours to make.

**Question 2: MLE handling.**
The chapter includes the Hirsch MLE methodology as an optional alternative in the sensitivity dashboard but does not use it as a default. The argument for keeping MLE off by default: the platform's argument is that the comparison is makeable without translating into MLB-equivalent terms. The argument for turning MLE on: it produces the most directly readable cross-league figures. Recommend keeping MLE off by default with documented availability in the sensitivity dashboard. Flagging for your call.

**Question 3: Defensive component handling.**
Defensive WAR for the Negro Leagues is the most data-sparse component. The platform inherits the Seamheads positional approximations but the uncertainty is genuine. The chapter could (a) include defensive WAR in all leaderboards with appropriate uncertainty bands (current spec), (b) produce separate offensive-only leaderboards as the primary view, or (c) flag defensive values as advisory and present offensive as primary. Recommend option (a) with prominent uncertainty visualization. Flagging.

**Question 4: HOF probability model scope.**
Model 6 produces HOF induction probability estimates. The chapter delivers these but the chapter's narrative does not lead with them. They are the engine for Chapter 11, which is where the narrative emphasis lives. The question is whether Chapter 10 should include any HOF visualization (probability vs. actual induction status, by era) as a preview of Chapter 11, or save it entirely for Chapter 11. Recommend saving for Chapter 11 so Chapter 10 remains a methodology document and Chapter 11 has its own oh wow moment. Flagging.

**Question 5: Sequence dependency.**
This chapter produces the data files that the rest of the platform consumes. Chapters 5, 8, 9 implicitly depend on this chapter's outputs. The current platform build sequence implies Chapter 5 shipped first (it has) and Chapter 10 ships later. The reconciliation is that Chapter 10 documents the engine that Chapter 5 already used; the engine existed, it just was not formalized in a chapter. Recommend addressing this explicitly in the Chapter 10 narrative ("the engine documented here is the engine that produced the figures in prior chapters") so the dependency is transparent. Flagging.

---

## Status

SPEC v1.0 COMPLETE. Awaiting project owner review and Gate 1 approval.
