import { Topic } from '@/types';

const la_01_01: Topic = {
  id: 'la-01-01',
  moduleId: 'pe-exam-303-linear-algebra',
  title: '行列式计算',
  description: '行列式的定义、性质、计算方法',
  content: `# 行列式计算

<Glossary terms="%5B%7B%22term%22%3A%22%E8%A1%8C%E5%88%97%E5%BC%8F%22%2C%22english%22%3A%22Determinant%22%2C%22definition%22%3A%22n%C2%B2%E4%B8%AA%E6%95%B0%E6%8C%89%E4%B8%80%E5%AE%9A%E8%A7%84%E5%88%99%E6%8E%92%E5%88%97%E7%9A%84%E4%B8%80%E4%B8%AA%E6%95%B0%22%7D%5D" />

## 考情分析

- **题型**：计算题、填空题
- **考频**：★★★ 行列式是线性代数基础

## 核心方法

**二阶**：|A|=a₁₁a₂₂-a₁₂a₂₁

**三阶**：对角线法则

**n阶**：
- 按行/列展开：|A|=ΣaᵢⱼAᵢⱼ（代数余子式）
- 化为上三角：主对角线乘积

**性质**：
- 转置不变：|A^T|=|A|
- 行交换变号
- 某行乘k等于|A|乘k

## 练习题

**1. 计算题**：求三阶行列式

## 参考资料

《线性代数》（同济大学）第1章`,
  quizzes: [
    { id: 'la-q-01-01a', type: 'short-answer', question: '行列式按行展开的公式是什么？', answer: '|A|=Σ(j=1→n) aᵢⱼAᵢⱼ，其中Aᵢⱼ是代数余子式。', explanation: '按行展开是计算高阶行列式的基本方法。' },
  ],
  references: ['《线性代数》（同济大学）第1章'],
};

const la_02_01: Topic = {
  id: 'la-02-01',
  moduleId: 'pe-exam-303-linear-algebra',
  title: '矩阵运算与逆矩阵',
  description: '矩阵的加法、乘法、转置、逆矩阵',
  content: `# 矩阵运算与逆矩阵

<Glossary terms="%5B%7B%22term%22%3A%22%E7%9F%A9%E9%98%B5%22%2C%22english%22%3A%22Matrix%22%2C%22definition%22%3A%22m%C3%97n%E4%B8%AA%E6%95%B0%E6%8E%92%E6%88%90m%E8%A1%8Cn%E5%88%97%E7%9A%84%E6%95%B0%E8%A1%A8%22%7D%2C%7B%22term%22%3A%22%E9%80%86%E7%9F%A9%E9%98%B5%22%2C%22english%22%3A%22Inverse%20Matrix%22%2C%22definition%22%3A%22AB%3DBA%3DI%EF%BC%8C%E5%88%99B%3DA%5E(-1)%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★★ 矩阵运算是基础

## 核心知识点

**运算**：加法、数乘、乘法（注意不可交换）、转置

**逆矩阵**：AB=BA=I，则B=A^(-1)
- 求法：(A|I) → 初等行变换 → (I|A^(-1))
- 公式：A^(-1) = (1/|A|) A*（伴随矩阵法）

**初等矩阵**：单位矩阵经过一次初等变换得到

## 练习题

**1. 计算题**：求矩阵的逆

## 参考资料

《线性代数》（同济大学）第2章`,
  quizzes: [
    { id: 'la-q-02-01a', type: 'short-answer', question: '矩阵乘法满足交换律吗？', answer: '不满足。一般AB≠BA。', explanation: '矩阵乘法不满足交换律，这是与数乘的重要区别。' },
  ],
  references: ['《线性代数》（同济大学）第2章'],
};

const la_02_02: Topic = {
  id: 'la-02-02',
  moduleId: 'pe-exam-303-linear-algebra',
  title: '矩阵的秩与初等变换',
  description: '矩阵的秩、初等行变换、阶梯形矩阵',
  content: `# 矩阵的秩与初等变换

<Glossary terms="%5B%7B%22term%22%3A%22%E7%A7%A9%22%2C%22english%22%3A%22Rank%22%2C%22definition%22%3A%22%E7%9F%A9%E9%98%B5%E4%B8%AD%E6%9C%80%E5%A4%A7%E9%9D%9E%E9%9B%B6%E5%AD%90%E5%BC%8F%E7%9A%84%E9%98%B6%E6%95%B0%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★ 秩的概念很重要

## 核心知识点

**秩**r(A)：矩阵中最大非零子式的阶数。等价于阶梯形矩阵中非零行的个数。

**初等行变换**：
1. 交换两行
2. 某行乘非零常数
3. 某行加上另一行的倍数

**阶梯形矩阵**：非零行的首非零元列标严格递增

## 练习题

**1. 计算题**：用初等行变换求矩阵的秩

## 参考资料

《线性代数》（同济大学）第2章`,
  quizzes: [
    { id: 'la-q-02-02a', type: 'short-answer', question: '什么是矩阵的秩？', answer: '矩阵中最大非零子式的阶数，等价于阶梯形矩阵中非零行的个数。', explanation: '秩是矩阵最重要的数字特征之一。' },
  ],
  references: ['《线性代数》（同济大学）第2章'],
};

