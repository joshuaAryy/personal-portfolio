# Owner correction pass 04 — review checkpoint

Status: implementation candidate; owner review is open. The persistent portfolio goal remains active.

This bounded pass preserves the current owner-positive site and changes only the lobby proportions/controls, short-height Profile banner fit, Resume Found progress channel, and Food Tracker Insights gallery. The application changes are based on feature source `06ebcfc42a3f13e8b2ea2dbd7be7cbd5b0b8d2ba`; Preview and final commit details will be added after publication.

## Visual comparison evidence

Images below use matching viewport dimensions unless noted. The broader desktop/mobile render matrix and measurements are in the local QA folder `qa-integrated-current-20261012`; the links here are the selected captures retained with this report.

### Category lobbies — 1440 × 720

| Mode | Before | Current |
|---|---|---|
| Projects | [before](qa-958b4cd/height-aware-refinement-final/before-projects-1440x720.png) | [after](qa-integrated-current-20261012/lobby-projects-1440x720.png) |
| Experience | [before](qa-958b4cd/height-aware-refinement-final/before-experience-1440x720.png) | [after](qa-integrated-current-20261012/lobby-experience-1440x720.png) |
| Hackathons | [before](qa-958b4cd/height-aware-refinement-final/before-hackathons-1440x720.png) | [after](qa-integrated-current-20261012/lobby-hackathons-1440x720.png) |
| Education | [before](qa-958b4cd/height-aware-refinement-final/before-education-1440x720.png) | [after](qa-integrated-current-20261012/lobby-education-1440x720.png) |

Chrome checks also covered 1920 × 1080, 2560 × 1080, 390 × 844, and the 1440 × 720 bottom/action states. QA measured each desktop banner group centered in the main scene (`groupCenterDelta: 0`); category `+` controls were centered to the three-banner group (`plusCenterDelta: 0`). Projects has five banners and no `+` controls. At short height, actions remain reachable by natural scrolling.

### Profile — 1366 × 768

| Before | Current |
|---|---|
| [before](qa-958b4cd/profile-fit-final/before-profile-1366x768.png) | [after](qa-integrated-current-20261012/profile-1366x768.png) |

The short-height rule scales and positions the identity banner proportionally; the approved signal row, left rail, traits, and interactions are unchanged. QA also checked 1280 × 720 and 1920 × 1080; all four signals fit within the scene with bottom margins of 16, 25, and 22 px respectively. The 1920 × 1080 composition remains unchanged.

Close crops make the banner-to-trait clearance visible: [before](qa-958b4cd/profile-fit-final/before-profile-1366x768-tip-crop.png) · [after](qa-958b4cd/profile-fit-final/profile-1366x768-tip-crop.png). The central decorative tip now ends above the signal imagery; the full-width pair is included above for scene context.

### Resume Found — state, hierarchy, and narrow fit

- [Beginning, 1440 × 900](qa-integrated-current-20261012/resume-actual-1440x900-beginning.png)
- [Partial at 153°, 1440 × 900](qa-integrated-current-20261012/resume-actual-1440x900-partial-seek.png)
- [Completed, 1440 × 900](qa-integrated-current-20261012/resume-actual-1440x900-completed.png)
- [Completed, 390 × 844](qa-integrated-current-20261012/resume-actual-390x844-completed.png)
- [Reduced motion, 390 × 844](qa-integrated-current-20261012/resume-actual-390x844-reduced.png)

The current fill is clipped by the gold-bounded middle annulus and the open lower plate gap; full cyan persists at completion. The CSS animation fills through 306° over 1.15 seconds after a 260 ms delay. The owner’s screenshot named “Beginning” corresponds visually to the advanced partial phase (about 140–150°); the true early 36° state is separately captured at `qa-958b4cd/final-visual-verification/resume-1440x900-beginning-36.png`. The phase comparison is documented in `qa-958b4cd/final-visual-verification/resume-phase-mapping.md`.

One visual limitation remains: the approved source contains no dedicated plasma texture layer. The fill uses subdued gradients/highlight without a repeating hatch; its completed state is more uniform than the owner’s textured reference. The channel geometry, progress persistence, and plate clearance are verified.

Chrome verified modal underlay inertness, focus restoration, Escape, Close, View Resume, direct `/resume` actions, reduced motion, and narrow layout. Full route/state/error metrics are in the local QA report `qa-integrated-current-20261012/qa-report.md`.

