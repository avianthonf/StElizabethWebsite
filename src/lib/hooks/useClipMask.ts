'use client';

import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';

export function useClipMask({
  containerRef,
  imageRef,
  overlayRef,
  textRef,
  imageGroupRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  imageRef: React.RefObject<HTMLImageElement | null>;
  overlayRef: React.RefObject<HTMLDivElement | null>;
  textRef: React.RefObject<HTMLElement | null>;
  imageGroupRef?: React.RefObject<SVGGElement | null>;
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
          scrub: 1,
        },
      });

      // Text: giant and transparent → normal and dark
      tl.fromTo(
        textRef.current,
        { scale: 1.5, opacity: 0.25, color: 'rgba(255,255,255,0.25)' },
        { scale: 1, opacity: 1, color: '#333333', duration: 1 },
        0
      );

      // White overlay: transparent → fully opaque white
      tl.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        0
      );

      // Image group: starts tiny → full size
      if (imageGroupRef?.current) {
        tl.fromTo(
          imageGroupRef.current,
          { scale: 0.15, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6 },
          0.2
        );
      } else {
        tl.fromTo(
          imageRef.current,
          { scale: 2, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.6 },
          0.2
        );
      }

      // Slight upward translate on exit
      const innerEl = containerRef.current?.querySelector('.hero-mask-inner');
      if (innerEl) {
        tl.to(innerEl, { y: '-15%', duration: 1 }, 0);
      }
    });

    return () => ctx.revert();
  }, [containerRef, imageRef, overlayRef, textRef, imageGroupRef]);
}
