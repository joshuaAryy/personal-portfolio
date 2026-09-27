import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";
import * as JourneyCaseModule from "./JourneyCase";
import { resolveActiveWaypoint } from "./JourneyCase";

function renderJourneyRoute() {
  return renderToStaticMarkup(
    <MemoryRouter initialEntries={["/profile/journey"]}>
      <App />
    </MemoryRouter>,
  );
}

describe("Journey story route", () => {
  it("renders all eight story beats in their approved order", () => {
    const markup = renderJourneyRoute();
    const beats = [
      "Roblox Studio",
      "Apple opened a rabbit hole",
      "Computer Engineering",
      "Naruto semantic search",
      "The late-night lecture",
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
    expect(markup).toContain("A continuing story");
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
    expect(markup).toContain('href="/profile/journey"');
    expect(markup).toContain('aria-current="page"');
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
