import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

// Register GSAP plugins ONCE at module load
// All GSAP animations throughout the app use these plugins
// Singleton guard to prevent double-registration in React strict mode
let pluginsRegistered = false;

if (typeof window !== 'undefined' && !pluginsRegistered) {
  gsap.registerPlugin(ScrollTrigger, Flip);
  pluginsRegistered = true;

  // Global GSAP defaults matching Walker physics specs
  gsap.defaults({
    ease: 'expo.out',
    duration: 0.8,
  });

  // ScrollTrigger global settings matching SOP-001
  ScrollTrigger.config({
    // The lag between scroll wheel and animation (buttery smooth feel)
    // scrub: 1 is set per-timeline, this is the global threshold
    ignoreMobileResize: true,
  });
}

export { gsap, ScrollTrigger, Flip };
