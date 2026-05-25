# The Ledger -- Methodology
## theotherboxscore.org/chapters/the-ledger/

**Version:** 1.0
**Published:** May 2026
**Last updated:** 2026-05-25
**Reviewed by:** Elias (statistical methodology) · Oscar (historical grounding)

---

## What This Chapter Does

This chapter builds the platform's core statistical engine: a rate-adjusted JAWS metric that allows Negro Leagues players to be compared to their MLB contemporaries on a common statistical footing. Standard JAWS (the average of career WAR and peak seven-year WAR, divided by two) systematically understates Negro Leagues players because they played roughly 55 league games per season compared to MLB's 154. Rate JAWS normalizes to a common denominator: WAR per 600 plate appearances for batters, WAR per 200 innings pitched for pitchers. The result is an integrated leaderboard of 50 NLB and 20 MLB players ranked by rate-adjusted career value. A UMAP embedding maps all 70 players into a two-dimensional space where proximity reflects statistical similarity. Players who look alike statistically sit near each other, regardless of which league they played in.

---

## Data Sources

### Seamheads Negro Leagues Database
- **Source:** Seamheads Negro Leagues Database
- **URL or archive location:** https://www.seamheads.com/NegroLgs/
- **Coverage:** Career statistics for the top 50 Negro Leagues players by WAR. Includes batting average, on-base percentage, slugging percentage, OPS, career WAR, and rate WAR (WAR per 600 PA or per 200 IP). Pitching statistics where applicable.
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** NLB statistical coverage is incomplete. Documented games represent a fraction of total games played. Seamheads estimates that coverage varies by player and era, with some players documented at 40--60% of career games and others at 80%+. The WAR calculation is based on documented games only, which means career totals are likely underestimates. Rate statistics (per 600 PA) are more robust because they normalize for documentation completeness.
- **How used in this chapter:** Primary source for all NLB player data. Career WAR, rate WAR, and batting/pitching statistics feed into the Rate JAWS computation and the UMAP embedding.

### MLB Official Integrated Records
- **Source:** MLB Press Release: "Statistics of the Negro Leagues officially enter the Major League record" (May 2024)
- **URL or archive location:** https://www.mlb.com/press-release/press-release-statistics-of-the-negro-leagues-officially-enter-the-major-league-record
- **Coverage:** Official batting averages, slugging percentages, and OPS for select Negro Leagues players (Gibson, Charleston, Wilson, Stearnes, Leonard, Suttles) as adjusted by MLB's Statistical Review Committee
- **License:** Public domain (facts)
- **Access date:** 2026-05-24
- **Known limitations:** MLB-official figures differ slightly from Seamheads raw figures due to committee adjustments. Both figures are documented in the dataset.
- **How used in this chapter:** Cross-reference. Where MLB-official and Seamheads figures diverge, both are presented with the source identified.

### Baseball Reference (bWAR)
- **Source:** Baseball Reference
- **URL or archive location:** https://www.baseball-reference.com/
- **Coverage:** Career WAR for 20 MLB comparison players (Hall of Famers and near-Hall players from the 1920s--1960s era)
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** bWAR is one of several WAR implementations. This chapter uses bWAR throughout for consistency with Chapter 07 and Chapter 09.
- **How used in this chapter:** Career WAR, rate WAR, and batting/pitching statistics for the 20 MLB comparison players. These players form the MLB half of the integrated leaderboard.

### MLB Comparison Player Selection
- **Source:** Compiled by chapter author from Baseball Reference and SABR records
- **Coverage:** 20 MLB players selected as era-appropriate comparisons. Selection criteria: Hall of Famers and near-Hall players active during or near the Negro Leagues era (1920s--1960s), across all positions.
- **License:** Not applicable (selection is editorial)
- **Known limitations:** The comparison set is curated, not exhaustive. Different comparison players would produce different leaderboard orderings. The set is designed to include the consensus best players of the era to provide a meaningful benchmark.
- **How used in this chapter:** The MLB side of the integrated leaderboard and the UMAP embedding.

---

## Data Processing

