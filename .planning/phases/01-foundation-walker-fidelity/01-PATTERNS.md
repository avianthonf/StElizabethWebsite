# Phase 1: Foundation & Walker Fidelity — Pattern Map

**Mapped:** 2026-04-28
**Files analyzed:** 9
**Analogs found:** 7 / 7 (full coverage)

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| Homepage scroll journey hardening | client page | streaming (GSAP) | `src/app/page.tsx` | exact |
| GSAP hook lifecycle improvements | hook | streaming | `src/lib/hooks/useHorizontalScroll.ts` | exact |
| Event-driven section coordination | client component | event-driven | `src/components/sections/HeroMasked.tsx` | exact |
| Responsive section layouts | client component | streaming/CSS | `src/components/sections/StickySplitSection.tsx` | exact |
| Ghost header state transitions | client layout | request-response + event | `src/components/layout/WalkHeader.tsx` | exact |
| GSAP shared config | utility/singleton | N/A | `src/lib/gsap-config.ts` | exact |
| Test placement (Vitest) | test | N/A | `src/lib/hooks/useHorizontalScroll.test.ts` | exact |

## Pattern Assignments

### `src/app/page.tsx` (client page, streaming scroll orchestration)

**Analog:** Existing `src/app/page.tsx` — use this exact file as the Phase 1 modification target

**Homepage orchestration pattern** — full-page client page with horizontal scroll container (lines 1-55):

```typescript
'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { WalkHeader } from "@/components/layout/WalkHeader";
import { HeroMasked } from "@/components/sections/HeroMasked";
import { StickySplitSection } from "@/components/sections/StickySplitSection";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";

// Debounce utility for resize handler
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// PLACEHOLDER: Using Walker School images until St. Elizabeth photos provided
const IMAGES = { ... };

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Full-page horizontal scroll setup
  useEffect(() => {
    if (!mounted || !scrollContainerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const container = scrollContainerRef.current!;

      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const travelDistance = totalWidth - viewportWidth;

      // Dynamic height allocation — fixes under-allocation on wide screens
      container.style.height = `${travelDistance + window.innerHeight}px`;
      container.style.minHeight = `${travelDistance + window.innerHeight * 2}px`;

      // Create horizontal scroll animation
      gsap.to(track, {
        x: -travelDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${travelDistance}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const progress = self.progress;
            window.dispatchEvent(new CustomEvent('horizontal-scroll-progress', {
              detail: { progress },
            }));
            window.dispatchEvent(new CustomEvent('horizontal-scroll-hero', {
              detail: { progress },
            }));
          },
        },
      });
    }, scrollContainerRef);

    // Handle resize
    const handleResize = debounce(() => {
      ScrollTrigger.refresh();
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <>
        <WalkHeader />
        <main>
          <SkeletonLoader variant="section" />
        </main>
      </>
    );
  }

  return (
    <>
      <WalkHeader />
      <div ref={scrollContainerRef} style={{ minHeight: '900vh', position: 'relative' }}>
        <div ref={trackRef} style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', overflow: 'hidden', willChange: 'transform' }}>
          {/* 9 sections: each wraps a component with minWidth: '100vw' */}
        </div>
      </div>
    </>
  );
}
```

**Key traits:**
- `'use client'` directive at top (mounted state, GSAP context, refs)
- `mounted` flag to prevent hydration mismatch + skeleton loader
- Dynamic `travelDistance = track.scrollWidth - window.innerWidth` calculation
- GSAP context with cleanup via `ctx.revert()` (not just `ScrollTrigger.refresh()`)
- Dynamic container height + minHeight buffer for pin release safety
- `scrub: 1.2` for Walker's "heavy premium feel" (buttery-smooth)
- `invalidateOnRefresh: true` to recalc endpoint on resize/refresh
- `onUpdate` callback dispatches two CustomEvents for children

**Data/asset mapping pattern** — inline content with placeholder IMAGES object (lines 22-63):

