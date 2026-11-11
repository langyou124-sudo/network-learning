-- 学习数据云同步：每个用户每类数据一行（progress / mistakes）
--
-- 为什么是整块 JSON 而不是逐字段建模：
--   现有代码全部是同步的 localStorage 调用，逐字段同步需要把每个页面改成异步；
--   整块存储 + 客户端合并（src/lib/sync-merge.ts）可以保持调用点不动。
--   后续要按课题查询时，再从 data 里拆列并回填。
--
-- 冲突策略：拉取时在客户端按字段合并（并集 / 较新者优先 / 取较大值），
-- 合并结果再写回本地并上行，不做服务端覆盖。

create table if not exists public.learning_state (
  user_id    uuid        not null references auth.users (id) on delete cascade,
  key        text        not null check (key in ('progress', 'mistakes')),
  data       jsonb       not null,
  -- 由客户端写入的变更时间；两台设备的时钟都参与比较，因此只用于“谁更新”的判断
  updated_at timestamptz not null default now(),
  primary key (user_id, key)
);

comment on table public.learning_state is '达博理学习数据（进度/错题），按用户+类别整块存储';

alter table public.learning_state enable row level security;

-- 只允许读写自己的行；service_role 会自动绕过 RLS，脚本无需额外策略
drop policy if exists "learning_state_select_own" on public.learning_state;
create policy "learning_state_select_own"
  on public.learning_state for select
  using (auth.uid() = user_id);

drop policy if exists "learning_state_insert_own" on public.learning_state;
create policy "learning_state_insert_own"
  on public.learning_state for insert
  with check (auth.uid() = user_id);

drop policy if exists "learning_state_update_own" on public.learning_state;
create policy "learning_state_update_own"
  on public.learning_state for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "learning_state_delete_own" on public.learning_state;
create policy "learning_state_delete_own"
  on public.learning_state for delete
  using (auth.uid() = user_id);
