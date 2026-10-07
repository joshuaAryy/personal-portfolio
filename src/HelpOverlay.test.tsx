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
    const trigger = view.querySelector(".rail-social-footer__help");
    if (!trigger) throw new Error("Contextual help trigger is missing");
    expect(trigger.textContent).toContain("Help");

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
    ).toEqual(["Top-level links", "Mode navigation", "Activity rail", "Preview a mode", "Confirm or go Back"]);
    expect(view.querySelector('[role="dialog"] h2')?.textContent).toBe("Home controls");
  });

  it("returns focus to the Help trigger and traps Tab within the dialog", () => {
    const view = renderApp("/projects");
    const trigger = view.querySelector<HTMLButtonElement>(".rail-social-footer__help");
    if (!trigger) throw new Error("Contextual help trigger is missing");
    trigger.focus();
    click(trigger);

    const close = view.querySelector<HTMLButtonElement>(".client-help-overlay__close");
    if (!close) throw new Error("Help close button is missing");
    expect(document.activeElement).toBe(close);

    act(() => {
      close.dispatchEvent(new KeyboardEvent("keydown", { key: "Tab", bubbles: true, cancelable: true }));
    });
    expect(document.activeElement).toBe(close);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });
    expect(document.activeElement).toBe(trigger);
  });

  it.each([
    ["/projects", ["Top-level links", "Select an entry", "Confirm the selection", "Primary navigation and Activity"]],
    ["/profile", ["Profile signals", "Profile navigation", "Open a project"]],
    ["/profile/journey", ["Follow the story", "Use the path", "Change sections"]],
    ["/profile/demos", ["Choose a demo", "Play Crest or Cho’Veigo", "Food Tracker"]],
    ["/projects/food-tracker", ["Read the case study", "Move between stories"]],
    ["/projects/choveigo", ["Case study navigation"]],
    ["/resume", ["Resume Found", "View or close", "Escape"]],
    ["/resume/viewer", ["Resume viewer", "Resume actions", "Return to Resume Found"]],
  ])("shows route-specific guidance on %s", (path, expectedSteps) => {
    const view = renderApp(path);
    const trigger = view.querySelector(".header-help");
    if (!trigger) throw new Error("Header help trigger is missing");
    click(trigger);

    const steps = Array.from(view.querySelectorAll(".client-help-overlay__steps h3"))
      .map((node) => node.textContent);
    for (const step of expectedSteps) expect(steps).toContain(step);
  });

  it("names the actual lobby controls and persistent contact links", () => {
    const view = renderApp("/projects");
    const trigger = view.querySelector(".header-help");
    if (!trigger) throw new Error("Header help trigger is missing");
    click(trigger);

    const details = Array.from(view.querySelectorAll(".client-help-overlay__steps p"))
      .map((node) => node.textContent ?? "").join(" ");
    expect(details).toContain("LinkedIn, GitHub, Email, and Resume");
    expect(details).toContain("top-left arrow returns Home");
    expect(details).toContain("Open Case Study");
  });
});
