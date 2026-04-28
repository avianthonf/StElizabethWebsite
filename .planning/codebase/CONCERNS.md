# Codebase Concerns

**Analysis Date:** 2026-04-28

## Tech Debt

### Placeholder Content Throughout

**Issue:** Multiple placeholder values and references to Walker School assets remain unimplemented.

**Files:** `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/contact/page.tsx`, `src/app/admissions/page.tsx`

**Details:**
- Line 79 of `src/app/layout.tsx`: `"telephone": "+91-832-XXXXXXX"` — missing real phone number
- Line 22 of `src/app/page.tsx`: `// PLACEHOLDER: Using Walker School images until St. Elizabeth photos provided` — all hero image references point to Walker School stock images (`/images/videocover2-812-optimized.webp`, etc.)
- Lines 3 and 76 of `src/app/contact/page.tsx` and `src/app/admissions/page.tsx`: `FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID_HERE'` — hardcoded placeholder; forms will fail submission

**Impact:** Site appears visually complete but contact/admissions forms are non-functional; SEO structured data shows bogus phone number; brand may be compromised.

**Fix approach:** Replace placeholder values with actual St. Elizabeth data; complete FORMSPREE_ENDPOINT setup per documentation and validate form submission end-to-end; identify and source/produce St. Elizabeth photography.

---

### Magic Numbers and Hardcoded Values

**Issue:** Animation thresholds, durations, and layout values are scattered as literal numbers throughout components.

**Files:** `src/app/page.tsx`, `src/components/layout/WalkHeader.tsx`, `src/components/sections/HeroMasked.tsx`, `src/lib/hooks/`

**Details:**
- `src/app/page.tsx` line 409: `container.style.height = `${travelDistance + window.innerHeight}px`;` — container height computed once on mount
- `src/app/page.tsx` line 422: `end: () => \`+=${travelDistance}\`` — scroll distance tied to image width
- `src/components/layout/WalkHeader.tsx` line 47: `window.scrollY > window.innerHeight * 0.1` — header solidifies after 10% scroll
- `src/components/sections/HeroMasked.tsx` line 61: `progress <= 0.12` — hero text animation occurs in first 12% of horizontal scroll
- `src/components/sections/StickySplitSection.tsx` lines 220, 323: `calc(65vh * 0.55 - 6px)` and `calc(65vh * 0.45 - 6px)` — hardcoded split ratios for images

**Impact:** Difficult to tune or reuse animations across pages; changing Walker School spec values requires hunting through files; inconsistent UX tuning.

**Fix approach:** Centralize animation configuration into a single `src/lib/gsap-config.ts` constants block or dedicated `animation-tokens.ts`; extract visible magic numbers with descriptive names; document acceptable ranges in comments.

---

### Inline Styles Instead of Reusable Classes

**Issue:** Many components use inline `style={{...}}` objects directly in JSX, bypassing Tailwind and making them hard to audit or change globally.

**Files:** Nearly every component: `src/app/page.tsx`, `src/components/sections/*`, `src/components/ui/*`

**Details:**
- `src/app/contact/page.tsx` represents the worst offender — 771 lines with hundreds of inline style attributes
- Border styles, spacing values, font sizes are individually repeated across components
- No CSS class reuse for common patterns like section padding, card backgrounds, text color variants

**Impact:** Violates DRY; inconsistent design token usage; difficult to perform site-wide style updates; tests that snapshot JSX will bake in numerous hard-to-change values.

**Fix approach:** Create a style utilities module with class-name helpers (e.g., `sectionGlass()`, `cardBase()`); progressively refactor most frequently reused styles into Tailwind classes or shared utility components; leverage existing design token CSS variables in a cleaner way.

---

### Unused Imports and Dead Code

**Issue:** Imports that are never referenced remain in files.

**Files:** `src/components/layout/WalkHeader.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/admissions/page.tsx`, `src/app/not-found.tsx`

**Details:**
- `WalkHeader.tsx` line 4: `import { gsap } from '@/lib/gsap-config';` — never used
- `WalkHeader.tsx` line 6: `import { Menu } from 'lucide-react';` — never used (only X icon used)
- `src/app/about/page.tsx` line 3: `import { StickySplitSection } from '@/components/sections/StickySplitSection';` — declared but not used
- `contact/page.tsx` line 6: `import type { Metadata } from 'next';` — Metadata unused in client page
- `admissions/page.tsx` line 6: `import type { Metadata } from 'next';` — same
- `not-found.tsx` line 1: `import { Link } from 'next/link';` — declared but never used