```typescript
// PLACEHOLDER: Using Walker School images until St. Elizabeth photos provided
const IMAGES = {
  heroCampus: "/images/videocover2-812-optimized.webp",
  faith: "/images/Curiosity-310-optimized.webp",
  // ... more category-specific images
};

const values = [
  { number: "01", image: IMAGES.faith, title: "Faith", description: "..." },
  // ... 4 values
];

const divisions = [
  { id: "grade-8", label: "Grade 8", heading: "Grade 8", ... },
  // ... 5 divisions
];

export default function Home() {
  // (see above pattern)
  return (
    <>
      <WalkHeader />
      {/* 9 SECTION BLOCKS — each takes one full viewport width */}
      {/* SECTION 1: Hero */}
      <div style={{ minWidth: '100vw', height: '100vh' }}>
        <HeroMasked heroImage={IMAGES.heroCampus} />
      </div>
      {/* SECTION 2..9 follow same wrapper pattern with inline or component content */}
    </>
  );
}
```

**Inline helper component pattern** — small single-use helpers defined within `page.tsx` (lines 65-382):

```typescript
// Define as regular functions in same file; no exports
function ValueCard({ item }: { item: typeof values[0] }) {
  return (
    <article style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      {/* number badge, image, title, description, link */}
    </article>
  );
}

function PassionsPanel({ bg, textColor, number, label, description, image, imagePosition }: {
  bg: string; textColor: string; number: string; label: string;
  description: string; image: string; imagePosition: "left" | "right";
}) {
  const descColor = bg === "var(--color-text-main)" ? "rgba(255,255,255,0.7)"
               : bg === "var(--color-primary-maroon)" ? "rgba(255,255,255,0.85)"
               : "rgba(51,51,51,0.7)";
  return (
    <div style={{ backgroundColor: bg, minWidth: '100vw', height: '100vh', flexShrink: 0, ... }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 'clamp(32px, 6vw, 80px)', ... }}>
        <img src={image} alt={label} style={/* maxHeight: '60vh', filter based on bg */} />
        <div style={{ maxWidth: 420 }}>{/* text content */}</div>
      </div>
    </div>
  );
}

function DivisionsTabsHorizontal({ divisions }: { divisions: DivisionItem[] }) {
  const [active, setActive] = useState(0);
  const activeDivision = divisions[active];
  return (
    <div style={{ width: '100%', height: '100vh', backgroundColor: 'var(--color-white)', ... }}>
      {/* Two-column grid: left=tabs, right=activeDivision content */}
    </div>
  );
}
```

**Section wrapper pattern for horizontal scroll** — every horizontal section gets an outer wrapper:

```typescript
<div style={{
  minWidth: '100vw',
  height: '100vh',
  flexShrink: 0,
  overflow: 'hidden',
  position: 'relative', // as needed per component type
}}>
  <ComponentName {...props} />
</div>
```

**Skeleton + hydration guard pattern** — wrapper for SSR mismatches (lines 457-466):

```typescript
if (!mounted) {
  return (
    <>
      <WalkHeader />
      <main>
        <SkeletonLoader variant="section" />
      </main>
    </>
  );
}
```

**Section markers for scanability** (comment convention):

```typescript
{/* SECTION 1: Hero */}
{/* SECTION 2: We Value */}
{/* SECTION 3: Accolades */}
{/* SECTION 4: Mission */}
{/* SECTION 5: Athletics */}
/* SECTION 6: Arts */
/* SECTION 7: Academics */
/* SECTION 8: Divisions Tabs */
/* SECTION 9: Footer CTA */
```

---

### `src/lib/hooks/useHorizontalScroll.ts` (hook, streaming scroll animation)

**Analog:** Existing `src/lib/hooks/useHorizontalScroll.ts` — template for GSAP hook lifecycle + resize stability

**GSAP hook lifecycle pattern** — acceptor pattern with refs, SSR guard, context, cleanup (lines 30-84):

```typescript
export function useHorizontalScroll({
  containerRef,
  trackRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !containerRef.current ||
      !trackRef.current
    ) {
      return;
    }

    const createScrollAnimation = () => {
      const totalWidth = trackRef.current!.scrollWidth;
      const viewportWidth = window.innerWidth;
      const travelDistance = totalWidth - viewportWidth;

      return gsap.context(() => {
        gsap.to(trackRef.current, {
          x: -travelDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=300%',  // placeholder — page.tsx uses dynamic `+=${travelDistance}`
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
          },
        });
      });
    };

    let animationContext = createScrollAnimation();

    const handleResize = debounce(() => {
      if (!containerRef.current || !trackRef.current) return;
      animationContext.revert();
      animationContext = createScrollAnimation();
      ScrollTrigger.refresh();
    }, 150);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      animationContext.revert();
    };
  }, [containerRef, trackRef]);
}
```

