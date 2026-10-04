# Profile Render Sync — 2026-10-04

## Result

The Profile render now matches the current Figma reference for its center atmosphere and Experience marks, with no material mismatch remaining in the checked states.

Final Preview source: `9fd23f9d45314f2319cffa97722cd7925ef2be52` at https://a7047ffc.joshuaik2.pages.dev/. Chrome 153.0.8010.53 via Playwright 1.63.0 checked `/profile` at 1920×1080 and 390×844. Both returned HTTP 200, all 51/51 images loaded, there were no console/page/request/HTTP errors, and document width equaled the viewport.

At desktop, the center field shows the smoky purple/gray background from Figma `960:2`. Explicitly focusing the Experience signal displays the EXPERIENCE panel; Living in Silico and Stush Patties use 92×92px circular marks, matching review strip `3285:45`. The panel remains at `(444, 434, 1090×330)`, unchanged from source `3f34cd0`; its body-relative placement aligns with Figma after accounting for the different top-shell height.

At 390px, the four Projects cards fit within the 500px panel. The route has no horizontal overflow. Earlier interaction checks on `3f34cd0` confirmed all four static signal groups update their preview on hover/focus, keep the preview while moving into its panel, reset to Projects on pointer exit, and leave `/profile`, Overview, and the 4/2/1/2028 counts unchanged. Each group has an accessible name; the degree mark is exposed as “Computer Engineering.” No live screen-reader announcement test was run.

## Correction

Commit `9fd23f9` replaces the later global radial gradient that overrode the already-existing Profile smoky background with `/media/profile/the-void-background.jpg`. It also clips the existing Living in Silico and Stush Patties logo assets to circles. No new assets were added; the Profile panel geometry, card layout, copy, and interactions are unchanged.

The focused regression test, full suite (103 tests), build, and `git diff --check` passed. A clean detached worktree was used for Preview deployment.

## Evidence

Final Preview and Figma evidence is in [`render-sync/2026-10-04-profile-preview-9fd23f9/`](render-sync/2026-10-04-profile-preview-9fd23f9/):

- `profile-after-9fd23f9-1920x1080.png`
- `profile-after-9fd23f9-1920x1080-experience-hover.png`
- `profile-after-9fd23f9-390x844.png`
- `profile-after-9fd23f9-evidence.json`
- `profile-after-9fd23f9-final-measurements.json`
- `profile-after-9fd23f9-focus-evidence.json`
- `figma-profile-base-960-2.png`
- `figma-profile-review-strip-3285-45.png`

The pre-correction source `3f34cd0` captures and browser measurements are preserved in [`render-sync/2026-10-04-profile-preview-3f34cd0/`](render-sync/2026-10-04-profile-preview-3f34cd0/). Individual Figma overlay nodes `998:46/63/79` export as 1×1 images, so state comparisons use the live Profile base and review strip rather than those unusable individual exports.

Keep the liked Profile base, four equal Projects sectors, static counts, and non-activating hover/focus previews. Owner review remains distinct from this browser comparison.
