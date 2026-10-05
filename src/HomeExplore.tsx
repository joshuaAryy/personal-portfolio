import { useRef, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "./PortfolioLayout";
import { experience, projects } from "./data";
import "./home-explore.css";

const modes = [
  {
    id: "projects",
    label: "Projects",
    subtitle: "Built systems",
    description: "Products and systems built across software, AI, data and automation.",
    path: "/projects",
    emblem: "/media/lobby/home-mode-projects.svg",
    glyph: "/media/lobby/home-mode-projects-glyph-review-candidate.svg",
    glyphNodeId: "3339:684",
  },
  {
    id: "experience",
    label: "Experience",
    subtitle: "Professional work",
    description: "Molecular research and client data work, told through the systems behind them.",
    path: "/experience",
    emblem: "/media/lobby/home-mode-experience.svg",
    glyph: "/media/lobby/home-mode-experience-glyph-review-candidate.svg",
    glyphNodeId: "3339:696",
  },
  {
    id: "hackathons",
    label: "Hackathons",
    subtitle: "Build under pressure",
    description: "Focused team builds shaped by a challenge, a working demo, and a clear result.",
    path: "/hackathons",
    emblem: "/media/lobby/home-mode-hackathons.svg",
    glyph: "/media/lobby/home-mode-hackathons-glyph-review-candidate.svg",
    glyphNodeId: "3339:708",
  },
  {
    id: "education",
    label: "Education",
    subtitle: "Academic path",
    description: "An engineering degree explored through computing, digital logic, and circuit design.",
    path: "/education",
    emblem: "/media/lobby/home-mode-education.svg",
    glyph: "/media/lobby/home-mode-education-glyph-review-candidate.svg",
    glyphNodeId: "3339:718",
  },
] as const;

const projectAreas = [
  { label: "AI / ML", detail: "Machine intelligence" },
  { label: "Software", detail: "Systems + applications" },
  { label: "Full Stack", detail: "End-to-end products" },
  { label: "Data / Automation", detail: "Pipelines + tooling" },
] as const;

const crest = projects.find((project) => project.slug === "crest");

type ModeId = (typeof modes)[number]["id"];

function HomeExploreContent() {
  const navigate = useNavigate();
  const goBackWithinPortfolio = () => {
    const historyIndex = window.history.state?.idx;
    if (typeof historyIndex === "number" && historyIndex > 0) {
      navigate(-1);
    }
  };
  const [selectedId, setSelectedId] = useState<ModeId>("projects");
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const selectedIndex = modes.findIndex((mode) => mode.id === selectedId);
  const selected = modes[selectedIndex];

  function confirmSelection() {
    navigate(selected.path);
  }

  function handleModeKeyDown(
    event: KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      const next = (index + delta + modes.length) % modes.length;
      setSelectedId(modes[next].id);
      buttonRefs.current[next]?.focus();
    }
    if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const next = event.key === "Home" ? 0 : modes.length - 1;
      setSelectedId(modes[next].id);
      buttonRefs.current[next]?.focus();
    }
    if (event.key === "Enter") {
      event.preventDefault();
      confirmSelection();
    }
  }

  return (
    <section className="home-explore" aria-labelledby="home-explore-title">
      <header className="home-explore__heading">
        <div>
          <p className="home-explore__eyebrow">Portfolio client / Home</p>
          <h1 id="home-explore-title">Select a portfolio mode</h1>
        </div>
      </header>

      <div
        className="home-explore__modes"
        role="group"
        aria-label="Portfolio modes"
        aria-describedby="home-explore-keyboard-help"
      >
        {modes.map((mode, index) => {
          const isSelected = selected.id === mode.id;
          return (
            <button
              className="home-explore__mode"
              data-selected={isSelected}
              type="button"
              key={mode.id}
              aria-label={mode.label}
              aria-pressed={isSelected}
              ref={(node) => {
                buttonRefs.current[index] = node;
              }}
              onClick={() => setSelectedId(mode.id)}
              onKeyDown={(event) => handleModeKeyDown(event, index)}
            >
              <span className="home-explore__mode-frame" aria-hidden="true">
                <img
                  className="home-explore__mode-emblem"
                  src={mode.emblem}
                  alt=""
                />
                {mode.glyph && (
                  <span className={`home-explore__mode-glyph home-explore__mode-glyph--${mode.id}`}>
                    <img src={mode.glyph} alt="" data-node-id={mode.glyphNodeId} />
                  </span>
                )}
                <img
                  className="home-explore__mode-selected-ring"
                  src="/media/lobby/home-mode-selected-ring.svg"
                  alt=""
                  aria-hidden="true"
                />
              </span>
              <span className="home-explore__mode-name">{mode.label}</span>
              <span className="home-explore__mode-subtitle">{mode.subtitle}</span>
            </button>
          );
        })}
      </div>

      <section className="home-explore__selection" aria-live="polite">
        <div className="home-explore__selection-copy">
          <h2>{selected.label}</h2>
          <p className="home-explore__instruction">Choose a mode, then Confirm to continue.</p>
          <p>{selected.description}</p>
        </div>
        <div className={`home-explore__selection-focus home-explore__selection-focus--${selected.id}`}>
          {selected.id === "projects" && (
            <>
              <h3>PROJECT AREAS</h3>
              <ul aria-label="Project areas">
                {projectAreas.map((area) => (
                  <li key={area.label}>
                    <strong>{area.label}</strong>
                    <small>{area.detail}</small>
                  </li>
                ))}
              </ul>
            </>
          )}
          {selected.id === "experience" && (
            <>
              <h3>RESEARCH + DATA SYSTEMS</h3>
              <div className="home-explore__preview home-explore__preview--experience" aria-label="Experience preview">
                {experience.map((role) => {
                  const isResearch = role.slug === "living-in-silico";
                  return (
                    <article
                      className="home-explore__preview-fact"
                      data-preview-fact={isResearch ? "research" : "software-engineering"}
                      key={role.slug}
                    >
                      <span className="home-explore__preview-kind">{isResearch ? "MOLECULAR RESEARCH" : "DATA ENGINEERING"}</span>
                      <strong>{isResearch ? "Living in Silico" : "Stush Patties"}</strong>
                      <small className="home-explore__preview-detail">{isResearch
                        ? "Molecular representations, generative models, and fragment workflows."
                        : "Distributor data normalized into reporting-ready outputs."}</small>
                    </article>
                  );
                })}
              </div>
            </>
          )}
          {selected.id === "hackathons" && crest && (
            <>
              <h3>CHALLENGE BUILD</h3>
              <div className="home-explore__preview home-explore__preview--hackathons" aria-label="Hackathon preview">
                <div className="home-explore__preview-event" data-preview-fact="award">
                  <span className="home-explore__preview-kind">{crest.name} · MPC Hacks 2026</span>
                  <strong className="home-explore__preview-result">3rd Place</strong>
                  <span className="home-explore__preview-challenge">Brim Financial Challenge</span>
                </div>
                <div className="home-explore__preview-work" aria-label="Crest system areas">
                  <span>Expense intelligence</span>
                  <span>Policy + anomaly review</span>
                  <span>Human decision flow</span>
                </div>
              </div>
            </>
          )}
          {selected.id === "education" && (
            <>
              <h3>DEGREE + FOUR SELECTED BUILDS</h3>
              <div className="home-explore__preview home-explore__preview--education" aria-label="Education preview">
                <div className="home-explore__preview-degree">
                  <strong>Computer Engineering</strong>
                  <span>B.Eng. · Software Specialization</span>
                  <small className="home-explore__preview-expected">Expected 2028</small>
                </div>
                <div className="home-explore__build-grid" aria-label="Selected academic projects">
                  <span>Dental Clinic DBMS <small>In progress</small></span>
                  <span>Bookstore Management</span>
                  <span>8-bit ALU / FSM</span>
                  <span>CMOS Amplifier</span>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <div className="home-explore__confirm-area">
        <div className="home-explore__confirm-pair">
          <button
            className="home-explore__back"
            type="button"
            aria-label="Back to the previous screen"
            onClick={goBackWithinPortfolio}
          >
            <img className="home-explore__back-disc" src="/media/lobby/home-confirm-disc.svg" alt="" aria-hidden="true" />
            <img className="home-explore__back-chevron" src="/media/lobby/home-confirm-chevron.svg" alt="" aria-hidden="true" />
          </button>
          <button
            className="home-explore__confirm"
            type="button"
            aria-label={`Confirm ${selected.label} destination`}
            onClick={confirmSelection}
          >
            <img src="/media/lobby/home-confirm-button.svg" alt="" aria-hidden="true" />
            <span>Confirm</span>
          </button>
        </div>
        <p className="home-explore__keyboard-help" id="home-explore-keyboard-help">
          Use Left and Right Arrow to move between modes. Home and End jump to the
          first or last mode. Press Enter to open the selected mode.
        </p>
      </div>
    </section>
  );
}

export default function HomeExplore() {
  return (
    <Client pageClass="main--home-explore">
      <HomeExploreContent />
    </Client>
  );
}
