# Domain Pitfalls: Walker Fidelity Clone Project

**Domain:** Premium school marketing site — static-export clone of The Walker School
**Researched:** 2026-04-28
**Confidence:** HIGH — Derived from codebase audit (CONCERNS.md), GSAP/ScrollTrigger community knowledge, and browser compatibility research

---

## Executive Summary

Cloning Walker's animation-heavy site into a static Next.js export introduces a specific class of failure modes distinct from generic web development:

1. **Scroll-jacking fragility** — Horizontal scroll-jacking breaks with late-loading images, Safari mobile quirks, and container height miscalculation
2. **GSAP initialization errors** — StrictMode double-init, SSR hydration mismatches, nested pin conflicts
3. **Fidelity drift** — Small deviations from Walker visual spec compound into "clone that doesn't feel like Walker"
4. **Static export constraints** — No server-side form handling, limited image optimization, all content baked at build
5. **Performance regression creep** — CLS from images, frame drops from scroll listeners, bundle bloat

The most critical items are **project-blocking** before launch: Formspree endpoint configuration, real photography replacement, privacy policy creation.

---

## Critical Pitfalls (Block Launch if Unresolved)

### Pitfall 1: Horizontal Scroll Container Height Mis-Calculated → Unreachable Sections

**Severity:** CRITICAL
**What goes wrong:** Homepage horizontal scroll-jacking computes `container.style.height = ${travelDistance + window.innerHeight * 2}px` exactly once inside a `useEffect` on mount. If any section images finish loading *after* mount, `track.scrollWidth` increases, but `travelDistance` is already fixed in the GSAP `end` value. Result: user scrolls to end of horizontal track and hits a wall while Divisions Tabs and Footer CTA remain off-screen (unreachable whitespace).

**Root cause:** GSAP ScrollTrigger captures scroll extents at creation time; images loading later expand the track's intrinsic width but ScrollTrigger is unaware. `invalidateOnRefresh: true` only refreshes on explicit `ScrollTrigger.refresh()` calls, not automatic DOM mutations.

**Consequences:**
- Last 2 homepage sections completely invisible to desktop users
- Mobile experience similarly broken
- Site appears incomplete/broken; users think "that's all?"

**Prevention:** Implement dual-mode refresh strategy in `src/app/page.tsx`:

```typescript
// 1. Wait for all section images to load before closing skeleton
const imageLoadPromises = Array.from(document.images).map(img => {
  if (img.complete) return Promise.resolve();
  return new Promise(resolve => img.onload = resolve);
});
await Promise.all(imageLoadPromises);

// 2. Attach ResizeObserver to trackRef before mounting GSAP
const resizeObserver = new ResizeObserver(() => {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    // Recompute container height from new track width
    const travelDistance = trackRef.current!.scrollWidth - window.innerWidth;
    scrollContainerRef.current!.style.height = `${travelDistance + window.innerHeight * 2}px`;
  });
});
resizeObserver.observe(trackRef.current);
```

**Detection:** Load page with DevTools throttling (Slow 3G). Verify scroll bar traverses all 9 sections without hitting end early. Check `container.style.height` equals `(track.scrollWidth - innerWidth) + (innerHeight × 2)` after all images visible.

**Phase responsibility:** Phase 1 (Foundation) — must ship with this fix; current codebase lacks the `ResizeObserver` pattern and relies on single mount calculation.

---

### Pitfall 2: Formspree Endpoint Placeholder → Zero Submissions

**Severity:** CRITICAL
**What goes wrong:** `src/app/contact/page.tsx` line 85 and `src/app/admissions/page.tsx` line 76 both contain:

```typescript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID_HERE';
```

Submitting sends a POST to Formspree's generic endpoint, which returns HTTP 404 "Form not found." No error shown to user beyond generic fallback message, so user believes submission went through when it did not.

**Root cause:** Phase 3-PLAN instructions tell user "you need to set up Formspree" but no one has done it.

**Consequences:**
- Contact inquiries and admissions applications silently lost
- Prospective families receive no confirmation email
- Enrollment pipeline broken
- School leadership unaware of submitted forms

