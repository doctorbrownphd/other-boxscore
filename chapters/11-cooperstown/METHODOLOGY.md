# Cooperstown -- Methodology
## theotherboxscore.org/chapters/cooperstown/

**Version:** 1.0
**Published:** May 2026
**Last updated:** 2026-05-25
**Reviewed by:** Elias (statistical methodology) · Oscar (historical grounding)

---

## What This Chapter Does

This chapter asks a direct question: which Negro Leaguers belong in the National Baseball Hall of Fame who are not there yet? It takes every player in the Chapter 10 Rate JAWS leaderboard, measures them against the position-by-position JAWS bar that Cooperstown already uses, incorporates historian advocacy from the 42 for 21 poll, and produces a composite candidacy score for each non-inducted player. It then routes each candidate to the appropriate era committee based on their active years. The chapter also documents the 2006 Special Committee on Negro Leagues, the only dedicated ballot cycle Cooperstown has ever convened for Negro Leagues players, including the 22 candidates who appeared on that ballot and were not elected.

---

## Data Sources

### Chapter 10 Rate JAWS Leaderboard
- **Source:** Chapter 10: The Ledger (rate-jaws.json)
- **URL or archive location:** https://theotherboxscore.org/chapters/the-ledger/
- **Coverage:** 70 Negro Leagues players ranked by Rate JAWS, derived from the Seamheads Negro Leagues Database
- **License:** CC0
- **Access date:** 2026-05-24
- **Known limitations:** The leaderboard is limited to players with sufficient plate appearances or innings pitched in the Seamheads database. Players with fragmentary records are excluded from ranking. Career WAR figures carry uncertainty from incomplete game logs.
- **How used in this chapter:** The leaderboard provides the ranked pool of candidates. Each player's Rate JAWS rank, career WAR, and rate WAR feed the probability model.

### FanGraphs JAWS Position Averages
- **Source:** FanGraphs JAWS Series by Jay Jaffe
- **URL or archive location:** Multiple FanGraphs articles (2020--2026 ballot analyses). Full URLs documented in `data/hof-standards.json`.
- **Coverage:** Average career WAR, 7-year peak WAR, and JAWS for inducted Hall of Famers at each position, current through the 2025 ballot cycle
- **License:** Research use (published baseball analytics)
- **Access date:** 2026-05-24
- **Known limitations:** Position averages shift slightly with each new induction class. The averages used here are current as of the 2025 cycle. Outfield positions (LF, CF, RF) are tracked separately in the JAWS system; for Negro Leagues players classified generically as "OF," the CF standard is used as the primary comparison, which may overstate the bar for corner outfielders.
- **How used in this chapter:** These position-specific JAWS averages define the "bar" each candidate is measured against. They are the denominator in the WAR ratio component of the probability model.

### Baseball Reference JAWS System
- **Source:** Baseball Reference
- **URL or archive location:** https://www.baseball-reference.com/about/jaws.shtml
- **Coverage:** System documentation and reference implementation
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** None specific to this use.
- **How used in this chapter:** Cross-reference for the JAWS methodology and position averages.

### 42 for 21 Committee Poll
- **Source:** 42 for 21 Committee
- **URL or archive location:** https://www.42for21.org/results
- **Coverage:** Poll of 70+ historians ranking Negro Leagues Hall of Fame candidates
- **License:** Published results, publicly accessible
- **Access date:** 2026-05-24
- **Known limitations:** The poll reflects historian opinion at a single point in time. Not all historians participated. The poll captures advocacy presence but not advocacy intensity -- a player either appears or does not.
- **How used in this chapter:** Historian advocacy is a binary signal (present/absent) in the probability model, weighted at 20%.

### Candidates Registry (candidates.json)
- **Source:** Compiled from Chapter 10 Ledger, Chapter 12 hall-matrix.json, 42 for 21 results, and Seamheads Negro Leagues Database
- **URL or archive location:** `chapters/11-cooperstown/data/candidates.json`
- **Coverage:** 25 inducted Negro Leagues Hall of Famers and 19 documented candidates not yet inducted
- **License:** CC0
- **Access date:** 2026-05-24
- **Known limitations:** The candidate list is bounded by the Chapter 10 leaderboard. Players not in the Seamheads database or without sufficient data for WAR computation are absent.
- **How used in this chapter:** Provides the inducted/not-inducted classification and historian advocacy flags.

