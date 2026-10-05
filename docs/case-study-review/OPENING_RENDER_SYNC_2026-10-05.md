# Opening Render Sync — 2026-10-05

**Status: PASS A OPENING SOURCE SYNC RENDERED / OWNER DIRECTION IMPLEMENTED / NO MATERIAL SAMPLED MISMATCH.** This local validation covers the Opening-only working-tree update on base commit `39bfd6ba21c1a9878b67dabd63d3d65da41f5efc`; these changes were not yet committed or deployed when rendered. The latest feature Preview remains `c96f4db`; production was not targeted.

## Direction and source

The owner reopened the Opening design around the supplied League source video. The portfolio keeps its short, identity-first sequence: a large archive J appears, fades and clears, then a smaller J resolves inside thin concentric rings with sparse cardinal ticks, a clockwise loading arc, `LOADING`, and a restrained progress line before the Home client opens. The previous segmented Hextech construction is superseded. The archive mark `159:2` remains the production identity; this Opening change does not select or integrate a new J candidate.

Current Figma reference: active frame `2025:2`, motion notes `2025:84`, `2025:88`, `2025:125`, simplified ring/loader composition `3580:2` and `3581:2`, and ticks `3617:14`, `3617:21`, `3617:28`, `3617:35`. Earlier segmented mechanism nodes `2443:38/71/92/110` describe the superseded design.

## Browser verification

Runtime QA used Playwright 1.63.0 with installed Chrome 153 against the local working tree at `1440×900` and `390×844`.

- Normal handoff reached `/home` after 1,934ms desktop and 1,962ms narrow, measured from the first observed Opening.
- Sampled phases follow the Figma motion: large J at start; mark clears around 700ms; the smaller J, rings, four ticks, label, and progress appear around 900ms. The gold arc rotates clockwise and the fill advances. No material mismatch was observed at sampled phases.
- Both viewports remained within the viewport width. The archive image loaded; no console, page, request, HTTP, or image errors were observed.
- Tab focuses the visible Skip control with a 2px outline; Enter routes to `/home`, where focus settles on `#main`.
- With reduced motion enabled, handoff took 92ms from the first observed Opening; only the 120ms transition remained active, then focus settled on `#main`.

The implementation worker also reported a passing full suite (24 files, 149 tests) and production build for this source update. This report records local render evidence, not a deployed Preview, full-site acceptance, or a live screen-reader test.

## Captures and measurements

Curated Chrome captures, timing measurements, and frame-state measurements are in [`render-sync/2026-10-05-opening-local/`](render-sync/2026-10-05-opening-local/). The screenshot-heavy preliminary timing loop was excluded because capture overhead perturbed its duration; use `timing-results.json` for handoff measurements and `frame-samples.json` for sampled animation state.
