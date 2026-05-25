# Chapter 07 · The Unsigned Letter
## Full Specification v1.0

**Platform:** theotherboxscore.org
**Part:** Three · The Record That Wasn't Kept
**Chapter:** 07
**Slug:** the-unsigned-letter
**Status:** SPEC COMPLETE
**Last updated:** May 2026

---

## The Hook

> "Hey, have you heard of Marvin Williams?"

Then the timeline loads.

Marvin Williams was the second baseman who tried out at Fenway Park on April 16, 1945, alongside Jackie Robinson and Sam Jethroe. He never received a Major League contract. Robinson signed with Brooklyn six months later. Jethroe signed with the Boston Braves in 1950 and won National League Rookie of the Year at age 33. Williams played fifteen more seasons in the Negro Leagues and the Mexican League, hit .362 for Mexico City in 1945, and went home.

The hook copy in Oscar's voice:

*"He worked out at Fenway on the same morning as Jackie Robinson. He had the same swing scouts were paid to evaluate. He never got the letter."*

The chapter is titled for the letter Marvin Williams never received.

---

## The Argument

**Core thesis:** The tryouts were performative. The closed door was a decision, not an oversight. The timeline of who got auditioned and what happened next is documented evidence that integration was deliberately delayed by specific franchises in specific years.

**What "performative" means in this chapter:**

A tryout that was scheduled because of external pressure (newspaper activism, political pressure, civil rights organizing), held under conditions that made signing impossible (90 minutes, with the GM absent, with no follow-up communication), and followed by years of inaction by the same franchise -- that is a performative tryout. The chapter applies this definition consistently and documents which tryouts meet it.

**Why the chapter does not soften this:**

Because the documented record does not soften it. The Boston Red Sox held the first documented MLB tryout for Black players in April 1945. They were the last team to integrate, in July 1959. The fourteen-year gap is the argument. The chapter does not have to editorialize about it. It just has to show it.

**What the chapter is not:**

It is not an argument that integration itself was bad. Integration was right. The chapter is specifically about how the manner of integration -- particularly the use of performative tryouts that allowed franchises to claim openness while practicing exclusion -- was a documented institutional choice. Naming that choice is the chapter.

**The closer:** The Red Sox who held the first tryout were the last team to integrate. The same Sam Jethroe they auditioned in 1945 won NL Rookie of the Year for the Boston Braves in 1950 -- same city, different ownership, different decision. The choice to keep the door closed was a choice. The chapter ends on the receipt for that choice.

---

## The Centerpiece: The Tryout-to-Integration Timeline

A single horizontal timeline visualization. Spans 1945 to 1959. Sixteen MLB franchises, each as a horizontal swimlane. Within each swimlane, two kinds of events plotted:

### Event types

- **Tryout dots (--bronze):** Every documented MLB tryout extended to a Black player, dated, with the players' names attached
- **Integration markers (--moss):** The date each franchise's first Black player debuted in an MLB game, with the player's name

### The visual argument

For most franchises, the tryout dot and the integration marker are reasonably close in time, or the franchise integrated without ever holding a documented tryout. For specific franchises, the gap between tryout dot and integration marker is wide -- sometimes years wide. That gap is the visual argument.

The Boston Red Sox swimlane is the chart's spine:

```
1945                                                              1959
●─────────────────────────────────────────────────────────────────●
April 16, 1945                                              July 21, 1959
Robinson, Jethroe, Williams                                Pumpsie Green
tryout at Fenway                                           first MLB game

                                14 YEARS, 3 MONTHS, 5 DAYS
```

The annotation between the two dots reads, in IBM Plex Mono small caps: **14 YEARS, 3 MONTHS, 5 DAYS**.

That annotation is the chapter title in chart form.

### The other swimlanes

