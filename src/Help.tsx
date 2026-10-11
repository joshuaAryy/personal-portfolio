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
const homeSpotlightTargets: Record<string, string> = {
  utilities: ".header-client-tools",
  navigation: ".home-explore__modes",
  back: ".home-explore__back",
  rail: ".rail",
  focus: ".home-explore__selection",
  confirm: ".home-explore__confirm-area",
};
const homeSpotlightNumbers: Record<string, string> = {
  utilities: "01",
  navigation: "02",
  back: "03",
  rail: "03",
  focus: "04",
  confirm: "05",
};

type HelpSpotlight = { key: string; selector: string; number: string };

function contextualSpotlights(pathname: string, railVisible: boolean): HelpSpotlight[] {
  const utilities = railVisible ? ".header-client-tools" : ".mobile-contact-row";
  const shell = [
    { key: "primary-navigation", selector: ".top-nav", number: "04" },
    ...(railVisible ? [{ key: "activity", selector: ".rail", number: "04" }] : []),
  ];
  if (["/projects", "/experience", "/hackathons", "/education"].includes(pathname)) {
    return [
      { key: "utilities", selector: utilities, number: "01" },
      { key: "entries", selector: ".league-lobby__banners", number: "02" },
      { key: "selection", selector: ".league-selected", number: "03" },
      ...shell,
    ];
  }
  if (pathname === "/profile") {
    return [
      { key: "utilities", selector: utilities, number: "01" },
      { key: "signals", selector: ".profile-signal-grid", number: "02" },
      { key: "profile-navigation", selector: ".profile-nav", number: "03" },
      ...shell,
    ];
  }
  if (pathname === "/profile/journey") {
    return [
      { key: "utilities", selector: utilities, number: "01" },
      { key: "journey", selector: ".journey-page", number: "02" },
      { key: "journey-path", selector: ".journey-locator", number: "03" },
      { key: "profile-navigation", selector: ".profile-nav", number: "04" },
      ...shell.map((item) => ({ ...item, number: "04" })),
    ];
  }
  if (pathname === "/profile/demos") {
    return [
      { key: "utilities", selector: utilities, number: "01" },
      { key: "demo-selector", selector: ".demo-selector", number: "02" },
      { key: "demo-player", selector: ".demo-stage", number: "03" },
      { key: "food-demo", selector: ".demo-stage", number: "04" },
      { key: "profile-navigation", selector: ".profile-nav", number: "04" },
    ];
  }
  if (pathname === "/profile/highlights") {
    return [
      { key: "utilities", selector: utilities, number: "01" },
      { key: "gallery", selector: ".personal-highlights", number: "02" },
      { key: "profile-navigation", selector: ".profile-nav", number: "03" },
      ...shell.map((item) => ({ ...item, number: "04" })),
    ];
  }
  if (pathname === "/resume") {
    return [
      { key: "utilities", selector: utilities, number: "01" },
      { key: "resume", selector: ".resume-found", number: "01" },
      { key: "resume-view", selector: ".resume-found__action", number: "02" },
      { key: "resume-close", selector: ".resume-found__close", number: "02" },
    ];
  }
  if (pathname === "/resume/viewer") {
    return [
      { key: "resume-document", selector: ".resume-viewer__frame", number: "01" },
      { key: "resume-actions", selector: ".resume-viewer__actions", number: "02" },
      { key: "utilities", selector: utilities, number: "02" },
      { key: "resume-back", selector: ".resume-viewer__back", number: "03" },
    ];
  }
  if (pathname.startsWith("/projects/") || pathname.startsWith("/experience/")) {
    const chapterSelector = documentSelectorForChapterNav(pathname);
    return [
      { key: "utilities", selector: utilities, number: "01" },
      { key: "story-opening", selector: ".main h1", number: "02" },
      ...(chapterSelector ? [{ key: "chapters", selector: chapterSelector, number: "03" }] : []),
      ...shell.map((item) => ({ ...item, number: chapterSelector ? "04" : "03" })),
    ];
  }
  if (pathname === "/education/projects") {
    return [
      { key: "utilities", selector: utilities, number: "01" },
      { key: "education-briefs", selector: ".education-projects__list", number: "02" },
      { key: "education-back", selector: ".education-projects__back", number: "03" },
      ...shell.map((item) => ({ ...item, number: "04" })),
    ];
  }
  return [
    { key: "utilities", selector: utilities, number: "01" },
    ...shell.map((item) => ({ ...item, number: "02" })),
  ];
}

