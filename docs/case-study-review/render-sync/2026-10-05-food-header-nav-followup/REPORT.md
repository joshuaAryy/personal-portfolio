# Food Header and Chapter Navigation Follow-up QA

**Date:** 2026-10-05
**Route:** `/projects/food-tracker`
**Runtime:** Playwright 1.63.0 with installed Chrome 153
**Viewports:** 390×844, 400×844, 405×844, 406×844, and 1920×1080

## Result

All tested routes returned HTTP 200. There were no console errors, page exceptions, failed requests, or HTTP errors. Document width matched viewport width at every tested size.

At 390px, Projects, Experience, Hackathons, Education, Help, and the avatar are visible and do not intersect. All four primary links and Help are keyboard-focusable. Help opened by click and by Enter when focused. At the diagnostic widths, the compact header remained collision-free at 400 and 405px. At 406px the wider label treatment resumed: Education ends and Help begins at x=302.1 (edges meet), Help ends at x=338.1, and the avatar begins at x=344, leaving 5.9px. No hitboxes intersected at these widths.

At 390px, LOGGING, INSIGHTS, and ARCHITECTURE clicks each set the matching `aria-current="location"`; their headings landed below the sticky chapter bar. Passive scrolling from the LOGGING anchor moved its section top from 100.3px to 92.3px while LOGGING remained active. Desktop chapter clicks set the matching active state, and passive scrolling retained the current LOGGING state. No horizontal document overflow occurred.

## Evidence

Screenshots and complete measurements are in `final-scroll-reset/`:

- `food-390-top.png`
- `food-390-anchor-logging.png`
- `food-390-anchor-insights.png`
- `food-390-anchor-architecture.png`
- `food-1920-top.png`
- `food-1920-passive-scroll.png`
- `final-results.json` — header rectangles at all five widths, focus/click results, anchor/active state, overflow, and browser errors

No source files were changed. This was browser automation and visual inspection, not a live screen-reader test.
