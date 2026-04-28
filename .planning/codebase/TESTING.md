# Testing Patterns

**Analysis Date:** 2026-04-28

## Test Framework

### Unit & Integration Tests: Vitest

**Runner**: Vitest v4.1.5
- Vite-based test runner optimized for fast feedback in VSCode
- Uses jsdom for DOM environment simulation
- TypeScript-first design

**Configuration**: `vitest.config.ts`
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'out/',
        '.next/',
        '**/*.config.*',
        '**/*.d.ts',
        '**/types.ts',
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**Coverage Requirement**: 80% minimum across lines, functions, branches, and statements

**Setup file**: `vitest.setup.ts`
```typescript
import '@testing-library/jest-dom/vitest'
```

**Test Environment**: `jsdom` — simulates browser DOM in Node.js

### E2E Tests: Playwright

**Runner**: Playwright v1.59.1
- Cross-browser testing (Chromium, WebKit, Mobile Safari)
- Built-in accessibility testing via `@axe-core/playwright`
- HTML report generation, trace capture on failure

**Configuration**: `playwright.config.ts`
```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'Mobile Safari', use: { ...devices['iPhone 13'] } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
```

**Browser Coverage**:
- Desktop Chrome (Chromium)
- Desktop Safari (WebKit)
- Mobile Safari (iPhone 13)

### Assertion Libraries
- **Vitest**: Built-in `expect` with `@testing-library/jest-dom` matchers (via setup file)
- **Playwright**: Built-in `expect` with Playwright-specific matchers (`toBeVisible()`, `toHaveAttribute()`, `toHaveURL()`, etc.)

### Test Dependencies
```json
{
  "devDependencies": {
    "vitest": "^4.1.5",
    "@vitest/ui": "^4.1.5",
    "@testing-library/react": "^16.3.2",
    "@testing-library/jest-dom": "^6.9.1",
    "@playwright/test": "^1.59.1",
    "@axe-core/playwright": "^4.11.2",
    "jsdom": "^25.0.1"
  }
}
```

## Test File Organization

### Location
- **Unit/Integration tests**: Co-located with source files as `*.test.ts` or `*.test.tsx`
  - Example: `src/lib/hooks/useHorizontalScroll.test.ts` (adjacent to `useHorizontalScroll.ts`)
- **E2E tests**: Separate `e2e/` directory at repository root
  - `e2e/navigation.spec.ts`
  - `e2e/mobile-menu.spec.ts`
  - `e2e/scroll-animations.spec.ts`
  - `e2e/accessibility.spec.ts`

### Naming
- Unit tests: `{filename}.test.{ts,tsx}` — `useHorizontalScroll.test.ts`
- E2E tests: `{feature}.spec.ts` — describes the feature being tested

### Current Test Files (Project Root)
```
e2e/
  accessibility.spec.ts
  mobile-menu.spec.ts
  navigation.spec.ts
  scroll-animations.spec.ts

src/
  lib/
    hooks/
      useHorizontalScroll.test.ts
```

## Test Structure

