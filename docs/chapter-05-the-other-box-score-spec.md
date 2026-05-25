# The Other Box Score -- Chapter 05
## The Other Box Score · Full Specification v1.0

**Series:** theotherboxscore.org
**URL:** theotherboxscore.org/chapters/the-other-box-score/
**GitHub:** other-boxscore/chapters/05-the-other-box-score/
**Part:** Two -- The game they played
**Position:** Chapter 05 of 15
**License:** MIT (code) · CC0 (data)
**Status:** SPEC COMPLETE
**Last updated:** May 2026

---

## Why This Chapter Has the Platform's Name

The platform is called The Other Box Score because on the same day the mainstream press printed the official box score -- the American League game, the National League game, the white major leagues -- the Chicago Defender printed another box score. Same format. Same columns. Same statistical language. The Negro Leagues game. The players the official record did not count as major leaguers.

Both box scores documented real baseball. One became history. One became this chapter.

This is the chapter the platform is named for. It earns that name by doing what the platform exists to do: presenting the other box score as what it always was -- a major league record -- and showing what it contains.

---

## The Hook

**Have you heard of Josh Gibson?**

On May 28, 2024, Major League Baseball incorporated the statistics of more than 2,300 Negro Leagues players into its official record books. Josh Gibson became MLB's all-time career batting average leader at .372, surpassing Ty Cobb's .367. Gibson's .466 average for the 1943 Homestead Grays became the single-season record, surpassing Hugh Duffy's .440 from 1894. Gibson also became the career leader in slugging percentage (.718, ahead of Babe Ruth's .690) and OPS (1.177, ahead of Ruth's 1.164).

Gibson died of a stroke in January 1947 at age 35, three months before Jackie Robinson's MLB debut. He never played a single official major league game under the rules that existed during his career.

He is now the greatest hitter in major league history. By the numbers. Officially.

His grandson said: *"We always considered Josh Gibson a major leaguer. He just never played in the major leagues."*

This chapter is the statistical record of what the barrier cost.

---

## The Thesis

In May 2024, after a three-year research project, MLB officially incorporated Negro Leagues statistics into its record books. The researchers estimated 72% of Negro Leagues records from 1920 to 1948 are included in the current database. That means 28% of what happened on Negro Leagues fields between 1920 and 1948 is undocumented -- not because it didn't happen, but because nobody with institutional resources thought it was worth recording at the time.

The chapter presents three arguments simultaneously:

**One -- What the record says now.** The integrated statistical record. The leaderboards that changed when Gibson's numbers were counted. What the documented statistics, presented without inflation or deflation, show about the quality of Negro Leagues baseball. This is the chapter's foundation. The numbers are real. They are sourced. They require no embellishment.

**Two -- What the record cannot say.** The 28% gap. The exhibition games not counted. The barnstorming records excluded. The Latin American league seasons not yet integrated. The games played and reported in Black newspapers that have not yet been transcribed. The chapter shows the gap as a documented measurement -- not an assertion about what the numbers would be, but a documented fact about what was lost.

**Three -- The head-to-head evidence.** Negro Leagues players and MLB players faced each other in documented exhibition games throughout the era. 180 documented games between 1900 and 1948. Negro Leagues players won 51% of them. This is the closest thing to a controlled comparison experiment the era produced. The chapter presents it -- with full uncertainty labeling, because 180 games is a meaningful sample but not a definitive one.

The chapter's closing argument: the record, incomplete as it is, is damning enough. Josh Gibson is the greatest hitter in major league history. The barrier kept him out of the major leagues. Those two facts exist simultaneously, officially, in the MLB record books, as of May 28, 2024.

---

## The Original Contribution

Two original elements:

**The side-by-side box score:** A designed presentation of two actual box scores from August 1, 1943 -- the MLB game played that day and the East-West All-Star Game. Same format. Same columns. Same typographic system. Side by side. One was history. One was forgotten. This presentation, at this quality, in this framing, has not been built before.

**The coverage map:** A visualization of the documented completeness of the Negro Leagues statistical record by year and league -- showing which years and leagues have the most complete box score recovery and which have the largest gaps. Built from Seamheads' own documentation of their database coverage. This visualization of what is missing has not been built before.

---

