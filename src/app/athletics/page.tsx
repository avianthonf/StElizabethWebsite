import type { Metadata } from 'next';
import { ContentPage, PageHero } from '@/components/templates/ContentPage';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Athletics | St. Elizabeth High School',
  description: 'Excellence in competition at St. Elizabeth High School. Building character through sports, teamwork, and sportsmanship in Pomburpa, Goa.',
};

export default function AthleticsPage() {
  return (
    <ContentPage>
      <Breadcrumbs items={[{ label: 'Athletics', href: '/athletics' }]} />
      <PageHero
        title="Athletics"
        description="Excellence in Competition"
        backgroundImage="/images/campus-1.jpg"
      />
      {/* Athletics Philosophy Section */}
      <section style={{ marginBottom: 'var(--section-padding-y)' }}>
        <h2
          className="walker-heading"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 32 }}
        >
          Character Through Competition
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
            At St. Elizabeth High School, athletics is more than winning games — it's about forming
            character, building discipline, and learning the values of teamwork, perseverance, and
            sportsmanship. Our athletic program challenges students to push their limits while
            maintaining integrity and respect for opponents.
          </p>
          <p style={{ marginBottom: 24 }}>
            We believe that sports teach life lessons that extend far beyond the field or court.
            Through competition, students learn to handle victory with humility, defeat with grace,
            and challenges with determination. Our coaches are mentors who develop not just skilled
            athletes, but young men and women of character.
          </p>
          <p>
            From intramural programs to competitive inter-school tournaments, St. Elizabeth offers
            opportunities for students of all skill levels to participate, grow, and excel in athletics.
          </p>
        </div>
      </section>

      {/* Sports Offerings Section */}
      <section
        style={{
          backgroundColor: 'var(--color-bg-light)',
          padding: 'var(--section-padding-y) var(--container-padding)',
          margin: '0 calc(-1 * var(--container-padding))',
          marginBottom: 'var(--section-padding-y)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="walker-overline" style={{ marginBottom: 16 }}>
            Our Sports
          </p>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 48 }}
          >
            Sports Programs
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: 32,
            }}
          >
            <SportCard title="Football" description="Inter-school tournaments and district competitions" />
            <SportCard title="Basketball" description="Boys and girls teams with competitive leagues" />
            <SportCard title="Volleyball" description="Indoor and beach volleyball programs" />
            <SportCard title="Cricket" description="Traditional cricket with modern coaching methods" />
            <SportCard title="Athletics" description="Track and field events, cross country running" />
            <SportCard title="Swimming" description="Competitive swimming and water safety training" />
            <SportCard title="Badminton" description="Singles and doubles competitive play" />
            <SportCard title="Table Tennis" description="Individual and team competitions" />
            <SportCard title="Kabaddi" description="Traditional Indian sport with regional tournaments" />
            <SportCard title="Yoga & Fitness" description="Physical wellness and mindfulness training" />
          </div>
        </div>
      </section>

      {/* Cutout Panel Style Sections */}
      <section style={{ marginBottom: 'var(--section-padding-y)' }}>
        {/* Panel 1: Team Sports */}
        <div
          style={{
            backgroundColor: 'var(--color-primary-maroon)',
            color: 'var(--color-white)',
            padding: 'var(--section-padding-y) var(--container-padding)',
            margin: '0 calc(-1 * var(--container-padding))',
            marginBottom: 60,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 60,
              alignItems: 'center',
            }}
          >
            <div>
              <p className="walker-overline" style={{ marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>
                Team Sports
              </p>
              <h2
                className="walker-heading"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 24 }}
              >
                Building Unity Through Teamwork
              </h2>
              <p
                className="walker-body"
                style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)' }}
              >
                Our team sports programs teach students the power of collaboration, communication,
                and collective effort. From football to basketball to volleyball, students learn
                that success requires trust, sacrifice, and working toward a common goal. These
                lessons in teamwork prepare students for leadership in all areas of life.
              </p>
            </div>
            <div
              style={{
                height: 400,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                [Team sport action photo]
              </p>
            </div>
          </div>
        </div>

        {/* Panel 2: Individual Sports */}
        <div
          style={{
            backgroundColor: 'var(--color-white)',
            padding: 'var(--section-padding-y) var(--container-padding)',
            margin: '0 calc(-1 * var(--container-padding))',
            marginBottom: 60,
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 60,
              alignItems: 'center',
            }}
          >
            <div
              style={{
                height: 400,
                backgroundColor: 'var(--color-bg-light)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p style={{ fontSize: 14, color: '#999' }}>
                [Individual athlete photo]
              </p>
            </div>
            <div>
              <p className="walker-overline" style={{ marginBottom: 16 }}>
                Individual Sports
              </p>
              <h2
                className="walker-heading"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 24 }}
              >
                Personal Excellence & Self-Discipline
              </h2>
              <p
                className="walker-body"
                style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--color-text-body)' }}
              >
                Individual sports like athletics, swimming, and badminton develop self-discipline,
                personal responsibility, and mental toughness. Students learn to set goals, track
                progress, and push through challenges on their own. These sports build confidence
                and resilience that serve students throughout their lives.
              </p>
            </div>
          </div>
        </div>

        {/* Panel 3: Facilities */}
        <div
          style={{
            backgroundColor: 'var(--color-text-dark)',
            color: 'var(--color-white)',
            padding: 'var(--section-padding-y) var(--container-padding)',
            margin: '0 calc(-1 * var(--container-padding))',
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 60,
              alignItems: 'center',
            }}
          >
            <div>
              <p className="walker-overline" style={{ marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>
                Our Facilities
              </p>
              <h2
                className="walker-heading"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 24 }}
              >
                World-Class Athletic Facilities
              </h2>
              <p
                className="walker-body"
                style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)' }}
              >
                St. Elizabeth High School features modern athletic facilities including a full-size
                football field, basketball and volleyball courts, cricket pitch, swimming pool,
                athletics track, and indoor sports complex. Our facilities provide students with
                the resources they need to train, compete, and excel at the highest levels.
              </p>
            </div>
            <div
              style={{
                height: 400,
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
                [Sports facility photo]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section
        style={{
          backgroundColor: 'var(--color-primary-maroon)',
          color: 'var(--color-white)',
          padding: 'var(--section-padding-y) var(--container-padding)',
          margin: '0 calc(-1 * var(--container-padding))',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p className="walker-overline" style={{ marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>
            Our Success
          </p>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 32 }}
          >
            Athletic Excellence
          </h2>
          <p
            className="walker-body"
            style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', marginBottom: 24 }}
          >
            St. Elizabeth teams consistently compete at district, state, and national levels.
            Our student-athletes have earned numerous championships, individual honors, and
            recognition for sportsmanship. More importantly, they carry the values learned
            through athletics into their academic pursuits and future careers.
          </p>
        </div>
      </section>
    </ContentPage>
  );
}

// Sport Card Component (inline, single-use)
function SportCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        padding: 24,
        backgroundColor: 'var(--color-white)',
        borderRadius: 8,
        border: '1px solid #e5e5e5',
      }}
    >
      <h3
        className="walker-heading"
        style={{ fontSize: 20, marginBottom: 12, color: 'var(--color-primary-maroon)' }}
      >
        {title}
      </h3>
      <p className="walker-body" style={{ fontSize: 14, lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}
