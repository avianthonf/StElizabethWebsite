# Feature Research

**Domain:** School Marketing Website (K-12 Private School)
**Researched:** 2026-04-27
**Confidence:** MEDIUM

## Feature Landscape

### Table Stakes (Users Expect These)

Features prospective families assume exist. Missing these = site feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Multi-level Navigation** | Schools have complex content (divisions, programs, admissions) | MEDIUM | Mega-menu with 6-8 main sections. Walker School uses: About, Admission, Community, Support, Divisions, Athletics, Academics, Arts |
| **Admissions Inquiry Form** | Primary conversion goal for school sites | LOW | Fields: Parent name, email, phone, student name, grade level, inquiry type. Must work with static export (form service like Formspree, Netlify Forms) |
| **About Pages** | Parents need mission, values, history, leadership | LOW | Reuse existing StickySplitSection component with accordion for expandable content |
| **Academics Overview** | Core value proposition - what students learn | MEDIUM | Reuse DivisionsTabs pattern for grade-level programs. Add curriculum highlights |
| **Admissions Process** | Step-by-step enrollment journey | LOW | Timeline/stepper component showing: Inquiry → Visit → Apply → Decision |
| **Tuition & Financial Aid** | Cost transparency expected (even if "contact us") | LOW | Simple content page. Many schools show ranges or link to PDF |
| **Faculty/Staff Directory** | Parents want to know who teaches their children | MEDIUM | Grid of cards with photo, name, title, bio. Filter by department/division |
| **Contact Information** | Address, phone, email, office hours | LOW | Footer (already exists) + dedicated Contact page with map embed |
| **Mobile-Responsive Design** | 60%+ of school site traffic is mobile (parents browsing) | LOW | Already implemented with Tailwind responsive classes |
| **Photo Galleries** | Visual storytelling is critical for school marketing | MEDIUM | Masonry grid (modern) or lightbox slider. Reuse existing image grid from StickySplitSection |
| **Athletics Overview** | Sports programs are major differentiator for private schools | LOW | Reuse PassionsPanel pattern from homepage. List sports by season |
| **Arts Programs** | Visual/performing arts expected at private schools | LOW | Similar to Athletics - reuse PassionsPanel. Add program descriptions |
| **News/Announcements** | Current families and prospects expect updates | MEDIUM | Blog-style listing. Static export = markdown files or JSON data. No CMS needed for MVP |
| **Footer with Quick Links** | Standard web pattern - navigation, social, legal | LOW | Already exists (FooterCtaSection). Expand with sitemap links |

### Differentiators (Competitive Advantage)

Features that set St. Elizabeth apart. Not required, but valuable for enrollment.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Virtual Campus Tour** | Post-pandemic expectation. Reduces friction for distant families | HIGH | 360° photos or video walkthrough. Can use YouTube embed (LOW) or Matterport (HIGH) |
| **Student/Parent Testimonials** | Social proof drives enrollment decisions | LOW | Video testimonials (embed YouTube) or quote cards with photos. Add to homepage or dedicated page |
| **Live Event Calendar** | Shows active community, helps families plan visits | MEDIUM | Static export challenge. Options: Google Calendar embed, JSON data with manual updates, or third-party widget (Calendly) |
| **Alumni Success Stories** | Demonstrates long-term outcomes | LOW | Case study format. Reuse StickySplitSection with alumni photos and career highlights |
| **Faith Integration Content** | If St. Elizabeth is faith-based, this differentiates from secular schools | LOW | Dedicated page explaining chapel, service, spiritual formation. Walker School emphasizes Christian identity |
| **Interactive Program Finder** | "Which program fits my child?" quiz or filter | MEDIUM | Client-side only (static export). Simple form with conditional logic showing recommended division/program |
| **Video Backgrounds/Hero** | Modern, engaging first impression | MEDIUM | Already have hero section. Add video option (autoplay, muted, loop) |
| **Downloadable Resources** | Admissions packets, curriculum guides, handbooks | LOW | PDF links. Host in `/public/downloads/` |
| **School Culture/Values Showcase** | Walker School's "We Value" carousel is highly effective | LOW | Already implemented (ValueCarousel). Ensure values are St. Elizabeth-specific |
| **Scholarship/Financial Aid Calculator** | Reduces "can we afford this?" friction | HIGH | Requires backend or third-party embed. Defer to v2 unless critical |
| **Multi-language Support** | If serving diverse community (Pomburpa region may need Hindi/Kannada) | HIGH | Next.js i18n. Significant content translation effort. Assess need first |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems or don't drive enrollment.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Live Chat Widget** | "We need to answer questions immediately" | Requires staffing during all browsing hours. Static export incompatible without third-party service. Often goes unanswered, creating negative impression | Prominent "Schedule a Visit" CTA + inquiry form with fast response SLA |
| **Student/Parent Login Portal** | "Other schools have portals" | Requires backend, authentication, database. Out of scope for marketing site. Separate system (LMS/SIS) handles this | Link to external portal (e.g., Google Classroom, school management system) |
| **Real-time Sports Scores** | "Parents want live updates" | Requires backend or frequent manual updates. High maintenance | Link to third-party sports platform (MaxPreps, TeamSnap) or post results after games |
| **Complex Search Functionality** | "Users need to find content" | Static export makes search difficult. Algolia/Fuse.js add complexity. Most school sites have <50 pages | Well-organized navigation + sitemap page. Add simple client-side search (Fuse.js) only if site grows >100 pages |
| **Social Media Feed Embed** | "Show we're active on social" | Third-party widgets slow page load, break frequently, look dated | Curated social proof (testimonials, photos) + social links in footer |
| **Animated Mascot/Branding** | "Make it fun for kids" | Kids don't choose schools, parents do. Animations can feel unprofessional | Professional photography of real students. Subtle animations (scroll reveals) for polish |
| **Auto-playing Audio** | "Play school song on homepage" | Universally hated. Accessibility issue. Users leave immediately | Video with user-initiated play. Link to school song on About page |

