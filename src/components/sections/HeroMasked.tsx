'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';

declare global {
  interface WindowEventMap {
    'horizontal-scroll-hero': CustomEvent<{ progress: number }>;
  }
}

/**
 * Walker "WE BELIEVE" Hero Section — Masking Engine (SOP-001).
 *
 * The defining Walker effect: video is visible ONLY through the letters of
 * "WE BELIEVE." The surrounding area is a solid wall. As horizontal scroll
 * progresses, the text zooms from enormous (fills screen) down to readable size
 * while the solid wall fades to reveal itself.
 *
 * Implementation: SVG mask on a white rectangle overlaid on the background.
 * The mask exposes the video only where the text letter shapes are.
 *
 * IMPORTANT: This component is used INSIDE HomepageHorizontalScroll which already
 * has a ScrollTrigger with pin: true. We cannot have a nested pin — it silently fails.
 * SOLUTION: Instead of a separate ScrollTrigger, we use a progress-based animation
 * driven by a custom event dispatched from the parent's horizontal scroll handler.
 * The animation fires when horizontal-scroll-hero fires (first ~12% of horizontal travel).
 */
export function HeroMasked({ heroImage = '/images/videocover2-812-optimized.webp' }: { heroImage?: string }) {
  const maskGroupRef = useRef<SVGGElement>(null);
  const wallRef = useRef<SVGRectElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const heroTl = gsap.timeline({ paused: true });

    // Zoom "WE BELIEVE" from enormous (scale 60x) down to readable (scale 1x)
    // The wall fades from white to dark as the text zooms out
    heroTl
      .fromTo(
        maskGroupRef.current,
        { scale: 60, transformOrigin: '50% 50%' },
        { scale: 1, ease: 'power2.out', duration: 1 }
      )
      .to(
        wallRef.current,
        { fill: 'rgba(0,0,0,0.55)', ease: 'power1.in', duration: 1 },
        0
      );

    const handleHeroScroll = (e: WindowEventMap['horizontal-scroll-hero']) => {
      if (hasAnimatedRef.current) return;

      const progress = e.detail.progress;

      // Fire animation during first ~12% of horizontal scroll
      // Progress 0 → 0.12 maps to animation 0 → 1
      if (progress <= 0.12) {
        const t = progress / 0.12;
        heroTl.progress(t);

        if (progress >= 0.12) {
          hasAnimatedRef.current = true;
        }
      }
    };

    window.addEventListener('horizontal-scroll-hero', handleHeroScroll);

    return () => {
      window.removeEventListener('horizontal-scroll-hero', handleHeroScroll);
      heroTl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--color-text-dark)',
      }}
    >
      {/* ── 1. Background Image / Video ───────────────────────────────── */}
      <img
        src={heroImage}
        alt="St. Elizabeth High School campus"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />

      {/* ── 2. SVG Mask Overlay ───────────────────────────────────────────
          Mask logic (SVG spec):
            - White pixels in mask = visible
            - Black pixels in mask = hidden (transparent)
          1. Fill entire mask canvas with WHITE → everything visible
          2. Draw text in BLACK → cuts holes through the white
          3. Apply mask to white wall rectangle
          Result: only the letter shapes reveal the background video.
      ─────────────────────────────────────────────────────────────────── */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1 }}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <mask id="hero-text-mask">
            {/* Step 1: Fill entire mask with white — everything visible */}
            <rect width="100" height="100" fill="white" />

            {/* Step 2: Text in BLACK cuts holes in the mask */}
            <g ref={maskGroupRef}>
              <text
                x="50"
                y="54"
                textAnchor="middle"
                dominantBaseline="middle"
                fill="black"
                style={{
                  fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                  fontWeight: 900,
                  fontSize: '13.5',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                }}
              >
                We Believe
              </text>
            </g>
          </mask>
        </defs>

        {/* Step 3: White wall rectangle masked by the text mask
            The masked rect only shows where the mask is white (inside letters).
            So only the letter shapes reveal the background video. */}
        <rect
          ref={wallRef}
          width="100"
          height="100"
          fill="rgba(255,255,255,1)"
          mask="url(#hero-text-mask)"
        />
      </svg>

      {/* ── 3. Mission Block — bottom-left, clamp-based breathing room ─── */}
      <div className="hero-mission-block hero-mission-safe-bottom" style={{ zIndex: 2, maxWidth: 380 }}>
        <p className="text-overline" style={{ marginBottom: 10 }}>
          St. Elizabeth High School
        </p>
        <p className="text-body-lg" style={{ maxWidth: 320, color: 'rgba(255,255,255,0.85)' }}>
          Nurturing minds, hearts, and spirits through faith, excellence, and service since 1967.
        </p>
      </div>
    </section>
  );
}