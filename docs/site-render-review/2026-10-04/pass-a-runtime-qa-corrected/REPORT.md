# Pass A Corrected Source — Runtime QA

**Date:** 2026-10-04
**Browser:** Installed Google Chrome controlled by local Playwright (`channel: chrome`)
**Viewports:** 1440×900 desktop; 390×844 narrow
**Target:** corrected Pass A preview at `http://127.0.0.1:4173/`

## Results

- **Resume Found, desktop — Pass:** takeover is centered in the main content over the dimmed portfolio shell. The environment scene and J medallion are separate nested layers (70% and 46% of the 530px mechanism); the scene remains visible around the J. `resume-found-entry` runs for 680ms on the scene and 620ms on the medallion. Under `prefers-reduced-motion: reduce`, both animations resolve to `none` (computed duration `0.00001s`). `VIEW RESUME` reaches `/resume/viewer`; Escape returns to `/home`.
- **Resume Found, narrow — Pass:** rendered at 390px with no horizontal overflow or broken images. `CLOSE` returns to `/home`.
- **Home modes — Pass:** all four modes can be selected and Confirm reaches `/projects`, `/experience`, `/hackathons`, and `/education`. Explore/Curated/Recent/About are absent. LinkedIn and GitHub use the verified profile URLs; Email uses `mailto:joshuaaryy@gmail.com`; Resume opens `/resume`.
- **Lobby composition — Pass for checked details:** Projects has no side `+` slots; Experience, Hackathons, and Education each render both. Project medallions measured 88×88px (1:1). No horizontal overflow at desktop. Captured desktop renders are available for comparison with the current Figma captures listed below.
- **Narrow header bounds — Fail:** Help spans x=302–350px and the avatar x=340–382px, overlapping by 10px at 390px. The document itself remains 390px wide; no horizontal overflow.
- **Redundant Resume control — discrepancy:** at 1440px, Projects, Experience, Hackathons, and Education show both a `header-resume` primary-nav link and a `header-client-tool` Resume utility link. This duplicates the top-right utility called for by the owner and is absent as a duplicate in the captured Figma header. Home shows the utility link without the primary-nav Resume item.
- **Console/network/assets:** no app page errors, HTTP failures, or broken images observed on the checked views. The only request failure was Chrome’s internal PDF viewer extension stylesheet (`chrome-extension://…/pdf_embedder.css`) during the resume viewer flow; it is browser-extension noise, not a portfolio asset. No horizontal overflow at the measured desktop/narrow checkpoints.
- **Accessibility:** Playwright accessibility snapshots for Home, Resume Found, Projects, Experience, Hackathons, and Education are in `accessibility-snapshots.txt`. A live screen-reader pass was not performed.

## Interactions exercised

Selected and confirmed each Home mode; opened Resume Found; followed View Resume into the viewer; returned and tested Escape close; opened Resume Found at narrow width and tested Close; checked reduced-motion preference; inspected header utility destinations and mode names; captured each category lobby.

## Evidence

New screenshots in this folder:

- `home-desktop.png`, `home-narrow-final.png`
- `lobby-projects.png`, `lobby-experience.png`, `lobby-hackathons.png`, `lobby-education.png`
- `resume-entrance-80ms.png`, `resume-desktop-final.png`, `resume-narrow-final.png`
- `resume-viewer.png`, `resume-escape-close.png`, `demos-desktop.png`
- `qa-results.json`, `accessibility-snapshots.txt`

Figma comparison captures from the preceding QA folder:

- `../pass-a-runtime-qa-final/figma-projects-511-2.png`
- `../pass-a-runtime-qa-final/figma-experience-704-2.png`
- `../pass-a-runtime-qa-final/figma-hackathons-730-3316.png`
- `../pass-a-runtime-qa-final/figma-education-738-3316.png`
- `../pass-a-runtime-qa-final/figma-resume-2407-176.png`

## Manual screen-reader steps remaining

With NVDA + Firefox or NVDA + Chrome, navigate Home by landmarks and headings; verify the four mode buttons’ accessible names, selected state changes, and Confirm destination announcement; tab through utility links and verify Email/Resume names. Open Resume Found, verify its heading and action names/order, use View Resume and return, then test Close and Escape. Repeat at narrow viewport and confirm focus stays visible and ordered. Repeat the key checks in VoiceOver + Safari if that browser is part of the supported target.
