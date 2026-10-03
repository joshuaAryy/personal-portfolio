# League Portfolio — Canonical Session Handoff

> **Latest staging:** source `d9101c8870baa635e8fb9964f52e25bd59b18084` at `https://ede7aa0a.joshuaik2.pages.dev/`, Preview deployment `ede7aa0a-3635-4612-ba94-409de6eda2bf`. Journey continuity and Education route are included. [Actual CLI Chrome evidence](site-render-review/2026-10-03-phase-b-staging/REVIEW.md) confirms the bounded desktop sync and CTA navigation; broad parity/owner acceptance remain open. Earlier `6accc70` staging statements below are superseded; historical captures retain their original source attribution.

> **Current owner update:** [2026-10-03 direction](OWNER_DIRECTION_2026-10-03.md) supersedes older browser-blocked and narrow coverage conclusions below. This is Codex CLI; existing Playwright/installed Chrome now produces actual rendered evidence. Six case studies require breadth/depth expansion. Education CTA is resolved to `/education/projects`; detailed project claims still require authentic evidence. Journey must continue Void through `3492:2`. Preserve compact Foundations (3600×3140) and keep J Candidate 02 held. Older outage/CTA statements below are historical, not current instructions.

**Checkpoint:** created 2026-10-02; reconciled against live repository, Wrangler, Figma, and agent state on 2026-10-03. Mingo is preparing a clean-chat continuation, not closing or restarting the project.

> **CURRENT OWNER INSTRUCTIONS + CURRENT DURABLE DOCS + CURRENT FIGMA/REPOSITORY STATE OVERRIDE HISTORICAL CHAT SUMMARIES.** Historical notes explain decisions; they do not supersede current truth. Recheck the facts below against live state before acting.

## 1. Project objective

Build Joshua's portfolio as a convincing League desktop-client experience, not a generic dark portfolio with League colors. The website is the product. Move stable Figma work into React, then judge visual quality from a supported-browser render against Figma and authentic references. Preserve strong work; spend effort where a concrete gap remains.

Use this quality order: **macro structure and first read → meso hierarchy and communication → micro finish.** Prefer current approved Figma direction, authentic Riot/League/CommunityDragon sources, archive material, authentic project assets, then deliberate new design. Technical implementation alone is not visual acceptance.

## 2. Repository, branch, staging, and worktree