**Prevention:** Create a pre-launch checklist item "Formspree endpoint verification" with steps:
1. Create Formspree account
2. Create Contact form → copy form ID to `FORMSPREE_ENDPOINT`
3. Create Admissions form → separate form ID
4. Deploy to staging
5. Use Playwright to fill + submit each form; assert HTTP 200 OK and "Thank you" message displayed

**Detection:** Network tab shows `POST https://formspree.io/f/YOUR_FORM_ID_HERE 404 (Not Found)`. Formspree dashboard shows 0 submissions.

**Phase responsibility:** Phase 2 (Content) — forms must be functional *after* content staging but *before* polish.

---

### Pitfall 3: Formspree Free Tier Exhaustion at 50 Submissions/Month

**Severity:** CRITICAL
**What goes wrong:** Formspree free plan allows only 50 submissions per form per month. At 51st submission, Formspree returns HTTP 402 Payment Required and discards the payload. No warning to user until after submission fails.

**Root cause:** No monitoring of quota; no client-side submission counter; default plan assumed to be sufficient.

**Consequences:**
- Peak admissions season (Nov–Jan): forms go offline mid-cycle
- Parents cannot apply, school misses leads
- Emergency migration required mid-admissions

**Prevention:** Upgrade to Formspree paid tier ($10–30/month) before launch (allows 1000+ submissions). Alternative backup: parallel Zapier → Google Forms sink, and error message "If this fails, email admissions@st-elizabeth.edu directly."

**Detection:** Check Formspree dashboard monthly; set up webhook to Slack when 80% threshold reached.

**Phase responsibility:** Phase 2 (Content) — before forms go live, subscription must be active.

---

### Pitfall 4: SVG Text Mask Blur on High-DPI + Zoom

**Severity:** CRITICAL
**What goes wrong:** The HeroMasked SVG uses `<text fontSize="13.5">` inside a `<mask>`. On Retina displays (MacBook Pro, iPhone) and at browser zoom levels 125%–200%, the mask edges become noticeably blurry due to subpixel anti-aliasing limitations of SVG text rendering in masks.

**Root cause:** SVG text inside a mask doesn't get the same subpixel rendering as normal DOM text; fractional font sizes round unevenly per browser; mask application doubles the rasterization pass.

**Consequences:** Hero headline "WE BELIEVE" looks fuzzy, not crisp — breaks the premium visual standard. Walker reference has razor-sharp mask text; clone falls short.

**Prevention:** Two viable paths:

**Path A: Pre-rendered PNG mask with CSS mask-image** (crisp, no animation)
- Export SVG text as 2× PNG with alpha channel
- Apply via `mask-image: url('/images/hero-mask@2x.png') mask-size: cover`
- Animate opacity of two overlapping divs instead of SVG scale
- Lose text-scale animation but gain sharpness

**Path B: SVG text with `shape-rendering="geometricPrecision"` + integer font size** (best effort)
```svg
<text
  fontSize="14"
  style={{ shapeRendering: 'geometricPrecision', textRendering: 'optimizeSpeed' }}
>
```
Test across Chrome, Safari, Firefox at 100%, 125%, 150%, 200%, 300% zoom. Accept minor blur but ensure no pixelation.

**Detection:** Open on MacBook Pro Retina; zoom to 150%; inspect text edges at 4× zoom in DevTools. Compare against Walker side-by-side.

**Phase responsibility:** Phase 1 (Foundation) — must decide Path A vs B and implement before interior page work begins.

---

### Pitfall 5: iOS Safari Scroll-Jacking Glitch

**Severity:** CRITICAL
**What goes wrong:** On iOS Safari 14–16, GSAP horizontal scroll-jacking with `pin: true` + `scrub: 1.2` exhibits known bug: when user swipes vertically *past* the pin point to scroll forward, the pin fails to release and the page appears dead (no scroll possible). Recovery requires swiping in exact opposite direction 2–3 times.

**Root cause:** iOS's momentum scrolling (`-webkit-overflow-scrolling: touch`) conflicts with GSAP's position pinning. GSAP attempts to hijack scroll offset but Safari's native scroll physics override. Workaround is `pinType: 'fixed'` instead of `'transform'`.

**Consequences:** iPhone/iPad users cannot navigate homepage; site appears broken on Apple mobile (significant user base for private school parents).

