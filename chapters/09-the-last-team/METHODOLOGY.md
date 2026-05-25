# The Last Team -- Methodology
## theotherboxscore.org/chapters/the-last-team/

**Version:** 1.0
**Published:** May 2026
**Last updated:** 2026-05-25
**Reviewed by:** Elias (statistical methodology) · Oscar (historical grounding)

---

## What This Chapter Does

This chapter models integration not as a single moment in 1947 but as sixteen separate decisions distributed across twelve years and ninety-six days. It takes the integration date for each of the sixteen MLB franchises active in 1947 and applies survival analysis to the distribution. How long did each team hold out? Which factors predicted faster or slower integration? And what did each team's delay cost in forfeited talent? Three models answer these questions: a Kaplan-Meier survival estimator that charts the pace of integration, a simplified Cox proportional hazards analysis that tests whether league, region, or tryout history predicted integration speed, and a forfeited WAR calculation that estimates how much talent each holdout team left on the table.

---

## Data Sources

### Integration Events Dataset
- **Source:** MLB.com official list (August 2020), SABR BioProject, NLBM Barrier Breakers
- **URL or archive location:** MLB.com; SABR BioProject individual entries; NLBM digital archive
- **Coverage:** All 16 MLB franchises active in 1947. For each: integration date, first Black player, tryout dates (where documented), and tryout context.
- **License:** Public domain (historical facts)
- **Access date:** 2026-05-24
- **Known limitations:** "First Black player" categorization follows MLB's official recognition. Where the first Black player is of Afro-Caribbean or Afro-Latin descent, this is labeled at the point of claim. SABR's Jackie 75 Pioneers list uses a broader definition for some teams (e.g., Carlos Bernier for the Pirates, Chico Fernandez for the Phillies); this dataset uses MLB's official designations (Curt Roberts, John Kennedy). Tryout dates rely on newspaper reporting (Pittsburgh Courier, Chicago Defender, Wendell Smith Papers at the Baseball Hall of Fame) and may be incomplete.
- **How used in this chapter:** The core input. Each team's integration date defines its "event time" relative to Robinson's debut (April 15, 1947). The survival analysis models this distribution.

### NLB Player Data (for Forfeited WAR)
- **Source:** Seamheads Negro Leagues Database, via Chapter 10 data pipeline
- **URL or archive location:** https://www.seamheads.com/NegroLgs/
- **Coverage:** Career WAR for the top 50 NLB players
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** See Chapter 10 methodology for full documentation of the NLB player dataset
- **How used in this chapter:** Total NLB talent pool WAR used to estimate forfeited value per team based on wait time

### Verification Sources
- **Source:** Wendell Smith Papers (Baseball Hall of Fame), Pittsburgh Courier, Chicago Defender
- **Coverage:** Contemporaneous reporting on tryouts, signings, and integration events
- **License:** Archival / published works
- **Known limitations:** Newspaper coverage of tryouts was uneven. Some tryouts may have occurred without press coverage.
- **How used in this chapter:** Verification of tryout dates and context where documented

---

## Data Processing

### Step 1: Integration Timeline Construction
- **Tool:** Python (datetime parsing)
- **Input:** Integration dates from integration-events.json, parsed to datetime objects
- **Output:** Days from Robinson's debut (April 15, 1947) for each of 16 franchises. Classification by league (AL/NL), region (Northeast/Midwest/Border-South), and whether the team had a documented tryout.
- **Accuracy / success rate:** All 16 integration dates verified against SABR BioProject and Baseball Reference game logs
- **Failures and gaps:** Washington Senators classified as "Border/South" region. This is an imperfect classification for a border city, but the team's integration history aligns more with Southern resistance than Northern patterns.

### Step 2: Covariate Assignment
- **Tool:** Manual classification in Python script
- **Input:** Team name, league membership, city location, tryout documentation
- **Output:** League (AL/NL), region (Northeast/Midwest/Border-South), had-tryout (boolean)
- **Accuracy / success rate:** League assignment is factual. Regional assignment is a judgment call for border cases.

---

## Analytical Methods

### Kaplan-Meier Survival Estimation

**What it does:**
Estimates the probability that a team has not yet integrated as a function of time elapsed since Robinson's debut. Each team's integration is an "event." The survival curve steps downward each time a team integrates. At time zero (April 15, 1947), survival is 1.0 (no team has integrated yet). When the last team integrates, survival reaches 0.0.