- **Brooklyn Dodgers:** Tryout April 1945 at Bear Mountain (Joe Bostic's surprise audition of Terris McDuffie and Showboat Thomas, both past prime). Integration April 15, 1947 with Robinson. Gap: two years. The shortest gap on the chart.
- **Pittsburgh Pirates:** Tryout announced July 1942 (Daily Worker pressure, Wendell Smith was to select candidates). Abandoned by end of August 1942. Integration April 13, 1954 with Curt Roberts. Gap: nearly twelve years between announced tryout and integration.
- **Boston Braves:** Tryout scheduled in 1945, never held (FDR's death cited). Integration April 18, 1950 with Sam Jethroe. Gap: five years.
- **Cleveland Indians:** No documented tryout. Integration July 5, 1947 with Larry Doby. (Veeck paid Effa Manley.)
- **St. Louis Browns:** No documented tryout. Integration July 17, 1947 with Hank Thompson.
- **New York Giants:** No documented tryout. Integration July 8, 1949 with Hank Thompson and Monte Irvin same day.
- **Chicago White Sox:** Integration May 1, 1951 with Minnie Miñoso.
- **Philadelphia Athletics:** Integration September 13, 1953 with Bob Trice.
- **Chicago Cubs:** Integration September 17, 1953 with Ernie Banks.
- **St. Louis Cardinals:** Integration April 13, 1954 with Tom Alston.
- **Cincinnati Reds:** Integration April 17, 1954 with Nino Escalera (Puerto Rican) and Chuck Harmon.
- **Washington Senators:** Integration September 6, 1954 with Carlos Paula.
- **New York Yankees:** Integration April 14, 1955 with Elston Howard. (Yankees specifically researched in case study below.)
- **Philadelphia Phillies:** Integration April 22, 1957 with John Kennedy.
- **Detroit Tigers:** Integration June 6, 1958 with Ozzie Virgil.
- **Boston Red Sox:** Integration July 21, 1959 with Pumpsie Green.

### Interaction

- **Hover any dot or marker:** Reveals card with player name, date, context, primary source
- **Click any swimlane label:** Opens franchise detail drawer
- **Filter:** Toggle to highlight only swimlanes with documented tryout dots, isolating the gap pattern
- **Sort:** Default is by integration date. Toggle to sort by tryout date. Toggle to sort by length of gap. (The sort-by-gap view is the chart's hardest hit.)

### The animation, if pressed

The chart scrubs from 1945 to 1959 in twenty seconds. Tryout dots appear in the first three seconds (most of the documented tryouts happened in 1945-1946). Integration markers appear over the next seventeen seconds, in sequence. The reader watches the Red Sox swimlane stay empty as the others fill in. The empty swimlane is the visceral moment.

---

## The Tryout Database

A complete, documented database of every pre-integration MLB tryout extended to a Black player, 1942-1947. Presented as a sortable table below the centerpiece timeline.

### Schema

| Date | Team | Players | Location | Outcome | Result | Source confidence |
|------|------|---------|----------|---------|--------|---------|
| Jul 1942 | Pittsburgh Pirates | Wendell Smith to select | (announced, never held) | Abandoned Aug 1942 | No signings | Documented |
| Apr 6 1945 | Brooklyn Dodgers | Terris McDuffie, Showboat Thomas | Bear Mountain, NY | Tryout held | No signings | Documented |
| Apr 16 1945 | Boston Red Sox | Jackie Robinson, Sam Jethroe, Marvin Williams | Fenway Park | 90-minute workout | No signings | Documented |
| (other documented tryouts as Oscar verifies) | | | | | | |

**Oscar's job before publication:** Verify every entry against primary sources. The Wendell Smith Papers at the Baseball Hall of Fame are the principal archive. The Pittsburgh Courier and Chicago Defender are the contemporaneous press record. Eddie Collins's correspondence with Smith (April 27, 1945) is documented at the Hall of Fame. SABR BioProject entries for Marvin Williams, Sam Jethroe, and Jackie Robinson are starting points, not endpoints.

**Sample size:** Likely four to seven documented tryouts. The number is small precisely because the practice was small. The point is not the count. The point is that the practice existed at all, and that it was followed by years of inaction.

### The methodology note

Every row in the database carries a source confidence rating from the platform vocabulary:

- **Documented:** Primary source verification (newspaper coverage at time, archival correspondence, player interview at time)
- **Verified:** Multiple secondary sources agree
- **Reported:** Single secondary source, no primary verification yet
- **Disputed:** Sources conflict

A tryout cannot appear in the centerpiece visualization unless it is Documented or Verified. Reported tryouts appear in the database with a footnote. Disputed cases are flagged explicitly.

---

## The Case Study: Fenway Park, April 16, 1945

Below the timeline and database, a dedicated section. Same depth treatment as the Newark Eagles case study in Ch 06. The chapter's spine.

### The data block

Four cards in IBM Plex Mono:

```
APRIL 16 1945            APRIL 16 1945            OCTOBER 1945            APRIL 15 1947
THREE PLAYERS            DURATION                 ROBINSON SIGNS           ROBINSON DEBUTS
TRY OUT AT               90 MINUTES               WITH MONTREAL            FOR BROOKLYN
FENWAY PARK              NO SIGNINGS              (DODGERS FARM)           DODGERS

                                                                          JULY 21 1959
                                                                          PUMPSIE GREEN
                                                                          DEBUTS FOR
                                                                          RED SOX
```

The cards establish the chronology without commentary. The arithmetic is the indictment.

### The three players, in baseball-card format

Three cards, same Lost Seasons proportions as Ch 02.

**Jackie Robinson** -- Kansas City Monarchs. Age 26 at the tryout. Signed October 1945 with the Dodgers organization. MLB debut April 15, 1947. Hall of Fame, 1962.

**Sam Jethroe** -- Cleveland Buckeyes. Age 27 at the tryout. Said of the Red Sox afterward: *"We'll hear from the Red Sox like we'll hear from Adolf Hitler."* Signed by the Boston Braves in 1949 after being purchased from the Dodgers organization. MLB debut April 18, 1950, at age 32. NL Rookie of the Year, 1950. Out of MLB by 1954. Later sued MLB for a pension on the basis that he had been turned down in 1945 for being Black.

**Marvin Williams** -- Philadelphia Stars. Age 25 at the tryout. Hit .362/.407/.633 for Mexico City in 1945, the season after the tryout. Played fifteen more years across the Negro Leagues, Mexican League, Pacific Coast League. Never received an MLB contract.

Each card sourced. Oscar verifies the Jethroe quote against Wendell Smith's contemporaneous Pittsburgh Courier reporting. The Williams batting line is from Seamheads and the SABR BioProject entry. The Robinson signing date is from Branch Rickey's documented contract record.

### The pulled quote

Below the cards, in the platform's quote treatment:

> *"We knew we were wasting our time."*
>
> Jackie Robinson, recalling the Fenway tryout in 1972

The quote is from the Boston Globe, 1972, in an interview Robinson gave more than two decades after the tryout. It is the cleanest, most direct line from a participant. Oscar verifies attribution against the original Globe piece.

### The context block

A short prose block, no more than four paragraphs, that establishes:

1. **Why the tryout happened:** Boston city councilman Isadore Muchnick had threatened to revoke the Red Sox' Sunday game permit. Wendell Smith, the sports editor of the Pittsburgh Courier, organized the players. The pressure was external. The Red Sox front office did not initiate the tryout.

2. **What the tryout was:** Ninety minutes. Infield practice. Batting practice against Red Sox pitchers. No GM follow-up. The Red Sox did not contact the players afterward. Smith had to write Eddie Collins to ask the outcome.

3. **What Eddie Collins wrote back:** His April 27, 1945 letter to Smith cited Joe Cronin's broken leg and "concerns over Negro league contracts." The letter is in the Wendell Smith Papers at the Baseball Hall of Fame Library. Oscar verifies the citation. The letter is a primary source document the platform should consider photographing for the chapter, with Hall of Fame permission.

4. **What happened next:** Nothing, for fourteen years. The Red Sox owner Tom Yawkey continued operating the franchise without a Black player. Pumpsie Green's eventual signing in 1959 was forced by a Massachusetts Commission Against Discrimination investigation. The MCAD investigation itself is a documented administrative record.

The context block establishes the mechanism. The cards establish the chronology. The quote closes the section.

---

## The Yankees Case: A Counter-Case Study

A second, briefer case study. Necessary for honest argument.

The Yankees were not the last team to integrate. They were a middle-of-the-pack integrator -- April 14, 1955, with Elston Howard. But the Yankees are a documented case of a franchise that explicitly and repeatedly declined to sign Black players in the late 1940s and early 1950s while other teams did, and the documented record on Yankees management commentary in that period is unambiguous.

**The reason to include this case:** To prove the chapter's argument is not just "the Red Sox were bad." The pattern of delay was institutional. The Yankees are a different mechanism (no documented tryout, just years of declining to sign while running the league's most profitable franchise) but the same outcome (years of delay relative to the league's earliest integrators).

This case study is shorter -- one paragraph, three documented quotes from Yankees management of the period, integration date marker. Oscar handles the source verification. The point of including it is structural: the argument must hold beyond the most extreme case. The Yankees prove it does.

---

## The Three Forces Diagram (Reprise)

Ch 06 introduced three forces: Player Extraction, Fan Migration, Revenue Collapse. Ch 07 introduces a fourth, specific to this chapter:

**Performative Acquiescence.** The pattern by which MLB franchises responded to external pressure (newspaper activism, civil rights organizing, political pressure) with public gestures (announced tryouts, scouting trips) that were not followed by signings, allowing the franchise to claim openness while continuing to practice exclusion.

This is presented as a single labeled node with three connected examples:

- Pittsburgh Pirates 1942: announced tryout under Daily Worker pressure, abandoned within weeks
- Boston Red Sox 1945: held tryout under Muchnick pressure, declined to sign
- Boston Braves 1945: scheduled tryout, never held

The diagram is austere: one node, three citations, sources. No graph theory. The point is the labeled mechanism.

---

## The Long Tail: Players Who Aged Out

A supporting visualization, smaller than the centerpiece. A scatter plot.

- X-axis: Player's age at MLB integration
- Y-axis: Player's documented Negro Leagues career WAR (using the Ch 10 Ledger model, when that ships; until then, Seamheads career stats as a proxy)
- Each dot is a Negro Leagues player who was active when integration began
- Dots above a certain age and below a certain MLB signing line represent players who were good enough to play in the majors but were too old by the time the doors opened in their direction

The plot makes visible the entire generation of players who lived through the closed door. Some, like Satchel Paige, made it across into MLB but only at the end of their careers. Others, like Marvin Williams, never got the call at all. The cluster of dots that should have crossed the line but did not is the chapter's quietest argument.

**Methodology note:** This visualization depends on the Ch 10 Ledger model output. Until Ch 10 ships, this scatter plot uses Seamheads career statistics as the y-axis instead of modeled WAR. Elias confirms the substitution is methodologically sound before ship and replaces the data when Ch 10 is ready.

---

## ML and Models

Light ML lift, intentionally. Ch 07 is a primary-source verification chapter, not a statistical reconstruction chapter. The heavy modeling lives in Ch 10 (Ledger), Ch 11 (Cooperstown), Ch 12 (Other Hall), and Ch 08 (Parallel League).

**The one model that does matter:**

A simple counterfactual: given the documented tryout outcomes (player, year, age at tryout, subsequent Negro Leagues performance), what is the probability distribution over plausible MLB careers if the tryout had resulted in a signing? Elias builds this for the three Fenway 1945 players (Robinson, Jethroe, Williams) as a focused demonstration, using the same model architecture that Ch 10 will use for the full Ledger.

For Robinson, the model output should approximate his actual career -- a sanity check that the model is calibrated. For Jethroe, the model should show the career he actually had at the Braves, plus the years he lost waiting. For Williams, the model produces a counterfactual MLB career for a player who never received one.

The three-player counterfactual block sits at the bottom of the case study section. It is restrained, not flashy. The argument is documented; the model adds dimension. The Williams output is the chapter's most quietly devastating chart.

---

## Data Sources

- **Wendell Smith Papers** -- National Baseball Hall of Fame Library, the principal archive
- **Pittsburgh Courier** -- 1942-1947, contemporaneous reporting on every documented tryout
- **Chicago Defender** -- same period, secondary coverage
- **SABR BioProject** -- entries for Jackie Robinson, Sam Jethroe, Marvin Williams, Pumpsie Green, every player named in the database
- **Seamheads Negro Leagues Database** -- career statistics for every player in the database, calibration data for the counterfactual model
- **Baseball Reference** -- MLB integration dates, debut games, roster verification
- **Boston Globe archives** -- 1945 contemporaneous coverage, the 1972 Robinson interview, Pumpsie Green debut coverage
- **The MCAD investigation file (Massachusetts Commission Against Discrimination)** -- administrative record forcing the 1959 Red Sox integration. May require an open-records request. Oscar tracks the status.
- **Eddie Collins's correspondence with Wendell Smith** -- Wendell Smith Papers, Baseball Hall of Fame, April 1945
- **James Overmyer, *Queen of the Negro Leagues*** -- for the Effa Manley correspondence that intersects this chapter
- **Glenn Stout, *Tryout and Fallout*** -- academic treatment of the Fenway tryout, useful secondary source but Oscar verifies all primary claims independently
- **History Cooperative, *Tryout and Fallout*** -- same essay, additional detail

**The platform's research note for this chapter:** Photographing or scanning the Eddie Collins letter, with Hall of Fame permission, would be a powerful addition. The platform's research budget should target one or two primary-source artifact images per Part Three chapter where the source is short enough to display directly.

---

## The Connective Tissue

### Coming in from Ch 06 The Collapse

Ch 06 closes on the dismantling of the Negro Leagues. Ch 07 opens on a different question: even as the doors were beginning to open in 1947, why did they open so slowly, and for whom, and at what cost?

Transition line:

*"The major leagues took the best players. But they did not take all the players. They did not even take most of them. The doors opened by inches, on schedules the franchises controlled, and the men who knocked first did not always get an answer."*

### Going out to Ch 08 The Salary Ledger

Ch 08 documents total wages stolen -- the dollar value of careers paid below the major league market. Ch 07 sets up the question of *which* careers, and *how many*, were affected. The transition:

*"Some of the men who knocked got an answer. Most did not. The next chapter is about what the answer should have been worth, in dollars, for every one of them."*

---

## The Oh Wow

There are three.

**First:** The Red Sox swimlane. The reader scans the chart, looking for the Red Sox row, and sees the empty fourteen-year stretch between the 1945 tryout dot and the 1959 integration marker. The annotation reads **14 YEARS, 3 MONTHS, 5 DAYS**. That number, presented in the platform's small-caps mono treatment, is the chapter title in chart form.

**Second:** The Sort by Gap toggle. The reader can re-sort the timeline by the length of the gap between tryout and integration. The Red Sox jump to the top. The Pirates land second. The pattern that was scattered becomes ranked. The ranking is the receipt.

**Third:** The Marvin Williams card. Three players tried out at Fenway on April 16, 1945. One became Jackie Robinson. One became NL Rookie of the Year, five years late. One played fifteen more seasons, hit .362 in Mexico, and never got the letter. The card is quiet. The argument is loud.

---

## What Never Ships

Standard Other Box Score blocks, plus chapter-specific:

- **No reduction of integration to a single date.** Integration was sixteen separate dates, each one an institutional decision. The chapter uses the plural and shows the dates.
- **No use of "the Red Sox were last to integrate" without naming Tom Yawkey.** Institutions are made of people. The chapter names the people whose decisions are documented.
- **No suggestion that the performative tryouts were sincere efforts in retrospect, regardless of franchise PR claims to the contrary today.** The Yawkey Foundation's modern framing of Red Sox integration history is acknowledged in a footnote and not allowed to soften the chapter's argument. The documented record, not modern PR, is the source.
- **No quoting Wendell Smith without citing him.** Smith was the journalist who organized the Fenway tryout and the principal contemporaneous chronicler of MLB's resistance to integration. His byline appears every time his reporting does.
- **No racial slur reproduction.** The Fenway tryout has a contested but documented racial slur reportedly shouted from the stands or from the front office during the workout. The chapter notes the documented allegation and the source, but does not reproduce the slur. The presence of the report is the historical record; reproducing the language is not necessary to make it.

---

## Build Sequence

1. Oscar verifies every entry for the tryout database against primary sources (Wendell Smith Papers, Pittsburgh Courier, Chicago Defender, SABR BioProject)
2. Oscar verifies every MLB team's integration date and first Black player against Baseball Reference and team-specific primary sources
3. Elias builds the canonical dataset combining tryout dates and integration dates with confidence ratings
4. Vera prototypes the centerpiece timeline with the Red Sox swimlane first
5. Vera builds the four sort modes (by integration date, by tryout date, by gap, by team alphabetical)
6. Oscar writes the Fenway 1945 case study prose
7. Oscar pursues Hall of Fame permission to display the Eddie Collins letter (research note)
8. Elias builds the three-player counterfactual model for the case study
9. Elias builds the "aged out" scatter plot, with the Seamheads-data fallback for the y-axis pending Ch 10
10. Oscar writes the Yankees counter-case study with verified citations
11. Ida reviews for the active-voice mandate, the no-single-date rule, the no-racial-slur rule, and the performative-tryout consistency
12. Gates final review
13. Ship

**Estimated effort:** Heavy on primary-source verification and archival research. Moderate on visualization (the timeline is conceptually simple, but the four sort modes require thoughtful interaction design). Light on ML (three-player counterfactual is a focused application of the Ch 10 model architecture, well-scoped). Call it four to five weeks of focused work, with Oscar's archive verification load being the schedule risk.

---

## The One Line

If someone reads only one sentence of Chapter 07, it should be in the closing paragraph at the bottom of the page:

*"The Red Sox held the first documented tryout for Black players in April 1945, and were the last team in baseball to put a Black player on the field, fourteen years later. The two facts are the same fact."*

That is the chapter. The timeline is the proof. The empty swimlane is the receipt.
