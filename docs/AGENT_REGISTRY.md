# Active Agent Registry

Updated 2026-09-30. **Mingo is the project director.** Mingo may execute directly while coordinating persistent specialist lanes, and owns priorities, owner-direction reconciliation, cross-lane decisions, acceptance, and documentation sync. Active Figma key `9zvk9iSRPKSsJ6llDJrQmA`; current nodes and review status are indexed in [FIGMA_NODE_MAP.md](FIGMA_NODE_MAP.md).

## Current lanes

| Role / lane | Reusable owner / status | Context maturity | Current assignment and reporting line |
|---|---|---|---|
| Main director | Mingo (`/root`) — active | Cross-project | Own priorities, source reconciliation, cross-lane decisions, critical-path execution, acceptance, and documentation sync. The director can execute directly; specialists report to Mingo. |
| Canonical J | `/root/identity_j_owner` — reactivated; `/root/canonical_j_macro_review` — reusable | Bounded whole-mark reconstruction active | One final archive-faithful reconstruction is authorized, with at most two meaningful correction cycles. Archive `159:2` is the approved launch fallback and remains in React. Compare archive `159:2`, candidate `3289:31`, and upper-serif studies; if the new large candidate is not stronger, ship the archive and close J. Afterward, confirm whether the existing Cho'Veigo mark is canonical or needs one decisive correction. Reports to Mingo. |
| Frontend implementation | Mingo direct execution - active; `/root/frontend_owner` - reactivated | Mature, cross-surface | React is implemented through the segmented Opening, Profile hover/focus overlays, Home candidate, six full-length stories, Help/recovery, and Resume Found. Source audit cleared Opening/Profile and corrected the Home Education emblem mapping in code commit `f38ec48` (`home-mode-education.svg`). Archive `159:2` is the launch fallback; no unresolved logo gates implementation. Actual browser render comparison and owner acceptance remain open. Reports to project director. |
| Review-frame production | Mingo — delivered | Mature | Profile strip `3285:45` exposes the four existing states; six exact body clones are indexed in [FIGMA_NODE_MAP.md](FIGMA_NODE_MAP.md). Keep clones synchronized after source edits; inspectability does not imply acceptance. |
| Home shell / icon review | `/root/home_shell_owner` - completed/reusable | Candidate synced; scoped Figma critique clear; rendered-site comparison and owner review open | One bounded Figma proposal `3339:310` was made beside unchanged production fallback `2252:3445`; only the four inner glyphs changed. Mingo synced the direct SVG exports into React. A scoped Figma critique found each glyph reads quickly against its label while preserving the unchanged structure. Compare the render before owner review; keep Home structure frozen and avoid further variants without an observed gap. Reports to Mingo. |
| Cross-surface visual critique | `/root/visual_fidelity_critic` - reusable/available; `/root/home_shell_owner` - completed/reusable | Mature; remembers prior rejection patterns | Cho'Veigo full-page balance `3286:603`, Crest complete story `3286:813`, and Home icon proposal `3339:310` passed a scoped Figma critique at 1920x1080; rendered comparison remains open. Latest Resume Found review (`2407:176`, authentic chassis `2888:164/165`, React source) found the requested atmosphere elements already present and no supported source edit; visible activation remains unverified until browser rendering. Reports to Mingo. |

## Convergence rules

- Implementation may begin once layout structure, public story hierarchy, and interaction intent are stable. Final completion follows implement, render actual site, compare with Figma/reference, critique, correct, owner review, and freeze.
- Owner rejection immediately supersedes old approvals. Use conservative statuses from [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md); pass count is not acceptance.
- Source truth remains in [CASE_STUDY_CONTENT_SOURCE.md](CASE_STUDY_CONTENT_SOURCE.md). Public design communicates the strongest truthful story for a first-time visitor; internal caveats are not automatic public copy.
- Full-page review frames and the Profile state strip are owner-review artifacts. They do not alter production navigation, scrolling, or hover behavior.
- Optional diagram motion should clarify static technical figures and remain restrained. Specify details during implementation; do not animate every diagram.
- After a meaningful Figma or owner-direction change, update and push the relevant durable docs to `feat/portfolio-integration`. Do not commit micro-adjustments or batch docs behind website work.
- Preserve shared working-tree changes and only stage paths relevant to the intended commit. Do not run tests or builds unless requested.
