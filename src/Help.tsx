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

function stepsFor(pathname: string, railVisible: boolean): HelpStep[] {
  if (pathname === "/home" || pathname === "/") {
    return [
      {
        title: "Navigation",
        detail: "Choose a mode to move between Projects, Experience, Hackathons, or Education.",
      },
      ...(railVisible
        ? [{
            title: "Party / Activity Rail",
            detail: "Your current focus sits above the active and completed party list.",
          }]
        : []),
      {
        title: "Preview a mode",
        detail: "Selecting a mode previews its description and focus areas. Use the arrows to compare destinations.",
      },
      {
        title: "Open the Selection",
        detail: "Confirm or press Enter to open the selected item in its lobby. Close or press Esc to dismiss Help.",
      },
    ];
  }

  if (["/projects", "/experience", "/hackathons", "/education"].includes(pathname)) {
    const isEducation = pathname === "/education";
    return [
      {
        title: "Select an entry",
        detail: "Choose a banner to focus its details in the tray below.",
      },
      ...(isEducation
          ? [{
            title: "Review details",
            detail: "The tray updates to show academic information for the selected entry.",
          }]
        : [{
            title: "Open the story",
            detail: "Use the explicit action in the tray. The small source icon opens a verified repository.",
          }]),
      {
        title: "Move around",
        detail: railVisible
          ? "Use the upper navigation or activity rail to open another area. Your account portrait opens Profile."
          : "Use the upper navigation to open another area. Your account portrait opens Profile.",
      },
    ];
  }

  if (pathname === "/profile/demos") {
    return [
      {
        title: "Choose a recording",
        detail: "Use the left selector to switch between Food Tracker, Crest, and Cho’Veigo.",
      },
      {
        title: "Stay in the client",
        detail: "Crest plays in the portfolio when available. Cho’Veigo is a still capture.",
      },
      {
        title: "Change sections",
        detail: railVisible
          ? "Use the upper navigation, Profile tabs, or activity rail to continue."
          : "Use the upper navigation or Profile tabs to continue.",
      },
    ];
  }

  return [
    {
      title: "Use the top navigation",
      detail: "Projects, Experience, Hackathons, and Education remain available from the client shell.",
    },
    {
      title: "Open Profile",
      detail: "The account portrait at the top right is the canonical Profile entry.",
    },
    ...(railVisible
      ? [{
          title: "Use the activity rail",
          detail: "The right rail links to current work and client utilities.",
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
            if (event.shiftKey && document.activeElement === first) {
              event.preventDefault();
              last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
              event.preventDefault();
              first.focus();
            }
          }
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
