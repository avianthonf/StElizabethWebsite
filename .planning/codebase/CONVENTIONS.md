# Coding Conventions

**Analysis Date:** 2026-04-28

## Naming Patterns

### Files
- **React Components**: PascalCase — `Button.tsx`, `HeroMasked.tsx`, `StickySplitSection.tsx`, `WalkHeader.tsx`
- **Hooks**: camelCase with `use` prefix — `useHorizontalScroll.ts`, `useClipMask.ts`, `useParallax.ts`, `useScrollDirection.ts`
- **Utilities**: camelCase — `utils.ts`, `site-navigation.ts`, `form-validation.ts`, `gsap-config.ts`, `image-loader.ts`
- **Configuration**: kebab-case — `vitest.config.ts`, `playwright.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`
- **Pages** (Next.js App Router): lowercase — `page.tsx`, `layout.tsx`
- **Test files**: `*.test.ts` or `*.test.tsx` — `useHorizontalScroll.test.ts`
- **E2E tests**: `*.spec.ts` — `navigation.spec.ts`, `scroll-animations.spec.ts`, `mobile-menu.spec.ts`, `accessibility.spec.ts`

### Variables & Functions
- **State variables**: camelCase — `mobileOpen`, `openIndex`, `scrolled`, `mounted`, `hoveredItem`, `isSubmitting`, `active`
- **Event handlers**: camelCase with descriptive name — `handleChange`, `handleSubmit`, `handleResize`, `handleKeyDown`, `handleVerticalScroll`, `handleHorizontalScroll`, `handleEscape`
- **Refs**: camelCase with `Ref` suffix — `containerRef`, `trackRef`, `imageRef`, `overlayRef`, `textRef`, `maskGroupRef`, `headerRef`, `firstNameRef`, `subjectRef`
- **Callbacks**: camelCase with callback suffix — `onSelect`, `scrollPrev`, `scrollNext`, `scrollTo`, `createScrollAnimation`, `onChange`
- **Props**: camelCase — `heroImage`, `leftImage`, `rightImages`, `backgroundColor`, `overline`, `heading`, `body`, `children`, `showArrows`, `showDots`

### Types & Interfaces
- **Interfaces**: PascalCase — `NavItem`, `ButtonProps`, `AccordionItem`, `StickySplitSectionProps`, `ContactFormData`, `AdmissionsFormData`, `FormErrors`, `ValueItem`, `DivisionItem`, `GdprConsentProps`, `ScrollRevealProps`
- **Type aliases**: PascalCase — `ButtonVariant`, `Metadata`
- **Props interface naming**: Component name + `Props` suffix — `ButtonProps`, `AccordionProps`, `ScrollRevealProps`, `StickySplitSectionProps`, `GdprConsentProps`
- **Union types**: literal strings — `type ButtonVariant = 'primary' | 'outline' | 'ghost'`, `backgroundColor?: 'white' | 'light' | 'dark' | 'maroon'`

### Constants
- camelCase for local constants: `base`, `variants`, `values`, `divisions`, `IMAGES`, `totalWidth`, `travelDistance`
- SCREAMING_SNAKE_CASE for exported image mappings: `const IMAGES = { heroCampus: "...", faith: "..." }`

## Code Style

### Formatting
- **Indentation**: 2 spaces
- **Semicolons**: Present (TypeScript default)
- **Quotes**: Single quotes for imports and strings; double quotes for JSX attribute values
- **Line length**: No strict limit; typically wraps around 100-120 characters
- **Blank lines**: Used to separate logical blocks (imports from component code, sections within components, before return statements)
- **Trailing commas**: Used in multi-line object/array literals and function parameters

