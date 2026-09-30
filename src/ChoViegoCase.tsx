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
  ["FIT", "Evidence against the responsibilities"],
  ["ELIGIBILITY", "Essential conditions and core requirements"],
  ["RECOMMENDATION", "Whether to bring the role forward"],
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

const openingPath = [
  ["ROLE EVIDENCE", "Responsibilities + candidate evidence"],
  ["FIT", "Deterministic evidence assessment"],
  ["ELIGIBILITY", "Essential criteria check"],
  ["GEMINI", "Bounded text interpretation"],
  ["RECOMMENDATION", "Bring the role forward"],
  ["NEXT ACTION", "Resume tailoring"],
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

          <OpeningPath />
        </section>

        <section className="choveigo-section choveigo-system" id="choveigo-system">
          <p className="choveigo-eyebrow">SYSTEM / DISCOVERY TO TAILORING</p>
          <h2>How a role becomes a recommendation.</h2>
          <p className="choveigo-system__intro">
            Role listings and candidate evidence move through separate checks. Cho’Veigo brings the results together in a recommendation, then offers resume tailoring as a follow-up.
          </p>
          <WholeProductArchitecture />
          <div className="choveigo-system__boundaries">
            <div>
              <p className="choveigo-eyebrow choveigo-eyebrow--cyan">DETERMINISTIC RULE BOUNDARY</p>
              <p>Deterministic rules compare structured role requirements with candidate evidence to assess Fit and Eligibility.</p>
            </div>
            <div>
              <p className="choveigo-eyebrow">STRUCTURED GEMINI INTERPRETATION</p>
              <p>Gemini interprets supplied evidence in a structured form. It cannot invent experience or decide Fit and Eligibility; Recommendation stays separate.</p>
            </div>
          </div>
          <div className="choveigo-system__tailoring">
            <span className="choveigo-eyebrow">NEXT ACTION / RESUME TAILORING FOLLOWS RECOMMENDATION</span>
            <p>Tailor a resume for a selected role as a distinct step.</p>
          </div>
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
            <h2>A mismatch became a regression case.</h2>
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
            Keep the expected behavior intact; don’t weaken a fixture just to make the current output pass.
          </p>
        </section>

        <section className="choveigo-section choveigo-change" id="choveigo-change">
          <div className="choveigo-change__story">
            <p className="choveigo-eyebrow">WHAT CHANGED</p>
            <h2>I learned to evaluate recommendations through the evidence that supports them.</h2>
            <p>Review made regression work more meaningful: each check represented agreed behavior instead of a test changed just to pass.</p>
          </div>
          <div className="choveigo-change__result">
            <p className="choveigo-eyebrow choveigo-eyebrow--cyan">OWNER-REPORTED EXAMPLE</p>
            <p>Search surfaced a relevant role Joshua may not have found manually.</p>
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
      <div className="choveigo-system-map__inputs" aria-label="System inputs">
        <section className="choveigo-system-map__input choveigo-system-map__input--roles">
          <h3>Role discovery</h3>
          <p>Feeds, company sites, and career pages</p>
          <p>Structured responsibilities and criteria</p>
        </section>
        <section className="choveigo-system-map__input choveigo-system-map__input--candidate">
          <h3>Candidate evidence</h3>
          <p>Resume and profile evidence</p>
          <p>Demonstrated and transferable experience</p>
        </section>
      </div>
      <section className="choveigo-system-map__decision" aria-label="Decision layers">
        <h3>Decision layers</h3>
        <p className="choveigo-system-map__decision-note">Rules assess; Gemini interprets within the evidence boundary.</p>
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
            <h4>Gemini, structured</h4>
            <p>Interprets supplied text; rules decide Fit and Eligibility.</p>
          </article>
        </div>
      </section>
      <section className="choveigo-system-map__outcomes" aria-label="Product actions">
        <h3>Product actions</h3>
        <article className="choveigo-system-map__outcome choveigo-system-map__outcome--recommendation">
          <h4>Recommendation</h4>
          <p>A distinct judgment: bring the role forward.</p>
        </article>
        <article className="choveigo-system-map__outcome">
          <h4>Next: resume tailoring</h4>
          <p>A separate action after recommendation.</p>
        </article>
      </section>
    </figure>
  );
}

function OpeningPath() {
  return (
    <figure className="choveigo-opening-path" aria-labelledby="choveigo-opening-path-title">
      <figcaption id="choveigo-opening-path-title">
        MATCHING PATH / ROLE EVIDENCE TO THE NEXT STEP
      </figcaption>
      <ol aria-label="From role evidence to resume tailoring">
        {openingPath.map(([label, detail], index) => (
          <li className={index === 4 ? "is-accent" : undefined} key={label}>
            <span>{String(index + 1).padStart(2, "0")} · {label}</span>
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
        <p>Structured Gemini interprets evidence and helps shape wording; deterministic rules retain Fit and Eligibility authority.</p>
      </div>
    </figure>
  );
}
