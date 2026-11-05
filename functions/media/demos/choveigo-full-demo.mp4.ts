import { createConcatenatedAssetHandlers } from "../../../src/media/concatenatedAsset.ts";

const handlers = createConcatenatedAssetHandlers(
  [
    {
      path: "/media/demos/choveigo-original/part-1.bin",
      byteLength: 16_000_000,
    },
    {
      path: "/media/demos/choveigo-original/part-2.bin",
      byteLength: 16_915_943,
    },
  ],
  {
    contentType: "video/mp4",
    etag: '"sha256-1C637A4AD7A197D7073DA88534CF8D54B660C85DF16B75FA25F955D16E94C801"',
  },
);

export const { onRequestGet, onRequestHead } = handlers;
