// 启动时校验必需的环境变量，缺失则快速失败
const requiredVars = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  MIMO_API_KEY: process.env.MIMO_API_KEY,
} as const;

const missing = Object.entries(requiredVars)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missing.length > 0 && process.env.NODE_ENV === 'production') {
  throw new Error(`缺少必需的环境变量: ${missing.join(', ')}`);
}

export const env = {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  MIMO_API_KEY: process.env.MIMO_API_KEY ?? '',
  ZHIPUAI_API_KEY: process.env.ZHIPUAI_API_KEY ?? '',
  UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL ?? '',
  UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN ?? '',
};
