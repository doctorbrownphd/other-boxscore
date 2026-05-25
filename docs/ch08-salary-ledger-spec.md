# The Salary Ledger -- Chapter 08
## The Other Box Score · Full Specification v1.0

**Series:** theotherboxscore.org
**URL:** theotherboxscore.org/chapters/the-salary-ledger/
**GitHub:** other-boxscore/chapters/08-the-salary-ledger/
**Part:** Two -- The game they played
**Position:** Chapter 08 of 15
**License:** MIT (code) · CC0 (data)
**Status:** SPEC v1.0
**Last updated:** May 2026

---

## One-Line Thesis

The wage gap between Negro Leagues and Major League players from 1920 through 1948 was not a market outcome. It was a transfer of wealth from Black labor to white ownership, and this chapter calculates the size of that transfer in 2024 dollars at the player, team, and league level.

---

## Why This Chapter Exists

Chapter 5 established that the Negro Leagues record is a major league record. Chapters 6 and 7 built out the game they played in the Caribbean and on the barnstorming circuit. Chapter 8 closes Part Two by answering a question that follows directly from Chapter 5's finding: if these were major league players producing major league value, what were they paid relative to what they should have been paid, and what is that gap worth today?

The chapter is called The Salary Ledger because the unit of analysis is the ledger entry. The Birmingham Black Barons financial ledger book at Notre Dame, fully digitized through Marble, shows Satchel Paige's 1928 monthly salary credits of $80.00 alongside debits for shoes, fines for missing curfew, and advances against future pay. That ledger is the primary source artifact. The chapter extends that artifact to its logical conclusion: every documented Negro Leagues player, every season they played, what they were paid, what an average MLB player at the same position earned that year, and the cumulative gap brought forward to 2024 dollars using both CPI and wage-index methods.

This is the chapter where the platform makes its sharpest economic argument. The numbers exist. The methodology is defensible. The conclusion is unavoidable.

---

## The Hook

**The ledger is real.**

In the archives at Notre Dame, in a financial ledger book that documents the Birmingham Black Barons from 1926 through 1930, there is an entry for a nineteen-year-old rookie pitcher named Leroy Paige. His salary in 1928 was $80 per month.

That same year, the average Major League pitcher earned approximately $7,200 for the season. Across a five-month Negro Leagues season, Paige earned $400. Across a six-month MLB season, his white counterpart at the same position earned eighteen times more.

This was not because the white pitcher was better. By every contemporary and modern measure, the white pitcher was not better.

This chapter calculates what that gap cost. Every documented Negro Leagues player. Every documented season. Total stolen wages, in 2024 dollars.

---

## Original Findings (the "oh wow" moments)

The chapter must produce findings that do not currently exist anywhere else on the web. The 2020 IBW21 reparations argument by James Hayes establishes the WAR plus average salary methodology at a conceptual level. This chapter operationalizes it at full scale, with confidence intervals, and produces several findings that are net new:

**Finding 1 -- The Aggregate**
Total documented wage gap, 1920 through 1948, in 2024 dollars, with low and high bounds. The headline figure. Calculated three ways (CPI, wage index, GDP share) so readers see how the choice of inflator changes the answer.

**Finding 2 -- The Individual Ledger**
Per-player career wage gap for every Negro Leagues player with sufficient documented service time. Ranked. The top of this list will contain names readers know (Gibson, Paige, Charleston, Bell) and names they do not. The not-knowing is part of the argument.

**Finding 3 -- The Team Ledger**
Per-franchise total wage gap. The Homestead Grays, the Kansas City Monarchs, the Pittsburgh Crawfords. Which franchise transferred the largest cumulative wealth out of Black labor.

**Finding 4 -- The Counterfactual**
A regression-based prediction of what each Negro Leagues star would have earned in MLB given their documented production, controlling for era, position, and league-wide salary inflation. Compared to what they actually earned. The delta is the per-player theft.

**Finding 5 -- The Compounding**
A finding the existing reparations literature does not address. If those wages had been paid, and invested at historical S&P returns, what would the estate of a deceased player be worth today. This is the intergenerational wealth transfer argument, made quantitatively for the first time.

---

## The Data

### Primary Sources (salary side)

