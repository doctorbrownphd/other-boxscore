# The Shadow Nine -- Methodology
## theotherboxscore.org/chapters/the-shadow-nine/

**Version:** 1.0
**Published:** May 2026
**Last updated:** 2026-05-25
**Reviewed by:** Elias (statistical methodology) . Oscar (historical grounding)

---

## What This Chapter Does

This chapter builds a k-nearest-neighbor matching engine that pairs every MLB player in the pool with a Negro Leagues statistical twin at the same position. The user selects nine MLB players to fill a lineup (one per position: C, 1B, 2B, 3B, SS, LF, CF, RF, P), and the engine returns the closest Negro Leagues match for each, with a similarity score, statistical comparison, narrative explanation, and alternate candidates. Similarity is computed using Euclidean distance on normalized stat vectors: five dimensions for hitters (BA, OBP, SLG, OPS, WAR/600PA) and four for pitchers (ERA inverted, WAR/200IP, W, SO). Scores use a Gaussian decay formula (100 * exp(-2.5 * distance^2)) producing values roughly in the 50--95 range. All statistics are sourced from Seamheads (NLB) and Baseball Reference (MLB). No statistics are invented. Every number traces to a documented source.

---

## Data Sources

### Seamheads Negro Leagues Database
- **Source:** Agate Type Research
- **URL or archive location:** https://www.seamheads.com/NegroLgs/
- **Coverage:** Career statistics for Negro Leagues players, including batting (BA, OBP, SLG, OPS, HR, H, G, PA) and pitching (ERA, W, L, SO, IP). Coverage percentages documented per player.
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** The Seamheads database reflects approximately 75% of documented Negro Leagues box scores. Career statistics for players with low coverage percentages carry higher uncertainty. WAR values are calculated by Seamheads using their own methodology, which accounts for park factors, league quality, and available box score data.
- **How used in this chapter:** Primary source for all NLB player statistics. Career batting lines, pitching lines, WAR values, and coverage percentages are extracted from the Seamheads database via Chapter 10's players.json.

### Baseball Reference
- **Source:** Sports Reference LLC
- **URL or archive location:** https://www.baseball-reference.com/
- **Coverage:** Complete MLB career statistics for all players in the MLB pool
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** MLB statistics are complete and documented. WAR calculations use Baseball Reference's bWAR methodology.
- **How used in this chapter:** Primary source for all MLB player statistics. Career batting lines, pitching lines, and bWAR values.

### Chapter 10 Player Data
- **Source:** Chapter 10: The Ledger (players.json, mlb-comparisons.json)
- **URL or archive location:** https://theotherboxscore.org/chapters/the-ledger/
- **Coverage:** NLB and MLB player career statistics pre-compiled for cross-league analysis
- **License:** CC0
- **Access date:** 2026-05-24
- **Known limitations:** Inherits limitations from Seamheads and Baseball Reference. NLB players use MLB-official stat versions where available (e.g., BA_mlb_official).
- **How used in this chapter:** Primary data input for the matching pipeline. Both NLB and MLB player records are loaded from Chapter 10's data files.

---

## Data Processing

### Step 1: Player Pool Construction
- **Tool:** Python 3.12 (`data/build-matches.py`)
- **Input:** Ch 10 `players.json` (NLB), Ch 10 `mlb-comparisons.json` (MLB), plus supplemental MLB players from Baseball Reference
- **Output:** `data/mlb-pool.json` and `data/nlb-pool.json`, grouped by position
- **Accuracy / success rate:** All players resolved to a primary position. Dual-position players assigned by primary role (e.g., Dihigo to RF as bat-first, Rogan to P as pitching WAR dominant). Position assignments documented in the build script.
- **Failures and gaps:** Players without sufficient batting or pitching statistics for vector construction are excluded from matching. Coverage percentage is tracked for NLB players.

### Step 2: Position Normalization
- **Tool:** Python 3.12 (`data/build-matches.py`)
- **Input:** Player pool with raw positions
- **Output:** Players grouped into nine positions (C, 1B, 2B, 3B, SS, LF, CF, RF, P). Strong CF players duplicated into LF pool for matching depth.
- **Accuracy / success rate:** Position assignments are editorially reviewed. Five CF players (Oscar Charleston, Turkey Stearnes, Willard Brown, Wild Bill Wright, Pete Hill) are eligible for LF matching.
- **Failures and gaps:** Position assignment for multi-position players involves editorial judgment. The build script documents every override.

