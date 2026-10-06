import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./cho-case-study.css";

const chapters = [
  { id: "overview", label: "OVERVIEW" },
  { id: "intake", label: "ROLE INTAKE" },
  { id: "evidence", label: "EVIDENCE" },
  { id: "decisions", label: "DECISIONS" },
  { id: "review", label: "REVIEW" },
  { id: "studio", label: "RESUME STUDIO" },
  { id: "outcome", label: "LEARNING" },
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

const roleContext = [
  ["TITLE", "Role name"],
  ["COMPANY", "Organization"],
  ["DESCRIPTION", "Posting text"],
  ["SOURCE", "Feed origin"],
  ["OFFICIAL URL", "Posting link"],
] as const;

const roleSignals = [
  ["RESPONSIBILITIES", "What the person will do"],
  ["CORE REQUIREMENTS", "Essential capabilities and conditions"],
  ["PREFERRED", "Helpful signals with less weight"],
] as const;

const profileSignals = [
  ["DEMONSTRATED", "Directly supported by reviewed profile material"],
  ["TRANSFERABLE", "Relevant work beyond an exact title or tool"],
  ["VISIBLE GAP", "No reviewed evidence; never fill it in"],
] as const;

const resumeStages = [
  ["01", "INTERPRET THE ROLE", "Gemini role-family classification is part of Resume Studio, after the Jobs handoff."],
  ["02", "RETRIEVE REVIEWED EVIDENCE", "Deterministic retrieval selects eligible profile material and keeps coherent experience or project groups together."],
  ["03", "BOUND THE WORDING", "A limited Gemini rewrite is checked against source evidence; unsupported or rejected wording falls back to the reviewed source."],
  ["04", "REVIEW + VERIFY", "The person edits the result, checks page fit, and downloads a DOCX artifact."],
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

      <article className="choveigo-story-content cho-story">
        <section className="cho-story__hero" id="choveigo-overview" aria-labelledby="choveigo-title">
          <div className="cho-story__hero-copy">
            <p className="cho-story__eyebrow">JOB DISCOVERY · EVIDENCE · RESUME TAILORING</p>
            <h1 id="choveigo-title">Cho’Veigo</h1>
            <p className="cho-story__hero-deck">A better match starts with the evidence.</p>
            <p className="cho-story__hero-summary">
              Job discovery and resume tailoring meet in one workspace, but they answer different questions. First inspect the role. Then examine reviewed profile evidence. The person decides what comes next.
            </p>
            <div className="cho-story__ownership-rail">
              <span>TWO-PERSON PROJECT</span>
              <strong>Joshua Aryeetey <i aria-hidden="true">+</i> Shiv Arora</strong>
              <p>Joshua led Jobs-side work and shared product direction, behavior review, and matching evaluation.</p>
            </div>
          </div>

          <figure className="cho-story__recommendations" aria-labelledby="cho-recommendations-caption">
            <div className="cho-story__capture-bar">
              <span>AUTHENTIC PRODUCT VIEW</span>
              <strong>Recommendations</strong>
              <span className="cho-story__capture-state">OWNER-CLEARED STILL</span>
            </div>
            <img
              src="/media/choveigo-recommendations.png"
              alt="Cho’Veigo Recommendations view with job roles, fit evidence, and skills to strengthen"
              width="864"
              height="486"
              decoding="async"
              fetchPriority="high"
            />
            <figcaption id="cho-recommendations-caption">
              Owner-cleared Recommendations still. Roles and evidence appear together for inspection.
            </figcaption>
          </figure>
          <div className="cho-story__hero-route" aria-label="Product sequence">
            <span>FIND A ROLE</span><i aria-hidden="true">→</i><span>REVIEW THE EVIDENCE</span><i aria-hidden="true">→</i><span>CHOOSE WHAT TO DO NEXT</span>
          </div>
        </section>

        <section className="cho-story__chapter cho-story__intake" id="choveigo-intake" aria-labelledby="cho-intake-title">
          <header className="cho-story__chapter-head cho-story__chapter-head--wide">
            <div>
              <p className="cho-story__eyebrow">01 / ROLE INTAKE</p>
              <h2 id="cho-intake-title">A role has to outlast its feed.</h2>
            </div>
            <p>Job feeds change. Saving a role keeps the posting context available for later review and tailoring, instead of asking the person to find the same listing again.</p>
          </header>
          <RoleContinuityFigure />
          <p className="cho-story__chapter-note"><strong>Why preserve the snapshot?</strong> The feed can change or a posting can disappear; the saved record keeps the title, company, and description from the moment it was saved.</p>
        </section>

        <section className="cho-story__chapter cho-story__evidence" id="choveigo-evidence" aria-labelledby="cho-evidence-title">
          <header className="cho-story__chapter-head cho-story__chapter-head--split">
            <div>
              <p className="cho-story__eyebrow">02 / EVIDENCE MODEL</p>
              <h2 id="cho-evidence-title">Compare the work with what a person can show.</h2>
            </div>
            <p>Titles and familiar technologies help describe a role; they do not prove the work. The Jobs path retrieves reviewed profile evidence for the role, including transferable experience, and keeps visible gaps visible.</p>
          </header>
          <EvidenceMapFigure />
          <div className="cho-story__keyword-shift">
            <div className="cho-story__keyword-story">
              <p className="cho-story__eyebrow">A DESIGN CHANGE</p>
              <h3>Related terms can award the same evidence twice.</h3>
              <p>An additive keyword start could let overlapping role language and reused profile material inflate a tally. The later direction paid closer attention to responsibilities, core requirements, evidence quality, and transferability.</p>
            </div>
            <KeywordDedupFigure />
          </div>
        </section>

        <section className="cho-story__chapter cho-story__decisions" id="choveigo-decisions" aria-labelledby="cho-decisions-title">
          <header className="cho-story__chapter-head">
            <p className="cho-story__eyebrow">03 / THREE OUTPUTS, THREE QUESTIONS</p>
            <h2 id="cho-decisions-title">Fit, Eligibility, and Recommendation have different jobs.</h2>
            <p>Keep evidence assessment apart from the product choice that brings a role forward. This makes the decision easier to inspect without inventing a combined score.</p>
          </header>
          <DecisionArchitectureFigure />
        </section>

        <section className="cho-story__chapter cho-story__review" id="choveigo-review" aria-labelledby="cho-review-title">
          <header className="cho-story__chapter-head cho-story__chapter-head--split">
            <div>
              <p className="cho-story__eyebrow">04 / HUMAN-REVIEWED EVALUATION</p>
              <h2 id="cho-review-title">A mismatch became a product conversation.</h2>
            </div>
            <p>Joshua and Shiv reviewed matching behavior together. A surprising result was not automatically a defect: first agree on the expected behavior, then keep the accepted example available as a deterministic regression fixture.</p>
          </header>
          <ReviewSequenceFigure />
        </section>

        <section className="cho-story__chapter cho-story__studio" id="choveigo-studio" aria-labelledby="cho-studio-title">
          <header className="cho-story__chapter-head cho-story__chapter-head--split">
            <div>
              <p className="cho-story__eyebrow">05 / DOWNSTREAM · RESUME STUDIO</p>
              <h2 id="cho-studio-title">The handoff carries context. Studio prepares a document.</h2>
            </div>
            <p>Selecting a role prepares the job context and reviewed profile for a separate workflow. The handoff itself does not call Gemini, generate a resume, or export a file.</p>
          </header>
          <ResumeStudioArchitecture />
          <aside className="cho-story__studio-ownership">
            <span>COLLABORATION BOUNDARY</span>
            <p>Shiv initially led more of the foundational resume-generation work. Joshua’s Jobs-side and shared evaluation role does not imply sole ownership of the overall implementation.</p>
          </aside>
        </section>

        <section className="cho-story__ending" id="choveigo-outcome" aria-labelledby="cho-outcome-title">
          <div className="cho-story__ending-heading">
            <p className="cho-story__eyebrow">LEARNING / PRODUCT JUDGMENT</p>
            <h2 id="cho-outcome-title">Similarity can find a clue. Evidence must support the decision.</h2>
            <p>I learned to separate role discovery, evidence assessment, and recommendation—and to keep the human in the loop when the result matters.</p>
          </div>
          <blockquote className="cho-story__anecdote">
            <span>OWNER-REPORTED · QUALITATIVE</span>
            <p>One recommendation surfaced a role I might not have found on my own.</p>
            <cite>Joshua Aryeetey · personal account, not a measured outcome</cite>
          </blockquote>
          <div className="cho-story__ending-credits">
            <p><strong>Joshua</strong> led Jobs-side work and shared product and evaluation direction, behavior review, retrieval priorities, and matching acceptance with <strong>Shiv</strong>.</p>
            <p><strong>Shiv</strong> initially led more of the foundational resume-generation work. Cho’Veigo was a two-person project, not a single-author implementation.</p>
          </div>
          <Link className="cho-story__back-link" to="/projects">‹ BACK TO PROJECTS</Link>
        </section>
      </article>
    </>
  );
}

