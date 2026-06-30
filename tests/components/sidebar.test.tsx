import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: React.PropsWithChildren<{ href: string }>) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

// Mock Supabase client
const mockGetUser = vi.fn().mockResolvedValue({ data: { user: null } });
const mockOnAuthStateChange = vi.fn().mockReturnValue({
  data: { subscription: { unsubscribe: vi.fn() } },
});

vi.mock('@/lib/supabase/client', () => ({
  createClient: () => ({
    auth: {
      getUser: mockGetUser,
      onAuthStateChange: mockOnAuthStateChange,
    },
  }),
}));

import Sidebar from '@/components/Sidebar';
import { usePathname } from 'next/navigation';

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetUser.mockResolvedValue({ data: { user: null } });
  });

  it('renders hamburger button', () => {
    render(<Sidebar />);
    const button = screen.getByRole('button', { name: /打开菜单/ });
    expect(button).toBeTruthy();
  });

  it('toggles sidebar open on button click', () => {
    render(<Sidebar />);
    const button = screen.getByRole('button', { name: /打开菜单/ });
    fireEvent.click(button);
    // After click, sidebar should be visible (translate-x-0)
    const nav = screen.getByRole('navigation', { name: '主导航' });
    expect(nav.className).toContain('translate-x-0');
  });

  it('renders all navigation items', () => {
    render(<Sidebar />);
    // Sidebar starts closed, open it
    fireEvent.click(screen.getByRole('button', { name: /打开菜单/ }));
    const expectedLabels = ['首页', '知识探索', '学习中心', '交互式图表', '练习题', '错题本', '学习进度', '设置'];
    expectedLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeTruthy();
    });
  });

  it('shows "未登录" when no user', () => {
    render(<Sidebar />);
    fireEvent.click(screen.getByRole('button', { name: /打开菜单/ }));
    expect(screen.getByText('未登录')).toBeTruthy();
  });

  it('shows user display name when logged in', async () => {
    mockGetUser.mockResolvedValue({
      data: {
        user: {
          email: 'test@example.com',
          user_metadata: { display_name: '测试用户' },
        },
      },
    });
    render(<Sidebar />);
    fireEvent.click(screen.getByRole('button', { name: /打开菜单/ }));
    // Wait for auth state to resolve
    await screen.findByText('测试用户');
    expect(screen.getByText('测试用户')).toBeTruthy();
  });

  it('closes sidebar on Escape key', () => {
    render(<Sidebar />);
    const aside = screen.getByRole('navigation', { name: '主导航' });
    fireEvent.keyDown(aside, { key: 'Escape' });
    expect(aside.className).toContain('-translate-x-full');
  });

  it('highlights active route', () => {
    vi.mocked(usePathname).mockReturnValue('/learn');
    render(<Sidebar />);
    fireEvent.click(screen.getByRole('button', { name: /打开菜单/ }));
    const learnLink = screen.getByText('学习中心').closest('a');
    expect(learnLink?.getAttribute('aria-current')).toBe('page');
  });
});
