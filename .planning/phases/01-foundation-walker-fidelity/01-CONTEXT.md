# Phase 1 Context: Foundation & Walker Fidelity

**Phase:** 1
**Phase Name:** Foundation & Walker Fidelity
**Created:** 2026-04-28
**Status:** Ready for planning

---

## Phase Goal

Bring the current brownfield homepage and navigation implementation to reliable Walker-reference parity without restarting the stack or changing the static-export architecture.

## What Is Already Decided

### 1. Treat Phase 1 as brownfield alignment, not a rewrite
- The existing codebase already contains the core Walker-inspired primitives: `src/app/page.tsx`, `src/components/layout/WalkHeader.tsx`, `src/components/sections/HeroMasked.tsx`, `src/components/sections/StickySplitSection.tsx`, and `src/lib/hooks/useHorizontalScroll.ts`.
- Planning should prioritize auditing, tightening, and refactoring these pieces before introducing any new structural abstractions.
- Rewrites are only justified when a current implementation blocks one of the roadmap success criteria.

### 2. Keep the current frontend stack and static-export constraints fixed
- Phase 1 must stay inside the existing Next.js App Router + static export + TypeScript + Tailwind + GSAP setup.
- No backend, CMS, SSR-only behavior, or runtime that would break `npm run build` → `out/` is allowed.
- GSAP stays the primary animation engine; `src/lib/gsap-config.ts` remains the shared plugin-registration point.

### 3. Homepage fidelity work should reuse the current section composition in `src/app/page.tsx`
- The homepage already sequences the main Walker-style patterns from a single composition root.
- Phase 1 should preserve this page-level orchestration while extracting or tightening only the sections that are currently too fragile, too inline, or too breakpoint-sensitive.
- Inline homepage-only helpers such as `ValueCard`, `PassionsPanel`, and `DivisionsTabsHorizontal` are acceptable to keep temporarily if that speeds parity, but planning should evaluate whether extraction is needed to make testing and iteration practical.

### 4. Horizontal scroll is the main technical risk and primary Phase 1 hardening target
- `src/lib/hooks/useHorizontalScroll.ts` is the controlling implementation for the Walker-style vertical-to-horizontal journey.
- The current implementation computes `travelDistance = scrollWidth - window.innerWidth`, pins with `end: '+=300%'`, and refreshes on resize.
- Phase 1 planning must explicitly cover:
  - recalculation after image load and late layout changes
  - dead-scroll / unreachable whitespace prevention
  - stable refresh behavior across breakpoints
  - Safari and mobile pinning resilience
  - reduced-motion fallback behavior
- The success criteria for the homepage journey should be enforced through deterministic measurements rather than visual guesswork alone.

### 5. Hero mask behavior should continue to be driven by the parent scroll journey
- `src/components/sections/HeroMasked.tsx` already avoids nested pinning and listens for `horizontal-scroll-hero` events.
- This event-driven relationship is the correct architectural direction for Phase 1 and should be preserved.
- Planning should focus on making the hero timing, scaling, layering, and asset loading reliable rather than replacing this pattern with an independent nested ScrollTrigger.

### 6. Ghost header behavior should continue to support both normal vertical pages and the homepage scroll-jacking flow
- `src/components/layout/WalkHeader.tsx` already listens to both `scroll` and `horizontal-scroll-progress`.
- That dual-mode behavior is required because the final site includes both the special homepage journey and conventional interior pages.
- Phase 1 planning must validate:
  - exact state transition threshold
  - z-index layering against hero/media/menus
  - desktop mega-menu hover stability
  - full-screen mobile menu behavior
  - keyboard escape/close behavior
  - no mismatch between homepage and interior-page header states

### 7. Walker placeholder imagery is acceptable during Phase 1, but leakage must be isolated and easy to replace
- `src/app/page.tsx` currently uses Walker-derived placeholder assets.
- Because Phase 2 depends on real St. Elizabeth photography, Phase 1 does not need final content replacement.
- However, planning should keep asset references centralized enough that Phase 2 can swap them cleanly without reopening layout logic.

### 8. Phase 1 must explicitly include motion/accessibility and layout-stability guardrails
- Roadmap success criteria already require reduced-motion support and low CLS.
- Planning cannot treat these as late polish.
- Phase 1 must include:
  - a reduced-motion behavior contract for GSAP-driven sections
  - image sizing / reservation rules to reduce layout shift
  - font/layout checks for the hero and header
  - breakpoint checks for overflow and clipping

### 9. Verification for Phase 1 must include real browser behavior, not only type/build checks
- Build success is necessary but insufficient.
- The phase plan must include browser-based validation of the homepage journey, navigation states, and breakpoint behavior.
- Because the repo already has Playwright configuration, Phase 1 planning should consider lightweight regression coverage for the most failure-prone homepage/navigation states.

---

## Gray Areas Closed During Discuss

### Reuse vs rewrite
Decision: Reuse the existing Walker-inspired implementation as the baseline and only rewrite narrow pieces that fail parity or stability requirements.

### GSAP integration strategy
Decision: Keep GSAP and the shared `src/lib/gsap-config.ts` singleton. Harden lifecycle, refresh, and measurement logic instead of introducing a different animation stack.

### Homepage composition strategy
Decision: Keep `src/app/page.tsx` as the orchestration root for Phase 1 and refine/extract selectively as needed.

### Header architecture
Decision: Preserve the existing dual-trigger ghost-header approach so the same header works for both horizontal-scroll and conventional pages.

### Hero architecture
Decision: Preserve the event-driven hero-mask pattern and avoid nested pinned timelines.

### Placeholder content policy
Decision: Allow placeholder imagery in Phase 1, but do not let asset placeholders become embedded in layout assumptions that would block Phase 2 swaps.

---

## Planning Constraints

1. Do not restart homepage structure from zero.
2. Do not introduce backend-dependent features.
3. Do not solve Phase 2 content work inside Phase 1.
4. Do not add decorative deviations that move away from Walker parity.
5. Prefer targeted refactors over broad abstraction passes.
6. Every Phase 1 task should map back to one or more of: fidelity, navigation correctness, scroll stability, responsive stability, reduced motion, CLS, or static build safety.

---

## Likely Planning Buckets

1. Homepage scroll journey audit and measurement hardening
2. Hero mask timing, layering, and load stability
3. Header + mega-menu + mobile overlay parity
4. Walker homepage section parity across breakpoints
5. Reduced-motion / CLS / Safari guardrails
6. Build and browser verification

---

## Evidence Used

- `.planning/ROADMAP.md`
- `.planning/PROJECT.md`
- `.planning/STATE.md`
- `src/app/page.tsx`
- `src/components/layout/WalkHeader.tsx`
- `src/components/sections/HeroMasked.tsx`
- `src/components/sections/StickySplitSection.tsx`
- `src/lib/hooks/useHorizontalScroll.ts`
- `src/lib/gsap-config.ts`
