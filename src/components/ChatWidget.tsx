'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// SSE 流式读取（提取为共享逻辑）
async function readSSEStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  onDelta: (text: string) => void
) {
  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.startsWith('data: ')) continue;
      const data = line.slice(6).trim();
      if (data === '[DONE]') continue;
      try {
        const parsed = JSON.parse(data);
        if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
          onDelta(parsed.delta.text);
        }
      } catch { /* skip malformed JSON */ }
    }
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  // 用 ref 跟踪最新 messages，避免闭包过期
  const messagesRef = useRef<Message[]>([]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // 统一的发送逻辑
  const doSend = useCallback(async (text: string, context?: string) => {
    const userMsg: Message = { role: 'user', content: text };
    const currentMessages = messagesRef.current;
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const resp = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...currentMessages, userMsg].map(m => ({ role: m.role, content: m.content })),
          ...(context ? { context } : {}),
        }),
      });

      if (resp.status === 401) {
        setMessages(prev => [
          ...prev,
          { role: 'assistant', content: '请先登录后再使用 AI 助手。[点击登录](/login)' },
        ]);
        setLoading(false);
        return;
      }

      if (!resp.ok) throw new Error('请求失败');

      const reader = resp.body?.getReader();
      let assistantContent = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      if (reader) {
        await readSSEStream(reader, (delta) => {
          assistantContent += delta;
          setMessages(prev => {
            const updated = [...prev];
            updated[updated.length - 1] = { role: 'assistant', content: assistantContent };
            return updated;
          });
        });
      }
    } catch {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: '抱歉，AI 服务暂时不可用，请稍后再试。' },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  // 监听外部触发的 AI 解释请求
  useEffect(() => {
    const handler = (e: CustomEvent<{ message: string; context?: string }>) => {
      setOpen(true);
      const { message, context } = e.detail;
      if (context) {
        setInput('');
        doSend(message, context);
      } else {
        setInput(message);
      }
    };
    window.addEventListener('ai-explain' as string, handler as EventListener);
    return () => window.removeEventListener('ai-explain' as string, handler as EventListener);
  }, [doSend]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');
    await doSend(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* 悬浮按钮 */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="打开 AI 助手"
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 h-12 sm:h-14 rounded-full shadow-lg z-50 flex items-center gap-2 px-4 sm:px-5 transition-all hover:scale-105 group"
          style={{
            background: 'linear-gradient(135deg, var(--accent) 0%, #6366f1 100%)',
            boxShadow: '0 4px 24px rgba(99, 102, 241, 0.45)',
          }}
        >
          {/* 闪光动画 */}
          <span className="absolute inset-0 rounded-full animate-ping opacity-20"
            style={{ background: 'var(--accent)', animationDuration: '2s' }} />
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="relative shrink-0">
            <path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z" />
            <path d="M9.5 14.5 3 21" /><path d="M14.5 14.5 21 21" />
            <circle cx="12" cy="7" r="1.5" fill="white" stroke="none" />
          </svg>
          <span className="text-white text-[13px] font-semibold relative hidden sm:block">
            AI 助手
          </span>
        </button>
      )}

      {/* 聊天面板 */}
      {open && (
        <div
          role="dialog"
          aria-label="AI 助手对话"
          onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
          className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full h-full sm:w-[380px] sm:h-[520px] sm:rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden animate-in"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            animationDuration: '0.2s',
          }}
        >
          {/* 头部 */}
          <div
            className="flex items-center justify-between px-5 py-3.5 shrink-0"
            style={{
              background: 'linear-gradient(135deg, var(--accent) 0%, #6366f1 100%)',
            }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z" />
                  <path d="M9.5 14.5 3 21" /><path d="M14.5 14.5 21 21" />
                </svg>
              </div>
              <div>
                <div className="text-white font-semibold text-[14px]">达博理 AI 助手</div>
                <div className="text-white/60 text-[11px]">课程知识 · 智能问答</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="关闭 AI 助手"
              className="text-white/70 hover:text-white transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* 消息区 */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" aria-live="polite" aria-label="对话消息">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <div className="text-3xl mb-3">🤖</div>
                <p className="text-[13px] text-[var(--text-muted)] mb-1">你好！我是达博理 AI 助手</p>
                <p className="text-[12px] text-[var(--text-muted)]">可以问我课程相关的任何问题</p>
                <div className="mt-4 space-y-2">
                  {['TCP 三次握手是怎么回事？', '子网划分怎么计算？', 'OSPF 和 RIP 有什么区别？'].map(q => (
                    <button
                      key={q}
                      onClick={() => { setInput(q); }}
                      className="block w-full text-left px-3 py-2 rounded-lg text-[12px] transition-colors"
                      style={{
                        background: 'var(--bg-warm)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-light)',
                      }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-[13.5px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'rounded-br-md'
                      : 'rounded-bl-md'
                  }`}
                  style={{
                    background: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-warm)',
                    color: msg.role === 'user' ? 'white' : 'var(--text)',
                    border: msg.role === 'assistant' ? '1px solid var(--border-light)' : 'none',
                  }}
                >
                  {msg.role === 'assistant' ? (
                    <div className="chat-markdown">
                      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeSanitize]}>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {loading && messages[messages.length - 1]?.role !== 'assistant' && (
              <div className="flex justify-start">
                <div className="px-4 py-2.5 rounded-2xl rounded-bl-md" style={{ background: 'var(--bg-warm)', border: '1px solid var(--border-light)' }}>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-muted)', animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-muted)', animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: 'var(--text-muted)', animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* 输入区 */}
          <div className="px-4 pb-4 pt-2 shrink-0" style={{ borderTop: '1px solid var(--border-light)' }}>
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入问题..."
                rows={1}
                className="flex-1 px-4 py-2.5 rounded-xl text-[13.5px] focus:outline-none resize-none"
                style={{
                  border: '1.5px solid var(--border)',
                  background: 'var(--surface)',
                  maxHeight: '80px',
                }}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                aria-label="发送消息"
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-opacity disabled:opacity-40"
                style={{ background: 'var(--accent)' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-1.5 text-center">
              MiMo v2.5 · 基于课程知识库回答
            </p>
          </div>
        </div>
      )}
    </>
  );
}
