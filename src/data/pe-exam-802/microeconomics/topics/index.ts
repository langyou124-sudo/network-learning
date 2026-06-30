import { Topic } from '@/types';

// Module 1: 消费者理论 - 预算约束与偏好
const topic_mi_01_01: Topic = {
  id: 'mi-01-01',
  moduleId: 'pe-exam-802-microeconomics',
  title: '预算约束与偏好',
  description: '预算线、无差异曲线、边际替代率',
  content: `# 预算约束与偏好

<Glossary terms="%5B%7B%22term%22%3A%22预算约束%22%2C%22english%22%3A%22Budget%20Constraint%22%2C%22definition%22%3A%22消费者收入和价格限制下的消费选择范围%22%7D%2C%7B%22term%22%3A%22无差异曲线%22%2C%22english%22%3A%22Indifference%20Curve%22%2C%22definition%22%3A%22给消费者带来相同满足程度的不同商品组合的轨迹%22%7D%2C%7B%22term%22%3A%22边际替代率%22%2C%22english%22%3A%22Marginal%20Rate%20of%2Substitution%22%2C%22definition%22%3A%22消费者愿意用一种商品替代另一种商品的比率%22%7D%5D" />

## 考情分析

- **题型**：计算题、简答题
- **考频**：★★★ 消费者理论的基础

## 核心知识点

**预算约束**：Px·X + Py·Y = I，表示消费者在既定收入和价格下的消费可能。

**无差异曲线**：给消费者带来相同满足程度的不同商品组合的轨迹。特征：向右下方倾斜、凸向原点、不相交。

**边际替代率**MRSxy = -ΔY/ΔX = MUx/MUy，递减规律。

## 练习题

**1. 计算题**：已知Px=2, Py=3, I=120，求预算线方程。

**2. 简答题**：无差异曲线有何特征？

## 参考资料

范里安《微观经济学：现代观点》第2-4章
高鸿业《西方经济学（微观部分）》第3章`,
  quizzes: [
    { id: 'mi-q-01-01a', type: 'fill', question: '预算线方程为______。', answer: 'Px·X + Py·Y = I', explanation: '预算线表示消费者的收入和价格约束。' },
    { id: 'mi-q-01-01b', type: 'short-answer', question: '无差异曲线有何特征？', answer: '(1)向右下方倾斜；(2)凸向原点；(3)任意两条不相交；(4)离原点越远效用越高。', explanation: '无差异曲线的四个基本特征。' },
  ],
  references: ['范里安《微观经济学：现代观点》第2-4章', '高鸿业《西方经济学（微观部分）》第3章'],
};

// Module 1: 消费者理论 - 效用最大化与需求
const topic_mi_01_02: Topic = {
  id: 'mi-01-02',
  moduleId: 'pe-exam-802-microeconomics',
  title: '效用最大化与需求',
  description: '效用最大化条件、需求函数、价格消费曲线',
  content: `# 效用最大化与需求

<Glossary terms="%5B%7B%22term%22%3A%22效用最大化%22%2C%22english%22%3A%22Utility%20Maximization%22%2C%22definition%22%3A%22在预算约束下选择使效用最大的商品组合%22%7D%2C%7B%22term%22%3A%22边际效用%22%2C%22english%22%3A%22Marginal%20Utility%22%2C%22definition%22%3A%22增加一单位消费所带来的效用增量%22%7D%2C%7B%22term%22%3A%22需求函数%22%2C%22english%22%3A%22Demand%20Function%22%2C%22definition%22%3A%22商品需求量与价格等因素的关系%22%7D%5D" />

## 考情分析

- **题型**：计算题、简答题
- **考频**：★★★ 核心考点

## 核心知识点

**效用最大化条件**：MRSxy = Px/Py，即边际替代率等于价格之比。等价于MUx/Px = MUy/Py。

**需求函数**：需求量是价格和收入的函数。从效用最大化推导需求函数。

**价格消费曲线**和**收入消费曲线**：分别反映价格变化和收入变化对最优消费组合的影响。

## 练习题

**1. 计算题**：已知U=X^0.5·Y^0.5, Px=2, Py=4, I=100，求效用最大化时的X和Y。

**2. 简答题**：效用最大化的条件是什么？

## 参考资料

范里安《微观经济学：现代观点》第5-6章
高鸿业《西方经济学（微观部分）》第3章`,
  quizzes: [
    { id: 'mi-q-01-02a', type: 'short-answer', question: '效用最大化的条件是什么？', answer: 'MRSxy = Px/Py，即边际替代率等于价格之比。等价于MUx/Px = MUy/Py。', explanation: '这是消费者均衡的核心条件。' },
  ],
  references: ['范里安《微观经济学：现代观点》第5-6章', '高鸿业《西方经济学（微观部分）》第3章'],
};

