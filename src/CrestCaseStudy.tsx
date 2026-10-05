import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectIdentities } from "./data";
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
    ["01", "BRIM POLICY PDF", "Brim source material"],
    ["02", "EXTRACT + CHUNK", "Prepare searchable passages"],
    ["03", "gemini-embedding-001", "3,072 dimensions"],
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
            <div className="crest-hero__identity">
              <div className="crest-hero__emblem" role="img" aria-label="Crest">
                <img src={projectIdentities.crest.mark} alt="" aria-hidden="true" />
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
            <figure className="crest-demo-figure" aria-labelledby="crest-demo-caption">
              <img
                src="/media/crest-sample.png"
                alt="Crest expense-review sample screen with policy context and preapproval controls"
                width="684"
                height="385"
              />
              <figcaption>
                <span className="crest-sample-cue">SAMPLE DATA</span>
                <span id="crest-demo-caption">Expense review / policy context / preapproval</span>
                <a
                  href="https://www.youtube.com/watch?v=kiq6XjNi9J8"
                  target="_blank"
                  rel="noreferrer"
                >
                  WATCH DEMO ↗
                </a>
              </figcaption>
            </figure>
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
          <figure className="crest-evidence-map" aria-labelledby="crest-evidence-map-caption">
            <figcaption className="crest-evidence-map__sr-only" id="crest-evidence-map-caption">
              A sample expense branches into deterministic budget and spend checks and retrieved policy context interpreted by Gemini; both inform human review.
            </figcaption>
            <svg className="crest-evidence-map__connectors" viewBox="0 0 1432 230" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <marker id="crest-flow-gold-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                  <path d="M0 0L7 3.5L0 7Z" fill="#c79b45" />
                </marker>
                <marker id="crest-flow-teal-arrow" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
                  <path d="M0 0L7 3.5L0 7Z" fill="#56bdbc" />
                </marker>
              </defs>
              <path className="crest-evidence-map__route--gold" d="M255 116H275V74H320" markerEnd="url(#crest-flow-gold-arrow)" />
              <path className="crest-evidence-map__route--teal" d="M275 116V174H320" markerEnd="url(#crest-flow-teal-arrow)" />
              <path className="crest-evidence-map__route--gold" d="M652 74H1082V120H1128" markerEnd="url(#crest-flow-gold-arrow)" />
              <path className="crest-evidence-map__route--teal" d="M570 174H692" markerEnd="url(#crest-flow-teal-arrow)" />
              <path className="crest-evidence-map__route--teal" d="M975 174H1082V120H1128" markerEnd="url(#crest-flow-teal-arrow)" />
              <circle className="crest-evidence-map__junction--gold" cx="275" cy="74" r="4" />
              <circle className="crest-evidence-map__junction--teal" cx="275" cy="174" r="4" />
              <circle className="crest-evidence-map__junction--gold" cx="1082" cy="74" r="4" />
              <circle className="crest-evidence-map__junction--teal" cx="1082" cy="174" r="4" />
            </svg>
            <div className="crest-evidence-map__stage-labels" aria-hidden="true">
              <span>01 REQUEST</span>
              <span>02 TWO EVIDENCE PATHS</span>
              <span>03 HUMAN DECISION</span>
            </div>
            <div className="crest-evidence-map__node crest-evidence-map__request">
              <div className="crest-evidence-map__node-head">
                <span className="crest-evidence-map__eyebrow">SAMPLE REQUEST</span>
                <svg viewBox="0 0 20 22" aria-hidden="true">
                  <path d="M4 2.5h12v17l-6-4-6 4z" />
                  <path d="M7 7h6M7 10h6" />
                </svg>
              </div>
              <h3>Conference registration</h3>
              <strong className="crest-evidence-map__amount">$1,200</strong>
              <span className="crest-evidence-map__category">TRAVEL &amp; EVENTS</span>
            </div>
            <div className="crest-evidence-map__node crest-evidence-map__signals">
              <span className="crest-evidence-map__eyebrow">DETERMINISTIC SIGNALS</span>
              <div className="crest-evidence-map__node-head">
                <svg viewBox="0 0 24 22" aria-hidden="true">
                  <path d="M3 19V12M9 19V7M15 19V3M21 19V9" />
                </svg>
                <h3>Budget + spend rules</h3>
              </div>
              <p>Budget · prior spend · thresholds</p>
            </div>
            <div className="crest-evidence-map__node crest-evidence-map__policy">
              <span className="crest-evidence-map__eyebrow">RETRIEVED POLICY</span>
              <div className="crest-evidence-map__node-head">
                <svg viewBox="0 0 20 22" aria-hidden="true">
                  <path d="M4 2.5h8l4 4v13H4z" />
                  <path d="M12 2.5v4h4M7 11h6M7 14h6" />
                </svg>
                <h3>Relevant passages</h3>
              </div>
              <p>Matched to the request</p>
            </div>
            <div className="crest-evidence-map__node crest-evidence-map__interpretation">
              <span className="crest-evidence-map__eyebrow">POLICY INTERPRETATION</span>
              <div className="crest-evidence-map__node-head">
                <svg viewBox="0 0 24 22" aria-hidden="true">
                  <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8zM20 16v4M18 18h4" />
                </svg>
                <h3>Gemini</h3>
              </div>
              <p>Reads retrieved policy context</p>
            </div>
            <div className="crest-evidence-map__node crest-evidence-map__decision">
              <span className="crest-evidence-map__eyebrow">DECISION AUTHORITY</span>
              <div className="crest-evidence-map__node-head">
                <svg viewBox="0 0 22 24" aria-hidden="true">
                  <circle cx="11" cy="6" r="3.2" />
                  <path d="M4 21v-3.2a7 7 0 0 1 14 0V21M7 21h8" />
                </svg>
                <h3>HUMAN REVIEW</h3>
              </div>
              <p>A reviewer weighs the context and chooses the next action.</p>
              <div className="crest-evidence-map__actions" aria-hidden="true">
                <span>APPROVE</span><span>DENY</span>
              </div>
            </div>
          </figure>          <figure className="crest-finance-workflow" aria-labelledby="crest-finance-workflow-title">
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
              Finance questions → transaction-backed answers; reporting needs → report views. Separate from the standalone policy-PDF retrieval prototype.
            </p>
          </figure>
        </section>

        <section className="crest-section crest-policy" id="crest-policy">
          <figure className="crest-policy-figure" aria-labelledby="crest-policy-title">
            <figcaption className="crest-policy-figure__eyebrow">
              DECISION SYSTEM / GROUNDED POLICY, DETERMINISTIC AUTHORITY
            </figcaption>
            <h2 id="crest-policy-title">Policy context. Deterministic decisions.</h2>
            <p className="crest-policy-figure__intro">
              A standalone prototype indexed a Brim policy PDF and retrieved
              passages for Gemini; a live endpoint or deployed workflow was not
              verified. Finance and policy rules remained authoritative; anomaly
              heuristics surfaced review cues.
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
            <div className="crest-policy-divider" aria-hidden="true" />
            <div className="crest-policy-evidence" role="list" aria-label="Policy and human-review boundaries">
              <article className="crest-policy-evidence__card" role="listitem">
                <span className="crest-policy-evidence__label">RETRIEVED POLICY CONTEXT</span>
                <h3>Gemini interpreted the top retrieved passages.</h3>
                <p>Grounded context supported review; it did not detect or decide.</p>
              </article>
              <span className="crest-policy-evidence__connector" aria-hidden="true">+</span>
              <article className="crest-policy-evidence__card crest-policy-evidence__card--rules" role="listitem">
                <span className="crest-policy-evidence__label">DETERMINISTIC RULES + SIGNALS</span>
                <h3>Finance and policy rules remained authoritative.</h3>
                <p>Heuristic split cue: group by employee, merchant, day. Each charge is below threshold; combined total reaches it. Review only.</p>
              </article>
              <span className="crest-policy-evidence__connector crest-policy-evidence__connector--decision" aria-hidden="true">→</span>
              <article className="crest-policy-evidence__card" role="listitem">
                <span className="crest-policy-evidence__label">HUMAN REVIEW</span>
                <h3>Sample queue uses budget + employee history.</h3>
                <p>Gemini recommendation or template fallback; human approve/deny is recorded locally in the prototype.</p>
              </article>
            </div>
          </figure>
        </section>

        <section className="crest-section crest-team" id="crest-team">
          <div className="crest-team__story">
            <p className="food-section-label">TECHNICAL OWNERSHIP</p>
            <h2>I built backend workflows for human review.</h2>
            <p>
              I built Policy Compliance Engine workflows, deterministic anomaly
              signals, policy retrieval, and part of preapproval.
            </p>
          </div>
          <div className="crest-team__ownership">
            <p className="crest-team__ownership-label">WORK I BUILT</p>
            <ul className="crest-team__ownership-grid" aria-label="Backend work Joshua built">
              <li>
                <span>POLICY ENGINE</span>
                <strong>Compliance workflows</strong>
              </li>
              <li>
                <span>ANOMALY SIGNALS</span>
                <strong>Deterministic rules</strong>
              </li>
              <li>
                <span>POLICY RETRIEVAL</span>
                <strong>Relevant passages</strong>
              </li>
              <li>
                <span>PREAPPROVAL</span>
                <strong>Part of the workflow</strong>
              </li>
            </ul>
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
          </div>
        </section>

        <section className="crest-section crest-takeaway" id="crest-takeaway">
          <p className="food-section-label">ENGINEERING PRINCIPLE</p>
          <h2>Signals organize review. People own the decision.</h2>
          <p>
            The challenge presentation ran over its allotted time. I learned to explain the decision path concisely: rules, policy context, then human review.
          </p>
          <small>CREST · BRIM FINANCIAL CHALLENGE · MPC HACKS 2026</small>
        </section>
      </article>
    </>
  );
}
