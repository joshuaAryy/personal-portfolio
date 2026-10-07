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
  ["personal highlights", "/profile/highlights", '<h1 id="personal-highlights-title">The rest of the story.</h1>'],
  ["resume found", "/resume", 'id="resume-found-title" class="resume-found__title"'],
  ["resume viewer", "/resume/viewer", "Download PDF"],
] as const;

describe("primary App route mapping", () => {
  it.each(primaryRoutes)("renders the %s surface at %s", (_surface, path, marker) => {
    expect(renderRoute(path)).toContain(marker);
  });

  it("links the Education selected tray to its projects page", () => {
    expect(renderRoute("/education")).toContain('href="/education/projects"');
  });

  it("makes Personal Highlights a reachable Profile navigation destination", () => {
    const page = renderRoute("/profile/highlights");
    expect(page).toContain('href="/profile/highlights"');
    expect(page).toContain('aria-current="page"');
  });

  it("renders the current Highlights review candidate with accessible captions and masked media", () => {
    const page = renderRoute("/profile/highlights");
    expect(page.match(/class="personal-highlights__photo"[^>]*alt="[^"]+"/g)).toHaveLength(8);
    for (const source of [
      "IMG_0098.jpeg",
      "IMG_0208.jpeg",
      "IMG_0305.jpeg",
      "IMG_0308.jpeg",
      "IMG_0422.jpeg",
      "IMG_0334-privacy-safe.jpeg",
      "IMG_0618-rank-up-safe.jpeg",
      "IMG_0755-table-safe.jpeg",
    ]) {
      expect(page).toContain(`/media/profile/highlights/${source}`);
    }
    expect(page).not.toContain("/media/profile/highlights/IMG_0334.jpeg");
    expect(page).not.toContain("/media/profile/highlights/IMG_0618.jpeg");
    expect(page).not.toContain("/media/profile/highlights/IMG_0755.jpeg");
    expect(page).toContain('class="personal-highlights__caption"');
    expect(page).not.toMatch(/IMG_0320|shih-tzu/i);
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
    expect(page).toContain('class="journey-identity__photo" src="/media/profile/owner-portrait.png"');
    expect(page).toContain('class="journey-identity__frame" src="/media/profile/portrait-medallion.png"');
  });

  it("presents four concise Education capability briefs with their evidence states", () => {
    const page = renderRoute("/education/projects");
    expect(page.match(/class="education-projects__brief education-projects__brief--[^"]+"/g)).toHaveLength(4);
    expect(page).toContain("Dental Clinic DBMS");
    expect(page).toContain("Bookstore Management System");
    expect(page).toContain("8-bit ALU + FSM");
    expect(page).toContain("Four-stage CMOS amplifier");
    expect(page).toContain("IN PROGRESS");
    expect(page).not.toContain("OWNER-REPORTED · EVIDENCE PENDING");
    expect(page).not.toContain("SOURCE VERIFIED · LAB 6 PART 2");
    expect(page).toContain("A Java/Swing desktop bookstore with owner and customer paths.");
    expect(page).toContain("A four-stage CMOS amplifier study using KiCad and SPICE.");
    expect(page).toContain("CURRENT · IN PROGRESS");
    expect(page).not.toContain("Capability focus:");
    expect(page).not.toContain("No source or authentic interface was reviewed");
    expect(page).not.toMatch(/Dean|scholarship/i);
    expect(page).toContain('class="top-nav top-nav--education-projects"');
    expect(page).toContain('aria-current="page"');
    expect(page).toContain('class="header-help"');
    expect(page).toContain("Four engineering domains");
    expect(page).toContain("Selected work");
    expect(page.indexOf("Four engineering domains")).toBeLessThan(page.indexOf("Selected work"));
    expect(page).toContain("Software Specialization");
    expect(page).toContain("Expected 2028");
  });

  it("uses one source-traced ALU figure and text-led briefs for the other projects", () => {
    const page = renderRoute("/education/projects");
    expect(page.match(/class="education-projects__alu-map"/g)).toHaveLength(1);
    expect(page).toContain("DIGITAL SYSTEMS · DATA + CONTROL");
    expect(page).toContain("Operation selection and result display.");
    expect(page).not.toContain("LAB 6 · PART 2");
    expect(page).toContain("Two 8-bit inputs");
    expect(page).toContain("Input latches");
    expect(page).toContain("Nine-state FSM");
    expect(page).toContain("State decoder");
    expect(page).toContain("OP[15..0]");
    expect(page).toContain("R1 / R2 · two 4-bit outputs");
    expect(page).toContain("Seven-segment inputs");
    expect(page).not.toContain("Engineering concept flow");
    expect(page).not.toContain("education-projects__takeaway");
    expect(page).not.toContain("education-projects__tags");
    expect(page).toContain("ORACLE SQL");
    expect(page).toContain("integrity constraints");
    expect(page).toContain("SQL queries across connected records");
    expect(page).toContain("Broader clinic workflows are planned as the course project continues.");
    expect(page).toContain("Java / Swing");
    expect(page).toContain("State-pattern loyalty behavior");
    expect(page).toContain("shared Singleton state");
    expect(page).toContain("local file persistence");
    expect(page).toContain("gain, bias/current, buffering, load, and output headroom");
    expect(page).not.toContain("The selected BDF pin is named Resetn");
    expect(page).not.toContain("Waveform files show setup");
    expect(page).not.toContain("no hardware demonstration is claimed");
    expect(page).not.toMatch(/source-follower|3\.3 V|measured gain|fabricated hardware/i);
  });

  it("keeps owner context natural and excludes unsupported project claims", () => {
    const page = renderRoute("/education/projects");
    expect(page).toContain("CURRENT · IN PROGRESS");
    expect(page).toContain("Broader clinic workflows are planned as the course project continues.");
    expect(page).toContain("A Java/Swing desktop bookstore with owner and customer paths.");
    expect(page).toContain("A four-stage CMOS amplifier study using KiCad and SPICE.");
    expect(page).not.toContain("OWNER-REPORTED · EVIDENCE PENDING");
    expect(page).not.toContain("SOURCE VERIFIED · LAB 6 PART 2");
    expect(page).not.toContain("No source or authentic interface was reviewed");
    expect(page).not.toContain("No schematic, netlist, or result plot was found");
    expect(page).not.toContain("BDF pin is named Resetn");
    expect(page).not.toContain("FSM module resets high");
    expect(page).not.toContain("Waveform files show setup, not a verified passing trace");
    expect(page).not.toContain("active-low reset");
    expect(page).not.toContain("9 opcode branches");
    expect(page).not.toContain("simulation passed");
    expect(page).not.toContain("signed result");
    expect(page).not.toContain("status output");
    expect(page).not.toMatch(/Dean|scholarship/i);
  });
});
