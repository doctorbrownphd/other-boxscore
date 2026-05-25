# The Color Line -- Methodology
## theotherboxscore.org/chapters/the-color-line/

**Version:** 1.0
**Published:** May 2026
**Last updated:** 2026-05-25
**Reviewed by:** Elias (statistical methodology) . Oscar (historical grounding)

---

## What This Chapter Does

This chapter measures what the color line cost. It takes 2,300+ Negro Leagues player careers, places them alongside the MLB record using five primary databases, and answers the question: what happens to baseball's all-time leaderboards when the players who were excluded are finally counted? The answer, computed across five machine learning models and six pipeline stages, is that four of the five most important career batting records now belong to Josh Gibson, that the integration of sixteen MLB franchises took twelve years from first to last, and that an estimated 2,063.5 career WAR was lost to exclusion. The numbers were always true. The books just did not say so until 2024.

---

## Data Sources

### Lahman Baseball Database
- **Source:** Sean Lahman / Baseball Databank
- **URL or archive location:** https://www.seanlahman.com/baseball-archive/statistics/
- **Coverage:** Complete MLB player statistics, 1871 through 2016. Career batting, pitching, fielding, and biographical data.
- **License:** Creative Commons Attribution-ShareAlike 3.0
- **Access date:** March 2024
- **Known limitations:** Coverage ends at the 2016 season. No race field, so player identification as Black or white relies on cross-referencing with the FiveThirtyEight Negro Leagues dataset and integration-era records. Post-2016 active-player career totals are incomplete, though this does not affect the core integration-era analysis (1947 through 1959).
- **How used in this chapter:** Backbone of all MLB leaderboard rankings. Career batting averages, slugging percentages, OPS, and single-season records for the "before" state of every leaderboard comparison. Source of WAR values for the six Parallel Careers subjects.

### Retrosheet Negro Leagues Database
- **Source:** Retrosheet, Inc.
- **URL or archive location:** https://www.retrosheet.org/
- **Coverage:** 107,000 game records, 1903 through 1962. Box scores and, where available, play-by-play.
- **License:** Free for non-commercial use with attribution
- **Access date:** March 2024
- **Known limitations:** Barnstorming games, exhibition matches, and some regular-season contests were never recorded. Surviving statistics likely undercount Negro Leagues performance. Box score coverage is uneven across decades, with the 1920s and 1930s better covered than earlier years.
- **How used in this chapter:** Source of Negro Leagues batting statistics for leaderboard integration. Cross-referenced with Seamheads data to validate season-level totals.

### FiveThirtyEight Negro Leagues Player Ratings
- **Source:** FiveThirtyEight (ABC News)
- **URL or archive location:** https://github.com/fivethirtyeight/data/tree/master/negro-leagues
- **Coverage:** 480 Negro Leagues player ratings, including estimated WAR equivalents. Built from contemporary press accounts, surviving statistics, and expert assessment.
- **License:** CC BY 4.0
- **Access date:** March 2024
- **Known limitations:** Ratings are composite estimates, not derived from complete box score data. The WAR equivalents are approximations calibrated against known performance benchmarks. The 480-player set covers the most prominent players but is not exhaustive.
- **How used in this chapter:** Primary source for the Lost Seasons section (50 players ranked by WAR-equivalent). Source of the estimated lost WAR figures. Used for player identification as Black in the Lahman cross-reference.

### Seamheads Negro Leagues Database
- **Source:** Seamheads.com / Center for Negro Leagues Baseball Research
- **URL or archive location:** https://www.seamheads.com/NeuroStats/
- **Coverage:** Season-level batting and pitching statistics for Negro Leagues players, organized by team and year.
- **License:** Research use with attribution
- **Access date:** March 2024
- **Known limitations:** Season-level granularity only, not game-level. Coverage varies by league and era. This is the dataset MLB officially adopted in its May 2024 statistical integration.
- **How used in this chapter:** Source of the statistics that now appear in the official MLB record. Gibson's .372 career average, .466 single-season average, .718 career slugging, and 1.177 career OPS all derive from Seamheads data as ratified by MLB. Cross-referenced with Retrosheet for validation.

