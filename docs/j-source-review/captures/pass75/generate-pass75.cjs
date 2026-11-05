const fs = require("fs");
const path = require("path");

const outDir = path.resolve("docs/j-source-review/captures/pass75");
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

const archive = { title: "ARCHIVE - 159:2", note: "Whole-mark composition standard.", image: png("docs/j-source-review/01-archive-target-159-2.png") };
const current = { title: "CURRENT - 1950:6", note: "Unchanged reconstruction comparison.", image: png("docs/j-source-review/03-current-hero-1950-6.png") };
const serif01 = { title: "UPPER SERIF - 2662:47", note: "Local study capture - pass 01.", image: png("docs/j-source-review/captures/upper-serif-pass-01/hero-after-468.png") };
const serif02 = { title: "UPPER SERIF - 2668:6", note: "Local study capture - pass 02.", image: png("docs/j-source-review/captures/upper-serif-pass-02/hero-after-468.png") };

const pass72 = readPaths(path.resolve("docs/j-source-review/captures/pass72/pass72-source.svg"));
const pass74 = readPaths(path.resolve("docs/j-source-review/captures/pass74/pass74-source.svg"));
if (pass72.length !== 2 || pass74.length !== 2 || pass74[1] !== pass72[1]) {
  throw new Error("Pass74 must preserve the Pass72 J as its second path; refusing unexpected source geometry.");
}
const frozenJ = pass74[1];
const priorSweep = pass74[0];
const pass16 = dataUri(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), "image/svg+xml");
const transform = 'transform="translate(-5.2 5) scale(.67 .738)" stroke="#D7DADF" stroke-width="9" stroke-linejoin="round"';

// Pass75 holds Pass74's endpoint coordinates, color, overall stroke weight,
// J contour, proof size, and layer order. Only the interior controls change:
// the center of the sweep bows gently left into the bowl and returns to the
// same two occluded contacts.
const bowedSweep = "M278 112C257 134 234 158 216 181C198 205 181 233 171 253C167 264 164 273 163 279C174 275 186 263 195 249C208 229 224 207 240 186C257 164 276 144 282 135Z";
const proofItems = [
  { title: "ARCHIVE - 159:2", image: archive.image },
  { title: "CURRENT - 1950:6", image: current.image },
  { title: "PASS74 - STRAIGHTER SWEEP", energyPath: priorSweep },
  { title: "PASS75 - GENTLY BOWED SWEEP", energyPath: bowedSweep },
];

function svgMark(size, energyPath) {
  const energy = energyPath ? '<path d="' + energyPath + '" fill="#3C7A8D"/>' : "";
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="#090C10"/>' + energy + '<path d="' + frozenJ + '" ' + transform + ' fill="#D7DADF"/></svg>';
}
function svgUri(size, energyPath) {
  return "data:image/svg+xml;base64," + Buffer.from(svgMark(size, energyPath)).toString("base64");
}
function card(item) {
  const art = item.image ? '<img src="' + item.image + '" alt="' + item.title + '">' : svgMark(468, item.energyPath || "");
  return '<article class="card"><div class="title">' + item.title + '</div><div class="hero">' + art + '</div><div class="note">' + (item.note || "Frozen J silhouette; sweep is the only changed variable.") + '</div></article>';
}
function proofCard(item) {
  const pair = [54, 32].map((size) => {
    const art = item.image
      ? '<img src="' + item.image + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">'
      : '<img src="' + svgUri(size, item.energyPath || "") + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">';
    return '<div class="proof-item"><span>' + size + 'px</span><div class="proof-box">' + art + '</div></div>';
  }).join("");
  return '<article class="proof"><div class="proof-title">' + item.title + '</div><div class="proof-pair">' + pair + '</div></article>';
}

const refs = [archive, current, serif01, serif02];
const candidates = [
  { title: "PASS74 - STRAIGHTER SWEEP", note: "Control. Pass74 geometry, J and sweep color retained.", energyPath: priorSweep },
  { title: "PASS75 - GENTLY BOWED SWEEP", note: "Only middle controls shift; both contact endpoints and accent weight are held.", energyPath: bowedSweep },
];

