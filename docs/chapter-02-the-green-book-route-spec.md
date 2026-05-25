# The Other Box Score -- Chapter 02
## The Green Book Route · Full Specification v1.0

**Series:** theotherboxscore.org
**URL:** theotherboxscore.org/chapters/the-green-book-route/
**GitHub:** other-boxscore/chapters/02-the-green-book-route/
**Part:** One -- The world they played in
**Position:** Chapter 02 of 15
**License:** MIT (code) · CC0 (data)
**Status:** SPEC COMPLETE
**Last updated:** May 2026

---

## Connective Tissue In

From The Color Line (Chapter 01), closing paragraph:

*"The statistics are corrected. The leaderboard is honest. The barrier is drawn and dated. What this chapter cannot show you is what happened outside the stadium -- the towns between the games, the routes chosen not for distance but for survival, the cities where the Green Book had no listings and the team drove through without stopping. The next chapter is that silence, mapped."*

---

## The Hook

**Have you heard of the Negro Motorist Green Book?**

Victor Hugo Green was a postal worker in Harlem. Starting in 1936 he published a guidebook every year -- a list of hotels, restaurants, barber shops, and private homes across the country where Black travelers could stop without being turned away, arrested, or killed. He called it the Green Book. Negro Leagues teams carried it on every road trip.

Some cities had twenty listings. Some had two. Some had none.

The teams played in all of them.

---

## The Thesis

The Negro Leagues schedule data and the Green Book listing data have never been combined. When they are, a map emerges that has never existed before: every road trip, every stop, every city where a team pulled in for a game -- and exactly how many safe places to eat and sleep were available within reach of the ballpark.

The cities with no listings do not disappear from the map. They go dark.

The darkness is the argument.

---

## The Original Finding

No researcher, data journalist, or historian has assembled this dataset. The Green Book archives are digitized at the Library of Congress. The Seamheads schedule data covers every documented Negro Leagues game. The geographic overlay -- Green Book listings mapped against game locations, season by season, team by team -- does not exist anywhere. This chapter builds it and makes it public under CC0.

The finding that will emerge: the density of safe stops was not random. It tracked the Great Migration -- cities with larger established Black communities had more listings. Teams scheduled in the South and in smaller Midwestern cities were routinely playing in cities with zero or one Green Book listing within walking distance of the ballpark. The route was not just a baseball schedule. It was a survival calculation made by someone -- a manager, an owner, a bus driver -- before every road trip.

---

## Scope

**Teams:** All documented Negro Leagues major league teams, 1936-1948.
1936 is the first year of Green Book publication. 1948 is the last full season before the NNL folded. This window gives twelve seasons of complete overlap between the two datasets.

**Games:** All documented home and away games from Seamheads for the covered teams and seasons. Estimated 4,000-6,000 game-location data points.

**Green Book editions:** 1936, 1938, 1940, 1941, 1942, 1947, 1948, 1949 editions are fully digitized at LOC. Additional years available through ProQuest. Target: all available editions within the 1936-1948 window.

**Geographic radius:** Green Book listings within 1 mile of each documented ballpark location. Secondary ring at 5 miles. The 1-mile radius reflects what was walkable or accessible by foot after a game. The 5-mile ring reflects what was accessible by car or cab.

---

## Data Sources

| Source | Coverage | License | Notes |
|--------|----------|---------|-------|
| Negro Motorist Green Book (LOC digitized) | 1936-1966 | Public domain | Multiple editions. Address-level data requires OCR and geocoding. |
| Seamheads Negro Leagues Database | 1900-1948 | Research use | Game-level schedule data including locations |
| SABR Ballparks Database | All eras | Research use | Ballpark addresses and coordinates |
| OpenStreetMap / Nominatim | Current | ODbL | Geocoding historical addresses |
| Census Bureau historical data | 1930-1950 | Public domain | Black population by city -- context layer |
| Sundown Towns Database (Loewen) | 1890-1970 | Academic/open | Cross-reference with Ch. 03 |

**Data pipeline:**

1. OCR the Green Book editions using AWS Textract or Tesseract with custom post-processing for period typography and address formats
2. Extract business name, address, city, state, and category (hotel, restaurant, tavern, beauty shop, etc.) for each listing
3. Geocode all extracted addresses using Nominatim with historical address validation
4. Pull Seamheads game schedule data -- date, home team, away team, city, ballpark
5. Geocode all ballpark locations from SABR Ballparks Database
6. For each game, calculate Green Book listings within 1-mile and 5-mile radius
7. Output as pre-computed JSON: one record per game with listing count, listing names, and coordinates

