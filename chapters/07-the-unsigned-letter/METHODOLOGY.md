# The Unsigned Letter -- Methodology
## theotherboxscore.org/chapters/the-unsigned-letter/

**Version:** 1.0
**Published:** May 2026
**Last updated:** 2026-05-25
**Reviewed by:** Elias (statistical methodology) · Oscar (historical grounding)

---

## What This Chapter Does

This chapter asks what was lost when the Boston Red Sox held a tryout for three Black players at Fenway Park on April 16, 1945, and then did nothing. Jackie Robinson, Sam Jethroe, and Marvin Williams all tried out that morning. Robinson eventually reached MLB with the Dodgers two years later. Jethroe debuted with the Braves five years later, at age 32. Williams never played a single MLB game. The chapter uses an age-curve projection model to estimate the careers each player would have had if the Red Sox had signed them on the spot. Robinson's actual career (61.5 bWAR, 1947--1956) serves as the calibration check. The combined cost, measured in WAR alone, runs into the dozens. The chapter is titled for the contract letter Marvin Williams never received.

---

## Data Sources

### Baseball Reference (bWAR)
- **Source:** Baseball Reference
- **URL or archive location:** https://www.baseball-reference.com/
- **Coverage:** Complete MLB career statistics for Jackie Robinson (1947--1956) and Sam Jethroe (1950--1954)
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** bWAR is a derived metric. Different WAR implementations (fWAR, rWAR) produce slightly different totals. This chapter uses bWAR throughout for consistency.
- **How used in this chapter:** Actual career WAR by season for Robinson and Jethroe. Robinson's career serves as the calibration baseline for the age-curve model.

### Seamheads Negro Leagues Database
- **Source:** Seamheads Negro Leagues Database
- **URL or archive location:** https://www.seamheads.com/NegroLgs/
- **Coverage:** NLB career statistics, rate WAR, batting lines for comparable players
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** NLB statistical coverage is incomplete. Documented games represent a fraction of total games played. Rate WAR is computed from documented games only.
- **How used in this chapter:** NLB rate WAR for comparable second basemen (George Scales, Newt Allen) used to anchor Marvin Williams' talent estimate.

### MLB Official Integrated Records
- **Source:** MLB.com
- **URL or archive location:** https://www.mlb.com/press-release/press-release-statistics-of-the-negro-leagues-officially-enter-the-major-league-record
- **Coverage:** Official MLB integrated records incorporating Negro Leagues statistics
- **License:** Public domain (facts)
- **Access date:** 2026-05-24
- **Known limitations:** The integrated records cover a subset of Negro Leagues players
- **How used in this chapter:** Cross-reference for Robinson and Jethroe career data

### Integration Events Dataset
- **Source:** MLB.com (Aug 2020), SABR BioProject, NLBM Barrier Breakers
- **URL or archive location:** Compiled from multiple sources
- **Coverage:** Integration dates, tryout records, and first Black player for all 16 MLB teams
- **License:** Public domain (historical facts)
- **Access date:** 2026-05-24
- **Known limitations:** Tryout dates for some teams are undocumented. The Fenway tryout date (April 16, 1945) is verified against Wendell Smith's reporting in the Pittsburgh Courier.
- **How used in this chapter:** The Fenway tryout context and the Red Sox's position as the last team to integrate (1959) frame the counterfactual.

### Historical References
- **Source:** Larry Lester, *Black Baseball's National Showcase* (2001); Howard Bryant, *Shut Out* (2002)
- **Coverage:** Fenway tryout context, player evaluations, Red Sox integration history
- **License:** Published works (cited under fair use for factual claims)
- **Known limitations:** Secondary sources. Lester's tryout description is the most detailed published account.
- **How used in this chapter:** Narrative context for the tryout. Player skill evaluations. Historical framing.

---

## Data Processing

### Step 1: Player Record Assembly
- **Tool:** Manual compilation from Baseball Reference, Seamheads, and published sources
- **Input:** Career stats (Robinson, Jethroe), NLB stats (Williams), tryout reports
- **Output:** Three player records with birthdates, tryout age, career WAR, and rate stats
- **Accuracy / success rate:** Robinson and Jethroe data verified across Baseball Reference and SABR BioProject. Williams data verified against Seamheads and Mexico League records.
- **Failures and gaps:** Williams has no MLB career data. His talent level is estimated entirely from NLB comparables and Mexico League batting performance.