### ESLint Configuration
- **Version**: ESLint 9.x
- **Config**: `eslint.config.mjs` using `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- **Rules**: Next.js recommended rules (core-web-vitals) + TypeScript rules
- **Ignored paths**: `.next/`, `out/`, `build/`, `next-env.d.ts`

```javascript
// eslint.config.mjs
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
```

### TypeScript Configuration
- **strict**: true — all strict type checking enabled
- **noEmit**: true — no compiled output during development
- **esModuleInterop**: true — compatibility with CommonJS modules
- **module**: `esnext` — ES modules
- **moduleResolution**: `bundler` — Next.js-compatible resolution
- **resolveJsonModule**: true — import JSON files
- **isolatedModules**: true — faster type checking
- **jsx**: `react-jsx` — modern JSX transform
- **incremental**: true — faster rebuilds
- **plugins**: Next.js plugin
- **Target**: ES2017
- **lib**: `dom`, `dom.iterable`, `esnext`
- **Path aliases**: `@/*` maps to `./src/*`

### Import Organization
Imports are organized in this order, with blank lines between groups:

1. **External packages** (React, Next.js, third-party libraries)
   ```typescript
   import { useState, useEffect } from 'react';
   import type { Metadata } from 'next';
   import { gsap } from '@/lib/gsap-config';
   import { ChevronRight } from 'lucide-react';
   import useEmblaCarousel from 'embla-carousel-react';
   ```

2. **Type-only imports** (using `import type`)
   ```typescript
   import type { ContactFormData, FormErrors } from '@/lib/form-validation';
   import type { ReactNode } from 'react';
   ```

3. **Internal imports** (all use `@/` prefix, direct file imports)
   ```typescript
   import { cn } from '@/lib/utils';
   import { siteNavigation } from '@/lib/site-navigation';
   import { Button } from '@/components/ui/Button';
   import { WalkHeader } from '@/components/layout/WalkHeader';
   import { HeroMasked } from '@/components/sections/HeroMasked';
   ```

**Path aliases**: All internal imports use `@/` prefix — never relative paths like `../../components/Button`. Configured in `tsconfig.json`:
```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

### Code Quality Standards
Per `.claude/rules/common/coding-style.md`:

- **Immutability**: Create new objects, never mutate existing ones
- **File size**: 200-400 lines typical; maximum 800 lines
- **Function size**: 50 lines or less
- **Nesting depth**: Avoid more than 4 levels

## Error Handling

### Error Handling Strategy
- **Explicit error handling** at all system boundaries (API calls, form submissions, user input)
- **User-friendly error messages** in UI-facing code
- **Detailed error context** logged (console.error) on client
- **No silent failures** — errors always produce visible feedback or console output
- **TypeScript strict mode** catches type errors at build time

### Patterns

#### Schema-based Form Validation
Forms use typed validation functions returning an error map:

```typescript
export interface FormErrors {
  [key: string]: string;
}

export function validateContactForm(data: ContactFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) errors.firstName = 'First name is required';
  if (!data.lastName.trim()) errors.lastName = 'Last name is required';

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.subject) errors.subject = 'Please select a subject';
  if (!data.message.trim()) errors.message = 'Message is required';

  return errors;
}
```

#### Try-Catch with User Feedback (Form Submissions)
```typescript
try {
  const response = await fetch(FORMSPREE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  if (response.ok) {
    setSubmitStatus('success');
    setSubmitMessage('Thank you for contacting us...');
  } else {
    throw new Error('Form submission failed');
  }
} catch (error) {
  console.error('Form submission error:', error);
  setSubmitStatus('error');
  setSubmitMessage('Sorry, there was an error submitting your form...');
} finally {
  setIsSubmitting(false);
}
```

#### Real-time Error Clearing
```typescript
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
  // Clear error for this field when user starts typing
  if (errors[name]) {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
  }
};
```

#### Conditional Error Rendering
```typescript
{errors.email && (
  <p
    id="email-error"
    style={{ fontSize: 14, color: 'var(--color-primary-maroon)', marginTop: 4 }}
    role="alert"
  >
    {errors.email}
  </p>
)}
```

#### Submit Status States
Form components track three states:
- `'idle'` — initial state
- `'success'` — form submitted successfully; show success message
- `'error'` — submission failed; show error message

### Honeypot Bot Detection
Bot submissions detected via hidden honeypot field:
```typescript
if (isHoneypotFilled(formData.website)) {
  console.warn('Honeypot triggered - bot detected');
  return; // Silently fail for bots
}
```
Logged with `console.warn()` (non-blocking, informative).

### Accessibility Error Handling
- Error messages use `role="alert"` for screen reader announcement (assertive live region)
- Form fields use `aria-invalid={!!errors.fieldName}` to indicate invalid state
- `aria-describedby` links inputs to error messages: `aria-describedby={errors.email ? 'email-error' : undefined}`
- Success messages use `role="status"` with `aria-live="polite"`
- Error message container uses `role="alert"` with `aria-live="assertive"`
- `aria-live` region at form level for summary: `<div aria-live="polite" aria-atomic="true" style={{ position: 'absolute', left: '-9999px' }}>Form has X errors</div>`

### Missing Data Checks
Conditional rendering prevents null reference errors:
```typescript
{leftImage && <img src={leftImage} alt="..." />}
if (!containerRef.current || !trackRef.current) return;
```

### Hook Guards (SSR-safe)
All hooks using browser APIs include guard clause:
```typescript
useEffect(() => {
  if (typeof window === 'undefined' || !elementRef.current) return;
  // ... animation logic
}, [elementRef, speed]);
```

## Logging

### Console Usage
No logging library; uses native `console`:

- **`console.warn`**: Non-critical warnings (e.g., honeypot triggered, deprecated usage) — visible in dev, not error-level
- **`console.error`**: Runtime errors requiring attention (e.g., form submission failures)

**Good practice observed**: No `console.log` statements found in production code.

### Development Logging Discipline
`console.*` statements added during development should be removed or downgraded appropriately before commits.

## Comments

### JSDoc/TSDoc Usage
Used for exported functions with non-obvious logic:

```typescript
/**
 * Tailwind merge utility — merges Tailwind classes intelligently.
 * Use this instead of template literal class concatenation
 * to avoid specificity conflicts and duplicate classes.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Walker "WE VALUE" horizontal scroll carousel.
 *
 * Physics (SOP-001):
 * - Container: h-[400vh] — creates 4x viewport scroll space
 * - Inner: sticky top-0 h-screen — pins the carousel while scrolling
 * - Animation: translateX(0) → translateX(-100%) mapped to scroll
 */
