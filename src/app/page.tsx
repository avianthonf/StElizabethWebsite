import { HeroMaskSection } from "@/components/sections/HeroMaskSection";
import { ValuesScrollCarousel } from "@/components/sections/ValuesScrollCarousel";
import { StickySplitSection } from "@/components/sections/StickySplitSection";
import { DivisionsTabs } from "@/components/sections/DivisionsTabs";
import { FooterCtaSection } from "@/components/sections/FooterCtaSection";
import { WalkHeader } from "@/components/layout/WalkHeader";

export default function Home() {
  return (
    <>
      <WalkHeader />

      <main>
        {/* SECTION 1: Hero — WE BELIEVE with clipping mask */}
        <HeroMaskSection />

        {/* SECTION 2: We Value — scroll-linked horizontal carousel */}
        <ValuesScrollCarousel />

        {/* SECTION 3: Accolades — sticky left / scrolling right */}
        <StickySplitSection
          overline="That's Why, For the Eighth Year in a Row"
          heading="Cobb County's Best Private School"
          body="Parents consistently choose The Walker School for its exceptional academics, caring community, and values-driven environment. Our students thrive because of our commitment to the whole person — mind, body, and spirit."
          accordion={[
            {
              title: 'Academic Excellence',
              content:
                'Our students consistently score in the top percentiles on national assessments and gain admission to the most selective colleges and universities.',
            },
            {
              title: 'Athletics & Arts',
              content:
                'State championships, national recognition in the arts, and a full range of extracurricular activities ensure every student finds their passion.',
            },
            {
              title: 'Community & Values',
              content:
                'Parent satisfaction surveys consistently show that our families choose Walker for the caring community, Christian environment, and excellent teachers.',
            },
          ]}
          rightImages={[
            '/images/student-1.jpg',
            '/images/gallery-2.jpg',
            '/images/gallery-3.jpg',
            '/images/gallery-4.jpg',
          ]}
        />

        {/* SECTION 4: Mission — sticky left / scrolling right */}
        <StickySplitSection
          overline="Discovering"
          heading="Our Mission"
          body="The Walker School exists to inspire and equip students to pursue excellence in academics, character, and service — forming men and women who make a difference in the world."
          accordion={[
            {
              title: 'Our Story',
              content:
                'Founded in 1965, The Walker School has grown from a small Christian academy into one of the region\'s most respected independent schools, serving students from PK3 through 12th grade.',
            },
            {
              title: 'Our Faith',
              content:
                'As a Christian school, we integrate faith into every aspect of learning. Weekly chapel, service projects, and a faculty committed to spiritual formation are central to the Walker experience.',
            },
          ]}
          rightImages={[
            '/images/mission-1.jpg',
            '/images/mission-2.jpg',
            '/images/mission-3.jpg',
            '/images/mission-4.jpg',
          ]}
        />

        {/* SECTION 5: Discover Your Passions — cutout panels */}
        <div style={{ backgroundColor: 'var(--walker-white)' }}>
          <div className="walker-container" style={{ paddingTop: 'var(--section-padding-y)', paddingBottom: 40 }}>
            <p className="walker-overline" style={{ marginBottom: 16 }}>A Well-Rounded Education</p>
            <h2 className="walker-heading" style={{ fontSize: 'clamp(36px, 5vw, 72px)', marginBottom: 40 }}>
              Discover Your Passions
            </h2>
          </div>

          {/* Cutout panels — alternating backgrounds */}
          {[
            { bg: 'var(--walker-maroon)', text: 'var(--walker-white)', label: 'Athletics', image: '/images/athletics-cutout.png' },
            { bg: 'var(--walker-white)', text: 'var(--walker-black)', label: 'Arts', image: '/images/arts-cutout.png' },
            { bg: 'var(--walker-black)', text: 'var(--walker-white)', label: 'Academics', image: '/images/academics-cutout.png' },
          ].map((panel, i) => (
            <div
              key={i}
              className="cutout-panel"
              style={{
                backgroundColor: panel.bg,
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'clamp(40px, 8vw, 120px)',
                  padding: '0 var(--container-padding)',
                  width: '100%',
                  maxWidth: 'var(--container-max)',
                  margin: '0 auto',
                  flexDirection: i % 2 === 0 ? 'row' : 'row-reverse',
                }}
              >
                <img
                  src={panel.image}
                  alt={panel.label}
                  style={{
                    maxHeight: '70vh',
                    maxWidth: '45%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.3))',
                  }}
                />
                <div style={{ maxWidth: 480 }}>
                  <p
                    className="walker-overline"
                    style={{ color: panel.text, marginBottom: 16 }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3
                    className="walker-heading"
                    style={{
                      fontSize: 'clamp(32px, 4vw, 56px)',
                      color: panel.text,
                      marginBottom: 24,
                    }}
                  >
                    {panel.label}
                  </h3>
                  <p
                    className="walker-body"
                    style={{
                      color: i === 2 ? 'rgba(255,255,255,0.7)' : 'rgba(51,51,51,0.7)',
                      fontSize: 17,
                    }}
                  >
                    {panel.label === 'Athletics' &&
                      'From state championships to personal bests, our athletic program builds character through competition. 23 sports, 70+ teams, and a philosophy that prioritizes both excellence and sportsmanship.'}
                    {panel.label === 'Arts' &&
                      'Creativity flourishes here — from award-winning theatre productions to studio art exhibitions. Every student participates in the arts, developing confidence, expression, and an appreciation for beauty.'}
                    {panel.label === 'Academics' &&
                      'Rigorous college-preparatory curriculum, dedicated faculty, and a culture of high expectations. Our students consistently gain admission to the nation\'s most selective colleges and universities.'}
                  </p>
                </div>
              </div>

              {/* Plus button at bottom center */}
              <button
                className="cutout-panel-circle-btn"
                style={{ color: panel.text, borderColor: panel.text }}
                aria-label={`Learn more about ${panel.label}`}
              >
                +
              </button>
            </div>
          ))}
        </div>

        {/* SECTION 6: Divisions Tabs */}
        <DivisionsTabs />

        {/* SECTION 7: Footer CTA */}
        <FooterCtaSection />
      </main>
    </>
  );
}