function RoleContinuityFigure() {
  return (
    <figure className="cho-role-continuity" aria-labelledby="cho-role-continuity-caption">
      <div className="cho-role-continuity__origin">
        <span className="cho-story__figure-index">SOURCE INPUT</span>
        <strong>Job feeds</strong>
        <p>External listings arrive with provider-specific fields.</p>
        <div className="cho-role-continuity__listing" aria-label="Posting content">
          <span>title</span><span>company</span><span>description</span>
        </div>
      </div>
      <span className="cho-role-continuity__arrow" aria-hidden="true">→</span>
      <div className="cho-role-continuity__record">
        <span className="cho-story__figure-index">PERSISTED ROLE</span>
        <strong>Posting snapshot</strong>
        <dl>{roleContext.map(([term, description]) => <div key={term}><dt>{term}</dt><dd>{description}</dd></div>)}</dl>
      </div>
      <span className="cho-role-continuity__arrow" aria-hidden="true">→</span>
      <div className="cho-role-continuity__handoff">
        <span className="cho-story__figure-index">PERSON CHOOSES</span>
        <strong>Resume Studio handoff</strong>
        <p>Selected role context + reviewed profile</p>
        <small>Inputs only · no generated document at this step</small>
      </div>
      <figcaption id="cho-role-continuity-caption">Discovery, saved context, and downstream tailoring are separate steps. The saved posting snapshot gives later review a stable role description.</figcaption>
    </figure>
  );
}

