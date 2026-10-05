# Pass A Opening Follow-up QA

**Date:** 2026-10-04
**Source commit:** `59140c48bb8bd0d002409c7282b42e10be261268`
**Browser:** Installed Google Chrome via local Playwright; build served at `http://127.0.0.1:4173/`

## Results

- **Normal handoff — Pass:** the committed source is unchanged from the prior recorded 1,977ms natural handoff. This run also reached `/home` at approximately 2.1s measured from detecting the rendered opening element; that measurement includes React effect/router observation overhead. The opening source still specifies a 2,000ms timer.
- **Skip — Pass:** Skip was activated from a fresh `/` start and navigated to `/home`.
- **Reduced motion — Pass:** Playwright’s reduced-motion emulation showed the opening mark at full opacity and the mark, arc, and progress animations disabled; automatic handoff reached `/home`. The source’s reduced handoff timer remains 120ms. The measured DOM-detection-to-route interval was about 272ms including React effect and observation overhead.
- **Ring/arc — Pass:** normal mode reports `opening-loading-turn`, 2s duration. At the mid-sequence sample its animation was running at about 584ms / 29% progress; the progress line was filling. Reduced mode reports no arc animation.
- **Runtime errors — Pass:** no page, console, request, or HTTP errors observed.

## Evidence

- `opening-normal-mid-sequence.png`
- `opening-skip-before.png`
- `home-after-reduced-handoff.png`
- `qa-results.json`

No source files were edited. Full tests/build were not rerun per instruction. No live screen-reader or non-automated motion review was performed; reduced motion was checked through browser preference emulation.
