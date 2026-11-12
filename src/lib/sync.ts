import { createClient } from '@/lib/supabase/client';
import { MISTAKES_KEY, PROGRESS_KEY, onLocalDataChanged, resetProgressCache } from './storage';
import { mergeMistakes, mergeProgress } from './sync-merge';
import type { MistakeRecord, Progress } from '@/types';

/**
 * 本地优先的云同步。
 *
 * 设计取舍：页面里的 localStorage 调用全部保持同步，不改成异步。
 * 登录后做一次「拉取 + 合并 + 回写 + 上行」，之后本地每次写入只做去抖上行。
 * 合并规则在 sync-merge.ts，冲突策略因此可测。
 *
 * 依赖 Supabase 表 public.learning_state（见 supabase/migrations/）。
 * 表不存在时同步静默禁用，本地功能不受影响。
 */

type SyncKey = 'progress' | 'mistakes';

const TABLE = 'learning_state';
const STAMP_KEY = 'network-learning-sync-stamps';
const DEBOUNCE_MS = 1500;

let started = false;
let disabled = false;
const timers = new Map<SyncKey, ReturnType<typeof setTimeout>>();

function readStamps(): Partial<Record<SyncKey, string>> {
  if (typeof window === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(STAMP_KEY) ?? '{}') as Partial<Record<SyncKey, string>>;
  } catch {
    return {};
  }
}

function writeStamp(key: SyncKey, iso: string) {
  if (typeof window === 'undefined') return;
  const stamps = readStamps();
  stamps[key] = iso;
  localStorage.setItem(STAMP_KEY, JSON.stringify(stamps));
}

function readLocal<T>(key: SyncKey, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  const raw = localStorage.getItem(key === 'progress' ? PROGRESS_KEY : MISTAKES_KEY);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeLocal(key: SyncKey, value: unknown) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key === 'progress' ? PROGRESS_KEY : MISTAKES_KEY, JSON.stringify(value));
  // getProgress() 有内存缓存，外部写入后必须让它失效，否则页面读到的还是旧值
  if (key === 'progress') resetProgressCache();
}

function isMissingTable(error: { code?: string; message?: string } | null): boolean {
  if (!error) return false;
  return (
    error.code === '42P01' || // Postgres: undefined_table
    error.code === 'PGRST205' || // PostgREST: 表不在 schema cache 里
    /learning_state/i.test(error.message ?? '')
  );
}

function disableOnce(message: string) {
  if (disabled) return;
  disabled = true;
  console.warn(`[sync] 云同步已禁用：${message}。本地数据不受影响。`);
}

async function pullAndMerge(client: ReturnType<typeof createClient>, userId: string) {
  const { data, error } = await client
    .from(TABLE)
    .select('key, data, updated_at')
    .eq('user_id', userId);

  if (error) {
    if (isMissingTable(error)) disableOnce('服务端表 public.learning_state 不存在，请先执行迁移脚本');
    else console.warn('[sync] 拉取失败：', error.message);
    return;
  }

  const stamps = readStamps();

  for (const row of (data ?? []) as { key: SyncKey; data: unknown; updated_at: string }[]) {
    const key = row.key;
    if (key !== 'progress' && key !== 'mistakes') continue;

    if (key === 'progress') {
      const local = readLocal<Progress | null>('progress', null);
      const merged = local ? mergeProgress(local, row.data as Progress) : (row.data as Progress);
      writeLocal('progress', merged);
    } else {
      const local = readLocal<MistakeRecord[]>('mistakes', []);
      const merged = mergeMistakes(local, (row.data as MistakeRecord[]) ?? []);
      writeLocal('mistakes', merged);
    }

    // 合并结果以“较晚的时间”为准，避免下次上行被误判为旧数据
    writeStamp(key, row.updated_at > (stamps[key] ?? '') ? row.updated_at : (stamps[key] ?? row.updated_at));
  }
}

async function push(client: ReturnType<typeof createClient>, userId: string, key: SyncKey) {
  if (disabled) return;
  const payload = readLocal<unknown>(key, null);
  if (payload === null) return;

  const iso = new Date().toISOString();
  const { error } = await client.from(TABLE).upsert(
    { user_id: userId, key, data: payload, updated_at: iso },
    { onConflict: 'user_id,key' },
  );

  if (error) {
    if (isMissingTable(error)) disableOnce('服务端表 public.learning_state 不存在，请先执行迁移脚本');
    else console.warn(`[sync] 上行 ${key} 失败：`, error.message);
    return;
  }
  writeStamp(key, iso);
}

function schedulePush(client: ReturnType<typeof createClient>, userId: string, key: SyncKey) {
  if (disabled) return;
  const existing = timers.get(key);
  if (existing) clearTimeout(existing);
  timers.set(
    key,
    setTimeout(() => {
      timers.delete(key);
      void push(client, userId, key);
    }, DEBOUNCE_MS),
  );
}

/**
 * 启动同步：登录后拉取合并，之后监听本地写入做去抖上行。
 * 返回清理函数；重复调用只有第一次生效（React 严格模式下会挂载两次）。
 */
export function startSync(): () => void {
  if (typeof window === 'undefined' || started) return () => {};
  started = true;

  const client = createClient();
  let userId: string | null = null;

  const unsubscribeLocal = onLocalDataChanged((key) => {
    if (!userId) return;
    // 本地变更立刻打时间戳，供下次登录时判断谁更新
    writeStamp(key, new Date().toISOString());
    schedulePush(client, userId, key);
  });

  const { data: authListener } = client.auth.onAuthStateChange((event, session) => {
    userId = session?.user?.id ?? null;
    if (!userId) return;
    if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED') {
      // 只处理一次，避免 token 刷新时反复全量合并
      if (event === 'TOKEN_REFRESHED') return;
      void (async () => {
        await pullAndMerge(client, userId!);
        await push(client, userId!, 'progress');
        await push(client, userId!, 'mistakes');
      })();
    }
  });

  return () => {
    started = false;
    unsubscribeLocal();
    authListener.subscription.unsubscribe();
    for (const timer of timers.values()) clearTimeout(timer);
    timers.clear();
  };
}
