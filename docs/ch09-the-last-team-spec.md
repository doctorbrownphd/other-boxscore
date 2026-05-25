# The Last Team — Chapter 09
## The Other Box Score · Full Specification v1.0

**Series:** theotherboxscore.org
**URL:** theotherboxscore.org/chapters/the-last-team/
**GitHub:** other-boxscore/chapters/09-the-last-team/
**Part:** Three — The game they were kept from
**Position:** Chapter 09 of 15
**License:** MIT (code) · CC0 (data)
**Status:** SPEC v1.0
**Last updated:** May 2026

---

## One-Line Thesis

Integration was not a moment in 1947. It was a twelve-year, ninety-six-day distribution of moments, and this chapter models that distribution as a survival problem to identify which team-level factors predicted delay, what each year of delay cost in cumulative team WAR, and which franchises forfeited the most by waiting.

---

## Why This Chapter Exists

Chapter 8 closed Part Two with the wage ledger. This chapter opens Part Three by asking a different question that the integration narrative routinely flattens: integration did not happen. Integrations happened. Fifteen of them, plus Robinson, across twelve years and ninety-six days, by sixteen separate franchise decisions.

The standard narrative makes 1947 the year. The data makes 1947 through 1959 the period. The framing matters because the standard narrative collapses fifteen distinct franchise decisions, each made under different ownership, market conditions, and competitive pressures, into a single triumphant moment. The collapse erases what the chapter is built to surface: each year a team waited was a deliberate organizational choice, and each choice had a measurable cost.

This is the chapter where the platform's argument shifts from accounting (what was taken from players) to organizational accountability (what each franchise chose, and what each franchise's choice produced). Chapter 8 is about the labor side. Chapter 9 is about the management side.

The survival analysis frame is the right tool for this because the integration question is structurally a time-to-event problem. The event is the first Black player rostered. The subjects are the sixteen original franchises. The covariates are everything else: ownership, market, league, region, farm system depth, prior-year competitive position. The Cox model lets the chapter answer "which of these covariates predicted longer waits, controlling for the others" in a way no descriptive timeline can.

---

## The Hook

**Twelve years and ninety-six days.**

That is how long it took from Jackie Robinson's debut on April 15, 1947 to Pumpsie Green's debut on July 21, 1959. It is the gap between the league's first integration and its last. Across that span, fifteen other franchises made decisions about when to integrate. Some moved within months. Some waited more than a decade.

The Brooklyn Dodgers integrated in April 1947. The Cleveland Indians integrated eleven weeks later. The St. Louis Browns followed thirteen days after that. By the end of 1947, three of sixteen teams had at least one Black player on the major league roster.

By the end of 1948, still three.

By the end of 1949, four.

By the end of 1953, ten. By 1954, eleven. By 1955, twelve. By 1958, fifteen.

The Boston Red Sox waited until July 21, 1959. Twelve years and ninety-six days.

This chapter asks a question the standard integration narrative does not. What did each year of waiting predict? What did each year of waiting cost? And which franchises forfeited the most by waiting longest?

---

## Original Findings (the "oh wow" moments)

### Finding 1 — The Hazard Curve
The empirical hazard function for franchise integration from 1947 through 1959. Not the cumulative integration rate (which has been published) but the hazard, which shows for each year the conditional probability that a remaining unintegrated team would integrate. The shape of this curve is itself the finding. There are visible peaks (1947, 1953, 1954) and visible plateaus (1948, 1956-1957) that the descriptive timeline obscures.

### Finding 2 — The Cox Model
A Cox proportional hazards model identifies which team-level covariates predicted longer integration delay, controlling for the others. The candidate covariates include: league (AL/NL), region (Northeast / Midwest / South-leaning border / West Coast post-1958), ownership tenure, market size, prior-year team WAR, prior-year attendance, farm system depth, manager tenure, presence of a Black-population-significant home city.

The headline finding: league dummy and prior-year competitive position are the two strongest predictors of delay, with effect sizes calculated and reported with confidence intervals. The AL integrated significantly more slowly than the NL even after controlling for region and market. That is a documented historical observation. This chapter quantifies it for the first time.

