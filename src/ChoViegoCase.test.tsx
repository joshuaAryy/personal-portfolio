import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import ChoViegoCase, { resolveActiveChapter } from "./ChoViegoCase";

function renderCase() {
  return renderToStaticMarkup(
    <MemoryRouter>
      <ChoViegoCase />
    </MemoryRouter>,
  );
}

function chapter(markup: string, id: string, nextId?: string) {
  const start = markup.indexOf(`id="choveigo-${id}"`);
  const end = nextId ? markup.indexOf(`id="choveigo-${nextId}"`, start + 1) : markup.length;
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

describe("Cho’Veigo product story", () => {
  it("orders intake, evidence, decisions, review, Resume Studio, and the ending", () => {
    const markup = renderCase();
    const ids = ["overview", "intake", "evidence", "decisions", "review", "studio", "outcome"];
    const positions = ids.map((id) => markup.indexOf(`id="choveigo-${id}"`));

    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((left, right) => left - right));
    expect(resolveActiveChapter({ overview: -10, intake: 20 }, 30, false)).toBe("intake");
    expect(resolveActiveChapter({ overview: -10, intake: 20 }, 30, true)).toBe("outcome");
  });

  it("opens on the owner-cleared Recommendations still without a media warning", () => {
    const hero = chapter(renderCase(), "overview", "intake");

    expect(hero).toContain("A better match starts with the evidence.");
    expect(hero).toContain("/media/choveigo-recommendations.png");
    expect(hero).toContain("AUTHENTIC PRODUCT VIEW");
    expect(hero).toContain("Owner-cleared Recommendations still");
    expect(hero).not.toContain("privacy-safe walkthrough");
    expect(hero).not.toContain("<video");
  });

  it("shows job feeds becoming persisted role context", () => {
    const intake = storyText(chapter(renderCase(), "intake", "evidence"));

    expect(intake).toContain("SOURCE INPUT Job feeds");
    expect(intake).toContain("PERSISTED ROLE Posting snapshot");
    expect(intake).toContain("PERSON CHOOSES Resume Studio handoff");
    expect(intake).toContain("posting snapshot");
    expect(intake).toContain("title");
    expect(intake).toContain("company");
    expect(intake).toContain("description");
    expect(intake).toContain("SOURCE");
    expect(intake).toContain("Selected role context + reviewed profile");
  });

  it("makes retrieved profile evidence and transferable experience visible without a fabricated candidate trace", () => {
    const evidence = storyText(chapter(renderCase(), "evidence", "decisions"));

    expect(evidence).toContain("RESPONSIBILITIES");
    expect(evidence).toContain("CORE REQUIREMENTS");
    expect(evidence).toContain("PREFERRED");
    expect(evidence).toContain("DEMONSTRATED");
    expect(evidence).toContain("TRANSFERABLE");
    expect(evidence).toContain("VISIBLE GAP");
    expect(evidence).toContain("The Jobs path retrieves reviewed profile evidence for the role");
    expect(evidence).toContain("Illustrative failure mode only");
    expect(evidence).not.toContain("97%");
    expect(evidence).not.toContain("Gemini");
  });

  it("keeps deterministic Fit and Eligibility separate from Recommendation and Gemini", () => {
    const decisionMarkup = chapter(renderCase(), "decisions", "review");
    const decisions = storyText(decisionMarkup);
    const fit = decisionMarkup.indexOf(">Fit</h3>");
    const eligibility = decisionMarkup.indexOf(">Eligibility</h3>");
    const recommendation = decisionMarkup.indexOf(">Recommendation</h3>");

    expect(fit).toBeGreaterThan(-1);
    expect(eligibility).toBeGreaterThan(fit);
    expect(recommendation).toBeGreaterThan(eligibility);
    expect(decisions).toContain("JOBS ASSESSMENT · DETERMINISTIC");
    expect(decisions).toContain("How closely does reviewed experience support the work?");
    expect(decisions).toContain("Are the role’s required conditions met?");
    expect(decisions).toContain("Bring a role forward for a person to inspect.");
    expect(decisions).not.toContain("Gemini");
    expect(decisions).not.toContain("numeric score");
  });

  it("shows shared human review converting accepted behavior into regression fixtures", () => {
    const review = storyText(chapter(renderCase(), "review", "studio"));
    const stages = ["Notice a mismatch", "Inspect the expectation", "Agree together", "Save a regression fixture"];
    const positions = stages.map((stage) => review.indexOf(stage));

    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((left, right) => left - right));
    expect(review).toContain("Joshua and Shiv review the matching behavior and product rule.");
    expect(review).toContain("Was the rule unclear, or did implementation diverge?");
    expect(review).toContain("not a multi-rater or research-grade evaluation");
  });

  it("places Gemini role classification and bounded wording inside downstream Resume Studio, with DOCX as the current export", () => {
    const studio = storyText(chapter(renderCase(), "studio", "outcome"));

    expect(studio).toContain("The handoff carries context. Studio prepares a document.");
    expect(studio).toContain("Reviewed profile evidence");
    expect(studio).toContain("Editable job description");
    expect(studio).toContain("Gemini role-family classification");
    expect(studio).toContain("A limited Gemini rewrite");
    expect(studio).toContain("checked against source evidence");
    expect(studio).toContain("person edits the result");
    expect(studio).toContain("checks page fit");
    expect(studio).toContain("DOCX");
    expect(studio).not.toContain("PDF");
    expect(studio).not.toContain("auto-apply");
  });

  it("states shared project ownership and keeps the reported outcome qualitative", () => {
    const outcome = storyText(chapter(renderCase(), "outcome"));

    expect(storyText(chapter(renderCase(), "overview", "intake"))).toContain("Joshua Aryeetey + Shiv Arora");
    expect(outcome).toContain("Joshua led Jobs-side work and shared product and evaluation direction");
    expect(outcome).toContain("Shiv initially led more of the foundational resume-generation work");
    expect(outcome).toContain("OWNER-REPORTED · QUALITATIVE");
    expect(outcome).toContain("One recommendation surfaced a role I might not have found on my own.");
    expect(outcome).not.toMatch(/\b(?:hours saved|\d+%|auto-apply|automated application submission|live production deployment|research-grade validation)\b/i);
  });
});
