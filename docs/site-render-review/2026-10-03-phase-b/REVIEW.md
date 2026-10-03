# Phase B — Journey background and Education skeleton

Source: the Phase B source changes committed with this review, based on `5211c26`. Actual Chrome 153.0.8010.53 through existing Playwright, local Vite `http://127.0.0.1:4175`, 1920×1080. These captures are current working-source evidence, not deployed staging. No page errors. Both Education CTA links exist and navigate to `/education/projects`.

Journey live Figma read: upper `1287:8` x0/y82, 1560×998; lower `3492:2` x0/y1080, 1560×924, same image, opacity .78; fade `1976:45` x0/y82, 1560×1922. Reused tracked Void image; no asset promotion. Cards, content, timeline and rails preserved. Decorative field now lives outside the clipped center scroller, aligned to route origin; existing scroll event updates its translation. Timeline/content retains 1840px extent independently of the 1922px background.

Independent QA caught and rejected the first placement inside the clipped scrollport and its extra 82px scroll tail; both corrected before this commit. Actual browser bounds after correction: main/layout/field y82; scroller y164, height878, scrollHeight1857. Background visibly continues through the lower final card. Captures visually inspected by Mingo against the current Figma background direction. This accepts the bounded continuity correction; whole-Journey visual parity and owner acceptance remain open.

Education is a restrained functional skeleton with TMU, Computer Engineering, Software Specialization, Expected 2028, and four requested project headings. Dental is current/in progress. No awards, invented UI, or unverified detailed claims. Original Quartus artifacts are located; Dental/Bookstore/CMOS artifacts remain to locate. No Education Figma frame was authored in this checkpoint; subject-specific evidence/copy and design remain open.

Verification after correction: builder red→green route/background contracts; independent source QA clear; root full suite 21 files / 85 tests passes; root TypeScript/Vite build passes with 79 modules. No Figma writes in this phase.

- [Journey top](journey-top.png)
- [Journey bottom](journey-bottom.png)
- [Education skeleton](education-projects.png)
- [Interaction metadata](evidence.json)
