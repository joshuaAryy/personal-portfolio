# Client architecture

- Vite, React, TypeScript, and React Router provide a static client with direct-route support on a host configured for SPA fallback.
- `src/App.tsx` owns the shared shell, rail, lobbies, Demos, and route table. The Profile navigation and Overview live in `src/ProfileNav.tsx` and `src/ProfileOverview.tsx`; long-form stories use focused route components for Food Tracker, Crest, Cho’Veigo, Stush Patties, Fraymakers, Living in Silico, and Journey. Help, 404 recovery, Resume Found, and the PDF viewer are also separate route components.
- `src/data.ts` contains short, source-backed project and experience labels. It is not a content management layer.
- `src/styles.css` contains shared shell, focus, reduced-motion, and responsive rules. `src/profile-overview.css` owns Overview project and signal styling. The desktop shell follows the documented 1920 × 1080 reference: an 82 px header, 1560 px central field, and 360 px rail.
- `public/media` contains only the owner-cleared Crest sample capture and Cho’Veigo Recommendations still. The Food Tracker mark is omitted while public embedding rights remain unconfirmed. Original CSS replaces uncleared scene artwork.

The screen uses a persistent top shell and right rail, while the main region scrolls independently. At narrow widths the rail is removed and central content becomes the page scroller. Focus outlines are explicit, lobby selection uses buttons with `aria-pressed`, and navigation uses links. Optional motion respects reduced-motion preferences.

Food Tracker uses a scrollable route with chapter links, a scroll-synchronized active chapter, a semantic benchmark table, and a responsive product-anatomy plate. Crest has an isolated chapter story. Cho’Veigo uses distinct Fit, Eligibility, and Recommendation judgments and an owner-cleared static capture. Stush Patties has a responsive workflow schematic. Fraymakers has an asset-free four-chapter editorial story with explicit project ownership boundaries. Living in Silico has a static responsive research story and does not claim a successful REINVENT4 result. Journey uses a full-length responsive story with a shared 35% reading line and a locator; its texture fades near the first fold while the color field continues through the full composition.

The canonical J is an inline first-party SVG in `src/identity/JMark.tsx`. The accepted glyph ratio is 0.8315; ringed and monochrome variants share the reviewed silhouette. The opening route uses the same mark and has a reduced-motion handoff.

The current staging and deployment state is tracked in `IMPLEMENTATION_STATUS.md`.
