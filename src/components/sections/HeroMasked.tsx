'use client';

import { useRef } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';

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
 * Uses Framer Motion's useTransform to map scroll progress to animation values.
 */
export function HeroMasked({
  heroImage = '/images/videocover2-812-optimized.webp',
  scrollYProgress
}: {
  heroImage?: string;
  scrollYProgress?: MotionValue<number>;
}) {
  const maskGroupRef = useRef<SVGGElement>(null);
  const wallRef = useRef<SVGRectElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);

  // Hero animates during first 18% of scroll
  const heroProgressEnd = 0.18;

  const maskScale = useTransform(
    scrollYProgress || new MotionValue(0),
    [0, heroProgressEnd],
    [60, 1]
  );

  const wallOpacity = useTransform(
    scrollYProgress || new MotionValue(0),
    [0, heroProgressEnd * 0.62, heroProgressEnd],
    [0, 0.68, 0]
  );

  const missionOpacity = useTransform(
    scrollYProgress || new MotionValue(0),
    [0, heroProgressEnd * 0.72, heroProgressEnd],
    [0, 0, 1]
  );

  return (
    <section
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
            <motion.g
              ref={maskGroupRef}
              style={{
                scale: maskScale,
                transformOrigin: '50% 50%'
              }}
            >
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
            </motion.g>
          </mask>
        </defs>

        {/* Step 3: White wall rectangle masked by the text mask
            The masked rect only shows where the mask is white (inside letters).
            So only the letter shapes reveal the background video. */}
        <motion.rect
          ref={wallRef}
          width="100"
          height="100"
          fill="rgba(255,255,255,1)"
          mask="url(#hero-text-mask)"
          style={{ opacity: wallOpacity }}
        />
      </svg>

      {/* ── 3. Mission Block — bottom-left, clamp-based breathing room ─── */}
      <motion.div
        ref={missionRef}
        className="hero-mission-block hero-mission-safe-bottom"
        style={{ zIndex: 2, maxWidth: 380, opacity: missionOpacity }}
      >
        <p className="text-overline" style={{ marginBottom: 10 }}>
          St. Elizabeth High School
        </p>
        <p className="text-body-lg" style={{ maxWidth: 320, color: 'rgba(255,255,255,0.85)' }}>
          Nurturing minds, hearts, and spirits through faith, excellence, and service since 1967.
        </p>
      </motion.div>
    </section>
  );
}