'use client';

import { useRef } from 'react';
import { useScrollProgress } from '@/lib/useScrollProgress';

interface ValueItem {
  number: string;
  image: string;
  title: string;
  description: string;
}

interface ValuesScrollCarouselProps {
  values?: ValueItem[];
}

export function ValuesScrollCarousel({
  values = [
    {
      number: '01',
      image: '/images/Curiosity-310-optimized.webp',
      title: 'Curiosity',
      description: 'We spark a lifelong love of learning through inquiry, exploration, and wonder.',
    },
    {
      number: '02',
      image: '/images/dignity-311-optimized.webp',
      title: 'Dignity',
      description: 'Every person is made in the image of God and deserves respect and compassion.',
    },
    {
      number: '03',
      image: '/images/Honor-312-optimized.webp',
      title: 'Honor',
      description: 'We act with integrity — doing what\'s right even when no one is watching.',
    },
    {
      number: '04',
      image: '/images/Kindness-309-optimized.webp',
      title: 'Kindness',
      description: 'We build a community where everyone feels seen, valued, and supported.',
    },
  ],
}: ValuesScrollCarouselProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress({ scale: 1 });

  // Cards start off-screen right, slide into view as we scroll
  const trackTranslate = (1 - progress) * -55;

  return (
    <section
      ref={sectionRef}
      className="values-scroll-section"
    >
      {/* Sticky header */}
      <div className="values-scroll-header walker-container">
        <h2 className="walker-heading" style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}>
          We Value
        </h2>
      </div>

      {/* Sticky carousel track */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          className="values-scroll-track"
          style={{
            transform: `translateX(${trackTranslate}vw)`,
            opacity: progress < 0.05 ? 0 : 1,
          }}
        >
          {values.map((value) => (
            <div key={value.number} className="value-card">
              <div className="value-card-number">{value.number}</div>
              <img
                src={value.image}
                alt={value.title}
                className="value-card-image"
              />
              <h3 className="value-card-title">{value.title}</h3>
              <p className="value-card-desc">{value.description}</p>
              <a href="#" className="value-card-link">
                Learn More
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}