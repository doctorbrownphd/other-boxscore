# The Other Box Score -- Chapter 03
## The Sundown Corridor · Full Specification v1.0

**Series:** theotherboxscore.org
**URL:** theotherboxscore.org/chapters/the-sundown-corridor/
**GitHub:** other-boxscore/chapters/03-the-sundown-corridor/
**Part:** One -- The world they played in
**Position:** Chapter 03 of 15
**License:** MIT (code) · CC0 (data)
**Status:** SPEC COMPLETE
**Last updated:** May 2026

---

## Connective Tissue In

From The Green Book Route (Chapter 02):

*"The Green Book showed where they could stop. It could not show what happened when the bus did not stop -- when the route took them through a town after dark where Black travelers were not permitted, where the sign at the city limits said so, where the sheriff's department enforced it. The next chapter is those towns. There were thousands of them. Some of them were within miles of the ballparks on this map."*

---

## The Hook

**Have you heard of Fred Goree?**

Fred Goree played outfield for the Kansas City Monarchs in the early 1940s. On a road trip through Illinois, the team bus entered a sundown town after dark. Goree learned what sundown towns did to enforce their rules. He survived. Not everyone who made that mistake did. His story is documented. It is not unique. It happened to players on every Negro Leagues team, in every season, in towns that had made their policy explicit with signs at the city limits.

The signs read: *"Nigger, Don't Let The Sun Go Down On You In [town name]."*

The towns were not in the South. Seventy percent of documented sundown towns in Illinois alone -- the state with the most thorough research -- were in the North. The Negro Leagues played in the North. The Green Book tried to help. The Green Book was not enough.

---

## The Thesis

A peer-reviewed dataset of 2,248 documented historical sundown places, geocoded and linked to US Census geographies, has never been combined with Negro Leagues schedule data. When it is, a map emerges that shows something nobody has visualized before: for every game the Negro Leagues played between 1936 and 1948, the density and proximity of documented sundown towns along the route to get there.

The chapter operates on two levels simultaneously:

**The aggregate level:** How many documented sundown towns did Negro Leagues teams pass through on the way to their games? Which routes were most dangerous? Which circuits were safest? Which teams faced the most concentrated sundown corridor exposure?

**The individual level:** Specific documented sundown towns adjacent to specific Negro Leagues ballparks and routes. Named towns. Named incidents where documentation exists. The geography of danger made specific.

The data cannot capture all of it. The database is incomplete by its own documentation -- there are too many sundown towns for researchers to have found them all. The chapter says so explicitly: what is shown here is documented. The actual danger was worse. That is itself a finding.

---

## The Original Finding

The combination of the Scientific Data (Nature, 2025) geocoded sundown towns dataset with the Seamheads Negro Leagues schedule data does not exist anywhere. The resulting overlay -- showing the proximity and density of documented sundown towns to every Negro Leagues game location and travel corridor -- is original work.

The finding: Negro Leagues teams did not travel through sundown country occasionally. They traveled through it constantly, systematically, as a structural feature of their schedule. The danger was not incidental to playing professional baseball as a Black man in America between 1920 and 1948. The danger was the commute.

---

## The Critical Methodological Note

This chapter carries a prominently displayed methodological caveat that Oscar and Elias both approve before anything ships:

*"This map shows documented sundown towns. The database of documented sundown towns is incomplete. Researchers estimate that Illinois alone had more than 500 sundown towns -- 70% of all towns in the state. Not all have been documented. What this map shows is the floor of the danger, not its ceiling. The actual sundown corridor was wider, denser, and more continuous than any database can capture. Every dark area on this map may contain towns not yet documented. The absence of a marker does not mean a town was safe."*

This caveat is not fine print. It is part of the chapter's argument. The incompleteness of the data makes the case stronger: even the documented record is damning. The full record would be worse.

---

## Data Sources

