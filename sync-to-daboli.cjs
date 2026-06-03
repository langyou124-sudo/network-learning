/**
 * 同步课程内容到达博理平台
 *
 * 用法: node sync-to-daboli.cjs
 *
 * 功能:
 *   1. 从 src/data/courses.ts 读取所有课程数据
 *   2. 转换 Markdown + GlossaryCard + Quiz 为 HTML
 *   3. 写入达博理 SQLite 数据库（增量：只添加新内容，不删除旧的）
 *   4. 生成 HTML 文件到 zhiyi-web/public/course-content/
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE = __dirname;
const DABOLI = path.join(BASE, '..', 'Desktop', '达博理', 'zhiyi-web');
const DB_PATH = path.join(DABOLI, 'data', 'daboli.db');
const CONTENT_DIR = path.join(DABOLI, 'public', 'course-content', 'network-engineering');
const EXPORT_JSON = path.join(BASE, 'courses-export.json');

// ── Step 1: Export courses.ts to JSON ──────────────────────────────
console.log('=== Step 1: Exporting course data ===');
const src = fs.readFileSync(path.join(BASE, 'src', 'data', 'courses.ts'), 'utf-8');
const match = src.match(/export\s+const\s+modules\s*:\s*Module\[\]\s*=\s*\[/);
if (!match) { console.error('Cannot find modules export'); process.exit(1); }
const start = match.index + match[0].length - 1;
let depth = 0, end = -1;
for (let i = start; i < src.length; i++) {
  if (src[i] === '[') depth++;
  else if (src[i] === ']') { depth--; if (depth === 0) { end = i; break; } }
}
const modules = new Function('return ' + src.substring(start, end + 1))();
fs.writeFileSync(EXPORT_JSON, JSON.stringify(modules, null, 2));

let totalTopics = 0;
for (const m of modules) {
  if (m.topics.length > 0) {
    console.log(`  ${m.title}: ${m.topics.length} topics`);
    totalTopics += m.topics.length;
  }
}
console.log(`  Total: ${totalTopics} topics\n`);

// ── Step 2: Load dependencies ─────────────────────────────────────
const { marked } = require(path.join(DABOLI, 'node_modules', 'marked'));
const { createClient } = require(path.join(DABOLI, 'node_modules', '@libsql', 'client'));
const client = createClient({ url: `file:${DB_PATH}` });

// ── Helper functions ──────────────────────────────────────────────
function convertGlossary(html) {
  return html.replace(/<Glossary\s+terms="([^"]*?)"\s*\/>/g, (_, enc) => {
    try {
      const terms = JSON.parse(decodeURIComponent(enc));
      let out = '<div class="glossary-card"><h4>核心术语</h4><dl>';
      for (const t of terms) out += `<dt>${t.term}</dt><dd>${t.definition}</dd>`;
      return out + '</dl></div>';
    } catch { return ''; }
  });
}

function quizzesToHTML(quizzes) {
  if (!quizzes?.length) return '';
  let html = '<div class="quiz-section"><h2>练习题</h2>';
  for (let i = 0; i < quizzes.length; i++) {
    const q = quizzes[i];
    const ans = Array.isArray(q.answer) ? q.answer.join(',') : q.answer;
    html += `<div class="quiz-item" data-answer="${ans}">`;
    html += `<p class="quiz-question">${i + 1}. ${q.question}</p>`;
    if (q.type === 'choice' && q.options) {
      html += '<div class="quiz-options">';
      const L = ['A','B','C','D'];
      for (let j = 0; j < q.options.length; j++)
        html += `<label><input type="radio" name="q${i}" value="${L[j]}"> <strong>${L[j]}.</strong> ${q.options[j]}</label>`;
      html += '</div>';
    } else if (q.type === 'fill') {
      html += '<input type="text" class="quiz-input" placeholder="请输入答案">';
    } else {
      html += '<textarea class="quiz-textarea" placeholder="请输入你的答案" rows="3"></textarea>';
    }
    html += `<div class="quiz-answer" style="display:none"><p><strong>答案：</strong>${ans}</p><p><strong>解析：</strong>${q.explanation}</p></div>`;
    html += '<button class="quiz-check-btn" onclick="this.previousElementSibling.style.display=this.previousElementSibling.style.display===\'none\'?\'block\':\'none\';this.textContent=this.textContent===\'查看答案\'?\'隐藏答案\':\'查看答案\'">查看答案</button>';
    html += '</div>';
  }
  return html + '</div>';
}

function wrapHTML(title, body) {
  return `<!DOCTYPE html>
<html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${title}</title>
<style>
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:860px;margin:0 auto;padding:2rem;line-height:1.8;color:#1a1a1a}
h1{font-size:1.8rem;border-bottom:2px solid #e5e7eb;padding-bottom:.5rem;margin-bottom:1.5rem}
h2{font-size:1.4rem;margin-top:2rem;color:#1e40af}
h3{font-size:1.2rem;margin-top:1.5rem}
p{margin:.8rem 0}ul,ol{margin:.8rem 0;padding-left:1.5rem}li{margin:.3rem 0}
strong{color:#1e3a5f}
table{border-collapse:collapse;width:100%;margin:1rem 0}
th,td{border:1px solid #d1d5db;padding:.5rem .8rem;text-align:left}
th{background:#f3f4f6;font-weight:600}
.glossary-card{background:#eff6ff;border-left:4px solid #3b82f6;padding:1rem 1.5rem;margin:1.5rem 0;border-radius:0 8px 8px 0}
.glossary-card h4{margin:0 0 .8rem;color:#1e40af}
.glossary-card dt{font-weight:700;color:#1e3a5f;margin-top:.6rem}
.glossary-card dd{margin:.2rem 0 0 1rem;color:#374151}
.quiz-section{background:#f0fdf4;border-left:4px solid #22c55e;padding:1rem 1.5rem;margin:2rem 0;border-radius:0 8px 8px 0}
.quiz-section h2{color:#166534;margin-top:0}
.quiz-item{margin:1.2rem 0;padding:1rem;background:#fff;border-radius:6px;border:1px solid #e5e7eb}
.quiz-question{font-weight:600;margin-bottom:.5rem}
.quiz-options label{display:block;padding:.3rem .5rem;margin:.2rem 0;border-radius:4px;cursor:pointer}
.quiz-options label:hover{background:#f3f4f6}
.quiz-input{padding:.4rem;border:1px solid #d1d5db;border-radius:4px;width:200px}
.quiz-textarea{padding:.4rem;border:1px solid #d1d5db;border-radius:4px;width:100%;box-sizing:border-box}
.quiz-answer{background:#fefce8;border:1px solid #fbbf24;padding:.8rem;border-radius:6px;margin-top:.5rem}
.quiz-check-btn{margin-top:.5rem;padding:.4rem 1rem;background:#3b82f6;color:#fff;border:none;border-radius:4px;cursor:pointer;font-size:.9rem}
.quiz-check-btn:hover{background:#2563eb}
code{background:#f1f5f9;padding:.15rem .4rem;border-radius:3px;font-size:.9em}
pre{background:#1e293b;color:#e2e8f0;padding:1rem;border-radius:8px;overflow-x:auto}
pre code{background:none;color:inherit}
</style></head><body>${body}</body></html>`;
}

// ── Step 3: Sync to database ──────────────────────────────────────
console.log('=== Step 2: Syncing to database ===');
fs.mkdirSync(CONTENT_DIR, { recursive: true });

async function run() {
  // Get or create course
  let courseRow = await client.execute({
    sql: "SELECT id FROM courses WHERE title = ?",
    args: ['网络工程基础']
  });
  let courseId;
  if (courseRow.rows.length > 0) {
    courseId = Number(courseRow.rows[0].id);
    console.log(`  Found existing course id=${courseId}`);
  } else {
    const r = await client.execute({
      sql: `INSERT INTO courses (title, description, category, grade_range, hours, price, status, sort_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: ['网络工程基础', '系统学习网络工程核心知识，涵盖10大模块。', 'high', '高中/大学', 48, 0, 'published', 99]
    });
    courseId = Number(r.lastInsertRowid);
    console.log(`  Created new course id=${courseId}`);
  }

  let added = 0, skipped = 0;
  let sectionOrder = 0;

  for (const mod of modules) {
    if (mod.topics.length === 0) continue;
    sectionOrder++;

    // Get or create section
    let secRow = await client.execute({
      sql: "SELECT id FROM course_sections WHERE course_id = ? AND title = ?",
      args: [courseId, mod.title]
    });
    let sectionId;
    if (secRow.rows.length > 0) {
      sectionId = Number(secRow.rows[0].id);
    } else {
      const r = await client.execute({
        sql: 'INSERT INTO course_sections (course_id, title, sort_order) VALUES (?, ?, ?)',
        args: [courseId, mod.title, sectionOrder]
      });
      sectionId = Number(r.lastInsertRowid);
      console.log(`  + Section: ${mod.title}`);
    }

    let matOrder = 0;
    for (const topic of mod.topics) {
      matOrder++;

      // Check if material already exists
      const existing = await client.execute({
        sql: "SELECT id FROM course_materials WHERE section_id = ? AND title = ?",
        args: [sectionId, topic.title]
      });
      if (existing.rows.length > 0) {
        skipped++;
        continue;
      }

      // Generate HTML
      let body = convertGlossary(topic.content);
      body = marked.parse(body);
      body += quizzesToHTML(topic.quizzes);
      if (topic.references?.length) {
        body += '<div class="references"><h2>参考资料</h2><ul>';
        for (const r of topic.references) body += `<li>${r}</li>`;
        body += '</ul></div>';
      }
      const html = wrapHTML(topic.title, body);
      fs.writeFileSync(path.join(CONTENT_DIR, `${topic.id}.html`), html, 'utf-8');

      // Insert material
      await client.execute({
        sql: `INSERT INTO course_materials (section_id, title, type, file_path, sort_order) VALUES (?, ?, ?, ?, ?)`,
        args: [sectionId, topic.title, 'document', `/course-content/network-engineering/${topic.id}.html`, matOrder]
      });
      added++;
      console.log(`    + ${topic.title}`);
    }
  }

  console.log(`\nDone! Added: ${added}, Skipped (already exist): ${skipped}`);
}

run().catch(err => { console.error(err); process.exit(1); });
