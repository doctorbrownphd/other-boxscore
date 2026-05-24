# The Sundown Corridor -- Methodology
## theotherboxscore.org/chapters/the-sundown-corridor/

**Version:** 0.1 (skeleton -- to be completed during build)
**Published:** Unpublished
**Last updated:** May 2026
**Reviewed by:** Pending Elias (statistical methodology) . Pending Oscar (historical grounding)

---

## What This Chapter Does

This chapter combines two datasets that have never been overlaid: the
Scientific Data (Nature, 2025) geocoded sundown towns dataset of 2,248
documented historical sundown places and the Seamheads Negro Leagues
game schedule for 1936--1948. For every documented game, it calculates
the proximity and density of documented sundown towns along the travel
corridor to get there. The documented danger was the commute.

---

## The Incompleteness Statement

*"This analysis is bounded by the documented record. Researchers who have studied sundown towns most extensively estimate that the documented database captures a fraction of actual sundown places. Illinois, the most thoroughly documented state, had an estimated 500+ sundown towns -- 70% of all towns. The national database contains 2,248 documented places. The actual number of sundown places in the United States during the 1936--1948 period was certainly higher. Every Corridor Danger Score in this analysis is therefore a lower bound estimate. The actual danger was greater than the data shows."*

This statement is displayed prominently in the chapter. It is not fine print. The incompleteness of the data makes the case stronger: even the documented record is damning. The full record would be worse.

---

## Data Sources

### Historical Sundown Towns Linked to US Census Geographies
- **Source:** Nardos, Rahel, et al. "A national data set of historical US sundown towns for quantitative analysis." Scientific Data 12 (2025).
- **URL or archive location:** https://doi.org/10.1038/s41597-024-04330-9
- **Coverage:** 2,248 documented historical sundown places across the United States
- **License:** CC-BY (Academic open access)
- **Access date:** [To be documented at pipeline run time]
- **Known limitations:** The database is incomplete by its own documentation. Researchers estimate it captures a fraction of actual sundown places. Illinois, the most documented state, had an estimated 500+ sundown towns (70% of all towns). The national database contains 2,248. The actual number was certainly higher.
- **How used in this chapter:** Each documented sundown place is geocoded with lat/lon coordinates and assigned an evidence quality tier (Confirmed/Probable/Possible). Used as the primary spatial layer for proximity calculations and corridor danger scoring.

### Loewen/Berrey Sundown Towns Database
- **Source:** James Loewen and Ellen Berrey, Tougaloo College
- **URL or archive location:** https://justice.tougaloo.edu/sundown-towns/
- **Coverage:** Full crowdsourced database of sundown towns
- **License:** Academic research use
- **Access date:** [To be documented]
- **Known limitations:** Crowdsourced data with variable documentation quality. The Scientific Data (2025) dataset builds on this database with additional geocoding and evidence quality classification.
- **How used in this chapter:** Cross-reference and supplementary evidence for case study towns. The Scientific Data dataset is the primary analytical source.

### Seamheads Negro Leagues Database
- **Source:** Seamheads.com (Gary Ashwill et al.)
- **URL or archive location:** https://www.seamheads.com/NescoDatabase/
- **Coverage:** 1920--1948 game-level schedule data
- **License:** Research use
- **Access date:** [To be documented]
- **Known limitations:** Not all games have specific ballpark data. Some entries have city only.
- **How used in this chapter:** Game date, home team, away team, and location extracted for every game in the 1936--1948 window. Data already assembled from Chapter 02.

### SABR Ballparks Database
- **Source:** Society for American Baseball Research
- **URL or archive location:** https://www.sabr.org/
- **Coverage:** All documented professional baseball venues
- **License:** Research use
- **Access date:** [To be documented]
- **Known limitations:** Some Negro Leagues venues are not in the database.
- **How used in this chapter:** Ballpark addresses geocoded to lat/lon coordinates. Data already geocoded from Chapter 02.

### Historical US Road Network
- **Source:** USGS and Library of Congress historical road maps
- **URL or archive location:** https://www.loc.gov/maps/ (various historical road atlases)
- **Coverage:** US road network, 1920--1950
- **License:** Public domain
- **Access date:** [To be documented]
- **Known limitations:** Historical road network data is incomplete. Not all period roads are digitized. Routing is approximate -- it represents plausible routes, not verified historical routes.
- **How used in this chapter:** Period-accurate road routing between game cities for Corridor Danger Score calculation. Route segments are used to count documented sundown towns within 5 miles of the road.

