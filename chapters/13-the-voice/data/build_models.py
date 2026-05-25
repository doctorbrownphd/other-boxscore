"""
Build ML models for Chapter 13 "The Voice"
Model 1: Semantic Search Index (sentence-transformers)
Model 2: Topic Model (TF-IDF + K-means fallback)

Designed to scale as more transcript-*.json files are added.
"""

import json
import glob
import os
import sys
import numpy as np
from pathlib import Path

DATA_DIR = Path(__file__).parent
TRANSCRIPT_GLOB = str(DATA_DIR / "transcript-*.json")

# ─── Load transcripts ───────────────────────────────────────────────

def load_transcripts():
    files = sorted(glob.glob(TRANSCRIPT_GLOB))
    print(f"Found {len(files)} transcript file(s)")
    transcripts = []
    for f in files:
        with open(f) as fh:
            transcripts.append(json.load(fh))
    return transcripts


# ─── Chunking ────────────────────────────────────────────────────────

def chunk_transcript(transcript, chunk_words=200, overlap_words=50):
    """Split transcript text into overlapping word chunks with timestamp alignment."""
    segments = transcript.get("segments", [])
    speaker = transcript.get("speaker", "Unknown")
    source = transcript.get("source_url", "")

    # Build word-level mapping from segments
    words_with_times = []
    for seg in segments:
        seg_words = seg["text"].strip().split()
        if not seg_words:
            continue
        # Distribute time evenly across words in segment
        seg_start = seg["start"]
        seg_end = seg["end"]
        duration = seg_end - seg_start
        for i, w in enumerate(seg_words):
            word_start = seg_start + (duration * i / len(seg_words))
            word_end = seg_start + (duration * (i + 1) / len(seg_words))
            words_with_times.append((w, word_start, word_end))

    if not words_with_times:
        return []

    chunks = []
    step = chunk_words - overlap_words
    i = 0
    while i < len(words_with_times):
        window = words_with_times[i : i + chunk_words]
        text = " ".join(w for w, _, _ in window)
        start_time = window[0][1]
        end_time = window[-1][2]
        chunks.append({
            "speaker": speaker,
            "text": text,
            "start": round(start_time, 2),
            "end": round(end_time, 2),
            "source": source,
        })
        i += step
        if i >= len(words_with_times):
            break

    return chunks


# ─── Model 1: Semantic Search Index ─────────────────────────────────

def build_search_index(all_chunks):
    print("Loading sentence-transformers model...")
    from sentence_transformers import SentenceTransformer

    model = SentenceTransformer("all-MiniLM-L6-v2")
    texts = [c["text"] for c in all_chunks]

    print(f"Embedding {len(texts)} chunks...")
    embeddings = model.encode(texts, show_progress_bar=True, normalize_embeddings=True)

    # Check size: each embedding is 384 floats. At ~8 chars per float in JSON,
    # that is ~3KB per chunk. 100 chunks = ~300KB. Should be fine.
    output_chunks = []
    for chunk, emb in zip(all_chunks, embeddings):
        output_chunks.append({
            **chunk,
            "embedding": [round(float(v), 6) for v in emb],
        })

    result = {
        "model": "all-MiniLM-L6-v2",
        "embedding_dim": 384,
        "n_chunks": len(output_chunks),
        "chunks": output_chunks,
    }

    # Check projected size
    test_json = json.dumps(result)
    size_mb = len(test_json) / (1024 * 1024)
    print(f"Search index size: {size_mb:.2f} MB")

    if size_mb > 5:
        print("File too large. Saving embeddings separately as .npy and metadata as JSON.")
        # Save embeddings as separate file
        emb_array = np.array([c.pop("embedding") for c in output_chunks])
        np.save(str(DATA_DIR / "search-embeddings.npy"), emb_array)
        result["chunks"] = output_chunks
        result["embeddings_file"] = "search-embeddings.npy"
        result.pop("chunks_with_embeddings", None)

    out_path = DATA_DIR / "search-index.json"
    with open(out_path, "w") as f:
        json.dump(result, f, indent=2)
    print(f"Saved: {out_path}")
    return result


