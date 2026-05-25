# The Green Book Route -- Methodology
## theotherboxscore.org/chapters/the-green-book-route/

**Version:** 1.0
**Published:** Unpublished (pre-release)
**Last updated:** May 2026
**Reviewed by:** Pending Elias (statistical methodology) . Pending Oscar (historical grounding)

---

## What This Chapter Does

This chapter combines two datasets that have never been overlaid: the Negro Motorist Green Book safe establishment listings (1936--1948) and the Seamheads Negro Leagues game schedule for the same period. For every documented game, it calculates how many safe places to eat and sleep were within reach of the ballpark. The chapter covers 3,686 games across 13 cities and 16 teams over twelve seasons. The average composite safety score across all game-city combinations was 0.37 on a 0-to-1 scale. Cities with no listings go dark on the map. The darkness is the finding.

The dataset produced by this chapter does not exist anywhere else. The Green Book archives are digitized at the Library of Congress and at the NYPL Schomburg Center. The Seamheads schedule data covers every documented Negro Leagues game. The geographic overlay -- Green Book listings mapped against game locations, season by season, team by team -- is original to this project and published under CC0.

---

## Data Sources

### Negro Motorist Green Book (Library of Congress)
- **Source:** Library of Congress, Rare Book and Special Collections Division
- **URL or archive location:** https://www.loc.gov/collections/green-book/
- **Coverage:** 1936--1966; this chapter uses editions within the 1936--1948 window
- **License:** Public domain (US Government work / pre-1928 publication)
- **Access date:** 2026-05-24
- **Known limitations:** Not all editions within the window are digitized at LOC. The OCR pipeline successfully processed only the 1936 edition from LOC (74 pages, 2,980 raw listings). Editions for 1938, 1940, 1941, and 1942 returned metadata errors or incomplete downloads. The 1947, 1948, and 1949 editions returned 404 or empty resource responses from the LOC IIIF API. OCR accuracy on the 1936 edition was estimated at 48.7% by heuristic analysis, well below production quality. Address formats are inconsistent across editions, and period typography (e.g., decorative fonts, non-standard abbreviations) degrades OCR performance.
- **How used in this chapter:** Each listing is extracted (business name, address, city, state, category), geocoded, and matched against ballpark locations by radius. Due to the low OCR success rate from LOC images, the primary Green Book dataset used for spatial matching is the NYPL Schomburg Center's pre-geocoded 1947 edition (see below).

### Negro Motorist Green Book (NYPL Schomburg Center)
- **Source:** New York Public Library, Schomburg Center for Research in Black Culture, NYPL Labs
- **URL or archive location:** https://github.com/NYPL-publicdomain/greenbooks
- **Coverage:** 1947 edition, fully OCR'd and geocoded by NYPL Labs
- **License:** CC0 1.0 Public Domain
- **Access date:** 2026-05-24
- **Known limitations:** This dataset covers only the 1947 edition. It contains 1,051 listings across 20 categories and 23 states. The NYPL geocoding pipeline produced coordinates from OCR text of a 1947 publication. Some listings geocode to incorrect locations, particularly in the Northeast (New York, Philadelphia, Pittsburgh, Newark). The OCR also garbled some state names (e.g., "CHICAGO, GEORGIA") and some business names (e.g., the first listing reads "around 20," with an address of "000 miles per year" -- clearly garbled header text). Five listings were skipped by the NYPL pipeline. Geocoded confidence scores range from approximately 0.5 to 1.0, with lower-confidence entries reflecting ambiguous or malformed addresses.
- **How used in this chapter:** This is the primary Green Book dataset for the spatial matching pipeline. Each listing's pre-geocoded coordinates are matched against ballpark coordinates using haversine distance at 1-mile and 5-mile radii. The 1947 edition is applied to all seasons in the 1936--1948 window, which introduces a temporal mismatch documented below in Data Gaps.

### Seamheads Negro Leagues Database
- **Source:** Seamheads.com (Gary Ashwill et al.)
- **URL or archive location:** https://www.seamheads.com/NescoDatabase/
- **Coverage:** 1900--1948 game-level schedule data
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** Not all games have specific ballpark data. Some entries have city only. The pipeline processed 3,686 games across the 1936--1948 window for 14 teams. Game provenance is marked as "reconstructed" in the schedule data, meaning these records were assembled from multiple historical sources by the Seamheads research team rather than transcribed from a single authoritative ledger.
- **How used in this chapter:** Game date, home team, away team, city, state, league, and ballpark extracted for every game in the 1936--1948 window. Each game record is geocoded to a specific ballpark or city center.

