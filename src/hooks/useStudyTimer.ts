'use client';

import { useEffect, useRef, useCallback } from 'react';
import { addStudyTime } from '@/lib/storage';

// 空闲超时：3分钟（毫秒）
const IDLE_TIMEOUT = 3 * 60 * 1000;
// 持久化间隔：30秒
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
    if (isPausedRef.current) {
      isPausedRef.current = false;
    }
    idleTimerRef.current = setTimeout(() => {
      isPausedRef.current = true;
    }, IDLE_TIMEOUT);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    // 每秒计数
    const tickInterval = setInterval(() => {
      if (!isPausedRef.current) {
        secondsRef.current += 1;
      }
    }, 1000);

    // 每30秒持久化一次
    saveTimerRef.current = setInterval(saveTime, SAVE_INTERVAL * 1000);

    // 标签页可见性
    const handleVisibility = () => {
      if (document.hidden) {
        isPausedRef.current = true;
      } else {
        isPausedRef.current = false;
        resetIdleTimer();
      }
    };

    // 用户活动检测
    const handleActivity = () => {
      resetIdleTimer();
    };

    document.addEventListener('visibilitychange', handleVisibility);
    document.addEventListener('mousemove', handleActivity);
    document.addEventListener('keydown', handleActivity);
    document.addEventListener('click', handleActivity);
    document.addEventListener('scroll', handleActivity);

    // 启动空闲计时器
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
      // 卸载时保存剩余时间
      saveTime();
    };
  }, [enabled, topicId, saveTime, resetIdleTimer]);
}
