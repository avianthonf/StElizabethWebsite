# Domain Pitfalls

**Domain:** School/Education Marketing Websites (Static Next.js)
**Researched:** 2026-04-27
**Confidence:** HIGH

## Critical Pitfalls

### Pitfall 1: Accessibility Compliance Failures Leading to Legal Action

**What goes wrong:**
School websites fail WCAG 2.1 AA compliance, resulting in OCR (Office for Civil Rights) complaints, lawsuits, and mandatory remediation. Common violations: missing alt text, keyboard traps in mobile menus, insufficient color contrast, unlabeled form fields, missing captions on videos, and inaccessible PDF documents.

**Why it happens:**
- Developers treat accessibility as "nice to have" rather than legal requirement
- Static export sites skip automated accessibility testing in CI/CD
- Design systems prioritize aesthetics over keyboard navigation
- Third-party components (video players, carousels) lack accessibility features
- No accessibility audit before launch

**How to avoid:**
1. **Mandatory WCAG 2.1 AA compliance from Phase 1** - not a "Phase 5 polish" item
2. Use `eslint-plugin-jsx-a11y` and fix all errors before commit
3. Add automated accessibility tests with `@axe-core/react` or `jest-axe`
4. Test with keyboard navigation only (no mouse) - all interactive elements must be reachable
5. Run Lighthouse accessibility audits in CI/CD - fail build if score < 95
6. Provide captions/transcripts for all video content (legal requirement, not optional)
7. Ensure color contrast meets 4.5:1 minimum for body text, 3:1 for large text
8. Test with screen readers (NVDA on Windows, VoiceOver on Mac/iOS)

**Warning signs:**
- Mobile menu can't be closed with keyboard
- Form validation errors not announced to screen readers
- Focus indicator invisible or removed with CSS
- Images missing alt attributes
- Videos auto-play without controls
- Dropdown menus require mouse hover (no keyboard access)

**Phase to address:**
Phase 1 (Foundation) - Build accessibility into component library from start. Phase 2 (Forms) - Ensure form accessibility before launch. Phase 3 (Content) - Audit all multimedia for captions/transcripts.

---

### Pitfall 2: GSAP ScrollTrigger Performance Disasters

**What goes wrong:**
GSAP animations cause layout thrashing, jank, and poor Core Web Vitals scores. Symptoms: scroll feels laggy, animations stutter, mobile devices overheat, Lighthouse performance score drops below 50. Known issues in this project: plugin double-registration, no resize handler, iOS Safari scroll lock.

**Why it happens:**
- Reading layout properties (offsetHeight, getBoundingClientRect) inside animation loops triggers forced reflows
- Creating ScrollTriggers out of order causes incorrect position calculations
- Animating pinned elements directly instead of children breaks measurements
- Ancestor transforms break `position: fixed` behavior
- No cleanup on component unmount causes memory leaks
- Resize events not handled - animations break on viewport changes

**How to avoid:**
1. **Create ScrollTriggers in DOM order** (top-to-bottom) - never create lower triggers before upper pinning triggers
2. **Animate children of pinned elements**, never the pinned element itself
3. **Avoid ancestor transforms** - use `pinReparent: true` only as last resort (expensive)
4. **Batch DOM reads** - use GSAP's `getProperty()` instead of direct DOM access
5. **Add resize handlers** with debounce (200ms) to recalculate ScrollTrigger positions
6. **Clean up on unmount** - call `ScrollTrigger.getAll().forEach(t => t.kill())` in useEffect cleanup
7. **Use `will-change` sparingly** - only on actively animating elements, remove after animation
8. **Test on low-end mobile devices** - animations smooth on desktop often jank on mobile
9. **Implement singleton pattern** for plugin registration to prevent double-registration warnings

**Warning signs:**
- Console warnings: "ScrollTrigger.refresh() should be called after all ScrollTriggers have been created"
- Scroll feels "sticky" or delayed
- Animations jump or snap instead of smooth transitions
- Mobile devices get hot during scrolling
- Lighthouse performance score < 70
- Layout Shift (CLS) > 0.1

