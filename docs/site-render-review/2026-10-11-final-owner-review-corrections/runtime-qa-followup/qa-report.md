# Focused Runtime QA — 2026-10-11

This report records three sequential checks: the initial local candidate at `3f72275`, a fresh local recheck after the narrow lobby correction, and the final immutable Preview from application source `17057f9`. The last section is the deployed checkpoint result; earlier observations are retained as history and superseded where the later recheck says so. This is implementation verification, not owner acceptance.

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

- Header brand J and Activity availability J both use `/media/identity/sonnet-v8/figma-export/canonical-lockup.png`, opacity 1. On the current deployed Home, Header is 54×54 with `filter:none`/`mix-blend-mode:screen`; Activity is 48×48 with `filter:brightness(1.16)`/normal blend. The CSS differs, but the Chrome render shows comparable apparent brightness at their respective sizes. The Projects owner portrait and all lobby banner marks loaded.
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

## Immutable Preview verification — 2026-10-11

Preview: https://5d314ec5.joshuaik2.pages.dev/
Cloudflare Pages deployment: `5d314ec5-a913-4ce2-94d5-5264223ef9d5` · environment `Preview` · branch `feat/portfolio-integration` · Wrangler source prefix `17057f9`, matching application source commit `17057f9efedc3139f70a3ece6cc09217578acdef` (the branch later received documentation-only checkpoint commits; deployed app assets are unchanged).

The deployed shell references `index-pOKBoEo_.js` and `index-B0vc_JMl.css`. Downloaded deployed bytes exactly match local clean `dist`: JS 519,121 bytes, SHA-256 `E5C576FEC09126EDA6C80C6C9F906D0591F08CF8D1AA10A80BADD366F91F8506`; CSS 501,937 bytes, SHA-256 `6794602F225EC759A41F456E778BB50DD685D35B1EE5B95C96000162C6617ECE`.

Direct deployed routes `/home`, `/projects`, `/experience`, `/hackathons`, `/education`, `/resume`, and `/resume/viewer` all returned HTTP 200 at 1440×900 and 390×844. Settled scans found no failed image loads, failed requests, page/console errors, or horizontal document overflow. At 390px, the mode lobbies and case-project surfaces are vertically scrollable as intended; headings and controls remain within the 390px document width. Captures and route metrics: `%TEMP%\portfolio-preview-5d314ec5-final\` (`desktop-*.png`, `narrow-*.png`, `route-smoke-final.json`).

Home→Resume Found opens a modal takeover at `/resume`; the dialog reports `aria-modal=true`. Tab cycles View Resume → Close → View Resume, confirming focus remains trapped. Escape and Close return to `/home` and restore focus to the triggering Resume link; View Resume reaches `/resume/viewer`. Resume Viewer exposes visible Download PDF and Open Fullscreen links to the same deployed PDF; the embedded PDF resource loads in desktop and narrow captures. Download was activated and produced `Joshua_Aryeetey_General_Resume_v13.pdf`; the Open Fullscreen link was activated (Chrome opened a PDF tab, but its popup URL was blank in this headless audit). The PDF endpoint returns HTTP 200 with `application/pdf`.

J appearance correction: on Home, Header J uses the canonical lockup at 54×54 with computed `filter:none` and `mix-blend-mode:screen`; Activity J uses the same canonical asset at 48×48 with computed `filter:brightness(1.16)` and normal blend. The filters differ, but the rendered marks look comparably bright at their respective sizes; no obvious brightness mismatch is visible. Evidence: `%TEMP%\portfolio-preview-5d314ec5-final\j-identity-home-desktop.png`.

Cho’Veigo full-media endpoint `/media/demos/choveigo-full-demo.mp4` responds `200`, `Content-Type: video/mp4`, length `32,915,943` bytes and ETag `"sha256-1C637A4AD7A197D7073DA88534CF8D54B660C85DF16B75FA25F955D16E94C801"`, matching the owner-authorized original SHA-256. A byte-range request returned `206`, `Content-Range: bytes 0-1023/32915943`. Native Chrome metadata reports duration `112.638333s`, unmuted, volume 1, readyState 4; play/pause advanced currentTime without media error. This verifies the unchanged full original source, duration, audio-enabled player state, and range support. The browser reports `audioTracks` as unavailable (`null`), so track enumeration itself is not independently verified.

Classification: routes, deployed bundle/source identity, assets/errors/overflow, Resume routing controls, canonical J source/apparent brightness, and full Cho’Veigo media identity/playback are verified in deployed Chrome. This is runtime QA, not owner acceptance.

Resume ring/focus detail: the 1440×900 settled deployed screenshot shows the cyan middle channel illuminated within the gold outer circle, with no visible channel overrun. On the deployed modal, Tab sequence was View Resume → CLOSE → View Resume. Evidence: `%TEMP%\portfolio-preview-5d314ec5-final\resume-desktop-settled.png`.

## Cross-surface route regression sweep — 2026-10-11

Installed Chrome checked the six long-form case studies plus Education projects, Profile, Journey, Personal Highlights, and Demos at 1440×900 and 390×844 (22 route/viewport checks). All returned HTTP 200. The sweep scrolled the actual nested `main` region on case-study pages so lazy-loaded media could decode. All visible images completed with nonzero dimensions; there were no failed requests, HTTP errors, console/page errors, pending visible images, or horizontal overflow. Full route metrics are in [case-route-smoke-2026-10-11.json](../case-route-smoke-2026-10-11.json).

## Help and X utility regression check — 2026-10-11

On Home, Projects, Profile, Food Tracker, and Resume Viewer at 1440×900 and 390×844, the installed-Chrome check opened all ten Help states. Desktop opened a modal guide; narrow Home opened its nonmodal coachmark, while the other narrow screens opened the modal guide. Each control fit within the viewport, utility guidance included LinkedIn, GitHub, Email, and Resume, and Escape closed the guide and restored focus to Help. The X action kept the verified `https://x.com/Cartizionplane` destination, opened a new tab, and used `noopener noreferrer`. No page or console errors occurred. This is a runtime/bounds check, not a new Help visual redesign.
