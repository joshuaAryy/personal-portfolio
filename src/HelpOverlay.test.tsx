// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import App from "./App";

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

function renderApp(path: string) {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  act(() => {
    root?.render(
      <MemoryRouter initialEntries={[path]}>
        <App />
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
  document.body.classList.remove("client-help-open");
  document.body.style.overflow = "";
});

describe("contextual Help overlay", () => {
  it("keeps the current client screen underneath and closes back to it", () => {
    const view = renderApp("/projects");
    const trigger = view.querySelector('[aria-label="Open contextual help"]');
    if (!trigger) throw new Error("Contextual help trigger is missing");

    click(trigger);

    expect(view.querySelector('[role="dialog"][aria-modal="true"]')).not.toBeNull();
    expect(view.querySelector("main.main--lobby h1")?.textContent).toContain("PROJECTS");
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/projects");

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });

    expect(view.querySelector('[role="dialog"]')).toBeNull();
    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/projects");
    expect(view.querySelector(".client")?.hasAttribute("aria-hidden")).toBe(false);
  });

  it("opens the contextual overlay when /help is entered directly", () => {
    const view = renderApp("/help");

    expect(view.querySelector('[aria-label="Current path"]')?.textContent).toBe("/home");
    expect(view.querySelector('[role="dialog"][aria-modal="true"]')).not.toBeNull();
    expect(view.querySelector("main.main--home-explore h1")?.textContent).toBe("Select a portfolio mode");
    expect(view.querySelectorAll('[class*="spotlight--home-"]')).toHaveLength(4);
    expect(
      Array.from(view.querySelectorAll(".client-help-overlay__steps h3")).map((node) => node.textContent),
    ).toEqual(["Navigation", "Party / Activity Rail", "Filter & Select", "Open the Selection"]);
    expect(view.querySelector('[role="dialog"] h2')?.textContent).toBe("Home controls");
  });
});
