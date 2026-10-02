import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Project } from "./data";
import ProfileNav from "./ProfileNav";
import "./profile-overview.css";

type ProfileOverviewProps = {
  projects: Project[];
  projectCasePaths: Record<string, string>;
};

const projectOrder = ["food-tracker", "choveigo", "crest", "fraymakers"];

const projectDetails: Record<string, ReactNode> = {
  "food-tracker": <>Food tracking</>,
  choveigo: <>Resume tailoring</>,
  crest: (
    <>
      MPC Hacks 2026 · 3rd Place
      <br />
      Brim Financial Challenge
    </>
  ),
  fraymakers: <>Tournament automation</>,
};

const projectMarks: Record<string, { src: string; alt: string; wordmark?: boolean } | undefined> = {
  "food-tracker": {
    src: "/media/profile/food-tracker-mark.svg",
    alt: "Food Tracker project mark",
  },
  choveigo: {
    src: "/media/profile/choveigo-mark.svg",
    alt: "Cho’Veigo match-path project mark",
  },
  crest: {
    src: "/media/profile/profile-crest-emblem.png",
    alt: "Crest project mark",
  },
  fraymakers: {
    src: "/media/profile/fraymakers-logo.png",
    alt: "Fraymakers official wordmark",
    wordmark: true,
  },
};

const signals = [
  { id: "projects", label: "PROJECTS", value: "4", src: "/media/profile/project-signal.svg" },
  { id: "experience", label: "EXPERIENCE", value: "2", src: "/media/profile/experience-signal.svg" },
  { id: "hackathon", label: "HACKATHON", value: "1", src: "/media/profile/hackathon-signal.svg" },
  { id: "academics", label: "ACADEMICS", value: "2028", src: "/media/profile/academics-signal.svg" },
] as const;

type ProfileSignalId = (typeof signals)[number]["id"];

const experienceSignals = [
  {
    name: "Living in Silico",
    role: "AI/ML Research Intern",
    focus: "Generative Molecular Modeling",
    mark: "/media/profile/living-in-silico-logo.png",
    path: "/experience/living-in-silico",
  },
  {
    name: "Stush Patties",
    role: "Software Engineering Intern",
    focus: "Data Pipelines & Automation",
    mark: "/media/profile/stush-patties-logo.png",
    path: "/experience/stush-patties",
  },
] as const;

const selectedCoursework = [
  "Algorithms & Data Structures",
  "Software Systems",
  "Database Systems I",
  "Microprocessor Systems",
] as const;

function SourceMark() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
      className="profile-project__source-mark"
    >
      <path
        fill="currentColor"
        d="M8 .7a7.3 7.3 0 0 0-2.31 14.23c.37.07.5-.16.5-.36v-1.4c-2.04.44-2.47-.86-2.47-.86-.33-.85-.81-1.08-.81-1.08-.67-.46.05-.45.05-.45.74.05 1.13.76 1.13.76.66 1.13 1.73.8 2.15.61.07-.48.26-.81.47-1-1.63-.19-3.34-.82-3.34-3.63 0-.8.29-1.46.76-1.97-.08-.19-.33-.93.07-1.95 0 0 .62-.2 2.01.75A7 7 0 0 1 8 4.1c.63 0 1.26.09 1.85.25 1.39-.95 2.01-.75 2.01-.75.4 1.02.15 1.76.08 1.95.47.51.75 1.17.75 1.97 0 2.82-1.71 3.44-3.35 3.62.27.23.5.67.5 1.35v2.05c0 .2.13.43.5.36A7.3 7.3 0 0 0 8 .7Z"
      />
    </svg>
  );
}

