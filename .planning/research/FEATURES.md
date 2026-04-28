# Feature Landscape: Premium School Marketing Website

**Domain:** Independent school static marketing site (Walker School-canonical patterns)
**Researched:** 2026-04-28
**Reference Fidelity Target:** The Walker School (thewalkerschool.org) — pixel-accurate clone
**Confidence:** HIGH — based on codebase audit, Walker pattern analysis, and industry best practices

---

## Executive Summary

The St. Elizabeth website is a **fidelity-first clone project** where success is measured by how closely the implementation matches The Walker School's visual language, interaction patterns, and perceived polish. Unlike generic school sites that invent their own design, this project must **reproduce a specific existing canon** (Walker SOP-001/Blueprint patterns) while substituting St. Elizabeth branding and content.

This creates a binary feature categorization:

| Category | Definition | Success Criteria |
|----------|------------|------------------|
| **Table Stakes** | Features present in Walker reference that MUST be reproduced for fidelity to pass | Missing = project fails its primary goal |
| **Differentiators** | Polish, edge-case handling, and production-hardening beyond the visible design | Missing = site works but feels "cheap" or fragile |
| **Anti-Features** | Explicitly out of scope (backend, CMS, custom features not in reference) | Building = wasted effort, scope creep |

All features below are grounded in the existing codebase patterns and Walker School visual canon already implemented or clearly specified in architecture documents.

---

## Table Stakes (Must-Have for Fidelity)

These features are **present in The Walker School website** and are **non-negotiable** for pixel-perfect clone success. Omission means the project does not meet its core requirement.

### Navigation & Information Architecture

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Ghost Nav Header** — Transparent at page top, solid white + shadow on scroll | Walker signature pattern; establishes visual hierarchy | Medium | Transparent state shows background video; solid state after 10% vertical scroll OR 5% horizontal scroll progress |
| **Multi-Level Mega-Menu** — Hover dropdowns with nested children | Walker uses extensive 6-top-level nav × 7 sub-items (42 pages) | Medium-High | Desktop: Framer Motion animated fade-in; Mobile: full-screen overlay; Z-index management critical |
| **Mobile Full-Screen Menu** — Hamburger → X transition, full-screen overlay | Walker mobile pattern; essential for responsive parity | Low-Medium | `react-remove-scroll` prevents body scroll; ease-in-out-quint animation (0.4s); nested accordions for sub-menus |
| **6 Top-Level Navigation Items** — About Us, Academics, Admissions, Student Life, Community, Contact | Walker's exact 6-item nav structure | Low | Each has 4–7 children; must match Walker's breadth and labeling conventions |
| **Sticky/Adaptive Header** — Remains fixed; transitions state on scroll | Standard premium site pattern; prevents navigation loss | Low | `position: fixed; z-[9999]`; state change triggers at scroll thresholds |

### Homepage Hero & Scroll Choreography

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **SVG Text-Mask Hero** — "WE BELIEVE" (or school-appropriate phrase) masking video background | Walker's signature animated hero; defines entire site tone | **Very High** | SVG mask reveals video only through text; mask scales from 60× down to 1× during first 12% horizontal scroll; white wall fades to dark overlay |
| **Horizontal Scroll-Jacking** — Vertical scroll drives horizontal track movement (9 sections) | Walker's core navigation metaphor; replaces traditional vertical scroll | **Very High** | Container height = `travelDistance + viewportHeight × 2`; `scrub: 1.2` (premium lag); `pin: true`; `anticipatePin: 1` |
| **Scroll-Progress Event Bus** — Parent dispatches `horizontal-scroll-progress` and `horizontal-scroll-hero` custom events | Enables child sections to react to scroll without nested ScrollTriggers | Medium | Prevents nested pin conflicts; used by HeroMasked, WalkHeader |
| **9 Full-Viewport Sections** — Each section exactly 100vh × 100vw (horizontal strip) | Walker homepage structure of 9 distinct panels | Medium | Sections: Hero, We Value, Accolades, Mission, Athletics, Arts, Academics, Divisions Tabs, Footer CTA |
| **Skeleton Loader During Hydration** — Staggered placeholder before client mount | Prevents content flash; matches Walker perceived performance | Low | Shows 1–2 section skeleton while `useEffect` sets `mounted=true` |