// Module 1: 消费者理论 - 斯勒茨基方程与消费者剩余
const topic_mi_01_03: Topic = {
  id: 'mi-01-03',
  moduleId: 'pe-exam-802-microeconomics',
  title: '斯勒茨基方程与消费者剩余',
  description: '价格效应的分解、替代效应与收入效应、消费者剩余',
  content: `# 斯勒茨基方程与消费者剩余

<Glossary terms="%5B%7B%22term%22%3A%22替代效应%22%2C%22english%22%3A%22Substitution%20Effect%22%2C%22definition%22%3A%22价格变化引起相对价格变化导致的需求变动%22%7D%2C%7B%22term%22%3A%22收入效应%22%2C%22english%22%3A%22Income%20Effect%22%2C%22definition%22%3A%22价格变化引起实际收入变化导致的需求变动%22%7D%2C%7B%22term%22%3A%22消费者剩余%22%2C%22english%22%3A%22Consumer%20Surplus%22%2C%22definition%22%3A%22消费者愿意支付的价格与实际支付价格之差%22%7D%5D" />

## 考情分析

- **题型**：计算题、简答题
- **考频**：★★★ 高频考点

## 核心知识点

**斯勒茨基方程**：价格效应 = 替代效应 + 收入效应

- **替代效应**：价格变化引起相对价格变化导致的需求变动（总是负的）
- **收入效应**：价格变化引起实际收入变化导致的需求变动（正常品为负，劣等品为正）

**消费者剩余**：消费者愿意支付的价格与实际支付价格之差，等于需求曲线下、价格线上方的面积。

## 练习题

**1. 简答题**：用斯勒茨基方程分析正常品价格下降的影响。

**2. 计算题**：已知需求函数Q=100-2P，P从10下降到5，求消费者剩余的变化。

## 参考资料

范里安《微观经济学：现代观点》第8-15章
高鸿业《西方经济学（微观部分）》第3章`,
  quizzes: [
    { id: 'mi-q-01-03a', type: 'short-answer', question: '用斯勒茨基方程分析正常品价格下降的影响。', answer: '价格效应=替代效应+收入效应。正常品价格下降：替代效应为正（增加需求），收入效应为正（实际收入增加，增加需求），总效应为正。', explanation: '正常品的替代效应和收入效应方向一致。' },
  ],
  references: ['范里安《微观经济学：现代观点》第8-15章', '高鸿业《西方经济学（微观部分）》第3章'],
};

// Module 2: 生产者理论 - 生产函数与成本最小化
const topic_mi_02_01: Topic = {
  id: 'mi-02-01',
  moduleId: 'pe-exam-802-microeconomics',
  title: '生产函数与成本最小化',
  description: '生产函数、等产量线、等成本线、成本最小化条件',
  content: `# 生产函数与成本最小化

<Glossary terms="%5B%7B%22term%22%3A%22生产函数%22%2C%22english%22%3A%22Production%20Function%22%2C%22definition%22%3A%22投入与产出之间的技术关系%22%7D%2C%7B%22term%22%3A%22等产量线%22%2C%22english%22%3A%22Isoquant%22%2C%22definition%22%3A%22生产同一产量的不同投入组合%22%7D%2C%7B%22term%22%3A%22边际技术替代率%22%2C%22english%22%3A%22Marginal%20Rate%20of%20Technical%20Substitution%22%2C%22definition%22%3A%22在保持产量不变时，一种投入替代另一种投入的比率%22%7D%5D" />

## 考情分析

- **题型**：计算题、简答题
- **考频**：★★ 生产者理论基础

## 核心知识点

**生产函数**Q=f(K,L)，表示投入与产出的技术关系。常见形式：柯布-道格拉斯生产函数。

**等产量线**：生产同一产量的不同投入组合。特征类似无差异曲线。

**成本最小化条件**：MRTS=w/r，即边际技术替代率等于要素价格之比。

## 练习题

**1. 简答题**：成本最小化的条件是什么？

**2. 计算题**：已知Q=L^0.5·K^0.5, w=4, r=9, Q=10，求成本最小化的L和K。

## 参考资料

范里安《微观经济学：现代观点》第19-21章
高鸿业《西方经济学（微观部分）》第4章`,
  quizzes: [
    { id: 'mi-q-02-01a', type: 'short-answer', question: '成本最小化的条件是什么？', answer: 'MRTS=w/r，即边际技术替代率等于要素价格之比。等价于MPL/w = MPK/r。', explanation: '这是生产者均衡的核心条件。' },
  ],
  references: ['范里安《微观经济学：现代观点》第19-21章', '高鸿业《西方经济学（微观部分）》第4章'],
};

