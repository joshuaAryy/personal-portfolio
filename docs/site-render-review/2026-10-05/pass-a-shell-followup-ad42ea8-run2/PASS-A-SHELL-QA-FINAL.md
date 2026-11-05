# Pass A shell runtime QA — uncommitted source

**Result:** no concrete runtime defect found in the requested Home/lobby/mark scope. This is a local browser check of the accepted uncommitted shell changes on top of application source `e9019af`; docs-only checkpoint `d791b93` was also present in the worktree. The Preview snapshot is `0999592`, so these captures validate local source directly and do not claim Preview parity.

## Environment and routes

- Playwright 1.63.0 controlling installed Google Chrome.
- Home: `/home` at 1920×1080 and 390×844.
- Lobby: `/projects`, `/experience`, `/hackathons`, `/education` at 1920×1080; `/experience` also at 390×844.
- Resume utility: `/resume` entered from Home at both widths.

## Findings

- **Home mode previews:** Projects, Experience, Hackathons, and Education can each be selected at desktop and narrow sizes. The preview heading/content changes with the selected mode. No Explore/Curated/Recent/About controls appeared. Projects/Confirm and Back rectangles did not intersect at either width.
- **Utility hierarchy:** desktop shows LinkedIn, Resume, GitHub, Email together in the header utility group; measured links point to `https://ca.linkedin.com/in/joshua-ary`, `/resume`, `https://github.com/joshuaAryy`, and `mailto:joshuaaryy@gmail.com`. Resume navigates to `/resume` at desktop and narrow widths. At 390px the header utility group is hidden; the mobile contact row appears after the Home content and provides visible, focusable GitHub, LinkedIn, Email, and Resume links with 44px hit areas. The document width remains 390px.
- **Lobby Back:** the circular Back-to-Home link appears beside the heading on all four desktop lobby routes and on narrow Experience. At desktop Experience it occupies x=30–60 while the heading starts x=112; at 390px it occupies x=13–43 while the heading starts x=95. No overlap was measured. Confirm Education reached `/education`; activating Back returned to `/home`.
- **Marks:** Living in Silico and Stush Patties marks load with `object-fit: contain` inside circular, overflow-clipped medallions at desktop and narrow Experience. The Joshua portrait loads with `object-fit: cover` and is clipped by the same circular medallion. No broken image was observed.
- **Errors and overflow:** no page, console, same-origin request, or HTTP errors were recorded. Document width matched the viewport on Home and Experience narrow, and all checked desktop lobby routes.

The runtime checks found no required correction. Owner visual review is still appropriate for the new Home preview-panel composition and circular lobby Back affordance before freezing those design additions; this report verifies rendered behavior/placement, not pixel-level Figma approval.

## Evidence

Screenshots: `home-desktop-initial.png`, `home-desktop-mode-{projects,experience,hackathons,education}.png`, `home-narrow-initial.png`, `home-narrow-mode-{projects,experience,hackathons,education}.png`, `lobby-{projects,experience,hackathons,education}-desktop-direct.png`, `lobby-education-desktop.png`, `lobby-education-narrow.png`, `lobby-experience-narrow.png`, `home-narrow-bottom-utilities.png`, `resume-utility-1920.png`, and `resume-utility-390-afterwait.png`.

Measurements and interactions: `results.json`, `narrow-contact-results.json`, and `resume-utility-route-results.json`. The delayed narrow Resume route confirmation is recorded in `resume-utility-390-afterwait.json`.
