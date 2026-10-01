# Active Agent Registry

Updated 2026-10-01. **Mingo is the project director** and coordinates the persistent specialist lanes while executing directly. Active Figma key `9zvk9iSRPKSsJ6llDJrQmA`; node/status map is [FIGMA_NODE_MAP.md](FIGMA_NODE_MAP.md). Supported browser render validation is unavailable; continue non-browser lanes and track pending comparisons in [RENDER_VALIDATION_QUEUE.md](RENDER_VALIDATION_QUEUE.md).

## Current lanes

| Role / lane | Reusable owner / status | Context maturity | Current assignment and reporting line |
|---|---|---|---|
| Main director | Mingo (`/root`) — active | Cross-project | Own priorities, source reconciliation, cross-lane decisions, critical-path execution, acceptance, and documentation sync. The director can execute directly; specialists report to Mingo. |
| Canonical J and project marks | /root/identity_j_owner - previous Codex reconstruction task complete; /root/canonical_j_macro_review - reusable | J: archive production fallback; Sonnet v8 owner review open; old Codex lineage rejected; Cho'Veigo mark frozen | Owner-selected comparison board `3325:36` shows archive, Sonnet v7 `3311:2`, and active candidate v8 `3325:191`. Preserve v8 for owner review; do not change production before review. The old Codex reconstruction lineage, including Pass16-80 and `3364:2`, remains rejected. Project marks otherwise stay frozen. Reports to Mingo. |
| Frontend implementation | Mingo direct execution - active; /root/frontend_owner - reusable | Mature, continuous lane | React includes the segmented Opening, Profile hover/focus overlays, Home icon candidate, six full-length stories, Help/recovery, and Resume Found. Archive J `159:2` is the production fallback while Sonnet v8 remains under owner review; no identity work gates implementation. Crest 2026-09-30/2026-10-01 render evidence remains scoped to its corrected figure/opening, while other queued surfaces await supported-browser validation. Reports to project director. |
| Review-frame production | Mingo — delivered | Mature | Profile strip `3285:45` exposes the four existing states; six exact body clones are indexed in [FIGMA_NODE_MAP.md](FIGMA_NODE_MAP.md). Keep clones synchronized after source edits; inspectability does not imply acceptance. |
| Home shell / icon review | `/root/home_shell_owner` - completed/reusable | Candidate synced; scoped Figma critique clear; rendered-site comparison and owner review open | One bounded Figma proposal `3339:310` was made beside unchanged production fallback `2252:3445`; only the four inner glyphs changed. Mingo synced the direct SVG exports into React. A scoped Figma critique found each glyph reads quickly against its label while preserving the unchanged structure. Compare the render before owner review; keep Home structure frozen and avoid further variants without an observed gap. Reports to Mingo. |
| Cross-surface visual critique | /root/visual_fidelity_critic - reusable/available; /root/home_shell_owner - completed/reusable | Mature; preserves owner-positive directions | Cho'Veigo `3286:603`, Crest `3286:813`, and Home `3339:310` retain their scoped reviews. Resume Found Figma environment pass is clear; its React update awaits post-change browser render. J production fallback is archive `159:2`; Sonnet v8 `3325:191` remains an owner-review candidate, not production. Reports to Mingo. |

## Convergence rules

- Implementation may begin once layout structure, public story hierarchy, and interaction intent are stable. Final completion follows implement, render actual site, compare with Figma/reference, critique, correct, owner review, and freeze.
- Owner rejection immediately supersedes old approvals. Use conservative statuses from [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md); pass count is not acceptance.
- Source truth remains in [CASE_STUDY_CONTENT_SOURCE.md](CASE_STUDY_CONTENT_SOURCE.md). Public design communicates the strongest truthful story for a first-time visitor; internal caveats are not automatic public copy.
- Full-page review frames and the Profile state strip are owner-review artifacts. They do not alter production navigation, scrolling, or hover behavior.
- Optional diagram motion should clarify static technical figures and remain restrained. Specify details during implementation; do not animate every diagram.
- After a meaningful Figma or owner-direction change, update and push the relevant durable docs to `feat/portfolio-integration`. Do not commit micro-adjustments or batch docs behind website work.
- Preserve shared working-tree changes and only stage paths relevant to the intended commit. Do not run tests or builds unless requested.