// Module 2: 生产者理论 - 成本曲线与利润最大化
const topic_mi_02_02: Topic = {
  id: 'mi-02-02',
  moduleId: 'pe-exam-802-microeconomics',
  title: '成本曲线与利润最大化',
  description: '短期成本曲线、长期成本曲线、利润最大化条件',
  content: `# 成本曲线与利润最大化

<Glossary terms="%5B%7B%22term%22%3A%22边际成本%22%2C%22english%22%3A%22Marginal%20Cost%22%2C%22definition%22%3A%22增加一单位产出所增加的成本%22%7D%2C%7B%22term%22%3A%22平均成本%22%2C%22english%22%3A%22Average%20Cost%22%2C%22definition%22%3A%22总成本除以产量%22%7D%2C%7B%22term%22%3A%22利润最大化%22%2C%22english%22%3A%22Profit%20Maximization%22%2C%22definition%22%3A%22MR%3DMC%EF%BC%8C边际收益等于边际成本%22%7D%5D" />

## 考情分析

- **题型**：计算题、简答题
- **考频**：★★★ 成本理论是市场结构分析的基础

## 核心知识点

**短期成本**：固定成本FC、可变成本VC、总成本TC=FC+VC、边际成本MC、平均成本AC。

**长期成本**：所有要素可变，长期平均成本LAC是短期平均成本SAC的包络线。

**利润最大化条件**：MR=MC（边际收益等于边际成本）。

## 练习题

**1. 简答题**：利润最大化的条件是什么？

**2. 计算题**：已知TC=Q^3-6Q^2+15Q+10，求MC和最小AC。

## 参考资料

范里安《微观经济学：现代观点》第20-23章
高鸿业《西方经济学（微观部分）》第5章`,
  quizzes: [
    { id: 'mi-q-02-02a', type: 'short-answer', question: '利润最大化的条件是什么？', answer: 'MR=MC，即边际收益等于边际成本。', explanation: '这是利润最大化的基本条件。' },
  ],
  references: ['范里安《微观经济学：现代观点》第20-23章', '高鸿业《西方经济学（微观部分）》第5章'],
};

// Module 3: 市场结构 - 完全竞争市场
const topic_mi_03_01: Topic = {
  id: 'mi-03-01',
  moduleId: 'pe-exam-802-microeconomics',
  title: '完全竞争市场',
  description: '完全竞争的条件、短期均衡、长期均衡、供给曲线',
  content: `# 完全竞争市场

<Glossary terms="%5B%7B%22term%22%3A%22完全竞争%22%2C%22english%22%3A%22Perfect%20Competition%22%2C%22definition%22%3A%22大量买卖者、产品同质、自由进出、信息完全的市场%22%7D%2C%7B%22term%22%3A%22经济利润%22%2C%22english%22%3A%22Economic%20Profit%22%2C%22definition%22%3A%22总收益减去总成本（含机会成本）%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★★ 市场结构分析的基准

## 核心知识点

**完全竞争**条件：大量买卖者、产品同质、自由进出、信息完全。

**短期均衡**：P=MC，厂商可能获得经济利润或亏损。

**长期均衡**：P=MC=AC，经济利润为零，只获得正常利润。

## 练习题

**1. 简答题**：完全竞争市场的长期均衡有何特征？

**2. 论述题**：试论完全竞争市场的效率。

## 参考资料

高鸿业《西方经济学（微观部分）》第6章`,
  quizzes: [
    { id: 'mi-q-03-01a', type: 'short-answer', question: '完全竞争市场的长期均衡有何特征？', answer: 'P=MC=AC，经济利润为零，只获得正常利润。资源配置达到帕累托最优。', explanation: '长期均衡是完全竞争市场的最终状态。' },
  ],
  references: ['高鸿业《西方经济学（微观部分）》第6章'],
};

