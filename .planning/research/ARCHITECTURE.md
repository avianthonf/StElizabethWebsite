# Architecture Research

**Domain:** School/Education Marketing Website
**Researched:** 2026-04-27
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     PRESENTATION LAYER                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐        │
│  │ Layout  │  │ Sections│  │   UI    │  │  Pages  │        │
│  │ (Header)│  │ (Hero)  │  │(Button) │  │ (Home)  │        │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘        │
│       │            │            │            │              │
├───────┴────────────┴────────────┴────────────┴──────────────┤
│                      DATA LAYER                              │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Content Source (Git-based CMS / Headless CMS)      │    │
│  │  - Static JSON/MDX files                            │    │
│  │  - Build-time data fetching                         │    │
│  │  - Type-safe content models                         │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│                    BUILD/DEPLOY LAYER                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                   │
│  │ Next.js  │  │   CDN    │  │ Webhooks │                   │
│  │  Build   │  │(Vercel/  │  │(Rebuild) │                   │
│  │          │  │Netlify)  │  │          │                   │
│  └──────────┘  └──────────┘  └──────────┘                   │
└─────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| **Layout Components** | Global structure (header, footer, navigation) | WalkHeader (ghost nav), Footer with mega-menu |
| **Section Components** | Large page blocks (hero, features, CTA) | HeroMasked, ValueCarousel, StickySplitSection, DivisionsTabs |
| **UI Components** | Reusable primitives (buttons, cards, accordions) | Button, Accordion, Carousel |
| **Page Templates** | Full page compositions | Home (landing), ContentPage (text-heavy), ListingPage (news/events) |
| **Content Models** | Type-safe data structures | Event, NewsArticle, FacultyMember, Program |
| **Data Fetchers** | Build-time content loading | getStaticProps, file system reads, CMS API calls |

## Recommended Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout (fonts, metadata)
│   ├── page.tsx            # Home page
│   ├── about/              # About section pages
│   ├── admission/          # Admission funnel pages
│   ├── academics/          # Academic program pages
│   ├── athletics/          # Athletics pages
│   ├── news/               # News listing + detail pages
│   └── events/             # Events calendar + detail pages
├── components/
│   ├── layout/             # Global layout components
│   │   ├── Header.tsx      # Site header (WalkHeader)
│   │   ├── Footer.tsx      # Site footer
│   │   └── Navigation.tsx  # Mega-menu navigation
│   ├── sections/           # Large page sections (organisms)
│   │   ├── HeroMasked.tsx
│   │   ├── ValueCarousel.tsx
│   │   ├── StickySplitSection.tsx
│   │   ├── DivisionsTabs.tsx
│   │   ├── FooterCtaSection.tsx
│   │   ├── FacultyGrid.tsx
│   │   ├── EventsCalendar.tsx
│   │   └── NewsListing.tsx
│   ├── ui/                 # Reusable UI primitives (atoms/molecules)
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Accordion.tsx
│   │   ├── Carousel.tsx
│   │   └── Modal.tsx
│   └── templates/          # Page templates (optional)
│       ├── LandingPage.tsx
│       ├── ContentPage.tsx
│       └── ListingPage.tsx
├── lib/
│   ├── content/            # Content fetching utilities
│   │   ├── get-news.ts
│   │   ├── get-events.ts
│   │   └── get-faculty.ts
│   ├── hooks/              # Custom React hooks
│   ├── utils.ts            # Utility functions
│   └── site-navigation.ts  # Navigation data structure
├── data/                   # Static content (if using Git-based CMS)
│   ├── news/               # News articles (MDX/JSON)
│   ├── events/             # Events (JSON)
│   ├── faculty/            # Faculty profiles (JSON)
│   └── programs/           # Academic programs (MDX)
├── types/                  # TypeScript type definitions
│   ├── content.ts          # Content model types
│   └── navigation.ts       # Navigation types
└── public/
    ├── images/             # Static images
    └── documents/          # PDFs, forms, etc.