**Impact:** Increases bundle size (tree-shaking mitigates but not perfectly); confuses readers about component responsibilities; indicates incomplete refactor.

**Fix approach:** Run ESLint consistently (configured but not enforced); remove unused imports; add pre-commit hook to block commits with unused imports.

---

### useEffect setState Anti-Pattern

**Issue:** Several components call `setState` synchronously inside `useEffect` body, which React warns can trigger cascading renders and performance degradation.

**Files:** `src/app/page.tsx` (line 390), `src/components/ui/Carousel.tsx` (line 52)

**Details:**
- `src/app/page.tsx`: `useEffect(() => { setMounted(true); }, []);` — synchronous setState on mount
- `src/components/ui/Carousel.tsx` line 52: `useEffect(() => { onSelect(); setScrollSnaps(...); ... }, [emblaApi, onSelect]);` — synchronous state updates immediately after effect runs

**Impact:** Each trigger causes an extra render pass before the component has fully mounted; can cause flash-of-uninitialized-state or double-render on fast networks.

**Fix approach:** Move the `setMounted(true)` into the effect's `onStart` or use a layout effect where appropriate; or better yet, since this is a client-mount gate, use the `useIsClient` pattern with a ref check outside React entirely (e.g., `const isClient = useRef(typeof window !== 'undefined');`).

---

### NodeJS.Timeout in Browser Code

**Issue:** `NodeJS.Timeout` type used for `setTimeout`/`setInterval` in browser-only hooks.

**Files:** `src/lib/hooks/useHorizontalScroll.ts` (line 11), `src/app/page.tsx` (line 15)

**Details:**
```typescript
let timeout: NodeJS.Timeout | null = null;  // This conflates Node.js types with browser
```
Browser `setTimeout` returns a `number` in the DOM environment, not `NodeJS.Timeout`. TypeScript may not complain in this mixed module context but typing is semantically incorrect.

**Impact:** Type safety erosion; confusing for maintainers; potential runtime type mismatch in strict mode.

**Fix approach:** Use `ReturnType<typeof setTimeout>` or `number` for browser timers; run `tsc --noEmit` to surface other type drift issues.

---

### Large, Monolithic Page Components

**Issue:** Home page and contact page exceed 600+ lines; difficult to navigate or test in isolation.

**Files:** `src/app/page.tsx` (685 lines), `src/app/contact/page.tsx` (771 lines), `src/app/admissions/page.tsx` (608 lines)

**Details:**
- Inline components (`ValueCard`, `PassionsPanel`, `DivisionsTabsHorizontal`, `ProcessStep`) defined inside same file
- Hard to unit test individual pieces separately
- Difficult for new developers to orient
- Merge conflicts more likely due to large file size

**Impact:** Increased cognitive load; reduced reusability; harder to reason about individual sections; makes refactoring risky.

**Fix approach:** Extract inline components to their own files under `src/components/sections/`; create barrel exports; add tests for each extracted piece.

---

### Missing Error Boundaries

**Issue:** No global error boundary component found; individual GSAP animations may leave DOM in invalid state if initial condition assumptions fail.

**Files:** `src/components/sections/HeroMasked.tsx`, `src/lib/hooks/*`

**Details:**
- `HeroMasked` performs GSAP timeline setup in `useEffect` with no try/catch or cleanup if SVG refs are not yet attached (SSR scenario)
- `useHorizontalScroll` uses `!` non-null assertions inside GSAP context callback — will crash if refs fail to attach

**Impact:** Client-side runtime exception can break the entire page with no graceful degradation or fallback UI.

**Fix approach:** Wrap section components in an error boundary (`class ErrorBoundary extends React.Component`); add defensive checks before GSAP operations; log structured errors rather than pulling from window during animation.

---

### Missing Privacy Policy Page

**Issue:** GDPR consent component links to `/privacy-policy` which does not exist (404 risk, legal risk).

**Files:** `src/components/ui/GdprConsent.tsx` (line 49), `src/app/admissions/page.tsx` and `src/app/contact/page.tsx` use the same component

**Details:** Link anchor hardcoded: `<a href="/privacy-policy">Privacy Policy</a>`

**Impact:** Users cannot access the referenced policy; may invalidate GDPR consent as non-compliant; creates a legal exposure.