| Source | Coverage | License | Notes |
|--------|----------|---------|-------|
| Historical Sundown Towns Linked to US Census Geographies | 2,248 documented places | Academic open access (CC-BY) | Published Scientific Data, Nature, January 2025. Geocoded, evidence-rated. |
| Loewen/Berrey Sundown Towns Database | Full crowdsourced database | Academic research use | Hosted at justice.tougaloo.edu. Primary source for the Scientific Data dataset. |
| Seamheads Negro Leagues Database | 1920-1948 schedules | Research use | Game-level data including locations -- already assembled from Ch. 02 |
| SABR Ballparks Database | All eras | Research use | Ballpark coordinates -- already geocoded from Ch. 02 |
| Historical US road network | 1920-1950 | Public domain | USGS and LOC historical road maps for period-accurate routing |
| US Census historical data | 1920-1950 | Public domain | Black population by place -- context layer for corridor analysis |
| NAACP anti-lynching records | 1882-1968 | Public domain | Documented incidents for specific case study towns |
| FBI historical records | 1935-1955 | FOIA/public domain | Select documented incidents in sundown corridor towns |

**Evidence quality tiers from the Scientific Data dataset:**

The 2025 dataset assigns evidence quality ratings to each sundown place:
- **Confirmed:** Strong primary source documentation
- **Probable:** Multiple secondary sources, consistent historical record
- **Possible:** Limited documentation, demographic evidence only

The chapter uses all three tiers but labels each point by its evidence quality. Confirmed sundown towns are displayed at full opacity. Probable at 70%. Possible at 40%. The reader sees the gradient of certainty. Elias enforces this. No point is presented as confirmed that is only possible.

---

## Visualization Design

### Fig 01 -- The Corridor Map

**What it shows:** The full Negro Leagues schedule geography (1936-1948) overlaid with documented sundown towns, showing proximity between game locations and known sundown places.

**How it works:**

Base layer: the same dark map from Chapter 02, same Mapbox GL JS implementation, same platform aesthetic.

Game location layer: amber dots for every documented Negro Leagues game location, sized by number of games hosted. Identical to the league map from Chapter 02 -- the reader recognizes the landscape.

Sundown corridor layer: a new element. Documented sundown towns appear as oxblood dots, sized by evidence quality rating. Full opacity for confirmed. Fading for probable and possible. The oxblood dots do not replace the amber game dots -- they appear alongside them. The reader sees where the games were and where the danger was simultaneously.

Proximity rings: for each game location, concentric rings at 10 miles, 25 miles, and 50 miles. The rings are not drawn visually -- they are the basis for calculating the Corridor Danger Score. The visualization shows the result, not the rings.

**The reveal:** When the page loads, it shows only the game locations -- the amber dots the reader recognizes from Chapter 02. Then a toggle labeled "Show the corridor" appears. The reader activates it. The oxblood dots appear. The map transforms. What was a baseball schedule becomes something else entirely.

That moment of transformation -- the reader choosing to see it -- is the chapter's primary emotional design decision. The Green Book Route showed absence (dark cities). The Sundown Corridor shows presence (documented danger). The reader turns it on themselves. They cannot unsee it.

**Controls:** Year slider (1936-1948). Team selector. Evidence quality filter (all / confirmed only / confirmed + probable). The evidence quality filter is prominent -- the reader can see how the map changes when only confirmed towns are shown, which demonstrates both what is documented and what the incomplete data hides.

### Fig 02 -- The Route Danger Map

**What it shows:** The travel corridors between Negro Leagues cities, colored by Corridor Danger Score.

**How it works:**

For every documented team road trip sequence -- city A to city B to city C -- we calculate the historical road route using period-accurate road network data. Along each route segment, we count the documented sundown towns within 5 miles of the road.

The route segments are displayed as lines connecting game cities. Line color encodes the Corridor Danger Score: amber (low documented density) through a gradient to deep oxblood (high documented density). The gradient uses the platform's established color system -- amber for relative safety, oxblood for documented danger.

