# Project Research Summary

**Project:** St. Elizabeth High School Website
**Domain:** K-12 Private School Marketing Website (Static Next.js)
**Researched:** 2026-04-27
**Confidence:** HIGH

## Executive Summary

St. Elizabeth High School needs a Walker School-inspired marketing website built on Next.js 14 static export with GSAP scroll animations. The codebase is 60% complete—homepage shell exists with sophisticated scroll-driven components (SVG text-mask hero, horizontal scroll carousel, sticky split sections, ghost navigation), but critical gaps remain: no contact forms, no interior pages, no test coverage, and placeholder content throughout.

The recommended approach is brownfield completion rather than greenfield rebuild. Existing GSAP-powered components are production-quality and reusable across interior pages. Priority is fixing known bugs (GSAP resize handler, iOS scroll lock, plugin double-registration), replacing placeholder content, and building missing features (admissions inquiry form, content page templates, faculty directory). The Walker School design system (SOP-001 tokens, 45:55 sticky splits, `scrub: 1` physics) should be preserved—it's the project's core value proposition.

Key risks center on accessibility compliance (no testing, mobile menu keyboard traps), performance (unoptimized images, no lazy loading, large CSS bundle), and static export constraints (form handling requires third-party service, no server-side image optimization). Mitigation requires Phase 1 focus on accessibility testing infrastructure (axe-core, Lighthouse CI), image optimization pipeline (sharp build script or CDN), and form service integration (Formspree/Netlify Forms with GDPR consent).

## Key Findings

### Recommended Stack

The project has already selected a solid foundation: Next.js 14 App Router with static export, TypeScript, Tailwind CSS v4, GSAP 3.x for scroll animations, and Framer Motion 11 for discrete UI transitions. This hybrid animation approach is correct—GSAP handles scroll-linked physics (scrub, pinning), Framer Motion handles state-driven transitions (accordion, tabs, mobile overlay).

**Core technologies already in place:**
- Next.js 14 (App Router, static export) — Industry standard for React SSG, excellent DX
- TypeScript — Type safety catches errors at compile time
- Tailwind CSS v4 — Utility-first CSS with SOP-001 design tokens
- GSAP 3.x + ScrollTrigger — Industry-leading scroll animations, performant timeline-based system
- Framer Motion 11 — Declarative React animations for UI transitions

**Missing critical additions:**
- Vitest ^4.1.5 + @testing-library/react ^16.3.2 — Unit/integration testing (zero coverage currently)
- @playwright/test ^1.59.1 — E2E testing for critical user flows
- axe-core ^4.11.3 + jest-axe ^10.0.0 — Accessibility testing (legal requirement for schools)
- React Hook Form ^7.74.0 + Zod ^4.3.6 — Form handling with validation
- Formspree or Netlify Forms — Form backend for static export
- sharp ^0.33.5 — Build-time image optimization (Next.js optimization disabled for static export)
- web-vitals ^5.2.0 — Core Web Vitals tracking

**Critical constraint:** Static export (`output: "export"`) eliminates server-side features—no API routes, no Server Actions, no automatic image optimization. All dynamic functionality requires client-side solutions or external services.

### Expected Features

School marketing websites have well-established feature expectations. Missing table stakes features block enrollment; missing differentiators reduce competitive advantage.

**Must have (table stakes):**
- Multi-level navigation with mega-menu — Schools have complex content hierarchies (6-8 main sections)
- Admissions inquiry form — Primary conversion goal, must work with static export (form service required)
- About pages (mission, values, history, leadership) — Parents need to understand school identity
- Academics overview by division — Core value proposition, what students learn
- Admissions process page — Step-by-step enrollment journey reduces friction
- Faculty/staff directory — Builds trust ("who will teach my child?")
- Contact information with map — Address, phone, email, office hours
- Athletics and arts program pages — Major differentiators for private schools

**Should have (competitive advantage):**
- Virtual campus tour — Post-pandemic expectation, reduces friction for distant families
- Student/parent testimonials — Social proof drives enrollment decisions
- Event calendar — Shows active community, helps families plan visits
- Alumni success stories — Demonstrates long-term outcomes
- Faith integration content — If faith-based, differentiates from secular schools
- Downloadable resources — Admissions packets, curriculum guides, handbooks