**Phase to address:**
Phase 1 (Foundation) - Fix GSAP configuration and resize handlers. Phase 3 (Polish) - Optimize animations, add performance monitoring.

---

### Pitfall 3: Static Export Image Optimization Failure

**What goes wrong:**
Next.js Image component optimization is disabled (`unoptimized: true`) for static export, causing massive image files (2-5MB PNGs), slow page loads, poor Core Web Vitals (LCP > 4s), and high bandwidth costs. Mobile users on slow connections abandon site before images load.

**Why it happens:**
- Static export doesn't support Next.js automatic image optimization (requires server)
- Developers use `<img>` tags instead of `<Image>` component
- No lazy loading - all images load immediately, even below fold
- No responsive images - serving desktop-size images to mobile
- Missing width/height attributes cause Cumulative Layout Shift (CLS)
- No modern formats (WebP, AVIF) - serving legacy JPG/PNG

**How to avoid:**
1. **Use Next.js `<Image>` component** with `unoptimized={false}` and external image optimization service (Cloudinary, Imgix)
2. **OR implement build-time optimization** with `sharp` or `@next/image-loader` plugin
3. **Add `loading="lazy"` to all below-fold images** - only hero images should be `priority`
4. **Provide explicit width/height** to prevent CLS - use static imports for automatic dimensions
5. **Serve WebP with JPG fallback** - 25-35% smaller file sizes
6. **Implement responsive images** with `sizes` prop - don't serve 2000px images to 375px mobile screens
7. **Compress images before commit** - use ImageOptim, Squoosh, or automated CI/CD compression
8. **Set LCP budget** - fail build if hero image > 200KB

**Warning signs:**
- Lighthouse LCP (Largest Contentful Paint) > 2.5s
- Network tab shows images > 500KB
- CLS (Cumulative Layout Shift) > 0.1
- Mobile page load > 5s on 3G
- Images appear pixelated or blurry on high-DPI screens

**Phase to address:**
Phase 1 (Foundation) - Implement image optimization pipeline. Phase 2 (Content) - Audit all images, add lazy loading.

---

### Pitfall 4: Mobile Menu Accessibility and Usability Failures

**What goes wrong:**
Mobile navigation menus fail on iOS Safari (scroll lock issues), trap keyboard focus, lack proper ARIA attributes, and can't be closed with Escape key. Users get stuck in menu, can't access content, and abandon site. Known issue in this project: body scroll lock doesn't handle iOS Safari edge cases.

**Why it happens:**
- Custom scroll lock implementations don't handle iOS Safari `-webkit-overflow-scrolling` quirks
- Missing ARIA attributes (`aria-expanded`, `aria-controls`, `aria-label`)
- Focus not trapped inside open menu - Tab key escapes to background content
- No keyboard shortcuts (Escape to close, Arrow keys for navigation)
- Hamburger icon not semantic button (uses `<div>` with click handler)
- Menu state not announced to screen readers

**How to avoid:**
1. **Use battle-tested scroll lock library** - `body-scroll-lock` or `react-remove-scroll` handles iOS Safari
2. **Implement focus trap** - use `focus-trap-react` to keep focus inside open menu
3. **Add proper ARIA attributes**:
   - `<button aria-expanded={isOpen} aria-controls="mobile-menu" aria-label="Toggle menu">`
   - `<nav id="mobile-menu" aria-label="Main navigation">`
4. **Support keyboard shortcuts**:
   - Escape key closes menu
   - Arrow keys navigate menu items
   - Tab cycles through menu items only
5. **Use semantic HTML** - `<button>` for toggle, `<nav>` for menu, `<ul><li>` for items
6. **Test on real iOS devices** - Safari has unique bugs not present in Chrome DevTools mobile emulation
7. **Announce state changes** - use `aria-live` region to announce "Menu opened" / "Menu closed"

