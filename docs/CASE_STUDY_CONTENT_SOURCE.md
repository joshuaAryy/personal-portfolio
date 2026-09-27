# Case Study Content Source

Concise factual handoff for public portfolio stories. Use first person for Joshua's contributions where natural. Keep each claim within the project scope described here.

## Food Tracker

Food Tracker is a mobile-first nutrition tracker designed to make logging quick while keeping food search, serving conversion, recommendations, and long-term insight reliable. Simple and Complex are presentation levels over one product and backend.

Joshua's original motivation included his own gym and nutrition use. Do not extend that motivation into user research or product impact claims.

Joshua initiated the product and led its requirements, priorities, architecture direction, workflow design, evaluation, and product decisions. Implementation received substantial assistance from Codex and AI agents; do not imply Joshua personally wrote most production code.

AI can interpret food intent, while trusted nutrition data and backend serving conversion determine nutrition values. Search combines deterministic and fuzzy retrieval with semantic candidates, then evaluates and ranks candidates deterministically. Pinecone supplies candidates; it is not the final ranker or nutrition authority. Logging is canonical, historical nutrition is immutable, and unknown nutrition is not zero.

The offline search benchmark compared legacy retrieval with the full hybrid approach:

| Query set | Legacy Top-1 / Top-3 / Top-5 | Full hybrid Top-1 / Top-3 / Top-5 |
| --- | --- | --- |
| Development (80 queries) | 40/80 / 40/80 / 40/80 | 71/80 / 72/80 / 72/80 |
| Holdout (40 queries) | 25/40 / 25/40 / 25/40 | 27/40 / 28/40 / 28/40 |

The reference catalog contains 12,363 active foods and 277,341 nutrient rows. These are catalog-scale figures, not users, impact, or outcomes. The owner interview reports that semantic retrieval added substantial latency for little recovery in that benchmark. Keep this as a qualitative, interview-attributed observation; no committed timing snapshots or verified latency values are available. Do not add latency numbers or units, or a separate fuzzy-recovery count. Tests alone did not establish useful search quality; evaluation exposed gaps and informed the architecture. Do not claim broad production or live completion, adoption, or invented product results.

Keep failure episodes distinct. Tests passed while search relevance remained poor, and an earlier Pinecone pagination issue left partial or stale index state. In a separate staging reindex, an integrated-inference token quota stopped indexing after a partial load; bounded 429 retries later completed the 12,363-document rebuild. Do not describe rate limits as the cause of that interruption.

The development workflow evolved toward bounded agent tasks, written specifications, acceptance and regression checks, evaluation, debugging direction, and independent review. Tests did not replace relevance evaluation, and generated implementation still needed architectural judgment. Publicly describe this as Joshua's product and architecture direction with AI-assisted implementation, not “AI built the product.”

## Crest

Crest is an expense-intelligence workspace built by a four-person team at MPC Hacks 2026 for the Brim Financial Challenge. The team placed third in the Brim Financial Challenge, not third overall.

Joshua focused on backend and data workflows, the Policy Compliance Engine, rule-based anomaly signals, policy retrieval, part of the preapproval flow, and the presentation. Do not attribute initial MongoDB setup, the primary frontend, or the main Gemini integration to him.

The workflow combines transaction review, policy context, anomaly signals, and preapproval. Deterministic finance and policy rules remain authoritative; Gemini interprets retrieved policy passages. Anomaly signals are heuristics, not an ML fraud classifier. The displayed interface uses sample/challenge data. Its values do not establish customers, adoption, production volume, or business impact. Do not use transaction counts or spend as impact claims. The presentation ran over its allotted time, supporting a concise communication lesson.

The owner-reported retrieval flow is: Brim policy PDF → extraction and chunking → Gemini `embedding-001` → 3,072-dimensional vectors → MongoDB Atlas `policy_chunks` → vector retrieval → grounded prompt. Treat deployment details as owner-reported; this does not change Joshua's ownership boundaries or independently verify a live service.

## Cho’Veigo

Cho’Veigo is a two-person project with Shiv Arora for AI-assisted job discovery and resume tailoring based on evidence rather than keyword overlap. Joshua led the Jobs side and contributed product and evaluation direction, behavior review, retrieval priorities, and acceptance of matching behavior. Do not imply sole ownership of the full implementation.

