import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ChoViegoCase from "./ChoViegoCase";

function renderCase() {
  return renderToStaticMarkup(<MemoryRouter><ChoViegoCase /></MemoryRouter>);
}

describe("Cho’Veigo evidence-based matching story", () => {
  it("opens with the product and authentic Recommendations view before Joshua’s focus", () => {
    const markup = renderCase();
    const hero = markup.slice(markup.indexOf('id="choveigo-overview"'), markup.indexOf('id="choveigo-system"'));
    const systemStart = markup.indexOf('id="choveigo-system"');
    const focusStart = markup.indexOf('id="choveigo-fit"');
    expect(hero).toContain("PRODUCT");
    expect(hero).toContain("A job-search workspace");
    expect(hero).toContain("AUTHENTIC PRODUCT VIEW / RECOMMENDATIONS");
    expect(hero).toContain("/media/choveigo-recommendations.png");
    expect(systemStart).toBeGreaterThan(markup.indexOf('id="choveigo-overview"'));
    expect(focusStart).toBeGreaterThan(systemStart);
    expect(markup.slice(systemStart, focusStart)).toContain("How a role becomes a recommendation.");
    expect(hero).not.toContain("JOSHUA’S FOCUS");
    expect(hero).not.toContain("<video");
  });

  it("distinguishes Fit, Eligibility, and Recommendation from evidence and gaps", () => {
    const markup = renderCase();
    const fit = markup.slice(markup.indexOf('id="choveigo-fit"'), markup.indexOf('id="choveigo-review"'));
    const fitIndex = fit.indexOf("FIT");
    const eligibilityIndex = fit.indexOf("ELIGIBILITY");
    const recommendationIndex = fit.indexOf("RECOMMENDATION");
    expect(fit).toContain("ROLE REQUIREMENTS");
    expect(fit).toContain("Demonstrated and transferable experience");
    expect(fit).toContain("Missing requirements stay visible");
    expect(fit).toContain("MATCH TRACE / EVIDENCE IN, THREE DISTINCT JUDGMENTS OUT");
    expect(fit).toContain("deterministic rules retain Fit and Eligibility authority");
    expect(fitIndex).toBeGreaterThan(-1);
    expect(eligibilityIndex).toBeGreaterThan(fitIndex);
    expect(recommendationIndex).toBeGreaterThan(eligibilityIndex);
  });

  it("records the human mismatch-to-regression loop without overstating evaluation", () => {
    const markup = renderCase();
    const review = markup.slice(markup.indexOf('id="choveigo-review"'), markup.indexOf('id="choveigo-change"'));
    expect(review).toContain("MISMATCH");
    expect(review).toContain("CORRECTION");
    expect(review).toContain("DETERMINISTIC FIXTURE");
    expect(review).toContain("REGRESSION");
    expect(review).not.toContain("research-grade validation");
    expect(review).toContain("With Shiv, I reviewed mismatches and agreed on expected behavior.");
    expect(review).toContain("Human review informed deterministic regression fixtures");
  });

  it("keeps retrieval and Gemini bounded, and does not claim automatic submission or benchmark results", () => {
    const markup = renderCase();
    expect(markup).toContain("Role discovery");
    expect(markup).toContain("Candidate evidence");
    expect(markup).toContain("Decision layers");
    expect(markup).toContain("Product actions");
    expect(markup).toContain("deterministic rules retain Fit and Eligibility authority");
    expect(markup).toContain("Structured Gemini interprets evidence");
    expect(markup).toContain("cannot invent experience or decide Fit and Eligibility");
    expect(markup).toContain("Recommendation stays separate.");
    expect(markup).toContain("Tailor a resume for a selected role as a distinct step.");
    expect(markup).toContain("OWNER-REPORTED EXAMPLE");
    expect(markup).not.toContain("No employer-specific or time-saving claim is made.");
    expect(markup).not.toMatch(/\b(?:Top-1|precision|recall|\d+%|hours saved|Greenhouse|Lever|DOCX|PDF)\b/i);
  });
});
