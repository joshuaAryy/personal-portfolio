import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const crestChapters = [
  { id: "overview", label: "THE IDEA" },
  { id: "system", label: "THE SYSTEM" },
  { id: "policy", label: "POLICY + AI" },
  { id: "team", label: "THE TEAM" },
  { id: "takeaway", label: "TAKEAWAY" },
] as const;
type CrestChapterId = (typeof crestChapters)[number]["id"];

export default function CrestCaseStudy() {
  const [activeChapter, setActiveChapter] = useState<CrestChapterId>("overview");
  const navigationSelection = useRef<{
    chapter: CrestChapterId;
    expiresAt: number;
  } | null>(null);
  const pinnedChapter = useRef<CrestChapterId | null>(null);
  const reconcileChapter = useRef<(() => void) | null>(null);

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;

    let frame = 0;
    const updateChapter = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const selection = navigationSelection.current;
        if (selection && Date.now() < selection.expiresAt) {
          setActiveChapter(selection.chapter);
          return;
        }
        navigationSelection.current = null;
        if (pinnedChapter.current) {
          setActiveChapter(pinnedChapter.current);
          return;
        }
        const overflowY = window.getComputedStyle(main).overflowY;
        const mainIsScroller = overflowY === "auto" || overflowY === "scroll";
        const rootTop = mainIsScroller ? main.getBoundingClientRect().top : 0;
        const viewportHeight = mainIsScroller ? main.clientHeight : window.innerHeight;
        const activationLine = rootTop + Math.min(400, viewportHeight * 0.4);
        let nextChapter: CrestChapterId = "overview";
        const atStoryEnd = mainIsScroller
          ? main.scrollTop + main.clientHeight >= main.scrollHeight - 2
          : window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 2;

        if (atStoryEnd) {
          nextChapter = crestChapters[crestChapters.length - 1].id;
        } else {
          for (const chapter of crestChapters) {
            const section = document.getElementById(`crest-${chapter.id}`);
            if (section && section.getBoundingClientRect().top <= activationLine) {
              nextChapter = chapter.id;
            }
          }
        }
        setActiveChapter(nextChapter);
      });
    };

    reconcileChapter.current = updateChapter;
    const clearNavigationSelection = () => {
      if (!navigationSelection.current && !pinnedChapter.current) return;
      navigationSelection.current = null;
      pinnedChapter.current = null;
      updateChapter();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        clearNavigationSelection();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const overflowY = window.getComputedStyle(main).overflowY;
      const mainIsScroller = overflowY === "auto" || overflowY === "scroll";
      const mainScrollbarWidth = main.offsetWidth - main.clientWidth;
      const mainRightEdge = main.getBoundingClientRect().right;
      const onMainScrollbar =
        mainIsScroller &&
        event.clientX >= mainRightEdge - Math.max(mainScrollbarWidth, 18) &&
        event.clientX <= mainRightEdge &&
        event.target instanceof Node &&
        main.contains(event.target);
      const targetIsPage =
        event.target === document ||
        event.target === document.documentElement ||
        event.target === document.body;
      const onPageScrollbar =
        !mainIsScroller &&
        event.clientX >= document.documentElement.clientWidth - 18 &&
        event.clientX <= window.innerWidth &&
        targetIsPage;
      if (onMainScrollbar || onPageScrollbar) clearNavigationSelection();
    };

    main.addEventListener("scroll", updateChapter, { passive: true });
    main.addEventListener("wheel", clearNavigationSelection, { passive: true });
    main.addEventListener("touchstart", clearNavigationSelection, { passive: true });
    window.addEventListener("scroll", updateChapter, { passive: true });
    window.addEventListener("resize", updateChapter);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("pointerdown", onPointerDown);
    updateChapter();

    return () => {
      main.removeEventListener("scroll", updateChapter);
      main.removeEventListener("wheel", clearNavigationSelection);
      main.removeEventListener("touchstart", clearNavigationSelection);
      window.removeEventListener("scroll", updateChapter);
      window.removeEventListener("resize", updateChapter);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("pointerdown", onPointerDown);
      reconcileChapter.current = null;
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const policyStages = [
    ["01", "BRIM POLICY PDF", "Brim source material"],
    ["02", "EXTRACT + CHUNK", "Prepare searchable passages"],
    ["03", "EMBEDDING-001", "Gemini · 3,072 dimensions"],
    ["04", "ATLAS VECTOR SEARCH", "MongoDB Atlas · policy_chunks"],
    ["05", "GROUNDED PROMPT", "Top retrieved passages"],
  ];

  return (
    <>
      <nav className="crest-case-nav" aria-label="Crest case study">
        <div className="crest-case-nav__chapters">
          {crestChapters.map((chapter) => (
            <a
              href={`#crest-${chapter.id}`}
              aria-current={activeChapter === chapter.id ? "location" : undefined}
              key={chapter.id}
              onClick={() => {
                const selection = {
                  chapter: chapter.id,
                  expiresAt: Date.now() + 900,
                };
                navigationSelection.current = selection;
                pinnedChapter.current = null;
                setActiveChapter(chapter.id);
                window.setTimeout(() => {
                  if (navigationSelection.current !== selection) return;
                  navigationSelection.current = null;
                  pinnedChapter.current = selection.chapter;
                  reconcileChapter.current?.();
                }, 900);
              }}
            >
              {chapter.label}
            </a>
          ))}
        </div>
        <Link className="crest-case-nav__back" to="/projects">
          ‹ PROJECTS
        </Link>
        <span className="crest-case-nav__breadcrumb">CASE STUDY / CREST</span>
      </nav>

      <article className="crest-story-content">
        <section className="crest-section crest-hero" id="crest-overview">
          <div className="crest-hero__opening">
            <p className="crest-project-label">MPC HACKS 2026 / BRIM FINANCIAL CHALLENGE</p>
            <h1>Crest</h1>
            <p className="crest-hero__intro">
              An expense-intelligence workspace for the decisions behind every
              transaction.
            </p>
            <div className="crest-hero__rule" aria-hidden="true" />
            <p className="crest-hero__contribution">
              I focused on backend workflows across transaction data, policy
              compliance, anomaly signals, retrieval and part of the preapproval
              flow.
            </p>
            <p className="crest-hero__award">
              <strong>3RD PLACE</strong>
              <span>BRIM FINANCIAL CHALLENGE · MPC HACKS 2026</span>
            </p>
            <div className="crest-hero__team">
              <span>FOUR-PERSON TEAM</span>
              <p>Joshua Aryeetey · Shiv Arora · Ning Ye · Zachary Demnati</p>
            </div>
          </div>

          <figure className="crest-demo-figure">
            <img
              src="/media/crest-sample.png"
              alt="Crest expense-review sample screen with policy context and preapproval controls"
              width="684"
              height="385"
            />
            <figcaption>
              <span className="crest-sample-cue">SAMPLE DATA</span>
              <span>Expense review · policy context · preapproval</span>
              <a
                href="https://www.youtube.com/watch?v=kiq6XjNi9J8"
                target="_blank"
                rel="noreferrer"
              >
                WATCH DEMO ↗
              </a>
            </figcaption>
          </figure>
        </section>

        <section className="crest-section crest-system" id="crest-system">
          <div className="crest-system__story">
            <p className="food-section-label">THE SYSTEM</p>
            <h2>From a transaction to a considered next step.</h2>
            <p>
              The team brought transaction analysis, policy checks, anomaly
              signals and finance questions into one workspace. I worked on the
              backend flow that connected the data to review and preapproval.
            </p>
          </div>
          <ol className="crest-system__steps">
            <li>
              <span className="crest-step-number">01</span>
              <h3>TRANSACTION</h3>
              <p>A record enters the workflow.</p>
            </li>
            <li>
              <span className="crest-step-number">02</span>
              <h3>POLICY + RULES</h3>
              <p>Deterministic checks surface what needs attention.</p>
            </li>
            <li>
              <span className="crest-step-number">03</span>
              <h3>REVIEW</h3>
              <p>A reviewer can move a request toward preapproval.</p>
            </li>
          </ol>
        </section>

        <section className="crest-section crest-policy" id="crest-policy">
          <figure className="crest-policy-figure" aria-labelledby="crest-policy-title">
            <figcaption className="crest-policy-figure__eyebrow">
              DECISION SYSTEM / GROUNDED POLICY, DETERMINISTIC AUTHORITY
            </figcaption>
            <h2 id="crest-policy-title">Policy context. Deterministic decisions.</h2>
            <p className="crest-policy-figure__intro">
              We indexed a Brim policy PDF and retrieved relevant passages for
              Gemini to interpret. Finance and policy logic remained authoritative;
              anomaly heuristics surfaced patterns for review.
            </p>
            <ol className="crest-policy-pipeline">
              {policyStages.map(([number, title, detail], index) => (
                <li key={number}>
                  <span className="crest-step-number">{number}</span>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                  {index < policyStages.length - 1 && (
                    <span className="crest-policy-pipeline__arrow" aria-hidden="true">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <div className="crest-decision-flow" role="group" aria-label="Decision roles">
              <section className="crest-decision-input">
                <h3>RETRIEVED POLICY CONTEXT</h3>
                <p>Gemini interpreted the top retrieved passages.</p>
                <small>
                  Grounded context supported review; it did not detect or decide.
                </small>
              </section>
              <span className="crest-decision-flow__join" aria-hidden="true">
                +
              </span>
              <section className="crest-decision-input">
                <h3>DETERMINISTIC RULES + SIGNALS</h3>
                <p>Finance and policy rules remained authoritative.</p>
                <small>
                  Heuristic flags: bursts, vendor patterns, duplicates, unusual
                  merchants and threshold avoidance.
                </small>
              </section>
              <span className="crest-decision-flow__to-review" aria-hidden="true">
                →
              </span>
              <section className="crest-decision-input">
                <h3>HUMAN REVIEW</h3>
                <p>Reviewers could move requests toward preapproval.</p>
                <small>
                  Grounded context and rule-based checks informed the review.
                </small>
              </section>
            </div>
          </figure>
        </section>

        <section className="crest-section crest-team" id="crest-team">
          <div className="crest-team__story">
            <p className="food-section-label">THE TEAM</p>
            <h2>Four people. One presentation ran long.</h2>
            <p>
              We built Crest at MPC Hacks 2026. My focus was backend and data
              workflows; the final presentation reminded us that a strong system
              still needs a clear, well-paced walkthrough.
            </p>
          </div>
          <div className="crest-team__result">
            <strong>3RD PLACE</strong>
            <span>BRIM FINANCIAL CHALLENGE · MPC HACKS 2026</span>
            <a
              href="https://devpost.com/software/crest-kglqay"
              target="_blank"
              rel="noreferrer"
            >
              OFFICIAL RESULT ↗
            </a>
          </div>
          <blockquote className="crest-team__reflection">
            Our final presentation ran past its allotted time. I took away a
            simple lesson: the story needs editing too.
          </blockquote>
        </section>

        <section className="crest-section crest-takeaway" id="crest-takeaway">
          <p className="food-section-label">WHAT I TOOK FORWARD</p>
          <h2>A finance system should be able to explain why a workflow moved.</h2>
          <p>
            Crest reinforced the value of clear boundaries: rules people can
            inspect, AI that stays grounded, and a walkthrough that makes the
            work easy to follow.
          </p>
          <small>CREST · MPC HACKS 2026</small>
        </section>
      </article>
    </>
  );
}
