import { test, expect } from '@playwright/test';

test('We Value section renders carousel correctly', async ({ page }) => {
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Take screenshot of We Value section
  const heading = page.locator('h2:has-text("We Value")');
  await expect(heading).toBeVisible();

  const box = await heading.boundingBox();
  if (box) {
    await page.screenshot({
      path: `tmp/inspect-value-${Date.now()}.png`,
      clip: { x: 0, y: box.y - 60, width: 1440, height: 700 }
    });
  }

  // Check carousel exists
  const carousel = page.locator('.values-carousel');
  await expect(carousel).toBeVisible();

  // Check slide count
  const slides = page.locator('[role="group"]');
  const slideCount = await slides.count();
  console.log('Slide count:', slideCount);

  // Check ValueCard info renders
  const valueTitles = page.locator('h3');
  const titles = await valueTitles.allTextContents();
  console.log('Card titles:', titles);
});
