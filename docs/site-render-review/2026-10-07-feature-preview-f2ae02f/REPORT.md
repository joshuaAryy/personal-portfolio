# Feature Preview Review Checkpoint — 2026-10-07

**Status: REVIEW CHECKPOINT READY. The persistent portfolio goal remains active.**

- **Branch:** `feat/portfolio-integration`
- **Application source:** `f2ae02ff42ece819a59c39f8da2d1a7619524399`
- **Immutable Preview:** <https://023e9112.joshuaik2.pages.dev/>
- **Cloudflare deployment:** `023e9112-ea76-46a5-9d42-0ab12bda3669` (Preview; source `f2ae02f`)
- **Previous owner-reviewed Preview:** <https://2724fdbc.joshuaik2.pages.dev/> (source `ffc7580`)
- Production was not targeted.

## Included work

The new Preview carries forward the current branch rather than rebuilding from the prior Preview. It includes Opening; Home and shared shell; all four lobbies; Resume Found and Resume Viewer; Profile; Journey; Demos; Personal Highlights; Education projects; and all six long-form case studies.

Material changes since source `ffc7580` include the C06/keyed-forge feature identity across prominent and optical-size placements, the full-screen radial Opening choreography, shared route-entry motion, Home mode spacing and shared Activity identities, lobby banner/fade and portrait fitting, Resume Found stack positioning, Profile responsive positioning, contextual responsive Help, a Food Insights hierarchy refinement, and a Fraymakers hero/pipeline revision that integrates accurate ownership into the story. The safe Cho’Veigo excerpt is present in Demos and the case-study hero.

## Verification

- `npm test -- --run`: 193 tests across 26 files passed.
- `npm run build`: passed.
- `git diff --check`: passed.
- Installed Chrome on the deployed Preview: 18 routes at 1440×900 and 390×844 returned HTTP 200, with no horizontal overflow, broken completed images, failed same-origin image requests, page errors, or console errors.
- Deployed Opening reached `/home` in about 4.1 seconds. Local Chrome Skip and reduced-motion handoffs reached `/home` in about 0.6 seconds and 0.55 seconds.
- Deployed Cho’Veigo video played in-page at 1280×720; duration is about 4.94 seconds.
- Profile positioning was checked at 1400×900, 1699×900, 1700×720/1080, 1858×720, 1859×900, and 1920×1080. No horizontal overflow; the Overview/signal positions change smoothly across the width rules.
- Stush’s transformation figure cleared the viewport and replayed its animation on re-entry in Chrome.

The first Preview image probe incorrectly treated offscreen lazy images as failed. Direct requests for every flagged path returned HTTP 200; the final lazy-aware route and image checks reported no failures. No application change was needed for that diagnostic.

## Review scope and open items

All six case studies remain open for owner review; technical correctness and successful rendering do not establish narrative or visual acceptance. Food Tracker still has no authentic demo video. Cho’Veigo has a short privacy-cropped Recommendations excerpt, not a full walkthrough; the source-refresh notice is visible. Education’s Dental Clinic DBMS, Bookstore, and CMOS amplifier briefs remain evidence-pending, while the ALU/FSM uses verified source detail. The scenic Personal Highlights image remains a low-priority owner choice.

The latest owner direction keeps Journey and Crest locked against redesign; they were preserved. Food visual hierarchy/architecture/Insights, Fraymakers visual density, Living in Silico visual balance, Stush opening composition, Help interaction quality, and other unresolved owner review comments remain actionable. No production J selection was made: the feature uses C06; archive `159:2` remains the production fallback. Live screen-reader interaction and final public-release media/consent review remain manual follow-ups.

## Suggested owner review order

1. Opening and Home shell, including mode previews, utilities, and Activity identities.
2. Category lobbies, then Resume Found/Viewer and Profile.
3. Journey, Demos, Personal Highlights, and Education projects.
4. Food Tracker and Cho’Veigo, then Crest and Fraymakers.
5. Living in Silico and Stush Patties.