- Worktree: `production-portfolio/.worktrees/public-integration`
- Branch: `feat/portfolio-integration`
- **Recovery bootstrap, 2026-10-03:** inspected the existing integration worktree before any branch operation. Local HEAD, origin tracking ref, and live origin branch all matched `12dfb60b8abc0132ee531f8de358f5d32c454e6d`. Opening correction `ca85398a447db65a000dc888ace027ceecfbd8b8` and the separate post-handoff documentation commits (starting with `192a3f0`) were already preserved in that pushed history. No staged changes or dirty documentation remained. The sole tracked modification was `docs/j-source-review/captures/pass76/pass76-j-only-16-native.png`; 535 untracked artifacts were inventoried, and all 536 artifact hashes were recorded outside the worktree for preservation checks. The separate `feat/initial-client-shell` checkout also has unrelated dirty work and was left untouched. This recovery reconciliation updates documentation only; verify its resulting HEAD and origin parity after push.
- Pre-transition checkpoint HEAD: `1f92b31d2588742488ff65fa8e33e5bda69c7688` (`origin/feat/portfolio-integration` matched it). After the handoff, branch source advanced through Opening correction `ca85398` and later implementation/source corrections; local and origin matched `2f7da0e987f253c501cc17a16581316cf556bcc0` before this documentation reconciliation. This docs-only checkpoint advances the branch; on bootstrap, verify exact HEAD with `git rev-parse HEAD` and confirm origin parity.
- **Current staging, confirmed by read-only Wrangler listing on 2026-10-03:** source commit `6accc709a5dea97a22a8b0dfaf0755d11ba8884c` (`6accc70`), immutable Preview `https://d7164429.joshuaik2.pages.dev/`, branch alias `https://feat-portfolio-integration.joshuaik2.pages.dev/`, deployment ID `d7164429-f221-4a41-9df5-d3e1a94ba6fe`. Build passed; 2 assets uploaded and 147 cached. This source includes the Fraymakers chapter fragment target correction. The preceding `a278c27` Preview is superseded. The primary production project was not targeted.
- Packaging audit at `a278c27`: all 109 discovered runtime asset paths in 42 source files (108 media assets and the authorized v13 resume PDF) are present in `dist` and tracked in deployed source; no local font file paths were referenced (remote Google Fonts imports are outside this file audit). The PDF matches authorized SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`; bundled CSS contains corrected Opening rotations and the Crest iframe focus rule; SPA redirects are present. This verifies packaging only, not route loading, interaction, or visual parity.
- Supported-browser check still returns `No browser is available`; discovery was empty and no page/capture resulted. No post-deploy supported-browser capture exists. Current agents are `/root`, `/root/frontend_owner`, and `/root/runtime_a11y_qa`; the J specialist is absent. Bounded Opening/Resume and Help/recovery source audits found no actionable discrepancy; rendered behavior remains unverified.
- Worktree has no staged changes after the source commit; the documentation checkpoint is pushed separately. Preserve one unrelated tracked modification: `docs/j-source-review/captures/pass76/pass76-j-only-16-native.png`, plus the untracked review/capture/source-media/local-experiment artifacts present in the worktree. The current status count is authoritative at bootstrap. Do not clean, stage, or treat these items as approved production work without auditing them. No production deployment or asset promotion occurred.

## 3. Operating architecture for the next session

- **Mingo is the project director. The owner requests Sol 6.1 for the next Mingo session.** Select that model in the new-chat UI; repository documentation cannot change a chat's model.
- Concentrate reconciliation, prioritization, contradiction resolution, acceptance judgment, and agent routing at Mingo.
- Use Luna for routine React implementation, Figma/source audits, documentation, copy sync, accessibility review, and deterministic asset checks when available.
- A narrowly scoped **Sol 6.1 J specialist** `/root/identity_j_sol61` completed one bounded whole-mark study in the prior session. Its candidate is Figma `3482:3`, review board `3482:2`; give any follow-up only J-specific source review, provenance, and current status—not the full portfolio. The recovery bootstrap found this handle absent from the live tree; recreate it only for an owner-authorized J follow-up. Do not start Candidate 02 before owner review of Candidate 01 or explicit owner direction to continue.
- Do not create a continuously running Astra lane. Any exceptional Astra use must be short, justified, and owner-approved.
- Historical recovery bootstrap live tree (2026-10-03, superseded): only `/root` was present at that moment; the prior `/root/frontend_owner` and `/root/runtime_a11y_qa` handles had not yet been recreated. Current reusable Luna handles are `/root/frontend_owner` and `/root/runtime_a11y_qa` (completed/idle); the J specialist remains absent, and J follow-up requires owner direction.
- For recurring specialist work, use **builder → critic → Mingo → same builder → same critic**. Reuse capable handles. Do not spawn agents, Figma nodes, or review artifacts just to appear active.

## 4. Source-of-truth hierarchy

1. Current owner instructions and corrections.
2. Current durable operating/status/spec documents, especially [AGENTS.md](../AGENTS.md), [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md), [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md), [FIGMA_NODE_MAP.md](FIGMA_NODE_MAP.md), and [FIGMA_IMPLEMENTATION_SPEC.md](FIGMA_IMPLEMENTATION_SPEC.md).
3. Current live Figma for intended design and owner-visible review artifacts. A Figma frame or export is not a website render or owner approval.
4. Current branch source for implementation behavior; compare it with the actual deployment revision before validating a preview.
5. Supported-browser rendered evidence for visual, motion, interaction, and responsive acceptance. Source inspection, build output, HTTP responses, Figma screenshots, and stale captures cannot prove parity.
6. [CASE_STUDY_CONTENT_SOURCE.md](CASE_STUDY_CONTENT_SOURCE.md) for factual truth. It intentionally preserves facts, caveats, ownership boundaries, and uncertainty that may never belong in public-facing copy. Public story decisions live in design/spec docs; do not paste internal research or owner notes verbatim into a case study.
7. Historical chats and archived passes are explanatory evidence only. They never override current owner direction.

## 5. Current surface status

| Surface | Authoritative Figma | Current status and preserve | Remaining work / review state |
|---|---|---|---|
| Opening + J | Opening `2025:2`; motion notes `2025:84/88/125`; rings `2443:38/71/92/110`; archive phases `2983:310/313`; J study `3482:3` / board `3482:2` | Opening is implemented around restrained opposing segmented rings, one ~2s cycle, Skip, and near-instant reduced motion. Commit `ca85398` corrected React's ring start angles to Figma `+0.021rad` / `−0.017rad` (previous CSS was about 57× larger). Figma MP4 shows archive artwork in the visible phases. | **NEEDS RENDER SYNC** for real playback, handoff, live preference reversal, and sharpness; current Preview `6accc70` includes the correction. The archive remains the production J fallback. J owner review remains open; the new study still reads partly as a J in a badge. See section 6. |
| Home | `2252:3445`; shell `2356:611`; background `2356:514`; controls `2356:603/605` | Structure is stable. Current four icons are merged to active Figma and match React exports; CTA/back geometry is source-synced. Figma refinement review found no material shell/background/icon gap. | **NEEDS POST-CHANGE RENDER SYNC; OWNER REVIEW OPEN.** Verify the 1920×1080 screen, no irrelevant scroll, shell, selected state, and Back/cold-entry behavior. Do not redesign the structure. |
| Profile Overview | Base `960:2`; states Projects `998:3`, Experience `998:46`, Hackathon `998:63`, Academics `998:79`; review strip `3285:45` | Owner likes the base. Projects stays four equal sectors. Lower signals are static counts; hover/focus reveals the corresponding overlay without switching the main panel. The owner answered “Make static.” Academics emphasizes `2028` with a separate `EXPECTED GRADUATION` label. The review strip visibly lays out all four states side by side. | **NEEDS HOVER/FOCUS RENDER SYNC.** No underlying Profile redesign or new owner decision is open. Confirm keyboard/pointer behavior and the final Academics layout. |
| Journey | `1287:7`; sidebar `1287:33`; content `1287:4468`; viewport `1287:4475` | Implemented and source-synced to the approved scenic, nine-beat personal-history path. Preserve the authentic Joshua crop, CE medallion, credential hierarchy, and labeled traits. | **NEEDS POST-CHANGE RENDER SYNC** for full route, locator, desktop and narrow layout. Do not reopen the story structure without a concrete gap. |
| Projects / Experience lobbies | Projects `511:2`; Experience `704:2` | Accepted lobby direction and asset-backed destinations. Keep selection distinct from explicit open action. | No current design blocker recorded. Preserve the accepted architecture; use the queue and current evidence before adding any redundant render check. |
| Hackathons / Education lobbies | Hackathons `730:3316`, tray `730:3441`; Education `738:3316`, tray `738:3441` | Hackathon copy/detail hierarchy is synced (`3RD PLACE · BRIM FINANCIAL CHALLENGE`, two separate detail rows). Education coursework copy is synced and selection is preview-only. | Hackathons and Education are **NEEDS RENDER SYNC**. Education's `VIEW EDUCATION` target is an owner decision; React suppresses it rather than self-linking. |
| Food Tracker | Production root `1813:2`; body `1813:42`; full-page review `3286:2` (1920×3562) | Flagship. Preserve the owner-positive product/problem-first four-step story and the revised retrieval sequencing. Explain the value of search/retrieval before architecture and metrics. | **IMPLEMENTED / FULL-PAGE RENDER SYNC OPEN.** Do not restart the first fold. Next major uplift is authentic current product/demo media if it becomes available; the earlier-interface screenshot is clearly labeled, not current UI. |
| Cho’Veigo | Root `1813:379`; body `1813:419`; full-page review `3286:603` (1920×3037) | Product-first: product → Recommendations demo → whole-system architecture → Joshua's strongest work → evaluation. The authored demo is 820×461.25 beside the intro; architecture follows below. | **NEEDS POST-CHANGE FULL-PAGE RENDER SYNC; OWNER REVIEW OPEN.** Prior meaningful render evidence predates Fit/review copy changes, hero-strip removal, and model-boundary correction. Do not shrink the demo blindly. |
| Crest | Root `1817:4`; body `1817:39`; full-page review `3286:813` (1920×2348) | Preserve the working product explanation and lower workflow **“One transaction. Two sources. Human review.”** Keep deterministic policy/finance evidence separate from retrieved policy interpreted by Gemini and routed to a person. | **NEEDS POST-CHANGE FULL-PAGE RENDER SYNC; OWNER REVIEW OPEN.** Continue the newer visual-storytelling bar without discarding the good workflow. Do not say Gemini decides. |
| Fraymakers | Root `1831:2`; body `2296:3474`; full-page review `3286:1031` (1920×1841) | Owner-positive quality benchmark: match-to-frame schematic, node-canvas context, layered compositor, immediate system explanation, and YAML configuration. Preserve without forced novelty. | **IMPLEMENTED / FULL-PAGE RENDER SYNC OPEN.** Verify the complete page and YAML section. Keep ownership truth in context, not as hero copy. |
| Living in Silico | Root `1438:2`; body `1438:4`; full-page review `3287:2` (1920×2380) | Owner-positive representation-first story: molecule → SMILES/fingerprint/RDKit → DeepMol/RNN and fragment workflows → outcomes. Figures carry the explanation. | **NEEDS POST-CHANGE FULL-PAGE RENDER SYNC.** Keep experimental uncertainty truthful internally; do not expose bookkeeping caveats as public hero copy or claim validated/novel generated molecules. |
| Stush Patties | Root `1438:276`; body `1438:278`; full-page review `3287:288` (1920×2562) | Owner-positive concise “I built” story: heterogeneous files → parse → shared schema → normalize → repeatable handoff → Power BI. The restrained connector-motion cue becomes static under reduced motion. | **NEEDS POST-CHANGE FULL-PAGE RENDER SYNC.** Preserve immediate comprehension; keep source-specific exceptions later and omit distributor/Koyo jargon from the main system figure. |
| Resume Found | `2407:176`; authentic chassis `2888:164/165`; environment overlays `3292:484/485/486` | **IMPLEMENTED / FIGMA ENVIRONMENT PASS CLEAR.** Preserve authentic Ready Check chassis, archive J fallback, broad page wash, wider teal/navy halo, demoted shell/rail, View Resume, validated close/origin behavior, and authorized v13 PDF. | **NEEDS POST-CHANGE RENDER SYNC**, with a known archive J sharpness gap at large size. The 220px original and 700px upscale cannot resolve it. Do not revert the environment from source-only judgment. |
| Resume PDF Viewer | Review frame `3419:484`; shell `3419:485`; actions `3419:656/660`; viewport `3419:663`; source PDF page `3419:664` | Implemented with the authorized v13 PDF for iframe, Download, and Open Fullscreen. Current-shell Figma review frame exists. | **NEEDS SUPPORTED-BROWSER RENDER SYNC / OWNER REVIEW OPEN.** Check native PDF behavior, keyboard, and internal scrolling. Source audit found no actionable correction. |
| Help / recovery | Help `2298:3474`; focus `2298:3560`; 404 `2014:94` | Reusable contextual overlay is the accepted direction. Recovery is concise and uses one Projects action. Keep polish bounded. | **NEEDS BROWSER + NARROW-SCREEN RENDER SYNC.** Verify overlay context, dismissal, focus, recovery, keyboard, and responsive fit; do not enumerate every possible Help state in Figma. |
| Demos | Food `1316:35`; Crest `1316:4534`, Play `1316:4622`; Cho’Veigo `1298:2`; nav `1276:20–25` | Implemented media browser with honest roles: Food identity poster (not product UI), static Cho’Veigo Recommendations capture, Crest playback with sample-data label. Play transfers focus to a titled iframe; branch CSS adds a gold visible-focus ring. | **NEEDS RENDER SYNC.** Current Preview `6accc70` includes source commit `6b81a4e`; check focus ring, playback, media crop, selectors, and narrow nav when supported-browser access returns. No real playable Food/Cho’Veigo demo is recorded. |

## 6. Canonical J — active owner-review branch, not finished

- **Production fallback:** archive `159:2`. Do not change the website to v8 until the owner reviews and selects it.
- **Editable baseline and latest study:** Sonnet 5.5 v8 `3325:191` remains the strongest existing editable baseline; v7 `3311:2`; comparison board `3325:36`. Sol 6.1 produced one derivative whole-mark study `3482:3` on board `3482:2`. It improves counter continuity/material interaction but still reads as a J inside a complete rim. It merits owner comparison as a directional candidate, not promotion or acceptance. The archive remains the strongest integrated complete mark and the production fallback.
- **Owner says the J is not finished.** The old Codex reconstruction lineage (Pass16–80 and related micro-adjustments/candidates, including `3364:2`) is rejected/closed as a design branch. This does not close J work or the separate Sonnet branch.
- Known v8 weaknesses: the outer rim is too continuous/perfect; the J can read as placed inside a medallion; hook/orbit integration is weaker; cyan energy reads as strands over a disc rather than turbulent, embedded energy; material relationships feel less organic than the archive.
- A recent macro comparison did not approve v8. It showed the archive's J/orbit/energy/material/asymmetry read as one integrated object, while v8 remains cleaner/editable but less integrated. Downsample evidence supports a distinct ring-free small mark at 16px; keep optical-size marks at `3289:157/162/167` for 54/32/16px and do not force the complex primary identity down to favicon size.
- The archive raw source is a 220×220 JPEG; the tracked 700px export is an upscale. Live Figma showed visible softness when displayed at roughly 456–460px. The source-resolution gap is real and cannot be repaired by browser comparison. Keep archive as fallback until an owner-approved replacement exists.
- The owner explicitly directs a bounded J lane: study archive/v7/v8 and why the old Codex line failed; preserve the successful layered illustration methodology; make about **2–3 serious whole-mark attempts total**, then present evidence for owner review. One attempt (`3482:3`) is recorded; decide from owner feedback whether a second/third attempt is warranted. Avoid an endless pass chain. Do not promote a specialist candidate automatically.
- Full current J evidence and archive history: [J review](j-source-review/REVIEW.md), [asset provenance](ASSET_MANIFEST.md), Figma nodes above. Do not read old `CLOSED` language as applying to the active Sonnet branch.

## 7. Case-study factual truth

Use [CASE_STUDY_CONTENT_SOURCE.md](CASE_STUDY_CONTENT_SOURCE.md) for exact claims and evidence. This summary is only a pointer:

- **Food Tracker:** mobile-first nutrition tracker. Joshua initiated the product and led requirements, architecture direction, workflow, evaluation, and product decisions; do not imply he wrote most production code. AI may interpret intent; trusted nutrition data/backend serving conversion determine nutrition. Pinecone supplies candidates, not final ranking or nutrition truth. Unknown nutrition is not zero.
- **Crest:** four-person MPC Hacks 2026 team placed third in the **Brim Financial Challenge**, not overall. Values are sample/challenge data, not impact/adoption/production volume. Joshua owned backend/data workflows, Policy Compliance Engine, deterministic anomaly signals, policy retrieval, some preapproval, and presentation; Gemini interprets retrieved policy, while deterministic finance/policy rules are authoritative. Do not attribute primary frontend, initial MongoDB setup, or main Gemini integration to Joshua.
- **Cho’Veigo:** two-person project with Shiv Arora for AI-assisted job discovery and evidence-based resume tailoring. Joshua led Jobs-side work and shared product/evaluation direction; do not claim sole implementation. Fit, Eligibility, and Recommendation are distinct; deterministic rules assess Fit/Eligibility, bounded Gemini interpretation is constrained not to invent experience, and tailoring is downstream.
- **Fraymakers / UploadAssistant:** tournament VOD/media-preparation tool. Joshua built `thumbnail.js` and worked on YAML/config, thumbnail generation/integration, and some YouTube API work. His brother owned the project foundation/CLI/Challonge work. Thumbnails were used on real VODs; automatic upload was not completed. Accurate ownership need not lead the hero.
- **Living in Silico:** AI/ML research internship, March–June 2025. Source supports DeepMol CSVLoader, Morgan fingerprints (radius 2, 128 bits), and an RNN MolecularGenerator run for 10 epochs/batch size 64. DeepMol produced 500 generated SMILES samples; do not call them valid, unique, or novel. The exact relation of all settings to those samples remains unresolved internally, not default public copy.
- **Stush Patties:** Software Engineering Intern experience, Sept–Nov 2025, on a two-person team. Heterogeneous CSV/XLSX/XLSB sources required parsing, a shared schema, normalization/alignment, then standardized CSV, data dictionary, and quality report for Power BI. Do not assign formats to individual sources or claim measured business impact. Riipen/IBM, team size, distributors, and Koyo are factual context, not hero copy.

## 8. Current Figma review artifacts

- **Profile review strip:** `3285:45`, 4552×740; a current screenshot visibly shows Projects | Experience | Hackathon | Academics side by side. This is review-only; production Profile composition and hover/focus behavior remain as specified.
- **Six long-form pages:** each has a 1920×1080 production/client frame with intended scrolling and a separate exact-authored-body full-page review frame. Live metadata on 2026-10-02 reconfirmed visible, unclipped frames and the matching text sequences. Do not manually maintain a second retyped story. Review frame IDs and sizes:

  | Story | Production/client | Full-page review | Size |
  |---|---|---|---:|
  | Food Tracker | `1813:2` | `3286:2` | 1920×3562 |
  | Cho’Veigo | `1813:379` | `3286:603` | 1920×3037 |
  | Crest | `1817:4` | `3286:813` | 1920×2348 |
  | Fraymakers | `1831:2` | `3286:1031` | 1920×1841 |
  | Living in Silico | `1438:2` | `3287:2` | 1920×2380 |
  | Stush Patties | `1438:276` | `3287:288` | 1920×2562 |

- **Opening timeline:** `2025:2` is two seconds and loops in Figma for inspection. Exported frames show archive J layers. The animated frame wrappers are legacy-named `2443:132/137`; nested old vectors `2843:10/2` are hidden, while visible Pass24 archive phases are `2983:310/313`. Figma ring start angles `2443:38/71` are `+0.021rad` / `−0.017rad`; React now uses those values in commit `ca85398`. Current Preview `6accc70` includes the correction. Deployment is not playback evidence.
- **Resume Viewer:** `3419:484` is the complete current-shell review frame and uses the authorized v13 first page.
- Active file key: `9zvk9iSRPKSsJ6llDJrQmA`. [FIGMA_NODE_MAP.md](FIGMA_NODE_MAP.md) remains the node authority.

## 9. Browser/render validation state

**SUPPORTED BROWSER RENDER VALIDATION BLOCKED / PORTFOLIO EXECUTION CONTINUES.** The supported browser returned `No browser is available` before a page loaded across multiple attempts. No supported-browser capture resulted. No concrete owner-side action (open, attach, or reconnect) is currently known. Do not ask the owner to troubleshoot without an explicit action from the browser system.

At the earlier recovery checkpoint on 2026-10-03, supported-browser selection returned `No browser is available`; discovery returned `[]`, and no page loaded or capture resulted. That checkpoint recorded Preview source `2fcb37a` at `https://c0f164f5.joshuaik2.pages.dev/`, then superseded by `a278c27` and now by `6accc70` (section 2). Live Figma metadata confirmed board `3482:2` and candidate `3482:3`, with the board explicitly labeled `NOT APPROVED`; this confirms the review artifact exists, not website parity or owner acceptance. Browser access remains unavailable.

