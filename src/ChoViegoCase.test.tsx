import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

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

    expect(markup).toContain("What should job fit actually mean?");
    expect(markup).toContain('href="#choveigo-question"');
    expect(markup).toContain('href="#choveigo-fit"');
    expect(markup).toContain('href="#choveigo-review"');
    expect(markup).toContain('href="#choveigo-system"');
    expect(markup).toContain('href="#choveigo-change"');
    expect(markup).toContain('aria-current="location"');
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

    expect(markup).toContain("FIT");
    expect(markup).toContain("ELIGIBILITY");
    expect(markup).toContain("RECOMMENDATION");
    expect(markup).toContain("Recommendations do not submit applications.");
    expect(markup).toContain("Shiv Arora");
    expect(markup).toContain("product and evaluation direction");
    expect(markup).not.toContain("inter-rater");
  });
});
