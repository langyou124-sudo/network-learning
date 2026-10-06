'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { peExam802Modules, getTopicById } from '@/data/pe-exam-802';
import { Topic } from '@/types';
import { getProgress, toggleTopicComplete, saveNote, getNote, saveMistake } from '@/lib/storage';
import { useStudyTimer } from '@/hooks/useStudyTimer';
import { renderContentWithDiagrams } from '@/lib/renderContent';
import {
  gradeAnswer, isMultiBlank, isSelfAssess, isObjective, renderAnswer, blankCount,
  type UserAnswer,
} from '@/lib/quiz-grading';

type TabType = 'content' | 'quiz' | 'notes';

export default function PeExam802TopicPage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const topicId = params.topicId as string;

  const [module, setModule] = useState<{ id: string; title: string; icon: string } | null>(null);
  const [topic, setTopic] = useState<Topic | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('content');
  const [isCompleted, setIsCompleted] = useState(false);
  const [note, setNote] = useState('');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, UserAnswer>>({});
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });
  const [selfAssessResults, setSelfAssessResults] = useState<Record<string, 'mastered' | 'review'>>({});
  const [revealedSelfAssess, setRevealedSelfAssess] = useState<Record<string, boolean>>({});

  useStudyTimer({ topicId, enabled: !!topic });

  useEffect(() => {
    const mod = peExam802Modules.find((m) => m.id === moduleId);
    setModule(mod || null);
    const top = getTopicById(topicId);
    setTopic(top || null);
    const progress = getProgress();
    setIsCompleted(progress.completedTopics.includes(topicId));
    setNote(getNote(topicId));
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

  const handleSelfAssess = (quizId: string, result: 'mastered' | 'review') => {
    setSelfAssessResults(prev => ({ ...prev, [quizId]: result }));
  };

  const handleRevealAnswer = (quizId: string) => {
    setRevealedSelfAssess(prev => ({ ...prev, [quizId]: true }));
  };

  const getSingleAnswer = (quizId: string): string => {
    const a = userAnswers[quizId];
    if (typeof a === 'string') return a;
    if (Array.isArray(a)) return a[0] ?? '';
    return '';
  };

  const getBlankAnswers = (quizId: string, n: number): string[] => {
    const a = userAnswers[quizId];
    const arr = Array.isArray(a) ? a : typeof a === 'string' ? [a] : [];
    return Array.from({ length: n }, (_, i) => arr[i] ?? '');
  };

  const handleSubmitQuiz = () => {
    if (!topic) return;
    let correct = 0;
    let objectiveTotal = 0;
    topic.quizzes.forEach(quiz => {
      if (!isObjective(quiz)) return; // 简答题自评，不判分、不入错题本
      const userAnswer = userAnswers[quiz.id] ?? '';
      const r = gradeAnswer(quiz, userAnswer);
      objectiveTotal++;
      if (r.correct) {
        correct++;
      } else {
        saveMistake({
          quizId: quiz.id,
          topicId: topic.id,
          question: quiz.question,
          userAnswer: Array.isArray(userAnswer) ? userAnswer : (userAnswer || '未作答'),
          correctAnswer: quiz.answer,
          date: new Date().toISOString().split('T')[0],
          reviewed: false,
        });
      }
    });
    setQuizScore({ correct, total: objectiveTotal });
    setShowResult(true);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowResult(false);
    setCurrentQuizIndex(0);
    setSelfAssessResults({});
    setRevealedSelfAssess({});
  };

  const formatUserAnswer = (ans: UserAnswer | undefined): string => {
    if (ans === undefined) return '未作答';
    if (Array.isArray(ans)) return ans.filter(Boolean).length ? ans.join(' / ') : '未作答';
    return ans || '未作答';
  };

  if (!topic || !module) {
    return <div className="text-center py-16"><p className="text-[var(--text-muted)]">课题不存在</p></div>;
  }

  const currentQuiz = topic.quizzes[currentQuizIndex];

  return (
    <div>
      <div className="flex items-center gap-2 text-[13px] text-[var(--text-muted)] mb-5 animate-in">
        <Link href="/learn/pe-exam-802" className="hover:text-[var(--accent)] transition-colors">802经济学综合</Link>
        <span className="opacity-40">/</span>
        <Link href={`/learn/pe-exam-802/${moduleId}`} className="hover:text-[var(--accent)] transition-colors">{module.title}</Link>
        <span className="opacity-40">/</span>
        <span className="text-[var(--text)]">{topic.title}</span>
      </div>

      <div className="flex items-center justify-between mb-6 animate-in" style={{ animationDelay: '0.06s' }}>
        <h1 className="text-xl font-bold text-[var(--text)] tracking-tight">{topic.title}</h1>
        <button
          onClick={handleComplete}
          className={`px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all ${isCompleted ? 'bg-[var(--success)] text-white' : 'bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)]'}`}
        >
          {isCompleted ? '✓ 已完成' : '标记完成'}
        </button>
      </div>

      <div className="flex gap-1 mb-6 animate-in" style={{ animationDelay: '0.12s' }}>
        {(['content', 'quiz', 'notes'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-[13px] font-medium transition-all ${activeTab === tab ? 'bg-[var(--accent)] text-white' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}
          >
            {tab === 'content' ? '课程内容' : tab === 'quiz' ? '练习题' : '笔记'}
          </button>
        ))}
      </div>

      {activeTab === 'content' && (
        <div className="card px-6 py-5 animate-in" style={{ animationDelay: '0.18s' }}>
          <div className="lesson-content">
            {renderContentWithDiagrams(topic.content)}
          </div>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="space-y-4 animate-in" style={{ animationDelay: '0.18s' }}>
          {topic.quizzes.length > 0 ? (
            <>
              {!showResult ? (
                <div className="card px-6 py-5">
                  <div className="mb-4">
                    <span className="text-[13px] text-[var(--text-muted)]">题目 {currentQuizIndex + 1}/{topic.quizzes.length}</span>
                  </div>
                  <p className="text-[var(--text)] mb-4">{currentQuiz.question}</p>
                  {currentQuiz.type === 'choice' && currentQuiz.options && (
                    <div className="space-y-2 mb-4">
                      {currentQuiz.options.map((opt, i) => {
                        const letter = String.fromCharCode(65 + i);
                        return (
                          <label key={i} className="flex items-center gap-2 p-3 rounded-lg border border-[var(--border)] cursor-pointer hover:bg-[var(--surface)]">
                            <input
                              type="radio"
                              name={currentQuiz.id}
                              value={letter}
                              checked={userAnswers[currentQuiz.id] === letter}
                              onChange={() => handleQuizAnswer(currentQuiz.id, letter)}
                            />
                            <span className="text-[var(--text)]">{letter}. {opt}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                  {currentQuiz.type === 'fill' && (
                    isMultiBlank(currentQuiz) ? (
                      <div className="space-y-2 mb-4">
                        {Array.from({ length: blankCount(currentQuiz) }).map((_, i) => (
                          <input
                            key={i}
                            type="text"
                            value={getBlankAnswers(currentQuiz.id, blankCount(currentQuiz))[i] ?? ''}
                            onChange={(e) => {
                              const arr = getBlankAnswers(currentQuiz.id, blankCount(currentQuiz));
                              arr[i] = e.target.value;
                              handleQuizAnswer(currentQuiz.id, arr);
                            }}
                            placeholder={`第${i + 1}空`}
                            className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
                          />
                        ))}
                      </div>
                    ) : (
                      <input
                        type="text"
                        value={getSingleAnswer(currentQuiz.id)}
                        onChange={(e) => handleQuizAnswer(currentQuiz.id, e.target.value)}
                        placeholder="请输入答案"
                        className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] mb-4"
                      />
                    )
                  )}
                  {isSelfAssess(currentQuiz) && (
                    <div className="mb-4">
                      <textarea
                        value={getSingleAnswer(currentQuiz.id)}
                        onChange={(e) => handleQuizAnswer(currentQuiz.id, e.target.value)}
                        placeholder="输入你的答案..."
                        rows={4}
                        className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
                      />
                      {!revealedSelfAssess[currentQuiz.id] ? (
                        <button
                          onClick={() => handleRevealAnswer(currentQuiz.id)}
                          className="mt-2 px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text)] text-[13px]"
                        >
                          查看参考答案
                        </button>
                      ) : (
                        <div className="mt-3 space-y-2">
                          <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                            <p className="text-[12px] text-[var(--text-muted)] mb-1">参考答案</p>
                            <p className="text-[13px] text-[var(--text)]">{renderAnswer(currentQuiz)}</p>
                          </div>
                          {currentQuiz.explanation && (
                            <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                              <p className="text-[12px] text-[var(--text-muted)] mb-1">解析</p>
                              <p className="text-[13px] text-[var(--text)]">{currentQuiz.explanation}</p>
                            </div>
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSelfAssess(currentQuiz.id, 'mastered')}
                              className={`px-3 py-1.5 rounded-lg text-[13px] transition-all ${selfAssessResults[currentQuiz.id] === 'mastered' ? 'bg-[var(--success)] text-white' : 'border border-[var(--border)] text-[var(--text)]'}`}
                            >
                              ✅ 已掌握
                            </button>
                            <button
                              onClick={() => handleSelfAssess(currentQuiz.id, 'review')}
                              className={`px-3 py-1.5 rounded-lg text-[13px] transition-all ${selfAssessResults[currentQuiz.id] === 'review' ? 'bg-[var(--warning)] text-white' : 'border border-[var(--border)] text-[var(--text)]'}`}
                            >
                              🔁 需复习
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex gap-2">
                    {currentQuizIndex > 0 && (
                      <button onClick={() => setCurrentQuizIndex(currentQuizIndex - 1)} className="px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text)]">上一题</button>
                    )}
                    {currentQuizIndex < topic.quizzes.length - 1 ? (
                      <button onClick={() => setCurrentQuizIndex(currentQuizIndex + 1)} className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white">下一题</button>
                    ) : (
                      <button onClick={handleSubmitQuiz} className="px-4 py-2 rounded-lg bg-[var(--success)] text-white">提交</button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="card px-6 py-5 text-center">
                    <div className="text-3xl font-bold mb-2" style={{ color: quizScore.total > 0 && quizScore.correct === quizScore.total ? 'var(--success)' : 'var(--warning)' }}>
                      客观题 {quizScore.correct}/{quizScore.total}
                    </div>
                    <p className="text-[var(--text-muted)] mb-4">
                      {quizScore.total === 0
                        ? '本次无客观题，简答题请对照参考答案自评'
                        : quizScore.correct === quizScore.total
                          ? '客观题全部正确！简答题不计分'
                          : `客观题答对了 ${quizScore.correct} 题，简答题不计分`}
                    </p>
                    <button onClick={handleResetQuiz} className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white">重新答题</button>
                  </div>

                  {topic.quizzes.map((quiz, idx) => {
                    const ua = userAnswers[quiz.id];
                    const r = gradeAnswer(quiz, ua ?? '');
                    const selfAssess = isSelfAssess(quiz);
                    const userText = (() => {
                      if (quiz.type === 'choice' && typeof ua === 'string' && quiz.options && ua) {
                        const oi = ua.toUpperCase().charCodeAt(0) - 65;
                        if (oi >= 0 && oi < quiz.options.length) return `${ua.toUpperCase()}. ${quiz.options[oi]}`;
                      }
                      return formatUserAnswer(ua);
                    })();
                    return (
                      <div
                        key={quiz.id}
                        className="card px-5 py-4"
                        style={{ borderLeft: selfAssess ? '3px solid var(--accent)' : r.correct ? '3px solid var(--success)' : '3px solid var(--warning)' }}
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <p className="text-[var(--text)]">
                            <span className="text-[var(--text-muted)] mr-1">{idx + 1}.</span>
                            {quiz.question}
                          </p>
                          {selfAssess ? (
                            <span className="shrink-0 px-2 py-0.5 rounded text-[12px] border border-[var(--border)] text-[var(--accent)] bg-[var(--surface)]">自评</span>
                          ) : (
                            <span className="shrink-0 px-2 py-0.5 rounded text-[12px]" style={{ color: r.correct ? 'var(--success)' : 'var(--warning)' }}>
                              {r.correct ? '✓ 正确' : '✗ 错误'}
                            </span>
                          )}
                        </div>
                        <div className="space-y-1 text-[13px]">
                          <p className="text-[var(--text-muted)]">
                            你的答案：<span className="text-[var(--text)]">{userText}</span>
                          </p>
                          <p className="text-[var(--text-muted)]">
                            {selfAssess ? '参考答案' : '正确答案'}：<span className="text-[var(--text)]">{r.displayAnswer}</span>
                          </p>
                          {quiz.explanation && (
                            <p className="text-[var(--text-muted)]">
                              解析：<span className="text-[var(--text)]">{quiz.explanation}</span>
                            </p>
                          )}
                          {selfAssess && (
                            <div className="flex items-center gap-2 pt-2">
                              <button
                                onClick={() => handleSelfAssess(quiz.id, 'mastered')}
                                className={`px-3 py-1.5 rounded-lg text-[13px] transition-all ${selfAssessResults[quiz.id] === 'mastered' ? 'bg-[var(--success)] text-white' : 'border border-[var(--border)] text-[var(--text)]'}`}
                              >
                                ✅ 已掌握
                              </button>
                              <button
                                onClick={() => handleSelfAssess(quiz.id, 'review')}
                                className={`px-3 py-1.5 rounded-lg text-[13px] transition-all ${selfAssessResults[quiz.id] === 'review' ? 'bg-[var(--warning)] text-white' : 'border border-[var(--border)] text-[var(--text)]'}`}
                              >
                                🔁 需复习
                              </button>
                              {selfAssessResults[quiz.id] && (
                                <span className="text-[12px] text-[var(--text-muted)]">
                                  已自评：{selfAssessResults[quiz.id] === 'mastered' ? '已掌握' : '需复习'}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <div className="card text-center py-16">
              <p className="text-[var(--text-muted)]">暂无练习题</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="card px-6 py-5 animate-in" style={{ animationDelay: '0.18s' }}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="记录你的学习笔记..."
            rows={10}
            className="w-full p-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] mb-4"
          />
          <button onClick={handleSaveNote} className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white">保存笔记</button>
        </div>
      )}
    </div>
  );
}
