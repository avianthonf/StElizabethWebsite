# Technology Stack: Premium School Marketing Site

**Project:** St. Elizabeth High School Website (Walker Fidelity Clone)
**Researched:** 2026-04-28
**Confidence:** HIGH — Based on existing `package.json` and verified with Context7-style documentation lookup

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Next.js** | 16.2.4 | React framework with App Router, static export (`output: "export"`), routing, build system | Already chosen; static export matches project constraint (no backend); App Router provides file-based routing and layouts |
| **React** | 19.2.4 | UI library, component model, hooks | Next.js dependency; React 19 features (Actions, useOptimistic) not needed but fine |
| **TypeScript** | 5.x | Type safety, developer experience, IDE support | Strict mode enabled (`"strict": true`); catches errors at compile time; required by project |

### Styling & Design Tokens

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Tailwind CSS** | 4.x | Utility-first CSS, design token mapping | Walker design system uses Tailwind utilities + CSS custom properties; v4's `@import "tailwindcss"` pattern already configured |
| **CSS Custom Properties** | N/A | Walker SOP-001 design tokens (colors, fonts, easing, spacing) | Centralized visual language in `:root`; referenced throughout components; required for theme consistency |

### Animation & Motion

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **GSAP** | 3.15.0 | ScrollTrigger-based scroll animations, horizontal scroll-jacking, parallax, SVG mask animation | Walker's animation backbone; `scrub: 1.2` and `pin: true` are signature values; GSAP 3.x required (GSAP 4 has breaking changes) |
| **ScrollTrigger** | 3.15.0 (plugin) | Scroll-driven animation coordination | Enables pin, scrub, and `onUpdate` event dispatch; critical for horizontal scroll event bus |
| **Framer Motion** | 12.38.0 | UI state transitions (dropdowns, mobile menu, accordion, page transitions) | Walker uses FM for hover/focus transitions (ease-in-out-quint), not GSAP; `AnimatePresence` for enter/exit |
| **Lenis** | 1.3.23 | Optional smooth scroll (momentum scrolling) | Walker reference likely uses smooth scroll on desktop; can be added for premium feel but not required |

### Iconography & Carousels

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **Lucide React** | 1.11.0 | Icon library (hamburger, X, Search, Chevron, chevron-down, arrow icons) | Consistent line icons; already in use; matches Walker minimal icon style |
| **Embla Carousel React** | 8.6.0 | Touch-friendly carousel/slider component | Walker may use carousels for image galleries or testimonials; Embla is lightweight, touch-optimized, no-jquery dependency |

### Utilities

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| **clsx** | 2.1.1 | Conditional className utility | Used with `tailwind-merge` for dynamic Tailwind class composition |
| **tailwind-merge** | 3.5.0 | Merge Tailwind classes without conflicts | Prevents duplicate utility classes when combining conditional classes |
| **next-seo** | 7.2.0 | SEO meta tag management (optional) | Currently not used; Next.js metadata API preferred; can remove from dependencies |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| **ESLint** | 9.x | Linting with Next.js + TypeScript config |
| **@types/node** | 20.x | Node.js types for TypeScript |
| **@types/react** | 19.x | React types |
| **@types/react-dom** | 19.x | React DOM types |
| **PostCSS** | with `@tailwindcss/postcss` 4.x | CSS processing for Tailwind v4 |

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| **Animation Library** | GSAP 3.x | Framer Motion only | GSAP ScrollTrigger is superior for scroll-linked animations; FM is not designed for complex scrub effects |
| **Animation Library** | GSAP 3.x | React Spring | React Spring lacks robust ScrollTrigger; GSAP industry standard for premium sites |
| **Carousel** | Embla Carousel | Swiper | Swiper is heavier; Embla is more modular and has no external CSS requirements |
| **Smooth Scroll** | Lenis | Locomotive Scroll | Locomotive Scroll has known issues with GSAP integration; Lenis is lighter and designed for GSAP |
| **Icon Set** | Lucide React | Heroicons (React) | Lucide is actively maintained and has more complete icon set; Heroicons React package is less featured |
| **Static Site Generator** | Next.js static export | Astro, Gatsby | Next.js already in use; Astro would require rewrite; Gatsby is in maintenance mode |
| **CSS Framework** | Tailwind CSS v4 | CSS Modules, Styled Components | Tailwind enables rapid UI building; matches Walker's utility-heavy class patterns; global CSS would be disjointed |

