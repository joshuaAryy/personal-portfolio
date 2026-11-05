import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import JourneyCase from "./JourneyCase";
import * as JourneyCaseModule from "./JourneyCase";
import { resolveActiveWaypoint } from "./JourneyCase";
import { readFileSync } from "node:fs";

function renderJourneyRoute() {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={["/profile/journey"]}>
      <JourneyCase />
    </MemoryRouter>,
  );
}

function cssBlock(source: string, selector: string) {
  const selectorStart = source.indexOf(selector);
  if (selectorStart < 0) return "";
  const openBrace = source.indexOf("{", selectorStart);
  if (openBrace < 0) return "";
  let depth = 0;
  for (let index = openBrace; index < source.length; index += 1) {
    if (source[index] === "{") depth += 1;
    if (source[index] === "}") {
      depth -= 1;
      if (depth === 0) return source.slice(openBrace + 1, index);
    }
  }
  return "";
}

describe("Journey story", () => {
  it("renders all nine story beats in their approved order", () => {
    const markup = renderJourneyRoute();
    const beats = [
      "Roblox Studio",
      "Curiosity about the hardware",
      "Computer Engineering",
      "Naruto semantic search",
      "Machine learning became tangible",
      "Connecting algorithms to research",
      "Spotify recommender idea",
      "Software Engineering Intern",
      "Learning to finish things",
    ];

    let previousIndex = -1;
    for (const beat of beats) {
      const nextIndex = markup.indexOf(beat);
      expect(nextIndex).toBeGreaterThan(previousIndex);
      previousIndex = nextIndex;
    }
    expect(markup).toContain("From play to deeper questions to building with care.");
    expect(markup).toContain("I built an idea in Roblox Studio and shared it with friends. Watching them play was exciting; it was my first glimpse of building for others.");
    expect(markup).toContain("I spent hours wondering how the chips and design choices in MacBooks and iPhones shaped the way they worked.");
    expect(markup).toContain("At TMU, curiosity shifted from what devices did to the systems underneath. Computer Engineering gave me a way to study what I wanted to build.");
    expect(markup).toContain("Could embeddings find Naruto characters by personality, abilities, or relationships—not just exact terms? I imagined a playful way to explore a series I already loved.");
    expect(markup).toContain("Generative molecular modeling made machine learning tangible: I could use it to explore a research question.");
    expect(markup).toContain("I made time before school for a Stanford ML lecture because I wanted to connect its algorithms to our research.");
    expect(markup).toContain("Everyday interests raised new ML questions. Could audio features and neural networks help recommend music I might like?");
    expect(markup).toContain("Working with a teammate at Stush Patties showed me how to turn a messy reporting need into a repeatable workflow.");
    expect(markup).toContain("Food Tracker, Crest, and Cho’Veigo are teaching me to carry ideas through details, make decisions, and keep working toward a finish.");
    expect(markup).toContain("More to learn. More to build.");
    expect(markup).not.toContain("NEVER BUILT");
    expect(markup).not.toContain("3–4 a.m.");
  });

  it("provides five named locator links to their unique waypoints", () => {
    const markup = renderJourneyRoute();
    const waypointIds = ["origin", "tmu", "living-in-silico", "stush", "summer-2026"];

    expect(markup).toContain('aria-label="Journey chapters"');
    expect(markup).toContain('aria-current="location"');
    for (const waypoint of waypointIds) {
      expect(markup).toContain(`href="#journey-${waypoint}"`);
      expect(markup).toContain(`id="journey-${waypoint}"`);
      expect(markup.match(new RegExp(`id="journey-${waypoint}"`, "g"))).toHaveLength(1);
    }
  });
});

