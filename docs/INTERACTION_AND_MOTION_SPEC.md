# Interaction and Motion Specification

This is the controlling interaction direction for design and implementation. Current production Figma pages plus selected authentic League references define appearance; archive page 11 (`510:2`) is active interaction history. Website implementation details in this document describe the current code only where explicitly marked; they do not establish visual completion.

## Intended navigation and interactions

| Surface | Intended behavior |
|---|---|
| First run | Opening → Home / Explore → visitor chooses Projects, Experience, Hackathons, or Education. Use Archive `69:37` structure: four major modes arranged horizontally within the League-client shell, a compact lower-left context queue, centered Confirm paired with the separate Back disc, right Activity rail and toolbar, and top-right Profile account entry. Selection and Confirm are separate; arrows move among modes and Enter confirms. Profile is not a main mode; opening and Skip must not dump the visitor directly into Projects. |
| Profile entry | Top-right avatar/account composition opens Profile. The central Joshua lobby card may select/focus first; opening Profile from it requires an explicit second action. |
| Project/experience lobby | One action may select/focus an item, with hover and selected feedback. A clear explicit action opens its story. Use authentic selected assets. |
| Help | Following Archive `69:207`, opens a reusable dismissible overlay above the current screen. Keep that screen visible beneath the dim/blue guided treatment; on Home, separately highlight modes, lower context, and Confirm/Back, with numbered callouts. Dismissal returns to the same context. A `/help` URL may remain for access/deep linking, while the visible behavior remains overlay-oriented. The standalone `2014:11` guide is rejected. |
| Errors and empty states | Attach unavailable, empty, offline, or not-found feedback to the affected client surface/item. Offer valid destinations/actions only. Do not invent an outage, automatic retry, or generic portfolio landing guide. |
| Profile Overview | Project identity/media/name/card opens the case study. A small source icon may open a verified public repository. The top-right avatar remains the Profile entry; preserve Figma overlay/connective behavior and right rail. |
| Demos | Selector switches among Food Tracker, Crest, and Cho’Veigo in the in-client media browser. Crest plays in-client if an actual accessible demo is available; external open may be secondary. Cho’Veigo capture is static and must not imply playback. Food Tracker remains present even if its current capture is unresolved. |
| Resume | Resume Found provides `VIEW RESUME` plus close/home behavior. Viewer embeds the exact authorized General Resume v13 PDF and exposes Download and Open Fullscreen against that same file. |
| Journey | Preserve the full-length track/locator and scroll-driven active beat. Rewrite copy around curiosity, motivation, confidence, and learning rather than a résumé chronology. Support keyboard activation and reduced motion. |

## Opening motion

Target roughly two seconds. Retain Skip and a reduced-motion path. The existing `2025:2` / notes `2025:84` composition is directionally useful but remains open until compared with real League logo/loading formation behavior: concentric mechanism, segmentation, registration marks, proportions, line weights, rotation/settle, material, light pass, and emblem-to-ring scale. A circle with four ticks around a J is not sufficient evidence of a faithful sequence. The next implementation must follow the revised Figma behavior; do not treat previous Projects handoff timings as controlling where they conflict with Home/Explore first-run flow.

## Reduced motion, focus, and accessibility

Retain semantic controls, visible keyboard focus, a skip-to-main path, and focus movement appropriate to route or overlay changes. Reduced-motion preferences should remove nonessential movement and make scrolling immediate. Overlay dismissal, focus return, narrow-screen behavior, and keyboard paths require browser review after implementation; source inspection alone does not verify them.

## Existing code behavior and validation limits

The opening now hands off to Home/Explore, and Help uses the current-route overlay with Escape dismissal and focus management. Error/empty/offline recovery still needs the archive-first contextual state-family redesign. These are code implementation facts pending browser validation; none establishes visual completion. Existing route timings, locator dimensions, transition values, and old utility semantics remain implementation facts only if still present in code; they do not supersede this owner direction.

Earlier baseline checks dated 2026-09-27: 47 tests across 11 files passed, along with typecheck, lint, production build, and `git diff --check`. The latest Home/Help/shell run passes 76 tests across 20 files and `npm run build`; the supported in-app Browser still has no available browser instance. Journey coverage dispatches a synthetic `popstate` with a restored hash; it does not verify native browser back/forward or real scrolling. Seven deployed route probes returned the SPA shell only. No browser-rendered comparison, live keyboard/responsive review, reduced-motion review, or native PDF browser review is claimed complete.

Updated 2026-09-27. This document supersedes the previous Projects-first, standalone Help guide, and generic recovery interaction as design requirements.
