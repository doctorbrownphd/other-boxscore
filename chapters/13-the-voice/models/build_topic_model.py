"""
Build topic model for Ch 13: The Voice.

Reads all 25 transcript-*.json files, chunks them, applies TF-IDF
vectorization, clusters with K-means, and writes topic-model.json
consumed by the chapter frontend.

Confidence: AI-generated (TF-IDF + K-means clustering).
"""

import json
import glob
import os
import sys
from pathlib import Path
from collections import Counter

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import KMeans

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
OUT_PATH = DATA_DIR / "topic-model.json"
N_TOPICS = 10
CHUNK_WORDS = 500
OVERLAP_WORDS = 100


def load_transcripts():
    """Load all transcript-*.json files, sorted by filename."""
    paths = sorted(glob.glob(str(DATA_DIR / "transcript-*.json")))
    transcripts = []
    for p in paths:
        with open(p) as f:
            transcripts.append(json.load(f))
    return transcripts


def chunk_transcript(t):
    """Split a transcript into overlapping word-based chunks."""
    speaker = t.get("speaker", "Unknown")
    source = t.get("source_url", "")
    full_text = t.get("text", "")

    words_all = full_text.split()
    if not words_all:
        return []

    chunks = []
    i = 0
    while i < len(words_all):
        end_i = min(i + CHUNK_WORDS, len(words_all))
        chunk_text = " ".join(words_all[i:end_i])
        chunks.append({
            "speaker": speaker,
            "text": chunk_text,
            "source": source,
        })
        if end_i >= len(words_all):
            break
        i += CHUNK_WORDS - OVERLAP_WORDS

    return chunks


def main():
    print(f"Loading transcripts from {DATA_DIR} ...")
    transcripts = load_transcripts()
    print(f"  Found {len(transcripts)} transcript files.")

    all_chunks = []
    for t in transcripts:
        all_chunks.extend(chunk_transcript(t))
    print(f"  Total chunks: {len(all_chunks)}")

    texts = [c["text"] for c in all_chunks]

    print("Fitting TF-IDF vectorizer ...")
    vectorizer = TfidfVectorizer(
        max_features=1000,
        ngram_range=(1, 2),
        stop_words="english",
        min_df=2,
        max_df=0.95,
    )
    tfidf_matrix = vectorizer.fit_transform(texts)
    feature_names = vectorizer.get_feature_names_out()

    print(f"Clustering into {N_TOPICS} topics ...")
    kmeans = KMeans(n_clusters=N_TOPICS, random_state=42, n_init=10)
    labels = kmeans.fit_predict(tfidf_matrix)

    # Build topic summaries
    topics = []
    for topic_id in range(N_TOPICS):
        mask = labels == topic_id
        indices = np.where(mask)[0]
        count = int(mask.sum())

        if count == 0:
            continue

        # Top words: average TF-IDF for this cluster, take top 15
        cluster_tfidf = tfidf_matrix[mask].toarray().mean(axis=0)
        top_word_indices = cluster_tfidf.argsort()[::-1][:15]
        top_words = [str(feature_names[i]) for i in top_word_indices]

        # Representative chunks: closest to centroid
        centroid = kmeans.cluster_centers_[topic_id]
        dists = np.linalg.norm(tfidf_matrix[mask].toarray() - centroid, axis=1)
        rep_indices = dists.argsort()[:3]
        representative_chunks = [texts[indices[ri]] for ri in rep_indices]

        topics.append({
            "id": topic_id,
            "label": "manually assign later",
            "words": top_words,
            "count": count,
            "representative_chunks": representative_chunks,
        })

    # Sort by count descending
    topics.sort(key=lambda t: t["count"], reverse=True)

    output = {
        "model": "TF-IDF + K-means (sklearn)",
        "vectorizer": f"TfidfVectorizer(max_features=1000, ngram_range=(1,2))",
        "n_topics": N_TOPICS,
        "n_chunks": len(all_chunks),
        "confidence": "AI-generated",
        "confidence_detail": (
            "Topics derived from TF-IDF vectorization and K-means clustering "
            "over Whisper-transcribed oral history audio. Cluster labels are "
            "placeholders for manual editorial assignment. Transcription errors "
            "from Whisper (base model) propagate into topic assignments."
        ),
        "topics": topics,
    }

    with open(OUT_PATH, "w") as f:
        json.dump(output, f, indent=2)
    print(f"Wrote {OUT_PATH} ({len(topics)} topics from {len(all_chunks)} chunks)")


if __name__ == "__main__":
    main()
