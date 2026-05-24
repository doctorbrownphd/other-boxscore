# The Other Box Score -- CLAUDE.md
## Project Instructions for Claude Code

**Platform:** theotherboxscore.org
**Mission:** A museum-quality, open-source data journalism platform dedicated to the Negro Leagues. Fourteen chapters organized as five parts and a coda. Each chapter answers the same question from a different direction: why don't you know their names?
**Standard:** Everything that ships should be something the Negro Leagues Baseball Museum would put their institutional name on.
**License:** MIT (code) · CC0 (data)
**Owner:** Jeremy Haynes

---

## Non-Negotiable Rules

These apply to every task in every session. They are never relaxed.

1. **No em dashes anywhere in any output.** Use commas, colons, or restructure the sentence. This applies to code comments, markdown, prose, commit messages, everything.
2. **Accuracy above all.** Every factual claim about Negro Leagues history requires a cited source. If a source cannot be identified, the claim does not ship.
3. **No corners cut.** The easy version of a story is never the right version.
4. **Public domain verified, not assumed.** Every photograph and archival asset needs a complete provenance chain in the asset register before it enters the repo.
5. **Copyright is a hard wall.** No fair use rationalizations. If rights are unclear, it does not ship.
6. **Museum quality.** The NLBM standard. If uncertain, the answer is no.
7. **The subjects are the protagonists.** Black players are never supporting characters in a white baseball narrative. Their excellence is primary. The exclusion is context, not frame.
8. **One voice.** The "Have you heard" register -- conversational, direct, slightly accusatory, never condescending -- is consistent across every chapter.

---

## Communication Style

- Direct and specific. No fluff, no preamble.
- Technical depth is welcome and expected.
- Push back when something is wrong. Agreement is not the goal. Accuracy is.
- When you find a problem, name it specifically and propose the fix.
- Never soften a finding because the intention was good.

---

## Repository Structure

```
other-boxscore/
  CLAUDE.md                    ← this file
  METHODOLOGY.md               ← global methodology documentation
  LICENSE                      ← MIT
  DATA_LICENSE                 ← CC0
  README.md                    ← platform overview
  chapters.json                ← chapter registry (status: live/coming)
  site/                        ← platform shell homepage
    index.html
    shell.css
    shell.js
    chapters.json              ← symlink to root
  chapters/
    01-the-color-line/         ← Chapter 01, fully built
      CLAUDE.md                ← chapter-specific instructions
      METHODOLOGY.md           ← chapter methodology
      index.html               ← Record Book (main tab)
      lost-seasons.html
      breach.html
      numbers.html
      careers.html
      voices.html
      gibson.html
      synthesis.html
      gallery.html
      method.html
      styles.css
      baseball.css
      [data JS files]
      photos/
      paper.pdf
    02-the-green-book-route/   ← locked, in build
    03-the-sundown-corridor/   ← locked, in build
    [... 14 chapters total + coda]
  agents/
    oscar.md                   ← Historical Content Authority
    elias.md                   ← Data Scientist
    vera.md                    ← Viz Engineer
    ida.md                     ← PM
    gates.md                   ← QA / Final Gate
  data/
    asset-register.json        ← all image assets, full provenance chains
    chapters.json              ← chapter registry (canonical)
  shared/
    platform-nav.html          ← platform nav fragment, included in all chapters
    design-tokens.css          ← shared design system tokens
```

---

## Tech Stack

| Layer | Choice | Notes |
|-------|--------|-------|
| Chapter 01 | Vanilla HTML/CSS/JS | No build step. Static. Portable. |
| Shell | HTML/CSS/JS or React + Vite | Matches chapter aesthetic |
| Visualization | D3.js (custom) | All charts purpose-built |
| Maps | Mapbox GL | Geography chapters |
| Data | Static JSON / window.* JS | Pre-computed. No runtime fetching. |
| ML pipeline | Python / Stan / PyMC / PyTorch | Offline. Outputs committed as JSON. |
| Hosting | Vercel or Netlify | Zero infrastructure |
| Fonts | EB Garamond, Space Mono, IBM Plex Mono, Playfair Display | Google Fonts CDN |

---

## Design System (Summary)

Full spec in `docs/design.md`. Key tokens:

