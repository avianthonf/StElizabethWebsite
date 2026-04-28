'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap-config';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { HeroMasked } from '@/components/sections/HeroMasked';
import { StickySplitSection } from '@/components/sections/StickySplitSection';
import { WalkHeader } from '@/components/layout/WalkHeader';
import { Carousel } from '@/components/ui/Carousel';
import { SkeletonLoader } from '@/components/ui/SkeletonLoader';

function handleImageLoad() {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
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
function ValueCard({
  item,
  onImageLoad,
}: {
  item: typeof values[0];
  onImageLoad: () => void;
}) {
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        minWidth: 0,
      }}
    >
      <div style={{ position: 'relative', marginBottom: 16 }}>
        <div style={{ aspectRatio: '1', overflow: 'hidden', borderRadius: 4, position: 'relative' }}>
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              left: 'clamp(-10px, -0.8vw, -18px)',
              bottom: 'clamp(10px, 1.6vw, 20px)',
              zIndex: 1,
              pointerEvents: 'none',
              userSelect: 'none',
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: 'clamp(4rem, 8vw, 7rem)',
              lineHeight: 0.85,
              letterSpacing: '-0.08em',
              color: 'rgba(255,255,255,0.78)',
              textShadow: '0 10px 24px rgba(0,0,0,0.14)',
              maxWidth: '70%',
            }}
          >
            {item.number}
          </div>
          <Image
            src={item.image}
            alt={item.title}
            onLoad={onImageLoad}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            style={{ objectFit: 'cover' }}
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
          gap: 6,
          minHeight: 44,
          padding: '10px 14px 10px 0',
          fontFamily: 'var(--font-heading)',
          fontWeight: 700,
          fontSize: 11,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          color: 'var(--color-text-dark)',
          textDecoration: 'none',
        }}
      >
        Learn More
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </a>
    </article>
  );
}

// Passions panel
function PassionsPanel({
  bg,
  textColor,
  number,
  label,
  description,
  image,
  imagePosition,
  onImageLoad,
}: {
  bg: string;
  textColor: string;
  number: string;
  label: string;
  description: string;
  image: string;
  imagePosition: "left" | "right";
  onImageLoad: () => void;
}) {
  const descColor = bg === "var(--color-text-main)" ? "rgba(255,255,255,0.7)" : bg === "var(--color-primary-maroon)" ? "rgba(255,255,255,0.85)" : "rgba(51,51,51,0.7)";
  const overlayOpacityByBackground: Record<string, number> = {
    'var(--color-white)': 0.08,
    'var(--color-primary-maroon)': 0.06,
    'var(--color-text-main)': 0.06,
  };
  const overlayOpacity = overlayOpacityByBackground[bg] ?? 0.06;

  return (
    <div
      style={{
        backgroundColor: bg,
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          opacity: overlayOpacity,
          fontFamily: 'var(--font-heading)',
          fontWeight: 900,
          fontSize: 'clamp(8rem, 20vw, 22rem)',
          lineHeight: 1,
          letterSpacing: '-0.06em',
          color: textColor,
        }}
      >
        {number}
      </div>
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
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            position: 'relative',
            height: '60vh',
            width: 'min(40%, 420px)',
            maxWidth: '40%',
            flexShrink: 0,
          }}
        >
          <Image
            src={image}
            alt={label}
            onLoad={onImageLoad}
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            style={{
              objectFit: 'contain',
              filter: bg === 'var(--color-text-main)' ? 'brightness(1.15) drop-shadow(0 20px 50px rgba(0,0,0,0.4))' : 'drop-shadow(0 20px 50px rgba(0,0,0,0.15))',
            }}
          />
        </div>
        <div style={{ maxWidth: 420, position: 'relative', zIndex: 1 }}>
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