### Step 2: Age Curve Construction
- **Tool:** Manual derivation from historical career arcs
- **Input:** Season-by-season WAR for seven 1940s--1950s MLB position players: Robinson, Doby, Minoso, Kiner, Musial, Snider, Campanella
- **Output:** A composite age-curve multiplier table (ages 22--39), with peak production (multiplier 1.0) at ages 27--28
- **Accuracy / success rate:** The curve is a stylized average, not a fitted model. Individual players deviate from the composite. Robinson's own career, which peaked later (age 30), illustrates the variance.
- **Failures and gaps:** The composite is derived from players who actually reached MLB. Players denied access may have had different aging patterns due to inferior training facilities, travel conditions, or medical care in the Negro Leagues. This is unknowable.

---

## Analytical Methods

### Age-Curve Career Projection

**What it does:**
Projects a season-by-season WAR trajectory for a player by applying an age-based production multiplier to a calibrated peak WAR per season.

**Why this method:**
Age curves are the standard tool for career projection in baseball analytics. The method is transparent, deterministic, and reproducible. Every assumption is visible in the age-curve table and the peak WAR parameter. More complex approaches (Bayesian aging models, PECOTA-style similarity scores) would add opacity without improving the fundamental estimate, given the limited NLB data available.

**Inputs:**
- Player's age at hypothetical debut (26 for Robinson, 27 for Jethroe, 25 for Williams)
- Peak WAR per season: calibrated for each player from available data
- Career end age: set based on comparable career lengths

**Parameters:**
| Age | Multiplier | Age | Multiplier |
|-----|-----------|-----|-----------|
| 22 | 0.55 | 31 | 0.88 |
| 23 | 0.65 | 32 | 0.82 |
| 24 | 0.78 | 33 | 0.75 |
| 25 | 0.88 | 34 | 0.67 |
| 26 | 0.95 | 35 | 0.58 |
| 27 | 1.00 | 36 | 0.48 |
| 28 | 1.00 | 37 | 0.38 |
| 29 | 0.97 | 38 | 0.28 |
| 30 | 0.93 | 39 | 0.18 |

Peak WAR per season by player:
- **Robinson: 7.8** -- calibrated so the model's ages 28--37 output approximates his actual 61.5 bWAR. Derived from his actual rate WAR per 600 PA (6.36) adjusted upward for his elite peak seasons.
- **Jethroe: 5.4** -- back-solved from his actual 1950 season (4.4 bWAR at age 32, divided by age curve multiplier 0.82). His NL Rookie of the Year at age 32 and 89 stolen bases over two seasons suggest this may be conservative.
- **Williams: 3.5** -- estimated from NLB comparable second basemen (George Scales: 4.48 rate WAR, Newt Allen: 37.8 career WAR) with an NLB-to-MLB translation discount of approximately 20%. His .362 batting average in the 1945 Mexican League provides a talent anchor, though Mexico stats overstate MLB equivalency by 15--25% in this era.

**Outputs:**
Season-by-season projected WAR, cumulative career WAR, and total lost WAR (the difference between the counterfactual career and the actual career, or zero for Williams).

**Uncertainty:**
- Robinson: Low uncertainty. The model is calibrated against his actual career. The added seasons (ages 26--27) project approximately 15 additional WAR.
- Jethroe: Moderate uncertainty. The back-solve from a single season (age 32) introduces error if his actual aging curve differed from the composite. His speed-based game may have aged differently.
- Williams: High uncertainty. An explicit uncertainty range is provided: total career WAR likely between 18 and 35, with the point estimate at the model output. This is the widest credible interval of the three projections because no MLB data exists for calibration.

**Validation:**
Robinson's actual career is the calibration check. The model projects his ages 28--37 and compares to the known 61.5 bWAR total. The calibration error is small, validating the age-curve shape for this era. Jethroe has a partial calibration: the model's ages 32--36 are compared to his actual 7.3 bWAR. Williams has no calibration possible.

**Limitations:**
- The age curve is a composite average. Individual players deviate, sometimes substantially.
- The model assumes the player stays healthy. Injuries, particularly in the pre-modern medical era, are not modeled.
- The model assumes MLB team context is average. Robinson's actual career benefited from playing for the Brooklyn Dodgers, a strong team. Jethroe played for the declining Braves. Williams' hypothetical team context is unknown.
- The NLB-to-MLB translation for Williams assumes a 20% discount. This number is an informed estimate, not a measured quantity.
- The model does not account for the psychological toll of being a pioneer. Robinson's actual career was shaped by pressures that a 1945 signing would have introduced two years earlier.

---

## Machine Learning Models

This chapter uses no machine learning models. The age-curve projection is a deterministic parametric model with hand-set parameters.

---

## AI-Generated Content

