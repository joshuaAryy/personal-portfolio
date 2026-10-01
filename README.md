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

The J decision is closed: archive `159:2` is selected for Opening and Resume Found. The single archive-faithful reconstruction and one correction were compared with the archive/current/upper-serif studies at large and 54/32/16px; candidate `3289:31` remained weaker in integrated silhouette, energy, and material, so the archive ships and J design will not reopen. Small contexts use optical glyphs: 54px and responsive 32px header, exact 48px rail clone `3317:4`, and native 16px favicon. The authentic large source is 220×220; the 700px Figma export is an upscale used for display density. Local rendering confirms some softness against crisp UI remains a site-validation item, not a design loop. The segmented Hextech Opening is implemented with restrained opposing ring motion, a roughly two-second sequence, Skip, and near-instant reduced motion; motion timing and visual parity remain open for rendered review.

Preserve Home's existing architecture. The stronger final-icon candidate in Figma frame `3339:310` is synced into React as a review candidate; production Figma root `2252:3445` remains the fallback. Local 1920×1080 rendering found its environment, shell, icons, and no-scroll behavior coherent; owner visual review remains open. Preserve Profile `960:2`, its four equal Projects sectors, static lower signals, and separate hover/focus overlays; the four-state strip `3285:45` is review-only and locally rendered Profile retains the equal sectors. Six complete long-form case-study review frames are indexed in [the node map](docs/FIGMA_NODE_MAP.md), paired with 1920×1080 scrolling production frames. Keep Food Tracker's owner-positive product/retrieval opening and use authentic product media for its next major visual uplift. Preserve the strong Stush Patties, Living in Silico, and Fraymakers directions. Cho'Veigo remains product-first. Local Chrome comparison exposed and corrected the React demo layout: it now follows Figma `1817:425` with the uncropped 820×461.25 media beside the intro, and the matching-path section follows at the reviewed scale. The before/after captures and render result are recorded in [the case-study review note](docs/case-study-review/CHOVEIGO_RENDER_SYNC_2026-09-30.md); owner review remains open. Preserve Crest's product-first workflow, “One transaction. Two sources. Human review.” Public case-study copy is curated from, and distinct from, the factual source record.

The [implementation status](docs/IMPLEMENTATION_STATUS.md) is the active control ledger. After any meaningful owner/Figma decision, update it and the relevant decision/node/spec/source doc, supersede stale direction, then commit and push a documentation-only change to `feat/portfolio-integration` without waiting for website implementation. Implementation may begin when structure, content hierarchy, and interaction intent are stable; final acceptance follows render → compare → correct → owner review. Do not document transient pixel experiments as durable decisions.

See [design decisions](docs/DESIGN_DECISIONS.md), [Figma node map](docs/FIGMA_NODE_MAP.md), [implementation spec](docs/FIGMA_IMPLEMENTATION_SPEC.md), and [asset manifest](docs/ASSET_MANIFEST.md). Active Figma key `9zvk9iSRPKSsJ6llDJrQmA` was inspected on 2026-09-30. Source-body screenshot exports crop at 938px, so the six separate full-page review frames and Profile state strip provide the owner-visible review surfaces. No portfolio-wide site visual acceptance is claimed.

## Staging record

Current review preview: [feat-portfolio-integration.joshuaik2.pages.dev](https://feat-portfolio-integration.joshuaik2.pages.dev/) with immutable deployment URL [b4b50104.joshuaik2.pages.dev](https://b4b50104.joshuaik2.pages.dev/). It was built from pushed code commit `5ee2d4c` using `npm run deploy` in a clean detached worktree. TypeScript compilation and Vite build succeeded (77 modules transformed). The deployed bundle includes the Home icon candidate, Food Tracker offline-evaluation context, and direct use of the 700px archive-J image in Opening and Resume Found; the image URL returns 200 as PNG (181,895 bytes), and the 220px JPEG is no longer referenced by that bundle. The clean public tree excludes untracked review assets. Deployment verifies build and asset delivery, not visual parity. The connected in-app Browser was unavailable; later local Chrome comparisons covered Home, Profile, Resume Found, and the six story pages. Those captures do not constitute whole-site or owner acceptance. This deployment supersedes the preceding preview [ee0a762f.joshuaik2.pages.dev](https://ee0a762f.joshuaik2.pages.dev/) and prior deployments [befaec09.joshuaik2.pages.dev](https://befaec09.joshuaik2.pages.dev/) and [22a3bc4c.joshuaik2.pages.dev](https://22a3bc4c.joshuaik2.pages.dev/). The primary production project was not targeted.
