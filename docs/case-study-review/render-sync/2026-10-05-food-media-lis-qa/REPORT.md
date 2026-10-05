# Food Phase 24 Media and Living in Silico Output QA

**Date:** 2026-10-05
**Runtime:** Playwright 1.63.0 with installed Chrome 153
**Routes:** `/projects/food-tracker`, `/experience/living-in-silico`
**Viewports:** 1920×1080 and 390×844

## Food Tracker

Both viewports returned HTTP 200. All five Phase 24 captures loaded from local portfolio paths at natural size 368×800, in page order: two Logging, two Insights, then the Search/retrieval capture. Their captions match the displayed states. No older simulator, phase-6.5, or streaks-and-reporting image was rendered. Captions are 10px CSS; they remain visible and sharp, wrapping on narrow screens without clipping.

The product-flow and system-map figures remain native web content with no embedded image or SVG; desktop widths are 884px and 1432px, and both stack within the 350px narrow content width. The system map remains naturally scrollable at narrow size. The 390px header controls and avatar do not overlap. LOGGING, INSIGHTS, and ARCHITECTURE chapter clicks set matching `aria-current="location"`; their headings clear the sticky chapter bar at both viewports.

## Living in Silico

Both viewports returned HTTP 200 and stayed within document width. The project output card visibly associates `OWNER-REPORTED OUTPUT · DEEPMOL` with `500 generated SMILES samples`. The output card contains no REINVENT4 attribution. The qualifier and sample label remain visible in the narrow layout.

## Runtime

No console errors, page exceptions, failed requests, HTTP errors, or image-load failures were observed. Document width matched viewport width on all four route/viewport combinations.

## Evidence

All captures and exact DOM/runtime measurements are in this folder. `qa-results.json` contains image paths, natural dimensions, captions, native diagram content, anchor state, widths, and Living output-card text.

- Food top and native diagrams: `food-desktop-1920-top.png`, `food-narrow-390-top.png`, `food-desktop-1920-native-product-flow.png`, `food-desktop-1920-native-system-map.png`, `food-narrow-390-native-product-flow.png`, `food-narrow-390-native-system-map.png`
- Food screenshot/caption states: `food-desktop-1920-capture-1.png` through `food-desktop-1920-capture-5.png`; `food-narrow-390-capture-1.png` through `food-narrow-390-capture-5.png`
- Food anchors: `food-desktop-1920-anchor-logging.png`, `food-desktop-1920-anchor-insights.png`, `food-desktop-1920-anchor-architecture.png`, and matching `food-narrow-390-anchor-*` captures
- Living: `living-desktop-1920-top.png`, `living-desktop-1920-output.png`, `living-narrow-390-top.png`, `living-narrow-390-output.png`
- Measurements: `qa-results.json`

No source files were changed. This was browser automation and visual inspection, not a live screen-reader test.
