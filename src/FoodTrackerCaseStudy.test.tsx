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

    expect(captures).toHaveLength(4);
    expect(loggingCaptures).toHaveLength(2);
    expect(insightCaptures).toHaveLength(2);
    expect(logging).toContain("search-banana-results.png");
    expect(logging).toContain("food-serving-preview-banana.png");
    expect(logging).not.toContain("food-log-complex-clean.png");
    expect(logging).not.toContain("ai-meal-review.png");
    expect(logging).toContain("Phase 24 search results");
    expect(logging).toContain("Phase 24 serving preview");
    expect(logging).toContain("368×800 iOS simulator captures from the pre-redesign baseline");
    expect(insights).toContain("insights-month-populated-sep08-oct07.png");
    expect(insights).toContain("QA-A staging capture");
    expect(insights).toContain("five logged days.");
    expect(insights).not.toContain("trend-detail-calories-unknown.png");
    expect(insights).not.toContain("trend-configuration.png");
    expect(insights).toContain("goal-plan.png");
    expect(insights).toContain("One QA-profile recommendation capture; not a general result or outcome.");
    expect(insights).toContain("Recommendations, not promises.");
    expect(markup).not.toContain("trends-overview.png");
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
      expect(container.querySelector('[data-screen="entry-options"]')).toBeNull();
      expect(container.querySelector('figure[data-conceptual-flow="barcode"]')).not.toBeNull();
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
        expect(container.querySelector(".food-log-transaction__screens")?.contains(figure ?? null)).toBe(true);
        expect(container.querySelector(".food-log-transaction__method-detail figure[data-conceptual-flow]")).toBeNull();
        expect(container.querySelector('[data-screen="entry-options"]')).toBeNull();
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

  it("teaches verified app, API, provider, and historical serving relationships", () => {
    const markup = renderFoodTracker();
    const architecture = section(markup, "food-architecture", "food-insights");
    const architectureCopy = storyText(architecture);

    expect(architecture).toContain('class="food-data-contract"');
    expect(architecture).toContain('class="food-system-map__spine"');
    expect(architecture).toContain('aria-label="Shared architecture anchors"');
    expect(architecture).toContain('class="food-system-map__identity-note"');
    expect(architecture).toContain('class="food-system-map__paths"');
    expect(architecture).toContain('class="food-data-contract__normalized-record"');
    expect(architecture).toContain('class="food-data-contract__unknown-state"');
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
      "provider identity and dataset release",
      "Reusable food identity",
      "Normalized nutrients, units, and serving options",
      "Keep the nutrition basis used at save.",
      "name, brand, or barcode",
      "nutrient values with aligned units",
      "UNKNOWN",
      "kept distinct from zero",
      "Recipes and mixed meals compose foods; they are not a separate nutrition authority.",
      "food + source provenance",
      "confirmed amount + unit",
      "resolved basis + multiplier",
      "nutrient basis at save",
      "12,363 active foods",
      "277,341 nutrient rows",
      "Reference data scale, not users or impact.",
    ]) expect(architectureCopy).toContain(copy);
    expect(architectureCopy).toContain("React Native + Expo");
    expect(architectureCopy).toContain("Express + TypeScript API");
    expect(architectureCopy).toContain("Prisma");
    expect(architectureCopy).toContain("PostgreSQL");
    expect(architectureCopy).toContain("Shared TypeScript + Zod contracts");
    expect(architectureCopy).toContain("Firebase");
    expect(architectureCopy).toContain("API-derived resource scope");
    expect(architectureCopy).toContain("Pinecone returns semantic candidates only");
    expect(architectureCopy).toContain("the API ranks deterministically");
    expect(architectureCopy).toContain("Gemini proposes food and quantity");
    expect(architectureCopy).toContain("Human review");
    expect(architectureCopy).toContain("Deterministic analysis + recommendations");
    expect(architectureCopy).toContain("Simple + Complex views");
    expect(architectureCopy).toContain("change presentation depth over the same deterministic analysis and backend");
    expect(architectureCopy).toContain("not deployment status");
    expect(architectureCopy).not.toContain("live APIs for every national dataset lookup");
  });

  it("uses one shared architecture spine for three connected product paths", () => {
    const markup = renderFoodTracker();
    const architecture = section(markup, "food-architecture", "food-insights");
    const map = architecture.slice(architecture.indexOf('class="food-system-map"'), architecture.indexOf('class="food-data-contract"'));

    expect(map).toContain('class="food-system-map__canvas"');
    expect((map.match(/class="food-system-map__anchor food-system-map__anchor--mobile"/g) ?? []).length).toBe(1);
    expect((map.match(/class="food-system-map__anchor food-system-map__anchor--api"/g) ?? []).length).toBe(1);
    expect((map.match(/class="food-system-map__anchor food-system-map__anchor--persistence"/g) ?? []).length).toBe(1);
    expect((map.match(/class="food-system-map__path-lane(?:\s|")/g) ?? []).length).toBe(3);
    expect(map).toContain('data-path="find-resolve"');
    expect(map).toContain('data-path="interpret-review"');
    expect(map).toContain('data-path="read-history"');
    expect(map).toContain("CNF 2026");
    expect(map).toContain("Pinecone returns semantic candidates only");
    expect(map).toContain("Gemini proposes food and quantity");
    expect(map).toContain("API-derived resource scope");
    expect(map).not.toContain('class="food-system-map__flow-route');
  });

  it("shows the complete architecture in the default view without a second interactive trace", () => {
    const markup = renderFoodTracker();
    const architecture = section(markup, "food-architecture", "food-insights");
    const systemMap = storyText(architecture.slice(architecture.indexOf('class="food-system-map"'), architecture.indexOf('class="food-data-contract"')));

    expect(systemMap).toContain("React Native + Expo");
    expect(systemMap).toContain("Express + TypeScript API");
    expect(systemMap).toContain("Prisma");
    expect(systemMap).toContain("PostgreSQL");
    expect(systemMap).toContain("Firebase");
    expect(systemMap).toContain("Open Food Facts");
    expect(systemMap).toContain("USDA FoodData Central");
    expect(systemMap).toContain("CNF 2026");
    expect(systemMap).toContain("Ciqual 2025");
    expect(systemMap).toContain("CoFID 2021");
    expect(systemMap).toContain("Pinecone returns semantic candidates only");
    expect(systemMap).toContain("Gemini proposes food and quantity");
    expect(systemMap).toContain("Human review");
    expect(systemMap).toContain("Deterministic analysis + recommendations");
    expect(systemMap).toContain("Simple + Complex");
    expect(architecture).not.toContain('aria-label="Food Tracker system paths"');
    expect(architecture).not.toContain("food-system-map__path-selector");
    expect(architecture).not.toContain("food-system-map__selected");
  });

  it("connects each product path to the mobile, API, and persisted-record layers", () => {
    const markup = renderFoodTracker();
    const architecture = section(markup, "food-architecture", "food-insights");
    const systemMapMarkup = architecture.slice(architecture.indexOf('class="food-system-map"'), architecture.indexOf('class="food-data-contract"'));
    const findPath = systemMapMarkup.slice(systemMapMarkup.indexOf('data-path="find-resolve"'), systemMapMarkup.indexOf('data-path="interpret-review"'));
    const interpretPath = systemMapMarkup.slice(systemMapMarkup.indexOf('data-path="interpret-review"'), systemMapMarkup.indexOf('data-path="read-history"'));
    const historyPath = systemMapMarkup.slice(systemMapMarkup.indexOf('data-path="read-history"'));

    expect((systemMapMarkup.match(/class="food-system-map__path-lane/g) ?? []).length).toBe(3);
    expect(storyText(findPath)).toContain("Search or reuse a food; confirm its serving.");
    expect(storyText(findPath)).toContain("Open Food Facts supports packaged and barcode lookup");
    expect(storyText(findPath)).toContain("Pinecone returns semantic candidates only; the API ranks deterministically.");
    expect(storyText(interpretPath)).toContain("Gemini proposes food and quantity");
    expect(storyText(interpretPath)).toContain("Nothing saves before human review.");
    expect(storyText(interpretPath)).toContain("food log + historical nutrition snapshot");
    expect(storyText(historyPath)).toContain("Deterministic analysis + recommendations.");
    expect(storyText(historyPath)).toContain("Simple and Complex change presentation depth over the same deterministic analysis and backend");
  });

  it("separates logging-day eligibility from nutrient coverage and explains the two presentation depths", () => {
    const markup = renderFoodTracker();
    const insights = section(markup, "food-insights", "food-search");
    const insightsCopy = storyText(insights);

    expect(insights).toContain('class="food-insight-path"');
    expect(insights).not.toContain('class="food-insight-path__evidence food-insight-path__evidence--inset"');
    expect(insights).not.toContain("trend-detail-calories-unknown.png");
    expect(insights).not.toContain('class="food-insight-path__capture-readout"');
    expect(insights).toContain('class="food-insight-path__shared-inputs"');
    expect(insights).toContain('class="food-insight-path__analysis"');
    expect(insights).toContain('class="food-insight-path__presentations-heading"');
    expect(insights).toContain("food-insight-path__view-daily");
    expect(insights).toContain("food-insight-path__view-range");
    expect(insights).toContain("unknown values remain distinct from zero.");
    expect(insights.indexOf('class="food-insight-path__shared-inputs"')).toBeLessThan(insights.indexOf('class="food-insight-path__analysis"'));
    expect(insights.indexOf('class="food-insight-path__analysis"')).toBeLessThan(insights.indexOf('class="food-insight-path__presentations"'));
    expect(insights.indexOf('class="food-insight-path__presentations"')).toBeLessThan(insights.indexOf("SUPPORTING EVIDENCE · PHASE 24 / PRE-REDESIGN"));
    expect(insights.indexOf("01 / KEEP TWO DATA QUESTIONS SEPARATE")).toBeLessThan(insights.indexOf("02 / CHOOSE A PRESENTATION"));
    for (const copy of [
      "Saved food logs + weight logs + goals",
      "Deterministic analysis + recommendations",
      "range selection changes the analysis view, not the saved log.",
      "Complete Partial Unlogged",
      "Recorded Partial Unknown",
      "A day may count toward analysis while an individual nutrient remains unknown.",
      "SIMPLE / CURATED DAILY READ",
      "Calories + macros",
      "Weight + hydration",
      "Logging consistency",
      "Daily overview and deterministic recommendations use saved records and goals.",
      "COMPLEX / DEEPER EXPLORATION",
      "Custom ranges, comparisons, coverage controls, saved views, and deterministic forecasts use recorded data.",
      "AI does not fill missing values or decide recommendation facts",
      "Overview Nutrients Recommendations",
      "Explore nutrient, calorie, macro, weight, hydration, and consistency trends across selected ranges.",
      "unknown values remain distinct from zero.",
      "QA-A staging capture",
      "five logged days.",
    ]) expect(insightsCopy).toContain(copy);
    expect(insightsCopy).not.toContain("0 eligible logged days");
    expect(insightsCopy).not.toContain("30 unlogged");
    expect(insightsCopy).not.toContain("Food logs · weight logs · goals · local tracking day");
    expect(insightsCopy).not.toContain("return to a chosen analysis without changing the underlying log");
    expect(insightsCopy).not.toContain("populated account report");
    expect(insightsCopy).not.toContain("1,850 calories");
    expect(insightsCopy).not.toContain("measured trend");
  });

  it("combines the bounded hybrid retrieval design and offline development/holdout evidence", () => {
    const markup = renderFoodTracker();
    const search = section(markup, "food-search", "food-validation");
    const searchCopy = storyText(search);

    expect(search).toContain('class="food-retrieval-evidence"');
    expect(search).toContain("How does the app find the intended food reliably?");
    expect(search).toContain('class="food-retrieval-pipeline"');
    expect(search).toContain('aria-label="Exact, fuzzy, and semantic candidate routes converge on deterministic ranking before human confirmation and shared serving resolution."');
    expect(search).toContain('class="food-retrieval-pipeline__lanes"');
    expect(search).toContain('class="food-retrieval-pipeline__rank"');
    expect(search).toContain('class="food-retrieval-pipeline__resolve"');
    expect(search).toContain('class="food-retrieval-evidence__top-one"');
    expect(search).toContain('role="img" aria-label="Top-1 offline ranking comparison');
    for (const copy of [
      "EXACT / STRUCTURED",
      "FUZZY RETRIEVAL",
      "Close text recovery when a name is imperfect",
      "Semantic candidates",
      "Pinecone candidates only",
      "Deterministic, domain-aware ranking",
      "PERSON CONFIRMS FOOD",
      "SHARED SERVING RESOLUTION",
      "PostgreSQL remains the source of food and nutrition truth",
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
      "They also report that semantic retrieval added substantial latency for little benchmark recovery",
      "Project and evaluation notes attribute most of the measured gain to fuzzy retrieval.",
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