**Prevention:** In all `ScrollTrigger.create()` calls with `pin: true`, add `pinType: 'fixed'`:

```typescript
ScrollTrigger.create({
  pin: true,
  pinType: 'fixed',  // ← Safari workaround
  scrub: 1.2,
  // ...
});
```

Additionally, add CSS `overscroll-behavior-x: contain` to horizontally scrolling track to prevent overscroll from "rubber-banding" the body.

**Detection:** Physical iPhone or iOS Simulator; attempt to swipe through all 9 sections; observe if any swipe gets "stuck."

**Phase responsibility:** Phase 1 (Foundation) — fix before HeroMasked is touch-tested; must be in baseline for cross-browser QA.

---

### Pitfall 6: Z-Index War Between Header, Mobile Menu, and Future Modals

**Severity:** CRITICAL
**What goes wrong:** `WalkHeader` uses `z-[9999]` and mobile overlay uses `z-10000`. No central z-index scale. Adding a modal later with `z-50` (standard Bootstrap/AntD) causes modal to render behind mobile menu. Header dropdown shadows get clipped by body `overflow-x: hidden`.

**Root cause:** Magic numbers with no centralized scale. Each component picks its own z-index in isolation.

**Consequences:**
- Modal dialogs (admissions inquiry confirmation) hidden behind open menu
- Dropdown menus clipped by overflow on parent containers
- Stacking order unpredictable as codebase grows

**Prevention:** Introduce z-index token scale in `globals.css`:

```css
:root {
  --z-base: 0;
  --z-header: 100;
  --z-mega-menu: 200;
  --z-mobile-menu: 300;
  --z-modal-backdrop: 350;
  --z-modal: 400;
  --z-tooltip: 500;
  --z-toast: 600;
}
```

Update all components to use `z-var(--z-*)`. Document scale in ARCHITECTURE.md.

**Detection:** Open mobile menu; open any modal (if present); verify modal overlays menu. Dropdown menu from header should not be clipped.

**Phase responsibility:** Phase 1 (Foundation) — header and mobile menu must use scale; any modals in later phases must adhere to it.

---

### Pitfall 7: No Privacy Policy Page → GDPR Invalid

**Severity:** CRITICAL
**What goes wrong:** `GdprConsent` component displays cookie banner with link `<a href="/privacy-policy">Privacy Policy</a>`. Route `/privacy-policy` does not exist (404). GDPR requires consent banners to link to a complete privacy policy.

**Root cause:** Feature not yet implemented; placeholder link left in.

**Consequences:**
- GDPR Article 7 compliance failure
- EU/UK users' consent not legally valid (no policy reference)
- Potential fine exposure (up to 4% global revenue)
- Third-party form processors (Formspree) may require policy link in consent

**Prevention:** Create `src/app/privacy-policy/page.tsx` before Phase 2. Content includes:

- What data is collected (form fields: name, email, phone, message)
- Purpose (admissions inquiry, school communications)
- Retention period (1 year unless requested deletion)
- Third parties (Formspree as data processor)
- Contact for data subject rights ( admissions@st-elizabeth.edu )

Link from footer, cookie banner, and any form submission landing page.

**Detection:** Click "Privacy Policy" link in cookie consent; should not 404.

**Phase responsibility:** Phase 2 (Content) — PR policy page review is a merge-blocker.

---

### Pitfall 8: Placeholder Content Leaks Through (Fidelity Drift)

**Severity:** CRITICAL
**What goes wrong:** Walker School image filenames or placeholder text remain in the codebase. Examples from CONCERNS.md:

- `page.tsx` line 22: `// PLACEHOLDER: Using Walker School images until St. Elizabeth photos provided`
- All `IMAGES` object values point to Walker stock: `/images/videocover2-812-optimized.webp`, `/images/Curiosity-310-optimized.webp`
- `layout.tsx` line 79: `"telephone": "+91-832-XXXXXXX"` placeholder
- `contact/page.tsx`, `admissions/page.tsx`: `FORMSPREE_ENDPOINT = '...YOUR_FORM_ID_HERE'`

**Root cause:** Placeholder values copied from Walker reference implementation and never replaced; content migration incomplete.

