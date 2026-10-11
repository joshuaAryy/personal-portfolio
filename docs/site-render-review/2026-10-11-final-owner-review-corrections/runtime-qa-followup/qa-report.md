# Focused Runtime QA — 2026-10-11

Scope: read-only Chrome/Playwright check of the frozen local worktree at `HEAD 3f72275` plus its current uncommitted frontend changes, served at `http://127.0.0.1:5176`. This is not an immutable Preview and does not imply owner acceptance.

## Lobbies

- Existing current-worktree captures cover Projects, Experience, Hackathons, and Education at 1920×1080, 1440×900, 1440×720, and 390×844. The 1440×720 follow-up captures show the lower selection details and action after scrolling. Main scroll range is 122–123px; the selected panel, legend, primary action, and hint fit within the viewport at the bottom. Horizontal scroll is zero.
- Fresh 2560×1080 Chrome captures were added here for all four lobbies. The banner group is centered in the content area (excluding the 320px Activity rail): Projects x=480,w=1240; the other three x=775,w=690. Their plus slots are symmetric around each group midpoint. Banner and identity images loaded; no console/page/request errors in this pass.
- Initial mobile renders exposed two issues: plus controls covered the Back/category identity row, and the Experience legend/role content collided with its banner. The bounded CSS correction is documented in “Narrow-lobby correction recheck” below and supersedes those initial observations. Fresh settled renders now show the Back/category row unobstructed, role content separated, and the legend after the complete banner grid.
- Projects owner portrait: authentic `/media/lobby/profile-portrait-source.jpg` loaded at 160×200 and is framed in the central medallion. The face is visible and not visibly stretched.

## Resume Found and Viewer

- Direct `/resume` takeover evidence and desktop empty/partial/full states are in the parent review folder. Empty → partial → full shows the cyan fill staying within the middle channel and persisting in the completed frame. At 1440×900 the title sits directly below the J, View Resume fits its lower plate, and Close sits across the lower outer ring. At 390×844 and 320×740, the mechanism remains inside the viewport. I found no visible plate-text overrun. The lower Close control crosses the circle’s bottom boundary by design; it remains visually attached to the ring.
- Chrome verified Home → Resume Found takeover: dialog has `aria-modal=true` and `aria-labelledby=resume-found-title`; underlay has `aria-hidden=true` and `inert=true`; Tab cycles View Resume → Close; Escape and clicking Close both return to `/home` and restore focus to the Resume link; View Resume opens `/resume/viewer`. No runtime errors.
- Resume Viewer: desktop and mobile rendered the actual PDF in Chrome after load. The PDF returned HTTP 200 as `application/pdf`. Download triggered `Joshua_Aryeetey_General_Resume_v13.pdf`; Open Fullscreen opened that PDF in a new tab. Both controls were visible. No horizontal overflow or runtime errors; mobile document height requires vertical scrolling as expected.

## Shared identity / assets

- Header brand J and Activity availability J both use `/media/identity/sonnet-v8/figma-export/canonical-lockup.png`, opacity 1, no filter; the rendered marks appear consistent in Projects. The Projects owner portrait and all lobby banner marks loaded.
- No failed image loads, console errors, page errors, or failed requests occurred in the fresh 2560 and mobile lobby checks or Resume interaction/viewer checks.

## Evidence

- `projects-2560x1080.png`, `experience-2560x1080.png`, `hackathons-2560x1080.png`, `education-2560x1080.png`
- `projects-390x844-fresh.png`, `experience-390x844-fresh.png`, `hackathons-390x844-fresh.png`, `education-390x844-fresh.png`; settled screenshots also use `*-390x844-settled.png`
- `lobby-mobile-runtime.json`
- `viewer-desktop-afterwait.png`, `viewer-narrow-afterwait.png`, `resume-viewer-and-flow.json`
- Existing matched-size lobbies, bottom-scroll, and Resume state images are one directory above this report, including `lobby-*-desktop-1920x1080.png`, `lobby-*-laptop-1440x900.png`, `lobby-*-short-1440x720.png`, `lobby-*-narrow-390x844.png`, `narrow-centering-followup/lobby-*-1440x720-bottom.png`, and `resume-{desktop,narrow}-*-{begin,partial,full}.png`.

Classification: desktop and narrow lobby layout, Resume runtime controls, and Resume Viewer behavior are **verified in rendered Chrome**; visual results are not owner approval.


## Narrow-lobby correction recheck

Follow-up after the Frontend narrow-lobby fix; this supersedes the earlier mobile-overlap finding above. Fresh installed-Chrome checks at 390×844 on Projects, Experience, Hackathons, and Education show the plus/balance slots collapsed to zero-size and absent from the Back/category-title row. The Back control and category identity are unobstructed; selected banner groups are centered at x=13..377, the first banner at x≈72..318, and role text/icons are vertically separated where both are present. All four routes returned HTTP 200, `main.scrollWidth` matched its 390px client width, every inspected banner image loaded, and there were no console/page/request errors. Fresh screenshots: `recheck-projects-390x844.png`, `recheck-experience-390x844.png`, `recheck-hackathons-390x844.png`, `recheck-education-390x844.png`.

Desktop plus-placement regression check at 1920×1080 passed on Projects and Experience: plus-slot horizontal midpoint exactly matches the banner-group midpoint (0px delta); their vertical centers also match (Projects 405.8px, Experience 389px). No errors or broken banner images. Captures: `recheck-projects-1920x1080.png`, `recheck-experience-1920x1080.png`.

Current result: the previously reported narrow header and Experience role/legend collisions are fixed in this local candidate. No source edits, commit, or deployment were performed during QA.
