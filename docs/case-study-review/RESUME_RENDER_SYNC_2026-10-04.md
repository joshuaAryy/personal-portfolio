# Resume Found and viewer render check — 2026-10-04

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
