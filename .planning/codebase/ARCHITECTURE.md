# Architecture

**Analysis Date:** 2026-04-28

## Pattern Overview

**Overall:** Next.js 16 App Router Static Export with Walker School Design System

**Key Characteristics:**
- Next.js 16.2.4 with App Router, configured for static export (`output: "export"`)
- Server Components by default, Client Components only where interactivity is required
- Walker School visual patterns replicated via GSAP 3 (ScrollTrigger) and Framer Motion 12
- CSS custom properties (Walker School design tokens) + Tailwind CSS v4
- Data-driven content with inline data definitions (no external data layer)
- Static Export: All pages pre-rendered to static HTML at build time

## Layers

### Presentation Layer (Pages & Components)

**Purpose:** Renders UI and handles user interactions

**Location:** `src/app/`, `src/components/`

**Contains:**
- Pages: `src/app/page.tsx`, `src/app/academics/page.tsx`, `src/app/admissions/page.tsx`, etc.
- Layouts: `src/app/layout.tsx` (root), `src/app/globals.css` (styles)
- Section components: `src/components/sections/HeroMasked.tsx`, `src/components/sections/StickySplitSection.tsx`
- UI primitives: `src/components/ui/Button.tsx`, `Accordion.tsx`, `Carousel.tsx`, etc.
- Layout elements: `src/components/layout/WalkHeader.tsx`

**Depends on:**
- React 19.2.4
- Custom hooks from `src/lib/hooks/`
- Utility functions from `src/lib/`
- Design tokens from `src/app/globals.css`

**Used by:**
- End users via static HTML/CSS/JS bundle served from `out/`

### Utility & Business Logic Layer

**Purpose:** Shared functions, hooks, configuration, and data definitions

**Location:** `src/lib/`

**Contains:**
- Custom hooks (`src/lib/hooks/`): `useHorizontalScroll`, `useParallax`, `useScrollProgress`, `useClipMask`, `useScrollDirection`
- Utilities (`src/lib/`): `utils.ts` (cn/clamp/mapRange), `gsap-config.ts`, `image-loader.ts`, `form-validation.ts`
- Data: `site-navigation.ts` (navigation structure), inline data in `page.tsx` (homepage IMAGES, values, divisions)

**Depends on:**
- External libraries (gsap 3.15.0, clsx 2.1.1, tailwind-merge 3.5.0)

**Used by:**
- All components requiring shared logic

### Asset Layer

**Purpose:** Static files served directly

**Location:** `public/images/`

**Contains:**
- Optimized images (WebP, PNG, JPEG) — Walker School reference photos
- Logo assets (`logo-st-elizabeth.svg`)

**Depends on:**
- Nothing — served as-is by static file server

**Used by:**
- Components via `/images/` paths

## Data Flow

### Static Build-Time Rendering

```
1. npm run build triggers Next.js static export
2. Next.js reads src/app/page.tsx and all interior pages
3. Components render with inline data (IMAGES, values, divisions) at build time
4. Static HTML/CSS/JS bundles written to out/ directory
5. Deployable to any static host (Vercel, Netlify, GitHub Pages)
```

### Client-Side Interactivity

```
1. Page loads in browser, Server Components hydrate into Client Components
2. Client Components ('use client') initialize in browser
3. Custom hooks (useHorizontalScroll, useParallax, etc.) register GSAP ScrollTrigger animations
4. GSAP ScrollTrigger maps scroll events to animation timelines
5. Custom events (horizontal-scroll-progress, horizontal-scroll-hero) coordinate cross-component animations
6. React state (useState) manages UI state (mobile menu open/close, accordion active index, carousel active slide)
```

### State Management

- **Local React state:** `useState` for tabs, accordions, mobile menu, carousel index
- **No global state management** — Redux, Zustand, Context API overkill for static content site
- **Animation state:** Managed entirely by GSAP timelines and ScrollTrigger

### Data Sources

- **Navigation data:** `src/lib/site-navigation.ts` — typed NavItem[] with nested children
- **Homepage content:** Inline in `src/app/page.tsx` as `const IMAGES`, `const values`, `const divisions`
- **Interior page content:** Inline JSX in page components (e.g., `src/app/academics/page.tsx`)

## Key Abstractions

### Section Components (Full-Viewport or Content Sections)

Large, self-contained page sections that compose the homepage and interior pages.

**Purpose:** Render complete visual sections with internal layout and animations

**Implementation pattern:**
```tsx
export function SectionName({ contentProp1, contentProp2 }: SectionProps) {
  // Internal state for accordion/tabs if needed
  const [state, setState] = useState(...);

  // GSAP animation in useEffect if 'use client'

  return (
    <section style={...}>
      {/* structured content */}
    </section>
  );
}
```

**Examples:**
- `src/components/sections/HeroMasked.tsx` (170 lines): SVG text-mask hero revealing background, GSAP scale animation on horizontal scroll
- `src/components/sections/StickySplitSection.tsx` (234 lines): 45:55 content+imagery split, built-in accordion, responsive staggered image grid

