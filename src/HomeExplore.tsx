import { useRef, useState, type KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "./PortfolioLayout";
import "./home-explore.css";

const modes = [
  {
    id: "projects",
    label: "Projects",
    subtitle: "Built systems",
    description:
      "Explore products and systems I build outside the classroom. Select a focus, then confirm to enter the project lobby.",
    path: "/projects",
    emblem: "/media/lobby/home-mode-projects.svg",
    glyph: "/media/lobby/home-mode-projects-glyph-review-candidate.svg",
    glyphNodeId: "3339:684",
    focus: [
      { label: "Featured", detail: "Strongest work", featured: true },
      { label: "AI / ML", detail: "Machine intelligence" },
      { label: "Software", detail: "Systems + applications" },
      { label: "Full stack", detail: "End-to-end products" },
      { label: "Data / automation", detail: "Pipelines + tooling" },
    ],
  },
  {
    id: "experience",
    label: "Experience",
    subtitle: "Professional work",
    description:
      "Research engineering and client-facing software workflows.",
    path: "/experience",
    emblem: "/media/lobby/home-mode-experience.svg",
    glyph: "/media/lobby/home-mode-experience-glyph-review-candidate.svg",
    glyphNodeId: "3339:696",
    focus: [
      { label: "Research / ML", detail: "Living in Silico" },
      { label: "Data pipelines", detail: "Stush Patties" },
    ],
  },
  {
    id: "hackathons",
    label: "Hackathons",
    subtitle: "Build under pressure",
    description:
      "Competition work shaped around focused team builds and clear constraints.",
    path: "/hackathons",
    emblem: "/media/lobby/home-mode-hackathons.svg",
    glyph: "/media/lobby/home-mode-hackathons-glyph-review-candidate.svg",
    glyphNodeId: "3339:708",
    focus: [
      { label: "Crest", detail: "MPC Hacks 2026" },
      { label: "Brim Financial Challenge", detail: "Third place" },
    ],
  },
  {
    id: "education",
    label: "Education",
    subtitle: "Academic path",
    description:
      "Computer Engineering coursework and academic foundations.",
    path: "/education",
    emblem: "/media/lobby/home-mode-education.svg",
    glyph: "/media/lobby/home-mode-education-glyph-review-candidate.svg",
    glyphNodeId: "3339:718",
    focus: [
      { label: "Degree", detail: "Computer Engineering" },
      { label: "Coursework", detail: "Toronto Metropolitan University" },
    ],
  },
] as const;

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
      <div className="home-explore__subnav">
        <span className="home-explore__subnav-current" aria-current="page">
          Explore
        </span>
        <span>Curated</span>
        <span>Recent</span>
        <span>About</span>
      </div>

      <header className="home-explore__heading">
        <div>
          <p className="home-explore__eyebrow">Portfolio client / Home</p>
          <h1 id="home-explore-title">Select a portfolio mode</h1>
          <p className="home-explore__intro">
            Select a destination. Confirm to enter its lobby.
          </p>
        </div>
        <span className="home-explore__state">EXPLORE / SELECT A MODE</span>
      </header>

      <div className="home-explore__modes" role="group" aria-label="Portfolio modes">
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
          <p>{selected.description}</p>
        </div>
        <div className="home-explore__selection-focus">
          <ul aria-label={`${selected.label} focus options`}>
            {selected.focus.map((item) => (
              <li data-featured={"featured" in item && item.featured} key={item.label}>
                <strong>{item.label}</strong>
                <small>{item.detail}</small>
              </li>
            ))}
          </ul>
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
        <p>Use the arrows to move. Enter confirms.</p>
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