function TraitMedallion({
  label,
  parts,
  frameSrc = "/media/profile/portrait-medallion.png",
}: {
  label: string;
  parts: { src: string; className: string }[];
  frameSrc?: string;
}) {
  return (
    <li className="profile-trait">
      <span className="profile-trait__medallion" aria-hidden="true">
        <img
          className="profile-trait__frame"
          src={frameSrc}
          alt=""
        />
        {parts.map((part) => (
          <img
            className={`profile-trait__vector ${part.className}`}
            src={part.src}
            alt=""
            key={part.src}
          />
        ))}
      </span>
      <span className="profile-trait__label">{label}</span>
    </li>
  );
}

const baseTraitParts = [
  {
    src: "/media/profile/trait-creative-a.svg",
    className: "profile-trait__base-ring",
  },
  {
    src: "/media/profile/trait-creative-b.svg",
    className: "profile-trait__base-detail",
  },
];

const traitParts = {
  creative: [
    ...baseTraitParts,
    {
      src: "/media/profile/trait-creative-c.svg",
      className: "profile-trait__creative-c",
    },
    {
      src: "/media/profile/trait-creative-d.svg",
      className: "profile-trait__creative-d",
    },
    {
      src: "/media/profile/trait-proactive-a.svg",
      className: "profile-trait__creative-e",
    },
  ],
  proactive: [
    ...baseTraitParts,
    {
      src: "/media/profile/trait-proactive-b.svg",
      className: "profile-trait__proactive-c",
    },
    {
      src: "/media/profile/trait-proactive-c.svg",
      className: "profile-trait__proactive-d",
    },
    {
      src: "/media/profile/trait-proactive-d.svg",
      className: "profile-trait__proactive-e",
    },
    {
      src: "/media/profile/trait-execution-a.svg",
      className: "profile-trait__proactive-f",
    },
  ],
  execution: [
    ...baseTraitParts,
    {
      src: "/media/profile/trait-execution-b.svg",
      className: "profile-trait__execution-c",
    },
    {
      src: "/media/profile/trait-execution-c.svg",
      className: "profile-trait__execution-d",
    },
  ],
};

const journeyBaseTraitParts = [
  {
    src: "/media/profile/journey-trait-shared-shell.svg",
    className: "journey-trait__outer",
  },
  {
    src: "/media/profile/trait-creative-b.svg",
    className: "journey-trait__inner",
  },
];

const journeyTraitParts = {
  creative: [
    {
      src: "/media/profile/journey-trait-creative-shell.svg",
      className: "journey-trait__outer",
    },
    journeyBaseTraitParts[1],
    {
      src: "/media/profile/trait-creative-c.svg",
      className: "journey-trait__creative-bulb",
    },
    {
      src: "/media/profile/trait-creative-d.svg",
      className: "journey-trait__creative-base",
    },
    {
      src: "/media/profile/trait-proactive-a.svg",
      className: "journey-trait__creative-rays",
    },
  ],
  proactive: [
    ...journeyBaseTraitParts,
    {
      src: "/media/profile/trait-proactive-b.svg",
      className: "journey-trait__proactive-compass",
    },
    {
      src: "/media/profile/trait-proactive-d.svg",
      className: "journey-trait__proactive-needle",
    },
    {
      src: "/media/profile/trait-proactive-c.svg",
      className: "journey-trait__proactive-center",
    },
    {
      src: "/media/profile/trait-execution-a.svg",
      className: "journey-trait__proactive-orbit",
    },
  ],
  execution: [
    ...journeyBaseTraitParts,
    {
      src: "/media/profile/trait-execution-b.svg",
      className: "journey-trait__execution-mark",
    },
    {
      src: "/media/profile/trait-execution-c.svg",
      className: "journey-trait__execution-check",
    },
  ],
};

export function JourneyTraitMedallions() {
  const frameSrc = "/media/lobby/project-medallion-frame.png";
  return (
    <ul className="journey-identity__traits" aria-label="Profile traits">
      <TraitMedallion label="CREATIVE" parts={journeyTraitParts.creative} frameSrc={frameSrc} />
      <TraitMedallion label="PROACTIVE" parts={journeyTraitParts.proactive} frameSrc={frameSrc} />
      <TraitMedallion label="EXECUTION" parts={journeyTraitParts.execution} frameSrc={frameSrc} />
    </ul>
  );
}

