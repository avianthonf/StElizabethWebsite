# Codebase Concerns

**Analysis Date:** 2026-04-27

## Tech Debt

**Missing Test Coverage:**
- Issue: No test files exist in the codebase. Zero test coverage for all components, hooks, and utilities.
- Files: All files in `src/` directory (41 TypeScript/TSX files)
- Impact: Changes can break functionality without detection. No safety net for refactoring. Violates 80% coverage requirement from project rules.
- Fix approach: Add Jest/Vitest configuration, write unit tests for utilities (`src/lib/utils.ts`, `src/lib/hooks/`), integration tests for components (`src/components/`), and E2E tests with Playwright for critical user flows.

**Large Data Files:**
- Issue: `src/lib/homepage-data.ts` (397 lines) and `src/lib/reference-patterns.ts` (418 lines) contain extensive configuration data mixed with type definitions.
- Files: `src/lib/homepage-data.ts`, `src/lib/reference-patterns.ts`
- Impact: Hard to maintain, difficult to update content without touching code. Content changes require developer intervention.
- Fix approach: Extract data to JSON files in `data/` directory. Keep only type definitions and data loading functions in TypeScript files. Consider CMS integration for content management.

**Placeholder Content:**
- Issue: Homepage uses placeholder images and Vimeo URLs that don't exist (`https://player.vimeo.com/video/placeholder`). Many image paths reference Walker School assets that may not be final.
- Files: `src/lib/homepage-data.ts` (lines 172, 174), `src/app/page.tsx` (lines 9-41)
- Impact: Site will show broken images and videos in production. Non-functional video hero section.
- Fix approach: Replace all placeholder URLs with actual school assets. Audit all image paths in `public/images/` and update references. Add image existence validation in build process.

**Unused Homepage Section Types:**
- Issue: 13 section types defined in `src/lib/homepage-data.ts` but only 7 are actually implemented as components. Types like `IntroBannerSection`, `VideoHeroSection`, `CutoutBannerSection`, etc. have no corresponding components.
- Files: `src/lib/homepage-data.ts` (lines 14-153), missing components in `src/components/sections/`
- Impact: Dead code increases maintenance burden. Confusion about which sections are actually usable.
- Fix approach: Either implement missing section components or remove unused type definitions. Document which sections are production-ready.

**Outdated README:**
- Issue: README.md still contains default Next.js boilerplate text referencing Geist font (not used) and generic deployment instructions.
- Files: `README.md`
- Impact: New developers get incorrect setup information. No project-specific documentation.
- Fix approach: Update README with actual project details, St. Elizabeth High School context, Walker School design system notes, and correct font information (Inter, Playfair Display, Montserrat).

## Known Bugs

**GSAP Plugin Registration in Client Components:**
- Issue: `src/lib/gsap-config.ts` registers GSAP plugins globally with `typeof window !== 'undefined'` check, but this runs on every client component import. Could cause double registration warnings.
- Files: `src/lib/gsap-config.ts` (lines 7-22)
- Trigger: Multiple client components importing GSAP simultaneously during hydration.
- Workaround: Currently works but may log warnings in console.
- Fix: Move plugin registration to a singleton pattern or use Next.js `_app.tsx` equivalent for one-time initialization.

**Horizontal Scroll Calculation on Resize:**
- Issue: `useHorizontalScroll` hook calculates travel distance on mount but doesn't recalculate on window resize. If viewport width changes, scroll animation breaks.
- Files: `src/lib/hooks/useHorizontalScroll.ts` (lines 25-56)
- Trigger: User resizes browser window or rotates mobile device while on values carousel section.
- Workaround: Refresh page after resize.
- Fix: Add resize event listener with debounce to recalculate `travelDistance` and update ScrollTrigger.

**Mobile Menu Body Scroll Lock:**
- Issue: `WalkHeader` locks body scroll when mobile menu opens but doesn't handle edge cases (scroll position jump, iOS Safari issues).
- Files: `src/components/layout/WalkHeader.tsx` (lines 35-38)
- Trigger: Open mobile menu on iOS Safari or after scrolling down the page.
- Workaround: Works on most browsers but may have visual glitches.
- Fix: Use a proper scroll lock library like `body-scroll-lock` or `react-remove-scroll` that handles iOS quirks.

## Security Considerations

