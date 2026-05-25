# Cooperstown — Chapter 11
## The Other Box Score · Full Specification v1.0

**Series:** theotherboxscore.org
**URL:** theotherboxscore.org/chapters/cooperstown/
**GitHub:** other-boxscore/chapters/11-cooperstown/
**Part:** Three — The game they were kept from
**Position:** Chapter 11 of 15
**License:** MIT (code) · CC0 (data)
**Status:** SPEC v1.0
**Last updated:** May 2026

---

## One-Line Thesis

The 2006 Special Committee on Negro Leagues was meant to be the final word on Black baseball Hall of Fame consideration, and it was not the final word. This chapter applies the platform's engine to produce a ranked, evidence-based slate of Negro Leagues candidates who meet or exceed the statistical bar of inducted players, evaluated by the same methodology that excluded them.

---

## Why This Chapter Exists

This is the chapter where the platform's argument reaches its sharpest point. Chapter 10 built the engine. This chapter applies it to the question Cooperstown was built to answer and has answered incompletely.

The setup is documented and unambiguous. In 1971 through 1977, the original Committee on Negro Baseball Leagues elected nine players. In subsequent years, eight more Negro Leagues players were inducted via the Veterans Committee. In 2006, the Special Committee on Negro Leagues elected seventeen more. That election was explicitly described as the final group. The Hall of Fame's position has effectively been that Negro Leagues consideration is closed.

The position is not defensible.

Since 2006, the available data has changed substantially. Seamheads added thousands of player-seasons of normalized statistics. Baseball Reference incorporated the integrated record in 2020. FanGraphs followed in 2023. Major League Baseball officially recognized the Negro Leagues as major leagues in 2024. The statistical foundation that the 2006 committee did not have now exists, and it documents what working Negro Leagues historians have known for decades: there are players who meet or exceed the statistical bar of inducted Hall of Famers, and who are not in the Hall.

The names are not obscure. The 42 for 21 Committee polled more than seventy Negro Leagues historians and produced a ranked top ten. The FanGraphs analysis by Jay Jaffe identified the same patterns. The McFarland volume *Negro Leaguers and the Hall of Fame* by W.H. Johnson catalogues the cases in detail. The Classic Baseball Era Committee considered Vic Harris and John Donaldson in 2024 and failed to elect either.

This chapter does the work the Hall has not done. The engine documented in Chapter 10 is applied to every eligible Negro Leagues player whose case has been seriously argued by working historians. The output is a ranked candidate slate with the platform's methodology, the platform's confidence intervals, and the platform's transparency about which methodological choices drive which results.

The chapter does not assert that these players should be inducted. The chapter asserts that the data supports their candidacy under the same methodology used to evaluate inducted players, and that the absence of further consideration is a choice the Hall has made, not a conclusion the data has produced.

---

## The Hook

**Seventeen names were inducted in 2006. The election was meant to be the final group.**

The Special Committee on Negro Leagues met in Tampa in February of that year. Twelve scholars considered thirty-nine candidates from a starting pool of ninety-four. Seventeen were elected. Fay Vincent, the non-voting chair, spoke for the committee when he said the work was done. The Hall created the Buck O'Neil Lifetime Achievement Award in part to acknowledge that O'Neil himself had been left out of the 2006 class.

Nineteen years have passed. No additional Negro Leagues player has been inducted.

In those nineteen years, the data has changed. Seamheads completed its normalization of Negro Leagues statistics across leagues, parks, and opponent strength. Baseball Reference incorporated the integrated record. Major League Baseball officially recognized the Negro Leagues as major leagues. The 42 for 21 Committee polled more than seventy historians and produced a ranked top ten of overlooked candidates. The Classic Baseball Era Committee considered two Negro Leagues candidates in 2024 and elected zero.

This chapter applies the platform's engine to every eligible Negro Leagues player whose case has been seriously argued by working historians. The engine ranks candidates by the same methodology that ranks Hall of Famers. The output is a slate.

