export type ByteRangeResult =
  | { kind: "range"; start: number; end: number }
  | { kind: "invalid" }
  | { kind: "unsatisfiable" };

export function parseSingleByteRange(header: string, size: number): ByteRangeResult {
  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim());
  if (!match || size <= 0) return { kind: "invalid" };

  const [, startText, endText] = match;
  if (!startText && !endText) return { kind: "invalid" };

  if (!startText) {
    const suffixLength = Number(endText);
    if (!Number.isSafeInteger(suffixLength) || suffixLength <= 0) {
      return { kind: "unsatisfiable" };
    }
    return { kind: "range", start: Math.max(0, size - suffixLength), end: size - 1 };
  }

  const start = Number(startText);
  const requestedEnd = endText ? Number(endText) : size - 1;
  if (!Number.isSafeInteger(start) || !Number.isSafeInteger(requestedEnd) || start < 0) {
    return { kind: "invalid" };
  }
  if (start >= size || requestedEnd < start) return { kind: "unsatisfiable" };

  return { kind: "range", start, end: Math.min(requestedEnd, size - 1) };
}
