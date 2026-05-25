# The Courier Archive -- Methodology
## theotherboxscore.org/chapters/the-courier-archive/

**Version:** 1.0
**Published:** May 2026
**Last updated:** 2026-05-25
**Reviewed by:** Elias (statistical methodology) . Oscar (historical grounding)

---

## What This Chapter Does

This chapter indexes seventy-five years of Black baseball journalism from ten major Black press publications (1920--1975) and makes that corpus navigable through five computational models: OCR correction, named entity recognition, topic modeling, box score detection, and semantic search. The corpus covers the Pittsburgh Courier, Chicago Defender, Baltimore Afro-American, New York Amsterdam News, Kansas City Call, Atlanta Daily World, Norfolk Journal and Guide, Michigan Chronicle, Philadelphia Tribune, and Cleveland Call and Post. The chapter's central finding is structural: the Black press did not merely cover the Negro Leagues, it built them, then argued for the integration that dissolved them. That arc is visible in the topic model's year-by-year prevalence curves, where integration advocacy rises through the late 1930s, peaks between 1945 and 1947, and then gives way to aftermath coverage. The chapter also identifies 15 candidate box score recovery cases where the Black press published game data not yet captured in the Seamheads database.

---

## Data Sources

### Black Press Baseball Journalism Corpus
- **Source:** Digitized newspaper archives from ten Black press publications
- **URL or archive location:** Multiple digitization platforms (see below)
- **Coverage:** 1920--1975, ten publications, approximately 50 articles represented in the searchable index
- **License:** Copyrighted material. The chapter presents a searchable index, brief excerpts under fair use principles, and access pathways to source holdings. It does not reproduce substantial copyrighted content.
- **Access date:** 2026-05-24
- **Known limitations:** Digitization coverage varies by publication and decade. The Pittsburgh Courier and Chicago Defender have the most complete digital archives. Smaller publications (Kansas City Call, Norfolk Journal and Guide) have significant gaps in digitized holdings. OCR quality varies dramatically across publications, decades, and digitization sources.
- **How used in this chapter:** Source material for the corpus index, topic modeling, named entity recognition, box score detection, and semantic search.

### Digitization Sources
- **Newspapers.com:** Negro Leagues baseball topic collection
- **ProQuest Historical Black Newspapers:** Primary access pathway for Courier, Defender, Afro-American
- **Chronicling America (Library of Congress):** Supplemental digitized holdings
- **GenealogyBank:** Black press holdings
- **Accessible Archives:** African American Newspapers collection

### Seamheads Negro Leagues Database
- **Source:** Agate Type Research
- **URL or archive location:** https://www.seamheads.com/NegroLgs/
- **Coverage:** Approximately 75% of documented Negro Leagues box scores
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** The database documents approximately 75% of Negro Leagues box scores. The remaining 25% represents games that were played and documented in the Black press but have not yet been digitized into the statistical database.
- **How used in this chapter:** Cross-reference target for box score recovery candidates. The chapter identifies games documented in the Black press corpus that appear absent from or incompletely documented in the Seamheads database.

### National Baseball Hall of Fame Library (PASTIME Archive)
- **Source:** National Baseball Hall of Fame and Museum
- **URL or archive location:** collection.baseballhall.org
- **Coverage:** Wendell Smith Papers, institutional records
- **License:** Research use
- **Access date:** 2026-05-24
- **Known limitations:** Physical archive with limited digital access. Some materials available through the PASTIME digital platform.
- **How used in this chapter:** Access pathway for primary source materials cited in the corpus index.

### Academic and Secondary Sources
- **Carroll, Brian.** "Early Twentieth Century Heroes: Coverage of Negro League Baseball in the Pittsburgh Courier and the Chicago Defender." SABR, 2021.
- **Dawkins, Wayne.** Sam Lacy and Wendell Smith: The Dynamic Duo that Desegregated American Sports. Routledge, 2024.
- **Heaphy, Leslie.** The Negro Leagues, 1869--1960. McFarland, 2003.
- **Hopkins, David.** "The Black Press and the Collapse of the Negro League in 1930." SABR Digital Library.
- **National Baseball Hall of Fame.** "Black Newspapers Preserved Negro Leagues History." 2016.
- **How used in this chapter:** Historical context, publication histories, writer biographies, and cross-referencing of claims about the Black press's institutional role.

### Publication Metadata
- **Source:** Historical records, masthead data, circulation figures from secondary sources
- **Coverage:** Ten publications with founding year, city, state, peak circulation, key writers, and coverage period
- **License:** Public record
- **Known limitations:** Peak circulation figures are documented but come from different measurement periods and methodologies across publications. The Pittsburgh Courier's peak of 330,000 (1947) is the best-documented figure.
- **How used in this chapter:** Newspaper map (Fig 05) and publication profiles.

