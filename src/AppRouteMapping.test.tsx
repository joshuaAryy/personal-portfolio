import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

afterEach(() => {
  vi.unstubAllGlobals();
});

function renderRoute(path: string) {
  vi.stubGlobal("window", {
    matchMedia: () => ({ matches: false }),
  });
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

const primaryRoutes = [
  ["opening", "/", 'aria-label="Skip to Home"'],
  ["Home / Explore", "/home", "Select a portfolio mode"],
  ["projects", "/projects", "PROJECTS \u00b7 FEATURED"],
  ["experience", "/experience", "PROFESSIONAL WORK \u00b7 RESEARCH \u00b7 DATA SYSTEMS"],
  ["hackathons", "/hackathons", "HACKATHONS"],
  ["education", "/education", "EDUCATION"],
  ["education projects", "/education/projects", "Dental Clinic DBMS"],
  ["profile overview", "/profile", "<h1>JOSHUA ARYEETEY</h1>"],
  ["profile journey", "/profile/journey", "<h1>Curiosity became building.</h1>"],
  ["profile demos", "/profile/demos", "data-node-id=\"1316:131\">FOOD TRACKER</h1>"],
  ["resume found", "/resume", 'id="resume-found-title" class="resume-mechanism__title"'],
  ["resume viewer", "/resume/viewer", "APPROVED GENERAL RESUME"],
] as const;

describe("primary App route mapping", () => {
  it.each(primaryRoutes)("renders the %s surface at %s", (_surface, path, marker) => {
    expect(renderRoute(path)).toContain(marker);
  });

  it("links the Education selected tray to its projects page", () => {
    expect(renderRoute("/education")).toContain('href="/education/projects"');
  });

  it("places the continuous Figma Void field at the Journey layout root", () => {
    const page = renderRoute("/profile/journey");
    expect(page).toContain('<div class="journey-void-field" aria-hidden="true">');
    expect(page.indexOf('class="journey-void-field"')).toBeLessThan(
      page.indexOf('class="journey-identity"'),
    );
    expect(page).toContain('data-node-id="1287:8"');
    expect(page).toContain('data-node-id="3492:2"');
    expect(page).toContain('data-node-id="1976:45"');
  });

  it("keeps the Education projects page to its four authorized project entries", () => {
    const page = renderRoute("/education/projects");
    expect(page.match(/class="education-projects__item"/g)).toHaveLength(4);
    expect(page).toContain("Dental Clinic DBMS");
    expect(page).toContain("Java Swing Bookstore");
    expect(page).toContain("Custom 8-bit ALU / FSM");
    expect(page).toContain("CMOS Amplifier");
    expect(page).toContain("IN PROGRESS");
    expect(page).not.toMatch(/Dean|scholarship/i);
  });
});
