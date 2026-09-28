# Figma Implementation Specification

Figma is the design backbone for website translation. Current production pages are authoritative unless the owner prompt explicitly reopens them; archive page 11 (`510:2`) is active design history and informs Home/Explore, Help overlay, Resume Found/viewer, shell, and identity work. Source/content handoffs remain authoritative for factual claims.

## Required surface workflow

For each surface, in order:

1. Explicitly load the relevant Figma page with `setCurrentPageAsync`; pages are lazy-loaded, so an unloaded page is not evidence of emptiness.
2. Inspect the active production root and its children, then inspect archive/reference material relevant to the interaction.
3. Capture the Figma frame and identify selected assets and interaction semantics.
4. Implement only from sufficiently mature Figma direction.
5. Render the website at a matching viewport and capture it.
6. Compare Figma and website directly. Record concrete differences in structure, proportion, materials, hierarchy, typography, spacing, assets, state, motion, and click behavior.
7. Correct meaningful differences, render again, and compare again.
8. Ask an adversarial visual critic what would look cheaper, flatter, generic, less intentional, or less authentic beside the approved reference. Leave the surface open if a material blocker remains.

A route, passing tests, TypeScript, deployment, HTTP 200, content, number of Figma nodes, or previous `IMPLEMENT READY` label is not visual-completion evidence. If browser/render tooling is unavailable, mark visual comparison pending and continue Figma/code work without claiming validation.

## Reopened surfaces and controlling direction

| Surface | Current Figma reference | Required next design direction |
|---|---|---|
| Home / Explore | Archive page 11, `69:37` “Home · Mode Selection”; active production root `2252:3445` on `510:15`; prior shell study `2297:3474` | Preserve the archive structure: League client shell, upper destinations, top-right Profile account, right activity rail and toolbar, four horizontal modes, compact contextual/refinement queue, and centered Confirm CTA with separate Back disc. Reuse exported Figma emblems and controls. Profile is not a fifth mode. The current root remains in design review pending website comparison. |
| Help | Archive page 11, `69:207` “Home · First Visit Help”; active overlay design `2298:3474` on `510:22`; standalone `2014:11` rejected | Reusable dismissible overlay above the current screen with dim/blue treatment, focus boxes, and short numbered callouts. The Home overlay covers mode navigation, party/activity rail, filter/selection, and Confirm/Enter open behavior. Keep the current screen visible beneath it; `/help` is not a standalone guide. |
| Error/empty/offline | Archive page 11, then current production state family | Contextual client states attached to a failed/unavailable item; no generic guide or invented outage/retry. |
| Profile entry and shell | Current shell; inspect archived shell | Top-right avatar/account composition is canonical Profile entry. Central Joshua card selects/focuses first; explicit second action may open Profile. |
| Profile Overview | `960:2` | Restore approved banner, portrait/identity, CE medallion, traits, tabs, Projects, lower signals, connective logic, right rail, spacing and hierarchy. |
| Demos | `1316:35`, `1316:4534`, `1298:2` | In-client browser with all three entries, selector/index, central media surface, decorative title. No primary YouTube eject. Match truthful media state per project. |
| Canonical J | Archive page 11, `147:2` with left target `159:2`; compare right-side reconstruction history and prior production `1950:2` | Reconstruct/refine the archived target as an animatable first-party vector. Match crown, tapered stem, hook/counter, ring occlusion, and material hierarchy before micro-polish. Compare aligned 700 px silhouette/negative space, then 300/54/32/16 px and ring-free behavior. `2280:3474` is discarded greenfield exploration, not a candidate sheet. |
| Opening | `2025:2`, motion notes `2025:84` | Compare with real League loading/logo formation references. Keep about two seconds, Skip and reduced motion; refine scale, concentric mechanism, marks, materials, and motion. |
| Resume Found/viewer | Archive Resume Found/viewer and Match Found references | Keep exact v13 viewer infrastructure. Rework Found as Match Found-informed J mechanism; remove explanatory paragraph and preserve utility label/actions/close-home behavior. |
| Six case studies | Current project roots listed below; first technical-proof drafts revised 2026-09-27 | DESIGNING / NEEDS REDESIGN. Lead with technical proof; no editorial interruption or light-figure quota. Coordinator and adversarial critique found corrections still needed in Crest, Cho’Veigo, Fraymakers, and Stush; see implementation status. |
| Journey | `1287:7` | Preserve the environmental track and locator; rewrite the emotional/learning arc as in [DESIGN_DECISIONS.md](DESIGN_DECISIONS.md). |

