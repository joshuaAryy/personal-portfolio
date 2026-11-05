# Food Tracker analytics imagery check

**Source reviewed:** branch `codex/owner-correction-pass-03`, HEAD `6bc3f3c5ea3ef2ee20249e2d81b94ec65270b48a`
**Page:** `/projects/food-tracker`, Insights section
**Figma reference:** `GFLStsF0ADwaizoVKGeLny`, Phase 17.5 canvas `344:21` (4700 × 3150; inspected at 2000 × 1341)

## Finding

The current gallery already meets the requested evidence mix, so no image was replaced or added: it contains three distinct Figma analytics studies and one authentic Macro Composition app capture. On desktop the studies form a 2 × 2 evidence grid with captions; at narrow width the cards stack while retaining a side-by-side image and explanation. The macro capture remains labeled as sample data and is not presented as a user result. The Figma studies are explicitly labeled as design studies with illustrative data, not shipped app screens.

I shortened the gallery context note to: “Figma studies use illustrative data; Macro composition is an app capture with sample data.” A follow-up public-copy audit of the Logging and Insights media captions/body copy found no Phase, QA-A, staging, fixture, pre-redesign, dated test-window, or exact sample-value text. The preserved Macro app image itself still contains its displayed sample values; it is clearly labeled as sample data, and the caption says they are not user outcomes. Detailed capture provenance remains in `docs/ASSET_MANIFEST.md`. “Railway staging” remains in the separate stack/release story as verified environment context, not as screenshot provenance.

## Image provenance

| Displayed item | Source and region | Local dimensions | SHA-256 |
|---|---|---:|---|
| Calorie trend | Figma frame `344:477`, chart crop x20/y342 | 350 × 380 | `3473B357C520A458CF469F20AB5F7122BF3981B667ADF2F169FDFFD148473F2D` |
| Macro composition | Food Tracker `phase-24-frontend-redesign`, source commit `c2651e1751e287cfdaa9f45688a5d0af66200148`, populated Macro Composition app capture; sample data | 368 × 800 | `7E1121C398FA4CF69F0AC95A735B18BCA503F781276D2CC1D0D5E914CB5ABB25` |
| Fiber trend | Figma frame `344:822`, chart crop x20/y318 | 350 × 372 | `9C5DC41FB3C19A3D5DDD6A6C2F94C7DB6F65EA0DA1A7C5459D3F5F17A48556B4` |
| Daily completeness | Figma frame `344:936`, completeness crop x20/y388 | 350 × 258 | `F8D879C4475F35E0201B16FC00984BA82E1157B966573A04DD1D906B07430EFB` |

The three Figma crops communicate different views: calorie trends, nutrient-specific fiber progress, and complete/partial/unlogged day coverage. The Macro Composition capture provides running-app evidence alongside the design concepts. I inspected the adjacent Figma Macro trends screen (`344:728`) as a possible fourth design export; it would repeat the retained app capture's macro-composition and daily-bar story, so it was not added. Exporting whole mobile screens would also make chart details too small in this gallery, so the three focused genuine design crops remain the clearest selection.

## Browser evidence

Chrome on the local Vite route was inspected at **1440 × 900** and **390 × 844**. All four images loaded at their recorded natural dimensions. The page had no horizontal overflow, browser console errors, page errors, or failed requests.

- Desktop gallery capture: `%TEMP%\food-insights-gallery-desktop-pass03-check.png`
- Narrow gallery capture: `%TEMP%\food-insights-gallery-narrow-pass03-check.png`

Both captures are local temporary review artifacts and are not added to Git.

## Verification

- `npm run test -- --run src/FoodTrackerCaseStudy.test.tsx` — **19/19 passed**
- `git diff --check` — passed

No Food architecture, narrative, retrieval evaluation, or Section 04 animation was changed.