### Library of Congress Prints and Photographs Division
- **Source:** Library of Congress
- **URL or archive location:** https://www.loc.gov/pictures/
- **Coverage:** Public-domain photographs of Negro Leagues players, teams, and stadiums. Coverage is sparse and biased toward the 1920s and 1940s.
- **License:** Public domain (verified per asset register entry)
- **Access date:** January through April 2024
- **Known limitations:** Only 13 of the 50 Lost Seasons players have confirmed public-domain photographs. The scarcity of images is itself a form of the erasure this chapter documents. Every photograph used has a complete provenance chain in `data/asset-register.json`.
- **How used in this chapter:** Player portraits on the Lost Seasons cards and the Gibson page. Each image verified as public domain before inclusion.

---

## Data Processing

### Step 1: Acquisition and ID Standardization (00_acquire.py)
- **Tool:** Python, pandas
- **Input:** Raw Lahman CSV files, Retrosheet game logs, FiveThirtyEight player ratings CSV, Seamheads season files
- **Output:** Unified parquet file with standardized player IDs across all four statistical sources
- **Accuracy / success rate:** Player ID matching across databases is deterministic where IDs overlap (Lahman to Baseball-Reference). For Negro Leagues players without Lahman IDs, matching is by name, team, and active years. Approximately 95% of FiveThirtyEight players were matched to Seamheads records.
- **Failures and gaps:** Players active before 1920 have the weakest cross-database coverage. Five FiveThirtyEight entries could not be matched to Seamheads records and are flagged in the output.

### Step 2: Leaderboard Computation (01_leaderboards.py)
- **Tool:** Python, pandas
- **Input:** Unified parquet from Step 1
- **Output:** Pre-2024 (MLB only) and post-2024 (MLB + Negro Leagues) career and single-season leaderboards across five categories: career batting average, single-season batting average, career slugging, career OPS, single-season OPS
- **Accuracy / success rate:** MLB leaderboard values match Baseball-Reference to three decimal places. Negro Leagues values match Seamheads published figures.
- **Failures and gaps:** At-bat thresholds differ between MLB and Negro Leagues eras. The pipeline applies league-appropriate thresholds: 3,000 plate appearances for MLB career records, and the lower thresholds used in the official MLB integration for Negro Leagues career records.

