import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const routeMotion = readFileSync(new URL("./route-motion.css", import.meta.url), "utf8");
const reducedMotionRules = routeMotion.split("@media (prefers-reduced-motion: reduce)")[1] ?? "";

describe("route entry motion", () => {
  it("reduces the actual lobby details and tray without leaving their stagger delay", () => {
    expect(reducedMotionRules).toContain(".main--lobby .league-role-legend");
    expect(reducedMotionRules).toContain(".main--lobby .selected-tray");
    expect(reducedMotionRules).toContain("animation-duration: 140ms !important");
    expect(reducedMotionRules).toContain("animation-delay: 0ms !important");
  });
});
