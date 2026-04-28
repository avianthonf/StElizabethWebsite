'use client';

import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

type DebouncedFn<T extends (...args: unknown[]) => void> = ((...args: Parameters<T>) => void) & {
  cancel: () => void;
};

function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  wait: number
): DebouncedFn<T> {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = ((...args: Parameters<T>) => {
    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as DebouncedFn<T>;

  debounced.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
}

function getTravelDistance(track: HTMLDivElement): number {
  return track.scrollWidth - window.innerWidth;
}

function refreshScrollAfterLoad() {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}

export { refreshScrollAfterLoad };

export type HorizontalScrollRefs = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  trackRef: React.RefObject<HTMLDivElement | null>;
};

/**
 * Keeps the horizontal scroll track measured from the live DOM so resize and
 * late-loading assets do not leave unreachable whitespace at the end.
 */

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
}: HorizontalScrollRefs) {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !containerRef.current ||
      !trackRef.current
    ) {
      return;
    }

    const createScrollAnimation = () => {
      const track = trackRef.current;
      const container = containerRef.current;

      if (!track || !container) {
        return null;
      }

      const travelDistance = getTravelDistance(track);

      return gsap.context(() => {
        gsap.to(track, {
          x: -travelDistance,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=300%',
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    };

    const rebuildAnimation = () => {
      animationContext?.revert();
      animationContext = createScrollAnimation();
      ScrollTrigger.refresh();
    };

    let animationContext = createScrollAnimation();

    if (!animationContext) {
      return;
    }

    const handleResize = debounce(() => {
      if (!containerRef.current || !trackRef.current) return;

      rebuildAnimation();
    }, 200);

    const handleLoad = () => {
      if (!containerRef.current || !trackRef.current) return;

      rebuildAnimation();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleLoad);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleLoad);
      handleResize.cancel();
      animationContext?.revert();
    };
  }, [containerRef, trackRef]);
}

