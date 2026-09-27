# Client Architecture

- Vite, React, TypeScript, and React Router provide a static client with direct-route support on a host configured for SPA fallback.
- `src/App.tsx` owns route registration and page composition. `src/PortfolioLayout.tsx` owns the shared shell/rail; `src/Lobby.tsx` owns Projects and Experience; `src/DemosPage.tsx` owns Demos; `src/ProfileNav.tsx` and `src/ProfileOverview.tsx` own Profile navigation and Overview. Case-study pages use focused route/story components. Help, recovery, Resume Found, and the PDF viewer are separate components.
- `src/data.ts` contains short project and experience labels; it is not a CMS. `src/styles.css` contains shared shell, focus, reduced-motion, and responsive rules. `src/profile-overview.css` owns Overview styling.
- The current implementation contains useful route/component extraction, exact authorized v13 PDF infrastructure, owner-cleared Crest/Cho’Veigo captures, source-backed project facts, and Journey structure. These are implementation assets, not proof of visual fidelity.
- The shell currently follows a documented 1920 × 1080 reference with an 82 px header, 1560 px central field, and 360 px rail. Recheck those proportions against active Figma before treating them as fixed.
- The canonical J is currently inline SVG in `src/identity/JMark.tsx`. Its previous accepted ratio/silhouette status is revoked; redesign is open. Do not let the existing component dictate the new Figma silhouette.
- Authentic Riot/League/CommunityDragon assets selected for this portfolio are preferred over generic CSS or initials during development. Public release/licensing review is separate and is not an active build gate. See [ASSET_MANIFEST.md](ASSET_MANIFEST.md).
- Profile entry, Help overlay, error-state family, Home first-run flow, Profile Overview, Demos, Resume Found, and all six case studies require redesign/synchronization toward active Figma. Journey structure is retained with writing reopened. See [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md).

Food Tracker's factual retrieval architecture, Crest's deterministic and bounded-AI boundaries, Cho’Veigo evidence distinctions, Fraymakers ownership, Living in Silico experiment uncertainty, and Stush Patties' normalization facts are maintained in [CASE_STUDY_CONTENT_SOURCE.md](CASE_STUDY_CONTENT_SOURCE.md). Implementations and diagrams should preserve those limits.

Figma page loading, archive-first inspection, rendering, direct comparison, discrepancy correction, second comparison, and adversarial review govern design-to-code work. A build, test suite, route response, or source review cannot close a visual surface by itself. Current validation evidence and pending browser comparisons are recorded in [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md).