**Key traits:**
- Dependency-array acceptance of `React.RefObject<HTMLDivElement | null>` pairs
- SSR guard immediately in effect body (`typeof window === 'undefined'`)
- `createScrollAnimation` closure captures refs and recalculates `travelDistance`
- GSAP context stored in variable, callable via `animationContext.revert()` for refresh cycle
- Debounced resize handler — reverts context, recalculates, then `ScrollTrigger.refresh()`
- Cleanup removes event listener and reverts GSAP context
- Typed `debounce<T>` helper defined inline within hook file (not extracted to utils)

---

### `src/components/layout/WalkHeader.tsx` (client layout, request-response + event-driven state)

**Analog:** Existing `src/components/layout/WalkHeader.tsx` — template for dual-trigger header state

**Dual-trigger ghost header pattern** — transparent at top, solid on scroll (lines 27-59):

```typescript
export function WalkHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Ghost nav — transparent at top, solid when scrolled horizontally OR downward vertically
  useEffect(() => {
    // Horizontal scroll-jacking path
    const handleHorizontalScroll = (e: WindowEventMap['horizontal-scroll-progress']) => {
      // Progress > 5% triggers the solid header state
      setScrolled(e.detail.progress > 0.05);
    };

    // Vertical fallback path (interior pages)
    const handleVerticalScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.1);

    window.addEventListener('horizontal-scroll-progress', handleHorizontalScroll);
    window.addEventListener('scroll', handleVerticalScroll, { passive: true });

    // Initialize state
    handleVerticalScroll();

    return () => {
      window.removeEventListener('horizontal-scroll-progress', handleHorizontalScroll);
      window.removeEventListener('scroll', handleVerticalScroll);
    };
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);

  const isTransparent = !scrolled && !mobileOpen;
  // ... rest of component
}
```

**Desktop mega-menu hover pattern** (lines 123-193):

```tsx
<nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
  {siteNavigation.slice(0, 6).map((item) => (
    <div key={item.href} className="relative"
      onMouseEnter={() => setHoveredItem(item.href)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <a href={item.href} style={{ /* uppercase, tracking, color inherits */ }}>
        {item.label}
      </a>

      {/* Mega menu dropdown — Framer Motion */}
      {item.children && hoveredItem === item.href && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
          style={{
            position: 'absolute',
            top: 'calc(100% + 16px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-white)',
            borderRadius: 8,
            boxShadow: '0 24px 64px rgba(0,0,0,0.12)',
            minWidth: 200,
            padding: '8px 0',
            zIndex: 50,
          }}
        >
          {item.children.map((child) => (
            <a key={child.href} href={child.href} style={{ /* link styling */ }}>
              {child.label}
            </a>
          ))}
        </motion.div>
      )}
    </div>
  ))}
</nav>
```

**Mobile full-screen overlay pattern** with Framer Motion + RemoveScroll (lines 240-349):

```tsx
<RemoveScroll enabled={mobileOpen}>
  <AnimatePresence>
    {mobileOpen && (
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }} // ease-in-out-quint
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 10000,
          background: '#fff',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Mobile header bar */}
        <div style={{ display: 'flex', height: 80, borderBottom: '1px solid var(--color-border-light)', flexShrink: 0 }}>
          {/* Logo + close button */}
        </div>

        {/* Mobile nav — links with accordion indicator */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {siteNavigation.map((item) => (
            <div key={item.href}>
              <a href={item.href} style={{ display: 'flex', justifyContent: 'space-between' }}>
                {item.label}
                {item.children && <svgChevronRight />}
              </a>
              {/* Nested accordion children locked open for mobile UX */}
              {item.children && (
                <div style={{ paddingLeft: 16 }}>
                  {item.children.map((child) => (
                    <a key={child.href} href={child.href}
                       onClick={() => setMobileOpen(false)}>
                      {child.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </motion.div>
    )}
  </AnimatePresence>
</RemoveScroll>
```

