const fs = require("fs");
const path = require("path");

const outDir = path.resolve("docs/j-source-review/captures/pass78");
fs.mkdirSync(outDir, { recursive: true });
function data(file, mime) {
  return "data:" + mime + ";base64," + fs.readFileSync(file).toString("base64");
}
function image(file) {
  return data(path.resolve(file), "image/png");
}
function pathsFrom(file) {
  return [...fs.readFileSync(file, "utf8").matchAll(/<path[^>]*d="([^"]+)"/g)].map((m) => m[1]);
}
function firstPath(file) {
  const paths = pathsFrom(file);
  if (!paths.length) throw new Error("No SVG path in " + file);
  return paths[0];
}

const refs = [
  { title: "ARCHIVE - 159:2", note: "Approved first-read standard.", image: image("docs/j-source-review/01-archive-target-159-2.png") },
  { title: "CURRENT - 1950:6", note: "Current reconstruction; not presumed stronger than archive.", image: image("docs/j-source-review/03-current-hero-1950-6.png") },
  { title: "UPPER SERIF - 2662:47", note: "Upper-shoulder study 01.", image: image("docs/j-source-review/captures/upper-serif-pass-01/hero-after-468.png") },
  { title: "UPPER SERIF - 2668:6", note: "Upper-shoulder study 02.", image: image("docs/j-source-review/captures/upper-serif-pass-02/hero-after-468.png") },
  { title: "PASS16 - PRIOR ARCHIVE-LED MARK", note: "Prior integrated mark; retained orbit for lineage comparison.", image: image("docs/j-source-review/pass16-archive-led-j-468-2026-09-29.png") },
  { title: "PASS35 - ARCHIVE SEED", note: "Earlier trace seed, not the current base.", image: image("docs/j-source-review/captures/pass59/pass35-seed-crop.png") },
];

const pass63b = firstPath("docs/j-source-review/captures/pass63/pass63-b-shape.svg");
const pass71 = pathsFrom("docs/j-source-review/captures/pass71/pass71-source.svg")[1];
const pass72 = pathsFrom("docs/j-source-review/captures/pass72/pass72-source.svg")[1];
const pass76 = firstPath("docs/j-source-review/captures/pass76/pass76-source.svg");
const pass77 = firstPath("docs/j-source-review/captures/pass77/pass77-source.svg");
if (!pass71 || !pass72) throw new Error("Pass71/72 controls are missing.");

// Pass78 branches directly from Pass76. At mid-height its outer shaft edge is
// 12 source units beyond Pass76's baseline line; it is not +12 beyond Pass77.
// Crown, inner edge/counter, bowl, hook, endpoints, and total height stay fixed.
const originalShaft = "425 136L429 413";
if (!pass76.includes(originalShaft)) throw new Error("Pass76 shaft segment did not match the expected baseline.");
const pass78 = pass76.replace(originalShaft, "425 136C437 173 439 220 439 274C439 324 434 371 429 413");

const shapeTransform = 'transform="translate(-5.2 5) scale(.67 .738)"';
const shapeStroke = 'stroke="#8A9098" stroke-width="9" stroke-linejoin="round"';
const shapeFill = "#D7DADF";
const proofFill = "#EEF1F3";
function svgMark(d, size, fill = shapeFill) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="#090C10"/><path d="' + d + '" ' + shapeTransform + ' ' + shapeStroke + ' fill="' + fill + '"/></svg>';
}
function proofSvg(d, size) {
  return svgMark(d, size, proofFill);
}
function card(item) {
  const art = item.image ? '<img src="' + item.image + '" alt="' + item.title + '">' : svgMark(item.path, 468);
  return '<article class="card"><div class="title">' + item.title + '</div><div class="hero">' + art + '</div><div class="note">' + item.note + '</div></article>';
}
function proof(item) {
  const sample = (size) => {
    const art = item.image
      ? '<img src="' + item.image + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">'
      : '<img src="data:image/svg+xml;base64,' + Buffer.from(proofSvg(item.path, size)).toString("base64") + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">';
    return '<div class="proof-item"><span>' + size + 'px</span><div class="proof-box">' + art + '</div></div>';
  };
  return '<article class="proof"><div class="proof-title">' + item.title + '</div><div class="proof-pair">' + sample(54) + sample(32) + '</div></article>';
}

