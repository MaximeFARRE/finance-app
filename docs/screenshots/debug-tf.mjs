import { chromium } from 'playwright';
const BASE = 'http://localhost:3210';
const URL = `${BASE}/session?trackId=market-finance&lessonId=mf-found-l1-action&mode=quiz`;
const wait = ms => new Promise(r => setTimeout(r, ms));
const dispatch = async (loc) => loc.dispatchEvent('click');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });
  await wait(800);

  async function printState(label) {
    const btns = await page.locator('button').allTextContents();
    const counter = await page.locator('span').filter({ hasText: /\d+ \/ \d+/ }).first().innerText().catch(() => '?');
    const heading = await page.locator('h1, h2, h3, [class*="question"]').first().innerText().catch(() => '');
    console.log(`\n[${label}] counter=${counter} q="${heading.slice(0,60)}" btns=${JSON.stringify(btns)}`);
  }

  await printState('start');

  // Advance through 6 cards (5 flip + 1 TF) and log each state
  for (let i = 0; i < 8; i++) {
    const btns = await page.locator('button').allTextContents();
    const hasVoir = btns.some(t => t.includes('Voir la réponse'));
    const hasTrouve = btns.some(t => t.includes('Trouvé') && !t.includes('Voir'));
    const hasMCQ = btns.some(t => /^A\./.test(t));
    const hasTF = btns.some(t => t.trim() === 'Vrai' || t.trim() === 'Faux') ||
                  btns.some(t => /^Vrai$|^Faux$/.test(t.trim()));
    const hasVerif = btns.some(t => t.includes('Vérifier'));
    const hasCont = btns.some(t => t.includes('Continuer'));
    const hasNum = await page.getByPlaceholder('Votre réponse…').isVisible().catch(() => false);
    
    console.log(`\nStep ${i+1}: voir=${hasVoir} trouve=${hasTrouve} mcq=${hasMCQ} tf=${hasTF} num=${hasNum} verif=${hasVerif} cont=${hasCont}`);
    console.log('  Buttons:', JSON.stringify(btns));

    if (hasVoir) {
      await dispatch(page.getByText('Voir la réponse').first()); await wait(600);
      const trouveLoc = page.locator('button').filter({ hasText: /Trouvé/ }).first();
      if (await trouveLoc.isVisible().catch(() => false)) { await dispatch(trouveLoc); await wait(700); }
    } else if (hasTF && !hasCont) {
      const vraiLoc = page.locator('button').filter({ hasText: /^Vrai$/ }).first();
      await dispatch(vraiLoc); await wait(600);
      const contLoc = page.locator('button').filter({ hasText: /Continuer/ }).first();
      console.log('  After Vrai click, cont visible:', await contLoc.isVisible().catch(() => false));
      console.log('  After Vrai click, btns:', await page.locator('button').allTextContents());
    } else if (hasNum && !hasVerif) {
      console.log('  Numeric in result state, looking for Continuer...');
      console.log('  All btns:', await page.locator('button').allTextContents());
      break;
    } else if (hasNum) {
      await page.getByPlaceholder('Votre réponse…').fill('0');
      await dispatch(page.locator('button').filter({ hasText: /Vérifier/ }).first()); await wait(600);
      const contLoc = page.locator('button').filter({ hasText: /Continuer/ }).first();
      console.log('  After Vérifier, cont visible:', await contLoc.isVisible().catch(() => false));
      console.log('  After Vérifier btns:', await page.locator('button').allTextContents());
    } else {
      console.log('  Nothing to do, breaking');
      break;
    }
    await printState(`after step ${i+1}`);
  }

  await ctx.close();
  await browser.close();
})();
