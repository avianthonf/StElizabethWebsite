# External Integrations

**Analysis Date:** 2026-04-27

## APIs & External Services

**None detected:**
- No external API integrations found in source code
- No SDK/client libraries for third-party services in dependencies
- Static site with no backend API calls

## Data Storage

**Databases:**
- None - Static site with no database connections

**File Storage:**
- Local filesystem only - Static assets served from `public/` directory
- Images configured as unoptimized in `next.config.ts` for static export compatibility

**Caching:**
- None - No Redis, Memcached, or other caching services detected

## Authentication & Identity

**Auth Provider:**
- None - No authentication system detected
- No auth libraries (NextAuth, Clerk, Auth0, Firebase Auth, Supabase Auth) in dependencies

## Monitoring & Observability

**Error Tracking:**
- None - No Sentry, Bugsnag, or error tracking services detected

**Analytics:**
- None - No Google Analytics, Plausible, or analytics services detected in source code

**Logs:**
- Browser console only - No structured logging service integration

## CI/CD & Deployment

**Hosting:**
- Not specified in codebase - Static export compatible with any static host (Vercel, Netlify, GitHub Pages, etc.)

**CI Pipeline:**
- None - No GitHub Actions, GitLab CI, or CI configuration files detected

## Environment Configuration

**Required env vars:**
- None - No environment variables required for build or runtime

**Secrets location:**
- Not applicable - No secrets or API keys needed for static site

## Webhooks & Callbacks

**Incoming:**
- None - Static site cannot receive webhooks

**Outgoing:**
- None - No webhook integrations detected

## CDN & External Resources

**Content Delivery:**
- No external CDN configuration detected
- Static assets served from local build output (`out/` directory)

**External Scripts:**
- Reference HTML files (`walker-*.html`) contain external links but are design inspiration only, not part of the build

**Fonts:**
- Not detected - Font loading strategy not identified in initial scan

---

*Integration audit: 2026-04-27*
