import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./utility.css";

type HelpOverlayContextValue = { openHelp: () => void };
const HelpOverlayContext = createContext<HelpOverlayContextValue | null>(null);

export function useHelpOverlay() {
  return useContext(HelpOverlayContext);
}

type HelpStep = { title: string; detail: string };

const railHiddenQuery = "(max-width: 900px)";

function useRailVisible() {
  const [railVisible, setRailVisible] = useState(() => {
    if (typeof window === "undefined") return true;
    if (typeof window.matchMedia === "function") {
      return !window.matchMedia(railHiddenQuery).matches;
    }
    return window.innerWidth > 900;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const query = typeof window.matchMedia === "function"
      ? window.matchMedia(railHiddenQuery)
      : null;
    const sync = () => setRailVisible(query ? !query.matches : window.innerWidth > 900);
    sync();

    if (query) query.addEventListener("change", sync);
    else window.addEventListener("resize", sync);

    return () => {
      if (query) query.removeEventListener("change", sync);
      else window.removeEventListener("resize", sync);
    };
  }, []);

  return railVisible;
}

function utilityLinksDetail(railVisible: boolean) {
  return railVisible
    ? "LinkedIn, GitHub, Email, and Resume are in the client toolbar."
    : "LinkedIn, GitHub, Email, and Resume are in the contact row after the page content.";
}