**The finding this visualization reveals:** Some routes were consistently dangerous regardless of which team was traveling them. The Midwest circuits -- Chicago to Indianapolis to Cincinnati, or Kansas City to St. Louis to Chicago -- ran through documented sundown corridors so dense that no Green Book listing within reach could have addressed the exposure. The danger was not at the destination. It was the drive.

**The specific corridor finding:** Illinois is the most thoroughly documented state in the Loewen database. The data will show that Negro Leagues routes through Illinois -- from Chicago to smaller Midwestern cities -- passed through documented sundown town clusters continuously. The 70% figure (70% of Illinois towns were documented sundown towns) has never been visualized against an actual travel route. This chapter visualizes it.

### Fig 03 -- The Proximity Score

**What it shows:** For every Negro Leagues ballpark, the number of documented sundown towns within 10, 25, and 50 miles.

**How it works:**

A ranked bar chart. Every documented Negro Leagues major league ballpark location on the Y axis. Three bars per ballpark: sundown towns within 10 miles, 25 miles, 50 miles. Bars in oxblood.

**The argument:** The players did not just travel through sundown country. They played games with documented sundown towns visible from the ballpark. In some cases, documented sundown towns were closer to the ballpark than the team's hotel.

**The specific case:** The chapter identifies the three ballpark locations with the highest 10-mile sundown town density. Those three locations receive dedicated case study treatment (see below).

### Fig 04 -- The Case Studies

**What it shows:** Five specific documented sundown corridors or incidents, presented as individual case studies with narrative, geographic, and historical documentation.

**How it works:**

Not a visualization -- an editorial section. Five towns or corridors, each presented with:
- Name and location
- Documentation of sundown status (evidence tier, primary sources)
- Proximity to documented Negro Leagues game locations
- Historical incident documentation where available (NAACP records, newspaper accounts, FBI files)
- What happened when travelers entered after dark, documented from primary sources

**The five case studies are selected for:**
1. Documentation quality -- confirmed status, primary source evidence
2. Proximity to Negro Leagues activity -- demonstrably on or adjacent to documented routes
3. Historical incident documentation -- not just sundown designation but documented enforcement
4. Geographic diversity -- representing different regions and circuits
5. Named individuals where possible -- Fred Goree's documented experience is the hook; case studies pursue the same standard

**The standard Oscar applies:** Every claim in every case study is sourced to a primary document or a documented secondary account with named witnesses. "It is believed that" and "reportedly" are not acceptable without a documented basis. Where documentation is incomplete, the gap is named explicitly.

**The closing case study:** The chapter's final case study is not a specific town. It is the aggregate. How many documented sundown towns did a typical Negro Leagues team pass through in a typical 1942 season? We calculate this from the route data. The number is the chapter's closing argument.

---

## The Corridor Danger Score

The chapter's original analytical metric. For each team-season combination, a composite score measuring documented sundown town exposure across the full season's road trips.

**Components:**

- Total documented sundown towns within 5 miles of any road segment traveled
- Weighted by evidence quality (confirmed = 1.0, probable = 0.7, possible = 0.4)
- Weighted by time of travel (night travel through a sundown town scores higher than daytime)
- Adjusted for proximity to documented Green Book listings (some mitigation where listings existed)

**Output:** A ranked list of team-seasons by Corridor Danger Score. Which team had the most documented sundown corridor exposure in which season. The answer will vary by circuit geography and schedule construction.

**The finding the score reveals:** Was the danger distributed equally across teams, or did some circuits expose teams to systematically higher danger than others? If the danger was unequal, who decided the schedules? Who chose the routes? That question leads to the chapter's closing section.

---

## The Schedule Question

**Who built these routes?**

Negro Leagues schedules were constructed by team owners and league officials -- not by the players. The chapter closes by asking: given what was documented about sundown town geography, what did the people who built the schedules know and when did they know it?

The Green Book was published annually from 1936. Its absence of listings in certain cities was a documented fact visible to anyone who could read it. The Corridor Danger Score maps the routes that were chosen against the documentation that existed at the time.

