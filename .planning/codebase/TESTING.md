# Testing Patterns

**Analysis Date:** 2026-04-27

## Test Framework

**Runner:**
- Not yet configured
- Recommended: Vitest (fast, Vite-based, TypeScript-first)
- Alternative: Jest (industry standard, more mature ecosystem)

**Assertion Library:**
- Not yet configured
- Recommended: Vitest built-in assertions or Jest expect API

**Run Commands:**
```bash
# To be configured in package.json
npm run test              # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

**Current Status:** No test framework installed. Testing infrastructure needs to be set up.

## Test File Organization

**Location:**
- Recommended: Co-located with source files
- Pattern: `ComponentName.test.tsx` next to `ComponentName.tsx`
- Example structure:
```
src/
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Accordion.tsx
│   │   └── Accordion.test.tsx
│   └── sections/
│       ├── ValueCarousel.tsx
│       └── ValueCarousel.test.tsx
├── lib/
│   ├── utils.ts
│   ├── utils.test.ts
│   ├── site-navigation.ts
│   └── site-navigation.test.ts
```

**Naming:**
- Test files: `*.test.ts` or `*.test.tsx`
- Spec files: `*.spec.ts` or `*.spec.tsx` (alternative, less common)
- Prefer `.test.tsx` for consistency with TypeScript ecosystem

**Structure:**
```
src/
├── components/          # Component tests co-located
├── lib/                 # Utility tests co-located
└── __tests__/          # Integration/E2E tests (optional)
```

## Test Structure

**Suite Organization:**
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  describe('rendering', () => {
    it('renders with label', () => {
      render(<Button label="Click me" />);
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });

    it('renders with custom icon', () => {
      const icon = <span data-testid="custom-icon">→</span>;
      render(<Button label="Next" icon={icon} />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('variants', () => {
    it('applies primary variant styles', () => {
      render(<Button label="Primary" variant="primary" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-[#000]');
    });

    it('applies outline variant styles', () => {
      render(<Button label="Outline" variant="outline" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-transparent');
    });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      render(<Button label="Click" onClick={handleClick} />);
      screen.getByRole('button').click();
      expect(handleClick).toHaveBeenCalledOnce();
    });
  });
});
```

**Patterns:**
- Nested `describe` blocks for logical grouping
- Descriptive test names: "renders with label", "calls onClick when clicked"
- Arrange-Act-Assert pattern
- One assertion per test (preferred) or related assertions grouped

## Mocking

**Framework:** 
- Vitest: `vi.fn()`, `vi.mock()`, `vi.spyOn()`
- Jest: `jest.fn()`, `jest.mock()`, `jest.spyOn()`

**Patterns:**
```typescript
import { vi } from 'vitest';
import { render } from '@testing-library/react';

// Mock external dependencies
vi.mock('@/lib/gsap-config', () => ({
  gsap: {
    to: vi.fn(),
    fromTo: vi.fn(),
  },
  ScrollTrigger: {
    create: vi.fn(),
  },
}));

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    pathname: '/',
  }),
}));

// Mock custom hooks
vi.mock('@/lib/hooks/useHorizontalScroll', () => ({
  useHorizontalScroll: vi.fn(),
}));

describe('ValueCarousel', () => {
  it('initializes horizontal scroll', () => {
    const { useHorizontalScroll } = await import('@/lib/hooks/useHorizontalScroll');
    render(<ValueCarousel values={mockValues} />);
    expect(useHorizontalScroll).toHaveBeenCalled();
  });
});
```

**What to Mock:**
- External APIs and network requests
- Browser APIs (window, localStorage, IntersectionObserver)
- Animation libraries (GSAP, Framer Motion) for unit tests
- Next.js router and navigation
- Custom hooks that depend on browser APIs
- Third-party libraries with side effects

**What NOT to Mock:**
- React itself
- Simple utility functions (`cn`, `clamp`, `mapRange`)
- TypeScript types/interfaces
- Component props and children
- Pure functions without side effects

## Fixtures and Factories

**Test Data:**
```typescript
// src/lib/__fixtures__/navigation.ts
import type { NavItem } from '../site-navigation';

export const mockNavItem: NavItem = {
  label: 'About Us',
  href: '/about',
  children: [
    { label: 'Our Story', href: '/about/history' },
    { label: 'Mission & Vision', href: '/about/mission' },
  ],
};

export const mockNavigation: NavItem[] = [
  mockNavItem,
  {
    label: 'Admission',
    href: '/admission',
    children: [
      { label: 'Apply Online', href: '/admission/apply' },
    ],
  },
];

// src/lib/__fixtures__/values.ts
import type { ValueItem } from '@/components/sections/ValueCarousel';

export const mockValueItem: ValueItem = {
  number: '01',
  image: '/images/test-image.webp',
  title: 'Test Value',
  description: 'Test description',
  href: '/test',
};

export const mockValues: ValueItem[] = [
  mockValueItem,
  { ...mockValueItem, number: '02', title: 'Second Value' },
];
```

**Location:**
- `src/lib/__fixtures__/` for shared test data
- Co-located `ComponentName.fixtures.ts` for component-specific data

**Factory Pattern:**
```typescript
// src/lib/__factories__/navigation.factory.ts
import type { NavItem } from '../site-navigation';

export function createNavItem(overrides?: Partial<NavItem>): NavItem {
  return {
    label: 'Test Item',
    href: '/test',
    children: [],
    ...overrides,
  };
}

export function createNavigation(count: number = 3): NavItem[] {
  return Array.from({ length: count }, (_, i) => 
    createNavItem({ label: `Item ${i + 1}`, href: `/item-${i + 1}` })
  );
}
```

