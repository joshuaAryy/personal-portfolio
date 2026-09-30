const fs = require("fs");
const path = require("path");

const outDir = path.resolve("docs/j-source-review/captures/pass66");
fs.mkdirSync(outDir, { recursive: true });

// Pass63 B + Pass64 E is the fixed baseline: the same upright, bowl, counter,
// and moderate lifted hook are reused in every treatment below.
const baselinePath = "M195 64C238 49 300 53 507 55C499 71 484 86 465 96L438 111C430 116 425 124 425 136L429 413C430 467 414 513 383 548C354 580 314 596 273 591C234 586 199 566 179 538C161 512 158 483 165 455C172 430 186 410 204 397C220 385 239 370 248 368C252 367 256 369 259 374C264 383 268 395 271 405C274 414 263 421 253 424C240 441 232 456 233 472C234 495 253 510 280 514C309 518 337 509 356 490C374 470 383 444 383 411L364 143C364 126 358 114 339 107C310 94 278 85 245 75C228 72 210 66 195 64Z";
const oldStart = "M195 64C238 49 300 53 507 55C499 71 484 86 465 96L438 111C430 116 425 124 425 136";
const oldLeft = "L364 143C364 126 358 114 339 107C310 94 278 85 245 75C228 72 210 66 195 64Z";

const pass65AStart = "M182 68C225 46 293 50 482 55C476 72 459 88 437 101L411 114C402 120 402 127 425 136";
const pass65ALeft = "L364 143C364 127 359 116 342 105C316 94 279 84 244 76C224 70 198 67 182 68Z";
const pass65BStart = "M200 72C241 44 314 47 500 54C495 69 482 83 462 92L440 107C428 117 422 126 425 136";
const pass65BLeft = "L364 143C364 128 360 118 347 107C322 96 291 87 260 79C237 73 217 71 200 72Z";

// Pass66 blends A's sloped left flare with a shorter extension and B's smooth
// shoulder return. The shaft/bowl/E hook and proof transform remain identical.
const pass66Start = "M188 68C230 47 296 50 489 55C484 70 471 85 452 96L440 107C428 117 422 126 425 136";
const pass66Left = "L364 143C364 127 359 116 342 105C316 94 279 84 248 76C229 70 204 67 188 68Z";

function replaceCrown(pathD, nextStart, nextLeft) {
  return pathD.replace(oldStart, nextStart).replace(oldLeft, nextLeft);
}

const variants = [
  { id: "base", title: "BASELINE · B UPRIGHT + E HOOK", note: "Pass63 B shaft/bowl + Pass64 E moderate hook lift; no crown change.", path: baselinePath },
  { id: "a", title: "PASS65 A · LONG SLOPED FLARE", note: "Archive-like long left slope; visible right-shoulder notch.", path: replaceCrown(baselinePath, pass65AStart, pass65ALeft) },
  { id: "b", title: "PASS65 B · COMPACT TAPER", note: "Clean shoulder return; left flare and overall crown are compact.", path: replaceCrown(baselinePath, pass65BStart, pass65BLeft) },
  { id: "c", title: "PASS66 · INTERMEDIATE SHOULDER", note: "A's sloped flare, pulled in 6px; B's continuous right return.", path: replaceCrown(baselinePath, pass66Start, pass66Left) },
];

const transform = 'transform="translate(-5.2 5) scale(.67 .738)" stroke="#D7DADF" stroke-width="9" stroke-linejoin="round"';
function svgMark(pathData, size, fill) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="' + fill + '"/><path d="' + pathData + '" ' + transform + ' fill="#D7DADF"/></svg>';
}
function dataUri(file) {
  return "data:image/svg+xml;base64," + fs.readFileSync(file).toString("base64");
}

