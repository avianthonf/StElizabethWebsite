'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

const divisions = [
  {
    id: 'primary',
    label: 'Primary School',
    heading: 'Primary School',
    description:
      'Our youngest learners grow in confidence through a nurturing environment that balances academic preparation with creative play and social-emotional development. Our primary school builds the foundation for a lifetime of learning.',
    image: '/images/primary-school.jpg',
    cta: 'Discover Primary School',
  },
  {
    id: 'lower',
    label: 'Lower School',
    heading: 'Lower School',
    description:
      'Students develop strong literacy, numeracy, and critical thinking skills while exploring arts, athletics, and service. Our lower school fosters curiosity, responsibility, and a love of learning.',
    image: '/images/lower-school.jpg',
    cta: 'Discover Lower School',
  },
  {
    id: 'middle',
    label: 'Middle School',
    heading: 'Middle School',
    description:
      'Adolescents navigate a pivotal transition with the guidance of dedicated teachers who know them well. Our middle school cultivates independence, resilience, and deeper intellectual engagement.',
    image: '/images/middle-school.jpg',
    cta: 'Discover Middle School',
  },
  {
    id: 'upper',
    label: 'Upper School',
    heading: 'Upper School',
    description:
      'Our rigorous college-preparatory program challenges students to excel academically while forming their character and faith. Upper schoolers graduate ready for higher education and lives of purpose.',
    image: '/images/upper-school.jpg',
    cta: 'Discover Upper School',
  },
];

/**
 * Divisions Tab Section — Walker-style three-column layout.
 * Left: sticky nav tabs with black underline on active
 * Center: content that changes per selection
 * Right: image/video for selected division
 */
export function DivisionsTabs() {
  const [active, setActive] = useState(0);
  const division = divisions[active];

  return (
    <section className="divisions-section" style={{ minHeight: '100vh' }}>
      <div
        className="walker-container"
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr 1fr',
          gap: '0',
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        {/* LEFT — Sticky tab navigation */}
        <div
          className="divisions-tabs-nav"
          style={{ position: 'sticky', top: 0, height: '100vh' }}
        >
          <p
            className="walker-overline"
            style={{ marginBottom: 32, fontSize: 11, letterSpacing: '0.15em' }}
          >
            Explore Our School
          </p>
          {divisions.map((d, i) => (
            <button
              key={d.id}
              className={`division-tab-btn ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* CENTER — Content */}
        <div className="divisions-content-area">
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(36px, 4vw, 56px)', marginBottom: 24 }}
          >
            {division.heading}
          </h2>
          <p
            className="walker-body"
            style={{ maxWidth: 480, marginBottom: 40 }}
          >
            {division.description}
          </p>
          <a href={`/${division.id}`} className="walker-btn-primary">
            {division.cta}
            <ChevronRight size={16} />
          </a>
        </div>

        {/* RIGHT — Image */}
        <div style={{ height: '70vh', overflow: 'hidden' }}>
          <img
            key={division.id}
            src={division.image}
            alt={division.heading}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 4,
            }}
          />
        </div>
      </div>
    </section>
  );
}