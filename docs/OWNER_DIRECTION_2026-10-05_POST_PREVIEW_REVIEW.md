This is the next owner-review direction after inspecting the deployed Preview `db07fba4.joshuaik2.pages.dev`.
Treat this owner feedback as authoritative where it conflicts with previous preserve/freeze decisions.

Do not broadly redesign surfaces that the owner says are working. Correct the specific problems below, render the actual site, critique the result against the references/Figma/source assets, and prepare another owner-review Preview. Production remains untouched.

## 1. Opening — needs another substantial pass

The current opening is still not matching the League opening reference closely enough.

### Timing
The ~2 second sequence feels too fast.

Change the normal opening duration toward approximately **3.5 seconds** so the sequence has enough time to be seen and felt rather than immediately transitioning away.

Do not slow it mechanically without retiming the internal animation choreography.

### Full-screen motion language
The current sequence concentrates too much on one small central circular ring over a mostly empty/black screen.

The owner-supplied League opening video is the reference.

The missing part is the **rest of the screen**:
- moving/rotating tick marks
- surrounding radial geometry
- sparse peripheral movement/details
- the sense that the entire screen is participating in the loading/formation sequence
- concentric/outer structure beyond only the small central ring

Re-study the supplied source video and the existing Figma motion reference rather than approximating it from memory.

The target should still remain elegant and controlled. Do not turn it back into an overbuilt Hextech/mechanical cinematic.

### J formation
The temporary AI/raster J image is acceptable as a temporary fallback but should not be the permanent opening solution.

One thing the owner liked in earlier versions was the J **forming/building in staggered pieces/layers**.

Once using an editable/vector J, restore that sense of the mark assembling or revealing in stages as part of the opening.

Architect the opening so the eventual final J can replace the temporary source without redesigning the whole animation.

---

## 2. Background system — major visual-quality correction

The current backgrounds are not acceptable.

### Home
Home should use the **tree/forest environment family currently associated with Projects/Experience**, not the current Home background.

This does NOT mean blindly copying whatever current compressed implementation asset is there.

Use the correct/high-quality source asset.

### Projects / Experience / Profile-family backgrounds
The environment currently looks:
- heavily blurred/downsampled
- excessively zoomed/cropped
- low-resolution
- difficult to actually see

This is especially noticeable in Projects, Experience, and Profile-related surfaces.

Find the original/source-quality image rather than stretching a degraded derivative.

Correct:
- source resolution
- crop
- scale
- positioning
- compression
- overlays/blur only where intentionally required for readability

The environment should remain visibly recognizable and atmospheric.

Do not solve this by generating a replacement background.

---

## 3. Home mode previews

The owner likes the **PROJECT AREAS** treatment under Projects.

Preserve it.

Experience, Hackathons, and Education should receive similarly useful quick previews of what the visitor is about to see.

These do not need to use identical labels or pretend everything is a "skill."

Design the content appropriately per mode:
- Projects → existing project-area treatment
- Experience → concise preview of the work/domain types represented
- Hackathons → concise preview of competition/build/award context
- Education → concise preview of degree/course/project areas

The purpose is to give each mode the same level of orientation that Projects currently has.

Do not mechanically duplicate the exact Projects copy.

---

## 4. Home utilities

LinkedIn, Resume, GitHub, and Email should all live together on the **right side**.

The current destinations work.

Improve their hierarchy:
- LinkedIn/GitHub can remain supporting utilities
- Resume should have stronger prominence than a generic utility
- Email should also receive a distinct emphasis because it is a primary contact action

Use design judgment for exact treatment while keeping the League-client visual language restrained.

---

## 5. Category lobbies

The overall lobby structure is mostly working. Preserve the good parts.

### Banners
The category/banner treatment is currently wrong.

The banner/environment treatment should visually originate from the **top** and fade/blend downward, closer to the intended Figma/League composition.

Do not make it look like a disconnected centered background panel.

### Back navigation
Restore the intended back affordance beside the category identity/icon.

The owner specifically noticed this missing in Education, but check the shared lobby structure and Figma source so this is consistently correct across applicable category lobbies.

### Circular identity fitting
Living in Silico, Stush Patties, and the owner's portrait currently look like square source images awkwardly inserted into circular medallions.

Fix the asset treatment.

The image itself must fit/crop properly inside the medallion like the accepted Figma versions.

Do not distort images.

Crest currently fits well. Preserve that behavior as a quality reference.

### Education identity
For the Computer Engineering entry, consider using the actual TMU/school identity/logo if that produces a stronger and more authentic result than the current generic engineering emblem.

Selected Coursework is currently fine.

---

## 6. Resume Found — layout was misinterpreted

Revisit the owner's saved League Match Found / Ready Check reference in Drive and the corresponding Figma/reference work.

The current composition changed the hierarchy incorrectly.

The intended broad structure is closer to:

central circular mechanism / J
↓
white text directly beneath reading
`RESUME FOUND`
↓
primary `VIEW RESUME` action using the League-like curved/trapezoidal button treatment
↓
smaller rectangular `CLOSE` action underneath

Do not place `RESUME FOUND` in a way that disrupts that vertical hierarchy.

### Background
Resume Found should not look like it exists on an isolated dark-blue/gray blank page.

It should appear **on top of the page from which it was opened**.

Keep the previous/current portfolio screen visible behind the takeover and dim/defocus it appropriately.

The takeover should feel like an event layered over the client, analogous to Match Found.

Preserve working View Resume / Close / Escape functionality.

The temporary J can remain until the identity lane resolves.

---

## 7. Profile Overview — previous owner feedback was misinterpreted

The owner did **not** request the banner/profile composition to be centered with the four signals directly underneath it.

