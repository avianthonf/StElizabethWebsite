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
  leftImage?: string | null;
  rightImages?: string[];
  backgroundColor?: 'white' | 'light';
}

export function StickySplitSection({
  overline,
  heading,
  body,
  accordion,
  leftImage,
  rightImages = [],
  backgroundColor = 'white',
}: StickySplitSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const bg = backgroundColor === 'light' ? 'var(--walker-gray-light)' : 'var(--walker-white)';

  return (
    <section
      style={{
        backgroundColor: bg,
        minHeight: '100vh',
      }}
    >
      <div
        className="walker-container"
        style={{
          display: 'grid',
          gridTemplateColumns: '40% 60%',
          minHeight: '100vh',
        }}
      >
        {/* LEFT — Sticky */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'var(--section-padding-y) 0',
            paddingRight: 'clamp(24px, 4vw, 60px)',
          }}
        >
          <p className="walker-overline" style={{ marginBottom: 24 }}>
            {overline}
          </p>

          <h2
            className="walker-heading"
            style={{
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              marginBottom: 32,
              lineHeight: 1.05,
            }}
          >
            {heading}
          </h2>

          <p className="walker-body" style={{ maxWidth: 420, marginBottom: 40 }}>
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
                  style={{
                    overflow: 'hidden',
                    maxHeight: openIndex === i ? '300px' : '0',
                    transition: 'max-height 0.4s ease',
                  }}
                >
                  <p
                    className="walker-body"
                    style={{ padding: '16px 0', fontSize: 15 }}
                  >
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Scrolling content */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: 'var(--section-padding-y) 0',
            paddingLeft: 'clamp(20px, 4vw, 60px)',
          }}
        >
          {/* Optional left portrait image */}
          {leftImage && (
            <div style={{ width: '100%', marginBottom: 40 }}>
              <img
                src={leftImage}
                alt="Student"
                style={{
                  width: '100%',
                  maxHeight: '65vh',
                  objectFit: 'cover',
                  borderRadius: 4,
                }}
              />
            </div>
          )}

          {/* Staggered masonry grid */}
          <div className="staggered-images">
            {rightImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Gallery image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}