- **Birmingham Black Barons Ledger Book, 1926-1930.** Notre Dame Rare Books and Special Collections, digitized via Marble. Provides direct monthly salary, debit, and credit data for a single NNL franchise across five seasons, including Paige's rookie years.
- **Larry Lester / SABR Negro Leagues Research Committee data.** Lester's documented salary research, including the $75 / $175 / $375 rookie / journeyman / star ranges for the 1920s and the $1 to $1.50 daily meal money figures.
- **Britannica salary curves.** Cross-referenceable to Lester and to Riley's biographical dictionary. $150/month journeymen in the 1920s, $400/month during WWII, $1,000/month for stars, $30,000 to $40,000 annual for Satchel Paige at the top of the market.
- **MLB Phillies UYA economic primer.** Documents the $3,000/month team-wide salary cap in 1926 and the reduction to $2,700/month by 1927. Provides team-level constraint data.
- **Robert Peterson, *Only the Ball Was White*** (1970). The foundational secondary source. Contains scattered salary references that anchor the ledger work.
- **Surviving player oral histories** (Buck O'Neil, Dennis Biddle, others). Cross-referenced for salary claims but treated as testimony not ledger data.

### Primary Sources (MLB comparison side)

- **SABR Business of Baseball Research Committee historical salary data.** Includes the annual salary leaders since 1874 dataset, updated through publication.
- **Baseball Almanac MLB historical salary tables.** Year-by-year average and median MLB salaries.
- **Babe Ruth and other star salary histories** as upper-bound comparison points. Ruth at $80,000 in 1930-31 is the ceiling. The league average is the appropriate comparison.
- **SABR research paper "Ballplayer Pay and Performance in the Face of Economic Depression"** (2009). Documents that MLB wages more than doubled in the 1920s while non-agricultural wages rose 21%, which directly establishes the counterfactual baseline.

### Inflation and Wage Index Sources

- **Bureau of Labor Statistics CPI historical series**, 1913 onward. Used for the CPI inflator.
- **Measuring Worth historical wage index.** Used for the relative wage inflator.
- **BEA GDP deflator.** Used for the GDP share inflator.

The three inflators produce different results by design. The chapter shows all three because the choice of inflator is itself a methodological claim, and the reader needs to see the spread.

### Production Data

- **Seamheads Negro Leagues Database** for per-season WAR and statistical production. This is the same data foundation as Chapter 5 and the broader platform.
- **2024 MLB integrated record book** as the official statistical record.
- **Baseball Reference player pages** for MLB comparison players.

---

## The ML / AI Pipeline

The chapter implements Tenant 10 (ML maximized) through five distinct model applications, each with confidence labels and methodology documentation. This is the chapter where the ML genuinely earns its place because the underlying question is fundamentally a problem of imputation under sparse and unevenly documented data.

### Model 1 -- Salary Imputation

**Problem:** Documented salaries exist for some players in some seasons. Most player-seasons have no salary record. The chapter cannot reach its findings without filling those gaps.

**Approach:** A hierarchical Bayesian model with priors set from the Lester / Britannica / Black Barons documented ranges. For each player-season, the model produces a posterior salary distribution conditional on team, year, role (rookie / journeyman / star, defined by prior-season WAR percentile within Negro Leagues), position, and league (NNL, NAL, ECL).

**Output:** Per player-season, a median imputed salary and a 90% credible interval.

**Confidence label:** Every imputed salary is labeled as imputed and accompanied by its credible interval. Documented salaries are labeled as documented with citation to ledger source.

**Why Bayesian and not regression:** The data is sparse, the priors are informative (we know the ranges from Lester), and the readers need credible intervals not point estimates. A flat OLS regression would understate uncertainty.

### Model 2 -- MLB Counterfactual Salary Prediction

**Problem:** What would a Negro Leagues player have earned in MLB, given their documented production?

**Approach:** A gradient-boosted regression trained on documented MLB salaries from 1920 through 1948 (target variable) using features: prior-season WAR, position, age, team payroll quartile, year fixed effect, league fixed effect (AL/NL). The model learns the MLB salary function from contemporary MLB players. It is then applied to Negro Leagues player-seasons using the player's Seamheads-derived WAR.

**Output:** Per Negro Leagues player-season, a predicted MLB salary with prediction interval.

**Confidence label:** Predictions outside the observed feature distribution (e.g., Josh Gibson 1943, whose WAR exceeds all observed MLB catcher seasons) are flagged as out-of-distribution and reported with widened intervals.

**Methodology note:** This approach builds on the Hayes IBW21 framing (use average MLB salary as the floor) but improves on it by predicting position-specific and production-specific MLB salaries rather than league-average.

### Model 3 -- Wage Gap and Reparations Calculation

**Problem:** Combine Models 1 and 2 to produce the gap, then inflate to 2024 dollars.

**Approach:** Per player-season, gap = predicted MLB salary minus imputed Negro Leagues salary. Inflated three ways. Aggregated to player career, team career, and league total.

**Output:** The Aggregate, Individual, and Team ledgers (Findings 1, 2, 3).

**Confidence:** Monte Carlo simulation over the joint posterior of Models 1 and 2 to produce career-level credible intervals. The headline figure is reported as a range, not a point estimate.

### Model 4 -- Compounded Estate Value

**Problem:** Translate the wage gap into the intergenerational wealth-transfer figure.

**Approach:** For each player, take the year-by-year wage gap, apply historical S&P 500 total return from the year of theft to 2024 (using Robert Shiller's monthly return series), and produce the compounded estate value the player's heirs would hold if the wages had been paid and invested.

**Output:** Per player, a compounded 2024 estate value. Aggregated to a league total.

**Confidence label:** The S&P assumption is explicit and noted as a methodological choice, not the only choice. The methodology page documents alternatives (T-bills, average household savings rates, real estate appreciation by region) and shows how they shift the result.

### Model 5 -- Sensitivity Analysis Engine

**Problem:** Readers will want to know which assumptions drive the headline figure most.

**Approach:** A Sobol sensitivity analysis over the model pipeline. Variance decomposition across: choice of inflator (CPI / wage / GDP), MLB comparison floor (league average / position average / predicted), Negro Leagues season length (assumed 5 months / actual documented games), barnstorming income inclusion (yes / no), and compounding rate.

**Output:** A reader-facing interactive sensitivity dashboard.

**Why this matters:** This is the model that protects the chapter against bad-faith critique. Every methodological choice is visible. Readers can adjust the assumptions and see the headline figure move. The chapter does not hide behind a single number.

---

## The Visualizations

Five visualizations carry the chapter. Each is purpose-built. Each is mobile-first per Tenant 13.

### Fig 01 -- The Single Ledger Entry

**The reader's entry point.** A reproduction of a real Birmingham Black Barons ledger page, rendered in two ways side by side.

**Left panel:** The actual digitized ledger page from Notre Dame Marble, showing Satchel Paige's 1928 monthly credits and debits. Visual presentation matches the archival source. Handwritten figures. Browned paper. Date entries down the left margin.

**Right panel:** The same ledger entries, rendered in a clean modern accounting format with one additional column: "MLB Equivalent." Each $80 monthly salary line now sits next to its $600 MLB equivalent. The $7.50 shoe debit sits next to nothing, because MLB players did not pay for their own shoes.

**The argument is in the design.** The two ledgers are formatted as if they could be the same document. They are not. They never were.

**Tech:** SVG-on-image overlay. The archival image is the base layer. The modern ledger is a structured SVG component rendered alongside.

**Mobile behavior:** On viewports below 768px, the two ledgers stack vertically with a synchronized scroll. Pinching the archival image zooms both.

**Oh wow test:** The reader sees the modern ledger entry alongside the original and understands, without annotation, that the MLB Equivalent column has been documented in archives the whole time. The numbers were never missing. They were just never compared.

### Fig 02 -- The Aggregate Curve

**The headline number, contextualized over time.**

A multi-line area chart spanning 1920 through 1948 on the x-axis, dollars on the y-axis. Three series:

1. **Annual Negro Leagues total payroll** (imputed from Model 1, aggregated)
2. **Annual MLB counterfactual payroll** for the same set of players (from Model 2)
3. **The annual gap** (difference, shaded)

The shaded gap area is the visual story. It grows during the WWII period when both leagues prospered and shrinks during the late 1930s when MLB salaries compressed.

A second visualization stacks below: the same data inflated to 2024 dollars using each of the three inflators, with the differences between them visible.

**Below the chart:** the headline number, rendered large.

> **Documented gap, 1920-1948, in 2024 dollars: $[X] to $[Y] depending on inflator choice. Best central estimate: $[Z].**

**Tech:** D3 layered area chart. Animated reveal of the gap region. Toggle controls for inflator selection.

**Mobile behavior:** Charts stack vertically. The headline number always sits at the top of viewport on mobile.

### Fig 03 -- The Individual Ledger (interactive)

**The leaderboard.**

A sortable, filterable table of every documented Negro Leagues player with sufficient service time. Columns:

- Player
- Career WAR (Seamheads-integrated)
- Documented earned (cumulative, 2024 dollars)
- Counterfactual MLB earned (cumulative, 2024 dollars)
- Gap (cumulative, 2024 dollars)
- Compounded estate value at 2024 (S&P assumption)
- Confidence label

Default sort: gap, descending. Default view: top 50 players.

Each row expands on click to show the per-season breakdown.

The five Hall of Famers at the top of this list will be names the reader knows. The next 45 will not all be. That is by design.

**Tech:** Static pre-computed JSON loaded into a virtualized table component. No server queries. Fully shareable URLs that preserve filter state.

**Mobile behavior:** Table collapses to card view at 768px. Each card shows player name, gap, and confidence label, with tap-to-expand for full breakdown.

### Fig 04 -- The Team Ledger

**The franchise view.**

A horizontal bar chart of cumulative gap by Negro Leagues franchise. Annotated with the team's documented payroll and the counterfactual MLB-equivalent payroll.

Below each bar: the names of the top three highest-gap players on that franchise across its operating years.

**Why this visualization matters:** It moves the argument from individual to institutional. The Homestead Grays did not just employ Josh Gibson. They employed an entire roster of players whose wages were systematically suppressed. The bar makes that visible.

**Tech:** D3 horizontal bar with custom annotations. Static pre-computed.

**Mobile behavior:** Bars remain horizontal. Annotations move below bars on narrow viewports.

### Fig 05 -- The Sensitivity Dashboard

**The methodology made interactive.**

A reader-facing control panel where five assumptions can be adjusted:

1. **Inflator:** CPI / Wage Index / GDP Share (radio)
2. **MLB Comparison Floor:** League Average / Position Average / Predicted (radio)
3. **Negro Leagues Season Length:** Documented games / Assumed 5 months (radio)
4. **Barnstorming Income:** Include / Exclude (toggle)
5. **Compounding Rate:** S&P 500 / T-Bills / Savings / None (radio)

Above the controls: the headline figure updates in real time as the reader adjusts.

A second component shows the Sobol variance decomposition: a stacked bar that shows what fraction of the variance in the headline figure each assumption is responsible for.

**Why this visualization matters:** It is the chapter's good-faith engagement with its own methodology. The reader cannot dismiss the chapter as "they cherry-picked the assumptions" because the reader can see every assumption and change it.

**Tech:** Pre-computed lookup table. The headline figure for every combination of the 5 assumptions is computed once at build time and stored as JSON. The UI is a lookup, not a live computation, which keeps the page fast.

**Mobile behavior:** Controls collapse into an accordion. The headline figure stays sticky at top.

---

## The Asset Register

**Archival images required:**

- Birmingham Black Barons Ledger Book, multiple pages (Notre Dame Marble, public domain status to be verified by Oscar)
- Satchel Paige c. 1928 portrait (PD verification required)
- Homestead Grays team photo, multiple years
- Kansas City Monarchs team photo, multiple years
- Pittsburgh Crawfords team photo, 1935 (the famous one)
- East-West game crowd photo (already in platform asset register from Chapter 5)

**Documentation requirements:**

Oscar must verify provenance and clearance for every archival image. The Notre Dame ledger images require attribution to the Joyce Sports Research Collection. Several player portraits will have unclear public domain status and may need to be replaced with verified alternatives or rendered as illustrations.

**Pre-computed data files:**

- `data/salary-ledger-imputed.json` -- Model 1 output. Per player-season imputed salary with credible intervals.
- `data/mlb-counterfactual.json` -- Model 2 output. Per player-season predicted MLB salary.
- `data/gap-by-player.json` -- Model 3 output, player level.
- `data/gap-by-team.json` -- Model 3 output, team level.
- `data/gap-aggregate.json` -- Model 3 output, league total, with three inflator versions.
- `data/estate-values.json` -- Model 4 output. Per player compounded estate value, multiple compounding assumptions.
- `data/sensitivity-grid.json` -- Model 5 output. The pre-computed lookup table.
- `data/asset-register.json` -- Updated with new chapter assets.

**Methodology documentation:**

- `METHODOLOGY.md` -- Full per-model documentation. Hyperparameters. Validation approach. Limitations. Cross-references to Lester, Hayes, Peterson, and the SABR Business of Baseball research.

---

## The Connective Tissue

### Tissue In (from Chapter 07)

Chapter 7 closes the barnstorming arc. The closing handoff written in the project owner's voice:

> *The barnstorming circuit was the parallel economy. Players earned in cash, in gate splits, in side deals with town teams from Bismarck to Brooklyn. None of it was in the contract. None of it shows up in the official ledger. But the ledger exists, and it tells a story of its own. The next chapter is about what the ledger says, what it costs to read it forward to 2024 dollars, and what number that produces.*

### Tissue Out (to Chapter 09)

> *The wages are one accounting. There is another. If every team had integrated in 1947, the gap would still be vast. But every team did not integrate in 1947. The last team waited twelve more years. The next chapter asks why, and which teams, and what the delay itself cost.*

---

## The Agent Reviews

### Oscar -- Asset and Provenance

Reviews the asset register for the chapter. Flags the Notre Dame ledger image attribution requirements. Verifies public domain status for all archival photos. Identifies any image that requires replacement or alternative treatment.

**Specific gates:** The Birmingham Black Barons ledger images must have explicit Joyce Sports Research Collection attribution and confirmed reuse rights. Any player photo without documented PD status is replaced or removed.

### Elias -- Data and Citation Integrity

Reviews every statistical claim against source. Verifies Lester's $75 / $175 / $375 figures. Verifies the Paige $80 monthly salary against the Notre Dame digitized ledger directly, not against secondary sources. Verifies SABR Business of Baseball salary curves. Verifies Hayes IBW21 piece is correctly attributed.

**Specific gates:** Every salary figure in Section 1 (the hook) must trace to a primary or authoritative secondary source with URL in the methodology document. The headline aggregate figure must have its computation reproducible from the published JSON data files and the documented methodology.

### Vera -- Visual and Accessibility

Reviews all five visualizations at 375px, 768px, and 1200px. Tests color scales for color-blindness accessibility. Verifies the side-by-side ledger comparison in Fig 01 renders intelligibly on mobile. Verifies the sensitivity dashboard is usable on mobile.

**Specific gates:** Fig 01 must pass the oh wow test at 375px, not just desktop. Fig 03 mobile card view must show gap and confidence label without horizontal scroll. Fig 05 sensitivity controls must be tappable with thumb on mobile.

### Ida -- Spec Adherence and Tenant Compliance

Reviews the chapter against the 15 tenants. Confirms Tenant 10 (ML maximized) is satisfied through Models 1 through 5. Confirms Tenant 05 (connective tissue) handoffs are written in project owner's voice. Confirms Tenant 14 (citable) requirements.

**Specific gates:** All five models documented. Both connective tissue paragraphs present. Citation block present and complete.

### Gates -- Merge Authority

Verifies Gate 1 (spec approval) before build. Verifies Gate 2 (build complete) before review cycle. Verifies Gate 3 (all five agents APPROVED) before merge. Conducts the oh wow test with five agent instances.

**Specific gates:** Oh wow test for this chapter is the Fig 01 ledger comparison. Minimum three of five test agents must identify the format-equality argument unprompted. If fewer than three do, Fig 01 returns to design.

---

## The Oh Wow Test

**Primary oh wow:** Fig 01, the side-by-side ledger. The reader sees Satchel Paige's actual 1928 ledger entries from the Notre Dame archive next to the same entries formatted as a modern accounting statement with an MLB Equivalent column, and understands without annotation that the comparison is being made because the comparison has always been makeable. The data existed. No one made the comparison.

**Secondary oh wow:** The headline figure in Fig 02. The reader sees the central-estimate aggregate gap rendered in 2024 dollars, presented as a range, with the methodology visible.

**Tertiary oh wow:** Fig 03. The reader scrolls past the names they expect to see at the top (Gibson, Paige, Charleston, Bell) and finds names they have never heard. Each of those names has a per-season ledger. Each has a confidence interval. Each has a compounded estate value. The not-knowing is the argument.

**Test protocol:** Five agent instances each read the chapter at 375px and 1200px without prompting on what to look for. Minimum three must independently identify the Fig 01 format-equality moment as the chapter's central argument. If fewer than three do, the visualization design returns to Vera and Oscar for refinement before the chapter can ship.

---

## Citation Block

```
Cite this chapter:
Haynes, Jeremy. "The Salary Ledger." The Other Box Score,
theotherboxscore.org/chapters/the-salary-ledger/, [Month Year].
Accessed [access date].

Chicago:
Haynes, Jeremy. "The Salary Ledger." The Other Box Score.
[Month Year]. https://theotherboxscore.org/chapters/the-salary-ledger/.

Data (CC0):
The Other Box Score. "Negro Leagues Salary Ledger Dataset." CC0 1.0.
https://github.com/other-boxscore/chapters/08-the-salary-ledger/data/.
[Version date].

Primary salary source:
Birmingham Black Barons Ledger Book, 1926-1930. Joyce Sports Research
Collection, Hesburgh Libraries, University of Notre Dame. Digitized via
Marble. https://marble.nd.edu/

SABR Negro Leagues Research:
Lester, Larry et al. SABR Negro Leagues Research Committee.
https://sabr.org/negroleagues

Foundational reparations argument:
Hayes, James M. "The Rightness of Negro League Player Reparations."
Institute of the Black World 21st Century, June 2020.
https://ibw21.org/editors-choice/the-rightness-of-negro-league-player-reparations/

MLB salary baseline:
SABR Business of Baseball Research Committee historical salary data.
http://research.sabr.org/business/

Production data:
Seamheads Negro Leagues Database. Agate Type Research.
Gary Ashwill and Kevin Johnson, lead researchers.
https://www.seamheads.com/NegroLgs/

MLB integrated record:
"Negro Leagues Statistics Now in the MLB Record Books."
Major League Baseball, May 28, 2024.
https://www.mlb.com/news/negro-leagues-statistics-incorporated-into-mlb-record-books
```

---

## Build Sequence

| Phase | Deliverable | Gate |
|-------|-------------|------|
| 1 | Acquire and parse Birmingham Black Barons ledger page set from Notre Dame Marble | Elias verifies attribution chain |
| 2 | Build salary documentation dataset from Lester, Britannica, MLB UYA, ledger | Elias verifies every figure to source |
| 3 | Build MLB historical salary dataset from SABR Business of Baseball + Baseball Reference | Elias verifies and documents gaps |
| 4 | Implement Model 1 (Bayesian salary imputation) and validate against documented cases | Elias verifies credible intervals contain documented values for known cases |
| 5 | Implement Model 2 (MLB counterfactual prediction) and validate against known MLB salaries | Elias verifies prediction intervals |
| 6 | Implement Models 3, 4, 5 (gap, compounding, sensitivity) | Elias verifies the headline figure is reproducible from published data |
| 7 | Build Fig 01 (ledger comparison) | Vera + Oscar joint review at 375px |
| 8 | Build Fig 02 (aggregate curve) | Vera reviews accessibility, Elias verifies headline figure |
| 9 | Build Fig 03 (individual ledger) | Vera reviews mobile card view |
| 10 | Build Fig 04 (team ledger) | Vera reviews annotation legibility |
| 11 | Build Fig 05 (sensitivity dashboard) | Vera reviews mobile tap targets |
| 12 | Write narrative copy and connective tissue paragraphs | Ida reviews tenant compliance |
| 13 | Oh wow test with five agent instances | Gates conducts, documents results |
| 14 | All five agents issue APPROVED verdicts | Gates issues MERGE |

---

## Open Questions for Project Owner

Before Gate 1 approval, the following decisions need confirmation:

**Question 1: Compounding assumption default.**
The default compounding rate shown in Fig 05 and the headline figure shapes the entire chapter's headline. S&P 500 produces the largest number but is the strongest methodological choice to defend. T-Bills is conservative and harder to attack. Recommend S&P 500 as default with explicit methodology note, but flagging for your call.

**Question 2: Living player handling.**
The chapter focuses on the 1920-1948 period. A small number of players from that era are still alive (Dennis Biddle is 88 as of 2023). The chapter could treat their figures differently (lifetime annuity equivalent rather than estate value) or treat them identically. Recommend identical treatment with a methodology note that says living players' figures are also presented as estate values for consistency, but flagging.

**Question 3: Headline figure positioning.**
The aggregate figure could be the chapter's opener (lead with the number) or the chapter's reveal (build the methodology, then drop the number in Fig 02). Recommend reveal because the chapter is built to defend the methodology, and the methodology is the chapter's contribution. The number alone is contestable. The methodology with the number behind it is not. Flagging for your call.

**Question 4: Hayes IBW21 attribution framing.**
The Hayes 2020 piece is the foundational public reparations argument using WAR. The chapter extends that approach significantly but it is not the originator. Recommend an explicit acknowledgment in the introduction that the WAR-plus-average-salary framework was first publicly proposed by Hayes, with this chapter operationalizing it at scale with additional ML rigor and confidence intervals. Flagging for your call.

---

## Status

SPEC v1.0 COMPLETE. Awaiting project owner review and Gate 1 approval.
