# Active Agent Registry

Updated 2026-09-30. **Mingo is the project director.** Mingo may execute directly while coordinating persistent specialist lanes, and owns priorities, owner-direction reconciliation, cross-lane decisions, acceptance, and documentation sync. Active Figma key `9zvk9iSRPKSsJ6llDJrQmA`; current nodes and review status are indexed in [FIGMA_NODE_MAP.md](FIGMA_NODE_MAP.md).

## Current lanes

| Lane | Owner / status | Durable assignment |
|---|---|---|
| Project direction and documentation | Mingo (`/root`) — active | Direct work is appropriate when it is the fastest path. Keep durable docs synchronized with meaningful direction changes; commit and push those docs without waiting for React work. |
| Canonical J | `/root/identity_j_owner` — reactivate for one bounded deliverable; `/root/canonical_j_macro_review` — reuse as critic after the primary exists | Archive `159:2` is the strongest complete mark and the approved launch fallback. Reconstruct the full integrated archive relationship once, then allow at most two meaningful correction cycles. Build a distinct small optical mark for 54/32/16px. If the large reconstruction remains weaker, use the archive and close the loop. No more orbit variants or micro-pass diary. |
| Frontend implementation | React lane — active continuously | Implement mature surfaces when structure, content hierarchy, and interaction intent are stable. Current priorities include segmented Opening, Home, Profile hover states, stable case studies, Help, shell/lobbies, and utilities. Use archive J fallback. Preserve unrelated dirty work; stage only assigned files. Judge completion by rendered comparison and correction; owner acceptance is the final gate, not a prerequisite for every implementation pass. |
| Review-frame production | Mingo direct or a bounded Figma lane | Add a visible Profile strip for the four existing overlays, then create uncropped full-page review frames for all six long-form stories using the same authored content. Keep production client frames at 1920×1080 with scrolling. Do not begin substantial new case-study redesign before these review representations are available. |
| Case-study critique | Reuse completed `/root/visual_fidelity_critic` for a scoped critique when useful | Preserve owner-positive Stush, Living in Silico, Fraymakers, and Food Tracker. Critique only a concrete gap; do not request another redesign for activity. A critique applies only to the reviewed surface and does not establish owner acceptance or whole-page balance. |

## Convergence rules

- Implementation may begin once layout structure, public story hierarchy, and interaction intent are stable. Final completion follows implement → render actual site → compare with Figma/reference → critique → correct → owner review → freeze.
- Owner rejection immediately supersedes old approvals. Use conservative statuses from [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md); pass count is not acceptance.
- Source truth remains in [CASE_STUDY_CONTENT_SOURCE.md](CASE_STUDY_CONTENT_SOURCE.md). Public design communicates the strongest truthful story for a first-time visitor; internal caveats are not automatic public copy.
- Full-page review frames and the Profile state strip are owner-review artifacts. They do not alter production navigation, scrolling, or hover behavior.
- Optional diagram motion should clarify static technical figures and remain restrained. Specify details during implementation; do not animate every diagram.
- After a meaningful Figma or owner-direction change, update and push the relevant durable docs to `feat/portfolio-integration`. Do not commit micro-adjustments or batch docs behind website work.
- Preserve shared working-tree changes and only stage paths relevant to the intended commit. Do not run tests or builds unless requested.
