# The Shadow Nine
## Feature Specification v1.0

**Platform:** theotherboxscore.org
**Type:** Standalone interactive feature
**Location:** Global nav, accessible from every page
**Status:** SPEC COMPLETE
**Last updated:** May 2026

---

## The Pitch

The reader builds a nine-position MLB lineup. For each player they pick, the platform reveals the Negro Leagues player whose style and statistical profile most closely matches. When the lineup is complete, the reader sees two lineup cards side by side. Same nine positions. Two parallel rosters. The MLB nine the reader chose, and the Negro Leagues shadow nine the data found.

The feature lives in the platform's global navigation under the label **The Shadow Nine** and is accessible from every page on the site.

---

## The Argument

The Other Box Score's central thesis is that the Negro Leagues were a parallel major league. Every chapter argues this with documented evidence. The Shadow Nine argues it interactively, at the position level, in a format every baseball fan understands: the lineup card.

The argument the feature makes:

*For every great MLB player, there is a Negro Leagues player at the same position whose style and statistical profile is comparable. They were not unknowns. They were not lesser talents. They were professionals at the same level of the same game, separated by the institutional decision documented across the other fourteen chapters of this platform.*

The feature does not editorialize. The model does the matching. The lineup card displays the result. The argument is made by the equivalence.

**What the feature is not:** It is not a claim that any specific match is statistically perfect. Some matches will be strong; some will be approximate; some will be weaker than others. The feature is transparent about that. Every match displays its similarity score. The point is not that the match is exact. The point is that the match exists at all.

---

## The User Experience

### Entry point

The reader clicks **The Shadow Nine** in the global nav. The feature opens to a clean landing view with two elements:

- A short framing statement (two sentences, in the platform voice): *"Build your nine. For every MLB player you pick, the Negro Leagues player closest to their style and statistical profile appears in the opposing card. Same nine positions. Two parallel rosters."*
- A primary call-to-action: **Build Your Lineup**

### Building the lineup

The reader is presented with a lineup card on the left side of the screen, nine empty slots labeled by position: C, 1B, 2B, 3B, SS, LF, CF, RF, DH/UTIL. (DH/UTIL is the ninth slot because the National League had no DH for most of baseball history and Oscar handles the era-appropriate treatment.)

For each position, the reader clicks the slot and is presented with a searchable picker:

- The picker shows MLB players who played that position
- Filter pool: all MLB position players with 1,000+ career games at that primary position
- Search: type the player's name
- Browse: filter by era (Dead Ball / Live Ball / Post-Integration / Modern / Contemporary)
- Sort: by name, by career WAR, by career length

When the reader selects a player, the slot fills with that player's name and a small photograph (Lahman database baseball cards, public domain where available). The picker closes.

Simultaneously, the right-hand lineup card fills in the Negro Leagues match for that position. The shadow card updates in real time as the reader builds.

### When the lineup is complete

All nine slots filled, the screen presents the two completed lineup cards side by side. The reader can:

- **Toggle view:** Switch between lineup card view and field diagram view (described below)
- **Click any pair:** Open a detail drawer for that single matchup
- **Share:** Generate a permanent URL for the lineup
- **Reset:** Start over

### The field diagram view

A toggle at the top of the page switches between two displays:

**Lineup Card view (default):** Two traditional lineup cards, paper-and-ink aesthetic, batting order 1-9, position labels, player names, small photographs. The cards are formatted identically, framed in the same border, presented as parallel artifacts. The format equality argument made explicit.

**Field Diagram view:** A baseball diamond from the broadcast camera angle, with each fielding position labeled. The MLB names appear in their positions. A subtle toggle (or hover) reveals the NLB names underneath at the same positions. Same diamond. Two sets of names. The reader can flicker between the two with a single click.

The toggle persists across sessions via localStorage. Reader preference remembered.

### The detail view

The reader clicks any single position pair. A detail drawer opens from the right side of the screen, showing:

**Header:** Position label, similarity score (large, in IBM Plex Mono, on a scale of 0-100)

**Two player cards side by side:**
- Full name, years active, primary team(s), birthplace, position
- Career rate stats (BA, OBP, SLG, ISO, K%, BB%, era-adjusted OPS+ equivalent)
- The six qualitative tags (Hit tool, Power, Approach, Speed, Glove, Arm)
- Public domain photograph