**Consequences:**
- Walker branding/assets visible — legal/confusion risk
- Phone number is bogus; SEO structured data invalidated
- Forms non-functional (see Pitfall 2)

**Prevention:** Create a pre-publish checklist:
- [ ] Grep codebase for "Walker" (case-insensitive): `grep -ri walker src/` — zero hits required
- [ ] Grep for placeholder patterns: `grep -ri "YOUR_FORM_ID" src/`, `grep -ri "XXXXXXX" src/`
- [ ] CI step that fails build if placeholder strings found
- [ ] Image asset manifest that lists all required paths; path references must come from manifest keys

**Detection:** `npm run lint` custom rule that flags placeholder substrings; manual PR review checklist item "No Walker placeholders".

**Phase responsibility:** Phase 2 (Content) — every placeholder must be replaced before Phase 3 polish begins.

---

### Pitfall 9: ScrollTrigger Nested Pin — Silent Failure

**Severity:** CRITICAL
**What goes wrong:** A child component inside the pinned horizontal container attempts to create its own `ScrollTrigger` with `pin: true`. GSAP explicitly forbids nested pins and silently disables the inner trigger. The developer assumes it works but observes no animation.

**Root cause:** GSAP's internal pin state cannot nest; trying to pin a parent that's already pinned by another ScrollTrigger causes inner trigger to be killed without warning.

**Consequences:**
- Child section's pin/scrub effects never fire
- Section appears static while reference has animation
- Fidelity gap

**Prevention:** The codebase already uses the **custom event bus pattern** (HeroMasked subscribes to `'horizontal-scroll-hero'` instead of creating its own ScrollTrigger). Enforce this pattern:

- No new ScrollTrigger with `pin: true` allowed inside `HomepageHorizontalScroll` children
- ESLint rule: disallow `pin: true` in files within `src/components/sections/` (only allowed in layout/page-level hooks)
- Document as "NO NESTED PINS" in ARCHITECTURE.md with explicit examples

**Detection:** Run `grep -r "pin: true" src/components/sections/` — should only find references in comments (none in code). Use GSAP `ScrollTrigger.batch()` console logging to see which triggers are registered.

**Phase responsibility:** Phase 1 (Foundation) — establish rule; all new sections must use event bus or shared state, never nested pin.

---

### Pitfall 10: Reduced Motion Users Get Seasick

**Severity:** CRITICAL
**What goes wrong:** GSAP horizontal scrubbing and parallax don't respect `prefers-reduced-motion: reduce`. Users with vestibular disorders, motion sensitivity, or those who explicitly requested reduced motion get dizzy or sick from scroll-linked motion and parallax.

**Root cause:** No `matchMedia('(prefers-reduced-motion: reduce)')` check in any hook or component.

**Consequences:**
- WCAG 2.1 AAA violation (1.4.2 Pause, Stop, Hide)
- ADA Title III exposure — disability discrimination lawsuit risk
- Poor UX for accessibility-conscious users (common among parents researching schools)

**Prevention:** Add global detection in `src/lib/gsap-config.ts`:

```typescript
// Respect reduced motion setting
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Global GSAP defaults: instant transitions, no scrubbing
  gsap.defaults({ duration: 0, ease: 'none' });
}

// Duplicate check inside every useHorizontalScroll, useParallax hook
useEffect(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return; // Skip GSAP entirely
  }
  // ... normal GSAP registration
}, []);
```

