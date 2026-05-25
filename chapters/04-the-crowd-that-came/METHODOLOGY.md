# The Crowd That Came -- Methodology
## theotherboxscore.org/chapters/the-crowd-that-came/

**Version:** 1.0
**Published:** May 2026
**Last updated:** 2026-05-25
**Reviewed by:** Elias (statistical methodology) · Oscar (historical grounding)

---

## What This Chapter Does

This chapter documents the attendance record of the East-West All-Star Game from 1933 through 1948 and places it beside the MLB All-Star Game attendance over the same period. The finding is direct: the East-West Game outdrew the MLB All-Star Game in 1936 and every year from 1942 through 1948. The peak came on August 1, 1943, when 51,723 people filled Comiskey Park to watch the Negro Leagues' midsummer classic. The MLB All-Star Game that year drew 31,938. The gap was 19,785. The chapter presents these numbers as a dual-line attendance comparison, identifies the 194 unique players who appeared in East-West rosters across those sixteen seasons, cross-references them against Baseball Hall of Fame induction records and Rate JAWS scores, and documents the community infrastructure -- fan ballot voting through Black newspapers, celebrity attendance, and split-panel press coverage -- that built the largest annual Black sporting event in America.

---

## Data Sources

### Larry Lester, *Black Baseball's National Showcase* (2020)
- **Source:** Larry Lester, *Black Baseball's National Showcase: The East-West All-Star Game, 1933-1962.* Expanded edition. NoirTech Research, 2020.
- **Coverage:** Complete game-by-game attendance, rosters, play-by-play, voting records, and contemporary press accounts for every East-West All-Star Game, 1933-1962
- **License:** Research use
- **Access date:** May 2026
- **Known limitations:** Attendance figures for some early games (1934, 1935, 1937, 1939, 1940) are round numbers that reflect contemporary newspaper estimates rather than official gate counts. Lester documents this distinction where the primary record allows.
- **How used in this chapter:** Canonical primary source for all East-West attendance figures. Every attendance number in the chapter traces back to Lester. Where Lester and secondary sources disagree, Lester is canonical. Where Lester reports a round number, the figure is labeled Estimated rather than Documented.

### Retrosheet Negro League All-Star Games
- **Source:** Retrosheet
- **URL or archive location:** retrosheet.org/NegroLeagues/EastWest.html
- **Coverage:** Box scores and game accounts for East-West All-Star Games, 1933-1962
- **License:** Public domain
- **Access date:** May 2026
- **Known limitations:** Roster data depends on surviving box scores. Some games have incomplete defensive substitution records.
- **How used in this chapter:** Secondary verification for East-West attendance figures. Primary source for game-by-game rosters used in the roster assembly (194 unique players, 1933-1948). Box score data for the 1943 East-West game used in the side-by-side box score visualization (Fig 05).

### Baseball Almanac MLB All-Star Game Attendance
- **Source:** Baseball Almanac
- **URL or archive location:** baseball-almanac.com
- **Coverage:** MLB All-Star Game attendance, 1933-present
- **License:** Public domain
- **Access date:** May 2026
- **Known limitations:** Minor discrepancies with Wikipedia and SABR figures for 1944 and 1946 (see Discrepancy Resolution below).
- **How used in this chapter:** Primary source for MLB All-Star Game attendance figures. Cross-referenced against SABR Retrosheet where spec-documented cross-reference figures are available.

### SABR Game Accounts and Journal Articles
- **Source:** Society for American Baseball Research
- **URL or archive location:** sabr.org
- **Coverage:** Multiple years, game accounts, player biographies
- **License:** Open access
- **Access date:** May 2026
- **Known limitations:** Coverage is article-by-article, not comprehensive for every game year.
- **How used in this chapter:** Supplementary sourcing for specific game details. Cross-reference verification for attendance figures where SABR Retrosheet figures are documented in the spec.

