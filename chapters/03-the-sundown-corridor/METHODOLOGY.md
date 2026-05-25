# The Sundown Corridor -- Methodology
## theotherboxscore.org/chapters/the-sundown-corridor/

**Version:** 1.0
**Published:** Unpublished
**Last updated:** May 2026
**Reviewed by:** Pending Elias (statistical methodology) . Pending Oscar (historical grounding)

---

## What This Chapter Does

This chapter combines two datasets that have never been overlaid: the Scientific Data (Nature, 2025) geocoded sundown towns dataset of 2,248 documented historical sundown places and the Seamheads Negro Leagues game schedule for 1936--1948. For every documented game, it calculates the proximity and density of documented sundown towns along the travel corridor to get there. The result is a Corridor Danger Score, a composite index that measures documented sundown town exposure for each team-season combination. The finding: Negro Leagues teams did not travel through sundown country occasionally. They traveled through it constantly, as a structural feature of their schedule. The documented danger was the commute.

---

## The Incompleteness Statement

*"This analysis is bounded by the documented record. Researchers who have studied sundown towns most extensively estimate that the documented database captures a fraction of actual sundown places. Illinois, the most thoroughly documented state, had an estimated 500+ sundown towns -- 70% of all towns. The national database contains 2,248 documented places. The actual number of sundown places in the United States during the 1936--1948 period was certainly higher. Every Corridor Danger Score in this analysis is therefore a lower bound estimate. The actual danger was greater than the data shows."*

This statement is displayed prominently in the chapter. It is not fine print. The incompleteness of the data makes the case stronger: even the documented record is damning. The full record would be worse.

---

## Data Sources

### Historical Sundown Towns Linked to US Census Geographies
- **Source:** Nardos, Rahel, et al. "A national data set of historical US sundown towns for quantitative analysis." Scientific Data 12 (2025).
- **URL or archive location:** https://doi.org/10.1038/s41597-024-04330-9
- **Data repository:** https://osf.io/fh7r6/
- **Coverage:** 2,298 total records (359 Confirmed, 724 Probable, 1,215 Possible, 24 unmatched). All documented historical sundown places across the United States, geocoded via Census 2020 Gazetteer files.
- **License:** CC-BY (Academic open access)
- **Access date:** 2026-05-24
- **Known limitations:** The database is incomplete by its own documentation. Researchers estimate it captures a fraction of actual sundown places. Illinois, the most documented state, had an estimated 500+ sundown towns (70% of all towns). The national database contains 2,298 records. The actual number was certainly higher. 24 records could not be matched to Census geographies and lack coordinates.
- **How used in this chapter:** Each documented sundown place is geocoded with lat/lon coordinates (sourced from Census 2020 Gazetteer place, county, and county subdivision centroid files) and assigned an evidence quality tier (Confirmed/Probable/Possible). Used as the primary spatial layer for proximity calculations, corridor danger scoring, and case study selection. The dataset's "Surely" designation maps to our "Confirmed" tier; "Probable" and "Possible" map directly.

### Loewen/Berrey Sundown Towns Database
- **Source:** James Loewen and Ellen Berrey, Tougaloo College
- **URL or archive location:** https://justice.tougaloo.edu/sundown-towns/
- **Coverage:** Full crowdsourced database of sundown towns
- **License:** Academic research use
- **Access date:** 2026-05-24
- **Known limitations:** Crowdsourced data with variable documentation quality. The Scientific Data (2025) dataset builds on this database with additional geocoding and evidence quality classification.
- **How used in this chapter:** Cross-reference and supplementary evidence for case study towns. The Scientific Data dataset is the primary analytical source. Individual town pages on justice.tougaloo.edu provide source URLs for each case study entry.

### Seamheads Negro Leagues Database
- **Source:** Seamheads.com (Gary Ashwill et al.)
- **URL or archive location:** https://www.seamheads.com/NescoDatabase/
- **Coverage:** 1920--1948 game-level schedule data
- **License:** Research use
- **Access date:** 2026-05-24 (assembled from Chapter 02 pipeline)
- **Known limitations:** Not all games have specific ballpark data. Some entries have city only. Schedule data is reconstructed from contemporary newspaper accounts and is incomplete. Some road trips and barnstorming games are not documented.
- **How used in this chapter:** Game date, home team, away team, and location extracted for every game in the 1936--1948 window. Away-game sequences are sorted chronologically per team-season to infer travel segments between consecutive cities.