function documentSelectorForChapterNav(pathname: string) {
  if (pathname === "/projects/food-tracker") return ".food-case-nav__chapters";
  if (pathname === "/projects/choveigo") return ".choveigo-case-nav__chapters";
  if (pathname === "/projects/fraymakers") return ".fraymakers-nav__chapters";
  return null;
}

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

function useNarrowViewport() {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== "undefined" && (window.visualViewport?.width ?? window.innerWidth) <= 620,
  );

  useEffect(() => {
    const sync = () => setNarrow((window.visualViewport?.width ?? window.innerWidth) <= 620);
    const viewport = window.visualViewport;
    window.addEventListener("resize", sync);
    viewport?.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("resize", sync);
      viewport?.removeEventListener("resize", sync);
    };
  }, []);

  return narrow;
}

function narrowHomeSteps(railVisible: boolean) {
  return [
    { key: "utilities", selector: railVisible ? ".header-client-tools" : ".mobile-contact-row", title: "Top-level links", detail: utilityLinksDetail(railVisible) },
    { key: "navigation", selector: ".home-explore__modes", title: "Mode navigation", detail: "Projects, Experience, Hackathons, and Education are the main destinations. The profile portrait opens Profile." },
    { key: "back", selector: ".home-explore__back", title: "Back", detail: "Back returns to the previous portfolio screen when one is available." },
    { key: "focus", selector: ".home-explore__selection", title: "Preview a mode", detail: "Choose a mode to preview its description and focus areas. Left and Right arrows compare modes; Home and End jump to the first or last." },
    { key: "confirm", selector: ".home-explore__confirm", title: "Confirm", detail: "Confirm or press Enter to open the selected lobby." },
  ];
}

function utilityLinksDetail(railVisible: boolean) {
  const location = railVisible
    ? "in the client toolbar"
    : "in the contact row after the page content";
  return `LinkedIn, GitHub, Email, and Resume are ${location}. LinkedIn and GitHub open in new tabs, Email starts a message, and Resume opens Resume Found.`;
}

