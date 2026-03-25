# Design Brainstorm — Matrix Ski Portfolio

## Concept
A portfolio for a hobby skier who works in IT. The central metaphor: **the mountain is code, and code is the mountain.** The digital and the physical are the same terrain.

---

<response>
<probability>0.07</probability>
<text>

## Idea A — "Ghost in the Slope" (Cyberpunk Brutalism)

**Design Movement:** Cyberpunk Brutalism — raw, confrontational, neon-drenched.

**Core Principles:**
1. Asymmetric tension: every element leans, cuts, or bleeds off-screen
2. Neon on void: ultra-dark backgrounds with violent accent flashes
3. Glitch as texture: scanlines, chromatic aberration, VHS artifacts
4. Type as architecture: oversized display type used structurally

**Color Philosophy:**
- Background: near-black `#050505`
- Matrix green: `#00FF41` (classic terminal green)
- Danger accent: `#FF003C` (for hover states, borders)
- Ice blue: `#00D4FF` (secondary accent for ski elements)
- Emotional intent: tension, speed, danger — the feeling of a steep black run at night

**Layout Paradigm:**
- Diagonal grid cuts (clip-path polygons) separating sections
- Full-bleed hero with 3D canvas taking 100vh
- Content sections offset left/right alternately, never centered
- Navigation: vertical left rail, fixed, with glitch hover effects

**Signature Elements:**
1. Scanline overlay (CSS repeating-gradient) across entire page
2. Glitch text animation on headings (CSS keyframe chromatic split)
3. Diagonal section dividers with neon border lines

**Interaction Philosophy:**
- Hover states trigger glitch flashes and color inversions
- Scroll-triggered entrance animations with slight "static" effect
- Cursor leaves a faint green trail

**Animation:**
- Matrix rain: classic vertical character fall, variable speed and opacity
- Mountain wireframe: slow auto-rotation, vertices pulse with green glow
- Section entrances: slide-in with 2px chromatic offset then snap to position

**Typography System:**
- Display: `Share Tech Mono` (monospace, terminal aesthetic)
- Body: `Rajdhani` (condensed, technical)
- Hierarchy: 120px / 48px / 24px / 16px

</text>
</response>

<response>
<probability>0.06</probability>
<text>

## Idea B — "Cold Boot" (Minimal Terminal Zen)

**Design Movement:** Terminal Zen — the beauty of a blinking cursor in an empty room.

**Core Principles:**
1. Silence speaks: maximum whitespace, minimum decoration
2. Monochrome with one sacred accent color
3. Everything types itself into existence
4. The grid is invisible but absolute

**Color Philosophy:**
- Background: `#0A0A0A` (not quite black — warmer)
- Primary text: `#E8E8E8` (off-white, easy on eyes)
- Accent: `#00FF41` (Matrix green, used sparingly — only for interactive/live elements)
- Muted: `#333333`
- Emotional intent: focus, clarity, the meditative state of flow (both coding and skiing)

**Layout Paradigm:**
- Single-column, left-aligned, terminal-style
- Content appears as if being typed by a program
- Sections separated by `---` dividers and ASCII art
- Navigation is a horizontal `> command` prompt at top

**Signature Elements:**
1. Blinking cursor `█` on section headings
2. ASCII art mountain in the hero
3. `$ ./ski --mode=expert` style labels for section titles

**Interaction Philosophy:**
- Everything feels like interacting with a CLI
- Hover shows `>` prefix, click triggers "execution" animation
- Skills shown as a progress bar rendered in ASCII `[████████░░]`

**Animation:**
- Typewriter effect for all headings
- Matrix rain behind ASCII mountain
- Scroll: content "loads" line by line

**Typography System:**
- All: `JetBrains Mono` (premium monospace)
- Sizes: 14px base, 20px subheadings, 48px hero
- No serif, no sans-serif — pure mono

</text>
</response>

<response>
<probability>0.08</probability>
<text>

## Idea C — "Digital Descent" (Hacker Topography) ← CHOSEN

**Design Movement:** Hacker Topography — the intersection of geospatial data visualization and terminal hacking culture.

**Core Principles:**
1. The mountain IS the data — 3D wireframe terrain rendered in real-time with Three.js
2. Depth through layers: background rain → midground mountain → foreground UI
3. Controlled chaos: the rain is random, the mountain is structured — tension between the two
4. Monochrome base with precisely placed green luminescence

**Color Philosophy:**
- Background: `#000000` (pure black — the void before the matrix)
- Matrix green (bright): `oklch(0.85 0.25 142)` — `#00FF41`
- Matrix green (dim): `oklch(0.35 0.15 142)` — `#003B00`
- Mountain wireframe: `oklch(0.65 0.20 142)` — `#00C832`
- Snow accent: `oklch(0.92 0.02 200)` — near-white with icy tint
- Emotional intent: the electric thrill of speed, the cold clarity of altitude, the focus of a hacker in flow state

**Layout Paradigm:**
- Full-bleed hero canvas (100vh) with layered canvas elements
- Sections use an asymmetric two-column grid (60/40 split)
- Left-anchored navigation with vertical text label
- Content blocks have left border accent lines (1px green)

**Signature Elements:**
1. Animated 3D wireframe mountain (Three.js PerlinNoise terrain)
2. Matrix character rain (Canvas 2D, behind the mountain)
3. Glowing green border-left on all content cards

**Interaction Philosophy:**
- Mouse movement subtly tilts the 3D mountain (parallax)
- Hover on nav items triggers a brief matrix-rain burst in that section
- Scroll progress shown as a vertical green line on the left edge

**Animation:**
- Rain: 60fps canvas animation, characters fade from bright → dim → invisible
- Mountain: continuous slow rotation on Y axis, slight bob on Z
- Hero text: character-by-character reveal with matrix-decode effect
- Section entrance: fade-up with 40px translate, staggered children

**Typography System:**
- Display: `Share Tech Mono` (Google Fonts) — for hero and section titles
- Body: `DM Sans` — clean, modern, readable (contrast to the mono display)
- Hierarchy: Hero 72px / Section titles 40px / Subheadings 20px / Body 16px
- Letter-spacing: +0.1em on all caps labels

</text>
</response>

---

## Selected Approach: **Idea C — "Digital Descent"**

The hacker-topography concept best serves the dual identity (skier + IT professional). The layered canvas approach creates genuine visual depth, and the tension between the chaotic rain and the structured mountain is a perfect metaphor for the user's two worlds.
