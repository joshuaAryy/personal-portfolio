# Final Opening Chrome captures

These are current-source captures from installed Chrome, not storyboard images inserted into the app.

- Browser viewport: 1920×1080.
- State screenshots: 720×640 center crops of the live scene.
- Method: pause the document's CSS/Web Animations and inline SVG SMIL timelines at the same exact elapsed `currentTime` for each authored key pose, allow two paint frames, and capture the scene crop.
- Pose times: 650, 960, 1,370, 2,580, 3,100, 3,720, and 4,100ms.
- `keypose-report.json` records sampled transforms, tick timing, mark bounds, image errors, and exact capture filenames.
- `handoff-4090ms-720x640.png` and `handoff-4100ms-720x640.png` show adjacent frames around the handoff from moving assembly to the canonical settled lockup.
- The real-time full-screen capture from 1920×1080 through Home is [`opening-full-chrome-1920x1080.webm`](../../../../site-render-review/2026-10-11-opening-fidelity/final-current-source-r2/opening-full-chrome-1920x1080.webm).

The seven-state side-by-side comparison is [`../../opening-seven-state-comparison.html`](../../opening-seven-state-comparison.html). The source Figma storyboard remains unchanged.
