# Owner correction review checkpoint — 2026-10-11

## Deployed source

- Branch: `feat/portfolio-integration`
- Application source: `17057f9efedc3139f70a3ece6cc09217578acdef`
- Immutable Preview: [5d314ec5](https://5d314ec5.joshuaik2.pages.dev/)
- Cloudflare deployment: `5d314ec5-a913-4ce2-94d5-5264223ef9d5`, Preview environment, feature branch
- Production: not targeted

The Preview was built from a clean export of the committed application source; it does not include the preserved untracked J-study assets.

## Correction ledger

| Surface | Result | Evidence / notes |
|---|---|---|
| Projects, Experience, Hackathons, Education lobbies | **Implemented + visually verified; owner review open** | Centered, capped banner groups; symmetric desktop balance controls; narrow-screen balance controls hidden to keep the heading clear. Before/current comparisons use the historical 6dc captures and current renders in [the lobby restore report](../2026-10-11-lobby-historical-restore/README.md). Current matrix includes 1920×1080, 1440×900, 1440×720, 2560×1080 and 390×844. |
| Resume Found | **Implemented + visually verified; owner review open** | Standalone canonical J, scaled mechanism, title in the inner scene, bounded persistent cyan annular channel, View Resume in the attached plate, Close attached at the outer-ring base. Current desktop states: [beginning](resume-desktop-1440x900-begin.png), [partial](resume-desktop-1440x900-partial.png), [complete](resume-desktop-1440x900-full.png); narrow: [390×844 complete](resume-narrow-390x844-full.png), [320×740 complete](resume-small-320x740-full.png). Compared against the supplied owner beginning and completed references in `C:\Users\samue\Downloads\portfolio-owner-references\Resume_Found_Progress_*_Owner_2026-10-11.png`. |
| Resume Viewer header | **Implemented + visually verified** | Reuses the shared portfolio header and removes the boxed route-specific plaque. Current: [desktop](resume-viewer-1440x900.png), [narrow](resume-viewer-390x844.png); compared against `C:\Users\samue\Downloads\portfolio-owner-references\Resume_Viewer_Header_Owner_2026-10-11.png`. PDF, download, and fullscreen actions remain available; the narrow page scrolls vertically without horizontal clipping. |
| Shared J appearance / Activity | **Implemented + visually verified; owner review open** | Header and Activity use the same canonical lockup; respective sizes are 54px and 48px. Their CSS filters differ, but the rendered Chrome comparison shows comparable apparent brightness. Capture: `%TEMP%\portfolio-preview-5d314ec5-final\j-identity-home-desktop.png`. |
| Projects central owner banner | **Implemented + visually verified** | Uses the shared owner portrait; current [Projects desktop render](lobby-projects-desktop-1920x1080.png). |
| Cho’Veigo original demo | **Preserved + verified** | Original unchanged; 32,915,943-byte response, SHA-256 `1C637A4AD7A197D7073DA88534CF8D54B660C85DF16B75FA25F955D16E94C801`, HTTP range support, 112.638333s duration, native playback/seek and audio enabled. |
| Opening, Home, Profile, Journey, case studies, and other approved content | **Preserved — not reopened** | No application edits to these owner-approved directions in this bounded correction. |

## Verification

- Full suite: **305 tests across 31 files passed**.
- `npm run build`: passed; existing Vite chunk-size advisory remains.
- `git diff --check`: passed.
- Deployed JS and CSS SHA-256 match the clean build: `E5C576FEC09126EDA6C80C6C9F906D0591F08CF8D1AA10A80BADD366F91F8506` and `6794602F225EC759A41F456E778BB50DD685D35B1EE5B95C96000162C6617ECE`.
- Seven direct routes returned HTTP 200 at desktop and narrow sizes. Deployed checks found no broken images, failed requests, console/page errors, or horizontal overflow.
- Resume focus trapping, Escape, Close restoration, View Resume, PDF display and download were exercised in Chrome.
- Exact screenshots, geometry notes and deployed response details are in [the Runtime QA report](runtime-qa-followup/qa-report.md). Large browser captures remain uncommitted review artifacts.

## Still open

- Owner review of this immutable Preview; this is **REVIEW CHECKPOINT READY**, not completion of the persistent portfolio goal.
- Manual live screen-reader interaction remains unverified. Follow-up steps: use NVDA or Narrator with keyboard-only navigation; traverse Home utilities/Activity and the Resume Found modal; verify landmark/name/role/state announcements, focus order, trapped focus, Escape/Close restoration, and the PDF controls. Record the screen reader and browser versions and any announcement/focus discrepancy.
- Food Tracker still has no authentic demo video; it was not fabricated and was outside this correction.
- Existing Vite advisory: main JS chunk is approximately 519 kB.

No production deployment occurred. Historical candidates, untracked review artifacts, and the separate Opening/J work were preserved.
