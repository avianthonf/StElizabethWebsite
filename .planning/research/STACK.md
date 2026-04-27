# Stack Research

**Domain:** School Marketing Website (Static Export)
**Researched:** 2026-04-27
**Confidence:** HIGH

## Recommended Stack

### Core Technologies (Already Selected)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js | 14+ (App Router) | Static site generation | Industry standard for React SSG, excellent DX, built-in optimizations |
| TypeScript | Latest | Type safety | Catches errors at compile time, improves maintainability |
| Tailwind CSS | v4 | Styling | Utility-first CSS, excellent for rapid development and consistency |
| GSAP | 3.x | Advanced animations | Industry-leading animation library, performant, timeline-based |
| Framer Motion | 11 | React animations | Declarative animations for React, excellent for page transitions |

### Testing Framework

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Vitest | ^4.1.5 | Unit/integration testing | All component and utility testing |
| @testing-library/react | ^16.3.2 | React component testing | Testing user interactions and component behavior |
| @testing-library/jest-dom | ^6.6.3 | DOM matchers | Enhanced assertions for DOM testing |
| @playwright/test | ^1.59.1 | E2E testing | Critical user flows (contact forms, navigation) |
| @axe-core/playwright | ^4.11.0 | E2E accessibility testing | Automated a11y checks in E2E tests |

**Rationale:** Vitest is the modern standard for Vite-based projects (faster than Jest, better ESM support). Playwright provides reliable cross-browser E2E testing with excellent debugging tools. Both integrate seamlessly with Next.js 14.

### Accessibility Testing

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| axe-core | ^4.11.3 | Accessibility engine | Core a11y testing engine |
| jest-axe | ^10.0.0 | Vitest integration | Unit/integration test a11y checks |
| @axe-core/react | ^4.11.2 | Development warnings | Runtime a11y warnings in dev mode |

**Rationale:** axe-core is the industry standard (Deque Systems), catches ~57% of WCAG issues automatically. Schools often require WCAG 2.1 AA compliance for accessibility. jest-axe works with Vitest despite the name (Jest-compatible API).

### Form Handling

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| React Hook Form | ^7.74.0 | Form state management | Complex forms (applications, multi-step) |
| @hookform/resolvers | ^5.2.2 | Schema validation adapter | Integrates Zod with React Hook Form |
| Zod | ^4.3.6 | Schema validation | Type-safe validation, excellent TypeScript integration |
| Formspree | Free tier | Form backend | Simple contact forms (no backend needed) |

**Rationale:** For static export, you need external form handling. React Hook Form + Zod provides excellent DX for complex forms with client-side validation. Formspree free tier (50 submissions/month) is sufficient for school contact forms and doesn't require hosting lock-in like Netlify Forms.

### Image Optimization

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| next/image | Built-in | Image component | All images (with custom loader) |
| sharp | ^0.33.5 | Build-time optimization | Pre-optimize images during build |

**Rationale:** Next.js Image component requires a custom loader for static export (default optimization requires Node.js server). Use sharp in a build script to pre-optimize images, then serve optimized versions. This maintains performance without runtime optimization.

**Image Strategy for Static Export:**
1. Pre-optimize images with sharp during build
2. Generate multiple sizes (responsive images)
3. Use next/image with `unoptimized` prop or custom loader pointing to pre-optimized assets
4. Serve WebP/AVIF formats with fallbacks

### Performance Monitoring

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| web-vitals | ^5.2.0 | Core Web Vitals tracking | Track LCP, FID, CLS, TTFB, INP |
| @vercel/analytics | ^1.4.1 | Analytics (optional) | If deploying to Vercel (free tier available) |

**Rationale:** web-vitals library is Google's official implementation for tracking Core Web Vitals. For schools, free analytics are preferred. Vercel Analytics free tier works well if hosting on Vercel. Otherwise, integrate web-vitals with Google Analytics 4 (note: consider privacy implications for educational institutions - may need GDPR/COPPA compliance).

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| ESLint | Code linting | Use Next.js recommended config |
| Prettier | Code formatting | Integrate with Tailwind plugin |
| Husky | Git hooks | Pre-commit linting and testing |
| lint-staged | Staged file linting | Only lint changed files |

## Installation

```bash
# Testing
npm install -D vitest @testing-library/react @testing-library/jest-dom @vitest/ui jsdom
npm install -D @playwright/test
npm install -D axe-core jest-axe @axe-core/playwright
npm install -D @axe-core/react

# Forms
npm install react-hook-form @hookform/resolvers zod

# Image optimization (build-time)
npm install -D sharp

# Performance monitoring
npm install web-vitals

# Development tools
npm install -D eslint prettier eslint-config-prettier
npm install -D husky lint-staged
```

