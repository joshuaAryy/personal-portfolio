import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import FraymakersCase from "./FraymakersCase";

describe("Fraymakers composition inputs", () => {
  it("renders seven distinct labels for the composition taxonomy", () => {
    const markup = renderToStaticMarkup(
      <MemoryRouter>
        <FraymakersCase />
      </MemoryRouter>,
    );
    const list = markup.match(
      /<ul aria-label="Thumbnail composition inputs">([\s\S]*?)<\/ul>/,
    )?.[1];
    const inputs = [...(list ?? "").matchAll(/<li>(.*?)<\/li>/g)].map(
      ([, input]) => input,
    );

    expect(inputs).toEqual([
      "LOGOS",
      "STAGE ART",
      "CHARACTER / SPRITE ART",
      "COSTUMES",
      "ASSISTS",
      "FOREGROUND ART",
      "TEXT / SET LABELS",
    ]);
  });
});