**No Environment Variable Validation:**
- Risk: If external APIs are added later (analytics, CMS, forms), missing environment variables will cause runtime errors instead of build-time failures.
- Files: No `.env` file exists, no validation in `next.config.ts`
- Current mitigation: Static site with no external API calls currently.
- Recommendations: Add environment variable schema validation with Zod when APIs are integrated. Fail build if required vars are missing.

**Missing Security Headers:**
- Risk: No Content Security Policy, X-Frame-Options, or other security headers configured for static export.
- Files: `next.config.ts` (no headers configuration)
- Current mitigation: Static site reduces attack surface, but still vulnerable to XSS if user-generated content is added.
- Recommendations: Add security headers in hosting configuration (Vercel, Netlify, etc.). Configure CSP to restrict script sources.

**Image Optimization Disabled:**
- Risk: `next.config.ts` has `images.unoptimized: true` which disables Next.js image optimization. Large unoptimized images increase bandwidth and slow page loads.
- Files: `next.config.ts` (lines 5-7)
- Current mitigation: Images are manually optimized (`.webp` format, `-optimized` suffix in filenames).
- Recommendations: Use Next.js Image component with proper optimization or implement build-time image optimization pipeline. Ensure all images are compressed and served in modern formats.

## Performance Bottlenecks

**Large CSS File:**
- Problem: `src/app/globals.css` is 689 lines with many unused utility classes and component styles loaded on every page.
- Files: `src/app/globals.css`
- Cause: Single global stylesheet with all component styles, even for components not used on current page.
- Improvement path: Split into component-specific CSS modules or use Tailwind's JIT mode more effectively. Remove unused Walker School classes if not needed.

**GSAP Bundle Size:**
- Problem: GSAP library (including ScrollTrigger and Flip plugins) adds significant JavaScript bundle size (~50KB gzipped) but only used on homepage.
- Files: `src/lib/gsap-config.ts`, `src/lib/hooks/useHorizontalScroll.ts`, `src/components/layout/WalkHeader.tsx`
- Cause: GSAP imported in multiple client components, no code splitting.
- Improvement path: Lazy load GSAP only on pages that need scroll animations. Consider CSS-only alternatives for simpler animations.

**No Image Lazy Loading:**
- Problem: All images load immediately, even those below the fold. Homepage has 20+ images that could be lazy loaded.
- Files: `src/app/page.tsx`, `src/components/sections/*.tsx` (all components using `<img>` tags)
- Cause: Using native `<img>` tags instead of Next.js `Image` component.
- Improvement path: Replace `<img>` with Next.js `Image` component with `loading="lazy"` for below-the-fold images. Add priority loading for hero images.

## Fragile Areas

**Horizontal Scroll Animation:**
- Files: `src/lib/hooks/useHorizontalScroll.ts`, `src/components/sections/ValueCarousel.tsx`
- Why fragile: Complex GSAP ScrollTrigger animation with hardcoded viewport calculations. Breaks if container structure changes or CSS affects layout.
- Safe modification: Always test on multiple screen sizes. Don't change container height (`400vh`) without adjusting ScrollTrigger `end` value. Maintain sticky positioning on inner wrapper.
- Test coverage: None - needs visual regression tests.

**Walker Header Ghost Nav:**
- Files: `src/components/layout/WalkHeader.tsx` (313 lines)
- Why fragile: Complex state management for scroll position, mobile menu, hover dropdowns. Multiple useEffect hooks with DOM manipulation.
- Safe modification: Test scroll behavior at different scroll positions. Verify mobile menu doesn't break body scroll. Check dropdown positioning on different screen sizes.
- Test coverage: None - needs integration tests for scroll behavior and mobile menu.

**CSS Custom Properties:**
- Files: `src/app/globals.css` (lines 12-47)
- Why fragile: Many components rely on CSS variables like `--color-primary-maroon`, `--font-heading`, `--section-padding-y`. Changing these affects entire site.
- Safe modification: Use find-and-replace to audit usage before changing. Test on all pages after modifying design tokens.
- Test coverage: None - needs visual regression tests.

**Sticky Split Section Layout:**
- Files: `src/components/sections/StickySplitSection.tsx`
- Why fragile: Relies on precise grid layout (40%/60% split) and sticky positioning. Breaks on narrow viewports or if content height changes unexpectedly.
- Safe modification: Test with varying content lengths. Ensure sticky behavior works on all browsers. Check mobile responsive behavior.
- Test coverage: None - needs responsive layout tests.

## Scaling Limits

