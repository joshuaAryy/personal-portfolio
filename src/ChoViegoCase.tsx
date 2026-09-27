import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const chapters = [
  { id: "question", label: "THE QUESTION" },
  { id: "fit", label: "FIT MODEL" },
  { id: "review", label: "HUMAN REVIEW" },
  { id: "system", label: "SYSTEM PATH" },
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
  ["EXPECTATION", "Agree on correct behavior"],
  ["FIXTURE", "Make the expectation concrete"],
  ["REGRESSION", "Keep it from drifting"],
] as const;

const systemSteps = [
  ["JOB FEEDS", "Greenhouse · Lever"],
  ["PERSISTED", "Role records"],
  ["REQUIREMENTS", "Responsibilities + core criteria"],
  ["FIT EVALUATION", "Deterministic rules"],
  ["GEMINI", "Bounded interpretation"],
  ["RESUME OUTPUT", "DOCX · PDF"],
] as const;

export default function ChoViegoCase() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>("question");

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
          if (section) {
            sectionTops[chapter.id] = section.getBoundingClientRect().top;
          }
        }
        setActiveChapter(
          resolveActiveChapter(sectionTops, activationLine, atStoryEnd),
        );
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
              aria-current={
                activeChapter === chapter.id ? "location" : undefined
              }
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
        <span className="choveigo-case-nav__breadcrumb">
          CASE STUDY / CHO’VEIGO
        </span>
      </nav>

      <article className="choveigo-story-content">
        <section
          className="choveigo-section choveigo-hero"
          id="choveigo-question"
        >
          <div className="choveigo-hero__opening">
            <p className="choveigo-project-label">CHO’VEIGO / JOB DISCOVERY</p>
            <h1>What should job fit actually mean?</h1>
            <p className="choveigo-hero__intro">
              I built Cho’Veigo with Shiv Arora around a question keyword
              overlap could not answer: does someone’s experience support the
              work a role actually asks for?
            </p>
            <div className="choveigo-hero__focus">
              <p className="choveigo-eyebrow choveigo-eyebrow--cyan">MY FOCUS</p>
              <p>
                With Shiv, I focused on the Jobs side: product and evaluation
                direction, retrieval priorities, and reviewing whether matching
                behavior made sense.
              </p>
            </div>
          </div>

          <figure className="choveigo-recommendations">
            <p className="choveigo-eyebrow">RECOMMENDATIONS</p>
            <img
              src="/media/choveigo-recommendations.png"
              alt="Cho’Veigo Recommendations view showing ranked roles and fit evidence in context"
              width="1280"
              height="720"
              decoding="async"
            />
            <figcaption>
              A recommendation view, with fit evidence in context.
            </figcaption>
          </figure>
        </section>

        <section
          className="choveigo-section choveigo-fit"
          id="choveigo-fit"
        >
          <p className="choveigo-eyebrow">THE FIT MODEL</p>
          <div className="choveigo-fit__definition">
            <div className="choveigo-fit__story">
              <h2>A stack match is only a clue.</h2>
              <p>
                The title and tools can help find a role. The stronger question
                is whether the candidate’s experience supports its
                responsibilities—and where meaningful gaps remain.
              </p>
            </div>
            <dl className="choveigo-fit__dimensions">
              {fitDimensions.map(([term, definition], index) => (
                <div
                  className={
                    "choveigo-fit__dimension" + (index === 0 ? " is-primary" : "")
                  }
                  key={term}
                >
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
        </section>

        <section
          className="choveigo-section choveigo-review"
          id="choveigo-review"
        >
          <div className="choveigo-review__story">
            <p className="choveigo-eyebrow">HUMAN REVIEW</p>
            <h2>A mismatch became a better test.</h2>
            <p>
              When a recommendation looked wrong, I inspected the mismatch and
              challenged what the system should reward. With my teammate, I
              agreed on the expected behavior and captured it as a deterministic
              fixture.
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
            I kept the expected behavior intact instead of weakening a fixture
            to make the current output pass.
          </p>
        </section>

        <section
          className="choveigo-section choveigo-system"
          id="choveigo-system"
        >
          <p className="choveigo-eyebrow">FROM JOB FEED TO RESUME</p>
          <h2>Structured evidence stays in control.</h2>
          <p className="choveigo-system__intro">
            The pipeline turns role descriptions into evidence that can be
            reviewed, evaluated, and carried into tailored materials.
          </p>
          <ol className="choveigo-system__steps">
            {systemSteps.map(([title, detail], index) => (
              <li
                className={index === 4 ? "is-accent" : ""}
                key={title}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{title}</strong>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
          <div className="choveigo-system__boundaries">
            <div>
              <p className="choveigo-eyebrow choveigo-eyebrow--cyan">
                WHAT STAYS FIXED
              </p>
              <p>
                Job data, candidate evidence, requirements, evaluation rules,
                and output constraints remain structured and authoritative.
              </p>
            </div>
            <div>
              <p className="choveigo-eyebrow">WHAT GEMINI DOES</p>
              <p>
                Gemini interprets responsibilities and helps shape wording. It
                does not invent candidate experience.
              </p>
            </div>
          </div>
          <p className="choveigo-system__stack">
            PYTHON · FASTAPI · STREAMLIT · GEMINI · GREENHOUSE / LEVER
          </p>
          <p className="choveigo-system__boundary-note">
            Recommendations do not submit applications.
          </p>
        </section>

        <section
          className="choveigo-section choveigo-change"
          id="choveigo-change"
        >
          <div className="choveigo-change__story">
            <p className="choveigo-eyebrow">WHAT CHANGED</p>
            <h2>
              I began judging a match by the evidence behind it—not the
              keywords around it.
            </h2>
            <p>
              That meant making disagreement useful: inspect the mismatch,
              agree on the behavior, and preserve it in a test.
            </p>
          </div>
          <div className="choveigo-change__result">
            <p className="choveigo-eyebrow choveigo-eyebrow--cyan">
              A RESULT THAT MATTERED
            </p>
            <p>
              The system surfaced a role I likely would not have found manually.
            </p>
          </div>
          <p className="choveigo-change__credit">
            A TWO-PERSON PROJECT WITH SHIV ARORA · TAILORED RESUME MATERIALS
            IN DOCX / PDF
          </p>
        </section>
      </article>
    </>
  );
}
