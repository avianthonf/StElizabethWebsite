---
phase: quick
plan: 260427-wgf
type: execute
wave: 1
depends_on: []
files_modified:
  - src/components/sections/HeroMasked.tsx
  - src/components/layout/WalkHeader.tsx
  - src/app/globals.css
autonomous: true
requirements: []

must_haves:
  truths:
    - Hero text uses true SVG clip-path masking (not opacity-based effects)
    - Typography follows CSS custom properties from globals.css
    - Header transitions from transparent to solid white on scroll
    - Hero bottom spacing respects safe-area-inset-bottom
    - Scroll animations feel smooth and intentional (Walker School quality)
  artifacts:
    - path: src/components/sections/HeroMasked.tsx
      provides: SVG text mask implementation with GSAP zoom animation
      contains: "<mask id=\"hero-text-mask\">"
    - path: src/components/layout/WalkHeader.tsx
      provides: Ghost header with scroll-based transparency transition
      contains: "scrolled ? '#fff' : 'transparent'"
    - path: src/app/globals.css
      provides: Typography tokens and hero spacing utilities
      contains: "--font-heading"
  key_links:
    - from: src/components/sections/HeroMasked.tsx
      to: src/app/globals.css
      via: CSS custom properties
      pattern: "var\\(--font-heading\\)"
    - from: src/components/layout/WalkHeader.tsx
      to: window scroll events
      via: GSAP ScrollTrigger or native scroll listener
      pattern: "addEventListener.*scroll"
---

<objective>
Audit and fix the homepage hero/header to match Walker School design quality.

Purpose: Elevate visual fidelity and interaction polish to production-ready Walker School standards — true SVG masking, proper typography tokens, smooth scroll behavior, and ghost header transitions.

Output: Hero section with SVG text masking, header with transparent-to-solid scroll behavior, tightened typography, safe-area bottom spacing, and tuned scroll scrub feel.
</objective>

<execution_context>
@C:/Users/Avinash/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/Avinash/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@D:/Users/Avinash/Documents/StElizabethWebsite/.planning/STATE.md
@D:/Users/Avinash/Documents/StElizabethWebsite/CLAUDE.md
@D:/Users/Avinash/Documents/StElizabethWebsite/src/components/sections/HeroMasked.tsx
@D:/Users/Avinash/Documents/StElizabethWebsite/src/components/layout/WalkHeader.tsx
@D:/Users/Avinash/Documents/StElizabethWebsite/src/app/globals.css

## Current Implementation Analysis

**HeroMasked.tsx:**
- ✅ Already uses true SVG masking (not opacity-based) — `<mask id="hero-text-mask">` with white rect + black text
- ✅ GSAP zoom animation from scale 60 → 1 with wall fade
- ✅ Uses CSS custom properties for fonts (`var(--font-heading)`)
- ⚠️ Bottom spacing uses `clamp(40px, 8vh, 80px)` — needs safe-area-inset-bottom for iOS notch
- ⚠️ Typography tokens partially applied — mission block uses inline styles instead of utility classes

**WalkHeader.tsx:**
- ✅ Ghost header behavior already implemented — transparent at top, solid on scroll
- ✅ Listens to both vertical scroll and horizontal scroll progress events
- ✅ Smooth transition with `duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]`
- ⚠️ Scroll threshold is `scrollY > 100` for vertical, `progress > 0.05` for horizontal — may need tuning
- ✅ Uses CSS custom properties for fonts

**globals.css:**
- ✅ Typography tokens defined (`.text-hero`, `.text-h1`, `.text-overline`, `.walker-body`)
- ✅ CSS custom properties for fonts (`--font-heading`, `--font-body`, `--font-display`)
- ⚠️ No safe-area-inset utilities defined
- ✅ Easing curves defined (`--ease-smooth`, `--ease-out-expo`)

**Scroll scrub values (from grep):**
- `useHorizontalScroll.ts`: `scrub: 1` (1-second lag)
- `page.tsx`: `scrub: 1.2` (1.2-second lag for "heavy premium feel")
- `useClipMask.ts`: `scrub: 1`
- `useParallax.ts`: `scrub: true` (linked, no lag)

