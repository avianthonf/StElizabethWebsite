'use client';

import { useRef } from 'react';
import { useScrollProgress } from '@/lib/useScrollProgress';

/**
 * Hero section with Walker-style clipping mask animation.
 * - Initially: full viewport, centered text semi-transparent white
 * - On scroll: background fades white, video visible only through text letters
 * - Then: text turns dark, section scrolls out
 */
export function HeroMaskSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress({ scale: 1 });

  // Map progress to visual states:
  // 0.0 - 0.3: Text white, background dark → clip path expands
  // 0.3 - 0.7: Background turns white, text turns dark
  // 0.7 - 1.0: Text dark, section exits

  const textColor = progress < 0.35
    ? `rgba(255, 255, 255, ${1 - progress * 3})`
    : `rgba(51, 51, 51, ${(progress - 0.35) / 0.35})`;

  const overlayOpacity = progress < 0.4
    ? Math.max(0, 1 - (progress / 0.4))
    : 0;

  // Clip path: starts at 0% (invisible), expands to 100% by progress 0.5
  const clipProgress = Math.min(1, progress * 2.2);
  const clipPath = `inset(${(1 - clipProgress) * 50}% ${(1 - clipProgress) * 50}% ${(1 - clipProgress) * 50}% ${(1 - clipProgress) * 50}%)`;

  const translateY = progress * -20; // Slight upward as we scroll

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

      {/* Masked image — visible only through letter shapes */}
      <div className="hero-mask-container">
        <img
          src="/images/hero-campus.jpg"
          alt="Walker School campus"
          className="hero-mask-image"
          style={{
            clipPath,
            opacity: progress < 0.6 ? 1 : 1 - (progress - 0.6) / 0.4,
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

      {/* Mission block — bottom left */}
      <div className="hero-mission-block">
        <p className="walker-overline">St. Elizabeth High School</p>
        <p className="walker-display" style={{ marginTop: 8, color: 'var(--walker-gray)', fontSize: 16, fontFamily: 'var(--font-body)' }}>
          Nurturing minds, hearts, and spirits through faith, excellence, and service since 1967.
        </p>
      </div>
    </section>
  );
}