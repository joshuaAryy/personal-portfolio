import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";

function renderRoute(path: string) {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

describe("help and route recovery", () => {
  it("documents the current section routes and shared empty state", () => {
    const markup = renderRoute("/help");

    expect(markup).toContain("Find your way around.");
    for (const route of [
      "/projects",
      "/experience",
      "/profile",
      "/profile/journey",
      "/profile/demos",
    ]) {
      expect(markup).toContain(`href="${route}"`);
    }
    expect(markup).toContain('class="utility-state utility-state--empty"');
    expect(markup.toLowerCase()).toContain("does not promise an automatic retry");
  });

  it("recovers unknown client routes with links to current indexes", () => {
    const markup = renderRoute("/unknown-client-route");

    expect(markup).toContain('aria-label="Error 404"');
    expect(markup).toContain('id="not-found-title"');
    expect(markup).toContain('aria-label="Recovery links"');
    expect(markup).toContain('class="utility-state utility-state--unavailable"');
    for (const route of ["/projects", "/experience", "/profile"]) {
      expect(markup).toContain(`href="${route}"`);
    }
  });
});
