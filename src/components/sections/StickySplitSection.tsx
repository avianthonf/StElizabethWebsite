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
  backgroundColor?: 'white' | 'light' | 'dark' | 'maroon';
}

/**
 * StickySplitSection adapted for horizontal scroll layout.
 *
 * When inside HomepageHorizontalScroll:
 * - Full viewport width (100vw) x height (100vh)
 * - Single row: left content + right imagery
 * - No nested sticky positioning
 */
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

  // Map backgroundColor to actual values
  const bgColor = backgroundColor === 'light' ? 'var(--color-offwhite)'
    : backgroundColor === 'dark' ? 'var(--color-text-main)'
    : backgroundColor === 'maroon' ? 'var(--color-primary-maroon)'
    : 'var(--color-white)';

  const textColor = backgroundColor === 'dark' || backgroundColor === 'maroon' ? 'var(--color-white)' : 'var(--color-text-main)';
  const mutedColor = backgroundColor === 'dark' || backgroundColor === 'maroon' ? 'rgba(255,255,255,0.7)' : 'var(--color-gray)';

  return (
    <section
      style={{
        backgroundColor: bgColor,
        width: '100vw',
        height: '100vh',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '45% 55%',
          width: '100%',
          height: '100%',
          padding: '0 clamp(24px, 4vw, 60px)',
        }}
      >
        {/* LEFT — Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: 'clamp(24px, 4vw, 60px)',
            overflow: 'hidden',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-heading), Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-brand-maroon)',
              marginBottom: 20,
            }}
          >
            {overline}
          </p>

          <h2
            style={{
              fontFamily: 'var(--font-heading), Montserrat, sans-serif',
              fontWeight: 900,
              fontSize: 'clamp(1.75rem, 3.5vw, 3.5rem)',
              lineHeight: 1.05,
              color: textColor,
              marginBottom: 20,
            }}
          >
            {heading}
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body), Inter, sans-serif',
              fontSize: 'clamp(0.875rem, 1.1vw, 1rem)',
              lineHeight: 1.7,
              color: mutedColor,
              marginBottom: 24,
              maxWidth: 420,
            }}
          >
            {body}
          </p>

          {/* Accordion */}
          <div>
            {accordion.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 0',
                    borderTop: `1px solid ${backgroundColor === 'dark' || backgroundColor === 'maroon' ? 'rgba(255,255,255,0.2)' : 'var(--color-border-light)'}`,
                    background: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(0.8rem, 0.9vw, 0.9rem)',
                    color: textColor,
                    textAlign: 'left',
                  }}
                >
                  <span>{item.title}</span>
                  <ChevronDown
                    size={16}
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
                    maxHeight: openIndex === i ? '200px' : '0',
                    transition: 'max-height 0.4s ease',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-body), Inter, sans-serif',
                      fontSize: 'clamp(0.8rem, 0.9vw, 0.875rem)',
                      lineHeight: 1.6,
                      color: mutedColor,
                      paddingTop: 12,
                      paddingBottom: 4,
                    }}
                  >
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Imagery */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: 12,
            overflow: 'hidden',
          }}
        >
          {leftImage && (
            <img
              src={leftImage}
              alt="Student"
              style={{
                height: '65vh',
                width: 'auto',
                objectFit: 'cover',
                borderRadius: 4,
                flexShrink: 0,
              }}
            />
          )}
          {rightImages.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                maxHeight: '65vh',
                overflow: 'hidden',
              }}
            >
              {rightImages.slice(0, 4).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  style={{
                    height: i === 0 ? 'calc(65vh * 0.55 - 6px)' : 'calc(65vh * 0.45 - 6px)',
                    width: 'auto',
                    objectFit: 'cover',
                    borderRadius: 4,
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
