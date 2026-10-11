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
    expect(css).toMatch(/opening-j-crown-approach 1\.93s cubic-bezier\(\.22, \.70, \.20, 1\) 650ms 1 both/);
    expect(css).toMatch(/opening-j-shaft-approach 1\.88s cubic-bezier\(\.22, \.70, \.20, 1\) 700ms 1 both/);
    expect(css).toMatch(/opening-j-hook-approach 1\.86s cubic-bezier\(\.22, \.70, \.20, 1\) 720ms 1 both/);
    expect(css).toMatch(/@keyframes opening-j-crown-approach[\s\S]*?37\.3%\s*\{\s*transform:\s*translate\(-\.45%, -\.35%\) rotate\(-\.35deg\);/);
    expect(css).toMatch(/@keyframes opening-j-shaft-approach[\s\S]*?35\.6%\s*\{\s*transform:\s*translate\(\.2%, \.15%\) rotate\(\.1deg\);/);
    expect(css).toMatch(/@keyframes opening-j-hook-approach[\s\S]*?34\.9%\s*\{\s*transform:\s*translate\(-\.4%, \.35%\) rotate\(\.3deg\);/);
    expect(css).toMatch(/@keyframes opening-j-fragment-opacity[\s\S]*?8%\s*\{\s*opacity:\s*0;[\s\S]*?13%\s*\{\s*opacity:\s*\.72;[\s\S]*?51\.6%, 64%\s*\{\s*opacity:\s*1;[\s\S]*?72%, 100%\s*\{\s*opacity:\s*0;/);
    expect(css).toMatch(/@keyframes opening-j-fused-reveal\s*\{[\s\S]*?0%, 64%\s*\{\s*opacity:\s*0;\s*\}[\s\S]*?72%, 100%\s*\{\s*opacity:\s*1;/);
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
    expect(css).toMatch(/\.opening__j-pulse-spark-art\s*\{[^}]*mix-blend-mode:\s*screen;/s);
    expect(source.indexOf('data-j-layer="portal-plasma-vignette"')).toBeLessThan(source.indexOf('data-j-layer="activation-bloom"'));
    expect(source.indexOf('data-j-layer="activation-bloom"')).toBeLessThan(source.indexOf('data-j-layer="gold-orb-ring"'));
    expect(source.indexOf('data-j-layer="gold-orb-ring"')).toBeLessThan(source.indexOf('data-j-layer="j-contact-shadow"'));
    expect(css).toMatch(/@keyframes opening-v8-portal-arrive\s*\{\s*0%, 7\.9%\s*\{\s*opacity:\s*0;\s*\}\s*8%\s*\{\s*opacity:\s*\.28;\s*\}\s*19\.2%\s*\{\s*opacity:\s*\.5;\s*\}\s*27\.4%\s*\{\s*opacity:\s*\.7;\s*\}\s*51\.6%\s*\{\s*opacity:\s*\.85;\s*\}\s*60%, 100%\s*\{\s*opacity:\s*1;/);
    expect(css).toMatch(/@keyframes opening-v8-ring-arrive[\s\S]*?60%, 100%\s*\{\s*opacity:\s*1;/);
    expect(css).toMatch(/@keyframes opening-v8-contact-arrive[\s\S]*?51\.6%, 100%\s*\{\s*opacity:\s*1;/);
    expect(css).toContain("opening-v8-activation-bloom");
    expect(source).not.toContain("pulse-glow.svg");
    expect(source).not.toContain("pulse-core.svg");
  });

  it("hands the assembled composition to the exact canonical lockup for the final hold", () => {
    const markup = renderOpeningRoute();
    const css = readFileSync("src/opening.css", "utf8");

    expect(markup).toContain('data-j-layer="settled-canonical-lockup"');
    expect(markup).toContain('src="/media/identity/sonnet-v8/figma-export/canonical-lockup.png"');
    expect(css).toMatch(/\.opening__j-final-lockup\s*\{[^}]*opening-v8-final-lockup 5s steps\(1, end\) 1 both/s);
    expect(css).toMatch(/\.opening__j-assembly\s*\{[^}]*opening-v8-composite-handoff 5s steps\(1, end\) 1 both/s);
    expect(css).toMatch(/@keyframes opening-v8-final-lockup[\s\S]*?0%, 81\.99%\s*\{\s*opacity:\s*0;\s*\}[\s\S]*?82%, 100%\s*\{\s*opacity:\s*1;/);
    expect(css).toMatch(/@keyframes opening-v8-composite-handoff[\s\S]*?0%, 81\.99%\s*\{\s*opacity:\s*1;\s*\}[\s\S]*?82%, 100%\s*\{\s*opacity:\s*0;/);
    expect(css).toMatch(/\.opening--reduced \.opening__j-final-lockup\s*\{[^}]*animation:\s*none;[^}]*opacity:\s*1/s);
    expect(css).toMatch(/\.opening--reduced \.opening__j-assembly\s*\{[^}]*animation:\s*none;[^}]*opacity:\s*0/s);
  });

  it("screen-composites the authored pulse artwork at the image layer to discard its dark export backing", () => {
    const markup = renderOpeningRoute();
    const css = readFileSync("src/opening.css", "utf8");
    const pulseSpark = "/media/opening/j-sonnet-motion-v8/figma-motion/pulse-spark-alpha.png";

    expect(markup).toContain('class="opening__j-pulse-spark-art"');
    expect(markup).toContain(`href="${pulseSpark}"`);
    expect(readFileSync(`public${pulseSpark}`)).toBeDefined();
    expect(markup).not.toContain("pulse-spark-2x.png");
    expect(css).toMatch(/\.opening__j-pulse-spark-art\s*\{[^}]*mix-blend-mode:\s*screen;/s);
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

  it("clips opaque Figma portal and pulse exports to their authored round shapes", () => {
    const css = readFileSync("src/opening.css", "utf8");

    expect(css).toMatch(/\.opening__orb-layer--portal\s*\{[^}]*clip-path:\s*circle\(50% at 50% 50%\)/s);
    expect(css).toMatch(/\.opening__j-pulse-spark-art\s*\{[^}]*clip-path:\s*ellipse\(/s);
  });

  it("keeps the authored join energy legible through activation and clears it before sheen", () => {
    const css = readFileSync("src/opening.css", "utf8");
    const seam = css.match(/@keyframes opening-j-seam-art\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
    const conduit = css.match(/@keyframes opening-j-conduit-art\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
    const lightExits = css.match(/@keyframes opening-j-light-exits\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

    expect(seam).toContain("62% { opacity: 1; }");
    expect(seam).toContain("68% { opacity: .75; }");
    expect(seam).toContain("74%, 100% { opacity: 0; }");
    expect(conduit).toContain("61%, 64% { opacity: 1; }");
    expect(conduit).toContain("69% { opacity: .45; }");
    expect(conduit).toContain("72%, 100% { opacity: 0; }");
    expect(lightExits).toContain("51.6% { opacity: 1;");
    expect(lightExits).toContain("60% { opacity: .7;");
    expect(lightExits).toContain("70%, 100% { opacity: 0;");
  });

  it("carries the authored activation spark along its joint path before fading", () => {
    const source = readFileSync("src/Opening.tsx", "utf8");

    expect(source).toMatch(/<animateMotion\s+dur="0\.80s"\s+begin="2\.58s"[\s\S]*?calcMode="linear"/);
    expect(source).toContain('values="1;1;0"');
    expect(source).toContain('keyTimes="0;0.87;1"');
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
    const layout = readFileSync("src/PortfolioLayout.tsx", "utf8");
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
    expect(layout).toMatch(/media="\(max-width: 760px\)"\s+srcSet=\{portfolioIdentity\.mark32\}/);
    expect(layout).toMatch(/className="rail-availability__mark-image"\s+src=\{portfolioIdentity\.mark\}/);
    expect(data).not.toContain("j-candidate-06");
  });

  it("compares the owner-requested subtle joint treatment without installing it as a live identity", () => {
    const board = readFileSync("docs/j-source-review/pass03/logo-comparison.html", "utf8");

    expect(board).toContain('data-candidate="settled-lockup"');
    expect(board).toContain('data-candidate="standalone-j"');
    expect(board).toContain('data-candidate="settled-lockup-subtle-authored-joints"');
    expect(board).toContain('src="/media/opening/j-sonnet-motion-v8/figma-motion/seam-light.svg"');
    expect(board).toContain("review-only · no live identity callsite");
    expect(board).toContain('src="captures/figma-storyboard-2026-10-11/state-3714-2092.png"');
    expect(board).toContain("State 05 · transient motion pose only");
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