function stepsFor(pathname: string, railVisible: boolean): HelpStep[] {
  if (pathname === "/home" || pathname === "/") {
    return [
      {
        title: "Top-level links",
        detail: `${utilityLinksDetail(railVisible)} Resume opens Resume Found.`,
      },
      {
        title: "Mode navigation",
        detail: "Projects, Experience, Hackathons, and Education are the primary destinations. The profile portrait opens Profile.",
      },
      {
        title: railVisible ? "Activity rail" : "Back and Confirm",
        detail: railVisible
          ? "Use Activity to jump to a project or experience. The current focus sits above the lists."
          : "Back returns to the previous portfolio screen when available.",
      },
      {
        title: "Preview a mode",
        detail: "Choose a mode to preview its description and focus areas. Left and Right arrows compare modes; Home and End jump to the first or last.",
      },
      {
        title: "Confirm or go Back",
        detail: "Confirm or press Enter to open the selected lobby. The Back control returns to the previous portfolio screen when available.",
      },
    ];
  }

  if (["/projects", "/experience", "/hackathons", "/education"].includes(pathname)) {
    const isEducation = pathname === "/education";
    return [
      {
        title: "Top-level links",
        detail: `${utilityLinksDetail(railVisible)} The profile portrait opens Profile.`,
      },
      {
        title: "Select an entry",
        detail: "Choose a banner to focus that project, role, or academic entry in the tray below.",
      },
      ...(isEducation
        ? [{
            title: "Review the tray",
            detail: "The tray updates with academic details. The top-left arrow returns Home; the primary navigation changes mode.",
          }]
        : [{
            title: "Confirm the selection",
            detail: "The top-left arrow returns Home. Choose Open Case Study for a project, Open Profile for the owner card, or the labeled action for another story. A source link opens the repository when provided.",
          }]),
      {
        title: railVisible ? "Primary navigation and Activity" : "Primary navigation",
        detail: railVisible
          ? "Use the top navigation or Activity rail to reach another area or story. The profile portrait opens Profile."
          : "Use the top navigation to reach another mode. The profile portrait opens Profile.",
      },
    ];
  }

  if (pathname === "/profile") {
    return [
      {
        title: "Top-level links",
        detail: `${utilityLinksDetail(railVisible)} The profile portrait returns here.`,
      },
      {
        title: "Profile signals",
        detail: "Hover a signal or move keyboard focus to it to preview its details. The preview panel updates as you move between signals.",
      },
      {
        title: "Profile navigation",
        detail: "Use Overview, Journey, Personal Highlights, and Demos to change Profile sections.",
      },
      {
        title: "Open a project",
        detail: railVisible
          ? "Project links in the signal preview go directly to their case studies. The main navigation changes mode, and Activity links to project and experience stories."
          : "Project links in the signal preview go directly to their case studies. The primary navigation changes portfolio mode.",
      },
    ];
  }

  if (pathname === "/profile/journey") {
    return [
      {
        title: "Top-level links",
        detail: `${utilityLinksDetail(railVisible)} The profile portrait opens Profile Overview.`,
      },
      {
        title: "Follow the story",
        detail: "Scroll naturally through the Journey; the current chapter updates as you move down the page.",
      },
      {
        title: "Use the path",
        detail: "The sticky chapter path jumps to Origin, TMU, Living in Silico, Stush Patties, or Summer 2026. You can also keep scrolling.",
      },
      {
        title: "Change sections",
        detail: railVisible
          ? "Use the Profile tabs for Overview, Journey, Personal Highlights, and Demos. Primary navigation and Activity remain available."
          : "Use the Profile tabs for Overview, Journey, Personal Highlights, and Demos. Primary navigation remains in the header; contact links follow the page content.",
      },
    ];
  }

  if (pathname === "/profile/demos") {
    return [
      {
        title: "Top-level links",
        detail: `${utilityLinksDetail(railVisible)} The profile portrait opens Profile Overview.`,
      },
      {
        title: "Choose a demo",
        detail: "Use the selector to switch between Food Tracker, Crest, and Cho’Veigo.",
      },
      {
        title: "Play Crest or Cho’Veigo",
        detail: "Select either project and press Play to start its video in the player.",
      },
      {
        title: "Food Tracker",
        detail: "Its authentic demo video is pending. Use the Profile tabs to change sections.",
      },
    ];
  }

  if (pathname === "/profile/highlights") {
    return [
      {
        title: "Top-level links",
        detail: `${utilityLinksDetail(railVisible)} The profile portrait opens Profile Overview.`,
      },
      {
        title: "Browse the gallery",
        detail: "Scroll through the gallery of Personal Highlights.",
      },
      {
        title: "Profile navigation",
        detail: "Use the Profile tabs to switch between Overview, Journey, Personal Highlights, and Demos.",
      },
      {
        title: railVisible ? "Primary navigation and Activity" : "Primary navigation",
        detail: railVisible
          ? "Use the top navigation to change portfolio mode. Activity links to project and experience stories."
          : "Use the top navigation to reach another portfolio mode.",
      },
    ];
  }

  if (pathname === "/resume") {
    return [
      {
        title: "Resume Found",
        detail: "View Resume opens the document viewer. Close returns to the screen that opened Resume Found.",
      },
      {
        title: "View or close",
        detail: "Choose View Resume to continue, or use Close to return to the previous portfolio screen.",
      },
      {
        title: "Escape",
        detail: "Press Escape to close Resume Found and return to the previous screen.",
      },
    ];
  }

  if (pathname === "/resume/viewer") {
    return [
      {
        title: "Resume viewer",
        detail: "The resume appears in the document frame when the browser can display the PDF.",
      },
      {
        title: "Resume actions",
        detail: "Download PDF saves a copy. Open Fullscreen opens the PDF in a new tab.",
      },
      {
        title: "Return to Resume Found",
        detail: railVisible
          ? "Use Back to Resume Found to return to the previous resume screen. Top navigation and contact links remain available."
          : "Use Back to Resume Found to return to the previous resume screen. Top navigation remains in the header; contact links follow the page content.",
      },
    ];
  }

  if (pathname.startsWith("/projects/") || pathname.startsWith("/experience/")) {
    const hasChapterNav = pathname === "/projects/choveigo" || pathname === "/projects/fraymakers";
    return [
      {
        title: "Top-level links",
        detail: `${utilityLinksDetail(railVisible)} The profile portrait opens Profile.`,
      },
      {
        title: "Read the case study",
        detail: "Scroll through the story from its opening to the outcome. Use the visible back link or primary navigation to return to the project or experience list.",
      },
      ...(hasChapterNav
        ? [{
            title: "Case study navigation",
            detail: "Use the chapter stops to jump between sections; the active chapter follows your scroll position.",
          }]
        : []),
      {
        title: railVisible ? "Move between stories" : "Use the client links",
        detail: railVisible
          ? "The Activity rail links to related work, while top navigation changes portfolio mode."
          : "Primary navigation changes portfolio mode. The profile portrait opens Profile.",
      },
    ];
  }

  if (pathname === "/education/projects") {
    return [
      {
        title: "Top-level links",
        detail: `${utilityLinksDetail(railVisible)} The profile portrait opens Profile.`,
      },
      {
        title: "Read the capability briefs",
        detail: "Scroll through the briefs to review selected academic work.",
      },
      {
        title: "Back to Education",
        detail: "Use the Education link above the briefs to return to the academic lobby.",
      },
      {
        title: railVisible ? "Primary navigation and Activity" : "Primary navigation",
        detail: railVisible
          ? "Use the top navigation to change portfolio mode. Activity links to project and experience stories."
          : "Use the top navigation to reach another portfolio mode.",
      },
    ];
  }

  return [
    { title: "Top-level links", detail: `${utilityLinksDetail(railVisible)} The profile portrait opens Profile.` },
    { title: "Use the top navigation", detail: "Projects, Experience, Hackathons, and Education remain available from the client shell." },
    ...(railVisible
      ? [{
          title: "Use the Activity rail",
          detail: "The rail links to current focus, projects, and experience stories.",
        }]
      : []),
  ];
}

