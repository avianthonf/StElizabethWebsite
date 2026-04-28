'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  children: React.ReactNode;
  options?: Parameters<typeof useEmblaCarousel>[0];
  showArrows?: boolean;
  showDots?: boolean;
  className?: string;
}

export function Carousel({
  children,
  options = {},
  showArrows = true,
  showDots = false,
  className = '',
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    queueMicrotask(() => {
      setScrollSnaps(emblaApi.scrollSnapList());
      onSelect();
    });

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>

      {showArrows && (
        <>
          <button
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-[2px] bg-white/92 p-2.5 shadow-[0_14px_32px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.04] hover:bg-white disabled:cursor-default disabled:opacity-30 disabled:hover:scale-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-zinc-900" />
          </button>
          <button
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-[2px] bg-white/92 p-2.5 shadow-[0_14px_32px_rgba(0,0,0,0.12)] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] hover:scale-[1.04] hover:bg-white disabled:cursor-default disabled:opacity-30 disabled:hover:scale-100"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-zinc-900" />
          </button>
        </>
      )}

      {showDots && scrollSnaps.length > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                index === selectedIndex
                  ? 'w-8 scale-110 bg-maroon shadow-[0_6px_18px_rgba(94,22,36,0.18)]'
                  : 'w-2 bg-zinc-300 hover:bg-zinc-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
