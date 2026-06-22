const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:3000';
const OUT = path.join(__dirname, 'screenshots');
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  { name: '01-home',            url: '/' },
  { name: '02-marketplace',     url: '/marketplace' },
  { name: '03-product',         url: '/marketplace/1' },
  { name: '04-cart',            url: '/cart' },
  { name: '05-checkout',        url: '/checkout' },
  { name: '06-login',           url: '/login' },
  { name: '07-register',        url: '/register' },
  { name: '08-forgot-password', url: '/forgot-password' },
  { name: '09-farmer-dash',     url: '/dashboard/farmer' },
  { name: '10-admin-dash',      url: '/dashboard/admin' },
  { name: '11-customer-dash',   url: '/dashboard/customer' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },  // iPhone 14 Pro
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  for (const p of PAGES) {
    await page.goto(BASE + p.url, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT, `${p.name}.png`), fullPage: true });
    console.log(`✓ ${p.name}`);
  }

  await browser.close();
  console.log('\nAll screenshots saved to:', OUT);
})();