const vectors = [
  { title: "PASS63B - ARCHIVE TRACE", note: "Vertical-weight control.", path: pass63b },
  { title: "PASS71 - SHOULDER CONTROL", note: "Deeper-shoulder control.", path: pass71 },
  { title: "PASS72 - HOOK CONTROL", note: "Lifted-hook control.", path: pass72 },
  { title: "PASS76 - FROZEN BASE", note: "Unchanged baseline; same height.", path: pass76 },
  { title: "PASS77 - INTERMEDIATE WIDTH", note: "Pass76 outer shaft gained up to 6 path units.", path: pass77 },
  { title: "PASS78 - OUTER SHAFT +12", note: "Pass76 outer shaft gained up to 12 path units; inner counter unchanged.", path: pass78 },
];
const proofItems = [
  { title: "ARCHIVE", image: refs[0].image },
  { title: "CURRENT", image: refs[1].image },
  { title: "PASS63B", path: pass63b },
  { title: "PASS71", path: pass71 },
  { title: "PASS72", path: pass72 },
  { title: "PASS76", path: pass76 },
  { title: "PASS77", path: pass77 },
  { title: "PASS78", path: pass78 },
];
const control16 = data(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), "image/svg+xml");
const refsHtml = refs.map(card).join("");
const vectorsHtml = vectors.map((item) => '<article class="vector-card"><div class="title">' + item.title + '</div><div class="hero">' + svgMark(item.path, 468) + '</div><div class="note">' + item.note + '</div></article>').join("");
const proofsHtml = proofItems.map(proof).join("");

const html = [
  '<!doctype html><html><head><meta charset="utf-8"><title>Pass78 - isolated shaft weight</title><style>',
  '*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:3600px;padding:28px}',
  'h1{margin:0 0 7px;font-size:29px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:16px;max-width:3500px}',
  '.section{border-top:1px solid #343c45;padding-top:12px;margin-top:14px}h2{font-size:19px;color:#e7d6a8;margin:0 0 10px}.grid6{display:grid;grid-template-columns:repeat(6,1fr);gap:10px}',
  '.card,.vector-card{min-width:0}.title{font-size:12px;font-weight:700;color:#dce2e8;min-height:24px}.hero{height:340px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center;overflow:hidden}.hero img,.hero svg{width:100%;height:100%;object-fit:contain}.note{font-size:10px;color:#939faa;margin-top:5px;min-height:27px;line-height:1.3}',
  '.vector-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:13px}.vector-card .hero{height:468px}.proof-grid{display:grid;grid-template-columns:repeat(8,1fr);gap:8px}.proof{min-width:0;border:1px solid #38414b;background:#11161b;padding:8px}.proof-title{font-size:10px;font-weight:700;color:#dce2e8;min-height:26px}.proof-pair{display:flex;gap:8px;align-items:flex-start}.proof-item{text-align:center;font-size:9px;color:#d1d7dd}.proof-item span{display:block;margin-bottom:4px}.proof-box{width:58px;height:58px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.proof-box img{object-fit:contain;image-rendering:pixelated}.micro{margin-top:11px;border:1px dashed #46515d;padding:10px 13px;color:#aab4bd;display:flex;align-items:center;gap:13px;font-size:12px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:10px;color:#788591;margin-top:9px}',
  '</style></head><body>',
  '<h1>PASS78 - ARCHIVE-LED SHAFT WEIGHT CHECK</h1>',
  '<div class="intro">Pass78 branches directly from Pass76, not Pass77. Only the right outer edge of the shaft bows out by 12 source units at maximum (approximately eight pixels at 468px). Overall height, crown, hook, endpoints, and inner edge/counter stay fixed. Pass77 is shown as a six-unit intermediate.</div>',
  '<section class="section"><h2>468px FIRST-READ REFERENCES - ARCHIVE / CURRENT / UPPER SERIFS / PRIOR MARK / SEED</h2><div class="grid6">' + refsHtml + '</div></section>',
  '<section class="section"><h2>468px J-ONLY SILHOUETTES - PASS63B / PASS71 / PASS72 / PASS76 / PASS77 / PASS78</h2><div class="vector-grid">' + vectorsHtml + '</div></section>',
  '<section class="section"><h2>NATIVE 54px / 32px - SAME-SCALE J READ</h2><div class="proof-grid">' + proofsHtml + '</div>',
  '<div class="micro"><strong>RING-FREE 16px CHECKS</strong><span>Pass78 candidate: <img src="data:image/svg+xml;base64,' + Buffer.from(proofSvg(pass78, 16)).toString("base64") + '" width="16" height="16" alt="Pass78 ring-free 16px"> native reduction.</span><span>Separate simplified control: <img src="' + control16 + '" width="16" height="16" alt="Separate ring-free control"></span></div></section>',
  '<div class="footer">Local exploratory comparison only. No orbit, energy, materials, Figma, shared asset, or production edits. Pass78 is not approved.</div>',
  '</body></html>',
].join("");

fs.writeFileSync(path.join(outDir, "pass78-macro-comparison.html"), html, "utf8");
for (const [name, d] of [["pass63b-control", pass63b], ["pass71-control", pass71], ["pass72-control", pass72], ["pass76-control", pass76], ["pass77-control", pass77], ["pass78-source", pass78]]) {
  fs.writeFileSync(path.join(outDir, name + ".svg"), svgMark(d, 468), "utf8");
  for (const size of [54, 32, 16]) fs.writeFileSync(path.join(outDir, name + "-" + size + ".svg"), proofSvg(d, size), "utf8");
}
fs.copyFileSync(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), path.join(outDir, "separate-ringless-16-control.svg"));
console.log("Wrote Pass78 comparison HTML, source, and 468/54/32/16 SVG proofs.");
