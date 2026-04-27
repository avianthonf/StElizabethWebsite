# Walker School CSS Pattern Reference

**Source:** walker-site.css (minified, 1.8MB)  
**Date Extracted:** 2026-04-27  
**Total Unique site-* Classes:** 247  
**Purpose:** Design system reference for St. Elizabeth High School website implementation

---

## Overview

The Walker School uses a comprehensive CSS design system with a `site-*` prefix for all custom classes. The CSS is organized into functional categories covering layout, navigation, sliders/carousels, custom components, responsive utilities, and spacing systems.

**Key Architecture Principles:**
- Component-based with `cms-feature-wrapper` blocks
- Mobile-first responsive design
- Extensive use of CSS custom properties (not extracted from minified file)
- Modifier classes for desktop (`-dt-`) and mobile (`-mob-`) variants
- Utility-first spacing system with numeric suffixes

---

## 1. NAVIGATION SYSTEM

### Header & Navigation Classes

The navigation system uses a multi-level mega-menu architecture with up to 4 levels of nesting.

**Core Navigation Classes:**
```
.site-header
.site-header-logo
.site-header-right
.site-header-wrapper
.site-navigation
.site-navigation-wrapper
.site-menu-toggle (hamburger menu)
.site-search-wrapper
```

**Navigation Structure:**
```
.site-nav
.site-nav-block
.site-nav-item
.site-nav-link
.site-subnav-wrapper
.site-subnav-item
.site-subnav-block
```

**Behavior Notes:**
- Fixed/sticky header on scroll
- Mega-menu dropdowns with 4-level depth
- Mobile hamburger menu toggle
- Search functionality integrated into header
- Typical header height: Desktop 80-100px, Mobile 60px

---

## 2. SLIDER & CAROUSEL SYSTEM

### Slick Slider Integration

The site uses Slick Slider extensively (14+ instances on homepage) with three main patterns.

**Core Slider Classes:**
```
.site-slider
.site-slider-wrapper
.site-slider-slideshow-wrapper
.site-slick-wrapper
.site-slide
.site-slide-link
```

**Slider Image & Video:**
```
.site-slider-image
.site-slider-image-block
.site-slider-video
.site-slider-video-block
```

**Slider Captions:**
```
.site-slider-caption
.site-slider-caption-block
.site-slider-capton-data
```

**Caption Positioning (Desktop):**
```
.site-slide-caption-dt-tl (top-left)
.site-slide-caption-dt-tc (top-center)
.site-slide-caption-dt-tr (top-right)
.site-slide-caption-dt-ml (middle-left)
.site-slide-caption-dt-mc (middle-center)
.site-slide-caption-dt-mr (middle-right)
.site-slide-caption-dt-bl (bottom-left)
.site-slide-caption-dt-bc (bottom-center)
.site-slide-caption-dt-br (bottom-right)
```

**Caption Positioning (Mobile):**
```
.site-slide-caption-mob-top
.site-slide-caption-mob-bottom
```

**Slide Height Control:**
```
.site-slide-height-dt-cover (desktop cover)
.site-slide-height-dt-fixed (desktop fixed height)
.site-slide-height-mob-cover (mobile cover)
.site-slide-height-mob-fixed (mobile fixed height)
```

**Tab Slider System:**
```
.site-slider-tab-wrapper
.site-slider-tab-dt-left-wrapper
.site-slider-tab-dt-right-wrapper
.site-slider-tab-dt-bottom
.site-slider-tab-mob-top
.site-slider-tab-mob-bottom
.site-slider-tab-list
.site-slider-tab-content-list
```

**Slider Popup:**
```
.site-slider-popup
.site-slider-popup-wrapper
.site-slider-popup-close
.site-slider-pop-wrapper
.site-slider-pop-caption
.site-slider-pop-title
.site-slider-pop-desc
.site-slider-pop-img
```

**JavaScript Patterns (from audit):**
- Pattern 1 (Single): `infinite:false, slidesToShow:1, autoplay:false`
- Pattern 2 (Multi): `infinite:true, slidesToShow:6, arrows:true, responsive`
- Pattern 3 (Dual Sync): `asNavFor, adaptiveHeight:true, fade:true`

---

## 3. CUSTOM COMPONENT PATTERNS

### Custom Wrappers

These are specialized component wrappers for unique homepage sections.

**Extracted Custom Classes:**
```
.site-custom-intro-banner-wrapper
.site-custom-intro-banner
.site-custom-video-banner
.site-custom-number-gallery-wrapper
.site-custom-cutout-image-wrapper
.site-custom-red-header-wrapper
.site-custom-image-grid-wrapper
.site-custom-grid-reverse-wrapper
.site-custom-slide-gallery-wrapper
.site-custom-banner-size-150-wrapper
```