const html = [
  '<!doctype html><html><head><meta charset="utf-8"><title>Pass75 - bowed interior sweep</title><style>',
  '*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:3000px;padding:28px}',
  'h1{margin:0 0 7px;font-size:29px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:16px;max-width:2860px}',
  '.section{border-top:1px solid #343c45;padding-top:12px;margin-top:14px}h2{font-size:19px;color:#e7d6a8;margin:0 0 10px}',
  '.grid4{display:grid;grid-template-columns:repeat(4,468px);justify-content:center;gap:10px}.grid2{display:grid;grid-template-columns:repeat(2,468px);justify-content:center;gap:14px}.card{width:468px;min-width:468px}.title{font-size:12px;font-weight:700;color:#dce2e8;height:20px;white-space:nowrap}',
  '.hero{width:468px;height:468px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center;overflow:hidden}.hero svg,.hero img{width:468px;height:468px;object-fit:contain}.note{font-size:10px;color:#939faa;margin-top:5px;height:25px}',
  '.proof-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.proof{min-width:0;border:1px solid #38414b;background:#11161b;padding:9px}.proof-title{font-size:11px;font-weight:700;color:#dce2e8;height:27px}.proof-pair{display:flex;gap:12px;align-items:flex-start}.proof-item{text-align:center;font-size:9px;color:#d1d7dd}.proof-item span{display:block;margin-bottom:4px}.proof-box{width:60px;height:60px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.proof-box img{object-fit:contain;image-rendering:pixelated}.micro{margin-top:11px;border:1px dashed #46515d;padding:10px 13px;color:#aab4bd;display:flex;align-items:center;gap:13px;font-size:12px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:10px;color:#788591;margin-top:9px}',
  '</style></head><body>',
  '<h1>PASS75 - GENTLY BOWED INTERIOR SWEEP</h1>',
  '<div class="intro">Pass74 contact endpoints, accent color/weight, J contour and counter width are held. Pass75 changes only the sweep curve controls: a gentle leftward bow carries the same interior form into the bowl. No orbit, new energy detail, material pass, or production change.</div>',
  '<section class="section"><h2>468px MACRO COMPARISON - ARCHIVE / CURRENT / UPPER-SERIF STUDIES</h2><div class="grid4">', refs.map(card).join(""), '</div></section>',
  '<section class="section"><h2>468px INTERIOR SWEEP COMPARISON - PASS74 CONTROL / PASS75 BOWED</h2><div class="grid2">', candidates.map(card).join(""), '</div></section>',
  '<section class="section"><h2>FLAT MACRO SILHOUETTE - SAME FROZEN J, SWEEP CONTROL VS BOWED</h2><div class="grid2">', candidates.map(card).join(""), '</div></section>',
  '<section class="section"><h2>NATIVE 54px / 32px READ - ARCHIVE / CURRENT / PASS74 / PASS75</h2><div class="proof-grid">', proofItems.map(proofCard).join(""), '</div>',
  '<div class="micro"><strong>SEPARATE 16px RING-FREE CONTROL</strong><img src="' + pass16 + '" width="16" height="16" alt="ring-free 16px J"><span>Unchanged Pass16 simplified glyph.</span></div></section>',
  '<div class="footer">Pass75 is a local study only. It preserves Pass74 endpoints, accent weight/color, frozen J, and proof logic. No Figma/shared assets/production edits; no approval implied.</div>',
  '</body></html>',
].join("");

fs.writeFileSync(path.join(outDir, "pass75-integration-comparison.html"), html, "utf8");
fs.writeFileSync(path.join(outDir, "pass74-control-468.svg"), svgMark(468, priorSweep), "utf8");
fs.writeFileSync(path.join(outDir, "pass75-source.svg"), svgMark(468, bowedSweep), "utf8");
for (const size of [54, 32]) {
  fs.writeFileSync(path.join(outDir, "pass74-control-" + size + ".svg"), svgMark(size, priorSweep), "utf8");
  fs.writeFileSync(path.join(outDir, "pass75-" + size + ".svg"), svgMark(size, bowedSweep), "utf8");
}
fs.copyFileSync(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), path.join(outDir, "pass75-16-ringless-control.svg"));
console.log("Wrote Pass75 source, comparison board, and native-size proofs.");