const cards = variants.map((v) =>
  '<article class="card"><div class="title">' + v.title + '</div><div class="hero">' + svgMark(v.path, 468, "#090C10") + '</div><div class="note">' + v.note + '</div></article>'
).join("");
const proofs = variants.map((v) =>
  '<article class="proof"><div class="proof-title">' + v.title + '</div><div class="proof-pair">' + [54, 32].map((size) =>
    '<div class="proof-item"><span>' + size + 'px</span><div class="proof-box">' + svgMark(v.path, size, "#07090C") + '</div><small>native J-only proof</small></div>'
  ).join("") + '</div></article>'
).join("");

const ringless16 = dataUri(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"));
const html = [
  '<!doctype html><html><head><meta charset="utf-8"><title>Pass66 · intermediate crown</title><style>',
  '*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:2200px;padding:30px 34px}',
  'h1{margin:0 0 8px;font-size:30px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:18px}',
  '.section{border-top:1px solid #343c45;padding-top:14px;margin-top:15px}h2{font-size:19px;color:#e7d6a8;margin:0 0 10px}',
  '.grid,.proof-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px}.card,.proof{min-width:0}.title{font-size:14px;font-weight:700;color:#dce2e8;min-height:22px}',
  '.hero{width:100%;height:485px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center}.hero svg{width:100%;height:100%;object-fit:contain}.note{font-size:12px;color:#939faa;margin-top:6px;min-height:32px}',
  '.proof{padding:10px;border:1px solid #38414b;background:#11161b}.proof-title{font-size:13px;font-weight:700;color:#dce2e8;margin-bottom:8px}.proof-pair{display:flex;gap:22px;align-items:flex-start}.proof-item{text-align:center;font-size:11px;color:#d1d7dd}.proof-item span{display:block;margin-bottom:4px}.proof-box{width:66px;height:66px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.proof-box svg{width:auto;height:auto;image-rendering:pixelated}.proof-item small{display:block;font-size:9px;color:#82909d;margin-top:4px}',
  '.micro{margin-top:10px;border:1px dashed #46515d;padding:10px 14px;color:#aab4bd;display:flex;align-items:center;gap:13px;font-size:12px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:11px;color:#788591;margin-top:12px}',
  '</style></head><body>',
  '<h1>PASS66 · SLOPED FLARE + CONTINUOUS SHOULDER</h1>',
  '<div class="intro">Only the crown/shoulder changes across these four views. Pass66 keeps Pass65 A’s archive-like leftward slope, pulls its extension in, and blends the right underside into B’s clean return. B upright, shaft/bowl/counter, Pass64 E hook, scale transform, and separate ring-free 16px glyph stay fixed. Orbit remains out.</div>',
  '<section class="section"><h2>468px MACRO · BASELINE, PASS65 A/B, PASS66</h2><div class="grid">', cards, '</div></section>',
  '<section class="section"><h2>NATIVE 54px / 32px · SAME J-ONLY SHAPES</h2><div class="proof-grid">', proofs,
  '</div><div class="micro"><strong>SEPARATE 16px RING-FREE CONTROL</strong><img src="', ringless16, '" width="16" height="16" alt="ringless 16px J"><span>Pass16 simplified glyph, unchanged.</span></div></section>',
  '<div class="footer">Pass66 local comparison only · no Figma, production, or downstream changes.</div>',
  '</body></html>'
].join("");

fs.writeFileSync(path.join(outDir, "pass66-crown-comparison.html"), html, "utf8");
for (const variant of variants) {
  const large = '<svg xmlns="http://www.w3.org/2000/svg" width="468" height="468" viewBox="0 0 468 468"><rect width="468" height="468" fill="#090C10"/><path d="' + variant.path + '" ' + transform + ' fill="#D7DADF"/></svg>';
  fs.writeFileSync(path.join(outDir, "pass66-" + variant.id + "-468.svg"), large, "utf8");
  for (const size of [54, 32]) {
    const proof = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="' + size + '" height="' + size + '" fill="#07090C"/><path d="' + variant.path + '" ' + transform + ' fill="#D7DADF"/></svg>';
    fs.writeFileSync(path.join(outDir, "pass66-" + variant.id + "-" + size + ".svg"), proof, "utf8");
  }
}
console.log("Wrote Pass66 comparison HTML and SVG proof set.");
