# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context
- **Project**: St. Elizabeth High School Pomburpa Website
- **Location**: https://maps.app.goo.gl/gdhRyZxKZQsh9Yf47
- **Design Inspiration**: The Walker School (https://www.thewalkerschool.org/) - Rebuilt from ASP.NET to modern React.

## Architecture & Structure
This is a modern **Next.js 14+ (App Router)** site configured for static export (`output: "export"`).
- `src/app/` - Next.js routing (pages, layouts)
- `src/components/ui/` - Small reusable UI elements (buttons, cards, etc.)
- `src/components/sections/` - Large page sections (Hero, Features, Footer, etc.)
- `src/components/layout/` - Global layout elements (Header, Navigation)
- `src/lib/` - Utility functions and helpers
- `data/` - Static JSON or TypeScript data defining the site content

### Tech Stack
- **Framework**: Next.js (Static Export)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Commands
- **Run dev server**: `npm run dev`
- **Build static export**: `npm run build` (outputs to `out/` directory)
- **Lint**: `npm run lint`

## Component Guidelines
- Use React Server Components by default. Add `'use client'` only where interactivity (state, hooks, event listeners) is required.
- Use immutable data patterns and ensure proper error handling per `.claude/rules/typescript/`.
- Style using Tailwind classes instead of custom CSS.