function stepsFor(pathname: string, railVisible: boolean): HelpStep[] {
  if (pathname === "/home" || pathname === "/") {
    return [
      {
        title: "Top-level links",
        detail: utilityLinksDetail(railVisible),
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
        detail: "Food Tracker currently shows a static identity poster; its authentic demo video is pending. Use the Profile tabs to change sections.",
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
        detail: `${utilityLinksDetail(railVisible)} View Resume opens the document viewer. Close returns to the screen that opened Resume Found.`,
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
        detail: `${utilityLinksDetail(railVisible)} Download PDF saves a copy. Open Fullscreen opens the PDF in a new tab.`,
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
    const hasChapterNav =
      pathname === "/projects/food-tracker" ||
      pathname === "/projects/choveigo" ||
      pathname === "/projects/fraymakers";
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

type ScrollPosition = { element: HTMLElement; top: number; left: number };

function captureHomeCoachmarkScroll(): { x: number; y: number; elements: ScrollPosition[] } {
  const selectors = narrowHomeSteps(false).map((step) => step.selector);
  const elements = new Set<HTMLElement>();
  for (const selector of selectors) {
    let element = document.querySelector<HTMLElement>(selector);
    while (element) {
      if (element.scrollHeight > element.clientHeight + 1 || element.scrollWidth > element.clientWidth + 1) {
        elements.add(element);
      }
      element = element.parentElement;
    }
  }
  const scrollingElement = document.scrollingElement;
  if (scrollingElement instanceof HTMLElement) elements.add(scrollingElement);
  return {
    x: window.scrollX,
    y: window.scrollY,
    elements: Array.from(elements, (element) => ({ element, top: element.scrollTop, left: element.scrollLeft })),
  };
}

function restoreHomeCoachmarkScroll(snapshot: { x: number; y: number; elements: ScrollPosition[] }) {
  snapshot.elements.forEach(({ element, top, left }) => {
    if (!element.isConnected) return;
    element.scrollTop = top;
    element.scrollLeft = left;
  });
  window.scrollTo({ left: snapshot.x, top: snapshot.y, behavior: "instant" });
}

function HelpOverlay({ onClose }: { onClose: (restoreFocus?: boolean) => void }) {
  const location = useLocation();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const coachmarkTitleRef = useRef<HTMLHeadingElement>(null);
  const coachmarkScrollRef = useRef<ReturnType<typeof captureHomeCoachmarkScroll> | null>(null);
  const [coachmarkPosition, setCoachmarkPosition] = useState({ left: 12, top: 110 });
  const [homeStepIndex, setHomeStepIndex] = useState(0);
  const restoreCoachmarkScroll = useRef(true);
  const railVisible = useRailVisible();
  const narrowViewport = useNarrowViewport();
  const steps = stepsFor(location.pathname, railVisible);
  const isHome = location.pathname === "/home" || location.pathname === "/";
  const isNarrowHomeCoachmark = isHome && narrowViewport;
  const coachmarkSteps = narrowHomeSteps(railVisible);
  const activeCoachmarkStep = coachmarkSteps[homeStepIndex];
  const isLobby = ["/projects", "/experience", "/hackathons", "/education"].includes(
    location.pathname,
  );
  const homeHighlights = isNarrowHomeCoachmark
    ? [activeCoachmarkStep.key]
    : isHome
    ? ["utilities", "navigation", ...(railVisible ? ["rail"] : ["back"]), "focus", "confirm"]
    : [];
  const contextualHighlights = isHome ? [] : contextualSpotlights(location.pathname, railVisible);

  useLayoutEffect(() => {
    const frames = Array.from(document.querySelectorAll<HTMLElement>(".client-help-overlay__spotlight"));
    if (!frames.length) return;

    if (isNarrowHomeCoachmark && !coachmarkScrollRef.current) {
      coachmarkScrollRef.current = captureHomeCoachmarkScroll();
    }

    const measureTargets = () => {
      frames.forEach((frame) => {
        const key = frame.dataset.helpTarget ?? "screen";
        const selector = isNarrowHomeCoachmark
          ? activeCoachmarkStep.selector
          : isHome
          ? key === "utilities" && !railVisible ? ".mobile-contact-row" : homeSpotlightTargets[key]
          : frame.dataset.helpSelector;
        const target = selector ? document.querySelector<HTMLElement>(selector) : null;
        if (!target) {
          frame.hidden = true;
          return;
        }

        const bounds = target.getBoundingClientRect();
        const inset = key === "screen" ? 12 : 8;
        const visual = isNarrowHomeCoachmark ? window.visualViewport : null;
        const viewportLeft = visual?.offsetLeft ?? 0;
        const viewportTop = visual?.offsetTop ?? 0;
        const viewportRight = viewportLeft + (visual?.width ?? window.innerWidth);
        const viewportBottom = viewportTop + (visual?.height ?? window.innerHeight);
        const fullyVisible = bounds.left >= viewportLeft
          && bounds.top >= viewportTop
          && bounds.right <= viewportRight
          && bounds.bottom <= viewportBottom;
        const left = Math.max(viewportLeft + 4, bounds.left - inset);
        const top = Math.max(viewportTop + 4, bounds.top - inset);
        const right = Math.min(viewportRight - 4, bounds.right + inset);
        const bottom = Math.min(viewportBottom - 4, bounds.bottom + inset);
        frame.hidden = right <= left || bottom <= top || (isNarrowHomeCoachmark && !fullyVisible);
        frame.style.left = `${left}px`;
        frame.style.top = `${top}px`;
        frame.style.width = `${Math.max(0, right - left)}px`;
        frame.style.height = `${Math.max(0, bottom - top)}px`;

        if (isNarrowHomeCoachmark && !frame.hidden) {
          const dialogBounds = dialogRef.current?.getBoundingClientRect();
          const dialogWidth = dialogBounds?.width ?? Math.min(340, viewportRight - viewportLeft - 24);
          const dialogHeight = dialogBounds?.height ?? 200;
          const gap = 14;
          const belowTop = bounds.bottom + gap;
          const aboveTop = bounds.top - dialogHeight - gap;
          const fitsBelow = belowTop + dialogHeight <= viewportBottom - 12;
          const fitsAbove = aboveTop >= viewportTop + 12;
          const desiredTop = fitsBelow ? belowTop : fitsAbove ? aboveTop :
            bounds.top - dialogHeight - gap;
          const positionedTop = Math.min(
            viewportBottom - dialogHeight - 12,
            Math.max(viewportTop + 12, desiredTop),
          );
          const desiredLeft = bounds.left + bounds.width / 2 - dialogWidth / 2;
          const positionedLeft = Math.min(
            viewportRight - dialogWidth - 12,
            Math.max(viewportLeft + 12, desiredLeft),
          );
          setCoachmarkPosition((current) =>
            current.left === positionedLeft && current.top === positionedTop
              ? current
              : { left: positionedLeft, top: positionedTop },
          );
        }
      });
    };

    const ensureTargetVisible = () => {
      if (!isNarrowHomeCoachmark) return;
      const target = document.querySelector<HTMLElement>(activeCoachmarkStep.selector);
      if (!target) return;
      const bounds = target.getBoundingClientRect();
      const visual = window.visualViewport;
      const viewportLeft = visual?.offsetLeft ?? 0;
      const viewportTop = visual?.offsetTop ?? 0;
      const viewportRight = viewportLeft + (visual?.width ?? window.innerWidth);
      const viewportBottom = viewportTop + (visual?.height ?? window.innerHeight);
      const visible = bounds.left >= viewportLeft
        && bounds.top >= viewportTop
        && bounds.right <= viewportRight
        && bounds.bottom <= viewportBottom;
      if (!visible) {
        const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
        target.scrollIntoView?.({ block: "center", inline: "nearest", behavior: reduceMotion ? "auto" : "smooth" });
      }
      requestAnimationFrame(measureTargets);
    };

    measureTargets();
    if (isNarrowHomeCoachmark) ensureTargetVisible();
    window.addEventListener("resize", isNarrowHomeCoachmark ? ensureTargetVisible : measureTargets);
    document.addEventListener("scroll", measureTargets, true);
    window.visualViewport?.addEventListener("resize", ensureTargetVisible);
    window.visualViewport?.addEventListener("scroll", measureTargets);
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measureTargets);
    const activatedTarget = isNarrowHomeCoachmark
      ? document.querySelector<HTMLElement>(activeCoachmarkStep.selector)
      : null;
    const selectionObserver = isNarrowHomeCoachmark && activeCoachmarkStep.key === "focus"
      && typeof MutationObserver !== "undefined"
      ? new MutationObserver(measureTargets)
      : null;
    if (activatedTarget && selectionObserver) {
      selectionObserver.observe(activatedTarget, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
    const closeOnNavigation = () => {
      restoreCoachmarkScroll.current = false;
      onClose(false);
    };
    if (activatedTarget && ["utilities", "back", "confirm"].includes(activeCoachmarkStep.key)) {
      activatedTarget.addEventListener("click", closeOnNavigation, true);
    }
    frames.forEach((frame) => {
      const key = frame.dataset.helpTarget ?? "screen";
      const selector = isNarrowHomeCoachmark
        ? activeCoachmarkStep.selector
        : isHome
        ? key === "utilities" && !railVisible ? ".mobile-contact-row" : homeSpotlightTargets[key]
        : frame.dataset.helpSelector;
      const target = selector ? document.querySelector<HTMLElement>(selector) : null;
      if (target) observer?.observe(target);
    });

    return () => {
      window.removeEventListener("resize", isNarrowHomeCoachmark ? ensureTargetVisible : measureTargets);
      document.removeEventListener("scroll", measureTargets, true);
      window.visualViewport?.removeEventListener("resize", ensureTargetVisible);
      window.visualViewport?.removeEventListener("scroll", measureTargets);
      observer?.disconnect();
      selectionObserver?.disconnect();
      activatedTarget?.removeEventListener("click", closeOnNavigation, true);
    };
  }, [isHome, isNarrowHomeCoachmark, isLobby, railVisible, activeCoachmarkStep, onClose]);

  useLayoutEffect(() => {
    if (!isNarrowHomeCoachmark) return;
    coachmarkTitleRef.current?.focus({ preventScroll: true });
  }, [homeStepIndex, isNarrowHomeCoachmark]);

  useLayoutEffect(() => {
    if (!isNarrowHomeCoachmark) return;
    const target = document.querySelector<HTMLElement>(activeCoachmarkStep.selector);
    if (!target) return;
    const originalDescription = target.getAttribute("aria-describedby");
    const originalTabIndex = target.getAttribute("tabindex");
    const detailId = `${titleId}-detail`;
    const describedBy = new Set((originalDescription ?? "").split(/\s+/).filter(Boolean));
    describedBy.add(detailId);
    const appliedDescription = Array.from(describedBy).join(" ");
    target.setAttribute("aria-describedby", appliedDescription);
    if (!target.matches("a[href], button, input, select, textarea, [tabindex]")) {
      target.setAttribute("tabindex", "-1");
    }

    const returnToGuide = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || document.activeElement !== target) return;
      event.preventDefault();
      event.stopPropagation();
      coachmarkTitleRef.current?.focus({ preventScroll: true });
    };
    document.addEventListener("keydown", returnToGuide, true);

    return () => {
      document.removeEventListener("keydown", returnToGuide, true);
      if (target.getAttribute("aria-describedby") === appliedDescription) {
        if (originalDescription === null) target.removeAttribute("aria-describedby");
        else target.setAttribute("aria-describedby", originalDescription);
      }
      if (originalTabIndex === null && target.getAttribute("tabindex") === "-1") {
        target.removeAttribute("tabindex");
      }
    };
  }, [activeCoachmarkStep.selector, isNarrowHomeCoachmark, titleId]);

  useLayoutEffect(() => {
    if (!isNarrowHomeCoachmark || coachmarkScrollRef.current) return;
    coachmarkScrollRef.current = captureHomeCoachmarkScroll();
  }, [isNarrowHomeCoachmark]);

  useLayoutEffect(() => () => {
    if (restoreCoachmarkScroll.current && coachmarkScrollRef.current) {
      restoreHomeCoachmarkScroll(coachmarkScrollRef.current);
    }
    restoreCoachmarkScroll.current = true;
    coachmarkScrollRef.current = null;
  }, [isNarrowHomeCoachmark]);

  return (
    <div className={`client-help-overlay${isNarrowHomeCoachmark ? " client-help-overlay--coachmark" : ""}`}>
      <div className="client-help-overlay__scrim" aria-hidden="true" />
      {isHome ? (
          homeHighlights.map((target) => (
          <div
            className={`client-help-overlay__spotlight client-help-overlay__spotlight--home-${target}`}
            data-help-target={target}
            data-help-selector={target === "utilities" && !railVisible ? ".mobile-contact-row" : homeSpotlightTargets[target]}
            data-help-number={homeSpotlightNumbers[target]}
            key={target}
            aria-hidden="true"
          />
        ))
      ) : contextualHighlights.map((spotlight) => (
        <div
          className={`client-help-overlay__spotlight client-help-overlay__spotlight--${spotlight.key}${isLobby ? " client-help-overlay__spotlight--lobby" : ""}`}
          data-help-target={spotlight.key}
          data-help-selector={spotlight.selector}
          data-help-number={spotlight.number}
          key={`${spotlight.key}-${spotlight.number}`}
          aria-hidden="true"
        />
      ))}
      <section
        ref={dialogRef}
        className={`client-help-overlay__dialog${isHome ? " client-help-overlay__dialog--home" : ""}${isNarrowHomeCoachmark ? " client-help-coachmark" : ""}`}
        role="dialog"
        aria-modal={isNarrowHomeCoachmark ? undefined : "true"}
        aria-labelledby={titleId}
        style={isNarrowHomeCoachmark ? { left: `${coachmarkPosition.left}px`, top: `${coachmarkPosition.top}px` } : undefined}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            onClose();
          }
          if (!isNarrowHomeCoachmark && event.key === "Tab") {
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
          if (isNarrowHomeCoachmark) return;
          if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return;
          closeRef.current?.focus();
        }}
      >
        {isNarrowHomeCoachmark ? (
          <>
            <header className="client-help-coachmark__header">
              <p className="client-help-coachmark__count" aria-live="polite" aria-atomic="true">
                {homeStepIndex + 1} of {coachmarkSteps.length}
              </p>
              <button ref={closeRef} className="client-help-overlay__close" type="button" onClick={() => onClose()}>
                Close <kbd>Esc</kbd>
              </button>
            </header>
            <h2 ref={coachmarkTitleRef} id={titleId} className="client-help-coachmark__title" tabIndex={-1}>
              {activeCoachmarkStep.title}
            </h2>
            <p id={`${titleId}-detail`} className="client-help-coachmark__detail">{activeCoachmarkStep.detail}</p>
            <div className="client-help-coachmark__actions">
              <button
                className="client-help-coachmark__previous"
                type="button"
                disabled={homeStepIndex === 0}
                onClick={() => setHomeStepIndex((index) => Math.max(0, index - 1))}
              >
                Previous
              </button>
              <button
                className="client-help-coachmark__focus-target"
                type="button"
                onClick={() => {
                  const target = document.querySelector<HTMLElement>(activeCoachmarkStep.selector);
                  target?.focus({ preventScroll: true });
                }}
              >
                Focus target <span aria-hidden="true">· Esc returns</span>
              </button>
              <button
                className="client-help-coachmark__next"
                type="button"
                onClick={() => homeStepIndex === coachmarkSteps.length - 1
                  ? onClose()
                  : setHomeStepIndex((index) => Math.min(coachmarkSteps.length - 1, index + 1))}
              >
                {homeStepIndex === coachmarkSteps.length - 1 ? "Done" : "Next"}
              </button>
            </div>
          </>
        ) : isHome ? (
          <>
            <h2 id={titleId} className="client-help-overlay__sr-only">Home controls</h2>
            <button
              ref={closeRef}
              className="client-help-overlay__close client-help-overlay__close--floating"
              type="button"
              onClick={() => onClose()}
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
              onClick={() => onClose()}
            >
              Close <kbd>Esc</kbd>
            </button>
          </header>
        )}
        {!isNarrowHomeCoachmark && (
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
        )}
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
  const narrowViewport = useNarrowViewport();
  const restoreFocusOnClose = useRef(true);
  const restoreFocusTarget = useRef<HTMLElement | null>(null);
  const closeHelp = useCallback((restoreFocus = true) => {
    restoreFocusOnClose.current = restoreFocus;
    setOpen(false);
  }, []);
  const context = useMemo(() => ({
    openHelp: () => {
      restoreFocusTarget.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      restoreFocusOnClose.current = true;
      setOpen(true);
    },
  }), []);

  useEffect(() => {
    const state = location.state as { openHelp?: boolean } | null;
    if (!state?.openHelp) return;
    restoreFocusTarget.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    restoreFocusOnClose.current = true;
    setOpen(true);
    navigate(location.pathname + location.search + location.hash, {
      replace: true,
      state: null,
    });
  }, [location.hash, location.key, location.pathname, location.search, location.state, navigate]);

  useLayoutEffect(() => {
    if (!open) return;
    const client = document.querySelector<HTMLElement>(".client");
    const active = restoreFocusTarget.current
      ?? (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    const isNarrowHomeCoachmark = narrowViewport && ["/home", "/"].includes(location.pathname);
    if (isNarrowHomeCoachmark) {
      document.body.classList.add("client-help-coachmark-open");
      return () => {
        document.body.classList.remove("client-help-coachmark-open");
        if (restoreFocusOnClose.current) active?.focus();
        restoreFocusOnClose.current = true;
        restoreFocusTarget.current = null;
      };
    }
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
      if (restoreFocusOnClose.current) active?.focus();
      restoreFocusOnClose.current = true;
      restoreFocusTarget.current = null;
    };
  }, [open, closeHelp, narrowViewport, location.pathname]);

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
