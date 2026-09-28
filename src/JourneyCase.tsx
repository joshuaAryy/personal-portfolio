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
    if (sectionTops[waypoint.id] <= activationLine) active = waypoint.id;
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
  const scrollportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scrollport = scrollportRef.current;
    const track = trackRef.current;
    if (!scrollport || !track) return;

    let frame = 0;
    const updateWaypoint = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const overflowY = window.getComputedStyle(scrollport).overflowY;
        const contentIsScroller = overflowY === "auto" || overflowY === "scroll";
        const rootTop = contentIsScroller ? scrollport.getBoundingClientRect().top : 0;
        const viewportHeight = contentIsScroller
          ? scrollport.clientHeight
          : window.innerHeight;
        const activationLine = rootTop + viewportHeight * 0.35;
        const atEnd = contentIsScroller
          ? scrollport.scrollTop + scrollport.clientHeight >= scrollport.scrollHeight - 2
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

    scrollport.addEventListener("scroll", updateWaypoint, { passive: true });
    window.addEventListener("scroll", updateWaypoint, { passive: true });
    window.addEventListener("resize", updateWaypoint);
    updateWaypoint();
    return () => {
      scrollport.removeEventListener("scroll", updateWaypoint);
      window.removeEventListener("scroll", updateWaypoint);
      window.removeEventListener("resize", updateWaypoint);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const selectWaypoint = useCallback((id: JourneyWaypointId) => {
    const waypoint = journeyWaypoints.find((item) => item.id === id);
    const scrollport = scrollportRef.current;
    const target = waypoint && document.getElementById(waypoint.target);
    if (!scrollport || !target) return;

    const overflowY = window.getComputedStyle(scrollport).overflowY;
    const contentIsScroller = overflowY === "auto" || overflowY === "scroll";
    const rootTop = contentIsScroller ? scrollport.getBoundingClientRect().top : 0;
    const viewportHeight = contentIsScroller ? scrollport.clientHeight : window.innerHeight;
    const activationLine = rootTop + viewportHeight * 0.35;
    const targetTop = target.getBoundingClientRect().top;
    const behavior: ScrollBehavior = prefersReducedMotion() ? "auto" : "smooth";

    setActiveWaypoint(id);
    if (contentIsScroller) {
      scrollport.scrollTo({
        top: scrollport.scrollTop + targetTop - activationLine,
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
      className="journey-scrollport"
      id="journey-scrollport"
      ref={scrollportRef}
      role="region"
      aria-label="Journey story"
      tabIndex={0}
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
          <span className="journey-path__segment journey-path__segment--gold" />
          <span className="journey-path__segment journey-path__segment--cyan" />
          <span className="journey-path__segment journey-path__segment--future" />
        </div>

        <article
          className="journey-card journey-card--origin"
          aria-labelledby="journey-origin"
        >
          <p className="journey-card__eyebrow">FIRST SPARK · GRADE 6</p>
          <h2 id="journey-origin">Roblox Studio</h2>
          <p>I could make an idea real in Studio, then show it to friends. Watching them play was exciting; it was my first glimpse of building something for others.</p>
          <span className="journey-builder-cue" aria-hidden="true">
            <i /><i />
          </span>
        </article>

        <article className="journey-card journey-card--apple" aria-labelledby="journey-apple-title">
          <p className="journey-card__eyebrow">HIGH SCHOOL · HARDWARE CURIOSITY</p>
          <h2 id="journey-apple-title">Curiosity about the hardware</h2>
          <p>I could spend hours asking how chips and design choices inside MacBooks and iPhones shaped the way they worked.</p>
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
          <p>Could embeddings find Naruto characters by personality, abilities, or relationships—not just exact terms? I liked imagining a playful way to explore a series I already loved.</p>
        </article>

        <article
          className="journey-card journey-card--lis-spark"
          aria-labelledby="journey-living-in-silico"
        >
          <p className="journey-card__eyebrow">LIVING IN SILICO · SPRING 2025 · RESEARCH NOTE</p>
          <h2 id="journey-living-in-silico">Machine learning became tangible</h2>
          <p>Generative molecular modeling made ML feel tangible: a tool I could work with to explore a research question.</p>
        </article>

        <article
          className="journey-card journey-card--lis"
          aria-labelledby="journey-stanford-lecture"
        >
          <p className="journey-card__eyebrow">LIVING IN SILICO · SPRING 2025 · RESEARCH MOMENT</p>
          <h2 id="journey-stanford-lecture">Connecting algorithms to research</h2>
          <p>I was busy, but I made time before school for a Stanford ML lecture. I wanted to connect its algorithms to our research.</p>
        </article>

        <article className="journey-card journey-card--idea journey-card--spotify" aria-labelledby="journey-spotify-title">
          <p className="journey-card__eyebrow">AN EVERYDAY ML QUESTION</p>
          <h2 id="journey-spotify-title">Spotify recommender idea</h2>
          <p>I started noticing ML questions in everyday interests, too. Could audio features and neural networks help a recommender understand the music I listen to?</p>
        </article>

        <article
          className="journey-card journey-card--stush"
          aria-labelledby="journey-stush"
        >
          <p className="journey-card__eyebrow">SEP–NOV 2025 · STUSH PATTIES</p>
          <h2 id="journey-stush">Software Engineering Intern</h2>
          <p>Working with a teammate and a real client showed me where engineering starts: with a messy reporting need. Together, we shaped it into a repeatable workflow.</p>
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
