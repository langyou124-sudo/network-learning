import { Topic } from '@/types';

const pr_01_01: Topic = {
  id: 'pr-01-01',
  moduleId: 'pe-exam-303-probability',
  title: '随机事件与概率',
  description: '随机事件、概率的定义与性质、古典概型',
  content: `# 随机事件与概率

<Glossary terms="%5B%7B%22term%22%3A%22%E6%A6%82%E7%8E%87%22%2C%22english%22%3A%22Probability%22%2C%22definition%22%3A%22%E4%BA%8B%E4%BB%B6%E5%8F%91%E7%94%9F%E7%9A%84%E5%8F%AF%E8%83%BD%E6%80%A7%E5%A4%A7%E5%B0%8F%22%7D%2C%7B%22term%22%3A%22%E5%8F%A4%E5%85%B8%E6%A6%82%E5%9E%8B%22%2C%22english%22%3A%22Classical%20Probability%22%2C%22definition%22%3A%22P(A)%3Dm%2Fn%EF%BC%8C%E7%AD%89%E5%8F%AF%E8%83%BD%E7%BB%93%E6%9E%9C%22%7D%5D" />

## 考情分析

- **题型**：选择题、填空题
- **考频**：★★ 概率基础

## 核心知识点

**概率性质**：0≤P(A)≤1, P(Ω)=1, P(∅)=0

**加法公式**：P(A∪B)=P(A)+P(B)-P(AB)

**古典概型**：P(A)=m/n（有利结果数/总结果数）

**几何概型**：P(A)=S_A/S（面积比）

## 练习题

**1. 选择题**：P(A∪B)=（）

## 参考资料

《概率论与数理统计》（浙大版）第1章`,
  quizzes: [
    { id: 'pr-q-01-01a', type: 'fill', question: 'P(A∪B) = ______', answer: 'P(A)+P(B)-P(AB)', explanation: '这是概率的加法公式。' },
  ],
  references: ['《概率论与数理统计》（浙大版）第1章'],
};

const pr_01_02: Topic = {
  id: 'pr-01-02',
  moduleId: 'pe-exam-303-probability',
  title: '条件概率与独立性',
  description: '条件概率、乘法公式、全概率公式、贝叶斯公式',
  content: `# 条件概率与独立性

<Glossary terms="%5B%7B%22term%22%3A%22%E6%9D%A1%E4%BB%B6%E6%A6%82%E7%8E%87%22%2C%22english%22%3A%22Conditional%20Probability%22%2C%22definition%22%3A%22P(A%7CB)%3DP(AB)%2FP(B)%22%7D%2C%7B%22term%22%3A%22%E7%8B%AC%E7%AB%8B%22%2C%22english%22%3A%22Independent%22%2C%22definition%22%3A%22P(AB)%3DP(A)P(B)%22%7D%2C%7B%22term%22%3A%22%E8%B4%9D%E5%8F%B6%E6%96%AF%E5%85%AC%E5%BC%8F%22%2C%22english%22%3A%22Bayes%27%20Formula%22%2C%22definition%22%3A%22P(A%E2%82%96%7CB)%3DP(B%7CA%E2%82%96)P(A%E2%82%96)%2F%CE%A3P(B%7CA%E1%B5%8A)P(A%E1%B5%8A)%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★★ 条件概率和贝叶斯公式是重点

## 核心公式

**条件概率**：P(A|B)=P(AB)/P(B)

**乘法公式**：P(AB)=P(A)P(B|A)

**全概率公式**：P(B)=ΣP(Aᵢ)P(B|Aᵢ)

**贝叶斯公式**：P(Aₖ|B)=P(B|Aₖ)P(Aₖ)/ΣP(B|Aᵢ)P(Aᵢ)

**独立**：P(AB)=P(A)P(B)

## 练习题

**1. 计算题**：用贝叶斯公式求后验概率

## 参考资料

《概率论与数理统计》（浙大版）第1章`,
  quizzes: [
    { id: 'pr-q-01-02a', type: 'short-answer', question: '什么是贝叶斯公式？', answer: 'P(Aₖ|B)=P(B|Aₖ)P(Aₖ)/ΣP(B|Aᵢ)P(Aᵢ)，由先验概率和似然函数求后验概率。', explanation: '贝叶斯公式是"由果溯因"的重要工具。' },
  ],
  references: ['《概率论与数理统计》（浙大版）第1章'],
};

