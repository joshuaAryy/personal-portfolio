// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import Lobby from "./Lobby";

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

function renderProjectsLobby() {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  act(() => {
    root?.render(
      <MemoryRouter initialEntries={["/projects"]}>
        <Lobby mode="projects" />
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
    expect(view.querySelector('img[src="/media/lobby/profile-portrait-source.jpg"]')).not.toBeNull();
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/projects");

    const fraymakers = view.querySelector('[aria-label="Select Fraymakers"]');
    if (!fraymakers) throw new Error("Fraymakers banner is missing");
    click(fraymakers);

    expect(fraymakers.getAttribute("aria-pressed")).toBe("true");
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/projects");

    const openStory = view.querySelector<HTMLAnchorElement>(".league-lobby__primary-action");
    if (!openStory) throw new Error("Selected story action is missing");
    click(openStory);
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/projects/fraymakers");
  });
});
