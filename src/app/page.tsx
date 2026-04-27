'use client';

import { useState, useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { HeroMasked } from "@/components/sections/HeroMasked";
import { StickySplitSection } from "@/components/sections/StickySplitSection";
import { WalkHeader } from "@/components/layout/WalkHeader";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";

// Debounce utility for resize handler
function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// PLACEHOLDER: Using Walker School images until St. Elizabeth photos provided
const IMAGES = {
  heroCampus: "/images/videocover2-812-optimized.webp",
  faith: "/images/Curiosity-310-optimized.webp",
  excellence: "/images/dignity-311-optimized.webp",
  service: "/images/Honor-312-optimized.webp",
  community: "/images/Kindness-309-optimized.webp",
  studentPortrait: "/images/Bitmap12-11-optimized.webp",
  gallery1: "/images/experiencegridhomejacob-662.jpg",
  gallery2: "/images/experiencegridhomemiddleschoolclassroom-663.jpg",
  gallery3: "/images/experiencegridhomeavi-661.jpg",
  gallery4: "/images/experiencegrdhomefootballmiddleschool-660.jpg",
  mission1: "/images/tws_fall2022298min_317-optimized.webp",
  mission2: "/images/tws_commencement-99-optimized.webp",
  mission3: "/images/experiencegridhomevollyball-671.jpg",
  mission4: "/images/lowerschoolsciencemyles-537-Experience-Grid_1849.webp",
  athleticsCutout: "/images/athleticscutout-825.png",
  artsCutout: "/images/experiencegridhomeprimaryschool-672.jpg",
  academicsCutout: "/images/Emmy_Cutout-813.png",
  grade8: "/images/middleschoolboys-617-Experience-Grid_2147.webp",
  grade9: "/images/experiencegridhomeupperschool-668.jpg",
  grade10: "/images/experiencegridlowerschool-670.jpg",
  grade11: "/images/experiencegridhomeprimaryschool-672.jpg",
  grade12: "/images/tws_commencement-99-optimized.webp",
  campusAerial: "/images/tws_fall2448-980-optimized.webp",
};

const values = [
  { number: "01", image: IMAGES.faith, title: "Faith", description: "Rooted in Catholic tradition, we nurture spiritual growth through prayer, sacraments, and service to others." },
  { number: "02", image: IMAGES.excellence, title: "Excellence", description: "We challenge every student to reach their full potential through rigorous academics and dedicated mentorship." },
  { number: "03", image: IMAGES.service, title: "Service", description: "Following Christ's example, we serve our community and those in need with compassion and generosity." },
  { number: "04", image: IMAGES.community, title: "Community", description: "We build a family where every student is known, valued, and supported in their journey of growth." },
];

const divisions = [
  { id: "grade-8", label: "Grade 8", heading: "Grade 8", description: "Students begin their high school journey with a strong foundation in core subjects.", image: IMAGES.grade8, cta: "Learn About Grade 8" },
  { id: "grade-9", label: "Grade 9", heading: "Grade 9", description: "Building on foundational skills, Grade 9 students explore diverse subjects.", image: IMAGES.grade9, cta: "Learn About Grade 9" },
  { id: "grade-10", label: "Grade 10 (SSC)", heading: "Grade 10 — SSC Board", description: "The SSC year is a milestone. Students prepare for board examinations.", image: IMAGES.grade10, cta: "Learn About Grade 10" },
  { id: "grade-11", label: "Grade 11", heading: "Grade 11", description: "Students choose their stream and begin specialized study.", image: IMAGES.grade11, cta: "Learn About Grade 11" },
  { id: "grade-12", label: "Grade 12 (HSC)", heading: "Grade 12 — HSC Board", description: "The culmination of high school. Grade 12 students prepare for HSC board exams.", image: IMAGES.grade12, cta: "Learn About Grade 12" },
];

// Individual value card
function ValueCard({ item }: { item: typeof values[0] }) {
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <span
          style={{
            position: 'absolute',
            top: -6,
            left: -6,
            zIndex: 1,
            fontFamily: 'var(--font-heading)',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 3vw, 3rem)',
            lineHeight: 1,
            color: 'var(--color-brand-maroon)',
          }}
        >
          {item.number}
        </span>
        <div style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: 4 }}>
          <img
            src={item.image}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
      <h3
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: 'clamp(0.75rem, 1vw, 0.9rem)',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--color-text-dark)',
          marginBottom: 8,
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          lineHeight: 1.5,
          color: 'var(--color-gray)',
          marginBottom: 12,
        }}
      >
        {item.description}
      </p>
      <a
        href="#"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: 10,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-dark)',
          textDecoration: 'none',
        }}
      >
        Learn More
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </article>
  );
}