This section does not assert intent. It documents what was known and what was chosen. The reader draws conclusions.

Oscar reviews this section specifically for any overreach beyond documented facts. The section is kept to what the data shows: routes, dates, documentation. Nothing is imputed. Everything is sourced.

---

## ML and AI Components

**M1: The Corridor Danger Model**

A spatial analysis model that calculates the Corridor Danger Score for every team-season combination. Uses the geocoded sundown towns dataset, period-accurate road network data, and Seamheads schedule data. Output: ranked team-season danger scores with uncertainty bounds reflecting the known incompleteness of the sundown towns database.

The uncertainty bounds are essential. Because the database is incomplete, every Corridor Danger Score has a documented lower bound (confirmed towns only) and an estimated upper bound (extrapolating from Illinois documentation rates to the full national geography). Both bounds are shown. The gap between them is the undocumented danger.

**M2: The Route Optimizer (Counterfactual)**

A model that asks: given the documented sundown town geography, was there a safer route available for any given road trip? For each documented route segment with high Corridor Danger Score, the model calculates alternative routes using the historical road network and their corresponding danger scores.

The output: for X% of high-danger route segments, a documented safer alternative existed. For Y% no safer alternative was feasible given the schedule structure. The counterfactual is labeled as such -- it is a model output, not a historical claim.

**M3: The Narrative Generator**

For each of the five case study towns, an AI-generated historical narrative synthesizing the documented primary sources, the route data, and the census context. Same methodology as the Green Book Route's M3 -- Claude API, structured prompt, human review by Oscar, full confidence labeling.

The narratives are written as if from the perspective of someone traveling through in 1942. Not a named individual (no false attribution) but a generalized documented experience. Every specific claim in the narrative is sourced to a primary document.

---

## Content Sections

**The Hook:** Fred Goree and the documented experience that opens the chapter. One page. Primary source cited.

**What a Sundown Town Was:** Plain language explanation. The signs. The enforcement. The geography -- not the South, the North. The academic documentation. Brief, factual, no editorializing needed.

**The Data We Have:** The Scientific Data (2025) dataset explained. 2,248 documented places. Evidence quality tiers. What the database can and cannot show. The methodological caveat displayed prominently.

**The Map (Fig 01):** The corridor visualization with the toggle. Introduced with: *"Here is where they played. Turn the map on."*

**The Routes (Fig 02):** The route danger visualization. Introduced with: *"Here is how they got there."*

**The Proximity Score (Fig 03):** The ballpark proximity ranking. Introduced with: *"Here is what surrounded the stadiums."*

**The Case Studies (Fig 04):** Five specific documented cases. Introduced with: *"Here is what it meant, specifically."*

**The Schedule Question:** Who built the routes. What was documented. What was chosen.

**The Closing Number:** The aggregate Corridor Danger Score for a typical 1942 season. A number. The chapter ends on a number, as The Other Box Score chapters should.

---

## Methodology Requirements

**METHODOLOGY.md must document:**

1. The Scientific Data (2025) dataset -- citation, evidence quality tiers, known limitations
2. The Loewen/Berrey database -- provenance, crowdsourcing methodology, incompleteness documentation
3. The period-accurate road routing methodology -- data source, routing algorithm, limitations
4. The Corridor Danger Score construction -- all components, weights, rationale
5. The uncertainty bounds methodology -- how lower and upper bounds are calculated
6. The counterfactual route analysis -- assumptions, limitations, labeling
7. The AI narrative generation -- model, prompt structure, human review process
8. All data sources with license and access date

**The incompleteness statement must appear in the methodology section:**

*"This analysis is bounded by the documented record. Researchers who have studied sundown towns most extensively estimate that the documented database captures a fraction of actual sundown places. Illinois, the most thoroughly documented state, had an estimated 500+ sundown towns -- 70% of all towns. The national database contains 2,248 documented places. The actual number of sundown places in the United States during the 1936-1948 period was certainly higher. Every Corridor Danger Score in this analysis is therefore a lower bound estimate. The actual danger was greater than the data shows."*

