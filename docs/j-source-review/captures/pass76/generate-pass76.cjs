const fs = require("fs");
const path = require("path");

const outDir = path.resolve("docs/j-source-review/captures/pass76");
const reviewDir = path.resolve("docs/j-source-review");
fs.mkdirSync(outDir, { recursive: true });
function data(file, mime) {
  return "data:" + mime + ";base64," + fs.readFileSync(file).toString("base64");
}
function png(file) {
  return data(path.resolve(file), "image/png");
}
function pathsFrom(file) {
  return [...fs.readFileSync(file, "utf8").matchAll(/<path[^>]*d="([^"]+)"/g)].map((m) => m[1]);
}
function firstPath(file) {
  const p = pathsFrom(file);
  if (!p.length) throw new Error("No path in " + file);
  return p[0];
}

const refs = [
  { title: "ARCHIVE - 159:2", note: "Approved whole-mark standard.", image: png("docs/j-source-review/01-archive-target-159-2.png") },
  { title: "CURRENT - 1950:6", note: "Reconstruction; not presumed stronger than archive.", image: png("docs/j-source-review/03-current-hero-1950-6.png") },
  { title: "UPPER SERIF - 2662:47", note: "Upper-shoulder study 01.", image: png("docs/j-source-review/captures/upper-serif-pass-01/hero-after-468.png") },
  { title: "UPPER SERIF - 2668:6", note: "Upper-shoulder study 02.", image: png("docs/j-source-review/captures/upper-serif-pass-02/hero-after-468.png") },
  { title: "PASS16 - ARCHIVE-LED WHOLE MARK", note: "Earlier tapered crown / narrower stem / rising hook; ring retained.", image: png("docs/j-source-review/pass16-archive-led-j-468-2026-09-29.png") },
  { title: "PASS35 - SEED CROP", note: "Earlier archive trace; used as lineage reference, not the base.", image: png("docs/j-source-review/captures/pass59/pass35-seed-crop.png") },
];

const pass63B = firstPath("docs/j-source-review/captures/pass63/pass63-b-shape.svg");
const pass71 = pathsFrom("docs/j-source-review/captures/pass71/pass71-source.svg")[1];
const pass72 = pathsFrom("docs/j-source-review/captures/pass72/pass72-source.svg")[1];
if (!pass71 || !pass72) throw new Error("Pass71/72 J source missing.");
const transform = 'transform="translate(-5.2 5) scale(.67 .738)"';
const jStroke = 'stroke="#8A9098" stroke-width="9" stroke-linejoin="round"';
const jFill = "#D7DADF";
const proofFill = "#EEF1F3";

// Pass76 is archivePath/Pass63B's vertical body, given a sloped, fuller,
// asymmetrical crown and a Pass72-style rising tapered hook. The main shaft,
// lower bowl reach, counter and scale transform stay close to the archive-led
// base. No energy sweep or surface treatment is included.
const pass76Path = "M195 64C222 49 257 42 297 46C346 51 440 54 445 61C450 70 425 112 425 136L429 413C430 467 414 513 383 548C354 580 314 596 273 591C234 586 199 566 179 538C161 512 158 483 165 455C172 430 186 410 204 397C220 384 239 366 248 363C252 362 256 365 259 372C265 384 269 396 272 407C275 417 265 423 253 424C240 441 232 456 233 472C234 495 253 510 280 514C309 518 337 509 356 490C374 470 383 444 383 411L364 143C364 126 358 114 339 107C310 99 278 91 245 82C228 78 210 70 195 64Z";

// Two low-contrast, asymmetric orbital arcs sit behind the J. Their endpoints
// tuck below the crown and into the hook, while the broad counter stays clear.
const orbitLeft = "M166 55C98 84 64 153 71 222C76 268 103 309 146 337";
const orbitRight = "M285 59C364 83 402 151 395 220C389 272 355 319 311 347C289 361 266 374 246 382";

