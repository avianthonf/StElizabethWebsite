'use client';

import { useRef } from 'react';
import { useScrollProgress } from '@/lib/useScrollProgress';

const values = [
  {
    number: '01',
    image: '/images/curiosity.jpg',
    title: 'Curiosity',
    description: 'We spark a lifelong love of learning through inquiry, exploration, and wonder.',
  },
  {
    number: '02',
    image: '/images/dignity.jpg',
    title: 'Dignity',
    description: 'Every person is made in the image of God and deserves respect and compassion.',
  },
  {
    number: '03',
    image: '/images/excellence.jpg',
    title: 'Excellence',
    description: 'We pursue the highest standards in academics, arts, athletics, and character.',
  },
  {
    number: '04',
    image: '/images/faith.jpg',
    title: 'Faith',
    description: 'Our Catholic identity shapes a community of prayer, service, and moral purpose.',
  },
  {
    number: '05',
    image: '/images/community.jpg',
    title: 'Community',
    description: 'We build bonds of friendship and belonging that last a lifetime.',
  },
  {
    number: '06',
    image: '/images/service.jpg',
    title: 'Service',
    description: 'We form men and women for others who use their gifts in service of the common good.',
  },
];

/**
 * We Value section — Walker-style scroll-linked horizontal carousel.
 * Cards slide horizontally as the user scrolls vertically.
 */
export function ValuesScrollCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress({ scale: 1 });

  // Track starts at top (sticky), ends after scrolling through the section
  // progress 0 = cards at right (off-screen), progress 1 = cards fully revealed
  const trackTranslate = (1 - progress) * -55; // percentage
  const trackOpacity = progress < 0.05 ? 0 : 1;
  const trackTranslateX = `${trackTranslate}vw`;

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
        className="values-scroll-track-wrapper"
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
            transform: `translateX(${trackTranslateX})`,
            opacity: trackOpacity,
            transition: 'opacity 0.2s',
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