**Fix approach:** Create `src/app/privacy-policy/page.tsx`; add meta description; link to St. Elizabeth's actual policy document; update consent text with direct URL if policy exists.

---

### Formspree Endpoint Not Configured

**Issue:** Contact and admissions forms use a placeholder Formspree URL; forms cannot submit.

**Files:** `src/app/contact/page.tsx` line 85, `src/app/admissions/page.tsx` line 76

**Details:**
```typescript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID_HERE';
```
User must replace with their own Formspree form ID based on `03-02-PLAN.md` instruction.

**Impact:** Entire admissions inquiry and contact pathways are non-functional; data not collected.

**Fix approach:** Complete Formspree account and form setup; replace endpoint with form-specific URL; verify submission via end-to-end test.

---

### Telephone Number Placeholder in JSON-LD

**Issue:** Structured data (JSON-LD) contains placeholder phone number.

**Files:** `src/app/layout.tsx` line 79: `"telephone": "+91-832-XXXXXXX"`

**Impact:** Google Business Profile and schema.org rich results will show invalid contact info; local SEO suffers.

**Fix approach:** Replace with real St. Elizabeth school phone number; verify structured data through Google Rich Results Test.

---

## Known Bugs

### Form Submit Error Handling Too Generic

**Bug:** When Formspree returns non-OK status, error message displays a static fallback email, masking the actual failure reason.

**Files:** `src/app/contact/page.tsx` line 123, `src/app/admissions/page.tsx` line 112

**Details:**
```typescript
if (response.ok) { ... } else { throw new Error('Form submission failed'); }
```
catch block: `setSubmitMessage('Sorry, there was an error... Please try again or email us directly at ...');`

**Impact:** Users cannot differentiate between network failure, Formspree downtime, or validation rejection — no actionable information for the submitter.

**Fix approach:** Log `response.status` and `response.statusText` to console; surface HTTP status code or friendly error category (e.g., "Service temporarily unavailable" vs. "Invalid input"); implement retry/backoff for transient failures.

---

### No Client-Side Input Sanitization

**Bug:** Form validation checks required fields and email pattern, but does not sanitize or trim whitespace beyond `.trim()` check.

**Files:** `src/lib/form-validation.ts`, `src/app/contact/page.tsx`, `src/app/admissions/page.tsx`

**Details:**
- No check for excessively long inputs (DoS via large payload)
- No HTML/script tag filtering (XSS risk if messages are displayed elsewhere without escaping)
- honeypot field validates `trim().length > 0` but does not reject if whitespace injection; should use regex `/^\s*$/` check

**Impact:** Spam bots could bypass honeypot with whitespace; could open XSS vector if admin viewer renders raw content unsanitized.

**Fix approach:** Add length validation (e.g., max 2000 characters for message); reject whitespace-only honeypot values via regex; sanitize on server or pre-submit with DOMPurify; rate-limit per IP on Formspree side.

---

### Z-Index Clashes May Occur with Future Overlays

**Bug:** `WalkHeader` uses `z-[9999]` for the sticky header and `z-10000` for mobile menu overlay; when combined with future modals or third-party widgets, z-index war may occur.

**Files:** `src/components/layout/WalkHeader.tsx` lines 82, 252

**Details:** Hard-coded extreme z-index values with no centralized scale

**Impact:** Overlays may appear behind the mobile menu unexpectedly; difficult to reason about stacking context across the site.

**Fix approach:** Introduce a `z-index` scale in design tokens (e.g., `--z-header`, `--z-modal`, `--z-tooltip`) and use CSS variables throughout.

---

### Missing Alternative Text on Most Images

**Bug:** Several `<img>` tags use `alt="..."` but a few are empty or generic, reducing accessibility.

**Files:** `src/app/page.tsx`, `src/components/sections/StickySplitSection.tsx`

**Details:**
- `page.tsx` line 94: `<img src={item.image} alt={item.title} />` — title is generic ("Faith", "Excellence", etc.) — should describe the actual image content
- `StickySplitSection.tsx` line 218: `<img ... alt="Student" />` — same image reused across different sections; non-specific
- `StickySplitSection.tsx` rightImages: alt text `"Gallery image ${i + 1}"` — provides no meaningful description

**Impact:** Screen reader users get minimal value from images; fails WCAG 2.1 AA at minimum; SEO crawlability suffers.

