// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import Lobby, { type LobbyMode } from "./Lobby";

Object.defineProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT", {
  configurable: true,
  value: true,
});

let host: HTMLDivElement | undefined;
let root: ReturnType<typeof createRoot> | undefined;

function CurrentPath() {
  const location = useLocation();
  return <output aria-label="Current path">{location.pathname}</output>;
}

function renderProjectsLobby(mode: LobbyMode = "projects") {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  act(() => {
    root?.render(
      <MemoryRouter initialEntries={["/projects"]}>
        <Lobby mode={mode} />
        <CurrentPath />
      </MemoryRouter>,
    );
  });
  return host;
}

function click(element: Element) {
  act(() => {
    element.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
  });
}

afterEach(() => {
  if (root) act(() => root?.unmount());
  host?.remove();
  root = undefined;
  host = undefined;
});

describe("lobby banner environment", () => {
  it("uses the Figma top-origin image, separate veil, and lower bar shade layers", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const environment = css.match(/\.league-lobby__environment\s*\{([^}]*)\}/)?.[1] ?? "";
    const imageLayer = css.match(/\.league-lobby__environment::before\s*\{([^}]*)\}/)?.[1] ?? "";
    const veilLayer = [...css.matchAll(/\.league-lobby__environment::after\s*\{([^}]*)\}/g)]
      .map((match) => match[1])
      .find((rule) => rule.includes("background-image")) ?? "";

    expect(environment).not.toMatch(/-webkit-mask-image|\bmask-image\s*:/);
    expect(imageLayer).toContain('url("/media/lobby/party-background-original.jpg")');
    expect(imageLayer).toMatch(/background-position:\s*center top/);
    expect(imageLayer).toMatch(/filter:\s*blur\(1\.1px\)/);
    expect(veilLayer.match(/linear-gradient/g)?.length).toBe(3);
    expect(veilLayer).toMatch(/rgba\(0,\s*5,\s*7,\s*0\.34\)/);
    expect(veilLayer).toMatch(/rgba\(1,\s*4,\s*6,\s*0\.36\)/);
    expect(veilLayer).toMatch(/82%/);
  });

  it("keeps the Pass06 fade on the environment behind foreground banners", () => {
    const rendered = renderProjectsLobby("experience");
    const environment = rendered.querySelector(".league-lobby__environment");
    const css = readFileSync("src/lobby.css", "utf8");
    const environmentRule = css.match(/\.league-lobby__environment\s*\{([^}]*)\}/)?.[1] ?? "";
    const environmentLayers = [...css.matchAll(/\.league-lobby__environment::after\s*\{([^}]*)\}/g)]
      .map((match) => match[1])
      .find((rule) => rule.includes("background-image")) ?? "";

    expect(environment).not.toBeNull();
    expect(rendered.querySelector(".league-lobby__top-fade")).toBeNull();
    expect(environmentRule).toMatch(/z-index:\s*-1/);
    expect(environmentLayers.match(/linear-gradient/g)?.length).toBe(3);
    expect(environmentLayers).toMatch(/background-size:\s*min\(96\.15%,\s*1500px\) min\(13\.46cqw,\s*210px\),\s*100% 100%,\s*100% 100%/);
    expect(environmentLayers).toMatch(/background-position:\s*left top,\s*center,\s*center/);
    expect(environmentLayers).toMatch(/rgba\(1,\s*5,\s*8,\s*0\.99\) 0%[\s\S]*?rgba\(1,\s*5,\s*8,\s*0\.82\) 28%[\s\S]*?rgba\(1,\s*5,\s*8,\s*0\.36\) 62%[\s\S]*?transparent 100%/);
  });

  it("scales non-Projects cards with the Figma-proportional group at 1440 and 1920 widths", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const lobbyRule = css.match(/\.league-lobby\s*\{([^}]*)\}/)?.[1] ?? "";
    const categoryBanners = css.match(/\.league-lobby__banners:not\(\.league-lobby__banners--projects\)\s*\{([^}]*)\}/)?.[1] ?? "";
    const tallDesktop = css.match(/@media\s*\(min-height:\s*1000px\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";

    // Figma 704:2 uses 246×710px cards, 36px gaps, and an 810px group.
    // Scale that proportion against available content height (not viewport width).
    expect(lobbyRule).toMatch(/--lobby-category-group-max:\s*min\(810px,\s*calc\(\(100vh - var\(--client-header-height\)\) \* 0\.812\)\)/);
    expect(lobbyRule).toMatch(/--lobby-category-banner-ratio:\s*1\.14/);
    expect(tallDesktop).toMatch(/--lobby-category-group-max:\s*min\(810px,\s*calc\(\(100vh - var\(--client-header-height\)\) \* 0\.812\)\)/);
    expect(tallDesktop).toMatch(/--lobby-category-banner-ratio:\s*1\.14/);
    expect(categoryBanners).toMatch(/gap:\s*clamp\(24px,\s*var\(--lobby-category-gap\),\s*var\(--lobby-banner-gap-max\)\)/);
  });

  it("keeps non-Projects banners slender, centered, and tied to the historical scene framing", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const environmentRule = css.match(/\.league-lobby__environment\s*\{([^}]*)\}/)?.[1] ?? "";
    const imageLayer = css.match(/\.league-lobby__environment::before\s*\{([^}]*)\}/)?.[1] ?? "";
    const lobbyRule = css.match(/\.league-lobby\s*\{([^}]*)\}/)?.[1] ?? "";
    const categoryBanners = css.match(/\.league-lobby__banners:not\(\.league-lobby__banners--projects\)\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(lobbyRule).toMatch(/--lobby-projects-group-max:\s*max\(1240px,\s*calc\(\(100vh - 300px\) \* 1\.8\)\)/);
    expect(lobbyRule).toMatch(/--lobby-project-banner-ratio:\s*2\.2/);
    expect(lobbyRule).toMatch(/--lobby-category-group-max:\s*min\(810px,\s*calc\(\(100vh - var\(--client-header-height\)\) \* 0\.812\)\)/);
    expect(lobbyRule).toMatch(/--lobby-category-banner-top:\s*7\.5%/);
    expect(lobbyRule).toMatch(/--lobby-category-banner-ratio:\s*1\.14/);
    expect(css).toMatch(/@media\s*\(min-height:\s*1000px\)[\s\S]*?--lobby-category-group-max:\s*min\(810px,\s*calc\(\(100vh - var\(--client-header-height\)\) \* 0\.812\)\)[\s\S]*?--lobby-category-banner-ratio:\s*1\.14[\s\S]*?--lobby-category-banner-top:\s*7\.5%/);
    expect(css).toMatch(/@media\s*\(max-height:\s*760px\)[\s\S]*?--lobby-category-group-max:\s*min\(780px, calc\(\(100vh - 180px\) \* 1\.34\)\)/);
    expect(categoryBanners).not.toMatch(/top:\s*0/);
    expect(categoryBanners).toMatch(/--lobby-banner-ratio:\s*var\(--lobby-category-banner-ratio\)/);
    expect(categoryBanners).toMatch(/gap:\s*clamp\(24px,\s*var\(--lobby-category-gap\),\s*var\(--lobby-banner-gap-max\)\)/);
    expect(css).toMatch(/--lobby-category-banner-height:\s*calc\(min\(100cqw - 180px,\s*var\(--lobby-category-group-max\)\) \/ var\(--lobby-category-banner-ratio\)\)/);
    expect(css).toMatch(/\.league-lobby--experience,[\s\S]*?--lobby-balance-span:\s*1000px/);
    expect(css).toMatch(/@media\s*\(max-height:\s*760px\)[\s\S]*?\.league-lobby--experience,[\s\S]*?min-height:\s*880px/);
    expect(css).not.toMatch(/\.league-lobby--experience \.league-lobby__environment\s*\{/);
    expect(imageLayer).toMatch(/background-position:\s*center top/);
    expect(css).not.toMatch(/@media\s*\(max-height:\s*760px\)[\s\S]*?\.league-lobby__environment\s*\{[^}]*background-position:/);
    expect(css).toMatch(/\.league-lobby__balance-slots\s*\{[^}]*top:[^}]*\}/s);
  });

  it("bounds and centers both lobby banner groups with coordinated spacing", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const environmentRule = css.match(/\.league-lobby__environment\s*\{([^}]*)\}/)?.[1] ?? "";
    const imageLayer = css.match(/\.league-lobby__environment::before\s*\{([^}]*)\}/)?.[1] ?? "";
    const bannerGroup = css.match(/\.league-lobby__banners\s*\{([^}]*)\}/)?.[1] ?? "";
    const categoryBanners = css.match(/\.league-lobby__banners:not\(\.league-lobby__banners--projects\)\s*\{([^}]*)\}/)?.[1] ?? "";
    const mobileRules = css.slice(css.indexOf("@media (max-width: 900px)"));
    const mobileRulesForGroup = mobileRules.match(/\.league-lobby__heading,\s*\.league-lobby__banners,\s*\.league-role-legend,\s*\.league-selected,\s*\.league-lobby__primary-action,\s*\.league-lobby__hint\s*\{([^}]*)\}/)?.[1] ?? "";
    const mobileEnvironment = mobileRules.match(/\.league-lobby__environment\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(imageLayer).toContain('url("/media/lobby/party-background-original.jpg")');
    expect(imageLayer).toMatch(/background-position:\s*center top/);
    expect(environmentRule).not.toMatch(/-webkit-mask-image|\bmask-image\s*:/);
    expect(bannerGroup).toMatch(/width:\s*min\(calc\(100% - [^)]*\),\s*var\(--lobby-projects-group-max\)\)/);
    expect(bannerGroup).toMatch(/left:\s*50%/);
    expect(bannerGroup).toMatch(/transform:\s*translateX\(-50%\)/);
    expect(categoryBanners).toMatch(/width:\s*min\(calc\(100% - [^)]*\),\s*var\(--lobby-category-group-max\)\)/);
    expect(categoryBanners).toMatch(/grid-template-columns:\s*repeat\(3,\s*minmax\(0,\s*1fr\)\)/);
    expect(categoryBanners).toMatch(/gap:\s*clamp\(24px,\s*var\(--lobby-category-gap\),\s*var\(--lobby-banner-gap-max\)\)/);
    expect(css).not.toMatch(/@media\s*\(min-width:\s*1800px\)\s*and\s*\(min-height:\s*1000px\)\s*\{[^}]*\.league-lobby__banners--projects/);
    const balanceSlots = [...css.matchAll(/\.league-lobby__balance-slots\s*\{([^}]*)\}/g)]
      .map((match) => match[1])
      .find((rule) => rule.includes("position: absolute")) ?? "";
    expect(balanceSlots).toMatch(/top:\s*calc\(9% \+ min\(234px, calc\(18\.8679vw - 81\.13px\)\)\)/);
    expect(balanceSlots).toMatch(/left:\s*50%/);
    expect(balanceSlots).toMatch(/transform:\s*translate\(-50%, -50%\)/);
    expect(balanceSlots).toMatch(/width:\s*min\(calc\(100% - [^)]*\),\s*var\(--lobby-balance-span\)\)/);
    const categorySlotRule = css.match(/\.league-lobby--experience \.league-lobby__balance-slots[\s\S]*?\{([^}]*)\}/)?.[1] ?? "";
    expect(categorySlotRule).toMatch(/top:\s*calc\(var\(--lobby-category-banner-top\) \+ var\(--lobby-category-banner-height\) \/ 2\)/);
    expect(css).not.toMatch(/@media \(min-width: 901px\)\s*\{\s*\.league-lobby__balance-slots\s*\{/);
    expect(mobileRulesForGroup).toMatch(/position:\s*relative/);
    expect(mobileRulesForGroup).toMatch(/inset:\s*auto/);
    expect(mobileRulesForGroup).toMatch(/width:\s*100%/);
    expect(mobileRules).toMatch(/\.league-lobby__banners:not\(\.league-lobby__banners--projects\)\s*\{\s*top:\s*auto;\s*left:\s*0;\s*right:\s*0;\s*width:\s*100%;\s*transform:\s*none;/);
    expect(mobileEnvironment).toMatch(/top:\s*68px/);

    for (const mode of ["projects", "experience", "hackathons", "education"] as const) {
      const view = renderProjectsLobby(mode);
      const lobby = view.querySelector(`.league-lobby--${mode}`);
      const bannerGroup = view.querySelector(".league-lobby__banners");
      expect(lobby, `${mode} lobby`).not.toBeNull();
      expect(bannerGroup?.classList.contains("league-lobby__banners--projects"), `${mode} banner modifier`).toBe(mode === "projects");
      act(() => root?.unmount());
      host?.remove();
      root = undefined;
      host = undefined;
    }
  });

  it("uses one proportional banner size and preserves short-screen access to the full lobby", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const shellCss = readFileSync("src/styles.css", "utf8");
    const baseCategoryBanner = css.match(/\.league-lobby__banners\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(baseCategoryBanner).toMatch(/aspect-ratio:\s*var\(--lobby-banner-ratio\)/);
    expect(css).toMatch(/\.main--lobby\s*\{[^}]*overflow-y:\s*auto/s);
    expect(shellCss).toMatch(/@media\s*\(max-height:\s*760px\)\s*and\s*\(min-width:\s*901px\)\s*\{[^}]*\.main--lobby\s*\{[^}]*overflow-y:\s*auto/s);
    expect(css).toMatch(/\.league-lobby\s*\{[^}]*height:\s*max\(100%,\s*760px\)/s);
    expect(css).not.toMatch(/\.league-lobby\s*\{[^}]*overflow:\s*hidden;[^}]*min-height:\s*700px/s);
    expect(css).not.toMatch(/@media\s*\(min-width:\s*1800px\)\s*and\s*\(min-height:\s*1000px\)\s*\{\s*\.league-lobby__banners--projects/);
  });

  it("hides decorative balance slots on narrow screens so they cannot collide with the lobby heading", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const mobileRules = css.slice(css.indexOf("@media (max-width: 900px)"));
    const mobileBalanceSlots = mobileRules.match(/\.league-lobby__balance-slots\s*\{([^}]*)\}/)?.[1] ?? "";
    const mobileBannerGrid = mobileRules.match(/\.league-lobby__banners,\s*\.league-lobby__banners:not\(\.league-lobby__banners--projects\)\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(mobileBalanceSlots).toMatch(/display:\s*none/);
    const desktopBalanceSlots = [...css.matchAll(/\.league-lobby__balance-slots\s*\{([^}]*)\}/g)]
      .map((match) => match[1])
      .find((rule) => rule.includes("position: absolute")) ?? "";
    expect(desktopBalanceSlots).toMatch(/display:\s*flex/);
    expect(mobileBannerGrid).toMatch(/aspect-ratio:\s*auto/);
    expect(mobileBannerGrid).toMatch(/height:\s*auto/);
  });

  it("fits category banners to short desktop height and removes Projects balance marks", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const lobbyRule = css.match(/\.league-lobby\s*\{([^}]*)\}/)?.[1] ?? "";
    const projectsSlots = css.match(/\.league-lobby--projects \.league-lobby__balance-slots\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(lobbyRule).toMatch(/--lobby-category-group-max:\s*min\(810px,\s*calc\(\(100vh - var\(--client-header-height\)\) \* 0\.812\)\)/);
    expect(css).toMatch(/@media\s*\(max-height:\s*760px\)[\s\S]*?--lobby-category-group-max:\s*min\(780px,\s*calc\(\(100vh - 180px\) \* 1\.34\)\)[\s\S]*?--lobby-category-banner-ratio:\s*1\.34/);
    expect(projectsSlots).toMatch(/display:\s*none/);
  });

  it("keeps Projects slim while allowing the banner height to grow on tall screens", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const projectRatio = css.match(/--lobby-project-banner-ratio:\s*([\d.]+)/)?.[1];
    expect(css).toMatch(/\.league-lobby__banners--projects\s*\{[\s\S]*?--lobby-banner-ratio:\s*var\(--lobby-project-banner-ratio\)/);
    expect(projectRatio).toBe("2.2");
    expect(css).toMatch(/--lobby-projects-group-max:\s*max\(1240px,\s*calc\(\(100vh - 300px\) \* 1\.8\)\)/);
    expect(css).not.toMatch(/--lobby-projects-group-max:\s*clamp/);
    expect(css).toMatch(/@media\s*\(min-height:\s*1120px\)[\s\S]*?\.league-lobby__banners--projects\s*\{[^}]*top:\s*8%[^}]*width:\s*min\(calc\(100% - 80px\),\s*1400px\)[^}]*height:\s*clamp\(600px,\s*min\(62vh,\s*40vw\),\s*760px\)[^}]*aspect-ratio:\s*auto/s);
    expect(css).toMatch(/\.league-lobby--projects \.league-lobby__balance-slots\s*\{[^}]*display:\s*none/s);
  });

  it("uses real project marks and keeps selection separate from opening a story", () => {
    const view = renderProjectsLobby();

    expect(view.querySelectorAll(".league-banner")).toHaveLength(5);
    expect(view.querySelector('img[src="/media/lobby/project-owner-j.svg"]')).toBeNull();
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/projects");

    const fraymakers = view.querySelector('[aria-label="Select Fraymakers"]');
    if (!fraymakers) throw new Error("Fraymakers banner is missing");
    expect(fraymakers.querySelector<HTMLImageElement>(".league-banner__mark")?.getAttribute("src")).toBe(
      "/media/profile/fraymakers-logo.png",
    );
    click(fraymakers);

    expect(fraymakers.getAttribute("aria-pressed")).toBe("true");
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/projects");

    const openStory = view.querySelector<HTMLAnchorElement>(".league-lobby__primary-action");
    if (!openStory) throw new Error("Selected story action is missing");
    click(openStory);
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/projects/fraymakers");
  });

  it("uses the Crest project mark for the hackathon entity", () => {
    const view = renderProjectsLobby("hackathons");
    const crest = view.querySelector('[aria-label="Select Crest"]');

    expect(crest?.querySelector<HTMLImageElement>(".league-banner__mark")?.getAttribute("src")).toBe(
      "/media/profile/profile-crest-emblem.png",
    );
  });

  it("leads the Hackathons lobby with its completed Crest build and opens its case study", () => {
    const view = renderProjectsLobby("hackathons");
    const cards = [...view.querySelectorAll<HTMLButtonElement>(".league-banner")];

    expect(cards.map((card) => card.getAttribute("aria-label"))).toEqual([
      "Select Crest",
      "Select Joshua Aryeetey",
      "Select Coming Soon",
    ]);
    expect(cards[0]?.getAttribute("aria-pressed")).toBe("true");
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/projects");

    const openStory = view.querySelector<HTMLAnchorElement>(".league-lobby__primary-action");
    expect(openStory?.getAttribute("href")).toBe("/projects/crest");
    click(openStory!);
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/projects/crest");
  });

  it("provides a Home link beside every category identity", () => {
    const view = renderProjectsLobby("experience");
    const home = view.querySelector<HTMLAnchorElement>(".league-lobby__home");

    expect(home?.getAttribute("href")).toBe("/home");
    expect(home?.getAttribute("aria-label")).toBe("Back to portfolio home");
    click(home!);
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/home");
  });

  it("fits brand marks without distortion and crops only the lobby portrait", () => {
    const view = renderProjectsLobby("experience");
    const livingInSilico = view.querySelector('[aria-label="Select Living in Silico"]');
    const stushPatties = view.querySelector('[aria-label="Select Stush Patties"]');
    const owner = view.querySelector('[aria-label="Select Joshua Aryeetey"]');

    expect(livingInSilico?.querySelector(".league-banner__mark")?.classList.contains("league-banner__mark--contain")).toBe(true);
    expect(stushPatties?.querySelector(".league-banner__mark")?.classList.contains("league-banner__mark--contain")).toBe(true);
    expect(owner?.querySelector(".league-banner__mark")?.classList.contains("league-banner__mark--portrait")).toBe(true);

    const css = readFileSync("src/lobby.css", "utf8");
    expect(css).toMatch(/\.league-banner__mark--contain\s*\{[^}]*width:\s*100%;[^}]*height:\s*100%;[^}]*border-radius:\s*50%;[^}]*object-fit:\s*cover/s);
    expect(css).toMatch(/\.league-banner__mark--portrait\s*\{[^}]*border-radius:\s*50%[^}]*object-fit:\s*cover/s);
  });

  it("contains the lobby portrait inside its square medallion", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const portraitRule = css.match(/\.league-banner__mark--portrait\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(portraitRule).toMatch(/position:\s*absolute/);
    expect(portraitRule).toMatch(/inset:\s*0/);
    expect(portraitRule).toMatch(/width:\s*100%/);
    expect(portraitRule).toMatch(/height:\s*100%/);
    expect(portraitRule).toMatch(/object-fit:\s*cover/);
  });

  it("starts the narrow lobby environment at the main content origin", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const mobileRules = css.slice(css.indexOf("@media (max-width: 900px)"));
    const environmentRule = mobileRules.match(/\.league-lobby__environment\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(environmentRule).toMatch(/top:\s*68px/);
  });

  it("uses the same owner portrait in Projects and the other category lobbies", () => {
    const view = renderProjectsLobby("projects");
    const owner = view.querySelector('[aria-label="Select Joshua Aryeetey"]');

    expect(owner?.querySelector(".league-banner__mark")?.getAttribute("src")).toBe("/media/lobby/profile-portrait-source.jpg");
    expect(owner?.querySelector(".league-banner__mark")?.classList.contains("league-banner__mark--portrait")).toBe(true);
  });

  it("keeps the portrait source and medallion treatment consistent in every owner banner", () => {
    const expectedPortrait = "/media/lobby/profile-portrait-source.jpg";
    for (const mode of ["projects", "experience", "hackathons", "education"] as const) {
      const view = renderProjectsLobby(mode);
      const owner = view.querySelector('[aria-label="Select Joshua Aryeetey"]');
      const mark = owner?.querySelector<HTMLImageElement>(".league-banner__mark");

      expect(mark?.getAttribute("src"), `${mode} portrait source`).toBe(expectedPortrait);
      expect(mark?.classList.contains("league-banner__mark--portrait"), `${mode} portrait crop`).toBe(true);
      act(() => root?.unmount());
      host?.remove();
      root = undefined;
      host = undefined;
    }
  });

  it("keeps Projects lobby medallion framing circular at desktop widths", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const projectsStylesStart = css.indexOf(".league-role-legend--projects {");
    const desktopRulesStart = css.indexOf("@media (min-width: 901px)", projectsStylesStart);
    const desktopRulesEnd = css.indexOf("@media (min-width: 1800px)", desktopRulesStart);
    const desktopRules = css.slice(desktopRulesStart, desktopRulesEnd);
    const projectMedallionRule = desktopRules.match(
      /\.league-lobby__banners--projects \.league-banner__medallion\s*\{([^}]*)\}/,
    )?.[1];

    expect(projectMedallionRule).toMatch(/width:\s*clamp\(/);
    expect(projectMedallionRule).toMatch(/height:\s*clamp\(/);
    expect(projectMedallionRule).toMatch(/aspect-ratio:\s*1\s*\/\s*1/);
    expect(projectMedallionRule).toMatch(/border-radius:\s*50%/);
  });

  it("keeps the Projects frame out of the narrow medallion grid track", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const medallionRule = css.match(
      /\.league-lobby__banners--projects \.league-banner__medallion\s*\{([^}]*)\}/,
    )?.[1] ?? "";
    const frameRule = css.match(
      /\.league-lobby__banners--projects \.league-banner__frame\s*\{([^}]*)\}/,
    )?.[1] ?? "";

    expect(medallionRule).toMatch(/height:\s*84px/);
    expect(medallionRule).toMatch(/grid-template:\s*1fr\s*\/\s*1fr/);
    expect(medallionRule).toMatch(/border-radius:\s*50%/);
    expect(frameRule).toMatch(/position:\s*absolute/);
    expect(frameRule).toMatch(/top:\s*50%/);
    expect(frameRule).toMatch(/left:\s*50%/);
  });

  it("keeps the role legend clear of the bottom story action", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const roleRule = css.match(/\.league-role-legend\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(roleRule).toMatch(/bottom:\s*1[45](?:\.\d+)?%;/);
    expect(roleRule).toMatch(/position:\s*absolute/);
  });

  it("adds inert circular plus slots around both centered lobby groups", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const slotRule = css.match(/\.league-lobby__balance-slot\s*\{([^}]*)\}/)?.[1];

    for (const mode of ["projects", "experience", "hackathons", "education"] as const) {
      const view = renderProjectsLobby(mode);
      const slots = [...view.querySelectorAll(".league-lobby__balance-slot")];
      const slotGroup = view.querySelector<HTMLElement>(".league-lobby__balance-slots");

      expect(slots).toHaveLength(2);
      expect(slots.map((slot) => slot.textContent?.trim())).toEqual(["+", "+"]);
      expect(slotGroup?.getAttribute("aria-hidden")).toBe("true");
      expect(view.querySelectorAll(".league-lobby__balance-slot button, .league-lobby__balance-slot a")).toHaveLength(0);
      act(() => root?.unmount());
      host?.remove();
      root = undefined;
      host = undefined;
    }

    expect(slotRule).toMatch(/aspect-ratio:\s*1\s*\/\s*1/);
    expect(slotRule).toMatch(/border-radius:\s*50%/);
  });
});
