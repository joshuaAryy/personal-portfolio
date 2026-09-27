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

Case-study stories use a sticky chapter bar above an independently scrolling story on wide layouts. Chapter links are keyboard-operable and visibly focused; Food Tracker and Cho'Veigo synchronize the selected chapter with story scrolling. Fraymakers does not synchronize the selected chapter during manual scrolling. Smooth chapter movement is disabled for reduced-motion preferences. The authored design specifies a 0.35-second eased chapter scroll; website anchor behavior follows the browser and reduced-motion setting.

The Journey story has a 1600 px desktop body. The heading-to-track offset is explicit so the closing card and signoff align with Figma body positions y=1400 and y=1535. The desktop locator aligns to the 8 px right inset and 80 px top offset, then scales up to 760 px within the available scrollport height. Content reflows at a 900 px container-width threshold, with document scrolling at narrower widths. A locator follows the active story waypoint at a 35% reading line; selecting a waypoint scrolls to it. Reduced motion uses immediate scrolling. No numeric progress or game-stat treatment is used.

Demos selection changes the still, title, selected state, and decorative recording marker without an authored transition. Crest's sample still links to its public demo separately.

## Opening and motion

The opening is a two-second, one-shot J reveal followed by Projects. Its outer registration frame is 532 × 532 px with four cardinal ticks; the frame fades in over 180 ms and settles from +1.2° to 0° by 460 ms. At 1.82 s, the opening fades out as an inert Projects client fades in beneath it; route replacement completes at 2.00 s. Skip immediately enters Projects. Under reduced motion, the completed J and registration frame appear without rotation or the light pass, and the handoff crossfade lasts 120 ms. The design timeline loops; the website plays once.

The design includes eased transitions for selected lobby and profile navigation. These design timings describe authored prototypes and should not be read as claims that every website route uses the same transition.

Resume Found removes its entrance motion under reduced-motion preferences. Utility and recovery screens use the shared shell and main-region focus behavior. Offline status is shown only when appropriate; no automatic retry is promised.

## Validation status

The current integration is deployed to the public staging project at `https://ce8b0f14.joshuaik2.pages.dev/` (deployment `ce8b0f14-1431-48db-99fb-3213d19f41fa`, application source `2f8ae63`). All 15 requested route URLs returned HTTP 200 with the same 574-byte SPA shell, verifying hosting fallback only. The v13 PDF returned HTTP 200 with `application/pdf`, 164,726 bytes, and the approved workspace source SHA-256 `514BA79F001794501EBDD20841F8654E2998C1CA1AEAE2E7BD1CE12D84B09299`. Visual rendering, live keyboard behavior, responsive browser behavior, reduced-motion behavior, and native PDF handling remain pending because no browser was available. No screenshots or live browser checks are claimed here.

## Journey waypoint fragments (2026-09-27)

On /profile/journey, primary and keyboard activation of a locator anchor adds its #journey-* target to browser history and scrolls to the existing 35% reading line. Valid fragments restore the active waypoint and scroll position on mount and browser back/forward. Modified and non-primary clicks keep native anchor behavior. Reduced-motion preferences retain immediate scrolling.
