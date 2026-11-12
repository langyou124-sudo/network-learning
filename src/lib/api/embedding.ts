/**
 * 可配置的 Embedding 供应商。
 *
 * 之所以要抽象：向量化这一步和问答是两条独立的链路——DeepSeek 只有 chat 接口、
 * 没有 embeddings，所以「换掉智谱」只能换问答那一半。这里把 embedding 抽出来，
 * 以后换家只改环境变量，不动代码。
 *
 * 环境变量：
 *   EMBEDDING_PROVIDER   zhipu（默认）| openai
 *   EMBEDDING_BASE_URL   端到端 URL 或根地址（openai 协议下自动补 /embeddings）
 *   EMBEDDING_MODEL      默认 zhipu=embedding-3 / openai=text-embedding-3-large
 *   EMBEDDING_API_KEY    缺省时 zhipu 回落到 ZHIPUAI_API_KEY
 *   EMBEDDING_DIMENSIONS 显式维度；与数据库列维度不一致时脚本会提前报错
 *
 * 重要约束：knowledge_chunks.embedding 目前是 vector(2048)。换模型若维度不同，
 * 必须同时改列和索引，否则写入会被 Postgres 拒绝。
 */

export type EmbeddingProviderId = 'zhipu' | 'openai';

export interface EmbeddingConfig {
  provider: EmbeddingProviderId;
  /** 完整请求地址 */
  url: string;
  model: string;
  apiKey: string;
  dimensions?: number;
}

const ZHIPU_URL = 'https://open.bigmodel.cn/api/paas/v4/embeddings';
const OPENAI_ROOT = 'https://api.openai.com/v1';

function toDimensions(raw: string | undefined): number | undefined {
  if (!raw) return undefined;
  const value = Number(raw);
  return Number.isFinite(value) && value > 0 ? value : undefined;
}

/** 把根地址补成 embeddings 端点；已经是端点的原样返回。 */
export function embeddingUrl(baseUrl: string): string {
  const trimmed = baseUrl.replace(/\/+$/, '');
  return trimmed.endsWith('/embeddings') ? trimmed : `${trimmed}/embeddings`;
}

/** 解析配置（纯函数，便于测试）。 */
export function resolveEmbeddingConfig(env: Record<string, string | undefined> = process.env): EmbeddingConfig {
  const provider: EmbeddingProviderId = (env.EMBEDDING_PROVIDER ?? 'zhipu').toLowerCase() === 'openai' ? 'openai' : 'zhipu';
  const dimensions = toDimensions(env.EMBEDDING_DIMENSIONS);

  if (provider === 'zhipu') {
    return {
      provider,
      url: env.EMBEDDING_BASE_URL ? embeddingUrl(env.EMBEDDING_BASE_URL) : ZHIPU_URL,
      model: env.EMBEDDING_MODEL ?? 'embedding-3',
      apiKey: env.EMBEDDING_API_KEY ?? env.ZHIPUAI_API_KEY ?? '',
      ...(dimensions === undefined ? {} : { dimensions }),
    };
  }

  return {
    provider,
    url: embeddingUrl(env.EMBEDDING_BASE_URL ?? OPENAI_ROOT),
    model: env.EMBEDDING_MODEL ?? 'text-embedding-3-large',
    apiKey: env.EMBEDDING_API_KEY ?? '',
    ...(dimensions === undefined ? {} : { dimensions }),
  };
}

/** 构造请求体（纯函数）。 */
export function embeddingRequestBody(config: EmbeddingConfig, input: string): Record<string, unknown> {
  return {
    model: config.model,
    input,
    ...(config.dimensions === undefined ? {} : { dimensions: config.dimensions }),
  };
}

/** 给日志/报错用的一行描述。 */
export function describeEmbedding(config: EmbeddingConfig): string {
  const dims = config.dimensions ? ` dims=${config.dimensions}` : ' dims=默认';
  return `${config.provider} / ${config.model}${dims} → ${config.url}`;
}

const MAX_INPUT_LENGTH = 4000;

/** 调一次 embedding。失败抛出带状态码的 Error，调用方决定降级还是中断。 */
export async function getEmbedding(text: string, config: EmbeddingConfig = resolveEmbeddingConfig()): Promise<number[]> {
  if (!config.apiKey) {
    throw new Error(`embedding 缺少 API Key（${config.provider}）；请设置 EMBEDDING_API_KEY 或 ZHIPUAI_API_KEY`);
  }

  const input = text.length > MAX_INPUT_LENGTH ? text.slice(0, MAX_INPUT_LENGTH) : text;
  const resp = await fetch(config.url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` },
    body: JSON.stringify(embeddingRequestBody(config, input)),
  });

  if (!resp.ok) {
    throw new Error(`Embedding API ${resp.status}: ${(await resp.text()).slice(0, 200)}`);
  }

  const data = (await resp.json()) as { data?: { embedding?: number[] }[] };
  const embedding = data.data?.[0]?.embedding;
  if (!Array.isArray(embedding)) throw new Error('Embedding 响应里没有向量');
  return embedding;
}
