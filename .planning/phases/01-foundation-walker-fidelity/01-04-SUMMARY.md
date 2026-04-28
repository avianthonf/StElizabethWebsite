---
phase: 01-foundation-walker-fidelity
plan: 04
type: summary
status: completed
---

# 01-04 Summary — Homepage Walker Fidelity Hardening

## Outcome
Completed the final Phase 1 homepage hardening pass for Walker-inspired content sections. The homepage now ships with corrected horizontal scroll rebuild behavior, responsive StickySplit layout safety, broader reduced-motion coverage, direct motion regression tests, and successful static export verification.

## What changed

### Homepage scroll and section composition
- Hardened `src/app/page.tsx` horizontal scroll lifecycle so image load, window load, and resize rebuild measurements before `ScrollTrigger.refresh()`.
- Fixed effect cleanup so load/resize listeners are removed correctly and debounced callbacks are cancelled on unmount.
- Reduced accidental complexity in homepage image-load handling to a single page-level callback.
- Preserved all 9 homepage sections while keeping scroll-driven composition intact.

### CLS and image-load stability
- Added image `onLoad` refresh handling across homepage sections so late-loading assets trigger updated scroll measurements.
- Kept aspect-ratio reservation behavior on value cards and stabilized scroll container height calculations after assets load.
- Verified homepage image loads update section height/min-height correctly under test.

### StickySplitSection responsive hardening
- Updated `src/components/sections/StickySplitSection.tsx` to support mobile stacking under 768px.
- Replaced render-time `window.innerWidth` branching with client-side state updated from an effect, avoiding hydration mismatch.
- Added overflow guards and responsive imagery sizing for left and right image columns.
- Improved image accessibility labels for featured and gallery imagery.

### Reduced-motion support
- Added `src/lib/hooks/usePrefersReducedMotion.ts`.
- Homepage horizontal scroll now skips GSAP motion creation when reduced motion is preferred while still preserving measurements and refresh behavior.
- `HeroMasked` now respects reduced motion by skipping the GSAP timeline and applying the static end state immediately.
- Divisions tab button transitions and StickySplit accordion transitions now become instant when reduced motion is enabled.
- Added global CSS fallback in `src/app/globals.css` via `@media (prefers-reduced-motion: reduce)` to disable smooth scrolling and collapse motion-heavy transitions/animations.
- Hardened the reduced-motion hook for legacy Safari-style media query listeners (`addListener` / `removeListener`) and initialized the hook from the real client preference to avoid a hydration-time false default.

### Verification-related fixes outside the homepage surface
- Removed stale `Footer` usage from `src/components/templates/ContentPage.tsx` to unblock repo type-checking.
- Scoped `vitest.config.ts` to app/source tests so Playwright specs and `.claude/worktrees` are not executed by Vitest.
- Added `metadataBase` in `src/app/layout.tsx` to eliminate the localhost metadata warning during build.

## Tests added or strengthened
- `src/app/page.test.tsx`
  - homepage sections render after mount
  - window `load` rebuilds horizontal scroll
  - image load updates measurements and triggers refresh
  - reduced-motion mode skips GSAP horizontal animation
  - horizontal animation keeps `invalidateOnRefresh`
- `src/components/sections/StickySplitSection.test.tsx`
  - mobile layout switches to single-column
  - accordion transitions are disabled under reduced motion
- `src/components/sections/HeroMasked.test.tsx`
  - reduced-motion mode skips timeline setup and applies static GSAP state
  - hero scroll listener registers and cleans up only when motion is allowed
- `src/lib/hooks/usePrefersReducedMotion.test.ts`
  - modern media query listener API path
  - legacy media query listener fallback path
  - legacy callback updates hook state correctly
- `src/lib/hooks/useHorizontalScroll.test.ts`
  - debounce timing corrected to match implementation
  - cleanup coverage expanded to verify both resize and load listener removal

## Verification run

### Automated checks completed
- `npx vitest run src/app/page.test.tsx src/components/sections/StickySplitSection.test.tsx src/components/sections/HeroMasked.test.tsx src/lib/hooks/usePrefersReducedMotion.test.ts`
- `npx vitest run src/lib/hooks/usePrefersReducedMotion.test.ts src/components/sections/HeroMasked.test.tsx`
- `npx tsc --noEmit`
- `npm run build`

### Results
- Targeted unit/regression suites passed.
- TypeScript check passed.
- Production build passed, including static prerendering for all app routes.
- Homepage smoke checks reported no obvious structural regressions after motion changes.

## Phase 1 requirements status
- **FND-05** — satisfied: homepage Walker-inspired content patterns present and functional.
- **FND-06** — substantially satisfied: responsive behavior hardened for StickySplit and homepage section interactions.
- **FND-08** — satisfied for implemented surfaces: homepage scroll, hero, accordion, tabs, and global CSS fallback now respect reduced motion.
- **FND-09** — satisfied for this pass: image-load measurement refresh and aspect-ratio reservation reduce major CLS risk on the homepage.
- **FND-10** — satisfied: static build/export succeeds.

## Remaining follow-up
- Final human approval checkpoint from the plan is still external/manual and was not completed in this summary file.
- Repo-wide lint noise remains outside the scope of this phase summary, especially from unrelated files and `.claude/worktrees` content if lint is run broadly.
- If Phase 2 continues homepage polish, the next likely work would be deeper visual parity tuning and any remaining Lighthouse/CLS benchmarking.

## Files most central to this summary
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/components/sections/HeroMasked.tsx`
- `src/components/sections/StickySplitSection.tsx`
- `src/lib/hooks/usePrefersReducedMotion.ts`
- `src/app/page.test.tsx`
- `src/components/sections/HeroMasked.test.tsx`
- `src/components/sections/StickySplitSection.test.tsx`
- `src/lib/hooks/usePrefersReducedMotion.test.ts`
- `src/lib/hooks/useHorizontalScroll.test.ts`
- `src/lib/hooks/useHorizontalScroll.ts`
- `vitest.config.ts`
