# Resume Found Close clearance follow-up

The outer gold ring crossed the top edge of the Close box in the integrated 1440×900 render. The Close control was positioned at `top: 97.8%`; moving it to the mechanism's `100%` composition boundary places the control below the ring's lower arc, with a small visible gap while keeping it attached to the mechanism.

## Before and after evidence

Captured at identical viewport sizes from the local current-source app:

| Viewport | Before | After | Close top before → after |
| --- | --- | --- | --- |
| 1440×900 | [before](before-1440x900.png), [close-up](before-1440x900-closeup.png) | [after](after-1440x900.png), [close-up](after-1440x900-closeup.png) | 795.98 → 810.08 px |
| 390×844 | [before](before-390x844.png), [close-up](before-390x844-closeup.png) | [after](after-390x844.png), [close-up](after-390x844-closeup.png) | 628.11 → 636 px |
| 1280×720 | [before](before-1280x720.png), [close-up](before-1280x720-closeup.png) | [after](after-1280x720.png), [close-up](after-1280x720-closeup.png) | 667.36 → 680 px |

The after metrics report the Close control visible at all three sizes. In the after renders, the ring terminates above the Close frame and the control remains visually attached at the mechanism base. The fill, title, action plate, and mechanism dimensions were not changed for this correction.

## Code and verification

- `src/resume.css`: moved `.resume-found__close` from `top: 97.8%` to `top: 100%`.
- `src/ResumeFlow.test.tsx`: updated both responsive geometry assertions to require the composition-boundary placement.
- Red check: the focused test failed on the old `97.8%` rule before the CSS correction.
- Green check: `npm test -- --run src/ResumeFlow.test.tsx` — 1 file and 14 tests passed.
- `git diff --check -- src/resume.css src/ResumeFlow.test.tsx` — passed.

Raw browser bounds are in [before-metrics.json](before-metrics.json) and [after-metrics.json](after-metrics.json).
