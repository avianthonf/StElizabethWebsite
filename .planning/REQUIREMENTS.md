# Requirements: St. Elizabeth High School Website

**Defined:** 2026-04-27
**Core Value:** Walker School-quality marketing site for St. Elizabeth HS Pomburpa — buttery-smooth scroll animations and professional design adapted with St. Elizabeth branding

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [ ] **FOUND-01**: Fix GSAP horizontal scroll resize handler — recalculate travel distance on window resize with debounce
- [ ] **FOUND-02**: Fix GSAP plugin double-registration — singleton pattern for ScrollTrigger registration
- [x] **FOUND-03**: Fix iOS Safari mobile menu scroll lock — use `body-scroll-lock` or `react-remove-scroll`
- [ ] **FOUND-04**: Add Vitest + React Testing Library — unit tests for hooks and utilities
- [x] **FOUND-05**: Add Playwright E2E tests — critical user flows (navigation, scroll animations, mobile menu)
- [x] **FOUND-06**: Add axe-core accessibility testing — catch WCAG violations during development
- [ ] **FOUND-07**: Add image optimization pipeline — build-time WebP/AVIF generation with sharp
- [ ] **FOUND-08**: Add Next.js Image lazy loading — replace native `<img>` with `Image` component
- [ ] **FOUND-09**: Add font preload for Montserrat/Inter — eliminate FOIT on hero sections

### Content & Branding

- [x] **BRAND-01**: Replace Walker School logo/branding with St. Elizabeth High School identity
- [x] **BRAND-02**: Replace Walker School copy — mission statement, values, about text
- [x] **BRAND-03**: Replace placeholder images — use St. Elizabeth school photos (or curated stock)
- [x] **BRAND-04**: Update favicon and meta tags — St. Elizabeth branding
- [x] **BRAND-05**: Update Walker-specific navigation links — St. Elizabeth page routes

### Interior Pages

- [ ] **PAGE-01**: Build About Us page — reusable StickySplitSection + ContentPage template
- [ ] **PAGE-02**: Build Academics page — divisions overview with StickySplitSection
- [ ] **PAGE-03**: Build Admissions page — inquiry form + process timeline
- [ ] **PAGE-04**: Build Athletics page — cutout panel style sections
- [ ] **PAGE-05**: Build Arts page — cutout panel style sections
- [ ] **PAGE-06**: Build Contact page — form + map embed
- [ ] **PAGE-07**: Build page template system — ContentPage, ListingPage, DetailPage templates

### Forms & Conversion

- [x] **FORM-01**: Implement contact/inquiry form — name, email, phone, message, dropdown for inquiry type
- [x] **FORM-02**: Add GDPR-compliant consent checkbox — required for EU visitors
- [x] **FORM-03**: Add honeypot spam protection — hidden field to detect bots
- [x] **FORM-04**: Add accessible form validation — aria-live error messages, keyboard navigation
- [x] **FORM-05**: Wire form to Formspree (or Netlify Forms) — submissions delivered to school email

### SEO & Performance

- [x] **SEO-01**: Add LocalBusiness + EducationalOrganization schema — JSON-LD structured data
- [ ] **SEO-02**: Add Open Graph and Twitter Card meta tags — social sharing previews
- [x] **SEO-03**: Add sitemap.xml — all public pages indexed by search engines
- [x] **SEO-04**: Add robots.txt — allow search engine crawling
- [ ] **SEO-05**: Add breadcrumbs — on interior pages for navigation hierarchy
- [ ] **SEO-06**: Performance budget — LCP < 2.5s, CLS < 0.1, FID < 100ms

### Polish & Launch

- [ ] **POLISH-01**: Add 404 page — branded not-found with navigation back to homepage
- [ ] **POLISH-02**: Add loading states — skeleton screens for below-fold sections
- [ ] **POLISH-03**: Final accessibility audit — manual WCAG 2.1 testing
- [ ] **POLISH-04**: Update README.md — St. Elizabeth setup instructions, design system docs
- [ ] **POLISH-05**: Verify static export builds clean — `npm run build` succeeds

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Content Management

- **CMS-01**: Add headless CMS (TinaCMS or Sanity) — non-technical content editing
- **CMS-02**: Add news/blog listing page — school announcements
- **CMS-03**: Add event calendar page — school events

### Features

- **FEAT-01**: Virtual campus tour — 360° photo or video walkthrough
- **FEAT-02**: Faculty directory page — grid of headshots, names, titles, bios
- **FEAT-03**: Financial aid calculator — tuition estimation tool
- **FEAT-04**: Alumni success stories section — testimonial grid

### Internationalization

- **I18N-01**: Add Hindi translation — primary regional language
- **I18N-02**: Add Konkani translation — local Goan language

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Student/parent login portal | Not a public marketing site feature — would need backend auth |
| Real-time chat widget | Adds complexity, privacy concerns, maintenance burden |
| Social media feed embeds | Performance hit, privacy issues, not essential for school marketing |
| Live sports scores | Out of scope — athletics page overview only |
| Custom animations beyond GSAP | Framer Motion already handles discrete UI transitions |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Pending |
| FOUND-02 | Phase 1 | Pending |
| FOUND-03 | Phase 1 | Complete |
| FOUND-04 | Phase 1 | Pending |
| FOUND-05 | Phase 1 | Complete |
| FOUND-06 | Phase 1 | Complete |
| FOUND-07 | Phase 1 | Pending |
| FOUND-08 | Phase 1 | Pending |
| FOUND-09 | Phase 1 | Pending |
| BRAND-01 | Phase 2 | Complete |
| BRAND-02 | Phase 2 | Complete |
| BRAND-03 | Phase 2 | Complete |
| BRAND-04 | Phase 2 | Complete |
| BRAND-05 | Phase 2 | Complete |
| PAGE-01 | Phase 2 | Pending |
| PAGE-02 | Phase 2 | Pending |
| PAGE-03 | Phase 2 | Pending |
| PAGE-04 | Phase 2 | Pending |
| PAGE-05 | Phase 2 | Pending |
| PAGE-06 | Phase 2 | Pending |
| PAGE-07 | Phase 2 | Pending |
| FORM-01 | Phase 3 | Complete |
| FORM-02 | Phase 3 | Complete |
| FORM-03 | Phase 3 | Complete |
| FORM-04 | Phase 3 | Complete |
| FORM-05 | Phase 3 | Complete |
| SEO-01 | Phase 4 | Complete |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 4 | Complete |
| SEO-04 | Phase 4 | Complete |
| SEO-05 | Phase 4 | Pending |
| SEO-06 | Phase 4 | Pending |
| POLISH-01 | Phase 4 | Pending |
| POLISH-02 | Phase 4 | Pending |
| POLISH-03 | Phase 4 | Pending |
| POLISH-04 | Phase 4 | Pending |
| POLISH-05 | Phase 4 | Pending |
| CMS-01 | Future | Deferred |
| CMS-02 | Future | Deferred |
| CMS-03 | Future | Deferred |
| FEAT-01 | Future | Deferred |
| FEAT-02 | Future | Deferred |
| FEAT-03 | Future | Deferred |
| FEAT-04 | Future | Deferred |
| I18N-01 | Future | Deferred |
| I18N-02 | Future | Deferred |

**Coverage:**
- v1 requirements: 37 total
- Mapped to phases: 37
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-27*
*Last updated: 2026-04-27 after roadmap creation*
