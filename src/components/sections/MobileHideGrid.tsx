'use client';

import { Carousel } from '@/components/ui/Carousel';
import { homepageSections } from '@/lib/homepage-data';

export function MobileHideGrid() {
  const section = homepageSections.find((s) => s.type === 'mobile-hide-grid');
  if (!section || section.type !== 'mobile-hide-grid') return null;

  return (
    <section className="site-mobile-hide-wrapper site-custom-image-grid-wrapper hidden bg-white py-12 md:block md:py-16">
      <div className="mx-auto max-w-[1200px] px-4">
        <Carousel
          options={{
            loop: true,
            align: 'start',
            slidesToScroll: 1,
          }}
          showArrows={true}
          showDots={false}
        >
          {section.images.map((image, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%] px-2 md:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
            >
              <div className="overflow-hidden rounded-xl">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-[300px] w-full object-cover"
                />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
