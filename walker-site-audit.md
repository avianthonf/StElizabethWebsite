# Walker School Website - Comprehensive Audit Report

**Source File:** walker-home.html  
**Date:** 2026-04-27  
**URL:** https://www.thewalkerschool.org

---

## Executive Summary

The Walker School homepage uses Amaisi DXP CMS with jQuery, Bootstrap 5, Slick Slider, and Kendo UI. Component-based with cms-feature-wrapper blocks. 14 GalleryFeature and 10+ TextFeature components.

**Technologies:** Bootstrap 5, Slick Slider, jQuery 3.x, Kendo UI 2024.3.806, Amaisi DXP, Vimeo

---

## 1. MAJOR SECTIONS / PANELS

### Section 1: Header Navigation Bar (site-header)
**Purpose:** Primary site navigation with logo, quick links, multi-level dropdowns.
**Key CSS Classes:** site-header, site-container, site-header-logo, site-header-right, site-search-wrapper, site-menu-toggle, site-navigation, site-nav-block, site-nav-item, site-subnav-item, site-subnav-wrapper
**JS Widgets:** Mobile menu toggle via jQuery, search handlers (onSearchTermPressEnter, onSearchTerm)
**Layout:** Fixed top nav ~1200px, horizontal mega-menu 4-level dropdowns, hamburger on mobile, sticky scroll
**Images:** WALK_2024_Logo_Horiz_Maroon_2-639-optimized.webp
**Navigation - 10 Items:** 1.About Us(8), 2.Admission(9), 3.Community(6), 4.Support Walker(4), 5.Primary School(3), 6.Lower School(3), 7.New Avenues(4), 8.Middle School(2), 9.Upper School(3), 10.Activities(7-8)
Dimensions: Desktop 80-100px+40px subnav, Mobile 60px

### Section 2: Main Content Area (site-main)
**Classes:** site-main, site-main-wrapper, site-scroller-wrapper

### Section 3: Intro Banner (TextFeature 0d951f5ba34d)
**Classes:** site-custom-intro-banner-wrapper, site-custom-intro-banner
**JS:** None | **Dimensions:** 40-60px

### Section 4: Video Hero Banner (GalleryFeature 42e71fac)
**Purpose:** Hero with Vimeo autoplay video.
**Key Classes:** site-slide-height-dt-cover-wrapper, site-slider-slideshow-wrapper, site-color-white, site-custom-video-banner
**JS Widgets:** Slick Slider - single slide, no autoplay
**Media:** videocover2-812-optimized.webp, player.vimeo.com/video/1129845674
**Dimensions:** Desktop 500-600px, Mobile 400px

### Section 5: We Value Carousel (GalleryFeature 6761a481)
**Purpose:** Rotating school values showcase.
**Key Classes:** site-multi-slide-slider-wrapper, site-custom-number-gallery-wrapper
**JS Widgets:** Slick Slider - 6 visible infinite loop
**Media:** Curiosity-310-optimized.webp (+5 more)
**Dimensions:** Height 450-500px

### Section 6: Emmy Cutout Banner (GalleryFeature 623ff72c)
**Key Classes:** site-bg-primary-wrapper, site-custom-cutout-image-wrapper
**Media:** Emmy_Cutout-813.png | **Height:** 300-400px

### Section 7: COBB COUNTYS BEST Accolade (TextFeature 51ed2e1b)
**Key Classes:** site-custom-red-header-wrapper, site-table-accordion
**Layout:** Red header, accordion table | **Height:** 250-350px expanded

### Section 8: Mobile-Hide Image Grid (GalleryFeature d72c7c2c)
**Key Classes:** site-mobile-hide-wrapper, site-custom-image-grid-wrapper
**JS:** Slick Slider multi-slide (3-4 visible) | **Height:** 300px

### Section 9: Split Image Grid (GalleryFeature 1e169aa4)
**Key Classes:** site-custom-grid-reverse-wrapper
**Dimensions:** Height 400px per slide

### Section 10: Desktop-Half Width (GalleryFeature 19c0d6bc)
**Key Classes:** site-desktop-width-50-wrapper, site-mobile-hide-wrapper
**Dimensions:** Height 350px, width 50%

### Section 11: Split Images with Padding (GalleryFeature 0dd9651c)
**Key Classes:** site-desktop-width-50-wrapper, site-padding-dt-left-30-wrapper, site-padding-mob-left-20-wrapper, site-padding-mob-right-20-wrapper
**Layout:** Desktop 50%+30px left, Mobile 100%+20px sides | **Height:** 400px

### Section 12: Red Header Text (TextFeature 2f76d5c4)
**Key Classes:** site-bg-light-wrapper, site-custom-red-header-wrapper
**Dimensions:** Height 150px

### Section 13: Custom Slide Gallery (GalleryFeature 54cd62cc)
**Key Classes:** site-custom-slide-gallery-wrapper
**JS:** Slick Slider multi-slide with navigation | **Height:** 350-400px

