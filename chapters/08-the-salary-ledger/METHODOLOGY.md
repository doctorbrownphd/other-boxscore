# The Salary Ledger -- Methodology
## theotherboxscore.org/chapters/the-salary-ledger/

**Version:** 1.0
**Published:** May 2026
**Last updated:** 2026-05-25
**Reviewed by:** Elias (statistical methodology) · Oscar (historical grounding)

---

## What This Chapter Does

This chapter calculates what Negro Leagues players were paid, what they would have been paid in MLB, and the size of the gap between the two in 2024 dollars. It then compounds that gap forward as if the stolen wages had been invested in the S&P 500, producing an estate value for each player. Five models work in sequence: a hierarchical Bayesian salary imputation for NLB earnings, an MLB counterfactual salary predictor, a wage gap calculator with CPI inflation, a compounded estate value model using historical market returns, and a sensitivity analysis grid that shows how the headline figure changes under 108 different combinations of defensible assumptions. The chapter covers the top 50 Negro Leagues players by WAR. The full-league gap across 2,300+ players would be substantially larger.

---

## Data Sources

### Negro Leagues Salary Priors
- **Source:** Larry Lester, cited in USA Today, December 2020
- **URL or archive location:** USA Today reporting; Britannica "Negro league: The Negro leagues gain prominence"
- **Coverage:** Monthly salary ranges by era (1920s, 1930s, 1940s) and player tier (rookie, journeyman, star). Documented season length of approximately 5 months.
- **License:** Published works (factual data)
- **Access date:** 2026-05-24
- **Known limitations:** These are ranges, not individual salary records. The Lester figures represent the best-documented estimates available but cannot be verified against individual contracts for most players, because most contracts do not survive.
- **How used in this chapter:** Informative Bayesian priors for the salary imputation model. The prior distributions center on Lester's documented ranges with stated standard deviations.

### Birmingham Black Barons Account Book, 1926--1930
- **Source:** Joyce Sports Research Collection, Hesburgh Libraries, University of Notre Dame
- **URL or archive location:** https://marble.nd.edu/item/aspace_b2e64eef375ce765e4583929504e83b1
- **Coverage:** Monthly salary entries for the Birmingham Black Barons, 1926--1930
- **License:** Public domain (archival document)
- **Access date:** 2026-05-24
- **Known limitations:** Covers one team over five years. Not representative of all franchises or all eras.
- **How used in this chapter:** Calibration point. Satchel Paige's documented $80/month in 1928 from this ledger anchors the 1920s prior.

### NLB Player WAR Data
- **Source:** Seamheads Negro Leagues Database, via Chapter 10 data pipeline
- **URL or archive location:** https://www.seamheads.com/NegroLgs/
- **Coverage:** Career WAR and rate WAR for 50 NLB players
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** WAR is a derived metric computed from incomplete game records. See Chapter 10 methodology for full documentation.
- **How used in this chapter:** Player tier classification (star/journeyman/rookie) is based on career WAR per season. Higher WAR players receive higher salary imputations within each tier.

### MLB Historical Salary Data
- **Source:** SABR Business of Baseball Research Committee
- **URL or archive location:** SABR research publications
- **Coverage:** Average and star salary levels by decade, 1920s--1940s
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** Aggregate figures by era. Individual salary data for this period is sparse outside star players.
- **How used in this chapter:** MLB counterfactual salary prediction. Each NLB player's hypothetical MLB salary is predicted from era-level MLB salary distributions adjusted by WAR-based performance tier.

### CPI Historical Series
- **Source:** Bureau of Labor Statistics, CPI-U historical series
- **URL or archive location:** https://www.bls.gov/cpi/
- **Coverage:** Annual CPI values, 1920--2024
- **License:** Public domain (U.S. government data)
- **Access date:** 2026-05-24
- **Known limitations:** CPI measures consumer purchasing power, not wage equivalence or economic share. Alternative inflators (wage index, GDP share) produce significantly different figures.
- **How used in this chapter:** Primary inflation adjustment from historical to 2024 dollars. Alternative inflators explored in the sensitivity analysis.

### S&P 500 Historical Returns
- **Source:** Robert Shiller, *Irrational Exuberance* dataset
- **URL or archive location:** http://www.econ.yale.edu/~shiller/data.htm
- **Coverage:** Annual total returns (with dividends), 1920--2024
- **License:** Public domain / academic use
- **Access date:** 2026-05-24
- **Known limitations:** Decade-average returns are used rather than exact annual returns. This smooths short-term volatility but is appropriate for a sensitivity-aware estimate.
- **How used in this chapter:** Estate value compounding model. Each season's wage gap is compounded forward to 2024 using decade-average nominal total returns.

---

## Data Processing

