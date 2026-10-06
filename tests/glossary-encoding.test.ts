/**
 * Glossary 编码完整性回归测试
 *
 * 课程内容里的 <Glossary terms="..."/> 用 URL 编码的 JSON 承载术语表。
 * 坏编码（如 %EM、%2S）会让 decodeURIComponent 抛错，
 * 之前是静默 return null —— 整张术语卡无声消失。
 * 这里直接扫全库数据文件，保证每一张术语卡都能解码。
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DATA_DIR = join(process.cwd(), 'src', 'data');

function collectTsFiles(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) collectTsFiles(p, out);
    else if (p.endsWith('.ts')) out.push(p);
  }
  return out;
}

const files = collectTsFiles(DATA_DIR);
const GLOSSARY_RE = /Glossary terms="([^"]*)"/g;

interface Finding {
  file: string;
  index: number;
  error: string;
}

describe('Glossary 编码完整性', () => {
  it('全库每一张术语卡都能 decodeURIComponent + JSON.parse', () => {
    const broken: Finding[] = [];
    let total = 0;

    for (const file of files) {
      const src = readFileSync(file, 'utf8');
      let m: RegExpExecArray | null;
      GLOSSARY_RE.lastIndex = 0;
      let index = 0;
      while ((m = GLOSSARY_RE.exec(src)) !== null) {
        index++;
        total++;
        try {
          const terms = JSON.parse(decodeURIComponent(m[1]));
          if (!Array.isArray(terms)) {
            broken.push({ file, index, error: '解码后不是数组' });
          } else if (terms.length === 0) {
            broken.push({ file, index, error: '术语表为空' });
          }
        } catch (err) {
          broken.push({
            file,
            index,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }
    }

    expect(total, '应该至少找到一些术语卡').toBeGreaterThan(50);
    expect(
      broken,
      `发现 ${broken.length} 张术语卡无法解码（会导致渲染时静默消失）:\n` +
        broken.map((b) => `${b.file} #${b.index}: ${b.error}`).join('\n')
    ).toEqual([]);
  });

  it('每条术语都有 term 字段', () => {
    const missing: string[] = [];
    for (const file of files) {
      const src = readFileSync(file, 'utf8');
      let m: RegExpExecArray | null;
      GLOSSARY_RE.lastIndex = 0;
      while ((m = GLOSSARY_RE.exec(src)) !== null) {
        try {
          const terms = JSON.parse(decodeURIComponent(m[1])) as { term?: string }[];
          terms.forEach((t, i) => {
            if (!t || typeof t.term !== 'string' || !t.term.trim()) {
              missing.push(`${file} 第 ${i + 1} 条术语缺少 term`);
            }
          });
        } catch {
          // 解码失败已在上一个用例覆盖
        }
      }
    }
    expect(missing, missing.join('\n')).toEqual([]);
  });
});
