import { Topic } from '@/types';

// Module 1: 导论 - 政治经济学的研究对象
const topic_01_01: Topic = {
  id: 'pe-01-01',
  moduleId: 'pe-exam-802-political-economy',
  title: '政治经济学的研究对象',
  description: '政治经济学的定义、研究对象、研究方法及其与西方经济学的区别',
  content: `# 政治经济学的研究对象

<Glossary terms="%5B%7B%22term%22%3A%22%E6%94%BF%E6%B2%BB%E7%BB%8F%E6%B5%8E%E5%AD%A6%22%2C%22english%22%3A%22Political%20Economy%22%2C%22definition%22%3A%22%E7%A0%94%E7%A9%B6%E7%A4%BE%E4%BC%9A%E7%94%9F%E4%BA%A7%E5%85%B3%E7%B3%BB%E5%8F%8A%E5%85%B6%E5%8F%91%E5%B1%95%E8%A7%84%E5%BE%8B%E7%9A%84%E7%A7%91%E5%AD%A6%22%7D%2C%7B%22term%22%3A%22%E7%94%9F%E4%BA%A7%E5%85%B3%E7%B3%BB%22%2C%22english%22%3A%22Relations%20of%20Production%22%2C%22definition%22%3A%22%E4%BA%BA%E4%BB%AC%E5%9C%A8%E7%89%A9%E8%B4%A8%E8%B5%84%E6%96%99%E7%94%9F%E4%BA%A7%E4%B8%AD%E7%BB%93%E6%88%90%E7%9A%84%E7%A4%BE%E4%BC%9A%E5%85%B3%E7%B3%BB%EF%BC%8C%E5%8C%85%E6%8B%AC%E6%89%80%E6%9C%89%E5%88%B6%E3%80%81%E4%BA%BA%E4%B8%8E%E4%BA%BA%E5%85%B3%E7%B3%BB%E3%80%81%E5%88%86%E9%85%8D%E5%85%B3%E7%B3%BB%22%7D%2C%7B%22term%22%3A%22%E7%94%9F%E4%BA%A7%E5%8A%9B%22%2C%22english%22%3A%22Productive%20Forces%22%2C%22definition%22%3A%22%E4%BA%BA%E7%B1%BB%E6%94%B9%E9%80%A0%E8%87%AA%E7%84%B6%E7%9A%84%E8%83%BD%E5%8A%9B%EF%BC%8C%E5%8C%85%E6%8B%AC%E5%8A%B3%E5%8A%A8%E8%80%85%E3%80%81%E5%8A%B3%E5%8A%A8%E8%B5%84%E6%96%99%E5%92%8C%E5%8A%B3%E5%8A%A8%E5%AF%B9%E8%B1%A1%22%7D%2C%7B%22term%22%3A%22%E7%BB%8F%E6%B5%8E%E5%9F%BA%E7%A1%80%22%2C%22english%22%3A%22Economic%20Base%22%2C%22definition%22%3A%22%E5%8D%A0%E7%BB%9F%E6%B2%BB%E5%9C%B0%E4%BD%8D%E7%9A%84%E7%94%9F%E4%BA%A7%E5%85%B3%E7%B3%BB%E7%9A%84%E6%80%BB%E5%92%8C%EF%BC%8C%E5%86%B3%E5%AE%9A%E4%B8%8A%E5%B1%82%E5%BB%BA%E7%AD%91%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★ 基础概念，为后续理论铺垫

## 核心知识点

政治经济学的研究对象是**社会生产关系**。生产关系包括三个方面：生产资料所有制（基础）、人与人的关系、分配关系。

研究方法是**唯物辩证法**，具体包括矛盾分析法、抽象法、历史与逻辑统一。

与西方经济学的根本区别：政治经济学研究**生产关系**（制度问题），西方经济学研究**资源配置**（效率问题）。

## 练习题

**1. 简答题**：政治经济学的研究对象是什么？

**2. 论述题**：试析政治经济学与西方经济学的根本区别。

## 参考资料

《政治经济学教程》（宋涛）第1章`,
  quizzes: [
    { id: 'pe-q-01-01a', type: 'short-answer', question: '政治经济学的研究对象是什么？', answer: '社会生产关系，包括生产资料所有制、人与人的关系、分配关系三个方面。', explanation: '生产关系是政治经济学的核心研究对象。' },
    { id: 'pe-q-01-01b', type: 'choice', question: '政治经济学的研究对象是（）', options: ['生产力', '生产关系', '上层建筑', '意识形态'], answer: '生产关系', explanation: '政治经济学研究社会生产关系及其发展规律。' },
  ],
  references: ['《政治经济学教程》（宋涛）第1章'],
};

