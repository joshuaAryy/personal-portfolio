# Pass A Header Follow-up QA

**Date:** 2026-10-04
**Browser:** Installed Google Chrome through local Playwright
**Viewports:** Home 390×844; Home and category shells 1920×1080

## Results

- **Narrow Help/avatar bounds — Pass:** Help occupies x=302.1–338.1px; Joshua’s avatar occupies x=340–382px. They do not intersect (1.9px separation). The Help label is visible, enabled, and keyboard focusable (tabIndex 0); focusing visibly targets the button, and clicking opens the Home controls dialog.
- **Narrow layout — Pass:** document width equals the 390px viewport. All four primary modes remain visible and individually selectable; Confirm reaches Projects, Experience, Hackathons, and Education.
- **Desktop navigation — Pass:** on Home and all four category shells, primary nav contains exactly Projects, Experience, Hackathons, and Education. Resume appears once as a visible top-right utility (`.header-client-tool`, href `/resume`) and is absent from primary nav. Clicking it from Projects opens `/resume`.
- **Console/network — Pass:** no page errors, console errors, failed requests, or HTTP responses ≥400 were observed.

## Evidence

- `home-narrow.png`
- `help-open-narrow.png`
- `home-desktop-1920.png`
- `projects-desktop-1920.png`
- `qa-results.json`
