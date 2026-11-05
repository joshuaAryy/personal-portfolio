const fs = require("fs");
const path = require("path");

const root = path.resolve("docs/j-source-review");
const outDir = path.resolve("docs/j-source-review/captures/pass72");
fs.mkdirSync(outDir, { recursive: true });

function dataUri(file, mime) {
  return "data:" + mime + ";base64," + fs.readFileSync(file).toString("base64");
}
function readPaths(file) {
  const svg = fs.readFileSync(file, "utf8");
  return [...svg.matchAll(/<path[^>]*d="([^"]+)"/g)].map((m) => m[1]);
}
function readFirstPath(file) {
  const paths = readPaths(file);
  if (!paths.length) throw new Error("No SVG path in " + file);
  return paths[0];
}
function png(file) {
  return dataUri(path.resolve(file), "image/png");
}

const refs = {
  archive: png("docs/j-source-review/01-archive-target-159-2.png"),
  current: png("docs/j-source-review/03-current-hero-1950-6.png"),
  pass16: dataUri(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), "image/svg+xml"),
};
const pass71Paths = readPaths(path.resolve("docs/j-source-review/captures/pass71/pass71-source.svg"));
if (pass71Paths.length !== 2) throw new Error("Expected frozen Pass70 sweep and Pass71 J paths.");
const sweep = pass71Paths[0];
const pass71E = pass71Paths[1];
const pass64E = readFirstPath(path.resolve("docs/j-source-review/captures/pass64/pass64-e-468.svg"));
const pass64F = readFirstPath(path.resolve("docs/j-source-review/captures/pass64/pass64-f-468.svg"));
const hookE = "C220 385 239 370 248 368C252 367 256 369 259 374C264 383 268 395 271 405C274 414 263 421 253 424";
const hookF = "C218 385 238 361 249 356C253 354 257 357 260 362C266 371 270 383 274 393C278 405 266 419 253 424";
const hookIntermediate = "C219 385 239 366 249 362C253 361 257 363 260 368C265 377 269 389 273 399C276 410 265 420 253 424";
if (!pass71E.includes(hookE)) throw new Error("Pass71 no longer uses Pass64 E terminal; refusing to change the wrong segment.");
const pass71F = pass71E.replace(hookE, hookF);
const pass72 = pass71E.replace(hookE, hookIntermediate);
if (pass71F === pass71E || pass72 === pass71E) throw new Error("Hook substitution failed.");

const transform = 'transform="translate(-5.2 5) scale(.67 .738)" stroke="#D7DADF" stroke-width="9" stroke-linejoin="round"';
function svgMark(pathData, size, background, withSweep) {
  const behind = withSweep
    ? '<path d="' + sweep + '" fill="none" stroke="#77808A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
    : "";
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="' + background + '"/>' + behind + '<path d="' + pathData + '" ' + transform + ' fill="#D7DADF"/></svg>';
}
function uri(pathData, size, withSweep) {
  return "data:image/svg+xml;base64," + Buffer.from(svgMark(pathData, size, "#07090C", withSweep)).toString("base64");
}

const macroCards = [
  { title: "ARCHIVE · 159:2", note: "Approved whole-mark first-read standard.", image: refs.archive },
  { title: "CURRENT · 1950:6", note: "Unchanged reconstruction comparison.", image: refs.current },
  { title: "PASS71 · FIXED E-TERMINAL BASE", note: "Deepened crown; Pass70 sweep; E terminal.", path: pass71E, sweep: true },
  { title: "PASS64 E · PRIOR TERMINAL REF", note: "Raw prior E path/proportions, included as a hook reference.", path: pass64E },
  { title: "PASS64 F · PRIOR TERMINAL REF", note: "Raw prior F path; stronger wedge/claw comparison.", path: pass64F },
  { title: "PASS71 F-CONTROL · SAME BASE", note: "F terminal transplanted onto the fixed Pass71 crown/upright.", path: pass71F, sweep: true },
  { title: "PASS72 · INTERMEDIATE RISING TAPER", note: "Midway lift between E and F; smooth return and open counter held.", path: pass72, sweep: true },
];
const proofCards = [
  { title: "ARCHIVE · 159:2", image: refs.archive },
  { title: "CURRENT · 1950:6", image: refs.current },
  { title: "PASS64 E · PRIOR REF", path: pass64E },
  { title: "PASS64 F · PRIOR REF", path: pass64F },
  { title: "PASS71 · FIXED E BASE", path: pass71E, sweep: true },
  { title: "PASS71 F-CONTROL · SAME BASE", path: pass71F, sweep: true },
  { title: "PASS72 · INTERMEDIATE", path: pass72, sweep: true },
];

