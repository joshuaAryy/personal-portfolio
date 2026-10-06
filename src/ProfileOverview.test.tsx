// @vitest-environment happy-dom

import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { projects } from "./data";
import ProfileOverview from "./ProfileOverview";
import { projectCasePaths } from "./project-route-paths";

function renderProfile() {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={["/profile"]}>
      <ProfileOverview projects={projects} projectCasePaths={projectCasePaths} />
    </MemoryRouter>,
  );
}

function cssBlock(source: string, selector: string) {
  const selectorStart = source.indexOf(selector);
  if (selectorStart < 0) return "";

  const openBrace = source.indexOf("{", selectorStart);
  if (openBrace < 0) return "";

  let depth = 0;
  for (let index = openBrace; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(openBrace + 1, index);
    }
  }

  return "";
}

function cssPixels(rule: string, property: string) {
  const value = rule.match(new RegExp(`${property}:\\s*(-?\\d+(?:\\.\\d+)?)px`))?.[1];
  return value === undefined ? null : Number(value);
}

describe("Profile Overview", () => {
  it("keeps project details out of the initial neutral panel", () => {
    const markup = renderProfile();

    expect(markup).toMatch(/<section id="profile-signal-preview-panel"[^>]*hidden=""/);
    expect(markup).not.toContain('href="/projects/food-tracker"');
    expect(markup).not.toContain('href="https://github.com/joshuaAryy/food-tracker"');
    expect(markup).toContain('aria-label="Joshua Aryeetey profile"');
    expect(markup).toContain('alt="Joshua Aryeetey"');
    expect(markup).not.toContain("CASE STUDY");
    expect(markup).not.toContain("VIEW SOURCE");
  });

  it("uses the approved profile portrait and Figma signal emblems", () => {
    const markup = renderProfile();

    expect(markup).toContain("/media/profile/owner-portrait.png");
    expect(markup).toContain("/media/profile/portrait-medallion.png");
    expect(markup).toContain("/media/profile/project-signal.svg");
    expect(markup).toContain("/media/profile/experience-signal.svg");
    expect(markup).toContain("/media/profile/hackathon-signal.svg");
    expect(markup).toContain("/media/profile/academics-signal.svg");
  });

  it("keeps the four lower Figma signals as static summaries without a default preview", () => {
    const markup = renderProfile();

    expect(markup).toContain('role="group" aria-label="Profile summary details"');
    expect(markup.match(/class="profile-signal(?:\s[^"]*)?"/g)).toHaveLength(4);
    expect(markup).not.toContain('id="profile-panel-heading"');
    expect(markup).not.toContain("Food tracking");
    expect(markup).not.toContain("Resume tailoring");
    expect(markup).not.toContain("MPC Hacks 2026");
    expect(markup).toContain('<span class="profile-signal__label">PROJECTS</span>');
    expect(markup).toContain('<span class="profile-signal__value">2028</span>');
    expect(markup).not.toContain("profile-tab-");
    expect(markup).not.toContain('role="tablist"');
    expect(markup).not.toContain('role="tabpanel"');
    expect(markup).toContain('<span class="profile-signal__value">4</span>');
    expect(markup).toContain('<span class="profile-signal__value">2</span>');
    expect(markup).toContain('<span class="profile-signal__value">1</span>');
    expect(markup).toContain('<span class="profile-signal__value">2028</span>');
  });

  it("separates the CE credential and lays proportionate trait emblems left to right", () => {
    const markup = renderProfile();
    const profileCss = readFileSync("src/profile-overview.css", "utf8");
    const traitRule = cssBlock(profileCss, ".main--profile .identity-traits");
    const traitItemRule = cssBlock(profileCss, ".main--profile .identity-traits > .profile-trait");
    const traitSpanRule = cssBlock(profileCss, ".main--profile .identity-traits > .profile-trait > span");
    const medallionRule = cssBlock(profileCss, ".profile-trait__medallion");
    const labelRule = cssBlock(profileCss, ".profile-trait__label");

    expect(markup).toContain('aria-label="Computer Engineering degree"');
    expect(traitRule).toContain("grid-template-columns: repeat(3");
    expect(traitRule).toContain("grid-template-rows: 96px");
    expect(traitItemRule).toContain("display: flex");
    expect(traitSpanRule).toContain("display: block");
    expect(medallionRule).toContain("width: 64px");
    expect(medallionRule).toContain("height: 64px");
    expect(labelRule).toContain("margin-top:");

    const narrowRules = cssBlock(profileCss, "@media (max-width: 900px)");
    const degreeRule = cssBlock(narrowRules, ".identity-panel__degree");
    const finalDisciplineRule = cssBlock(narrowRules, ".identity-panel__discipline p:last-child");
    const degreeTop = cssPixels(degreeRule, "top") ?? 0;
    const disciplineTop = cssPixels(finalDisciplineRule, "top") ?? 0;
    expect(degreeTop).toBeGreaterThanOrEqual(disciplineTop + 26);
  });

  it("places the desktop signal row below the hero border with breathing room", () => {
    const profileCss = readFileSync("src/profile-overview.css", "utf8");
    const overviewRule = cssBlock(profileCss, ".main--profile .profile-overview");
    const enclosureRule = cssBlock(profileCss, ".profile-project-panel__enclosure");
    const signalRule = cssBlock(profileCss, ".profile-signal-grid");
    const tabletRule = cssBlock(profileCss, "@media (min-width: 1400px) and (max-width: 1858px)");
    const tabletOverview = cssBlock(tabletRule, ".main--profile .profile-overview");
    const narrowRule = cssBlock(profileCss, "@media (max-width: 900px)");
    const narrowOverview = cssBlock(narrowRule, ".main--profile .profile-overview");
    const heroBottom = (cssPixels(enclosureRule, "top") ?? 0) + (cssPixels(enclosureRule, "height") ?? 0);
    const signalTop = cssPixels(signalRule, "top") ?? 0;
    const signalBottom = signalTop + (cssPixels(signalRule, "height") ?? 0);
    const overviewHeight = cssPixels(overviewRule, "height") ?? 0;

    expect(signalTop).toBeGreaterThanOrEqual(heroBottom + 24);
    expect(overviewHeight).toBeGreaterThanOrEqual(signalBottom + 24);
    expect(tabletOverview).toContain("margin-top: 135px");
    expect(tabletOverview).toContain("transform: scale(.7)");
    expect(narrowOverview).toContain("flex-direction: column");
    expect(narrowOverview).toContain("gap: 24px");
  });

  it("uses clear authentic League scenery and circular Experience badges", () => {
    const shellCss = readFileSync("src/styles.css", "utf8");
    const profileCss = readFileSync("src/profile-overview.css", "utf8");
    const shellRule = shellCss.match(/\.main--profile\s*\{([^}]*)\}/)?.[1] ?? "";
    const badgeRule = profileCss.match(/\.profile-experience__mark\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(shellRule).toContain('url("/media/opening/gameflow-background.jpg")');
    expect(shellRule).toContain("linear-gradient(180deg,");
    expect(shellRule).not.toContain('url("/media/profile/the-void-background.jpg")');
    expect.soft(badgeRule).toMatch(/border-radius:\s*50%/);
  });

  it("reflows the Profile panel before the split becomes clipped or too small and contains its narrow enclosure", () => {
    const profileCss = readFileSync("src/profile-overview.css", "utf8");
    const tabletRules = cssBlock(profileCss, "@media (min-width: 1400px) and (max-width: 1858px)");
    const narrowRules = profileCss.split("@media (max-width: 900px)")[1] ?? "";
    const enclosureRule = narrowRules.match(/\.profile-project-panel__enclosure\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(profileCss).toContain("@media (min-width: 1400px) and (max-width: 1858px)");
    expect(tabletRules).toContain("grid-template-columns: 370px minmax(0, 1fr)");
    expect(tabletRules).toContain("grid-column: 1");
    expect(tabletRules).toContain("grid-column: 2");
    expect(enclosureRule).toContain("max-width: calc(100vw - 16px)");
    expect(enclosureRule).toContain("left: 50%");
    expect(enclosureRule).toContain("translateX(-50%)");
  });

  it("extends the 901–1099px enclosure past both project rows while keeping it inside the panel", () => {
    const profileCss = readFileSync("src/profile-overview.css", "utf8");
    const tabletRules = cssBlock(profileCss, "@media (max-width: 1858px) and (min-width: 901px)");
    const narrowTabletRules = cssBlock(profileCss, "@media (max-width: 1099px) and (min-width: 901px)");
    const panelRule = cssBlock(tabletRules, ".profile-project-panel");
    const baseEnclosureRule = cssBlock(tabletRules, ".profile-project-panel__enclosure");
    const narrowEnclosureRule = cssBlock(narrowTabletRules, ".profile-project-panel__enclosure");
    const projectGridRule = cssBlock(narrowTabletRules, ".profile-project-grid");
    const enclosureTop = cssPixels(narrowEnclosureRule, "top") ?? cssPixels(baseEnclosureRule, "top");
    const enclosureHeight = cssPixels(narrowEnclosureRule, "height") ?? cssPixels(baseEnclosureRule, "height");
    const gridBottom = (cssPixels(projectGridRule, "top") ?? 0) + (cssPixels(projectGridRule, "height") ?? 0);
    const enclosureBottom = (enclosureTop ?? 0) + (enclosureHeight ?? 0);
    const panelHeight = cssPixels(panelRule, "height") ?? 0;

    expect(enclosureBottom).toBeGreaterThanOrEqual(gridBottom);
    expect(enclosureBottom).toBeLessThanOrEqual(panelHeight);
  });
});
