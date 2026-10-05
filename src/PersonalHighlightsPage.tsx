import { Client } from "./PortfolioLayout";
import ProfileNav from "./ProfileNav";
import "./personal-highlights.css";

type PrivacyMask = "qr" | "league-account";

type Moment = {
  source: string;
  alt: string;
  caption: string;
  privacyMask?: PrivacyMask;
};

const moments: Record<string, Moment> = {
  group: {
    source: "IMG_0422.jpeg",
    alt: "Five friends lean into a night-time group selfie outside a brightly lit building.",
    caption: "The frame was slightly crooked. The company was not.",
  },
  demolition: {
    source: "IMG_0305.jpeg",
    alt: "Two friends take a selfie beside a demolition site and heavy equipment.",
    caption: "A skyline mid-change, and two people happy to be in the picture.",
  },
  hallway: {
    source: "IMG_0308.jpeg",
    alt: "Two friends face each other in a wide tiled hallway, mid-gesture.",
    caption: "One hallway. Two friends. Full commitment to the bit.",
  },
  museum: {
    source: "IMG_0208.jpeg",
    alt: "A friend leans under a clear exhibit dome at a natural-history museum.",
    caption: "The exhibit was doing its part. The pose did the rest.",
  },
  buildRoom: {
    source: "IMG_0334.jpeg",
    alt: "Friends gather around open laptops while one relaxes in the foreground.",
    caption: "The laptops stayed open. Not everybody had to.",
    privacyMask: "qr",
  },
  bench: {
    source: "IMG_0285.jpeg",
    alt: "An oscilloscope displays two waveforms above a bench power supply.",
    caption: "A scope trace, a power supply, and an improbable amount of orange plastic.",
  },
  rankUp: {
    source: "IMG_0618.jpeg",
    alt: "A League of Legends Silver IV promotion screen glows on a dim desktop monitor.",
    caption: "Silver IV: a small win that earned a very large screen.",
    privacyMask: "league-account",
  },
  pizza: {
    source: "IMG_0755.jpeg",
    alt: "A friend looks up from a phone behind a pizza box on the table.",
    caption: "The pizza was supposed to be the subject. The camera had another idea.",
  },
  sunset: {
    source: "IMG_0098.jpeg",
    alt: "A vivid orange sunset glows through the silhouette of a tree.",
    caption: "The sky occasionally ships a better gradient than the interface.",
  },
};

function MomentFigure({
  moment,
  className,
}: {
  moment: Moment;
  className: string;
}) {
  return (
    <figure className={`personal-highlights__figure ${className}`}>
      <div
        className="personal-highlights__image-frame"
        data-privacy-mask={moment.privacyMask}
      >
        <img
          className="personal-highlights__photo"
          src={`/media/profile/highlights/${moment.source}`}
          alt={moment.alt}
          loading="lazy"
          decoding="async"
        />
        {moment.privacyMask && (
          <span
            aria-hidden="true"
            className={`personal-highlights__privacy-mask personal-highlights__privacy-mask--${moment.privacyMask}`}
          />
        )}
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
          <h1 id="personal-highlights-title">Things worth keeping.</h1>
          <p className="personal-highlights__dek">
            Friends, odd detours, screen-sized wins, good food, and views that asked for no explanation.
          </p>
        </header>

        <section className="personal-highlights__chapter personal-highlights__chapter--company" aria-labelledby="highlights-company-title">
          <div className="personal-highlights__chapter-copy">
            <p className="personal-highlights__chapter-index">01 / GOOD COMPANY</p>
            <h2 id="highlights-company-title">Better with other people in the frame.</h2>
          </div>
          <MomentFigure moment={moments.group} className="personal-highlights__figure--group" />
        </section>

        <section className="personal-highlights__chapter personal-highlights__chapter--detours" aria-labelledby="highlights-detours-title">
          <div className="personal-highlights__chapter-heading">
            <p className="personal-highlights__chapter-index">02 / OFF THE ROUTE</p>
            <h2 id="highlights-detours-title">A few very good detours.</h2>
          </div>
          <div className="personal-highlights__detour-grid">
            <MomentFigure moment={moments.hallway} className="personal-highlights__figure--hallway" />
            <MomentFigure moment={moments.demolition} className="personal-highlights__figure--demolition" />
            <MomentFigure moment={moments.museum} className="personal-highlights__figure--museum" />
          </div>
        </section>

        <section className="personal-highlights__chapter personal-highlights__chapter--making" aria-labelledby="highlights-making-title">
          <div className="personal-highlights__chapter-heading personal-highlights__chapter-heading--split">
            <div>
              <p className="personal-highlights__chapter-index">03 / SCREENS & BENCHES</p>
              <h2 id="highlights-making-title">Progress has more than one shape.</h2>
            </div>
            <p>Some nights end with a waveform. Some with a rank-up. Some with one person taking a well-earned break.</p>
          </div>
          <div className="personal-highlights__making-grid">
            <MomentFigure moment={moments.buildRoom} className="personal-highlights__figure--build-room" />
            <MomentFigure moment={moments.bench} className="personal-highlights__figure--bench" />
            <MomentFigure moment={moments.rankUp} className="personal-highlights__figure--rank-up" />
          </div>
        </section>

        <section className="personal-highlights__chapter personal-highlights__chapter--table" aria-labelledby="highlights-table-title">
          <div className="personal-highlights__chapter-copy">
            <p className="personal-highlights__chapter-index">04 / THE IMPORTANT REVIEW</p>
            <h2 id="highlights-table-title">The table gets a vote.</h2>
          </div>
          <MomentFigure moment={moments.pizza} className="personal-highlights__figure--pizza" />
        </section>

        <section className="personal-highlights__ending" aria-labelledby="highlights-ending-title">
          <div>
            <p className="personal-highlights__chapter-index">05 / LOOK UP</p>
            <h2 id="highlights-ending-title">And sometimes, just stop for the light.</h2>
          </div>
          <MomentFigure moment={moments.sunset} className="personal-highlights__figure--sunset" />
        </section>
      </section>
    </Client>
  );
}
