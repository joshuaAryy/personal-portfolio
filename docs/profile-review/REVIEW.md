# Profile Signals Review — 2026-09-30

The owner-selected behavior is static with respect to main-page navigation: the signal counts do not navigate or pin another panel. Projects, Experience, Hackathon, and Academics each preview their own hover/focus overlay, returning to the default Projects state when pointer or focus leaves the Profile overview.

The approved layout still has four equal Projects sectors. Cho'Veigo's current match-path mark public/media/profile/choveigo-mark.svg is canonical and frozen after direct inspection of Figma 3297:45/54/63/72; its converging paths, match diamond, and job-document endpoint remain distinct at 26/40/50px. No project-mark decision remains open. Keep the historic capture below labeled as pre-mark evidence, not current identity proof.

## Visual evidence

- Historical Figma Projects-state capture: [`profile-projects-overlay-2026-09-30.png`](profile-projects-overlay-2026-09-30.png), 1106?642, SHA-256 `C95168B5869466F9E3CE3D314D8573DE28C478240B89EA4E9C5A524D5FDCC07E`. This capture predates integration of the canonical Cho'Veigo mark; it shows the four equal sectors and fixed counts but is not current mark or website proof.
- Prior site Projects capture: [`profile-projects-overlay-2026-09-29.png`](../site-render-review/profile-projects-overlay-2026-09-29.png), 1106×642, SHA-256 `46F79A42D8623E58405C405695B26EB2AB5D6A8E32A7BCBB9DB0EE6B0044A8F4`. This predates the Figma logo update and is not current website visual proof.
- The former `projects-overlay-current-2026-09-29.png` capture showed an empty Projects panel despite its later timestamp. It has been renamed [`projects-overlay-empty-panel-stale-2026-09-29.png`](projects-overlay-empty-panel-stale-2026-09-29.png) so it cannot be mistaken for a current state.

The live Figma update has been directly inspected. Website render synchronization, responsive acceptance, and browser interaction review remain open. The base Profile composition stays anchored to Figma `960:2`.

## Live side-by-side state review - 2026-09-30

The current Profile page (`510:20`) contains a visible review-only strip at `3285:45`, titled `REVIEW ONLY · Profile Signal States · Projects | Experience | Hackathon | Academics`. It is 4552x740 at x=0/y=2200. Its four visible 1090x330 state cards are Projects `3285:47`, Experience `3285:341`, Hackathon `3285:563`, and Academics `3285:789`; all fit without clipping or scroll. The exact-size capture is [`profile-signal-states-3285-45-20260930.png`](profile-signal-states-3285-45-20260930.png).

Production frame `960:2` remains unchanged at 1920x1080 with clipping enabled and `overflowDirection: NONE`. The capture [`profile-root-live-960-2-20260930.png`](profile-root-live-960-2-20260930.png) shows the Projects default view and the four summary categories side by side. Existing prototype reactions remain on the Journey and Demos navigation tabs. In implementation, [`ProfileOverview.tsx`](../../src/ProfileOverview.tsx) retains the four hover/focus buttons; the preview resets to Projects when neither hover nor focus is active. The review strip is a static visual comparison of the four states.

Home audit: active frame `2252:3445` still shows its approved mountain environment `2356:514` and shell `2356:611`; the 1920x1080 root clips with `overflowDirection: NONE`, and filter thumb `2356:602` is hidden. No background, shell, or page-scroll correction is indicated by the current capture [`home-active-before-icon-refinement-20260930.png`](../case-study-review/home-pass-03/home-active-before-icon-refinement-20260930.png). No Figma or code changes were needed.
