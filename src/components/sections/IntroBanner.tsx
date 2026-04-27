'use client';

import { homepageSections } from '@/lib/homepage-data';

export function IntroBanner() {
  const section = homepageSections.find((s) => s.type === 'intro-banner');
  if (!section || section.type !== 'intro-banner') return null;

  return (
    <div className="site-custom-intro-banner-wrapper bg-[#F5F5DC] py-2.5 md:py-2">
      <div className="mx-auto max-w-[1200px] px-4">
        <p className="text-center text-xs font-medium tracking-wide text-[#800000] md:text-sm">
          {section.text}
        </p>
      </div>
    </div>
  );
}
