const fs = require("fs");
const path = require("path");

const outDir = path.resolve(__dirname);
fs.mkdirSync(outDir, { recursive: true });

// Flat macro trace from archive 159:2. The broad, slightly rising cap enters
// a substantial upright; the lower bowl stays open and returns into a rising
// hook. The one orbit sits behind the J, so the J covers the rim at its crown.
const pathD = [
  "M143 46",
  "C184 42 299 42 346 43",
  "C349 49 338 61 322 72",
  "C307 81 296 88 292 101",
  "C291 106 291 112 291 120",
  "L291 294",
  "C291 328 287 357 270 380",
  "C253 402 229 411 204 405",
  "C179 399 158 383 147 362",
  "C136 342 137 320 147 301",
  "C157 283 176 273 197 270",
  "C215 268 231 271 240 279",
  "C231 283 219 291 209 302",
  "C196 317 190 331 191 346",
  "C192 363 207 374 227 376",
  "C249 378 269 363 275 342",
  "C280 326 277 307 255 295",
  "L255 120",
  "C255 105 248 96 231 89",
  "C202 78 170 65 143 46",
  "Z",
].join("");

const wholeSvg = (size = 468) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 468 468">
  <rect x="0" y="0" width="468" height="468" fill="#090b0e"/>
  <ellipse cx="244" cy="240" rx="177" ry="178" fill="#0b2633" stroke="#a47432" stroke-width="10"/>
  <path d="${pathD}" fill="#c79a48"/>
</svg>`;

const jOnlySvg = (size = 468, fill = "#e5e8e9") => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 468 468">
  <rect x="0" y="0" width="468" height="468" fill="#090b0e"/>
  <path d="${pathD}" fill="${fill}"/>
</svg>`;

fs.writeFileSync(path.join(outDir, "pass79-source.svg"), wholeSvg(), "utf8");
fs.writeFileSync(path.join(outDir, "pass79-j-only.svg"), jOnlySvg(), "utf8");
for (const size of [468, 54, 32]) {
  fs.writeFileSync(path.join(outDir, `pass79-whole-${size}.svg`), wholeSvg(size), "utf8");
}
fs.writeFileSync(path.join(outDir, "pass79-ringless-16.svg"), jOnlySvg(16), "utf8");
const control16 = path.join(outDir, "references", "ringless-16-control.svg");
if (!fs.existsSync(control16)) throw new Error("Missing self-contained reference: " + control16);
fs.copyFileSync(control16, path.join(outDir, "separate-ringless-16-control.svg"));

function data(file, mime) {
  return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
}
function png(file) {
  return data(path.resolve(file), "image/png");
}
function localPng(name) {
  return png(path.join(outDir, name));
}

const referenceCards = [
  ["ARCHIVE - 159:2", path.join(outDir, "references", "archive-159-2.png"), "Approved first-read standard; raster treatment remains stronger."],
  ["CURRENT - 1950:6", path.join(outDir, "references", "current-1950-6.png"), "Current vector reconstruction; not presumed stronger than archive."],
  ["PASS16 - ARCHIVE-LED", path.join(outDir, "references", "pass16-archive-led.png"), "Prior integrated vector study."],
  ["PASS78 - SHAFT STUDY", path.join(outDir, "references", "pass78-source-468.png"), "Recent orbit-free shaft proportion study."],
  ["PASS79 - ARCHIVE TRACE", path.join(outDir, "pass79-source.svg"), "Flat crown, upright, hook, blue field and interrupted-by-J orbit."],
];
const imageData = (file) => file.endsWith(".svg")
  ? data(file, "image/svg+xml")
  : png(file);
const htmlCards = referenceCards.map(([title, file, note]) => `
  <article class="card"><h2>${title}</h2><div class="hero"><img src="${imageData(file)}" alt="${title}"></div><p>${note}</p></article>`).join("");
