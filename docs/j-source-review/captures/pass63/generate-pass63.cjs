const fs = require("fs");
const path = require("path");
const outDir = path.resolve("docs/j-source-review/captures/pass63");
const review = path.resolve("docs/j-source-review");
function data(file) {
  const ext = path.extname(file).toLowerCase();
  const mime = ext === ".svg" ? "image/svg+xml" : ((ext === ".jpg" || ext === ".jpeg") ? "image/jpeg" : "image/png");
  return "data:" + mime + ";base64," + fs.readFileSync(file).toString("base64");
}
const refs = [
  ["ARCHIVE · 159:2", path.join(review,"01-archive-target-159-2.png"), "Approved visual target; grayscale context."],
  ["CURRENT · 1950:6", path.join(review,"03-current-hero-1950-6.png"), "Current reconstruction; grayscale context."],
  ["UPPER SERIF · PASS 01", path.join(review,"captures/upper-serif-pass-01/hero-after-468.png"), "Earlier shoulder study."],
  ["UPPER SERIF · PASS 02", path.join(review,"captures/upper-serif-pass-02/hero-after-468.png"), "Later shoulder study."],
  ["PASS35 · ARCHIVE TRACE", path.join(review,"captures/pass59/pass35-seed-crop.png"), "Prior archive-traced starting point."],
  ["PASS60 · C MEDIUM RISE", path.join(review,"captures/pass60/pass60-c-medium-rise-468.png"), "Best recent orbit-free hook baseline."]
];
const archivePath = "M195 64C238 49 300 53 507 55C499 71 484 86 465 96L438 111C430 116 425 124 425 136L429 413C430 467 414 513 383 548C354 580 314 596 273 591C234 586 199 566 179 538C161 512 158 483 165 455C172 430 186 410 204 397C220 385 236 383 247 389C260 396 262 410 253 424C240 441 232 456 233 472C234 495 253 510 280 514C309 518 337 509 356 490C374 470 383 444 383 411L364 143C364 126 358 114 339 107C310 94 278 85 245 75C228 72 210 66 195 64Z";
const crownShaftPath = "M98 58C135 41 182 43 220 44H344C338 62 324 76 303 87L282 99C273 105 270 117 270 133L276 315C277 351 267 382 246 405C226 428 196 435 167 423C140 412 119 392 108 368C98 346 100 324 109 307C118 291 133 281 149 277C161 274 171 279 176 288C181 298 176 308 168 317C159 328 155 340 160 353C165 369 183 376 202 373C222 370 236 355 242 336C247 318 245 299 245 280L240 134C239 117 231 108 215 100C188 88 155 78 131 68C115 62 104 60 98 58Z";
const hookPath = "M195 64C238 49 300 53 507 55C499 71 484 86 465 96L438 111C430 116 425 124 425 136L429 413C430 467 414 513 383 548C354 580 314 596 273 591C234 586 199 566 179 538C161 512 158 483 165 455C172 430 186 410 204 397C217 389 232 379 245 368C255 360 266 367 272 377C278 388 274 400 265 410C254 423 240 445 238 465C236 488 252 505 280 514C309 518 337 509 356 490C374 470 383 444 383 411L364 143C364 126 358 114 339 107C310 94 278 85 245 75C228 72 210 66 195 64Z";
const candA = '<path d="' + archivePath + '" transform="translate(-50 9) scale(.78 .70)"/>';
const candB = '<path d="' + archivePath + '" transform="translate(-5.2 5) scale(.67 .738)" stroke="#D7DADF" stroke-width="9" stroke-linejoin="round"/>';
const candC = '<path d="' + hookPath + '" transform="translate(-50 9) scale(.78 .70)"/>';
const candidates = [
  {id:"A", title:"ARCHIVE TRACE", sub:"Archive contour · sloped shoulder · substantial upright", svg:candA},
  {id:"B", title:"VERTICAL + SHAFT", sub:"−14.1% width · +5.4% height · 9px contour weight", svg:candB},
  {id:"C", title:"LIFTED HOOK / COUNTER", sub:"Crown/shaft held · tip lifted 16px · open counter retained", svg:candC}
];
function svgFor(mark, size, fill) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" rx="4" fill="#0A0D11"/><g fill="' + fill + '" stroke="#8A9098" stroke-width="1.1" stroke-linejoin="round">' + mark + '</g></svg>';
}
const refHtml = refs.map(function(item) {
  return '<article class="ref"><div class="tag">' + item[0] + '</div><div class="picture"><img src="' + data(item[1]) + '" alt="' + item[0] + '"></div><div class="note">' + item[2] + '</div></article>';
}).join("");
const macroCards = [
  '<article class="macro"><div class="tag">PASS60 · C BASELINE</div><div class="macroPicture"><img src="' + data(path.join(review,"captures/pass60/pass60-c-medium-rise-468.png")) + '" alt="Pass60 C"></div><div class="note">Pass35 bowl/counter anchors · medium-rise hook · orbit-free</div></article>'
];
candidates.forEach(function(c) {
  macroCards.push('<article class="macro"><div class="tag">PASS63' + c.id + ' · ' + c.title + '</div><div class="macroPicture">' + svgFor(c.svg,468,"#D7DADF") + '</div><div class="note">' + c.sub + '</div></article>');
});
function proofSvg(mark, size) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="#07090C"/><g fill="#EEF1F3" stroke="#EEF1F3" stroke-width="1.4" stroke-linejoin="round">' + mark + '</g></svg>';
}
const proofGroups = [];
const baseProofs = ["pass60-c-proof-54.png","pass60-c-proof-32.png","pass60-c-proof-16.png"];
proofGroups.push('<article class="proofGroup"><div class="proofTitle">PASS60 · C BASELINE</div><div class="proofRow">' + [54,32,16].map(function(size,i) {
  return '<div class="proofCell"><div>' + size + 'px</div><div class="proofBox"><img src="' + data(path.join(review,"captures/pass60",baseProofs[i])) + '" width="' + size + '" height="' + size + '"></div><div class="proofDim">native ' + size + '×' + size + '</div></div>';
}).join("") + '</div></article>');
candidates.forEach(function(c) {
  proofGroups.push('<article class="proofGroup"><div class="proofTitle">PASS63' + c.id + ' · ' + c.title + '</div><div class="proofRow">' + [54,32,16].map(function(size) {
    return '<div class="proofCell"><div>' + size + 'px</div><div class="proofBox">' + proofSvg(c.svg,size) + '</div><div class="proofDim">native ' + size + '×' + size + ' · ring-free</div></div>';
  }).join("") + '</div></article>');
});
const simple16 = data(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"));
const html = [
'<!doctype html><html><head><meta charset="utf-8"><title>Pass63 · Archive-led macro silhouettes</title><style>',
'*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:2200px;padding:30px 34px 34px}',
'h1{margin:0 0 7px;font-size:30px;letter-spacing:.04em;color:#f1dfad}.subhead{color:#aab3bc;font-size:15px;line-height:1.4;margin-bottom:22px}',
'.section{border-top:1px solid #343c45;padding-top:15px;margin-top:15px}h2{margin:0 0 13px;font-size:19px;letter-spacing:.035em;color:#e7d6a8}',
'.refs{display:grid;grid-template-columns:repeat(6,1fr);gap:13px}.ref{min-width:0}.tag{font-weight:700;font-size:14px;color:#d4dbe2;min-height:25px}',
'.picture{width:100%;height:264px;border:1px solid #313841;background:#07090c;display:flex;align-items:center;justify-content:center;overflow:hidden}.picture img{width:100%;height:100%;object-fit:contain;filter:grayscale(1)}',
'.note{color:#8f9aa4;font-size:12px;line-height:1.35;margin-top:6px;min-height:33px}',
'.macroGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px}.macro{min-width:0}.macroPicture{width:100%;height:370px;border:1px solid #38414b;background:#07090c;display:flex;align-items:center;justify-content:center;overflow:hidden}.macroPicture img,.macroPicture svg{width:100%;height:100%;object-fit:contain}.macro .tag{font-size:15px}',
'.proofGrid{display:grid;grid-template-columns:repeat(4,1fr);gap:15px}.proofGroup{border:1px solid #333c46;background:#101419;padding:11px}.proofTitle{font-weight:700;font-size:14px;color:#d6dfeb;margin-bottom:12px;min-height:18px}.proofRow{display:flex;gap:24px;align-items:flex-start}',
'.proofCell{text-align:center;color:#c8cfd6;font-size:12px}.proofBox{height:62px;min-width:62px;display:flex;align-items:center;justify-content:center;margin-top:6px;background:#07090c;border:1px solid #303943}.proofBox img{image-rendering:pixelated}.proofBox svg{width:auto;height:auto;image-rendering:pixelated}.proofDim{font-size:10px;color:#82909d;margin-top:6px;white-space:nowrap}',
'.control{margin-top:12px;border:1px dashed #46515d;padding:12px 16px;color:#a9b4bf;display:flex;align-items:center;gap:14px;font-size:13px}.control img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{margin-top:15px;color:#788591;font-size:12px}',
'</style></head><body>',
'<h1>PASS63 · ARCHIVE-LED MACRO RECONSTRUCTIONS</h1>',
'<div class="subhead">Macro-first, orbit-free candidate comparison. Reference row uses grayscale source captures; candidate row isolates J silhouette. Production and Figma remain unchanged.</div>',
'<section class="section"><h2>REFERENCE LINEAGE · SAME 468px VIEW</h2><div class="refs">',refHtml,'</div></section>',
'<section class="section"><h2>PRIMARY READ · STANDALONE J SHAPES · 468px</h2><div class="subhead">Orbit excluded from the candidate row. A uses the existing archive-led silhouette path; B tests vertical fill/shaft weight; C keeps the shoulder/upright; lifts the outer hook 16 source px and opens the counter.</div><div class="macroGrid">',macroCards.join(""),'</div></section>',
'<section class="section"><h2>NATIVE PROOFS · J ONLY · RING-FREE</h2><div class="proofGrid">',proofGroups.join(""),'</div>',
'<div class="control"><strong>SEPARATE 16px CONTROL · PASS16 SIMPLIFIED VECTOR</strong><img src="',simple16,'" width="16" height="16" alt="Pass16 ring-free control"><span>Keep a dedicated simplified glyph at 16px; the larger orbit treatment is not used here.</span></div></section>',
'<div class="footer">Pass63 local comparison only · Candidate SVGs are reversible studies derived from the archive-led path. No Figma, source, consumer, asset, or production edits.</div>',
'</body></html>'
].join("");
fs.writeFileSync(path.join(outDir,"pass63-macro-comparison.html"),html,"utf8");
for (const c of candidates) {
  const slug = "pass63-" + c.id.toLowerCase();
  const standalone = '<svg xmlns="http://www.w3.org/2000/svg" width="468" height="468" viewBox="0 0 468 468"><rect width="468" height="468" fill="#0A0D11"/><g fill="#D7DADF" stroke="#8A9098" stroke-width="1.1" stroke-linejoin="round">' + c.svg + '</g></svg>';
  fs.writeFileSync(path.join(outDir,slug+"-shape.svg"),standalone,"utf8");
  [468,54,32,16].forEach(function(size) {
    const proof = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="#07090C"/><g fill="#EEF1F3" stroke="#EEF1F3" stroke-width="1.4" stroke-linejoin="round">' + c.svg + '</g></svg>';
    fs.writeFileSync(path.join(outDir,slug+"-"+size+".svg"),proof,"utf8");
  });
}
console.log("Wrote Pass63 HTML and candidate SVGs.");
