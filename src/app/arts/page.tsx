import type { Metadata } from 'next';
import { ContentPage, PageHero } from '@/components/templates/ContentPage';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Arts | St. Elizabeth High School',
  description: 'Creativity and expression at St. Elizabeth High School. Visual arts, music, drama, and dance programs in Pomburpa, Goa.',
};

export default function ArtsPage() {
  return (
    <ContentPage>
      <Breadcrumbs items={[{ label: 'Arts', href: '/arts' }]} />
      <PageHero
        title="Arts"
        description="Creativity & Expression"
        backgroundImage="/images/campus-2.jpg"
      />

      {/* Arts Philosophy Section */}
      <section style={{ marginBottom: 'var(--section-padding-y)' }}>
        <h2
          className="walker-heading"
          style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 32 }}
        >
          Where Creativity Flourishes
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
            At St. Elizabeth High School, the arts are not an afterthought — they are integral to
            our mission of forming the whole person. Through visual arts, music, drama, and dance,
            students discover beauty, express truth, and develop their God-given creative gifts.
          </p>
          <p style={{ marginBottom: 24 }}>
            We believe that artistic expression is a pathway to understanding ourselves, others,
            and the divine. The arts teach students to see the world with fresh eyes, to communicate
            ideas that transcend words, and to appreciate the beauty that surrounds us. Our arts
            programs nurture imagination, discipline, and the courage to create.
          </p>
          <p>
            From painting and sculpture to choir and theatre, St. Elizabeth students explore diverse
            artistic mediums and discover their unique creative voices. Our faculty are practicing
            artists who inspire students to take risks, embrace vulnerability, and pursue excellence
            in their craft.
          </p>
        </div>
      </section>

      {/* Arts Programs Section */}
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
            Our Programs
          </p>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(32px, 4vw, 56px)', marginBottom: 48 }}
          >
            Arts Curriculum
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 40,
            }}
          >
            <ArtsCard
              title="Visual Arts"
              description="Drawing, painting, sculpture, printmaking, and digital art. Students explore diverse mediums and develop technical skills while expressing their unique artistic vision."
            />
            <ArtsCard
              title="Music"
              description="Choir, instrumental ensembles, music theory, and composition. Students learn to read music, perform in groups, and appreciate diverse musical traditions."
            />
            <ArtsCard
              title="Drama & Theatre"
              description="Acting, stagecraft, directing, and playwriting. Students develop confidence, collaboration skills, and storytelling abilities through theatrical performance."
            />
            <ArtsCard
              title="Dance"
              description="Classical Indian dance, contemporary dance, and choreography. Students explore movement as a form of expression and cultural celebration."
            />
          </div>
        </div>
      </section>

      {/* Cutout Panel Style Sections */}
      <section style={{ marginBottom: 'var(--section-padding-y)' }}>
        {/* Panel 1: Visual Arts */}
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
              <p style={{ fontSize: 14, color: 'var(--color-gray)' }}>
                [Student artwork photo]
              </p>
            </div>
            <div>
              <p className="walker-overline" style={{ marginBottom: 16 }}>
                Visual Arts
              </p>
              <h2
                className="walker-heading"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 24 }}
              >
                Seeing the World Through Art
              </h2>
              <p
                className="walker-body"
                style={{ fontSize: 17, lineHeight: 1.7, color: 'var(--color-text-body)' }}
              >
                Our visual arts program encourages students to observe closely, think creatively,
                and express themselves through diverse mediums. From traditional drawing and painting
                to sculpture and digital art, students develop technical skills while exploring their
                unique artistic voice. Annual art exhibitions showcase student work and celebrate
                creative achievement.
              </p>
            </div>
          </div>
        </div>

        {/* Panel 2: Performing Arts */}
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
                Performing Arts
              </p>
              <h2
                className="walker-heading"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 24 }}
              >
                The Stage as Classroom
              </h2>
              <p
                className="walker-body"
                style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)' }}
              >
                Theatre, music, and dance teach students to collaborate, take risks, and communicate
                with authenticity. Our performing arts programs build confidence, empathy, and
                creative problem-solving skills. Students perform in annual productions, concerts,
                and recitals, sharing their talents with the school community and beyond.
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
                [Theatre/music performance photo]
              </p>
            </div>
          </div>
        </div>

        {/* Panel 3: Arts Facilities */}
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
                [Art studio/theatre photo]
              </p>
            </div>
            <div>
              <p className="walker-overline" style={{ marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>
                Our Facilities
              </p>
              <h2
                className="walker-heading"
                style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 24 }}
              >
                Spaces for Creative Expression
              </h2>
              <p
                className="walker-body"
                style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)' }}
              >
                St. Elizabeth features dedicated arts facilities including art studios with natural
                light, a black box theatre for performances, music practice rooms, a dance studio
                with mirrors and barres, and a gallery space for student exhibitions. Our facilities
                provide students with professional-quality spaces to create, rehearse, and perform.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Arts Integration Section */}
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
            Faith & Creativity
          </p>
          <h2
            className="walker-heading"
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 32 }}
          >
            Art as Prayer
          </h2>
          <p
            className="walker-body"
            style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.9)', marginBottom: 24 }}
          >
            At St. Elizabeth, we believe that creating art is a form of prayer — a way of
            participating in God's creative work and reflecting His beauty. Our arts programs
            integrate faith and creativity, helping students see their artistic gifts as a calling
            to serve others and glorify God through beauty, truth, and excellence.
          </p>
        </div>
      </section>
    </ContentPage>
  );
}

// Arts Card Component (inline, single-use)
function ArtsCard({
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
