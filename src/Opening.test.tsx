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
    expect(css).toContain("@keyframes opening-j-piece-assembly");
    expect(css).toContain("@keyframes opening-j-single-sheen");
  });

  it("uses the authored dormant-to-lock piece geometry instead of slicing the settled logo", () => {
    const css = readFileSync("src/opening.css", "utf8");
    expect(css).toContain("--forge-intermediate-x: 3.85%;");
    expect(css).toContain("--forge-intermediate-y: 3.42%;");
    expect(css).toContain("--forge-lock-x: 6.41%;");
    expect(css).toContain("--forge-lock-y: 8.12%;");
    expect(css).toContain("--forge-lock-x: -4.27%;");
    expect(css).toContain("--forge-lock-y: 1.28%;");
    expect(css).toContain("--forge-lock-x: 9.4%;");
    expect(css).toContain("--forge-lock-y: -9.83%;");
    expect(css).toContain("0% { opacity: var(--dormant-opacity); transform: translate(0, 0)");
    expect(css).toContain("64% { opacity: var(--approach-opacity); transform: translate(var(--forge-intermediate-x), var(--forge-intermediate-y))");
    expect(css).toContain("100% { opacity: 1; transform: translate(var(--forge-lock-x), var(--forge-lock-y))");
    expect(css).not.toContain("clip-path: polygon(0 0, 100% 0, 100% 37%, 0 45%)");
  });

  it("follows dormant, approach, lock, cyan activation, sheen, and settled phases", () => {
    const markup = renderOpeningRoute();
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).toContain('class="opening__j-lock"');
    expect(markup).toContain('class="opening__j-sheen"');
    expect(markup).toContain("opening-orb-activation.svg");
    expect(markup).toContain("/figma-motion/seam-light.svg");
    expect(markup).toContain("/figma-motion/conduit.svg");
    expect(markup).toContain("/figma-motion/light-exits.svg");
    expect(markup).toContain("/figma-motion/pulse-glow.svg");
    expect(markup).toContain("/figma-motion/pulse-core.svg");
    expect(css).toContain("--approach-delay: 760ms;");
    expect(css).toContain("--approach-delay: 860ms;");
    expect(css).toContain("--approach-delay: 960ms;");
    expect(css).toContain("opening-j-piece-exit 5s");
    expect(css).toContain("opening-j-piece-assembly 1.28s cubic-bezier(.18, .8, .22, 1)");
    expect(css).toContain("opening-j-orb-energy 5s ease-out 1 both");
    expect(css).toContain("opening-j-cyan-activation 5s ease-out 1 both");
    expect(css).toContain("opening-j-seam-lock 5s ease-out 1 both");
    expect(css).toContain("opening-j-single-sheen 5s linear 1 both");
    expect(css).toContain("opening-j-settled-material 5s cubic-bezier(.24, .65, .2, 1) 1 both");
    expect(css).toContain("47% { opacity: .08; filter: none; }");
    expect(css).toContain("56% { opacity: .68; filter: none; }");
    expect(css).toContain("63% { opacity: 1; filter: none; }");
    expect(css).toContain("0%, 6% { opacity: 1; transform: scale(1.12); }");
    expect(css).toContain("10% { opacity: 0; transform: scale(.84); }");
    expect(css).toContain("11% { opacity: 1; transform: scale(.76); }");
    expect(css).toContain("68%, 100% { opacity: 0; }");
    expect(css).toContain("0% { opacity: var(--dormant-opacity); transform: translate(0, 0); filter: brightness(.78); }");
  });

  it("shows the authored dormant fragments at the first visible Opening frame", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const pieceMotion = css.match(/\.opening__j-piece--cap\s*\{([^}]*)\}/s)?.[1] ?? "";
    const shaftMotion = css.match(/\.opening__j-piece--shaft\s*\{([^}]*)\}/s)?.[1] ?? "";
    const hookMotion = css.match(/\.opening__j-piece--hook\s*\{([^}]*)\}/s)?.[1] ?? "";
    const assembly = css.match(/@keyframes opening-j-piece-assembly\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

    expect(pieceMotion).toContain("--dormant-opacity: .3;");
    expect(shaftMotion).toContain("--dormant-opacity: .38;");
    expect(hookMotion).toContain("--dormant-opacity: .3;");
    expect(assembly).toContain("0% { opacity: var(--dormant-opacity);");
    expect(assembly).toContain("64% { opacity: var(--approach-opacity);");
    expect(assembly).toContain("100% { opacity: 1;");
  });

  it("uses the authored Figma joint, conduit, exits, and pulse layers", () => {
    const markup = renderOpeningRoute();
    const css = readFileSync("src/opening.css", "utf8");

    for (const node of ["3681:990", "3681:1014", "3681:1005", "3681:1063", "3681:1064"]) {
      expect(markup).toContain(`data-node-id="${node}"`);
    }
    expect(markup).toContain("opening__j-seam-pulse-path--crown");
    expect(markup).toContain("opening__j-seam-pulse-path--hook");
    expect(css).toContain("stroke-dasharray: 14 86;");
    expect(css).toContain("opening-j-seam-crown-flow 5s linear 1 both");
    expect(css).toContain("opening-j-seam-hook-flow 5s linear 1 both");
    expect(css).toContain("@keyframes opening-j-conduit-stem-flow");
    expect(css).not.toMatch(/\.opening__j-lock::before\s*\{/);
    expect(css).not.toMatch(/\.opening__j-lock::after\s*\{/);
  });

  it("keeps the joined seam energized until the settled J takes over", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const seamArt = css.match(/@keyframes opening-j-seam-art\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
    const lock = css.match(/@keyframes opening-j-seam-lock\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

    expect(seamArt).toContain("0%, 44.8% { opacity: 0; }");
    expect(seamArt).toContain("52%, 56% { opacity: .22; }");
    expect(seamArt).toContain("68%, 100% { opacity: 0; }");
    expect(lock).toContain("0%, 44.8% { opacity: 0; }");
    expect(lock).toContain("46% { opacity: .98; }");
    expect(lock).toContain("68%, 100% { opacity: 0; }");
    expect(css).toContain("100% { transform: rotate(360deg); }");
  });

  it("assembles the exported V8 crown, shaft, and hook through continuous fitted motion", () => {
    const markup = renderOpeningRoute();
    const source = readFileSync("src/Opening.tsx", "utf8");
    const css = readFileSync("src/opening.css", "utf8");

    for (const piece of ["crown", "shaft", "hook"]) {
      expect(markup).toContain(`/media/opening/j-sonnet-motion-v8/assembly-${piece}.svg`);
    }
    expect(markup).toContain('data-j-assembly="sonnet-v8-keyposes"');
    expect(css).toContain("opening-j-piece-exit 5s");
    expect(css).toContain("opening-j-cyan-activation 5s");
    expect(css).toContain("opening-j-single-sheen 5s");
    expect(css).toContain("--forge-lock-x");
    expect(css).toContain("--forge-lock-y");
    expect(css).not.toContain("clip-path: polygon(0 0, 100% 0, 100% 37%, 0 45%)");
  });

  it("keeps the activation orb transparent outside its circular artwork", () => {
    const orbSource = readFileSync("public/media/opening/j-sonnet-motion-v8/v8-orb.svg", "utf8");
    const orb = readFileSync("public/media/opening/j-sonnet-motion-v8/opening-orb-activation.svg", "utf8");
    const seamSource = readFileSync("public/media/opening/j-sonnet-motion-v8/v8-seam-layer.svg", "utf8");
    const seams = readFileSync("public/media/opening/j-sonnet-motion-v8/opening-j-seam-channels.svg", "utf8");
    const css = readFileSync("src/opening.css", "utf8");
    expect(orbSource).toContain('<rect width="312" height="312" fill="#F5F5F5"');
    expect(seamSource).toContain('<rect width="229" height="358" fill="#F5F5F5"');
    expect(orb).not.toContain('<rect width="312" height="312" fill="#F5F5F5"');
    expect(orb).not.toContain('<rect width="1452" height="468" transform="translate(-1071 -74)" fill="black"');
    expect(seams).not.toContain('<rect width="229" height="358" fill="#F5F5F5"');
    expect(seams).not.toContain('<rect width="468" height="468" transform="translate(-115.874 -43)" fill="#03060A"');
    expect(css).toMatch(/\.opening__j-orb\s*\{[^}]*overflow:\s*hidden;[^}]*border-radius:\s*50%;/s);
    expect(css).toMatch(/\.opening__j-seam-light\s*\{[^}]*mask-image:\s*url\("\/media\/opening\/j-sonnet-v8\/j-face\.svg"\)/s);
    expect(css).toContain(".opening__j-seam-light > img");
    expect(css).toMatch(/\.opening__j-pulse-glow\s*\{[^}]*animation:\s*opening-j-pulse-glow 5s/s);
    expect(css).toContain("@keyframes opening-j-seam-crown-flow");
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
    expect(css).toMatch(/\.opening__j-piece-art\s*\{[^}]*opening-j-piece-assembly 1\.28s/s);
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
