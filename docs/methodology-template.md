# The Other Box Score — Chapter Methodology Template
## Canonical Structure for Every Chapter · v1.0

**For:** Claude Code, chapter authors, agent reviewers
**Authority:** Elias (statistical accuracy) + Oscar (historical accuracy) both approve before ship
**Status:** TEMPLATE — copy and complete for each chapter
**Last updated:** May 2026

---

## How to Use This Template

Every chapter has two methodology artifacts:

1. **`METHODOLOGY.md`** in the chapter directory -- the full technical document, written for researchers, historians, and anyone who wants to reproduce the work
2. **The in-page methodology section** -- a designed, readable version of the same content, accessible from the chapter's main navigation tab labeled "Method"

Both are required. Both are held to the same standard. The in-page version is not a summary of the file version -- it is a designed presentation of the same content, written for a NLBM curator with no ML background.

The target reader for both: someone intelligent and serious who has no statistics or engineering background but who will immediately notice if something is vague, hand-wavy, or evasive. Write for that person.

---

## METHODOLOGY.md Template

```markdown
# [Chapter Title] — Methodology
## theotherboxscore.org/chapters/[slug]/

**Version:** 1.0
**Published:** [Month Year]
**Last updated:** [Date]
**Reviewed by:** Elias (statistical methodology) · Oscar (historical grounding)

---

## What This Chapter Does

[One paragraph. Plain language. What question does this chapter answer, what data does it use, and what did it find. No jargon. No hedging. State the finding directly and then explain how it was reached.]

---

## Data Sources

For each dataset used, document all of the following:

### [Dataset Name]
- **Source:** [Institution or publication name]
- **URL or archive location:** [Specific URL or archive reference]
- **Coverage:** [What years, what geography, what entities]
- **License:** [Public domain / CC0 / CC BY / Research use / etc.]
- **Access date:** [When this data was downloaded or accessed]
- **Known limitations:** [What is missing, what is incomplete, what is disputed]
- **How used in this chapter:** [Specifically what was extracted and why]

[Repeat for every dataset. No dataset used in this chapter is undocumented.]

---

## Data Processing

[Describe every transformation applied to the raw data before analysis. Be specific. If OCR was used, name the tool and document the accuracy rate. If geocoding was used, document the success rate and what happened to failures. If records were filtered, document the filter criteria and how many records were excluded.]

### Step 1: [Name of processing step]
- **Tool:** [Software, library, or service used]
- **Input:** [What went in]
- **Output:** [What came out]
- **Accuracy / success rate:** [Where applicable]
- **Failures and gaps:** [What could not be processed and how it was handled]

[Repeat for every processing step.]

---

## Analytical Methods

[Describe every analytical method used. Each method gets its own subsection. Write for a reader who knows what statistics are but may not know this specific technique.]

### [Method Name -- e.g., "Safety Score Construction"]

**What it does:**
[Plain language description. What question does this method answer?]

**Why this method:**
[Why was this the right choice? What alternatives were considered?]

**Inputs:**
[What data goes in. Be specific about variable names and their sources.]

**Parameters:**
[All parameters, hyperparameters, thresholds, and weights. Every number that was chosen rather than derived must be documented with its rationale.]

**Outputs:**
[What the method produces. What the output values mean. What their range is.]

**Uncertainty:**
[How confident are the outputs? What are the confidence intervals or uncertainty bounds? How were they calculated?]

**Validation:**
[How was this method checked against known ground truth? What would a wrong answer look like and how would it be detected?]

**Limitations:**
[What can this method not do? What assumptions does it make that might not hold? Where should the reader be skeptical?]

---

## Machine Learning Models

[One subsection per ML model. Use the same structure as Analytical Methods above, plus:]

### [Model Name -- e.g., "M1: The Route Clustering Model"]

**Model type:** [e.g., HDBSCAN unsupervised clustering]
**Library / framework:** [e.g., scikit-learn 1.4, Python 3.12]
**Training data:** [What data the model was trained or fit on]
**Feature set:** [All input features with definitions]
**Hyperparameters:** [All hyperparameters with values and rationale]
**Output:** [What the model produces]
**Confidence representation:** [How uncertainty is communicated in the output and in the visualization]
**Known failure modes:** [What makes this model wrong]
**Reproducibility:** [How to reproduce the model output from the committed code and data]

---

## AI-Generated Content

[Every piece of AI-generated content in this chapter is documented here. This includes narratives, summaries, conclusions, captions, and any other text or content produced by a generative AI system.]

### [Content Name -- e.g., "M3: Road Trip Narratives"]

**Generated by:** [Model name and version -- e.g., Claude claude-sonnet-4-20250514]
**Prompt structure:** [Description of the prompt template used. Full prompts committed to the repo at pipeline/prompts/.]
**Inputs to the prompt:** [What data was passed to the model for each generation]
**Output:** [What was generated and how it appears in the chapter]
**Confidence label:** [How the AI-generated nature and confidence level are displayed to the reader]
**Human review:** [What human review was applied before the content shipped. Who reviewed it. What they checked.]
**Accuracy standard:** [What standard the AI-generated content is held to. What would cause a generated output to be rejected.]
**Known limitations:** [What the model cannot know. Where it may hallucinate. How the prompt and review process mitigated this.]

---

## Data Gaps

[Every gap in the data is documented explicitly. "Complete" is not an acceptable description of any historical dataset.]

| Gap | Description | Impact on Analysis | How Handled |
|-----|-------------|-------------------|-------------|
| [Gap name] | [What is missing and why] | [How this affects the chapter's findings] | [What was done -- excluded, estimated, flagged, etc.] |

[Every gap gets a row. If there are no gaps, document why you are confident the data is complete -- which itself requires a documented rationale.]

---

## Disputed Claims

[Every claim in this chapter that is disputed, estimated, or reconstructed from incomplete sources is documented here, with the dispute explained and the chapter's handling of it stated.]

| Claim | Dispute or uncertainty | Sources consulted | How presented in chapter |
|-------|----------------------|-------------------|--------------------------|
| [Claim] | [Nature of dispute] | [Sources] | [Labeled as estimated / disputed / etc.] |

---

## Cross-League Comparisons

[If this chapter makes any comparison between Negro Leagues and MLB statistics or performance, every such comparison is documented here with its full assumption set.]

### [Comparison Name]

**Assumption 1:** [State the assumption]
**Assumption 2:** [State the assumption]
**Precision cost:** [What precision is lost because of these assumptions]
**Calibration:** [What ground truth data was used to calibrate the comparison]
**Confidence interval:** [The stated uncertainty on the comparison output]

---

## Reproducibility

[How can someone reproduce this chapter's findings from scratch?]

**Code:** All pipeline code is in `pipeline/` and is MIT licensed.
**Data:** All pre-computed outputs are in `data/` and are CC0 licensed.
**Raw data:** [Instructions for accessing the raw data sources, including any registration or access requirements]
**Environment:** [Python version, key library versions. A `requirements.txt` or `pyproject.toml` is committed to the repo.]
**Runtime:** [Approximate time to run the full pipeline on standard hardware]

To reproduce:
```bash
cd pipeline/
pip install -r requirements.txt
python 01_[first step].py
python 02_[second step].py
[etc.]
```

Output files will appear in `data/` and match the committed versions.

---

## Version History

| Version | Date | Change |
|---------|------|--------|
| 1.0 | [Date] | Initial publication |

---

## Citation

[Full citation block -- see chapter-tenants.md Tenant 14]

---

## Questions and Corrections

If you find an error in this methodology, open an issue at github.com/other-boxscore/chapters/[slug]/issues or email [contact]. Corrections are documented in the version history above.
```

