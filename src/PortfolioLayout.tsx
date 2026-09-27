import { useEffect, useRef, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { experience } from "./data";
import { experienceStoryPaths, projectCasePaths, railProjects } from "./project-route-paths";
import JMark from "./identity/JMark";

export function Mark({ small = false }: { small?: boolean }) {
  return (
    <span className={"mark" + (small ? " mark--small" : "")} aria-hidden="true">
      <span>{"\u25c6"}</span>
    </span>
  );
}

function Header() {
  const { pathname } = useLocation();
  const section =
    pathname === "/help"
      ? null
      : pathname.startsWith("/resume")
        ? "resume"
        : pathname.startsWith("/experience")
          ? "experience"
          : pathname.startsWith("/profile")
            ? "profile"
            : "projects";
  return (
    <header className="header">
      <Link className="brand" to="/projects" aria-label="Portfolio home">
        <JMark variant="ringed" decorative className="brand-glyph" />
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
          className={section === "profile" ? "current" : ""}
          to="/profile"
        >
          Profile
        </NavLink>
        <NavLink
          className={section === "resume" ? "current header-resume" : "header-resume"}
          to="/resume"
          state={pathname.startsWith("/resume") ? undefined : { from: pathname }}
        >
          Resume
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `header-help${isActive ? " current" : ""}`
          }
          to="/help"
        >
          Help
        </NavLink>
      </nav>
      <span className="header-name">
        JOSHUA ARYEETEY<small>PORTFOLIO</small>
      </span>
    </header>
  );
}

function Rail() {
  return (
    <aside className="rail" aria-label="Portfolio index">
      <div className="rail-availability">
        <Mark small />
        <span>
          <strong>OPEN TO OPPORTUNITIES</strong>
          <small>Summer 2027 {"\u00b7"} Toronto / Remote</small>
        </span>
      </div>
      <div className="rail-content">
        <h2>ACTIVITY</h2>
        <p className="rail-context">GENERAL {"\u00b7"} PORTFOLIO</p>
        <div className="rail-group">
          <h3>CURRENT FOCUS</h3>
          <a
            href="https://github.com/joshuaAryy/food-tracker"
            target="_blank"
            rel="noreferrer"
          >
            <Mark small />
            <span>
              Food Tracker<small>VIEW SOURCE REPOSITORY</small>
            </span>
          </a>
        </div>
        <div className="rail-group">
          <h3>PROJECTS (4)</h3>
          {railProjects.map((item) =>
            projectCasePaths[item.slug] ? (
              <Link key={item.slug} to={projectCasePaths[item.slug]}>
                <Mark small />
                <span>
                  {item.name}
                  <small>CASE STUDY</small>
                </span>
              </Link>
            ) : (
              <div className="rail-item" key={item.slug}>
                <Mark small />
                <span>
                  {item.name}
                  <small>CASE STUDY IN DEVELOPMENT</small>
                </span>
              </div>
            ),
          )}
        </div>
        <div className="rail-group">
          <h3>EXPERIENCE (2)</h3>
          {experience.map((item) => {
            const storyPath = experienceStoryPaths[item.slug];
            const content = (
              <>
                <Mark small />
                <span>
                  {item.name}
                  <small>{storyPath ? "EXPERIENCE STORY" : "STORY IN DEVELOPMENT"}</small>
                </span>
              </>
            );
            return storyPath ? (
              <Link key={item.slug} to={storyPath}>
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
      <Link className="rail-help" to="/help">
        HELP {"\u00b7"} PORTFOLIO GUIDE
      </Link>
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
