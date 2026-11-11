// 生成 src/data/network/topics.generated.ts：扫描 topics/ 下的文件，产出 topicMap。
//
//   node scripts/build-content-index.mjs            # 写入
//   node scripts/build-content-index.mjs --check    # 只检查是否最新（CI 用）
//
// 加课题的流程因此变成：放一个 topic-XX.ts（导出对象里带 id: 'topic-XX'），
// 跑一次 npm run content:index。不需要再手改 index.ts 里的 60 多行 import。

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TOPICS_DIR = join(ROOT, 'src/data/network/topics');
const TARGET = join(ROOT, 'src/data/network/topics.generated.ts');

const EXPORT_RE = /export\s+const\s+([A-Za-z_$][\w$]*)\s*=\s*\{/;
// 部分学科的课题对象在顶部自带 id；网络工程没有，id 由文件名决定。
const DECLARED_ID_RE = /export\s+const\s+[A-Za-z_$][\w$]*\s*=\s*\{\s*\r?\n?\s*id:\s*'([^']+)'/;

function build() {
  const files = readdirSync(TOPICS_DIR)
    .filter((name) => name.endsWith('.ts'))
    .sort();

  const entries = [];
  for (const file of files) {
    const source = readFileSync(join(TOPICS_DIR, file), 'utf8');
    const exportName = EXPORT_RE.exec(source)?.[1];
    if (!exportName) throw new Error(`${file} 里找不到 export const xxx = {（新增文件请保持同样结构）`);

    // 统一用文件名作为 topic id，模块的 topicIds 引用的就是它。
    const id = file.replace(/\.ts$/, '');
    const declared = DECLARED_ID_RE.exec(source)?.[1];
    if (declared && declared !== id) {
      throw new Error(`${file} 顶部的 id: '${declared}' 与文件名不一致，模块会引用不到它`);
    }
    entries.push({ file: id, exportName, id });
  }

  const ids = entries.map((e) => e.id);
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicates.length > 0) throw new Error(`topic id 重复：${[...new Set(duplicates)].join(', ')}`);

  const imports = entries
    .map((e) => `import { ${e.exportName} } from './topics/${e.file}';`)
    .join('\n');
  const map = entries.map((e) => `  '${e.id}': ${e.exportName},`).join('\n');

  return `// 本文件由 scripts/build-content-index.mjs 生成，请勿手改。
// 新增课题后运行：npm run content:index
${imports}

export type TopicRecord = {
  title: string;
  description: string;
  content: string;
  quizzes: { id: string; type: string; question: string; options?: string[]; answer: string | string[]; explanation: string }[];
  references: string[];
};

export const topicMap: Record<string, TopicRecord> = {
${map}
};
`;
}

const output = build();

if (process.argv.includes('--check')) {
  let current = '';
  try {
    current = readFileSync(TARGET, 'utf8');
  } catch {
    // 文件不存在即视为过期
  }
  if (current !== output) {
    console.error('topics.generated.ts 已过期，请运行 npm run content:index');
    process.exit(1);
  }
  console.log('topics.generated.ts 是最新的');
} else {
  writeFileSync(TARGET, output, 'utf8');
  console.log(`已生成 ${TARGET}`);
}
