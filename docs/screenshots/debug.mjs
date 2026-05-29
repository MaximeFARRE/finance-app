import { chromium } from 'playwright';
const BASE = 'http://localhost:3210';
const LESSON = 'mf-found-l2-indices';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();

  const url = `${BASE}/session?trackId=market-finance&lessonId=${LESSON}&mode=quiz`;
  await page.goto(url, { waitUntil: 'networkidle' });
  await new Promise(r => setTimeout(r, 1000));

  // Print all visible button texts
  const buttons = await page.locator('button').allTextContents();
  console.log('BUTTONS:', JSON.stringify(buttons));

  // Print page text
  const text = await page.locator('main').innerText().catch(() => 'no main');
  console.log('\nMAIN TEXT:\n', text.slice(0, 500));

  // Take screenshot
  await page.screenshot({ path: '/tmp/debug-quiz.png' });
  console.log('\n✓ debug screenshot at /tmp/debug-quiz.png');

  await ctx.close();
  await browser.close();
})();
