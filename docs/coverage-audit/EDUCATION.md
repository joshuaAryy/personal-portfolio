# Education project evidence map

Internal discovery note for factual gating of the Education route. The scan was read-only. It covered the portfolio worktree/repository, local Desktop project folders, and filename-filtered source files in the user’s OneDrive Desktop, Documents, and Downloads locations. This is not an exhaustive search of cloud-only storage or unmounted repositories; absence below means not found in that local scan.

## Verified local artifact: Quartus ALU / FSM

**Available files:**

- `C:/Users/samue/OneDrive/Desktop/Lab 6 Joshua/Lab 6 part 1/lab 6/ALU.vhd`
- `C:/Users/samue/OneDrive/Desktop/Lab 6 Joshua/Lab 6 part 1/lab 6/FSM.vhd`
- `C:/Users/samue/OneDrive/Desktop/Lab 6 Joshua/Lab 6 part 1/lab 6/Lab6.qpf`
- `C:/Users/samue/OneDrive/Desktop/Lab 6 Joshua/Lab 6 part 1/lab 6/Lab6.qsf`
- Related parts 2 and 3 also contain ALU/FSM, VHDL, BDF, waveform, and Quartus output files under `C:/Users/samue/OneDrive/Desktop/Lab 6 Joshua/`.

**Source-backed scope:** the ALU entity declares 8-bit unsigned A/B inputs, clock, 16-bit operation input, sign output, and two 4-bit result outputs. Its clocked case handles add, absolute difference, NOT, NAND, NOR, AND, XOR, OR, and XNOR. The FSM source declares nine Moore states, reset and data input, a 4-bit state output, and student-ID nibble mapping. The QSF identifies Quartus II 13.0 SP1, Cyclone II EP2C35F672C6, top-level `part1`, and ALU/FSM plus latch, display, decoder VHDL and BDF source files.

**Safe current wording:** “Quartus/VHDL 8-bit ALU and nine-state FSM lab project,” with operation details if useful. These files show design artifacts and project configuration; they do not independently prove authorship, successful board demonstration, course grade, or performance. Do not conflate the separate ALU/FSM iterations (part 1/2/3) into one exact final architecture without checking the selected project/revision.

## Evidence not found in the inspected local project files

| Owner target | Local evidence found | What remains unverified / safe treatment |
| --- | --- | --- |
| Dental clinic database (CPS510), current schema | No Dental/clinic app repository, Java/SQL source, or submitted project artifact found in the searched local project locations. The Downloads folder contains `CPS510topic3.ppt` and `Marking_Rubric_A2_CPS510_20201.pdf`; these are course/assignment materials, not the Dental project implementation. | Owner identifies Dental CPS510 as current, but schema entities, constraints, workflow, role, and implementation are not verified here. Use only the project name/status supplied by owner until the authentic repository, schema/export, or submission is located. Do not invent an ERD, schema, database engine, or feature list. |
| Java Swing Bookstore | No Java source or Bookstore project directory was found in the scanned local Desktop, Documents, Downloads, or portfolio tree. | Project name and Java Swing platform are owner-supplied targets, not independently verified implementation details. Do not state features, database, ownership scope, or completion status beyond the owner’s exact wording until source/submission is found. |
| Four-stage CMOS amplifier, KiCad / SPICE | No KiCad schematic/project, SPICE netlist, `.asc` simulation project, or related circuit source was found in the scanned local locations. Nearby files include `ELE 532 Lab Information.pdf`, `ELE532_Lab1_Data.mat`, and a MEC511 lab manual; they do not establish this specific amplifier build. | Owner identifies a four-stage CMOS amplifier with KiCad/SPICE. Tool usage, topology, simulation results, fabrication, and performance remain unverified from local originals. Treat only the supplied project phrase as approved pending schematic/netlist/report. |

## Search scope and limitations

- Quartus originals are plain-text VHDL/QSF/QPF in the listed Desktop project; no simulation or build was run for this audit.
- Name-filtered file discovery found no `.java`, `.sql`, KiCad schematic/project, or SPICE netlist corresponding to Dental, Bookstore, or CMOS amplifier in the inspected local project folders. Search does not establish that files do not exist in cloud-only storage, archives not enumerated by filenames, other devices, or a source-control remote.
- A local resume PDF was available, but it contains older numerical project claims and is not used as authority for technical details where the current source-truth docs or owner direction set stricter boundaries.
- This map is an evidence inventory, not public copy or rendered-page approval. Keep unsupported Education detail gated until authentic originals are supplied or located.
