import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { portfolioIdentity } from "./data";

afterEach(() => vi.unstubAllGlobals());

function renderOpeningRoute(reducedMotion = false) {
  vi.stubGlobal("window", {
    matchMedia: () => ({ matches: reducedMotion }),
  });
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>,
  );
}

describe("opening route choreography", () => {
  it("keeps Home beneath the inaccessible opening and provides Skip", () => {
    const markup = renderOpeningRoute();

    expect(markup).toContain('class="opening__underlay"');
    expect(markup).toContain('aria-hidden="true" inert=""');
    expect(markup).toContain("Select a portfolio mode");
    expect(markup).toContain('aria-label="Skip to Home"');
  });

  it("forms the C06 J from separately staged pieces around a fast radial tick field", () => {
    const markup = renderOpeningRoute();
    const source = readFileSync("src/Opening.tsx", "utf8");
    const openingMark = readFileSync("public/media/profile/j-candidate-06-opening.svg", "utf8");

    expect(markup).toContain('data-j-source="candidate-06-3679:247"');
    expect(markup).toContain('class="opening__j-piece opening__j-piece--cap"');
    expect(markup).toContain('class="opening__j-piece opening__j-piece--shaft"');
    expect(markup).toContain('class="opening__j-piece opening__j-piece--hook"');
    expect(markup).toContain('/media/profile/j-candidate-06-opening.svg');
    expect(markup).toContain('class="opening__orbit-spin"');
    expect(markup.match(/class="opening__orbit-tick(?: opening__orbit-tick--major)?"/g)).toHaveLength(180);
    expect(markup).toContain('class="opening__radial-field"');
    expect(markup).toContain('class="opening__peripheral-lines"');
    expect(markup).not.toMatch(/LOADING|progress|open-portfolio-j-archive-source|j-sonnet-v8/);
    expect(source).not.toContain("OPENING_V8_MARK_ASSETS");
    expect(source).not.toContain("OPENING_ARCHIVE_FALLBACK_SOURCE");
    expect(openingMark).toContain('id="piece-crown-cap"');
    expect(openingMark).not.toContain('id="background"');
    expect(openingMark).not.toContain('fill="#F5F5F5"');
    expect(openingMark).not.toContain('fill="#02050A"');
  });

  it("keeps the orbit border still while the radial ticks spin quickly through a 3.5-second sequence", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const source = readFileSync("src/Opening.tsx", "utf8");

    expect(source).toContain("const OPENING_DURATION_MS = 3_500;");
    expect(css).toMatch(/\.opening__orbit-turn\s*\{[^}]*animation:\s*opening-tick-arrive\s+3\.5s\s+ease-out\s+both/s);
    expect(css).toMatch(/\.opening__orbit-spin\s*\{[^}]*animation:\s*opening-tick-spin\s+\.62s\s+linear\s+\.36s\s+infinite/s);
    expect(css).toMatch(/\.opening__radial-field\s*\{[^}]*animation:\s*opening-radial-arrive\s+3\.5s/s);
    expect(css).toMatch(/repeating-conic-gradient\([\s\S]*transparent\s+0deg\s+3\.42deg,[\s\S]*rgb\(170\s+193\s+206\s*\/\s*16%\)[\s\S]*transparent\s+3\.72deg\s+4deg/s);
    expect(css).toMatch(/\.opening__j-piece--cap\s*\{[^}]*animation-delay:\s*\.08s/s);
    expect(css).toMatch(/\.opening__j-piece--shaft\s*\{[^}]*animation-delay:\s*\.2s/s);
    expect(css).toMatch(/\.opening__j-piece--hook\s*\{[^}]*animation-delay:\s*\.32s/s);
    expect(css).toMatch(/--forge-offset-y:\s*-14px/);
    expect(css).toMatch(/--forge-offset-y:\s*14px/);
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(css).toMatch(/\.opening--reduced\s+\.opening__j-piece,[\s\S]*?\.opening--reduced\s+\.opening__j-material-highlight\s*\{\s*animation:\s*none/s);
    expect(css).not.toMatch(/opening__loading|opening__progress/);
  });

  it("uses a transparent Opening rendition of the shared C06 identity and keeps formation swappable", () => {
    const markup = renderOpeningRoute();
    const formation = readFileSync("public/media/profile/j-candidate-06-opening.svg", "utf8");
    const identity = readFileSync(`public${portfolioIdentity.mark}`, "utf8");
    const settled = readFileSync("public/media/opening/j-candidate-06-m54-opening.svg", "utf8");
    const source = readFileSync("src/Opening.tsx", "utf8");
    const transparentIdentity = identity
      .replace(/<rect width="468" height="468" fill="#F5F5F5"\/>/, "")
      .replace(/<g id="background">[\s\S]*?<\/g>/, "");

    expect(markup).toContain('class="opening__j-material-highlight"');
    expect(markup).toContain('src="/media/opening/j-candidate-06-m54-opening.svg"');
    expect(markup).toContain('/media/profile/j-candidate-06-opening.svg');
    expect(source).toContain("portfolioIdentity.mark");
    expect(source).not.toContain("j-candidate-06-settled.svg");
    expect(settled).toBe(transparentIdentity);
    expect(formation).toContain('id="seam-light"');
    expect(settled).toContain('id="seam-light"');
    expect(readFileSync("src/opening.css", "utf8")).toMatch(/mask-image:\s*var\(--opening-mark-source\)/);
  });

  it("renders a resolved C06 mark with motion disabled for reduced motion", () => {
    const markup = renderOpeningRoute(true);
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).toContain('class="opening-route opening-route--reduced"');
    expect(markup).toContain('class="opening opening--reduced"');
    expect(css).toMatch(/\.opening--reduced\s+\.opening__j-base\s*\{[^}]*opacity:\s*1/s);
    const reducedRules = css.slice(css.indexOf(".opening--reduced .opening__treatment"));
    expect(reducedRules).toContain(".opening--reduced .opening__orbit-turn");
    expect(reducedRules).toContain(".opening--reduced .opening__orbit-spin");
    expect(reducedRules).toContain(".opening--reduced .opening__peripheral-lines");
    expect(reducedRules).toMatch(/animation:\s*none/);
  });
});
