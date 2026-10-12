# Owner Correction Pass 05 — Review Checkpoint

**State:** REVIEW CHECKPOINT READY; the persistent portfolio goal remains active.
**Feature branch:** `feat/portfolio-integration`
**Application source:** `42069c0261434c8ba4fab3d0a6ece7208d6d4512`
**Immutable Preview:** https://95fca4c1.joshuaik2.pages.dev/
**Cloudflare deployment:** `95fca4c1-b0dc-446f-ad39-615970b25242`, Environment `Preview`, branch `feat/portfolio-integration`, source `42069c0`.

This review build supersedes the previous Preview `https://c954078d.joshuaik2.pages.dev/`. Production was not targeted.

## Correction ledger

| Surface | Result | Notes |
|---|---|---|
| Category lobbies | **IMPLEMENTED + VISUALLY VERIFIED** | Banner sizing now responds to both viewport height and width while keeping slender proportions and the approved centered group. Background framing and horizontal centering were preserved. Projects has no side `+` controls; Experience, Hackathons, and Education retain midpoint controls. Chrome reviewed all four routes at 1920×1080, 1440×900, 1440×720, 1280×720, 2560×1080, and 390×844. |
| Profile Overview | **IMPLEMENTED + VISUALLY VERIFIED** | The short-desktop identity banner moves down 12px without changing its 493:1201 ratio. The whole ornate tip is visible at 1280×720; 1920×1080 is unchanged and 390×844 remains vertically scrollable. Signals and traits remain intact. |
| Resume Found | **IMPLEMENTED + VISUALLY VERIFIED; OWNER REVIEW OPEN** | The existing middle-ring fill now includes a separate V8 plasma texture clipped by the same annular, progress, and plate-gap masks. The completed 306° fill remains visible; reduced motion presents the completed state. Close moved from 97.8% to the composition boundary so the outer gold arc ends above its control. Chrome verified 1440×900, 390×844, and 1280×720, beginning/partial/completed states, Escape, focus restoration, Close, View Resume, and reduced motion. The owner should judge whether the restrained material treatment is visually strong enough. |
| Food Tracker Insights gallery | **IMPLEMENTED + VISUALLY VERIFIED** | The owner-provided Calorie Forecast crop replaces Calorie Trend. It keeps the solid history, Today marker, dotted forecast, and uncertainty band while removing the black desktop surround. The four equal gallery frames present Macro Composition, Calorie Forecast, Fiber trend, and Daily completeness with concise feature captions and no visible capture-provenance paragraph. The forecast remains identified as design evidence rather than a shipped runtime capture. |
| Food Tracker demo video | **NOT CHANGED — AUTHENTIC MEDIA NOT AVAILABLE** | No authentic Food Tracker demo was found in the reviewed local media/source set. This is a separate future item; no video was fabricated. |
| Other approved surfaces | **PRESERVED — OWNER APPROVED** | Home, Opening/J, case-study narratives, Journey, Highlights, Resume Viewer, original Cho’Veigo demo, and unrelated assets were not redesigned in this pass. |

## Visual evidence

### Lobbies

Representative matched before/after renders:

- Projects, 1440×900: [before](qa-958b4cd/height-aware-refinement-final/before-projects-1440x900.png) · [deployed after](qa-deployed-95fca4c1/projects-1440x900.png)
- Experience, 1440×900: [before](qa-958b4cd/height-aware-refinement-final/before-experience-1440x900.png) · [deployed after](qa-deployed-95fca4c1/experience-1440x900.png)
- Additional deployed states: [Hackathons 1440×900](qa-deployed-95fca4c1/hackathons-1440x900.png), [Education 390×844](qa-deployed-95fca4c1/education-390x844.png).

The complete route/viewport measurements are in [the integrated Chrome report](qa-integrated-final-20261012/qa-report.md) and [JSON matrix](qa-integrated-final-20261012/qa-report.json).

### Profile

- 1280×720: [before](qa-958b4cd/profile-fit-final/before-profile-1280x720.png) · [after](qa-integrated-final-20261012/profile-1280x720.png)
- Narrow-height desktop, 1280×720: [before](qa-958b4cd/profile-fit-final/before-profile-1280x720.png) · [deployed after](qa-deployed-95fca4c1/profile-1280x720.png)

