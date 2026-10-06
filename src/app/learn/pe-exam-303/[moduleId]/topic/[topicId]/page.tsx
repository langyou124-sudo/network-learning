'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { peExam303Modules, getTopicById } from '@/data/pe-exam-303';
import { Topic } from '@/types';
import { getProgress, toggleTopicComplete, saveNote, getNote, saveMistake, saveQuizScore } from '@/lib/storage';
import { useStudyTimer } from '@/hooks/useStudyTimer';
import { renderContentWithDiagrams } from '@/lib/renderContent';
import {
  gradeAnswer,
  isMultiBlank,
  isSelfAssess,
  isObjective,
  renderAnswer,
  blankCount,
  type UserAnswer,
} from '@/lib/quiz-grading';

type TabType = 'content' | 'quiz' | 'notes';

export default function PeExam303TopicPage() {
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
  const [selfRatings, setSelfRatings] = useState<Record<string, 'mastered' | 'review'>>({});

  useStudyTimer({ topicId, enabled: !!topic });

  useEffect(() => {
    const mod = peExam303Modules.find((m) => m.id === moduleId);
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

  const handleBlankChange = (quizId: string, index: number, value: string, n: number) => {
    const cur = userAnswers[quizId];
    const arr = Array.isArray(cur) ? [...cur] : Array(n).fill('');
    while (arr.length < n) arr.push('');
    arr[index] = value;
    handleQuizAnswer(quizId, arr);
  };

  const answerText = (v: UserAnswer | undefined): string =>
    typeof v === 'string' ? v : Array.isArray(v) ? v.join(' ') : '';

  const handleSubmitQuiz = () => {
    if (!topic) return;
    // 总分只统计客观题；简答题自评，不计入正确率、不进错题本
    const objectiveQuizzes = topic.quizzes.filter(isObjective);
    let correct = 0;
    objectiveQuizzes.forEach(quiz => {
      const ua = userAnswers[quiz.id] ?? '';
      const r = gradeAnswer(quiz, ua);
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
    setQuizScore({ correct, total: objectiveQuizzes.length });
    saveQuizScore(topicId, correct, objectiveQuizzes.length);
    setShowResult(true);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setSelfRatings({});
    setShowResult(false);
    setCurrentQuizIndex(0);
  };

  if (!topic || !module) {
    return <div className="text-center py-16"><p className="text-[var(--text-muted)]">课题不存在</p></div>;
  }

  const currentQuiz = topic.quizzes[currentQuizIndex];

  return (
    <div>
      <div className="flex items-center gap-2 text-[13px] text-[var(--text-muted)] mb-5 animate-in">
        <Link href="/learn/pe-exam-303" className="hover:text-[var(--accent)] transition-colors">303数学三</Link>
        <span className="opacity-40">/</span>
        <Link href={`/learn/pe-exam-303/${moduleId}`} className="hover:text-[var(--accent)] transition-colors">{module.title}</Link>
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
                            <span className="text-[var(--text)]">
                              <span className="font-medium text-[var(--text-muted)]">{letter}.</span> {opt}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                  {currentQuiz.type === 'fill' && isMultiBlank(currentQuiz) && (
                    <div className="space-y-2 mb-4">
                      {Array.from({ length: blankCount(currentQuiz) }).map((_, i) => {
                        const cur = userAnswers[currentQuiz.id];
                        const arr = Array.isArray(cur) ? cur : [];
                        return (
                          <input
                            key={i}
                            type="text"
                            value={arr[i] || ''}
                            onChange={(e) => handleBlankChange(currentQuiz.id, i, e.target.value, blankCount(currentQuiz))}
                            placeholder={`第${i + 1}空`}
                            className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)]"
                          />
                        );
                      })}
                    </div>
                  )}
                  {currentQuiz.type === 'fill' && !isMultiBlank(currentQuiz) && (
                    <input
                      type="text"
                      value={answerText(userAnswers[currentQuiz.id])}
                      onChange={(e) => handleQuizAnswer(currentQuiz.id, e.target.value)}
                      placeholder="请输入答案"
                      className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] mb-4"
                    />
                  )}
                  {isSelfAssess(currentQuiz) && (
                    <textarea
                      value={answerText(userAnswers[currentQuiz.id])}
                      onChange={(e) => handleQuizAnswer(currentQuiz.id, e.target.value)}
                      placeholder="输入你的答案..."
                      rows={4}
                      className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] mb-4"
                    />
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
                <div className="card px-6 py-5">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold mb-2" style={{ color: quizScore.total > 0 && quizScore.correct === quizScore.total ? 'var(--success)' : 'var(--warning)' }}>
                      客观题 {quizScore.correct}/{quizScore.total}
                    </div>
                    <p className="text-[var(--text-muted)] mb-4">
                      {quizScore.total > 0 && quizScore.correct === quizScore.total ? '客观题全部正确！' : `客观题答对了 ${quizScore.correct} 题`}，简答题不计分，请对照参考答案自评
                    </p>
                    <button onClick={handleResetQuiz} className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white">重新答题</button>
                  </div>
                  <div className="space-y-3 text-left">
                    {topic.quizzes.map((quiz) => {
                      const r = gradeAnswer(quiz, userAnswers[quiz.id] ?? '');
                      const ua = userAnswers[quiz.id];
                      const uaArr = Array.isArray(ua) ? ua : ua ? [ua] : [];
                      const uaText = uaArr.filter(Boolean).join(' / ') || '未作答';
                      const self = isSelfAssess(quiz);
                      return (
                        <div
                          key={quiz.id}
                          className="rounded-xl px-5 py-4"
                          style={{ background: self ? 'var(--surface)' : r.correct ? 'var(--success-bg)' : 'var(--danger-bg)' }}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <p className="font-medium text-[var(--text)] text-[14px]">{quiz.question}</p>
                            {self && (
                              <span
                                className="shrink-0 px-2 py-0.5 rounded text-[11px] font-medium"
                                style={{ background: 'var(--warning-bg)', color: 'var(--warning)' }}
                              >
                                自评
                              </span>
                            )}
                          </div>
                          <p className="text-[13px] mt-1.5">
                            你的答案：{self ? (
                              <span className="text-[var(--text)]">{uaText}</span>
                            ) : (
                              <span style={{ color: r.correct ? 'var(--success)' : 'var(--danger)' }}>{uaText}</span>
                            )}
                          </p>
                          <p className="text-[13px]">
                            {self ? '参考答案' : '正确答案'}：
                            <span style={{ color: 'var(--success)' }}>{self ? renderAnswer(quiz) : r.displayAnswer}</span>
                          </p>
                          {quiz.explanation && (
                            <p className="text-[12.5px] text-[var(--text-muted)] mt-1.5">{quiz.explanation}</p>
                          )}
                          {self && (
                            <div className="flex gap-2 mt-2.5">
                              <button
                                onClick={() => setSelfRatings(prev => ({ ...prev, [quiz.id]: 'mastered' }))}
                                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium border transition-all ${selfRatings[quiz.id] === 'mastered' ? 'bg-[var(--success)] text-white border-transparent' : 'border-[var(--border)] text-[var(--text)]'}`}
                              >
                                ✅ 已掌握
                              </button>
                              <button
                                onClick={() => setSelfRatings(prev => ({ ...prev, [quiz.id]: 'review' }))}
                                className={`px-3 py-1.5 rounded-lg text-[13px] font-medium border transition-all ${selfRatings[quiz.id] === 'review' ? 'bg-[var(--warning)] text-white border-transparent' : 'border-[var(--border)] text-[var(--text)]'}`}
                              >
                                🔁 需复习
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
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
