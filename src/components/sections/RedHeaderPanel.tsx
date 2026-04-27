'use client';

import { homepageSections } from '@/lib/homepage-data';

export function RedHeaderPanel() {
  const section = homepageSections.find((s) => s.type === 'red-header-panel');
  if (!section || section.type !== 'red-header-panel') return null;

  return (
    <section className="site-custom-red-header-wrapper bg-white py-0">
      {/* Red Header Bar */}
      <div
        className="py-6 md:py-8"
        style={{ backgroundColor: section.backgroundColor || '#800000' }}
      >
        <div className="mx-auto max-w-[1200px] px-4">
          <h2 className="text-center font-display text-2xl font-semibold text-white md:text-3xl">
            {section.header}
          </h2>
        </div>
      </div>

      {/* Content Panel */}
      <div className="bg-[#F5F5F5] py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-4">
          <p className="text-center text-base leading-relaxed text-zinc-700 md:text-lg">
            {section.content}
          </p>
        </div>
      </div>
    </section>
  );
}