// Module 2: 劳动价值论 - 商品与价值
const topic_02_01: Topic = {
  id: 'pe-02-01',
  moduleId: 'pe-exam-802-political-economy',
  title: '商品与价值',
  description: '商品二因素、劳动二重性、价值量的决定、商品经济基本矛盾',
  content: `# 商品与价值

<Glossary terms="%5B%7B%22term%22%3A%22%E5%95%86%E5%93%81%22%2C%22english%22%3A%22Commodity%22%2C%22definition%22%3A%22%E7%94%A8%E4%BA%8E%E4%BA%A4%E6%8D%A2%E7%9A%84%E5%8A%B3%E5%8A%A8%E4%BA%A7%E5%93%81%EF%BC%8C%E5%85%B7%E6%9C%89%E4%BD%BF%E7%94%A8%E4%BB%B7%E5%80%BC%E5%92%8C%E4%BB%B7%E5%80%BC%22%7D%2C%7B%22term%22%3A%22%E4%BD%BF%E7%94%A8%E4%BB%B7%E5%80%BC%22%2C%22english%22%3A%22Use%20Value%22%2C%22definition%22%3A%22%E7%89%A9%E5%93%81%E8%83%BD%E6%BB%A1%E8%B6%B3%E4%BA%BA%E4%BB%AC%E6%9F%90%E7%A7%8D%E9%9C%80%E8%A6%81%E7%9A%84%E6%95%88%E7%94%A8%22%7D%2C%7B%22term%22%3A%22%E4%BB%B7%E5%80%BC%22%2C%22english%22%3A%22Value%22%2C%22definition%22%3A%22%E5%87%9D%E7%BB%93%E5%9C%A8%E5%95%86%E5%93%81%E4%B8%AD%E7%9A%84%E6%97%A0%E5%B7%AE%E5%88%AB%E7%9A%84%E4%BA%BA%E7%B1%BB%E5%8A%B3%E5%8A%A8%22%7D%2C%7B%22term%22%3A%22%E5%85%B7%E4%BD%93%E5%8A%B3%E5%8A%A8%22%2C%22english%22%3A%22Concrete%20Labor%22%2C%22definition%22%3A%22%E5%9C%A8%E7%89%B9%E5%AE%9A%E5%BD%A2%E5%BC%8F%E4%B8%8B%E8%BF%9B%E8%A1%8C%E7%9A%84%E5%8A%B3%E5%8A%A8%EF%BC%8C%E5%88%9B%E9%80%A0%E4%BD%BF%E7%94%A8%E4%BB%B7%E5%80%BC%22%7D%2C%7B%22term%22%3A%22%E6%8A%BD%E8%B1%A1%E5%8A%B3%E5%8A%A8%22%2C%22english%22%3A%22Abstract%20Labor%22%2C%22definition%22%3A%22%E6%97%A0%E5%B7%AE%E5%88%AB%E7%9A%84%E4%BA%BA%E7%B1%BB%E5%8A%B3%E5%8A%A8%EF%BC%8C%E5%88%9B%E9%80%A0%E4%BB%B7%E5%80%BC%22%7D%2C%7B%22term%22%3A%22%E7%A4%BE%E4%BC%9A%E5%BF%85%E8%A6%81%E5%8A%B3%E5%8A%A8%E6%97%B6%E9%97%B4%22%2C%22english%22%3A%22Socially%20Necessary%20Labor%20Time%22%2C%22definition%22%3A%22%E7%A4%BE%E4%BC%9A%E5%B9%B3%E5%9D%87%E6%9D%A1%E4%BB%B6%E4%B8%8B%E7%94%9F%E4%BA%A7%E6%9F%90%E7%A7%8D%E5%95%86%E5%93%81%E6%89%80%E9%9C%80%E7%9A%84%E5%8A%B3%E5%8A%A8%E6%97%B6%E9%97%B4%22%7D%5D" />

## 考情分析

- **题型**：选择题、简答题、论述题
- **考频**：★★★ 高频考点，劳动价值论是政经理论基石

## 核心知识点

**商品**是用于交换的劳动产品，具有**使用价值**（自然属性）和**价值**（社会属性）两个因素。

**劳动二重性**：具体劳动创造使用价值，抽象劳动创造价值。马克思称之为"理解政治经济学的枢纽"。

**价值量**由社会必要劳动时间决定，不是个别劳动时间。

**商品经济基本矛盾**：私人劳动与社会劳动的矛盾，只能通过交换解决。

## 练习题

**1. 选择题**：商品的本质因素是（）A.使用价值 B.价值 C.交换价值 D.价格

**2. 简答题**：简述商品二因素与劳动二重性的关系。

**3. 论述题**：为什么说劳动二重性理论是"理解政治经济学的枢纽"？

## 参考资料

《政治经济学教程》（宋涛）第2章
马克思《资本论》第1卷第1章`,
  quizzes: [
    { id: 'pe-q-02-01a', type: 'choice', question: '商品的本质因素是（）', options: ['使用价值', '价值', '交换价值', '价格'], answer: '价值', explanation: '价值是商品的本质因素，体现商品生产者之间的社会关系。' },
    { id: 'pe-q-02-01b', type: 'short-answer', question: '为什么说劳动二重性理论是"理解政治经济学的枢纽"？', answer: '(1)揭示了价值的源泉——抽象劳动；(2)为劳动价值论奠定科学基础；(3)为剩余价值论提供理论前提。', explanation: '劳动二重性理论是马克思主义政治经济学的关键。' },
  ],
  references: ['《政治经济学教程》（宋涛）第2章', '马克思《资本论》第1卷第1章'],
};

// Module 2: 劳动价值论 - 价值规律与市场经济
const topic_02_02: Topic = {
  id: 'pe-02-02',
  moduleId: 'pe-exam-802-political-economy',
  title: '价值规律与市场经济',
  description: '价值规律的内容、表现形式、作用及在市场经济中的体现',
  content: `# 价值规律与市场经济

<Glossary terms="%5B%7B%22term%22%3A%22%E4%BB%B7%E5%80%BC%E8%A7%84%E5%BE%8B%22%2C%22english%22%3A%22Law%20of%20Value%22%2C%22definition%22%3A%22%E5%95%86%E5%93%81%E4%BB%B7%E5%80%BC%E9%87%8F%E7%94%B1%E7%A4%BE%E4%BC%9A%E5%BF%85%E8%A6%81%E5%8A%B3%E5%8A%A8%E6%97%B6%E9%97%B4%E5%86%B3%E5%AE%9A%EF%BC%8C%E5%95%86%E5%93%81%E4%BA%A4%E6%8D%A2%E4%BB%A5%E4%BB%B7%E5%80%BC%E4%B8%BA%E5%9F%BA%E7%A1%80%22%7D%2C%7B%22term%22%3A%22%E4%BB%B7%E6%A0%BC%22%2C%22english%22%3A%22Price%22%2C%22definition%22%3A%22%E5%95%86%E5%93%81%E4%BB%B7%E5%80%BC%E7%9A%84%E8%B4%A7%E5%B8%81%E8%A1%A8%E7%8E%B0%22%7D%2C%7B%22term%22%3A%22%E5%B8%82%E5%9C%BA%E6%9C%BA%E5%88%B6%22%2C%22english%22%3A%22Market%20Mechanism%22%2C%22definition%22%3A%22%E9%80%9A%E8%BF%87%E4%BE%9B%E6%B1%82%E3%80%81%E4%BB%B7%E6%A0%BC%E3%80%81%E7%AB%9E%E4%BA%89%E9%85%8D%E7%BD%AE%E8%B5%84%E6%BA%90%E7%9A%84%E6%96%B9%E5%BC%8F%22%7D%5D" />

## 考情分析

- **题型**：论述题为主
- **考频**：★★★ 价值规律是市场经济的基本规律

## 核心知识点

**价值规律**的基本内容：商品价值量由社会必要劳动时间决定，商品交换以价值为基础。

**表现形式**：价格围绕价值上下波动（供求关系影响，竞争机制调节）。

**三大作用**：调节资源配置、刺激技术进步、导致优胜劣汰。

## 练习题

**1. 选择题**：价值规律的表现形式是（）A.价格等于价值 B.价格围绕价值上下波动 C.价格决定价值 D.价值决定价格

**2. 论述题**：试论价值规律的内容、表现形式及其作用。

## 参考资料

《政治经济学教程》（宋涛）第3章`,
  quizzes: [
    { id: 'pe-q-02-02a', type: 'choice', question: '价值规律的表现形式是（）', options: ['价格等于价值', '价格围绕价值上下波动', '价格决定价值', '价值决定价格'], answer: '价格围绕价值上下波动', explanation: '价格围绕价值波动是价值规律的表现形式。' },
    { id: 'pe-q-02-02b', type: 'short-answer', question: '简述价值规律的三大作用。', answer: '(1)调节资源配置；(2)刺激技术进步；(3)导致优胜劣汰。', explanation: '价值规律通过价格信号、竞争压力、市场选择发挥作用。' },
  ],
  references: ['《政治经济学教程》（宋涛）第3章'],
};

