# The Collapse -- Methodology
## theotherboxscore.org/chapters/the-collapse/

**Version:** 1.0
**Published:** May 2026
**Last updated:** 2026-05-25
**Reviewed by:** Elias (statistical methodology) · Oscar (historical grounding)

---

## What This Chapter Does

This chapter asks what happened to the Negro Leagues as an economic institution after Jackie Robinson crossed the color line in 1947. It tracks every documented franchise from 1920 through 1962, computes Kaplan-Meier survival curves on franchise lifespans, and compares the annual death rate of franchises before and after 1947. The finding is direct: integration accelerated franchise collapse dramatically. The post-1947 annual hazard rate was several multiples of the pre-1947 rate. MLB took the talent without compensating the institutions that developed it. The fans followed the talent. The gate revenue collapsed. Fifty years of Black baseball infrastructure was dismantled in roughly eight years.

---

## Data Sources

### Negro Leagues Franchise Histories
- **Source:** Seamheads Negro Leagues Database, SABR franchise histories, Wikipedia league articles (NNL, NNL-2, NAL, ECL)
- **URL or archive location:** https://www.seamheads.com/NegroLgs/
- **Coverage:** All documented Negro Leagues franchises, 1920--1962. Covers the Negro National League (NNL, 1920--1931), the Eastern Colored League (ECL, 1923--1928), the Negro National League second iteration (NNL-2, 1933--1948), and the Negro American League (NAL, 1937--1962).
- **License:** Public domain (historical facts)
- **Access date:** 2026-05-24
- **Known limitations:** Franchise boundaries are not always clean. Teams that moved between leagues are listed separately for each league tenure. Some franchises operated intermittently or under multiple names. The dataset uses continuous membership in a named league as the unit of analysis, which means a team that folded and reformed under a new name is counted as two separate franchises.
- **How used in this chapter:** Start year, end year, league affiliation, and cause of death for each franchise. These fields are the inputs to the survival analysis.

### Cause of Death Classifications
- **Source:** Compiled from Seamheads, SABR histories, and newspaper reporting
- **Coverage:** Every franchise receives one of six classifications: integration (folded 1947--62 with documented integration-related factors), depression (1929--34, financial collapse pre-integration), restructured (league folded but franchise continued in successor league), war (1942--45, manpower or travel constraints), uncertain (cause undocumented or multi-causal), survived (operated through end of organized Negro Leagues play).
- **Known limitations:** "Integration" as a cause of death is rarely a single factor. Loss of star players, declining attendance, and loss of media coverage all feed into each other. The classification captures the dominant documented factor, not the only factor.

---

## Data Processing

### Step 1: Franchise Record Assembly
- **Tool:** Manual compilation from Seamheads, SABR, and Wikipedia sources
- **Input:** Published franchise histories, league membership rolls, newspaper records
- **Output:** `data/franchises.json` -- 35 franchise records with start year, end year, league, city, cause of death, confidence level, and source citation
- **Accuracy / success rate:** All 35 franchises cross-referenced against at least two independent sources. Confidence field marks each record as "Documented" or "Estimated."
- **Failures and gaps:** Some minor franchises that played fewer than two seasons may not appear in the dataset. The focus is on franchises with sustained league membership.

### Step 2: Lifespan Computation
- **Tool:** Python (NumPy, SciPy)
- **Input:** Start and end years for each franchise
- **Output:** Lifespan in years, classification as pre-1947 or post-1947, active-in-1947 flag
- **Accuracy / success rate:** Deterministic computation from verified input data

---

## Analytical Methods

### Kaplan-Meier Survival Estimation

**What it does:**
Estimates the probability that a franchise survives at least N years. The survival curve steps downward each time a franchise folds. This is a standard non-parametric survival estimator used in medical and actuarial research, applied here to institutional lifespans.

**Why this method:**
Kaplan-Meier makes no assumptions about the shape of the survival distribution. It simply reports what happened. For a dataset of 35 franchises, a parametric model would impose assumptions we cannot justify.

**Inputs:**
Franchise lifespans (years from founding to dissolution) for all 35 franchises.

**Parameters:**
None. Kaplan-Meier is non-parametric.

**Outputs:**
A step function mapping years since founding to survival probability. Each step reports the number of franchises at risk, the number of events (deaths), and the updated survival probability.

**Uncertainty:**
Not computed via confidence bands in the current implementation. The small sample (n=35) means any confidence band would be wide. The curve is presented as an exact description of what happened, not a prediction.

**Validation:**
The survival curve is a direct read of the data. Validation consists of verifying the input franchise records. There is no model to validate, only data to verify.

**Limitations:**
The curve treats all franchise deaths as equivalent events regardless of cause. A franchise that folded due to the Great Depression is weighted the same as one that folded due to integration. The hazard comparison (below) addresses this by separating the two periods.

### Hazard Rate Comparison: Pre-1947 vs. Post-1947

**What it does:**
Computes the annual franchise death rate (hazard) in two periods: 1920--1946 and 1947--1962. The ratio of these two hazards measures how much integration accelerated franchise collapse.

**Why this method:**
A simple rate comparison is the most transparent way to show the discontinuity. More complex models (Cox regression, parametric survival) would add assumptions without improving clarity on a sample this small.

