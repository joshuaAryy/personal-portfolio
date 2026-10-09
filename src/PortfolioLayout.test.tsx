// @vitest-environment happy-dom

import { readFileSync } from "node:fs";
import { renderToStaticMarkup } from "react-dom/server";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { experienceIdentities, portfolioIdentity, projectIdentities } from "./data";
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
    expect(circleLeft - viewX).toBeGreaterThan(1.5);
    expect(circleTop - viewY).toBeGreaterThan(1.5);
    expect(viewX + viewWidth - circleRight).toBeGreaterThan(1.5);
    expect(viewY + viewHeight - circleBottom).toBeGreaterThan(1.5);
    expect(circleLeft).toBeGreaterThanOrEqual(clipX);
    expect(circleTop).toBeGreaterThanOrEqual(clipY);
    expect(circleRight).toBeLessThanOrEqual(clipRight);
    expect(circleBottom).toBeLessThanOrEqual(clipBottom);
  });

  it("uses the optical-size header J and makes the top-right account the Profile entry", () => {
    const markup = renderClient();

    expect(markup).toContain('/media/profile/j-candidate-06-m54.svg');
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

  it("uses the canonical portfolio J in the project-shell Activity rail", () => {
    const markup = renderClient("/projects/food-tracker");
    const rail = markup.slice(markup.indexOf('<aside class="rail"'), markup.indexOf("</aside>") + 7);

    expect(rail).toContain(`src="${portfolioIdentity.mark}"`);
    expect(rail).not.toContain("/media/lobby/client-j-mark.svg");
  });

  it("links the Activity footer X control to the owner's verified profile", () => {
    const markup = renderClient("/home");
    const railStart = markup.indexOf('<aside class="rail"');
    const railEnd = markup.indexOf("</aside>", railStart) + "</aside>".length;
    const rail = markup.slice(railStart, railEnd);

    expect(rail).toContain('href="https://x.com/Cartizionplane"');
    expect(rail).toContain('aria-label="X profile (opens in a new tab)"');
    expect(rail).not.toContain('<span aria-hidden="true">X</span>');
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
      "https://x.com/Cartizionplane",
      "mailto:joshuaaryy@gmail.com",
      "/resume",
    ]);
    expect(css).toMatch(/\.header-client-tools\s*\{[^}]*padding-left:\s*clamp\(14px,[^}]*border-left:\s*1px solid/s);
    expect(css).toMatch(/\.client--home-shell \.header-client-tools\s*\{[^}]*margin-left:\s*auto/s);
  });

  it("keeps Resume primary and Email clearly actionable across narrow contact rows", () => {
    const css = readFileSync("src/styles.css", "utf8");
    const homeMarkup = renderClient("/home");
    const projectMarkup = renderClient("/projects/food-tracker");
    const mobileRowFor = (markup: string) => markup.slice(
      markup.indexOf('<nav class="mobile-contact-row"'),
      markup.indexOf("</nav>", markup.indexOf('<nav class="mobile-contact-row"')),
    );

    expect(mobileRowFor(homeMarkup)).toContain('class="rail-social-footer__email"');
    expect(mobileRowFor(projectMarkup)).toContain('class="rail-social-footer__email"');
    expect(css).toMatch(
      /\.mobile-contact-row > a\[href="\/resume"\]\s*\{[^}]*min-height:\s*44px[^}]*background:/s,
    );
    expect(css).toMatch(
      /\.mobile-contact-row > a\.rail-social-footer__email\s*\{[^}]*width:\s*44px[^}]*height:\s*44px[^}]*border:/s,
    );
    expect(css).not.toMatch(/\.client--home-shell \.mobile-contact-row > a(?:\[href="\/resume"\]|\.rail-social-footer__email)/);
  });

  it("does not hide the approved utility links on project shells", () => {
    const css = readFileSync("src/styles.css", "utf8");
    expect(css).not.toMatch(
      /\.client--project-shell \.header-client-tools,[^{]+\{[^}]*display:\s*none/,
    );
  });

  it("uses the shared canonical project and experience rail on profile routes", () => {
    const markup = renderClient();

    expect(markup).toContain('data-node-id="3317:4"');
    expect(markup).toContain('/media/profile/j-candidate-06-m54.svg');
    expect(markup).toContain('/media/profile/food-tracker-mark.svg');
    expect(markup).toContain("PROJECTS (4)");
    expect(markup).toContain("EXPERIENCE (2)");
    expect(markup).toContain('/media/profile/choveigo-mark.svg');
    expect(markup).toContain('/media/profile/profile-crest-emblem.png');
    expect(markup).toContain('/media/profile/fraymakers-logo.png');
    expect(markup).toContain('/media/profile/living-in-silico-logo.png');
    expect(markup).toContain('/media/profile/stush-patties-logo.png');
    expect(markup).toContain("GENERAL · PORTFOLIO");
    expect(markup).not.toContain("IN DEVELOPMENT (2)");
    expect(markup).not.toContain("COMPLETED (3)");
    expect(markup).not.toContain('/media/lobby/activity-art/activity-portfolio-ring.svg');
    expect(markup).toContain('/media/profile/profile-crest-emblem.png');
    expect(markup).toContain('/media/profile/living-in-silico-logo.png');
    expect(markup).toContain('/media/profile/stush-patties-logo.png');
    expect(markup).toContain('/media/profile/j-candidate-06-m54.svg');
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

  it("uses the shared project and experience Activity rail on Resume routes", () => {
    const markup = renderClient("/resume/viewer");

    expect(markup).toContain("PROJECTS (4)");
    expect(markup).toContain("EXPERIENCE (2)");
    expect(markup).not.toContain("IN DEVELOPMENT (2)");
    expect(markup).not.toContain('/media/lobby/activity-art/');
    expect(markup).toContain('/media/profile/j-candidate-06-m54.svg');
    expect(markup).toContain('/media/profile/living-in-silico-logo.png');
    expect(markup).toContain('/media/profile/stush-patties-logo.png');
  });

  it("uses the shared canonical Activity rail on Home with canonical marks and links", () => {
    const markup = renderClient("/home");
    const railStart = markup.indexOf('<aside class="rail"');
    const railEnd = markup.indexOf("</aside>", railStart) + "</aside>".length;
    const rail = markup.slice(railStart, railEnd);

    expect(rail).toContain('class="rail-availability"');
    expect(rail).toContain('data-node-id="3317:4"');
    expect(rail).toContain('class="rail-party"');
    expect(rail).toContain("CURRENT FOCUS");
    expect(rail).toContain("PROJECTS (4)");
    expect(rail).toContain("EXPERIENCE (2)");
    expect(rail).toContain("Food Tracker");
    expect(rail).toContain("Cho’Veigo");
    expect(rail).toContain("Living in Silico");
    expect(rail).toContain("Stush Patties");
    expect(rail).toContain("Crest");
    expect(rail).not.toContain("IN DEVELOPMENT");
    expect(rail).not.toContain("COMPLETED");
    expect(rail).not.toContain(">Portfolio<");
    expect(rail).toContain('href="/projects/food-tracker"');
    expect(rail).toContain('href="/projects/choveigo"');
    expect(rail).toContain('href="/experience/living-in-silico"');
    expect(rail).toContain(`src="${portfolioIdentity.mark}"`);
    expect(rail).toContain(`src="${projectIdentities["food-tracker"].mark}"`);
    expect(rail).toContain(`src="${projectIdentities.choveigo.mark}"`);
    expect(rail).toContain(`src="${experienceIdentities["living-in-silico"].mark}"`);
    expect(rail).toContain(`src="${experienceIdentities["stush-patties"].mark}"`);
    expect(rail).toContain(`src="${projectIdentities.crest.mark}"`);
    expect(rail).not.toContain("/media/lobby/activity-art/");
    expect(rail).not.toContain('data-node-id="I2356:611;95:18"');
  });

  it("keeps Home, Resume, and interior routes on the same canonical Activity structure", () => {
    const css = readFileSync("src/styles.css", "utf8");
    const home = renderClient("/home");
    const resume = renderClient("/resume/viewer");
    const experiencePage = renderClient("/experience");

    expect(css).toMatch(/\.rail-link,\s*\.rail-item\s*\{[^}]*min-height:\s*50px/s);
    expect(css).not.toMatch(/\.client--home-shell \.rail-(?:availability--focus|group--activity-status|link--status|avatar--activity)/);
    for (const markup of [home, resume, experiencePage]) {
      const railStart = markup.indexOf('<aside class="rail"');
      const railEnd = markup.indexOf("</aside>", railStart) + "</aside>".length;
      const rail = markup.slice(railStart, railEnd);

      expect(rail).toContain("PROJECTS (4)");
      expect(rail).toContain("EXPERIENCE (2)");
      expect(rail).not.toContain("IN DEVELOPMENT");
      expect(rail).not.toContain("COMPLETED");
      expect(rail).not.toContain("/media/lobby/activity-art/");
    }
  });

  it("crops only the canonical Living in Silico and Stush Patties rail marks to the circular frame", () => {
    const css = readFileSync("src/styles.css", "utf8");
    const cropRule = css.match(/\.rail-avatar img\[src="([^"]+)"\],\s*\.rail-avatar img\[src="([^"]+)"\]\s*\{([^}]*)\}/s);
    const defaultRule = css.match(/\.rail-avatar img\s*\{([^}]*)\}/)?.[1] ?? "";

    expect(cropRule?.[1]).toBe(experienceIdentities["living-in-silico"].mark);
    expect(cropRule?.[2]).toBe(experienceIdentities["stush-patties"].mark);
    expect(cropRule?.[3]).toMatch(/width:\s*100%/);
    expect(cropRule?.[3]).toMatch(/height:\s*100%/);
    expect(cropRule?.[3]).toMatch(/border-radius:\s*50%/);
    expect(cropRule?.[3]).toMatch(/object-fit:\s*cover/);
    expect(defaultRule).toMatch(/width:\s*26px/);
    expect(defaultRule).toMatch(/height:\s*26px/);
    expect(defaultRule).toMatch(/object-fit:\s*contain/);
  });

  it("places social, contact, and resume destinations after page content for the narrow shell", () => {
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
    expect(contactMarkup).toContain('href="https://x.com/Cartizionplane"');
    expect(contactMarkup).toContain('aria-label="X profile (opens in a new tab)"');
    expect(contactMarkup).toContain('href="/resume"');
    expect(contactMarkup).toContain(">Resume</a>");
    expect(contactMarkup).not.toContain("Help");
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

  it("keeps the narrow project-shell avatar clear of the Help slot", () => {
    const css = readFileSync("src/styles.css", "utf8");

    expect(css).toMatch(/\.client--project-shell \.header-account__portrait,\s*\.client--project-shell \.header-account__ring\s*\{[^}]*width:\s*42px;[^}]*height:\s*42px/s);
    expect(css).toMatch(/\.client--project-shell \.header-account__avatar\s*\{[^}]*width:\s*30px;[^}]*height:\s*30px/s);
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