### 2006 Special Committee on Negro Leagues (special-committee-2006.json)
- **Source:** National Baseball Hall of Fame (baseballhall.org), Baseball Reference BR Bullpen, Wikipedia
- **URL or archive location:** https://baseballhall.org/discover/inside-pitch/historic-2006-election-brings-negro-leagues-legends-to-cooperstown
- **Coverage:** The complete 39-candidate ballot from the February 27, 2006 Special Committee vote. 17 elected, 22 not elected. The 12-member voting committee and the 94-to-39 screening process.
- **License:** Public record
- **Access date:** 2026-05-24
- **Known limitations:** Individual vote totals for the 22 non-elected candidates have never been published. The committee was declared the "final group" for Negro Leagues consideration, effectively closing a dedicated pathway.
- **How used in this chapter:** Provides historical context for the candidacy assessment. The 22 non-elected candidates from 2006 are cross-referenced against the model's probability scores.

### HOF Standards (hof-standards.json)
- **Source:** FanGraphs JAWS position averages
- **URL or archive location:** `chapters/11-cooperstown/data/hof-standards.json`
- **Coverage:** All nine fielding positions plus combined outfield, with career WAR, peak WAR, and JAWS averages
- **License:** CC0 (compiled data)
- **Access date:** 2026-05-24
- **Known limitations:** Starting pitcher standard uses S-JAWS, a variant specific to pitching. For positions with fewer inductees, the JAWS system supplements with "average HOF hitters" to normalize sample sizes.
- **How used in this chapter:** Defines the position-specific bar for each candidate's WAR ratio computation.

---

## Data Processing

### Step 1: Leaderboard Ingestion
- **Tool:** Python 3.12, json standard library
- **Input:** `chapters/10-the-ledger/data/rate-jaws.json` (70-player leaderboard)
- **Output:** In-memory player array with name, position, career WAR, rate WAR, Rate JAWS, and rank
- **Accuracy / success rate:** Deterministic JSON parse; no data loss
- **Failures and gaps:** Players without career WAR default to 0. Players without a position string default to outfield (OF) for bar comparison.

### Step 2: HOF Standards Lookup Construction
- **Tool:** Python 3.12
- **Input:** `data/hof-standards.json` (9 positions + combined outfield)
- **Output:** Dictionary mapping position codes to average JAWS values
- **Accuracy / success rate:** All 9 positions plus combined outfield parsed successfully
- **Failures and gaps:** Multi-position players (e.g., "CF/P") are handled by taking the lower bar across their listed positions, which is favorable to the player.

### Step 3: Advocacy Classification
- **Tool:** Python 3.12
- **Input:** `data/candidates.json` (inducted and candidate lists)
- **Output:** Sets of inducted names and candidate names with advocacy flags
- **Accuracy / success rate:** Deterministic name matching against the candidates registry
- **Failures and gaps:** Name matching is exact string comparison. Variant spellings or name discrepancies between the leaderboard and the candidates file would cause a miss. No such discrepancies were identified.

### Step 4: Probability Computation and Era Routing
- **Tool:** Python 3.12 (`models/hof_probability.py`)
- **Input:** Leaderboard players (excluding already-inducted and MLB-only players)
- **Output:** `data/hof-probability.json` (25 candidates with scores, components, and committee routing)
- **Accuracy / success rate:** Deterministic computation on input data
- **Failures and gaps:** Players with missing years-active data default to the Early Baseball Era Committee.

---

## Analytical Methods

### JAWS Position Bar Comparison

**What it does:**
Compares each Negro Leagues player's estimated JAWS to the average JAWS of inducted Hall of Famers at the same position. A player "at or above the bar" has a statistical case comparable to the average Cooperstown inductee at that position.

