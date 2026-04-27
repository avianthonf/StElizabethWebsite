# St. Elizabeth High School Website

## What This Is

A pixel-perfect Walker School-inspired website for St. Elizabeth High School, Pomburpa (Goa, India). The site replicates the Walker School's scroll-driven animations, sticky multi-level mega-menu, horizontal scroll-jacking carousels, SVG text-mask heroes, and split sticky sections — adapted for St. Elizabeth branding and content. Built as a Next.js 14 static site with GSAP ScrollTrigger and SOP-001 design tokens.

## Core Value

A visually impressive, Walker School-quality marketing site that demonstrates St. Elizabeth High School's identity — faith, excellence, service — with buttery-smooth scroll animations and professional design without requiring a full design team.

## Requirements

### Validated

- ✓ Next.js 14 static export scaffold — existing
- ✓ Tailwind CSS v4 + SOP-001 design tokens — existing
- ✓ GSAP 3.x + ScrollTrigger integration — existing
- ✓ WalkHeader ghost nav with mega-menu — existing
- ✓ HeroMasked "WE BELIEVE" SVG clip-path hero — existing
- ✓ ValueCarousel horizontal scroll-jacking carousel — existing
- ✓ StickySplitSection with parallax right column — existing
- ✓ DivisionsTabs synchronized tab slider — existing
- ✓ FooterCtaSection with aerial video background — existing

### Active

- [ ] Replace Walker School copy/branding with St. Elizabeth content
- [ ] Add contact/inquiry form (admissions)
- [ ] Add interior page templates (About, Admissions, Academics)
- [ ] Add GSAP resize handler for horizontal scroll carousel
- [ ] Add mobile scroll-lock fix for iOS Safari
- [ ] Add image lazy loading with Next.js Image
- [ ] Add accessibility audit (WCAG 2.1)
- [ ] Write unit tests for GSAP hooks and utilities
- [ ] Write E2E tests for critical user flows
- [ ] Update README with St. Elizabeth setup instructions

### Out of Scope

- GSAP commercial license migration — defer unless required
- Headless CMS integration — defer to v2
- Internationalization (Konkani/Hindi) — defer to v2
- React 19 upgrade until stable — defer
- Backend / database — static site only

## Context

**Reference site:** The Walker School (thewalkerschool.org) — ASP.NET rebuilt to React. Design system uses SOP-001 with `#6C1F35` burgundy/maroon, fluid `clamp()` typography (Montserrat 900wt headings), GSAP `scrub: 1` physics, SVG text-mask clip-paths, 45:55 sticky split layouts, and horizontal scroll-jacking pinned sections.

**Current state:** Full Walker-inspired homepage shell implemented with GSAP-powered components. Content and branding still use Walker School copy and placeholder images. `CLAUDE.md` and `.planning/codebase/` mapping completed.

**Reference docs:**
- `.planning/codebase/STACK.md` — tech stack and dependencies
- `.planning/codebase/ARCHITECTURE.md` — component architecture and data flow
- `.planning/codebase/CONCERNS.md` — known tech debt and issues

## Constraints

- **Tech stack**: Next.js 14 (App Router, static export) + Tailwind CSS v4 + GSAP 3.x + Framer Motion 11 — already chosen
- **Design fidelity**: Walker School visual patterns as template, St. Elizabeth branding layer on top
- **No backend**: Static site only — contact form can use third-party embed or Netlify Forms
- **Build target**: `npm run build` must succeed, static export to `out/`

## Key Decisions

| Decision | Rationale | Outcome |
|---------|-----------|---------|
| GSAP + Framer Motion hybrid | GSAP for scroll-linked physics (scrub, pinning), Framer Motion for discrete UI transitions (accordion, tabs, mobile overlay) | ✓ Good |
| Exclude Lenis smooth scroll | Avoids double-smoothing conflict with GSAP ScrollTrigger scrub | ✓ Good |
| SVG text clip-path for hero mask | Text shape acts as clipPath revealing background on scroll | ✓ Good |
| `scrub: 1` lag | 1-second lag creates buttery weighty feel | ✓ Good |
| SOP-001 CSS design tokens | Single source of truth for colors, fonts, easing | ✓ Good |
| TypeScript with `'use client'` isolation | GSAP animations require client; SSR for initial DOM (SEO) | ✓ Good |

---
*Last updated: 2026-04-27 after project initialization*
