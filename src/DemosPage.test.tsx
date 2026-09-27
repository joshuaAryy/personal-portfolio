// @vitest-environment happy-dom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DemosPage from "./DemosPage";

let host: HTMLDivElement;
let root: Root;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  host = document.createElement("div");
  root = createRoot(host);
  act(() => {
    root.render(
      <MemoryRouter initialEntries={["/profile/demos"]}>
        <DemosPage />
      </MemoryRouter>,
    );
  });
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.unstubAllGlobals();
});

function select(label: string) {
  const button = [...host.querySelectorAll<HTMLButtonElement>(".demo-selector__button")]
    .find((candidate) => candidate.textContent?.includes(label));
  expect(button).toBeDefined();
  act(() => button?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
  return button!;
}

describe("Demos media browser", () => {
  it("keeps the three recordings available and shows Food Tracker's selected Figma still", () => {
    const buttons = [...host.querySelectorAll<HTMLButtonElement>(".demo-selector__button")];

    expect(buttons.map((button) => button.textContent?.trim())).toEqual([
      "FOOD TRACKER",
      "CREST",
      "CHO’VEIGO",
    ]);
    expect(buttons.map((button) => button.getAttribute("aria-pressed"))).toEqual([
      "true",
      "false",
      "false",
    ]);
    expect(host.querySelector<HTMLImageElement>(".demo-recording-rail")?.src).toContain(
      "/media/demos-rail-food.svg",
    );
    expect(host.querySelector<HTMLImageElement>(".demo-player__still")?.src).toContain(
      "/media/demos-food.png",
    );
    expect(host.querySelector(".demo-player__still")?.getAttribute("alt")).toBe(
      "Food Tracker selected mark",
    );
    expect(host.querySelector(".demo-title")?.textContent).toBe("FOOD TRACKER");
    expect(host.querySelector("iframe")).toBeNull();
    expect(host.querySelector('a[href*="youtube"]')).toBeNull();
  });

  it("plays Crest in the in-client media surface and resets playback when selection changes", () => {
    select("CREST");
    expect(host.querySelector<HTMLImageElement>(".demo-recording-rail")?.src).toContain(
      "/media/demos-rail-crest.svg",
    );
    expect(host.querySelector<HTMLImageElement>(".demo-player__still")?.src).toContain(
      "/media/crest-sample.png",
    );
    expect(host.querySelector(".demo-title")?.textContent).toBe("CREST");
    expect(host.querySelector('a[href*="youtube"]')).toBeNull();

    const playButton = host.querySelector<HTMLButtonElement>(".demo-player__play");
    expect(playButton?.getAttribute("aria-label")).toBe("Play Crest demo in player");
    act(() => playButton?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    const player = host.querySelector<HTMLIFrameElement>(".demo-player__video");
    expect(player?.src).toContain("youtube-nocookie.com/embed/kiq6XjNi9J8");
    expect(player?.getAttribute("title")).toBe("Crest expense intelligence demo video");
    expect(host.querySelector(".demo-player__play")).toBeNull();

    select("FOOD TRACKER");
    expect(host.querySelector("iframe")).toBeNull();
    select("CREST");
    expect(host.querySelector("iframe")).toBeNull();
    expect(host.querySelector(".demo-player__play")).not.toBeNull();
  });

  it("keeps Cho’Veigo as its approved static capture without a video affordance", () => {
    const button = select("CHO’VEIGO");

    expect(button.getAttribute("aria-pressed")).toBe("true");
    expect(host.querySelector<HTMLImageElement>(".demo-recording-rail")?.src).toContain(
      "/media/demos-rail-choveigo.svg",
    );
    expect(host.querySelector<HTMLImageElement>(".demo-player__still")?.src).toContain(
      "/media/choveigo-recommendations.png",
    );
    expect(host.querySelector(".demo-player__still")?.getAttribute("alt")).toBe(
      "Cho’Veigo recommendations interface capture",
    );
    expect(host.querySelector(".demo-title")?.textContent).toBe("CHO’VEIGO");
    expect(host.querySelector(".demo-player__play")).toBeNull();
    expect(host.querySelector("iframe")).toBeNull();
  });
});
