/**
 * Playwright screenshot capture script for Finance App README
 * Run with: node docs/screenshots/capture.mjs
 */
import { chromium } from 'playwright';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = 'http://localhost:3210';
const OUT = __dirname;

const VIEWPORT = { width: 1280, height: 800 };
const MOBILE = { width: 390, height: 844 };

async function shot(page, name, opts = {}) {
  const file = join(OUT, `${name}.png`);
  await page.screenshot({ path: file, fullPage: opts.fullPage ?? false });
  console.log(`✓ ${name}.png`);
  return file;
}

async function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext({ viewport: VIEWPORT });
  const page = await ctx.newPage();

  // ── 01 Home ──────────────────────────────────────────────────────────────
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await wait(500);
  await shot(page, '01-home');

  // ── 02 Track list ─────────────────────────────────────────────────────────
  await page.goto(`${BASE}/tracks`, { waitUntil: 'networkidle' });
  await wait(500);
  await shot(page, '02-tracks');

  // ── 03 Market Finance track (world map) ───────────────────────────────────
  await page.goto(`${BASE}/tracks/market-finance`, { waitUntil: 'networkidle' });
  await wait(800);
  await shot(page, '03-track-detail');

  // ── 04 Learn session – definition card ───────────────────────────────────
  await page.goto(`${BASE}/session?trackId=market-finance&lessonId=mf-found-l1-action&mode=learn`, { waitUntil: 'networkidle' });
  await wait(600);
  await shot(page, '04-learn-card');

  // ── 05 Quiz session – flip card (answer revealed) ────────────────────────
  await page.goto(`${BASE}/session?trackId=market-finance&lessonId=mf-found-l1-action&mode=quiz`, { waitUntil: 'networkidle' });
  await wait(600);
  // Click "Voir la réponse"
  const voirBtn = await page.getByText('Voir la réponse');
  await voirBtn.click();
  await wait(400);
  await shot(page, '05-quiz-flip');

  // ── 06 MCQ card ───────────────────────────────────────────────────────────
  await page.goto(`${BASE}/session?trackId=market-finance&lessonId=mf-found-l1-action&mode=quiz`, { waitUntil: 'networkidle' });
  await wait(600);

  // Click through until we hit the MCQ card
  for (let i = 0; i < 12; i++) {
    const text = await page.locator('main').innerText().catch(() => '');
    if (text.includes('A.') || text.includes('B.')) break;

    const voir = page.getByText('Voir la réponse').first();
    const hasVoir = await voir.isVisible().catch(() => false);
    if (hasVoir) {
      await voir.click();
      await wait(300);
      // Self-rate
      const trouve = page.getByText('Trouvé').first();
      const hasTrouve = await trouve.isVisible().catch(() => false);
      if (hasTrouve) { await trouve.click(); await wait(300); }
    } else {
      // True/False or numeric — pick an answer and continue
      const vrai = page.getByRole('button', { name: 'Vrai' }).first();
      const faux = page.getByRole('button', { name: 'Faux' }).first();
      const verif = page.getByRole('button', { name: 'Vérifier' }).first();
      if (await faux.isVisible().catch(() => false)) {
        await faux.click(); await wait(300);
        const next = page.getByText('Continuer').first();
        if (await next.isVisible().catch(() => false)) { await next.click(); await wait(300); }
      } else if (await verif.isVisible().catch(() => false)) {
        const input = page.getByPlaceholder('Votre réponse…');
        await input.fill('250');
        await verif.click(); await wait(300);
        const next = page.getByText('Continuer').first();
        if (await next.isVisible().catch(() => false)) { await next.click(); await wait(300); }
      }
    }
  }
  await shot(page, '06-mcq-card');

  // ── 07 True/False card ────────────────────────────────────────────────────
  await page.goto(`${BASE}/session?trackId=market-finance&lessonId=mf-found-l1-action&mode=quiz`, { waitUntil: 'networkidle' });
  await wait(600);

  for (let i = 0; i < 12; i++) {
    const vrai = page.getByRole('button', { name: 'Vrai' }).first();
    if (await vrai.isVisible().catch(() => false)) break;

    const voir = page.getByText('Voir la réponse').first();
    const hasVoir = await voir.isVisible().catch(() => false);
    if (hasVoir) {
      await voir.click(); await wait(300);
      const trouve = page.getByText('Trouvé').first();
      if (await trouve.isVisible().catch(() => false)) { await trouve.click(); await wait(300); }
    } else {
      const faux = page.getByRole('button', { name: 'Faux' }).first();
      const verif = page.getByRole('button', { name: 'Vérifier' }).first();
      const textA = page.getByText('A.').first();
      if (await textA.isVisible().catch(() => false)) {
        // MCQ – pick first choice
        const choices = await page.locator('button').all();
        for (const c of choices) {
          const t = await c.innerText().catch(() => '');
          if (t.startsWith('A.') || t.includes('A.')) { await c.click(); await wait(300); break; }
        }
        const next = page.getByText('Continuer').first();
        if (await next.isVisible().catch(() => false)) { await next.click(); await wait(300); }
      } else if (await faux.isVisible().catch(() => false)) {
        await faux.click(); await wait(300);
        const next = page.getByText('Continuer').first();
        if (await next.isVisible().catch(() => false)) { await next.click(); await wait(300); }
      } else if (await verif.isVisible().catch(() => false)) {
        const input = page.getByPlaceholder('Votre réponse…');
        await input.fill('250');
        await verif.click(); await wait(300);
        const next = page.getByText('Continuer').first();
        if (await next.isVisible().catch(() => false)) { await next.click(); await wait(300); }
      }
    }
  }
  await shot(page, '07-truefalse-card');

  // ── 08 Numeric input card ─────────────────────────────────────────────────
  await page.goto(`${BASE}/session?trackId=market-finance&lessonId=mf-found-l1-action&mode=quiz`, { waitUntil: 'networkidle' });
  await wait(600);

  for (let i = 0; i < 12; i++) {
    const verif = page.getByRole('button', { name: 'Vérifier' }).first();
    if (await verif.isVisible().catch(() => false)) break;

    const voir = page.getByText('Voir la réponse').first();
    const hasVoir = await voir.isVisible().catch(() => false);
    if (hasVoir) {
      await voir.click(); await wait(300);
      const trouve = page.getByText('Trouvé').first();
      if (await trouve.isVisible().catch(() => false)) { await trouve.click(); await wait(300); }
    } else {
      const faux = page.getByRole('button', { name: 'Faux' }).first();
      const vrai = page.getByRole('button', { name: 'Vrai' }).first();
      if (await faux.isVisible().catch(() => false)) {
        await faux.click(); await wait(300);
        const next = page.getByText('Continuer').first();
        if (await next.isVisible().catch(() => false)) { await next.click(); await wait(300); }
      } else if (await vrai.isVisible().catch(() => false)) {
        await vrai.click(); await wait(300);
        const next = page.getByText('Continuer').first();
        if (await next.isVisible().catch(() => false)) { await next.click(); await wait(300); }
      } else {
        // MCQ
        const choices = await page.locator('button').all();
        for (const c of choices) {
          const t = await c.innerText().catch(() => '');
          if (t.match(/^A\./)) { await c.click(); await wait(300); break; }
        }
        const next = page.getByText('Continuer').first();
        if (await next.isVisible().catch(() => false)) { await next.click(); await wait(300); }
      }
    }
  }
  await shot(page, '08-numeric-card');

  // ── 09 Admin dashboard ────────────────────────────────────────────────────
  await page.goto(`${BASE}/admin`, { waitUntil: 'networkidle' });
  await wait(600);
  await shot(page, '09-admin');

  // ── 10 Admin track browser ────────────────────────────────────────────────
  await page.goto(`${BASE}/admin/tracks`, { waitUntil: 'networkidle' });
  await wait(600);
  await shot(page, '10-admin-tracks');

  // ── 11 Admin lesson detail (card list) ───────────────────────────────────
  await page.goto(`${BASE}/admin/tracks/market-finance/lessons/mf-found-l1-action`, { waitUntil: 'networkidle' });
  await wait(600);
  await shot(page, '11-admin-lesson');

  // ── 12 Mobile – Home ─────────────────────────────────────────────────────
  await ctx.close();
  const mCtx = await browser.newContext({ viewport: MOBILE });
  const mPage = await mCtx.newPage();
  await mPage.goto(BASE, { waitUntil: 'networkidle' });
  await wait(500);
  await shot(mPage, '12-mobile-home');

  // ── 13 Mobile – Track detail ──────────────────────────────────────────────
  await mPage.goto(`${BASE}/tracks/market-finance`, { waitUntil: 'networkidle' });
  await wait(800);
  await shot(mPage, '13-mobile-track');

  await mCtx.close();
  await browser.close();
  console.log('\n✅ All screenshots saved to docs/screenshots/');
})();
