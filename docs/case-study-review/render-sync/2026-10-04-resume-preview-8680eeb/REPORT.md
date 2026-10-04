# Resume Found Preview QA — source 8680eeb

- Preview: `https://723c7b0d.joshuaik2.pages.dev/resume` (immutable deployment supplied for app source `8680eeb`).
- Browser: installed Chrome 153.0.8010.53 with Playwright 1.63.0.
- Figma comparison: current local review export `tmp/figma-review/resume-viewer/resume-found.png` (1920×1080); frame and mechanism references in `docs/RENDER_VALIDATION_QUEUE.md`.

## Observations

The desktop 1920×1080 Ready Check chassis/environment and dimmed client shell/rail align with the Figma review export. The central frame measures 530×530 at x=535, y=204; the rail begins at x=1600. `RESUME FOUND`, View Resume, and `ESC · CLOSE` retain the Figma composition and placement. At 390×844 the responsive adaptation fits the 390px document width; no narrow-Figma parity claim is made.

The archive J loads from its 700×700 source and renders at 460×460 on desktop and 310.7×310.7 on narrow. It is visibly soft at both presentation sizes, matching the known source-resolution limitation for archive node `159:2`; this is inherited, not a new regression.

Keyboard and navigation checks passed: desktop Tab focuses View Resume on the first press with a visible 2px cyan outline; Enter opens `/resume/viewer`, and Back returns to `/resume`. Direct Close and Escape return to `/home`; opening Resume from `/projects` and closing returns to `/projects`. At 390px, Help is initially visible at x=252–336, y=0.5–68.5. Tab reaches it on press 9 without horizontal nav scrolling; Enter opens the dialog in place and Escape restores focus to Help.

**Concrete narrow focus issue:** the Help button’s focus ring is clipped by the horizontally scrollable `.top-nav`. The button outline should occupy x=247–341, y=−4.5–73.5, while the nav clip box is x=73–336, y=0.5–68.5. Top, right, and bottom portions of the outline are clipped (left is visible). The control remains keyboard reachable and opens correctly, but its focus indicator is incomplete at this viewport.

Both routes tested (Resume Found and its viewer entry) returned HTTP 200. Resume Found images loaded 21/21 at both viewports; document widths were 1920/1920 and 390/390. No console, page, request, or response errors were recorded.

## Evidence

- [Machine-readable interaction and layout evidence](resume-preview-8680eeb-evidence.json)
- Desktop: `resume-preview-8680eeb-desktop-1920x1080.png`, `resume-preview-8680eeb-view-resume-focus.png`, `resume-preview-8680eeb-viewer-entry.png`
- Narrow: `resume-preview-8680eeb-narrow-390x844.png`, `resume-preview-8680eeb-narrow-help-focus.png`, `resume-preview-8680eeb-narrow-help-open.png`, `resume-preview-8680eeb-narrow-help-focus-clip.png`

Owner review remains open. Production was not targeted.
