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

  it("frames the return on saved daily data as useful understanding over time", () => {
    const markup = renderFoodTracker();

    expect(markup).toContain("Turn saved daily food data into useful views over time");
    expect(markup).toContain("Snapshot-backed logs support progress, analysis, and recommendations.");
    expect(markup).not.toContain("Make a longer view possible");
  });

  it("uses authentic Search and serving captures, and labels pre-redesign evidence", () => {
    const markup = renderFoodTracker();
    const logging = section(markup, "food-logging", "food-architecture");
    const insights = section(markup, "food-insights", "food-search");
    const captures = [...markup.matchAll(/<img\b[^>]*\/media\/case-studies\/food-tracker\/phase-24\//g)];
    const loggingCaptures = [...logging.matchAll(/<img\b[^>]*\/media\/case-studies\/food-tracker\/phase-24\//g)];
    const insightCaptures = [...insights.matchAll(/<img\b[^>]*\/media\/case-studies\/food-tracker\/phase-24\//g)];

    expect(captures).toHaveLength(3);
    expect(loggingCaptures).toHaveLength(2);
    expect(insightCaptures).toHaveLength(1);
    expect(logging).toContain("search-banana-results.png");
    expect(logging).toContain("food-serving-preview-banana.png");
    expect(logging).not.toContain("food-log-complex-clean.png");
    expect(logging).not.toContain("ai-meal-review.png");
    expect(logging).toContain("Phase 24 search results");
    expect(logging).toContain("Phase 24 serving preview");
    expect(logging).toContain("368×800 iOS simulator captures from the pre-redesign baseline");
    expect(insights).toContain("trend-detail-calories-unknown.png");
    expect(insights).toContain("Unknown is shown explicitly; this is not a populated trend or personal result");
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
      expect([...container.querySelectorAll(".food-log-transaction__method-steps li")].map((step) => ({
        number: step.querySelector("span")?.textContent,
        label: step.querySelector("small")?.textContent,
        text: step.querySelector("strong")?.textContent,
      }))).toEqual([
        { number: "01", label: "TEXT OR PHOTO", text: "Text or photo request" },
        { number: "02", label: "SUGGEST", text: "Gemini suggests food + quantity" },
        { number: "03", label: "HUMAN CHECK", text: "Review or edit proposed rows" },
      ]);
      expect(container.querySelector('[data-screen="review"] img')?.getAttribute("src"))
        .toContain("ai-meal-review.png");
      expect(container.querySelector('[data-screen="review"] figcaption')?.textContent)
        .toContain("unsaved interaction evidence");
      expect(container.querySelector('[data-screen="search-results"]')).toBeNull();

      const barcodeButton = [...(routeGroup?.querySelectorAll("button") ?? [])].find((button) =>
        button.textContent?.includes("Barcode"),
      );
      expect(barcodeButton).not.toBeUndefined();
      if (!barcodeButton) return;

      await act(async () => {
        barcodeButton.click();
      });
      expect(barcodeButton.getAttribute("aria-pressed")).toBe("true");
      expect([...container.querySelectorAll(".food-log-transaction__method-steps li")].map((step) => ({
        number: step.querySelector("span")?.textContent,
        label: step.querySelector("small")?.textContent,
        text: step.querySelector("strong")?.textContent,
      }))).toEqual([
        { number: "01", label: "SCAN", text: "Scan or enter a code" },
        { number: "02", label: "LOOKUP", text: "Open Food Facts candidate" },
        { number: "03", label: "HUMAN CHECK", text: "Confirm the match + serving" },
      ]);
      expect(container.querySelector('[data-screen="entry-options"] img')?.getAttribute("src"))
        .toContain("food-log-complex-clean.png");
      expect(container.querySelector('[data-screen="entry-options"] figcaption')?.textContent)
        .toContain("entry options only");
      expect(container.querySelector('[data-screen="search-results"]')).toBeNull();
    } finally {
      await act(async () => root.unmount());
      container.remove();
      if (previousActEnvironment === undefined) delete actGlobal.IS_REACT_ACT_ENVIRONMENT;
      else actGlobal.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
    }
  });

  it("reveals source-labeled conceptual diagrams for barcode, recipe, and manual routes", async () => {
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
      const routeCases = [
        {
          label: "Barcode",
          id: "barcode",
          accessibleName: "Conceptual barcode lookup path",
          concepts: ["PRODUCT CODE", "OPEN FOOD FACTS", "MATCH + SERVING"],
          caption: "not a completed scan",
        },
        {
          label: "Recipes & mixed meals",
          id: "recipes",
          accessibleName: "Conceptual recipe and mixed-meal composition path",
          concepts: ["SAVED FOODS", "MANUAL ENTRY", "RECIPE OR MIXED MEAL", "SERVING BASIS"],
          caption: "not a completed recipe or mixed meal",
        },
        {
          label: "Manual entry",
          id: "manual",
          accessibleName: "Conceptual manual-entry path",
          concepts: ["KNOWN VALUES", "UNKNOWN STAYS UNKNOWN", "SERVING BASIS"],
          caption: "not a saved manual food",
        },
      ];

      for (const routeCase of routeCases) {
        const button = [...(routeGroup?.querySelectorAll("button") ?? [])].find((candidate) =>
          candidate.textContent?.includes(routeCase.label),
        );
        expect(button).not.toBeUndefined();
        if (!button) continue;

        await act(async () => button.click());
        expect(button.getAttribute("aria-pressed")).toBe("true");

        const figure = container.querySelector(`figure[data-conceptual-flow="${routeCase.id}"]`);
        expect(figure?.getAttribute("aria-label")).toBe(routeCase.accessibleName);
        expect(figure?.querySelector("figcaption")?.textContent).toContain("Conceptual path");
        expect(figure?.querySelector("figcaption")?.textContent).toContain(routeCase.caption);
        for (const concept of routeCase.concepts) expect(figure?.textContent).toContain(concept);
      }
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

  it("teaches app, API, catalog, and historical serving relationships", () => {
    const markup = renderFoodTracker();
    const architecture = section(markup, "food-architecture", "food-insights");
    const architectureCopy = storyText(architecture);

    expect(architecture).toContain('class="food-data-contract"');
    expect(architecture).toContain('class="food-system-map__overview"');
    expect(architecture).toContain('aria-label="Conceptual Food Tracker architecture"');
    expect(architecture).toContain('class="food-data-contract__model"');
    expect(architecture).toContain("CONCEPTUAL MODEL");
    for (const copy of [
      "Open Food Facts",
      "packaged foods and barcode lookup",
      "USDA FoodData Central",
      "generic-food candidates",
      "CNF 2026",
      "Ciqual 2025",
      "CoFID 2021",
      "versioned bulk datasets",
      "Adapters retain source identity and dataset release.",
      "Reusable food identity",
      "Normalized nutrients + serving options",
      "Historical serving snapshot",
      "Food item identity is reusable catalog data:",
      "Nutrient values and serving options retain source and units",
      "Recipes and mixed meals compose foods; they are not a separate nutrition authority.",
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
    expect(architectureCopy).toContain("Express + TypeScript API");
    expect(architectureCopy).toContain("PostgreSQL");
    expect(architectureCopy).toContain("Shared TypeScript + Zod contracts");
    expect(architectureCopy).toContain("Each saved serving keeps its source and resolved basis");
    expect(architectureCopy).not.toContain("live APIs for every national dataset lookup");
  });

  it("starts the system map with a visible retrieval path before the focused nutrition data model", () => {
    const markup = renderFoodTracker();
    const architecture = section(markup, "food-architecture", "food-insights");
    const mapStart = architecture.indexOf('class="food-system-map"');
    const dataStart = architecture.indexOf('class="food-data-contract"');
    const systemMap = storyText(architecture.slice(mapStart, dataStart));

    expect(mapStart).toBeGreaterThanOrEqual(0);
    expect(dataStart).toBeGreaterThan(mapStart);
    expect(architecture).toContain('aria-label="Conceptual Food Tracker architecture"');
    expect(architecture).toContain('aria-label="Food Tracker system paths"');
    expect(architecture).toContain('class="food-system-map__trace food-system-map__trace--4"');
    for (const copy of [
      "React Native + Expo",
      "Simple and Complex share one mobile app",
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
    ]) expect(systemMap.toLowerCase()).toContain(copy.toLowerCase());
  });

  it("selects a legible architecture path for retrieval, save, AI review, insights, or account scope", async () => {
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

      const paths = container.querySelector('[aria-label="Food Tracker system paths"]');
      expect(paths).not.toBeNull();
      const choices = [
        ["Find a food", ["Open Food Facts", "USDA FoodData Central", "Pinecone", "deterministic final ranking"]],
        ["Save a serving", ["Express + TypeScript API", "serving resolver", "PostgreSQL", "nutrition snapshot"]],
        ["Review an AI suggestion", ["Text or photo", "Gemini", "Person", "trusted nutrition"]],
        ["Read Insights", ["persisted logs", "weight", "goals", "deterministic analytics", "Simple", "Complex"]],
        ["Protect account data", ["Verify the caller", "server-owned resource scope", "PostgreSQL"]],
      ] as const;

      for (const [label, expected] of choices) {
        const button = [...(paths?.querySelectorAll("button") ?? [])].find((item) => item.textContent?.includes(label));
        expect(button).not.toBeUndefined();
        if (!button) continue;

        await act(async () => {
          button.click();
        });

        expect(button.getAttribute("aria-pressed")).toBe("true");
        const detail = container.querySelector(".food-system-map__selected")?.textContent?.replace(/\s+/g, " ").trim() ?? "";
        for (const copy of expected) expect(detail.toLowerCase()).toContain(copy.toLowerCase());
      }
    } finally {
      await act(async () => root.unmount());
      container.remove();
      if (previousActEnvironment === undefined) delete actGlobal.IS_REACT_ACT_ENVIRONMENT;
      else actGlobal.IS_REACT_ACT_ENVIRONMENT = previousActEnvironment;
    }
  });

  it("separates logging-day eligibility from nutrient coverage and explains the two presentation depths", () => {
    const markup = renderFoodTracker();
    const insights = section(markup, "food-insights", "food-search");
    const insightsCopy = storyText(insights);

    expect(insights).toContain('class="food-insight-path"');
    expect(insights).toContain('class="food-insight-path__evidence food-insight-path__evidence--readable"');
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

  it("keeps one compact verified runtime and ownership proof", () => {
    const markup = renderFoodTracker();
    const ending = section(markup, "food-validation");
    const endingCopy = storyText(ending);

    expect(ending).not.toContain('class="food-security-boundary"');
    expect(ending).toContain('class="food-evidence-gates__checks"');
    for (const copy of [
      "03 / RUNTIME + OWNERSHIP",
      "Firebase identifies the caller; the API derives the app-owned UUID and scopes data server-side.",
      "This is not evidence of a public launch.",
    ]) expect(endingCopy).toContain(copy);
    expect(endingCopy).not.toContain("every route is secure");
    expect(endingCopy).not.toContain("publicly launched");
  });
});
