# Profile signal overlay anchor follow-up — 2026-10-12

**Status:** implemented and visually verified on the feature Preview; owner review remains open.

## Owner direction

Keep the Profile shell and scenic area full height. Keep the Activity rail at the viewport bottom. Do not compact Profile or move the footer upward. This clarification supersedes the earlier accidental “Compact Profile + Activity” selection.

The separate overlay complaint was that the Projects detail panel appeared detached from its signal. The owner-provided problem screenshot is `C:\Users\samue\Downloads\portfolio-owner-references\portfolio-new-owner-problem-images\Profile_Projects_Overlay_Far_Above_Icon.png`.

## Correction

The desktop panel had been positioned relative to the signal cell's top. The visible emblem, label, and value sit lower inside that cell, leaving a larger visual gap. The shared positioner now measures those visible parts and anchors the panel to the group. Narrow placement continues below the visible content. No Profile scene sizing, signal placement, shell, or Activity rail geometry changed.

## Before and after measurements

| Viewport | Before panel-to-visible-content gap | After gap | Panel placement |
|---|---:|---:|---|
| 1536×1360 | 38.6 px | 12 px | Above the signal group |
| 1440×900 | 35.8 px | 12 px | Above the signal group |
| 390×844 | Existing narrow placement | 12 px | Below the visible signal group |

At 1536×1360 the Activity rail still ends at y=1360, the document remains 1536 px wide and 1360 px tall, and the scenic area is preserved. At 1440×900 the panel remains below the Profile navigation and inside the main content area. At 390×844 the page remains naturally scrollable with no horizontal overflow.

## Browser evidence

The feature Preview is [https://8eaf3097.joshuaik2.pages.dev/](https://8eaf3097.joshuaik2.pages.dev/), deployed from application source `d49f264bf2faa0737836b29008db8e296d027ff6` (deployment `8eaf3097-0b06-469e-8b9e-f05572767721`, Preview environment, `feat/portfolio-integration`). The owner-visible result was captured at 1536×1360 for all four overlay states, plus Projects at 1440×900 and 390×844. The desktop captures show the open panel, its attachment point, and its triggering signal together.

- Current Preview before captures and matching local after captures: `profile-owner-confirmation-20261012/`.
- Exact deployed captures and Playwright metrics: `deployed-profile-anchor-8eaf3097/`.
- Owner reference image remains in the Downloads folder above and was not copied into the repository.

Chrome confirmed the panel remains open when the pointer moves from the signal into a panel link. Focusing a signal and pressing Shift+Tab reaches a panel link while the panel stays open. `/home` and `/profile` return HTTP 200. No loaded images are broken; there are no browser errors, failed requests, bad responses, or horizontal overflow. Deployed JS and CSS SHA-256 values match the local build:

- JS: `66fd32ce4ae10168bb6afb7b02c25c0301fde2b98d912841f80a473d7834370d`
- CSS: `e3560e732a4f9afcbc68e9e6c1d72091341950e3f36f5b3e238db71d843eed52`

## Verification

- Focused Profile tests: 9 passed.
- Full suite: 321 tests across 31 files passed.
- `npm run build`: passed; the existing Vite chunk-size advisory remains.
- `git diff --check`: passed.
- Production was not targeted.

The immutable Preview is a review checkpoint, not portfolio completion. Food Tracker's authentic demo video and live screen-reader interaction remain separate open items.