function svgMark(mark, size, withOrbit) {
  const orbit = withOrbit
    ? '<g fill="none" stroke="#6C7680" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="' + orbitLeft + '"/><path d="' + orbitRight + '"/></g>'
    : "";
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="#090C10"/>' + orbit + '<path d="' + mark + '" ' + transform + ' ' + jStroke + ' fill="' + jFill + '"/></svg>';
}
function imageCard(item) {
  const art = item.image
    ? '<img src="' + item.image + '" alt="' + item.title + '">'
    : svgMark(item.path, 468, item.orbit || false);
  return '<article class="card"><div class="title">' + item.title + '</div><div class="hero">' + art + '</div><div class="note">' + item.note + '</div></article>';
}
function proofCard(item) {
  const sizes = [54, 32];
  const pair = sizes.map((size) => {
    const art = item.image
      ? '<img src="' + item.image + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">'
      : '<img src="data:image/svg+xml;base64,' + Buffer.from(svgMark(item.path, size, item.orbit || false)).toString("base64") + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">';
    return '<div class="proof-item"><span>' + size + 'px</span><div class="proof-box">' + art + '</div></div>';
  }).join("");
  return '<article class="proof"><div class="proof-title">' + item.title + '</div><div class="proof-pair">' + pair + '</div></article>';
}
function proofSvg(pathData, size, withOrbit) {
  return svgMark(pathData, size, withOrbit).replace(/fill="#D7DADF"/g, 'fill="' + proofFill + '"');
}

const vectorRefs = [
  { title: "PASS63B - ARCHIVE TRACE + VERTICAL WEIGHT", note: "Archive-derived base; still carries a thin, level crown.", path: pass63B },
  { title: "PASS71 - DEEPER SHOULDER CONTROL", note: "Local shoulder control; frozen as comparison only.", path: pass71 },
  { title: "PASS72 - LIFTED HOOK CONTROL", note: "Local hook control; frozen as comparison only.", path: pass72 },
  { title: "PASS76 - FULLER CROWN / RISING HOOK", note: "Archive-led crown and Pass72 rising hook on a vertical shaft.", path: pass76Path },
];
const wholeMarks = [
  refs[0], refs[1], refs[4],
  { title: "PASS76 - OPEN ORBIT CONTEXT", note: "Same flat J; two low-contrast open arcs are occluded at crown/hook.", path: pass76Path, orbit: true },
];
const proofs = [
  { title: "ARCHIVE - 159:2", image: refs[0].image },
  { title: "CURRENT - 1950:6", image: refs[1].image },
  { title: "PASS63B - ARCHIVE TRACE", path: pass63B },
  { title: "PASS71 - SHOULDER CONTROL", path: pass71 },
  { title: "PASS72 - HOOK CONTROL", path: pass72 },
  { title: "PASS76 - J ONLY", path: pass76Path },
  { title: "PASS76 - OPEN ORBIT", path: pass76Path, orbit: true },
];
const p16ringless = data(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), "image/svg+xml");

