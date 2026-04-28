import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1440, height: 900 });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500); // Wait for optional horizontal scroll animations to settle

  // Scroll to the "We Value" section
  const weValueSection = page.locator('text=We Value');
  await weValueSection.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  // Take screenshot of just the We Value section area
  const section = page.locator("h2:has-text('We Value')").first();
  if (await section.isVisible()) {
    const boundingBox = await section.boundingBox();
    if (boundingBox) {
      await page.screenshot({
        path: 'we-value-section.png',
        clip: {
          x: 0,
          y: Math.max(0, boundingBox.y - 100),
          width: 1440,
          height: boundingBox.y + 500 - Math.max(0, boundingBox.y - 100)
        }
      });
    }
  }

  // Also take a full-page for context
  await page.screenshot({ path: 'homepage-full.png', fullPage: true });

  await browser.close();
  console.log('Screenshots saved.');
})();
