# Integrated Chrome QA — current uncommitted source

Worktree: `C:\oc03`
HEAD at capture: `06ebcfc42a3f13e8b2ea2dbd7be7cbd5b0b8d2ba` with existing uncommitted owner correction work.
Target: `http://127.0.0.1:5177` (current Vite server for `C:\oc03`).
Browser: installed Google Chrome via Playwright. This QA did not change application source or deploy.

## Results

- **Lobbies:** Visually inspected all four routes at 1440×720, 1920×1080, 2560×1080, and 390×844. Desktop grouping is centered in the main scene (measured `groupCenterDelta: 0`); plus controls match the group's vertical midpoint (`plusCenterDelta: 0`). Projects renders five banners; Experience, Hackathons, and Education render three. All 16 renders have zero horizontal overflow and no failed images. At 1440×720 the action is reachable after scrolling: Projects scroll range 122 px; the other three 243 px. Each bottom capture shows its View button within the viewport. The narrow layouts stack the cards and scroll vertically, with no horizontal overflow.
- **Profile:** At 1280×720 all four signal cards are visible, ending at y=704 (16 px bottom margin). At 1366×768 the row ends at y=743 (25 px margin); at 1920×1080 it ends at y=1058 (22 px margin). The four signal assets load at each size; no horizontal overflow. Visually, the row remains grouped and within the scene.
- **Resume Found:** Desktop and narrow captures include beginning, partial, completed, and reduced-motion states. The naturally elapsed desktop `resume-actual-1440x900-partial.png` is actually a late/near-complete sample (1401.159 ms of 1410 ms; 303.648° / opacity .853388), not a partial. The valid desktop partial is `resume-actual-1440x900-partial-seek.png`, captured with the CSS animation paused at 835 ms (153° / opacity .43). The narrow natural partial is 750.628 ms (130.55° / opacity .366904); both completed states reach 306°/.86. No matrix recapture was performed. Both reduced-motion renders begin at 306°/.86. Visual inspection confirms the texture remains inside the gold-bounded annulus and stops at the lower attached plate; no horizontal overflow. Direct-route Close returns to `/home`; View Resume reaches `/resume/viewer`. From Home, Resume opens a dialog with inert/aria-hidden underlay; Escape and Close return Home and restore focus to the Resume link; View Resume routes to the viewer.
- **Food Tracker Calorie Forecast gallery:** The desktop 1440×900 gallery is a two-by-two grid; the 390×844 layout places each image/text pair in a compact stacked list. All four captures load: Macro Composition (app capture), Calorie forecast (owner-authored design reference), Fiber trend (Figma study), and Daily completeness (Figma study). The distinct evidence types are exposed in the DOM; no broken gallery images or horizontal overflow. Captures show the gallery itself for close visual inspection.
- **Runtime:** Across these captured routes, zero console/page errors, failed requests, HTTP errors, broken images, or horizontal overflow.

## Evidence

All rendered captures, measurements, and scripts are in this folder. `qa-report.json` contains the route/viewport metrics, assets, runtime results, and modal actions. Resume timing/state observations are in `resume-actual-state-report.json`; the valid desktop partial is `resume-actual-1440x900-partial-seek.png`. The full capture script is `capture-integrated.cjs`; direct-route Resume action confirmation was run by `resume-direct-actions.cjs`.

### Selected captures

- Lobbies: `lobby-projects-1920x1080.png`, `lobby-experience-2560x1080.png`, `lobby-education-1440x720-bottom.png`, `lobby-hackathons-390x844.png`.
- Profile: `profile-1280x720.png`, `profile-1366x768.png`, `profile-1920x1080.png`.
- Resume: `resume-actual-1440x900-beginning.png`, `resume-actual-1440x900-partial-seek.png` (valid 153° desktop partial), `resume-actual-1440x900-partial.png` (natural elapsed, late/near-complete 303.648° sample), `resume-actual-1440x900-completed.png`, `resume-actual-390x844-partial.png` (natural partial), `resume-actual-390x844-completed.png`, `resume-actual-390x844-reduced.png`.
- Food gallery: `food-calorie-forecast-gallery-1440x900.png`, `food-calorie-forecast-gallery-390x844.png`.

Note: the first draft Resume screenshots used Playwright's `animations: disabled`, which fast-forwarded the finite animation. They are not used as evidence; the `resume-actual-*` screenshots and timing JSON supersede them.