## Case-study roots and factual source

| Story | Figma root/body currently recorded | Required focus |
|---|---|---|
| Food Tracker | `1813:2` / `1813:42`; figures `2032:2`, `2084:2` | Flagship technical proof: mobile/backend, catalog, retrieval candidate sources and union, deterministic ranking, Pinecone boundary, benchmark results, architecture decisions. |
| Crest | `1817:4` / `1817:39`; policy reference `1962:2` | Expense workflow, policy PDF→chunks→embeddings→Atlas vector search→grounded prompt, deterministic signals, bounded Gemini, review/preapproval, ownership. |
| Cho’Veigo | `1813:379` / `1813:419`; worksheet `2043:2` | Evidence-based discovery/tailoring, Fit vs Eligibility vs Recommendation, rules and structured Gemini boundary, human-reviewed regression, Jobs-side ownership. |
| Fraymakers | `1831:2` / `1831:32`; workflow `2118:2` | Match metadata→config→video mapping→thumbnail generation, real composition inputs/edge cases, 1280×720 output and actual ownership. |
| Living in Silico | `1438:2` / `1438:4` | Molecular modeling and experiment work immediately; preserve Apr 12 dataset vs separate curated subsets, methods/output uncertainty, DeepMol 500, Fragmenstein, unsuccessful REINVENT4. |
| Stush Patties | `1438:276` / `1438:278`; workflow `1992:2` | Incompatible distributor inputs, parse/canonicalize/normalize/month alignment, Koyo temporary position-and-cell exception, repeatable artifacts and team/client handoff. |

Use [CASE_STUDY_CONTENT_SOURCE.md](CASE_STUDY_CONTENT_SOURCE.md) for supported figures, claims, and ownership. Do not invent impact, benchmark rationale, missing media, or automatic-submission/upload claims.

The shared case-study acceptance criteria are technical proof in the first fold, legible role/period and ownership, an architecture/workflow explanation, verified methods/tools, important technical decisions, evaluation/results, and real project artifacts where available. Shared proof requirements do not imply a shared template: each project receives a visual grammar that serves its technical story. Do not preserve a white-plate composition by default, and do not add figures just to interrupt scrolling. Worker completion is a handoff request only; the coordinator must load and compare the relevant Figma root, verify facts against the source handoff, inspect the rendered implementation, and request adversarial critique before advancing status.

## Assets and release

Use collected authentic League/Riot/CommunityDragon assets selected for this project, approved Figma exports, and project media before inventing replacements. No public-reuse concern is an active design/build gate. Publication, licensing, and repository-visibility decisions belong to final release review and must not cause a lower-fidelity development design. Keep project/sample claims source-backed and retain owner-clearance boundaries for the Crest sample, Cho’Veigo static capture, and v13 resume.

## Current delivery evidence (2026-09-27)

The recorded immutable staging deployment is `a988bec6.joshuaik2.pages.dev`, source `e5306ed`. Seven selected route probes returned the same 635-byte SPA shell and verify host fallback only, not client rendering. The exact v13 PDF returned `application/pdf`, 164,726 bytes, SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`. This deployment evidence does not close any visual review. Browser-rendered website screenshots and direct Figma comparisons remain pending where no live browser evidence is recorded.

The 2026-09-27 source-validation record retains a 47-test / 11-file run, typecheck, lint, production build, and `git diff --check`. These are code evidence only. The Journey behavior test dispatches a synthetic `popstate` and restores a hash; it does not exercise native browser history or verify real scroll behavior.

Updated 2026-09-27: this specification supersedes earlier claims that particular frames or routes were ready to implement/close without the required rendered comparison.
