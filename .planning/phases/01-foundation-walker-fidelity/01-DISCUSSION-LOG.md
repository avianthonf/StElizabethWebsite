# Phase 1 Discussion Log: Foundation & Walker Fidelity

**Phase:** 1
**Date:** 2026-04-28
**Mode:** Auto discuss
**Status:** Complete

## Discussion Method

Auto mode was used. Decisions were derived from the existing roadmap, state, codebase maps, and current Phase 1 source files rather than by asking additional questions.

## Inputs Reviewed

- `.planning/PROJECT.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/codebase/STACK.md`
- `.planning/codebase/STRUCTURE.md`
- `.planning/codebase/CONVENTIONS.md`
- `src/app/page.tsx`
- `src/components/layout/WalkHeader.tsx`
- `src/components/sections/HeroMasked.tsx`
- `src/components/sections/StickySplitSection.tsx`
- `src/lib/hooks/useHorizontalScroll.ts`
- `src/lib/gsap-config.ts`

## Gray Areas Considered

### 1. Should Phase 1 rebuild the homepage from scratch?
Decision: No. The existing homepage implementation is the brownfield baseline. Phase 1 should tighten and refactor only where the current implementation fails fidelity or stability.

### 2. Should the animation stack change?
Decision: No. Keep GSAP and the current shared registration model in `src/lib/gsap-config.ts`.

### 3. Should the hero own its own ScrollTrigger?
Decision: No. Keep the event-driven hero progression to avoid nested pinning conflicts.

### 4. Should the header be split into separate homepage/interior implementations?
Decision: No. Keep one ghost-header system that responds to both conventional vertical scroll and homepage horizontal-scroll progress.

### 5. Is real St. Elizabeth photography required before Phase 1 can proceed?
Decision: No. Placeholder assets are acceptable for Phase 1 fidelity work, but their usage should remain easy to replace in Phase 2.

### 6. Are motion/accessibility/CLS concerns Phase 3-only work?
Decision: No. Phase 1 must establish the contract for reduced motion, pinning stability, and low layout shift because these directly affect homepage fidelity.

## Result

Phase 1 now has enough locked context to begin detailed planning.
