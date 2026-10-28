# AI Graveyard — UI Design Plan

## Inferences
- **Audience:** curious tech observers and venters.
- **Use case:** one action — submit a claim.
- **Tone:** atmospheric/dark, eerie. Not "clean and modern."

## Macrostructure
**Stat-Led** — big numbers up front (claims, votes, buried count), then tombstone grid,
then leaderboard. Avoids the Specimen default-attractor.

## Theme
**Midnight** (dark paper, cool greys, single accent). Paper band dark, accent hue cool-green,
display style high-contrast serif. Differs from any prior run on all three axes.

## Nav / Footer
- Nav: **N5 Floating pill** (not the N1a default).
- Footer: **Ft5 Statement** (big closing line + minimal links, not the 4-col Ft3 default).

## Typography (2+1, no italic headers)
- Display: **Cinzel** (classical, eerie, Roman only).
- Body: **Atkinson Hyperlegible** (readable on dark bg).
- Mono (data/counts): **JetBrains Mono** — used only for vote numbers, justified by data role.

## Color (OKLCH tokens)
- `--color-paper`: oklch(0.12 0.02 260) — near-black blue.
- `--color-ink`: oklch(0.92 0.02 80) — bone white.
- `--color-accent`: oklch(0.85 0.25 140) — sickly green, used only on CTAs + buried badges.
- `--color-rule`: oklch(0.25 0.02 260) — subtle dividers.
- Accent appears at the key moment only (submit CTA, buried badge) — not on every icon/link.

## Sections (DOM order)
1. Hero — stat-led: "X claims that Y is dead" + CTA "Bury one".
2. Graveyard grid — tombstone cards for buried categories.
3. Most killed — leaderboard bars.
4. Submit strip — single inline CTA (links to /submit).
5. About/disclaimer — one paragraph + rules.
6. Footer — statement + minimal links.

## Enrichment
None (typography-led). Tombstone is a hand-built SVG (Tier B), not a Lottie. No fake
terminal window, no bento grid, no glassmorphism, no glow.

## Motion (≤3 primitives, transform/opacity only)
- Counter (vote counts tick up).
- Pulse-once (vote confirmation).
- Fade-in (tombstone rise on load, staggered).
- All collapsed to opacity crossfade under `prefers-reduced-motion`.

## Anti-slop guards (per antislop-ui)
- No blue-purple gradient, no glassmorphism stack, no glow-everywhere, no background grid,
  no emoji decoration, no fake terminal, no 4-col footer, no bento default, no invented
  metrics (vote counts are real), no endless pulses.

## Skipped in this plan
- Exact tombstone SVG geometry, responsive breakpoint specifics, and dark/light toggle
  (dark only for v1, justified by atmospheric tone).

## Risk you must know
- Cinzel + Atkinson Hyperlegible load via `next/font` adds ~40KB; acceptable but measurable.
  If LCP matters, swap body to a system font.