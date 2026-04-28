import { cleanup, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HeroMasked } from './HeroMasked';

const mockUsePrefersReducedMotion = vi.fn(() => false);
const timelineProgress = vi.fn();
const timelineKill = vi.fn();
const timelineFromTo = vi.fn();
const timelineTo = vi.fn();
const timelineMock = {
  fromTo: timelineFromTo,
  to: timelineTo,
  progress: timelineProgress,
  kill: timelineKill,
};

vi.mock('@/lib/hooks/usePrefersReducedMotion', () => ({
  usePrefersReducedMotion: () => mockUsePrefersReducedMotion(),
}));

vi.mock('@/lib/gsap-config', () => ({
  gsap: {
    timeline: vi.fn(() => timelineMock),
    set: vi.fn(),
  },
}));

describe('HeroMasked', () => {
  const originalAddEventListener = window.addEventListener;
  const originalRemoveEventListener = window.removeEventListener;

  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePrefersReducedMotion.mockReturnValue(false);
    timelineFromTo.mockReturnValue(timelineMock);
    timelineTo.mockReturnValue(timelineMock);
  });

  afterEach(() => {
    cleanup();
    window.addEventListener = originalAddEventListener;
    window.removeEventListener = originalRemoveEventListener;
  });

  it('skips timeline setup and applies static state when reduced motion is preferred', async () => {
    mockUsePrefersReducedMotion.mockReturnValue(true);
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const { gsap } = await import('@/lib/gsap-config');

    render(<HeroMasked />);

    expect(gsap.timeline).not.toHaveBeenCalled();
    expect(gsap.set).toHaveBeenCalledTimes(3);
    expect(gsap.set).toHaveBeenCalledWith(expect.anything(), { opacity: 1, y: 0 });
    expect(addEventListenerSpy).not.toHaveBeenCalledWith('horizontal-scroll-hero', expect.any(Function));
  });

  it('registers and cleans up the hero scroll listener when motion is allowed', async () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    const { gsap } = await import('@/lib/gsap-config');

    const { unmount } = render(<HeroMasked />);

    expect(gsap.timeline).toHaveBeenCalled();
    expect(addEventListenerSpy).toHaveBeenCalledWith('horizontal-scroll-hero', expect.any(Function));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('horizontal-scroll-hero', expect.any(Function));
    expect(timelineKill).toHaveBeenCalled();
  });
});
