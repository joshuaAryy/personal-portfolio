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

  it("renders the complete Figma hero C06 from locally stored layer assets", () => {
    const markup = renderOpeningRoute();
    const source = readFileSync("src/Opening.tsx", "utf8");
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).toContain('data-j-source="candidate-06-3679:2"');
    expect(markup).toContain('data-node-id="3679:76"');
    expect(markup).toContain('data-node-id="3679:145"');
    expect(markup).toContain('data-node-id="3679:214"');
    expect(css).toContain('/assets/j-c06-keyed-forge/extr-deep-cap.svg');
    expect(css).toContain('/assets/j-c06-keyed-forge/extr-deep-shaft.svg');
    expect(css).toContain('/assets/j-c06-keyed-forge/extr-deep-hook.svg');
    expect(markup).toContain('class="opening__hero-backing"');
    expect(markup).toContain('src="/assets/j-c06-keyed-forge/face-cap.svg"');
    expect(markup).toContain('/assets/j-c06-keyed-forge/face-cap.svg');
    expect(markup).toContain('/assets/j-c06-keyed-forge/detail-cap.svg');
    expect(markup).toContain('/assets/j-c06-keyed-forge/bevel-cap.svg');
    expect(markup).toContain('/assets/j-c06-keyed-forge/edge-light-cap.svg');
    expect(source).not.toContain("C06_ASSEMBLY_SOURCE");
    expect(source).not.toContain("3679:247");
    expect(markup).toContain('class="opening__orbit-spin"');
    expect(markup.match(/class="opening__orbit-tick(?: opening__orbit-tick--major)?"/g)).toHaveLength(180);
    expect(markup).toContain('class="opening__radial-field"');
    expect(markup).toContain('class="opening__peripheral-lines"');
    expect(markup).not.toMatch(/LOADING|progress|open-portfolio-j-archive-source|j-sonnet-v8/);
  });

  it("seats the cap and hook over a complete subdued C06 backing", () => {
    const markup = renderOpeningRoute();
    const css = readFileSync("src/opening.css", "utf8");
    const rules = css.match(/[^{}]+\{[^{}]*\}/g) ?? [];
    const partRule = css.match(/\.opening__hero-part\s*\{([^}]*)\}/)?.[1] ?? "";
    const backingRule = css.match(/\.opening__hero-backing\s*\{([^}]*)\}/)?.[1] ?? "";
    const capRule = css.match(/\.opening__hero-part--cap\s*\{([^}]*)\}/)?.[1] ?? "";
    const shaftRule = css.match(/\.opening__hero-part--shaft\s*\{([^}]*)\}/)?.[1] ?? "";
    const hookRule = css.match(/\.opening__hero-part--hook\s*\{([^}]*)\}/)?.[1] ?? "";
    const goldRules = rules
      .filter((rule) => {
        const selector = rule.slice(0, rule.indexOf("{"));
        return selector.includes(".opening__hero-gold") && !selector.includes("opening--reduced");
      })
      .join("\n");

    expect(css).toMatch(/\.opening__hero-art\s*\{[^}]*container-type:\s*size/);
    expect(markup).toContain('class="opening__hero-part opening__hero-part--cap"');
    expect(markup).toContain('class="opening__hero-part opening__hero-part--shaft"');
    expect(markup).toContain('class="opening__hero-part opening__hero-part--hook"');
    expect(markup.indexOf('class="opening__hero-backing"')).toBeLessThan(markup.indexOf('class="opening__hero-part opening__hero-part--cap"'));
    expect(css).toMatch(/\.opening__hero-part\s*\{[^}]*position:\s*absolute;[^}]*inset:\s*0/);
    expect(partRule).not.toMatch(/animation\s*:|transform\s*:|opacity\s*:/);
    expect(backingRule).toMatch(/inset:\s*9\.19%\s+26\.5%\s+14\.48%\s+24\.76%/);
    expect(backingRule).toMatch(/z-index:\s*0/);
    expect(backingRule).toMatch(/opacity:\s*\.64/);
    expect(backingRule).toMatch(/animation:\s*opening-c06-backing-settle\s+580ms\s+linear\s+both/);
    expect(backingRule).not.toMatch(/transform\s*:/);
    expect(capRule).toMatch(/animation:\s*opening-c06-cap-seat\s+300ms\s+cubic-bezier\(\.22,\s*\.7,\s*\.3,\s*1\)\s+160ms\s+both/);
    expect(hookRule).toMatch(/animation:\s*opening-c06-hook-seat\s+300ms\s+cubic-bezier\(\.22,\s*\.7,\s*\.3,\s*1\)\s+280ms\s+both/);
    expect(capRule + hookRule).not.toMatch(/opacity\s*:|rotate\(|scale\(/);
    expect(shaftRule).toBe("");
    expect(goldRules).not.toMatch(/animation\s*:|opacity\s*:|transform\s*:/);
    expect(css).toMatch(/@keyframes\s+opening-c06-cap-seat\s*\{\s*0%\s*\{\s*transform:\s*translateY\(-3px\)\s*;\s*\}\s*100%\s*\{\s*transform:\s*translateY\(0\)\s*;/);
    expect(css).toMatch(/@keyframes\s+opening-c06-hook-seat\s*\{\s*0%\s*\{\s*transform:\s*translateY\(3px\)\s*;\s*\}\s*100%\s*\{\s*transform:\s*translateY\(0\)\s*;/);
    expect(css).toMatch(/@keyframes\s+opening-c06-backing-settle\s*\{\s*0%,\s*82\.76%\s*\{\s*opacity:\s*\.64\s*;\s*\}\s*100%\s*\{\s*opacity:\s*0\s*;/);
    expect(css).toMatch(/\.opening--reduced \.opening__hero-part\s*\{[^}]*animation:\s*none;[^}]*transform:\s*none/s);
    expect(css).toMatch(/\.opening--reduced \.opening__hero-backing\s*\{[^}]*animation:\s*none;[^}]*opacity:\s*0/s);
    expect(markup).toContain('class="opening__hero-seam opening__hero-seam--upper"');
    expect(markup).toContain('class="opening__hero-seam opening__hero-seam--lower"');
    expect(markup).toContain('/assets/j-c06-keyed-forge/seam-light.svg');
    expect(markup).toContain('class="opening__hero-seam-energy opening__hero-seam-energy--upper"');
    expect(markup).toContain('class="opening__hero-seam-energy opening__hero-seam-energy--lower"');
    expect(markup).toContain('/assets/j-c06-keyed-forge/seam-energy.svg');
    expect(markup).toContain('/assets/j-c06-keyed-forge/light-exits.svg');
    expect(markup).toContain('/assets/j-c06-keyed-forge/conduit.svg');
    expect(css).toMatch(/\.opening__hero-seam\s*\{[^}]*opacity:\s*\.58/s);
    expect(css).not.toMatch(/\.opening__hero-seam--(?:upper|lower)\s*\{[^}]*animation:/s);
    expect(css).toMatch(/\.opening__hero-seam-energy--upper\s*\{[^}]*opening-joint-energy\s+240ms\s+ease-out\s+180ms\s+both/s);
    expect(css).toMatch(/\.opening__hero-seam-energy--lower\s*\{[^}]*opening-joint-energy\s+280ms\s+ease-out\s+340ms\s+both/s);
    expect(css).toMatch(/@keyframes opening-joint-energy\s*\{[\s\S]*?0%\s*\{\s*opacity:\s*0\s*;\s*\}[\s\S]*?65%\s*\{\s*opacity:\s*\.42\s*;\s*\}[\s\S]*?100%\s*\{\s*opacity:\s*0\s*;/);
    expect(css).toMatch(/\.opening__hero-light-exits--upper\s*\{[^}]*opening-light-exit-reveal\s+240ms\s+ease-out\s+180ms\s+both/s);
    expect(css).toMatch(/\.opening__hero-light-exits--lower\s*\{[^}]*opening-light-exit-reveal\s+280ms\s+ease-out\s+340ms\s+both/s);
    expect(css).toMatch(/@keyframes opening-light-exit-reveal\s*\{[\s\S]*?0%\s*\{\s*opacity:\s*0\s*;\s*\}[\s\S]*?65%\s*\{\s*opacity:\s*1\s*;\s*\}[\s\S]*?100%\s*\{\s*opacity:\s*\.75\s*;/);
    expect(css).toMatch(/\.opening__hero-conduit\s*\{[^}]*opening-conduit-reveal\s+280ms\s+ease-out\s+340ms\s+both/s);
  });

  it("keeps the settled C06 through a three-second handoff and moves sheen inside its fixed silhouette", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const source = readFileSync("src/Opening.tsx", "utf8");

    expect(source).toContain("const OPENING_DURATION_MS = 3_000;");
    expect(css).toMatch(/\.opening\s*\{[^}]*transition:\s*opacity 160ms ease/s);
    expect(css).toMatch(/\.opening-route--leaving \.opening\s*\{[^}]*opacity:\s*0/s);
    expect(css).toMatch(/\.opening__underlay\s*\{[^}]*transition:\s*filter 160ms ease/s);
    expect(css).toMatch(/\.opening__orbit-spin\s*\{[^}]*animation:\s*opening-tick-spin 2\.84s cubic-bezier\(\.25,\s*\.1,\s*\.25,\s*1\) 1 both/s);
    expect(css).toMatch(/@keyframes opening-tick-spin\s*\{\s*0%\s*\{\s*transform:\s*rotate\(0deg\)\s*;\s*\}\s*100%\s*\{\s*transform:\s*rotate\(9deg\)/);
    expect(css).toMatch(/\.opening__radial-field\s*\{[^}]*animation:\s*opening-radial-arrive\s+2\.84s/s);
    expect(css).toMatch(/repeating-conic-gradient\([\s\S]*transparent\s+0deg\s+3\.42deg,[\s\S]*rgb\(170\s+193\s+206\s*\/\s*16%\)[\s\S]*transparent\s+3\.72deg\s+4deg/s);
    expect(css).toMatch(/\.opening__hero-sheen\s*\{[^}]*opening-material-sheen\s+410ms\s+ease-in-out\s+420ms\s+both/s);
    expect(css).toMatch(/@keyframes opening-material-sheen\s*\{[\s\S]*?20%\s*\{[^}]*opacity:\s*\.08[\s\S]*?83%\s*\{[^}]*opacity:\s*\.04[^}]*background-position:\s*100%\s+50%[\s\S]*?100%\s*\{[^}]*opacity:\s*0[\s\S]*?background-position:\s*100%\s+50%/);
    expect(css).not.toMatch(/@keyframes opening-material-sheen\s*\{[^}]*transform\s*:/s);
    expect(css).not.toMatch(/\.opening__treatment\s*\{[^}]*animation:/s);
    expect(css).toMatch(/\.opening--reduced \.opening__hero-gold\s*\{[^}]*opacity:\s*1/s);
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(css).toMatch(/\.opening--reduced \.opening__hero-seam,[\s\S]*?\.opening--reduced \.opening__hero-sheen\s*\{\s*animation:\s*none/s);
    expect(css).toMatch(/\.opening--reduced \.opening__hero-seam\s*\{[^}]*opacity:\s*\.58/s);
    expect(css).toMatch(/\.opening--reduced \.opening__hero-seam-energy\s*\{[^}]*opacity:\s*0/s);
    expect(css).toMatch(/\.opening--reduced \.opening__radial-field\s*\{[^}]*opacity:\s*0/s);
    expect(css).toMatch(/\.opening--reduced \.opening__peripheral-lines\s*\{[^}]*opacity:\s*0/s);
    expect(css).toMatch(/\.opening--reduced \.opening__ring\s*\{[^}]*opacity:\s*0/s);
    expect(css).toMatch(/\.opening--reduced \.opening__orbit-turn\s*\{[^}]*opacity:\s*0/s);
    expect(css).toMatch(/\.opening--reduced \.opening__peripheral-mark\s*\{[^}]*opacity:\s*0/s);
    expect(css).not.toMatch(/opening__loading|opening__progress/);
  });

  it("renders a motionless authored C06 immediately for reduced motion", () => {
    const markup = renderOpeningRoute(true);
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).toContain('class="opening-route opening-route--reduced"');
    expect(markup).toContain('class="opening opening--reduced"');
    expect(markup).toContain('data-j-source="candidate-06-3679:2"');
    expect(css).toMatch(/\.opening--reduced\s+\.opening__hero-gold\s*\{[^}]*opacity:\s*1/);
    const reducedRules = css.slice(css.indexOf(".opening--reduced .opening__treatment"));
    expect(reducedRules).toContain(".opening--reduced .opening__orbit-turn");
    expect(reducedRules).toContain(".opening--reduced .opening__orbit-spin");
    expect(reducedRules).toContain(".opening--reduced .opening__peripheral-lines");
    expect(reducedRules).toContain(".opening--reduced .opening__hero-sheen");
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
