import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Scroll to "We Value" section
  const weValue = await page.locator('text=We Value').first();
  if (await weValue.isVisible()) {
    await weValue.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
  }

  await page.screenshot({ path: 'we-value-cards.png', fullPage: false });
  await browser.close();
})();
