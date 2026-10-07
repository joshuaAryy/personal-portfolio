// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

Object.defineProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT", {
  configurable: true,
  value: true,
});

let host: HTMLDivElement | undefined;
let root: ReturnType<typeof createRoot> | undefined;
const originalInnerWidth = window.innerWidth;
const originalMatchMedia = Object.getOwnPropertyDescriptor(window, "matchMedia");

function setNarrowViewport() {
  Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: vi.fn((query: string) => ({
      matches: query === "(max-width: 900px)",
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

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
  Object.defineProperty(window, "innerWidth", { configurable: true, value: originalInnerWidth });
  if (originalMatchMedia) Object.defineProperty(window, "matchMedia", originalMatchMedia);
  else Reflect.deleteProperty(window, "matchMedia");
  vi.restoreAllMocks();
});

describe("contextual Help overlay", () => {
  it("keeps non-Home desktop guidance inside the viewport with scrollable overflow", () => {
    const stylesheet = readFileSync("src/utility.css", "utf8");
    const desktopDialogRule = stylesheet.match(
      /\.client-help-overlay__dialog:not\(\.client-help-overlay__dialog--home\)\s*\{([^}]*)\}/s,
    )?.[1] ?? "";

    expect(desktopDialogRule).toMatch(/top:\s*auto;/);
    expect(desktopDialogRule).toMatch(/bottom:\s*16px;/);
    expect(desktopDialogRule).toMatch(/max-height:\s*min\(calc\(100vh - 32px\),\s*720px\);/);
    expect(desktopDialogRule).toMatch(/overflow-y:\s*auto;/);
  });

  it("focuses long-route content without scrolling the narrow header out of view", () => {
    setNarrowViewport();
    const focusCalls: Array<{ element: HTMLElement; options?: FocusOptions }> = [];
    vi.spyOn(HTMLElement.prototype, "focus").mockImplementation(function (
      this: HTMLElement,
      options?: FocusOptions,
    ) {
      focusCalls.push({ element: this, options });
    });

    const view = renderApp("/projects");
    const main = view.querySelector("main");

    expect(focusCalls).toContainEqual({ element: main, options: { preventScroll: true } });
  });

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

  it("explains how Education project briefs return to the academic lobby", () => {
    const view = renderApp("/education/projects");
    const trigger = view.querySelector(".header-help");
    if (!trigger) throw new Error("Header help trigger is missing");
    click(trigger);

    const details = Array.from(view.querySelectorAll(".client-help-overlay__steps p"))
      .map((node) => node.textContent ?? "").join(" ");
    const titles = Array.from(view.querySelectorAll(".client-help-overlay__steps h3"))
      .map((node) => node.textContent);
    expect(view.querySelector(".education-projects__back")?.textContent).toBe("Education");
    expect(titles).toContain("Back to Education");
    expect(details).toContain("Education link above the briefs");
    expect(details).toContain("Activity");
  });

  it("explains Profile section tabs while browsing Personal Highlights", () => {
    const view = renderApp("/profile/highlights");
    const trigger = view.querySelector(".header-help");
    if (!trigger) throw new Error("Header help trigger is missing");
    click(trigger);

    const details = Array.from(view.querySelectorAll(".client-help-overlay__steps p"))
      .map((node) => node.textContent ?? "").join(" ");
    const titles = Array.from(view.querySelectorAll(".client-help-overlay__steps h3"))
      .map((node) => node.textContent);
    expect(view.querySelector('[aria-label="Profile sections"]')).not.toBeNull();
    expect(titles).toContain("Profile navigation");
    expect(details).toContain("Overview, Journey, Personal Highlights, and Demos");
    expect(details.toLowerCase()).toContain("scroll through the gallery");
    expect(details).toContain("Activity");
  });

  it("describes narrow contact links in the page-end row", () => {
    setNarrowViewport();

    const lobby = renderApp("/projects");
    const lobbyTrigger = lobby.querySelector(".header-help");
    if (!lobbyTrigger) throw new Error("Header help trigger is missing");
    click(lobbyTrigger);
    const lobbyDetails = Array.from(lobby.querySelectorAll(".client-help-overlay__steps p"))
      .map((node) => node.textContent ?? "").join(" ");
    expect(lobbyDetails).toContain("contact row after the page content");
    expect(lobbyDetails).not.toContain("in the client toolbar");
  });

  it.each(["/education/projects", "/profile/highlights"])(
    "keeps narrow guidance accurate when the Activity rail is hidden on %s",
    (path) => {
      setNarrowViewport();
      const view = renderApp(path);
      const trigger = view.querySelector(".header-help");
      if (!trigger) throw new Error("Header help trigger is missing");
      click(trigger);

      const details = Array.from(view.querySelectorAll(".client-help-overlay__steps p"))
        .map((node) => node.textContent ?? "").join(" ");
      expect(details).toContain("contact row after the page content");
      expect(details.toLowerCase()).toContain("top navigation");
      expect(details).not.toContain("Activity");
    },
  );

  it("does not describe the hidden Activity rail on narrow Profile or Journey screens", () => {
    setNarrowViewport();
    const profile = renderApp("/profile");
    const profileTrigger = profile.querySelector(".header-help");
    if (!profileTrigger) throw new Error("Header help trigger is missing");
    click(profileTrigger);
    const profileDetails = Array.from(profile.querySelectorAll(".client-help-overlay__steps p"))
      .map((node) => node.textContent ?? "").join(" ");
    expect(profileDetails).not.toContain("Activity rail");

    act(() => root?.unmount());
    host?.remove();
    root = undefined;
    host = undefined;

    const journey = renderApp("/profile/journey");
    const journeyTrigger = journey.querySelector(".header-help");
    if (!journeyTrigger) throw new Error("Header help trigger is missing");
    click(journeyTrigger);
    const journeyDetails = Array.from(journey.querySelectorAll(".client-help-overlay__steps p"))
      .map((node) => node.textContent ?? "").join(" ");
    expect(journeyDetails).not.toContain("Activity remain available");
  });
});