**Header z-index and transition pattern** (lines 80-87):

```tsx
<header
  ref={headerRef}
  className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]"
  style={{
    backgroundColor: isTransparent ? 'transparent' : 'var(--color-white)',
    boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none',
  }}
>
```

**Key traits:**
- `'use client'` with `useState` for three UI states (scrolled, mobileOpen, hoveredItem)
- Dual scroll listeners (`horizontal-scroll-progress` + `vertical scroll`) for cross-page compatibility
- Thresholds: horizontal `> 0.05` (5%), vertical `> 0.1 × innerHeight` (10%)
- CSS transition on backgroundColor/boxShadow for buttery header state change
- `z-[9999]` ensures header overlays all fullviewport pinned sections
- Framer Motion `AnimatePresence` + `remove-scroll` for mobile menu overlay (prevents body scroll)
- Mobile navigation uses expand-all accordion pattern (no collapse) — simpler UX

---

### `src/components/sections/HeroMasked.tsx` (client section, event-driven animation)

**Analog:** Existing `src/components/sections/HeroMasked.tsx` — template for parent-driven timeline via CustomEvent

**Parent-driven animation via CustomEvent pattern** — avoids nested pinning; child listens for parent's timeline progress (lines 29-78):

```typescript
export function HeroMasked({ heroImage = '/images/videocover2-812-optimized.webp' }: { heroImage?: string }) {
  const maskGroupRef = useRef<SVGGElement>(null);
  const wallRef = useRef<SVGRectElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const heroTl = gsap.timeline({ paused: true });

    // Zoom "WE BELIEVE" from enormous (scale 60x) down to readable (scale 1x)
    // Wall fills with color as text zooms out
    heroTl
      .fromTo(
        maskGroupRef.current,
        { scale: 60, transformOrigin: '50% 50%' },
        { scale: 1, ease: 'power2.out', duration: 1 }
      )
      .to(
        wallRef.current,
        { fill: 'rgba(0,0,0,0.55)', ease: 'power1.in', duration: 1 },
        0
      );

    // Listen to single-use event from parent horizontal scroll
    const handleHeroScroll = (e: WindowEventMap['horizontal-scroll-hero']) => {
      if (hasAnimatedRef.current) return;  // guard — fire only once

      const progress = e.detail.progress;

      // Fire animation during first ~12% of horizontal travel
      // Progress 0 → 0.12 maps to timeline 0 → 1
      if (progress <= 0.12) {
        const t = progress / 0.12;
        heroTl.progress(t);

        if (progress >= 0.12) {
          hasAnimatedRef.current = true;
        }
      }
    };

    window.addEventListener('horizontal-scroll-hero', handleHeroScroll);

    return () => {
      window.removeEventListener('horizontal-scroll-hero', handleHeroScroll);
      heroTl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--color-text-dark)',
      }}
    >
      {/* 1. Background image */}
      <img src={heroImage} alt="St. Elizabeth High School campus" aria-hidden="true"
        style={{ position: 'absolute', inset: 0, objectFit: 'cover' }}

      {/* 2. SVG Mask Overlay — white covers bg, black text reveal bg */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="hero-text-mask">
            <rect width="100" height="100" fill="white" />
            <g ref={maskGroupRef}>
              <text x="50" y="54" textAnchor="middle" dominantBaseline="middle"
                    fill="black" style={{ /* font vars */ }}>
                We Believe
              </text>
            </g>
          </mask>
        </defs>
        <rect ref={wallRef} width="100" height="100" fill="rgba(255,255,255,1)" mask="url(#hero-text-mask)" />
      </svg>

      {/* 3. Mission block — positioned bottom-left */}
      <div className="hero-mission-block hero-mission-safe-bottom" style={{ zIndex: 2, maxWidth: 380 }}>
        <p className="text-overline" style={{ marginBottom: 10 }}>St. Elizabeth High School</p>
        <p className="text-body-lg" style={{ maxWidth: 320, color: 'rgba(255,255,255,0.85)' }}>
          Nurturing minds, hearts, and spirits through faith, excellence, and service since 1967.
        </p>
      </div>
    </section>
  );
}
```

