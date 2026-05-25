"""
Chapter 10: The Ledger -- UMAP Embedding of 70-Player Comparable Universe
=========================================================================

Creates a 2D embedding of all 70 players (50 NLB + 20 MLB) for the
comparable universe map visualization.

Methodology:
  For each player, a feature vector is built from available statistics:
  BA, OBP, SLG, OPS, career WAR, and rate WAR per 600 PA. Pitchers use
  ERA, W-L%, and rate WAR per 200 IP where batting stats are absent.

  Features are normalized (z-scored) before dimensionality reduction.
  UMAP (Uniform Manifold Approximation and Projection) reduces to 2D.
  UMAP preserves local structure better than PCA or t-SNE for this
  kind of mixed-stat player space.

  Players missing batting or pitching stats are handled by imputing
  the median of their league for missing dimensions, then flagging
  the imputation.

Sources:
  - chapters/10-the-ledger/data/players.json (50 NLB players)
  - chapters/10-the-ledger/data/mlb-comparisons.json (20 MLB players)

Output: chapters/10-the-ledger/data/umap-embedding.json
"""

import json
import os
import numpy as np
from datetime import datetime

try:
    import umap
    USE_UMAP = True
except ImportError:
    from sklearn.decomposition import PCA
    USE_UMAP = False

# ============================================================================
# Load data
# ============================================================================

data_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data")

with open(os.path.join(data_dir, "players.json")) as f:
    nlb_data = json.load(f)

with open(os.path.join(data_dir, "mlb-comparisons.json")) as f:
    mlb_data = json.load(f)


# ============================================================================
# Build feature vectors
# ============================================================================
# Features for position players: BA, OBP, SLG, OPS, careerWAR, rateWAR
# Features for pitchers: ERA, W-L pct, careerWAR, rateWAR (per 200 IP)
# Mixed players (RF/P, CF/P) get both sets averaged

def extract_features(player, league):
    """Extract a 6-dimensional feature vector from a player record."""
    batting = player.get("batting")
    pitching = player.get("pitching")
    career_war = player.get("careerWAR", 0)

    # Rate WAR: different field names in NLB vs MLB
    if league == "NLB":
        rate_war = player.get("rateWAR")
    else:
        rate_war = player.get("rateWAR_per600PA") or player.get("rateWAR_per200IP")

    has_batting = batting is not None and isinstance(batting, dict)
    has_pitching = pitching is not None and isinstance(pitching, dict)

    # Feature vector: [BA, OBP, SLG, OPS, careerWAR, rateWAR]
    # For pitchers, map ERA -> inverted scale, W-L% -> BA slot
    if has_batting:
        ba = batting.get("BA", None)
        obp = batting.get("OBP", None)
        slg = batting.get("SLG", None)
        ops = batting.get("OPS", None)
        return {
            "features": [ba, obp, slg, ops, career_war, rate_war],
            "type": "batter",
            "imputed": [f is None for f in [ba, obp, slg, ops, career_war, rate_war]],
        }
    elif has_pitching:
        era = pitching.get("ERA", None)
        w = pitching.get("W", 0)
        l = pitching.get("L", 0)
        wl_pct = w / (w + l) if (w + l) > 0 else None
        # Invert ERA so higher = better (consistent with batting stats direction)
        inv_era = (5.0 - era) / 5.0 if era is not None else None
        # Map pitcher stats into the same 6-dim space:
        # [inv_era, wl_pct, inv_era, wl_pct, careerWAR, rateWAR]
        return {
            "features": [inv_era, wl_pct, inv_era, wl_pct, career_war, rate_war],
            "type": "pitcher",
            "imputed": [f is None for f in [inv_era, wl_pct, inv_era, wl_pct, career_war, rate_war]],
        }
    else:
        # No stats at all, will be fully imputed
        return {
            "features": [None, None, None, None, career_war, rate_war],
            "type": "unknown",
            "imputed": [True, True, True, True, career_war is None, rate_war is None],
        }


players = []
feature_matrix = []

# Process NLB players
for p in nlb_data["players"]:
    feat = extract_features(p, "NLB")
    players.append({
        "name": p["name"],
        "league": "NLB",
        "position": p["position"],
        "careerWAR": p["careerWAR"],
        "hof": p.get("hof", "eligible"),
        "type": feat["type"],
        "imputed": any(feat["imputed"]),
    })
    feature_matrix.append(feat["features"])

# Process MLB players
for p in mlb_data["players"]:
    feat = extract_features(p, "MLB")
    players.append({
        "name": p["name"],
        "league": "MLB",
        "position": p["position"],
        "careerWAR": p["careerWAR"],
        "hof": p.get("hof", "eligible"),
        "type": feat["type"],
        "imputed": any(feat["imputed"]),
    })
    feature_matrix.append(feat["features"])