### Chicago Defender Historical Archive
- **Source:** ProQuest Historical Newspapers
- **Coverage:** 1933-1948
- **License:** Research access (ProQuest subscription)
- **Access date:** May 2026
- **Known limitations:** Digitization quality varies. Some issues have OCR artifacts that require manual verification of names and figures.
- **How used in this chapter:** Primary source for community context, contemporary reporting, Black press coverage. Specific dated editions cited for game accounts, celebrity appearances, and front-page placement claims.

### Pittsburgh Courier Historical Archive
- **Source:** ProQuest Historical Newspapers
- **Coverage:** 1933-1948
- **License:** Research access (ProQuest subscription)
- **Access date:** May 2026
- **Known limitations:** Same digitization caveats as Chicago Defender.
- **How used in this chapter:** Primary source. Wendell Smith's game coverage is the definitive contemporary sportswriting account for multiple East-West games. Used for celebrity layer sourcing and press coverage documentation.

### Amsterdam News Historical Archive
- **Source:** ProQuest Historical Newspapers
- **Coverage:** 1933-1948
- **License:** Research access (ProQuest subscription)
- **Access date:** May 2026
- **Known limitations:** New York-centric perspective. Less granular coverage of Comiskey Park games than Chicago and Pittsburgh papers.
- **How used in this chapter:** Supplementary community perspective on East-West Game coverage.

### Baseball Hall of Fame Player Records
- **Source:** National Baseball Hall of Fame and Museum
- **URL or archive location:** baseballhall.org
- **Coverage:** All inducted players through May 2026
- **License:** Public domain (factual records)
- **Access date:** May 2026
- **Known limitations:** None for the factual induction data used.
- **How used in this chapter:** Cross-reference East-West rosters against HOF induction dates for the roster display (Fig 03) and the HOF Gap analysis.

### Retrosheet 1943 MLB Game Log
- **Source:** Retrosheet
- **URL or archive location:** retrosheet.org
- **Coverage:** MLB game played on August 1, 1943
- **License:** Public domain
- **Access date:** May 2026
- **Known limitations:** None for this specific game.
- **How used in this chapter:** MLB box score for the side-by-side box score comparison (Fig 05).

---

## Data Processing

### Step 1: Attendance Figure Assembly

- **Tool:** Manual transcription from primary text, cross-referenced in JSON
- **Input:** Lester (2020) year-by-year attendance figures, Baseball Almanac MLB figures, SABR Retrosheet cross-reference figures documented in the chapter spec
- **Output:** `data/attendance.json` -- 16 records (1933-1948), each containing East-West attendance, MLB attendance, source attribution, confidence level, venue, and dated notes
- **Accuracy / success rate:** All 16 East-West figures verified against Lester. All 15 MLB figures (1945 excluded) verified against Baseball Almanac and SABR Retrosheet where available.
- **Failures and gaps:** 1945 MLB All-Star Game was not held due to wartime travel restrictions. This is recorded as a null value, not as zero. The East-West Game was played that year (33,088 attendance, Comiskey Park).

### Step 2: Attendance Discrepancy Resolution

Where sources disagree on a figure, the resolution follows a strict hierarchy:

1. **Lester (2020)** is canonical for all East-West figures.
2. **SABR Retrosheet cross-reference** is used for years where the spec documents a verified cross-reference (1942-1944, 1946-1947).
3. **Baseball Almanac** is the primary MLB source, with SABR Retrosheet preferred where both exist.

Documented discrepancies:

| Year | Figure | Lester / SABR | Wikipedia / Almanac | Resolution |
|------|--------|---------------|---------------------|------------|
| 1941 | East-West | 50,256 | 50,246 | Lester canonical: 50,256 |
| 1942 | East-West | 48,400 | 45,179 | SABR/Lester canonical: 48,400 |
| 1944 | MLB | 29,598 (SABR) | 29,589 | SABR cross-reference canonical: 29,598 |
| 1946 | East-West | 45,747 | 45,474 | SABR/Lester canonical: 45,747 |
| 1946 | MLB | 34,908 (SABR) | 34,906 | SABR cross-reference canonical: 34,908 |