**Why this method:**
Kaplan-Meier is the standard non-parametric survival estimator. It makes no assumptions about the shape of the underlying hazard function. With n=16, a parametric model would require distributional assumptions that cannot be justified.

**Inputs:**
Days from Robinson's debut for each of 16 franchises.

**Parameters:**
None (non-parametric). Bootstrap confidence bands use 1,000 resamples.

**Outputs:**
- Survival curve: survival probability at each event time, with 90% bootstrap confidence bands
- Hazard function: annual hazard rate (events per year, normalized by teams still at risk)
- Summary statistics: median survival time, mean survival time, last event

**Uncertainty:**
90% bootstrap confidence bands (1,000 resamples with replacement). At n=16, these bands are wide, particularly in the tails where few teams remain at risk.

**Validation:**
The survival curve is a direct description of the data. The bootstrap confidence bands are validated by the standard bootstrap procedure. There is no model to validate beyond the data itself.

**Limitations:**
- N=16 is small for survival analysis. Individual team decisions have outsized influence on the curve.
- The curve treats integration as a binary event. In reality, some teams signed their first Black player but continued discriminatory practices in roster construction, playing time, and housing.
- The "event" definition (first Black player rostered) does not capture depth of integration.

### Simplified Cox Proportional Hazards Analysis

**What it does:**
Tests whether three covariates predict the speed of integration: league (AL vs. NL), region (Northeast vs. Midwest), and whether the team had a documented pre-1947 tryout for Black players.

**Why this method:**
Cox regression is the standard method for estimating covariate effects on survival outcomes. However, with n=16, a full Cox regression is statistically unreliable. This implementation uses a simplified approach: hazard ratios are estimated from the ratio of median survival times, and significance is tested using the Mann-Whitney U test (a non-parametric rank-sum test).

**Inputs:**
Days from Robinson's debut for each franchise, classified by league, region, and tryout status.

**Parameters:**
None (non-parametric testing). Approximate 95% confidence intervals on hazard ratios computed as 0.5x to 2.0x of the point estimate.

**Outputs:**
For each covariate:
- Hazard ratio (ratio of median survival times, inverted so that >1 means faster integration)
- P-value from Mann-Whitney U test
- Median survival time per group
- Significance flag (p < 0.05)

**Uncertainty:**
Approximate 95% confidence intervals. The p-value from the Mann-Whitney test provides formal significance testing, though power is limited at n=16.

**Validation:**
The Cox analysis describes patterns in the data. With n=16, no result should be treated as a causal claim. The covariates were chosen based on historical reasoning (league governance structures, regional segregation patterns, documented tryout history), not data mining.

**Limitations:**
- N=16 severely limits statistical power. Non-significant results may reflect insufficient sample size rather than absence of effect.
- The covariates are crude. "Region" collapses complex local politics into three categories. "Had tryout" is binary and does not capture the sincerity or outcome of the tryout.
- The simplified Cox approach (median ratio) is less efficient than a properly fitted Cox model but more honest at this sample size.
- Confidence intervals are approximate, not derived from a formal Cox likelihood.

### Forfeited WAR Calculation

**What it does:**
Estimates how much talent each holdout team left on the table by delaying integration. For each team, the calculation asks: given the pool of NLB talent available during the wait period, how much WAR could this team have captured?

**Why this method:**
This is a rough order-of-magnitude estimate, not a precise counterfactual. It demonstrates that delay had a measurable cost in on-field performance.

**Inputs:**
- Wait time in years (days from Robinson divided by 365.25)
- Total NLB talent pool WAR (aggregate career WAR across all 50 players in the Chapter 10 dataset)
- Number of teams still unintegrated at the time of each team's integration

**Parameters:**
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Pool WAR per year | Total NLB WAR / 12 (average career length) | Approximates the annual WAR available from the NLB talent pool |
| Team share | 1 / (remaining unintegrated teams) | Early movers captured a larger share of available talent |
| Discount factor | 0.15 | Conservative scaling to avoid overstating the accessible fraction of total NLB WAR |

**Outputs:**
Per-team estimated forfeited WAR, with wait years and share of pool noted.

**Uncertainty:**
No formal uncertainty bounds. This is labeled as a rough estimate ("Modeled -- rough estimate, not a precise counterfactual").

**Validation:**
The calculation is checked for face validity: the longest holdouts (Boston Red Sox, Detroit Tigers) should forfeit the most WAR. They do. The absolute magnitudes are plausible but should not be cited as precise figures.

