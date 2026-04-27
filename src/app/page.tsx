import { HeroMasked } from "@/components/sections/HeroMasked";
import { ValueCarousel } from "@/components/sections/ValueCarousel";
import { StickySplitSection } from "@/components/sections/StickySplitSection";
import { DivisionsTabs } from "@/components/sections/DivisionsTabs";
import { FooterCtaSection } from "@/components/sections/FooterCtaSection";
import { WalkHeader } from "@/components/layout/WalkHeader";

// PLACEHOLDER: Using Walker School images until St. Elizabeth photos provided
// TODO: Replace with actual St. Elizabeth High School photos
// Image mapping — temporary Walker School images
const IMAGES = {
  // Hero — campus exterior or iconic building shot
  heroCampus: "/images/videocover2-812-optimized.webp",

  // Core Values carousel — 4 images representing each value
  faith: "/images/Curiosity-310-optimized.webp",
  excellence: "/images/dignity-311-optimized.webp",
  service: "/images/Honor-312-optimized.webp",
  community: "/images/Kindness-309-optimized.webp",

  // About section — student portraits and campus life
  studentPortrait: "/images/Bitmap12-11-optimized.webp",
  gallery1: "/images/experiencegridhomejacob-662.jpg",
  gallery2: "/images/experiencegridhomemiddleschoolclassroom-663.jpg",
  gallery3: "/images/experiencegridhomeavi-661.jpg",
  gallery4: "/images/experiencegrdhomefootballmiddleschool-660.jpg",

  // Mission section — faith, academics, community
  mission1: "/images/tws_fall2022298min_317-optimized.webp",
  mission2: "/images/tws_commencement-99-optimized.webp",
  mission3: "/images/experiencegridhomevollyball-671.jpg",
  mission4: "/images/lowerschoolsciencemyles-537-Experience-Grid_1849.webp",

  // Student Life panels — athletics, arts, academics
  athleticsCutout: "/images/athleticscutout-825.png",
  artsCutout: "/images/experiencegridhomeprimaryschool-672.jpg",
  academicsCutout: "/images/Emmy_Cutout-813.png",

  // Divisions (grades 8-12)
  grade8: "/images/middleschoolboys-617-Experience-Grid_2147.webp",
  grade9: "/images/experiencegridhomeupperschool-668.jpg",
  grade10: "/images/experiencegridlowerschool-670.jpg",
  grade11: "/images/experiencegridhomeprimaryschool-672.jpg",
  grade12: "/images/tws_commencement-99-optimized.webp",

  // Footer CTA — aerial campus view or iconic building
  campusAerial: "/images/tws_fall2448-980-optimized.webp",
};

