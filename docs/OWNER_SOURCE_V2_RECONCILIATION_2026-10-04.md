# Owner Source v2 Reconciliation — 2026-10-04

## Scope and source model

Reviewed the complete `portfolio_owner_source_v2.zip` supplied by the owner, including its README, ingestion prompt, provenance index, six deep project dossiers, Education capability brief, and `raw_context/CASE_STUDY_CONTENT_SOURCE_old.md`. The package was extracted outside the repository at `C:\Users\samue\AppData\Local\Temp\portfolio-owner-source-v2-ingestion-2026-10-04-root\portfolio_owner_source_v2` for inspection. The old raw-context file is provenance, not a replacement for the current portfolio source record.

This report preserves three separate layers:

- **OWNER REPORT** — motivation, role, decisions, collaboration, learning, and remembered project history in v2.
- **ARTIFACT / IMPLEMENTATION EVIDENCE** — current source, reports, tests, screenshots, and render records.
- **RECONCILED SOURCE TRUTH** — current `docs/CASE_STUDY_CONTENT_SOURCE.md` and `docs/coverage-audit/`, which state what can safely support public claims.

This is a content/evidence reconciliation only. No public page, Figma design, React component, test, or canonical source-truth document was changed. The current pages are reviewed against the latest available October 4 render-sync records; older coverage rows explicitly labeled historical/pre-sync are not treated as current findings where later evidence resolves them.

## Food Tracker — reconciled; macro breadth is already present

**New OWNER REPORT context:** The project began as Joshua’s own gym/nutrition product, with the internal aim “Simple tracking, serious insight.” The Simple/Complex distinction is explicitly a presentation-depth choice over one backend and product. The dossier adds a deeper longitudinal account of nutrition snapshots, serving conversion, provider expansion, all logging paths, recommendation and analytics evolution, security/authentication, deployment/native validation, engineering failures, and Joshua’s product/technical ownership through a steer-and-delegate process. This is substantially more context than the prior source record’s compact description.

**Already represented correctly:** Current source truth already covers the product purpose, Joshua’s product direction and agent-assisted implementation, trusted nutrition/serving authority, unknown-versus-zero, editable logs with snapshot-backed history, photo suggestions and review limits, hybrid retrieval and its offline benchmark, catalog scale, and important failure distinctions. The immutable implementation audit and tests support the listed current-code paths. The most recent Food/Cho render report says the Food page now leads with product, logging, and Insights before retrieval, then covers evidence, architecture/data trust, evaluation, learning, and close; the five logging paths share a Review Before Save destination. That resolves the old pre-sync criticism that the page was primarily a search story.

**Public/page assessment:** No clear macro-story omission is established by the latest render comparison. The case study communicates the product beyond search. The v2 dossier does expose additional systems that are not independently explained in the public story—especially the recommendation lifecycle, provider/data ingestion depth, account/security evolution, and staging/native/release validation. These are candidates for owner review, not a requirement to append every subsystem.

**Qualified or conflicting claims:** The owner interview says fuzzy retrieval recovered 32/40 legacy misses; repository-backed evidence says 31/40. Historical test totals belong to different checkpoints. Photo adjudication/manual-check paths remain partly untested, and Joshua’s specific authorship of the image-model implementation is not established. Code presence does not prove public deployment or current runtime validation. “Immutable history” means snapshot-backed nutrition authority; user-scoped edits/deletion exist.

**Useful internal context:** The evolution from manual logging to multiple converging input paths, the difference between product modes and separate applications, the failures that changed engineering practice, and the owner-led acceptance/evaluation workflow. Keep test totals, phase numbering, provider setup history, and detailed failure chronology out of public copy unless a specific decision/story needs them.

**Evidence still open:** No canonical current-build app screenshot/demo is available in this portfolio evidence set. Some native/provider/device and photo-adjudication paths have not been proven at the same checkpoint. Current interface evidence should not be inferred from an older search capture.

