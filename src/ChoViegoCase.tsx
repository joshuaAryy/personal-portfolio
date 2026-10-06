import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./cho-case-study.css";

const chapters = [
  { id: "overview", label: "OVERVIEW" },
  { id: "intake", label: "ROLE INTAKE" },
  { id: "evidence", label: "EVIDENCE" },
  { id: "decisions", label: "DECISIONS" },
  { id: "review", label: "EVALUATION" },
  { id: "studio", label: "RESUME STUDIO" },
  { id: "outcome", label: "OUTCOME" },
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
    if (sectionTop !== undefined && sectionTop <= activationLine) nextChapter = chapter.id;
  }
  return nextChapter;
}

const roleFields = [
  ["TITLE", "Role name"],
  ["COMPANY", "Organization"],
  ["DESCRIPTION", "Posting text"],
  ["SOURCE ID", "Origin"],
  ["OFFICIAL URL", "Posting link"],
] as const;

const roleSignals = [
  ["RESPONSIBILITIES", "What the role asks someone to do"],
  ["CORE REQUIREMENTS", "The essential capabilities and conditions"],
  ["PREFERRED", "Helpful signals that should not outweigh essentials"],
] as const;

const evidenceSignals = [
  ["DEMONSTRATED", "Supported by reviewed profile material"],
  ["TRANSFERABLE", "Relevant work beyond an exact title or tool"],
  ["VISIBLE GAP", "No reviewed evidence; do not invent a qualification"],
] as const;

const reviewSteps = [
  ["01", "NOTICE A MISMATCH", "Compare the result with the intended product behavior."],
  ["02", "REVIEW THE EXPECTATION", "Was the expected behavior wrong, or was the implementation wrong?"],
  ["03", "AGREE ON EXPECTED BEHAVIOR", "Joshua and Shiv reviewed the behavior before treating it as a defect."],
  ["04", "DETERMINISTIC REGRESSION FIXTURE", "Keep the accepted example available for later changes."],
] as const;

