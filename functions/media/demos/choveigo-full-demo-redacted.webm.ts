import { parseSingleByteRange } from "../../../src/media/demoByteRange.ts";

interface PagesContext {
  request: Request;
  env: {
    ASSETS: {
      fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    };
  };
}

function addRangeSupport(response: Response, body: BodyInit | null, status = response.status) {
  const headers = new Headers(response.headers);
  headers.set("Accept-Ranges", "bytes");
  return new Response(body, { status, headers });
}

export async function onRequestGet({ request, env }: PagesContext): Promise<Response> {
  const asset = await env.ASSETS.fetch(new Request(request.url, { method: "GET" }));
  if (!asset.ok) return asset;

  const rangeHeader = request.headers.get("range");
  if (!rangeHeader) return addRangeSupport(asset, asset.body);

  const bytes = new Uint8Array(await asset.arrayBuffer());
  const range = parseSingleByteRange(rangeHeader, bytes.byteLength);
  if (range.kind === "invalid") return addRangeSupport(asset, bytes);
  if (range.kind === "unsatisfiable") {
    const headers = new Headers(asset.headers);
    headers.set("Accept-Ranges", "bytes");
    headers.set("Content-Range", `bytes */${bytes.byteLength}`);
    headers.set("Content-Length", "0");
    return new Response(null, { status: 416, headers });
  }

  const body = bytes.slice(range.start, range.end + 1);
  const headers = new Headers(asset.headers);
  headers.set("Accept-Ranges", "bytes");
  headers.set("Content-Range", `bytes ${range.start}-${range.end}/${bytes.byteLength}`);
  headers.set("Content-Length", String(body.byteLength));
  return new Response(body, { status: 206, headers });
}

export async function onRequestHead(context: PagesContext): Promise<Response> {
  const request = new Request(context.request.url, {
    method: "GET",
    headers: context.request.headers,
  });
  const response = await onRequestGet({ ...context, request });
  return new Response(null, { status: response.status, headers: response.headers });
}
