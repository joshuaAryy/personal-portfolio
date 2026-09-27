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

const projectMarks: Record<string, { src: string; alt: string } | undefined> = {
  "food-tracker": {
    src: "/media/profile/food-tracker-mark.svg",
    alt: "Food Tracker project mark",
  },
  crest: {
    src: "/media/profile/profile-crest-emblem.png",
    alt: "Crest project mark",
  },
};

const signals = [
  {
    label: "PROJECTS",
    value: "4",
    src: "/media/profile/project-signal.svg",
  },
  {
    label: "EXPERIENCE",
    value: "2",
    src: "/media/profile/experience-signal.svg",
  },
  {
    label: "HACKATHON",
    value: "1",
    src: "/media/profile/hackathon-signal.svg",
  },
  {
    label: "ACADEMICS",
    value: "2028",
    src: "/media/profile/academics-signal.svg",
  },
] as const;

const experienceStories = [
  {
    slug: "living-in-silico",
    name: "Living in Silico",
    role: "AI/ML Research Intern",
    focus: "Generative Molecular Modeling",
    logo: "/media/profile/living-in-silico-logo.png",
    path: "/experience/living-in-silico",
  },
  {
    slug: "stush-patties",
    name: "Stush Patties",
    role: "Software Engineering Intern",
    focus: "Data Pipelines & Automation",
    logo: "/media/profile/stush-patties-logo.png",
    path: "/experience/stush-patties",
  },
] as const;

type ProfileSection = "projects" | "experience" | "hackathon" | "academics";

const sectionTitles: Record<ProfileSection, string> = {
  projects: "PROJECTS",
  experience: "EXPERIENCE",
  hackathon: "HACKATHON",
  academics: "ACADEMICS",
};

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
}: {
  label: string;
  parts: { src: string; className: string }[];
}) {
  return (
    <li className="profile-trait">
      <span className="profile-trait__medallion" aria-hidden="true">
        <img
          className="profile-trait__frame"
          src="/media/profile/portrait-medallion.png"
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

export default function ProfileOverview({
  projects,
  projectCasePaths,
}: ProfileOverviewProps) {
  const featuredProjects = projectOrder
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is Project => Boolean(project));
  const [activeSection, setActiveSection] = useState<ProfileSection>("projects");

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
        <div className="profile-overview">
          <section
            className={`profile-project-panel profile-project-panel--${activeSection}`}
            role="tabpanel"
            aria-labelledby={`profile-tab-${activeSection}`}
            id="profile-section-panel"
          >
            <img
              className="profile-project-panel__enclosure"
              src="/media/profile/profile-enclosure.svg"
              alt=""
              aria-hidden="true"
            />
            <h2 id="profile-panel-heading">{sectionTitles[activeSection]}</h2>
            <img
              className="profile-project-panel__divider"
              src="/media/profile/profile-title-divider.png"
              alt=""
              aria-hidden="true"
            />
            {activeSection === "projects" && (
              <div className="profile-project-grid" role="list">
                {featuredProjects.map((project) => {
                  const mark = projectMarks[project.slug];
                  const path = projectCasePaths[project.slug];

                  return (
                    <article className={`profile-project profile-project--${project.slug}`} key={project.slug} role="listitem">
                      {path ? (
                        <Link
                          className="profile-project__open"
                          to={path}
                          aria-label={`Open ${project.name} case study`}
                        >
                          <span className="profile-project__identity">
                            {mark && <img className="profile-project__mark" src={mark.src} alt={mark.alt} />}
                            <span>{project.name}</span>
                          </span>
                          <span className="profile-project__detail">
                            {projectDetails[project.slug] ?? project.detail}
                          </span>
                        </Link>
                      ) : (
                        <div className="profile-project__open">
                          <span className="profile-project__identity">
                            {mark && <img className="profile-project__mark" src={mark.src} alt={mark.alt} />}
                            <span>{project.name}</span>
                          </span>
                          <span className="profile-project__detail">
                            {projectDetails[project.slug] ?? project.detail}
                          </span>
                        </div>
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
            )}

            {activeSection === "experience" && (
              <div className="profile-experience-grid">
                {experienceStories.map((story) => (
                  <Link className="profile-experience" to={story.path} key={story.slug}>
                    <img className="profile-experience__mark" src={story.logo} alt="" />
                    <span className="profile-experience__copy">
                      <span className="profile-experience__name">{story.name}</span>
                      <span className="profile-experience__role">{story.role}</span>
                      <span className="profile-experience__focus">{story.focus}</span>
                    </span>
                  </Link>
                ))}
              </div>
            )}

            {activeSection === "hackathon" && (
              <div className="profile-hackathon-feature">
                <div className="profile-hackathon-feature__result">
                  <span className="profile-hackathon-feature__placement">3RD PLACE</span>
                  <span className="profile-hackathon-feature__event">BRIM FINANCIAL CHALLENGE</span>
                </div>
                <div className="profile-hackathon-feature__project">
                  <img src="/media/profile/profile-crest-emblem.png" alt="" />
                  {projectCasePaths.crest ? (
                    <Link to={projectCasePaths.crest}>CREST</Link>
                  ) : (
                    <span>CREST</span>
                  )}
                  <span className="profile-hackathon-feature__year">MPC HACKS 2026</span>
                </div>
              </div>
            )}

            {activeSection === "academics" && (
              <div className="profile-academics-feature">
                <div>
                  <span className="profile-academics-feature__program">COMPUTER ENGINEERING</span>
                  <span className="profile-academics-feature__specialization">Software Specialization</span>
                  <span className="profile-academics-feature__school">Toronto Metropolitan University</span>
                </div>
                <div className="profile-academics-feature__recognition">
                  <span className="profile-academics-feature__eyebrow">ACADEMIC RECOGNITION</span>
                  <span className="profile-academics-feature__award">Dean’s List</span>
                  <span className="profile-academics-feature__award-detail">Merit-based Academic Scholarship</span>
                </div>
              </div>
            )}
          </section>

          <div className="profile-signal-grid" role="tablist" aria-label="Profile overview sections">
            {signals.map((signal) => {
              const section = signal.label.toLowerCase() as ProfileSection;
              const selected = activeSection === section;

              return (
              <button
                className={`profile-signal${selected ? " profile-signal--active" : ""}`}
                key={signal.label}
                type="button"
                role="tab"
                id={`profile-tab-${section}`}
                aria-selected={selected}
                aria-controls="profile-section-panel"
                onClick={() => setActiveSection(section)}
              >
                <img className="profile-signal__emblem" src={signal.src} alt="" />
                <span className="profile-signal__label">{signal.label}</span>
                <span className="profile-signal__value">{signal.value}</span>
              </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
