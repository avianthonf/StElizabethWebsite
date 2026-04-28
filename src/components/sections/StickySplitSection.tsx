'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';

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

const RIGHT_IMAGE_HEIGHT_TOP = 'calc(65vh * 0.55 - 3px)';
const RIGHT_IMAGE_HEIGHT_BOTTOM = 'calc(65vh * 0.45 - 3px)';

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
  const [openHeight, setOpenHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (openIndex === null) return;

    const updateOpenHeight = () => {
      const content = contentRefs.current[openIndex];
      setOpenHeight(content?.scrollHeight ?? 0);
    };

    window.addEventListener('resize', updateOpenHeight);

    return () => {
      window.removeEventListener('resize', updateOpenHeight);
    };
  }, [openIndex]);

  const toggleAccordion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
      setOpenHeight(0);
      return;
    }

    const content = contentRefs.current[index];
    setOpenHeight(content?.scrollHeight ?? 0);
    setOpenIndex(index);
  };

  const getAccordionMaxHeight = (index: number) => {
    if (openIndex !== index) {
      return '0px';
    }

    return `${openHeight}px`;
  };

  const setContentRef = (index: number, element: HTMLDivElement | null) => {
    contentRefs.current[index] = element;
  };

  const accordionTransition = prefersReducedMotion
    ? 'none'
    : 'max-height 0.48s cubic-bezier(0.25, 1, 0.5, 1)';
  const chevronTransition = prefersReducedMotion
    ? 'none'
    : 'transform 0.42s cubic-bezier(0.25, 1, 0.5, 1)';

  const accordionBorderColor = backgroundColor === 'dark' || backgroundColor === 'maroon'
    ? 'rgba(255,255,255,0.2)'
    : 'var(--color-border-light)';

  const sanitizedId = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const panelId = (index: number) => `sticky-split-panel-${sanitizedId(heading)}-${index}`;
  const triggerId = (index: number) => `sticky-split-trigger-${sanitizedId(heading)}-${index}`;

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);

    return () => {
      window.removeEventListener('resize', updateIsMobile);
    };
  }, []);

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
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '42% 58%',
          width: '100%',
          height: '100%',
          padding: isMobile ? '24px' : '0 clamp(8px, 2vw, 24px)',
          gap: isMobile ? 24 : 0,
          overflow: 'hidden',
        }}
      >
        {/* LEFT — Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: isMobile ? 0 : 'clamp(8px, 2vw, 24px)',
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
              color: 'var(--color-primary-maroon)',
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
                  id={triggerId(i)}
                  onClick={() => toggleAccordion(i)}
                  aria-expanded={openIndex === i}
                  aria-controls={panelId(i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 0',
                    borderTop: `1px solid ${accordionBorderColor}`,
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
                    aria-label={`Toggle ${item.title}`}
                    style={{
                      transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: chevronTransition,
                      flexShrink: 0,
                    }}
                  />
                </button>
                <div
                  id={panelId(i)}
                  ref={(element) => setContentRef(i, element)}
                  role="region"
                  aria-labelledby={triggerId(i)}
                  style={{
                    overflow: 'hidden',
                    maxHeight: getAccordionMaxHeight(i),
                    transition: accordionTransition,
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
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'stretch' : 'center',
            justifyContent: 'flex-end',
            gap: isMobile ? 12 : 6,
            overflow: 'hidden',
            minWidth: 0,
          }}
        >
          {leftImage && (
            <div
              style={{
                position: 'relative',
                height: isMobile ? '32vh' : '65vh',
                width: isMobile ? '100%' : 'min(38vw, 480px)',
                borderRadius: 2,
                flexShrink: 0,
                maxWidth: '100%',
                overflow: 'hidden',
              }}
            >
              <Image
                src={leftImage}
                alt={`${heading} featured image`}
                fill
                sizes={isMobile ? '100vw' : '38vw'}
                style={{
                  objectFit: 'cover',
                  borderRadius: 2,
                }}
              />
            </div>
          )}
          {rightImages.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? 12 : 6,
                maxHeight: isMobile ? '32vh' : '65vh',
                overflow: 'hidden',
                minWidth: 0,
                marginTop: isMobile ? 0 : '-6px',
              }}
            >
              {rightImages.slice(0, 4).map((src, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    height: isMobile
                      ? '100%'
                      : i === 0
                        ? RIGHT_IMAGE_HEIGHT_TOP
                        : RIGHT_IMAGE_HEIGHT_BOTTOM,
                    width: isMobile ? '100%' : 'min(18vw, 220px)',
                    borderRadius: 2,
                    flexShrink: 0,
                    maxWidth: '100%',
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={src}
                    alt={`${heading} gallery image ${i + 1}`}
                    fill
                    sizes={isMobile ? '100vw' : '18vw'}
                    style={{
                      objectFit: 'cover',
                      borderRadius: 2,
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
