import { readFileSync } from "node:fs";
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

describe("Food Tracker flagship technical case study", () => {
  it("explains the product and immediate logging problem before system scale", () => {
    const markup = renderFoodTracker();
    const firstFold = markup.slice(0, markup.indexOf('id="food-search"'));

    expect(firstFold).toContain("Simple food logs.");
    expect(firstFold).toContain("Trusted nutrition.");
    expect(firstFold).toContain("A mobile-first nutrition tracker");
    expect(firstFold).toContain("A quick log still needs the right food and serving.");
    expect(firstFold).not.toContain("12,363 active foods");
    expect(firstFold).not.toContain("277,341 nutrient rows");
    expect(firstFold).not.toContain("REFERENCE CATALOG");
    expect(firstFold).toContain('/media/profile/food-tracker-mark.svg');
  });

  it("shows parallel candidate paths, their union, and deterministic final authority", () => {
    const markup = renderFoodTracker();

    expect(markup).toContain("DETERMINISTIC</strong>");
    expect(markup).toContain("FUZZY</strong>");
    expect(markup).toContain("SEMANTIC · PINECONE</strong>");
    expect(markup).toContain("CANDIDATE UNION");
    expect(markup).toContain("DETERMINISTIC EVALUATION");
    expect(markup).toContain("Rules decide rank");
    expect(markup).toContain("Pinecone supplies candidates only");
    expect(markup).toContain("trusted food data supplies nutrition");
    expect(markup).toContain("I found semantic retrieval added substantial latency for little benchmark recovery.");
  });

  it("keeps the 80-query development and 40-query holdout metrics separate", () => {
    const markup = renderFoodTracker();

    for (const result of ["40/80", "71/80", "25/40", "27/40"]) {
      expect(markup).toContain(result);
    }
    expect(markup).toContain("DEVELOPMENT");
    expect(markup).toContain("HOLDOUT");
    expect(markup).toContain("Top-1 means the correct food ranked first.");
  });

  it("states source-backed technical ownership and keeps indexing causes distinct", () => {
    const markup = renderFoodTracker();

    expect(markup).toContain("PRODUCT INITIATION");
    expect(markup).toContain("SEARCH EVALUATION");
    expect(markup).toContain("SYSTEM DESIGN");
    expect(markup).toContain("Passing tests did not guarantee useful search.");
    expect(markup).toContain("A pagination bug left the search index partial or stale.");
    expect(markup).toContain("checked index completeness separately from whether the right food was returned.");
    expect(markup).not.toContain("Codex and AI agents supported much of the implementation");
    expect(markup).not.toContain("integrated-inference token quota");
    expect(markup).not.toContain("bounded 429 retries");
    expect(markup).not.toContain("production-oriented API");
    expect(markup).not.toContain("deployment direction");
    expect(markup).not.toContain("rate-limit behavior");
    expect(markup).not.toContain("15,000 users");
    expect(markup).not.toContain("milliseconds");
  });

  it("tells the logging and insights story before retrieval and architecture", () => {
    const markup = renderFoodTracker();
    const order = [
      'id="food-overview"',
      'id="food-logging"',
      'id="food-insights"',
      'id="food-search"',
      'id="food-interface"',
      'id="food-system"',
      'id="food-evaluation"',
    ].map((anchor) => markup.indexOf(anchor));

    expect(order.every((position) => position >= 0)).toBe(true);
    expect(order).toEqual([...order].sort((a, b) => a - b));
    expect(markup).toContain("Reuse a food and serving already in the log.");
    expect(markup).toContain("Scan packaged food to find a catalog match.");
    expect(markup).toContain("Describe an item, then review the returned suggestion.");
    expect(markup).toContain("Review visible-food suggestions; any estimate stays low-trust and editable.");
    expect(markup).toContain("low-trust and editable");
    expect(markup).toContain("Check the food and portion.");
    expect(markup).toContain("Nutrient Aggregation");
    expect(markup).toContain("Simple");
    expect(markup).toContain("Complex");
    expect(markup).toContain("Saved Views");
    expect(markup).toContain("Unknown nutrition stays unknown");
  });

  it("describes the five entry paths and keeps photo estimates low-trust before save", () => {
    const markup = renderFoodTracker();
    const logging = markup.slice(markup.indexOf('id="food-logging"'), markup.indexOf('id="food-insights"'));

    expect(logging).toContain("One meal, several ways to get started.");
    expect(logging).toContain("Each route moves toward the same useful check: confirm the food and portion before the entry is saved.");
    for (const copy of [
      "Find a food and choose the serving that matches the meal.",
      "Reuse a food and serving already in the log.",
      "Scan packaged food to find a catalog match.",
      "Describe an item, then review the returned suggestion.",
      "Review visible-food suggestions; any estimate stays low-trust and editable.",
    ]) expect(logging).toContain(copy);
    expect(logging.match(/<li>/g)).toHaveLength(5);
    expect(logging).toContain("Check the food and portion. A supplied catalog match uses backend food and serving rules; a photo estimate is an editable, low-trust starting point that can be changed or excluded.");
  });

  it("matches the Figma logging and Insights labels and exposes the shared review connector", () => {
    const markup = renderFoodTracker();
    const logging = markup.slice(markup.indexOf('id="food-logging"'), markup.indexOf('id="food-insights"'));
    const insights = markup.slice(markup.indexOf('id="food-insights"'), markup.indexOf('id="food-search"'));

    expect.soft(logging).toContain('<h2 id="food-logging-title">One meal, several ways to get started.</h2>');
    expect.soft(insights).toContain('<p class="food-section-label">INSIGHTS</p>');
    expect.soft(logging).toContain('class="food-logging__connectors" aria-hidden="true"');
    expect(logging.match(/<li>/g)).toHaveLength(5);
  });

  it("routes the narrow Logging cards through one centered connector", () => {
    const css = readFileSync("src/food-visuals.css", "utf8");
    const start = css.indexOf("@media (max-width: 760px)");
    const end = css.indexOf("\n}", start) + 2;
    const narrowRules = css.slice(start, end);

    expect(narrowRules).toMatch(/\.food-logging__paths\s*\{[^}]*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
    expect(narrowRules).toMatch(/\.food-logging__paths::before,\s*\.food-logging__paths li::after\s*\{\s*display:\s*none;\s*\}/);
    expect(narrowRules).toMatch(/\.food-logging__connectors\s*\{\s*width:\s*0;\s*height:\s*20px;\s*border-top:\s*0;\s*border-left:\s*1px solid #c79b45;\s*\}/);
  });

  it("separates nutrient flow, detail levels, and saved-view reopening in Insights", () => {
    const markup = renderFoodTracker();
    const insights = markup.slice(markup.indexOf('id="food-insights"'), markup.indexOf('id="food-search"'));

    for (const copy of [
      "The product aggregates logged nutrients and keeps data coverage visible before people choose how much detail to explore.",
      "Logged Items",
      "Foods and serving choices",
      "Nutrient Aggregation",
      "Totals from saved logs",
      "Coverage",
      "Missing data stays visible",
      "Simple / Focused Overview",
      "A clear daily view over the same logged foods and nutrition.",
      "Complex / Range Comparison",
      "Open nutrient detail and compare selected time ranges.",
      "Saved Views",
      "Return to a chosen analysis without changing the underlying log.",
      "Unknown nutrition stays unknown.",
      "ONE PRODUCT · ONE BACKEND · DIFFERENT LEVELS OF DETAIL",
    ]) expect(insights).toContain(copy);
    expect(insights.match(/Return to a chosen analysis without changing the underlying log\./g)).toHaveLength(1);
  });

  it("gives the system figure a concise name and keeps its full description once", () => {
    const markup = renderFoodTracker();
    const start = markup.indexOf('<figure class="food-system-map food-system-map--flagship"');
    const end = markup.indexOf("</figure>", start) + "</figure>".length;
    const figure = markup.slice(start, end);

    expect.soft(figure).toContain('aria-labelledby="food-system-map-title"');
    expect.soft(figure).toContain('alt=""');
    expect.soft(figure).toContain('<span id="food-system-map-title">Food Tracker system map.</span>');
    expect(figure.match(/Illustrative composite system figure, not a product screenshot/g)).toHaveLength(1);
  });

  it("describes an editable serving snapshot across the Food architecture", () => {
    const markup = renderFoodTracker();

    expect(markup).toContain("React Native / Expo");
    expect(markup).toContain("Express / Prisma");
    expect(markup).toContain("normalized into one trusted catalog");
    expect(markup).toContain("PostgreSQL");
    expect(markup).toContain("serving snapshot");
    expect(markup).toContain("History and Insights");
    expect(markup).toContain("supports later portion edits");
    expect(markup).not.toMatch(/append-only|immutable history/i);
  });
});
