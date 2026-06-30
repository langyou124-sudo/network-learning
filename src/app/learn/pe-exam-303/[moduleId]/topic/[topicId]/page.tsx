'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { peExam303Modules, getTopicById } from '@/data/pe-exam-303';
import { Topic } from '@/types';
import { getProgress, toggleTopicComplete, saveNote, getNote } from '@/lib/storage';
import { useStudyTimer } from '@/hooks/useStudyTimer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

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

  const handleQuizAnswer = (quizId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [quizId]: answer }));
  };

  const handleSubmitQuiz = () => {
    if (!topic) return;
    let correct = 0;
    topic.quizzes.forEach(quiz => {
      const userAnswer = userAnswers[quiz.id];
      const correctAnswer = Array.isArray(quiz.answer) ? quiz.answer.join(',') : quiz.answer;
      if (userAnswer === correctAnswer) correct++;
    });
    setQuizScore({ correct, total: topic.quizzes.length });
    setShowResult(true);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
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
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{topic.content}</ReactMarkdown>
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
                      {currentQuiz.options.map((opt, i) => (
                        <label key={i} className="flex items-center gap-2 p-3 rounded-lg border border-[var(--border)] cursor-pointer hover:bg-[var(--surface)]">
                          <input
                            type="radio"
                            name={currentQuiz.id}
                            value={opt}
                            checked={userAnswers[currentQuiz.id] === opt}
                            onChange={() => handleQuizAnswer(currentQuiz.id, opt)}
                          />
                          <span className="text-[var(--text)]">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {currentQuiz.type === 'fill' && (
                    <input
                      type="text"
                      value={userAnswers[currentQuiz.id] || ''}
                      onChange={(e) => handleQuizAnswer(currentQuiz.id, e.target.value)}
                      placeholder="输入答案..."
                      className="w-full p-3 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] mb-4"
                    />
                  )}
                  {currentQuiz.type === 'short-answer' && (
                    <textarea
                      value={userAnswers[currentQuiz.id] || ''}
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
                <div className="card px-6 py-5 text-center">
                  <div className="text-3xl font-bold mb-2" style={{ color: quizScore.correct === quizScore.total ? 'var(--success)' : 'var(--warning)' }}>
                    {quizScore.correct}/{quizScore.total}
                  </div>
                  <p className="text-[var(--text-muted)] mb-4">
                    {quizScore.correct === quizScore.total ? '全部正确！' : `答对了 ${quizScore.correct} 题`}
                  </p>
                  <button onClick={handleResetQuiz} className="px-4 py-2 rounded-lg bg-[var(--accent)] text-white">重新答题</button>
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