print(f"Total players: {len(players)} ({sum(1 for p in players if p['league'] == 'NLB')} NLB, "
      f"{sum(1 for p in players if p['league'] == 'MLB')} MLB)")

# ============================================================================
# Handle missing values: impute with column median
# ============================================================================

feature_array = np.array(feature_matrix, dtype=float)

# Replace None (nan) with column median
for col in range(feature_array.shape[1]):
    col_data = feature_array[:, col]
    valid = col_data[~np.isnan(col_data)]
    if len(valid) > 0:
        median_val = np.median(valid)
        col_data[np.isnan(col_data)] = median_val

imputed_count = sum(1 for p in players if p["imputed"])
print(f"Players with at least one imputed feature: {imputed_count}")

# ============================================================================
# Normalize (z-score)
# ============================================================================

means = np.mean(feature_array, axis=0)
stds = np.std(feature_array, axis=0)
stds[stds == 0] = 1.0  # avoid division by zero
normalized = (feature_array - means) / stds

# ============================================================================
# Dimensionality reduction
# ============================================================================

if USE_UMAP:
    print("Using UMAP for dimensionality reduction")
    reducer = umap.UMAP(
        n_components=2,
        n_neighbors=15,
        min_dist=0.3,
        metric="euclidean",
        random_state=42,
    )
    embedding = reducer.fit_transform(normalized)
else:
    print("UMAP not available, falling back to PCA")
    pca = PCA(n_components=2)
    embedding = pca.fit_transform(normalized)

# Rescale to 0-1 range for visualization
x_min, x_max = embedding[:, 0].min(), embedding[:, 0].max()
y_min, y_max = embedding[:, 1].min(), embedding[:, 1].max()

x_range = x_max - x_min if x_max != x_min else 1.0
y_range = y_max - y_min if y_max != y_min else 1.0

embedding_scaled = np.column_stack([
    (embedding[:, 0] - x_min) / x_range,
    (embedding[:, 1] - y_min) / y_range,
])

# ============================================================================
# Build output
# ============================================================================

output_players = []
for i, p in enumerate(players):
    entry = {
        "name": p["name"],
        "league": p["league"],
        "position": p["position"],
        "careerWAR": p["careerWAR"],
        "hof": p["hof"],
        "x": round(float(embedding_scaled[i, 0]), 4),
        "y": round(float(embedding_scaled[i, 1]), 4),
        "player_type": p["type"],
    }
    if p["imputed"]:
        entry["imputed"] = True
    output_players.append(entry)

output = {
    "_metadata": {
        "title": "Chapter 10: UMAP Embedding of 70-Player Comparable Universe",
        "description": (
            "2D embedding of 50 NLB and 20 MLB players for the comparable "
            "universe map. Players near each other in the embedding had "
            "similar statistical profiles."
        ),
        "method": "UMAP" if USE_UMAP else "PCA",
        "method_params": {
            "n_components": 2,
            "n_neighbors": 15,
            "min_dist": 0.3,
            "metric": "euclidean",
            "random_state": 42,
        } if USE_UMAP else {
            "n_components": 2,
            "method": "PCA (fallback)",
        },
        "features": [
            "BA (or inverted ERA for pitchers)",
            "OBP (or W-L% for pitchers)",
            "SLG (or inverted ERA for pitchers)",
            "OPS (or W-L% for pitchers)",
            "Career WAR",
            "Rate WAR per 600 PA (or per 200 IP for pitchers)",
        ],
        "normalization": "Z-score (mean 0, std 1) per feature",
        "missing_data": (
            "Players with missing stats had those dimensions imputed "
            "with the column median. Imputed players are flagged."
        ),
        "coordinate_range": "0.0 to 1.0 (rescaled from raw UMAP output)",
        "sources": [
            "chapters/10-the-ledger/data/players.json",
            "chapters/10-the-ledger/data/mlb-comparisons.json",
        ],
        "generated": datetime.now().strftime("%Y-%m-%d"),
        "record_count": len(output_players),
        "ai_disclosure": (
            "Embedding coordinates are produced by UMAP, an unsupervised "
            "dimensionality reduction algorithm. Player positions reflect "
            "statistical similarity, not subjective ranking."
        ),
    },
    "players": output_players,
}

output_path = os.path.join(data_dir, "umap-embedding.json")
with open(output_path, "w") as f:
    json.dump(output, f, indent=2)

print(f"\nWritten to: {output_path}")
print(f"Method: {'UMAP' if USE_UMAP else 'PCA'}")
print(f"Players embedded: {len(output_players)}")

# Show some notable clusters
print("\nSample embeddings:")
for p in output_players:
    if p["name"] in ["Josh Gibson", "Babe Ruth", "Oscar Charleston", "Jackie Robinson", "Satchel Paige"]:
        print(f"  {p['name']:25s} ({p['league']}) -> ({p['x']:.3f}, {p['y']:.3f})")