Return to the broader layout relationship seen in the supplied/reference image identified by the owner as the **03 Champion grid-selection** reference.

The intended direction is:
- banner/profile composition remains primarily on the **left**
- the signal/icon system retains the broader accepted layout relationship
- the four lower signals are simply moved **lower down** to provide breathing room

The previous feedback was about vertical spacing, NOT changing the fundamental composition.

Re-study the reference/Figma before editing.

### Creative / Proactive / Execution
These traits should read **left-to-right horizontally**, not vertically down the page.

Their icons currently appear somewhat compressed/squished.

Restore proper aspect ratio and spacing.

The Overview should preserve the same overall visual family/layout logic as Journey while fitting the banner, identity information, traits, and signals cleanly.

Do not center/rebuild the whole page again.

---

## 8. Journey

Journey is generally working well.

PRESERVE:
- path
- milestones
- scrolling
- connector behavior
- overall environment
- existing story composition

The missing/incorrect piece is the **banner/header identity treatment**.

Restore the intended banner consistently with the Profile family.

Do not redesign the Journey body.

---

## 9. Personal Highlights — redesign the presentation and re-curate the media

The current section feels too much like photos being dumped into a gallery.

This is not the intended experience.

### External reference
Inspect this page in an actual browser:

`https://shiv-arora.netlify.app/about.html`

The owner is providing it as a reference for how personal photos can participate in a **story**, with captions/context and intentional grouping rather than as an uncaptioned image dump.

Do not copy the page literally.
Study the storytelling principle.

### Media selection
Re-review the ENTIRE owner-supplied Personal Highlights source library.

Drive:
`League Portfolio — Personal Highlights Source`

The existing asset guide explicitly identifies many high-value candidates, including social, hackathon, playful, League/gaming, urban-exploration, museum, and atmospheric images.

Previous selection appears too conservative.

NEW OWNER PRIORITY:

**Choose the best photographs first.**

Do not reject a visually strong photo merely because:
- a League username is visible
- a QR code appears somewhere
- a small background detail might be identifying
- something can reasonably be cropped or redacted

If an otherwise excellent photograph contains something that genuinely should not be public, redact, mask, crop, or retouch the sensitive detail while preserving the photograph.

Authenticity and visual/story quality matter more than selecting the safest-but-weaker image set.

Still do not expose genuinely sensitive private information.

### Storytelling
Most or all final images should have some kind of caption/context.

Captions can remain concise, but they should explain enough to turn the section into a personal story.

The section may have loose chapters/groupings if that improves the story.

It does NOT need to become rigid resume-style categories.

The goal remains:
**a personal memory/story collection inside the League-client world.**

Reconsider the seven selected images rather than assuming the current seven remain.

Use the best 7–9 or whatever number the composition genuinely needs.

---

## 10. Demos

The Demos section is currently acceptable.

Preserve it unless a shared change above requires a small adjustment.

Known source limitations remain:
- Food Tracker video/demo pending
- Cho'Veigo privacy-safe video pending
- Crest playback works

Do not invent demo media.

---

## 11. Food Tracker logo — canonical fitting bug

The Food Tracker mark is visibly cut/clipped in the Activity rail and in multiple other surfaces.

This indicates a shared/canonical asset-fitting problem rather than one isolated component.

Audit every use of the Food Tracker mark:
- Activity rail
- lobby
- Profile overlay
- Demos
- case-study navigation
- any other shared identity usage

Fix the canonical rendering so the full mark fits properly everywhere.

Do not patch each surface independently if the shared metadata/component can solve it once.

---

## 12. J identity — updated owner ranking

This is important durable owner direction.

The owner has now directly compared the current J work and currently ranks it:

1. **Sonnet v8 `3325:191` — strongest overall**
2. **Candidate 02 `3606:459` — next strongest**
3. Candidates 03 and 04 are weaker and currently lacking compared with those two

The owner specifically prefers v8's:
- silhouette
- aura/atmosphere
- ring
- overall identity quality

Do not treat Candidate 04 as inherently closer to approval merely because it is newer.

The dedicated Sonnet/J exploration may continue separately.

### Current website usage
The site is still displaying an older/weaker J in several places.

Until a future candidate clearly beats v8, treat **Sonnet v8 as the owner's preferred current design baseline**.

Where technically appropriate for this review build, replace obsolete/weaker reconstructed J usages with the strongest available v8-derived asset/treatment, particularly where doing so enables editable/staggered opening animation.

Do not declare v8 permanently final; the J lane remains open.

Do not integrate Candidate 03 or Candidate 04 simply because they are the latest numbered candidates.

---

## 13. Preserve what the owner said is working

Do not create churn.

Currently positive / broadly acceptable:
- Project Areas concept on Home
- basic Home screen structure
- overall category lobby structure
- Crest Hackathon lobby presentation
- Selected Coursework treatment
- working LinkedIn destination
- Journey body/path/scroll behavior
- Demos for the current stage
- general direction of the site outside the specific corrections above

---

## Execution approach

This is a new owner correction pass, not a reason to restart the portfolio.

1. Update durable owner-direction/status docs first so the previous misinterpretations are clearly superseded.
2. Decompose work across the existing Mingo hierarchy where useful.
3. Reuse canonical/shared systems for backgrounds, identity fitting, J usage, and project marks rather than applying page-specific hacks.
4. Inspect authentic source assets before modifying visual surfaces.
5. Render actual Chrome output at desktop and narrow widths.
6. Compare against the owner references and Figma where applicable.
7. Self-critique before declaring the correction complete.
8. Deploy a NEW feature Preview only.
9. Do not touch production.
10. Stop again at an owner-review gate and provide the new Preview URL plus a concise change ledger.

The dedicated J/Sonnet exploration may proceed independently and must not block unrelated website corrections.