**Static Data in TypeScript:**
- Current capacity: ~400 lines of homepage data in `src/lib/homepage-data.ts`
- Limit: Adding more pages or content requires code changes and redeployment. Not scalable for non-technical content editors.
- Scaling path: Migrate to headless CMS (Sanity, Contentful, Strapi) or static JSON files in `data/` directory. Implement content preview and editing workflow.

**No Internationalization:**
- Current capacity: English-only content hardcoded in components
- Limit: Adding Konkani or Hindi translations requires duplicating all components or complex conditional rendering.
- Scaling path: Implement i18n with `next-intl` or `react-i18next`. Extract all text to translation files. Add language switcher in header.

**Single Page Application:**
- Current capacity: All content on homepage (`src/app/page.tsx` - 338 lines)
- Limit: Adding more pages (About, Admissions, Academics, etc.) requires creating new routes and duplicating layout patterns.
- Scaling path: Create page templates in `src/app/` directory. Extract reusable section components. Implement consistent navigation structure.

## Dependencies at Risk

**React 19 (Canary):**
- Risk: Using React 19.2.4 which is still in active development. Breaking changes possible before stable release.
- Impact: Future React updates may break components using new features or change behavior.
- Migration plan: Monitor React 19 release notes. Test thoroughly before upgrading. Consider staying on React 18 LTS for production stability.

**Outdated Dependencies:**
- Risk: Several dependencies have major version updates available (TypeScript 5→6, ESLint 9→10, @types/node 20→25)
- Impact: Missing security patches, new features, and performance improvements. TypeScript 6 may have breaking changes.
- Migration plan: Update dependencies incrementally. Test after each major version bump. Review breaking changes in changelogs before upgrading.

**GSAP Licensing:**
- Risk: GSAP is free for open-source projects but requires commercial license for proprietary use. School website may need license.
- Impact: Legal compliance issue if used commercially without license.
- Migration plan: Verify GSAP license requirements for educational institutions. Consider alternatives like Framer Motion (already installed) or CSS animations if license is needed.

## Missing Critical Features

**No Contact Form:**
- Problem: School website needs contact/inquiry form for admissions, but none exists.
- Blocks: Parent inquiries, admission applications, general contact.
- Priority: High - essential for school website functionality.

**No Search Functionality:**
- Problem: Search button in header (`src/components/layout/WalkHeader.tsx` line 165) is non-functional.
- Blocks: Users can't find specific information on site.
- Priority: Medium - important for usability as content grows.

**No Analytics:**
- Problem: No Google Analytics, Plausible, or other analytics integration.
- Blocks: Can't measure site traffic, user behavior, or conversion rates.
- Priority: Medium - needed for marketing and improvement decisions.

**No Accessibility Testing:**
- Problem: No automated accessibility tests (axe-core, jest-axe, Lighthouse CI).
- Blocks: WCAG compliance verification, legal requirements for educational institutions.
- Priority: High - schools must meet accessibility standards.

## Test Coverage Gaps

**Untested Hooks:**
- What's not tested: All custom hooks in `src/lib/hooks/` - `useHorizontalScroll.ts`, `useScrollProgress.ts`, `useClipMask.ts`, `useScrollDirection.ts`, `useHorizontalScroll.ts`, `useParallax.ts`
- Files: `src/lib/hooks/*.ts` (6 files)
- Risk: Complex scroll-based animations could break without detection. GSAP integration fragile.
- Priority: High - these hooks control critical UI behavior.

**Untested Components:**
- What's not tested: All 39 components in `src/components/` have zero test coverage.
- Files: `src/components/**/*.tsx`
- Risk: Prop changes, refactoring, or dependency updates could break UI without detection.
- Priority: High - at minimum, test critical user-facing components (Header, Footer, Hero sections).

**Untested Utilities:**
- What's not tested: `src/lib/utils.ts`, `src/lib/gsap-config.ts`, `src/lib/site-navigation.ts`
- Files: `src/lib/*.ts`
- Risk: Utility functions used across multiple components could have bugs affecting entire site.
- Priority: Medium - utilities are typically stable but should have unit tests.

**No E2E Tests:**
- What's not tested: Critical user flows like navigation, mobile menu, scroll animations, responsive behavior.
- Files: No E2E test files exist
- Risk: Integration issues between components, browser-specific bugs, responsive layout problems go undetected.
- Priority: High - E2E tests catch issues unit tests miss.

---

*Concerns audit: 2026-04-27*
