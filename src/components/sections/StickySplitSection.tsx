'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  title: string;
  content: string;
}

interface StickySplitSectionProps {
  overline: string;
  heading: string;
  body: string;
  accordion: AccordionItem[];
  backgroundColor?: 'white' | 'light';
  rightImages?: string[];
}

export function StickySplitSection({
  overline,
  heading,
  body,
  accordion,
  backgroundColor = 'white',
  rightImages = [],
}: StickySplitSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const bg = backgroundColor === 'light' ? 'var(--walker-gray-light)' : 'var(--walker-white)';

  return (
    <section
      className="sticky-split-section"
      style={{ backgroundColor: bg }}
    >
      <div className="walker-container" style={{ display: 'grid', gridTemplateColumns: '40% 60%', minHeight: '100vh' }}>
        {/* LEFT — Sticky */}
        <div className="sticky-split-left">
          <p className="walker-overline" style={{ marginBottom: 24 }}>
            {overline}
          </p>

          <h2
            className="walker-heading"
            style={{
              fontSize: 'clamp(32px, 4vw, 60px)',
              marginBottom: 32,
              lineHeight: 1.05,
            }}
          >
            {heading}
          </h2>

          <p className="walker-body" style={{ maxWidth: 440, marginBottom: 40 }}>
            {body}
          </p>

          {/* Accordion */}
          <div>
            {accordion.map((item, i) => (
              <div key={i}>
                <button
                  className="walker-accordion-btn"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span>{item.title}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s',
                      flexShrink: 0,
                    }}
                  />
                </button>
                <div
                  className={`walker-accordion-content ${openIndex === i ? 'open' : ''}`}
                >
                  <p className="walker-body" style={{ padding: '16px 0', fontSize: 15 }}>
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Scrolling */}
        <div className="sticky-split-right" style={{ paddingTop: 'var(--section-padding-y)' }}>
          <div className="staggered-images">
            {rightImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Gallery image ${i + 1}`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}