**Key traits:**
- `'use client'` with `useEffect` + GSAP timeline (paused)
- Global `WindowEventMap` augmentation for type-safe custom event handling (top of file)
- `hasAnimatedRef` guard prevents double-fire if event emits multiple times
- Progress mapping: `t = progress / 0.12` maps 0–12% scroll range to 0–1 timeline
- `heroTl.kill()` cleanup to prevent memory leaks
- SVG mask strategy: white rectangle + black text = video only shows through letter shapes
- Mission block floats above mask (`zIndex: 2`) with bottom-safe rail class for responsive offset
- **SECTION 1 SINGLETON**: only one instance; hero.gif effect hard-coded

---

### `src/components/sections/StickySplitSection.tsx` (client section, streaming split layout)

**Analog:** Existing `src/components/sections/StickySplitSection.tsx` — template for full-viewport content+imagery split with accordion

**Full-viewport section + 45/55 content split pattern** — self-contained wrapper for no-nested-sticky constraint (lines 29-234):

```typescript
export function StickySplitSection({
  overline,
  heading,
  body,
  accordion,
  leftImage,
  rightImages = [],
  backgroundColor = 'white',
}: StickySplitSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Map backgroundColor to actual values
  const bgColor = backgroundColor === 'light' ? 'var(--color-offwhite)'
               : backgroundColor === 'dark' ? 'var(--color-text-main)'
               : backgroundColor === 'maroon' ? 'var(--color-primary-maroon)'
               : 'var(--color-white)';
  const textColor = (backgroundColor === 'dark' || backgroundColor === 'maroon')
               ? 'var(--color-white)' : 'var(--color-text-main)';
  const mutedColor = (backgroundColor === 'dark' || backgroundColor === 'maroon')
               ? 'rgba(255,255,255,0.7)' : 'var(--color-gray)';

  return (
    <section
      style={{
        backgroundColor: bgColor,
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '45% 55%',
          width: '100%',
          height: '100%',
          padding: '0 clamp(24px, 4vw, 60px)',
        }}
      >
        {/* LEFT — Content */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 'clamp(24px, 4vw, 60px)', overflow: 'hidden' }}>
          <p style={{ /* overline: var(--font-heading), uppercase, tracking, var(--color-brand-maroon) */ }}>
            {overline}
          </p>

          <h2 style={{ /* clamp(1.75rem, 3.5vw, 3.5rem), font-weight 900, line-height 1.05 */ }}>
            {heading}
          </h2>

          <p style={{ /* clamp(0.875rem, 1.1vw, 1rem), line-height 1.7, mutedColor */ }}>
            {body}
          </p>

          {/* Accordion — inline expand/collapse, Framer Motion ready */}
          <div>
            {accordion.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  style={{
                    width: '100%', display: 'flex', justifyContent: 'space-between',
                    padding: '14px 0', borderTop: `1px solid ${...}`,
                    background: 'none', cursor: 'pointer',
                    fontFamily: 'var(--font-heading)', fontWeight: 700,
                    fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)', color: textColor,
                  }}
                >
                  <span>{item.title}</span>
                  <ChevronDown size={16} style={{
                    transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s', flexShrink: 0,
                  }} />
                </button>
                <div style={{
                  overflow: 'hidden', maxHeight: openIndex === i ? '200px' : '0',
                  transition: 'max-height 0.4s ease',
                }}>
                  <p style={{ /* mutedColor, lineHeight 1.6 */ }}>
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Imagery */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, overflow: 'hidden' }}>
          {leftImage && (
            <img src={leftImage} alt="Student"
              style={{ height: '65vh', width: 'auto', objectFit: 'cover', borderRadius: 4, flexShrink: 0 }}
            />
          )}
          {rightImages.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: '65vh', overflow: 'hidden' }}>
              {rightImages.slice(0, 4).map((src, i) => (
                <img key={i} src={src} alt={`Gallery image ${i + 1}`}
                  style={{
                    height: i === 0 ? 'calc(65vh * 0.55 - 6px)' : 'calc(65vh * 0.45 - 6px)',
                    width: 'auto', objectFit: 'cover', borderRadius: 4, flexShrink: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
```