### Content Display Patterns

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Sticky Split Section (45:55)** — Left content column + right staggered image collage | Walker's primary content layout for interior pages | Medium | Left: overline, heading, body, accordion; Right: 4 images in stepped grid; `backgroundColor` prop accepts `white`/`light`/`dark`/`maroon` |
| **Accordion FAQ Panels** — Framer Motion height animation, ease-in-out-quint | Walker uses expandable details to manage content density | Low | `Accordion` component: `AnimatePresence` with `height: 0 → auto`; chevron rotates 180°; single-open behavior |
| **Value Card Grid (We Value)** — 4-card grid with numbered overlay (01–04), image, title, description, "Learn More" link | Walker's values showcase pattern (Faith, Excellence, Service, Community) | Low | `display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`; number in large serif at negative offset |
| **Passions Panel (Full-Viewport)** — Alternating color background with cutout image left/right | Walker's "Discover Your Passions" alternating full-screen panels | Medium | Background color toggles (maroon/white/dark); image positioned left or right via `imagePosition` prop; subtle drop shadow on cutouts |
| **Divisions Tabs (Horizontal)** — Grade-level selector (8–12) with tab buttons + content area | Walker admissions/academics grade selector pattern | Low-Medium | Stateful tabs; left column is vertical button list; right shows heading, description, image, CTA |
| **Footer CTA Full-Bleed** — Full-viewport aerial image + dark overlay + centered h2 + CTA button | Walker's "Begin Your Journey" terminal panel | Medium | Background image with `rgba(0,0,0,0.45)` overlay; enormous heading (`clamp(3rem, 10vw, 10rem)`); white primary button |

### Typography & Visual Language

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Walker Fluid Typography Scale** — `clamp()`-based responsive font sizes (no media queries for type) | Walker's signature typography system (SOP-001) | Low | `.walker-heading`: `clamp(2rem, 4vw, 4.5rem)`; `.walker-body`: `1.25rem / 1.6`; uppercase tracking-wide for labels |
| **Three-Font System** — Montserrat (headings), Inter (body), Playfair Display (display) | Walker brand font stack | Low | CSS variables: `--font-heading`, `--font-body`, `--font-display` |
| **WCAG 2.1 AAA Color Contrast** — Maroon #6C1F35, dark text, off-white backgrounds | Walker accessibility baseline; legal compliance | Medium | Must audit all color combinations with axe-core or Lighthouse; gray text requires on-white only |
| **Walker Easing Tokens** — `cubic-bezier(0.19,1,0.22,1)` (expo-out), `cubic-bezier(0.83,0,0.17,1)` (in-out-quint), `cubic-bezier(0.25,1,0.5,1)` (smooth) | Walker animation spec (SOP-001); defines premium feel | Low | Applied to GSAP `ease` and Framer Motion `transition` props; all animations use these 3 curves only |

### Animation Engine

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **GSAP 3.x + ScrollTrigger** — All scroll-based animations | Walker's animation stack; industry benchmark quality | High | `scrub` values sacred (Hero: 1.2, horizontal carousel: 1.5); `pin: true` + `anticipatePin: 1`; `invalidateOnRefresh: true` |
| **Framer Motion 12.x** — Menu dropdowns, mobile overlay, accordion, page transitions | Walker uses FM for UI state transitions (not GSAP) | Medium | `AnimatePresence` for enter/exit; `initial/animate/exit` keys; `transition.duration: 0.25–0.4s` with Walker easing |
| **Parallax Effects** — Depth layering on image grids | Walker visual depth technique | Low-Medium | `useParallax` hook: `speed` prop (0.4 = subtle, 0.8 = pronounced); `scrub: true` |
| **Marquee/Infinite Scroll (if present on Walker)** — Horizontal text/logo ticker | Common on premium school sites | TBD | Not currently in codebase; would require `overflow-x: auto` with `animation: scroll 30s linear infinite` |

### Forms & Conversion

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Inquiry/Contact Form** — Name, email, phone, message, honeypot | Admissions pipeline entry point | Medium | Uses Formspree (static export constraint); fields map to admissions CRM |
| **Application Form** — Multi-field with file upload (transcript) | Application intake | High | Longer form; may require Formspree paid tier; PDF upload → email attachment |
| **Form Validation** — Required fields, email pattern, honeypot trap | Prevents spam; basic quality gate | Low | `trim().length > 0` checks; `/^\S+@\S+\.\S+/` email regex |
| **Submission Feedback** — Success message + error fallback | User needs confirmation | Low | Green checkmark on success; generic fallback email on failure |