**References:** [Food source truth](CASE_STUDY_CONTENT_SOURCE.md#food-tracker--source-truth); [Product/tool coverage audit](coverage-audit/PRODUCT_AND_TOOL_SYSTEMS.md#food-tracker); [latest Food/Cho render sync](case-study-review/FOOD_CHO_RENDER_SYNC_2026-10-04.md); dossier §1–21.

## Crest — reconciled; full workstream breadth is present, with bounded depth questions

**New OWNER REPORT context:** The dossier adds the challenge brief and team names, more hackathon execution/debugging context, a careful interpretation of transaction-count variation, and more detail on rule examples, preapproval, policy retrieval, and separate finance Q&A/reporting. It reinforces Joshua’s backend/data/compliance contribution while explicitly excluding initial MongoDB setup, primary frontend, and main Gemini integration.

**Already represented correctly:** Current source truth already records the Brim Financial Challenge’s third-place result, four-person collaboration, source-backed policy-PDF prototype, deterministic split-transaction signal, mock/human-decided preapproval, separate Finance Q&A paths and uncertain Joshua ownership, presentation lesson, and limits on deployment/data claims. Crest’s October 4 render report says the current page shows the expense-review product, deterministic finance signals, retrieved-policy path, separate Finance Q&A/reporting, ownership boundaries, challenge result, and presentation lesson.

**Public/page assessment:** No missing major workstream is confirmed at the current page level. The latest page is broader than the earlier narrow-RAG framing. Some subsystem explanation may remain compact—particularly what a reviewer supplies/receives, how a specific deterministic cue affects review, and the boundary between Finance Q&A and policy-PDF retrieval—but this is a depth/selection question, not evidence that those systems are absent.

**Qualified or conflicting claims:** 4,235 is challenge/demo data context, not product impact; other captures contain different counts/data states. Policy retrieval is verified as a standalone prototype, not proof of a live service. Finance Q&A has multiple paths, and Joshua’s ownership of that integration is unresolved. Preapproval is mock/template-based and leaves decisions to a person. The prize is third in the Brim Financial Challenge, not third overall. The successful state of one compliance UI capture is not established by a screenshot that says “analysis unavailable.”

**Useful internal context:** The wrong database/dropdown incident and overlong pitch explain the hackathon lesson. Keep the data-path uncertainty and per-person ownership detail available to product/strategic review without turning the public page into defensive caveats.

**Evidence still open:** Capture-time dataset/HAR or equivalent evidence for the showcased data path; a successful compliance state if that UI is to be shown; precise ownership for Q&A/preapproval stages; deployment claims.

**References:** [Crest source truth](CASE_STUDY_CONTENT_SOURCE.md#crest--source-truth); [Crest implementation evidence](coverage-audit/CREST_IMPLEMENTATION_EVIDENCE.md); [latest Crest/Fraymakers render sync](case-study-review/CREST_FRAYMAKERS_RENDER_SYNC_2026-10-04.md); dossier §1–15.

## Cho’Veigo — reconciled; accepted pipeline is broad, with optional product surfaces

**New OWNER REPORT context:** v2 adds the wider Career/Master Profile, Tailored/Explore/Saved job flows, feed normalization and persisted-role context, the evolution away from additive keyword scoring, ATS retrieval priorities, cover-letter and DOCX/PDF workflows, and the detailed human review-to-regression-fixture loop. It gives a fuller account of the two-person project and Joshua’s Jobs-side ownership without assigning him the original resume/evidence-import foundation.

**Already represented correctly:** Current source truth covers two-person ownership, the Jobs pipeline, evidence-first Fit and Eligibility, separate Recommendation, bounded structured Gemini interpretation, the downstream Resume Studio handoff, human-reviewed fixtures, qualitative role-discovery anecdote, and the local/public repository state discrepancy. Implementation evidence separates committed saved-job handoff from staged Resume Studio behavior. The current page/render report shows role/posting data plus candidate evidence, distinct Fit/Eligibility/Recommendation concepts, model boundaries, Resume Studio handoff, evaluation, and close.

**Public/page assessment:** The latest render comparison does not establish that the accepted core story is materially incomplete. Cover-letter workflow, document export details, and the wider set of job views appear to be additional product context not necessarily visible as separate chapters. Treat them as optional breadth for owner review rather than automatically expanding the current accepted pipeline.

**Qualified or conflicting claims:** Owner describes a completed/usable local application; later public-repository status describes an in-progress vertical slice/redesign. Deployment remains unresolved. The Recommendation formula is unspecified. Resume Studio details in staged files must not be attributed to immutable committed HEAD. Human-reviewed fixtures are product-engineering evaluation, not research-grade or multi-rater validation. Do not claim auto-application, measured time savings, or broad live use. The source video contains personal contact fields; the chosen static Recommendations capture is the safe current evidence.

**Useful internal context:** Why responsibilities, core requirements, transferable evidence, and major gaps displaced keyword overlap; how a mismatch could challenge expected product behavior rather than just the code; private demo sanitization history.

**Evidence still open:** Current deployment/domain; provenance for staged Resume Studio mechanics and authorship; safe public media endpoint and full privacy review; module-level ownership evidence; canonical current-build screenshots.

**References:** [Cho source truth](CASE_STUDY_CONTENT_SOURCE.md#cho-veigo--source-truth); [Cho implementation evidence](coverage-audit/CHO_IMPLEMENTATION_EVIDENCE.md); [Food/Cho render sync](case-study-review/FOOD_CHO_RENDER_SYNC_2026-10-04.md); dossier §1–18.

## Fraymakers / UploadAssistant — reconciled; complete media pipeline is represented

**New OWNER REPORT context:** v2 supplies the fuller workflow from tournament/match context through YAML, video association, assets, rendering, output, and YouTube API prototype; names the renderer edge cases; and stresses that Joshua joined his brother’s existing project later. Joshua reports `thumbnail.js` as entirely his work, alongside YAML/configuration, integration, and some YouTube API contribution.

**Already represented correctly:** Current source truth already preserves the same ownership boundary, `node-canvas`, 1280×720 output, P2 mirroring, aliases, long names, missing assets, real-VOD use, and unfinished automatic upload. The latest render report confirms these pipeline stages and seven compositor input categories are visible in the page, including ownership split and prototype boundary.

**Public/page assessment:** No major workstream is clearly missing in the latest current story. The dossier does not justify enlarging this compact project to flagship scale. Visual proof remains weaker than the narrative because the authentic project assets are not in this workspace.

**Qualified or conflicting claims:** The owner’s `thumbnail.js` attribution is valid owner testimony, but the authentic source repository/output files are unavailable here. Exact YAML keys and composition ordering remain unverified. YouTube Data API/OAuth work did not complete automatic upload. Git history on its own must not erase work done on another machine.

**Useful internal context:** The brother-owned foundation/CLI/Challonge boundary, Joshua’s later subsystem ownership, and real VOD use. Preserve these details for accurate attribution; no productivity percentage is supported.

**Evidence still open:** Private repo/ZIP, generated thumbnail examples and matching VODs, YAML samples, game assets, and exact API work from the other laptop. Do not repeat local-machine searches or fabricate a product capture.

**References:** [Fraymakers source truth](CASE_STUDY_CONTENT_SOURCE.md#fraymakers--uploadassistant--source-truth); [latest Crest/Fraymakers render sync](case-study-review/CREST_FRAYMAKERS_RENDER_SYNC_2026-10-04.md); dossier §1–11.

## Living in Silico — reconciled; three distinct research paths are now explained

**New OWNER REPORT context:** v2 adds the first-internship/domain-ramp story, supervisor and group context, the owner’s personal learning motivation, experiment/deliverable history, and fuller explanation of why the three methods were tried. DeepMol/RNN, RDKit/Fragmenstein fragment work, and REINVENT4 are explicitly separate routes with separate outcomes.

**Already represented correctly:** Source truth already separates the April snapshot from 400–600-entry experiment subsets, preserves DeepMol’s 500 generated SMILES as strings without validity/novelty claims, describes Morgan settings and fragment workflows, and says REINVENT4 did not successfully generate. The latest React/Figma render report verifies route-specific rationale, input/method, contribution, outcome, and learning are present; it reports no concrete macro or responsive mismatch.

**Public/page assessment:** No material technical workstream omission remains in the current expanded page. Personal learning context is available if useful, but the visitor-facing story does not need to expose private routine details to demonstrate the research arc.

**Qualified or conflicting claims:** A dated May 2025 report attributes 500 samples/RDKit checking to REINVENT4, while the owner correction attributes 500 generated SMILES samples to DeepMol/RNN and says REINVENT4 did not reach generation. No run logs/source resolve this; keep the conflict explicit and use the owner-corrected account with the sample count carefully qualified. Do not claim valid, unique, novel molecules, drug candidates, or research impact. Do not reuse older unsupported QSAR/QSPR/GNN/Transformer, molecule-count, or improvement claims.

**Useful internal context:** The fast ramp-up into computational chemistry, the learning arc across representations/tools, and the value of reporting an unsuccessful experiment honestly. Personal late-night lecture anecdote is optional narrative context, not a project result.

**Evidence still open:** Notebooks/source, run logs/output inspection, dataset provenance and permission, report conflict resolution, and logo-use permission. Internal research materials should not become public evidence by default.

**References:** [Living in Silico source truth](CASE_STUDY_CONTENT_SOURCE.md#living-in-silico--source-truth); [Research/data audit](coverage-audit/RESEARCH_AND_DATA.md#living-in-silico); [latest Living/Stush render sync](case-study-review/LIVING_STUSH_PREVIEW_RENDER_SYNC_2026-10-04.md); dossier §1–14.

## Stush Patties — reconciled; data-engineering breadth is represented

**New OWNER REPORT context:** The dossier adds richer client/stakeholder and requirements context, how the business goal became practical data rules, and why a temporary Koyo position/cell parser was the bounded exception rather than a general design pattern.

**Already represented correctly:** Current source truth covers the three distributors, formats across inputs without a per-distributor mapping, shared schema and sales/units/case-pack/month dimensions, Koyo exception, CSV/dictionary/quality-report/Power BI outputs, two-person collaboration, and no metrics/private data. Latest Figma/Preview evidence confirms this whole pipeline, ownership, client collaboration, and learning appear in the page.

**Public/page assessment:** No material breadth gap is established by the latest rendered page. The case now explains messy inputs → shared schema → normalization → bounded exception → repeatable reporting. Do not add field-level parsing detail unsupported by the source or expose client data.

**Qualified or conflicting claims:** CSV/XLSX/XLSB are formats across the set; no distributor-to-format mapping is supported. The exact canonical schema and per-field rules are not fully preserved. Older 40–50% time-improvement claims are unverified. Ownership was shared with Shiv; do not claim sole ownership.

**Useful internal context:** Stakeholders supplied a business goal rather than a clean technical spec; requirements translation and bounded pragmatic engineering are available as narrative context. Stakeholder titles and client numbers should not be inferred.

**Evidence still open:** Original source files and exact field rules are not present. Use only synthetic/reconstructed visuals; no real client workbook or dashboard data.

**References:** [Stush source truth](CASE_STUDY_CONTENT_SOURCE.md#stush-patties--source-truth); [Research/data audit](coverage-audit/RESEARCH_AND_DATA.md#stush-patties); [latest Living/Stush render sync](case-study-review/LIVING_STUSH_PREVIEW_RENDER_SYNC_2026-10-04.md); dossier §1–12.

## Education capability briefs — new owner layer; three sections remain evidence-pending

The brief is a capability-demonstration source, not a deep product-case-study outline. It must not become assignment bookkeeping. Current page has four selected projects, with meaningful technical detail for the ALU/FSM and evidence-pending cards for Dental, Bookstore, and the CMOS amplifier.

**Dental Clinic DBMS — new OWNER REPORT:** CPS510 project is in progress and spans requirements/modeling toward an Oracle relational system. The owner brief identifies an Assignment 3 slice containing Patient, Procedure, Dentist, Inventory, Procedures_inventory, Appointment, Appointment_procedure, and Billing, with Joshua focused on Appointment/Appointment_Procedure and a partner on Billing. Intended whole-course scope includes broader clinic workflows, but completed implementation and intended future scope must stay distinct. **ARTIFACT status:** the project schema/source was not found locally. Keep the public section marked current/in progress and evidence-pending; do not present intended entities/constraints as completed implementation until source is inspected.

**Java/OOP Bookstore — new OWNER REPORT:** owner describes a Java/Swing desktop bookstore with owner/customer paths, book/customer state, purchasing/loyalty behavior, local persistence, OOP separation, State pattern, and shared Singleton application state. **ARTIFACT status:** no Java source/submission was found locally; course attribution varies in older materials. The page remains evidence-pending; do not promote old resume claims into implementation truth.

**8-bit ALU/FSM — owner and artifact layers mostly agree:** brief describes an 8-bit ALU controlled by a multi-state FSM, clocked sequence, status/display path, and waveform validation. Current [Education audit](coverage-audit/EDUCATION.md) directly inspected VHDL/BDF source and confirms nine-state progression, opcode branches, negative-result/display behavior for the selected revisions. It also records that the selected `FSM.vhd` resets on `reset = '1'` while a BDF port is named `Resetn`; do not claim an active-low reset without resolving top-level wiring. Operation lists/input values vary by revision. Waveform files prove setup, not passing traces. Current page’s selected-source framing is appropriate.

**Four-stage CMOS amplifier — new OWNER REPORT:** brief supplies a simulation-based analog-design problem, multi-stage topology and bias/gain/load tradeoffs, KiCad SPICE workflows, and examples of DC/AC/transient analysis. It warns that exact final figures/topology vary by revision and must be reopened before publication. **ARTIFACT status:** no authentic KiCad/schematic/SPICE project was found locally. Keep this card evidence-pending; do not publish exact gain/current/swing figures, claim fabricated hardware, or choose a conflicting topology from memory.

**Useful internal context:** The intent is to demonstrate different engineering modes—relational modeling, OOP/stateful desktop application design, digital logic/FSM, and transistor-level analog simulation—not four equally long project biographies.

**References:** [Education artifact audit](coverage-audit/EDUCATION.md); [Education ALU render report](case-study-review/EDUCATION_ALU_RENDER_SYNC_2026-10-04.md); v2 `07_EDUCATION_CAPABILITY_BRIEFS.md` §§1–4.

## Cross-project conclusions

### Public pages that are clearly under-informed now

- **Education is the one clear visitor-facing content gap:** three project cards remain intentionally evidence-pending and therefore have little technical explanation. v2 now provides owner-reported context, so this is no longer a permanently sparse-content problem, but the owner’s earlier instruction keeps technical claims gated until the source context is reviewed and clearly attributed. Dental and Bookstore are especially dependent on original source recovery; the CMOS description must remain free of exact unsupported results. The verified ALU card is not in the same status.
- For the six professional/research pages, the latest October 4 render reports show the earlier breadth directions synced and present. No other page is currently classified as materially incomplete solely because v2 contains additional detail. The owner may decide later whether optional Food security/recommendation/deployment depth, Cho cover-letter/export paths, or further Crest subsystem detail earns public space.

### Durable source documents recommended for a later reconciliation edit

1. **`docs/CASE_STUDY_CONTENT_SOURCE.md`** — preserve a clear OWNER REPORT pointer for v2. Enrich only the missing source truth: Food’s broader product/lifecycle context; Cho’s wider profile/jobs/application surfaces; Living in Silico’s personal/research learning context; and a separate Education source section or linked Education content source. Crest, Fraymakers, and Stush already capture most core v2 facts; avoid duplicating full dossiers.
2. **`docs/coverage-audit/EDUCATION.md`** — add a distinctly labeled owner-report layer for Dental, Bookstore, and CMOS while retaining the current artifact-evidence gaps and ALU revision/reset caveats.
3. **`docs/coverage-audit/PRODUCT_AND_TOOL_SYSTEMS.md`** and **`docs/coverage-audit/RESEARCH_AND_DATA.md`** — keep the pre-sync gap tables marked historical/resolved and make the latest October 4 render evidence the current coverage status. Add only residual optional omissions and evidence boundaries; do not repeat obsolete gaps as current.
4. **`docs/DEFERRED_OWNER_INPUTS.md`** — update only after checking it against v2, especially resolved owner-context questions for Living in Silico and deferred original artifacts for Fraymakers/Education. Preserve unresolved evidence requests.
5. Keep the full v2 dossier accessible to future strategic agents (with its direct section references) rather than replacing it with a compressed synopsis. If the owner wants it repo-durable, choose a private/appropriate source location deliberately; the supplied ZIP currently lives in Downloads and the extracted copy is temporary.

### Strategic Sol assessment

**No strategic Sol decision is warranted now.** This checkpoint asks for source reconciliation, not a new narrative hierarchy. Existing accepted Food/Cho direction and October 4 page/render reports resolve the earlier major coverage concerns for the six long-form pages. The Education content gap has a clear owner gate and artifact boundary. If the owner’s site review decides to reopen a major case-study narrative—especially Food’s breadth or Education’s technical framing—send Sol a neutral Decision Packet with the relevant v2 dossier sections and direct page/evidence references; do not send only this report.

## Review disposition

Wait for owner feedback and the owner’s website-review pass before changing public pages or expanding the six professional stories. No page copy, layout, or implementation is authorized by this reconciliation report alone.
## Owner-supplied archive follow-up - 2026-10-04

The owner later supplied `portfolio_owner_source_v2.zip` while answering the missing Education artifact question. Its 11 entries are Markdown owner-source material only: six deep project dossiers, the Education capability brief, README, ingestion prompt, provenance index, and older raw-context source copy. It contains no Dental SQL/schema, Bookstore Java/submission, or CMOS KiCad/SPICE implementation files. This confirms the archive is the OWNER REPORT layer, not new implementation evidence. Dental, Bookstore, and CMOS remain evidence-pending; the verified ALU source assessment is unchanged. Do not use old resume claims as implementation proof.
