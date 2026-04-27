/**
 * Homepage Section Data
 *
 * Defines all 16 section types from Walker School audit, adapted for St. Elizabeth High School.
 * Each section has a discriminated union type for type safety.
 */

// Base section interface
interface BaseSection {
  id: string;
  className?: string;
}

// 1. Intro Banner - Small text banner at top
export interface IntroBannerSection extends BaseSection {
  type: "intro-banner";
  text: string;
}

// 2. Video Hero - Vimeo video with centered caption
export interface VideoHeroSection extends BaseSection {
  type: "video-hero";
  videoUrl: string;
  posterImage: string;
  caption: {
    title: string;
    subtitle?: string;
  };
  captionPosition: "center" | "bottom-left" | "bottom-center";
}

// 3. Values Carousel - 6-item infinite loop carousel
export interface ValuesCarouselSection extends BaseSection {
  type: "values-carousel";
  title: string;
  items: Array<{
    image: string;
    title: string;
    description: string;
  }>;
}

// 4. Cutout Banner - PNG overlay banner
export interface CutoutBannerSection extends BaseSection {
  type: "cutout-banner";
  backgroundImage: string;
  cutoutImage: string;
  backgroundColor: string;
}

// 5. Red Header Panel - Red header text section
export interface RedHeaderPanelSection extends BaseSection {
  type: "red-header-panel";
  header: string;
  content: string;
  backgroundColor?: string;
}

// 6. Mobile Hide Grid - 3-4 visible mobile-hidden grid
export interface MobileHideGridSection extends BaseSection {
  type: "mobile-hide-grid";
  images: Array<{
    src: string;
    alt: string;
    link?: string;
  }>;
  slidesToShow: number;
}

// 7. Split Grid - Alternating left/right image grids
export interface SplitGridSection extends BaseSection {
  type: "split-grid";
  items: Array<{
    image: string;
    title: string;
    description: string;
    link?: string;
    imagePosition: "left" | "right";
  }>;
}

// 8. Desktop Half - 50% width sections
export interface DesktopHalfSection extends BaseSection {
  type: "desktop-half";
  leftImage: string;
  rightImage: string;
  leftLink?: string;
  rightLink?: string;
}

// 9. Red Header Text - Red background text panels
export interface RedHeaderTextSection extends BaseSection {
  type: "red-header-text";
  header: string;
  body: string;
  backgroundColor: string;
}

// 10. Slide Gallery - Custom slide gallery
export interface SlideGallerySection extends BaseSection {
  type: "slide-gallery";
  title?: string;
  images: Array<{
    src: string;
    alt: string;
    caption?: string;
  }>;
}

// 11. Cutout Banner 2 - Second cutout banner variant
export interface CutoutBanner2Section extends BaseSection {
  type: "cutout-banner-2";
  backgroundImage: string;
  cutoutImage: string;
  backgroundColor: string;
}

// 12. Tab Slider - Synchronized dual slider with tabs
export interface TabSliderSection extends BaseSection {
  type: "tab-slider";
  tabs: Array<{
    label: string;
    image: string;
    title: string;
    description: string;
  }>;
}

// 13. Final Hero - Large 150% height CTA hero
export interface FinalHeroSection extends BaseSection {
  type: "final-hero";
  backgroundImage: string;
  title: string;
  subtitle?: string;
  ctaText: string;
  ctaLink: string;
}

// Discriminated union of all section types
export type HomepageSection =
  | IntroBannerSection
  | VideoHeroSection
  | ValuesCarouselSection
  | CutoutBannerSection
  | RedHeaderPanelSection
  | MobileHideGridSection
  | SplitGridSection
  | DesktopHalfSection
  | RedHeaderTextSection
  | SlideGallerySection
  | CutoutBanner2Section
  | TabSliderSection
  | FinalHeroSection;

/**
 * Homepage sections configuration
 * Placeholder content for St. Elizabeth High School
 */
