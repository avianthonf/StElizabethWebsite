import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Home from './page';
import { ScrollTrigger, gsap } from '@/lib/gsap-config';

const mockUsePrefersReducedMotion = vi.fn(() => false);

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => mockUsePrefersReducedMotion(),
}));

vi.mock('@/lib/gsap-config', () => ({
  gsap: {
    context: vi.fn((callback: () => void) => {
      callback();
      return { revert: vi.fn() };
    }),
    to: vi.fn(),
    set: vi.fn(),
    timeline: vi.fn(() => ({
      fromTo: vi.fn().mockReturnThis(),
      to: vi.fn().mockReturnThis(),
      progress: vi.fn().mockReturnThis(),
      kill: vi.fn(),
    })),
  },
  ScrollTrigger: {
    refresh: vi.fn(),
    create: vi.fn(() => ({ kill: vi.fn() })),
    getAll: vi.fn(() => []),
  },
}));

vi.mock('@/components/layout/WalkHeader', () => ({
  WalkHeader: () => <div>Header</div>,
}));

vi.mock('@/components/sections/HeroMasked', () => ({
  HeroMasked: ({ heroImage }: { heroImage?: string }) => (
    <div data-hero-image={heroImage}>Hero</div>
  ),
}));

vi.mock('@/components/sections/StickySplitSection', () => ({
  StickySplitSection: () => <div>Sticky Split</div>,
}));

vi.mock('@/components/ui/Carousel', () => ({
  Carousel: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));

vi.mock('@/components/ui/SkeletonLoader', () => ({
  SkeletonLoader: () => <div>Loading</div>,
}));

describe('Home page vertical scroll behavior', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePrefersReducedMotion.mockReturnValue(false);
  });

  it('does not initialize the horizontal gsap track animation', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByLabelText('Homepage sections')).toBeInTheDocument();
    });

    expect(gsap.to).not.toHaveBeenCalled();
  });

  it('refreshes scroll triggers when a page image loads', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByAltText('Faith')).toBeInTheDocument();
    });

    const requestAnimationFrameSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      });

    fireEvent.load(screen.getByAltText('Faith'));

    expect(ScrollTrigger.refresh).toHaveBeenCalled();

    requestAnimationFrameSpy.mockRestore();
  });

  it('keeps gsap track animation disabled when reduced motion is preferred', async () => {
    mockUsePrefersReducedMotion.mockReturnValue(true);
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByLabelText('Homepage sections')).toBeInTheDocument();
    });

    const requestAnimationFrameSpy = vi
      .spyOn(window, 'requestAnimationFrame')
      .mockImplementation((callback: FrameRequestCallback) => {
        callback(0);
        return 1;
      });

    fireEvent.load(screen.getByAltText('Faith'));

    expect(gsap.to).not.toHaveBeenCalled();
    expect(ScrollTrigger.refresh).toHaveBeenCalled();

    requestAnimationFrameSpy.mockRestore();
  });

  it('renders the homepage sections after mount', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByLabelText('Homepage sections')).toBeInTheDocument();
    });
  });

  it('renders the hero section before the values section in vertical flow', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByLabelText('Homepage sections')).toBeInTheDocument();
    });

    const homepage = screen.getByLabelText('Homepage sections');
    const hero = screen.getByText('Hero');
    const valuesHeading = screen.getByText('We Value');

    expect(homepage.compareDocumentPosition(hero) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(hero.compareDocumentPosition(valuesHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('switches division content when a different grade tab is clicked', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Grade 8' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Grade 10 (SSC)' }));

    expect(screen.getByText('Grade 10 — SSC Board')).toBeInTheDocument();
    expect(screen.getByAltText('Grade 10 — SSC Board')).toBeInTheDocument();
  });

  it('renders the footer cta link to admissions', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /start the application process/i })).toHaveAttribute('href', '/admissions');
    });
  });
});
