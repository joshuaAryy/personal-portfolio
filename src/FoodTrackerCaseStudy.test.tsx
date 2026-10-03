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
    expect(markup).toContain("Saved or recent food");
    expect(markup).toContain("barcode");
    expect(markup).toContain("Text description");
    expect(markup).toContain("Photo suggestions");
    expect(markup).toContain("low-trust and editable");
    expect(markup).toContain("review the food and portion before saving");
    expect(markup).toContain("Nutrient aggregation");
    expect(markup).toContain("Simple");
    expect(markup).toContain("Complex");
    expect(markup).toContain("Saved views");
    expect(markup).toContain("Unknown nutrition stays unknown");
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
