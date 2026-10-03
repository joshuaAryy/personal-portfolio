# Food Tracker and Cho’Veigo — breadth design checkpoint

2026-10-03. Mingo inspected the actual corrected full-page Figma renders and Food’s architecture section. **Macro structure accepted; React sync and current-Preview desktop/narrow comparison are complete; owner review remains open.** The source-backed product contract is recorded below and the exact browser evidence is in the [render-sync report](../case-study-review/FOOD_CHO_RENDER_SYNC_2026-10-03.md). No case study is frozen or converged by this checkpoint.

## Food Tracker

Production root `1813:2`, body `1813:42`; full-page review `3286:2`, cloned body `3286:3`. Body height is now 4640px; review height is 4760px. The production viewport remains 1920×1080.

Preserved opening → Logging Paths → Insights → retrieval → authentic earlier-interface search capture → system architecture/data foundation → offline evaluation → validation/data authority/learning → close.

- Logging: source `3502:2`, clone `3502:56`. Manual, saved/recent, barcode, text, and verified photo interpretation converge on review before saving. Photo interpretation remains a low-trust suggestion, not nutrition authority.
- Insights: source `3502:31`, clone `3502:85`. Logged items, nutrient aggregation, missing-data coverage, Simple/Complex detail levels, and saved views describe one product/backend.
- Architecture: source `2032:2`, diagram `2850:2`; clone section `3286:181`. The 1432×710 section retains the retrieval-to-nutrition figure and adds mobile → API/data → food authority → persisted log → History/Insights. It explains React Native/Expo, Express/Prisma, normalized multisource food data, backend serving resolution, PostgreSQL, and saved serving snapshots.
- Corrected record labels `2850:63/79`, data-authority `1821:103`, and close `1821:146` replace the earlier append-only/immutable-history story. Logs are editable/deletable; stored nutrition/serving basis supports permitted portion edits. This does not imply that every recipe/mixed-meal edit behaves identically.

The first architecture expansion still duplicated retrieval without explaining mobile/backend/data breadth. Mingo held React sync until the data-foundation strip was added and inspected. The earlier review also found appended sections in the wrong order; the builder corrected the authored order and synchronized the clone before acceptance.

No new product screenshot was fabricated. The authentic banana-search capture remains labeled as an earlier simulator interface. New product and architecture panels are explanatory diagrams.

## Cho’Veigo

Production root `1813:379`, body `1813:419`; review `3286:603`. Body height is 3415px; review height is 3535px. The production viewport remains 1920×1080.

Preserved product/Recommendations opening → role records and evidence → distinct Fit/Eligibility/Recommendation decisions → bounded model interpretation → resume handoff and tailoring → Joshua’s implementation/evaluation → close.

- Added tailoring source nodes `3503:2–19`; mirrored nodes `3503:20–37`.
- The role/profile handoff prefills context; it does not itself generate a resume. Resume Studio separately normalizes requirements, retrieves/adopts evidence, applies constrained rewriting and validation/fallback, then requires person review and page verification before export.
- The authentic Recommendations capture remains product evidence. No generated resume artifact or automatic application submission is claimed.
- Current local implementation evidence distinguishes committed handoff code from separately staged Resume Studio behavior; see [implementation evidence](CHO_IMPLEMENTATION_EVIDENCE.md).

An initial tailoring placement overlapped the system diagram. Mingo rejected that render; the builder corrected section placement and inspected the synchronized full-page representation.

## Next acceptance steps

The accepted Food and Cho breadth is synced into React in `e88eb59`; the Cho end-anchor chapter-selection correction is `86d5d89`. Desktop and 390px Chrome comparisons, interactions, evidence, and open owner review are recorded in [the render-sync review](../case-study-review/FOOD_CHO_RENDER_SYNC_2026-10-03.md). The current Preview was built from the clean pushed source. No redesign or filler is planned. Cho’s current Figma review capture still has older role-source wording; reconcile it against the verified job-feed/persisted-role copy before declaring design/source sync complete.

Foundations and the held J exploration were untouched. Archive `159:2` remains the production identity fallback.
