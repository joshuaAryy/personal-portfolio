# Utility State Design Handoff

Figma file: `9zvk9iSRPKSsJ6llDJrQmA` · Activity + Help + Errors page `510:22`.

## 404 route recovery · pass 01 · 2026-09-28

The rejected guide-like 404 composition `2014:94` now shows one contextual route error inside the preserved client shell and Activity rail:

- `ROUTE RECOVERY` → `404` → “This page isn’t here.”
- “This address doesn’t match a current portfolio route.”
- One real destination: the gold `Go to Projects` action (`2014:141`).

The duplicate recovery card (`2014:132`), Experience and Profile actions (`2014:143`, `2014:145`), Available Indexes section (`2014:147–149`), and unrelated repository note (`2014:150`) are hidden. The shared component anatomy (`2014:2`) and empty/unavailable/offline pattern frame (`2014:151`) remain unchanged. No outage, automatic retry, or HTTP status behavior is claimed by the design.

The persistent visual critic first requested a composition revision because the rejected frame repeated the 404 explanation and Projects action across the hero, card, and index list. The critic returned CLEAR for pass 01: the route state is now concise, readable, and visually balanced against the unchanged header and Activity rail. This clears the Figma delta only.

Captures: [rejected baseline](utility-state-review/404-route-recovery-pass-00-rejected.png) · [pass 01](utility-state-review/404-route-recovery-pass-01.png).

Website synchronization is complete in `NotFoundContent.tsx` and the necessary 404-specific styles in `utility.css`; the frontend owner found no source-level blocker. Help and `UtilityState.tsx` remain unchanged. Browser-rendered comparison, narrow-screen review, and overall error/empty/offline family acceptance remain open. No tests, builds, Browser checks, or site renders were run for this pass. The current tracked `src/UtilityRoutes.test.tsx` covers the 404 code and title, the recovery label, the Projects destination, and the absence of Experience/Profile actions. It does not assert the removed unavailable-state card, so no test expectation edit is pending. Tests were not run for this pass; browser and narrow-screen validation remain open.

## Shared-pattern usage audit · 2026-09-28

Live Page 08 inspection confirms `2014:151` is a 1920 × 1080 pattern/spec frame: it contains the shared 706 × 226 state component `2014:2`, usage guidance, and an accessibility note. It does not instantiate a particular empty, unavailable, or offline route/item state. Source search found `UtilityState.tsx` defines the three variants and valid route destinations, but no component or route imports it; no current source-backed trigger was identified. Keep the component as a reusable building block and leave this family open until a real contextual condition is part of the product flow. No Figma or code changes were made for this audit.