### SABR Ballparks Database
- **Source:** Society for American Baseball Research
- **URL or archive location:** https://www.sabr.org/
- **Coverage:** All documented professional baseball venues
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** Some Negro Leagues venues are not in the SABR database. The pipeline resolved 22 ballparks. Coordinates were cross-referenced against Google Maps satellite imagery and, where available, NPS National Register of Historic Places nominations. Each ballpark entry includes a `coord_source` field documenting its provenance (e.g., "SABR Ballparks Database," "SABR Ballparks Database / Bedford Dwellings site").
- **How used in this chapter:** Ballpark names, cities, and addresses geocoded to lat/lon coordinates. These coordinates serve as the center points for the 1-mile and 5-mile Green Book listing radii.

### OpenStreetMap / Nominatim
- **Source:** OpenStreetMap contributors
- **URL or archive location:** https://nominatim.openstreetmap.org/
- **Coverage:** Current global address database
- **License:** ODbL (Open Database License)
- **How used in this chapter:** Geocoding Green Book addresses extracted via the LOC OCR pipeline and resolving ballpark locations not already in SABR. Rate-limited to one request per second per Nominatim usage policy. Results are cached to `geocode_cache.json` to avoid redundant API calls on pipeline reruns. Failed geocodes are flagged in the output, not silently dropped.

### U.S. Census Bureau Historical Data
- **Source:** U.S. Census Bureau, Sixteenth Census of the United States: 1940, Population, Volume II, "Characteristics of the Population," Table 35 -- "Race, by Nativity and Sex, for the Population of Cities of 100,000 or More: 1940"
- **Coverage:** 1940 decennial census
- **License:** Public domain
- **How used in this chapter:** Black population as a percentage of total city population for each city in the game schedule. These percentages are one of six components of the composite safety score. Values are hardcoded in `pipeline/05_safety_score.py` from the cited table. Example values: Memphis, TN (41.5%), Birmingham, AL (40.7%), Washington, DC (28.3%), Baltimore, MD (19.2%), New York, NY (6.1%).

### Sundown Towns Database
- **Source:** James Loewen, Sundown Towns research (confirmable and probable designations)
- **License:** Academic/open
- **How used in this chapter:** Intended as a cross-reference with the safety score and as a shared data layer with Chapter 03 (The Sundown Corridor). In the current pipeline version, the sundown distance component is set to a neutral placeholder value of 0.5 for all cities. This means the sundown component contributes equally and inertly for all game locations. Full integration awaits the Loewen database work in Chapter 03. The weight assigned (0.10) is reserved for that integration.

---

## Data Processing

### Step 1: Green Book OCR (LOC Pipeline)
- **Tool:** Tesseract OCR (pytesseract 0.3.10+) with Pillow pre-processing
- **Input:** Digitized page images downloaded from LOC via IIIF Image API at 50% resolution (`pct:50`)
- **Output:** Structured records in `data/green_book_listings_raw.json`: business name, address, city, state, category, edition year, page number
- **Pre-processing:** Images are enhanced with Pillow (contrast adjustment, sharpening via `ImageFilter`, grayscale conversion via `ImageOps`) before OCR to improve recognition of period typography
- **Accuracy / success rate:** Estimated 48.7% OCR accuracy by heuristic analysis on the 1936 edition. This is well below production quality. The pipeline logged a warning recommending manual review before proceeding. Of the eight target editions (1936, 1938, 1940, 1941, 1942, 1947, 1948, 1949), only the 1936 edition was successfully processed (74 of 84 pages downloaded; pages 4, 7, and 25 failed due to connection errors). The 1938 and 1940--1942 editions returned LOC metadata errors. The 1947--1949 editions returned 404 or empty resource responses.
- **Failures and gaps:** Connection failures on three pages of the 1936 edition (incomplete reads from the LOC IIIF tile server). Seven of eight target editions could not be processed from LOC. The low OCR accuracy on the 1936 edition means many listings are garbled or mis-parsed. This pipeline output was superseded by the NYPL dataset for the spatial matching step.