### Step 3: Integration Timeline (02_integration_timeline.py)
- **Tool:** Python
- **Input:** Manually curated integration dates for all sixteen MLB franchises (1947 through 1959), cross-referenced with Baseball-Reference debut records
- **Output:** Team integration dates, days elapsed from April 15, 1947 (Robinson's debut), league affiliation, and "resistant" flag for teams that integrated after April 1955
- **Accuracy / success rate:** All sixteen integration dates are **Documented** -- drawn from contemporary newspaper accounts and confirmed by multiple baseball historians. The "passed on" players listed for resistant franchises (Yankees, Tigers, Red Sox) are **Verified** through multiple independent sources.
- **Failures and gaps:** None. This is the best-documented dataset in the chapter.

### Step 4: Lost Seasons Computation (03_lost_seasons.py)
- **Tool:** Python
- **Input:** FiveThirtyEight player ratings, career spans from Seamheads
- **Output:** For each of 50 Negro Leagues players: peak years, years they could have played in MLB (assuming age-21 debut), and the gap between
- **Accuracy / success rate:** Lost season counts are **Estimated**. The age-21 debut assumption matches the median MLB debut age for position players in the relevant era but does not account for individual variation, military service, or injury.
- **Failures and gaps:** The 50-player selection is editorial, based on WAR-equivalent ranking. Players outside this set also lost seasons. The model does not account for the possibility that some players might have debuted before age 21.

### Step 5: Career Projections (04_career_projections.py)
- **Tool:** Python, scipy (curve fitting)
- **Input:** Baseball-Reference WAR sequences for six integration-era players (Robinson, Doby, Campanella, Mays, Banks, Aaron), plus their Negro Leagues season data
- **Output:** Quadratic career trajectory models with coefficients, fan-chart quantile bands, and projected career WAR totals
- **Accuracy / success rate:** Projections are **Modeled**. The quadratic fit captures career shape but simplifies aging curves. Validation against Mays (who lost only two years) shows the model closing on his actual 156.1 career WAR with a projected 162 -- within 4%.
- **Failures and gaps:** The quadratic model does not account for era adjustments, positional factors, or league-quality transitions. The direction of the finding is robust (these players lost career value), but the precise WAR figures carry substantial uncertainty.

### Step 6: Gibson Ensemble (05_gibson_ensemble.py)
- **Tool:** Python, numpy
- **Input:** Gibson's Negro Leagues documented statistics, composite aging curves from six elite MLB catchers, NL-to-MLB translation factor
- **Output:** 500 simulated career trajectories, percentile bands by age, summary statistics (median career WAR: 76.7, 90% CI: 66.7 to 86.8)
- **Accuracy / success rate:** Projections are **Modeled** with explicit uncertainty bounds. The NL-to-MLB translation uses a Normal(0.85, 0.04) factor, meaning Negro Leagues statistics are discounted by approximately 15% to account for league-quality differences, with 4% standard deviation capturing the uncertainty in that discount.
- **Failures and gaps:** The composite aging curve is built from six MLB catchers who actually played, not from catchers who were excluded. Whether Gibson would have aged similarly is unknowable. The ensemble captures parametric uncertainty but not structural uncertainty in the model itself.

### Step 7: Export (05_export.py)
- **Tool:** Python
- **Input:** All outputs from Steps 2 through 6
- **Output:** JavaScript data files (lost-seasons-data.js, gibson-data.js, careers-data.js, breach-data.js, numbers-data.js) loaded directly by the chapter's HTML pages via window.* globals
- **Accuracy / success rate:** Deterministic export. Output files are committed to the repository and serve as the chapter's data layer. No runtime data fetching.
- **Failures and gaps:** None. This is a formatting step.

---

## Machine Learning Models

### M1: Career Leaderboard Integration Model

**Model type:** Deterministic ranking computation with league-appropriate thresholds
**Library / framework:** pandas, Python 3.12
**Training data:** Not applicable (deterministic computation, not learned)
**Feature set:** Career batting average, single-season batting average, career slugging percentage, career OPS, single-season OPS, plate appearances
**Hyperparameters:** At-bat thresholds: 3,000 PA for MLB career records, league-specific minimums for Negro Leagues records per MLB's 2024 integration rules
**Output:** Unified leaderboards showing the top 10 players in each category with pre-integration and post-integration rankings
**Confidence representation:** MLB values are labeled **Verified** (cross-referenced with Baseball-Reference). Negro Leagues values are labeled **Documented** (ratified by MLB in May 2024, sourced from Seamheads).
**Known failure modes:** The at-bat threshold for Negro Leagues careers is necessarily lower than for MLB careers because shorter seasons produced fewer plate appearances. This is not a flaw in the model but a structural feature of the exclusion it documents.
**Reproducibility:** Run `01_leaderboards.py` with the unified parquet from Step 1.

### M2: Integration Timeline Visualization Model

**Model type:** Temporal event mapping with animation interpolation
**Library / framework:** Vanilla JavaScript (breach-engine.js)
**Training data:** Not applicable (event data, not learned)
**Feature set:** Integration date, league (NL/AL), days from Robinson's debut, player name, franchise, "resistant" flag
**Hyperparameters:** Animation duration: 30 seconds at 1x speed. MAX_DAY: 4,480 (Pumpsie Green, July 21, 1959). SCALE: 30,000ms / 4,480 days.
**Output:** Animated timeline showing sixteen franchises lighting up in integration order, with per-franchise detail cards
**Confidence representation:** All integration dates are **Documented**. The "passed on" players for resistant franchises are **Verified** through multiple sources.
**Known failure modes:** The animation compresses twelve years into thirty seconds. The emotional weight of the wait is communicated through the counter and the three final cells (Yankees, Tigers, Red Sox), which are visually flagged as "resistant."
**Reproducibility:** Open breach.html in any modern browser. The animation runs from the committed data in breach-data.js.

### M3: Lost Seasons Counterfactual Model

**Model type:** Counterfactual career-span estimation
**Library / framework:** Python 3.12
**Training data:** FiveThirtyEight WAR-equivalent ratings for 480 Negro Leagues players
**Feature set:** Career span (first year, last year), estimated WAR, position, peak years
**Hyperparameters:** Assumed MLB debut age: 21 (median debut age for position players in the integration era). Selection: top 50 players by WAR-equivalent.
**Output:** For each player: number of "lost" seasons (years between assumed debut and actual career start, or years during the exclusion era), ranked list with biographical detail
**Confidence representation:** Lost season counts are labeled **Estimated** throughout the chapter. The aggregate figure of 2,063.5 lost WAR is labeled **Speculative** in the methodology page and carries a "speculative" confidence tier designation.
**Known failure modes:** The age-21 debut assumption is a simplification. Some players would have debuted earlier (Campanella signed professionally at 15), others later. Military service is not modeled. The 50-player selection is editorial, not exhaustive.
**Reproducibility:** Run `03_lost_seasons.py` with the unified parquet.

### M4: Parallel Careers Trajectory Model

**Model type:** Quadratic regression (WAR as a function of age), with scaled fan-chart uncertainty bands
**Library / framework:** scipy.optimize.curve_fit, JavaScript (careers-data.js rendering)
**Training data:** Baseball-Reference WAR sequences for six integration-era players, plus Negro Leagues season data from Seamheads/FiveThirtyEight
**Feature set:** Age at each season, WAR for that season (actual MLB values from Baseball-Reference, Negro Leagues values from FiveThirtyEight)
**Hyperparameters:** Quadratic coefficients fitted per player (e.g., Robinson: [-0.062879, 3.952576, -57.784242]). Noise parameter for uncertainty bands (1.2 to 1.5 WAR, varying by player). Peak WAR scaling: raw quadratic peak rescaled to match known peak WAR from Baseball-Reference.
**Output:** Per-player fan charts showing actual career trajectory alongside modeled counterfactual trajectory, with p05/p25/median/p75/p95 bands. Projected career WAR totals. "Stolen seasons" count.
**Confidence representation:** Actual MLB WAR values are **Verified**. Negro Leagues WAR values are **Estimated**. Projected trajectories are **Modeled** and displayed with uncertainty bands. The text explicitly labels projections as the "most interesting numbers in this report and the least certain."
**Known failure modes:** The quadratic fit is a simplification. Real career aging curves are asymmetric, with sharper decline phases. Era adjustments, positional value changes, and league-quality transitions are not modeled. The Mays validation case (projected 162, actual 156.1) suggests the model slightly overpredicts, though within the uncertainty bounds.
**Reproducibility:** Run `04_career_projections.py`. Fan charts are generated client-side from committed coefficients in careers-data.js using the `makeFanScaled()` function.

### M5: Gibson Counterfactual Ensemble

**Model type:** Monte Carlo simulation (500 trajectories) with composite aging curve and NL-to-MLB translation
**Library / framework:** Python 3.12, numpy
**Training data:** Gibson's Negro Leagues statistics (Seamheads), career aging curves from six elite MLB catchers
**Feature set:** Gibson's documented stats (.372 career AVG, .718 SLG, 1.177 OPS, 238 HR in 598 games), aging curve shape from comparable MLB catchers, NL-to-MLB quality translation factor
**Hyperparameters:** Number of trajectories: 500. NL-to-MLB translation: Normal(0.85, 0.04) -- a 15% discount on Negro Leagues statistics with 4% standard deviation. Composite aging curve derived from six elite MLB catchers. Age range: 19 through 38.
**Output:** Percentile bands by age (p05, p25, median, p75, p95), 30 sample trajectories for visualization, summary statistics. Median career WAR: 76.7. 90% confidence interval: 66.7 to 86.8. Median career batting average: .373 (90% CI: .343 to .402).
**Confidence representation:** All Gibson projections are labeled **Modeled** and displayed with explicit uncertainty bands. The fan chart shows the full distribution, not a point estimate. The page text states that Gibson "died 85 days before the door opened" and contextualizes the projection against his documented Negro Leagues records.
**Known failure modes:** The ensemble captures parametric uncertainty (how good was Gibson in MLB terms?) but not structural uncertainty (would Gibson's body have held up catching 140+ games per season? would the racial hostility of 1930s MLB have affected his performance?). The composite aging curve assumes Gibson would have aged like an elite MLB catcher, which is unknowable. The NL-to-MLB translation factor is itself estimated and has no definitive calibration source.
**Reproducibility:** Run `05_gibson_ensemble.py`. Output committed as gibson-data.js.

---

## AI-Generated Content

### Synthesis Tab (synthesis.html)

**Generated by:** Claude (Anthropic), accessed via API
**Prompt structure:** The Synthesis tab provides an interactive query interface where users can ask questions about the chapter's data. Responses are generated by Claude using the chapter's committed data as context.
**Inputs to the prompt:** User query text, plus the full statistical dataset from the chapter's data files (leaderboards, integration timeline, lost seasons, career projections, Gibson ensemble)
**Output:** Natural-language responses to user queries about the data, displayed with confidence labels (HIGH, MODERATE, CANDIDATE) and source citations
**Confidence label:** Each response displays a colored confidence badge and lists the specific data sources used. The AI-generated nature is disclosed in the interface chrome.
**Human review:** The Synthesis tab is a live generation feature. Responses are bounded by the committed data and constrained by the prompt to cite sources. No pre-publication human review of individual responses occurs, but the prompt template and data constraints were reviewed before deployment.
**Accuracy standard:** Responses must cite specific data from the chapter's committed files. Responses that cannot be grounded in the data are flagged as CANDIDATE confidence.
**Known limitations:** The model may rephrase statistical findings in ways that shift emphasis. The confidence labels are heuristic, not calibrated. Users should cross-reference any Synthesis response against the primary data tabs.

### Player Biographical Notes (lost-seasons-data.js)

**Generated by:** Human-authored with AI editorial assistance (Claude, Anthropic)
**Prompt structure:** Biographical notes for each of the 50 Lost Seasons players were drafted by the chapter author with AI assistance for fact-checking and compression. Each note is one sentence.
**Output:** One-line biographical notes appearing below each player card on the Lost Seasons tab
**Confidence label:** Individual notes are not labeled AI-generated because they are human-authored with AI editorial input. The distinction is documented here.
**Human review:** Every biographical note was reviewed against at least one primary source (SABR biography, contemporary newspaper account, or Baseball Hall of Fame record) before publication.
**Accuracy standard:** Each note must be factually verifiable. Notes containing unverifiable anecdotes are attributed ("reportedly," "the saying went").

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| Incomplete Negro Leagues box scores | Retrosheet contains 107,000 game records, but barnstorming games, exhibitions, and some regular-season contests were never recorded | Career statistics for Negro Leagues players likely undercount actual performance, meaning the leaderboard integration is conservative | Acknowledged in the Method tab. Statistics are used as reported without imputation. |
| No race field in Lahman | The Lahman database does not record player race | Player identification as Black relies on the FiveThirtyEight dataset and integration records, which may misclassify or omit some players | Cross-referenced with FiveThirtyEight's 480-player set. Players not in the FiveThirtyEight set are not identified. |
| Photo scarcity | Only 13 of 50 Lost Seasons players have confirmed public-domain photographs | 37 player cards display without photographs | Documented as itself a form of erasure: "Public-domain images of Negro Leagues players are scarce, which is itself a form of the same erasure this report documents." |
| Lahman ends at 2016 | Post-2016 MLB seasons are absent | Active-player career totals are incomplete in leaderboard comparisons | Does not affect the core integration-era analysis. Noted in the Method tab. |
| Pre-1920 records | Negro Leagues statistical coverage before the founding of the Negro National League (1920) is fragmentary | Players active before 1920 (Pop Lloyd, Spottswood Poles, Pete Hill, Frank Grant) have less reliable career statistics | Career averages for pre-1920 players are labeled **Reconstructed**. |
| Military service not modeled | The lost-seasons model does not account for players who served in World War II or the Korean War | Some "lost seasons" attributed to the color line were actually lost to military service (Larry Doby, Leon Day, Monte Irvin) | Acknowledged in the limitations section. The distinction is noted in individual player entries where applicable. |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| Josh Gibson's career batting average (.372) | Different databases report different figures depending on which leagues, seasons, and game types are included. Seamheads reports .372, which MLB adopted. Some researchers calculate higher or lower figures depending on inclusion criteria. | Seamheads, Baseball-Reference, MLB official records (May 2024 integration) | Presented as .372, labeled **Documented** per the MLB-ratified Seamheads figure. The dispute is not surfaced in the main text because MLB has issued a definitive ruling, but this methodology document notes the variation. |
| Gibson's home run total | Figures range from 238 (documented league games) to "nearly 800" (including all barnstorming, exhibition, and winter league games). The higher figure is widely cited in popular accounts but not supported by box score evidence. | Seamheads, SABR Gibson biography, Negro Leagues Researchers and Authors Group | The chapter uses 238, the documented league-game figure. The higher figure is not cited. |
| Aggregate lost WAR (2,063.5) | This figure is the sum of individual counterfactual WAR estimates, each of which carries its own uncertainty. The aggregate inherits and compounds those uncertainties. | FiveThirtyEight WAR-equivalent ratings, pipeline modeling | Labeled **Speculative** in the Method tab. Presented in the chapter text with the caveat that "the direction of the finding is robust; the precise figures are not." |
| Satchel Paige's career win total | Paige's total wins across all leagues, barnstorming, and exhibition play are disputed. Estimates range from 350 to over 400. | SABR Paige biography, Larry Tye's "Satchel" (2009), contemporary newspaper accounts | The chapter uses Paige's documented stat ("Debut MLB at 42") rather than a disputed win total. |
| Jackie Robinson 1945 Red Sox tryout | Whether the Red Sox genuinely evaluated Robinson or held a sham tryout is debated. Most historians consider it a formality with no intention of signing him. | Jules Tygiel "Baseball's Great Experiment" (1983), Howard Bryant "Shut Out" (2002), contemporary Boston newspaper accounts | Presented in the Breach data as "1945 tryout, declined" in the Red Sox "passed on" field. The text does not characterize the tryout's sincerity. |

---

## Cross-League Comparisons

### Career Statistics: Negro Leagues vs. MLB Leaderboards

**Assumption 1:** Negro Leagues season statistics from Seamheads are directly comparable to MLB season statistics from Lahman, per MLB's May 2024 integration ruling.
**Assumption 2:** At-bat thresholds are applied at league-appropriate levels. Negro Leagues seasons were shorter (typically 60 to 80 games), so career plate-appearance minimums are lower than the MLB standard.
**Assumption 3:** The Seamheads data has been vetted by the Center for Negro Leagues Baseball Research and ratified by MLB. This chapter treats it as authoritative.
**Precision cost:** Negro Leagues statistics derive from shorter seasons with smaller sample sizes, meaning batting averages and rate statistics carry wider confidence intervals than equivalent MLB figures. A .372 average over 598 games is statistically less stable than a .366 average over 3,000+ games.
**Calibration:** The MLB integration ruling itself serves as the calibration authority. This chapter does not apply its own league-quality adjustment to the leaderboard data, deferring to the official ruling.
**Confidence interval:** Not calculated for the leaderboard comparison, because the comparison follows the MLB ruling rather than an independent statistical analysis. The NL-to-MLB translation factor (Normal(0.85, 0.04)) is applied only in the Gibson ensemble and Parallel Careers models, not in the leaderboard data.

### WAR Projections: Negro Leagues Performance to MLB Context

**Assumption 1:** The NL-to-MLB translation factor of Normal(0.85, 0.04) implies that Negro Leagues statistics should be discounted by approximately 15% when projecting MLB-context performance. This reflects the consensus estimate that Negro Leagues competition, while elite, operated with smaller rosters and shorter seasons.
**Assumption 2:** Career aging curves from elite MLB players are transferable to Negro Leagues players. This is the strongest assumption and the least verifiable.
**Assumption 3:** The quadratic career trajectory model captures the essential shape of a baseball career (growth, peak, decline), even though real careers exhibit more complex patterns.
**Precision cost:** Individual career WAR projections carry uncertainty on the order of plus or minus 10 to 15 WAR at the career level (see Gibson ensemble 90% CI: 66.7 to 86.8).
**Calibration:** Willie Mays serves as the primary validation case. The model, fit on his Birmingham Black Barons seasons only, projects 162 career WAR against an actual 156.1. This 4% overprediction is within the model's uncertainty bounds.
**Confidence interval:** Stated per player in the Parallel Careers section and per age in the Gibson ensemble. All projections display fan-chart uncertainty bands spanning p05 to p95.

---

## Reproducibility

**Code:** All pipeline code is in `pipeline/` and is MIT licensed. Six Python scripts (00_acquire.py through 05_export.py) plus one Gibson-specific ensemble script (05_gibson_ensemble.py) run sequentially.
**Data:** All pre-computed outputs are committed as JavaScript files in the chapter directory and are CC0 licensed. The chapter runs entirely from static files with no runtime data fetching.
**Raw data:** Lahman is available at seanlahman.com. Retrosheet is available at retrosheet.org. FiveThirtyEight data is available on GitHub (fivethirtyeight/data). Seamheads data is available at seamheads.com. No registration or API keys are required for any source.
**Environment:** Python 3.12, pandas, numpy, scipy. A `requirements.txt` is committed to the pipeline directory.
**Runtime:** Under sixty seconds on commodity hardware for the full pipeline.

To reproduce:
```bash
cd pipeline/
pip install -r requirements.txt
python 00_acquire.py
python 01_leaderboards.py
python 02_integration_timeline.py
python 03_lost_seasons.py
python 04_career_projections.py
python 05_gibson_ensemble.py
python 05_export.py
```

Output JavaScript files will appear in the chapter directory and match the committed versions.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-05-25 | Initial publication |

---

## Citation

**APA:**
Haynes, J. (2026). The color line: Methodology. *The Other Box Score*. https://theotherboxscore.org/chapters/the-color-line/method.html

**Chicago:**
Haynes, Jeremy. "The Color Line: Methodology." *The Other Box Score*, May 2026. https://theotherboxscore.org/chapters/the-color-line/method.html.

**BibTeX:**
```bibtex
@misc{haynes2026colorline,
  author = {Haynes, Jeremy},
  title = {The Color Line: Methodology},
  year = {2026},
  url = {https://theotherboxscore.org/chapters/the-color-line/method.html},
  note = {The Other Box Score, Chapter 01}
}
```

---

## Questions and Corrections

If you find an error in this methodology, open an issue at github.com/other-boxscore/chapters/the-color-line/issues or contact the project at theotherboxscore.org. Corrections are documented in the version history above.
