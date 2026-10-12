# Deployed Preview verification — 95fca4c1

**Preview:** https://95fca4c1.joshuaik2.pages.dev/
**Application source:** `42069c0261434c8ba4fab3d0a6ece7208d6d4512`
**Cloudflare deployment:** `95fca4c1-b0dc-446f-ad39-615970b25242`
**Environment / branch:** Preview / `feat/portfolio-integration`
**Browser:** installed Google Chrome via Playwright.

Wrangler's deployment listing maps source prefix `42069c0` to this Preview deployment. The served CSS and JavaScript were also hashed and matched byte-for-byte with the local build.

## Results

- Home, Projects, Experience, Hackathons, Education, Profile, Resume Found, Resume Viewer, and Food Tracker returned HTTP 200 at desktop and 390px narrow entry points.
- No console/page errors, failed requests, HTTP errors, broken loaded images, or horizontal overflow were recorded.
- All lobby groups remained centered. Projects had no side `+` controls; the three category lobbies kept their controls centered to the banner group. On narrow screens, controls are hidden and layouts scroll naturally.
- The Profile identity and four signal groups fit at 1280×720; the narrow page scrolls vertically.
- Resume Found's 306° channel completed and stayed visible. Close began at the composition edge (0px gap in the deployed capture) and remained fully visible at desktop and narrow sizes. The plasma asset loaded. Reduced motion displayed the full ring without active animation. Escape/focus restoration, Close, and View Resume worked from the modal and direct route.
- All four Food Insights gallery images loaded after scrolling the gallery into view. The desktop gallery is two columns; the narrow gallery stacks into readable rows. The forecast image is identified as an owner design reference.
- Resume Viewer exposed its PDF frame and Download/Open Fullscreen controls at both viewport sizes.

### Served bundles

| Asset | Bytes | SHA-256 | Local build match |
|---|---:|---|---|
| `index-Bkybm2RZ.js` | 518,608 | `5EFEEE941C32E0DE3A5D340E44DAE6956F3DE1F83A140D75768E7D1517EBF6A9` | Yes |
| `index-9oGfhB5h.css` | 503,365 | `0AD693BE35CAB1C7D003FE6AEB900153D891E521BA08DD7AD555FCC83C71DB32` | Yes |

## Selected deployed captures

These images were captured from the immutable Preview in installed Chrome:

- Home: [1440×900](home-1440x900.png)
- Lobbies: [Projects](projects-1440x900.png), [Experience](experience-1440x900.png), [Hackathons](hackathons-1440x900.png), [Education](education-1440x900.png)
- Profile: [1280×720](profile-1280x720.png)
- Resume Found: [1440×900](resume-1440x900.png), [390×844](resume-390x844.png), [reduced motion](resume-reduced-1440x900.png)
- Resume Viewer: [390×844](resume_viewer-390x844.png)
- Food Insights gallery: [1440×900](food-gallery-visible-1440x900.png), [390×844](food-gallery-visible-390x844.png)

## Captures

`deployed-qa.json` contains route/layout measurements and browser checks for the deployed state.