```

### Structure Rationale

- **app/:** Next.js App Router provides file-based routing. Each folder = route segment. Mirrors site navigation structure for clarity.
- **components/layout/:** Global components used across all pages. Separated from sections because they're structural, not content.
- **components/sections/:** Large, reusable page blocks. These are "organisms" in atomic design—composed of multiple UI components.
- **components/ui/:** Small, reusable primitives. These are "atoms" and "molecules"—buttons, cards, inputs.
- **data/:** Static content files (if using Git-based CMS). Organized by content type for easy editing.
- **lib/content/:** Content fetching logic. Abstracts data source (file system, CMS API) from components.

## Architectural Patterns

### Pattern 1: Hybrid Static + Dynamic Islands

**What:** Core pages are statically generated at build time. Frequently updated content (events calendar, news feed) is fetched client-side from external APIs or services.

**When to use:** 
- Static export requirement (no server-side rendering)
- Content has mixed update frequencies (core pages change rarely, events/news change daily)
- Need instant content updates without full site rebuilds

**Trade-offs:**
- **Pros:** Fast static pages, instant content updates, no rebuild bottleneck, leverages existing tools (Google Calendar, WordPress)
- **Cons:** SEO challenges (dynamic content not in initial HTML), performance hit from client-side fetching, dependency on external service uptime

**Example:**
```typescript
// Static page shell
export default function EventsPage() {
  return (
    <>
      <PageHeader title="Upcoming Events" />
      <EventsCalendar /> {/* Client-side fetch */}
    </>
  );
}

// Client-side data fetching
'use client';
export function EventsCalendar() {
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    fetch('/api/events') // or Google Calendar API
      .then(res => res.json())
      .then(setEvents);
  }, []);
  
  return <EventsList events={events} />;
}
```

### Pattern 2: Git-based CMS + Build-time Generation

**What:** Content stored as JSON/MDX files in the repository. Git-based CMS (TinaCMS, Decap CMS) provides a GUI for editing. Changes trigger static site rebuilds.

**When to use:**
- Small to medium content volume (<1000 pages)
- Content updates are infrequent (weekly, not hourly)
- Team comfortable with Git workflows
- Budget constraints (free hosting)

**Trade-offs:**
- **Pros:** Content versioned in Git (audit trail, rollback), no external CMS costs, type safety from data to component, works perfectly with static export
- **Cons:** Build time increases with content volume, no instant publish (requires rebuild), Git-based CMS UI can be clunky, image management more complex

**Example:**
```typescript
// Content file: data/news/2026-04-spring-concert.json
{
  "title": "Spring Concert 2026",
  "date": "2026-05-15",
  "author": "Music Department",
  "body": "Join us for our annual spring concert...",
  "image": "/images/spring-concert-2026.jpg"
}

// Build-time data fetching
import fs from 'fs';
import path from 'path';

export async function getNewsArticles(): Promise<NewsArticle[]> {
  const newsDir = path.join(process.cwd(), 'data/news');
  const files = fs.readdirSync(newsDir);
  
  return files.map(file => {
    const content = fs.readFileSync(path.join(newsDir, file), 'utf-8');
    return JSON.parse(content);
  });
}

// Page component
export default async function NewsPage() {
  const articles = await getNewsArticles();
  return <NewsListing articles={articles} />;
}
```

### Pattern 3: Headless CMS + Build-time Fetch

**What:** Content managed in a headless CMS (Sanity, Contentful, Strapi). Next.js fetches data at build time via CMS API and generates static pages. Webhooks trigger rebuilds on content changes.

**When to use:**
- Large content volume (>1000 pages)
- Multiple non-technical content editors
- Need rich media management (image CDN, transformations)
- Budget allows for CMS hosting costs

**Trade-offs:**
- **Pros:** Best-in-class editing experience, rich media management, preview modes, scales to large content volumes, separation of concerns
- **Cons:** External dependency (CMS uptime, API limits), potential costs (pricing tiers), more complex setup, vendor lock-in risk

**Example:**
```typescript
// Sanity client configuration
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Use CDN for production
});

// Build-time data fetching
export async function getNewsArticles(): Promise<NewsArticle[]> {
  return client.fetch(`
    *[_type == "newsArticle"] | order(publishedAt desc) {
      title,
      slug,
      publishedAt,
      author->{name},
      body,
      "imageUrl": mainImage.asset->url
    }
  `);
}