## Issues to Fix

1. **Safe-area bottom spacing:** Hero mission block needs `padding-bottom: env(safe-area-inset-bottom)` for iOS notch/home indicator
2. **Typography consistency:** Mission block should use utility classes from globals.css instead of inline styles
3. **Scroll scrub tuning:** Current `scrub: 1` may feel slightly sluggish — Walker School likely uses 1.5-2.0 for snappier feel
4. **Header scroll threshold:** `scrollY > 100` is arbitrary — should be tied to hero height percentage (e.g., 10vh)

## Interfaces

From `src/components/sections/HeroMasked.tsx`:
```typescript
export function HeroMasked({ heroImage = '/images/videocover2-812-optimized.webp' }: { heroImage?: string })
```

From `src/components/layout/WalkHeader.tsx`:
```typescript
export function WalkHeader()
// Listens to: 'horizontal-scroll-progress' event (detail.progress: 0-1)
// Listens to: 'scroll' event (window.scrollY)
```

From `src/app/globals.css`:
```css
/* Typography utilities */
.text-hero, .text-h1, .text-h2, .text-ui, .text-overline, .text-body-lg

/* CSS custom properties */
--font-heading, --font-body, --font-display
--color-primary-maroon, --color-text-dark
--ease-smooth, --ease-out-expo
```
</context>

<tasks>

<task type="auto">
  <name>Task 1: Fix hero bottom spacing and typography consistency</name>
  <files>
    src/components/sections/HeroMasked.tsx
    src/app/globals.css
  </files>
  <action>
**In `src/app/globals.css`:**
1. Add safe-area utility class after line 283 (`.hero-mission-block`):
```css
.hero-mission-safe-bottom {
  padding-bottom: max(clamp(40px, 8vh, 80px), env(safe-area-inset-bottom));
}
```

**In `src/components/sections/HeroMasked.tsx`:**
1. Replace mission block inline styles (lines 155-188) with utility classes:
   - Replace `style={{ position: 'absolute', bottom: 'clamp(40px, 8vh, 80px)', ... }}` with `className="hero-mission-block hero-mission-safe-bottom"`
   - Replace overline inline styles with `className="text-overline"`
   - Replace body text inline styles with `className="text-body-lg"`
   - Keep `maxWidth: 380` as inline style (component-specific constraint)

2. Update mission block structure to:
```tsx
<div className="hero-mission-block hero-mission-safe-bottom" style={{ maxWidth: 380 }}>
  <p className="text-overline" style={{ marginBottom: 10 }}>
    St. Elizabeth High School
  </p>
  <p className="text-body-lg" style={{ maxWidth: 320, color: 'rgba(255,255,255,0.85)' }}>
    Nurturing minds, hearts, and spirits through faith, excellence, and service since 1967.
  </p>
</div>
```

**Why:** Safe-area-inset-bottom ensures mission block doesn't get clipped by iOS home indicator. Utility classes reduce duplication and ensure consistency with design tokens.
  </action>
  <verify>
    <automated>npm run build && grep -n "hero-mission-safe-bottom" src/app/globals.css src/components/sections/HeroMasked.tsx</automated>
  </verify>
  <done>
    - Safe-area utility class exists in globals.css
    - Mission block uses utility classes for typography
    - Build succeeds without errors
    - Bottom spacing respects iOS safe area
  </done>
</task>

<task type="auto">
  <name>Task 2: Tune scroll scrub values for snappier Walker feel</name>
  <files>
    src/lib/hooks/useHorizontalScroll.ts
    src/components/sections/HeroMasked.tsx
  </files>
  <action>
**In `src/lib/hooks/useHorizontalScroll.ts`:**
1. Change `scrub: 1` to `scrub: 1.5` on lines 60 and 83
   - Rationale: Walker School's horizontal carousels feel snappier than 1-second lag. 1.5 provides smooth tracking without sluggishness.

**In `src/components/sections/HeroMasked.tsx`:**
1. No changes needed — hero zoom animation is progress-based (not ScrollTrigger scrub), so it inherits timing from parent horizontal scroll

