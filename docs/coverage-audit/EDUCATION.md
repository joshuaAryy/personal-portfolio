# Education project evidence map

Internal discovery note for factual gating of the Education route. The scan was read-only. It covered the portfolio worktree/repository, local Desktop project folders, and filename-filtered source files in the user’s OneDrive Desktop, Documents, and Downloads locations. This is not an exhaustive search of cloud-only storage or unmounted repositories; absence below means not found in that local scan.

## Verified local artifact: Quartus ALU / FSM

**Available files:**

- `C:/Users/samue/OneDrive/Desktop/Lab 6 Joshua/Lab 6 part 1/lab 6/ALU.vhd`
- `C:/Users/samue/OneDrive/Desktop/Lab 6 Joshua/Lab 6 part 1/lab 6/FSM.vhd`
- `C:/Users/samue/OneDrive/Desktop/Lab 6 Joshua/Lab 6 part 1/lab 6/Lab6.qpf`
- `C:/Users/samue/OneDrive/Desktop/Lab 6 Joshua/Lab 6 part 1/lab 6/Lab6.qsf`
- Related parts 2 and 3 also contain ALU/FSM, VHDL, BDF, waveform, and Quartus output files under `C:/Users/samue/OneDrive/Desktop/Lab 6 Joshua/`.

**Source-backed scope:** the ALU entity declares 8-bit unsigned A/B inputs, clock, 16-bit operation input, sign output, and two 4-bit result outputs. Its clocked case handles add, absolute difference, NOT, NAND, NOR, AND, XOR, OR, and XNOR. The FSM source declares nine Moore states, reset and data input, a 4-bit state output, and an identifier-display mapping. The QSF identifies Quartus II 13.0 SP1, Cyclone II EP2C35F672C6, top-level `modified_dec3to8`, and ALU/FSM plus latch, display, decoder VHDL and `part1.bdf` source files. Do not confuse the BDF filename with the configured top-level entity.

**Director follow-up inspection, 2026-10-03:** `sseg.vhd` maps 4-bit values through hexadecimal 0–F to inverted seven-segment outputs and has separate negative-sign output logic. The ALU subtraction path emits absolute magnitude and a separate `Neg` flag when B exceeds A; it is not a signed two’s-complement result. The FSM advances on rising clock edges when `data_in` is high, holds otherwise, and wraps after its ninth state. This particular `FSM.vhd` resets when `reset = '1'`; the BDF also exposes a `Resetn` port. Do not claim an active-low FSM reset without tracing the top-level wiring and selected revision. Waveform configuration/files are evidence of simulation setup, not inspected passing traces. Keep identifier values out of public copy and diagrams.

Verified source SHA-256: `ALU.vhd` = `7EC8EA671DDBB2AF5D36E27ECF90293A2FE26F3B857DABEF5E7C0C664E64A8BC`; `FSM.vhd` = `DF8C8B28B22B16690F73D39B7A0F5724D9033B158E0B60E31E666D4AB671BF2B`; `Lab6.qsf` = `3DF91307D0E1AB8D0715D6E9508EFE309287A4BA3021A764FB1C78C89D959EE1`.

**Concise section direction:** explain two 8-bit inputs and clocked arithmetic/logic, the nine-state sequencing controller, and the result split into hexadecimal display nibbles with separate sign indication. Use a clearly labeled source-derived block diagram or a verified original capture. Do not assert successful board operation, passing waveforms, exact controller-to-operation mapping, or reset polarity until the selected top-level design is traced. Keep identifier values out of public copy and diagrams. The other three projects remain evidence-pending rather than permanently sparse; future authentic files or owner-supplied project context may support fuller sections.

**Safe current wording:** “Quartus/VHDL 8-bit ALU and nine-state FSM lab project,” with operation details if useful. These files show design artifacts and project configuration; they do not independently prove authorship, successful board demonstration, course grade, or performance. Do not conflate the separate ALU/FSM iterations (part 1/2/3) into one exact final architecture without checking the selected project/revision.

## Evidence not found in the inspected local project files

| Owner target | Local evidence found | What remains unverified / safe treatment |
| --- | --- | --- |
| Dental clinic database (CPS510), current schema | No Dental/clinic app repository, Java/SQL source, or submitted project artifact found in the searched local project locations. The Downloads folder contains `CPS510topic3.ppt` and `Marking_Rubric_A2_CPS510_20201.pdf`; these are course/assignment materials, not the Dental project implementation. | Owner identifies Dental CPS510 as current, but schema entities, constraints, workflow, role, and implementation are not verified here. Use only the project name/status supplied by owner until the authentic repository, schema/export, or submission is located. Do not invent an ERD, schema, database engine, or feature list. |
| Bookstore Management System | No Java source or Bookstore project directory was found in the scanned local Desktop, Documents, Downloads, or portfolio tree. | The project name is owner-supplied; the implementation language/framework, features, database, ownership scope, and completion status remain unverified. Do not use the older “Java Swing” resume wording as source truth. Keep the section evidence-pending until original files or additional owner-supplied project context are reconciled. |
| Four-stage CMOS amplifier, KiCad / SPICE | No KiCad schematic/project, SPICE netlist, `.asc` simulation project, or related circuit source was found in the scanned local locations. Nearby files include `ELE 532 Lab Information.pdf`, `ELE532_Lab1_Data.mat`, and a MEC511 lab manual; they do not establish this specific amplifier build. | Owner identifies a four-stage CMOS amplifier. Tool usage, topology, simulation results, fabrication, and performance remain unverified from local originals. Treat the section as evidence-pending and keep technical detail gated until authentic source or owner-supplied project context is reconciled. This is not a decision to keep the section permanently sparse. |

## Search scope and limitations

- Quartus originals are plain-text VHDL/QSF/QPF in the listed Desktop project; no simulation or build was run for this audit.
- Name-filtered file discovery found no `.java`, `.sql`, KiCad schematic/project, or SPICE netlist corresponding to Dental, Bookstore, or CMOS amplifier in the inspected local project folders. Search does not establish that files do not exist in cloud-only storage, archives not enumerated by filenames, other devices, or a source-control remote.
- A local resume PDF was available, but it contains older numerical project claims and is not used as authority for technical details where the current source-truth docs or owner direction set stricter boundaries.
- Owner direction confirmed 2026-10-04: proceed without blocking other portfolio work; use verified ALU/FSM source detail; keep Dental, Bookstore, and CMOS technical claims gated and mark those sections EVIDENCE PENDING, with Dental also CURRENT · IN PROGRESS. The owner may later reconcile additional context from prior ChatGPT work or locate original files, so these sections are not permanently sparse. Do not turn old resume claims into source truth.
- This map is an evidence inventory, not public copy or rendered-page approval. The current route has a restrained text-led shell with source-derived ALU/FSM notes and does not claim detailed Figma-body parity; its 1920px and 390px runtime evidence is recorded in `case-study-review/render-sync/2026-10-03-recovery-qa/education-followup-evidence.json`.
