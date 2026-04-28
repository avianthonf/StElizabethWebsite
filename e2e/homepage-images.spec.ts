import { test, expect } from '@playwright/test';

test.describe('Homepage Image Migration E2E Smoke Check', () => {
  test.setTimeout(180000);

  // Helper: build locator set for current page
  const L = (p: import('@playwright/test').Page) => ({
    images: () => p.locator('img'),
    heroImage: () => p.locator('img[alt*="campus"], img[aria-label*="WE BELIEVE"], img[alt*="We Believe"]'),
    weValueSection: () => p.getByRole('heading', { name: 'We Value' }),
    valueCards: () => p.locator('[class*="values-grid"] article'),
    studentPortrait: () => p.locator('img[alt*="student" i]'),
    galleryImages: () => p.locator('img[alt*="gallery" i]'),
    athleticsHeading: () => p.getByRole('heading', { name: 'Athletics' }),
    artsHeading: () => p.getByRole('heading', { name: 'Arts & Music' }),
    academicsHeading: () => p.getByRole('heading', { name: 'Academics' }),
    beginJourney: () => p.getByRole('heading', { name: 'Begin Your Journey' }),
  });

  test('Homepage renders without console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');
    await page.waitForLoadState('load', { timeout: 45000 });
    await page.waitForTimeout(1500);

    expect(errors).toEqual([]);
  });

  test('next/image components render as <img> tags', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load', { timeout: 45000 });
    await page.waitForTimeout(1500);

    const imgCount = await L(page).images().count();
    expect(imgCount).toBeGreaterThan(20);

    const broken = await page.locator('img:not([src]), img[src=""], img[src^="data:"]').count();
    expect(broken).toBe(0);
  });

  test('Key hero and We Value sections render with images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load', { timeout: 45000 });
    await page.waitForTimeout(1500);

    const l = L(page);

    await expect(l.heroImage().first()).toBeVisible();
    await expect(l.weValueSection()).toBeVisible();
    expect(await l.valueCards().count()).toBe(4);
    for (const card of await l.valueCards().all()) {
      await expect(card.locator('img')).toBeVisible();
    }
  });

  test('StickySplitSection images render correctly', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load', { timeout: 45000 });
    await page.waitForTimeout(1500);

    const l = L(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.25));
    await page.waitForTimeout(600);

    expect(await l.studentPortrait().count()).toBeGreaterThan(0);
    expect(await l.galleryImages().count()).toBe(4);
  });

  test('Passions panels show images (Athletics, Arts, Academics)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load', { timeout: 45000 });
    await page.waitForTimeout(1500);

    const l = L(page);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.55));
    await page.waitForTimeout(700);
    await expect(l.athleticsHeading()).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.7));
    await page.waitForTimeout(700);
    await expect(l.artsHeading()).toBeVisible();

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.88));
    await page.waitForTimeout(700);
    await expect(l.academicsHeading()).toBeVisible();
  });

  test('Divisions tabs show images on selection', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load', { timeout: 45000 });
    await page.waitForTimeout(1500);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight * 0.93));
    await page.waitForTimeout(800);

    const tabs = await page.locator('button:has-text("Grade")').all();
    expect(tabs.length).toBeGreaterThanOrEqual(4);

    for (const tab of tabs) {
      await tab.click();
      await page.waitForTimeout(200);
      await expect(page.locator('img[alt*="grade" i]').first()).toBeVisible();
    }
  });

  test('Footer CTA renders aerial image', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load', { timeout: 45000 });
    await page.waitForTimeout(1500);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const l = L(page);
    await expect(l.beginJourney()).toBeVisible();

    const aerialCount = await page.locator('img[alt*="Aerial" i], img[alt*="campus aerial" i]').count();
    // Static export should embed the optimized src on the img tag; no network fetch required
    expect(aerialCount).toBeGreaterThan(0);
  });

  test('No broken images (missing src) in DOM', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('load', { timeout: 45000 });
    await page.waitForTimeout(2000);

    // next/image on static export embeds real src URLs; no data:* fallbacks
    const broken = page.locator('img:not([src]), img[src=""], img[src^="data:"]');
    expect(await broken.count()).toBe(0);
  });

  test('Responsive rendering on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    await page.goto('/');
    await page.waitForLoadState('load', { timeout: 45000 });
    await page.waitForTimeout(1500);

    const imgCount = await page.locator('img').count();
    expect(imgCount).toBeGreaterThan(10);

    await expect(page.getByRole('heading', { name: 'We Value' })).toBeInViewport();
    await expect(page.getByRole('heading', { name: 'Athletics' })).toBeInViewport();
  });
});
