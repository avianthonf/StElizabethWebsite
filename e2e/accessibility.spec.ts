import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('homepage has no critical accessibility violations', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    // Fail test if critical or serious violations found
    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    );

    expect(criticalViolations).toHaveLength(0);
  });

  test('navigation has proper ARIA labels', async ({ page }) => {
    await page.goto('/');

    // Check main navigation (desktop only - hidden on mobile)
    const viewport = page.viewportSize();
    const isDesktop = viewport && viewport.width >= 1024;

    if (isDesktop) {
      const nav = page.locator('nav[aria-label="Main navigation"]');
      await expect(nav).toBeVisible();
    }

    // Check mobile menu button (visible on all viewports)
    const menuButton = page.getByLabel('Toggle menu');
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded');
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');

    // Find all images
    const images = page.locator('img');
    const imageCount = await images.count();

    // Check each image has alt attribute
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');

      // Alt can be empty string for decorative images, but must exist
      expect(alt).not.toBeNull();
    }
  });

  test('color contrast meets WCAG AA standards', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('body')
      .analyze();

    // Check for color contrast violations
    const contrastViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'color-contrast'
    );

    expect(contrastViolations).toHaveLength(0);
  });

  test('interactive elements are keyboard accessible', async ({ page }) => {
    await page.goto('/');

    // Tab through interactive elements
    await page.keyboard.press('Tab');

    // First focusable element should be focused
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);

    // Continue tabbing
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // Should be able to focus multiple elements
    const secondFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(secondFocused);
  });

  test('headings are in logical order', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['best-practice'])
      .analyze();

    // Check for heading order violations
    const headingViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'heading-order'
    );

    expect(headingViolations).toHaveLength(0);
  });

  test('form inputs have labels', async ({ page }) => {
    await page.goto('/');

    // Find all form inputs
    const inputs = page.locator('input, textarea, select');
    const inputCount = await inputs.count();

    if (inputCount > 0) {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a'])
        .analyze();

      // Check for label violations
      const labelViolations = accessibilityScanResults.violations.filter(
        v => v.id === 'label'
      );

      expect(labelViolations).toHaveLength(0);
    }
  });

  test('no duplicate IDs on page', async ({ page }) => {
    await page.goto('/');

    const accessibilityScanResults = await new AxeBuilder({ page })
      .analyze();

    // Check for duplicate ID violations
    const duplicateIdViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'duplicate-id'
    );

    expect(duplicateIdViolations).toHaveLength(0);
  });
});
