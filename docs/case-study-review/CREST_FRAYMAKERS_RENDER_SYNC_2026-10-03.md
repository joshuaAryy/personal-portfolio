# Crest and Fraymakers render sync

**Date:** 2026-10-03

**Source checkpoint:** `a9633b8` (`feat/portfolio-integration`)

**Browser:** Playwright 1.63.0 with installed Chrome 153.0.8010.53

**Render target:** current local Vite worktree at `http://127.0.0.1:5173`; this is not the deployed Preview.

## References

- Crest Figma review frame: `3286:813` ([captured export](render-sync/2026-10-03-crest-fray/figma-crest-post-copy.png), 1920×2348)
- Fraymakers Figma review frame: `3286:1031` ([captured export](render-sync/2026-10-03-crest-fray/figma-fraymakers-post-copy.png), 1920×1841)

## Comparison

| Surface | Desktop render | 390px render | Result |
|---|---:|---:|---|
| Crest | 1920×2257 | 390×3583 | The five-stage policy retrieval path, divider, and all three evidence cards render inside the shared dark panel. Desktop connectors show `+` then `→`; the narrow stack centers `+` and turns the final arrow downward. The panel remains readable without horizontal overflow. |
| Fraymakers | 1920×1704 | 390×3356 | The composition heading and subtitle match the current Figma wording. The seven input tiles remain; obsolete `L01`–`L07` labels are absent. Pipeline stages remain `01`–`04`. |

The full-page measurements provide comparison context, not a target scroll length. The page structures and story content remain subject-specific.

## Runtime checks

- Both routes returned HTTP 200 at 1920×1080 and 390×844 viewports.
- All 16 Crest images and all 14 Fraymakers images loaded with alt text.
- All five chapter anchors on each page resolved to their expected section.
- No console/page errors, failed requests, bad responses, or horizontal document overflow were observed.
- At 390px, clicking the real **Policy Retrieval** chapter link places the section at y=76 while the sticky rail ends at y=60, leaving 16px clearance. At desktop the section begins at y=158 and the rail ends at y=142, also leaving 16px.
- A targeted narrow crop appears to cover the heading because the capture helper scrolls the inner policy figure beneath the sticky rail. This is a helper-only artifact; the actual chapter-link interaction leaves the heading clear.

## State and evidence

The local browser render exercised the source now checkpointed as `a9633b8`. The deployed Preview remains on `86d5d89`, so this report does not claim that the current deployed Preview contains these changes. Production was not targeted. Owner review remains open.

Desktop and narrow full-page captures, targeted Crest policy crops, Figma exports, and the machine-readable browser evidence are in [`render-sync/2026-10-03-crest-fray/`](render-sync/2026-10-03-crest-fray/). The evidence JSON records viewports, image loads, anchors, geometry, and browser errors.

## Crest copy follow-up — 2026-10-03

This follow-up records the small source-backed content sync after the `a9633b8` render report above. Fraymakers is unchanged.

Live Figma pairs `1962:44 / 3286:862`, `2367:7 / 3286:962`, and `1817:422 / 3286:954` were verified before sync. React source `377d640` now includes the employee/merchant/day anomaly grouping as a review-only heuristic; makes transaction-backed Finance Q&A distinct from the standalone policy-PDF retrieval prototype; and states the presentation timing lesson without inventing a duration. It does not claim an ML fraud classifier or Joshua's ownership of Finance Q&A.

Focused Crest tests passed 5/5; the full suite passed (21 files / 92 tests), build and diff check passed. Local Chrome and clean Preview source `377d640` were checked at 1920×1080 and 390×844. All 16 images loaded, no browser/request errors or document overflow appeared, and all five chapter links updated the matching active state. The longer copy fit at both sizes. Evidence: [local copy follow-up](render-sync/2026-10-03-crest-fray/crest-copy-followup/) and [clean Preview QA](render-sync/2026-10-03-preview-clean-377d640/). No concrete render mismatch was found; owner review remains open.
