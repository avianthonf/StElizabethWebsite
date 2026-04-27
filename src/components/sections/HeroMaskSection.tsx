'use client';

import { useRef } from 'react';
import { useScrollProgress } from '@/lib/useScrollProgress';

interface HeroMaskSectionProps {
  heroImage?: string;
}

/**
 * Hero section with Walker-style clipping mask animation.
 */
export function HeroMaskSection({ heroImage = '/images/videocover2-812-optimized.webp' }: HeroMaskSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress({ scale: 1 });

  const textColor = progress < 0.35
    ? `rgba(255, 255, 255, ${Math.max(0.25, 1 - progress * 3)})`
    : `rgba(51, 51, 51, ${(progress - 0.35) / 0.35})`;

  const overlayOpacity = progress < 0.4
    ? Math.max(0, 1 - (progress / 0.4))
    : 0;

  const clipProgress = Math.min(1, progress * 2.2);
  const translateY = progress * -15;

  return (
    <section
      ref={containerRef}
      className="hero-mask-section"
      style={{ transform: `translateY(${translateY}vh)` }}
    >
      {/* White overlay — fades in as scroll progresses */}
      <div
        className="hero-mask-overlay"
        style={{ opacity: overlayOpacity }}
      />

      {/* Masked image */}
      <div className="hero-mask-container">
        <img
          src={heroImage}
          alt="School campus"
          className="hero-mask-image"
          style={{
            opacity: progress < 0.7 ? 1 : 1 - (progress - 0.7) / 0.3,
          }}
        />
      </div>

      {/* Centered "WE BELIEVE" text */}
      <h1
        className="hero-mask-text"
        style={{ color: textColor }}
      >
        We Believe
      </h1>

      {/* Mission block */}
      <div className="hero-mission-block">
        <p className="walker-overline">St. Elizabeth High School</p>
        <p style={{
          marginTop: 8,
          color: 'rgba(255,255,255,0.85)',
          fontFamily: 'var(--font-body)',
          fontSize: 16,
          lineHeight: 1.6,
          maxWidth: 340,
        }}>
          Nurturing minds, hearts, and spirits through faith, excellence, and service since 1967.
        </p>
      </div>
    </section>
  );
}