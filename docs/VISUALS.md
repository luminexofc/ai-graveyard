# AI Graveyard — Visuals

## Theme
- Dark graveyard. Base bg: #0a0a0f. Accent: sickly green #39ff14 / bone white #f5f5dc.
- Fonts: "Creepster" or "Nosifer" for headings; Inter/system for body.
- Fog overlay (CSS radial gradient + blur) on hero.

## Components
- Tombstone card: rounded top, engraved category name, claim count, "Buried" badge.
- Claim card: screenshot thumbnail, title, category tag, vote buttons, source link.
- Leaderboard bar: category name + count + animated fill.

## Assets
- Tombstone SVG (inline, themeable via CSS vars).
- Fog texture (CSS only, no image).
- Optional 3D tombstone (three.js, v2).

## Libraries
- anime.js — UI motion.
- three.js / @react-three/fiber — 3D graveyard scene (v2).
- lucide-react — icons.

## Accessibility
- All motion gated by prefers-reduced-motion.
- Color contrast ≥ 4.5:1 on text.
- Focus rings visible on dark bg.