// Module 3: 剩余价值论 - 货币转化为资本
const topic_03_01: Topic = {
  id: 'pe-03-01',
  moduleId: 'pe-exam-802-political-economy',
  title: '货币转化为资本',
  description: '资本总公式、劳动力成为商品、剩余价值的来源',
  content: `# 货币转化为资本

<Glossary terms="%5B%7B%22term%22%3A%22%E8%B5%84%E6%9C%AC%E6%80%BB%E5%85%AC%E5%BC%8F%22%2C%22english%22%3A%22General%20Formula%20of%20Capital%22%2C%22definition%22%3A%22G-W-G%27%EF%BC%8C%E8%B4%A7%E5%B8%81-%E5%95%86%E5%93%81-%E6%9B%B4%E5%A4%9A%E8%B4%A7%E5%B8%81%22%7D%2C%7B%22term%22%3A%22%E5%8A%B3%E5%8A%A8%E5%8A%9B%22%2C%22english%22%3A%22Labor%20Power%22%2C%22definition%22%3A%22%E5%8A%B3%E5%8A%A8%E8%80%85%E7%9A%84%E4%BD%93%E5%8A%9B%E5%92%8C%E8%84%91%E5%8A%9B%E7%9A%84%E6%80%BB%E5%92%8C%EF%BC%8C%E5%9C%A8%E8%B5%84%E6%9C%AC%E4%B8%BB%E4%B9%89%E4%B8%8B%E6%88%BA%E7%89%B9%E6%AE%8A%E5%95%86%E5%93%81%22%7D%2C%7B%22term%22%3A%22%E5%89%A9%E4%BD%99%E4%BB%B7%E5%80%BC%22%2C%22english%22%3A%22Surplus%20Value%22%2C%22definition%22%3A%22%E5%8A%B3%E5%8A%A8%E8%80%85%E5%88%9B%E9%80%A0%E7%9A%84%E8%B6%85%E8%BF%87%E5%8A%B3%E5%8A%A8%E5%8A%9B%E4%BB%B7%E5%80%BC%E7%9A%84%E9%82%A3%E9%83%A8%E5%88%86%E4%BB%B7%E5%80%BC%EF%BC%8C%E8%A2%AB%E8%B5%84%E6%9C%AC%E5%AE%B6%E6%97%A0%E5%81%BF%E5%8D%A0%E6%9C%89%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★★★ 剩余价值论的起点

## 核心知识点

**资本总公式**G—W—G'与价值规律存在矛盾：等价交换如何产生剩余价值？

**解决**：劳动力成为商品。劳动力的特殊性在于：使用价值（劳动）创造的价值**大于**劳动力自身的价值。

**剩余价值**来源于生产过程中，工人剩余劳动时间创造的价值。

## 练习题

**1. 选择题**：资本总公式是（）A.W—G—W B.G—W—G' C.G—G' D.W—W'

**2. 论述题**：为什么说劳动力成为商品是货币转化为资本的关键？

## 参考资料

《政治经济学教程》（宋涛）第5章
马克思《资本论》第1卷第4章`,
  quizzes: [
    { id: 'pe-q-03-01a', type: 'choice', question: '资本总公式是（）', options: ['W—G—W', 'G—W—G\'', 'G—G\'', 'W—W\''], answer: 'G—W—G\'', explanation: '资本总公式是货币—商品—更多的货币。' },
    { id: 'pe-q-03-01b', type: 'short-answer', question: '劳动力成为商品需要哪两个条件？', answer: '(1)劳动者是自由人；(2)劳动者一无所有，没有生产资料。', explanation: '人身自由和丧失生产资料是劳动力成为商品的两个基本条件。' },
  ],
  references: ['《政治经济学教程》（宋涛）第5章', '马克思《资本论》第1卷第4章'],
};

