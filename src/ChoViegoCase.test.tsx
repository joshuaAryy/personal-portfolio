import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";
import { resolveActiveChapter } from "./ChoViegoCase";

function renderChoveigoRoute() {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={["/projects/choveigo"]}>
      <App />
    </MemoryRouter>,
  );
}

describe("Cho’Veigo case study route", () => {
  it("renders the five-chapter story at its canonical route", () => {
    const markup = renderChoveigoRoute();
    const chapterIds = ["question", "fit", "review", "system", "change"];

    expect(markup).toContain("What should job fit actually mean?");
    for (const id of chapterIds) {
      expect(markup).toContain(`href="#choveigo-${id}"`);
      expect(markup.match(new RegExp(`id="choveigo-${id}"`, "g"))).toHaveLength(1);
    }
    const currentLinks = [...markup.matchAll(/<a\b[^>]*aria-current="location"[^>]*>/g)];
    expect(currentLinks).toHaveLength(1);
    expect(currentLinks[0][0]).toContain('href="#choveigo-question"');
    expect(markup).toContain('href="/projects"');
  });

  it("uses only the cleared static Recommendations capture", () => {
    const markup = renderChoveigoRoute();

    expect(markup).toContain('src="/media/choveigo-recommendations.png"');
    expect(markup).toContain('alt="Cho’Veigo Recommendations view');
    expect(markup).not.toContain("<video");
    expect(markup).not.toContain("WATCH DEMO");
  });

  it("keeps decision concepts and role boundaries distinct", () => {
    const markup = renderChoveigoRoute();

    expect(markup).toContain("<dt>FIT</dt>");
    expect(markup).toContain("<dt>ELIGIBILITY</dt>");
    expect(markup).toContain("<dt>RECOMMENDATION</dt>");
    expect(markup).toContain(
      "<dt>FIT</dt><dd>How closely does the evidence line up with the work?</dd>",
    );
    expect(markup).toContain(
      "<dt>ELIGIBILITY</dt><dd>Are essential conditions and core requirements met?</dd>",
    );
    expect(markup).toContain(
      "<dt>RECOMMENDATION</dt><dd>Is this role worth bringing forward?</dd>",
    );
    expect(markup).toContain("Recommendations do not submit applications.");
    expect(markup).toContain("A TWO-PERSON PROJECT WITH SHIV ARORA");
    expect(markup).toContain("With Shiv, I focused on the Jobs side");
    expect(markup).toContain("product and evaluation direction");
    expect(markup).not.toContain("inter-rater");
  });

  it("marks the final chapter current when scrolling reaches the story end", () => {
    const sectionTops = {
      question: -100,
      fit: -80,
      review: -60,
      system: 20,
      change: 500,
    };

    expect(resolveActiveChapter(sectionTops, 78, false)).toBe("system");
    expect(resolveActiveChapter(sectionTops, 78, true)).toBe("change");
  });
});
