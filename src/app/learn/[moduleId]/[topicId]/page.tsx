'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { getModuleById, getTopicById } from '@/data/courses';
import { getProgress, completeTopic, saveQuizScore, saveNote, getNote, saveMistake } from '@/lib/storage';
import { Module, Topic, Quiz } from '@/types';
import ReactMarkdown from 'react-markdown';

type TabType = 'content' | 'quiz' | 'notes';

export default function TopicPage() {
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

  // 练习题状态
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showResult, setShowResult] = useState(false);
  const [quizScore, setQuizScore] = useState({ correct: 0, total: 0 });

  useEffect(() => {
    const mod = getModuleById(moduleId);
    const top = getTopicById(topicId);
    setModule(mod || null);
    setTopic(top || null);

    const progress = getProgress();
    setIsCompleted(progress.completedTopics.includes(topicId));
    setNote(getNote(topicId));
  }, [moduleId, topicId]);

  const handleComplete = () => {
    completeTopic(topicId);
    setIsCompleted(true);
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

      if (userAnswer === correctAnswer) {
        correct++;
      } else {
        // 记录错题
        saveMistake({
          quizId: quiz.id,
          topicId: topic.id,
          question: quiz.question,
          userAnswer: userAnswer || '未作答',
          correctAnswer: quiz.answer,
          date: new Date().toISOString().split('T')[0],
          reviewed: false,
        });
      }
    });

    setQuizScore({ correct, total: topic.quizzes.length });
    saveQuizScore(topicId, correct, topic.quizzes.length);
    setShowResult(true);
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowResult(false);
    setCurrentQuizIndex(0);
  };

  if (!topic || !module) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-500">课题不存在</p>
      </div>
    );
  }

  const currentQuiz = topic.quizzes[currentQuizIndex];

  return (
    <div className="max-w-4xl mx-auto">
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/learn" className="hover:text-blue-600">知识库</Link>
        <span>/</span>
        <Link href={`/learn/${moduleId}`} className="hover:text-blue-600">{module.title}</Link>
        <span>/</span>
        <span className="text-gray-900">{topic.title}</span>
      </div>

      {/* 标题 */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{topic.title}</h1>
        <button
          onClick={handleComplete}
          disabled={isCompleted}
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            isCompleted
              ? 'bg-green-100 text-green-700 cursor-default'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isCompleted ? '✓ 已完成' : '标记完成'}
        </button>
      </div>

      {/* Tab 切换 */}
      <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'content'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📖 知识讲解
        </button>
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'quiz'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          ✏️ 练习题 ({topic.quizzes.length})
        </button>
        <button
          onClick={() => setActiveTab('notes')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'notes'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          📝 笔记
        </button>
      </div>

      {/* 内容区域 */}
      {activeTab === 'content' && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <div className="prose prose-blue max-w-none">
            <ReactMarkdown>{topic.content}</ReactMarkdown>
          </div>

          {/* 参考资料 */}
          {topic.references.length > 0 && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-semibold text-gray-500 mb-2">参考资料</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {topic.references.map((ref, i) => (
                  <li key={i}>• {ref}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button
              onClick={() => setActiveTab('quiz')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              开始练习 →
            </button>
          </div>
        </div>
      )}

      {activeTab === 'quiz' && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          {topic.quizzes.length === 0 ? (
            <p className="text-center text-gray-500">暂无练习题</p>
          ) : showResult ? (
            /* 测验结果 */
            <div className="text-center">
              <div className="text-6xl mb-4">
                {quizScore.correct / quizScore.total >= 0.8 ? '🎉' : '📚'}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">测验完成！</h2>
              <p className="text-lg text-gray-600 mb-6">
                得分：<span className="font-bold text-blue-600">{quizScore.correct}/{quizScore.total}</span>
                （{Math.round(quizScore.correct / quizScore.total * 100)}分）
              </p>

              {/* 答案回顾 */}
              <div className="text-left space-y-4 mb-8">
                {topic.quizzes.map(quiz => {
                  const userAnswer = userAnswers[quiz.id];
                  const correctAnswer = Array.isArray(quiz.answer) ? quiz.answer.join(',') : quiz.answer;
                  const isCorrect = userAnswer === correctAnswer;

                  return (
                    <div key={quiz.id} className={`p-4 rounded-lg ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                      <p className="font-medium text-gray-900">{quiz.question}</p>
                      <p className="text-sm mt-1">
                        你的答案：<span className={isCorrect ? 'text-green-600' : 'text-red-600'}>{userAnswer || '未作答'}</span>
                      </p>
                      {!isCorrect && (
                        <p className="text-sm text-green-600">正确答案：{correctAnswer}</p>
                      )}
                      <p className="text-sm text-gray-500 mt-1">{quiz.explanation}</p>
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={handleResetQuiz}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  重新测验
                </button>
                <Link
                  href="/mistakes"
                  className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                >
                  查看错题本
                </Link>
              </div>
            </div>
          ) : (
            /* 答题界面 */
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  第 {currentQuizIndex + 1}/{topic.quizzes.length} 题
                </h2>
                <div className="flex gap-2">
                  {topic.quizzes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentQuizIndex(i)}
                      className={`w-8 h-8 rounded-full text-sm ${
                        i === currentQuizIndex
                          ? 'bg-blue-600 text-white'
                          : userAnswers[topic.quizzes[i].id]
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <p className="text-lg text-gray-900 mb-4">{currentQuiz.question}</p>

                {currentQuiz.type === 'choice' && currentQuiz.options && (
                  <div className="space-y-2">
                    {currentQuiz.options.map((option, i) => {
                      const optionLabel = String.fromCharCode(65 + i); // A, B, C, D
                      return (
                        <label
                          key={i}
                          className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition-colors ${
                            userAnswers[currentQuiz.id] === optionLabel
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={currentQuiz.id}
                            value={optionLabel}
                            checked={userAnswers[currentQuiz.id] === optionLabel}
                            onChange={() => handleQuizAnswer(currentQuiz.id, optionLabel)}
                            className="text-blue-600"
                          />
                          <span className="font-medium text-gray-700">{optionLabel}.</span>
                          <span className="text-gray-900">{option}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {currentQuiz.type === 'fill' && (
                  <input
                    type="text"
                    value={userAnswers[currentQuiz.id] || ''}
                    onChange={(e) => handleQuizAnswer(currentQuiz.id, e.target.value)}
                    placeholder="请输入答案"
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                )}

                {currentQuiz.type === 'short-answer' && (
                  <textarea
                    value={userAnswers[currentQuiz.id] || ''}
                    onChange={(e) => handleQuizAnswer(currentQuiz.id, e.target.value)}
                    placeholder="请输入你的答案"
                    rows={4}
                    className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                )}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setCurrentQuizIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuizIndex === 0}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  上一题
                </button>

                {currentQuizIndex < topic.quizzes.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuizIndex(prev => prev + 1)}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    下一题
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    提交答案
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">学习笔记</h2>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="在这里记录你的学习笔记..."
            rows={12}
            className="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="flex justify-end mt-4">
            <button
              onClick={handleSaveNote}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              保存笔记
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