const studioSteps = [
  ["01", "SELECT GROUNDED EVIDENCE", "Choose relevant material from the reviewed profile."],
  ["02", "CONSTRAINED REWRITE + VALIDATION", "A bounded wording pass must stay within supplied evidence; rejected or unavailable wording can fall back to source text."],
  ["03", "HUMAN REVIEW", "Inspect the assembled resume before treating it as ready."],
  ["04", "PAGE VERIFICATION + EXPORT", "Check page fit, then export a document."],
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
          : window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
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
      ) return;
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
        <Link className="choveigo-case-nav__back" to="/projects">‹ PROJECTS</Link>
        <span className="choveigo-case-nav__breadcrumb">CASE STUDY / CHO’VEIGO</span>
      </nav>

      <article className="choveigo-story-content cho-study">
        <section className="cho-study__hero" id="choveigo-overview" aria-labelledby="choveigo-title">
          <div className="cho-study__hero-head">
            <div className="cho-study__hero-title">
              <p className="cho-study__eyebrow">PRODUCT / JOB DISCOVERY + RESUME TAILORING</p>
              <h1 id="choveigo-title">Cho’Veigo</h1>
              <p className="cho-study__hero-deck">A role isn’t a keyword match.</p>
              <p className="cho-study__hero-copy">
                Cho’Veigo brings job discovery and evidence-based resume tailoring into one workspace. The decision starts with the work a role asks for and the experience a person can actually show.
              </p>
            </div>
            <aside className="cho-study__hero-credit" aria-label="Project collaboration and focus">
              <span className="cho-study__eyebrow">TWO-PERSON PROJECT</span>
              <p>Joshua Aryeetey <span aria-hidden="true">+</span> Shiv Arora</p>
              <span className="cho-study__hero-credit-rule" />
              <span className="cho-study__eyebrow">JOSHUA’S FOCUS</span>
              <p>Jobs-side product work and shared evaluation direction</p>
            </aside>
          </div>

          <figure className="cho-study__product-proof" aria-labelledby="cho-recommendations-caption">
            <div className="cho-study__figure-head">
              <p className="cho-study__eyebrow">AUTHENTIC RECOMMENDATIONS CAPTURE</p>
              <p>Roles, evidence, and gaps in the same view</p>
            </div>
            <img
              src="/media/choveigo-recommendations.png"
              alt="Static Cho’Veigo Recommendations interface showing job roles beside fit evidence and skills to strengthen"
              width="864"
              height="486"
              decoding="async"
              fetchPriority="high"
            />
            <figcaption id="cho-recommendations-caption">
              Static product capture. A privacy-safe walkthrough is not available for publication.
            </figcaption>
          </figure>

          <div className="cho-study__thesis">
            <span aria-hidden="true">01 — 04</span>
            <p>Discover the role. Examine the evidence. Make a separate recommendation. Let the person choose what to do next.</p>
          </div>
        </section>

        <section className="cho-study__section cho-study__intake" id="choveigo-intake" aria-labelledby="cho-intake-title">
          <div className="cho-study__section-heading">
            <p className="cho-study__eyebrow">01 / ROLE INTAKE</p>
            <h2 id="cho-intake-title">Keep the job attached to the decision.</h2>
            <p>Provider postings arrive in different shapes. The Jobs path turns a discovered or saved role into a record with enough context to inspect and carry forward.</p>
          </div>
          <RoleIntakeFigure />
          <aside className="cho-study__snapshot-note">
            <span className="cho-study__note-mark" aria-hidden="true">↳</span>
            <p><strong>A saved role keeps its posting snapshot.</strong> Feed availability can change; the saved record preserves the title, company, and description from save time.</p>
          </aside>
        </section>

        <section className="cho-study__section cho-study__evidence" id="choveigo-evidence" aria-labelledby="cho-evidence-title">
          <div className="cho-study__section-heading cho-study__section-heading--split">
            <div>
              <p className="cho-study__eyebrow">02 / EVIDENCE MODEL</p>
              <h2 id="cho-evidence-title">Responsibilities matter more than a familiar stack.</h2>
            </div>
            <p>Titles and technologies can help describe a role, but they cannot prove someone has done its work. Matching compares structured role signals with reviewed profile evidence, including relevant transferable experience and visible gaps.</p>
          </div>
          <EvidenceModelFigure />
          <div className="cho-study__model-shift">
            <div className="cho-study__model-shift-copy">
              <p className="cho-study__eyebrow">A MODEL CHOICE THAT CHANGED</p>
              <h3>Counting terms can count the same signal twice.</h3>
              <p>The project moved away from an additive, keyword-heavy start after seeing how related role terms and reused resume evidence could inflate a tally. The later direction gave responsibilities, core requirements, evidence quality, and transferability a clearer place in the decision.</p>
            </div>
            <KeywordFailureFigure />
          </div>
        </section>

        <section className="cho-study__section cho-study__decisions" id="choveigo-decisions" aria-labelledby="cho-decisions-title">
          <div className="cho-study__section-heading">
            <p className="cho-study__eyebrow">03 / THREE DIFFERENT QUESTIONS</p>
            <h2 id="cho-decisions-title">Fit, Eligibility, and Recommendation are not synonyms.</h2>
            <p>Keeping these outputs apart makes it easier to see where the evidence is strong, where an essential condition is missing, and whether a role should be brought forward for a person to inspect.</p>
          </div>
          <DecisionLenses />
          <div className="cho-study__model-boundary">
            <div className="cho-study__boundary-title">
              <span className="cho-study__boundary-symbol" aria-hidden="true">◇</span>
              <p className="cho-study__eyebrow">MODEL BOUNDARY</p>
            </div>
            <p><strong>Structured Gemini interpretation</strong> helps make role and candidate text usable. It remains constrained to supplied evidence; deterministic rules assess Fit and Eligibility. Recommendation is a separate product outcome, and the source does not establish a standalone formula for it.</p>
          </div>
        </section>

        <section className="cho-study__section cho-study__review" id="choveigo-review" aria-labelledby="cho-review-title">
          <div className="cho-study__review-intro">
            <p className="cho-study__eyebrow">04 / HUMAN-REVIEWED EVALUATION</p>
            <h2 id="cho-review-title">A mismatch started a product conversation.</h2>
            <p>With Shiv, I reviewed mismatches and checked whether the implementation missed the rule or expected behavior needed to change. Once we agreed on a case, it could become a deterministic regression fixture.</p>
          </div>
          <ReviewLoopFigure />
        </section>

        <section className="cho-study__section cho-study__studio" id="choveigo-studio" aria-labelledby="cho-studio-title">
          <div className="cho-study__section-heading cho-study__section-heading--split">
            <div>
              <p className="cho-study__eyebrow">05 / DOWNSTREAM WORKFLOW</p>
              <h2 id="cho-studio-title">The handoff prepares context; it does not generate a resume.</h2>
            </div>
            <p>Choosing a role opens a separate Resume Studio path. That boundary matters: a recommendation should not silently become a generated document or an application sent on someone’s behalf.</p>
          </div>
          <ResumeStudioFigure />
          <div className="cho-study__studio-attribution">
            <span className="cho-study__eyebrow">SEPARATE PRODUCT WORKSTREAM</span>
            <p>Shiv initially led more of the foundational resume-generation work. The handoff connects the Jobs experience to that separate workflow without implying one person owned the whole system.</p>
          </div>
        </section>

        <section className="cho-study__ending" id="choveigo-outcome" aria-labelledby="cho-outcome-title">
          <div className="cho-study__ending-lead">
            <p className="cho-study__eyebrow">WHAT THE WORK CHANGED</p>
            <h2 id="cho-outcome-title">From counting words to asking what the evidence supports.</h2>
          </div>
          <p className="cho-study__ending-anecdote">During use, I found that one recommendation surfaced a role I might have missed.</p>
          <div className="cho-study__ending-credit">
            <p className="cho-study__eyebrow">Two-person project · Joshua Aryeetey + Shiv Arora</p>
            <p><strong>Joshua focused on Jobs and shared product/evaluation direction.</strong> He worked with Shiv on retrieval priorities, matching behavior, and review of expected results.</p>
            <p>Shiv initially led more of the foundational resume-generation work. Cho’Veigo remained a two-person project.</p>
          </div>
          <Link className="cho-study__back-link" to="/projects">‹ BACK TO PROJECTS</Link>
        </section>
      </article>
    </>
  );
}

