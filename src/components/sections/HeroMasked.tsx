'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

/**
 * "WE BELIEVE" Hero Section — Masking Engine.
 *
 * The defining Walker effect: background is visible ONLY through the letters
 * of "WE BELIEVE." The surrounding area is a solid wall. As vertical scroll
 * progresses, the text zooms from enormous (fills screen) down to readable size
 * while the wall fades away to reveal the full hero image.
 *
 * Implementation: SVG mask on a white rectangle overlaid on the background.
 * The mask exposes the hero image only where the text letter shapes are.
 *
 * Vertical scroll adaptation: the timeline is scrubbed by a ScrollTrigger
 * attached to the hero section itself, so the reveal plays as the hero
 * section scrolls through the viewport in normal vertical document flow.
 */
export function HeroMasked({ heroImage = '/images/videocover2-812-optimized.webp' }: { heroImage?: string }) {
  const maskGroupRef = useRef<SVGGElement>(null);
  const wallRef = useRef<SVGRectElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (prefersReducedMotion) {
      gsap.set(maskGroupRef.current, { scale: 1, transformOrigin: '50% 50%' });
      gsap.set(wallRef.current, { fill: 'rgba(0,0,0,0)', opacity: 0 });
      gsap.set(missionRef.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(missionRef.current, { opacity: 0, y: 18 });

    const heroTl = gsap.timeline({
      paused: true,
      defaults: { ease: 'none' },
    });

    // Zoom "WE BELIEVE" from enormous (scale 60x) down to readable (scale 1x)
    // The wall deepens briefly, then clears away to fully reveal the scene.
    heroTl
      .fromTo(
        maskGroupRef.current,
        { scale: 60, transformOrigin: '50% 50%' },
        { scale: 1, ease: 'power2.out', duration: 1 }
      )
      .to(
        wallRef.current,
        { fill: 'rgba(0,0,0,0.68)', ease: 'power1.in', duration: 0.62 },
        0
      )
      .to(
        wallRef.current,
        { opacity: 0, ease: 'power2.out', duration: 0.38 },
        0.62
      )
      .to(
        missionRef.current,
        { opacity: 1, y: 0, ease: 'power2.out', duration: 0.32 },
        0.72
      );

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.2,
      invalidateOnRefresh: true,
      animation: heroTl,
    });

    return () => {
      scrollTriggerInstance.kill();
      heroTl.kill();
    };
  }, [prefersReducedMotion]);

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
      <Image
        src={heroImage}
        alt="St. Elizabeth High School campus"
        aria-hidden="true"
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
          filter: 'brightness(0.9) saturate(0.98)',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.18) 100%)',
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
      <div ref={missionRef} className="hero-mission-block hero-mission-safe-bottom" style={{ zIndex: 2, maxWidth: 380 }}>
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