---

## In-Page Methodology Section Template

The in-page methodology section is a designed presentation of the METHODOLOGY.md content. It lives in a dedicated tab or section accessible from the chapter's main navigation.

It is not a summary. It is the same content, designed.

### Required elements in the in-page section:

**1. The plain-language opener**

One paragraph in EB Garamond, body size, that answers: what did we do and what did we find? No jargon. No hedging. If a reader reads only this paragraph, they understand the chapter's methodology.

**2. The data table**

A clean table listing every data source: name, coverage, license, known limitations. IBM Plex Mono for the metadata. Amber for source names. Exactly the same information as the METHODOLOGY.md data sources section, presented as a designed table rather than markdown.

**3. The methods section**

Each analytical method and ML model gets a card. Each card contains:
- Method name in Playfair Display
- Plain-language description in EB Garamond
- A "confidence" indicator -- a designed element showing the certainty level of this method's outputs
- A "limitations" note in smaller type

The confidence indicator is a designed visual -- not a percentage, not a star rating. A horizontal bar divided into three zones: Verified (green Book-listed in historical source), Modeled (derived from data with stated assumptions), and Estimated (based on incomplete records). Each method's output sits in one of these zones.

**4. The AI disclosure**

A dedicated block, visually distinct from the rest of the methodology section, that discloses all AI-generated content in the chapter. It lists:
- What was generated
- What model generated it
- What human review was applied
- How AI-generated content is labeled in the chapter