### Step 3: Stat Vector Construction
- **Tool:** Python 3.12 (`data/build-matches.py`)
- **Input:** Player batting and pitching statistics
- **Output:** Normalized stat vectors for each player. Hitters: BA, OBP, SLG, OPS, WAR/600PA. Pitchers: ERA (inverted), WAR/200IP, W, SO.
- **Accuracy / success rate:** Rate stats (WAR/600PA, WAR/200IP) computed from career totals. A minimum of two shared dimensions required for matching.
- **Failures and gaps:** Players with null values in critical stats produce incomplete vectors. The algorithm uses shared dimensions only, scaling distance by dimension count.

### Step 4: Similarity Computation
- **Tool:** Python 3.12 (`data/build-matches.py`)
- **Input:** Normalized stat vectors for all players at each position
- **Output:** `data/matches.json` with primary match, similarity score, stat comparison, narrative, and alternate candidates for every MLB player
- **Accuracy / success rate:** All MLB players in the pool matched to at least one NLB player at their position. Scores range from approximately 50 to 95.
- **Failures and gaps:** Matches at positions with thin NLB pools (e.g., 1B, LF) may have lower similarity scores due to fewer candidates.

---

## Analytical Methods

### Position-Filtered Euclidean Distance Matching

**What it does:**
For each MLB player, finds the NLB player at the same position whose normalized stat vector is closest in Euclidean space. Produces a similarity score and identifies alternate candidates ranked by distance.

**Why this method:**
Euclidean distance on normalized vectors is the simplest, most interpretable similarity metric for this purpose. More complex methods (cosine similarity, Mahalanobis distance, learned embeddings) were considered but add complexity without proportional benefit for a small, well-defined feature space. The goal is transparency: a reader should be able to understand why two players were matched by looking at the stat comparison table.

**Inputs:**
- Normalized stat vectors for hitters: BA, OBP, SLG, OPS, WAR/600PA
- Normalized stat vectors for pitchers: ERA (inverted), WAR/200IP, W, SO
- Position filter: matches are restricted to same-position players

**Parameters:**
- Normalization: Min-max within position group across both leagues
- Score formula: 100 * exp(-2.5 * distance^2), Gaussian decay
- ERA inversion: For pitchers, ERA is inverted (1 - normalized value) so that lower ERA corresponds to higher similarity
- Minimum dimensions: At least 2 shared stat dimensions required for matching
- Distance scaling: sqrt(sum of squared differences / number of shared dimensions), ensuring consistent scaling regardless of vector completeness

**Outputs:**
- Primary match: NLB player name, similarity score (0--100), stat comparison, narrative explanation
- Alternate candidates: Additional NLB players ranked by similarity, with scores and summaries
- Confidence tier: Strong (score >= 80, coverage >= 45%), Moderate (score 60--79 or Strong with low coverage), Weak (score < 60 or Moderate with low coverage)

**Uncertainty:**
Similarity scores are relative measures, not absolute statements of equivalence. A score of 85 means the two players' normalized stat profiles are close in Euclidean space. It does not mean the players were "85% similar" in any holistic sense. The Gaussian decay formula is forgiving of moderate differences (a 0.3 distance still yields a score around 80) while penalizing large ones (a 0.6 distance yields approximately 40).

Coverage percentage (from Seamheads) is the primary uncertainty indicator for NLB players. Players with 40% coverage have career statistics computed from a smaller fraction of documented games, which introduces measurement uncertainty that the similarity score does not capture. The confidence tier system addresses this by downgrading otherwise strong matches when NLB coverage is low.

**Validation:**
- Spot-checked matches against known historical comparisons (e.g., Josh Gibson matched to catchers, Satchel Paige matched to elite pitchers)
- Verified that similarity scores are symmetric in intent: if A matches B, B should match A with comparable score (subject to pool composition)
- Confirmed that alternate candidates are plausible by editorial review

