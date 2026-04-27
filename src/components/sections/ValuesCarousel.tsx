'use client';

import { Carousel } from '@/components/ui/Carousel';
import { homepageSections } from '@/lib/homepage-data';

export function ValuesCarousel() {
  const section = homepageSections.find((s) => s.type === 'values-carousel');
  if (!section || section.type !== 'values-carousel') return null;

  return (
    <section className="site-multi-slide-slider-wrapper site-custom-number-gallery-wrapper bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4">
        <h2 className="mb-12 text-center font-display text-3xl font-semibold text-[#002147] md:text-4xl">
          {section.title}
        </h2>

        <Carousel
          options={{
            loop: true,
            align: 'start',
            slidesToScroll: 1,
            breakpoints: {
              '(min-width: 1024px)': { slidesToScroll: 1 },
            },
          }}
          showArrows={true}
          showDots={false}
          className="values-carousel"
        >
          {section.items.map((item, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%] px-2 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_16.666%]"
            >
              <div className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-zinc-200 transition hover:shadow-lg">
                <div className="aspect-[4/5] overflow-hidden bg-gradient-to-br from-[#800000]/10 to-[#002147]/10">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-[#002147]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
