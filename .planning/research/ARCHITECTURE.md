# Architecture Patterns: Walker Fidelity Clone Site

**Domain:** Premium school marketing site (static export)
**Researched:** 2026-04-28
**Confidence:** HIGH — Based on existing codebase, verified component patterns, and architecture docs

---

## Recommended Architecture

### High-Level Pattern: Horizontal Scroll-Jacking with Event Bus Coordination

The homepage is a **full-viewport horizontal carousel** driven by vertical scroll progress. This is the defining Walker pattern and must be implemented exactly.

```
User scrolls vertically → container height ×3-4 viewports → GSAP translates track left → 9 sections slide in
```

**Key architectural constraint:** Because the homepage uses `pin: true` on the outer ScrollTrigger, **no nested ScrollTriggers are allowed** inside child sections. Instead, child sections subscribe to a custom event bus (`horizontal-scroll-progress`, `horizontal-scroll-hero`) dispatched by the parent ScrollTrigger's `onUpdate`.

### Component System Boundaries

| Layer | Responsibility | Location | Communication |
|-------|---------------|----------|---------------|
| **Pages** | Top-level route composition, layout assembly | `src/app/page.tsx`, `src/app/about/page.tsx` | Import section components; pass inline data props |
| **Sections** | Full-viewport or content-block components; self-contained layout | `src/components/sections/*` | Use custom events to react to scroll; no ScrollTrigger creation |
| **UI Primitives** | Small reusable building blocks (buttons, accordions, breadcrumbs) | `src/components/ui/*` | Pure UI; no animation coordination with scroll |
| **Layout** | Global persistent elements (header, footer) | `src/components/layout/*` | Listen to global scroll events; dispatch state |
| **Hooks** | Animation and scroll logic separated from JSX | `src/lib/hooks/*` | Accept refs; register GSAP effects; cleanup via `gsap.context()` |
| **Data** | Static content definitions (navigation, homepage IMAGES/values/divisions) | `src/lib/site-navigation.ts`, inline in page.tsx | Exported typed arrays; fetched via utility functions |

### Data Flow Architecture

```
┌──────────────────────────────────────────────────────────┐
│  Build Time (Next.js static export)                      │
├──────────────────────────────────────────────────────────┤
│  1. page.tsx imports:                                     │
│     - IMAGES object (image paths)                         │
│     - values array (4 items)                              │
│     - divisions array (5 grades)                          │
│  2. Components render with props                          │
│  3. Static HTML/CSS/JS written to out/                    │
└──────────────────────────────────────────────────────────┘
                          ↓
┌──────────────────────────────────────────────────────────┐
│  Runtime (Browser)                                        │
├──────────────────────────────────────────────────────────┤
│  1. Hydration: Client components ('use client') mount     │
│  2. WalkHeader registers scroll + custom event listeners │
│  3. HomepageHorizontalScroll creates GSAP ScrollTrigger  │
│     - Calculates travelDistance based on track.scrollWidth│
│     - Sets container style.minHeight = travelDistance + viewportHeight × 2 │
│     - Binds horizontal-x translation with scrub: 1.2     │
│     - Dispatches custom events on onUpdate callback      │
│  4. HeroMasked subscribes to 'horizontal-scroll-hero'    │
│     - Animates SVG mask scale + wall fill during first 12%│
│  5. GSAP context reverts on unmount                       │
└──────────────────────────────────────────────────────────┘
```

---

## Core Architectural Patterns

### Pattern 1: Horizontal Scroll-Jacking Container (Homepage)

**What:** The homepage is not a traditional vertical page. Instead, the document body scrolls vertically through a tall invisible container, and that vertical scroll motion is mapped to horizontal translation of a sticky track.

**Architecture:**

```tsx
// Container: invisible tall element that creates scroll space
<div ref=scrollContainer style={{ height: `${travelDistance + viewportHeight * 2}px` }}>
  // Track: sticky full-viewport strip sliding horizontally
  <div ref=track style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex' }}>
    {sections.map(section => (
      <div style={{ minWidth: '100vw', height: '100vh' }}>
        {section}
      </div>
    ))}
  </div>
</div>
```

**GSAP Configuration:**

```typescript
gsap.to(track, {
  x: -travelDistance,
  ease: 'none',
  scrollTrigger: {
    trigger: container,
    start: 'top top',
    end: () => `+=${travelDistance}`,
    scrub: 1.2,           // 1.2s lag = heavy/premium feel
    pin: true,
    anticipatePin: 1,     // Predicts pin point for smoother release
    invalidateOnRefresh: true,
    onUpdate: (self) => {
      window.dispatchEvent(new CustomEvent('horizontal-scroll-progress', {
        detail: { progress: self.progress }
      }));
    }
  }
});
```

**Why this pattern:** Walker's reference uses this horizontal narrative. It creates a guided, cinematic experience where users don't miss sections.

**When to use:** Homepages of premium marketing sites, portfolio sites, storytelling landing pages.

---

