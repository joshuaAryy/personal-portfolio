const fs = require("fs");
const path = require("path");

const outDir = path.resolve("docs/j-source-review/captures/pass73");
fs.mkdirSync(outDir, { recursive: true });
function dataUri(file, mime) {
  return "data:" + mime + ";base64," + fs.readFileSync(file).toString("base64");
}
function readPaths(file) {
  const svg = fs.readFileSync(file, "utf8");
  return [...svg.matchAll(/<path[^>]*d="([^"]+)"/g)].map((m) => m[1]);
}
function png(file) {
  return dataUri(path.resolve(file), "image/png");
}

const references = [
  { id: "archive", title: "ARCHIVE · 159:2", note: "Whole-mark composition standard.", image: png("docs/j-source-review/01-archive-target-159-2.png") },
  { id: "current", title: "CURRENT · 1950:6", note: "Unchanged reconstruction comparison.", image: png("docs/j-source-review/03-current-hero-1950-6.png") },
  { id: "upper01", title: "UPPER SERIF · 2662:47", note: "Local study capture · pass 01.", image: png("docs/j-source-review/captures/upper-serif-pass-01/hero-after-468.png") },
  { id: "upper02", title: "UPPER SERIF · 2668:6", note: "Local study capture · pass 02.", image: png("docs/j-source-review/captures/upper-serif-pass-02/hero-after-468.png") },
];
const pass72Paths = readPaths(path.resolve("docs/j-source-review/captures/pass72/pass72-source.svg"));
if (pass72Paths.length !== 2) throw new Error("Expected the preserved Pass70 sweep and Pass72 J.");
const sweep = pass72Paths[0];
const jPath = pass72Paths[1];
const pass16 = dataUri(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), "image/svg+xml");

// One flat, asymmetric left-side energy ribbon. Its upper end disappears under
// the crown; its lower end tucks beneath the hook. It stays out of the shaft.
const energyMass = "M190 77C151 93 116 124 99 160C81 199 95 233 135 253C146 259 154 270 157 282C173 267 169 251 151 237C125 218 110 195 119 167C128 138 156 108 190 87Z";
const transform = 'transform="translate(-5.2 5) scale(.67 .738)" stroke="#D7DADF" stroke-width="9" stroke-linejoin="round"';

function svgMark(size, energy) {
  const fill = energy
    ? '<path d="' + energyMass + '" fill="#3C7A8D"/>'
    : "";
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="#090C10"/>' + fill + '<path d="' + sweep + '" fill="none" stroke="#77808A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="' + jPath + '" ' + transform + ' fill="#D7DADF"/></svg>';
}
function svgUri(size, energy) {
  return "data:image/svg+xml;base64," + Buffer.from(svgMark(size, energy)).toString("base64");
}
function sourceCard(item) {
  const image = item.image
    ? '<img src="' + item.image + '" alt="' + item.title + '">'
    : svgMark(468, !!item.energy);
  return '<article class="card"><div class="title">' + item.title + '</div><div class="hero">' + image + '</div><div class="note">' + item.note + '</div></article>';
}
function proofCard(item) {
  const pair = [54, 32].map((size) => {
    const img = item.image
      ? '<img src="' + item.image + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">'
      : '<img src="' + svgUri(size, !!item.energy) + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">';
    return '<div class="proof-item"><span>' + size + 'px</span><div class="proof-box">' + img + '</div></div>';
  }).join("");
  return '<article class="proof"><div class="proof-title">' + item.title + '</div><div class="proof-pair">' + pair + '</div></article>';
}

const wholeMark = [
  ...references,
  { id: "pass72", title: "PASS72 · FIXED FLAT CONTROL", note: "Pass71 crown/hook + Pass70 sweep; no added energy mass.", energy: false },
  { id: "pass73", title: "PASS73 · OPEN LEFT ENERGY FORM", note: "One broad asymmetric ribbon, hidden at crown and hook.", energy: true },
];
const proofSet = [
  references[0], references[1],
  { id: "pass72", title: "PASS72 · FLAT CONTROL", energy: false },
  { id: "pass73", title: "PASS73 · ENERGY FORM", energy: true },
];