const la_03_01: Topic = {
  id: 'la-03-01',
  moduleId: 'pe-exam-303-linear-algebra',
  title: '向量组的线性相关性',
  description: '线性表示、线性相关与无关、极大线性无关组',
  content: `# 向量组的线性相关性

<Glossary terms="%5B%7B%22term%22%3A%22%E7%BA%BF%E6%80%A7%E7%9B%B8%E5%85%B3%22%2C%22english%22%3A%22Linearly%20Dependent%22%2C%22definition%22%3A%22%E5%AD%98%E5%9C%A8%E4%B8%8D%E5%85%A8%E4%B8%BA%E9%9B%B6%E7%9A%84k%E4%BD%BFk%E2%82%81%CE%B1%E2%82%81%2B...%2Bk%E2%82%99%CE%B1%E2%82%99%3D0%22%7D%2C%7B%22term%22%3A%22%E6%9E%81%E5%A4%A7%E7%BA%BF%E6%80%A7%E6%97%A0%E5%85%B3%E7%BB%84%22%2C%22english%22%3A%22Maximal%20Linearly%20Independent%20Set%22%2C%22definition%22%3A%22%E5%90%91%E9%87%8F%E7%BB%84%E4%B8%AD%E6%9C%80%E5%A4%A7%E7%9A%84%E7%BA%BF%E6%80%A7%E6%97%A0%E5%85%B3%E5%AD%90%E7%BB%84%22%7D%5D" />

## 考情分析

- **题型**：证明题、计算题
- **考频**：★★★ 线性相关性是核心概念

## 核心知识点

**线性表示**：β=k₁α₁+...+kₙαₙ

**线性相关**：存在不全为零的k使k₁α₁+...+kₙαₙ=0

**线性无关**：只有k全为零时才成立

**极大线性无关组**：向量组中最大的线性无关子组，其向量个数等于秩

## 练习题

**1. 证明题**：证明向量组的线性相关性

## 参考资料

《线性代数》（同济大学）第3章`,
  quizzes: [
    { id: 'la-q-03-01a', type: 'short-answer', question: '什么是线性相关？', answer: '存在不全为零的k₁,...,kₙ使k₁α₁+...+kₙαₙ=0。', explanation: '线性相关意味着向量之间存在"多余"的关系。' },
  ],
  references: ['《线性代数》（同济大学）第3章'],
};

const la_04_01: Topic = {
  id: 'la-04-01',
  moduleId: 'pe-exam-303-linear-algebra',
  title: '线性方程组',
  description: '齐次方程组、非齐次方程组、解的结构',
  content: `# 线性方程组

<Glossary terms="%5B%7B%22term%22%3A%22%E9%BD%90%E6%AC%A1%E6%96%B9%E7%A8%8B%E7%BB%84%22%2C%22english%22%3A%22Homogeneous%20System%22%2C%22definition%22%3A%22Ax%3D0%22%7D%2C%7B%22term%22%3A%22%E9%9D%9E%E9%BD%90%E6%AC%A1%E6%96%B9%E7%A8%8B%E7%BB%84%22%2C%22english%22%3A%22Non-homogeneous%20System%22%2C%22definition%22%3A%22Ax%3Db%22%7D%5D" />

## 考情分析

- **题型**：计算题、证明题
- **考频**：★★★ 方程组是核心考点

## 核心知识点

**齐次** Ax=0：
- 有非零解 ⟺ r(A)<n
- 解空间维数 = n - r(A)

**非齐次** Ax=b：
- 有解 ⟺ r(A)=r(A|b)
- 唯一解 ⟺ r(A)=r(A|b)=n
- 无穷多解 ⟺ r(A)=r(A|b)<n

**解的结构**：非齐次通解 = 齐次通解 + 非齐次特解

## 练习题

**1. 计算题**：求方程组的通解

## 参考资料

《线性代数》（同济大学）第4章`,
  quizzes: [
    { id: 'la-q-04-01a', type: 'short-answer', question: '非齐次方程组Ax=b有解的充要条件是什么？', answer: 'r(A)=r(A|b)，即系数矩阵的秩等于增广矩阵的秩。', explanation: '这是判断方程组是否有解的核心定理。' },
  ],
  references: ['《线性代数》（同济大学）第4章'],
};

