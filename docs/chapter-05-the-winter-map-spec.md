# Chapter 05 · The Winter Map
## Full Specification v1.0

**Platform:** theotherboxscore.org
**Part:** Two · The Game They Played
**Chapter:** 05
**Slug:** the-winter-map
**Status:** SPEC COMPLETE
**Last updated:** May 2026

---

## The Hook

> "Hey, have you heard of Cristóbal Torriente?"

Then the map loads.

The hook rotates through four players whose transnational careers carry the chapter. Oscar selects the four based on source quality. Each player's hook is two lines: a single fact about where they played, followed by the gap that makes the chapter necessary.

Example hook lines, format only -- Oscar writes the final copy after picking the four:

- *"Hey, have you heard of Martín Dihigo? He is in the Hall of Fame in Cuba, Mexico, Venezuela, and the United States. He played every position. He could not play in the major leagues."*
- *"Hey, have you heard of Cristóbal Torriente? In October 1920, in Havana, he outhit Babe Ruth in a barnstorming series. Ruth batted .345. Torriente batted .433. He is now third all-time in career batting average."*

The hook plays once per session. Then the chapter opens to the centerpiece.

---

## The Argument

**Core thesis:** The color line was a US problem, not a baseball problem.

The same players who were locked out of the American major leagues were welcomed everywhere else baseball was played. They were not unknown quantities in Cuba. They were not novelties in Mexico. They were the best players in the leagues they entered, season after season, country after country, for years. The Caribbean and Latin American leagues counted them. The American major leagues did not.

The chapter does not argue this with rhetoric. It argues it with maps.

**What the chapter is not:** It is not a celebration of Latin American baseball as a refuge. The conditions Black players found in the winter leagues were better than what they faced in the United States, but they were not perfect. Some Latin American leagues had their own color complications. Some host countries had their own racial hierarchies. The chapter does not romanticize the welcome. It documents it, with the same precision used to document the exclusion.

**The closer:** The Latin American halls of fame counted these men decades before Cooperstown did. The chapter ends on that fact, with the matrix that Ch 12 The Other Hall expands into a full visualization. Ch 05 plants the seed. Ch 12 makes the case.

---

## The Three Views

The centerpiece is a single map component with three reader-toggled views. Same data, three different questions.

### View 1 · Flow Map

The reader sees one player at a time. Their career lines arc from US summer city to Latin American winter city, year by year, season by season. The lines accumulate as the timeline scrubs forward. By career end, the map shows the full transnational arc.

- Toggle players via dropdown or arrow nav.
- Timeline scrubber at the bottom, year by year.
- Lines colored in --amber when the player is in motion (mid-season transit), --vellum when settled in a winter league.
- Tooltip on each city: team, season, key statistic.
- Default player on first load: Oscar's pick of the strongest case.

**What the reader feels:** This was not a side trip. This was a year-round professional career across multiple countries. The map shows what twelve months of major league baseball actually looked like for the men who were not allowed to play in the American version.

### View 2 · Career Geography

The reader sees one player's entire transnational career as a single static map. No animation. No timeline. Every city the player ever played in, sized by seasons played there, connected by the actual sequence of their career.

- Same player selector as View 1.
- The map is a portrait. The shape of the career as geography.
- Each city dot labeled. Hover for season-by-season detail.
- For Dihigo, this is sixteen cities across four countries. For Paige, it is more. For Torriente, the Cuba-Chicago axis dominates.

**What the reader feels:** This is what a baseball career looks like when nobody is allowed to settle. The dots are not nostalgia. They are evidence.

### View 3 · Aggregate Density

The reader sees the whole Negro Leagues generation summed onto a single map. Every documented transnational player, every documented winter league appearance, aggregated by city. The size of each dot is the total number of player-seasons that city hosted.

- No player selector. This is the collective view.
- Date range slider lets the reader narrow to specific decades.
- The dominant cities reveal themselves: Havana, Mexico City, San Juan, Caracas, Ciudad Trujillo.
- The visual is unmistakable. Hundreds of careers. Five countries. Decades of continuous activity.

**What the reader feels:** This was not unusual. This was the system. The American major leagues operated by exclusion. The rest of the baseball world operated by inclusion. The map shows the rest of the baseball world.

---

## Data Scope

Elias determines the league scope based on Seamheads data quality. The acceptance criteria for inclusion:

