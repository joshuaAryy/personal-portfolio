const fs = require("fs");
const path = require("path");

const outDir = path.resolve("docs/j-source-review/captures/pass74");
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
  { title: "ARCHIVE · 159:2", note: "Whole-mark composition standard.", image: png("docs/j-source-review/01-archive-target-159-2.png") },
  { title: "CURRENT · 1950:6", note: "Unchanged reconstruction comparison.", image: png("docs/j-source-review/03-current-hero-1950-6.png") },
  { title: "UPPER SERIF · 2662:47", note: "Local study capture · pass 01.", image: png("docs/j-source-review/captures/upper-serif-pass-01/hero-after-468.png") },
  { title: "UPPER SERIF · 2668:6", note: "Local study capture · pass 02.", image: png("docs/j-source-review/captures/upper-serif-pass-02/hero-after-468.png") },
];
const pass72Paths = readPaths(path.resolve("docs/j-source-review/captures/pass72/pass72-source.svg"));
const pass73Paths = readPaths(path.resolve("docs/j-source-review/captures/pass73/pass73-source.svg"));
if (pass72Paths.length !== 2 || pass73Paths.length !== 3) throw new Error("Pass72/73 source structures changed; refusing to build from unexpected geometry.");
const pass70Sweep = pass72Paths[0];
const jPath = pass72Paths[1];
const pass73Energy = pass73Paths[0];
if (pass73Paths[1] !== pass70Sweep || pass73Paths[2] !== jPath) throw new Error("Pass73 does not preserve the frozen Pass72 J/sweep source.");
const pass16 = dataUri(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), "image/svg+xml");
const transform = 'transform="translate(-5.2 5) scale(.67 .738)" stroke="#D7DADF" stroke-width="9" stroke-linejoin="round"';

// One filled asymmetric interior sweep from hook to inner shoulder. Both tips
// overlap the J so they disappear behind it; the broad middle remains inside
// the counter and does not cross the upright or form an exterior bracket.
const interiorSweep = "M278 112C260 131 246 148 230 166C211 188 192 211 180 235C170 253 165 267 163 279C174 275 186 263 195 249C208 229 218 209 235 190C252 171 268 152 282 135Z";

function svgMark(size, energyPath) {
  const energy = energyPath
    ? '<path d="' + energyPath + '" fill="#3C7A8D"/>'
    : "";
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="#090C10"/>' + energy + '<path d="' + jPath + '" ' + transform + ' fill="#D7DADF"/></svg>';
}
function uri(size, energyPath) {
  return "data:image/svg+xml;base64," + Buffer.from(svgMark(size, energyPath)).toString("base64");
}
function card(item) {
  const art = item.image
    ? '<img src="' + item.image + '" alt="' + item.title + '">'
    : svgMark(468, item.energyPath || "");
  return '<article class="card"><div class="title">' + item.title + '</div><div class="hero">' + art + '</div><div class="note">' + item.note + '</div></article>';
}
function proofCard(item) {
  const pair = [54, 32].map((size) => {
    const art = item.image
      ? '<img src="' + item.image + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">'
      : '<img src="' + uri(size, item.energyPath || "") + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">';
    return '<div class="proof-item"><span>' + size + 'px</span><div class="proof-box">' + art + '</div></div>';
  }).join("");
  return '<article class="proof"><div class="proof-title">' + item.title + '</div><div class="proof-pair">' + pair + '</div></article>';
}

const macro = [
  ...references,
  { title: "PASS72 · FIXED INTERIOR HAIRLINE", note: "Pass71 crown/Pass72 hook with the original Pass70 sweep.", energyPath: pass70Sweep },
  { title: "PASS73 · EXTERIOR RIBBON CONTROL", note: "Previous left-side exterior ribbon; shown as the bracket control.", energyPath: pass73Energy },
  { title: "PASS74 · SINGLE INTERIOR SWEEP", note: "One broader bowl/counter form; ends hidden under hook and inner shoulder.", energyPath: interiorSweep },
];
const proofs = [
  { title: "ARCHIVE · 159:2", image: references[0].image },
  { title: "CURRENT · 1950:6", image: references[1].image },
  { title: "PASS72 · HAIRLINE", energyPath: pass70Sweep },
  { title: "PASS73 · EXTERIOR RIBBON", energyPath: pass73Energy },
  { title: "PASS74 · INTERIOR SWEEP", energyPath: interiorSweep },
];

