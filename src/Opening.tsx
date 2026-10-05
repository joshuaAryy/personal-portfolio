import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "./opening.css";

const OPENING_DURATION_MS = 3_500;
const REDUCED_HANDOFF_MS = 120;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const OPENING_ARCHIVE_FALLBACK_SOURCE = "/media/profile/open-portfolio-j-archive-source-700.png";
const OPENING_V8_MARK_ASSETS = {
  deepExtrusion: "/media/opening/j-sonnet-v8/j-extrusion-deep.svg",
  midExtrusion: "/media/opening/j-sonnet-v8/j-extrusion-mid.svg",
  face: "/media/opening/j-sonnet-v8/j-face.svg",
  detailMask: "/media/opening/j-sonnet-v8/j-detail-mask.svg",
  detail: "/media/opening/j-sonnet-v8/j-detail.svg",
  bevel: "/media/opening/j-sonnet-v8/j-bevel.svg",
  edgeLight: "/media/opening/j-sonnet-v8/j-edge-light.svg",
} as const;

export default function Opening({ underlay }: { underlay: ReactNode }) {
  const navigate = useNavigate();
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
  );
  const [leaving, setLeaving] = useState(false);
  const [v8MarkUnavailable, setV8MarkUnavailable] = useState(false);
  const completed = useRef(false);
  const timers = useRef<number[]>([]);
  const useArchiveFallback = () => setV8MarkUnavailable(true);

  useEffect(() => {
    const preference = window.matchMedia(REDUCED_MOTION_QUERY);
    const syncPreference = (event: MediaQueryListEvent) => {
      setReducedMotion(event.matches);
    };

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
          <span className="opening__peripheral-mark opening__peripheral-mark--northwest" aria-hidden="true" />
          <span className="opening__peripheral-mark opening__peripheral-mark--northeast" aria-hidden="true" />
          <span className="opening__peripheral-mark opening__peripheral-mark--west" aria-hidden="true" />
          <span className="opening__peripheral-mark opening__peripheral-mark--east" aria-hidden="true" />
          <span className="opening__peripheral-mark opening__peripheral-mark--southwest" aria-hidden="true" />
          <span className="opening__peripheral-mark opening__peripheral-mark--southeast" aria-hidden="true" />
          <span className="opening__peripheral-mark opening__peripheral-mark--north" aria-hidden="true" />
          <span className="opening__peripheral-mark opening__peripheral-mark--south" aria-hidden="true" />
          <div className="opening__mechanism" data-node-id="3581:2">
            <span className="opening__ring opening__ring--outer" />
            <span className="opening__ring opening__ring--inner" />
            <span className="opening__tick opening__tick--north" data-node-id="3617:14" />
            <span className="opening__tick opening__tick--east" data-node-id="3617:21" />
            <span className="opening__tick opening__tick--south" data-node-id="3617:28" />
            <span className="opening__tick opening__tick--west" data-node-id="3617:35" />
            <div
              className="opening__mark-motion"
              data-j-source={v8MarkUnavailable ? "archive-159:2" : "v8-3325:335"}
              aria-hidden="true"
            >
              {v8MarkUnavailable ? (
                <img
                  className="opening__archive-mark"
                  src={OPENING_ARCHIVE_FALLBACK_SOURCE}
                  alt=""
                  draggable={false}
                />
              ) : (
                <div className="opening__j-mark" data-node-id="3325:335">
                  <span className="opening__j-layer opening__j-layer--deep" data-node-id="3325:336">
                    <img
                      src={OPENING_V8_MARK_ASSETS.deepExtrusion}
                      alt=""
                      draggable={false}
                      onError={useArchiveFallback}
                    />
                  </span>
                  <span className="opening__j-layer opening__j-layer--mid" data-node-id="3325:337">
                    <img
                      src={OPENING_V8_MARK_ASSETS.midExtrusion}
                      alt=""
                      draggable={false}
                      onError={useArchiveFallback}
                    />
                  </span>
                  <span className="opening__j-layer opening__j-layer--face" data-node-id="3325:338">
                    <img
                      src={OPENING_V8_MARK_ASSETS.face}
                      alt=""
                      draggable={false}
                      onError={useArchiveFallback}
                    />
                  </span>
                  <span className="opening__j-detail" data-node-id="3325:342">
                    <img
                      className="opening__j-detail-mask-probe"
                      src={OPENING_V8_MARK_ASSETS.detailMask}
                      alt=""
                      draggable={false}
                      onError={useArchiveFallback}
                    />
                    <img
                      className="opening__j-detail-art"
                      data-node-id="3325:343"
                      src={OPENING_V8_MARK_ASSETS.detail}
                      alt=""
                      draggable={false}
                      onError={useArchiveFallback}
                    />
                  </span>
                  <span className="opening__j-layer opening__j-layer--bevel" data-node-id="3325:411">
                    <img
                      src={OPENING_V8_MARK_ASSETS.bevel}
                      alt=""
                      draggable={false}
                      onError={useArchiveFallback}
                    />
                  </span>
                  <span className="opening__j-layer opening__j-layer--edge" data-node-id="3325:412">
                    <span className="opening__j-edge-light-art">
                      <img
                        src={OPENING_V8_MARK_ASSETS.edgeLight}
                        alt=""
                        draggable={false}
                        onError={useArchiveFallback}
                      />
                    </span>
                  </span>
                </div>
              )}
            </div>
            <span className="opening__ring-arc" />
            <span className="opening__loader-label">LOADING</span>
            <span className="opening__progress-line" />
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
