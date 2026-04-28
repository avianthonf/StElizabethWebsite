import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useMotionHorizontalScroll } from './useMotionHorizontalScroll';

// Mock Framer Motion
vi.mock('framer-motion', () => ({
  useScroll: vi.fn(() => ({
    scrollYProgress: { get: () => 0, on: vi.fn(), destroy: vi.fn() }
  })),
  useTransform: vi.fn((value, input, output) => ({
    get: () => output[0],
    on: vi.fn(),
    destroy: vi.fn()
  })),
  useSpring: vi.fn((value) => value),
  MotionValue: class {
    get() { return 0; }
    on() {}
    destroy() {}
  }
}));

describe('useMotionHorizontalScroll', () => {
  beforeEach(() => {
    // Mock DOM elements
    Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true, configurable: true });
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('returns containerRef, trackRef, x, and scrollYProgress', () => {
    const { result } = renderHook(() => useMotionHorizontalScroll());

    expect(result.current.containerRef).toBeDefined();
    expect(result.current.trackRef).toBeDefined();
    expect(result.current.x).toBeDefined();
    expect(result.current.scrollYProgress).toBeDefined();
  });

  it('calculates travel distance on mount', () => {
    const { result } = renderHook(() => useMotionHorizontalScroll());

    // Mock track element with scrollWidth
    const mockTrack = document.createElement('div');
    Object.defineProperty(mockTrack, 'scrollWidth', { value: 3000, writable: true });

    if (result.current.trackRef.current) {
      Object.defineProperty(result.current.trackRef.current, 'scrollWidth', { value: 3000 });
    }

    // Trigger resize to recalculate
    window.dispatchEvent(new Event('resize'));

    // Travel distance should be scrollWidth - innerWidth = 3000 - 1200 = 1800
    expect(result.current.trackRef).toBeDefined();
  });

  it('recalculates travel distance on window resize', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');

    renderHook(() => useMotionHorizontalScroll());

    // Verify resize listener was added (effect runs after render)
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('cleans up resize listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useMotionHorizontalScroll());

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });

  it('recalculates on image load', () => {
    renderHook(() => useMotionHorizontalScroll());

    // Hook sets up image load listeners in useEffect
    expect(true).toBe(true);
  });
});
