# Home feedback recheck — Preview `95fca4c1`

**Preview:** https://95fca4c1.joshuaik2.pages.dev/
**Application source:** `42069c0261434c8ba4fab3d0a6ece7208d6d4512`
**Browser:** installed Google Chrome via Playwright.

This recheck resolves older feedback about Home Activity identities and secondary mode previews. The latest app-source commit `42069c0` changes lobby, Profile, and Resume files only; Home behavior is unchanged from the prior owner-verified mode review.

## Mode preview spacing

Projects, Experience, Hackathons, and Education were selected on the deployed Preview at 1440×900 and 390×844. Each selection changed its heading and relevant preview content. The secondary heading begins at the exact bottom edge of the primary description in all eight rendered states:

| Viewport | Description bottom | Secondary heading top | Gap | Secondary content |
| --- | ---: | ---: | ---: | --- |
| 1440×900 | 534.1px | 534.1px | 0px | Project Areas / Research + Data Systems / Challenge Build / Degree + Four Selected Builds |
| 390×844 | 635.8px | 635.8px | 0px | Same four mode-specific previews |

This verifies the previous “selected-mode detail sits too low” report against the current Preview. Narrow Home scrolls naturally to the remaining preview/action content; the document remains 390px wide with no horizontal overflow.

## Activity identity consistency

At desktop size, Home's Activity rail uses `living-in-silico-logo.png` and `stush-patties-logo.png`, matching the Experience lobby identities. The Portfolio J in the Activity rail uses the same canonical Sonnet V8 lockup as the top-left Portfolio brand. The Activity rail is hidden at the narrow breakpoint, where the compact header/footer is shown instead.

## Help and X utility recheck

At 1440×900, the Help control had the same 70×30px bounds at the same header/footer position on Home, Projects, Experience, Hackathons, Education, Profile Overview, Food Tracker, and Resume Viewer. At 390×844, the compact Help control opens its contextual overlay; Escape closes it and restores focus to Help.

The X action uses `https://x.com/Cartizionplane` with `target="_blank"` and `rel="noopener noreferrer"`. In the 390×844 Home layout, its Activity-rail placement is below the initial viewport and reachable by natural page scrolling; an additional responsive copy is visually hidden. Clicking the link opened a new tab in headless Chrome, but X rendered as `chrome-error://chromewebdata/`; a direct automated fetch returned HTTP 403. The configured destination is verified, while external profile rendering could not be verified in this network environment.

## Runtime and captures

All eight selected states loaded with zero console/page errors, failed requests, or HTTP errors. The captures show each mode on desktop and narrow layouts:

- Projects: [1440×900](preview-home-projects-1440x900.png) · [390×844](preview-home-projects-390x844.png)
- Experience: [1440×900](preview-home-experience-1440x900.png) · [390×844](preview-home-experience-390x844.png)
- Hackathons: [1440×900](preview-home-hackathons-1440x900.png) · [390×844](preview-home-hackathons-390x844.png)
- Education: [1440×900](preview-home-education-1440x900.png) · [390×844](preview-home-education-390x844.png)

No Home implementation change was needed; the current Preview already contains the correction. This evidence is a reconciliation of prior feedback, not a new design pass.
