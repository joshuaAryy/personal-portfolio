// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import HomeExplore from "./HomeExplore";

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

function renderHomeExplore() {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  act(() => {
    root?.render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeExplore />
        <CurrentPath />
      </MemoryRouter>,
    );
  });
  return host;
}

function click(element: Element) {
  act(() => {
    element.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
  });
}

afterEach(() => {
  if (root) act(() => root?.unmount());
  host?.remove();
  root = undefined;
  host = undefined;
});

describe("HomeExplore", () => {
  it("offers all four destinations", () => {
    const view = renderHomeExplore();

    expect(view.querySelector('[aria-label="Projects"]')).not.toBeNull();
    expect(view.querySelector('[aria-label="Experience"]')).not.toBeNull();
    expect(view.querySelector('[aria-label="Hackathons"]')).not.toBeNull();
    expect(view.querySelector('[aria-label="Education"]')).not.toBeNull();
    expect(view.querySelectorAll(".home-explore__mode-emblem")).toHaveLength(4);
    expect(view.querySelector('[aria-label="Back to the previous screen"]')).not.toBeNull();
    expect(view.querySelector('.home-explore__confirm img[src="/media/lobby/home-confirm-button.svg"]')).not.toBeNull();
    expect(view.querySelector('.home-explore__back img[src="/media/lobby/home-confirm-disc.svg"]')).not.toBeNull();
    expect(
      view.querySelector('[aria-label="Projects"] .home-explore__mode-emblem')?.getAttribute("src"),
    ).toBe("/media/lobby/home-mode-projects.svg");
  });

  it("shows the archive's selected-project context in the lower queue", () => {
    const view = renderHomeExplore();
    const queue = view.querySelector(".home-explore__selection");

    expect(queue?.querySelector("h2")?.textContent).toBe("Projects");
    expect(queue?.textContent).toContain(
      "Explore products and systems I build outside the classroom.",
    );
    expect(queue?.textContent).toContain(
      "Select a focus, then confirm to enter the project lobby.",
    );
    expect(queue?.textContent).not.toContain("SELECTED MODE");
    expect(queue?.textContent).not.toContain("MODE CONTENT");
  });

  it("keeps selection separate from confirming a destination", () => {
    const view = renderHomeExplore();
    const experience = view.querySelector('[aria-label="Experience"]');

    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/");
    expect(experience?.getAttribute("aria-pressed")).toBe("false");

    if (!experience) throw new Error("Experience choice is missing");
    click(experience);

    expect(experience.getAttribute("aria-pressed")).toBe("true");
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/");

    const confirm = view.querySelector(".home-explore__confirm");
    if (!confirm) throw new Error("Confirm action is missing");
    click(confirm);

    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe(
      "/experience",
    );
  });

  it("uses horizontal arrows to select and Enter to confirm", () => {
    const view = renderHomeExplore();
    const projects = view.querySelector<HTMLButtonElement>(
      '[aria-label="Projects"]',
    );
    if (!projects) throw new Error("Projects choice is missing");
    projects.focus();

    act(() => {
      projects.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true }),
      );
    });

    const experience = view.querySelector('[aria-label="Experience"]');
    expect(experience?.getAttribute("aria-pressed")).toBe("true");
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/");

    if (!experience) throw new Error("Experience choice is missing");
    act(() => {
      experience.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Enter", bubbles: true }),
      );
    });

    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe(
      "/experience",
    );
  });
});