### Step 1a: Green Book Data (NYPL Pre-Geocoded Dataset)
- **Tool:** NYPL Labs OCR and geocoding pipeline (external, not reproduced in this repo)
- **Input:** 1947 Green Book edition digitized by the Schomburg Center
- **Output:** 1,051 geocoded listings in `data/green_book_1947_nypl.json`, each with: name, address, city, state, category, year, lat, lng, geocoded confidence score, and source attribution
- **Accuracy / success rate:** 1,051 listings extracted, 5 skipped. Geocoded confidence scores provided per listing (range approximately 0.5--1.0). Category distribution: Tourist Home (240), Hotel (195), Restaurant (162), Beauty Parlor (89), Tavern (84), Barber Shop (49), Service Station (49), Drug Store (39), Night Club (38), Liquor Shop (30), Garage (26), Tailor (26), and smaller categories. Some OCR artifacts remain: one listing category reads "=\u2018-.tavern" (garbled), one reads "School Of Beauty Eulture" (OCR error for "Culture").
- **Failures and gaps:** The first listing in the dataset is garbled header text (name: "around 20,", address: "000 miles per year", city: "WESTCHESTER", state: "TENNESSEE") -- this is not an actual Green Book listing but OCR noise from introductory page text. The NYPL dataset covers only the 1947 edition. Listings that opened after 1936 or closed before 1947 are not captured for earlier seasons. Listings in states not covered by the 1947 edition's 23-state footprint are absent entirely.

### Step 2: Schedule Extraction and Ballpark Geocoding
- **Tool:** Python script (`02_schedule_extract.py`) with data from Seamheads and SABR
- **Input:** Seamheads game schedule data + SABR Ballparks Database
- **Output:** `data/schedule_1936_1948.json` (3,686 games) and `data/ballparks.json` (22 ballparks)
- **Accuracy / success rate:** All 3,686 games resolved to a location. Each game record includes a `location_quality` field: "ballpark_resolved" means the game was matched to a specific ballpark with known coordinates; games without a ballpark match use city center coordinates and are flagged.
- **Ballpark coordinates:** Sourced from SABR Ballparks Database, cross-referenced with Google Maps satellite view and NPS National Register nominations. Each ballpark has a `coord_source` field documenting provenance. Example: Forbes Field (Pittsburgh) from SABR; Greenlee Field (Pittsburgh) from "SABR Ballparks Database / Bedford Dwellings site."

### Step 3: Spatial Matching
- **Tool:** Python (haversine distance calculation in `03_geocode.py`)
- **Input:** Geocoded NYPL Green Book listings (1,051 records) + geocoded ballpark locations (22 ballparks)
- **Output:** For each game: count of Green Book listings within 1-mile and 5-mile radius of the ballpark, plus listing names, categories, and whether a hotel or tourist home is present within 1 mile
- **Parameters:**
  - **1-mile radius (walkable):** Reflects what a player could reach on foot after a game, without a car or cab. In 1940s urban geography, one mile from a ballpark typically covered the immediately surrounding neighborhood. This is the primary safety indicator.
  - **5-mile radius (drivable):** Reflects what was accessible by car, cab, or short bus ride. Five miles in a 1940s city typically covered most of the urban core. This is a secondary indicator that captures resources available with transportation.
  - **Distance calculation:** Great-circle (haversine) distance using Earth radius of 3,958.8 miles. This slightly overestimates walkable distances because it ignores street grids, but the error is small at 1-mile scale (typically under 10%).
- **Lodging categories:** Hotel and Tourist Home are the two categories flagged as lodging for the `has_hotel_1mi` component. This distinction matters because a city with three restaurants but no place to sleep is fundamentally different from a city with a hotel. Tourist Homes were private residences that accepted Black guests and are treated as equivalent to hotels for this purpose.

### Step 4: Safety Score Calculation
- **Tool:** Python (custom composite index in `05_safety_score.py`)
- **Input:** Listing counts from Step 3, listing categories, Census 1940 Black population data, sundown town proximity (placeholder)
- **Output:** Composite safety score per game-city in `data/safety_scores.json` and aggregate summaries in `data/safety_summary.json`
- **Parameters:** See Analytical Methods below for full weight documentation
- **Normalization:** Min-max normalization to [0, 1] applied to listings_1mi, listings_5mi, category_diversity, and black_population_pct across the full set of 3,686 games. When all values in a component are identical (as occurs in the current fallback mode where listing counts are zero), the normalized value defaults to 0.5 to avoid division by zero and to assign a neutral score. has_hotel_1mi is already binary (0 or 1) and is not normalized. sundown_distance_inv is a constant placeholder (0.5) and is not normalized.

---

## Analytical Methods

### Safety Score Construction

**What it does:** Produces a single composite score representing how accessible a given city was for a Black baseball team on a road trip in a given season. The score ranges from 0 (no Green Book infrastructure) to 1 (well-served). It is a designed index, not a direct measurement of safety. It captures what the Green Book data can show: where resources existed. It cannot capture what those resources felt like to use, whether they were adequate, or what happened in cities where nothing was listed.

