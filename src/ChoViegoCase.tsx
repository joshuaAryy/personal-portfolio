import { useEffect, useState } from "react";
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
): ChapterId {
  if (atStoryEnd) return chapters[chapters.length - 1].id;

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
  ["FIT", "How closely does candidate evidence line up with the work?"],
  ["ELIGIBILITY", "Are essential conditions and core requirements met?"],
  ["RECOMMENDATION", "Is this role worth bringing forward?"],
] as const;

const fitPrinciples = [
  [
    "RESPONSIBILITIES OVER STACK",
    "Compare the work a role asks for, not just familiar technology.",
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

const systemSteps = [
  ["ROLE SOURCES", "Job feeds · company and career sites"],
  ["ROLE RECORDS", "Retrieved and persisted"],
  ["REQUIREMENTS", "Responsibilities + core criteria"],
  ["FIT EVALUATION", "Deterministic rules"],
  ["GEMINI", "Structured, bounded interpretation"],
  ["RECOMMENDATION", "Resume tailoring"],
] as const;

const reviewSteps = [
  ["MISMATCH", "Inspect the result"],
  ["CORRECTION", "Agree on expected behavior"],
  ["DETERMINISTIC FIXTURE", "Encode the expected case"],
  ["REGRESSION", "Recheck after changes"],
] as const;

const evidenceInputs = [
  ["RESPONSIBILITY", "The work a role asks for"],
  ["EVIDENCE", "Candidate’s experience supports its responsibilities"],
  ["GAP", "Meaningful gaps remain"],
] as const;

const openingPath = [
  ["ROLE SOURCES", "Feeds + company sites"],
  ["STRUCTURED ROLE", "Responsibilities + core criteria"],
  ["DETERMINISTIC", "Fit + Eligibility"],
  ["BOUNDED GEMINI", "Interpretation within evidence"],
] as const;

export default function ChoViegoCase() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>("overview");

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
        setActiveChapter(resolveActiveChapter(sectionTops, activationLine, atStoryEnd));
      });
    };

    main.addEventListener("scroll", updateChapter, { passive: true });
    window.addEventListener("scroll", updateChapter, { passive: true });
    window.addEventListener("resize", updateChapter);
    updateChapter();

    return () => {
      main.removeEventListener("scroll", updateChapter);
      window.removeEventListener("scroll", updateChapter);
      window.removeEventListener("resize", updateChapter);
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
              onClick={() => setActiveChapter(chapter.id)}
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
            <p className="choveigo-project-label">CHO’VEIGO / EVIDENCE-BASED JOB DISCOVERY</p>
            <h1>Evidence-based job matching</h1>
            <p className="choveigo-hero__intro">
              What should job fit actually mean? With Shiv Arora, I shaped a Jobs-side workflow around evidence for the work a role asks for, not keyword overlap alone.
            </p>
            <div className="choveigo-hero__focus">
              <p className="choveigo-eyebrow choveigo-eyebrow--cyan">JOBS-SIDE PRODUCT + EVALUATION</p>
              <p>
                I led product and evaluation direction, retrieval priorities, behavior review, and acceptance of matching behavior with Shiv.
              </p>
            </div>
          </div>

          <figure className="choveigo-recommendations choveigo-hero__proof">
            <p className="choveigo-eyebrow">STATIC RECOMMENDATIONS VIEW</p>
            <img
              src="/media/choveigo-recommendations.png"
              alt="Owner-cleared Cho’Veigo Recommendations capture showing roles and fit evidence in context"
              width="1280"
              height="720"
              decoding="async"
            />
            <figcaption>
              <span className="choveigo-eyebrow">STRENGTH LABELS UNVALIDATED</span>
              <br />
              Available source materials contain no role-specific evaluation record for these recommendations.
            </figcaption>
          </figure>

          <OpeningPath />
        </section>

        <section className="choveigo-section choveigo-system" id="choveigo-system">
          <p className="choveigo-eyebrow">SYSTEM / DISCOVERY TO TAILORING</p>
          <h2>Retrieval finds roles; evidence and rules constrain each decision.</h2>
          <p className="choveigo-system__intro">
            Company and career-site discovery makes source robustness part of the workflow. Retrieved roles still need structured responsibilities and criteria before evaluation.
          </p>
          <ol className="choveigo-system__steps">
            {systemSteps.map(([title, detail], index) => (
              <li className={index === 4 ? "is-accent" : ""} key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
          <div className="choveigo-system__boundaries">
            <div>
              <p className="choveigo-eyebrow choveigo-eyebrow--cyan">WHAT STAYS FIXED</p>
              <p>
                Job data, candidate evidence, requirements, and evaluation rules remain structured for deterministic assessment.
              </p>
            </div>
            <div>
              <p className="choveigo-eyebrow">WHAT GEMINI DOES</p>
              <p>
                Gemini provides structured, bounded interpretation. It does not invent candidate experience or decide Fit and Eligibility.
              </p>
            </div>
          </div>
          <p className="choveigo-system__stack">
            JOB FEEDS · COMPANY + CAREER SITES · DETERMINISTIC RULES · STRUCTURED GEMINI
          </p>
          <p className="choveigo-system__boundary-note">
            Recommendations support discovery and resume tailoring; application submission is not automatic.
          </p>
        </section>

        <section className="choveigo-section choveigo-fit" id="choveigo-fit">
          <p className="choveigo-eyebrow">THE FIT MODEL</p>
          <div className="choveigo-fit__definition">
            <div className="choveigo-fit__story">
              <h2>A title or stack is only a clue.</h2>
              <p>
                Fit weighs responsibilities and core requirements against candidate evidence, allows relevant transferable experience, and keeps meaningful gaps visible.
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
            <h2>A mismatch became a regression case.</h2>
            <p>
              When a recommendation looked wrong, I inspected the mismatch with my teammate, agreed on the expected behavior, and kept it in a deterministic fixture. Human review informed expected behavior; this was not multi-rater or research-grade validation.
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
            Keep the expected behavior intact; don’t weaken a fixture just to make the current output pass.
          </p>
        </section>

        <section className="choveigo-section choveigo-change" id="choveigo-change">
          <div className="choveigo-change__story">
            <p className="choveigo-eyebrow">WHAT CHANGED</p>
            <h2>I began judging a match by the evidence behind it—not the keywords around it.</h2>
            <p>
              That made disagreement useful: inspect the mismatch, agree on the behavior, and preserve it in a deterministic regression case.
            </p>
          </div>
          <div className="choveigo-change__result">
            <p className="choveigo-eyebrow choveigo-eyebrow--cyan">OWNER-REPORTED OBSERVATION</p>
            <p>The system surfaced a role I likely would not have found manually.</p>
            <small>No employer-specific or time-saving claim is made.</small>
          </div>
          <p className="choveigo-change__credit">A TWO-PERSON PROJECT WITH SHIV ARORA · JOB DISCOVERY + RESUME TAILORING</p>
        </section>
      </article>
    </>
  );
}

function OpeningPath() {
  return (
    <figure className="choveigo-opening-path" aria-labelledby="choveigo-opening-path-title">
      <figcaption id="choveigo-opening-path-title" className="choveigo-eyebrow">
        MATCHING PATH / FIRST-PASS ARCHITECTURE
      </figcaption>
      <ol>
        {openingPath.map(([title, detail], index) => (
          <li key={title} className={index === openingPath.length - 1 ? "is-accent" : ""}>
            <span>{title}</span>
            <strong>{detail}</strong>
          </li>
        ))}
      </ol>
    </figure>
  );
}

function EvidenceWorksheet() {
  return (
    <figure className="cho-evidence-worksheet" aria-labelledby="cho-evidence-title">
      <figcaption id="cho-evidence-title" className="cho-evidence-worksheet__caption">
        EVIDENCE / ROLE RESPONSIBILITY → CANDIDATE EVIDENCE → GAP
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
    </figure>
  );
}