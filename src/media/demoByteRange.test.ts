import { describe, expect, it } from "vitest";
import { onRequestGet } from "../../functions/media/demos/choveigo-full-demo-redacted.mp4.ts";

const assetBytes = new Uint8Array([10, 20, 30, 40, 50, 60]);

function request(range?: string) {
  return new Request("https://portfolio.example/media/demos/choveigo-full-demo-redacted.mp4", {
    headers: range ? { Range: range } : undefined,
  });
}

function context(incoming: Request) {
  return {
    request: incoming,
    env: {
      ASSETS: {
        fetch: async () =>
          new Response(assetBytes, {
            headers: {
              "Content-Length": String(assetBytes.length),
              "Content-Type": "video/mp4",
              ETag: '"demo-v1"',
            },
          }),
      },
    },
  };
}

describe("full Cho'Veigo demo byte ranges", () => {
  it("returns the requested media slice with seekable response headers", async () => {
    const response = await onRequestGet(context(request("bytes=2-4")));

    expect(response.status).toBe(206);
    expect(response.headers.get("Accept-Ranges")).toBe("bytes");
    expect(response.headers.get("Content-Range")).toBe("bytes 2-4/6");
    expect(response.headers.get("Content-Length")).toBe("3");
    expect(Array.from(new Uint8Array(await response.arrayBuffer()))).toEqual([30, 40, 50]);
  });

  it("supports suffix ranges without exceeding the asset length", async () => {
    const response = await onRequestGet(context(request("bytes=-2")));

    expect(response.status).toBe(206);
    expect(response.headers.get("Content-Range")).toBe("bytes 4-5/6");
    expect(Array.from(new Uint8Array(await response.arrayBuffer()))).toEqual([50, 60]);
  });

  it("returns 416 for a valid range beyond the end of the demo", async () => {
    const response = await onRequestGet(context(request("bytes=6-")));

    expect(response.status).toBe(416);
    expect(response.headers.get("Content-Range")).toBe("bytes */6");
    expect((await response.arrayBuffer()).byteLength).toBe(0);
  });

  it("leaves a normal full-file response intact and advertises range support", async () => {
    const response = await onRequestGet(context(request()));

    expect(response.status).toBe(200);
    expect(response.headers.get("Accept-Ranges")).toBe("bytes");
    expect(Array.from(new Uint8Array(await response.arrayBuffer()))).toEqual([10, 20, 30, 40, 50, 60]);
  });
});