**Known gaps:**
- Green Book editions for some years within the window may be incomplete or unavailable
- Some Seamheads schedule entries have city but not specific ballpark -- these use city center coordinates with a documented flag
- Geocoding success rate for 1930s-1940s addresses will not be 100% -- all failed geocodes are documented

---

## ML and AI Components

**M1: The Route Clustering Model**
Unsupervised clustering (HDBSCAN) over all game-to-game travel vectors to identify the recurring road trip circuits used by each team. The model surfaces the structural patterns in the schedule -- the teams that routinely played through safe corridors vs. the teams whose circuits took them repeatedly through dark stretches. Output: labeled route clusters with safety profiles.

**M2: The Safety Score**
For each city-season combination, a composite safety score derived from: Green Book listing count within 1 mile, listing count within 5 miles, listing category mix (a hotel matters more than a beauty shop for an overnight road trip), city Black population from Census data, and proximity to documented sundown towns from the Loewen database. The safety score is a designed index, not a single-variable measure. It is documented as such with all component weights stated.

**M3: The Narrative Generator**
For each team-season combination, an AI-generated road trip narrative that synthesizes: the route taken, the safety scores of each stop, any documented historical accounts of the team's travel experience in those cities, and the game results. The narrative is labeled as AI-generated, includes its confidence level, and cites its sources. It reads like a road log -- specific, grounded, dated. Not "the team faced hardship" but "the Kansas City Monarchs left Cleveland on the morning of July 14, 1941, with three games in six days across cities where the combined Green Book listings totaled four."

**M4: The Pattern Detector**
A time-series analysis of how the safety profile of the league-wide schedule changed between 1936 and 1948. Did the situation improve as the Great Migration added Black communities to more cities? Did certain franchises consistently schedule safer circuits than others? Did the safety profile differ by league (NNL vs. NAL)? The model answers these questions with documented uncertainty.

---

## Visualization Design

### Fig 01 -- The Route Animation

**What it shows:** A single team's road trip for a single season, animated city to city in chronological sequence.

**How it works:**
- Map of the continental US, dark background, city dots in --vellum at low opacity
- The team's bus route draws itself as a line, stop to stop, at a pace the reader can follow
- Each city lights as the team arrives
- Green Book listings within 1 mile appear as small amber dots radiating outward from the ballpark location
- Cities with zero listings pulse once in --oxblood and go dark
- A counter in the corner tracks: cities visited, cities with at least one listing, cities with none
- The reader can select any team and any season from a dropdown

**The "oh wow" moment candidate:** The first time a city goes dark. The pulse of --oxblood and then nothing. The counter ticking up on the "zero listings" side.

**Controls:** Play/pause, speed (0.5x, 1x, 2x), team selector, season selector. Defaults to the Kansas City Monarchs, 1942 -- the most documented season for the most documented team.

**Why 1942:** The Monarchs' 1942 season is exceptionally well-documented in the Seamheads data and in contemporary Courier coverage. It includes travel through Missouri, Illinois, Indiana, and Ohio -- a mix of large cities with strong listings and smaller cities with none. It is the best proof-of-concept season for the animation.

### Fig 02 -- The League Map

**What it shows:** All teams, all seasons (1936-1948), simultaneously. The aggregate picture.

**How it works:**
- Same base map as Fig 01
- Each city that hosted a Negro Leagues game in the 1936-1948 window appears as a dot
- Dot size encodes total games hosted across the full period
- Dot color encodes average safety score: amber (well-covered) through a gradient to --oxblood (zero or near-zero listings)
- A year slider allows the reader to move through the period and watch the coverage change
- Hovering a city shows: city name, total games hosted, average listing count, listing names for the selected year

**The pattern that emerges:** The Northeast corridor is relatively well-covered. The Midwest is mixed. The South -- where some teams barnstormed -- has the most dark cities. The year slider shows the map slowly getting lighter in some regions as the Great Migration adds communities. Not everywhere. Not fast enough.

### Fig 03 -- The Heat Map Conclusion

**What it shows:** The full safety score distribution across the league schedule, visualized as a heat map by region and season.

**How it works:**
- US map divided into regions
- Heat map intensity encodes average safety score for games played in that region in that season
- Dark is dangerous. Light is covered. The map is mostly dark.
- Below the map: a simple bar chart showing the league-wide average safety score by season, 1936-1948. The trend line. Whether it improved. The answer.

**The closing argument:** This is the last visualization the reader sees. It is the structural version of the individual route in Fig 01. The individual route made it human. The heat map makes it systematic. The systematic version is the one that cannot be explained away as individual bad luck or isolated incidents. This is what the schedule looked like. This is what they drove through every season for twelve years.

