// @vitest-environment happy-dom

import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
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

let host: HTMLDivElement;
let root: Root;
const originalInnerWidth = window.innerWidth;

beforeEach(() => {
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
});

afterEach(() => {
  if (root) act(() => root.unmount());
  host?.remove();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  Object.defineProperty(window, "innerWidth", { configurable: true, value: originalInnerWidth });
});

describe("League client shell", () => {
  it("uses the optical-size header J and makes the top-right account the Profile entry", () => {
    const markup = renderClient();

    expect(markup).toContain('/media/profile/open-portfolio-j-small-54.svg');
    expect(markup).toContain('href="/profile"');
    expect(markup).toContain('aria-label="Open profile"');
    expect(markup).toContain('/media/profile/topbar-account-ring.png');
    expect(markup).toContain('/media/lobby/client-account-avatar.png');
    expect(markup).toContain('/media/lobby/shell-utility-flag.svg');
    expect(markup).toContain('/media/lobby/shell-utility-clock.svg');
    expect(markup).toContain("Joshua Aryeetey");
  });

  it("keeps the rail compact, uses approved marks, and omits hidden draft labels", () => {
    const markup = renderClient();

    expect(markup).toContain('data-node-id="3317:4"');
    expect(markup).toContain('/media/profile/open-portfolio-j-small-48.svg');
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

  it("places the three contact destinations after page content for the narrow shell", () => {
    const markup = renderClient("/projects");
    const mainEnd = markup.indexOf("</main>");
    const contactStart = markup.indexOf('<nav class="mobile-contact-row" aria-label="Contact links">');
    const contactEnd = markup.indexOf("</nav>", contactStart);
    const railFooterStart = markup.indexOf('<footer class="rail-social-footer"');
    const contactMarkup = markup.slice(contactStart, contactEnd + "</nav>".length);

    expect(contactStart).toBeGreaterThan(mainEnd);
    expect(contactStart).toBeLessThan(railFooterStart);
    expect(contactMarkup).toContain('href="https://github.com/joshuaAryy"');
    expect(contactMarkup).toContain('aria-label="GitHub (opens in a new tab)"');
    expect(contactMarkup).toContain('href="https://ca.linkedin.com/in/joshua-ary"');
    expect(contactMarkup).toContain('aria-label="LinkedIn (opens in a new tab)"');
    expect(contactMarkup).toContain('href="mailto:joshuaaryy@gmail.com"');
    expect(contactMarkup).toContain('aria-label="Email Joshua"');
    expect(contactMarkup).not.toContain("Help");
    expect(contactMarkup).not.toContain(">X<");
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

describe("Client route focus", () => {
  it("keeps the Home Help focus ring inside the tablet header", () => {
    const css = readFileSync("src/styles.css", "utf8");
    const tabletRules = css.slice(
      css.lastIndexOf("@media (min-width: 651px) and (max-width: 900px)"),
    );

    expect(tabletRules).toMatch(
      /\.client--home-shell \.top-nav \.header-help:focus-visible\s*\{[^}]*outline-offset:\s*-3px/s,
    );
  });

  it("focuses the narrow Home main without scrolling the header out of view", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
    const focus = vi.spyOn(HTMLElement.prototype, "focus").mockImplementation(() => {});
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);

    act(() => {
      root.render(
        <MemoryRouter initialEntries={["/home"]}>
          <Client pageClass="main--home-explore">Home content</Client>
        </MemoryRouter>,
      );
    });

    expect.soft(scrollTo).toHaveBeenCalledWith(0, 0);
    expect.soft(focus).toHaveBeenCalledWith({ preventScroll: true });
    expect(focus.mock.instances[0]).toBe(host.querySelector("main"));
  });

  it("keeps the Home header visible when focusing main at tablet widths", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 900 });
    const focus = vi.spyOn(HTMLElement.prototype, "focus").mockImplementation(() => {});
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);

    act(() => {
      root.render(
        <MemoryRouter initialEntries={["/home"]}>
          <Client pageClass="main--home-explore">Home content</Client>
        </MemoryRouter>,
      );
    });

    expect(scrollTo).toHaveBeenCalledWith(0, 0);
    expect(focus).toHaveBeenCalledWith({ preventScroll: true });
    expect(focus.mock.instances[0]).toBe(host.querySelector("main"));
  });

  it("reveals the full Home Help control when it receives focus on mobile", () => {
    Object.defineProperty(window, "innerWidth", { configurable: true, value: 390 });
    vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);

    act(() => {
      root.render(
        <MemoryRouter initialEntries={["/home"]}>
          <Client pageClass="main--home-explore">Home content</Client>
        </MemoryRouter>,
      );
    });

    const nav = host.querySelector<HTMLElement>(".top-nav")!;
    const help = host.querySelector<HTMLElement>(".header-help")!;
    vi.spyOn(nav, "getBoundingClientRect").mockReturnValue(new DOMRect(73, 0, 263, 68));
    vi.spyOn(help, "getBoundingClientRect").mockReturnValue(new DOMRect(302, 6, 84, 56));
    Object.defineProperty(nav, "scrollWidth", { configurable: true, value: 321 });
    Object.defineProperty(nav, "clientWidth", { configurable: true, value: 263 });

    act(() => help.focus());

    expect(nav.scrollLeft).toBe(58);
  });
});