// Module 3: 剩余价值论 - 剩余价值的生产过程
const topic_03_02: Topic = {
  id: 'pe-03-02',
  moduleId: 'pe-exam-802-political-economy',
  title: '剩余价值的生产过程',
  description: '必要劳动与剩余劳动、剩余价值率、绝对剩余价值与相对剩余价值',
  content: `# 剩余价值的生产过程

<Glossary terms="%5B%7B%22term%22%3A%22%E5%BF%85%E8%A6%81%E5%8A%B3%E5%8A%A8%E6%97%B6%E9%97%B4%22%2C%22english%22%3A%22Necessary%20Labor%20Time%22%2C%22definition%22%3A%22%E5%86%8D%E7%94%9F%E4%BA%A7%E5%8A%B3%E5%8A%A8%E5%8A%9B%E4%BB%B7%E5%80%BC%E6%89%80%E9%9C%80%E7%9A%84%E6%97%B6%E9%97%B4%22%7D%2C%7B%22term%22%3A%22%E5%89%A9%E4%BD%99%E5%8A%B3%E5%8A%A8%E6%97%B6%E9%97%B4%22%2C%22english%22%3A%22Surplus%20Labor%20Time%22%2C%22definition%22%3A%22%E8%B6%85%E8%BF%87%E5%BF%85%E8%A6%81%E5%8A%B3%E5%8A%A8%E6%97%B6%E9%97%B4%E7%9A%84%E9%82%A3%E9%83%A8%E5%88%86%EF%BC%8C%E5%88%9B%E9%80%A0%E5%89%A9%E4%BD%99%E4%BB%B7%E5%80%BC%22%7D%2C%7B%22term%22%3A%22%E5%89%A9%E4%BD%99%E4%BB%B7%E5%80%BC%E7%8E%87%22%2C%22english%22%3A%22Rate%20of%20Surplus%20Value%22%2C%22definition%22%3A%22m%27%3Dm%2Fv%EF%BC%8C%E5%8F%8D%E6%98%A0%E8%B5%84%E6%9C%AC%E5%AE%B6%E5%AF%B9%E5%B7%A5%E4%BA%BA%E7%9A%84%E5%89%A5%E5%89%8A%E7%A8%8B%E5%BA%A6%22%7D%2C%7B%22term%22%3A%22%E7%BB%9D%E5%AF%B9%E5%89%A9%E4%BD%99%E4%BB%B7%E5%80%BC%22%2C%22english%22%3A%22Absolute%20Surplus%20Value%22%2C%22definition%22%3A%22%E9%80%9A%E8%BF%87%E5%BB%B6%E9%95%BF%E5%B7%A5%E4%BD%9C%E6%97%A5%E5%A2%9E%E5%8A%A0%E5%89%A9%E4%BD%99%E4%BB%B7%E5%80%BC%22%7D%2C%7B%22term%22%3A%22%E7%9B%B8%E5%AF%B9%E5%89%A9%E4%BD%99%E4%BB%B7%E5%80%BC%22%2C%22english%22%3A%22Relative%20Surplus%20Value%22%2C%22definition%22%3A%22%E9%80%9A%E8%BF%87%E7%BC%A9%E7%9F%AD%E5%BF%85%E8%A6%81%E5%8A%B3%E5%8A%A8%E6%97%B6%E9%97%B4%E5%A2%9E%E5%8A%A0%E5%89%A9%E4%BD%99%E4%BB%B7%E5%80%BC%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题、计算题
- **考频**：★★★ 核心考点

## 核心知识点

**剩余价值率**m'=m/v，反映剥削程度。

**绝对剩余价值**：延长工作日增加剩余价值（受生理和道德限制）。

**相对剩余价值**：缩短必要劳动时间增加剩余价值（通过提高劳动生产率）。

两者关系：绝对剩余价值是基础，相对剩余价值以绝对剩余价值为前提。

## 练习题

**1. 选择题**：剩余价值率公式是（）A.m'=c/v B.m'=m/v C.m'=m/c D.m'=v/m

**2. 简答题**：简述绝对剩余价值与相对剩余价值的区别。

## 参考资料

《政治经济学教程》（宋涛）第6章
马克思《资本论》第1卷第5-7章`,
  quizzes: [
    { id: 'pe-q-03-02a', type: 'choice', question: '剩余价值率公式是（）', options: ['m\'=c/v', 'm\'=m/v', 'm\'=m/c', 'm\'=v/m'], answer: 'm\'=m/v', explanation: '剩余价值率=剩余价值/可变资本。' },
    { id: 'pe-q-03-02b', type: 'short-answer', question: '简述绝对剩余价值与相对剩余价值的区别与联系。', answer: '区别：手段不同（延长工作日vs缩短必要劳动时间）。联系：都是剥削方法，绝对剩余价值是基础。', explanation: '两者是剩余价值生产的两种基本方法。' },
  ],
  references: ['《政治经济学教程》（宋涛）第6章', '马克思《资本论》第1卷第5-7章'],
};

// Module 3: 剩余价值论 - 资本积累
const topic_03_03: Topic = {
  id: 'pe-03-03',
  moduleId: 'pe-exam-802-political-economy',
  title: '资本积累',
  description: '资本积累的实质、资本有机构成、相对过剩人口',
  content: `# 资本积累

<Glossary terms="%5B%7B%22term%22%3A%22%E8%B5%84%E6%9C%AC%E7%A7%AF%E7%B4%AF%22%2C%22english%22%3A%22Capital%20Accumulation%22%2C%22definition%22%3A%22%E5%89%A9%E4%BD%99%E4%BB%B7%E5%80%BC%E8%BD%AC%E5%8C%96%E4%B8%BA%E8%B5%84%E6%9C%AC%EF%BC%8C%E5%8D%B3%E8%B5%84%E6%9C%AC%E5%8C%96%E7%9A%84%E5%89%A9%E4%BD%99%E4%BB%B7%E5%80%BC%22%7D%2C%7B%22term%22%3A%22%E8%B5%84%E6%9C%AC%E6%9C%89%E6%9C%BA%E6%9E%84%E6%88%90%22%2C%22english%22%3A%22Organic%20Composition%20of%20Capital%22%2C%22definition%22%3A%22c%3Av%EF%BC%8C%E7%94%B1%E6%8A%80%E6%9C%AF%E6%9E%84%E6%88%90%E5%86%B3%E5%AE%9A%E5%B9%B6%E5%8F%8D%E6%98%A0%E6%8A%80%E6%9C%AF%E6%9E%84%E6%88%90%E7%9A%84%E4%BB%B7%E5%80%BC%E6%9E%84%E6%88%90%22%7D%2C%7B%22term%22%3A%22%E7%9B%B8%E5%AF%B9%E8%BF%87%E5%89%A9%E4%BA%BA%E5%8F%A3%22%2C%22english%22%3A%22Relative%20Surplus%20Population%22%2C%22definition%22%3A%22%E8%B5%84%E6%9C%AC%E6%9C%89%E6%9C%BA%E6%9E%84%E6%88%90%E6%8F%90%E9%AB%98%E5%AF%BC%E8%87%B4%E7%9A%84%E7%9B%B8%E5%AF%B9%E5%A4%9A%E4%BD%99%E7%9A%84%E5%8A%B3%E5%8A%A8%E5%8A%9B%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★★ 常与剩余价值论结合出题

## 核心知识点

**资本积累**的实质是资本化的剩余价值，即剩余价值转化为资本。

**资本有机构成**c:v，由技术构成决定并反映技术构成的价值构成。随着技术进步，资本有机构成有提高趋势。

**相对过剩人口**：资本有机构成提高导致对劳动力需求相对减少，产生相对过剩人口（产业后备军）。

## 练习题

**1. 简答题**：什么是资本有机构成？为什么它有提高趋势？

**2. 论述题**：试论资本积累的一般规律及其历史趋势。

## 参考资料

《政治经济学教程》（宋涛）第7章
马克思《资本论》第1卷第23-24章`,
  quizzes: [
    { id: 'pe-q-03-03a', type: 'short-answer', question: '什么是资本有机构成？', answer: '资本有机构成是c:v，由技术构成决定并反映技术构成的价值构成。', explanation: '资本有机构成反映生产技术水平。' },
    { id: 'pe-q-03-03b', type: 'short-answer', question: '资本积累的一般规律是什么？', answer: '一极是财富的积累，另一极是贫困的积累。', explanation: '这是资本主义积累的历史趋势。' },
  ],
  references: ['《政治经济学教程》（宋涛）第7章', '马克思《资本论》第1卷第23-24章'],
};

