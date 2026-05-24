# The Other Box Score -- Design System
## design.md · v1.0

**For:** Claude design sessions, new chapter builds, UI contributors
**Status:** CANONICAL -- all chapters conform to this spec
**Last updated:** May 2026

---

## The Aesthetic Thesis

This platform sits at the intersection of two visual traditions that have almost never been placed in conversation with each other.

**The ledger** -- the official record book. Clean columns, ruled lines, ink on cream stock. The aesthetic of the scorecard and the box score. Precise, unsentimental, built to hold facts. The visual language of accountability.

**The broadside** -- the visual language of the Negro Leagues themselves. The hand-lettered ballpark signage, the vivid printed programs, the newspapers that covered these games when no one else would. The Pittsburgh Courier. The Chicago Defender. Bold. Declarative. Made to be read across a room.

The data is ledger. The story is broadside. The platform holds both at once.

**What this is not:** vintage sepia filters, distressed textures, fake letterpress. That is not this.

---

## Color Tokens

```css
:root {
  /* Backgrounds */
  --ink:        #13110d;   /* primary background -- near-black with warmth */
  --ink-2:      #1a1812;   /* card surfaces, secondary panels */
  --ink-3:      #221f17;   /* tertiary -- used for nested elements */
  --rule:       #2a261d;   /* borders, dividers */
  --shell-bg:   #232318;   /* shell homepage -- 8% lighter than --ink */

  /* Text */
  --vellum:     #e8e0cf;   /* primary text -- aged paper white */
  --vellum-dim: #c4bda9;   /* secondary text */
  --muted:      #8a8270;   /* tertiary text, captions */
  --muted-2:    #5e5849;   /* deeply muted -- timestamps, fine print */

  /* Accent colors */
  --amber:      #d4a64a;   /* integration gold -- primary accent */
  --amber-2:    #f0c878;   /* lighter gold -- hover states */
  --oxblood:    #a14545;   /* barrier red -- used sparingly and with intent */
  --slate:      #6f8aa8;   /* archival blue -- data chrome, labels */
  --moss:       #8fa05a;   /* secondary accent -- used rarely */
  --bronze:     #b96f4a;   /* warm accent -- used rarely */
  --tan:        #a08456;   /* neutral warm -- used rarely */

  /* Semantic */
  --color-locked: rgba(161,69,69,0.6);   /* locked chapter indicators */
  --color-live:   rgba(212,166,74,0.9);  /* live chapter indicators */
}
```

### Color usage rules

**--amber is the primary accent.** Player names, key statistics, integration dates, CTA elements, active navigation states. It appears frequently and consistently. It is integration gold -- the color of the moment the barrier moved.

**--oxblood is used with intent.** The color line itself on the timeline. Locked chapter indicators. The Coda section. "Coming" badges. It appears rarely and always signals something specific: exclusion, barrier, incompleteness. Never use it decoratively.

**--slate is data chrome.** Part labels, section metadata, methodology text, Space Mono annotations. It is the color of scorebook ink. Numbers and labels live here.

