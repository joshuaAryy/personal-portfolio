import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import FoodTrackerCaseStudy from "./FoodTrackerCaseStudy";

function renderFoodTracker() {
  return renderToStaticMarkup(
    <MemoryRouter>
      <FoodTrackerCaseStudy />
    </MemoryRouter>,
  );
}

function section(markup: string, id: string, nextId?: string) {
  const start = markup.indexOf(`id="${id}"`);
  const end = nextId ? markup.indexOf(`id="${nextId}"`, start + 1) : markup.length;
  return markup.slice(start, end);
}

describe("Food Tracker product story", () => {
  it("follows the product arc from logging to insights, retrieval, and validation", () => {
    const markup = renderFoodTracker();
    const sections = [
      'id="food-overview"',
      'id="food-logging"',
      'id="food-architecture"',
      'id="food-insights"',
      'id="food-search"',
      'id="food-evaluation"',
      'id="food-validation"',
    ];
    const positions = sections.map((anchor) => markup.indexOf(anchor));

    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(markup).not.toContain('id="food-interface"');
    expect(markup).not.toContain('id="food-workflow"');
    expect(markup).toContain('href="#food-search"');
    expect(markup).toContain('href="#food-evaluation"');
    expect(markup).toContain('href="#food-architecture"');
    expect(markup).toContain('href="#food-validation"');
  });

  it("frames the shared product and Joshua's product-direction ownership", () => {
    const markup = renderFoodTracker();
    const opening = section(markup, "food-overview", "food-logging");

    expect(opening).toContain("Simple food logs.");
    expect(opening).toContain("Trusted nutrition.");
    expect(opening).toContain("my own gym and nutrition routine");
    expect(opening).toContain("Simple and Complex share one app, backend, and data model");
    expect(opening).toContain("I set product direction, architecture, workflows, and evaluation");
    expect(opening).toContain("Codex and AI agents supported substantial implementation");
  });

  it("teaches the logging lifecycle and separates AI suggestions from nutrition authority", () => {
    const markup = renderFoodTracker();
    const logging = section(markup, "food-logging", "food-insights");

    expect(logging).toContain('class="food-log-lifecycle"');
    for (const copy of [
      "FIND OR REUSE",
      "Manual entry, catalog search, recent or reusable foods, and barcode lookup.",
      "DESCRIBE OR PHOTOGRAPH",
      "AI proposes foods and portions; it does not set trusted nutrition.",
      "RECIPES + MIXED MEALS",
      "REVIEW THE FOOD + PORTION",
      "BACKEND SERVING RESOLUTION",
      "SAVED SERVING + NUTRITION SNAPSHOT",
      "History keeps the serving basis; unknown nutrition stays unknown.",
      "A snapshot-backed serving edit recalculates from its stored basis",
      "recipe and mixed-meal edits have different constraints",
    ]) expect(logging).toContain(copy);
    expect(logging).not.toContain("AI determines calories");
    expect(logging).not.toContain("append-only");
    expect(logging).not.toContain("immutable history");
  });

  it("uses authentic Phase 24 captures to show review-before-save and analytics setup", () => {
    const markup = renderFoodTracker();
    const logging = section(markup, "food-logging", "food-architecture");
    const insights = section(markup, "food-insights", "food-search");

    expect(logging).toContain('/media/case-studies/food-tracker/phase-24/ai-meal-review.png');
    expect(logging).toContain("Review before saving");
    expect(logging).toContain("not saved");
    expect(insights).toContain('/media/case-studies/food-tracker/phase-24/trend-configuration.png');
    expect(insights).toContain("setup capture, not a populated analytics result");
  });

  it("shows the verified mobile, API, provider, and authoritative-data relationships", () => {
    const markup = renderFoodTracker();
    const architecture = section(markup, "food-architecture", "food-insights");

    for (const copy of [
      "React Native + Expo",
      "Express + TypeScript API",
      "Prisma",
      "PostgreSQL",
      "Open Food Facts",
      "USDA FoodData Central",
      "Canadian Nutrient File 2026",
      "Ciqual 2025",
      "CoFID 2021",
      "source provenance",
      "serving and nutrition snapshots",
      "Unknown is not zero",
      "AI suggests intent or portions; trusted food data and backend rules govern nutrition.",
    ]) expect(architecture).toContain(copy);
    expect(architecture).toContain('class="food-system-map"');
    expect(architecture).not.toContain("Pinecone is the nutrition source");
  });

  it("shows Simple and Complex as two views over the same deterministic insights", () => {
    const markup = renderFoodTracker();
    const insights = section(markup, "food-insights", "food-search");

    expect(insights).toContain('class="food-insights-model"');
    expect(insights).toContain("SAVED FOOD LOGS");
    expect(insights).toContain("DETERMINISTIC ANALYTICS");
    expect(insights).toContain("COVERAGE STAYS VISIBLE");
    expect(insights).toContain("Focused daily overview");
    expect(insights).toContain("Core progress, selected trends, and curated recommendations");
    expect(insights).toContain("More nutrients, comparisons, custom ranges, coverage controls, and saved views");
    expect(insights).toContain("ONE PRODUCT · DIFFERENT LEVELS OF DETAIL");
    expect(insights).toContain("Recorded, partial, and unknown data stay distinct.");
    expect(insights).toContain('/media/case-studies/food-tracker/phase-24/trend-configuration.png');
    expect(insights).toContain("setup capture, not a populated analytics result");
    expect(insights).not.toContain("Return to a chosen analysis without changing the underlying log");
  });

  it("keeps hybrid retrieval and its offline development/holdout results distinct", () => {
    const markup = renderFoodTracker();
    const retrieval = section(markup, "food-search", "food-evaluation");

    expect(retrieval).toContain('class="food-retrieval-flow"');
    expect(retrieval).toContain("DETERMINISTIC");
    expect(retrieval).toContain("FUZZY");
    expect(retrieval).toContain("SEMANTIC CANDIDATES");
    expect(retrieval).toContain("Pinecone supplies candidates only");
    expect(retrieval).toContain("Rules decide final rank");
    expect(retrieval).toContain("semantic retrieval added substantial latency for little benchmark recovery");
    expect(retrieval).not.toContain("31/40");
    expect(retrieval).not.toContain("32/40");
  });

  it("separates the development and holdout benchmark and keeps its three ranking cutoffs", () => {
    const markup = renderFoodTracker();
    const evaluation = section(markup, "food-evaluation", "food-validation");

    for (const result of ["40/80", "71/80", "72/80", "25/40", "27/40", "28/40"]) {
      expect(evaluation).toContain(result);
    }
    expect(evaluation).toContain("DEVELOPMENT · 80 QUERIES");
    expect(evaluation).toContain("HOLDOUT · 40 QUERIES");
    expect(evaluation).toContain("Offline search relevance, not live-user outcomes");
    expect(evaluation).not.toContain("fuzzy-only recovery");
  });

  it("ends with separate relevance, index-completeness, identity, and release checks", () => {
    const markup = renderFoodTracker();
    const ending = section(markup, "food-validation");

    for (const copy of [
      "RELEVANCE",
      "INDEX COMPLETENESS",
      "DATA SCOPE + RELEASE",
      "Code tests passed while search relevance was still poor.",
      "A pagination bug left the search index partial or stale.",
      "Firebase identities map to app-owned user IDs; protected API routes derive record ownership on the server.",
      "The repository records validated Railway staging and a standalone iOS install.",
      "Paid Apple distribution remains deferred, and Android standalone validation is incomplete.",
      "The pinned repository records validated Railway staging and a free-Xcode standalone iOS install, not a public launch.",
    ]) expect(ending).toContain(copy);
    expect(ending).not.toContain("15,000 users");
    expect(ending).not.toContain("live adoption");
  });

  it("uses native technical figures and avoids weak or duplicate Phase 24 captures", () => {
    const markup = renderFoodTracker();

    expect(markup).toContain('class="food-log-lifecycle"');
    expect(markup).toContain('class="food-system-map"');
    expect(markup).toContain('class="food-insights-model"');
    expect(markup).toContain('class="food-retrieval-flow"');
    expect(markup).toContain('class="food-benchmark"');
    expect(markup).not.toContain("search-banana-results.png");
    expect(markup).not.toContain("food-serving-preview-banana.png");
    expect(markup).not.toContain("insights-week-current.png");
    expect(markup).not.toContain("trend-detail-calories-unknown.png");
  });
});
