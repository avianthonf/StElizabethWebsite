'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

/**
 * Walker "WE BELIEVE" hero masking animation.
 *
 * Physics (SOP-001):
 * - Container: h-[300vh] — creates 3x viewport scroll space
 * - Inner: h-screen sticky top-0 — pins the hero while scrolling
 * - Animation: SVG clipPath scale 10 → 1, scrub: 1 (buttery smooth)
 * - Text scale: 150 → 1 on scroll
 * - Background overlay: dark → white on scroll
 *
 * The mask reveals the background image/video only inside the "WE BELIEVE"
 * text shapes, then transitions to solid white as the user scrolls through.
 */
export function useClipMask({
  containerRef,
  imageRef,
  overlayRef,
  textRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLImageElement | null>;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  textRef: React.RefObject<HTMLElement | null>;
}) {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      !containerRef.current ||
      !imageRef.current ||
      !overlayRef.current ||
      !textRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1, // 1-second lag = buttery smooth Walker feel
        },
      });

      // 1. Text: giant and transparent → normal and dark
      // Start: scale 1.5, white at 0.25 opacity
      // End: scale 1, dark gray
      tl.fromTo(
        textRef.current,
        {
          scale: 1.5,
          opacity: 0.25,
          color: 'rgba(255,255,255,0.25)',
        },
        {
          scale: 1,
          opacity: 1,
          color: '#333333',
          duration: 1,
        },
        0
      );

      // 2. White overlay: transparent → fully opaque white
      // Fills the screen as we scroll, hiding the dark background
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        0
      );

      // 3. Image reveal: starts invisible, revealed at ~40% scroll
      // Scale up from center to fill the masked text shapes
      tl.fromTo(
        imageRef.current,
        { scale: 2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        0.2
      );

      // 4. Slight upward translate on the whole hero as we exit
      tl.to(
        containerRef.current.querySelector('.hero-mask-inner'),
        { y: '-15%', duration: 1 },
        0
      );
    });

    return () => ctx.revert();
  }, [containerRef, imageRef, overlayRef, textRef]);
}
