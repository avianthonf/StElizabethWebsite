# Roadmap: St. Elizabeth High School Website

**Project:** St. Elizabeth High School Website
**Created:** 2026-04-27
**Granularity:** Standard
**Total Phases:** 4

## Phases

- [ ] **Phase 1: Foundation & Bug Fixes** - Fix GSAP bugs, add testing infrastructure, optimize images and fonts
- [ ] **Phase 2: Content & Interior Pages** - Replace Walker branding, build interior page templates and content
- [ ] **Phase 3: Forms & Conversion** - Implement inquiry forms with GDPR compliance and spam protection
- [ ] **Phase 4: SEO, Performance & Launch** - Add structured data, optimize performance, final accessibility audit

## Phase Details

### Phase 1: Foundation & Bug Fixes

**Goal:** Users can browse the existing homepage without GSAP errors, scroll animations work correctly on all devices and viewport sizes, and the codebase has testing infrastructure to prevent regressions.

**Depends on:** Nothing (first phase)

**Requirements:** FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08, FOUND-09

**Success Criteria** (what must be TRUE):
1. User can resize browser window and horizontal scroll carousel recalculates travel distance without breaking
2. User can open mobile menu on iOS Safari and page content does not scroll behind the overlay
3. User can navigate all homepage sections without GSAP console warnings or errors
4. Developer can run `npm test` and see passing unit tests for GSAP hooks and utilities
5. Developer can run `npm run test:e2e` and see passing tests for navigation, scroll animations, and mobile menu

**Plans:** 4 plans in 2 waves

Plans:
- [x] 01-01-PLAN.md — Fix GSAP bugs (resize handler + plugin registration) + add Vitest unit tests
- [x] 01-02-PLAN.md — Fix iOS Safari scroll lock + add Playwright E2E tests for mobile menu
- [x] 01-03-PLAN.md — Expand E2E test coverage (navigation, scroll animations, accessibility with axe-core)
- [x] 01-04-PLAN.md — Image optimization pipeline + font preload (sharp, next/font/google)

---

### Phase 2: Content & Interior Pages

**Goal:** Users can navigate to interior pages (About, Academics, Admissions, Athletics, Arts, Contact) and see St. Elizabeth branding throughout the site instead of Walker School placeholders.

**Depends on:** Phase 1 (testing infrastructure validates new pages)

**Requirements:** BRAND-01, BRAND-02, BRAND-03, BRAND-04, BRAND-05, PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05, PAGE-06, PAGE-07

**Success Criteria** (what must be TRUE):
1. User sees St. Elizabeth High School logo, colors, and branding on every page (no Walker School references)
2. User can navigate to About, Academics, Admissions, Athletics, Arts, and Contact pages from the main navigation
3. User can read St. Elizabeth mission statement, values, and school information on interior pages
4. User sees St. Elizabeth school photos (or appropriate stock images) instead of Walker School placeholders
5. Developer can reuse ContentPage, ListingPage, and DetailPage templates to create new pages quickly

**Plans:** 4 plans in 3 waves

Plans:
- [x] 02-01-PLAN.md — Branding core (logo, favicon, nav structure)
- [x] 02-02-PLAN.md — Content copy replacement (mission, values, images)
- [x] 02-03-PLAN.md — Page template system + About Us page
- [ ] 02-04-PLAN.md — Remaining interior pages (Academics, Admissions, Athletics, Arts, Contact)

**UI hint:** yes

---

### Phase 3: Forms & Conversion

**Goal:** Users can submit admissions inquiries and contact requests through accessible, GDPR-compliant forms that deliver to school email without spam.

**Depends on:** Phase 2 (forms are linked from Admissions and Contact pages)

**Requirements:** FORM-01, FORM-02, FORM-03, FORM-04, FORM-05

**Success Criteria** (what must be TRUE):
1. User can fill out and submit contact/inquiry form with name, email, phone, message, and inquiry type
2. User sees clear, accessible error messages if form validation fails (keyboard navigable, screen reader compatible)
3. User must explicitly check GDPR consent checkbox before form can be submitted
4. School receives form submissions via email without spam (honeypot protection blocks bots)
5. User can navigate entire form using only keyboard (Tab, Enter, Escape) without mouse

**Plans:** 2 plans in 2 waves

Plans:
- [x] 03-01-PLAN.md — Form foundation (fields, honeypot, validation)
- [x] 03-02-PLAN.md — Form submission (GDPR consent, Formspree wiring)

**UI hint:** yes

---

### Phase 4: SEO, Performance & Launch

**Goal:** Site is discoverable by search engines, loads quickly on all devices, meets accessibility standards, and is ready for public launch.

**Depends on:** Phase 3 (all features complete, ready for optimization and launch prep)

**Requirements:** SEO-01, SEO-02, SEO-03, SEO-04, SEO-05, SEO-06, POLISH-01, POLISH-02, POLISH-03, POLISH-04, POLISH-05

**Success Criteria** (what must be TRUE):
1. User can find St. Elizabeth High School in Google search results with correct title, description, and preview image
2. User experiences fast page loads (LCP < 2.5s, CLS < 0.1, FID < 100ms) on mobile and desktop
3. User can navigate site with keyboard only and screen reader without encountering barriers
4. User sees branded 404 page with navigation if they visit a non-existent URL
5. Developer can run `npm run build` and static export completes without errors

**Plans:** 4 plans in 2 waves

Plans:
- [x] 04-01-PLAN.md — SEO infrastructure (JSON-LD schema, sitemap.xml, robots.txt)
- [x] 04-02-PLAN.md — Social meta tags and breadcrumbs (Twitter Cards, Open Graph, breadcrumb navigation)
- [x] 04-03-PLAN.md — Polish features (branded 404 page, skeleton loading states)
- [ ] 04-04-PLAN.md — Final verification (accessibility audit, README documentation, build validation)

---

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Bug Fixes | 4/4 | Complete | 2026-04-27 |
| 2. Content & Interior Pages | 4/4 | Complete | 2026-04-27 |
| 3. Forms & Conversion | 2/2 | Complete | 2026-04-27 |
| 4. SEO, Performance & Launch | 0/4 | Ready to execute | - |

---

*Roadmap created: 2026-04-27*
*Last updated: 2026-04-27T16:09:29.947Z*