**Defer to v2+:**
- Multi-language support (Hindi/Konkani) — Significant translation effort, validate English site first
- Interactive program finder — Nice-to-have, not essential for launch
- Financial aid calculator — Requires backend or third-party service, uncertain ROI
- Client-side search — Only needed if site grows >50 pages, navigation should suffice for MVP

**Anti-features to avoid:**
- Live chat widget — Requires staffing, often goes unanswered, creates negative impression
- Student/parent login portal — Out of scope for marketing site, separate system handles this
- Real-time sports scores — High maintenance, link to third-party platform instead
- Social media feed embeds — Slow page load, break frequently, look dated
- Auto-playing audio — Universally hated, accessibility violation

### Architecture Approach

The existing architecture follows atomic design principles with clear component layering: layout components (WalkHeader, Footer) → section components (HeroMasked, ValueCarousel, StickySplitSection) → UI primitives (Button, Accordion). This structure is sound and should be extended, not replaced.

**Major components already implemented:**
1. WalkHeader — Ghost navigation with scroll behavior, mega-menu foundation, mobile drawer
2. HeroMasked — SVG text clip-path hero with scroll-reveal background (signature Walker School pattern)
3. ValueCarousel — Horizontal scroll-jacking carousel with GSAP pinning (reusable for any carousel content)
4. StickySplitSection — 45:55 sticky split layout with accordion (reusable for about/admissions pages)
5. DivisionsTabs — Synchronized tab slider with Framer Motion (reusable for academics/programs)
6. FooterCtaSection — Full-width CTA with background image (expandable to full footer with sitemap)

**Missing components for interior pages:**
1. ContentPage template — Standard page layout with hero + body content + sidebar CTA
2. InquiryForm — Contact/admissions form with validation, GDPR consent, spam protection
3. FacultyGrid — Responsive grid with photo, name, title, bio modal
4. ProcessTimeline — Visual stepper for admissions process (inquiry → visit → apply → decision)
5. NewsList — Blog-style listing with date, title, excerpt, "Read more" links
6. ContactMap — Google Maps embed for contact page
7. LightboxGallery — Image gallery with click-to-expand, prev/next navigation

**Recommended data flow pattern:** Git-based CMS (TinaCMS or Decap CMS) with static JSON/MDX files for content. Build-time data fetching generates static pages. This matches static export constraint and keeps content versioned in Git. Upgrade to headless CMS (Sanity/Contentful) only if content volume exceeds 100 pages or need >3 editors.

**Critical architectural decision:** Preserve GSAP + Framer Motion hybrid. GSAP is essential for scroll-linked animations (the Walker School aesthetic), Framer Motion handles discrete UI transitions. Don't consolidate to single animation library—each serves distinct purpose.

### Critical Pitfalls

Research identified seven critical pitfalls specific to school websites with static export and GSAP animations. These are not theoretical—several are already present in the codebase per CONCERNS.md audit.

1. **Accessibility compliance failures leading to legal action** — Schools face OCR complaints and lawsuits for WCAG violations. Current codebase has zero accessibility testing, mobile menu keyboard traps, and missing ARIA attributes. Prevention: Mandatory WCAG 2.1 AA compliance from Phase 1, add eslint-plugin-jsx-a11y, axe-core automated tests, keyboard navigation testing, screen reader testing.

2. **GSAP ScrollTrigger performance disasters** — Known issues in codebase: plugin double-registration warnings, no resize handler (animations break on viewport change), iOS Safari scroll lock issues. Prevention: Implement singleton pattern for plugin registration, add debounced resize handler to recalculate ScrollTrigger positions, use body-scroll-lock library for iOS Safari, create ScrollTriggers in DOM order (top-to-bottom), animate children of pinned elements (never the pinned element itself).

3. **Static export image optimization failure** — Next.js Image optimization disabled (`unoptimized: true`), causing massive image files and poor Core Web Vitals (LCP >4s). Prevention: Implement build-time optimization with sharp, serve WebP with JPG fallback, add lazy loading for below-fold images, set LCP budget (<200KB for hero images).

