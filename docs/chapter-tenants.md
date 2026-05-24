# The Other Box Score -- Chapter Tenants
## Canonical Standards for Every Chapter · v1.0

**Status:** CANONICAL -- all chapters conform to these standards
**Authority:** Project owner (Jeremy Haynes)
**Enforced by:** Agent team (Oscar, Elias, Vera, Ida, Gates)
**Last updated:** May 2026

These tenants govern every chapter on this platform without exception. They are not guidelines. They are the standard against which every PR is reviewed and every chapter is shipped or held.

---

## The Nine Core Platform Tenets

These apply to the platform as a whole and to every chapter within it. They are restated here for completeness. Full definitions are in CLAUDE.md.

1. Accuracy above all
2. No corners cut
3. Public domain verified, not assumed
4. Copyright is a hard wall
5. The story is the point
6. The subjects are the protagonists
7. Confidence is earned, not assumed
8. One voice
9. Museum quality

---

## Chapter Tenants

### 01. Self-Contained, Cross-Referenced, No Assumptions

Every chapter works for a reader who has never seen another chapter. It introduces its own context, defines its own terms, tells its own complete story. It links to related chapters where relevant but never requires them. A reader who arrives from a Google search, a social share, or a NLBM exhibition lands on solid ground immediately.

Cross-references are editorial and specific. Not "explore more chapters" but "The Green Book Route mapped where they slept. The Sundown Corridor mapped where they could not."

**Gate:** Oscar verifies that all historical context required to understand the chapter is present within the chapter. No assumed knowledge.

---

### 02. Shared Shell, Chapter-Specific Interior

Every chapter uses: the platform nav fragment, the design tokens, the asset register, the agent review process, and the "Have you heard" opening voice.

Inside that shell, structure follows content. The Color Line earned nine tabs because nine tabs served that content. The Crowd That Came may need one scrolling page with a single annotated bar chart. The Voice may need a submission interface and a narrative clustering view. Each chapter earns its own shape. Templates do not impose structure. The content does.

What never varies: the opening name hook, the platform nav, the methodology section, the citation block, the closing door forward.

**Gate:** Vera verifies design system compliance. Ida verifies structural coherence with the platform arc.

---

### 03. Data and Human Story, Both at the Same Standard

A chapter is not complete with data alone. A chapter is not complete with story alone. Every chapter contains both, and both are held to identical evidentiary standards.

The number needs a source. The story needs a source. ".433 batting average in Havana, 1920" requires a citation. "He outhit Babe Ruth" requires the same citation. "He came home and threw an Opening Day no-hitter" requires a documented source just as the ERA figure does.

There is no hierarchy between quantitative and qualitative evidence. Both are evidence. Both are checked. Both ship only when verified.

**Gate:** Oscar verifies all narrative claims. Elias verifies all quantitative claims. Neither defers to the other.

---

### 04. Every Chapter Opens with a Name

The "Have you heard of [name]?" hook is mandatory. It is the first substantive thing a reader encounters after the platform nav. The name is a specific person -- not a concept, not a team, not an era.

The chapter may be about a pattern, a system, a dataset, an economic structure. It opens with a person. The person is not an anecdote. The person is the argument made human before the data makes it structural.

The opening name is chosen for: historical significance to the chapter's thesis, relative obscurity to a general audience, and the quality of their two-sentence story. If their story cannot be told in two sentences that make a reader want to read further, find another name.

**Gate:** Ida verifies the hook lands in the "Have you heard" voice. Oscar verifies the historical accuracy of the two-sentence story.

---

### 05. The Narrative Through Line is Structural, Not Decorative

The through line has two forms, both mandatory:

**The spine:** "Why don't you know their names?" is the question every chapter answers from a different angle. This is not stated explicitly in every chapter. It is the question the chapter's existence answers. Every editorial decision -- which data, which story, which visualization, which name -- is made in service of this question.

**The connective tissue:** Every chapter closes with an explicit editorial hand-off to the next chapter in the arc. Not a generic link. A specific sentence or two that names what comes next and why it follows from what just came. Written in the same "Have you heard" voice. Specific to the two chapters being connected.

Example closing connective tissue from The Green Book Route to The Sundown Corridor:
*"This is where they could sleep. The next chapter is the map of where they could not survive after dark -- and how close those places were to the diamonds they were playing on."*

The connective tissue is written by the project owner or reviewed and approved by the project owner before the chapter ships. It is not generated. It is editorial.

**Gate:** Ida verifies both forms are present and functional. The spine check is conceptual -- does this chapter answer the question? The connective tissue check is literal -- is it written, is it specific, does it land?

