import type { Metadata } from 'next';
import { ContentPage, PageHero } from '@/components/templates/ContentPage';
import { StickySplitSection } from '@/components/sections/StickySplitSection';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'About Us | St. Elizabeth High School',
  description: 'Learn about St. Elizabeth High School — our history, mission, values, and commitment to Catholic education in Pomburpa, Goa.',
};

export default function AboutPage() {
  return (
    <ContentPage>
      <Breadcrumbs items={[{ label: 'About Us', href: '/about' }]} />
      <PageHero
        title="About St. Elizabeth High School"
        description="A legacy of faith, excellence, and service in Catholic education"
      />

      {/* Our Story Section */}
      <section style={{ marginBottom: 'var(--section-padding-y)' }}>
        <p className="walker-overline" style={{ marginBottom: 16 }}>
          Our Story
        </p>
        <h2
          className="walker-heading"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 32 }}
        >
          A Legacy of Faith and Learning
        </h2>
        <div
          className="walker-body"
          style={{
            fontSize: 17,
            lineHeight: 1.7,
            maxWidth: 800,
            color: 'var(--color-text-body)',
          }}
        >
          <p style={{ marginBottom: 24 }}>
            Founded in [year], St. Elizabeth High School has been a cornerstone of Catholic
            education in Pomburpa, Goa. For generations, we have formed young men and women
            of faith, character, and academic excellence.
          </p>
          <p style={{ marginBottom: 24 }}>
            Named after St. Elizabeth of Hungary, a model of charity and service, our school
            embodies her spirit of compassion and dedication to those in need. We inspire
            students to follow her example through service learning, community outreach, and
            a commitment to social justice.
          </p>
          <p>
            Today, St. Elizabeth High School serves students in grades 8-12, preparing them
            for success in higher education and lives of purpose. Our rigorous academic
            program, combined with spiritual formation and extracurricular opportunities,
            ensures that every student discovers their God-given talents and potential.
          </p>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section
        style={{
          backgroundColor: 'var(--color-bg-light)',
          padding: 'var(--section-padding-y) var(--container-padding)',
          margin: '0 calc(-1 * var(--container-padding))',
          marginBottom: 'var(--section-padding-y)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p className="walker-overline" style={{ marginBottom: 16 }}>
            Our Purpose
          </p>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 32 }}
          >
            Mission & Vision
          </h2>

          <div style={{ marginBottom: 48 }}>
            <h3
              className="walker-heading"
              style={{ fontSize: 24, marginBottom: 16, color: 'var(--color-primary-maroon)' }}
            >
              Our Mission
            </h3>
            <p className="walker-body" style={{ fontSize: 17, lineHeight: 1.7 }}>
              St. Elizabeth High School exists to form young men and women of faith, character,
              and academic excellence. Rooted in Catholic values and inspired by the example of
              St. Elizabeth, we prepare students to lead lives of purpose, service, and integrity.
            </p>
          </div>

          <div>
            <h3
              className="walker-heading"
              style={{ fontSize: 24, marginBottom: 16, color: 'var(--color-primary-maroon)' }}
            >
              Our Vision
            </h3>
            <p className="walker-body" style={{ fontSize: 17, lineHeight: 1.7 }}>
              We envision graduates who are intellectually curious, spiritually grounded, and
              committed to serving others. Our students leave St. Elizabeth prepared for higher
              education and equipped to make a positive impact in their communities and the world.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{ marginBottom: 'var(--section-padding-y)' }}>
        <p className="walker-overline" style={{ marginBottom: 16 }}>
          What We Stand For
        </p>
        <h2
          className="walker-heading"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 48 }}
        >
          Our Core Values
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 40,
          }}
        >
          <ValueCard
            number="01"
            title="Faith"
            description="Rooted in Catholic tradition, we nurture spiritual growth through prayer, sacraments, and service to others."
          />
          <ValueCard
            number="02"
            title="Excellence"
            description="We challenge every student to reach their full potential through rigorous academics and dedicated mentorship."
          />
          <ValueCard
            number="03"
            title="Service"
            description="Following Christ's example, we serve our community and those in need with compassion and generosity."
          />
          <ValueCard
            number="04"
            title="Community"
            description="We build a family where every student is known, valued, and supported in their journey of growth."
          />
        </div>
      </section>

      {/* Principal's Message Section */}
      <section
        style={{
          backgroundColor: 'var(--color-primary-maroon)',
          color: 'var(--color-white)',
          padding: 'var(--section-padding-y) var(--container-padding)',
          margin: '0 calc(-1 * var(--container-padding))',
          marginBottom: 'var(--section-padding-y)',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <p className="walker-overline" style={{ marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>
            From Our Principal
          </p>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 32 }}
          >
            Welcome to St. Elizabeth
          </h2>
          <p
            className="walker-body"
            style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', marginBottom: 24 }}
          >
            "At St. Elizabeth High School, we believe that every student is a gift from God with
            unique talents and potential. Our mission is to help each student discover their gifts,
            develop their abilities, and use them in service to others."
          </p>
          <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.05em' }}>
            — [Principal Name], Principal
          </p>
        </div>
      </section>
    </ContentPage>
  );
}

// Value Card Component (inline, single-use)
function ValueCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p
        className="walker-overline"
        style={{ color: 'var(--color-primary-maroon)', marginBottom: 12 }}
      >
        {number}
      </p>
      <h3
        className="walker-heading"
        style={{ fontSize: 24, marginBottom: 16 }}
      >
        {title}
      </h3>
      <p className="walker-body" style={{ fontSize: 16, lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}
