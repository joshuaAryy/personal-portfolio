# Home Render Sync — 2026-10-04

## Result

The Home mobile navigation focus correction is verified on the clean feature Preview for commit `3f34cd0d5ed6ba532cac75f7a12cef1400108812`:

- Immutable Preview: https://fc9f3ef5.joshuaik2.pages.dev/
- Branch alias: https://feat-portfolio-integration.joshuaik2.pages.dev/
- Browser: Playwright 1.63.0 with Chrome 153.0.8010.53
- Viewports: 390×844 and 1920×1080

At 390×844, the navigation begins at `scrollLeft=0`. All four primary labels and their full 2px focus outlines with 3px offset fit inside the navigation viewport (`x=73–336`, `y=0.5–68.5`). Education is reachable by Tab and opens `/education` with HTTP 200. Help is reachable by Tab; horizontal scrolling to `scrollLeft=58` reveals its full hitbox and focus outline, and Enter opens the Help dialog.

Both viewport routes returned HTTP 200. All 32 images loaded at each viewport, document width equaled viewport width, and there were no console, page, request, or response errors. Desktop composition matches the preserved baseline: logo asset and 54×54 box at `(6, 27.5)`, main region `(0, 110, 1600×970)`, Confirm `(676, 917, 300×64)`, and Back `(640, 920, 58×58)`.

## Change

Commit `3f34cd0` adds 8px leading and trailing flex gutters to the Home navigation and centers its direct links and Help control at 56px high. The rule is scoped to the Home shell at widths up to 650px. This resolves the previously measured horizontal and vertical focus-outline clipping while preserving the Home desktop composition and active underline.

The complete suite passed (102 tests), the production build passed, and `git diff --check` passed before checkpointing. The clean Preview was deployed from a detached worktree at the commit above; the dirty portfolio worktree was not used for deployment.

## Evidence

Evidence files are in [`render-sync/2026-10-04-home-preview-92d3c26/`](render-sync/2026-10-04-home-preview-92d3c26/):

- `home-after-3f34cd0-evidence.json`
- `home-after-3f34cd0-390x844.png`
- `home-after-3f34cd0-1920x1080.png`
- `home-after-3f34cd0-projects-focused.png`
- `home-after-3f34cd0-education-focused.png`
- `home-after-3f34cd0-education-tab-focused.png`
- `home-after-3f34cd0-help-scrolled.png`
- `home-after-3f34cd0-help-open.png`

Earlier 901/900/899px breakpoint captures remain from the `b56d3a2` Preview. This patch applies only through 650px, so those breakpoint styles are unchanged.

## Remaining review

This validates the narrow focus correction and confirms desktop geometry; it does not close owner review of the Home/Figma comparison. The prior browser comparison observed a difference at the upper-left identity: Figma shows the circular gold/cyan J medallion, while the Preview shows a small flat gold J glyph. Preserve the current Home structure and do not alter the J identity here. Keep archive `159:2` as production fallback and leave the identity decision owner-gated.

## Current Preview rerender - source `f8762c0`

The current immutable Preview `https://bb5ce74d.joshuaik2.pages.dev/home` was rendered with Playwright 1.63.0 and Chrome 153.0.8010.53 at 1920x1080, 901x844, 900x844, 650x844, and 390x844. Every route returned HTTP 200, loaded 32/32 images, had no console/page/request/response errors, and kept document width equal to the viewport. At desktop, the main region is `(0,110,1600x970)`, Confirm is `(676,917,300x64)`, and Back is `(640,920,58x58)`.

The breakpoint sweep found a concrete fresh-entry issue at 900x844: Home initializes at `scrollY=82`, with the header and top navigation shifted above the viewport (`header y=-82`) and `main` at `y=0`. At 901x844, `scrollY=0` and the header is visible; at 650x844 and 390x844, `scrollY=0` as well. No document-width overflow occurs. At 390x844, the main nav is 263px wide with 321px of content. Tab reaches Help without moving that nav, leaving the 84px Help control clipped at the nav edge (`x=336`); Enter still opens the Help dialog. Escape closes it, restores focus to Help, and leaves the route and scroll unchanged.

Education selection worked by both click and keyboard: clicking Education set `aria-pressed="true"`, and Confirm navigated to `/education` (HTTP 200); from the mode group, ArrowRight selected Experience, End selected Education, and Enter opened `/education` (HTTP 200). Cold-entry Back stays on `/home`; entering Home from `/projects` through the Portfolio link and activating Back returns to `/projects` (HTTP 200).

The desktop render retains the broad Figma composition, four-mode order, selected-mode treatment, environment, subnav, and control placement. The previously recorded Figma-versus-React identity difference remains: Figma shows a circular gold/cyan J medallion and React shows a flat gold glyph. The captured Figma frame also has small square markers beside the selected-focus rows that are absent from React. Keep both visible differences in owner review; no identity or structure changes were made during QA. No narrow-Figma parity claim is made.

Current source-specific captures and JSON are in [`render-sync/2026-10-04-home-preview-f8762c0/`](render-sync/2026-10-04-home-preview-f8762c0/), including the five viewport screenshots, full narrow page, Education selected/confirmed, Help focused/open, cold Back, and in-app Back evidence. The machine-readable record is `home-preview-f8762c0-evidence.json`.