### Animation Stack Decision Rationale

We assessed pure Framer Motion vs. GSAP+FM hybrid:

- **Pure Framer Motion:** Would require building custom scroll-linked animation logic (useScroll + useTransform) which is possible but less performant at scale; FM's mount-only animation lifecycle adds complexity when coordinating 9 simultaneous sections.
- **GSAP + Framer Motion (chosen):** GSAP owns scroll-driven effects (horizontal carousel, parallax, hero mask); Framer Motion owns UI overlay transitions (menus, accordions). This separation of concerns matches Walker's implementation and provides best performance per domain.

---

## Installation

```bash
# Core dependencies (already present in package.json)
npm install next@16.2.4 react@19.2.4 react-dom@19.2.4
npm install gsap@3.15.0 framer-motion@12.38.0 lenis@1.3.23 embla-carousel-react@8.6.0
npm install lucide-react@1.11.0 clsx@2.1.1 tailwind-merge@3.5.0

# Styling
npm install -D tailwindcss@4 @tailwindcss/postcss@4 postcss

# TypeScript types
npm install -D @types/node@20 @types/react@19 @types/react-dom@19 typescript@5

# Development
npm install -D eslint@9 eslint-config-next
```

### GSAP Configuration (Singleton Registration)

Create `src/lib/gsap-config.ts` to register plugins once (avoiding StrictMode double-init):

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Guard against double-registration in React StrictMode
if (!gsap.plugins.scrollTrigger) {
  gsap.registerPlugin(ScrollTrigger, Flip);
  ScrollTrigger.config({
    ignoreMobileResize: true,
    limitCallbacks: true,
  });
  gsap.defaults({ ease: 'expo.out', duration: 0.8 });
}

export { gsap, ScrollTrigger };
```

---

## Version Pinning Strategy

**Critical lockings:**

- GSAP `3.x` only. GSAP 4.x changes plugin architecture (ScrollTrigger becomes entry plugin, import paths change). Pinning to `"gsap": "3.15.0"` prevents breakage.
- Framer Motion `12.38.0`. FM v13 may change server component compatibility. Pin via exact version (no caret) until migration planned.
- Tailwind CSS `4.x`. v4 is current; monitor for breaking changes in v5. Use `@tailwindcss/postcss` plugin.

---

## Configuration Files

### `next.config.ts`
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // Static export
  trailingSlash: true, // Walker-style URLs with trailing slash
  images: {
    unoptimized: true, // Disable Next.js Image optimization (static export); use custom loader or raw img
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
  // Future: experimental: { cpus: 2 } for faster builds on multi-core
};

export default nextConfig;
```

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### `postcss.config.mjs`
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### `eslint.config.mjs`
```javascript
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import nextJsConfig from 'eslint-config-next/core-web-vitals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript'],
  }),
];
```

---

## Why This Stack for This Project

1. **Static export (`output: "export"`)**: No server runtime required; deploy to any static host (Vercel, Netlify, GitHub Pages); zero server costs.
2. **GSAP + ScrollTrigger**: Industry standard for scroll-driven storytelling; Walker School uses GSAP; precise control over scrub, pin, and refresh behavior.
3. **Framer Motion for UI**: Declarative transitions for menu/accordion; integrates cleanly with React state; Walker-style ease curves via cubic-bezier specification.
4. **Tailwind CSS v4**: Rapid prototyping with utility classes; design token integration via `@theme` or CSS variables; matches Walker's utility-heavy class patterns.
5. **TypeScript strict mode**: Compile-time safety across 9 homepage sections, 8 interior pages, 40+ components; prevents prop-drift bugs.
6. **No state management library**: Content is static; only local UI state (accordion open, mobile menu toggle, carousel index). Context/Zustand would be overkill.

---

## Sources

- Next.js 16 App Router documentation — Static export configuration, `output: "export"`
- GSAP 3.x ScrollTrigger documentation — Pin + scrub + refresh patterns
- Framer Motion 12 documentation — AnimatePresence, motion.div transitions, layout animations
- Tailwind CSS v4 documentation — @tailwindcss/postcss plugin, utility class patterns
- `package.json` in codebase — Existing dependency versions pinned
- `src/lib/gsap-config.ts` — Plugin registration pattern
- `.planning/codebase/ARCHITECTURE.md` — Architecture layer analysis
