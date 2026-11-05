# Resume Found and viewer render check — 2026-10-04

## Final responsive Help rerender — Preview `f8762c0`

The immutable Preview at [source `f8762c0`](https://bb5ce74d.joshuaik2.pages.dev/) was checked on `/resume` in Chrome `153.0.8010.53` with Playwright `1.63.0` at 390×844, 650×844, 651×844, 760×844, 900×844, and 1920×1080. The /resume route returned HTTP 200 in all six viewport runs; document width equaled viewport width at every size, 21/21 images loaded, and console, page, request, and response error lists were empty.

At 390, 650, 651, and 900px, keyboard Tab reaches Help with the full 2px gold focus outline inside both the nav and viewport. Enter opens the Help dialog in place; Escape restores focus to Help without changing `/resume` or scroll position. At 651px the button box starts at y=-0.5px, but its inset outline starts at y=0.5px and remains fully visible. The 760px layout was checked for fit and width. At 1920px the desktop rail remains x=1600, w=320 and the footer x=1601, y=1018, 319×62, matching the prior desktop geometry.

The earlier 8680eeb clipped outline at 390px and a474032 top/edge clipping at 651px are resolved in this Preview. The archive J remains the known inherited source-resolution limitation: its 700×700 source renders at about 460px on desktop and 310.7px at 390px and still appears soft. No new layout mismatch was observed; owner review remains open.

Evidence: [current Figma review export](render-sync/2026-10-04-resume-preview-f8762c0/figma-resume-found-2407-176.png), [machine-readable results](render-sync/2026-10-04-resume-preview-f8762c0/resume-preview-f8762c0-evidence.json), and [rendered screenshots](render-sync/2026-10-04-resume-preview-f8762c0/).

## Resume PDF Viewer rerender — Preview `f8762c0`

The immutable Preview [source `f8762c0`](https://bb5ce74d.joshuaik2.pages.dev/) was checked at `/resume` and `/resume/viewer` in Chrome `153.0.8010.53` with Playwright `1.63.0`, at 1920×1080 and 390×844. Both routes returned HTTP 200; document width matched the viewport, all images loaded (21/21 on `/resume`, 17/17 on `/resume/viewer`), and no console, page, request, or HTTP response errors occurred.

The approved v13 PDF returns `200 application/pdf`, 164,726 bytes, with a `%PDF-` signature. Keyboard Tab reaches Download and Enter saves the matching PDF at both sizes. Tab then reaches Open Fullscreen; Enter opens the same PDF in a new tab. Focus is visible on both action links. At desktop, real mouse wheel input over the PDF moves from its top content to its lower Projects content while the outer page and main scroll positions stay at zero, confirming scrolling inside Chrome's PDF viewer. At 390px the one-page PDF fits the viewer; wheel input scrolls the outer document instead. The page remains free of horizontal overflow.

The rendered app shell and action geometry remain intact. The desktop footer measures x=1601, y=1018, 319×62; at 390px it is hidden and follows the responsive shell behavior. Figma viewer references `3419:484/485/656/660/663/664` show the intended viewer/page and app actions; Chrome's native PDF toolbar and thumbnail rail appear in the real browser capture and are browser UI, not an app mismatch. No concrete app defect was found. Owner review remains open.

Evidence: [machine-readable results and screenshots](render-sync/2026-10-04-resume-viewer-preview-f8762c0/). The evidence folder contains the two downloaded v13 PDFs for byte/signature verification.

**Preview:** [source `92d3c26`](https://965f0e82.joshuaik2.pages.dev/), feature branch `feat/portfolio-integration`. Production was not targeted.

**Browser:** Chrome `153.0.8010.53`, at `1920×1080` and `390×844`. The deployed `/resume` shell, dimming, authentic Ready Check chassis, View Resume action, and close label align with the existing Figma/local captures. Both routes returned 200, all 21 images loaded at both sizes, document width matched the viewport, and there were no browser/request errors.

| Check | Result |
|---|---|
| View Resume / Back | Opens `/resume/viewer`; Back returns to `/resume`. |
| Close and Escape | From direct `/resume`, both return to `/home`; when entered from `/projects`, Close restores `/projects`. |
| Narrow Help | Visible in the initial viewport at x=252–336 and y=0.5–68.5. Tab 6 reaches it with a visible outline without nav scrolling; Enter opens Help in place and preserves `/resume`. |
| Archive J | The 700×700 source renders at 460×460 on desktop and 310.7×310.7 narrow. It remains visibly soft, consistent with the known archive-source limitation; preserve `159:2` and do not replace or sharpen the mark. |
| PDF viewer presentation | Figma viewer frame `3419:484` depicts the PDF page without browser controls. Chrome's iframe displays its native toolbar and thumbnail rail; this is browser UI and was not treated as a React mismatch. |

The authorized v13 PDF returned `200 application/pdf` (164,726 bytes). Tab 2 reached Download; Enter saved a valid `%PDF-` file with the approved filename. Tab 3 reached Open Fullscreen; Enter opened the PDF asset in a new tab. Desktop wheel input scrolled the document from top content to lower project content inside Chrome's viewer. At 390px, the scaled page fit in the viewer, so the same wheel gesture produced no visible change. There was no horizontal overflow or browser/request error. No live screen-reader test was run.

Screenshots and machine-readable results are in [the evidence directory](render-sync/2026-10-04-resume-preview-92d3c26/): [Resume Found evidence](render-sync/2026-10-04-resume-preview-92d3c26/evidence.json), [PDF viewer evidence](render-sync/2026-10-04-resume-preview-92d3c26/viewer-evidence.json), and the corrected [narrow Help keyboard evidence](render-sync/2026-10-04-resume-preview-92d3c26/narrow-help-keyboard.json).