**Warning signs:**
- Background content scrolls when menu is open (iOS Safari)
- Tab key moves focus to background content
- Escape key doesn't close menu
- Screen reader doesn't announce menu state
- Hamburger icon not focusable with keyboard
- Menu items not reachable with keyboard navigation

**Phase to address:**
Phase 1 (Foundation) - Fix mobile menu accessibility and iOS Safari scroll lock before adding more pages.

---

### Pitfall 5: Form Handling on Static Sites (Spam, Validation, GDPR)

**What goes wrong:**
Static export sites have no server-side form handling, leading to spam submissions, poor validation UX, GDPR compliance failures, and data loss. Contact forms either don't work or send unvalidated data to third-party services without proper consent.

**Why it happens:**
- No server-side validation - client-side validation easily bypassed
- No spam protection - bots submit forms freely
- Third-party form services (Formspree, Netlify Forms) lack GDPR consent flows
- Form errors not accessible to screen readers
- No loading states - users submit multiple times
- Sensitive data sent over unencrypted connections

**How to avoid:**
1. **Use form service with spam protection** - Netlify Forms (honeypot + reCAPTCHA), Formspree, or custom API route
2. **Implement GDPR-compliant consent**:
   - Explicit checkbox for data processing consent (pre-checked = illegal)
   - Link to privacy policy
   - Store consent timestamp and IP address
   - Provide data deletion mechanism
3. **Add client-side validation with accessible errors**:
   - Use `aria-invalid` and `aria-describedby` for error messages
   - Show errors inline, not just on submit
   - Announce errors to screen readers with `aria-live="polite"`
4. **Implement COPPA compliance** for forms collecting data from children under 13:
   - Require parental consent
   - Don't collect more data than necessary
   - Provide parental access to child's data
5. **Add loading states** - disable submit button, show spinner, prevent double submission
6. **Validate on both client and server** - never trust client-side validation alone
7. **Use HTTPS** - enforce secure connections for all form submissions

**Warning signs:**
- Form accepts obviously invalid data (email: "asdf")
- No spam protection - receiving bot submissions
- Form errors not announced to screen readers
- No privacy policy or consent checkbox
- Submit button doesn't disable during submission
- Form data sent over HTTP (not HTTPS)

**Phase to address:**
Phase 2 (Forms) - Implement accessible, GDPR-compliant contact form with spam protection before launch.

---

### Pitfall 6: Font Loading and Cumulative Layout Shift (CLS)

**What goes wrong:**
Custom fonts (Inter, Playfair Display, Montserrat) load after initial render, causing text to shift, reflow, and poor CLS scores. Users see "flash of unstyled text" (FOUT) or "flash of invisible text" (FOIT). Lighthouse penalizes CLS > 0.1.

**Why it happens:**
- Fonts loaded from Google Fonts or external CDN without preloading
- No `font-display` strategy - browser defaults to FOIT (invisible text for 3s)
- Font files not optimized - loading full character sets instead of subsets
- No fallback fonts with similar metrics - layout shifts when custom font loads
- CSS uses custom fonts before they're loaded

**How to avoid:**
1. **Self-host fonts** - don't rely on Google Fonts CDN (privacy + performance)
2. **Use Next.js Font Optimization** with `next/font/google`:
   ```tsx
   import { Inter, Playfair_Display } from 'next/font/google'
   const inter = Inter({ subsets: ['latin'], display: 'swap' })
   ```
3. **Set `font-display: swap`** - show fallback font immediately, swap when custom font loads
4. **Preload critical fonts** in `<head>`:
   ```html
   <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
   ```
5. **Use font subsetting** - only include characters you need (Latin subset, no Cyrillic/Greek)
6. **Match fallback font metrics** - use `size-adjust`, `ascent-override`, `descent-override` to minimize layout shift
7. **Optimize font files** - use WOFF2 format (30% smaller than WOFF), remove unused glyphs