const la_05_01: Topic = {
  id: 'la-05-01',
  moduleId: 'pe-exam-303-linear-algebra',
  title: '特征值与特征向量',
  description: '特征值、特征向量的定义与求法',
  content: `# 特征值与特征向量

<Glossary terms="%5B%7B%22term%22%3A%22%E7%89%B9%E5%BE%81%E5%80%BC%22%2C%22english%22%3A%22Eigenvalue%22%2C%22definition%22%3A%22Ax%3D%CE%BBx%EF%BC%8C%CE%BB%E6%98%AF%E7%89%B9%E5%BE%81%E5%80%BC%22%7D%2C%7B%22term%22%3A%22%E7%89%B9%E5%BE%81%E5%90%91%E9%87%8F%22%2C%22english%22%3A%22Eigenvector%22%2C%22definition%22%3A%22%E6%BB%A1%E8%B6%B3Ax%3D%CE%BBx%E7%9A%84%E9%9D%9E%E9%9B%B6%E5%90%91%E9%87%8Fx%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★★ 特征值是核心考点

## 核心方法

**求特征值**：解特征方程 |A-λI|=0

**求特征向量**：解 (A-λI)x=0

**性质**：
- Σλᵢ = tr(A)（迹）
- Πλᵢ = |A|

## 练习题

**1. 计算题**：求矩阵的特征值和特征向量

## 参考资料

《线性代数》（同济大学）第5章`,
  quizzes: [
    { id: 'la-q-05-01a', type: 'short-answer', question: '如何求矩阵的特征值？', answer: '解特征方程|A-λI|=0。', explanation: '特征方程是求特征值的关键。' },
  ],
  references: ['《线性代数》（同济大学）第5章'],
};

const la_05_02: Topic = {
  id: 'la-05-02',
  moduleId: 'pe-exam-303-linear-algebra',
  title: '相似对角化',
  description: '相似矩阵、对角化条件、实对称矩阵的对角化',
  content: `# 相似对角化

<Glossary terms="%5B%7B%22term%22%3A%22%E7%9B%B8%E4%BC%BC%22%2C%22english%22%3A%22Similar%22%2C%22definition%22%3A%22B%3DP%5E(-1)AP%22%7D%2C%7B%22term%22%3A%22%E5%AF%B9%E8%A7%92%E5%8C%96%22%2C%22english%22%3A%22Diagonalization%22%2C%22definition%22%3A%22A%E7%9B%B8%E4%BC%BC%E4%BA%8E%E5%AF%B9%E8%A7%92%E7%9F%A9%E9%98%B5%22%7D%5D" />

## 考情分析

- **题型**：计算题、证明题
- **考频**：★★★ 对角化是重点

## 核心知识点

**相似**：B=P^(-1)AP，相似矩阵有相同特征值

**可对角化条件**：n阶矩阵有n个线性无关的特征向量

**实对称矩阵**：一定可对角化，且可用正交矩阵对角化

## 练习题

**1. 计算题**：将矩阵对角化

## 参考资料

《线性代数》（同济大学）第5章`,
  quizzes: [
    { id: 'la-q-05-02a', type: 'short-answer', question: '矩阵可对角化的条件是什么？', answer: 'n阶矩阵有n个线性无关的特征向量。', explanation: '这是对角化的基本条件。' },
  ],
  references: ['《线性代数》（同济大学）第5章'],
};

const la_06_01: Topic = {
  id: 'la-06-01',
  moduleId: 'pe-exam-303-linear-algebra',
  title: '二次型与正定性',
  description: '二次型的标准形、正定二次型、正定矩阵',
  content: `# 二次型与正定性

<Glossary terms="%5B%7B%22term%22%3A%22%E4%BA%8C%E6%AC%A1%E5%9E%8B%22%2C%22english%22%3A%22Quadratic%20Form%22%2C%22definition%22%3A%22f%3Dx%5ETAx%22%7D%2C%7B%22term%22%3A%22%E6%AD%A3%E5%AE%9A%22%2C%22english%22%3A%22Positive%20Definite%22%2C%22definition%22%3A%22%E5%AF%B9%E4%BB%BB%E6%84%8Fx%E2%89%A20%EF%BC%8Cf%3Ex%5ETAx%3E0%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★ 二次型是常考内容

## 核心知识点

**二次型** f=x^TAx，通过正交变换化为标准形

**正定二次型**：对任意x≠0，f>0

**正定判定**：
- 特征值全大于0
- 顺序主子式全大于0

## 练习题

**1. 计算题**：判断二次型的正定性

## 参考资料

《线性代数》（同济大学）第6章`,
  quizzes: [
    { id: 'la-q-06-01a', type: 'short-answer', question: '如何判断矩阵是否正定？', answer: '(1)特征值全大于0；或(2)顺序主子式全大于0。', explanation: '两种方法都可以判断正定性。' },
  ],
  references: ['《线性代数》（同济大学）第6章'],
};

export const topics: Topic[] = [
  la_01_01,
  la_02_01, la_02_02,
  la_03_01,
  la_04_01,
  la_05_01, la_05_02,
  la_06_01,
];