### US Census Historical Data
- **Source:** U.S. Census Bureau
- **Coverage:** 1920, 1930, 1940, 1950 decennial census
- **License:** Public domain
- **How used in this chapter:** Black population by place as a context layer for corridor analysis. Demographic evidence supporting sundown town designation where applicable.

### NAACP Anti-Lynching Records
- **Source:** NAACP Papers, Library of Congress
- **Coverage:** 1882--1968
- **License:** Public domain
- **Access date:** [To be documented]
- **Known limitations:** Records document reported incidents, not all incidents. Coverage is uneven geographically.
- **How used in this chapter:** Documented incidents for specific case study towns. Used only where primary source documentation exists.

### FBI Historical Records
- **Source:** FBI Records Vault (FOIA releases)
- **Coverage:** 1935--1955
- **License:** FOIA/public domain
- **Access date:** [To be documented]
- **Known limitations:** Select records only. FOIA releases are partial. Not all relevant incidents were investigated or documented.
- **How used in this chapter:** Select documented incidents in sundown corridor towns for case studies.

---

## Evidence Quality Tiers

The Scientific Data (2025) dataset assigns evidence quality ratings to each documented sundown place. This chapter uses all three tiers but labels each point by its evidence quality.

| Tier | Definition | Visual Treatment | Weight in Scoring |
|------|------------|-----------------|-------------------|
| Confirmed | Strong primary source documentation (signs, ordinances, newspaper accounts, legal records) | Full opacity | 1.0 |
| Probable | Multiple secondary sources, consistent historical record, demographic evidence | 70% opacity | 0.7 |
| Possible | Limited documentation, demographic evidence only, single source | 40% opacity | 0.4 |

The reader sees the gradient of certainty. Elias enforces this. No point is presented as confirmed that is only possible.

---

## Data Processing

### Step 1: Sundown Towns Data Acquisition
- **Tool:** Python (requests, pandas)
- **Input:** Scientific Data (2025) geocoded dataset from figshare
- **Output:** data/sundown_towns.json -- all documented sundown places with lat/lon, evidence tier, state, town name
- **Accuracy / success rate:** [To be measured and documented]
- **Failures and gaps:** [To be documented -- expected issues with coordinate resolution]

### Step 2: Proximity Join
- **Tool:** Python (haversine distance calculation)
- **Input:** Geocoded sundown towns from Step 1 + ballpark locations from Ch. 02
- **Output:** data/ballpark_proximity.json -- for each ballpark, count of sundown towns within 10mi, 25mi, 50mi, weighted by evidence quality
- **Parameters:** 10-mile radius (immediate proximity), 25-mile radius (regional), 50-mile radius (corridor). Rationale documented in spec.

### Step 3: Route Segment Construction
- **Tool:** Python (period-accurate road routing)
- **Input:** Game schedule sequences + historical road network data
- **Output:** Route segments between consecutive game cities
- **Parameters:** Route segments use period-accurate roads where available. Sundown towns counted within 5 miles of each segment.

### Step 4: Corridor Danger Score Calculation
- **Tool:** Python (custom composite index)
- **Input:** Route segments, sundown town proximity data, evidence tiers, Green Book listings
- **Output:** Corridor Danger Score per team-season with uncertainty bounds
- **Parameters:** All component weights documented below.

---

## Analytical Methods

### Corridor Danger Score Construction

**What it does:** Produces a composite score measuring documented sundown town exposure for a given team-season across the full season's road trips.

**Why this method:** No single variable captures the danger of traveling through sundown country. The composite captures the density, proximity, evidence quality, and time-of-travel factors that together describe the documented exposure.

**Components and Weights:**

| Component | Weight | Rationale |
|-----------|--------|-----------|
| Total documented sundown towns within 5mi of any road segment | Primary input | Direct measure of corridor density |
| Evidence quality weighting (Confirmed=1.0, Probable=0.7, Possible=0.4) | Applied to each town | Reflects documentation certainty |
| Time of travel weighting (night travel scores higher) | [To be calibrated] | Sundown enforcement was time-specific |
| Green Book listing proximity adjustment | [To be calibrated] | Some mitigation where listings existed |

