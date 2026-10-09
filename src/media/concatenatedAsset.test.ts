import { describe, expect, it } from "vitest";
import { createConcatenatedAssetHandlers } from "./concatenatedAsset";

const parts = [
  { path: "/first.bin", byteLength: 3 },
  { path: "/second.bin", byteLength: 3 },
] as const;
const bytesByPath = new Map([
  ["/first.bin", new Uint8Array([10, 20, 30])],
  ["/second.bin", new Uint8Array([40, 50, 60])],
]);
const handlers = createConcatenatedAssetHandlers(parts, {
  contentType: "video/mp4",
  etag: '"source-sha"',
});

function context(request: Request) {
  return {
    request,
    env: {
      ASSETS: {
        fetch: async (input: RequestInfo | URL) => {
          const path = new URL(typeof input === "string" || input instanceof URL ? input : input.url).pathname;
          const bytes = bytesByPath.get(path);
          return bytes
            ? new Response(bytes, { headers: { "Content-Length": String(bytes.length) } })
            : new Response(null, { status: 404 });
        },
      },
    },
  };
}

function request(range?: string, method = "GET") {
  return new Request("https://portfolio.example/media/demo.mp4", {
    method,
    headers: range ? { Range: range } : undefined,
  });
}

describe("concatenated Pages media asset", () => {
  it("returns the unchanged source bytes as one MP4 response", async () => {
    const response = await handlers.onRequestGet(context(request()));

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("video/mp4");
    expect(response.headers.get("Content-Length")).toBe("6");
    expect(response.headers.get("Accept-Ranges")).toBe("bytes");
    expect(response.headers.get("ETag")).toBe('"source-sha"');
    expect(Array.from(new Uint8Array(await response.arrayBuffer()))).toEqual([10, 20, 30, 40, 50, 60]);
  });

  it("serves a byte range that crosses the storage-part boundary", async () => {
    const response = await handlers.onRequestGet(context(request("bytes=2-4")));

    expect(response.status).toBe(206);
    expect(response.headers.get("Content-Range")).toBe("bytes 2-4/6");
    expect(response.headers.get("Content-Length")).toBe("3");
    expect(Array.from(new Uint8Array(await response.arrayBuffer()))).toEqual([30, 40, 50]);
  });

  it("returns a range-aware header response without loading the media body", async () => {
    const requestContext = context(request("bytes=4-", "HEAD"));
    const response = await handlers.onRequestHead(requestContext);

    expect(response.status).toBe(206);
    expect(response.headers.get("Content-Range")).toBe("bytes 4-5/6");
    expect(response.headers.get("Content-Length")).toBe("2");
    expect((await response.arrayBuffer()).byteLength).toBe(0);
  });

  it("rejects unsatisfiable ranges", async () => {
    const response = await handlers.onRequestGet(context(request("bytes=6-")));

    expect(response.status).toBe(416);
    expect(response.headers.get("Content-Range")).toBe("bytes */6");
    expect((await response.arrayBuffer()).byteLength).toBe(0);
  });
});
