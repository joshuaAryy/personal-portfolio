import { useCallback, useEffect, useRef, useState } from "react";

export const journeyWaypoints = [
  { id: "origin", label: "Origin", target: "journey-origin" },
  { id: "tmu", label: "TMU", target: "journey-tmu" },
  {
    id: "living-in-silico",
    label: "Living in Silico",
    target: "journey-living-in-silico",
  },
  { id: "stush", label: "Stush Patties", target: "journey-stush" },
  { id: "summer-2026", label: "Summer 2026", target: "journey-summer-2026" },
] as const;

export type JourneyWaypointId = (typeof journeyWaypoints)[number]["id"];

type JourneyAnchorClick = Pick<
  React.MouseEvent<HTMLAnchorElement>,
  "button" | "metaKey" | "ctrlKey" | "shiftKey" | "altKey" | "preventDefault"
>;

export function activateJourneyWaypoint(
  event: JourneyAnchorClick,
  id: JourneyWaypointId,
  history: Pick<History, "pushState">,
  select: (waypoint: JourneyWaypointId) => void,
) {
  if (
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  event.preventDefault();
  const waypoint = journeyWaypoints.find((item) => item.id === id);
  if (!waypoint) return;
  history.pushState(null, "", `#${waypoint.target}`);
  select(id);
}

export function restoreJourneyWaypoint(
  hash: string,
  select: (waypoint: JourneyWaypointId) => void,
) {
  const waypoint = journeyWaypoints.find((item) => `#${item.target}` === hash);
  if (waypoint) select(waypoint.id);
}

export function resolveActiveWaypoint(
  sectionTops: Record<JourneyWaypointId, number>,
  activationLine: number,
  atEnd: boolean,
): JourneyWaypointId {
  if (atEnd) return "summer-2026";
  let active: JourneyWaypointId = "origin";
  for (const waypoint of journeyWaypoints) {
    if (sectionTops[waypoint.id] <= activationLine + 1) active = waypoint.id;
  }
  return active;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function JourneyLocator({
  active,
  onSelect,
}: {
  active: JourneyWaypointId;
  onSelect: (waypoint: JourneyWaypointId) => void;
}) {
  return (
    <nav className="journey-locator" aria-label="Journey chapters">
      <span className="journey-locator__title">PATH</span>
      <span className="journey-locator__spine" aria-hidden="true" />
      {journeyWaypoints.map((waypoint) => (
        <a
          key={waypoint.id}
          className={
            "journey-locator__stop" +
            (active === waypoint.id ? " journey-locator__stop--active" : "")
          }
          href={`#${waypoint.target}`}
          aria-label={waypoint.label}
          aria-current={active === waypoint.id ? "location" : undefined}
          onClick={(event) => activateJourneyWaypoint(event, waypoint.id, window.history, onSelect)}
        >
          <span aria-hidden="true" />
        </a>
      ))}
      <span className="journey-locator__edge" aria-hidden="true">
        <span>BEGIN</span>
        <span>CONTINUE</span>
      </span>
      <span className="journey-locator__current" aria-live="polite">
        {journeyWaypoints.find((waypoint) => waypoint.id === active)?.label}
      </span>
    </nav>
  );
}

export default function JourneyCase() {
  const [activeWaypoint, setActiveWaypoint] = useState<JourneyWaypointId>("origin");
  const storyRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const story = storyRef.current;
    const track = trackRef.current;
    if (!story || !track) return;

    const main = story.closest<HTMLElement>(".main--journey");
    let frame = 0;
    const updateWaypoint = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const mainIsScroller = main !== null && ["auto", "scroll"].includes(
          window.getComputedStyle(main).overflowY,
        );
        const rootTop = mainIsScroller ? main.getBoundingClientRect().top : 0;
        const viewportHeight = mainIsScroller
          ? main.clientHeight
          : window.innerHeight;
        const activationLine = rootTop + viewportHeight * 0.35;
        const atEnd = mainIsScroller
          ? main.scrollTop + main.clientHeight >= main.scrollHeight - 2
          : window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 2;
        const sectionTops = Object.fromEntries(
          journeyWaypoints.map((waypoint) => [
            waypoint.id,
            document.getElementById(waypoint.target)?.getBoundingClientRect().top ??
              Number.POSITIVE_INFINITY,
          ]),
        ) as Record<JourneyWaypointId, number>;
        setActiveWaypoint(
          resolveActiveWaypoint(sectionTops, activationLine, atEnd),
        );
      });
    };

    main?.addEventListener("scroll", updateWaypoint, { passive: true });
    window.addEventListener("scroll", updateWaypoint, { passive: true });
    window.addEventListener("resize", updateWaypoint);
    updateWaypoint();
    return () => {
      main?.removeEventListener("scroll", updateWaypoint);
      window.removeEventListener("scroll", updateWaypoint);
      window.removeEventListener("resize", updateWaypoint);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const selectWaypoint = useCallback((id: JourneyWaypointId) => {
    const waypoint = journeyWaypoints.find((item) => item.id === id);
    const story = storyRef.current;
    const target = waypoint && document.getElementById(waypoint.target);
    if (!story || !target) return;

    const main = story.closest<HTMLElement>(".main--journey");
    const mainIsScroller = main !== null && ["auto", "scroll"].includes(
      window.getComputedStyle(main).overflowY,
    );
    const rootTop = mainIsScroller ? main.getBoundingClientRect().top : 0;
    const viewportHeight = mainIsScroller ? main.clientHeight : window.innerHeight;
    const activationLine = rootTop + viewportHeight * 0.35;
    const targetTop = target.getBoundingClientRect().top;
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

    setActiveWaypoint(id);
    if (mainIsScroller) {
      main.scrollTo({
        top: main.scrollTop + targetTop - activationLine,
        behavior,
      });
    } else {
      window.scrollTo({
        top: window.scrollY + targetTop - activationLine,
        behavior,
      });
    }
  }, []);

  useEffect(() => {
    const restoreFromLocation = () =>
      restoreJourneyWaypoint(window.location.hash, selectWaypoint);
    restoreFromLocation();
    window.addEventListener("popstate", restoreFromLocation);
    return () => window.removeEventListener("popstate", restoreFromLocation);
  }, [selectWaypoint]);

  return (
    <div
      className="journey-story-content"
      id="journey-story-content"
      ref={storyRef}
    >
      <div className="journey-page">
        <div className="journey-sticky-locator">
          <JourneyLocator active={activeWaypoint} onSelect={selectWaypoint} />
        </div>
        <header className="journey-heading">
          <p className="journey-eyebrow">PERSONAL HISTORY</p>
          <h1>Curiosity became building.</h1>
          <p className="journey-deck">From play to deeper questions to building with care.</p>
        </header>

        <div className="journey-track" ref={trackRef}>
        <div className="journey-path" aria-hidden="true">
          <svg className="journey-path__drawing" viewBox="0 0 100 1592" preserveAspectRatio="none" focusable="false">
            <defs>
              <linearGradient id="journey-spine-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c3a453" />
                <stop offset="35%" stopColor="#c3a453" />
                <stop offset="47%" stopColor="#78b7b8" />
                <stop offset="60%" stopColor="#78b7b8" />
                <stop offset="70%" stopColor="#c3a453" />
                <stop offset="100%" stopColor="#767052" />
              </linearGradient>
            </defs>
            <polyline className="journey-path__spine" points="5,0 11,172 7.5,282 5,435 8,580 11,710 7,830 13,1002 8,1133 6,1198 5,1573 3,1592" />
            <g className="journey-path__connectors">
              <line className="journey-path__connector journey-path__connector--origin" x1="7" y1="57" x2="8.8" y2="57" />
              <line className="journey-path__connector journey-path__connector--apple" x1="10" y1="179" x2="34" y2="179" />
              <line className="journey-path__connector journey-path__connector--tmu" x1="7" y1="309" x2="12" y2="309" />
              <line className="journey-path__connector journey-path__connector--naruto" x1="7" y1="450" x2="39" y2="450" />
              <line className="journey-path__connector journey-path__connector--lis-spark" x1="8" y1="601" x2="18" y2="601" />
              <line className="journey-path__connector journey-path__connector--lis" x1="9" y1="742" x2="12.8" y2="742" />
              <line className="journey-path__connector journey-path__connector--spotify" x1="8" y1="878" x2="45.7" y2="878" />
              <line className="journey-path__connector journey-path__connector--stush" x1="8" y1="1033" x2="12" y2="1033" />
              <line className="journey-path__connector journey-path__connector--summer" x1="8" y1="1194" x2="13.5" y2="1194" />
              <line className="journey-path__connector journey-path__connector--continuing" x1="5" y1="1565" x2="10.7" y2="1565" />
            </g>
            <g className="journey-path__nodes">
              <ellipse cx="7" cy="57" rx="0.27" ry="3.2" />
              <ellipse cx="10" cy="179" rx="0.27" ry="3.2" />
              <ellipse cx="7" cy="309" rx="0.42" ry="5" />
              <ellipse cx="7" cy="450" rx="0.27" ry="3.2" />
              <ellipse cx="8" cy="601" rx="0.42" ry="5" />
              <ellipse cx="9" cy="742" rx="0.27" ry="3.2" />
              <ellipse cx="8" cy="878" rx="0.27" ry="3.2" />
              <ellipse cx="8" cy="1033" rx="0.27" ry="3.2" />
              <ellipse cx="8" cy="1194" rx="0.42" ry="5" />
              <ellipse cx="5" cy="1565" rx="0.27" ry="3.2" />
            </g>
          </svg>
        </div>

        <article
          className="journey-card journey-card--origin"
          aria-labelledby="journey-origin"
        >
          <p className="journey-card__eyebrow">FIRST SPARK · GRADE 6</p>
          <h2 id="journey-origin">Roblox Studio</h2>
          <p>I built an idea in Roblox Studio and shared it with friends. Watching them play was exciting; it was my first glimpse of building for others.</p>
          <span className="journey-builder-cue" aria-hidden="true">
            <i /><i />
          </span>
        </article>

        <article className="journey-card journey-card--apple" aria-labelledby="journey-apple-title">
          <p className="journey-card__eyebrow">HIGH SCHOOL · HARDWARE CURIOSITY</p>
          <h2 id="journey-apple-title">Curiosity about the hardware</h2>
          <p>I spent hours wondering how the chips and design choices in MacBooks and iPhones shaped the way they worked.</p>
          <span className="journey-device-cue" aria-hidden="true"><i /><i /></span>
        </article>

        <article
          className="journey-card journey-card--tmu"
          aria-labelledby="journey-tmu"
        >
          <p className="journey-card__eyebrow">2024 · TORONTO METROPOLITAN UNIVERSITY</p>
          <h2 id="journey-tmu">Computer Engineering</h2>
          <p>At TMU, curiosity shifted from what devices did to the systems underneath. Computer Engineering gave me a way to study what I wanted to build.</p>
        </article>

        <article className="journey-card journey-card--idea journey-card--naruto" aria-labelledby="journey-naruto-title">
          <p className="journey-card__eyebrow">EARLY ML CURIOSITY</p>
          <h2 id="journey-naruto-title">Naruto semantic search</h2>
          <p>Could embeddings find Naruto characters by personality, abilities, or relationships—not just exact terms? I imagined a playful way to explore a series I already loved.</p>
        </article>

        <article
          className="journey-card journey-card--lis-spark"
          aria-labelledby="journey-living-in-silico"
        >
          <p className="journey-card__eyebrow">LIVING IN SILICO · SPRING 2025 · RESEARCH NOTE</p>
          <h2 id="journey-living-in-silico">Machine learning became tangible</h2>
          <p>Generative molecular modeling made machine learning tangible: I could use it to explore a research question.</p>
        </article>

        <article
          className="journey-card journey-card--lis"
          aria-labelledby="journey-stanford-lecture"
        >
          <p className="journey-card__eyebrow">LIVING IN SILICO · MAKING TIME TO UNDERSTAND</p>
          <h2 id="journey-stanford-lecture">Connecting algorithms to research</h2>
          <p>I made time before school for a Stanford ML lecture because I wanted to connect its algorithms to our research.</p>
        </article>

        <article className="journey-card journey-card--idea journey-card--spotify" aria-labelledby="journey-spotify-title">
          <p className="journey-card__eyebrow">AN EVERYDAY ML QUESTION</p>
          <h2 id="journey-spotify-title">Spotify recommender idea</h2>
          <p>Everyday interests raised new ML questions. Could audio features and neural networks help recommend music I might like?</p>
        </article>

        <article
          className="journey-card journey-card--stush"
          aria-labelledby="journey-stush"
        >
          <p className="journey-card__eyebrow">SEP–NOV 2025 · STUSH PATTIES</p>
          <h2 id="journey-stush">Software Engineering Intern</h2>
          <p>Working with a teammate at Stush Patties showed me how to turn a messy reporting need into a repeatable workflow.</p>
        </article>

        <article
          className="journey-card journey-card--summer"
          aria-labelledby="journey-summer-2026"
        >
          <p className="journey-card__eyebrow">CURRENT CHAPTER · SUMMER 2026</p>
          <h2 id="journey-summer-2026">Learning to finish things</h2>
          <p>Food Tracker, Crest, and Cho’Veigo are teaching me to carry ideas through details, make decisions, and keep working toward a finish.</p>
        </article>

        <article className="journey-card journey-card--continuing" aria-labelledby="journey-continuing-title">
          <p className="journey-card__eyebrow">THE PATH CONTINUES</p>
          <h2 id="journey-continuing-title">More to learn. More to build.</h2>
        </article>
        </div>
      </div>
    </div>
  );
}
