# Research and Data Story Plan — Living in Silico and Stush Patties

Phase D content plan accepted by Mingo after bounded factual and depth critique, for project-specific Figma expansion. Final owner review remains open. Preserve both reviewed openings. Each chapter should explain why the work mattered, its inputs and method, Joshua’s contribution, what it produced, and its research/engineering learning. Never fill evidence gaps with plausible details. This document itself contains no public-page or Figma edits.

## Living in Silico

### Editorial throughline

Move from the research internship into a sequence of distinct work paths: **represent molecules in computable forms → understand the separate data snapshot and experimental subsets → explore SMILES sequence generation → explore structure-aware fragment workflows → report an unsuccessful REINVENT4 attempt honestly → compare what each path taught**. Keep the DeepMol sample count separate from dataset inventories and do not merge outcomes across experiments.

### Ordered sections and working copy

#### 1. Research opening — preserve

Keep the current opening in [LivingInSilicoCase.tsx](../../src/LivingInSilicoCase.tsx#L128):

> **Molecules need representation before generation.**
>
> During an AI/ML research internship in generative molecular modeling, I learned how molecular structures become SMILES and model-ready features before exploring generation.

Retain the AI/ML Research Intern role, Generative Molecular Modeling field, and March–June 2025 period. Keep the story focused on Joshua’s learning and experimental work; do not imply research impact or a resulting consumer product.

#### 2. Representation and dataset context — establish the inputs without combining inventories

**Draft paragraph:**

> Before a model can work with a molecule, its structure has to be represented in a form the workflow can read. I worked with molecular structures, SMILES strings, and Morgan fingerprints as molecular representations. The April 12 data snapshot contained 15,696 rows and 14,487 unique SMILES. The experiments used separate curated subsets of roughly 400–600 entries; those subset sizes are not the snapshot inventory.

The counts provide context for the data work, not a result or impact metric. Keep the April 12 snapshot distinct from experimental subsets. Do not imply that the DeepMol output of 500 samples came from either inventory unless a run record establishes that link.

**Figure labels:**

Representation lane: `MOLECULAR STRUCTURE` → `SMILES · SEQUENCE REPRESENTATION`.

Separate feature lane: `MOLECULAR STRUCTURE` → `MORGAN FINGERPRINT · RADIUS 2 · 128 BITS`.

Caption: `Representation schematic · illustrative, not an experimental molecule or bit vector.`

Separate dataset annotation (not connected by an arrow to the 500 output):

`APRIL 12 SNAPSHOT · 15,696 ROWS · 14,487 UNIQUE SMILES`.

`EXPERIMENTAL SUBSETS · APPROX. 400–600 ENTRIES · SEPARATE FROM SNAPSHOT TOTAL`.

#### 3. DeepMol / RNN sequence generation — explain the route and its output

**Draft paragraph:**

> One route explored sequence generation from SMILES. DeepMol’s CSVLoader brought experiment data into the workflow, and an RNN MolecularGenerator explored SMILES sequences. A recorded run used 10 epochs and a batch size of 64. Separately, my DeepMol work produced 500 generated SMILES samples. I describe those as generated strings, without claiming they are valid, unique, or novel molecules.

Keep method/run settings and the output as separate evidence; do not state that the recorded settings produced precisely the 500 samples. Do not put the 500 beside the snapshot/subset counts in a way that suggests one combined dataset pipeline. Morgan fingerprints are a separate feature-representation workstream in the available evidence; do not draw them as an input to the RNN.

**Figure labels:**

Sequence lane: `CURATED EXPERIMENT INPUT` → `DeepMol CSVLoader` → `SMILES SEQUENCES` → `RNN MolecularGenerator`.

Parallel representation lane: `MOLECULAR STRUCTURE` → `RDKit / MORGAN FINGERPRINT · RADIUS 2 · 128 BITS`.

Run annotation: `RECORDED RUN · 10 EPOCHS · BATCH 64`.

Separate output node: `DEEPMOL WORK OUTPUT · 500 GENERATED SMILES SAMPLES`.

Caption: `500 generated SMILES samples`.

Do not fabricate a sample string or display a molecule drawing as one of these outputs unless an authentic artifact is verified and cleared.

#### 4. RDKit / Fragmenstein fragment work — give it a distinct purpose and outcome

**Draft paragraph:**

> I also explored a structure-aware route that works with fragments rather than generating a whole SMILES sequence. Using RDKit and Fragmenstein, I investigated fragment linking and spatial workflows for selecting and recombining compatible pieces. Some fragment workflows succeeded. This approach works with pieces and their spatial relationships, giving the comparison a different focus from sequence generation.

This stays at the level supported by the source: do not add fragment counts, molecules, candidate rankings, success rates, or specific structural results.

**Figure labels:**

`MOLECULAR STRUCTURE` → `FRAGMENT SELECTION` → `LINKING / SPATIAL WORKFLOW` → `RECOMBINATION` → `SOME WORKFLOWS SUCCEEDED`.

Attribution: `I EXPLORED FRAGMENT LINKING AND SPATIAL WORKFLOWS · RDKit / Fragmenstein`.

#### 5. REINVENT4 — show the attempt and stop boundary

**Draft paragraph:**

> I researched and attempted REINVENT4 as another generative approach alongside the sequence and fragment work. Successful molecule generation was not achieved. The comparison therefore includes three different outcomes: DeepMol samples, partial fragment-workflow success, and a REINVENT4 attempt that stopped before generation.

No exact REINVENT4 input subset, configuration, method details, or failure cause are established. Do not diagnose why it failed or suggest a run setting. Keep the stop truth explicit and the learning about evidence/reporting, rather than assigning an unsupported technical cause.

**Figure labels:**

`REINVENT4 RESEARCHED` → `GENERATION ATTEMPTED` → `NO SUCCESSFUL GENERATION`.

#### 6. Contribution and learning — close on disciplined experiment interpretation

**Draft paragraph:**

> I worked across data loading, SMILES processing, molecular features, sequence generation, and fragment workflows. The role built my understanding of computational chemistry and how different approaches use molecular representations. Each experiment has its own method and outcome: generated samples, successful fragment workflows, or an attempted workflow that did not reach generation.

This is a personal learning story. Do not turn it into a claim of novel molecules, validated drug candidates, biomedical impact, or group-level expertise.

### Factual basis and boundaries

- Internship, dataset vs subset distinction, owner-supplied DeepMol/Morgan/RNN method details, separate 500-sample output, partial fragment success, REINVENT4 stop boundary, and prohibited claims: [CASE_STUDY_CONTENT_SOURCE.md §Living in Silico](../CASE_STUDY_CONTENT_SOURCE.md#living-in-silico--source-truth).
- Existing opening, representation figure, experiment routes, separate output card, and learning close: [LivingInSilicoCase.tsx](../../src/LivingInSilicoCase.tsx#L145).
- The explanatory depth audit identifies the missing purpose/input/method/contribution/output/learning narrative and the run-artifact uncertainty: [RESEARCH_AND_DATA.md](RESEARCH_AND_DATA.md#living-in-silico).

## Stush Patties

### Editorial throughline

Explain a practical client-data transformation: **three distributors’ differently structured files → parsing into a shared schema → consistent business dimensions → one bounded Koyo parsing exception that rejoins the shared path → standardized handoff for Power BI reporting**. Keep the current concise opening and use later sections to explain decisions, collaboration, and deliverables. The diagram stays conceptual; it must not resemble actual client rows or values.

### Ordered sections and working copy

#### 1. Internship opening — preserve

Keep the current opening in [StushPattiesCase.tsx](../../src/StushPattiesCase.tsx#L155):

> **Stush Patties**
>
> **Inconsistent sales files → repeatable reporting**
>
> Sales files arrived in inconsistent layouts, making repeatable reporting difficult. I built Python parsing and normalization steps to map them into one shared schema for Power BI reporting.

Retain Software Engineering Intern and September–November 2025. Do not add a measured time saving, dashboard result, or percent improvement.

#### 2. Intake — explain why the files could not be combined as received

**Draft paragraph:**

> The work started with sales files from Koyo, UNFI, and Dovre. Across the input set, files arrived as CSV, XLSX, and XLSB, with different layouts. A recurring report needed a reliable way to read those layouts and map each source into the shared reporting fields before aligning its data.

The supported source record does not map a format to any one distributor. Keep the formats presented collectively. Do not show realistic-looking client rows, distributor-specific format assignments, or proprietary records.

**Figure labels:**

`KOYO` · `UNFI` · `DOVRE` → `CSV / XLSX / XLSB · FORMATS ACROSS INPUTS` → `LAYOUTS VARY`.

Label any file-shaped art: `CONCEPTUAL INPUT SHAPES · NOT CLIENT RECORDS`.

#### 3. Parse and map into one shared schema — explain the transformation

**Draft paragraph:**

> I built Python parsing steps to read each layout and map its fields into a shared schema. The contract gave the same meaning to sales, units, case packs, and reporting months across the files. After that mapping, normalization could apply consistent rules to those dimensions rather than treating each distributor’s layout as a different reporting model.

No specific formula, tolerance, or data-quality rule is recorded in the source, so keep the explanation at the field and business-rule level. Tie the work to Joshua’s verified Python parsing and normalization contribution; retain collaboration with Shiv and client stakeholders in the later section.

**Figure labels:**

`READ EACH LAYOUT` → `MAP TO SHARED FIELD CONTRACT` → `NORMALIZE + ALIGN`.

Shared fields: `SALES` · `UNITS` · `CASE PACK` · `REPORTING MONTH`.

Transformation labels: `PARSING · PYTHON` and `NORMALIZATION · SHARED BUSINESS RULES`.

#### 4. Koyo exception — make the one-off engineering decision bounded

**Draft paragraph:**

> One Koyo input needed a temporary position-and-cell parsing exception. I mapped that input into the shared schema, then sent it through the same normalization path as the other files. The exception handled a source-specific layout without changing the shared fields used by the rest of the pipeline.

No field-level example is available. Explain the exception generically and keep it downstream from the core workflow; do not invent a cell address, column name, sample value, or assign CSV/XLSX/XLSB to Koyo.

**Figure labels:**

`KOYO INPUT · POSITION + CELL PARSING EXCEPTION` → `SHARED SCHEMA` → `COMMON NORMALIZATION PATH`.

Small caption: `TEMPORARY SOURCE-SPECIFIC BRANCH · NOT A DIFFERENT OUTPUT CONTRACT`.

#### 5. Standardized outputs and Power BI handoff — explain what the next person receives

**Draft paragraph:**

> The pipeline produced a standardized CSV alongside a data dictionary and a quality report for the Power BI handoff. Together, those artifacts package the aligned data and its field and quality context for the next reporting step: a repeatable path from source files to reporting.

Do not claim a specific dashboard insight or performance improvement. The dictionary and quality report should be described by their documented roles, not by invented contents.

**Figure labels:**

`NORMALIZED DATA` → `STANDARDIZED CSV` + `DATA DICTIONARY` + `QUALITY REPORT` → `POWER BI HANDOFF`.

Output caption: `REPEATABLE REPORTING INPUT · NO CLIENT VALUES SHOWN`.

#### 6. Collaboration and engineering lesson — credit the shared workflow

**Draft paragraph:**

> I worked with Shiv and client stakeholders to translate the shared fields into practical business rules and a reporting handoff. Those conversations shaped what the normalized data needed to mean for the next step. The experience taught me that a useful pipeline depends on agreeing the data rules with the people who will use the output, not only on parsing each file successfully.

Joshua built the Python parsing and normalization work and shaped data rules/requirements; keep collaboration visible and do not imply sole ownership. The external client and Riipen / IBM SkillsBuild context can remain in supporting metadata if useful, but should not displace the data-story opening.

### Factual basis and boundaries

- Distributor names, formats-across-inputs rule, common schema dimensions, Koyo exception, deliverables, ownership, collaboration, and no-impact limits: [CASE_STUDY_CONTENT_SOURCE.md §Stush Patties](../CASE_STUDY_CONTENT_SOURCE.md#stush-patties--source-truth).
- Current opening, conceptual input pipeline, Koyo exception, ownership/collaboration, and output handoff: [StushPattiesCase.tsx](../../src/StushPattiesCase.tsx#L155).
- The explanatory depth audit records the current labels, supported client/source scope, and gaps around causal explanation: [RESEARCH_AND_DATA.md](RESEARCH_AND_DATA.md#stush-patties).

## Review checks before Figma content sync

- Are each project’s input, transformation, output, Joshua’s contribution, and meaningful decision visible in the story itself?
- Are dataset inventory, curated subsets, DeepMol samples, fragment results, and REINVENT4 outcomes represented as distinct evidence?
- Are the Stush distributor sources named without assigning an unsupported file type to any one of them?
- Does the Koyo exception remain temporary and rejoin the common schema/normalization path?
- Are all figures conceptual or based on authentic, cleared project artifacts, never invented source records or metrics?
