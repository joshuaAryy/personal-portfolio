import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { onRequestGet } from "../../functions/media/demos/choveigo-full-demo.mp4";

const partPaths = [
  "/media/demos/choveigo-original/part-1.bin",
  "/media/demos/choveigo-original/part-2.bin",
];

describe("owner-authorized original Cho'Veigo demo route", () => {
  it("routes the original media URL through its Pages Function", () => {
    const routes = JSON.parse(readFileSync("public/_routes.json", "utf8")) as { include: string[] };

    expect(routes.include).toContain("/media/demos/choveigo-full-demo.mp4");
    expect(routes.include).toContain("/media/demos/choveigo-full-demo-redacted.mp4");
  });

  it("serves the exact original MP4 byte sequence", async () => {
    const incoming = new Request("https://portfolio.example/media/demos/choveigo-full-demo.mp4");
    const response = await onRequestGet({
      request: incoming,
      env: {
        ASSETS: {
          fetch: async (input: RequestInfo | URL) => {
            const url = new URL(typeof input === "string" || input instanceof URL ? input : input.url);
            const path = partPaths.find((candidate) => candidate === url.pathname);
            if (!path) return new Response(null, { status: 404 });
            const fileName = path.endsWith("part-1.bin") ? "part-1.bin" : "part-2.bin";
            return new Response(readFileSync(`public/media/demos/choveigo-original/${fileName}`));
          },
        },
      },
    });
    const bytes = Buffer.from(await response.arrayBuffer());

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("video/mp4");
    expect(response.headers.get("Content-Length")).toBe("32915943");
    expect(response.headers.get("ETag")).toBe(
      '"sha256-1C637A4AD7A197D7073DA88534CF8D54B660C85DF16B75FA25F955D16E94C801"',
    );
    expect(createHash("sha256").update(bytes).digest("hex").toUpperCase()).toBe(
      "1C637A4AD7A197D7073DA88534CF8D54B660C85DF16B75FA25F955D16E94C801",
    );
  });
});