```css
--ink:        #13110d;   /* primary background */
--ink-2:      #1a1812;   /* card surfaces */
--vellum:     #e8e0cf;   /* primary text */
--amber:      #d4a64a;   /* integration gold -- key accent */
--oxblood:    #a14545;   /* barrier red -- used sparingly */
--slate:      #6f8aa8;   /* archival blue -- data chrome */
--serif:      "EB Garamond", Georgia, serif;
--mono:       "IBM Plex Mono", monospace;
```

The aesthetic: ledger meets broadside. The data is ledger. The story is broadside. Every chapter holds both at once.

---

## Agent Team

Five agents review every PR before merge. Nothing ships without all five signing off.

| Agent | File | Authority |
|-------|------|-----------|
| Oscar | `agents/oscar.md` | Negro Leagues historical accuracy, framing, PD provenance |
| Elias | `agents/elias.md` | Statistics, ML methodology, uncertainty representation |
| Vera | `agents/vera.md` | Visualization, UI, assets, accessibility, asset register |
| Ida | `agents/ida.md` | Project coherence, tenets, scope, voice |
| Gates | `agents/gates.md` | Final QA gate -- nothing merges without Gates |

Invoke agents on every PR touching content, data, images, or methodology. Infrastructure-only PRs (CI config, dependency updates) are exempt unless they affect content delivery.

---

## The Asset Register

Every image in the repo has an entry in `data/asset-register.json`. Format:

```json
{
  "filename": "example.jpg",
  "subject": "Player Name",
  "source": "Library of Congress Prints and Photographs",
  "source_url": "https://loc.gov/...",
  "date_created": "1931",
  "pd_basis": "Published before 1928",
  "legal_framework": "17 U.S.C. § 102",
  "oscar_approval": "APPROVED",
  "oscar_approval_date": "2026-05-01",
  "vera_approval": "APPROVED",
  "vera_approval_date": "2026-05-01",
  "chapter_usage": ["01-the-color-line"],
  "caption": "Source · Year · Public Domain"
}
```

No image enters the repo without a complete entry. Vera blocks any PR that violates this.

---

## The chapters.json Registry

```json
{
  "chapters": [
    {
      "id": "the-color-line",
      "number": "01",
      "part": 1,
      "title": "The Color Line",
      "slug": "the-color-line",
      "description": "The barrier held for forty-seven years. The record corrected itself seventy-seven years late.",
      "status": "live",
      "url": "/chapters/the-color-line/",
      "meta": "9 sections · 5 ML models · 2,300+ players"
    }
  ]
}
```

Status values: `live` | `coming` | `announced`. The shell reads this at build time and renders accordingly. Adding a chapter means updating this file and adding the chapter directory.

---

## Commit Message Convention

```
[chapter-id] type: short description

Examples:
[01-color-line] fix: correct Josh Gibson debut year in breach-data.js
[shell] feat: add Cool Papa Bell to rotating hook
[agents] update: expand Oscar PD verification requirements
[data] add: asset register entries for lost-seasons photos
[global] docs: update METHODOLOGY.md cross-league comparison section
```

Types: `feat` | `fix` | `docs` | `data` | `style` | `refactor` | `test`

---

## What Never Ships

- A factual claim without a cited source
- A photograph without a complete asset register entry
- An ML output without uncertainty bounds
- A cross-league statistical comparison without documented assumptions
- Content that uses euphemism for segregation or exclusion
- Content that frames Black players as supporting characters
- Anything that would embarrass the platform in a meeting with the NLBM
- Em dashes. Ever.

---

## Chapter Tenants

The full chapter tenant standard is in `docs/chapter-tenants.md`. Every chapter is held to all fifteen tenants. Summary:

- Self-contained but cross-referenced
- Shared shell, chapter-specific interior
- Data and human story at equal evidentiary standard
- Opens with a name -- "Have you heard of [person]?"
- Narrative through line -- the spine question plus editorial connective tissue
- Uncertainty labeled at the point of claim, not just in methodology
- Methodology always visible and written for a curator
- Original finding (aspiration) -- documented at spec time
- "Oh wow" moment -- required, tested by all five agents, three must identify it unprompted
- ML and AI maximized -- fully generative conclusions with confidence labels
- Design is elegant and respectful
- PD verified before build begins -- Oscar signs off at spec time
- Mobile first-class -- 375px minimum, no degradation
- Chapter is citable -- three citation formats on every page
- Three hard build gates -- Spec, Build, Ship -- no exceptions
