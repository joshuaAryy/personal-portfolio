// @vitest-environment happy-dom
import { StrictMode, act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

let host: HTMLDivElement;
let root: Root;

function LocationProbe() {
  const { pathname } = useLocation();
  return <output aria-label="Current route">{pathname}</output>;
}

function renderAppAtResume(from?: string) {
  const entry = from
    ? { pathname: "/resume", state: { from } }
    : "/resume";
  act(() => {
    root.render(
      <MemoryRouter initialEntries={[entry]}>
        <LocationProbe />
        <App />
      </MemoryRouter>,
    );
  });
}

function renderAppWithResumeTakeover(origin: string) {
  const backgroundLocation = {
    pathname: origin,
    search: "",
    hash: "",
    state: null,
    key: "origin",
  };
  act(() => {
    root.render(
      <MemoryRouter
        initialEntries={[
          origin,
          {
            pathname: "/resume",
            state: { from: origin, backgroundLocation },
          },
        ]}
        initialIndex={1}
      >
        <LocationProbe />
        <App />
      </MemoryRouter>,
    );
  });
}

function renderAppAt(path: string, strict = false) {
  act(() => {
    const content = (
      <MemoryRouter initialEntries={[path]}>
        <LocationProbe />
        <App />
      </MemoryRouter>
    );
    root.render(strict ? <StrictMode>{content}</StrictMode> : content);
  });
}

function currentRoute() {
  return host.querySelector('[aria-label="Current route"]')?.textContent;
}

function expectDestinationMainFocused(path: string) {
  expect(currentRoute()).toBe(path);
  const main = host.querySelector<HTMLElement>("#main");
  expect(main).not.toBeNull();
  expect(document.activeElement).toBe(main);
}

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.unstubAllGlobals();
});

describe("Resume Found return behavior", () => {
  it("opens from the Resume utility over the originating screen and restores the trigger", () => {
    renderAppAt("/home");
    const resumeLink = host.querySelector<HTMLAnchorElement>(
      ".header-client-tool--resume",
    );
    expect(resumeLink).not.toBeNull();
    resumeLink!.focus();

    act(() => resumeLink!.click());

    const underlay = host.querySelector<HTMLElement>(".app-route-underlay");
    const dialog = host.querySelector<HTMLElement>("[role='dialog']");
    expect(currentRoute()).toBe("/resume");
    expect(underlay?.textContent).toContain("Select a portfolio mode");
    expect(underlay?.getAttribute("aria-hidden")).toBe("true");
    expect(underlay?.hasAttribute("inert")).toBe(true);
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    expect(document.activeElement).toBe(dialog);

    act(() => host.querySelector<HTMLButtonElement>(".resume-found__close")!.click());

    expect(currentRoute()).toBe("/home");
    expect(document.activeElement).toBe(resumeLink);
  });

  it("contains keyboard focus and Escape returns to the invoking Resume utility", () => {
    renderAppAt("/home");
    const resumeLink = host.querySelector<HTMLAnchorElement>(
      ".header-client-tool--resume",
    )!;
    resumeLink.focus();
    act(() => resumeLink.click());

    const dialog = host.querySelector<HTMLElement>("[role='dialog']")!;
    const shiftTab = new KeyboardEvent("keydown", {
      key: "Tab",
      shiftKey: true,
      bubbles: true,
      cancelable: true,
    });
    act(() => dialog.dispatchEvent(shiftTab));
    expect(shiftTab.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(
      host.querySelector(".resume-found__close"),
    );

    const tab = new KeyboardEvent("keydown", {
      key: "Tab",
      bubbles: true,
      cancelable: true,
    });
    act(() => host.querySelector(".resume-found__close")!.dispatchEvent(tab));
    expect(tab.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(
      host.querySelector(".resume-found__action"),
    );

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });
    expect(currentRoute()).toBe("/home");
    expect(document.activeElement).toBe(resumeLink);
  });

  it("preserves the invoking focus target through Strict Mode effect replay", () => {
    renderAppAt("/home", true);
    const resumeLink = host.querySelector<HTMLAnchorElement>(
      ".header-client-tool--resume",
    )!;
    resumeLink.focus();
    act(() => resumeLink.click());

    act(() => host.querySelector<HTMLButtonElement>(".resume-found__close")!.click());

    expect(document.activeElement).toBe(resumeLink);
  });

  it("shows Resume Found as an accessible takeover over its inert originating screen", () => {
    renderAppWithResumeTakeover("/home");

    const underlay = host.querySelector<HTMLElement>(".app-route-underlay");
    const dialog = host.querySelector<HTMLElement>("[role='dialog']");

    expect(currentRoute()).toBe("/resume");
    expect(underlay).not.toBeNull();
    expect(underlay?.textContent).toContain("Select a portfolio mode");
    expect(underlay?.getAttribute("aria-hidden")).toBe("true");
    expect(underlay?.hasAttribute("inert")).toBe(true);
    expect(dialog?.getAttribute("aria-modal")).toBe("true");
    expect(dialog?.getAttribute("aria-labelledby")).toBe("resume-found-title");
    expect(document.activeElement).toBe(dialog);
  });

  it("Escape returns to the originating route and focuses its main region", () => {
    renderAppAtResume("/experience");

    act(() => {
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
      );
    });

    expectDestinationMainFocused("/experience");
  });

  it("Close returns to the originating route and focuses its main region", () => {
    renderAppAtResume("/profile/demos");
    const close = host.querySelector<HTMLButtonElement>(".resume-found__close");
    expect(close).not.toBeNull();
    expect(close?.textContent).toBe("CLOSE");

    act(() => close!.click());

    expectDestinationMainFocused("/profile/demos");
  });

  it("Close falls back to Home for a resume route as the saved origin", () => {
    renderAppAtResume("/resume/viewer");
    const close = host.querySelector<HTMLButtonElement>(".resume-found__close");
    expect(close).not.toBeNull();

    act(() => close!.click());

    expectDestinationMainFocused("/home");
  });
});
