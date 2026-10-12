# Deployed Home follow-up — immutable Preview `85f11ce1`

Target: [85f11ce1 Preview](https://85f11ce1.joshuaik2.pages.dev/)  
Application source reported for this Preview: `958b4cd783ebbc7416668351a256f5c4bf298e7e`.  
Browser: installed Google Chrome via Playwright. Read-only; no source or deployment changes.

## Findings

- **Four Home modes — visually verified at 1440×900 and 390×844:** I clicked Projects, Experience, Hackathons, and Education in sequence. The active selection changed each time, and each mode showed its own descriptive line plus specific preview information. On desktop the selected description flows directly into the secondary preview: Projects’ description ends at y=534.1 and `PROJECT AREAS` begins at y=534.1; Experience uses `RESEARCH + DATA SYSTEMS` and the two experience entries; Hackathons shows the Crest/Brim challenge result; Education shows the degree and four selected builds. The same content hierarchy appears on narrow screens without a detached gap.
- **Narrow action reachability:** at 390×844, the initial Confirm control falls partly below the first viewport for all modes. Natural page scrolling brings it fully into view. Scroll offsets to the resulting viewport were 30 px for Projects and Experience, 146 px for Hackathons, and 163 px for Education. The Education bottom capture shows the selected details, Confirm/Back, and utility footer in one usable scrolled view.
- **Home Activity identities — visually verified on desktop:** the rail shows Living in Silico’s circular image and Stush Patties’ green mark, using `living-in-silico-logo.png` and `stush-patties-logo.png`. Portfolio and Activity J marks load the same `canonical-lockup.png`; the 48 px Activity rendering uses the existing brightness compensation. No stale or mismatched identity was visible. The Activity rail is not displayed at 390 px, where the mobile header/footer treatment is used.
- **Runtime:** 0 page/console errors, failed requests, or HTTP errors across the checked Preview renders.

## Evidence

Desktop state captures: `preview-home-{projects,experience,hackathons,education}-1440x900.png`.  
Narrow state captures: `preview-home-{projects,experience,hackathons,education}-390x844.png`.  
Narrow scrolled-to-action captures: `preview-home-{projects,experience,hackathons,education}-390x844-bottom.png`.  
`deployed-home-review.json` contains the active-mode, content, viewport, Activity asset, and runtime observations; `deployed-home-review.cjs` and `deployed-home-mobile-scroll.cjs` are the read-only capture scripts. The report and captures are in the workspace QA folder `C:\oc03\docs\site-render-review\2026-10-12-banner-resume-identity-convergence\qa-958b4cd`; the full PNG set and machine-readable capture log remain local to avoid adding a large screenshot bundle to the repository.
