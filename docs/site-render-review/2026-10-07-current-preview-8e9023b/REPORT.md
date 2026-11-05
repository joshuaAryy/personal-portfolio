# Current feature Preview checkpoint

**Status:** REVIEW CHECKPOINT READY

**Immutable Preview:** https://ce0980b0.joshuaik2.pages.dev/

**Branch alias:** https://feat-portfolio-integration.joshuaik2.pages.dev/

**Application source:** `8e9023b84fe08b000aa9e96d6276b3285953266f` (`feat/portfolio-integration`)

**Production:** untouched

## Source and deployment verification

The deployed HTML references `index-D39-izSy.js` and `index-Cxr65lTK.css`. Both deployed files returned HTTP 200 and match the clean build from source commit `8e9023b` byte-for-byte:

| Asset | Bytes | SHA-256 |
|---|---:|---|
| `index-D39-izSy.js` | 498,340 | `92c9a68dd3561ac46a92e67a06d689179752c6f75868d8fed6f2a3fcad6bd647` |
| `index-Cxr65lTK.css` | 465,670 | `c103abb11f1dfd8376988dc22253ca71ed30a6edbab82ad3c9dc16fefd3455e8` |

The clean verification worktree at `8e9023b` passed `npm test -- --run` (**234 tests across 27 files**), `npm run build`, and `git diff --check`. Vitest printed non-failing happy-dom iframe/fetch abort messages during teardown; the command exited successfully with all tests passing.

Installed Chrome through Playwright 1.63.0 checked 17 content routes at 1440×900 and 390×844 (34 route/view checks), plus Opening → Home and Resume Found → View Resume at both sizes (4 interaction checks). All navigations succeeded. There were no page or console errors, failed or HTTP-error requests, broken images, or horizontal overflow. The 38 screenshots and machine-readable results are in `%TEMP%\portfolio-preview-8e9023b-audit-20261007\`.

This validates source freshness, route/runtime health, and the named interactions. It does not replace owner visual review or a live screen-reader session.

## Owner-correction ledger

The current application carries the bounded corrections recorded in the [preceding 8ac121a checkpoint](../2026-10-07-food-insights-checkpoint/REPORT.md), including Home mode previews and canonical activity identities, four top-origin lobby fades, Resume Found hierarchy, Profile signal positioning, authentic Food Insights imagery, concise Education briefs, Stush's reporting-rules explanation, and the current bounded case-study content. Journey, Crest, Personal Highlights structure, Living in Silico's broad direction, Profile structure, Resume Viewer architecture, and Home composition remain preserved.

The only application-source delta from `8ac121a` in this checkpoint is the Opening dial's rotational speed: one clockwise turn is authored over 4.8 seconds instead of 2.65 seconds, while the overall scene handoff remains 3.8 seconds. C06/keyed-forge assembly, Skip, reduced-motion behavior, and the Home handoff remain in place. The earlier bounded C06 motion decision is recorded in `AGENT_REGISTRY.md`.

The most recent owner-reviewed Preview was `2724fdbc`. This Preview uses the current pushed feature branch, not that older source and not the preserved historical `601f90c` report. The latter is an ancestor-only artifact and remains untouched for history.

## Remaining review items

- Cho’Veigo's full authentic recording remains unresolved. Connected Drive search found the same 112.638-second source already reviewed; it contains recurring profile/contact/resume/cover-letter information. No safe full alternative was found. The current 4.94-second Recommendations clip is an excerpt only; the remaining dependency is a privacy-reviewed authentic full recording.
- Food Tracker still has no authentic demo video.
- Live screen-reader interaction remains manual. Automated keyboard and accessibility-tree checks do not claim screen-reader validation.
- Owner review is still open. The Preview is a review checkpoint, not portfolio completion.

## Suggested review order

1. Opening, Home, utilities, and the four category lobbies.
2. Resume Found/Viewer, Profile, and Journey.
3. Personal Highlights and Demos.
4. Education projects.
5. Food Tracker, Cho’Veigo, Crest, Fraymakers, Living in Silico, and Stush Patties.
