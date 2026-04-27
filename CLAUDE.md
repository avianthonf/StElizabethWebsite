# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context
- **Project**: St. Elizabeth High School Pomburpa Website
- **Location**: https://maps.app.goo.gl/gdhRyZxKZQsh9Yf47
- **Design Inspiration**: The Walker School (https://www.thewalkerschool.org/) - Rebuilt from ASP.NET to modern React.

## Architecture & Structure
This is a modern **Next.js 14+ (App Router)** site configured for static export (`output: "export"`).
- `src/app/` - Next.js routing (pages, layouts)
- `src/components/ui/` - Small reusable UI elements (buttons, cards, etc.)
- `src/components/sections/` - Large page sections (Hero, Features, Footer, etc.)
- `src/components/layout/` - Global layout elements (Header, Navigation)
- `src/lib/` - Utility functions and helpers
- `data/` - Static JSON or TypeScript data defining the site content

### Tech Stack
- **Framework**: Next.js (Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Commands
- **Run dev server**: `npm run dev`
- **Build static export**: `npm run build` (outputs to `out/` directory)
- **Lint**: `npm run lint`

## Component Guidelines
- Use React Server Components by default. Add `'use client'` only where interactivity (state, hooks, event listeners) is required.
- Use immutable data patterns and ensure proper error handling per `.claude/rules/typescript/`.
- Style using Tailwind classes instead of custom CSS.

<!-- GSD:project-start source:PROJECT.md -->
## Project

**St. Elizabeth High School Website**

A pixel-perfect Walker School-inspired website for St. Elizabeth High School, Pomburpa (Goa, India). The site replicates the Walker School's scroll-driven animations, sticky multi-level mega-menu, horizontal scroll-jacking carousels, SVG text-mask heroes, and split sticky sections — adapted for St. Elizabeth branding and content. Built as a Next.js 14 static site with GSAP ScrollTrigger and SOP-001 design tokens.

**Core Value:** A visually impressive, Walker School-quality marketing site that demonstrates St. Elizabeth High School's identity — faith, excellence, service — with buttery-smooth scroll animations and professional design without requiring a full design team.

### Constraints

- **Tech stack**: Next.js 14 (App Router, static export) + Tailwind CSS v4 + GSAP 3.x + Framer Motion 11 — already chosen
- **Design fidelity**: Walker School visual patterns as template, St. Elizabeth branding layer on top
- **No backend**: Static site only — contact form can use third-party embed or Netlify Forms
- **Build target**: `npm run build` must succeed, static export to `out/`
<!-- GSD:project-end -->

<!-- GSD:stack-start source:codebase/STACK.md -->
## Technology Stack

## Languages
- TypeScript 5.x - All application code (components, pages, utilities)
- JavaScript (ES2017+) - Configuration files
- HTML - Static reference files from design inspiration
- CSS - Via Tailwind CSS utility classes
## Runtime
- Node.js v24.14.1
- npm 11.11.0
- Lockfile: `package-lock.json` (present)
## Frameworks
- Next.js 16.2.4 - React framework with App Router, configured for static export
- React 19.2.4 - UI library
- React DOM 19.2.4 - React renderer for web
- Not detected - No test framework configured
- Next.js built-in compiler - Development server and production build
- PostCSS - CSS processing via `@tailwindcss/postcss`
- ESLint 9.x - Code linting with Next.js config
## Key Dependencies
- next 16.2.4 - Framework providing routing, build system, and static export
- react 19.2.4 - Core UI library
- tailwindcss 4.x - Utility-first CSS framework
- typescript 5.x - Type safety and developer experience
- framer-motion 12.38.0 - Animation library for React components
- gsap 3.15.0 - Advanced animation platform
- lenis 1.3.23 - Smooth scroll library
- lucide-react 1.11.0 - Icon library
- embla-carousel-react 8.6.0 - Carousel/slider component
- clsx 2.1.1 - Conditional className utility
- tailwind-merge 3.5.0 - Merge Tailwind classes without conflicts
- next-seo 7.2.0 - SEO meta tag management for Next.js
- @tailwindcss/postcss 4.x - Tailwind CSS PostCSS plugin
- @types/node 20.x - TypeScript definitions for Node.js
- @types/react 19.x - TypeScript definitions for React
- @types/react-dom 19.x - TypeScript definitions for React DOM
## Configuration
- No `.env` files detected in repository
- Configuration managed through Next.js config and build-time settings
- `next.config.ts` - Next.js configuration (static export, image optimization disabled, trailing slashes)
- `tsconfig.json` - TypeScript compiler options (ES2017 target, strict mode, path aliases)
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS
- `eslint.config.mjs` - ESLint configuration with Next.js presets
## Platform Requirements
- Node.js 20.x or higher (currently using v24.14.1)
- npm 11.x or compatible package manager
- TypeScript-aware editor recommended
- Static hosting (Vercel, Netlify, GitHub Pages, or any static file server)
- No server-side runtime required (static export)
- CDN recommended for optimal performance
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

## Naming Patterns
- Components: PascalCase with descriptive names - `ValueCarousel.tsx`, `StickySplitSection.tsx`, `Header.tsx`
- Hooks: camelCase with `use` prefix - `useHorizontalScroll.ts`, `useScrollProgress.ts`, `useClipMask.ts`
- Utilities: camelCase - `utils.ts`, `site-navigation.ts`, `homepage-data.ts`
- Config files: kebab-case - `gsap-config.ts`
- Pages: lowercase - `page.tsx`, `layout.tsx` (Next.js App Router convention)
- Components: PascalCase - `ValueCarousel`, `Button`, `Accordion`
- Hooks: camelCase with `use` prefix - `useHorizontalScroll`, `useScrollProgress`
- Utilities: camelCase - `cn`, `clamp`, `mapRange`, `getNavItemByHref`, `getBreadcrumbs`
- Constants: camelCase for local, SCREAMING_SNAKE_CASE for image mappings - `const IMAGES = {...}`
- State variables: camelCase - `mobileOpen`, `openIndex`, `openSubmenu`
- Props: camelCase - `heroImage`, `leftImage`, `backgroundColor`
- Interfaces: PascalCase - `NavItem`, `AccordionItem`, `ValueItem`, `StickySplitSectionProps`
- Type aliases: PascalCase - `ButtonVariant`, `Metadata`
- Props interfaces: Component name + `Props` suffix - `ButtonProps`, `AccordionProps`, `ValueCarouselProps`
## Code Style
- No Prettier config detected - using default Next.js/ESLint formatting
- Indentation: 2 spaces (inferred from existing files)
- Semicolons: Present (TypeScript default)
- Quotes: Single quotes for imports, double quotes for JSX attributes
- Line length: No strict limit, but typically wraps around 100-120 characters
- Tool: ESLint 9 with Next.js config
- Config: `eslint.config.mjs` using `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignored paths: `.next/`, `out/`, `build/`, `next-env.d.ts`
## Import Organization
- `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- All internal imports use `@/` prefix - `@/components/ui/Button`, `@/lib/utils`, `@/lib/hooks/useHorizontalScroll`
## Error Handling
- Minimal explicit error handling in current codebase (early stage project)
- Type safety via TypeScript strict mode (`"strict": true` in `tsconfig.json`)
- Optional chaining used for nullable props - `item.href ?? '#'`, `values ?? defaultValues`
- Null checks for conditional rendering - `{leftImage && <img src={leftImage} />}`
## Logging
- No `console.log` statements found in production code (good practice)
- Development logging should be removed before commit
- Use `console.error` for error logging when needed
## Comments
- Component purpose and architecture - JSDoc-style block comments at component top
- Complex logic explanation - inline comments for GSAP animations, scroll calculations
- Section markers - `{/* SECTION 1: Hero */}` in page files
- Architecture notes - "Walker School pattern", "SOP-001 spec" references
- Used for utility functions - `@/lib/utils.ts` has JSDoc comments
- Used for exported functions - `getNavItemByHref`, `getBreadcrumbs` in `site-navigation.ts`
- Component props documented via TypeScript interfaces (self-documenting)
## Function Design
- Small focused functions preferred
- Component functions: 50-150 lines typical
- Inline helper components used for single-use cases - `PassionsPanel` in `page.tsx`
- Extract to separate file when reused across components
- Props via destructured interface - `function Button({ label, icon, href, variant, onClick, className }: ButtonProps)`
- Optional parameters with defaults - `variant = 'primary'`, `backgroundColor = 'white'`
- Nullable parameters with `?` - `icon?: React.ReactNode`, `leftImage?: string | null`
- React components return JSX
- Utility functions have explicit return types - `export function cn(...inputs: ClassValue[]): string`
- Hooks return typed values - `function useScrollProgress(): number`
## Module Design
- Named exports preferred - `export function Button()`, `export interface NavItem`
- Default exports for pages - `export default function Home()`, `export default function RootLayout()`
- Type exports use `export type` or `export interface`
- Not used - direct imports from specific files
- Pattern: `import { Button } from '@/components/ui/Button'` (not `from '@/components/ui'`)
## React Patterns
- Server components by default (Next.js 14+ App Router)
- Client components marked with `'use client'` directive at top of file
- Use `'use client'` for: state (`useState`), effects (`useEffect`), event handlers, browser APIs, animation libraries
- `src/components/layout/Header.tsx`
- `src/components/layout/WalkHeader.tsx`
- `src/components/sections/ValueCarousel.tsx`
- `src/components/sections/StickySplitSection.tsx`
- `src/components/sections/DivisionsTabs.tsx`
- `src/components/ui/Accordion.tsx`
- `src/components/ui/Carousel.tsx`
- All custom hooks in `src/lib/hooks/`
- Local component state with `useState` - `const [mobileOpen, setMobileOpen] = useState(false)`
- Refs for DOM access - `const containerRef = useRef<HTMLDivElement>(null)`
- No global state management (Redux, Zustand) - not needed for static site
- Tailwind CSS v4 for utility classes - `className="flex items-center gap-2"`
- Inline styles for dynamic/computed values - `style={{ backgroundColor: bg }}`
- CSS custom properties for theme values - `var(--color-primary-maroon)`, `var(--section-padding-y)`
- `cn()` utility for conditional classes - `cn(base, variants[variant], className)`
- Strict mode enabled
- Explicit prop types via interfaces
- Type imports with `import type` - `import type { Metadata } from "next"`
- Generic types for reusable components - `useRef<HTMLDivElement>(null)`
- Union types for variants - `type ButtonVariant = 'primary' | 'outline' | 'ghost'`
## File Organization
- Separate data from components - `src/lib/site-navigation.ts`, `src/lib/homepage-data.ts`
- Export typed data structures - `export const siteNavigation: NavItem[]`
- Include helper functions with data - `getNavItemByHref`, `getBreadcrumbs`
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

## Pattern Overview
- Next.js 14+ App Router configured for static export (`output: "export"`)
- Server Components by default, Client Components only where interactivity is required
- Data-driven content pattern with inline data definitions
- Animation-heavy UI using GSAP, Framer Motion, and Lenis smooth scroll
- Design system based on CSS custom properties (Walker School design tokens)
## Layers
- Purpose: Renders UI and handles user interactions
- Location: `src/app/`, `src/components/`
- Contains: Pages, layouts, React components
- Depends on: Component library, utility functions, custom hooks
- Used by: End users via static HTML/CSS/JS bundle
- Purpose: Reusable UI building blocks organized by scope
- Location: `src/components/`
- Contains: Three component categories (layout, sections, ui)
- Depends on: UI primitives, custom hooks, utilities
- Used by: Pages and other components
- Purpose: Shared functions, hooks, and configuration
- Location: `src/lib/`
- Contains: Custom hooks, utility functions, data definitions, GSAP config
- Depends on: External libraries (clsx, tailwind-merge, gsap)
- Used by: All components requiring shared logic
- Purpose: Static files served directly
- Location: `public/images/`
- Contains: Optimized images (WebP, PNG)
- Depends on: Nothing
- Used by: Components via `/images/` paths
## Data Flow
- Local component state using React `useState` for tabs, accordions, carousels
- No global state management (Redux, Zustand, etc.)
- Animation state managed by GSAP timelines
## Key Abstractions
- Purpose: Large, self-contained page sections (hero, carousel, tabs, etc.)
- Examples: `src/components/sections/HeroMasked.tsx`, `src/components/sections/ValueCarousel.tsx`, `src/components/sections/StickySplitSection.tsx`
- Pattern: Accept props for content, render complete section with internal layout
- Purpose: Small, reusable primitives (buttons, accordions, carousels)
- Examples: `src/components/ui/Button.tsx`, `src/components/ui/Accordion.tsx`, `src/components/ui/Carousel.tsx`
- Pattern: Minimal, composable, accept className for customization
- Purpose: Global layout elements (header, footer, navigation)
- Examples: `src/components/layout/WalkHeader.tsx`, `src/components/layout/Footer.tsx`
- Pattern: Persistent across pages, contain navigation and branding
- Purpose: Encapsulate animation and scroll logic
- Examples: `src/lib/hooks/useHorizontalScroll.ts`, `src/lib/hooks/useClipMask.ts`, `src/lib/hooks/useParallax.ts`
- Pattern: Accept refs, initialize GSAP effects, clean up on unmount
## Entry Points
- Location: `src/app/layout.tsx`
- Triggers: Next.js build process
- Responsibilities: Load Google Fonts (Inter, Playfair Display, Montserrat), set HTML lang, apply font CSS variables, define metadata
- Location: `src/app/page.tsx`
- Triggers: User navigates to `/` or build process
- Responsibilities: Compose homepage from section components, define inline image mappings, pass data to sections
- Location: `src/app/globals.css`
- Triggers: Imported by `src/app/layout.tsx`
- Responsibilities: Define CSS custom properties (design tokens), import Tailwind, define typography utility classes
## Error Handling
- TypeScript strict mode catches type errors at build time
- Next.js build fails if components have syntax errors
- No runtime error boundaries (not needed for static content)
- Image paths validated at build time (404 if missing)
## Cross-Cutting Concerns
- Semantic HTML elements
- ARIA labels on interactive elements (buttons, links)
- Keyboard navigation support (native browser behavior)
- Color contrast follows WCAG 2.1 AAA (defined in CSS custom properties)
- Static export eliminates server response time
- Images unoptimized (Next.js Image optimization disabled for static export)
- GSAP animations use `will-change` and GPU-accelerated transforms
- Lenis smooth scroll for 60fps scrolling
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, or `.github/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->

<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