## Feature Dependencies

```
Navigation System
    └──requires──> All Content Pages (About, Admissions, Academics, etc.)

Admissions Inquiry Form
    └──requires──> Form Service Integration (Formspree/Netlify Forms)
    └──enhances──> All CTA Buttons (hero, footer, etc.)

Faculty Directory
    └──requires──> Faculty Data (JSON or markdown)
    └──optional──> Photo Assets (headshots)

Virtual Campus Tour
    └──requires──> Video/360° Content Production
    └──enhances──> Admissions Process Page

Event Calendar
    └──requires──> Calendar Data Source (Google Calendar API or JSON)
    └──conflicts──> Static Export (needs workaround)

Search Functionality
    └──requires──> Content Index (all pages)
    └──conflicts──> Static Export (client-side only)

Multi-language Support
    └──requires──> All Content Translated
    └──requires──> Next.js i18n Configuration
```

### Dependency Notes

- **Navigation requires content pages:** Can't build mega-menu until page structure is defined. Build navigation last or use placeholder links.
- **Inquiry form enhances CTAs:** Once form exists, all "Inquire" / "Schedule Visit" buttons link to it. Build form early.
- **Virtual tour enhances admissions:** Tour is most valuable on Admissions pages. Don't build tour until admissions content exists.
- **Calendar conflicts with static export:** Google Calendar embed works, but dynamic events require client-side fetch or build-time generation.
- **Search conflicts with static export:** No server-side search. Options: Fuse.js (client-side), Algolia (third-party), or skip search entirely.

## MVP Definition

### Launch With (v1)

Minimum viable product — what's needed to replace existing site and drive enrollment.

- [x] **Homepage with Hero, Values, Divisions** — Already built (HeroMasked, ValueCarousel, DivisionsTabs)
- [ ] **Navigation System** — Mega-menu with 6-8 main sections (About, Admissions, Academics, Athletics, Arts, Contact)
- [ ] **About Pages** — Mission, Values, History, Leadership (reuse StickySplitSection)
- [ ] **Admissions Pages** — Process, Requirements, Tuition, Inquiry Form
- [ ] **Academics Overview** — Curriculum by division (reuse DivisionsTabs pattern)
- [ ] **Athletics & Arts Pages** — Program listings (reuse PassionsPanel)
- [ ] **Contact Page** — Address, phone, email, map embed, inquiry form
- [ ] **Faculty Directory** — Grid of staff with photos, names, titles (basic version)
- [ ] **Footer with Sitemap** — Quick links, social, legal (expand existing FooterCtaSection)
- [ ] **Mobile Optimization** — Verify all pages work on mobile (already responsive)

**Why these are essential:**
- Navigation, About, Admissions, Contact = core information architecture
- Academics, Athletics, Arts = answer "what will my child experience?"
- Faculty Directory = builds trust ("who will teach my child?")
- Inquiry Form = primary conversion goal

### Add After Validation (v1.x)

Features to add once core is working and driving traffic.