### Unit Test Structure (Vitest + React Testing Library)
```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useHorizontalScroll } from './useHorizontalScroll';
import { gsap } from '@/lib/gsap-config';

// Mock external dependencies
vi.mock('@/lib/gsap-config', () => ({
  gsap: {
    context: vi.fn((callback) => {
      callback();
      return { revert: vi.fn() };
    }),
    to: vi.fn(),
  },
  ScrollTrigger: {
    refresh: vi.fn(),
  },
}));

describe('useHorizontalScroll', () => {
  let containerRef: React.RefObject<HTMLDivElement>;
  let trackRef: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    // Create DOM elements for refs
    const container = document.createElement('div');
    const track = document.createElement('div');
    Object.defineProperty(track, 'scrollWidth', { value: 3000, writable: true });
    Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });

    containerRef = { current: container };
    trackRef = { current: track };

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calculates initial travel distance', () => {
    renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    expect(gsap.to).toHaveBeenCalledWith(
      trackRef.current,
      expect.objectContaining({ x: -1800 }) // 3000 - 1200 = 1800
    );
  });

  it('recalculates travel distance on window resize', () => {
    vi.useFakeTimers();
    renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    // Simulate resize
    Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true });
    const callCountBefore = (gsap.to as any).mock.calls.length;

    window.dispatchEvent(new Event('resize'));
    expect((gsap.to as any).mock.calls.length).toBe(callCountBefore); // debounced

    vi.advanceTimersByTime(150); // Wait for debounce

    expect((gsap.to as any).mock.calls.length).toBeGreaterThan(callCountBefore);
    const calls = (gsap.to as any).mock.calls;
    const resizeCall = calls.find((call: any) => call[1]?.x === -2000);
    expect(resizeCall).toBeDefined();

    vi.useRealTimers();
  });

  it('debounces resize handler', () => {
    vi.useFakeTimers();
    renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    const callCountBefore = (gsap.to as any).mock.calls.length;

    // Trigger multiple rapid resizes
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));

    expect((gsap.to as any).mock.calls.length).toBe(callCountBefore); // Still debounced

    vi.advanceTimersByTime(150);
    expect((gsap.to as any).mock.calls.length).toBeGreaterThan(callCountBefore);

    // Debounce should limit calls
    const callCountAfter = (gsap.to as any).mock.calls.length;
    expect(callCountAfter - callCountBefore).toBeLessThanOrEqual(3);

    vi.useRealTimers();
  });

  it('cleans up resize listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
```

### E2E Test Structure (Playwright)
```typescript
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('homepage loads successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1, [role="heading"][aria-level="1"]')).toBeVisible();
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('desktop navigation shows all top-level links', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    const nav = page.locator('nav[aria-label="Main navigation"]');
    await expect(nav).toBeVisible();
    await expect(page.locator('nav a').filter({ hasText: 'About' }).first()).toBeVisible();
    await expect(page.locator('nav a').filter({ hasText: 'Admission' }).first()).toBeVisible();
  });

  test('hovering over navigation item shows submenu on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    const aboutLink = page.locator('nav a').filter({ hasText: 'About' }).first();
    if (await aboutLink.count() > 0) {
      await aboutLink.hover();
      await page.waitForTimeout(300);
      const submenu = page.locator('nav').filter({ hasText: 'Mission' });
      if (await submenu.count() > 0) {
        await expect(submenu.first()).toBeVisible();
      }
    }
  });

  test('navigation is sticky and visible when scrolling', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    await expect(header).toBeVisible();
  });
});
```

## Mocking

### Mocking Framework: Vitest's `vi`

#### External Library Mocks
GSAP mocked to avoid actual animation in unit tests:
```typescript
vi.mock('@/lib/gsap-config', () => ({
  gsap: {
    context: vi.fn((callback) => {
      callback();
      return { revert: vi.fn() };
    }),
    to: vi.fn(),
    fromTo: vi.fn(),
    timeline: vi.fn(() => ({
      to: vi.fn().mockReturnThis(),
      fromTo: vi.fn().mockReturnThis(),
      progress: vi.fn(),
      kill: vi.fn(),
    })),
  },
  ScrollTrigger: {
    refresh: vi.fn(),
  },
}));
```

#### DOM Element Mocks
Create actual DOM nodes for ref-based hook tests:
```typescript
const container = document.createElement('div');
const track = document.createElement('div');
Object.defineProperty(track, 'scrollWidth', { value: 3000, writable: true });
Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });

const containerRef = { current: container };
const trackRef = { current: track };
```

#### Spy on Methods
```typescript
const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
unmount();
expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
```

#### Timers (Debounce Testing)
```typescript
vi.useFakeTimers();
// ... trigger events that use debounce
vi.advanceTimersByTime(150); // advance past debounce delay
vi.useRealTimers();
```

#### Mock Cleanup
Per-test isolation ensures reliable tests:
```typescript
beforeEach(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.restoreAllMocks();
});
```

