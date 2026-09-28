import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Client } from "./PortfolioLayout";

function renderClient(path = "/profile") {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Client pageClass="main--profile">
        <p>Profile page</p>
      </Client>
    </MemoryRouter>,
  );
}

describe("League client shell", () => {
  it("uses the Figma client emblem and makes the top-right account the Profile entry", () => {
    const markup = renderClient();

    expect(markup).toContain('/media/profile/topbar-client-emblem.svg');
    expect(markup).toContain('href="/profile"');
    expect(markup).toContain('aria-label="Open profile"');
    expect(markup).toContain('/media/profile/topbar-account-ring.png');
    expect(markup).toContain('/media/profile/topbar-avatar.png');
    expect(markup).toContain('/media/lobby/shell-utility-flag.svg');
    expect(markup).toContain('/media/lobby/shell-utility-clock.svg');
    expect(markup).toContain("Joshua Aryeetey");
  });

  it("keeps the rail compact, uses approved marks, and omits hidden draft labels", () => {
    const markup = renderClient();

    expect(markup).toContain('/media/profile/open-portfolio-j.svg');
    expect(markup).toContain('/media/profile/food-tracker-mark.svg');
    expect(markup).toContain('/media/profile/profile-crest-emblem.png');
    expect(markup).toContain('/media/profile/living-in-silico-logo.png');
    expect(markup).toContain('/media/profile/stush-patties-logo.png');
    expect(markup).toContain('/media/lobby/activity-add.svg');
    expect(markup).toContain('/media/lobby/activity-list.svg');
    expect(markup).toContain('/media/lobby/activity-collapse.svg');
    expect(markup).toContain("GENERAL · PORTFOLIO");
    expect(markup).toContain("OPEN TO SUMMER 2027");
    expect(markup).not.toContain("CASE STUDY");
    expect(markup).not.toContain("VIEW SOURCE REPOSITORY");
  });

  it("matches Home Figma by keeping Resume out of the main destination navigation", () => {
    for (const path of ["/", "/home"]) {
      const markup = renderClient(path);
      const navigation = markup.slice(
        markup.indexOf('<nav class="top-nav"'),
        markup.indexOf("</nav>", markup.indexOf('<nav class="top-nav"')),
      );

      expect(navigation).toContain('href="/projects"');
      expect(navigation).toContain('href="/experience"');
      expect(navigation).toContain('href="/hackathons"');
      expect(navigation).toContain('href="/education"');
      expect(navigation).not.toContain('href="/resume"');
    }
  });
});