# ─── Model 2: Topic Modeling (TF-IDF + K-means) ─────────────────────

def build_topic_model(all_chunks):
    """
    TF-IDF + K-means topic modeling.
    Lightweight alternative to BERTopic that works with small corpora.
    """
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.cluster import KMeans
    from collections import Counter

    texts = [c["text"] for c in all_chunks]
    n_chunks = len(texts)

    if n_chunks < 3:
        print(f"Only {n_chunks} chunks, too few for meaningful topic modeling. Saving single-topic output.")
        result = {
            "model": "TF-IDF + K-means (sklearn)",
            "note": "Fewer than 3 chunks available. Topic modeling will improve as more transcripts are added.",
            "n_topics": 1,
            "topics": [{
                "id": 0,
                "label": "manually assign later",
                "words": [],
                "count": n_chunks,
                "representative_chunks": texts[:3],
            }]
        }
        out_path = DATA_DIR / "topic-model.json"
        with open(out_path, "w") as f:
            json.dump(result, f, indent=2)
        print(f"Saved: {out_path}")
        return result

    # Determine number of topics: heuristic, cap at 10
    n_topics = min(max(3, n_chunks // 5), 10)
    print(f"Running TF-IDF + K-means with {n_topics} topics on {n_chunks} chunks...")

    vectorizer = TfidfVectorizer(
        max_features=1000,
        stop_words="english",
        ngram_range=(1, 2),
        min_df=1,
        max_df=0.95,
    )
    tfidf_matrix = vectorizer.fit_transform(texts)
    feature_names = vectorizer.get_feature_names_out()

    kmeans = KMeans(n_clusters=n_topics, random_state=42, n_init=10)
    labels = kmeans.fit_predict(tfidf_matrix)

    # Extract top words per cluster
    topics = []
    for topic_id in range(n_topics):
        cluster_mask = labels == topic_id
        cluster_indices = [i for i, m in enumerate(cluster_mask) if m]
        count = len(cluster_indices)

        if count == 0:
            continue

        # Get centroid and find top words
        centroid = kmeans.cluster_centers_[topic_id]
        top_word_indices = centroid.argsort()[-15:][::-1]
        top_words = [feature_names[i] for i in top_word_indices]

        # Get representative chunks (closest to centroid)
        from sklearn.metrics.pairwise import cosine_similarity
        cluster_vectors = tfidf_matrix[cluster_mask]
        similarities = cosine_similarity(
            cluster_vectors, centroid.reshape(1, -1)
        ).flatten()
        top_doc_indices = similarities.argsort()[-3:][::-1]
        rep_chunks = [texts[cluster_indices[i]] for i in top_doc_indices]

        topics.append({
            "id": int(topic_id),
            "label": "manually assign later",
            "words": top_words,
            "count": count,
            "representative_chunks": rep_chunks,
        })

    # Sort by count descending
    topics.sort(key=lambda t: t["count"], reverse=True)

    result = {
        "model": "TF-IDF + K-means (sklearn)",
        "vectorizer": "TfidfVectorizer(max_features=1000, ngram_range=(1,2))",
        "n_topics": len(topics),
        "n_chunks": n_chunks,
        "topics": topics,
    }

    out_path = DATA_DIR / "topic-model.json"
    with open(out_path, "w") as f:
        json.dump(result, f, indent=2)
    print(f"Saved: {out_path}")
    return result


# ─── Main ────────────────────────────────────────────────────────────

def main():
    transcripts = load_transcripts()
    if not transcripts:
        print("No transcript files found. Exiting.")
        sys.exit(1)

    # Chunk all transcripts
    all_chunks = []
    for t in transcripts:
        chunks = chunk_transcript(t, chunk_words=200, overlap_words=50)
        all_chunks.extend(chunks)
        print(f"  {t.get('speaker', 'Unknown')}: {len(chunks)} chunks")

    print(f"Total chunks: {len(all_chunks)}")

    # Model 1: Search index
    build_search_index(all_chunks)

    # Model 2: Topic model
    build_topic_model(all_chunks)

    print("\nDone. Both models saved to chapters/13-the-voice/data/")


if __name__ == "__main__":
    main()