**Key traits:**
- `'use client'` with local `useState` for accordion open/close (single-panel expansion)
- Full-viewport (`100vw × 100vh`) with `flexShrink: 0` to prevent collapse in horizontal flex track
- Grid-based 45% / 55% split interior; responsive via `clamp()` padding
- `overflow: hidden` throughout to prevent scroll bleed; internal content controls its own overflow
- Dynamic color mapping via prop switch
- Inline accordion with `maxHeight` CSS transition (vanilla; may upgrade to Framer Motion if needed)
- Left image fixed height (`65vh`); right images flex stack with proportion math

---

### `src/lib/gsap-config.ts` (utility/singleton, plugin registration)

**Analog:** Existing `src/lib/gsap-config.ts` — shared GSAP configuration singleton

**Singleton guard + plugin registration pattern** (lines 1-28):

```typescript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Register GSAP plugins ONCE at module load
// All GSAP animations throughout the app use these plugins
// Singleton guard to prevent double-registration in React strict mode
let pluginsRegistered = false;

if (typeof window !== 'undefined' && !pluginsRegistered) {
  gsap.registerPlugin(ScrollTrigger, Flip);
  pluginsRegistered = true;

  // Global GSAP defaults matching Walker physics specs
  gsap.defaults({
    ease: 'expo.out',
    duration: 0.8,
  });

  // ScrollTrigger global settings (SOP-001)
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger, Flip };
```

**Key traits:**
- Named export, not default; imported as `import { gsap } from '@/lib/gsap-config'`
- `let pluginsRegistered` guard prevents double registration in React 18 StrictMode
- `typeof window !== 'undefined'` guard prevents SSR crashes
- Global defaults (`ease: expo.out`, `duration: 0.8`) follow Walker specs
- `ScrollTrigger.config({ ignoreMobileResize: true })` reduces resize jitter on mobile
- No side effects beyond guard block; pure utility function

---

### `src/lib/hooks/useHorizontalScroll.test.ts` (test file for hook)

**Analog:** Existing `src/lib/hooks/useHorizontalScroll.test.ts` — template for comprehensive Vitest unit tests

**Vitest + Testing Library hook test pattern** (full file):

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useHorizontalScroll } from './useHorizontalScroll';
import { gsap } from '@/lib/gsap-config';

// Mock GSAP — provide only the API surface used by the hook
vi.mock('@/lib/gsap-config', () => ({
  gsap: {
    context: vi.fn((callback) => {
      callback();
      return { revert: vi.fn() };
    }),
    to: vi.fn(),
  },
  ScrollTrigger: {
    refresh: vi.fn(),
  },
}));