**Limitations:**
- The matching is purely statistical. It does not account for playing style, defensive contributions beyond WAR, leadership, or historical context.
- The feature set for hitters (5 dimensions) and pitchers (4 dimensions) is deliberately small. Adding more dimensions would change match rankings.
- Negro Leagues seasons were shorter than MLB seasons. Rate stats (WAR/600PA) partially account for this, but career accumulation differences remain.
- The NLB pool is smaller than the MLB pool at most positions, which constrains matching quality. Thin positions (1B, LF) may produce weaker matches than deep positions (CF, P).
- Normalization is within-position, so matches across positions are not comparable.

---

## Machine Learning Models

This chapter does not use machine learning models in the traditional sense. The matching algorithm is a deterministic nearest-neighbor computation on pre-computed stat vectors. There is no training, no learned parameters, and no model fitting. The algorithm is pure arithmetic: normalize, compute distance, convert to score.

The term "k-NN matching engine" is used in the chapter's description because the algorithm identifies the k nearest neighbors in stat space. This is a geometric operation, not a trained classifier.

---

## AI-Generated Content

### Match Narratives
- **Generated by:** Claude (Anthropic), used in pipeline development
- **Prompt structure:** For each MLB-NLB match, the pipeline generates a narrative explaining the statistical basis of the match, citing specific stat comparisons
- **Inputs to the prompt:** Player names, career years, similarity score, stat comparison table, WAR values, coverage percentage, Hall of Fame status
- **Output:** One-paragraph narrative per match explaining why these players are statistical twins
- **Confidence label:** Narratives are presented in the detail drawer alongside the raw stat comparison, allowing readers to verify claims against the numbers
- **Human review:** All narratives reviewed for factual accuracy. Generated text that overstated the similarity or introduced unsupported characterizations was rejected.
- **Accuracy standard:** Every claim in a narrative is verifiable from the stat comparison table. No narrative introduces information not present in the data.
- **Known limitations:** Narratives cannot capture the full context of a player's career. They describe statistical similarity, not historical equivalence.

### Editorial Content
- **Generated by:** Claude (Anthropic), used in editorial development
- **Prompt structure:** Chapter author provided data structures and design intent; Claude assisted with UI text, section descriptions, and methodology framing
- **Output:** UI labels, section descriptions, methodology section text
- **Human review:** All content reviewed by chapter author for accuracy and voice consistency

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| NLB coverage at ~75% | Seamheads documents approximately 75% of Negro Leagues box scores. Career stats for NLB players are computed from incomplete game records. | NLB career statistics may shift as additional box scores are recovered. Similarity scores could change if NLB stats are revised. | Coverage percentage tracked per NLB player. Confidence tier incorporates coverage into its assessment. |
| Thin position pools | Some positions (1B, LF, 2B) have fewer NLB candidates than others (CF, P, SS). | Matching quality varies by position. Thin pools may produce lower similarity scores or less convincing matches. | Alternate candidates shown when available. Confidence tier flags matches at thin positions. |
| Pitching stats less complete | NLB pitching statistics (particularly SO and IP) are less completely documented than batting statistics. | Pitcher matching uses fewer reliable dimensions. Pitcher similarity scores may be less stable. | Pitcher vector uses four dimensions (ERA inverted, WAR/200IP, W, SO). Missing values reduce shared dimensions but do not prevent matching. |
| No defensive metrics | The stat vectors do not include fielding metrics beyond WAR's implicit defensive component. | Matches are based on offensive production and WAR. Players whose value was primarily defensive may be poorly matched. | Acknowledged as a structural limitation. WAR partially captures defensive value but does not decompose it in the matching. |
| Era differences | MLB and NLB players in the pool span from the dead-ball era through the modern era. | Run environments varied across eras, affecting rate stats. | Min-max normalization within position group partially accounts for era differences by comparing relative positioning rather than absolute values. |
| Career length asymmetry | Negro Leagues seasons were shorter than MLB seasons. NLB careers may also have been shortened by the color barrier's disruption. | Career accumulation stats (H, HR, W) favor MLB players with longer seasons. Rate stats (WAR/600PA) partially compensate. | Rate-based metrics used alongside counting stats. The stat comparison table shows both raw numbers and rate stats. |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| NLB WAR values | Seamheads WAR methodology involves park factors, league quality adjustments, and incomplete game data. These values are the best available estimates, not census-quality measurements. | Seamheads methodology documentation | Presented as "WAR (Seamheads)" with the source explicitly labeled. Data confidence label (Documented, Verified, Estimated) shown in the detail drawer. |
| Similarity scores as meaningful | A Euclidean distance metric on 4--5 stat dimensions is a crude measure of player similarity. Two players with similar stat lines may have played in fundamentally different competitive environments. | Statistical methodology review | Scores labeled with confidence tiers (Strong, Moderate, Weak). The detail drawer shows the raw stat comparison so readers can assess the match independently. |
| Position assignments | Some NLB players played multiple positions. Assigning a primary position involves editorial judgment. | SABR BioProject, Seamheads position data | Position assignments documented in the build script with rationale. Dual-position players assigned by primary role with notes. |

