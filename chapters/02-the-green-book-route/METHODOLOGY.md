# The Green Book Route -- Methodology
## theotherboxscore.org/chapters/the-green-book-route/

**Version:** 0.1 (skeleton -- to be completed during build)
**Published:** Unpublished
**Last updated:** May 2026
**Reviewed by:** Pending Elias (statistical methodology) . Pending Oscar (historical grounding)

---

## What This Chapter Does

This chapter combines two datasets that have never been overlaid: the
Negro Motorist Green Book safe establishment listings (1936--1948) and
the Seamheads Negro Leagues game schedule for the same period. For every
documented game, it calculates how many safe places to eat and sleep were
within reach of the ballpark. Cities with no listings go dark on the map.
The darkness is the finding.

---

## Data Sources

### Negro Motorist Green Book
- **Source:** Library of Congress, Rare Book and Special Collections Division
- **URL or archive location:** https://www.loc.gov/collections/green-book/
- **Coverage:** 1936--1966; this chapter uses editions within the 1936--1948 window
- **License:** Public domain (US Government work / pre-1928 publication)
- **Access date:** [To be documented at pipeline run time]
- **Known limitations:** Not all editions within the window are digitized. Some editions have OCR-resistant typography. Address formats are inconsistent across editions.
- **How used in this chapter:** Each listing is extracted (business name, address, city, state, category), geocoded, and matched against ballpark locations by radius.

### Seamheads Negro Leagues Database
- **Source:** Seamheads.com (Gary Ashwill et al.)
- **URL or archive location:** https://www.seamheads.com/NescoDatabase/
- **Coverage:** 1900--1948 game-level schedule data
- **License:** Research use
- **Access date:** [To be documented]
- **Known limitations:** Not all games have specific ballpark data. Some entries have city only.
- **How used in this chapter:** Game date, home team, away team, and location extracted for every game in the 1936--1948 window.

### SABR Ballparks Database
- **Source:** Society for American Baseball Research
- **URL or archive location:** https://www.sabr.org/
- **Coverage:** All documented professional baseball venues
- **License:** Research use
- **Access date:** [To be documented]
- **Known limitations:** Some Negro Leagues venues are not in the database.
- **How used in this chapter:** Ballpark addresses geocoded to lat/lon coordinates.

### OpenStreetMap / Nominatim
- **Source:** OpenStreetMap contributors
- **URL or archive location:** https://nominatim.openstreetmap.org/
- **Coverage:** Current global address database
- **License:** ODbL (Open Database License)
- **How used in this chapter:** Geocoding both Green Book addresses and ballpark locations. Historical address validation where possible.

### Census Bureau Historical Data
- **Source:** U.S. Census Bureau
- **Coverage:** 1930, 1940, 1950 decennial census
- **License:** Public domain
- **How used in this chapter:** Black population by city as a context layer for the safety score.

### Sundown Towns Database
- **Source:** James Loewen, Sundown Towns research
- **License:** Academic/open
- **How used in this chapter:** Cross-reference with safety score; shared data layer with Chapter 03.

---

## Data Processing

### Step 1: Green Book OCR
- **Tool:** [AWS Textract or Tesseract -- to be determined during Phase 1]
- **Input:** Digitized Green Book page images from LOC
- **Output:** Structured records: business name, address, city, state, category
- **Accuracy / success rate:** [To be measured and documented]
- **Failures and gaps:** [To be documented -- expected issues with period typography]

### Step 2: Address Geocoding
- **Tool:** Nominatim (OpenStreetMap)
- **Input:** Extracted addresses from Step 1 + ballpark addresses from SABR
- **Output:** Lat/lon coordinates for each address
- **Accuracy / success rate:** [To be measured]
- **Failures and gaps:** [Historical addresses that cannot be resolved are flagged, not dropped]

### Step 3: Spatial Matching
- **Tool:** Python (haversine distance calculation)
- **Input:** Geocoded Green Book listings + geocoded ballpark locations
- **Output:** For each game: count of Green Book listings within 1-mile and 5-mile radius
- **Parameters:** 1-mile radius (walkable), 5-mile radius (drivable). Rationale documented in spec.

