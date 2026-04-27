'use client';

import { homepageSections } from '@/lib/homepage-data';

export function SplitMediaGrid() {
  const section = homepageSections.find((s) => s.type === 'split-grid');
  if (!section || section.type !== 'split-grid') return null;

  return (
    <section className="site-custom-grid-reverse-wrapper bg-white py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] space-y-16 px-4 md:space-y-20">
        {section.items.map((item, index) => (
          <div
            key={index}
            className={`grid gap-8 md:grid-cols-2 md:gap-12 ${
              item.imagePosition === 'right' ? 'md:grid-flow-dense' : ''
            }`}
          >
            {/* Image */}
            <div
              className={`overflow-hidden rounded-2xl ${
                item.imagePosition === 'right' ? 'md:col-start-2' : ''
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-[400px] w-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex flex-col justify-center">
              <h2 className="font-display text-3xl font-semibold text-[#002147] md:text-4xl">
                {item.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-700 md:text-lg">
                {item.description}
              </p>
              {item.link && (
                <a
                  href={item.link}
                  className="mt-6 inline-flex w-fit items-center rounded-full bg-[#800000] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#5c0000]"
                >
                  Learn More
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
