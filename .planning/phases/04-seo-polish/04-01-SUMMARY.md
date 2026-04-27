---
phase: 04-seo-polish
plan: 01
subsystem: seo
tags: [seo, structured-data, sitemap, robots-txt, json-ld]
dependency_graph:
  requires: []
  provides: [json-ld-schema, sitemap, robots-txt]
  affects: [search-engine-indexing, rich-snippets]
tech_stack:
  added: [schema.org-json-ld]
  patterns: [structured-data, static-seo-files]
key_files:
  created:
    - public/sitemap.xml
    - public/robots.txt
  modified:
    - src/app/layout.tsx
decisions:
  - title: JSON-LD placement in body
    rationale: Next.js metadata API doesn't support JSON-LD directly, so script tag placed in body using dangerouslySetInnerHTML
  - title: Static sitemap.xml
    rationale: Site has fixed page structure, static XML file is simpler than dynamic generation
  - title: Placeholder contact values
    rationale: Real phone, email, and social media URLs need to be provided by school administration
metrics:
  duration_seconds: 250
  tasks_completed: 3
  files_created: 2
  files_modified: 1
  commits: 1
  completed_date: 2026-04-27
---

# Phase 04 Plan 01: SEO Infrastructure Summary

**One-liner:** Added JSON-LD structured data with EducationalOrganization + LocalBusiness schemas, static sitemap.xml with 7 public pages, and robots.txt allowing all crawlers.

## What Was Built

Implemented complete SEO infrastructure for search engine discovery and rich results:

1. **JSON-LD Structured Data** - Added schema.org markup to layout.tsx combining EducationalOrganization, HighSchool, and LocalBusiness types with school details (name, address, geo coordinates, contact info, founding date)

2. **Static Sitemap** - Created sitemap.xml listing all 7 public pages (/, /about, /academics, /admissions, /athletics, /arts, /contact) with priority values and lastmod dates

3. **Robots.txt** - Created robots.txt allowing all search engine crawlers with sitemap reference

## Tasks Completed

| Task | Description | Commit | Files |
|------|-------------|--------|-------|
| 1 | Add JSON-LD structured data to layout | 589df37 | src/app/layout.tsx |
| 2 | Create static sitemap.xml | 589df37 | public/sitemap.xml |
| 3 | Create robots.txt | 589df37 | public/robots.txt |

## Deviations from Plan

None - plan executed exactly as written.

## Technical Implementation

### JSON-LD Schema
- Combined three schema.org types: EducationalOrganization, HighSchool, LocalBusiness
- Included complete postal address with Indian country code (IN)
- Added geo coordinates for Google Maps integration
- Included founding date (1985) and price range indicator
- Placeholder values for telephone (+91-832-XXXXXXX), email, and social media URLs marked with TODO comment

### Sitemap Structure
- Standard XML sitemap format (sitemap.org schema 0.9)
- Priority values: homepage (1.0), admissions/contact (0.9), about/academics (0.8), athletics/arts (0.7)
- All pages set to lastmod 2026-04-27 (current date)
- Full HTTPS URLs with stelizabethhighschool.edu.in domain

### Robots.txt
- Allows all user agents (User-agent: *)
- Permits crawling of all paths (Allow: /)
- References sitemap.xml for efficient page discovery

## Verification Results

All verification checks passed:

- ✓ `npm run build` succeeded without errors
- ✓ `out/index.html` contains JSON-LD script tag with application/ld+json type
- ✓ `out/sitemap.xml` exists (copied from public/)
- ✓ `out/robots.txt` exists (copied from public/)
- ✓ JSON-LD includes EducationalOrganization schema type
- ✓ Sitemap contains all 7 public pages with valid XML structure
- ✓ Robots.txt allows crawler access and references sitemap

## Known Stubs

The following placeholder values need to be updated with real information:

| Stub | File | Line | Reason |
|------|------|------|--------|
| `telephone: "+91-832-XXXXXXX"` | src/app/layout.tsx | ~83 | Awaiting actual school phone number |
| `email: "info@stelizabethhighschool.edu.in"` | src/app/layout.tsx | ~84 | Awaiting confirmation of actual email address |
| `sameAs` social media URLs | src/app/layout.tsx | ~98-101 | Awaiting actual Facebook and Instagram page URLs |

TODO comment added in layout.tsx noting these values need user configuration.

## Next Steps

1. **Update contact information** - Replace placeholder phone, email, and social media URLs with actual values
2. **Validate structured data** - Test JSON-LD at https://validator.schema.org/ after deployment
3. **Submit sitemap** - Submit sitemap.xml to Google Search Console and Bing Webmaster Tools
4. **Monitor rich results** - Check Google Search Console for rich snippet eligibility after indexing

## Self-Check: PASSED

- ✓ Created files exist: public/sitemap.xml, public/robots.txt
- ✓ Modified file exists: src/app/layout.tsx
- ✓ Commit exists: 589df37
- ✓ Build output contains all SEO files
- ✓ JSON-LD script tag present in static HTML