### What to Mock
- External APIs and network requests (when unit testing; E2E tests use real fetch)
- Browser APIs: `window`, `resize`, `ScrollTrigger`, GSAP
- Animation libraries (GSAP, Framer Motion) for unit/hook tests
- Custom hooks that depend on browser APIs

### What NOT to Mock
- Pure utility functions (`cn`, `clamp`, `mapRange`) — test them directly
- React itself
- TypeScript types/interfaces
- Component props and children
- Form validation logic (test actual implementation)

## Fixtures and Factories

Test data currently defined inline within test files. No dedicated fixtures directory exists yet.

Pattern example:
```typescript
const values = [
  { number: '01', image: IMAGES.faith, title: 'Faith', description: '...' },
  { number: '02', image: IMAGES.excellence, title: 'Excellence', description: '...' },
];
```

Future: Shared fixtures at `src/lib/__fixtures__/` for common test data.

## Coverage

### Configuration
Coverage thresholds (80% minimum across all categories):
- **Lines**: 80%
- **Functions**: 80%
- **Branches**: 80%
- **Statements**: 80%

### Commands
```bash
npm run test:coverage     # Generates text + HTML reports
# HTML report at: coverage/index.html
```

### Exclusions from Coverage
- `node_modules/`
- `out/` (static export output)
- `.next/` (Next.js build cache)
- `**/*.config.*` (configuration files)
- `**/*.d.ts` (TypeScript declaration files)
- `**/types.ts` (type-only files)

**Current Coverage Status**: Only one unit test file exists (`useHorizontalScroll.test.ts`). Coverage is below 80% threshold. Additional tests needed across the codebase.

## Test Types

### Unit Tests (Vitest)
**Scope**: Individual hooks, utility functions, pure functions in isolation

**Current examples**:
- `src/lib/hooks/useHorizontalScroll.test.ts` — tests debouncing, GSAP initialization, cleanup

**Covered behaviors**:
- Initial travel distance calculation
- Resize handling with debounce
- Resize listener cleanup on unmount

**Gaps** (untested):
- `utils.ts`: `cn`, `clamp`, `mapRange`
- `site-navigation.ts`: `getNavItemByHref`, `getBreadcrumbs`
- `form-validation.ts`: `validateContactForm`, `validateAdmissionsForm`, `isHoneypotFilled`
- `gsap-config.ts`: plugin registration singleton guard
- Custom hooks: `useClipMask.ts`, `useParallax.ts`, `useScrollDirection.ts`

### Integration Tests (Vitest)
**Scope**: Component integration with mocked dependencies

**Not yet implemented**. Planned for:
- Button component (variants, hover states, clicks)
- Accordion component (expand/collapse, keyboard)
- Carousel component (navigation, dots)
- Header component (navigation, mobile menu state)
- Form pages with validation flow

### E2E Tests (Playwright)
**Scope**: Full user flows across the deployed application

**Current test suites** (4 files, ~30 tests):

#### `e2e/navigation.spec.ts`
Verifies desktop navigation and sticky header behavior:
- Homepage loads successfully
- Desktop navigation shows all top-level links
- Hovering over navigation item shows mega-menu submenu
- Logo returns to homepage
- Navigation is sticky and visible when scrolling
- Navigation changes appearance on scroll (ghost nav → solid)
- Search button present

#### `e2e/mobile-menu.spec.ts`
Verifies mobile menu interactions:
- Opens when hamburger button clicked
- Closes when X button clicked
- Closes when Escape key pressed
- Prevents background scroll when open (iOS Safari / WebKit)
- Keyboard navigable
- Proper ARIA attributes (`aria-label`, `aria-expanded`)
- Navigation links work in mobile menu

#### `e2e/scroll-animations.spec.ts`
Verifies GSAP animation behavior:
- Horizontal scroll carousel is visible
- Carousel cards translate horizontally on vertical scroll
- Scroll animations work after window resize (no GSAP errors)
- No GSAP errors in console during scroll
- Hero section clip mask animation works
- Smooth scroll behavior enabled
- Scroll animations performant (no jank)

