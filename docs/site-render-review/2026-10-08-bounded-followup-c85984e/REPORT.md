# Bounded owner-correction follow-up — review checkpoint

**Status:** REVIEW CHECKPOINT READY. The persistent portfolio goal remains active; this Preview does not mark it complete.

| Item | Value |
|---|---|
| Application source | `c85984e4dac25e18a438491e2e4f6ced7b6f250f` (`fix: clarify demo excerpt and improve food evidence`) |
| Branch | `feat/portfolio-integration` |
| Immutable feature Preview | <https://2e2a7644.joshuaik2.pages.dev/> |
| Previous immutable Preview | <https://f74ffd5d.joshuaik2.pages.dev/> (source `782c524c6f6883f74c2ccc96a610338acc576929`) |
| Production | Not targeted or changed |

## Changes since source `782c524`

- **Cho’Veigo demo disclosure:** the 4.94-second Recommendations clip is visibly and accessibly labeled as a short excerpt. The media itself and player behavior are unchanged; it is not presented as the full demo.
- **Food Tracker evidence:** replaced the empty Phase 24 logging-menu capture with `search-banana-results.png`, the canonical Phase 24 pre-redesign search-results capture. Its caption and alt text preserve the source-state limitation and explicitly avoid claiming that this image establishes retrieval quality. The portfolio uses a local copy, not a GitHub runtime URL. The Phase 24 manifest is documented at [the upstream screenshot README](https://github.com/joshuaAryy/food-tracker/blob/phase-24-frontend-redesign/docs/design-references/phase-24/current-state/README.md).

## Verification

- Focused tests: **20/20** across `DemosPage.test.tsx` and `FoodTrackerCaseStudy.test.tsx`.
- Full suite: **239/239** across 27 files.
- `npm run build`: passed.
- `git diff --check`: passed.
- The deployed HTML, JavaScript, and CSS matched the clean build by SHA-256.
- Installed Chrome/Playwright checked `/profile/demos` and `/projects/food-tracker` at 1440×900 and 390×844. Both routes loaded; the Cho’Veigo excerpt played in-page and the Food capture loaded with its caption. No browser, page, console, request, HTTP, or horizontal-overflow errors were recorded. At 1440×900, the Food caption begins at the bottom edge and wraps below the fold; it is not clipped, and it is fully visible at 390×844.
- The previous `782c524` immutable Preview provides the broader 14-route desktop/narrow smoke and Home/Resume/Opening interaction checks. This follow-up did not repeat that full sweep because its application delta is limited to Demos and Food Tracker.

QA report and screenshots are retained locally under `%TEMP%\portfolio-b32d635-after0bf8214-visual-qa-20261008\preview-2e2a7644-c85984e\`. Food section captures are under `%TEMP%\food-review-b32\`.

## Known open items

- A privacy-safe full Cho’Veigo demo is still unavailable. The authentic 112.638-second recording contains sensitive personal/contact/resume information; keep the short Recommendations excerpt labeled as such. Do not fabricate footage.
- Food Tracker still has no authentic demo video.
- The non-Projects lobby banner group retains the previously measured 20px horizontal offset from Figma at 1920×1080 (React x395, Figma x375; both 810px wide); it is disclosed in the preceding report for owner review.
- Live screen-reader interaction still needs a manual Windows Narrator session.

The original integration worktree’s dirty and untracked material remains preserved and excluded from this clean source checkpoint. This Preview is for owner review; the persistent goal remains active.