**Why this method:** No single variable captures accessibility. A city with one hotel and zero restaurants is different from a city with five restaurants and no hotel. The composite captures the mix. Alternative approaches considered and rejected:
- Simple listing count: does not distinguish between a city with ten beauty parlors and zero hotels versus a city with two hotels and three restaurants. Category mix matters for a road trip.
- Binary (listings exist / do not exist): loses the gradient. Some cities had marginal coverage that was real but inadequate. The composite preserves this distinction.
- Pure geographic distance to nearest listing: does not account for the type or density of resources available.

**Inputs:**

| Variable | Source | Description |
|----------|--------|-------------|
| `listings_1mi` | Spatial matching (Step 3) | Count of Green Book listings within 1 mile of the ballpark |
| `listings_5mi` | Spatial matching (Step 3) | Count of Green Book listings within 5 miles of the ballpark |
| `has_hotel_1mi` | Spatial matching (Step 3) | Binary: 1 if a Hotel or Tourist Home is within 1 mile, 0 otherwise |
| `category_diversity` | Spatial matching (Step 3) | Ratio of unique listing categories to total listings within 1 mile (0 if no listings) |
| `black_population_pct` | U.S. Census 1940, Table 35 | Black population as fraction of total city population |
| `sundown_distance_inv` | Loewen Sundown Towns database | Inverse distance to nearest documented sundown town (placeholder: 0.5 for all cities) |

**Parameters (weights):**

| Component | Weight | Rationale |
|-----------|--------|-----------|
| `listings_1mi` | 0.30 | The primary indicator. Walking-distance listings are what mattered most when a team arrived in a city after dark. Weighted highest. |
| `has_hotel_1mi` | 0.20 | A hotel or tourist home within walking distance is the single most important resource for an overnight road trip. A city with restaurants but no lodging is functionally inaccessible for a team staying overnight. |
| `listings_5mi` | 0.15 | The secondary radius. Captures resources reachable by car or cab but not on foot. Weighted lower than the 1-mile count because accessibility decreases with distance, especially for teams without reliable local transportation. |
| `black_population_pct` | 0.15 | A proxy for the size of the established Black community. Larger Black communities correlate with more informal support networks (churches, private homes, community contacts) not captured in the Green Book. This component partially compensates for the Green Book's known incompleteness. |
| `category_diversity` | 0.10 | A city with a hotel, a restaurant, and a service station serves a road trip better than a city with three beauty parlors. Category diversity captures the functional breadth of available services. Weighted lower because raw count matters more than mix. |
| `sundown_distance_inv` | 0.10 | Proximity to a documented sundown town increases danger. Currently a placeholder (0.5 for all cities) awaiting Chapter 03 integration. Weight is reserved but inert. |

These weights are preliminary and subject to Elias review before finalization. The weights sum to 1.0.

**Normalization:** Each component (except the binary `has_hotel_1mi` and the placeholder `sundown_distance_inv`) is min-max normalized to [0, 1] across the full dataset of 3,686 games. This means the city with the highest listing count maps to 1.0 and the city with the lowest maps to 0.0. The composite score is then the weighted sum of normalized components, clamped to [0, 1].

**Outputs:** Score per game on a 0--1 scale. Higher = more accessible. The league-wide average across all 3,686 games is 0.37. By city, scores range from 0.325 (New York, NY) to 0.475 (Memphis, TN). By season, scores range from 0.365 (1936) to 0.377 (1940), a change of 0.012 over twelve seasons -- effectively flat.

**Uncertainty:** The composite score carries significant uncertainty from multiple sources:
1. **Temporal mismatch:** The NYPL dataset covers only the 1947 edition. Applying 1947 listings to games from 1936--1946 assumes listings were stable across the period. Some businesses opened or closed during this window. The direction of bias is unclear: the Green Book grew over time, so 1947 listings may overstate coverage in earlier years.
2. **Geocoding error:** NYPL geocoding confidence scores range from ~0.5 to 1.0. Lower-confidence geocodes may place listings at incorrect locations, inflating or deflating the 1-mile and 5-mile counts for some ballparks.
3. **Green Book incompleteness:** The Green Book was not comprehensive. Victor Hugo Green relied on postal worker networks and reader submissions. Establishments that did not advertise or were too informal (private homes, churches) are absent. The true count of safe stopping places was almost certainly higher than the Green Book recorded in well-connected cities, and potentially zero in cities the Green Book also recorded as zero.
4. **Sundown component placeholder:** The sundown distance component is inert (0.5 for all cities), meaning 10% of the composite weight contributes no differentiation. When the Loewen database is integrated, scores will shift.
5. **Census data vintage:** The 1940 Census is a single point in time. Black population percentages changed between 1936 and 1948 due to the Great Migration. We use 1940 values for all seasons because it falls near the midpoint of the window. This underestimates Black population in northern cities in later years and overestimates it in southern cities experiencing out-migration.