// Module 4: 资本流通 - 资本的循环与周转
const topic_04_01: Topic = {
  id: 'pe-04-01',
  moduleId: 'pe-exam-802-political-economy',
  title: '资本的循环与周转',
  description: '产业资本循环的三个阶段、三种职能形式、资本周转速度',
  content: `# 资本的循环与周转

<Glossary terms="%5B%7B%22term%22%3A%22%E8%B5%84%E6%9C%AC%E5%BE%AA%E7%8E%AF%22%2C%22english%22%3A%22Capital%20Circuit%22%2C%22definition%22%3A%22%E4%BA%A7%E4%B8%9A%E8%B5%84%E6%9C%AC%E4%BB%8E%E4%B8%80%E7%A7%8D%E8%81%8C%E8%83%BD%E5%BD%A2%E5%BC%8F%E5%87%BA%E5%8F%91%EF%BC%8C%E7%BB%8F%E8%BF%87%E4%B8%89%E4%B8%AA%E9%98%B6%E6%AE%B5%EF%BC%8C%E5%9B%9E%E5%88%B0%E5%8E%9F%E6%9D%A5%E7%9A%84%E8%81%8C%E8%83%BD%E5%BD%A2%E5%BC%8F%22%7D%2C%7B%22term%22%3A%22%E8%B5%84%E6%9C%AC%E5%91%A8%E8%BD%AC%22%2C%22english%22%3A%22Capital%20Turnover%22%2C%22definition%22%3A%22%E8%B5%84%E6%9C%AC%E5%BE%AA%E7%8E%AF%E4%B8%8D%E6%96%AD%E9%87%8D%E5%A4%8D%E7%9A%84%E8%BF%87%E7%A8%8B%22%7D%2C%7B%22term%22%3A%22%E5%9B%BA%E5%AE%9A%E8%B5%84%E6%9C%AC%22%2C%22english%22%3A%22Fixed%20Capital%22%2C%22definition%22%3A%22%E5%9C%A8%E7%94%9F%E4%BA%A7%E8%BF%87%E7%A8%8B%E4%B8%AD%E4%BF%9D%E6%8C%81%E5%8E%9F%E6%9C%89%E5%BD%A2%E6%80%81%EF%BC%8C%E4%BB%B7%E5%80%BC%E9%80%90%E6%B8%90%E8%BD%AC%E7%A7%BB%E7%9A%84%E8%B5%84%E6%9C%AC%22%7D%2C%7B%22term%22%3A%22%E6%B5%81%E5%8A%A8%E8%B5%84%E6%9C%AC%22%2C%22english%22%3A%22Circulating%20Capital%22%2C%22definition%22%3A%22%E5%9C%A8%E7%94%9F%E4%BA%A7%E4%B8%AD%E4%B8%80%E6%AC%A1%E6%80%A7%E6%B6%88%E8%80%97%EF%BC%8C%E4%BB%B7%E5%80%BC%E4%B8%80%E6%AC%A1%E6%80%A7%E8%BD%AC%E7%A7%BB%E7%9A%84%E8%B5%84%E6%9C%AC%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★★ 理解资本流通是再生产理论的基础

## 核心知识点

**产业资本循环**经过三个阶段（购买、生产、销售），采取三种职能形式（货币资本、生产资本、商品资本）。

**资本周转**是不断重复的资本循环。周转速度受生产资本构成（固定资本vs流动资本）和周转时间影响。

## 练习题

**1. 简答题**：产业资本循环经过哪三个阶段？采取哪三种职能形式？

**2. 论述题**：影响资本周转速度的因素有哪些？

## 参考资料

《政治经济学教程》（宋涛）第8章
马克思《资本论》第2卷`,
  quizzes: [
    { id: 'pe-q-04-01a', type: 'short-answer', question: '产业资本循环经过哪三个阶段？', answer: '购买阶段、生产阶段、销售阶段，对应货币资本、生产资本、商品资本三种职能形式。', explanation: '产业资本循环是生产过程和流通过程的统一。' },
  ],
  references: ['《政治经济学教程》（宋涛）第8章', '马克思《资本论》第2卷'],
};

// Module 4: 资本流通 - 社会资本再生产
const topic_04_02: Topic = {
  id: 'pe-04-02',
  moduleId: 'pe-exam-802-political-economy',
  title: '社会资本再生产',
  description: '社会资本再生产的实现条件、简单再生产与扩大再生产',
  content: `# 社会资本再生产

<Glossary terms="%5B%7B%22term%22%3A%22%E7%A4%BE%E4%BC%9A%E8%B5%84%E6%9C%AC%22%2C%22english%22%3A%22Social%20Capital%22%2C%22definition%22%3A%22%E7%9B%B8%E4%BA%92%E8%81%94%E7%B3%BB%E3%80%81%E7%9B%B8%E4%BA%92%E4%BE%9D%E5%AD%98%E7%9A%84%E5%8D%95%E4%B8%AA%E8%B5%84%E6%9C%AC%E7%9A%84%E6%80%BB%E5%92%8C%22%7D%2C%7B%22term%22%3A%22%E7%AE%80%E5%8D%95%E5%86%8D%E7%94%9F%E4%BA%A7%22%2C%22english%22%3A%22Simple%20Reproduction%22%2C%22definition%22%3A%22%E5%9C%A8%E5%8E%9F%E6%9C%89%E8%A7%84%E6%A8%A1%E4%B8%8A%E9%87%8D%E5%A4%8D%E8%BF%9B%E8%A1%8C%E7%9A%84%E5%86%8D%E7%94%9F%E4%BA%A7%22%7D%2C%7B%22term%22%3A%22%E6%89%A9%E5%A4%A7%E5%86%8D%E7%94%9F%E4%BA%A7%22%2C%22english%22%3A%22Extended%20Reproduction%22%2C%22definition%22%3A%22%E5%9C%A8%E6%89%A9%E5%A4%A7%E8%A7%84%E6%A8%A1%E4%B8%8A%E8%BF%9B%E8%A1%8C%E7%9A%84%E5%86%8D%E7%94%9F%E4%BA%A7%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题（偶有计算）
- **考频**：★★★ 重要理论，常考实现条件

## 核心知识点

社会资本再生产的核心问题是**实现问题**——社会总产品的价值补偿和实物替换。

**简单再生产**的实现条件：I(v+m) = IIc

**扩大再生产**的实现条件：I(v+Δv+m/x) = II(c+Δc)

两大部类必须保持一定比例关系，否则就会发生经济危机。

## 练习题

**1. 简答题**：社会资本简单再生产的实现条件是什么？

**2. 论述题**：试论社会资本再生产理论的现实意义。

## 参考资料

《政治经济学教程》（宋涛）第9章
马克思《资本论》第2卷`,
  quizzes: [
    { id: 'pe-q-04-02a', type: 'short-answer', question: '社会资本简单再生产的实现条件是什么？', answer: 'I(v+m) = IIc，即第一部类的可变资本和剩余价值之和等于第二部类的不变资本。', explanation: '这个条件保证了两大部类之间的供需平衡。' },
  ],
  references: ['《政治经济学教程》（宋涛）第9章', '马克思《资本论》第2卷'],
};

