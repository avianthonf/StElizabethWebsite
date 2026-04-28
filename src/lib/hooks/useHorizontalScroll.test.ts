import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ScrollTrigger, gsap } from '@/lib/gsap-config';
import { useHorizontalScroll } from './useHorizontalScroll';

type ScrollAnimationConfig = {
  x?: number;
  scrollTrigger?: {
    invalidateOnRefresh?: boolean;
    scrub?: number;
  };
};

function getGsapToCalls() {
  return vi.mocked(gsap.to).mock.calls as Array<[unknown, ScrollAnimationConfig]>;
}

function getScrollTriggerRefreshCalls() {
  return vi.mocked(ScrollTrigger.refresh).mock.calls;
}

vi.mock('@/lib/gsap-config', () => ({
  gsap: {
    context: vi.fn((callback: () => void) => {
      callback();
      return { revert: vi.fn() };
    }),
    to: vi.fn(),
  },
  ScrollTrigger: {
    refresh: vi.fn(),
  },
}));

describe('useHorizontalScroll', () => {
  let containerRef: React.RefObject<HTMLDivElement>;
  let trackRef: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    const container = document.createElement('div');
    const track = document.createElement('div');

    Object.defineProperty(track, 'scrollWidth', { value: 3000, writable: true });
    Object.defineProperty(window, 'innerWidth', { value: 1200, writable: true });

    containerRef = { current: container };
    trackRef = { current: track };

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('calculates initial travel distance', () => {
    renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    expect(gsap.to).toHaveBeenCalledWith(
      trackRef.current,
      expect.objectContaining({
        x: -1800,
      })
    );
  });

  it('recalculates travel distance on window resize', () => {
    vi.useFakeTimers();
    renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true });

    const callCountBefore = getGsapToCalls().length;
    window.dispatchEvent(new Event('resize'));

    expect(getGsapToCalls().length).toBe(callCountBefore);

    vi.advanceTimersByTime(200);

    expect(getGsapToCalls().length).toBeGreaterThan(callCountBefore);
    expect(getGsapToCalls().find((call) => call[1]?.x === -2000)).toBeDefined();

    vi.useRealTimers();
  });

  it('debounces resize handler', () => {
    vi.useFakeTimers();
    renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    const refreshCallCountBefore = getScrollTriggerRefreshCalls().length;

    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));

    expect(getScrollTriggerRefreshCalls().length).toBe(refreshCallCountBefore);

    vi.advanceTimersByTime(199);
    expect(getScrollTriggerRefreshCalls().length).toBe(refreshCallCountBefore);

    vi.advanceTimersByTime(1);
    const refreshCallCountAfterDebounce = getScrollTriggerRefreshCalls().length;
    expect(refreshCallCountAfterDebounce).toBeGreaterThan(refreshCallCountBefore);

    vi.advanceTimersByTime(200);
    expect(getScrollTriggerRefreshCalls().length).toBe(refreshCallCountAfterDebounce);

    vi.useRealTimers();
  });

  it('passes invalidateOnRefresh and aligned scrub timing to ScrollTrigger', () => {
    renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    expect(gsap.to).toHaveBeenCalledWith(
      trackRef.current,
      expect.objectContaining({
        scrollTrigger: expect.objectContaining({
          invalidateOnRefresh: true,
          scrub: 1.2,
        }),
      })
    );
  });

  it('cleans up resize and load listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(removeEventListenerSpy).toHaveBeenCalledWith('load', expect.any(Function));
  });
});
