# Pass 03 lobby visual follow-up (read-only)

**Local source:** Pass 03 shared worktree, committed `13ac6277866ea7e26d71e7d18a11824df4732b18` plus existing uncommitted corrections. Browser target `http://127.0.0.1:5174`; installed Chrome / Playwright. No application source was edited.

## Current rendered evidence

Captured and visually inspected each lobby at 1920×1080 and 390×844:

- `projects-desktop.png`, `experience-desktop.png`, `hackathons-desktop.png`, `education-desktop.png`
- `projects-narrow.png`, `experience-narrow.png`, `hackathons-narrow.png`, `education-narrow.png`
- `lobby-qa.json` includes route/status, scene/card rectangles, image load state, scroll dimensions, and action/back destinations.

All eight routes returned HTTP 200. All rendered images loaded; no browser console/page errors or failed requests. At 1920×1080 the document remains 1920×1080. Desktop main regions have no internal scroll; selected action and Back are visible. Back click returns to `/home`; Confirm/action click reaches the expected route in each lobby: `/projects/food-tracker`, `/experience/living-in-silico`, `/projects/crest`, `/education/projects`. At 390×844, all four pages are naturally vertically scrollable (document width remains 390; heights 2362px for the three-item lobbies and 3526px for Projects); the Back link is at the top and the action is reachable lower in the content. Cards remain within the viewport width and do not clip horizontally.

## Historical comparison

Copied the preserved `6dcaf8e` desktop/narrow Experience and Education captures into this folder for matched visual reference. `6dcaf8e:src/lobby.css` set non-Projects banners to `left:12%; right:12%`, centered across the main region. The current render keeps that center axis and has no hard-edged environment rectangle: the scene begins below the global header and fades into the lower surface without a visible rectangular image boundary.

There is, however, a clear size regression against the historical 1920×1080 composition. Current non-Projects banner group bounds are x≈395, width 810px (three cards, each ≈246px); the historical 6dcaf8 group spans roughly x≈210–1384, about 1,175px. The current group is centered but materially narrower and its three cards are correspondingly smaller. Current CSS caps it at 810px, while historical CSS used the 76%-of-main-width treatment. This difference is visible in Experience and Education; Hackathons uses the same current geometry. Projects retains its wider five-card composition. This is a concrete visual deviation from the preserved historical reference, despite being centered and unclipped.

On the current Experience render, Living in Silico and Stush Patties Activity images exactly match the corresponding lobby card image paths (`/media/profile/living-in-silico-logo.png` and `/media/profile/stush-patties-logo.png`). Their marks also visually match in size treatment appropriate to each surface.

## Comparison assets

- Historical: `historical-6dc-experience-1920x1080.png`, `historical-6dc-experience-390x844.png`, `historical-6dc-education-1920x1080.png`, `historical-6dc-education-390x844.png`
- Current Chrome: eight captures listed above.

The comparison is rendered-browser evidence; the CSS commit is used only to confirm the historical width rule, not as a substitute for visual inspection.

## Root reconciliation against Pass 03 owner direction

The 810px versus 1,175px difference is real, but it is not treated as a defect in this candidate. Pass 03 specifically asks for the narrower owner-preferred proportions for Experience, Hackathons, and Education, while requiring top clearance and balanced plus-slot spacing. The current 810px group retains the narrower width cap from the historical treatment in `6e77dc5`, but uses a centered position below the usable top edge. At 1920×1080 its bounds are approximately x=395–1205, with the plus slots evenly outside the group. The 6dcaf8e comparison is retained as evidence of a separate wider historical layout, not the target width for this correction.

All four current lobby captures were inspected. The banner group is centered, the three categories share the same width and spacing system, the background has no hard rectangular edge, and the marks, Back, and category actions remain legible. No application CSS change is warranted for this pass; the earlier QA note about the wider 6dcaf8e comparison does not override the explicit narrower treatment in the current owner direction.
