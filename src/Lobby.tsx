import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { experience, experienceIdentities, projectIdentities, projects } from "./data";
import { Client } from "./PortfolioLayout";
import { experienceStoryPaths, projectCasePaths, railProjects } from "./project-route-paths";
import "./lobby.css";

export type LobbyMode = "projects" | "experience" | "hackathons" | "education";

type RoleId = "software" | "ai" | "data" | "mobile" | "research";

type LobbyItem = {
  id: string;
  name: string;
  subtitle: string;
  role: string;
  selectedTitle?: string;
  selectedAward?: string;
  supportingDetail?: string;
  mark?: string;
  markAlt?: string;
  path?: string;
  source?: string;
  detail?: string;
  stack?: string;
  roles: RoleId[];
  badges?: { label: string; src: string }[];
  featured?: boolean;
  owner?: boolean;
  placeholder?: boolean;
};

const roleAssets: Record<RoleId, { label: string; src: string }> = {
  software: { label: "SOFTWARE", src: "/media/lobby/role-software.svg" },
  ai: { label: "AI", src: "/media/lobby/role-ai.svg" },
  data: { label: "DATA", src: "/media/lobby/role-data.svg" },
  mobile: { label: "MOBILE", src: "/media/lobby/role-mobile.svg" },
  research: { label: "RESEARCH", src: "/media/lobby/role-research.svg" },
};

const ownerItem: LobbyItem = {
  id: "joshua",
  name: "Joshua Aryeetey",
  subtitle: "Computer Engineering · Software",
  role: "PORTFOLIO OWNER",
  mark: "/media/lobby/profile-portrait-source.jpg",
  markAlt: "Joshua Aryeetey portrait",
  detail: "Computer Engineering · Software",
  roles: ["software", "research"],
  owner: true,
};

const projectsOwnerItem: LobbyItem = {
  ...ownerItem,
  mark: "/media/lobby/project-owner-j.svg",
  markAlt: "Portfolio J medallion",
};

const projectItems: LobbyItem[] = [
  {
    ...projects.find((project) => project.slug === "fraymakers")!,
    id: "fraymakers",
    subtitle: "Tournament automation · 2025",
    role: "SOFTWARE · DATA",
    mark: projectIdentities.fraymakers.mark,
    markAlt: projectIdentities.fraymakers.alt,
    path: projectCasePaths.fraymakers,
    source: projects.find((project) => project.slug === "fraymakers")?.source,
    detail: "Match metadata · configuration · thumbnail generation",
    roles: ["software", "data"],
  },
  {
    ...projects.find((project) => project.slug === "crest")!,
    id: "crest",
    subtitle: "MPC Hacks · 2026",
    role: "AI · DATA",
    mark: projectIdentities.crest.mark,
    markAlt: "Crest project mark",
    path: projectCasePaths.crest,
    source: projects.find((project) => project.slug === "crest")?.source,
    detail: "Expense intelligence · policy retrieval · review workflow",
    roles: ["ai", "data"],
  },
  projectsOwnerItem,
  {
    ...projects.find((project) => project.slug === "food-tracker")!,
    id: "food-tracker",
    subtitle: "Nutrition intelligence platform",
    role: "MOBILE · BACKEND",
    mark: projectIdentities["food-tracker"].mark,
    markAlt: "Food Tracker approved project mark",
    path: projectCasePaths["food-tracker"],
    source: projects.find((project) => project.slug === "food-tracker")?.source,
    detail: "Nutrition tracking · search · analytics",
    stack: "React Native · Node.js · PostgreSQL",
    roles: ["software", "mobile"],
    featured: true,
  },
  {
    ...projects.find((project) => project.slug === "choveigo")!,
    id: "choveigo",
    subtitle: "Evidence-first job matching",
    role: "AI · SOFTWARE",
    mark: projectIdentities.choveigo.mark,
    markAlt: "Cho’Veigo match-path mark",
    path: projectCasePaths.choveigo,
    source: projects.find((project) => project.slug === "choveigo")?.source,
    detail: "Role evidence · matching · human-reviewed decisions",
    roles: ["ai", "software"],
  },
];

const experienceItems: LobbyItem[] = [
  {
    id: "living-in-silico",
    name: experience[0].name,
    subtitle: "AI / ML Research Intern · Mar–Jun 2025",
    role: "AI · RESEARCH",
    mark: experienceIdentities["living-in-silico"].mark,
    markAlt: "Living in Silico logo",
    path: experienceStoryPaths["living-in-silico"],
    detail: "SMILES · RDKit · DeepMol · Fragmenstein",
    roles: ["ai", "research"],
  },
  ownerItem,
  {
    id: "stush-patties",
    name: experience[1].name,
    subtitle: "Software Engineering Intern · Sep–Nov 2025",
    role: "SOFTWARE · DATA",
    mark: experienceIdentities["stush-patties"].mark,
    markAlt: "Stush Patties logo",
    path: experienceStoryPaths["stush-patties"],
    detail: "Distributor inputs · normalized data · reporting handoff",
    roles: ["software", "data"],
  },
];

