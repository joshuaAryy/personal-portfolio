# Pass A Runtime QA — 2026-10-04

Rendered the current Pass A build in installed Chrome through local Playwright at 1440×900 and 390×844. Compared current lobby and opening/resume frames with live Figma captures. No source files were changed.

## Confirmed

- Opening normal-motion handoff reached Home in **1,977 ms**. Computed styles show the J forming (opacity 0.17 at ~100 ms to 1 at ~250 ms), a clockwise arc rotating, and the loading label/progress present. Reduced-motion handoff passed. Skip was not rerun after the final CSS refinement; its handler was unchanged from the earlier Pass A check that reached Home.
- Home has four modes only; no Explore/Curated/Recent/About controls. Projects, Experience, Hackathons, and Education each reached the expected lobby via Confirm. Desktop and narrow Back/Confirm bounds do not overlap.
- Desktop LinkedIn, Resume, GitHub, and Email links expose the verified destinations. At 390 px, Resume is available in the visible mobile contact row; activating it reached Resume Found.
- Activity and lobby project marks loaded, including Cho’Veigo, Living in Silico, Stush Patties, Crest, and Fraymakers. All four lobby routes rendered without broken images or horizontal overflow.
- Demos uses the canonical Food Tracker, Crest, and Cho’Veigo marks. Desktop selection changes the heading and preview; narrow selector buttons remain visible with no horizontal overflow.
- Resume Found exposes a named region, heading, View Resume link, and Close button. View Resume reached the viewer. Desktop Escape and narrow Close returned to Home. Resume Found fits 390 px without horizontal overflow.
- Main browser run: no console errors, failed requests, HTTP errors, or broken images. Narrow Demos run also had no console or request failures.

## Concrete gaps

- **Narrow header collision:** at 390 px, Help bounds are x=302–386 and the avatar bounds are x=340–382, overlapping by 42 px. The page itself has no horizontal overflow.
- **Resume Found vs Figma `2407:176`:** React’s J artwork fills most of the ring interior; Figma shows scenic art inside the ring with a smaller centered J medallion. The takeover has no entrance animation; computed animation lists were empty at 60, 220, and 700 ms.
- **Lobby side slots:** current Figma frames `704:2`, `730:3316`, and `738:3316` show a `+` slot on either side of the three-card row. Those side slots are absent in the React Experience, Hackathons, and Education renders.
- **Projects lobby framing:** React renders tall oval ring outlines around the medallions where Figma `511:2` uses circular medallion framing.
- **Narrow Escape check:** inconclusive after the route transition; do not treat it as a confirmed pass. Desktop Escape and narrow Close were confirmed.

## Evidence

All evidence is in this directory. Opening motion captures are `opening-live-0100ms.png`, `opening-live-0250ms.png`, `opening-live-0650ms.png`, `opening-live-1200ms.png`, and `opening-live-1750ms.png`. Site renders are `home-desktop-1440x900.png`, `home-narrow-390x844.png`, `lobby-projects-desktop.png`, `lobby-experience-desktop.png`, `lobby-hackathons-desktop.png`, `lobby-education-desktop.png`, `demos-desktop.png`, `demos-narrow-390x844.png`, `resume-found-desktop-settled.png`, and `resume-found-narrow-390x844.png`. `resume-found-entrance-0060ms.png`, `resume-found-entrance-0220ms.png`, and `resume-found-entrance-0700ms.png` document the static entrance. Figma comparisons are `figma-opening-2025-2.png`, `figma-home-2252-3445.png`, `figma-resume-2407-176.png`, `figma-projects-511-2.png`, `figma-experience-704-2.png`, `figma-hackathons-730-3316.png`, `figma-education-738-3316.png`, and `figma-demos-1316-35.png`.

## Manual screen-reader review still required

No live screen-reader session was performed. With NVDA or another screen reader, verify: header utility names and link destinations; Home mode labels and pressed-state announcements while using arrow keys; the Back and Confirm names; Resume Found region/heading and View Resume/Close controls; keyboard Escape behavior; and that mobile contact links, including Resume, are announced and reachable in order.