### SEO & Metadata

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Per-Page Metadata** — Title, description, keywords | Walker SEO quality; search ranking baseline | Low | Next.js `export const metadata` in each page; `next-seo` optional but not currently used |
| **JSON-LD Structured Data** — Organization, EducationalOrganization, HighSchool schema | Rich snippets; Google Business Profile alignment | Low | Located in `RootLayout`; includes `telephone`, `address`, `geo` coordinates |
| **Semantic HTML** — Proper heading hierarchy (one H1 per page), `<section>`, `<article>`, `<nav>`, `<main>` | Accessibility + SEO foundation | Low | Already followed in component structure |
| **Alt Text on All Images** — Descriptive, context-aware | WCAG 2.1 A; image SEO | Low | Current codebase has some generic alt ("Student"); must replace with specific descriptions |
| **Breadcrumb Navigation** — Interior pages show path | Walker interior pages have breadcrumbs | Low | `Breadcrumbs` component from `site-navigation.getBreadcrumbs(href)` |

### Accessibility & Compliance

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Keyboard Navigation** — Tab order, focus states, Escape-to-close | ADA Title III compliance; basic usability | Medium | Mobile menu closes on Escape; all interactive elements focusable; visible `:focus-visible` styles |
| **ARIA Labels** — `aria-label`, `aria-expanded`, `aria-hidden` where needed | Screen reader accessibility | Low | Hamburger button has `aria-label="Toggle menu"`; mobile menu uses `aria-expanded` |
| **Color Contrast (WCAG AA minimum)** — Text over backgrounds | Legal baseline; readability | Medium | Maroon/white passes AAA; gray text must be audited |
| **Skip-to-Content Link** (if present on Walker) | Keyboard users skip nav | Optional | Not currently in codebase; add if Walker has it |
| **GDPR Consent Banner** — Cookie/privacy notice with accept | EU/UK privacy law compliance | Low | `GdprConsent` component exists; links to `/privacy-policy` (currently missing) |

### Image & Media

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Optimized Image Formats** — WebP/AVIF with fallbacks | Walker image quality; performance | Low | Images stored in `public/images/` as pre-optimized WebP/PNG; custom loader configured |
| **Responsive Images** — Multiple sizes via `srcset` or Next.js Image | Avoid wasting bandwidth | Low | Currently using raw `<img>`; should migrate to `next/image` for auto-sizing |
| **Lazy Loading Below-Fold** — `loading="lazy"` on offscreen images | Core Web Vitals optimization | Low | Only hero should be `loading="eager"` |
| **Image Grid Collage** — 2×2 or staggered grid layouts | Walker's visual storytelling pattern | Low | Right side of StickySplitSection uses 4-image grid |

### Responsive Design

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Mobile-First Breakpoints** — Default + `@media (min-width: 768px)` + `@media (min-width: 1024px)` | Walker responsive tiers | Low | Already in place via Tailwind `md:`/`lg:` classes |
| **Full-Screen Mobile Menu** — 100vh overlay with full nav links | Walker mobile nav pattern | Low | `position: fixed; inset: 0; z-index: 10000` |
| **Touch-Friendly Tap Targets** — Minimum 44×44px | Mobile usability standard | Low | Buttons have ample padding; accordion headers sized correctly |
| **Fluid Typography** — No breakpoint-based font-size swaps | Walker typography system | Low | All sizes use `clamp()` with responsive range |
| **Horizontal Scroll Replaces Vertical on Homepage** — Mobile same structure | Parallax/scroll experience parity | High | Same horizontal scrub on mobile; careful with touch scrolling conflicts |

---

## Differentiators (Polish & Edge Cases)

These features **raise quality from "functional" to "premium"** but are not visually required by the reference. They protect against edge cases, improve resilience, and signal professional craftsmanship.

### Robustness & Edge Cases