// Module 5: 剩余价值分配 - 平均利润与生产价格
const topic_05_01: Topic = {
  id: 'pe-05-01',
  moduleId: 'pe-exam-802-political-economy',
  title: '平均利润与生产价格',
  description: '成本价格、利润、平均利润率的形成、生产价格',
  content: `# 平均利润与生产价格

<Glossary terms="%5B%7B%22term%22%3A%22%E6%88%90%E6%9C%AC%E4%BB%B7%E6%A0%BC%22%2C%22english%22%3A%22Cost%20Price%22%2C%22definition%22%3A%22c%2Bv%EF%BC%8C%E4%B8%8D%E5%8F%98%E8%B5%84%E6%9C%AC%E4%B8%8E%E5%8F%AF%E5%8F%98%E8%B5%84%E6%9C%AC%E4%B9%8B%E5%92%8C%22%7D%2C%7B%22term%22%3A%22%E5%88%A9%E6%B6%A6%22%2C%22english%22%3A%22Profit%22%2C%22definition%22%3A%22%E5%89%A9%E4%BD%99%E4%BB%B7%E5%80%BC%E7%9A%84%E8%BD%AC%E5%8C%96%E5%BD%A2%E5%BC%8F%EF%BC%8C%E8%A2%AB%E7%9C%8B%E4%BD%9C%E5%85%A8%E9%83%A8%E9%A2%84%E4%BB%98%E8%B5%84%E6%9C%AC%E7%9A%84%E4%BA%A7%E7%89%A9%22%7D%2C%7B%22term%22%3A%22%E5%B9%B3%E5%9D%87%E5%88%A9%E6%B6%A6%E7%8E%87%22%2C%22english%22%3A%22Average%20Rate%20of%20Profit%22%2C%22definition%22%3A%22%E7%A4%BE%E4%BC%9A%E5%89%A9%E4%BD%99%E4%BB%B7%E5%80%BC%E6%80%BB%E9%A2%9D%E4%B8%8E%E7%A4%BE%E4%BC%9A%E6%80%BB%E9%A2%84%E4%BB%98%E8%B5%84%E6%9C%AC%E7%9A%84%E6%AF%94%E7%8E%87%22%7D%2C%7B%22term%22%3A%22%E7%94%9F%E4%BA%A7%E4%BB%B7%E6%A0%BC%22%2C%22english%22%3A%22Price%20of%20Production%22%2C%22definition%22%3A%22%E6%88%90%E6%9C%AC%E4%BB%B7%E6%A0%BC%E5%8A%A0%E5%B9%B3%E5%9D%87%E5%88%A9%E6%B6%A6%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★★★ 价值转化为生产价格是重点

## 核心知识点

**成本价格**k=c+v，是不变资本与可变资本之和。

**利润**是剩余价值的转化形式，被看作全部预付资本的产物。

**平均利润率**通过部门间竞争和资本转移形成。**生产价格**=成本价格+平均利润。

生产价格是价值的转化形式，不违背价值规律。

## 练习题

**1. 选择题**：生产价格等于（）A.成本价格+利润 B.成本价格+平均利润 C.价值 D.c+v+m

**2. 论述题**：试论平均利润率的形成及其意义。

## 参考资料

《政治经济学教程》（宋涛）第10章
马克思《资本论》第3卷`,
  quizzes: [
    { id: 'pe-q-05-01a', type: 'choice', question: '生产价格等于（）', options: ['成本价格+利润', '成本价格+平均利润', '价值', 'c+v+m'], answer: '成本价格+平均利润', explanation: '生产价格是成本价格加平均利润。' },
    { id: 'pe-q-05-01b', type: 'short-answer', question: '平均利润率是如何形成的？', answer: '通过部门间的竞争和资本转移形成。资本从利润率低的部门流向利润率高的部门，最终形成平均利润率。', explanation: '平均利润率的形成是资本主义竞争的必然结果。' },
  ],
  references: ['《政治经济学教程》（宋涛）第10章', '马克思《资本论》第3卷'],
};

// Module 5: 剩余价值分配 - 商业利润与利息
const topic_05_02: Topic = {
  id: 'pe-05-02',
  moduleId: 'pe-exam-802-political-economy',
  title: '商业利润与利息',
  description: '商业资本、商业利润、借贷资本、利息率',
  content: `# 商业利润与利息

<Glossary terms="%5B%7B%22term%22%3A%22%E5%95%86%E4%B8%9A%E8%B5%84%E6%9C%AC%22%2C%22english%22%3A%22Commercial%20Capital%22%2C%22definition%22%3A%22%E4%BB%8E%E4%BA%A7%E4%B8%9A%E8%B5%84%E6%9C%AC%E4%B8%AD%E7%8B%AC%E7%AB%8B%E5%87%BA%E6%9D%A5%EF%BC%8C%E4%B8%93%E9%97%A8%E4%BB%8E%E4%BA%8B%E5%95%86%E5%93%81%E4%B9%B0%E5%8D%96%E7%9A%84%E8%B5%84%E6%9C%AC%22%7D%2C%7B%22term%22%3A%22%E5%80%9F%E8%B4%B7%E8%B5%84%E6%9C%AC%22%2C%22english%22%3A%22Loan%20Capital%22%2C%22definition%22%3A%22%E4%BB%8E能资本家借出的资本%22%7D%2C%7B%22term%22%3A%22利息%22%2C%22english%22%3A%22Interest%22%2C%22definition%22%3A%22利润的一部分%EF%BC%8C是剰余价值的转化形式%22%7D%5D" />

## 考情分析

- **题型**：简答题
- **考频**：★★ 剩余价值分配的具体形式

## 核心知识点

**商业资本**从产业资本中独立出来，专门从事商品买卖。**商业利润**是产业资本家让渡给商业资本家的一部分剩余价值。

**借贷资本**是借贷资本家借出的资本。**利息**是利润的一部分，是剩余价值的转化形式。**利息率**在0与平均利润率之间。

## 练习题

**1. 简答题**：商业利润的来源是什么？

**2. 选择题**：利息率的最高界限是（）A.利润率 B.平均利润率 C.剩余价值率 D.成本价格

## 参考资料

《政治经济学教程》（宋涛）第11章`,
  quizzes: [
    { id: 'pe-q-05-02a', type: 'short-answer', question: '商业利润的来源是什么？', answer: '商业利润是产业资本家让渡给商业资本家的一部分剩余价值，来源于产业工人创造的剩余价值。', explanation: '商业利润不是在流通中创造的，而是产业工人创造的剩余价值的一部分。' },
    { id: 'pe-q-05-02b', type: 'choice', question: '利息率的最高界限是（）', options: ['利润率', '平均利润率', '剩余价值率', '成本价格'], answer: '平均利润率', explanation: '利息率在0与平均利润率之间变动。' },
  ],
  references: ['《政治经济学教程》（宋涛）第11章'],
};