// Webhook endpoint to trigger rebuild (Vercel/Netlify)
// POST /api/rebuild?secret=xxx
```

### Pattern 4: Component Composition (Atomic Design)

**What:** Components organized in layers: atoms (Button, Input) → molecules (SearchBar, Card) → organisms (Header, Hero) → templates (LandingPage) → pages (Home).

**When to use:** Always. This is the standard React component architecture pattern.

**Trade-offs:**
- **Pros:** Reusability, consistency, easier testing, clear boundaries, scalable
- **Cons:** Can feel over-engineered for small sites, requires discipline to maintain boundaries

**Example:**
```typescript
// Atom: Button
export function Button({ children, ...props }: ButtonProps) {
  return <button className="btn" {...props}>{children}</button>;
}

// Molecule: Card
export function Card({ title, body, image }: CardProps) {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3>{title}</h3>
      <p>{body}</p>
      <Button>Learn More</Button>
    </div>
  );
}

// Organism: FacultyGrid
export function FacultyGrid({ faculty }: FacultyGridProps) {
  return (
    <section className="faculty-grid">
      <h2>Our Faculty</h2>
      <div className="grid">
        {faculty.map(member => (
          <Card
            key={member.id}
            title={member.name}
            body={member.bio}
            image={member.photo}
          />
        ))}
      </div>
    </section>
  );
}

// Page: Faculty page
export default function FacultyPage({ faculty }: FacultyPageProps) {
  return (
    <>
      <PageHeader title="Our Faculty" />
      <FacultyGrid faculty={faculty} />
    </>
  );
}
```

## Data Flow

### Request Flow (Static Export)

```
[Build Time]
    ↓
[Content Source] → [Data Fetcher] → [Next.js Build] → [Static HTML/CSS/JS]
    ↓                                                          ↓
[Git/CMS]                                                  [CDN (Vercel/Netlify)]
                                                               ↓
                                                          [User Browser]
```

### Content Update Flow

```
[Editor Updates Content]
    ↓
[Git Commit / CMS Webhook]
    ↓
[Trigger Rebuild]
    ↓
[Next.js Build Process]
    ↓
[Deploy to CDN]
    ↓
[Updated Site Live]
```

### Key Data Flows

1. **Build-time content fetching:** Content source (files/CMS) → Data fetcher → Next.js build → Static pages
2. **Client-side dynamic content:** User loads page → Client-side fetch → External API (Google Calendar, WordPress) → Render dynamic content
3. **Navigation data:** site-navigation.ts → Header component → Mega-menu rendering
4. **Image optimization:** public/images/ → Next.js Image component → Optimized delivery (note: static export requires `unoptimized: true`)

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-100 pages | Git-based CMS (TinaCMS/Decap), static JSON/MDX files, single build pipeline |
| 100-500 pages | Consider headless CMS (Sanity/Contentful), implement incremental builds, add image CDN (Cloudinary) |
| 500+ pages | Headless CMS required, split content types into separate build pipelines, implement preview modes, consider ISR if moving away from static export |

### Scaling Priorities

1. **First bottleneck:** Build time (>10 minutes). Fix: Incremental builds, split content types, optimize image processing.
2. **Second bottleneck:** Content editor experience (slow CMS UI, complex workflows). Fix: Upgrade to headless CMS with better UX, implement preview modes.
3. **Third bottleneck:** Image delivery (large file sizes, slow load times). Fix: Image CDN (Cloudinary, Imgix), WebP/AVIF formats, lazy loading.

## Anti-Patterns

### Anti-Pattern 1: Mixing Static and Server-Side Rendering

**What people do:** Try to use server-side rendering (SSR) or API routes in a static export project.

**Why it's wrong:** Next.js static export (`output: "export"`) doesn't support SSR, API routes, or ISR. Attempting to use these features will cause build failures.

**Do this instead:** Use client-side data fetching for dynamic content, or move to a custom server deployment if SSR is required.

### Anti-Pattern 2: Hardcoding Content in Components

**What people do:** Put all content (text, images, links) directly in component files.

**Why it's wrong:** Makes content updates require code changes, prevents non-technical editors from updating content, creates merge conflicts.

**Do this instead:** Separate content from presentation. Store content in JSON/MDX files or a CMS, fetch at build time, pass as props to components.

```typescript
// WRONG: Hardcoded content
export function Hero() {
  return (
    <section>
      <h1>Welcome to St. Elizabeth High School</h1>
      <p>Nurturing minds, hearts, and spirits since 1967.</p>
    </section>
  );
}

