# Owner review Preview — 2026-10-05

## Deployment

- Environment: Cloudflare Pages **Preview**
- Project: `joshuaik2`
- Feature branch: `feat/portfolio-integration`
- Immutable Preview: <https://c531bea7.joshuaik2.pages.dev>
- Branch alias: <https://feat-portfolio-integration.joshuaik2.pages.dev>
- Deployed application commit: `3f9c741247cff2994ea3df1adfaa280f4702a233` (`feat: present Resume Found as a takeover`)
- Cloudflare deployment ID: `c531bea7-2de9-44a7-a120-a804d089cac2`
- The build ran from a clean detached worktree at the deployed commit. `npm run build` passed. The production environment was not targeted.

## Included surfaces

Opening; Home shell, mode navigation and utilities; Projects, Experience, Hackathons and Education lobbies; Resume Found and Resume Viewer; Profile; Journey; Demos; Personal Highlights; Education projects; and the six long-form stories for Food Tracker, Cho'Veigo, Crest, Fraymakers, Living in Silico and Stush Patties.

## Preview smoke verification

- Chrome/Playwright checked 19 direct routes at 1920×1080 and 9 routes at 390×844 (28 route/viewport checks). Every route returned HTTP 200 and mounted application content.
- Checked all page images after forcing offscreen lazy images to load: zero broken images.
- Zero same-origin failed requests, same-origin 4xx/5xx responses, console errors or page errors.
- No horizontal overflow at either checked width.
- At desktop and narrow widths, the Resume utility opened `/resume` over the originating Home route. The background was inert and hidden from assistive navigation; Escape returned to `/home`. The local source check also verified Close and focus restoration.
- Home captures were visually inspected at desktop and narrow widths; the Home mode controls, utility area and narrow layout were usable.

Evidence: [desktop Home](home-desktop-1920.png), [narrow Home](home-narrow-390.png), [machine-readable smoke report](smoke-report.json).

## Review notes

- **Opening:** deployed React keeps the previously verified 2-second sequence. The live Figma Opening frame `2025:2` has since been retimed to 3.5 seconds; that latest Figma motion is not yet synced into this React build. Review the current page as implemented and treat exact motion parity as pending.
- **Demos:** Crest video plays. Food Tracker uses authentic still evidence while its canonical demo video is pending. Cho'Veigo remains a safe static Recommendations capture pending an available privacy-safe video.
- **Education projects:** the ALU/FSM section uses verified source detail. Dental remains in progress; Bookstore and CMOS implementation details remain evidence-pending.
- **J identity:** the deployed portfolio retains archive J `159:2`. Candidate 05 is a separate directional study and was not promoted or integrated.
- Live screen-reader interaction remains a separate manual validation item.

This Preview is prepared for owner review; deployment verification does not imply visual acceptance or production release.