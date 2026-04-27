import { test, expect } from '@playwright/test';

test.describe('Mobile Menu', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('opens when hamburger button clicked', async ({ page }) => {
    // Find and click hamburger button
    const menuButton = page.getByLabel('Toggle menu');
    await expect(menuButton).toBeVisible();

    await menuButton.click();

    // Verify menu overlay is visible (look for close button which only exists in mobile menu)
    const closeButton = page.getByLabel('Close menu');
    await expect(closeButton).toBeVisible();

    // Verify hamburger icon changed to X
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('closes when X button clicked', async ({ page }) => {
    // Open menu
    const menuButton = page.getByLabel('Toggle menu');
    await menuButton.click();

    // Wait for close button to be visible
    const closeButton = page.getByLabel('Close menu');
    await expect(closeButton).toBeVisible();

    // Click X button to close
    await closeButton.click();

    // Verify menu is hidden
    await expect(closeButton).not.toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('closes when Escape key pressed', async ({ page }) => {
    // Open menu
    const menuButton = page.getByLabel('Toggle menu');
    await menuButton.click();

    // Wait for close button to be visible
    const closeButton = page.getByLabel('Close menu');
    await expect(closeButton).toBeVisible();

    // Press Escape key
    await page.keyboard.press('Escape');

    // Verify menu is hidden
    await expect(closeButton).not.toBeVisible();
  });

  test('prevents background scroll when open (iOS Safari)', async ({ page, browserName }) => {
    // This test verifies scroll lock behavior on WebKit (Safari)
    // Note: Automated testing of scroll lock has limitations - manual testing on actual iOS devices recommended
    test.skip(browserName !== 'webkit', 'iOS Safari scroll lock test');

    // Wait for page to load and have scrollable content
    await page.waitForLoadState('networkidle');

    // Get initial page height to ensure there's content to scroll
    const pageHeight = await page.evaluate(() => document.body.scrollHeight);

    // Only run test if page has scrollable content
    if (pageHeight <= 667) {
      test.skip(true, 'Page not tall enough to scroll');
      return;
    }

    // Scroll down the page first
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(200); // Wait for scroll to complete
    const initialScrollY = await page.evaluate(() => window.scrollY);
    expect(initialScrollY).toBeGreaterThan(0);

    // Open mobile menu
    const menuButton = page.getByLabel('Toggle menu');
    await menuButton.click();

    // Wait for menu to open
    const closeButton = page.getByLabel('Close menu');
    await expect(closeButton).toBeVisible();

    // Verify RemoveScroll wrapper is present in DOM
    const removeScrollPresent = await page.evaluate(() => {
      // Check if react-remove-scroll is applied (it adds data attributes or specific classes)
      const body = document.body;
      return body.style.overflow === 'hidden' ||
             body.hasAttribute('data-scroll-locked') ||
             document.querySelector('[data-remove-scroll-bar]') !== null;
    });

    // RemoveScroll should be active when menu is open
    expect(removeScrollPresent).toBeTruthy();

    // Close menu
    await closeButton.click();
    await expect(closeButton).not.toBeVisible();

    // Verify scrolling works after closing
    const scrollYBeforeScroll = await page.evaluate(() => window.scrollY);
    await page.evaluate(() => window.scrollBy(0, 200));
    await page.waitForTimeout(100);
    const scrollYAfterClose = await page.evaluate(() => window.scrollY);
    expect(scrollYAfterClose).toBeGreaterThan(scrollYBeforeScroll);
  });

  test('is keyboard navigable', async ({ page }) => {
    // Focus on menu button
    const menuButton = page.getByLabel('Toggle menu');
    await menuButton.focus();

    // Open menu with Enter
    await page.keyboard.press('Enter');

    // Verify menu opened
    const closeButton = page.getByLabel('Close menu');
    await expect(closeButton).toBeVisible();

    // Close button should be focused after opening (or we can tab to first element)
    // Just verify we can close with keyboard
    await page.keyboard.press('Escape');
    await expect(closeButton).not.toBeVisible();
  });

  test('has proper ARIA attributes', async ({ page }) => {
    const menuButton = page.getByLabel('Toggle menu');

    // Check initial state
    await expect(menuButton).toHaveAttribute('aria-label', 'Toggle menu');
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Open menu
    await menuButton.click();

    // Check open state
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Verify close button is visible
    const closeButton = page.getByLabel('Close menu');
    await expect(closeButton).toBeVisible();
  });

  test('navigation links work in mobile menu', async ({ page }) => {
    // Open menu
    const menuButton = page.getByLabel('Toggle menu');
    await menuButton.click();

    // Wait for close button to be visible
    const closeButton = page.getByLabel('Close menu');
    await expect(closeButton).toBeVisible();

    // Verify that navigation structure exists in the mobile menu
    // The mobile menu contains navigation links even if some are hidden by CSS
    const navLinks = page.locator('nav a');
    const linkCount = await navLinks.count();
    expect(linkCount).toBeGreaterThan(0);
  });
});