function ProjectSignalPanel({
  projects,
  projectCasePaths,
}: {
  projects: Project[];
  projectCasePaths: Record<string, string>;
}) {
  const featuredProjects = projectOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));

  return (
    <div className="profile-project-grid" role="list">
      {featuredProjects.map((project) => {
        const mark = projectMarks[project.slug];
        const path = projectCasePaths[project.slug];
        const content = (
          <>
            <span className="profile-project__identity">
              {mark && <img className="profile-project__mark" src={mark.src} alt={mark.alt} />}
              {!mark?.wordmark && <span>{project.name}</span>}
            </span>
            <span className="profile-project__detail">
              {projectDetails[project.slug] ?? project.detail}
            </span>
          </>
        );

        return (
          <article className={`profile-project profile-project--${project.slug}`} key={project.slug} role="listitem">
            {path ? (
              <Link className="profile-project__open" to={path} aria-label={`Open ${project.name} case study`}>
                {content}
              </Link>
            ) : (
              <div className="profile-project__open">{content}</div>
            )}
            {project.source && (
              <a
                className="profile-project__source"
                href={project.source}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${project.name} source repository`}
                title={`${project.name} source repository`}
              >
                <SourceMark />
              </a>
            )}
          </article>
        );
      })}
    </div>
  );
}

function ProfileSignalPanel({
  signal,
  projects,
  projectCasePaths,
}: {
  signal: ProfileSignalId;
  projects: Project[];
  projectCasePaths: Record<string, string>;
}) {
  const title = signal.toUpperCase();
  return (
    <section className={`profile-project-panel profile-project-panel--${signal}`} aria-labelledby="profile-panel-heading">
      <img className="profile-project-panel__enclosure" src="/media/profile/profile-enclosure.svg" alt="" aria-hidden="true" />
      <h2 id="profile-panel-heading">{title}</h2>
      <img className="profile-project-panel__divider" src="/media/profile/profile-title-divider.png" alt="" aria-hidden="true" />

      {signal === "projects" && (
        <ProjectSignalPanel projects={projects} projectCasePaths={projectCasePaths} />
      )}

      {signal === "experience" && (
        <div className="profile-experience-grid" aria-label="Two professional experiences">
          {experienceSignals.map((item) => (
            <Link className="profile-experience" to={item.path} key={item.name}>
              <img className="profile-experience__mark" src={item.mark} alt="" />
              <span className="profile-experience__copy">
                <strong className="profile-experience__name">{item.name}</strong>
                <span className="profile-experience__role">{item.role}</span>
                <span className="profile-experience__focus">{item.focus}</span>
              </span>
            </Link>
          ))}
        </div>
      )}

      {signal === "hackathon" && (
        <div className="profile-hackathon-feature">
          <div className="profile-hackathon-feature__result">
            <strong className="profile-hackathon-feature__placement">3RD PLACE</strong>
            <span className="profile-hackathon-feature__event">MPC HACKS 2026</span>
            <span className="profile-hackathon-feature__challenge">BRIM FINANCIAL CHALLENGE</span>
          </div>
          <div className="profile-hackathon-feature__project">
            <img src="/media/profile/profile-crest-emblem.png" alt="" />
            <Link to={projectCasePaths.crest ?? "/projects/crest"}>Crest</Link>
            <span className="profile-hackathon-feature__year">MPC HACKS 2026</span>
          </div>
        </div>
      )}

      {signal === "academics" && (
        <div className="profile-academics-feature">
          <div>
            <span className="profile-academics-feature__eyebrow">EDUCATION</span>
            <strong className="profile-academics-feature__program">Computer Engineering</strong>
            <span className="profile-academics-feature__specialization">Software Specialization</span>
            <span className="profile-academics-feature__school">Toronto Metropolitan University</span>
            <div className="profile-academics-feature__graduation">
              <strong className="profile-academics-feature__year">2028</strong>
              <span className="profile-academics-feature__graduation-label">EXPECTED GRADUATION</span>
            </div>
          </div>
          <div>
            <span className="profile-academics-feature__eyebrow">SELECTED COURSEWORK</span>
            <ul className="profile-academics-feature__course-list">
              {selectedCoursework.map((course) => <li key={course}>{course}</li>)}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}

export default function ProfileOverview({
  projects,
  projectCasePaths,
}: ProfileOverviewProps) {
  const [hoveredSignal, setHoveredSignal] = useState<ProfileSignalId | null>(null);
  const [focusedSignal, setFocusedSignal] = useState<ProfileSignalId | null>(null);
  const displayedSignal = hoveredSignal ?? focusedSignal ?? "projects";
  return (
    <div className="profile-layout">
      <aside className="identity-panel" aria-label="Joshua Aryeetey profile">
        <div className="identity-panel__readability" aria-hidden="true" />
        <img
          className="identity-panel__banner"
          src="/media/profile/trials-of-twilight-banner.png"
          alt=""
          aria-hidden="true"
        />
        <div className="identity-panel__portrait">
          <img
            className="identity-portrait"
            src="/media/profile/owner-portrait.png"
            alt="Joshua Aryeetey"
            width={156}
            height={156}
          />
          <img
            className="identity-panel__portrait-frame"
            src="/media/profile/portrait-medallion.png"
            alt=""
            aria-hidden="true"
          />
        </div>
        <h1>JOSHUA ARYEETEY</h1>
        <div className="identity-panel__discipline">
          <p>COMPUTER ENGINEERING</p>
          <p>SOFTWARE · AI / ML</p>
        </div>
        <div className="identity-panel__degree" aria-label="Computer Engineering">
          <img src="/media/profile/portrait-medallion.png" alt="" aria-hidden="true" />
          <span aria-hidden="true">CE</span>
        </div>
        <div className="identity-panel__divider" aria-hidden="true" />
        <ul className="identity-traits" aria-label="Profile traits">
          <TraitMedallion label="CREATIVE" parts={traitParts.creative} />
          <TraitMedallion label="PROACTIVE" parts={traitParts.proactive} />
          <TraitMedallion label="EXECUTION" parts={traitParts.execution} />
        </ul>
      </aside>

      <div className="profile-content">
        <ProfileNav />
        <div
          className="profile-overview"
          onMouseLeave={() => setHoveredSignal(null)}
          onBlurCapture={(event) => {
            const next = event.relatedTarget;
            if (!(next instanceof Node) || !event.currentTarget.contains(next)) setFocusedSignal(null);
          }}
        >
          <ProfileSignalPanel
            signal={displayedSignal}
            projects={projects}
            projectCasePaths={projectCasePaths}
          />

          <div className="profile-signal-grid" role="group" aria-label="Profile summary details">
            {signals.map((signal) => (
              <button
                className={`profile-signal${
                  hoveredSignal === signal.id || focusedSignal === signal.id
                    ? " profile-signal--preview"
                    : !hoveredSignal && !focusedSignal && signal.id === "projects"
                      ? " profile-signal--selected"
                      : ""
                }`}
                type="button"
                key={signal.id}
                aria-label={`${signal.label}, ${signal.value}. Focus to preview ${signal.label.toLowerCase()} details.`}
                onMouseEnter={() => setHoveredSignal(signal.id)}
                onFocus={() => {
                  setFocusedSignal(signal.id);
                  setHoveredSignal(null);
                }}
              >
                <img className="profile-signal__emblem" src={signal.src} alt="" />
                <span className="profile-signal__label">{signal.label}</span>
                <span className="profile-signal__value">{signal.value}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