### Pattern 2: Custom Event Bus for Scroll Coordination

**What:** Because the outer horizontal ScrollTrigger uses `pin: true`, child sections cannot create nested ScrollTriggers (they silently fail). Instead, they subscribe to custom DOM events dispatched by the parent.

**Implementation:**

```typescript
// Parent (Homepage): dispatch events
ScrollTrigger.create({
  onUpdate: (self) => {
    window.dispatchEvent(new CustomEvent('horizontal-scroll-progress', {
      detail: { progress: self.progress }
    }));
    // Hero uses its own threshold (first 12%)
    window.dispatchEvent(new CustomEvent('horizontal-scroll-hero', {
      detail: { progress: self.progress }
    }));
  }
});

// Child (HeroMasked): subscribe to events
useEffect(() => {
  const handler = (e: WindowEventMap['horizontal-scroll-hero']) => {
    const t = e.detail.progress / 0.12; // Map 0–0.12 → 0–1 timeline
    heroTl.progress(t);
  };
  window.addEventListener('horizontal-scroll-hero', handler);
  return () => window.removeEventListener('horizontal-scroll-hero', handler);
}, []);
```

**Why this pattern:** Avoids nested ScrollTrigger pitfalls; enables loose coupling between parent scroll state and child animations.

**When to use:** Any pinned scroll container with child animations needing scroll position awareness.

---

### Pattern 3: SVG Text Mask with GSAP-driven Scale

**What:** The Walker School hero reveals a background image/video only through the letters of "WE BELIEVE" (or school motto) via an SVG mask. As user scrolls horizontally, the text zooms from 60× scale (fills entire viewport) down to 1× (normal reading size) while the white wall around the letters fades to dark overlay.

**Architecture:**

```svg
<mask id="hero-mask">
  <!-- White rectangle = fully visible -->
  <rect width="100" height="100" fill="white" />
  <!-- Black text = transparent cutouts (reveals background) -->
  <g ref={textGroup}>
    <text fill="black" fontSize="13.5">We Believe</text>
  </g>
</mask>

<!-- White wall rectangle uses the mask -->
<rect ref={wall} fill="rgba(255,255,255,1)" mask="url(#hero-mask)" />
```

**Animation sequence:**

```typescript
const heroTl = gsap.timeline({ paused: true });
heroTl
  .fromTo(textGroup, { scale: 60, transformOrigin: '50% 50%' }, { scale: 1, duration: 1, ease: 'power2.out' })
  .to(wall, { fill: 'rgba(0,0,0,0.55)', duration: 1 }, 0);
```

**Travel distance mapping:** Hero occupies the first 9% of horizontal track (1 of 9 sections). Animation fires during `progress <= 0.09` of parent scroll. After threshold, `hasAnimated` flag locks timeline.

---

### Pattern 4: Sticky Split Section (45:55 Content:Imagery)

**What:** A two-column full-viewport section where left side holds text content (overline, heading, body, accordion) and right side displays a staggered grid of 4 images. Used for "Accolades" and "Mission" sections.

**Component Props:**

```typescript
interface StickySplitSectionProps {
  overline: string;
  heading: string;
  body: string;
  accordion: Array<{ title: string; content: string }>;
  leftImage?: string | null;               // Optional portrait cutout left of text
  rightImages?: string[];                  // 4-image staggered grid
  backgroundColor?: 'white' | 'light' | 'dark' | 'maroon';
}
```

**Layout grid:**

```css
display: grid;
grid-template-columns: 45% 55%;
height: 100vh;
```

**Image collage (right side):**

```css
display: grid;
grid-template-columns: 1fr 1fr;
gap: 8px;
row-gap: 24px;
/* Images offset vertically using margin-top for stepped effect */
.grid-img:nth-child(2n) { margin-top: 10%; }
.grid-img:nth-child(3n) { margin-top: 20%; }
```

---

### Pattern 5: Full-Viewport Alternating Passions Panel

**What:** Three full-screen sections (Athletics, Arts, Academics) with alternating background colors (maroon / white / dark) and a cutout image positioned left or right. The image has a subtle drop shadow for depth.

**Component Props:**

```typescript
interface PassionsPanelProps {
  bg: string;                    // CSS var (var(--color-primary-maroon), etc.)
  textColor: string;             // On-primary or on-background
  number: string;                // "01", "02", "03"
  label: string;                 // Section title
  description: string;
  image: string;
  imagePosition: 'left' | 'right';
}
```

**Layout:**

```css
display: flex;
align-items: center;
justify-content: center;
gap: clamp(32px, 6vw, 80px);
flex-direction: row | row-reverse; /* determined by imagePosition */
```

**Image styling:**

```css
max-height: 60vh;
max-width: 40%;
filter: brightness(1.15) drop-shadow(0 20px 50px rgba(0,0,0,0.4)); /* for dark bg */
```

---

### Pattern 6: Framer Motion Accordion (Single-Open)

