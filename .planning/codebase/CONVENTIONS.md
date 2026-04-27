# Coding Conventions

**Analysis Date:** 2026-04-27

## Naming Patterns

**Files:**
- Components: PascalCase with descriptive names - `ValueCarousel.tsx`, `StickySplitSection.tsx`, `Header.tsx`
- Hooks: camelCase with `use` prefix - `useHorizontalScroll.ts`, `useScrollProgress.ts`, `useClipMask.ts`
- Utilities: camelCase - `utils.ts`, `site-navigation.ts`, `homepage-data.ts`
- Config files: kebab-case - `gsap-config.ts`
- Pages: lowercase - `page.tsx`, `layout.tsx` (Next.js App Router convention)

**Functions:**
- Components: PascalCase - `ValueCarousel`, `Button`, `Accordion`
- Hooks: camelCase with `use` prefix - `useHorizontalScroll`, `useScrollProgress`
- Utilities: camelCase - `cn`, `clamp`, `mapRange`, `getNavItemByHref`, `getBreadcrumbs`

**Variables:**
- Constants: camelCase for local, SCREAMING_SNAKE_CASE for image mappings - `const IMAGES = {...}`
- State variables: camelCase - `mobileOpen`, `openIndex`, `openSubmenu`
- Props: camelCase - `heroImage`, `leftImage`, `backgroundColor`

**Types:**
- Interfaces: PascalCase - `NavItem`, `AccordionItem`, `ValueItem`, `StickySplitSectionProps`
- Type aliases: PascalCase - `ButtonVariant`, `Metadata`
- Props interfaces: Component name + `Props` suffix - `ButtonProps`, `AccordionProps`, `ValueCarouselProps`

## Code Style

**Formatting:**
- No Prettier config detected - using default Next.js/ESLint formatting
- Indentation: 2 spaces (inferred from existing files)
- Semicolons: Present (TypeScript default)
- Quotes: Single quotes for imports, double quotes for JSX attributes
- Line length: No strict limit, but typically wraps around 100-120 characters

**Linting:**
- Tool: ESLint 9 with Next.js config
- Config: `eslint.config.mjs` using `eslint-config-next/core-web-vitals` and `eslint-config-next/typescript`
- Ignored paths: `.next/`, `out/`, `build/`, `next-env.d.ts`

## Import Organization

**Order:**
1. React/Next.js core imports - `import { useState } from "react"`, `import type { Metadata } from "next"`
2. Third-party libraries - `import { Menu, X } from "lucide-react"`, `import { motion } from "framer-motion"`
3. Local imports with `@/` alias - `import { cn } from "@/lib/utils"`, `import { siteNavigation } from "@/lib/site-navigation"`

**Path Aliases:**
- `@/*` maps to `./src/*` (configured in `tsconfig.json`)
- All internal imports use `@/` prefix - `@/components/ui/Button`, `@/lib/utils`, `@/lib/hooks/useHorizontalScroll`

**Pattern:**
```typescript
// React/Next.js
import { useState } from 'react';
import type { Metadata } from 'next';

// Third-party
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

// Local
import { cn } from '@/lib/utils';
import { siteNavigation } from '@/lib/site-navigation';
```

## Error Handling

**Patterns:**
- Minimal explicit error handling in current codebase (early stage project)
- Type safety via TypeScript strict mode (`"strict": true` in `tsconfig.json`)
- Optional chaining used for nullable props - `item.href ?? '#'`, `values ?? defaultValues`
- Null checks for conditional rendering - `{leftImage && <img src={leftImage} />}`

**Recommended pattern (not yet consistently implemented):**
```typescript
try {
  const result = await riskyOperation();
  return result;
} catch (error: unknown) {
  if (error instanceof Error) {
    console.error('Operation failed:', error.message);
  }
  throw new Error('Failed to complete operation');
}
```

## Logging

**Framework:** Native `console` (no logging library detected)

**Patterns:**
- No `console.log` statements found in production code (good practice)
- Development logging should be removed before commit
- Use `console.error` for error logging when needed

## Comments

**When to Comment:**
- Component purpose and architecture - JSDoc-style block comments at component top
- Complex logic explanation - inline comments for GSAP animations, scroll calculations
- Section markers - `{/* SECTION 1: Hero */}` in page files
- Architecture notes - "Walker School pattern", "SOP-001 spec" references

