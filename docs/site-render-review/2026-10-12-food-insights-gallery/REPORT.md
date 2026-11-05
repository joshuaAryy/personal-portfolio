# Food Tracker Insights gallery correction

## Scope

This local pass removes the visible provenance sentence and repeated source labels from the four-card Insights gallery, gives all four cards equal image frames, and retains the concise view descriptions. Alt text still identifies Macro Composition as an app capture with sample values and the other three images as Figma analytics designs. The existing gallery order and the surrounding case-study story are unchanged.

## Authored Calorie Forecast reference

The owner supplied `C:\Users\samue\Downloads\Food_Tracker_Calorie_Forecast_Owner_Reference_2026-10-12.jpeg`. I cropped the central phone from source pixels x532–817, y0–519 into a 286 × 520 PNG, preserving the forecast title, period selector, solid recorded history through Today, dotted seven-day forecast, uncertainty band, and line legend. The crop is an owner-authored design reference, not a runtime screenshot. The visible title and caption describe the forecast without adding a repeated provenance label; alt text explicitly identifies the reference and says it is not runtime. Crop command and coordinates are documented in `export-calorie-forecast-crop.cjs`, with source/output hashes in `docs/ASSET_MANIFEST.md`.

I also checked the repository assets and owner Figma file `GFLStsF0ADwaizoVKGeLny`, Phase 17.5 analytics canvas `344:21`, including the `0:1 Foundations` and `2:2 Components` pages. The available analytics frames include Calories `344:477`, Fiber `344:822`, and Daily Completeness `344:936`; no forecast phone UI was present there. The existing `344:477` asset remains a separate calorie-trend chart crop and is no longer used in the gallery.

## Evidence source distinctions

- **Macro Composition:** authentic Food Tracker app-interface capture from the Phase 24 QA-A staging supplement; its alt text says the displayed values are sample data, not user outcomes.
- **Calorie forecast:** owner-provided authored design reference crop, not a runtime screenshot; alt text identifies it as an owner-provided design reference.
- **Fiber trend, Daily completeness:** authored Phase 17.5 Figma crops, not runtime screenshots; their alt text identifies each as a Figma analytics design.
- **Source provenance:** retained in `docs/ASSET_MANIFEST.md` and the existing source-truth documentation.

## Browser captures

Captured from local source with Google Chrome `154.0.8037.98` through the workspace Playwright package (`chromium.launch({ channel: "chrome", headless: true })`), device scale factor 1. The same CSS viewports were used before and after: desktop `1440 × 900`, narrow `390 × 844`. The screenshots crop the gallery element so the complete collection is visible.

| Viewport | Before at HEAD | After local source |
|---|---|---|
| Desktop 1440 × 900 | `before-desktop-1440x900.png` | `after-desktop-1440x900.png` |
| Narrow 390 × 844 | `before-narrow-390x844.png` | `after-narrow-390x844.png` |

`before-manifest.json` and `after-manifest.json` record the viewport, browser version, image alt text, and natural asset dimensions. All four images loaded in both captures. The capture script is `capture-gallery.cjs`.

## Verification

- `npm test -- --run src/FoodTrackerCaseStudy.test.tsx src/FoodTrackerCaseStudy.scrollspy.test.tsx` — 21 tests passed.
- `npm run typecheck -- --pretty false` — passed.
- `git diff --check` — passed.
