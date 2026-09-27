import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

afterEach(() => {
  vi.unstubAllGlobals();
});

function renderRoute(path: string) {
  vi.stubGlobal("window", {
    matchMedia: () => ({ matches: false }),
  });
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

const primaryRoutes = [
  ["opening", "/", ">SKIP</button>"],
  ["Home / Explore", "/home", "Select a portfolio mode"],
  ["projects", "/projects", "PROJECTS \u00b7 FEATURED"],
  ["experience", "/experience", "PROFESSIONAL WORK \u00b7 RESEARCH \u00b7 DATA SYSTEMS"],
  ["hackathons", "/hackathons", "HACKATHONS"],
  ["education", "/education", "EDUCATION"],
  ["profile overview", "/profile", "<h1>JOSHUA ARYEETEY</h1>"],
  ["profile journey", "/profile/journey", "<h1>Curiosity became building.</h1>"],
  ["profile demos", "/profile/demos", "data-node-id=\"1316:131\">FOOD TRACKER</h1>"],
  ["resume found", "/resume", "<h1 id=\"resume-found-title\">Resume Found</h1>"],
  ["resume viewer", "/resume/viewer", "APPROVED GENERAL RESUME"],
] as const;

describe("primary App route mapping", () => {
  it.each(primaryRoutes)("renders the %s surface at %s", (_surface, path, marker) => {
    expect(renderRoute(path)).toContain(marker);
  });
});
