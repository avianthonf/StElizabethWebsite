# St. Elizabeth High School Website

A modern, Walker School-inspired website for St. Elizabeth High School, Pomburpa, Goa, India. Built with Next.js 16, featuring buttery-smooth scroll animations, GSAP-powered interactions, and a professional design system adapted for St. Elizabeth's Catholic identity.

## Project Overview

This is a static Next.js website that replicates the Walker School's scroll-driven animations, sticky multi-level mega-menu, horizontal scroll-jacking carousels, SVG text-mask heroes, and split sticky sections — all adapted with St. Elizabeth branding (maroon #6C1F35, shield/cross motif) and content (Grades 8-12, SSC/HSC curriculum, Catholic values).

**Design Inspiration:** [The Walker School](https://www.thewalkerschool.org/)  
**Location:** [St. Elizabeth High School, Pomburpa, Goa](https://maps.app.goo.gl/gdhRyZxKZQsh9Yf47)

## Tech Stack

- **Framework:** Next.js 16.2.4 (App Router, static export)
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS v4 with custom design tokens
- **Animations:** GSAP 3.15.0 (ScrollTrigger, ScrollToPlugin), Framer Motion 12.38.0
- **Smooth Scroll:** Lenis 1.3.23
- **Icons:** Lucide React 1.11.0
- **Carousels:** Embla Carousel React 8.6.0
- **Testing:** Vitest 4.1.5 (unit), Playwright 1.59.1 (E2E), axe-core 4.11.2 (accessibility)
- **Image Optimization:** Sharp 0.33.5 (build-time)
- **SEO:** next-seo 7.2.0, JSON-LD structured data, sitemap.xml, robots.txt

## Getting Started

### Prerequisites

- Node.js 20.x or higher (currently using v24.14.1)
- npm 11.x or compatible package manager

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd st-elizabeth-website

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site. The page auto-updates as you edit files.

### Build for Production

```bash
npm run build
```

This command:
1. Runs `npm run optimize:images` (prebuild hook) to optimize all images in `public/images/`
2. Builds the Next.js app with static export
3. Outputs to `out/` directory (ready for deployment)

### Other Scripts

```bash
npm run start          # Start production server (not needed for static export)
npm run lint           # Run ESLint
npm run test           # Run Vitest unit tests
npm run test:ui        # Run Vitest with UI
npm run test:coverage  # Run tests with coverage report
npm run test:e2e       # Run Playwright E2E tests (all browsers)
npm run test:e2e:ui    # Run Playwright with UI mode
npm run test:e2e:debug # Run Playwright in debug mode
npm run optimize:images # Manually optimize images with Sharp
```

## Project Structure

```
st-elizabeth-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (fonts, metadata, JSON-LD)
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Design system CSS tokens
│   │   ├── about/              # About Us page
│   │   ├── academics/          # Academics page
│   │   ├── admissions/         # Admissions page
│   │   ├── arts/               # Arts page
│   │   ├── athletics/          # Athletics page
│   │   ├── contact/            # Contact page
│   │   └── not-found.tsx       # Custom 404 page
│   ├── components/
│   │   ├── layout/             # Global layout (Header, Footer)
│   │   ├── sections/           # Large page sections (Hero, Carousel, etc.)
│   │   ├── templates/          # Page templates (ContentPage)
│   │   └── ui/                 # Reusable UI primitives (Button, Accordion, etc.)
│   └── lib/
│       ├── hooks/              # Custom React hooks (useHorizontalScroll, etc.)
│       ├── utils.ts            # Utility functions (cn, clamp, mapRange)
│       ├── site-navigation.ts  # Navigation data and helpers
│       ├── homepage-data.ts    # Homepage content data
│       ├── gsap-config.ts      # GSAP plugin registration
│       └── image-loader.ts     # Custom Next.js Image loader
├── public/
│   ├── images/                 # Optimized images (WebP, PNG)
│   ├── sitemap.xml             # Static sitemap for SEO
│   ├── robots.txt              # Search engine crawling rules
│   └── favicon files           # Favicons for all devices
├── tests/
│   ├── unit/                   # Vitest unit tests
│   └── e2e/                    # Playwright E2E tests
├── scripts/
│   └── optimize-images.js      # Build-time image optimization
├── next.config.ts              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── postcss.config.mjs          # PostCSS configuration (Tailwind)
├── eslint.config.mjs           # ESLint configuration
├── playwright.config.ts        # Playwright E2E test configuration
└── vitest.config.ts            # Vitest unit test configuration
```

## Design System

The design system is defined in `src/app/globals.css` using CSS custom properties (SOP-001 spec from Walker School).

### Color Tokens

```css
--color-primary-maroon: #6C1F35    /* St. Elizabeth brand maroon */
--color-secondary-maroon: #4A1524  /* Darker maroon for accents */
--color-deep-maroon: #2E0D1A       /* Deepest maroon for contrast */
--color-white: #FFFFFF
--color-offwhite: #F9F9F9
--color-gray-light: #F5F5F5
--color-gray: #555555
--color-text-main: #1A1A1A
--color-text-dark: #000000
--color-border-light: #E5E5E5
```

### Typography Scale

- `.text-hero` — Hero display text (clamp(4rem, 15vw, 18rem), 900 weight, uppercase)
- `.text-h1` — Section headings (clamp(2.5rem, 6vw, 6rem), 900 weight, uppercase)
- `.text-h2` / `.walker-heading` — Subsection headings (clamp(2rem, 4vw, 4.5rem), 800 weight)
- `.text-ui` — UI text (0.875rem, 700 weight, uppercase, 0.15em tracking)
- `.text-overline` / `.walker-overline` — Small labels (11px, 700 weight, uppercase, 0.18em tracking, maroon)
- `.text-body-lg` / `.walker-body` — Body text (1.25rem, 1.6 line-height)

### Spacing

```css
--container-max: 1440px
--section-padding-y: clamp(4rem, 10vw, 12rem)
--container-padding: clamp(24px, 4vw, 60px)
```

### Easing Functions

```css
--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1)
--ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1)
--ease-smooth: cubic-bezier(0.25, 1, 0.5, 1)
```

### Fonts

- **Display:** Playfair Display (serif, for elegant headings)
- **Heading:** Montserrat (sans-serif, 700-900 weight, uppercase)
- **Body:** Inter (sans-serif, 400-600 weight)

Fonts are loaded via `next/font/google` in `src/app/layout.tsx` with preload to eliminate FOIT (Flash of Invisible Text).

## Key Features

### 1. Scroll Animations

- **Hero Text Mask:** SVG clip-path reveals background image as user scrolls (GSAP ScrollTrigger)
- **Horizontal Carousel:** "We Value" section with horizontal scroll-jacking (GSAP ScrollTrigger + horizontal scroll)
- **Sticky Split Sections:** Left content sticks while right images scroll (CSS `position: sticky`)
- **Parallax Effects:** Background images move at different speeds (GSAP parallax)

### 2. Navigation

- **Mega Menu:** Multi-level dropdown navigation with hover states
- **Mobile Menu:** Full-screen overlay with smooth transitions (react-remove-scroll for scroll lock)
- **Sticky Header:** Header background changes on scroll (GSAP ScrollTrigger)

### 3. Forms

- **Contact Form:** Name, email, subject, message with validation
- **Admissions Inquiry Form:** Parent name, email, phone, student grade with validation
- **GDPR Consent:** Checkbox for data processing consent (shown to all visitors)
- **Spam Protection:** Honeypot field (hidden "website" field)
- **Formspree Integration:** Forms submit to Formspree endpoints (requires user setup)

### 4. SEO

- **JSON-LD Structured Data:** EducationalOrganization + HighSchool + LocalBusiness schema in `src/app/layout.tsx`
- **Sitemap:** Static `public/sitemap.xml` with all 7 public pages
- **Robots.txt:** `public/robots.txt` allows all crawlers with sitemap reference
- **Open Graph Tags:** Social sharing meta tags (og:title, og:description, og:image)
- **Twitter Cards:** Twitter-specific meta tags for rich previews
- **Breadcrumbs:** Accessible breadcrumb navigation on all interior pages

### 5. Accessibility

- **WCAG 2.1 AA Compliance:** Color contrast ratios meet AA standards (4.5:1 for normal text, 3:1 for large text)
- **Keyboard Navigation:** All interactive elements reachable via Tab, Shift+Tab, Enter, Escape
- **Screen Reader Support:** ARIA labels, semantic HTML, logical heading hierarchy (h1 → h2 → h3)
- **Focus Indicators:** Visible focus outlines on all interactive elements
- **Automated Testing:** axe-core integration in Playwright E2E tests

### 6. Performance

- **Core Web Vitals Targets:**
  - LCP (Largest Contentful Paint): < 2.5s
  - CLS (Cumulative Layout Shift): < 0.1
  - FID (First Input Delay): < 100ms
- **Image Optimization:** Build-time optimization with Sharp (WebP conversion, resizing)
- **Code Splitting:** Automatic code splitting via Next.js
- **Font Optimization:** next/font/google with preload eliminates FOIT
- **Lazy Loading:** Skeleton loaders for below-fold sections

## Configuration

### next.config.ts

```typescript
{
  output: "export",              // Static export for deployment
  images: {
    unoptimized: false,          // Use custom loader for optimization
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },
  trailingSlash: true,           // Add trailing slashes to URLs
}
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]         // Path alias for imports
    }
  }
}
```

All internal imports use `@/` prefix: `import { Button } from '@/components/ui/Button'`

### postcss.config.mjs

```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
```

Tailwind CSS v4 uses PostCSS plugin instead of traditional `tailwind.config.js`.

## Deployment

The site is configured for static export (`output: "export"` in `next.config.ts`). After running `npm run build`, the `out/` directory contains a complete static site ready for deployment.

### Deployment Options

1. **Vercel** (recommended for Next.js):
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Netlify**:
   - Build command: `npm run build`
   - Publish directory: `out`

3. **GitHub Pages**:
   - Build command: `npm run build`
   - Deploy `out/` directory to `gh-pages` branch

4. **Any Static Host** (AWS S3, Cloudflare Pages, etc.):
   - Upload contents of `out/` directory

### Post-Deployment Tasks

1. **Update JSON-LD Placeholder Values:**
   - Edit `src/app/layout.tsx`
   - Replace placeholder phone, email, and social media URLs with real values

2. **Configure Formspree:**
   - Create Formspree account at [formspree.io](https://formspree.io)
   - Create two forms: "Contact" and "Admissions"
   - Replace placeholder endpoints in:
     - `src/app/contact/page.tsx` (Contact form)
     - `src/app/admissions/page.tsx` (Admissions form)

3. **Submit Sitemap to Search Engines:**
   - Google Search Console: Submit `https://yourdomain.com/sitemap.xml`
   - Bing Webmaster Tools: Submit `https://yourdomain.com/sitemap.xml`

## Content Updates

### Update Images

1. Add new images to `public/images/`
2. Run `npm run optimize:images` to optimize (converts to WebP, resizes)
3. Update image references in components (e.g., `src/app/page.tsx`)

### Update Copy

- **Homepage:** Edit `src/app/page.tsx` and `src/lib/homepage-data.ts`
- **About Us:** Edit `src/app/about/page.tsx`
- **Academics:** Edit `src/app/academics/page.tsx`
- **Other Pages:** Edit respective page files in `src/app/`

### Update Navigation

Edit `src/lib/site-navigation.ts`:

```typescript
export const siteNavigation: NavItem[] = [
  {
    label: "About",
    href: "/about",
    submenu: [
      { label: "Our Mission", href: "/about#mission" },
      { label: "History", href: "/about#history" },
    ],
  },
  // Add more items...
]
```

### Update Design Tokens

Edit `src/app/globals.css` to change colors, spacing, typography:

```css
:root {
  --color-primary-maroon: #6C1F35;  /* Change brand color */
  --section-padding-y: clamp(4rem, 10vw, 12rem);  /* Change spacing */
}
```

## Accessibility

This site meets WCAG 2.1 AA standards:

- **Color Contrast:** All text meets 4.5:1 ratio (normal text) or 3:1 ratio (large text)
- **Keyboard Navigation:** All interactive elements accessible via keyboard
- **Screen Reader Support:** Semantic HTML, ARIA labels, logical heading hierarchy
- **Focus Management:** Visible focus indicators, focus trap in mobile menu
- **Form Accessibility:** Labels, error messages, ARIA attributes

### Testing Accessibility

```bash
# Run automated accessibility tests
npm run test:e2e

# Manual testing
# 1. Navigate site with keyboard only (Tab, Shift+Tab, Enter, Escape)
# 2. Use screen reader (NVDA on Windows, VoiceOver on Mac)
# 3. Check color contrast with browser DevTools or WebAIM Contrast Checker
# 4. Zoom to 200% and verify content reflows without horizontal scroll
```

## Performance

### Core Web Vitals Targets

- **LCP (Largest Contentful Paint):** < 2.5s
- **CLS (Cumulative Layout Shift):** < 0.1
- **FID (First Input Delay):** < 100ms

### Optimization Techniques

1. **Image Optimization:** Build-time optimization with Sharp (WebP, resizing)
2. **Font Optimization:** next/font/google with preload eliminates FOIT
3. **Code Splitting:** Automatic via Next.js (each page is a separate bundle)
4. **Lazy Loading:** Skeleton loaders for below-fold sections
5. **GSAP Performance:** GPU-accelerated transforms, `will-change` CSS property
6. **Smooth Scroll:** Lenis for 60fps scrolling

## SEO

### Structured Data

JSON-LD schema in `src/app/layout.tsx`:

```json
{
  "@context": "https://schema.org",
  "@type": ["EducationalOrganization", "HighSchool", "LocalBusiness"],
  "name": "St. Elizabeth High School",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Pomburpa",
    "addressLocality": "Bardez",
    "addressRegion": "Goa",
    "postalCode": "403521",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "15.5937",
    "longitude": "73.7568"
  }
}
```

### Sitemap

Static sitemap at `public/sitemap.xml` with all 7 public pages:

- Homepage (/)
- About Us (/about)
- Academics (/academics)
- Admissions (/admissions)
- Athletics (/athletics)
- Arts (/arts)
- Contact (/contact)

### Robots.txt

`public/robots.txt` allows all crawlers:

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

## Forms

### Contact Form

Location: `src/app/contact/page.tsx`

Fields:
- First Name (required)
- Last Name (required)
- Email (required, validated)
- Subject (required)
- Message (required, min 10 characters)
- GDPR Consent (required checkbox)
- Honeypot (hidden "website" field for spam protection)

### Admissions Inquiry Form

Location: `src/app/admissions/page.tsx`

Fields:
- Parent Name (required)
- Email (required, validated)
- Phone (required, 10 digits)
- Student Grade (required, dropdown: 8-12)
- GDPR Consent (required checkbox)
- Honeypot (hidden "website" field)

### Formspree Setup

1. Create account at [formspree.io](https://formspree.io)
2. Create two forms: "Contact" and "Admissions"
3. Copy form endpoints (e.g., `https://formspree.io/f/YOUR_FORM_ID`)
4. Replace placeholder endpoints in:
   - `src/app/contact/page.tsx`: `const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_CONTACT_FORM_ID"`
   - `src/app/admissions/page.tsx`: `const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_ADMISSIONS_FORM_ID"`

## License

Proprietary — St. Elizabeth High School, Pomburpa, Goa, India

## Credits

- **Design Inspiration:** [The Walker School](https://www.thewalkerschool.org/)
- **Development:** Built with Next.js, GSAP, Tailwind CSS
- **Fonts:** Inter, Playfair Display, Montserrat (Google Fonts)
- **Icons:** Lucide React

---

**For questions or support, contact:** [Contact information to be added]