### Fig 04 -- The Green Book Itself

**What it shows:** A curated selection of actual Green Book listings relevant to the chapter, displayed in the aesthetic of the original publication.

**How it works:**
- A small section -- not a full visualization, an editorial moment
- Facsimile-style display of selected pages from the digitized LOC editions (public domain)
- Annotations in Space Mono pointing to specific listings that appear in the route data
- "This listing on page 14 of the 1941 Green Book is the hotel the Homestead Grays used in Pittsburgh. It appears in the route data 23 times between 1938 and 1946."
- The Green Book is not just data. It was a lifeline. This section makes that visible.

**Note for Oscar:** All facsimile pages used must be from editions with confirmed public domain status. LOC holds fully digitized PD copies of multiple editions. Usage must be limited to the display of the actual historical document as a historical artifact, not reproduced in a way that recreates or replaces the original work.

---

## Content Sections

### The Hook Section

Opens with the "Have you heard of the Negro Motorist Green Book?" hook. Two paragraphs on Victor Hugo Green, the purpose of the guide, and what it meant for Black travelers. One paragraph specifically on Negro Leagues teams -- that they carried it, that it shaped their routes, that the absence of listings in a city was not an inconvenience but a danger assessment.

Source requirement: primary documentation of Negro Leagues teams using the Green Book. The SABR article "Big Problems and Simple Answers" documents the travel conditions explicitly. The Score.com feature on the Pope Hotel in Erie documents Green Book stops on actual team routes. Both are citable.

### The Data Section

Plain language explanation of the two datasets, how they were combined, and what the combination shows. Written for a NLBM curator. Includes: what the Green Book was, what Seamheads is, how the geocoding works, what the safety score measures, where the gaps are.

### The Route Section (Fig 01)

Introduces the animation with a brief editorial setup: "Pick a team. Pick a season. Watch where they went and what was there when they arrived." The controls are self-explanatory. The data does the work.

### The League Section (Fig 02)

Introduces the aggregate map with: "Now zoom out. This is not one team's season. This is every team, every season, twelve years of the league's schedule overlaid with twelve years of the Green Book." Brief annotation of the pattern before the reader explores.

### The Conclusion Section (Fig 03)

The heat map with a short editorial conclusion -- the only section where the chapter speaks directly about what the data means rather than presenting it for the reader to interpret. Two paragraphs. Specific. Grounded in the numbers.

Draft conclusion:

*"Between 1936 and 1948, Negro Leagues teams played approximately [N] games in cities where the Green Book listed zero establishments within one mile of the ballpark. In [X]% of those cities, there was no documented hotel that would accept Black guests within five miles. The teams played anyway. They found somewhere to sleep. Someone's house, someone's church, the bus itself. The schedule did not accommodate the reality of the road. The men on the bus did."*

All bracketed figures to be populated from the data pipeline output before the section is written. The conclusion is data-driven, not estimated.

### The Green Book Section (Fig 04)

Brief editorial introduction to the facsimile display. Then the pages. Then the annotations. Closes with:

*"Victor Hugo Green stopped publishing the Green Book in 1966. He wrote in the final edition that he hoped the day would come when the guide would no longer be necessary. It took the Civil Rights Act of 1964 to make it obsolete. The Negro Leagues were already gone by then."*

Source: Green Book final edition, 1966, LOC digitized copy.

---

## The "Oh Wow" Moment

**Primary candidate:** The first dark city in the route animation. The moment when a city pulses --oxblood and goes dark while the counter ticks up. Every agent should feel this independently without being told to look for it.

**Secondary candidate:** The heat map conclusion -- the moment the reader realizes the map is mostly dark even in the best years. That the situation improved only slightly between 1936 and 1948. That twelve years of the Great Migration and twelve years of the Green Book's expansion still left most of the schedule underserved.

**Oh wow test expectation:** The dark city pulse in Fig 01 should be identified by at least three of five agents unprompted. If it is not, the animation timing and visual treatment need adjustment before ship.

---

## Methodology Requirements

**METHODOLOGY.md must document:**

1. Green Book OCR pipeline -- tool, accuracy rate, validation approach
2. Geocoding methodology -- tool, success rate, failure handling, historical address validation
3. Safety score construction -- all component variables, weights, rationale
4. Radius definition -- why 1 mile and 5 miles, what those distances meant in 1940s urban geography
5. Gap documentation -- which Green Book editions are missing, which game locations could not be geocoded, how gaps affect the analysis
6. Cluster methodology for M1 (HDBSCAN parameters, distance metric)
7. AI narrative generation methodology for M3 -- model, prompt structure, confidence labeling, human review process
8. All data sources with license and access date