---

## Asset Requirements

**Photographs needed (for Oscar's review):**

- A photograph of an actual sundown town sign (LOC or academic archive, public domain)
- A photograph of a Negro Leagues team bus on the road (public domain -- several LOC options)
- Period road map of Illinois or the Midwest showing towns (LOC, public domain)

**No team logos.** Geographic markers, typography, and the platform's visual system carry the visual identity. See Chapter 02 notes on logo usage.

**All assets in the asset register before build begins.**

---

## Oh Wow Moment

**Primary candidate:** The map toggle. The moment the reader activates "Show the corridor" and the oxblood dots appear across the landscape. The transformation from baseball schedule to danger map, activated by the reader's own choice.

The design rationale: the reader cannot be shown this involuntarily and have it land the same way. The act of turning it on is the act of deciding to see what was there. That decision -- made by the reader, in the present -- mirrors in a small way the decision that was made by every player on every bus, in the past, that could not be unmade.

**Secondary candidate:** The closing number. The aggregate documented sundown town exposure for a typical 1942 Negro Leagues team road trip. Whatever that number is, it is large enough that no annotation is required.

**Oh wow test expectation:** At least three of five agents identify the map toggle moment independently. If they do not, the toggle mechanic needs refinement -- either the visual transformation is not dramatic enough or the framing before the toggle does not adequately prepare the reader for what they are about to see.

---

## Citation Block

```
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
```

---

## Build Sequence

| Phase | Deliverable | Gate |
|-------|-------------|------|
| 1 | Download and process Scientific Data (2025) geocoded dataset | Evidence quality tiers documented, coordinate system verified |
| 2 | Join sundown towns to game locations -- proximity calculation | Elias reviews spatial join methodology |
| 3 | Period-accurate road routing for documented schedules | Routing methodology documented in METHODOLOGY.md |
| 4 | Corridor Danger Score calculation with uncertainty bounds | Elias reviews score construction and bounds |
| 5 | M2 counterfactual route analysis | Labeled as model output throughout |
| 6 | Fig 01 corridor map with toggle mechanic | Oh wow test on toggle reveal |
| 7 | Fig 02 route danger map | Vera reviews color gradient against platform system |
| 8 | Fig 03 proximity score chart | Vera reviews accessibility at 375px |
| 9 | Five case study towns selected and documented | Oscar reviews all primary source citations |
| 10 | M3 AI narratives generated and reviewed | Oscar reviews all five narratives before publication |
| 11 | Content sections written | Oscar reviews all historical claims |
| 12 | The Schedule Question section written | Oscar reviews for overreach beyond documented facts |
| 13 | METHODOLOGY.md complete with incompleteness statement | Elias and Oscar both approve |
| 14 | Citation block added | Gates verifies |
| 15 | Full agent review and oh wow test | All five verdicts, Gates merge |

---

## Connective Tissue Out

From The Sundown Corridor to The Crowd That Came (Chapter 04):

*"This is the world they moved through to get to the games. Now look at what they built when they got there. Fifty-one thousand seven hundred and twenty-three people came to Comiskey Park in 1943 to watch the East-West All-Star Game -- twenty thousand more than came to the MLB All-Star Game that same year. They drove through all of this to build something the official record refused to count. The next chapter is the crowd that came anyway."*

---

## What This Chapter Cannot Do

It cannot show the undocumented danger. The database is incomplete. Towns that were sundown towns and have not yet been documented do not appear. The chapter says so. That acknowledgment is not a limitation of the chapter -- it is part of its argument. The documented record is already damning. The full record would be worse.

It cannot show what individual players experienced subjectively. It shows documented geography, documented incidents, documented patterns. The Voice (Chapter 13) collects testimony. This chapter maps the structure that testimony describes.

---

*They played through the dark. We mapped where the dark was thickest.*
*The map is incomplete. The darkness was not.*
