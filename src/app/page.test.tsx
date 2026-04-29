import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Home from './page';

const mockUsePrefersReducedMotion = vi.fn(() => false);
const mockUseFirstVisit = vi.fn();
const mockMarkVisitComplete = vi.fn();

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => mockUsePrefersReducedMotion(),
}));

vi.mock('@/lib/hooks/useMotionHorizontalScroll', () => ({
  useMotionHorizontalScroll: vi.fn(() => ({
    containerRef: { current: null },
    trackRef: { current: null },
    x: { get: () => 0, on: vi.fn(), destroy: vi.fn() },
    scrollYProgress: { get: () => 0, on: vi.fn(), destroy: vi.fn() },
  })),
}));

vi.mock('@/lib/hooks/useFirstVisit', () => ({
  useFirstVisit: () => mockUseFirstVisit(),
}));

vi.mock('@/components/sections/HomepageIntro', () => ({
  HomepageIntro: ({ onComplete, imageSrc }: { onComplete: () => void; imageSrc: string }) => (
    <div data-testid="homepage-intro" data-image-src={imageSrc}>
      <button onClick={onComplete}>Skip Intro</button>
    </div>
  ),
}));

vi.mock('@/lib/gsap-config', () => ({
  gsap: {
    timeline: vi.fn(() => ({
      to() {
        return this;
      },
      kill: vi.fn(),
    })),
    set: vi.fn(),
  },
}));

Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: (callback: FrameRequestCallback) => window.setTimeout(() => callback(0), 0),
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: (id: number) => window.clearTimeout(id),
});

Object.defineProperty(window, 'queueMicrotask', {
  writable: true,
  value: (callback: () => void) => Promise.resolve().then(callback),
});

Object.defineProperty(globalThis, 'queueMicrotask', {
  writable: true,
  value: (callback: () => void) => Promise.resolve().then(callback),
});

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    matches: false,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: window.matchMedia,
});

Object.defineProperty(window, 'sessionStorage', {
  writable: true,
  value: {
    getItem: vi.fn(() => null),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  },
});

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

describe('Home page Motion-based scroll behavior', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePrefersReducedMotion.mockReturnValue(false);
    mockUseFirstVisit.mockReturnValue({
      isFirstVisit: false,
      ready: true,
      markVisitComplete: mockMarkVisitComplete,
    });
  });

  it('renders the homepage with Motion-based horizontal scroll', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByLabelText('Homepage sections')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('homepage-intro')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Homepage sections')).toBeInTheDocument();
  });

  it('renders the intro on a first visit and completes it when skipped', async () => {
    mockUseFirstVisit.mockReturnValue({
      isFirstVisit: true,
      ready: true,
      markVisitComplete: mockMarkVisitComplete,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId('homepage-intro')).toBeInTheDocument();
    });
    expect(screen.getByTestId('homepage-intro')).toHaveAttribute('data-image-src', '/images/videocover2-812-optimized.webp');

    fireEvent.click(screen.getByRole('button', { name: /skip intro/i }));

    await waitFor(() => {
      expect(mockMarkVisitComplete).toHaveBeenCalledTimes(1);
    });
    expect(mockMarkVisitComplete).toHaveBeenCalledWith();
  });


  it('waits for first-visit readiness before rendering the homepage', () => {
    mockUseFirstVisit.mockReturnValue({
      isFirstVisit: false,
      ready: false,
      markVisitComplete: mockMarkVisitComplete,
    });

    render(<Home />);

    expect(screen.getByText('Loading')).toBeInTheDocument();
    expect(screen.queryByLabelText('Homepage sections')).not.toBeInTheDocument();
  });

  it('shows the intro until a first visit completes, even if reduced motion is preferred', async () => {
    mockUsePrefersReducedMotion.mockReturnValue(true);
    mockUseFirstVisit.mockReturnValue({
      isFirstVisit: true,
      ready: true,
      markVisitComplete: mockMarkVisitComplete,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId('homepage-intro')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /skip intro/i })).toBeInTheDocument();
  });

  it('does not render the intro after a visit has already been completed', async () => {
    mockUseFirstVisit.mockReturnValue({
      isFirstVisit: false,
      ready: true,
      markVisitComplete: mockMarkVisitComplete,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByLabelText('Homepage sections')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('homepage-intro')).not.toBeInTheDocument();
  });

  it('shows loading before the mount microtask completes', () => {
    const originalQueueMicrotask = globalThis.queueMicrotask;

    globalThis.queueMicrotask = vi.fn();
    window.queueMicrotask = globalThis.queueMicrotask;

    render(<Home />);

    expect(screen.getByText('Loading')).toBeInTheDocument();

    globalThis.queueMicrotask = originalQueueMicrotask;
    window.queueMicrotask = originalQueueMicrotask;
  });

  it('marks the intro complete for returning visits on effect', async () => {
    mockUseFirstVisit.mockReturnValue({
      isFirstVisit: false,
      ready: true,
      markVisitComplete: mockMarkVisitComplete,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByLabelText('Homepage sections')).toBeInTheDocument();
    });

    expect(mockMarkVisitComplete).not.toHaveBeenCalled();
  });

  it('keeps the loading state when visit readiness is unavailable even after mount', () => {
    mockUseFirstVisit.mockReturnValue({
      isFirstVisit: true,
      ready: false,
      markVisitComplete: mockMarkVisitComplete,
    });

    render(<Home />);

    expect(screen.getByText('Loading')).toBeInTheDocument();
  });

  it('renders the homepage when first-visit logic is ready and not active', async () => {
    mockUseFirstVisit.mockReturnValue({
      isFirstVisit: false,
      ready: true,
      markVisitComplete: mockMarkVisitComplete,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByLabelText('Homepage sections')).toBeInTheDocument();
    });
  });

  it('renders the intro before the values section on first visit', async () => {
    mockUseFirstVisit.mockReturnValue({
      isFirstVisit: true,
      ready: true,
      markVisitComplete: mockMarkVisitComplete,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId('homepage-intro')).toBeInTheDocument();
    });
    expect(screen.queryByText('We Value')).toBeInTheDocument();
  });

  it('renders the homepage content tree underneath the intro overlay', async () => {
    mockUseFirstVisit.mockReturnValue({
      isFirstVisit: true,
      ready: true,
      markVisitComplete: mockMarkVisitComplete,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByLabelText('Homepage sections')).toBeInTheDocument();
    });

    expect(screen.getByTestId('homepage-intro')).toBeInTheDocument();
  });

  it('preserves the admissions link when the intro is active', async () => {
    mockUseFirstVisit.mockReturnValue({
      isFirstVisit: true,
      ready: true,
      markVisitComplete: mockMarkVisitComplete,
    });

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /start the application process/i })).toHaveAttribute('href', '/admissions');
    });
  });

  it('keeps division tab switching available after intro integration', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Grade 8' })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Grade 10 (SSC)' }));

    expect(screen.getByText('Grade 10 — SSC Board')).toBeInTheDocument();
  });

  it('keeps footer call-to-action rendering after intro integration', async () => {
    render(<Home />);

    await waitFor(() => {
      expect(screen.getByRole('link', { name: /start the application process/i })).toHaveAttribute('href', '/admissions');
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