### Step 4: Safety Score Calculation
- **Tool:** Python (custom composite index)
- **Input:** Listing counts, listing categories, Census Black population data, sundown town proximity
- **Output:** Composite safety score per city-season
- **Parameters:** [All component weights to be documented here when finalized]

---

## Analytical Methods

### Safety Score Construction
**What it does:** Produces a single composite score representing how safe a given city was for a Black baseball team on a road trip in a given season.

**Why this method:** No single variable captures safety. A city with one hotel and zero restaurants is different from a city with five restaurants and no hotel. The composite captures the mix.

**Inputs:** [To be documented with exact variable names]

**Parameters:** [All weights to be documented with rationale]

**Outputs:** Score per city-season on a defined scale. Higher = more accessible.

**Uncertainty:** [To be documented]

**Validation:** [To be documented -- likely comparison against documented travel accounts]

**Limitations:** The score is a designed index, not a direct measurement. It captures accessibility from the Green Book data, not actual safety.

---

## Machine Learning Models

### M1: Route Clustering Model
- **Model type:** HDBSCAN unsupervised clustering
- **Library / framework:** scikit-learn, Python 3.12
- **Training data:** All game-to-game travel vectors for each team
- **Feature set:** [To be documented]
- **Hyperparameters:** [To be documented]
- **Output:** Labeled route clusters with safety profiles
- **Confidence representation:** [To be documented]
- **Known failure modes:** [To be documented]
- **Reproducibility:** `python pipeline/04_route_clustering.py`

### M3: Road Trip Narratives
- **Generated by:** Claude (Anthropic) -- specific model version to be documented
- **Prompt structure:** Committed to `pipeline/prompts/`
- **Inputs to the prompt:** Route data, safety scores, game results, documented historical accounts
- **Output:** Plain-language road trip narrative per team-season
- **Confidence label:** Displayed as "AI-generated . [confidence level]"
- **Human review:** Oscar reviews all narratives before ship
- **Accuracy standard:** Every factual claim must trace to the input data
- **Known limitations:** The model cannot know what it felt like. It can only describe what the data shows.

### M4: Pattern Detector
- **Model type:** Time-series analysis
- **Output:** Trend in league-wide safety profile, 1936--1948
- **Confidence representation:** [To be documented]

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| Missing Green Book editions | Not all years have digitized editions | Safety scores interpolated from nearest available edition | Flagged in methodology and on visualization |
| Incomplete game locations | Some Seamheads entries have city but not ballpark | City center coordinates used | Documented flag on affected games |
| Geocoding failures | Historical addresses that cannot be resolved | [To be measured] | Flagged, not dropped |
| Barnstorming games | Many games outside formal schedules are undocumented | Cannot be included | Acknowledged in methodology |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| [To be populated during build] | | | |

---

## Reproducibility

**Code:** All pipeline code is in `chapters/02-the-green-book-route/pipeline/` and is MIT licensed.
**Data:** All pre-computed outputs are in `chapters/02-the-green-book-route/data/` and are CC0 licensed.
**Environment:** Python 3.12. Requirements in `pipeline/requirements.txt`.

To reproduce:
```bash
cd chapters/02-the-green-book-route/pipeline/
pip install -r requirements.txt
python 01_green_book_ocr.py
python 02_schedule_extract.py
python 03_geocode.py
python 04_route_clustering.py
python 05_safety_score.py
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
Haynes, Jeremy. "The Green Book Route." The Other Box Score,
theotherboxscore.org/chapters/the-green-book-route/, [publication date].

Chicago:
Haynes, Jeremy. "The Green Book Route." The Other Box Score.
[Month Year]. https://theotherboxscore.org/chapters/the-green-book-route/.

Data (CC0):
The Other Box Score. "The Green Book Route Dataset." CC0 1.0.
https://github.com/other-boxscore/chapters/02-the-green-book-route/data/.
[Version date].
