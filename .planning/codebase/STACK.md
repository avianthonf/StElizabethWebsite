# Technology Stack

**Analysis Date:** 2026-04-27

## Languages

**Primary:**
- TypeScript 5.x - All application code (components, pages, utilities)
- JavaScript (ES2017+) - Configuration files

**Secondary:**
- HTML - Static reference files from design inspiration
- CSS - Via Tailwind CSS utility classes

## Runtime

**Environment:**
- Node.js v24.14.1

**Package Manager:**
- npm 11.11.0
- Lockfile: `package-lock.json` (present)

## Frameworks

**Core:**
- Next.js 16.2.4 - React framework with App Router, configured for static export
- React 19.2.4 - UI library
- React DOM 19.2.4 - React renderer for web

**Testing:**
- Not detected - No test framework configured

**Build/Dev:**
- Next.js built-in compiler - Development server and production build
- PostCSS - CSS processing via `@tailwindcss/postcss`
- ESLint 9.x - Code linting with Next.js config

## Key Dependencies

**Critical:**
- next 16.2.4 - Framework providing routing, build system, and static export
- react 19.2.4 - Core UI library
- tailwindcss 4.x - Utility-first CSS framework
- typescript 5.x - Type safety and developer experience

**UI & Animation:**
- framer-motion 12.38.0 - Animation library for React components
- gsap 3.15.0 - Advanced animation platform
- lenis 1.3.23 - Smooth scroll library
- lucide-react 1.11.0 - Icon library
- embla-carousel-react 8.6.0 - Carousel/slider component

**Utilities:**
- clsx 2.1.1 - Conditional className utility
- tailwind-merge 3.5.0 - Merge Tailwind classes without conflicts
- next-seo 7.2.0 - SEO meta tag management for Next.js

**Infrastructure:**
- @tailwindcss/postcss 4.x - Tailwind CSS PostCSS plugin
- @types/node 20.x - TypeScript definitions for Node.js
- @types/react 19.x - TypeScript definitions for React
- @types/react-dom 19.x - TypeScript definitions for React DOM

## Configuration

**Environment:**
- No `.env` files detected in repository
- Configuration managed through Next.js config and build-time settings

**Build:**
- `next.config.ts` - Next.js configuration (static export, image optimization disabled, trailing slashes)
- `tsconfig.json` - TypeScript compiler options (ES2017 target, strict mode, path aliases)
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS
- `eslint.config.mjs` - ESLint configuration with Next.js presets

## Platform Requirements

**Development:**
- Node.js 20.x or higher (currently using v24.14.1)
- npm 11.x or compatible package manager
- TypeScript-aware editor recommended

**Production:**
- Static hosting (Vercel, Netlify, GitHub Pages, or any static file server)
- No server-side runtime required (static export)
- CDN recommended for optimal performance

---

*Stack analysis: 2026-04-27*
