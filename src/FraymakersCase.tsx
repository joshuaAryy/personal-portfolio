import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./fraymakers-case.css";

const chapters = [
  { id: "pipeline", label: "PIPELINE" },
  { id: "configuration", label: "CONFIG" },
  { id: "composition", label: "COMPOSITION" },
  { id: "outcome", label: "OUTCOME" },
] as const;

type ChapterId = (typeof chapters)[number]["id"];

const pipeline = [
  {
    number: "01",
    labels: ["MATCH + TOURNAMENT"],
    title: "A match in its event",
    detail: "Tournament results, player names, and set information identify the matchup.",
  },
  {
    number: "02",
    labels: ["MATCH DETAILS", "YAML / CONFIG"],
    title: "Resolve match-specific choices",
    detail: "Names and aliases, set labels, characters, costumes, and assists vary by event and match.",
  },
  {
    number: "03",
    labels: ["VIDEO ASSOCIATION"],
    title: "Find its recording",
    detail: "Match information identifies the corresponding tournament VOD.",
  },
  {
    number: "04",
    labels: ["ASSET RESOLUTION", "THUMBNAIL.JS · NODE-CANVAS"],
    title: "Render at 1280 × 720",
    detail: "The renderer composes the selected art and labels into a 16:9 PNG.",
  },
  {
    number: "05",
    labels: ["REAL FRAYMAKERS VODS"],
    title: "The frame in use",
    detail: "Generated thumbnails were used on real Fraymakers VODs.",
  },
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
          <div className="fray-case__intro-copy">
            <p className="fray-case__eyebrow">FRAYMAKERS / UPLOADASSISTANT</p>
            <h1 id="fraymakers-title">A tournament match,<br />carried into its own frame.</h1>
            <p className="fray-case__dek">A match record, game art, and player labels become a 1280 × 720 frame for its associated VOD.</p>
            <p className="fray-case__intro-detail">I built <code>thumbnail.js</code>, composing match-specific art and labels into a frame for its associated VOD.</p>
          </div>
          <figure className="fray-case__hero-system" role="img" aria-label="Ordered conceptual pipeline: match and tournament context, match details and YAML config, video association, asset resolution, thumbnail.js rendering, then a 1280 by 720 PNG for VOD use">
            <div className="fray-case__hero-system-head"><span>ORDERED THUMBNAIL PIPELINE</span><span>16:9 / 1280 × 720</span></div>
            <div className="fray-case__hero-system-flow">
              <div className="fray-case__hero-system-inputs" aria-hidden="true">
                <span>01 / MATCH + TOURNAMENT</span>
                <span>02 / MATCH DETAILS + YAML</span>
                <span>03 / VIDEO ASSOCIATION</span>
                <span>04 / ASSET RESOLUTION</span>
              </div>
              <span className="fray-case__hero-system-arrow" aria-hidden="true">→</span>
              <div className="fray-case__hero-system-renderer" aria-hidden="true">
                <strong>thumbnail.js</strong>
                <span>NODE-CANVAS</span>
              </div>
              <span className="fray-case__hero-system-arrow" aria-hidden="true">→</span>
              <div className="fray-case__hero-system-output" aria-hidden="true">
                <span className="fray-case__hero-player fray-case__hero-player--one">P1</span>
                <span className="fray-case__hero-versus">VS</span>
                <span className="fray-case__hero-player fray-case__hero-player--two">P2</span>
                <span className="fray-case__hero-system-output-label">PNG / VOD FRAME</span>
              </div>
            </div>
            <figcaption>Conceptual system view; this is not recovered project art or a generated thumbnail.</figcaption>
          </figure>
        </header>

        <section className="fray-case__pipeline" id="fraymakers-pipeline" aria-labelledby="fraymakers-pipeline-title">
          <div className="fray-case__section-head">
            <div><p className="fray-case__eyebrow">01 / THE WHOLE WORKFLOW</p><h2 id="fraymakers-pipeline-title">Keep the match, the recording,<br />and the thumbnail together.</h2></div>
            <p className="fray-case__section-intro">Follow the match from its tournament context to the recording, selected assets, rendered image, and real VOD use.</p>
          </div>
          <figure className="fray-case__pipeline-figure" aria-labelledby="fraymakers-pipeline-caption">
            <ol className="fray-case__stages">
              {pipeline.map((stage) => (
                <li className="fray-case__stage" key={stage.number}>
                  <span className="fray-case__stage-number">{stage.number}</span>
                  <div className="fray-case__stage-labels">
                    {stage.labels.map((label) => <span className="fray-case__stage-label" key={label}>{label}</span>)}
                  </div>
                  <h3>{stage.title}</h3>
                  <p>{stage.detail}</p>
                </li>
              ))}
            </ol>
            <aside className="fray-case__upload-prototype" aria-label="Unfinished YouTube upload path">
              <span className="fray-case__upload-prototype-connector" aria-hidden="true">→</span>
              <div>
                <span className="fray-case__upload-prototype-label">NEXT STEP / PROTOTYPE</span>
                <strong>YouTube Data API v3 / OAuth</strong>
                <p>Automatic upload was not completed.</p>
              </div>
            </aside>
            <figcaption id="fraymakers-pipeline-caption">The generated image was used on real tournament VODs; publishing it automatically remained prototype work.</figcaption>
          </figure>
        </section>

        <section className="fray-case__configuration" id="fraymakers-configuration" aria-labelledby="fraymakers-configuration-title">
          <figure className="fray-case__input-figure" aria-labelledby="fraymakers-input-caption">
            <div className="fray-case__input-head"><span>YAML / CONFIG</span><strong>Match-specific choices</strong></div>
            <dl className="fray-case__input-register">
              <div><dt>PLAYER CONTEXT</dt><dd>Names and aliases<span>Labels and identities attached to the matchup.</span></dd></div>
              <div><dt>GAME ART</dt><dd>Character and costume choices<span>Sprites and assists selected for each side.</span></dd></div>
              <div><dt>MATCH TEXT</dt><dd>Event and set labels<span>Context that connects a match to its recording.</span></dd></div>
              <div><dt>PRESENTATION</dt><dd>Logos, stage, and foreground<span>Visual material combined with player art and text.</span></dd></div>
            </dl>
            <figcaption id="fraymakers-input-caption">Conceptual input categories, rather than a YAML example; exact YAML keys, values, defaults, and asset order are not established.</figcaption>
          </figure>
          <div className="fray-case__config-copy">
            <p className="fray-case__eyebrow">02 / MATCH-SPECIFIC INPUTS</p>
            <h2 id="fraymakers-configuration-title">One render path.<br />Choices change by match.</h2>
            <p>Two sets at the same tournament could need different names, characters, costumes, and assists. Event and match overrides carried match-specific choices into thumbnail generation.</p>
          </div>
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
          <p className="fray-case__ownership-note">My brother started the broader project and built its foundation, earlier CLI/workflow, and much of the Challonge integration and API groundwork. I joined later and built <code>thumbnail.js</code>, with additional work on YAML/configuration, thumbnail generation and integration, and part of the YouTube API path.</p>
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

        <footer className="fray-case__outcome" id="fraymakers-outcome" aria-labelledby="fraymakers-outcome-title">
          <div className="fray-case__outcome-copy"><p className="fray-case__eyebrow">04 / WHERE THE WORK LANDED</p><h2 id="fraymakers-outcome-title">The frame made it<br />to real VODs.</h2><p>The generated thumbnails were used on real Fraymakers VODs, connecting the completed thumbnail workflow to tournament recordings.</p></div>
        </footer>
      </article>
    </>
  );
}
