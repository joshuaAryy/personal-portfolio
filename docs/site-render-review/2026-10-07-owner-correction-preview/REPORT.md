# Bounded owner-correction Preview

**Status:** REVIEW CHECKPOINT READY
**Immutable Preview:** https://ea31ef09.joshuaik2.pages.dev/
**Application source:** `601f90cceaf1a8689c1f0ffde3589d7d1416923c` (`feat/portfolio-integration`)
**Production:** untouched

## Deployment and verification

The Preview was deployed from a clean detached worktree at the exact application commit above. The built JavaScript and CSS asset names and bytes match the local build from that worktree. No dirty or untracked workspace files were included.

The full test suite passed **234/234 tests across 27 files**. The production build and `git diff --check` passed.

Installed Chrome/Playwright checked 18 routes at 1440×900 and 390×844 (36 route/view checks). Home; all four lobbies; Resume Found and Resume Viewer; Profile; Journey; Demos; Personal Highlights; Education projects; and all six long-form case studies returned HTTP 200 with expected page headings. There were no console errors, page errors, failed requests, HTTP errors, broken images, or horizontal overflow. Food's offscreen lazy images loaded after scrolling into view.

Detailed browser results and screenshots: `%TEMP%\immutable-preview-deploy-qa-20261007\`.

This is deployment and route smoke evidence, not a substitute for the owner's visual review or live screen-reader interaction.

## Focused interaction/layout follow-up

After the route smoke, Playwright waited 1.4 seconds for the mode and route-entry choreography to settle before capturing interactive states. The earlier 120–350ms captures were transitional and are not used as final evidence.

- All four Home modes reveal their matching secondary content at desktop and narrow widths with opacity 1 and visible computed state. The detail begins immediately after the mode description; no horizontal overflow occurs. The selected mode, content group, and utility destinations match.
- The shared desktop Activity rail uses canonical project/experience marks and keeps availability separate from activity. Its order is Food Tracker, Cho’Veigo, Crest, Fraymakers, then Living in Silico and Stush Patties. Header utility order is LinkedIn → GitHub → Email → Resume. Narrow layout hides the rail and preserves that utility order in the contact row.
- All four lobbies use top-aligned environment art with a downward fade, centered category banner fields, and no width overflow. The owner portrait remains centered in desktop and narrow crops.
- Resume Found keeps the mechanism → RESUME FOUND → VIEW RESUME → CLOSE hierarchy at both sizes.
- Profile signals sit at y=706 on 1440×900 and short-wide 1440×480, and y=725 on 1920×1080. In short-wide view they are below the initial fold but remain reachable by native scrolling in `#main`; the row remains intact. No overlap or width overflow was observed.

These checks found no mismatch and required no source edits. Captures, bounds, and computed styles are in `%TEMP%\preview-interaction-layout-audit-20261007\`.

## Changes in the bounded correction

- Opening retains the C06/keyed-forge identity and staged assembly; the dial makes a deliberate clockwise turn over 2.65 seconds within the 3.8-second sequence. Skip and reduced-motion paths remain supported.
- Food Tracker adds authentic Phase 24 Trends and Goal Plan imagery while preserving the expanded product story and early technical context.
- Education returns to four concise capability briefs, with no public evidence-pending or source-provenance language.
- Stush keeps its repeating transformation and Source A/B/C labels, with a more visual reporting-rules explanation below it.
- Cho'Veigo distinguishes deterministic Jobs evaluation from the Gemini Resume Studio path; the available short clip remains labeled as an excerpt.
- Crest adds a source-backed summary of Joshua's backend/data scope without reopening its owner-approved layout.
- The clean candidate also contains the bounded Fraymakers figure, contextual Help, and related shell corrections from this active branch state.

## Remaining limits for review

- Cho'Veigo's full authentic recording contains sensitive profile, contact, résumé, and cover-letter content. No safe full-length derivative was found; the current short clip is only a supporting excerpt.
- Food Tracker has no authentic demo video yet.
- Live screen-reader interaction remains a manual follow-up; automated accessibility checks do not replace it.
- Owner review remains open. This Preview does not complete the persistent portfolio goal.

## Suggested review order

1. Opening, Home, utilities, and the four category lobbies.
2. Resume Found/Viewer, Profile, and Journey.
3. Personal Highlights and Demos.
4. Education projects.
5. Food Tracker, Cho'Veigo, Crest, Fraymakers, Living in Silico, and Stush Patties.