4. **Mobile menu accessibility and usability failures** — Current mobile menu lacks focus trap, proper ARIA attributes, keyboard shortcuts (Escape to close), and iOS Safari scroll lock is fragile. Prevention: Use battle-tested scroll lock library (body-scroll-lock or react-remove-scroll), implement focus trap (focus-trap-react), add proper ARIA attributes, support keyboard shortcuts, test on real iOS devices.

5. **Form handling on static sites (spam, validation, GDPR)** — Static export has no server-side form handling. Prevention: Use form service with spam protection (Netlify Forms with honeypot + reCAPTCHA, or Formspree), implement GDPR-compliant consent (explicit checkbox, privacy policy link), add client-side validation with accessible errors (aria-invalid, aria-describedby), implement COPPA compliance if collecting data from children under 13.

6. **Font loading and Cumulative Layout Shift (CLS)** — Custom fonts (Inter, Playfair Display, Montserrat) load after initial render, causing text reflow and poor CLS scores. Prevention: Self-host fonts with next/font/google, set font-display: swap, preload critical fonts, use font subsetting (Latin only), match fallback font metrics to minimize layout shift.

7. **SEO failures specific to school websites** — Missing Schema.org EducationalOrganization markup, no local SEO signals, duplicate content, no sitemap. Prevention: Implement structured data for educational institutions, add local SEO signals (city/region in title tags, Google Maps embed, Google My Business listing), generate static sitemap with next-sitemap, write unique meta descriptions per page.

## Implications for Roadmap

Based on combined research, the roadmap should follow a brownfield completion strategy with four phases: Foundation (fix bugs, add testing), Core Pages (interior content), Forms & Interactivity (admissions conversion), and Polish & Launch (performance, SEO, content replacement).

### Phase 1: Foundation & Bug Fixes

**Rationale:** Fix known bugs and add testing infrastructure before building new features. Existing components are production-quality but have critical gaps (no tests, GSAP bugs, accessibility violations). Building on broken foundation creates compounding technical debt.

**Delivers:**
- GSAP bug fixes (resize handler, plugin singleton, iOS scroll lock)
- Testing infrastructure (Vitest, Playwright, axe-core)
- Image optimization pipeline (sharp build script or CDN integration)
- Accessibility baseline (eslint-plugin-jsx-a11y, keyboard navigation fixes)
- Font optimization (next/font/google, preload critical fonts)

**Addresses pitfalls:**
- Pitfall #2 (GSAP performance) — Fix resize handler, plugin registration
- Pitfall #3 (Image optimization) — Implement build-time optimization
- Pitfall #4 (Mobile menu) — Fix scroll lock, add focus trap, ARIA attributes
- Pitfall #6 (Font loading) — Optimize fonts, reduce CLS

**Avoids:**
- Building new features on buggy foundation
- Accumulating technical debt that blocks launch
- Accessibility violations that require expensive remediation

**Research flag:** Standard patterns, skip research-phase. GSAP bugs are documented, testing setup is well-established, accessibility requirements are clear.

### Phase 2: Core Interior Pages

**Rationale:** Build missing content pages using existing section components. Homepage shell proves components are reusable—StickySplitSection works for about pages, DivisionsTabs works for academics, PassionsPanel works for athletics/arts. Focus on content structure, not new component patterns.

**Delivers:**
- About pages (mission, values, history, leadership) using StickySplitSection
- Academics overview using DivisionsTabs pattern
- Athletics and arts pages using PassionsPanel
- Contact page with map embed
- ContentPage template for text-heavy pages
- Expanded navigation (mega-menu with 6 sections)

**Addresses features:**
- Table stakes: About pages, Academics overview, Athletics/Arts pages, Contact page
- Architecture: ContentPage template, expanded WalkHeader mega-menu

**Uses existing components:**
- StickySplitSection (about, admissions content)
- DivisionsTabs (academics by grade level)
- PassionsPanel (athletics, arts programs)
- FooterCtaSection (expand to full footer with sitemap)

**Research flag:** Standard patterns, skip research-phase. Page templates follow established school website patterns, component reuse is straightforward.

### Phase 3: Forms & Admissions Conversion