**Fix approach:** Replace generic alt text with full, descriptive alt text per Walker School image-annotation spec; consider `alt=""` for purely decorative images used as backgrounds; if image is decorative, hide from AT with `aria-hidden="true"`.

---

## Security Considerations

### No CSRF Protection on Form Submissions

**Risk:** Cross-Site Request Forgery could trick users into submitting forms without consent.

**Files:** `src/app/contact/page.tsx`, `src/app/admissions/page.tsx`

**Details:** Forms use plain POST to Formspree; no CSRF token included; browser will attach session cookies if you're logged into Formspree (potential forgery).

**Impact:** Low for static site with Formspree (Formspree relies on CORS + honeypot), but still an avoidable vector if using custom backend.

**Fix approach:** Include a hidden CSRF token derived from a site-wide secret if moving to custom backend; with Formspree, rely on their CSRF defense and keep CORS origin locked to your domain.

---

### Honeypot Timestamp Not Enforced

**Risk:** Bot submissions may still go through if honeypot check only verifies field filled, not timing.

**Files:** `src/app/contact/page.tsx` line 52, `src/app/admissions/page.tsx` line 47

**Details:**
```typescript
if (isHoneypotFilled(formData.website)) { return; }
```
No timestamp-based submission time validation; bots can fill the honeypot field correctly often by detecting CSS `left: -9999px` class and not filling it.

**Impact:** Some spam may still get through; honeypot can be gamed by smarter bots.

**Fix approach:** Add a timestamp field and reject submissions under 1–2 seconds; server-side rate limiting via Formspree; consider adding reCAPTCHA v3 (invisible) as secondary layer.

---

### No Rate Limiting or Throttling

**Risk:** Malicious user could spam the contact/admissions forms programmatically.

**Files:** `src/app/contact/page.tsx`, `src/app/admissions/page.tsx`

**Details:** Forms submit directly to Formspree with no client-side rate limit; no debounce on the button beyond `isSubmitting` boolean per page session.

**Impact:** Spam flood could hit your Formspree limit; could result in service disruption or extra cost; noisy notifications.

**Fix approach:** Implement button-level debounce (e.g., disable for 10 seconds after first click); configure rate limit in Formspree dashboard; monitor Formspree quota.

---

### Missing Content-Security-Policy Header

**Risk:** Without a CSP header, the site is more exposed to XSS even though it's static.

**Files:** Deployment config (Vercel/Netlify/nginx)

**Details:** No CSP meta tag or header configured; inline styles everywhere (`style={{...}}`) are permitted by default but can be abused if any XSS vector is found.

**Impact:** Medium risk — site is largely static, but a compromised image alt text or malicious CMS injection could execute script.

**Fix approach:** Add CSP header via hosting platform: `default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn...;` gradually tighten as inline style blocks are refactored to classes.

---

## Performance Bottlenecks

### Large Inline SVG Masks

**Issue:** `HeroMasked` uses a large inline SVG mask; the text element "WE BELIEVE" is embedded as SVG text, which is not always crisp on high-DPI screens and expands DOM size.

**Files:** `src/components/sections/HeroMasked.tsx`

**Details:** SVG text is chosen for precise mask shape; but it lacks subpixel anti-aliasing for certain zoom levels.

**Impact:** Slight blur on Retina displays; DOM size increase (~1KB SVG node tree).

**Fix approach:** Pre-render the mask as an image (PNG with alpha) and use as CSS `mask-image`; trade animation fidelity for crispness and fewer DOM nodes.

---

### Multiple Simultaneous Scroll Event Listeners

**Issue:** Each hook (`useScrollProgress`, `useParallax`, `useScrollDirection`) registers a `scroll` listener independently.

**Files:** `src/lib/hooks/useScrollProgress.ts`, `src/lib/hooks/useParallax.ts`, `src/lib/hooks/useScrollDirection.ts`

**Details:**
- `useScrollProgress` attaches its own scroll listener
- `useParallax` attaches ScrollTrigger which also registers scroll callbacks under the hood
- `useHorizontalScroll` also binds a scroll-triggered GSAP animation via ScrollTrigger
- `WalkHeader` attaches `scroll` and `horizontal-scroll-progress` custom event listeners

**Impact:** Multiple listeners fire on each scroll frame; can compete and increase GC pressure; severity depends on scroll frequency and handler cost. On mobile, 60fps can degrade to 30–40fps under load.

