# Chapter 06 · The Collapse
## Full Specification v1.0

**Platform:** theotherboxscore.org
**Part:** Two · The Game They Played
**Chapter:** 06
**Slug:** the-collapse
**Status:** SPEC COMPLETE
**Last updated:** May 2026

---

## The Hook

> "Hey, have you heard of the Newark Eagles?"

Then the chart loads.

The Eagles won the 1946 Negro World Series. They drew 120,000 fans that season and posted a $25,000 profit. They had Larry Doby, Monte Irvin, Don Newcombe, Leon Day, Biz Mackey, Mule Suttles, and Willie Wells.

Three years later, they were in Houston. Two years after that, they were gone.

The hook copy in Oscar's voice (final):

*"They won the championship in 1946 and drew 120,000 fans. By 1947 it was 57,000. By 1948 the Manleys had lost fifty thousand dollars and sold the team. By 1949 the Eagles were in Houston. By 1951 they were gone. This is the chart of what happened to all of them."*

---

## The Argument

**The thesis sentence Ch 06 has to make a chart for:**

*Integration killed the Negro Leagues.*

That sentence is uncomfortable. It is also true. The chapter does not soften it. The chapter proves it franchise by franchise, with documented numbers, and then names the specific mechanism: MLB teams took the talent without paying for it, the players left because integration was the only career path that paid major league money, the Black fans followed the players, the gate receipts collapsed, and the leagues that had been built and sustained by Black ownership, Black labor, Black media, and Black community money were dismantled in eight years.

**The chapter is not anti-integration.** Integration was right. Integration was overdue. The chapter is documenting what integration cost the institutions that had sustained Black baseball for fifty years, and naming the specific decisions by specific MLB owners that made the cost as heavy as it was.

**The closer:** The Negro Leagues did not die of natural causes. They were dismantled by the same major league baseball that had spent fifty years refusing to admit they existed. The dismantling happened by signing the players without compensating the teams. That is documented. That is the closer.

---

## The Centerpiece: The Franchise Timeline

A single horizontal-timeline visualization. Every documented Negro Leagues franchise from 1920 to 1962, displayed as a horizontal bar.

### The structure

- X-axis: years, 1920 to 1962
- Y-axis: franchises, grouped by league (NNL above the line, NAL below the line, with the 1920-1932 original NNL and other early leagues stacked at the top)
- Each franchise is a bar with documented start and end years
- Bars are color-coded by **cause of death**, not by team identity

### The color coding for cause of death

The cause-of-death taxonomy is the argument. Each franchise that ended gets a documented cause, sourced. The colors:

