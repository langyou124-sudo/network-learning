import type { NextConfig } from "next";

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://*.supabase.co https://*.upstash.io https://api.siliconflow.cn",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // 开发期允许通过 127.0.0.1 访问 dev 资源（默认只认 localhost）。
  // 否则用 127.0.0.1 打开页面时客户端资源和 HMR 会被拦，React 根本不水合，
  // 表现是「点登录没反应」——表单走了原生提交，地址变成 /login? 然后刷新。
  allowedDevOrigins: ['127.0.0.1'],

  // 启用压缩
  compress: true,
  
  // 图片优化配置
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30天
  },

  // 实验性功能
  experimental: {
    // 优化CSS
    optimizeCss: true,
    // 优化包导入
    optimizePackageImports: ['react-markdown', 'remark-gfm'],
  },

  // Turbopack配置（Next.js 16默认使用Turbopack）
  turbopack: {
    rules: {
      // Turbopack会自动处理代码分割
    },
  },

  // 安全头
  async headers() {
    return [
      { source: '/(.*)', headers: securityHeaders },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
    ];
  },
};

export default nextConfig;
