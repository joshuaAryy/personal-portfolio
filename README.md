# Joshua Aryeetey · Portfolio client

This Vite and React client contains project and experience indexes, six long-form stories, Profile, Journey, Demos, Help, resume, and recovery routes. Design and implementation converge continuously: stable structure and interaction move into React, then the rendered site is compared with Figma and corrected. Route coverage, tests, build status, and hosting fallback do not establish visual completion. The current integration preview is `feat-portfolio-integration.joshuaik2.pages.dev`; it is deployment/asset verified, but client-side browser rendering and Figma parity remain open.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Direct route loads are handled by the Vite fallback.

```sh
npm run deploy
```

Deploys to the separate `joshuaik2` Cloudflare Pages staging project, using Wrangler `4.141.0`. The `public/_redirects` file enables direct loading of client routes on Pages.

## Checks

```sh
npm run lint
npm run typecheck
npm test -- --run
npm run build
```

## Routes

- `/` — opening sequence (target flow: Home / Explore, then visitor-selected destination)
- `/projects` and `/experience` — project and experience indexes
- `/projects/food-tracker`, `/projects/crest`, `/projects/fraymakers`, `/projects/choveigo` — project stories
- `/experience/living-in-silico`, `/experience/stush-patties` — experience stories
- `/profile`, `/profile/journey`, `/profile/demos` — Profile sections
- `/help` — Help entry (intended visible behavior: contextual overlay)
- `/resume` and `/resume/viewer` — resume flow and PDF viewer
- Known project or experience details without a dedicated route return to their section index. Unknown slugs and other unmatched paths show branded recovery.

## Active design status and documentation sync

**J status (2026-10-01):** Production continues to use archive `159:2`. Sonnet 5.5 v8 (`3325:191`) is the active owner-review candidate; compare board `3325:36` includes archive, Sonnet v7 (`3311:2`), and v8. Do not promote v8 before owner review. The old Codex reconstruction lineage, including Pass16-80, is rejected and closed; this does not close the Sonnet direction. Small contexts retain the 54px/responsive 32px header, 48px rail clone `3317:4`, and native 16px favicon. The segmented Hextech Opening is implemented with restrained opposing ring motion, Skip, and near-instant reduced motion; actual playback parity remains **NEEDS RENDER SYNC**.

Preserve Home's existing architecture. The icon candidate `3339:310` is synced into React; production Figma root `2252:3445` remains the fallback. An earlier local 1920x1080 capture found the shell and no-scroll behavior coherent, but predates the current icon sync and does not establish current parity; Home remains queued for a fresh supported-browser comparison. Preserve Profile `960:2`, its four equal Projects sectors, static lower signals, and separate hover/focus overlays; strip `3285:45` is review-only, and its existing base screenshot does not verify hover/focus behavior. Six complete long-form case-study review frames are indexed in [the node map](docs/FIGMA_NODE_MAP.md), paired with 1920x1080 scrolling production frames. Preserve owner-positive Stush Patties, Living in Silico, Fraymakers, and Food Tracker directions. Cho'Veigo remains product-first. The 2026-09-30 local rendered comparison corrected the Cho'Veigo demo layout to Figma `1817:425`; evidence remains in [the review note](docs/case-study-review/CHOVEIGO_RENDER_SYNC_2026-09-30.md). Preserve Crest's product-first workflow, "One transaction. Two sources. Human review." Public case-study copy remains curated from, and distinct from, factual source truth.

The [implementation status](docs/IMPLEMENTATION_STATUS.md) is the active control ledger. Supported browser render validation is currently unavailable, so browser-dependent surfaces remain **NEEDS RENDER SYNC**; non-browser project work continues. The current queue, Figma nodes, last render evidence, and staleness are recorded in [the render validation queue](docs/RENDER_VALIDATION_QUEUE.md). After a meaningful owner/Figma decision, update relevant docs, supersede stale direction, then commit and push to `feat/portfolio-integration`. Implementation may begin when structure, content hierarchy, and interaction intent are stable; final acceptance follows render -> compare -> correct -> owner review. Do not document transient pixel experiments as durable decisions.

See [design decisions](docs/DESIGN_DECISIONS.md), [Figma node map](docs/FIGMA_NODE_MAP.md), [implementation spec](docs/FIGMA_IMPLEMENTATION_SPEC.md), and [asset manifest](docs/ASSET_MANIFEST.md). Active Figma key `9zvk9iSRPKSsJ6llDJrQmA` was inspected on 2026-10-01. Source-body screenshot exports crop at 938px, so the six separate full-page review frames and Profile state strip provide the owner-visible review surfaces. No portfolio-wide site visual acceptance is claimed.

## Staging record

Current review preview: [feat-portfolio-integration.joshuaik2.pages.dev](https://feat-portfolio-integration.joshuaik2.pages.dev/) with immutable deployment URL [35a31a65.joshuaik2.pages.dev](https://35a31a65.joshuaik2.pages.dev/). It was built from pushed code commit `d95b74f` using `npm run deploy` in the clean detached worktree. TypeScript compilation and Vite build succeeded (77 modules transformed). The bundle includes the Home icon candidate, Food Tracker offline-evaluation context, the 700px archive-J image in Opening and Resume Found, Cho'Veigo's corrected two-column desktop layout, and the updated Fraymakers ownership copy. Page, JS, and CSS requests returned HTTP 200; the bundle contains “I built `thumbnail.js`.” The prior Cho'Veigo before/after comparison remains in [the case-study review note](docs/case-study-review/CHOVEIGO_RENDER_SYNC_2026-09-30.md). A prior Opening capture shows visible source softness, and the Figma/repository audit found no higher-resolution exact archive source. No connected browser was available for a fresh interactive capture this turn. These checks and scoped screenshots do not constitute whole-site or owner acceptance. The clean deployment excludes untracked review experiments; the primary production project was not targeted.
