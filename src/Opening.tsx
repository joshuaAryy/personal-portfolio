import { useEffect, useRef, useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import "./opening.css";

const OPENING_DURATION_MS = 3_000;
const REDUCED_HANDOFF_MS = 120;
const NORMAL_HANDOFF_MS = 160;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";
const C06_ASSET_ROOT = "/assets/j-c06-keyed-forge/";

function C06Layer({
  className,
  src,
  nodeId,
  imageClassName,
  nestedImage = false,
}: {
  className: string;
  src: string;
  nodeId: string;
  imageClassName?: string;
  nestedImage?: boolean;
}) {
  return (
    <span className={className} data-node-id={nodeId} aria-hidden="true">
      {nestedImage ? (
        <span className={imageClassName}>
          <img src={`${C06_ASSET_ROOT}${src}`} alt="" draggable={false} />
        </span>
      ) : (
        <img src={`${C06_ASSET_ROOT}${src}`} alt="" draggable={false} />
      )}
    </span>
  );
}

function C06HeroArt() {
  return (
    <div className="opening__hero-art" data-node-id="3679:2" aria-hidden="true">
      <span className="opening__hero-shadow" data-node-id="3679:6">
        <img src={`${C06_ASSET_ROOT}shadow.svg`} alt="" draggable={false} />
      </span>

      <div className="opening__hero-part" data-node-id="3679:76">
        <C06Layer className="opening__hero-gold opening__hero-gold--deep-cap" src="extr-deep-cap-face.svg" nodeId="3679:9" />
        <C06Layer className="opening__hero-gold opening__hero-gold--mid-cap" src="extr-mid-cap.svg" nodeId="3679:10" />
        <C06Layer className="opening__hero-gold opening__hero-gold--face-cap" src="face-cap.svg" nodeId="3679:11" />
        <C06Layer className="opening__hero-gold opening__hero-gold--detail-cap" src="detail-cap.svg" nodeId="3679:12" imageClassName="opening__hero-gold-image-inset--detail" nestedImage />
        <C06Layer className="opening__hero-gold opening__hero-gold--bevel-cap" src="bevel-cap.svg" nodeId="3679:72" />
        <C06Layer className="opening__hero-gold opening__hero-gold--edge-cap" src="edge-light-cap.svg" nodeId="3679:73" imageClassName="opening__hero-gold-image-inset--edge" nestedImage />
      </div>

      <div className="opening__hero-part" data-node-id="3679:145">
        <C06Layer className="opening__hero-gold opening__hero-gold--deep-shaft" src="extr-deep-cap-face.svg" nodeId="3679:78" />
        <C06Layer className="opening__hero-gold opening__hero-gold--mid-shaft" src="extr-mid-cap.svg" nodeId="3679:79" />
        <C06Layer className="opening__hero-gold opening__hero-gold--face-shaft" src="face-cap.svg" nodeId="3679:80" />
        <C06Layer className="opening__hero-gold opening__hero-gold--detail-shaft" src="detail-cap.svg" nodeId="3679:81" imageClassName="opening__hero-gold-image-inset--detail" nestedImage />
        <C06Layer className="opening__hero-gold opening__hero-gold--bevel-shaft" src="bevel-cap.svg" nodeId="3679:141" />
        <C06Layer className="opening__hero-gold opening__hero-gold--edge-shaft" src="edge-light-cap.svg" nodeId="3679:142" imageClassName="opening__hero-gold-image-inset--edge" nestedImage />
      </div>

      <div className="opening__hero-part" data-node-id="3679:214">
        <C06Layer className="opening__hero-gold opening__hero-gold--deep-hook" src="extr-deep-cap-face.svg" nodeId="3679:147" />
        <C06Layer className="opening__hero-gold opening__hero-gold--mid-hook" src="extr-mid-cap.svg" nodeId="3679:148" />
        <C06Layer className="opening__hero-gold opening__hero-gold--face-hook" src="face-cap.svg" nodeId="3679:149" />
        <C06Layer className="opening__hero-gold opening__hero-gold--detail-hook" src="detail-cap.svg" nodeId="3679:150" imageClassName="opening__hero-gold-image-inset--detail" nestedImage />
        <C06Layer className="opening__hero-gold opening__hero-gold--bevel-hook" src="bevel-cap.svg" nodeId="3679:210" />
        <C06Layer className="opening__hero-gold opening__hero-gold--edge-hook" src="edge-light-cap.svg" nodeId="3679:211" imageClassName="opening__hero-gold-image-inset--edge" nestedImage />
      </div>

      <span className="opening__hero-seam opening__hero-seam--upper" data-node-id="3679:215" aria-hidden="true">
        <span className="opening__hero-seam-art">
          <img src={`${C06_ASSET_ROOT}seam-light.svg`} alt="" draggable={false} />
        </span>
      </span>
      <span className="opening__hero-seam opening__hero-seam--lower" data-node-id="3679:215" aria-hidden="true">
        <span className="opening__hero-seam-art">
          <img src={`${C06_ASSET_ROOT}seam-light.svg`} alt="" draggable={false} />
        </span>
      </span>
      <C06Layer className="opening__hero-seam-energy opening__hero-seam-energy--upper" src="seam-energy.svg" nodeId="3679:215" imageClassName="opening__hero-seam-art" nestedImage />
      <C06Layer className="opening__hero-seam-energy opening__hero-seam-energy--lower" src="seam-energy.svg" nodeId="3679:215" imageClassName="opening__hero-seam-art" nestedImage />
      <span className="opening__hero-light-exits opening__hero-light-exits--upper" data-node-id="3679:233" aria-hidden="true">
        <span className="opening__hero-light-exits-art">
          <img src={`${C06_ASSET_ROOT}light-exits.svg`} alt="" draggable={false} />
        </span>
      </span>
      <span className="opening__hero-light-exits opening__hero-light-exits--lower" data-node-id="3679:233" aria-hidden="true">
        <span className="opening__hero-light-exits-art">
          <img src={`${C06_ASSET_ROOT}light-exits.svg`} alt="" draggable={false} />
        </span>
      </span>
      <C06Layer className="opening__hero-conduit" src="conduit.svg" nodeId="3679:242" imageClassName="opening__hero-conduit-image" nestedImage />
      <span className="opening__hero-sheen" aria-hidden="true" />
    </div>
  );
}

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
              data-j-source="candidate-06-3679:2"
            >
              <C06HeroArt />
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
