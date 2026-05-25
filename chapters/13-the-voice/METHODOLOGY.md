# The Voice -- Methodology
## theotherboxscore.org/chapters/the-voice/

**Version:** 1.0
**Published:** May 2026
**Last updated:** 2026-05-25
**Reviewed by:** Elias (statistical methodology) . Oscar (historical grounding)

---

## What This Chapter Does

This chapter assembles the existing Negro Leagues oral history record into a single navigable index. It documents 37 recordings across 24 speakers and 7 institutions, builds a searchable transcript corpus from 25 audio sources, produces a 10-topic thematic map of the testimony, and presents three featured speakers in depth. The chapter does not record new interviews. It aggregates, indexes, and presents the institutional work that already exists, properly credited to the institutions that collected it.

---

## Data Sources

### SABR Oral History Collection
- **Source:** Society for American Baseball Research, Oral History Committee
- **URL:** https://sabr.org/oralhistory
- **Coverage:** 500+ interviews across all eras of baseball, Negro Leagues subset tagged. Interviews conducted 1988-present.
- **License:** Open access. Digitized MP3s and PDF transcripts available online.
- **Access date:** 2026-05-24
- **Known limitations:** Negro Leagues tag covers only 11 interviews. Additional NL content exists in untagged interviews. Transcripts vary in quality and completeness.
- **How used:** 20 recordings indexed in the archive. 25 audio files transcribed via Whisper for the search index and topic model.

### University of Baltimore Negro League Oral History Collection
- **Source:** Langsdale Library Special Collections and Archives
- **URL:** https://archivesspace.ubalt.edu/repositories/2/resources/76
- **Coverage:** 8 oral history interviews conducted in 1998. Interviewees: Ernest Burke, Mamie Johnson, Robert Hieronimus, Gordon Hopkins, Robert Leffler Jr., Hubert Simmons, Charles Winner, Geraldine Day.
- **License:** Open access. 7 audio recordings and all 8 transcripts available online.
- **Access date:** 2026-05-24
- **Known limitations:** Small collection focused on Baltimore-area connections. Conducted by student interviewers with varying depth.
- **How used:** All 8 interviews indexed. Audio transcribed for search index and topic model.

### State Historical Society of Missouri, Kansas City Monarchs Oral History Collection (K0047)
- **Source:** State Historical Society of Missouri
- **URL:** Not publicly accessible online
- **Coverage:** 18 oral history interviews and correspondence, 1978-1981. Focused on Kansas City Monarchs players and associates.
- **License:** By-request access, physical and digital.
- **Access date:** 2026-05-24 (catalog description only)
- **Known limitations:** Not digitized for public access. Interview content known from published collection descriptions and secondary references only.
- **How used:** 10 recordings indexed in the archive based on published collection descriptions. Not included in transcript corpus (no audio access).

### Negro Leagues Baseball Museum Archive
- **Source:** NLBM, Buck O'Neil Education and Research Center
- **URL:** https://www.nlbm.com/visit/buck-oneil-center/
- **Coverage:** Internal archive with oral histories, papers, and supporting materials. Scope not publicly documented.
- **License:** By-request access for credentialed researchers.
- **Access date:** 2026-05-24 (institutional documentation only)
- **Known limitations:** Collection scope not publicly inventoried. Access requires institutional coordination.
- **How used:** Referenced in archive index. Not included in transcript corpus.

### NPR Archive
- **Source:** National Public Radio
- **URL:** https://www.npr.org
- **Coverage:** Multiple Negro Leagues interviews including Mamie Johnson (Bob Edwards, 2003; Scott Simon, 2002).
- **License:** Open access for broadcast recordings.
- **Access date:** 2026-05-24
- **Known limitations:** Full interview audio may not be publicly available. Broadcast excerpts are the accessible record.
- **How used:** 2 recordings indexed. Referenced in featured speaker excerpts.

### PBS / Florentine Films
- **Source:** Ken Burns, Baseball (1994)
- **URL:** PBS archives (restricted)
- **Coverage:** Buck O'Neil interview footage (estimated 6 hours full interview). Broadcast excerpts in nine-part documentary series.
- **License:** Restricted. Full interview footage in PBS archives. Broadcast excerpts are public.
- **Access date:** 2026-05-24 (published documentation only)
- **Known limitations:** Full interview footage not publicly accessible. Only broadcast excerpts available.
- **How used:** 1 recording indexed. Referenced in featured speaker excerpts.

### Phil Dixon Collection
- **Source:** Private collection. Referenced in Phil Dixon publications on Negro Leagues history.
- **URL:** Not publicly accessible
- **Coverage:** Buck O'Neil interview tapes (1985), approximately 4 hours.
- **License:** Restricted. Private collection.
- **Access date:** 2026-05-24 (published references only)
- **Known limitations:** Private collection. Not publicly cataloged. Content known from published references only.
- **How used:** 1 recording indexed based on published references.

---

## Data Processing

