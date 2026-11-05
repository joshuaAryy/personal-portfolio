# Demos Render Sync — 2026-10-04

## Result

Demos row 12 passed its current Preview render and interaction check on app source `9fd23f9` at [the immutable feature Preview](https://a7047ffc.joshuaik2.pages.dev/profile/demos). The route was inspected in Chrome 153.0.8010.53 at 1920×1080 and 390×844. No concrete implementation mismatch was found. This closes the render-validation step; owner review remains separate.

## Render and interaction evidence

- The route returned HTTP 200 at both sizes. All 24 images loaded, the document width matched the viewport, and there were no application console/page errors or failed app requests.
- Food, Crest, and Cho selectors expose accessible names, update `aria-pressed`, and switch the selected heading. Food's identity poster is centered at 480×480 on desktop and 157.5×157.5 at 390px. The selected Cho'Veigo Recommendations still remains uncropped. Crest's player retains a 16:9 ratio at both sizes.
- Pressing Enter on Crest Play replaces the button with the titled `Crest expense intelligence demo video` iframe and transfers focus to it. The 2px gold focus outline remains inside the clipped player at both sizes. Shift+Tab returns to the Cho selector, and all selectors remain available.
- Help opens by keyboard at both sizes and its descriptions fit. The narrow dialog measures 366×276 within the 390×844 viewport.
- The external video visibly plays. YouTube avatar/telemetry requests report `ERR_ABORTED` during browser teardown; the iframe has no HTTP failure and the app records no error.

## Evidence files

Full evidence is in [`render-sync/2026-10-04-demos-preview-9fd23f9`](render-sync/2026-10-04-demos-preview-9fd23f9/). The consolidated record is [`demos-final-evidence.json`](render-sync/2026-10-04-demos-preview-9fd23f9/demos-final-evidence.json); viewport interaction records, selector/playback/keyboard-return/Help captures, and selected-state screenshots are alongside it.

No source change or deployment was made for this validation. Production was not targeted.