## Data Sources

| Source | Coverage | License | Notes |
|--------|----------|---------|-------|
| Seamheads Negro Leagues Database | 1920-1948 | Research use | Primary statistical source. Gary Ashwill and Kevin Johnson, Agate Type Research. |
| Baseball Reference Negro Leagues integration | 2021/2024 | Public | Integrated database. All career and season leaders cited from here. |
| FanGraphs Negro Leagues data | 2023 | Public | WAR calculations and rate statistics. |
| MLB Official Statistical Review | 2024 | Public | The 2024 integration documentation, including the 72% coverage estimate from John Thorn. |
| Seamheads normalization documentation | 2020 | Public (seamheads.com) | Methodology for comparing Negro Leagues statistics to MLB statistics. |
| Seamheads MLE documentation | 2020 | Public (seamheads.com) | Major League Equivalencies methodology for Negro Leagues. |
| CNN / Neil Paine exhibition game analysis | 2024 | Cited secondary | The 180 documented games finding, 51% Negro Leagues win rate. Todd Peterson primary research cited within. |
| Chicago Defender historical archive | 1943 | ProQuest Historical Newspapers | August 1943 box scores for the East-West Game -- the primary source for the side-by-side visualization. |
| Retrosheet | 1943 | Public domain | MLB box score for the comparison date. |

**The 72% figure:** MLB official historian John Thorn estimated 72% of Negro Leagues records from 1920 to 1948 are included in the current integrated database. This figure is used throughout the chapter and its source is cited every time it appears. It is not presented as exact -- it is Thorn's estimate, stated as such.

**The exhibition game data:** The 180 documented games and 51% Negro Leagues win rate is sourced to Neil Paine's analysis (CNN, May 2024) citing Todd Peterson's primary research. The chapter treats this as a documented secondary finding, not a primary calculation. The uncertainty is labeled prominently: 180 games is the equivalent of one full season, but the games were not randomly assigned and selection effects may exist.

---

## Visualizations

### Fig 01 -- The Side-by-Side Box Score

**What it shows:** Two box scores from August 1, 1943. Left panel: the MLB game. Right panel: the East-West All-Star Game. Same typographic format. Same column structure. Same platform design language.

**Design:**

The platform's box score format is built in IBM Plex Mono on the dark background. Both box scores use identical formatting -- the same column headers (AB, R, H, RBI, etc.), the same line score structure, the same typographic hierarchy. The only visual distinction is the header: one reads the MLB game, one reads East-West All-Star Game, Comiskey Park.

The design argument: these are the same document. One recorded what happened in the white major leagues. One recorded what happened in the Negro Leagues. The official record treated them as different in kind. The platform presents them as different only in label.

**The choice of date:**

August 1, 1943 is chosen specifically because it is the date of the peak East-West attendance (51,723). The reader arrives at Chapter 05 having just come from Chapter 04's crowd visualization. They already know what happened at Comiskey Park that day. Now they see the box score of the game those 51,723 people came to watch -- formatted identically to the box score of the MLB game played that same day.

**What is in the 1943 East-West box score:**
Satchel Paige started for the West. Josh Gibson drew a walk -- the only baserunner Paige allowed in three innings. Buck Leonard hit a ninth-inning home run for the East. West won 2-1. The box score contains the statistical record of a game between players who collectively hold multiple MLB all-time records as of 2024.

**Oscar's review mandate:** The East-West box score must be verified against the Lester primary text and the Retrosheet game account. Every statistical entry verified before the visualization ships.

**Vera's design mandate:** The two panels must be visually identical in format. The reader must be able to scan from one to the other without any visual cue that one is "more official" than the other. The formatting equality is the argument.

---

### Fig 02 -- The Leaderboard

**What it shows:** The MLB all-time career and single-season statistical leaders in batting average, slugging percentage, and OPS -- as they currently stand in the official MLB record, post-2024 integration.

**Design:**

A standard baseball statistics leaderboard. Top 10 by career batting average. Top 10 by career slugging percentage. Top 10 by career OPS. Top 10 by single-season batting average. Exactly the same format as any baseball statistics page.