**Limitations:**
- The discount factor (0.15) is an informed guess. A higher value would increase all estimates proportionally.
- The model assumes NLB talent was a shared pool. In practice, teams competed for specific players, and geographic, contractual, and personal factors influenced signings.
- The model does not account for which specific NLB players were available in which years. A time-resolved talent pool model would be more accurate but requires data not yet assembled.
- The "share" allocation (1/remaining teams) is a simplification. Early movers did not have equal access to all remaining talent.

---

## Machine Learning Models

This chapter uses no machine learning models. The Kaplan-Meier estimator is a non-parametric statistical method. The Cox analysis is a simplified regression. The forfeited WAR calculation is a parametric estimate with hand-set parameters.

---

## AI-Generated Content

### Narrative Content
**Generated by:** Claude (Anthropic)
**Prompt structure:** Historical narrative framing of the survival analysis results
**Inputs to the prompt:** Integration timeline, survival curve output, Cox analysis findings, forfeited WAR estimates
**Output:** Chapter prose contextualizing the statistical findings in the history of MLB integration
**Confidence label:** Editorial interpretation of documented data and modeled estimates
**Human review:** All prose reviewed by chapter author for historical accuracy and voice consistency
**Accuracy standard:** Every factual claim traces to a documented source. Statistical claims match model output.
**Known limitations:** Narrative framing of sixteen individual franchise decisions as a survival process imposes a framework that may obscure the unique circumstances of each decision.

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| Undocumented tryouts | Some teams may have conducted informal tryouts or evaluations without press coverage | The "had tryout" covariate may misclassify some teams | Teams without documented tryouts coded as "no tryout." The covariate shows no significant effect regardless. |
| Integration depth | "First Black player" captures timing but not depth of commitment | A team that integrated one position differs from one that integrated throughout the roster | Acknowledged as a limitation. The chapter focuses on the initial decision, not its follow-through. |
| Organizational motivation | Why each team integrated when it did is rarely documented in a single source | Cannot distinguish moral conviction from competitive pressure from fan demand | Not modeled. The chapter presents the distribution of timing without attributing motivation. |
| NLB talent availability by year | The forfeited WAR model uses aggregate NLB WAR, not year-specific talent availability | Teams that waited longer may have faced a depleted NLB talent pool as earlier movers signed the best players | The discount factor (0.15) partially addresses this, but a time-resolved model would be more precise |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| First Black player for each team | MLB official list, SABR Jackie 75 Pioneers, and Baseball Reference occasionally disagree on specific players (e.g., Pirates: Curt Roberts vs. Carlos Bernier) | MLB.com (Aug 2020), SABR BioProject, Baseball Reference game logs | MLB official designation used throughout, with SABR alternative noted at point of claim |
| Fenway tryout date | Universally reported as April 16, 1945, but at least one secondary source has April 14 | Wendell Smith Papers, Pittsburgh Courier (1945), Lester (2001), Bryant (2002) | April 16, 1945 used per Wendell Smith's contemporaneous reporting |
| Washington Senators regional classification | Washington, D.C. is a border city, not cleanly "South" or "Northeast" | Geographic and political analysis | Classified as "Border/South" with notation |

---

## Cross-League Comparisons

This chapter does not compare Negro Leagues and MLB player statistics directly. The cross-league element is the forfeited WAR calculation, which uses NLB WAR data to estimate what MLB teams missed by delaying integration. See the forfeited WAR model section above for full assumption documentation.

---

## Reproducibility

**Code:** `models/survival_analysis.py` (MIT licensed)
**Data:** `data/integration-events.json`, `data/km-output.json`, `data/cox-output.json`, `data/forfeited-war.json` (CC0 licensed)
**Raw data:** MLB.com integration list (public), SABR BioProject (public), Seamheads (public)
**Environment:** Python 3.12, NumPy 1.26, SciPy 1.12
**Runtime:** Under 5 seconds on standard hardware

To reproduce:
```bash
cd chapters/09-the-last-team/models/
pip install numpy scipy
python survival_analysis.py
```

Requires `data/integration-events.json` in the chapter data directory and `chapters/10-the-ledger/data/players.json` in the expected relative path. Random seed is set to 42 for bootstrap reproducibility.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-05-25 | Initial publication |

---

## Citation

Haynes, Jeremy. "The Last Team -- Methodology." *The Other Box Score*, 2026. https://theotherboxscore.org/chapters/the-last-team/

---

## Questions and Corrections

If you find an error in this methodology, open an issue at github.com/other-boxscore/other-boxscore or email the project maintainer. Corrections are documented in the version history above.
