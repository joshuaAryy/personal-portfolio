# Owner correction pass — 2026-10-08

This is a bounded review record for the feature branch. It does not mark the portfolio goal complete, approve production, or replace the owner’s visual review.

## Baseline and scope

- Feature branch was at `6d83191c5b158056a39de91fe3912c4b25f8e240`, tracking `origin/feat/portfolio-integration` at the start of this pass.
- The latest application source in that checkpoint was `c85984e`.
- Production and historical worktrees were left untouched.
- Four pre-existing dirty documentation files were preserved and excluded from this pass’s commit.

## Implemented and visually checked

- **Opening / C06:** Three masked pieces use the same accepted C06 artwork and settle into the exact full mark. Skip and reduced motion remain. Installed Chrome captures at 100, 350, 550, 830, 1000, and 2050 ms show the recognizable assembly, seam illumination, and settled mark. The full 3-second sequence was preserved; no fake loading text or progress bar appears. Intermediate frames remain an owner-review point.
- **Activity identities:** Home and Experience use the same canonical Living in Silico and Stush Patties image sources. Desktop marks render; the narrow shell collapses the Activity rail.
- **Lobby banners:** Figma nodes `511:2`, `704:2`, `730:3316`, and `738:3316` contain the shared 1500×210 `Pass06 · Banner entrance fade` gradient at y=82 (layer IDs `605:3690`, `704:358`, `730:3659`, `738:3672`). The React layer uses those same gradient stops over the scenic environment and below the headings/cards; Projects’ existing environment mask remains. All four modes were checked at 1920×1080, 1440×900, and 390×844. Final three-way sheets compare the Figma frame, pre-correction render, and corrected Chrome render in `%TEMP%\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\banner-final-comparisons\`. Foreground marks and text stay legible.
- **Profile signals:** The full icon/label/count groups move together: +50 px at 1920×1080 and 1440×900, +41 px at 1600×760, unchanged mobile flow. At compact heights the existing scroll reaches the whole row; hover and focus panels still work. The exact annotated owner screenshot was unavailable, so this is a measured implementation comparison, not exact-image parity.
- **Resume Found:** The orb, title, View Resume plate, and Close share a center line. At 1440×900 the title clears the button by 13.5 px; at 390×844 clearance is 6.4 px. A single 1.4-second orb-energy sweep is visible, while reduced motion removes it. Tab trapping, Escape, Close, View Resume, and focus restoration to the invoking Resume link work.
- **Education:** Restored the owner-preferred four-card layout with concise capability briefs and no public evidence-management wording.
- **Food Tracker:** Ownership copy names Joshua’s product/technical leadership, coding/debugging, and advanced agentic workflow. The early stack names verified technologies; retrieval copy explains Top-1/Top-3 and offline development/holdout comparison in plain language.
- **Fraymakers:** Simplified the hero to one clearly labeled illustrative 16:9 thumbnail composition and moved technical detail to the later story.
- **Stush Patties:** Condensed the late story while preserving the recurring transformation animation; public distributor labels and collaborator name are absent.

## Preserved / unchanged

Journey, Crest, Personal Highlights structure, Home composition, and the broad case-study directions were not redesigned. Existing canonical activity identity assets were reused rather than replaced.

## Open items

- **Cho’Veigo full demo — blocked for public Preview:** The canonical source `viego_demo_final_with_music.mp4` is 112.638 seconds. It contains a profile/profile ID and another person’s résumé/contact material around 14–52 seconds, 64–84 seconds, and 90–108 seconds. No safe full-length derivative was created because the content and screen position vary, and a broad mask would obscure the Resume Studio workflow. The full source is available for private/local owner review at `C:\Users\samue\AppData\Local\Temp\choveigo-full-private-review-20261008.html`. Public use needs a minimally sanitized full-length source or an owner-approved privacy/protection decision; the existing 4.94-second excerpt remains only an excerpt.
- **Owner motion attachments:** `half of ready check.mp4` and the existing `league opening.mp4` were inspected. The exact separately named `league opening(1).mp4` was not present in the runtime. No unrelated video was substituted.
- **Profile annotation:** The clean/annotated Profile attachment was not available in the runtime. The owner was asked once; implementation followed the written annotation and was measured across the requested viewport matrix.
- Live screen-reader interaction remains a manual owner check; Chrome/Playwright verification does not replace it.

## Verification evidence

Chrome/Playwright artifacts are stored outside the repository under:

`%TEMP%\portfolio-b32d635-verify-artifacts\owner-correction-2026-10-08\`

The `qa` subfolder contains the 43-check route, asset, motion, interaction, and content report with no browser/HTTP/request errors. `profile-signals` contains matched before/after captures and geometry. `after\banner-stack` contains direct Figma comparisons. No large screenshots were added to the repository.

Full Vitest result: 27 files, 243 tests passed. Happy DOM emitted abort/network teardown messages while disposing test iframes; these were non-failing teardown output. Production build passed. `git diff --check` passed.

The next feature Preview is still required before this becomes an owner-review checkpoint. Production remains untouched.
