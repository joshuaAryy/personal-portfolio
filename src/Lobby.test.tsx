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

describe("Projects lobby", () => {
  it("uses real project marks and keeps selection separate from opening a story", () => {
    const view = renderProjectsLobby();

    expect(view.querySelectorAll(".league-banner")).toHaveLength(5);
    expect(view.querySelector('img[src="/media/lobby/project-owner-j.svg"]')).not.toBeNull();
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

  it("keeps Projects lobby medallion framing circular at desktop widths", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const desktopRules = css.slice(css.indexOf("@media (min-width: 901px)"));
    const projectMedallionRule = desktopRules.match(
      /\.league-lobby__banners--projects \.league-banner__medallion\s*\{([^}]*)\}/,
    )?.[1];

    expect(projectMedallionRule).toMatch(/width:\s*clamp\(/);
    expect(projectMedallionRule).toMatch(/height:\s*clamp\(/);
    expect(projectMedallionRule).toMatch(/aspect-ratio:\s*1\s*\/\s*1/);
    expect(projectMedallionRule).toMatch(/border-radius:\s*50%/);
  });

  it("adds inert circular plus slots around the three category lobby rows", () => {
    const css = readFileSync("src/lobby.css", "utf8");
    const slotRule = css.match(/\.league-lobby__balance-slot\s*\{([^}]*)\}/)?.[1];

    for (const mode of ["experience", "hackathons", "education"] as const) {
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

    const projectsView = renderProjectsLobby("projects");
    expect(projectsView.querySelectorAll(".league-lobby__balance-slot")).toHaveLength(0);
    expect(slotRule).toMatch(/aspect-ratio:\s*1\s*\/\s*1/);
    expect(slotRule).toMatch(/border-radius:\s*50%/);
  });
});