function HelpOverlay({ onClose }: { onClose: () => void }) {
  const location = useLocation();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const railVisible = useRailVisible();
  const steps = stepsFor(location.pathname, railVisible);
  const isHome = location.pathname === "/home" || location.pathname === "/";
  const isLobby = ["/projects", "/experience", "/hackathons", "/education"].includes(
    location.pathname,
  );
  const homeHighlights = isHome
    ? ["navigation", ...(railVisible ? ["rail"] : []), "focus", "confirm"]
    : [];

  return (
    <div className="client-help-overlay">
      <div className="client-help-overlay__scrim" aria-hidden="true" />
      {isHome ? (
        homeHighlights.map((target) => (
          <div
            className={`client-help-overlay__spotlight client-help-overlay__spotlight--home-${target}`}
            key={target}
            aria-hidden="true"
          />
        ))
      ) : (
        <div
          className={`client-help-overlay__spotlight${isLobby ? " client-help-overlay__spotlight--lobby" : ""}`}
          aria-hidden="true"
        />
      )}
      <section
        ref={dialogRef}
        className={`client-help-overlay__dialog${isHome ? " client-help-overlay__dialog--home" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onClose();
          }
          if (event.key === "Tab") {
            const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
              'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
            );
            const items = Array.from(focusable ?? []);
            if (!items.length) {
              event.preventDefault();
              return;
            }
            const first = items[0];
            const last = items[items.length - 1];
            const activeIndex = items.indexOf(document.activeElement as HTMLElement);
            if (activeIndex < 0) {
              event.preventDefault();
              (event.shiftKey ? last : first).focus();
            } else if (event.shiftKey && activeIndex === 0) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && activeIndex === items.length - 1) {
              event.preventDefault();
              first.focus();
            }
          }
        }}
        onBlurCapture={(event) => {
          if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
          closeRef.current?.focus();
        }}
      >
        {isHome ? (
          <>
            <h2 id={titleId} className="client-help-overlay__sr-only">Home controls</h2>
            <button
              ref={closeRef}
              className="client-help-overlay__close client-help-overlay__close--floating"
              type="button"
              onClick={onClose}
            >
              Close <kbd>Esc</kbd>
            </button>
          </>
        ) : (
          <header className="client-help-overlay__header">
            <div>
              <p className="client-help-overlay__eyebrow">Portfolio client / Help</p>
              <h2 id={titleId}>A quick orientation</h2>
            </div>
            <button
              ref={closeRef}
              className="client-help-overlay__close"
              type="button"
              onClick={onClose}
            >
              Close <kbd>Esc</kbd>
            </button>
          </header>
        )}
        <ol className={`client-help-overlay__steps${isHome ? " client-help-overlay__steps--home" : ""}`}>
          {steps.map((step, index) => (
            <li key={step.title}>
              <span className="client-help-overlay__step-number">0{index + 1}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        {!isHome && (
          <p className="client-help-overlay__footnote">
            The current screen stays open underneath this guide.
          </p>
        )}
      </section>
    </div>
  );
}

export function HelpExperienceProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const closeHelp = useCallback(() => setOpen(false), []);
  const context = useMemo(() => ({ openHelp: () => setOpen(true) }), []);

  useEffect(() => {
    const state = location.state as { openHelp?: boolean } | null;
    if (!state?.openHelp) return;
    setOpen(true);
    navigate(location.pathname + location.search + location.hash, {
      replace: true,
      state: null,
    });
  }, [location.hash, location.key, location.pathname, location.search, location.state, navigate]);

  useLayoutEffect(() => {
    if (!open) return;
    const client = document.querySelector<HTMLElement>(".client");
    const active = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousAriaHidden = client ? client.getAttribute("aria-hidden") : null;
    const wasInert = client?.hasAttribute("inert") ?? false;
    document.querySelector<HTMLButtonElement>(".client-help-overlay__close")?.focus();
    client?.setAttribute("aria-hidden", "true");
    client?.setAttribute("inert", "");

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeHelp();
    }

    window.addEventListener("keydown", handleKeyDown);
    document.body.classList.add("client-help-open");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("client-help-open");
      document.body.style.overflow = previousOverflow;
      if (client) {
        if (previousAriaHidden === null) client.removeAttribute("aria-hidden");
        else client.setAttribute("aria-hidden", previousAriaHidden);
        if (!wasInert) client.removeAttribute("inert");
      }
      active?.focus();
    };
  }, [open, closeHelp]);

  return (
    <HelpOverlayContext.Provider value={context}>
      {children}
      {open && <HelpOverlay onClose={closeHelp} />}
    </HelpOverlayContext.Provider>
  );
}

export function HelpRouteEntry() {
  const location = useLocation();
  const returnTo = (location.state as { returnTo?: string } | null)?.returnTo ?? "/home";
  return <Navigate to={returnTo} replace state={{ openHelp: true }} />;
}
