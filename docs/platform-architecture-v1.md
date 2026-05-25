# The Other Box Score
## Platform Architecture v1.0

**Status:** SINGLE SOURCE OF TRUTH
**Last updated:** May 2026
**Read this before starting any task.** Every agent on every chapter and feature reads this document at the start of every work session. The methodology vocabulary, the data conventions, and the parallel coordination rules in this document are canonical. If a chapter spec contradicts this document, this document wins.

---

## Part 1: The Architecture Picture

### The platform thesis

The Other Box Score is a fifteen-chapter book in interactive form, plus a coda and a signature interactive feature called The Shadow Nine, organized as five parts:

- Part One · The World They Played In (Ch 01-03)
- Part Two · The Game They Played (Ch 04-06)
- Part Three · The Record That Wasn't Kept (Ch 07-09)
- Part Four · What the Numbers Say (Ch 10-12)
- Part Five · What Remains (Ch 13-14)
- Coda · Ch 15 The Parallel League
- Signature feature · The Shadow Nine

The platform's central argument: the Negro Leagues were a parallel major league. Every chapter argues this with documented evidence. The platform's job is to make that argument unimpeachable.

### The architectural reality

The platform has six chapters and one feature specced. The next nine chapters and the coda are ahead of us. The dependency structure of those nine chapters is not flat. One chapter -- Ch 10 The Ledger -- sits on the critical path of three other chapters plus the coda. The platform's back half depends on Ch 10 being right.

This document captures the architecture that makes the platform shippable given that dependency reality.

---

## Part 2: The Dependency Map

### Ch 10 The Ledger is the central node

**Ch 10 produces:** Per-player career WAR estimates, HOF probability scores, stolen-seasons figures. The Ledger is the platform's core statistical product.

**What depends on Ch 10:**

| Chapter | Dependency type | Workaround if Ch 10 is delayed |
|---------|----------------|-------------------------------|
| Ch 07 The Unsigned Letter | Three-player counterfactual | Documented escape hatch: Seamheads raw stats with explicit methodology note |
| Ch 08 The Salary Ledger | Total wages stolen calculation requires WAR estimates | No clean workaround; chapter blocks on Ch 10 |
| Ch 11 Cooperstown | Ranking methodology *is* Ch 10 applied | Total dependency; chapter cannot ship without Ch 10 |
| Ch 15 Parallel League (coda) | Counterfactual league construction is Ch 10 at scale | Total dependency; coda cannot ship without Ch 10 |

**What does not depend on Ch 10:**

- Ch 01 Color Line (already built)
- Ch 02 Green Book Route
- Ch 03 Sundown Corridor
- Ch 04 The Crowd That Came
- Ch 05 The Winter Map
- Ch 06 The Collapse
- Ch 09 The Last Team (survival analysis is independent)
- Ch 12 The Other Hall (Latin American halls of fame matrix)
- Ch 13 The Voice (oral history)
- Ch 14 The Courier Archive (newspaper corpus)
- The Shadow Nine (uses its own k-NN model)

### Dependency principles

1. **Ch 10 work starts immediately.** Not in chapter-number sequence. Elias begins the WAR reconstruction model on day one of post-architecture work, in parallel with whatever front-half chapter is in active editorial.

2. **Front-half chapters do not wait for Ch 10.** Ch 02-06 and Ch 09 ship in their own dependency-aware order. They do not block on the model.

3. **Back-half chapters wait for Ch 10 to mature.** Ch 07's counterfactual block, Ch 08, Ch 11, and Ch 15 cannot ship final until Ch 10 is approved by Gates. Drafts can proceed; final ship cannot.

4. **The Shadow Nine is independent in its own model but shares infrastructure with Ch 10.** See Part 4 below.

---

## Part 3: The Build Phase Ordering

The book reads in chapter-number order. The team builds in dependency-aware order. These are not the same. The reader experiences the book in order; the team builds it in the order that respects engineering reality.

