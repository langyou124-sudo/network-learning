import { describe, it, expect } from 'vitest';
import { validateChatBody, validateSearchParams } from '@/lib/api/validate';

describe('validateChatBody', () => {
  const validBody = {
    messages: [{ role: 'user', content: 'hello' }],
  };

  it('accepts valid body', () => {
    const result = validateChatBody(validBody);
    expect(result.ok).toBe(true);
    expect(result.messages).toHaveLength(1);
  });

  it('accepts body with context', () => {
    const result = validateChatBody({ ...validBody, context: 'some context' });
    expect(result.ok).toBe(true);
    expect(result.context).toBe('some context');
  });

  it('rejects null body', () => {
    expect(validateChatBody(null).ok).toBe(false);
  });

  it('rejects non-object body', () => {
    expect(validateChatBody('string').ok).toBe(false);
  });

  it('rejects missing messages', () => {
    expect(validateChatBody({}).ok).toBe(false);
  });

  it('rejects empty messages array', () => {
    expect(validateChatBody({ messages: [] }).ok).toBe(false);
  });

  it('rejects messages exceeding 50', () => {
    const messages = Array.from({ length: 51 }, (_, i) => ({
      role: 'user',
      content: `msg ${i}`,
    }));
    expect(validateChatBody({ messages }).ok).toBe(false);
  });

  it('rejects invalid role', () => {
    expect(validateChatBody({
      messages: [{ role: 'system', content: 'hi' }],
    }).ok).toBe(false);
  });

  it('rejects message content > 5000 chars', () => {
    expect(validateChatBody({
      messages: [{ role: 'user', content: 'x'.repeat(5001) }],
    }).ok).toBe(false);
  });

  it('rejects context > 10000 chars', () => {
    expect(validateChatBody({
      messages: [{ role: 'user', content: 'hi' }],
      context: 'x'.repeat(10001),
    }).ok).toBe(false);
  });
});

describe('validateSearchParams', () => {
  it('accepts valid params', () => {
    const params = new URLSearchParams({ q: 'test' });
    const result = validateSearchParams(params);
    expect(result.ok).toBe(true);
    expect(result.query).toBe('test');
    expect(result.limit).toBe(5);
  });

  it('caps limit at 20', () => {
    const params = new URLSearchParams({ q: 'test', limit: '100' });
    const result = validateSearchParams(params);
    expect(result.ok).toBe(true);
    expect(result.limit).toBe(20);
  });

  it('rejects missing query', () => {
    const params = new URLSearchParams();
    expect(validateSearchParams(params).ok).toBe(false);
  });

  it('rejects empty query', () => {
    const params = new URLSearchParams({ q: '   ' });
    expect(validateSearchParams(params).ok).toBe(false);
  });

  it('rejects query > 500 chars', () => {
    const params = new URLSearchParams({ q: 'x'.repeat(501) });
    expect(validateSearchParams(params).ok).toBe(false);
  });

  it('rejects invalid limit', () => {
    const params = new URLSearchParams({ q: 'test', limit: 'abc' });
    expect(validateSearchParams(params).ok).toBe(false);
  });

  it('includes moduleId when provided', () => {
    const params = new URLSearchParams({ q: 'test', module: 'mod-1' });
    const result = validateSearchParams(params);
    expect(result.moduleId).toBe('mod-1');
  });
});