- [ ] **Virtual Campus Tour** — Trigger: "We're getting inquiries from distant families"
- [ ] **Student/Parent Testimonials** — Trigger: "We need more social proof"
- [ ] **News/Blog Section** — Trigger: "We have content to publish regularly"
- [ ] **Event Calendar** — Trigger: "Families are asking about visit dates"
- [ ] **Alumni Success Stories** — Trigger: "We need to show long-term outcomes"
- [ ] **Downloadable Resources** — Trigger: "Admissions team has PDFs ready"
- [ ] **Photo Galleries** — Trigger: "We have professional photos from events"

### Future Consideration (v2+)

Features to defer until product-market fit is established.

- [ ] **Multi-language Support** — Why defer: Significant translation effort. Validate English site first, then assess demand
- [ ] **Interactive Program Finder** — Why defer: Nice-to-have, not essential. Build after core content is complete
- [ ] **Financial Aid Calculator** — Why defer: Requires backend or third-party service. Complex to build, uncertain ROI
- [ ] **Client-side Search** — Why defer: Only needed if site grows >50 pages. Navigation should suffice for MVP
- [ ] **Video Backgrounds** — Why defer: Already have strong hero. Video adds production cost and page weight

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Navigation System | HIGH | MEDIUM | P1 |
| Admissions Inquiry Form | HIGH | LOW | P1 |
| About Pages | HIGH | LOW | P1 |
| Admissions Process Page | HIGH | LOW | P1 |
| Academics Overview | HIGH | MEDIUM | P1 |
| Contact Page | HIGH | LOW | P1 |
| Faculty Directory | MEDIUM | MEDIUM | P1 |
| Athletics/Arts Pages | MEDIUM | LOW | P1 |
| Footer Expansion | MEDIUM | LOW | P1 |
| Virtual Campus Tour | HIGH | HIGH | P2 |
| Testimonials | HIGH | LOW | P2 |
| News/Blog | MEDIUM | MEDIUM | P2 |
| Event Calendar | MEDIUM | MEDIUM | P2 |
| Alumni Stories | MEDIUM | LOW | P2 |
| Photo Galleries | MEDIUM | MEDIUM | P2 |
| Downloadable Resources | LOW | LOW | P2 |
| Multi-language | LOW | HIGH | P3 |
| Program Finder | LOW | MEDIUM | P3 |
| Financial Aid Calculator | MEDIUM | HIGH | P3 |
| Search | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch (blocks enrollment if missing)
- P2: Should have, add when possible (enhances enrollment)
- P3: Nice to have, future consideration (marginal impact)

## Component Reuse Analysis

### Existing Homepage Components → Other Pages

| Component | Current Use | Reuse Opportunities |
|-----------|-------------|---------------------|
| **HeroMasked** | Homepage hero | Reuse on About, Admissions landing pages with different images/text |
| **ValueCarousel** | Homepage values showcase | Could adapt for "Why Choose Us" on Admissions page |
| **StickySplitSection** | Homepage accolades + mission | Perfect for About (history, leadership), Admissions (process), Academics (curriculum) |
| **PassionsPanel** | Homepage athletics/arts/academics | Reuse on dedicated Athletics, Arts, Academics pages |
| **DivisionsTabs** | Homepage divisions showcase | Reuse on Academics page for grade-level curriculum details |
| **FooterCtaSection** | Homepage footer | Expand to include sitemap links, legal, social icons |
| **WalkHeader** | Homepage navigation | Needs expansion to mega-menu for full site navigation |

### Gaps Requiring New Components

| Missing Feature | Why Existing Components Don't Fit | New Component Needed |
|-----------------|-----------------------------------|----------------------|
| **Faculty Directory** | No grid/card layout component | `FacultyGrid` - responsive grid with photo, name, title, bio modal |
| **Admissions Form** | No form component | `InquiryForm` - form with validation, submission to Formspree/Netlify |
| **Timeline/Stepper** | No sequential process component | `ProcessTimeline` - visual stepper for admissions process |
| **Content Page Layout** | No standard page template | `ContentPage` - hero + body content + sidebar CTA |
| **News Listing** | No blog/list component | `NewsList` - card grid with date, title, excerpt, "Read more" |
| **Map Embed** | No map component | `ContactMap` - Google Maps embed for Contact page |
| **Mega-Menu Navigation** | WalkHeader is simple | `MegaMenu` - dropdown with columns for complex navigation |
| **Lightbox Gallery** | Image grids exist but no lightbox | `LightboxGallery` - click to expand, prev/next navigation |

## Competitor Feature Analysis

