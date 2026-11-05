const fs = require("fs");
const path = require("path");

const outDir = path.resolve(__dirname);

// The J contour stays fixed to Pass79's archive-proportioned silhouette.
const jPath = [
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

// Hand-traced archive orbit outer edge and inset blue field, each deliberately
// asymmetric. J is drawn last so it obscures both field and rim at the source
// crown/hook overlaps. This replaces Pass79's uniform ellipse.
const orbitOuter = [
  "M244 65",
  "C286 66 326 82 357 110",
  "C389 139 410 181 421 226",
  "C432 269 428 311 409 347",
  "C391 380 359 405 322 416",
  "C290 425 266 418 241 412",
  "C212 405 183 392 156 373",
  "C127 352 102 323 83 290",
  "C67 262 64 230 73 198",
  "C82 166 102 138 130 114",
  "C158 90 201 67 244 65",
  "Z",
].join("");
const orbitField = [
  "M244 76",
  "C281 77 318 92 346 119",
  "C376 147 397 187 406 228",
  "C416 267 412 305 393 339",
  "C375 370 349 391 319 401",
  "C291 410 268 403 244 397",
  "C216 390 188 378 163 360",
  "C136 341 113 313 96 283",
  "C81 256 79 229 87 201",
  "C96 171 114 145 139 123",
  "C165 101 205 78 244 76",
  "Z",
].join("");

const wholeSvg = (size = 468) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 468 468">
  <rect x="0" y="0" width="468" height="468" fill="#090b0e"/>
  <path id="archive-orbit-outer" d="${orbitOuter}" fill="#9f7133"/>
  <path id="archive-orb-field" d="${orbitField}" fill="#0b2633"/>
  <path id="archive-j" d="${jPath}" fill="#c79a48"/>
</svg>`;
const jOnlySvg = (size = 468, fill = "#e5e8e9") => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 468 468">
  <rect x="0" y="0" width="468" height="468" fill="#090b0e"/>
  <path id="archive-j" d="${jPath}" fill="${fill}"/>
</svg>`;
const componentSvg = (id, d, fill) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="468" height="468" viewBox="0 0 468 468">
  <rect x="0" y="0" width="468" height="468" fill="#090b0e"/>
  <path id="${id}" d="${d}" fill="${fill}"/>
</svg>`;

fs.writeFileSync(path.join(outDir, "pass80-source.svg"), wholeSvg(), "utf8");
fs.writeFileSync(path.join(outDir, "pass80-j-only.svg"), jOnlySvg(), "utf8");
fs.writeFileSync(path.join(outDir, "pass80-orbit-outer.svg"), componentSvg("archive-orbit-outer", orbitOuter, "#9f7133"), "utf8");
fs.writeFileSync(path.join(outDir, "pass80-orb-field.svg"), componentSvg("archive-orb-field", orbitField, "#0b2633"), "utf8");
for (const size of [468, 54, 32]) fs.writeFileSync(path.join(outDir, `pass80-whole-${size}.svg`), wholeSvg(size), "utf8");
fs.writeFileSync(path.join(outDir, "pass80-ringless-16.svg"), jOnlySvg(16), "utf8");
const localControl = path.join(outDir, "references", "ringless-16-control.svg");
if (!fs.existsSync(localControl)) throw new Error("Missing self-contained reference: " + localControl);
fs.copyFileSync(localControl, path.join(outDir, "separate-ringless-16-control.svg"));

const asData = (file, mime) => `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
const png = (name) => {
  const file = path.join(outDir, name);
  return fs.existsSync(file) ? asData(file, "image/png") : "";
};
const svg = (file) => asData(file, "image/svg+xml");
const cards = [
  ["ARCHIVE - 159:2", path.join(outDir, "references/archive-159-2.png"), "Uneven rim and authored overlaps are the source standard."],
  ["PASS16 - PRIOR WHOLE MARK", path.join(outDir, "references/pass16-archive-led.png"), "Editable integrated control."],
  ["PASS78 - J-ONLY CONTROL", path.join(outDir, "references/pass78-source-468.png"), "Strongest recent isolated reconstruction."],
  ["PASS79 - ELLIPSE ORBIT", path.join(outDir, "references/pass79-source.svg"), "Uniform ellipse comparison control."],
  ["PASS80 - TRACED ORBIT", path.join(outDir, "pass80-source.svg"), "Archive-shaped uneven rim and field; J masks the overlaps."],
  ["CURRENT - 1950:6", path.join(outDir, "references/current-1950-6.png"), "Production reconstruction remains below archive."],
];
const htmlCards = cards.map(([title, file, note]) => `<article><h2>${title}</h2><div class="hero"><img src="${file.endsWith(".svg") ? svg(file) : asData(file, "image/png")}" alt="${title}"></div><p>${note}</p></article>`).join("");
const html = `<!doctype html><html><head><meta charset="utf-8"><title>Pass80 uneven orbit study</title><style>
*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e8edf1;font:15px/1.4 Arial,Segoe UI,sans-serif}body{width:3020px;padding:24px}h1{margin:0;color:#f0dfb2;font-size:27px}p{color:#a8b2bc;margin:6px 0 0}.intro{margin-bottom:15px}.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}.card h2{font-size:12px;min-height:20px;margin:0 0 5px;color:#dfe5ea}.hero{height:468px;background:#080a0d;border:1px solid #39434e;display:flex;align-items:center;justify-content:center;overflow:hidden}.hero img{width:100%;height:100%;object-fit:contain}article p{font-size:11px;min-height:28px}.proofs{display:grid;grid-template-columns:repeat(6,1fr);gap:12px;margin-top:14px;border-top:1px solid #39434e;padding-top:12px}.proof{background:#11161b;border:1px solid #39434e;padding:9px}.proof h3{font-size:12px;margin:0 0 6px;color:#dde3e8}.sizes{display:flex;gap:15px}.size{text-align:center;color:#aab4bd;font-size:10px}.size img{display:block;background:#080a0d;margin-top:4px;image-rendering:pixelated;border:1px solid #37414b}.small{display:flex;gap:15px;align-items:center;border-top:1px solid #39434e;margin-top:13px;padding-top:10px;color:#aab4bd}.small img{background:#080a0d;image-rendering:pixelated;border:1px solid #37414b}.foot{color:#7e8a95;font-size:11px;margin-top:12px}</style></head><body>
<h1>PASS80 - ARCHIVE-TRACED UNEVEN ORBIT / FLAT MACRO</h1>
<p class="intro">The J silhouette is held from Pass79. Pass80 replaces the uniform ellipse with separate hand-traced outer rim and inset blue-field contours sampled from the archive's uneven oval; both are behind the J so the letter masks the crown and lower-hook overlap. Flat fills only - no filaments, texture, or material shading.</p>
<section class="grid">${htmlCards}</section>
<section class="proofs">
${[
  ["ARCHIVE", "archive"], ["PASS16", "pass16"], ["PASS78", "pass78"], ["PASS79", "pass79"], ["PASS80", "pass80"], ["CURRENT", "current"],
].map(([title, prefix]) => {
  const f54 = prefix === "pass80" ? "pass80-54-native.png" : `${prefix}-54.png`;
  const f32 = prefix === "pass80" ? "pass80-32-native.png" : `${prefix}-32.png`;
  return `<article class="proof"><h3>${title}</h3><div class="sizes"><div class="size">54px<img src="${png(f54)}" width="54" height="54"></div><div class="size">32px<img src="${png(f32)}" width="32" height="32"></div></div></article>`;
}).join("")}
</section>
<div class="small"><strong>RING-FREE 16px</strong><span>Pass80 J: <img src="${png("pass80-j-16-native.png")}" width="16" height="16"></span><span>Separate control: <img src="${png("control-16.png")}" width="16" height="16"></span><span>Full orbit mark judged at 54/32px.</span></div>
<p class="foot">Local comparison only; no Figma, shared assets, or production code changed. Pass80 is not approved. The archive remains the reference.</p>
</body></html>`;
fs.writeFileSync(path.join(outDir, "pass80-comparison.html"), html, "utf8");
console.log("Wrote Pass80 SVGs and comparison HTML.");
