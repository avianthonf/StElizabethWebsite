'use client';

import { ChevronRight } from 'lucide-react';

/**
 * Footer CTA Section — Walker-style full-width video/image background
 * with massive centered "ADMISSION" heading and dual buttons.
 */
export function FooterCtaSection() {
  return (
    <section className="footer-cta-section" style={{ minHeight: '80vh' }}>
      {/* Background image — use a placeholder from our images */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, var(--walker-black) 0%, #1a1a2e 50%, var(--brand-maroon) 100%)',
          backgroundImage: 'url(/images/campus-aerial.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="footer-cta-bg"
      />

      {/* Dark overlay */}
      <div className="footer-cta-overlay" />

      {/* Content */}
      <div className="footer-cta-content walker-container">
        <h2 className="footer-cta-title">Admission</h2>
        <div className="footer-cta-buttons">
          <a href="/admissions/inquire" className="footer-cta-btn">
            Inquire
            <ChevronRight size={16} />
          </a>
          <a href="/admissions/apply" className="footer-cta-btn">
            Apply
            <ChevronRight size={16} />
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom-bar">
        <div className="footer-contact-info">
          <span>+91 832 223 4567</span>
          <span style={{ margin: '0 16px', opacity: 0.4 }}>|</span>
          <span>Pomburpa, Bardez, Goa 403523</span>
        </div>
        <div className="footer-social-icons">
          <a href="#" className="footer-social-icon" aria-label="YouTube">
            YT
          </a>
          <a href="#" className="footer-social-icon" aria-label="LinkedIn">
            IN
          </a>
          <a href="#" className="footer-social-icon" aria-label="Facebook">
            f
          </a>
          <a href="#" className="footer-social-icon" aria-label="Instagram">
            ig
          </a>
        </div>
      </div>
    </section>
  );
}