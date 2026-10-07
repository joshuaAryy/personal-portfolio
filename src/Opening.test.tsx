import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

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

  it("keeps the orbit border still while the radial ticks spin quickly through a four-second sequence", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const source = readFileSync("src/Opening.tsx", "utf8");

    expect(source).toContain("const OPENING_DURATION_MS = 4_000;");
    expect(css).toMatch(/\.opening__orbit-turn\s*\{[^}]*animation:\s*opening-tick-arrive\s+4s\s+ease-out\s+both/s);
    expect(css).toMatch(/\.opening__orbit-spin\s*\{[^}]*animation:\s*opening-tick-spin\s+\.62s\s+linear\s+\.36s\s+infinite/s);
    expect(css).toMatch(/\.opening__j-piece--cap\s*\{[^}]*animation-delay:\s*\.08s/s);
    expect(css).toMatch(/\.opening__j-piece--shaft\s*\{[^}]*animation-delay:\s*\.18s/s);
    expect(css).toMatch(/\.opening__j-piece--hook\s*\{[^}]*animation-delay:\s*\.28s/s);
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(css).toMatch(/\.opening--reduced\s+\.opening__j-piece\s*\{[^}]*animation:\s*none/s);
    expect(css).not.toMatch(/opening__loading|opening__progress/);
  });

  it("renders a resolved, ring-free Candidate 06 mark for reduced motion", () => {
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
