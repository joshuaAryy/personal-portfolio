# Resume Found scale and channel follow-up

## Changes

The completed owner reference shows the cyan core at approximately 212–225 px radius in a 604 px crop; the previous Preview measured about 232–255 px in its 601 px crop. The channel is now clipped to an 80.5–85.5% opaque radial core with a soft 78.5–87.5% feather, while retaining the established open lower arc (153°–207°), texture layers, and full 306° completed fill.

The entire desktop composition now scales to a 640 px maximum. The J, title, plate action, and Close caps increase together by about 6–7%; the short-desktop composition cap remains 600 px and height-constrained, while narrow remains capped by viewport width. The scenic field, concentric layers, and controls all live in the same composition container.

## Measurements

Chrome 154 metrics are in `before/metrics.json` and `after/metrics.json`.

- At 1440×900, the mechanism is 640×640 px; J is 300×300; title 320×36; action 245×81; Close 141×27. Close ends at y≈818 within the viewport.
- At 1280×720, the short-height cap yields a 574×574 mechanism; all controls remain visible, with Close ending at y≈687.
- At 390×844, the mechanism remains 358×358 with 16 px side margins; J/title/action/Close remain unchanged and Close ends at y≈647.
- The calculated desktop opaque channel core is about 225–240 px radius after the 640 px enlargement, with the feather extending about 219–245 px. This is the owner reference's 212–225 px band scaled by the 640/600 composition increase. The frame keeps both gold rails visible and the fill stops at the action-plate endpoints.
- All captured states had zero page errors and document width equal to viewport width. Reduced-motion screenshots show the final 306° fill immediately.

## Captures

Before uses Preview `https://9b8a4661.joshuaik2.pages.dev/`; after uses local source at the same viewports.

- 1440×900: `before/desktop-1440x900-full-306deg.png` and `after/desktop-1440x900-full-306deg.png`
- 1280×720: `before/short-desktop-1280x720-full-306deg.png` and `after/short-desktop-1280x720-full-306deg.png`
- 390×844: `before/narrow-390x844-full-306deg.png` and `after/narrow-390x844-full-306deg.png`
- Beginning/partial/full and reduced-motion states are captured at all three viewports in both folders; mechanism close-ups use the `*-mechanism-crop.png` suffix.

## Verification

- TDD red: focused assertions failed on the old radial band and 600/280/300/230/132 sizing caps.
- `npm test -- --run src/ResumeFlow.test.tsx`: 13/13 tests passed.
- `git diff --check -- src/resume.css src/ResumeFlow.test.tsx`: passed.

Changed application files: `src/resume.css`, `src/ResumeFlow.test.tsx`. The captures were made locally before checkpoint commit/deployment.

## Integrated visual and interaction review

The owner-supplied beginning and completed screenshots are `Resume_Found_Progress_Beginning_Owner_2026-10-11.png` and `Resume_Found_Progress_Completed_Owner_2026-10-11.png` in the local owner-reference folder. Their visible energy core sits inside the gold rails and stops at the lower plate; the corrected local renders preserve those boundaries while scaling the mechanism up modestly.

Representative review captures include the matched desktop before/full-after pair, desktop beginning/partial/full/reduced-motion states, and full-fill states at 1280×720 and 390×844. Additional locally captured viewport/state variants remain in `before/` and `after/`; the selected comparisons and metrics are included in the checkpoint.

Chrome interaction evidence is in `../2026-10-12-owner-resume-lobby-reconcile/qa/resume-final-after-css/interactions.json` and `resume-final-metrics.json`: modal and direct `/resume` routes load; Escape and Close return to Home and restore focus; View Resume opens `/resume/viewer`; reduced motion presents the completed fill; browser errors and failed requests are empty. The state screenshots show the 36° beginning, 153° partial, and 306° completed channel at desktop, short desktop, and narrow sizes.

The existing lobby matrix at `../2026-10-12-owner-resume-lobby-reconcile/qa/stable-{projects,experience,hackathons,education}-*.png` was rechecked against the owner’s bounded, centered banner direction. Groups remain centered in the main content region, plus controls align near the banner midpoints, and narrow layouts remain usable. The shared Resume Viewer header matches the standard top header; Activity identities and the Projects owner portrait showed no concrete current-render mismatch. Those surfaces were preserved without code changes.

The final current-owner scope changed only Resume Found channel radius and coordinated component sizing. No Opening, case-study, banner, Activity, header, or portrait source was changed.
