# Codebase Structure

**Analysis Date:** 2026-04-28

## Directory Layout

```
st-elizabeth-website/
├── .claude/                    # Claude Code configuration
├── .git/                       # Git repository
├── e2e/                        # Playwright E2E tests
│   ├── accessibility.spec.ts
│   ├── mobile-menu.spec.ts
│   ├── navigation.spec.ts
│   └── scroll-animations.spec.ts
├── .planning/                  # GSD planning documents
│   ├── codebase/              # Architecture analysis docs
│   │   ├── ARCHITECTURE.md
│   │   ├── CONCERNS.md
│   │   ├── CONVENTIONS.md
│   │   ├── INTEGRATIONS.md
│   │   ├── STACK.md
│   │   └── STRUCTURE.md
│   ├── phases/                # Phase planning documents
│   └── quick/                 # Quick fix planning
├── public/                     # Static assets (deployed as-is)
│   └── images/                # Optimized images (WebP, PNG, JPEG)
├── scripts/                    # Build scripts
│   └── optimize-images.js      # Image optimization script
├── src/                        # Source code
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # Homepage (home route /)
│   │   ├── layout.tsx          # Root layout (HTML wrapper, fonts, metadata)
│   │   ├── globals.css         # Global styles + Walker design tokens
│   │   ├── not-found.tsx       # 404 page
│   │   ├── about/page.tsx      # /about
│   │   ├── academics/page.tsx  # /academics
│   │   ├── admissions/page.tsx # /admissions
│   │   ├── arts/page.tsx       # /arts
│   │   ├── athletics/page.tsx  # /athletics
│   │   └── contact/page.tsx    # /contact
│   ├── components/             # React components
│   │   ├── layout/             # Global layout elements
│   │   │   ├── WalkHeader.tsx  # Navigation header with mega-menu
│   │   │   └── Footer.tsx      # Site footer
│   │   ├── sections/           # Large page sections
│   │   │   ├── HeroMasked.tsx      # SVG text-mask hero
│   │   │   └── StickySplitSection.tsx # Content + imagery split
│   │   ├── templates/          # Reusable page templates
│   │   │   ├── ContentPage.tsx     # Interior page wrapper
│   │   │   └── PageHero.tsx        # Interior page hero banner
│   │   └── ui/                 # Small reusable primitives
│   │       ├── Accordion.tsx
│   │       ├── Breadcrumbs.tsx
│   │       ├── Button.tsx
│   │       ├── Carousel.tsx
│   │       ├── CircularFAB.tsx
│   │       ├── GdprConsent.tsx
│   │       ├── PageTransition.tsx
│   │       ├── ScrollReveal.tsx
│   │       ├── SectionShell.tsx
│   │       └── SkeletonLoader.tsx
│   └── lib/                    # Utilities and configuration
│       ├── utils.ts            # cn(), clamp(), mapRange()
│       ├── gsap-config.ts      # GSAP plugin registration & defaults
│       ├── site-navigation.ts  # Navigation data structure
│       ├── image-loader.ts     # Next.js custom image loader
│       ├── form-validation.ts  # Form validation utilities
│       └── hooks/              # Custom React hooks
│           ├── useClipMask.ts
│           ├── useHorizontalScroll.ts   # + .test.ts
│           ├── useParallax.ts
│           ├── useScrollDirection.ts
│           └── useScrollProgress.ts
├── .gitignore                  # Ignored build artifacts
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and scripts
├── package-lock.json           # Locked dependency versions
├── vitest.config.ts            # Vitest test configuration
├── vitest.setup.ts             # Test setup file
├── playwright.config.ts        # Playwright E2E configuration
├── postcss.config.mjs          # PostCSS configuration (Tailwind)
├── eslint.config.mjs           # ESLint configuration
├── CLAUDE.md                   # Project instructions
├── README.md                   # Project documentation
├── AGENTS.md                   # Agent orchestration
├── walker-site.css             # Reference CSS from Walker School
├── walker-site-audit.md        # Walker School design audit
└── walker-*.html               # Walker School reference pages
```

## Directory Purposes

