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
        <header className="fray-case__intro" id="fraymakers-pipeline">
          <div className="fray-case__intro-copy">
            <p className="fray-case__eyebrow">FRAYMAKERS / UPLOADASSISTANT</p>
            <h1 id="fraymakers-title">A tournament match,<br />carried into its own frame.</h1>
            <p className="fray-case__dek">I built <code>thumbnail.js</code> to turn match-specific art and labels into a 1280 × 720 PNG for its associated VOD.</p>
          </div>
          <figure className="fray-case__hero-figure" aria-labelledby="fraymakers-hero-caption">
            <div className="fray-case__hero-topline"><span>THUMBNAIL COMPOSITION SCHEMATIC</span><span>16:9 · 1280 × 720</span></div>
            <svg viewBox="0 0 1280 720" role="img" aria-labelledby="fraymakers-hero-title fraymakers-hero-description">
              <title id="fraymakers-hero-title">Thumbnail composition schematic</title>
              <desc id="fraymakers-hero-description">A conceptual 16:9 layout with a background, opposing abstract player-art shapes, supporting art, name regions, and set-label regions. It does not depict an authentic generated thumbnail.</desc>
              <defs>
                <linearGradient id="fray-bg" x2="1" y2="1"><stop stopColor="#153744"/><stop offset=".5" stopColor="#0b1d28"/><stop offset="1" stopColor="#302c22"/></linearGradient>
                <pattern id="fray-lines" width="72" height="72" patternUnits="userSpaceOnUse" patternTransform="skewX(-20)"><path d="M0 0V72" stroke="#91b6b4" strokeOpacity=".1" strokeWidth="2"/></pattern>
                <linearGradient id="fray-p1" x2="1" y2="1"><stop stopColor="#63ced0"/><stop offset="1" stopColor="#267681"/></linearGradient>
                <linearGradient id="fray-p2" x2="0" y2="1"><stop stopColor="#e4c16f"/><stop offset="1" stopColor="#9d663f"/></linearGradient>
                <filter id="fray-shadow" x="-.3" y="-.3" width="1.6" height="1.7"><feGaussianBlur stdDeviation="18"/></filter>
              </defs>
              <rect width="1280" height="720" fill="url(#fray-bg)"/>
              <rect width="1280" height="720" fill="url(#fray-lines)"/>
              <circle cx="634" cy="340" r="250" fill="#57c6cb" fillOpacity=".13" filter="url(#fray-shadow)"/>
              <path d="M0 530 215 420l175 87 177-136 210 137 174-67 329 155v124H0Z" fill="#091923" fillOpacity=".75"/>
              <path d="M0 560 203 454l167 85 186-131 206 132 167-71 351 161" fill="none" stroke="#82b8ba" strokeOpacity=".32" strokeWidth="4"/>
              <rect x="38" y="38" width="1204" height="644" rx="12" fill="none" stroke="#e2d6b8" strokeOpacity=".55" strokeWidth="2"/>
              <rect x="76" y="76" width="260" height="70" rx="5" fill="#07151d" fillOpacity=".8" stroke="#8ba9a8" strokeOpacity=".65"/>
              <path d="M98 111h34m-17-17v34" stroke="#d6b76b" strokeWidth="5" strokeLinecap="round"/>
              <path d="M145 100h168M145 121h103" stroke="#adc4c1" strokeOpacity=".55" strokeWidth="7" strokeLinecap="round"/>
              <rect x="919" y="76" width="285" height="70" rx="5" fill="#07151d" fillOpacity=".8" stroke="#8ba9a8" strokeOpacity=".65"/>
              <path d="M947 101h214M947 122h149" stroke="#d7c89e" strokeOpacity=".72" strokeWidth="7" strokeLinecap="round"/>
              <path d="M275 535 303 302l123-102 154 62 76 164-48 159H320Z" fill="#030b10" fillOpacity=".45" transform="translate(14 20)"/>
              <path d="M275 535 303 302l123-102 154 62 76 164-48 159H320Z" fill="url(#fray-p1)" stroke="#a8eeee" strokeOpacity=".8" strokeWidth="5"/>
              <path d="M360 318 414 244l70 20 39 61-45 31-40-23-50 53Z" fill="#daf1e5" fillOpacity=".84"/>
              <path d="M1005 535 977 302l-123-102-154 62-76 164 48 159h188Z" fill="#030b10" fillOpacity=".45" transform="translate(-14 20)"/>
              <path d="M1005 535 977 302l-123-102-154 62-76 164 48 159h188Z" fill="url(#fray-p2)" stroke="#f1dca5" strokeOpacity=".83" strokeWidth="5"/>
              <path d="m920 318-54-74-70 20-39 61 45 31 40-23 50 53Z" fill="#f2e4ca" fillOpacity=".86"/>
              <path d="m506 407 78-69 76 14 68 70-63 76H566Z" fill="#0c202a" stroke="#e7c66e" strokeWidth="4"/>
              <path d="M609 396h26m-13-13v26" stroke="#e7c66e" strokeWidth="5" strokeLinecap="round"/>
              <rect x="84" y="586" width="440" height="62" rx="4" fill="#06131a" fillOpacity=".9" stroke="#66c7ca" strokeOpacity=".8"/>
              <path d="M108 608h334M108 627h205" stroke="#cee6df" strokeOpacity=".65" strokeWidth="7" strokeLinecap="round"/>
              <rect x="756" y="586" width="440" height="62" rx="4" fill="#06131a" fillOpacity=".9" stroke="#d6b76b" strokeOpacity=".8"/>
              <path d="M780 608h334M780 627h205" stroke="#e9dfc8" strokeOpacity=".65" strokeWidth="7" strokeLinecap="round"/>
            </svg>
            <ul className="fray-case__hero-key" aria-label="Schematic regions">
              <li>Background &amp; stage art</li><li>Player character &amp; costume art</li><li>Supporting assets</li><li>Player names &amp; set labels</li>
            </ul>
            <div className="fray-case__hero-tools" aria-label="Renderer tools"><span>RENDERER</span><code>thumbnail.js</code><span>CANVAS</span><strong>node-canvas</strong></div>
            <figcaption id="fraymakers-hero-caption">Schematic only; this is not an authentic generated thumbnail.</figcaption>
          </figure>
          <p className="fray-case__intro-detail">My brother built the broader foundation, CLI, Challonge integration, and much of the early API groundwork; I joined later to build <code>thumbnail.js</code> and work on YAML/configuration, generation/integration, and part of the YouTube API path.</p>
        </header>

        <section className="fray-case__configuration" id="fraymakers-configuration" aria-labelledby="fraymakers-configuration-title">
          <div className="fray-case__config-copy">
            <p className="fray-case__eyebrow">01 / MATCH TO COMPOSITION</p>
            <h2 id="fraymakers-configuration-title">Choices travel with<br />the recording.</h2>
            <p>Tournament and match information, with event or match overrides, supplied the choices for a matchup. Those choices were associated with its recording; selected labels and art then passed into the renderer.</p>
            <p>The categories below are conceptual, not a recovered YAML example. Exact keys and override behavior are not established.</p>
          </div>
          <figure className="fray-case__workflow-figure" aria-labelledby="fraymakers-workflow-caption">
            <div className="fray-case__workflow-node fray-case__workflow-node--inputs">
              <span className="fray-case__workflow-kicker">MATCH CONTEXT</span>
              <strong>Tournament + match information</strong>
              <ul><li>Player and set labels</li><li>Character, costume, assist</li><li>Event or match overrides</li></ul>
            </div>
            <span className="fray-case__workflow-link" aria-hidden="true">→</span>
            <div className="fray-case__workflow-node fray-case__workflow-node--recording">
              <span className="fray-case__workflow-kicker">ASSOCIATION</span>
              <strong>Match choices paired with its recording</strong>
              <div className="fray-case__recording-mark" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><i>VOD</i></div>
            </div>
            <span className="fray-case__workflow-link" aria-hidden="true">→</span>
            <div className="fray-case__workflow-node fray-case__workflow-node--handoff">
              <span className="fray-case__workflow-kicker">RENDER INPUTS</span>
              <strong>Selected labels + art</strong>
              <ul className="fray-case__handoff-assets"><li>Player art</li><li>Background &amp; support</li><li>Names &amp; set labels</li></ul>
              <span className="fray-case__handoff-chip">thumbnail.js</span>
            </div>
            <figcaption id="fraymakers-workflow-caption">Conceptual relationship: match context and configuration inform the choices carried into a recording’s thumbnail.</figcaption>
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
          <div className="fray-case__outcome-copy"><p className="fray-case__eyebrow">03 / WHERE THE WORK LANDED</p><h2 id="fraymakers-outcome-title">Generated frames<br />used on real VODs.</h2><p>The thumbnail generator produced 1280 × 720 PNGs that were used on Fraymakers VODs. YouTube authentication and integration were prototyped; automatic upload was unfinished.</p></div>
          <div className="fray-case__outcome-status" aria-label="YouTube integration status"><span>YOUTUBE DATA API / OAUTH</span><strong>Prototype</strong><small>Automatic upload unfinished</small></div>
        </footer>
      </article>
    </>
  );
}