**Why this method:**
JAWS is the standard framework used by Hall of Fame analysts and voters. Jay Jaffe developed it specifically to normalize candidacy assessment across positions. Using the same bar for Negro Leagues players makes the comparison legible to anyone familiar with HOF analytics.

**Inputs:**
- Player career WAR (from Seamheads via Ch 10)
- Player position
- Position-specific average JAWS (from FanGraphs)

**Parameters:**
- Estimated JAWS approximation: career WAR * 0.75. This ratio is the typical relationship between JAWS and career WAR in the MLB JAWS database. It is used because per-season WAR breakdowns are not available from the Seamheads all-time leaderboard view, making true 7-year peak WAR computation impossible.
- The 0.75 multiplier was derived empirically from the MLB JAWS dataset, not from Negro Leagues data specifically.

**Outputs:**
- Bar comparison status: above_bar, at_bar, or below_bar
- Estimated JAWS value for each candidate

**Uncertainty:**
The 0.75 approximation introduces systematic uncertainty. For players with uneven career trajectories (short dominant peaks vs. long steady careers), the estimated JAWS could diverge significantly from true JAWS. This limitation is labeled "Modeled" at every point of use.

**Validation:**
For the 25 inducted Negro Leagues Hall of Famers with known career WAR, the estimated JAWS was compared against the position bar. The distribution of above/at/below outcomes is consistent with the known pattern that some inductees fall below the bar (committee selections, pioneer contributors, etc.).

**Limitations:**
- True JAWS cannot be computed without per-season WAR. The 0.75 ratio is an approximation.
- The position bar itself is calibrated on MLB inductees. Negro Leagues careers were shorter on average due to the structure of the leagues, which may systematically disadvantage NLB players in raw career WAR comparisons.
- Rate JAWS (from Ch 10) partially addresses the career-length problem but is a separate metric from standard JAWS.

---

## Machine Learning Models

### M1: HOF Probability Score

**Model type:** Weighted composite score (not a statistical probability model)
**Library / framework:** Python 3.12, no external ML libraries
**Training data:** Not a trained model. Weights were set by design rationale, not learned from data.
**Feature set:**
1. **Rank percentile** (40% weight): Player's position in the 70-player Rate JAWS leaderboard, inverted so rank 1 = 1.0 and rank 70 = 0.0
2. **WAR ratio** (30% weight): Career WAR divided by the estimated average career WAR for Hall of Famers at the player's position, capped at 1.5x and then normalized to 0--1. The estimated average career WAR is derived as avgJAWS / 0.75.
3. **Advocacy signal** (20% weight): Binary -- 1.0 if the player appears in the candidates registry (sourced from 42 for 21 poll and historian advocacy), 0.0 otherwise
4. **Induction momentum** (10% weight): Fixed at 0.5 for all candidates, reflecting that recent era committees (2006, 2022, 2024) have demonstrated willingness to induct Negro Leagues players

**Hyperparameters:**
- Component weights: 0.40, 0.30, 0.20, 0.10. Rationale: statistical merit (rank + WAR ratio = 70%) is the primary driver. Advocacy provides a meaningful secondary signal. Momentum is a baseline acknowledgment of institutional context.
- WAR ratio cap: 1.5x position average. Prevents outlier career WAR values from dominating the score.
- Momentum baseline: 0.5. A neutral midpoint reflecting active but not guaranteed committee interest.

**Output:**
A score from 0.0 to 1.0 for each non-inducted Negro Leagues player, with component breakdowns. This score is a composite ranking tool, not a prediction of committee vote outcomes.

**Confidence representation:**
Every probability score is labeled "Modeled" in the output data. The chapter presents these scores as "candidacy strength" rather than "probability of induction" to avoid implying predictive power the model does not have.

**Known failure modes:**
- The score cannot account for committee politics, ballot composition, or the number of slots available in a given cycle.
- Advocacy scoring is binary. A player with one historian champion and a player with unanimous historian support receive the same advocacy score.
- The momentum component is static. It does not adapt to changes in committee behavior over time.
- Players with no career WAR data (null values) receive a WAR ratio of 0, which suppresses their score regardless of other signals.

