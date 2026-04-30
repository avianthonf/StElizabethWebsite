'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Link from 'next/link';

interface AlertBannerProps {
  message: string;
  ctaText?: string;
  ctaHref?: string;
  storageKey?: string;
}

/**
 * AlertBanner — Dismissible announcement banner at the top of the site.
 * 
 * Features:
 * - Gold/yellow background matching Walker School style
 * - Optional CTA link
 * - Dismiss button with localStorage persistence
 * - Smooth slide-up animation on dismiss
 */
export function AlertBanner({
  message,
  ctaText,
  ctaHref,
  storageKey = 'alert-banner-dismissed',
}: AlertBannerProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    // Check localStorage for dismissal state
    const isDismissed = localStorage.getItem(storageKey) === 'true';
    setDismissed(isDismissed);
    if (!isDismissed) {
      setVisible(true);
    }
  }, [storageKey]);

  const handleDismiss = () => {
    setVisible(false);
    // Wait for animation to complete before setting localStorage
    setTimeout(() => {
      localStorage.setItem(storageKey, 'true');
      setDismissed(true);
    }, 300);
  };

  if (dismissed) return null;

  return (
    <div
      className="relative z-[10001] overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]"
      style={{
        maxHeight: visible ? '60px' : '0',
        opacity: visible ? 1 : 0,
        backgroundColor: 'var(--color-brand-gold)',
      }}
    >
      <div
        className="flex items-center justify-center gap-4 px-12 py-3"
        style={{
          minHeight: '44px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-heading), Montserrat, sans-serif',
            fontWeight: 600,
            fontSize: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-text-dark)',
            margin: 0,
          }}
        >
          {message}
        </p>

        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            style={{
              fontFamily: 'var(--font-heading), Montserrat, sans-serif',
              fontWeight: 700,
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--color-text-dark)',
              textDecoration: 'underline',
              textUnderlineOffset: '3px',
            }}
          >
            {ctaText}
          </Link>
        )}

        <button
          onClick={handleDismiss}
          aria-label="Dismiss announcement"
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-dark)',
          }}
        >
          <X size={16} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
}
