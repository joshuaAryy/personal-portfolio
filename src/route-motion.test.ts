import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const routeMotion = readFileSync(new URL("./route-motion.css", import.meta.url), "utf8");
const reducedMotionRules = routeMotion.split("@media (prefers-reduced-motion: reduce)")[1] ?? "";
const routeSources = {
  demos: readFileSync(new URL("./DemosPage.tsx", import.meta.url), "utf8"),
  educationProjects: readFileSync(new URL("./EducationProjects.tsx", import.meta.url), "utf8"),
  highlights: readFileSync(new URL("./PersonalHighlightsPage.tsx", import.meta.url), "utf8"),
  fraymakers: readFileSync(new URL("./FraymakersCase.tsx", import.meta.url), "utf8"),
  lobby: readFileSync(new URL("./Lobby.tsx", import.meta.url), "utf8"),
  stush: readFileSync(new URL("./StushPattiesCase.tsx", import.meta.url), "utf8"),
};

describe("route entry motion", () => {
  it("reduces the actual lobby details and tray without leaving their stagger delay", () => {
    expect(reducedMotionRules).toContain(".main--lobby .league-role-legend");
    expect(reducedMotionRules).toContain(".main--lobby .selected-tray");
    expect(reducedMotionRules).toContain("animation-duration: 140ms !important");
    expect(reducedMotionRules).toContain("animation-delay: 0ms !important");
  });

  it("targets the visible entry elements used by detail routes", () => {
    expect(routeSources.demos).toContain('pageClass="main--demos"');
    expect(routeSources.demos).toContain('className="demo-stage"');
    expect(routeMotion).toContain(".main--demos .demo-stage");

    expect(routeSources.educationProjects).toContain('className="education-projects__heading"');
    expect(routeMotion).toContain(".main--education-projects .education-projects__heading");

    expect(routeSources.highlights).toContain('className="personal-highlights__intro"');
    expect(routeMotion).toContain(".main--personal-highlights .personal-highlights__intro");

    expect(routeSources.fraymakers).toContain('className="fray-case__intro"');
    expect(routeSources.fraymakers).toContain('className="fray-case__hero-system"');
    expect(routeMotion).toContain(".main--fraymakers-case .fray-case__intro");
    expect(routeMotion).toContain(".main--fraymakers-case .fray-case__hero-system");

    expect(routeSources.stush).toContain('className="stush-data-hero"');
    expect(routeMotion).toContain(".main--stush-case .stush-data-hero");
    expect(routeMotion).not.toContain(".main--detail .demo-stage");
    expect(routeMotion).not.toContain(".fray-case__hero,");

    [
      ".main--demos .demo-stage",
      ".main--education-projects .education-projects__heading",
      ".main--personal-highlights .personal-highlights__intro",
      ".main--fraymakers-case .fray-case__intro",
      ".main--fraymakers-case .fray-case__hero-system",
      ".main--stush-case .stush-data-hero",
    ].forEach((selector) => expect(reducedMotionRules).toContain(selector));
  });

  it("stages each lobby medallion before its descriptive text resolves", () => {
    expect(routeSources.lobby).toContain('className={`league-banner__medallion ${medallionFit}`}');
    expect(routeSources.lobby).toContain('className="league-banner__name"');
    expect(routeMotion).toContain(".main--lobby .league-banner__medallion");
    expect(routeMotion).toContain(".main--lobby :is(.league-banner__name");
    expect(routeMotion).toContain(".league-banner__subtitle");
    expect(routeMotion).toContain("calc(var(--lobby-card-delay) + 45ms)");
    expect(routeMotion).toContain("calc(var(--lobby-card-delay) + 155ms)");
    expect(reducedMotionRules).toContain(".main--lobby .league-banner__medallion");
    expect(reducedMotionRules).toContain(".main--lobby :is(.league-banner__name");
  });
});
