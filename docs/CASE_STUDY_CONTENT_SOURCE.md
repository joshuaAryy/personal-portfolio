# Case Study Content Source

This is the source-truth record for the six long-form stories. It preserves facts, uncertainty, ownership boundaries, and technical context so public design can remain accurate. It is not a public-copy deck and does not dictate what must appear in the hero. Use [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md) and [FIGMA_IMPLEMENTATION_SPEC.md](FIGMA_IMPLEMENTATION_SPEC.md) for the visitor-facing order and visual treatment.

## How to use this source

- Preserve the truth and claim limits below; do not paste source notes into the public page by default.
- Public copy should help a first-time visitor understand the product and Joshua’s strongest truthful technical work. Relocate or omit details that do not serve that story.
- Keep internal uncertainty in this file. Surface a caveat publicly only when it changes the interpretation of a claim.
- Prefer direct first-person wording for work Joshua built. Keep shared ownership accurate without making disclaimers the story.

## Food Tracker — source truth

**Implementation reconciliation, 2026-10-03:** source was inspected at immutable app commit `4674e78b2ddcd705be323f9bfafb23b95b7848ea`. See [implementation paths and depth audit](coverage-audit/PRODUCT_AND_TOOL_SYSTEMS.md). Historical nutrition is preserved through serving/nutrition snapshots, but food-log routes permit user-scoped edits and deletion; snapshot-backed serving changes recalculate from the stored basis. Recipe/mixed-meal entries have different edit constraints. Do not describe the entire log as append-only or history as uneditable.

The pinned implementation includes manual/catalog/reusable logging, serving resolution, history management, and Insights. Simple and Complex remain presentations of one product; Insights includes overview/recommendations and deeper nutrient/trend exploration where available. Code presence does not establish public release or current screenshot parity.

Photo logging is now verified in code: JPEG input → structured Gemini food/quantity suggestions → catalog candidates/serving rules → user review → confirmation. A separately enabled candidate-adjudication path can choose supplied candidates or produce bounded low-trust estimates; estimates are labeled and editable, rather than automatically becoming trusted nutrition. Do not claim the model independently determines authoritative nutrition. The repository flags specific photo adjudication/manual checks as not tested; do not claim those checks passed. Joshua's specific authorship of photo-model implementation is not established by this audit; retain the documented product-direction/agent-assistance boundary.

Food Tracker is a mobile-first nutrition tracker for quick food logging, reliable search and serving conversion, recommendations, and long-term insight. Simple and Complex are presentation levels over one product/backend. Joshua initiated the product and led requirements, priorities, architecture direction, workflow design, evaluation, and product decisions. Implementation received substantial Codex/agent assistance; do not imply Joshua wrote most production code.

AI may interpret food intent; trusted nutrition data and backend serving conversion determine nutrition. Search combines deterministic and fuzzy retrieval with semantic candidates, then evaluates/ranks deterministically. Pinecone supplies candidates only, not final rank or nutrition authority. The canonical log preserves historical nutrition; unknown values are not zero.

The offline benchmark compares legacy retrieval with the full hybrid approach:

| Query set | Legacy Top-1 / Top-3 / Top-5 | Full hybrid Top-1 / Top-3 / Top-5 |
|---|---|---|
| Development (80 queries) | 40/80 / 40/80 / 40/80 | 71/80 / 72/80 / 72/80 |
| Holdout (40 queries) | 25/40 / 25/40 / 25/40 | 27/40 / 28/40 / 28/40 |

The reference catalog has 12,363 active foods and 277,341 nutrient rows. These are scale facts, not users or impact. An owner interview reports that semantic retrieval added substantial latency for little benchmark recovery; no verified timing values/units or committed snapshots exist. Do not invent a latency number or fuzzy-recovery count. Tests passed while relevance remained poor; evaluation informed retrieval architecture. Keep that separate from the earlier Pinecone pagination issue that left partial/stale index state and from the later staging reindex interrupted by an integrated-inference quota; bounded 429 retries later completed the 12,363-document rebuild.

The workflow used bounded agent tasks, specifications, acceptance/regression checks, evaluation, debugging direction, and independent review. Do not claim broad production/live completion, adoption, or invented outcomes. Publicly describe product/architecture leadership with AI-assisted implementation; do not say “AI built the product.”

## Crest — source truth

Crest is an expense-intelligence workspace built by a four-person team at MPC Hacks 2026 for the Brim Financial Challenge. The team placed third in that challenge, not third overall. The UI contains sample/challenge data; values do not establish customers, adoption, production volume, or business impact. Do not use transaction counts or spend as impact.

Joshua’s focus included backend/data workflows, the Policy Compliance Engine, rule-based anomaly signals, policy retrieval, part of preapproval, and the presentation. Do not attribute initial MongoDB setup, the primary frontend, or the main Gemini integration to him. Deterministic finance/policy rules are authoritative; Gemini interprets retrieved policy passages. Anomaly signals are heuristics, not an ML fraud classifier. Finance Q&A/reporting is a separate workspace capability; its retrieval stack and Joshua’s integration ownership are not established. Do not conflate it with policy-PDF RAG.

