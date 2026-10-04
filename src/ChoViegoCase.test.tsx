import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ChoViegoCase, { resolveActiveChapter } from "./ChoViegoCase";

function renderCase() {
  return renderToStaticMarkup(<MemoryRouter><ChoViegoCase /></MemoryRouter>);
}

describe("Cho’Veigo evidence-based matching story", () => {
  it("keeps an explicitly selected chapter at the story end while passive tracking selects the last chapter", () => {
    const sectionTops = {
      overview: -2129,
      system: -1465,
      fit: -494,
      review: 337,
      change: 654,
    };

    expect(resolveActiveChapter(sectionTops, 160, true)).toBe("change");
    expect(resolveActiveChapter(sectionTops, 160, true, "review")).toBe("review");
  });

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
    expect(fit).toContain("deterministic rules determine Fit and Eligibility");
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
    expect(markup).toContain("deterministic rules determine Fit and Eligibility");
    expect(markup).toContain("Structured Gemini interprets role and candidate evidence within its boundary");
    expect(markup).toContain("The prompt constrains Gemini to interpret supplied evidence");
    expect(markup).toContain("deterministic rules assess Fit and Eligibility, with Recommendation handled separately.");
    expect(markup).toContain("A distinct judgment: bring the role forward.");
    expect(markup).toContain("A selected role and profile prepare the inputs; the person starts tailoring separately.");
    expect(markup).toContain("One recommendation surfaced a role I might have missed.");
    expect(markup).not.toContain("OWNER-REPORTED EXAMPLE");
    expect(markup).not.toContain("No employer-specific or time-saving claim is made.");
    expect(markup).not.toMatch(/\b(?:Top-1|precision|recall|\d+%|hours saved|Greenhouse|Lever|DOCX|PDF)\b/i);
  });

  it("separates the selected-role handoff from the Resume Studio method and output", () => {
    const markup = renderCase();
    const system = markup.slice(markup.indexOf('id="choveigo-system"'), markup.indexOf('id="choveigo-fit"'));
    const architecture = system.indexOf('class="choveigo-system-map"');
    const distinctInputs = system.indexOf("INPUTS THAT STAY DISTINCT");
    const ruleBoundary = system.indexOf('class="choveigo-system__boundaries"');
    const distinctRow = system.slice(distinctInputs, ruleBoundary);

    expect(architecture).toBeGreaterThan(-1);
    expect(distinctInputs).toBeGreaterThan(architecture);
    expect(ruleBoundary).toBeGreaterThan(distinctInputs);
    expect(distinctRow).toContain("ROLE RECORD");
    expect(distinctRow).toContain("Job feeds and persisted role data lead to a structured role record. Responsibilities and core requirements give matching something concrete to evaluate.");
    expect(distinctRow).toContain("PROFILE + RESUME EVIDENCE");
    expect(distinctRow).toContain("Demonstrated and transferable evidence stays distinct from visible gaps. Structured Gemini interpretation remains tied to the supplied role and candidate material.");
    expect(system).toContain("A SEPARATE RESUME STUDIO WORKFLOW");
    expect(system).toContain("The recommendation opens a path; the person starts tailoring.");
    expect(system).toContain("persisted role data");
    expect(system).toContain("structured role record");
    expect(system).toContain("Demonstrated and transferable evidence stays distinct from visible gaps.");
    expect(system).toContain("Structured Gemini interpretation remains tied to the supplied role and candidate material.");
    expect(system).toContain("selected profile");
    expect(system).toContain("prepared inputs");
    expect(system).toContain("does not generate content");
    expect(system).toContain("editable job description");
    expect(system).toContain("selects grounded content");
    expect(system).toContain("validates the wording");
    expect(system).toContain("Person reviews the result");
    expect(system).toContain("verifies the page");
    expect(system).toContain("exports a document");
    expect(system).not.toContain("Recommendation computes the resume");
    expect(system).not.toContain("automatically submits an application");
  });
});
