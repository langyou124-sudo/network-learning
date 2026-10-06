import { describe, it, expect } from 'vitest';
import {
  normalizeAnswer,
  blankCount,
  parseAnswerSpec,
  getGradingMode,
  isMultiBlank,
  isSelfAssess,
  isObjective,
  gradeAnswer,
  renderAnswer,
  renderUserAnswer,
} from '@/lib/quiz-grading';
import type { Quiz } from '@/types';

const q = (partial: Partial<Quiz>): Quiz => ({
  id: 'q1',
  type: 'fill',
  question: '______ 是马克思主义的精髓。',
  options: undefined,
  answer: '实事求是',
  explanation: '',
  ...partial,
});

describe('normalizeAnswer', () => {
  it('去除首尾空白并小写', () => {
    expect(normalizeAnswer('  MAC  ')).toBe('mac');
  });
  it('全角字母数字转半角', () => {
    expect(normalizeAnswer('ＭＡＣ１２３')).toBe('mac123');
  });
  it('Unicode 减号统一为 ASCII 减号', () => {
    expect(normalizeAnswer('fe80−::/10')).toBe('fe80-::/10');
  });
  it('中文逗号统一为英文逗号', () => {
    expect(normalizeAnswer('4，12')).toBe('4,12');
  });
  it('折叠中间空白', () => {
    expect(normalizeAnswer('A  \t B')).toBe('a b');
  });
  it('全角空格处理', () => {
    expect(normalizeAnswer('A　B')).toBe('a b');
  });
});

describe('blankCount', () => {
  it('数标准下划线空格', () => {
    expect(blankCount(q({ question: '______ 是甲，______ 是乙。' }))).toBe(2);
    expect(blankCount(q({ question: '______ 是甲。' }))).toBe(1);
    expect(blankCount(q({ question: '______是甲，____是乙，____是丙。' }))).toBe(3);
  });
  it('题干无下划线返回 0', () => {
    expect(blankCount(q({ question: '把下式求导' }))).toBe(0);
  });
});

describe('parseAnswerSpec — 覆盖真实数据的四种形态', () => {
  it('单空单答案', () => {
    const specs = parseAnswerSpec(q({ answer: '实践' }));
    expect(specs).toHaveLength(1);
    expect(specs[0].variants).toEqual(['实践']);
  });

  it('单空多变体（任一命中）', () => {
    const specs = parseAnswerSpec(
      q({ question: 'Wi-Fi 基础结构模式中，站点通过 ______ 通信。', answer: ['AP', '接入点'] })
    );
    expect(specs).toHaveLength(1);
    expect(specs[0].variants).toHaveLength(2);
  });

  it('单空多变体含大小写差异', () => {
    const specs = parseAnswerSpec(
      q({ question: 'IPv6 的 ______ 为实现即插即用提供机制。', answer: ['IPsec', 'ipsec'] })
    );
    expect(specs).toHaveLength(1);
  });

  it('多空竖线打包 "具体|抽象"', () => {
    const specs = parseAnswerSpec(
      q({ question: '______ 创造使用价值，______ 形成价值。', answer: '具体|抽象' })
    );
    expect(specs).toHaveLength(2);
    expect(specs[0].variants).toEqual(['具体']);
    expect(specs[1].variants).toEqual(['抽象']);
  });

  it('多空数组 ["剩余产品","私有制"]', () => {
    const specs = parseAnswerSpec(
      q({ question: '阶级产生的两个条件是 ______ 和 ______。', answer: ['剩余产品', '私有制'] })
    );
    expect(specs).toHaveLength(2);
    expect(specs[1].variants).toEqual(['私有制']);
  });

  it('多空逗号打包 "4, 12"', () => {
    const specs = parseAnswerSpec(
      q({
        question: '802.1Q 在以太网帧中插入 ______ 字节的 VLAN 标签，VLAN ID 占 ______ 位。',
        answer: ['4, 12'],
      })
    );
    expect(specs).toHaveLength(2);
    expect(specs[0].variants).toEqual(['4']);
    expect(specs[1].variants).toEqual(['12']);
  });

  it('数组长度与空格数不符 → 视为单空变体（宽容）', () => {
    const specs = parseAnswerSpec(
      q({
        question: '路由器通告消息是 ______，类型为 ______。',
        answer: ['Router Advertisement', 'RA', '路由器通告'],
      })
    );
    expect(specs).toHaveLength(1);
    expect(specs[0].variants).toHaveLength(3);
  });

  it('数组仅 1 项 → 单空变体', () => {
    const specs = parseAnswerSpec(
      q({ question: '滑动窗口机制为 ______。', answer: ['拥塞避免'] })
    );
    expect(specs).toHaveLength(1);
    expect(specs[0].variants).toEqual(['拥塞避免']);
  });

  it('答案里的竖线不是分隔符（数学绝对值 1/|E|）', () => {
    const specs = parseAnswerSpec(
      q({
        question: '勒纳指数 (P−MC)/P = ______，度量市场势力。',
        answer: '1/|E|',
      })
    );
    expect(specs).toHaveLength(1);
    expect(specs[0].variants).toEqual([normalizeAnswer('1/|E|')]);
    expect(gradeAnswer(q({ question: '勒纳指数 = ______。', answer: '1/|E|' }), '1/|E|').correct).toBe(true);
  });

  it('嵌套数组：逐空 + 每空多变体', () => {
    const specs = parseAnswerSpec(
      q({
        question: '路由器消息类型是____，类型号为____。',
        answer: [['Router Advertisement', 'RA', '路由器通告'], ['134']],
      })
    );
    expect(specs).toHaveLength(2);
    expect(specs[0].variants).toEqual(['router advertisement', 'ra', '路由器通告']);
    expect(specs[1].variants).toEqual(['134']);
    const quiz = q({
      question: '路由器消息类型是____，类型号为____。',
      answer: [['Router Advertisement', 'RA', '路由器通告'], ['134']],
    });
    expect(gradeAnswer(quiz, ['路由器通告', '134']).correct).toBe(true);
    expect(gradeAnswer(quiz, ['RA', '135']).correct).toBe(false);
  });

  it('中文分号打包的多空 "二；无穷"', () => {
    const specs = parseAnswerSpec(
      q({ question: 'f(x)=1/x 在 x=0 处是第 ______ 类间断点中的 ______ 间断点', answer: '二；无穷' })
    );
    expect(specs).toHaveLength(2);
    expect(gradeAnswer(
      q({ question: '第 ______ 类的 ______ 间断点', answer: '二；无穷' }),
      ['二', '无穷']
    ).correct).toBe(true);
  });
});