| Feature | Value | Complexity | Notes |
|---------|-------|------------|-------|
| **Graceful Degradation for SVG Mask** — Fallback to split-reveal if mask fails | Prevents broken hero on older browsers | Low | Use `@supports (mask-image: ...)` detection or try/catch around SVG init |
| **Scroll Position Restoration on Back/Forward** | Navigation history feels solid | Medium | Horizontal scroll container must sync with browser history; use `sessionStorage` to persist scrollX |
| **Reduced Motion Respect** — `prefers-reduced-motion` query | Accessibility; legal compliance | Low-Medium | Disable GSAP scrubs + FM transitions; use CSS `transition` instead; fallback to static layout |
| **ResizeObserver for Image Load Completion** | Recalculate horizontal travel distance only after all images loaded | Medium | Prevents end-of-scroll whitespace if images load after mount |
| **RAF-Throttled Scroll Handlers** — All scroll effects run at 60fps max | Smooth 60fps on low-end devices | Low | Consolidate `scroll` event listeners; use `requestAnimationFrame` debounce |
| **Error Boundaries Around GSAP Components** | Prevent entire page crash if animation init fails | Medium | Class component wrapping HeroMasked, StickySplitSection; fallback to static content |
| **Image Load Error Fallbacks** — `onError` to load placeholder | Broken image links don't show 404 icon | Low | `onError={(e) => e.currentTarget.src = '/images/placeholder.webp'}` |
| **Form Submission Retry Logic** — Exponential backoff on network failure | Intermittent Formspree outages don't trap users | Low | 3 retries with 1s, 2s, 4s delays; clear error message if all fail |

### Performance Optimization

| Feature | Value | Complexity | Notes |
|---------|-------|------------|-------|
| **Code Splitting for Below-Fold Sections** — Dynamic import sections 3–9 | Faster LCP + FCP; less initial JS | Medium | `const StickySplitSection = dynamic(() => import('@/components/sections/StickySplitSection'), { ssr: false, loading: () => <SkeletonLoader />})` |
| **Image Priority Loading** — Hero image `priority` prop, others lazy | Core Web Vitals boost | Low | `next/image` `priority` only for above-the-fold; rest `loading="lazy"` |
| **Font Preload & Swap** — `<link rel="preload" as="font">` | Prevent FOIT (flash of invisible text) | Already done | `next/font/google` handles this with `display: 'swap'` |
| **Script Defer on Non-Critical** — Move nonessential scripts to `defer` | Unblock main thread rendering | Low | Any third-party scripts (analytics) should be deferred |
| **JS Bundle Budget Monitoring** — Warn if bundle > 200KB gzipped | Prevent bloat creep | Low | Add bundle-size check to CI (e.g., `size-limit` package) |

### Content Quality

| Feature | Value | Complexity | Notes |
|---------|-------|------------|-------|
| **Real Photography vs Placeholder** — Replace all Walker stock images with St. Elizabeth campus photos | Brand authenticity; emotional connection | **Project-blocking** | Currently ALL images are Walker placeholders; photography shoot required |
| **School-Specific Messaging** — Replace generic copy with St. Elizabeth values/history | Brand relevance | Low | Mission statement, principal message, faith formation details |
| **Accurate Contact Information** — Real phone, address, email | Trust/SEO | Low | Currently placeholder `+91-832-XXXXXXX`; must replace |
| **Functional Formspree Endpoints** — Valid form IDs for inquiry and application | Conversion pipeline | **Project-blocking** | Currently `YOUR_FORM_ID_HERE` placeholder; forms cannot submit |
| **Privacy Policy Page** — `/privacy-policy` with full GDPR text | Legal compliance | Low | Linked from consent banner; currently 404 |

### Developer Experience & Maintainability

| Feature | Value | Complexity | Notes |
|---------|-------|------------|-------|
| **Centralized Animation Config** — Single source for scrub/duration/easing constants | Tweak animations without hunting files | Low | `src/lib/gsap-config.ts` currently only registers plugins; add `const ANIMATION = { scrub: 1.2, duration: 0.8, ease: 'expo.out' }` |
| **Design Token Scale for Spacing** — `--space-xs`, `--space-sm`, `--space-md`, etc. | Consistent margins/padding | Low | Currently mixed inline spacing values |
| **Extracted Inline Components** — Move all inline components from `page.tsx` to separate files | Testability, reusability | Medium | `ValueCard`, `PassionsPanel`, `DivisionsTabsHorizontal` should each be in `src/components/sections/` |
| **TypeScript Strict Mode** — `strict: true` already enabled | Type safety | Already done | Maintain this; fix any `any` leaks |
| **E2E Test Suite** — Playwright tests for core user flows | Regression prevention | High | Already have `e2e/*.spec.ts` files; wire into CI |
| **Visual Regression Testing** — Percy/Chromatic snapshots | Catch visual drift | Medium | Add to CI; baseline per breakpoint |
| **Performance Budget in CI** — Lighthouse thresholds | Prevent regressions | Medium | LCP < 2.5s, CLS < 0.1, TBT < 200ms |

