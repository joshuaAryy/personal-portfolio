# Phase B staging render

Exact deployed source: `d9101c8870baa635e8fb9964f52e25bd59b18084`, exported using `git archive` into a fresh temporary directory. Locked dependencies installed; TypeScript/Vite build passed with 79 modules. Deployment: Preview branch `feat/portfolio-integration`, immutable `https://ede7aa0a.joshuaik2.pages.dev/`, alias `https://feat-portfolio-integration.joshuaik2.pages.dev/`, ID `ede7aa0a-3635-4612-ba94-409de6eda2bf`. Wrangler read-only deployment listing confirmed source/environment/branch. Three assets uploaded, 146 cached; primary production untouched. Previous Preview `6accc70` is superseded as current staging.

Actual Chrome 153.0.8010.53, existing Playwright, 1920×1080, DPR 1. Rendered `/profile/journey`, scrolled to the bottom, rendered `/education/projects`, then clicked the Education lobby CTA. Both CTA placements exist and point to the dedicated route; the tested click reached it. No page errors. Browser geometry: Journey main/layout/field y82; scroller y164, height878, total1857. These measurements and captures reproduce the local Phase B review on deployed source.

Mingo visually inspected the lower Journey and Education captures. Lower Void atmosphere continues through the final Journey card; Education is the intended restrained four-project skeleton. This is bounded source-sync evidence, not whole-site parity or owner acceptance. Education detailed technical content/Figma design, responsive checks, remaining browser queue, and all six story expansions remain open. J is owner-gated and unchanged.

- [Journey top](journey-top.png)
- [Journey bottom](journey-bottom.png)
- [Education skeleton](education-projects.png)
- [Browser metadata](evidence.json)
