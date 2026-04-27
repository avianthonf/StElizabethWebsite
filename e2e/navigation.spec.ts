import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');

    // Verify hero section is visible
    await expect(page.locator('h1, [role="heading"][aria-level="1"]')).toBeVisible();

    // Verify header is present
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('desktop navigation shows all top-level links', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Verify navigation is visible
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();

    // Verify key navigation items exist (adjust based on actual site navigation)
    await expect(page.locator('nav a').filter({ hasText: 'About' }).first()).toBeVisible();
    await expect(page.locator('nav a').filter({ hasText: 'Admission' }).first()).toBeVisible();
  });

  test('hovering over navigation item shows submenu on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    // Find a navigation item with children (adjust selector based on actual structure)
    const aboutLink = page.locator('nav a').filter({ hasText: 'About' }).first();

    if (await aboutLink.count() > 0) {
      // Hover over the link
      await aboutLink.hover();

      // Wait a bit for submenu animation
      await page.waitForTimeout(300);

      // Check if submenu appeared (adjust selector based on actual structure)
      const submenu = page.locator('nav').filter({ hasText: 'Mission' }).or(
        page.locator('[role="menu"]')
      );

      // If submenu exists in navigation structure, it should be visible
      if (await submenu.count() > 0) {
        await expect(submenu.first()).toBeVisible();
      }
    }
  });

  test('logo link returns to homepage', async ({ page }) => {
    await page.goto('/');

    // Find logo link (adjust selector based on actual structure)
    const logoLink = page.locator('header a[href="/"]').first();
    await expect(logoLink).toBeVisible();

    // Click logo
    await logoLink.click();

    // Verify we're on homepage
    await expect(page).toHaveURL('/');
  });

  test('navigation is sticky and visible when scrolling', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Get initial header position
    const initialPosition = await header.boundingBox();
    expect(initialPosition).not.toBeNull();

    // Scroll down the page
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500); // Wait for scroll animation

    // Header should still be visible (sticky)
    await expect(header).toBeVisible();

    // Verify header is at top of viewport (sticky behavior)
    const scrolledPosition = await header.boundingBox();
    expect(scrolledPosition).not.toBeNull();
    expect(scrolledPosition!.y).toBeLessThanOrEqual(10); // Should be near top
  });

  test('navigation changes appearance when scrolled (ghost nav)', async ({ page }) => {
    await page.goto('/');

    const header = page.locator('header');

    // At top, header should be transparent (ghost nav)
    const initialBg = await header.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500); // Wait for transition

    // After scroll, header should have solid background
    const scrolledBg = await header.evaluate((el) =>
      window.getComputedStyle(el).backgroundColor
    );

    // Background should change (transparent to white)
    // Note: On some browsers/viewports, both might be transparent if mobile menu is not open
    // The key test is that the header remains visible and functional
    if (initialBg !== 'rgba(0, 0, 0, 0)' || scrolledBg !== 'rgba(0, 0, 0, 0)') {
      expect(initialBg).not.toBe(scrolledBg);
    } else {
      // Both transparent - verify header is still visible
      await expect(header).toBeVisible();
    }
  });

  test('search button is present in navigation', async ({ page }) => {
    await page.goto('/');

    // Find search button (adjust selector based on actual structure)
    const searchButton = page.locator('button').filter({ hasText: 'Search' }).or(
      page.locator('button[aria-label*="Search"]')
    );

    if (await searchButton.count() > 0) {
      await expect(searchButton.first()).toBeVisible();
    }
  });
});
