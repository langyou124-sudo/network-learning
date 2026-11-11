// 内容向量化：课题内容 → 分块 → 智谱 embedding → Supabase knowledge_chunks
//
// 用法：
//   npx tsx scripts/embed-knowledge.ts                 # 默认 dry-run，只统计不写库
//   npx tsx scripts/embed-knowledge.ts --write         # 真正调用 embedding 并写库
//   npx tsx scripts/embed-knowledge.ts --write --reset # 先清空 knowledge_chunks 再写
//   npx tsx scripts/embed-knowledge.ts --module=sdn-nfv --limit=2
//
// 与旧版的区别：
//   1. 直接 import 真实课程数据，不再用正则解析 courses.ts（那个文件只是聚合入口，
//      旧版会提取到 0 条，而且会先把整张表清空再灌 0 条 —— 跑通即清库）。
//   2. 默认 dry-run，默认不清库；清库必须显式 --reset。
//   3. 写库优先用 SUPABASE_SERVICE_ROLE_KEY，缺省回落 anon key 并警告（RLS 会挡）。
//   4. 不加 --reset 时，只删除本次要处理的 topic 的旧块，避免重复插入。

import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createClient } from '@supabase/supabase-js';
import { modules } from '@/data/courses';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const EMBEDDING_MODEL = 'embedding-3';
const EMBEDDING_ENDPOINT = 'https://open.bigmodel.cn/api/paas/v4/embeddings';
const MAX_INPUT_LENGTH = 4000;
const DEFAULT_CHUNK_SIZE = 500;
const DEFAULT_OVERLAP = 80;
const API_DELAY_MS = 200;

/** 读取 .env.local，不覆盖已存在的环境变量。 */
function loadEnvFile(file: string) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split(/\r?\n/)) {
    const match = /^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
    if (!match || line.trimStart().startsWith('#')) continue;
    const [, key, rawValue] = match;
    if (process.env[key] !== undefined) continue;
    process.env[key] = rawValue.replace(/^["']|["']$/g, '');
  }
}

interface Args {
  write: boolean;
  reset: boolean;
  moduleId?: string;
  limit?: number;
  chunkSize: number;
  overlap: number;
}

function parseArgs(argv: string[]): Args {
  const args: Args = {
    write: false,
    reset: false,
    chunkSize: DEFAULT_CHUNK_SIZE,
    overlap: DEFAULT_OVERLAP,
  };
  for (const arg of argv) {
    if (arg === '--write') args.write = true;
    else if (arg === '--reset') args.reset = true;
    else if (arg.startsWith('--module=')) args.moduleId = arg.slice('--module='.length);
    else if (arg.startsWith('--limit=')) args.limit = Number(arg.slice('--limit='.length));
    else if (arg.startsWith('--chunk-size=')) args.chunkSize = Number(arg.slice('--chunk-size='.length));
    else if (arg.startsWith('--overlap=')) args.overlap = Number(arg.slice('--overlap='.length));
    else throw new Error(`未知参数：${arg}`);
  }
  if (!Number.isFinite(args.chunkSize) || args.chunkSize < 100) throw new Error('--chunk-size 至少 100');
  if (!Number.isFinite(args.overlap) || args.overlap < 0) throw new Error('--overlap 不能为负');
  if (args.reset && !args.write) throw new Error('--reset 必须和 --write 一起用，避免误清库');
  return args;
}

/** 去掉内容里的 JSX 组件标签，保留代码块（配置示例对检索有价值）。 */
function cleanContent(text: string): string {
  return text.replace(/<Glossary[^>]*\/>/g, '').replace(/<Diagram[^>]*\/>/g, '').trim();
}

function chunkText(text: string, size: number, overlap: number): string[] {
  const paragraphs = cleanContent(text)
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const chunks: string[] = [];
  let current = '';
  for (const para of paragraphs) {
    // 单段超长时直接硬切，避免一块撑爆 embedding 输入。
    if (para.length > size) {
      if (current) {
        chunks.push(current);
        current = '';
      }
      for (let i = 0; i < para.length; i += size) chunks.push(para.slice(i, i + size));
      continue;
    }
    if (current && current.length + para.length + 2 > size) {
      chunks.push(current);
      current = current.slice(-overlap) + (overlap > 0 ? '\n\n' : '') + para;
    } else {
      current = current ? `${current}\n\n${para}` : para;
    }
  }
  if (current.trim().length > 50) chunks.push(current.trim());
  return chunks;
}

interface TopicJob {
  topicId: string;
  moduleId: string;
  title: string;
  chunks: string[];
}

function collectJobs(args: Args): TopicJob[] {
  const selected = args.moduleId ? modules.filter((m) => m.id === args.moduleId) : modules;
  if (selected.length === 0) throw new Error(`没有匹配的模块：${args.moduleId}`);

  const jobs: TopicJob[] = [];
  for (const mod of selected) {
    for (const topic of mod.topics) {
      jobs.push({
        topicId: topic.id,
        moduleId: mod.id,
        title: topic.title,
        chunks: chunkText(topic.content ?? '', args.chunkSize, args.overlap),
      });
    }
  }
  return args.limit ? jobs.slice(0, args.limit) : jobs;
}

async function getEmbedding(text: string, apiKey: string): Promise<number[]> {
  const input = text.length > MAX_INPUT_LENGTH ? text.slice(0, MAX_INPUT_LENGTH) : text;
  const resp = await fetch(EMBEDDING_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({ model: EMBEDDING_MODEL, input }),
  });
  if (!resp.ok) throw new Error(`Embedding API ${resp.status}: ${(await resp.text()).slice(0, 200)}`);
  const data = (await resp.json()) as { data: { embedding: number[] }[] };
  return data.data[0].embedding;
}