Do not substitute Playwright, Selenium, Puppeteer, ad hoc screenshot automation, or another unsupported browser. Do not repeatedly retry with no availability change. Figma screenshots/MP4s, code inspection, tests/builds, HTTP status, and historical local captures do not establish current browser parity. Surfaces remain `NEEDS RENDER SYNC` where the queue says so.

The durable queue is [RENDER_VALIDATION_QUEUE.md](RENDER_VALIDATION_QUEUE.md). Current sequence:

1. Resume Found post-change environment and sharpness.
1a. Resume PDF viewer behavior.
2. Opening playback, Skip, handoff, reduced motion, and preference reversal.
3. Home; then Profile hover/focus.
4. Food Tracker full page.
5–7. Living in Silico, Stush Patties, and Fraymakers full pages.
8–9. Crest and Cho’Veigo full pages (preserve their meaningful prior render evidence; latest story changes still require a post-change compare).
10–11. Journey and Demos.
12–13. Help/recovery and narrow screens.
14–15. Hackathons and Education lobbies.
16. Shared rail/footer.

When browser availability returns: deploy a revision containing the latest source, compare against authoritative Figma, identify concrete discrepancies, correct, rerender, update statuses, then owner review and freeze. Do not retry just because a new chat began; retry when availability changes or at a natural validation checkpoint.