function RoleIntakeFigure() {
  return (
    <figure className="cho-study__intake-figure" aria-labelledby="cho-intake-caption">
      <ol className="cho-study__intake-flow">
        <li className="cho-study__intake-source">
          <span className="cho-study__step-number">01</span>
          <p className="cho-study__eyebrow">DISCOVERED POSTING</p>
          <h3>Provider feed</h3>
          <p>External sources return role listings with provider-specific structure.</p>
          <div className="cho-study__source-fragments" aria-label="Posting attributes">
            <span>title</span><span>company</span><span>description</span>
          </div>
        </li>
        <li className="cho-study__intake-record">
          <span className="cho-study__step-number">02</span>
          <p className="cho-study__eyebrow">STRUCTURED ROLE CONTEXT</p>
          <h3>Posting record</h3>
          <dl>
            {roleFields.map(([key, value]) => (
              <div key={key}><dt>{key}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </li>
        <li className="cho-study__intake-saved">
          <span className="cho-study__step-number">03</span>
          <p className="cho-study__eyebrow">USER-SAVED ROLE</p>
          <h3>Posting snapshot</h3>
          <p>The saved job retains the posting details used for later review and tailoring handoff.</p>
          <span className="cho-study__snapshot-seal">PRESERVED CONTEXT</span>
        </li>
      </ol>
      <figcaption id="cho-intake-caption">The record keeps posting identity, source, and description together so a later review can return to saved role context.</figcaption>
    </figure>
  );
}

function EvidenceModelFigure() {
  return (
    <figure className="cho-study__evidence-figure" aria-labelledby="cho-evidence-caption">
      <div className="cho-study__evidence-pool cho-study__evidence-pool--role">
        <p className="cho-study__eyebrow">ROLE SIGNALS</p>
        <ul>{roleSignals.map(([label, detail]) => <li key={label}><strong>{label}</strong><span>{detail}</span></li>)}</ul>
      </div>
      <div className="cho-study__evidence-bridge" aria-label="Relevant reviewed profile evidence is retrieved for the role before bounded structured interpretation">
        <span className="cho-study__bridge-line" aria-hidden="true" />
        <ol className="cho-study__bridge-steps">
          <li>
            <p className="cho-study__eyebrow">01 / RETRIEVE</p>
            <strong>Relevant reviewed profile context for this role</strong>
            <span>Bring forward evidence that can be inspected.</span>
          </li>
          <li>
            <p className="cho-study__eyebrow">02 / INTERPRET</p>
            <strong>STRUCTURED GEMINI INTERPRETATION</strong>
            <span>Compare the work with the evidence inside a bounded text path.</span>
          </li>
        </ol>
        <span className="cho-study__bridge-line" aria-hidden="true" />
      </div>
      <div className="cho-study__evidence-pool cho-study__evidence-pool--candidate">
        <p className="cho-study__eyebrow">PROFILE EVIDENCE</p>
        <ul>{evidenceSignals.map(([label, detail]) => <li key={label}><strong>{label}</strong><span>{detail}</span></li>)}</ul>
      </div>
      <figcaption id="cho-evidence-caption">Conceptual product model, not a fabricated candidate trace or live match score. Relevant profile evidence is retrieved before bounded interpretation; missing evidence remains visible instead of being filled in by the model.</figcaption>
    </figure>
  );
}

function KeywordFailureFigure() {
  return (
    <figure className="cho-study__overlap-figure" aria-labelledby="cho-overlap-caption">
      <div className="cho-study__overlap-pair">
        <div className="cho-study__overlap-keywords">
          <span>RELATED TERM</span><span>RELATED TERM</span><span>RELATED TERM</span>
        </div>
        <span className="cho-study__overlap-arrow" aria-hidden="true">→</span>
        <div className="cho-study__overlap-evidence">
          <span>SAME PROFILE EVIDENCE</span>
          <i aria-hidden="true" /><i aria-hidden="true" /><i aria-hidden="true" />
        </div>
      </div>
      <div className="cho-study__overlap-result">
        <span className="cho-study__eyebrow">CORRELATED TERMS CAN INFLATE A TALLY</span>
        <strong>One signal receives repeated credit</strong>
      </div>
      <figcaption id="cho-overlap-caption">Illustrative failure mode; not a live match result. Related terms and reused evidence can inflate an additive tally.</figcaption>
    </figure>
  );
}

function DecisionLenses() {
  return (
    <figure className="cho-study__decision-figure" aria-labelledby="cho-decision-caption">
      <div className="cho-system-map" role="group" aria-label="Role discovery and candidate evidence inform distinct decision layers, followed by a separate recommendation and resume-tailoring action">
        <div className="cho-system-map__inputs">
          <section className="cho-system-map__input cho-system-map__input--role">
            <p className="cho-study__eyebrow">ROLE DISCOVERY</p>
            <h3>Role sources</h3>
            <p>Feeds, company sites, and career pages bring postings into the Jobs path.</p>
            <div className="cho-system-map__signal">Structured responsibilities + criteria</div>
          </section>
          <section className="cho-system-map__input cho-system-map__input--candidate">
            <p className="cho-study__eyebrow">CANDIDATE EVIDENCE</p>
            <h3>Reviewed profile</h3>
            <p>Resume and profile material can show direct, transferable, or missing evidence.</p>
            <div className="cho-system-map__signal">Demonstrated · transferable · gap</div>
          </section>
        </div>

        <svg className="cho-system-map__routes" viewBox="0 0 64 220" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 53H25V110H64" />
          <path d="M0 167H25V110H64" />
        </svg>

        <section className="cho-system-map__layers">
          <p className="cho-study__eyebrow">DETERMINISTIC DECISION LAYERS</p>
          <div className="cho-system-map__rules">
            <article>
              <h3>FIT</h3>
              <p>Responsibilities compared with reviewed evidence</p>
            </article>
            <article>
              <h3>ELIGIBILITY</h3>
              <p>Essential requirements remain their own check</p>
            </article>
          </div>
          <div className="cho-system-map__interpretation">
            <span className="cho-study__eyebrow">STRUCTURED GEMINI INTERPRETATION</span>
            <p>Interprets supplied role and candidate text; rules retain Fit and Eligibility authority.</p>
          </div>
        </section>

        <svg className="cho-system-map__routes cho-system-map__routes--out" viewBox="0 0 64 220" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 110H64" />
        </svg>

        <aside className="cho-system-map__actions">
          <p className="cho-study__eyebrow">PRODUCT ACTIONS</p>
          <section className="cho-system-map__recommendation">
            <h3>RECOMMENDATION</h3>
            <p>A separate product outcome. It brings a role forward for the person to inspect.</p>
          </section>
          <section className="cho-system-map__next">
            <h3>NEXT · RESUME TAILORING</h3>
            <p>A separate action after recommendation—not an application submission.</p>
          </section>
        </aside>
      </div>
      <figcaption id="cho-decision-caption">No numeric score is shown here: the diagram explains what each product concept asks, not an invented result.</figcaption>
    </figure>
  );
}

function ReviewLoopFigure() {
  return (
    <figure className="cho-study__review-figure" aria-labelledby="cho-review-caption">
      <ol>{reviewSteps.map(([number, title, detail]) => (
        <li key={number}>
          <span className="cho-study__step-number">{number}</span>
          <h3>{title}</h3>
          <p>{detail}</p>
        </li>
      ))}</ol>
      <figcaption id="cho-review-caption">Accepted expected behavior became regression fixtures that could be revisited as the matching logic changed.</figcaption>
    </figure>
  );
}

function ResumeStudioFigure() {
  return (
    <figure className="cho-study__studio-figure" aria-labelledby="cho-studio-caption">
      <div className="cho-study__handoff-band">
        <span className="cho-study__eyebrow">JOBS → RESUME STUDIO</span>
        <div><span>SELECTED ROLE</span><b aria-hidden="true">+</b><span>REVIEWED PROFILE</span></div>
        <p>The Jobs handoff prefills context. It does not call the model, generate a plan, or export a document.</p>
      </div>
      <div className="cho-study__studio-inputs">
        <span className="cho-study__eyebrow">RESUME STUDIO INPUTS</span>
        <strong>Reviewed profile + editable job description</strong>
      </div>
      <ol>{studioSteps.map(([number, title, detail]) => (
        <li key={number}>
          <span className="cho-study__step-number">{number}</span>
          <h3>{title}</h3>
          <p>{detail}</p>
        </li>
      ))}</ol>
      <figcaption id="cho-studio-caption">A separate inspected workflow path: reviewed evidence and an editable job description inform the draft, followed by person-led review and page verification.</figcaption>
    </figure>
  );
}