**--vellum is text.** Do not use white (#fff) for body text. --vellum has warmth that reads on --ink without harshness.

**No gradients.** No drop shadows on text. No glow effects. The aesthetic is ink on paper, not screen UI.

---

## Typography

### Typeface stack

```css
:root {
  --serif:    "EB Garamond", "Iowan Old Style", Georgia, serif;
  --mono:     "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, monospace;
  --display:  "Playfair Display", "EB Garamond", Georgia, serif;
}
```

**Google Fonts import:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=IBM+Plex+Mono:wght@300;400;500&family=Playfair+Display:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap">
```

### Type roles

| Role | Typeface | Size | Weight | Color | Use |
|------|----------|------|--------|-------|-----|
| Platform mark | IBM Plex Mono | 11px | 400 | --vellum | "THE OTHER BOX SCORE" in header |
| Domain | IBM Plex Mono | 10px | 400 | --amber | "theotherboxscore.org" |
| Part labels | IBM Plex Mono | 10-11px | 400 | --slate | "PART ONE · THE WORLD THEY PLAYED IN" |
| Chapter numbers | IBM Plex Mono | 10px | 400 | --amber at 55% | "CH · 01" |
| Section metadata | IBM Plex Mono | 11-13px | 400 | --slate | Stat labels, dates, sources |
| Data figures | IBM Plex Mono | 18-32px | 700 | --amber | Key statistics, numbers |
| Display headers | Playfair Display | 32-72px | 700 | --vellum | Chapter titles, hook headlines |
| Display italic | Playfair Display | italic | 400 | --amber | Gold italic accent words |
| Body prose | EB Garamond | 16-18px | 400 | --vellum | All narrative text |
| Body italic | EB Garamond | italic | 400 | --vellum-dim | Pull quotes, annotations |
| Captions | IBM Plex Mono | 10px | 300 | --muted | Photo credits, source lines |

### Type rules

**Letter spacing on monospace labels:** `letter-spacing: 0.15em` to `0.28em` on uppercase IBM Plex Mono labels. This is the ledger tradition -- column headers, register entries. Do not apply tight letter-spacing to Garamond.

**Playfair Display is for display only.** Chapter titles, section headlines, the "Have you heard" hook. It does not appear in body text.

**EB Garamond features:** Enable `font-feature-settings: "kern", "liga", "onum"` on all Garamond text. The oldstyle numerals (`onum`) are essential -- they sit in text properly. Lining numerals in Garamond are jarring.

**Scale:** Base 17px. Subheads 20-24px. Section titles 28-36px. Display 48-72px. Mobile scales down by approximately 15%.

---

## Grain and Texture

A subtle paper grain overlay appears on all backgrounds:

```css
body::before {
  content: "";
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  background-image: url("data:image/svg+xml,...");  /* see styles.css */
  opacity: 0.18;
  mix-blend-mode: overlay;
}
```

The grain is present but not dominant. It registers as texture, not as a visible pattern. On the shell homepage, opacity drops to 0.08 -- lighter than the chapters.

---

## Layout

### Maximum widths

| Context | Max-width |
|---------|-----------|
| Shell homepage content | 1200px |
| Chapter content | 900px |
| Prose sections | 640px |
| Stat blocks and figures | Full container width |
| Masthead | Full viewport |

### Spacing scale

Use multiples of 8px for all spacing. Common values: 8, 16, 24, 32, 40, 48, 56, 64, 80, 96px.

### Grid

Chapter cards: 3 columns desktop (`repeat(3, 1fr)`), 2 tablet, 1 mobile.
Stat blocks: 2-4 columns depending on content.
Photo grids: `repeat(auto-fill, minmax(220px, 1fr))`.

---

## Components

### The masthead

Present on every page. Contains: platform ruler mark (SVG), chapter title and series mark, tab navigation, section metadata (right-aligned).

```
[ruler icon]  ONE HUNDRED YEARS OF          Section  01/09
              The Color Line                Players  2,300+
              [tab] [tab] [tab active] ...  Window   1920-2024
```

The ruler icon is a consistent SVG across all chapters -- a vertical rule with horizontal tick marks in --amber. It links back to the shell homepage.

### The stat row

Key statistics displayed as labeled figures across the top of major sections:

```css
.statrow {
  display: grid;
  grid-template-columns: repeat(var(--cols, 4), 1fr);
  border-top: 1px solid var(--rule);
  border-bottom: 1px solid var(--rule);
}

.statrow .stat-num {
  font-family: var(--mono);
  font-size: 28px;
  font-weight: 700;
  color: var(--amber);
}

.statrow .stat-label {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.15em;
  color: var(--muted);
  text-transform: lowercase;
}
```

### The section head

Standard opening for every major content section:

```html
<div class="section-head">
  <span class="fig-label">FIG. 01 · SUBTITLE IN CAPS</span>
  <h2 class="section-title">The human-readable title here.</h2>
  <p class="section-lede">One or two sentences establishing what this figure shows...</p>
</div>
```

Fig labels are IBM Plex Mono, --slate, 11px, letter-spacing 0.2em.
Section titles are Playfair Display, --vellum, 28-32px.
Lede text is EB Garamond italic, --vellum-dim, 16-17px.

### The card

Used for chapter cards on the shell, player cards, and content modules:

```css
.card {
  background: var(--ink-2);
  border: 1px solid var(--rule);
  padding: 22px;
  display: flex;
  flex-direction: column;
}

.card.live:hover {
  border-color: rgba(212, 166, 74, 0.45);
}

.card.locked {
  opacity: 0.5;
  cursor: default;
}
```

Cards have no border-radius. This is a ledger. Ledgers have squared corners.

### The tab navigation

```css
.tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--rule);
  overflow-x: auto;
}

