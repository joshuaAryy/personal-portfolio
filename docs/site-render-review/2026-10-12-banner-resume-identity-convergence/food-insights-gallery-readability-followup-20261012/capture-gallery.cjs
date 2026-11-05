const { chromium } = require('C:/Users/samue/AppData/Local/OpenAI/Codex/runtimes/cua_node/cfb32733c877621e/bin/node_modules/playwright');
const fs = require('node:fs/promises');
const path = 'C:/oc03/docs/site-render-review/2026-10-12-banner-resume-identity-convergence/food-insights-gallery-readability-followup-20261012';
const route = 'http://127.0.0.1:5185/projects/food-tracker';
const cards = [['macro','.food-insight-path__capture--lead'],['forecast','.food-insight-path__capture--forecast'],['fiber','.food-insight-path__capture--fiber'],['completeness','.food-insight-path__capture--consistency']];
async function alignTop(page, locator, top = 88) {
 const selector = await locator.evaluate(el => '.' + [...el.classList].join('.'));
 await locator.evaluate((el,top) => {
  const scroller=document.querySelector('.main--food-case');
  if(scroller && getComputedStyle(scroller).overflowY !== 'visible' && scroller.scrollHeight > scroller.clientHeight){
   scroller.style.scrollBehavior='auto';
   scroller.scrollTop += el.getBoundingClientRect().top - top;
  }else{
   document.documentElement.style.scrollBehavior='auto';
   window.scrollBy(0,el.getBoundingClientRect().top-top);
  }
 },top);
 await page.waitForFunction(({selector,top}) => Math.abs(document.querySelector(selector).getBoundingClientRect().top-top) < 3, {selector,top});
}
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 const report={route,chrome:'Installed Google Chrome',results:{}};
 for(const [size,viewport] of [['desktop',{width:1440,height:900}],['narrow',{width:390,height:844}]]){
  const page=await browser.newPage({viewport,deviceScaleFactor:1});
  const errors=[],failed=[]; page.on('pageerror',e=>errors.push(e.message)); page.on('requestfailed',r=>failed.push({url:r.url(),error:r.failure()?.errorText}));
  await page.goto(route,{waitUntil:'networkidle'});
  const gallery=page.locator('[data-gallery="insights-evidence"]');
  await gallery.scrollIntoViewIfNeeded();
  await page.waitForFunction(()=>[...document.querySelectorAll('[data-gallery="insights-evidence"] img')].every(i=>i.complete&&i.naturalWidth>0));
  if(size==='desktop'){
   await alignTop(page,gallery,155);
   await page.screenshot({path:`${path}/desktop-gallery-first-row.png`,animations:'disabled'});
   await alignTop(page,gallery.locator('.food-insight-path__capture--fiber'),155);
   await page.screenshot({path:`${path}/desktop-gallery-second-row.png`,animations:'disabled'});
  }
  const metrics=[];
  for(const [label,selector] of cards){
   const card=gallery.locator(selector);
   await alignTop(page,card,88);
   await card.screenshot({path:`${path}/${size}-${label}.png`,animations:'disabled'});
   metrics.push(await card.evaluate(el=>({title:el.querySelector('strong')?.textContent?.trim(),card:(()=>{const r=el.getBoundingClientRect();return [Math.round(r.width),Math.round(r.height)]})(),images:[...el.querySelectorAll('img')].map(i=>{const r=i.getBoundingClientRect();return {src:i.currentSrc.replace(location.origin,''),natural:[i.naturalWidth,i.naturalHeight],displayed:[Math.round(r.width),Math.round(r.height)],objectFit:getComputedStyle(i).objectFit,alt:i.alt}})})));
  }
  report.results[size]={viewport,documentWidth:await page.evaluate(()=>document.documentElement.scrollWidth),errors,failed,cards:metrics};
  await page.close();
 }
 await browser.close(); await fs.writeFile(`${path}/metrics.json`,JSON.stringify(report,null,2)); console.log(JSON.stringify(report,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