The slate is not a demand. The slate is a measurement. Every player on the slate meets or exceeds the statistical bar of inducted Hall of Famers at their position, by the platform's transparent methodology, with documented uncertainty bands, evaluated against the same benchmarks that produced every existing induction.

The Hall has not done this work. The chapter does it.

---

## Original Findings (the "oh wow" moments)

### Finding 1 — The Ranked Slate
A complete ranked candidate slate of Negro Leagues players eligible for the Hall of Fame, ordered by Rate JAWS (the platform's primary metric), with full confidence intervals from the Chapter 10 Bayesian model.

The slate is not invented from scratch. It is the universe of candidates who have been seriously argued by working Negro Leagues historians, evaluated by the platform's methodology. The starting pool includes the 42 for 21 Committee top-ranked candidates (Rap Dixon, Dick Redding, John Beckwith, John Donaldson, Gus Greenlee, Dick Lundy, Vic Harris, Grant "Home Run" Johnson, Newt Allen, Spottswood Poles), the McFarland book candidates, the Seamheads overlooked list (Beckwith, Lundy, George Scales, Dixon), and a handful of post-2006 Veterans Committee considerations who fell short.

The output is ranked. The ranking is by the platform's methodology. The ranking is reproducible from the published data.

### Finding 2 — The Bar Comparison
For each candidate on the slate, an explicit comparison to the median inducted Hall of Famer at the candidate's position. Candidates above the median are flagged as exceeding the bar. Candidates below the median are flagged as below, with documented exceptions for special-case considerations (career length truncation by integration, data coverage gaps, contemporary HOF outliers below median).

The headline finding: a specific count of candidates whose Rate JAWS exceeds the median JAWS of inducted players at their position. The count is several. The names are documented. The platform commits to the names.

### Finding 3 — The Pre-2006 Counterfactual
A retrospective analysis of the 2006 ballot. The committee considered thirty-nine candidates and elected seventeen. What does the platform's methodology say about the twenty-two who were not elected? Several of them rank above multiple players who were elected. The 2006 committee was constrained by the data available at the time. The platform shows what a redo of the 2006 vote would look like with the post-2020 integrated data and the platform's methodology.

This is not a critique of the 2006 committee. The committee did its work under data constraints the platform does not have. The finding is that the data has changed, and the rankings produced by the new data are different.

### Finding 4 — The Character Asterisk
Some excluded candidates were excluded for documented character concerns rather than statistical insufficiency. John Beckwith is the canonical case (the McFarland and Seamheads sources both note that "the special Hall committee was undoubtedly swayed by character issues"). The chapter handles this explicitly: candidates with documented exclusion-by-character receive an annotation, with a sourced narrative summary of the concerns. The chapter does not paper over the issue. The chapter also notes that the BBWAA character clause has been applied unevenly across players in the Hall, and surfaces the inconsistency without resolving it.

This finding is the chapter's most editorially careful section. The platform takes a position: statistical evaluation should be statistical, and character considerations should be applied consistently. The chapter does not adjudicate any individual case. It surfaces the framework.

### Finding 5 — The Living Players Question
Several players on the slate are deceased. A small number of living players have legitimate cases (Bus Clarkson, others). For each living candidate on the slate, the chapter notes living status explicitly and notes the urgency consideration that Veterans Committee voting has historically given to living candidates. The chapter does not advocate. It documents.

---

## The Data

### Foundational (consumed from Chapter 10)

- Per-player career and peak WAR figures with rate normalization, from the Chapter 10 engine.
- Per-player JAWS variants (standard, rate, adjusted career), from Chapter 10.
- Per-player Bayesian uncertainty bands, from Chapter 10.
- Per-player position assignment, from Chapter 10.
- Per-player HOF induction probability, from Chapter 10 Model 6.

### Candidate Universe Sources

- **42 for 21 Committee poll results** (2021). The historian-consensus ranking of overlooked candidates. The chapter's primary candidate-universe source.
- **W.H. Johnson, *Negro Leaguers and the Hall of Fame* (McFarland).** Comprehensive academic catalogue of HOF-worthy Negro Leagues candidates with full biographical and statistical context per candidate.
- **Seamheads "Negro Leagues Players Who Have Been Overlooked by the Hall of Fame"** (2013) and **"The technically...not Hall of Fame"** (2019). The Seamheads community's foundational arguments for specific candidates.
- **FanGraphs Jay Jaffe coverage of Era Committee ballots and Negro Leagues candidates** (multiple pieces from 2021 onward).
- **Classic Baseball Era Committee ballot history** (2022, 2024). The two recent Era Committee considerations of pre-integration Black baseball candidates.
- **Justice for Negro Leaguers / 42 for 21 Committee** advocacy materials and ranked rosters.
- **Pete Gorton's Donaldson research** (the comprehensive single-player documentation site that has resurfaced 400+ wins and 5,000+ strikeouts for John Donaldson). The chapter cites Gorton as the primary source for the Donaldson statistical case.
- **SABR Bio Project entries** for every candidate on the slate.

### Inducted Hall of Famer Baseline

- **Complete bWAR and JAWS data for every position-specific inducted Hall of Famer**, sourced from Baseball Reference, used as the bar against which slate candidates are compared.
- **Position median, 25th percentile, and 75th percentile JAWS values** for each position, recalculated under the platform's rate JAWS methodology.

### Character and Exclusion Narrative Sources

- **Documented narrative sources for each candidate excluded on character grounds.** Cited per candidate with primary source where available, secondary source otherwise. The chapter does not assert claims without documentation.

---

## The ML / AI Pipeline

Four models. The chapter is application-heavy rather than methodology-heavy because Chapter 10 carries the methodology weight.

### Model 1 — Slate Construction

**Problem:** What is the universe of eligible candidates this chapter evaluates?

**Approach:** A deterministic union operation, not a learned model. The slate is the union of:
- All players ranked in the 42 for 21 Committee top 25
- All "case made" players in the McFarland Johnson volume
- All Seamheads overlooked-list candidates
- All Classic Baseball Era Committee Negro Leagues ballot candidates since 2010
- All players with Rate JAWS above the position-specific 25th percentile of inducted Hall of Famers (a data-driven addition that catches candidates not yet on any historian's advocacy list)

The slate is the union, deduplicated. Each candidate is annotated with which sources surfaced them.

**Output:** A defined, finite candidate universe with provenance per candidate.

**Confidence label:** The data-driven addition (the 25th percentile threshold) may surface candidates without historian-consensus support. These are flagged as platform-surfaced and treated with additional editorial care.

**Why this matters:** The chapter's candidate universe must be defensible. The platform did not invent the candidates. The platform draws them from documented historian work, with the data-driven addition as a small extension that surfaces names the historian process might have missed.

### Model 2 — Bar Comparison

**Problem:** For each candidate, where do they sit relative to the inducted Hall of Famer distribution at their position?

**Approach:** For each position, compute the percentile of each slate candidate's Rate JAWS within the distribution of inducted Hall of Famers at that position. Flag candidates above the median (50th percentile) as "above the bar," candidates above the 25th percentile as "within the inducted range," candidates below the 25th percentile as "below the inducted range."

**Output:** Per candidate, a percentile rank against the inducted distribution at their position.

**Confidence label:** The percentile is reported with the uncertainty propagated from the Bayesian band. A candidate whose median estimate is at the 60th percentile but whose lower band reaches the 30th percentile is reported as such, not collapsed to a point estimate.

**Why this matters:** The bar comparison is the chapter's central argumentative move. "This player exceeds the median Hall of Famer at his position" is a specific, defensible claim with a measurable referent. The chapter makes the claim where the data supports it and does not make the claim where it does not.

### Model 3 — Position-Adjusted HOF Probability

**Problem:** Chapter 10 Model 6 produces calibrated HOF induction probabilities for every HOF-eligible player. This chapter applies that model to the slate.

**Approach:** Pass each slate candidate through the Chapter 10 Model 6 pipeline. Output the calibrated induction probability. Compare to the actual induction outcome (not inducted, for every slate candidate by construction).

**Output:** Per candidate, a calibrated probability of induction given their statistical profile, paired with their actual non-induction status.

**Confidence label:** The model's predictions for the top of the slate involve out-of-distribution extrapolation. These are reported with widened intervals.

**Why this matters:** This model produces a specific quantitative finding: how many slate candidates have a model-predicted induction probability above 50%, above 75%, above 90%, when their actual status is not inducted. The gap between predicted and actual is itself the headline.

### Model 4 — Era and Era-Committee Routing

**Problem:** The Hall of Fame's current induction process for pre-integration Black baseball candidates runs through the Classic Baseball Era Committee. The committee considers a small ballot every two to three years. The chapter needs to identify which candidates the platform's methodology supports for inclusion on near-term ballots versus longer-term consideration.

**Approach:** A simple classification: candidates above the position median go on the "immediate ballot" recommendation list. Candidates within the inducted range but below median go on the "extended ballot" recommendation list. Candidates below the inducted range receive a "case requires special argument" annotation with the relevant narrative context (character issue, data coverage problem, pre-1920 documentation gap as in Donaldson, etc.).

**Output:** A platform recommendation for ballot tier per candidate. Documented as platform recommendation, not Hall of Fame practice.

**Confidence label:** The classification is deterministic given Models 1-3 outputs. The recommendation language is editorial and the platform owns it.

**Why this matters:** This is where the chapter becomes actionable. The chapter does not just rank. It produces a recommendation that maps onto the actual Hall of Fame induction process. The Classic Baseball Era Committee meets again in 2026, and the chapter's recommendations are timed to be available before that ballot is finalized.

---

## The Visualizations

Five visualizations.

### Fig 01 — The Slate

**The chapter's central artifact.**

A vertically scrolling ranked list, position by position. Each candidate gets a card containing:

- Player name and primary position
- Years active and league(s)
- Career rate WAR and confidence band
- Peak rate WAR (best 7 seasons)
- Rate JAWS
- Percentile rank against inducted HOF at position
- Above-the-bar flag (above median / within range / below range)
- Platform model-predicted induction probability
- Source provenance (which historian lists or research surfaced the candidate)
- Character or special-case annotation where applicable
- Living status where applicable
- Link to candidate's detailed profile page

Cards are sorted by Rate JAWS within position, positions ordered roughly by candidate count (most candidates first to show the depth of the slate).

The visual hierarchy emphasizes the above-the-bar flag with color coding: candidates above the median are visually emphasized, those within the inducted range are standard, those below have a distinct treatment.

**Tech:** Pre-computed JSON. Card layout in HTML/CSS, no JavaScript framework required. Position section anchors for navigation. Print-friendly stylesheet so the slate can be printed for advocacy use.

**Mobile behavior:** Cards stack vertically. All information remains visible at 375px through careful typography hierarchy.

**Oh wow test:** The reader scrolls through the slate and encounters specific named players (Beckwith, Lundy, Dixon, Donaldson, Redding) with specific position-percentile rankings (e.g., "62nd percentile of inducted shortstops"). The named-player specificity combined with the position-percentile specificity is the argument.

### Fig 02 — The Distribution Plot

**The bar comparison made visual.**

For each major position, a horizontal violin plot showing the JAWS distribution of inducted Hall of Famers, with overlaid points marking the slate candidates at that position.

The reader sees the inducted distribution as a shape, sees the candidates as points within or outside that shape, and immediately grasps which candidates fall within the inducted range and which do not.

For positions with multiple slate candidates above the median, the visualization makes the cluster visible.

**Annotation:** The median, 25th percentile, and 75th percentile lines are drawn explicitly. Slate candidates are labeled by name.

**Tech:** D3 violin plot with annotated overlay points. Static pre-computed.

**Mobile behavior:** Plots stack vertically with one position per row. Names remain readable on mobile.

### Fig 03 — The 2006 Retrospective

**The chapter's most editorially loaded visualization.**

A two-column display. Left column: the seventeen 2006 inductees, with their position, era, Rate JAWS, and inducted-bar percentile under the platform's methodology. Right column: the twenty-two 2006 ballot candidates who were not elected, with the same metrics.

Candidates in the right column whose Rate JAWS exceeds inducted candidates in the left column are flagged explicitly. The flag is the finding: the 2006 vote, evaluated under the platform's methodology, has identifiable cases where a non-inducted candidate ranks above an inducted candidate.

This is the chapter's most careful section. The visualization does not impugn the inducted candidates. It surfaces the comparative gap that the post-2020 integrated data reveals.

**Annotation:** Each candidate's row has a brief narrative note. Inducted candidates note their actual induction. Non-inducted candidates note the reason most commonly cited for non-induction (character, data, era).

**Tech:** Side-by-side table with sortable columns. Pre-computed.

**Mobile behavior:** Columns stack vertically with clear visual separation between inducted and non-inducted blocks.

### Fig 04 — The Era Committee Recommendation Slate

**The chapter's actionable output.**

A simplified version of Fig 01, restricted to the top-tier candidates and formatted explicitly as a ballot recommendation. The format is built to be useful to working researchers, historians, and (potentially) committee members.

For each recommended candidate:
- Name and primary position
- Years active
- The one-sentence case (sourced to a specific historian advocacy)
- The platform's quantitative case (Rate JAWS, percentile)
- The platform's recommendation tier (immediate ballot / extended ballot / special case)

**Annotation:** A header notes that the slate is the platform's research output and is offered as a contribution to ongoing Hall of Fame consideration, not as a demand. A footer notes the next Classic Baseball Era Committee meeting date and the timeline for ballot finalization.

**Tech:** A clean, printable document. The chapter offers this as a downloadable PDF as well as a web view.

**Mobile behavior:** Single-column layout. Print-friendly at all viewport sizes.

### Fig 05 — The Methodology Audit Panel

**The chapter's transparency move.**

A reader-facing panel that allows the slate's methodology to be audited. The reader can adjust:

1. **JAWS variant:** rate (default) / standard / adjusted career
2. **Bar definition:** position median (default) / position 25th percentile / position mean
3. **Inducted comparison set:** all inducted (default) / only BBWAA-elected / only Era-Committee-elected
4. **Slate construction:** historian-only (default) / historian + platform-surfaced

Above the controls: the count of candidates above the bar updates in real time as the reader adjusts. Below the controls: the names that move on or off the above-the-bar list as the reader adjusts.

The reader cannot dismiss the chapter as cherry-picking the methodology because every methodological choice is exposed and adjustable.

**Tech:** Pre-computed lookup grid. The count and name list for every combination of the four controls is computed at build time.

**Mobile behavior:** Controls collapse into accordion. Count and name list remain visible.

---

## The Asset Register

**Archival images required:**

- 2006 induction ceremony photos (Hall of Fame may have these available with permission)
- Headshots for top-tier slate candidates: Beckwith, Lundy, Dixon, Donaldson, Redding, Greenlee, Harris, Johnson, Allen, Poles, Scales — PD status verification required per player
- Buck O'Neil portrait (for the chapter's discussion of the O'Neil lifetime achievement award context)
- 42 for 21 Committee logo/identification (with permission)
- Negro Leagues Baseball Museum context image

**Documentation requirements:**

Oscar verifies PD status for each candidate portrait. For candidates without verified PD images, the chapter uses text-only candidate cards with a note. The 42 for 21 Committee branding requires explicit permission.

**Pre-computed data files:**

- `data/slate-candidates.json` — Per candidate, full record including source provenance, Rate JAWS, confidence band, percentile, recommendation tier.
- `data/inducted-baseline.json` — Per position, inducted HOF distribution statistics.
- `data/2006-retrospective.json` — The thirty-nine 2006 ballot candidates with platform metrics.
- `data/era-committee-recommendation.json` — Filtered slate for the Fig 04 recommendation output.
- `data/methodology-audit-grid.json` — Pre-computed lookup for Fig 05.
- `data/character-annotations.json` — Per candidate where applicable, the sourced character/exclusion narrative.
- `data/asset-register.json` — Updated for chapter.

**Methodology documentation:**

- `METHODOLOGY.md` — Documents how this chapter consumes the Chapter 10 engine outputs and applies them. Cross-references Chapter 10 for the underlying methodology. Documents the slate construction logic, the bar comparison logic, the era committee routing.

- `EDITORIAL_NOTE.md` — A separate document the chapter ships with. Explains the chapter's editorial posture: the slate is a measurement, not a demand. The chapter does not advocate for any specific induction. The chapter applies the platform's methodology transparently and reports what the methodology produces. The note is signed by the project owner and dated.

---

## The Connective Tissue

### Tissue In (from Chapter 10)

> *The engine produces a ranking. The ranking has not yet been applied to the question Cooperstown was built to answer. The next chapter asks the question the engine was built to address: which players, ranked by the methodology this platform extends from JAWS into the integrated record, belong in the Hall of Fame conversation. The Hall has answered some of the question. The engine answers the rest.*

### Tissue Out (to Chapter 12)

> *Cooperstown is one Hall. It is not the only Hall. The Latin American baseball halls of fame, the Cuban Hall in Havana, the Mexican Hall in Monterrey, the Puerto Rican Hall in San Juan, the Dominican Hall in San Pedro de Macorís, have been inducting the same players Cooperstown has and has not, sometimes earlier, sometimes more completely. The next chapter is the matrix: which players are in which Halls, and what the comparison says about which Halls have been doing the work.*

---

## The Agent Reviews

### Oscar — Asset and Provenance

Reviews candidate portraits. Verifies PD status for each. Reviews 42 for 21 Committee branding permission. Documents text-only fallbacks. Confirms the editorial note attribution.

**Specific gates:** Every candidate portrait has documented provenance or a documented absence. The 42 for 21 reference has documented permission or is replaced with descriptive reference without branding.

### Elias — Data and Citation Integrity

Most intensive review for this chapter. Verifies that:
- Every slate candidate's source provenance is correctly documented
- Every Rate JAWS figure traces to Chapter 10's published outputs
- Every percentile rank is correctly computed from the published inducted baseline
- Every character annotation has documented primary or secondary source
- The 2006 retrospective table correctly identifies the seventeen inducted and twenty-two non-inducted
- The platform-surfaced additions to the slate (data-driven 25th percentile threshold) are flagged correctly

**Specific gates:** The slate's source provenance is verifiable from public records. Every Rate JAWS figure is reproducible from Chapter 10 data. Every character annotation has citation. The 2006 retrospective is accurate.

### Vera — Visual and Accessibility

Reviews five visualizations at 375px, 768px, 1200px. Particular focus:
- Fig 01 (the slate) must remain dignified on mobile. The named candidates deserve presentation that respects their case rather than visual compression that flattens them.
- Fig 02 (the violin distributions) must remain interpretable at small viewports.
- Fig 03 (the 2006 retrospective) is the chapter's most editorially loaded visualization and must be presented with care; visual tone is part of the design.
- Fig 04 (the recommendation slate) must print cleanly for offline distribution.

**Specific gates:** Fig 01 cards remain readable and dignified at 375px. Fig 03 visual tone is reviewed in addition to legibility. Fig 04 print stylesheet renders the recommendation slate as a usable document.

### Ida — Spec Adherence and Tenant Compliance

Reviews against tenants. Tenant 14 (citable) compliance is particularly important given the chapter's nature as platform-as-research-contribution. Tenant 05 (connective tissue) is reviewed.

**Specific gates:** Methodology and editorial note documents complete. Connective tissue paragraphs in project owner's voice. Citation block present.

### Gates — Merge Authority

The oh wow test for this chapter is different because the chapter is about specific named candidates with specific quantitative cases. The test asks whether five agent instances reading the chapter would, after reading, be able to name at least three slate candidates and articulate the platform's reason for their inclusion. The test measures whether the chapter's specificity lands.

**Specific gates:** Five agent instances pass the named-candidate articulation test. The editorial note is reviewed and approved as the chapter's posture document. Final merge requires explicit sign-off on the editorial posture in addition to the standard agent approvals.

---

## The Oh Wow Test

**Primary oh wow:** Fig 01, the slate. The reader scrolls through and encounters specific candidates by name, each with a specific position-percentile ranking, each with a specific historian-advocacy provenance. The named-and-quantified specificity is the argument. The reader leaves the chapter able to name at least three candidates the Hall has not inducted, with the platform's specific reason for their inclusion.

**Secondary oh wow:** Fig 03, the 2006 retrospective. The reader sees the seventeen inductees and the twenty-two non-inductees side by side under the platform's methodology, and encounters specific cases where a non-inducted candidate ranks above an inducted candidate. The chapter does not impugn the 2006 work. The chapter surfaces the gap that the post-2020 data reveals.

**Tertiary oh wow:** Fig 04, the recommendation slate. The reader recognizes this is the chapter's actionable output: a printable, distributable document offered to the ongoing Hall of Fame consideration process. The chapter is not just analysis. It is contribution.

**Test protocol:** Five agent instances each read the chapter at 375px and 1200px without prompting. After reading, each agent must (a) name at least three slate candidates and articulate the platform's reason for their inclusion, (b) identify the 2006 retrospective finding, (c) recognize Fig 04 as actionable contribution. If three of five fail any of these, the chapter returns to design.

---

## Citation Block

```
Cite this chapter:
Haynes, Jeremy. "Cooperstown." The Other Box Score,
theotherboxscore.org/chapters/cooperstown/, [Month Year].
Accessed [access date].

Chicago:
Haynes, Jeremy. "Cooperstown." The Other Box Score.
[Month Year]. https://theotherboxscore.org/chapters/cooperstown/.

Data (CC0):
The Other Box Score. "Negro Leagues Hall of Fame Candidate Slate Dataset." CC0 1.0.
https://github.com/other-boxscore/chapters/11-cooperstown/data/.
[Version date].

2006 Special Committee election:
"Historic 2006 Election Honors Negro Leagues Legends." National Baseball
Hall of Fame. https://baseballhall.org/discover/inside-pitch/historic-2006-election

Candidate universe sources:
42 for 21 Committee. "Historian Poll Results." 2021.
https://www.42for21.org/results

Johnson, W. H. Negro Leaguers and the Hall of Fame. McFarland, 2024.

Seamheads. "Negro Leagues Players Who Have Been Overlooked by the Hall of Fame."
Seamheads, August 2013.
https://seamheads.com/blog/2013/08/29/negro-leagues-players-who-have-been-overlooked-by-the-hall-of-fame/

Seamheads. "The 'technically...not' Hall of Fame." Seamheads, February 2019.
https://seamheads.com/blog/2019/02/14/the-technically-not-hall-of-fame/

Jaffe, Jay. "With Experts on the Negro Leagues Involved, the Hall of
Fame's Era Committee Plans Are Emerging." FanGraphs, October 2021.

Donaldson research:
Gorton, Pete. The John Donaldson Network.
https://www.johndonaldson.bravehost.com/

Classic Baseball Era Committee:
"HOF Continues to Lag Behind." Negro Leagues Up Close, December 2024.

Methodology (consumed from Chapter 10):
See theotherboxscore.org/chapters/the-ledger/ for the underlying engine.

Hall of Famers baseline:
"Hall of Famers." National Baseball Hall of Fame.
https://baseballhall.org/hall-of-famers
```

---

## Build Sequence

| Phase | Deliverable | Gate |
|-------|-------------|------|
| 1 | Consume Chapter 10 engine outputs (per-player JAWS variants, confidence bands, position assignments, HOF probabilities) | Elias verifies consumption is correct |
| 2 | Construct candidate universe from 42 for 21, McFarland, Seamheads, Era Committee, platform-surfaced sources | Elias verifies provenance per candidate |
| 3 | Compute bar comparison per candidate against inducted position distribution | Elias verifies percentile calculations |
| 4 | Apply HOF probability model (from Chapter 10 Model 6) to slate candidates | Elias verifies extrapolation cases flagged |
| 5 | Compute era committee routing per candidate | Editorial review of recommendation tier per candidate |
| 6 | Assemble 2006 retrospective dataset | Elias verifies thirty-nine candidates correctly identified |
| 7 | Document character annotations per candidate where applicable | Editorial review of narrative tone |
| 8 | Build Fig 01 (the slate) with all annotations | Vera reviews dignity at 375px |
| 9 | Build Fig 02 (distributions) | Vera reviews position-by-position legibility |
| 10 | Build Fig 03 (2006 retrospective) | Editorial review of tone, Vera reviews visual |
| 11 | Build Fig 04 (recommendation slate) with print stylesheet | Vera reviews print render |
| 12 | Build Fig 05 (methodology audit) | Vera reviews mobile controls |
| 13 | Write narrative copy, connective tissue, editorial note | Ida reviews tenant compliance |
| 14 | Final editorial review of recommendation tier per candidate | Project owner sign-off |
| 15 | Oh wow test with five agent instances | Gates conducts, documents |
| 16 | All five agents APPROVED with editorial note approved | Gates issues MERGE |

---

## Open Questions for Project Owner

**Question 1: Editorial posture on advocacy.**
The chapter's stated posture is "the slate is a measurement, not a demand." The editorial note formalizes this. The question is whether the chapter should be more or less direct in its conclusion. More direct: name specific candidates the platform argues should be inducted. Less direct: present the data and let readers conclude. The spec recommends the middle posture (the slate is a measurement, with the methodology audit making methodological choices transparent) but flagging because this is the most editorially loaded decision in the chapter.

**Question 2: Buck O'Neil treatment.**
O'Neil is the canonical case of someone left out of 2006 who arguably should not have been. He has since been inducted (2022). The chapter mentions him in context but does not put him on the slate (he is inducted). The question is whether the chapter should include a dedicated O'Neil-as-precedent passage that uses his case to argue for additional consideration of others. Recommend keeping the O'Neil reference brief and contextual rather than building a dedicated section, but flagging.

**Question 3: Living player urgency.**
Several slate candidates may be living (Bus Clarkson and others requiring verification). The chapter notes living status but does not advocate. The question is whether the chapter should make a stronger statement on living-player urgency, given that the Veterans Committee has historically given preference to living candidates and that delay matters in ways the chapter cannot recover. Recommend a brief explicit acknowledgment in the editorial note, but flagging.

**Question 4: 42 for 21 Committee coordination.**
The chapter's candidate universe relies heavily on the 42 for 21 Committee's work. The platform should coordinate with Gary Gillette, Ted Knorr, and Sean Gibson (the committee co-founders) before publication as a courtesy and possible endorsement. Recommend outreach. Flagging because the outreach is yours.

**Question 5: Coordination with the Hall.**
The chapter's intended contribution is to the ongoing Hall of Fame consideration process. The chapter could be shared with the Hall's Historical Overview Committee or the Classic Baseball Era Committee in advance of publication as a research contribution. This is a strategic decision that affects timing and posture. Recommend considering this carefully. The chapter does not require Hall endorsement to publish, but advance sharing could change the chapter's reception. Flagging for your call.

**Question 6: Character clause handling.**
The chapter handles character-exclusion candidates (Beckwith is the canonical case) with documented annotations and notes inconsistency in BBWAA application without resolution. The question is whether to be more pointed about the inconsistency or maintain the current measured posture. Recommend current posture; the chapter's strength is its methodological transparency rather than its rhetorical positioning. Flagging.

---

## Status

SPEC v1.0 COMPLETE. Awaiting project owner review and Gate 1 approval.
