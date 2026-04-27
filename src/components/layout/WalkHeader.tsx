'use client';

import { useEffect, useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { siteNavigation } from '@/lib/site-navigation';

export function WalkHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const logoColor = scrolled || mobileOpen ? 'var(--walker-black)' : 'var(--walker-white)';
  const linkColor = scrolled || mobileOpen ? 'var(--walker-gray)' : 'var(--walker-white)';

  return (
    <>
      {/* Header */}
      <header className={`site-header ${scrolled ? 'solid' : 'transparent'}`}>
        <div className="site-header-inner">
          {/* Logo */}
          <a href="/" className="site-header-logo" style={{ color: logoColor }}>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              St. Elizabeth
            </span>
            <span style={{ display: 'block', fontSize: 11, fontFamily: 'var(--font-heading)', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: 2 }}>
              High School
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="site-header-nav" aria-label="Main navigation">
            {siteNavigation.slice(0, 6).map((item) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.href)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <a
                  href={item.href}
                  className="site-header-link"
                  style={{ color: linkColor }}
                  onClick={(e) => {
                    if (item.children) e.preventDefault();
                  }}
                >
                  {item.label}
                </a>

                {/* Mega menu dropdown */}
                {item.children && hoveredItem === item.href && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      marginTop: 16,
                      background: 'var(--walker-white)',
                      borderRadius: 8,
                      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                      minWidth: 220,
                      padding: '12px 0',
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
                          fontFamily: 'var(--font-heading)',
                          fontSize: 12,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.1em',
                          color: 'var(--walker-gray)',
                          textDecoration: 'none',
                          transition: 'color 0.2s, background 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.color = 'var(--walker-black)';
                          (e.target as HTMLElement).style.background = 'var(--walker-gray-light)';
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.color = 'var(--walker-gray)';
                          (e.target as HTMLElement).style.background = 'transparent';
                        }}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side */}
          <div className="site-header-right">
            <button
              className="site-header-search"
              style={{ color: linkColor }}
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            <button
              className="site-header-menu-toggle"
              style={{ color: linkColor }}
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <div className="hamburger-lines">
                <div className="hamburger-line" />
                <div className="hamburger-line" />
                <div className="hamburger-line" />
              </div>
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'var(--walker-white)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Mobile header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px',
              height: 80,
              borderBottom: '1px solid var(--walker-gray-light)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 700,
                color: 'var(--walker-black)',
              }}
            >
              St. Elizabeth
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--walker-black)' }}
            >
              <X size={28} />
            </button>
          </div>

          {/* Mobile nav */}
          <nav
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '24px',
            }}
          >
            {siteNavigation.map((item) => (
              <div key={item.href}>
                <a
                  href={item.href}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '18px 0',
                    borderBottom: '1px solid var(--walker-gray-light)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 800,
                    fontSize: 18,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--walker-black)',
                    textDecoration: 'none',
                  }}
                  onClick={() => {
                    if (item.children) {
                      // Toggle children visibility
                    } else {
                      setMobileOpen(false);
                    }
                  }}
                >
                  {item.label}
                  {item.children && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  )}
                </a>

                {/* Children */}
                {item.children && (
                  <div style={{ paddingLeft: 16 }}>
                    {item.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        style={{
                          display: 'block',
                          padding: '12px 0',
                          fontFamily: 'var(--font-body)',
                          fontSize: 14,
                          color: 'var(--walker-gray)',
                          textDecoration: 'none',
                          borderBottom: '1px solid var(--walker-gray-light)',
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
        </div>
      )}
    </>
  );
}