export default function Home() {
  return (
    <>
      <WalkHeader />

      <main>
        {/* SECTION 1: Hero — WE BELIEVE with clipping mask */}
        <HeroMasked heroImage={IMAGES.heroCampus} />

        {/* SECTION 2: We Value — scroll-linked horizontal carousel */}
        <ValueCarousel
          values={[
            {
              number: "01",
              image: IMAGES.faith,
              title: "Faith",
              description: "Rooted in Catholic tradition, we nurture spiritual growth through prayer, sacraments, and service to others.",
              href: "/about/values#faith",
            },
            {
              number: "02",
              image: IMAGES.excellence,
              title: "Excellence",
              description: "We challenge every student to reach their full potential through rigorous academics and dedicated mentorship.",
              href: "/about/values#excellence",
            },
            {
              number: "03",
              image: IMAGES.service,
              title: "Service",
              description: "Following Christ's example, we serve our community and those in need with compassion and generosity.",
              href: "/about/values#service",
            },
            {
              number: "04",
              image: IMAGES.community,
              title: "Community",
              description: "We build a family where every student is known, valued, and supported in their journey of growth.",
              href: "/about/values#community",
            },
          ]}
        />

        {/* SECTION 3: Accolades — sticky left / scrolling right */}
        <StickySplitSection
          overline="Recognized for Excellence"
          heading="A Legacy of Faith and Learning"
          body="For over five decades, St. Elizabeth High School has been a pillar of Catholic education in Goa. Our students excel academically, grow spiritually, and serve their community with distinction."
          accordion={[
            {
              title: "Academic Achievement",
              content:
                "Our students consistently achieve top results in SSC and HSC examinations, with many gaining admission to India's premier universities and colleges.",
            },
            {
              title: "Faith Formation",
              content:
                "Daily prayer, regular Mass, retreats, and service projects form the spiritual foundation of our school community. Students grow in their relationship with Christ and the Church.",
            },
            {
              title: "Community Impact",
              content:
                "Through service learning and outreach programs, our students make a tangible difference in Pomburpa and surrounding communities, living out the Gospel call to serve.",
            },
          ]}
          leftImage={IMAGES.studentPortrait}
          rightImages={[
            IMAGES.gallery1,
            IMAGES.gallery2,
            IMAGES.gallery3,
            IMAGES.gallery4,
          ]}
        />

        {/* SECTION 4: Mission — sticky left / scrolling right */}
        <StickySplitSection
          overline="Our Purpose"
          heading="Mission & Vision"
          body="St. Elizabeth High School exists to form young men and women of faith, character, and academic excellence. Rooted in Catholic values and inspired by the example of St. Elizabeth, we prepare students to lead lives of purpose, service, and integrity."
          accordion={[
            {
              title: "Our History",
              content:
                "Founded in the heart of Goa, St. Elizabeth High School has served generations of families in Pomburpa and throughout the region. Our commitment to Catholic education and academic excellence has remained constant through decades of growth and change.",
            },
            {
              title: "Our Catholic Identity",
              content:
                "As a Catholic school, we integrate faith into every aspect of learning. Daily prayer, religious education, sacramental preparation, and service to others form the heart of the St. Elizabeth experience.",
            },
            {
              title: "Our Vision",
              content:
                "We envision graduates who are intellectually curious, spiritually grounded, and committed to serving others. Our students leave St. Elizabeth prepared for higher education and equipped to make a positive impact in their communities.",
            },
          ]}
          leftImage={null}
          rightImages={[
            IMAGES.mission1,
            IMAGES.mission2,
            IMAGES.mission3,
            IMAGES.mission4,
          ]}
        />

        {/* SECTION 5: Discover Your Passions — cutout panels */}
        <div style={{ backgroundColor: "var(--color-white)" }}>
          <div
            className="walker-container"
            style={{ paddingTop: "var(--section-padding-y)", paddingBottom: 40 }}
          >
            <p
              className="walker-overline"
              style={{ marginBottom: 16 }}
            >
              A Well-Rounded Education
            </p>
            <h2
              className="walker-heading"
              style={{ fontSize: "clamp(36px, 5vw, 72px)", marginBottom: 40 }}
            >
              Discover Your Passions
            </h2>
          </div>

          {/* Athletics panel — maroon background */}
          <PassionsPanel
            bg="var(--color-primary-maroon)"
            textColor="var(--color-white)"
            number="01"
            label="Athletics"
            description="From state championships to personal bests, our athletic program builds character through competition. 23 sports, 70+ teams, and a philosophy that prioritizes both excellence and sportsmanship."
            image={IMAGES.athleticsCutout}
            imagePosition="left"
          />

          {/* Arts panel — white background */}
          <PassionsPanel
            bg="var(--color-white)"
            textColor="var(--color-text-dark)"
            number="02"
            label="Arts"
            description="Creativity flourishes here — from award-winning theatre productions to studio art exhibitions. Every student participates in the arts, developing confidence, expression, and an appreciation for beauty."
            image={IMAGES.artsCutout}
            imagePosition="right"
          />

          {/* Academics panel — black background */}
          <PassionsPanel
            bg="var(--color-text-dark)"
            textColor="var(--color-white)"
            number="03"
            label="Academics"
            description="Rigorous college-preparatory curriculum, dedicated faculty, and a culture of high expectations. Our students consistently gain admission to the nation's most selective colleges and universities."
            image={IMAGES.emmyCutout}
            imagePosition="left"
          />
        </div>

        {/* SECTION 6: Divisions Tabs */}
        <DivisionsTabs
          divisions={[
            {
              id: "primary",
              label: "Primary School",
              heading: "Primary School",
              description:
                "Our youngest learners grow in confidence through a nurturing environment that balances academic preparation with creative play and social-emotional development. Our primary school builds the foundation for a lifetime of learning.",
              image: IMAGES.primarySchool,
              cta: "Discover Primary School",
            },
            {
              id: "lower",
              label: "Lower School",
              heading: "Lower School",
              description:
                "Students develop strong literacy, numeracy, and critical thinking skills while exploring arts, athletics, and service. Our lower school fosters curiosity, responsibility, and a love of learning.",
              image: IMAGES.lowerSchool,
              cta: "Discover Lower School",
            },
            {
              id: "middle",
              label: "Middle School",
              heading: "Middle School",
              description:
                "Adolescents navigate a pivotal transition with the guidance of dedicated teachers who know them well. Our middle school cultivates independence, resilience, and deeper intellectual engagement.",
              image: IMAGES.middleSchool,
              cta: "Discover Middle School",
            },
            {
              id: "upper",
              label: "Upper School",
              heading: "Upper School",
              description:
                "Our rigorous college-preparatory program challenges students to excel academically while forming their character and faith. Upper schoolers graduate ready for higher education and lives of purpose.",
              image: IMAGES.upperSchool,
              cta: "Discover Upper School",
            },
          ]}
        />

        {/* SECTION 7: Footer CTA */}
        <FooterCtaSection campusImage={IMAGES.campusAerial} />
      </main>
    </>
  );
}

