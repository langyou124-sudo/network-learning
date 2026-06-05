// 向量化脚本：读取课程内容 → 分块 → 调 ZhipuAI Embedding → 存入 Supabase
// 运行方式：node scripts/embed-knowledge.mjs

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { fileURLToPath as furl } from 'url';

// 加载 .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env.local') });

// === 配置（从环境变量读取）===
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const ZHIPUAI_KEY = process.env.ZHIPUAI_API_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY || !ZHIPUAI_KEY) {
  console.error('缺少环境变量，请确保 .env.local 中配置了 NEXT_PUBLIC_SUPABASE_URL、NEXT_PUBLIC_SUPABASE_ANON_KEY、ZHIPUAI_API_KEY');
  process.exit(1);
}
const EMBEDDING_MODEL = 'embedding-3';
const CHUNK_SIZE = 500;      // 每块目标字符数
const CHUNK_OVERLAP = 80;    // 块间重叠字符数
const BATCH_DELAY = 200;     // API 调用间隔(ms)，避免限流

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// === 1. 从 courses.ts 提取课题内容 ===
function extractTopics(filePath) {
  const raw = readFileSync(filePath, 'utf-8');
  const topics = [];

  // 匹配 topic 对象块：id, moduleId, title, content
  const topicRegex = /id:\s*'(topic-[^']+)',\s*moduleId:\s*'([^']+)',\s*title:\s*'([^']+)',[\s\S]*?content:\s*`([\s\S]*?)`/g;

  let match;
  while ((match = topicRegex.exec(raw)) !== null) {
    const [, topicId, moduleId, title, content] = match;
    topics.push({ topicId, moduleId, title, content });
  }

  return topics;
}

// === 2. 文本分块 ===
function chunkText(text, size = CHUNK_SIZE, overlap = CHUNK_OVERLAP) {
  // 先清理 markdown 标记中的特殊标签
  const cleaned = text
    .replace(/<Glossary[^>]*\/>/g, '')
    .replace(/<Diagram[^>]*\/>/g, '')
    .replace(/```[\s\S]*?```/g, '')
    .trim();

  // 按段落分割
  const paragraphs = cleaned.split(/\n{2,}/).filter(p => p.trim().length > 0);

  const chunks = [];
  let currentChunk = '';

  for (const para of paragraphs) {
    if (currentChunk.length + para.length > size && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      // 保留末尾 overlap 作为下一块开头
      currentChunk = currentChunk.slice(-overlap) + '\n\n' + para;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + para;
    }
  }

  if (currentChunk.trim().length > 50) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

// === 3. 调 ZhipuAI Embedding API ===
const MAX_INPUT_LENGTH = 4000; // embedding-3 输入长度安全上限

async function getEmbedding(text) {
  // 截断过长文本
  const input = text.length > MAX_INPUT_LENGTH ? text.slice(0, MAX_INPUT_LENGTH) : text;

  const resp = await fetch('https://open.bigmodel.cn/api/paas/v4/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ZHIPUAI_KEY}`,
    },
    body: JSON.stringify({
      model: EMBEDDING_MODEL,
      input,
    }),
  });

  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`ZhipuAI API error: ${resp.status} - ${err}`);
  }

  const data = await resp.json();
  return data.data[0].embedding;
}

// === 4. 存入 Supabase ===
async function storeChunk(moduleId, topicId, chunkText, metadata) {
  const embedding = await getEmbedding(chunkText);

  const { error } = await supabase.from('knowledge_chunks').insert({
    module_id: moduleId,
    topic_id: topicId,
    chunk_text: chunkText,
    metadata,
    embedding,
  });

  if (error) {
    console.error(`  ✗ 存储失败: ${error.message}`);
    return false;
  }
  return true;
}

// === 5. 主流程 ===
async function main() {
  console.log('=== 达博理 知识库向量化工具 ===\n');

  // 读取课程内容
  const coursesPath = resolve(__dirname, '../src/data/courses.ts');
  const topics = extractTopics(coursesPath);
  console.log(`提取到 ${topics.length} 个课题\n`);

  // 获取已有的 topic_id 列表，跳过已成功的
  const { data: existing } = await supabase
    .from('knowledge_chunks')
    .select('topic_id');
  const existingTopics = new Set((existing || []).map(r => r.topic_id));
  console.log(`数据库已有 ${existingTopics.size} 个课题的向量\n`);

  if (existingTopics.size > 0) {
    // 清空旧数据重新灌入（保证一致性）
    const { error: delError } = await supabase
      .from('knowledge_chunks')
      .delete()
      .neq('id', 0);
    if (delError) {
      console.error('清空旧数据失败:', delError.message);
      return;
    }
    console.log('已清空旧数据\n');
  }

  let totalChunks = 0;
  let successChunks = 0;

  for (const topic of topics) {
    const chunks = chunkText(topic.content);
    console.log(`[${topic.moduleId}] ${topic.title} → ${chunks.length} 块`);

    for (let i = 0; i < chunks.length; i++) {
      totalChunks++;
      const metadata = {
        topicTitle: topic.title,
        chunkIndex: i,
        totalChunks: chunks.length,
      };

      try {
        const ok = await storeChunk(topic.moduleId, topic.topicId, chunks[i], metadata);
        if (ok) {
          successChunks++;
          process.stdout.write(`  ✓ ${i + 1}/${chunks.length}\r`);
        }
      } catch (err) {
        console.error(`  ✗ 块 ${i + 1} 失败: ${err.message}`);
      }

      // 限流
      await new Promise(r => setTimeout(r, BATCH_DELAY));
    }
    console.log('');
  }

  console.log(`\n=== 完成 ===`);
  console.log(`总块数: ${totalChunks}`);
  console.log(`成功: ${successChunks}`);
  console.log(`失败: ${totalChunks - successChunks}`);
}

main().catch(console.error);