## 10. Actual owner-only inputs

- **Final J production selection:** v8 or a bounded derivative requires owner review; archive remains fallback.
- **Education CTA:** Figma says `VIEW EDUCATION` but does not define a prototype reaction or route. Owner must choose a destination/presentation or remove the CTA. React suppresses it instead of self-linking.
- **Personal Highlights:** authentic owner photos/content are not supplied; keep the state noninteractive/deferred rather than fabricate media.
- **X profile link:** no verified URL exists; the X glyph stays decorative and noninteractive unless supplied.
- **Optional evidence, not blockers:** current Food Tracker product media is unavailable in checked app-repo trees; Cho’Veigo playable media is optional; Fraymakers VOD/YAML example and a Stush field-level source example are unavailable. Use truthful diagrams and approved static captures; do not invent data.
- No owner-side browser action is known. The browser outage is not an owner blocker.

## 11. Recent decisions and changes to retain

- Six full-page case-study review frames and the four-state Profile strip are present and inspectable; these solve Figma clipping/review visibility, not acceptance.
- Profile Projects remains four equal sectors. Static counts expose separate overlays; they do not switch the main panel. Academics emphasizes `2028` with a separate expected-graduation label.
- Home's chosen icons, subnav treatment, Back/Confirm source geometry, and shell are source/Figma-aligned; rendered no-scroll and interaction checks remain open.
- Journey identity/sidebar geometry and credentials/traits are aligned to the scenic Figma route.
- Demos Play-to-iframe focus transfer and the visible iframe focus ring are in branch code at `6b81a4e`; current Preview `6accc70` includes the change. Focus rendering remains queued for supported-browser validation.
- Food Tracker's earlier-interface image is `public/media/case-studies/food-tracker-search-banana-earlier-ui.png`; it is a genuine pre-redesign screenshot, explicitly labeled as earlier UI and not the current product. Keep Food's revised opening; wait for authentic current product media for the next large uplift.
- Stush Patties has a restrained pipeline motion cue; it becomes static under reduced motion.
- A bounded factual source review across Food Tracker, Crest, Cho’Veigo, Fraymakers, Living in Silico, and Stush Patties found no actionable unsupported material claims. This source review does not establish rendered parity or owner acceptance.
- Updated existing story-contract expectations and the Resume fallback expectation to current documented contracts; `npm test -- --run` passes all 21 files / 81 tests on the current branch. The earlier baseline showed the same six stale contract failures. Changes after Preview `6accc70` are tests/docs only and leave deployed runtime source unchanged; the suite result does not establish render parity or owner acceptance.
- Fraymakers’ `PIPELINE` chapter resolves to unique target `fraymakers-pipeline`; the focused markup test passes 4/4. Actual scrolling and sticky behavior remain unverified.
- Resume Found uses authentic collected Ready Check assets and the one targeted environment pass. Resume Viewer uses authorized v13, review frame `3419:484`.
- Education is currently selection/preview-only because the CTA destination is undefined.
- The 2026-10-02 Figma/source work clarifies Opening's visible archive layers. Commit `ca85398` aligns opposing ring initial angles with live Figma; current Preview `6accc70` includes it, but playback remains unverified.
- J study `3482:3` / review board `3482:2` is the single bounded Sol 6.1 attempt completed during this transition. It changed no production source or asset and does not resolve the integrated-mark gap.