describe('getGradingMode / isSelfAssess / isObjective', () => {
  it('short-answer 一律自评', () => {
    const quiz = q({ type: 'short-answer', answer: ['要点1', '要点2'] });
    expect(getGradingMode(quiz)).toBe('self-assess');
    expect(isSelfAssess(quiz)).toBe(true);
    expect(isObjective(quiz)).toBe(false);
  });
  it('choice 模式', () => {
    expect(getGradingMode(q({ type: 'choice', answer: 'A', options: ['a', 'b'] }))).toBe('choice');
  });
  it('多空 → per-blank', () => {
    const quiz = q({ question: '__ 与 __ 是二因素。', answer: '使用价值|价值' });
    expect(getGradingMode(quiz)).toBe('per-blank');
    expect(isMultiBlank(quiz)).toBe(true);
    expect(isObjective(quiz)).toBe(true);
  });
});

describe('gradeAnswer — 选择题', () => {
  const quiz = q({
    id: 'c1',
    type: 'choice',
    question: '商品的本质因素是（）',
    options: ['使用价值', '价值', '交换价值', '价格'],
    answer: 'B',
    explanation: '价值是本质因素。',
  });

  it('选对字母判对', () => {
    expect(gradeAnswer(quiz, 'B').correct).toBe(true);
  });
  it('选错字母判错', () => {
    expect(gradeAnswer(quiz, 'A').correct).toBe(false);
  });
  it('大小写不敏感', () => {
    expect(gradeAnswer(quiz, 'b').correct).toBe(true);
  });
  it('兼容存选项原文的旧 UI（value=opt）', () => {
    expect(gradeAnswer(quiz, '价值').correct).toBe(true);
    expect(gradeAnswer(quiz, '使用价值').correct).toBe(false);
  });
  it('兼容 answer 存选项原文的不规范数据', () => {
    const bad = q({ type: 'choice', options: ['A项', 'B项'], answer: 'B项' });
    expect(gradeAnswer(bad, 'B').correct).toBe(true);
    expect(gradeAnswer(bad, 'A').correct).toBe(false);
  });
  it('displayAnswer 显示答案内容', () => {
    expect(gradeAnswer(quiz, 'B').displayAnswer).toContain('B');
  });
});