### Step 1: Player Record Assembly
- **Tool:** Python pipeline reading Chapter 10 players.json
- **Input:** 50 NLB player records with career WAR, rate WAR, years active, and position
- **Output:** Player records enriched with seasons played, WAR per season, and tier classification
- **Accuracy / success rate:** All 50 players sourced from Seamheads-verified data
- **Failures and gaps:** Years active sometimes requires parsing from string format. Where parsing fails, defaults to 1930--1945 range.

### Step 2: Season-Level Computation
- **Tool:** Python (NumPy, SciPy)
- **Input:** Each player-season combination from start year through end year (capped at 1920--1948)
- **Output:** NLB imputed salary, MLB counterfactual salary, nominal gap, CPI-adjusted gap for each season
- **Accuracy / success rate:** Deterministic given the input data and model parameters. Stochastic components (Bayesian sampling) use seed 42 for reproducibility.

---

## Analytical Methods

### Tier Classification

**What it does:**
Assigns each player to one of three tiers based on career WAR per season: star (4.0+ WAR/season), journeyman (1.5--4.0), or rookie (below 1.5).

**Why this method:**
The historical salary structure of the Negro Leagues was tiered, with documented ranges for each level. Tier classification maps players to the appropriate prior distribution.

**Inputs:**
Career WAR divided by seasons played.

**Parameters:**
Star threshold: 4.0 WAR/season. Journeyman threshold: 1.5 WAR/season.

**Outputs:**
One of three tier labels per player.

**Limitations:**
WAR per season is an imperfect proxy for salary tier. Non-performance factors (seniority, team finances, barnstorming revenue) influenced actual salaries. The tier system captures the documented structure but not every individual deviation.

---

## Machine Learning Models

### M1: Hierarchical Bayesian Salary Imputation

**Model type:** Conjugate normal Bayesian model with informative priors
**Library / framework:** NumPy 1.26, SciPy 1.12, Python 3.12
**Training data:** Not trained in the supervised learning sense. Priors are set from documented salary ranges (Larry Lester). The model is generative: it samples from the posterior distribution of salary given era, tier, and WAR percentile within tier.

**Feature set:**
- Era (1920s, 1930s, 1940s): determines the prior salary distribution
- Tier (star, journeyman, rookie): selects the prior mean and standard deviation
- WAR percentile within tier: adjusts the prior mean upward for higher-performing players within a tier

**Hyperparameters:**
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Prior means (monthly salary) | $75--$1,000 by era and tier | Larry Lester documented ranges |
| Prior standard deviations | $20--$200 by era and tier | Set to allow reasonable spread within documented ranges |
| Season length | 5 months | Documented NLB season length |
| Floor | $50/month | No player earned below this documented minimum |
| n_samples | 5,000 | Sufficient for stable posterior estimates |
| Random seed | 42 | Reproducibility |

**Output:**
For each player-season: median imputed salary, 90% credible interval (5th and 95th percentiles), tier, era.

**Confidence representation:**
All salary figures labeled as "Modeled" with 90% credible intervals displayed in the visualization. The credible interval communicates that the true salary is uncertain but falls within a documented range.

**Known failure modes:**
- The model assumes all players within a tier and era draw from the same distribution. In reality, team-level financial variation was substantial.
- The Bayesian posterior with informative priors is dominated by the prior when there is no individual-level data to update on. For most players, the output is effectively the prior adjusted by WAR percentile.
- The 5-month season assumption is an average. Some players earned additional income from barnstorming (modeled separately in the sensitivity analysis).

**Reproducibility:**
```bash
cd chapters/08-the-salary-ledger/models/
pip install numpy scipy
python salary_imputation.py
```
Requires `chapters/10-the-ledger/data/players.json` in the expected relative path.

### M2: MLB Counterfactual Salary Prediction

**Model type:** Parametric salary prediction from era-level MLB distributions
**Library / framework:** NumPy 1.26, Python 3.12

**Feature set:**
- Era (1920s, 1930s, 1940s): determines the MLB salary distribution
- WAR per season: maps to position within the era's salary range (league average through star)

**Hyperparameters:**
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Mean annual salary (1920s) | $5,000 | SABR Business of Baseball |
| Mean annual salary (1930s) | $6,000 | SABR Business of Baseball |
| Mean annual salary (1940s) | $8,000 | SABR Business of Baseball |
| Star salary (1920s/30s/40s) | $20K/$25K/$35K | SABR documented star salaries |
| Floor | $2,000/year | Approximate MLB minimum for the era |
| n_samples | 5,000 | Sufficient for stable estimates |

**Output:**
For each player-season: median predicted MLB salary, 90% credible interval.

**Confidence representation:**
Labeled as "Modeled" with 90% credible intervals.