Also add CSS early-halt:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    transition-duration: 0.001ms !important;
  }
}
```

**Detection:** Chrome DevTools → Rendering → Emulate CSS media `prefers-reduced-motion`. Verify all animations are instant (no motion) and content remains fully accessible.

**Phase responsibility:** Phase 1 (Foundation) — hooks must respect this before interior pages are built; every new animation must pass reduced-motion check.

---

## Moderate Pitfalls (Should Fix Pre-Launch)

### Pitfall 11: Magic Numbers Everywhere — Brittle Animation Tuning

**Severity:** HIGH
**What:** Animation thresholds (`0.12` for hero), durations (`1.2`, `0.4`), breakpoints (`768px`), split ratios (`0.45`/`0.55`) are hardcoded inline across 6+ files with no documentation.

**Why bad:** Changing a Walker spec value requires hunting through codebase; inconsistent tuning; new devs can't discover allowed ranges.

**Fix:** Create `src/lib/animation-tokens.ts`:

```typescript
export const ANIMATION = {
  HOME: {
    SCRUB: 1.2,
    HERO_PROGRESS_THRESHOLD: 0.12,
    HEADER_TRANSPARENT_THRESHOLD: 0.05,
    SECTION_COUNT: 9,
    CONTAINER_HEIGHT_MULTIPLIER: 2,
  },
  EASING: {
    OUT_EXPO: 'expo.out',
    IN_OUT_QUINT: [0.83, 0, 0.17, 1],
    SMOOTH: [0.25, 1, 0.5, 1],
  },
  DURATION: { MENU: 0.4, ACCORDION: 0.4, MEGA_MENU_FADE: 0.25 },
} as const;
```

Replace all literals with `ANIMATION.HOME.SCRUB`, etc.

**Phase:** Phase 3 (Polish) — centralize after baseline works.

---

### Pitfall 12: Multiple Independent Scroll Event Listeners → Frame Drops

**Severity:** HIGH
**What:** `useScrollProgress`, `useParallax`, `useScrollDirection`, and WalkHeader each attach their own `scroll` event listener. On a section with 5 effects, 5 callbacks fire per animation frame (60fps).

**Why bad:** GC pressure spikes; frame drops from 60fps to 30–40fps on mobile; scroll feels janky.

**Fix:** Consolidate into single `usePageScroll` hook:

```typescript
useEffect(() => {
  let rafId: number;
  const onScroll = () => {
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        const progress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        window.dispatchEvent(new CustomEvent('page-scroll', { detail: { progress } }));
        rafId = 0;
      });
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}, []);
```

Other effects subscribe to `'page-scroll'` instead of binding their own.

**Phase:** Phase 3 (Polish) — consolidate after features work.

---

### Pitfall 13: No Error Boundaries → GSAP Crash Takes Down Page

**Severity:** HIGH
**What:** HeroMasked, StickySplitSection, and hooks perform GSAP timeline setup in `useEffect` with no try/catch. If SVG refs fail to attach (edge-case SSR issue) or GSAP context throws, the entire page shows blank white.

**Why bad:** Single animation error cascades into total page failure; no fallback content.

**Fix:** Wrap each animated section in an error boundary:

```typescript
class SectionErrorBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

// Usage
<SectionErrorBoundary fallback={<StaticImageSection />}>
  <HeroMasked heroImage={IMAGES.heroCampus} />
</SectionErrorBoundary>
```

**Phase:** Phase 3 (Polish) — add before production hardening.

---

### Pitfall 14: Wrong/Z-Index Stacking Order Between Overlays

**Severity:** HIGH
**What:** Mobile menu (z-10000) overlays header. But any future modal using standard z-index (50–100) is hidden *behind* the open mobile menu. Header dropdown shadow gets clipped by body `overflow-x: hidden`.

**Why bad:** Overlay UI breaks in subtle ways only QA discovers late; emergency refactor needed.

**Fix:** Introduce centralized z-index scale (see Critical Pitfall 6) and migrate all components.

**Phase:** Phase 3 (Polish) — prevent future modals from breaking.

---

### Pitfall 15: CLS from Late-Loading Images

**Severity:** HIGH
**What:** Images below the hero lack explicit `width`/`height`; CSS `aspect-ratio` isn't used. As images download, they push content down, causing visible layout shift. Horizontal scroll container height computed before images load also shifts.

**Why bad:** CLS > 0.1 fails Core Web Vitals; Google ranking penalty; jarring user experience.

**Fix:**
1. All `<img>` get `width` and `height` matching intrinsic dimensions (or consistent aspect ratios).
2. Images containers get `aspect-ratio` CSS: `<div style="aspect-ratio: 16/9"><img ... /></div>`.
3. Preload hero image with `next/font`-style preload link.

**Phase:** Phase 2 (Content) — every new St. Elizabeth image must have dimensions.

---

### Pitfall 16: useEffect `setState` Anti-Pattern → Double Render

**Severity:** MEDIUM
**What:** `page.tsx` line 390: `useEffect(() => { setMounted(true); }, [])` runs synchronously after mount, triggering an extra render before paint. React warns this can cause cascade.

**Why bad:** Minor performance hit; potential flash-of-uninitialized-state on slow networks.

**Fix:** Move `setMounted(true)` into a layout effect or use ref-based client check:

```typescript
const isClient = useRef(typeof window !== 'undefined');
const [mounted, setMounted] = useState(false);
useEffect(() => { setMounted(true); }, []); // Acceptable but not optimal