---

## Anti-Features (Explicitly Out of Scope)

These are **not Walker patterns** and are **not part of the fidelity goal**. Building them wastes time and diverges from the clone mandate.

| Anti-Feature | Why Avoid | Alternative |
|--------------|-----------|-------------|
| **Custom Backend / Database** — Node/Express API, PostgreSQL, etc. | Project is static export only; Walker is static; backend adds complexity & hosting cost | Use Formspree for forms; Netlify CMS (if needed later) but NOT now |
| **Headless CMS Integration** — Strapi, Contentful, Sanity | Walker is hardcoded content; CMS is overkill; introduces dynamic build complexity | Keep content inline in components; swap data later if needed |
| **Authentication / User Accounts** — Login, parent portal auth | Walker public site has no login wall | Links to external parent portal (if exists) as plain `<a>` |
| **Student Information System (SIS) Sync** — Grades, attendance, assignments | Walker is marketing site only; SIS is separate product | Link to separate SIS portal |
| **E-commerce / Payment Processing** — Tuition payments, store | Walker does not sell online | Use external payment link if needed (outside scope) |
| **Blog / News CMS** — Article management, RSS feeds | Walker's news exists but is static HTML | Create manual static pages; automate later if content volume justifies |
| **Custom Animation Framework** — Building own GSAP abstraction layer | GSAP works; abstraction adds indirection without value | Use GSAP directly; document patterns in comments |
| **Real-time Chat / Chatbot** — Live chat widget | Walker doesn't have it; adds 3rd-party bloat | Contact form or phone number only |
| **A/B Testing Infrastructure** — Feature flags, variant testing | Single target design (Walker exact); no testing needed | N/A |
| **Multi-language / i18n** — Translation system | Walker English-only; Goa context may need Konkani later but not in Phase 1 | Create separate pages later if needed |
| **PWA / Offline Mode** — Service worker, manifest | Static site already fast; Walker not a PWA | Optional future enhancement |

---

## Feature Dependencies

```
Homepage Horizontal Scroll Architecture
  └─> Requires: Ghost Nav (listens to horizontal-scroll-progress event)
  └─> Enables: HeroMasked animation timing, ScrollTrigger coordination
  └─> Constrains: All 9 sections must be exactly 100vw × 100vh

GSAP ScrollTrigger Engine
  └─> Used by: HeroMasked, StickySplitSection (future parallax), HorizontalScroll, Parallax hooks
  └─> Requires: Singleton registration via gsap-config.ts (to avoid StrictMode double-init)

Design Token System (globals.css)
  └─> Consumed by: All components (colors, fonts, easing, spacing)
  └─> Must define: Walker maroon palette, 3 easing curves, fluid typography classes

Accordion Pattern
  └─> Requires: Framer Motion (AnimatePresence)
  └─> Used by: StickySplitSection, mobile menu nested accordions
  └─> Pattern: Single-open state; height: auto animation

Formspree Integration
  └─> Requires: Valid Formspree form IDs (project-blocking)
  └─> Blocked by: GDPR privacy policy page (must exist first)

Real Photography
  └─> Required for: All image sections (hero, values, galleries, passions, divisions)
  └─> Blocked by: Photo shoot / asset delivery from St. Elizabeth

Interior Page Content
  └─> Depends on: ContentPage template completed
  └─> Required pages: About Us, Academics, Admissions, Student Life, Community, Contact, Arts, Athletics
```

---

## MVP Recommendation (Phase-Based Delivery)

**Goal:** Launch with minimum viable Walker fidelity that doesn't embarrass the brand.

