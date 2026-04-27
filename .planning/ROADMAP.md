# Roadmap: St. Elizabeth High School Website

**Project:** St. Elizabeth High School Pomburpa Website (Walker School Reference Clone)
**Milestone:** v1 Launch
**Granularity:** Coarse (4 phases)
**Created:** 2026-04-28
**Status:** Draft

---

## Phases

- [ ] **Phase 1: Foundation & Walker Fidelity** - Core navigation, homepage scroll flow, hero, and all 23 Walker-canonical patterns replicate with pixel-level accuracy
- [ ] **Phase 2: Content & Interior Pages** - Real St. Elizabeth branding, photography, and complete interior page templates (About, Academics, Admissions, etc.)
- [ ] **Phase 3: Forms, Polish & Edge Cases** - Working Formspree forms, reduced-motion accessibility, Safari validation, scroll-choreography hardening
- [ ] **Phase 4: SEO, Compliance & Launch Readiness** - Structured data, privacy policy, accessibility audit remediations, automated tests, visual fidelity lock

---

## Phase Details

### Phase 1: Foundation & Walker Fidelity
**Goal:** Core Walker School interaction patterns, navigation system, and homepage scroll choreography reproduce with reference-level accuracy
**Depends on:** None (first phase)
**Requirements:** FND-01, FND-02, FND-03, FND-04, FND-05, FND-06, FND-07, FND-08, FND-09, FND-10
**Success Criteria** (what must be TRUE):
  1. User can traverse the entire homepage horizontal scroll journey without unreachable whitespace or dead scroll states
  2. User experiences a ghost navigation header that transitions correctly between scroll states on desktop and mobile
  3. User can open and navigate the multi-level mega-menu on desktop and the full-screen mobile menu on mobile devices
  4. User sees the hero section with Walker-style SVG-text-mask typography and media treatment with correct layering and sizing
  5. User can view all five Walker-inspired homepage content patterns (value cards, sticky split sections, passions panels, divisions tabs, footer CTA) in their intended visual configuration
  6. User experiences responsive layouts that preserve visual fidelity across mobile, tablet, and desktop breakpoints without broken overflow or clipping
  7. User with `prefers-reduced-motion` enabled receives appropriate simplified animations and no motion-triggered seizures or vestibular disruption
  8. User either on mobile Safari or desktop sees smooth scroll with correct pinning behavior (no scroll-jacking jank or lost scroll position)
  9. User does not experience major cumulative layout shift from late-loading images or fonts (CLS remains low throughout initial load)
  10. Static export completes successfully (`npm run build`) and all homepage sections are present and functional in the `out/` directory
**Plans**: 4 plans
- [x] 01-01-PLAN.md — Horizontal scroll-jacking hardening (FND-01, FND-07)
- [x] 01-02-PLAN.md — Ghost header + mega-menu + mobile overlay (FND-02, FND-03)
- [x] 01-03-PLAN.md — Hero SVG mask, CLS elimination, reduced motion (FND-04, FND-07, FND-08)
- [x] 01-04-PLAN.md — Section parity, responsive layouts, full reduced-motion + CLS guardrails (FND-05, FND-06, FND-08, FND-09, FND-10)
**UI hint**: yes

### Phase 2: Content & Interior Pages
**Goal:** All Walker-fidelity layouts are populated with St. Elizabeth-specific branding, copy, photography, and a complete set of interior page templates
**Depends on:** Phase 1
**Requirements:** CONT-01, CONT-02, CONT-03, CONT-04, CONT-05
**Success Criteria** (what must be TRUE):
  1. User sees St. Elizabeth branding (logo, colors, typography) and school identity across all pages with no Walker placeholder text or logos
  2. User sees actual St. Elizabeth photography and school-specific imagery in all homepage and interior page placements with no Walker stock photos
  3. User can navigate directly to every primary interior page (About Us, Academics, Admissions, Student Life, Community, Contact, Arts, Athletics) via the navigation system
  4. User experiences consistent page templates across all interior pages with Walker-inspired hierarchy, breadcrumbs, layout patterns, and section styling
  5. User encounters only complete, production-quality content with no stub sections, placeholder text, or unfinished stubs on any page
**Plans**: 4 plans
- [x] 01-01-PLAN.md — Horizontal scroll-jacking hardening (FND-01, FND-07)
- [x] 01-02-PLAN.md — Ghost header + mega-menu + mobile overlay (FND-02, FND-03)
- [x] 01-03-PLAN.md — Hero SVG mask, CLS elimination, reduced motion (FND-04, FND-07, FND-08)
- [x] 01-04-PLAN.md — Section parity, responsive layouts, full reduced-motion + CLS guardrails (FND-05, FND-06, FND-08, FND-09, FND-10)
**UI hint**: yes