### Resume Found

- Close clearance, 1440×900: [before](qa-958b4cd/resume-close-clearance-followup-20261012/before-1440x900.png) · [after](qa-958b4cd/resume-close-clearance-followup-20261012/after-1440x900.png)
- After: [beginning 36°](qa-resume-close-clearance-20261012/resume-1440x900-36deg.png), [partial 153°](qa-resume-close-clearance-20261012/resume-1440x900-153deg.png), [completed 306°](qa-resume-close-clearance-20261012/resume-1440x900-306deg.png), [reduced motion](qa-resume-close-clearance-20261012/resume-1440x900-reduced.png), [narrow completed](qa-resume-close-clearance-20261012/resume-390x844-306deg.png), and [short-desktop completed](qa-resume-close-clearance-20261012/resume-1280x720-306deg.png).
- Full-state evidence: [Close-clearance Chrome report](qa-resume-close-clearance-20261012/qa-report.md) and [before/after geometry report](qa-958b4cd/resume-close-clearance-followup-20261012/README.md).

### Food Tracker

- Desktop gallery: [before](../2026-10-12-food-insights-gallery/before-desktop-1440x900.png) · [after](../2026-10-12-food-insights-gallery/after-desktop-1440x900.png)
- Narrow gallery: [before](../2026-10-12-food-insights-gallery/before-narrow-390x844.png) · [after](../2026-10-12-food-insights-gallery/after-narrow-390x844.png)

## Verification

- Full test suite: **312 tests across 31 files passed**. Happy DOM prints known iframe/PDF fetch-abort teardown diagnostics while the run exits successfully.
- `npm run build`: passed. Existing Vite advisory remains for the 518.61 kB JavaScript bundle.
- `git diff --check`: passed.
- Preview bundle SHA-256 matches the local build: CSS `0AD693BE35CAB1C7D003FE6AEB900153D891E521BA08DD7AD555FCC83C71DB32`; JavaScript `5EFEEE941C32E0DE3A5D340E44DAE6956F3DE1F83A140D75768E7D1517EBF6A9`.
- Preview routes `/`, `/projects`, `/experience`, `/hackathons`, `/education`, `/profile/overview`, `/resume`, `/resume/viewer`, `/projects/food-tracker`, and `/projects/choveigo` returned HTTP 200.
- Installed-Chrome Preview verification is recorded at [the deployed QA report](qa-deployed-95fca4c1/qa-report.md).

The deployed JavaScript and CSS match the build from application source `42069c0`. The Preview is an owner-review checkpoint, not overall portfolio completion. Live screen-reader interaction remains a manual follow-up; Food Tracker demo footage remains a separate authentic-media dependency. Preserve the immutable Preview for review; later work should use a new source revision and Preview.

## Remaining manual screen-reader review

No live screen-reader interaction has been performed; Chrome keyboard and accessibility-tree checks do not substitute for this pass. On the Preview, use Windows Narrator with Chrome and:

1. On Home, navigate the main mode controls, LinkedIn, GitHub, Email, Resume, Activity links, and Help. Confirm names and roles are announced clearly.
2. Open contextual Help, listen to its instructions, press Escape, and confirm focus returns to Help.
3. Open Resume Found. Confirm the dialog is announced, focus stays within it, Escape closes it and restores the originating control, View Resume opens the viewer, and Close returns to the originating page.
4. On Profile Overview, keyboard-focus Projects, Experience, Hackathon, and Academics. Confirm each signal's name/count and associated preview are announced; move focus away and confirm the neutral state returns.
5. On a representative case study and Demos, navigate headings and landmarks, then inspect the video player's accessible name and keyboard controls for play/pause/seek.
6. Repeat the Help, Resume, Profile, and media checks at a narrow viewport (390×844). Record any missing, duplicate, clipped, or out-of-order announcements.

The authentic Food Tracker demo remains unavailable; use the current truthful still-image evidence until the owner supplies a real recording. The immutable Preview remains open for owner review; this checklist and checkpoint do not mark the portfolio goal complete.
