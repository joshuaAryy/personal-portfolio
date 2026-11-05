# Food Tracker bounded visual corrections

**Date:** 2026-10-11
**Route:** `/projects/food-tracker`
**Scope:** Insights evidence hierarchy and logging-path scan cues only.

## Changes

- The Insights gallery now gives the authentic Macro Composition app capture a clear lead position beside a grouped collection of three genuine Figma design studies: calorie trend, fiber trend, and daily completeness. Each study remains visibly identified as a design study with illustrative data; the app capture remains labeled sample data and not a user outcome.
- The three logging families have distinct teal, violet, and gold scan cues. Describe + Review fills its row. All three families still feed the same reviewed save path.
- The gallery’s public context is concise. Source phase, QA, fixture, and capture provenance remains in the internal source-truth docs.

No image was fabricated, retouched, or added. The same four existing assets are used:

| Displayed item | Evidence type | Existing asset |
|---|---|---|
| Macro composition | Authentic app-interface capture with sample data | `public/media/case-studies/food-tracker/phase-24/trend-detail-macro-composition-populated.png` |
| Calorie trend | Figma design study with illustrative data | `public/media/case-studies/food-tracker/insights/calorie-trend-design-study.png` |
| Fiber trend | Figma design study with illustrative data | `public/media/case-studies/food-tracker/insights/fiber-trend-design-study.png` |
| Daily completeness | Figma design study with illustrative data | `public/media/case-studies/food-tracker/insights/daily-completeness-design-study.png` |

The asset manifest retains the exact Figma frame/crop provenance, runtime-capture source, dimensions, and hashes in [`docs/ASSET_MANIFEST.md`](../../../ASSET_MANIFEST.md). The owner’s evidence note records the reviewed source and prior gallery baseline in [`food-tracker-imagery-evidence.md`](../2026-10-10-owner-correction-pass-03/food-tracker-imagery-evidence.md).

## Browser evidence

Captures use **Google Chrome 154.0.8037.98** via the workspace Playwright package (`chromium.launch({ channel: "chrome", headless: true })`) at CSS viewports **1440 × 900** and **390 × 844**, device scale factor 1. The files below are panel crops from those viewports, not whole-window screenshots. Before and after viewport sizes match.

The two before-Insights panels are the owner’s genuine Chrome captures from the prior gallery review, retained into this evidence folder. The before-logging panels were captured in Chrome with the route-family CSS overrides removed in-page to restore the `HEAD` stylesheet appearance; the route markup is otherwise visually unchanged. The after panels show the current source.

| Before | After | Viewport | Panel crop before → after |
|---|---|---:|---:|
| `captures/before-insights-desktop-1440x900-gallery.png` | `captures/after-insights-desktop-1440x900-gallery.jpg` | 1440 × 900 | 1020 × 644 → 1020 × 816 |
| `captures/before-insights-narrow-390x844-gallery.png` | `captures/after-insights-narrow-390x844-gallery.jpg` | 390 × 844 | 356 × 710 → 356 × 786 |
| `captures/before-chrome-logging-desktop-1440x900-route-families.jpg` | `captures/after-logging-desktop-1440x900-route-families.jpg` | 1440 × 900 | 376 × 718 → 376 × 784 |
| `captures/before-chrome-logging-narrow-390x844-route-families.jpg` | `captures/after-logging-narrow-390x844-route-families.jpg` | 390 × 844 | 326 × 692 → 326 × 752 |
| `captures/before-chrome-logging-desktop-1440x900-shared-destination.jpg` | `captures/after-logging-desktop-1440x900-shared-destination.jpg` | 1440 × 900 | 926 × 83 → 926 × 83 |
| `captures/before-chrome-logging-narrow-390x844-shared-destination.jpg` | `captures/after-logging-narrow-390x844-shared-destination.jpg` | 390 × 844 | 326 × 228 → 326 × 228 |

All four existing Insights assets loaded at their manifest dimensions in both after captures. Chrome reported no page errors and no horizontal overflow at either viewport.

## Verification

- `npm run test -- --run src/FoodTrackerCaseStudy.test.tsx` — 19/19 passed.
- `git diff --check` — passed; one pre-existing CRLF warning remains in the shared owner review report.
