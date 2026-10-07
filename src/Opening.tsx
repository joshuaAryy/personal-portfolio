import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "./opening.css";

const OPENING_DURATION_MS = 4_000;
const REDUCED_HANDOFF_MS = 120;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const C06_MARK_SOURCE = "/media/profile/j-candidate-06-opening.svg";

export default function Opening({ underlay }: { underlay: ReactNode }) {
  const navigate = useNavigate();
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
  );
  const [leaving, setLeaving] = useState(false);
  const completed = useRef(false);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const preference = window.matchMedia(REDUCED_MOTION_QUERY);
    const syncPreference = (event: MediaQueryListEvent) => setReducedMotion(event.matches);

    if (typeof preference.addEventListener === "function") {
      preference.addEventListener("change", syncPreference);
      return () => preference.removeEventListener("change", syncPreference);
    }

    if (typeof preference.addListener === "function") {
      preference.addListener(syncPreference);
      return () => preference.removeListener(syncPreference);
    }
  }, []);

  useEffect(() => {
    const goToHome = () => {
      if (completed.current) return;
      completed.current = true;
      navigate("/home", { replace: true });
    };

    if (reducedMotion) {
      setLeaving(true);
      timers.current.push(window.setTimeout(goToHome, REDUCED_HANDOFF_MS));
    } else {
      setLeaving(false);
      timers.current.push(window.setTimeout(goToHome, OPENING_DURATION_MS));
    }

    return () => {
      timers.current.forEach(window.clearTimeout);
      timers.current = [];
    };
  }, [navigate, reducedMotion]);

  const skip = () => {
    if (completed.current) return;
    completed.current = true;
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
    navigate("/home", { replace: true });
  };

  return (
    <div
      className={
        "opening-route" +
        (reducedMotion ? " opening-route--reduced" : "") +
        (leaving ? " opening-route--leaving" : "")
      }
    >
      <div className="opening__underlay" aria-hidden="true" inert>
        {underlay}
      </div>
      <main
        className={"opening" + (reducedMotion ? " opening--reduced" : "")}
        aria-label="Portfolio introduction"
        data-node-id="2025:2"
      >
        <div className="opening__treatment" data-node-id="3580:2" aria-hidden="true">
          <span className="opening__radial-field" />
          <span className="opening__peripheral-lines" />
          <span className="opening__peripheral-mark opening__peripheral-mark--northwest" />
          <span className="opening__peripheral-mark opening__peripheral-mark--northeast" />
          <span className="opening__peripheral-mark opening__peripheral-mark--west" />
          <span className="opening__peripheral-mark opening__peripheral-mark--east" />
          <span className="opening__peripheral-mark opening__peripheral-mark--southwest" />
          <span className="opening__peripheral-mark opening__peripheral-mark--southeast" />
          <span className="opening__peripheral-mark opening__peripheral-mark--north" />
          <span className="opening__peripheral-mark opening__peripheral-mark--south" />
          <div className="opening__mechanism" data-node-id="3581:2">
            <span className="opening__ring opening__ring--outer" />
            <span className="opening__ring opening__ring--inner" />
            <span className="opening__orbit-turn" aria-hidden="true">
              <span className="opening__orbit-spin">
                <span className="opening__orbit-ticks">
                  {Array.from({ length: 180 }, (_, index) => (
                    <span
                      className={`opening__orbit-tick${index % 12 === 0 ? " opening__orbit-tick--major" : ""}`}
                      key={index}
                      style={{ transform: `rotate(${index * 2}deg)` }}
                    />
                  ))}
                </span>
              </span>
            </span>
            <div className="opening__mark-motion" data-j-source="candidate-06-3679:247">
              <img className="opening__j-echo" src={C06_MARK_SOURCE} alt="" draggable={false} />
              <img className="opening__j-base" src={C06_MARK_SOURCE} alt="" draggable={false} />
              <span className="opening__j-piece opening__j-piece--cap" data-node-id="3679:267">
                <img src={C06_MARK_SOURCE} alt="" draggable={false} />
              </span>
              <span className="opening__j-piece opening__j-piece--shaft" data-node-id="3679:285">
                <img src={C06_MARK_SOURCE} alt="" draggable={false} />
              </span>
              <span className="opening__j-piece opening__j-piece--hook" data-node-id="3679:303">
                <img src={C06_MARK_SOURCE} alt="" draggable={false} />
              </span>
            </div>
          </div>
        </div>
        <button
          className="opening__skip"
          type="button"
          aria-label="Skip to Home"
          onClick={skip}
          data-node-id="2025:35"
        >
          <span aria-hidden="true">SKIP&nbsp;&nbsp;&nbsp;&#8599;</span>
        </button>
      </main>
    </div>
  );
}