const html = [
  '<!doctype html><html><head><meta charset="utf-8"><title>Pass74 · interior energy sweep</title><style>',
  '*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:3000px;padding:30px 28px}',
  'h1{margin:0 0 7px;font-size:30px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:17px;max-width:2860px}',
  '.section{border-top:1px solid #343c45;padding-top:13px;margin-top:15px}h2{font-size:19px;color:#e7d6a8;margin:0 0 10px}',
  '.grid4{display:grid;grid-template-columns:repeat(4,468px);justify-content:center;gap:10px}.grid3{display:grid;grid-template-columns:repeat(3,468px);justify-content:center;gap:14px}.card{width:468px;min-width:468px}.title{font-size:12px;font-weight:700;color:#dce2e8;height:20px;white-space:nowrap}',
  '.hero{width:468px;height:468px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center;overflow:hidden}.hero svg,.hero img{width:468px;height:468px;object-fit:contain}.note{font-size:10px;color:#939faa;margin-top:5px;height:25px}',
  '.proof-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.proof{min-width:0;border:1px solid #38414b;background:#11161b;padding:9px}.proof-title{font-size:11px;font-weight:700;color:#dce2e8;height:27px}.proof-pair{display:flex;gap:12px;align-items:flex-start}.proof-item{text-align:center;font-size:9px;color:#d1d7dd}.proof-item span{display:block;margin-bottom:4px}.proof-box{width:60px;height:60px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.proof-box img{object-fit:contain;image-rendering:pixelated}.micro{margin-top:11px;border:1px dashed #46515d;padding:10px 13px;color:#aab4bd;display:flex;align-items:center;gap:13px;font-size:12px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:10px;color:#788591;margin-top:9px}',
  '</style></head><body>',
  '<h1>PASS74 · SINGLE INTERIOR ENERGY SWEEP</h1>',
  '<div class="intro">Pass71 crown, Pass72 hook, Pass67 upright/bowl/counter, and the separate Pass16 glyph are fixed. Pass74 removes both Pass73’s exterior ribbon and Pass70’s hairline, replacing them with one flat, broader asymmetric sweep inside the negative bowl/counter. Its ends lie beneath the hook and inner shoulder; its middle stays clear of the shaft. No closed badge, extra filaments, texture, or material finish.</div>',
  '<section class="section"><h2>468px WHOLE-MARK FIRST READ · ARCHIVE / CURRENT / UPPER SERIFS / PASS72 / PASS73 / PASS74</h2><div class="grid4">', macro.slice(0, 4).map(card).join(""), '</div><div class="grid3" style="margin-top:12px">', macro.slice(4).map(card).join(""), '</div></section>',
  '<section class="section"><h2>FLAT MACRO SHAPES · PASS72 HAIRLINE / PASS73 OUTER RIBBON / PASS74 INTERIOR FORM</h2><div class="grid3">', macro.slice(4).map(card).join(""), '</div></section>',
  '<section class="section"><h2>NATIVE 54px / 32px RECOGNITION · ARCHIVE / CURRENT / PASS72 / PASS73 / PASS74</h2><div class="proof-grid">', proofs.map(proofCard).join(""), '</div>',
  '<div class="micro"><strong>SEPARATE 16px RING-FREE GLYPH</strong><img src="' + pass16 + '" width="16" height="16" alt="ring-free 16px J"><span>Pass16 simplified glyph; unchanged.</span></div></section>',
  '<div class="footer">Pass74 is a local structural study only. Pass71 crown, Pass72 hook, Pass67 upright, and Pass16 glyph are unchanged. No Figma, shared asset, or production changes; no approval implied.</div>',
  '</body></html>'
].join("");

fs.writeFileSync(path.join(outDir, "pass74-integration-comparison.html"), html, "utf8");
fs.writeFileSync(path.join(outDir, "pass72-hairline-control-468.svg"), svgMark(468, pass70Sweep), "utf8");
fs.writeFileSync(path.join(outDir, "pass73-exterior-ribbon-control-468.svg"), svgMark(468, pass73Energy), "utf8");
fs.writeFileSync(path.join(outDir, "pass74-source.svg"), svgMark(468, interiorSweep), "utf8");
fs.copyFileSync(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), path.join(outDir, "pass74-16-ringless-control.svg"));
for (const size of [54, 32]) {
  fs.writeFileSync(path.join(outDir, "pass72-hairline-control-" + size + ".svg"), svgMark(size, pass70Sweep), "utf8");
  fs.writeFileSync(path.join(outDir, "pass73-exterior-ribbon-control-" + size + ".svg"), svgMark(size, pass73Energy), "utf8");
  fs.writeFileSync(path.join(outDir, "pass74-" + size + ".svg"), svgMark(size, interiorSweep), "utf8");
}
console.log("Wrote Pass74 source, flat comparison board, and native-size proofs.");