async function main() {
  loadEnvFile(resolve(ROOT, '.env.local'));
  const args = parseArgs(process.argv.slice(2));
  const jobs = collectJobs(args);
  const totalChunks = jobs.reduce((sum, job) => sum + job.chunks.length, 0);

  const emptyTopics = jobs.filter((job) => job.chunks.length === 0);
  const thinTopics = jobs.filter((job) => job.chunks.length === 1);

  console.log('=== 达博理 内容向量化 ===');
  console.log(`模式：${args.write ? '写入' : 'dry-run（不调用 API、不写库）'}${args.reset ? ' + 清空重建' : ''}`);
  console.log(`模块：${args.moduleId ?? '全部'}   课题：${jobs.length}   分块：${totalChunks}`);
  console.log(`分块参数：size=${args.chunkSize} overlap=${args.overlap}`);
  console.log(`预估 API 调用：${totalChunks} 次，约 ${Math.ceil((totalChunks * API_DELAY_MS) / 1000)} 秒\n`);

  if (emptyTopics.length > 0) {
    console.log(`⚠ ${emptyTopics.length} 个课题切不出内容（content 过短）：`);
    for (const job of emptyTopics.slice(0, 10)) console.log(`   - ${job.topicId} ${job.title}`);
    console.log('');
  }
  if (thinTopics.length > 0) {
    console.log(`提示：${thinTopics.length} 个课题只有 1 个分块，检索粒度较粗\n`);
  }

  if (!args.write) {
    for (const job of jobs.slice(0, 5)) {
      console.log(`  ${job.topicId} ${job.title} → ${job.chunks.length} 块`);
    }
    if (jobs.length > 5) console.log(`  ... 其余 ${jobs.length - 5} 个课题省略`);
    console.log('\n加 --write 才会真正调用 embedding 并写库。');
    return;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const zhipuKey = process.env.ZHIPUAI_API_KEY;

  const missing = [
    !supabaseUrl && 'NEXT_PUBLIC_SUPABASE_URL',
    !(serviceKey || anonKey) && 'SUPABASE_SERVICE_ROLE_KEY',
    !zhipuKey && 'ZHIPUAI_API_KEY',
  ].filter(Boolean);
  if (missing.length > 0) throw new Error(`缺少环境变量：${missing.join(', ')}`);
  if (!serviceKey) {
    console.log('⚠ 未设置 SUPABASE_SERVICE_ROLE_KEY，回落到 anon key；若 knowledge_chunks 开了 RLS 会写入失败。\n');
  }

  const supabase = createClient(supabaseUrl!, (serviceKey ?? anonKey)!);

  if (args.reset) {
    const { error } = await supabase.from('knowledge_chunks').delete().neq('id', 0);
    if (error) throw new Error(`清空 knowledge_chunks 失败：${error.message}`);
    console.log('已清空 knowledge_chunks\n');
  }

  let succeeded = 0;
  let failed = 0;

  for (const job of jobs) {
    // 非全量重建时，先删掉这个课题的旧块，保证可重复运行。
    if (!args.reset) {
      const { error } = await supabase.from('knowledge_chunks').delete().eq('topic_id', job.topicId);
      if (error) console.warn(`  清理 ${job.topicId} 旧块失败：${error.message}`);
    }

    process.stdout.write(`[${job.moduleId}] ${job.title} → ${job.chunks.length} 块 `);
    for (let i = 0; i < job.chunks.length; i++) {
      try {
        const embedding = await getEmbedding(job.chunks[i], zhipuKey!);
        const { error } = await supabase.from('knowledge_chunks').insert({
          module_id: job.moduleId,
          topic_id: job.topicId,
          chunk_text: job.chunks[i],
          metadata: { topicTitle: job.title, chunkIndex: i, totalChunks: job.chunks.length },
          embedding,
        });
        if (error) throw new Error(error.message);
        succeeded++;
        process.stdout.write('.');
      } catch (err) {
        failed++;
        process.stdout.write('x');
        console.error(`\n  ✗ ${job.topicId} 块 ${i + 1}: ${(err as Error).message}`);
      }
      await new Promise((r) => setTimeout(r, API_DELAY_MS));
    }
    process.stdout.write('\n');
  }

  console.log(`\n=== 完成：成功 ${succeeded} 块，失败 ${failed} 块 ===`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
  console.error(`\n${(err as Error).message}`);
  process.exit(1);
});
