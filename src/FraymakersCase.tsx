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

function ThumbnailPreview() {
  return (
    <figure className="fray-case__hero-visual">
      <div className="fray-case__hero-screen" role="img" aria-label="Conceptual 1280 by 720 Fraymakers thumbnail preview">
        <svg viewBox="0 0 640 360" aria-hidden="true">
          <defs>
            <linearGradient id="fray-preview-bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#173b47" /><stop offset="1" stopColor="#07111a" /></linearGradient>
            <pattern id="fray-preview-grid" width="24" height="24" patternUnits="userSpaceOnUse"><path d="M24 0H0V24" fill="none" stroke="#57c6cb" strokeOpacity=".09" /></pattern>
          </defs>
          <rect width="640" height="360" fill="url(#fray-preview-bg)" />
          <rect width="640" height="360" fill="url(#fray-preview-grid)" />
          <path d="M0 260 150 170l95 65 104-126 120 120 84-49 87 63v117H0Z" fill="#25444b" fillOpacity=".68" />
          <path d="M0 291 119 228l120 57 119-77 117 69 81-43 84 42v84H0Z" fill="#102832" />
          <path d="M0 291 119 228l120 57 119-77 117 69 81-43 84 42" fill="none" stroke="#57c6cb" strokeOpacity=".45" strokeWidth="2" />
          <path d="M182 227v-54l24-35 22 4 18 30-6 41 18 30-75 2Z" fill="#57c6cb" fillOpacity=".28" stroke="#74dde0" strokeWidth="2" />
          <circle cx="217" cy="133" r="19" fill="#57c6cb" fillOpacity=".4" stroke="#74dde0" strokeWidth="2" />
          <g transform="translate(640 0) scale(-1 1)"><path d="M182 227v-54l24-35 22 4 18 30-6 41 18 30-75 2Z" fill="#d6b76b" fillOpacity=".26" stroke="#e6cf8c" strokeWidth="2" /><circle cx="217" cy="133" r="19" fill="#d6b76b" fillOpacity=".38" stroke="#e6cf8c" strokeWidth="2" /></g>
          <rect x="22" y="19" width="145" height="26" rx="3" fill="#07111a" fillOpacity=".78" stroke="#62828a" />
          <text x="34" y="37" className="fray-preview-label">EVENT / SET</text>
          <rect x="22" y="297" width="249" height="42" rx="3" fill="#07111a" fillOpacity=".88" stroke="#57c6cb" />
          <rect x="369" y="297" width="249" height="42" rx="3" fill="#07111a" fillOpacity=".88" stroke="#d6b76b" />
          <text x="39" y="323" className="fray-preview-player">PLAYER ONE</text>
          <text x="601" y="323" className="fray-preview-player fray-preview-player--right">PLAYER TWO</text>
          <text x="300" y="220" className="fray-preview-vs">VS</text>
          <path d="M22 275h596" stroke="#d6b76b" strokeOpacity=".55" />
        </svg>
      </div>
      <figcaption><span>CONCEPTUAL OUTPUT</span><span>16:9 · 1280 × 720</span></figcaption>
    </figure>
  );
}

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
            <p className="fray-case__dek">Match and event details met character art, player names, and set labels in <code>thumbnail.js</code>—the renderer I built for Fraymakers tournament videos.</p>
            <p className="fray-case__intro-credit">My brother started the broader project, building its foundation, CLI, Challonge integration, and much of the early API groundwork. I joined later to build <code>thumbnail.js</code> and work on YAML/configuration and thumbnail integration.</p>
          </div>
          <ThumbnailPreview />
        </header>

        <section className="fray-case__pipeline" id="fraymakers-pipeline" aria-labelledby="fraymakers-pipeline-title">
          <div className="fray-case__section-head">
            <div><p className="fray-case__eyebrow">01 / THE MEDIA PATH</p><h2 id="fraymakers-pipeline-title">One match record.<br />A frame that stays with it.</h2></div>
            <p className="fray-case__section-intro">Metadata, match overrides, assets, and the corresponding video converge in the thumbnail renderer.</p>
          </div>
          <figure className="fray-case__pipeline-figure" aria-labelledby="fraymakers-pipeline-caption">
            <ol className="fray-case__flow" aria-label="Fraymakers media workflow schematic">
              <li><span>01</span><strong>MATCH METADATA</strong><small>Players + aliases<br />Event · set · result</small></li>
              <li id="fraymakers-configuration"><span>02</span><strong>YAML / CONFIG OVERRIDES</strong><small>Event + match overrides</small></li>
              <li><span>03</span><strong>VIDEO / MATCH ASSOCIATION</strong><small>The recording linked to this set</small></li>
              <li><span>04</span><strong>ASSET RESOLUTION</strong><small>Characters · costumes · assists<br />Stage art · logos · foreground</small></li>
              <li><span>05</span><strong>THUMBNAIL.JS + NODE-CANVAS</strong><small>Compose selected art + labels<br />1280 × 720 PNG</small></li>
              <li><span>06</span><strong>REAL FRAYMAKERS VODS</strong><small>Generated thumbnails used on tournament recordings</small></li>
            </ol>
            <div className="fray-case__asset-note"><strong>Renderer handled</strong><span>P2 mirroring</span><span>Aliases</span><span>Long names</span><span>Missing assets</span></div>
            <div className="fray-case__api-branch"><span className="fray-case__api-branch-line" aria-hidden="true">················→</span><span><strong>YouTube Data API v3 / OAuth</strong><small>Prototype path · automatic upload was not completed</small></span></div>
            <figcaption id="fraymakers-pipeline-caption">Conceptual path; the exact video lookup, YAML keys, values, and defaults are not established.</figcaption>
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
          <p className="fray-case__composition-note">P2 art was mirrored toward the matchup. The fixed 1280 × 720 canvas handled long names; alias and missing-asset fallback details are not established.</p>
        </section>

        <footer className="fray-case__outcome" id="fraymakers-outcome" aria-labelledby="fraymakers-outcome-title">
          <div className="fray-case__outcome-copy"><p className="fray-case__eyebrow">04 / WHERE THE WORK LANDED</p><h2 id="fraymakers-outcome-title">The frame made it<br />to real VODs.</h2><p>Generated thumbnails were used on real Fraymakers VODs. The upload API remained a prototype, so publishing was a separate unfinished step.</p></div>
        </footer>
      </article>
    </>
  );
}