const pr_02_01: Topic = {
  id: 'pr-02-01',
  moduleId: 'pe-exam-303-probability',
  title: '一维随机变量',
  description: '离散型随机变量、连续型随机变量、常见分布',
  content: `# 一维随机变量

<Glossary terms="%5B%7B%22term%22%3A%22%E5%88%86%E5%B8%83%E5%87%BD%E6%95%B0%22%2C%22english%22%3A%22CDF%22%2C%22definition%22%3A%22F(x)%3DP(X%E2%89%A4x)%22%7D%2C%7B%22term%22%3A%22%E6%A6%82%E7%8E%87%E5%AF%86%E5%BA%A6%22%2C%22english%22%3A%22PDF%22%2C%22definition%22%3A%22f(x)%3DF%27(x)%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★★ 随机变量是核心

## 核心知识点

**离散型**：分布律P(X=xₖ)=pₖ

**连续型**：密度函数f(x)，F(x)=∫(-∞,x) f(t)dt

**常见分布**：
- 二项分布 B(n,p)
- 泊松分布 P(λ)
- 均匀分布 U(a,b)
- 指数分布 E(λ)
- 正态分布 N(μ,σ²)

## 练习题

**1. 计算题**：求正态分布的概率

## 参考资料

《概率论与数理统计》（浙大版）第2章`,
  quizzes: [
    { id: 'pr-q-02-01a', type: 'short-answer', question: '什么是分布函数？', answer: 'F(x)=P(X≤x)，表示随机变量X取值不超过x的概率。', explanation: '分布函数完整描述了随机变量的概率规律。' },
  ],
  references: ['《概率论与数理统计》（浙大版）第2章'],
};

const pr_02_02: Topic = {
  id: 'pr-02-02',
  moduleId: 'pe-exam-303-probability',
  title: '多维随机变量',
  description: '联合分布、边缘分布、条件分布、独立性',
  content: `# 多维随机变量

<Glossary terms="%5B%7B%22term%22%3A%22%E8%81%94%E5%90%88%E5%88%86%E5%B8%83%22%2C%22english%22%3A%22Joint%20Distribution%22%2C%22definition%22%3A%22F(x%2Cy)%3DP(X%E2%89%A4x%2CY%E2%89%A4y)%22%7D%2C%7B%22term%22%3A%22%E8%BE%B9%E7%BC%98%E5%88%86%E5%B8%83%22%2C%22english%22%3A%22Marginal%20Distribution%22%2C%22definition%22%3A%22%E7%94%B1%E8%81%94%E5%90%88%E5%88%86%E5%B8%83%E6%B1%82%E5%8D%95%E4%B8%AA%E5%8F%98%E9%87%8F%E7%9A%84%E5%88%86%E5%B8%83%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★ 二维随机变量是重点

## 核心知识点

**联合分布**：F(x,y)=P(X≤x,Y≤y)

**边缘分布**：f_X(x)=∫f(x,y)dy

**独立**：f(x,y)=f_X(x)·f_Y(y)

**条件分布**：f(y|x)=f(x,y)/f_X(x)

## 练习题

**1. 计算题**：求二维正态分布的边缘分布

## 参考资料

《概率论与数理统计》（浙大版）第3章`,
  quizzes: [
    { id: 'pr-q-02-02a', type: 'short-answer', question: '什么是边缘分布？', answer: '由联合分布求单个变量的分布。f_X(x)=∫f(x,y)dy。', explanation: '边缘分布是联合分布的"投影"。' },
  ],
  references: ['《概率论与数理统计》（浙大版）第3章'],
};