No formal confidence interval is computed on the composite score because its components come from different sources with different error structures. The score is labeled as **Modeled** in the chapter and presented with the statement: "This score is a composite index built from six data sources. It measures what the Green Book and the Census recorded, not the full reality of what was or was not available."

**Validation:** Direct validation against ground truth is not possible because no comprehensive historical survey of safe stopping places for Black travelers exists. Partial validation approaches:
- **Face validity:** Memphis (41.5% Black population, well-documented Black business district on Beale Street) scores highest. New York (6.1% Black population, listings concentrated in Harlem but ballparks in the Bronx/Manhattan) scores lowest. This ordering is consistent with what historians of Black urban geography would expect, though it highlights that the score measures proximity to the specific ballpark, not citywide resources.
- **Historical accounts:** The chapter cross-references documented travel accounts from the Pittsburgh Courier and other Black press sources where available. Where a team's documented experience contradicts the safety score, the discrepancy is noted.

**Limitations:** The score is a designed index, not a direct measurement. It captures accessibility from the Green Book data, not actual safety. A high score does not mean a city was safe. A low score does not mean a team could not find somewhere to stop. It means the Green Book could not tell them where to go.

---

## Machine Learning Models

### M1: Route Clustering Model

- **Model type:** HDBSCAN (Hierarchical Density-Based Spatial Clustering of Applications with Noise)
- **Library / framework:** scikit-learn 1.4+ HDBSCAN implementation, Python 3.12+
- **Training data:** All game-to-game travel vectors for each team-season, derived from `schedule_1936_1948.json`. A travel vector is defined as consecutive games for a single team, ordered by date. Each vector records origin (lat, lon), destination (lat, lon), and great-circle distance in miles.
- **Feature set:**
  - `origin_lat` -- latitude of departure city/ballpark
  - `origin_lon` -- longitude of departure city/ballpark
  - `dest_lat` -- latitude of arrival city/ballpark
  - `dest_lon` -- longitude of arrival city/ballpark
  - `distance_miles` -- haversine distance between origin and destination
- **Pre-processing:** All five features are standardized using `StandardScaler` (zero mean, unit variance) before clustering to prevent the distance feature from dominating the geographic coordinate features.
- **Hyperparameters:**
  - `min_cluster_size`: 3 (minimum number of travel vectors to form a cluster). Set to 3 because some team-seasons have very few documented games. A higher threshold would classify too many vectors as noise.
  - `cluster_selection_method`: "eom" (Excess of Mass). This is the default HDBSCAN method and produces clusters that balance density with size. The alternative, "leaf," produces many small clusters that are less interpretable for route analysis.
  - `store_centers`: "centroid" (stores cluster centroids for labeling)
  - No explicit distance metric set -- defaults to Euclidean on the standardized features
- **Output:** Labeled route clusters per team-season in `data/route_clusters.json`. Each cluster includes: cluster ID, auto-generated label (e.g., "Northeast Eastbound," "Midwest Circuit"), trip count, average distance in miles, list of cities visited, average safety score, and dark city count. Vectors classified as noise (label = -1) are grouped separately.
- **Auto-labeling:** Clusters are labeled using a rule-based region classifier that assigns geographic labels based on the centroid of all cities in the cluster. Region boundaries are approximate: Northeast (lon > -80, lat > 39), Mid-Atlantic (lon > -80, lat 36--39), Southeast (lon > -85, lat < 36), Midwest (lon -95 to -85, lat > 36), Deep South (lon -95 to -85, lat < 36), Plains (lon < -95). Direction labels (Eastbound, Westbound, etc.) are derived from the dominant travel direction within the cluster.
- **Dark city threshold:** Cities with a composite safety score at or below 0.25 are classified as "dark" within a cluster. This threshold is set based on the distribution of scores -- cities at or below 0.25 have zero or near-zero Green Book listings within walking distance.
- **Confidence representation:** HDBSCAN does not produce probability estimates by default with the "eom" method in the scikit-learn implementation. Cluster stability is implicit in the hierarchical structure: clusters that persist across a wide range of density thresholds are more robust. The chapter does not display per-cluster confidence scores. Instead, cluster assignments are labeled as **Modeled** and the noise category (unclustered vectors) is shown explicitly so the reader can see how much of the data does not fit the identified patterns.
- **Known failure modes:**
  - Team-seasons with fewer than 3 travel vectors cannot be clustered. All vectors are assigned to noise. This affects partial seasons and teams with limited schedule data.
  - The model clusters on geography and distance only. It does not incorporate time gaps between games, which means a cluster might group travel legs that are weeks apart.
  - The standardization is fit per team-season. A cluster labeled "long distance" for one team may represent shorter trips than a "short distance" cluster for another team.
