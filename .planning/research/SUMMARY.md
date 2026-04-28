# Research Summary: St. Elizabeth High School Website (Walker Fidelity Clone)

**Project:** St. Elizabeth High School Pomburpa Website
**Domain:** Premium school marketing site (static export, Walker School reference clone)
**Researched:** 2026-04-28
**Research Type:** Feature landscape & interaction patterns for reference fidelity
**Overall Confidence:** HIGH

---

## Executive Summary

This project is a **fidelity-first clone** of The Walker School website (thewalkerschool.org), translated to St. Elizabeth High School branding and content. Success is measured by visual and behavioral parity with the Walker reference, not by inventing new patterns. The research reveals three distinct feature categories:

- **Table Stakes (non-negotiable):** 23 Walker-canonical patterns that MUST ship for the project to meet its core goal. Missing any of these means the clone fails.
- **Differentiators (quality tier):** 22 polish and edge-case treatments that separate "it works" from "it's premium." These protect against fragility, improve Core Web Vitals, and signal professional craftsmanship.
- **Anti-Features (out of scope):** 10 explicitly excluded patterns (backend, CMS, auth, PWA, etc.) that would divert effort from the fidelity mandate.

The existing codebase already implements roughly 60% of table stakes features (horizontal scroll, SVG mask hero, mega-menu, sticky split section, accordion, design tokens) but is blocked on **real photography** and **Formspree endpoint configuration**. Two project-blocking gaps must be resolved before launch.

---

## Key Findings

**Stack:** Next.js 16 static export + TypeScript + Tailwind CSS v4 + GSAP 3.x + Framer Motion 12 + Lenis smooth scroll — already chosen and baked in.

**Architecture:** App Router with server components by default, client components where interactivity required; GSAP ScrollTrigger event bus coordinates horizontal scroll-jacking across 9 full-viewport homepage sections; design tokens as CSS custom properties (Walker SOP-001 colors and easing).

**Critical Pitfall:** Horizontal scroll-jacking container height is computed once at mount based on `track.scrollWidth`. If any images load late (stumbling images), the travel distance becomes inaccurate, leaving unreachable whitespace at the end of the scroll. Requires ResizeObserver to detect load-complete and call `ScrollTrigger.refresh()`.

---

## Implications for Roadmap

Based on research, suggested phase structure:

### Phase 1: Foundation & Walker Patterns (Weeks 4–6)
- **Addresses:** All 23 table stakes features (navigation, hero, scroll choreography, content patterns, forms framework)
- **Avoids:** Polish work and edge cases (defer to Phase 3)
- **Blockers to clear first:** Photography assets, Formspree endpoint setup, privacy policy page

### Phase 2: Content & Interior Pages (Weeks 6–8)
- **Addresses:** All 8 interior page templates with real school content, real contact/application forms functional, SEO metadata complete
- **Avoids:** Performance optimizations (code-splitting, next/image migration) — defer until content works

### Phase 3: Polish & Edge Cases (Weeks 8–10)
- **Addresses:** All 22 differentiators (reduced motion, RAF throttling, error boundaries, retry logic, image priority loading)
- **Avoids:** New features — this phase hardens the baseline

### Phase 4: SEO, Analytics & Compliance (Weeks 10–11)
- **Addresses:** Sitemap submission, structured data validation, accessibility audit remediations, Core Web Vitals optimization
- **Post-launch:** Analytics monitoring, conversion tracking

**Phase ordering rationale:** Content must exist before polish (Phase 1→2). Polish must complete before compliance audit (Phase 2→3). Compliance is last because changes can invalidate earlier work if done mid-project.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| **Stack** | HIGH | Explicitly locked in: Next.js 16, TS, Tailwind v4, GSAP 3, FM 12; already in package.json |
| **Features** | HIGH | Directly derived from existing Walker-inspired codebase patterns plus competitive school site research |
| **Architecture** | HIGH | Codebase map and ARCHITECTURE.md already document layers; verified against actual files |
| **Pitfalls** | HIGH | CONCERNS.md and code review identified 10 fragile areas; horizontal scroll fragility is well-documented by GSAP community |
| **Complexity Estimates** | MEDIUM | Based on component line counts and GSAP/FM implementation patterns; actual effort may vary 30% |

---

## Gaps to Address

1. **Formspree configuration** — Must obtain real Form ID from Formspree dashboard; requires external account setup not in-scope for research but blocking for implementation.
2. **Photography production** — All 20+ images currently Walker placeholders; photo shoot must be scheduled and assets delivered; not researchable.
3. **Walker site live audit** — A manual crawl of thewalkerschool.org to confirm which of our 23 table stakes actually exist on the current live site (site may have changed since code was written). Flagged as LOW confidence due to no direct access.
4. **Mobile scroll-jacking behavior** — Touch scrolling with horizontal pin on mobile Safari is known to be janky; requires device testing to tune `touch-action` CSS and overscroll behavior. Research indicates GSAP ScrollTrigger has Safari 15- quirk; cannot fully simulate without testing.
5. **Performance baseline** — No Lighthouse scores exist for current implementation; cannot set realistic targets without measuring actual LCP/CLS/INP after content is real.

## Research Flags for Phases

- **Phase 1 (Foundation):** Likely needs deeper research on Safari mobile scroll behavior and Formspree rate limits before committing to architecture.
- **Phase 2 (Content):** Standard pattern implementation; unlikely to need additional research beyond content delivery.
- **Phase 3 (Polish):** Reduced motion implementation requires testing across browsers; error boundary patterns need verification with GSAP cleanup.
- **Phase 4 (Compliance):** Accessibility audit (axe-core) and structured data validation require actual deployed site to test tools; not researchable pre-launch.
