'use client';

import { ChangeEvent } from 'react';

interface GdprConsentProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  id?: string;
}

export function GdprConsent({ checked, onChange, error, id = 'gdpr-consent' }: GdprConsentProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <div style={{ marginTop: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          style={{
            width: 18,
            height: 18,
            marginTop: 2,
            cursor: 'pointer',
            accentColor: 'var(--color-primary-maroon)',
          }}
        />
        <label
          htmlFor={id}
          style={{
            fontSize: 14,
            lineHeight: 1.6,
            color: 'var(--color-text-dark)',
            cursor: 'pointer',
          }}
        >
          I consent to St. Elizabeth High School collecting and storing my personal information
          submitted through this form for the purpose of responding to my inquiry. I understand
          that my data will be processed in accordance with the school&apos;s{' '}
          <a
            href="/privacy-policy"
            style={{
              color: 'var(--color-primary-maroon)',
              textDecoration: 'underline',
            }}
          >
            Privacy Policy
          </a>
          . *
        </label>
      </div>
      {error && (
        <p
          id={`${id}-error`}
          style={{
            fontSize: 14,
            color: 'var(--color-primary-maroon)',
            marginTop: 8,
            marginLeft: 30,
          }}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}
