'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import { homepageSections } from '@/lib/homepage-data';

export function TabbedShowcase() {
  const section = homepageSections.find((s) => s.type === 'tab-slider');
  if (!section || section.type !== 'tab-slider') return null;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainRef, mainApi] = useEmblaCarousel({ loop: false });
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index: number) => {
      if (!mainApi || !thumbApi) return;
      mainApi.scrollTo(index);
    },
    [mainApi, thumbApi]
  );

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbApi) return;
    setSelectedIndex(mainApi.selectedScrollSnap());
    thumbApi.scrollTo(mainApi.selectedScrollSnap());
  }, [mainApi, thumbApi, setSelectedIndex]);

  useEffect(() => {
    if (!mainApi) return;
    onSelect();
    mainApi.on('select', onSelect);
    mainApi.on('reInit', onSelect);

    return () => {
      mainApi.off('select', onSelect);
      mainApi.off('reInit', onSelect);
    };
  }, [mainApi, onSelect]);

  return (
    <section className="site-slider-tab-dt-left-wrapper site-slider-tab-wrapper bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="grid gap-8 md:grid-cols-[300px_1fr] md:gap-12">
          {/* Tab Navigation (Left) */}
          <div className="overflow-hidden" ref={thumbRef}>
            <div className="flex flex-row gap-2 md:flex-col md:gap-4">
              {section.tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => onThumbClick(index)}
                  className={`flex-[0_0_auto] rounded-lg border-2 px-6 py-4 text-left font-semibold transition ${
                    index === selectedIndex
                      ? 'border-[#800000] bg-[#800000] text-white'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-[#800000]/30'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Slider (Right) */}
          <div className="overflow-hidden" ref={mainRef}>
            <div className="flex">
              {section.tabs.map((tab, index) => (
                <div key={index} className="min-w-0 flex-[0_0_100%]">
                  <div className="grid gap-8 md:grid-cols-2 md:gap-12">
                    {/* Image */}
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src={tab.image}
                        alt={tab.title}
                        className="h-[400px] w-full object-cover md:h-[500px]"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center">
                      <h2 className="font-display text-3xl font-semibold text-[#002147] md:text-4xl">
                        {tab.title}
                      </h2>
                      <p className="mt-4 text-base leading-relaxed text-zinc-700 md:text-lg">
                        {tab.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