**Rationale:** Admissions inquiry form is the primary conversion goal. Delay until Phase 3 because it requires careful implementation (GDPR consent, spam protection, accessible errors, form service integration). Building form correctly is more important than building it early.

**Delivers:**
- Admissions inquiry form with validation (React Hook Form + Zod)
- Form service integration (Formspree or Netlify Forms)
- GDPR consent flow (explicit checkbox, privacy policy link)
- Spam protection (honeypot + reCAPTCHA)
- Accessible form errors (aria-invalid, aria-describedby, aria-live)
- Admissions process page with timeline/stepper
- Faculty directory with grid and bio modals

**Addresses pitfalls:**
- Pitfall #5 (Form handling) — Implement GDPR consent, spam protection, accessible errors
- Pitfall #1 (Accessibility) — Ensure form meets WCAG 2.1 AA (labels, errors, keyboard navigation)

**Addresses features:**
- Table stakes: Admissions inquiry form, Admissions process page, Faculty directory
- Differentiators: Downloadable resources (PDFs linked from admissions pages)

**Research flag:** Needs research-phase for form service selection. Compare Formspree vs. Netlify Forms vs. Web3Forms for pricing, spam protection, GDPR compliance, and static export compatibility.

### Phase 4: Content, SEO & Launch Prep

**Rationale:** Replace placeholder content, optimize for search engines, add performance monitoring. This phase is content-heavy (replace Walker School copy with St. Elizabeth branding) and requires non-technical stakeholders (school staff provide copy, images, videos).

**Delivers:**
- Replace all placeholder content (Walker School → St. Elizabeth)
- Replace placeholder images and videos with actual school assets
- Schema.org EducationalOrganization markup
- Local SEO optimization (city/region keywords, Google My Business)
- Static sitemap generation (next-sitemap)
- Unique meta descriptions per page
- Open Graph tags for social sharing
- Performance monitoring (web-vitals, Lighthouse CI)
- Final accessibility audit (manual testing with screen readers)

**Addresses pitfalls:**
- Pitfall #7 (SEO failures) — Implement structured data, local SEO, sitemap, meta descriptions
- Pitfall #1 (Accessibility) — Final audit with screen readers, keyboard navigation, WCAG validation

**Addresses features:**
- Differentiators: Student/parent testimonials, alumni success stories (content-driven)
- Table stakes: News/announcements section (static markdown files)

**Research flag:** Standard patterns, skip research-phase. SEO implementation is well-documented, content replacement is straightforward.

### Phase Ordering Rationale

- **Foundation first** because building on broken foundation creates compounding debt. GSAP bugs and accessibility violations must be fixed before adding complexity.
- **Core pages second** because they leverage existing components. Reusing StickySplitSection and DivisionsTabs proves component architecture works and builds confidence.
- **Forms third** because they require careful implementation (GDPR, spam, accessibility). Delaying allows time to research form service options and implement correctly.
- **Content/SEO last** because it's the most time-consuming and requires non-technical stakeholders. Technical foundation must be solid before content team invests effort.

**Dependency chain:** Phase 1 (testing infrastructure) → Phase 2 (interior pages tested with new infrastructure) → Phase 3 (forms tested with infrastructure, linked from interior pages) → Phase 4 (content fills tested pages, SEO optimizes tested site).

### Research Flags

**Phases needing deeper research during planning:**
- **Phase 3 (Forms):** Form service selection requires comparison of Formspree, Netlify Forms, Web3Forms for pricing, features, GDPR compliance, spam protection, and static export compatibility. Research should include COPPA compliance requirements if collecting data from children under 13.

