const fs = require("fs");
const path = require("path");

const root = path.resolve("docs/j-source-review");
const outDir = path.resolve("docs/j-source-review/captures/pass71");
fs.mkdirSync(outDir, { recursive: true });

function dataUri(file, mime) {
  return "data:" + mime + ";base64," + fs.readFileSync(file).toString("base64");
}
function pathFromSvg(file) {
  const source = fs.readFileSync(file, "utf8");
  const match = source.match(/<path[^>]*d="([^"]+)"/);
  if (!match) throw new Error("No vector path found in " + file);
  return match[1];
}
function image(file) {
  return dataUri(path.resolve(file), "image/png");
}

const refs = {
  archive: image("docs/j-source-review/01-archive-target-159-2.png"),
  current: image("docs/j-source-review/03-current-hero-1950-6.png"),
  upper01: image("docs/j-source-review/captures/upper-serif-pass-01/hero-after-468.png"),
  upper02: image("docs/j-source-review/captures/upper-serif-pass-02/hero-after-468.png"),
};

const transform = 'transform="translate(-5.2 5) scale(.67 .738)" stroke="#D7DADF" stroke-width="9" stroke-linejoin="round"';
const pass65A = pathFromSvg(path.resolve("docs/j-source-review/captures/pass65/pass65-a-468.svg"));
const pass65B = pathFromSvg(path.resolve("docs/j-source-review/captures/pass65/pass65-b-468.svg"));
const pass66 = pathFromSvg(path.resolve("docs/j-source-review/captures/pass66/pass66-c-468.svg"));
const pass67 = pathFromSvg(path.resolve("docs/j-source-review/captures/pass67/pass67-468.svg"));
const oldUnderside = "C316 102 279 93 248 86C229 80 204 73 188 68Z";
const newUnderside = "C327 94 287 117 263 104C236 94 207 78 188 68Z";
if (!pass67.includes(oldUnderside)) throw new Error("Pass67 underside anchor did not match; refusing an unsafe crown rewrite.");
const pass71 = pass67.replace(oldUnderside, newUnderside);
if (pass71 === pass67) throw new Error("Pass71 crown rewrite produced no change.");
const pass70Sweep = "M156 278C167 251 186 222 205 203C219 189 232 181 244 175";

const variants = [
  { id: "pass65-a", title: "PASS65 A · LONG SLOPED FLARE", note: "Archive slope; shoulder notch remains.", path: pass65A },
  { id: "pass65-b", title: "PASS65 B · COMPACT TAPER", note: "Smooth return; compact crown.", path: pass65B },
  { id: "pass66", title: "PASS66 · INTERMEDIATE SHOULDER", note: "Sloped flare with smooth right return.", path: pass66 },
  { id: "pass67", title: "PASS67 · FIXED CROWN / BODY", note: "Fixed upright and hook baseline.", path: pass67 },
  { id: "pass70", title: "PASS70 · FIXED SWEEP CONTROL", note: "Same Pass67 J plus frozen interior sweep.", path: pass67, sweep: true },
  { id: "pass71", title: "PASS71 · DEEPER SERIF INTO SHOULDER", note: "Continuous broader underside; right return/body/sweep stay fixed.", path: pass71, sweep: true },
];
const firstRead = [
  { id: "archive", title: "ARCHIVE · 159:2", note: "Approved whole-mark standard.", image: refs.archive },
  { id: "current", title: "CURRENT · 1950:6", note: "Reconstruction comparison.", image: refs.current },
  { id: "upper01", title: "UPPER SERIF STUDY · 2662:47", note: "Local capture, pass 01.", image: refs.upper01 },
  { id: "upper02", title: "UPPER SERIF STUDY · 2668:6", note: "Local capture, pass 02.", image: refs.upper02 },
];

function vectorSvg(pathData, size, background, withSweep) {
  const sweep = withSweep
    ? '<path d="' + pass70Sweep + '" fill="none" stroke="#77808A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
    : "";
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="' + background + '"/>' + sweep + '<path d="' + pathData + '" ' + transform + ' fill="#D7DADF"/></svg>';
}
function vectorUri(pathData, size, withSweep) {
  return "data:image/svg+xml;base64," + Buffer.from(vectorSvg(pathData, size, "#07090C", withSweep)).toString("base64");
}
function sourceCard(item) {
  return '<article class="card"><div class="title">' + item.title + '</div><div class="hero"><img src="' + item.image + '" alt="' + item.title + '"></div><div class="note">' + item.note + '</div></article>';
}
function vectorCard(item) {
  return '<article class="card"><div class="title">' + item.title + '</div><div class="hero">' + vectorSvg(item.path, 468, "#090C10", !!item.sweep) + '</div><div class="note">' + item.note + '</div></article>';
}
function proofCard(item) {
  const pair = [54, 32].map((size) => {
    const art = item.image
      ? '<img src="' + item.image + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">'
      : '<img src="' + vectorUri(item.path, size, !!item.sweep) + '" width="' + size + '" height="' + size + '" alt="' + item.title + ' ' + size + 'px">';
    return '<div class="proof-item"><span>' + size + 'px</span><div class="proof-box">' + art + '</div></div>';
  }).join("");
  return '<article class="proof"><div class="proof-title">' + item.title + '</div><div class="proof-pair">' + pair + '</div></article>';
}

