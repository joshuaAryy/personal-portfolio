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

describe("Sonnet V8 Opening fidelity", () => {
  it("crossfades the initial settled identity into three continuously moving Figma fragments", () => {
    const markup = renderOpeningRoute();
    const css = readFileSync("src/opening.css", "utf8");
    const source = readFileSync("src/Opening.tsx", "utf8");
    const canonicalJ = "/media/identity/sonnet-v8/figma/canonical-j.png";
    const canonicalLockup = "/media/identity/sonnet-v8/figma-export/canonical-lockup.png";

    expect(markup).toContain('data-j-rig-source="3712:2"');
    expect(markup).toContain('data-j-layer="initial-lockup"');
    expect(markup).toContain(`src="${canonicalLockup}"`);
    expect(markup.match(/data-j-piece="(?:crown|shaft|hook)"/g)).toHaveLength(3);
    expect(markup).toContain(`src="${canonicalJ}"`);
    expect(readFileSync(`public${canonicalJ}`)).toBeDefined();
    expect(readFileSync(`public${canonicalLockup}`)).toBeDefined();
    expect(markup).toContain('data-node-id="3712:518"');
    expect(markup).toContain('data-node-id="3712:224"');
    expect(markup).toContain('data-node-id="3712:371"');
    expect(css).toContain("opening-initial-lockup-clear");
    expect(css).toMatch(/opening-j-fragment-opacity 5s linear 1 both/);
    expect(css).toMatch(/opening-j-crown-approach 1\.90s cubic-bezier\(\.22, \.70, \.20, 1\) 650ms 1 both/);
    expect(css).toMatch(/opening-j-shaft-approach 1\.82s cubic-bezier\(\.22, \.70, \.20, 1\) 700ms 1 both/);
    expect(css).toMatch(/opening-j-hook-approach 1\.86s cubic-bezier\(\.22, \.70, \.20, 1\) 720ms 1 both/);
    expect(css).toMatch(/@keyframes opening-j-fragment-opacity[\s\S]*?8%\s*\{\s*opacity:\s*0;[\s\S]*?13%\s*\{\s*opacity:\s*\.72;[\s\S]*?51\.6%, 54\.8%\s*\{\s*opacity:\s*1;[\s\S]*?55\.2%, 100%\s*\{\s*opacity:\s*0;/);
    expect(css).toMatch(/@keyframes opening-j-fused-reveal\s*\{[\s\S]*?0%, 51\.6%\s*\{\s*opacity:\s*0;\s*\}[\s\S]*?54\.8%, 100%\s*\{\s*opacity:\s*1;/);
    expect(css).not.toContain("opening-j-fragment-appear");
    expect(source).not.toContain("assembly-crown.svg");
    expect(source).not.toContain("assembly-shaft.svg");
    expect(source).not.toContain("assembly-hook.svg");
  });

  it("keeps the authentic orb layers persistent and beneath the J during activation", () => {
    const markup = renderOpeningRoute();
    const css = readFileSync("src/opening.css", "utf8");
    const source = readFileSync("src/Opening.tsx", "utf8");

    expect(markup).toContain('data-j-layer="portal-plasma-vignette"');
    expect(markup).toContain('data-j-layer="gold-orb-ring"');
    expect(markup).toContain('data-j-layer="j-contact-shadow"');
    expect(markup).toContain('data-j-layer="activation-bloom"');
    expect(markup).toContain('src="/media/identity/sonnet-v8/figma-export/orb-ring-alpha-3x.png"');
    expect(markup).toContain('src="/media/identity/sonnet-v8/figma-export/j-contact-shadow-alpha-3x.png"');
    expect(css).toMatch(/\.opening__j-activation-bloom\s*\{[^}]*border-radius:\s*50%;[^}]*mix-blend-mode:\s*screen;/s);
    expect(css).toMatch(/\.opening__j-pulse-spark\s*\{[^}]*mix-blend-mode:\s*screen;/s);
    expect(source.indexOf('data-j-layer="portal-plasma-vignette"')).toBeLessThan(source.indexOf('data-j-layer="activation-bloom"'));
    expect(source.indexOf('data-j-layer="activation-bloom"')).toBeLessThan(source.indexOf('data-j-layer="gold-orb-ring"'));
    expect(source.indexOf('data-j-layer="gold-orb-ring"')).toBeLessThan(source.indexOf('data-j-layer="j-contact-shadow"'));
    expect(css).toMatch(/@keyframes opening-v8-portal-arrive[\s\S]*?67%, 100%\s*\{\s*opacity:\s*1;/);
    expect(css).toMatch(/@keyframes opening-v8-ring-arrive[\s\S]*?60%, 100%\s*\{\s*opacity:\s*1;/);
    expect(css).toMatch(/@keyframes opening-v8-contact-arrive[\s\S]*?51\.6%, 100%\s*\{\s*opacity:\s*1;/);
    expect(css).toContain("opening-v8-activation-bloom");
    expect(source).not.toContain("pulse-glow.svg");
    expect(source).not.toContain("pulse-core.svg");
  });

  it("renders the authored activation bloom without an opaque bitmap backing", () => {
    const markup = renderOpeningRoute();
    const css = readFileSync("src/opening.css", "utf8");
    const source = readFileSync("src/Opening.tsx", "utf8");

    expect(markup).toContain('class="opening__j-activation-bloom"');
    expect(markup).toContain('data-j-layer="activation-bloom"');
    expect(markup).not.toContain("orb-activation-bloom-2x.png");
    expect(source).not.toContain("activationBloom:");
    expect(css).toMatch(/\.opening__j-activation-bloom\s*\{[^}]*background:\s*radial-gradient\(\s*circle,/s);
    expect(css).toMatch(/\.opening__j-activation-bloom\s*\{[^}]*clip-path:\s*circle\(50%\s+at\s+center\)/s);
  });

  it("maps seam, conduit, exits, sheen and travelling pulse to the editable Figma rig", () => {
    const markup = renderOpeningRoute();
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).toContain('data-node-id="3712:665"');
    expect(markup).toContain('data-node-id="3712:692"');
    expect(markup).toContain('data-node-id="3712:683"');
    expect(markup).toContain('data-node-id="3712:698"');
    expect(markup).toContain('data-node-id="3712:703"');
    expect(markup).toContain('data-node-id="3712:712"');
    expect(markup).toContain('data-j-layer="join-effects"');
    expect(markup).toContain('data-j-layer="conduit"');
    expect(markup).toContain('data-j-layer="light-exits"');
    expect(markup).toContain('data-j-layer="material-sheen"');
    expect(markup).toContain("opening__j-seam-pulse-path--crown");
    expect(markup).toContain("opening__j-seam-pulse-path--hook");
    expect(markup).toContain("opening__j-conduit-pulse-path--stem");
    expect(css).toContain("opening-j-seam-crown-flow");
    expect(css).toContain("opening-j-seam-hook-flow");
    expect(css).toContain("opening-j-conduit-stem-flow");
    expect(css).toContain("opening-j-conduit-hook-flow");
    expect(css).toContain("opening-j-single-sheen");
  });

  it("lets the authored joint and conduit layers control their own activation opacity", () => {
    const css = readFileSync("src/opening.css", "utf8");

    expect(css).toMatch(/\.opening__j-lock\s*\{[^}]*opacity:\s*1;[^}]*\}/s);
    expect(css).not.toMatch(/\.opening__j-lock\s*\{[^}]*animation:\s*opening-j-seam-lock/s);
  });

  it("preserves the five-second scene, full visible tick revolution, Skip and Home handoff", () => {
    const source = readFileSync("src/Opening.tsx", "utf8");
    const css = readFileSync("src/opening.css", "utf8");

    expect(source).toContain("const OPENING_DURATION_MS = 5_000;");
    expect(css).toMatch(/\.opening__orbit-spin\s*\{[^}]*opening-tick-spin 3\.2s linear 600ms 1 both/s);
    expect(css).toMatch(/@keyframes opening-tick-spin\s*\{\s*0%\s*\{\s*transform:\s*rotate\(0deg\)/);
    expect(css).toMatch(/100%\s*\{\s*transform:\s*rotate\(360deg\)/);
    expect(css).toMatch(/\.opening-route--leaving \.opening\s*\{[^}]*opacity:\s*0/s);
    expect(css).toMatch(/prefers-reduced-motion:\s*reduce/);
    expect(css).not.toMatch(/opening__loading|opening__progress/);
    expect(source).toContain('aria-label="Skip to Home"');
  });

  it("uses the accepted large V8 lockup and compact optical glyphs for shared identity", () => {
    const data = readFileSync("src/data.ts", "utf8");
    const markup = renderToStaticMarkup(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>,
    );

    expect(data).toContain('mark: "/media/identity/sonnet-v8/figma-export/canonical-lockup.png"');
    expect(data).toContain('mark32: "/media/identity/sonnet-v8/figma-export/optical-32.png"');
    expect(data).toContain('mark16: "/media/identity/sonnet-v8/figma-export/optical-16.png"');
    expect(markup).toContain('/media/identity/sonnet-v8/figma-export/canonical-lockup.png');
    expect(markup).toContain('/media/identity/sonnet-v8/figma-export/optical-32.png');
    expect(data).not.toContain("j-candidate-06");
  });

  it("settles immediately for reduced motion and keeps the short Home handoff", async () => {
    const markup = renderOpeningRoute(true);
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).toContain('class="opening-route opening-route--reduced"');
    expect(markup).toContain('class="opening opening--reduced"');
    expect(css).toMatch(/\.opening--reduced \.opening__j-piece\s*\{[^}]*animation:\s*none;[^}]*opacity:\s*0/s);
    expect(css).toMatch(/\.opening--reduced \.opening__j-initial-lockup\s*\{[^}]*opacity:\s*0/s);
    expect(css).toMatch(/\.opening--reduced \.opening__j-settled\s*\{[^}]*animation:\s*none;[^}]*opacity:\s*1/s);
    expect(css).toMatch(/\.opening--reduced \.opening__orb-layer\s*\{[^}]*animation:\s*none;[^}]*opacity:\s*1/s);

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
    expect(container.querySelector(".opening__j-settled")).not.toBeNull();

    await act(async () => vi.advanceTimersByTime(119));
    expect(container.querySelector(".opening")).not.toBeNull();
    await act(async () => vi.advanceTimersByTime(1));
    expect(container.querySelector(".opening")).toBeNull();

    await act(async () => root.unmount());
    testWindow.close();
  });
});
