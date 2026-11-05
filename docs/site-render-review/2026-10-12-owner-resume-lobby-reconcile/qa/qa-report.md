# Final local QA — Resume and lobby reconciliation

## Final Preview addendum — 1280×720 Resume fit

An installed-Chrome check of Preview `9b8a4661` found a real direct-route short-screen regression that was not visible in the earlier desktop/narrow matrix: at 1280×720, `/resume` had a 638px main viewport but 675px of content, with the composition reaching y=733.1 and Close reaching y=740.2. The targeted correction caps the entire mechanism to the space available below the shared header and reduces top padding for short desktop heights.

After the correction, on the same 1280×720 viewport, the direct route has `scrollHeight === clientHeight === 638px`; the 574px composition begins at y=106, and Close ends at y=686.9. In the modal takeover, the same 574px composition begins at y=46 and Close ends at y=626.9. Chrome also confirmed the 1440×900 composition remains 600px, the 390×844 composition remains 358px, Escape restores `/home` and focus to the opener, View Resume opens `/resume/viewer`, and reduced motion presents the completed 306° fill with no animation. Captures: [before Preview](short-height-resume-fix/before-preview-926a2822-1280x720.png), [corrected direct route](preview-9b8a4661/resume-direct-short-1280x720.png), and [corrected modal](preview-9b8a4661/resume-modal-short-1280x720.png). Measurements are in [before/after JSON](short-height-resume-fix/before-after-1280x720.json) and [final viewport metrics](preview-9b8a4661/preview-qa.json).

The correction is limited to the short-desktop CSS rule and its regression test. The lobby implementation is unchanged from the already checked five-size/four-route matrix. Full tests, build, deployed bundle hashes, and route checks are recorded in [the review checkpoint](REVIEW-CHECKPOINT.md).

**Status:** focused independent Chrome audit complete. No app source changes were made by QA, and nothing was deployed.

- Worktree: `owner-correction-pass-03`
- HEAD at audit start: `81d5ead23898fa6a662a48b99eedc2e9551a20eb`
- Browser: installed Chrome, driven through Playwright
- Local Vite target: `http://127.0.0.1:5174`
- Capture/evidence directory: [`qa`](./qa/)

## Lobbies — visually checked

All four routes were rendered at **1920×1080, 1440×900, 1440×720, 2560×1080, and 390×844**. Stable captures use the pattern `stable-{route}-{size}.png`; each 1440×720 bottom-scroll capture ends in `-bottom.png`. `lobby-final-matrix.json` records viewport and main-region scroll extents; `lobby-geometry.json` records card, midpoint-control, environment, and overflow bounds.

The 5-card Projects group and three-card Experience, Hackathons, and Education groups are centered in the available main region at the measured desktop sizes. Plus controls flank the groups at their vertical midpoint; for example, at 1920×1080 the Projects group center is x=780 with plus centers x=115/1445, while the three-card groups center at x=800 with plus centers x=335/1265. At 2560×1080 the Experience group and main region both center at x=1120, with plus centers x=655/1585. At 1440×720 the three-card group centers at x=600, plus controls at x≈132/1068, and the short-height background shifts to `center 68%`; the regular desktop framing is `center 60%`.

At 1440×720, all four routes have a vertical main-region scroll range: Projects 122px; Experience, Hackathons, and Education 243px. The bottom-scroll captures show the selected tray and primary View/Open action reachable after scrolling. The short-height viewport therefore requires scrolling to reach the lower action; the action is not clipped or inaccessible. At 390×844, cards are stacked and centered, decorative plus controls are hidden, and document width equals viewport width. At every checked viewport, document scroll width equals the viewport and the rendered background uses the centered woodland asset. I found no hard banner rectangle or visible artwork clipping in the inspected captures.

## Resume and Viewer — functional regression check plus final visual addendum

I rechecked `/resume` and the Home takeover actions for behavior only, per the current frontend follow-up. The modal opens with a dialog and an inert, `aria-hidden` underlay. Escape and Close return to `/home` and restore focus to the originating Resume link; View Resume navigates to `/resume/viewer`. Direct `/resume` Close and View Resume also navigate correctly. These observations are in `resume-identity-final.json`.

At the time of the initial interaction check, the Resume refinement was still in progress. Those diagnostic captures are superseded for visual review by the final texture captures documented below.

The shared Resume Viewer header loads the canonical identity images, matching the same shared header system visible on Home and Projects. At 1440×900 and 390×844, the PDF iframe loads, and Download PDF / Open Fullscreen controls remain visible. Evidence: `resume-viewer-final-1440x900.png`, `resume-viewer-final-390x844.png`, and `resume-identity-final.json`.

## Shared identities — no regression observed

The Home header J and Activity rail J both load `/media/identity/sonnet-v8/figma-export/canonical-lockup.png`. Activity entries for Living in Silico and Stush Patties load the same canonical logo files used on the Experience cards. The Projects lobby’s central owner portrait loads `/media/lobby/profile-portrait-source.jpg` successfully and is framed within its medallion. Captures: `home-activity-j-final-1920x1080.png` and `projects-portrait-final-1920x1080.png`.

## Runtime health

Across the matrix and focused route checks: no browser console/page errors, failed requests, HTTP errors, broken visible images, or horizontal overflow were observed. The audit did not run the full test suite or validate live screen-reader announcements.

## Resume Found texture refinement — fresh frozen-candidate check

After the prior diagnostic capture, the frontend added a restrained highlight and fine texture to the energy fill. I re-rendered the current local candidate in installed Chrome at 1440×900 and 390×844, including a close-up and native `prefers-reduced-motion: reduce` states. The source at this check was HEAD `81d5ead23898fa6a662a48b99eedc2e9551a20eb` plus the current uncommitted `src/resume.css` update. QA made no source edits.

**Visual result: pass for the requested bounded ring behavior.** At full state the CSS fill reports `306deg` / opacity `0.86`; the annular texture is clipped inside the gold-bounded channel, with the lower open sector ending at the attached View Resume plate. It does not appear on the scenic disc or outside the gold rails. The completed texture remains visible. In reduced motion, computed animation is `none` while the same `306deg` / `0.86` full state appears immediately.

- Desktop 1440×900: ring bounds x=337.3, y=207.4, 525.3×525.3; plate x=485, y=677.1, 230×75.9. Capture: `resume-texture-desktop-full-1440x900.png`, close-up `resume-texture-desktop-closeup-1440x900.png`, reduced motion `resume-texture-reduced-desktop-1440x900.png`.
- Narrow 390×844: ring bounds x=38.3, y=300.3, 313.4×313.4; plate x=117.3, y=580.5, 155.4×51.3. Full view, close-up, and reduced-motion captures: `resume-texture-narrow-full-390x844.png`, `resume-texture-narrow-closeup-390x844.png`, `resume-texture-reduced-narrow-390x844.png`. The control stack fits within the viewport.
- `resume-texture-final.json` records computed fill, opacity, animation, mask, geometry, loaded images, and browser/request errors. No errors, failed requests, or missing images occurred.

Resume interaction behavior is unchanged by this CSS-only refinement; the prior same-candidate check in `resume-identity-final.json` recorded modal Escape/Close focus restoration, View Resume navigation, and direct-route Close/View actions. This QA pass evaluates the requested ring appearance; it does not declare overall owner acceptance of Resume Found.