**Component Purposes (from audit):**
- `video-banner`: Hero section with Vimeo autoplay background
- `number-gallery`: Rotating values carousel (6 slides visible)
- `cutout-image`: PNG overlay with transparent background
- `red-header`: Branded header section with accent color
- `image-grid`: Multi-column image layout
- `grid-reverse`: Reversed column order for visual variety
- `slide-gallery`: Gallery with navigation controls
- `banner-size-150`: Oversized banner (150% height)

---

## 4. LAYOUT & CONTAINER SYSTEM

### Core Layout Classes

```
.site-container (max-width container)
.site-main
.site-main-wrapper
.site-scroller-wrapper
```

### Responsive Width System

**Desktop Width Classes:**
```
.site-desktop-width-16 (16.66%)
.site-desktop-width-20 (20%)
.site-desktop-width-25 (25%)
.site-desktop-width-33 (33.33%)
.site-desktop-width-50 (50%)
.site-desktop-width-60 (60%)
.site-desktop-width-75 (75%)
.site-desktop-width-90 (90%)
.site-desktop-width-100 (100%)
```

**Mobile Width Classes:**
```
.site-mobile-width-16
.site-mobile-width-20
.site-mobile-width-25
.site-mobile-width-33
.site-mobile-width-50
.site-mobile-width-60
.site-mobile-width-75
.site-mobile-width-90
.site-mobile-width-100
```

### Visibility Utilities

```
.site-desktop-hide
.site-desktop-hide-wrapper
.site-mobile-hide
.site-mobile-hide-wrapper
```

### Alignment Utilities

```
.site-align-left
.site-align-left-wrapper
.site-align-center
.site-align-center-wrapper
.site-align-right
.site-align-right-wrapper
.site-mobile-left
.site-mobile-left-wrapper
.site-mobile-center
.site-mobile-center-wrapper
.site-mobile-right
.site-mobile-right-wrapper
```

---

## 5. SPACING SYSTEM

### Padding Utilities

The spacing system uses numeric suffixes (likely pixels) with separate desktop and mobile variants.

**Desktop Padding:**
```
.site-padding-dt-top-{n}-wrapper
.site-padding-dt-right-{n}-wrapper
.site-padding-dt-bottom-{n}-wrapper
.site-padding-dt-left-{n}-wrapper
```

**Mobile Padding:**
```
.site-padding-mob-top-{n}-wrapper
.site-padding-mob-right-{n}-wrapper
.site-padding-mob-bottom-{n}-wrapper
.site-padding-mob-left-{n}-wrapper
```

**Example from audit:**
- `site-padding-dt-left-30-wrapper` (30px left padding on desktop)
- `site-padding-mob-left-20-wrapper` (20px left padding on mobile)
- `site-padding-mob-right-20-wrapper` (20px right padding on mobile)

---

## 6. COLOR & BACKGROUND SYSTEM

### Color Classes

```
.site-color-white
.site-bg-primary
.site-bg-primary-wrapper
.site-bg-light
.site-bg-light-wrapper
```

