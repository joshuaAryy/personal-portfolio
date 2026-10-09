import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { MemoryRouter } from "react-router-dom";
import { act } from "react";
import { Window } from "happy-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  vi.useRealTimers();
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

describe("opening route choreography", () => {
  it("keeps Home beneath the inaccessible opening and provides Skip", () => {
    const markup = renderOpeningRoute();

    expect(markup).toContain('class="opening__underlay"');
    expect(markup).toContain('aria-hidden="true" inert=""');
    expect(markup).toContain("Select a portfolio mode");
    expect(markup).toContain('aria-label="Skip to Home"');
  });

  it("renders the editable Sonnet v8 J layers and historical reveal structure", () => {
    const markup = renderOpeningRoute();
    const source = readFileSync("src/Opening.tsx", "utf8");
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).toContain('data-j-source="v8-sonnet-3325:191"');
    expect(markup).toContain('data-node-id="3325:336"');
    expect(markup).toContain('data-node-id="3325:337"');
    expect(markup).toContain('data-node-id="3325:338"');
    expect(markup).toContain('data-node-id="3325:411"');
    expect(markup).toContain('data-node-id="3325:412"');
    for (const asset of ["j-extrusion-deep.svg", "j-extrusion-mid.svg", "j-face.svg", "j-detail-mask.svg", "j-detail.svg", "j-bevel.svg", "j-edge-light.svg"]) {
      expect(markup).toContain(`/media/opening/j-sonnet-v8/${asset}`);
    }
    expect(source).not.toContain("C06_ASSET_ROOT");
    expect(source).not.toContain("candidate-06-3679:2");
    expect(markup.match(/class="opening__orbit-tick(?: opening__orbit-tick--major)?"/g)).toHaveLength(180);
    expect(markup).toContain('class="opening__radial-field"');
    expect(markup).toContain('class="opening__peripheral-lines"');
    expect(markup).not.toMatch(/LOADING|progress|open-portfolio-j-archive-source/);
    for (const [phase, reveal] of [["deep", 30], ["mid", 32], ["face", 43], ["detail", 51], ["bevel", 59], ["edge", 66]] as const) {
      expect(css).toContain(`opening-j-${phase}-assemble`);
      expect(css).toContain(`${reveal}%, 94%`);
    }
    expect(css).toContain("28% { opacity: .16; clip-path: inset(0 82% 0 0); }");
  });

  it("keeps the historical J layers independent and immediately complete for reduced motion", () => {
    const markup = renderOpeningRoute(true);
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).toContain('class="opening__j-layer opening__j-layer--deep"');
    expect(markup).toContain('class="opening__j-layer opening__j-layer--mid"');
    expect(markup).toContain('class="opening__j-layer opening__j-layer--face"');
    expect(markup).toContain('class="opening__j-layer opening__j-layer--bevel"');
    expect(markup).toContain('class="opening__j-layer opening__j-layer--edge"');
    expect(markup).toContain('class="opening__j-detail"');
    expect(css).toMatch(/\.opening--reduced \.opening__j-layer,[\s\S]*?\.opening--reduced \.opening__j-detail\s*\{[^}]*animation:\s*none/s);
    expect(css).toMatch(/\.opening--reduced \.opening__j-layer,[\s\S]*?\.opening--reduced \.opening__j-detail\s*\{[^}]*opacity:\s*1/s);
  });
  it("shows one complete visible tick revolution during the five-second choreography", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const source = readFileSync("src/Opening.tsx", "utf8");

    expect(source).toContain("const OPENING_DURATION_MS = 5_000;");
    expect(css).toMatch(/\.opening\s*\{[^}]*transition:\s*opacity 160ms ease/s);
    expect(css).toMatch(/\.opening-route--leaving \.opening\s*\{[^}]*opacity:\s*0/s);
    expect(css).toMatch(/\.opening__underlay\s*\{[^}]*transition:\s*filter 160ms ease/s);
    expect(css).toMatch(/\.opening__orbit-spin\s*\{[^}]*animation:\s*opening-tick-spin 3\.2s linear 600ms 1 both/s);
    expect(css).toMatch(/@keyframes opening-tick-spin\s*\{\s*0%\s*\{\s*transform:\s*rotate\(0deg\)\s*;\s*\}\s*100%\s*\{\s*transform:\s*rotate\(360deg\)/);
    expect(css).toMatch(/\.opening__radial-field\s*\{[^}]*animation-duration:\s*5s/s);
    expect(css).toMatch(/\.opening__j-layer\s*\{[^}]*animation-duration:\s*5s/s);
    expect(css).toMatch(/\.opening__j-layer--deep\s*\{[^}]*animation-name:\s*opening-j-deep-assemble/s);
    expect(css).toMatch(/\.opening__j-detail\s*\{[^}]*opening-j-detail-assemble 5s/s);
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(css).not.toMatch(/opening__loading|opening__progress/);
  });
  it("renders the complete v8 J immediately for reduced motion", () => {
    const markup = renderOpeningRoute(true);
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).toContain('class="opening-route opening-route--reduced"');
    expect(markup).toContain('class="opening opening--reduced"');
    expect(markup).toContain('data-j-source="v8-sonnet-3325:191"');
    expect(css).toMatch(/\.opening--reduced \.opening__j-layer,[\s\S]*?\.opening--reduced \.opening__j-detail\s*\{[^}]*opacity:\s*1/s);
    const reducedRules = css.slice(css.indexOf(".opening--reduced .opening__treatment"));
    expect(reducedRules).toContain(".opening--reduced .opening__orbit-turn");
    expect(reducedRules).toContain(".opening--reduced .opening__orbit-spin");
    expect(reducedRules).toContain(".opening--reduced .opening__peripheral-lines");
    expect(reducedRules).toContain(".opening--reduced .opening__j-detail");
    expect(reducedRules).toMatch(/animation:\s*none/);
  });

  it("keeps the resolved v8 J visible during the reduced-motion handoff", async () => {
    vi.useFakeTimers();
    const testWindow = new Window({ url: "http://localhost/" });
    Object.defineProperty(testWindow, "matchMedia", {
      configurable: true,
      value: () => ({ matches: true }),
    });
    Object.defineProperty(testWindow, "setTimeout", {
      configurable: true,
      value: globalThis.setTimeout.bind(globalThis),
    });
    Object.defineProperty(testWindow, "clearTimeout", {
      configurable: true,
      value: globalThis.clearTimeout.bind(globalThis),
    });
    vi.stubGlobal("window", testWindow);
    vi.stubGlobal("document", testWindow.document);
    vi.stubGlobal("navigator", testWindow.navigator);
    vi.stubGlobal("HTMLElement", testWindow.HTMLElement);
    vi.stubGlobal("Element", testWindow.Element);
    vi.stubGlobal("Node", testWindow.Node);
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    const { createRoot } = await import("react-dom/client");
    const container = testWindow.document.createElement("div");
    testWindow.document.body.appendChild(container);
    const root = createRoot(container as unknown as Element);

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>,
      );
    });

    expect(container.querySelector(".opening--reduced")).not.toBeNull();
    expect(container.querySelector(".opening-route--leaving")).toBeNull();

    await act(async () => {
      vi.advanceTimersByTime(119);
    });
    expect(container.querySelector(".opening--reduced")).not.toBeNull();

    await act(async () => {
      vi.advanceTimersByTime(1);
    });
    expect(container.querySelector(".opening")).toBeNull();

    await act(async () => root.unmount());
    testWindow.close();
  });
});
