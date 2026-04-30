'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import { siteNavigation } from '@/lib/site-navigation';
import { X, Search, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RemoveScroll } from 'react-remove-scroll';

declare global {
  interface WindowEventMap {
    'horizontal-scroll-progress': CustomEvent<{ progress: number }>;
  }
}

/**
 * Walker Header — "Ghost Nav" behavior (SOP-001 + Blueprint).
 *
 * State A (At Top): Transparent background, white text/logo.
 * State B (scrollY > 100): white background + shadow, black text.
 * Transition: 400ms ease-in-out.
 * Z-Index: 9999.
 *
 * Features:
 * - School crest/logo
 * - INQUIRE and APPLY CTA buttons
 * - Social media icons
 * - Desktop: hover mega-menu dropdowns
 * - Mobile: full-screen overlay menu
 */
export function WalkHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Ghost nav — transparent at top, solid when scrolled horizontally
  useEffect(() => {
    const handleHorizontalScroll = (e: WindowEventMap['horizontal-scroll-progress']) => {
      setScrolled(e.detail.progress > 0.05);
    };

    const handleVerticalScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.1);

    window.addEventListener('horizontal-scroll-progress', handleHorizontalScroll);
    window.addEventListener('scroll', handleVerticalScroll, { passive: true });

    handleVerticalScroll();

    return () => {
      window.removeEventListener('horizontal-scroll-progress', handleHorizontalScroll);
      window.removeEventListener('scroll', handleVerticalScroll);
    };
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);

  const isTransparent = !scrolled && !mobileOpen;
  const textColor = isTransparent ? 'var(--color-text-dark)' : 'var(--color-text-dark)';
  const logoColor = isTransparent ? 'var(--color-brand-maroon)' : 'var(--color-brand-maroon)';

  return (
    <>
      {/* Header */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          backgroundColor: isTransparent ? 'rgba(255,255,255,0.94)' : 'var(--color-white)',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : '0 2px 24px rgba(0,0,0,0.06)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-center justify-between h-20 px-6 md:px-12">
          {/* Logo with School Crest */}
          <Link
            href="/"
            className="flex items-center gap-3"
            style={{ textDecoration: 'none' }}
          >
            {/* School Crest */}
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src="/images/logo-st-elizabeth.svg"
                alt="St. Elizabeth School Crest"
                fill
                className="object-contain"
                priority
              />
            </div>
            
            {/* School Name */}
            <div className="flex flex-col">
              <span
                style={{
                  fontFamily: 'var(--font-display), Playfair Display, serif',
                  fontWeight: 700,
                  fontSize: 20,
                  color: logoColor,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                St. Elizabeth
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: 9,
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: textColor,
                  marginTop: 2,
                }}
              >
                High School
              </span>
            </div>
          </Link>

          {/* Desktop Nav — top-level links */}
          <nav
            className="hidden lg:flex items-center gap-8"
            aria-label="Main navigation"
          >
            {siteNavigation.slice(0, 6).map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a
                  href={item.href}
                  style={{
                    fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                    fontWeight: 800,
                    fontSize: 'clamp(0.65rem, 0.8vw, 0.75rem)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: textColor,
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label}
                </a>

                {/* Mega menu dropdown */}
                {item.children && hoveredItem === item.href && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 16px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--color-white)',
                      borderRadius: 8,
                      boxShadow: '0 24px 64px rgba(0,0,0,0.12)',
                      minWidth: 200,
                      padding: '8px 0',
                      zIndex: 50,
                    }}
                  >
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        style={{
                          display: 'block',
                          padding: '10px 24px',
                          fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                          fontSize: 11,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--color-gray)',
                          textDecoration: 'none',
                        }}
                      >
                        {child.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side: CTAs + search + hamburger */}
          <div className="flex items-center gap-4">
            {/* CTA Buttons - Desktop only */}
            <div className="hidden xl:flex items-center gap-3">
              <Link
                href="/admissions/inquiry"
                className="px-5 py-2.5 border-2 transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-brand-maroon)',
                  borderColor: 'var(--color-brand-maroon)',
                  background: 'transparent',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-brand-maroon)';
                  e.currentTarget.style.color = 'var(--color-white)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--color-brand-maroon)';
                }}
              >
                Inquire
              </Link>
              <Link
                href="/admissions/apply"
                className="px-5 py-2.5 transition-all duration-300"
                style={{
                  fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-white)',
                  background: 'var(--color-brand-maroon)',
                  border: '2px solid var(--color-brand-maroon)',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-primary-maroon)';
                  e.currentTarget.style.borderColor = 'var(--color-primary-maroon)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-brand-maroon)';
                  e.currentTarget.style.borderColor = 'var(--color-brand-maroon)';
                }}
              >
                Apply
              </Link>
            </div>

            {/* Social Icons - Desktop only */}
            <div className="hidden lg:flex items-center gap-2 ml-2 border-l border-gray-200 pl-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:opacity-70 transition-opacity"
                style={{ color: textColor }}
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:opacity-70 transition-opacity"
                style={{ color: textColor }}
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:opacity-70 transition-opacity"
                style={{ color: textColor }}
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 hover:opacity-70 transition-opacity"
                style={{ color: textColor }}
                aria-label="YouTube"
              >
                <Youtube size={16} />
              </a>
            </div>

            <button
              style={{ color: textColor, background: 'none', border: 'none', cursor: 'pointer' }}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: textColor,
              }}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ width: 24, height: 2, background: 'currentColor' }} />
                <div style={{ width: 24, height: 2, background: 'currentColor' }} />
                <div style={{ width: 24, height: 2, background: 'currentColor' }} />
              </div>
              <span
                className="hidden sm:inline"
                style={{
                  fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                  fontWeight: 700,
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                }}
              >
                Menu
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu — Full-screen overlay */}
      <RemoveScroll enabled={mobileOpen}>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 10000,
                background: '#fff',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
              }}
            >
              {/* Mobile header bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 24px',
                  height: 80,
                  borderBottom: '1px solid var(--color-border-light)',
                  flexShrink: 0,
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10">
                    <Image
                      src="/images/logo-st-elizabeth.svg"
                      alt="St. Elizabeth School Crest"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-display), Playfair Display, serif',
                      fontSize: 18,
                      fontWeight: 700,
                      color: 'var(--color-text-dark)',
                    }}
                  >
                    St. Elizabeth
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000' }}
                >
                  <X size={28} />
                </button>
              </div>

              {/* Mobile CTA Buttons */}
              <div className="flex gap-3 px-6 py-4 border-b border-gray-100">
                <Link
                  href="/admissions/inquiry"
                  className="flex-1 py-3 text-center border-2 transition-all"
                  style={{
                    fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                    fontWeight: 700,
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-brand-maroon)',
                    borderColor: 'var(--color-brand-maroon)',
                    textDecoration: 'none',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  Inquire
                </Link>
                <Link
                  href="/admissions/apply"
                  className="flex-1 py-3 text-center transition-all"
                  style={{
                    fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                    fontWeight: 700,
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--color-white)',
                    background: 'var(--color-brand-maroon)',
                    textDecoration: 'none',
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  Apply
                </Link>
              </div>

              {/* Mobile nav links */}
              <nav style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                {siteNavigation.map((item) => (
                  <div key={item.href}>
                    <a
                      href={item.href}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '18px 0',
                        borderBottom: '1px solid var(--color-border-light)',
                        fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                        fontWeight: 800,
                        fontSize: 18,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: 'var(--color-text-dark)',
                        textDecoration: 'none',
                      }}
                    >
                      {item.label}
                      {item.children && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      )}
                    </a>

                    {item.children && (
                      <div style={{ paddingLeft: 16 }}>
                        {item.children.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            style={{
                              display: 'block',
                              padding: '12px 0',
                              fontFamily: 'var(--font-body), Inter, sans-serif',
                              fontSize: 14,
                              color: 'var(--color-gray)',
                              textDecoration: 'none',
                              borderBottom: '1px solid var(--color-gray-light)',
                            }}
                            onClick={() => setMobileOpen(false)}
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* Mobile Social Icons */}
              <div className="flex items-center justify-center gap-4 py-6 border-t border-gray-100">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                  style={{
                    background: 'var(--color-brand-maroon)',
                    color: 'var(--color-white)',
                  }}
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                  style={{
                    background: 'var(--color-brand-maroon)',
                    color: 'var(--color-white)',
                  }}
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                  style={{
                    background: 'var(--color-brand-maroon)',
                    color: 'var(--color-white)',
                  }}
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
                  style={{
                    background: 'var(--color-brand-maroon)',
                    color: 'var(--color-white)',
                  }}
                  aria-label="YouTube"
                >
                  <Youtube size={18} />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </RemoveScroll>
    </>
  );
}
