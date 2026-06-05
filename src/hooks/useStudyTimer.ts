'use client';

import { useEffect, useRef, useCallback } from 'react';
import { addStudyTime } from '@/lib/storage';

const IDLE_TIMEOUT = 3 * 60 * 1000;
const SAVE_INTERVAL = 30;

interface UseStudyTimerOptions {
  topicId?: string;
  enabled: boolean;
}

export function useStudyTimer({ topicId, enabled }: UseStudyTimerOptions) {
  const secondsRef = useRef(0);
  const isPausedRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const saveTimerRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const saveTime = useCallback(() => {
    if (secondsRef.current > 0) {
      addStudyTime(secondsRef.current, topicId);
      secondsRef.current = 0;
    }
  }, [topicId]);

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    if (isPausedRef.current) isPausedRef.current = false;
    idleTimerRef.current = setTimeout(() => { isPausedRef.current = true; }, IDLE_TIMEOUT);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const tickInterval = setInterval(() => {
      if (!isPausedRef.current) secondsRef.current += 1;
    }, 1000);

    saveTimerRef.current = setInterval(saveTime, SAVE_INTERVAL * 1000);

    const handleVisibility = () => {
      isPausedRef.current = document.hidden;
      if (!document.hidden) resetIdleTimer();
    };

    // Throttle activity handler to avoid creating/destroying timers at 60+ Hz
    let lastActivity = 0;
    const handleActivity = () => {
      const now = Date.now();
      if (now - lastActivity < 2000) return;
      lastActivity = now;
      resetIdleTimer();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keydown', handleActivity);
    document.addEventListener('click', handleActivity);
    document.addEventListener('scroll', handleActivity);
    resetIdleTimer();

    return () => {
      clearInterval(tickInterval);
      if (saveTimerRef.current) clearInterval(saveTimerRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
      document.removeEventListener('mousemove', handleActivity);
      document.removeEventListener('keydown', handleActivity);
      document.removeEventListener('click', handleActivity);
      document.removeEventListener('scroll', handleActivity);
      saveTime();
    };
  }, [enabled, topicId, saveTime, resetIdleTimer]);
}