**Warning signs:**
- Text invisible for 1-3 seconds on page load
- Text shifts/reflows when fonts load
- CLS score > 0.1 in Lighthouse
- Fonts loaded from external CDN (privacy issue in EU)
- Multiple font weights loaded but not used

**Phase to address:**
Phase 1 (Foundation) - Implement font optimization before building components. Phase 3 (Polish) - Audit font usage, remove unused weights.

---

### Pitfall 7: SEO Failures Specific to School Websites

**What goes wrong:**
School websites miss critical SEO opportunities: no structured data (Schema.org EducationalOrganization), duplicate content across campus pages, missing local SEO signals, poor meta descriptions, and no sitemap. Result: low search rankings, prospective parents can't find school.

**Why it happens:**
- Developers don't implement Schema.org markup for educational institutions
- Multiple campus pages have identical content (copy-paste)
- No Google My Business integration
- Missing local keywords (city, neighborhood, "near me")
- No blog or news section for fresh content
- Static export sites skip dynamic sitemap generation

**How to avoid:**
1. **Implement Schema.org EducationalOrganization markup**:
   ```json
   {
     "@context": "https://schema.org",
     "@type": "EducationalOrganization",
     "name": "St. Elizabeth High School Pomburpa",
     "address": { "@type": "PostalAddress", "addressLocality": "Pomburpa", "addressRegion": "Goa" },
     "telephone": "+91-...",
     "url": "https://stelizabethpomburpa.edu",
     "sameAs": ["https://facebook.com/...", "https://instagram.com/..."]
   }
   ```
2. **Add local SEO signals**:
   - Include city/region in title tags and H1s
   - Create location-specific pages (not duplicate content)
   - Embed Google Maps with school location
   - List in local directories (Google My Business, Bing Places)
3. **Generate static sitemap** at build time with `next-sitemap`
4. **Write unique meta descriptions** for each page (150-160 characters)
5. **Implement Open Graph tags** for social sharing
6. **Add FAQ schema** for common admissions questions
7. **Create blog/news section** for fresh content (Google favors recently updated sites)

**Warning signs:**
- School doesn't appear in "schools near me" searches
- Google Search Console shows "Missing structured data" warnings
- Multiple pages have identical meta descriptions
- No sitemap.xml file
- Social media shares show generic preview (no Open Graph tags)