### Phase 1: Foundation (Must Ship)
1. Ghost Nav Header (desktop + mobile)
2. Horizontal scroll-jacking homepage layout
3. SVG Text-Mask Hero with video/image background
4. We Value grid (4 cards)
5. 2× StickySplitSection (left content + right images + accordion)
6. 3× PassionsPanel (alternating backgrounds)
7. Divisions Tabs (grade selector)
8. Footer CTA full-bleed
9. Interior Page Template (ContentPage + PageHero)
10. All 8 interior pages with real content

### Phase 2: Conversion
11. Contact Form + Formspree endpoint
12. Admissions Inquiry Form + validation
13. Privacy Policy page + GDPR banner
14. Real photography replacement (all placeholder images)
15. Alt text completion across site

### Phase 3: Polish Edge Cases
16. Code-split below-fold homepage sections
17. Convert `<img>` to `next/image` with lazy loading
18. Centralize animation config constants
19. Extract inline components to files
20. E2E test suite wired + visual regression baseline
21. Performance budget CI checks
22. `prefers-reduced-motion` respect
23. Scroll position history restoration

### Phase 4: SEO & Analytics
24. Submit sitemap to Google Search Console
25. Add Google Analytics 4 or Plausible
26. Structured data validation + Rich Results Test pass
27. Accessibility audit (axe-core) + remediate violations
28. Core Web Vitals optimization (LCP < 2.5s target)

---

## Web-Scale Scaling Considerations

| Scaling Concern | At 100 users/day | At 10K users/day | At 1M users/day |
|-----------------|------------------|------------------|------------------|
| **Hosting** | Netlify/GitHub Pages free tier | Netlify Pro or Vercel Pro ($20–50/mo) | CDN with edge caching (Cloudflare, Vercel Enterprise); static remains cheap (< $100/mo) |
| **Form Volume** | Formspree free (50/month) OK | Formspree paid tier ($10–30/mo) needed | Custom backend or Formspree Enterprise; consider Zapier → Google Sheets → email |
| **Image Bandwidth** | ~200MB/month — negligible | ~20GB/month — CDN cost ~$20–50/mo | Enable proper caching headers, CDN image optimization (Cloudinary, Imgix) |
| **Build Time** | <30s (fast) | 1–2 minutes | May need Next.js ISR instead of pure static export; split build by content chunk |
| **Traffic Spikes** (e.g., open enrollment) | Free tier handles it | Auto-scaling needed | Static + CDN handles spikes inherently; just ensure CDN cache TTL configured |

---

## Complexity Summary

| Tier | Features | Count |
|------|----------|-------|
| **Simple** (≤ 2 hours each) | Basic accordion, grid layouts, typography tokens, breadcrumbs | ~8 |
| **Medium** (2–8 hours each) | Mega-menu, StickySplitSection, PassionsPanel, forms with validation | ~10 |
| **Complex** (8–20 hours each) | Horizontal scroll-jacking, SVG text-mask hero, mobile full-screen menu | ~4 |
| **Very Complex** (20+ hours each) | GSAP ScrollTrigger coordination across 9 sections, animation event bus | ~2 |

**Estimated Total Effort (Table Stakes Only):** 160–220 hours

---

## Sources

**Codebase Analysis (primary):**
- `src/app/page.tsx` — Homepage composition (horizontal scroll architecture)
- `src/components/sections/HeroMasked.tsx` — SVG text-mask implementation (SOP-001 pattern)
- `src/components/sections/StickySplitSection.tsx` — 45:55 content+imagery split pattern
- `src/components/layout/WalkHeader.tsx` — Ghost nav + mega-menu + mobile overlay
- `src/lib/site-navigation.ts` — 6-top-level × 42-page navigation structure
- `src/lib/hooks/useHorizontalScroll.ts`, `useParallax.ts` — GSAP ScrollTrigger hooks
- `src/app/globals.css` — Walker design tokens (colors, easing, typography)
- `.planning/codebase/ARCHITECTURE.md` — System-level patterns
- `.planning/codebase/CONCERNS.md` — Known tech debt, placeholder issues, bugs

**Industry Best Practices (secondary):**
- Premium independent school website benchmarking (Walker School, Phillips Academy, Deerfield Academy visual patterns)
- GSAP ScrollTrigger documentation for pin + scrub + horizontal scroll-jacking
- WCAG 2.1 accessibility guidelines for school sites
- Core Web Vitals performance targets for marketing websites
- Static export Next.js constraints (no backend, Formspree integration)
