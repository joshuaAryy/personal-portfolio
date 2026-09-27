import { Link } from "react-router-dom";
import type { Project } from "./data";
import ProfileNav from "./ProfileNav";
import "./profile-overview.css";

const projectOrder = ["food-tracker", "choveigo", "crest", "fraymakers"];
const profileSummaries: Record<string, string> = {
  "food-tracker": "Food tracking",
};

type ProfileOverviewProps = {
  projects: Project[];
  projectCasePaths: Record<string, string>;
};

function ProjectGlyph({ slug }: { slug: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" focusable="false">
      {slug === "food-tracker" && (
        <>
          <circle cx="32" cy="32" r="19" />
          <path d="M20 37c5-2 10-2 15 0 3 1 6 1 9 0M25 25c3 3 5 6 7 10m8-13c-1 4-3 7-6 10" />
          <circle cx="32" cy="32" r="4" />
        </>
      )}
      {slug === "crest" && (
        <>
          <path d="M17 47h30M21 39h22M25 31h14M29 23h6M32 17v34" />
          <circle cx="32" cy="17" r="3" />
        </>
      )}
      {slug === "choveigo" && (
        <>
          <path d="m19 22 13 10 14-12M19 22l4 22 23-2M32 32l-9 12m9-12 14 10" />
          <circle cx="19" cy="22" r="4" />
          <circle cx="46" cy="20" r="4" />
          <circle cx="32" cy="32" r="4" />
          <circle cx="23" cy="44" r="4" />
          <circle cx="46" cy="42" r="4" />
        </>
      )}
      {slug === "fraymakers" && (
        <>
          <path d="M14 22h10l4 8 8-15 5 13h9M14 42h8l5-8 6 14 7-12 4 6h6" />
          <circle cx="14" cy="22" r="2" />
          <circle cx="50" cy="22" r="2" />
          <circle cx="14" cy="42" r="2" />
          <circle cx="50" cy="42" r="2" />
        </>
      )}
    </svg>
  );
}

function SignalGlyph({ kind }: { kind: "projects" | "experience" | "hackathon" | "academics" }) {
  switch (kind) {
    case "projects":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
          <path d="m24 6 17 18-17 18L7 24 24 6Z" />
          <path d="M24 6v36M7 24h34M15 15l18 18m0-18L15 33" />
        </svg>
      );
    case "experience":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
          <path d="M9 38V10m0 28h30M15 32l8-9 6 5 10-14" />
          <circle cx="15" cy="32" r="2.5" />
          <circle cx="23" cy="23" r="2.5" />
          <circle cx="29" cy="28" r="2.5" />
          <circle cx="39" cy="14" r="2.5" />
        </svg>
      );
    case "hackathon":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
          <path d="m24 5 4.6 12.4L41 22l-12.4 4.6L24 39l-4.6-12.4L7 22l12.4-4.6L24 5Z" />
          <path d="M36 32v10m-24-10v10M12 37h24" />
        </svg>
      );
    case "academics":
      return (
        <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
          <path d="M24 14c-5-4-11-4-17-2v24c6-2 12-2 17 2m0-24c5-4 11-4 17-2v24c-6-2-12-2-17 2V14Z" />
          <path d="M12 19c3-.6 6-.2 9 1m-9 5c3-.6 6-.2 9 1m15-7c-3-.6-6-.2-9 1m9 5c-3-.6-6-.2-9 1" />
        </svg>
      );
  }
}

const signals = [
  { label: "PROJECTS", value: "4", kind: "projects" },
  { label: "EXPERIENCE", value: "2", kind: "experience" },
  { label: "HACKATHON", value: "1", kind: "hackathon" },
  { label: "ACADEMICS", value: "2028", kind: "academics" },
] as const;

export default function ProfileOverview({ projects, projectCasePaths }: ProfileOverviewProps) {
  const featuredProjects = projectOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

  return (
    <div className="profile-layout">
      <aside className="identity-panel">
        <img
          className="identity-portrait"
          src="/media/profile-owner-portrait.png"
          alt=""
          width={156}
          height={156}
        />
        <h1>JOSHUA ARYEETEY</h1>
        <p>COMPUTER ENGINEERING</p>
        <p>SOFTWARE · AI / ML</p>
        <ul className="identity-traits" aria-label="Profile traits">
          <li><span aria-hidden="true">✧</span><small>CREATIVE</small></li>
          <li><span aria-hidden="true">➤</span><small>PROACTIVE</small></li>
          <li><span aria-hidden="true">◇</span><small>EXECUTION</small></li>
        </ul>
      </aside>
      <div className="profile-content">
        <ProfileNav />
        <div className="profile-overview">
          <section className="profile-project-panel" aria-labelledby="profile-projects-heading">
            <header className="profile-project-panel__header">
              <div>
                <p>SELECTED WORK</p>
                <h2 id="profile-projects-heading">PROJECTS</h2>
              </div>
              <span aria-hidden="true">04</span>
            </header>
            <div className="profile-project-grid">
              {featuredProjects.map((project) => (
                <article className="profile-project-card" key={project.slug}>
                  <span className={`profile-project-stamp profile-project-stamp--${project.slug}`}>
                    <ProjectGlyph slug={project.slug} />
                  </span>
                  <strong>{project.name}</strong>
                  <span className="profile-project-card__summary">
                    {profileSummaries[project.slug] ?? project.short}
                  </span>
                  <div className="profile-project-card__links" role="group" aria-label={`${project.name} links`}>
                    {projectCasePaths[project.slug] && (
                      <Link to={projectCasePaths[project.slug]} aria-label={`Read the ${project.name} case study`}>
                        CASE STUDY <span aria-hidden="true">↗</span>
                      </Link>
                    )}
                    {project.source && (
                      <a href={project.source} target="_blank" rel="noreferrer" aria-label={`View the ${project.name} source repository`}>
                        SOURCE <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </section>
          <dl className="profile-signal-grid" aria-label="Portfolio facts">
            {signals.map((signal) => (
              <div className="profile-signal" key={signal.label}>
                <span className={`profile-signal__medallion profile-signal__medallion--${signal.kind}`}>
                  <SignalGlyph kind={signal.kind} />
                </span>
                <dt>{signal.label}</dt>
                <dd>{signal.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
