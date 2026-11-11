'use client';

import { useEffect } from 'react';
import { startSync } from '@/lib/sync';

/**
 * 挂载全局学习数据同步。不渲染任何东西。
 * 未登录时什么也不做；表不存在时同步自动禁用，本地数据照常。
 */
export default function SyncProvider() {
  useEffect(() => startSync(), []);
  return null;
}
