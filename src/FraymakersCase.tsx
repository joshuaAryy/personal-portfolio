import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./fraymakers-case.css";

const chapters = [
  { id: "pipeline", label: "PIPELINE" },
  { id: "configuration", label: "CONFIG" },
  { id: "composition", label: "COMPOSITION" },
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
    label: "THUMBNAIL.JS",
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

const assetGroups = [
  { title: "Stage + scene", items: "Background art · foreground elements" },
  { title: "Character art", items: "Player sprites · costumes · assists" },
  { title: "Match identity", items: "Logos · player names · set labels" },
] as const;

export default function FraymakersCase() {
  const [activeChapter, setActiveChapter] = useState<ChapterId>("pipeline");
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
          <figure className="fray-case__opening-figure" aria-labelledby="fraymakers-opening-caption">
            <div className="fray-case__opening-route" aria-label="Match context flows through configuration and rendering to a thumbnail">
              <span>ONE MATCH</span>
              <i aria-hidden="true" />
              <span>ONE CONFIGURED RENDER</span>
              <i aria-hidden="true" />
              <strong>1280 × 720 PNG</strong>
            </div>
            <figcaption id="fraymakers-opening-caption">
              A connected workflow; this figure is explanatory, not a project screenshot.
            </figcaption>
          </figure>
        </header>

        <section className="fray-case__pipeline" id="fraymakers-pipeline" aria-labelledby="fraymakers-pipeline-title">
          <div className="fray-case__section-head">
            <div>
              <p className="fray-case__eyebrow">01 / FOLLOW THE MATCH</p>
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
              <p className="fray-case__eyebrow">02 / CONFIGURE PER MATCH</p>
              <h2 id="fraymakers-configuration-title">YAML changed the inputs, not the purpose of the renderer.</h2>
            </div>
            <p className="fray-case__section-note">ONE RENDER PATH · MATCH-SPECIFIC VALUES</p>
          </div>
          <p className="fray-case__section-intro fray-case__section-intro--narrow">
            YAML and configuration overrides carried event- and match-specific choices alongside the player
            and art inputs. The renderer could reuse its composition path without hardcoding every matchup.
          </p>
          <figure className="fray-case__config-figure" aria-label="Match-specific YAML categories feed the shared thumbnail renderer">
            <div className="fray-case__config-source">
              <span className="fray-case__figure-kicker">MATCH-SPECIFIC YAML</span>
              <h3>Configuration inputs</h3>
              <ul>
                {configurationInputs.map(([label, detail]) => (
                  <li key={label}><strong>{label}</strong><span>{detail}</span></li>
                ))}
              </ul>
            </div>
            <span className="fray-case__figure-connector" aria-hidden="true">→</span>
            <div className="fray-case__config-renderer">
              <span className="fray-case__figure-kicker">REUSED COMPOSITION PATH</span>
              <h3><code>thumbnail.js</code> + node-canvas</h3>
              <p>Match values meet resolved player/video context and supplied artwork.</p>
            </div>
            <span className="fray-case__figure-connector" aria-hidden="true">→</span>
            <div className="fray-case__config-output">
              <span className="fray-case__figure-kicker">RENDERED FILE</span>
              <strong>1280 × 720</strong>
              <span>PNG thumbnail</span>
            </div>
            <figcaption>Conceptual flow only; exact YAML keys and sample values are not shown.</figcaption>
          </figure>
        </section>

        <section className="fray-case__composition" id="fraymakers-composition" aria-labelledby="fraymakers-composition-title">
          <div className="fray-case__section-head fray-case__section-head--compact">
            <div>
              <p className="fray-case__eyebrow">03 / COMPOSE THE FRAME</p>
              <h2 id="fraymakers-composition-title">A renderer for a changing set of art and text.</h2>
            </div>
            <p className="fray-case__composition-note">
              I built <code>thumbnail.js</code> with node-canvas to compose the selected inputs into a 16:9 PNG.
            </p>
          </div>
          <p className="fray-case__section-intro fray-case__section-intro--narrow">
            A matchup could combine tournament and player logos, stage/background art, character sprites,
            alternate costumes, assists, foreground elements, fonts, names, and set labels.
          </p>
          <figure className="fray-case__composition-figure" aria-label="Three groups of composition assets feed thumbnail.js and node-canvas to create a 1280 by 720 PNG">
            <div className="fray-case__asset-groups">
              {assetGroups.map((group) => (
                <div className="fray-case__asset-group" key={group.title}>
                  <span className="fray-case__asset-index">INPUT</span>
                  <h3>{group.title}</h3>
                  <p>{group.items}</p>
                </div>
              ))}
            </div>
            <span className="fray-case__figure-connector fray-case__figure-connector--wide" aria-hidden="true">→</span>
            <div className="fray-case__compose-core">
              <span className="fray-case__figure-kicker">COMPOSITOR</span>
              <strong><code>thumbnail.js</code></strong>
              <span>node-canvas</span>
            </div>
            <span className="fray-case__figure-connector fray-case__figure-connector--wide" aria-hidden="true">→</span>
            <div className="fray-case__compose-output">
              <span className="fray-case__figure-kicker">OUTPUT</span>
              <strong>1280 × 720</strong>
              <span>PNG · 16:9</span>
            </div>
            <figcaption>Asset categories feed the compositor; no fixed layer order is implied.</figcaption>
          </figure>
          <dl className="fray-case__edge-list" aria-label="Rendering cases the workflow handled">
            <div><dt>P2 MIRRORING</dt><dd>Orient player-two character art.</dd></div>
            <div><dt>ALIASES</dt><dd>Handle alternate player and character names.</dd></div>
            <div><dt>LONG NAMES</dt><dd>Fit variable-length player text.</dd></div>
            <div><dt>MISSING ASSETS</dt><dd>Account for absent art inputs.</dd></div>
          </dl>
        </section>

        <section className="fray-case__ownership" id="fraymakers-ownership" aria-labelledby="fraymakers-ownership-title">
          <div className="fray-case__section-head fray-case__section-head--compact">
            <div>
              <p className="fray-case__eyebrow">04 / MY PART IN A SHARED TOOL</p>
              <h2 id="fraymakers-ownership-title">I joined later and focused on the thumbnail path.</h2>
            </div>
          </div>
          <figure className="fray-case__ownership-figure" aria-label="Joshua's brother established the wider tool foundation; Joshua later built thumbnail.js and contributed to configuration and integration">
            <section className="fray-case__ownership-card fray-case__ownership-card--foundation">
              <span className="fray-case__figure-kicker">PROJECT START</span>
              <h3>My brother started the broader project.</h3>
              <p>He built the foundation and earlier CLI/workflow, plus much of the Challonge integration and early API groundwork.</p>
            </section>
            <span className="fray-case__ownership-connector" aria-hidden="true">I JOINED LATER</span>
            <section className="fray-case__ownership-card fray-case__ownership-card--joshua">
              <span className="fray-case__figure-kicker">MY THUMBNAIL WORK</span>
              <h3><code>thumbnail.js</code></h3>
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