// Module 5: 剩余价值分配 - 地租理论
const topic_05_03: Topic = {
  id: 'pe-05-03',
  moduleId: 'pe-exam-802-political-economy',
  title: '地租理论',
  description: '资本主义地租的两种形式：级差地租与绝对地租',
  content: `# 地租理论

<Glossary terms="%5B%7B%22term%22%3A%22%E7%BA%A7%E5%B7%AE%E5%9C%B0%E7%A7%9F%22%2C%22english%22%3A%22Differential%20Rent%22%2C%22definition%22%3A%22由于土地肥沃程度或位置不同而产生的超额利润%22%7D%2C%7B%22term%22%3A%22绝对地租%22%2C%22english%22%3A%22Absolute%20Rent%22%2C%22definition%22%3A%22在任何土地上都必须缴纳的地租%22%7D%2C%7B%22term%22%3A%22土地价格%22%2C%22english%22%3A%22Land%20Price%22%2C%22definition%22%3A%22地租的资本化%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★★ 地租理论常与分配理论结合出题

## 核心知识点

**级差地租**：由于土地肥沃程度或位置不同而产生的超额利润。分为级差地租I（自然条件）和级差地租II（追加投资）。

**绝对地租**：由于土地私有权的垄断，任何土地都必须缴纳的地租。

**土地价格**是地租的资本化，土地价格=地租/利息率。

## 练习题

**1. 简答题**：级差地租与绝对地租有何区别？

**2. 选择题**：土地价格的计算公式是（）A.地租×利息率 B.地租/利息率 C.利息率/地租 D.地租+利息率

## 参考资料

《政治经济学教程》（宋涛）第12章
马克思《资本论》第3卷`,
  quizzes: [
    { id: 'pe-q-05-03a', type: 'short-answer', question: '级差地租与绝对地租有何区别？', answer: '级差地租由土地条件差异产生，绝对地租由土地私有权垄断产生。级差地租是超额利润，绝对地租是任何土地都必须缴纳的。', explanation: '两者的产生原因不同。' },
    { id: 'pe-q-05-03b', type: 'choice', question: '土地价格的计算公式是（）', options: ['地租×利息率', '地租/利息率', '利息率/地租', '地租+利息率'], answer: '地租/利息率', explanation: '土地价格是地租的资本化。' },
  ],
  references: ['《政治经济学教程》（宋涛）第12章', '马克思《资本论》第3卷'],
};

// Module 6: 垄断资本主义
const topic_06_01: Topic = {
  id: 'pe-06-01',
  moduleId: 'pe-exam-802-political-economy',
  title: '垄断与国家垄断资本主义',
  description: '垄断的形成、垄断利润、国家垄断资本主义的特征',
  content: `# 垄断与国家垄断资本主义

<Glossary terms="%5B%7B%22term%22%3A%22垄断%22%2C%22english%22%3A%22Monopoly%22%2C%22definition%22%3A%22少数大企业独占某一部门或几个部门的生产和市场%22%7D%2C%7B%22term%22%3A%22垄断利润%22%2C%22english%22%3A%22Monopoly%20Profit%22%2C%22definition%22%3A%22垄断资本家通过垄断价格获得的超额利润%22%7D%2C%7B%22term%22%3A%22国家垄断资本主义%22%2C%22english%22%3A%22State%20Monopoly%20Capitalism%22%2C%22definition%22%3A%22垄断资本与国家权力结合的资本主义%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★ 考频较低但需了解

## 核心知识点

**垄断**是少数大企业独占某一部门或几个部门的生产和市场。垄断利润通过垄断价格获得。

**国家垄断资本主义**是垄断资本与国家权力结合的资本主义，国家直接参与经济活动，为垄断资本服务。

## 练习题

**1. 简答题**：什么是垄断？垄断是如何形成的？

**2. 论述题**：试论国家垄断资本主义的实质。

## 参考资料

《政治经济学教程》（宋涛）第13章
列宁《帝国主义是资本主义的最高阶段》`,
  quizzes: [
    { id: 'pe-q-06-01a', type: 'short-answer', question: '什么是垄断？垄断是如何形成的？', answer: '垄断是少数大企业独占某一部门的生产和市场。通过自由竞争引起生产集中，生产集中发展到一定阶段必然形成垄断。', explanation: '垄断是资本主义发展的必然产物。' },
  ],
  references: ['《政治经济学教程》（宋涛）第13章', '列宁《帝国主义是资本主义的最高阶段》'],
};