// CORRECT: Content as props
export function Hero({ heading, body }: HeroProps) {
  return (
    <section>
      <h1>{heading}</h1>
      <p>{body}</p>
    </section>
  );
}
```

### Anti-Pattern 3: Deep Component Nesting

**What people do:** Create deeply nested component hierarchies (>5 levels) with props drilling through every level.

**Why it's wrong:** Makes components hard to understand, test, and refactor. Props drilling creates tight coupling.

**Do this instead:** Use composition, context API for shared state, or flatten the hierarchy by extracting intermediate components.

### Anti-Pattern 4: Ignoring Performance Budgets

**What people do:** Add large hero videos, unoptimized images, heavy JavaScript libraries without measuring impact.

**Why it's wrong:** School sites are often accessed on mobile devices with slow connections. Poor performance hurts SEO and user experience.

**Do this instead:** Set performance budgets (LCP <2.5s, FID <100ms, CLS <0.1), optimize images (WebP, lazy loading), use video posters, measure with Lighthouse.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| **Google Calendar** | Client-side fetch via Google Calendar API | For events calendar. Requires API key. Free tier sufficient for most schools. |
| **WordPress (Headless)** | Build-time fetch via WordPress REST API | If school already uses WordPress. Fetch posts/pages at build time. |
| **Sanity/Contentful** | Build-time fetch via CMS SDK | For rich content management. Webhook triggers rebuild on content change. |
| **Cloudinary/Imgix** | Image CDN for optimized delivery | For image optimization. Replace local images with CDN URLs. |
| **Google Forms** | Embed via iframe or link | For admissions inquiries, contact forms. No backend required. |
| **Payment Gateway** | External link to payment portal | For tuition payments. Don't build payment processing in-house. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| **Components ↔ Data Layer** | Props (build-time) or fetch (client-side) | Components receive data as props (static) or fetch client-side (dynamic). |
| **Pages ↔ Sections** | Props | Pages compose sections, passing content as props. |
| **Sections ↔ UI Components** | Props | Sections compose UI components, passing data and handlers. |
| **Content Source ↔ Build** | File system reads or API calls | Build process fetches content from files or CMS API. |

## Page Template Patterns

### Landing Page (Home)

**Structure:**
- Hero section (full-screen, video/image background)
- Value proposition (3-4 key benefits)
- Social proof (awards, testimonials, rankings)
- Divisions/Programs showcase (tabbed or grid)
- News/Events preview (latest 3-4 items)
- CTA section (schedule visit, apply now)

**Existing components:** HeroMasked, ValueCarousel, StickySplitSection, DivisionsTabs, FooterCtaSection

### Content Page (About, Academics, etc.)

**Structure:**
- Page header (title, breadcrumbs, hero image)
- Body content (rich text, images, videos)
- Sidebar (quick links, related pages, contact info)
- CTA section (schedule visit, contact admissions)

**New components needed:** PageHeader, RichTextContent, Sidebar, Breadcrumbs

### Listing Page (News, Events, Faculty)

**Structure:**
- Page header (title, search/filter controls)
- Grid/list of items (cards with image, title, excerpt, date)
- Pagination or infinite scroll
- Sidebar (categories, tags, archive)

**New components needed:** ListingGrid, FilterControls, Pagination, CategorySidebar

### Detail Page (News Article, Event, Faculty Profile)

**Structure:**
- Hero section (title, date, author, featured image)
- Body content (rich text, images, videos)
- Metadata (categories, tags, related items)
- CTA section (back to listing, related items)

**New components needed:** ArticleHeader, ArticleBody, RelatedItems

## SEO Architecture

### Structured Data (Schema.org)

**Required schemas for school sites:**

1. **LocalBusiness / EducationalOrganization:**
```json
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "St. Elizabeth High School",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 School St",
    "addressLocality": "Pomburpa",
    "addressRegion": "State",
    "postalCode": "12345"
  },
  "telephone": "+1-555-555-5555",
  "url": "https://stelizabeth.edu"
}
```

2. **BreadcrumbList:** For navigation breadcrumbs on all pages
3. **FAQPage:** For FAQ sections (admissions, general info)
4. **Event:** For events calendar items
5. **NewsArticle:** For news/blog posts

### URL Structure

**Best practices:**
- `/about/` — About section landing
- `/about/mission/` — Specific about page
- `/admission/` — Admissions landing
- `/admission/apply/` — Application page
- `/news/` — News listing
- `/news/2026/spring-concert/` — News article (year + slug)
- `/events/` — Events listing
- `/events/2026-05-15-spring-concert/` — Event detail (date + slug)

**Rationale:** Hierarchical URLs improve SEO, user understanding, and breadcrumb generation.

### Performance Patterns

**LCP Optimization (Largest Contentful Paint):**
- Hero images: Use WebP format, optimize to <200KB, lazy load below-the-fold images
- Hero videos: Use poster image, lazy load video, consider replacing with image on mobile
- Fonts: Preload critical fonts, use `font-display: swap`

**Image CDN:**
- Use Cloudinary or Imgix for automatic format conversion (WebP/AVIF), resizing, compression
- Replace local images with CDN URLs: `https://res.cloudinary.com/school/image/upload/w_800,f_auto,q_auto/hero.jpg`