export const homepageSections: HomepageSection[] = [
  // 1. Intro Banner
  {
    type: "intro-banner",
    id: "intro-banner",
    text: "Nurturing Faith, Excellence, and Character Since 1985",
    className: "site-custom-intro-banner-wrapper",
  },

  // 2. Video Hero
  {
    type: "video-hero",
    id: "video-hero",
    videoUrl: "https://player.vimeo.com/video/placeholder",
    posterImage: "/images/hero-poster.jpg",
    caption: {
      title: "Where Faith Meets Learning",
      subtitle: "A Catholic education rooted in Goan tradition",
    },
    captionPosition: "center",
    className: "site-custom-video-banner site-slide-height-dt-cover-wrapper",
  },

  // 3. Values Carousel
  {
    type: "values-carousel",
    id: "values-carousel",
    title: "Our Core Values",
    items: [
      {
        image: "/images/values/faith.jpg",
        title: "Faith",
        description: "Deepening our relationship with God through prayer and service",
      },
      {
        image: "/images/values/excellence.jpg",
        title: "Academic Excellence",
        description: "Pursuing knowledge with dedication and integrity",
      },
      {
        image: "/images/values/compassion.jpg",
        title: "Compassion",
        description: "Serving others with love and understanding",
      },
      {
        image: "/images/values/integrity.jpg",
        title: "Integrity",
        description: "Living with honesty and moral courage",
      },
      {
        image: "/images/values/community.jpg",
        title: "Community",
        description: "Building bonds that last a lifetime",
      },
      {
        image: "/images/values/innovation.jpg",
        title: "Innovation",
        description: "Embracing creativity and critical thinking",
      },
    ],
    className: "site-multi-slide-slider-wrapper site-custom-number-gallery-wrapper",
  },

  // 4. Cutout Banner
  {
    type: "cutout-banner",
    id: "cutout-banner-1",
    backgroundImage: "/images/campus-background.jpg",
    cutoutImage: "/images/student-cutout.png",
    backgroundColor: "#002147",
    className: "site-bg-primary-wrapper site-custom-cutout-image-wrapper",
  },

  // 5. Red Header Panel
  {
    type: "red-header-panel",
    id: "red-header-1",
    header: "Goa's Premier Catholic Education",
    content:
      "St. Elizabeth High School has been a beacon of academic excellence and spiritual growth in Pomburpa for over three decades. Our students consistently achieve top results in ICSE examinations while developing strong moral character.",
    backgroundColor: "#800000",
    className: "site-custom-red-header-wrapper",
  },

  // 6. Mobile Hide Grid
  {
    type: "mobile-hide-grid",
    id: "mobile-hide-grid",
    images: [
      { src: "/images/gallery/science-lab.jpg", alt: "Science Laboratory" },
      { src: "/images/gallery/library.jpg", alt: "School Library" },
      { src: "/images/gallery/sports.jpg", alt: "Sports Facilities" },
      { src: "/images/gallery/chapel.jpg", alt: "School Chapel" },
    ],
    slidesToShow: 3,
    className: "site-mobile-hide-wrapper site-custom-image-grid-wrapper",
  },

  // 7. Split Grid
  {
    type: "split-grid",
    id: "split-grid",
    items: [
      {
        image: "/images/academics/classroom.jpg",
        title: "Rigorous Academics",
        description:
          "Our ICSE curriculum prepares students for success in higher education and beyond, with a focus on critical thinking and problem-solving.",
        imagePosition: "left",
        link: "/academics",
      },
      {
        image: "/images/spiritual/prayer.jpg",
        title: "Spiritual Formation",
        description:
          "Daily prayer, weekly Mass, and service opportunities help students grow in their Catholic faith and develop a strong moral compass.",
        imagePosition: "right",
        link: "/activities/spiritual",
      },
      {
        image: "/images/activities/arts.jpg",
        title: "Arts & Culture",
        description:
          "From traditional Goan folk dance to contemporary music, our arts programs celebrate cultural heritage while fostering creativity.",
        imagePosition: "left",
        link: "/activities/arts",
      },
    ],
    className: "site-custom-grid-reverse-wrapper",
  },

  // 8. Desktop Half
  {
    type: "desktop-half",
    id: "desktop-half",
    leftImage: "/images/half/athletics.jpg",
    rightImage: "/images/half/technology.jpg",
    leftLink: "/activities/athletics",
    rightLink: "/academics/technology",
    className: "site-desktop-width-50-wrapper site-mobile-hide-wrapper",
  },

  // 9. Red Header Text
  {
    type: "red-header-text",
    id: "red-header-text",
    header: "100% College Acceptance Rate",
    body: "Our graduates are accepted to top universities across India and abroad, including IITs, NITs, and prestigious international institutions.",
    backgroundColor: "#800000",
    className: "site-bg-light-wrapper site-custom-red-header-wrapper",
  },

  // 10. Slide Gallery
  {
    type: "slide-gallery",
    id: "slide-gallery",
    title: "Campus Life",
    images: [
      { src: "/images/gallery/annual-day.jpg", alt: "Annual Day Celebration", caption: "Annual Day 2025" },
      { src: "/images/gallery/sports-day.jpg", alt: "Sports Day", caption: "Inter-House Athletics" },
      { src: "/images/gallery/science-fair.jpg", alt: "Science Fair", caption: "Innovation Showcase" },
      { src: "/images/gallery/christmas.jpg", alt: "Christmas Celebration", caption: "Christmas Carol Service" },
      { src: "/images/gallery/graduation.jpg", alt: "Graduation Ceremony", caption: "Class of 2025" },
    ],
    className: "site-custom-slide-gallery-wrapper",
  },

  // 11. Cutout Banner 2
  {
    type: "cutout-banner-2",
    id: "cutout-banner-2",
    backgroundImage: "/images/campus-aerial.jpg",
    cutoutImage: "/images/teacher-cutout.png",
    backgroundColor: "#002147",
    className: "site-bg-primary-wrapper site-custom-cutout-image-wrapper",
  },

  // 12. Tab Slider
  {
    type: "tab-slider",
    id: "tab-slider",
    tabs: [
      {
        label: "Primary School",
        image: "/images/divisions/primary.jpg",
        title: "Primary School (Grades 1-4)",
        description:
          "Building strong foundations in literacy, numeracy, and faith through play-based learning and personalized attention.",
      },
      {
        label: "Middle School",
        image: "/images/divisions/middle.jpg",
        title: "Middle School (Grades 5-8)",
        description:
          "Developing critical thinking skills and independence while navigating the challenges of adolescence with guidance and support.",
      },
      {
        label: "High School",
        image: "/images/divisions/high.jpg",
        title: "High School (Grades 9-10)",
        description:
          "Preparing for ICSE examinations with rigorous academics, college counseling, and leadership opportunities.",
      },
    ],
    className: "site-slider-tab-dt-left-wrapper site-slider-tab-wrapper",
  },

  // 13. Final Hero
  {
    type: "final-hero",
    id: "final-hero",
    backgroundImage: "/images/hero-final.jpg",
    title: "Join Our Community",
    subtitle: "Applications now open for Academic Year 2026-27",
    ctaText: "Apply Now",
    ctaLink: "/admission/apply",
    className:
      "site-slide-caption-dt-mc-wrapper site-slide-height-dt-cover-wrapper site-color-white site-custom-banner-size-150-wrapper",
  },
];

/**
 * Get section by ID
 */
export function getSectionById(id: string): HomepageSection | undefined {
  return homepageSections.find((section) => section.id === id);
}

/**
 * Get sections by type
 */
export function getSectionsByType<T extends HomepageSection["type"]>(
  type: T
): Extract<HomepageSection, { type: T }>[] {
  return homepageSections.filter((section) => section.type === type) as Extract<
    HomepageSection,
    { type: T }
  >[];
}
