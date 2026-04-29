'use client';

import { useEffect, useRef } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { usePrefersReducedMotion } from '@/lib/hooks/usePrefersReducedMotion';
import { gsap } from '@/lib/gsap-config';

const OVERLAY_GRADIENT = 'linear-gradient(180deg, rgba(10,10,10,0.08) 0%, rgba(10,10,10,0.54) 100%)';

interface HomepageIntroProps {
  imageSrc: string;
  onComplete: () => void;
}

export function HomepageIntro({ imageSrc, onComplete }: HomepageIntroProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const maskGroupRef = useRef<SVGGElement>(null);
  const titleTextRef = useRef<SVGTextElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const skipRef = useRef<HTMLButtonElement>(null);
  const tunnelGlowRef = useRef<HTMLDivElement>(null);
  const completeRef = useRef(onComplete);
  const prefersReducedMotion = usePrefersReducedMotion();
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const completionTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const completedRef = useRef(false);
  const startedRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const cleanupAnimation = () => {
      if (completionTimeoutRef.current) {
        clearTimeout(completionTimeoutRef.current);
        completionTimeoutRef.current = null;
      }

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      timelineRef.current?.kill();
      timelineRef.current = null;
    };

    const finish = () => {
      if (completedRef.current) {
        return;
      }

      completedRef.current = true;
      cleanupAnimation();
      completeRef.current();
    };

    const handleSkip = () => {
      finish();
    };

    const startTimeline = (
      root: HTMLDivElement,
      image: HTMLImageElement,
      maskGroup: SVGGElement,
      titleText: SVGTextElement,
      subtitle: HTMLParagraphElement,
      skip: HTMLButtonElement,
      tunnelGlow: HTMLDivElement
    ) => {
      if (startedRef.current) {
        return;
      }

      startedRef.current = true;

      const timeline = gsap.timeline({
        defaults: { ease: 'expo.out' },
        paused: true,
        onComplete: finish,
      });

      timeline
        .to(
          skip,
          {
            opacity: 1,
            duration: 0.35,
          },
          0.06
        )
        .to(
          image,
          {
            scale: 1,
            opacity: 1,
            duration: 2.1,
            ease: 'power3.out',
          },
          0
        )
        .to(
          tunnelGlow,
          {
            opacity: 0.88,
            scale: 1,
            duration: 0.9,
          },
          0.12
        )
        .to(
          maskGroup,
          {
            scale: 1,
            transformOrigin: '50% 50%',
            duration: 2.05,
            ease: 'expo.out',
          },
          0
        )
        .to(
          titleText,
          {
            attr: { 'letter-spacing': '-0.03em' },
            duration: 1.8,
            ease: 'power2.out',
          },
          0.08
        )
        .to(
          subtitle,
          {
            opacity: 1,
            yPercent: 0,
            duration: 0.65,
          },
          1.18
        )
        .to(
          subtitle,
          {
            opacity: 0,
            yPercent: -10,
            duration: 0.45,
          },
          '+=0.45'
        )
        .to(
          tunnelGlow,
          {
            opacity: 0,
            scale: 1.25,
            duration: 0.48,
            ease: 'power2.in',
          },
          '<'
        )
        .to(
          [root, skip],
          {
            opacity: 0,
            duration: 0.72,
            ease: 'power2.inOut',
          },
          '<+0.04'
        );

      timelineRef.current = timeline;
      timeline.play(0);
    };

    const queueTimelineStart = (
      root: HTMLDivElement,
      image: HTMLImageElement,
      maskGroup: SVGGElement,
      titleText: SVGTextElement,
      subtitle: HTMLParagraphElement,
      skip: HTMLButtonElement,
      tunnelGlow: HTMLDivElement
    ) => {
      rafRef.current = window.requestAnimationFrame(() => {
        startTimeline(root, image, maskGroup, titleText, subtitle, skip, tunnelGlow);
        rafRef.current = null;
      });
    };

    const root = rootRef.current;
    const image = imageRef.current;
    const maskGroup = maskGroupRef.current;
    const titleText = titleTextRef.current;
    const subtitle = subtitleRef.current;
    const skip = skipRef.current;
    const tunnelGlow = tunnelGlowRef.current;

    if (!root || !image || !maskGroup || !titleText || !subtitle || !skip || !tunnelGlow) {
      return;
    }

    completedRef.current = false;
    startedRef.current = false;

    skip.addEventListener('click', handleSkip);

    gsap.set(skip, { opacity: 0 });
    gsap.set(subtitle, { opacity: 0, yPercent: 18 });
    gsap.set(image, { scale: 1.28, opacity: 0.9, transformOrigin: '50% 50%' });
    gsap.set(maskGroup, { scale: 26, transformOrigin: '50% 50%' });
    gsap.set(tunnelGlow, { opacity: 0, scale: 0.72, transformOrigin: '50% 50%' });
    gsap.set(root, { opacity: 1 });
    titleText.setAttribute('letter-spacing', '0.24em');

    if (prefersReducedMotion) {
      completionTimeoutRef.current = setTimeout(finish, 450);
    } else {
      queueTimelineStart(root, image, maskGroup, titleText, subtitle, skip, tunnelGlow);
    }

    return () => {
      skip.removeEventListener('click', handleSkip);
      cleanupAnimation();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  return (
    <RemoveScroll enabled>
      <div
        ref={rootRef}
        data-testid="homepage-intro"
        className="fixed inset-0 z-[10001] overflow-hidden bg-[var(--color-text-dark)]"
        aria-label="Homepage intro"
      >
        <img
          ref={imageRef}
          src={imageSrc}
          alt="St. Elizabeth High School campus preview"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ willChange: 'transform, opacity' }}
        />

        <div
          ref={tunnelGlowRef}
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0.08) 18%, rgba(255,255,255,0) 42%)',
            mixBlendMode: 'screen',
            willChange: 'transform, opacity',
          }}
          aria-hidden="true"
        />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{ zIndex: 1 }}
        >
          <defs>
            <mask id="homepage-intro-mask">
              <rect width="100" height="100" fill="white" />
              <g ref={maskGroupRef}>
                <text
                  ref={titleTextRef}
                  x="50"
                  y="52"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="black"
                  style={{
                    fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                    fontWeight: 900,
                    fontSize: '14',
                    textTransform: 'uppercase',
                    lineHeight: 1,
                  }}
                >
                  St. Elizabeth
                </text>
              </g>
            </mask>
          </defs>

          <rect width="100" height="100" fill="rgba(255,255,255,0.98)" mask="url(#homepage-intro-mask)" />
        </svg>

        <div
          className="absolute inset-0"
          style={{ background: OVERLAY_GRADIENT, zIndex: 2 }}
          aria-hidden="true"
        />

        <button
          ref={skipRef}
          type="button"
          className="absolute right-5 top-5 z-10 inline-flex items-center gap-2 border border-black/15 bg-white/85 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[var(--color-text-dark)] backdrop-blur-sm transition hover:bg-white md:right-8 md:top-8"
          aria-label="Skip intro"
        >
          Skip Intro
        </button>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] px-6 pb-10 pt-24 md:px-10 md:pb-14 lg:px-14 lg:pb-16">
          <div className="max-w-[30rem] text-[var(--color-text-dark)]">
            <p
              ref={subtitleRef}
              className="max-w-md text-sm leading-6 text-black/72 md:text-base"
              style={{ willChange: 'transform, opacity' }}
            >
              Faith, excellence, and service shape each day at St. Elizabeth High School, where young people grow with confidence, discipline, and care.
            </p>
          </div>
        </div>
      </div>
    </RemoveScroll>
  );
}