// Passions panel
function PassionsPanel({ bg, textColor, number, label, description, image, imagePosition }: {
  bg: string; textColor: string; number: string; label: string; description: string; image: string; imagePosition: "left" | "right";
}) {
  const descColor = bg === "var(--color-text-main)" ? "rgba(255,255,255,0.7)" : bg === "var(--color-primary-maroon)" ? "rgba(255,255,255,0.85)" : "rgba(51,51,51,0.7)";
  return (
    <div
      style={{
        backgroundColor: bg,
        minWidth: '100vw',
        height: '100vh',
        flexShrink: 0,
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
          gap: 'clamp(32px, 6vw, 80px)',
          padding: '0 clamp(24px, 4vw, 60px)',
          width: '100%',
          maxWidth: 1200,
          margin: '0 auto',
          flexDirection: imagePosition === 'right' ? 'row' : 'row-reverse',
        }}
      >
        <img
          src={image}
          alt={label}
          style={{
            maxHeight: '60vh',
            maxWidth: '40%',
            objectFit: 'contain',
            filter: bg === 'var(--color-text-main)' ? 'brightness(1.15) drop-shadow(0 20px 50px rgba(0,0,0,0.4))' : 'drop-shadow(0 20px 50px rgba(0,0,0,0.15))',
          }}
        />
        <div style={{ maxWidth: 420 }}>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(0.7rem, 0.9vw, 0.875rem)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: textColor,
              marginBottom: 12,
            }}
          >
            {number}
          </p>
          <h3
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
              lineHeight: 1.1,
              color: textColor,
              marginBottom: 16,
            }}
          >
            {label}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.875rem, 1vw, 1rem)',
              lineHeight: 1.6,
              color: descColor,
            }}
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Divisions tabs for horizontal scroll
interface DivisionItem {
  id: string;
  label: string;
  heading: string;
  description: string;
  image: string;
  cta: string;
}