### Step 1: Audio Transcription
- **Tool:** OpenAI Whisper, base model
- **Input:** 25 audio files (MP3/M4A) from SABR and University of Baltimore collections
- **Output:** 25 JSON transcript files with segment-level timing, speaker metadata, and source attribution
- **Accuracy / success rate:** Whisper base model. No formal accuracy measurement against ground truth. Known error sources: speaker dialect, era-specific vocabulary, Negro Leagues terminology, proper nouns, place names.
- **Failures and gaps:** All 25 files transcribed. No files failed processing. Transcript quality varies by audio quality and speaker clarity. No human correction pass has been completed.

### Step 2: Archive Index Compilation
- **Tool:** Manual research and structured JSON compilation
- **Input:** Institutional collection descriptions, catalog records, published references, SABR online catalog, UBalt ArchivesSpace finding aid, SHSMO K0047 descriptions, NPR archive, PBS documentation
- **Output:** `data/archive-index.json` with 37 recording entries, 15 gap acknowledgment entries, and 7 institutional profiles
- **Accuracy / success rate:** Metadata verified against institutional documentation where available. Duration for SABR interviews verified from sabr.org catalog pages. SHSMO details from published collection descriptions (not direct access).
- **Failures and gaps:** Recordings known to exist but not cataloged (e.g., additional NLBM holdings) are not included. The index documents what can be verified, not the full extent of the record.

---

## Machine Learning Models

### M1: Semantic Search Index

**Model type:** Sentence embedding with cosine similarity retrieval
**Library / framework:** sentence-transformers (all-MiniLM-L6-v2), Python
**Training data:** Pre-trained model, not fine-tuned. Applied to 333 transcript chunks.
**Feature set:** 500-word text windows with 100-word overlap from Whisper transcripts
**Hyperparameters:** Chunk size 500 words, overlap 100 words, embedding dimension 384
**Output:** `data/search-index.json` with 333 chunks, each carrying a 384-dimensional embedding vector, speaker name, text, timestamps, and source URL
**Confidence representation:** Labeled "AI-generated" with explicit warning: "Embeddings produced by sentence-transformers/all-MiniLM-L6-v2. Chunks are 500-word windows with 100-word overlap over Whisper-transcribed audio. Transcription errors propagate into embeddings."
**Known failure modes:** Transcription errors from Whisper propagate into embeddings. Dialect, era-specific vocabulary, and proper nouns are common error sources. Semantic similarity may not capture the full range of oral testimony expression.
**Reproducibility:** Run `python models/build_search_index.py` from the chapter directory. Requires sentence-transformers library.

### M2: Topic Model

**Model type:** TF-IDF vectorization + K-means clustering
**Library / framework:** scikit-learn (TfidfVectorizer, KMeans), Python
**Training data:** 333 transcript chunks from the search index
**Feature set:** TF-IDF vectors with max_features=1000, ngram_range=(1,2)
**Hyperparameters:** n_topics=10, TF-IDF max_features=1000, ngram_range=(1,2)
**Output:** `data/topic-model.json` with 10 topics, each carrying top TF-IDF terms, chunk count, and representative text passages
**Confidence representation:** Labeled "AI-generated." Topic labels editorially assigned 2026-05-25 by manual review of top terms and representative chunks. The model proposes clusters; humans assign names.
**Known failure modes:** Oral testimony does not use canonical terminology. Topics overlap. Whisper transcription errors propagate into topic assignments. K-means assumes spherical clusters, which may not reflect the actual topic structure of oral testimony.
**Reproducibility:** Run `python models/build_topic_model.py` from the chapter directory. Requires scikit-learn.

### M3: Audio Transcription (Whisper)

**Model type:** Automatic speech recognition (ASR)
**Library / framework:** OpenAI Whisper, base model
**Training data:** Pre-trained model. Not fine-tuned on Negro Leagues audio.
**Feature set:** Raw audio input (MP3/M4A)
**Hyperparameters:** Whisper base model defaults
**Output:** 25 JSON transcript files with word-level timing
**Confidence representation:** Platform-generated transcripts are flagged as such. Institutional transcripts are flagged as institutional. The distinction is documented in each transcript file's metadata.
**Known failure modes:** Speaker dialect, era-specific vocabulary, Negro Leagues terminology, and proper nouns are known error sources. Audio quality varies significantly across collections. No human correction pass has been applied.
**Reproducibility:** Run `python transcribe_all.py` from the chapter directory. Requires openai-whisper library and the source audio files.

---

## AI-Generated Content

### Whisper Transcripts
**Generated by:** OpenAI Whisper (base model)
**Input:** 25 audio files from SABR and University of Baltimore collections
**Output:** Segment-level transcripts with timing, used for search index and topic model
**Confidence label:** Labeled "AI-generated" in all transcript metadata. Inline confidence note in the chapter's methodology section.
**Human review:** No systematic human correction pass completed. Transcripts are research aids, not authoritative records. Readers are directed to source recordings for verification.
**Known limitations:** Whisper base model was not trained on mid-20th century Black American English or Negro Leagues terminology. Error rates are expected to be higher than for modern standard English.