---

## Cross-League Comparisons

### Stat Vector Comparison

**Assumption 1:** Rate statistics (BA, OBP, SLG, OPS) are comparable across leagues after min-max normalization within position group. This assumes that the relative ordering of players within each league reflects genuine skill differences, even if absolute values are affected by different competitive environments.

**Assumption 2:** WAR values from Seamheads (NLB) and Baseball Reference (MLB) are comparable in intent, measuring total player value in wins above replacement. The replacement baselines and calculation methodologies differ between sources.

**Assumption 3:** Min-max normalization equalizes the scale across leagues, measuring each player's position within the combined distribution rather than comparing raw values. This partially controls for era effects and league-level differences.

**Precision cost:** Cross-league normalization smooths over real differences in competitive environment, season length, and data completeness. A .300 BA in the NLB and a .300 BA in MLB may represent different things, but the normalization treats them as equivalent.

**Calibration:** No ground truth exists for "correct" cross-league player matching. The algorithm is validated by editorial review of match plausibility, not by reference to a known-correct answer set.

**Confidence interval:** Similarity scores carry implicit uncertainty from the Gaussian decay formula. The difference between a score of 82 and 78 is not meaningful. The confidence tiers (Strong >= 80, Moderate 60--79, Weak < 60) provide coarser but more honest groupings.

---

## Reproducibility

**Code:** `chapters/the-shadow-nine/data/build-matches.py` (MIT licensed)
**Data:** All pre-computed outputs in `chapters/the-shadow-nine/data/` (CC0 licensed)
**Raw data:** NLB stats from `chapters/10-the-ledger/data/players.json`, MLB stats from `chapters/10-the-ledger/data/mlb-comparisons.json` and supplemental records sourced from Baseball Reference
**Environment:** Python 3.12. No external library dependencies (standard library only: json, math, os).
**Runtime:** Under 5 seconds on standard hardware.

To reproduce:
```bash
cd chapters/the-shadow-nine/data/
python3 build-matches.py
```

Requires `chapters/10-the-ledger/data/players.json` and `chapters/10-the-ledger/data/mlb-comparisons.json`. Output files (`mlb-pool.json`, `nlb-pool.json`, `matches.json`) will match the committed versions.

Data files:
- `data/mlb-pool.json` -- MLB player pool grouped by position with career stats
- `data/nlb-pool.json` -- NLB player pool grouped by position with career stats and coverage percentages
- `data/matches.json` -- Pre-computed match results with similarity scores, stat comparisons, narratives, and alternates
- `data/build-matches.py` -- Complete pipeline script

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-05-25 | Initial publication |

---

## Citation

Haynes, Jeremy. "The Shadow Nine: Methodology." *The Other Box Score*, May 2026. https://theotherboxscore.org/chapters/the-shadow-nine/

BibTeX:
```bibtex
@article{tobs-shadow-nine-methodology,
  author  = {Haynes, Jeremy},
  title   = {The Shadow Nine -- Methodology},
  journal = {The Other Box Score},
  year    = {2026},
  month   = {May},
  url     = {https://theotherboxscore.org/chapters/the-shadow-nine/}
}
```

Chicago:
Haynes, Jeremy. "The Shadow Nine: Methodology." *The Other Box Score*, May 2026. https://theotherboxscore.org/chapters/the-shadow-nine/.

---

## Questions and Corrections

If you find an error in this methodology, open an issue at https://github.com/other-boxscore/other-boxscore/issues or contact the project maintainer. Corrections are documented in the version history above.
