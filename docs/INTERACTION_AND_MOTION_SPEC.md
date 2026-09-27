# Interaction and Motion

This handoff summarizes current website behavior and separates it from motion authored in the design. Current implementation status and validation are tracked in [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md).

## Routes and behavior

| Surface | Route | Current behavior |
|---|---|---|
| Projects | `/projects` | Project lobby links to available stories. |
| Project stories | `/projects/food-tracker`, `/projects/crest`, `/projects/choveigo`, `/projects/fraymakers` | Individual editorial stories with chapter navigation. |
| Experience | `/experience` | Experience lobby links to available stories. |
| Experience stories | `/experience/living-in-silico`, `/experience/stush-patties` | Long-form responsive stories. |
| Profile | `/profile`, `/profile/journey`, `/profile/demos` | Overview, Journey, and Demos routes share profile navigation. Personal Highlights remains unavailable. |
| Help and recovery | `/help`, unknown client routes | Help links the live Overview, Journey, Demos, and current project/experience indexes; it demonstrates the shared empty state, explains keyboard access for links and buttons, and sends unfinished stories back to the Projects or Experience index. Unknown routes show recovery links; host-level HTTP 404 behavior is not guaranteed. |
| Resume | `/resume`, `/resume/viewer` | Resume Found leads to a viewer for `public/resume/Joshua_Aryeetey_General_Resume_v13.pdf`, the exact user-authorized General Resume v13. Download and fullscreen/open actions use that same PDF. Escape and Close on Resume Found return to the originating route when available, otherwise Projects. |

## Shared interaction

The responsive shell uses semantic links and buttons. The skip link targets a focusable main region, and client-side route changes move focus to that region. Interactive elements have visible focus styling. Keyboard, responsive, and screen-reader behavior still need live browser review.

Case-study stories use a sticky chapter bar above an independently scrolling story on wide layouts. Chapter links are keyboard-operable and visibly focused; Food Tracker and Cho'Veigo synchronize the selected chapter with story scrolling. Fraymakers does not synchronize the selected chapter during manual scrolling. Current Figma chapter reactions change selected state but do not scroll the story; the website supplies the actual anchor scrolling. Smooth chapter movement is disabled for reduced-motion preferences, and the browser determines the smooth-scroll duration.

The Journey story has an 1840 px desktop body and nine ordered beats. The Living in Silico waypoint targets the research spark, followed by the separate Stanford lecture memory. The closing card and signoff align with Figma body positions y=1640 and y=1765. The desktop locator aligns to the 8 px right inset and 80 px top offset, then scales up to 760 px within the available scrollport height. Content reflows at a 900 px container-width threshold, with document scrolling at narrower widths. A locator follows the active story waypoint at a 35% reading line; selecting a waypoint scrolls to it. Reduced motion uses immediate scrolling. No numeric progress or game-stat treatment is used.

Demos selection changes the still, title, selected state, and decorative recording marker without an authored transition. Crest's sample still links to its public demo separately.

## Opening and motion

The opening is a two-second, one-shot J reveal followed by Projects. Its outer registration frame is 532 × 532 px with four cardinal ticks; the frame fades in over 180 ms and settles from +1.2° to 0° by 460 ms. At 1.82 s, the opening fades out as an inert Projects client fades in beneath it; route replacement completes at 2.00 s. Skip immediately enters Projects. Under reduced motion, the completed J and registration frame appear without rotation or the light pass, and the handoff crossfade lasts 120 ms. The design timeline loops; the website plays once.

The Figma Profile navigation uses Smart Animate with Ease Out over 200 ms and resets scroll. Experience-story return links use a 200 ms Ease Out dissolve. Demos selection is immediate, and Page 01 has no global route reaction. These are prototype-specific timings; website routes outside the opening replace immediately.

## Page 09 interaction ledger

Figma Page 09 contains the opening timeline (`2025:84`) and the cross-surface interaction ledger (`2176:2`). The opening note at `2025:97` now records the +1.2° settle that matches the website source. The ledger separates authored prototype behavior from website runtime behavior rather than inventing timing where none is specified.