**Outputs:** Score per team-season. Higher = more documented sundown corridor exposure.

**Uncertainty bounds:**
- **Lower bound:** Calculated using confirmed towns only. This is what we can prove.
- **Upper bound:** Extrapolated from Illinois documentation rates (70% of towns) to the full national geography. This estimates the actual danger.
- **The gap between bounds** is the undocumented danger. Both bounds are shown.

**Validation:** [To be documented -- comparison against documented travel accounts and known incidents]

**Limitations:** The score is a designed index based on the documented record. The actual danger was greater than any score derived from incomplete documentation can show.

---

## Machine Learning Models

### M1: Corridor Danger Score Model
- **Model type:** Spatial composite index with uncertainty quantification
- **Library / framework:** Python 3.12, scipy, numpy
- **Input data:** Geocoded sundown towns, period-accurate road segments, Seamheads schedule data
- **Feature set:** [To be documented]
- **Parameters:** Component weights documented above
- **Output:** Ranked team-season danger scores with lower and upper uncertainty bounds
- **Confidence representation:** Lower bound (confirmed-only) and upper bound (extrapolated) for every score
- **Known failure modes:** [To be documented]
- **Reproducibility:** `python pipeline/03_corridor_score.py`

### M2: Route Optimizer (Counterfactual)
- **Model type:** Historical route comparison
- **Library / framework:** Python 3.12
- **Input data:** High-danger route segments, historical road network, sundown town locations
- **Output:** For each high-danger segment, alternative routes and their corresponding danger scores
- **Labeling:** All counterfactual outputs are labeled as model output, not historical claims
- **Known limitations:** Historical road network data is incomplete. Alternative routes are plausible, not verified. The model asks "was there a safer route?" not "did they know about a safer route?"
- **Reproducibility:** `python pipeline/04_counterfactual.py`

### M3: Case Study Narratives
- **Generated by:** Claude (Anthropic) -- specific model version to be documented
- **Prompt structure:** Committed to `pipeline/prompts/narrative_template.md`
- **Inputs to the prompt:** Sundown town documentation, route data, census context, NAACP/FBI records where available
- **Output:** Historical narrative per case study town, written as if from the perspective of a traveler in 1942
- **Confidence label:** Displayed as "AI-generated . [confidence level]"
- **Human review:** Oscar reviews all five narratives before ship
- **Accuracy standard:** Every factual claim must trace to the input data or a primary source document
- **Known limitations:** The model cannot know what it felt like. It can only describe what the documentation shows. No named individuals are attributed experiences unless primary source documentation exists.

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| Incomplete sundown towns database | Documented database captures a fraction of actual sundown places | Every Corridor Danger Score is a lower bound | Lower/upper bounds shown; incompleteness statement displayed prominently |
| Missing road network data | Not all period roads are digitized | Some route segments are approximate | Documented flag on affected routes |
| Undocumented incidents | Not all sundown enforcement incidents were recorded | Case studies limited to documented incidents | Gaps named explicitly; no imputation |
| Incomplete game locations | Some Seamheads entries have city but not ballpark | City center coordinates used | Documented flag on affected games |
| NAACP/FBI record gaps | Coverage is uneven geographically | Case studies limited to documented towns | Gaps named explicitly |
| Night travel estimation | Time of travel for most road trips is not documented | Night travel weighting is modeled, not measured | Labeled as modeled in methodology |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| [To be populated during build] | | | |

---

## Reproducibility

**Code:** All pipeline code is in `chapters/03-the-sundown-corridor/pipeline/` and is MIT licensed.
**Data:** All pre-computed outputs are in `chapters/03-the-sundown-corridor/data/` and are CC0 licensed.
**Environment:** Python 3.12. Requirements in `pipeline/requirements.txt`.

To reproduce:
```bash
cd chapters/03-the-sundown-corridor/pipeline/
pip install -r requirements.txt
python 01_sundown_data.py
python 02_proximity_join.py
python 03_corridor_score.py
python 04_counterfactual.py
python 05_case_studies.py
python 06_narratives.py
python 07_export.py
```

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 0.1 | May 2026 | Skeleton created from methodology template |

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
