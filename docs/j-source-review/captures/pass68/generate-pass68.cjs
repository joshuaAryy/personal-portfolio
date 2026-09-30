const fs = require("fs");
const path = require("path");

const outDir = path.resolve("docs/j-source-review/captures/pass68");
fs.mkdirSync(outDir, { recursive: true });
function dataUri(file, mime) {
  return "data:" + mime + ";base64," + fs.readFileSync(file).toString("base64");
}
function pathFromSvg(file) {
  const text = fs.readFileSync(file, "utf8");
  const match = text.match(/<path d="([^"]+)"/);
  if (!match) throw new Error("No path in " + file);
  return match[1];
}

const archive = dataUri(path.resolve("docs/j-source-review/01-archive-target-159-2.png"), "image/png");
const current = dataUri(path.resolve("docs/j-source-review/03-current-hero-1950-6.png"), "image/png");
const ringless16 = dataUri(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"), "image/svg+xml");
const jPath = pathFromSvg(path.resolve("docs/j-source-review/captures/pass67/pass67-468.svg"));
const transform = 'transform="translate(-5.2 5) scale(.67 .738)" stroke="#D7DADF" stroke-width="9" stroke-linejoin="round"';

// Orbit A: a restrained ellipse is drawn behind fixed Pass67; the letter
// naturally masks it at the crown and lower hook, testing explicit overlap.
const interruptedOrbit = '<ellipse cx="221" cy="238" rx="192" ry="195" fill="none" stroke="#77808A" stroke-width="7"/>';
// Orbit B: one connected outer-left sweep starts under the crown and tucks
// under the lifted hook tip, without crossing the shaft or entering the counter.
const connectedOrbit = '<path d="M132 56C101 74 80 116 80 160C80 206 107 255 167 278" fill="none" stroke="#77808A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>';

const marks = [
  { id: "pass67", title: "PASS67 · J ONLY", detail: "Fixed left-flare-weighted J; no orbit.", orbit: "", isBase: true },
  { id: "pass68-a", title: "PASS68 A · CROWN/HOOK OCCLUSION", detail: "Ellipse behind J; crown and hook break the visible rim.", orbit: interruptedOrbit },
  { id: "pass68-b", title: "PASS68 B · CONNECTED CROWN-TO-HOOK SWEEP", detail: "One outer-left sweep hides beneath crown and lifted hook; no shaft crossing or counter entry.", orbit: connectedOrbit },
];

function svgMark(size, bg, orbit, showJ) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="' + bg + '"/>' + orbit + (showJ ? '<path d="' + jPath + '" ' + transform + ' fill="#D7DADF"/>' : '') + '</svg>';
}
function sourceCard(title, image, detail) {
  return '<article class="card"><div class="title">' + title + '</div><div class="hero"><img src="' + image + '" alt="' + title + '"></div><div class="note">' + detail + '</div></article>';
}
function markCard(mark) {
  return '<article class="card"><div class="title">' + mark.title + '</div><div class="hero">' + svgMark(468, "#090C10", mark.orbit, true) + '</div><div class="note">' + mark.detail + '</div></article>';
}
function proofCard(title, image, mark) {
  const proofs = [54, 32].map((size) => {
    const art = mark
      ? svgMark(size, "#07090C", mark.orbit, true)
      : '<img src="' + image + '" width="' + size + '" height="' + size + '" alt="' + title + ' ' + size + 'px">';
    return '<div class="proof-item"><span>' + size + 'px</span><div class="proof-box">' + art + '</div><small>' + (mark ? 'same geometry, native size' : 'archive/current source downscale') + '</small></div>';
  }).join("");
  return '<article class="proof"><div class="proof-title">' + title + '</div><div class="proof-pair">' + proofs + '</div></article>';
}

