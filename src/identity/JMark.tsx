import type { SVGProps } from "react";

type JMarkVariant = "opening" | "ringed" | "monochrome";

type JMarkProps = Omit<SVGProps<SVGSVGElement>, "role" | "aria-label"> & {
  variant?: JMarkVariant;
  decorative?: boolean;
  "aria-label"?: string;
};

export default function JMark({
  variant = "opening",
  decorative = false,
  className,
  "aria-label": label,
  ...props
}: JMarkProps) {
  const monochrome = variant === "monochrome";
  const source = monochrome
    ? "/media/profile/open-portfolio-j-ringless-16px.svg"
    : "/media/profile/open-portfolio-j-archive-source.jpg";
  const viewBox = monochrome ? "0 0 16 16" : "0 0 220 220";
  const sourceSize = monochrome ? 16 : 220;
  const accessibility = {
    "aria-hidden": decorative ? true : undefined,
    role: decorative ? undefined : "img",
    "aria-label": decorative ? undefined : label ?? "Canonical portfolio J mark",
    focusable: false as const,
  };

  return (
    <svg
      {...props}
      {...accessibility}
      className={className}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!decorative && <title>{label ?? "Canonical portfolio J mark"}</title>}
      <image
        href={source}
        x="0"
        y="0"
        width={sourceSize}
        height={sourceSize}
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
