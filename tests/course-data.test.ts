import { describe, it, expect } from 'vitest';
import { modules, getAllTopics, getModuleById, getTopicById } from '@/data/courses';

describe('Course Data Integrity', () => {
  it('should have modules defined', () => {
    expect(modules).toBeDefined();
    expect(Array.isArray(modules)).toBe(true);
    expect(modules.length).toBeGreaterThan(0);
  });

  it('each module should have required fields', () => {
    for (const mod of modules) {
      expect(mod.id).toBeDefined();
      expect(typeof mod.id).toBe('string');
      expect(mod.title).toBeDefined();
      expect(typeof mod.title).toBe('string');
      expect(mod.description).toBeDefined();
      expect(Array.isArray(mod.topics)).toBe(true);
    }
  });

  it('each topic should have required fields', () => {
    const allTopics = getAllTopics();
    expect(allTopics.length).toBeGreaterThan(0);
    
    for (const topic of allTopics) {
      expect(topic.id).toBeDefined();
      expect(typeof topic.id).toBe('string');
      expect(topic.moduleId).toBeDefined();
      expect(topic.title).toBeDefined();
      expect(topic.content).toBeDefined();
      expect(Array.isArray(topic.quizzes)).toBe(true);
      expect(Array.isArray(topic.references)).toBe(true);
    }
  });

  it('each quiz should have required fields', () => {
    const allTopics = getAllTopics();
    
    for (const topic of allTopics) {
      for (const quiz of topic.quizzes) {
        expect(quiz.id).toBeDefined();
        expect(typeof quiz.id).toBe('string');
        expect(['choice', 'fill', 'short-answer']).toContain(quiz.type);
        expect(quiz.question).toBeDefined();
        expect(quiz.answer).toBeDefined();
        expect(quiz.explanation).toBeDefined();
        
        if (quiz.type === 'choice') {
          expect(Array.isArray(quiz.options)).toBe(true);
          expect(quiz.options!.length).toBeGreaterThanOrEqual(2);
        }
      }
    }
  });

  it('getModuleById should return correct module', () => {
    const firstModule = modules[0];
    const found = getModuleById(firstModule.id);
    expect(found).toBeDefined();
    expect(found!.id).toBe(firstModule.id);
    expect(found!.title).toBe(firstModule.title);
  });

  it('getModuleById should return undefined for invalid id', () => {
    const found = getModuleById('non-existent-module');
    expect(found).toBeUndefined();
  });

  it('getTopicById should return correct topic', () => {
    const allTopics = getAllTopics();
    const firstTopic = allTopics[0];
    const found = getTopicById(firstTopic.id);
    expect(found).toBeDefined();
    expect(found!.id).toBe(firstTopic.id);
    expect(found!.title).toBe(firstTopic.title);
  });

  it('getTopicById should return undefined for invalid id', () => {
    const found = getTopicById('non-existent-topic');
    expect(found).toBeUndefined();
  });

  it('module IDs should be unique', () => {
    // 学科之间复用课题是允许的，但模块 id 必须唯一，否则路由与进度统计会串。
    const ids = modules.map(m => m.id);
    const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(duplicates).toEqual([]);
  });

  it('quiz IDs should be globally unique', () => {
    // 错题本按 quiz id 记录，重复 id 会让两道题的错题混在一起。
    const seen = new Map<string, string>(); // quizId -> topicId
    const duplicates: string[] = [];

    for (const topic of getAllTopics()) {
      for (const quiz of topic.quizzes) {
        const owner = seen.get(quiz.id);
        if (owner && owner !== topic.id) duplicates.push(`${quiz.id} (${owner} 与 ${topic.id})`);
        else seen.set(quiz.id, topic.id);
      }
    }

    expect(duplicates).toEqual([]);
  });

  it('choice quiz answer should be an in-range option letter', () => {
    // 答题界面存的是选项字母（A/B/C…），所以答案必须是落在 options 范围内的单个大写字母。
    // 写成选项全文或索引越界，构建不会报，但用户点对了也会判错。
    const broken: string[] = [];

    for (const topic of getAllTopics()) {
      for (const quiz of topic.quizzes) {
        if (quiz.type !== 'choice') continue;
        const answer = quiz.answer as unknown;
        const optionCount = quiz.options?.length ?? 0;
        const isLetter = typeof answer === 'string' && /^[A-Z]$/.test(answer);
        const inRange = isLetter && answer.charCodeAt(0) - 65 < optionCount;
        if (!inRange) {
          broken.push(`${topic.id}/${quiz.id}: answer=${JSON.stringify(answer)} options=${optionCount}`);
        }
      }
    }

    expect(broken).toEqual([]);
  });

  it('choice quiz options should be distinct', () => {
    const broken: string[] = [];

    for (const topic of getAllTopics()) {
      for (const quiz of topic.quizzes) {
        if (quiz.type !== 'choice' || !quiz.options) continue;
        const normalized = quiz.options.map(o => o.trim());
        if (new Set(normalized).size !== normalized.length) {
          broken.push(`${topic.id}/${quiz.id}: 选项重复`);
        }
      }
    }

    expect(broken).toEqual([]);
  });

  it('every quiz should have non-empty question, answer and explanation', () => {
    const broken: string[] = [];

    for (const topic of getAllTopics()) {
      for (const quiz of topic.quizzes) {
        const answerEmpty = Array.isArray(quiz.answer)
          ? quiz.answer.length === 0 ||
            quiz.answer.some(a => (Array.isArray(a) ? a.length === 0 || a.some(x => !x.trim()) : !String(a).trim()))
          : !String(quiz.answer ?? '').trim();
        if (!quiz.question?.trim()) broken.push(`${topic.id}/${quiz.id}: 题干为空`);
        if (answerEmpty) broken.push(`${topic.id}/${quiz.id}: 答案为空`);
        if (!quiz.explanation?.trim()) broken.push(`${topic.id}/${quiz.id}: 解析为空`);
      }
    }

    expect(broken).toEqual([]);
  });

  it('every topic should have at least one quiz and non-trivial content', () => {
    const thin: string[] = [];

    for (const topic of getAllTopics()) {
      if (topic.quizzes.length === 0) thin.push(`${topic.id}: 没有练习题`);
      if ((topic.content ?? '').length < 200) thin.push(`${topic.id}: 正文仅 ${(topic.content ?? '').length} 字`);
    }

    expect(thin).toEqual([]);
  });

  it('topic titles should be unique within a module', () => {
    const duplicates: string[] = [];

    for (const mod of modules) {
      const titles = mod.topics.map(t => t.title);
      for (const title of titles) {
        if (titles.indexOf(title) !== titles.lastIndexOf(title) && duplicates.every(d => !d.startsWith(`${mod.id}/`))) {
          duplicates.push(`${mod.id}/${title}`);
        }
      }
    }

    expect(duplicates).toEqual([]);
  });

  it('topic moduleId should reference valid module', () => {
    const allTopics = getAllTopics();
    const moduleIds = new Set(modules.map(m => m.id));
    
    for (const topic of allTopics) {
      expect(moduleIds.has(topic.moduleId)).toBe(true);
    }
  });
});
