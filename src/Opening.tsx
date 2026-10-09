import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "./opening.css";

const OPENING_DURATION_MS = 5_000;
const REDUCED_HANDOFF_MS = 120;
const NORMAL_HANDOFF_MS = 160;
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

function V8LayerSet({ onAssetError, isPiece = false }: { onAssetError: () => void; isPiece?: boolean }) {
  const deepNode = isPiece ? {} : { "data-node-id": "3325:336" };
  const midNode = isPiece ? {} : { "data-node-id": "3325:337" };
  const faceNode = isPiece ? {} : { "data-node-id": "3325:338" };
  const detailNode = isPiece ? {} : { "data-node-id": "3325:342" };
  const detailArtNode = isPiece ? {} : { "data-node-id": "3325:343" };
  const bevelNode = isPiece ? {} : { "data-node-id": "3325:411" };
  const edgeNode = isPiece ? {} : { "data-node-id": "3325:412" };

  return (
    <>
      <span className="opening__j-layer opening__j-layer--deep" {...deepNode}>
        <img src={OPENING_V8_MARK_ASSETS.deepExtrusion} alt="" draggable={false} onError={onAssetError} />
      </span>
      <span className="opening__j-layer opening__j-layer--mid" {...midNode}>
        <img src={OPENING_V8_MARK_ASSETS.midExtrusion} alt="" draggable={false} onError={onAssetError} />
      </span>
      <span className="opening__j-layer opening__j-layer--face" {...faceNode}>
        <img src={OPENING_V8_MARK_ASSETS.face} alt="" draggable={false} onError={onAssetError} />
      </span>
      <span className="opening__j-detail" {...detailNode}>
        <img className="opening__j-detail-mask-probe" src={OPENING_V8_MARK_ASSETS.detailMask} alt="" draggable={false} onError={onAssetError} />
        <img className="opening__j-detail-art" {...detailArtNode} src={OPENING_V8_MARK_ASSETS.detail} alt="" draggable={false} onError={onAssetError} />
      </span>
      <span className="opening__j-layer opening__j-layer--bevel" {...bevelNode}>
        <img src={OPENING_V8_MARK_ASSETS.bevel} alt="" draggable={false} onError={onAssetError} />
      </span>
      <span className="opening__j-layer opening__j-layer--edge" {...edgeNode}>
        <span className="opening__j-edge-light-art">
          <img src={OPENING_V8_MARK_ASSETS.edgeLight} alt="" draggable={false} onError={onAssetError} />
        </span>
      </span>
    </>
  );
}

function V8HeroMark({ unavailable, onAssetError }: { unavailable: boolean; onAssetError: () => void }) {
  if (unavailable) {
    return <img className="opening__archive-mark" src={OPENING_ARCHIVE_FALLBACK_SOURCE} alt="" draggable={false} />;
  }

  return (
    <div className="opening__j-mark" data-node-id="3325:335">
      <div className="opening__j-settled" data-j-layer-set="sonnet-v8-approved">
        <V8LayerSet onAssetError={onAssetError} />
      </div>
      {(["cap", "shaft", "hook"] as const).map((piece) => (
        <span className={`opening__j-piece opening__j-piece--${piece}`} data-j-piece={piece} key={piece}>
          <span className="opening__j-piece-art">
            <V8LayerSet onAssetError={onAssetError} isPiece />
          </span>
        </span>
      ))}
      <span className="opening__j-lock" aria-hidden="true">
        <span className="opening__j-lock-seam opening__j-lock-seam--cap" />
        <span className="opening__j-lock-seam opening__j-lock-seam--hook" />
      </span>
      <span className="opening__j-sheen" aria-hidden="true" />
    </div>
  );
}

export default function Opening({ underlay }: { underlay: ReactNode }) {
  const navigate = useNavigate();
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
  );
  const [leaving, setLeaving] = useState(false);
  const [v8MarkUnavailable, setV8MarkUnavailable] = useState(false);
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

    const beginNormalHandoff = () => {
      if (completed.current) return;
      setLeaving(true);
      timers.current.push(window.setTimeout(goToHome, NORMAL_HANDOFF_MS));
    };

    if (reducedMotion) {
      setLeaving(false);
      timers.current.push(window.setTimeout(goToHome, REDUCED_HANDOFF_MS));
    } else {
      setLeaving(false);
      timers.current.push(
        window.setTimeout(
          beginNormalHandoff,
          OPENING_DURATION_MS - NORMAL_HANDOFF_MS,
        ),
      );
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
            <div
              className="opening__mark-motion"
              data-j-source={v8MarkUnavailable ? "archive-159:2" : "v8-sonnet-3325:191"}
              aria-hidden="true"
            >
              <V8HeroMark unavailable={v8MarkUnavailable} onAssetError={() => setV8MarkUnavailable(true)} />
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
