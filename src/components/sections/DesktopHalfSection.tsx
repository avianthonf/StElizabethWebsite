'use client';

import { homepageSections } from '@/lib/homepage-data';

export function DesktopHalfSection() {
  const section = homepageSections.find((s) => s.type === 'desktop-half');
  if (!section || section.type !== 'desktop-half') return null;

  return (
    <section className="site-desktop-width-50-wrapper site-mobile-hide-wrapper hidden md:block">
      <div className="flex">
        {/* Left Half */}
        <div className="relative h-[350px] w-1/2 overflow-hidden">
          <img
            src={section.leftImage}
            alt="Left section"
            className="h-full w-full object-cover"
          />
          {section.leftLink && (
            <a
              href={section.leftLink}
              className="absolute inset-0 bg-black/0 transition hover:bg-black/10"
            >
              <span className="sr-only">View details</span>
            </a>
          )}
        </div>

        {/* Right Half */}
        <div className="relative h-[350px] w-1/2 overflow-hidden">
          <img
            src={section.rightImage}
            alt="Right section"
            className="h-full w-full object-cover"
          />
          {section.rightLink && (
            <a
              href={section.rightLink}
              className="absolute inset-0 bg-black/0 transition hover:bg-black/10"
            >
              <span className="sr-only">View details</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
