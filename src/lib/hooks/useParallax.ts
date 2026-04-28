'use client';

import { useEffect } from 'react';
import { gsap } from '@/lib/gsap-config';

/**
 * Parallax effect — maps vertical scroll to slightly slower Y-axis movement.
 *
 * @param speed — multiplier for the parallax offset (default: 0.4)
 *                 0.4 = image moves at 40% of scroll speed (subtle depth)
 *                 0.8 = more pronounced parallax
 *                 Higher values = faster relative movement
 */
export function useParallax(
  elementRef: React.RefObject<HTMLElement | null>,
  speed = 0.4
) {
  useEffect(() => {
    if (typeof window === 'undefined' || !elementRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        elementRef.current,
        { y: 0 },
        {
          y: () => -window.innerHeight * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: elementRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [elementRef, speed]);
}
