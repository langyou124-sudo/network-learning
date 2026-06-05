interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Serverless cold starts accumulate stale entries — clean up periodically
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store) {
      if (now > entry.resetAt) store.delete(key);
    }
  }, 60_000).unref?.();
}

export interface RateLimitConfig {
  windowMs: number;  // 时间窗口（毫秒）
  max: number;       // 窗口内最大请求数
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): { ok: boolean; remaining: number; retryAfter: number } {
  const now = Date.now();
  const key = identifier;
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + config.windowMs });
    return { ok: true, remaining: config.max - 1, retryAfter: 0 };
  }

  if (entry.count >= config.max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { ok: false, remaining: 0, retryAfter };
  }

  entry.count++;
  return { ok: true, remaining: config.max - entry.count, retryAfter: 0 };
}

// 预设配置
export const RATE_LIMITS = {
  // 聊天接口：每分钟最多 10 次（LLM 调用贵）
  chat: { windowMs: 60_000, max: 10 },
  // 搜索接口：每分钟最多 30 次
  search: { windowMs: 60_000, max: 30 },
} as const;
