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
  it("keeps Home / Explore beneath the inaccessible opening treatment", () => {
    const markup = renderOpeningRoute();

    expect(markup).toContain('class="opening__underlay"');
    expect(markup).toContain('aria-hidden="true" inert=""');
    expect(markup).toContain("Select a portfolio mode");
    expect(markup).toContain('class="opening__skip"');
  });

  it("renders the segmented Hextech mechanism around the selected archive mark", () => {
    const markup = renderOpeningRoute();

    expect(markup).toContain('data-node-id="2443:38"');
    expect(markup).toContain('data-node-id="2443:71"');
    expect(markup).toContain('src="/media/opening/segmented-outer-bezel.svg"');
    expect(markup).toContain('src="/media/profile/open-portfolio-j-archive-source-700.png"');
    expect(markup).toContain('aria-label="Skip to Home"');
  });

  it("selects the reduced-motion state before the opening is rendered", () => {
    const markup = renderOpeningRoute(true);

    expect(markup).toContain('class="opening-route opening-route--reduced"');
    expect(markup).toContain('class="opening opening--reduced"');
  });
});
