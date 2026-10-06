import { Client } from "./PortfolioLayout";
import ProfileNav from "./ProfileNav";
import "./personal-highlights.css";

type Moment = {
  source: string;
  alt: string;
  caption: string;
};

const moments = {
  crew: {
    source: "IMG_0422.jpeg",
    alt: "Five friends lean in for a nighttime group selfie with city lights behind them.",
    caption: "The frame leans. Everyone else leans in.",
  },
  room: {
    source: "IMG_0334-privacy-safe.jpeg",
    alt: "Friends share an open-laptop room while one takes a break across the foreground.",
    caption: "The laptops stayed open. Not everybody had to.",
  },
  hallway: {
    source: "IMG_0308.jpeg",
    alt: "Two people make theatrical poses in a broad, tiled public hall.",
    caption: "A corridor makes a pretty convincing stage.",
  },
  changingCity: {
    source: "IMG_0305.jpeg",
    alt: "Two friends smile for a selfie beside a partially demolished structure, with the city behind them.",
    caption: "The skyline is mid-rebuild; the selfie is fully committed.",
  },
  reflection: {
    source: "IMG_0208.jpeg",
    alt: "A face appears in the reflection of a clear exhibit dome at a natural-history museum.",
    caption: "An exhibit view turns into an unexpected portrait.",
  },
  rankUp: {
    source: "IMG_0618-rank-up-safe.jpeg",
    alt: "A desktop monitor displays a promotion to Silver IV above the League of Legends rank emblem.",
    caption: "One small notification that took over the whole screen.",
  },
  dinner: {
    source: "IMG_0755-table-safe.jpeg",
    alt: "A friend checks a phone behind a large pizza in an open box on the table.",
    caption: "Dinner brought a guest star of its own.",
  },
  sunset: {
    source: "IMG_0098.jpeg",
    alt: "Orange clouds glow behind the silhouette of a tree at sunset.",
    caption: "Some views can keep the last word.",
  },
} satisfies Record<string, Moment>;

function MomentFigure({
  moment,
  className,
}: {
  moment: Moment;
  className: string;
}) {
  return (
    <figure className={"personal-highlights__figure " + className}>
      <div className="personal-highlights__image-frame">
        <img
          className="personal-highlights__photo"
          src={"/media/profile/highlights/" + moment.source}
          alt={moment.alt}
          loading="lazy"
          decoding="async"
        />
      </div>
      <figcaption className="personal-highlights__caption">
        <span aria-hidden="true" className="personal-highlights__caption-mark" />
        <p>{moment.caption}</p>
      </figcaption>
    </figure>
  );
}

export default function PersonalHighlightsPage() {
  return (
    <Client pageClass="main--detail main--personal-highlights">
      <ProfileNav />
      <section className="personal-highlights" aria-labelledby="personal-highlights-title">
        <header className="personal-highlights__intro">
          <p className="personal-highlights__eyebrow">PERSONAL / FIELD NOTES</p>
          <h1 id="personal-highlights-title">The rest of the story.</h1>
          <p className="personal-highlights__dek">
            Work gets its case studies. The people, side quests, and small wins around it get a frame of their own.
          </p>
        </header>

        <section className="personal-highlights__chapter personal-highlights__chapter--company" aria-labelledby="highlights-company-title">
          <header className="personal-highlights__chapter-heading">
            <p className="personal-highlights__chapter-index">WITH PEOPLE</p>
            <h2 id="highlights-company-title">People first.</h2>
            <p className="personal-highlights__chapter-note">
              The best frames leave room for the people around the work, too.
            </p>
          </header>
          <div className="personal-highlights__company-sequence">
            <MomentFigure moment={moments.crew} className="personal-highlights__figure--crew" />
            <MomentFigure moment={moments.room} className="personal-highlights__figure--room" />
          </div>
        </section>

        <section className="personal-highlights__chapter personal-highlights__chapter--detours" aria-labelledby="highlights-detours-title">
          <div className="personal-highlights__detours-lead">
            <div className="personal-highlights__chapter-copy">
              <p className="personal-highlights__chapter-index">SIDE QUESTS</p>
              <h2 id="highlights-detours-title">Out of the expected frame.</h2>
              <p className="personal-highlights__chapter-note">
                A corridor becomes a stage. A changing block gets a selfie. A museum display catches a face in the glass.
              </p>
            </div>
            <MomentFigure moment={moments.hallway} className="personal-highlights__figure--hallway" />
          </div>
          <div className="personal-highlights__detours-followup">
            <MomentFigure moment={moments.changingCity} className="personal-highlights__figure--changing-city" />
            <MomentFigure moment={moments.reflection} className="personal-highlights__figure--reflection" />
          </div>
        </section>

        <section className="personal-highlights__chapter personal-highlights__chapter--small-wins" aria-labelledby="highlights-small-wins-title">
          <header className="personal-highlights__chapter-heading">
            <p className="personal-highlights__chapter-index">SMALL WINS</p>
            <h2 id="highlights-small-wins-title">Some things earn a whole frame.</h2>
            <p className="personal-highlights__chapter-note">
              A promotion notification. A dinner that gets its own close-up. There are plenty of ways to mark a moment.
            </p>
          </header>
          <div className="personal-highlights__small-wins-sequence">
            <MomentFigure moment={moments.rankUp} className="personal-highlights__figure--rank-up" />
            <MomentFigure moment={moments.dinner} className="personal-highlights__figure--dinner" />
          </div>
        </section>

        <section className="personal-highlights__ending" aria-labelledby="highlights-ending-title">
          <div className="personal-highlights__ending-copy">
            <p className="personal-highlights__chapter-index">A PAUSE</p>
            <h2 id="highlights-ending-title">And then, look up.</h2>
          </div>
          <MomentFigure moment={moments.sunset} className="personal-highlights__figure--sunset" />
        </section>
      </section>
    </Client>
  );
}