function EvidenceMapFigure() {
  return (
    <figure className="cho-evidence-map" aria-labelledby="cho-evidence-map-caption">
      <div className="cho-evidence-map__role">
        <p className="cho-story__figure-index">ROLE ASKS</p>
        <h3>What matters in this posting?</h3>
        <ul>{roleSignals.map(([name, description]) => <li key={name}><strong>{name}</strong><span>{description}</span></li>)}</ul>
      </div>
      <div className="cho-evidence-map__retrieve">
        <span className="cho-evidence-map__line" aria-hidden="true" />
        <div><span>ROLE-SPECIFIC RETRIEVAL</span><strong>Relevant reviewed evidence</strong></div>
        <span className="cho-evidence-map__line" aria-hidden="true" />
      </div>
      <div className="cho-evidence-map__profile">
        <p className="cho-story__figure-index">PROFILE EVIDENCE</p>
        <h3>What can the person show?</h3>
        <ul>{profileSignals.map(([name, description]) => <li key={name}><strong>{name}</strong><span>{description}</span></li>)}</ul>
      </div>
      <figcaption id="cho-evidence-map-caption">A system map of the evidence contract, not a fabricated candidate trace or live match score. Missing evidence stays visible rather than being completed by a model.</figcaption>
    </figure>
  );
}

function KeywordDedupFigure() {
  return (
    <figure className="cho-keyword-dedup" aria-labelledby="cho-keyword-dedup-caption">
      <div className="cho-keyword-dedup__terms">
        <span>RELATED ROLE LANGUAGE</span>
        <strong>responsibility</strong><strong>core requirement</strong><strong>preferred signal</strong>
      </div>
      <span className="cho-keyword-dedup__join" aria-hidden="true">⇢</span>
      <div className="cho-keyword-dedup__evidence">
        <span>ONE REVIEWED SOURCE</span>
        <strong>Relevant profile evidence</strong>
        <small>Assess the evidence once in context.</small>
      </div>
      <div className="cho-keyword-dedup__lesson">
        <span>OLD SIGNAL</span>
        <strong>Repeated term hits can inflate a tally.</strong>
      </div>
      <figcaption id="cho-keyword-dedup-caption">Illustrative failure mode only. Similar wording or reused evidence can receive repeated credit in a simple additive count.</figcaption>
    </figure>
  );
}

