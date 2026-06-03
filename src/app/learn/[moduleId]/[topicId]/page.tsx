'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { getModuleById, getTopicById } from '@/data/courses';
import { getProgress, toggleTopicComplete, saveQuizScore, saveNote, getNote, saveMistake } from '@/lib/storage';
import { Module, Topic } from '@/types';
import ReactMarkdown from 'react-markdown';
import { OsiLayers, TcpIpLayers, NetworkTopology, Encapsulation, GlossaryCard, RoutingTable, VlanDiagram, STPTopology, RoutingProcess, EncryptionFlow, FirewallTypes, VPNTunnel, WirelessStandards, CellularNetwork, FiberOptic, SDNArchitecture, SNMPDiagram, FaultDiagnosis } from '@/components/diagrams';

const diagramComponents: Record<string, React.ComponentType> = {
  'osi-layers': OsiLayers,
  'tcpip-layers': TcpIpLayers,
  'network-topology': NetworkTopology,
  'encapsulation': Encapsulation,
  'routing-table': RoutingTable,
  'vlan-diagram': VlanDiagram,
  'stp-topology': STPTopology,
  'routing-process': RoutingProcess,
  'encryption-flow': EncryptionFlow,
  'firewall-types': FirewallTypes,
  'vpn-tunnel': VPNTunnel,
  'wireless-standards': WirelessStandards,
  'cellular-network': CellularNetwork,
  'fiber-optic': FiberOptic,
  'sdn-architecture': SDNArchitecture,
  'snmp-diagram': SNMPDiagram,
  'fault-diagnosis': FaultDiagnosis,
};

type TabType = 'content' | 'quiz' | 'notes';

function renderContentWithDiagrams(content: string) {
  const regex = /<(?:Diagram\s+type="([^"]+)"|Glossary\s+terms="([^"]*)")\s*\/>/g;
  const parts: { type: 'md' | 'diagram' | 'glossary'; value: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'md', value: content.slice(lastIndex, match.index) });
    }
    if (match[1]) {
      parts.push({ type: 'diagram', value: match[1] });
    } else if (match[2] !== undefined) {
      parts.push({ type: 'glossary', value: match[2] });
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < content.length) {
    parts.push({ type: 'md', value: content.slice(lastIndex) });
  }

  return parts.map((part, i) => {
    if (part.type === 'diagram') {
      const Component = diagramComponents[part.value];
      if (Component) {
        return (
          <div key={i} className="my-6 p-5 rounded-2xl" style={{ background: 'var(--bg-warm)', border: '1px solid var(--border)' }}>
            <Component />
          </div>
        );
      }
    }
    if (part.type === 'glossary') {
      try {
        const terms = JSON.parse(decodeURIComponent(part.value));
        return (
          <div key={i} className="my-6">
            <GlossaryCard terms={terms} />
          </div>
        );
      } catch {
        return null;
      }
    }
    return part.value.trim() ? <ReactMarkdown key={i}>{part.value}</ReactMarkdown> : null;
  });
}

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

      if (userAnswer === correctAnswer) {
        correct++;
      } else {
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
        <Link href="/learn" className="hover:text-[var(--accent)] transition-colors">知识库</Link>
        <span className="opacity-40">/</span>
        <Link href={`/learn/${moduleId}`} className="hover:text-[var(--accent)] transition-colors">{module.title}</Link>
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
        <div className="card px-8 py-8 animate-in">
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

          <div className="flex justify-end mt-6 pt-5" style={{ borderTop: '1px solid var(--border-light)' }}>
            <button onClick={() => setActiveTab('quiz')} className="btn btn-primary">
              开始练习 →
            </button>
          </div>
        </div>
      )}

      {/* 练习题 */}
      {activeTab === 'quiz' && (
        <div className="card px-8 py-8 animate-in">
          {topic.quizzes.length === 0 ? (
            <p className="text-center text-[var(--text-muted)] py-8">暂无练习题</p>
          ) : showResult ? (
            <div className="text-center">
              <div className="text-5xl mb-3">
                {quizScore.correct / quizScore.total >= 0.8 ? '🎉' : '📚'}
              </div>
              <h2 className="text-xl font-bold text-[var(--text)] mb-1">测验完成</h2>
              <p className="text-[var(--text-secondary)] mb-6">
                得分：<span className="font-bold text-[var(--accent)]">{quizScore.correct}/{quizScore.total}</span>
                <span className="text-[var(--text-muted)] ml-1">（{Math.round(quizScore.correct / quizScore.total * 100)}分）</span>
              </p>

              <div className="text-left space-y-3 mb-8">
                {topic.quizzes.map(quiz => {
                  const userAnswer = userAnswers[quiz.id];
                  const correctAnswer = Array.isArray(quiz.answer) ? quiz.answer.join(',') : quiz.answer;
                  const isCorrect = userAnswer === correctAnswer;

                  return (
                    <div key={quiz.id} className="rounded-xl px-5 py-4"
                      style={{ background: isCorrect ? 'var(--success-bg)' : 'var(--danger-bg)' }}>
                      <p className="font-medium text-[var(--text)] text-[14px]">{quiz.question}</p>
                      <p className="text-[13px] mt-1.5">
                        你的答案：<span style={{ color: isCorrect ? 'var(--success)' : 'var(--danger)' }}>{userAnswer || '未作答'}</span>
                      </p>
                      {!isCorrect && (
                        <p className="text-[13px]" style={{ color: 'var(--success)' }}>正确答案：{correctAnswer}</p>
                      )}
                      <p className="text-[12.5px] text-[var(--text-muted)] mt-1.5">{quiz.explanation}</p>
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
                          : userAnswers[topic.quizzes[i].id]
                          ? 'text-[var(--success)]'
                          : 'text-[var(--text-muted)]'
                      }`}
                      style={{
                        background: i === currentQuizIndex
                          ? 'var(--accent)'
                          : userAnswers[topic.quizzes[i].id]
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

                {currentQuiz.type === 'fill' && (
                  <input
                    type="text"
                    value={userAnswers[currentQuiz.id] || ''}
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
                    value={userAnswers[currentQuiz.id] || ''}
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
        <div className="card px-8 py-8 animate-in">
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
