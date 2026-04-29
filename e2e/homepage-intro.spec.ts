import { test, expect } from '@playwright/test';

test.describe('Homepage Intro', () => {
  test('should display intro on first visit with text-aperture tunnel reveal', async ({ page, context }) => {
    // Clear session storage to simulate first visit
    await context.clearCookies();

    // Navigate to homepage
    await page.goto('http://localhost:3000');

    // Wait for intro to be visible
    const intro = page.locator('[data-testid="homepage-intro"]');
    await expect(intro).toBeVisible({ timeout: 5000 });

    // Check that intro has correct z-index (should be on top)
    const zIndex = await intro.evaluate(el => window.getComputedStyle(el).zIndex);
    expect(parseInt(zIndex)).toBeGreaterThan(10000);

    // Check that skip button is present
    const skipButton = intro.locator('button', { hasText: /skip intro/i });
    await expect(skipButton).toBeVisible({ timeout: 2000 });

    // Check that SVG mask is present (text-aperture effect)
    const svgMask = intro.locator('svg mask#homepage-intro-mask');
    await expect(svgMask).toBeVisible();

    // Check that masked text element exists
    const maskedText = intro.locator('svg text');
    await expect(maskedText).toBeVisible();
    const textContent = await maskedText.textContent();
    expect(textContent).toContain('St. Elizabeth');

    // Check that tunnel glow element exists (radial gradient overlay)
    const tunnelGlow = intro.locator('div').filter({ has: page.locator('[style*="radial-gradient"]') }).first();
    await expect(tunnelGlow).toBeVisible();

    // Check that background image is present
    const bgImage = intro.locator('img[alt*="campus preview"]');
    await expect(bgImage).toBeVisible();

    // Check that subtitle text is present
    const subtitle = intro.locator('p', { hasText: /the name opens first/i });
    await expect(subtitle).toBeVisible({ timeout: 3000 });

    // Test skip button functionality
    await skipButton.click();

    // Intro should disappear
    await expect(intro).not.toBeVisible({ timeout: 2000 });

    // Main content should be visible
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });

  test('should not display intro on subsequent visits in same session', async ({ page }) => {
    // First visit
    await page.goto('http://localhost:3000');

    const intro = page.locator('[data-testid="homepage-intro"]');
    await expect(intro).toBeVisible({ timeout: 5000 });

    // Skip intro
    const skipButton = intro.locator('button', { hasText: /skip intro/i });
    await skipButton.click();
    await expect(intro).not.toBeVisible({ timeout: 2000 });

    // Reload page (same session)
    await page.reload();

    // Intro should NOT appear
    await expect(intro).not.toBeVisible({ timeout: 1000 });
  });

  test('should complete intro animation automatically if not skipped', async ({ page, context }) => {
    // Clear session storage
    await context.clearCookies();

    await page.goto('http://localhost:3000');

    const intro = page.locator('[data-testid="homepage-intro"]');
    await expect(intro).toBeVisible({ timeout: 5000 });

    // Wait for animation to complete (should take ~4-5 seconds based on timeline)
    // The intro should auto-dismiss
    await expect(intro).not.toBeVisible({ timeout: 8000 });

    // Main content should be visible
    const mainContent = page.locator('main');
    await expect(mainContent).toBeVisible();
  });
});