| Feature | Walker School (Inspiration) | Typical Private School | St. Elizabeth Approach |
|---------|----------------------------|------------------------|------------------------|
| **Navigation** | 8 main sections + divisions drawer | 6-8 sections, mega-menu common | Mega-menu with 6 sections: About, Admissions, Academics, Athletics, Arts, Contact |
| **Hero** | "WE BELIEVE" with clipping mask | Large image + headline + CTA | Already implemented (HeroMasked) - keep |
| **Values Showcase** | Horizontal scroll carousel (4 values) | Static grid or accordion | Already implemented (ValueCarousel) - keep |
| **Admissions CTA** | "Inquire" + "Visit" in header, "Apply" in footer | Persistent CTA bar or header buttons | Add to mega-menu + sticky mobile CTA |
| **Faculty Directory** | Not visible on homepage | Usually dedicated page with filters | Build dedicated page, link from About |
| **Virtual Tour** | Not visible (may exist on Admission page) | 50% of schools post-2020 | Defer to P2 - assess video production capacity |
| **Testimonials** | Not visible on homepage | Often on homepage or Admissions | Add to Admissions page (P2) |
| **Calendar** | Not visible | 70% of schools have events page | Defer to P2 - use Google Calendar embed |
| **News/Blog** | Not visible on homepage | 80% of schools have news section | Defer to P2 - static markdown files |
| **Search** | Not visible | 30% of schools (mostly large) | Skip for MVP - navigation should suffice |

## Static Export Constraints & Workarounds

| Feature | Static Export Challenge | Workaround |
|---------|------------------------|------------|
| **Inquiry Form** | No server to process submissions | Use Formspree, Netlify Forms, or Google Forms embed |
| **Event Calendar** | No dynamic data fetching | Google Calendar embed (iframe) or build-time JSON generation |
| **Search** | No server-side search | Client-side search (Fuse.js) or skip entirely |
| **Live Chat** | Requires WebSocket/server | Third-party widget (Intercom, Drift) or skip |
| **User Accounts** | Requires authentication backend | Link to external portal (Google Classroom, etc.) |
| **Dynamic Content** | No CMS without server | Markdown files + rebuild on content change, or headless CMS (Sanity, Contentful) with build hooks |
| **Analytics** | No server-side tracking | Client-side analytics (Google Analytics, Plausible) |

## Accessibility Requirements (WCAG 2.1 AA)

| Requirement | Implementation | Priority |
|-------------|----------------|----------|
| **Keyboard Navigation** | All interactive elements focusable, logical tab order | P1 |
| **Color Contrast** | Text meets 4.5:1 ratio (3:1 for large text) | P1 |
| **Alt Text** | All images have descriptive alt attributes | P1 |
| **Form Labels** | All form inputs have associated labels | P1 |
| **Heading Hierarchy** | Proper h1-h6 structure (no skipping levels) | P1 |
| **Focus Indicators** | Visible focus states on all interactive elements | P1 |
| **Responsive Text** | Text scales with browser zoom (no fixed px) | P1 |
| **Skip Links** | "Skip to main content" link for screen readers | P2 |
| **ARIA Labels** | Proper ARIA attributes for complex components | P2 |
| **Video Captions** | Captions/transcripts for video content | P2 |

## Mobile-Specific Patterns

| Pattern | Why Important | Implementation |
|---------|---------------|----------------|
| **Hamburger Menu** | Standard mobile navigation | Already in WalkHeader - expand for mega-menu |
| **Sticky CTA** | Keep "Inquire" visible while scrolling | Add sticky bottom bar on mobile with primary CTA |
| **Touch-Friendly Targets** | Minimum 44x44px tap targets | Tailwind classes ensure proper sizing |
| **Reduced Animations** | Respect `prefers-reduced-motion` | Add media query to disable animations |
| **Optimized Images** | Faster load on mobile networks | Use Next.js Image component with responsive sizes |
| **Collapsible Sections** | Reduce scrolling on small screens | Use Accordion component (already exists) |
| **Click-to-Call** | Phone numbers as `tel:` links | Add to Contact page and footer |

## Sources

- Walker School website analysis (https://www.thewalkerschool.org/) - navigation structure, content patterns, CTA strategy
- Web search: education website navigation patterns, admissions forms, virtual tours, mobile design
- Static export constraints based on Next.js documentation and technical understanding
- WCAG 2.1 AA requirements from accessibility standards
- Component reuse analysis from existing codebase (D:/Users/Avinash/Documents/StElizabethWebsite/src/app/page.tsx)

---
*Feature research for: St. Elizabeth High School Pomburpa Website*
*Researched: 2026-04-27*