**Props pattern:**
- Content props: images (`leftImage`, `rightImages`), text (`overline`, `heading`, `body`)
- Style props: `backgroundColor` ('white' | 'light' | 'dark' | 'maroon')
- Data props: `accordion: AccordionItem[]`

### UI Primitives (Reusable Building Blocks)

Small, composable components that accept minimal props and provide flexible styling.

**Purpose:** Atomic UI elements used across sections

**Implementation pattern:**
```tsx
interface ButtonProps {
  label: string;
  variant?: 'primary' | 'outline' | 'ghost';
  href?: string;
  className?: string;
}
export function Button({ ... }: ButtonProps) { ... }
```

**Examples:**
- `src/components/ui/Button.tsx` — Walker primary/outline/ghost buttons with maroon hover slide
- `src/components/ui/Accordion.tsx` — Framer Motion AnimatePresence height animation
- `src/components/ui/Carousel.tsx` — Embla carousel wrapper
- `src/components/ui/Breadcrumbs.tsx` — nav breadcrumb trail
- `src/components/ui/SkeletonLoader.tsx` — loading placeholder

### Layout Components (Global Persistent)

Elements that appear on every page.

**Purpose:** Provide consistent header and footer across site

**Examples:**
- `src/components/layout/WalkHeader.tsx` (350 lines): Ghost nav header with mega-menu dropdowns, mobile full-screen overlay menu (hamburger → X), scroll-aware state (transparent → white)

**Ghost Nav pattern:** Transparent at page top, white background + shadow when user scrolls past 10% viewport height vertically or 5% horizontal scroll progress.

### Custom Hooks (Animation Logic)

Encapsulate GSAP animation patterns in reusable functions.

**Purpose:** Separate animation concerns from component rendering logic

**Examples:**
- `src/lib/hooks/useHorizontalScroll.ts` — Vertical scroll drives horizontal track translation (9-section homepage scroll-jacking, scrub: 1.2, pin: true)
- `src/lib/hooks/useParallax.ts` — Parallax image effect (speed multiplier, scrub: true)
- `src/lib/hooks/useScrollProgress.ts` — Maps scroll progress to 0-1 value
- `src/lib/hooks/useClipMask.ts` — SVG clip-path masking animation
- `src/lib/hooks/useScrollDirection.ts` — Detect scroll direction via scroll event listeners

**Hook signature pattern:** `function useHookName(params, refs): { state, handlers }` where refs are required for DOM access and cleanup via `gsap.context().revert()`.

### Design Tokens (Walker School SOP-001)

Centralized visual language in CSS custom properties.

**Location:** `src/app/globals.css`

**Pattern:** CSS `:root` variables + Tailwind CSS v4 utility classes mapped to tokens

**Color tokens:**
```css
--color-primary-maroon: #6C1F35
--color-white: #FFFFFF
--color-text-main: #1A1A1A
--color-gray: #555555
```

**Easing tokens (SOP-001):**
```css
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1)
--ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1)
--ease-smooth: cubic-bezier(0.25, 1, 0.5, 1)
```

**Typography tokens:** Walker fluid typography via `clamp()`: `.walker-heading` (clamp(2rem, 4vw, 4.5rem)), `.walker-body` (1.25rem / 1.6 line-height)

**Layout tokens:** `--container-max: 1440px`, `--section-padding-y: clamp(4rem, 10vw, 12rem)`, `--container-padding: clamp(24px, 4vw, 60px)`

## Entry Points

### Root Layout — `src/app/layout.tsx`

**Triggers:** Every page request (static site), Next.js build process

**Responsibilities:**
- HTML wrapper with `lang="en"` and font CSS variables (`--font-inter`, `--font-playfair`, `--font-montserrat`)
- Load Google Fonts via `next/font/google` (Inter, Playfair Display, Montserrat) with `display: 'swap'` and `preload: true`
- Define `metadata`: title, description, keywords, OpenGraph, Twitter Card, icons (16x16, 32x32, Apple touch)
- Inject JSON-LD structured data: Organization + HighSchool + LocalBusiness schema type array
- Render `children` (page content) inside `<body>`

### Homepage — `src/app/page.tsx` (685 lines)

**Triggers:** User navigates to `/`

**Responsibilities:**
- Top-level composition: `<WalkHeader />` + horizontal scroll container + 9 section children
- Define `IMAGES` object mapping semantic names to `/images/` paths (placeholder Walker images)
- Define `values` array data (01-04: Faith, Excellence, Service, Community)
- Define `divisions` array data (grades 8-12)
- Inline components: `ValueCard`, `PassionsPanel` (student life), `DivisionsTabsHorizontal`
- Horizontal scroll GSAP setup (container height calculation, track translateX, `scrub: 1.2`, `pin: true`)
- Skeleton loader during client hydration (`useEffect` → `setMounted(true)`)

