import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '@/lib/api/rate-limit';

describe('checkRateLimit', () => {
  const config = { windowMs: 60_000, max: 3 };

  it('allows first request', async () => {
    const result = await checkRateLimit('test-ip', config);
    expect(result.ok).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it('tracks remaining count', async () => {
    await checkRateLimit('test-ip2', config);
    await checkRateLimit('test-ip2', config);
    const result = await checkRateLimit('test-ip2', config);
    expect(result.ok).toBe(true);
    expect(result.remaining).toBe(0);
  });

  it('blocks after limit exceeded', async () => {
    for (let i = 0; i < 3; i++) await checkRateLimit('test-ip3', config);
    const result = await checkRateLimit('test-ip3', config);
    expect(result.ok).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it('different identifiers are independent', async () => {
    for (let i = 0; i < 3; i++) await checkRateLimit('ip-a', config);
    const result = await checkRateLimit('ip-b', config);
    expect(result.ok).toBe(true);
  });
});
