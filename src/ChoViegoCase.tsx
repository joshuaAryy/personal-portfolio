import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./cho-evidence-worksheet.css";

const chapters = [
  { id: "overview", label: "OVERVIEW" },
  { id: "system", label: "SYSTEM PATH" },
  { id: "fit", label: "FIT MODEL" },
  { id: "review", label: "HUMAN REVIEW" },
  { id: "change", label: "WHAT CHANGED" },
] as const;

type ChapterId = (typeof chapters)[number]["id"];

export function resolveActiveChapter(
  sectionTops: Partial<Record<ChapterId, number>>,
  activationLine: number,
  atStoryEnd: boolean,
  selectedChapterAtEnd: ChapterId | null = null,
): ChapterId {
  if (atStoryEnd) return selectedChapterAtEnd ?? chapters[chapters.length - 1].id;

  let nextChapter: ChapterId = chapters[0].id;
  for (const chapter of chapters) {
    const sectionTop = sectionTops[chapter.id];
    if (sectionTop !== undefined && sectionTop <= activationLine) {
      nextChapter = chapter.id;
    }
  }
  return nextChapter;
}

const fitDimensions = [
  ["FIT", "How closely does the evidence line up with the work?"],
  ["ELIGIBILITY", "Are essential conditions and core requirements met?"],
  ["RECOMMENDATION", "Is this role worth bringing forward?"],
] as const;

const fitPrinciples = [
  [
    "RESPONSIBILITIES OVER STACK",
    "I compared the work a role asks for, not just familiar technology.",
  ],
  [
    "CORE REQUIREMENTS FIRST",
    "A major gap can outweigh several weaker matches.",
  ],
  [
    "TRANSFERABILITY COUNTS",
    "Relevant experience can matter beyond exact titles or tools.",
  ],
] as const;

const reviewSteps = [
  ["MISMATCH", "Inspect the result"],
  ["CORRECTION", "Agree on expected behavior"],
  ["DETERMINISTIC FIXTURE", "Encode the expected case"],
  ["REGRESSION", "Recheck after changes"],
] as const;

const evidenceInputs = [
  ["ROLE REQUIREMENTS", "Responsibilities and essential criteria"],
  ["CANDIDATE EVIDENCE", "Demonstrated and transferable experience"],
  ["EVIDENCE GAPS", "Missing requirements stay visible"],
] as const;

