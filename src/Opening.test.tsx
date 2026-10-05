import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

afterEach(() => {
  vi.unstubAllGlobals();
});

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

describe("opening route handoff", () => {
  it("keeps Home / Explore beneath the inaccessible opening treatment", () => {
    const markup = renderOpeningRoute();

    expect(markup).toContain('class="opening__underlay"');
    expect(markup).toContain('aria-hidden="true" inert=""');
    expect(markup).toContain("Select a portfolio mode");
    expect(markup).toContain('class="opening__skip"');
  });

  it("renders the archive mark with a fine native ring treatment", () => {
    const markup = renderOpeningRoute();

    expect(markup).toContain('data-node-id="3580:2"');
    expect(markup).toContain('data-node-id="3581:2"');
    expect(markup).toContain('src="/media/profile/open-portfolio-j-archive-source-700.png"');
    expect(markup).toContain('class="opening__ring opening__ring--outer"');
    expect(markup).toContain('class="opening__ring opening__ring--inner"');
    expect(markup).toContain('class="opening__ring-arc"');
    expect(markup).not.toContain('class="opening__environment"');
    expect(markup).not.toContain('open-portfolio-energy-lines.svg');
    expect(markup).not.toContain('class="opening__progress"');
    expect(markup).toContain("LOADING");
    expect(markup).toContain('class="opening__progress-line"');
    expect(markup).toContain('data-node-id="159:2"');
    expect(markup).not.toContain("segmented-outer-bezel");
    expect(markup).toContain('aria-label="Skip to Home"');
  });

  it("selects the reduced-motion state before the opening is rendered", () => {
    const markup = renderOpeningRoute(true);

    expect(markup).toContain('class="opening-route opening-route--reduced"');
    expect(markup).toContain('class="opening opening--reduced"');
  });

  it("keeps the circular marks fine and scales the archive medallion to Figma", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const outerRing = css.match(/\.opening__ring--outer,\s*\.opening__ring-arc\s*\{([^}]*)\}/)?.[1] ?? "";
    const ring = css.match(/\.opening__ring\s*\{([^}]*)\}/)?.[1] ?? "";
    const innerRing = css.match(/\.opening__ring--inner\s*\{([^}]*)\}/)?.[1] ?? "";
    const markRules = [...css.matchAll(/\.opening__archive-mark\s*\{([^}]*)\}/g)].map((match) => match[1]);
    const mark = markRules.find((rule) => /width:\s*42%/.test(rule)) ?? "";

    expect(outerRing).toMatch(/width:\s*74%/);
    expect(ring).toMatch(/border:\s*1px solid/);
    expect(innerRing).toMatch(/width:\s*67%/);
    expect(css).toMatch(/\.opening__ring-arc\s*\{[^}]*border-top-color:\s*#c5a252/);
    expect(css).toMatch(/\.opening__ring-arc\s*\{[^}]*clip-path:\s*inset\(0 0 50% 50%\)/);
    expect(mark).toMatch(/width:\s*42%/);
  });

  it("forms the J quickly and removes that motion for reduced-motion visitors", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const markRules = [...css.matchAll(/\.opening__archive-mark\s*\{([^}]*)\}/g)].map((match) => match[1]);
    const markMotion = markRules.find((rule) => /animation:\s*opening-mark-form/.test(rule)) ?? "";

    expect(markMotion).toMatch(/animation:\s*opening-mark-form\s+420ms/);
    expect(css).toMatch(
      /\.opening-route--reduced \.opening__archive-mark\s*\{[^}]*animation:\s*none/s,
    );
  });
});