.tab {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 12px 20px;
  color: var(--muted);
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  cursor: pointer;
}

.tab.active {
  color: var(--vellum);
  border-bottom-color: var(--amber);
}

.tab:hover:not(.active) {
  color: var(--vellum-dim);
}
```

### The barrier line

Used on the Record Book timeline. The most important single visual element in the platform:

- Color: `--oxblood` (#a14545)
- Width: 1.5px horizontal rule
- Behavior: draws itself across the timeline with a CSS animation, then stops cold. No easing on the stop. It ends. That is intentional.
- It appears on ONE visualization only. It is never used decoratively.

### The status badge

```html
<!-- Live chapter -->
<span class="badge-live">Live</span>

<!-- Locked chapter -->
<span class="badge-locked">Coming</span>
```

```css
.badge-live {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.15em;
  color: var(--amber);
  border: 1px solid rgba(212,166,74,0.32);
  padding: 2px 6px;
  text-transform: uppercase;
}

.badge-locked {
  font-family: var(--mono);
  font-size: 9px;
  letter-spacing: 0.15em;
  color: var(--oxblood);
  border: 1px solid rgba(161,69,69,0.28);
  padding: 2px 6px;
  text-transform: uppercase;
}
```

---

## Data Visualization Standards

### Uncertainty representation

Every ML output with uncertainty bounds displays those bounds visually. Non-negotiable.

For fan charts (career reconstruction):
- The fan shows 5th, 25th, 75th, 95th percentiles as filled regions
- Amber fill at decreasing opacity outward
- Actual career as a solid --vellum line overlaid on the fan
- The gap between fan and actual line is visible without annotation

For dot plots (leaderboard comparisons):
- Pre-integration dots in --vellum-dim
- Post-integration dots in --amber
- The toggle between states is animated (CSS transition, 400ms)
- Both states show labels -- no dots without labels

For timeline visualizations:
- X-axis is always time, clearly labeled
- The --oxblood barrier line appears once, on the Record Book timeline only
- Integration dates highlighted in --amber

### Chart honesty rules

- Y-axis always starts at zero unless there is an explicit documented reason not to
- When Y-axis is truncated, it is labeled clearly: "Y axis starts at [value]"
- Color is never the sole encoding of meaning -- shape or label provides redundancy
- Every chart has a title, a source line, and a methodology note
- Confidence intervals are shown, not hidden

### Accessibility

- WCAG AA contrast minimum on all text
- Every interactive element has keyboard access
- Color-blind safe palette -- --amber and --oxblood are distinguishable by lightness, not hue alone
- Every visualization has an ARIA label or `role="img"` with `<title>` and `<desc>`

---

## Photography

### Source requirements

All photographs are public domain with complete provenance chains in the asset register. No exceptions.

Preferred sources in order:
1. Library of Congress Prints and Photographs (loc.gov/photos)
2. PICRYL public domain aggregator (picryl.com)
3. Smithsonian Institution Open Access
4. NYPL Digital Collections (public domain items)
5. Chicago History Museum (open access items)
6. Memphis Public Library T.H. Hayes Collection

### Display rules

- Photographs appear in black and white as taken. No colorization, no filters, no enhancement.
- Exception: if a photograph was taken in color (rare for this era), it appears as taken.
- Baseball card proportions for player cards: approximately 2.5:3.5 ratio.
- Photo credit appears in IBM Plex Mono 300 weight, 10px, --muted, below the image: "Source · Year · Public Domain"
- One photograph per player card maximum.

### Photographs that require special care

Any photograph of a player who died after 1977 (copyright term issues), any photograph from a commercial studio (rights may not have transferred), any photograph where the PD basis is "I found it online" (not acceptable) -- these all require Oscar's explicit review before entry into the asset register.

---

## Motion

Animation is used sparingly and with purpose. Every animation on this platform means something.

**The splash screen:** A single page-turn transition. Happens once per session. Not a fade -- a directional turn. The only moment of directional animation in the experience.

**The barrier line:** Draws across the timeline, stops cold. The stop is the point.

**The Breach animation:** Cells light in integration order over 30 seconds. Each cell has a single transition: dark to --amber. No bounce, no spring. It lights. That is enough.

**The Numbers toggle:** Pre/post 2024 dots transition in 400ms. The dots that were already there do not move -- they become visible. This is intentional.

**Hover states:** Border color transitions, 200ms. Nothing else on hover.

**No parallax. No scroll-triggered animations beyond what exists. No loading spinners unless data is genuinely being fetched.**

---

## The Shell vs. The Chapters

The shell homepage is the same visual world as the chapters but at lower intensity.

| Property | Shell | Chapters |
|----------|-------|----------|
| Background | #232318 | #13110d |
| Grain opacity | 0.08 | 0.18 |
| Content density | Lower | Higher |
| Emotion | Invitation | Immersion |

The reader arrives at the shell. They enter a chapter. The difference should feel like walking from an entrance hall into a reading room.

---

## Platform Navigation Fragment

Every chapter includes a thin top bar linking back to the shell. This is the `shared/platform-nav.html` fragment:

```html
<div class="platform-nav">
  <a href="https://theotherboxscore.org" class="platform-nav-link">
    <svg width="10" height="40" viewBox="0 0 18 72" aria-hidden="true">
      <!-- ruler SVG -- see shared/platform-nav.html for full SVG -->
    </svg>
    <span class="platform-nav-name">The Other Box Score</span>
  </a>
