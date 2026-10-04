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
  it("opens each project from its identity and keeps verified source links icon-sized", () => {
    const markup = renderProfile();

    expect(markup).toContain('href="/projects/food-tracker"');
    expect(markup).toContain('href="/projects/choveigo"');
    expect(markup).toContain('href="/projects/crest"');
    expect(markup).toContain('href="/projects/fraymakers"');
    expect(markup).toContain('href="https://github.com/joshuaAryy/food-tracker"');
    expect(markup).toContain('aria-label="Open Food Tracker source repository"');
    expect(markup).toContain('aria-label="Joshua Aryeetey profile"');
    expect(markup).toContain('alt="Joshua Aryeetey"');
    expect(markup).toContain("/media/profile/food-tracker-mark.svg");
    expect(markup).toContain("/media/profile/profile-crest-emblem.png");
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

  it("keeps the four lower Figma signals as static summaries with Projects selected", () => {
    const markup = renderProfile();

    expect(markup).toContain('role="group" aria-label="Profile summary details"');
    expect(markup.match(/class="profile-signal(?:\s[^"]*)?"/g)).toHaveLength(4);
    expect(markup).toContain('<h2 id="profile-panel-heading">PROJECTS</h2>');
    expect(markup).toContain('<span class="profile-signal__label">PROJECTS</span>');
    expect(markup).toContain('<span class="profile-signal__value">2028</span>');
    expect(markup).not.toContain("profile-tab-");
    expect(markup).not.toContain('role="tablist"');
    expect(markup).not.toContain('role="tabpanel"');
  });

  it("keeps the smoky Profile field and circular Experience badges from the current Figma treatment", () => {
    const shellCss = readFileSync("src/styles.css", "utf8");
    const profileCss = readFileSync("src/profile-overview.css", "utf8");
    const shellRule = shellCss.match(/\.main--profile\s*\{([^}]*)\}/)?.[1] ?? "";
    const badgeRule = profileCss.match(/\.profile-experience__mark\s*\{([^}]*)\}/)?.[1] ?? "";

    expect.soft(shellRule).toContain('url("/media/profile/the-void-background.jpg")');
    expect.soft(badgeRule).toMatch(/border-radius:\s*50%/);
  });

  it("reflows the Profile panel before the split becomes clipped or too small and contains its narrow enclosure", () => {
    const profileCss = readFileSync("src/profile-overview.css", "utf8");
    const tabletRules = profileCss.match(
      /@media\s*\(max-width:\s*1858px\)\s*and\s*\(min-width:\s*901px\)\s*\{([\s\S]*)$/,
    )?.[1] ?? "";
    const narrowRules = profileCss.split("@media (max-width: 900px)")[1] ?? "";
    const enclosureRule = narrowRules.match(/\.profile-project-panel__enclosure\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(tabletRules).toContain("flex-direction: column");
    expect(tabletRules).toContain("transform: none");
    expect(tabletRules).toContain("width: min(100%, 1090px)");
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