### Finding 3 — The Forfeited WAR
For each team, the chapter calculates total Negro Leagues player WAR that was signable but unsigned during the team's pre-integration window. This is the counterfactual roster value the team forfeited by waiting. Calculated at the level of: total WAR available league-wide each year, minus the WAR already signed by other teams, weighted by geographic and competitive reasonableness of the signing.

The headline figure: the team with the highest forfeited WAR is not the Red Sox (the most famous late integrator) but a team the reader will not expect, because forfeited WAR depends on both years waited and quality of unsigned talent in those years, and the late-1940s talent pool was richest.

### Finding 4 — The Competitive Counterfactual
Using the forfeited WAR figures, the chapter estimates the alternative competitive outcomes for each franchise. How many additional wins per season would the late-integrating teams have had if they had integrated in 1947. Aggregated across the pre-integration window, how many pennants and World Series titles might have changed hands. This is the speculative finding. It is presented with explicit uncertainty bounds and is methodologically subordinate to Findings 1 through 3.

### Finding 5 — The Manager-Owner Decomposition
A frailty extension of the Cox model that partitions integration delay variance into team-frailty (persistent across ownership / management changes) and manager-owner-period frailty (specific to who was running the team at the time). The finding answers a question the historical literature debates without quantifying: was integration delay primarily an institutional characteristic of the franchise, or primarily a function of the specific person making the call. The answer changes the moral and historical reading of the period.

---

## The Data

### Primary Sources (event timing)

- **MLB official "first Black player" list.** The August 2020 MLB compilation, cross-referenced against the NLBM Barrier Breakers timeline. Establishes the event date for each of the sixteen original franchises.
- **SABR Bio Project Baseball Integration 1947-1986.** Provides the canonical 933-player list and per-team integration milestones.
- **Baseball Egg first-Black-player table** as additional cross-check.
- **Iowa Press *Black Baseball Out of Season*** as the academic baseline that profiles all of the players who integrated each team.

### Primary Sources (covariate data)

- **Baseball Reference team pages** for prior-year team WAR, prior-year attendance, manager tenure, and roster construction.
- **SABR Business of Baseball Research Committee** for franchise ownership history and market data.
- **U.S. Census decadal data** for Black population by metropolitan area (1940, 1950, 1960 censuses interpolated).
- **Negro Leagues team geographic footprint data** from Seamheads for market-overlap covariate.

### Primary Sources (forfeited WAR)

- **Seamheads Negro Leagues Database integrated record.** Per player-season WAR for every documented Negro Leagues player.
- **Roster of Negro Leagues players still active and unsigned by MLB in each year from 1947 through 1959.** Derived from Seamheads service-time records.

### Primary Sources (counterfactual outcomes)

- **Baseball Reference historical standings, pennants, and World Series records, 1947-1959.**
- **Pythagorean win expectation methodology** for translating WAR deltas to win deltas.

---

## The ML / AI Pipeline

Five model applications. Tenant 10 maximization.

### Model 1 — Kaplan-Meier Hazard Estimation

**Problem:** What was the empirical pattern of integration timing across franchises?

**Approach:** Non-parametric Kaplan-Meier estimation of the survival function S(t) and the corresponding hazard function h(t), where the event is first Black player rostered and the subjects are the sixteen original franchises. Robinson's Dodgers enter the risk set on day zero (April 15, 1947). The Red Sox exit the risk set on day 4,479 (July 21, 1959). All other franchises sit somewhere in between.

**Output:** The empirical hazard curve and survival curve, with confidence bands derived from bootstrap resampling.

**Confidence label:** Bands reflect the small-sample uncertainty inherent in n=16. The chapter explicitly addresses the small-n caveat.

