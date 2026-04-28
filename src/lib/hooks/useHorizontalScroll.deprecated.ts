/**
 * @deprecated Replaced by useMotionHorizontalScroll.ts
 *
 * This GSAP-based implementation was replaced with Framer Motion's
 * useScroll + useTransform pattern to avoid timing/measurement issues.
 *
 * Kept for reference only. Do not use in new code.
 */

'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

// Debounce utility for resize handler
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Walker "WE VALUE" horizontal scroll carousel.
 *
 * Physics (SOP-001):
 * - Container: h-[400vh] — creates 4x viewport scroll space
 * - Inner: sticky top-0 h-screen — pins the carousel while scrolling
 * - Track: flex container with value cards
 * - Animation: translateX(0) → translateX(-100%) mapped to scroll
 *
 * As the user scrolls vertically, the card track slides horizontally,
 * creating the illusion of horizontal movement from vertical scroll.
 */
export function useHorizontalScroll({
  containerRef,
  trackRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
}) {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !containerRef.current ||
      !trackRef.current
    ) {
      return;
    }

    const createScrollAnimation = () => {
      const totalWidth = trackRef.current!.scrollWidth;
      const viewportWidth = window.innerWidth;
      const travelDistance = totalWidth - viewportWidth;

      return gsap.context(() => {
        gsap.to(trackRef.current, {
          x: -travelDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: '+=300%',
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
          },
        });
      });
    };

    let animationContext = createScrollAnimation();

    const handleResize = debounce(() => {
      if (!containerRef.current || !trackRef.current) return;

      animationContext.revert();
      animationContext = createScrollAnimation();
      ScrollTrigger.refresh();
    }, 150);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      animationContext.revert();
    };
  }, [containerRef, trackRef]);
}