**Phase to address:**
Phase 1 (Foundation) - Add structured data and meta tags. Phase 4 (Content) - Create unique content for each page, add blog section.

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Disable Next.js image optimization (`unoptimized: true`) | Static export works immediately | Poor performance, high bandwidth costs, bad Core Web Vitals | Never - implement build-time optimization instead |
| Skip accessibility testing | Faster development | Legal liability, OCR complaints, expensive remediation | Never - accessibility is legal requirement for schools |
| Hardcode content in TypeScript files | No CMS setup needed | Non-technical staff can't update content, requires developer for every change | MVP only - migrate to CMS or JSON files by Phase 2 |
| Use `<img>` instead of `<Image>` | Simpler syntax | No lazy loading, no responsive images, CLS issues | Never - Next.js Image component is essential |
| Skip GSAP cleanup on unmount | Animations work initially | Memory leaks, performance degradation, crashes on navigation | Never - always clean up ScrollTriggers |
| Client-side form validation only | No backend needed | Spam, invalid data, security vulnerabilities | Never - always validate server-side |
| Load all fonts/weights | Design flexibility | Slow page loads, poor performance | Never - only load weights actually used |
| Auto-play videos without controls | Engaging hero section | Accessibility violation, poor UX, legal risk | Never - provide controls and captions |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Google Fonts | Loading from CDN without preload | Self-host with `next/font/google`, preload critical fonts |
| Form services (Netlify Forms, Formspree) | No GDPR consent flow | Add explicit consent checkbox, link to privacy policy |
| Analytics (Google Analytics, Plausible) | Loading synchronously in `<head>` | Load asynchronously with `next/script` strategy="afterInteractive" |
| Video embeds (YouTube, Vimeo) | Embedding full player on page load | Use facade/thumbnail, load player on click (saves 500KB+) |
| GSAP plugins | Registering on every component import | Singleton pattern or register once in _app.tsx |
| Accessibility testing (axe-core) | Running only in development | Add to CI/CD, fail build on violations |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Loading all images eagerly | Slow initial page load, high bandwidth | Lazy load below-fold images, use `priority` only for LCP image | > 10 images per page |
| GSAP animations on every scroll event | Jank, laggy scroll, poor FPS | Use ScrollTrigger's built-in debouncing, batch DOM reads | > 3 scroll animations |
| Large CSS file loaded globally | Slow first paint, unused CSS | Split into component CSS modules, use Tailwind JIT | > 500 lines of CSS |
| Unoptimized fonts (full character sets) | Slow font loading, FOIT/FOUT | Use font subsetting (Latin only), WOFF2 format | > 2 font families or > 4 weights |
| No code splitting for GSAP | Large initial bundle | Lazy load GSAP only on pages with animations | GSAP used on < 50% of pages |
| Synchronous third-party scripts | Blocking render, slow TTI | Use `next/script` with `strategy="afterInteractive"` or `lazyOnload` | > 2 third-party scripts |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Collecting student data without COPPA compliance | FTC fines ($50,000+ per violation), lawsuits | Require parental consent for children under 13, minimize data collection |
| No GDPR consent for EU students | GDPR fines (up to 4% of revenue), legal action | Add explicit consent checkbox, provide data deletion mechanism |
| Embedding third-party content without CSP | XSS attacks, malicious scripts | Configure Content Security Policy, whitelist trusted domains |
| Storing form submissions in client-side localStorage | Data leaks, privacy violations | Send to server immediately, never store sensitive data client-side |
| Missing security headers on static hosting | Clickjacking, MIME sniffing attacks | Configure headers in hosting provider (Vercel, Netlify) |
| Auto-playing videos with audio | Accessibility violation, poor UX | Require user interaction to play, provide controls |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Mobile menu requires precise tap on small hamburger icon | Frustration, can't access navigation | Increase tap target to 44x44px minimum, add "Menu" label |
| Form errors only shown on submit | Users don't know what's wrong until after submission | Validate on blur, show inline errors immediately |
| No loading state on form submit | Users click multiple times, duplicate submissions | Disable button, show spinner, display success message |
| Videos auto-play on page load | Annoying, accessibility violation, wastes bandwidth | Show thumbnail, play on click, provide controls |
| Missing "skip to main content" link | Keyboard users must tab through entire navigation | Add skip link as first focusable element |
| Dropdown menus require hover | Unusable on touch devices, inaccessible to keyboard users | Use click/tap to open, support keyboard navigation |
| No visual focus indicator | Keyboard users don't know where they are | Style `:focus-visible` with high-contrast outline |
| Long forms without progress indicator | Users abandon, don't know how much is left | Add step indicator, save progress, allow resume later |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Contact form:** Often missing spam protection, GDPR consent, accessible error messages — verify honeypot/reCAPTCHA, consent checkbox, ARIA attributes
- [ ] **Video embeds:** Often missing captions, transcripts, keyboard controls — verify captions file exists, controls accessible with keyboard
- [ ] **Mobile menu:** Often missing focus trap, scroll lock, keyboard shortcuts — verify Escape closes menu, Tab stays inside menu, iOS Safari scroll lock works
- [ ] **Images:** Often missing alt text, lazy loading, responsive sizes — verify all images have descriptive alt, `loading="lazy"` on below-fold images
- [ ] **Forms:** Often missing server-side validation, loading states, success messages — verify validation on backend, submit button disables, success feedback shown
- [ ] **Animations:** Often missing cleanup on unmount, resize handlers, reduced motion support — verify ScrollTriggers killed on unmount, `prefers-reduced-motion` respected
- [ ] **SEO:** Often missing structured data, sitemap, meta descriptions — verify Schema.org markup, sitemap.xml exists, unique meta per page
- [ ] **Accessibility:** Often missing ARIA labels, keyboard navigation, screen reader testing — verify with axe DevTools, keyboard-only navigation, NVDA/VoiceOver

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Accessibility lawsuit/OCR complaint | HIGH (legal fees, remediation, reputation damage) | 1. Hire accessibility consultant for audit 2. Fix all WCAG 2.1 AA violations 3. Implement automated testing 4. Train team on accessibility |
| Poor Core Web Vitals (LCP > 4s, CLS > 0.25) | MEDIUM (performance optimization, image re-processing) | 1. Audit with Lighthouse/WebPageTest 2. Optimize images (WebP, lazy loading) 3. Fix font loading (preload, font-display) 4. Reduce JavaScript bundle size |
| GSAP performance issues (jank, memory leaks) | MEDIUM (refactor animations, add cleanup) | 1. Add ScrollTrigger cleanup on unmount 2. Implement resize handlers 3. Batch DOM reads 4. Test on low-end mobile devices |
| Form spam overwhelming inbox | LOW (add spam protection) | 1. Implement honeypot field 2. Add reCAPTCHA v3 3. Rate limit submissions by IP 4. Validate on server-side |
| Missing GDPR compliance | HIGH (legal risk, fines) | 1. Add consent checkbox to all forms 2. Create privacy policy 3. Implement data deletion mechanism 4. Audit all data collection |
| iOS Safari scroll lock broken | LOW (use proper library) | 1. Replace custom scroll lock with `body-scroll-lock` 2. Test on real iOS devices 3. Add focus trap with `focus-trap-react` |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Accessibility compliance failures | Phase 1 (Foundation) | Run axe DevTools on all pages, Lighthouse accessibility score ≥ 95, keyboard navigation test |
| GSAP performance issues | Phase 1 (Foundation) | Lighthouse performance score ≥ 80, no console warnings, smooth scroll on mobile |
| Image optimization failure | Phase 1 (Foundation) | LCP < 2.5s, all images < 200KB, WebP format used |
| Mobile menu accessibility | Phase 1 (Foundation) | Keyboard navigation works, iOS Safari scroll lock works, ARIA attributes present |
| Form handling pitfalls | Phase 2 (Forms) | Spam protection active, GDPR consent implemented, accessible errors |
| Font loading CLS | Phase 1 (Foundation) | CLS < 0.1, no FOIT/FOUT, fonts preloaded |
| SEO failures | Phase 1 (Foundation) + Phase 4 (Content) | Schema.org markup validated, sitemap.xml exists, unique meta descriptions |
| Video accessibility | Phase 3 (Content) | All videos have captions, controls accessible, no auto-play |
| COPPA compliance (if collecting student data) | Phase 2 (Forms) | Parental consent flow implemented, minimal data collection |
| Security headers missing | Phase 1 (Foundation) | CSP configured, security headers verified with securityheaders.com |

## Sources

**Accessibility & Legal:**
- W3C WCAG 2.1 Quick Reference: https://www.w3.org/WAI/WCAG21/quickref/
- Known accessibility violations from project CONCERNS.md (no accessibility testing, mobile menu issues)

**Performance & GSAP:**
- GSAP ScrollTrigger Documentation: https://gsap.com/docs/v3/Plugins/ScrollTrigger/
- Known GSAP issues from project CONCERNS.md (plugin double-registration, no resize handler, iOS scroll lock)

**Next.js & Images:**
- Next.js Image Optimization Documentation: https://nextjs.org/docs/app/building-your-application/optimizing/images
- Known image issues from project CONCERNS.md (no lazy loading, unoptimized images)

**Project-Specific:**
- Project CONCERNS.md audit (2026-04-27) - identified 7 known bugs, 4 performance bottlenecks, 4 missing critical features
- Project context: Static Next.js export, school website, inspired by The Walker School

---
*Pitfalls research for: St. Elizabeth High School Pomburpa Website*
*Researched: 2026-04-27*
