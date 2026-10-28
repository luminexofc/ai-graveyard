# AI Graveyard — Tech Stack

## Frontend
- Next.js 16 (App Router) + React 19 + TypeScript.
- Tailwind CSS v4.
- anime.js v4 (motion). (three.js is v2 only.)
- lucide-react (icons).

## Backend / Data
- Supabase: Postgres + Storage + RLS.
- Anonymous auth: voter token (UUID in httpOnly cookie).
- Rate limiting: IP-based via Supabase Edge Function or middleware.

## Hosting
- Vercel (Next.js).
- Supabase free tier for DB/storage.

## Tooling
- ESLint + TypeScript strict.
- Vitest for unit tests; Playwright for E2E (v2).

## Conventions
- Server Components by default; Client Components only for interactivity.
- Data fetching in Server Components / Server Actions.
- Zod for validation at boundaries.