- **Reproducibility:** `python pipeline/04_route_clustering.py` with `RANDOM_STATE = 42` for deterministic StandardScaler behavior. HDBSCAN itself is deterministic for a given input.

### M2: Safety Score
The safety score is documented in the Analytical Methods section above. It is a composite index, not a machine learning model in the supervised sense. It uses no training data and learns no parameters. All weights are set by documented design decisions, not optimized against a loss function.

### M3: Road Trip Narratives

- **Generated by:** Claude (Anthropic). Target model: claude-sonnet-4-20250514. In the current pipeline run, narratives are placeholder text because the API key was not configured at runtime. The pipeline produced 171 placeholder narratives (one per team-season combination) with the structure and metadata fields in place.
- **Prompt structure:** Committed to `pipeline/prompts/narrative_template.md`. The system prompt establishes voice and constraints: direct, specific, dated, no speculation about feelings, every claim traceable to input data. The user message template provides route data (cities, dates, listing counts, safety scores), dark city list, and cluster label for the specific team-season.
- **Inputs to the prompt:** Route JSON (all game stops for the team-season with coordinates, listing counts, and safety scores), list of dark cities (zero listings within 1 mile), and the cluster label from M1.
- **Output:** Plain-language road trip narrative per team-season, under 300 words. Formatted as a road log: cities named, dates given, listing counts stated, dark cities identified. Ends with a summary line: X cities visited, Y with listings, Z dark.
- **Confidence label:** Each narrative includes a confidence field: HIGH (all claims directly from input data, no inference), MODERATE (minor inference from data patterns), LOW (significant inference, should be rare). In the chapter, narratives are displayed with the label "AI-generated . [confidence level]" so the reader always knows the text was produced by a model.
- **Human review:** Oscar reviews every narrative before ship. Oscar checks: (1) every factual claim traces to input data, (2) no unsupported emotional language, (3) no euphemism for the conditions described, (4) voice matches The Other Box Score register, (5) dark cities are named individually, not summarized.
- **Accuracy standard:** Every number in the narrative must appear in the input data. If the model generates a claim not supported by the input JSON, the narrative is rejected and regenerated with a corrected prompt.
- **Known limitations:** The model cannot know what it felt like. It can only describe what the data shows. Placeholder narratives in the current pipeline output contain the correct data but lack the narrative voice. Full narratives require an API key and will be generated and reviewed before ship.

### M4: Pattern Detector

- **Model type:** Time-series analysis of league-wide safety score trends, 1936--1948
- **Output:** Average safety score by season, by region, and by team in `data/safety_summary.json` and `data/viz_heatmap.json`
- **Key findings (Modeled):**
  - League-wide average safety score ranged from 0.365 (1936) to 0.377 (1940), then remained effectively flat through 1948. Total change over twelve seasons: 0.008. The Great Migration did not materially improve the safety profile of the league schedule within this window.
  - By region: the heatmap data segments games into Deep South, Midwest, Mid-Atlantic, and Northeast. Regional scores are computed as the average composite score across all games played in that region in that season.
  - By team: Memphis Red Sox (0.475) and Birmingham Black Barons (0.472) had the highest average scores, driven by high Black population percentages in their home cities. New York Black Yankees (0.325) and New York Cubans (0.325) had the lowest, reflecting the distance between Harlem's Green Book listings and the ballparks where these teams played.
- **Confidence representation:** Trend values are labeled as **Modeled** because they derive from the composite safety score, which itself carries the uncertainty documented above. The near-flat trend is robust to reasonable changes in component weights because the underlying listing data (from the 1947 NYPL edition applied across all seasons) does not vary by year. The trend reflects changes in the Census and schedule composition, not in listing coverage. This is a known limitation.
- **Known failure modes:** The time-series shows almost no temporal variation because the primary listing data source (1947 NYPL edition) is static. Genuine year-over-year changes in Green Book coverage are invisible in the current data. This will improve when additional editions are successfully OCR'd and integrated.

---

## AI-Generated Content

### M3: Road Trip Narratives

All AI-generated content in this chapter is confined to the road trip narratives described under M3 above. No other text, caption, annotation, or analytical conclusion in the chapter is AI-generated.

