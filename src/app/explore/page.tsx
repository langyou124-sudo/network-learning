'use client';

import { useState, useCallback, useRef } from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

// 知识模块配置 — 后续新增模块在这里加
const knowledgeModules = [
  {
    id: 'network-engineering',
    title: '网络工程',
    subtitle: 'Network Engineering',
    description: '从网络基础到运维实战，覆盖软考网络工程师核心考点。包含OSI模型、TCP/IP协议、路由交换、网络安全等10大模块。',
    icon: '🌐',
    color: '#4a6fa5',
    href: '/learn/network',
    topicCount: 43,
    status: 'active' as const,
    tags: ['软考', 'HCIA', 'CCNA'],
  },
  {
    id: 'ruankao',
    title: '软考备考',
    subtitle: 'Software Exam',
    description: '覆盖初级/中级/高级全级别软考科目。网络工程师、软件设计师、系统架构设计师等核心考点全覆盖。',
    icon: '📝',
    color: '#c7923e',
    href: '/learn/ruankao',
    topicCount: 0,
    status: 'active' as const,
    tags: ['中级', '高级', '初级'],
  },
  {
    id: 'coming-soon-1',
    title: '云计算基础',
    subtitle: 'Cloud Computing',
    description: '云服务架构、虚拟化技术、容器编排、主流云平台实战。涵盖AWS、阿里云、华为云核心知识。',
    icon: '☁️',
    color: '#6b8cce',
    href: '#',
    topicCount: 0,
    status: 'coming' as const,
    tags: ['AWS', '阿里云', 'K8s'],
  },
  {
    id: 'coming-soon-2',
    title: '操作系统',
    subtitle: 'Operating System',
    description: '进程管理、内存管理、文件系统、I/O模型。Linux与Windows Server系统管理核心知识。',
    icon: '💻',
    color: '#7c5cbf',
    href: '#',
    topicCount: 0,
    status: 'coming' as const,
    tags: ['Linux', '软考', '运维'],
  },
  {
    id: 'coming-soon-3',
    title: '数据库技术',
    subtitle: 'Database',
    description: '关系型数据库原理、SQL语言、索引优化、事务管理。MySQL、PostgreSQL、Redis实战。',
    icon: '🗄️',
    color: '#e8943a',
    href: '#',
    topicCount: 0,
    status: 'coming' as const,
    tags: ['MySQL', 'Redis', '软考'],
  },
  {
    id: 'coming-soon-4',
    title: '信息安全',
    subtitle: 'Information Security',
    description: '密码学、网络攻防、安全协议、等级保护。覆盖CISP、软考信息安全工程师考点。',
    icon: '🔒',
    color: '#d94f4f',
    href: '#',
    topicCount: 0,
    status: 'coming' as const,
    tags: ['CISP', '等保', '渗透测试'],
  },
  {
    id: 'coming-soon-5',
    title: 'Python 编程',
    subtitle: 'Python Programming',
    description: '从基础语法到实战项目，网络自动化、数据分析、Web开发全链路。',
    icon: '🐍',
    color: '#3b7dd8',
    href: '#',
    topicCount: 0,
    status: 'coming' as const,
    tags: ['自动化', '数据分析', 'Web'],
  },
];

interface SearchResult {
  id: number;
  module_id: string;
  topic_id: string;
  chunk_text: string;
  metadata: { topicTitle?: string; chunkIndex?: number; totalChunks?: number };
  similarity: number;
}

