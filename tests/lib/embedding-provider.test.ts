import { describe, it, expect } from 'vitest';
import {
  describeEmbedding,
  embeddingRequestBody,
  embeddingUrl,
  resolveEmbeddingConfig,
} from '@/lib/api/embedding';

describe('resolveEmbeddingConfig', () => {
  it('默认走智谱，并回落到 ZHIPUAI_API_KEY', () => {
    const config = resolveEmbeddingConfig({ ZHIPUAI_API_KEY: 'zhipu-key' });
    expect(config.provider).toBe('zhipu');
    expect(config.url).toBe('https://open.bigmodel.cn/api/paas/v4/embeddings');
    expect(config.model).toBe('embedding-3');
    expect(config.apiKey).toBe('zhipu-key');
    expect(config.dimensions).toBeUndefined();
  });

  it('EMBEDDING_API_KEY 优先于旧变量', () => {
    const config = resolveEmbeddingConfig({ EMBEDDING_API_KEY: 'new', ZHIPUAI_API_KEY: 'old' });
    expect(config.apiKey).toBe('new');
  });

  it('openai 协议会自动把根地址补成 /embeddings', () => {
    const config = resolveEmbeddingConfig({
      EMBEDDING_PROVIDER: 'openai',
      EMBEDDING_BASE_URL: 'https://api.siliconflow.cn/v1/',
      EMBEDDING_MODEL: 'BAAI/bge-m3',
      EMBEDDING_API_KEY: 'k',
    });
    expect(config.provider).toBe('openai');
    expect(config.url).toBe('https://api.siliconflow.cn/v1/embeddings');
    expect(config.model).toBe('BAAI/bge-m3');
  });

  it('已经是完整端点时不重复拼接', () => {
    expect(embeddingUrl('https://x.com/v1/embeddings')).toBe('https://x.com/v1/embeddings');
  });

  it('解析数字维度，非法值忽略', () => {
    expect(resolveEmbeddingConfig({ EMBEDDING_DIMENSIONS: '1024' }).dimensions).toBe(1024);
    expect(resolveEmbeddingConfig({ EMBEDDING_DIMENSIONS: 'abc' }).dimensions).toBeUndefined();
    expect(resolveEmbeddingConfig({ EMBEDDING_DIMENSIONS: '-1' }).dimensions).toBeUndefined();
  });

  it('未知 provider 回落到智谱，避免拼错就崩', () => {
    expect(resolveEmbeddingConfig({ EMBEDDING_PROVIDER: 'deepseek' }).provider).toBe('zhipu');
  });
});

describe('embeddingRequestBody', () => {
  it('有维度时带上 dimensions', () => {
    const body = embeddingRequestBody(
      { provider: 'zhipu', url: '', model: 'embedding-3', apiKey: 'k', dimensions: 2048 },
      'hello',
    );
    expect(body).toEqual({ model: 'embedding-3', input: 'hello', dimensions: 2048 });
  });

  it('没维度时不带该字段', () => {
    const body = embeddingRequestBody({ provider: 'zhipu', url: '', model: 'embedding-3', apiKey: 'k' }, 'hello');
    expect(body).toEqual({ model: 'embedding-3', input: 'hello' });
  });
});

describe('describeEmbedding', () => {
  it('给出一行可读描述，便于脚本日志', () => {
    const text = describeEmbedding({
      provider: 'openai',
      url: 'https://x/v1/embeddings',
      model: 'bge-m3',
      apiKey: 'k',
      dimensions: 1024,
    });
    expect(text).toContain('openai');
    expect(text).toContain('bge-m3');
    expect(text).toContain('1024');
  });
});