---

## Asset Requirements

**For Oscar's review before build begins:**

Photographs needed:
- A photograph of a Green Book edition cover (LOC, public domain, multiple options available)
- A photograph of a Negro Leagues team bus (public domain -- several documented LOC options)
- Optionally: a photograph of a Green Book-listed establishment from the period

Facsimile pages:
- Selected interior pages from the 1941 or 1942 Green Book edition for Fig 04
- Must be from a confirmed PD edition
- Usage is display of historical document as artifact -- not reproduction for commercial or functional replacement of the original

Map base:
- No commercial map tiles -- OpenStreetMap with appropriate ODbL attribution
- Historical road data where available from LOC or USGS for period-accurate routing

**Asset register entries required before build begins.**

---

## Citation Block

```
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
```

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Map | Mapbox GL JS | Dark base style matching platform aesthetic |
| Route animation | Mapbox GL JS + D3 | Line drawing and city pulse effects |
| Heat map | Mapbox GL JS choropleth | Regional safety score encoding |
| Data | Pre-computed JSON | One file per team-season for route animation, one aggregate file for league map |
| OCR pipeline | AWS Textract | Green Book address extraction |
| Geocoding | Nominatim + OpenStreetMap | Historical address resolution |
| ML | Python -- HDBSCAN, custom safety score, GPT-4 via API for M3 | Offline pipeline, outputs committed as JSON |
| AI narratives | Claude API | M3 narrative generation with confidence labels |
| Frontend | Vanilla HTML/CSS/JS | Consistent with Chapter 01 |

---

## Build Sequence

| Phase | Deliverable | Gate |
|-------|-------------|------|
| 1 | Green Book OCR and geocoding pipeline | Geocoding success rate documented, gaps inventoried |
| 2 | Seamheads schedule data extraction and ballpark geocoding | All game locations resolved or flagged |
| 3 | Safety score calculation and pre-computed JSON output | Elias reviews methodology and output distribution |
| 4 | M1 Route clustering | Clusters reviewed for historical plausibility by Oscar |
| 5 | M3 AI narrative generation | Sample narratives reviewed by Oscar for accuracy and voice |
| 6 | M4 Pattern detection | Time-series output reviewed by Elias |
| 7 | Fig 01 Route animation | Oh wow test conducted on dark city pulse |
| 8 | Fig 02 League map | Vera reviews at 375px, 768px, 1200px |
| 9 | Fig 03 Heat map conclusion | Elias verifies color encoding matches safety score distribution |
| 10 | Fig 04 Green Book facsimile | Oscar verifies PD status of all displayed pages |
| 11 | Content sections written | Oscar reviews all narrative claims and citations |
| 12 | METHODOLOGY.md complete | Elias and Oscar both approve |
| 13 | Citation block added | Gates verifies |
| 14 | Full agent review | Oh wow test, all five verdicts, Gates merge |

---

## Connective Tissue Out

Closing paragraph from The Green Book Route to The Sundown Corridor (Chapter 03):

*"The Green Book showed where they could stop. It could not show what happened when the bus did not stop -- when the route took them through a town after dark where Black travelers were not permitted, where the sign at the city limits said so, where the sheriff's department enforced it. The next chapter is those towns. There were thousands of them. Some of them were within miles of the ballparks on this map."*

---

## Spec Gate Checklist

Before build begins, all of the following must be confirmed:

- [ ] Oscar has reviewed the asset list and issued preliminary approval
- [ ] Green Book editions to be used are confirmed as public domain with LOC documentation
- [ ] Seamheads data access is confirmed
- [ ] Safety score methodology is reviewed and approved by Elias
- [ ] The "oh wow" moment (dark city pulse) is documented in the spec
- [ ] Original finding is documented and confirmed as original
- [ ] Connective tissue in (from Ch. 01) is in place
- [ ] Connective tissue out (to Ch. 03) is drafted
- [ ] Citation block format is confirmed
- [ ] METHODOLOGY.md outline is approved
- [ ] Mapbox GL JS license confirmed for non-commercial open-source use
- [ ] OpenStreetMap ODbL attribution plan documented

---

## What This Chapter Cannot Do

It cannot show what it felt like. The data shows the absence of listings. It does not show the fear of driving through a sundown town at midnight, the conversation about whether to stop for gas, the decision to keep driving rather than risk it. The chapter acknowledges this limit explicitly in the methodology section.

That is the job of The Voice (Chapter 13), which collects the testimony of people who were there.

This chapter shows the structure. The Voice shows what it was like to live inside it.

---

*They drove through the dark. We mapped it. Now you know where the dark was.*