- Documented roster data with player-season granularity
- City-level location data for every team
- Date coverage spanning at least three decades of Negro Leagues era (roughly 1920-1948)
- Acceptable completeness -- every dataset's gaps documented in METHODOLOGY.md

**Candidate leagues:** Cuban Winter League (the strongest data, longest run), Mexican League, Puerto Rican Winter League, Venezuelan League, Dominican League (1937 season specifically -- well documented because of the Trujillo recruitment campaign).

If a league's data is too sparse to support honest visualization, it is excluded from the centerpiece and noted in METHODOLOGY.md. Elias signs off on what is in and what is out before Vera builds the map.

**Calibration data:** The barnstorming game records (Negro Leagues teams vs MLB teams, vs Cuban teams, vs Mexican teams) used in Ch 08 The Parallel League as calibration also appear here as supporting evidence. The same players, the same head-to-head data, framed differently -- Ch 08 uses it to calibrate the counterfactual, Ch 05 uses it to show that the rest of the world saw what the American major leagues refused to acknowledge.

---

## Rotating Player Profiles

Below the centerpiece map, four player profile cards. Same baseball-card proportions as Ch 02 Lost Seasons. Each card shows:

- Public domain photograph (Oscar verifies provenance)
- Name, position, years active
- A single transnational statistic -- Hall of Fame inductions in N countries, or seasons played outside the US, or career batting average across all leagues
- One-line note in Space Mono below the card, in the Lost Seasons format
- A small map icon linking back to that player in View 1

Oscar selects the four. Selection criteria:
- Source quality for the player's transnational career (documented contracts, newspaper coverage, hall of fame records in at least two countries)
- Range of positions and roles -- not all outfielders, not all pitchers
- Range of careers -- short and long, early and late, well-known and less-known
- At least one player whose case Cooperstown still has not fully made

