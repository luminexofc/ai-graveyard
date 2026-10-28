# AI Graveyard — Product Requirements Document

## 1. Vision
A community website where people submit social media posts claiming "X is dead because of AI."
Submissions are categorized by job sector. The community votes on how often they see a sector
being called dead. The most-claimed categories get "buried" as virtual tombstones.

Important: a category is buried because social media *claims* it is dead and the community
upvotes that claim — NOT because the sector is verified dead. The site ranks **claim volume
and community agreement**, never actual job-market death.

## 2. Problem
Social media is flooded with "X is dead" posts (graphics design, video editing, social media
management, copywriting, ...). There is no single place to collect, categorize, and rank these
claims. People want to see which sectors are *claimed* to be dead the most.

## 3. Goals
- Collect "X is dead" posts from social media in one place.
- Categorize them by job sector.
- Let the community vote on each claim.
- Surface the most-claimed categories and "bury" them as tombstones.
- Bury a category when its total vote sum reaches a configurable threshold (default 10).
- Be honest: this measures *claim volume*, not actual job death.

## 4. Non-Goals (v1)
- No user accounts / auth.
- No comments or discussion threads.
- No moderation dashboard and no report button (v1).
- No real verification of whether a sector is actually dead.

## 5. Target Users
- Curious tech/social-media observers.
- People who want to vent or share "X is dead" posts.
- Anyone amused by the graveyard aesthetic.

## 6. Core User Flows
1. **Submit a claim** — paste a link or upload a screenshot, pick a category, add title/snippet, pick platform. Anonymous, rate-limited by IP.
2. **Browse claims** — grid of submissions; filter by category/platform/time; sort newest/most-voted.
3. **Vote** — up/down per submission; anonymous via voter token (cookie).
4. **Explore categories** — leaderboard ranked by total claims + votes; "Buried" badge on top ones.
5. **Category page** — all submissions for one category + stats + tombstone if buried.

## 7. Key Features (v1)
- Landing / Graveyard (Home) with hero + tombstones + "most killed".
- Submit Claim form.
- Browse / Feed.
- Voting.
- Category Leaderboard.
- Category Page.
- About / How it works (premise, rules, disclaimer).

## 8. Deferred (v2+)
- Full graveyard visuals & bury ritual animation.
- Moderation dashboard.
- User accounts / profiles / reputation.
- Comments, search, notifications.

## 9. Success Metrics
- Number of submissions per week.
- Number of unique voter tokens.
- Number of categories buried.
- Return visitors.

## 10. Disclaimer
This site collects and ranks *claims made on social media*. It does not assert that any job
sector is actually dead. Vote counts are community signals, not rigorous data (anonymous
voting is easily stuffed). Treat the whole thing as a cultural artifact, not research.