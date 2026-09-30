const fs = require("fs");
const path = require("path");

const outDir = path.resolve("docs/j-source-review/captures/pass70");
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

// Pass68 B and Pass69 A are local controls. The Pass67 J is fixed in all tiles.
const pass68B = '<path d="M132 56C101 74 80 116 80 160C80 206 107 255 167 278" fill="none" stroke="#77808A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>';
const pass69A = '<path d="M156 278C164 301 183 328 205 338C225 347 242 332 248 312" fill="none" stroke="#77808A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>';
const pass69B = '<path d="M301 43C365 55 406 107 405 165C404 221 378 278 337 320C300 358 247 404 215 394C188 386 173 329 160 278" fill="none" stroke="#77808A" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>';
// Pass70 replaces Pass69 A's shallow bowl underline with a diagonal rising
// through the negative counter, terminating beneath the inner upright shoulder.
const pass70 = '<path d="M156 278C167 251 186 222 205 203C219 189 232 181 244 175" fill="none" stroke="#77808A" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>';

const variants = [
  { id: "pass67", title: "PASS67 · J ONLY", note: "Fixed J contour; no orbit.", orbit: "" },
  { id: "pass68-b", title: "PASS68 B · OUTER SWEEP CONTROL", note: "Outer-left crown-to-hook arc; retained for comparison.", orbit: pass68B },
  { id: "pass69-a", title: "PASS69 A · SHALLOW BOWL CONTROL", note: "Underline placement from the earlier inward test.", orbit: pass69A },
  { id: "pass69-b", title: "PASS69 B · LONG RETURN CONTROL", note: "Rejected long outer return; shown to compare bowl crowding.", orbit: pass69B },
  { id: "pass70", title: "PASS70 · RISING COUNTER SWEEP", note: "Diagonal counter path rises from the hook and disappears under the inner shoulder.", orbit: pass70 },
];

function svgMark(size, bg, orbit) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="' + bg + '"/>' + orbit + '<path d="' + jPath + '" ' + transform + ' fill="#D7DADF"/></svg>';
}
function sourceCard(title, image, note) {
  return '<article class="card"><div class="title">' + title + '</div><div class="hero"><img src="' + image + '" alt="' + title + '"></div><div class="note">' + note + '</div></article>';
}
function candidateCard(v) {
  return '<article class="card"><div class="title">' + v.title + '</div><div class="hero">' + svgMark(468, "#090C10", v.orbit) + '</div><div class="note">' + v.note + '</div></article>';
}
function proofCard(title, image, orbit) {
  const tiles = [54, 32].map((size) => {
    const art = orbit !== null
      ? svgMark(size, "#07090C", orbit)
      : '<img src="' + image + '" width="' + size + '" height="' + size + '" alt="' + title + ' ' + size + 'px">';
    return '<div class="proof-item"><span>' + size + 'px</span><div class="proof-box">' + art + '</div><small>' + (orbit !== null ? 'same J, native size' : 'source downscale') + '</small></div>';
  }).join("");
  return '<article class="proof"><div class="proof-title">' + title + '</div><div class="proof-pair">' + tiles + '</div></article>';
}

const refs = [
  sourceCard("APPROVED ARCHIVE · 159:2", archive, "Unchanged whole-mark standard."),
  sourceCard("CURRENT HERO · 1950:6", current, "Unchanged full reconstruction comparison."),
  candidateCard(variants[0]),
].join("");
const controls = variants.slice(1).map(candidateCard).join("");
const proofs = [
  proofCard("ARCHIVE 159:2", archive, null),
  proofCard("CURRENT 1950:6", current, null),
  ...variants.map((v) => proofCard(v.title, null, v.orbit)),
].join("");

const html = [
  '<!doctype html><html><head><meta charset="utf-8"><title>Pass70 · rising counter sweep</title><style>',
  '*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:2100px;padding:30px 34px}',
  'h1{margin:0 0 8px;font-size:30px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:18px}',
  '.section{border-top:1px solid #343c45;padding-top:14px;margin-top:15px}h2{font-size:19px;color:#e7d6a8;margin:0 0 10px}',
  '.grid3{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.grid-options{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.card,.proof{min-width:0}.title{font-size:13px;font-weight:700;color:#dce2e8;min-height:22px}',
  '.hero{width:100%;height:468px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center;overflow:hidden}.hero svg,.hero img{width:100%;height:100%;object-fit:contain}.note{font-size:10px;color:#939faa;margin-top:6px;min-height:31px}',
  '.proof-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:8px}.proof{padding:8px;border:1px solid #38414b;background:#11161b}.proof-title{font-size:10px;font-weight:700;color:#dce2e8;margin-bottom:7px;min-height:24px}.proof-pair{display:flex;gap:9px;align-items:flex-start}.proof-item{text-align:center;font-size:9px;color:#d1d7dd}.proof-item span{display:block;margin-bottom:4px}.proof-box{width:57px;height:57px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.proof-box svg,.proof-box img{width:auto;height:auto;max-width:54px;max-height:54px;image-rendering:pixelated}.proof-item small{display:block;font-size:7px;color:#82909d;margin-top:3px}',
  '.micro{margin-top:10px;border:1px dashed #46515d;padding:9px 12px;color:#aab4bd;display:flex;align-items:center;gap:12px;font-size:11px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:10px;color:#788591;margin-top:10px}',
  '</style></head><body>',
  '<h1>PASS70 · DIAGONAL COUNTER SWEEP</h1>',
  '<div class="intro">Pass67 J geometry and the separate ring-free 16px glyph are fixed. Pass68 B and Pass69 A are controls. Pass70 changes only the interior path: it rises diagonally through the left counter from the hook and disappears beneath the inner upright shoulder. No long outer return, mid-stem crossing, or extra loop.</div>',
  '<section class="section"><h2>468px FIRST READ · ARCHIVE / CURRENT / FIXED PASS67</h2><div class="grid3">', refs, '</div></section>',
  '<section class="section"><h2>468px COUNTER PLACEMENT · PASS68 B / PASS69 A / REJECTED PASS69 B / PASS70</h2><div class="grid-options">', controls, '</div></section>',
  '<section class="section"><h2>54px / 32px · ARCHIVE / CURRENT / PASS67 / ORBIT CONTROLS / PASS70</h2><div class="proof-grid">', proofs,
  '</div><div class="micro"><strong>SEPARATE 16px RING-FREE CONTROL</strong><img src="', ringless16, '" width="16" height="16" alt="ring-free 16px J"><span>Pass16 simplified glyph, unchanged.</span></div></section>',
  '<div class="footer">Pass70 local structural study only · Pass67 contour is reused unchanged; no Figma, shared asset, or production edits.</div>',
  '</body></html>'
].join("");

fs.writeFileSync(path.join(outDir, "pass70-diagonal-counter-comparison.html"), html, "utf8");
for (const v of variants) {
  for (const size of [468, 54, 32]) fs.writeFileSync(path.join(outDir, v.id + "-" + size + ".svg"), svgMark(size, size === 468 ? "#090C10" : "#07090C", v.orbit), "utf8");
}
console.log("Wrote Pass70 counter-sweep comparison and native-size proofs.");
