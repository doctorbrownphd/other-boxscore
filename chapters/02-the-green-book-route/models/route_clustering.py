"""
Chapter 02: The Green Book Route -- Route Clustering (HDBSCAN)
==============================================================

Clusters the five documented Negro Leagues travel routes by geographic
pattern using HDBSCAN (Hierarchical Density-Based Spatial Clustering
of Applications with Noise).

Methodology:
  Each route is reduced to a feature vector capturing its geographic
  and safety characteristics:
    - Centroid latitude and longitude (mean of all stop coordinates)
    - Latitudinal spread (std dev of latitudes, measures N-S range)
    - Longitudinal spread (std dev of longitudes, measures E-W range)
    - Total route distance (sum of haversine distances between stops)
    - Number of stops
    - Dark city count (stops with no walking-distance Green Book listings)
    - Dark city percentage
    - Mean safety score

  HDBSCAN is preferred because it can identify noise points (routes
  that do not cluster) and does not require specifying k in advance.

  With only 5 routes, true clustering is limited. The output primarily
  serves the visualization by providing cluster labels and route
  feature summaries. The interpretive value is in the feature vectors
  themselves, not the cluster assignments.

Sources:
  - chapters/02-the-green-book-route/data/green-book-data.js
  - NYPL Schomburg Center Green Book digitization (CC0)

Output: chapters/02-the-green-book-route/data/route-clusters.json
"""

import json
import os
import re
import math
import numpy as np
from datetime import datetime

try:
    import hdbscan
    USE_HDBSCAN = True
except ImportError:
    from sklearn.cluster import KMeans
    USE_HDBSCAN = False

# ============================================================================
# Parse the JS data file
# ============================================================================

data_dir = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "data"
)
js_path = os.path.join(data_dir, "green-book-data.js")

with open(js_path, "r") as f:
    js_content = f.read()

# Extract the ROUTES array by finding the var ROUTES = [...]; block
# Strategy: find the opening bracket and match to the closing ];
routes_match = re.search(r"var ROUTES\s*=\s*\[", js_content)
if not routes_match:
    raise ValueError("Could not find ROUTES array in green-book-data.js")

start = routes_match.start()
# Find the matching closing bracket
bracket_depth = 0
end = None
for i in range(routes_match.end() - 1, len(js_content)):
    if js_content[i] == "[":
        bracket_depth += 1
    elif js_content[i] == "]":
        bracket_depth -= 1
        if bracket_depth == 0:
            end = i + 1
            break

routes_js = js_content[routes_match.end() - 1 : end]

# Convert JS object notation to valid JSON
# Add quotes around unquoted keys
routes_json = re.sub(r"(\w+)\s*:", r'"\1":', routes_js)
# Handle true/false
routes_json = routes_json.replace(":true", ":true").replace(":false", ":false")

routes = json.loads(routes_json)
print(f"Parsed {len(routes)} routes from green-book-data.js")


# ============================================================================
# Haversine distance
# ============================================================================

def haversine(lat1, lon1, lat2, lon2):
    """Distance in miles between two lat/lon points."""
    R = 3959  # Earth radius in miles
    phi1, phi2 = math.radians(lat1), math.radians(lat2)
    dphi = math.radians(lat2 - lat1)
    dlam = math.radians(lon2 - lon1)
    a = math.sin(dphi / 2) ** 2 + math.cos(phi1) * math.cos(phi2) * math.sin(dlam / 2) ** 2
    return R * 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))


# ============================================================================
# Build feature vectors for each route
# ============================================================================

route_features = []
route_summaries = []

for route in routes:
    stops = route["stops"]
    lats = [s["lat"] for s in stops]
    lons = [s["lon"] for s in stops]

    # Centroid
    centroid_lat = np.mean(lats)
    centroid_lon = np.mean(lons)

    # Spread
    lat_spread = np.std(lats)
    lon_spread = np.std(lons)

    # Total distance
    total_dist = 0
    for i in range(1, len(stops)):
        total_dist += haversine(
            stops[i - 1]["lat"], stops[i - 1]["lon"],
            stops[i]["lat"], stops[i]["lon"],
        )

    # Dark cities
    dark_count = sum(1 for s in stops if s["dark"])
    dark_pct = dark_count / len(stops) if stops else 0

    # Mean safety score
    mean_ss = np.mean([s["ss"] for s in stops])

    # Number of stops
    n_stops = len(stops)

    feature_vec = [
        centroid_lat,
        centroid_lon,
        lat_spread,
        lon_spread,
        total_dist,
        n_stops,
        dark_count,
        dark_pct,
        mean_ss,
    ]
    route_features.append(feature_vec)

    # Build city list for summary
    cities = [f"{s['city']}, {s['st']}" for s in stops]
    unique_states = sorted(set(s["st"] for s in stops))

    route_summaries.append({
        "team": route["team"],
        "season": route["season"],
        "n_stops": n_stops,
        "centroid_lat": round(centroid_lat, 4),
        "centroid_lon": round(centroid_lon, 4),
        "lat_spread": round(lat_spread, 4),
        "lon_spread": round(lon_spread, 4),
        "total_distance_miles": round(total_dist, 1),
        "dark_cities": dark_count,
        "dark_city_pct": round(dark_pct * 100, 1),
        "mean_safety_score": round(float(mean_ss), 4),
        "states_traversed": unique_states,
        "cities": cities,
    })


# ============================================================================
# Normalize features
# ============================================================================

feature_array = np.array(route_features)
means = np.mean(feature_array, axis=0)
stds = np.std(feature_array, axis=0)
stds[stds == 0] = 1.0
normalized = (feature_array - means) / stds


