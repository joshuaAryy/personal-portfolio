import { useState } from "react";
import { Client } from "./PortfolioLayout";
import ProfileNav from "./ProfileNav";

const demoOptions = [
  { key: "crest", label: "CREST", image: "/media/crest-sample.png" },
  {
    key: "choveigo",
    label: "CHO’VEIGO",
    image: "/media/choveigo-recommendations.png",
  },
] as const;

export default function DemosPage() {
  const [selected, setSelected] =
    useState<(typeof demoOptions)[number]["key"]>("crest");
  const current = demoOptions.find((item) => item.key === selected)!;

  return (
    <Client pageClass="main--demos">
      <ProfileNav />
      <div className="demos-layout">
        <div className="demo-selector" aria-label="Demos">
          {demoOptions.map((item) => (
            <button
              key={item.key}
              className={selected === item.key ? "selected" : ""}
              onClick={() => setSelected(item.key)}
              aria-pressed={selected === item.key}
            >
              <img className="demo-thumb" src={item.image} alt="" />
              {item.label}
            </button>
          ))}
        </div>
        <div className="recording-rail" aria-hidden="true">
          {demoOptions.map((item) => (
            <i
              key={item.key}
              className={selected === item.key ? "selected" : ""}
            />
          ))}
        </div>
        <div className="demo-stage">
          <div className={`demo-player demo-player--${selected}`}>
            <img
              src={current.image}
              alt={`${current.label} project demo still`}
            />
            {selected === "crest" && (
              <>
                <span className="sample-cue">SAMPLE DATA</span>
                <a
                  className="demo-watch"
                  href="https://www.youtube.com/watch?v=kiq6XjNi9J8"
                  target="_blank"
                  rel="noreferrer"
                >
                  WATCH DEMO ↗
                </a>
              </>
            )}
          </div>
          <h1 className="demo-title">
            <span>{current.label}</span>
          </h1>
        </div>
      </div>
    </Client>
  );
}