This block is always present, even if the AI contribution is small. It is never buried. It is part of the chapter's transparency posture.

**5. The gaps disclosure**

A plain-language statement of what the data cannot show. Not technical gap documentation -- the human meaning of the gaps. "The Green Book did not cover every year in our window. For years without a digitized edition, we used the nearest available edition. Some listings may have opened or closed between editions. We document this uncertainty throughout."

**6. The reproducibility statement**

One sentence with a GitHub link: "All code and pre-computed data are available at [link] under MIT and CC0 licenses."

**7. The citation block**

The full three-format citation block per Tenant 14.

---

## Confidence Level Vocabulary

Every claim in every chapter uses consistent language to signal its certainty level. These terms are defined once here and used consistently across all chapters.

| Term | Meaning | When to use |
|------|---------|-------------|
| Documented | Appears in a primary source with specific citation | A box score, a contract, a dated newspaper account |
| Verified | Cross-referenced across multiple independent sources | A statistic confirmed by SABR, Baseball Reference, and a contemporary newspaper |
| Reported | Appears in a single secondary source | A statistic from one SABR biography without independent confirmation |
| Estimated | Derived from incomplete data using documented assumptions | A career WAR calculated from partial season records |
| Modeled | Output of an ML or statistical model with stated confidence bounds | A career reconstruction trajectory, a safety score |
| Reconstructed | Built from fragmentary evidence using documented methodology | A pre-1920 box score assembled from newspaper accounts |
| Disputed | Subject to scholarly disagreement -- all major positions documented | Satchel Paige's career win total, Josh Gibson's home run records |
| AI-generated | Produced by a generative AI model with human review | Road trip narratives, player profile summaries |

These terms appear inline in chapter content at the point of every claim they govern. They are never relegated to footnotes or the methodology section alone.

---

## Agent Review Checklist for Methodology

**Elias checks:**
- [ ] Every dataset is documented with source, license, and limitations
- [ ] Every analytical method has documented parameters and rationale
- [ ] Every ML model has documented hyperparameters and validation approach
- [ ] Confidence intervals are present on all model outputs
- [ ] Cross-league comparisons document all assumptions
- [ ] Data gaps are documented and their impact is assessed
- [ ] Reproducibility instructions are complete and accurate

**Oscar checks:**
- [ ] The methodology is written for a curator, not a developer
- [ ] All historical claims in the methodology are sourced
- [ ] Data gaps are described in terms of their historical significance, not just their technical impact
- [ ] The AI disclosure accurately describes what was generated and what was reviewed
- [ ] Disputed statistics are documented with the nature of the dispute explained
- [ ] The plain-language opener is accurate and does not overstate what was done

**Vera checks:**
- [ ] The in-page methodology section is designed consistently with the chapter aesthetic
- [ ] The confidence indicator visual is clear and accessible
- [ ] The AI disclosure block is visually distinct and prominent
- [ ] The data table is readable at 375px
- [ ] The citation block is formatted correctly

**Ida checks:**
- [ ] The methodology section is accessible from the chapter's main navigation
- [ ] The plain-language opener matches the chapter's voice
- [ ] The methodology does not overstate the chapter's findings
- [ ] The methodology is consistent with the platform's overall methodology in METHODOLOGY.md

**Gates checks:**
- [ ] Both METHODOLOGY.md and the in-page section are present
- [ ] Both are approved by Elias and Oscar
- [ ] The citation block is present and complete
- [ ] The version number and publication date are correct