- **--moss (#8fa05a):** Survived through 1962 (the persistence color)
- **--amber (#d4a64a):** Active and thriving -- used for bar segments during a franchise's healthy years
- **--bronze (#b96f4a):** Depression economics -- folded 1929-1934, documented financial collapse pre-integration
- **--slate (#6f8aa8):** Wartime suspension -- paused 1942-1945, documented manpower or travel constraints
- **--oxblood (#a14545):** Integration-era collapse -- folded 1947-1962, documented as integration-related
- **--ink-3 (#221f17):** Pre-1947 fold, cause uncertain or undocumented

The pattern that emerges visually: the bars in oxblood cluster between 1947 and 1955. The argument is the cluster.

### Annotation layer

Five annotations float above specific dates:

- **April 15, 1947** -- vertical --oxblood rule across the chart, label: *"Robinson debuts."*
- **July 5, 1947** -- vertical --oxblood rule, label: *"Doby debuts. Veeck pays Manley $15,000."*
- **End of 1948 season** -- vertical --oxblood rule with thicker stroke, label: *"NNL collapses."* (This is the moment the chart pivots.)
- **1958** -- vertical rule, label: *"Negro American League declared minor."*
- **1962** -- vertical --oxblood rule, label: *"NAL plays final season."*

The reader sees the cluster of oxblood bars beginning at the 1947 line and ending at the 1962 line. The chart is the chapter.

### Interaction

- **Hover any bar:** Reveals the franchise card (see below)
- **Click any bar:** Opens a detail drawer with the full franchise story
- **Filter by league:** Toggle to show NNL only, NAL only, or all
- **Filter by cause of death:** Toggle the color categories on and off -- let the reader isolate the integration-era collapses
- **Year scrubber at the bottom:** Animates the chart year by year if the reader wants to watch it unfold

### The animation, if the reader presses play

Thirty seconds. The chart scrubs from 1920 to 1962. Bars appear and disappear in real time. The reader watches the system grow through the 1930s and 1940s, peak around 1946, and then in eight seconds of stage time (1947 through 1955) most of the bars go dark. The Indianapolis Clowns and Kansas City Monarchs persist into the late 1950s as barnstorming shells. By 1962, almost everything is gone.

The thirty seconds is the chapter. The duration is the argument.

---

## The Case Study: The Newark Eagles

Below the centerpiece timeline, a single franchise gets a dedicated section because the documented numbers are unimpeachable and the story is the whole chapter in microcosm.

### The data block

The Newark Eagles section is built around four documented numbers, presented in IBM Plex Mono on cards:

```
1946                    1947                    1948                    1949
NEGRO WORLD             ATTENDANCE              ATTENDANCE              FRANCHISE
SERIES CHAMPIONS        120,000 → 57,000        57,000 → ~25,000        MOVED TO
$25,000 PROFIT          $25,000 LOSS            (estimated)             HOUSTON

                                                                        1951
                                                                        FRANCHISE
                                                                        GONE
```

Each card is sourced. The 120,000 and 57,000 figures appear in the SABR Newark Eagles essay and the African American Registry biography of Effa Manley. The $50,000 cumulative loss across 1947-48 is documented. The Houston move and 1951 dissolution are in Wikipedia and the SABR franchise records.

### The Effa Manley quote

Below the data cards, a single pulled quote in the platform's quote treatment:

> *"If Doby were white, you'd pay $100,000."*
>
> Effa Manley to Bill Veeck, 1947

She said it. He paid her $10,000, plus another $5,000 when Doby stayed on the Indians roster. The quote is in James Overmyer's biography of Manley and the Andscape feature on her Hall of Fame induction. Oscar verifies the attribution.

### The roster exodus

The 1946 Eagles championship roster. Same baseball-card format as Lost Seasons. Six cards, including:

- **Larry Doby** -- Cleveland Indians, July 5, 1947 -- Eagles received $15,000
- **Monte Irvin** -- New York Giants, 1949 -- Eagles received $5,000
- **Don Newcombe** -- Brooklyn Dodgers, 1946 (signed to farm) -- Eagles received nothing
- **Leon Day** -- Mexican League, 1947 -- Eagles received nothing
- **Biz Mackey** -- Retired as a player, managed Eagles to championship
- **Larry Doby's photograph** -- public domain, LOC, Oscar verifies

Below each card, in Space Mono: the date they left and the dollar amount the Eagles received (or did not receive).

The cumulative number at the bottom: *"Five Hall of Fame players left the Newark Eagles between 1946 and 1949. Total compensation paid to the franchise: $20,000."*

That is the case study. Newark is the chapter, scaled down to one franchise.

---

## The Compensation Ledger

A separate section below the case study. A scrollable ledger-format list of every documented player signing from a Negro Leagues team to an MLB team between 1946 and 1955.

### The format

| Year | Player | From | To | Compensation |
|------|--------|------|-----|--------------|
| 1945 | Jackie Robinson | Kansas City Monarchs | Brooklyn Dodgers | $0 |
| 1946 | Don Newcombe | Newark Eagles | Brooklyn Dodgers | $0 |
| 1947 | Larry Doby | Newark Eagles | Cleveland Indians | $15,000 |
| 1947 | Hank Thompson | Kansas City Monarchs | St. Louis Browns | (research) |
| 1947 | Willard Brown | Kansas City Monarchs | St. Louis Browns | (research) |
| 1948 | Satchel Paige | Kansas City Monarchs | Cleveland Indians | (research) |
| 1949 | Monte Irvin | Newark Eagles | New York Giants | $5,000 |
| 1949 | Sam Jethroe | Cleveland Buckeyes | Boston Braves | (research) |
| 1949 | Roy Campanella | (already in Dodgers system) | Brooklyn Dodgers | (research) |
| 1950 | Hank Aaron | Indianapolis Clowns | Boston Braves | (research) |
| 1951 | Willie Mays | Birmingham Black Barons | New York Giants | (research) |

(Continued for every documented signing through 1955.)

Each row is sourced. Compensation figures marked **(research)** are placeholders for Oscar and Elias to fill in from primary sources during the build. The blanks themselves are part of the methodology -- the compensation record was deliberately incomplete because the entire practice was extractive.

### The totals row at the bottom

```
SIGNINGS, 1945-1955:          [count]
TOTAL DOCUMENTED COMPENSATION: $[sum]
AVERAGE PER SIGNING:           $[avg]
1955 EQUIVALENT IN 2024 DOLLARS: $[avg × CPI multiplier]
```

The average is going to be in the low thousands of dollars per player. In 2024 dollars that becomes the closer number. Hall of Fame talent, taken for compensation that would not buy a used car in modern terms. That is the ledger. That is the receipt.

### A note on the methodology

Some signings have no documented compensation because there was none. Others have figures that vary across sources. Elias documents both kinds of gaps explicitly. The ledger is presented as: documented signings, documented compensation where available, gaps acknowledged. The argument does not depend on perfect data. The argument is that the documented data shows extraction.

---

## The Three Forces Diagram

A simple diagram, third major visualization. Shows the three forces that collapsed the leagues, with documented citations for each.

### Force 1: Player Extraction

The talent left because integration was the only career path that paid major league money. MLB took the best Negro Leagues players. The leagues lost their stars.

- Documented citation: every signing in the Compensation Ledger above

### Force 2: Fan Migration

Black fans followed the Black players into the MLB stands. Negro Leagues attendance collapsed.

- Documented citation: Brooklyn Dodgers Black attendance rose 400% from 1946 to 1947 (African American Registry)
- Documented citation: Newark Eagles attendance fell from 120,000 (1946) to 57,000 (1947)
- Documented citation: NNL ceased operations after the 1948 season

### Force 3: Revenue Collapse

Without the gate, the leagues could not pay salaries, travel costs, or stadium rents. Franchises folded.

- Documented citation: Manleys lost $50,000 over 1947-1948
- Documented citation: NNL disbanded December 1948
- Documented citation: Sample franchise income statements from SABR research

The diagram has three labeled nodes connected by arrows. Each force feeds the next. The visual is brutally simple. The mechanism is documented.

**What the diagram is not:** It is not a graph theory exercise. It is not a system dynamics model. It is three nodes and two arrows. The argument is in the nodes, not the diagram.

---

## ML and Models

Lighter ML lift than the deep statistical chapters. The Collapse is data assembly, primary source verification, and visualization, not statistical reconstruction.

**The one model that does matter:** A survival analysis on franchise lifespans, conditioned on the year-1946 Negro Leagues franchise set. The hazard function before 1947 vs the hazard function 1947-1962 shows the discontinuity quantitatively.

**Elias's deliverable:**

- Cox proportional hazards model on franchise lifespans
- Covariates: city size, league (NNL/NAL/other), peak attendance year, championship history
- The key finding will be that the post-1947 hazard ratio is a large multiple of the pre-1947 ratio, controlling for everything else
- Confidence intervals shown
- The visualization is a hazard ratio plot, not a Kaplan-Meier curve -- Vera and Elias work the display together

This is supplementary to the centerpiece timeline. The centerpiece is the argument; the survival model is the statistical receipt.

### Confidence labeling on the timeline

Every franchise on the centerpiece carries a confidence indicator on its end date and cause of death:

- **Documented:** End date from league records, cause from primary sources
- **Verified:** End date from secondary sources, cause inferred from documented context
- **Reported:** End date approximate, cause attributed but not primary-sourced
- **Disputed:** Conflicting sources

Every franchise tagged **Disputed** is footnoted with the conflict.

---

## Data Sources

- **Seamheads Negro Leagues Database** -- franchise rosters, season records, league affiliations
- **SABR Negro Leagues research** -- franchise histories, business records, ownership records
- **SABR Business Meetings 1933-1962** -- the league meeting minutes, primary source for the dismantling
- **Effa Manley's papers** -- Baseball Hall of Fame archives, including the 1946 letter to Branch Rickey
- **James Overmyer, *Queen of the Negro Leagues: Effa Manley and the Newark Eagles*** -- the case study spine
- **Pittsburgh Courier and Chicago Defender** -- contemporaneous coverage of the collapse, 1947-1962
- **Baseball Hall of Fame online collections** -- Manley letter facsimiles, Veeck correspondence
- **MLB historical attendance records** -- for the Brooklyn Dodgers attendance shift documentation
- **SABR Business of the Negro Leagues research** -- for the compensation ledger reconstruction

**Sources Oscar verifies before ship:** the Effa Manley quote to Veeck, every compensation figure in the ledger, every cause-of-death classification on the timeline, every roster exodus date on the Newark case study.

---

## The Connective Tissue

### Coming in from Ch 05 The Winter Map

Ch 05 closes on the question: how does an entire system of leagues survive economically when its best players spend half the year in other countries? The chapter answers: for thirty years, it worked. Then in 1947, it stopped working.

Transition line into Ch 06:

*"For twenty years the system worked. Black teams paid Black salaries to Black players who played in front of Black crowds in stadiums that the Black community owned, leased, or filled. In 1947, that system began to dismantle. By 1962, almost all of it was gone."*

### Going out to Ch 07 The Unsigned Letter

Ch 07 documents every pre-1947 MLB tryout given to a Black player and what happened after. The collapse of the Negro Leagues was made worse because the integration that destroyed the system was so slow and so partial. Many players aged out waiting. Many never got a chance at all.

Transition line:

*"The leagues collapsed because the major leagues took the best players. But the major leagues did not take all the players. They did not even take most of them. The next chapter is about the doors that opened, the doors that did not, and the men who knocked."*

---

## The Oh Wow

There are three.

**First:** The reader presses play on the timeline animation. Thirty seconds. The system grows for twenty years. It peaks in 1946. Then in eight seconds of stage time, almost everything goes dark. The duration of the collapse is shorter than the duration of the buildup. That asymmetry is the visceral moment.

**Second:** The Newark Eagles data cards. 120,000 → 57,000 → ~25,000 → gone. Four cards in a row. No commentary needed. The arithmetic is the argument.

**Third:** The compensation ledger totals row. The total dollar amount paid by MLB to Negro Leagues franchises across the entire integration era will be a number that is smaller than the modern signing bonus for a single first-round draft pick. That number, presented in 2024 dollars, is the closer. The receipt is the argument.

---

## What Never Ships

Standard Other Box Score blocks, plus chapter-specific:

- **No "integration killed the Negro Leagues" framed as tragedy without naming the mechanism.** The chapter names the mechanism: MLB took the talent without compensating the teams. Without that mechanism, the sentence is editorial. With it, the sentence is documented.
- **No portrayal of MLB integration as villainous in itself.** Integration was right. The chapter is specifically about what the manner of integration cost the Negro Leagues, not about integration itself being wrong.
- **No romanticization of the Negro Leagues as a pure community institution untouched by financial difficulty pre-1947.** The leagues had economic struggles in the Depression. The Bronze color category exists on the timeline precisely to document that.
- **No claim that Effa Manley single-handedly established player compensation.** She established the precedent. Other owners had advocated similar things. Oscar verifies the framing.
- **No use of the phrase "decline of the Negro Leagues" without the active-voice alternative also present.** Decline is passive. The Negro Leagues did not decline. They were dismantled. The chapter uses the active voice.

---

## Build Sequence

1. Elias assembles the canonical franchise dataset from Seamheads and SABR -- every documented Negro Leagues franchise 1920-1962 with start and end years
2. Oscar establishes the cause-of-death taxonomy and classifies every franchise, with sources
3. Vera prototypes the centerpiece timeline visualization with the four most-documented franchises (Newark Eagles, Homestead Grays, Kansas City Monarchs, Indianapolis Clowns)
4. Oscar verifies every Newark Eagles data point in the case study and writes the prose
5. Oscar and Elias build the compensation ledger, including identifying every gap
6. Elias builds the survival analysis model
7. Vera ships the full centerpiece with all documented franchises
8. Ida reviews for the active-voice mandate, the mechanism naming, and the non-romanticization rule
9. Gates final review
10. Ship

**Estimated effort:** Heavy on primary source verification (compensation figures, cause-of-death classifications, Manley quote attribution). Moderate on visualization (the timeline is genuinely simple; the case study is mostly typography). Light on ML (one survival model, well-scoped). Call it four weeks of focused work, with Oscar's verification load being the schedule risk.

---

## The One Line

If someone reads only one sentence of Chapter 06, it should be in the closing paragraph at the bottom of the page:

*"The Negro Leagues did not die. They were dismantled, franchise by franchise, by the same major league baseball that had spent fifty years pretending they did not exist."*

That is the chapter. The timeline is the proof. The ledger is the receipt.
