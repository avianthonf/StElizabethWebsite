'use client';

import { useRef } from 'react';
import { useHorizontalScroll } from '@/lib/hooks/useHorizontalScroll';
import { cn } from '@/lib/utils';

interface ValueItem {
  number: string;
  image: string;
  title: string;
  description: string;
  href?: string;
}

interface ValueCarouselProps {
  values?: ValueItem[];
}

/**
 * Walker "WE VALUE" horizontal scroll carousel.
 *
 * Architecture (SOP-001 + Blueprint):
 * - Container: h-[400vh] — creates 4x viewport scroll space
 * - Inner: sticky top-0 h-screen — pins while user scrolls
 * - Track: flex container slides from right → left on scroll
 * - GSAP: scroll-linked translateX, scrub: 1 (buttery smooth)
 *
 * Each card:
 * - 1:1 aspect ratio image
 * - Maroon number (positioned top-left, overlapping image)
 * - Bold uppercase title
 * - Description text
 * - "Learn More" link with right chevron
 */
export function ValueCarousel({ values }: ValueCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useHorizontalScroll({ containerRef, trackRef });

  const items = values ?? [
    {
      number: '01',
      image: '/images/Curiosity-310-optimized.webp',
      title: 'Curiosity',
      description: 'We spark a lifelong love of learning through inquiry, exploration, and wonder.',
      href: '/values/curiosity',
    },
    {
      number: '02',
      image: '/images/dignity-311-optimized.webp',
      title: 'Dignity',
      description: 'Every person is made in the image of God and deserves respect and compassion.',
      href: '/values/dignity',
    },
    {
      number: '03',
      image: '/images/Honor-312-optimized.webp',
      title: 'Honor',
      description: "We act with integrity — doing what's right even when no one is watching.",
      href: '/values/honor',
    },
    {
      number: '04',
      image: '/images/Kindness-309-optimized.webp',
      title: 'Kindness',
      description: 'We build a community where everyone feels seen, valued, and supported.',
      href: '/values/kindness',
    },
  ];

  return (
    <section
      ref={containerRef}
      style={{ height: '400vh', position: 'relative' }}
      aria-label="Our values"
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Header with "WE VALUE" */}
        <div
          style={{
            padding: '0 clamp(24px, 4vw, 60px)',
            marginBottom: 48,
          }}
        >
          <h2
            style={{
              fontFamily: 'var(--font-heading), Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 7vw, 7rem)',
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              color: '#000',
            }}
          >
            We Value
          </h2>
        </div>

        {/* Horizontal scrolling track */}
        <div
          ref={trackRef}
          className="flex gap-12"
          style={{
            padding: '0 clamp(24px, 4vw, 60px)',
            willChange: 'transform',
            cursor: 'grab',
          }}
        >
          {items.map((item) => (
            <ValueCard key={item.number} item={item} />
          ))}

          {/* Trailing spacer so last card doesn't sit at edge */}
          <div style={{ width: 'clamp(60px, 6vw, 100px)', flexShrink: 0 }} />
        </div>
      </div>
    </section>
  );
}

function ValueCard({ item }: { item: ValueItem }) {
  return (
    <article
      className="flex-shrink-0"
      style={{ width: 'clamp(260px, 26vw, 380px)' }}
    >
      {/* Card number — maroon, overlaps image */}
      <div
        style={{
          position: 'relative',
          marginBottom: 20,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: -8,
            left: -8,
            zIndex: 1,
            fontFamily: 'var(--font-heading), Montserrat, sans-serif',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            lineHeight: 1,
            color: '#800000',
          }}
        >
          {item.number}
        </span>

        {/* Image — 1:1 square */}
        <div
          style={{
            aspectRatio: '1',
            overflow: 'hidden',
            borderRadius: 4,
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-heading), Montserrat, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: '#000',
          marginBottom: 10,
        }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body), Inter, sans-serif',
          fontSize: 14,
          lineHeight: 1.6,
          color: '#333',
          marginBottom: 16,
        }}
      >
        {item.description}
      </p>

      {/* Learn More link */}
      <a
        href={item.href ?? '#'}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'var(--font-heading), Montserrat, sans-serif',
          fontWeight: 700,
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: '#000',
          textDecoration: 'none',
        }}
      >
        Learn More
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </article>
  );
}