**Known failure modes:**
- Uses era-average MLB salaries, not team-specific or position-specific rates (position-specific explored in sensitivity analysis)
- Assumes NLB players would have received MLB-average compensation for their skill level. In practice, early Black MLB players may have been underpaid relative to white players of equal skill.
- The model does not account for reserve clause dynamics, which depressed all MLB salaries relative to a free market.

### M3: Wage Gap and CPI Inflation

**Model type:** Deterministic computation
**Library / framework:** Python 3.12

**What it does:**
Computes the gap between the MLB counterfactual and the NLB imputed salary for each player-season, then inflates the gap to 2024 dollars using CPI-U multipliers.

**Parameters:**
CPI multipliers are year-specific, derived from BLS historical series. Base year 1928 CPI = 17.1, 2024 CPI = 314.2, yielding a multiplier of approximately 18.4x for 1928 dollars.

**Output:**
Per-player career gap in 2024 dollars with approximate 90% credible interval (0.65x to 1.45x of point estimate, propagated from the underlying salary models).

**Known failure modes:**
- CPI measures consumer purchasing power. It does not measure wage equivalence (what a comparable job pays today) or economic share (what fraction of GDP the wages represented). These alternatives are explored in the sensitivity analysis and produce figures 2x to 4x larger.
- The credible interval propagation (0.65x--1.45x) is an approximation, not a formally computed joint posterior.

### M4: Compounded Estate Value

**Model type:** Deterministic compounding with historical market returns
**Library / framework:** Python 3.12

**What it does:**
Takes each season's nominal wage gap and compounds it forward to 2024 using historical S&P 500 total return rates. This answers the question: if the stolen wages had been paid and invested in the stock market, what would each player's estate be worth today?

**Parameters:**
| Decade | Annual Return | Source |
|--------|--------------|--------|
| 1920s | 15% nominal | Shiller dataset |
| 1930s | 0% nominal | Shiller dataset (Depression) |
| 1940s | 9% nominal | Shiller dataset |
| 1950s--2024 | 10.5% nominal | Shiller dataset, long-run average |

Compounding is year-by-year from the season year through 2024.

**Output:**
Per-player estate value in 2024 dollars with 90% credible interval (propagated from M3).

**Confidence representation:**
Labeled as "Modeled." The estate multiplier over CPI is reported (typically several multiples), showing how compounding amplifies the gap.

**Known failure modes:**
- Assumes reinvestment in the S&P 500 with full dividend reinvestment. Players may not have invested this way.
- Uses decade-average returns rather than exact annual returns. This smooths the Depression's impact (actual 1930s returns varied from -40% to +50% year to year).
- The thought experiment assumes the wages would have been invested rather than consumed. This is explicitly acknowledged as a rhetorical device, not a prediction.
- Does not account for taxes, fees, or the racial barriers to investment access that would have existed in this era.

### M5: Sensitivity Analysis Grid

**Model type:** Factorial grid over five modeling dimensions
**Library / framework:** Python 3.12

**What it does:**
Pre-computes the headline wage gap figure for every combination of five modeling assumptions, producing 108 scenarios. This allows the reader to see how the number changes under different but defensible choices.

**Dimensions:**
| Dimension | Options | Multiplier | Source |
|-----------|---------|------------|--------|
| Inflator | CPI (1x), Wage Index (2x), GDP Share (4x) | 1x / 2x / 4x | BLS, Census, Measuring Worth |
| MLB comparison | League Avg (1x), Position Avg (1.1x), Predicted (1x) | 1x / 1.1x / 1x | SABR, WAR model |
| Season length | 5 months (1x), Documented games (0.8x) | 1x / 0.8x | Lester, Seamheads |
| Barnstorming | Exclude (1x), Include (1.15x) | 1x / 1.15x | Lester estimates |
| Compounding | S&P 500, T-Bills (0.3x S&P), None (1x) | varies / 0.3x / 1x | Shiller, Fed |

**Output:**
108 headline figures ranging from the most conservative to the most aggressive defensible estimate.

**Confidence representation:**
Each combination is labeled as "Modeled" with the specific assumptions identified. The base case (CPI, league average, 5 months, no barnstorming, no compounding) is highlighted. The range communicates that the exact figure depends on assumptions, but the direction is the same under every scenario.

**Known failure modes:**
- The multipliers are approximate. Exact cross-inflator calculations would require more granular data.
- The grid assumes multiplicative independence of the five dimensions. In reality, some assumptions may interact.
- The "GDP share" inflator (4x CPI) produces the most extreme figures and is arguably the least appropriate for individual salary comparisons, though it captures the macro-economic framing.

---

## AI-Generated Content