#### `e2e/accessibility.spec.ts`
Automated and manual accessibility checks via axe-core:
- Homepage has no critical accessibility violations
- Navigation has proper ARIA labels
- Images have alt text
- Color contrast meets WCAG AA standards
- Interactive elements are keyboard accessible
- Headings are in logical order
- Form inputs have labels
- No duplicate IDs on page

## Test Commands

```bash
# Unit & Integration Tests (Vitest)
npm run test              # Run all tests (watch mode)
npm run test:ui           # Open Vitest visual UI
npm run test -- --ui      # Alternative UI invocation
npm run test -- --run     # Single run (no watch)

# Coverage
npm run test:coverage     # Run tests with coverage report (HTML + text)

# E2E Tests (Playwright)
npm run test:e2e         # Run all Playwright tests (all browsers)
npm run test:e2e:ui      # Open Playwright test runner UI
npm run test:e2e:debug   # Debug mode with DevTools
```

## Test Patterns

### Describe/It Pattern
```typescript
describe('useHorizontalScroll', () => {
  it('calculates initial travel distance', () => { ... });
  it('recalculates travel distance on window resize', () => { ... });
});
```

### Hook Testing with RTL `renderHook`
```typescript
import { renderHook } from '@testing-library/react';

const { result, unmount } = renderHook(() => useHorizontalScroll({ containerRef, trackRef }));
// Access result.current if hook returns a value
```

### E2E Conditional Test Execution
Tests can be conditionally skipped based on browser or viewport:
```typescript
test.skip(browserName !== 'webkit', 'iOS Safari scroll lock test');
test.skip(true, 'Page not tall enough to scroll');
```

### Accessiblity Scanning
```typescript
import AxeBuilder from '@axe-core/playwright';

test('homepage has no critical accessibility violations', async ({ page }) => {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();

  const criticalViolations = results.violations.filter(
    v => v.impact === 'critical' || v.impact === 'serious'
  );
  expect(criticalViolations).toHaveLength(0);
});
```

### Console Error Capture
GSAP errors captured during scroll tests:
```typescript
const errors: string[] = [];
page.on('console', (msg) => {
  if (msg.type() === 'error' && (msg.text().includes('gsap') || msg.text().includes('ScrollTrigger'))) {
    errors.push(msg.text());
  }
});
expect(errors).toHaveLength(0);
```

## Known Testing Gaps

- **No unit tests** for pure utilities: `src/lib/utils.ts` (`cn`, `clamp`, `mapRange`)
- **No unit tests** for data functions: `src/lib/site-navigation.ts` (`getNavItemByHref`, `getBreadcrumbs`)
- **No unit tests** for validation: `src/lib/form-validation.ts` (form validators, honeypot check)
- **No unit tests** for GSAP configuration: `src/lib/gsap-config.ts` (plugin registration guard)
- **No unit tests** for image loader: `src/lib/image-loader.ts`
- **No hook tests** beyond `useHorizontalScroll`: `useClipMask.ts`, `useParallax.ts`, `useScrollDirection.ts`, `useScrollProgress.ts` untested
- **No component tests** for UI components:
  - `src/components/ui/Button.tsx`
  - `src/components/ui/Accordion.tsx`
  - `src/components/ui/Carousel.tsx`
  - `src/components/ui/Breadcrumbs.tsx`
  - `src/components/ui/GdprConsent.tsx`
  - `src/components/ui/ScrollReveal.tsx`
  - `src/components/ui/SkeletonLoader.tsx`
- **No component tests** for layout/sections:
  - `src/components/layout/WalkHeader.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/components/sections/HeroMasked.tsx`
  - `src/components/sections/StickySplitSection.tsx`
  - `src/components/templates/ContentPage.tsx`
- **No integration tests** across page components
- **No service worker / fetch mocking** for form submission tests (forms use real fetch to Formspree placeholder)
- **Low overall coverage** — 80% threshold configured but not met; urgent need for additional tests

---

*Testing analysis: 2026-04-28*
