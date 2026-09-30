const fs = require("fs");
const path = require("path");
const outDir = path.resolve("docs/j-source-review/captures/pass64");
const review = path.resolve("docs/j-source-review");
function data(file) {
  const ext = path.extname(file).toLowerCase();
  const mime = ext === ".svg" ? "image/svg+xml" : "image/png";
  return "data:" + mime + ";base64," + fs.readFileSync(file).toString("base64");
}
const basePath = "M195 64C238 49 300 53 507 55C499 71 484 86 465 96L438 111C430 116 425 124 425 136L429 413C430 467 414 513 383 548C354 580 314 596 273 591C234 586 199 566 179 538C161 512 158 483 165 455C172 430 186 410 204 397C220 385 236 383 247 389C260 396 262 410 253 424C240 441 232 456 233 472C234 495 253 510 280 514C309 518 337 509 356 490C374 470 383 444 383 411L364 143C364 126 358 114 339 107C310 94 278 85 245 75C228 72 210 66 195 64Z";
const target = "C220 385 236 383 247 389C260 396 262 410 253 424";
const ePath = basePath.replace(target, "C220 385 239 370 248 368C252 367 256 369 259 374C264 383 268 395 271 405C274 414 263 421 253 424");
const fPath = basePath.replace(target, "C218 385 238 361 249 356C253 354 257 357 260 362C266 371 270 383 274 393C278 405 266 419 253 424");
const transform = 'transform="translate(-5.2 5) scale(.67 .738)" stroke="#D7DADF" stroke-width="9" stroke-linejoin="round"';
const variants = [
  {id:"b",label:"PASS63 B · BASELINE",note:"Archive-traced crown/shaft/bowl/counter; no terminal change.",path:basePath},
  {id:"e",label:"PASS64 E · C-LIFT TAPER",note:"Outer tip lifted 21 source px; smooth rising taper.",path:ePath},
  {id:"f",label:"PASS64 F · HIGHER WEDGE",note:"Outer tip lifted 32 source px; stronger directional wedge.",path:fPath}
];
function mark(pathD, size, bg) {
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="' + (bg || '#0A0D11') + '"/><path d="' + pathD + '" ' + transform + ' fill="#D7DADF"/></svg>';
}
const main = variants.map(function(v) {
  return '<article class="card"><div class="tag">' + v.label + '</div><div class="hero">' + mark(v.path,468,'#0A0D11') + '</div><div class="note">' + v.note + '</div></article>';
}).join("");
const proofs = variants.map(function(v) {
  return '<article class="proof"><div class="proofTitle">' + v.label + '</div><div class="proofRow">' + [54,32].map(function(size) {
    return '<div class="p"><div class="pSize">' + size + 'px</div><div class="pBox">' + mark(v.path,size,'#07090C') + '</div><div class="pNote">native ' + size + '×' + size + ' · J only</div></div>';
  }).join("") + '</div></article>';
}).join("");
const micro = data(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"));
const html = [
'<!doctype html><html><head><meta charset="utf-8"><title>Pass64 · terminal variants</title><style>',
'*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:1800px;padding:30px 34px}',
'h1{margin:0 0 8px;font-size:30px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:20px}',
'.section{border-top:1px solid #343c45;padding-top:15px;margin-top:16px}h2{font-size:19px;color:#e7d6a8;margin:0 0 12px}',
'.grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.card,.proof{min-width:0}.tag{font-size:15px;font-weight:700;color:#dce2e8;min-height:24px}',
'.hero{width:100%;height:500px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center}.hero svg{width:100%;height:100%;object-fit:contain}.note{font-size:13px;color:#939faa;margin-top:7px}',
'.proofGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.proof{padding:12px;border:1px solid #38414b;background:#11161b}.proofTitle{font-size:14px;font-weight:700;color:#dce2e8;margin-bottom:10px}.proofRow{display:flex;gap:35px;align-items:flex-start}.p{text-align:center;font-size:12px;color:#d1d7dd}.pSize{margin-bottom:5px}.pBox{width:74px;height:74px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.pBox svg{width:auto;height:auto;image-rendering:pixelated}.pNote{font-size:10px;color:#82909d;margin-top:5px}',
'.micro{margin-top:12px;border:1px dashed #46515d;padding:12px 16px;color:#aab4bd;display:flex;align-items:center;gap:14px;font-size:13px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:12px;color:#788591;margin-top:14px}',
'</style></head><body>',
'<h1>PASS64 · B-BASED OUTER TERMINAL STUDY</h1>',
'<div class="intro">Only the outer hook terminal changes. Pass63 B crown, shaft, bowl reach, and open counter are held fixed. No orbit in the primary read; production and Figma remain untouched.</div>',
'<section class="section"><h2>468px MACRO · BASELINE VS TWO RISING TAPER OPTIONS</h2><div class="grid">',main,'</div></section>',
'<section class="section"><h2>NATIVE 54px / 32px · J ONLY</h2><div class="proofGrid">',proofs,'</div>',
'<div class="micro"><strong>SEPARATE 16px RING-FREE CONTROL · PASS16 SIMPLIFIED GLYPH</strong><img src="',micro,'" width="16" height="16" alt="ring-free 16px control"><span>Unchanged from the dedicated simplified micro-size direction.</span></div></section>',
'<div class="footer">Pass64 local comparison only · exact same B transform on all three; terminal segment alone differs in E/F.</div>',
'</body></html>'
].join("");
fs.writeFileSync(path.join(outDir,"pass64-terminal-comparison.html"),html,"utf8");
variants.forEach(function(v) {
  const svg468 = '<svg xmlns="http://www.w3.org/2000/svg" width="468" height="468" viewBox="0 0 468 468"><rect width="468" height="468" fill="#0A0D11"/><path d="' + v.path + '" ' + transform + ' fill="#D7DADF"/></svg>';
  fs.writeFileSync(path.join(outDir,"pass64-"+v.id+"-468.svg"),svg468,"utf8");
  [54,32].forEach(function(size) {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + size + '" height="' + size + '" viewBox="0 0 468 468"><rect width="468" height="468" fill="#07090C"/><path d="' + v.path + '" ' + transform + ' fill="#EEF1F3"/></svg>';
    fs.writeFileSync(path.join(outDir,"pass64-"+v.id+"-"+size+".svg"),svg,"utf8");
  });
});
console.log("Wrote Pass64 board and same-transform SVG proofs.");
