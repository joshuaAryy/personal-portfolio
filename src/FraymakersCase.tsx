import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./fraymakers-case.css";

const chapters = [
  { id: "composition", label: "COMPOSITION" },
  { id: "pipeline", label: "PIPELINE" },
  { id: "configuration", label: "CONFIG" },
  { id: "ownership", label: "MY PART" },
  { id: "outcome", label: "OUTCOME" },
] as const;

type ChapterId = (typeof chapters)[number]["id"];

const pipeline = [
  {
    number: "01",
    label: "TOURNAMENT CONTEXT",
    title: "Start with a match",
    detail: "Tournament participants and match results supply the event context.",
  },
  {
    number: "02",
    label: "METADATA",
    title: "Resolve player details",
    detail: "Player identities and aliases connect the match details to the artwork and labels.",
  },
  {
    number: "03",
    label: "YAML / CONFIG",
    title: "Apply match overrides",
    detail: "Configuration carries match-specific choices into the shared render path.",
  },
  {
    number: "04",
    label: "VIDEO ASSOCIATION",
    title: "Connect the right VOD",
    detail: "Match context is associated with its corresponding tournament recording.",
  },
  {
    number: "05",
    label: "RENDERED THUMBNAIL",
    title: "Compose the frame",
    detail: "Node-canvas produces a 1280 × 720 PNG for the match video.",
  },
] as const;

const configurationInputs = [
  ["MATCH", "Event and set context"],
  ["PLAYERS", "Names, aliases, labels"],
  ["ART", "Characters, costumes, assists"],
  ["PRESENTATION", "Logos, stage, foreground"],
] as const;