---

## Data Processing

### Step 1: OCR Correction and Article Segmentation (Model 1)
- **Tool:** Two-stage pipeline. Rule-based post-correction layer applying period-specific vocabulary (player names, team names, league names), followed by a layout-analysis model for article segmentation.
- **Input:** Digitized newspaper page images and raw OCR text from digitization platforms
- **Output:** Segmented articles with metadata (column head, byline, date, page) and estimated OCR quality score
- **Accuracy / success rate:** Every article is flagged with an estimated OCR quality score. Articles below threshold are flagged for manual review before inclusion in the corpus.
- **Failures and gaps:** Historical print quality varies dramatically across publications and decades. The rule-based layer catches known terms but cannot correct arbitrary OCR errors. Manual review remains necessary for low-quality scans.

### Step 2: Named Entity Recognition and Player Linking (Model 2)
- **Tool:** Fine-tuned NER model trained on a hand-annotated sample of the corpus. Four entity types: persons (with baseball role tag), teams, locations, and events.
- **Input:** Segmented article text from Step 1
- **Output:** Annotated articles with linked player IDs, team references, location mentions, and event tags
- **Accuracy / success rate:** Named entity annotations carry confidence scores. Ambiguous disambiguations are flagged for manual review. Player-linking results are spot-checked against known biographical data.
- **Failures and gaps:** Nickname usage in historical Black press writing creates disambiguation challenges. The same player may appear as "Satchel," "Paige," "Satch," or "the Great Paige" across different publications and decades. The disambiguation pipeline handles common variants but cannot resolve all ambiguities.

### Step 3: Topic Modeling and Advocacy Arc Analysis (Model 3)
- **Tool:** BERTopic (github.com/MaartenGr/BERTopic) for topic extraction; time-series prevalence analysis for the advocacy arc
- **Input:** Full corpus text
- **Output:** Topic structure with manual labels, year-by-year prevalence curves with smoothing and uncertainty bands
- **Accuracy / success rate:** Topic labels are manually reviewed by the chapter author. Year-by-year curves are presented with smoothing and documented uncertainty.
- **Failures and gaps:** Historical newspaper language does not map cleanly to modern topic models. The topic structure is an approximation reviewed by humans, not ground truth. Year-by-year prevalence is smoothed and carries documented uncertainty.

### Step 4: Box Score Detection and Seamheads Cross-Reference (Model 4)
- **Tool:** Layout classification model for box score region detection, structured extraction pipeline for tabular parsing, cross-reference against Seamheads coverage
- **Input:** Segmented newspaper pages
- **Output:** 15 candidate box score recovery cases in `data/recovery-candidates.json`
- **Accuracy / success rate:** Box score extraction accuracy is imperfect for historical newspaper formats. Every candidate recovery case is reviewed manually before being presented as a potential contribution.
- **Failures and gaps:** Historical box score formats vary across publications and decades. Some scores are partial (team totals only). The cross-reference depends on accurate date and team matching, which is complicated by inconsistent scheduling records.

### Step 5: Semantic Search Index (Model 5)
- **Tool:** sentence-transformers (sbert.net) for embedding; custom search index
- **Input:** Corpus text
- **Output:** Searchable semantic index accessible from the chapter's search interface (Fig 02)
- **Accuracy / success rate:** Search results are ranked candidates, not definitive answers. The interface presents ranked results and directs readers to source materials for verification.
- **Failures and gaps:** Semantic search over historical text carries additional noise from OCR artifacts and period-specific language. The search ranks plausible matches but cannot guarantee completeness or perfect relevance ordering.

### Step 6: Corpus Timeline Construction
- **Tool:** JavaScript (procedural generation based on documented volume patterns)
- **Input:** Historical publication data, era-based volume estimates, publication share models
- **Output:** Annual article volume estimates by publication and topic, 1920--1975 (Fig 01)
- **Accuracy / success rate:** Volume patterns are modeled from documented historical data about publication schedules, circulation, and editorial focus. Individual year totals are estimates, not exact counts.
- **Failures and gaps:** The timeline is a modeled representation of corpus volume, not an exact count of every article. It reflects documented patterns (NNL founding 1920, first East-West game 1933, Robinson debut 1947, NAL dissolution 1960s) but smooths between known data points.

---

## Machine Learning Models

