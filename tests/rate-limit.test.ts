import { describe, it, expect, beforeEach } from 'vitest';
import { checkRateLimit } from '@/lib/api/rate-limit';

beforeEach(() => {
  // Rate limiter uses in-memory store, each test gets fresh state
});

describe('checkRateLimit', () => {
  const config = { windowMs: 60_000, max: 3 };

  it('allows first request', () => {
    const result = checkRateLimit('test-ip', config);
    expect(result.ok).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it('tracks remaining count', () => {
    checkRateLimit('test-ip2', config);
    checkRateLimit('test-ip2', config);
    const result = checkRateLimit('test-ip2', config);
    expect(result.ok).toBe(true);
    expect(result.remaining).toBe(0);
  });

  it('blocks after limit exceeded', () => {
    for (let i = 0; i < 3; i++) checkRateLimit('test-ip3', config);
    const result = checkRateLimit('test-ip3', config);
    expect(result.ok).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it('different identifiers are independent', () => {
    for (let i = 0; i < 3; i++) checkRateLimit('ip-a', config);
    const result = checkRateLimit('ip-b', config);
    expect(result.ok).toBe(true);
  });
});
