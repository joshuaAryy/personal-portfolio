import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ChoViegoCase, { resolveActiveChapter } from "./ChoViegoCase";

function renderCase() {
  return renderToStaticMarkup(<MemoryRouter><ChoViegoCase /></MemoryRouter>);
}

describe("Cho’Veigo evidence-first product story", () => {
  it("tracks the role-intake through Resume Studio chapters", () => {
    const sectionTops = {
      overview: -2800,
      intake: -2140,
      evidence: -1480,
      decisions: -820,
      review: -250,
      studio: 80,
      outcome: 670,
    };

    expect(resolveActiveChapter(sectionTops, 160, false)).toBe("studio");
    expect(resolveActiveChapter(sectionTops, 160, true)).toBe("outcome");
    expect(resolveActiveChapter(sectionTops, 160, true, "review")).toBe("review");
  });

  it("opens on authentic Recommendations evidence and discloses that the public proof is static", () => {
    const markup = renderCase();
    const hero = markup.slice(markup.indexOf('id="choveigo-overview"'), markup.indexOf('id="choveigo-intake"'));

    expect(hero).toContain("A role isn’t a keyword match.");
    expect(hero).toContain("/media/choveigo-recommendations.png");
    expect(hero).toContain("AUTHENTIC RECOMMENDATIONS CAPTURE");
    expect(hero).toContain("Static product capture");
    expect(hero).toContain("privacy-safe walkthrough is not available for publication");
    expect(hero).not.toContain("<video");
  });

  it("shows provider intake becoming a persisted role snapshot", () => {
    const markup = renderCase();
    const intake = markup.slice(markup.indexOf('id="choveigo-intake"'), markup.indexOf('id="choveigo-evidence"'));

    expect(intake).toContain("DISCOVERED POSTING");
    expect(intake).toContain("USER-SAVED ROLE");
    expect(intake).toContain("Posting snapshot");
    expect(intake).toContain("title");
    expect(intake).toContain("description");
    expect(intake).toContain("OFFICIAL URL");
    expect(intake).toContain("Feed availability can change; the saved record preserves the title, company, and description from save time.");
  });

  it("teaches evidence matching without presenting an illustrative trace as a live score", () => {
    const markup = renderCase();
    const evidence = markup.slice(markup.indexOf('id="choveigo-evidence"'), markup.indexOf('id="choveigo-decisions"'));

    expect(evidence).toContain("Responsibilities matter more than a familiar stack.");
    expect(evidence).toContain("DEMONSTRATED");
    expect(evidence).toContain("TRANSFERABLE");
    expect(evidence).toContain("VISIBLE GAP");
    expect(evidence).toContain("CORRELATED TERMS CAN INFLATE A TALLY");
    expect(evidence).toContain("Illustrative failure mode; not a live match result.");
    expect(evidence).toContain("01 / RETRIEVE");
    expect(evidence).toContain("Relevant reviewed profile context for this role");
    expect(evidence).toContain("STRUCTURED GEMINI INTERPRETATION");
    expect(evidence).not.toContain("97%");
  });

  it("keeps Fit, Eligibility, and Recommendation distinct and bounds the model role", () => {
    const markup = renderCase();
    const decisions = markup.slice(markup.indexOf('id="choveigo-decisions"'), markup.indexOf('id="choveigo-review"'));

    const fit = decisions.indexOf(">FIT</h3>");
    const eligibility = decisions.indexOf(">ELIGIBILITY</h3>");
    const recommendation = decisions.indexOf(">RECOMMENDATION</h3>");
    expect(fit).toBeGreaterThan(-1);
    expect(eligibility).toBeGreaterThan(fit);
    expect(recommendation).toBeGreaterThan(eligibility);
    expect(decisions).toContain("deterministic rules assess Fit and Eligibility.");
    expect(decisions).toContain("A separate product outcome.");
    expect(decisions).toContain("does not establish a standalone formula for it.");
    expect(decisions).toContain("Structured Gemini interpretation");
    expect(decisions).toContain("constrained to supplied evidence");
    expect(decisions).toContain("ROLE DISCOVERY");
    expect(decisions).toContain("CANDIDATE EVIDENCE");
    expect(decisions).toContain("DETERMINISTIC DECISION LAYERS");
    expect(decisions).toContain("PRODUCT ACTIONS");
    expect(decisions).not.toContain("Gemini decides whether to hire");
  });

  it("turns reviewed mismatches into fixtures without claiming research-grade validation", () => {
    const markup = renderCase();
    const review = markup.slice(markup.indexOf('id="choveigo-review"'), markup.indexOf('id="choveigo-studio"'));

    expect(review).toContain("Was the expected behavior wrong, or was the implementation wrong?");
    expect(review).toContain("AGREE ON EXPECTED BEHAVIOR");
    expect(review).toContain("DETERMINISTIC REGRESSION FIXTURE");
    expect(review).toContain("With Shiv, I reviewed mismatches");
    expect(review).not.toContain("research-grade validation");
    expect(review).not.toContain("inter-rater reliability");
  });

  it("separates the selected-role handoff from evidence-grounded Resume Studio work", () => {
    const markup = renderCase();
    const studio = markup.slice(markup.indexOf('id="choveigo-studio"'), markup.indexOf('id="choveigo-outcome"'));

    expect(studio).toContain("The handoff prepares context; it does not generate a resume.");
    expect(studio).toContain("Reviewed profile + editable job description");
    expect(studio).toContain("SELECT GROUNDED EVIDENCE");
    expect(studio).toContain("CONSTRAINED REWRITE + VALIDATION");
    expect(studio).toContain("HUMAN REVIEW");
    expect(studio).toContain("PAGE VERIFICATION + EXPORT");
    expect(studio).not.toContain("automatically submits an application");
  });

  it("states project ownership and keeps outcomes qualitative", () => {
    const markup = renderCase();
    const outcome = markup.slice(markup.indexOf('id="choveigo-outcome"'));

    expect(outcome).toContain("Two-person project · Joshua Aryeetey + Shiv Arora");
    expect(outcome).toContain("Joshua focused on Jobs and shared product/evaluation direction.");
    expect(outcome).toContain("Shiv initially led more of the foundational resume-generation work.");
    expect(outcome).toContain("one recommendation surfaced a role I might have missed.");
    expect(outcome).not.toContain("OWNER-REPORTED EXPERIENCE");
    expect(markup).not.toMatch(/\b(?:hours saved|\d+%|auto-apply|automated application submission|live production deployment)\b/i);
  });
});
