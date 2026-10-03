# Product Story Plan — Food Tracker and Cho’Veigo

Phase D content plan reviewed by Mingo and independent critic. The owner has authorized breadth expansion; Mingo accepts this structure with the bounded copy corrections below for Figma implementation. Preserve the reviewed openings and avoid adding sections solely to increase length; each chapter explains a meaningful product action, system decision, evidence, or limit. This document itself contains no public-page or Figma changes.

## Food Tracker

### Editorial throughline

Move from a real everyday task to the product’s larger value: **log food with little friction → review useful nutrition insights → trust the data path underneath → improve food retrieval through evaluation**. Keep retrieval as an important technical chapter within the product story. Photo logging is described as an AI-assisted, user-reviewed option. Joshua’s product/system direction is established; his authorship of photo-model implementation is not established and should not be implied.

### Ordered sections and working copy

#### 1. Product opening — preserve

Keep the owner-positive opening in [FoodTrackerCaseStudy.tsx](../../src/FoodTrackerCaseStudy.tsx#L251):

> **Simple food logs. Trusted nutrition.**
>
> A mobile-first nutrition tracker for quick logging, reliable food search, serving conversion, recommendations, and long-term insight.

Retain the current quick-log principle and product challenge. Do not restart the first fold.

#### 2. Logging paths — add the missing everyday product chapter

**Draft paragraph:**

> A meal can start as a manual entry, a saved or recent food, a barcode lookup, a text description, or a photo. Each path lets the person review the food and portion before saving it. The goal is to make recording a meal quick without treating an uncertain match or portion as settled nutrition.

This describes the user paths implemented in the pinned app source. It does not suggest Joshua personally implemented all entry modes. Keep recipes and mixed meals as supporting examples only if the chapter needs them; do not turn this into a feature inventory.

**Diagram labels:**

`CHOOSE AN ENTRY` → `FIND OR INTERPRET FOOD` → `REVIEW FOOD + PORTION` → `SAVE TO HISTORY`

Entry examples under the first step: `MANUAL` · `SAVED / RECENT` · `BARCODE` · `TEXT` · `PHOTO`.

For the photo subpath only:

`PHOTO` → `AI SUGGESTS VISIBLE FOODS + APPROXIMATE PORTIONS` → `MATCH / REVIEW EACH ROW` → `USER CONFIRMS, EDITS, OR EXCLUDES`.

Caption: “Photo suggestions are reviewed before saving. A supplied catalog match uses backend food and serving rules; any AI estimate stays low-trust and editable.” Do not say AI supplies trusted nutrition or saves the meal autonomously. The pinned implementation confirms this flow, but Joshua’s ownership of the photo-model feature is unverified.

#### 3. Insights — show what the logging enables

**Draft paragraph:**

> Food Tracker turns saved logs into a view of patterns over time. Logged nutrient values are aggregated into an overview; coverage indicates where the food data is incomplete. Simple mode keeps that view focused. Complex mode opens nutrient detail and comparisons across selected time ranges, with saved views for returning to an analysis. Both use the same product and backend; they change how much detail is in view.

Keep metric lists selective in the public story; the contrast between a focused overview and deeper analysis is the point. Avoid implying every Complex capability appears in Simple mode.

**Diagram labels:**

`LOGS + GOALS + TIMEZONE` → `BACKEND AGGREGATION` → `SIMPLE / FOCUSED OVERVIEW` · `COMPLEX / NUTRIENTS + COMPARISONS + SAVED VIEWS`.

Optional small callout: `UNKNOWN ≠ ZERO` / “Coverage and missing nutrient data stay visible.” This is a product/data decision, not a claim of clinical guidance.

#### 4. Data and architecture — explain the trust boundary

**Draft paragraph:**

> The mobile app records a food and the serving the person chose. The API resolves that serving against trusted food data, calculates the resulting nutrients, and stores the serving basis with the log. Later, a deliberate serving edit recalculates from that saved basis. This keeps a food match, a serving decision, and its nutrition connected while leaving the entry editable.

**Diagram labels:**

`EXPO MOBILE APP` → `EXPRESS API` → `FOOD CATALOG + SERVING RESOLUTION` → `POSTGRESQL LOG + SERVING SNAPSHOT` → `INSIGHTS / HISTORY`.

Label the stack at the layer where it helps understanding: `React Native / Expo`, `Express / Prisma`, `PostgreSQL`. The concise architecture lesson is that the app may suggest or display choices while backend serving conversion and stored basis determine trusted nutrition.

**History correction:** Do not call FoodLog history append-only or the log immutable. The pinned `main` source allows user-scoped updates and deletion; snapshot-backed serving edits recalculate nutrition from the stored basis, and recipe/mixed-meal entries have more limited edit rules. Use “the serving basis is retained so later edits can be recalculated” rather than “history cannot change.” Unknown nutrient values remain unknown, not zero.

#### 5. Retrieval and evaluation — retain and explain the technical challenge

**Draft paragraph:**

> A search result is only useful if the intended food appears near the top. I directed a hybrid retrieval approach using deterministic, fuzzy, and semantic candidates, with deterministic final evaluation and ranking. Trusted food data and serving rules still decide the nutrition that can be logged. An offline benchmark showed a large Top‑1 gain on development queries and a smaller gain on a separate holdout set, so I treated relevance as something to measure instead of assuming that passing tests meant search worked.

**Diagram labels:**

`QUERY / FOOD INTENT` → `EXACT + FUZZY + SEMANTIC CANDIDATES` → `DETERMINISTIC EVALUATION + RANKING` → `TRUSTED FOOD + SERVING RESOLUTION` → `SAVED LOG`.

Evidence card: `DEVELOPMENT · 80 QUERIES · TOP‑1 40/80 → 71/80`; `HOLDOUT · 40 QUERIES · TOP‑1 25/40 → 27/40`. Label as offline benchmark, not users or product impact. Keep Top‑3/Top‑5 secondary.

#### 6. Debugging and close — distinguish the failure modes

**Draft paragraph:**

> Evaluation helped separate two different problems: whether a food ranked well and whether the search index contained a complete, current catalog. An indexing pagination issue was corrected independently of relevance work. I also weighed semantic-retrieval gains against added latency. The product lesson was to measure retrieval quality, index completeness, and nutrition authority separately.

Close on the role and learning: Joshua initiated the product and led requirements, priorities, architecture direction, workflow design, evaluation, and product decisions; implementation involved substantial Codex/agent assistance. Do not imply sole production-code authorship or claim adoption/outcomes beyond the documented offline benchmark.

### Factual basis and boundaries

- Factual ownership, Pinecone’s candidate-only role, benchmark, serving authority, unknown nutrient treatment, and latency/indexing caveats: [CASE_STUDY_CONTENT_SOURCE.md §Food Tracker](../CASE_STUDY_CONTENT_SOURCE.md#food-tracker--source-truth).
- Current page opening/search/evaluation content: [FoodTrackerCaseStudy.tsx](../../src/FoodTrackerCaseStudy.tsx#L251).
- Pinned app implementation: [commit `4674e78b2ddcd705be323f9bfafb23b95b7848ea`](https://github.com/joshuaAryy/food-tracker/commit/4674e78b2ddcd705be323f9bfafb23b95b7848ea). Source checks for logging/edit/delete, serving snapshots, History and Insights, image recognition, bounded adjudication, review, and atomic confirmation are cited with paths and line anchors in [PRODUCT_AND_TOOL_SYSTEMS.md](PRODUCT_AND_TOOL_SYSTEMS.md#immutable-implementation-check-food-tracker).
- Code at the pinned commit supports implementation claims but does not prove current visual state or public App Store release. The repository marks photo candidate adjudication and an optional API-unavailable check as not tested. Do not claim those checks passed.

## Cho’Veigo

### Editorial throughline

Keep the current product-first title, authentic Recommendations capture, and whole-system framing. Then trace **role data → candidate evidence → distinct Fit and Eligibility assessments → bounded interpretation → separate Recommendation → optional resume-tailoring action**. Carry Joshua’s actual Jobs-side and shared evaluation role through the explanation. A recommendation formula and the internals of resume tailoring are not established, so explain their place in the product journey without reverse-engineering either.

### Ordered sections and working copy

#### 1. Product opening and authentic Recommendations view — preserve

Keep the existing product-first opening and role recommendation capture in [ChoViegoCase.tsx](../../src/ChoViegoCase.tsx#L134):

> **Cho’Veigo**
>
> A job-search workspace that surfaces roles, shows where your experience fits, and helps you decide whether to tailor your resume.

Retain the authentic screenshot’s fit evidence and visibly representative gap. It is a static capture, not playable product media.

#### 2. Role inputs — make discovery and persistence legible

**Draft paragraph:**

> A match starts with a role and its requirements. Cho’Veigo brings roles from job feeds and persisted role data into a structured view of responsibilities and core requirements. That gives the next step something more useful to compare than a title or list of keywords.

This is the supported product-level description; do not invent feed providers, scraping/extraction methods, or persistence schema. Keep discovery distinct from later matching.

**Diagram labels:**

`JOB FEEDS + PERSISTED ROLE DATA` → `ROLE RECORD` → `RESPONSIBILITIES + CORE / ESSENTIAL REQUIREMENTS`.

#### 3. Candidate evidence — show what is compared

**Draft paragraph:**

> On the candidate side, the system works from resume and profile evidence. A role’s responsibilities can be compared with demonstrated experience and relevant transferable evidence, while unsupported or missing evidence stays visible. That lets a person inspect why a role appears to fit instead of relying on keyword overlap alone.

Avoid invented candidate/job examples. If a real, owner-cleared regression fixture is later selected, use it to show one input-to-output trace. Until then, use generic role/evidence labels in the diagram without fictional facts.

**Diagram labels:**

`RESUME + PROFILE` → `DEMONSTRATED EVIDENCE` + `TRANSFERABLE EVIDENCE` + `VISIBLE GAPS`.

#### 4. Fit and Eligibility — explain separate deterministic questions

**Draft paragraph:**

> Fit and Eligibility answer different questions. Deterministic rules compare responsibilities with candidate evidence to assess Fit, then check essential requirements for Eligibility. Transferable evidence can matter to the first question; an unmet essential requirement remains visible in the second.

**Diagram labels:**

`RESPONSIBILITIES ↔ CANDIDATE EVIDENCE` → `FIT`.

`ESSENTIAL REQUIREMENTS ↔ CANDIDATE EVIDENCE` → `ELIGIBILITY`.

Keep both labels and paths visually distinct. Do not add weights, thresholds, score percentages, or imply one judgment is a renamed version of the other unless a verified source supports it.

#### 5. Bounded Gemini interpretation — name its job and boundary

**Draft paragraph:**

> Structured Gemini interpretation helps read the supplied role and candidate evidence and is constrained not to invent experience. Deterministic rules still decide Fit and Eligibility. That boundary keeps generated interpretation tied to the evidence the user can review.

**Diagram labels:**

`SUPPLIED ROLE + CANDIDATE EVIDENCE` → `STRUCTURED GEMINI INTERPRETATION`.

Boundary label: `INTERPRETS PROVIDED EVIDENCE · CONSTRAINED TO SUPPLIED EXPERIENCE · RULES DECIDE FIT + ELIGIBILITY`.

#### 6. Recommendation and downstream tailoring — preserve separate, limited claims

**Draft paragraph:**

> Cho’Veigo presents Recommendation as a separate judgment that helps a person decide which role to consider next. After reviewing a selected role, the person can move into resume tailoring. Role selection and resume preparation remain separate steps in the product.

**Diagram labels:**

`ROLE + CANDIDATE EVIDENCE` → `DISTINCT PRODUCT OUTPUTS: FIT · ELIGIBILITY · RECOMMENDATION` → `OPTIONAL NEXT STEP / RESUME TAILORING`.

Visually present the three outputs as separate results; the line indicates the product journey, not a formula deriving Recommendation from the other two judgments. Do not imply the displayed Recommendation is a specific score, model verdict, deterministic rule, or guaranteed result. Do not describe tailoring inputs, rewrite algorithms, output quality, or application submission without further verified source evidence.

#### 7. Joshua’s work and evaluation — explain contribution through a real decision

**Draft paragraph:**

> I led Jobs-side work and worked with Shiv on product and evaluation direction, retrieval priorities, and the behavior we expected from matching. When a mismatch exposed an unclear expectation, we reviewed it together and turned the agreed behavior into a regression fixture. That made later changes answer to a reviewed example instead of a test edited just to pass.

This ties Joshua’s contribution to a method and output without claiming sole ownership. If a specific mismatch fixture can be verified and owner-cleared, replace the generic sentence with that trace; do not invent the role or candidate facts. Keep the personal discovery anecdote as a qualitative example, not general performance evidence.

**Diagram labels:**

`REVIEW A MISMATCH` → `AGREE EXPECTED BEHAVIOR` → `ADD REGRESSION FIXTURE` → `RECHECK MATCHING`.

Closing credit: `BUILT WITH SHIV ARORA · JOB DISCOVERY + RESUME TAILORING`.

### Factual basis and boundaries

- Ownership, system roles, model boundary, matching criteria, evaluation scope, personal anecdote qualification, and explicit no-claim boundaries: [CASE_STUDY_CONTENT_SOURCE.md §Cho’Veigo](../CASE_STUDY_CONTENT_SOURCE.md#choveigo--source-truth).
- Existing visitor-facing sequence and diagrams: [ChoViegoCase.tsx](../../src/ChoViegoCase.tsx#L134), system flow [lines 165–214](../../src/ChoViegoCase.tsx#L165), matching/evaluation [lines 219–249](../../src/ChoViegoCase.tsx#L219), and current system labels [lines 260–310](../../src/ChoViegoCase.tsx#L260).
- Use the existing reviewed capture and static-media qualification; do not reopen the accepted product-first opening merely to fit more copy. No source examined here specifies a separate Recommendation formula or resume-tailoring implementation.

## Review checks before Figma content sync

- Does each page explain what the product does before zooming into its hardest technical system?
- Can a reader explain each diagram’s inputs, method, output, Joshua’s contribution, and decision after a quick read?
- Are trusted nutrition, estimated nutrition, unknown values, and user edits distinct in Food Tracker?
- Are Cho’Veigo’s Fit, Eligibility, Recommendation, and tailoring handoff distinct without invented mechanics?
- Are all examples either directly supported by an existing artifact or clearly conceptual rather than fabricated evidence?
- Does every paragraph advance the story? Remove any feature list or technical label that lacks explanation or a reason to stay.
