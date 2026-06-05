'use client';

import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="card px-6 py-8 text-center">
          <div className="text-3xl mb-3">⚠️</div>
          <h2 className="text-[15px] font-semibold text-[var(--text)] mb-2">组件渲染出错</h2>
          <p className="text-[13px] text-[var(--text-muted)] mb-4">
            {this.state.error?.message || '未知错误'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="btn btn-primary"
          >
            重试
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