### Topic Model Labels
**Generated by:** TF-IDF + K-means (sklearn). Labels assigned editorially.
**Input:** 333 transcript chunks
**Output:** 10 topic clusters with editorially assigned labels
**Confidence label:** Labeled "AI-generated" for clustering, "Editorially assigned" for labels.
**Human review:** All 10 topic labels were manually reviewed and assigned on 2026-05-25.
**Known limitations:** Topic boundaries are artifacts of the clustering algorithm, not inherent properties of the testimony. Readers should treat topics as navigational aids, not as content analysis.

### Search Index Embeddings
**Generated by:** sentence-transformers/all-MiniLM-L6-v2
**Input:** 333 transcript chunks (500-word windows)
**Output:** 384-dimensional embedding vectors per chunk
**Confidence label:** Labeled "AI-generated" with transcription error propagation warning.
**Human review:** No human review of individual embeddings. The search interface presents ranked candidates, not single answers.
**Known limitations:** Embedding quality limited by transcript quality. Semantic similarity may miss culturally specific expressions.

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| SHSMO audio not accessed | 18 interviews in K0047 collection not directly accessed; metadata from published descriptions only | Topic model and search index do not include SHSMO testimony | Recordings indexed with metadata. Flagged as "by-request" access. |
| NLBM holdings not inventoried | Museum archive scope not publicly documented | Archive index likely incomplete for NLBM holdings | Referenced in institutional map. Flagged for future coordination. |
| No human transcript correction | Whisper transcripts not corrected against audio | Transcription errors propagate into search and topic model | Labeled as AI-generated. Readers directed to source recordings. |
| Pre-1970 speakers absent | Players who died before oral history collection began | 15 notable absences documented in gap acknowledgment | Presented as gaps, not filled with speculation. Secondary testimony noted where available. |
| Living speaker permissions | Some speakers or estates not yet contacted | Excerpt use restricted until permissions documented | Permission status documented per recording. Unpermitted excerpts not included. |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| Buck O'Neil recorded 50+ hours | Total hours estimated from multiple collections, not precisely measured | SABR catalog, SHSMO K0047 description, Phil Dixon references, PBS documentation | Labeled "Documented" for known recordings, "Estimated" for total |
| Mamie Johnson's 33-8 record | Reported record, not independently verified from box scores | Green (2002), NPR interview (2003), UBalt oral history (2008) | Labeled "Reported" |
| Cool Papa Bell 1986 interview | Referenced in Wikipedia with photograph, but recording not located | Wikipedia article on Cool Papa Bell | Labeled "Reported," access "unknown" |

---

## Cross-League Comparisons

This chapter makes no cross-league statistical comparisons. The testimony chapter presents the players' own words, not comparative statistical analysis.

---

## Reproducibility

**Code:** Pipeline scripts in `chapters/13-the-voice/` (transcribe_all.py, scrape_sabr.py, models/build_search_index.py, models/build_topic_model.py)
**Data:** Pre-computed outputs in `chapters/13-the-voice/data/` (CC0 for index metadata, recording-specific rights per archive-index.json)
**Raw data:** Audio files required for transcription. SABR collection accessible at sabr.org/oralhistory. UBalt collection at archivesspace.ubalt.edu.
**Environment:** Python 3.10+, openai-whisper, sentence-transformers, scikit-learn, numpy
**Runtime:** Transcription: ~2 hours for 25 files on GPU. Search index: ~5 minutes. Topic model: ~1 minute.

To reproduce:
```bash
cd chapters/13-the-voice/
pip install openai-whisper sentence-transformers scikit-learn numpy
python transcribe_all.py
python models/build_search_index.py
python models/build_topic_model.py
```

Output files will appear in `data/` and match the committed versions.

---

## Testimony Ethics

This methodology document includes an ethics note not present in the canonical template, because this chapter handles oral testimony rather than statistical data.

**Voice precedes analysis.** The platform's argument does not displace the speakers. Editorial framing is brief. The speakers carry the narrative.

**Excerpt selection.** Every excerpt is reviewed for fairness to the speaker. Passages are not extracted to serve an argument the speaker did not make.

**Gap acknowledgment.** Absence is presented as absence, not as an invitation for reconstruction. The platform does not speculate about what unrecorded speakers would have said.

**Living speakers.** Any living speaker's inclusion requires approval from the speaker or their authorized representative.

**Institutional respect.** The platform respects institutional access policies absolutely. Where an institution restricts access, the platform directs readers to the institution.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-05-25 | Initial publication |

---

## Citation

Haynes, Jeremy. "The Voice: Methodology." The Other Box Score. May 2026. https://theotherboxscore.org/chapters/the-voice/

---

## Questions and Corrections

If you find an error in this methodology, open an issue at github.com/doctorbrownphd/the-other-boxscore/issues or contact the project owner. Corrections are documented in the version history above.
