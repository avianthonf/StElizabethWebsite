import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await context.newPage();
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Scroll past hero calendars to reach "We Value" section
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(1500);

  await page.screenshot({ path: 'we-value-cards.png', fullPage: false });
  await browser.close();
})();
