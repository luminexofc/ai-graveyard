# AI Graveyard — Design

## Layout
- Mobile-first, single column on small screens; 2–3 col grid on md+.
- Max content width 1200px, centered.
- Sticky top nav: logo + Submit + Browse + Leaderboard + About.

## Pages
1. Home: hero → graveyard grid → "most killed" → CTAs.
2. Submit: single form, large inputs, category dropdown, platform pills.
3. Browse: filter bar (category/platform/time/sort) + card grid.
4. Vote: inline on cards (no separate page).
5. Leaderboard: ranked list with bars.
6. Category: header stats + submission grid.
7. About: text + rules + disclaimer.

## Design Rules
- One primary action per screen (Submit).
- Tombstones are the visual anchor — never clutter them.
- Empty states: "No claims yet. Be the first to bury one."
- Error states: inline, never modal.
- Loading: skeleton cards, not spinners.