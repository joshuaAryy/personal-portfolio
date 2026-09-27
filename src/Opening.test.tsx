import { renderToStaticMarkup } from "react-dom/server";
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
  it("keeps the Projects client beneath the inaccessible opening treatment", () => {
    const markup = renderOpeningRoute();

    expect(markup).toContain('class="opening__underlay"');
    expect(markup).toContain('aria-hidden="true" inert=""');
    expect(markup).toContain("PROJECTS · FEATURED");
    expect(markup).toContain('class="opening__skip"');
  });

  it("renders the 532-pixel registration circle and its four cardinal ticks", () => {
    const markup = renderOpeningRoute();

    expect(markup).toContain('class="opening__registration"');
    expect(markup).toContain('viewBox="0 0 532 532"');
    expect(markup).toContain('stroke="#B38F52"');
    expect(markup).toContain('stroke-opacity="0.35"');
    expect(markup.match(/class="opening__tick"/g)).toHaveLength(4);
  });

  it("selects the reduced-motion state before the opening is rendered", () => {
    const markup = renderOpeningRoute(true);

    expect(markup).toContain('class="opening-route opening-route--reduced"');
    expect(markup).toContain('class="opening opening--reduced"');
  });
});
