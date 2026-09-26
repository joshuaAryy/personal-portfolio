# Client architecture

- Vite, React, TypeScript and React Router provide a static client with direct route support on a host configured for SPA fallback.
- `src/App.tsx` holds the shell, rail, four initial surfaces, route table, and deferred route screen. The project is intentionally small; components will split when the long form stories arrive.
- `src/data.ts` holds short, source backed project and experience labels. It is not a content management layer.
- `src/styles.css` holds color, material, dimension, focus, reduced motion, and responsive rules. Desktop geometry follows the documented 1920 × 1080 Figma relationships: 82 px header; 1560 px central field and 360 px rail at that reference width.
- `public/media` contains three owner-cleared stills used in Demos. The CSS scene replaces the uncleared reference artwork until an original final scene is approved.

The screen is a grid with a persistent top shell and right rail. The main region can scroll independently. At narrow widths, the rail is removed and the central content becomes the page scroller. Focus outlines are explicit, lobby selection uses buttons with `aria-pressed`, and navigation uses links. Optional motion is disabled for reduced motion preferences.

The pending canonical J and intro sequence need one shared identity asset before implementation. Case detail routes are already reserved so lobby and rail links remain stable as approved stories are ported.