### Model 1: OCR Correction and Article Segmentation
- **Model type:** Rule-based post-correction + layout analysis
- **Library / framework:** Tesseract OCR (github.com/tesseract-ocr/tesseract), custom rule engine
- **Training data:** Period-specific vocabulary dictionary (player names, team names, league names)
- **Feature set:** Character-level patterns, known vocabulary matches, layout geometry
- **Output:** Corrected article text with quality scores
- **Confidence representation:** Per-article OCR quality score. Low-quality articles flagged for manual review.
- **Known failure modes:** Unusual fonts, severely degraded print, handwritten annotations on newspaper pages
- **Reproducibility:** Rule dictionary and layout model parameters committed to the repository

### Model 2: Named Entity Recognition and Player Linking
- **Model type:** Fine-tuned NER with disambiguation pipeline
- **Library / framework:** Custom NER model
- **Training data:** Hand-annotated sample of the corpus
- **Feature set:** Token context, entity type (person, team, location, event), era, team affiliation
- **Output:** Annotated entities with canonical player IDs and confidence scores
- **Confidence representation:** Per-entity confidence score. Ambiguous disambiguations flagged.
- **Known failure modes:** Nickname variants, players with identical names across eras, informal references
- **Reproducibility:** Training annotations and model weights committed to the repository

### Model 3: Topic Modeling and Advocacy Arc
- **Model type:** BERTopic unsupervised topic modeling + time-series prevalence
- **Library / framework:** BERTopic (github.com/MaartenGr/BERTopic), sentence-transformers (sbert.net)
- **Training data:** Full corpus text
- **Feature set:** Document embeddings via sentence-transformers
- **Output:** Topic structure with manual labels, year-by-year prevalence curves
- **Confidence representation:** Smoothed prevalence curves with uncertainty bands. Topic labels reviewed manually.
- **Known failure modes:** Historical language conventions that differ from modern usage, OCR artifacts inflating certain topics, uneven corpus coverage across years
- **Reproducibility:** BERTopic parameters and manual topic labels committed to the repository

### Model 4: Box Score Detection
- **Model type:** Layout classification + structured extraction + cross-reference
- **Library / framework:** Custom layout classifier, tabular parser
- **Training data:** Annotated newspaper page layouts with box score regions marked
- **Feature set:** Page geometry, text patterns (team names, innings, statistical columns)
- **Output:** Structured box score data, cross-referenced against Seamheads
- **Confidence representation:** Each candidate carries a status: "Under Review," "Confirmed Gap," or "Submitted"
- **Known failure modes:** Partial box scores, non-standard formats, misidentified tabular content
- **Reproducibility:** Detection model and extraction rules committed to the repository

### Model 5: Semantic Search
- **Model type:** Sentence embedding + vector similarity search
- **Library / framework:** sentence-transformers (sbert.net)
- **Training data:** Pre-trained sentence-transformer model, fine-tuned on historical text
- **Feature set:** Sentence-level embeddings
- **Output:** Ranked search results with relevance scores
- **Confidence representation:** Results presented as ranked candidates. Relevance scores are relative, not absolute.
- **Known failure modes:** OCR noise reducing embedding quality, period-specific terminology not in pre-training data
- **Reproducibility:** Embedding model and index committed to the repository

---

## AI-Generated Content

### Editorial Narrative
- **Generated by:** Claude (Anthropic), used in editorial development
- **Prompt structure:** Chapter author provided corpus data, topic model outputs, and historical context; Claude assisted with narrative structure and editorial framing
- **Inputs to the prompt:** Publication metadata, topic prevalence data, writer biographies, box score recovery candidates
- **Output:** Editorial narrative connecting the corpus data to the historical argument
- **Confidence label:** AI-assisted content is labeled in the chapter's AI disclosure block
- **Human review:** Every generated passage was reviewed for factual accuracy against documented sources. All factual claims (dates, circulation figures, award years, writer biographies) were verified independently.
- **Accuracy standard:** No factual claim ships without a cited source. Generated text that introduced unsourced characterizations was rejected.
- **Known limitations:** The model has no access to the original newspaper pages. Generated narratives reflect the documented record only.

### AI Disclosure (as stated in chapter)
This chapter uses five computational models (OCR correction, named entity recognition, topic modeling, box score detection, semantic search) applied to the Black press corpus. All model outputs are labeled as AI-generated at the point of claim. Topic labels are manually reviewed. Box score recovery candidates are flagged as candidates, not confirmed data.

---