export default function ChoViegoCase() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>("overview");
  const selectedChapterAtEnd = useRef<ChapterId | null>(null);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".main--choveigo-case");
    if (!main) return;

    main.scrollTop = 0;
    let frame = 0;
    const updateChapter = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const overflowY = window.getComputedStyle(main).overflowY;
        const mainIsScroller = overflowY === "auto" || overflowY === "scroll";
        const rootTop = mainIsScroller ? main.getBoundingClientRect().top : 0;
        const activationLine = rootTop + 78;
        const atStoryEnd = mainIsScroller
          ? main.scrollTop + main.clientHeight >= main.scrollHeight - 2
          : window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 2;
        const sectionTops: Partial<Record<ChapterId, number>> = {};

        for (const chapter of chapters) {
          const section = document.getElementById(`choveigo-${chapter.id}`);
          if (section) sectionTops[chapter.id] = section.getBoundingClientRect().top;
        }
        setActiveChapter(
          resolveActiveChapter(
            sectionTops,
            activationLine,
            atStoryEnd,
            selectedChapterAtEnd.current,
          ),
        );
      });
    };

    const clearSelectedChapterAtEnd = (event: Event) => {
      if (selectedChapterAtEnd.current === null) return;
      if (
        event.type === "keydown" &&
        !["ArrowDown", "ArrowUp", "End", "Home", " ", "PageDown", "PageUp"].includes(
          (event as KeyboardEvent).key,
        )
      ) {
        return;
      }
      selectedChapterAtEnd.current = null;
      updateChapter();
    };

    main.addEventListener("scroll", updateChapter, { passive: true });
    window.addEventListener("scroll", updateChapter, { passive: true });
    window.addEventListener("resize", updateChapter);
    window.addEventListener("wheel", clearSelectedChapterAtEnd, { passive: true });
    window.addEventListener("touchstart", clearSelectedChapterAtEnd, { passive: true });
    window.addEventListener("pointerdown", clearSelectedChapterAtEnd);
    window.addEventListener("keydown", clearSelectedChapterAtEnd);
    updateChapter();

    return () => {
      main.removeEventListener("scroll", updateChapter);
      window.removeEventListener("scroll", updateChapter);
      window.removeEventListener("resize", updateChapter);
      window.removeEventListener("wheel", clearSelectedChapterAtEnd);
      window.removeEventListener("touchstart", clearSelectedChapterAtEnd);
      window.removeEventListener("pointerdown", clearSelectedChapterAtEnd);
      window.removeEventListener("keydown", clearSelectedChapterAtEnd);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <nav className="choveigo-case-nav" aria-label="Cho’Veigo case study">
        <div className="choveigo-case-nav__chapters">
          {chapters.map((chapter) => (
            <a
              href={`#choveigo-${chapter.id}`}
              aria-current={activeChapter === chapter.id ? "location" : undefined}
              key={chapter.id}
              onClick={() => {
                selectedChapterAtEnd.current = chapter.id;
                setActiveChapter(chapter.id);
              }}
            >
              {chapter.label}
            </a>
          ))}
        </div>
        <Link className="choveigo-case-nav__back" to="/projects">
          ‹ PROJECTS
        </Link>
        <span className="choveigo-case-nav__breadcrumb">CASE STUDY / CHO’VEIGO</span>
      </nav>

      <article className="choveigo-story-content">
        <section className="choveigo-section choveigo-hero" id="choveigo-overview">
          <div className="choveigo-hero__opening">
            <p className="choveigo-project-label">PRODUCT</p>
            <h1>Cho’Veigo</h1>
            <p className="choveigo-hero__intro">
              A job-search workspace that surfaces roles, shows where your experience fits, and helps you decide whether to tailor your resume.
            </p>
          </div>

          <div className="choveigo-recommendations choveigo-hero__proof">
            <p className="choveigo-eyebrow">AUTHENTIC PRODUCT VIEW / RECOMMENDATIONS</p>
            <figure className="choveigo-recommendations__figure">
              <img
                src="/media/choveigo-recommendations.png"
                alt="Cho’Veigo Recommendations interface showing job roles, fit details, and missing skills evidence"
                width="1280"
                height="720"
                decoding="async"
              />
              <figcaption>Role recommendations with fit evidence visible in context.</figcaption>
            </figure>
            <aside className="choveigo-recommendations__gaps" aria-label="Representative evidence gap">
              <div>
                <strong>REPRESENTATIVE GAP</strong>
                <strong>ILLUSTRATIVE · NOT A MODEL SCORE</strong>
              </div>
              <p>A listed skill may have no reviewed resume evidence, so its gap stays visible.</p>
            </aside>
          </div>

        </section>

        <section className="choveigo-section choveigo-system" id="choveigo-system">
          <p className="choveigo-eyebrow">SYSTEM / DISCOVERY TO TAILORING</p>
          <h2>How a role becomes a recommendation.</h2>
          <p className="choveigo-system__intro">
            Cho’Veigo brings roles from job feeds and persisted role data into a structured record of responsibilities and core requirements. Candidate evidence stays distinct from visible gaps as the product prepares Fit, Eligibility, and Recommendation for review.
          </p>
          <WholeProductArchitecture />
          <div className="choveigo-system__boundaries">
            <div>
              <p className="choveigo-eyebrow choveigo-eyebrow--cyan">DETERMINISTIC RULE BOUNDARY</p>
              <p>Deterministic rules compare structured role requirements with candidate evidence to assess Fit and Eligibility.</p>
            </div>
            <div>
              <p className="choveigo-eyebrow">STRUCTURED GEMINI INTERPRETATION</p>
              <p>The prompt constrains Gemini to interpret supplied evidence; deterministic rules assess Fit and Eligibility, with Recommendation handled separately.</p>
            </div>
          </div>
          <div className="choveigo-system__tailoring">
            <span className="choveigo-eyebrow">NEXT ACTION / RESUME TAILORING FOLLOWS RECOMMENDATION</span>
            <p>A selected role and profile prepare the inputs; the person starts tailoring separately.</p>
          </div>
          <section className="choveigo-tailoring-workflow" aria-labelledby="choveigo-tailoring-title">
            <div className="choveigo-tailoring-workflow__intro">
              <p className="choveigo-eyebrow">RESUME STUDIO / SEPARATE WORKFLOW</p>
              <h3 id="choveigo-tailoring-title">From a selected role to a reviewed document.</h3>
              <p>The handoff passes selected posting context and the selected profile as prepared inputs; it does not generate content.</p>
            </div>
            <ol>
              <li><span>01</span><strong>SELECTED ROLE + PROFILE</strong><p>Carry the selected role context and profile into the separate tailoring step.</p></li>
              <li><span>02</span><strong>RESUME STUDIO</strong><p>From reviewed profile evidence and an editable job description, it selects grounded content, constrains rewrites to that evidence, and validates the wording.</p></li>
              <li><span>03</span><strong>REVIEW + OUTPUT</strong><p>Person reviews the result, verifies the page, then exports a document.</p></li>
            </ol>
          </section>
        </section>

        <section className="choveigo-section choveigo-fit" id="choveigo-fit">
          <p className="choveigo-eyebrow">JOSHUA’S FOCUS / MATCHING MODEL</p>
          <div className="choveigo-fit__definition">
            <div className="choveigo-fit__story">
              <h2>A title or stack is only a clue.</h2>
              <p>
                Working with Shiv, I helped shape matching around responsibilities, core requirements, transferable evidence, and visible gaps.
              </p>
            </div>
            <dl className="choveigo-fit__dimensions">
              {fitDimensions.map(([term, definition], index) => (
                <div className={index === 0 ? "choveigo-fit__dimension is-primary" : "choveigo-fit__dimension"} key={term}>
                  <dt>{term}</dt>
                  <dd>{definition}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ol className="choveigo-fit__principles">
            {fitPrinciples.map(([title, detail], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
          <EvidenceWorksheet />
        </section>

        <section className="choveigo-section choveigo-review" id="choveigo-review">
          <div className="choveigo-review__story">
            <p className="choveigo-eyebrow">HUMAN-REVIEWED EVALUATION</p>
            <h2>A mismatch became a better test.</h2>
            <p>
              With Shiv, I reviewed mismatches and agreed on expected behavior. Human review informed deterministic regression fixtures for later changes.
            </p>
          </div>
          <ol className="choveigo-review__steps">
            {reviewSteps.map(([title, detail], index) => (
              <li key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
          <p className="choveigo-review__lesson">
            I learned to make ambiguous match behavior concrete enough to test.
          </p>
        </section>

        <section className="choveigo-section choveigo-change" id="choveigo-change">
          <div className="choveigo-change__story">
            <p className="choveigo-eyebrow">WHAT CHANGED</p>
            <h2>I learned to evaluate recommendations through the evidence that supports them.</h2>
            <p>Review made regression work more meaningful: each check represented agreed behavior instead of a test changed just to pass.</p>
          </div>
          <div className="choveigo-change__result">
            <p className="choveigo-eyebrow choveigo-eyebrow--cyan">IN PRACTICE</p>
            <p>One recommendation surfaced a role I might have missed.</p>
          </div>
          <p className="choveigo-change__credit">BUILT WITH SHIV ARORA · JOB DISCOVERY + RESUME TAILORING</p>
        </section>
      </article>
    </>
  );
}

function WholeProductArchitecture() {
  return (
    <figure className="choveigo-system-map" aria-labelledby="choveigo-system-map-title">
      <figcaption id="choveigo-system-map-title" className="choveigo-system-map__sr-only">
        Cho’Veigo system architecture from role and candidate evidence through bounded evaluation to recommendation and resume tailoring.
      </figcaption>
      <div className="choveigo-system-map__connectors" aria-hidden="true">
        <span className="choveigo-system-map__role-line" />
        <span className="choveigo-system-map__candidate-line" />
        <span className="choveigo-system-map__input-merge" />
        <span className="choveigo-system-map__merge-line" />
        <span className="choveigo-system-map__output-line" />
      </div>
      <div className="choveigo-system-map__inputs" role="group" aria-label="System inputs">
        <div className="choveigo-system-map__input choveigo-system-map__input--roles">
          <h3>Role discovery</h3>
          <p>Job feeds + persisted role data</p>
          <p>A structured role record</p>
          <p>Responsibilities + core requirements</p>
        </div>
        <div className="choveigo-system-map__input choveigo-system-map__input--candidate">
          <h3>Candidate evidence</h3>
          <p>Resume + selected profile</p>
          <p>Demonstrated and transferable evidence stays distinct from visible gaps.</p>
        </div>
      </div>
      <div className="choveigo-system-map__decision">
        <h3>Decision layers</h3>
        <p className="choveigo-system-map__decision-note">Structured Gemini interpretation remains tied to the supplied role and candidate material.</p>
        <div className="choveigo-system-map__layers">
          <article className="choveigo-system-map__layer">
            <h4>Fit</h4>
            <p>Deterministic<br />responsibilities vs. evidence</p>
          </article>
          <article className="choveigo-system-map__layer">
            <h4>Eligibility</h4>
            <p>Deterministic<br />essential requirements</p>
          </article>
          <article className="choveigo-system-map__layer choveigo-system-map__layer--model">
            <h4>GEMINI · STRUCTURED</h4>
            <p>Interprets supplied text; rules decide Fit and Eligibility.</p>
          </article>
        </div>
      </div>
      <div className="choveigo-system-map__outcomes">
        <h3>Product actions</h3>
        <article className="choveigo-system-map__outcome choveigo-system-map__outcome--recommendation">
          <h4>Recommendation</h4>
          <p>A distinct judgment: bring the role forward.</p>
        </article>
        <article className="choveigo-system-map__outcome">
          <h4>NEXT · RESUME TAILORING</h4>
          <p>A separate action after recommendation.</p>
        </article>
      </div>
    </figure>
  );
}

function EvidenceWorksheet() {
  return (
    <figure className="cho-evidence-worksheet" aria-labelledby="cho-evidence-title">
      <figcaption id="cho-evidence-title" className="cho-evidence-worksheet__caption">
        MATCH TRACE / EVIDENCE IN, THREE DISTINCT JUDGMENTS OUT
      </figcaption>
      <ol className="cho-evidence-worksheet__inputs" aria-label="Evidence path">
        {evidenceInputs.map(([label, detail]) => (
          <li key={label}>
            <span>{label}</span>
            <p>{detail}</p>
          </li>
        ))}
      </ol>
      <div className="cho-evidence-worksheet__branch" aria-hidden="true">
        <span className="cho-evidence-worksheet__stem" />
        <span className="cho-evidence-worksheet__rail" />
        <span className="cho-evidence-worksheet__connector" />
        <span className="cho-evidence-worksheet__connector" />
        <span className="cho-evidence-worksheet__connector" />
      </div>
      <dl className="cho-evidence-worksheet__judgments">
        {fitDimensions.map(([term, definition]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{definition}</dd>
          </div>
        ))}
      </dl>
      <div className="cho-evidence-worksheet__boundary">
        <span>MODEL BOUNDARY</span>
        <p>Structured Gemini interprets role and candidate evidence within its boundary; deterministic rules determine Fit and Eligibility. Recommendation is a separate judgment.</p>
      </div>
    </figure>
  );
}
