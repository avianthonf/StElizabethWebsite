import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useFirstVisit } from './useFirstVisit';

describe('useFirstVisit', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('starts not ready until the session check runs', () => {
    const { result } = renderHook(() => useFirstVisit('homepage-intro-seen'));

    expect(result.current.ready).toBe(false);
    expect(result.current.isFirstVisit).toBe(false);
  });

  it('reports a first visit when the session key is missing', async () => {
    const { result } = renderHook(() => useFirstVisit('homepage-intro-seen'));

    await waitFor(() => {
      expect(result.current.ready).toBe(true);
    });

    expect(result.current.isFirstVisit).toBe(true);
  });

  it('reports a returning visit when the session key is present', async () => {
    window.sessionStorage.setItem('homepage-intro-seen', 'true');

    const { result } = renderHook(() => useFirstVisit('homepage-intro-seen'));

    await waitFor(() => {
      expect(result.current.ready).toBe(true);
    });

    expect(result.current.isFirstVisit).toBe(false);
  });

  it('writes the completion key when the visit is marked complete', async () => {
    const { result } = renderHook(() => useFirstVisit('homepage-intro-seen'));

    await waitFor(() => {
      expect(result.current.ready).toBe(true);
    });

    act(() => {
      result.current.markVisitComplete();
    });

    expect(window.sessionStorage.getItem('homepage-intro-seen')).toBe('true');
    expect(result.current.isFirstVisit).toBe(false);
    expect(result.current.ready).toBe(true);
  });
});