const html = [
  '<!doctype html><html><head><meta charset="utf-8"><title>Pass73 · asymmetric energy integration</title><style>',
  '*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:3000px;padding:30px 28px}',
  'h1{margin:0 0 7px;font-size:30px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:17px;max-width:2860px}',
  '.section{border-top:1px solid #343c45;padding-top:13px;margin-top:15px}h2{font-size:19px;color:#e7d6a8;margin:0 0 10px}',
  '.grid6{display:grid;grid-template-columns:repeat(6,468px);gap:10px}.grid2{display:grid;grid-template-columns:repeat(2,468px);justify-content:center;gap:16px}.card{width:468px;min-width:468px}.title{font-size:12px;font-weight:700;color:#dce2e8;height:20px;white-space:nowrap}',
  '.hero{width:468px;height:468px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center;overflow:hidden}.hero svg,.hero img{width:468px;height:468px;object-fit:contain}.note{font-size:10px;color:#939faa;margin-top:5px;height:25px}',
  '.proof-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.proof{min-width:0;border:1px solid #38414b;background:#11161b;padding:9px}.proof-title{font-size:11px;font-weight:700;color:#dce2e8;height:27px}.proof-pair{display:flex;gap:12px;align-items:flex-start}.proof-item{text-align:center;font-size:9px;color:#d1d7dd}.proof-item span{display:block;margin-bottom:4px}.proof-box{width:60px;height:60px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.proof-box img{object-fit:contain;image-rendering:pixelated}.micro{margin-top:11px;border:1px dashed #46515d;padding:10px 13px;color:#aab4bd;display:flex;align-items:center;gap:13px;font-size:12px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:10px;color:#788591;margin-top:9px}',
  '</style></head><body>',
  '<h1>PASS73 · OPEN ASYMMETRIC ENERGY INTEGRATION</h1>',
  '<div class="intro">Pass71 crown and Pass72 hook remain fixed with the Pass70 interior sweep. Pass73 adds one flat, broad left-side energy ribbon whose ends disappear under the crown and hook. The ribbon stays clear of the shaft/counter opening; no closed ring, texture, gradient, extra filaments, or small cyan accents. This is a macro composition test, not a finished material pass.</div>',
  '<section class="section"><h2>468px WHOLE-MARK FIRST READ · ARCHIVE / CURRENT / SERIF STUDIES / PASS72 / PASS73</h2><div class="grid6">', wholeMark.map(sourceCard).join(""), '</div></section>',
  '<section class="section"><h2>FLAT MACRO SILHOUETTE · SAME J / SAME SWEEP / ADDED OPEN ENERGY FORM</h2><div class="grid2">', sourceCard({ title: "PASS72 · BASELINE", note: "Pass71 crown/hook with the frozen Pass70 sweep.", energy: false }), sourceCard({ title: "PASS73 · ONE ASYMMETRIC RIBBON", note: "The only added form is the flat left-side sweep.", energy: true }), '</div></section>',
  '<section class="section"><h2>NATIVE 54px / 32px RECOGNITION · ARCHIVE / CURRENT / PASS72 / PASS73</h2><div class="proof-grid">', proofSet.map(proofCard).join(""), '</div>',
  '<div class="micro"><strong>SEPARATE 16px RING-FREE GLYPH</strong><img src="', pass16, '" width="16" height="16" alt="ring-free 16px J"><span>Pass16 simplified glyph; unchanged.</span></div></section>',
  '<div class="footer">Pass73 is local and unapproved. Pass72 geometry and Pass70 sweep are reused; no Figma, shared asset, or production edits.</div>',
  '</body></html>'
].join("");

fs.writeFileSync(path.join(outDir, "pass73-integration-comparison.html"), html, "utf8");
fs.writeFileSync(path.join(outDir, "pass72-flat-control-468.svg"), svgMark(468, false), "utf8");
fs.writeFileSync(path.join(outDir, "pass73-source.svg"), svgMark(468, true), "utf8");
for (const size of [54, 32]) {
  fs.writeFileSync(path.join(outDir, "pass72-flat-control-" + size + ".svg"), svgMark(size, false), "utf8");
  fs.writeFileSync(path.join(outDir, "pass73-" + size + ".svg"), svgMark(size, true), "utf8");
}
console.log("Wrote Pass73 editable source, flat macro board, and 468/54/32 proofs.");
