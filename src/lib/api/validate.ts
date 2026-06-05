// API 输入校验工具

import { NextResponse } from 'next/server';

export function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

// 校验聊天请求
export function validateChatBody(body: unknown): {
  ok: boolean;
  error?: string;
  messages?: { role: string; content: string }[];
  context?: string;
} {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: '请求体格式错误' };
  }

  const { messages, context } = body as Record<string, unknown>;

  // 校验 messages
  if (!Array.isArray(messages)) {
    return { ok: false, error: 'messages 必须是数组' };
  }

  if (messages.length === 0) {
    return { ok: false, error: 'messages 不能为空' };
  }

  if (messages.length > 50) {
    return { ok: false, error: '对话轮数不能超过 50 轮' };
  }

  for (const msg of messages) {
    if (!msg || typeof msg !== 'object') {
      return { ok: false, error: '消息格式错误' };
    }
    if (!['user', 'assistant'].includes(msg.role)) {
      return { ok: false, error: '消息角色必须是 user 或 assistant' };
    }
    if (typeof msg.content !== 'string') {
      return { ok: false, error: '消息内容必须是字符串' };
    }
    if (msg.content.length > 5000) {
      return { ok: false, error: '单条消息不能超过 5000 字' };
    }
  }

  // 校验 context（可选）
  if (context !== undefined && context !== null) {
    if (typeof context !== 'string') {
      return { ok: false, error: 'context 必须是字符串' };
    }
    if (context.length > 10000) {
      return { ok: false, error: 'context 不能超过 10000 字' };
    }
  }

  return {
    ok: true,
    messages: messages as { role: string; content: string }[],
    context: context as string | undefined,
  };
}

// 校验搜索请求
export function validateSearchParams(params: URLSearchParams): {
  ok: boolean;
  error?: string;
  query?: string;
  limit?: number;
  moduleId?: string;
} {
  const query = params.get('q');
  const limitStr = params.get('limit') || '5';
  const moduleId = params.get('module') || undefined;

  if (!query || query.trim().length === 0) {
    return { ok: false, error: '缺少搜索关键词' };
  }

  if (query.length > 500) {
    return { ok: false, error: '搜索关键词不能超过 500 字' };
  }

  const limit = parseInt(limitStr);
  if (isNaN(limit) || limit < 1) {
    return { ok: false, error: 'limit 必须是正整数' };
  }

  // 强制上限 20
  const cappedLimit = Math.min(limit, 20);

  return { ok: true, query: query.trim(), limit: cappedLimit, moduleId };
}
