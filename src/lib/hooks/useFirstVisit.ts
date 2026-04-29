'use client';

import { useCallback, useEffect, useState } from 'react';

interface UseFirstVisitResult {
  isFirstVisit: boolean;
  ready: boolean;
  markVisitComplete: () => void;
}

interface FirstVisitState {
  isFirstVisit: boolean;
  ready: boolean;
}

const INITIAL_STATE: FirstVisitState = {
  isFirstVisit: false,
  ready: false,
};

export function useFirstVisit(storageKey: string): UseFirstVisitResult {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    let cancelled = false;

    queueMicrotask(() => {
      if (cancelled || typeof window === 'undefined') {
        return;
      }

      setState({
        isFirstVisit: window.sessionStorage.getItem(storageKey) !== 'true',
        ready: true,
      });
    });

    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  const markVisitComplete = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(storageKey, 'true');
    }

    setState({
      isFirstVisit: false,
      ready: true,
    });
  }, [storageKey]);

  return {
    isFirstVisit: state.isFirstVisit,
    ready: state.ready,
    markVisitComplete,
  };
}
