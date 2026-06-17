'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { marxismModules, getQuestionById } from '@/data/marxism';
import { EssayQuestion, AIEvaluation } from '@/data/marxism/types';

const difficultyMap = {
  basic: { label: '基础', color: 'var(--success)' },
  intermediate: { label: '中等', color: 'var(--warning)' },
  advanced: { label: '进阶', color: 'var(--danger)' },
};

export default function MarxismQuestionPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const questionId = params.questionId as string;

  const [question, setQuestion] = useState<EssayQuestion | null>(null);
  const [module, setModule] = useState<{ id: string; title: string; icon: string } | null>(null);
  const [answer, setAnswer] = useState('');
  const [evaluation, setEvaluation] = useState<AIEvaluation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showModelAnswer, setShowModelAnswer] = useState(false);

  const charCount = answer.trim().length;
  const wordEstimate = answer.trim() ? answer.trim().replace(/\s+/g, ' ').split(' ').length : 0;

  useEffect(() => {
    const q = getQuestionById(questionId);
    const mod = marxismModules.find((m) => m.id === moduleId);
    setQuestion(q || null);
    setModule(mod || null);
  }, [moduleId, questionId]);

  const handleSubmit = async () => {
    if (!question) return;
    if (charCount < 200) {
      setError('答案至少需要200字');
      return;
    }
    if (charCount > 500) {
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
          questionId: question.id,
          question: question.question,
          answer,
          keyPoints: question.keyPoints,
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

  if (!question || !module) {
    return (
      <div className="text-center py-16">
        <p className="text-[var(--text-muted)]">题目不存在</p>
      </div>
    );
  }

  const diff = difficultyMap[question.difficulty];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px] text-[var(--text-muted)] mb-5 animate-in flex-wrap">
        <Link href="/learn/marxism" className="hover:text-[var(--accent)] transition-colors">
          马克思主义
        </Link>
        <span className="opacity-40">/</span>
        <Link
          href={`/learn/marxism/${moduleId}`}
          className="hover:text-[var(--accent)] transition-colors"
        >
          {module.title}
        </Link>
        <span className="opacity-40">/</span>
        <span className="text-[var(--text)] line-clamp-1">{question.question.slice(0, 30)}…</span>
      </div>

      {/* Question header */}
      <div className="card px-6 py-5 mb-6 animate-in" style={{ animationDelay: '0.06s' }}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{module.icon}</span>
          <span className="tag tag-blue text-[11px]">{question.moduleTitle}</span>
          <span
            className="text-[11px] px-2 py-0.5 rounded-full"
            style={{ background: diff.color + '20', color: diff.color }}
          >
            {diff.label}
          </span>
        </div>
        <h2 className="text-lg font-semibold text-[var(--text)] leading-relaxed">
          {question.question}
        </h2>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {question.tags.map((tag) => (
            <span key={tag} className="text-[12px] px-2 py-1 rounded-md bg-[var(--border-light)] text-[var(--text-muted)]">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Answer textarea */}
      {!evaluation && (
        <div className="card px-6 py-5 mb-6 animate-in" style={{ animationDelay: '0.12s' }}>
          <label className="block text-[13px] text-[var(--text-muted)] mb-3">
            你的论述答案（200-500字）
          </label>
          <textarea
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setError('');
            }}
            placeholder="请在此输入你的论述答案..."
            className="w-full h-48 bg-[var(--bg)] text-[var(--text)] text-[14px] leading-relaxed rounded-lg p-4 border border-[var(--border)] resize-none focus:outline-none focus:border-[var(--accent)] transition-colors"
            maxLength={600}
          />
          <div className="flex items-center justify-between mt-3">
            <span
              className={`text-[12px] ${
                charCount < 200 || charCount > 500
                  ? 'text-[var(--danger)]'
                  : 'text-[var(--text-muted)]'
              }`}
            >
              {charCount} / 500 字
              {charCount < 200 && ` (还需 ${200 - charCount} 字)`}
              {charCount > 500 && ' (超出限制)'}
            </span>
            <button
              onClick={handleSubmit}
              disabled={loading || charCount < 200 || charCount > 500}
              className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  AI 批改中...
                </span>
              ) : (
                '提交答案'
              )}
            </button>
          </div>
          {error && <p className="text-[var(--danger)] text-[13px] mt-3">{error}</p>}
        </div>
      )}

      {/* Loading state */}
      {loading && (
        <div className="card px-6 py-12 text-center animate-in">
          <div className="inline-block w-10 h-10 border-[3px] border-[var(--border)] border-t-[var(--accent)] rounded-full animate-spin mb-4" />
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
                className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold text-white shrink-0"
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
              <h3 className="text-[13px] font-medium mb-3" style={{ color: 'var(--success)' }}>
                ✦ 优点
              </h3>
              <ul className="space-y-2">
                {evaluation.strengths.map((s, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[13px] text-[var(--text)]"
                  >
                    <span style={{ color: 'var(--success)' }}>+</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card px-5 py-4">
              <h3 className="text-[13px] font-medium mb-3" style={{ color: 'var(--danger)' }}>
                ✦ 不足
              </h3>
              <ul className="space-y-2">
                {evaluation.weaknesses.map((w, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-[13px] text-[var(--text)]"
                  >
                    <span style={{ color: 'var(--danger)' }}>-</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Key points coverage */}
          <div className="card px-5 py-4">
            <h3 className="text-[13px] font-medium text-[var(--text-muted)] mb-3">
              知识点覆盖
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-[12px] mb-2" style={{ color: 'var(--success)' }}>
                  已覆盖
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {evaluation.keyPointsCovered.map((kp, i) => (
                    <span
                      key={i}
                      className="text-[12px] px-2 py-1 rounded-md"
                      style={{ background: 'var(--success-bg, rgba(34,197,94,0.1))', color: 'var(--success)' }}
                    >
                      {kp}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[12px] mb-2" style={{ color: 'var(--danger)' }}>
                  未覆盖
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {evaluation.keyPointsMissed.map((kp, i) => (
                    <span
                      key={i}
                      className="text-[12px] px-2 py-1 rounded-md"
                      style={{ background: 'var(--danger-bg, rgba(239,68,68,0.1))', color: 'var(--danger)' }}
                    >
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
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`text-[var(--text-muted)] transition-transform ${
                  showModelAnswer ? 'rotate-180' : ''
                }`}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {showModelAnswer && (
              <div className="px-5 pb-4 border-t border-[var(--border)] pt-4">
                <p className="text-[13.5px] text-[var(--text)] leading-relaxed whitespace-pre-wrap">
                  {evaluation.modelAnswer}
                </p>
              </div>
            )}
          </div>

          {/* Deep analysis */}
          <div className="card px-5 py-4">
            <h3 className="text-[13px] font-medium text-[var(--accent)] mb-3">
              🔮 马克思视角深度解析
            </h3>
            <p className="text-[13.5px] text-[var(--text)] leading-relaxed whitespace-pre-wrap">
              {evaluation.deepAnalysis}
            </p>
          </div>

          {/* Retry button */}
          <div className="text-center py-4">
            <button
              onClick={() => {
                setEvaluation(null);
                setAnswer('');
                setError('');
                setShowModelAnswer(false);
              }}
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
