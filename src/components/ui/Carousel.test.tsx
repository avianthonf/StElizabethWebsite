import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Carousel } from './Carousel';

const scrollPrev = vi.fn();
const scrollNext = vi.fn();
const scrollTo = vi.fn();
const on = vi.fn();
const off = vi.fn();

let mockEmblaApi: {
  scrollPrev: typeof scrollPrev;
  scrollNext: typeof scrollNext;
  scrollTo: typeof scrollTo;
  selectedScrollSnap: () => number;
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
  scrollSnapList: () => number[];
  on: typeof on;
  off: typeof off;
} | null = null;

vi.mock('embla-carousel-react', () => ({
  default: () => [vi.fn(), mockEmblaApi],
}));

describe('Carousel', () => {
  afterEach(() => {
    cleanup();
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockEmblaApi = {
      scrollPrev,
      scrollNext,
      scrollTo,
      selectedScrollSnap: () => 0,
      canScrollPrev: () => true,
      canScrollNext: () => true,
      scrollSnapList: () => [0, 1, 2],
      on,
      off,
    };
  });

  it('renders arrow controls with enabled state from Embla', async () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Previous slide' })).toBeEnabled();
      expect(screen.getByRole('button', { name: 'Next slide' })).toBeEnabled();
    });
  });

  it('calls Embla methods when arrow controls are clicked', async () => {
    render(
      <Carousel>
        <div>Slide 1</div>
        <div>Slide 2</div>
      </Carousel>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Previous slide' })).toBeEnabled();
    });

    fireEvent.click(screen.getByRole('button', { name: 'Previous slide' }));
    fireEvent.click(screen.getByRole('button', { name: 'Next slide' }));

    expect(scrollPrev).toHaveBeenCalledTimes(1);
    expect(scrollNext).toHaveBeenCalledTimes(1);
  });

  it('renders dot indicators with explicit active and inactive widths', async () => {
    render(
      <Carousel showDots>
        <div>Slide 1</div>
        <div>Slide 2</div>
        <div>Slide 3</div>
      </Carousel>
    );

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Go to slide 1' })).toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Go to slide 1' }).className).toContain('w-8');
    expect(screen.getByRole('button', { name: 'Go to slide 2' }).className).toContain('w-2');
    expect(screen.getByRole('button', { name: 'Go to slide 3' }).className).toContain('w-2');
  });
});
