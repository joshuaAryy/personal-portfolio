# Build Story Plan — Crest and Fraymakers

Phase D content plan accepted by Mingo after source audit and bounded critique, for Figma expansion of the active case-study bodies. Final owner review remains open. Keep the strong product/system openings. Add enough explanation for a reader to follow a real path from input to outcome; do not add filler, fabricated examples, speculative implementation details, or unsupported ownership. This document itself contains no public-page or Figma edits.

## Crest

### Editorial throughline

Explain an expense-intelligence workspace from the reviewer’s point of view: **expense request → deterministic finance checks and review cues → human review**, then explain the separate policy-retrieval prototype as another way to prepare policy context. Keep preapproval as a bounded mock workflow, and Finance Q&A/reporting as a separate capability. Then make Joshua’s backend/data scope explicit and close with the Brim challenge result and a concise presentation lesson.

The public demo uses challenge/sample data. Keep a visible sample-data cue and do not present numbers, transaction counts, spend, or generated records as real customer outcomes.

### Ordered sections and working copy

#### 1. Expense-review opening — preserve

Keep the current product-first opening in [CrestCaseStudy.tsx](../../src/CrestCaseStudy.tsx#L176):

> **Crest**
>
> Crest is an expense intelligence workspace for reviewing requests with budget, spend history and policy context.
>
> It helps finance teams spot unusual patterns and prepare requests for preapproval; a person reviews the context and decides what happens next.

Keep the existing authentic sample screen/video and the `SAMPLE DATA` treatment. Do not turn the hero into a hackathon award or lead with implementation jargon.

#### 2. Human-review expense workflow — explain the product path

Retain the existing section heading: **One transaction. Two sources. Human review.**

**Draft paragraph:**

> A finance reviewer starts with an expense request and reviews the context available in the workspace. A verified rule can group charges by employee, merchant, and day; when multiple individual charges sit below the approval threshold but their combined amount reaches it, the system flags a possible split transaction for review. A separate policy-retrieval prototype shows how relevant PDF passages can be prepared for Gemini to interpret. These are distinct evidence paths in the project story; a person reviews context and chooses what happens next.

Use the existing challenge sample only; do not invent another request or numeric result. If the current sample includes transaction details, label them as challenge data.

**Figure labels:**

`EXPENSE REQUEST` → finance-review path, alongside a visibly separate policy-retrieval prototype:

- `FINANCE RULES` → `BUDGET · PRIOR SPEND · THRESHOLDS` → `RULE RESULT / REVIEW CUE`
- `POLICY DOCUMENT` → `RETRIEVED PASSAGES` → `GEMINI INTERPRETATION`

The reviewer can consider relevant context and choose the next action. Use a dotted association, not a pipeline connector, between workspace review and the separate retrieval prototype.

Label finance checks and standalone policy-RAG as separate paths; do not draw a single live integration that code does not establish. Distinguish authoritative deterministic results from AI interpretation of retrieved policy. Avoid language that makes Gemini the finance decision-maker.

#### 3. Deterministic checks and anomaly signals — explain method and boundary

**Draft paragraph:**

> Budget, prior spend, and thresholds produce deterministic finance checks. Separate rule-based heuristics can flag patterns such as bursts, repeated vendor behavior, duplicates, unusual merchants, or threshold avoidance. These are cues for a reviewer to investigate, not a prediction that fraud occurred.

**Figure labels:**

`REQUEST + FINANCE HISTORY` → `DETERMINISTIC POLICY / FINANCE RULES` → `CHECK RESULT`.

Alongside, show `TRANSACTION PATTERN` → `ANOMALY HEURISTIC` → `REVIEW CUE`.

This rule shape is verified in the challenge repository; no amount is needed to explain it. It is a review flag, not evidence of intent or misconduct. Joshua’s focus included deterministic anomaly signals and backend/data workflows. Do not label the heuristics as machine-learning fraud detection.

#### 4. Preapproval — state the verified contribution boundary

**Draft paragraph:**

> The challenge prototype also demonstrates preapproval. A mock request template is combined with an employee’s transaction history and budget context, then a Gemini recommendation can be shown alongside a template-based fallback. The reviewer explicitly chooses Approve or Deny; the prototype records that choice in local UI state. I contributed to part of the preapproval workflow, within broader backend and data work.

This is a mock queue, not a connected external approval service or evidence of real employee requests. The repository clarifies the demonstration mechanics, but it does not identify which exact stage Joshua owned. Keep his attribution at “part of the preapproval workflow.”

**Figure labels:**

`MOCK REQUEST TEMPLATE + EMPLOYEE HISTORY + BUDGET` → `GEMINI RECOMMENDATION / TEMPLATE FALLBACK` → `PERSON CHOOSES APPROVE OR DENY` → `LOCAL DECISION STATE`.

Caption: `Challenge prototype · mock requests · human-selected action`.

#### 5. Policy PDF retrieval — give the actual pipeline a full explanation

**Draft paragraph:**

> A policy PDF only helps a reviewer when relevant text can be found for a question. In a standalone Node.js prototype, the document is extracted and split into passages, then Gemini `gemini-embedding-001` creates 3,072-dimensional vectors stored with the text in MongoDB Atlas `policy_chunks`. A question is embedded and Atlas vector search returns passages for a separate Gemini response grounded in that retrieved context. The response supplies policy context alongside the deterministic finance checks.

Joshua’s supported contribution is policy retrieval and related backend/data workflows. Phrase the ownership as contribution to retrieval; do not claim initial Atlas setup or the main Gemini integration. The immutable repository confirms standalone scripts and their mechanics, not deployment or a live endpoint.

**Figure labels:**

`BRIM POLICY PDF` → `EXTRACT + CHUNK` → `gemini-embedding-001 · 3,072-D VECTORS` → `ATLAS · policy_chunks` → `VECTOR SEARCH · RETRIEVED PASSAGES` → `GROUNDED GEMINI RESPONSE`.

Boundary below the figure: `RETRIEVAL FINDS POLICY CONTEXT · DETERMINISTIC RULES RETAIN AUTHORITY · HUMAN REVIEW DECIDES`.

Explain the purpose of each stage in one short line where space allows: extraction makes PDF text usable; chunking creates passages; embeddings support semantic retrieval; vector search finds context; retrieved text grounds the response. Do not claim retrieval accuracy, production deployment, or end-to-end ownership.

#### 6. Finance Q&A and reporting — keep this separate from policy RAG

**Draft paragraph:**

> Finance Q&A is a separate workspace path for asking questions about transaction data. A compact finance summary supplies context for Gemini responses; a parallel API path also returns chart data. This supports exploration and reporting alongside request review, using transaction summaries rather than the policy-PDF retrieval pipeline.

**Figure labels:**

`TRANSACTION DATA` → `COMPACT FINANCE SUMMARY` + `QUESTION` → `GEMINI` → `ANSWER + CHART DATA`.

`REPORTING NEED` → `REPORT VIEW`.

Keep this as a distinct product capability. The repo contains a browser path over bundled data and a parallel FastAPI path over Mongo-backed transaction summaries; do not collapse them into one architecture. The source record and repo do not establish Joshua’s integration ownership. Do not reuse the policy-RAG pipeline or claim the Finance Q&A path is the policy assistant.

#### 7. Ownership, challenge outcome, and presentation lesson — close

**Draft paragraph:**

> I focused on backend and data workflows for review: Policy Compliance Engine workflows, deterministic anomaly signals, policy retrieval, and part of preapproval. The primary frontend, initial MongoDB setup, and main Gemini integration were other parts of the team’s work. Our four-person team placed third in the Brim Financial Challenge at MPC Hacks 2026. Our presentation ran over its allotted time; I learned to make the decision path concise enough that the audience can see what the system checks, what the retrieved policy adds, and where the person decides.

Use direct “I built” only where the current ownership record verifies the artifact; a short tile caption can say `POLICY COMPLIANCE ENGINE · BACKEND / DATA WORK`, `ANOMALY SIGNALS · DETERMINISTIC RULES`, `POLICY RETRIEVAL · RELEVANT PASSAGES`, and `PREAPPROVAL · PART OF WORKFLOW`. Do not use “third overall,” business impact, customers, or challenge sample counts as outcomes.

### Factual basis and boundaries

- Product, ownership limits, challenge placement/sample-data caveat, deterministic/AI boundary, heuristic scope, policy RAG stack, Finance Q&A boundary, and presentation lesson: [CASE_STUDY_CONTENT_SOURCE.md §Crest](../CASE_STUDY_CONTENT_SOURCE.md#crest--source-truth), reconciled below with immutable code inspection.
- Existing opening and main workflow: [CrestCaseStudy.tsx](../../src/CrestCaseStudy.tsx#L176); policy mechanics, anomaly boundary, and ownership/result sections begin at [lines 336, 362, and 385](../../src/CrestCaseStudy.tsx#L336).
- Immutable repository mechanics, file/line links, and deployment/ownership boundaries: [CREST_IMPLEMENTATION_EVIDENCE.md](CREST_IMPLEMENTATION_EVIDENCE.md), audited at [Atlearia/mpchacks SHA `32d4dc19ea95fe1ba795613f7681fcf353947565`](https://github.com/Atlearia/mpchacks/commit/32d4dc19ea95fe1ba795613f7681fcf353947565).

## Fraymakers / UploadAssistant

### Editorial throughline

Explain the full build path behind the existing match-to-thumbnail opening: **tournament/match metadata → match-specific YAML configuration → correct VOD association → layered asset composition → 1280×720 PNG used on real VODs**. Then make the shared project foundation and the unfinished YouTube upload prototype clear. Use authentic artifacts only; the schematic is a layout explanation, not a project screenshot.

### Ordered sections and working copy

#### 1. Match-to-thumbnail opening — preserve

Keep the current strong system-first opening in [FraymakersCase.tsx](../../src/FraymakersCase.tsx#L76):

> **Match data to VOD thumbnails**
>
> One match connects tournament results to its recording and a layered 1280 × 720 thumbnail.

Retain the existing schematic label `SCHEMATIC / LAYOUT ONLY`. Do not present generated-looking sample art as a real tournament thumbnail.

#### 2. Tournament metadata and VOD association — make the first transformation concrete

**Draft paragraph:**

> Each output starts with tournament and match context. The workflow uses that information to identify the corresponding VOD, then carries the match-specific details forward into thumbnail configuration. This association step matters because a finished frame is useful only when it belongs to the correct recording.

The source supports that match information is used to identify videos, but not the exact lookup key or matching algorithm. Explain the purpose and input/output without inventing an API call or data field. Credit the broader Challonge integration and early CLI/API foundation to Joshua’s brother in the ownership section; Joshua joined later.

**Figure labels:**

`TOURNAMENT + MATCH CONTEXT` → `VIDEO ASSOCIATION` → `MATCH ↔ CORRECT VOD` → `THUMBNAIL JOB`.

If a real metadata-to-VOD example is later chosen, use a verified fixture and redact personal identifiers. Do not fabricate match rows, event names, or video IDs.

#### 3. YAML configuration — explain why the renderer can be reused

**Draft paragraph:**

> Match-specific YAML and configuration overrides support the thumbnail workflow. Configuration belongs alongside match information and supplied art as an input to `thumbnail.js`, keeping match preparation connected to the rendering step.

This paragraph stays at documented field categories and does not show fictional YAML syntax or values. The exact YAML schema should be verified from an authentic source checkout before publishing a code sample.

**Figure labels:**

`MATCH-SPECIFIC YAML` → `VALUES + OVERRIDES` → `REUSABLE RENDER PATH`.

Small category labels, not sample values: `STAGE / BACKGROUND` · `CHARACTERS / COSTUMES / ASSISTS` · `PLAYER + SET TEXT` · `LOGOS / FOREGROUND ART`.

#### 4. Layered composition and asset edge cases — explain the implementation

**Draft paragraph:**

> `thumbnail.js` uses node-canvas to compose the supplied art into a 16:9 frame. Inputs include stage/background art, character sprites and costumes, assists, logos, foreground elements, and match text. The renderer also handles P2 mirroring, character aliases and long names, and missing assets.

The listed cases come from the factual source; their exact fallback behavior, ordering, and screenshots still need verification against a real artifact before showing a close technical example. Avoid inventing how a missing image is replaced or how alias lookup works.

**Figure labels:**

Unordered inputs `BACKGROUND / STAGE` · `CHARACTERS / COSTUMES` · `ASSISTS / FOREGROUND` · `LOGOS + PLAYER / SET TEXT` → `NODE-CANVAS COMPOSITOR` → `1280 × 720 OUTPUT`.

Callouts: `P2 MIRRORING` · `ALIASES + LONG NAMES` · `MISSING-ASSET HANDLING`.

Output label: `NODE-CANVAS · 1280 × 720 PNG`.

The figure shows supported input categories feeding a compositor, without inventing a fixed layer order or exact YAML schema. Keep it readable in seconds; detailed implementation behavior belongs in a short caption or a verified artifact callout, not in a dense asset list.

#### 5. Rendered output and use — show the result honestly

**Draft paragraph:**

> The pipeline produced thumbnails that were used on real Fraymakers VODs. Each frame stays tied to its match and recording, so viewers see the right matchup alongside the video.

Use a real generated thumbnail or a real VOD page only if an authentic, available artifact is found and cleared for display. Otherwise retain the explicitly labeled layout schematic; do not recreate a screenshot or imply the schematic is actual project art. No quantity or audience-impact claim is supported.

**Figure labels:**

`MATCH + VOD` → `GENERATED FRAME` → `USED WITH FRAYMAKERS VOD`.

#### 6. YouTube API boundary — separate prototype from completed workflow

**Draft paragraph:**

> I also worked on part of the YouTube Data API/OAuth prototype. Automatic upload was not completed; thumbnail generation and real VOD use were the working output of this pipeline.

**Diagram label:**

`YOUTUBE DATA API / OAUTH · PROTOTYPE` → `AUTOMATIC UPLOAD · NOT COMPLETED`.

Keep this after the successful render/output path so it reads as a precise implementation limit, not the product’s primary function.

#### 7. Shared ownership and close — keep the chronology accurate

**Draft paragraph:**

> My brother started the broader project and built its foundation, CLI, Challonge integration, and much of the early workflow/API groundwork. I joined later and built `thumbnail.js`, then worked on match-specific YAML, thumbnail generation and integration, and part of the YouTube API prototype. We shared the broader goal, with separate contributions across the workflow.

This preserves the supported credit boundary: do not attribute the CLI or Challonge foundation to Joshua and do not imply sole ownership of the overall project. The strongest Joshua-specific build evidence is `thumbnail.js` and the thumbnail/configuration integration path.

### Factual basis and boundaries

- Full workflow, tool boundary, input layers, supported edge cases, real-VOD use, prototype limit, and brother/Joshua ownership: [CASE_STUDY_CONTENT_SOURCE.md §Fraymakers / UploadAssistant](../CASE_STUDY_CONTENT_SOURCE.md#fraymakers--uploadassistant--source-truth).
- Existing opening and stages: [FraymakersCase.tsx](../../src/FraymakersCase.tsx#L76); configuration, ownership, use, and prototype boundary at [lines 185–249](../../src/FraymakersCase.tsx#L185).
- The reviewed Fraymakers worktree points to the portfolio repository, not an established independent source repo. Before adding code-level samples for YAML schema, alias mapping, fallback behavior, or video-association logic, verify an authentic project source/artifact. Do not fabricate screenshots or media.

## Review checks before Figma content sync

- Can a reader follow each project from its real input to a meaningful output without decoding unlabeled implementation jargon?
- Does each major figure say what enters, what the system does, what comes out, and what decision belongs to a person?
- Are Joshua’s contribution and teammates’ contribution described as specific, separate work?
- Do challenge/sample data, heuristics, owner-reported infrastructure, and unfinished prototypes retain their true status?
- Are any examples or artifacts authentic and verified? If not, retain a clearly labeled schematic rather than fabricating evidence.
