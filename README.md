# Joshua Aryeetey · Portfolio client

This Vite and React client contains project and experience indexes, six long-form stories, Profile, Journey, Demos, Help, resume, and recovery routes. Design and implementation converge continuously: stable structure and interaction move into React, then the rendered site is compared with Figma and corrected. Route coverage, tests, build status, and hosting fallback do not establish visual completion. CLI Playwright with installed Chrome is available for real rendered validation; see the active ledger and render queue for the latest Preview and remaining comparisons. The primary production project was not targeted.

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
- `/profile`, `/profile/journey`, `/profile/demos`, `/education/projects` — Profile sections
- `/help` — Help entry (intended visible behavior: contextual overlay)
- `/resume` and `/resume/viewer` — resume flow and PDF viewer
- Known project or experience details without a dedicated route return to their section index. Unknown slugs and other unmatched paths show branded recovery.

## Active design status and documentation sync

**J status (2026-10-03):** The J remains unfinished. Production continues to use archive `159:2`; Sonnet v8 (`3325:191`) is the strongest existing editable baseline. Sol 6.1 Candidate 01 (`3482:3`) appears beside the archive and v8 on review board `3482:2`. It improves counter/material continuity but still reads as a J inside a badge, so it is a directional owner-review candidate, not a production replacement. No candidate is approved. The old Codex reconstruction lineage, including Pass16-80, is rejected as a design branch only; this does not close the Sonnet/Sol directions. Small contexts retain separate 54px/responsive 32px header, 48px rail clone `3317:4`, and native 16px favicon marks. Opening keeps the segmented Hextech direction, restrained opposing ring motion, Skip, and near-instant reduced motion. Commit `ca85398` aligns React's ring start angles with Figma; playback parity remains **NEEDS RENDER SYNC**.

Preserve Home's existing architecture. Four selected glyphs from review frame `3339:310` are merged into active Figma root `2252:3445`, and React uses the matching SVG artwork. The current Figma-only capture is `docs/case-study-review/home-pass-03/home-active-selected-glyphs-2252-3445-20261002.png`; it confirms the design state only. On 2026-10-02, the shared Shell source label was corrected to the canonical “Cho’Veigo” spelling; React already used it. The earlier local 1920x1080 site capture predates the active Figma merge and Education shell alignment, so it does not establish current parity; Home row 3 has a Preview render pass; owner review and the known Figma medallion versus flat React glyph difference remain tracked in the queue. Preserve Profile `960:2`, its four equal Projects sectors, static lower signals, and separate hover/focus overlays; strip `3285:45` is review-only, and its existing base screenshot does not verify hover/focus behavior. Six complete long-form case-study review frames are indexed in [the node map](docs/FIGMA_NODE_MAP.md), paired with 1920x1080 scrolling production frames. Preserve owner-positive Stush Patties, Living in Silico, Fraymakers, and Food Tracker directions. Cho'Veigo remains product-first. The 2026-09-30 local rendered comparison corrected the Cho'Veigo demo layout to Figma `1817:425`; evidence remains in [the review note](docs/case-study-review/CHOVEIGO_RENDER_SYNC_2026-09-30.md). Preserve Crest's product-first workflow, "One transaction. Two sources. Human review." Public case-study copy remains curated from, and distinct from, factual source truth.

The [implementation status](docs/IMPLEMENTATION_STATUS.md) is the active control ledger. CLI Playwright with installed Chrome produces real rendered evidence; browser-dependent surfaces are not considered visually complete until rendered comparison and correction. The current queue records evidence scope and remaining checks. After a meaningful owner/Figma decision, update relevant docs, supersede stale direction, then commit and push to `feat/portfolio-integration`. Implementation may begin when structure, content hierarchy, and interaction intent are stable; final acceptance follows render -> compare -> correct -> owner review. Do not document transient pixel experiments as durable decisions.

See [design decisions](docs/DESIGN_DECISIONS.md), [Figma node map](docs/FIGMA_NODE_MAP.md), [implementation spec](docs/FIGMA_IMPLEMENTATION_SPEC.md), and [asset manifest](docs/ASSET_MANIFEST.md). Active Figma key `9zvk9iSRPKSsJ6llDJrQmA` was inspected on 2026-10-02. Source-body screenshot exports crop at 938px, so the six separate full-page review frames and Profile state strip provide the owner-visible review surfaces. No portfolio-wide site visual acceptance is claimed.

## Staging record

Latest verified staging Preview: source commit `e4e1050e9599f00bee99eb42abf4c5a514b79b97` (`e4e1050`), immutable URL https://38b1abfa.joshuaik2.pages.dev/ (branch alias https://feat-portfolio-integration.joshuaik2.pages.dev/). Help/recovery row 13 passed post-fix Chrome validation; see [the render report](docs/case-study-review/HELP_RECOVERY_RENDER_SYNC_2026-10-04.md). Production was not targeted.
