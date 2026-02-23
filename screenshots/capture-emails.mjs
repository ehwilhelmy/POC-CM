import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';
const DIR = './screenshots';

async function shot(page, name) {
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${DIR}/${name}.png`, fullPage: true });
  console.log(`  ✓ ${name}`);
}

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 1200 } });
  const page = await context.newPage();

  console.log('Branded Emails — Inbox view...');
  await page.goto(`${BASE}/#/auth/emails`);
  await page.waitForTimeout(500);

  // Verification (default tab) — inbox list
  await shot(page, '19-email-verification-inbox');

  // Click the campminder email to open reader view
  await page.click('.cm-gmail-inbox__row--unread');
  await page.waitForTimeout(400);
  await shot(page, '19b-email-verification-reader');

  // Password Reset — inbox list
  await page.click('text=Password Reset');
  await page.waitForTimeout(400);
  await shot(page, '20-email-password-reset-inbox');

  // Open reader
  await page.click('.cm-gmail-inbox__row--unread');
  await page.waitForTimeout(400);
  await shot(page, '20b-email-password-reset-reader');

  // Invitation — inbox list
  await page.click('text=Invitation');
  await page.waitForTimeout(400);
  await shot(page, '21-email-invitation-inbox');

  // Open reader
  await page.click('.cm-gmail-inbox__row--unread');
  await page.waitForTimeout(400);
  await shot(page, '21b-email-invitation-reader');

  // Also capture the in-flow email popups
  console.log('In-flow email popups...');

  // New Parent — verification code email popup
  await page.goto(`${BASE}/#/auth/new-parent`);
  await page.click('text=Parent Portal');
  await page.waitForTimeout(300);
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(300);
  // Fill password fields to enable Create Account
  await page.fill('input[placeholder="Create a password"]', 'Password123!');
  await page.fill('input[placeholder="Re-enter your password"]', 'Password123!');
  await page.waitForTimeout(300);
  await page.click('button:has-text("Create Account")');
  await page.waitForTimeout(300);
  // Now on verify-code step — click "Check your email"
  await page.click('text=Check your email');
  await page.waitForTimeout(500);
  await shot(page, '22-email-popup-verification');

  // Forgot Password — reset code email popup
  await page.goto(`${BASE}/#/auth/forgot-password`);
  await page.click('text=Parent Portal');
  await page.waitForTimeout(300);
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(300);
  // On password step — fill and submit to get error, then click forgot
  await page.fill('input[type="password"]', 'wrong');
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(300);
  // Now on password-error — click forgot password
  await page.click('text=Forgot password?');
  await page.waitForTimeout(300);
  // On request step — click continue
  await page.click('button:has-text("Continue")');
  await page.waitForTimeout(300);
  // On check-email step — click "Check your email"
  await page.click('text=Check your email');
  await page.waitForTimeout(500);
  await shot(page, '23-email-popup-password-reset');

  await browser.close();
  console.log('\nDone!');
}

run().catch((e) => { console.error(e); process.exit(1); });