const pr_03_01: Topic = {
  id: 'pr-03-01',
  moduleId: 'pe-exam-303-probability',
  title: '期望方差协方差',
  description: '数学期望、方差、协方差、相关系数',
  content: `# 期望方差协方差

<Glossary terms="%5B%7B%22term%22%3A%22%E6%9C%9F%E6%9C%9B%22%2C%22english%22%3A%22Expectation%22%2C%22definition%22%3A%22E(X)%3D%CE%A3x%E1%B5%8Fp%E1%B5%8F%E6%88%96%E2%88%ABxf(x)dx%22%7D%2C%7B%22term%22%3A%22%E6%96%B9%E5%B7%AE%22%2C%22english%22%3A%22Variance%22%2C%22definition%22%3A%22D(X)%3DE(X%C2%B2)-%5BE(X)%5D%C2%B2%22%7D%2C%7B%22term%22%3A%22%E5%8D%8F%E6%96%B9%E5%B7%AE%22%2C%22english%22%3A%22Covariance%22%2C%22definition%22%3A%22Cov(X%2CY)%3DE(XY)-E(X)E(Y)%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★★ 数字特征是重点

## 核心公式

**期望**：E(X)=Σxₖpₖ 或 ∫xf(x)dx

**方差**：D(X)=E(X²)-[E(X)]²

**协方差**：Cov(X,Y)=E(XY)-E(X)E(Y)

**相关系数**：ρ=Cov(X,Y)/√(D(X)D(Y))

**性质**：E(aX+bY)=aE(X)+bE(Y), D(X+Y)=D(X)+D(Y)+2Cov(X,Y)

## 练习题

**1. 计算题**：求二项分布的期望和方差

## 参考资料

《概率论与数理统计》（浙大版）第4章`,
  quizzes: [
    { id: 'pr-q-03-01a', type: 'fill', question: 'D(X) = ______', answer: 'E(X²)-[E(X)]²', explanation: '方差等于平方的期望减去期望的平方。' },
  ],
  references: ['《概率论与数理统计》（浙大版）第4章'],
};

const pr_04_01: Topic = {
  id: 'pr-04-01',
  moduleId: 'pe-exam-303-probability',
  title: '大数定律与中心极限定理',
  description: '大数定律、中心极限定理',
  content: `# 大数定律与中心极限定理

<Glossary terms="%5B%7B%22term%22%3A%22%E5%A4%A7%E6%95%B0%E5%AE%9A%E5%BE%8B%22%2C%22english%22%3A%22Law%20of%20Large%20Numbers%22%2C%22definition%22%3A%22%E6%A0%B7%E6%9C%AC%E5%9D%87%E5%80%BC%E4%BE%9D%E6%A6%82%E7%8E%87%E6%94%B6%E6%95%9B%E4%BA%8E%E6%80%BB%E4%BD%93%E5%9D%87%E5%80%BC%22%7D%2C%7B%22term%22%3A%22%E4%B8%AD%E5%BF%83%E6%9E%81%E9%99%90%E5%AE%9A%E7%90%86%22%2C%22english%22%3A%22Central%20Limit%20Theorem%22%2C%22definition%22%3A%22%E6%A0%B7%E6%9C%AC%E5%9D%87%E5%80%BC%E7%9A%84%E6%A0%87%E5%87%86%E5%8C%96%E8%BF%91%E4%BC%BC%E6%9C%8D%E4%BB%8E%E6%AD%A3%E6%80%81%E5%88%86%E5%B8%83%22%7D%5D" />

## 考情分析

- **题型**：简答题、计算题
- **考频**：★★ 极限定理是重点

## 核心定理

**大数定律**：样本均值依概率收敛于总体均值

**中心极限定理**：大量独立同分布随机变量之和近似服从正态分布

## 练习题

**1. 简答题**：什么是中心极限定理？

## 参考资料

《概率论与数理统计》（浙大版）第5章`,
  quizzes: [
    { id: 'pr-q-04-01a', type: 'short-answer', question: '什么是中心极限定理？', answer: '大量独立同分布随机变量之和的标准化近似服从标准正态分布。', explanation: '中心极限定理解释了正态分布的普遍性。' },
  ],
  references: ['《概率论与数理统计》（浙大版）第5章'],
};

