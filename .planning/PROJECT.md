# St. Elizabeth High School Website

## What This Is

A static marketing website for St. Elizabeth High School, Pomburpa, rebuilt in Next.js to closely match the visual design, layout language, and interaction quality of The Walker School website. It is intended to function as a pixel-accurate reference implementation of that experience while replacing Walker branding, content, and assets with St. Elizabeth-specific material.

## Core Value

Deliver a Walker School-quality website experience for St. Elizabeth that feels visually identical in craft and polish while remaining a static, build-safe Next.js site.

## Requirements

### Validated

- ✓ Static-export Next.js marketing site with App Router architecture — existing
- ✓ Tailwind-based design token system and Walker-inspired visual language — existing
- ✓ Scroll-driven animation foundation using GSAP, Framer Motion, and Lenis — existing
- ✓ Multi-page school-site structure with homepage and interior routes — existing

### Active

- [ ] Reproduce The Walker School homepage and key interior-page visual patterns with pixel-level fidelity
- [ ] Replace Walker branding, copy, imagery, and school-specific content with St. Elizabeth equivalents without losing the source design quality
- [ ] Ensure all replicated patterns work within static export constraints and pass production build
- [ ] Preserve smooth scrolling, sticky navigation, scroll choreography, and responsive behavior across major breakpoints

### Out of Scope

- Building a custom backend or CMS — the project is constrained to static export
- Adding non-reference features not present in the Walker-inspired target experience — clone fidelity is the priority
- Reinterpreting the design into a different visual direction — this work is explicitly reference-led, not a fresh redesign

## Context

The existing codebase is already a brownfield Next.js 16 static-export site with multiple Walker-inspired components, design tokens, and animation hooks. The current direction is not a generic school-site rebuild; it is a highly specific fidelity project where success is measured by how closely the St. Elizabeth site matches https://www.thewalkerschool.org/ in layout, motion, hierarchy, and perceived polish.

The site already includes GSAP-driven interactions, reusable section components, and a codebase map under `.planning/codebase/`. That means initialization should treat the current implementation as a partial foundation to audit, align, and extend rather than a brand-new greenfield app.

## Constraints

- **Tech stack**: Next.js static export, TypeScript, Tailwind CSS, GSAP, Framer Motion — already established in the codebase
- **Build target**: `npm run build` must succeed and export a fully static site
- **Reference fidelity**: The Walker School site is the design benchmark for layout, interactions, and motion quality
- **Brand adaptation**: Walker structure and interaction patterns must be translated to St. Elizabeth branding and content
- **No backend**: Forms or dynamic behavior must remain compatible with static hosting

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use The Walker School website as the primary visual and interaction reference | The goal is not broad inspiration but clone-level fidelity | — Pending |
| Keep the site static-export compatible | The project already targets static hosting and avoids backend complexity | — Pending |
| Treat existing implementation as a partial baseline rather than restart from scratch | The codebase already contains Walker-inspired patterns worth auditing and reusing | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-28 after initialization*