### Interior Pages — `src/app/{page}/page.tsx`

**Pattern:** All interior pages follow the same template:

```tsx
export default function PageName() {
  return (
    <ContentPage>
      <Breadcrumbs items={[{ label: 'Page', href: '/page' }]} />
      <PageHero title="..." description="..." backgroundImage="/images/..." />
      {/* Section content with StickySplitSection, grid, etc. */}
    </ContentPage>
  );
}
```

**Existing pages:** Academics, Admissions, Arts, Athletics, Contact, About (all use `ContentPage` template from `src/components/templates/ContentPage.tsx`)

### Global Styles — `src/app/globals.css`

**Triggers:** Imported by `src/app/layout.tsx`

**Contains:**
- CSS custom properties (design tokens: colors, fonts, easing, spacing)
- Tailwind CSS v4 `@import "tailwindcss"`
- Walker School class utilities: `.walker-heading`, `.walker-body`, `.text-overline`, `.values-grid`, `.hero-mission-block`, `.walker-split`, etc.
- Responsive styles using CSS `@media` queries

### Data — `src/lib/site-navigation.ts`

**Exports:**
- `siteNavigation: NavItem[]` — six top-level nav items (About Us, Academics, Admissions, Student Life, Community, Contact), each with 4-7 children
- `getNavItemByHref(href: string)` — linear search
- `getBreadcrumbs(href: string)` — returns 1- or 2-level breadcrumb arrays

### GSAP — `src/lib/gsap-config.ts`

Central GSAP configuration singleton:

- Imports `gsap`, `ScrollTrigger`, `Flip` from external
- Registers ScrollTrigger and Flip exactly once (singleton guard for React strict mode)
- Sets global defaults: `ease: 'expo.out'`, `duration: 0.8`
- Configures ScrollTrigger: `ignoreMobileResize: true`

### Homepage JS Bundle — Entry Point

Browser executes `static/chunks/main.js` which:
- Hydrates `page.tsx` (marked `'use client'` for horizontal scroll and animations)
- Initializes Lenis smooth scroll (if used)
- Registers GSAP ScrollTriggers
- Enables Framer Motion animations for header menu dropdowns

## Error Handling

### Build-Time Errors
- **TypeScript strict mode** (`"strict": true`) catches type mismatches at compile
- **Next.js build fails** if any component throws or has syntax errors
- **ESLint** (`npx eslint`) catches style violations before commit

### Runtime Errors
- **No error boundaries** — not needed for static content without server calls
- **Optional chaining** for nullable props: `item.href ?? '#'`, `leftImage && <img ...>`
- **Static asset 404s** — missing images show broken image icon (no fallback)
- **Console.error** used intentionally for debugging only (not present in production code)

### Image Loading
- Custom image loader defined in `src/lib/image-loader.ts` with device sizes and WebP/AVIF formats
- `unoptimized: false` in `next.config.ts` means images are optimized via Next.js Image component (disabled for static export, uses custom loader instead)

## Cross-Cutting Concerns

### Accessibility
- Semantic HTML (`<section>`, `<article>`, `<nav>`, `<main>`, `<header>`)
- ARIA attributes: `aria-label`, `aria-expanded`, `aria-hidden="true"` on decorative SVGs
- Keyboard navigation: native browser behavior preserved in focus management
- Mobile menu can be dismissed with Escape key (keydown listener in WalkHeader)
- Color contrast designed for WCAG 2.1 AAA (needs formal audit)

### Performance
- **Static export**: Zero server response time, CDN-ready HTML
- **Font optimization**: `next/font/google` with `preload: true` and `display: 'swap'` eliminates FOIT
- **Image optimization**: AVIF/WebP formats, device-aware sizes via custom loader
- **Animation performance**: GSAP uses `will-change` and GPU-accelerated CSS transforms
- **Scroll performance**: Lenis smooth scroll (if used) runs at 60fps
- **Debounced resize**: 200ms debounce on resize handler to prevent excessive `ScrollTrigger.refresh()` calls

### SEO
- **Metadata API**: Per-page `export const metadata` in layout/page files, Next SEO integration
- **JSON-LD structured data** in `RootLayout`: EducationalOrganization + HighSchool + LocalBusiness schema
- **Semantic headings**: H1 on each page, H2/H3 in sections
- **Alt text**: Provided on all content images
- **Static HTML**: Full content crawlable by search engines

### Responsive Design
- **Fluid typography**: `clamp(min, preferred, max)` for all font sizes (Walker fluid scale)
- **Grid layouts**: CSS Grid with `repeat(auto-fit, minmax(...))` patterns
- **Breakpoints**: Mobile-first default, `@media (min-width: 768px)`, `@media (min-width: 1024px)`
- **Mobile menu**: Full-screen hamburger overlay on small screens
- **Desktop mega-menu**: Hover-triggered dropdown with Framer Motion transitions

---

*Architecture analysis: 2026-04-28*