**JSDoc/TSDoc:**
- Used for utility functions - `@/lib/utils.ts` has JSDoc comments
- Used for exported functions - `getNavItemByHref`, `getBreadcrumbs` in `site-navigation.ts`
- Component props documented via TypeScript interfaces (self-documenting)

**Examples:**
```typescript
/**
 * Tailwind merge utility — merges Tailwind classes intelligently.
 * Use this instead of template literal class concatenation
 * to avoid specificity conflicts and duplicate classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Walker "WE VALUE" horizontal scroll carousel.
 *
 * Architecture (SOP-001 + Blueprint):
 * - Container: h-[400vh] — creates 4x viewport scroll space
 * - Inner: sticky top-0 h-screen — pins while user scrolls
 * - Track: flex container slides from right → left on scroll
 * - GSAP: scroll-linked translateX, scrub: 1 (buttery smooth)
 */
export function ValueCarousel({ values }: ValueCarouselProps) {
  // ...
}
```

## Function Design

**Size:** 
- Small focused functions preferred
- Component functions: 50-150 lines typical
- Inline helper components used for single-use cases - `PassionsPanel` in `page.tsx`
- Extract to separate file when reused across components

**Parameters:**
- Props via destructured interface - `function Button({ label, icon, href, variant, onClick, className }: ButtonProps)`
- Optional parameters with defaults - `variant = 'primary'`, `backgroundColor = 'white'`
- Nullable parameters with `?` - `icon?: React.ReactNode`, `leftImage?: string | null`

**Return Values:**
- React components return JSX
- Utility functions have explicit return types - `export function cn(...inputs: ClassValue[]): string`
- Hooks return typed values - `function useScrollProgress(): number`

## Module Design

**Exports:**
- Named exports preferred - `export function Button()`, `export interface NavItem`
- Default exports for pages - `export default function Home()`, `export default function RootLayout()`
- Type exports use `export type` or `export interface`

**Barrel Files:**
- Not used - direct imports from specific files
- Pattern: `import { Button } from '@/components/ui/Button'` (not `from '@/components/ui'`)

## React Patterns

**Server vs Client Components:**
- Server components by default (Next.js 14+ App Router)
- Client components marked with `'use client'` directive at top of file
- Use `'use client'` for: state (`useState`), effects (`useEffect`), event handlers, browser APIs, animation libraries

**Client component files:**
- `src/components/layout/Header.tsx`
- `src/components/layout/WalkHeader.tsx`
- `src/components/sections/ValueCarousel.tsx`
- `src/components/sections/StickySplitSection.tsx`
- `src/components/sections/DivisionsTabs.tsx`
- `src/components/ui/Accordion.tsx`
- `src/components/ui/Carousel.tsx`
- All custom hooks in `src/lib/hooks/`

**State Management:**
- Local component state with `useState` - `const [mobileOpen, setMobileOpen] = useState(false)`
- Refs for DOM access - `const containerRef = useRef<HTMLDivElement>(null)`
- No global state management (Redux, Zustand) - not needed for static site

**Styling:**
- Tailwind CSS v4 for utility classes - `className="flex items-center gap-2"`
- Inline styles for dynamic/computed values - `style={{ backgroundColor: bg }}`
- CSS custom properties for theme values - `var(--color-primary-maroon)`, `var(--section-padding-y)`
- `cn()` utility for conditional classes - `cn(base, variants[variant], className)`

**TypeScript:**
- Strict mode enabled
- Explicit prop types via interfaces
- Type imports with `import type` - `import type { Metadata } from "next"`
- Generic types for reusable components - `useRef<HTMLDivElement>(null)`
- Union types for variants - `type ButtonVariant = 'primary' | 'outline' | 'ghost'`

## File Organization

**Component Structure:**
```typescript
'use client'; // If needed

// Imports
import { useState } from 'react';
import { Icon } from 'lucide-react';
import { utility } from '@/lib/utils';

// Types/Interfaces
interface ComponentProps {
  prop: string;
}

// Main Component
export function Component({ prop }: ComponentProps) {
  // Hooks
  const [state, setState] = useState();
  
  // Handlers
  const handleClick = () => {};
  
  // Render
  return <div>...</div>;
}

// Helper Components (if single-use)
function HelperComponent() {
  return <div>...</div>;
}
```

**Data Files:**
- Separate data from components - `src/lib/site-navigation.ts`, `src/lib/homepage-data.ts`
- Export typed data structures - `export const siteNavigation: NavItem[]`
- Include helper functions with data - `getNavItemByHref`, `getBreadcrumbs`

---

*Convention analysis: 2026-04-27*
