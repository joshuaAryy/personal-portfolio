# Active Agent Registry

Updated 2026-09-30. **Mingo is the project director.** Mingo may execute directly while coordinating persistent specialist lanes, and owns priorities, owner-direction reconciliation, cross-lane decisions, acceptance, and documentation sync. Active Figma key `9zvk9iSRPKSsJ6llDJrQmA`; current nodes and review status are indexed in [FIGMA_NODE_MAP.md](FIGMA_NODE_MAP.md).

## Current lanes

| Role / lane | Reusable owner / status | Context maturity | Current assignment and reporting line |
|---|---|---|---|
| Main director | Mingo (`/root`) — active | Cross-project | Own priorities, source reconciliation, cross-lane decisions, critical-path execution, acceptance, and documentation sync. The director can execute directly; specialists report to Mingo. |
| Canonical J | `/root/identity_j_owner` and `/root/canonical_j_macro_review` — completed/reusable | Mature; decision closed | Archive `159:2` is the selected large/primary launch mark. Vector `3289:31` lost after the one permitted correction; small optical proofs are `3289:157/162/167`. No further design pass; only rendered-size quality comparison. Reports to Mingo. |
| Frontend implementation | Mingo direct execution — active; no separate frontend agent is currently live | Mature, cross-surface | Move stable work into React, preserve design fallbacks, and converge through rendered comparison. Current active code and unstaged shared changes stay with Mingo until reviewed; stage only the assigned change. Reports to project director. |
| Review-frame production | Mingo — delivered | Mature | Profile strip `3285:45` exposes the four existing states; six exact body clones are indexed in [FIGMA_NODE_MAP.md](FIGMA_NODE_MAP.md). Keep clones synchronized after source edits; inspectability does not imply acceptance. |
| Case-study visual critique | `/root/visual_fidelity_critic` — reusable/available | Mature; remembers prior rejection patterns | Latest scoped review: Cho'Veigo full-page balance at `3286:603` was CLEAR on 2026-09-30; preserve demo scale/crop and make no Figma change. Reuse only for a concrete visual question. Reports to Mingo. |

## Convergence rules

- Implementation may begin once layout structure, public story hierarchy, and interaction intent are stable. Final completion follows implement, render actual site, compare with Figma/reference, critique, correct, owner review, and freeze.
- Owner rejection immediately supersedes old approvals. Use conservative statuses from [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md); pass count is not acceptance.
- Source truth remains in [CASE_STUDY_CONTENT_SOURCE.md](CASE_STUDY_CONTENT_SOURCE.md). Public design communicates the strongest truthful story for a first-time visitor; internal caveats are not automatic public copy.
- Full-page review frames and the Profile state strip are owner-review artifacts. They do not alter production navigation, scrolling, or hover behavior.
- Optional diagram motion should clarify static technical figures and remain restrained. Specify details during implementation; do not animate every diagram.
- After a meaningful Figma or owner-direction change, update and push the relevant durable docs to `feat/portfolio-integration`. Do not commit micro-adjustments or batch docs behind website work.
- Preserve shared working-tree changes and only stage paths relevant to the intended commit. Do not run tests or builds unless requested.
