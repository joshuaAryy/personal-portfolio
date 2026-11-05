const fs = require("fs");
const path = require("path");

const outDir = path.resolve("docs/j-source-review/captures/pass67");
fs.mkdirSync(outDir, { recursive: true });

function dataUri(file, mime) {
  return "data:" + mime + ";base64," + fs.readFileSync(file).toString("base64");
}
function readPathFromSvg(file) {
  const svg = fs.readFileSync(file, "utf8");
  const match = svg.match(/<path d="([^"]+)"/);
  if (!match) throw new Error("No path found in " + file);
  return match[1];
}

const archive = dataUri(path.resolve("docs/j-source-review/01-archive-target-159-2.png"), "image/png");
const current = dataUri(path.resolve("docs/j-source-review/03-current-hero-1950-6.png"), "image/png");
const ringless16 = dataUri(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), "image/svg+xml");
const pass66Path = readPathFromSvg(path.resolve("docs/j-source-review/captures/pass66/pass66-c-468.svg"));

// Increase only the lower edge through the left flare by up to 10 source px.
// Crown top/slope, right shoulder, stem, bowl/counter, and E hook stay fixed.
const before = "L364 143C364 127 359 116 342 105C316 94 279 84 248 76C229 70 204 67 188 68Z";
const after = "L364 143C364 127 359 116 342 105C316 102 279 93 248 86C229 80 204 73 188 68Z";
const pass67Path = pass66Path.replace(before, after);
if (pass67Path === pass66Path) throw new Error("Pass67 left-flare segment was not found; refusing to write an unchanged candidate.");

const transform = 'transform="translate(-5.2 5) scale(.67 .738)" stroke="#D7DADF" stroke-width="9" stroke-linejoin="round"';
function vectorSvg(pathData, size, bg) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="' + bg + '"/><path d="' + pathData + '" ' + transform + ' fill="#D7DADF"/></svg>';
}
function imageCard(title, image, detail) {
  return '<article class="card"><div class="title">' + title + '</div><div class="hero"><img src="' + image + '" alt="' + title + '"></div><div class="note">' + detail + '</div></article>';
}
function vectorCard(title, pathData, detail) {
  return '<article class="card"><div class="title">' + title + '</div><div class="hero">' + vectorSvg(pathData, 468, "#090C10") + '</div><div class="note">' + detail + '</div></article>';
}
function proofCard(title, image, pathData, imageIsVector) {
  const tiles = [54, 32].map((size) => {
    let art;
    if (pathData) art = vectorSvg(pathData, size, "#07090C");
    else art = '<img src="' + image + '" width="' + size + '" height="' + size + '" alt="' + title + ' ' + size + 'px">';
    return '<div class="proof-item"><span>' + size + 'px</span><div class="proof-box">' + art + '</div><small>' + (pathData ? 'native vector proof' : 'source downscale') + '</small></div>';
  }).join("");
  return '<article class="proof"><div class="proof-title">' + title + '</div><div class="proof-pair">' + tiles + '</div></article>';
}

const heroes = [
  imageCard("APPROVED ARCHIVE · 159:2", archive, "Original archive target render; full forged J/orbit artwork retained."),
  imageCard("CURRENT SOURCE · 1950:6", current, "Current reconstructed hero render; shown as the production comparison, not modified."),
  vectorCard("PASS66 · FLARE BASELINE", pass66Path, "Archive-sloped Pass66 crown with B shaft/bowl and Pass64 E hook."),
  vectorCard("PASS67 · LEFT-FLARE WEIGHT", pass67Path, "Pass66 with a modest lower-edge thickening isolated to the left flare."),
].join("");

const proofs = [
  proofCard("ARCHIVE 159:2", archive, null, false),
  proofCard("CURRENT 1950:6", current, null, false),
  proofCard("PASS66 · BASELINE", null, pass66Path, true),
  proofCard("PASS67 · FLARE WEIGHT", null, pass67Path, true),
].join("");

const html = [
  '<!doctype html><html><head><meta charset="utf-8"><title>Pass67 · left flare weight</title><style>',
  '*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:2200px;padding:30px 34px}',
  'h1{margin:0 0 8px;font-size:30px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:18px}',
  '.section{border-top:1px solid #343c45;padding-top:14px;margin-top:15px}h2{font-size:19px;color:#e7d6a8;margin:0 0 10px}',
  '.grid,.proof-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.card,.proof{min-width:0}.title{font-size:14px;font-weight:700;color:#dce2e8;min-height:22px}',
  '.hero{width:100%;height:485px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center;overflow:hidden}.hero svg,.hero img{width:100%;height:100%;object-fit:contain}.note{font-size:12px;color:#939faa;margin-top:6px;min-height:34px}',
  '.proof{padding:10px;border:1px solid #38414b;background:#11161b}.proof-title{font-size:13px;font-weight:700;color:#dce2e8;margin-bottom:8px}.proof-pair{display:flex;gap:22px;align-items:flex-start}.proof-item{text-align:center;font-size:11px;color:#d1d7dd}.proof-item span{display:block;margin-bottom:4px}.proof-box{width:66px;height:66px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.proof-box svg,.proof-box img{width:auto;height:auto;max-width:54px;max-height:54px;image-rendering:pixelated}.proof-item small{display:block;font-size:9px;color:#82909d;margin-top:4px}',
  '.micro{margin-top:10px;border:1px dashed #46515d;padding:10px 14px;color:#aab4bd;display:flex;align-items:center;gap:13px;font-size:12px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:11px;color:#788591;margin-top:12px}',
  '</style></head><body>',
  '<h1>PASS67 · ARCHIVE CROWN WEIGHT CHECK</h1>',
  '<div class="intro">Pass66 geometry is the base. Pass67 thickens only the lower edge of its left flare; the archive-sloped crown, crown length, smooth right shoulder, upright, bowl/counter, Pass64 E hook, and transform remain fixed. The archive and current source renders are included directly as first-read references. No orbit is added to either vector study.</div>',
  '<section class="section"><h2>468px FIRST READ · ARCHIVE / CURRENT / PASS66 / PASS67</h2><div class="grid">', heroes, '</div></section>',
  '<section class="section"><h2>54px / 32px · SOURCE DOWNSCALES AND J-ONLY VECTOR PROOFS</h2><div class="proof-grid">', proofs,
  '</div><div class="micro"><strong>SEPARATE 16px RING-FREE CONTROL</strong><img src="', ringless16, '" width="16" height="16" alt="ring-free 16px J"><span>Pass16 simplified glyph, unchanged.</span></div></section>',
  '<div class="footer">Pass67 local study only · archive/current images are unchanged source renders; no Figma or production changes.</div>',
  '</body></html>'
].join("");

fs.writeFileSync(path.join(outDir, "pass67-crown-weight-comparison.html"), html, "utf8");
for (const [id, pathData] of [["pass66", pass66Path], ["pass67", pass67Path]]) {
  fs.writeFileSync(path.join(outDir, id + "-468.svg"), vectorSvg(pathData, 468, "#090C10"), "utf8");
  for (const size of [54, 32]) fs.writeFileSync(path.join(outDir, id + "-" + size + ".svg"), vectorSvg(pathData, size, "#07090C"), "utf8");
}
console.log("Wrote Pass67 crown comparison and proof SVGs.");
