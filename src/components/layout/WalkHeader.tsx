'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from '@/lib/gsap-config';
import { siteNavigation } from '@/lib/site-navigation';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Walker Header — "Ghost Nav" behavior (SOP-001 + Blueprint).
 *
 * State A (At Top): Transparent background, white text/logo.
 * State B (scrollY > 100): white background + shadow, black text.
 * Transition: 400ms ease-in-out.
 * Z-Index: 9999.
 *
 * Desktop: hover mega-menu dropdowns.
 * Mobile: full-screen overlay menu (hamburger → X transition).
 */
export function WalkHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Ghost nav — transparent at top, solid when scrolled
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isTransparent = !scrolled && !mobileOpen;
  const textColor = isTransparent ? '#fff' : '#000';
  const logoColor = isTransparent ? '#fff' : '#800000';

  return (
    <>
      {/* Header */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-[9999] transition-all duration-400 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{
          backgroundColor: isTransparent ? 'transparent' : '#fff',
          boxShadow: scrolled ? '0 2px 24px rgba(0,0,0,0.08)' : 'none',
        }}
      >
        <div
          className="flex items-center justify-between h-20 px-6 md:px-12"
        >
          {/* Logo — St. Elizabeth in serif, tagline in sans */}
          <a
            href="/"
            style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}
          >
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
          </a>

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
                    fontWeight: 700,
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
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
                      background: '#fff',
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
                          color: '#333',
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

          {/* Right side: search + hamburger */}
          <div className="flex items-center gap-5">
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
              aria-label="Open menu"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                <div style={{ width: 24, height: 2, background: 'currentColor' }} />
                <div style={{ width: 24, height: 2, background: 'currentColor' }} />
                <div style={{ width: 24, height: 2, background: 'currentColor' }} />
              </div>
              <span
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
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }} // ease-in-out-quint (SOP-001)
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
                borderBottom: '1px solid #E5E5E5',
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display), Playfair Display, serif',
                  fontSize: 18,
                  fontWeight: 700,
                  color: '#000',
                }}
              >
                St. Elizabeth
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#000' }}
              >
                <X size={28} />
              </button>
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
                      borderBottom: '1px solid #E5E5E5',
                      fontFamily: 'var(--font-heading), Montserrat, sans-serif',
                      fontWeight: 800,
                      fontSize: 18,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      color: '#000',
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
                            color: '#555',
                            textDecoration: 'none',
                            borderBottom: '1px solid #F5F5F5',
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}