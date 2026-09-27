import { useId, type SVGProps } from "react";

type JMarkVariant = "opening" | "ringed" | "monochrome";

type JMarkProps = Omit<SVGProps<SVGSVGElement>, "role" | "aria-label"> & {
  variant?: JMarkVariant;
  decorative?: boolean;
  "aria-label"?: string;
};

const ringPaths = {
  registration:
    "M234 433.737C345.0615 433.737 435.0932 351.89 435.0932 250.925C435.0932 149.96 345.0615 68.1125 234 68.1125C122.9385 68.1125 32.9062 149.96 32.9062 250.925C32.9062 351.89 122.9385 433.737 234 433.737Z",
  gold:
    "M234 426.425C340.6186 426.425 427.05 347.851 427.05 250.925C427.05 153.999 340.6186 75.425 234 75.425C127.3814 75.425 40.95 153.999 40.95 250.925C40.95 347.851 127.3814 426.425 234 426.425Z",
  highlight:
    "M234 422.769C338.3977 422.769 423.0284 345.832 423.0284 250.925C423.0284 156.018 338.3977 79.0812 234 79.0812C129.6023 79.0812 44.9718 156.018 44.9718 250.925C44.9718 345.832 129.6023 422.769 234 422.769Z",
};

const shadowPath =
  "M 87.099 66.85 H 372.621 L 343.02 113.65 H 275.745 V 295.39 C 275.745 329.39 269.305 359.39 252.745 382.39 C 237.105 402.39 215.945 410.85 185.033 410.85 C 136.273 410.85 97.633 384.85 86.593 341.85 L 118.793 322.85 C 129.833 351.85 150.993 367.85 181.353 367.85 C 208.033 367.85 227.353 342.85 227.353 299.39 V 113.65 H 125.049 L 87.099 66.85 Z";

const bodyPath =
  "M 85.719 64.35 H 371.241 L 341.64 111.15 H 274.365 V 292.89 C 274.365 326.89 267.925 356.89 251.365 379.89 C 235.725 399.89 214.565 408.35 183.653 408.35 C 134.893 408.35 96.253 382.35 85.213 339.35 L 117.413 320.35 C 128.453 349.35 149.613 365.35 179.973 365.35 C 206.653 365.35 225.973 340.35 225.973 296.89 V 111.15 H 123.669 L 85.719 64.35 Z";

const metalPath =
  "M 92.4465 70.2 H 361.82296 L 340.29496 103.838 H 123.669 L 92.4465 70.2 Z";

const detailPath =
  "M 229.96304 119.925 V 295.425 C 229.96304 343.687 208.43504 375.862 174.798 378.787";

const monochromePath =
  "M 2.21453 1.1 H 13.66973 L 12.48214 2.97744 H 9.78305 V 10.26817 C 9.78305 11.63213 9.52467 12.83562 8.86028 13.75829 C 8.2328 14.56062 7.38386 14.9 6.14363 14.9 C 4.1874 13.85698 2.63716 13.85698 2.19423 12.13198 L 3.4861 11.36977 C 3.92903 12.53314 4.77797 13.175 5.99603 13.175 C 7.06643 13.175 7.84155 12.17209 7.84155 10.42864 V 2.97744 H 3.73709 L 2.21453 1.1 Z";

function Rings() {
  return (
    <>
      <path d={ringPaths.registration} stroke="#302519" strokeWidth="7.5" />
      <path d={ringPaths.gold} stroke="#9B773F" strokeWidth="1.4" />
      <path
        d={ringPaths.highlight}
        stroke="#E4C777"
        strokeWidth="0.55"
        opacity="0.55"
      />
    </>
  );
}

export default function JMark({
  variant = "opening",
  decorative = false,
  className,
  "aria-label": label,
  ...props
}: JMarkProps) {
  const id = useId().replaceAll(":", "");
  const lightId = `opening-j-light-${id}`;
  const silhouetteId = `opening-j-silhouette-${id}`;
  const accessibility = {
    "aria-hidden": decorative ? true : undefined,
    role: decorative ? undefined : "img",
    "aria-label": decorative ? undefined : label ?? "Canonical portfolio J mark",
    focusable: false as const,
  };

  if (variant === "monochrome") {
    return (
      <svg
        {...props}
        {...accessibility}
        className={className}
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {!decorative && <title>{label ?? "Canonical portfolio J mark"}</title>}
        <path d={monochromePath} fill="currentColor" />
      </svg>
    );
  }

  if (variant === "ringed") {
    return (
      <svg
        {...props}
        {...accessibility}
        className={className}
        viewBox="0 0 468 468"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {!decorative && <title>{label ?? "Canonical portfolio J mark"}</title>}
        <Rings />
        <path d={shadowPath} fill="#382A18" opacity="0.5" />
        <path d={bodyPath} fill="#BD9148" stroke="#51391C" strokeWidth="1.35" />
        <path d={metalPath} fill="#E3C477" />
        <path
          d={detailPath}
          stroke="#EAD393"
          strokeWidth="1.35"
          opacity="0.56"
        />
      </svg>
    );
  }

  return (
    <svg
      {...props}
      {...accessibility}
      className={className}
      viewBox="0 0 468 468"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!decorative && <title>{label ?? "Canonical portfolio J mark"}</title>}
      <defs>
        <linearGradient id={lightId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff4cf" stopOpacity="0" />
          <stop offset="0.48" stopColor="#fff4cf" stopOpacity="0.58" />
          <stop offset="1" stopColor="#fff4cf" stopOpacity="0" />
        </linearGradient>
        <mask id={silhouetteId} maskUnits="userSpaceOnUse">
          <path d={bodyPath} fill="white" />
        </mask>
      </defs>
      <path
        className="opening__ring opening__ring--registration"
        d={ringPaths.registration}
        stroke="#302519"
        strokeWidth="7.5"
      />
      <path
        className="opening__ring opening__ring--gold"
        d={ringPaths.gold}
        stroke="#9B773F"
        strokeWidth="1.4"
      />
      <path
        className="opening__ring opening__ring--highlight"
        d={ringPaths.highlight}
        stroke="#E4C777"
        strokeWidth="0.55"
        opacity="0.55"
      />
      <path className="opening__j-shadow" d={shadowPath} fill="#382A18" opacity="0.5" />
      <path
        className="opening__j-body"
        d={bodyPath}
        fill="#BD9148"
        stroke="#51391C"
        strokeWidth="1.35"
      />
      <path className="opening__j-metal" d={metalPath} fill="#E3C477" />
      <path
        className="opening__j-detail"
        d={detailPath}
        stroke="#EAD393"
        strokeWidth="1.35"
        opacity="0.56"
      />
      <rect
        className="opening__light-pass"
        x="-468"
        y="0"
        width="468"
        height="468"
        fill={`url(#${lightId})`}
        mask={`url(#${silhouetteId})`}
      />
    </svg>
  );
}
