# Profile Overview geometry review

## Owner issue and current result

The owner's annotated Profile screenshot marks the signal row lower and identifies excessive space below it. The latest correction keeps the four signal groups together and reduces the lower scene region rather than adding another arbitrary row offset. The background still occupies that area and fades into the dark lower edge.

Current Chrome captures at the owner's 1536×1360 aspect ratio and the requested matrix are in this folder:

- [1536×1360 overview](after-1536x1360-overview.png)
- [1440×900 overview](after-1440x900-overview.png)
- [1920×1080 overview](after-1920x1080-overview.png)
- [1920×768 overview](after-1920x768-overview.png)
- [390×844 overview](after-390x844-overview.png)

Matched screenshots of the last immutable Preview and current local source are also retained: [Preview](before-preview-1536x1360-overview.png) → [current](after-local-1536x1360-overview.png) at 1536×1360, [Preview](before-preview-1440x900-overview.png) → [current](after-local-1440x900-overview.png) at 1440×900, and the [Projects overlay pair](before-preview-1536x1360-projects-open.png) / [current overlay](after-local-1536x1360-projects-open.png).

The four panels were captured open at 1536×1360:

- [Projects](after-1536x1360-projects-overlay.png)
- [Experience](after-1536x1360-experience-overlay.png)
- [Hackathon](after-1536x1360-hackathon-overlay.png)
- [Academics](after-1536x1360-academics-overlay.png)

## Measurements

| Viewport | Signal value bottom | Remaining viewport band | Scroll behavior |
|---|---:|---:|---|
| 1536×1360 | y≈1160 | ≈200px | No document or main-region scrolling |
| 1440×900 | y≈894 | ≈6px | No document or main-region scrolling |
| 1920×1080 | y≈1048 | ≈32px | No document or main-region scrolling |
| 1920×768 | y≈729 | ≈39px | No document or main-region scrolling |
| 390×844 | y≈1379 | naturally scrollable | Mobile scroll retained |

At 1536×1360, the signal row is about 160–185px lower than the owner's annotated composition, reducing the lower band from about 315–380px to about 200px. That remaining area is scenic background, not reserved padding or an inner scroll region. Further trimming would crop more of the scenic viewport or require another signal-row shift.

All four open-panel connectors center within 0.06px of their corresponding signal centers. Their 13px tails begin 12px above the signal cell and reach its top edge. The prior far-above Projects panel issue did not reproduce in the current render. The panels remain attached to their triggers without changing their content or interaction model.

The annotated owner screenshot is the design-before reference: its signal values end around y≈975 and the annotation marks a 315–380px lower region. The current 1536×1360 render places the values around y≈1145–1160, leaving approximately 200px of scenic background. The current render and last immutable Preview match at 1536×1360 and 1440×900; no additional Profile code change was needed in this follow-up. The prior far-above Projects screenshot remains problem evidence in the owner's local reference folder and is intentionally not copied into the repository; the current open-panel screenshots show its connector attached to each signal.