// Module 3: 市场结构 - 垄断与价格歧视
const topic_mi_03_02: Topic = {
  id: 'mi-03-02',
  moduleId: 'pe-exam-802-microeconomics',
  title: '垄断与价格歧视',
  description: '垄断的成因、垄断厂商的均衡、价格歧视的三种类型',
  content: `# 垄断与价格歧视

<Glossary terms="%5B%7B%22term%22%3A%22垄断%22%2C%22english%22%3A%22Monopoly%22%2C%22definition%22%3A%22只有一个卖者的市场%22%7D%2C%7B%22term%22%3A%22价格歧视%22%2C%22english%22%3A%22Price%20Discrimination%22%2C%22definition%22%3A%22同一商品对不同消费者收取不同价格%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★★★ 价格歧视是高频考点

## 核心知识点

**垄断成因**：进入壁垒（专利、资源控制、政府特许）。

**垄断均衡**：MR=MC，P>MC，存在无谓损失。

**价格歧视**：
- 一级：完全价格歧视（每个消费者支付其最高意愿价格）
- 二级：数量歧视（买得越多越便宜）
- 三级：市场分割（不同市场不同价格）

## 练习题

**1. 简答题**：什么是价格歧视？实行价格歧视需要什么条件？

**2. 论述题**：比较完全竞争与垄断的效率。

## 参考资料

高鸿业《西方经济学（微观部分）》第7章
范里安《微观经济学：现代观点》第24-26章`,
  quizzes: [
    { id: 'mi-q-03-02a', type: 'short-answer', question: '什么是价格歧视？实行价格歧视需要什么条件？', answer: '价格歧视是同一商品对不同消费者收取不同价格。条件：(1)市场势力；(2)消费者偏好不同；(3)能够阻止套利。', explanation: '价格歧视是垄断厂商获取更多利润的手段。' },
  ],
  references: ['高鸿业《西方经济学（微观部分）》第7章', '范里安《微观经济学：现代观点》第24-26章'],
};

// Module 3: 市场结构 - 寡头与博弈论
const topic_mi_03_03: Topic = {
  id: 'mi-03-03',
  moduleId: 'pe-exam-802-microeconomics',
  title: '寡头与博弈论',
  description: '寡头市场的特征、古诺模型、斯塔克伯格模型、囚徒困境',
  content: `# 寡头与博弈论

<Glossary terms="%5B%7B%22term%22%3A%22寡头%22%2C%22english%22%3A%22Oligopoly%22%2C%22definition%22%3A%22少数几个卖者控制的市场%22%7D%2C%7B%22term%22%3A%22纳什均衡%22%2C%22english%22%3A%22Nash%20Equilibrium%22%2C%22definition%22%3A%22给定他人策略，没有人有动机改变自己策略的状态%22%7D%2C%7B%22term%22%3A%22囚徒困境%22%2C%22english%22%3A%22Prisoner%27s%20Dilemma%22%2C%22definition%22%3A%22个体理性导致集体非理性的博弈%22%7D%5D" />

## 考情分析

- **题型**：简答题、计算题
- **考频**：★★ 博弈论是重要考点

## 核心知识点

**古诺模型**：产量竞争，同时决策，均衡产量低于完全竞争但高于垄断。

**斯塔克伯格模型**：产量竞争，领导者先决策，追随者后决策。

**囚徒困境**：个体理性导致集体非理性，解释了卡特尔不稳定性。

## 练习题

**1. 简答题**：什么是纳什均衡？举例说明。

**2. 计算题**：古诺模型求均衡产量。

## 参考资料

高鸿业《西方经济学（微观部分）》第8章
范里安《微观经济学：现代观点》第28-29章`,
  quizzes: [
    { id: 'mi-q-03-03a', type: 'short-answer', question: '什么是纳什均衡？', answer: '给定他人策略，没有人有动机改变自己策略的状态。', explanation: '纳什均衡是博弈论的核心概念。' },
  ],
  references: ['高鸿业《西方经济学（微观部分）》第8章', '范里安《微观经济学：现代观点》第28-29章'],
};