**Reproducibility:**
```bash
cd chapters/11-cooperstown/models/
python3 hof_probability.py
```
Requires `chapters/10-the-ledger/data/rate-jaws.json` and the chapter's own data files. Output: `data/hof-probability.json`.

### M2: Era Committee Routing

**Model type:** Rule-based classification (deterministic)
**Library / framework:** Python 3.12, no external libraries
**Training data:** N/A -- routing logic is based on documented era committee jurisdictions
**Feature set:**
- Player's years active (start year and end year)

**Hyperparameters:**
- Threshold year: 1950. The midpoint of a player's career determines routing.
- Players with career midpoint before 1950: Early Baseball Era Committee
- Players with career midpoint 1950 or later: Classical Baseball Era Committee

**Output:**
Committee assignment (early or classical), committee name, and next eligible cycle year.

**Confidence representation:**
Routing is deterministic given documented career dates. Labeled "Documented" when career years are sourced, "Estimated" when career year data is missing and the default (Early Baseball) is applied.

**Known failure modes:**
- The midpoint heuristic is a simplification. The actual era committees may consider a player's primary years of activity rather than a simple career midpoint.
- Players with missing years-active data default to Early Baseball. This is correct for most Negro Leagues players but may misroute edge cases.
- The era committee structure itself may change. Committee jurisdictions and cycle timing are set by the Hall of Fame board and have been modified in the past.

**Reproducibility:**
Same script as M1 (`models/hof_probability.py`). Both models run in a single pass.

---

## AI-Generated Content

### Candidacy Narrative Summaries

