const { chromium } = require('C:/Users/samue/AppData/Local/OpenAI/Codex/runtimes/cua_node/cfb32733c877621e/bin/node_modules/playwright');
const fs = require('node:fs/promises');
const out='C:/oc03/docs/site-render-review/2026-10-12-banner-resume-identity-convergence/profile-lower-band-owner-reference-20261012';
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'}); const results=[];
 for(const [width,height] of [[1536,1360],[390,844]]){
  const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1}); const errors=[];const failures=[];page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>failures.push(r.url()));
  const response=await page.goto('http://127.0.0.1:5186/profile',{waitUntil:'networkidle'}); await page.screenshot({path:`${out}/after-${width}x${height}.jpg`,type:'jpeg',quality:88,animations:'disabled'});
  if(width>900){
   for(const id of ['projects','experience','hackathon','academics']){
    const target=page.locator(`[data-profile-signal="${id}"]`); await target.hover(); await page.waitForTimeout(70); const panel=page.locator('#profile-signal-preview-panel');
    const measured=await page.evaluate(id=>{const b=e=>{const r=e.getBoundingClientRect();return{x:+r.x.toFixed(1),y:+r.y.toFixed(1),right:+r.right.toFixed(1),bottom:+r.bottom.toFixed(1),width:+r.width.toFixed(1),height:+r.height.toFixed(1)}};const p=document.querySelector('#profile-signal-preview-panel'),s=document.querySelector(`[data-profile-signal="${id}"]`),i=s.querySelector('.profile-signal__emblem'),h=document.querySelector('.client-header');return{panel:b(p),signal:b(s),icon:b(i),header:h?b(h):null,title:p.querySelector('h2')?.textContent,hidden:p.hidden,document:[document.documentElement.scrollWidth,document.documentElement.scrollHeight]}},id);
    const entered=await panel.getAttribute('hidden')===null;const gap=+(measured.signal.y-measured.panel.bottom).toFixed(1),iconGap=+(measured.icon.y-measured.panel.bottom).toFixed(1);await page.mouse.move(measured.panel.x+measured.panel.width/2,measured.panel.y+measured.panel.height/2);await page.waitForTimeout(30);const staysOpen=await panel.getAttribute('hidden')===null;
    const name=`overlay-${id}-${width}x${height}.jpg`;await page.screenshot({path:`${out}/${name}`,type:'jpeg',quality:88,animations:'disabled'});results.push({viewport:[width,height],id,response:response?.status(),gap,iconGap,visible:entered,staysOpen,measured,errors:[...errors],failedRequests:[...failures],screenshot:name});
   }
  }else{const s=page.locator('[data-profile-signal="projects"]');await s.focus();await page.waitForTimeout(100);const panel=page.locator('#profile-signal-preview-panel');results.push({viewport:[width,height],response:response?.status(),keyboardFocused:await panel.getAttribute('hidden')===null,document:await page.evaluate(()=>[document.documentElement.scrollWidth,document.documentElement.scrollHeight]),errors,failedRequests:failures});}
  await page.close();
 }
 await browser.close();await fs.writeFile(`${out}/metrics.json`,JSON.stringify(results,null,2));console.log(JSON.stringify(results.map(r=>({viewport:r.viewport,id:r.id,response:r.response,gap:r.gap,iconGap:r.iconGap,visible:r.visible,staysOpen:r.staysOpen,keyboardFocused:r.keyboardFocused,document:r.document,errors:r.errors,failedRequests:r.failedRequests,screenshot:r.screenshot})),null,2));
})().catch(e=>{console.error(e);process.exit(1)});