const hackathonItems: LobbyItem[] = [
  {
    id: "next-hackathon",
    name: "Coming Soon",
    subtitle: "Next hackathon build",
    role: "NEXT EVENT · TBD",
    detail: "Event details TBD",
    roles: [],
    placeholder: true,
  },
  ownerItem,
  {
    id: "crest-hackathon",
    name: "Crest",
    subtitle: "MPC Hacks · 2026",
    role: "3RD PLACE · BRIM FINANCIAL",
    selectedTitle: "Crest · MPC Hacks",
    selectedAward: "3rd Place · Brim Financial Challenge",
    mark: projectIdentities.crest.mark,
    markAlt: projectIdentities.crest.alt,
    path: projectCasePaths.crest,
    source: projects.find((project) => project.slug === "crest")?.source,
    detail: "4,235 demo/dev transactions",
    supportingDetail: "Policy engine · anomaly rules",
    roles: ["software", "ai", "data", "research"],
  },
];
const educationItems: LobbyItem[] = [
  {
    id: "computer-engineering",
    name: "Computer Engineering",
    subtitle: "Toronto Metropolitan University",
    role: "B.ENG. · EXPECTED 2028",
    mark: "/media/lobby/education-degree.svg",
    markAlt: "Computer Engineering degree emblem",
    detail: "B.Eng. · Software Specialization · Expected 2028",
    roles: [],
  },
  {
    ...ownerItem,
    roles: [],
    badges: [{ label: "SOFTWARE SPECIALIZATION", src: "/media/lobby/academic-software-specialization.svg" }],
  },
  {
    id: "coursework",
    name: "Selected Coursework",
    subtitle: "Four selected course titles",
    role: "4 SELECTED COURSES",
    mark: "/media/lobby/education-coursework.svg",
    markAlt: "Current coursework emblem",
    detail: "Algorithms & Data Structures",
    supportingDetail: "Software Systems · Database Systems I\nMicroprocessor Systems",
    roles: [],
    featured: true,
  },
];

const itemsForMode: Record<LobbyMode, LobbyItem[]> = {
  projects: projectItems,
  experience: experienceItems,
  hackathons: hackathonItems,
  education: educationItems,
};

const selectedByMode: Record<LobbyMode, string> = {
  projects: "food-tracker",
  experience: "living-in-silico",
  hackathons: "crest-hackathon",
  education: "coursework",
};

const copyByMode: Record<LobbyMode, { title: string; subtitle: string; itemLabel: string }> = {
  projects: {
    title: "PROJECTS · FEATURED",
    subtitle: "SELECT A PROJECT TO OPEN ITS CASE STUDY",
    itemLabel: "project",
  },
  experience: {
    title: "EXPERIENCE",
    subtitle: "PROFESSIONAL WORK · RESEARCH · DATA SYSTEMS",
    itemLabel: "experience",
  },
  hackathons: {
    title: "HACKATHONS",
    subtitle: "COMPETITION BUILDS · AWARDS · RAPID SHIPPING",
    itemLabel: "hackathon",
  },
  education: {
    title: "EDUCATION",
    subtitle: "DEGREE · COURSEWORK · SPECIALIZATION",
    itemLabel: "academic focus",
  },
};

const modeIcons: Record<LobbyMode, string> = {
  projects: "/media/profile/project-signal.svg",
  experience: "/media/profile/experience-signal.svg",
  hackathons: "/media/lobby/hackathon-trophy.svg",
  education: "/media/lobby/education-degree.svg",
};

function ModeHeading({ mode }: { mode: LobbyMode }) {
  const copy = copyByMode[mode];
  return (
    <div className="league-lobby__heading">
      <Link className="league-lobby__home" to="/home" aria-label="Back to portfolio home" title="Back to portfolio home">
        <span aria-hidden="true">←</span>
      </Link>
      <img src={modeIcons[mode]} width="28" height="28" alt="" aria-hidden="true" />
      <div>
        <h1>{copy.title}</h1>
        <p>{copy.subtitle}</p>
      </div>
    </div>
  );
}