describe("Journey waypoint selection", () => {
  it("follows the last heading above the activation line", () => {
    const tops = {
      origin: -100,
      tmu: -80,
      "living-in-silico": -60,
      stush: 20,
      "summer-2026": 500,
    };

    expect(resolveActiveWaypoint(tops, 78, false)).toBe("stush");
    expect(resolveActiveWaypoint(tops, 78, true)).toBe("summer-2026");
  });

  it("keeps Origin selected before the first heading reaches the line", () => {
    const tops = {
      origin: 140,
      tmu: 500,
      "living-in-silico": 700,
      stush: 900,
      "summer-2026": 1200,
    };

    expect(resolveActiveWaypoint(tops, 78, false)).toBe("origin");
  });

  it("keeps a heading active when integer scroll rounding leaves it fractionally past the line", () => {
    const tops = {
      origin: -120,
      tmu: 471.48,
      "living-in-silico": 900,
      stush: 1300,
      "summer-2026": 1600,
    };

    expect(resolveActiveWaypoint(tops, 471.3, false)).toBe("tmu");
  });

  it("draws a connected zigzag milestone path aligned with the story cards", () => {
    const markup = renderJourneyRoute();
    const css = readFileSync("src/styles.css", "utf8");
    const responsive = cssBlock(css, "@container journey-content (max-width: 900px)");

    expect(markup).toContain('class="journey-path" aria-hidden="true"');
    expect(markup).toContain('class="journey-path__spine"');
    expect(markup).toContain('class="journey-path__connector journey-path__connector--origin"');
    expect(markup).toContain('class="journey-path__connector journey-path__connector--continuing"');
    expect(markup.match(/class="journey-path__connector /g)).toHaveLength(10);
    expect(markup.match(/<ellipse\b/g)).toHaveLength(10);
    expect(markup).toContain('rx="0.27" ry="3.2"');
    expect(markup).not.toContain("<circle");
    expect(css).toContain(".journey-path__spine");
    expect(css).toContain(".journey-path__connector--summer");
    expect(css).toContain(".journey-path__nodes ellipse");
    expect(responsive).toContain(".journey-card::before");
    expect(responsive).toContain(".journey-card::after");
    expect(responsive).toContain(".journey-path__nodes { display: none; }");
    expect(responsive).toContain("--journey-connector-offset: 16.28%");
    expect(css).not.toContain("transform: rotate(2deg)");
  });

  it("leaves space between the Naruto card and the following research beat", () => {
    const css = readFileSync("src/styles.css", "utf8");
    const markup = renderJourneyRoute();
    const narutoRule = cssBlock(css, ".journey-card--naruto");
    const sparkRule = cssBlock(css, ".journey-card--lis-spark");
    const px = (rule: string, property: string) =>
      Number(rule.match(new RegExp(`${property}:\\s*(\\d+(?:\\.\\d+)?)px`))?.[1] ?? 0);
    const narutoBottom = px(narutoRule, "top") + px(narutoRule, "min-height");

    expect(narutoRule).toMatch(/min-height:\s*132px/);
    expect(px(sparkRule, "top") - narutoBottom).toBeGreaterThanOrEqual(8);
    expect(markup).toContain('journey-path__connector--lis-spark" x1="8" y1="601"');
  });

  it("uses the Journey page as the only desktop scroll region", () => {
    const markup = renderJourneyRoute();
    const css = readFileSync("src/styles.css", "utf8");
    const mainRule = cssBlock(css, ".main--journey");
    const contentRule = cssBlock(css, ".journey-story-content");

    expect(mainRule).toContain("overflow-y: auto");
    expect(mainRule).not.toContain("overflow: hidden");
    expect(contentRule).toContain("overflow: visible");
    expect(contentRule).not.toContain("overflow-y: auto");
    expect(markup).not.toContain('role="region" aria-label="Journey story"');
    expect(markup).not.toContain('tabindex="0"');
  });
});

describe("Journey waypoint fragments", () => {
  it("adds a shareable history entry for an unmodified primary activation", () => {
    const history = {
      entries: [] as string[],
      pushState(_state: unknown, _title: string, url?: string | URL | null) {
        this.entries.push(String(url));
      },
    };
    const event = {
      button: 0,
      metaKey: false,
      ctrlKey: false,
      shiftKey: false,
      altKey: false,
      defaultPrevented: false,
      preventDefault() {
        this.defaultPrevented = true;
      },
    };
    const selected: string[] = [];

    JourneyCaseModule.activateJourneyWaypoint(
      event,
      "stush",
      history,
      (id) => selected.push(id),
    );

    expect(event.defaultPrevented).toBe(true);
    expect(history.entries).toEqual(["#journey-stush"]);
    expect(selected).toEqual(["stush"]);
  });

  it("leaves modified and non-primary clicks to the browser", () => {
    for (const event of [
      { button: 1, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false },
      { button: 0, metaKey: true, ctrlKey: false, shiftKey: false, altKey: false },
      { button: 0, metaKey: false, ctrlKey: true, shiftKey: false, altKey: false },
      { button: 0, metaKey: false, ctrlKey: false, shiftKey: true, altKey: false },
      { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: true },
    ]) {
      let prevented = false;
      let navigated = false;
      JourneyCaseModule.activateJourneyWaypoint(
        { ...event, preventDefault: () => (prevented = true) },
        "tmu",
        { pushState: () => (navigated = true) },
        () => (navigated = true),
      );
      expect(prevented).toBe(false);
      expect(navigated).toBe(false);
    }
  });

  it("resolves valid fragments for initial and history restoration", () => {
    const restored: string[] = [];
    JourneyCaseModule.restoreJourneyWaypoint("#journey-living-in-silico", (id) =>
      restored.push(id),
    );
    JourneyCaseModule.restoreJourneyWaypoint("#not-a-waypoint", (id) =>
      restored.push(id),
    );

    expect(restored).toEqual(["living-in-silico"]);
  });
});
