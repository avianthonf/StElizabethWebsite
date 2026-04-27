'use client';

import { homepageSections } from '@/lib/homepage-data';

export function VideoHero() {
  const section = homepageSections.find((s) => s.type === 'video-hero');
  if (!section || section.type !== 'video-hero') return null;

  return (
    <section className="site-slide-height-dt-cover-wrapper site-custom-video-banner relative h-[400px] overflow-hidden md:h-[600px]">
      {/* Background Image/Video */}
      <div className="absolute inset-0">
        <img
          src={section.posterImage}
          alt="Hero background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Centered Caption */}
      <div className="site-slide-caption-dt-mc absolute inset-0 flex items-center justify-center">
        <div className="site-color-white max-w-4xl px-4 text-center text-white">
          <h1 className="font-display text-4xl font-semibold leading-tight md:text-6xl lg:text-7xl">
            {section.caption.title}
          </h1>
          {section.caption.subtitle && (
            <p className="mt-4 text-lg md:mt-6 md:text-2xl">
              {section.caption.subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