Owner-reported policy retrieval: Brim policy PDF → extraction/chunking → Gemini `embedding-001` → 3,072-dimensional vectors → MongoDB Atlas `policy_chunks` → vector retrieval → grounded prompt. Deployment details are owner-reported, not independent proof of a live service. The presentation exceeded its allotted time; this supports a concise communication lesson.

## Cho’Veigo — source truth

Cho’Veigo is a two-person project with Shiv Arora for AI-assisted job discovery and resume tailoring based on evidence rather than keyword overlap. Joshua led Jobs-side work and shared product/evaluation direction, behavior review, retrieval priorities, and acceptance of matching behavior. Do not imply sole ownership of the full implementation.

The system combines job feeds and persisted role data with deterministic Fit/Eligibility assessment and bounded, structured Gemini interpretation. It distinguishes Fit, Eligibility, and Recommendation; weighs responsibilities/core requirements; permits transferable evidence; and constrains the model from inventing experience. Recommendation is a distinct outcome, with resume tailoring downstream; the handoff does not specify a separate Recommendation formula. Human review informed expected behavior and regression fixtures; this was not multi-rater or research-grade validation.

An owner-reported anecdote says the system surfaced at least one role Joshua likely would not have found manually. The employer is uncertain and must not be named. This is a personal qualitative account, not general discovery-quality or measured-impact evidence. The selected Recommendations image is an owner-cleared static capture, not playable media. Do not claim automatic application submission, broad live deployment, quantified time savings, or research-grade validation.

## Fraymakers / UploadAssistant — source truth

Fraymakers is a tournament VOD and media-preparation tool. Joshua’s brother started the broader project and owned its foundation, CLI, Challonge integration, and much of the early workflow/API groundwork. Joshua joined later; he built `thumbnail.js` and worked on YAML/configuration, thumbnail generation/integration, and some YouTube API work. Keep attribution accurate, but these facts are not required in hero copy.

The workflow uses tournament/match information to identify videos and generate 1280×720 thumbnails. Inputs include logos, stage/background art, character/sprite art, costumes, assists, foreground art, and text/set labels. node-canvas handles aliasing, P2 mirroring, long names, and missing assets. Generated thumbnails were used on real Fraymakers VODs. YouTube Data API/OAuth remained a prototype; automatic upload was not completed. Do not fabricate unavailable screenshots or media.

## Living in Silico — source truth

Living in Silico covers technical learning during an AI/ML Research Intern role in Generative Molecular Modeling (March–June 2025), including computational chemistry, biomedical research, and ML/fragment-based experiments.

The April 12 dataset snapshot (15,696 rows; 14,487 unique SMILES) is separate from curated experimental subsets of roughly 400–600 entries. Owner-supplied method details include DeepMol CSVLoader, Morgan fingerprints (radius 2, 128 bits), and an RNN MolecularGenerator run for 10 epochs with batch size 64. DeepMol work produced 500 generated SMILES samples; do not call them valid, unique, or novel molecules. Run artifacts do not verify how every method detail relates to those 500 samples. That uncertainty remains in this factual source; it is not automatically public copy.

Some fragment-based workflows succeeded, including fragment linking and spatial workflows using RDKit / Fragmenstein. REINVENT4 was researched/attempted, but successful generation was not achieved. Do not claim research impact, a consumer product result, or successful REINVENT4 generation. The technical public story should explain representation, methods, outcomes, and learning; this is presentation direction, not an instruction to reproduce every source caveat.

## Stush Patties — source truth

Stush Patties was a Software Engineering Intern experience (September–November 2025), on a two-person technical team with Shiv, for an external client through Riipen / IBM SkillsBuild. These are facts, not hero requirements.

Three distributor sources were named in the owner brief: Koyo, UNFI, and Dovre. CSV, XLSX, and XLSB formats appeared across inputs; do not assign a format to a specific source without evidence. Heterogeneous layouts required parsing into a shared schema, then normalization/alignment of sales, units, case packs, and reporting months. The workflow produced standardized CSV output, a data dictionary, and a quality report for a Power BI handoff; describe this as a repeatable path from files to reporting, not a measured business impact.

Joshua built Python parsing and normalization work and shaped practical data rules and stakeholder requirements. The Koyo input needed a temporary position-and-cell parsing exception; no field-level example was supplied. Retain the exception here for truth, but public diagrams should explain the generic system. If the exception is useful to a visitor, introduce it later as an engineering decision with context. Do not reproduce client records, invent dashboard results, claim sole ownership, or use an unverified improvement percentage.

## Cross-project factual boundaries

- Evaluation informed Food Tracker retrieval and Cho’Veigo matching behavior.
- Crest separates deterministic finance/policy rules from bounded AI interpretation. Food Tracker and Cho’Veigo also keep AI within defined evidence boundaries.
- Preserve shared ownership across Crest, Cho’Veigo, Fraymakers, and Stush without weakening Joshua’s verified ownership.
- Contact, repository, and resume destinations must come from existing verified project sources.