**Fix approach:** Consolidate all scroll-drive effects into a single `usePageScroll` hook that dispatches a shared event stream; ensure independent effects use `requestAnimationFrame` throttling; measure FPS with Performance Observer before/after.

---

### Heavy Synchronous Layout on Window Resize

**Issue:** `useHorizontalScroll` and Home page `useEffect` call `ScrollTrigger.refresh()` synchronously after debounce, which forces reflow to recalculate pin/trigger positions.

**Files:** `src/lib/hooks/useHorizontalScroll.ts` line 74, `src/app/page.tsx` line 446

**Details:** On desktop resize (width change), `ScrollTrigger.refresh()` blocks the main thread while measuring element dimensions across the entire horizontal track; on low-end devices, this results in a janky resize experience.

**Impact:** Resize feels sluggish; can drop frames especially when window dimension changes trigger repeated refresh calls (window dragging).

**Fix approach:** Use `requestAnimationFrame` to schedule the refresh on the next paint rather than immediately on resize event; consider concurrency by checking if a refresh is already pending.

---

### No Code Splitting for Below-Fold Sections

**Issue:** The entire homepage (9 sections) is bundled into a single JS chunk; below-the-fold content and images load immediately.

**Files:** `src/app/page.tsx` — no dynamic imports or `next/dynamic` usage

**Details:** Despite skeleton loaders being present for perceived performance, all sections including Hero, We Value, StickySplitSection (2x), PassionsPanel (3x), DivisionsTabs, and Footer CTA are imported and rendered immediately. The only gating is a client-hidden skeleton for `!mounted`.

**Impact:** Largest Contentful Paint (LCP) is prolonged; FCP and LCP increase on slower connections despite having a skeleton state; unnecessary JS executes before user reaches bottom sections.

**Fix approach:** Wrap sections 3–9 in `next/dynamic` with `{ ssr: false }` and `loading: () => <SkeletonLoader variant="section" />`; progressively load as user scrolls toward each horizontal panel using Intersection Observer.

---

### Embedded Base64 Images Not Used

**Issue:** No inlining of tiny icons or placeholders as base64 data URLs; all imagery loaded via `<img src="/images/...">`; no `next/image` component used at all.

**Files:** Everywhere images appear

**Details:** While `next.config.ts` has a custom image loader, the project opts into raw `<img>` tags; benefits of image optimization through Next.js are bypassed entirely.

**Impact:** Extra HTTP requests for even tiny icons; duplicated fetch logic; no automatic format selection (AVIF/WebP) bypassed; LCP degraded.

**Fix approach:** Switch to `next/image` with the configured loader; get automatic WebP/AVIF; lazy load below-the-fold images; better caching.

---

## Fragile Areas

### Horizontal Scroll-Jacking Layout

**Area:** `src/app/page.tsx` — full-page horizontal scroll implementation

**Files:** `src/app/page.tsx`, `src/lib/hooks/useHorizontalScroll.ts`

**Why fragile:**
1. The container height is computed once on mount based on track width: `container.style.height = travelDistance + window.innerHeight`. If any images load late ( stumbling images or layout shift), `track.scrollWidth` will change dynamically; GSAP travel distance becomes inaccurate, resulting in scroll gaps.
2. Width-based `travelDistance` calculation will produce fractional values; rounding may leave 1–2px of whitespace at the end of the scroll.
3. `ScrollTrigger` `anticipatePin: 1` helps but is known to mis-predict on sideways scroll in some browsers; Safari 15– has reported issues with pin+scrub combined with dynamic container heights.

**Safe modification:**
- Never modify container's `minHeight` after mount without calling `ScrollTrigger.refresh()`
- Always debounce resize and wait for images to load before recalculating
- Add a `ResizeObserver` on `trackRef` to detect image load-triggered width changes

---

### GSAP ScrollTrigger with Custom Event Relay

**Area:** `HeroMasked` component uses custom events (`horizontal-scroll-hero`) to drive animation instead of ScrollTrigger's own onUpdate.

**Files:** `src/components/sections/HeroMasked.tsx`

**Why fragile:**
- Tightly coupled to exact event naming and progress range (0–0.12); any change to parent scroll calculation breaks the animation.
- Uses `hasAnimatedRef` to prevent re-trigger; but if user rapidly scrolls back and forth during first 12%, the lock-in happens prematurely.
- Timeline `pause: true` + manual `.progress(t)` must perfectly match GSAP's internal scrub loop; drift can occur due to frame timing.

