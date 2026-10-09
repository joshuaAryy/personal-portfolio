import { parseSingleByteRange } from "./demoByteRange";

export interface ConcatenatedAssetPart {
  path: string;
  byteLength: number;
}

interface PagesContext {
  request: Request;
  env: {
    ASSETS: {
      fetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response>;
    };
  };
}

interface ConcatenatedAssetMetadata {
  contentType: string;
  etag: string;
}

export function createConcatenatedAssetHandlers(
  parts: readonly ConcatenatedAssetPart[],
  metadata: ConcatenatedAssetMetadata,
) {
  const totalLength = parts.reduce((total, part) => total + part.byteLength, 0);

  function headersFor(length: number) {
    return new Headers({
      "Accept-Ranges": "bytes",
      "Content-Length": String(length),
      "Content-Type": metadata.contentType,
      ETag: metadata.etag,
    });
  }

  async function readPart(context: PagesContext, part: ConcatenatedAssetPart) {
    const url = new URL(part.path, context.request.url);
    const response = await context.env.ASSETS.fetch(url);
    if (!response.ok) throw new Error(`Unable to fetch media part ${part.path}`);

    const bytes = new Uint8Array(await response.arrayBuffer());
    if (bytes.byteLength !== part.byteLength) {
      throw new Error(`Unexpected media part length for ${part.path}`);
    }
    return bytes;
  }

  async function readRange(context: PagesContext, start: number, end: number) {
    const output = new Uint8Array(end - start + 1);
    let partStart = 0;

    for (const part of parts) {
      const partEnd = partStart + part.byteLength - 1;
      const overlapStart = Math.max(start, partStart);
      const overlapEnd = Math.min(end, partEnd);

      if (overlapStart <= overlapEnd) {
        const bytes = await readPart(context, part);
        output.set(
          bytes.subarray(overlapStart - partStart, overlapEnd - partStart + 1),
          overlapStart - start,
        );
      }

      partStart += part.byteLength;
    }

    return output;
  }

  function headResponse(request: Request) {
    const rangeHeader = request.headers.get("range");
    const headers = headersFor(totalLength);
    if (!rangeHeader) return new Response(null, { status: 200, headers });

    const range = parseSingleByteRange(rangeHeader, totalLength);
    if (range.kind === "invalid") return new Response(null, { status: 200, headers });
    if (range.kind === "unsatisfiable") {
      headers.set("Content-Range", `bytes */${totalLength}`);
      headers.set("Content-Length", "0");
      return new Response(null, { status: 416, headers });
    }

    headers.set("Content-Range", `bytes ${range.start}-${range.end}/${totalLength}`);
    headers.set("Content-Length", String(range.end - range.start + 1));
    return new Response(null, { status: 206, headers });
  }

  async function onRequestGet(context: PagesContext): Promise<Response> {
    const rangeHeader = context.request.headers.get("range");
    const range = rangeHeader ? parseSingleByteRange(rangeHeader, totalLength) : { kind: "invalid" as const };
    if (range.kind === "unsatisfiable") {
      const headers = headersFor(0);
      headers.set("Content-Range", `bytes */${totalLength}`);
      return new Response(null, { status: 416, headers });
    }

    const selectedRange = range.kind === "range"
      ? range
      : { start: 0, end: totalLength - 1 };

    try {
      const bytes = await readRange(context, selectedRange.start, selectedRange.end);
      const headers = headersFor(bytes.byteLength);
      if (range.kind === "range") {
        headers.set("Content-Range", `bytes ${range.start}-${range.end}/${totalLength}`);
      }
      return new Response(bytes, { status: range.kind === "range" ? 206 : 200, headers });
    } catch {
      return new Response("Unable to load the complete demo media.", { status: 502 });
    }
  }

  async function onRequestHead(context: PagesContext): Promise<Response> {
    return headResponse(context.request);
  }

  return { onRequestGet, onRequestHead };
}