**What:** Vertical accordion with single-panel-open behavior. Uses `AnimatePresence` for enter/exit animation with Walker easing `cubic-bezier(0.83, 0, 0.17, 1)` and 0.4s duration.

**Component Props:**

```typescript
interface AccordionItem {
  title: string;
  content: string;
}
interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}
```

**State:** `const [openIndex, setOpenIndex] = useState<number | null>(null);`

**Animation:**

```typescript
<motion.div
  initial={{ height: 0, opacity: 0 }}
  animate={{ height: 'auto', opacity: 1 }}
  exit={{ height: 0, opacity: 0 }}
  transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }}
  style={{ overflow: 'hidden' }}
>
  <p>{content}</p>
</motion.div>
```

---

### Pattern 7: Ghost Nav Header with Mega-Menu

**What:** Transparent header at page top that becomes solid white with shadow when user scrolls (vertical > 10% OR horizontal > 5%). Dropdown menus on hover (desktop) and full-screen overlay (mobile).

**State:**

```typescript
const [scrolled, setScrolled] = useState(false);
const [mobileOpen, setMobileOpen] = useState(false);
const [hoveredItem, setHoveredItem] = useState<string | null>(null);
```

**Desktop Mega-Menu:**

```typescript
{mouse hover on nav item} → setHoveredItem(item.href)
{motion.div} with initial={{ opacity: 0, y: 8 }} → animate={{ opacity: 1, y: 0 }}
Position: absolute, top: calc(100% + 16px), left: 50%, transform: translateX(-50%)
```

**Mobile Full-Screen Overlay:**

```typescript
<AnimatePresence>
  {mobileOpen && (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }}
      style={{ position: 'fixed', inset: 0, zIndex: 10000, background: '#fff' }}
    >
      {/* Nav links with nested sub-items as accordion */}
    </motion.div>
  )}
</AnimatePresence>
```

---

### Pattern 8: Design Token System (Walker SOP-001)

**Location:** `src/app/globals.css`

**Token categories:**

```css
:root {
  /* Colors (WCAG 2.1 AAA) */
  --color-primary-maroon: #6C1F35;
  --color-secondary-maroon: #4A1524;
  --color-deep-maroon: #2E0D1A;
  --color-white: #FFFFFF;
  --color-offwhite: #F9F9F9;
  --color-gray: #555555;
  --color-text-main: #1A1A1A;
  --color-text-dark: #000000;

  /* Easing (SOP-001) */
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1);
  --ease-smooth: cubic-bezier(0.25, 1, 0.5, 1);

  /* Layout */
  --container-max: 1440px;
  --section-padding-y: clamp(4rem, 10vw, 12rem);
  --container-padding: clamp(24px, 4vw, 60px);

  /* Font variables (next/font/google) */
  --font-display: var(--font-playfair);
  --font-heading: var(--font-montserrat);
  --font-body: var(--font-inter);
}
```

**Tailwind utilities mapped:**

```css
.walker-heading { font-family: var(--font-heading); font-weight: 800; font-size: clamp(2rem, 4vw, 4.5rem); line-height: 1; letter-spacing: -0.02em; }
.walker-body { font-family: var(--font-body); font-size: 1.25rem; line-height: 1.6; }
.text-overline { font-weight: 700; font-size: clamp(0.75rem, 1vw, 0.875rem); letter-spacing: 0.15em; text-transform: uppercase; }
```

---

## Scalability Considerations

### At 100 Users/Day
- Static hosting on free tier (Netlify/GitHub Pages) is sufficient
- Formspree free tier (50 submissions/month) could be limiting; monitor closely
- No performance tuning needed — LCP naturally under 2s on wired connections

### At 10K Users/Day
- Upgrade to Netlify Pro or Vercel Pro ($20–50/month) for build minutes and CDN edge
- Formspree paid tier ($10–30/month) for higher volume
- Enable lazy loading for all below-fold images (currently not done)
- Consider adding a CDN (Cloudflare) for additional caching layer

### At 1M Users/Day
- Static + CDN still works (Vercel Enterprise or self-hosted on Cloudflare Pages)
- Bandwidth costs rise (~$200–500/month for 5–10TB/month depending on host)
- Must enable HTTP/2 push for critical assets; implement image optimization pipeline (Cloudinary/Imgix)
- Consider adding a lightweight serverless form handler (AWS Lambda + SES) instead of Formspree to avoid per-submission costs

---

## Sources

- `src/app/page.tsx` — Horizontal scroll-jacking architecture (container height calculation, GSAP setup)
- `src/components/sections/HeroMasked.tsx` — SVG mask pattern + custom event subscription
- `src/components/layout/WalkHeader.tsx` — Ghost nav + mega-menu + mobile overlay
- `src/lib/hooks/useHorizontalScroll.ts` — ScrollTrigger config (scrub, pin, anticipatePin)
- `src/app/globals.css` — Walker design token system (SOP-001)
- `.planning/codebase/ARCHITECTURE.md` — Layer definitions and data flow
- GSAP ScrollTrigger documentation patterns for pin + scrub + nested triggers