// Module 3: 市场结构 - 垄断竞争
const topic_mi_03_04: Topic = {
  id: 'mi-03-04',
  moduleId: 'pe-exam-802-microeconomics',
  title: '垄断竞争',
  description: '垄断竞争的特征、短期与长期均衡、广告与品牌',
  content: `# 垄断竞争

<Glossary terms="%5B%7B%22term%22%3A%22垄断竞争%22%2C%22english%22%3A%22Monopolistic%20Competition%22%2C%22definition%22%3A%22许多卖者、产品差异化、自由进出的市场%22%7D%5D" />

## 考情分析

- **题型**：简答题
- **考频**：★ 考频较低

## 核心知识点

**垄断竞争**特征：许多卖者、产品差异化、自由进出。

**短期均衡**：MR=MC，可能有经济利润。

**长期均衡**：P=AC，经济利润为零，但P>MC，存在过剩产能。

## 练习题

**1. 简答题**：垄断竞争与完全竞争有何异同？

## 参考资料

高鸿业《西方经济学（微观部分）》第8章`,
  quizzes: [
    { id: 'mi-q-03-04a', type: 'short-answer', question: '垄断竞争与完全竞争有何异同？', answer: '相同：长期经济利润为零。不同：垄断竞争有产品差异化，P>MC，存在过剩产能。', explanation: '垄断竞争是现实中最常见的市场结构。' },
  ],
  references: ['高鸿业《西方经济学（微观部分）》第8章'],
};

// Module 4: 一般均衡
const topic_mi_04_01: Topic = {
  id: 'mi-04-01',
  moduleId: 'pe-exam-802-microeconomics',
  title: '一般均衡与福利经济学',
  description: '一般均衡的概念、帕累托最优、福利经济学定理',
  content: `# 一般均衡与福利经济学

<Glossary terms="%5B%7B%22term%22%3A%22一般均衡%22%2C%22english%22%3A%22General%20Equilibrium%22%2C%22definition%22%3A%22所有市场同时达到均衡的状态%22%7D%2C%7B%22term%22%3A%22帕累托最优%22%2C%22english%22%3A%22Pareto%20Optimality%22%2C%22definition%22%3A%22不可能在不损害他人的情况下使某人更好的状态%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★★ 福利经济学是重要理论

## 核心知识点

**一般均衡**：所有市场同时达到均衡。

**帕累托最优**的三个条件：
1. 交换最优：MRSxy(A) = MRSxy(B)
2. 生产最优：MRTSxy(A) = MRTSxy(B)
3. 交换与生产最优：MRSxy = MRTxy

**福利经济学第一定理**：完全竞争均衡是帕累托最优的。

## 练习题

**1. 简答题**：帕累托最优的三个条件是什么？

**2. 论述题**：试论福利经济学第一定理及其政策含义。

## 参考资料

高鸿业《西方经济学（微观部分）》第9章
范里安《微观经济学：现代观点》第30-32章`,
  quizzes: [
    { id: 'mi-q-04-01a', type: 'short-answer', question: '帕累托最优的三个条件是什么？', answer: '(1)交换最优：MRSxy(A)=MRSxy(B)；(2)生产最优：MRTSxy(A)=MRTSxy(B)；(3)交换与生产最优：MRSxy=MRTxy。', explanation: '三个条件分别对应消费、生产和资源配置的效率。' },
  ],
  references: ['高鸿业《西方经济学（微观部分）》第9章', '范里安《微观经济学：现代观点》第30-32章'],
};