const html = `<!doctype html><html><head><meta charset="utf-8"><title>Pass79 archive-led macro study</title>
<style>
*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e8edf1;font:15px/1.4 Arial,Segoe UI,sans-serif}body{width:2480px;padding:24px}h1{margin:0;color:#f0dfb2;font-size:28px}p{color:#a8b2bc;margin:7px 0 0}.intro{max-width:2350px;margin:5px 0 16px}.row{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}.card h2{font-size:14px;min-height:22px;margin:0 0 5px;color:#dfe5ea}.hero{height:468px;background:#080a0d;border:1px solid #3a444e;display:flex;align-items:center;justify-content:center;overflow:hidden}.hero img{width:100%;height:100%;object-fit:contain}.proofs{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-top:18px;border-top:1px solid #39434e;padding-top:13px}.proof{background:#11161b;border:1px solid #39434e;padding:10px}.proof h3{font-size:13px;margin:0 0 8px;color:#dde3e8}.sizes{display:flex;gap:18px;align-items:flex-start}.size{text-align:center;color:#aab4bd;font-size:11px}.size img{display:block;background:#080a0d;margin-top:5px;image-rendering:pixelated;border:1px solid #37414b}.small{display:flex;gap:16px;align-items:center;border-top:1px solid #39434e;margin-top:18px;padding-top:12px;color:#aab4bd}.small img{background:#080a0d;image-rendering:pixelated;border:1px solid #37414b}.foot{color:#7e8a95;font-size:11px;margin-top:14px}
</style></head><body>
<h1>PASS79 - ARCHIVE-LED FLAT MACRO STUDY</h1>
<p class="intro">A single simplified trace studies the archive crown, substantial upright, rising hook, blue orb and orbital overlap as one broad identity. The ellipse is behind the J and is covered where the crown crosses it. The mark is flat by design: this comparison judges macro shape and proportion, not archive texture. Local exploratory study only.</p>
<section class="row">${htmlCards}</section>
<section class="proofs">
  <article class="proof"><h3>ARCHIVE 159:2</h3><div class="sizes"><div class="size">54px<img src="${localPng("archive-54.png")}" width="54" height="54"></div><div class="size">32px<img src="${localPng("archive-32.png")}" width="32" height="32"></div></div></article>
  <article class="proof"><h3>CURRENT 1950:6</h3><div class="sizes"><div class="size">54px<img src="${localPng("current-54.png")}" width="54" height="54"></div><div class="size">32px<img src="${localPng("current-32.png")}" width="32" height="32"></div></div></article>
  <article class="proof"><h3>PASS16 PRIOR STUDY</h3><div class="sizes"><div class="size">54px<img src="${localPng("pass16-54.png")}" width="54" height="54"></div><div class="size">32px<img src="${localPng("pass16-32.png")}" width="32" height="32"></div></div></article>
  <article class="proof"><h3>PASS78 SHAFT STUDY</h3><div class="sizes"><div class="size">54px<img src="${localPng("pass78-54.png")}" width="54" height="54"></div><div class="size">32px<img src="${localPng("pass78-32.png")}" width="32" height="32"></div></div></article>
  <article class="proof"><h3>PASS79 CANDIDATE</h3><div class="sizes"><div class="size">54px<img src="${localPng("pass79-54-native.png")}" width="54" height="54"></div><div class="size">32px<img src="${localPng("pass79-32-native.png")}" width="32" height="32"></div></div></article>
</section>
<div class="small"><strong>RING-FREE 16px</strong><span>Pass79 J reduction: <img src="${localPng("pass79-j-16-native.png")}" width="16" height="16" alt="Pass79 J ring-free 16px"></span><span>Separate simplified control: <img src="${localPng("control-16.png")}" width="16" height="16" alt="Ring-free 16px control"></span><span>The 16px comparison is glyph-only; the full orbit mark is shown at 54/32px.</span></div>
<p class="foot">No Figma, shared identity asset, or production code changed. The archive remains the visual standard; Pass79 is not approved.</p>
</body></html>`;
fs.writeFileSync(path.join(outDir, "pass79-comparison.html"), html, "utf8");
console.log("Wrote Pass79 SVG source and HTML board skeleton.");
