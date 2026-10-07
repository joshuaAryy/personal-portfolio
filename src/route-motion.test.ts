import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const routeMotion = readFileSync(new URL("./route-motion.css", import.meta.url), "utf8");
const reducedMotionRules = routeMotion.split("@media (prefers-reduced-motion: reduce)")[1] ?? "";
const routeSources = {
  demos: readFileSync(new URL("./DemosPage.tsx", import.meta.url), "utf8"),
  educationProjects: readFileSync(new URL("./EducationProjects.tsx", import.meta.url), "utf8"),
  highlights: readFileSync(new URL("./PersonalHighlightsPage.tsx", import.meta.url), "utf8"),
  home: readFileSync(new URL("./HomeExplore.tsx", import.meta.url), "utf8"),
  fraymakers: readFileSync(new URL("./FraymakersCase.tsx", import.meta.url), "utf8"),
  lobby: readFileSync(new URL("./Lobby.tsx", import.meta.url), "utf8"),
  stush: readFileSync(new URL("./StushPattiesCase.tsx", import.meta.url), "utf8"),
  food: readFileSync(new URL("./FoodTrackerCaseStudy.tsx", import.meta.url), "utf8"),
  crest: readFileSync(new URL("./CrestCaseStudy.tsx", import.meta.url), "utf8"),
  cho: readFileSync(new URL("./ChoViegoCase.tsx", import.meta.url), "utf8"),
  living: readFileSync(new URL("./LivingInSilicoCase.tsx", import.meta.url), "utf8"),
};

describe("route entry motion", () => {
  it("reduces semantic entry groups to a short, stationary reveal", () => {
    expect(reducedMotionRules).toContain(".main [data-route-entry]");
    expect(reducedMotionRules).toContain("animation-duration: 100ms !important");
    expect(reducedMotionRules).toContain("animation-delay: 0ms !important");
    expect(reducedMotionRules).toContain("translate: none !important");
    expect(reducedMotionRules).toContain("filter: none !important");
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
    expect(routeSources.fraymakers).toContain('className="fray-case__hero-figure"');
    expect(routeSources.stush).toContain('className="stush-data-hero"');
    expect(routeMotion).not.toContain(".main--detail .demo-stage");
    expect(routeMotion).not.toContain(".fray-case__hero,");

    [
      ".main--demos .demo-stage",
      ".main--education-projects .education-projects__heading",
      ".main--personal-highlights .personal-highlights__intro",
    ].forEach((selector) => expect(reducedMotionRules).toContain(selector));
    expect(reducedMotionRules).toContain(".main [data-route-entry]");
  });

  it("stages lobby card, medallion, and details within one bounded clock", () => {
    expect(routeSources.lobby).toContain('className={`league-banner__medallion ${medallionFit}`}');
    expect(routeSources.lobby).toContain('className="league-banner__name"');
    expect(routeMotion).toContain('.main--lobby .league-banner [data-route-entry="identity"]');
    expect(routeMotion).toContain('.main--lobby .league-banner [data-route-entry="details"]');
    expect(routeMotion).toContain("--route-card-stagger: 180ms");
    expect(routeMotion).toContain("calc(250ms + var(--route-card-stagger, 0ms))");
    expect(reducedMotionRules).toContain(".main [data-route-entry]");
  });

  it("marks the route-entry groups on Home, lobby, and each case-study opening", () => {
    for (const group of ["environment", "banner", "identity", "details"]) {
      expect(routeSources.lobby).toContain(`data-route-entry="${group}"`);
    }
    for (const group of ["banner", "identity", "details"]) {
      expect(routeSources.home).toContain(`data-route-entry="${group}"`);
    }
    for (const source of [
      routeSources.food,
      routeSources.crest,
      routeSources.cho,
      routeSources.fraymakers,
      routeSources.living,
      routeSources.stush,
    ]) {
      for (const group of ["frame", "identity", "headline", "summary", "evidence"]) {
        expect(source).toContain(`data-route-entry="${group}"`);
      }
    }
  });

  it("uses one timed entry clock with compact movement and an immediate reduced state", () => {
    expect(routeMotion).toContain('[data-route-entry="frame"]');
    expect(routeMotion).toContain('[data-route-entry="identity"]');
    expect(routeMotion).toContain('[data-route-entry="headline"]');
    expect(routeMotion).toContain('[data-route-entry="summary"]');
    expect(routeMotion).toContain('[data-route-entry="evidence"]');
    expect(routeMotion).toContain("--route-entry-identity-delay: 100ms");
    expect(routeMotion).toContain("--route-entry-headline-delay: 200ms");
    expect(routeMotion).toContain("--route-entry-summary-delay: 280ms");
    expect(routeMotion).toContain("--route-entry-evidence-delay: 380ms");
    expect(reducedMotionRules).toContain("animation-duration: 100ms !important");
    expect(reducedMotionRules).toContain("animation-delay: 0ms !important");
    expect(reducedMotionRules).toContain("translate: none !important");
    expect(routeMotion).not.toContain(".main > :first-child");
  });
});
