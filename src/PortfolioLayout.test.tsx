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
  it("keeps the complete canonical Food mark inside its SVG and clip bounds", () => {
    const svg = readFileSync("public/media/profile/food-tracker-mark.svg", "utf8");
    const rootAttributes = svg.match(/^<svg\b([^>]*)>/)?.[1] ?? "";
    const viewBoxMatch = svg.match(/viewBox="([\d.]+) ([\d.]+) ([\d.]+) ([\d.]+)"/);
    const circleMatch = svg.match(/<circle\b([^>]*)\/>/);
    const clipMatch = svg.match(/<clipPath id="clip0_0_10">([\s\S]*?)<\/clipPath>/);
    const clipRectMatch = clipMatch?.[1].match(/<rect\b([^>]*)\/>/);
    const readNumber = (attributes: string, name: string, fallback = 0) =>
      Number(attributes.match(new RegExp(`\\b${name}="([\\d.]+)"`))?.[1] ?? fallback);

    expect(viewBoxMatch).not.toBeNull();
    expect(circleMatch).not.toBeNull();
    expect(clipRectMatch).not.toBeNull();
    expect(rootAttributes).toMatch(/\bpreserveAspectRatio="xMidYMid meet"/);

    const [, viewX, viewY, viewWidth, viewHeight] = viewBoxMatch!.map(Number);
    const circle = circleMatch![1];
    const centerX = readNumber(circle, "cx");
    const centerY = readNumber(circle, "cy");
    const radius = readNumber(circle, "r");
    const halfStroke = readNumber(circle, "stroke-width") / 2;
    const circleLeft = centerX - radius - halfStroke;
    const circleTop = centerY - radius - halfStroke;
    const circleRight = centerX + radius + halfStroke;
    const circleBottom = centerY + radius + halfStroke;
    const clipRect = clipRectMatch![1];
    const clipX = readNumber(clipRect, "x");
    const clipY = readNumber(clipRect, "y");
    const clipRight = clipX + readNumber(clipRect, "width");
    const clipBottom = clipY + readNumber(clipRect, "height");

    expect(circleLeft).toBeGreaterThanOrEqual(viewX);
    expect(circleTop).toBeGreaterThanOrEqual(viewY);
    expect(circleRight).toBeLessThanOrEqual(viewX + viewWidth);
    expect(circleBottom).toBeLessThanOrEqual(viewY + viewHeight);
    expect(circleLeft).toBeGreaterThanOrEqual(clipX);
    expect(circleTop).toBeGreaterThanOrEqual(clipY);
    expect(circleRight).toBeLessThanOrEqual(clipRight);
    expect(circleBottom).toBeLessThanOrEqual(clipBottom);
  });

  it("uses the optical-size header J and makes the top-right account the Profile entry", () => {
    const markup = renderClient();

    expect(markup).toContain('/media/profile/open-portfolio-j-small-54.svg');
    expect(markup).toContain('href="/profile"');
    expect(markup).toContain('aria-label="Open profile"');
    expect(markup).toContain('/media/profile/topbar-account-ring.png');
    expect(markup).toContain('/media/profile/topbar-avatar.png');
    expect(markup).toContain('href="https://ca.linkedin.com/in/joshua-ary"');
    expect(markup).toContain('href="/resume"');
    expect(markup).toContain('href="https://github.com/joshuaAryy"');
    expect(markup).toContain('href="mailto:joshuaaryy@gmail.com"');
    expect(markup).not.toContain('/media/lobby/shell-utility-flag.svg');
    expect(markup).not.toContain('aria-label="Expected graduation 2028; third place in the Brim Financial Challenge"');
    expect(markup).toContain("Joshua Aryeetey");
  });

  it("keeps the authentic portrait and verified utilities on project detail shells", () => {
    const markup = renderClient("/projects/food-tracker");

    expect(markup).toContain('class="header-account__avatar" src="/media/profile/topbar-avatar.png"');
    expect(markup).toContain('href="https://ca.linkedin.com/in/joshua-ary"');
    expect(markup).toContain('href="/resume"');
    expect(markup).toContain('href="https://github.com/joshuaAryy"');
    expect(markup).toContain('href="mailto:joshuaaryy@gmail.com"');
  });

  it("gives Resume and Email distinct high emphasis in the utility row", () => {
    const markup = renderClient("/home");
    const utilityNavigation = markup.slice(
      markup.indexOf('<nav class="header-client-tools"'),
      markup.indexOf("</nav>", markup.indexOf('<nav class="header-client-tools"')),
    );

    expect(utilityNavigation).toContain('class="header-client-tool header-client-tool--resume"');
    expect(utilityNavigation).toContain('class="header-client-tool header-client-tool--email"');
    expect(readFileSync("src/styles.css", "utf8")).toMatch(
      /\.header-client-tool--resume\s*\{[^}]*font-weight:\s*700/s,
    );
    expect(readFileSync("src/styles.css", "utf8")).toMatch(
      /\.header-client-tool--email\s*\{[^}]*font-weight:\s*700/s,
    );
  });

  it("groups LinkedIn, GitHub, Email, and Resume in the intended utility order", () => {
    const markup = renderClient("/home");
    const utilityNavigation = markup.slice(
      markup.indexOf('<nav class="header-client-tools"'),
      markup.indexOf("</nav>", markup.indexOf('<nav class="header-client-tools"')),
    );
    const labels = [...utilityNavigation.matchAll(/class="header-client-tool[^\"]*"[^>]*>([^<]+)/g)]
      .map((match) => match[1]);
    const mobileNavigation = markup.slice(
      markup.indexOf('<nav class="mobile-contact-row"'),
      markup.indexOf("</nav>", markup.indexOf('<nav class="mobile-contact-row"')),
    );
    const mobileHrefs = [...mobileNavigation.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    const css = readFileSync("src/styles.css", "utf8");

    expect(labels).toEqual(["LinkedIn", "GitHub", "Email", "Resume"]);
    expect(mobileHrefs).toEqual([
      "https://ca.linkedin.com/in/joshua-ary",
      "https://github.com/joshuaAryy",
      "mailto:joshuaaryy@gmail.com",
      "/resume",
    ]);
    expect(css).toMatch(/\.header-client-tools\s*\{[^}]*padding-left:\s*clamp\(14px,[^}]*border-left:\s*1px solid/s);
    expect(css).toMatch(/\.client--home-shell \.header-client-tools\s*\{[^}]*margin-left:\s*clamp\(22px,/s);
  });

  it("does not hide the approved utility links on project shells", () => {
    const css = readFileSync("src/styles.css", "utf8");
    expect(css).not.toMatch(
      /\.client--project-shell \.header-client-tools,[^{]+\{[^}]*display:\s*none/,
    );
  });

  it("keeps the rail compact, uses approved marks, and omits hidden draft labels", () => {
    const markup = renderClient();
    const activityMarkup = renderClient("/home");

    expect(markup).toContain('data-node-id="3317:4"');
    expect(markup).toContain('/media/profile/open-portfolio-j-small-48.svg');
    expect(markup).toContain('/media/profile/food-tracker-mark.svg');
    expect(activityMarkup).toContain('class="rail-avatar rail-avatar--activity rail-avatar--activity-focus" aria-hidden="true" data-node-id="I2356:611;95:51">');
    expect(activityMarkup).toContain('src="/media/profile/food-tracker-mark.svg" alt="" width="34" height="34"');
    expect(activityMarkup).toContain('src="/media/lobby/activity-art/activity-living-in-silico.svg" alt="" width="54" height="54"');
    expect(activityMarkup).toContain('src="/media/lobby/activity-art/activity-stush-patties.svg" alt="" width="54" height="54"');
    expect(markup).toContain('/media/profile/profile-crest-emblem.png');
    expect(markup).toContain('/media/profile/living-in-silico-logo.png');
    expect(markup).toContain('/media/profile/stush-patties-logo.png');
    expect(markup).toContain('/media/profile/open-portfolio-j-small-54.svg');
    expect(markup).toContain('/media/profile/food-tracker-mark.svg');
    expect(markup).not.toContain('/media/lobby/activity-art/activity-food-tracker.svg');
    expect(markup).not.toContain('/media/lobby/activity-art/activity-crest.svg');
    expect(markup).not.toContain('data-node-id="I2356:611;95:20">J</span>');
    expect(markup).toContain('/media/profile/profile-crest-emblem.png');
    expect(markup).toContain('/media/lobby/activity-add.svg');
    expect(markup).toContain('/media/lobby/activity-list.svg');
    expect(markup).toContain('/media/lobby/activity-collapse.svg');
    expect(markup).toContain("GENERAL · PORTFOLIO");
    expect(markup).toContain("OPEN TO SUMMER 2027");
    expect(markup).not.toContain("CASE STUDY");
    expect(markup).not.toContain("VIEW SOURCE REPOSITORY");
  });

  it("uses the canonical J mark in the Portfolio Activity medallion", () => {
    const markup = renderClient("/home");
    const portfolioStart = markup.indexOf('class="rail-avatar rail-avatar--activity rail-avatar--activity-portfolio"');
    const portfolioEnd = markup.indexOf("</span>", portfolioStart);
    const portfolioMark = markup.slice(portfolioStart, portfolioEnd);
    const headerMark = markup.match(/class="brand-glyph" src="([^"]+)"/)?.[1];
    const activityMark = portfolioMark.match(/src="([^"]+)" alt="" width="38" height="38" data-node-id="I2356:611;95:20"/)?.[1];

    expect(portfolioMark).toContain('/media/lobby/activity-art/activity-portfolio-ring.svg');
    expect(activityMark).toBe(headerMark);
    expect(portfolioMark).not.toContain(">J</span>");
    expect(readFileSync("src/styles.css", "utf8")).toMatch(
      /\.rail-avatar--activity-portfolio img\s*\{[^}]*transform:\s*none/s,
    );
  });

  it("gives Home and Resume Activity rows the Figma breathing room", () => {
    const css = readFileSync("src/styles.css", "utf8");

    expect(css).toMatch(
      /\.client--home-shell \.rail-link--status,\s*\.client--resume-shell \.rail-link--status\s*\{[^}]*min-height:\s*62px/s,
    );
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
    expect(contactMarkup).toContain('href="/resume"');
    expect(contactMarkup).toContain(">Resume</a>");
    expect(contactMarkup).not.toContain("Help");
    expect(contactMarkup).not.toContain(">X<");
  });

  it("matches Home Figma by keeping Resume out of the main destination navigation", () => {
    for (const path of ["/", "/home", "/projects", "/experience", "/hackathons", "/education"]) {
      const markup = renderClient(path);
      const navigation = markup.slice(
        markup.indexOf('<nav class="top-nav"'),
        markup.indexOf("</nav>", markup.indexOf('<nav class="top-nav"')),
      );
      const utilityNavigation = markup.slice(
        markup.indexOf('<nav class="header-client-tools"'),
        markup.indexOf("</nav>", markup.indexOf('<nav class="header-client-tools"')),
      );

      expect(navigation).toContain('href="/projects"');
      expect(navigation).toContain('href="/experience"');
      expect(navigation).toContain('href="/hackathons"');
      expect(navigation).toContain('href="/education"');
      expect(navigation).not.toContain('href="/resume"');
      expect(utilityNavigation).toContain('href="/resume"');
    }
  });

  it("fits the four primary labels and Help before the account control on narrow shells", () => {
    const css = readFileSync("src/styles.css", "utf8");

    expect(css).toMatch(/(?:^|[}\n])\s*\.top-nav a:nth-child\(-n \+ 4\)\s*\{[^}]*font-size:\s*9px/s);
    expect(css).toMatch(/(?:^|[}\n])\s*\.top-nav a\.header-help,\s*\.top-nav button\.header-help\s*\{[^}]*min-width:\s*36px/s);
    expect(css).toMatch(/(?:^|[}\n])\s*\.top-nav > a,\s*\.top-nav > button\s*\{[^}]*height:\s*56px/s);
  });

  it("keeps the narrow Help button from inheriting the wider desktop minimum", () => {
    const css = readFileSync("src/styles.css", "utf8");
    const narrowRules = css.slice(css.indexOf("@media (max-width: 650px)"));
    const helpButtonRule = narrowRules.match(
      /\.top-nav a\.header-help,\s*\.top-nav button\.header-help\s*\{([^}]*)\}/,
    )?.[1];

    expect(helpButtonRule).toMatch(/min-width:\s*36px/);
    expect(helpButtonRule).toMatch(/flex:\s*0\s+0\s+36px/);
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

  it("reserves a compact Help slot before the narrow account control", () => {
    const css = readFileSync("src/styles.css", "utf8");
    const narrowRules = css.slice(css.indexOf("@media (max-width: 650px)"));
    const helpRule = narrowRules.match(
      /\.top-nav a\.header-help,\s*\.top-nav button\.header-help\s*\{([^}]*)\}/,
    )?.[1];

    expect(helpRule).toMatch(/min-width:\s*36px/);
    expect(helpRule).toMatch(/flex:\s*0\s+0\s+36px/);
    expect(helpRule).toMatch(/padding-inline:\s*2px/);
    expect(css).toMatch(
      /(?:^|[}\n])\s*\.top-nav a:nth-child\(-n \+ 4\)\s*\{[^}]*flex:\s*0 0 auto/s,
    );
    expect(css).toMatch(/\.top-nav\s*\{[^}]*overflow-x:\s*auto/s);
  });
});
