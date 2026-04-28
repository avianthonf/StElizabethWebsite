'use client';

import { useEffect, useRef, useState } from 'react';

interface UseScrollProgressOptions {
  /** Clamp progress between 0 and 1 */
  clamp?: boolean;
  /** Scale factor for the scroll area */
  scale?: number;
}

export function useScrollProgress(
  options: UseScrollProgressOptions = {}
): number {
  const { clamp = true, scale = 1 } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Progress: 0 when top of element hits bottom of viewport
      // 1 when bottom of element hits top of viewport
      const scrollStart = -rect.top + windowHeight;
      const rawProgress = scrollStart / (elementHeight + windowHeight);

      let p = rawProgress * scale;
      if (clamp) {
        p = Math.max(0, Math.min(1, p));
      }
      setProgress(p);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [clamp, scale]);

  return progress;
}

/**
 * Track scroll progress for a specific element relative to viewport.
 * Returns 0-1 based on how much of the element has been scrolled through.
 */
export function useElementScrollProgress(
  elementRef: React.RefObject<HTMLElement | null>,
  containerRef?: React.RefObject<HTMLElement | null>
): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = elementRef.current;
    if (!target) return;

    const handleScroll = () => {
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Element center position relative to viewport
      const elementCenter = rect.top + rect.height / 2;
      const viewportCenter = viewHeight / 2;

      // Progress: negative when above viewport, positive when below
      const raw = (viewportCenter - elementCenter) / viewHeight;

      // Map to 0-1: 0 = element bottom at viewport top, 1 = element top at viewport bottom
      const p = Math.max(0, Math.min(1, 1 + raw));
      setProgress(p);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [elementRef, containerRef]);

  return progress;
}