**Why NOT change other scrub values:**
- `page.tsx` uses `scrub: 1.2` for "heavy premium feel" — intentionally slower, leave as-is
- `useClipMask.ts` uses `scrub: 1` for mask animations — fast enough, leave as-is
- `useParallax.ts` uses `scrub: true` (linked, no lag) — correct for parallax, leave as-is

**Testing note:** After implementation, verify horizontal scroll feels responsive but not jittery. If 1.5 feels too fast, revert to 1.2 as middle ground.
  </action>
  <verify>
    <automated>grep -n "scrub:" src/lib/hooks/useHorizontalScroll.ts | grep "1.5"</automated>
  </verify>
  <done>
    - useHorizontalScroll.ts uses scrub: 1.5 (two occurrences)
    - Horizontal scroll animations feel snappier and more responsive
    - No jitter or overshoot in scroll tracking
  </done>
</task>

<task type="auto">
  <name>Task 3: Improve header scroll threshold precision</name>
  <files>
    src/components/layout/WalkHeader.tsx
  </files>
  <action>
**In `src/components/layout/WalkHeader.tsx`:**
1. Replace hardcoded `scrollY > 100` threshold (line 40) with viewport-relative calculation:
```typescript
const handleVerticalScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.1);
```
   - Rationale: 10vh (10% of viewport height) is more semantically correct than arbitrary 100px. Works consistently across screen sizes.

2. Keep horizontal scroll threshold `progress > 0.05` unchanged — already viewport-relative and correct.

3. Add comment explaining threshold choice:
```typescript
// Trigger solid header after scrolling 10% of viewport height (vertical)
// or 5% of horizontal scroll progress (horizontal scroll-jacking)
const handleVerticalScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.1);
```

**Why:** Viewport-relative threshold ensures consistent behavior across devices (mobile, tablet, desktop). 10vh is a good balance — early enough to provide context, late enough to preserve hero transparency.
  </action>
  <verify>
    <automated>grep -n "window.innerHeight \* 0.1" src/components/layout/WalkHeader.tsx</automated>
  </verify>
  <done>
    - Header scroll threshold uses viewport-relative calculation (10vh)
    - Header transitions smoothly from transparent to solid
    - Threshold feels natural across all screen sizes
    - Comment documents threshold rationale
  </done>
</task>

</tasks>

<verification>
## Visual Verification

1. **Hero SVG masking:** Open homepage, verify "We Believe" text reveals background image through letter shapes (not opacity fade)
2. **Bottom spacing:** Test on iOS device or simulator — mission block should not be clipped by home indicator
3. **Header transition:** Scroll down slowly — header should transition from transparent to solid white at ~10% scroll
4. **Scroll feel:** Horizontal scroll sections should feel responsive and smooth, not sluggish or jittery

## Automated Checks

```bash
# Verify safe-area utility exists
grep "hero-mission-safe-bottom" src/app/globals.css

# Verify scrub values updated
grep "scrub: 1.5" src/lib/hooks/useHorizontalScroll.ts

# Verify viewport-relative threshold
grep "window.innerHeight" src/components/layout/WalkHeader.tsx

# Build succeeds
npm run build
```

## Regression Checks

- Existing scroll animations still work (values carousel, sticky sections)
- Mobile menu still functions correctly
- Hero zoom animation still triggers on horizontal scroll
- Typography remains consistent across all sections
</verification>

<success_criteria>
- [ ] Hero mission block uses safe-area-inset-bottom for iOS compatibility
- [ ] Typography uses utility classes from globals.css (not inline styles)
- [ ] Horizontal scroll scrub value is 1.5 (snappier feel)
- [ ] Header scroll threshold is viewport-relative (10vh)
- [ ] Build succeeds without errors
- [ ] Visual comparison to Walker School shows equivalent quality
- [ ] Scroll behavior feels smooth and intentional on all devices
</success_criteria>

<output>
After completion, create `.planning/quick/260427-wgf-validate-audit-and-fix-the-homepage-hero/260427-wgf-SUMMARY.md`
</output>
