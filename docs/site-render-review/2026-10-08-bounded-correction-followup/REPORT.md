# Bounded owner-correction follow-up — review checkpoint

**Status:** REVIEW CHECKPOINT READY; the persistent portfolio goal remains active.

| Item | Value |
|---|---|
| Application source | `782c524c6f6883f74c2ccc96a610338acc576929` (`fix: converge bounded owner corrections`) |
| Branch | `feat/portfolio-integration` |
| Immutable feature Preview | <https://f74ffd5d.joshuaik2.pages.dev/> |
| Production | Not targeted or changed |

## Changes from the previous Preview source `19b08d0`

- **Opening:** retained C06/keyed-forge and staged assembly; the dial now turns smoothly through a single 9° clockwise motion over 2.84 seconds instead of the prior rapid spin. Skip, reduced motion, and Home handoff remain. The deployed normal handoff measured 3.19 seconds desktop / 3.18 seconds narrow; Skip measured 0.32 / 0.29 seconds, and reduced-motion handoff 0.36 / 0.28 seconds.
- **Home:** uses the shared canonical Activity identities and grouping, and selected-mode detail is placed before Confirm without colliding with it.
- **Category lobbies:** Experience, Hackathons, and Education use the top-origin 210px downward veil/fade and narrower banner group. Projects remains the existing closest-to-reference treatment. At 1920×1080, the non-Projects group begins at x395 versus x375 in Figma node `704:2` (20px right, with width matching at 810px); this minor difference is left visible for owner review.
- **Profile:** the signal row is lowered; the existing overall composition and overlays remain.
- **Crest / Fraymakers:** added a concise source-backed Crest technology cue and retained Fraymakers' two-column narrow hero legend. Other owner-positive surfaces were not broadly redesigned.
- **Food Tracker asset documentation:** reconciled the local manifest to the authentic Phase 24 states used by the current page: complex logging entry modes, unsaved AI meal review, QA-A populated Month Insights, Trends configuration, and Goal Plan. Source-state/fixture limitations remain captioned; the runtime does not depend on GitHub URLs.

## Retained current case-study states

- **Food Tracker:** retains its broader product story and five distinct authentic Phase 24 captures, including Insights. Captions preserve their source-state/fixture context.
- **Stush Patties:** retains the recurring transformation, neutral Source A/B/C labels, and the stakeholder-to-reporting-rules visual treatment; the animation was not reopened.
- **Education:** remains the concise four-brief treatment without public-facing evidence-status language.

## Verification

- `npm test -- --run`: **239 passed across 27 files** (exit 0; happy-dom printed AbortError teardown noise for iframe/PDF fetch cleanup).
- `npm run build`: passed.
- `git diff --check`: passed for the application commit and subsequent documentation changes.
- Deployed HTML, JS, and CSS bytes matched the clean build exactly:

  | Asset | Bytes | SHA-256 |
  |---|---:|---|
  | `index.html` | 640 | `09D55A1615155CE6E6FB7A06A8ED92D54D37199F37D6866210ADC94AA3B8A983` |
  | `assets/index-JRjCmAMP.js` | 499,000 | `5B744FB237F1359753D7F132B43A999CCAA0066D0722D6D2B6E6C9C7EFC860DD` |
  | `assets/index-BzpgXVnx.css` | 464,947 | `91A055A8902C8F3211118A60FF5FD37A610B80EBB1BC11844FD3F28427AEB5BE` |

- Installed Chrome/Playwright checked these 14 routes at 1440×900 and 390×844: `/home`, `/projects`, `/experience`, `/hackathons`, `/education`, `/profile`, `/resume`, `/education/projects`, `/projects/food-tracker`, `/experience/stush-patties`, `/profile/demos`, `/`, `/projects/choveigo`, and `/experience/living-in-silico`. All returned 200 with no console/page/request/HTTP errors, broken visible images after lazy-load settling, or horizontal overflow.
- Deployed interactions checked: all four Home mode selections and Confirm destinations; Resume Found opening, Escape, Close, focus restoration, and View Resume; Opening natural handoff, Skip, and reduced-motion handoff. Narrow Hackathons/Education Confirm controls were scrolled into view before activation.

The deployed Chrome scripts, machine reports, fetched assets, and screenshots are retained locally under `%TEMP%\portfolio-b32d635-after0bf8214-visual-qa-20261008\preview-f74ffd5-782c524\`.

## Known open items

- **Cho’Veigo full demo:** the available authentic 112.638-second recording repeatedly exposes sensitive profile/contact/resume content. No safely redacted full source was available; the 4.94-second Recommendations clip is an excerpt and must not be presented as the full demo.
- **Food Tracker demo:** authentic video remains unavailable; do not fabricate footage.
- **Live screen-reader review:** still requires a manual Windows Narrator session. Browser accessibility-tree and keyboard checks do not replace it.
- **Lobby visual delta:** the 20px horizontal banner-group offset at 1920×1080 described above remains the only measured minor Figma difference from this pass.

The separate original integration worktree's dirty and untracked material was preserved and excluded from this clean source commit. The Preview is for owner review; it does not complete the portfolio goal.
