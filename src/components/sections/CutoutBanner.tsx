'use client';

import { homepageSections } from '@/lib/homepage-data';

export function CutoutBanner() {
  const section = homepageSections.find((s) => s.type === 'cutout-banner');
  if (!section || section.type !== 'cutout-banner') return null;

  return (
    <section
      className="site-bg-primary-wrapper site-custom-cutout-image-wrapper relative h-[300px] overflow-hidden md:h-[400px]"
      style={{ backgroundColor: section.backgroundColor }}
    >
      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src={section.backgroundImage}
          alt="Background"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Centered Cutout Image */}
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={section.cutoutImage}
          alt="Cutout"
          className="h-full max-h-[400px] w-auto object-contain"
        />
      </div>
    </section>
  );
}