## Configuration Examples

### Vitest Setup (vitest.config.ts)

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
      exclude: ['node_modules/', 'out/', '.next/']
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

### Playwright Setup (playwright.config.ts)

```typescript
import { defineConfig, devices } from '@playwright/test'

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
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### Web Vitals Integration (app/layout.tsx)

```typescript
import { Analytics } from '@/components/analytics'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

```typescript
// components/analytics.tsx
'use client'

import { useEffect } from 'react'
import { onCLS, onFID, onLCP, onINP, onTTFB } from 'web-vitals'

export function Analytics() {
  useEffect(() => {
    onCLS(console.log)
    onFID(console.log)
    onLCP(console.log)
    onINP(console.log)
    onTTFB(console.log)
    // Replace console.log with your analytics endpoint
  }, [])

  return null
}
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Vitest | Jest | If team already has extensive Jest experience |
| Playwright | Cypress | If team prefers Cypress DX (more opinionated, easier for beginners) |
| Formspree | Netlify Forms | If already hosting on Netlify (tighter integration) |
| Formspree | Web3Forms | If need more free submissions (250/month) |
| React Hook Form | Formik | If team already uses Formik (more mature, larger ecosystem) |
| web-vitals + GA4 | Vercel Analytics | If hosting on Vercel (zero config, better DX) |
| web-vitals + GA4 | Plausible/Fathom | If privacy is critical (GDPR-friendly, no cookies) |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Jest (for new projects) | Slower than Vitest, poor ESM support | Vitest |
| Enzyme | Deprecated, doesn't support React 18+ | React Testing Library |
| Default Next.js Image optimization | Requires Node.js server (incompatible with static export) | Custom loader or pre-optimization with sharp |
| Server Actions | Not supported in static export | Client-side form handling + external service |
| Google Analytics Universal (UA) | Deprecated July 2023 | Google Analytics 4 or privacy-focused alternatives |

## Stack Patterns by Use Case

**Simple Contact Form:**
- Use Formspree free tier (50 submissions/month)
- Basic HTML form with client-side validation
- No React Hook Form needed

**Complex Forms (Applications, Multi-step):**
- Use React Hook Form + Zod
- Client-side validation with schema
- Submit to Formspree or custom endpoint

**Image-Heavy Site:**
- Pre-optimize all images with sharp build script
- Generate WebP/AVIF formats
- Use next/image with custom loader or unoptimized prop
- Consider CDN for image delivery

**Accessibility Compliance (WCAG 2.1 AA):**
- Use axe-core in all test levels (unit, integration, E2E)
- Add @axe-core/react for dev-time warnings
- Manual testing still required (automated catches ~57% of issues)
- Use semantic HTML and ARIA labels

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| Vitest ^4.1.5 | Next.js 14+ | Works with App Router |
| @testing-library/react ^16.3.2 | React 18+ | Requires React 18+ |
| Playwright ^1.59.1 | Node.js 18+ | Requires Node.js 18 or higher |
| React Hook Form ^7.74.0 | React 18+ | Full React 18 support |
| Zod ^4.3.6 | TypeScript 5+ | Best with TypeScript 5+ |
| sharp ^0.33.5 | Node.js 18.17+ | Native dependencies, may need rebuild |

## Known Limitations

**Static Export Constraints:**
- No server-side image optimization (must use custom loader or pre-optimization)
- No Server Actions (use client-side form handling)
- No dynamic routes without `generateStaticParams()`
- No API routes that depend on request data

**Form Handling:**
- Formspree free tier: 50 submissions/month (sufficient for most school sites)
- Netlify Forms: Requires Netlify hosting (vendor lock-in)
- Consider spam protection (reCAPTCHA, Turnstile)

**Accessibility Testing:**
- Automated tools catch ~57% of WCAG issues
- Manual testing required for full compliance
- Screen reader testing recommended
- Keyboard navigation testing required

## Sources

- Context7: /vitest-dev/vitest (v4.1.5) — Latest version and features
- Context7: /microsoft/playwright (v1.59.1) — E2E testing capabilities
- Context7: /react-hook-form/react-hook-form (v7.74.0) — Form handling
- Context7: /dequelabs/axe-core (v4.11.3) — Accessibility testing
- Official: https://nextjs.org/docs/app/building-your-application/deploying/static-exports — Static export limitations
- npm registry: Verified all package versions (2026-04-27)

---
*Stack research for: St. Elizabeth High School Website*
*Researched: 2026-04-27*
*Confidence: HIGH — All versions verified, recommendations based on current ecosystem standards*
