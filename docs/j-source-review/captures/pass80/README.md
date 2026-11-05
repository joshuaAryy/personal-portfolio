# Pass80 - archive-traced uneven orbit

Pass80 is a local, flat macro study. It keeps the archive-proportioned J silhouette used in Pass79 and replaces Pass79's uniform ellipse with two hand-traced archive contours: an uneven outer rim and a nested inset orb field. The J is drawn last, covering both at the crown and lower hook where the source mark overlaps its orbit. The ring varies in contour and weight through the trace; no filaments, material shading, or texture are used.

The board compares archive `159:2`, Pass16, Pass78, Pass79, Pass80, and current `1950:6` at the same 468px frame, followed by native 54px / 32px composites and a ring-free 16px glyph next to the separate control.

## Readout

The orbit path is visibly less geometric than Pass79 and its lower-left contour intersects the J bowl more like the source. The 468px mark has a stronger J/orbit overlap, but the complete rim still reads as a badge when the fields are flat. At 54/32px the J remains recognizable and the enclosing orbit becomes the dominant surround. Independent critique: Pass80 does not improve identity; the relationship still reads as a J inside an enclosing badge. Archive `159:2` remains the strongest complete mark. Stop orbit variants and use the archive itself as the design base; if an editable reconstruction is needed, trace its complete J/orbit relationship faithfully. Pass80 is exploratory, unapproved, and not canonical.

## Bundle contents

- `pass80-source.svg`: full flat trace.
- `pass80-orbit-outer.svg` and `pass80-orb-field.svg`: independent contour sources.
- `pass80-j-only.svg`: ring-free J silhouette.
- `pass80-whole-468.svg`, `pass80-whole-54.svg`, `pass80-whole-32.svg`, `pass80-ringless-16.svg`: sized SVG proofs.
- `pass80-comparison.png` and `pass80-comparison.html`: contact sheet and inspectable board.
- `pass80-468-native.png`, `pass80-54-native.png`, `pass80-32-native.png`, `pass80-j-16-native.png`: rendered candidate captures.
- `references/`: self-contained read-only copies of archive, current, Pass16, Pass78, Pass79 and the separate 16px control.
- `generate-pass80.cjs`, `render-pass80.ps1`, `render-board-pass80.ps1`, `hash-pass80.cjs`: local generation and hashing tools.

The renderer/generator use only files under this Pass80 folder. `SHA256SUMS.txt` lists the complete bundle with paths relative to this folder.