**Safe modification:**
- Keep ScrollTrigger-driven inline or use a shared context that provides normalized scroll progress as a React state value.
- Document the progress threshold in one place (config constant).
- Add unit test for threshold edge cases (progress exactly 0.119 vs. 0.121).

---

### SVG Text Mask Not Scaling on All Zoom Levels

**Area:** `HeroMasked` SVG text mask uses `viewBox="0 0 100 100"` and `font-size="13.5"`.

**Files:** `src/components/sections/HeroMasked.tsx`

**Why fragile:**
- SVG text scaling relies on the viewBox coordinate system; changing `preserveAspectRatio` or browser font rasterization can blur the text edges, especially on high-DPI or zoom-to-150% settings.
- `font-size='13.5'` is a non-integer value; some browsers round inconsistently.

**Safe modification:**
- Test the mask at 100%, 125%, 150%, 200% zoom in Chrome, Firefox, Safari, Edge.
- Consider replacing the SVG mask with a CSS `mask-image: url(mask.svg)` that uses a crisp PNG if quality issues persist.
- Alternatively, drop the text-mask effect and use a split-reveal animation to avoid the rasterization issue entirely.

---

### Mega-Menu Dropdown Positioning

**Area:** `WalkHeader` uses `position: absolute` with `left: 50%; transform: translateX(-50%)` for the desktop mega-menu.

**Files:** `src/components/layout/WalkHeader.tsx` lines 158–169

**Why fragile:**
- If a future menu item has a very long label, the `minWidth: 200` may clip content; the dropdown grows but not enough.
- `box-shadow` size `0 24px 64px` could be clipped by body `overflow-x: hidden` on mobile or by parent stacking contexts.
- Z-index `50` is hardcoded; may collide with future modals.

**Safe modification:**
- Set a reasonable `max-width` and use `white-space: nowrap`.
- Increase header z-index scale to make space for dropdowns.
- Use `position: fixed` instead of `absolute` if overflow clipping occurs.

---

### All Images Loaded Regardless of Visibility

**Area:** Images referenced in `src/app/page.tsx` `IMAGES` constant load eagerly.

**Files:** `src/app/page.tsx`

**Why fragile:**
- Even though LCP image is visible immediately, all other images (10–15 of them) begin downloading as soon as the page loads, saturating the user's bandwidth with non-critical requests.
- This defeats the purpose of HTTP/2 prioritization and can delay the hero image's download.

**Safe modification:**
- Add `loading="lazy"` to all `<img>` below the hero image.
- For WebP optimization, pass through `Image` component with `priority` on the hero only.
- Consider grouping non-critical assets in a dynamic-import block that only instantiates after horizontal scroll progress reaches that section.

---

### Inline Event Handlers for Keyboard Interaction

**Area:** Global keyboard escape handlers registered on mobile menu and forms use `window.addEventListener` in separate effects.

**Files:** `src/components/layout/WalkHeader.tsx` (line 69), `src/app/contact/page.tsx` (line 129), `src/app/admissions/page.tsx` (line 118)

**Why fragile:**
- Multiple components independently register the same `keydown` handler; if any unmount unexpectedly, the listener leaks remains.
- No single source of truth for "close overlay on Escape" behavior.

**Safe modification:**
- Register one global keydown listener at the top-level layout or a context provider; dispatch a custom event that all overlays subscribe to.
- Or move to React's `onKeyDownCapture` at document level using `useEffect` in `_app`/layout.

---

## Scaling Limits

### Form Volume Limit (Formspree Free Tier)

**Limit:** Free Formspree tier allows 50 submissions per month per form; 2 forms already planned.

**Current State:** Both Contact and Admissions forms configured to Formspree with placeholder IDs; no submissions possible yet.

**Impact:** When site goes live, if form volume exceeds 50 submissions/month per form, subsequent submissions will be rejected; parents seeking admissions will be blocked.

**Fix path:**
1. Upgrade Formspree to a paid plan or increase quota
2. Connect to a Google Sheet/email forwarder as a parallel sink
3. Implement an inbox-forwarding Lambda function as a backup endpoint
4. Add client-side quota warning after successful submission counts approach limit

---

### Static Site Generation Memory Footprint

**Limit:** `next build` for static export (`output: "export"`) builds all pages at once; with 7 interior pages currently, future content expansion may cause process OOM on low-memory machines.

