# AI Graveyard — Development Phases

## Overview
Each phase is a shippable milestone. Do not start Phase N+1 until Phase N builds and
runs locally without errors. Phases are ordered by dependency, not by importance.

---

## Phase 0 — Scaffold & Tooling
**Goal:** Empty but runnable Next.js app with all tooling wired.

- Run `create-next-app` (TypeScript, Tailwind, ESLint, App Router, src dir).
- Install deps: `anime.js`, `lucide-react`, `zod`, `@supabase/supabase-js`.
- Add `docs/` (already present).
- Configure ESLint + TS strict.
- Add `.env.local.example` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Verify: `npm run dev` serves the default page; `npm run build` succeeds.

**Exit criteria:** `npm run dev` and `npm run build` both pass.

---

## Phase 1 — Data Layer (Supabase)
**Goal:** Schema + seed data + typed client.

- Create Supabase project; run migration SQL:
  - `categories(id, name, slug, is_buried, buried_at, created_at)`
  - `submissions(id, category_id, title, source_url, platform, image_url, vote_score, status, created_at)`
  - `votes(id, submission_id, voter_token, value, created_at)` with unique(submission_id, voter_token)
- Seed ~12 categories (Graphics Design, Video Editing, Social Media Mgmt, Copywriting, ...).
- Create storage bucket `claim-images` with public read + authenticated upload RLS.
- Generate TS types from schema (`supabase gen types`).
- Create `lib/supabase.ts` client (server + browser).
- Add RLS policies: public read; insert submissions/votes allowed; no deletes.

**Exit criteria:** Can query categories and insert a submission from a Server Action.

---

## Phase 2 — Submit + Browse + Vote (Core Loop)
**Goal:** The product works end-to-end without visuals.

- `/submit` page: form (title, sourceUrl, platform pills, category dropdown, optional image upload). Zod validation. Server Action inserts submission.
- `/browse` page: grid of claim cards; filter bar (category, platform, time, sort). Server Component fetches with filters via searchParams.
- Vote buttons on each card: Server Action upserts vote by voter token; revalidates path.
- Voter token: UUID generated on first visit, stored in httpOnly cookie.
- IP-based rate limit on submit (middleware or Edge Function).

**Exit criteria:** A user can submit, browse, filter, and vote; votes persist.

---

## Phase 3 — Leaderboard + Category Pages
**Goal:** Discovery and ranking surfaces.

- `/leaderboard` page: categories ranked by (submission count + vote sum); "Buried" badge when threshold met (e.g. 50 votes).
- `/category/[slug]` page: header stats (claims, votes, trend) + submission grid + tombstone if buried.
- "Bury" logic: when a category's total vote sum reaches `BURY_THRESHOLD` (default 10, env
  var), set `is_buried=true`, `buried_at=now()` (Server Action / DB trigger). Based on
  community votes on claim frequency, not verified death.
- Home page: hero + graveyard grid (tombstones for buried) + "most killed this week" + CTAs.

**Exit criteria:** Leaderboard and category pages render; bury triggers correctly.

---

## Phase 4 — Visuals & Animation
**Goal:** It looks and feels like a graveyard.

- Apply dark theme (bg #0a0a0f, accent #39ff14/#f5f5dc), fonts, fog overlay.
- Tombstone SVG component (themeable).
- anime.js: page-load tombstone rise (staggered), submit success thud, vote pulse, leaderboard bar grow on scroll.
- prefers-reduced-motion gating.
- Hover parallax tilt on tombstone cards.

**Exit criteria:** Visual polish applied; animations run; reduced-motion respected.

---

## Phase 5 — About + Polish + Deploy
**Goal:** Ship-ready.

- `/about` page: premise, rules, disclaimer.
- Empty/error/loading states everywhere (skeletons, inline errors).
- SEO: metadata, OG tags.
- Deploy to Vercel; point Supabase env vars.
- Smoke test on production URL.

**Exit criteria:** Live URL works; core flows pass on production.

---

## Phase 6 — v2 (Deferred)
- Full bury ritual animation (fog burst, tombstone materialize).
- three.js 3D graveyard scene (lazy-loaded).
- Moderation dashboard + report queue.
- User accounts / profiles / reputation.
- Comments, search, notifications.

---

## Phase Rules
- One phase per PR/commit batch.
- Run `npm run build` + `npm run lint` before moving on.
- If a phase reveals a schema change, update the migration AND the TS types in the same phase.