// @vitest-environment happy-dom
import { act } from "react";
import { createRoot } from "react-dom/client";
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

function storyText(markup: string) {
  return markup
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

describe("Food Tracker product story", () => {
  it("moves from the product promise through logging, data, insights, retrieval, and release", () => {
    const markup = renderFoodTracker();
    const sections = [
      'id="food-overview"',
      'id="food-logging"',
      'id="food-architecture"',
      'id="food-insights"',
      'id="food-search"',
      'id="food-validation"',
    ];
    const positions = sections.map((anchor) => markup.indexOf(anchor));

    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(markup).not.toContain('id="food-evaluation"');
    expect(markup).not.toContain('href="#food-evaluation"');
    expect(markup).toContain("PRODUCT");
    expect(markup).toContain("LOGGING");
    expect(markup).toContain("DATA");
    expect(markup).toContain("INSIGHTS");
    expect(markup).toContain("SEARCH + EVAL");
    expect(markup).toContain("RELEASE");
  });

  it("states Joshua's product and technical ownership without claiming sole implementation", () => {
    const markup = renderFoodTracker();
    const opening = storyText(section(markup, "food-overview", "food-logging"));

    for (const copy of [
      "Simple tracking. Serious insight.",
      "I started Food Tracker for my own gym and nutrition routine",
      "I owned product direction, architecture, workflows, evaluation, and acceptance",
      "I also coded and debugged parts of the product",
      "Codex and AI agents implemented substantial product slices under my direction and review",
      "Simple and Complex share one app, backend, and data model",
    ]) expect(opening).toContain(copy);
    expect(opening).not.toContain("I built every part");
    expect(opening).not.toContain("AI built the product");
  });

  it("uses distinct Phase 24 logging and unknown-trend states without redundant banana screens", () => {
    const markup = renderFoodTracker();
    const logging = section(markup, "food-logging", "food-architecture");
    const insights = section(markup, "food-insights", "food-search");
    const captures = [...markup.matchAll(/<img\b[^>]*\/media\/case-studies\/food-tracker\/phase-24\//g)];
    const loggingCaptures = [...logging.matchAll(/<img\b[^>]*\/media\/case-studies\/food-tracker\/phase-24\//g)];
    const insightCaptures = [...insights.matchAll(/<img\b[^>]*\/media\/case-studies\/food-tracker\/phase-24\//g)];

    expect(captures).toHaveLength(3);
    expect(loggingCaptures).toHaveLength(2);
    expect(insightCaptures).toHaveLength(1);
    expect(logging).toContain("food-log-complex-clean.png");
    expect(logging).toContain('/media/case-studies/food-tracker/phase-24/ai-meal-review.png');
    expect(logging).toContain("368×800 iOS simulator captures from the pre-redesign baseline");
    expect(logging).toContain("The Describe-meal review is unsaved; it is interaction evidence, not a populated user outcome");
    expect(insights).toContain("trend-detail-calories-unknown.png");
    expect(insights).toContain("Unknown is shown explicitly; this is not a populated trend or personal result");
    expect(markup).not.toContain("food-serving-preview-banana.png");
    expect(markup).not.toContain("search-banana-results.png");
    expect(markup).not.toContain("trend-configuration.png");
    expect(markup).not.toContain("insights-week-current.png");
  });

  it("shows selectable, labeled entry methods and changes the live explanation", async () => {
    const actGlobal = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };
    const previousActEnvironment = actGlobal.IS_REACT_ACT_ENVIRONMENT;
    actGlobal.IS_REACT_ACT_ENVIRONMENT = true;
    const container = document.createElement("div");
    document.body.append(container);
    const root = createRoot(container);

    try {
      await act(async () => {
        root.render(
          <MemoryRouter>
            <FoodTrackerCaseStudy />
          </MemoryRouter>,
        );
      });

      const routeGroup = container.querySelector('[aria-label="Food logging routes"]');
      expect(routeGroup).not.toBeNull();
      for (const label of ["Search & reuse", "Barcode", "Describe or photo", "Recipes & mixed meals", "Manual entry"]) {
        expect(routeGroup?.textContent).toContain(label);
      }

      const describeButton = [...(routeGroup?.querySelectorAll("button") ?? [])].find((button) =>
        button.textContent?.includes("Describe or photo"),
      );
      expect(describeButton).not.toBeUndefined();
      if (!describeButton) return;

      await act(async () => {
        describeButton.click();
      });

      expect(describeButton.getAttribute("aria-pressed")).toBe("true");
      expect(container.querySelector(".food-log-transaction__method-detail")?.textContent)
        .toContain("Gemini suggests food and quantity; a person reviews the rows before saving.");
    } finally {
      await act(async () => root.unmount());
      container.remove();
      if (previousActEnvironment === undefined) delete actGlobal.IS_REACT_ACT_ENVIRONMENT;
      else actGlobal.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
    }
  });

  it("shows the many logging starts converging on one human-reviewed serving and snapshot contract", () => {
    const markup = renderFoodTracker();
    const logging = section(markup, "food-logging", "food-architecture");
    const loggingCopy = storyText(logging);

    expect(logging).toContain('class="food-log-transaction food-log-transaction--editorial"');
    for (const copy of [
      "Search & reuse",
      "Barcode",
      "Describe or photo",
      "Recipes & mixed meals",
      "Manual entry",
      "Review, edit, or remove proposed rows before saving.",
      "Shared backend serving resolution applies the chosen amount and unit.",
      "The saved log keeps a nutrition snapshot for its historical meaning.",
      "Unknown remains unknown; it is not filled with zero.",
      "The log can still be edited or deleted.",
      "A labeled, editable low-trust estimate can be requested for an unresolved text row; it does not become trusted catalog food.",
    ]) expect(loggingCopy).toContain(copy);
    expect(loggingCopy).not.toContain("AI determines authoritative nutrition");
    expect(loggingCopy).not.toContain("append-only");
    expect(loggingCopy).not.toContain("immutable food logs");
  });

  it("teaches the source-to-catalog-to-snapshot data architecture", () => {
    const markup = renderFoodTracker();
    const architecture = section(markup, "food-architecture", "food-insights");
    const architectureCopy = storyText(architecture);

    expect(architecture).toContain('class="food-data-contract"');
    expect(architecture).toContain('class="food-data-contract__normalization"');
    for (const copy of [
      "Open Food Facts",
      "packaged foods and barcode lookup",
      "USDA FoodData Central",
      "generic-food candidates",
      "CNF 2026",
      "Ciqual 2025",
      "CoFID 2021",
      "versioned bulk datasets",
      "keeping source identity and release attached",
      "Express + TypeScript API",
      "PostgreSQL food and nutrient catalog",
      "serving resolver",
      "food + source provenance",
      "basis quantity + unit",
      "requested serving",
      "resolution + multiplier",
      "nutrient basis + overrides",
      "12,363 active foods",
      "277,341 nutrient rows",
      "catalog scale, not users or impact",
    ]) expect(architectureCopy).toContain(copy);
    expect(architectureCopy).toContain("React Native + Expo");
    expect(architectureCopy).toContain("shared TypeScript + Zod contracts");
    expect(architectureCopy).toContain("One canonical food and nutrient model");
    expect(architectureCopy).toContain("Each saved serving keeps its source and resolved basis");
    expect(architectureCopy).not.toContain("live APIs for every national dataset lookup");
  });

  it("maps the full mobile-to-insight system before the focused nutrition data model", () => {
    const markup = renderFoodTracker();
    const architecture = section(markup, "food-architecture", "food-insights");
    const mapStart = architecture.indexOf('class="food-system-map"');
    const dataStart = architecture.indexOf('class="food-data-contract"');
    const systemMap = storyText(architecture.slice(mapStart, dataStart));

    expect(mapStart).toBeGreaterThanOrEqual(0);
    expect(dataStart).toBeGreaterThan(mapStart);
    for (const copy of [
      "React Native + Expo",
      "Simple and Complex share one mobile app",
      "Express + TypeScript API",
      "Prisma",
      "PostgreSQL",
      "Open Food Facts",
      "USDA FoodData Central",
      "CNF 2026",
      "Ciqual 2025",
      "CoFID 2021",
      "Deterministic retrieval",
      "Fuzzy retrieval",
      "Pinecone supplies semantic candidates",
      "Deterministic final ranking",
      "Gemini interprets food intent",
      "does not set trusted nutrition",
      "Deterministic analytics and recommendations",
      "Verify the caller, then derive a server-owned resource scope",
    ]) expect(systemMap.toLowerCase()).toContain(copy.toLowerCase());
  });

  it("separates logging-day eligibility from nutrient coverage and explains the two presentation depths", () => {
    const markup = renderFoodTracker();
    const insights = section(markup, "food-insights", "food-search");
    const insightsCopy = storyText(insights);

    expect(insights).toContain('class="food-insight-path"');
    expect(insights).toContain('class="food-insight-path__evidence"');
    expect(insights).toContain('class="food-insight-path__analysis"');
    expect(insights).toContain('class="food-insight-path__presentations-heading"');
    expect(insights).toContain("food-insight-path__view-daily");
    expect(insights).toContain("food-insight-path__view-range");
    expect(insights).toContain("trend-detail-calories-unknown.png");
    expect(insights.indexOf("01 / CHECK THE DATA")).toBeLessThan(insights.indexOf("02 / CHOOSE A VIEW"));
    for (const copy of [
      "Food logs",
      "Weight logs",
      "Goals",
      "Local tracking day",
      "A selected range changes the analysis; the underlying food log stays unchanged.",
      "COMPLETE · PARTIAL · UNLOGGED",
      "RECORDED · PARTIAL · UNKNOWN",
      "A logged day can still have an unknown nutrient.",
      "SIMPLE / CURATED DAILY READ",
      "Calories + macros",
      "Weight + hydration",
      "Logging consistency",
      "Recommendations use saved logs and goals.",
      "COMPLEX / DEEPER EXPLORATION",
      "More nutrients, custom ranges, comparisons, coverage controls, saved views, and deterministic forecasts",
      "Analytics and recommendation facts are deterministic backend facts",
      "AI does not fill missing values or decide recommendations",
      "Simple overview and recommendations",
      "Complex tabs: Overview, Nutrients, and Recommendations",
      "Trend views include calories, macros, weight, hydration, and logging consistency",
      "Unknown is shown explicitly; this is not a populated trend or personal result",
    ]) expect(insightsCopy).toContain(copy);
    expect(insightsCopy).not.toContain("Food logs · weight logs · goals · local tracking day");
    expect(insightsCopy).not.toContain("return to a chosen analysis without changing the underlying log");
    expect(insightsCopy).not.toContain("populated account report");
  });

  it("combines the bounded hybrid retrieval design and offline development/holdout evidence", () => {
    const markup = renderFoodTracker();
    const search = section(markup, "food-search", "food-validation");
    const searchCopy = storyText(search);

    expect(search).toContain('class="food-retrieval-evidence"');
    expect(search).toContain("How does the app find the intended food reliably?");
    expect(search).toContain('class="food-retrieval-evidence__top-one"');
    expect(search).toContain('role="img" aria-label="Top-1 offline ranking comparison');
    for (const copy of [
      "Exact / structured",
      "Fuzzy retrieval",
      "Recover close text when the typed name is imperfect",
      "Semantic candidates",
      "Pinecone expands the candidate set; it is a derived index.",
      "Pinecone expands the candidate set; it is a derived index.",
      "Deterministic, domain-aware ranking",
      "A person selects the food before shared serving resolution",
      "DEVELOPMENT",
      "80 queries",
      "HOLDOUT",
      "40 queries",
      "40/80",
      "71/80",
      "72/80",
      "25/40",
      "27/40",
      "28/40",
      "Semantic retrieval added substantial latency for little benchmark recovery",
      "Fuzzy retrieval drove most of the measured gain",
      "Offline ranking evidence, not live-user outcomes",
    ]) expect(searchCopy).toContain(copy);
    expect(searchCopy).not.toContain("31/40");
    expect(searchCopy).not.toContain("32/40");
    expect(searchCopy).not.toContain("semantic retrieval is faster");
    expect(searchCopy).not.toContain("Pinecone is nutrition authority");
  });

  it("ends on distinct quality, data-isolation, runtime, and release gates", () => {
    const markup = renderFoodTracker();
    const ending = section(markup, "food-validation");
    const endingCopy = storyText(ending);

    expect(ending).toContain('class="food-evidence-gates"');
    for (const copy of [
      "Correct code can still rank the wrong food.",
      "A relevant rank can still come from a partial index.",
      "A pagination bug once left the derived search index partial or stale.",
      "Firebase identifies the caller; the API derives the app-owned UUID and scopes data server-side.",
      "Railway staging and a standalone iOS installation were validated.",
      "This is not evidence of a public launch.",
      "Paid Apple distribution and Android standalone validation remain incomplete.",
      "Photo candidate adjudication and some manual checks remain untested; no claim of exhaustive image-path validation.",
      "I learned to ask what the evidence proves, then validate the ranking, index, and actual runtime separately.",
    ]) expect(endingCopy).toContain(copy);
    expect(endingCopy).not.toContain("15,000 users");
    expect(endingCopy).not.toContain("publicly launched");
  });

  it("teaches the identity-to-resource-scope security boundary", () => {
    const markup = renderFoodTracker();
    const ending = section(markup, "food-validation");
    const endingCopy = storyText(ending);

    expect(ending).toContain('class="food-security-boundary"');
    expect(ending).toContain('aria-label="Verified identity becomes a server-owned data scope"');
    for (const copy of [
      "Firebase ID token",
      "API verifies the token",
      "Map UID to app-owned UUID",
      "the client does not choose the owner ID.",
      "Scope each resource query",
      "SIGN OUT",
      "Clear user-specific local state.",
      "Authentication identifies the caller; authorization scopes each resource.",
      "This is implementation evidence, not a claim that every provider or native path was released.",
    ]) expect(endingCopy).toContain(copy);
    expect(endingCopy).not.toContain("every route is secure");
    expect(endingCopy).not.toContain("publicly launched");
  });
});
