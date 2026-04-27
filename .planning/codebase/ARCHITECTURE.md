# Architecture

**Analysis Date:** 2026-04-27

## Pattern Overview

**Overall:** Static Site Generation (SSG) with Component-Based Architecture

**Key Characteristics:**
- Next.js 14+ App Router configured for static export (`output: "export"`)
- Server Components by default, Client Components only where interactivity is required
- Data-driven content pattern with inline data definitions
- Animation-heavy UI using GSAP, Framer Motion, and Lenis smooth scroll
- Design system based on CSS custom properties (Walker School design tokens)

## Layers

**Presentation Layer:**
- Purpose: Renders UI and handles user interactions
- Location: `src/app/`, `src/components/`
- Contains: Pages, layouts, React components
- Depends on: Component library, utility functions, custom hooks
- Used by: End users via static HTML/CSS/JS bundle

**Component Layer:**
- Purpose: Reusable UI building blocks organized by scope
- Location: `src/components/`
- Contains: Three component categories (layout, sections, ui)
- Depends on: UI primitives, custom hooks, utilities
- Used by: Pages and other components

**Utility Layer:**
- Purpose: Shared functions, hooks, and configuration
- Location: `src/lib/`
- Contains: Custom hooks, utility functions, data definitions, GSAP config
- Depends on: External libraries (clsx, tailwind-merge, gsap)
- Used by: All components requiring shared logic

**Asset Layer:**
- Purpose: Static files served directly
- Location: `public/images/`
- Contains: Optimized images (WebP, PNG)
- Depends on: Nothing
- Used by: Components via `/images/` paths

## Data Flow

**Static Page Rendering:**

1. Next.js reads `src/app/page.tsx` at build time
2. Page imports section components from `src/components/sections/`
3. Inline data (IMAGES object, props) is passed to components
4. Components render with data, applying Tailwind classes and CSS custom properties
5. Static HTML is generated to `out/` directory

**Client-Side Interactivity:**

1. User scrolls or interacts with page
2. Client Components (marked `'use client'`) hydrate in browser
3. Custom hooks (`useHorizontalScroll`, `useClipMask`, etc.) initialize GSAP animations
4. GSAP ScrollTrigger links scroll position to animation progress
5. DOM updates reflect animation state

**State Management:**
- Local component state using React `useState` for tabs, accordions, carousels
- No global state management (Redux, Zustand, etc.)
- Animation state managed by GSAP timelines

## Key Abstractions

**Section Components:**
- Purpose: Large, self-contained page sections (hero, carousel, tabs, etc.)
- Examples: `src/components/sections/HeroMasked.tsx`, `src/components/sections/ValueCarousel.tsx`, `src/components/sections/StickySplitSection.tsx`
- Pattern: Accept props for content, render complete section with internal layout

**UI Components:**
- Purpose: Small, reusable primitives (buttons, accordions, carousels)
- Examples: `src/components/ui/Button.tsx`, `src/components/ui/Accordion.tsx`, `src/components/ui/Carousel.tsx`
- Pattern: Minimal, composable, accept className for customization

**Layout Components:**
- Purpose: Global layout elements (header, footer, navigation)
- Examples: `src/components/layout/WalkHeader.tsx`, `src/components/layout/Footer.tsx`
- Pattern: Persistent across pages, contain navigation and branding

**Custom Hooks:**
- Purpose: Encapsulate animation and scroll logic
- Examples: `src/lib/hooks/useHorizontalScroll.ts`, `src/lib/hooks/useClipMask.ts`, `src/lib/hooks/useParallax.ts`
- Pattern: Accept refs, initialize GSAP effects, clean up on unmount

## Entry Points

**Root Layout:**
- Location: `src/app/layout.tsx`
- Triggers: Next.js build process
- Responsibilities: Load Google Fonts (Inter, Playfair Display, Montserrat), set HTML lang, apply font CSS variables, define metadata

**Home Page:**
- Location: `src/app/page.tsx`
- Triggers: User navigates to `/` or build process
- Responsibilities: Compose homepage from section components, define inline image mappings, pass data to sections

**Global Styles:**
- Location: `src/app/globals.css`
- Triggers: Imported by `src/app/layout.tsx`
- Responsibilities: Define CSS custom properties (design tokens), import Tailwind, define typography utility classes

## Error Handling

**Strategy:** Minimal error handling (static site with no server-side logic)

**Patterns:**
- TypeScript strict mode catches type errors at build time
- Next.js build fails if components have syntax errors
- No runtime error boundaries (not needed for static content)
- Image paths validated at build time (404 if missing)

## Cross-Cutting Concerns

**Logging:** None (static site, no server logs)

**Validation:** TypeScript type checking at build time, no runtime validation

**Authentication:** Not applicable (public static site)

**Accessibility:** 
- Semantic HTML elements
- ARIA labels on interactive elements (buttons, links)
- Keyboard navigation support (native browser behavior)
- Color contrast follows WCAG 2.1 AAA (defined in CSS custom properties)

**Performance:**
- Static export eliminates server response time
- Images unoptimized (Next.js Image optimization disabled for static export)
- GSAP animations use `will-change` and GPU-accelerated transforms
- Lenis smooth scroll for 60fps scrolling

---

*Architecture analysis: 2026-04-27*