describe('gradeAnswer — 单空填空', () => {
  it('精确匹配', () => {
    expect(gradeAnswer(q({ answer: '实事求是' }), '实事求是').correct).toBe(true);
  });
  it('大小写不敏感', () => {
    expect(gradeAnswer(q({ answer: 'SLAAC' }), 'slaac').correct).toBe(true);
  });
  it('全半角容错', () => {
    expect(gradeAnswer(q({ answer: 'MAC' }), 'ＭＡＣ').correct).toBe(true);
  });
  it('多变体任一命中即对', () => {
    const quiz = q({ question: '站点通过 __ 通信。', answer: ['AP', '接入点'] });
    expect(gradeAnswer(quiz, '接入点').correct).toBe(true);
    expect(gradeAnswer(quiz, 'ap').correct).toBe(true);
    expect(gradeAnswer(quiz, '交换机').correct).toBe(false);
  });
  it('含等式前后缀容错（"25" 匹配 "X=25"）', () => {
    expect(gradeAnswer(q({ answer: '52.56' }), '52.6').correct).toBe(false);
    expect(gradeAnswer(q({ answer: ['52.6', '53', '52.56'] }), '53').correct).toBe(true);
    expect(gradeAnswer(q({ answer: 'X=25' }), '25').correct).toBe(true);
    expect(gradeAnswer(q({ answer: '100000' }), '100000小时').correct).toBe(true);
  });
  it('中文单位写法靠变体覆盖，不做跨单位换算', () => {
    const quiz = q({ answer: ['100000', '10万'] });
    expect(gradeAnswer(quiz, '10万').correct).toBe(true);
    expect(gradeAnswer(quiz, '100000').correct).toBe(true);
    // 不在变体列表里的写法不应被误判为对
    expect(gradeAnswer(q({ answer: '100000' }), '10万').correct).toBe(false);
  });
  it('空答案判错', () => {
    expect(gradeAnswer(q({ answer: '甲' }), '').correct).toBe(false);
    expect(gradeAnswer(q({ answer: '甲' }), undefined as unknown as string).correct).toBe(false);
  });
});

describe('gradeAnswer — 多空填空', () => {
  const quiz = q({
    question: '______ 创造使用价值，______ 形成价值。',
    answer: '具体|抽象',
  });

  it('全部答对判对', () => {
    const r = gradeAnswer(quiz, ['具体', '抽象']);
    expect(r.correct).toBe(true);
    expect(r.blankResults).toEqual([true, true]);
  });
  it('部分答错判错并标记逐空', () => {
    const r = gradeAnswer(quiz, ['具体', '错误']);
    expect(r.correct).toBe(false);
    expect(r.blankResults).toEqual([true, false]);
  });
  it('多空数组形态逐空比对', () => {
    const q2 = q({ question: '条件是 __ 和 __。', answer: ['剩余产品', '私有制'] });
    expect(gradeAnswer(q2, ['剩余产品', '私有制']).correct).toBe(true);
    expect(gradeAnswer(q2, ['私有制', '剩余产品']).correct).toBe(false);
  });
  it('逗号打包形态逐空比对', () => {
    const q2 = q({
      question: '插入 __ 字节标签，ID 占 __ 位。',
      answer: ['4, 12'],
    });
    expect(gradeAnswer(q2, ['4', '12']).correct).toBe(true);
    expect(gradeAnswer(q2, ['4', '16']).correct).toBe(false);
  });
  it('空白忽略：用户答案多余空白仍判对', () => {
    expect(gradeAnswer(quiz, ['  具体 ', '抽象']).correct).toBe(true);
  });
});

describe('gradeAnswer — 简答（自评）', () => {
  const quiz = q({
    type: 'short-answer',
    question: '简述商品二因素的关系。',
    answer: ['要点一', '要点二'],
    explanation: '见解析',
  });

  it('不自动判分', () => {
    const r = gradeAnswer(quiz, '随便写的答案');
    expect(r.autoGradable).toBe(false);
    expect(r.correct).toBe(false);
  });
  it('displayAnswer 给出参考答案', () => {
    expect(gradeAnswer(quiz, '').displayAnswer).toContain('要点一');
  });
});

describe('renderAnswer', () => {
  it('数组用斜杠连接', () => {
    expect(renderAnswer(q({ answer: ['A', 'B'] }))).toBe('A / B');
  });
  it('字符串原样返回', () => {
    expect(renderAnswer(q({ answer: 'x' }))).toBe('x');
  });
  it('选择题显示选项文本（C. 交换价值）', () => {
    const quiz = q({
      type: 'choice',
      options: ['使用价值', '价值', '交换价值'],
      answer: 'C',
    });
    expect(renderAnswer(quiz)).toBe('C. 交换价值');
    expect(renderUserAnswer(quiz, 'A')).toBe('A. 使用价值');
  });
  it('选择题未作答显示"未作答"', () => {
    const quiz = q({ type: 'choice', options: ['x', 'y'], answer: 'A' });
    expect(renderUserAnswer(quiz, '')).toBe('未作答');
    expect(renderUserAnswer(quiz, undefined)).toBe('未作答');
    expect(renderUserAnswer(quiz, [])).toBe('未作答');
  });
});