**Usage Notes:**
- `site-bg-primary`: Brand maroon color (#7D1F3E or similar)
- `site-bg-light`: Light gray/off-white background
- `site-color-white`: White text for dark backgrounds

---

## 7. CMS FEATURE SYSTEM

### Feature Wrapper Classes

The Amaisi DXP CMS uses a feature-based component system.

**Core CMS Classes:**
```
.cms-feature-wrapper
.cms-feature-block
.cms-feature-data
.cms-feature-data-wrapper
.cms-gallery-feature
.cms-text-feature
.cms-text-feature-content
.cms-text-feature-data
```

**Feature Types:**
- `GalleryFeature`: Image galleries, sliders, carousels
- `TextFeature`: Text content blocks, headers, accordions

**Feature Operations (CMS editing):**
```
.cms-feature-bar
.cms-feature-operation
.cms-feature-remove
.cms-feature-publish
.cms-feature-share
.cms-feature-stats
```

### Accordion Components

```
.cms-accordion-block
.cms-accordion-block-active
.cms-accordion-title
.cms-accordion-desc
.site-feature-accordion
.site-feature-accordion-wrapper
.site-feature-accordion-active
```

---

## 8. RESPONSIVE BREAKPOINTS

### Media Query System

**Extracted Breakpoints:**
```
@media (max-width: 219px)   - Very small devices
@media (max-width: 399px)   - Small phones
@media (max-width: 599px)   - Phones
@media (max-width: 800px)   - Large phones / small tablets
@media (max-width: 900px)   - Tablets
@media (max-width: 999px)   - Tablets
@media (max-width: 1019px)  - Small laptops
@media (max-width: 1020px)  - Small laptops
@media (max-width: 1023px)  - Small laptops
@media (max-width: 1099px)  - Laptops
@media (max-width: 1199px)  - Laptops
@media (max-width: 1299px)  - Desktop
@media (max-width: 1399px)  - Desktop
@media (max-width: 1439px)  - Desktop
@media (max-width: 1499px)  - Large desktop
@media (max-width: 1549px)  - Large desktop
@media (max-width: 1599px)  - Large desktop
@media (max-width: 1699px)  - XL desktop
@media (max-width: 1899px)  - XXL desktop
```

**Key Breakpoints for Implementation:**
- **Mobile:** < 600px
- **Tablet:** 600px - 1023px
- **Desktop:** 1024px - 1299px
- **Large Desktop:** 1300px+

**Landscape Orientation:**
```
@media screen and (max-width: 800px) and (orientation: landscape)
@media screen and (max-height: 300px)
```

---

## 9. ANIMATION SYSTEM

### Animation Usage

**Statistics:**
- Total animation/transition/transform occurrences: 1,134
- Keyframe animations: 2

**Keyframe Animations:**
```
@keyframes blink
@keyframes ellipsis
```

**Animation Classes:**
```
.site-animation-active
.site-animation-top-wrapper
.site-animation-right-wrapper
.site-animation-bottom-wrapper
.site-animation-left-wrapper
```

**Common Animation Patterns:**
- Fade-in on scroll
- Slide-in from directions (top, right, bottom, left)
- Smooth transitions on hover states
- Slider transitions (fade, slide)

---

## 10. FORM SYSTEM

### Form Classes

```
.site-form-wrapper
.site-form-block
.site-form-block-wrapper
.site-form-field
.site-form-field-half
.site-form-field-half-block
.site-form-half-block
.site-form-label
.site-form-data
.site-form-data-inline
.site-form-button
.site-form-buttons
.site-form-action
.site-form-action-drag
.site-form-alert
.site-form-note
.site-form-capcha
.site-form-payment-wrapper
.site-form-product-data-block
.site-form-product-payment-block
```

### Form Controls

```
.site-checkbox
.site-checkbox-label
.site-checkbox-text
.site-display-checkbox
```

---

## 11. DISPLAY & LISTING SYSTEM

### Display Components

```
.site-display-wrapper
.site-display-wrapper-listitem
.site-display-list
.site-display-list-block
.site-display-listview
.site-display-slideshow
.site-display-title
.site-display-desc
.site-display-date
.site-display-data-block
.site-display-image
.site-display-image-link
.site-display-img-background
.site-display-img-left
.site-display-img-right
.site-display-img-bottom
.site-display-no-img
```

### Filter System

```
.site-display-filter-wrapper
.site-display-filter-data
.site-display-filter-title
.site-display-filter-title-active
.site-display-filter-desc
.site-display-filters-left
.site-display-filters-right
.site-display-filters-bottom
```

---

## 12. CALENDAR SYSTEM

### Calendar Classes

```
.site-calendar-wrapper
.site-calendar-block-wrapper
.site-calendar-filter
.site-calendar-filter-block
.site-calendar-filter-button
.site-calendar-filter-button-active
.site-calendar-filter-data
.site-calendar-filter-title
.site-calendar-filter-desc
.site-calendar-feeds
.site-calendar-feed-wrapper
.site-calendar-feed-color
.site-calendar-categories
.site-calendar-checkbox
.site-calendar-checkbox-wrapper
.site-calendar-action
.site-calendar-popup-block
```

---

## 13. ADDITIONAL UTILITY CLASSES

### Border Utilities

```
.site-border-solid
.site-border-curved
```

### Button Utilities

```
.site-button-round
.site-button-semi-round
.site-button-full-width
```

### Miscellaneous

```
.site-caption-no-gradient
.site-center-mode-wrapper
.site-active-slider-pop-wrapper
.site-feature-bottom-no-space
.site-feature-bottom-no-space-wrapper
.site-breadcrumbs-wrapper
```

---

## 14. JAVASCRIPT FUNCTIONALITY REFERENCE

### Required JS Files (from audit)

**Note:** These files contain proprietary code and should not be downloaded directly. Instead, implement equivalent functionality using modern libraries.

**common.js** - Likely contains:
- Mobile menu toggle handlers
- Search functionality (onSearchTermPressEnter, onSearchTerm)
- Scroll event handlers for sticky header
- General utility functions

**page-factory.js** - Likely contains:
- Slick Slider initialization patterns
- Dynamic component loading
- CMS feature rendering
- Analytics tracking integration

### Recommended Modern Alternatives

Instead of downloading proprietary JS:

1. **Slick Slider** → Use Swiper.js or Embla Carousel
2. **jQuery** → Use vanilla JavaScript or React hooks
3. **Custom menu** → Implement with Headless UI or Radix UI
4. **Analytics** → Use modern analytics libraries (Plausible, Fathom, GA4)

---

## 15. IMPLEMENTATION NOTES

### Design System Principles

1. **Naming Convention:**
   - `site-*` prefix for all custom classes
   - `cms-*` prefix for CMS-specific classes
   - `-dt-` infix for desktop-specific styles
   - `-mob-` infix for mobile-specific styles
   - `-wrapper` suffix for container elements

2. **Responsive Strategy:**
   - Mobile-first approach
   - Separate classes for mobile and desktop variants
   - Extensive use of media queries
   - Breakpoint-specific utilities

3. **Component Architecture:**
   - Feature-based components (GalleryFeature, TextFeature)
   - Wrapper pattern for layout control
   - Modifier classes for variants
   - Utility classes for spacing and alignment

4. **Color System:**
   - Primary brand color (maroon)
   - Light background variants
   - White text for contrast
   - Likely uses CSS custom properties (not visible in minified CSS)

5. **Spacing System:**
   - Numeric suffix pattern (e.g., -30, -20)
   - Separate desktop and mobile spacing
   - Directional padding utilities
   - Wrapper-based spacing application

### Adaptation Strategy for St. Elizabeth

When implementing for St. Elizabeth High School:

1. **Adopt the naming convention** but simplify where possible
2. **Use Tailwind CSS** for utility classes instead of custom CSS
3. **Implement slider patterns** with modern React libraries (Swiper, Embla)
4. **Create component variants** matching the 16 section types from audit
5. **Use CSS custom properties** for theming and color management
6. **Implement responsive utilities** using Tailwind's breakpoint system
7. **Build feature components** as React Server Components where possible
8. **Add client interactivity** only where needed with 'use client'

---

## 16. SECTION TYPE MAPPING

### Homepage Section Types (from audit)

1. **Header Navigation** → `site-header`, `site-navigation`
2. **Intro Banner** → `site-custom-intro-banner-wrapper`
3. **Video Hero** → `site-custom-video-banner`, `site-slide-height-dt-cover-wrapper`
4. **Values Carousel** → `site-multi-slide-slider-wrapper`, `site-custom-number-gallery-wrapper`
5. **Cutout Banner** → `site-custom-cutout-image-wrapper`, `site-bg-primary-wrapper`
6. **Red Header Text** → `site-custom-red-header-wrapper`
7. **Mobile-Hide Grid** → `site-mobile-hide-wrapper`, `site-custom-image-grid-wrapper`
8. **Split Grid** → `site-custom-grid-reverse-wrapper`
9. **Half-Width Desktop** → `site-desktop-width-50-wrapper`
10. **Split with Padding** → `site-desktop-width-50-wrapper`, `site-padding-dt-left-30-wrapper`
11. **Red Header Light BG** → `site-bg-light-wrapper`, `site-custom-red-header-wrapper`
12. **Slide Gallery** → `site-custom-slide-gallery-wrapper`
13. **Cutout Banner 2** → `site-custom-cutout-image-wrapper`
14. **Tab Slider** → `site-slider-tab-dt-left-wrapper`, `site-slider-tab-wrapper`
15. **Final Hero** → `site-slide-caption-dt-mc-wrapper`, `site-custom-banner-size-150-wrapper`

---

## CONCLUSION

This reference document captures the CSS pattern architecture from The Walker School website. The design system is comprehensive, component-based, and highly responsive. 

**Key Takeaways:**
- 247 unique `site-*` classes organized into functional categories
- Extensive slider/carousel system with multiple variants
- Robust responsive utilities with desktop/mobile modifiers
- Feature-based CMS architecture
- Comprehensive spacing and layout utilities
- 1,134+ animation/transition instances

**Next Steps:**
- Implement equivalent patterns using Next.js + Tailwind CSS
- Build reusable React components matching section types
- Create data layer for content management
- Develop interaction patterns with modern JavaScript

**Copyright Notice:** This document describes CSS patterns and architecture for educational and reference purposes. Do not copy code verbatim. Implement your own version inspired by these patterns.