const macroItems = [
  ...firstRead,
  ...variants,
];
const proofItems = [
  ...firstRead,
  ...variants,
];
const micro16 = dataUri(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), "image/svg+xml");

const html = [
  '<!doctype html><html><head><meta charset="utf-8"><title>Pass71 · deepened archive serif</title><style>',
  '*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:3000px;padding:30px 28px}',
  'h1{margin:0 0 7px;font-size:30px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:17px;max-width:2850px}',
  '.section{border-top:1px solid #343c45;padding-top:13px;margin-top:15px}h2{font-size:19px;color:#e7d6a8;margin:0 0 10px}',
  '.grid4{display:grid;grid-template-columns:repeat(4,468px);gap:14px}.grid6{display:grid;grid-template-columns:repeat(6,468px);gap:10px}.card{width:468px;min-width:468px}.title{font-size:12px;font-weight:700;color:#dce2e8;height:20px;white-space:nowrap}',
  '.hero{width:468px;height:468px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center;overflow:hidden}.hero svg,.hero img{width:468px;height:468px;object-fit:contain}.note{font-size:10px;color:#939faa;margin-top:5px;height:25px}',
  '.proof-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-top:10px}.proof{min-width:0;border:1px solid #38414b;background:#11161b;padding:8px}.proof-title{font-size:10px;font-weight:700;color:#dce2e8;height:27px}.proof-pair{display:flex;gap:12px;align-items:flex-start}.proof-item{text-align:center;font-size:9px;color:#d1d7dd}.proof-item span{display:block;margin-bottom:4px}.proof-box{width:60px;height:60px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.proof-box img{image-rendering:pixelated;object-fit:contain}.micro{margin-top:11px;border:1px dashed #46515d;padding:10px 13px;color:#aab4bd;display:flex;align-items:center;gap:13px;font-size:12px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:10px;color:#788591;margin-top:9px}',
  '</style></head><body>',
  '<h1>PASS71 · LEFT SERIF DEPTH STUDY</h1>',
  '<div class="intro">One macro change only: the archive-like left serif gains a deeper, continuous underside into the shoulder. Pass70’s sweep endpoints and stroke weight, Pass67’s upright/bowl/hook, the smooth right return from Pass66, and the separate ring-free 16px glyph stay fixed. The candidate does not lengthen into a notch.</div>',
  '<section class="section"><h2>468px FIRST READ · ARCHIVE / CURRENT / UPPER-SERIF STUDIES</h2><div class="grid4">', firstRead.map(sourceCard).join(""), '</div></section>',
  '<section class="section"><h2>468px CONTOUR COMPARISON · PASS65 A/B / PASS66 / PASS67 / PASS70 / PASS71</h2><div class="grid6">', variants.map(vectorCard).join(""), '</div></section>',
  '<section class="section"><h2>NATIVE 54px / 32px PROOFS · ALL REFERENCES AND CANDIDATES</h2><div class="proof-grid">', proofItems.map(proofCard).join(""), '</div>',
  '<div class="micro"><strong>SEPARATE 16px RING-FREE CONTROL</strong><img src="', micro16, '" width="16" height="16" alt="ring-free 16px J"><span>Pass16 simplified glyph; unchanged.</span></div></section>',
  '<div class="footer">Pass71 is a local macro study only. No Figma, shared asset, or production changes. Shape remains unapproved; compare serif depth and small-size counter clarity against the archive.</div>',
  '</body></html>'
].join("");

fs.writeFileSync(path.join(outDir, "pass71-serif-depth-comparison.html"), html, "utf8");
fs.writeFileSync(path.join(outDir, "pass71-source.svg"), vectorSvg(pass71, 468, "#090C10", true), "utf8");
fs.writeFileSync(path.join(outDir, "pass71-468.svg"), vectorSvg(pass71, 468, "#090C10", true), "utf8");
for (const size of [54, 32]) fs.writeFileSync(path.join(outDir, "pass71-" + size + ".svg"), vectorSvg(pass71, size, "#07090C", true), "utf8");
for (const item of variants) {
  fs.writeFileSync(path.join(outDir, item.id + "-468.svg"), vectorSvg(item.path, 468, "#090C10", !!item.sweep), "utf8");
  for (const size of [54, 32]) fs.writeFileSync(path.join(outDir, item.id + "-" + size + ".svg"), vectorSvg(item.path, size, "#07090C", !!item.sweep), "utf8");
}
console.log("Wrote Pass71 source, editable comparison HTML, and 468/54/32 SVG proofs.");
