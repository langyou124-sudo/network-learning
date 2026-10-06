'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { getModuleById, getTopicById } from '@/data/courses';
import { getProgress, toggleTopicComplete, saveQuizScore, saveNote, getNote, saveMistake } from '@/lib/storage';
import { Module, Topic } from '@/types';
import { useStudyTimer } from '@/hooks/useStudyTimer';
import { renderContentWithDiagrams } from '@/lib/renderContent';
import {
  gradeAnswer, isMultiBlank, isSelfAssess, isObjective,
  renderAnswer, blankCount,
  type UserAnswer,
} from '@/lib/quiz-grading';

type TabType = 'content' | 'quiz' | 'notes';

export default function RuankaoTopicPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const moduleId = params.moduleId as string;
  const topicId = params.topicId as string;

  const [module, setModule] = useState<Module | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>(
    (searchParams.get('tab') as TabType) || 'content'
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [note, setNote] = useState('');

  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswer>>({});
  const [selfAssessResults, setSelfAssessResults] = useState<Record<string, 'mastered' | 'review'>>({});
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  useStudyTimer({ topicId, enabled: !!topic });

  useEffect(() => {
    const loadData = () => {
      const mod = getModuleById(moduleId);
      const top = getTopicById(topicId);
      setModule(mod || null);
      setTopic(top || null);

      const progress = getProgress();
      setIsCompleted(progress.completedTopics.includes(topicId));
      setNote(getNote(topicId));
    };
    loadData();
  }, [moduleId, topicId]);

  const handleComplete = () => {
    toggleTopicComplete(topicId);
    setIsCompleted(!isCompleted);
  };

  const handleSaveNote = () => {
    saveNote(topicId, note);
    alert('笔记已保存');
  };

  const handleQuizAnswer = (quizId: string, answer: string | string[]) => {
    setUserAnswers(prev => ({ ...prev, [quizId]: answer }));
  };

  /** 该题是否已作答（多空填空要求至少填一空） */
  const hasAnswer = (quizId: string) => {
    const v = userAnswers[quizId];
    if (Array.isArray(v)) return v.some(s => s.trim() !== '');
    return typeof v === 'string' && v.trim() !== '';
  };

  /** 用户答案展示文本 */
  const userAnswerText = (quizId: string) => {
    const v = userAnswers[quizId];
    if (Array.isArray(v)) return v.filter(s => s.trim() !== '').join(' / ') || '未作答';
    return v || '未作答';
  };

  const handleSelfAssess = (quizId: string, result: 'mastered' | 'review') => {
    setSelfAssessResults(prev => ({ ...prev, [quizId]: result }));
  };

  const handleSubmitQuiz = () => {
    if (!topic) return;

    // 只统计客观题；简答题自评，不计分、不进错题本
    let correct = 0;
    let total = 0;
    topic.quizzes.forEach(quiz => {
      if (!isObjective(quiz)) return;
      const ua = userAnswers[quiz.id] ?? '';
      const r = gradeAnswer(quiz, ua);
      total++;
      if (r.correct) {
        correct++;
      } else {
        saveMistake({
          quizId: quiz.id,
          topicId: topic.id,
          question: quiz.question,
          userAnswer: Array.isArray(ua) ? ua : (ua || '未作答'),
          correctAnswer: quiz.answer,
          date: new Date().toISOString().split('T')[0],
          reviewed: false,
        });
      }
    });

    setQuizScore({ correct, total });
    saveQuizScore(topicId, correct, total);
    setShowResult(true);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setSelfAssessResults({});
    setShowResult(false);
    setCurrentQuizIndex(0);
  };

  if (!topic || !module) {
    return (
      <div className="text-center py-16">
        <p className="text-[var(--text-muted)]">课题不存在</p>
      </div>
    );
  }

  const currentQuiz = topic.quizzes[currentQuizIndex];

  return (
    <div>
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-[13px] text-[var(--text-muted)] mb-5 animate-in">
        <Link href="/learn/ruankao" className="hover:text-[var(--accent)] transition-colors">软考备考</Link>
        <span className="opacity-40">/</span>
        <Link href={`/learn/ruankao/${moduleId}`} className="hover:text-[var(--accent)] transition-colors">{module.title}</Link>
        <span className="opacity-40">/</span>
        <span className="text-[var(--text)]">{topic.title}</span>
      </div>

      {/* 标题行 */}
      <div className="flex items-center justify-between mb-6 animate-in" style={{ animationDelay: '0.06s' }}>
        <h1 className="text-xl font-bold text-[var(--text)] tracking-tight">{topic.title}</h1>
        <button
          onClick={handleComplete}
          className={`btn ${isCompleted ? 'btn-secondary' : 'btn-primary'}`}
          style={isCompleted ? { background: 'var(--success-bg)', color: 'var(--success)', border: 'none' } : {}}
        >
          {isCompleted ? '✓ 已完成 · 点击取消' : '标记完成'}
        </button>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-1 p-1 rounded-xl mb-6 animate-in"
        style={{ background: 'var(--bg-warm)', animationDelay: '0.12s' }}>
        {[
          { key: 'content' as const, label: '知识讲解', icon: '📖' },
          { key: 'quiz' as const, label: `练习题 (${topic.quizzes.length})`, icon: '✏️' },
          { key: 'notes' as const, label: '笔记', icon: '📝' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 px-4 rounded-lg text-[13.5px] font-medium transition-all duration-200 ${
              activeTab === tab.key
                ? 'bg-white text-[var(--text)] shadow-sm'
                : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* 知识讲解 */}
      {activeTab === 'content' && (
        <div className="card px-4 sm:px-8 py-4 sm:py-8 animate-in">
          <div className="lesson-content">
            {renderContentWithDiagrams(topic.content)}
          </div>

          {topic.references.length > 0 && (
            <div className="mt-8 pt-6" style={{ borderTop: '1px solid var(--border)' }}>
              <h3 className="text-[12px] font-semibold text-[var(--text-muted)] uppercase tracking-wider mb-2">参考资料</h3>
              <ul className="text-[13px] text-[var(--text-secondary)] space-y-1">
                {topic.references.map((ref, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--text-muted)] mt-0.5">·</span>
                    <span>{ref}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between items-center mt-6 pt-5" style={{ borderTop: '1px solid var(--border-light)' }}>
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('ai-explain', {
                  detail: {
                    message: `请用通俗易懂的方式解释一下「${topic.title}」这个知识点的核心内容，重点解释其中的关键概念。`,
                    context: topic.content.slice(0, 2000),
                  },
                }));
              }}
              className="btn btn-secondary"
              style={{ color: 'var(--accent)', borderColor: 'var(--accent)' }}
            >
              🤖 AI 解释
            </button>
            <button onClick={() => setActiveTab('quiz')} className="btn btn-primary">
              开始练习 →
            </button>
          </div>
        </div>
      )}

      {/* 练习题 */}
      {activeTab === 'quiz' && (
        <div className="card px-4 sm:px-8 py-4 sm:py-8 animate-in">
          {topic.quizzes.length === 0 ? (
            <p className="text-center text-[var(--text-muted)] py-8">暂无练习题</p>
          ) : showResult ? (
            <div className="text-center">
              <div className="text-5xl mb-3">
                {quizScore.total > 0 && quizScore.correct / quizScore.total >= 0.8 ? '🎉' : '📚'}
              </div>
              <h2 className="text-xl font-bold text-[var(--text)] mb-1">测验完成</h2>
              <p className="text-[var(--text-secondary)] mb-6">
                客观题：<span className="font-bold text-[var(--accent)]">{quizScore.correct}/{quizScore.total}</span>
                <span className="text-[var(--text-muted)] ml-1">
                  （{quizScore.total > 0 ? Math.round(quizScore.correct / quizScore.total * 100) : 0}分，简答题自评不计分）
                </span>
              </p>

              <div className="text-left space-y-3 mb-8">
                {topic.quizzes.map(quiz => {
                  const ua = userAnswers[quiz.id] ?? '';
                  const r = gradeAnswer(quiz, ua);
                  const selfAssessed = isSelfAssess(quiz);
                  const selfResult = selfAssessResults[quiz.id];

                  return (
                    <div key={quiz.id} className="rounded-xl px-5 py-4"
                      style={{
                        background: selfAssessed
                          ? 'var(--bg-warm)'
                          : r.correct ? 'var(--success-bg)' : 'var(--danger-bg)',
                      }}>
                      <div className="flex items-start justify-between gap-3">
                        <p className="font-medium text-[var(--text)] text-[14px]">{quiz.question}</p>
                        {selfAssessed ? (
                          <span className="shrink-0 text-[11px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ background: 'var(--border-light)', color: 'var(--text-muted)' }}>
                            自评
                          </span>
                        ) : (
                          <span className="shrink-0 text-[13px] font-semibold"
                            style={{ color: r.correct ? 'var(--success)' : 'var(--danger)' }}>
                            {r.correct ? '✓ 正确' : '✗ 错误'}
                          </span>
                        )}
                      </div>

                      <p className="text-[13px] mt-1.5">
                        你的答案：
                        <span style={{
                          color: selfAssessed
                            ? 'var(--text-secondary)'
                            : r.correct ? 'var(--success)' : 'var(--danger)',
                        }}>
                          {userAnswerText(quiz.id)}
                        </span>
                      </p>

                      <p className="text-[13px]" style={{ color: 'var(--success)' }}>
                        {selfAssessed ? '参考答案' : '正确答案'}：{selfAssessed ? renderAnswer(quiz) : r.displayAnswer}
                      </p>

                      {r.blankResults && (
                        <p className="text-[12.5px] text-[var(--text-muted)]">
                          逐空判定：{r.blankResults.map((ok, i) => `第${i + 1}空 ${ok ? '✓' : '✗'}`).join('  ')}
                        </p>
                      )}

                      <p className="text-[12.5px] text-[var(--text-muted)] mt-1.5">{quiz.explanation}</p>

                      {selfAssessed && (
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleSelfAssess(quiz.id, 'mastered')}
                            className="btn"
                            style={{
                              background: selfResult === 'mastered' ? 'var(--success-bg)' : 'var(--surface)',
                              color: 'var(--success)',
                              border: `1.5px solid ${selfResult === 'mastered' ? 'var(--success)' : 'var(--border)'}`,
                            }}
                          >
                            ✅ 已掌握
                          </button>
                          <button
                            onClick={() => handleSelfAssess(quiz.id, 'review')}
                            className="btn"
                            style={{
                              background: selfResult === 'review' ? 'var(--danger-bg)' : 'var(--surface)',
                              color: 'var(--warning)',
                              border: `1.5px solid ${selfResult === 'review' ? 'var(--warning)' : 'var(--border)'}`,
                            }}
                          >
                            🔁 需复习
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-3 justify-center">
                <button onClick={handleResetQuiz} className="btn btn-secondary">重新测验</button>
                <Link href="/mistakes" className="btn btn-primary" style={{ background: 'var(--warning)' }}>
                  查看错题本
                </Link>
              </div>
            </div>
          ) : (
            <div>
              {/* 题号导航 */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[15px] font-semibold text-[var(--text)]">
                  第 {currentQuizIndex + 1}/{topic.quizzes.length} 题
                </h2>
                <div className="flex gap-1.5">
                  {topic.quizzes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQuizIndex(i)}
                      className={`w-7 h-7 rounded-full text-[12px] font-medium transition-all ${
                        i === currentQuizIndex
                          ? 'text-white'
                          : hasAnswer(topic.quizzes[i].id)
                          ? 'text-[var(--success)]'
                          : 'text-[var(--text-muted)]'
                      }`}
                      style={{
                        background: i === currentQuizIndex
                          ? 'var(--accent)'
                          : hasAnswer(topic.quizzes[i].id)
                          ? 'var(--success-bg)'
                          : 'var(--border-light)',
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              {/* 题目 */}
              <div className="mb-8">
                <p className="text-[15.5px] text-[var(--text)] mb-5 leading-relaxed">{currentQuiz.question}</p>

                {currentQuiz.type === 'choice' && currentQuiz.options && (
                  <div className="space-y-2">
                    {currentQuiz.options.map((option, i) => {
                      const optionLabel = String.fromCharCode(65 + i);
                      const isSelected = userAnswers[currentQuiz.id] === optionLabel;
                      return (
                        <label
                          key={i}
                          className="flex items-center gap-3 px-5 py-3.5 rounded-xl cursor-pointer transition-all duration-200"
                          style={{
                            background: isSelected ? 'var(--accent-light)' : 'var(--surface)',
                            border: `1.5px solid ${isSelected ? 'var(--accent)' : 'var(--border)'}`,
                          }}
                        >
                          <input
                            type="radio"
                            name={currentQuiz.id}
                            value={optionLabel}
                            checked={isSelected}
                            onChange={() => handleQuizAnswer(currentQuiz.id, optionLabel)}
                            className="accent-[var(--accent)]"
                          />
                          <span className="font-semibold text-[13px]" style={{ color: isSelected ? 'var(--accent)' : 'var(--text-muted)' }}>
                            {optionLabel}.
                          </span>
                          <span className="text-[14.5px] text-[var(--text)]">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {currentQuiz.type === 'fill' && isMultiBlank(currentQuiz) && (
                  <div className="space-y-3">
                    {Array.from({ length: blankCount(currentQuiz) }).map((_, bi) => {
                      const arr = Array.isArray(userAnswers[currentQuiz.id])
                        ? (userAnswers[currentQuiz.id] as string[])
                        : [];
                      return (
                        <input
                          key={bi}
                          type="text"
                          value={arr[bi] || ''}
                          onChange={(e) => {
                            const n = blankCount(currentQuiz);
                            const next = Array.from({ length: n }, (__, i) =>
                              i === bi ? e.target.value : (arr[i] || '')
                            );
                            handleQuizAnswer(currentQuiz.id, next);
                          }}
                          placeholder={`第${bi + 1}空`}
                          className="w-full px-5 py-3.5 rounded-xl text-[14.5px] focus:outline-none"
                          style={{
                            border: '1.5px solid var(--border)',
                            background: 'var(--surface)',
                          }}
                        />
                      );
                    })}
                  </div>
                )}

                {currentQuiz.type === 'fill' && !isMultiBlank(currentQuiz) && (
                  <input
                    type="text"
                    value={typeof userAnswers[currentQuiz.id] === 'string' ? (userAnswers[currentQuiz.id] as string) : ''}
                    onChange={(e) => handleQuizAnswer(currentQuiz.id, e.target.value)}
                    placeholder="请输入答案"
                    className="w-full px-5 py-3.5 rounded-xl text-[14.5px] focus:outline-none"
                    style={{
                      border: '1.5px solid var(--border)',
                      background: 'var(--surface)',
                    }}
                  />
                )}

                {currentQuiz.type === 'short-answer' && (
                  <textarea
                    value={typeof userAnswers[currentQuiz.id] === 'string' ? (userAnswers[currentQuiz.id] as string) : ''}
                    onChange={(e) => handleQuizAnswer(currentQuiz.id, e.target.value)}
                    placeholder="请输入你的答案"
                    rows={4}
                    className="w-full px-5 py-3.5 rounded-xl text-[14.5px] focus:outline-none resize-none"
                    style={{
                      border: '1.5px solid var(--border)',
                      background: 'var(--surface)',
                    }}
                  />
                )}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuizIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuizIndex === 0}
                  className="btn btn-secondary disabled:opacity-40"
                >
                  上一题
                </button>

                {currentQuizIndex < topic.quizzes.length - 1 ? (
                  <button onClick={() => setCurrentQuizIndex(prev => prev + 1)} className="btn btn-primary">
                    下一题
                  </button>
                ) : (
                  <button onClick={handleSubmitQuiz} className="btn btn-primary"
                    style={{ background: 'linear-gradient(135deg, var(--success) 0%, #3aad6e 100%)' }}>
                    提交答案
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 笔记 */}
      {activeTab === 'notes' && (
        <div className="card px-4 sm:px-8 py-4 sm:py-8 animate-in">
          <h2 className="text-[15px] font-semibold text-[var(--text)] mb-4">学习笔记</h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="在这里记录你的学习笔记…"
            rows={12}
            className="w-full px-5 py-4 rounded-xl text-[14.5px] focus:outline-none resize-none"
            style={{
              border: '1.5px solid var(--border)',
              background: 'var(--surface)',
              lineHeight: '1.8',
            }}
          />
          <div className="flex justify-end mt-4">
            <button onClick={handleSaveNote} className="btn btn-primary">保存笔记</button>
          </div>
        </div>
      )}
    </div>
  );
}