### SABR Ballparks Database
- **Source:** Society for American Baseball Research
- **URL or archive location:** https://www.sabr.org/
- **Coverage:** All documented professional baseball venues
- **License:** Research use
- **Access date:** 2026-05-24 (geocoded from Chapter 02 pipeline)
- **Known limitations:** Some Negro Leagues venues are not in the database. Coordinate precision varies by era.
- **How used in this chapter:** Ballpark addresses geocoded to lat/lon coordinates for 13 primary Negro Leagues game locations. These coordinates define the endpoints of travel corridors.

### Historical US Road Network
- **Source:** USGS and Library of Congress historical road maps
- **URL or archive location:** https://www.loc.gov/maps/ (various historical road atlases)
- **Coverage:** US road network, 1920--1950
- **License:** Public domain
- **Access date:** Pending digitization for period-accurate routing
- **Known limitations:** Historical road network data is incomplete. Not all period roads are digitized. The current implementation uses great-circle (haversine) distance between cities as a conservative approximation. Period-accurate road routing would increase distances and potentially capture additional sundown towns near road curves. This limitation is documented as a known source of underestimation in all corridor outputs.
- **How used in this chapter:** Intended for period-accurate road routing between game cities. Current implementation uses great-circle approximation (see Analytical Methods section for the impact of this decision).

### US Census Historical Data
- **Source:** U.S. Census Bureau
- **Coverage:** 1920, 1930, 1940, 1950 decennial census
- **License:** Public domain
- **How used in this chapter:** Black population by place as a context layer for corridor analysis. Demographic evidence supporting sundown town designation where applicable. Census 2020 Gazetteer files used for geocoding sundown town locations.

### NAACP Anti-Lynching Records
- **Source:** NAACP Papers, Library of Congress
- **Coverage:** 1882--1968
- **License:** Public domain
- **Access date:** Pending primary source assembly for case studies
- **Known limitations:** Records document reported incidents, not all incidents. Coverage is uneven geographically.
- **How used in this chapter:** Documented incidents for specific case study towns. Used only where primary source documentation exists. Assembly of specific records for the five case study towns is pending.

### FBI Historical Records
- **Source:** FBI Records Vault (FOIA releases)
- **Coverage:** 1935--1955
- **License:** FOIA/public domain
- **Access date:** Pending primary source assembly for case studies
- **Known limitations:** Select records only. FOIA releases are partial. Not all relevant incidents were investigated or documented.
- **How used in this chapter:** Select documented incidents in sundown corridor towns for case studies.

---

## Evidence Quality Tiers

The Scientific Data (2025) dataset assigns evidence quality ratings to each documented sundown place. The source dataset uses the labels "Surely," "Probable," and "Possible." This chapter maps "Surely" to "Confirmed" for clarity. The chapter uses all three tiers but labels each point by its evidence quality.

| Tier | Source Label | Definition | Visual Treatment | Weight in Scoring |
|------|-------------|------------|-----------------|-------------------|
| Confirmed | Surely | Strong primary source documentation (signs, ordinances, newspaper accounts, legal records) | Full opacity | 1.0 |
| Probable | Probable | Multiple secondary sources, consistent historical record, demographic evidence | 70% opacity | 0.7 |
| Possible | Possible | Limited documentation, demographic evidence only, single source | 40% opacity | 0.4 |

The reader sees the gradient of certainty. Elias enforces this. No point is presented as confirmed that is only possible.

**Distribution in the dataset:** 359 Confirmed, 724 Probable, 1,215 Possible. The Confirmed tier alone -- the most conservative subset, the towns whose sundown status is documented beyond reasonable question -- contains 359 places. Every analysis in this chapter shows results at both the all-tier and confirmed-only levels.

---

## Data Processing