**Current State:** Build completes successfully; but `out/` currently contains only HTML + JS chunks; image count is 62 pre-optimized WebP/PNG.

**Impact:** Adding 20+ content pages will increase build time towards the 2–3 minute range and spike node memory >1.5 GB; CI/CD runners may time out.

**Fix path:**
- Enable incremental static regeneration (ISR) instead of pure static export if moving to Vercel
- Split content into `draft`/`published` chunks with separate build scripts
- Consider `next build --profile` to identify bottlenecks; use `experimental: { cpus: 2 }` in next.config if needed

---

## Dependencies at Risk

### GSAP 3.x — ScrollTrigger Heavy Usage

**Risk:** GSAP ScrollTrigger is heavily used for scroll-based animations; GSAP 4.x introduces breaking changes to the module system and plugin architecture.

**Details:**
- `src/lib/gsap-config.ts` explicitly imports `ScrollTrigger`
- Many `useHorizontalScroll`, `useParallax`, `HeroMasked`, `useScrollDirection` rely on it
- If upgrading to GSAP 4+, ScrollTrigger becomes an entry plugin requiring a different import path; current code will break

**Impact:** Major upgrade would require sweeping changes across 10+ files; could introduce animation stutter or scroll-pin regressions.

**Mitigation:**
- Lock GSAP to 3.x series in `package.json` (currently `^3.15.0`)
- Subscribe to GSAP upgrade migration guide; plan a phased upgrade well in advance
- Document all ScrollTrigger usage patterns in STACK.md and in code comments

---

### Framer Motion 12.38.0 — High Version Churn

**Risk:** Framer Motion frequent major version updates bring API changes (e.g., v11 to v12 had `motion.div` layout animation adjustments).

**Details:**
- `WalkHeader` uses `AnimatePresence` and `motion.div` for mobile menu
- `Accordion` component uses `AnimatePresence` with Framer Motion
- No significant abstraction layer over FM; changes propagate directly

**Impact:** v13+ may alter server component compatibility; if FM drops `animate` prop for motion values, refactoring will be substantial.

**Mitigation:**
- Pin FM version using exact version (no caret): `"framer-motion": "12.38.0"`
- Monitor release notes; run a complete motion animation smoke test before each update

---

### Tailwind CSS v4 — New Engine

**Risk:** Tailwind v4 is a major rewrite using CSS-first configuration; v3 projects may have unexpected breaking changes (class name differences, removed JIT mode).

**Details:**
- Project lists `tailwindcss: "^4"` and `@tailwindcss/postcss: "^4"`
- Using v4's new `@import "tailwindcss"` pattern (not yet visible in any CSS file checked)
- No `tailwind.config.js` detected — likely using design tokens via `@theme` directive

**Impact:** If v4 stable API changes, custom utility classes or configuration blurs could break; build may fail if plugin ecosystem lags.

**Mitigation:**
- Validate using `@tailwindcss/postcss` plugin; ensure all UI components compile without custom CSS overrides
- Keep an eye on Tailwind v4 release notes for breaking changes

---

### next-seo 7.2.0

**Risk:** Package is community-maintained and may become incompatible with Next 16+ if Next.js core team deprecates the meta API.

**Details:** `src/app/layout.tsx` exports `metadata` (Next 13+ App Router SEO) — not using `next-seo` at all. The dependency appears unused.

**Impact:** Unused dependency adds to bundle size; could become a supply-chain risk if no longer maintained.

**Fix path:** Remove `next-seo` from dependencies unless used somewhere else in the project; if later needed for advanced SEO (JSON-LD, sitemap), it can be re-added.

---

## Missing Critical Features

### No Privacy Policy Page

**Feature gap:** GDPR consent references a missing `/privacy-policy` route — legally incomplete.

**Blocks:** GDPR-compliant data collection; data subject rights statement; cookie policy.

**Recommendation:** Create a static privacy policy page with sections covering data collection, purpose, retention, and contact info; link from header/footer; update GDRP consent `href` accordingly.

---

### No Sitemap.xml or robots.txt (Design Time Only)

**Feature gap:** `ARCHITECTURE.md` suggests sitemap/robots were planned but not committed.

**Files:** No `public/sitemap.xml` or `public/robots.txt` visible in repository; ARCHITECTURE.md mentions them.