**Generated by:** Claude (Anthropic), used in editorial development
**Prompt structure:** Chapter author provided player statistical profiles and historian advocacy notes; Claude assisted with narrative framing and editorial structure
**Inputs to the prompt:** Career WAR, Rate JAWS rank, position bar comparison, advocacy sources
**Output:** Editorial narrative connecting statistical evidence to candidacy argument
**Confidence label:** AI-assisted content is labeled in the chapter's AI disclosure block. All factual claims were verified against source data by the chapter author.
**Human review:** Every generated passage was reviewed for factual accuracy against Seamheads data, 42 for 21 results, and baseballhall.org records.
**Accuracy standard:** No factual claim ships without a cited source. Any generated text that introduced unsourced claims was rejected.
**Known limitations:** The model has no access to unpublished committee deliberations or insider knowledge of future ballot composition. Generated narratives reflect the statistical and advocacy record only.

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| Per-season WAR unavailable | The Seamheads all-time leaderboard does not provide season-by-season WAR breakdowns. Only career totals are available. | True 7-year peak WAR cannot be computed. JAWS must be approximated using career WAR * 0.75. | Approximation is documented. All estimated JAWS values are labeled "Modeled." |
| Advocacy intensity not captured | The 42 for 21 poll provides a list of supported candidates but not the degree of support (number of votes, rankings). | The advocacy component of the probability score is binary, which flattens meaningful differences in historian consensus. | Acknowledged as a limitation. The 20% weight on advocacy partially mitigates the impact of binary encoding. |
| 2006 Committee vote totals unpublished | Individual vote counts for the 22 non-elected candidates from the 2006 Special Committee have never been released. | Cannot determine how close specific candidates came to the 75% threshold. | Documented as a data gap. The chapter presents the 22 as a group without implying proximity to election. |
| Pre-1920 records fragmentary | Negro Leagues box scores before the formal founding of the Negro National League in 1920 are significantly less complete. | Players active primarily before 1920 may have career WAR that understates their actual performance. | Career WAR confidence for pre-1920 players is labeled "Estimated" in the Ch 10 data. This uncertainty propagates into the probability score. |
| Career dates for some candidates approximate | Not all players in the leaderboard have precisely documented first and last seasons. | Era committee routing may be imprecise for players with uncertain career boundaries. | Missing career dates default to Early Baseball Era Committee routing. Documented in the routing model's limitations. |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| Estimated JAWS values for all candidates | True JAWS cannot be computed from available data. The 0.75 multiplier is an approximation from MLB data applied to Negro Leagues careers. | FanGraphs JAWS documentation, Seamheads database structure | Labeled "Modeled" at every instance. Methodology section explains the approximation and its limitations. |
| "Final group" characterization of 2006 committee | The Hall of Fame described the 2006 Special Committee as the final dedicated ballot for Negro Leagues players. Whether this effectively closed the pathway or merely shifted it to the regular era committee process is debated. | baseballhall.org, SABR publications, subsequent era committee actions (2022, 2024) | Presented as documented institutional history. The chapter notes that era committees have since inducted additional Negro Leagues players (Buck O'Neil, 2022). |
| Career WAR figures for dual-position players | Players like Martin Dihigo and Bullet Rogan contributed as both pitcher and position player. Seamheads WAR captures total value but positional bar comparison is inherently inexact for multi-position players. | Seamheads methodology documentation | Bar comparison uses the lower (more favorable) position bar. Labeled as a known limitation. |

---

## Cross-League Comparisons

### Negro Leagues Career WAR vs. MLB JAWS Position Averages

**Assumption 1:** WAR computed from Seamheads Negro Leagues data is comparable in scale to WAR computed from MLB data by FanGraphs and Baseball Reference.
**Assumption 2:** The 0.75 ratio of JAWS to career WAR observed in MLB data holds approximately for Negro Leagues careers.
**Assumption 3:** Position-specific HOF averages derived from MLB inductees represent a meaningful bar for Negro Leagues candidates, despite differences in league structure, season length, and competitive context.
**Precision cost:** Negro Leagues seasons were shorter than MLB seasons. Career WAR totals are therefore structurally lower for Negro Leagues players of equivalent talent. Rate-based metrics (Rate JAWS, Rate WAR from Ch 10) partially address this, but the position bar itself is calibrated on MLB career totals, not rates.
**Calibration:** The 25 inducted Negro Leagues Hall of Famers serve as a partial calibration set. Their career WAR and estimated JAWS values are distributed around and below the position bars, consistent with the structural career-length disadvantage.
**Confidence interval:** No formal confidence interval is computed. The chapter presents the comparison as an analytical framework with documented assumptions, not a precise measurement.

---

## Reproducibility

**Code:** `chapters/11-cooperstown/models/hof_probability.py` (MIT licensed)
**Data:** All pre-computed outputs in `chapters/11-cooperstown/data/` (CC0 licensed)
**Raw data:** Requires `chapters/10-the-ledger/data/rate-jaws.json` (from the Ch 10 pipeline). FanGraphs JAWS position averages were manually extracted from published articles (URLs in `data/hof-standards.json`). 42 for 21 results from https://www.42for21.org/results.
**Environment:** Python 3.12. No external library dependencies.
**Runtime:** Under 1 second on standard hardware.

To reproduce:
```bash
cd chapters/11-cooperstown/models/
python3 hof_probability.py
```

Output file `data/hof-probability.json` will match the committed version.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-05-25 | Initial publication |

---

## Citation

Haynes, Jeremy. "Cooperstown -- Methodology." *The Other Box Score*, May 2026. https://theotherboxscore.org/chapters/cooperstown/

BibTeX:
```bibtex
@article{tobs-cooperstown-methodology,
  author  = {Haynes, Jeremy},
  title   = {Cooperstown -- Methodology},
  journal = {The Other Box Score},
  year    = {2026},
  month   = {May},
  url     = {https://theotherboxscore.org/chapters/cooperstown/}
}
```

Chicago:
Haynes, Jeremy. "Cooperstown -- Methodology." *The Other Box Score*, May 2026. https://theotherboxscore.org/chapters/cooperstown/.

---

## Questions and Corrections

If you find an error in this methodology, open an issue at https://github.com/other-boxscore/other-boxscore/issues or contact the project maintainer. Corrections are documented in the version history above.
