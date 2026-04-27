'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

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

    const ctx = gsap.context(() => {
      // Calculate how far the track should travel
      // Cards start off-screen right, end off-screen left
      const totalWidth = trackRef.current!.scrollWidth;
      const viewportWidth = window.innerWidth;
      const travelDistance = totalWidth - viewportWidth;

      gsap.to(trackRef.current, {
        x: -travelDistance,
        ease: 'none', // Linear mapping of scroll to x — no easing, pure scroll-linked
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%', // Scroll 3x viewport height for full travel
          scrub: 1, // 1-second lag for buttery smooth Walker feel
          pin: true, // Pin the sticky inner while scrolling
          anticipatePin: 1, // Prevent jump on pin
        },
      });
    });

    return () => ctx.revert();
  }, [containerRef, trackRef]);
}