const pr_05_01: Topic = {
  id: 'pr-05-01',
  moduleId: 'pe-exam-303-probability',
  title: '数理统计基础',
  description: '总体与样本、统计量、抽样分布',
  content: `# 数理统计基础

<Glossary terms="%5B%7B%22term%22%3A%22%E7%BB%9F%E8%AE%A1%E9%87%8F%22%2C%22english%22%3A%22Statistic%22%2C%22definition%22%3A%22%E6%A0%B7%E6%9C%AC%E7%9A%84%E5%87%BD%E6%95%B0%22%7D%2C%7B%22term%22%3A%22%E6%8A%BD%E6%A0%B7%E5%88%86%E5%B8%83%22%2C%22english%22%3A%22Sampling%20Distribution%22%2C%22definition%22%3A%22%E7%BB%9F%E8%AE%A1%E9%87%8F%E7%9A%84%E5%88%86%E5%B8%83%22%7D%5D" />

## 考情分析

- **题型**：选择题、填空题
- **考频**：★★ 统计基础

## 核心知识点

**常见统计量**：样本均值X̄、样本方差S²

**三大分布**：
- χ²分布：n个标准正态平方和
- t分布：标准正态/√(χ²/n)
- F分布：两个χ²之比

**抽样分布**：
- X̄ ~ N(μ, σ²/n)
- (n-1)S²/σ² ~ χ²(n-1)

## 练习题

**1. 选择题**：样本均值的期望等于（）

## 参考资料

《概率论与数理统计》（浙大版）第6章`,
  quizzes: [
    { id: 'pr-q-05-01a', type: 'fill', question: 'E(X̄) = ______', answer: 'μ', explanation: '样本均值的期望等于总体均值。' },
  ],
  references: ['《概率论与数理统计》（浙大版）第6章'],
};

const pr_05_02: Topic = {
  id: 'pr-05-02',
  moduleId: 'pe-exam-303-probability',
  title: '参数估计',
  description: '点估计、矩估计、最大似然估计、区间估计',
  content: `# 参数估计

<Glossary terms="%5B%7B%22term%22%3A%22%E7%82%B9%E4%BC%B0%E8%AE%A1%22%2C%22english%22%3A%22Point%20Estimation%22%2C%22definition%22%3A%22%E7%94%A8%E4%B8%80%E4%B8%AA%E5%80%BC%E4%BC%B0%E8%AE%A1%E6%9C%AA%E7%9F%A5%E5%8F%82%E6%95%B0%22%7D%2C%7B%22term%22%3A%22%E7%9F%A9%E4%BC%B0%E8%AE%A1%22%2C%22english%22%3A%22Method%20of%20Moments%22%2C%22definition%22%3A%22%E7%94%A8%E6%A0%B7%E6%9C%AC%E7%9F%A9%E4%BB%A3%E6%9B%BF%E6%80%BB%E4%BD%93%E7%9F%A9%22%7D%2C%7B%22term%22%3A%22%E6%9C%80%E5%A4%A7%E4%BC%BC%E7%84%B6%E4%BC%B0%E8%AE%A1%22%2C%22english%22%3A%22Maximum%20Likelihood%20Estimation%22%2C%22definition%22%3A%22%E4%BD%BF%E6%A0%B7%E6%9C%AC%E5%87%BA%E7%8E%B0%E6%A6%82%E7%8E%87%E6%9C%80%E5%A4%A7%E7%9A%84%E5%8F%82%E6%95%B0%E5%80%BC%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★★ 参数估计是重点

## 核心方法

**矩估计**：用样本矩代替总体矩，解方程

**最大似然估计**：
1. 写似然函数L(θ)=Πf(xᵢ;θ)
2. 取对数ln L(θ)
3. 求导令其为0，解出θ

**区间估计**：求置信区间

## 练习题

**1. 计算题**：求正态总体均值的最大似然估计

## 参考资料

《概率论与数理统计》（浙大版）第7章`,
  quizzes: [
    { id: 'pr-q-05-02a', type: 'short-answer', question: '什么是最大似然估计？', answer: '使样本出现概率最大的参数值。步骤：写似然函数→取对数→求导→解方程。', explanation: '最大似然估计是最常用的点估计方法。' },
  ],
  references: ['《概率论与数理统计》（浙大版）第7章'],
};

export const topics: Topic[] = [
  pr_01_01, pr_01_02,
  pr_02_01, pr_02_02,
  pr_03_01,
  pr_04_01,
  pr_05_01, pr_05_02,
];
