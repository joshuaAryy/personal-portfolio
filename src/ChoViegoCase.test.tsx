import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ChoViegoCase from "./ChoViegoCase";

function renderCase() {
  return renderToStaticMarkup(<MemoryRouter><ChoViegoCase /></MemoryRouter>);
}

describe("Cho’Veigo evidence-based matching story", () => {
  it("opens with technical role context and a matching path beside the approved static capture", () => {
    const markup = renderCase();
    const hero = markup.slice(markup.indexOf('id="choveigo-overview"'), markup.indexOf('id="choveigo-system"'));
    expect(markup).toContain("Evidence-based job matching");
    expect(markup).toContain("What should job fit actually mean?");
    expect(markup).toContain("JOBS-SIDE PRODUCT + EVALUATION");
    expect(hero).toContain("/media/choveigo-recommendations.png");
    expect(hero).toContain("ROLE SOURCES");
    expect(hero).toContain("DETERMINISTIC");
    expect(hero).toContain("BOUNDED GEMINI");
    expect(hero).not.toContain("STRENGTH LABELS UNVALIDATED");
    expect(hero).not.toContain("no role-specific evaluation record");
    expect(hero).not.toContain("<video");
  });

  it("distinguishes Fit, Eligibility, and Recommendation from evidence and gaps", () => {
    const markup = renderCase();
    const fit = markup.slice(markup.indexOf('id="choveigo-fit"'), markup.indexOf('id="choveigo-review"'));
    const fitIndex = fit.indexOf("FIT");
    const eligibilityIndex = fit.indexOf("ELIGIBILITY");
    const recommendationIndex = fit.indexOf("RECOMMENDATION");
    expect(fit).toContain("RESPONSIBILITY");
    expect(fit).toContain("Candidate’s experience supports its responsibilities");
    expect(fit).toContain("Meaningful gaps remain");
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
    expect(review).toContain("Each correction could then be checked against that regression case.");
  });

  it("keeps retrieval and Gemini bounded, and does not claim automatic submission or benchmark results", () => {
    const markup = renderCase();
    expect(markup).toContain("company and career sites");
    expect(markup).toContain("Deterministic rules");
    expect(markup).toContain("Structured, bounded interpretation");
    expect(markup).toContain("It does not invent candidate experience");
    expect(markup).toContain("application submission is not automatic");
    expect(markup).toContain("OWNER-REPORTED OBSERVATION");
    expect(markup).not.toContain("No employer-specific or time-saving claim is made.");
    expect(markup).not.toMatch(/\b(?:Top-1|precision|recall|\d+%|hours saved|Greenhouse|Lever|DOCX|PDF)\b/i);
  });
});