## 12. Agent/history lessons and rejected approaches

- An earlier long-running Codex goal became unrecoverable while GitHub and Figma survived. Its exact cause is not established. The lesson is to make branch state, decisions, blockers, owners, and next actions durable rather than depending on one enormous chat.
- Persistent specialists are useful for recurring independent domains; reuse present handles. A completed or missing handle is not assumed callable. Strong loops are builder → critic → lead; the lead decides and integrates.
- No arbitrary pass count, agent count, new Figma node, documentation volume, or “FINAL” label demonstrates progress or acceptance.
- The old Codex Pass16–80 J reconstruction lineage is rejected. Do not restart it, and do not treat its closure as closure of the active Sonnet branch.
- Avoid Figma-only iteration while implementation stagnates. Equally, do not call source inspection a visual comparison when rendering is required.
- Preserve unrelated modified and untracked worktree contents. Stage only intended deliverables; never bulk-clean this worktree.
- The browser outage blocks render validation only, never all portfolio work.

## 13. Immediate next-session actions

1. Open a new Mingo chat on **Sol 6.1** and use the bootstrap prompt below.
2. Read this handoff, `AGENTS.md`, `docs/AGENT_REGISTRY.md`, `docs/IMPLEMENTATION_STATUS.md`, `docs/RENDER_VALIDATION_QUEUE.md`, `docs/DEFERRED_OWNER_INPUTS.md`, `docs/CASE_STUDY_CONTENT_SOURCE.md`, and the J review before acting.
3. Recheck branch/HEAD/remote, current tracked/untracked worktree state, latest recorded deployment, current Figma, live agent tree, and browser availability. Preserve this checkpoint's dirty items.
4. Continue stable implementation/source work without broad redesign. Do not wait on J or missing optional media to work elsewhere. The 2026-10-03 Profile source review found that its static hover/focus preview controls were native buttons without an activation action. The current branch now uses named, keyboard-focusable, non-activating groups linked to the preview panel with `aria-controls`, preserving default Projects, hover/focus preview, and visible focus treatment without click-to-pin behavior. Keep actual screen-reader announcement verification in the browser/assistive-technology queue.
5. Review Sol 6.1 study `3482:3` against archive `159:2` and v8 `3325:191`; keep archive in production. The first bounded attempt is complete. An owner choice was requested on 2026-10-03: one final attempt, pause J work, or select Candidate 01. Do not repeat the question; wait for and follow the owner response before further J work.
6. Current Preview source `6accc70` includes Crest focus fix `6b81a4e`, Opening correction `ca85398`, landmark correction `d6c15b6`, and Profile semantics correction `2f7da0e`. The older `2fcb37a` Preview is superseded. The next step is supported-browser validation when an availability change or natural validation checkpoint permits it; no render acceptance is implied by deployment or packaging.
7. Do not retry the supported browser until availability changes or a natural checkpoint. Keep working the non-browser lanes and queue.
8. For each meaningful new design or owner decision, update the relevant status/spec, remove superseded guidance, commit, and push without waiting for a large code batch.

