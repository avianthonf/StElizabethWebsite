import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StickySplitSection } from './StickySplitSection';
const mockUsePrefersReducedMotion = vi.fn(() => false);

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => mockUsePrefersReducedMotion(),
}));

describe('StickySplitSection', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePrefersReducedMotion.mockReturnValue(false);
    Object.defineProperty(window, 'innerWidth', {
      value: 1200,
      writable: true,
      configurable: true,
    });
  });

  it('switches to a single-column mobile layout on narrow viewports', async () => {
    Object.defineProperty(window, 'innerWidth', {
      value: 480,
      writable: true,
      configurable: true,
    });

    const { container } = render(
      <StickySplitSection
        overline="Overline"
        heading="Heading"
        body="Body"
        accordion={[{ title: 'Item 1', content: 'Content 1' }]}
        leftImage="/left.jpg"
        rightImages={['/right-1.jpg', '/right-2.jpg']}
      />
    );

    await waitFor(() => {
      const grid = container.querySelector('section > div') as HTMLDivElement;
      expect(grid.style.gridTemplateColumns).toBe('1fr');
    });
  });

  it('disables accordion transitions when reduced motion is preferred', () => {
    mockUsePrefersReducedMotion.mockReturnValue(true);

    render(
      <StickySplitSection
        overline="Overline"
        heading="Heading"
        body="Body"
        accordion={[{ title: 'Item 1', content: 'Content 1' }]}
      />
    );

    const button = screen.getByRole('button', { name: /item 1/i });
    const content = button.nextElementSibling as HTMLDivElement;

    Object.defineProperty(content, 'scrollHeight', {
      configurable: true,
      value: 260,
    });

    fireEvent.click(button);

    const icon = screen.getByLabelText('Toggle Item 1');

    expect(icon).toHaveStyle({ transition: 'none' });
    expect(content).toHaveStyle({ transition: 'none', maxHeight: '260px' });
  });

  it('expands accordion content to its measured height for long copy', () => {
    render(
      <StickySplitSection
        overline="Overline"
        heading="Heading"
        body="Body"
        accordion={[
          {
            title: 'Item 1',
            content: 'Long content '.repeat(80),
          },
        ]}
      />
    );

    const button = screen.getByRole('button', { name: /item 1/i });
    const content = button.nextElementSibling as HTMLDivElement;

    Object.defineProperty(content, 'scrollHeight', {
      configurable: true,
      value: 340,
    });

    fireEvent.click(button);

    expect(content).toHaveStyle({ maxHeight: '340px' });
  });
});