## Coverage

**Requirements:** 80% minimum (per global rules)

**View Coverage:**
```bash
npm run test:coverage
# Opens coverage report in browser
```

**Coverage Configuration:**
```javascript
// vitest.config.ts (to be created)
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        '.next/',
        'out/',
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
});
```

**Priority Areas for Coverage:**
- Utility functions: `src/lib/utils.ts`, `src/lib/site-navigation.ts`
- UI components: `src/components/ui/Button.tsx`, `src/components/ui/Accordion.tsx`
- Custom hooks: `src/lib/hooks/useHorizontalScroll.ts`, `src/lib/hooks/useScrollProgress.ts`
- Data transformations and business logic

## Test Types

**Unit Tests:**
- Scope: Individual functions, components, hooks in isolation
- Approach: Mock external dependencies, test pure logic
- Files: `Button.test.tsx`, `utils.test.ts`, `useScrollProgress.test.ts`
- Example:
```typescript
describe('cn utility', () => {
  it('merges Tailwind classes', () => {
    expect(cn('px-4', 'px-2')).toBe('px-2'); // Later class wins
  });

  it('handles conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible');
  });
});
```

**Integration Tests:**
- Scope: Multiple components working together, data flow
- Approach: Render component trees, test interactions
- Files: `Header.integration.test.tsx`, `ValueCarousel.integration.test.tsx`
- Example:
```typescript
describe('Header integration', () => {
  it('opens submenu on hover', async () => {
    render(<Header />);
    const aboutLink = screen.getByText('About Us');
    await userEvent.hover(aboutLink);
    expect(screen.getByText('Our Story')).toBeVisible();
  });

  it('closes mobile menu after navigation', async () => {
    render(<Header />);
    const menuButton = screen.getByLabelText('Toggle menu');
    await userEvent.click(menuButton);
    const link = screen.getByText('Admission');
    await userEvent.click(link);
    expect(screen.queryByText('Apply Online')).not.toBeInTheDocument();
  });
});
```

**E2E Tests:**
- Framework: Playwright (recommended for Next.js)
- Scope: Critical user flows, full page interactions
- Location: `e2e/` directory at project root
- Not yet implemented

**E2E Setup (to be configured):**
```bash
npm install -D @playwright/test
npx playwright install
```

```typescript
// e2e/homepage.spec.ts
import { test, expect } from '@playwright/test';

test('homepage loads and displays hero', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('WE BELIEVE');
});

test('navigation menu works', async ({ page }) => {
  await page.goto('/');
  await page.click('text=About Us');
  await expect(page).toHaveURL('/about');
});

test('value carousel scrolls horizontally', async ({ page }) => {
  await page.goto('/');
  const carousel = page.locator('[aria-label="Our values"]');
  await carousel.scrollIntoViewIfNeeded();
  // Test scroll behavior
  await page.mouse.wheel(0, 500);
  await expect(carousel.locator('text=Curiosity')).toBeVisible();
});
```

## Common Patterns

**Async Testing:**
```typescript
import { waitFor } from '@testing-library/react';

it('loads data asynchronously', async () => {
  render(<AsyncComponent />);
  
  // Wait for loading to complete
  await waitFor(() => {
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
  
  expect(screen.getByText('Data loaded')).toBeInTheDocument();
});
```

**Error Testing:**
```typescript
it('handles errors gracefully', () => {
  const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
  
  expect(() => {
    render(<ComponentWithError />);
  }).toThrow('Expected error message');
  
  consoleError.mockRestore();
});

it('displays error message to user', async () => {
  const mockFetch = vi.fn().mockRejectedValue(new Error('Network error'));
  global.fetch = mockFetch;
  
  render(<DataComponent />);
  
  await waitFor(() => {
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});
```

**Animation Testing:**
```typescript
import { act } from '@testing-library/react';

it('animates accordion open', async () => {
  vi.useFakeTimers();
  render(<Accordion items={mockItems} />);
  
  const button = screen.getByText('Item 1');
  await userEvent.click(button);
  
  // Fast-forward animation
  act(() => {
    vi.advanceTimersByTime(400); // Animation duration
  });
  
  expect(screen.getByText('Item 1 content')).toBeVisible();
  
  vi.useRealTimers();
});
```

**Snapshot Testing (use sparingly):**
```typescript
it('matches snapshot', () => {
  const { container } = render(<Button label="Test" />);
  expect(container.firstChild).toMatchSnapshot();
});
```

## Testing Libraries to Install

```bash
# Core testing
npm install -D vitest @vitest/ui

# React testing
npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event

# E2E testing
npm install -D @playwright/test

# Type support
npm install -D @types/testing-library__jest-dom
```

## Next Steps

1. **Install Vitest and React Testing Library**
2. **Create `vitest.config.ts`** with coverage thresholds
3. **Add test scripts to `package.json`**
4. **Write tests for utility functions first** (`utils.ts`, `site-navigation.ts`)
5. **Add tests for UI components** (`Button.tsx`, `Accordion.tsx`)
6. **Test custom hooks** with `@testing-library/react-hooks`
7. **Set up Playwright for E2E tests** of critical flows
8. **Configure CI/CD** to run tests on every commit

---

*Testing analysis: 2026-04-27*