## 14. Things not to redo

- Do not redesign Home's architecture, Profile's base, the accepted lobbies, Journey, Help, or the owner-positive case-study openings without a concrete observed problem.
- Do not force new variants on Stush, Living in Silico, Food Tracker, or Fraymakers; preserve their current quality directions.
- Do not restart Cho’Veigo media sizing or Crest's strong human-review flow without new render evidence.
- Do not recreate the League Ready Check from generic shapes; use the authentic collected source.
- Do not treat all source-truth caveats as public copy.
- Do not promote a J candidate because it has many passes or looks editable; owner review decides production.
- Do not call a page accepted from a Figma-only view or source-only review.

## 15. Bootstrap prompt for the next Sol 6.1 Mingo chat

> You are Mingo, director of the existing League portfolio project. Continue from `docs/SESSION_HANDOFF_2026-10-02.md`; do not restart the project or enter Plan Mode. First verify branch, exact HEAD/remote, worktree, latest staging record, live Figma, active agent tree, and supported-browser availability. Current owner instructions and current repo/Figma override historical chat summaries. Preserve approved surfaces and continue mature React/source work; browser render validation is blocked only for that lane, so do not use unsupported browser automation or infer parity. Keep archive J `159:2` in production; v8 `3325:191` is the editable baseline and Sol 6.1 study `3482:3` is an unapproved directional candidate on board `3482:2`. Review it with the owner before any further attempt or production change; the old Codex lineage is rejected. Reuse/re-establish one narrow Sol 6.1 J specialist only if the owner wants the remaining bounded attempt(s). Use Luna for routine execution and no continuous Astra lane. Before any work, inspect the queue and source-truth docs; preserve all dirty/untracked work. For meaningful decisions, update durable docs, commit, and push. Continue without broad redesign or redundant pass generation.