**Why this and not a simple timeline:** The hazard function shows the conditional probability of integration in each year given the team had not yet integrated. The cumulative integration rate flattens out the year-to-year structure. The hazard preserves it. The 1953-1954 spike (Banks, Hank Aaron's class) is invisible in the cumulative rate. It is the central feature of the hazard.

### Model 2 — Cox Proportional Hazards Regression

**Problem:** Which team-level covariates predicted longer integration delay, controlling for others?

**Approach:** A Cox proportional hazards model with the integration event as the outcome and a vector of covariates measured at the team level. Time-varying covariates (annual attendance, prior-year WAR) are handled via the standard Andersen-Gill counting process formulation.

Candidate covariates:
- League (AL / NL) — binary
- Region — categorical (Northeast / Midwest / South-leaning border / West)
- Market size — log of metro population, time-varying
- Black population share of metro — time-varying
- Prior-year team WAR — time-varying
- Prior-year attendance rank — time-varying
- Owner tenure at time t — time-varying
- Branch Rickey effect — binary indicator for Dodgers under Rickey
- Bill Veeck effect — binary indicator for the franchise during Veeck's ownership tenure (Indians, then Browns/Orioles, then White Sox)

**Output:** Hazard ratios for each covariate with 95% confidence intervals. The Schoenfeld residuals test verifies the proportional hazards assumption for each covariate. Covariates that violate proportionality are reported with stratified estimation.

**Methodology note:** The proportional hazards assumption is testable and the test should be applied. If league fails proportionality (plausible given the AL/NL divergence widens over time), the chapter uses a stratified Cox model with league as the stratifying variable.

**Confidence label:** Every coefficient reported with 95% CI. Covariates with overlapping CI with zero are explicitly flagged as not statistically distinguishable from no effect.

### Model 3 — Forfeited WAR Calculation

**Problem:** How much Negro Leagues player WAR was theoretically signable but unsigned by each team in each pre-integration year?

**Approach:** This is not a single model but a multi-step accounting calculation with model components for the signability weighting.

Step 1: For each year 1947-1959, identify the pool of Negro Leagues players with positive prior-year WAR who were not yet signed by any MLB organization.

Step 2: For each player in the pool, calculate a signability weight for each unintegrated team. The weight reflects: geographic reasonableness (proximity of the player's Negro Leagues team to the MLB team's market), positional fit (need at the player's position relative to the team's existing roster), age (team-specific willingness to sign older players varied), and salary feasibility (team's documented payroll capacity that year).

Step 3: Aggregate per-team forfeited WAR as the sum of signability-weighted available WAR across years pre-integration.

**Output:** Per team, total forfeited WAR across the pre-integration window, decomposed by year.

**ML component:** The signability weighting function uses a logistic regression trained on actual post-integration signings. For each documented signing (Negro Leagues player X signs with MLB team Y in year Z), the model learns the features that predicted that pairing. The trained model is then applied to the pre-integration window to estimate signing probabilities for the actual unintegrated teams.

**Confidence label:** Per-team forfeited WAR is reported with bootstrap intervals reflecting uncertainty in the signing model and in the underlying Seamheads WAR data.

### Model 4 — Competitive Counterfactual Simulation

**Problem:** What is the range of plausible alternative competitive histories if late-integrating teams had integrated earlier?

**Approach:** A Monte Carlo simulation over team-seasons for the late-integrating teams. For each simulation iteration: sample a counterfactual roster that includes the players the team plausibly would have signed had it integrated earlier (drawn from the signability-weighted available pool), recompute team WAR with those additions, convert to expected wins via Pythagorean expectation, recompute standings.

Run 10,000 iterations. Report the distribution of counterfactual outcomes per team-season.

**Output:** Per team-season, the distribution of counterfactual team WAR, expected wins, and probability of pennant. Aggregated to per-team-decade counterfactual pennant count.

**Confidence label:** This is the most speculative model in the chapter. Outputs are reported as distributions, never as point estimates. The chapter explicitly notes that the counterfactual would have changed the talent pool available to all teams, including the early integrators, and that the simulation does not iterate this second-order effect. This limitation is documented.

**Why this matters:** This is the model that makes the cost of delay visible in the currency baseball fans understand. WAR is abstract. Pennants are not. The counterfactual must be done with humility and explicit bounds, but it must be done.

### Model 5 — Frailty Decomposition

**Problem:** Was integration delay driven by persistent franchise characteristics or by specific owner-manager periods?

**Approach:** A frailty extension of the Cox model that adds two random effects: a team-level frailty (constant within franchise across time) and a manager-owner-period frailty (specific to the person making the call). Variance components are estimated via penalized partial likelihood.

**Output:** The fraction of unexplained integration delay variance attributable to team-frailty versus manager-owner-period-frailty.

**Confidence label:** Variance components reported with profile-likelihood intervals. The decomposition is fundamentally sample-limited (n=16 teams, ~30 manager-owner periods) and that limitation is documented.

**Why this matters:** The historical literature treats Tom Yawkey's Red Sox as a special case of personal racism, and treats other late integrators as institutional. The model lets the data speak to whether that distinction is supported. The chapter does not predetermine the answer.

---

## The Visualizations

Five visualizations. Mobile-first.

### Fig 01 — The Risk Set Over Time

**The chapter's entry point.**

An animated horizontal timeline from April 15, 1947 to July 21, 1959. Sixteen rows, one per franchise, sorted by integration date. Each row begins as a hollow bar (team in the risk set, not yet integrated) and transitions to a filled bar at the moment of integration. The transition is annotated with the player's name.

Above the timeline: a running count of franchises integrated, updating as the animation plays.

To the right: the empirical hazard rate, updating as the years pass.

**The argument is in the design.** The reader watches the risk set deplete in fits and starts. The eleven-week gap from Robinson to Doby. The two-year plateau from 1947 to 1949. The 1953-1954 cluster. The four-year wait from 1955 to 1959 with three holdouts. The final lonely transition for Boston.

**Tech:** D3 timeline with controlled animation. Pause-and-scrub controls. Default animation speed: one year per 1.5 seconds. Manual scrub allowed.

**Mobile behavior:** Timeline rotates to vertical orientation below 768px. Each franchise becomes a row in a scrolling column.

**Oh wow test:** The reader watches the timeline play through and understands without annotation that the integration was not a moment, it was a process distributed unevenly across more than a decade.

### Fig 02 — The Survival Curve and Hazard Function

**The Kaplan-Meier output, paired.**

Two charts side by side (stacked on mobile). Left: the Kaplan-Meier survival curve S(t) with shaded bootstrap confidence band. Right: the hazard function h(t) with shaded confidence band.

Annotated peaks and plateaus on the hazard curve, each linked to specific historical context: the Rickey-Veeck initial pulse in 1947, the post-Korean-War talent influx in 1953-1954, the long plateau as the AL holdouts maintained their position.

Below the charts: a comparison band that shows what each curve would have looked like under three null hypotheses (uniform integration across the period, all teams integrate in 1947, all teams integrate in 1959). Visual establishment of how the actual distribution differs from these naive alternatives.

**Tech:** D3 layered line charts with confidence bands. The null comparison band is a toggle that overlays the alternatives.

**Mobile behavior:** Charts stack vertically. Confidence bands remain visible at all viewport sizes. Null comparison toggle becomes a tap target.

### Fig 03 — The Cox Model Forest Plot

**The covariate effect sizes.**

A forest plot of hazard ratios from the Cox model. Each row is a covariate. The point estimate is the hazard ratio. The whiskers are 95% confidence intervals. The vertical reference line is at hazard ratio = 1.0 (no effect).

Covariates that significantly accelerated integration (hazard ratio > 1) extend to the right. Covariates that significantly slowed integration (hazard ratio < 1) extend to the left. Covariates with confidence intervals crossing 1.0 are visually distinguished as not statistically distinguishable from zero effect.

**Annotation column:** Each covariate row has an annotation explaining what the coefficient means in plain English. For example: "League: AL teams had a hazard ratio of 0.45, meaning AL teams integrated at less than half the rate of NL teams in any given year, controlling for the other covariates. p < 0.05."

**Below the plot:** the proportional hazards diagnostic plot, showing the Schoenfeld residuals over time for each covariate, with a note about which covariates required stratified estimation.

**Tech:** D3 forest plot. Static. Pre-computed model output.

**Mobile behavior:** Annotation column collapses to a tap-to-expand panel below the plot.

### Fig 04 — The Forfeited WAR Ledger

**The team-level cost.**

A horizontal bar chart of cumulative forfeited WAR by franchise across each franchise's pre-integration window. Bars sorted descending.

The headline finding is in this chart: the team with the highest forfeited WAR. This is the chapter's surprise. Boston is among the worst but not the worst.

Each bar is decomposed into stacked segments by year of forfeiture. The reader can see, for example, that the bulk of Boston's forfeited WAR accumulated in the late-1940s through early-1950s when the available talent pool was richest, with diminishing year-on-year cost in the late 1950s.

**Annotation:** The top three highest-forfeited-WAR players for each team, with their actual signing destinations.

**Tech:** D3 stacked horizontal bar chart. Static pre-computed.

**Mobile behavior:** Bars remain horizontal. Annotations move below bars.

### Fig 05 — The Counterfactual Standings

**The competitive outcome simulation.**

An interactive table where the reader selects a team and a season range. The display shows: actual standings for the selected team-seasons (left column), distribution of counterfactual standings from the Monte Carlo simulation (right column, rendered as histogram bars), and the probability that the team would have won the pennant under the counterfactual (highlighted).

Default selection: Red Sox, 1948-1959. The reader sees the actual standings, then the counterfactual distribution with several seasons showing a meaningful (though not overwhelming) probability of pennant.

**Methodology note panel:** Prominently displayed disclaimer about the limitations of the counterfactual. The model does not iterate the competitive equilibrium effect of all teams having earlier access to Negro Leagues talent. The figures are upper bounds on the late integrators' counterfactual outcomes, not point predictions.

**Tech:** Pre-computed Monte Carlo distributions loaded as JSON. Table component with team / season selectors. No live simulation in the browser.

**Mobile behavior:** Selector controls stack above the comparison. Histogram bars render at reduced precision on small viewports but remain legible.

---

## The Asset Register

**Archival images required:**

- Pumpsie Green debut, July 21, 1959 (Comiskey Park) — image clearance required.
- Larry Doby debut, July 5, 1947 (Cleveland) — PD verification.
- Hank Thompson Browns debut, July 17, 1947 — PD verification.
- Branch Rickey portrait — PD verification.
- Bill Veeck portrait — PD verification.
- Tom Yawkey portrait — PD verification (likely available).
- Team logos for sixteen original franchises (used at small scale in the risk set timeline) — trademark considerations, may need to use stylized representations.

**Documentation requirements:**

Oscar must verify provenance for every image. Team logos in Fig 01 are a sensitivity. If clearance for trademark use cannot be obtained for the timeline, the visualization uses team-color coded bars without logos, with team names as text labels.

**Pre-computed data files:**

- `data/integration-events.json` — Per franchise, the integration date, first player, source citations.
- `data/team-covariates.json` — Annual team covariate panel, 1947-1959.
- `data/km-output.json` — Kaplan-Meier survival and hazard curves with confidence bands.
- `data/cox-output.json` — Cox model coefficients, hazard ratios, confidence intervals, diagnostic test results.
- `data/forfeited-war.json` — Per team forfeited WAR by year.
- `data/counterfactual-distributions.json` — Monte Carlo output, per team-season.
- `data/frailty-decomposition.json` — Frailty model variance components.
- `data/asset-register.json` — Updated for chapter.

**Methodology documentation:**

- `METHODOLOGY.md` — Full per-model documentation. Includes the explicit limitations panel for the counterfactual. Cross-references to the Cox proportional hazards literature, the Kaplan-Meier methodology, and the frailty extension references.

---

## The Connective Tissue

### Tissue In (from Chapter 08)

> *The wages were one accounting. The clocks are another. Every franchise had a date by which it added a Black player to its major league roster, and those dates were not the same date. The fastest moved within months. The slowest waited twelve years. The next chapter asks what each year of waiting predicted, what each year of waiting cost, and which franchises forfeited the most by being last.*

### Tissue Out (to Chapter 10)

> *The forfeited WAR figures depend on a WAR engine. The platform builds its own. The next chapter is that engine: the methodology by which Negro Leagues player value is calculated, ranked, and compared, both within the Negro Leagues and against the integrated record. The engine that produced the forfeited WAR figures in this chapter is the engine the next chapter documents.*

---

## The Agent Reviews

### Oscar — Asset and Provenance

Reviews the asset register. Verifies PD status for all integration milestone player portraits. Reviews team logo use in Fig 01 for trademark compliance, recommends stylized fallback if needed. Flags any image without documented provenance.

**Specific gates:** All sixteen team integration moments need either a verified player portrait or a documented absence with rationale. Trademark assessment for logos completed before Fig 01 ships.

### Elias — Data and Citation Integrity

Verifies every integration date against primary source. Verifies the n=16 team list is the correct universe. Verifies covariate data against Baseball Reference and SABR. Verifies the Cox model coefficients are reproducible from the published data. Verifies the Monte Carlo seed and iteration count are documented for reproducibility.

**Specific gates:** Every integration date traces to a primary source URL. The Cox model results are reproducible from the published data files and methodology document. The Monte Carlo simulation seed is fixed and documented so the counterfactual distributions are exactly reproducible.

### Vera — Visual and Accessibility

Reviews all five visualizations at 375px, 768px, 1200px. The animated timeline in Fig 01 is tested with motion-sensitivity considerations (animation can be paused, default play speed is not aggressive). The forest plot in Fig 03 is tested for color-blindness accessibility (the significant / not-significant distinction does not rely on color alone). The counterfactual selector in Fig 05 is tested for tap target size on mobile.

**Specific gates:** Fig 01 timeline animation has a documented pause control accessible by keyboard. Fig 03 significance distinction works in grayscale. Fig 05 selector controls are tappable with thumb on mobile.

### Ida — Spec Adherence and Tenant Compliance

Verifies all five models documented. Verifies Tenant 10 satisfaction. Verifies connective tissue paragraphs present in project owner's voice. Verifies citation block.

**Specific gates:** Methodology document is complete. Citation block present. Both connective tissue paragraphs present.

### Gates — Merge Authority

Three gates. Oh wow test conducted with five agent instances. Particular focus on the Fig 01 animated timeline as the chapter's central rhetorical moment.

**Specific gates:** Oh wow test for this chapter is Fig 01. Minimum three of five test agents must independently identify the central argument (integration was a distribution, not a moment) from the timeline alone.

---

## The Oh Wow Test

**Primary oh wow:** Fig 01. The reader watches the animated timeline and understands without annotation that the standard "1947" framing collapses sixteen separate franchise decisions, distributed across twelve years and ninety-six days, into a single triumphant moment that the data does not support. The risk set depletes unevenly. The reader sees the unevenness.

**Secondary oh wow:** Fig 04. The reader sees that the highest-forfeited-WAR team is not the team they expect. The Red Sox are bad but not worst. The actual worst is named explicitly and the reader recalibrates their understanding of which franchise paid the largest competitive cost.

**Tertiary oh wow:** Fig 03. The reader sees the AL/NL hazard ratio with confidence interval and understands that the AL/NL integration speed gap is not anecdotal observation but a quantified effect with statistical significance, holding the other covariates constant.

**Test protocol:** Five agent instances each read the chapter at 375px and 1200px without prompting. Minimum three must identify the Fig 01 distributed-event argument. Minimum two must independently identify the surprise team in Fig 04. If thresholds not met, visualization design returns to Vera and Oscar.

---

## Citation Block

```
Cite this chapter:
Haynes, Jeremy. "The Last Team." The Other Box Score,
theotherboxscore.org/chapters/the-last-team/, [Month Year].
Accessed [access date].

Chicago:
Haynes, Jeremy. "The Last Team." The Other Box Score.
[Month Year]. https://theotherboxscore.org/chapters/the-last-team/.

Data (CC0):
The Other Box Score. "MLB Franchise Integration Survival Dataset." CC0 1.0.
https://github.com/other-boxscore/chapters/09-the-last-team/data/.
[Version date].

Integration timeline:
"These Players Integrated Each MLB Team." MLB.com, August 14, 2020.
https://www.mlb.com/news/players-who-broke-color-barrier-for-every-team

SABR Bio Project:
"Baseball Integration, 1947-1986." Society for American Baseball Research.
https://sabr.org/bioproj/topic/baseball-integration-1947-1986/

Academic source on integrating players:
Lanctot, Neil. Negro League Baseball: The Rise and Ruin of a Black Institution.
University of Pennsylvania Press, 2004.

NLBM context:
Negro Leagues Baseball Museum, Barrier Breakers Timeline.
https://barrierbreakers.nlbm.com/timeline/

Production data:
Seamheads Negro Leagues Database.
https://www.seamheads.com/NegroLgs/

Cox proportional hazards methodology:
Cox, D. R. "Regression Models and Life-Tables." Journal of the Royal
Statistical Society. Series B (Methodological), 1972.

Frailty extension:
Therneau, T. M., and Grambsch, P. M. Modeling Survival Data: Extending
the Cox Model. Springer, 2000.
```

---

## Build Sequence

| Phase | Deliverable | Gate |
|-------|-------------|------|
| 1 | Assemble integration event dataset: per franchise, date, first player, citation | Elias verifies every date to primary source |
| 2 | Assemble team covariate panel 1947-1959 from Baseball Reference and SABR | Elias verifies covariate completeness |
| 3 | Assemble forfeited-WAR pool from Seamheads | Elias verifies pool against integrated record |
| 4 | Implement Model 1 (Kaplan-Meier) with bootstrap confidence bands | Elias verifies hazard curve against integration event dataset |
| 5 | Implement Model 2 (Cox regression) and run diagnostics | Elias verifies proportional hazards test results documented |
| 6 | Implement Model 3 (forfeited WAR) including signability weighting model | Elias verifies signability model trained on documented signings |
| 7 | Implement Model 4 (counterfactual simulation) with fixed seed | Elias verifies seed documented and outputs reproducible |
| 8 | Implement Model 5 (frailty decomposition) | Elias verifies variance components and intervals |
| 9 | Build Fig 01 (animated risk set timeline) | Vera + Oscar review at 375px and trademark assessment |
| 10 | Build Fig 02 (KM survival and hazard) | Vera reviews confidence band rendering |
| 11 | Build Fig 03 (Cox forest plot) | Vera reviews grayscale legibility |
| 12 | Build Fig 04 (forfeited WAR ledger) | Vera reviews mobile annotation legibility |
| 13 | Build Fig 05 (counterfactual standings) | Vera reviews selector tap targets |
| 14 | Write narrative copy and connective tissue paragraphs | Ida reviews tenant compliance |
| 15 | Oh wow test with five agent instances | Gates conducts, documents results |
| 16 | All five agents APPROVED | Gates issues MERGE |

---

## Open Questions for Project Owner

**Question 1: Counterfactual model boundary.**
Model 4 does not iterate the second-order equilibrium effect (if Boston had signed Willie Mays in 1949, the Giants would not have had him in 1951). Iterating that effect requires a much more complex simulation framework and would still rest on speculative assumptions. Recommend keeping Model 4 as a non-equilibrium upper-bound simulation with explicit methodology note, but flagging because this is the chapter's biggest methodological honesty point.

**Question 2: Red Sox specificity.**
The historiography has converged on the Red Sox as the morally worst case (Yawkey's personal racism, the Robinson tryout, the Mays scouting refusal). The chapter's Cox model and frailty decomposition either support or complicate that narrative. If the data supports it, the chapter says so explicitly. If the data complicates it, the chapter says so too. Recommend writing the chapter with the data leading rather than the narrative leading. Flagging because this is the chapter's most editorially loaded passage.

**Question 3: Treatment of the post-1953 expansion teams.**
The chapter scopes to the sixteen original pre-expansion franchises because they all existed for the full 1947-1959 window. The Los Angeles Dodgers and San Francisco Giants are the same franchises as Brooklyn and New York, so they collapse cleanly. The 1961 expansion teams (Angels, second Senators) and 1962 expansion (Mets, Astros) are excluded as out of period. Recommend confirming this scope choice. Flagging.

**Question 4: Frailty model interpretation language.**
The frailty decomposition results will be technical (variance components, profile likelihood). The chapter needs to translate these to a non-technical audience without flattening the methodology. Recommend a dedicated explainer paragraph alongside Fig 03 or in a sidebar. Flagging because the translation work is non-trivial and worth your editorial pass.

---

## Status

SPEC v1.0 COMPLETE. Awaiting project owner review and Gate 1 approval.