### Step 1: Sundown Towns Data Acquisition
- **Tool:** Python (requests, pandas)
- **Input:** Scientific Data (2025) geocoded dataset from OSF (https://osf.io/fh7r6/), file `sundown_linked_to_census.csv`
- **Output:** data/sundown-towns.json -- 2,298 records with lat/lon, evidence tier, state, town name, source URL
- **Accuracy / success rate:** 2,274 of 2,298 records (98.96%) successfully geocoded via Census 2020 Gazetteer files. 24 records could not be matched to any Census geography and are excluded from spatial analysis.
- **Failures and gaps:** The 24 unmatched records lack coordinates and are not included in any proximity calculation or corridor analysis. Their exclusion is conservative: it may slightly undercount sundown towns near some corridors.
- **Geocoding method:** Joined source dataset GJOIN2020 codes to Census 2020 Gazetteer place, county, and county subdivision centroid files. Coordinates represent Census-designated place centroids, not precise historical locations of sundown enforcement. For most places this is accurate to within 1--2 miles, which is within the 5-mile corridor radius.

### Step 2: Game Locations Assembly
- **Tool:** Python
- **Input:** Seamheads Negro Leagues Database schedule data (assembled from Chapter 02), SABR Ballparks Database
- **Output:** data/game-locations.json -- 13 primary Negro Leagues cities with ballpark coordinates
- **Coverage:** Kansas City, St. Louis, Chicago, Pittsburgh, Philadelphia, Newark, Baltimore, Washington D.C., New York, Indianapolis, Cincinnati, Cleveland, Birmingham. These 13 cities account for the vast majority of documented Negro Leagues major league games in the 1936--1948 window.

### Step 3: Proximity Join
- **Tool:** Python (haversine distance calculation)
- **Input:** Geocoded sundown towns from Step 1 + ballpark locations from Step 2
- **Output:** For each ballpark, count of sundown towns within 10mi, 25mi, 50mi, weighted by evidence quality
- **Parameters:** 10-mile radius (immediate proximity), 25-mile radius (regional), 50-mile radius (corridor). The 10-mile radius captures towns that would have been visible or immediately adjacent to game-day travel. The 25-mile radius captures a reasonable pre-game or post-game driving range. The 50-mile radius captures a one-hour driving corridor at 1940s road speeds.

### Step 4: Route Segment Construction
- **Tool:** Python (great-circle geometry with point-to-segment distance)
- **Input:** Chronologically sorted away-game sequences per team-season + city coordinates
- **Output:** 34 unique city-pair travel corridors derived from the schedule
- **Method:** For each team-season, away games are sorted by date. Travel segments are inferred between consecutive different cities. A return segment to the home city is added at the end of each road trip sequence. The resulting set of unique city pairs represents the corridors actually traveled by Negro Leagues teams.
- **Route geometry:** Great-circle (haversine) distance between city pairs. For each corridor, all sundown towns within 5 miles of the route centerline are identified using a point-to-segment distance function. The segment distance calculation uses a lat/lon planar projection, which is accurate to within approximately 1% at US mid-latitudes (35--42 degrees N). A bounding box filter (0.15 degree margin) is applied first for computational efficiency.
- **Limitations:** Great-circle distance underestimates actual road distance. 1940s roads followed terrain, rivers, and existing rights-of-way that deviated significantly from straight lines. This means: (a) actual travel distances were longer, and (b) actual routes may have passed closer to sundown towns not captured by the great-circle corridor. Both effects make the analysis conservative. Every corridor danger score is a lower-bound estimate.

### Step 5: Corridor Danger Score Calculation
- **Tool:** Python (custom composite index, `models/corridor_danger_score.py`)
- **Input:** Route segments from Step 4, sundown town locations from Step 1, evidence tiers
- **Output:** data/corridors-full.json (34 corridor-level scores), data/team-season-danger.json (116 team-season scores)
- **Parameters:** All component weights documented in the Analytical Methods section below.

---

## Analytical Methods

### Corridor Danger Score Construction

**What it does:** Produces a composite score measuring documented sundown town exposure for a given travel corridor or team-season. The score answers: how many documented sundown towns did a team pass within 5 miles of on the road to their games, weighted by the quality of evidence that those towns were sundown towns?

**Why this method:** No single variable captures the danger of traveling through sundown country. A simple count of nearby towns ignores evidence quality. A count of confirmed towns only ignores the probable and possible designations. A raw count ignores the difference between a 30-mile drive past two sundown towns and a 300-mile drive past two sundown towns. The composite score addresses all three: it weights by evidence quality, normalizes by distance, and provides explicit uncertainty bounds.

**Alternatives considered:** (1) Binary proximity flag (any sundown town within X miles): rejected because it loses density information. (2) Unweighted count: rejected because it treats Possible the same as Confirmed. (3) Kernel density estimation: considered but rejected as overengineered for the data resolution available. The composite index is transparent and its components are inspectable.

**Components and Weights:**

| Component | Implementation | Rationale |
|-----------|---------------|-----------|
| Sundown towns within 5mi of route centerline | Point-to-segment haversine distance, bounding box pre-filter | 5 miles is the direct corridor width. A town within 5 miles of the road is a town the bus would pass through or immediately adjacent to. |
| Evidence quality weighting | Confirmed=1.0, Probable=0.7, Possible=0.4 | Reflects documentation certainty. A Confirmed town contributes full weight; a Possible town contributes 40%. The weights are ordinal, not calibrated to probability. |
| Distance normalization | Weighted count per 100 route miles | A 30-mile corridor with 3 sundown towns is denser than a 300-mile corridor with 3 sundown towns. Normalizing per 100 miles makes corridors of different lengths comparable. |
| Scale factor | 8.0 weighted towns per 100 miles = score of 1.0 | The saturation point. Derived empirically: the highest-density corridors in the data (Baltimore-Washington, Indianapolis-Cincinnati) reach this threshold. Above 8.0, additional density does not increase the score. The score is capped at 1.0. |

**Team-season aggregation:** For each team-season, the danger score is the distance-weighted average across all travel segments. Longer corridors contribute proportionally more to the season-level score. This prevents a single short, high-danger corridor from dominating the season score.

**Outputs:**

- **Corridor-level:** 34 unique city-pair corridors, each with a danger score (0--1), lower bound, upper bound, town counts by evidence tier, and a list of specific nearby towns with distances. Saved to `data/corridors-full.json`.
- **Team-season level:** 116 team-season records, each with a distance-weighted average danger score, bounds, total route miles, segment count, and town exposure totals. Saved to `data/team-season-danger.json`.

**Uncertainty bounds:**

- **Lower bound (Confirmed):** Calculated using Confirmed towns only (evidence weight 1.0, Probable and Possible excluded). Same normalization and distance calculation. This is the most conservative estimate: what we can prove from the strongest documentation alone.
- **Upper bound (Estimated):** The composite danger score multiplied by 2.5. The 2.5x multiplier is derived from the Illinois documentation rate. If Illinois, the most thoroughly researched state, had approximately 500 sundown towns but the national database documents only a fraction of the actual total, then the documented count underestimates the real count by a factor researchers describe as substantial. The 2.5x multiplier is a conservative estimate of this undercount. The upper bound is capped at 1.0.
- **The gap between bounds** is the undocumented danger. Both bounds are shown in every visualization and every data table. The reader always sees the range, never a single point estimate presented as fact.

**Confidence label:** Modeled. Every Corridor Danger Score is a designed index derived from incomplete data using documented assumptions. It is not a measurement.

**Validation:** Compared against documented travel accounts from Negro Leagues oral histories (Chapter 13 corpus). Where players describe specific dangerous routes (e.g., the Chicago-to-Indianapolis corridor through central Illinois), the Corridor Danger Score for those routes should rank high. Formal validation is pending the assembly of the Chapter 13 oral history transcripts. Where specific documented incidents exist (Fred Goree's experience in Illinois), the corridor score for the relevant route segment is cross-checked.

**Limitations:**
1. The score is a designed index based on the documented record. The actual danger was greater than any score derived from incomplete documentation can show.
2. Great-circle routing underestimates actual road distance and may miss sundown towns located near road curves not captured by the straight-line corridor.
3. The 5-mile corridor width is a fixed parameter. Towns at 6 miles were functionally just as dangerous. The boundary is arbitrary but documented.
4. Night travel weighting (specified in the chapter spec) is not implemented in the current model because time-of-travel for most road trips is not documented. This component is deferred pending further research. It is listed in the spec as "[To be calibrated]" and in the data gaps table.
5. Green Book listing proximity adjustment (specified in the chapter spec) is not implemented in the current model because the Green Book data integration is handled in Chapter 02 and the cross-chapter data join is pending. This component is deferred.
6. The 2.5x upper-bound multiplier is a modeled estimate, not a measured quantity. It could be too low or too high. It is presented as an estimate, not a fact.

---

## Machine Learning Models

### M1: Corridor Danger Score Model
- **Model type:** Spatial composite index with uncertainty quantification. Not a machine learning model in the predictive sense. It is a deterministic spatial computation with explicit evidence weighting and documented normalization.
- **Library / framework:** Python 3.12, math (haversine), json. No external ML dependencies.
- **Input data:** 2,274 geocoded sundown towns (from Scientific Data 2025 dataset), 13 Negro Leagues game locations (from Seamheads/SABR), reconstructed 1936--1948 game schedule (from Chapter 02).
- **Feature set:**
  - Sundown town latitude and longitude (Census 2020 Gazetteer centroids)
  - Sundown town evidence tier (Confirmed/Probable/Possible)
  - Game location latitude and longitude (SABR ballpark coordinates)
  - Team-season away-game sequence (Seamheads schedule, chronologically sorted)
- **Parameters:**
  - Corridor radius: 5 miles
  - Evidence weights: Confirmed=1.0, Probable=0.7, Possible=0.4
  - Normalization basis: 8.0 weighted towns per 100 route miles = 1.0
  - Upper bound multiplier: 2.5x (estimated undocumented factor)
  - Bounding box margin: 0.15 degrees (computational pre-filter, not an analytical parameter)
- **Output:** 34 corridor-level records, 116 team-season records. Each record includes danger score, lower bound, upper bound, town counts by tier, and supporting detail.
- **Confidence representation:** Lower bound (Confirmed-only) and upper bound (2.5x estimated) for every score. The label "Modeled" is applied to all outputs. The incompleteness statement is displayed alongside all visualizations.
- **Known failure modes:**
  - Short corridors (under 30 miles) can produce high per-100-mile density scores from a small number of towns. The Baltimore-Washington corridor (34.1 miles, 5 towns) scores 1.0. This is not a failure: the density is genuinely high. But readers should note that short-corridor scores have higher variance.
  - Teams with few documented away games in a season produce team-season scores based on limited data. The score is still valid for the documented games but may not represent the full season.
  - Great-circle routing may miss clusters of sundown towns located along actual road routes that curve away from the straight line between cities.
- **Reproducibility:** `python models/corridor_danger_score.py` from the chapter directory. Requires `chapters/02-the-green-book-route/data/schedule_1936_1948.json`, `data/sundown-towns.json`, and `data/game-locations.json`.

### M2: Route Counterfactual (Safer Alternative Analysis)
- **Model type:** Graph-based route comparison on the 13-city Negro Leagues network
- **Library / framework:** Python 3.12, math (haversine), json. No external dependencies.
- **Input data:** 34 pre-computed corridor danger scores (from M1), 13 game locations, 2,274 geocoded sundown towns
- **Method:** For each corridor with danger score >= 0.4 (the high-danger threshold), the model evaluates all possible 1-stop and 2-stop alternative routes through other Negro Leagues cities. A 1-stop alternative routes A to C to B instead of A to B directly. A 2-stop alternative routes A to C to D to B. For each alternative, the danger score of every segment is computed using the same methodology as M1.
- **Safer threshold:** An alternative route is classified as "safer" if its maximum segment danger score is below 50% of the direct route's danger score. The threshold is strict: an alternative is not "slightly safer" but "substantially safer." This prevents false comfort from marginal improvements.
- **Distance constraint:** 2-stop alternatives are excluded if total distance exceeds 3x the direct route. This prevents the model from proposing absurdly circuitous routes.
- **Output:** For each of the 20 high-danger corridors, whether a safer alternative existed, the best alternative route, danger reduction percentage, additional miles required, and a feasibility classification. Saved to `data/counterfactual-routes.json`.
- **Aggregate findings:** 20 high-danger corridors analyzed. 100% had at least one safer alternative through other Negro Leagues cities. This finding is striking but requires careful framing (see Labeling below).
- **Labeling:** All counterfactual outputs are labeled as "Modeled" throughout the chapter. The model asks "was there a geographically safer route?" not "did the teams know about a safer route?" and not "could they have taken a safer route given their schedule?" The counterfactual is a spatial analysis, not a historical claim about decision-making.
- **Feasibility categories:**
  - "Highly feasible" -- under 50 extra miles
  - "Feasible but adds significant distance" -- 50--150 extra miles
  - "Feasible but adds half a day of travel" -- 150--300 extra miles
  - "Theoretically possible but impractical" -- over 300 extra miles
- **Known limitations:**
  1. Uses great-circle distances, not period road distances. Actual detour distances would be longer.
  2. Only considers Negro Leagues cities as waypoints. Smaller towns with safe lodging (Green Book listings) are not modeled as intermediate stops.
  3. Does not account for schedule constraints. Teams had game dates they could not miss. A "safer" route that added a day of travel was not viable if a game was scheduled the next evening.
  4. Danger scores are based on documented sundown towns. Alternative routes through regions with fewer documented towns may have been dangerous in ways the data does not capture.
- **Reproducibility:** `python models/route_counterfactual.py` from the chapter directory. Requires `data/corridors-full.json`, `data/game-locations.json`, and `data/sundown-towns.json`.

### M3: Case Study Selection and Narrative Generation

This model has two stages: algorithmic case study selection and AI-generated narrative text.

**Stage 1: Case Study Selection**

- **Model type:** Composite scoring and selection algorithm
- **Library / framework:** Python 3.12, math (haversine), json
- **Input data:** 2,274 geocoded sundown towns, 34 corridor records (with per-town appearances), 13 game locations
- **Selection criteria:** Three factors combined into a composite score:
  - Proximity to nearest Negro Leagues ballpark (30% of composite): Towns within 1 mile score 10, within 5 miles score 8, within 10 miles score 6, within 20 miles score 4, beyond 20 miles score 0.
  - Evidence tier (33% of composite): Confirmed scores 3, Probable scores 2, Possible scores 1. Multiplied by 5.
  - Corridor appearances (37% of composite): Number of distinct travel corridors in which the town appears. Multiplied by 4. More corridor appearances means more teams passed through, which means more documented potential for encounter.
- **Selection methodology:** Top 3 towns by composite score among Confirmed-evidence towns. Then 2 additional towns selected for geographic diversity (preferring regions not yet represented) from Confirmed or Probable towns with at least 2 corridor appearances.
- **Geographic diversity enforcement:** US regions defined as Midwest (IL, IN, OH, MI, MO, WI, MN, IA), East (PA, NJ, NY, CT, MA, MD, DE, D.C.), South (AL, GA, TN, SC, NC, VA, FL, MS, LA, KY, AR, TX). No more than 2 of the top 3 selections may come from the same region. The 2 diversity picks prioritize underrepresented regions.
- **Output:** 5 case study towns with full metadata, saved to `data/case-studies.json`. Runner-up towns (top 20 by score, excluding selected) are also recorded for editorial review.
- **Confidence label:** Selection methodology is Modeled. Evidence tiers on selected towns are Documented (Confirmed) or Reported (Probable).
- **Reproducibility:** `python models/case_study_selection.py`

**Stage 2: Narrative Generation**

- **Generated by:** Claude (Anthropic), model `claude-sonnet-4-20250514`
- **Prompt structure:** System prompt establishes the "Have you heard" register, the rules (no em dashes, no euphemism, no invented facts, subjects are protagonists), and the confidence vocabulary. Per-town user prompt includes: town name, state, evidence tier, nearest ballpark and distance, corridor context (which corridors the town appears in, danger scores, distance from centerline), assembled primary sources (when available), and an editorial angle.
- **Prompt requirements for each narrative:**
  1. Open with a specific, sourced fact about the town
  2. Connect the town to the specific Negro Leagues team that traveled past it, with distance
  3. Include at least 3 specific documented facts from provided sources
  4. Mark each claim with confidence level inline: [Documented], [Verified], or [Reported]
  5. Close with the distance -- the number is the argument
  6. 300--400 words. No em dashes. No euphemism.
- **Full prompts:** Committed to the repo as the system prompt and user prompt template in `models/narrative_generator.py`.
- **Output:** One 300--400 word narrative per case study town. Each narrative is labeled as "AI-generated" with the specific model version.
- **Confidence label:** Displayed as "AI-generated . claude-sonnet-4-20250514". Every factual claim within the narrative carries its own inline confidence label ([Documented], [Verified], or [Reported]).
- **Human review:** Oscar reviews every sentence of all five narratives against primary source citations before publication. Any claim that cannot be traced to a provided source is removed. Any claim that overstates the source is revised. Oscar's approval status is tracked per case study in the data file.
- **Accuracy standard:** Every factual claim must trace to the input data or a primary source document. The model cannot know what it felt like. It can only describe what the documentation shows. No named individuals are attributed experiences unless primary source documentation exists.
- **Known limitations:**
  1. The model may generate plausible-sounding claims that are not supported by the provided sources. Oscar review catches this.
  2. The model writes in present tense about historical conditions. This is a stylistic choice, not a claim that conditions persist.
  3. The narratives are written from the perspective of a generalized traveler in 1942, not a named individual. This avoids false attribution but loses specificity.
  4. Primary source assembly for the five selected towns is pending. Narratives generated before full source assembly are marked "Pending primary source assembly" and are not published.
- **Reproducibility:** `python models/narrative_generator.py` from the chapter directory. Requires an Anthropic API key and `data/case-studies.json` with primary sources populated.

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| Incomplete sundown towns database | Documented database captures 2,298 places. Researchers estimate the actual total was far higher. Illinois alone may have had 500+ sundown towns (70% of all towns). | Every Corridor Danger Score is a lower bound. The actual sundown town density along every corridor was almost certainly higher than what the data shows. | Lower/upper bounds shown on every score. Upper bound uses 2.5x multiplier. Incompleteness statement displayed prominently in chapter and methodology. |
| Great-circle vs. road distance | Routes use great-circle (haversine) distance, not period-accurate 1940s road distances. Actual roads were longer and curved. | Route distances are underestimated. Some sundown towns near actual road curves are missed by the 5-mile corridor width. Danger scores are conservative. | Documented in every corridor output. The metadata explicitly states "Period-accurate road routing would increase distances." Planned upgrade to historical road network data. |
| Reconstructed schedule data | Seamheads schedule data is assembled from contemporary newspaper accounts and is not complete. Some games, barnstorming tours, and exhibition matches are not documented. | Some travel corridors are missing from the analysis. Actual team-season danger exposure may have been higher than calculated. | Documented flag. Analysis covers only the documented schedule. The incompleteness is noted: "Schedule data is reconstructed, not complete. Some road trips may be missing." |
| Night travel estimation | Time of travel for most road trips is not documented. The chapter spec calls for a night-travel weighting (sundown enforcement was time-specific). | The current model does not weight by time of travel. Night travel through a sundown town was more dangerous than daytime travel, but this differential is not captured. | Listed as a deferred component. The spec's night-travel weight is noted as "[To be calibrated]." The limitation is acknowledged: all corridor scores treat day and night travel equally. |
| Green Book proximity adjustment | The chapter spec calls for a Green Book listing proximity adjustment to the Corridor Danger Score. This requires cross-chapter data integration with Chapter 02. | The current model does not account for Green Book listings as a mitigating factor. Some corridors may have been partially mitigated by nearby safe lodging. | Listed as a deferred component pending Chapter 02 data join. |
| Incomplete game locations | Some Seamheads entries have city but not specific ballpark. | City center or primary ballpark coordinates are used. Actual game locations may have been 1--5 miles from the assigned coordinates. | Within the 5-mile corridor radius tolerance. The effect on danger scores is negligible for corridor-level analysis. |
| Unmatched sundown town records | 24 of 2,298 source records could not be geocoded via Census Gazetteer files. | 24 sundown towns are excluded from all spatial analysis. | Conservative exclusion. The 24 records are documented in the metadata. Their exclusion may slightly undercount sundown towns near some corridors. |
| NAACP/FBI record gaps | Coverage is uneven geographically. Not all sundown enforcement incidents were recorded or investigated. | Case studies are limited to documented incidents. Towns with aggressive enforcement but no surviving records are not represented. | Gaps named explicitly in case study narratives. No imputation. Where documentation is absent, the case study states so. |
| Census coordinate precision | Sundown town coordinates come from Census place centroids, not precise historical locations. | Coordinates may be off by 1--2 miles from the actual historical sundown enforcement boundary (which was typically the city limits). | Within the 5-mile corridor tolerance. The centroid is sufficient for the corridor-width analysis. |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| Illinois had 500+ sundown towns (70% of all towns) | This estimate comes from James Loewen's research and is widely cited but is itself an extrapolation. The documented count in the Scientific Data dataset for Illinois is lower. | Loewen, James. "Sundown Towns" (2005); Scientific Data (2025) dataset | Presented as "estimated" with attribution to Loewen. Used to derive the upper-bound multiplier but not presented as a measured count. Labeled: Estimated. |
| The 2.5x upper-bound multiplier | The multiplier is a modeled estimate derived from the Illinois documentation rate. It could underestimate or overestimate the national undocumented fraction. States with less research may have higher undocumented rates. | Illinois documentation rates from Loewen (2005); national documentation patterns from Scientific Data (2025) | Labeled as Estimated. Both the multiplied upper bound and the unmultiplied score are always shown. The reader can evaluate with or without the multiplier. |
| Fred Goree's sundown town experience | The hook narrative cites a documented experience. The specific details of the incident need primary source verification for the exact town and date. | Oral history accounts; pending primary source assembly | Labeled as Reported until primary source documentation is completed and verified. Pending Oscar review. |

---

## Confidence Vocabulary Applied to This Chapter

Every claim in this chapter uses the platform's confidence vocabulary. Here is how each term applies to the content of The Sundown Corridor:

| Term | How Applied in This Chapter |
|------|---------------------------|
| Documented | Sundown town designations at the Confirmed evidence tier. Census data. NAACP/FBI records where primary source exists. Game locations from Seamheads with specific ballpark data. |
| Verified | Sundown towns cross-referenced across both the Scientific Data dataset and the Loewen/Berrey database with consistent evidence. |
| Reported | Sundown towns at the Probable tier (multiple secondary sources). Oral history accounts of travel experiences cited from a single source. |
| Estimated | The upper-bound multiplier (2.5x). Night-travel danger differential (not yet implemented). The "500+ sundown towns in Illinois" figure. |
| Modeled | Every Corridor Danger Score. Every team-season aggregate score. The counterfactual route analysis. The case study selection algorithm. |
| Reconstructed | Schedule data for 1936--1948 (assembled from newspaper accounts by Seamheads researchers). Travel segment sequences inferred from game chronology. |
| Disputed | The precise count of sundown towns nationally. The specific undocumented fraction. See Disputed Claims table. |
| AI-generated | All five case study narratives. Labeled with model version (claude-sonnet-4-20250514), generation date, and Oscar review status. |

---

## Cross-Chapter Dependencies

This chapter depends on data assembled in Chapter 02 (The Green Book Route):

- **Schedule data:** `chapters/02-the-green-book-route/data/schedule_1936_1948.json` provides the game-level schedule used to infer travel segments. If Chapter 02 schedule data is updated, the corridor analysis must be re-run.
- **Ballpark coordinates:** Game location coordinates were originally geocoded in the Chapter 02 pipeline.
- **Green Book data:** The planned Green Book proximity adjustment (deferred) will require the Chapter 02 Green Book listings dataset.

---

## Reproducibility

**Code:** All model code is in `chapters/03-the-sundown-corridor/models/` and is MIT licensed. Four scripts:
1. `corridor_danger_score.py` -- M1: corridor and team-season danger scores
2. `route_counterfactual.py` -- M2: safer alternative route analysis
3. `case_study_selection.py` -- M3 stage 1: case study town selection
4. `narrative_generator.py` -- M3 stage 2: AI narrative generation (requires Anthropic API key)

**Data:** All pre-computed outputs are in `chapters/03-the-sundown-corridor/data/` and are CC0 licensed:
- `sundown-towns.json` -- processed sundown towns dataset (2,298 records)
- `game-locations.json` -- 13 Negro Leagues game locations
- `corridors.json` -- 16 corridor scores (initial run)
- `corridors-full.json` -- 34 corridor scores (full schedule analysis)
- `team-season-danger.json` -- 116 team-season danger scores
- `counterfactual-routes.json` -- 20 counterfactual route analyses
- `case-studies.json` -- 5 selected case study towns with metadata

**Environment:** Python 3.12. The models use only standard library modules (json, math, os, collections) except for `narrative_generator.py`, which requires the `anthropic` Python package for Claude API access.

**Runtime:** M1 runs in under 30 seconds on standard hardware (the spatial join is O(corridors * towns) with bounding box pre-filter). M2 runs in under 10 seconds. M3 stage 1 runs in under 5 seconds. M3 stage 2 requires API calls and runs in approximately 30 seconds with rate limiting.

To reproduce:
```bash
cd chapters/03-the-sundown-corridor/
python models/corridor_danger_score.py
python models/route_counterfactual.py
python models/case_study_selection.py
python models/narrative_generator.py  # requires ANTHROPIC_API_KEY
```

Output files will appear in `data/` and match the committed versions (except narrative generation, which is non-deterministic).

**Raw data access:**
- Scientific Data (2025) dataset: Download from https://osf.io/fh7r6/ (open access, CC-BY)
- Seamheads schedule data: Available at https://www.seamheads.com/NescoDatabase/ (research use)
- Census Gazetteer files: Available at https://www.census.gov/geographies/reference-files/time-series/geo/gazetteer-files.html (public domain)

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 0.1 | May 2026 | Skeleton created from methodology template |
| 1.0 | May 2026 | Full methodology documented. M1, M2, M3 implementations described. All placeholders filled. Data processing pipeline documented. Confidence vocabulary applied. |

---

## Citation

Cite this chapter:
Haynes, Jeremy. "The Sundown Corridor." The Other Box Score,
theotherboxscore.org/chapters/the-sundown-corridor/, [publication date].

Chicago:
Haynes, Jeremy. "The Sundown Corridor." The Other Box Score.
[Month Year]. https://theotherboxscore.org/chapters/the-sundown-corridor/.

Data (CC0):
The Other Box Score. "The Sundown Corridor Dataset." CC0 1.0.
https://github.com/other-boxscore/chapters/03-the-sundown-corridor/data/.
[Version date].

Primary data source:
Nardos, Rahel, et al. "A national data set of historical US sundown
towns for quantitative analysis." Scientific Data 12 (2025).
https://doi.org/10.1038/s41597-024-04330-9

---

## Questions and Corrections

If you find an error in this methodology, open an issue at github.com/other-boxscore/chapters/the-sundown-corridor/issues or email the project maintainer. Corrections are documented in the version history above.
