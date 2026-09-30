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

    expect(markup).toContain("I kept requirements, architecture, and acceptance owner-led.");
    expect(markup).toContain("Codex and AI agents supported much of the implementation");
    expect(markup).toContain("Search quality and index state are separate checks.");
    expect(markup).not.toContain("integrated-inference token quota");
    expect(markup).not.toContain("bounded 429 retries");
    expect(markup).not.toContain("production-oriented API");
    expect(markup).not.toContain("deployment direction");
    expect(markup).not.toContain("rate-limit behavior");
    expect(markup).not.toContain("15,000 users");
    expect(markup).not.toContain("milliseconds");
  });
});
