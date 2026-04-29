# DESIGN.md

## Product Overview
St. Elizabeth High School’s website is a brand-led marketing surface for prospective families. The visual system should communicate trust, dignity, warmth, and ambition through editorial typography, disciplined motion, and strong photographic storytelling rather than software-style interface chrome.

## Design Strategy
- **Register:** Brand
- **Color strategy:** Committed. Maroon is a meaningful identity color, not a tiny accent. Neutrals still do most of the structural work.
- **Theme:** Light by default. The site should feel like a family viewing a school website in daylight, looking for reassurance, clarity, and aspiration, not a dramatic dark-mode tool.
- **Motion stance:** Cinematic when it adds narrative and focus. Always honor reduced-motion preferences.

## Color System
### Core tokens
- `--color-primary-maroon: #6C1F35`
- `--color-secondary-maroon: #4A1524`
- `--color-deep-maroon: #2E0D1A`
- `--color-brand-maroon: #800000`
- `--color-brand-gold: #D4AF37`
- `--color-brand-navy: #002147`
- `--color-brand-sand: #F5F5DC`
- `--color-white: #FFFFFF`
- `--color-offwhite: #F9F9F9`
- `--color-gray-light: #F5F5F5`
- `--color-gray: #555555`
- `--color-text-main: #1A1A1A`
- `--color-text-dark: #000000`
- `--color-border-light: #E5E5E5`

### Usage guidance
- Use `--color-primary-maroon` for overlines, emphasis, and identity-bearing accents.
- Use `--color-text-main` for most body content and `--color-text-dark` for highest-contrast display moments.
- Use `--color-offwhite` and `--color-gray-light` for soft section breaks instead of heavy carding.
- Gold and navy exist as secondary brand-support colors and should be used sparingly, not as dominant UI colors.
- Preserve strong contrast. The product context expects WCAG 2.1 AA as the baseline.

## Typography
### Font roles
- **Display:** `var(--font-display)` → Playfair Display
- **Heading/UI:** `var(--font-heading)` → Montserrat
- **Body:** `var(--font-body)` → Inter

### Type scale and classes
- `.text-hero`: oversized uppercase display, `clamp(4rem, 15vw, 18rem)`, 900 weight
- `.text-h1`: primary section heading, `clamp(2.5rem, 6vw, 6rem)`, 900 weight
- `.text-h2`, `.walker-heading`: secondary heading, `clamp(2rem, 4vw, 4.5rem)`, 800 weight
- `.text-ui`: uppercase utility text, `0.875rem`, 700 weight, `0.15em` tracking
- `.text-overline`, `.walker-overline`: 11px uppercase label, maroon, `0.18em` tracking
- `.text-body-lg`, `.walker-body`: large body copy, `1.25rem`, `1.6` line-height

### Typography guidance
- Playfair is used selectively for brand presence, especially in the logo wordmark.
- Montserrat carries most headings, UI labels, and uppercase structure.
- Inter keeps paragraphs readable and contemporary.
- Maintain clear hierarchy through weight and scale contrast, not decorative text effects.

## Layout and Spacing
### Tokens
- `--container-max: 1440px`
- `--section-padding-y: clamp(4rem, 10vw, 12rem)`
- `--container-padding: clamp(24px, 4vw, 60px)`

### Structural patterns
- Use full-viewport sections liberally for cinematic storytelling.
- Prefer asymmetrical editorial compositions over repetitive card grids.
- Reuse `walker-container`, `walker-section`, and split-layout patterns before inventing new wrappers.
- Sticky and horizontally staged sections are part of the site identity when used intentionally.

## Motion
### Easing tokens
- `--ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1)`
- `--ease-in-out-quint: cubic-bezier(0.83, 0, 0.17, 1)`
- `--ease-smooth: cubic-bezier(0.25, 1, 0.5, 1)`

### Motion patterns in codebase
- Framer Motion transforms power the hero mask zoom and opacity staging.
- GSAP powers intro-style and scroll-linked timelines elsewhere in the system.
- Motion should rely on transform and opacity, not layout animation.
- Reduced motion is enforced globally in `src/app/globals.css` and should remain intact for any new effect.

### Motion guidance
- Motion should feel controlled, elegant, and purposeful.
- Avoid bouncy, elastic, or playful eases.
- Use scale, masking, parallax, and opacity to create depth.
- For narrative reveals, let motion clarify the school’s identity rather than merely decorate the screen.

## Core Components and Patterns
### Hero mask
- `src/components/sections/HeroMasked.tsx`
- Signature pattern: large SVG text mask revealing imagery through letterforms.
- This is a core brand-language reference for future cinematic moments.

### Header
- `src/components/layout/WalkHeader.tsx`
- Fixed, high-z navigation with soft blur, polished transition states, and editorial wordmark treatment.
- Should feel premium and calm, not app-like.

### Sticky split section
- `src/components/sections/StickySplitSection.tsx`
- Core storytelling block pairing structured copy and accordions with photographic compositions.
- Avoid converting this into nested cards or dense dashboard layouts.

### Buttons and links
- Primary buttons are bold uppercase actions with strong contrast.
- Ghost links use understated text treatment with minimal emphasis.
- CTA styling should remain crisp and disciplined.

## Imagery
- Photography should do real narrative work: campus, students, academics, faith, community, and aspiration.
- Use large crops and immersive framing.
- Avoid making imagery feel like stock filler.
- When using placeholder assets, compositions should still feel intentional and premium.

## Accessibility and Inclusion
- Build against WCAG 2.1 AA expectations.
- Keep keyboard navigation, semantic structure, and readable contrast intact.
- New motion work must preserve reduced-motion fallbacks.
- Large display type must remain legible across breakpoints and not obscure orientation.

## Anti-patterns for this project
- Do not make the site feel like a corporate dashboard.
- Avoid flat panel-heavy compositions, sterile utility layouts, and repetitive same-size card grids.
- Avoid gradient text, decorative glassmorphism, and default SaaS tropes.
- Do not let brand ambition turn into luxury-brand distance. The site should feel elevated, but still welcoming to ordinary families.

## Source of truth in codebase
- Global design tokens: `src/app/globals.css`
- Hero brand-language reference: `src/components/sections/HeroMasked.tsx`
- Navigation styling: `src/components/layout/WalkHeader.tsx`
- Editorial split content pattern: `src/components/sections/StickySplitSection.tsx`