---

### 06. Uncertainty is Labeled at the Point of Claim

Not only in the methodology section. At the moment a reconstructed statistic, a modeled output, an estimated figure, or a disputed historical claim appears in the chapter body, it is labeled as such inline.

The language of uncertainty is specific:
- "The model estimates..." for ML outputs
- "Documented in [source] as..." for verified historical claims
- "Estimated from incomplete records as..." for reconstructed figures
- "Reported in [source] as..." for claims from single secondary sources
- "Disputed -- the most widely cited figure is..." for contested statistics

"He would have..." is never acceptable without the full conditional frame: "If the model's assumptions hold, he would have..."

The reader never has to go to the methodology section to know whether a claim is verified or estimated. The uncertainty travels with the claim.

**Gate:** Elias verifies all quantitative uncertainty labeling. Oscar verifies all historical uncertainty labeling. Both read the chapter body, not just the methodology.

---

### 07. The Methodology is Always Visible and Always Readable

Every chapter has a METHODOLOGY.md file and a method section accessible from the chapter's main navigation.

The methodology is written for a curator, not a developer. Target reader: a historian at the NLBM with no ML background who wants to understand exactly what was done, what assumptions were made, and where the uncertainty lives. They should be able to read it, understand it, and assess whether they would put the NLBM's name on the conclusions.

The methodology section is not an appendix. It is part of the argument. It is designed and written with the same care as the chapter's data visualizations.

Required elements in every chapter methodology:
- Data sources used, with license and known limitations
- Analytical methods, described in plain language with technical detail available
- Assumptions required for cross-league comparisons or counterfactual reasoning
- Confidence levels on all model outputs
- Data gaps explicitly documented
- Validation approach -- how were the outputs checked against known ground truth?
- Version date

**Gate:** Elias verifies technical accuracy. Oscar verifies historical framing. Vera verifies design and readability. All three must approve before Gates issues a final verdict.

---

### 08. One Original Finding, Minimum (Aspiration)

Every chapter aspires to contain at least one finding that does not exist anywhere else -- not a visualization of existing data, but an original insight produced by this platform. A dataset nobody has assembled. An analysis nobody has run. A connection nobody has documented.

This is an aspiration, not a hard gate. A chapter that delivers excellent, rigorous, beautifully presented work on existing data may ship. But the ambition is always original contribution. When a chapter identifies its original finding, that finding is the "oh wow" moment. When a chapter does not have an original finding, it must have an "oh wow" moment of presentation -- a visualization or editorial combination that makes existing knowledge land in a way it has never landed before.

The original finding or "oh wow" presentation is documented explicitly in the chapter spec before build begins. If neither can be identified at spec time, the spec is not approved.

---

### 09. The "Oh Wow" Moment is Required and Tested

Every chapter must contain at least one moment -- a visualization, a statistic, a connection, a narrative juxtaposition -- that stops a reader cold. That makes them want to share it immediately. That makes the platform's argument in a single image or sentence.

Examples from Chapter 01 -- The Color Line:
- Josh Gibson's .466 batting average in 1943 appearing as the official MLB single-season record
- The Breach animation: the Red Sox cell sitting dark while fifteen others glow for 4,480 days
- The leaderboard reshuffling: watching Bonds drop to third in real time

**Testing protocol:**

All five agents review the chapter independently without being told what the "oh wow" moment is supposed to be. Each agent documents, unprompted, the single moment in the chapter that hit hardest. If at least three of five agents independently identify the same moment, the "oh wow" test passes.

If fewer than three agents identify the same moment, one of two things is true: the chapter has multiple "oh wow" moments (which is fine -- identify the primary one and amplify it) or the chapter does not yet have a sufficiently clear "oh wow" moment and needs further development before shipping.

The "oh wow" test is conducted as part of the final agent review, before Gates issues the merge verdict. Each agent documents their unprompted response in their verdict under a dedicated section:

```
OH WOW ASSESSMENT:
The moment that hit hardest for me: [description]
Would I share this immediately: YES | NO
```

Gates tallies the responses and documents the result in the final verdict.

---

### 10. ML and AI are Maximized Throughout

Every chapter explores the full range of what ML and AI can contribute to the story. The question is never "should we use ML here?" The question is "what is the most powerful use of ML we can responsibly make here?"

Responsible means: the output is labeled with its confidence level, the methodology is documented, the assumptions are stated, and Oscar has verified the historical grounding.

