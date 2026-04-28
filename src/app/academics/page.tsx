import type { Metadata } from 'next';
import { ContentPage, PageHero } from '@/components/templates/ContentPage';
import { StickySplitSection } from '@/components/sections/StickySplitSection';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Academics | St. Elizabeth High School',
  description: 'Excellence in Catholic education at St. Elizabeth High School, Pomburpa, Goa. College-preparatory curriculum integrating faith, academics, and character development.',
};

export default function AcademicsPage() {
  return (
    <ContentPage>
      <Breadcrumbs items={[{ label: 'Academics', href: '/academics' }]} />
      <PageHero
        title="Academics"
        description="Excellence in Education"
        backgroundImage="/images/campus-1.jpg"
      />
      {/* Academic Philosophy Section */}
      <section style={{ marginBottom: 'var(--section-padding-y)' }}>
        <h2
          className="walker-heading"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 32 }}
        >
          Faith-Integrated Learning
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
            At St. Elizabeth High School, academic excellence is inseparable from spiritual formation.
            Our college-preparatory curriculum challenges students to think critically, communicate
            effectively, and pursue truth in all its forms — always grounded in Catholic values and
            the dignity of the human person.
          </p>
          <p style={{ marginBottom: 24 }}>
            We believe education is not merely the accumulation of knowledge, but the formation of
            the whole person — mind, body, and spirit. Our faculty are dedicated mentors who inspire
            intellectual curiosity while nurturing each student&apos;s unique gifts and calling.
          </p>
          <p>
            From rigorous STEM courses to rich humanities and arts programs, St. Elizabeth students
            are prepared not only for university success, but for lives of purpose, leadership, and
            service to God and neighbor.
          </p>
        </div>
      </section>

      {/* Divisions Overview with StickySplitSection */}
      <StickySplitSection
        overline="Our Divisions"
        heading="Tailored Education for Every Stage"
        body="St. Elizabeth High School serves students in grades 8-12, with specialized programs designed for each developmental stage. Our divisions ensure age-appropriate curriculum, pastoral care, and co-curricular opportunities."
        accordion={[
          {
            title: 'Middle School (Grades 8-9)',
            content: 'Foundation years focusing on core academic skills, faith formation, and social-emotional development. Students explore diverse subjects while building study habits and character virtues.',
          },
          {
            title: 'Upper School (Grades 10-12)',
            content: 'College-preparatory program with advanced coursework, leadership opportunities, and career exploration. Students prepare for board examinations and university admissions while deepening their faith commitment.',
          },
          {
            title: 'Honors & Advanced Programs',
            content: 'Accelerated tracks for high-achieving students in mathematics, sciences, humanities, and languages. Rigorous curriculum preparing students for competitive university programs and scholarship opportunities.',
          },
        ]}
        leftImage="/images/student-1.jpg"
        rightImages={[
          '/images/campus-2.jpg',
          '/images/campus-3.jpg',
        ]}
        backgroundColor="light"
      />

      {/* Curriculum Highlights Section */}
      <section
        style={{
          backgroundColor: 'var(--color-white)',
          padding: 'var(--section-padding-y) 0',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="walker-overline" style={{ marginBottom: 16 }}>
            Our Curriculum
          </p>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 48 }}
          >
            Comprehensive Academic Program
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 40,
            }}
          >
            <CurriculumCard
              title="STEM Excellence"
              description="Advanced mathematics, physics, chemistry, biology, and computer science. Laboratory-based learning with modern equipment and technology integration."
            />
            <CurriculumCard
              title="Humanities & Social Sciences"
              description="History, geography, economics, political science, and philosophy. Critical thinking and ethical reasoning rooted in Catholic social teaching."
            />
            <CurriculumCard
              title="Languages & Literature"
              description="English, Hindi, Konkani, and optional foreign languages. Literature study, creative writing, and communication skills development."
            />
            <CurriculumCard
              title="Arts Integration"
              description="Visual arts, music, drama, and dance woven throughout the curriculum. Creativity and aesthetic appreciation as pathways to truth and beauty."
            />
            <CurriculumCard
              title="Religious Studies"
              description="Systematic theology, Scripture, Church history, and moral formation. Daily prayer, liturgy, and sacramental preparation."
            />
            <CurriculumCard
              title="Physical Education"
              description="Sports, fitness, health education, and character development through athletics. Emphasis on teamwork, discipline, and sportsmanship."
            />
          </div>
        </div>
      </section>

      {/* College Preparation Section */}
      <section
        style={{
          backgroundColor: 'var(--color-primary-maroon)',
          color: 'var(--color-white)',
          padding: 'var(--section-padding-y) var(--container-padding)',
          margin: '0 calc(-1 * var(--container-padding))',
          marginTop: 'var(--section-padding-y)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <p className="walker-overline" style={{ marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>
            University Success
          </p>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 32 }}
          >
            Preparing for Higher Education
          </h2>
          <p
            className="walker-body"
            style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', marginBottom: 24 }}
          >
            St. Elizabeth graduates are accepted to leading universities across India and abroad.
            Our college counseling program provides personalized guidance for university selection,
            application preparation, and scholarship opportunities.
          </p>
          <p style={{ fontSize: 16, fontWeight: 600, letterSpacing: '0.05em' }}>
            100% of our graduates pursue higher education
          </p>
        </div>
      </section>
    </ContentPage>
  );
}

// Curriculum Card Component (inline, single-use)
function CurriculumCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h3
        className="walker-heading"
        style={{ fontSize: 20, marginBottom: 16, color: 'var(--color-primary-maroon)' }}
      >
        {title}
      </h3>
      <p className="walker-body" style={{ fontSize: 15, lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  );
}