### Phase 1 · Foundation (current phase)

**Deliverables:**
- This architecture document (this file)
- Ch 01 migration from color-line-bundle to live platform
- Shared infrastructure (era adjustment tables, canonical NLB and MLB datasets, methodology framework operationalized)
- Platform shell with global navigation including The Shadow Nine placeholder
- Agent prompts updated to reference this document

**Parallel agents:** Elias-Infrastructure (datasets, era tables), Vera (platform shell, design system finalization), Ida (coordination layer)

**Phase exit criteria:** Ch 01 live. Shared data layer documented. Every agent prompt references this document.

### Phase 2 · Parallel front-half

**Deliverables:**
- Ch 02 Green Book Route
- Ch 03 Sundown Corridor

**Parallel agents:**
- Oscar-Ch02, Oscar-Ch03 (independent editorial streams)
- Elias-Ledger (begins Ch 10 model work in parallel -- does not wait)
- Vera (chapter visualizations)
- Ida (coordinates across parallel Oscars)
- Gates (serial review)

**Phase exit criteria:** Ch 02 and Ch 03 shipped. Ch 10 model has working v0 internal version.

### Phase 3 · Parallel middle

**Deliverables:**
- Ch 04 The Crowd That Came
- Ch 05 The Winter Map
- Ch 06 The Collapse
- Ch 09 The Last Team

**Parallel agents:**
- Oscar-Ch04, Oscar-Ch05, Oscar-Ch06, Oscar-Ch09 (independent editorial streams)
- Elias-Ledger continues, Elias-NameRes works on Ch 05 name resolution model
- Vera (chapter visualizations across all four chapters)
- Ida (parallel coordination critical here)
- Gates (serial review)

**Phase exit criteria:** Four chapters shipped. Ch 10 model passes internal validation. The shared infrastructure is mature.

### Phase 4 · Ch 10 priority sprint

**Deliverables:**
- Ch 10 The Ledger ships
- External validation complete (NLBM, SABR Negro Leagues Research Committee reviewers)
- Methodology page published

**Parallel agents:**
- Oscar-Ledger (case-by-case verification of model outputs against historical record)
- Elias-Ledger and Elias-Methodology
- Vera (Ledger interface)
- Ida (manages the external review process)
- Gates (the decisive review -- Ch 10 ships only when Gates approves)

**Phase exit criteria:** Ch 10 live. External validation documented. The back half is unblocked.

### Phase 5 · Back half unlocked

**Deliverables:**
- Ch 07 The Unsigned Letter (with full counterfactual block now possible)
- Ch 08 The Salary Ledger
- Ch 11 Cooperstown

**Parallel agents:**
- Oscar-Ch07, Oscar-Ch08, Oscar-Ch11
- Elias applies the Ledger model across the three chapters
- Vera
- Ida
- Gates

**Phase exit criteria:** Three back-half chapters shipped.

### Phase 6 · Independent chapters

**Deliverables:**
- Ch 12 The Other Hall
- Ch 13 The Voice
- Ch 14 The Courier Archive

**Parallel agents:**
- Oscar-Ch12, Oscar-Ch13, Oscar-Ch14
- Elias provides supporting work where statistical context is needed
- Vera
- Ida
- Gates

**Phase exit criteria:** Three independent chapters shipped.

### Phase 7 · Capstone

**Deliverables:**
- Ch 15 The Parallel League (the coda)
- The Shadow Nine (with full external validation)

