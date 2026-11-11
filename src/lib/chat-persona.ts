import { networkModules } from '@/data/network';
import { marxismModules } from '@/data/marxism';
import { ruankaoModules } from '@/data/ruankao';
import { peExam303Modules } from '@/data/pe-exam-303';
import { peExam802Modules } from '@/data/pe-exam-802';
import type { Module } from '@/types';

/**
 * 聊天助手的人格与学科范围。
 *
 * 之前 systemPrompt 写死「只专注网络工程…超出范围礼貌拒绝」，
 * 但平台现在有 5 个学科，于是问马理论/考研题会被自己的提示词劝退。
 * 这里按学科注入范围，并把「不知道就说不知道」写进规则，避免硬拒绝或硬编。
 */

export const SUBJECT_IDS = ['network', 'marxism', 'ruankao', 'pe-exam-303', 'pe-exam-802'] as const;
export type SubjectId = (typeof SUBJECT_IDS)[number];

export function isSubjectId(value: unknown): value is SubjectId {
  return typeof value === 'string' && (SUBJECT_IDS as readonly string[]).includes(value);
}

interface SubjectProfile {
  label: string;
  focus: string;
  /** 判分/答题时的口径，比如软考看考纲、考研看给分点 */
  style: string;
}

const PROFILES: Record<SubjectId, SubjectProfile> = {
  network: {
    label: '网络工程',
    focus: 'OSI/TCP-IP、路由交换、网络安全、无线与运维',
    style: '术语用中文，protocol 名保留英文；配置类问题给出关键命令与判断依据。',
  },
  marxism: {
    label: '马克思主义理论',
    focus: '哲学、政治经济学、科学社会主义',
    style: '概念先定义再展开，区分「是什么/为什么/怎么用」，引用原理时给出处。',
  },
  ruankao: {
    label: '软考',
    focus: '网络工程师、软件设计师的考纲知识点',
    style: '按考纲口径作答，选择题说明排除理由，案例分析按给分点分条。',
  },
  'pe-exam-303': {
    label: '考研数学三',
    focus: '微积分、线性代数、概率论',
    style: '先给解题思路再给步骤，关键步骤写出依据；涉及计算时保留中间结果。',
  },
  'pe-exam-802': {
    label: '考研 802 经济学综合',
    focus: '政治经济学、微观经济学、宏观经济学',
    style: '图形题说明坐标轴与移动方向，论述题按「定义—机制—结论」组织。',
  },
};

const MODULES_BY_SUBJECT: Record<SubjectId, Module[]> = {
  network: networkModules,
  marxism: marxismModules,
  ruankao: ruankaoModules,
  'pe-exam-303': peExam303Modules,
  'pe-exam-802': peExam802Modules,
};

/** 某学科包含的模块 id 集合，用于给检索结果做学科过滤。 */
export function moduleIdsOfSubject(subject: SubjectId): Set<string> {
  return new Set(MODULES_BY_SUBJECT[subject].map((mod) => mod.id));
}

export interface PromptInput {
  subject?: string | null;
  /** 语义检索召回的知识库片段 */
  ragContext?: string;
  /** 前端带过来的当前课题上下文 */
  context?: string;
}

/** 构造 systemPrompt（纯函数，便于测试）。 */
export function buildSystemPrompt(input: PromptInput): string {
  const subject = isSubjectId(input.subject) ? input.subject : null;
  const profile = subject ? PROFILES[subject] : null;

  const lines: string[] = [
    '你是「达博理」学习平台的智能学习助手，面向备考与自学的学生。',
    subject && profile
      ? `当前学科：${profile.label}，覆盖 ${profile.focus}。`
      : '用户没有指定学科：按问题实际所属的学科作答，涉及平台未覆盖的内容时直接说明，不要硬套。',
    subject && profile ? profile.style : '回答要准确、具体，能给出例子就给例子。',
    '通用要求：',
    '- 先给结论或思路，再展开细节；不确定的地方明确说「不确定」，不要编造。',
    '- 超出平台学科范围的问题，简要说明边界，不要生硬拒绝，也不要假装精通。',
  ];

  if (input.ragContext) {
    lines.push('', '以下是知识库中与问题相关的片段，优先据此作答；与问题无关时忽略：', input.ragContext);
  }
  if (input.context) {
    lines.push('', '用户当前学习的内容：', input.context);
  }

  return lines.join('\n');
}

export interface KnowledgeChunk {
  module_id?: string | null;
  chunk_text: string;
  metadata?: { topicTitle?: string };
}

/**
 * 检索结果按学科过滤。
 * 库里没有 module_id 或过滤后为空时退回原始结果，避免因为元数据缺失把答案变空。
 */
export function pickRelevantChunks(chunks: KnowledgeChunk[], subject?: string | null): KnowledgeChunk[] {
  if (!chunks.length) return [];
  if (!isSubjectId(subject)) return chunks;
  const allowed = moduleIdsOfSubject(subject);
  const filtered = chunks.filter((chunk) => chunk.module_id && allowed.has(chunk.module_id));
  return filtered.length > 0 ? filtered : chunks;
}

/** 把检索结果拼成提示词片段。 */
export function formatRagContext(chunks: KnowledgeChunk[]): string {
  return chunks
    .map((chunk) => `【${chunk.metadata?.topicTitle ?? '相关知识'}】\n${chunk.chunk_text}`)
    .join('\n\n---\n\n');
}
