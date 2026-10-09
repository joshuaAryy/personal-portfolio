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

  it("renders the approved v8 layer family in settled and cap/shaft/hook assembly states", () => {
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
    expect(markup).toContain('class="opening__j-settled" data-j-layer-set="sonnet-v8-approved"');
    for (const piece of ["cap", "shaft", "hook"]) {
      expect(markup).toContain(`class="opening__j-piece opening__j-piece--${piece}" data-j-piece="${piece}"`);
    }
    expect(markup.match(/data-j-piece="(?:cap|shaft|hook)"/g)).toHaveLength(3);
    expect(css).toContain("@keyframes opening-j-settled-material");
    expect(css).toContain("@keyframes opening-j-piece-approach");
    expect(css).toContain("@keyframes opening-j-sheen-sweep");
  });

  it("moves the clipped v8 material pieces into one unchanged settled silhouette", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const settled = css.slice(css.indexOf("@keyframes opening-j-settled-material"), css.indexOf("@keyframes opening-j-piece-approach"));
    const assembly = css.slice(css.indexOf("@keyframes opening-j-piece-approach"), css.indexOf("@keyframes opening-v8-material-reveal"));

    expect(css).toContain("clip-path: polygon(0 0, 100% 0, 100% 37%, 0 45%);");
    expect(css).toContain("clip-path: polygon(0 31%, 100% 24%, 100% 80%, 0 77%);");
    expect(css).toContain("clip-path: polygon(0 73%, 100% 76%, 100% 100%, 0 100%);");
    expect(css).toContain("--approach-delay: 880ms;");
    expect(css).toContain("--approach-delay: 960ms;");
    expect(assembly).toContain("from { transform: translate(var(--forge-offset-x), var(--forge-offset-y)); }");
    expect(css).toContain("opening-j-piece-approach calc(1650ms - var(--approach-delay)) cubic-bezier(.18, .8, .22, 1)");
    expect(assembly).toContain("to { transform: translate(0, 0); }");
    expect(settled).toContain("80%, 94% { opacity: 1; filter: none; }");
    expect(settled).not.toContain("transform:");
  });

  it("follows the Sol assembly phases with scaled travel and staggered v8 material reveals", () => {
    const markup = renderOpeningRoute();
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).toContain('class="opening__j-lock"');
    expect(markup).toContain('class="opening__j-sheen"');
    expect(css).toContain("--approach-delay: 800ms;");
    expect(css).toContain("--approach-delay: 880ms;");
    expect(css).toContain("--approach-delay: 960ms;");
    expect(css).toContain("--forge-offset-y: -3%;");
    expect(css).toContain("--forge-offset-x: 3%;");
    expect(css).toContain("calc(1650ms - var(--approach-delay))");
    expect(css).toContain("opening-j-piece-visibility 5s");
    expect(css).toContain("opening-v8-material-reveal 420ms ease-out 550ms");
    expect(css).toContain("opening-v8-material-reveal 420ms ease-out 650ms");
    expect(css).toContain("opening-v8-material-reveal 400ms ease-out 800ms");
    expect(css).toContain("opening-v8-material-reveal 350ms ease-out 950ms");
    expect(css).toContain("opening-v8-material-reveal 300ms ease-out 1200ms");
    expect(css).toContain("opening-v8-material-reveal 300ms ease-out 1350ms");
    expect(css).toContain("opening-j-seam-lock 350ms ease-out 1650ms");
    expect(css).toContain("opening-j-cyan-pulse 750ms ease-in-out 2000ms");
    expect(css).toContain("opening-j-sheen-sweep 800ms ease-in-out 2750ms");
    expect(css).toContain("opening-j-settled-material 5s cubic-bezier(.24, .65, .2, 1) 1 both");
    expect(css).toContain("78% { opacity: 0; filter: none; }");
    expect(css).toContain("80%, 94% { opacity: 1; filter: none; }");
    expect(css).toContain("0%, 6% { opacity: 1; transform: scale(1.12); }");
    expect(css).toContain("10% { opacity: 0; transform: scale(.84); }");
    expect(css).toContain("11% { opacity: 1; transform: scale(.76); }");
    expect(css).toContain("11%, 16% { opacity: 1; }");
    expect(css).toContain("from { opacity: .56; filter: brightness(.88); }");
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
    expect(css).toMatch(/\.opening--reduced \.opening__j-settled\s*\{[^}]*animation:\s*none;[^}]*opacity:\s*1/s);
    expect(css).toMatch(/\.opening--reduced \.opening__j-mark\s*\{[^}]*animation:\s*none/s);
    expect(css).toMatch(/\.opening--reduced \.opening__j-piece,[\s\S]*?\.opening--reduced \.opening__j-sheen\s*\{[^}]*opacity:\s*0/s);
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
    expect(css).toMatch(/\.opening__j-settled\s*\{[^}]*opening-j-settled-material 5s/s);
    expect(css).toMatch(/\.opening__j-piece-art\s*\{[^}]*opening-j-piece-approach calc\(1650ms - var\(--approach-delay\)\)/s);
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