**Match explanation:**
- A short paragraph from Oscar (50-100 words) explaining the match. Not generated -- written by Oscar, one paragraph per NLB player in the matching pool, drawn from his research notes.
- A similarity vector diagram showing which feature dimensions matched strongly and which did not. (Six radial axes, two overlapping shapes -- one for each player.)

**See other candidates:**
- Click-to-expand button labeled "See other candidates"
- Reveals the next 2-3 NLB players at the position, ranked by similarity score
- Each candidate shows name, score, one-line summary
- The reader can click any candidate to view that pair instead

**Provenance footer:**
- Sources for the NLB player's data (Seamheads season, secondary source for qualitative tags)
- Confidence rating for the NLB data: Documented / Verified / Reported / Disputed
- Link to the methodology page

### The share artifact

The reader clicks Share. The feature generates a permanent URL:

```
theotherboxscore.org/shadow-nine/lineup/[8-character-id]
```

The URL renders the same lineup view. Open Graph metadata renders a preview image: a single image showing both lineup cards side by side, the platform logo, and the headline *"A Shadow Nine"*. The image is generated server-side from the lineup data.

The share text (default):

*"I built my Shadow Nine at The Other Box Score. My MLB lineup found nine Negro Leagues parallels -- [count] of them in the Negro Leagues Hall of Fame, [count] not yet. Build yours."*

The reader can edit the text before sharing. The URL persists indefinitely.

---

## The Model

This section is the platform's most visible statistical claim. Elias owns it. Gates will block if the methodology is not airtight.

### The feature universe

**MLB pool:** All position players in the canonical MLB record with 1,000+ career games at their primary position. Approximately 2,000 players across all of MLB history.

**NLB pool:** All Negro Leagues position players in the Seamheads canonical record with sufficient career documentation to support the qualitative tag work. The threshold is determined by Oscar in consultation with Elias. The expected pool is 400-600 players.

### The matching feature vector

Each player is represented as a feature vector with two halves:

**Quantitative half (statistical profile, era-adjusted):**
- Position (hard filter; never match a catcher to a center fielder)
- Handedness (bats / throws)
- Career rate statistics: BA, OBP, SLG, ISO, K%, BB%
- Career counting context: peak season production, career length in games, career length in seasons
- Era-adjusted offensive value (OPS+ equivalent normalized against the player's league-year context)

**Qualitative half (six tags, Oscar-assigned for NLB players, secondary-source-derived for MLB players):**
- **Hit tool:** Pure hitter / Line-drive contact / Power hitter / Slugger / Free swinger
- **Power:** Gap power / Pull power / All-fields power / Opposite-field power / Below-average power
- **Approach:** Patient / Selective / Aggressive / Two-strike specialist / Free swinger
- **Speed:** Burner / Plus runner / Average / Station-to-station / Slow
- **Glove:** Plus defender / Above-average defender / Average / Bat-first / Defensive liability
- **Arm:** Cannon / Plus / Average / Below-average

Each player gets exactly one value per category.

### Era adjustment

This is the model's most consequential methodological choice. The math:

For each player's career rate stats, the model computes the player's value against the league average for the years and league they played in. A .380 hitter in 1925 NLB is adjusted against the 1925 NLB league BA. A .380 hitter in 1995 MLB is adjusted against the 1995 MLB league BA.

The output is a normalized offensive metric (OPS+ equivalent) that allows cross-era comparison. The methodology follows established SABR practice, adapted for the NLB context using Seamheads league-average data.

**Critical methodology disclosure:** The era adjustment depends on Seamheads league-average data being accurate. Where Seamheads has gaps (specific NLB seasons with incomplete documentation), the model uses interpolated league averages flagged with the **Reported** confidence rating. Elias documents every interpolation explicitly in the methodology page.

### The matching algorithm

K-nearest-neighbors on the combined feature vector:

1. **Filter by position.** Only NLB players at the same primary position as the MLB pick are considered.
2. **Compute distance.** Euclidean distance in the feature space, with the qualitative tags one-hot encoded and weighted equally with the statistical features. Specific feature weights are set by Elias and documented in the methodology page.
3. **Rank candidates.** The five closest NLB players are returned, ranked by distance.
4. **Convert to similarity score.** Distance is converted to a 0-100 similarity score using a calibrated transform. 100 = identical profile. 60 = approximately similar. Below 50 = the model considers this a weak match.
5. **Return top candidate by default.** With the next two candidates available via click-to-expand.

### Confidence tiers

Every match returned by the model is assigned a confidence tier:

- **Strong (80-100):** The MLB and NLB profiles align across most feature dimensions.
- **Moderate (60-79):** The profiles align on the main features but diverge on some dimensions.
- **Weak (below 60):** The profiles are the closest available match at the position, but the alignment is approximate. The interface labels this clearly.

A match below 60 still ships. The honesty is the point. The interface does not hide weak matches -- it labels them. The reader sees what the data supports.

### What the model does not do

- It does not weight by hall-of-fame status, fame, or modern reputation
- It does not adjust for park factors beyond the era adjustment
- It does not attempt to project NLB career value into MLB context (that is the Ch 10 Ledger model)
- It does not "improve" matches based on aesthetic considerations -- if Buck Leonard and Lou Gehrig come out at 84% similarity, that is the number, even though their cultural symmetry is greater than 84%
- It does not include pitchers (pitcher matching is a separate, future feature)

---

## The Qualitative Tag Work

The model's success depends on the qualitative tag work being defensible. This is Oscar's heaviest editorial lift on the entire platform.

### Oscar's process

For every NLB player in the matching pool (approximately 400-600 players), Oscar assigns exactly one value per category across the six categories. The process:

1. **Primary source review.** Oscar consults the Seamheads career data, the SABR BioProject entry, and any documented contemporary newspaper coverage for the player. The Pittsburgh Courier and Chicago Defender archives are the principal sources.
2. **Player testimony where available.** Oral history records from the Negro Leagues Baseball Museum and other archives include player descriptions of their own and teammates' styles.
3. **Tagging session.** Oscar assigns each tag with a one-sentence justification. The justification is logged in the platform data layer for transparency.
4. **Review pass.** A second qualified researcher (or Oscar himself, with a delay) reviews the tags. Disagreements are flagged and re-reviewed.
5. **Confidence rating.** Each player's tag set is rated Documented (multiple sources confirm), Verified (one strong source, no contradictions), or Reported (single source, no contradictions). Players whose tags cannot be supported even at the Reported level are excluded from the matching pool.

### MLB tag work

For MLB players, the tags are derived from Baseball-Reference scouting summaries, the SABR BioProject entries, and standard scouting taxonomy. This is more procedural than the NLB work because the MLB record is dense and well-documented.

For very recent players (active in the last 20 years), MLB Statcast data informs the tags directly. For historical MLB players, the qualitative tradition (BBWAA writeups, contemporaneous newspaper coverage) is the source.

### What never gets tagged

A player whose qualitative profile cannot be defensibly established does not appear in the matching pool. The temptation to fill out the tag set from inference will be strong. Oscar resists it. The defense of the platform is the rigor of the tagging.

---

## The Match Explanations

Every NLB player in the matching pool has a one-paragraph match explanation written by Oscar. The paragraph is written once, applied to every match that pairs that NLB player with an MLB player, with light interpolation for the specific match context.

The format:

**[NLB player name]** played [position] for [primary team(s)] from [years]. He was [one sentence describing the playing-style profile that matches across most tag categories]. The match to [MLB player] reflects [the specific dimensions that align: hit tool, power profile, glove, etc.]. The match's strongest dimension is [highest-aligning feature]; the weakest is [lowest-aligning feature]. [One closing sentence with a specific documented fact about the NLB player that connects to the match.]

This is not auto-generated. It is written by Oscar, sourced, edited, and reviewed by Gates before ship. Approximately 400-600 paragraphs total. Substantial editorial work.

---

## The Methodology Page

The Shadow Nine ships with a dedicated methodology page at `/shadow-nine/methodology`. The page documents:

1. **The pool definitions.** What MLB players are eligible. What NLB players are eligible. The thresholds and sources.
2. **The feature vector.** Every quantitative feature. Every qualitative tag and its possible values. The exact taxonomy.
3. **The era adjustment.** The math, the sources, the limitations. Specific seasons where the league average is interpolated and how.
4. **The matching algorithm.** K-NN explained. The distance function. The weight given to each feature.
5. **The similarity score transform.** How distance becomes a 0-100 score. The calibration.
6. **The confidence tiers.** What Strong, Moderate, and Weak mean numerically.
7. **The tag assignment process.** How Oscar tagged NLB players. How the MLB tags were derived. The review process.
8. **The known limitations.** What the model cannot do. What it explicitly excludes. Where the data is weakest.
9. **The acknowledgment of subjectivity.** The qualitative tags are editorial judgments. The model is one possible representation of similarity, not the only one. Reasonable researchers could disagree.
10. **The review request.** A clear path for any reader who wants to dispute a specific match. The platform commits to responding to documented disputes and to revising the model where the dispute is substantiated.

The methodology page is linked from every match detail view and from the global navigation. Gates approves the methodology page before the feature ships.

---

## The Reverse Mode (Future)

The brainstorm flagged a possible secondary mode: the reader picks an NLB player, the platform returns the closest MLB equivalent. Same model, run backwards.

This is not part of the v1 launch. The v1 feature is MLB → NLB. The Reverse Mode is parked for v2, after the matching model has been stress-tested in the wild.

When the Reverse Mode ships, it will live under the same feature URL with a toggle: "MLB → Negro Leagues" / "Negro Leagues → MLB". Same lineup card aesthetic. Same field diagram toggle. Same detail view.

---

## Sharing and Permanence

### The lineup URL

When the reader builds a lineup, the platform stores the lineup configuration server-side, generates a short 8-character ID, and returns the URL:

```
theotherboxscore.org/shadow-nine/lineup/A4K7N2Q9
```

The URL resolves to the lineup view. The lineup is stored indefinitely. Storage cost is trivial; storage permanence is part of the platform's commitment.

### Open Graph image

For each lineup URL, the platform generates a server-side image suitable for social media preview:

- Dimensions: 1200 × 630 (standard OG image)
- Layout: Both lineup cards side by side, centered, on the platform's vellum background
- Platform logo at the top
- Headline: "A Shadow Nine"
- Subhead: lineup creator's MLB pick at the leadoff position, e.g. "Built around [Leadoff MLB Name]"
- Footer: "theotherboxscore.org/shadow-nine"

The image is generated once when the lineup is created and cached.

### Share text

Default share text, editable by the reader:

*"I built my Shadow Nine at The Other Box Score. My MLB lineup of [first three names, then "..."] found nine Negro Leagues parallels. Build yours."*

The share text varies based on what's interesting about the specific lineup: number of HOF NLB matches, era diversity, position diversity, etc. The platform computes the most interesting variable lineup-by-lineup.

### Discovery feature

A page at `/shadow-nine/recent-lineups` shows recent public lineups, anonymized (no names attached to the creator). A reader can browse what other readers built. This makes the feature self-perpetuating and adds the social-discovery layer that turns The Shadow Nine into the platform's recruitment engine.

---

## ML Architecture and Build Notes

### Tech stack

- **Data layer:** Postgres for player data, both MLB and NLB. Materialized views for performance.
- **Model layer:** scikit-learn for the K-NN implementation. The feature engineering is the substantive work; the algorithm is standard.
- **Era adjustment:** Custom Python module, owned by Elias, with the league-average data loaded as a static lookup table updated annually as Seamheads data improves.
- **API:** FastAPI endpoint serving match requests. Stateless. Cached.
- **Frontend:** React component, lazy-loaded from the global nav. Uses the platform's existing typography and color system.
- **Storage:** Lineup URLs persisted in Postgres. Anonymous, no PII.
- **OG image generation:** Server-side rendering using the platform's existing SVG export pipeline.

### Performance

The model is computed offline. Every MLB player has the top 5 NLB candidates pre-computed and stored. The API call returns cached results. The match view loads in under 500ms for the lineup card view.

### Build sequence

1. **Elias builds the canonical MLB player dataset** (all position players with 1,000+ games at primary position) and the NLB dataset (from Seamheads, filtered to the matching pool threshold)
2. **Oscar defines the qualitative tag taxonomy** and writes the rubric for tag assignment
3. **Oscar tags 50 NLB players as a calibration set**, with Elias auditing the consistency
4. **Elias builds the era-adjustment module** and validates against known benchmarks
5. **Elias builds the K-NN matching model** and runs it on the calibration set; Oscar reviews the matches for face validity
6. **Iteration:** Tag taxonomy, feature weights, and distance function are tuned based on the calibration set. This is the model's hardest phase.
7. **Oscar tags the remaining NLB players** (350-550 more)
8. **Oscar writes the match explanations** for every NLB player
9. **Vera designs the lineup card view, field diagram view, picker UI, and detail drawer**
10. **Vera designs the OG image generation template**
11. **Engineering builds the React component and the FastAPI backend**
12. **The full match table is pre-computed and cached**
13. **The methodology page is written by Elias and reviewed by Gates**
14. **Ida reviews the feature for tenet compliance, especially "subjects are protagonists" and "no editorializing"**
15. **Gates final review on methodology, matching outputs, and interface honesty**
16. **Ship**

**Estimated effort:** This is the platform's largest single build. The qualitative tag work alone is approximately three months of Oscar's time. The match explanations are another two months. Elias's model work is approximately six weeks. The frontend is approximately three weeks. Total: six to eight months of focused work, with Oscar's editorial load being the principal schedule risk.

**Recommendation:** Build the model and the methodology before the frontend. Ship a v0.5 internal version that returns matches via a developer interface, validate the matches with external reviewers (NLBM, SABR Negro Leagues research committee), refine the model, then build the user-facing UI. This protects the platform from shipping a public feature with weak matches.

---

## The Confidence Display

Every match displayed in the lineup card view shows its similarity score visibly. The score is the platform's commitment to honesty. Three display states:

- **Strong match (80-100):** Score displayed in --moss green. No additional label.
- **Moderate match (60-79):** Score displayed in --amber. Small label: "Moderate match."
- **Weak match (below 60):** Score displayed in --bronze. Small label: "Weak match -- see methodology."

The reader sees the confidence at a glance. The lineup card is honest about what the data supports.

---

## What Never Ships

Standard Other Box Score blocks, plus feature-specific:

- **No match without a similarity score displayed.** The score is the feature's commitment to honesty. It is never hidden, minimized, or buried.
- **No claim that any single match is the "true" or "perfect" NLB equivalent.** The model returns the closest documented match. The lineup card displays the result. The argument is that the parallel exists, not that the parallel is exact.
- **No use of the term "Negro Leagues equivalent of [MLB player]."** This framing centers the MLB player and reduces the NLB player to a comparison. The platform's framing is the reverse: *"The Negro Leagues player at this position whose profile most closely matches [MLB player] was [NLB name]."* The NLB player is the subject, the MLB player is the context.
- **No racial framing of the match copy.** The copy describes statistical and stylistic similarity, not race. Race is the institutional context the platform documents elsewhere. The matching itself is style-based.
- **No "celebrity matches" optimized for shareability over accuracy.** If Mike Trout and Cool Papa Bell come out at 71% similarity, that is the number. The platform does not adjust the model to produce more shareable pairs.
- **No leaderboard, ranking, or competition mechanic.** The Shadow Nine is not a game. It is a research tool with a friendly interface. The reader builds the lineup once, shares it, and may return. There is no scoring, no winning, no comparing reader against reader. The competition framing would cheapen the argument.

---

## The Three Oh Wow Moments

There are three.

**First:** The reader completes their first pick. They click Mike Trout. The shadow card on the right updates with Oscar Charleston. The similarity score reads 84. The reader has, in a single click, been shown the platform's thesis: at the very top of the talent distribution, the parallel was exact. The first match is the feature's entire argument compressed into one moment.

**Second:** The reader completes their ninth pick. Both lineup cards are full. The reader sees them side by side for the first time. The format is identical. The cards are framed identically. The names are different. The equivalence is visible. The thesis stops being abstract.

**Third:** The reader clicks Share. The URL generates. The OG image renders. The reader can send the lineup to anyone, and the recipient will see two equally formatted lineup cards. The argument propagates. The platform's recruitment engine is the feature itself.

---

## The One Line

If a reader uses The Shadow Nine and sees only one screen, it should be the completed lineup card view. The two cards side by side. The format equality. The implicit declaration:

*Same nine positions. Two parallel rosters. The argument the rest of the platform makes with chapters, this page makes with a click.*

That is the feature. The model is the proof. The lineup card is the receipt.
