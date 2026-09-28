import { useEffect, useRef, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { experience } from "./data";
import { experienceStoryPaths, projectCasePaths, railProjects } from "./project-route-paths";
import { useHelpOverlay } from "./Help";

const headerUtilityAssets = [
  ["/media/lobby/shell-utility-flag.svg", "Flag"],
  ["/media/lobby/shell-utility-trophy.svg", "Trophy"],
  ["/media/lobby/shell-utility-briefcase.svg", "Briefcase"],
  ["/media/lobby/shell-utility-clash.svg", "Clash"],
  ["/media/lobby/shell-utility-clock.svg", "Clock"],
] as const;

function Header() {
  const { pathname } = useLocation();
  const section = pathname === "/" || pathname === "/home"
    ? "home"
    : pathname.startsWith("/experience")
    ? "experience"
    : pathname.startsWith("/hackathons")
      ? "hackathons"
      : pathname.startsWith("/education")
        ? "education"
        : pathname.startsWith("/resume")
          ? "resume"
          : "projects";
  return (
    <header className="header">
      <Link
        className={`brand${pathname === "/" || pathname === "/home" ? " brand--current" : ""}`}
        to="/home"
        aria-label="Portfolio home"
      >
        <img
          className="brand-glyph"
          src="/media/profile/topbar-client-emblem.svg"
          alt=""
          aria-hidden="true"
        />
        <strong>PORTFOLIO</strong>
      </Link>
      <nav className="top-nav" aria-label="Main navigation">
        <NavLink
          className={section === "projects" ? "current" : ""}
          to="/projects"
        >
          Projects
        </NavLink>
        <NavLink
          className={section === "experience" ? "current" : ""}
          to="/experience"
        >
          Experience
        </NavLink>
        <NavLink
          className={section === "hackathons" ? "current" : ""}
          to="/hackathons"
        >
          Hackathons
        </NavLink>
        <NavLink
          className={section === "education" ? "current" : ""}
          to="/education"
        >
          Education
        </NavLink>
        {section !== "home" && (
          <NavLink
            className={section === "resume" ? "current header-resume" : "header-resume"}
            to="/resume"
            state={pathname.startsWith("/resume") ? undefined : { from: pathname }}
          >
            Resume
          </NavLink>
        )}
      </nav>
      <div className="header-client-tools" aria-hidden="true">
        {headerUtilityAssets.map(([src, name]) => (
          <img key={name} src={src} alt="" />
        ))}
      </div>
      <div className="header-achievement" aria-label="Crest placed third in the Brim Financial Challenge">
        <span>CREST · BRIM FINANCIAL CHALLENGE</span>
        <strong>3RD PLACE</strong>
      </div>
      <div className="header-account-area">
        <Link
          className="header-account"
          to="/profile"
          aria-label="Open profile"
          aria-current={pathname.startsWith("/profile") ? "page" : undefined}
        >
          <span className="header-account__portrait">
            <img
              className="header-account__ring"
              src="/media/profile/topbar-account-ring.png"
              alt=""
              aria-hidden="true"
            />
            <img
              className="header-account__avatar"
              src="/media/profile/topbar-avatar.png"
              alt=""
              aria-hidden="true"
            />
          </span>
          <span className="header-account__details">
            <span className="header-account__name">Joshua Aryeetey</span>
            <span className="header-account__status">OPEN TO SUMMER 2027</span>
          </span>
        </Link>
      </div>
    </header>
  );
}

const projectRailMarks: Record<string, string | undefined> = {
  "food-tracker": "/media/profile/food-tracker-mark.svg",
  crest: "/media/profile/profile-crest-emblem.png",
  choveigo: "/media/choveigo-recommendations.png",
  fraymakers: "/media/lobby/project-fraymakers.svg",
};

function RailIdentity({ src }: { src?: string }) {
  return (
    <span className="rail-avatar" aria-hidden="true">
      {src && <img src={src} alt="" />}
    </span>
  );
}

function Rail() {
  const { pathname } = useLocation();
  const helpOverlay = useHelpOverlay();
  const focus = pathname.startsWith("/experience")
    ? {
        name: "Living in Silico",
        path: experienceStoryPaths["living-in-silico"],
        src: "/media/profile/living-in-silico-logo.png",
      }
    : pathname.startsWith("/hackathons")
      ? { name: "Crest", path: projectCasePaths.crest, src: "/media/lobby/hackathon-trophy.svg" }
      : pathname.startsWith("/education")
        ? { name: "Current Coursework", path: "/education", src: "/media/lobby/education-coursework.svg" }
        : {
            name: "Food Tracker",
            path: projectCasePaths["food-tracker"],
            src: projectRailMarks["food-tracker"]!,
          };
  return (
    <aside className="rail" aria-label="Portfolio index">
      <div className="rail-availability">
        <img
          className="rail-availability__mark"
          src="/media/profile/open-portfolio-j.svg"
          alt=""
          aria-hidden="true"
        />
        <div className="rail-party" aria-hidden="true">
          {["active", "active", "idle", "idle"].map((state, index) => (
            <span className={`rail-party__slot rail-party__slot--${state}`} key={index}>
              <i />
              <b />
            </span>
          ))}
        </div>
      </div>
      <div className="rail-content">
        <h2 className="rail-heading">
          <span>ACTIVITY</span>
          <span className="rail-heading__tools" aria-hidden="true">
            <img src="/media/lobby/activity-add.svg" alt="" />
            <img src="/media/lobby/activity-list.svg" alt="" />
            <img src="/media/lobby/activity-collapse.svg" alt="" />
          </span>
        </h2>
        <p className="rail-context">GENERAL {"\u00b7"} PORTFOLIO</p>
        <div className="rail-group">
          <h3>CURRENT FOCUS</h3>
          <Link className="rail-link rail-link--focus" to={focus.path}>
            <RailIdentity src={focus.src} />
            <span>{focus.name}</span>
          </Link>
        </div>
        <div className="rail-group">
          <h3>PROJECTS (4)</h3>
          {railProjects.map((item) => (
            <Link className="rail-link" key={item.slug} to={projectCasePaths[item.slug]}>
              <RailIdentity src={projectRailMarks[item.slug]} />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
        <div className="rail-group">
          <h3>EXPERIENCE (2)</h3>
          {experience.map((item) => {
            const storyPath = experienceStoryPaths[item.slug];
            const content = (
              <>
                <RailIdentity
                  src={
                    item.slug === "living-in-silico"
                      ? "/media/profile/living-in-silico-logo.png"
                      : "/media/profile/stush-patties-logo.png"
                  }
                />
                <span>{item.name}</span>
              </>
            );
            return storyPath ? (
              <Link className="rail-link" key={item.slug} to={storyPath}>
                {content}
              </Link>
            ) : (
              <div className="rail-item" key={item.slug}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
      <div className="rail-utilities" aria-label="Client utilities">
        {helpOverlay ? (
          <button className="rail-utility" type="button" aria-label="Open contextual help" onClick={helpOverlay.openHelp}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5.5h16v11H10l-5 3v-3.1H4z" />
            </svg>
          </button>
        ) : (
          <Link className="rail-utility" to="/help" state={{ returnTo: pathname }} aria-label="Open help">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 5.5h16v11H10l-5 3v-3.1H4z" />
            </svg>
          </Link>
        )}
        <span className="rail-utility" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="8" cy="9" r="3" />
            <circle cx="16" cy="9.5" r="2.5" />
            <path d="M3.5 18c.5-3 2-4.5 4.5-4.5s4 1.5 4.5 4.5M13 14c3.5-1 6.2.4 7 3.6" />
          </svg>
        </span>
        <span className="rail-utility" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <rect x="9" y="3" width="6" height="12" rx="3" />
            <path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21M8.5 21h7" />
          </svg>
        </span>
        <span className="rail-utility rail-utility--settings" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="7" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        </span>
      </div>
    </aside>
  );
}

export function Client({
  children,
  pageClass = "",
}: {
  children: ReactNode;
  pageClass?: string;
}) {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    mainRef.current?.focus();
  }, [pathname]);

  return (
    <div className="client">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <div className="client-body">
        <main
          id="main"
          ref={mainRef}
          tabIndex={-1}
          className={"main " + pageClass}
        >
          {children}
        </main>
        <Rail />
      </div>
    </div>
  );
}
