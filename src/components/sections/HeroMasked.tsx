'use client';

import { useRef } from 'react';
import { useClipMask } from '@/lib/hooks/useClipMask';

interface HeroMaskedProps {
  heroImage?: string;
}

/**
 * Walker "WE BELIEVE" Hero Section
 *
 * Architecture (SOP-001 + Blueprint):
 * - Outer container: h-[300vh] — creates 3x viewport scroll space
 * - Inner wrapper: h-screen sticky top-0 — pins while scrolling through 300vh
 * - Background: SVG with clipPath containing "WE BELIEVE" text
 * - GSAP ScrollTrigger: scrub: 1, end: '+=250%'
 *
 * Animation phases on scroll:
 * Phase 1 (0-30%): Full background visible, "WE BELIEVE" text transparent white
 * Phase 2 (30-70%): clipPath expands from center, background only through text
 * Phase 3 (70-100%): White overlay fills, text turns dark gray, section exits
 */
export function HeroMasked({ heroImage = '/images/videocover2-812-optimized.webp' }: HeroMaskedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useClipMask({ containerRef, imageRef, overlayRef, textRef });

  return (
    <section
      ref={containerRef}
      style={{ height: '300vh', position: 'relative' }}
      aria-label="Hero section"
    >
      {/* Sticky viewport — stays in view while container scrolls */}
      <div
        className="hero-mask-inner"
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: '#000',
        }}
      >
        {/* SVG Mask Layer — contains the masked background image */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
          aria-hidden="true"
        >
          <defs>
            {/* SVG clipPath using the "WE BELIEVE" text as the mask shape */}
            <clipPath id="weBelieveClip" clipPathUnits="userSpaceOnUse">
              {/* Group that will be scaled — start at scale(0.15) */}
              <g
                ref={imageRef as React.RefObject<SVGGElement>}
                style={{ transformOrigin: 'center', transform: 'scale(0.15)' }}
              >
                <image
                  href={heroImage}
                  width="100%"
                  height="100%"
                  preserveAspectRatio="xMidYMid slice"
                />
              </g>
            </clipPath>

            {/* Text outline clip — the text shape itself acts as a mask */}
            <clipPath id="textOutlineClip" clipPathUnits="userSpaceOnUse">
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                fontFamily="var(--font-heading), Montserrat, sans-serif"
                fontWeight={900}
                fontSize="clamp(3rem, 10vw, 11rem)"
                letterSpacing="0.04em"
                fill="white"
              >
                We Believe
              </text>
            </clipPath>
          </defs>

          {/* Masked background image — revealed through text */}
          <rect
            width="100%"
            height="100%"
            fill="url(#maskedImage)"
            style={{ clipPath: 'url(#textOutlineClip)' }}
          />

          {/* Fallback: just show the clipped image */}
          <image
            href={heroImage}
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            style={{ clipPath: 'url(#textOutlineClip)' }}
          />
        </svg>

        {/* Dark vignette overlay — fades in on scroll */}
        <div
          ref={overlayRef}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
            pointerEvents: 'none',
            transition: 'background-color 0.1s',
          }}
        />

        {/* "WE BELIEVE" text — transparent at top, dark at scroll end */}
        <h1
          ref={textRef}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-heading), Montserrat, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(4rem, 15vw, 18rem)',
            lineHeight: 0.9,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.25)',
            userSelect: 'none',
            pointerEvents: 'none',
            margin: 0,
            zIndex: 3,
          }}
        >
          We Believe
        </h1>

        {/* Mission block — bottom left */}
        <div
          style={{
            position: 'absolute',
            bottom: 'clamp(40px, 8vh, 80px)',
            left: 'clamp(24px, 4vw, 60px)',
            zIndex: 4,
            maxWidth: 380,
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading), Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.18em',
              color: '#6C1F35',
              marginBottom: 10,
            }}
          >
            St. Elizabeth High School
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 16,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 320,
            }}
          >
            Nurturing minds, hearts, and spirits through faith, excellence, and service since 1967.
          </p>
        </div>
      </div>
    </section>
  );
}