Fully generative where possible: AI-generated conclusions, narratives, and insights ship with confidence labels that are part of the design, not an asterisk. A chapter should make the reader feel the presence of a system that has read everything ever written about these players and is telling them what it found. That feeling is the goal. The documentation of uncertainty is what makes it honest rather than misleading.

Required ML/AI consideration at spec time for every chapter:

- **What can be modeled?** Career reconstruction, performance estimation, counterfactual simulation, pattern detection, anomaly identification
- **What can be generated?** Narrative summaries, player profiles, game reconstructions, editorial conclusions
- **What can be retrieved?** Semantic search over historical text, cross-modal retrieval over photograph and text corpora, similarity search across player profiles
- **What can be clustered?** Thematic patterns in testimony, stylistic patterns in press coverage, geographic patterns in travel data
- **What can be visualized with ML?** Embeddings as spatial maps, trajectory ensembles as fan charts, uncertainty as designed visual elements

The ML pipeline for each chapter is documented in the chapter spec. The pipeline outputs are pre-computed and committed as static JSON or `window.*` JS. No runtime ML inference that degrades the reading experience.

**Gate:** Elias verifies methodological rigor. Vera verifies that ML outputs are visualized honestly and compellingly. Ida verifies that the ML serves the story rather than performing sophistication.

---

### 11. The Design is Elegant and Respectful

Elegant means: every visual element earns its place. Nothing decorative. Nothing that performs sophistication without delivering clarity. The design system in `docs/design.md` is the standard.

Respectful means: the people represented in this platform are owed dignity in every design decision. A player card is not a data point -- it is a person. A photograph is not an asset -- it is a man or woman who deserves to be presented as they were, without filters, without colorization, without enhancement.

Respectful also means: the weight of the subject matter is carried by the design. This is not a sports statistics website. It is a civil rights document written in data. The design should feel like that. Not heavy-handed, not performative -- but serious. The Color Line chapter's splash screen demonstrates the standard: `1947` in enormous type, two seconds of silence, then `the door opened.` That is what respectful design looks like in this context.

**Gate:** Vera enforces elegance -- every design decision is justified. Oscar enforces respect -- every representation of a player or historical moment is handled with appropriate weight.

---

### 12. Public Domain Verified Before Build Begins

Every photograph, every archival excerpt, every external asset required by a chapter has a documented PD determination or explicit license, entered in `data/asset-register.json` with Oscar's approval, before a single line of chapter code is written.

This is not administrative friction. This is the standard that makes the NLBM partnership possible. A platform that cannot account for the provenance of every image it uses is not a platform the NLBM can endorse. The asset register is the proof of due diligence.

The chapter spec includes an asset list. Oscar reviews the asset list as part of spec approval. The build does not start with open PD questions.

**Gate:** Oscar blocks any spec that does not include a complete preliminary asset list. Vera blocks any build PR that includes an image without a complete asset register entry.

---

### 13. Mobile is First-Class

Every chapter reads and functions at 375px viewport width. The data is legible. The visualization is comprehensible. The story is complete. The "oh wow" moment lands on mobile.

Chapters that degrade on mobile do not ship. This is not a responsive design checkbox -- it is a content commitment. The Green Book Route animated map must work on a phone. The Salary Ledger paired comparison must be readable on a phone. The Voice oral history submission form must be usable on a phone.

If a visualization genuinely cannot be made legible at 375px, a mobile-specific alternative view is designed and shipped alongside it. The alternative is not a downgrade -- it is a different expression of the same data optimized for the context.

**Gate:** Vera tests at 375px, 768px, and 1200px before issuing her verdict. Any failure at 375px is a block.

---

### 14. The Chapter is Citable

When a chapter ships, it ships with sufficient documentation for a journalist, historian, or NLBM curator to cite it in their own work.

**Required citation elements on every chapter:**

A citation block appears in the chapter's methodology section and footer, formatted as follows:

```
Cite this chapter:
Haynes, Jeremy. "[Chapter Title]." The Other Box Score,
theotherboxscore.org/chapters/[slug]/, [Month Year].
Accessed [access date].

For academic citation (Chicago):
Haynes, Jeremy. "[Chapter Title]." The Other Box Score. [Month Year].
https://theotherboxscore.org/chapters/[slug]/.

Data citation (CC0):
The Other Box Score. "[Chapter Title] Dataset." CC0 1.0.
https://github.com/other-boxscore/chapters/[slug]/data/.
[Version date].
```

The citation block is generated from `chapters.json` metadata and inserted automatically by the shell. No manual citation block maintenance per chapter.

**Gate:** Gates verifies the citation block is present and complete before issuing a merge verdict.

---

### 15. The Build Sequence Has Three Hard Gates

