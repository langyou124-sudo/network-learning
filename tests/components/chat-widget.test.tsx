import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// Mock Next.js
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/learn/network'),
}));

// Mock suggestions
vi.mock('@/lib/suggestions', () => ({
  getSuggestions: vi.fn(() => ['推荐问题1?', '推荐问题2?', '推荐问题3?']),
}));

// Mock react-markdown
vi.mock('react-markdown', () => ({
  default: ({ children }: { children: string }) => <div>{children}</div>,
}));
vi.mock('remark-gfm', () => ({ default: () => null }));
vi.mock('rehype-sanitize', () => ({ default: () => null }));

// Mock fetch
const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

import ChatWidget from '@/components/ChatWidget';

describe('ChatWidget', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockFetch.mockResolvedValue({
      ok: true,
      body: {
        getReader: () => ({
          read: vi.fn().mockResolvedValueOnce({ done: true, value: undefined }),
        }),
      },
    });
  });

  it('renders toggle button', () => {
    render(<ChatWidget />);
    const button = screen.getByRole('button', { name: /AI 助手/ });
    expect(button).toBeTruthy();
  });

  it('opens panel on toggle click', () => {
    render(<ChatWidget />);
    const button = screen.getByRole('button', { name: /AI 助手/ });
    fireEvent.click(button);
    expect(screen.getByText('达博理 AI 助手')).toBeTruthy();
  });

  it('displays suggestions when opened', () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByRole('button', { name: /AI 助手/ }));
    expect(screen.getByText('推荐问题1?')).toBeTruthy();
    expect(screen.getByText('推荐问题2?')).toBeTruthy();
    expect(screen.getByText('推荐问题3?')).toBeTruthy();
  });

  it('closes panel on close button click', () => {
    render(<ChatWidget />);
    // Open
    fireEvent.click(screen.getByRole('button', { name: /AI 助手/ }));
    expect(screen.getByText('达博理 AI 助手')).toBeTruthy();
    // Close
    const closeButton = screen.getByRole('button', { name: /关闭/ });
    fireEvent.click(closeButton);
    expect(screen.queryByText('达博理 AI 助手')).toBeNull();
  });

  it('allows typing in input', () => {
    render(<ChatWidget />);
    fireEvent.click(screen.getByRole('button', { name: /AI 助手/ }));
    const textarea = screen.getByPlaceholderText('输入问题...');
    fireEvent.change(textarea, { target: { value: '什么是TCP?' } });
    expect(textarea).toBeTruthy();
  });
});
