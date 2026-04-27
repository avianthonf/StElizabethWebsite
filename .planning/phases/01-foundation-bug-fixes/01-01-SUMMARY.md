---
phase: 01-foundation-bug-fixes
plan: 01
subsystem: testing-infrastructure, gsap-animations
tags: [testing, vitest, gsap, bug-fix, horizontal-scroll]
dependency_graph:
  requires: []
  provides: [vitest-setup, gsap-singleton, horizontal-scroll-resize]
  affects: [src/lib/hooks/useHorizontalScroll.ts, src/lib/gsap-config.ts]
tech_stack:
  added: [vitest, @vitest/ui, @testing-library/react, @testing-library/jest-dom, jsdom, @vitejs/plugin-react]
  patterns: [singleton-pattern, debounce-pattern, tdd]
key_files:
  created:
    - vitest.config.ts
    - vitest.setup.ts
    - src/lib/hooks/useHorizontalScroll.test.ts
  modified:
    - package.json
    - src/lib/gsap-config.ts
    - src/lib/hooks/useHorizontalScroll.ts
decisions:
  - title: Use Vitest over Jest
    rationale: Better Next.js integration, faster execution, native ESM support
  - title: 150ms debounce delay for resize handler
    rationale: Balance between responsiveness and performance, prevents excessive recalculations
  - title: Singleton pattern for GSAP plugin registration
    rationale: Prevents double-registration warnings in React strict mode
metrics:
  duration_seconds: 253
  tasks_completed: 3
  files_modified: 6
  tests_added: 4
  completed_date: 2026-04-27
---

# Phase 01 Plan 01: Fix GSAP bugs + add Vitest testing infrastructure Summary

**One-liner:** Established Vitest testing infrastructure with jsdom environment and fixed GSAP plugin double-registration plus horizontal scroll resize bugs using singleton and debounce patterns.

## Objective Achieved

Fixed critical GSAP bugs that broke scroll animations on resize and caused console warnings, then established testing infrastructure to prevent regressions. Users can now resize browser windows without breaking horizontal scroll animations, and developers have a working test suite for GSAP hooks.

## Tasks Completed

### Task 1: Set up Vitest testing infrastructure
- **Commit:** f04dbc7
- **Files:** package.json, vitest.config.ts, vitest.setup.ts
- **Changes:**
  - Installed vitest@^4.1.5, @vitest/ui@^4.1.5, @testing-library/react@^16.3.2, @testing-library/jest-dom@^6.6.3, jsdom@^25.0.1, @vitejs/plugin-react@^4.3.4
  - Created vitest.config.ts with jsdom environment, @ path alias matching tsconfig.json, and 80% coverage thresholds
  - Created vitest.setup.ts importing @testing-library/jest-dom/vitest matchers
  - Added test, test:ui, test:coverage scripts to package.json

### Task 2: Fix GSAP plugin double-registration with singleton pattern
- **Commit:** 77ff646
- **Files:** src/lib/gsap-config.ts
- **Changes:**
  - Added `let pluginsRegistered = false;` singleton guard
  - Modified registration check to `if (typeof window !== 'undefined' && !pluginsRegistered)`
  - Set `pluginsRegistered = true;` after successful registration
  - Prevents GSAP plugin double-registration warnings in React strict mode

### Task 3: Fix horizontal scroll resize handler with debounce (TDD)
- **Commit:** b71d930
- **Files:** src/lib/hooks/useHorizontalScroll.ts, src/lib/hooks/useHorizontalScroll.test.ts
- **Changes:**
  - **RED:** Created useHorizontalScroll.test.ts with 4 test cases (initial calculation, resize recalculation, debounce behavior, cleanup)
  - **GREEN:** Added debounce utility function with 150ms delay
  - **GREEN:** Added resize event listener that recalculates travel distance and calls ScrollTrigger.refresh()
  - **GREEN:** Added cleanup to remove resize listener on unmount
  - All 4 tests passing

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

- ✅ Running `npm test` executes Vitest successfully
- ✅ All 4 tests in useHorizontalScroll.test.ts pass
- ✅ vitest.config.ts has jsdom environment and @ path alias
- ✅ vitest.setup.ts imports jest-dom matchers
- ✅ package.json has test scripts (test, test:ui, test:coverage)
- ✅ src/lib/gsap-config.ts contains singleton guard (`pluginsRegistered` flag)
- ✅ src/lib/hooks/useHorizontalScroll.ts contains debounce function
- ✅ src/lib/hooks/useHorizontalScroll.ts contains resize event listener
- ✅ src/lib/hooks/useHorizontalScroll.ts contains ScrollTrigger.refresh() call
- ✅ Resize listener cleanup on unmount

## Known Stubs

None - all functionality is fully implemented.

## Self-Check: PASSED

### Files Created
```bash
✓ vitest.config.ts exists
✓ vitest.setup.ts exists
✓ src/lib/hooks/useHorizontalScroll.test.ts exists
```

### Files Modified
```bash
✓ package.json modified (test scripts added)
✓ src/lib/gsap-config.ts modified (singleton pattern)
✓ src/lib/hooks/useHorizontalScroll.ts modified (resize handler)
```

### Commits Exist
```bash
✓ f04dbc7 - test(01-01): add vitest testing infrastructure
✓ 77ff646 - fix(01-01): prevent GSAP plugin double-registration
✓ b71d930 - feat(01-01): add resize handler with debounce to horizontal scroll
```

### Tests Pass
```bash
✓ Test Files: 1 passed (1)
✓ Tests: 4 passed (4)
```

## Impact

**User Experience:**
- Horizontal scroll carousel now works correctly after browser resize or device rotation
- No more GSAP console warnings polluting developer tools
- Smooth, debounced resize handling prevents performance issues

**Developer Experience:**
- Testing infrastructure in place for all future development
- TDD workflow established with passing example tests
- Path aliases configured consistently between tsconfig.json and vitest.config.ts
- 80% coverage thresholds enforced

**Technical Debt Resolved:**
- FOUND-01: GSAP plugin double-registration fixed with singleton pattern
- FOUND-02: Horizontal scroll resize bug fixed with debounced handler
- FOUND-04: Test coverage gap addressed with Vitest setup and first test suite

## Next Steps

1. Add tests for other custom hooks (useScrollProgress, useClipMask, useScrollDirection, useParallax)
2. Add component tests for critical sections (Header, Footer, Hero)
3. Consider adding E2E tests with Playwright for scroll animations
4. Monitor console for any remaining GSAP warnings in production
