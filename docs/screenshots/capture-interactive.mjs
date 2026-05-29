/**
 * Capture interactive card screenshots (MCQ, TF, numeric).
 *
 * l1-action quiz has 11 difficulty-1 cards, limit = 10.
 * Interactive cards appear at positions 5–9 (after 5 flip cards).
 *
 * Key findings from debugging:
 * - Playwright .click() scroll-interferes on self-rating buttons → use dispatchEvent
 * - After answering a TF/interactive card, the quiz renders ALL remaining cards in DOM
 *   (they become visible). We must use 'button:visible' and wait for Continuer.
 * - "Continuer" button (text "Continuer le quiz →") takes ~1s to appear after answer.
 */
import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'http://localhost:3210';
const LESSON_URL = `${BASE}/session?trackId=market-finance&lessonId=mf-found-l1-action&mode=quiz`;
const OUT = __dirname;
const VIEWPORT = { width: 1280, height: 800 };

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const dispatch = (loc) => loc.dispatchEvent('click');

/**
 * Detect the interactive type of the CURRENT card.
 * Uses 'button:visible' to avoid matching pre-rendered hidden cards.
 * TF is only detected if buttons show plain "Vrai"/"Faux" (not answered yet).
 */
async function detectCard(page) {
  // MCQ: a visible button whose text starts with "A."
  const mcqCount = await page
    .locator('button:visible')
    .filter({ hasText: /^A\./ })
    .count()
    .catch(() => 0);
  if (mcqCount > 0) return 'mcq';

  // TF: both "Vrai" and "Faux" visible without ✗/✓ suffix (unanswered)
  const vraiText = await page
    .locator('button:visible')
    .filter({ hasText: /^Vrai$/ })
    .first()
    .innerText()
    .catch(() => '');
  const fauxText = await page
    .locator('button:visible')
    .filter({ hasText: /^Faux$/ })
    .first()
    .innerText()
    .catch(() => '');
  if (vraiText.trim() === 'Vrai' && fauxText.trim() === 'Faux') return 'tf';

  // Numeric: visible enabled input
  const numInput = page.getByPlaceholder('Votre réponse…');
  const numVisible = await numInput.isVisible().catch(() => false);
  const numEnabled = numVisible && !(await numInput.isDisabled().catch(() => true));
  if (numEnabled) return 'numeric';

  return null; // flip card
}

/**
 * Advance past the current card.
 * Waits for Continuer button after interactive cards.
 */
async function advance(page) {
  // Flip card (front side)
  const voir = page.locator('button:visible').filter({ hasText: /^Voir la réponse$/ }).first();
  if (await voir.isVisible().catch(() => false)) {
    await dispatch(voir);
    await wait(600);
    const trouve = page.locator('button:visible').filter({ hasText: /Trouvé/ }).first();
    if (await trouve.isVisible().catch(() => false)) {
      await dispatch(trouve);
      await wait(700);
    }
    return 'flip';
  }

  // Flip card already in self-rating state
  const trouve = page.locator('button:visible').filter({ hasText: /Trouvé/ }).first();
  if (await trouve.isVisible().catch(() => false)) {
    await dispatch(trouve);
    await wait(700);
    return 'flip-rated';
  }

  // TF: unanswered — click Faux (true for tf-1: statement is false)
  const faux = page.locator('button:visible').filter({ hasText: /^Faux$/ }).first();
  if (await faux.isVisible().catch(() => false)) {
    await dispatch(faux);
    // Wait for Continuer button to appear (takes ~1s in quiz)
    const cont = page.locator('button').filter({ hasText: /Continuer/ }).first();
    await cont.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await cont.isVisible().catch(() => false)) {
      await dispatch(cont);
      await wait(700);
    }
    return 'tf';
  }

  // MCQ: pick first visible choice (starts with "A.")
  const choiceA = page
    .locator('button:visible')
    .filter({ hasText: /^A\./ })
    .first();
  if (await choiceA.isVisible().catch(() => false)) {
    await dispatch(choiceA);
    const cont = page.locator('button').filter({ hasText: /Continuer/ }).first();
    await cont.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await cont.isVisible().catch(() => false)) {
      await dispatch(cont);
      await wait(700);
    }
    return 'mcq';
  }

  // Numeric: fill and verify
  const input = page.getByPlaceholder('Votre réponse…');
  const inputVisible = await input.isVisible().catch(() => false);
  if (inputVisible && !(await input.isDisabled().catch(() => true))) {
    await input.fill('0');
    const verif = page.locator('button:visible').filter({ hasText: /Vérifier/ }).first();
    if (await verif.isVisible().catch(() => false)) {
      await dispatch(verif);
    }
    const cont = page.locator('button').filter({ hasText: /Continuer/ }).first();
    await cont.waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});
    if (await cont.isVisible().catch(() => false)) {
      await dispatch(cont);
      await wait(700);
    }
    return 'numeric';
  }

  return null;
}

/**
 * Open a fresh quiz session and screenshot the first card of the target type.
 */
async function captureCard(browser, cardType, outputName, maxCards = 20) {
  const ctx = await browser.newContext({ viewport: VIEWPORT });
  const page = await ctx.newPage();

  await page.goto(LESSON_URL, { waitUntil: 'networkidle' });
  await wait(800);

  const deckText = await page
    .locator('span')
    .filter({ hasText: /\d+ \/ \d+/ })
    .first()
    .innerText()
    .catch(() => '?');
  console.log(`  [${outputName}] deck: ${deckText}`);

  for (let i = 0; i < maxCards; i++) {
    const type = await detectCard(page);

    if (type === cardType) {
      await page.screenshot({ path: join(OUT, `${outputName}.png`) });
      console.log(`✓ ${outputName}.png (found at step ${i + 1})`);
      await ctx.close();
      return true;
    }

    console.log(`  step ${i + 1}: type="${type ?? 'flip'}" — advancing`);
    const moved = await advance(page);
    if (!moved) {
      console.warn(`  ⚠ advance() stuck at step ${i + 1}`);
      const btns = await page.locator('button:visible').allTextContents();
      console.warn('  visible buttons:', JSON.stringify(btns));
      break;
    }
  }

  console.warn(`  ⚠ ${outputName}: '${cardType}' not found in ${maxCards} steps`);
  await page.screenshot({ path: join(OUT, `${outputName}-FAIL.png`) });
  await ctx.close();
  return false;
}

(async () => {
  const browser = await chromium.launch({ headless: true });

  console.log('\n── True/False card (pos 5) ─────────────────────────');
  await captureCard(browser, 'tf', '07-truefalse-card');

  console.log('\n── Numeric card (pos 6) ────────────────────────────');
  await captureCard(browser, 'numeric', '08-numeric-card');

  console.log('\n── MCQ card (pos 7) ────────────────────────────────');
  await captureCard(browser, 'mcq', '06-mcq-card');

  await browser.close();
  console.log('\n✅ Done.');
})();