**Inputs:**
- Pre-1947 deaths: franchises with end year before 1947, start year 1920 or later
- Pre-1947 franchise-years at risk: total years of operation across all franchises active before 1947
- Post-1947 deaths: franchises with end year 1947 or later and cause of death classified as "integration"
- Post-1947 franchise-years at risk: total years of operation for franchises active between 1947 and 1962

**Parameters:**
The dividing line is April 15, 1947 (Robinson's debut). This is not a modeled parameter; it is a historical date.

**Outputs:**
Pre-1947 annual hazard, post-1947 annual hazard, and the ratio of the two.

**Uncertainty:**
No confidence interval is computed on the hazard ratio. The sample is a census, not a sample: every documented Negro Leagues franchise is included. The uncertainty is in the data completeness, not in sampling.

**Limitations:**
The post-1947 hazard counts only deaths classified as "integration." This is conservative. Some franchises classified as "uncertain" may also have been driven by integration-related factors. The hazard ratio should be understood as a lower bound.

### Year-by-Year Franchise Count

**What it does:**
Tracks the number of active franchises each year from 1920 through 1962, along with births and deaths per year. This produces the visual timeline of institutional collapse.

**Why this method:**
A simple count is the clearest way to show the trajectory. The peak year and the rate of decline are visible at a glance.

**Inputs:**
All 35 franchise records.

**Outputs:**
For each year: number of active franchises, number born, number died.

**Uncertainty:**
None. This is a direct count from the data.

**Limitations:**
Does not account for franchise quality or size. A team with 25 players and a team with 15 are counted the same. Does not capture barnstorming teams or independent clubs outside the organized leagues.

---

## Machine Learning Models

This chapter uses no machine learning models. All analysis is descriptive statistics applied to a verified census of franchise records.

---

## AI-Generated Content

### Narrative Context
**Generated by:** Claude (Anthropic)
**Prompt structure:** Historical narrative framing of the franchise survival data, written in the platform's editorial voice
**Inputs to the prompt:** Franchise data, survival analysis output, cause of death distributions
**Output:** Chapter prose contextualizing the statistical findings
**Confidence label:** All narrative content is labeled in the chapter as editorial interpretation of documented data
**Human review:** All prose reviewed by chapter author for historical accuracy and voice consistency
**Accuracy standard:** Every factual claim in the narrative must trace to a documented source. Interpretive claims are flagged as interpretation.
**Known limitations:** Narrative framing necessarily simplifies multi-causal processes. The chapter acknowledges this complexity in the methodology section.

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| Minor franchises | Teams that played fewer than two seasons or operated only as barnstorming clubs may be absent from the dataset | Could understate total franchise count and death count, but direction of the finding (post-1947 acceleration) would not change | Excluded from analysis; noted in methodology |
| Cause of death ambiguity | Several franchises died from multiple concurrent causes (financial distress, player loss, attendance decline) | Cause of death classification may over-simplify | Multi-causal deaths are classified by dominant documented factor; "uncertain" used when no single factor dominates |
| Financial records | Attendance and revenue data for most franchises do not survive | Cannot compute economic magnitude of the collapse directly | The chapter uses franchise death as a proxy for institutional collapse, which understates the damage to franchises that survived but shrank |
| Independent clubs | The dataset covers only franchises in organized Negro Leagues, not independent or barnstorming operations | The total institutional footprint of Black baseball was larger than what this dataset captures | Scope is explicitly stated as organized league franchises only |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| Number of "integration" deaths | Some franchise deaths classified as integration-related may have had concurrent financial causes | Seamheads, SABR, contemporary newspapers | Labeled as "Documented" when integration is the primary factor, "Estimated" when concurrent causes exist |
| Exact franchise count | Sources disagree on whether some short-lived teams constitute separate franchises or name changes of existing ones | Seamheads, SABR, Wikipedia | The dataset counts 35 franchises using the continuous-league-membership definition; this choice is documented |

---

## Cross-League Comparisons

This chapter does not make direct statistical comparisons between Negro Leagues and MLB player performance. The comparison is institutional: the survival of Negro Leagues franchises before and after MLB began signing Black players.

---

## Reproducibility

**Code:** `models/franchise_survival.py` (MIT licensed)
**Data:** `data/franchises.json` (CC0 licensed), `data/survival-output.json` (CC0 licensed)
**Raw data:** Franchise histories are compiled from public sources (Seamheads, SABR, Wikipedia). No registration or access fee required.
**Environment:** Python 3.12, NumPy 1.26, SciPy 1.12
**Runtime:** Under 5 seconds on standard hardware

To reproduce:
```bash
cd chapters/06-the-collapse/models/
pip install numpy scipy
python franchise_survival.py
```

Output files will appear in `data/` and match the committed versions. The random seed is set to 42, though no stochastic methods are used in the current implementation.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-05-25 | Initial publication |

---

## Citation

Haynes, Jeremy. "The Collapse -- Methodology." *The Other Box Score*, 2026. https://theotherboxscore.org/chapters/the-collapse/

---

## Questions and Corrections

If you find an error in this methodology, open an issue at github.com/other-boxscore/other-boxscore or email the project maintainer. Corrections are documented in the version history above.