function card(item) {
  const content = item.image
    ? '<img src="' + item.image + '" alt="' + item.title + '">'
    : svgMark(item.path, 468, "#090C10", !!item.sweep);
  return '<article class="card"><div class="title">' + item.title + '</div><div class="hero">' + content + '</div><div class="note">' + item.note + '</div></article>';
}
function proofCard(item) {
  const pair = [54, 32].map((size) => {
    const art = item.image
      ? '<img src="' + item.image + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">'
      : '<img src="' + uri(item.path, size, !!item.sweep) + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">';
    return '<div class="proof-item"><span>' + size + 'px</span><div class="proof-box">' + art + '</div></div>';
  }).join("");
  return '<article class="proof"><div class="proof-title">' + item.title + '</div><div class="proof-pair">' + pair + '</div></article>';
}

const html = [
  '<!doctype html><html><head><meta charset="utf-8"><title>Pass72 · intermediate hook taper</title><style>',
  '*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:3000px;padding:30px 28px}',
  'h1{margin:0 0 7px;font-size:30px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:17px;max-width:2850px}',
  '.section{border-top:1px solid #343c45;padding-top:13px;margin-top:15px}h2{font-size:19px;color:#e7d6a8;margin:0 0 10px}',
  '.grid3{display:grid;grid-template-columns:repeat(3,468px);justify-content:center;gap:14px}.grid4{display:grid;grid-template-columns:repeat(4,468px);justify-content:center;gap:10px}.card{width:468px;min-width:468px}.title{font-size:12px;font-weight:700;color:#dce2e8;height:20px;white-space:nowrap}',
  '.hero{width:468px;height:468px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center;overflow:hidden}.hero svg,.hero img{width:468px;height:468px;object-fit:contain}.note{font-size:10px;color:#939faa;margin-top:5px;height:25px}',
  '.proof-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:9px;margin-top:10px}.proof{min-width:0;border:1px solid #38414b;background:#11161b;padding:8px}.proof-title{font-size:10px;font-weight:700;color:#dce2e8;height:27px}.proof-pair{display:flex;gap:12px;align-items:flex-start}.proof-item{text-align:center;font-size:9px;color:#d1d7dd}.proof-item span{display:block;margin-bottom:4px}.proof-box{width:60px;height:60px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.proof-box img{image-rendering:pixelated;object-fit:contain}.micro{margin-top:11px;border:1px dashed #46515d;padding:10px 13px;color:#aab4bd;display:flex;align-items:center;gap:13px;font-size:12px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:10px;color:#788591;margin-top:9px}',
  '</style></head><body>',
  '<h1>PASS72 · INTERMEDIATE RISING HOOK TAPER</h1>',
  '<div class="intro">Pass71 crown and Pass70 sweep are fixed. The Pass67 upright/bowl/counter stay fixed; only the outer hook terminal changes. Pass72 interpolates the Pass64 E and F terminal controls: a moderate lift with a smooth return, avoiding E’s rounder tip and F’s claw/barb. Pass16 stays ring-free and unchanged.</div>',
  '<section class="section"><h2>468px FIRST READ · ARCHIVE / CURRENT / FIXED PASS71 BASE</h2><div class="grid3">', macroCards.slice(0, 3).map(card).join(""), '</div></section>',
  '<section class="section"><h2>468px HOOK SHAPE REFS AND VARIANTS · PASS64 E/F / SAME-BASE CONTROL / PASS72</h2><div class="grid4">', macroCards.slice(3).map(card).join(""), '</div></section>',
  '<section class="section"><h2>NATIVE 54px / 32px PROOFS · PRIOR E/F AND FIXED PASS71 BASE</h2><div class="proof-grid">', proofCards.map(proofCard).join(""), '</div>',
  '<div class="micro"><strong>SEPARATE 16px RING-FREE CONTROL</strong><img src="', refs.pass16, '" width="16" height="16" alt="ring-free 16px J"><span>Pass16 simplified glyph; unchanged.</span></div></section>',
  '<div class="footer">Pass72 local macro-hook study only. Pass71 crown, Pass70 sweep, Pass67 shaft/bowl/counter, and Pass16 control are unchanged. No Figma, shared-asset, or production edits; no approval implied.</div>',
  '</body></html>'
].join("");

fs.writeFileSync(path.join(outDir, "pass72-hook-taper-comparison.html"), html, "utf8");
const vectorExports = [
  ["pass64-e-reference", pass64E, false],
  ["pass64-f-reference", pass64F, false],
  ["pass71-e-base", pass71E, true],
  ["pass71-f-control", pass71F, true],
  ["pass72", pass72, true],
];
for (const [id, pathData, withSweep] of vectorExports) {
  fs.writeFileSync(path.join(outDir, id + "-468.svg"), svgMark(pathData, 468, "#090C10", withSweep), "utf8");
  for (const size of [54, 32]) fs.writeFileSync(path.join(outDir, id + "-" + size + ".svg"), svgMark(pathData, size, "#07090C", withSweep), "utf8");
}
fs.writeFileSync(path.join(outDir, "pass72-source.svg"), svgMark(pass72, 468, "#090C10", true), "utf8");
console.log("Wrote Pass72 hook comparison HTML and 468/54/32 SVG proofs.");
