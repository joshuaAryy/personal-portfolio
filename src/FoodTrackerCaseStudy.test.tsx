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
  it("opens with Joshua's ownership, shared product system, and reference-food scale", () => {
    const markup = renderFoodTracker();
    const firstFold = markup.slice(0, markup.indexOf('id="food-search"'));

    expect(firstFold).toContain("I initiated the product");
    expect(firstFold).toContain("MOBILE PRODUCT SYSTEM");
    expect(firstFold).toContain("Simple + Complex");
    expect(firstFold).toContain("same backend + food domain");
    expect(firstFold).toContain("12,363 active foods");
    expect(firstFold).toContain("277,341 nutrient rows");
    expect(firstFold).toContain("canonical food log");
    expect(firstFold).toContain("REFERENCE CATALOG");
    expect(firstFold).toContain('/media/profile/food-tracker-mark.svg');
  });

  it("shows parallel candidate paths, their union, and deterministic final authority", () => {
    const markup = renderFoodTracker();

    expect(markup).toContain("DETERMINISTIC</strong>");
    expect(markup).toContain("FUZZY</strong>");
    expect(markup).toContain("SEMANTIC · PINECONE</strong>");
    expect(markup).toContain("CANDIDATE UNION");
    expect(markup).toContain("DETERMINISTIC EVALUATOR");
    expect(markup).toContain("Pinecone supplies candidates only");
    expect(markup).toContain("trusted food data sets nutrition values");
    expect(markup).toContain("Semantic retrieval added substantial latency for little recovery");
  });

  it("keeps the 80-query development and 40-query holdout metrics separate", () => {
    const markup = renderFoodTracker();

    for (const result of ["40/80", "71/80", "72/80", "25/40", "27/40", "28/40"]) {
      expect(markup).toContain(result);
    }
    expect(markup).toContain("DEVELOPMENT");
    expect(markup).toContain("HOLDOUT");
    expect(markup.toLowerCase()).toContain("the smaller holdout gain kept the split visible");
  });

  it("states source-backed technical ownership and keeps indexing causes distinct", () => {
    const markup = renderFoodTracker();

    expect(markup).toContain("requirements, priorities,");
    expect(markup).toContain("architecture direction, workflow, and evaluation.");
    expect(markup).toContain("Implementation received substantial assistance");
    expect(markup).toContain("integrated-inference token quota stopped indexing after a partial load");
    expect(markup).toContain("bounded 429 retries later completed the 12,363-document rebuild");
    expect(markup).not.toContain("production-oriented API");
    expect(markup).not.toContain("deployment direction");
    expect(markup).not.toContain("rate-limit behavior");
    expect(markup).not.toContain("15,000 users");
    expect(markup).not.toContain("milliseconds");
  });
});
