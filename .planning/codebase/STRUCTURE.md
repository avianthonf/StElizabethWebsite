# Codebase Structure

**Analysis Date:** 2026-04-27

## Directory Layout

```
st-elizabeth-website/
├── .claude/                # Claude Code configuration
├── .git/                   # Git repository
├── .next/                  # Next.js build cache (generated)
├── .planning/              # GSD planning documents
│   └── codebase/           # Codebase analysis documents
├── data/                   # Static data files (currently empty)
├── node_modules/           # Dependencies (generated)
├── out/                    # Static export output (generated)
├── public/                 # Static assets
│   └── images/             # Optimized images (WebP, PNG)
├── src/                    # Source code
│   ├── app/                # Next.js App Router pages
│   ├── components/         # React components
│   │   ├── layout/         # Global layout components
│   │   ├── sections/       # Large page sections
│   │   └── ui/             # Small reusable UI primitives
│   └── lib/                # Utilities and hooks
│       └── hooks/          # Custom React hooks
├── CLAUDE.md               # Project instructions for Claude
├── next.config.ts          # Next.js configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── tailwind.config.ts      # Tailwind CSS configuration (implicit)
```

## Directory Purposes

**src/app/**
- Purpose: Next.js App Router pages and layouts
- Contains: `page.tsx` (homepage), `layout.tsx` (root layout), `globals.css` (global styles), `favicon.ico`
- Key files: `src/app/page.tsx` (homepage entry point), `src/app/layout.tsx` (HTML wrapper, font loading)

**src/components/layout/**
- Purpose: Persistent layout elements across pages
- Contains: Header variants, Footer
- Key files: `src/components/layout/WalkHeader.tsx` (main navigation), `src/components/layout/Footer.tsx` (site footer)

**src/components/sections/**
- Purpose: Large, self-contained page sections
- Contains: Hero sections, carousels, tabs, split layouts, CTAs
- Key files: 
  - `src/components/sections/HeroMasked.tsx` (hero with clip-path animation)
  - `src/components/sections/ValueCarousel.tsx` (horizontal scroll carousel)
  - `src/components/sections/StickySplitSection.tsx` (sticky left, scrolling right)
  - `src/components/sections/DivisionsTabs.tsx` (tabbed content showcase)
  - `src/components/sections/FooterCtaSection.tsx` (final CTA section)

**src/components/ui/**
- Purpose: Small, reusable UI primitives
- Contains: Buttons, accordions, carousels, FABs, animations
- Key files:
  - `src/components/ui/Button.tsx` (primary button with hover animation)
  - `src/components/ui/Accordion.tsx` (expandable content)
  - `src/components/ui/Carousel.tsx` (Embla carousel wrapper)
  - `src/components/ui/ScrollReveal.tsx` (scroll-triggered animations)

**src/lib/**
- Purpose: Shared utilities, hooks, and configuration
- Contains: Utility functions, custom hooks, data definitions, GSAP config
- Key files:
  - `src/lib/utils.ts` (cn, clamp, mapRange utilities)
  - `src/lib/gsap-config.ts` (GSAP registration and setup)
  - `src/lib/homepage-data.ts` (homepage content data)
  - `src/lib/site-navigation.ts` (navigation structure)

**src/lib/hooks/**
- Purpose: Custom React hooks for animations and interactions
- Contains: GSAP animation hooks, scroll hooks
- Key files:
  - `src/lib/hooks/useHorizontalScroll.ts` (horizontal scroll animation)
  - `src/lib/hooks/useClipMask.ts` (clip-path reveal animation)
  - `src/lib/hooks/useParallax.ts` (parallax scroll effect)
  - `src/lib/hooks/useScrollDirection.ts` (detect scroll direction)

**public/images/**
- Purpose: Static image assets
- Contains: Optimized WebP and PNG images from Walker School reference
- Key files: All images referenced via `/images/` paths in components

**data/**
- Purpose: Static JSON or TypeScript data files
- Contains: Currently empty (data defined inline in components)
- Key files: None yet

## Key File Locations

**Entry Points:**
- `src/app/page.tsx`: Homepage (composes all sections)
- `src/app/layout.tsx`: Root layout (fonts, metadata, HTML wrapper)

**Configuration:**
- `next.config.ts`: Next.js config (static export, image optimization disabled)
- `tsconfig.json`: TypeScript config (strict mode, path aliases `@/*`)
- `package.json`: Dependencies and scripts
- `eslint.config.mjs`: ESLint configuration
- `postcss.config.mjs`: PostCSS configuration (Tailwind)

**Core Logic:**
- `src/app/page.tsx`: Homepage composition and data
- `src/components/sections/*.tsx`: Section implementations
- `src/lib/hooks/*.ts`: Animation and interaction logic

**Testing:**
- Not detected (no test files present)

## Naming Conventions

**Files:**
- Components: PascalCase (e.g., `HeroMasked.tsx`, `ValueCarousel.tsx`)
- Utilities: camelCase (e.g., `utils.ts`, `gsap-config.ts`)
- Hooks: camelCase with `use` prefix (e.g., `useHorizontalScroll.ts`)
- Pages: lowercase (e.g., `page.tsx`, `layout.tsx`)
- Data: kebab-case (e.g., `homepage-data.ts`, `site-navigation.ts`)

**Directories:**
- Lowercase, hyphenated if multi-word (e.g., `components/`, `lib/`, `public/`)

**Components:**
- Exported function name matches filename (e.g., `export function HeroMasked` in `HeroMasked.tsx`)
- Props interfaces named `{ComponentName}Props` (e.g., `ValueCarouselProps`)

**Variables:**
- camelCase for local variables and functions
- SCREAMING_SNAKE_CASE for constants (e.g., `IMAGES` object in `page.tsx`)
- CSS custom properties: kebab-case with `--` prefix (e.g., `--color-primary-maroon`)

## Where to Add New Code

**New Page:**
- Primary code: `src/app/{page-name}/page.tsx`
- Layout (if needed): `src/app/{page-name}/layout.tsx`
- Example: `src/app/about/page.tsx` for `/about` route

**New Section Component:**
- Implementation: `src/components/sections/{SectionName}.tsx`
- Import in page: `import { SectionName } from '@/components/sections/{SectionName}'`
- Example: `src/components/sections/TestimonialsGrid.tsx`

**New UI Component:**
- Implementation: `src/components/ui/{ComponentName}.tsx`
- Import where needed: `import { ComponentName } from '@/components/ui/{ComponentName}'`
- Example: `src/components/ui/Card.tsx`

**New Layout Component:**
- Implementation: `src/components/layout/{ComponentName}.tsx`
- Import in layout or page: `import { ComponentName } from '@/components/layout/{ComponentName}'`
- Example: `src/components/layout/Sidebar.tsx`

**New Custom Hook:**
- Implementation: `src/lib/hooks/{useSomething}.ts`
- Import in component: `import { useSomething } from '@/lib/hooks/{useSomething}'`
- Example: `src/lib/hooks/useMediaQuery.ts`

**Utilities:**
- Shared helpers: `src/lib/utils.ts` (add to existing file)
- New utility module: `src/lib/{utility-name}.ts`
- Example: `src/lib/date-utils.ts`

**Static Data:**
- Content data: `data/{content-name}.json` or `src/lib/{content-name}.ts`
- Example: `data/team-members.json` or `src/lib/team-data.ts`

**Images:**
- Add to: `public/images/{image-name}.{ext}`
- Reference as: `/images/{image-name}.{ext}`
- Example: `public/images/campus-aerial.webp` → `/images/campus-aerial.webp`

## Special Directories

**.next/**
- Purpose: Next.js build cache and type definitions
- Generated: Yes (by `npm run dev` or `npm run build`)
- Committed: No (in `.gitignore`)

**out/**
- Purpose: Static export output (deployable site)
- Generated: Yes (by `npm run build`)
- Committed: No (in `.gitignore`)

**node_modules/**
- Purpose: Installed npm dependencies
- Generated: Yes (by `npm install`)
- Committed: No (in `.gitignore`)

**.planning/**
- Purpose: GSD planning and codebase analysis documents
- Generated: Yes (by GSD commands)
- Committed: Yes (project documentation)

**data/**
- Purpose: Static content data (JSON or TypeScript)
- Generated: No (manually created)
- Committed: Yes
- Note: Currently empty; data is defined inline in components

## Import Path Aliases

**@/***
- Maps to: `src/*`
- Example: `import { Button } from '@/components/ui/Button'` resolves to `src/components/ui/Button.tsx`
- Configured in: `tsconfig.json` (`paths: { "@/*": ["./src/*"] }`)

## Component Organization Pattern

**Three-tier component hierarchy:**

1. **UI Components** (`src/components/ui/`)
   - Smallest building blocks
   - Highly reusable across sections
   - Minimal props, maximum flexibility
   - Examples: Button, Accordion, Carousel

2. **Section Components** (`src/components/sections/`)
   - Compose UI components into page sections
   - Accept content as props
   - Self-contained layout and styling
   - Examples: HeroMasked, ValueCarousel, StickySplitSection

3. **Pages** (`src/app/`)
   - Compose section components into full pages
   - Define page-specific data
   - Minimal logic (mostly composition)
   - Examples: `page.tsx` (homepage)

**Data flow:** Page → Section → UI Component

---

*Structure analysis: 2026-04-27*