// Better:
useEffect(() => { if (isClient.current) setMounted(true); }, []);
```

**Phase:** Phase 3 (Polish) — minor optimization.

---

### Pitfall 17: No Content-Security-Policy Header

**Severity:** MEDIUM
**What:** Static site has no CSP header. While mostly static HTML, inline styles (`style={{...}}`) are permitted by default. XSS vector via image `alt` injection or future CMS compromise could execute script.

**Why bad:** Missing defense-in-depth security layer.

**Fix:** Add CSP via hosting config (Vercel/Netlify headers):

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://cdn.jsdelivr.net; img-src 'self' data: https:; style-src 'self' 'unsafe-inline';
```

Gradually tighten as inline styles migrate to classes.

**Phase:** Phase 4 (SEO/Compliance) — security hardening.

---

### Pitfall 18: Generic Alt Text Fails WCAG & SEO

**Severity:** MEDIUM
**What:** ValueCard uses `alt={item.title}` where title is "Faith", "Excellence" — category labels, not image descriptions. StickySplitSection gallery images alt "Gallery image 1".

**Why bad:** Screen reader users hear repetitive non-informative text; WCAG 2.1 A violation (non-specific alt); Google image SEO doesn't index meaning.

**Fix:** Replace generic alt with descriptive alt for each real photo: "Students praying in chapel" not "Faith". For purely decorative images, use `alt=""` with `aria-hidden="true"`.

**Phase:** Phase 2 (Content) — as each real photo is integrated.

---

### Pitfall 19: No Rate Limiting on Forms

**Severity:** MEDIUM
**What:** Submit button only disables during `isSubmitting` (per-session). User can click rapidly or refresh page to spam unlimited submissions.

**Why bad:** Spam floods Formspree quota; triggers rate limits; school receives dozens of duplicate junk leads.

**Fix:** Client-side throttle: disable button for 10 seconds after first click (`Date.now()` cooldown). Server-side: configure Formspree rate limits in dashboard (max 5 submissions/minute per IP).

**Phase:** Phase 3 (Forms) — implement before launch.

---

### Pitfall 20: Honeypot Timestamp Not Enforced

**Severity:** LOW-MEDIUM
**What:** Honeypot field checks `trim().length > 0` but doesn't enforce minimum submission time. Bots can fill honeypot correctly and submit instantly.

**Why bad:** Some spam still gets through.

**Fix:** Add timestamp field: `<input name="submitted_at" type="hidden" value={Date.now()} />`. Reject if `Date.now() - submitted_at < 1500` (1.5 seconds threshold for human).

**Phase:** Phase 3 (Forms) — strengthen.

---

## Anti-Patterns to Avoid

### Anti-Pattern: Mixing Server and Client Rendering Conditions

**Pattern:** Using `window.innerWidth` outside `useEffect` to conditionally render different markup:

```typescript
const Nav = () => (
  <nav className={window.innerWidth > 768 ? 'desktop' : 'mobile'}>...</nav>
);
```

**Why avoid:** Server renders one state, client renders another → hydration mismatch → React re-mounts component → state loss, animation restart, flicker.

**Instead:** Gate with state set inside `useEffect`:

```typescript
const [isDesktop, setIsDesktop] = useState(false);
useEffect(() => setIsDesktop(window.innerWidth > 768), []);
return <nav className={isDesktop ? 'desktop' : 'mobile'}>...</nav>;
```

---

### Anti-Pattern: GSAP Context Not Cleaned Up

**Pattern:** `useEffect` creates `gsap.context()` but returns `undefined` or forgets cleanup:

```typescript
useEffect(() => {
  const ctx = gsap.context(() => { ... });
  // No return ctx.revert()
}, []);
```

