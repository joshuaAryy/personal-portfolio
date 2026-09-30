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
  it("does not render a standalone Help documentation page", () => {
    const markup = renderRoute("/help");

    expect(markup).not.toContain('class="utility-page');
    expect(markup).not.toContain("Find your way around.");
  });

  it("recovers unknown client routes with links to current indexes", () => {
    const markup = renderRoute("/unknown-client-route");

    expect(markup).toContain('aria-label="Error 404"');
    expect(markup).toContain('id="not-found-title"');
    expect(markup).toContain('aria-label="Recovery link"');
    const recovery = markup.slice(markup.indexOf('aria-label="Recovery link"'));
    expect(recovery).toContain('href="/projects"');
    expect(recovery).toContain("Go to Projects");
    expect(recovery).not.toContain('href="/experience"');
    expect(recovery).not.toContain('href="/profile"');
  });
});
