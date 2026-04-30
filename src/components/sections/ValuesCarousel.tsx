'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ValueItem {
  number: string;
  image: string;
  title: string;
  description: string;
}

interface ValuesCarouselProps {
  values: ValueItem[];
}

/**
 * ValuesCarousel — Horizontal scroll carousel for "We Value" section.
 * 
 * Features:
 * - Horizontal overflow scroll with drag/touch support
 * - Snap points for card alignment
 * - Left/right navigation arrows on desktop
 * - Shows partial next card as visual cue
 * - Card hover animations (lift, shadow, image zoom)
 */
export function ValuesCarousel({ values }: ValuesCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Update scroll button states
  const updateScrollState = () => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    
    track.addEventListener('scroll', updateScrollState);
    updateScrollState();
    
    return () => track.removeEventListener('scroll', updateScrollState);
  }, []);

  const scrollBy = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const cardWidth = 340; // Approximate card width + gap
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    trackRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        minWidth: '100vw',
        minHeight: '100vh',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'var(--color-white)',
        position: 'relative',
      }}
    >
      {/* Header with title and navigation arrows */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          padding: '0 clamp(24px, 4vw, 60px)',
          marginBottom: 40,
        }}
      >
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 5vw, 5rem)',
            lineHeight: 1,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            color: 'var(--color-text-dark)',
            margin: 0,
          }}
        >
          We Value
        </h2>

        {/* Navigation Arrows - Desktop only */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => scrollBy('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '2px solid var(--color-text-dark)',
              background: canScrollLeft ? 'transparent' : 'var(--color-gray-light)',
              color: canScrollLeft ? 'var(--color-text-dark)' : 'var(--color-gray)',
              cursor: canScrollLeft ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              opacity: canScrollLeft ? 1 : 0.4,
            }}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => scrollBy('right')}
            disabled={!canScrollRight}
            aria-label="Scroll right"
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              border: '2px solid var(--color-text-dark)',
              background: canScrollRight ? 'transparent' : 'var(--color-gray-light)',
              color: canScrollRight ? 'var(--color-text-dark)' : 'var(--color-gray)',
              cursor: canScrollRight ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
              opacity: canScrollRight ? 1 : 0.4,
            }}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Horizontal scroll track */}
      <div
        ref={trackRef}
        className="values-carousel-track"
        style={{
          display: 'flex',
          gap: 'clamp(20px, 2.5vw, 32px)',
          paddingLeft: 'clamp(24px, 4vw, 60px)',
          paddingRight: 'clamp(24px, 4vw, 60px)',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          // Hide scrollbar but keep functionality
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {values.map((item) => (
          <ValueCardCarousel key={item.number} item={item} />
        ))}
        
        {/* Spacer to show partial next card indicator */}
        <div style={{ minWidth: 60, flexShrink: 0 }} aria-hidden="true" />
      </div>

      {/* Custom scrollbar hide for webkit */}
      <style jsx>{`
        .values-carousel-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

/**
 * ValueCardCarousel — Individual value card with hover effects.
 */
function ValueCardCarousel({ item }: { item: ValueItem }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: '0 0 clamp(280px, 28vw, 340px)',
        scrollSnapAlign: 'start',
        display: 'flex',
        flexDirection: 'column',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      {/* Image with number overlay */}
      <div 
        style={{ 
          position: 'relative', 
          marginBottom: 16,
          boxShadow: isHovered 
            ? '0 20px 40px rgba(0,0,0,0.15)' 
            : '0 4px 12px rgba(0,0,0,0.08)',
          transition: 'box-shadow 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(2.5rem, 4vw, 4rem)',
            lineHeight: 1,
            color: 'var(--color-brand-maroon)',
          }}
        >
          {item.number}
        </span>
        <div 
          style={{ 
            aspectRatio: '1', 
            overflow: 'hidden',
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
            }}
          />
        </div>
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: 'clamp(0.875rem, 1.2vw, 1.125rem)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--color-text-dark)',
          marginBottom: 10,
        }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          lineHeight: 1.6,
          color: 'var(--color-gray)',
          marginBottom: 16,
        }}
      >
        {item.description}
      </p>

      {/* Learn More link */}
      <a
        href="#"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          color: 'var(--color-text-dark)',
          textDecoration: 'none',
          marginTop: 'auto',
        }}
      >
        Learn More
        <svg 
          width="14" 
          height="14" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth={2.5} 
          aria-hidden="true"
          style={{
            transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.2s',
          }}
        >
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </article>
  );
}