export function useHorizontalScroll({ containerRef, trackRef }: { ... }) { ... }
```

### Section Markers in Page Files
```typescript
{/* SECTION 1: Hero */}
{/* SECTION 2: We Value */}
{/* SECTION 3: Accolades */}
```

### Architecture Notes
Comments reference design specs:
```typescript
// Walker "WE BELIEVE" Hero Section — Masking Engine (SOP-001).
// Walker Accordion — used for "READ MORE" expanding info panels.
// Walker spec: active state has horizontal black line extending right
```

### Inline Section Dividers for Complex SVG/Animation Logic
```typescript
{/* ── 1. Background Image / Video ───────────────────────────────── */}
{/* ── 2. SVG Mask Overlay ─────────────────────────────────────────── */}
```

### Planning TODOs
Conditional feature placeholders marked with TODO:
```typescript
// TODO: Update telephone, email, and social media URLs with actual values
// PLACEHOLDER: Using Walker School images until St. Elizabeth photos provided
```

## Function Design

### Small Focused Functions
- **Component functions**: 50-150 lines typical
- **Utility functions**: As small as practical (`cn`, `clamp`, `mapRange` are 2-8 lines each)
- **Inline helper components** for single-use cases: `ValueCard`, `PassionsPanel`, `ContactCard`, `DepartmentContact` within page files
- **Extract to separate file** when reused across components

### Parameters
- **Props**: Single destructured interface parameter
  ```typescript
  export function Button({
    label,
    icon,
    href,
    variant = 'primary',
    onClick,
    className,
  }: ButtonProps) { ... }
  ```
- **Optional parameters**: With default values or nullable types
  ```typescript
  variant = 'primary'
  icon?: React.ReactNode
  leftImage?: string | null
  speed = 0.4
  ```
- **Refs**: Passed as `React.RefObject<HTMLElement | null>` or more specific types like `React.RefObject<SVGGElement | null>`

### Return Values
- **React components**: Return JSX
- **Utility functions**: Explicit return types
  ```typescript
  export function cn(...inputs: ClassValue[]): string
  export function clamp(min: number, pref: number, max: number): string
  export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number
  export function getNavItemByHref(href: string): NavItem | null
  export function getBreadcrumbs(href: string): NavItem[]
  export function isHoneypotFilled(honeypotValue: string): boolean
  ```
- **Hooks**: Typed return values (or void)
  ```typescript
  function useScrollProgress(): number
  function useParallax(elementRef: React.RefObject<HTMLElement | null>, speed = 0.4): void
  function useHorizontalScroll({ containerRef, trackRef }: { ... }): void
  ```

## Module Design

### Export Patterns
- **Named exports preferred**: `export function Button()`, `export function Accordion()`, `export interface NavItem`
- **Default exports for pages**: `export default function Home()`, `export default function RootLayout()`
- **Type exports**: Use `export type` or `export interface`
- **Data exports**: Typed constants and helper functions
  ```typescript
  export const siteNavigation: NavItem[] = [ ... ];
  export function getNavItemByHref(href: string): NavItem | null { ... }
  export function getBreadcrumbs(href: string): NavItem[] { ... }
  ```

### Import Pattern: Specific File Imports
Import from specific component files, never barrel re-exports:
```typescript
import { Button } from '@/components/ui/Button';
import { WalkHeader } from '@/components/layout/WalkHeader';
```
Not: `import { Button } from '@/components/ui'`

### Data Separation
Data separated from components and stored in `src/lib/`:
- `src/lib/site-navigation.ts` — navigation structure as typed array + lookup helpers
- `src/lib/homepage-data.ts` — homepage content data (placeholder with Walker images)
- `src/lib/form-validation.ts` — validation functions and form data interfaces

## React Patterns

### Server Components by Default
Next.js 14+ App Router convention: components are Server Components unless interactivity requires them to be Client Components.

### Client Component Directive
Add `'use client'` at top of file ONLY when using:
- State (`useState`, `useReducer`)
- Effects (`useEffect`, `useLayoutEffect`)
- Event handlers (`onClick`, `onChange`, `onKeyDown`, `onMouseEnter`, `onMouseLeave`)
- Browser APIs (`window`, `document`, `localStorage`, `resize` event)
- Animation libraries (GSAP context, Framer Motion, useEmblaCarousel)
- Non-primitive refs (`useRef` for DOM access)

Client component files:
- `src/components/layout/WalkHeader.tsx`
- `src/components/sections/HeroMasked.tsx`
- `src/components/sections/StickySplitSection.tsx`
- `src/components/ui/Accordion.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Carousel.tsx`
- `src/components/ui/PageTransition.tsx`
- `src/components/ui/ScrollReveal.tsx`
- `src/lib/hooks/*` (all hooks)
- `src/app/page.tsx`
- `src/app/contact/page.tsx`
- `src/app/admissions/page.tsx`

### State Management
- **Local component state**: `useState` for UI state (tabs, accordions, form fields, loading indicators)
- **No global state management**: No Redux, Zustand, or Context API (not needed for static site)

### Refs
Used for DOM access in animation hooks, typed with generic parameters:
```typescript
const containerRef = useRef<HTMLDivElement>(null);
const trackRef = useRef<HTMLDivElement>(null);
const maskGroupRef = useRef<SVGGElement>(null);
```

## Styling

### Tailwind CSS + Custom CSS
- **Tailwind CSS v4**: Utility-first approach for layout, spacing, typography, colors
- **Custom CSS in `globals.css`**: Walker-specific design tokens, custom utilities
- **Prefer Tailwind** when possible; use inline styles or custom classes for dynamic/computed values

### CSS Custom Properties (Design Tokens)
All design values from CSS variables (Walker School Design Tokens):

```css
:root {
  --color-primary-maroon: #6C1F35;
  --color-secondary-maroon: #4A1524;
  --color-deep-maroon: #2E0D1A;
  --color-white: #FFFFFF;
  --color-gray-light: #F5F5F5;
  --color-gray: #555555;
  --color-text-main: #1A1A1A;
  --color-text-dark: #000000;
  --color-primary-maroon: #6C1F35;
  --font-heading: var(--font-montserrat);
  --font-body: var(--font-inter);
  --font-display: var(--font-playfair);
  --ease-smooth: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1);
  --section-padding-y: clamp(4rem, 10vw, 12rem);
}
```

Used in components as: `style={{ backgroundColor: 'var(--color-primary-maroon)' }}`

### Inline Styles
Used for:
- Dynamic/computed values
- Design token values referencing CSS variables
- Component-specific styling not needing CSS class reuse

### className Pattern
Custom `cn()` utility merges Tailwind classes conditionally:
```typescript
import { cn } from '@/lib/utils';
className={cn(base, variants[variant], className)}
```

### Responsive Design
- Mobile-first approach
- Tailwind responsive prefixes: `hidden lg:flex`, `md:px-12`
- Fluid typography via CSS `clamp()`: `clamp(2rem, 5vw, 5rem)`
- Grid breakpoints in custom CSS utilities (`.values-grid`, `.walker-split`)

## Semantic HTML & Accessibility

### HTML Elements
- Semantic tags: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Form elements: `<label>`, `<input>`, `<select>`, `<textarea>`, `<button>`

### ARIA Attributes
- Navigation: `aria-label="Main navigation"`, `aria-label="Toggle menu"`, `aria-label="Close menu"`
- Buttons: `aria-label="Previous slide"`, `aria-label="Next slide"`, `aria-label="Search"`
- Expanded state: `aria-expanded={mobileOpen}`
- Form fields: `aria-required="true"`, `aria-invalid={!!errors.fieldName}`, `aria-describedby={...}`
- Status containers: `role="status"`, `role="alert"` with `aria-live="polite"` or `"assertive"`

### Alt Text
All images include `alt` attribute:
- Descriptive alt text for content images: `alt="St. Elizabeth High School campus"`
- Empty `alt=""` for decorative images with `aria-hidden="true"`

### Keyboard Navigation
- All interactive elements keyboard-accessible
- Escape key closes mobile menu and clears form errors
- Natural tab order preserved; no `tabIndex` manipulation except on honeypot field

---

*Convention analysis: 2026-04-28*