### Salary Imputation Model Outputs
**Generated by:** Bayesian sampling model (NumPy/SciPy), not a neural network
**Prompt structure:** Not applicable -- deterministic/stochastic model with explicit parameters
**Output:** Per-player salary estimates with credible intervals
**Confidence label:** All salary figures labeled as "Modeled" with 90% credible intervals
**Human review:** Model outputs reviewed against documented calibration points (Paige 1928 salary, Paige 1942 peak)
**Accuracy standard:** Calibration points must fall within the model's credible interval
**Known limitations:** The model produces plausible estimates within documented ranges. It cannot recover the actual salary paid to any individual player.

### Narrative Content
**Generated by:** Claude (Anthropic)
**Output:** Chapter prose framing the economic analysis
**Human review:** All prose reviewed for accuracy and voice
**Confidence label:** Editorial interpretation of modeled data

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| Individual salary records | Surviving salary documents for NLB players are extremely rare. The Notre Dame ledger covers one team, five years. | Cannot verify individual player salary estimates against ground truth | Bayesian model with informative priors from documented ranges. Credible intervals explicitly wide. |
| Full-league coverage | Only the top 50 players by WAR are modeled. The NLB employed 2,300+ players over its history. | The total wage gap is substantially larger than what this chapter reports | Stated explicitly in the chapter. The 50-player figure is a floor, not a ceiling. |
| Barnstorming income | NLB players earned significant supplemental income from barnstorming tours, estimated at ~15% of regular season income | The NLB salary imputation may understate total earnings | Modeled as a sensitivity dimension (1.15x multiplier when included) |
| MLB racial pay gap | Early Black MLB players may have been underpaid relative to white players of equal WAR | The MLB counterfactual salary may overstate what these players would actually have been paid | Not modeled. The chapter frames the gap as what they should have earned, not what they would have earned given additional discrimination. |
| Investment access | Black Americans in the 1920s--1940s faced significant barriers to stock market investment | The estate value model assumes investment access that may not have existed | Explicitly acknowledged as a rhetorical thought experiment |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| Paige's 1942 income | Reported as high as $30,000--$40,000 annually including exhibitions | Britannica, Lester, NLBM | Documented at $30,000 (Britannica) with note that exhibitions could push higher |
| NLB season length | Various sources report 4--6 month seasons depending on era and team | Lester, NLBM, Seamheads game logs | 5 months used as standard; 0.8x multiplier explored in sensitivity |
| Appropriate inflation methodology | CPI, wage index, and GDP share produce vastly different figures | BLS, Census, Measuring Worth | All three computed in sensitivity grid. No single figure is presented as "the" answer. |

---

## Cross-League Comparisons

### NLB Salary vs. MLB Salary

**Assumption 1:** NLB players of equivalent WAR would have earned comparable MLB salaries in a non-segregated market
**Assumption 2:** The SABR Business of Baseball era-average figures accurately represent the MLB salary distribution
**Assumption 3:** WAR is a valid proxy for salary-determining performance in the 1920s--1940s era
**Precision cost:** Individual salary predictions could be off by 50% or more. The aggregate gap is more reliable than any individual estimate because errors partially cancel.
**Calibration:** The model's star-tier output for the 1940s is checked against documented star salaries (e.g., the Paige $30,000 figure). The MLB side is checked against SABR-documented salaries for named players.
**Confidence interval:** 90% credible intervals on all figures. The sensitivity grid provides the full range.

---

## Reproducibility

**Code:** `models/salary_imputation.py`, `models/estate_value.py`, `models/sensitivity.py` (MIT licensed)
**Data:** `data/salary-data.json`, `data/salary-imputed.json`, `data/wage-gap.json`, `data/estate-values.json`, `data/sensitivity-grid.json` (CC0 licensed)
**Raw data:** BLS CPI series (public), Shiller S&P data (public), Seamheads NLB data (public), SABR salary research (research access)
**Environment:** Python 3.12, NumPy 1.26, SciPy 1.12
**Runtime:** Under 30 seconds for the full pipeline on standard hardware

To reproduce:
```bash
cd chapters/08-the-salary-ledger/models/
pip install numpy scipy
python salary_imputation.py     # Produces salary-imputed.json, wage-gap.json
python estate_value.py          # Produces estate-values.json
python sensitivity.py           # Produces sensitivity-grid.json
```

Models must be run in order. `estate_value.py` depends on `salary-imputed.json`. `sensitivity.py` depends on both `salary-imputed.json` and `estate-values.json`. Requires `chapters/10-the-ledger/data/players.json` in the expected relative path.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-05-25 | Initial publication |

---

## Citation

Haynes, Jeremy. "The Salary Ledger -- Methodology." *The Other Box Score*, 2026. https://theotherboxscore.org/chapters/the-salary-ledger/

---

## Questions and Corrections

If you find an error in this methodology, open an issue at github.com/other-boxscore/other-boxscore or email the project maintainer. Corrections are documented in the version history above.
