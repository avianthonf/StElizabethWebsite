import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

describe('usePrefersReducedMotion', () => {
  const originalMatchMedia = window.matchMedia;

  afterEach(() => {
    window.matchMedia = originalMatchMedia;
    vi.restoreAllMocks();
  });

  it('uses the modern media query listener API when available', () => {
    const addEventListener = vi.fn();
    const removeEventListener = vi.fn();

    window.matchMedia = vi.fn().mockReturnValue({
      matches: true,
      addEventListener,
      removeEventListener,
    });

    const { result, unmount } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(true);
    expect(addEventListener).toHaveBeenCalledWith('change', expect.any(Function));

    unmount();

    expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('falls back to legacy media query listeners when needed', () => {
    const addListener = vi.fn();
    const removeListener = vi.fn();

    window.matchMedia = vi.fn().mockReturnValue({
      matches: false,
      addListener,
      removeListener,
    });

    const { result, unmount } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);
    expect(addListener).toHaveBeenCalledWith(expect.any(Function));

    unmount();

    expect(removeListener).toHaveBeenCalledWith(expect.any(Function));
  });

  it('updates when the legacy listener callback fires', () => {
    let listener: (() => void) | undefined;
    let matches = false;

    window.matchMedia = vi.fn().mockImplementation(() => ({
      get matches() {
        return matches;
      },
      addListener(callback: () => void) {
        listener = callback;
      },
      removeListener: vi.fn(),
    }));

    const { result } = renderHook(() => usePrefersReducedMotion());

    expect(result.current).toBe(false);

    matches = true;
    act(() => {
      listener?.();
    });

    expect(result.current).toBe(true);
  });
});