### Phase 3: Forms, Polish & Edge Cases
**Goal:** Form submission flows are production-ready, motion behavior is accessible across preference modes, and cross-browser quirks are resolved
**Depends on:** Phase 2
**Requirements:** FORM-01, FORM-02, FORM-03, FORM-04, QLTY-01, QLTY-02, A11Y-01
**Success Criteria** (what must be TRUE):
  1. User can submit the contact or inquiry form successfully and sees clear confirmation that the submission was received
  2. User can submit the admissions inquiry form with client-side validation and receives a clear success or error response
  3. User receives helpful, readable feedback when a form submission fails (network error, validation failure, server error) along with an alternate contact path
  4. User attempting spam submissions encounters honeypot traps and basic validation that prevents malformed payloads from reaching the endpoint
  5. User visiting the site in Safari (desktop and iOS) sees no major animation or scroll jank and all GSAP pinning works as intended
  6. User on low-end devices sees acceptable performance without perceivable frame drops during scroll-triggered animations
  7. User attempting keyboard-only navigation can move focus through menus, accordions, carousels, and forms without interaction traps or focus locks
**Plans**: TBD

### Phase 4: SEO, Compliance & Launch Readiness
**Goal:** Site passes production audits (SEO, accessibility, structured data), all compliance pages are present, and automated guardrails are in place
**Depends on:** Phase 3
**Requirements:** SEO-01, SEO-02, SEO-03, A11Y-02, A11Y-03, QLTY-03, QLTY-04
**Success Criteria** (what must be TRUE):
  1. Search engines receive complete per-page metadata (titles, descriptions, OpenGraph) and semantic HTML structure for every page
  2. Search engines receive accurate structured data (JSON-LD) for the school organization, contact details, and key pages
  3. User can access the privacy policy page and it is linked from both the footer and any consent-requiring flows
  4. Screen reader users receive meaningful alt text on all meaningful images and content descriptions where context is not obvious
  5. User with non-pointer input (keyboard, switch control) can use the site with WCAG-compliant contrast ratios, visible focus states, and no mouse-only interaction requirements
  6. Team can run an automated test suite that verifies the build succeeds, critical paths (homepage load, navigation, form renders) pass, and regressions are flagged
  7. Team has documented visual-fidelity checklists for the homepage and interior pages so pre-launch review can confirm Walker-parity hold across all breakpoints
**Plans**: TBD

---

## Dependency Graph

```
Phase 1 (Foundation)
    â†“
Phase 2 (Content)
    â†“
Phase 3 (Forms/Polish)
    â†“
Phase 4 (SEO/Compliance)
```

**Note:** Photography asset delivery and Formspree endpoint setup are external blockers within Phase 1 scope. See Phase 1 gate criteria.

---

## External Blocker Notes

| Blocker | Owning Phase | Resolution Path |
|---------|--------------|-----------------|
| Real photography assets (20+ images) | Phase 1 | Coordinate photoshoot; deliver optimized WebP/PNG to `/public/images/` |
| Formspree endpoint ID & configuration | Phase 3 | Create Formspree account, generate form IDs, add to environment/config |
| Privacy policy page content | Phase 4 | Draft/approve privacy policy copy; create page at `/privacy-policy` |

---

## Progress Table

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Walker Fidelity | 4/4 | Planning complete | - |
| 2. Content & Interior Pages | 0/3 | Not started | - |
| 3. Forms, Polish & Edge Cases | 0/3 | Not started | - |
| 4. SEO, Compliance & Launch Readiness | 0/3 | Not started | - |

---

## Traceability

**Full traceability maintained in `.planning/REQUIREMENTS.md`**

| Requirement | Phase | Status |
|-------------|-------|--------|
| FND-01 | Phase 1 | Pending |
| FND-02 | Phase 1 | Pending |
| FND-03 | Phase 1 | Pending |
| FND-04 | Phase 1 | Pending |
| FND-05 | Phase 1 | Pending |
| FND-06 | Phase 1 | Pending |
| FND-07 | Phase 1 | Pending |
| FND-08 | Phase 1 | Pending |
| FND-09 | Phase 1 | Pending |
| FND-10 | Phase 1 | Pending |
| CONT-01 | Phase 2 | Pending |
| CONT-02 | Phase 2 | Pending |
| CONT-03 | Phase 2 | Pending |
| CONT-04 | Phase 2 | Pending |
| CONT-05 | Phase 2 | Pending |
| FORM-01 | Phase 3 | Pending |
| FORM-02 | Phase 3 | Pending |
| FORM-03 | Phase 3 | Pending |
| FORM-04 | Phase 3 | Pending |
| SEO-01 | Phase 4 | Pending |
| SEO-02 | Phase 4 | Pending |
| SEO-03 | Phase 4 | Pending |
| A11Y-01 | Phase 3 | Pending |
| A11Y-02 | Phase 4 | Pending |
| A11Y-03 | Phase 4 | Pending |
| QLTY-01 | Phase 3 | Pending |
| QLTY-02 | Phase 3 | Pending |
| QLTY-03 | Phase 4 | Pending |
| QLTY-04 | Phase 4 | Pending |

**Coverage:** 29/29 requirements mapped âœ“

---

## Roadmap Notes

**Design Reference:** https://www.thewalkerschool.org/ â€” fidelity is the primary success metric. Visual, behavioral, and motion parity must be maintained.

**Static Export Constraint:** All features must function after `npm run build` with no server-side runtime. Client components (`'use client'`) used only where required (GSAP, state, event handlers).

**Existing Codebase:** Current implementation is brownfield (~60% foundation features in place). Phase 1 includes audit work to validate and align all 23 Walker-canonical patterns, not build-from-zero.

**Entry Points:** After approval, use `/gsd-plan-phase 1` to begin detailed planning for Phase 1, then `/gsd-execute-phase 1` to start implementation.
