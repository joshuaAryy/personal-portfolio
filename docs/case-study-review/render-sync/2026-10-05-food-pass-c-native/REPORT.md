# Food Tracker Pass C Native-Diagram Runtime QA

This records the initial render after the native diagrams landed. The two
narrow-screen findings below were subsequently corrected and validated; see
[the follow-up report](../2026-10-05-food-header-nav-followup/REPORT.md) for the
current result.


**Date:** 2026-10-05
**Route:** `/projects/food-tracker`
**Runtime:** Playwright 1.63.0 with installed Chrome 153
**Viewports:** desktop 1920×1080; narrow 390×844

## Result

The route loaded with HTTP 200 at both sizes. No console, request, HTTP, or broken-image errors were observed. All 16 images loaded at each viewport. The document stayed within viewport width at both sizes.

The product-flow and system/data diagrams render as native HTML figures and stage lists rather than embedded screenshots. The product flow presents all four steps in a desktop row and a readable narrow stack. The system map presents retrieval/logging flow, the saved-log status states, and five data-foundation steps. Desktop renders are readable; narrow screenshots show the flow and foundation as a readable vertical stack. The chapter rail is horizontally scrollable on narrow screens, and each of its nine labels can be brought fully into view.

## Concrete gaps

- **Narrow shared header:** at 390px, EDUCATION occupies x=248.1–302.1 while HELP occupies x=288–324, an overlap of about 14px. HELP and the avatar do not overlap (HELP ends at x=324; avatar starts at x=328). HELP is keyboard-focusable, and Enter opens the Help dialog.
- **Narrow chapter active state:** LOGGING, INSIGHTS, and ARCHITECTURE clicks update the URL hash and place each heading below the sticky chapter bar, but after the scroll settles the active rail label remains the preceding chapter (PRODUCT, LOGGING, and IN PRODUCT respectively). The measured heading top is about 100px versus the rail bottom at 77px, so heading clearance passes. This evidence records the behavior; it does not establish its cause.

Desktop chapter navigation updated the hash and active label as expected. Anchor targets were clear below the sticky rail at desktop and narrow widths.

## Evidence

All files are in this folder. The JSON captures include viewport measurements, image/error checks, semantic diagram inspection, chapter state, and HELP keyboard behavior.

- Desktop: `desktop-top.png`, `desktop-product-diagram.png`, `desktop-system-diagram.png`, `desktop-anchor-logging.png`, `desktop-anchor-insights.png`, `desktop-anchor-system.png`
- Narrow: `narrow-top.png`, `narrow-product-diagram.png`, `narrow-system-top-slice.png`, `narrow-system-lower-slice.png`, `narrow-anchor-logging.png`, `narrow-anchor-insights.png`, `narrow-anchor-system.png`
- Measurements: `pass-c-native-results.json`, `narrow-deep-checks.json`, `diagram-elements-help-keyboard.json`

No source files were changed. This was browser automation and visual inspection; it was not a live screen-reader test.