**Build-time Optimization:**
- Generate responsive image sizes at build time
- Inline critical CSS for above-the-fold content
- Code splitting: Lazy load non-critical components

## CMS Decision Matrix

| Criteria | Git-based (TinaCMS) | Headless (Sanity) | WordPress Headless |
|----------|---------------------|-------------------|-------------------|
| **Cost** | Free | Free tier (3 users), $99/mo for 10 users | Free (self-hosted) or $25/mo (managed) |
| **Ease of Use** | Medium (Git concepts) | High (intuitive UI) | High (familiar to many) |
| **Setup Complexity** | Low | Medium | Medium |
| **Content Editors** | 1-3 | 3-10+ | Unlimited |
| **Media Management** | Basic (commit images) | Excellent (CDN, transforms) | Good (media library) |
| **Preview Mode** | Yes (TinaCMS) | Yes (built-in) | Yes (with plugin) |
| **Vendor Lock-in** | None (files in repo) | Medium (Sanity-specific) | Low (standard WordPress) |
| **Build Time** | Fast (<5 min for <100 pages) | Fast (API fetch) | Medium (REST API can be slow) |
| **Best For** | Small sites, technical teams | Medium-large sites, non-technical editors | Schools already using WordPress |

**Recommendation for St. Elizabeth:**
- **Start with Git-based CMS (TinaCMS)** if content volume is <100 pages and 1-3 editors
- **Upgrade to Sanity** if content volume grows >100 pages or need >3 editors
- **Use WordPress Headless** if school already has WordPress and wants to keep existing content

## Existing Component Integration

**Current components map to architectural layers:**

| Component | Layer | Purpose | Integration Notes |
|-----------|-------|---------|-------------------|
| **WalkHeader** | Layout | Global navigation with ghost nav behavior | Already integrated, works across all pages |
| **HeroMasked** | Section (Organism) | Landing page hero with SVG clip-path | Reusable for other landing pages with different images/text |
| **ValueCarousel** | Section (Organism) | Horizontal scroll showcase | Reusable for any carousel content (values, programs, testimonials) |
| **StickySplitSection** | Section (Organism) | 45:55 sticky split with accordion | Reusable for about pages, program pages, mission pages |
| **DivisionsTabs** | Section (Organism) | Tabbed showcase for divisions/programs | Reusable for any tabbed content (programs, services, offerings) |
| **FooterCtaSection** | Section (Organism) | Full-width CTA with background image | Reusable for all pages as final CTA |
| **Button** | UI (Atom) | Reusable button component | Use across all sections and pages |
| **Accordion** | UI (Molecule) | Collapsible content | Used in StickySplitSection, reusable for FAQs |

**Extension strategy:**
1. **Create page templates** that compose existing sections (LandingPage, ContentPage, ListingPage)
2. **Add new sections** for missing content types (FacultyGrid, EventsCalendar, NewsListing)
3. **Extract UI components** from existing sections (Card, Modal, SearchBar)
4. **Implement data layer** (content fetching utilities, type definitions)

## Sources

- Next.js Static Export Documentation (Context7: /vercel/next.js)
- Atomic Design Methodology (Brad Frost)
- School Website Best Practices (WebSearch: school website architecture patterns 2026)
- Headless CMS Comparison (WebSearch: headless CMS comparison schools education 2026)
- SEO Structured Data (Google Search Central: structured data for education)
- Performance Optimization (Web.dev: Core Web Vitals)

---
*Architecture research for: St. Elizabeth High School Website*
*Researched: 2026-04-27*
