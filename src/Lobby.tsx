import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { experience, projects } from "./data";
import { Client, Mark } from "./PortfolioLayout";
import { experienceStoryPaths, projectCasePaths } from "./project-route-paths";
import JMark from "./identity/JMark";

function LobbyCard({
  name,
  subtitle,
  role,
  indexGlyph,
  selected,
  onClick,
  owner = false,
}: {
  name: string;
  subtitle: string;
  role: string;
  indexGlyph?: string;
  selected: boolean;
  onClick: () => void;
  owner?: boolean;
}) {
  return (
    <button
      type="button"
      className={"lobby-card" + (selected ? " lobby-card--selected" : "")}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className={"card-insignia" + (owner ? " card-insignia--owner" : "")}>
        {owner ? (
          <JMark variant="ringed" decorative className="owner-j-mark" />
        ) : indexGlyph ? (
          <span
            className={
              "mark project-index" +
              (indexGlyph.length > 1 ? " project-index--wide" : "")
            }
            aria-hidden="true"
          >
            <span>{indexGlyph}</span>
          </span>
        ) : (
          <Mark />
        )}
      </span>
      <strong>{name}</strong>
      <span className="card-subtitle">{subtitle}</span>
      <span className="card-role">{role}</span>
      <span className="card-glyphs" aria-hidden="true">
        <i>◇</i>
        <i>✧</i>
      </span>
      {owner && <span className="owner-label">PORTFOLIO OWNER</span>}
    </button>
  );
}

export default function Lobby({ mode }: { mode: "projects" | "experience" }) {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState("food-tracker");
  const [selectedExperience, setSelectedExperience] =
    useState<(typeof experience)[number]["slug"]>("living-in-silico");
  const isProjects = mode === "projects";
  const selected = isProjects
    ? projects.find((project) => project.slug === selectedProject)!
    : experience.find((item) => item.slug === selectedExperience)!;
  const selectedDescription = isProjects
    ? projects.find((project) => project.slug === selectedProject)!.detail
    : (() => {
        const item = experience.find((entry) => entry.slug === selectedExperience)!;
        return `${item.title} · ${item.dates}`;
      })();
  const source = isProjects
    ? projects.find((project) => project.slug === selectedProject)?.source
    : undefined;
  const selectedDetailPath = isProjects
    ? projectCasePaths[selectedProject]
    : experienceStoryPaths[selectedExperience];

  return (
    <Client pageClass="main--lobby">
      <div className="lobby-scene">
        <div className="lobby-heading">
          <span className="heading-ornament">✣</span>
          <div>
            <h1>{isProjects ? "PROJECTS · FEATURED" : "EXPERIENCE"}</h1>
            <p>
              {isProjects
                ? "SELECT A PROJECT TO EXPLORE WHAT'S AVAILABLE"
                : "PROFESSIONAL WORK · RESEARCH · DATA SYSTEMS"}
            </p>
          </div>
        </div>
        <div
          className={
            "lobby-cards " + (isProjects ? "" : "lobby-cards--experience")
          }
        >
          {isProjects ? (
            <>
              {projects.slice(0, 2).map((project) => (
                <LobbyCard
                  key={project.slug}
                  name={project.name}
                  subtitle={project.short}
                  role={project.role}
                  indexGlyph={project.indexGlyph}
                  selected={selectedProject === project.slug}
                  onClick={() => setSelectedProject(project.slug)}
                />
              ))}
              <LobbyCard
                name="Joshua Aryeetey"
                subtitle="Computer Engineering · Software"
                role="PORTFOLIO OWNER"
                selected={false}
                owner
                onClick={() => navigate("/profile")}
              />
              {projects.slice(2).map((project) => (
                <LobbyCard
                  key={project.slug}
                  name={project.name}
                  subtitle={project.short}
                  role={project.role}
                  indexGlyph={project.indexGlyph}
                  selected={selectedProject === project.slug}
                  onClick={() => setSelectedProject(project.slug)}
                />
              ))}
            </>
          ) : (
            <>
              <span className="lobby-plus" aria-hidden="true">
                +
              </span>
              <LobbyCard
                name={experience[0].name}
                subtitle={`${experience[0].title} · ${experience[0].dates}`}
                role={experience[0].role}
                selected={selectedExperience === experience[0].slug}
                onClick={() => setSelectedExperience(experience[0].slug)}
              />
              <LobbyCard
                name="Joshua Aryeetey"
                subtitle="Computer Engineering · Software"
                role="PORTFOLIO OWNER"
                selected={false}
                owner
                onClick={() => navigate("/profile")}
              />
              <LobbyCard
                name={experience[1].name}
                subtitle={`${experience[1].title} · ${experience[1].dates}`}
                role={experience[1].role}
                selected={selectedExperience === experience[1].slug}
                onClick={() => setSelectedExperience(experience[1].slug)}
              />
              <span className="lobby-plus" aria-hidden="true">
                +
              </span>
            </>
          )}
        </div>
        <div className="lobby-bottom">
          <div className="role-legend">
            <strong>{isProjects ? "PROJECT ROLES" : "EXPERIENCE ROLES"}</strong>
            <span>
              ◇<small>SOFTWARE</small>
            </span>
            <span>
              ✧<small>AI</small>
            </span>
            <span>
              ▤<small>DATA</small>
            </span>
            <span>
              ⌕<small>RESEARCH</small>
            </span>
          </div>
          <div className="selected-tray">
            <h2>{selected.name.toUpperCase()}</h2>
            <p>{selectedDescription}</p>
            {selectedDetailPath ? (
              <Link className="selected-tray__action" to={selectedDetailPath}>
                {isProjects ? "READ CASE STUDY" : "READ EXPERIENCE STORY"}{" "}
                <span aria-hidden="true">↗</span>
              </Link>
            ) : (
              <p className="selected-tray__status">
                {isProjects
                  ? "CASE STUDY IN DEVELOPMENT"
                  : "FULL EXPERIENCE STORY IN DEVELOPMENT"}
              </p>
            )}
            <div className="selected-tray__foot">
              SELECTED {isProjects ? "PROJECT" : "EXPERIENCE"}{" "}
              <strong>{selected.name.toUpperCase()}</strong>
            </div>
          </div>
          {source && (
            <a
              className="view-source"
              href={source}
              target="_blank"
              rel="noreferrer"
            >
              VIEW PROJECT <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </Client>
  );
}
