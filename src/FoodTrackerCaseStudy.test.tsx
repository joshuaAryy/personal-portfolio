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

  it("uses only the unsaved AI meal-review screen as direct product evidence", () => {
    const markup = renderFoodTracker();
    const logging = section(markup, "food-logging", "food-architecture");
    const captures = [...markup.matchAll(/<img\b[^>]*\/media\/case-studies\/food-tracker\/phase-24\//g)];

    expect(captures).toHaveLength(1);
    expect(logging).toContain('/media/case-studies/food-tracker/phase-24/ai-meal-review.png');
    expect(logging).toContain("368×800 iPhone QA capture from the pre-redesign baseline");
    expect(logging).toContain("The meal was reviewed but not saved; this is interaction evidence, not a populated user outcome");
    expect(logging).not.toContain("food-log-complex-clean.png");
    expect(markup).not.toContain("search-banana-results.png");
    expect(markup).not.toContain("trend-configuration.png");
    expect(markup).not.toContain("trend-detail-calories-unknown.png");
  });

  it("shows the many logging starts converging on one human-reviewed serving and snapshot contract", () => {
    const markup = renderFoodTracker();
    const logging = section(markup, "food-logging", "food-architecture");
    const loggingCopy = storyText(logging);

    expect(logging).toContain('class="food-log-transaction"');
    for (const copy of [
      "SEARCH + REUSE",
      "BARCODE",
      "DESCRIBE OR PHOTOGRAPH",
      "RECIPES + MIXED MEALS",
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
    for (const copy of [
      "Open Food Facts",
      "packaged foods and barcode lookup",
      "USDA FoodData Central",
      "generic-food candidates",
      "CNF 2026",
      "Ciqual 2025",
      "CoFID 2021",
      "versioned bulk datasets",
      "Source identity and release stay attached to normalized records",
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
    expect(architectureCopy).not.toContain("live APIs for every national dataset lookup");
  });

  it("separates logging-day eligibility from nutrient coverage and explains the two presentation depths", () => {
    const markup = renderFoodTracker();
    const insights = section(markup, "food-insights", "food-search");
    const insightsCopy = storyText(insights);

    expect(insights).toContain('class="food-insight-path"');
    for (const copy of [
      "Food logs · weight logs · goals · local tracking day",
      "COMPLETE · PARTIAL · UNLOGGED",
      "RECORDED · PARTIAL · UNKNOWN",
      "A logged day can still have an unknown nutrient.",
      "SIMPLE / CURATED DAILY READ",
      "Calories · macros · weight · hydration · logging consistency",
      "COMPLEX / DEEPER EXPLORATION",
      "More nutrients · comparisons · coverage controls · custom ranges · saved views",
      "Analytics and recommendation facts are deterministic backend facts",
      "AI does not fill missing values or decide recommendations",
    ]) expect(insightsCopy).toContain(copy);
    expect(insightsCopy).not.toContain("return to a chosen analysis without changing the underlying log");
    expect(insightsCopy).not.toContain("populated account report");
  });

  it("combines the bounded hybrid retrieval design and offline development/holdout evidence", () => {
    const markup = renderFoodTracker();
    const search = section(markup, "food-search", "food-validation");
    const searchCopy = storyText(search);

    expect(search).toContain('class="food-retrieval-evidence"');
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
