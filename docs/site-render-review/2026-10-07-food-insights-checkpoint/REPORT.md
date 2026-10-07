# Food Insights evidence checkpoint — 2026-10-07

## REVIEW CHECKPOINT READY

- **Immutable feature Preview:** https://2ada7513.joshuaik2.pages.dev/
- **Branch alias:** https://feat-portfolio-integration.joshuaik2.pages.dev/
- **Application source:** `8ac121a60a3b2c8bbfcaad0ea18b4e109c8af2d0` (`feat/portfolio-integration`)
- **Previous Preview:** https://ea31ef09.joshuaik2.pages.dev/ from source `601f90cceaf1a8689c1f0ffde3589d7d1416923c`

This is a review checkpoint, not completion of the persistent portfolio goal. Production was not targeted.

## Change since the previous Preview

Food Tracker Insights now uses the authentic populated QA-A Month report capture `03-analytics/insights-month-populated-sep08-oct07.png` from the Food Tracker repository's `phase-24-frontend-redesign` branch, commit `c2651e1751e287cfdaa9f45688a5d0af66200148`. The screenshot manifest classifies the populated capture as supplemental current-state evidence. The caption identifies the QA-A staging fixture, Sep 8–Oct 7 date range, and five logged days; these values are not presented as general product outcomes or visual approval of the current mobile design.

The redundant small Unknown-state screenshot inset was removed. The native explanation distinguishing unknown nutrition from zero remains, as does the Goal Plan capture. The image is stored locally in the portfolio at `public/media/case-studies/food-tracker/phase-24/insights-month-populated-sep08-oct07.png`; runtime delivery does not depend on GitHub URLs.

## Verification

- `npm test -- --run`: 234 tests passed across 27 files. Happy DOM emitted PDF-iframe teardown `AbortError` messages after the passing suite; exit status was 0 and no test failed.
- `npm run build`: passed (`tsc -b && vite build`).
- `git diff --check`: passed on the clean deployment source.
- Deployed Chrome smoke: 18 known routes returned HTTP 200 at 1440×900 and 390×844 (36 route/viewport checks). No browser/page/request errors, HTTP errors, broken loaded images, or document horizontal overflow were found.
- Food Month capture rendered at 368×800 desktop and 326×709 narrow with its aspect ratio preserved. Goal Plan and the native unknown-versus-zero explanation remained present.
- Deployed JavaScript, CSS, and the new screenshot matched the clean local build/source by SHA-256.
- QA artifacts are in `%TEMP%\preview-deploy-smoke-2ada7513-20261007\`, `%TEMP%\food-insights-month-render-qa-20261007\`, and `%TEMP%\preview-keyboard-a11y-audit-20261007\`.

## Review notes and open items

- The new Food image is an authentic QA-A staging fixture capture, not a promise of typical or current user data.
- No authentic Food Tracker demo video is present in the inspected current repository tree.
- The full authentic Cho'Veigo demo remains unavailable as a safe web asset: the 112.64-second source contains private profile, resume, contact, and correspondence details. The approximately 4.9-second sanitized Recommendations clip is only an excerpt and is not represented as the full demo.
- Live screen-reader interaction remains a manual follow-up. A reviewer should use NVDA or Narrator to exercise Home mode navigation and utilities, Help dialog open/close and focus return, Resume Found and Resume Viewer controls, Profile signal focus/announcements, and case-study/Demos navigation at desktop and narrow widths.
- Owner review remains open. Automated keyboard and accessibility-tree checks do not establish screen-reader acceptance.

## Suggested review order

1. Home and shared shell, including Activity identities and lobby banners.
2. Opening and Resume Found, including the C06 identity treatment.
3. Profile, Journey, Personal Highlights, and Demos.
4. Food Tracker Insights at desktop and narrow widths; note the fixture-data caption.
5. The remaining case studies and Education projects.

No production deployment occurred.