### Section 14: Cutout Banner 2 (GalleryFeature d735f7c7)
**Key Classes:** site-bg-primary-wrapper, site-custom-cutout-image-wrapper
**Dimensions:** Height 300-400px

### Section 15: Tab Slider (GalleryFeature 729e5655)
**Key Classes:** site-slider-tab-dt-left-wrapper, site-slider-tab-wrapper
**JS Widgets:** Dual Slick Sliders - Synchronized asNavFor, adaptiveHeight:true, fade:true
**Dimensions:** Height 500px variable

### Section 16: Final Hero Banner (GalleryFeature 4abf1360)
**Key Classes:** site-slide-caption-dt-mc-wrapper, site-slide-height-dt-cover-wrapper, site-color-white, site-custom-banner-size-150-wrapper
**JS Widgets:** Slick Slider single slide
**Layout:** White, dead-center, 150% size | **Height:** 600-750px

---

## 2. CSS CLASS INVENTORY

**Custom site-* Classes (95+):**
- Layout: site-container, site-main, site-main-wrapper, site-scroller-wrapper
- Nav: site-nav, site-nav-block, site-nav-item, site-subnav-wrapper, site-subnav-item  
- Sliders: site-slider, site-slider-slideshow, site-slick-wrapper, site-slide, site-slider-height-*, site-slider-tab-*
- Color: site-color-white, site-bg-primary, site-bg-light
- Custom: site-custom-video-banner, site-custom-red-header, site-custom-number-gallery, site-custom-cutout-image, site-custom-grid-reverse, site-custom-slide-gallery
- Spacing: site-padding-dt-right-1, site-padding-dt-left-30, site-padding-mob-*
- CMS: cms-feature-wrapper, cms-gallery-feature, cms-text-feature, feature-zone

---

## 3. JAVASCRIPT WIDGET PATTERNS

**Slick Pattern 1 (Single - 11 instances):** infinite:false, slidesToShow:1, autoplay:false
**Slick Pattern 2 (Multi - 1 instance):** infinite:true, slidesToShow:6, arrows:true, responsive:600px->1
**Slick Pattern 3 (Dual Sync - 1 instance):** asNavFor, adaptiveHeight:true, fade:true

**Amaisi DXP Analytics:** Page visit tracking, bookmark events, admissions calculator tracking

---

## 4. UNIQUE LAYOUT BEHAVIORS
1. Slick Slider Carousels (14) - Lazy loading, responsive
2. Mega-Menu Navigation - 4-level deep dropdowns
3. Fixed/Sticky Header
4. Multi-Slide Sync (asNavFor) for tabs
5. Vimeo Video Background (autoplay=1, muted=1, loop=1)
6. Cutout PNG Overlays (2)
7. Mobile-First Media Queries
8. Accordion Table
9. Dead-Center Captions
10. Full-Width Banners (150% height)

---

## 5. IMAGES & MEDIA URLs
**Hero Images:** videocover2-812-optimized.webp, Emmy_Cutout-813.png, Curiosity-310-optimized.webp, WALK_2024_Logo_Horiz_Maroon_2-639-optimized.webp
**Vimeo:** player.vimeo.com/video/1129845674

---

## 6. ADDITIONAL PAGE CHECKS
**/about-us:** 302 Redirect -> 200 OK (to /we-value), walker-about.html (2,473 lines)
**/admission:** 200 OK, walker-admission.html (150 KB, 2,473 lines) - forms, multi-step, calculator

---

## 7. TECHNICAL STACK SUMMARY
**Frontend:** jQuery 3.x, Bootstrap 5, Slick Slider 1.8.x, Magnific Popup, Kendo UI 2024.3.806
**CMS:** Amaisi DXP
**Video:** Vimeo Player API
**Analytics:** Google Tag Manager (GTM-M7X5MGJ), Custom collector.js, Ubiq Education tracker

---

## 8. KEY OBSERVATIONS
**Strengths:** Componentized CMS, responsive design, rich multimedia, deep navigation, strong analytics, lazy loading
**Concerns:** Heavy JS (14+ Slick, 4+ libs), large HTML (2,556 lines), multiple CDN deps, no hero video autoplay, accessibility concerns, performance
**Optimizations:** Lazy-load images, defer JS, code-split CSS, optimize WebP, minimize DOM, preload assets

---

## CONCLUSION
Sophisticated component-driven CMS on Amaisi DXP. Balances rich multimedia (14+ feature zones) with deep navigation. Performance trade-offs present opportunities for Core Web Vitals improvement, image optimization, JS bundle analysis, accessibility audit, and SEO review.

**Next Steps:** Performance audit (Lighthouse), image optimization, JS bundle analysis, accessibility audit (WCAG 2.1), SEO audit, user testing.
