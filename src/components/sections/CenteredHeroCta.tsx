'use client';

import { homepageSections } from '@/lib/homepage-data';

export function CenteredHeroCta() {
  const section = homepageSections.find((s) => s.type === 'final-hero');
  if (!section || section.type !== 'final-hero') return null;

  return (
    <section className="site-slide-caption-dt-mc-wrapper site-slide-height-dt-cover-wrapper site-color-white site-custom-banner-size-150-wrapper relative h-[600px] overflow-hidden md:h-[750px]">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={section.backgroundImage}
          alt="Final hero background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#800000]/70" />
      </div>

      {/* Centered Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-4xl px-4 text-center text-white">
          <h2 className="font-display text-5xl font-semibold leading-tight md:text-6xl lg:text-7xl">
            {section.title}
          </h2>
          {section.subtitle && (
            <p className="mt-6 text-xl md:text-2xl">{section.subtitle}</p>
          )}
          <div className="mt-10">
            <a
              href={section.ctaLink}
              className="inline-flex items-center rounded-full bg-white px-8 py-4 text-base font-semibold text-[#800000] transition hover:bg-[#F5F5DC] md:text-lg"
            >
              {section.ctaText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
