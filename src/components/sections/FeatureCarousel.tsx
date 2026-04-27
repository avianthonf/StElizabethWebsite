'use client';

import { Carousel } from '@/components/ui/Carousel';
import { homepageSections } from '@/lib/homepage-data';

export function FeatureCarousel() {
  const section = homepageSections.find((s) => s.type === 'slide-gallery');
  if (!section || section.type !== 'slide-gallery') return null;

  return (
    <section className="site-custom-slide-gallery-wrapper bg-[#F5F5F5] py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4">
        {section.title && (
          <h2 className="mb-12 text-center font-display text-3xl font-semibold text-[#002147] md:text-4xl">
            {section.title}
          </h2>
        )}

        <Carousel
          options={{
            loop: true,
            align: 'start',
            slidesToScroll: 1,
          }}
          showArrows={true}
          showDots={true}
        >
          {section.images.map((image, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%] px-2 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />
                </div>
                {image.caption && (
                  <div className="p-6">
                    <p className="text-center text-sm font-medium text-zinc-700">
                      {image.caption}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