function DivisionsTabsHorizontal({
  divisions,
  onImageLoad,
}: {
  divisions: DivisionItem[];
  onImageLoad: () => void;
}) {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeDivision = divisions[active];
  const tabTransition = prefersReducedMotion
    ? 'none'
    : 'background-color 0.42s cubic-bezier(0.25, 1, 0.5, 1), color 0.42s cubic-bezier(0.25, 1, 0.5, 1), transform 0.42s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.42s cubic-bezier(0.25, 1, 0.5, 1)';
  const imageTransition = prefersReducedMotion
    ? 'none'
    : 'transform 0.48s cubic-bezier(0.25, 1, 0.5, 1), filter 0.48s cubic-bezier(0.25, 1, 0.5, 1)';

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: 'var(--color-white)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(56px, 8vw, 96px) clamp(24px, 4vw, 60px)',
      }}
    >
      <p className="text-overline" style={{ marginBottom: 12 }}>
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
          gridTemplateColumns: '200px minmax(0, 1fr)',
          gap: 56,
          alignItems: 'center',
        }}
      >

        {/* Tab buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {divisions.map((div, i) => {
            const isActive = i === active;

            return (
              <button
                key={div.id}
                onClick={() => setActive(i)}
                style={{
                  padding: '14px 18px',
                  textAlign: 'left',
                  background: isActive ? 'var(--color-primary-maroon)' : 'rgba(94, 22, 36, 0.04)',
                  color: isActive ? 'var(--color-white)' : 'var(--color-text-dark)',
                  border: 'none',
                  borderRadius: 2,
                  cursor: 'pointer',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 'clamp(0.75rem, 0.9vw, 0.875rem)',
                  letterSpacing: '0.04em',
                  boxShadow: isActive ? '0 10px 24px rgba(94,22,36,0.12)' : 'none',
                  transform: 'translateX(0)',
                  transition: tabTransition,
                }}
              >
                {div.label}
              </button>
            );
          })}
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
          <div
            style={{
              position: 'relative',
              width: 'min(32vw, 420px)',
              height: '100%',
              maxHeight: 400,
              overflow: 'hidden',
              borderRadius: 2,
              flexShrink: 0,
              boxShadow: '0 28px 60px rgba(0,0,0,0.14)',
            }}
          >
            <Image
              key={activeDivision.id}
              src={activeDivision.image}
              alt={activeDivision.heading}
              onLoad={onImageLoad}
              fill
              sizes="(max-width: 768px) 100vw, 32vw"
              style={{
                objectFit: 'cover',
                borderRadius: 2,
                transform: 'scale(1.03)',
                filter: 'contrast(1.02) saturate(0.96)',
                transition: imageTransition,
              }}
            />
          </div>
          <div style={{ flex: 1, maxWidth: 500, paddingRight: 'clamp(8px, 2vw, 32px)' }}>
            <p
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 'clamp(0.72rem, 0.9vw, 0.875rem)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-primary-maroon)',
                marginBottom: 10,
              }}
            >
              {activeDivision.label}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 900,
                fontSize: 'clamp(1.4rem, 2.4vw, 2rem)',
                lineHeight: 1.05,
                color: 'var(--color-text-dark)',
                marginBottom: 14,
              }}
            >
              {activeDivision.heading}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                lineHeight: 1.65,
                color: 'var(--color-gray)',
                marginBottom: 22,
                maxWidth: 420,
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
                minHeight: 44,
                padding: '10px 14px 10px 0',
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function FooterCtaSection({
  image,
  onImageLoad,
}: {
  image: string;
  onImageLoad: () => void;
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const activate = window.setTimeout(() => {
      setHasEntered(true);
    }, 80);

    return () => {
      window.clearTimeout(activate);
    };
  }, [prefersReducedMotion]);

  const isActive = prefersReducedMotion || hasEntered;

  const overlayTransition = prefersReducedMotion
    ? 'none'
    : 'opacity 0.7s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.7s cubic-bezier(0.25, 1, 0.5, 1)';
  const contentTransition = prefersReducedMotion
    ? 'none'
    : 'opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)';
  const imageTransition = prefersReducedMotion
    ? 'none'
    : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), filter 0.6s cubic-bezier(0.25, 1, 0.5, 1)';

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Image
        src={image}
        alt="St. Elizabeth campus aerial view"
        onLoad={onImageLoad}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          transform: isActive ? 'scale(1.02)' : 'scale(1.08)',
          filter: isActive ? 'brightness(0.82) saturate(0.96)' : 'brightness(0.72) saturate(0.9)',
          transition: imageTransition,
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
          backgroundColor: isActive ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.54)',
          transition: overlayTransition,
        }}
      >
        <div
          style={{
            opacity: isActive ? 1 : 0,
            transform: isActive ? 'translateY(0)' : 'translateY(28px)',
            transition: contentTransition,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 760,
            padding: '0 clamp(24px, 4vw, 60px)',
            textAlign: 'center',
          }}
        >
          <p className="text-overline" style={{ color: 'rgba(255,255,255,0.82)', marginBottom: 16 }}>
            Admissions
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 900,
              fontSize: 'clamp(3rem, 10vw, 10rem)',
              lineHeight: 0.9,
              color: 'var(--color-white)',
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              marginBottom: 28,
              textShadow: '0 18px 44px rgba(0,0,0,0.22)',
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
              maxWidth: 520,
              textAlign: 'center',
              lineHeight: 1.65,
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
              minHeight: 48,
              padding: '16px 28px',
              backgroundColor: 'var(--color-white)',
              color: 'var(--color-text-dark)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 'clamp(0.7rem, 0.9vw, 0.8rem)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              borderRadius: 2,
              boxShadow: '0 16px 36px rgba(0,0,0,0.16)',
            }}
          >
            Start the Application Process
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      setMounted(true);
    });
  }, []);

  const handlePageImageLoad = () => {
    handleImageLoad();
  };

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
      <main aria-label="Homepage sections">
        <div style={{ minHeight: '100vh', overflow: 'hidden' }}>
          <HeroMasked heroImage={IMAGES.heroCampus} />
        </div>

        <section
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(56px, 8vw, 96px) clamp(24px, 4vw, 60px)',
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
          <Carousel
            options={{ align: 'start', loop: false, dragFree: false, containScroll: 'trimSnaps' }}
            className="values-carousel"
            showDots={false}
          >
            {values.map((item) => (
              <div
                key={item.number}
                style={{
                  flex: '0 0 clamp(240px, 22vw, 320px)',
                  minWidth: 0,
                  paddingRight: 'clamp(16px, 2vw, 28px)',
                }}
              >
                <ValueCard item={item} onImageLoad={handlePageImageLoad} />
              </div>
            ))}
          </Carousel>
        </section>

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

        <PassionsPanel
          bg="var(--color-primary-maroon)"
          textColor="var(--color-white)"
          number="01"
          label="Athletics"
          description="From football to athletics, our sports programs build discipline, teamwork, and physical fitness. Students compete at district and state levels while developing character through sportsmanship."
          image={IMAGES.athleticsCutout}
          imagePosition="left"
          onImageLoad={handlePageImageLoad}
        />

        <PassionsPanel
          bg="var(--color-white)"
          textColor="var(--color-text-main)"
          number="02"
          label="Arts & Music"
          description="Creativity flourishes through music, drama, and visual arts. Our students perform in concerts, stage productions, and art exhibitions, discovering their talents and building confidence."
          image={IMAGES.artsCutout}
          imagePosition="right"
          onImageLoad={handlePageImageLoad}
        />

        <PassionsPanel
          bg="var(--color-text-main)"
          textColor="var(--color-white)"
          number="03"
          label="Academics"
          description="Rigorous curriculum aligned with SSC and HSC standards prepares students for university success. Our dedicated faculty challenge students to think critically and pursue excellence in every subject."
          image={IMAGES.academicsCutout}
          imagePosition="left"
          onImageLoad={handlePageImageLoad}
        />

        <DivisionsTabsHorizontal divisions={divisions} onImageLoad={handlePageImageLoad} />

        <FooterCtaSection image={IMAGES.campusAerial} onImageLoad={handlePageImageLoad} />
      </main>
    </>
  );
}