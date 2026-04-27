'use client';

import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Division {
  id: string;
  label: string;
  heading: string;
  description: string;
  image: string;
  cta: string;
}

interface DivisionsTabsProps {
  divisions?: Division[];
}

export function DivisionsTabs({
  divisions = [
    {
      id: 'primary',
      label: 'Primary School',
      heading: 'Primary School',
      description: 'Our youngest learners grow in confidence through a nurturing environment that balances academic preparation with creative play and social-emotional development.',
      image: '/images/experiencegridhomeprimaryschool-672.jpg',
      cta: 'Discover Primary School',
    },
    {
      id: 'lower',
      label: 'Lower School',
      heading: 'Lower School',
      description: 'Students develop strong literacy, numeracy, and critical thinking skills while exploring arts, athletics, and service. Our lower school fosters curiosity, responsibility, and a love of learning.',
      image: '/images/experiencegridlowerschool-670.jpg',
      cta: 'Discover Lower School',
    },
    {
      id: 'middle',
      label: 'Middle School',
      heading: 'Middle School',
      description: 'Adolescents navigate a pivotal transition with the guidance of dedicated teachers who know them well. Our middle school cultivates independence, resilience, and deeper intellectual engagement.',
      image: '/images/middleschoolboys-617-Experience-Grid_2147.webp',
      cta: 'Discover Middle School',
    },
    {
      id: 'upper',
      label: 'Upper School',
      heading: 'Upper School',
      description: 'Our rigorous college-preparatory program challenges students to excel academically while forming their character and faith. Upper schoolers graduate ready for higher education and lives of purpose.',
      image: '/images/experiencegridhomeupperschool-668.jpg',
      cta: 'Discover Upper School',
    },
  ],
}: DivisionsTabsProps) {
  const [active, setActive] = useState(0);
  const division = divisions[active];

  return (
    <section
      className="divisions-section"
      style={{ minHeight: '100vh', background: 'var(--walker-white)' }}
    >
      <div
        className="walker-container"
        style={{
          display: 'grid',
          gridTemplateColumns: '280px 1fr 1fr',
          gap: 0,
          minHeight: '100vh',
          alignItems: 'center',
        }}
      >
        {/* LEFT — Sticky tab navigation */}
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingRight: 'clamp(20px, 3vw, 40px)',
          }}
        >
          <p
            className="walker-overline"
            style={{ marginBottom: 32, letterSpacing: '0.15em' }}
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
        <div className="divisions-content-area" style={{ padding: '0 clamp(20px, 3vw, 40px)' }}>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', marginBottom: 24 }}
          >
            {division.heading}
          </h2>
          <p
            className="walker-body"
            style={{ maxWidth: 440, marginBottom: 40 }}
          >
            {division.description}
          </p>
          <a href={`#${division.id}`} className="walker-btn-primary">
            {division.cta}
            <ChevronRight size={16} />
          </a>
        </div>

        {/* RIGHT — Image */}
        <div style={{ height: '65vh', overflow: 'hidden', paddingLeft: 'clamp(20px, 3vw, 40px)' }}>
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