describe('useHorizontalScroll', () => {
  let containerRef: React.RefObject<HTMLDivElement>;
  let trackRef: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    // Mock DOM elements with scrollWidth
    const container = document.createElement('div');
    const track = document.createElement('div');
    Object.defineProperty(track, 'scrollWidth', { value: 3000, writable: true });
    Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });

    containerRef = { current: container };
    trackRef = { current: track };

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calculates initial travel distance', () => {
    renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    expect(gsap.to).toHaveBeenCalledWith(
      trackRef.current,
      expect.objectContaining({
        x: -1800, // 3000 - 1200 = 1800
      })
    );
  });

  it('recalculates travel distance on window resize', () => {
    vi.useFakeTimers();
    renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    // Simulate resize
    Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true });
    const callCountBefore = (gsap.to as any).mock.calls.length;
    window.dispatchEvent(new Event('resize'));

    // Should not call immediately (debounced)
    expect((gsap.to as any).mock.calls.length).toBe(callCountBefore);

    // Wait for debounce (150ms)
    vi.advanceTimersByTime(150);

    // Should have called gsap.to with new travel distance
    expect((gsap.to as any).mock.calls.length).toBeGreaterThan(callCountBefore);

    const calls = (gsap.to as any).mock.calls;
    const resizeCall = calls.find((call: any) => call[1]?.x === -2000);
    expect(resizeCall).toBeDefined();

    vi.useRealTimers();
  });

  it('debounces resize handler', () => {
    vi.useFakeTimers();
    renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    const callCountBefore = (gsap.to as any).mock.calls.length;

    // Trigger multiple resizes rapidly
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));

    expect((gsap.to as any).mock.calls.length).toBe(callCountBefore);

    vi.advanceTimersByTime(150);
    expect((gsap.to as any).mock.calls.length).toBeGreaterThan(callCountBefore);

    const callCountAfter = (gsap.to as any).mock.calls.length;
    expect(callCountAfter - callCountBefore).toBeLessThanOrEqual(3);

    vi.useRealTimers();
  });

  it('cleans up resize listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
```

**Test file placement pattern:**
- Unit test for a hook: `src/lib/hooks/useHorizontalScroll.test.ts` (adjacent to hook)
- E2E tests for critical flows: `e2e/{navigation,scroll-animations,mobile-menu,accessibility}.spec.ts`

**Test scope:**
- Business-logic behavior: correct `travelDistance` calculation
- Debouncing: respects 150ms delay, coalesces rapid events
- Resize recalculation: reverts context, triggers fresh animation
- Lifecycle cleanup: event listener removed, GSAP context reverted

---

## Shared Patterns

### Event-Driven Animation Orchestration

**Sources:** `src/app/page.tsx` (dispatcher) + `src/components/sections/HeroMasked.tsx` (listener)

**Apply to:** Any child section that needs to know parent horizontal-scroll progress

**Dispatcher pattern** (from `page.tsx`):

```typescript
gsap.to(track, {
  x: -travelDistance,
  scrollTrigger: {
    onUpdate: (self) => {
      const progress = self.progress;

      // Broadcast to all registered children
      window.dispatchEvent(new CustomEvent('horizontal-scroll-progress', {
        detail: { progress }
      }));
    },
  },
});
```

**Listener pattern** (from `HeroMasked.tsx`):

```typescript
declare global {
  interface WindowEventMap {
    'horizontal-scroll-progress': CustomEvent<{ progress: number }>;
    'horizontal-scroll-hero': CustomEvent<{ progress: number }>;
  }
}

useEffect(() => {
  const handleScroll = (e: WindowEventMap['horizontal-scroll-progress']) => {
    // consume progress, map to local timeline range
    // set `hasAnimated` guard if single-fire
  };

  window.addEventListener('horizontal-scroll-progress', handleScroll);
  return () => window.removeEventListener('horizontal-scroll-progress', handleScroll);
}, []);
```

**Application contract:** Child component author chooses which custom event name to subscribe from. Phase 1 tools: `horizontal-scroll-progress` (broadcast), `horizontal-scroll-hero` (single-pulse, ~12% phase).

---

### GSAP Lifecycle + Refresh Stability

**Source:** `src/lib/hooks/useHorizontalScroll.ts` + `src/app/page.tsx`

**Apply to:** All ScrollTrigger-based animation effects

**Canonical hook pattern:**

```typescript
useEffect(() => {
  if (typeof window === 'undefined' || !refA.current || !refB.current) return;

  const createAnimation = () => {
    return gsap.context(() => {
      gsap.to(ref.current, {
        // ScrollTrigger config — choose `end` value per use case
        //   page homepage: end: () => `+=${travelDistance}`
        //   section-specific: end: '+=300%'
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          scrub: <1.0 – 1.5>,
          pin: true | false,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => { /* emit events as needed */ }
        }
      });
    }, ref.current);
  };

  let ctx = createAnimation();

  const handleResize = debounce(() => {
    ctx.revert();
    ctx = createAnimation();
    ScrollTrigger.refresh();
  }, 150);

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
    ctx.revert();
  };
}, []);
```

**Critical settings:**

| Setting | Value | Rationale |
|---------|-------|-----------|
| `invalidateOnRefresh` | `true` | Re-read DOM values after `refresh()` |
| `anticipatePin` | `1` | SMPTE-compliant pinning (Walker spec) |
| `end` | `+=${travelDistance}` (dynamic) or `+=300%` | Homepage uses dynamic temp; sections use percent |
| Container `minHeight` | `travelDistance + innerHeight * 2` | Ensures pin can fully release; prevents "dead scroll zone" |
| Debounce | 150–200ms | Prevents flicker, jitter on continuous resize |

---

### Responsive Section Fullscreen Layout

**Sources:** `HeroMasked.tsx`, `StickySplitSection.tsx`, inline helpers in `page.tsx`

**Apply to:** Any full-viewport horizontal section

**Pattern:**

```tsx
function SomeSection() {
  return (
    <section
      style={{
        width: '100vw',
        height: '100vh',
        flexShrink: 0,           // critical: prevents shrink in 1-D flex track
        overflow: 'hidden',      // critical: no bleeding scrollbars
        backgroundColor: 'var(--color-white)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          padding: '0 clamp(24px, 4vw, 60px)', // responsive safe rail
          display: 'grid',
          gridTemplateColumns: '45% 55%',        // split content:imagery
        }}
      >
        {/* Content */}
        {/* Imagery */}
      </div>
    </section>
  );
}
```

**Outer wrapper is injected by `page.tsx`:**

```tsx
<div style={{ minWidth: '100vw', height: '100vh', flexShrink: 0, overflow: 'hidden' }}>
  <SomeSection />
