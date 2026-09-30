const fs = require("fs");
const path = require("path");
const outDir = path.resolve("docs/j-source-review/captures/pass65");
function data(file) {
  return "data:image/svg+xml;base64," + fs.readFileSync(file).toString("base64");
}
const baselinePath = "M195 64C238 49 300 53 507 55C499 71 484 86 465 96L438 111C430 116 425 124 425 136L429 413C430 467 414 513 383 548C354 580 314 596 273 591C234 586 199 566 179 538C161 512 158 483 165 455C172 430 186 410 204 397C220 385 239 370 248 368C252 367 256 369 259 374C264 383 268 395 271 405C274 414 263 421 253 424C240 441 232 456 233 472C234 495 253 510 280 514C309 518 337 509 356 490C374 470 383 444 383 411L364 143C364 126 358 114 339 107C310 94 278 85 245 75C228 72 210 66 195 64Z";
const start = "M195 64C238 49 300 53 507 55C499 71 484 86 465 96L438 111C430 116 425 124 425 136";
const leftJoin = "L364 143C364 126 358 114 339 107C310 94 278 85 245 75C228 72 210 66 195 64Z";
const treatmentAStart = "M182 68C225 46 293 50 482 55C476 72 459 88 437 101L411 114C402 120 402 127 425 136";
const treatmentALeft = "L364 143C364 127 359 116 342 105C316 94 279 84 244 76C224 70 198 67 182 68Z";
const treatmentBStart = "M200 72C241 44 314 47 500 54C495 69 482 83 462 92L440 107C428 117 422 126 425 136";
const treatmentBLeft = "L364 143C364 128 360 118 347 107C322 96 291 87 260 79C237 73 217 71 200 72Z";
function replaceCrown(pathD, newStart, newLeft) {
  return pathD.replace(start,newStart).replace(leftJoin,newLeft);
}
const variantA = replaceCrown(baselinePath,treatmentAStart,treatmentALeft);
const variantB = replaceCrown(baselinePath,treatmentBStart,treatmentBLeft);
const options = [
  {id:"base",title:"PASS63 B + PASS64 E",label:"BASELINE",note:"B crown/shaft/bowl + E moderate terminal lift; no crown edit.",path:baselinePath},
  {id:"a",title:"PASS65 A · LONG SLOPED FLARE",label:"TREATMENT A",note:"Left tip extended 13 source px; right shelf shortened 25px; deeper underside sweep.",path:variantA},
  {id:"b",title:"PASS65 B · COMPACT TAPER",label:"TREATMENT B",note:"Left tip pulled in 5px; upper shoulder returns earlier; tapered right return.",path:variantB}
];
const transform = 'transform="translate(-5.2 5) scale(.67 .738)" stroke="#D7DADF" stroke-width="9" stroke-linejoin="round"';
function mark(pathD,size,bg) {
 return '<svg xmlns="http://www.w3.org/2000/svg" width="'+size+'" height="'+size+'" viewBox="0 0 468 468"><rect width="468" height="468" fill="'+bg+'"/><path d="'+pathD+'" '+transform+' fill="#D7DADF"/></svg>';
}
const cards = options.map(function(o) {
 return '<article class="card"><div class="tag">'+o.title+'</div><div class="hero">'+mark(o.path,468,"#0A0D11")+'</div><div class="note">'+o.note+'</div></article>';
}).join("");
const proofCards = options.map(function(o) {
 return '<article class="proof"><div class="proofTitle">'+o.title+'</div><div class="proofRow">'+[54,32].map(function(size) {
   return '<div class="p"><div class="pSize">'+size+'px</div><div class="pBox">'+mark(o.path,size,"#07090C")+'</div><div class="pNote">native '+size+'×'+size+' · J only</div></div>';
 }).join("")+'</div></article>';
}).join("");
const micro = data(path.resolve("public/media/profile/open-portfolio-j-ringless-16px.svg"));
const html=[
'<!doctype html><html><head><meta charset="utf-8"><title>Pass65 · crown shoulder variants</title><style>',
'*{box-sizing:border-box}html,body{margin:0;background:#0c0f13;color:#e9edf1;font-family:Arial,Segoe UI,sans-serif}body{width:1800px;padding:30px 34px}',
'h1{margin:0 0 8px;font-size:30px;letter-spacing:.04em;color:#f1dfad}.intro{font-size:15px;color:#aab3bc;line-height:1.45;margin-bottom:20px}',
'.section{border-top:1px solid #343c45;padding-top:15px;margin-top:16px}h2{font-size:19px;color:#e7d6a8;margin:0 0 12px}',
'.grid,.proofGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.card,.proof{min-width:0}.tag{font-size:15px;font-weight:700;color:#dce2e8;min-height:24px}',
'.hero{width:100%;height:500px;background:#080b0e;border:1px solid #37414b;display:flex;align-items:center;justify-content:center}.hero svg{width:100%;height:100%;object-fit:contain}.note{font-size:13px;color:#939faa;margin-top:7px}',
'.proof{padding:12px;border:1px solid #38414b;background:#11161b}.proofTitle{font-size:14px;font-weight:700;color:#dce2e8;margin-bottom:10px}.proofRow{display:flex;gap:35px;align-items:flex-start}.p{text-align:center;font-size:12px;color:#d1d7dd}.pSize{margin-bottom:5px}.pBox{width:74px;height:74px;border:1px solid #303943;background:#07090c;display:flex;align-items:center;justify-content:center}.pBox svg{width:auto;height:auto;image-rendering:pixelated}.pNote{font-size:10px;color:#82909d;margin-top:5px}',
'.micro{margin-top:12px;border:1px dashed #46515d;padding:12px 16px;color:#aab4bd;display:flex;align-items:center;gap:14px;font-size:13px}.micro img{width:16px;height:16px;image-rendering:pixelated;background:#07090c;border:1px solid #4d5660}.footer{font-size:12px;color:#788591;margin-top:14px}',
'</style></head><body>',
'<h1>PASS65 · ARCHIVE CROWN / SHOULDER STUDY</h1>',
'<div class="intro">Baseline is Pass63 B with Pass64 E’s moderate rising-hook lift. Only the crown/shoulder outline changes in A/B; upright, bowl, counter, and hook are held. Orbit stays out. The dedicated Pass16 16px ring-free glyph remains separate.</div>',
'<section class="section"><h2>468px MACRO · BASELINE VS TWO CROWN TREATMENTS</h2><div class="grid">',cards,'</div></section>',
'<section class="section"><h2>NATIVE 54px / 32px · J ONLY</h2><div class="proofGrid">',proofCards,'</div>',
'<div class="micro"><strong>SEPARATE 16px RING-FREE CONTROL · PASS16 SIMPLIFIED GLYPH</strong><img src="',micro,'" width="16" height="16" alt="ring-free 16px control"><span>Unchanged; no orbit or crown detail added at 16px.</span></div></section>',
'<div class="footer">Pass65 local, reversible study only · A/B replace only crown/shoulder path segments. No Figma or production changes.</div>',
'</body></html>'
].join("");
fs.writeFileSync(path.join(outDir,"pass65-crown-comparison.html"),html,"utf8");
options.forEach(function(o) {
 const svg468='<svg xmlns="http://www.w3.org/2000/svg" width="468" height="468" viewBox="0 0 468 468"><rect width="468" height="468" fill="#0A0D11"/><path d="'+o.path+'" '+transform+' fill="#D7DADF"/></svg>';
 fs.writeFileSync(path.join(outDir,"pass65-"+o.id+"-468.svg"),svg468,"utf8");
 [54,32].forEach(function(size){
  const proof='<svg xmlns="http://www.w3.org/2000/svg" width="'+size+'" height="'+size+'" viewBox="0 0 468 468"><rect width="468" height="468" fill="#07090C"/><path d="'+o.path+'" '+transform+' fill="#EEF1F3"/></svg>';
  fs.writeFileSync(path.join(outDir,"pass65-"+o.id+"-"+size+".svg"),proof,"utf8");
 });
});
console.log("Wrote Pass65 board and proofs.");