**Default rotation (Oscar's call):** Likely Dihigo, Torriente, and two others. Oscar writes the one-line notes himself, every one of them sourced.

---

## Supporting Visualizations

Three smaller charts below the rotating profiles, each one a single specific finding.

### Chart A · Career Months Played

For the four anchor players plus a comparison set of contemporary MLB stars (Ruth, Gehrig, DiMaggio), a horizontal bar showing months of professional baseball played per year, averaged across career.

The MLB stars sit around 6-7 months. The Negro Leagues stars sit around 10-12 months. The bar chart shows the gap without commentary.

**Source:** Seamheads + Lahman + winter league records.
**Caption:** *"They worked twice as much for half the recognition."*
**Note to Elias:** This is a chart that needs to survive cross-league comparison scrutiny. Document every assumption in METHODOLOGY.md. The bar chart can show ranges if point estimates are not defensible.

### Chart B · Country Coverage

For each anchor player, a small horizontal stripe showing which countries they played in, year by year, color-coded by league. The stripes reveal the patterns. Some players (Dihigo) bounce country to country every year. Others (Torriente) settle in one place for stretches.

**Caption:** *"The maps the major leagues did not keep."*

### Chart C · Latin American Hall of Fame Recognition

A preview of the Ch 12 Other Hall matrix. For the four anchor players, dots showing inductions in Cuban, Mexican, Venezuelan, Dominican, and US halls of fame. The dots without US accompaniment tell the story.

**Caption:** *"Counted everywhere else, decades before Cooperstown."*
**Methodology note:** *"The full matrix appears in Chapter 12. This is the preview."*

---

## The Connective Tissue

### Coming in from Ch 04 The Crowd That Came

Ch 04 closes on the 1943 East-West Game roster. Many of those players spent the next month flying to Havana or boarding a steamer to Veracruz. The transition line:

*"The All-Star Game ended. The season did not. They got on buses and boats and trains. The map followed them."*

### Going out to Ch 06 The Collapse

Ch 05 ends with the dollar question: how does an entire system of leagues survive economically when its best players spend half the year in other countries? The transition line:

*"They could play anywhere. They did play everywhere. And then, beginning in 1947, the system that had paid them disappeared."*

That sets up Ch 06 The Collapse -- the franchise timeline that ends with integration killing the Negro Leagues.

---

## ML and Models

Lighter ML lift than most chapters. The Winter Map is data assembly and visualization, not statistical reconstruction.

**The one ML asset:** A name resolution model for cross-league entity matching. The same player appears in Seamheads under one spelling, in Cuban records under another, in Mexican records under a third. Resolving "Crist'bal Torriente" / "Cristóbal Torriente" / "Christopher Torriente" / "Torry" to a single canonical player ID is a non-trivial NLP problem and the foundation of the chapter's data quality.

**Elias's job:** Build the resolution model, validate it against known cases (the four anchor players plus a held-out set), document the resolution rules in METHODOLOGY.md, ship the canonical player ID table as part of the platform data layer (other chapters will need it too).

**Confidence labeling:** Every player on the map carries a confidence indicator for transnational career completeness:
- **Documented:** Every season verified by multiple sources
- **Verified:** Career path verified, some seasons reconstructed
- **Reported:** Career path established by secondary sources only
- **Disputed:** Significant gaps or conflicts in the record

The four anchor players must all be Documented or Verified. Other players on the aggregate map can be Reported, with a footnote.

---

## Data Sources

Elias and Oscar reconcile this list before the chapter ships:

- **Seamheads Negro Leagues Database** -- primary source for US and cross-referenced winter league records
- **Cuban Winter League records** -- multiple sources, Seamheads partial, Cuban archives partial
- **Liga Mexicana records** -- varying coverage by decade
- **Puerto Rican Winter League records** -- well documented from 1938 forward
- **Liga Venezolana records** -- spotty pre-1946
- **Dominican 1937 season** -- extensively documented because of the Trujillo recruitment
- **Newspaper archives** -- Pittsburgh Courier and Chicago Defender covered winter league play extensively. La Habana newspapers covered American players in Cuba. Oscar handles the Spanish-language source verification.
- **Baseball Reference Negro Leagues** -- secondary reference for verification

**Disputed data must be labeled:** The Cuban records have known gaps in the late 1930s. Mexican League data is uneven before 1940. Oscar and Elias document every gap explicitly.

---

## The Oh Wow

There are three.

**First:** The reader toggles to Aggregate Density and sees Havana light up at three times the size of any US city on the map. The realization that an entire generation of American baseball talent treated Cuba as their second home is the moment.

**Second:** The Career Months chart. The horizontal bars for Ruth, Gehrig, DiMaggio sit at six and seven months. The bars for the Negro Leagues stars sit at ten, eleven, twelve. The visual is uncommentable. The reader does the math.

**Third:** The Latin American Hall of Fame preview at the bottom. Four players. Sixteen possible inductions across five halls. Most of those dots are filled. The US column has gaps. The story is told without a sentence of commentary.

---

## What Never Ships

Standard Other Box Score blocks, plus chapter-specific:

- **No romanticization of the welcome.** Latin American leagues were better than the US color line. They were not perfect. Don't frame Cuba as utopia.
- **No claim that Black players were universally accepted everywhere.** Cuban baseball had its own race politics. So did some other host leagues. Where those frictions are documented, they appear. The chapter is not a fairy tale.
- **No quotes attributed to Latin American players without Spanish-language source verification.** Oscar handles this. English-only secondary sources are not sufficient for direct attribution.
- **No statistical comparison between Latin American league play and MLB play without documented methodology.** This is Elias territory. If the data does not support the comparison, the chart does not get made.

---

## Build Sequence

1. Elias builds the name resolution model and the canonical player ID table
2. Elias determines which leagues have clean enough data to ship in the centerpiece
3. Oscar selects the four anchor players based on source quality
4. Oscar writes the four hook lines, with sources
5. Vera prototypes View 1 (flow map) with one player -- Dihigo, probably
6. Vera adds View 2 and View 3 as the data layer stabilizes
7. Oscar verifies every photograph provenance for the anchor cards
8. Elias produces the Career Months chart with full methodology documentation
9. Ida reviews the chapter for tenet compliance -- especially "subjects are protagonists" and "no romanticization"
10. Gates final review
11. Ship

**Estimated effort:** Heavier than Ch 02 or Ch 03 because of the name resolution model and the multi-country source verification. Lighter than Ch 10 The Ledger or Ch 08 The Parallel League. Call it three to four weeks of focused work.

---

## The One Line

If someone reads only one sentence of Chapter 05, it should be the closing line at the bottom of the page:

*"They were welcome everywhere baseball was played, except the country that called itself the home of baseball."*

That is the chapter. The map proves it.