const html = [
  '<!doctype html><html><head><meta charset="utf-8"><title>Pass76 - archive-led macro comparison</title><style>',
  '*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:3000px;padding:28px}',
  'h1{margin:0 0 7px;font-size:29px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:16px;max-width:2860px}',
  '.section{border-top:1px solid #343c45;padding-top:12px;margin-top:14px}h2{font-size:19px;color:#e7d6a8;margin:0 0 10px}',
  '.grid6{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}.grid4{display:grid;grid-template-columns:repeat(4,468px);justify-content:center;gap:12px}.card{min-width:0}.title{font-size:12px;font-weight:700;color:#dce2e8;min-height:24px}.hero{height:330px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center;overflow:hidden}.hero img{width:100%;height:100%;object-fit:contain}.hero svg{width:100%;height:100%;object-fit:contain}.note{font-size:10px;color:#939faa;margin-top:5px;min-height:27px;line-height:1.3}',
  '.vectorGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:13px}.vectorCard{min-width:0}.vectorCard .hero{height:468px}.proofGrid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}.proof{min-width:0;border:1px solid #38414b;background:#11161b;padding:8px}.proof-title{font-size:10px;font-weight:700;color:#dce2e8;min-height:26px}.proof-pair{display:flex;gap:8px;align-items:flex-start}.proof-item{text-align:center;font-size:9px;color:#d1d7dd}.proof-item span{display:block;margin-bottom:4px}.proof-box{width:58px;height:58px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.proof-box img{object-fit:contain;image-rendering:pixelated}.micro{margin-top:11px;border:1px dashed #46515d;padding:10px 13px;color:#aab4bd;display:flex;align-items:center;gap:13px;font-size:12px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:10px;color:#788591;margin-top:9px}',
  '</style></head><body>',
  '<h1>PASS76 - ARCHIVE-LED MACRO REFIT</h1>',
  '<div class="intro">Starting from Pass63B\'s archive-derived vertical silhouette, Pass76 builds a fuller sloped crown/shoulder and uses Pass72\'s rising hook contour. The J-only row isolates silhouette; the separate whole-mark row tests a sparse open orbit without sweep, plasma, material texture, or energy detail. All candidate proof sizes use the same transform.</div>',
  '<section class="section"><h2>WHOLE-MARK / ORBIT CONTEXT - ARCHIVE / CURRENT / PASS16 / PASS76</h2><div class="grid4">', wholeMarks.map(imageCard).join(""), '</div></section>',
  '<section class="section"><h2>468px J-ONLY MACRO COMPARISON - PASS63B / PASS71 / PASS72 / PASS76</h2><div class="vectorGrid">', vectorRefs.map((item) => '<article class="vectorCard"><div class="title">' + item.title + '</div><div class="hero">' + svgMark(item.path, 468, false) + '</div><div class="note">' + item.note + '</div></article>').join(""), '</div></section>',
  '<section class="section"><h2>REFERENCE LINEAGE - ARCHIVE / CURRENT / UPPER SERIFS / PASS16 / PASS35</h2><div class="grid6">', refs.map(imageCard).join(""), '</div></section>',
  '<section class="section"><h2>NATIVE 54px / 32px READ - ARCHIVE / CURRENT / PASS63B / PASS71 / PASS72 / PASS76</h2><div class="proofGrid">', proofs.map(proofCard).join(""), '</div>',
  '<div class="micro"><strong>SEPARATE 16px RING-FREE CONTROL</strong><img src="' + p16ringless + '" width="16" height="16" alt="Pass16 ring-free glyph"><span>Unchanged simplified 16px vector; separate from the orbit mark.</span></div></section>',
  '<div class="footer">Local exploratory comparison only. Pass63B, Pass71, Pass72, archive/current artwork, and the Pass16 glyph are reference inputs. Pass76 is not approved; no Figma/shared asset/production edit.</div>',
  '</body></html>',
].join("");

fs.writeFileSync(path.join(outDir, "pass76-macro-comparison.html"), html, "utf8");
fs.writeFileSync(path.join(outDir, "pass63b-control-468.svg"), svgMark(pass63B, 468, false), "utf8");
fs.writeFileSync(path.join(outDir, "pass71-control-468.svg"), svgMark(pass71, 468, false), "utf8");
fs.writeFileSync(path.join(outDir, "pass72-control-468.svg"), svgMark(pass72, 468, false), "utf8");
fs.writeFileSync(path.join(outDir, "pass76-source.svg"), svgMark(pass76Path, 468, false), "utf8");
fs.writeFileSync(path.join(outDir, "pass76-orbit-context-468.svg"), svgMark(pass76Path, 468, true), "utf8");
for (const size of [54, 32]) {
  fs.writeFileSync(path.join(outDir, "pass63b-control-" + size + ".svg"), svgMark(pass63B, size, false), "utf8");
  fs.writeFileSync(path.join(outDir, "pass71-control-" + size + ".svg"), svgMark(pass71, size, false), "utf8");
  fs.writeFileSync(path.join(outDir, "pass72-control-" + size + ".svg"), svgMark(pass72, size, false), "utf8");
  fs.writeFileSync(path.join(outDir, "pass76-" + size + ".svg"), svgMark(pass76Path, size, false), "utf8");
  fs.writeFileSync(path.join(outDir, "pass76-orbit-context-" + size + ".svg"), svgMark(pass76Path, size, true), "utf8");
}
for (const size of [468, 54, 32, 16]) {
  fs.writeFileSync(path.join(outDir, "pass76-j-only-" + size + ".svg"), proofSvg(pass76Path, size, false), "utf8");
}
fs.copyFileSync(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), path.join(outDir, "pass76-16-ringless-control.svg"));
console.log("Wrote Pass76 archive-led macro source, orbit context, proof SVGs and comparison board.");
