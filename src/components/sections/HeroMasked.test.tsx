import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HeroMasked } from './HeroMasked';

describe('HeroMasked', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('renders the hero section with Motion-based animations', () => {
    render(<HeroMasked />);

    expect(screen.getByAltText('St. Elizabeth High School campus')).toBeInTheDocument();
  });

  it('renders with custom hero image when provided', () => {
    const customImage = '/images/custom-hero.webp';
    render(<HeroMasked heroImage={customImage} />);

    const img = screen.getByAltText('St. Elizabeth High School campus');
    expect(img).toHaveAttribute('src', customImage);
  });
});