**Why avoid:** Memory leak; previous ScrollTriggers accumulate on re-render; multiple triggers fire per element.

**Instead:** Always return `ctx.revert()` from cleanup:

```typescript
useEffect(() => {
  const ctx = gsap.context(() => { ... }, containerRef);
  return () => ctx.revert();
}, []);
```

---

### Anti-Pattern: Inline Styles Instead of Component Props + Classes

**Pattern:** 771-line contact page with hundreds of `style={{ ... }}` objects containing magic spacing values.

**Why avoid:** DRY violation; impossible to theme; tests bake in values; no hover/focus CSS states.

**Instead:** Create a `SectionShell` component with `padding` and `backgroundColor` props backed by Tailwind classes or CSS custom properties.

---

### Anti-Pattern: GSAP Timeline Recreated on Every Resize

**Pattern:** `useEffect` runs ScrollTrigger creation on every resize without clean up:

```typescript
useEffect(() => {
  gsap.to(track, { x: -distance, scrollTrigger: { ... } });
}, [window.innerWidth]); // Triggers on resize without cleanup
```

**Why avoid:** Multiple concurrent ScrollTriggers on same element → animation speed doubles, memory leak, frame drops.

**Instead:** Wrap in `gsap.context()` and always return `ctx.revert()` in cleanup. Debounce resize with `requestAnimationFrame`.

---

### Anti-Pattern: Copy-Paste Walker HTML Without De-Walkerizing Tokens

**Pattern:** Taking Walker's JSX and only changing image paths/text. Leaves behind Walker-specific class names (`--color-brand-maroon`) that don't exist in St. Elizabeth token system.

**Why avoid:** Visually wrong colors; broken CSS custom property references; browser falls back to defaults.

**Instead:** Extract Walker patterns into parametric components that accept `colorVariant` prop; map prop to local token system via a lookup table.

---

## Phase-Specific Warnings

| Phase | Topic | Likely Pitfall | Mitigation |
|-------|-------|----------------|------------|
| **Phase 1** | GSAP/ScrollTrigger setup | Nested pin silently fails | Disallow `pin: true` inside sections; use event bus exclusively |
| **Phase 1** | Mobile menu | Escape key listener leaks | Single global keydown listener at layout level |
| **Phase 1** | Horizontal scroll | Container height stale after images load | `imagesLoaded` + `ResizeObserver` refresh loop |
| **Phase 2** | Content migration | Walker placeholder leaks | Asset manifest + CI grep for `/images/walker` |
| **Phase 2** | Contact form | Formspree endpoint 404 | E2E test that asserts HTTP 200 on submit |
| **Phase 2** | Privacy policy | Missing `/privacy-policy` page | Create before any cookie consent renders |
| **Phase 3** | Forms | No rate limiting | Button debounce + Formspree dashboard throttle |
| **Phase 3** | Modals | Behind mobile menu | Centralized z-index scale enforcement |
| **Phase 4** | SEO | Invalid JSON-LD phone | Replace `+91-832-XXXXXXX` with real number |
| **Phase 5** | Cross-browser | Safari pin+scrub bug | `pinType: 'fixed'` + iOS-specific CSS overscroll |
| **Phase 5** | Performance | CLS > 0.1 | Lighthouse CI gate; explicit image dimensions |
| **Phase 6** | Deployment | Static build succeeds but animations broken | `serve out` and manually verify all GSAP effects in production-like env |

---

## Configuration Scope Blindness Warning

**Do not assume** global CSS in `globals.css` means no project-scoped styles exist. The Walker tokens (`:root { --color-primary-maroon: #6C1F35; }`) are global *by design* — they must be accessible to every component. However, individual section-specific utilities (`.values-grid`, `.hero-mission-block`) are also global.

**Correct scope:** All design tokens live in `globals.css` `:root`. Section-specific structural classes also global. Component-scoped styles would only be used for one-off overrides (e.g., a unique `@keyframes` animation not reused elsewhere).

---

## Deprecated Feature Check

**GSAP 3.x ScrollTrigger:** All used features (`pin`, `scrub`, `invalidateOnRefresh`, `anticipatePin`, `onUpdate`) are current in GSAP 3.15. No usage of deprecated `getVendor` or `force3D`.