function DivisionsTabsHorizontal({ divisions }: { divisions: DivisionItem[] }) {
  const [active, setActive] = useState(0);
  const activeDivision = divisions[active];

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        backgroundColor: 'var(--color-white)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 clamp(24px, 4vw, 60px)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: 'clamp(0.7rem, 0.9vw, 0.875rem)',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--color-brand-maroon)',
          marginBottom: 12,
        }}
      >
        Academic Divisions
      </p>
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          fontSize: 'clamp(1.75rem, 3.5vw, 3rem)',
          lineHeight: 1.1,
          color: 'var(--color-text-dark)',
          marginBottom: 32,
        }}
      >
        Our Grades
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: 40,
          alignItems: 'center',
        }}
      >
        {/* Tab buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {divisions.map((div, i) => (
            <button
              key={div.id}
              onClick={() => setActive(i)}
              style={{
                padding: '12px 16px',
                textAlign: 'left',
                background: i === active ? 'var(--color-primary-maroon)' : 'transparent',
                color: i === active ? 'var(--color-white)' : 'var(--color-gray)',
                border: 'none',
                borderRadius: 4,
                cursor: 'pointer',
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
                transition: 'all 0.2s',
              }}
            >
              {div.label}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            height: '100%',
            maxHeight: 400,
          }}
        >
          <img
            src={activeDivision.image}
            alt={activeDivision.heading}
            style={{
              width: 'auto',
              height: '100%',
              maxHeight: 400,
              objectFit: 'cover',
              borderRadius: 8,
            }}
          />
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
                color: 'var(--color-text-dark)',
                marginBottom: 12,
              }}
            >
              {activeDivision.heading}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                lineHeight: 1.6,
                color: 'var(--color-gray)',
                marginBottom: 20,
              }}
            >
              {activeDivision.description}
            </p>
            <a
              href="#"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--color-text-dark)',
                textDecoration: 'none',
              }}
            >
              {activeDivision.cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Full-page horizontal scroll setup
  useEffect(() => {
    if (!mounted || !scrollContainerRef.current || !trackRef.current) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current!;
      const container = scrollContainerRef.current!;

      const totalWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      const travelDistance = totalWidth - viewportWidth;

      // The scroll distance is horizontal pixels, so the container height must
      // also be set in pixels. Using `vh` here under-allocates scroll space on
      // wide screens (e.g. 1920×1080), which makes later sections unreachable
      // and leaves you staring at the white background of the current section.
      container.style.height = `${travelDistance + window.innerHeight}px`;

      // Keep one viewport of extra space so the pin can fully release cleanly.
      container.style.minHeight = `${travelDistance + window.innerHeight * 2}px`;

      // Create horizontal scroll animation
      // scrub: 1.2 = 1.2s lag behind scroll = "heavy premium feel"
      gsap.to(track, {
        x: -travelDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${travelDistance}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Dispatch progress events for child section animations
          onUpdate: (self) => {
            const progress = self.progress;

            // Hero section occupies ~12% of horizontal travel (1 of 9 sections)
            window.dispatchEvent(new CustomEvent('horizontal-scroll-progress', {
              detail: { progress },
            }));

            window.dispatchEvent(new CustomEvent('horizontal-scroll-hero', {
              detail: { progress },
            }));
          },
        },
      });
    }, scrollContainerRef);

    // Handle resize
    const handleResize = debounce(() => {
      ScrollTrigger.refresh();
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <>
        <WalkHeader />
        <main>
          <SkeletonLoader variant="section" />
        </main>
      </>
    );
  }

  return (
    <>
      <WalkHeader />

      {/* Full-page horizontal scroll container — height set dynamically by GSAP useEffect */}
      <div
        ref={scrollContainerRef}
        style={{ minHeight: '900vh', position: 'relative' }}
        aria-label="Homepage sections"
      >
        {/* Sticky track that moves horizontally */}
        <div
          ref={trackRef}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            overflow: 'hidden',
            willChange: 'transform',
          }}
        >
          {/* SECTION 1: Hero */}
          <div style={{ minWidth: '100vw', height: '100vh', flexShrink: 0, overflow: 'hidden' }}>
            <HeroMasked heroImage={IMAGES.heroCampus} />
          </div>

          {/* SECTION 2: We Value */}
          <div
            style={{
              minWidth: '100vw',
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 clamp(24px, 4vw, 60px)',
              backgroundColor: 'var(--color-white)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 5vw, 5rem)',
                lineHeight: 1,
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                color: 'var(--color-text-dark)',
                marginBottom: 40,
              }}
            >
              We Value
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 'clamp(16px, 3vw, 32px)',
              }}
              className="values-grid"
            >
              {values.map((item) => (
                <ValueCard key={item.number} item={item} />
              ))}
            </div>
          </div>

          {/* SECTION 3: Accolades */}
          <StickySplitSection
            overline="Recognized for Excellence"
            heading="A Legacy of Faith and Learning"
            body="For over five decades, St. Elizabeth High School has been a pillar of Catholic education in Goa. Our students excel academically, grow spiritually, and serve their community with distinction."
            accordion={[
              { title: "Academic Achievement", content: "Our students consistently achieve top results in SSC and HSC examinations, with many gaining admission to India's premier universities and colleges." },
              { title: "Faith Formation", content: "Daily prayer, regular Mass, retreats, and service projects form the spiritual foundation of our school community." },
              { title: "Community Impact", content: "Through service learning and outreach programs, our students make a tangible difference in Pomburpa and surrounding communities." },
            ]}
            leftImage={IMAGES.studentPortrait}
            rightImages={[IMAGES.gallery1, IMAGES.gallery2, IMAGES.gallery3, IMAGES.gallery4]}
            backgroundColor="white"
          />

          {/* SECTION 4: Mission */}
          <StickySplitSection
            overline="Our Purpose"
            heading="Mission & Vision"
            body="St. Elizabeth High School exists to form young men and women of faith, character, and academic excellence. Rooted in Catholic values and inspired by the example of St. Elizabeth, we prepare students to lead lives of purpose, service, and integrity."
            accordion={[
              { title: "Our History", content: "Founded in the heart of Goa, St. Elizabeth High School has served generations of families in Pomburpa and throughout the region." },
              { title: "Our Catholic Identity", content: "As a Catholic school, we integrate faith into every aspect of learning. Daily prayer, religious education, sacramental preparation, and service to others form the heart of the St. Elizabeth experience." },
              { title: "Our Vision", content: "We envision graduates who are intellectually curious, spiritually grounded, and committed to serving others." },
            ]}
            rightImages={[IMAGES.mission1, IMAGES.mission2, IMAGES.mission3, IMAGES.mission4]}
            backgroundColor="light"
          />

          {/* SECTION 5: Athletics */}
          <PassionsPanel
            bg="var(--color-primary-maroon)"
            textColor="var(--color-white)"
            number="01"
            label="Athletics"
            description="From football to athletics, our sports programs build discipline, teamwork, and physical fitness. Students compete at district and state levels while developing character through sportsmanship."
            image={IMAGES.athleticsCutout}
            imagePosition="left"
          />

          {/* SECTION 6: Arts */}
          <PassionsPanel
            bg="var(--color-white)"
            textColor="var(--color-text-main)"
            number="02"
            label="Arts & Music"
            description="Creativity flourishes through music, drama, and visual arts. Our students perform in concerts, stage productions, and art exhibitions, discovering their talents and building confidence."
            image={IMAGES.artsCutout}
            imagePosition="right"
          />

          {/* SECTION 7: Academics */}
          <PassionsPanel
            bg="var(--color-text-main)"
            textColor="var(--color-white)"
            number="03"
            label="Academics"
            description="Rigorous curriculum aligned with SSC and HSC standards prepares students for university success. Our dedicated faculty challenge students to think critically and pursue excellence in every subject."
            image={IMAGES.academicsCutout}
            imagePosition="left"
          />

          {/* SECTION 8: Divisions Tabs */}
          <DivisionsTabsHorizontal divisions={divisions} />

          {/* SECTION 9: Footer CTA */}
          <div
            style={{
              minWidth: '100vw',
              height: '100vh',
              flexShrink: 0,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src={IMAGES.campusAerial}
              alt="St. Elizabeth campus aerial view"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(0,0,0,0.45)',
              }}
            >
              <h2
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 900,
                  fontSize: 'clamp(3rem, 10vw, 10rem)',
                  lineHeight: 0.9,
                  color: 'var(--color-white)',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.03em',
                  marginBottom: 32,
                }}
              >
                Begin Your Journey
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 1.3vw, 1.125rem)',
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: 32,
                  maxWidth: 500,
                  textAlign: 'center',
                }}
              >
                St. Elizabeth High School welcomes students who are ready to grow in faith, pursue excellence, and serve others.
              </p>
              <a
                href="/admissions"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '16px 28px',
                  backgroundColor: 'var(--color-white)',
                  color: 'var(--color-text-dark)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  textDecoration: 'none',
                }}
              >
                Start the Application Process
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}