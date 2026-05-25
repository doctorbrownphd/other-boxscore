"""
Build semantic search index for Ch 13: The Voice.

Reads all 25 transcript-*.json files, chunks them into ~500-word windows
with 100-word overlap, embeds each chunk with all-MiniLM-L6-v2, and writes
the search-index.json consumed by the chapter frontend.

Confidence: AI-generated (sentence-transformer embeddings).
"""

import json
import glob
import os
import sys
from pathlib import Path

from sentence_transformers import SentenceTransformer

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
OUT_PATH = DATA_DIR / "search-index.json"
MODEL_NAME = "all-MiniLM-L6-v2"
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
    """Split a transcript into overlapping word-based chunks.

    Each chunk carries speaker, source_url, and approximate start/end times
    derived from segments.
    """
    speaker = t.get("speaker", "Unknown")
    source = t.get("source_url", "")
    segments = t.get("segments", [])
    full_text = t.get("text", "")

    # Build a word-level index mapping each word position to its segment
    # so we can recover approximate timestamps for each chunk.
    words_all = full_text.split()
    if not words_all:
        return []

    # Map word index to segment index for timestamp recovery
    word_to_seg = []
    seg_idx = 0
    words_so_far = 0
    for si, seg in enumerate(segments):
        seg_words = seg["text"].split()
        for _ in seg_words:
            word_to_seg.append(si)
        words_so_far += len(seg_words)
    # Pad if mismatch (whisper artifacts)
    while len(word_to_seg) < len(words_all):
        word_to_seg.append(len(segments) - 1 if segments else 0)

    chunks = []
    i = 0
    while i < len(words_all):
        end_i = min(i + CHUNK_WORDS, len(words_all))
        chunk_text = " ".join(words_all[i:end_i])

        # Recover timestamps
        start_seg = word_to_seg[i] if i < len(word_to_seg) else 0
        end_seg = word_to_seg[end_i - 1] if (end_i - 1) < len(word_to_seg) else len(segments) - 1

        start_time = segments[start_seg]["start"] if segments and start_seg < len(segments) else 0.0
        end_time = segments[end_seg]["end"] if segments and end_seg < len(segments) else 0.0

        chunks.append({
            "speaker": speaker,
            "text": chunk_text,
            "start": round(start_time, 2),
            "end": round(end_time, 2),
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

    print(f"Loading model: {MODEL_NAME} ...")
    model = SentenceTransformer(MODEL_NAME)

    texts = [c["text"] for c in all_chunks]
    print("Computing embeddings ...")
    embeddings = model.encode(texts, show_progress_bar=True, batch_size=32)

    for chunk, emb in zip(all_chunks, embeddings):
        chunk["embedding"] = [round(float(v), 6) for v in emb]

    output = {
        "model": MODEL_NAME,
        "embedding_dim": int(embeddings.shape[1]),
        "n_chunks": len(all_chunks),
        "confidence": "AI-generated",
        "confidence_detail": (
            "Embeddings produced by sentence-transformers/all-MiniLM-L6-v2. "
            "Chunks are 500-word windows with 100-word overlap over Whisper-transcribed audio. "
            "Transcription errors propagate into embeddings."
        ),
        "chunks": all_chunks,
    }

    with open(OUT_PATH, "w") as f:
        json.dump(output, f, indent=2)
    print(f"Wrote {OUT_PATH} ({len(all_chunks)} chunks, {int(embeddings.shape[1])}d embeddings)")


if __name__ == "__main__":
    main()
