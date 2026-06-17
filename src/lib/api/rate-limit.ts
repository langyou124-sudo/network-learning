import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

// In-memory fallback for when Redis is not configured
const memStore = new Map<string, RateLimitEntry>();

if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of memStore) {
      if (now > entry.resetAt) memStore.delete(key);
    }
  }, 60_000).unref?.();
}

export interface RateLimitConfig {
  windowMs: number;
  max: number;
}

// Redis rate limiters (lazy init)
let chatLimiter: Ratelimit | null = null;
let searchLimiter: Ratelimit | null = null;
let evaluateLimiter: Ratelimit | null = null;

function getRedis(): Redis | null {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

function getChatLimiter(): Ratelimit | null {
  if (chatLimiter) return chatLimiter;
  const redis = getRedis();
  if (!redis) return null;
  chatLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '60 s'),
    analytics: true,
    prefix: 'daboli:chat',
  });
  return chatLimiter;
}

function getSearchLimiter(): Ratelimit | null {
  if (searchLimiter) return searchLimiter;
  const redis = getRedis();
  if (!redis) return null;
  searchLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(30, '60 s'),
    analytics: true,
    prefix: 'daboli:search',
  });
  return searchLimiter;
}

function getEvaluateLimiter(): Ratelimit | null {
  if (evaluateLimiter) return evaluateLimiter;
  const redis = getRedis();
  if (!redis) return null;
  evaluateLimiter = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '60 s'),
    analytics: true,
    prefix: 'daboli:evaluate',
  });
  return evaluateLimiter;
}

// 内存限流（降级方案）
function checkMemRateLimit(
  identifier: string,
  config: RateLimitConfig
): { ok: boolean; remaining: number; retryAfter: number } {
  const now = Date.now();
  const entry = memStore.get(identifier);

  if (!entry || now > entry.resetAt) {
    memStore.set(identifier, { count: 1, resetAt: now + config.windowMs });
    return { ok: true, remaining: config.max - 1, retryAfter: 0 };
  }

  if (entry.count >= config.max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { ok: false, remaining: 0, retryAfter };
  }

  entry.count++;
  return { ok: true, remaining: config.max - entry.count, retryAfter: 0 };
}

export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<{ ok: boolean; remaining: number; retryAfter: number }> {
  // 尝试 Redis 限流
  let limiter: Ratelimit | null = null;
  if (config.max === 10) limiter = getChatLimiter();
  else if (config.max === 5) limiter = getEvaluateLimiter();
  else limiter = getSearchLimiter();
  if (limiter) {
    const result = await limiter.limit(identifier);
    return {
      ok: result.success,
      remaining: result.remaining,
      retryAfter: result.success ? 0 : Math.ceil((result.reset - Date.now()) / 1000),
    };
  }

  // 降级到内存限流
  return checkMemRateLimit(identifier, config);
}

export const RATE_LIMITS = {
  chat: { windowMs: 60_000, max: 10 },
  search: { windowMs: 60_000, max: 30 },
  evaluate: { windowMs: 60_000, max: 5 },
} as const;