export default function ExplorePage() {
  const activeModules = knowledgeModules.filter(m => m.status === 'active');
  const comingModules = knowledgeModules.filter(m => m.status === 'coming');

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [searched, setSearched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const doSearch = useCallback(async (q: string) => {
    if (!q.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    setSearching(true);
    try {
      const resp = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}&limit=8`);
      const data = await resp.json();
      setResults(data.results || []);
      setSearched(true);
    } catch {
      setResults([]);
      setSearched(true);
    } finally {
      setSearching(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    // 防抖：停止输入 500ms 后搜索
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => doSearch(val), 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      doSearch(query);
    }
  };

  return (
    <div>
      {/* Hero */}
      <div className="mb-10 animate-in">
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight mb-2">知识探索</h1>
        <p className="text-[var(--text-muted)] text-sm max-w-lg">
          多领域知识体系，AI 智能问答辅助。选择一个知识模块开始学习，后续将持续接入更多领域。
        </p>
      </div>

      {/* 搜索栏 */}
      <div className="card px-5 py-4 mb-6 animate-in" style={{ animationDelay: '0.06s' }}>
        <div className="flex items-center gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="搜索知识点...（如：TCP三次握手、子网划分）"
            className="flex-1 bg-transparent text-[14.5px] focus:outline-none text-[var(--text)]"
          />
          {searching && (
            <span className="text-[11px] text-[var(--text-muted)]">搜索中...</span>
          )}
        </div>
      </div>

      {/* 搜索结果 */}
      {searched && (
        <div className="mb-8 animate-in">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-semibold text-[var(--text)]">
              搜索结果
            </h2>
            <button
              onClick={() => { setQuery(''); setResults([]); setSearched(false); }}
              className="text-[12px] text-[var(--accent)] hover:underline"
            >
              清除搜索
            </button>
          </div>

          {results.length === 0 ? (
            <div className="card px-6 py-8 text-center">
              <p className="text-[var(--text-muted)] text-[13px]">未找到相关知识点，换个关键词试试</p>
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((r) => (
                <SearchResultCard key={r.id} result={r} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* 已上线模块 */}
      {!searched && (
        <section className="mb-10">
          <h2 className="text-[15px] font-semibold text-[var(--text)] mb-4 animate-in" style={{ animationDelay: '0.1s' }}>
            已上线
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activeModules.map((mod, i) => (
              <Link
                key={mod.id}
                href={mod.href}
                className="card-lift px-6 py-5 animate-in block"
                style={{ animationDelay: `${(i + 2) * 0.06}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${mod.color}18` }}>
                    {mod.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-[15px] text-[var(--text)]">{mod.title}</h3>
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                        style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
                        {mod.topicCount} 课题
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-muted)] mb-2">{mod.subtitle}</p>
                    <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-3">{mod.description}</p>
                    <div className="flex gap-1.5 flex-wrap">
                      {mod.tags.map(tag => (
                        <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full"
                          style={{ background: 'var(--bg-warm)', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 即将上线 */}
      {!searched && (
        <section className="mb-10">
          <h2 className="text-[15px] font-semibold text-[var(--text)] mb-4 animate-in" style={{ animationDelay: '0.3s' }}>
            即将上线
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {comingModules.map((mod, i) => (
              <div
                key={mod.id}
                className="card px-5 py-4 animate-in"
                style={{
                  animationDelay: `${(i + 5) * 0.06}s`,
                  opacity: 0.7,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                    style={{ background: `${mod.color}18` }}>
                    {mod.icon}
                  </div>
                  <div>
                    <h3 className="font-medium text-[14px] text-[var(--text)]">{mod.title}</h3>
                    <p className="text-[11px] text-[var(--text-muted)]">{mod.subtitle}</p>
                  </div>
                </div>
                <p className="text-[12.5px] text-[var(--text-muted)] leading-relaxed mb-2">{mod.description}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {mod.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{ background: 'var(--bg-warm)', color: 'var(--text-muted)' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 底部提示 */}
      {!searched && (
        <div className="card px-6 py-5 text-center animate-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-[13px] text-[var(--text-muted)]">
            有想学习的领域？反馈给我们，优先上线。
          </p>
        </div>
      )}
    </div>
  );
}

// 搜索结果卡片组件 — 可展开查看完整内容
function SearchResultCard({ result }: { result: SearchResult }) {
  const [expanded, setExpanded] = useState(false);
  const topicTitle = result.metadata?.topicTitle || result.topic_id;
  const similarity = Math.round(result.similarity * 100);

  // 模块名映射
  const moduleNames: Record<string, string> = {
    'network-basics': '网络基础',
    'physical-datalink': '物理层与数据链路层',
    'network-layer': '网络层',
    'transport-layer': '传输层',
    'application-layer': '应用层',
    'routing-switching': '路由与交换',
    'network-security': '网络安全',
    'wireless-networks': '无线网络',
    'telecom-networks': '电信网络',
    'network-operations': '网络运维',
  };

  return (
    <div className="card px-5 py-4 animate-in">
      <div
        className="flex items-center justify-between mb-2 cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full shrink-0"
            style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
            {moduleNames[result.module_id] || result.module_id}
          </span>
          <span className="text-[13.5px] font-medium text-[var(--text)] truncate">{topicTitle}</span>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[11px] text-[var(--text-muted)]">{similarity}%</span>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="transition-transform duration-200"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', color: 'var(--text-muted)' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </div>

      {/* 预览：未展开时显示前 120 字 */}
      {!expanded && (
        <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed line-clamp-2">
          {result.chunk_text}
        </p>
      )}

      {/* 展开后显示完整 Markdown 内容 */}
      {expanded && (
        <div className="mt-3 pt-3" style={{ borderTop: '1px solid var(--border-light)' }}>
          <div className="lesson-content text-[14px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{result.chunk_text}</ReactMarkdown>
          </div>
          <div className="mt-3 flex justify-end">
            <Link
              href={`/learn/${result.module_id}/${result.topic_id}`}
              className="text-[12px] font-medium px-3 py-1.5 rounded-lg transition-colors"
              style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
            >
              查看完整课题 →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