function DecisionArchitectureFigure() {
  return (
    <figure className="cho-decision-architecture" aria-labelledby="cho-decision-architecture-caption">
      <div className="cho-decision-architecture__inputs">
        <span>ROLE REQUIREMENTS</span><span>REVIEWED PROFILE</span>
      </div>
      <div className="cho-decision-architecture__connector" aria-hidden="true">↓</div>
      <div className="cho-decision-architecture__assessment">
        <div className="cho-decision-architecture__authority"><span>JOBS ASSESSMENT · DETERMINISTIC</span><strong>Rules compare role criteria with reviewed evidence.</strong></div>
        <div className="cho-decision-architecture__outputs">
          <section><span>01 / EVIDENCE FIT</span><h3>Fit</h3><p>How closely does reviewed experience support the work?</p></section>
          <section><span>02 / ESSENTIAL CONDITIONS</span><h3>Eligibility</h3><p>Are the role’s required conditions met?</p></section>
        </div>
      </div>
      <div className="cho-decision-architecture__separate" aria-label="Recommendation is a distinct product outcome">
        <span className="cho-decision-architecture__separate-line" aria-hidden="true" />
        <div><span>03 / PRODUCT OUTCOME</span><h3>Recommendation</h3><p>Bring a role forward for a person to inspect. The source does not establish a separate recommendation formula.</p></div>
        <div className="cho-decision-architecture__person"><span>PERSON</span><strong>Choose whether to explore it</strong></div>
      </div>
      <figcaption id="cho-decision-architecture-caption">Fit and Eligibility retain deterministic authority; Recommendation remains a distinct action. No combined score or model-led hiring decision is shown.</figcaption>
    </figure>
  );
}

function ReviewSequenceFigure() {
  return (
    <figure className="cho-review-sequence" aria-labelledby="cho-review-sequence-caption">
      <div className="cho-review-sequence__track" aria-hidden="true"><span /><span /><span /></div>
      <ol aria-label="Human-reviewed evaluation path">
        <li><span>01</span><div><strong>Notice a mismatch</strong><p>Compare observed behavior with the intended result.</p></div></li>
        <li><span>02</span><div><strong>Inspect the expectation</strong><p>Was the rule unclear, or did implementation diverge?</p></div></li>
        <li><span>03</span><div><strong>Agree together</strong><p>Joshua and Shiv review the matching behavior and product rule.</p></div></li>
        <li><span>04</span><div><strong>Save a regression fixture</strong><p>Keep accepted expected behavior available for later changes.</p></div></li>
      </ol>
      <figcaption id="cho-review-sequence-caption">A collaborative product-review loop, not a multi-rater or research-grade evaluation.</figcaption>
    </figure>
  );
}

function ResumeStudioArchitecture() {
  return (
    <figure className="cho-resume-studio" aria-labelledby="cho-resume-studio-caption">
      <div className="cho-resume-studio__handoff">
        <span className="cho-story__figure-index">FROM JOBS</span>
        <strong>Selected role snapshot</strong>
        <span>Editable job description</span>
        <span>Reviewed profile evidence</span>
        <p>Handoff only. It does not generate or export a resume.</p>
      </div>
      <span className="cho-resume-studio__arrow" aria-hidden="true">→</span>
      <ol className="cho-resume-studio__steps" aria-label="Resume Studio evidence workflow">
        {resumeStages.map(([step, title, description]) => (
          <li key={step}>
            <span className="cho-resume-studio__step">{step}</span>
            <div><strong>{title}</strong><p>{description}</p></div>
          </li>
        ))}
      </ol>
      <span className="cho-resume-studio__arrow" aria-hidden="true">→</span>
      <div className="cho-resume-studio__artifact">
        <span className="cho-story__figure-index">REVIEWED OUTPUT</span>
        <strong>DOCX</strong>
        <p>Page-checked document download</p>
        <small>No generated resume is shown here.</small>
      </div>
      <figcaption id="cho-resume-studio-caption">Separate downstream workflow. Gemini role classification and bounded wording stay inside Resume Studio; neither drives Jobs Fit or Eligibility.</figcaption>
    </figure>
  );
}
