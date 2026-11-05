const fs = require('fs');
const { chromium } = require('C:/Users/samue/AppData/Local/OpenAI/Codex/runtimes/cua_node/cfb32733c877621e/bin/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const folder = 'docs/site-render-review/2026-10-12-food-insights-gallery';
  const label = process.argv[2] || 'before';
  fs.mkdirSync(folder, { recursive: true });
  const records = [];

  for (const [name, width, height] of [['desktop', 1440, 900], ['narrow', 390, 844]]) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    page.on('pageerror', (error) => console.log('Page error:', error.message));
    page.on('console', (message) => { if (message.type() === 'error') console.log('Browser console error:', message.text()); });
    await page.goto('http://127.0.0.1:5183/projects/food-tracker', { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.addStyleTag({ content: '.header { display: none !important; } .food-case-nav { position: static !important; }' });
    await page.waitForTimeout(3000);
    const gallery = page.locator('[data-gallery="insights-evidence"]');
    if (!(await gallery.count())) {
      console.log('Gallery not mounted:', await page.title(), (await page.locator('body').innerText()).slice(0, 800));
      throw new Error('Insights gallery did not mount');
    }
    await gallery.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => [...document.querySelectorAll('[data-gallery="insights-evidence"] img')].every((image) => image.complete && image.naturalWidth > 0), null, { timeout: 30000 });
    await page.waitForTimeout(250);
    await gallery.evaluate((element) => {
      const scroller = element.closest('.main--food-case');
      if (!scroller) return;
      const targetY = 20;
      scroller.scrollTop += element.getBoundingClientRect().y - targetY;
    });
    await page.waitForTimeout(50);
    await gallery.screenshot({ path: `${folder}/${label}-${name}-${width}x${height}.png` });
    records.push({
      name: label,
      viewport: { width, height, deviceScaleFactor: 1 },
      chrome: browser.version(),
      url: 'http://127.0.0.1:5183/projects/food-tracker',
      gallery: await gallery.evaluate((element) => ({
        rect: (() => {
          const { x, y, width, height } = element.getBoundingClientRect();
          return { x, y, width, height };
        })(),
        mainScrollTop: element.closest('.main--food-case')?.scrollTop,
        images: [...element.querySelectorAll('img')].map((image) => ({
          alt: image.alt,
          naturalWidth: image.naturalWidth,
          naturalHeight: image.naturalHeight,
        })),
      })),
    });
    await page.close();
  }

  fs.writeFileSync(`${folder}/${label}-manifest.json`, JSON.stringify(records, null, 2));
  await browser.close();
  console.log(JSON.stringify(records, null, 2));
})();