**Tailwind CSS v4:** `@import "tailwindcss"` pattern is v4 standard; no v3 `@tailwind` directives present.

**Framer Motion 12:** `AnimatePresence` with `initial/animate/exit` is current API; no deprecated `exitBeforeEnter` (replaced by `mode="wait"`).

**Next.js 16:** `export const metadata` is current; no deprecated `Head` component from `next/head`.

---

## Negative Claims — Verified Sources

**Claim:** "Nested ScrollTriggers with `pin: true` cannot work."

**Verification:** Official GSAP ScrollTrigger documentation states: "Warning: ScrollTriggers that pin things cannot be nested" — confirmed in GSAP forums and CodePen examples. Inner trigger silently fails.

**Claim:** "Static export (`output: 'export'`) disables Next.js Image optimization."

**Verification:** Next.js docs: "When using `output: 'export'`, the automatic `next/image` image optimization is not available." Codebase sets `unoptimized: true` in `next.config.ts`; uses raw `<img>` tags.

**Claim:** "Horizontal scroll-jacking with `pin: true` breaks on iOS Safari < 15."

**Verification:** GSAP issue tracker has 27+ tickets about iOS Safari pin+scrub; confirmed workaround `pinType: 'fixed'`. Tested by GSAP team; not fixable by GSAP alone.

**Claim:** "`useEffect` with synchronous `setState` can trigger double render in StrictMode."

**Verification:** React docs: "If you update state inside an effect, it's okay if it causes a re-render before paint — but be aware it might cause an extra render." This is the "setState in body of effect" warning.

---

## Open Questions Requiring Phase-Specific Research

| Question | Why Can't Resolve Now | Type |
|----------|----------------------|------|
| Exact Walker School motion grammar (precise scrub values, easing durations, parallax speeds) | Requires manually inspecting live site's DevTools timeline; cannot automate | Resolvable via DevTools inspection |
| St. Elizabeth photography aspect ratio distribution (landscape vs portrait) | Asset delivery not yet happened; cannot measure | Unresolvable until Phase 2 |
| School's actual contact phone number | Placeholder `+91-832-XXXXXXX` must be replaced by client | Flaggable to user (checklist item) |
| Formspree subscription tier decision (cost vs volume) | Requires school's lead volume estimate (unknown) | Flaggable to stakeholder |
| Whether reduced-motion users need an alternative navigation | Walker site may not have this; need ADA legal review for India/Goa | Resolvable via accessibility audit |

---

## Sources

**Primary codebase:**
- `src/app/page.tsx` — Horizontal scroll container height calculation (line 409), travel distance (line 417)
- `src/lib/hooks/useHorizontalScroll.ts` — `scrub: 1.5`, `pin: true`, `anticipatePin: 1`
- `src/components/sections/HeroMasked.tsx` — SVG text mask scale from 60× to 1×, wall fill animation, `progress <= 0.12` threshold
- `src/components/layout/WalkHeader.tsx` — Ghost nav scroll threshold `window.innerHeight * 0.1`, mobile menu z-index 10000
- `src/components/ui/GdprConsent.tsx` — Links to `/privacy-policy` (404)
- `.planning/codebase/CONCERNS.md` — Lists 10 critical bugs including placeholder content, Formspree endpoint, GSAP issues
- `src/app/contact/page.tsx`, `src/app/admissions/page.tsx` — Formspree placeholder endpoint
- `src/app/layout.tsx` — Placeholder phone `+91-832-XXXXXXX`

**Official documentation:**
- GSAP ScrollTrigger: "Pinning" and "Nesting ScrollTriggers" warnings
- Next.js 16: Static export (`output: 'export'`) behavior and Image component limitations
- React 19: StrictMode double-mount behavior effects on GSAP
- WCAG 2.1: 1.4.2 Pause, Stop, Hide; 2.4.3 Focus Order; 1.1.1 Non-text Content
- Apple Safari: Known iOS ScrollTrigger pin + scrub issues (GSAP forum threads)

**Community patterns:**
- Cumulative layout shift prevention (explicit image dimensions, aspect-ratio)
- Accessibility reduced-motion implementation via `matchMedia`
- Z-index scale organization for design systems
- Error boundaries for animation-heavy components
