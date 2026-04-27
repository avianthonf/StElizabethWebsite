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
              image: IMAGES.curiosity,
              title: "Curiosity",
              description: "We spark a lifelong love of learning through inquiry, exploration, and wonder.",
              href: "#",
            },
            {
              number: "02",
              image: IMAGES.dignity,
              title: "Dignity",
              description: "Every person is made in the image of God and deserves respect and compassion.",
              href: "#",
            },
            {
              number: "03",
              image: IMAGES.honor,
              title: "Honor",
              description: "We act with integrity — doing what's right even when no one is watching.",
              href: "#",
            },
            {
              number: "04",
              image: IMAGES.kindness,
              title: "Kindness",
              description: "We build a community where everyone feels seen, valued, and supported.",
              href: "#",
            },
          ]}
        />

        {/* SECTION 3: Accolades — sticky left / scrolling right */}
        <StickySplitSection
          overline="That's Why, For the Eighth Year in a Row"
          heading="Cobb County's Best Private School"
          body="Parents consistently choose The Walker School for its exceptional academics, caring community, and values-driven environment. Our students thrive because of our commitment to the whole person — mind, body, and spirit."
          accordion={[
            {
              title: "Academic Excellence",
              content:
                "Our students consistently score in the top percentiles on national assessments and gain admission to the most selective colleges and universities.",
            },
            {
              title: "Athletics & Arts",
              content:
                "State championships, national recognition in the arts, and a full range of extracurricular activities ensure every student finds their passion.",
            },
            {
              title: "Community & Values",
              content:
                "Parent satisfaction surveys consistently show that our families choose Walker for the caring community, Christian environment, and excellent teachers.",
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
          overline="Discovering"
          heading="Our Mission"
          body="The Walker School exists to inspire and equip students to pursue excellence in academics, character, and service — forming men and women who make a difference in the world."
          accordion={[
            {
              title: "Our Story",
              content:
                "Founded in 1965, The Walker School has grown from a small Christian academy into one of the region's most respected independent schools, serving students from PK3 through 12th grade.",
            },
            {
              title: "Our Faith",
              content:
                "As a Christian school, we integrate faith into every aspect of learning. Weekly chapel, service projects, and a faculty committed to spiritual formation are central to the Walker experience.",
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