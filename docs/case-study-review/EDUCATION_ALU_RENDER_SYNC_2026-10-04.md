# Education ALU runtime render check — 2026-10-04

## Scope

Read-only local browser QA for `/education/projects` at `http://127.0.0.1:5173/education/projects`. The tested worktree was based on committed HEAD `02ea2f7042dd16f61173d0350b20e729538f2fb6` and included the then-uncommitted Education component, CSS, route-test, and source-audit edits. Playwright 1.63.0 and installed Chrome 153.0.8010.53 were used at DPR 1. Browser QA made no source or test changes. This page has no detailed body reference for pixel-parity review; findings below are runtime/layout observations only. The page itself explicitly says it describes a selected source snapshot and does not claim a hardware demonstration.

## Results

- HTTP 200 at desktop 1920×1080 and narrow 390×844. All 19 image elements reported loaded at both sizes. No console errors, page errors, failed requests, or error responses were observed.
- No horizontal overflow: document width equals client width at both viewports (1920/1920; 390/390). The narrow document is 1935px tall and its single-column layout remains within the viewport width.
- Four project cards appear in order: Dental Clinic DBMS (`CURRENT · IN PROGRESS`, `EVIDENCE PENDING`), Bookstore Management System (`EVIDENCE PENDING`), Quartus/VHDL 8-bit ALU and nine-state FSM lab project, Four-stage CMOS amplifier (`EVIDENCE PENDING`). The ALU card has no status label in the rendered content. No identifier values were present in the page text scan.
- The system diagram is exposed as a figure named **“Lab 6 part 2 system map.”** Its reading order is data path, control path, process, display path, then the source-derived caption. The four stages and following opcode/state details are visible without text colliding or clipping in the narrow full-page render.
- Desktop diagram arrows point horizontally from the input/control cards to the process card and onward to display. At 390px, those connections stack vertically and both arrows point down between the cards.
- On desktop, content scrolls inside `main` (`scrollHeight 1264`, `clientHeight 970`), so the browser’s `fullPage` screenshot covers the outer viewport rather than expanding the internal scroller. A separate bottom-scroll screenshot records the rest of the page, including all nine opcode branches, state progression, and source caveat. On narrow, the document naturally expands to show the full story.

## Feature Preview follow-up — commit `be5a89b`

After the Education source was committed and deployed to the `feat/portfolio-integration` Pages branch, the immutable Preview at `https://b2e00552.joshuaik2.pages.dev/education/projects` was checked with Playwright 1.63.0 and Chrome 153.0.8010.53 at the same desktop and narrow sizes. Both returned HTTP 200; all 19 images loaded; there were no browser, request, or response errors and no horizontal overflow. The four cards and accessible system-map reading order were present, arrows ran rightward on desktop and downward on narrow, and the desktop bottom-scroll capture showed the opcode/state content. Visual inspection found no visible clipping or overlap. This is runtime/layout evidence only; the route has no detailed Figma body reference, so no Figma parity claim is made.

Preview folder: `docs/case-study-review/render-sync/2026-10-04-education-alu-preview-be5a89b/`

- `education-alu-preview-summary.json` — target, source, browser, viewport and validation summary.
- `education-alu-preview-evidence.json` — detailed route, image, error, width, card, and figure evidence.
- Viewport and full-page screenshots at 1920×1080 and 390×844, plus the desktop main-bottom screenshot.

## Evidence

Folder: `docs/case-study-review/render-sync/2026-10-04-education-alu-local/`

- `education-alu-evidence.json` — route, viewport metrics, image/error data, cards, and accessibility snapshot.
- `education-alu-main-bottom-evidence.json` — desktop inner-scroll checkpoint metrics.
- `education-alu-1920x1080-viewport.png`
- `education-alu-1920x1080-fullpage.png`
- `education-alu-1920x1080-main-bottom.png`
- `education-alu-390x844-viewport.png`
- `education-alu-390x844-fullpage.png`