// Module 5: 市场失灵 - 外部性与公共物品
const topic_mi_05_01: Topic = {
  id: 'mi-05-01',
  moduleId: 'pe-exam-802-microeconomics',
  title: '外部性与公共物品',
  description: '外部性的概念、科斯定理、公共物品的特征',
  content: `# 外部性与公共物品

<Glossary terms="%5B%7B%22term%22%3A%22外部性%22%2C%22english%22%3A%22Externality%22%2C%22definition%22%3A%22经济主体的行为对第三方产生的未补偿影响%22%7D%2C%7B%22term%22%3A%22科斯定理%22%2C%22english%22%3A%22Coase%20Theorem%22%2C%22definition%22%3A%22产权明确且交易成本为零时，资源配置与产权初始分配无关%22%7D%2C%7B%22term%22%3A%22公共物品%22%2C%22english%22%3A%22Public%20Goods%22%2C%22definition%22%3A%22具有非竞争性和非排他性的物品%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★★★ 市场失灵是高频考点

## 核心知识点

**外部性**：正外部性（教育）和负外部性（污染）。导致市场失灵，需要政府干预。

**科斯定理**：产权明确且交易成本为零时，市场可以自行解决外部性问题。

**公共物品**：非竞争性和非排他性。存在"搭便车"问题，需要政府提供。

## 练习题

**1. 简答题**：什么是外部性？如何纠正外部性？

**2. 论述题**：试论市场失灵的原因及对策。

## 参考资料

高鸿业《西方经济学（微观部分）》第10章`,
  quizzes: [
    { id: 'mi-q-05-01a', type: 'short-answer', question: '什么是外部性？如何纠正外部性？', answer: '外部性是经济主体的行为对第三方产生的未补偿影响。纠正方法：税收/补贴、产权界定（科斯定理）、政府管制。', explanation: '外部性是市场失灵的重要原因之一。' },
  ],
  references: ['高鸿业《西方经济学（微观部分）》第10章'],
};

// Module 5: 市场失灵 - 信息不对称
const topic_mi_05_02: Topic = {
  id: 'mi-05-02',
  moduleId: 'pe-exam-802-microeconomics',
  title: '信息不对称',
  description: '逆向选择、道德风险、信号传递、委托代理问题',
  content: `# 信息不对称

<Glossary terms="%5B%7B%22term%22%3A%22逆向选择%22%2C%22english%22%3A%22Adverse%20Selection%22%2C%22definition%22%3A%22事前信息不对称导致的市场失灵%22%7D%2C%7B%22term%22%3A%22道德风险%22%2C%22english%22%3A%22Moral%20Hazard%22%2C%22definition%22%3A%22事后信息不对称导致的行为扭曲%22%7D%2C%7B%22term%22%3A%22信号传递%22%2C%22english%22%3A%22Signaling%22%2C%22definition%22%3A%22信息优势方主动传递信息%22%7D%5D" />

## 考情分析

- **题型**：简答题、论述题
- **考频**：★★★ 信息经济学是高频考点

## 核心知识点

**逆向选择**：事前信息不对称，劣质品驱逐优质品（如二手车市场）。

**道德风险**：事后信息不对称，行为人隐藏行动损害对方利益（如保险市场）。

**信号传递**：信息优势方主动传递信号（如教育信号）。

**委托代理问题**：委托人与代理人目标不一致，需要激励机制。

## 练习题

**1. 简答题**：什么是逆向选择？如何解决？

**2. 论述题**：试论信息不对称对市场效率的影响。

## 参考资料

高鸿业《西方经济学（微观部分）》第11章`,
  quizzes: [
    { id: 'mi-q-05-02a', type: 'short-answer', question: '什么是逆向选择？如何解决？', answer: '逆向选择是事前信息不对称导致劣质品驱逐优质品。解决方法：信号传递、信息甄别、政府干预。', explanation: '逆向选择是信息不对称的重要表现。' },
  ],
  references: ['高鸿业《西方经济学（微观部分）》第11章'],
};

// Export all 12 topics
export const topics: Topic[] = [
  topic_mi_01_01, topic_mi_01_02, topic_mi_01_03,
  topic_mi_02_01, topic_mi_02_02,
  topic_mi_03_01, topic_mi_03_02, topic_mi_03_03, topic_mi_03_04,
  topic_mi_04_01,
  topic_mi_05_01, topic_mi_05_02,
];
