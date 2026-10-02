# Repository Operating Instructions

## Project direction

Mingo is the project director. Mingo may execute directly while coordinating the persistent specialist lanes, and owns cross-surface priorities, owner direction, source reconciliation, acceptance, and documentation sync.

## Convergence and implementation

- Progress means closing a real communication/design problem, making a durable implementation-ready decision, moving mature work into React, or improving the rendered site after comparison. Pass count, documentation volume, agent count, and new Figma nodes do not define progress. Converge by implementing, rendering the actual site, comparing with Figma/reference, critiquing, correcting, obtaining owner review, and freezing. Owner acceptance follows render comparison; it is not a gate before each implementation pass.
- Implementation may start when structure, public content hierarchy, and interaction intent are stable enough to translate. Do not wait for final owner acceptance before each implementation pass. Final completion still requires render, compare with Figma/reference, critique, correct, owner review, and freeze.
- **Canonical J status (2026-10-01): PRODUCTION FALLBACK archive `159:2`; IDENTITY DESIGN Sonnet 5.5 v8 `3325:191` is an active owner-review candidate.** Comparison board `3325:36` shows archive / Sonnet v7 `3311:2` / v8. Do not place v8 in production before owner review. The old Codex reconstruction lineage, including Pass16–80, is rejected/closed; that does not close the separate Sonnet direction. Preserve the small optical-size marks. J exploration does not gate React implementation.
- Keep persistent specialist lanes focused on bounded deliverables and coordinate them in parallel when their files/surfaces are independent. Implementation must not be blocked by an unresolved logo if a documented fallback exists.
- Before assigning work, check the live collaboration tree and reuse only handles that are actually present. A completed or missing handle is historical context, not an assumed callable agent. Mingo executes directly for small, cross-cutting, or coordination-heavy work; create a new reusable specialist lane only for recurring independent domain work.

## Figma reviewability

- Preserve the approved Profile base `960:2` and its four-sector Projects composition. Keep the four lower signals static with their separate hover/focus overlays. Maintain a clearly labeled side-by-side review strip for Projects, Experience, Hackathon, and Academics; it documents states and does not change production behavior.
- Each of the six long-form stories must have a 1920×1080 production/client viewport with intended scrolling and a separate uncropped full-page review frame. Generate the review representation from the same authored sections/components; do not manually retype or redesign duplicate content. Keep the paired representations synchronized.
- Before substantial new case-study redesign, make the six full-page review frames available for owner inspection.

## Bounded identity and asset work

- Frontend implementation is continuous. Use archive `159:2` as the production large-mark fallback while the separate Sonnet v8 candidate receives owner review; no identity exploration gates mature React work. Final visual acceptance follows render → compare → critique → correct → owner review. **Browser blocker scope:** the supported browser last returned `No browser is available`; this blocks browser-dependent render validation only, while portfolio execution continues. Do not substitute unsupported browser automation or retry the same unavailable connection without an availability change or natural validation checkpoint. Track affected surfaces and evidence in [the render validation queue](docs/RENDER_VALIDATION_QUEUE.md); do not infer parity from non-browser checks.
- Cho'Veigo's canonical mark is selected and frozen: the existing product-specific match-path art in `public/media/profile/choveigo-mark.svg`, matching Figma `3297:45/54/63/72`. It is supported at 26px and larger for the actual Profile/lobby placements; it is too diagrammatic at 16px, which has no active product placement. Review proof `3374:2` documents the limit. No new logo pass is needed. All project marks are frozen.
- Resume Found has received its one targeted Figma/React environment pass using authentic Riot/CommunityDragon Ready Check material (Figma `2407:176`, overlays `3292:484/485/486`): dim underlay, dark radial vignette, subtle teal/navy light, authentic chassis, localized central energy, and demoted but visible shell/rail. Render comparison remains open; do not restart the architecture.

## Durable direction and documentation

- Owner review overrides prior approvals and older documentation. Keep statuses conservative and mark superseded directions clearly.
- Keep factual source truth in `docs/CASE_STUDY_CONTENT_SOURCE.md`; use `docs/DESIGN_DECISIONS.md` and implementation specifications to curate the public story.
- After a meaningful Figma or owner-direction change, update the relevant durable documents, then commit and push documentation to `feat/portfolio-integration` without waiting for website implementation. Do not make commits for transient micro-adjustments.
- Preserve strong work and allocate iteration to identified gaps; do not redesign a surface to demonstrate activity.
- Preserve unrelated working-tree changes and stage only files relevant to the intended commit.
- Do not run tests or builds unless the owner asks for verification.
