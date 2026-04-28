---
name: Design System Refactor Milestone
type: project
description: Comprehensive design system enforcement and technical debt cleanup for St. Elizabeth website
---

## Project Overview

**Goal**: Systemic refactor to enforce design tokens, clean up dead code, fix accessibility issues, and align implementation with architecture

**Why**: Initial hero/header fixes revealed deeper systemic issues:
- Design tokens defined (CSS custom properties) but not enforced
- Dead/unused components and data structures throughout codebase
- Horizontal scroll-jacking breaks mobile/accessibility
- Template contamination (navigation structure mismatches actual school)
- Hardcoded values bypass token system
- Broken animations (accordion, font inheritance)

**Timeline**: Multi-phase implementation starting with critical fixes

## Phase 1: Critical Fixes (Current)
- [ ] Enforce design token system (replace hex codes with CSS variables)
- [ ] Clean dead code (unused components, homepage-data.ts)
- [ ] Fix mobile responsiveness for "We Value" section
- [ ] Fix template alignment (navigation, footer)

## Phase 2: UX Improvements
- [ ] Replace horizontal scroll-jacking with vertical layout
- [ ] Fix broken animations
- [ ] Improve mobile touch interactions

## Phase 3: Polish
- [ ] Cross-browser testing
- [ ] Performance optimization
- [ ] Accessibility audit