function LobbyCard({
  item,
  mode,
  selected,
  onSelect,
}: {
  item: LobbyItem;
  mode: LobbyMode;
  selected: boolean;
  onSelect: () => void;
}) {
  const roleMarks = item.badges ?? item.roles.map((role) => roleAssets[role]);
  const roleSummary = [item.role, ...roleMarks.map((mark) => mark.label)].filter(Boolean).join(". ");
  const mark = item.mark;
  const instructionId = `lobby-card-instructions-${mode}-${item.id}`;
  const markFit = mark === "/media/lobby/profile-portrait-source.jpg"
    ? "league-banner__mark--portrait"
    : item.id === "living-in-silico" || item.id === "stush-patties"
      ? "league-banner__mark--contain"
      : "";
  const medallionFit = markFit ? "league-banner__medallion--fit-mark" : "";

  return (
    <button
      type="button"
      className={[
        "league-banner",
        selected ? "league-banner--selected" : "",
        item.owner ? "league-banner--owner" : "",
      ].filter(Boolean).join(" ")}
      aria-label={`Select ${item.name}`}
      aria-describedby={instructionId}
      aria-pressed={selected}
      onClick={onSelect}
    >
      <img className="league-banner__art" src="/media/lobby/banner-art.svg" alt="" aria-hidden="true" />
      <span className={`league-banner__medallion ${medallionFit}`}>
        {mode === "projects" && (
          <img className="league-banner__frame" src="/media/lobby/project-medallion-frame.png" alt="" aria-hidden="true" />
        )}
        {item.placeholder ? (
          <span className="league-banner__pending" aria-hidden="true">···</span>
        ) : mark ? (
          <img className={`league-banner__mark ${markFit}`} src={mark} alt={item.markAlt ?? ""} />
        ) : null}
      </span>
      <strong className="league-banner__name">{item.name}</strong>
      <span className="league-banner__subtitle">{item.subtitle}</span>
      <span className="league-banner__role">{item.role}</span>
      {roleMarks.length > 0 && (
        <span className="league-banner__roles">
          {roleMarks.slice(0, 2).map((mark) => (
            <img key={mark.label} src={mark.src} alt={mark.label} title={mark.label} />
          ))}
        </span>
      )}
      {selected && <span className="league-banner__selection-cap" aria-hidden="true" />}
      <span id={instructionId} className="visually-hidden">
        {roleSummary && `${roleSummary}. `}
        {mode === "education"
          ? "Press Enter or Space to select and review details below."
          : "Press Enter or Space to select. Use the action below to open."}
      </span>
      <span className="league-banner__mode-visually-hidden">{mode}</span>
    </button>
  );
}

function SourceMark() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M8 .7a7.3 7.3 0 0 0-2.31 14.23c.37.07.5-.16.5-.36v-1.4c-2.04.44-2.47-.86-2.47-.86-.33-.85-.81-1.08-.81-1.08-.67-.46.05-.45.05-.45.74.05 1.13.76 1.13.76.66 1.13 1.73.8 2.15.61.07-.48.26-.81.47-1-1.63-.19-3.34-.82-3.34-3.63 0-.8.29-1.46.76-1.97-.08-.19-.33-.93.07-1.95 0 0 .62-.2 2.01.75A7 7 0 0 1 8 4.1c.63 0 1.26.09 1.85.25 1.39-.95 2.01-.75 2.01-.75.4 1.02.15 1.76.08 1.95.47.51.75 1.17.75 1.97 0 2.82-1.71 3.44-3.35 3.62.27.23.5.67.5 1.35v2.05c0 .2.13.43.5.36A7.3 7.3 0 0 0 8 .7Z"
      />
    </svg>
  );
}

function SourceLink({ item }: { item: LobbyItem }) {
  if (!item.source) return null;
  return (
    <a
      className="league-lobby__source"
      href={item.source}
      target="_blank"
      rel="noreferrer"
      aria-label={`${item.name} source repository`}
      title={`${item.name} source repository`}
      onClick={(event) => event.stopPropagation()}
    >
      <SourceMark />
    </a>
  );
}