**Parallel agents:**
- Oscar (extensive Shadow Nine tagging work begins now, with Ch 01-14 editorial closed and Oscar's attention focused)
- Elias (Shadow Nine matching model deployment)
- Vera (Shadow Nine UI, coda design)
- Ida (orchestrates the final assembly)
- Gates (the platform's most demanding review on the Shadow Nine and coda)

**Phase exit criteria:** Platform 1.0 complete.

### Why this ordering matters

The naive read of chapter-number sequence would have us building Ch 07 before Ch 10. We have already specced Ch 07 with that assumption, including a counterfactual block that has Ch 10 as its dependency. In dependency-aware build order, Ch 07 ships with a *draft* counterfactual block during Phase 5, after Ch 10 is approved. The reader experiences Ch 07 in book order; the team built it after Ch 10. The reader never knows the difference.

This is the most important architectural principle: **chapter numbers are about the book; build phases are about engineering.**

---

## Part 4: Shared Data Layer

### The principle

Datasets used by more than one chapter are platform infrastructure, not chapter infrastructure. Build once, version, document, reuse. Elias-Infrastructure owns them.

### The canonical datasets

**1. The Canonical NLB Player Table**

- **Source:** Seamheads Negro Leagues Database, filtered and normalized
- **Schema:** player_id (platform canonical ID), full_name, name_variants[], positions[], handedness, birth_date, death_date, primary_team_ids[], seasons[], career_stats, confidence_tier
- **Used by:** Ch 02, Ch 03, Ch 04, Ch 05, Ch 06, Ch 07, Ch 08, Ch 09, Ch 10, Ch 11, Ch 12, Ch 13, Ch 14, Ch 15, The Shadow Nine
- **Update cadence:** Quarterly review against Seamheads master. Annual deep refresh.
- **Owner:** Elias-Infrastructure

**2. The Canonical MLB Player Table**

- **Source:** Lahman database + Baseball-Reference + Statcast (for recent players)
- **Schema:** parallel to NLB table where possible, with MLB-specific fields (career WAR, HOF status, etc.)
- **Used by:** Ch 07, Ch 10, Ch 11, The Shadow Nine
- **Owner:** Elias-Infrastructure

**3. The Era Adjustment Lookup Tables**

- **Content:** League average offensive metrics (BA, OBP, SLG, OPS) by league, by year, 1900-present
- **Coverage:** MLB (NL, AL), NNL (1920-1931), NNL II (1933-1948), NAL (1937-1962), ECL (1923-1928), Cuban Winter League, Mexican League, Puerto Rican Winter League, Venezuelan League
- **Used by:** Ch 05 (name resolution context), Ch 10 (core methodology), Ch 11, The Shadow Nine
- **Critical methodology note:** Where Seamheads has gaps in NLB league averages, the platform uses interpolated values flagged with Reported confidence. Every interpolation is documented in the methodology page.
- **Owner:** Elias-Infrastructure

**4. The Canonical Franchise Table**

- **Source:** Seamheads + SABR + Wikipedia franchise records
- **Schema:** franchise_id, name, name_variants[], league, city, ballparks[], start_year, end_year, cause_of_death (taxonomized in Ch 06)
- **Used by:** Ch 02, Ch 04, Ch 06, Ch 09
- **Owner:** Elias-Infrastructure

**5. The Geographic Reference Table**

- **Content:** City coordinates, sundown town status (Loewen/Berrey database), Green Book listings (LOC), travel-corridor data
- **Used by:** Ch 02, Ch 03, Ch 05
- **Owner:** Elias-Infrastructure with Oscar verification

**6. The Photo and Asset Registry**

- **Content:** Public domain photographs, verified provenance, usage rights, source citation
- **Used by:** Every chapter
- **Owner:** Vera (asset registry) with Oscar (provenance verification)

### Data layer rules

1. **No chapter spec contains its own dataset definition.** Chapter specs reference the canonical tables.

2. **All Oscars write to the same canonical record.** If Oscar-Ch06 verifies Larry Doby's 1946 batting line, Oscar-Ch07 inherits the verification. The data layer is shared truth.

3. **The data layer carries confidence tiers.** Every record is tagged Documented / Verified / Reported / Disputed. Chapter specs reference the tier; they do not redefine it.

4. **The data layer is versioned.** When a quarterly refresh changes a record, the chapter using that record can either accept the change or pin to the old version with an explicit annotation. No silent changes.

5. **The methodology page is the data layer's public face.** Every dataset is documented there. Every limitation is named there. Every interpolation is logged there.

---

## Part 5: The Methodology Framework

### The canonical confidence vocabulary

Every fact, every quote, every statistic, every match, every photograph on the platform carries one of these four labels:

- **Documented:** Primary source verification. Newspaper coverage at the time, archival correspondence, contracts, contemporaneous statistical records. The strongest tier. Used without qualification.

- **Verified:** Multiple secondary sources agree, no contradictions. SABR BioProject + Seamheads + Wikipedia all consistent. Strong tier. Used without qualification but with citations.

- **Reported:** Single secondary source, no primary verification yet, no contradictions. Acceptable for inclusion but with a footnote. Used with brief acknowledgment of the source limitation.

- **Disputed:** Sources conflict. Or the primary source is contested. Or modern scholarship has revised the historical record. Always footnoted, with the conflict named explicitly. Used only when the dispute itself is part of the chapter's argument.

### Operational rules

1. **Every assertion in a chapter spec carries an implicit or explicit confidence tier.** When the tier is implicit, it defaults to Documented or Verified. When it is Reported or Disputed, it must be explicit.

2. **Visualizations follow source confidence.** A franchise on the Ch 06 timeline cannot be displayed without a documented or verified cause of death. A player on The Shadow Nine cannot enter the matching pool without documented or verified qualitative tags. A tryout on the Ch 07 timeline cannot appear without documented or verified primary-source coverage.

3. **The platform never silently drops Disputed material.** If a record is Disputed, the chapter either includes it with the dispute named, or excludes it with a note in the methodology page explaining why.

4. **When in doubt, exclude.** The platform's defense against criticism is rigor. A weaker chapter with airtight sourcing is stronger than a richer chapter with weak sourcing.

### Voice and editorial conventions

Beyond confidence tiers, the platform has a canonical editorial voice. The rules:

- **Active voice for institutional action.** Not "the Negro Leagues declined." They were "dismantled."
- **Subjects are protagonists.** Negro Leagues players are the subjects of their own sentences. MLB players are the context, not the center.
- **No romanticization of any setting.** Not the Negro Leagues as community institution, not Latin American leagues as utopia, not Cooperstown as just arbiter, not Negro World Series as romantic underdog story. Every institution gets the same documented rigor.
- **No reduction of integration to a single date.** Integration was sixteen institutional decisions across twelve years.
- **No reproducing racial slurs.** Document the allegation, cite the source, do not reproduce the language.
- **No quotation without attribution.** Every quote, every direct word, every assertion attributed to a person is sourced to a primary or strong secondary source. Anonymous or apocryphal quotes do not ship.
- **No em dashes.** Platform style. (See: the project lead's instructions in user preferences.)
- **One-line takeaways are not editorializing.** Each chapter has a "one line" that distills the chapter's argument. This is a structural element, not authorial intrusion.

### Source hierarchy

When sources conflict, the platform's preference order:

1. **Primary-source documents** (correspondence, contracts, contemporaneous newspaper coverage, official league records)
2. **Player and witness testimony from contemporaneous interviews**
3. **Player and witness testimony from later interviews**
4. **SABR BioProject and SABR research-committee articles**
5. **Seamheads database records**
6. **Baseball-Reference and Wikipedia secondary records**
7. **Modern scholarship that synthesizes the above**

If a source lower on the hierarchy contradicts a source higher on it, the higher source wins absent strong reason. Where the lower source represents new scholarship that revises the higher source (for example, the 2024 MLB integration of Negro Leagues statistics into the canonical record), the new scholarship wins. Oscar uses judgment, documents the call, and Gates reviews.

---

## Part 6: Parallel Agent Coordination

### The agent roster (updated)

**Oscar (parallelizes):** Negro Leagues historical authority. Multiple instances run concurrently on independent chapter editorial work. Each instance reads this document and the relevant chapter spec at the start of every task. Each instance writes to the shared data layer using the canonical schemas. Tag instances by chapter context (Oscar-Ch02, Oscar-Ch07, Oscar-ShadowNine-CatcherTags, etc.) for traceability.

**Elias (parallelizes):** Statistical and ML methodology. Multiple instances run concurrently, each in a distinct work stream:
- **Elias-Infrastructure:** Shared data layer, era adjustment tables, canonical player tables, methodology page maintenance
- **Elias-Ledger:** The Ch 10 WAR reconstruction model
- **Elias-NameRes:** The Ch 05 cross-league entity matching model
- **Elias-ShadowNine:** The Shadow Nine k-NN matching model
- **Elias-Survival:** The Ch 09 and Ch 06 survival analyses
- Additional Elias streams created as needed for specific chapter ML needs

**Vera (does not parallelize):** UI, visualization, and asset register maintenance. Single instance because cross-chapter design coherence requires single judgment. The asset register is the platform's central design memory; multiple Veras would fragment it. Vera operates serially across chapters, in build-phase order.

**Ida (does not parallelize but expanded role):** PM/coherence and parallel coordination. The Ida-as-Conductor expansion. Ida's new responsibilities:
- **Cross-Oscar coordination:** When Oscar-Ch06 verifies Larry Doby's batting line, Ida ensures Oscar-Ch07 inherits it
- **Cross-Elias coordination:** Same principle for Elias instances
- **Methodology consistency enforcement:** Reviews parallel work for drift against this document
- **Pre-Gates filtering:** Catches obvious problems before they reach Gates, reducing Gates's load
- **Build-phase orchestration:** Decides which agents work on what in which phase
- **The single editorial conscience across parallel streams**

Ida is single-instance because Ida's whole value is being the single voice that prevents drift. Multiple Idas would be the drift.

**Gates (does not parallelize):** Final QA gate. The decisive judgment voice. Single instance, permanently. Gates is the platform's defense against shipping work that isn't ready. Multiple Gates instances would defeat the design intent. Gates reviews serially, in priority order set by Ida.

### How parallel coordination works in practice

A typical Phase 3 day:

- **Oscar-Ch04** is verifying East-West Game 1943 attendance against Larry Lester's archive
- **Oscar-Ch05** is selecting the four anchor players for The Winter Map based on source quality
- **Oscar-Ch06** is finalizing the Newark Eagles compensation ledger
- **Oscar-Ch09** is auditing the canonical franchise table for Cox model input
- **Elias-Ledger** is iterating on the WAR reconstruction model against the 1946 cohort
- **Elias-Infrastructure** is finalizing the Cuban Winter League data ingestion
- **Vera** is designing the Ch 04 dual-line chart with the side-by-side box score block
- **Ida** is reviewing today's outputs across all six streams for methodology consistency, queuing the ready items for Gates, and flagging an inconsistency in how Oscar-Ch04 and Oscar-Ch06 classified the same player's 1947 status
- **Gates** is reviewing yesterday's Ch 02 Green Book Route final draft, then today's Ch 03 Sundown Corridor case studies

Six parallel work streams. One conductor. One judge. The architecture functions because the methodology framework is canonical and Ida is empowered to enforce it.

### Drift detection and correction

The biggest risk in parallel agent work is drift: small inconsistencies that accumulate across instances. The mitigations:

1. **This document is canonical.** Every agent reads it at the start of every task. The methodology vocabulary, the voice rules, and the data conventions are non-negotiable.

2. **Ida is the drift detector.** Ida reviews parallel outputs for consistency before they reach Gates. When Ida finds drift, Ida flags it, the relevant agent reconciles, and the methodology page is updated if the drift exposed a gap in this document.

3. **The shared data layer is the consistency engine.** Two Oscars cannot disagree about Larry Doby's 1946 batting line because there is only one Larry Doby record, and both Oscars write to and read from it. Disagreement surfaces as a write conflict, not as a quiet contradiction.

4. **Gates catches what Ida misses.** Gates's review is the last defense. If something drifted past Ida, Gates blocks the ship and the team reconciles.

5. **Weekly methodology review.** Every Friday, Ida produces a one-page methodology drift report. Patterns of drift get codified into this document. The document evolves; the canonical vocabulary stabilizes.

---

## Part 7: Schedule Risk Inventory

The biggest risks to platform completion, ranked by likelihood × impact:

### Risk 1: Ch 10 methodology cannot be defended

**What:** Elias-Ledger builds the WAR reconstruction model. Gates rejects it on methodology grounds. External reviewers (NLBM, SABR Negro Leagues Research Committee) raise objections that cannot be fully resolved. The platform either ships a model with documented limitations or does not ship Ch 10 at all.

**Mitigation:** Start Ch 10 work in Phase 1, not Phase 4. Build external validation into the model's design phase, not its review phase. Engage NLBM and SABR Negro Leagues Research Committee from the start. Accept that the model may ship with documented limitations and structure the methodology page to make those limitations honest, not hidden.

**Fallback:** Ch 11 Cooperstown becomes "the players the documented record supports as Hall of Fame candidates by traditional sabermetric methods" rather than "the players the Ledger model identifies." Less ambitious; still defensible.

### Risk 2: External validation surfaces something the platform cannot defend

**What:** A reviewer raises an objection the team cannot answer. The objection is about methodology, but it could also be about editorial framing, source selection, or omission of relevant material.

**Mitigation:** External validation in every phase, not just Phase 4. Build relationships with NLBM, SABR, and individual researchers (Larry Lester, Phil Dixon, etc.) from Phase 1. Treat their feedback as build input, not as post-build review. Gates considers external feedback as input alongside internal review.

**Fallback:** The platform delays specific chapters until objections are resolved. The platform never ships a chapter with unresolved external objections.

### Risk 3: The Shadow Nine tagging work is more than Oscar can do well

**What:** Even with parallel Oscars, tagging 400-600 NLB players across six categories at the required rigor is a substantial editorial undertaking. The risk is that Oscar-ShadowNine instances produce inconsistent tags across the pool, or that the tags themselves are not defensible at the level the platform needs.

**Mitigation:** Three actions. First, recruit external researchers as paid contractors for the tagging work, not just for review. Treat tagging as a research project with a budget, not a side task for the Oscar agent class. Second, start tagging in Phase 1 with the most-documented 50 players as a calibration set; review against external researchers for face validity before scaling. Third, structure the tagging work so that any single tag can be challenged by a reader and reviewed.

**Fallback:** The Shadow Nine ships with a smaller matching pool than originally planned. Fewer NLB players, deeper documentation on each. The feature is less expansive but more defensible.

### Risk 4: The frontend cannot render what the methodology requires

**What:** Some of the chapter visualizations are technically demanding. The Ch 06 timeline animation, the Ch 07 sort-by-gap toggle, The Shadow Nine field diagram view. The risk is that engineering capacity does not match design ambition.

**Mitigation:** Vera and engineering work in close coordination from Phase 1. Build the platform shell first. Build each chapter's interactive elements in dependency-aware order. Where engineering ambition exceeds capacity, simplify the design before ship rather than after.

**Fallback:** Static visualizations replace interactive ones where necessary. The chapter still ships; the interaction just gets parked for v2.

### Risk 5: The platform stalls in coordination overhead

**What:** Six parallel work streams plus a conductor plus a judge plus a designer plus methodology infrastructure plus external review is a lot of coordination. The risk is that Ida becomes saturated, drift goes undetected, and the platform's quality erodes silently.

**Mitigation:** Ida's workload is monitored explicitly. If Ida is saturated, the team reduces parallelization (fewer Oscar instances running simultaneously) rather than letting Ida fail silently. The platform prioritizes quality over throughput. Ida's "I am at capacity" signal is respected, not overridden.

**Fallback:** Reduce parallel Oscar instances from four to two. Slower throughput, lower coordination load, same quality bar.

---

## Part 8: The Single Page of Platform Truth

This document -- Platform Architecture v1.0 -- is the single page of platform truth. Every agent reads it before every task. Every chapter spec is subordinate to it. Every methodology question is resolved against it.

The document evolves. The canonical vocabulary stabilizes over time. The build phase ordering may shift as risks become reality. The agent topology may expand or contract as the work demands. Versioning is explicit: this is v1.0; the next material change is v1.1.

When this document changes, Ida announces the change to every active agent. No silent changes. The platform's coordination depends on every agent operating from the same canonical truth.

### What this document is not

- It is not chapter content. Chapter specs are separate documents.
- It is not the methodology page. The public-facing methodology page derives from this document but is written for readers, not agents.
- It is not the design system. Vera's design system lives in `docs/design.md`.
- It is not the chapter tenants. The fifteen canonical chapter tenants live in `docs/chapter-tenants.md`.

This document is the architecture. The architecture is what makes the rest of it ship.

---

## Part 9: What Changes In Practice, Today

Concrete operational changes from this document, in priority order:

1. **All Oscar prompts updated** to reference this document as required reading before every task. The methodology vocabulary section is the most critical reference.

2. **Ida's prompt expanded** to include the Ida-as-Conductor responsibilities. Cross-Oscar coordination, cross-Elias coordination, methodology drift detection, pre-Gates filtering, weekly drift report.

3. **Elias parallelizes immediately.** Elias-Infrastructure starts on the shared data layer. Elias-Ledger starts on Ch 10 model work. Both in Phase 1, not Phase 4.

4. **Vera's asset register elevated to platform infrastructure.** Documented as part of the shared data layer. Single source of truth for every photograph, every chart, every visualization across chapters.

5. **The methodology page placeholder is created.** Lives at `/methodology` on the platform. Initially empty. Populated phase by phase as the canonical vocabulary, data layer, and model documentation are written. By Phase 4 ship, the methodology page is comprehensive.

6. **External validation relationships begin.** NLBM and SABR Negro Leagues Research Committee contacts initiated. The platform commits to treating external reviewers as collaborators, not as gatekeepers.

7. **Ch 07 spec gets a methodology note appended.** The counterfactual block is now formally a Phase 5 deliverable, not a Phase 3 deliverable. The chapter spec is updated to reflect that the block ships in Phase 5 with Ch 10's model. The book reads in order; the team built it in dependency-aware order.

8. **Future chapter specs reference this document at the top.** No chapter spec is approved by Gates without an explicit reference to the canonical methodology framework.

---

## Part 10: The Architectural Bet

The platform is making four bets simultaneously:

1. **Ch 10 will be defensible enough to anchor the back half.** This is the largest bet. It is mitigated by starting Ch 10 work immediately and engaging external validation from day one.

2. **Parallel Oscar instances can produce consistent output if the methodology framework is canonical and Ida enforces it.** This is a coordination bet. It is mitigated by Ida's expanded role and the canonical methodology document.

3. **The shared data layer is buildable in Phase 1 to support every chapter that follows.** This is an infrastructure bet. It is mitigated by Elias-Infrastructure starting on day one.

4. **The Shadow Nine's matching model is defensible enough to be the platform's signature feature.** This is a public-facing bet. It is mitigated by external validation, the confidence-score display in the UI, and the structured editorial work behind every match.

If all four bets pay off, the platform ships at museum quality on a feasible schedule. If any bet fails, the mitigations and fallbacks in this document protect against catastrophic delay.

The architecture is the bet. This document is the record of the bet.

---

*Read this document. Then start the work.*