Every chapter moves through three phases. No exceptions. No overlapping phases.

**Gate 1 -- Spec Approved**
Before: nothing is built. The chapter spec document is written, reviewed by all five agents, and approved. The spec must contain: thesis statement, data sources, ML pipeline description, asset list (for Oscar), original finding or "oh wow" description, narrative connective tissue draft, methodology outline. Gates issues a SPEC APPROVED verdict before build begins.

**Gate 2 -- Build Complete**
The chapter is fully built. All content is written and sourced. All visualizations are complete. All ML outputs are pre-computed and committed. All assets are in the register with full provenance. All agent reviews are in progress.

**Gate 3 -- All Five Agents Sign Off**
Oscar, Elias, Vera, Ida, and Gates all issue APPROVED verdicts. The "oh wow" test is conducted and documented. The citation block is verified. Gates issues MERGE. The chapter ships.

A chapter cannot enter Gate 2 without Gate 1 approval. A chapter cannot ship without Gate 3 completion. This sequence is enforced by Ida (who tracks spec approval) and Gates (who controls the merge).

---

## The Citation Standard (Full)

Every page on the platform that contains original research, data, or analysis includes a citation block. The block is designed as part of the page -- not an afterthought appended to the footer. It appears in a dedicated section, clearly labeled, formatted for multiple citation styles.

**Why three formats:**
- General: for journalists and general readers
- Chicago: for historians and academic researchers (the NLBM community)
- Data: for data scientists and developers who want to build on the datasets

**Version tracking:**
Every chapter has a publication date and is versioned. When significant corrections are made, a correction notice is added to the citation block. The correction is documented in the chapter's CHANGELOG.md.

**Stability commitment:**
Chapter URLs are permanent. `theotherboxscore.org/chapters/the-color-line/` will resolve for as long as the platform exists. Citations made today will be valid in twenty years.

---

## The "Oh Wow" Test -- Full Protocol

**When it runs:** During final agent review, after all content is complete, before Gates issues the merge verdict.

**How it runs:**
1. Each agent reviews the complete chapter independently
2. Each agent documents their "oh wow" response in their verdict under the OH WOW ASSESSMENT section -- unprompted, without being told what the intended moment is
3. Gates tallies all five responses
4. If three or more agents identify the same moment: OH WOW TEST PASSED
5. If fewer than three identify the same moment: Gates issues a conditional approval with a note documenting the result. The project owner reviews and makes the final call.

**What counts as identifying the same moment:**
Agents do not need to use identical language. If Oscar writes "the Breach animation -- watching the Red Sox sit dark for twelve years" and Vera writes "the Red Sox cell not lighting for the entire animation" and Elias writes "the duration of the Breach -- that's the argument," all three have identified the same moment. Gates uses judgment to group responses thematically.

**What happens if the test fails:**
The chapter does not automatically block. The project owner reviews the agent responses and determines: (a) the chapter has multiple strong moments and should amplify one, (b) the "oh wow" moment needs development before ship, or (c) the chapter ships as-is with the understanding that the "oh wow" standard was aspirational rather than met. Option (c) is the exception, not the rule.

---

## Summary Table

| Tenant | Hard Gate | Agent Owner | Blocks Spec | Blocks Ship |
|--------|-----------|-------------|-------------|-------------|
| 01 Self-contained | Yes | Oscar | No | Yes |
| 02 Shared shell, own interior | Yes | Vera + Ida | Yes | Yes |
| 03 Data and story both | Yes | Oscar + Elias | Yes | Yes |
| 04 Opens with a name | Yes | Ida + Oscar | Yes | Yes |
| 05 Narrative through line | Yes | Ida | Yes | Yes |
| 06 Uncertainty inline | Yes | Elias + Oscar | Yes | Yes |
| 07 Methodology visible | Yes | All | No | Yes |
| 08 Original finding | Aspiration | Ida | Yes (spec) | No |
| 09 "Oh wow" moment | Yes | All five | Yes (spec) | Yes |
| 10 ML maximized | Yes | Elias + Ida | Yes (spec) | Yes |
| 11 Elegant and respectful | Yes | Vera + Oscar | No | Yes |
| 12 PD before build | Yes | Oscar | Yes | Yes |
| 13 Mobile first-class | Yes | Vera | No | Yes |
| 14 Chapter is citable | Yes | Gates | No | Yes |
| 15 Three-gate build sequence | Yes | Ida + Gates | Structure | Structure |

---

*They played. We counted. Now you know.*
*And now the record is citable, mobile-readable, ML-powered, and museum quality.*
*That is what they deserved. That is what this platform is.*
