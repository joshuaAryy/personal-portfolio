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
  it("uses the authentic forest scene with a lower crop under the top-origin fade", () => {
    const css = readFileSync("src/home-explore.css", "utf8");
    const homeRule = css.match(/\.main\.main--home-explore\s*\{([^}]*)\}/)?.[1] ?? "";
    const environmentRule = css.match(/\.main\.main--home-explore::before\s*\{([^}]*)\}/)?.[1] ?? "";
    const previewGaps = [...css.matchAll(/\.home-explore__selection\s*\{[^}]*\bgap:\s*([^;]+);/gs)]
      .map((match) => match[1].trim());

    expect(homeRule).not.toContain('url("/media/lobby/party-background-original.jpg")');
    expect(environmentRule).toContain('url("/media/lobby/party-background-original.jpg")');
    expect(environmentRule).toMatch(/linear-gradient\(180deg,[^;]*rgba\(1, 8, 13, 0\.32\)[^;]*rgba\(1, 8, 13, 0\.1\)/s);
    expect(environmentRule).toContain("background-position: center top, center 64%");
    expect(environmentRule).toContain("position: sticky");
    expect(environmentRule).toContain('content: ""');
    expect(environmentRule).toContain("--forest-scene-height: calc(100vh - var(--client-header-height))");
    expect(environmentRule).toContain("height: var(--forest-scene-height)");
    expect(environmentRule).toContain("margin-bottom: calc(0px - var(--forest-scene-height))");
    expect(homeRule).not.toContain("home-mode-environment.png");
    expect(previewGaps.map(Number)).toEqual([0, 0, 0]);
  });

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

  it("stacks each selected-mode preview vertically in the left reading column", () => {
    const css = readFileSync("src/home-explore.css", "utf8");
    const selection = css.match(/\.home-explore__selection\s*\{([^}]*)\}/)?.[1] ?? "";
    const areaList = css.match(/\.home-explore__selection-focus ul\s*\{([^}]*)\}/)?.[1] ?? "";
    const experience = css.match(/\.home-explore__preview--experience\s*\{([^}]*)\}/)?.[1] ?? "";
    const hackathon = css.match(/\.home-explore__preview--hackathons\s*\{([^}]*)\}/)?.[1] ?? "";
    const education = css.match(/\.home-explore__preview--education\s*\{([^}]*)\}/)?.[1] ?? "";
    const workItems = css.match(/\.home-explore__preview-work\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(selection).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)/);
    expect(selection).toMatch(/justify-self:\s*start/);
    expect(selection).toMatch(/max-width:\s*540px/);
    expect(areaList).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)/);
    expect(experience).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)/);
    expect(hackathon).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)/);
    expect(education).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)/);
    expect(workItems).toMatch(/grid-template-columns:\s*minmax\(0,\s*1fr\)/);
  });

  it("starts every mode's secondary details close beneath its description", () => {
    const css = readFileSync("src/home-explore.css", "utf8");
    const selection = css.match(/\.home-explore__selection\s*\{([^}]*)\}/)?.[1] ?? "";
    const tabletRules = css.slice(
      css.indexOf("@media (max-width: 1120px)"),
      css.indexOf("@media (max-width: 760px)"),
    );
    const mobileRules = css.slice(css.indexOf("@media (max-width: 760px)"));

    expect(selection).toMatch(/gap:\s*0(?:px)?/);
    expect(tabletRules).toMatch(/\.home-explore__selection\s*\{[^}]*gap:\s*0(?:px)?/s);
    expect(mobileRules).toMatch(/\.home-explore__selection\s*\{[^}]*gap:\s*0(?:px)?/s);
  });

  it("flows secondary details before Confirm on medium desktop layouts", () => {
    const css = readFileSync("src/home-explore.css", "utf8");
    const responsiveRules = css.match(
      /@media \(min-width: 761px\) and \(max-width: 1500px\)\s*\{([\s\S]*?)\n\}/,
    )?.[1] ?? "";

    expect(responsiveRules).toMatch(/\.home-explore\s*\{[^}]*grid-template-rows:\s*35px 285px 20px minmax\(410px, auto\) auto/s);
    expect(responsiveRules).toMatch(/\.home-explore__confirm-area\s*\{[^}]*position:\s*relative[^}]*grid-row:\s*5/s);
  });

  it("previews verified experience, hackathon, and education details when selected", () => {
    const view = renderHomeExplore();
    const selection = view.querySelector(".home-explore__selection");

    for (const [mode, expected] of [
      ["Experience", ["Living in Silico", "Molecular representations", "Stush Patties"]],
      ["Hackathons", ["Crest", "MPC Hacks", "3rd Place", "Brim Financial"]],
      ["Education", ["Computer Engineering", "Software Specialization", "Expected 2028", "Dental Clinic DBMS", "Bookstore Management", "8-bit ALU / FSM", "CMOS Amplifier"]],
    ] as const) {
      const button = view.querySelector(`[aria-label="${mode}"]`);
      if (!button) throw new Error(`${mode} choice is missing`);
      click(button);
      for (const phrase of expected) expect(selection?.textContent).toContain(phrase);
    }
  });

  it("gives each non-Project mode a distinct, useful preview cue that remains visible on narrow screens", () => {
    const view = renderHomeExplore();
    const selection = view.querySelector(".home-explore__selection");

    const experience = view.querySelector('[aria-label="Experience"]');
    if (!experience) throw new Error("Experience choice is missing");
    click(experience);
    expect(selection?.querySelector(".home-explore__preview--experience")).not.toBeNull();
    expect(selection?.querySelector('[data-preview-fact="research"]')?.textContent).toContain("MOLECULAR RESEARCH");
    expect(selection?.querySelector('[data-preview-fact="research"]')?.textContent).toContain("Living in Silico");
    expect(selection?.querySelector('[data-preview-fact="research"]')?.textContent).toContain("fragment workflows");
    expect(selection?.querySelector('[data-preview-fact="software-engineering"]')?.textContent).toContain("DATA ENGINEERING");
    expect(selection?.querySelector('[data-preview-fact="software-engineering"]')?.textContent).toContain("Stush Patties");
    expect(selection?.querySelector('[data-preview-fact="software-engineering"]')?.textContent).toContain("reporting-ready outputs");

    const hackathons = view.querySelector('[aria-label="Hackathons"]');
    if (!hackathons) throw new Error("Hackathons choice is missing");
    click(hackathons);
    const award = selection?.querySelector('[data-preview-fact="award"]');
    expect(award?.querySelector(".home-explore__preview-result")?.textContent).toBe("3rd Place");
    expect(award?.querySelector(".home-explore__preview-challenge")?.textContent).toBe("Brim Financial Challenge");
    expect(selection?.textContent).toContain("MPC Hacks 2026");
    expect(selection?.querySelector(".home-explore__preview-work")?.textContent).toContain("Expense intelligence");
    expect(selection?.querySelector(".home-explore__preview-work")?.textContent).toContain("Human decision flow");

    const education = view.querySelector('[aria-label="Education"]');
    if (!education) throw new Error("Education choice is missing");
    click(education);
    expect(selection?.querySelector(".home-explore__preview--education")).not.toBeNull();
    expect(selection?.querySelector(".home-explore__build-grid")?.textContent).toContain("Dental Clinic DBMS");
    expect(selection?.querySelector(".home-explore__build-grid")?.textContent).toContain("8-bit ALU / FSM");
    expect(selection?.querySelector(".home-explore__preview-expected")?.textContent).toBe("Expected 2028");

    const css = readFileSync("src/home-explore.css", "utf8");
    const mobileRules = css.slice(css.indexOf("@media (max-width: 760px)"));
    expect(mobileRules).toMatch(/\.home-explore__selection-focus \.home-explore__preview-detail[^}]*display:\s*block/s);
    expect(mobileRules).toMatch(/\.home-explore__confirm-area\s*\{[^}]*position:\s*relative/s);
    expect(mobileRules).toMatch(/\.home-explore__preview--education\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s);
  });

  it("separates Back and Confirm and keeps project areas vertical on mobile", () => {
    const css = readFileSync("src/home-explore.css", "utf8");
    const pairRule = css.match(/\.home-explore__confirm-pair\s*\{([^}]*)\}/)?.[1];
    const mobileRules = css.slice(css.indexOf("@media (max-width: 760px)"));

    expect(pairRule).toMatch(/gap:\s*12px/);
    expect(pairRule).not.toMatch(/margin-right:\s*-/);
    expect(mobileRules).toMatch(/\.home-explore__selection-focus ul\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)/s);
    expect(mobileRules).not.toMatch(/\.home-explore__selection-focus li small\s*\{[^}]*display:\s*none/s);
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
