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
  { number: "01", label: "TOURNAMENT CONTEXT", title: "A match in an event", detail: "Participants, results, and set context establish what the recording represents." },
  { number: "02", label: "PLAYER METADATA", title: "Who is playing", detail: "Player details and aliases connect names in the match to its labels and art choices." },
  { number: "03", label: "YAML / CONFIG", title: "Choices for this set", detail: "Event- and match-specific overrides carry the selected inputs forward." },
  { number: "04", label: "VIDEO ASSOCIATION", title: "The corresponding VOD", detail: "Match information identifies the recording that belongs with the generated frame." },
  { number: "05", label: "ASSET COMPOSITION", title: "Art and text meet", detail: "Selected game assets and match labels enter the thumbnail renderer." },
  { number: "06", label: "PNG OUTPUT", title: "1280 × 720", detail: "node-canvas generates a 16:9 image from the composed frame." },
  { number: "07", label: "VOD USE", title: "A frame for the video", detail: "Generated thumbnails were used on real Fraymakers tournament VODs." },
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
      <nav className="fraymakers-nav" aria-label="Fraymakers case study">
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
        <header className="fray-case__intro" id="fraymakers-intro">
          <p className="fray-case__eyebrow">FRAYMAKERS / UPLOADASSISTANT</p>
          <h1 id="fraymakers-title">Every match needs<br />its own frame.</h1>
          <div className="fray-case__intro-bottom">
            <p className="fray-case__dek">A tournament media tool connected match information to recorded videos. I built <code>thumbnail.js</code>, the subsystem that combined each matchup’s art and labels into a thumbnail.</p>
            <dl className="fray-case__facts">
              <div><dt>MY FOCUS</dt><dd>Thumbnail renderer</dd></div>
              <div><dt>OUTPUT</dt><dd>1280 × 720 PNG</dd></div>
              <div><dt>CONTEXT</dt><dd>Shared project with my brother</dd></div>
            </dl>
          </div>
        </header>

        <section className="fray-case__pipeline" id="fraymakers-pipeline" aria-labelledby="fraymakers-pipeline-title">
          <div className="fray-case__section-head">
            <div><p className="fray-case__eyebrow">01 / THE WHOLE WORKFLOW</p><h2 id="fraymakers-pipeline-title">Keep the match, the recording,<br />and the thumbnail together.</h2></div>
            <p className="fray-case__section-intro">The frame was the last visual step in a broader preparation workflow. Its names, art, and set labels needed to describe the same match as the associated VOD.</p>
          </div>
          <figure className="fray-case__pipeline-figure" aria-labelledby="fraymakers-pipeline-caption">
            <ol className="fray-case__stages">
              {pipeline.map((stage, index) => (
                <li className={`fray-case__stage${index >= 4 ? " fray-case__stage--render" : ""}`} key={stage.number}>
                  <span className="fray-case__stage-number">{stage.number}</span>
                  <span className="fray-case__stage-label">{stage.label}</span>
                  <h3>{stage.title}</h3><p>{stage.detail}</p>
                </li>
              ))}
            </ol>
            <div className="fray-case__pipeline-key"><span>WIDER MEDIA WORKFLOW</span><span>THUMBNAIL SUBSYSTEM → USE</span></div>
            <figcaption id="fraymakers-pipeline-caption">Conceptual sequence of the supported workflow. Match-to-video association is established; the exact lookup algorithm is not documented here.</figcaption>
          </figure>
        </section>

        <section className="fray-case__configuration" id="fraymakers-configuration" aria-labelledby="fraymakers-configuration-title">
          <div className="fray-case__config-copy">
            <p className="fray-case__eyebrow">02 / WHAT CHANGES PER MATCH</p>
            <h2 id="fraymakers-configuration-title">Match-specific inputs.<br />A shared render path.</h2>
            <p>Two sets at the same tournament could require different names, characters, costumes, and assists. Event and match overrides let those choices travel into thumbnail generation.</p>
            <p>The wider workflow supplied context and a video association. My work included YAML/configuration and integrating those inputs with the renderer.</p>
          </div>
          <figure className="fray-case__input-figure" aria-labelledby="fraymakers-input-caption">
            <div className="fray-case__input-head"><span>INPUT TO THE THUMBNAIL PATH</span><strong>Per-match choices</strong></div>
            <dl className="fray-case__input-register">
              <div><dt>PLAYER CONTEXT</dt><dd>Names and aliases<span>The identities and labels attached to the matchup.</span></dd></div>
              <div><dt>GAME ART</dt><dd>Character and costume choices<span>Sprites and assists selected for each side.</span></dd></div>
              <div><dt>MATCH TEXT</dt><dd>Event and set labels<span>The context that makes one frame belong to one recording.</span></dd></div>
              <div><dt>PRESENTATION</dt><dd>Logos, stage, and foreground<span>Visual material combined with the player art and text.</span></dd></div>
            </dl>
            <figcaption id="fraymakers-input-caption">Conceptual input categories, rather than a YAML example. The exact YAML keys, values, and defaults are not established by the available evidence.</figcaption>
          </figure>
        </section>

        <section className="fray-case__composition" id="fraymakers-composition" aria-labelledby="fraymakers-composition-title">
          <div className="fray-case__section-head">
            <div><p className="fray-case__eyebrow">03 / INSIDE THUMBNAIL.JS</p><h2 id="fraymakers-composition-title">A fixed canvas.<br />A changing matchup.</h2></div>
            <p className="fray-case__section-intro">node-canvas combined stage/background art, character sprites, alternate costumes, assists, logos, foreground elements, fonts, player names, and set labels into a 1280 × 720 image.</p>
          </div>
          <figure className="fray-case__composition-figure" aria-labelledby="fraymakers-composition-caption">
            <div className="fray-case__composition-topline"><span>COMPOSITION SCHEMATIC</span><span>1280 × 720 / 16:9</span></div>
            <svg viewBox="0 0 1280 720" role="img" aria-labelledby="fraymakers-schematic-title fraymakers-schematic-description">
              <title id="fraymakers-schematic-title">Conceptual thumbnail canvas and its asset regions</title>
              <desc id="fraymakers-schematic-description">A 16 by 9 frame contains stage and background art, two character and costume areas, assists, logos, player names, set labels, and foreground elements. Player two art is mirrored toward the matchup. Boxes are explanatory regions rather than source artwork or verified placement coordinates.</desc>
              <defs><pattern id="fray-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#57c6cb" strokeOpacity=".08" /></pattern></defs>
              <rect width="1280" height="720" fill="#0b1d28" /><rect width="1280" height="720" fill="url(#fray-grid)" />
              <rect x="35" y="35" width="1210" height="650" fill="none" stroke="#57717b" />
              <text x="60" y="79" className="fray-svg-muted">STAGE / BACKGROUND ART</text>
              <rect x="65" y="108" width="225" height="56" className="fray-svg-zone" /><text x="86" y="144" className="fray-svg-small">TOURNAMENT LOGO</text>
              <rect x="960" y="108" width="250" height="56" className="fray-svg-zone" /><text x="986" y="144" className="fray-svg-small">SET / ROUND LABEL</text>
              <rect x="135" y="202" width="430" height="304" className="fray-svg-zone fray-svg-zone--character" />
              <rect x="715" y="202" width="430" height="304" className="fray-svg-zone fray-svg-zone--character" />
              <text x="166" y="243" className="fray-svg-label">P1 · CHARACTER / COSTUME</text>
              <text x="746" y="243" className="fray-svg-label">P2 · CHARACTER / COSTUME</text>
              <path d="M260 450V306H348L408 362 348 418H312V450Z" fill="#57c6cb" fillOpacity=".17" stroke="#57c6cb" strokeWidth="3" />
              <g transform="translate(1280 0) scale(-1 1)"><path d="M260 450V306H348L408 362 348 418H312V450Z" fill="#d6b76b" fillOpacity=".17" stroke="#d6b76b" strokeWidth="3" /></g>
              <path d="M490 361H595M586 351 597 361 586 371M790 361H685M694 351 683 361 694 371" fill="none" stroke="#b7d0d0" strokeWidth="3" />
              <text x="620" y="353" className="fray-svg-vs">VS</text>
              <text x="797" y="484" className="fray-svg-gold">P2 ART MIRRORED</text>
              <rect x="65" y="401" width="165" height="63" className="fray-svg-zone" /><text x="89" y="441" className="fray-svg-small">ASSIST / LOGO</text>
              <rect x="1050" y="401" width="165" height="63" className="fray-svg-zone" /><text x="1074" y="441" className="fray-svg-small">ASSIST / LOGO</text>
              <rect x="135" y="532" width="430" height="66" className="fray-svg-zone" /><text x="240" y="575" className="fray-svg-label">PLAYER ONE NAME</text>
              <rect x="715" y="532" width="430" height="66" className="fray-svg-zone" /><text x="820" y="575" className="fray-svg-label">PLAYER TWO NAME</text>
              <path d="M60 632H1220" stroke="#d6b76b" strokeOpacity=".5" /><text x="465" y="666" className="fray-svg-muted">FOREGROUND ELEMENTS</text>
            </svg>
            <div className="fray-case__mobile-composition" role="img" aria-label="Simplified composition for narrow screens">
              <span className="fray-case__mobile-background">Stage / background + logos</span>
              <div className="fray-case__mobile-players">
                <div><strong>P1 art →</strong><span>character / costume</span><small>assist</small></div>
                <div><strong>← P2 art</strong><span>character / costume</span><small>mirrored · assist</small></div>
              </div>
              <span className="fray-case__mobile-text">Names / set labels / foreground</span>
            </div>
            <figcaption id="fraymakers-composition-caption">Native explanatory drawing, using schematic asset regions. It is not a recovered thumbnail; exact placement and layer ordering are not established.</figcaption>
          </figure>
          <div className="fray-case__constraints">
            <div className="fray-case__constraints-intro"><span className="fray-case__eyebrow">THE RENDERER’S REAL CONSTRAINTS</span><p>Consistent dimensions did not mean identical inputs. These owner-reported cases shaped the thumbnail path.</p></div>
            <dl className="fray-case__constraint-list">
              <div><dt><span>01</span>P2 mirroring</dt><dd><strong>Both players face the matchup</strong><p>Player-two character art was mirrored so the two sides read as opponents in the same frame.</p></dd></div>
              <div><dt><span>02</span>Aliases</dt><dd><strong>Alternate names, corresponding art</strong><p>The path handled alternate player and character names in the match context.</p></dd></div>
              <div><dt><span>03</span>Long names</dt><dd><strong>Variable text, fixed frame</strong><p>Player names varied in length while the output stayed 1280 × 720. The renderer handled that constraint; a specific truncation or font-sizing strategy is not established here.</p></dd></div>
              <div><dt><span>04</span>Missing assets and configuration</dt><dd><strong>Each matchup has its own available inputs</strong><p>The renderer accounted for missing art; configuration supplied match-specific choices. The exact fallback behavior for absent assets or configuration values is not established here.</p></dd></div>
            </dl>
          </div>
        </section>

        <section className="fray-case__ownership" id="fraymakers-ownership" aria-labelledby="fraymakers-ownership-title">
          <p className="fray-case__eyebrow">04 / SHARED TOOL, DISTINCT CONTRIBUTIONS</p>
          <h2 id="fraymakers-ownership-title">I joined later to build the thumbnail path.</h2>
          <dl className="fray-case__ownership-register">
            <div><dt>MY BROTHER / FOUNDATION</dt><dd><strong>My brother started the broader project.</strong><p>He built the foundation and earlier CLI/workflow, plus much of the Challonge integration and early API groundwork.</p></dd></div>
            <div><dt>MY WORK / THUMBNAILS</dt><dd><strong>I built <code>thumbnail.js</code>.</strong><p>I worked on YAML/configuration, thumbnail generation and integration, and part of the YouTube API path.</p></dd></div>
          </dl>
        </section>

        <footer className="fray-case__outcome" id="fraymakers-outcome" aria-labelledby="fraymakers-outcome-title">
          <div className="fray-case__outcome-copy"><p className="fray-case__eyebrow">05 / WHERE THE WORK LANDED</p><h2 id="fraymakers-outcome-title">The frame made it<br />to real VODs.</h2><p>The generated thumbnails were used on real Fraymakers VODs. The completed part of my work was a visual output connected to a tournament recording.</p></div>
          <aside className="fray-case__unfinished" aria-label="Unfinished YouTube upload path"><span className="fray-case__eyebrow">THE NEXT STEP STAYED A PROTOTYPE</span><h3>YouTube Data API v3 / OAuth</h3><p>I contributed to this API path, but it remained prototype work.</p><strong>Automatic upload was not completed.</strong><p>Generating a thumbnail and publishing it to YouTube were separate stages; the latter did not ship.</p></aside>
        </footer>
      </article>
    </>
  );
}