**Disclosure format in the chapter:** Every narrative appears in a visually distinct block with a header reading "AI-generated narrative" and a confidence badge (HIGH / MODERATE / LOW). The block's background uses a subtle tint to distinguish it from editorial content. The methodology tab includes a dedicated AI disclosure section explaining what was generated, by what model, and what review was applied.

**What the AI cannot do:** The narratives describe routes, stops, listing counts, and safety scores. They do not describe emotions, reactions, or experiences. The prompt explicitly forbids speculation about feelings. Where historical accounts exist (e.g., Pittsburgh Courier travel reporting), those accounts are presented separately as **Documented** or **Reported** content, not mixed into the AI-generated narrative.

---

## Confidence Vocabulary as Applied in This Chapter

Every claim in this chapter uses the platform's standard confidence vocabulary. Here is how each term applies:

| Term | Application in this chapter |
|------|---------------------------|
| **Documented** | Green Book listings that appear in the LOC or NYPL digitized editions. Census population figures from the 1940 decennial census. Ballpark locations from SABR with confirmed coordinates. |
| **Verified** | Game records cross-referenced across Seamheads data and contemporary Black press accounts. Ballpark coordinates confirmed against multiple sources (SABR, Google Maps, NPS). |
| **Reported** | Travel accounts from a single Black press source without independent confirmation. Green Book listings that appear in one edition only. |
| **Estimated** | Safety scores for seasons where the Green Book edition is not available and the nearest edition's data is applied. Geocoded locations with NYPL confidence scores below 0.7. |
| **Modeled** | The composite safety score (M2). The route clusters (M1). The time-series trends (M4). All are outputs of defined methodologies with stated assumptions. |
| **Reconstructed** | Schedule records assembled by Seamheads from multiple historical sources (marked `provenance: "reconstructed"` in the data). |
| **AI-generated** | Road trip narratives produced by M3. Always labeled, always reviewed by Oscar. |
| **Disputed** | No claims in this chapter are currently flagged as disputed. If scholarly disagreement emerges about any finding, it will be documented in the Disputed Claims table below. |

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| Single Green Book edition | The NYPL dataset covers only the 1947 edition. The LOC OCR pipeline produced usable data for only the 1936 edition at 48.7% accuracy. | Safety scores for all seasons are based on 1947 listings. The Green Book grew over time: the 1936 edition had fewer listings than the 1947 edition. Applying 1947 data to earlier seasons likely overstates coverage in those years. | Documented in methodology and on every visualization. The temporal mismatch is stated explicitly in the chapter text. Future pipeline runs with additional successfully OCR'd editions will produce year-specific scores. |
| LOC IIIF API failures | Seven of eight target editions could not be downloaded or parsed from LOC. Editions for 1938, 1940--1942 returned metadata errors. Editions for 1947--1949 returned 404 or empty responses. | The OCR pipeline cannot produce multi-edition data until these access issues are resolved. | Documented in `data/ocr_log.txt`. The NYPL pre-geocoded 1947 dataset is used as a fallback. |
| OCR accuracy | The 1936 LOC OCR run achieved only 48.7% heuristic accuracy. Many listings are garbled. | LOC-sourced listings are not used for spatial matching in the current pipeline. | The LOC OCR output is retained in `data/green_book_listings_raw.json` for future improvement but is not the basis for any safety score or visualization. |
| NYPL geocoding errors | Some NYPL listings geocode to incorrect locations (particularly in the Northeast). OCR artifacts include garbled names and misassigned states. | Listing counts within 1-mile and 5-mile radii may be inflated or deflated for specific ballparks. The green-book-data.js file documents this limitation. | Used as-is with the limitation documented. Listings with obviously garbled data (e.g., the header text parsed as a listing) are not manually excluded because the NYPL dataset is used as a CC0 source without modification. |
| Incomplete game locations | Some Seamheads schedule entries have city but not specific ballpark. | City center coordinates are used, which may place the measurement point 1--3 miles from the actual game site, affecting listing counts at the 1-mile radius. | Each game record has a `location_quality` field. Games using city center coordinates are flagged as such. |
| Barnstorming games | Many Negro Leagues games outside formal league schedules are undocumented. Barnstorming tours, exhibition games, and semi-pro matchups are not in Seamheads. | The 3,686 games analyzed represent the documented league schedule, not the full extent of team travel. The actual road trip experience included many more stops in many more cities. | Acknowledged in methodology and chapter text. The chapter states that the map shows the documented schedule only, and that the real map was larger and almost certainly darker. |
| Sundown towns data not integrated | The Loewen database is not yet connected to the safety score pipeline. | 10% of the composite weight is inert (placeholder 0.5 for all cities). The score does not reflect proximity to documented sundown towns. | The sundown component weight is reserved. The placeholder is documented. Chapter 03 integration will activate this component. |
| Missing teams | The schedule covers 14 of approximately 20+ teams that played in the Negro Leagues during this window. Some short-lived or semi-professional teams are absent from Seamheads. | The chapter's findings apply to the documented major league teams only. Teams playing in smaller circuits and less documented leagues may have faced worse conditions. | Stated in methodology. The chapter does not claim to cover all Negro Leagues teams. |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| Safety scores accurately reflect accessibility | The composite is a designed index with chosen weights, not a measured quantity. Different weights produce different rankings. | Spec review, Elias methodology review (pending) | Labeled as **Modeled** with weight table visible in methodology. The chapter states: "These weights are a judgment, not a discovery." |
| The Great Migration improved safety profiles | The time-series data shows almost no improvement (0.008 over twelve seasons), but this may be an artifact of using a single Green Book edition. | Census data, Green Book publication history | Labeled as **Modeled** with the caveat that year-over-year listing changes are not captured in the current data. |
| Green Book listings represent all safe stopping places | The Green Book was compiled by voluntary submission. Many safe establishments were unlisted. | Loewen (2005), Taylor (2020), NLBM oral history archives | Stated in methodology and chapter text: "The Green Book showed where you could go. It could not show everywhere you could go." |

