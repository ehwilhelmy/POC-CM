import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';
const DIR = './screenshots';
const VIEWPORT = { width: 1440, height: 900 };

async function shot(page, name) {
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${DIR}/${name}.png`, fullPage: true });
  console.log(`  ✓ ${name}`);
}

async function clickPortal(page) {
  await page.waitForTimeout(300);
  await page.click('text=Parent Portal');
  await page.waitForTimeout(300);
}

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  // ── Auth Index ──
  console.log('Auth Index...');
  await page.goto(`${BASE}/#/auth`);
  await shot(page, '01-auth-index-camp');
  await page.click('text=campminder Branded');
  await shot(page, '02-auth-index-campminder');

  // ── New Parent — Camp Branded ──
  console.log('New Parent — Camp...');
  await page.goto(`${BASE}/#/auth/new-parent`);
  await clickPortal(page);
  await shot(page, '03-new-parent-camp-login');
  await page.click('button:has-text("Continue")');
  await shot(page, '04-new-parent-camp-create');

  // ── New Parent — campminder Branded ──
  console.log('New Parent — campminder...');
  await page.goto(`${BASE}/#/auth/new-parent?brand=default`);
  await clickPortal(page);
  await shot(page, '05-new-parent-cm-login');
  await page.click('button:has-text("Continue")');
  await shot(page, '06-new-parent-cm-create');

  // ── Returning — Camp Branded ──
  console.log('Returning — Camp...');
  await page.goto(`${BASE}/#/auth/returning-parent`);
  await clickPortal(page);
  await shot(page, '07-returning-camp-login');
  // Click Continue to go to password step (email is pre-filled)
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(300);
  await shot(page, '08-returning-camp-password');

  // ── Returning — campminder Branded ──
  console.log('Returning — campminder...');
  await page.goto(`${BASE}/#/auth/returning-parent?brand=default`);
  await clickPortal(page);
  await shot(page, '09-returning-cm-login');
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(300);
  await shot(page, '10-returning-cm-password');

  // ── Forgot Password — Camp Branded ──
  console.log('Forgot Password — Camp...');
  await page.goto(`${BASE}/#/auth/forgot-password`);
  await clickPortal(page);
  await shot(page, '11-forgot-camp-login');

  // ── Forgot Password — campminder Branded ──
  console.log('Forgot Password — campminder...');
  await page.goto(`${BASE}/#/auth/forgot-password?brand=default`);
  await clickPortal(page);
  await shot(page, '12-forgot-cm-login');

  // ── Expired Link — Camp Branded ──
  console.log('Expired Link...');
  await page.goto(`${BASE}/#/auth/expired-link`);
  await shot(page, '13-expired-camp');

  await page.goto(`${BASE}/#/auth/expired-link?brand=default`);
  await shot(page, '14-expired-cm');

  await browser.close();
  console.log('\nDone! 14 screenshots in ./screenshots/');
}

run().catch((e) => { console.error(e); process.exit(1); });