export default function FraymakersCase() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>("composition");
  const selectedChapterAtEnd = useRef<ChapterId | null>(null);

  useEffect(() => {
    const main = document.querySelector<HTMLElement>(".main--fraymakers-case");
    if (!main) return;
    const nav = main.querySelector<HTMLElement>(".fraymakers-nav");
    if (!nav) return;

    let frame = 0;
    const updateChapter = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const overflowY = window.getComputedStyle(main).overflowY;
        const mainIsScroller = overflowY === "auto" || overflowY === "scroll";
        const activationLine = nav.getBoundingClientRect().bottom + 8;
        const atStoryEnd = mainIsScroller
          ? main.scrollTop + main.clientHeight >= main.scrollHeight - 2
          : window.scrollY + window.innerHeight >=
            document.documentElement.scrollHeight - 2;
        let nextChapter: ChapterId = chapters[0].id;

        if (atStoryEnd) {
          nextChapter = selectedChapterAtEnd.current ?? chapters[chapters.length - 1].id;
        } else {
          for (const chapter of chapters) {
            const section = document.getElementById(`fraymakers-${chapter.id}`);
            if (section && section.getBoundingClientRect().top <= activationLine + 1) {
              nextChapter = chapter.id;
            }
          }
        }

        setActiveChapter(nextChapter);
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
      <nav className="fraymakers-nav" aria-label="Fraymakers case study">
        <div className="fraymakers-nav__chapters">
          {chapters.map((chapter) => (
            <a
              href={`#fraymakers-${chapter.id}`}
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
        <Link className="fraymakers-nav__back" to="/projects">
          ‹ PROJECTS
        </Link>
        <span className="fraymakers-nav__breadcrumb">CASE STUDY / FRAYMAKERS</span>
      </nav>

      <article className="fray-case" aria-labelledby="fraymakers-title">
        <header className="fray-case__intro" id="fraymakers-intro">
          <div className="fray-case__intro-copy">
            <p className="fray-case__eyebrow">FRAYMAKERS / TOURNAMENT MEDIA WORKFLOW</p>
            <h1 id="fraymakers-title">FROM MATCH CONTEXT TO VOD-READY FRAME</h1>
            <p className="fray-case__dek">
              Inside a shared tournament tool, I built <code>thumbnail.js</code>—the renderer that turned
              match-specific context and selected game art into a consistent video thumbnail.
            </p>
          </div>
        </header>

        <section className="fray-case__composition" id="fraymakers-composition" aria-labelledby="fraymakers-composition-title">
          <div className="fray-case__section-head fray-case__section-head--compact">
            <div>
              <p className="fray-case__eyebrow">01 / COMPOSE THE FRAME</p>
              <h2 id="fraymakers-composition-title">A renderer for a changing set of art and text.</h2>
            </div>
            <p className="fray-case__composition-note">
              node-canvas combines selected assets and match labels into one 16:9 PNG.
            </p>
          </div>
          <p className="fray-case__section-intro fray-case__section-intro--narrow">
            A matchup could combine tournament and player logos, stage/background art, character sprites,
            alternate costumes, assists, foreground elements, fonts, names, and set labels.
          </p>
          <figure className="fray-case__composition-figure" aria-labelledby="fraymakers-composition-caption">
            <div className="fray-case__composition-canvas">
              <div className="fray-case__composition-stamp">SCHEMATIC OUTPUT <span>NOT SOURCE ART</span></div>
              <svg viewBox="0 0 1280 720" role="img" aria-labelledby="fraymakers-schematic-title fraymakers-schematic-description">
                <title id="fraymakers-schematic-title">A schematic 1280 by 720 thumbnail composition</title>
                <desc id="fraymakers-schematic-description">Stage and background art sit behind two character sprites; logos, assists, player names, set labels, and foreground art occupy additional composition areas. Player two is mirrored.</desc>
                <defs>
                  <linearGradient id="fray-scene-bg" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0" stopColor="#244250" />
                    <stop offset="1" stopColor="#0d202b" />
                  </linearGradient>
                  <linearGradient id="fray-stage-floor" x1="0" x2="1">
                    <stop offset="0" stopColor="#3d685f" stopOpacity=".65" />
                    <stop offset="1" stopColor="#162a35" stopOpacity=".45" />
                  </linearGradient>
                </defs>
                <rect width="1280" height="720" fill="url(#fray-scene-bg)" />
                <path d="M0 430 175 285l150 96 205-202 176 167 152-116 155 158 142-135 125 128v339H0Z" fill="#172d39" />
                <rect x="55" y="72" width="1170" height="502" rx="4" fill="url(#fray-stage-floor)" stroke="#69bbc0" strokeOpacity=".58" />
                <text x="88" y="112" className="fray-svg-label">STAGE / BACKGROUND ART</text>
                <rect x="93" y="136" width="134" height="54" rx="3" fill="#07131c" fillOpacity=".78" stroke="#d6b76b" strokeOpacity=".8" />
                <text x="114" y="169" className="fray-svg-gold">TOURNAMENT LOGO</text>
                <rect x="1030" y="136" width="157" height="54" rx="3" fill="#07131c" fillOpacity=".78" stroke="#d6b76b" strokeOpacity=".8" />
                <text x="1067" y="169" className="fray-svg-gold">SET / ROUND</text>
                <path d="M194 440H1086" stroke="#bca764" strokeOpacity=".6" strokeWidth="4" />
                <g>
                  <path d="M359 415 381 255 441 215 500 262 535 415Z" fill="#51aeb0" fillOpacity=".75" stroke="#9ce4dc" strokeWidth="3" />
                  <circle cx="441" cy="203" r="37" fill="#d6b76b" />
                  <path d="M397 334 314 294M492 329 554 278" stroke="#b9e9d7" strokeWidth="18" strokeLinecap="round" />
                  <text x="355" y="476" className="fray-svg-label">P1 · CHARACTER / COSTUME</text>
                  <circle cx="558" cy="256" r="18" fill="#d6b76b" stroke="#fff0bf" strokeWidth="3" />
                  <text x="528" y="224" className="fray-svg-gold">ASSIST</text>
                </g>
                <g transform="translate(1280 0) scale(-1 1)">
                  <path d="M359 415 381 255 441 215 500 262 535 415Z" fill="#c47b59" fillOpacity=".74" stroke="#efc087" strokeWidth="3" />
                  <circle cx="441" cy="203" r="37" fill="#57c6cb" />
                  <path d="M397 334 314 294M492 329 554 278" stroke="#f1d3ac" strokeWidth="18" strokeLinecap="round" />
                </g>
                <text x="780" y="476" className="fray-svg-label">P2 · MIRRORED SPRITE</text>
                <path d="M74 527H1206V557H74Z" fill="#07121b" fillOpacity=".88" stroke="#d6b76b" strokeOpacity=".74" />
                <text x="103" y="548" className="fray-svg-label">PLAYER NAMES / SET LABELS / FOREGROUND LAYER</text>
                <rect x="55" y="605" width="1170" height="1" fill="#49636c" />
                <text x="55" y="646" className="fray-svg-caption">MATCH CONTEXT + SELECTED ART → COMPOSED PNG</text>
                <text x="1080" y="646" className="fray-svg-gold">1280 × 720 · 16:9</text>
              </svg>
            </div>
            <div className="fray-case__composition-note-panel">
              <span className="fray-case__figure-kicker">COMPOSITION PATH</span>
              <h3>Game art meets match-specific labels.</h3>
              <p>node-canvas draws a composed frame from selected stage art, sprites, costumes, assists, logos, foreground elements, and text.</p>
              <p>The drawing is explanatory rather than a recovered thumbnail; exact layer ordering is not established.</p>
            </div>
            <figcaption id="fraymakers-composition-caption">One illustrative canvas shows the kinds of elements the renderer had to fit together; it does not reproduce a real match or imply a fixed layer order.</figcaption>
          </figure>
          <dl className="fray-case__edge-list" aria-label="Rendering cases the workflow handled">
            <div><dt>P2 MIRRORING</dt><dd>Orient player-two character art.</dd></div>
            <div><dt>ALIASES</dt><dd>Handle alternate player and character names.</dd></div>
            <div><dt>LONG NAMES</dt><dd>Fit variable-length player text.</dd></div>
            <div><dt>MISSING ASSETS</dt><dd>Account for absent art inputs.</dd></div>
          </dl>
        </section>

        <section className="fray-case__pipeline" id="fraymakers-pipeline" aria-labelledby="fraymakers-pipeline-title">
          <div className="fray-case__section-head">
            <div>
              <p className="fray-case__eyebrow">02 / FOLLOW THE MATCH</p>
              <h2 id="fraymakers-pipeline-title">The frame stays connected to its match and recording.</h2>
            </div>
            <p className="fray-case__section-note">CONTEXT → CONFIG → VIDEO → FRAME</p>
          </div>
          <p className="fray-case__section-intro">
            The wider workflow joined tournament results to recorded media. Configuration and rendering
            carried the match details forward, so the generated frame belonged with the corresponding VOD.
          </p>
          <figure className="fray-case__pipeline-figure" aria-label="Tournament match context flows through player metadata, YAML overrides, video association, and thumbnail rendering">
            <ol className="fray-case__stages">
              {pipeline.map((stage) => (
                <li className="fray-case__stage" data-step={stage.number} key={stage.number}>
                  <span className="fray-case__stage-number">{stage.number}</span>
                  <span className="fray-case__stage-label">{stage.label}</span>
                  <h3>{stage.title}</h3>
                  <p>{stage.detail}</p>
                </li>
              ))}
            </ol>
            <figcaption>
              Match-to-video association is part of the pipeline; the exact lookup details are not represented here.
            </figcaption>
          </figure>
        </section>

        <section className="fray-case__configuration" id="fraymakers-configuration" aria-labelledby="fraymakers-configuration-title">
          <div className="fray-case__section-head fray-case__section-head--compact">
            <div>
              <p className="fray-case__eyebrow">03 / CONFIGURE PER MATCH</p>
              <h2 id="fraymakers-configuration-title">YAML changed the inputs, not the purpose of the renderer.</h2>
            </div>
            <p className="fray-case__section-note">ONE RENDER PATH · MATCH-SPECIFIC VALUES</p>
          </div>
          <p className="fray-case__section-intro fray-case__section-intro--narrow">
            YAML and configuration overrides carried event- and match-specific choices alongside the player
            and art inputs. The renderer could reuse its composition path without hardcoding every matchup.
          </p>
          <dl className="fray-case__config-register" aria-label="Categories carried by match-specific YAML overrides">
            {configurationInputs.map(([label, detail]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{detail}</dd>
              </div>
            ))}
          </dl>
          <p className="fray-case__configuration-intro fray-case__configuration-intro--limit">
            These values reused the same rendering path; exact YAML keys and sample values are not shown.
          </p>
        </section>

        <section className="fray-case__ownership" id="fraymakers-ownership" aria-labelledby="fraymakers-ownership-title">
          <div className="fray-case__section-head fray-case__section-head--compact">
            <div>
              <p className="fray-case__eyebrow">04 / MY PART IN A SHARED TOOL</p>
              <h2 id="fraymakers-ownership-title">I joined later and focused on the thumbnail path.</h2>
            </div>
          </div>
          <figure className="fray-case__ownership-figure" aria-label="Joshua's brother established the wider tool foundation; Joshua later built the thumbnail renderer and contributed to configuration and integration">
            <section className="fray-case__ownership-card fray-case__ownership-card--foundation">
              <span className="fray-case__figure-kicker">PROJECT START</span>
              <h3>My brother started the broader project.</h3>
              <p>He built the foundation and earlier CLI/workflow, plus much of the Challonge integration and early API groundwork.</p>
            </section>
            <span className="fray-case__ownership-connector" aria-hidden="true">I JOINED LATER</span>
            <section className="fray-case__ownership-card fray-case__ownership-card--joshua">
              <span className="fray-case__figure-kicker">MY THUMBNAIL WORK</span>
              <h3>Thumbnail renderer</h3>
              <p>I built the renderer and worked on match-specific YAML/configuration, thumbnail generation and integration, plus some YouTube API work.</p>
            </section>
            <figcaption>The wider project and the thumbnail subsystem had different owners.</figcaption>
          </figure>
        </section>

        <footer className="fray-case__outcome" id="fraymakers-outcome" aria-labelledby="fraymakers-outcome-title">
          <div className="fray-case__outcome-copy">
            <p className="fray-case__eyebrow">05 / RESULT + LIMIT</p>
            <h2 id="fraymakers-outcome-title">The generated thumbnails were used on real Fraymakers VODs.</h2>
            <p>The working result was a rendered frame tied to a tournament recording.</p>
          </div>
          <figure className="fray-case__upload-figure" aria-label="YouTube Data API and OAuth work remained a prototype; automatic upload was not completed">
            <span className="fray-case__figure-kicker">SEPARATE YOUTUBE PATH</span>
            <div className="fray-case__upload-step">
              <strong>YouTube Data API v3 / OAuth</strong>
              <span>Prototype groundwork</span>
            </div>
            <span className="fray-case__upload-connector" aria-hidden="true">→</span>
            <div className="fray-case__upload-step fray-case__upload-step--unfinished">
              <strong>Automatic upload</strong>
              <span>Not completed</span>
            </div>
            <figcaption>I worked on part of the API/OAuth path; full automatic upload did not ship.</figcaption>
          </figure>
        </footer>
      </article>
    </>
  );
}