## Data Gaps

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| Digitization coverage uneven | Not all publications are fully digitized for all years. Smaller publications (Kansas City Call, Norfolk Journal and Guide) have significant gaps. | Corpus index is weighted toward publications with better digital archives (Courier, Defender, Afro-American). Topic prevalence curves may underrepresent smaller publications. | Documented in publication metadata. Coverage dates stated per publication. |
| OCR quality varies | Historical print quality varies dramatically. Some pages are barely legible in digitized form. | Low-quality OCR introduces noise into NER, topic modeling, and search. | Articles flagged with quality scores. Low-quality articles flagged for manual review. |
| Copyright restrictions | The Black press journalism corpus is copyrighted material. | The chapter cannot reproduce full article text. | Searchable index with brief excerpts under fair use principles. Access pathways to source holdings provided for every article. Full copyright posture documented in COPYRIGHT_NOTE.md. |
| Box score recovery candidates unverified | The 15 candidate recovery cases have not been verified by Negro Leagues historians. | Candidates are potential contributions to the statistical record, not confirmed data. | Each candidate flagged with status (Under Review, Confirmed Gap, Submitted). Full verification protocol in BOX_SCORE_RECOVERY_PROTOCOL.md. |
| Seamheads coverage at ~75% | The Seamheads database documents approximately 75% of Negro Leagues box scores. | Cross-reference may identify false positives (games in Seamheads under different dates or team names). | Manual review required for every candidate before any claim of recovery. |
| Writer attribution incomplete | Not all articles carry bylines. Staff-written coverage is attributed to the publication, not individual writers. | Writer-specific analysis (Fig 03) is limited to bylined articles. Volume counts by writer are lower bounds. | Stated as a limitation in the writer profiles. |

---

## Disputed Claims

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| Pittsburgh Courier peak circulation of 330,000 | Circulation figures for Black newspapers are documented but measurement methodologies varied. Some sources cite slightly different peak figures. | Heaphy (2003), Hall of Fame documentation (2016), multiple secondary sources | Presented as "330,000" with attribution to documented sources. |
| Wendell Smith organized the 1945 Fenway Park tryout | The tryout is documented but some accounts differ on Smith's precise organizational role versus reporting role. | SABR BioProject, Dawkins (2024), Pittsburgh Courier archives | Presented as documented fact per SABR and Dawkins. |
| The Black press "built" the Negro Leagues | This is an institutional argument, not a simple factual claim. The degree to which the press's role was constitutive versus supportive is a matter of scholarly interpretation. | Heaphy (2003), Hopkins (SABR), Carroll (2021), NBHOF (2016) | Attributed to Leslie Heaphy's direct statement and supported by institutional evidence. Framed as the chapter's central argument, not as uncontested fact. |

---

## Cross-League Comparisons

This chapter does not make cross-league statistical comparisons. It documents the journalism record of the Negro Leagues and connects that record to the statistical record through box score recovery candidates. The cross-reference with Seamheads is a documentation comparison (what was published vs. what is in the database), not a statistical comparison between leagues.

---

## Reproducibility

**Code:** Corpus processing pipeline tools committed to the repository (MIT licensed)
**Data:** All pre-computed outputs in `chapters/14-the-courier-archive/data/` (CC0 for index and derived data)
**Raw data:** Source newspapers accessed through digitization platforms (Newspapers.com, ProQuest, Chronicling America, GenealogyBank, Accessible Archives). Access may require institutional subscriptions.
**Environment:** Python 3.12, BERTopic, sentence-transformers, Tesseract OCR
**Runtime:** Full pipeline processing time varies by corpus size. Index construction approximately 2 hours on standard hardware.

Data files:
- `data/articles.json` -- Corpus article index (50 articles with metadata, topics, player links, access pathways)
- `data/recovery-candidates.json` -- 15 box score recovery candidates with Seamheads cross-reference status
- `data/newspapers.json` -- Publication metadata for 10 Black press outlets
- `data/methods.json` -- Model card documentation for 5 computational models

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-05-25 | Initial publication |

---

## Citation

Haynes, Jeremy. "The Courier Archive: Methodology." *The Other Box Score*, May 2026. https://theotherboxscore.org/chapters/the-courier-archive/

BibTeX:
```bibtex
@article{tobs-courier-archive-methodology,
  author  = {Haynes, Jeremy},
  title   = {The Courier Archive -- Methodology},
  journal = {The Other Box Score},
  year    = {2026},
  month   = {May},
  url     = {https://theotherboxscore.org/chapters/the-courier-archive/}
}
```

Chicago:
Haynes, Jeremy. "The Courier Archive: Methodology." *The Other Box Score*, May 2026. https://theotherboxscore.org/chapters/the-courier-archive/.

---

## Questions and Corrections

If you find an error in this methodology, open an issue at https://github.com/other-boxscore/other-boxscore/issues or contact the project maintainer. Corrections are documented in the version history above.
