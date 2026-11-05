# Pass B Runtime QA

**Result:** core interactions and media behavior pass on the initial Pass B worktree render. No source changes were made by QA.

> **Superseded findings:** the initial 390px Education/Help header overlap and Journey scroll-ownership notes below were corrected and rerendered on 2026-10-05. The final header, native scroll, PATH, and connector results are in [the follow-up report](FOLLOWUP-2026-10-05.md); use it as the current result for those areas. The Profile, Highlights, and Demos evidence below remains the relevant first-pass record.

## Environment

- Local preview: `http://127.0.0.1:4174/`
- Playwright 1.63.0 with installed Chrome 153 (headless)
- Viewports: 1920×1080 Journey, 1440×1000 desktop, 390×844 narrow
- Fresh pages reset `window.scrollY`, `main.scrollTop`, and nested scroll positions before initial captures.

## Profile

- **Pass:** neutral state on entry; preview region is hidden and has no heading. All four signals show counts `4 / 2 / 1 / 2028`.
- **Pass:** each signal preview appears on hover/focus. Keyboard focus transfers from Projects to its Food Tracker case-study link while the preview stays mounted. Tabbing out of the overview hides the panel at desktop and 390px.
- **Pass after frontend correction:** CE medallion no longer intersects `Computer Engineering` at 390px. Trait medallion labels now sit below the icons with 6–8px measured separation at 390px and about 7px at desktop. Food Tracker mark is loaded with `object-fit: contain`; no clipping observed.
- **Pass:** signal row is below the hero, with roughly 100px of separation in the desktop and narrow layouts. No document-width overflow.
- **Gap:** at 390px the primary-navigation `EDUCATION` label is visibly truncated/covered by the avatar area despite no horizontal document overflow.

## Journey

- **Pass at 1920px:** the zigzag line and connectors meet milestone cards; Apple connector right edge is x=799.31 and the card begins x=799.31. Ten scale-compensated milestone ellipses render about 5.9×6.4px and read as compact nodes.
- **Pass:** PATH rail has five locators. Choosing Stush Patties sets `#journey-stush`, marks it `aria-current="location"`, and scrolls to the card. Wheel scrolling works in the single Journey scrollport.
- **Pass at 390px:** browser page scrolling works through the journey with no second scroll region and no width overflow.
- **Responsive behavior observed:** at 1440px the content container falls into its compact stacked-card layout and hides the horizontal connectors. The 1920px layout retains the full zigzag/connector treatment.

## Personal Highlights

- **Pass:** all seven selected local images loaded and decoded at 1440×1000 and 390×844; each uses `object-fit: cover`. Document width equals viewport at both sizes.
- The 390px fresh capture shows the full gallery without horizontal overflow. The event image includes visible lanyard badges; no readable personal detail was apparent at rendered size, but the owner should make the final privacy call on that image.

## Demos

- **Food Tracker:** shows `DEMO PENDING`, uses the real still image, and has no video, iframe, or play affordance at desktop/narrow.
- **Crest:** Play inserts the YouTube no-cookie iframe; playback visibly advanced to 0:01 of 1:45.
- **Cho'Veigo:** remains a static Recommendations capture with no video/iframe or play control.
- Local React/page errors and local broken image requests: none observed. The Crest embed generated failed third-party YouTube telemetry/subtitle/avatar requests in headless Chrome while the actual video continued playing.

## Accessibility and manual review

Keyboard focus and the Profile hover/focus/reset paths were exercised. No live screen-reader test was performed. A manual NVDA or Narrator pass remains: navigate headings and landmarks; inspect signal names/counts and expanded-state announcements; follow Projects to Food Tracker; verify the Journey PATH current-location announcement; and confirm all demo controls and player controls have usable names and focus order.

## Evidence

- Profile fresh captures: `profile-desktop-updated.png`, `profile-desktop-signals-final.png`, `profile-narrow-top-final.png`
- Profile interaction/geometry: `profile-current-interactions.json`, `profile-highlights-final-rerender.json`
- Journey: `journey-desktop-1920-top.png`, `journey-narrow-reset.png`, `journey-scroll-results.json`
- Highlights: `highlights-desktop-reset.png`, `highlights-narrow-reset.png`
- Demos: `demos-food-desktop.png`, `demos-food-narrow.png`, `demos-crest-playing.png`, `demos-choveigo-static.png`, `media-results.json`
