import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

const storyRoutes = [
  ["Food Tracker", "/projects/food-tracker", "Simple tracking,"],
  ["Crest", "/projects/crest", "<h1>Crest</h1>"],
  ["Cho’Veigo", "/projects/choveigo", "What should job fit actually mean?"],
  ["Fraymakers", "/projects/fraymakers", "From match data"],
  ["Living in Silico", "/experience/living-in-silico", "Learning a new science through machine learning."],
  ["Stush Patties", "/experience/stush-patties", "Making distributor data easier to use."],
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
