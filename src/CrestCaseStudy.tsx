import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import "./crest-case-study.css";

const crestChapters = [
  { id: "overview", label: "OVERVIEW" },
  { id: "system", label: "TRANSACTION FLOW" },
  { id: "policy", label: "POLICY RETRIEVAL" },
  { id: "team", label: "OWNERSHIP" },
  { id: "takeaway", label: "LESSON" },
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
    ["01", "POLICY PDF", "Brim source"],
    ["02", "EXTRACT + CHUNK", "Searchable passages"],
    ["03", "EMBED", "Gemini embedding-001 · 3,072-D"],
    ["04", "VECTOR SEARCH", "MongoDB Atlas · policy_chunks"],
    ["05", "GROUNDED PROMPT", "Retrieved passages"],
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
            <div className="crest-hero__identity">
              <div className="crest-hero__emblem" role="img" aria-label="Crest">
                <img src="/media/profile/profile-crest-emblem.png" alt="" aria-hidden="true" />
                <span>CREST</span>
              </div>
              <div>
                <p className="crest-project-label">EXPENSE INTELLIGENCE / REVIEW WORKFLOW</p>
                <h1>Crest</h1>
              </div>
            </div>
            <p className="crest-hero__intro">
              Crest is an expense intelligence workspace for reviewing requests
              with budget, spend history and policy context.
            </p>
            <div className="crest-hero__rule" aria-hidden="true" />
            <p className="crest-hero__purpose">
              It helps finance teams spot unusual patterns and prepare requests
              for preapproval; a person reviews the context and decides what
              happens next.
            </p>
          </div>

          <div className="crest-demo-media">
            <figure className="crest-demo-figure">
              <img
                src="/media/crest-sample.png"
                alt="Crest expense-review sample screen with policy context and preapproval controls"
                width="684"
                height="385"
              />
              <figcaption>
                <span className="crest-sample-cue">SAMPLE DATA</span>
                <span>Expense review / policy context / preapproval</span>
                <a
                  href="https://www.youtube.com/watch?v=kiq6XjNi9J8"
                  target="_blank"
                  rel="noreferrer"
                >
                  WATCH DEMO ↗
                </a>
              </figcaption>
            </figure>
            <aside className="crest-demo-figure__decision-boundary" aria-label="Decision authority">
              <p>
                <strong>DETERMINISTIC RULES</strong>
                <span>finance + policy authority</span>
              </p>
              <p>
                <strong>GEMINI</strong>
                <span>interprets retrieved policy</span>
                <span aria-hidden="true">/</span>
                <strong>HUMAN REVIEW</strong>
                <span>decides the workflow action</span>
              </p>
            </aside>
          </div>
        </section>

        <section className="crest-section crest-system" id="crest-system">
          <div className="crest-system__story">
            <h2>One transaction. Two sources. Human review.</h2>
            <p>
              Transactions move through deterministic finance and policy checks.
              Rule-based signals and retrieved policy context support review;
              people retain decision authority.
            </p>
          </div>
          <figure className="crest-transaction-flow" aria-label="Transaction, policy and rules, and human review">
            <div className="crest-transaction-flow__stages">
              <section className="crest-transaction-flow__transaction">
                <span>01</span>
                <h3>TRANSACTION</h3>
                <p>A request enters expense review.</p>
              </section>
              <span className="crest-transaction-flow__arrow" aria-hidden="true">→</span>
              <section className="crest-transaction-flow__context" aria-label="Policy and deterministic rules">
                <span>02</span>
                <h3>POLICY + RULES</h3>
                <p>Rules surface patterns; retrieval supplies relevant policy passages.</p>
              </section>
              <span className="crest-transaction-flow__arrow" aria-hidden="true">→</span>
              <section className="crest-transaction-flow__review">
                <span>03</span>
                <h3>HUMAN REVIEW</h3>
                <p>A reviewer weighs the context and can move a request toward preapproval.</p>
              </section>
            </div>
          </figure>
          <figure className="crest-finance-workflow" aria-labelledby="crest-finance-workflow-title">
            <figcaption id="crest-finance-workflow-title">
              <span>FINANCE Q&amp;A + REPORTING</span>
            </figcaption>
            <div className="crest-finance-workflow__paths">
              <div>
                <span>FINANCE QUESTION</span>
                <i aria-hidden="true">{"\u2192"}</i>
                <span>FINANCE Q&amp;A ANSWER</span>
              </div>
              <div>
                <span>REPORTING NEED</span>
                <i aria-hidden="true">{"\u2192"}</i>
                <span>REPORT VIEW</span>
              </div>
            </div>
            <p className="crest-finance-workflow__boundary">
              Separate from the documented Brim policy PDF retrieval path.
            </p>
          </figure>
        </section>

        <section className="crest-section crest-policy" id="crest-policy">
          <figure className="crest-policy-figure" aria-labelledby="crest-policy-title">
            <figcaption className="crest-policy-figure__eyebrow">
              POLICY RETRIEVAL / SOURCE → CONTEXT
            </figcaption>
              <h2 id="crest-policy-title">A policy source becomes grounded context.</h2>
            <p className="crest-policy-figure__intro">
              The team extracted and chunked the Brim policy, embedded the
              passages, then retrieved relevant context for Gemini to interpret.
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
            <p className="crest-policy-figure__attribution">
              Deployment details are owner-reported.
            </p>
            <p className="crest-policy-figure__trace">
              PDF extraction + chunking → embedding-001 (3,072 dimensions) →
              Atlas vector search → retrieved passages in a grounded prompt.
            </p>
          </figure>
          <div className="crest-signal-boundary">
            <div className="crest-signal-boundary__intro">
              <p className="crest-signal-boundary__eyebrow">ANOMALY SIGNALS / REVIEW SUPPORT</p>
              <h3>Signals are review cues.</h3>
              <p>Rule-based heuristics surface patterns for a person to assess.</p>
            </div>
            <ul className="crest-signal-boundary__signals" aria-label="Rule-based anomaly signals">
              <li>Bursts</li>
              <li>Vendor patterns</li>
              <li>Duplicates</li>
              <li>Unusual merchants</li>
              <li>Threshold avoidance</li>
            </ul>
            <div className="crest-signal-boundary__ai">
              <h4>AI boundary</h4>
              <p>
                Gemini interpreted retrieved policy passages. Finance and
                policy rules stayed deterministic and authoritative.
              </p>
            </div>
          </div>
        </section>

        <section className="crest-section crest-team" id="crest-team">
          <div className="crest-team__story">
            <p className="food-section-label">TECHNICAL OWNERSHIP</p>
            <h2>Backend workflows were my focus.</h2>
            <p>
              On a four-person team, I built the Policy Compliance Engine
              workflows, deterministic anomaly signals, policy retrieval, and
              part of preapproval.
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
              PROJECT RECORD ↗
            </a>
          </div>
        </section>

        <section className="crest-section crest-takeaway" id="crest-takeaway">
          <p className="food-section-label">ENGINEERING PRINCIPLE</p>
          <h2>Keep interpretation separate from decision authority.</h2>
          <p>
            Building this workflow sharpened my approach to human-in-the-loop
            systems: make supporting evidence visible and keep approval
            authority explicit.
          </p>
          <small>CREST · BRIM FINANCIAL CHALLENGE · MPC HACKS 2026</small>
        </section>
      </article>
    </>
  );
}