function SelectedTray({ item, mode }: { item: LobbyItem; mode: LobbyMode }) {
  const copy = copyByMode[mode];
  const actionLabel = mode === "experience" ? "VIEW EXPERIENCE" : mode === "hackathons" ? "VIEW HACKATHON" : mode === "education" ? "VIEW EDUCATION" : "VIEW PROJECT";
  const isProfile = item.owner;
  const actionPath = mode === "education" ? "/education/projects" : isProfile ? "/profile" : item.path;
  const selectedTrayClassName = [
    "league-selected",
    mode === "projects" ? "league-selected--projects" : "",
    item.selectedAward ? "league-selected--hackathons" : "",
  ].filter(Boolean).join(" ");

  return (
    <>
      <section className={selectedTrayClassName} aria-label={`Selected ${copy.itemLabel}`}>
        <img className="league-selected__art" src="/media/lobby/collapsible-tray.png" alt="" aria-hidden="true" />
        <div className="league-selected__main">
          <h2>{(item.selectedTitle ?? item.name).toUpperCase()}</h2>
          {item.selectedAward && <p className="league-selected__award">{item.selectedAward}</p>}
          <p>{item.detail ?? item.subtitle}</p>
          {item.supportingDetail && <p className="league-selected__supporting">{item.supportingDetail}</p>}
          {item.stack && <p className="league-selected__stack">{item.stack}</p>}
          {actionPath ? (
            <Link className="league-selected__story" to={actionPath}>
              {isProfile ? "OPEN PROFILE" : mode === "projects" ? "OPEN CASE STUDY" : actionLabel}
              <span aria-hidden="true">↗</span>
            </Link>
          ) : (
            <span className="league-selected__story league-selected__story--quiet">{item.role}</span>
          )}
        </div>
        <span className="league-selected__mark" aria-hidden="true">
          {item.mark && <img src={item.mark} alt="" />}
        </span>
        <SourceLink item={item} />
        <div className="league-selected__dock">
          <span>SELECTED {copy.itemLabel.toUpperCase()}</span>
          <strong>{item.name.toUpperCase()}</strong>
          <span aria-hidden="true">▾</span>
        </div>
      </section>
      {actionPath && (
        <Link className="league-lobby__primary-action" to={actionPath}>
          {isProfile ? "VIEW PROFILE" : actionLabel}
        </Link>
      )}
    </>
  );
}

function RoleLegend({ item, mode }: { item: LobbyItem; mode: LobbyMode }) {
  if (mode === "education") {
    const highlights = [
      { label: "EXPECTED 2028", src: "/media/lobby/academic-expected-2028.svg" },
      { label: "SOFTWARE SPECIALIZATION", src: "/media/lobby/academic-software-specialization.svg" },
    ];
    return (
      <div className="league-role-legend league-role-legend--education" role="group" aria-label="Academic highlights">
        <strong>ACADEMIC HIGHLIGHTS</strong>
        {highlights.map((highlight) => (
          <span className="league-role-legend__item" key={highlight.label}>
            <img src={highlight.src} alt="" aria-hidden="true" />
            <small>{highlight.label}</small>
          </span>
        ))}
      </div>
    );
  }

  const roles: RoleId[] = mode === "projects"
    ? ["software", "ai", "data", "mobile", "research"]
    : item.roles;
  if (!roles.length) return null;
  const title = mode === "hackathons" ? "HACKATHON ROLES" : mode === "experience" ? "EXPERIENCE ROLES" : "PROJECT ROLES";
  return (
    <div className={`league-role-legend${mode === "projects" ? " league-role-legend--projects" : ""}`}>
      <strong>{title}</strong>
      {roles.map((role) => (
        <span className="league-role-legend__item" key={role}>
          <img src={roleAssets[role].src} alt="" aria-hidden="true" />
          <small>{roleAssets[role].label}</small>
        </span>
      ))}
    </div>
  );
}

export default function Lobby({ mode }: { mode: LobbyMode }) {
  const items = itemsForMode[mode];
  const [selectedId, setSelectedId] = useState(selectedByMode[mode]);
  const selected = items.find((item) => item.id === selectedId) ?? items[0];

  useEffect(() => {
    setSelectedId(selectedByMode[mode]);
  }, [mode]);

  const isProjects = mode === "projects";
  return (
    <Client pageClass="main--lobby">
      <section className={`league-lobby league-lobby--${mode}`} aria-label={`${mode} lobby`}>
        <div className="league-lobby__environment" aria-hidden="true" />
        <ModeHeading mode={mode} />
        {mode !== "projects" && (
          <div className="league-lobby__balance-slots" aria-hidden="true">
            <span className="league-lobby__balance-slot league-lobby__balance-slot--left">+</span>
            <span className="league-lobby__balance-slot league-lobby__balance-slot--right">+</span>
          </div>
        )}
        <div className={[
          "league-lobby__banners",
          isProjects ? "league-lobby__banners--projects" : "",
        ].filter(Boolean).join(" ")}>
          {items.map((item) => (
            <LobbyCard
              key={item.id}
              item={item}
              mode={mode}
              selected={selected.id === item.id}
              onSelect={() => setSelectedId(item.id)}
            />
          ))}
        </div>
        <RoleLegend item={selected} mode={mode} />
        <SelectedTray item={selected} mode={mode} />
        <p className="league-lobby__hint">
          {mode === "education"
            ? "Select an entry to review its academic details below."
            : "Select an entry, then use the action in its tray to open the story."}
        </p>
      </section>
    </Client>
  );
}
