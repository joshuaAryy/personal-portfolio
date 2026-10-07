import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import { MemoryRouter } from "react-router-dom";
import { act } from "react";
import { Window } from "happy-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";
import { portfolioIdentity } from "./data";

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

  it("forms the C06 J from separately staged pieces around a fast radial tick field", () => {
    const markup = renderOpeningRoute();
    const source = readFileSync("src/Opening.tsx", "utf8");
    const openingMark = readFileSync("public/media/profile/j-candidate-06-opening.svg", "utf8");

    expect(markup).toContain('data-j-source="candidate-06-3679:247"');
    expect(markup).toContain('class="opening__j-piece opening__j-piece--cap"');
    expect(markup).toContain('class="opening__j-piece opening__j-piece--shaft"');
    expect(markup).toContain('class="opening__j-piece opening__j-piece--hook"');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-cap.svg"');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-shaft.svg"');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-hook.svg"');
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

  it("keeps C06 pieces and seams separate until the joints seat, then holds the settled mark", () => {
    const markup = renderOpeningRoute();
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).not.toContain('class="opening__j-echo"');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-cap.svg"');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-shaft.svg"');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-hook.svg"');
    expect(markup).toContain('class="opening__seam opening__seam--upper"');
    expect(markup).toContain('class="opening__seam opening__seam--lower"');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-seams.svg"');
    expect(css).toMatch(/\.opening__seam--upper\s*\{[^}]*opening-seam-ignite\s+\.42s\s+ease-out\s+1\.66s/s);
    expect(css).toMatch(/\.opening__seam--lower\s*\{[^}]*opening-seam-ignite\s+\.42s\s+ease-out\s+1\.87s/s);
    expect(css).toMatch(/\.opening__orbit-spin\s*\{[^}]*animation:\s*opening-tick-spin\s+2\.8s\s+linear\s+both/s);
    expect(css).toMatch(/@keyframes opening-forge-piece\s*\{[\s\S]*?100%\s*\{\s*opacity:\s*1;\s*transform:\s*translate\(0, 0\)/);
    expect(css).toMatch(/@keyframes opening-radial-arrive\s*\{[\s\S]*?75\.7%,\s*100%\s*\{[^}]*opacity:\s*\.2;\s*transform:\s*rotate\(0deg\) scale\(1\)/);
  });

  it("keeps the orbit border still while the radial ticks spin quickly through a 3.8-second sequence", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const source = readFileSync("src/Opening.tsx", "utf8");

    expect(source).toContain("const OPENING_DURATION_MS = 3_800;");
    expect(css).toMatch(/\.opening__treatment\s*\{[^}]*animation:\s*opening-scene-exit\s+3\.8s/s);
    expect(css).toMatch(/\.opening__orbit-turn\s*\{[^}]*animation:\s*opening-tick-arrive\s+3\.8s\s+ease-out\s+both/s);
    expect(css).toMatch(/\.opening__orbit-spin\s*\{[^}]*animation:\s*opening-tick-spin\s+2\.8s\s+linear\s+both/s);
    expect(css).toMatch(/@keyframes opening-tick-spin\s*\{\s*0%\s*\{\s*transform:\s*rotate\(0deg\)\s*;\s*\}\s*100%\s*\{\s*transform:\s*rotate\(2520deg\)/);
    expect(css).toMatch(/\.opening__radial-field\s*\{[^}]*animation:\s*opening-radial-arrive\s+3\.8s/s);
    expect(css).toMatch(/repeating-conic-gradient\([\s\S]*transparent\s+0deg\s+3\.42deg,[\s\S]*rgb\(170\s+193\s+206\s*\/\s*16%\)[\s\S]*transparent\s+3\.72deg\s+4deg/s);
    expect(css).toMatch(/\.opening__j-piece\s*\{[^}]*animation:\s*opening-forge-piece\s+1\.55s/s);
    expect(css).toMatch(/\.opening__j-piece--shaft\s*\{[^}]*animation-delay:\s*\.1s/s);
    expect(css).toMatch(/\.opening__j-piece--hook\s*\{[^}]*animation-delay:\s*\.2s/s);
    expect(css).toMatch(/\.opening__j-piece--cap\s*\{[^}]*animation-delay:\s*0s/s);
    expect(css).toMatch(/\.opening__seam--upper\s*\{[^}]*opening-seam-ignite\s+\.42s\s+ease-out\s+1\.66s/s);
    expect(css).toMatch(/\.opening__seam--lower\s*\{[^}]*opening-seam-ignite\s+\.42s\s+ease-out\s+1\.87s/s);
    expect(css).toMatch(/\.opening__j-material-highlight\s*\{[^}]*opening-material-highlight\s+\.58s\s+ease-in-out\s+1\.88s/s);
    expect(css).toMatch(/--forge-start-y:\s*-22px/);
    expect(css).toMatch(/--forge-start-y:\s*22px/);
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
    expect(markup).toContain('/media/opening/j-candidate-06-opening-unlit.svg');
    expect(markup).toContain('/media/opening/j-candidate-06-opening-seams.svg');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-cap.svg"');
    expect(source).toContain("portfolioIdentity.mark");
    expect(source).not.toContain("j-candidate-06-settled.svg");
    expect(settled.replace(/\r\n/g, "\n")).toBe(transparentIdentity.replace(/\r\n/g, "\n"));
    expect(formation).toContain('id="seam-light"');
    expect(settled).toContain('id="seam-light"');
    expect(readFileSync("src/opening.css", "utf8")).toMatch(/mask-image:\s*var\(--opening-mark-source\)/);
  });

  it("renders a resolved C06 mark with motion disabled for reduced motion", () => {
    const markup = renderOpeningRoute(true);
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).toContain('class="opening-route opening-route--reduced"');
    expect(markup).toContain('class="opening opening--reduced"');
    expect(css).toMatch(/\.opening--reduced\s+\.opening__j-piece\s*\{[^}]*opacity:\s*1/);
    const reducedRules = css.slice(css.indexOf(".opening--reduced .opening__treatment"));
    expect(reducedRules).toContain(".opening--reduced .opening__orbit-turn");
    expect(reducedRules).toContain(".opening--reduced .opening__orbit-spin");
    expect(reducedRules).toContain(".opening--reduced .opening__peripheral-lines");
    expect(reducedRules).toMatch(/animation:\s*none/);
  });

  it("keeps the resolved C06 visible during the reduced-motion handoff", async () => {
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
