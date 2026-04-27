'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Detects scroll direction (up/down) and position for header state.
 * - Direction: 'up' | 'down' | null
 * - ScrollY: current vertical scroll position
 * - IsScrolled: true once user has scrolled past threshold
 *
 * Used by Header to toggle: transparent → solid background
 */
export function useScrollDirection(threshold = 60) {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingDown = currentScrollY > lastScrollY.current;

      setScrollY(currentScrollY);
      setDirection(scrollingDown ? 'down' : 'up');
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    direction,
    scrollY,
    isScrolled: scrollY > threshold,
  };
}