const firstRead = [
  sourceCard("APPROVED ARCHIVE · 159:2", archive, "Unchanged integrated source mark; the visual standard."),
  sourceCard("CURRENT HERO · 1950:6", current, "Current full reconstruction, included as the production comparison."),
  markCard(marks[0]),
].join("");
const orbitOptions = [markCard(marks[1]), markCard(marks[2])].join("");
const smallProofs = [
  proofCard("ARCHIVE 159:2", archive, null),
  proofCard("CURRENT 1950:6", current, null),
  proofCard("PASS67 · J ONLY", null, marks[0]),
  proofCard("PASS68 A · OCCLUDED", null, marks[1]),
  proofCard("PASS68 B · CONNECTED", null, marks[2]),
].join("");

const html = [
  '<!doctype html><html><head><meta charset="utf-8"><title>Pass68 · macro orbit integration</title><style>',
  '*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:1800px;padding:30px 34px}',
  'h1{margin:0 0 8px;font-size:30px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:18px}',
  '.section{border-top:1px solid #343c45;padding-top:14px;margin-top:15px}h2{font-size:19px;color:#e7d6a8;margin:0 0 10px}',
  '.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.grid2{display:grid;grid-template-columns:repeat(2,1fr);gap:22px;max-width:1160px;margin:auto}.card,.proof{min-width:0}.title{font-size:14px;font-weight:700;color:#dce2e8;min-height:22px}',
  '.hero{width:100%;height:485px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center;overflow:hidden}.hero svg,.hero img{width:100%;height:100%;object-fit:contain}.note{font-size:12px;color:#939faa;margin-top:6px;min-height:32px}',
  '.proof-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}.proof{padding:9px;border:1px solid #38414b;background:#11161b}.proof-title{font-size:12px;font-weight:700;color:#dce2e8;margin-bottom:8px}.proof-pair{display:flex;gap:16px;align-items:flex-start}.proof-item{text-align:center;font-size:10px;color:#d1d7dd}.proof-item span{display:block;margin-bottom:4px}.proof-box{width:61px;height:61px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.proof-box svg,.proof-box img{width:auto;height:auto;max-width:54px;max-height:54px;image-rendering:pixelated}.proof-item small{display:block;font-size:8px;color:#82909d;margin-top:4px}',
  '.micro{margin-top:10px;border:1px dashed #46515d;padding:10px 14px;color:#aab4bd;display:flex;align-items:center;gap:13px;font-size:12px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:11px;color:#788591;margin-top:12px}',
  '</style></head><body>',
  '<h1>PASS68 · J / ORBIT INTEGRATION STUDY</h1>',
  '<div class="intro">Archive 159:2 stays the whole-mark standard. Pass67 remains fixed; A tests an orbit interrupted by the J at crown/hook, B tests one connected asymmetric path tucked beneath crown and curl. Only neutral linework is added—no new J contour, plasma, or material detail.</div>',
  '<section class="section"><h2>468px FIRST READ · ARCHIVE / CURRENT / FIXED PASS67</h2><div class="grid3">', firstRead, '</div></section>',
  '<section class="section"><h2>468px ORBIT OPTIONS · FIXED PASS67 J CONTOUR</h2><div class="grid2">', orbitOptions, '</div></section>',
  '<section class="section"><h2>54px / 32px · COMPLETE SOURCE MARKS AND J-ONLY STUDIES</h2><div class="proof-grid">', smallProofs,
  '</div><div class="micro"><strong>SEPARATE 16px RING-FREE CONTROL</strong><img src="', ringless16, '" width="16" height="16" alt="ring-free 16px J"><span>Pass16 simplified glyph, unchanged.</span></div></section>',
  '<div class="footer">Pass68 local study only · archive/current captures remain untouched; Pass67 geometry is reused unchanged in both orbit options; no Figma or production edits.</div>',
  '</body></html>'
].join("");

fs.writeFileSync(path.join(outDir, "pass68-macro-orbit-comparison.html"), html, "utf8");
for (const mark of marks) {
  const svg = svgMark(468, "#090C10", mark.orbit, true);
  fs.writeFileSync(path.join(outDir, mark.id + "-468.svg"), svg, "utf8");
  for (const size of [54, 32]) fs.writeFileSync(path.join(outDir, mark.id + "-" + size + ".svg"), svgMark(size, "#07090C", mark.orbit, true), "utf8");
}
console.log("Wrote Pass68 archive/current and orbit-integration comparison.");
