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

const usesProjectDetailShell = (pathname: string) =>
  pathname.startsWith("/projects") || pathname.startsWith("/experience/");

const isExperienceDetail = (pathname: string) => pathname.startsWith("/experience/");
const isProjectDetail = (pathname: string) => pathname.startsWith("/projects/");

function Header() {
  const { pathname } = useLocation();
  const isHome = pathname === "/" || pathname === "/home";
  const isProjectShell = usesProjectDetailShell(pathname);
  const isResumeShell = pathname.startsWith("/resume");
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
    <header className={`header${isProjectShell ? " header--project-shell" : ""}${isResumeShell ? " header--resume-shell" : ""}`}>
      <Link
        className={`brand${isHome ? " brand--current" : ""}${isProjectShell ? " brand--project-shell" : ""}${isResumeShell ? " brand--resume-shell" : ""}`}
        to="/home"
        aria-label="Portfolio home"
      >
        <picture className="brand-glyph-frame">
          <source
            media="(max-width: 760px)"
            srcSet="/media/profile/open-portfolio-j-small-32.svg"
          />
          <img
            className="brand-glyph"
            src="/media/profile/open-portfolio-j-small-54.svg"
            alt=""
            aria-hidden="true"
            data-node-id="3289:157"
          />
        </picture>
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
        {section !== "home" && !isResumeShell && (
          <NavLink
            className={section === "resume" ? "current header-resume" : "header-resume"}
            to="/resume"
            state={pathname.startsWith("/resume") ? undefined : { from: pathname }}
          >
            Resume
          </NavLink>
        )}
      </nav>
      {!isProjectShell && (
        <div className="header-client-tools" aria-hidden="true">
          {headerUtilityAssets.map(([src, name]) => (
            <span className="header-client-tool" key={name}>
              <img src={src} alt="" />
            </span>
          ))}
        </div>
      )}
      {!isProjectShell && (
        <div
          className="header-achievement"
          aria-label="Expected graduation 2028; third place in the Brim Financial Challenge"
        >
          <span>2028</span>
          <strong>3RD</strong>
        </div>
      )}
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
              src={isProjectShell ? "/media/lobby/client-j-mark.svg" : "/media/lobby/client-account-avatar.png"}
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
  fraymakers: "/media/lobby/project-fraymakers-index.png",
};

function RailIdentity({ src, className = "" }: { src?: string; className?: string }) {
  return (
    <span className={["rail-avatar", className].filter(Boolean).join(" ")} aria-hidden="true">
      {src && <img src={src} alt="" />}
    </span>
  );
}

function Rail() {
  const { pathname } = useLocation();
  const helpOverlay = useHelpOverlay();
  const isHome = pathname === "/" || pathname === "/home";
  const isProjectShell = usesProjectDetailShell(pathname);
  const isResumeShell = pathname.startsWith("/resume");
  const isPortfolioSummary = isHome || isResumeShell;
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
      <div className={`rail-availability${isPortfolioSummary ? " rail-availability--focus" : ""}${isProjectShell ? " rail-availability--opportunities" : ""}`}>
        {isPortfolioSummary ? (
          <>
            <strong className="rail-availability__eyebrow">CURRENT FOCUS</strong>
            <Link className="rail-availability__focus-link" to={projectCasePaths["food-tracker"]}>
              <RailIdentity src={projectRailMarks["food-tracker"]} className="rail-avatar--focus" />
              <span>
                <strong>Food Tracker</strong>
                <small>IN DEVELOPMENT</small>
              </span>
            </Link>
          </>
        ) : isProjectShell ? (
          <>
            <img
              className="rail-availability__mark"
              src="/media/lobby/client-j-mark.svg"
              alt=""
              aria-hidden="true"
              data-node-id="2252:3450"
            />
            <span className="rail-availability__copy">
              <strong>OPEN TO OPPORTUNITIES</strong>
              <small>{"Summer 2027 \u00b7 Toronto / Remote"}</small>
            </span>
          </>
        ) : (
          <>
        <span className="rail-availability__mark-frame" aria-hidden="true">
          <img
            className="rail-availability__mark-image"
            src="/media/profile/open-portfolio-j-small-48.svg"
            alt=""
            data-node-id="3317:4"
          />
        </span>
        <div className="rail-party" aria-hidden="true">
          {["active", "active", "idle", "idle"].map((state, index) => (
            <span className={`rail-party__slot rail-party__slot--${state}`} key={index}>
              <i />
              <b />
            </span>
          ))}
        </div>
          </>
        )}
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
        {isPortfolioSummary ? (
          <>
            <div className="rail-group rail-group--activity-status rail-group--activity-status-development">
              <h3>IN DEVELOPMENT (2)</h3>
              <Link className="rail-link rail-link--status" to={projectCasePaths.choveigo}>
                <RailIdentity src={projectRailMarks.choveigo} />
                <span><span>{railProjects.find((item) => item.slug === "choveigo")?.name}</span><small>IN DEVELOPMENT</small></span>
              </Link>
              <Link className="rail-link rail-link--status" to="/home">
                <RailIdentity src="/media/lobby/client-j-mark.svg" />
                <span><span>Portfolio</span><small>IN DEVELOPMENT</small></span>
              </Link>
            </div>
            <div className="rail-group rail-group--activity-status rail-group--activity-status-completed">
              <h3>COMPLETED (3)</h3>
              <Link className="rail-link rail-link--status" to={experienceStoryPaths["living-in-silico"]}>
                <RailIdentity src="/media/profile/living-in-silico-logo.png" />
                <span><span>Living in Silico</span><small>COMPLETED</small></span>
              </Link>
              <Link className="rail-link rail-link--status" to={experienceStoryPaths["stush-patties"]}>
                <RailIdentity src="/media/profile/stush-patties-logo.png" />
                <span><span>Stush Patties</span><small>COMPLETED</small></span>
              </Link>
              <Link className="rail-link rail-link--status" to={projectCasePaths.crest}>
                <RailIdentity src="/media/lobby/hackathon-trophy.svg" />
                <span><span>Crest</span><small>{"3RD PLACE \u00b7 COMPLETED"}</small></span>
              </Link>
            </div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      <footer className="rail-social-footer" aria-label="Social and support links">
        <span>GitHub</span>
        <span>LinkedIn</span>
        <span>X</span>
        <span className="rail-social-footer__email" aria-label="Email">✉</span>
        {helpOverlay ? (
          <button className="rail-social-footer__help" type="button" onClick={helpOverlay.openHelp}>
            Help
          </button>
        ) : (
          <Link className="rail-social-footer__help" to="/help" state={{ returnTo: pathname }}>
            Help
          </Link>
        )}
      </footer>
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
  const projectShell = usesProjectDetailShell(pathname);
  const homeShell = pathname === "/" || pathname === "/home";
  const caseDetailShell = isProjectDetail(pathname) || isExperienceDetail(pathname);

  useEffect(() => {
    mainRef.current?.focus();
  }, [pathname]);

  return (
    <div className={`client${projectShell ? " client--project-shell" : ""}${caseDetailShell ? " client--case-detail-shell" : ""}${isExperienceDetail(pathname) ? " client--experience-detail-shell" : ""}${homeShell ? " client--home-shell" : ""}${pathname.startsWith("/resume") ? " client--resume-shell" : ""}`}>
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
