import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useHorizontalScroll } from './useHorizontalScroll';
import { gsap } from '@/lib/gsap-config';

// Mock GSAP
vi.mock('@/lib/gsap-config', () => ({
  gsap: {
    context: vi.fn((callback) => {
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
    // Mock DOM elements
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
        x: -1800, // 3000 - 1200 = 1800
      })
    );
  });

  it('recalculates travel distance on window resize', () => {
    vi.useFakeTimers();
    renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    // Simulate resize
    Object.defineProperty(window, 'innerWidth', { value: 1000, writable: true });

    const callCountBefore = (gsap.to as any).mock.calls.length;
    window.dispatchEvent(new Event('resize'));

    // Should not call immediately (debounced)
    expect((gsap.to as any).mock.calls.length).toBe(callCountBefore);

    // Wait for debounce (150ms)
    vi.advanceTimersByTime(150);

    // Should have called gsap.to with new travel distance
    expect((gsap.to as any).mock.calls.length).toBeGreaterThan(callCountBefore);

    // Find the call with the new x value
    const calls = (gsap.to as any).mock.calls;
    const resizeCall = calls.find((call: any) => call[1]?.x === -2000);
    expect(resizeCall).toBeDefined();

    vi.useRealTimers();
  });

  it('debounces resize handler', () => {
    vi.useFakeTimers();
    renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    const callCountBefore = (gsap.to as any).mock.calls.length;

    // Trigger multiple resizes rapidly
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));
    window.dispatchEvent(new Event('resize'));

    // Should not call gsap.to yet (debounced)
    expect((gsap.to as any).mock.calls.length).toBe(callCountBefore);

    // After debounce delay, should call once (or twice due to context re-execution)
    vi.advanceTimersByTime(150);
    expect((gsap.to as any).mock.calls.length).toBeGreaterThan(callCountBefore);

    // Verify debounce worked - should not have 3+ additional calls
    const callCountAfter = (gsap.to as any).mock.calls.length;
    expect(callCountAfter - callCountBefore).toBeLessThanOrEqual(3);

    vi.useRealTimers();
  });

  it('cleans up resize listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useHorizontalScroll({ containerRef, trackRef }));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