The Negro Leagues players appear at the top without special marking, because they are the leaders. Gibson's .372 career batting average. Gibson's .466 single-season batting average. Oscar Charleston's .363 career average. These numbers are in the official MLB record. The leaderboard shows the official record.

**The visual argument:**

The leaderboard needs no annotation. The reader sees Josh Gibson at the top of the career batting average list above Ty Cobb, and Oscar Charleston above Tris Speaker, and they understand what it means without being told. The chapter presents the record. The record speaks.

**One note below the leaderboard -- not an annotation, a fact:**

*"These statistics represent approximately 72% of the documented Negro Leagues record from 1920-1948. The remaining 28% has not yet been recovered."*

That sentence appears below the leaderboard in small type. It is the chapter's most important single line. It is not an asterisk. It is not a qualification. It is a documented fact about what the numbers contain and what they do not.

---

### Fig 03 -- The Coverage Map

**What it shows:** The documented completeness of the Negro Leagues statistical record, by year and league, 1920-1948.

**Design:**

A grid visualization. Year on the X axis (1920-1948). League on the Y axis (seven leagues). Each cell colored by estimated box score recovery rate -- the percentage of games for that league in that year for which a surviving box score has been found and transcribed.

Color scale: full integration gold (#d4a64a) for high coverage, fading through amber to near-white for low coverage, barrier red (#a14545) for the years and leagues with the lowest documented recovery.

**The data source:**

Seamheads' own documentation of their database coverage, supplemented by the 2024 MLB Statistical Review Committee findings. Where specific recovery rates by year and league are not published, the chapter uses the aggregate 72% estimate and notes the limitation in METHODOLOGY.md.

**What the visualization reveals:**

The coverage is not uniform. Some leagues in some years have near-complete box score records -- the Negro National League in the late 1930s and early 1940s has relatively good coverage because of consistent Black press reporting. Other leagues in other years have significant gaps. The gaps are not random -- they correlate with the institutional resources available to the Black press in those years and those cities.

**The argument the coverage map makes:**

The statistical record is incomplete in a structured way. The incompleteness reflects the same structural inequity as the barrier itself -- the communities with fewer resources left fewer records. The coverage map makes this visible as a designed element rather than a stated claim.

---

### Fig 04 -- The Head-to-Head

**What it shows:** Negro Leagues vs. MLB in documented exhibition games, 1900-1948.

**Design:**

A summary visualization. 180 documented games. Win-loss record: Negro Leagues 51%, MLB 49%. Presented as a simple bar or donut chart -- not the main event, but documented evidence.

Below the summary: a sample of specific documented matchups. Satchel Paige vs. Dizzy Dean. Josh Gibson vs. major league pitching. The documented outcomes. Each cited to a primary source.

**The uncertainty labeling -- mandatory and prominent:**

*"180 documented games between Negro Leagues and MLB all-star teams, 1900-1948. This is approximately one full season of major league games. The games were not randomly selected -- they were exhibition games with non-standard conditions. The win-loss record is documented fact. Its implications for overall competitive quality require careful interpretation. The researchers who assembled this record note that Negro Leaguers were the only non-MLB group to consistently beat MLB all-star teams; semi-pro, college, and minor league teams did not achieve the same record."*

This uncertainty statement is not fine print. It appears adjacent to the visualization, not below it, in legible type. Elias reviews it and approves the phrasing before the chapter ships.

**Why this visualization is in the chapter despite the uncertainty:**

The head-to-head record is the closest documented evidence of competitive quality comparison the era produced. Its limitations are real and labeled. Its existence is documented and significant. A platform that omits it because of uncertainty is less honest than a platform that presents it with the uncertainty labeled. The chapter presents it with the uncertainty labeled.

---

## Content Sections

**The Opening:** The hook. Gibson. The May 28, 2024 integration. Three paragraphs. The grandson's quote. Then the first visualization.

**What the Record Says (Fig 02 -- The Leaderboard):** Introduced with:
*"On May 28, 2024, the official record was corrected. Here is what it says now."*

The leaderboard appears. Below it, the single documented fact about 72% coverage.

**The Other Box Score (Fig 01 -- Side by Side):** Introduced with:
*"There was always another box score. Here it is."*

The two panels appear. No annotation. The design makes the argument.

**What August 1, 1943 Looked Like:**
A 400-word section written from primary sources -- the Lester game account, the Chicago Defender coverage, the Retrosheet box score data. What happened on the field. Paige starting. Gibson's walk. Leonard's homer. What the West won. What 51,723 people saw. Every claim sourced. Oscar reviews line by line.

**The Gap (Fig 03 -- Coverage Map):** Introduced with:
*"This is what we have. The rest is documented absence."*

The coverage map appears. A 200-word section below it explaining what the gaps represent and why they exist.

**The Head-to-Head (Fig 04):** Introduced with:
*"There is one more kind of evidence. 180 games. Here is what happened."*

The summary visualization. The uncertainty statement in full. The sample matchups.

**What the Numbers Say:**
The chapter's closing section. Not a conclusion -- a summary of what the documented record, as it exists, shows. Gibson's numbers. Charleston's numbers. Paige's numbers. Buck Leonard's numbers. Presented plainly, sourced, without editorializing. The numbers are sufficient.

---

## The Career Trajectory Model

**One ML component for this chapter:**

For Josh Gibson specifically -- the player whose documented statistics are most extensive and whose career the barrier most directly truncated -- the chapter builds a career trajectory model using:

- Gibson's documented season-by-season statistics from the Seamheads database
- Age curves from comparable MLB catchers of the same era (Gabby Hartnett, Bill Dickey, Mickey Cochrane)
- Exhibition game performance as a calibration point
- The documented fact that Gibson died at age 35, three months before Robinson's MLB debut

The model generates a projected full-career statistical record under two scenarios:
1. **Documented only:** Gibson's career as the record currently shows it, with the 28% gap acknowledged
2. **Modeled projection:** What the career trajectory model suggests his statistics would have been in a complete record, stated as a range with wide confidence intervals

Both scenarios are labeled with their source: Documented or Modeled. Every assumption in the model is in METHODOLOGY.md. The output is presented as a plausible range, not as a factual claim.

The model is not attempting to argue that Gibson was "really" better than the record shows. It is showing what the documented evidence, extended by a documented methodology with stated assumptions, suggests. The uncertainty is the point. The reader sees how much was lost -- and also how imprecise any reconstruction must be.

Elias reviews the model methodology. Oscar reviews the biographical facts underlying the career arc. Both approve before the model output appears in the chapter.

---

## What This Chapter Does Not Do

**It does not claim the Negro Leagues were "better" than MLB.**

The head-to-head record shows 51% wins in 180 games. The chapter presents this as evidence of competitive quality, not as proof of superiority. The language throughout is precise: comparable, documented, significant. Not superior, better, or proven.

**It does not assert Gibson would have broken records in MLB.**

The career trajectory model shows a range. The chapter never says Gibson "would have" hit .372 in MLB under segregation-era conditions. It says the documented record shows .372 and the model suggests what a complete career might have looked like. The distinction matters and the chapter maintains it.

**It does not minimize the incompleteness.**

The 28% gap is documented, labeled, and present throughout. The chapter does not present the integrated record as complete. It presents it as 72% of what happened, with the other 28% documented as absent. That framing is stronger than pretending the record is whole.

---

## Agent Review Notes

**Oscar:**
- Verifies every statistical figure against the Baseball Reference integrated database and the Lester primary text
- Reviews the August 1, 1943 game section line by line
- Verifies the East-West box score against Retrosheet and Lester
- Reviews all exhibition game matchup descriptions against primary sources
- Specifically reviews the Gibson biographical facts in the career trajectory model section

**Elias:**
- Reviews the coverage map data and the 72% figure attribution
- Reviews the head-to-head uncertainty statement for accuracy and completeness
- Reviews the career trajectory model methodology in full
- Documents all assumptions in METHODOLOGY.md
- Reviews the exhibition game data sourcing

**Vera:**
- Enforces format equality between the two box score panels
- Reviews the leaderboard design for accessibility
- Reviews the coverage map color scale for WCAG AA compliance
- Reviews all visualizations at 375px mobile

**Ida:**
- Enforces the chapter's tonal consistency with Part Two
- Verifies the chapter does not overreach beyond the documented record
- Confirms the uncertainty labeling is present and prominent throughout
- Confirms the chapter title is earned -- this chapter must be the platform's name for a reason visible to the reader

**Gates:**
- Verifies all statistical figures against the Baseball Reference integrated database before merge
- Verifies the 72% figure is attributed to John Thorn and the 2024 MLB Statistical Review every time it appears
- Verifies the exhibition game data is attributed to Neil Paine / Todd Peterson and labeled as documented secondary finding
- Verifies METHODOLOGY.md is complete before merge

---

## Oh Wow Moments

**Primary:** The side-by-side box score. The moment the reader sees both box scores formatted identically and understands -- without annotation -- that the platform has just made a structural argument about what the official record counted and what it didn't.

**Secondary:** The leaderboard with Gibson at the top. The moment the reader sees .372 above .367, and .718 above .690, and recognizes the names, and holds two facts simultaneously: these are the greatest numbers in major league history, and the man who produced them never played an official major league game.

**Oh wow test:** All five agents must identify at least one of these moments independently. If fewer than three identify the side-by-side box score moment, the formatting equality between the panels needs refinement. The argument is in the design. If the design doesn't land without explanation, the design needs work.

---

## Citation Block

```
Cite this chapter:
Haynes, Jeremy. "The Other Box Score." The Other Box Score,
theotherboxscore.org/chapters/the-other-box-score/, [publication date].

Chicago:
Haynes, Jeremy. "The Other Box Score." The Other Box Score.
[Month Year]. https://theotherboxscore.org/chapters/the-other-box-score/.

Data (CC0):
The Other Box Score. "Negro Leagues Statistical Integration Dataset."
CC0 1.0. https://github.com/other-boxscore/chapters/05-the-other-box-score/data/.
[Version date].

Primary statistical source:
Seamheads Negro Leagues Database. Agate Type Research.
Gary Ashwill and Kevin Johnson, lead researchers.
https://www.seamheads.com/NegroLgs/

MLB integration:
"Negro Leagues Statistics Now in the MLB Record Books."
Major League Baseball, May 28, 2024.
https://www.mlb.com/news/negro-leagues-statistics-incorporated-into-mlb-record-books
```

---

## Build Sequence

| Phase | Deliverable | Gate |
|-------|-------------|------|
| 1 | Pull all career and single-season leaders from Baseball Reference integrated database | Elias documents all figures with source URLs |
| 2 | Verify East-West 1943 box score against Lester and Retrosheet | Oscar sign-off on every statistical entry |
| 3 | Identify MLB game box score for August 1, 1943 from Retrosheet | Elias verifies |
| 4 | Fig 01 side-by-side box score built | Vera enforces format equality. Oh wow test -- five agents, minimum three must identify the format equality argument unprompted |
| 5 | Fig 02 leaderboard built | Elias verifies all figures against integrated database. The 72% sentence added below |
| 6 | Coverage map data assembled from Seamheads documentation | Elias documents gaps and limitations in METHODOLOGY.md |
| 7 | Fig 03 coverage map built | Vera reviews color scale accessibility |
| 8 | Exhibition game data assembled and uncertainty statement written | Elias reviews. Neil Paine / Todd Peterson attribution documented |
| 9 | Fig 04 head-to-head built with uncertainty statement prominent | Elias approves phrasing |
| 10 | August 1, 1943 content section written | Oscar reviews line by line |
| 11 | Career trajectory model built for Gibson | Elias reviews methodology. Oscar reviews biographical facts |
| 12 | "What the Numbers Say" closing section written | Oscar reviews all statistical claims |
| 13 | METHODOLOGY.md complete | Both Elias and Oscar approve |
| 14 | Citation block complete | Gates verifies |
| 15 | Full agent review and oh wow test | All five verdicts. Gates merge |

---

## Connective Tissue Out

From The Other Box Score to Chapter 06:

*"The numbers are in the record now. For the games that were documented. For the 28% that wasn't documented, there is something else -- the testimony of the men who played them. The next chapter is what they said about what it was like, what they were worth, and what the barrier cost them in dollars as well as history."*

---

## The Last Line of the Chapter

*Josh Gibson is the greatest hitter in major league history.*
*He died in January 1947.*
*Jackie Robinson debuted in April 1947.*
*The numbers are official.*
*The gap between those two sentences is what this platform exists to document.*