# ============================================================================
# Clustering
# ============================================================================

if USE_HDBSCAN:
    print("Using HDBSCAN for clustering")
    # min_cluster_size=2 because we only have 5 routes
    clusterer = hdbscan.HDBSCAN(
        min_cluster_size=2,
        min_samples=1,
        metric="euclidean",
    )
    labels = clusterer.fit_predict(normalized)
    probabilities = clusterer.probabilities_
else:
    print("HDBSCAN not available, falling back to K-means (k=3)")
    kmeans = KMeans(n_clusters=min(3, len(routes)), random_state=42, n_init=10)
    labels = kmeans.fit_predict(normalized)
    probabilities = np.ones(len(routes))

# Map cluster labels to interpretive names
cluster_descriptions = {}
for i, summary in enumerate(route_summaries):
    label = int(labels[i])
    if label not in cluster_descriptions:
        cluster_descriptions[label] = []
    cluster_descriptions[label].append(summary["team"])

print(f"\nClusters found: {len(set(labels) - {-1})}")
for label, teams in sorted(cluster_descriptions.items()):
    label_name = f"Cluster {label}" if label >= 0 else "Noise"
    print(f"  {label_name}: {', '.join(teams)}")

# Assign interpretive labels based on geographic patterns
def interpret_cluster(summaries_in_cluster):
    """Generate a geographic interpretation for a cluster."""
    avg_lat = np.mean([s["centroid_lat"] for s in summaries_in_cluster])
    avg_lon = np.mean([s["centroid_lon"] for s in summaries_in_cluster])
    avg_dark = np.mean([s["dark_city_pct"] for s in summaries_in_cluster])

    if avg_lon < -88:
        region = "Midwest/South"
    elif avg_lat > 39:
        region = "Northeast Corridor"
    else:
        region = "Southeast Circuit"

    if avg_dark > 70:
        safety = "high-risk"
    elif avg_dark > 40:
        safety = "mixed-safety"
    else:
        safety = "lower-risk"

    return f"{region}, {safety} ({avg_dark:.0f}% dark cities)"


# ============================================================================
# Build output
# ============================================================================

output_routes = []
for i, summary in enumerate(route_summaries):
    label = int(labels[i])
    cluster_members = [
        route_summaries[j]
        for j in range(len(route_summaries))
        if int(labels[j]) == label
    ]

    entry = {
        **summary,
        "cluster_id": label if label >= 0 else None,
        "cluster_label": (
            interpret_cluster(cluster_members) if label >= 0
            else "Unclustered (noise)"
        ),
        "cluster_probability": round(float(probabilities[i]), 4),
    }
    output_routes.append(entry)

feature_names = [
    "centroid_lat", "centroid_lon", "lat_spread", "lon_spread",
    "total_distance_miles", "n_stops", "dark_cities",
    "dark_city_pct", "mean_safety_score",
]

output = {
    "_metadata": {
        "title": "Chapter 02: Green Book Route Clustering",
        "description": (
            "HDBSCAN clustering of five documented Negro Leagues travel "
            "routes by geographic pattern and safety profile. Each route "
            "is characterized by its centroid, spread, total distance, "
            "dark city count, and mean Green Book safety score."
        ),
        "method": "HDBSCAN" if USE_HDBSCAN else "K-means (fallback)",
        "method_params": {
            "min_cluster_size": 2,
            "min_samples": 1,
            "metric": "euclidean",
        } if USE_HDBSCAN else {
            "k": min(3, len(routes)),
            "method": "K-means (HDBSCAN not available)",
        },
        "features": feature_names,
        "normalization": "Z-score (mean 0, std 1) per feature",
        "n_routes": len(routes),
        "n_clusters": len(set(labels) - {-1}),
        "sources": [
            {
                "id": "nypl-greenbook",
                "name": "NYPL Schomburg Center Green Book Digitization",
                "url": "https://github.com/NYPL-publicdomain/greenbooks",
                "license": "CC0 1.0",
            },
            {
                "id": "seamheads",
                "name": "Seamheads Negro Leagues Database",
                "url": "https://www.seamheads.com/NegroLgs/",
                "note": "Game schedule data for route reconstruction",
            },
        ],
        "limitations": [
            "Only 5 routes are available, severely limiting clustering power.",
            "HDBSCAN with min_cluster_size=2 may produce many noise points.",
            "The interpretive value is primarily in the per-route feature "
            "summaries, not the cluster assignments.",
            "Route reconstruction is from documented game schedules, not "
            "actual travel itineraries. Actual travel may have differed.",
        ],
        "generated": datetime.now().strftime("%Y-%m-%d"),
        "ai_disclosure": (
            "Cluster assignments are produced by an unsupervised algorithm. "
            "Cluster labels are AI-generated interpretations of the "
            "geographic patterns, not historical claims."
        ),
    },
    "routes": output_routes,
}

output_path = os.path.join(data_dir, "route-clusters.json")
with open(output_path, "w") as f:
    json.dump(output, f, indent=2)

print(f"\nWritten to: {output_path}")

# Print route summary table
print("\nRoute Summary:")
print(f"{'Team':35s} {'Season':>6} {'Stops':>5} {'Miles':>7} {'Dark%':>6} {'SS':>5} {'Cluster':>8}")
print("-" * 80)
for r in output_routes:
    print(
        f"{r['team']:35s} {r['season']:>6} {r['n_stops']:>5} "
        f"{r['total_distance_miles']:>7.0f} {r['dark_city_pct']:>5.1f}% "
        f"{r['mean_safety_score']:>5.3f} {r['cluster_id'] if r['cluster_id'] is not None else 'noise':>8}"
    )