**Blocks:** Search engine crawling and indexing cannot be fully optimized.

**Recommendation:** Generate `sitemap.xml` via a script (Next.js sitemap generation); create per-page `robots.txt` allowing all; submit to Google Search Console.

---

### No Rate-Limiting Mechanism on Forms (Client or Server)

**Feature gap:** No rate limiter preventing repeated submissions per IP or per user session.

**Blocks:** Ability to prevent abuse/spam/bot floods.

**Recommendation:** Implement Formspree-level rate limiting (dashboard) and client-side throttle (button disable for N seconds); consider Prey/Stelligent reCAPTCHA v3 for bot filtering.

---

### No Analytics / Monitoring

**Feature gap:** No Google Analytics, privacy-respecting Plausible, or any analytics included.

**Blocks:** Ability to measure visitor traffic, page popularity, bounce rate, user flow.

**Recommendation:** Integrate Plausible Analytics (open-source, GDPR-friendly) or Google Analytics 4 with IP anonymization; document event tracking for key CTAs.

---

## Test Coverage Gaps

### Unit Test Coverage At or Near Zero

**What's not tested:** All business logic except the `useHorizontalScroll` hook. No tests for form validation, navigation utility functions, accordion state, header state transitions.

**Files:** `src/lib/hooks/useHorizontalScroll.test.ts` is the sole test file; `vitest` configured but no test script executed; 0% coverage reported.

**Risk:** Regression risk across codebase is high; changing GSAP animation triggers could break without detection; form validation changes may introduce silent failures.

**Priority:** High — Add unit tests for:
- `src/lib/form-validation.ts` (required fields, email pattern, edge cases)
- `src/lib/site-navigation.ts` (breadcrumbs and nav lookup functions)
- `src/components/ui/Accordion.tsx` (expand/collapse behavior)
- `src/components/sections/StickySplitSection.tsx` (tab switching, open/close state)

---

### E2E Test Files Exist but Not Integrated

**What's not tested:** `e2e/accessibility.spec.ts`, `e2e/mobile-menu.spec.ts`, `e2e/navigation.spec.ts`, `e2e/scroll-animations.spec.ts` are present but Playwright likely not wired (no `playwright.config.ts` visible).

**Files:** `e2e/*.spec.ts`

**Risk:** No automated verification of core user flows: navigation, mobile menu, scroll animations, a11y baseline.

**Recommendation:** Add `@playwright/test` config; wire `npm run test:e2e`; target Chromium; use page fixtures; block CI if any test fails.

---

### No Visual Regression Testing

**What's not tested:** Visual appearance across breakpoints (desktop, tablet, mobile) for each section.

**Risk:** CSS changes could inadvertently shift designs, colors, typography without anyone noticing until production.

**Recommendation:** Add Percy or Chromatic for Storybook; alternatively, run Playwright with `expect(page).toHaveScreenshot()` for each major component viewport.

---

### No Load / Performance Testing

**What's not tested:** LCP, CLS, INP metrics; site size budget.

**Risk:** Slow page loads on 3G connections; high bounce rate due to poor perceived performance.

**Recommendation:** Use Lighthouse CI as a pre-merge check; set budgets for JS bundle size, image count, total blocking time; measure real user metrics via Vercel Analytics or similar.

---

### No Accessibility Audit

**What's not tested:** No comprehensive ARIA validation; alt text missing; color contrast unverified.

**Files:** Many JSX snippets show basic ARIA but not systematic coverage.

**Risk:** Legal non-compliance (ADA/Section 508); poor UX for screen reader users.

**Recommendation:** Run `@axe-core/playwright` in E2E suite; fix violations; document accessibility checklist.

---

## Performance Optimization Priorities

1. **Convert `<img>` to `next/image`** — Eliminates 15+ ESLint warnings and delivers WebP/AVIF automatically.
2. **Lazy-load below-the-fold images** — Use `loading="lazy"` on sections 3–9.
3. **Debounce scroll handlers** — All scroll effect hooks should use `requestAnimationFrame` internally.
4. **Consolidate scroll listeners** — One global scroll dispatcher reduces GC pressure.
5. **Extract inline styles and hardcoded magic numbers** — Add design token scale for spacing/durations/font sizes.
6. **Code-split sections 3–9** — `next/dynamic` with skeleton loader improves LCP.
7. **Replace `console.error` with structured error reporting** — Hook into Sentry or LogRocket for production monitoring.
