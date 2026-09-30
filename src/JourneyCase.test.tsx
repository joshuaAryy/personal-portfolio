import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import JourneyCase from "./JourneyCase";
import * as JourneyCaseModule from "./JourneyCase";
import { resolveActiveWaypoint } from "./JourneyCase";

function renderJourneyRoute() {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={["/profile/journey"]}>
      <JourneyCase />
    </MemoryRouter>,
  );
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
