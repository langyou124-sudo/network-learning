import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock Supabase
vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(() => ({
    auth: {
      getUser: vi.fn().mockResolvedValue({
        data: { user: { id: 'test-user-id', email: 'test@example.com' } },
        error: null,
      }),
    },
    rpc: vi.fn().mockResolvedValue({
      data: [
        { chunk_text: 'Test content', metadata: { topicTitle: 'Test Topic' } },
      ],
      error: null,
    }),
  })),
}));

// Mock rate limiter
vi.mock('@/lib/api/rate-limit', () => ({
  checkRateLimit: vi.fn().mockResolvedValue({ ok: true, remaining: 9, retryAfter: 0 }),
  RATE_LIMITS: { chat: { windowMs: 60000, max: 10 }, search: { windowMs: 60000, max: 30 } },
}));

// Mock embedding
vi.mock('@/lib/api/embedding', () => ({
  getEmbedding: vi.fn().mockResolvedValue([0.1, 0.2, 0.3]),
}));

describe('Chat API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should validate chat body correctly', async () => {
    const { validateChatBody } = await import('@/lib/api/validate');
    
    // Valid body
    const validResult = validateChatBody({
      messages: [{ role: 'user', content: 'hello' }],
    });
    expect(validResult.ok).toBe(true);
    expect(validResult.messages).toHaveLength(1);
    
    // Invalid: empty messages
    const emptyResult = validateChatBody({ messages: [] });
    expect(emptyResult.ok).toBe(false);
    expect(emptyResult.error).toBe('messages 不能为空');
    
    // Invalid: message too long
    const longResult = validateChatBody({
      messages: [{ role: 'user', content: 'x'.repeat(5001) }],
    });
    expect(longResult.ok).toBe(false);
    expect(longResult.error).toBe('单条消息不能超过 5000 字');
    
    // Invalid: too many messages
    const manyResult = validateChatBody({
      messages: Array(51).fill({ role: 'user', content: 'test' }),
    });
    expect(manyResult.ok).toBe(false);
    expect(manyResult.error).toBe('对话轮数不能超过 50 轮');
  });

  it('should validate search params correctly', async () => {
    const { validateSearchParams } = await import('@/lib/api/validate');
    
    // Valid params
    const validResult = validateSearchParams(new URLSearchParams('q=test&limit=5'));
    expect(validResult.ok).toBe(true);
    expect(validResult.query).toBe('test');
    expect(validResult.limit).toBe(5);
    
    // Missing query
    const missingResult = validateSearchParams(new URLSearchParams(''));
    expect(missingResult.ok).toBe(false);
    expect(missingResult.error).toBe('缺少搜索关键词');
    
    // Query too long
    const longResult = validateSearchParams(new URLSearchParams(`q=${'x'.repeat(501)}`));
    expect(longResult.ok).toBe(false);
    expect(longResult.error).toBe('搜索关键词不能超过 500 字');
    
    // Limit capped at 20
    const cappedResult = validateSearchParams(new URLSearchParams('q=test&limit=100'));
    expect(cappedResult.ok).toBe(true);
    expect(cappedResult.limit).toBe(20);
  });
});
