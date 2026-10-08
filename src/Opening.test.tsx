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

  it("seats contained cap and hook overlays over a complete C06 backing", () => {
    const markup = renderOpeningRoute();
    const css = readFileSync("src/opening.css", "utf8");
    const backingRule = css.match(/\.opening__j-backing\s*\{([^}]*)\}/)?.[1] ?? "";
    const capRule = css.match(/\.opening__j-piece--cap\s*\{([^}]*)\}/)?.[1] ?? "";
    const shaftRule = css.match(/\.opening__j-piece--shaft\s*\{([^}]*)\}/)?.[1] ?? "";
    const capImageRule = css.match(/\.opening__j-piece--cap img\s*\{([^}]*)\}/)?.[1] ?? "";
    const hookImageRule = css.match(/\.opening__j-piece--hook img\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(markup).not.toContain('class="opening__j-echo"');
    expect(markup).toContain('class="opening__j-backing"');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-cap.svg"');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-shaft.svg"');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-hook.svg"');
    expect(backingRule).toMatch(/background-image:\s*var\(--opening-mark-source\)/);
    expect(backingRule).toMatch(/opacity:\s*1;[\s\S]*animation:\s*none/);
    expect(markup).toContain('class="opening__seam opening__seam--upper"');
    expect(markup).toContain('class="opening__seam opening__seam--lower"');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-seams.svg"');
    expect(capRule).toMatch(/mask-image:\s*url\("\/media\/opening\/j-candidate-06-opening-cap\.svg"\)/);
    expect(css).toContain('mask-image: url("/media/opening/j-candidate-06-opening-hook.svg")');
    expect(capImageRule).toMatch(/animation:\s*opening-c06-seat\s+440ms\s+cubic-bezier\(\.22,\s*\.7,\s*\.3,\s*1\)\s+160ms\s+both/);
    expect(capImageRule).toMatch(/--forge-start-y:\s*-\.45%/);
    expect(shaftRule).toMatch(/animation:\s*none/);
    expect(shaftRule).toMatch(/transform:\s*none/);
    expect(shaftRule).toMatch(/opacity:\s*1/);
    expect(hookImageRule).toMatch(/animation:\s*opening-c06-seat\s+520ms\s+cubic-bezier\(\.22,\s*\.7,\s*\.3,\s*1\)\s+300ms\s+both/);
    expect(hookImageRule).toMatch(/--forge-start-y:\s*\.45%/);
    expect(css).toMatch(/@keyframes opening-c06-seat\s*\{[\s\S]*?from\s*\{\s*transform:\s*translateY\(var\(--forge-start-y\)\);\s*\}\s*to\s*\{\s*transform:\s*translateY\(0\);\s*\}/);
    expect(css).toMatch(/\.opening__seam--upper\s*\{[^}]*opening-seam-ignite\s+180ms\s+cubic-bezier\(\.22,\s*\.7,\s*\.3,\s*1\)\s+600ms\s+both/s);
    expect(css).toMatch(/\.opening__seam--lower\s*\{[^}]*opening-seam-ignite\s+180ms\s+cubic-bezier\(\.22,\s*\.7,\s*\.3,\s*1\)\s+820ms\s+both/s);
    expect(css).toMatch(/@keyframes opening-seam-ignite\s*\{\s*from\s*\{\s*opacity:\s*0\s*;\s*\}\s*to\s*\{\s*opacity:\s*\.72\s*;\s*\}/);
    expect(css).toMatch(/@keyframes opening-radial-arrive\s*\{[\s\S]*?69\.7%,\s*100%\s*\{[^}]*opacity:\s*\.2;\s*transform:\s*rotate\(0deg\) scale\(1\)/);
  });

  it("keeps the C06 settled through a short hold and a unified three-second handoff", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const source = readFileSync("src/Opening.tsx", "utf8");

    expect(source).toContain("const OPENING_DURATION_MS = 3_000;");
    expect(css).toMatch(/\.opening\s*\{[^}]*transition:\s*opacity 160ms ease/s);
    expect(css).toMatch(/\.opening-route--leaving \.opening\s*\{[^}]*opacity:\s*0/s);
    expect(css).toMatch(/\.opening__underlay\s*\{[^}]*transition:\s*filter 160ms ease/s);
    expect(css).toMatch(/\.opening__orbit-spin\s*\{[^}]*animation:\s*opening-tick-spin 2\.84s cubic-bezier\(\.25,\s*\.1,\s*\.25,\s*1\) 1 both/s);
    expect(css).toMatch(/@keyframes opening-tick-spin\s*\{\s*0%\s*\{\s*transform:\s*rotate\(0deg\)\s*;\s*\}\s*100%\s*\{\s*transform:\s*rotate\(18deg\)/);
    expect(css).toMatch(/\.opening__radial-field\s*\{[^}]*animation:\s*opening-radial-arrive\s+2\.84s/s);
    expect(css).toMatch(/repeating-conic-gradient\([\s\S]*transparent\s+0deg\s+3\.42deg,[\s\S]*rgb\(170\s+193\s+206\s*\/\s*16%\)[\s\S]*transparent\s+3\.72deg\s+4deg/s);
    expect(css).toMatch(/\.opening__j-material-highlight\s*\{[^}]*opening-material-highlight\s+420ms\s+cubic-bezier\(\.22,\s*\.7,\s*\.3,\s*1\)\s+1120ms\s+both/s);
    expect(css).toMatch(/@keyframes opening-material-highlight\s*\{[\s\S]*?100%\s*\{\s*opacity:\s*0\s*;/);
    expect(css).not.toMatch(/\.opening__treatment\s*\{[^}]*animation:/s);
    expect(css).toMatch(/\.opening--reduced \.opening__j-backing\s*\{[^}]*animation:\s*none/s);
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(css).toMatch(/\.opening--reduced \.opening__j-piece img,[\s\S]*?\.opening--reduced \.opening__j-material-highlight\s*\{\s*animation:\s*none/s);
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
    expect(markup).toContain('/media/opening/j-candidate-06-m54-opening.svg');
    expect(markup).not.toContain('/media/opening/j-candidate-06-opening-unlit.svg');
    expect(markup).toContain('/media/opening/j-candidate-06-opening-seams.svg');
    expect(markup).toContain('src="/media/opening/j-candidate-06-opening-cap.svg"');
    expect(source).toContain("portfolioIdentity.mark");
    expect(source).toContain('const C06_SETTLED_SOURCE = "/media/opening/j-candidate-06-m54-opening.svg";');
    expect(source).not.toContain("j-candidate-06-settled.svg");
    expect(settled.replace(/\r\n/g, "\n")).toBe(transparentIdentity.replace(/\r\n/g, "\n"));
    expect(formation).toContain('id="seam-light"');
    expect(settled).toContain('id="seam-light"');
    expect(readFileSync("src/opening.css", "utf8")).toMatch(/mask-image:\s*var\(--opening-mark-source\)/);
    expect(readFileSync("src/opening.css", "utf8")).toMatch(/\.opening__j-backing\s*\{[^}]*opacity:\s*1;[^}]*animation:\s*none;/s);
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
