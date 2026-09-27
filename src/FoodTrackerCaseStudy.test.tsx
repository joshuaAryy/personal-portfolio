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
  it("makes the product system and reference catalog visible before the retrieval chapter", () => {
    const markup = renderFoodTracker();
    const firstFold = markup.slice(0, markup.indexOf('id="food-search"'));

    expect(firstFold).toContain("MOBILE PRODUCT SYSTEM");
    expect(firstFold).toContain("Simple + Complex");
    expect(firstFold).toContain("12,363 active foods");
    expect(firstFold).toContain("277,341 nutrient rows");
    expect(firstFold).toContain("canonical food log");
    expect(firstFold).toContain('/media/profile/food-tracker-mark.svg');
  });

  it("shows candidate retrieval as separate from deterministic evaluation and nutrition authority", () => {
    const markup = renderFoodTracker();

    expect(markup).toContain("DETERMINISTIC CANDIDATES");
    expect(markup).toContain("FUZZY CANDIDATES");
    expect(markup).toContain("SEMANTIC CANDIDATES · PINECONE");
    expect(markup).toContain("CANDIDATE UNION");
    expect(markup).toContain("DETERMINISTIC EVALUATOR");
    expect(markup).toContain("Pinecone supplies candidates only");
    expect(markup).toContain("trusted food data sets nutrition values");
  });

  it("keeps dev and holdout outcomes distinct and reports the complete Top-k results", () => {
    const markup = renderFoodTracker();

    for (const result of ["40/80", "71/80", "72/80", "25/40", "27/40", "28/40"]) {
      expect(markup).toContain(result);
    }
    expect(markup).toContain("Development");
    expect(markup).toContain("Holdout");
    expect(markup.toLowerCase()).toContain("the smaller holdout gain kept the split visible");
  });

  it("states Joshua's product and architecture ownership alongside AI-assisted implementation", () => {
    const markup = renderFoodTracker();

    expect(markup).toContain("requirements, priorities,");
    expect(markup).toContain("architecture direction, workflow, and evaluation.");
    expect(markup).toContain("Codex and AI agents provided substantial implementation assistance");
    expect(markup).not.toContain("15,000 users");
    expect(markup).not.toContain("milliseconds");
  });
});