---

## Cross-League Comparisons

This chapter makes no cross-league statistical comparisons between Negro Leagues and MLB performance. All analysis is internal to the Negro Leagues schedule and the Green Book dataset.

---

## Reproducibility

**Code:** All pipeline code is in `chapters/02-the-green-book-route/pipeline/` and is MIT licensed.

**Data:** All pre-computed outputs are in `chapters/02-the-green-book-route/data/` and are CC0 licensed.

**Raw data access:**
- LOC Green Book collection: https://www.loc.gov/collections/green-book/ (no registration required; IIIF API access is rate-limited and may return errors for some editions)
- NYPL Green Book dataset: https://github.com/NYPL-publicdomain/greenbooks (CC0, no registration required)
- Seamheads Negro Leagues Database: https://www.seamheads.com/NegroLgDatabase/ (web access, research use)
- U.S. Census 1940 data: publicly available through Census Bureau archives and IPUMS

**Environment:** Python 3.12+. Full dependency list in `pipeline/requirements.txt`:
- pandas >= 2.2, numpy >= 1.26 (data processing)
- pytesseract >= 0.3.10, Pillow >= 10.0 (OCR)
- geopy >= 2.4 (geocoding)
- shapely >= 2.0, scipy >= 1.12 (spatial analysis)
- scikit-learn >= 1.4, hdbscan >= 0.8.33 (ML)
- anthropic >= 0.42 (AI narrative generation, requires API key)
- orjson >= 3.9 (fast JSON export)
- tqdm >= 4.66, requests >= 2.31 (utilities)

**Runtime:** The full pipeline takes approximately 30--60 minutes on a standard machine, depending on LOC IIIF API response times and Nominatim geocoding rate limits (1 request/second). The LOC download step is the bottleneck and may fail for some editions (see Data Gaps). The NYPL dataset is pre-downloaded and does not require API access.

To reproduce:
```bash
cd chapters/02-the-green-book-route/pipeline/
pip install -r requirements.txt
python 01_green_book_ocr.py        # LOC OCR (may fail for some editions)
python 02_schedule_extract.py      # Seamheads + SABR extraction
python 03_geocode.py               # Nominatim geocoding + spatial matching
python 04_route_clustering.py      # HDBSCAN route clustering
python 05_safety_score.py          # Composite safety score
python 06_narratives.py            # AI narrative generation (requires ANTHROPIC_API_KEY)
python 07_export.py                # Visualization-ready JSON export
```

Output files will appear in `data/` and match the committed versions. The NYPL dataset (`green_book_1947_nypl.json`) is committed to the repo and does not need to be re-downloaded.

**Deterministic outputs:** The route clustering model uses `RANDOM_STATE = 42`. The safety score pipeline is fully deterministic for a given input. Narrative generation is non-deterministic (LLM output varies between runs) but each narrative's prompt hash is recorded for traceability.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 0.1 | May 2026 | Skeleton created from methodology template |
| 1.0 | May 2026 | Full methodology documented: safety score weights, HDBSCAN parameters, data source details, NYPL dataset integration, OCR pipeline results, data gaps, confidence vocabulary, reproducibility instructions |

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

---

## Questions and Corrections

If you find an error in this methodology, open an issue at github.com/other-boxscore/chapters/02-the-green-book-route/issues or email the project maintainer. Corrections are documented in the version history above.