**src/app/**
- Purpose: Next.js App Router routing convention — files *are* routes
- Files → Routes: `page.tsx` → `/`, `about/page.tsx` → `/about`, `academics/page.tsx` → `/academics`
- Special files: `layout.tsx` (root wrapper), `globals.css` (global styles), `not-found.tsx` (404)
- All pages are Server Components by default (no `'use client'` directive)
- Homepage (`page.tsx`) is `'use client'` because it uses GSAP scroll-jacking and state

**src/components/layout/**
- Purpose: Global layout elements that appear on every page
- Contains: Header navigation (desktop mega-menu + mobile hamburger menu), Footer
- Size: Currently only `WalkHeader.tsx` (12,699 bytes / ~350 lines); Footer in template?
- Pattern: Stateless presentation, receive navigation data from `site-navigation.ts`

**src/components/sections/**
- Purpose: Large, self-contained page sections — high-level composition units
- Contains: Full-viewport hero, value carousel, sticky split sections, passions/divisions panels
- Size: 170-234 lines each (HeroMasked, StickySplitSection)
- Pattern: Accept content props, render complete section with internal layout and optional animation
- Note: Use `'use client'` only when GSAP hooks or state are required

**src/components/templates/**
- Purpose: Reusable page templates that combine layout + content wrapper
- Contains: `ContentPage` (wraps WalkHeader + Main + Footer), `PageHero`
- Pattern: Higher-order page scaffold — interior pages simply compose ContentPage with their content sections

**src/components/ui/**
- Purpose: Small, reusable UI primitives — the "atoms" of the design system
- Contains: 10 components (Button, Accordion, Carousel, Breadcrumbs, CircularFAB, GdprConsent, PageTransition, ScrollReveal, SectionShell, SkeletonLoader)
- Size: 479-3,186 lines; most under 1,000 bytes
- Pattern: Minimal props, Tailwind className extensibility, typed interfaces
- Usage: Import specific files (`@/components/ui/Button`), NOT barrel imports (`@/components/ui`)

**src/lib/**

**Purpose:** Shared utilities not tied to UI rendering
- `utils.ts`: `cn()` (Tailwind merge), `clamp()` (fluid typography), `mapRange()` (linear interpolation)
- `gsap-config.ts`: GSAP plugin registration (ScrollTrigger, Flip) + global defaults
- `site-navigation.ts`: Navigation data (`siteNavigation: NavItem[]`) and helper functions
- `image-loader.ts`: Next.js custom image loader for static export
- `form-validation.ts`: Client-side form validation utilities

**src/lib/hooks/**
- Purpose: Custom React hooks that encapsulate GSAP animations and scroll effects
- Each hook: `use<Topic>.ts`, follows pattern `(ref, options) => effect`
- Lifecycle: `useEffect` creates GSAP context, return cleanup reverts context
- Types: `useHorizontalScroll`, `useParallax`, `useScrollProgress`, `useClipMask`, `useScrollDirection`
- Test coverage: `useHorizontalScroll.test.ts` (existing), others not yet tested

**public/images/**
- Purpose: Static image assets served at `/images/*` URLs
- Content: Optimized WebP/PNG/JPEG files (Walker School reference imagery)
- Size: ~67 files, ~4MB total (includes logos, hero images, cutouts, campus photos)
- Naming: kebab-case with descriptive names (e.g., `videocover2-812-optimized.webp`, `athleticscutout-825.png`)
- Notes: Images prefixed with "optimized" are WebP; cutouts are PNG with transparency

**data/**
- Purpose: Static data files (JSON or TypeScript) — currently unused
- Current state: Empty directory; all data defined inline in `page.tsx` or `site-navigation.ts`
- Recommended future use: `data/homepage-sections.json`, `data/team.json`, `data/academics-curriculum.json`

## Key File Locations

### Entry Points

| File | Path | Purpose |
|---|---|---|
| Root Layout | `src/app/layout.tsx` | HTML wrapper, font loading, metadata, JSON-LD |
| Homepage | `src/app/page.tsx` | Full-page horizontal scroll hero + 8 content sections |
| Global Styles | `src/app/globals.css` | Walker design tokens, Tailwind, utility classes |

### Configuration Files

| File | Path | Purpose |
|---|---|---|
| Next.js Config | `next.config.ts` | `output: "export"`, `trailingSlash: true`, custom image loader |
| TypeScript Config | `tsconfig.json` | `"strict": true`, `target: "ES2017"`, path alias `@/*` → `src/*` |
| Package Manifest | `package.json` | Dependencies, scripts (dev, build, lint, test) |
| Vite Config | `vitest.config.ts` | Vitest with jsdom, coverage thresholds 80%, UI disabled |
| ESLint Config | `eslint.config.mjs` | Next.js core-web-vitals + TypeScript |
| PostCSS Config | `postcss.config.mjs` | Tailwind CSS PostCSS plugin |

### Core Logic

| File | Path | Purpose |
|---|---|---|
| Homepage Composition | `src/app/page.tsx` | 9-section horizontal scroll page; IMAGES/values/divisions data |
| Header | `src/components/layout/WalkHeader.tsx` | Ghost nav + desktop mega-menu + mobile hamburger menu |
| Hero | `src/components/sections/HeroMasked.tsx` | SVG text-mask with scale animation |
| Sticky Split | `src/components/sections/StickySplitSection.tsx` | 45:55 content+imagery, built-in accordion |
| Page Template | `src/components/templates/ContentPage.tsx` | Interior page wrapper (Header + Main + Footer) |
| Navigation Data | `src/lib/site-navigation.ts` | siteNavigation array + lookup helpers |
| GSAP Setup | `src/lib/gsap-config.ts` | Plugin registration, global defaults |
| Utilities | `src/lib/utils.ts` | `cn()`, `clamp()`, `mapRange()` |

### Testing

| File | Path | Purpose |
|---|---|---|
| Test Config | `vitest.config.ts` | jsdom environment, 80% coverage thresholds |
| E2E Config | `playwright.config.ts` | Playwright test runner setup |
| E2E Tests | `e2e/*.spec.ts` | Accessibility, mobile menu, navigation, scroll animations |

## Naming Conventions

### File Names
- **Components:** PascalCase — `HeroMasked.tsx`, `StickySplitSection.tsx`, `ValueCarousel.tsx`
- **Utilities:** camelCase — `utils.ts`, `gsap-config.ts`, `image-loader.ts`
- **Hooks:** camelCase with `use` prefix — `useHorizontalScroll.ts`, `useParallax.ts`, `useClipMask.ts`
- **Pages:** lowercase — `page.tsx`, `layout.tsx` (Next.js App Router convention)
- **Data:** camelCase for exports, SCREAMING_SNAKE_CASE for constant objects — `siteNavigation`, `IMAGES`

### Directories
- **Directories:** lowercase — `components/`, `sections/`, `ui/`, `lib/`, `hooks/`
- **No underscores** — use kebab-case if multi-word needed (not currently present)

### Exports

- **Component default export:** `export default function ComponentName()`
- **Named exports:** `export function utilityName()`, `export interface TypeName`, `export type AliasName`
- **Props interfaces:** `{ComponentName}Props` suffix — `ButtonProps`, `AccordionProps`, `StickySplitSectionProps`
- **Per-file style:** One component per file; named import preferred: `import { Button } from '@/components/ui/Button'`

### Variables
- **Local variables:** camelCase — `mobileOpen`, `activeIndex`, `scrollContainerRef`
- **Constants:** camelCase for configuration, SCREAMING_SNAKE_CASE for grouping data — `const IMAGES = { ... }`, `const values = [...]`
- **CSS custom properties:** kebab-case prefixed with `--` — `--color-primary-maroon`, `--font-montserrat`, `--section-padding-y`

### TypeScript Patterns
- **Interfaces:** PascalCase — `NavItem`, `AccordionItem`, `DivisionItem`, `ValueItem`
- **Type aliases:** PascalCase — `ButtonVariant`, `Metadata`
- **Union types:** `'primary' | 'outline' | 'ghost'`
- **Generics:** `useRef<HTMLDivElement>(null)`, `React.RefObject<HTMLDivElement | null>`

## Where to Add New Code

### New Page
```
src/app/{page-name}/page.tsx         # Interior page content
src/app/{page-name}/layout.tsx       # Optional page-specific layout
```
Example: `src/app/contact/page.tsx`

### New Section Component (Homepage or Interior)
```
src/components/sections/{SectionName}.tsx
```
Example: `src/components/sections/TestimonialsGrid.tsx` — then import where needed

### New UI Component (Primitive)
```
src/components/ui/{ComponentName}.tsx
```
Example: `src/components/ui/Card.tsx` — accepts minimal props, composable

### New Layout Component
```
src/components/layout/{ComponentName}.tsx
```
Example: `src/components/layout/Sidebar.tsx` — currently only WalkHeader and Footer exist

### New Custom Hook
```
src/lib/hooks/use{HookName}.ts
```
Example: `src/lib/hooks/useMediaQuery.ts` — for responsive logic, `useIntersectionObserver.ts` for scroll detection

### New Utility
```
src/lib/{utility-name}.ts
```
Example: `src/lib/date-utils.ts`, `src/lib/validation.ts`

### New Static Data
```
data/{content-name}.json             # JSON content
src/lib/{content-name}.ts            # TypeScript data module
```
Example: `data/team-members.json` or `src/lib/academics-curriculum.ts`

### New Static Asset
```
public/images/{image-name}.{ext}
```
Reference: `/images/{image-name}.{ext}` in components

## Special Directories

**node_modules/**
- Purpose: Installed npm dependencies
- Generated: Yes (`npm install`)
- Committed: No (`.gitignore`)

**.next/**
- Purpose: Next.js build cache, generated type definitions
- Generated: Yes (`next dev` or `next build`)
- Committed: No (`.gitignore`)

**out/**
- Purpose: Static export output — deployable HTML/CSS/JS
- Generated: Yes (`npm run build`)
- Committed: No (`.gitignore`)
- Deploy target: Copy contents to CDN or static host

**.planning/**
- Purpose: GSD planning artifacts and codebase analysis
- Generated: Yes (GSD commands)
- Committed: Yes (project documentation)
- Contains: `codebase/` (architecture docs), `phases/` (phase plans), `quick/` (quick-fix plans)

**public/**
- Purpose: Static assets served as-is
- Generated: No (manually add assets)
- Committed: Yes
- Maps to `/` root in static export

**scripts/**
- Purpose: Build-time utility scripts
- Generated: No (manually create)
- Committed: Yes
- Example: `scripts/optimize-images.js` — prebuild optimization

**e2e/**
- Purpose: Playwright end-to-end tests
- Generated: No (manually test)
- Committed: Yes
- Test files: `accessibility.spec.ts`, `mobile-menu.spec.ts`, `navigation.spec.ts`, `scroll-animations.spec.ts`

## Import Path Aliases

**`@/*` → `src/*`**

Configured in `tsconfig.json`:
```json
"paths": { "@/*": ["./src/*"] }
```

Usage:
```typescript
import { Button } from '@/components/ui/Button'     // → src/components/ui/Button.tsx
import { cn } from '@/lib/utils'                   // → src/lib/utils.ts
import { siteNavigation } from '@/lib/site-navigation' // → src/lib/site-navigation.ts
```

**No barrel files:** Import from specific component files, not from directory-level index. Each component file is its own barrel. Do NOT create `index.ts` files that re-export everything.

## Architecture Patterns

### Three-Tier Component Hierarchy

1. **UI Components** (`src/components/ui/`) — Atomic primitives
   - Small, highly reusable
   - Minimal required props
   - Maximum flexibility via `className` prop
   - Examples: Button, Accordion

2. **Section Components** (`src/components/sections/`) — Composition of UI primitives
   - Self-contained page sections
   - Accept content as typed props
   - May contain internal state and animation
   - Examples: HeroMasked, StickySplitSection

3. **Pages** (`src/app/`) — Top-level page composition
   - Import and compose sections
   - Define page-specific data inline
   - Minimal logic, mostly declarative composition
   - Example: `src/app/page.tsx`

**Data flow:** Page → Section → UI Component

### Server/Client Component Boundary

- **Server Components** (default): Pages without `'use client'`, no hooks, no browser APIs
- **Client Components** (`'use client'` at file top): Components that use:
  - React hooks (`useState`, `useEffect`, `useRef`)
  - Browser APIs (`window`, `document`)
  - Animation libraries (GSAP, Framer Motion)
  - Event listeners (`onClick`, `onScroll`)

**Current `'use client'` files:**
- `src/app/page.tsx` (horizontal scroll state + GSAP)
- `src/components/layout/WalkHeader.tsx` (state + Framer Motion + react-remove-scroll)
- `src/components/sections/HeroMasked.tsx` (GSAP timeline)
- `src/components/sections/StickySplitSection.tsx` (accordion state)
- `src/components/ui/Accordion.tsx` (Framer Motion + state)
- `src/components/ui/Carousel.tsx` (Embla requires client)
- `src/components/ui/CircularFAB.tsx` (click handler)
- `src/components/ui/GdprConsent.tsx` (cookie state)
- `src/components/ui/PageTransition.tsx` (Framer Motion)
- `src/components/ui/ScrollReveal.tsx` (GSAP + intersection observer)
- All hooks in `src/lib/hooks/` (browser/DOM access)

### Static vs Dynamic Data

**Static content (hardcoded):**
- Homepage image mappings (`const IMAGES`)
- Homepage values (4 cards) and divisions (5 grades)
- Interior page copy (Academics, Admissions, About pages)

**Future dynamic data:**
- Contact form submissions — Netlify Forms or third-party embed
- Blog/news — markdown or CMS integration
- Team directory — JSON data file

### Styling Strategy

- **Tailwind CSS v4** for layout → spacing → responsive breakpoints
- **CSS custom properties** for design tokens (colors, fonts, easing)
- **Component-level inline styles** (`style={{ ... }}`) only for dynamic values (e.g., computed colors based on props)
- **No external CSS files** except `globals.css`

### Animation Strategy

- **GSAP 3** + ScrollTrigger for scroll-driven animations (hero mask, horizontal scroll, parallax, sticky effects)
- **Framer Motion** for component-level transitions (header mega-menu dropdowns, mobile menu slides, accordion height)
- **Lenis** for smooth scroll (optional; not currently in use but dependency present)

---

*Structure analysis: 2026-04-28*