// Inline PassionsPanel — clean, no component file needed
function PassionsPanel({
  bg,
  textColor,
  number,
  label,
  description,
  image,
  imagePosition,
}: {
  bg: string;
  textColor: string;
  number: string;
  label: string;
  description: string;
  image: string;
  imagePosition: "left" | "right";
}) {
  // Ensure WCAG AA contrast ratio (4.5:1 minimum)
  // On maroon background (#6c1f35), dark text has poor contrast - use white instead
  const descColor =
    bg === "var(--color-text-dark)" ? "rgba(255,255,255,0.7)" :
    bg === "var(--color-primary-maroon)" ? "rgba(255,255,255,0.85)" :
    "rgba(51,51,51,0.7)";
  return (
    <div
      className="cutout-panel"
      style={{
        backgroundColor: bg,
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(40px, 8vw, 120px)",
          padding: "0 var(--container-padding)",
          width: "100%",
          maxWidth: "var(--container-max)",
          margin: "0 auto",
          flexDirection: imagePosition === "right" ? "row" : "row-reverse",
        }}
      >
        <img
          src={image}
          alt={label}
          style={{
            maxHeight: "70vh",
            maxWidth: "45%",
            objectFit: "contain",
            filter:
              bg === "var(--color-text-dark)"
                ? "brightness(1.2) drop-shadow(0 20px 60px rgba(0,0,0,0.5))"
                : "drop-shadow(0 20px 60px rgba(0,0,0,0.2))",
          }}
        />
        <div style={{ maxWidth: 480 }}>
          <p
            className="walker-overline"
            style={{ color: textColor, marginBottom: 16 }}
          >
            {number}
          </p>
          <h3
            className="walker-heading"
            style={{
              fontSize: "clamp(32px, 4vw, 56px)",
              color: textColor,
              marginBottom: 24,
            }}
          >
            {label}
          </h3>
          <p
            className="walker-body"
            style={{ color: descColor, fontSize: 17 }}
          >
            {description}
          </p>
        </div>
      </div>

      {/* Plus button at bottom center */}
      <button
        className="cutout-panel-circle-btn"
        style={{ color: textColor, borderColor: textColor }}
        aria-label={`Learn more about ${label}`}
      >
        +
      </button>
    </div>
  );
}