// Module 7: 社会主义 - 基本经济制度
const topic_07_01: Topic = {
  id: 'pe-07-01',
  moduleId: 'pe-exam-802-political-economy',
  title: '社会主义基本经济制度',
  description: '公有制为主体、多种所有制经济共同发展',
  content: `# 社会主义基本经济制度

<Glossary terms="%5B%7B%22term%22%3A%22社会主义基本经济制度%22%2C%22english%22%3A%22Basic%20Economic%20System%20of%20Socialism%22%2C%22definition%22%3A%22公有制为主体%E3%80%81多种所有制经济共同发展%22%7D%2C%7B%22term%22%3A%22公有制%22%2C%22english%22%3A%22Public%20Ownership%22%2C%22definition%22%3A%22生产资料归全民或集体所有%22%7D%2C%7B%22term%22%3A%22多种所有制%22%2C%22english%22%3A%22Multiple%20Forms%20of%20Ownership%22%2C%22definition%22%3A%22公有制为主体、多种所有制经济共同发展%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★★ 中国特色社会主义政治经济学的重要内容

## 核心知识点

**社会主义基本经济制度**：公有制为主体、多种所有制经济共同发展。

公有制经济包括国有经济、集体经济和混合所有制中的国有成分和集体成分。非公有制经济包括个体经济、私营经济、外资经济等。

坚持公有制主体地位是社会主义的根本原则。

## 练习题

**1. 简答题**：社会主义基本经济制度是什么？

**2. 论述题**：为什么必须坚持公有制的主体地位？

## 参考资料

《政治经济学教程》（宋涛）第20章`,
  quizzes: [
    { id: 'pe-q-07-01a', type: 'short-answer', question: '社会主义基本经济制度是什么？', answer: '公有制为主体、多种所有制经济共同发展。', explanation: '这是中国特色社会主义的基本经济制度。' },
  ],
  references: ['《政治经济学教程》（宋涛）第20章'],
};

// Module 7: 社会主义 - 社会主义市场经济
const topic_07_02: Topic = {
  id: 'pe-07-02',
  moduleId: 'pe-exam-802-political-economy',
  title: '社会主义市场经济',
  description: '社会主义市场经济体制的特征、市场与政府的关系',
  content: `# 社会主义市场经济

<Glossary terms="%5B%7B%22term%22%3A%22社会主义市场经济%22%2C%22english%22%3A%22Socialist%20Market%20Economy%22%2C%22definition%22%3A%22与社会主义基本制度结合的市场经济%22%7D%2C%7B%22term%22%3A%22宏观调控%22%2C%22english%22%3A%22Macroeconomic%20Regulation%22%2C%22definition%22%3A%22政府对经济运行的总体调节%22%7D%5D" />

## 考情分析

- **题型**：论述题
- **考频**：★★ 常与市场经济理论结合出题

## 核心知识点

**社会主义市场经济**是与社会主义基本制度结合的市场经济。特征：公有制为主体、按劳分配为主体、国家宏观调控。

市场在资源配置中起**决定性作用**，同时更好发挥政府作用。

## 练习题

**1. 论述题**：试论社会主义市场经济的特征及其与资本主义市场经济的区别。

## 参考资料

《政治经济学教程》（宋涛）第21章`,
  quizzes: [
    { id: 'pe-q-07-02a', type: 'short-answer', question: '社会主义市场经济有何特征？', answer: '公有制为主体、按劳分配为主体、国家宏观调控。市场在资源配置中起决定性作用。', explanation: '社会主义市场经济既有市场经济的一般特征，又有社会主义的制度特征。' },
  ],
  references: ['《政治经济学教程》（宋涛）第21章'],
};

// Module 7: 社会主义 - 收入分配与共同富裕
const topic_07_03: Topic = {
  id: 'pe-07-03',
  moduleId: 'pe-exam-802-political-economy',
  title: '收入分配与共同富裕',
  description: '按劳分配为主体、多种分配方式并存、共同富裕的实现路径',
  content: `# 收入分配与共同富裕

<Glossary terms="%5B%7B%22term%22%3A%22按劳分配%22%2C%22english%22%3A%22Distribution%20According%20to%20Work%22%2C%22definition%22%3A%22社会主义公有制经济中的基本分配方式%22%7D%2C%7B%22term%22%3A%22共同富裕%22%2C%22english%22%3A%22Common%20Prosperity%22%2C%22definition%22%3A%22全体人民共同享有发展成果%22%7D%5D" />

## 考情分析

- **题型**：论述题
- **考频**：★★ 热点问题，常与时政结合

## 核心知识点

**按劳分配**是社会主义公有制经济中的基本分配方式。多种分配方式并存包括按资本、技术、管理等要素分配。

**共同富裕**是社会主义的本质要求，不是同时富裕、同步富裕，而是逐步实现的过程。

初次分配注重效率，再分配注重公平，三次分配（慈善）是补充。

## 练习题

**1. 论述题**：如何理解共同富裕？实现共同富裕的路径是什么？

## 参考资料

《政治经济学教程》（宋涛）第22章`,
  quizzes: [
    { id: 'pe-q-07-03a', type: 'short-answer', question: '如何理解共同富裕？', answer: '共同富裕是社会主义的本质要求，不是同时富裕、同步富裕，而是逐步实现的过程。初次分配注重效率，再分配注重公平，三次分配是补充。', explanation: '共同富裕是中国特色社会主义的重要目标。' },
  ],
  references: ['《政治经济学教程》（宋涛）第22章'],
};

// Module 7: 社会主义 - 对外开放与新发展格局
const topic_07_04: Topic = {
  id: 'pe-07-04',
  moduleId: 'pe-exam-802-political-economy',
  title: '对外开放与新发展格局',
  description: '对外开放的基本国策、构建新发展格局',
  content: `# 对外开放与新发展格局

<Glossary terms="%5B%7B%22term%22%3A%22对外开放%22%2C%22english%22%3A%22Opening%20Up%22%2C%22definition%22%3A%22积极参与国际经济分工和竞争%22%7D%2C%7B%22term%22%3A%22新发展格局%22%2C%22english%22%3A%22New%20Development%20Pattern%22%2C%22definition%22%3A%22以国内大循环为主体、国内国际双循环相互促进%22%7D%5D" />

## 考情分析

- **题型**：论述题
- **考频**：★ 时政结合题

## 核心知识点

**对外开放**是我国的基本国策，积极参与国际分工和竞争。

**新发展格局**：以国内大循环为主体、国内国际双循环相互促进。不是封闭的国内循环，而是开放的国内国际双循环。

## 练习题

**1. 论述题**：如何理解构建新发展格局？

## 参考资料

《政治经济学教程》（宋涛）第23章`,
  quizzes: [
    { id: 'pe-q-07-04a', type: 'short-answer', question: '什么是新发展格局？', answer: '以国内大循环为主体、国内国际双循环相互促进。不是封闭的国内循环，而是开放的双循环。', explanation: '新发展格局是应对国际环境变化的战略选择。' },
  ],
  references: ['《政治经济学教程》（宋涛）第23章'],
};

// Export all 16 topics
export const topics: Topic[] = [
  topic_01_01,
  topic_02_01, topic_02_02,
  topic_03_01, topic_03_02, topic_03_03,
  topic_04_01, topic_04_02,
  topic_05_01, topic_05_02, topic_05_03,
  topic_06_01,
  topic_07_01, topic_07_02, topic_07_03, topic_07_04,
];