### Step 1: Player Record Assembly
- **Tool:** Manual compilation from Seamheads and Baseball Reference
- **Input:** Published career statistics from web databases
- **Output:** `data/players.json` (50 NLB players), `data/mlb-comparisons.json` (20 MLB players)
- **Accuracy / success rate:** All statistics cross-referenced against source databases. Confidence levels assigned per field (Documented, Verified, Estimated).
- **Failures and gaps:** Some NLB players lack complete batting lines. Rate WAR is unavailable for a small number of players where plate appearance counts are not documented.

### Step 2: Rate WAR Computation
- **Tool:** Computed from Seamheads data
- **Input:** Career WAR and plate appearances (or innings pitched)
- **Output:** WAR per 600 PA (batters) or WAR per 200 IP (pitchers)
- **Accuracy / success rate:** Deterministic computation from verified inputs
- **Failures and gaps:** Players without documented PA counts have rate WAR marked as null

### Step 3: Feature Extraction for UMAP
- **Tool:** Python (NumPy)
- **Input:** Player records from both datasets
- **Output:** 6-dimensional feature vectors for each player: [BA/inv-ERA, OBP/WL%, SLG/inv-ERA, OPS/WL%, careerWAR, rateWAR]
- **Accuracy / success rate:** All features sourced from documented statistics. Missing values imputed with column median and flagged.
- **Failures and gaps:** Pitchers mapped into the same 6-dimensional space as batters using inverted ERA and win-loss percentage in place of batting statistics. This is an approximation that allows pitchers and batters to coexist in the same embedding space but may distort pitcher-batter distances.

---

## Analytical Methods

### Rate JAWS Computation

**What it does:**
Computes a rate-adjusted version of JAWS that corrects for the Negro Leagues' shorter documented seasons. Standard JAWS averages career WAR and peak seven-year WAR. Because NLB seasons were roughly one-third the length of MLB seasons, career WAR totals are systematically lower even when per-game production was equivalent. Rate JAWS replaces career WAR with rate WAR (per 600 PA) and estimates peak rate from career rate.

**Why this method:**
JAWS is the standard framework for Hall of Fame comparison in baseball analytics, developed by Jay Jaffe. Adapting it to rate statistics is the most transparent way to show that the career-total framework penalizes Negro Leagues players for structural reasons unrelated to their ability.

**Inputs:**
- Career WAR (from Seamheads for NLB, Baseball Reference for MLB)
- Rate WAR per 600 PA or per 200 IP
- Years active (for career length estimation)

**Parameters:**
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| Peak rate multiplier | 1.3x career rate | Approximation. Players' best stretches typically exceed career average by 25--35%. 1.3 is the midpoint. |
| Rate JAWS formula | (rateWAR + peakRate) / 2 | Mirrors the standard JAWS formula structure |

**Outputs:**
For each player:
- rateWAR: career WAR per 600 PA (or per 200 IP)
- peakRate: estimated peak-stretch rate (1.3x career rate)
- rateJAWS: (rateWAR + peakRate) / 2
- standardJAWS: traditional JAWS for comparison
- Confidence level: Documented (Seamheads-sourced rate WAR), Estimated (rate WAR not directly available)

**Uncertainty:**
- The 1.3x peak multiplier is an approximation. True peak rates require season-by-season WAR data, which is not yet assembled at scale for NLB players. The multiplier could reasonably range from 1.2 to 1.5.
- Rate WAR inherits the uncertainty of the underlying career WAR and plate appearance counts. For players with lower documentation coverage, rate WAR is less reliable.
- No formal confidence intervals are computed on the Rate JAWS values. The uncertainty is communicated through the confidence level label (Documented vs. Estimated).

**Validation:**
- For MLB comparison players, both standard JAWS and Rate JAWS are computed. The ranking should be broadly consistent: a player who ranks highly on standard JAWS should also rank highly on Rate JAWS, with deviations explained by career length differences.
- For NLB players, Rate JAWS should rank them higher relative to MLB players than standard JAWS does, because the rate adjustment corrects for the shorter documented seasons. This pattern is confirmed in the output.

**Limitations:**
- The 1.3x peak multiplier is the largest single source of approximation. It assumes a uniform relationship between career rate and peak rate across all players.
- Rate WAR normalizes for playing time but does not account for quality of opposition, park effects, or league-level run environment differences between the NLB and MLB.
- The integrated leaderboard compares NLB and MLB players as if their statistics were drawn from equivalent competitive contexts. They were not. The NLB had smaller roster pools, fewer resources, and different scheduling constraints. These factors affect the meaning of WAR in ways that rate adjustment alone does not resolve.

