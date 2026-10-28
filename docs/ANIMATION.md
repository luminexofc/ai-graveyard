# AI Graveyard — Animation Plan

## Stack
- anime.js v4 for UI motion (staggered reveals, vote pulses, tombstone rise).
- three.js (via @react-three/fiber) for the 3D graveyard scene (optional v2).

## Motion Principles
- Dark, slow, eerie. Easing: easeOutExpo for entrances, easeInQuad for exits.
- Durations: 300–600ms for UI; 1.2s+ for graveyard set pieces.
- Respect prefers-reduced-motion: disable all non-essential motion.

## Key Animations
1. Page load: tombstones fade+rise from ground (staggered, anime.js).
2. Submit success: card slides in with a "burial" thud (scale bounce).
3. Vote: number ticks up with a pulse; downvote shakes.
4. Category buried: tombstone materializes with fog burst (v2).
5. Leaderboard: bars grow on scroll (IntersectionObserver + anime.js).
6. Hover: subtle parallax tilt on tombstone cards.

## Performance
- Lazy-load three.js only on the graveyard route.
- Use CSS transforms only (no layout thrash).
- Debounce scroll-driven effects.