**Phases with standard patterns (skip research-phase):**
- **Phase 1 (Foundation):** GSAP bugs are documented in CONCERNS.md, testing setup follows standard Vitest + Playwright patterns, accessibility requirements are WCAG 2.1 AA (well-documented).
- **Phase 2 (Core Pages):** Page templates follow established school website patterns, component reuse is straightforward, no novel architecture decisions.
- **Phase 4 (Content/SEO):** SEO implementation follows standard Next.js patterns (next-sitemap, Schema.org markup), content replacement is mechanical.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All technologies verified with Context7 and npm registry. Versions confirmed compatible with Next.js 14 and React 18+. Static export constraints well-documented. |
| Features | MEDIUM | Feature list based on Walker School analysis and school website patterns. Confidence reduced because St. Elizabeth's specific needs (faith integration, local market) not validated with stakeholders. |
| Architecture | HIGH | Existing component architecture is sound (atomic design, clear layering). Brownfield completion strategy is lower risk than greenfield rebuild. Component reuse patterns proven on homepage. |
| Pitfalls | HIGH | Seven critical pitfalls identified from official docs, project CONCERNS.md audit, and domain research. Four pitfalls already present in codebase (GSAP bugs, accessibility violations, image optimization, mobile menu issues). |

**Overall confidence:** HIGH

Research is comprehensive and actionable. Stack recommendations are verified, architecture approach preserves existing investment, pitfalls are specific and preventable, and phase structure follows logical dependency chain. Confidence reduced slightly on features because stakeholder validation is missing—feature list assumes St. Elizabeth needs match typical private school patterns.

### Gaps to Address

**Stakeholder validation needed:**
- Faith integration requirements — Is St. Elizabeth faith-based? If so, what content is needed (chapel, service, spiritual formation)?
- Multi-language requirements — Does Pomburpa market need Hindi/Konkani translations? Validate before deferring to v2.
- Virtual campus tour priority — Is video production capacity available? If not, defer to v2. If yes, move to Phase 3.
- Financial aid transparency — Will school publish tuition ranges or require "contact us"? Affects admissions page content.

**Technical validation needed:**
- GSAP licensing — Verify whether educational institution use requires commercial license. If yes, budget for license or migrate to Framer Motion.
- Form service selection — Compare Formspree vs. Netlify Forms vs. Web3Forms in Phase 3 research. Decision affects spam protection, GDPR compliance, and monthly submission limits.
- Hosting provider — Vercel vs. Netlify vs. GitHub Pages affects security headers, form service integration, and build performance. Decision should be made in Phase 1.

**Content production capacity:**
- Professional photography — Does school have budget for professional photos? If not, plan for stock images or user-generated content.
- Video production — Virtual campus tour and testimonial videos require production capacity. Validate availability before committing to Phase 3 delivery.
- Copywriting — Who writes St. Elizabeth content to replace Walker School placeholders? Plan for content creation timeline in Phase 4.

## Sources

### Primary (HIGH confidence)

- Context7: /vercel/next.js — Static export documentation, Image component limitations, App Router patterns
- Context7: /vitest-dev/vitest (v4.1.5) — Testing framework setup, configuration, coverage
- Context7: /microsoft/playwright (v1.59.1) — E2E testing capabilities, browser automation
- Context7: /react-hook-form/react-hook-form (v7.74.0) — Form handling patterns, validation
- Context7: /dequelabs/axe-core (v4.11.3) — Accessibility testing, WCAG compliance
- npm registry — All package versions verified (2026-04-27)
- Project CONCERNS.md — Known bugs, tech debt, missing features (audit date: 2026-04-27)
- Project CLAUDE.md — Tech stack, constraints, key decisions
- Project codebase analysis — 41 TypeScript/TSX files, component architecture, data flow

### Secondary (MEDIUM confidence)

- Walker School website analysis (https://www.thewalkerschool.org/) — Navigation structure, content patterns, design system
- GSAP ScrollTrigger Documentation (https://gsap.com/docs/v3/Plugins/ScrollTrigger/) — Performance best practices, common pitfalls
- W3C WCAG 2.1 Quick Reference (https://www.w3.org/WAI/WCAG21/quickref/) — Accessibility requirements
- Next.js Image Optimization Documentation — Static export workarounds, build-time optimization
- Web search: school website feature patterns, admissions forms, virtual tours, mobile design (2026-04-27)

### Tertiary (LOW confidence)

- School website best practices — General patterns, not St. Elizabeth-specific
- Headless CMS comparison — Sanity vs. Contentful vs. Strapi (deferred to future, not validated for this project)
- Multi-language support patterns — Next.js i18n (deferred to v2, not validated as requirement)

---

*Research completed: 2026-04-27*
*Ready for roadmap: yes*