The system combines job feeds and persisted role data with deterministic fit evaluation and bounded Gemini interpretation. It distinguishes Fit, Eligibility, and Recommendation, weighs responsibilities and core requirements, allows transferable evidence, and constrains the model from inventing candidate experience. Human review informed expected behavior and regression fixtures; this was not multi-rater or research-grade validation.

An owner-reported anecdote says the system surfaced at least one role Joshua likely would not have discovered manually. The exact employer is uncertain and must not be named. Keep this as a qualitative personal account, not evidence of general discovery quality or measured impact. The current story copy is a faithful, narrowed rendering of the owner handoff and archived case node `1425:854`; do not add an employer or quantified time-saving claim.

The portfolio story uses a static Recommendations view. Do not claim full automatic application submission, broad live deployment, quantified time savings, or research-grade validation.

## Fraymakers / UploadAssistant

Fraymakers is a tournament VOD and media-preparation tool. Joshua’s brother started the broader project and owned its foundation and much of the early workflow and API groundwork. Joshua joined later; `thumbnail.js` was his, and he also contributed YAML/configuration, thumbnail generation and integration, and some YouTube API work.

The workflow uses tournament and match information to identify videos and generate 1280 × 720 thumbnails. The owner source confirms node-canvas and handling for aliases, P2 mirroring, long names, and missing assets, alongside composition inputs such as logos, stage art, character and sprite art, costumes, assists, foreground art, and text/set labels. Generated thumbnails were used on real Fraymakers VODs. YouTube Data API/OAuth integration remained a prototype; automatic upload was not completed. Do not claim whole-project ownership or a finished uploader, and do not fabricate missing assets or screenshots.

## Living in Silico

Living in Silico is an experience story about technical learning during an AI/ML Research Intern role in Generative Molecular Modeling (March–June 2025). It covers learning computational chemistry and biomedical research and experimenting with machine-learning and fragment-based workflows.

The April 12 dataset snapshot (15,696 rows; 14,487 unique SMILES) and experiments using roughly 400–600 entries are separate contexts, not a funnel. Owner-supplied method details describe DeepMol CSVLoader, Morgan fingerprints (radius 2, 128 bits), and an RNN MolecularGenerator run for 10 epochs with batch size 64. DeepMol work produced 500 generated SMILES samples; do not call them valid, unique, or novel molecules. Run artifacts are not available to verify how these method details relate to the 500 samples. Fragmenstein work used fragment-based molecular design with RDKit. REINVENT4 was researched and attempted, but successful generation was not achieved. Do not claim research impact or a consumer product result.

The Journey brief asks for two distinct Living in Silico moments: the ML spark during the research internship, followed by a late-night Stanford ML lecture before school. Keep them as two beats under one chapter waypoint. The new research note reads: "Generative molecular modeling brought machine learning into the work I was learning to do."

## Stush Patties

Stush Patties is an experience story about data pipelines and automation during a Software Engineering Intern role (September–November 2025), on a two-person technical team with Shiv. It was an external client project through Riipen / IBM SkillsBuild. The owner brief identifies three distributor inputs: Koyo, UNFI, and Dovre. CSV, XLSX, and XLSB formats occurred across the inputs; do not map one format to a particular distributor without evidence. Koyo was the hardest input and required a pragmatic, temporary position-and-cell parser exception.

Joshua contributed to Python parsing and normalization, practical data rules, and stakeholder conversations. The shared workflow aligned units and sales, case packs, and reporting months; it prepared a consistent schema, unified CSV, data dictionary, and quality report for Power BI. Describe the result as a more repeatable path from raw files to reporting. Do not claim sole ownership, reproduce client records or dashboard results, or use an unverified improvement percentage.

## Cross-project themes

- Evaluation informed Food Tracker retrieval and Cho’Veigo matching behavior.
- Crest separates deterministic finance and policy rules from AI interpretation; Food Tracker and Cho’Veigo also keep AI within defined evidence boundaries.
- Food, job, transaction, tournament, research, and distributor data each required a workflow suited to that project.
- Preserve shared ownership on Crest, Cho’Veigo, Fraymakers, and Stush; do not inflate individual scope.