Every discrepancy is documented in `data/attendance.json` in the per-year notes fields.

### Step 3: Confidence Labeling

Each attendance figure receives a confidence label from the chapter's confidence vocabulary:

- **Documented:** Figure verified from Lester primary text and confirmed by SABR Retrosheet cross-reference. Applied to: 1933, 1936, 1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948 (East-West); 1942, 1943, 1944, 1946, 1947 (MLB).
- **Verified:** Figure confirmed from at least two independent sources. Applied to: MLB figures sourced from both Baseball Almanac and Wikipedia with matching or near-matching values.
- **Estimated:** Contemporary newspaper estimate, typically a round number. Applied to: 1934, 1935, 1937, 1938, 1939, 1940 (East-West). These years show round-number attendance (25,000, 30,000, 40,000) consistent with press estimates rather than official gate counts.

### Step 4: East-West Roster Assembly

- **Tool:** Python script (`models/hof_gap.py`)
- **Input:** Retrosheet Negro League East-West All-Star Game box scores, 1933-1948 (32 games across 16 seasons, including second games in 1939, 1942, 1946, 1947, and 1948)
- **Output:** `data/east-west-rosters.json` -- complete rosters for every game, plus a deduplicated index of 194 unique players
- **Accuracy / success rate:** Rosters are transcribed directly from Retrosheet box scores. Player names follow Retrosheet conventions.
- **Failures and gaps:** Some players appear under variant spellings across years (e.g., "Alex Radcliff" vs. "Alex Radcliffe"). A name alias table in the model script resolves known variants to canonical forms. The alias table contains 7 documented mappings.

### Step 5: HOF Cross-Reference

- **Tool:** Python script (`models/hof_gap.py`)
- **Input:** 194 unique East-West players, Baseball Hall of Fame induction records (baseballhall.org), Ch 11 candidates dataset
- **Output:** HOF induction status and year for each player, recorded in `data/hof-gap.json`
- **Accuracy / success rate:** 27 of 194 East-West players were inducted into the Hall of Fame. Each induction year was individually verified against baseballhall.org, Wikipedia, and SABR records.
- **Failures and gaps:** None. HOF induction is a binary factual record.

---

## Analytical Methods

### Attendance Comparison (Fig 01)

**What it does:**
Presents the year-by-year East-West and MLB All-Star Game attendance on shared axes, 1933-1948. Identifies the crossover years when the East-West Game outdrew the MLB game.

**Why this method:**
A dual-line chart on shared axes is the most direct way to show the magnitude comparison. No normalization, indexing, or modeling is needed. The raw numbers make the argument.

**Inputs:**
16 years of paired attendance data from `data/attendance.json`. East-West figures sourced from Lester (2020). MLB figures sourced from Baseball Almanac and SABR Retrosheet.

**Parameters:**
None. This is a direct presentation of documented figures, not a modeled output.

