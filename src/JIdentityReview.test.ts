import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("Sonnet V8 identity review and sheen", () => {
  it("renders the State 06 sheen as a transparent Figma-shaped native band", () => {
    const source = readFileSync("src/Opening.tsx", "utf8");
    const css = readFileSync("src/opening.css", "utf8");

    expect(source).toContain('className="opening__j-sheen-band"');
    expect(source).not.toContain("sheen-band-2x.png");
    expect(css).toMatch(/\.opening__j-sheen-band\s*\{[^}]*clip-path:\s*polygon\(40% 0%, 100% 0%, 60% 100%, 0% 100%\)/s);
    expect(css).toMatch(/\.opening__j-sheen-band\s*\{[^}]*background:\s*linear-gradient\(\s*90deg,/s);
  });

  it("compares only the two owner-approved static treatments and keeps State 05 motion-only", () => {
    const board = readFileSync("docs/j-source-review/pass03/logo-comparison.html", "utf8");

    expect(board).toContain('data-candidate="settled-lockup"');
    expect(board).toContain('data-candidate="standalone-j"');
    expect(board.match(/data-candidate=/g)).toHaveLength(2);
    expect(board).not.toContain('data-candidate="settled-lockup-cyan-joints"');
    expect(board).not.toContain('src="/media/opening/j-sonnet-motion-v8/figma-motion/seam-light.svg"');
    expect(board).not.toContain("Variant 02 · settled J + V8 orb with subtle cyan joints");
    expect(board).toContain("Variant 02 · painted seam overlay is rejected");
    expect(board).toContain('src="captures/figma-storyboard-2026-10-11/state-3714-2092.png"');
    expect(board).toContain("State 05 · transient motion pose only");
    expect(board).toContain("Crown, shaft, and hook are physically separated in this transient activation state");
    expect(board).toContain("/media/identity/sonnet-v8/figma/canonical-j.png");
    expect(board).toContain("Variant 01 · settled J + V8 orb");
    expect(board).toContain("Variant 03 · settled standalone J");
    expect(board).toContain("54px · desktop header");
    expect(board).toContain("54px · large standalone comparison");
    expect(board).toContain("48px · main Activity identity");
    expect(board).toContain("40px · opportunity rail");
    expect(board).toContain("Review status:");
    expect(board).toContain("Variant 02 · painted seam overlay is rejected and excluded from the current static comparison");
    expect(board).toContain('src="/media/identity/sonnet-v8/figma-export/optical-54.png"');
    expect(readFileSync("public/media/identity/sonnet-v8/figma-export/optical-54.png")).toBeDefined();
  });
});