---

## Machine Learning Models

### M1: UMAP Embedding

**Model type:** UMAP (Uniform Manifold Approximation and Projection), unsupervised dimensionality reduction. Falls back to PCA if the UMAP library is not installed.
**Library / framework:** umap-learn (UMAP), scikit-learn (PCA fallback), NumPy, Python 3.12

**Training data:** 70 players (50 NLB + 20 MLB), each represented by a 6-dimensional feature vector.

**Feature set:**
| Feature | Batters | Pitchers |
|---------|---------|----------|
| Dim 1 | Batting Average | Inverted ERA: (5.0 - ERA) / 5.0 |
| Dim 2 | On-Base Percentage | Win-Loss Percentage |
| Dim 3 | Slugging Percentage | Inverted ERA |
| Dim 4 | OPS | Win-Loss Percentage |
| Dim 5 | Career WAR | Career WAR |
| Dim 6 | Rate WAR per 600 PA | Rate WAR per 200 IP |

Pitchers are mapped into the batter feature space using inverted ERA (so higher = better, consistent with batting stats) and win-loss percentage. This is an approximation that allows all 70 players to coexist in a single embedding.

**Hyperparameters:**
| Parameter | Value | Rationale |
|-----------|-------|-----------|
| n_components | 2 | Visualization target |
| n_neighbors | 15 | Default UMAP. Balances local and global structure at n=70 |
| min_dist | 0.3 | Default UMAP. Prevents excessive clustering |
| metric | Euclidean | Standard for z-scored continuous features |
| random_state | 42 | Reproducibility |

**Normalization:** Z-score (mean 0, standard deviation 1) per feature across all 70 players before embedding.

**Missing data:** Players with missing statistics have those dimensions imputed with the column median. Imputed players are flagged in the output. The median imputation pulls these players toward the center of the embedding.

**Output:**
For each player: (x, y) coordinates in [0, 1] range (rescaled from raw UMAP output), plus league, position, career WAR, and Hall of Fame status.

**Confidence representation:**
The embedding is labeled as a visualization aid, not a ranking. The AI disclosure states: "Embedding coordinates are produced by UMAP, an unsupervised dimensionality reduction algorithm. Player positions reflect statistical similarity, not subjective ranking."

**Known failure modes:**
- With only 70 data points, UMAP's neighborhood-based approach may not produce stable embeddings. Small changes in hyperparameters can shift player positions substantially.
- The pitcher-batter feature mapping is a compromise. Pitchers may cluster differently than expected because their "batting stats" are actually pitching stats mapped into the same dimensions.
- Players with imputed features are pulled toward the center, which may make them appear more similar to each other than they actually are.
- UMAP is stochastic. Different random seeds produce different embeddings with the same qualitative structure but different specific coordinates.

**Reproducibility:**
```bash
cd chapters/10-the-ledger/models/
pip install numpy umap-learn scikit-learn
python umap_embedding.py
```
If `umap-learn` is not installed, the script falls back to PCA, which produces a different embedding.

---

## AI-Generated Content

### UMAP Embedding
**Generated by:** UMAP algorithm (umap-learn library), not a neural network or LLM
**Prompt structure:** Not applicable -- unsupervised algorithm with documented parameters
**Output:** 2D coordinates for each player, used in the comparable universe map visualization
**Confidence label:** Labeled as a visualization aid. "Players near each other had similar statistical profiles."
**Human review:** Embedding reviewed for face validity: known peers (e.g., Josh Gibson and Babe Ruth) should appear near each other. Known outliers (e.g., two-way players like Bullet Rogan) should appear in distinctive positions.
**Accuracy standard:** The embedding should produce sensible neighborhoods. If two players with very different profiles appear adjacent, the embedding is investigated.
**Known limitations:** UMAP coordinates have no absolute meaning. Only relative distances are interpretable.

