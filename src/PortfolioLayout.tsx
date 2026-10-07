import { useEffect, useRef, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { experience, experienceIdentities, portfolioIdentity, projectIdentities } from "./data";
import { experienceStoryPaths, projectCasePaths, railProjects } from "./project-route-paths";
import { useHelpOverlay } from "./Help";
import "./route-motion.css";

const headerUtilityLinks = [
  { label: "LinkedIn", href: "https://ca.linkedin.com/in/joshua-ary", external: true },
  { label: "GitHub", href: "https://github.com/joshuaAryy", external: true },
  { label: "Email", href: "mailto:joshuaaryy@gmail.com", external: false },
  { label: "Resume", href: "/resume", external: false },
] as const;

const usesProjectDetailShell = (pathname: string) =>
  pathname.startsWith("/projects") || pathname.startsWith("/experience/");

const isExperienceDetail = (pathname: string) => pathname.startsWith("/experience/");
const isProjectDetail = (pathname: string) => pathname.startsWith("/projects/");

function ContactLinks() {
  return (
    <>
      <a href="https://ca.linkedin.com/in/joshua-ary" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn (opens in a new tab)">LinkedIn</a>
      <a href="https://github.com/joshuaAryy" target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">GitHub</a>
      <a className="rail-social-footer__email" href="mailto:joshuaaryy@gmail.com" aria-label="Email Joshua">✉</a>
    </>
  );
}

function MobileContactRow() {
  const location = useLocation();
  const { pathname } = location;
  return (
    <nav className="mobile-contact-row" aria-label="Contact links">
      <ContactLinks />
      <Link
        to="/resume"
        state={{ from: pathname, backgroundLocation: location }}
        aria-label="Resume"
      >
        Resume
      </Link>
    </nav>
  );
}

function Header() {
  const location = useLocation();
  const { pathname } = location;
  const helpOverlay = useHelpOverlay();
  const isEducationProjectsPage = pathname === "/education/projects";
  const topNavRef = useRef<HTMLElement>(null);
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

  useEffect(() => {
    if (!isEducationProjectsPage) return;

    const topNav = topNavRef.current;
    if (!topNav) return;

    const revealEducationAndHelp = () => {
      const activeEducation = topNav.querySelector<HTMLElement>("a.current");
      const help = topNav.querySelector<HTMLElement>(".header-help");
      if (!activeEducation || !help) return;

      if (!window.matchMedia("(max-width: 650px)").matches) {
        topNav.scrollLeft = 0;
        return;
      }

      const navBounds = topNav.getBoundingClientRect();
      const activeBounds = activeEducation.getBoundingClientRect();
      const helpBounds = help.getBoundingClientRect();
      const activeStart = activeBounds.left - navBounds.left + topNav.scrollLeft;
      const helpEnd = helpBounds.right - navBounds.left + topNav.scrollLeft;
      const helpRevealOffset = Math.max(0, helpEnd - topNav.clientWidth);
      const educationVisibleOffset = Math.min(
        activeStart,
        topNav.scrollWidth - topNav.clientWidth,
      );

      topNav.scrollLeft = Math.max(0, Math.min(helpRevealOffset, educationVisibleOffset));
    };

    revealEducationAndHelp();
    window.addEventListener("resize", revealEducationAndHelp);
    return () => window.removeEventListener("resize", revealEducationAndHelp);
  }, [isEducationProjectsPage]);

  const revealMobileHomeHelp = (help: HTMLElement) => {
    if (!isHome || window.innerWidth > 760 || !help.matches(":focus-visible")) return;

    const topNav = topNavRef.current;
    if (!topNav) return;

    const navBounds = topNav.getBoundingClientRect();
    const helpBounds = help.getBoundingClientRect();
    const focusRingInset = 8;
    const visibleStart = navBounds.left + focusRingInset;
    const visibleEnd = navBounds.right - focusRingInset;
    const maxScroll = Math.max(0, topNav.scrollWidth - topNav.clientWidth);

    if (helpBounds.left < visibleStart) {
      topNav.scrollLeft = Math.max(0, topNav.scrollLeft - (visibleStart - helpBounds.left));
    } else if (helpBounds.right > visibleEnd) {
      topNav.scrollLeft = Math.min(maxScroll, topNav.scrollLeft + (helpBounds.right - visibleEnd));
    }
  };

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
            srcSet={portfolioIdentity.mark32}
          />
          <img
            className="brand-glyph"
            src={portfolioIdentity.mark}
            alt=""
            aria-hidden="true"
            data-node-id="3289:157"
          />
        </picture>
        <strong>PORTFOLIO</strong>
      </Link>
      <nav
        ref={topNavRef}
        className={`top-nav${isEducationProjectsPage ? " top-nav--education-projects" : ""}`}
        aria-label="Main navigation"
      >
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
        {helpOverlay ? (
          <button
            className="header-help"
            type="button"
            onClick={helpOverlay.openHelp}
            onFocus={(event) => revealMobileHomeHelp(event.currentTarget)}
          >
            Help
          </button>
        ) : (
          <Link
            className="header-help"
            to="/help"
            state={{ returnTo: pathname }}
            onFocus={(event) => revealMobileHomeHelp(event.currentTarget)}
          >
            Help
          </Link>
        )}
      </nav>
      <nav className="header-client-tools" aria-label="Contact and resume">
        {headerUtilityLinks.map((item) => (
          item.href === "/resume" ? (
            <Link
              className="header-client-tool header-client-tool--resume"
              key={item.label}
              to="/resume"
              state={{ from: pathname, backgroundLocation: location }}
            >
              {item.label}
            </Link>
          ) : (
            <a
              className={`header-client-tool${item.label === "Email" ? " header-client-tool--email" : ""}`}
              key={item.label}
              href={item.href}
              target={item.external ? "_blank" : undefined}
              rel={item.external ? "noopener noreferrer" : undefined}
              aria-label={item.external ? `${item.label} (opens in a new tab)` : item.label}
            >
              {item.label}
            </a>
          )
        ))}
      </nav>
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

const projectRailMarks: Record<string, string | undefined> = Object.fromEntries(
  Object.entries(projectIdentities).map(([slug, identity]) => [slug, identity.mark]),
);

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
  const isProjectShell = usesProjectDetailShell(pathname);
  const focus = pathname.startsWith("/experience")
    ? {
        name: "Living in Silico",
        path: experienceStoryPaths["living-in-silico"],
        src: experienceIdentities["living-in-silico"].mark,
      }
    : pathname.startsWith("/hackathons")
      ? { name: "Crest", path: projectCasePaths.crest, src: projectIdentities.crest.mark }
      : pathname.startsWith("/education")
        ? { name: "Current Coursework", path: "/education", src: "/media/lobby/education-coursework.svg" }
        : {
            name: "Food Tracker",
            path: projectCasePaths["food-tracker"],
            src: projectRailMarks["food-tracker"]!,
          };
  return (
    <aside className="rail" aria-label="Portfolio index">
      <div className={`rail-availability${isProjectShell ? " rail-availability--opportunities" : ""}`}>
        {isProjectShell ? (
          <>
            <img
              className="rail-availability__mark"
              src={portfolioIdentity.mark}
              alt=""
              aria-hidden="true"
              data-node-id="I2356:611;137:2"
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
            src={portfolioIdentity.mark}
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
                  <RailIdentity src={experienceIdentities[item.slug].mark} />
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
      </div>
      <footer className="rail-social-footer" aria-label="Social and support links">
        <ContactLinks />
        <span aria-hidden="true">X</span>
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
    const main = mainRef.current;
    if (!main) return;

    if (homeShell && window.innerWidth <= 900) {
      window.scrollTo(0, 0);
    }

    main.focus({ preventScroll: true });
  }, [pathname, homeShell]);

  return (
    <div className={`client${projectShell ? " client--project-shell" : ""}${caseDetailShell ? " client--case-detail-shell" : ""}${isExperienceDetail(pathname) ? " client--experience-detail-shell" : ""}${homeShell ? " client--home-shell" : ""}${pathname.startsWith("/resume") ? " client--resume-shell" : ""}${pathname === "/profile/journey" ? " client--journey" : ""}`}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <div className="client-body">
        <main
          key={pathname}
          id="main"
          ref={mainRef}
          tabIndex={-1}
          className={"main " + pageClass}
        >
          {children}
        </main>
        <MobileContactRow />
        <Rail />
      </div>
    </div>
  );
}
