/**
 * Reference Patterns
 *
 * Constants and configuration values extracted from Walker School CSS patterns.
 * Used for consistent slider behavior, breakpoints, dimensions, and animations.
 */

/**
 * Responsive Breakpoints
 * Based on Walker School's media query system
 */
export const breakpoints = {
  mobile: 600,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1300,
  xlDesktop: 1600,
} as const;

/**
 * Slider Configuration Patterns
 * Three main patterns from Walker School audit
 */
export const sliderConfigs = {
  // Pattern 1: Single slide (hero banners, video sections)
  single: {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    dots: false,
    fade: false,
  },

  // Pattern 2: Multi-slide carousel (values, galleries)
  multi: {
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    dots: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  },

  // Pattern 3: Dual synchronized sliders (tab sliders)
  dualSync: {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: false,
    fade: true,
    adaptiveHeight: true,
    // asNavFor: set dynamically to sync with another slider
  },

  // Gallery pattern (3-4 visible slides)
  gallery: {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  },
} as const;

/**
 * Section Dimension Constants
 * Typical heights and widths from Walker School audit
 */
export const sectionDimensions = {
  introBanner: {
    height: {
      desktop: "40px",
      mobile: "60px",
    },
  },
  videoHero: {
    height: {
      desktop: "600px",
      mobile: "400px",
    },
  },
  valuesCarousel: {
    height: "500px",
  },
  cutoutBanner: {
    height: {
      min: "300px",
      max: "400px",
    },
  },
  redHeaderPanel: {
    height: {
      collapsed: "250px",
      expanded: "350px",
    },
  },
  mobileHideGrid: {
    height: "300px",
  },
  splitGrid: {
    height: "400px",
  },
  desktopHalf: {
    height: "350px",
    width: "50%",
  },
  redHeaderText: {
    height: "150px",
  },
  slideGallery: {
    height: {
      min: "350px",
      max: "400px",
    },
  },
  tabSlider: {
    height: "500px", // variable with adaptiveHeight
  },
  finalHero: {
    height: {
      desktop: "750px",
      mobile: "600px",
    },
    scale: "150%", // oversized banner
  },
} as const;

/**
 * Header Dimensions
 */
export const headerDimensions = {
  desktop: {
    height: "100px",
    topBar: "40px",
    mainNav: "60px",
  },
  mobile: {
    height: "60px",
  },
} as const;

/**
 * Spacing System
 * Padding values from Walker School patterns
 */
export const spacing = {
  padding: {
    desktop: {
      small: "10px",
      medium: "20px",
      large: "30px",
      xlarge: "40px",
    },
    mobile: {
      small: "10px",
      medium: "15px",
      large: "20px",
      xlarge: "30px",
    },
  },
  margin: {
    section: {
      desktop: "60px",
      mobile: "40px",
    },
  },
} as const;

/**
 * Animation Timing
 * Transition and animation durations
 */
export const animationTiming = {
  fast: "150ms",
  normal: "200ms",
  slow: "300ms",
  slider: "500ms",
} as const;

/**
 * Color System
 * Brand colors for St. Elizabeth High School
 */
export const colors = {
  primary: {
    maroon: "#800000",
    maroonDark: "#5c0000",
    navy: "#002147",
  },
  secondary: {
    gold: "#D4AF37",
    cream: "#F5F5DC",
  },
  neutral: {
    white: "#FFFFFF",
    lightGray: "#F5F5F5",
    gray: "#E5E5E5",
    darkGray: "#71717A",
    black: "#000000",
  },
} as const;

/**
 * Z-Index Scale
 * Layering system for overlapping elements
 */
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  header: 50,
  overlay: 100,
  modal: 200,
  toast: 300,
} as const;

/**
 * Caption Positioning
 * For slider captions (desktop)
 */
export const captionPositions = {
  desktop: [
    "top-left",
    "top-center",
    "top-right",
    "middle-left",
    "middle-center",
    "middle-right",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ],
  mobile: ["top", "bottom"],
} as const;

/**
 * Slide Height Modes
 */
export const slideHeightModes = {
  cover: "cover", // Full viewport height
  fixed: "fixed", // Fixed pixel height
  auto: "auto", // Content-based height
} as const;

/**
 * Grid Configurations
 */
export const gridConfigs = {
  mobileHide: {
    desktop: {
      columns: 3,
      gap: "20px",
    },
    tablet: {
      columns: 2,
      gap: "15px",
    },
    mobile: {
      display: "none",
    },
  },
  splitGrid: {
    desktop: {
      columns: 2,
      gap: "40px",
    },
    mobile: {
      columns: 1,
      gap: "20px",
    },
  },
} as const;

/**
 * Typography Scale
 */
export const typography = {
  fontSize: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    base: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
    "5xl": "3rem", // 48px
    "6xl": "3.75rem", // 60px
  },
  lineHeight: {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

/**
 * Container Max Widths
 */
export const containerMaxWidth = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  site: "1200px", // Walker School standard
} as const;

/**
 * Border Radius
 */
export const borderRadius = {
  none: "0",
  sm: "0.125rem", // 2px
  base: "0.25rem", // 4px
  md: "0.375rem", // 6px
  lg: "0.5rem", // 8px
  xl: "0.75rem", // 12px
  "2xl": "1rem", // 16px
  full: "9999px",
} as const;

/**
 * Shadow System
 */
export const shadows = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
} as const;

/**
 * Transition Presets
 */
export const transitions = {
  default: "all 200ms ease-in-out",
  fast: "all 150ms ease-in-out",
  slow: "all 300ms ease-in-out",
  colors: "color 200ms ease-in-out, background-color 200ms ease-in-out",
  transform: "transform 200ms ease-in-out",
  opacity: "opacity 200ms ease-in-out",
} as const;

/**
 * Utility: Get responsive slider config
 */
export function getResponsiveSliderConfig(
  baseConfig: typeof sliderConfigs.multi,
  customBreakpoints?: Array<{ breakpoint: number; settings: Partial<typeof sliderConfigs.multi> }>
) {
  return {
    ...baseConfig,
    responsive: customBreakpoints || baseConfig.responsive,
  };
}

/**
 * Utility: Get section height by breakpoint
 */
export function getSectionHeight(
  section: keyof typeof sectionDimensions,
  breakpoint: "desktop" | "mobile"
): string {
  const dimensions = sectionDimensions[section];
  if (typeof dimensions.height === "string") {
    return dimensions.height;
  }

  const height = dimensions.height as Record<string, string>;
  return height[breakpoint] || height.desktop || "auto";
}