### Counterfactual Career Projections
**Generated by:** Deterministic age-curve model (not a neural network or LLM)
**Prompt structure:** Not applicable -- the model is a Python script with explicit parameters
**Inputs to the prompt:** Peak WAR per season, age at debut, career end age, age-curve multiplier table
**Output:** Season-by-season WAR projections for each of three players under the counterfactual scenario
**Confidence label:** Each projection is labeled with its confidence level: Modeled (Robinson and Jethroe counterfactuals), Estimated (Williams)
**Human review:** All projections reviewed against historical context by chapter author. Calibration checks performed against actual careers where possible.
**Accuracy standard:** Robinson calibration error must be small (under 10%). Jethroe partial calibration provides a sanity check. Williams uncertainty range must be honestly wide.
**Known limitations:** Counterfactuals are inherently unprovable. The model produces the most defensible estimate available, not the truth. The truth is that the Red Sox chose not to sign them, and the actual careers that followed were shaped by that choice.

### Narrative Content
**Generated by:** Claude (Anthropic)
**Output:** Chapter prose framing the counterfactual findings
**Human review:** All prose reviewed for historical accuracy and voice consistency
**Confidence label:** Narrative content labeled as editorial interpretation of modeled data

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| Williams MLB career | Marvin Williams never played in MLB, so no calibration data exists | The Williams projection has the widest uncertainty of the three players | Explicit uncertainty range provided (18--35 career WAR). Point estimate derived from NLB comparables. |
| NLB season-by-season WAR | Seamheads provides career totals but not season-by-season WAR for most players | Cannot compute actual age curves for NLB players | The age curve is derived from MLB players of the same era who did play. This is the best available proxy. |
| Tryout evaluation details | No formal scouting report from the Fenway tryout survives | Cannot independently assess Williams' talent beyond NLB and Mexico stats | Multiple secondary sources (Lester, Bryant) provide qualitative assessments. Quantitative estimate uses documented NLB comparables. |
| Robinson pre-MLB development | Robinson played one NLB season (1945 Kansas City Monarchs) before his 1947 debut. His development trajectory in a 1945 debut scenario is speculative. | Could affect the projection for his age-26 season | The model uses the age curve directly. Robinson's actual rate of development may have differed. |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| Robinson's peak WAR per season | Different WAR implementations give different totals. bWAR = 61.5, fWAR = 59.0 | Baseball Reference, FanGraphs | bWAR used throughout, choice documented |
| Jethroe's age at debut | Some sources list Jethroe's birth year as 1917 or 1918 | SABR BioProject, Baseball Reference | 1918 used (SABR consensus), affecting the age-curve mapping |
| Williams' talent level | No MLB career to verify. NLB comparables and Mexico stats provide limited evidence | Seamheads, Mexico League records, Lester (2001) | Labeled as "Estimated" throughout. Explicit uncertainty range given. |
| NLB-to-MLB translation discount | No consensus on the appropriate discount for translating NLB batting stats to MLB equivalents | SABR research, Seamheads methodology notes | 20% discount used as informed estimate, not measured quantity. Stated explicitly as an assumption. |

---

## Cross-League Comparisons

### NLB-to-MLB Talent Translation (Williams only)

**Assumption 1:** NLB comparable rate WAR (from Seamheads) can serve as a proxy for talent level in the absence of MLB data
**Assumption 2:** A 20% discount on NLB rate WAR approximates the MLB equivalent, accounting for smaller roster pools and shorter seasons in NLB play
**Assumption 3:** Mexico League batting statistics overstate MLB equivalency by 15--25%, based on historical cross-league comparisons
**Precision cost:** The Williams projection could be off by as much as 50% in either direction. The uncertainty range (18--35 career WAR) attempts to capture this.
**Calibration:** No direct calibration is possible for Williams. The general NLB-to-MLB translation is partially validated by Robinson's and Jethroe's actual MLB performance relative to their NLB reputations.
**Confidence interval:** Williams total career WAR: 18--35 (point estimate at model output)

---

## Reproducibility

**Code:** `models/counterfactual.py` (MIT licensed)
**Data:** `data/counterfactual.json` (CC0 licensed), `data/integration-events.json` (CC0 licensed)
**Raw data:** Baseball Reference (public), Seamheads (public), MLB.com (public)
**Environment:** Python 3.12 (standard library only, no external dependencies)
**Runtime:** Under 1 second on standard hardware

To reproduce:
```bash
cd chapters/07-the-unsigned-letter/models/
python counterfactual.py
```

Output files will appear in `data/` and match the committed versions. The model is fully deterministic.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-05-25 | Initial publication |

---

## Citation

Haynes, Jeremy. "The Unsigned Letter -- Methodology." *The Other Box Score*, 2026. https://theotherboxscore.org/chapters/the-unsigned-letter/

---

## Questions and Corrections

If you find an error in this methodology, open an issue at github.com/other-boxscore/other-boxscore or email the project maintainer. Corrections are documented in the version history above.