**Outputs:**
A dual-line chart with gold (East-West, #d4a64a) and blue (MLB, #6f8aa8) lines. Years where the gold line exceeds the blue line receive a shaded fill between the two lines. The 1943 peak is indicated with a larger data point.

**Uncertainty:**
East-West figures labeled Estimated (round numbers from newspaper reports, 1934-1935, 1937-1940) may differ from actual gate counts. The chart labels these points distinctly. The crossover years (1936, 1942-1948) include only one Estimated year (1938, East-West 30,000 vs. MLB 27,067). The core finding -- that the East-West Game consistently outdrew the MLB game from 1942 through 1948 -- rests entirely on Documented figures.

**Validation:**
Every figure cross-referenced against at least two sources. All discrepancies documented and resolved per the hierarchy above.

**Limitations:**
The chart ends at 1948. The post-1948 attendance decline, driven by MLB integration drawing talent and audience from the Negro Leagues, is not shown. This is a deliberate editorial decision: Chapter 04 documents what the community built. The decline belongs in a later chapter. The reader should know: the chart's terminus is editorial, not data-driven.

---

## Machine Learning Models

### M1: HOF Gap Calculation

**Model type:** Threshold comparison (deterministic, not stochastic). Each player's Rate JAWS rank is compared against a fixed cutoff. No fitting, training, or inference is involved.

**Library / framework:** Python 3.12, standard library only (json, os). Rate JAWS scores computed upstream in Ch 10 (The Ledger) using Seamheads data.

**Training data:** Not applicable. This is a lookup and comparison, not a trained model.

**Feature set:**
- Rate JAWS score (from Ch 10, `chapters/10-the-ledger/data/rate-jaws.json`)
- Rate JAWS rank among 70 evaluated Negro Leaguers
- Career WAR (from Ch 10)
- Position (from Ch 10)
- HOF induction status and year (from Ch 11, `chapters/11-cooperstown/data/candidates.json`, supplemented by verified baseballhall.org records)

**Hyperparameters:**
- Gap threshold: top 50 of 70 evaluated Negro Leaguers by Rate JAWS rank
- Name matching: exact match only. No fuzzy matching. This deliberately accepts false negatives (missed matches due to spelling variants) over false positives (incorrect matches between players with similar names, e.g., "Jesse Williams" matching "Joe Williams"). A 7-entry alias table handles known spelling variants.

**Output:**
For each of 194 East-West players:
- HOF induction status (boolean) and year (if inducted)
- Gap flag (boolean): true if the player was not inducted and their Rate JAWS rank is in the top 50
- Gap note (string): Rate JAWS rank and career WAR for gap-flagged players

Summary: 27 inducted, 10 gap-flagged, 157 with insufficient data for evaluation.

**Confidence representation:**
- HOF induction status: Documented (factual record)
- Gap flag: Modeled (deterministic threshold applied to modeled Rate JAWS scores)
- The gap flag is explicitly labeled as model output in the chapter, not as a claim that a player should have been inducted. The visualization (Fig 03) distinguishes the gold HOF mark from the gap marker with a different indicator and a tooltip explaining the methodology.

**Known failure modes:**
- 157 of 194 players (81%) lack Rate JAWS data entirely. The gap analysis can only evaluate 37 players. This is a severe coverage limitation inherent to the sparseness of Negro Leagues statistical records.
- Rate JAWS scores are themselves modeled outputs with uncertainty (documented in Ch 10 METHODOLOGY.md). The gap calculation treats them as point estimates. This compounds uncertainty.
- The top-50-of-70 threshold is a reasonable but arbitrary cutoff. A player ranked 51st is not meaningfully different from one ranked 50th.
- Future HOF committees may induct additional players currently flagged as gaps. The analysis reflects induction records through May 2026.

**Reproducibility:**
```bash
cd chapters/04-the-crowd-that-came/models/
python hof_gap.py
```
Requires `chapters/10-the-ledger/data/rate-jaws.json`, `chapters/11-cooperstown/data/candidates.json`, and `chapters/11-cooperstown/data/hof-standards.json` to be present. Output files appear in `chapters/04-the-crowd-that-came/data/` and match the committed versions.

---

## AI-Generated Content

This chapter contains no AI-generated narrative content. The contemporary primary sources -- Lester's canonical text, Chicago Defender and Pittsburgh Courier game accounts -- are strong enough to carry the chapter without generative supplementation.

The HOF Gap calculation is a deterministic computational output, not a generative AI output. It is nevertheless labeled as Modeled in the chapter to signal that it is derived rather than directly documented.

No AI-generated text, summaries, captions, or conclusions appear in this chapter. This is deliberate: Chapter 04 opens Part Two and is the first chapter that celebrates rather than documents damage. The primary sources earn that celebration without interpolation.

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| Early attendance estimates | East-West attendance for 1934, 1935, 1937, 1938, 1939, and 1940 are round numbers from contemporary newspaper estimates, not official gate counts | Actual attendance for these years may differ from reported figures. The direction of error is unknown: newspaper estimates may overcount (for prestige) or undercount (limited tallying infrastructure). | Labeled Estimated in the data. The core finding (East-West outdrew MLB 1942-1948) does not depend on any Estimated figure. The 1936 crossover (East-West 26,400 vs. MLB 25,556) uses a Documented Lester figure, not an estimate. The 1938 crossover (East-West 30,000 vs. MLB 27,067) uses an Estimated figure and is noted as such. |
| Two-game years | In 1939, 1942, 1946, 1947, and 1948, two East-West games were played. Only the primary Comiskey Park game is used as the canonical attendance figure. | Second-game attendance is excluded from the dual-line comparison. This understates total East-West attendance for those years. | Second-game venues, dates, and attendance noted in `data/attendance.json` per-year notes. The chapter documents the two-game structure in its narrative. |
| 1945 MLB absence | No MLB All-Star Game was held in 1945 due to wartime travel restrictions. | One year of the dual-line comparison has only one data point. | Rendered as a gap in the MLB line. The East-West Game was held (33,088 at Comiskey Park). The contrast -- one game was canceled, one was not -- is itself part of the chapter's argument. |
| Rate JAWS coverage | Rate JAWS scores exist for 70 Negro Leaguers. Of 194 East-West players, 157 (81%) lack sufficient statistical data for HOF gap evaluation. | The gap analysis can evaluate only 19% of East-West participants. Many deserving players are invisible to the model. | The 157 players without data are explicitly counted in the output summary. The gap analysis is labeled as a partial view, not a comprehensive assessment. |
| Roster completeness | Retrosheet box scores may not capture every player on a game-day roster, only those who appeared in the box score (batted, pitched, or recorded a defensive play). | Players who dressed but did not play may be missing from the roster data. | The total (194 unique players) is described as "players who appeared in East-West box scores," not "players who were selected for East-West rosters." |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| 1943 East-West attendance: 51,723 | No dispute on the figure itself. Lester and SABR Retrosheet agree. Some secondary sources conflate this with the 1941 figure (50,256). | Lester (2020), SABR Retrosheet | Documented. Both years appear in the data with distinct figures. The chapter's narrative distinguishes 1943 (record) from 1941 (second-highest). |
| 1942 East-West attendance: 48,400 | Wikipedia lists 45,179 for the Comiskey game. SABR cross-reference and Lester report 48,400. | Lester (2020), SABR Retrosheet, Wikipedia | Documented. SABR/Lester figure (48,400) is canonical. Discrepancy noted in data file. |
| 1946 East-West attendance: 45,747 | Wikipedia lists 45,474. SABR cross-reference and Lester report 45,747. | Lester (2020), SABR Retrosheet, Wikipedia | Documented. SABR/Lester figure (45,747) is canonical. Discrepancy noted in data file. |
| 1941 East-West attendance: 50,256 | Wikipedia lists 50,246. Lester reports 50,256. | Lester (2020), Wikipedia | Documented. Lester figure (50,256) is canonical. |
| 1936 as first crossover year | The 1936 East-West attendance (26,400) exceeded the MLB All-Star Game (25,556), but the 1938 comparison (30,000 vs. 27,067) uses an Estimated East-West figure. | Lester (2020), Baseball Almanac | 1936 is presented as the first crossover year (Documented). 1938 is noted as a crossover year with an Estimated East-West figure. |

---

## Cross-League Comparisons

### East-West vs. MLB All-Star Game Attendance

**Assumption 1:** Attendance figures from both games are directly comparable as counts of people present at a single venue on a single date.

**Assumption 2:** The MLB All-Star Game is the appropriate comparison point. Both were annual midsummer showcase games, both were single-game events (before two-game years), and both drew from a national audience base. The comparison is of institutional scale, not quality of play.

**Assumption 3:** For two-game East-West years (1939, 1942, 1946-1948), only the primary Comiskey Park game is compared. This understates total East-West attendance but provides an apples-to-apples single-game comparison.

**Precision cost:** Round-number East-West estimates for six early years (1934-1935, 1937-1940) reduce precision for those data points. The core finding (sustained crossover from 1942 through 1948) rests entirely on Documented figures.

**Calibration:** No calibration is needed. These are counts of people, not derived statistics. The figures are what they are.

**Confidence interval:** Not applicable to raw attendance data. Estimated figures (round numbers) have unknown error bounds; Documented figures (precise counts) are taken as ground truth per source hierarchy.

---

## Reproducibility

**Code:** The HOF Gap calculation script is at `chapters/04-the-crowd-that-came/models/hof_gap.py` and is MIT licensed.

**Data:** All pre-computed outputs are in `chapters/04-the-crowd-that-came/data/` and are CC0 licensed:
- `attendance.json` -- 16-year attendance comparison with full source attribution
- `east-west-rosters.json` -- complete rosters, 32 games, 194 unique players
- `hof-gap.json` -- HOF induction status and gap analysis for all 194 players

**Raw data:** Retrosheet data is publicly available at retrosheet.org. Baseball Almanac data is publicly available at baseball-almanac.com. Lester (2020) is available through booksellers and research libraries. Black newspaper archives require ProQuest Historical Newspapers access through a subscribing institution.

**Environment:** Python 3.12. No external dependencies beyond the standard library. Requires Ch 10 and Ch 11 data files in their expected locations (see script header for paths).

**Runtime:** Under 1 second on standard hardware.

To reproduce:
```bash
cd chapters/04-the-crowd-that-came/models/
python hof_gap.py
```

Output files appear in `chapters/04-the-crowd-that-came/data/` and match the committed versions.

---

## Confidence Vocabulary Applied

This chapter uses the following confidence terms at the point of claim:

| Term | Usage in this chapter |
|------|----------------------|
| Documented | Attendance figures verified from Lester primary text and confirmed by SABR Retrosheet cross-reference. HOF induction records. Game dates, venues, scores, and roster appearances from Retrosheet box scores. |
| Verified | MLB attendance figures confirmed from at least two independent sources (Baseball Almanac, Wikipedia, SABR Retrosheet). |
| Estimated | East-West attendance figures for years where Lester reports a round number consistent with contemporary newspaper estimates rather than official gate counts (1934, 1935, 1937, 1938, 1939, 1940). |
| Modeled | HOF Gap flag output. Deterministic threshold applied to Rate JAWS scores (themselves modeled in Ch 10). Labeled as model output in the visualization, not as fact. |

The terms Reported, Reconstructed, Disputed, and AI-generated are not used in this chapter. No claim in the chapter depends on a single secondary source without cross-reference. No data is reconstructed from fragmentary evidence. All disputes are resolved per the source hierarchy. No content is AI-generated.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 0.1 | 2026-05-25 | Skeleton |
| 1.0 | 2026-05-25 | Full methodology document |

---

## Citation

```
Cite this chapter:
Haynes, Jeremy. "The Crowd That Came." The Other Box Score,
theotherboxscore.org/chapters/the-crowd-that-came/, 2026.

Chicago:
Haynes, Jeremy. "The Crowd That Came." The Other Box Score.
May 2026. https://theotherboxscore.org/chapters/the-crowd-that-came/.

Data (CC0):
The Other Box Score. "East-West All-Star Game Attendance Dataset."
CC0 1.0. https://github.com/other-boxscore/chapters/04-the-crowd-that-came/data/.
2026-05-25.

Primary data source:
Lester, Larry. Black Baseball's National Showcase: The East-West
All-Star Game, 1933-1962. Expanded edition. NoirTech Research, 2020.
```

---

## Questions and Corrections

If you find an error in this methodology, open an issue at github.com/other-boxscore/chapters/04-the-crowd-that-came/issues or email the project maintainer. Corrections are documented in the version history above.
