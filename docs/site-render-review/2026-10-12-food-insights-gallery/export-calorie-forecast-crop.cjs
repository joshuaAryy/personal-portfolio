const fs = require('fs');
const path = require('path');
const { chromium } = require('C:/Users/samue/AppData/Local/OpenAI/Codex/runtimes/cua_node/cfb32733c877621e/bin/node_modules/playwright');

const source = 'C:/Users/samue/Downloads/Food_Tracker_Calorie_Forecast_Owner_Reference_2026-10-12.jpeg';
const output = 'public/media/case-studies/food-tracker/insights/calorie-forecast-owner-reference.png';
const crop = { x: 532, y: 0, width: 286, height: 520 };

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  try {
    const page = await browser.newPage();
    const jpeg = fs.readFileSync(source).toString('base64');
    await page.setContent(`<img id="source" src="data:image/jpeg;base64,${jpeg}">`);
    await page.waitForFunction(() => document.querySelector('#source')?.complete && document.querySelector('#source').naturalWidth > 0);
    const png = await page.evaluate(({ x, y, width, height }) => {
      const image = document.querySelector('#source');
      if (image.naturalWidth !== 1536 || image.naturalHeight !== 1059) throw new Error('Unexpected owner reference dimensions');
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      canvas.getContext('2d').drawImage(image, x, y, width, height, 0, 0, width, height);
      return canvas.toDataURL('image/png').split(',')[1];
    }, crop);
    fs.mkdirSync(path.dirname(output), { recursive: true });
    fs.writeFileSync(output, Buffer.from(png, 'base64'));
    console.log(JSON.stringify({ source, output, crop, chrome: browser.version() }, null, 2));
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
