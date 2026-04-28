'use client';

import { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

export function useMotionHorizontalScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travelDistance, setTravelDistance] = useState(0);

  // Track scroll progress through the tall container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map scroll progress to horizontal translation
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -travelDistance]
  );

  // Smooth the translation for 60fps feel
  const x = useSpring(rawX, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate travel distance on mount and resize
  useEffect(() => {
    const updateTravelDistance = () => {
      if (!trackRef.current) return;
      const distance = trackRef.current.scrollWidth - window.innerWidth;
      setTravelDistance(distance);
    };

    updateTravelDistance();
    window.addEventListener('resize', updateTravelDistance);

    // Recalculate after images load
    const images = trackRef.current?.querySelectorAll('img');
    images?.forEach(img => {
      if (img.complete) return;
      img.addEventListener('load', updateTravelDistance);
    });

    return () => {
      window.removeEventListener('resize', updateTravelDistance);
      images?.forEach(img => {
        img.removeEventListener('load', updateTravelDistance);
      });
    };
  }, []);

  return { containerRef, trackRef, x, scrollYProgress };
}
