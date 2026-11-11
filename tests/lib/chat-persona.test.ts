import { describe, it, expect } from 'vitest';
import { buildSystemPrompt, formatRagContext, isSubjectId, moduleIdsOfSubject, pickRelevantChunks } from '@/lib/chat-persona';

describe('buildSystemPrompt', () => {
  it('按学科注入范围，不再写死网络工程', () => {
    const network = buildSystemPrompt({ subject: 'network' });
    expect(network).toContain('网络工程');

    const marxism = buildSystemPrompt({ subject: 'marxism' });
    expect(marxism).toContain('马克思主义');
    expect(marxism).not.toContain('网络工程');
  });

  it('没有学科时给通用口径，而不是硬拒绝', () => {
    const prompt = buildSystemPrompt({ subject: null });
    expect(prompt).toContain('没有指定学科');
    expect(prompt).not.toContain('礼貌说明并尽量关联到网络领域');
  });

  it('非法学科按未指定处理', () => {
    expect(buildSystemPrompt({ subject: 'astrology' })).toContain('没有指定学科');
  });

  it('把知识库片段和当前课题拼进提示词', () => {
    const prompt = buildSystemPrompt({
      subject: 'ruankao',
      ragContext: '【OSI】七层模型',
      context: '用户正在看：网络体系结构',
    });
    expect(prompt).toContain('【OSI】七层模型');
    expect(prompt).toContain('网络体系结构');
  });

  it('都要求不确定时明确说出，不编造', () => {
    expect(buildSystemPrompt({ subject: 'network' })).toContain('不要编造');
  });
});

describe('pickRelevantChunks', () => {
  const chunks = [
    { module_id: 'sdn-nfv', chunk_text: 'SDN 控制面与数据面分离' },
    { module_id: 'marx-philosophy', chunk_text: '实践是认识的基础' },
    { module_id: null, chunk_text: '没有模块信息的片段' },
  ];

  it('按学科过滤掉其它学科的片段', () => {
    const picked = pickRelevantChunks(chunks, 'network');
    expect(picked.map(c => c.chunk_text)).toEqual(['SDN 控制面与数据面分离']);
  });

  it('过滤后为空时退回原始结果，避免答案变空', () => {
    const picked = pickRelevantChunks(chunks, 'pe-exam-303');
    expect(picked).toHaveLength(chunks.length);
  });

  it('未指定学科时不做过滤', () => {
    expect(pickRelevantChunks(chunks, null)).toHaveLength(3);
  });

  it('空输入返回空数组', () => {
    expect(pickRelevantChunks([], 'network')).toEqual([]);
  });
});

describe('moduleIdsOfSubject', () => {
  it('给出该学科的模块 id 集合', () => {
    const ids = moduleIdsOfSubject('network');
    expect(ids.size).toBeGreaterThan(0);
    expect(ids.has('sdn-nfv')).toBe(true);
  });

  it('学科之间不共享模块', () => {
    expect(moduleIdsOfSubject('network').has('marx-philosophy')).toBe(false);
  });
});

describe('isSubjectId', () => {
  it('只接受已注册的学科', () => {
    expect(isSubjectId('network')).toBe(true);
    expect(isSubjectId('pe-exam-303')).toBe(true);
    expect(isSubjectId('nope')).toBe(false);
    expect(isSubjectId(undefined)).toBe(false);
  });
});

describe('formatRagContext', () => {
  it('带课题标题时用标题，缺省用占位', () => {
    const text = formatRagContext([
      { chunk_text: '内容A', metadata: { topicTitle: 'OSI 七层' } },
      { chunk_text: '内容B' },
    ]);
    expect(text).toContain('【OSI 七层】');
    expect(text).toContain('【相关知识】');
  });
});
