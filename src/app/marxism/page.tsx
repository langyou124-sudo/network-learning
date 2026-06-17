'use client';

import { useState, useMemo } from 'react';
import { allEssayQuestions, marxismModules, getQuestionsByModule } from '@/data/marxism';
import { EssayQuestion, AIEvaluation } from '@/data/marxism/types';

const difficultyMap = {
  basic: { label: '基础', color: 'var(--success)' },
  intermediate: { label: '中等', color: 'var(--warning)' },
  advanced: { label: '进阶', color: 'var(--danger)' },
};

export default function MarxismPage() {
  const [selectedQuestion, setSelectedQuestion] = useState<EssayQuestion | null>(null);
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<AIEvaluation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [expandedModules, setExpandedModules] = useState<Set<string>>(new Set());

  const wordCount = answer.trim() ? answer.trim().length : 0;

  const toggleModule = (moduleId: string) => {
    setExpandedModules(prev => {
      const next = new Set(prev);
      if (next.has(moduleId)) next.delete(moduleId);
      else next.add(moduleId);
      return next;
    });
  };

  const handleSelectQuestion = (q: EssayQuestion) => {
    setSelectedQuestion(q);
    setAnswer('');
    setEvaluation(null);
    setError('');
    setShowModelAnswer(false);
  };

  const handleSubmit = async () => {
    if (!selectedQuestion) return;
    if (wordCount < 200) {
      setError('答案至少需要200字');
      return;
    }
    if (wordCount > 500) {
      setError('答案不能超过500字');
      return;
    }

    setLoading(true);
    setError('');
    setEvaluation(null);

    try {
      const res = await fetch('/api/v1/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionId: selectedQuestion.id,
          question: selectedQuestion.question,
          answer,
          keyPoints: selectedQuestion.keyPoints,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || `请求失败 (${res.status})`);
      }

      const data: AIEvaluation = await res.json();
      setEvaluation(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '评估请求失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score: number) => {
    if (score >= 8) return 'var(--success)';
    if (score >= 6) return 'var(--warning)';
    return 'var(--danger)';
  };

  // Question list view
  if (!selectedQuestion) {
    return (
      <div>
        <div className="mb-8 animate-in">
          <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">马克思主义论述题</h1>
          <p className="text-[var(--text-muted)] text-sm mt-1">选择题目，AI 批改你的论述答案</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 animate-in" style={{ animationDelay: '0.06s' }}>
          {[
            { value: allEssayQuestions.length, label: '总题目数', color: 'var(--accent)' },
            { value: marxismModules.length, label: '课程模块', color: 'var(--success)' },
            { value: allEssayQuestions.filter(q => q.difficulty === 'advanced').length, label: '进阶题', color: 'var(--warning)' },
          ].map((s, i) => (
            <div key={i} className="card px-5 py-4 text-center">
              <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[13px] text-[var(--text-muted)]">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-3 animate-in" style={{ animationDelay: '0.12s' }}>
          {marxismModules.map((mod) => {
            const questions = getQuestionsByModule(mod.id);
            const isExpanded = expandedModules.has(mod.id);

            return (
              <div key={mod.id} className="card overflow-hidden">
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{mod.icon}</span>
                    <div>
                      <h3 className="font-semibold text-[14.5px] text-[var(--text)]">{mod.title}</h3>
                      <span className="text-[12px] text-[var(--text-muted)]">{questions.length} 道题</span>
                    </div>
                  </div>
                  <svg
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className={`text-[var(--text-muted)] transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="border-t border-[var(--border)] px-5 py-3 space-y-2">
                    {questions.map((q) => {
                      const diff = difficultyMap[q.difficulty];
                      return (
                        <button
                          key={q.id}
                          onClick={() => handleSelectQuestion(q)}
                          className="w-full text-left flex items-center justify-between px-4 py-3 rounded-lg hover:bg-white/[0.04] transition-colors group"
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-[13.5px] text-[var(--text)] leading-relaxed line-clamp-2">{q.question}</p>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span
                                className="text-[11px] px-2 py-0.5 rounded-full"
                                style={{ background: diff.color + '20', color: diff.color }}
                              >
                                {diff.label}
                              </span>
                              {q.tags.slice(0, 3).map(tag => (
                                <span key={tag} className="text-[11px] text-[var(--text-muted)]">#{tag}</span>
                              ))}
                            </div>
                          </div>
                          <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)] ml-3 transition-colors">→</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Answer & evaluation view
  return (
    <div>
      {/* Back button */}
      <button
        onClick={() => { setSelectedQuestion(null); setEvaluation(null); }}
        className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text)] text-[13px] mb-6 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
        </svg>
        返回题目列表
      </button>

      {/* Question */}
      <div className="card px-6 py-5 mb-6 animate-in">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{marxismModules.find(m => m.id === selectedQuestion.moduleId)?.icon}</span>
          <span className="tag tag-blue text-[11px]">{selectedQuestion.moduleTitle}</span>
          <span
            className="text-[11px] px-2 py-0.5 rounded-full"
            style={{
              background: difficultyMap[selectedQuestion.difficulty].color + '20',
              color: difficultyMap[selectedQuestion.difficulty].color,
            }}
          >
            {difficultyMap[selectedQuestion.difficulty].label}
          </span>
        </div>
        <h2 className="text-lg font-semibold text-[var(--text)] leading-relaxed">{selectedQuestion.question}</h2>
      </div>

      {/* Answer textarea */}
      {!evaluation && (
        <div className="card px-6 py-5 mb-6 animate-in" style={{ animationDelay: '0.06s' }}>
          <label className="block text-[13px] text-[var(--text-muted)] mb-3">你的论述答案（200-500字）</label>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="请在此输入你的论述答案..."
            className="w-full h-48 bg-[var(--bg)] text-[var(--text)] text-[14px] leading-relaxed rounded-lg p-4 border border-[var(--border)] resize-none focus:outline-none focus:border-[var(--accent)] transition-colors"
          />
          <div className="flex items-center justify-between mt-3">
            <span className={`text-[12px] ${wordCount < 200 || wordCount > 500 ? 'text-[var(--danger)]' : 'text-[var(--text-muted)]'}`}>
              {wordCount} / 500 字 {wordCount < 200 && `(还需 ${200 - wordCount} 字)`}
            </span>
            <button
              onClick={handleSubmit}
              disabled={loading || wordCount < 200 || wordCount > 500}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  AI 批改中...
                </span>
              ) : '提交答案'}
            </button>
          </div>
          {error && (
            <p className="text-[var(--danger)] text-[13px] mt-3">{error}</p>
          )}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="card px-6 py-12 text-center animate-in">
          <div className="inline-block w-10 h-10 border-3 border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin mb-4" />
          <p className="text-[var(--text-muted)] text-[14px]">AI 正在批改你的答案，请稍候...</p>
        </div>
      )}

      {/* Evaluation results */}
      {evaluation && (
        <div className="space-y-4 animate-in" style={{ animationDelay: '0.06s' }}>
          {/* Score */}
          <div className="card px-6 py-5">
            <h3 className="text-[13px] text-[var(--text-muted)] mb-3">评分</h3>
            <div className="flex items-center gap-4">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white"
                style={{ background: scoreColor(evaluation.score) }}
              >
                {evaluation.score}
              </div>
              <div className="flex-1">
                <div className="h-3 rounded-full bg-[var(--bg)] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${evaluation.score * 10}%`,
                      background: scoreColor(evaluation.score),
                    }}
                  />
                </div>
                <p className="text-[12px] text-[var(--text-muted)] mt-1">满分 10 分</p>
              </div>
            </div>
          </div>

          {/* Strengths & Weaknesses */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="card px-5 py-4">
              <h3 className="text-[13px] font-medium mb-3" style={{ color: 'var(--success)' }}>✦ 优点</h3>
              <ul className="space-y-2">
                {evaluation.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-[var(--text)]">
                    <span style={{ color: 'var(--success)' }}>+</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card px-5 py-4">
              <h3 className="text-[13px] font-medium mb-3" style={{ color: 'var(--danger)' }}>✦ 不足</h3>
              <ul className="space-y-2">
                {evaluation.weaknesses.map((w, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] text-[var(--text)]">
                    <span style={{ color: 'var(--danger)' }}>-</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key points */}
          <div className="card px-5 py-4">
            <h3 className="text-[13px] font-medium text-[var(--text-muted)] mb-3">知识点覆盖</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-[12px] mb-2" style={{ color: 'var(--success)' }}>已覆盖</h4>
                <div className="flex flex-wrap gap-1.5">
                  {evaluation.keyPointsCovered.map((kp, i) => (
                    <span key={i} className="text-[12px] px-2 py-1 rounded-md bg-[var(--success)]/10 text-[var(--success)]">
                      {kp}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[12px] mb-2" style={{ color: 'var(--danger)' }}>未覆盖</h4>
                <div className="flex flex-wrap gap-1.5">
                  {evaluation.keyPointsMissed.map((kp, i) => (
                    <span key={i} className="text-[12px] px-2 py-1 rounded-md bg-[var(--danger)]/10 text-[var(--danger)]">
                      {kp}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Model answer (collapsible) */}
          <div className="card overflow-hidden">
            <button
              onClick={() => setShowModelAnswer(!showModelAnswer)}
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-white/[0.02] transition-colors"
            >
              <h3 className="text-[13px] font-medium text-[var(--accent)]">参考答案</h3>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`text-[var(--text-muted)] transition-transform ${showModelAnswer ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {showModelAnswer && (
              <div className="px-5 pb-4 border-t border-[var(--border)] pt-4">
                <p className="text-[13.5px] text-[var(--text)] leading-relaxed whitespace-pre-wrap">{evaluation.modelAnswer}</p>
              </div>
            )}
          </div>

          {/* Deep analysis */}
          <div className="card px-5 py-4">
            <h3 className="text-[13px] font-medium text-[var(--accent)] mb-3">🔮 马克思视角深度解析</h3>
            <p className="text-[13.5px] text-[var(--text)] leading-relaxed whitespace-pre-wrap">{evaluation.deepAnalysis}</p>
          </div>

          {/* Retry button */}
          <div className="text-center py-4">
            <button
              onClick={() => { setEvaluation(null); setAnswer(''); }}
              className="btn btn-secondary"
            >
              重新作答
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