### Food Tracker Insights — gallery

| Viewport | Before | Current |
|---|---|---|
| 1440 × 900 | [before](../2026-10-12-food-insights-gallery/before-desktop-1440x900.png) | [after](../2026-10-12-food-insights-gallery/after-desktop-1440x900.png) |
| 390 × 844 | [before](../2026-10-12-food-insights-gallery/before-narrow-390x844.png) | [after](../2026-10-12-food-insights-gallery/after-narrow-390x844.png) |

The former Calorie Trend is replaced by the owner-approved Calorie Forecast phone crop. Its source is `C:\Users\samue\Downloads\Food_Tracker_Calorie_Forecast_Owner_Reference_2026-10-12.jpeg` (SHA-256 `CEAE86F63A092F8E9641CF667E4A99809FDB8A8BEF1046C5F0DEE782CCAB9F61`); the 286 × 520 crop removes the surrounding desktop canvas without redrawing the chart. The owner image remains identified as a design reference in accessible text, not a runtime capture. The four image frames are balanced in a desktop 2 × 2 grid and a narrow stacked layout. Visible provenance labels and the repeated source-description sentence are removed; evidence provenance remains in `docs/ASSET_MANIFEST.md` and accessible descriptions.

## Verification

- Focused tests: 4 files, 77 tests passed.
- Full tests: 31 files, 310 tests passed. Happy DOM logged expected abort/network messages while iframe/PDF requests were torn down; command exited 0 with no failed tests.
- `npm run build`: passed; Vite reports the existing 500 kB chunk advisory.
- `git diff --check`: passed; Git reports only an unrelated line-ending notice for `qa-958b4cd/deployed-home-review.md`, which is not part of this change.
- Integrated installed-Chrome matrix: four lobbies at 1440 × 720, 1920 × 1080, 2560 × 1080, 390 × 844; Profile at 1280 × 720, 1366 × 768, 1920 × 1080; Resume at desktop/narrow including beginning/partial/complete/reduced and route/keyboard actions; Food gallery at 1440 × 900 and 390 × 844. QA found zero page/console/network/HTTP errors, failed images, or horizontal overflow.
- Playwright's `animations: disabled` fast-forwards finite CSS animation and was rejected as timing evidence. The valid desktop 153° partial is the animation-paused `partial-seek` image; the natural elapsed 303.648° sample is labeled near-complete, not partial, in `qa-integrated-current-20261012/qa-report.md` and its JSON.

## Immutable Preview verification

- **Preview:** https://57334288.joshuaik2.pages.dev
- **Application source:** `4507d3179c41348ea38d74ab6c1ef0ebb7212cb0` on `feat/portfolio-integration`.
- Wrangler lists this as a **Preview** deployment, deployment ID `57334288-5b27-4847-9d87-dd8d78c016cb`, source `4507d31`. Production was not targeted.
- Installed Chrome opened Home, all four lobbies, Profile, Resume Found, Resume Viewer, Food Tracker, Demos, and Cho’Veigo. All returned HTTP 200; there were no browser/console/network errors, failed images, or horizontal overflow at the tested desktop/narrow entry points.
- The deployed JavaScript and CSS returned the same SHA-256 and byte lengths as the local build (`index-BE7g5I2h.js`: 518,530 bytes; `index-BQEqwo86.css`: 501,723 bytes).
- Cho’Veigo’s original two-part media source hashes to the owner-provided SHA-256 `1C637A4AD7A197D7073DA88534CF8D54B660C85DF16B75FA25F955D16E94C801`. The Preview player reports 112.638333 seconds at 1920×1080, retains audio and controls, accepts a seek to 90 seconds, and serves byte ranges. The owner authorized publication of this unchanged original.
- Deployed route and asset evidence, including representative screenshots, is in [`qa-deployed-4507d31`](qa-deployed-4507d31); the full media check is `choveigo-media-report.json`.

## Status

Implemented and visually verified: lobby sizing/centering/controls, short-height Profile banner fit, Resume ring geometry/progress/actions, Food Forecast gallery replacement and presentation.

Owner review open: visual acceptance of this correction candidate. The annular fill material remains a documented reference mismatch because there is no approved authored plasma texture asset.

Preserved: Opening/J, Home, approved case studies, owner portrait/identity sources, Resume Viewer architecture, original Cho’Veigo media, and unrelated worktree files. Production was not targeted.
