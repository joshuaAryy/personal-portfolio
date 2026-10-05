// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { MemoryRouter, useLocation } from "react-router-dom";
import { afterEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
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
    expect(
      view.querySelector('[aria-label="Education"] .home-explore__mode-emblem')?.getAttribute("src"),
    ).toBe("/media/lobby/home-mode-education.svg");
  });

  it("presents mode guidance and static project areas without project filters", () => {
    const view = renderHomeExplore();
    const queue = view.querySelector(".home-explore__selection");

    expect(queue?.querySelector("h2")?.textContent).toBe("Projects");
    expect(view.textContent).toContain("Choose a mode, then Confirm to continue.");
    expect(view.textContent).not.toContain("EXPLORE / SELECT A MODE");
    expect(view.textContent?.match(/Choose a mode, then Confirm to continue\./g)).toHaveLength(1);
    expect(view.textContent).toContain("PROJECT AREAS");
    expect(
      [...(queue?.querySelectorAll(".home-explore__selection-focus li") ?? [])].map((row) => [
        row.querySelector("strong")?.textContent,
        row.querySelector("small")?.textContent,
      ]),
    ).toEqual([
      ["AI / ML", "Machine intelligence"],
      ["Software", "Systems + applications"],
      ["Full Stack", "End-to-end products"],
      ["Data / Automation", "Pipelines + tooling"],
    ]);
    expect(view.textContent).toContain("Products and systems built across software, AI, data and automation.");
    expect(view.querySelector(".home-explore__selection-focus button")).toBeNull();
    expect(view.querySelector(".home-explore__subnav")).toBeNull();
  });

  it("previews verified experience, hackathon, and education details when selected", () => {
    const view = renderHomeExplore();
    const selection = view.querySelector(".home-explore__selection");

    for (const [mode, expected] of [
      ["Experience", ["Living in Silico", "AI/ML Research Intern", "Stush Patties"]],
      ["Hackathons", ["Crest", "MPC Hacks", "3rd Place", "Brim Financial"]],
      ["Education", ["Computer Engineering", "Software Specialization", "Expected 2028"]],
    ] as const) {
      const button = view.querySelector(`[aria-label="${mode}"]`);
      if (!button) throw new Error(`${mode} choice is missing`);
      click(button);
      for (const phrase of expected) expect(selection?.textContent).toContain(phrase);
    }
  });

  it("separates Back and Confirm and compacts project areas on mobile", () => {
    const css = readFileSync("src/home-explore.css", "utf8");
    const pairRule = css.match(/\.home-explore__confirm-pair\s*\{([^}]*)\}/)?.[1];
    const mobileRules = css.slice(css.indexOf("@media (max-width: 760px)"));

    expect(pairRule).toMatch(/gap:\s*12px/);
    expect(pairRule).not.toMatch(/margin-right:\s*-/);
    expect(mobileRules).toMatch(/\.home-explore__selection-focus ul\s*\{[^}]*grid-template-columns:\s*repeat\(2,/s);
    expect(mobileRules).toMatch(/\.home-explore__selection-focus small\s*\{[^}]*display:\s*none/s);
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
