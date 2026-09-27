# Cho’Veigo Case Study Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Figma-ready Cho’Veigo editorial case study at `/projects/choveigo` in the separate public portfolio client.

**Architecture:** Add a focused React route component with its own chapter navigation and story sections. Reuse the existing client shell and global rail, the owner-cleared static Recommendations image, the established colors/type, and the existing route-link conventions. Add only page-specific responsive CSS; do not create placeholder project media or change other stories.

**Tech Stack:** React 19, TypeScript, React Router 7, Vite, CSS, Vitest with React server rendering for route-content checks.

**Spec:** `../../../../docs/FIGMA_IMPLEMENTATION_SPEC.md` (active Cho’Veigo story and interaction details); `../../../../docs/ASSET_MANIFEST.md` (static image clearance); `../../../../docs/INTERACTION_AND_MOTION_SPEC.md` (route and chapter behavior); `../../../../collection-research-packet.md` (verified role and claim boundaries).

## Global Constraints

- Route: `/projects/choveigo`; return control leads to `/projects`.
- Use only the cleared static image `public/media/choveigo-recommendations.png`; do not add autoplay, playback controls, video, or personal fields.
- Preserve the five chapter names and content sequence: The Question, Fit Model, Human Review, System Path, What Changed.
- Keep Fit, Eligibility, and Recommendation as separate concepts; do not imply automatic job submission.
- Attribute the project as a two-person collaboration with Shiv Arora and Joshua’s Jobs-side product/evaluation direction, retrieval priorities, and behavior review.
- Preserve the desktop shell, shared rail, and independent story scrolling; use responsive single-column layouts on narrow screens and honor reduced motion.
- Do not add project logos, Riot assets, fictional metrics, or research-grade evaluation claims.

## Review Focus

- The 680×382.5 Recommendations still must remain static, identifiable, and safely responsive; assert the expected image and absence of a video element.
- Direct route loading must show the case instead of redirecting to the Projects lobby; test the route at `/projects/choveigo`.
- Chapter targets must remain unique and the initial chapter must be marked current; test all five chapter anchors and `aria-current`.
- The three decision dimensions must remain distinct and the no-submission boundary explicit; assert their labels and boundary text.
- Text must not imply whole-product completion or sole implementation ownership; retain the verified two-person and Jobs-side attribution in the rendered markup.

---

### Task 1: Cho’Veigo editorial route

**Files:**
- Create: `src/ChoViegoCase.tsx`
- Create: `src/ChoViegoCase.test.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`
- Modify: `package.json`, `package-lock.json` (Vitest script/dependency)
- Modify: `docs/IMPLEMENTATION_STATUS.md`

**Interfaces:**
- Consumes: `Client` shell and project data from `src/App.tsx` / `src/data.ts`; `public/media/choveigo-recommendations.png`.
- Produces: default React component `ChoViegoCase`; App route `/projects/choveigo`; five links targeting `#choveigo-question`, `#choveigo-fit`, `#choveigo-review`, `#choveigo-system`, and `#choveigo-change`.

- [x] Add Vitest and an `npm test` script. Add `src/ChoViegoCase.test.tsx` using `MemoryRouter` plus `renderToStaticMarkup`; assert the case headline, all chapter targets, current chapter, static image, separate Fit/Eligibility/Recommendation dimensions, ownership attribution, and explicit no-submission boundary.
- [x] Run `npm test -- --run src/ChoViegoCase.test.tsx` and confirm the case-route/content assertion fails against the current reserved-route behavior.
- [x] Implement the component and route. Reproduce the asymmetric opening, three-part fit model, mismatch→expectation→fixture→regression sequence, six-stage job-to-resume path with an authority-boundary note, and split closing result. Keep the cleared capture static and use the established navigation/focus patterns.
- [x] Add page-scoped CSS for the open editorial layout, typography, figure crop, horizontal process sequences, narrow-screen stacking, keyboard focus, and reduced motion. Keep the chapter bar sticky inside the main scroll area.
- [x] Run the focused test and confirm it passes; run `npm run lint`, `npm run typecheck`, and `npm run build`.
- [x] Update the implementation status and handoff with code state, QA evidence, and the unresolved distinction between Figma readiness and public-route visual review.
- [x] Commit the route, its tests, and the implementation-status update on the feature branch.
- [x] Resolve code-review findings: let the Recommendations still scale proportionally; select the closing chapter at desktop or mobile scroll end; strengthen unique-target, initial-current, definition, and attribution assertions.
- [x] Run focused and full route checks, lint, typecheck, and production build after the review corrections; retain browser QA as outstanding because no browser session is available.
- [x] Fast-forward and push the reviewed route to `feat/initial-client-shell`, deploy the secondary Cloudflare Pages site, and verify the live route, JavaScript bundle, and cleared image.
- [x] Record the deployed commit, immutable staging URL, verification results, and outstanding browser QA in the implementation handoff.