### Narrative Content
**Generated by:** Claude (Anthropic)
**Output:** Chapter prose framing the Rate JAWS findings and the integrated leaderboard
**Human review:** All prose reviewed for accuracy and voice
**Confidence label:** Editorial interpretation of documented data and modeled metrics

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| NLB documentation coverage | Documented games represent a fraction of career games for most NLB players (typically 40--80%) | Career WAR totals are likely underestimates | Rate WAR (per 600 PA) normalizes for this, which is the entire rationale for the Rate JAWS approach |
| Season-by-season NLB WAR | Seamheads provides career totals but not season-by-season WAR for most players | True peak WAR cannot be computed; peak rate is estimated as 1.3x career rate | The 1.3x multiplier is documented as an approximation. When season-level data becomes available, this will be updated. |
| NLB plate appearance counts | Some players lack documented PA totals | Rate WAR cannot be computed; these players receive an "Estimated" confidence label | Players without rate WAR are included with a rough JAWS estimate (career WAR * 0.75) and flagged |
| MLB comparison player selection | The 20 MLB players are a curated set, not an exhaustive population | Different comparison sets would produce different rankings and leaderboard positions | Selection criteria documented. The set includes consensus-best players across all positions. |
| Cross-league run environment | NLB and MLB operated in different competitive and environmental contexts | Rate WAR comparisons assume equivalent run environments | Acknowledged as a structural limitation of the entire cross-league comparison project |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| Josh Gibson's batting average | MLB official (.372) differs from Seamheads raw figure due to Statistical Review Committee adjustments | Seamheads, MLB.com press release | Both figures presented; source identified at point of claim |
| Oscar Charleston's OPS | MLB official figure differs from Seamheads calculation | Seamheads, MLB.com press release | Both figures presented |
| WAR as a comprehensive value metric | WAR does not capture defensive value, baserunning, or leadership equally well across all eras | SABR WAR methodology documentation, Seamheads methodology notes | WAR used as the best available single-number metric, with its limitations stated |
| Peak rate multiplier | 1.3x is an approximation; true peak could be higher or lower | Historical player aging curves, Baseball Reference season data for MLB comparisons | Labeled as an approximation with the rationale documented |

---

## Cross-League Comparisons

### Integrated Leaderboard (NLB vs. MLB Rate JAWS)

**Assumption 1:** WAR is a valid common currency across the NLB and MLB, despite differences in league structure, roster size, and scheduling
**Assumption 2:** Rate normalization (per 600 PA / per 200 IP) sufficiently corrects for the difference in documented season length
**Assumption 3:** The Seamheads WAR methodology for NLB players is broadly comparable to the Baseball Reference bWAR methodology for MLB players
**Assumption 4:** The 1.3x peak rate multiplier applies equally to NLB and MLB players
**Precision cost:** Individual Rate JAWS values should not be compared to the decimal place. Rankings within 0.5 Rate JAWS of each other are effectively tied.
**Calibration:** The integrated leaderboard is not calibrated against an external standard because no such standard exists. The internal validity check is whether the rankings align with expert consensus on the best players of this era. NLB players who are broadly recognized as among the game's all-time greats (Gibson, Charleston, Paige, Rogan) should rank highly. They do.
**Confidence interval:** No formal confidence interval on Rate JAWS. The confidence level label (Documented, Estimated) communicates the reliability of the underlying data.

---

## Reproducibility

**Code:** `models/rate_jaws.py`, `models/umap_embedding.py` (MIT licensed)
**Data:** `data/players.json`, `data/mlb-comparisons.json`, `data/rate-jaws.json`, `data/umap-embedding.json`, `data/integrated-leaderboard.json` (CC0 licensed)
**Raw data:** Seamheads (public), Baseball Reference (public), MLB.com (public)
**Environment:** Python 3.12, NumPy 1.26, umap-learn 0.5+ (optional, PCA fallback available), scikit-learn 1.4+
**Runtime:** Under 10 seconds on standard hardware

To reproduce:
```bash
cd chapters/10-the-ledger/models/
pip install numpy umap-learn scikit-learn
python rate_jaws.py          # Produces rate-jaws.json, integrated-leaderboard.json
python umap_embedding.py     # Produces umap-embedding.json
```

Both models can be run independently. Neither depends on the other's output. The random seed is 42 for both.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-05-25 | Initial publication |

---

## Citation

Haynes, Jeremy. "The Ledger -- Methodology." *The Other Box Score*, 2026. https://theotherboxscore.org/chapters/the-ledger/

---

## Questions and Corrections

If you find an error in this methodology, open an issue at github.com/other-boxscore/other-boxscore or email the project maintainer. Corrections are documented in the version history above.