</div>
```

**Fluid typography via `clamp()`:**

| Element | Size expression | Usage |
|---------|----------------|-------|
| Headings | `clamp(1.75rem, 3.5vw, 3.5rem)` | Overline → heading → display |
| Body | `clamp(0.875rem, 1.1vw, 1rem)` | Paragraphs |
| Overline | `clamp(0.75rem, 1vw, 0.875rem)` | Category labels |
| Nav links | `clamp(0.65rem, 0.8vw, 0.75rem)` | Header item font size |
| CTA button | `clamp(0.7rem, 0.9vw, 0.8rem)` | Final CTA button text |

---

### Navigation / Overlay State Pattern

**Source:** `WalkHeader.tsx` — apply to any header/mega-menu/modal overlay

**Three-state header pattern:**

| State | Condition | Visual |
|-------|-----------|--------|
| Transparent header | Homepage at top: `scrolled === false && mobileOpen === false` | Transparent bg, white text/logo |
| Solid header | `scrolled === true` | White bg, shadow, dark text/maroon logo |
| Mobile menu open | `mobileOpen === true` (overrides scrolled) | Full-screen white overlay, maroon header |

**Z-index stack:**

| Element | z-index |
|---------|---------|
| WalkHeader (base) | 9999 |
| WalkHeader mobile menu | 10000 |
| Sticky sections (pinned by ScrollTrigger) | Auto-pinned (below header) |
| Mobile scroll container inside pinned section | Auto-relative |

**Accessibility pattern embedded:**

```tsx
<button
  onClick={() => setMobileOpen(true)}
  aria-label="Toggle menu"
  aria-expanded={mobileOpen}  // reflects state for screen readers
>
  {/* 3-bar hamburger icon */}
</button>

<button
  onClick={() => setMobileOpen(false)}
  aria-label="Close menu"
>
  {/* X icon */}
</button>
```

---

### Test File Structure Pattern

**Source:** `src/lib/hooks/useHorizontalScroll.test.ts` — demonstrates unit test conventions

| Aspect | Pattern |
|--------|---------|
| Import style | `import { describe, it, expect, vi } from 'vitest'` |
| Imports under test | Relative to test file (`./useHorizontalScroll`) |
| External mocks | `vi.mock('@/lib/gsap-config', ...)` — mock only used imports |
| DOM setup | `document.createElement('div')` + `Object.defineProperty` for `scrollWidth`, `innerWidth` |
| Test names | Behavior-focused: "calculates initial travel distance" |
| Async/timer tests | `vi.useFakeTimers()` + `vi.advanceTimersByTime(ms)` |
| Cleanup validation | `expect(removeEventListenerSpy).toHaveBeenCalledWith(...)` |

---

## No Analog Found

No files with no analog — all Phase 1 targets have strong existing patterns.

## Metadata

**Analog search scope:** `src/app/`, `src/components/`, `src/lib/`, `src/lib/hooks/`
**Files scanned:** 9
**Pattern extraction date:** 2026-04-28
