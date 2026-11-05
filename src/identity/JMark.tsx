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
  const source = variant === "monochrome"
    ? "/media/profile/j-candidate-06-xs16.svg"
    : "/media/profile/j-candidate-06-m54.svg";
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
      viewBox="0 0 468 468"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!decorative && <title>{label ?? "Canonical portfolio J mark"}</title>}
      <image
        href={source}
        x="0"
        y="0"
        width={468}
        height={468}
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}
