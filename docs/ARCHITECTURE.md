# Client architecture

- Vite, React, TypeScript and React Router provide a static client with direct route support on a host configured for SPA fallback.
- `src/App.tsx` holds the shared shell, rail, lobbies, Profile Overview, Demos states, and route table. Long-form stories live in focused components, including Cho’Veigo and Stush Patties.
- `src/data.ts` holds short, source backed project and experience labels. It is not a content management layer.
- `src/styles.css` holds color, material, dimension, focus, reduced motion, and responsive rules. Desktop geometry follows the documented 1920 × 1080 Figma relationships: 82 px header; 1560 px central field and 360 px rail at that reference width.
- `public/media` contains the owner-cleared Crest sample capture and Cho’Veigo Recommendations still. The Food Tracker logo is omitted while public embedding rights remain unconfirmed. The CSS scene replaces the uncleared reference artwork until an original final scene is approved.

The screen is a grid with a persistent top shell and right rail. The main region can scroll independently. At narrow widths, the rail is removed and the central content becomes the page scroller. Focus outlines are explicit, lobby selection uses buttons with `aria-pressed`, and navigation uses links. Optional motion is disabled for reduced motion preferences.

Food Tracker has a scrollable route with chapter links, a scroll-synchronized active chapter, and a semantic benchmark table. The Stush Patties route uses a reflowing semantic workflow figure and is linked from the Experience lobby and rail; its source plate passed review, while browser visual and keyboard review remain outstanding. Other known project and experience URLs return to their lobby until their stories are ready. Profile Overview remains a structural stand-in pending a rights-safe composition and visual review. The pending canonical J and intro sequence need one shared identity asset before implementation.
