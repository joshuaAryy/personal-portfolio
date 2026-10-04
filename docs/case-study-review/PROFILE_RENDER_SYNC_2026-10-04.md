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

## Current feature Preview - source `477d812`

Playwright 1.63.0 with Chrome 153.0.8010.53 checked `https://ae260dc8.joshuaik2.pages.dev/profile` at 1920×1080, 901×844, 900×844, and 390×844. Each route returned HTTP 200, loaded 51/51 images, and had no console, page, failed-request, or bad-response errors.

The base signal values are 4 Projects, 2 Experience, 1 Hackathon, and 2028 Academics at all widths. On desktop, hover and keyboard Tab focus on each named signal preview its matching panel heading while `/profile`, Overview, and the four values remain unchanged. The panel remains `(444,434,1090×330)` in each state. No live screen-reader test was run.

Two responsive layout issues remain open. At 901×844, `.profile-project-panel` extends from x=326 to x=958.20, while `.main--profile` ends at x=681 and has `overflow:auto`; the panel is visibly clipped at the main/rail boundary in `profile-477d812-901x844-viewport.png`. At 900×844, document width is 908px for a 900px viewport. The overflowing child is `img.profile-project-panel__enclosure` at x=-7.91 to x=907.92; `.profile-content` and its panel ancestors use visible horizontal overflow. At 390 and 900, direct and in-app entry both focus-scroll the main: `scrollY=70` at 390 and `82` at 900, placing the header above the viewport; at 901 and 1920, scrollY is 0. These are rendered findings, not fixes.

The shared mobile contact row is displayed at 390 and 900 and follows the page content. After real wheel scrolling to the page end, all three 44px links are visible and keyboard reachable with visible focus: GitHub (`https://github.com/joshuaAryy`, “GitHub (opens in a new tab)”), LinkedIn (`https://ca.linkedin.com/in/joshua-ary`, “LinkedIn (opens in a new tab)”), and email (`mailto:joshuaaryy@gmail.com`, “Email Joshua”). At 901 the row is hidden and the rail footer is present at x=682/y=782/219×62; at 1920 the desktop rail footer remains x=1601/y=1018/319×62. The 900px page-level overflow is separately documented above; the contact links themselves do not overlap or clip. No narrow-Figma parity claim is made.

Current source evidence is in [`render-sync/2026-10-04-profile-preview-477d812/`](render-sync/2026-10-04-profile-preview-477d812/). `profile-preview-477d812-evidence.json` contains the viewport/image/error data, four signal hover and focus results, contact destinations and keyboard focus, exact overflow/clipping bounds, and direct-versus-in-app scroll measurements. No source was changed.