</div>
```

```css
.platform-nav {
  display: flex;
  align-items: center;
  padding: 0 24px;
  height: 36px;
  background: var(--ink);
  border-bottom: 1px solid rgba(212,166,74,0.08);
}

.platform-nav-name {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  color: rgba(212,166,74,0.5);
  text-transform: uppercase;
  margin-left: 10px;
}

.platform-nav-link {
  display: flex;
  align-items: center;
  text-decoration: none;
}

.platform-nav-link:hover .platform-nav-name {
  color: var(--amber);
}
```

---

## "Have You Heard" Through Line

Every part of the platform opens with a form of the question. The exact phrasing varies. The register never does.

**Shell hook:** "Have you heard of [player]?" -- six rotating players
**Part headers:** "Have you heard how they got there?" / "Have you heard what they built?" / etc.
**Chapter openers:** "Have you heard of [specific name relevant to this chapter]?"
**Social cards:** "[Name]. [Two-sentence hook]." -- no question mark needed when the fact speaks

The voice is: the friend who knows something you don't and isn't leaving until you know it too. Never condescending. Never lecture-y. Direct.

---

## What This Design Is Not

It is not vintage sepia. It does not perform nostalgia.
It is not a modern sports analytics dashboard. It does not perform data science.
It is not a memorial. It does not perform grief.

It is a record. It looks like what it is.