| Surface | Figma prototype | Website implementation |
|---|---|---|
| Shell and routes | Page 01 has no global route reaction. Profile tabs use 200 ms Smart Animate; Experience-story return links use a 200 ms Ease Out dissolve. Cross-page project routes remain intentionally unwired. | The opening plays once for 2.00 s, with the client handoff beginning at 1.82 s. Other route changes are immediate and move focus to main. Reduced-motion opening handoff is 120 ms. |
| Profile navigation | Overview, Journey, and Demos navigate with 200 ms Smart Animate, Ease Out, and scroll reset. Personal Highlights has no active destination. | The active state follows the current route. Personal Highlights remains unavailable pending owner photos and content direction. |
| Case-study stories | Chapter clicks update the selected-state variable; the current Figma prototype does not scroll the story to the selected chapter. | Story content scrolls independently under a sticky chapter bar on wide layouts. Anchor movement follows browser smooth-scroll behavior and becomes immediate under reduced motion. Food Tracker and Cho'Veigo track the active chapter during scroll; Fraymakers does not. |
| Sticky controls | The chapter control remains at the top of the story viewport; the Journey locator presents five waypoints without a numeric score. | Chapter bars stay sticky on wide layouts. The Journey locator sticks at 80 px from the top, moves to 15 px after narrow reflow, and follows the 35% reading line. |
| Journey waypoints | Waypoint controls change the selected state. | Scroll and resize update the active waypoint. Click/keyboard activation adds a `#journey-*` history entry; valid fragments restore on mount and back/forward. Modified clicks retain native behavior; reduced-motion scroll is immediate. |
| Demos | Selector reactions navigate instantly; no transition is assigned. | The still, title, selected row, and recording marker update immediately. Only cleared Crest and Cho'Veigo stills appear; selection does not imply playback. |
| Resume Found and viewer | The Found and Viewer frames have no prototype reaction or assigned route duration. | Found arrival animates the ring for 700 ms, J for 620 ms, and copy for 380 ms after a 180 ms delay. Reduced motion removes the entrance. Escape/Close returns to the originating route or Projects. Viewer navigation is immediate; the exact authorized v13 PDF is embedded, downloaded, or opened in a new tab. Rendering is browser-native. |
| Hover and focus | Profile route tabs use the 200 ms eased state change; no general hover timing is specified. | Hover/current styling stays local. Keyboard focus is visible, and pathname changes move focus to main. There is no site-wide route fade. |
| Help and errors | No entrance motion is specified for Help, recovery, empty, unavailable, or offline states. | These use the shared shell without a dedicated entrance or automatic retry. Offline appears only when detected. Reduced-motion utility effects collapse to 0.01 ms. |

Browser visual, keyboard, responsive, reduced-motion, and native PDF behavior remain unreviewed; the ledger is source-backed documentation, not runtime proof.

Resume Found removes its entrance motion under reduced-motion preferences. Utility and recovery screens use the shared shell and main-region focus behavior. Offline status is shown only when appropriate; no automatic retry is promised.

## Validation status

The current integration is deployed to the public staging project at `https://523d052d.joshuaik2.pages.dev/` (deployment `523d052d-15ca-4c90-b119-3aa28d73c2ca`, application source `d1431ee`). All 15 requested route URLs returned HTTP 200 with the same 635-byte SPA shell, verifying hosting fallback only. The v13 PDF returned HTTP 200 with `application/pdf`, 164,726 bytes, and the approved workspace source SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`. Visual rendering, live keyboard behavior, responsive browser behavior, reduced-motion behavior, and native PDF handling remain pending because no browser was available. No screenshots or live browser checks are claimed here.

## Journey waypoint fragments (2026-09-27)

On /profile/journey, primary and keyboard activation of a locator anchor adds its #journey-* target to browser history and scrolls to the existing 35% reading line. Valid fragments restore the active waypoint and scroll position on mount and browser back/forward. Modified and non-primary clicks keep native anchor behavior. Reduced-motion preferences retain immediate scrolling.
