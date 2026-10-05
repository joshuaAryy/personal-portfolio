import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

const storyRoutes = [
  ["Food Tracker", "/projects/food-tracker", "Simple food logs."],
  ["Crest", "/projects/crest", "<h1>Crest</h1>"],
  ["Cho’Veigo", "/projects/choveigo", "AUTHENTIC PRODUCT VIEW / RECOMMENDATIONS"],
  ["Fraymakers", "/projects/fraymakers", "MATCH DATA TO VOD THUMBNAILS"],
  ["Living in Silico", "/experience/living-in-silico", "A research internship in molecular generation."],
  ["Stush Patties", "/experience/stush-patties", "Different file shapes. One reporting path."],
] as const;

function renderRoute(path: string) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("implemented story route mapping", () => {
  it.each(storyRoutes)("renders the %s story at %s", (_story, path, marker) => {
    expect(renderRoute(path)).toContain(marker);
  });
});

describe("extracted case study pages", () => {
  it.each([
    ["/projects/food-tracker", "main--food-case"],
    ["/projects/crest", "main--crest-case"],
  ])("keeps the shared client shell at %s", (path, pageClass) => {
    const markup = renderRoute(path);

    expect(markup).toContain('class="skip-link" href="#main"');
    expect(markup).toMatch(/class="header(?:\s[^"]*)?"/);
    expect(markup).toContain(`class="main main--detail ${pageClass}"`);
    expect(markup).toContain('class="rail" aria-label="Portfolio index"');
  });
});
