import { describe, it, expect } from 'vitest';
import { validateSearchParams } from '@/lib/api/validate';
import { subjectLabel, moduleIdsOfSubject } from '@/lib/chat-persona';

describe('validateSearchParams', () => {
  it('解析 subject 并透传', () => {
    const result = validateSearchParams(new URLSearchParams('q=VLAN&limit=8&subject=network'));
    expect(result.ok).toBe(true);
    expect(result.subject).toBe('network');
    expect(result.limit).toBe(8);
  });

  it('没有 subject 时为 undefined', () => {
    expect(validateSearchParams(new URLSearchParams('q=VLAN')).subject).toBeUndefined();
  });

  it('limit 上限仍是 20', () => {
    expect(validateSearchParams(new URLSearchParams('q=x&limit=999')).limit).toBe(20);
  });

  it('缺关键词仍然报错', () => {
    expect(validateSearchParams(new URLSearchParams('subject=network')).ok).toBe(false);
  });
});

describe('subjectLabel', () => {
  it('已知学科返回中文名', () => {
    expect(subjectLabel('network')).toBe('网络工程');
    expect(subjectLabel('pe-exam-303')).toBe('考研数学三');
  });

  it('非法或空值返回 null', () => {
    expect(subjectLabel('unknown')).toBeNull();
    expect(subjectLabel(null)).toBeNull();
    expect(subjectLabel(undefined)).toBeNull();
  });
});

describe('moduleIdsOfSubject', () => {
  it('能够把检索结果里的 module_id 归到学科', () => {
    const mathIds = moduleIdsOfSubject('pe-exam-303');
    const marxIds = moduleIdsOfSubject('marxism');
    expect([...mathIds].some((id) => marxIds.has(id))).toBe(false);
  });
});
