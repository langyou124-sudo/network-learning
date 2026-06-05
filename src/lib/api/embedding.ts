// 共享的 Embedding 工具

const ZHIPUAI_ENDPOINT = 'https://open.bigmodel.cn/api/paas/v4/embeddings';
const EMBEDDING_MODEL = 'embedding-3';
const MAX_INPUT_LENGTH = 4000;

export async function getEmbedding(text: string): Promise<number[]> {
  const input = text.length > MAX_INPUT_LENGTH ? text.slice(0, MAX_INPUT_LENGTH) : text;

  const resp = await fetch(ZHIPUAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.ZHIPUAI_API_KEY}`,
    },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input }),
  });

  if (!resp.ok) {
    throw new Error(`Embedding API error: ${resp.status}`);
  }

  const data = await resp.json();
  return data.data[0].embedding;
}
