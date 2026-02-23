import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';
const DIR = './screenshots';
const VIEWPORT = { width: 1440, height: 900 };

async function shot(page, name) {
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${DIR}/${name}.png`, fullPage: true });
  console.log(`  ✓ ${name}`);
}

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  // ── Camp Website ──
  console.log('Camp Website...');
  await page.goto(`${BASE}/#/auth/new-parent`);
  await shot(page, '15-camp-website');

  // ── CampInTouch Dashboard ──
  console.log('CampInTouch Dashboard...');
  // Go through returning parent flow to reach the dashboard
  await page.goto(`${BASE}/#/auth/returning-parent`);
  await page.click('text=Parent Portal');
  await page.waitForTimeout(300);
  // email-entry → password
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(300);
  // password → fill and submit
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(300);
  // success → dashboard
  await page.click('text=Go to My Dashboard');
  await page.waitForTimeout(500);
  await shot(page, '16-campintouch-dashboard');

  // ── Guest Accounts Page ──
  console.log('Guest Account flow...');
  await page.goto(`${BASE}/#/auth/guest`);
  await page.waitForTimeout(500);
  await shot(page, '17-guest-caretaker-dashboard');

  await page.click('text=Guest Accounts');
  await page.waitForTimeout(500);
  await shot(page, '18-guest-accounts-page');

  await browser.close();
  console.log('\nDone!');
}

run().catch((e) => { console.error(e); process.exit(1); });
