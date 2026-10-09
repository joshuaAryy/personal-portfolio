import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./fraymakers-case.css";

const chapters = [
  { id: "pipeline", label: "OUTPUT" },
  { id: "configuration", label: "WORKFLOW" },
  { id: "composition", label: "IMPLEMENTATION" },
  { id: "outcome", label: "OUTCOME" },
] as const;

type ChapterId = (typeof chapters)[number]["id"];

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
          : window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
        let nextChapter: ChapterId = chapters[0].id;
        if (atStoryEnd) {
          nextChapter = selectedChapterAtEnd.current ?? chapters[chapters.length - 1].id;
        } else {
          for (const chapter of chapters) {
            const section = document.getElementById(`fraymakers-${chapter.id}`);
            if (section && section.getBoundingClientRect().top <= activationLine + 1) nextChapter = chapter.id;
          }
        }
        setActiveChapter(nextChapter);
      });
    };
    const clearSelectedChapterAtEnd = (event: Event) => {
      if (selectedChapterAtEnd.current === null) return;
      if (event.type === "keydown" && !["ArrowDown", "ArrowUp", "End", "Home", " ", "PageDown", "PageUp"].includes((event as KeyboardEvent).key)) return;
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
      <nav className="fraymakers-nav" data-route-entry="frame" aria-label="Fraymakers case study">
        <div className="fraymakers-nav__chapters">
          {chapters.map((chapter) => (
            <a href={`#fraymakers-${chapter.id}`} aria-current={activeChapter === chapter.id ? "location" : undefined} key={chapter.id}
              onClick={() => { selectedChapterAtEnd.current = chapter.id; setActiveChapter(chapter.id); }}>
              {chapter.label}
            </a>
          ))}
        </div>
        <Link className="fraymakers-nav__back" to="/projects">‹ PROJECTS</Link>
        <span className="fraymakers-nav__breadcrumb">CASE STUDY / FRAYMAKERS</span>
      </nav>

      <article className="fray-case" aria-labelledby="fraymakers-title">
        <header className="fray-case__intro" id="fraymakers-pipeline">
          <div className="fray-case__intro-copy">
            <p className="fray-case__eyebrow" data-route-entry="identity">FRAYMAKERS / UPLOADASSISTANT</p>
            <h1 id="fraymakers-title" data-route-entry="headline">A tournament match,<br />carried into its own frame.</h1>
            <p className="fray-case__dek" data-route-entry="summary">I built <code>thumbnail.js</code> to turn match-specific art and labels into a 1280 × 720 PNG for its associated VOD.</p>
          </div>
          <figure className="fray-case__hero-figure" data-route-entry="evidence" aria-labelledby="fraymakers-hero-caption">
            <div className="fray-case__hero-topline"><span>ILLUSTRATIVE COMPOSITION</span><span>16:9</span></div>
            <div className="fray-case__hero-frame" role="img" style={{ gridTemplateRows: "minmax(0, 1fr) auto" }} aria-label="Simplified conceptual 16:9 matchup over a shared art field, with two player placements, character and costume cues, and stage, assist, logo, and match-text labels. These are input categories, not generated output or a verified placement order.">
              <div className="fray-case__hero-matchup">
                <div className="fray-case__hero-zone fray-case__hero-zone--player"><strong>PLAYER 1</strong><span>CHARACTER · COSTUME</span></div>
                <span className="fray-case__hero-versus" aria-hidden="true">VS</span>
                <div className="fray-case__hero-zone fray-case__hero-zone--player fray-case__hero-zone--p2"><strong>PLAYER 2</strong><span>CHARACTER · COSTUME</span></div>
              </div>
              <div className="fray-case__hero-zone fray-case__hero-zone--labels"><span>STAGE / PLAYER ART · MATCH LABELS</span><small>ASSIST · LOGO INPUTS</small></div>
            </div>
            <div className="fray-case__hero-render"><code>thumbnail.js</code><span>node-canvas</span><b aria-hidden="true">→</b><strong>1280 × 720 PNG</strong></div>
            <figcaption id="fraymakers-hero-caption">Simplified conceptual composition; source art, logos, assists, and labels were inputs. Player cues name input categories, not an output or verified placement order.</figcaption>
          </figure>
          <p className="fray-case__intro-detail" data-route-entry="summary">My brother built the broader foundation, CLI, Challonge integration, and much of the early API groundwork; I joined later to build <code>thumbnail.js</code> and work on YAML/configuration, generation/integration, and part of the YouTube API path.</p>
        </header>

        <section className="fray-case__configuration" id="fraymakers-configuration" aria-labelledby="fraymakers-configuration-title">
          <div className="fray-case__config-copy">
            <p className="fray-case__eyebrow">01 / MATCH TO COMPOSITION</p>
            <h2 id="fraymakers-configuration-title">Choices travel with<br />the recording.</h2>
            <p>Match identity and event-specific choices had to stay attached to the right recording before the selected assets reached the renderer.</p>
          </div>
          <figure className="fray-case__workflow-path" aria-labelledby="fraymakers-workflow-caption">
            <div className="fray-case__workflow-context" role="group" aria-label="Tournament context, configuration, and match to recording association">
            <div className="fray-case__workflow-stage fray-case__workflow-stage--metadata" role="group" aria-label="Tournament and match metadata">
              <span className="fray-case__workflow-kicker">MATCH METADATA</span>
              <strong>Tournament + match metadata</strong>
              <ul className="fray-case__workflow-fields">
                <li>Player + set</li><li>Character + costume</li><li>Assist</li>
              </ul>
            </div>
            <span className="fray-case__workflow-link" aria-hidden="true">→</span>
            <div className="fray-case__workflow-stage fray-case__workflow-stage--configuration" role="group" aria-label="YAML configuration overrides at event or match scope">
              <span className="fray-case__workflow-kicker">EVENT / MATCH OVERRIDES</span>
              <strong>Event / match YAML overrides</strong>
              <div className="fray-case__workflow-config-scopes" aria-label="Override scopes">
                <span>EVENT</span><span>MATCH</span>
              </div>
            </div>
            <span className="fray-case__workflow-link" aria-hidden="true">→</span>
            <div className="fray-case__workflow-stage fray-case__workflow-stage--association" role="group" aria-label="Match and video association">
              <span className="fray-case__workflow-kicker">MATCH / VIDEO ASSOCIATION</span>
              <strong>Match ↔ recording association</strong>
              <div className="fray-case__recording-map"><span>MATCH</span><b aria-hidden="true">↔</b><span>VOD</span></div>
            </div>
            </div>
            <div className="fray-case__workflow-handoff" role="group" aria-label="Selected match context determines the assets prepared for rendering">
              <span>SELECTED MATCH CONTEXT</span><i aria-hidden="true">↓</i><span>SELECTED ASSET SET</span>
            </div>
            <div className="fray-case__workflow-render" role="group" aria-label="Selected assets pass through thumbnail.js and node-canvas to a standard PNG output">
              <div className="fray-case__workflow-assets-panel" role="group" aria-label="Selected media asset categories; no fixed layer order is implied">
                <span className="fray-case__workflow-kicker">SELECTED INPUTS</span>
                <strong>Selected media assets</strong>
                <ul className="fray-case__workflow-assets">
                  <li>Stage + background</li><li>Character / sprite art</li><li>Costume + assist</li><li>Player + tournament logos</li><li>Foreground art</li><li>Fonts + player names</li><li>Set labels</li>
                </ul>
                <p>These are available inputs, not a fixed composition order.</p>
              </div>
              <span className="fray-case__workflow-render-link" aria-hidden="true">→</span>
              <div className="fray-case__workflow-renderer" role="group" aria-label="Joshua's thumbnail.js rendering subsystem">
                <span className="fray-case__workflow-kicker">JOSHUA'S SUBSYSTEM</span>
                <strong>thumbnail.js</strong>
                <p>Uses node-canvas to compose selected match inputs for the VOD.</p>
                <span className="fray-case__workflow-renderer-library">node-canvas</span>
              </div>
              <span className="fray-case__workflow-render-link" aria-hidden="true">→</span>
              <div className="fray-case__workflow-output" role="group" aria-label="Generated thumbnail output, 1280 by 720 PNG">
                <span className="fray-case__workflow-kicker">OUTPUT</span>
                <div className="fray-case__workflow-output-frame" aria-hidden="true"><span>16:9</span></div>
                <strong>1280 × 720 PNG</strong>
              </div>
            </div>
            <figcaption id="fraymakers-workflow-caption">Conceptual path; exact YAML keys and override behavior are not established. Asset categories are inputs; composition order is unverified.</figcaption>
          </figure>
        </section>

        <section className="fray-case__composition" id="fraymakers-composition" aria-labelledby="fraymakers-composition-title">
          <div className="fray-case__section-head">
            <div><p className="fray-case__eyebrow">02 / IMPLEMENTATION DETAILS</p><h2 id="fraymakers-composition-title">A consistent canvas.<br />Variable inputs.</h2></div>
            <p className="fray-case__section-intro">The renderer had to make two sides read as opponents while working within real asset and text constraints.</p>
          </div>
          <div className="fray-case__mirror-row">
            <figure className="fray-case__mirror-figure" aria-labelledby="fraymakers-mirror-caption">
              <div className="fray-case__mirror-side"><span>PLAYER 1 ART</span><svg viewBox="0 0 180 120" role="img" aria-label="Abstract character art facing toward the center"><path d="M40 105 48 51l34-29 42 17 24 47-15 19H57Z" fill="#51bdc2"/><path d="m73 50 20-22 23 9 10 18-17 11-15-8-17 17Z" fill="#d8eee0"/></svg><small>Original orientation</small></div>
              <div className="fray-case__mirror-center" aria-hidden="true"><span>VS</span><i>matchup</i></div>
              <div className="fray-case__mirror-side fray-case__mirror-side--p2"><span>PLAYER 2 ART</span><svg viewBox="0 0 180 120" role="img" aria-label="Mirrored abstract character art facing toward the center"><path d="M40 105 48 51l34-29 42 17 24 47-15 19H57Z" fill="#dbb563"/><path d="m73 50 20-22 23 9 10 18-17 11-15-8-17 17Z" fill="#f1dfbd"/></svg><small>Mirrored toward P1</small></div>
              <figcaption id="fraymakers-mirror-caption">Small schematic comparison of P2 art mirrored toward the opposing player; it does not depict a real character or output.</figcaption>
            </figure>
            <ul className="fray-case__constraints">
              <li><strong>Aliases</strong><span>Alternate player and character names were part of the inputs.</span></li>
              <li><strong>Long names</strong><span>Variable text had to fit a fixed-size canvas; the specific text-fit strategy is unknown.</span></li>
              <li><strong>Missing assets</strong><span>Availability was a constraint; exact fallback behavior is unknown.</span></li>
            </ul>
          </div>
        </section>

        <footer className="fray-case__outcome" id="fraymakers-outcome" aria-labelledby="fraymakers-outcome-title">
          <div className="fray-case__outcome-copy"><p className="fray-case__eyebrow">03 / WHERE THE WORK LANDED</p><h2 id="fraymakers-outcome-title">A render path that reached real VODs.</h2></div>
          <figure className="fray-case__handoff-path" aria-labelledby="fraymakers-handoff-caption">
            <div className="fray-case__handoff-file"><span>GENERATED OUTPUT</span><strong>Generated 1280 × 720 PNG</strong></div>
            <div className="fray-case__handoff-routes">
              <div className="fray-case__handoff-route fray-case__handoff-route--verified">
                <span className="fray-case__handoff-link" aria-hidden="true"></span>
                <div><span>DOCUMENTED USE</span><strong>used on Fraymakers VODs</strong></div>
              </div>
              <div className="fray-case__handoff-route fray-case__handoff-route--prototype">
                <span className="fray-case__handoff-link" aria-hidden="true"></span>
                <div><span>YouTube Data API / OAuth</span><strong>Prototype only</strong><small>Automatic upload unfinished</small></div>
              </div>
            </div>
            <figcaption id="fraymakers-handoff-caption">solid: VOD use. dashed: prototype path; no automatic upload is shown as complete.</figcaption>
          </figure>
        </footer>
      </article>
    </>
  );
}
