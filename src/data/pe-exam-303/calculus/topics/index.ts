import { Topic } from '@/types';

// ========== Module 1: 函数极限连续 ==========

const ca_01_01: Topic = {
  id: 'ca-01-01',
  moduleId: 'pe-exam-303-calculus',
  title: '函数与极限',
  description: '函数的概念、极限的定义、极限的性质与存在准则',
  content: `# 函数与极限

<Glossary terms="%5B%7B%22term%22%3A%22%E6%9E%81%E9%99%90%22%2C%22english%22%3A%22Limit%22%2C%22definition%22%3A%22%E5%BD%93x%E8%B6%8B%E8%BF%91%E6%9F%90%E4%B8%80%E7%82%B9%E6%97%B6%EF%BC%8C%E5%87%BD%E6%95%B0%E8%B6%8B%E8%BF%91%E7%9A%84%E5%80%BC%22%7D%2C%7B%22term%22%3A%22%E6%95%B0%E5%88%97%E6%9E%81%E9%99%90%22%2C%22english%22%3A%22Limit%20of%20Sequence%22%2C%22definition%22%3A%22%E5%BD%93n%E2%86%92%E2%88%9E%E6%97%B6%EF%BC%8Ca%E2%82%99%E8%B6%8B%E8%BF%91%E7%9A%84%E5%80%BC%22%7D%2C%7B%22term%22%3A%22%E5%A4%B9%E9%80%BC%E5%87%86%E5%88%99%22%2C%22english%22%3A%22Squeeze%20Theorem%22%2C%22definition%22%3A%22%E8%8B%A5f(x)%E2%89%A4g(x)%E2%89%A4h(x)%E4%B8%94lim%20f%3Dlim%20h%3DA%EF%BC%8C%E5%88%99lim%20g%3DA%22%7D%5D" />

## 考情分析

- **分值**：微积分占90分，极限是基础
- **题型**：选择题、填空题、计算题
- **考频**：★★★ 必考内容

## 核心公式

**数列极限**：lim(n→∞) aₙ = A ⟺ ∀ε>0, ∃N, 当n>N时 |aₙ-A|<ε

**函数极限**：lim(x→x₀) f(x) = A ⟺ ∀ε>0, ∃δ, 当0<|x-x₀|<δ时 |f(x)-A|<ε

**极限存在准则**：
- 夹逼准则：若f≤g≤h且lim f=lim h=A，则lim g=A
- 单调有界准则：单调有界数列必有极限
- 柯西收敛准则：数列收敛 ⟺ ∀ε>0, ∃N, 当m,n>N时 |aₘ-aₙ|<ε

## 常用极限

- lim(x→0) sin x/x = 1
- lim(x→0) (1+x)^(1/x) = e
- lim(x→∞) (1+1/x)^x = e
- lim(x→0) (e^x-1)/x = 1
- lim(x→0) ln(1+x)/x = 1

## 练习题

**1. 选择题**：lim(x→0) sin 3x/x = （）A. 0 B. 1 C. 3 D. 1/3

**2. 计算题**：求 lim(x→∞) (1+2/x)^x

## 参考资料

《高等数学》（同济大学）第1章
《微积分》（赵树嫄）第1章`,
  quizzes: [
    { id: 'ca-q-01-01a', type: 'choice', question: 'lim(x→0) sin 3x/x = （）', options: ['0', '1', '3', '1/3'], answer: '3', explanation: 'lim sin3x/x = 3·lim sin3x/(3x) = 3·1 = 3' },
    { id: 'ca-q-01-01b', type: 'fill', question: 'lim(x→∞) (1+1/x)^x = ______', answer: 'e', explanation: '这是自然常数e的定义。' },
  ],
  references: ['《高等数学》（同济大学）第1章'],
};

const ca_01_02: Topic = {
  id: 'ca-01-02',
  moduleId: 'pe-exam-303-calculus',
  title: '极限计算方法',
  description: '等价无穷小、洛必达法则、泰勒展开求极限',
  content: `# 极限计算方法

<Glossary terms="%5B%7B%22term%22%3A%22%E7%AD%89%E4%BB%B7%E6%97%A0%E7%A9%B7%E5%B0%8F%22%2C%22english%22%3A%22Equivalent%20Infinitesimal%22%2C%22definition%22%3A%22lim%20%CE%B1%2F%CE%B2%3D1%E5%88%99%CE%B1%E4%B8%8E%CE%B2%E7%AD%89%E4%BB%B7%22%7D%2C%7B%22term%22%3A%22%E6%B4%9B%E5%BF%85%E8%BE%BE%E6%B3%95%E5%88%99%22%2C%22english%22%3A%22L%27H%C3%B4pital%27s%20Rule%22%2C%22definition%22%3A%220%2F0%E6%88%96%E2%88%9E%2F%E2%88%9E%E5%9E%8B%E6%9E%81%E9%99%90%E5%8F%AF%E7%94%A8%E5%AF%BC%E6%95%B0%E4%B9%8B%E6%AF%94%22%7D%5D" />

## 考情分析

- **题型**：计算题必考
- **考频**：★★★ 极限计算是重中之重

## 核心方法

**等价无穷小替换**（x→0时）：
- sin x ~ x, tan x ~ x, arcsin x ~ x, arctan x ~ x
- 1-cos x ~ x²/2, e^x-1 ~ x, ln(1+x) ~ x
- (1+x)^α-1 ~ αx

**洛必达法则**：0/0型或∞/∞型，lim f(x)/g(x) = lim f'(x)/g'(x)

**泰勒展开**：e^x, sin x, cos x, ln(1+x), (1+x)^α 的展开式

## 练习题

**1. 计算题**：求 lim(x→0) (e^x-e^(-x)-2x)/(x-sin x)

**2. 计算题**：求 lim(x→0) (1-cos x)/(x²)

## 参考资料

《高等数学》（同济大学）第2章`,
  quizzes: [
    { id: 'ca-q-01-02a', type: 'fill', question: 'x→0时，1-cos x ~ ______', answer: 'x²/2', explanation: '1-cos x = 2sin²(x/2) ~ 2·(x/2)² = x²/2' },
    { id: 'ca-q-01-02b', type: 'short-answer', question: '洛必达法则适用于什么类型的极限？', answer: '0/0型或∞/∞型不定式极限。', explanation: '洛必达法则要求分子分母都趋于0或都趋于无穷。' },
  ],
  references: ['《高等数学》（同济大学）第2章'],
};

const ca_01_03: Topic = {
  id: 'ca-01-03',
  moduleId: 'pe-exam-303-calculus',
  title: '连续性与间断点',
  description: '连续的定义、间断点的分类、闭区间上连续函数的性质',
  content: `# 连续性与间断点

<Glossary terms="%5B%7B%22term%22%3A%22%E8%BF%9E%E7%BB%AD%22%2C%22english%22%3A%22Continuous%22%2C%22definition%22%3A%22lim(x%E2%86%92x%E2%82%80)%20f(x)%3Df(x%E2%82%80)%22%7D%2C%7B%22term%22%3A%22%E9%97%B4%E6%96%AD%E7%82%B9%22%2C%22english%22%3A%22Discontinuity%22%2C%22definition%22%3A%22%E4%B8%8D%E8%BF%9E%E7%BB%AD%E7%9A%84%E7%82%B9%22%7D%5D" />

## 考情分析

- **题型**：选择题、填空题
- **考频**：★★ 基础概念

## 核心知识点

**连续**：lim(x→x₀) f(x) = f(x₀)

**间断点分类**：
- 第一类：可去间断点（极限存在但≠函数值）、跳跃间断点（左右极限不等）
- 第二类：无穷间断点、振荡间断点

**闭区间连续函数性质**：有界性、最值定理、零点定理、介值定理

## 练习题

**1. 选择题**：x=0是f(x)=sin x/x的（）A.连续点 B.可去间断点 C.跳跃间断点 D.无穷间断点

## 参考资料

《高等数学》（同济大学）第1章`,
  quizzes: [
    { id: 'ca-q-01-03a', type: 'choice', question: 'x=0是f(x)=sin x/x的（）', options: ['连续点', '可去间断点', '跳跃间断点', '无穷间断点'], answer: '可去间断点', explanation: 'lim sin x/x = 1存在，但f(0)无定义，是可去间断点。' },
  ],
  references: ['《高等数学》（同济大学）第1章'],
};

// ========== Module 2: 一元微分 ==========

const ca_02_01: Topic = {
  id: 'ca-02-01',
  moduleId: 'pe-exam-303-calculus',
  title: '导数与微分',
  description: '导数的定义、求导法则、高阶导数、微分',
  content: `# 导数与微分

<Glossary terms="%5B%7B%22term%22%3A%22%E5%AF%BC%E6%95%B0%22%2C%22english%22%3A%22Derivative%22%2C%22definition%22%3A%22f%27(x)%3Dlim(%CE%94x%E2%86%920)%20%5Bf(x%2B%CE%94x)-f(x)%5D%2F%CE%94x%22%7D%2C%7B%22term%22%3A%22%E5%BE%AE%E5%88%86%22%2C%22english%22%3A%22Differential%22%2C%22definition%22%3A%22dy%3Df%27(x)dx%22%7D%5D" />

## 考情分析

- **题型**：计算题必考
- **考频**：★★★ 导数计算是基础

## 核心公式

**基本求导公式**：(x^n)'=nx^(n-1), (e^x)'=e^x, (ln x)'=1/x, (sin x)'=cos x, (cos x)'=-sin x

**求导法则**：(uv)'=u'v+uv', (u/v)'=(u'v-uv')/v², [f(g(x))]'=f'(g(x))·g'(x)

**隐函数求导**：方程两边对x求导，解出dy/dx

**参数方程求导**：dy/dx = (dy/dt)/(dx/dt)

## 练习题

**1. 计算题**：求 y=x^x 的导数

**2. 计算题**：求隐函数 x²+y²=1 的 dy/dx

## 参考资料

《高等数学》（同济大学）第2章`,
  quizzes: [
    { id: 'ca-q-02-01a', type: 'fill', question: '(e^x)\' = ______', answer: 'e^x', explanation: '指数函数e^x的导数等于其本身。' },
    { id: 'ca-q-02-01b', type: 'short-answer', question: '什么是隐函数求导？', answer: '方程两边同时对x求导，将y看作x的函数，然后解出dy/dx。', explanation: '隐函数求导不需要先解出y=f(x)。' },
  ],
  references: ['《高等数学》（同济大学）第2章'],
};

const ca_02_02: Topic = {
  id: 'ca-02-02',
  moduleId: 'pe-exam-303-calculus',
  title: '中值定理',
  description: '罗尔定理、拉格朗日中值定理、柯西中值定理、泰勒公式',
  content: `# 中值定理

<Glossary terms="%5B%7B%22term%22%3A%22%E7%BD%97%E5%B0%94%E5%AE%9A%E7%90%86%22%2C%22english%22%3A%22Rolle%27s%20Theorem%22%2C%22definition%22%3A%22f(a)%3Df(b)%E5%88%99%E2%88%83%CE%B8%EF%BC%8Cf%27(%CE%B8)%3D0%22%7D%2C%7B%22term%22%3A%22%E6%8B%89%E6%A0%BC%E6%9C%97%E6%97%A5%E4%B8%AD%E5%80%BC%E5%AE%9A%E7%90%86%22%2C%22english%22%3A%22Mean%20Value%20Theorem%22%2C%22definition%22%3A%22f(b)-f(a)%3Df%27(%CE%B8)(b-a)%22%7D%5D" />

## 考情分析

- **题型**：证明题、计算题
- **考频**：★★★ 中值定理是难点和重点

## 核心定理

**罗尔定理**：f在[a,b]连续，在(a,b)可导，f(a)=f(b)，则∃θ∈(a,b)，f'(θ)=0

**拉格朗日中值定理**：f在[a,b]连续，在(a,b)可导，则∃θ∈(a,b)，f(b)-f(a)=f'(θ)(b-a)

**柯西中值定理**：f,g在[a,b]连续，在(a,b)可导，g'(x)≠0，则∃θ∈(a,b)，[f(b)-f(a)]/[g(b)-g(a)]=f'(θ)/g'(θ)

**泰勒公式**：f(x)=f(x₀)+f'(x₀)(x-x₀)+f''(x₀)(x-x₀)²/2!+...+Rₙ(x)

## 练习题

**1. 证明题**：用罗尔定理证明方程 x³-3x+1=0 在(0,1)内有实根

**2. 计算题**：写出 e^x 在 x₀=0 处的n阶泰勒展开

## 参考资料

《高等数学》（同济大学）第3章`,
  quizzes: [
    { id: 'ca-q-02-02a', type: 'short-answer', question: '罗尔定理的三个条件是什么？', answer: '(1)f在[a,b]连续；(2)f在(a,b)可导；(3)f(a)=f(b)。', explanation: '三个条件缺一不可。' },
    { id: 'ca-q-02-02b', type: 'short-answer', question: '泰勒公式的意义是什么？', answer: '用多项式逼近函数，精度随阶数增加而提高。', explanation: '泰勒公式是函数逼近的重要工具。' },
  ],
  references: ['《高等数学》（同济大学）第3章'],
};

const ca_02_03: Topic = {
  id: 'ca-02-03',
  moduleId: 'pe-exam-303-calculus',
  title: '导数应用',
  description: '单调性、极值、凹凸性、拐点、渐近线',
  content: `# 导数应用

<Glossary terms="%5B%7B%22term%22%3A%22%E6%9E%81%E5%80%BC%22%2C%22english%22%3A%22Extremum%22%2C%22definition%22%3A%22%E5%87%BD%E6%95%B0%E5%9C%A8%E6%9F%90%E7%82%B9%E9%82%BB%E5%9F%9F%E5%86%85%E7%9A%84%E6%9C%80%E5%A4%A7%E6%88%96%E6%9C%80%E5%B0%8F%E5%80%BC%22%7D%2C%7B%22term%22%3A%22%E6%8B%90%E7%82%B9%22%2C%22english%22%3A%22Inflection%20Point%22%2C%22definition%22%3A%22%E5%87%B9%E5%87%B8%E6%80%A7%E6%94%B9%E5%8F%98%E7%9A%84%E7%82%B9%22%7D%5D" />

## 考情分析

- **题型**：计算题、应用题
- **考频**：★★ 导数应用是常考内容

## 核心知识点

**单调性**：f'(x)>0递增，f'(x)<0递减

**极值**：一阶导数为0的点（驻点），二阶导数判断：f''(x₀)>0极小，f''(x₀)<0极大

**凹凸性**：f''(x)>0凹（向上），f''(x)<0凸（向下）

**拐点**：凹凸性改变的点

## 练习题

**1. 计算题**：求 f(x)=x³-3x²+1 的极值和拐点

## 参考资料

《高等数学》（同济大学）第3章`,
  quizzes: [
    { id: 'ca-q-02-03a', type: 'short-answer', question: '如何用二阶导数判断极值？', answer: 'f\'(x₀)=0时，若f\'\'(x₀)>0则x₀是极小值点，若f\'\'(x₀)<0则x₀是极大值点。', explanation: '二阶导数判别法比一阶导数判别法更简便。' },
  ],
  references: ['《高等数学》（同济大学）第3章'],
};

// ========== Module 3: 一元积分 ==========

const ca_03_01: Topic = {
  id: 'ca-03-01',
  moduleId: 'pe-exam-303-calculus',
  title: '不定积分',
  description: '不定积分的概念、基本积分公式、换元法、分部积分法',
  content: `# 不定积分

<Glossary terms="%5B%7B%22term%22%3A%22%E4%B8%8D%E5%AE%9A%E7%A7%AF%E5%88%86%22%2C%22english%22%3A%22Indefinite%20Integral%22%2C%22definition%22%3A%22%E5%AF%BC%E6%95%B0%E7%9A%84%E9%80%86%E8%BF%90%E7%AE%97%EF%BC%8C%E2%88%ABf(x)dx%3DF(x)%2BC%22%7D%5D" />

## 考情分析

- **题型**：计算题必考
- **考频**：★★★ 积分计算是重点

## 核心方法

**基本积分公式**：∫x^n dx=x^(n+1)/(n+1)+C, ∫e^x dx=e^x+C, ∫1/x dx=ln|x|+C

**第一类换元**（凑微分）：∫f(g(x))g'(x)dx = ∫f(u)du

**第二类换元**：三角代换、倒代换

**分部积分**：∫u dv = uv - ∫v du

## 练习题

**1. 计算题**：求 ∫x·e^x dx

**2. 计算题**：求 ∫1/(1+x²) dx

## 参考资料

《高等数学》（同济大学）第4章`,
  quizzes: [
    { id: 'ca-q-03-01a', type: 'fill', question: '∫e^x dx = ______', answer: 'e^x + C', explanation: 'e^x的不定积分等于其本身加常数。' },
    { id: 'ca-q-03-01b', type: 'short-answer', question: '分部积分的公式是什么？', answer: '∫u dv = uv - ∫v du', explanation: '分部积分是乘积求导的逆运算。' },
  ],
  references: ['《高等数学》（同济大学）第4章'],
};

const ca_03_02: Topic = {
  id: 'ca-03-02',
  moduleId: 'pe-exam-303-calculus',
  title: '定积分',
  description: '定积分的定义、性质、牛顿-莱布尼茨公式',
  content: `# 定积分

<Glossary terms="%5B%7B%22term%22%3A%22%E5%AE%9A%E7%A7%AF%E5%88%86%22%2C%22english%22%3A%22Definite%20Integral%22%2C%22definition%22%3A%22%E2%88%AB(a%2Cb)f(x)dx%3DF(b)-F(a)%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★★ 定积分计算是重点

## 核心知识点

**定积分定义**：∫(a,b) f(x)dx = lim Σf(ξᵢ)Δxᵢ

**牛顿-莱布尼茨公式**：∫(a,b) f(x)dx = F(b)-F(a)

**性质**：线性、区间可加性、保号性、估值定理

**变限积分**：Φ(x)=∫(a,x) f(t)dt，则Φ'(x)=f(x)

## 练习题

**1. 计算题**：求 ∫(0,1) x² dx

**2. 计算题**：求 d/dx ∫(0,x²) e^t dt

## 参考资料

《高等数学》（同济大学）第5章`,
  quizzes: [
    { id: 'ca-q-03-02a', type: 'fill', question: '牛顿-莱布尼茨公式：∫(a,b) f(x)dx = ______', answer: 'F(b)-F(a)', explanation: '定积分等于原函数在积分上限和下限的差。' },
  ],
  references: ['《高等数学》（同济大学）第5章'],
};

const ca_03_03: Topic = {
  id: 'ca-03-03',
  moduleId: 'pe-exam-303-calculus',
  title: '定积分应用',
  description: '面积、体积、弧长、旋转体侧面积',
  content: `# 定积分应用

<Glossary terms="%5B%7B%22term%22%3A%22%E9%9D%A2%E7%A7%AF%22%2C%22english%22%3A%22Area%22%2C%22definition%22%3A%22S%3D%E2%88%AB(a%2Cb)%7Cf(x)-g(x)%7Cdx%22%7D%2C%7B%22term%22%3A%22%E6%97%8B%E8%BD%AC%E4%BD%93%E4%BD%93%E7%A7%AF%22%2C%22english%22%3A%22Volume%20of%20Revolution%22%2C%22definition%22%3A%22V%3D%CF%80%E2%88%AB(a%2Cb)f%C2%B2(x)dx%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★ 应用题常考

## 核心公式

**面积**：S=∫(a,b) |f(x)-g(x)| dx

**旋转体体积**：
- 绕x轴：V=π∫(a,b) f²(x) dx
- 绕y轴：V=2π∫(a,b) xf(x) dx（柱壳法）

**弧长**：L=∫(a,b) √(1+[f'(x)]²) dx

## 练习题

**1. 计算题**：求 y=x² 与 y=x 围成的面积

## 参考资料

《高等数学》（同济大学）第6章`,
  quizzes: [
    { id: 'ca-q-03-03a', type: 'short-answer', question: '旋转体体积的公式是什么？', answer: '绕x轴：V=π∫f²(x)dx；绕y轴：V=2π∫xf(x)dx。', explanation: '两种方法分别适用于不同的旋转轴。' },
  ],
  references: ['《高等数学》（同济大学）第6章'],
};

const ca_03_04: Topic = {
  id: 'ca-03-04',
  moduleId: 'pe-exam-303-calculus',
  title: '反常积分',
  description: '无穷限反常积分、无界函数反常积分、判别法',
  content: `# 反常积分

<Glossary terms="%5B%7B%22term%22%3A%22%E5%8F%8D%E5%B8%B8%E7%A7%AF%E5%88%86%22%2C%22english%22%3A%22Improper%20Integral%22%2C%22definition%22%3A%22%E7%A7%AF%E5%88%86%E5%8C%BA%E9%97%B4%E6%97%A0%E7%A9%B7%E6%88%96%E8%A2%AB%E7%A7%AF%E5%88%86%E5%87%BD%E6%95%B0%E6%97%A0%E7%95%8C%E7%9A%84%E7%A7%AF%E5%88%86%22%7D%5D" />

## 考情分析

- **题型**：计算题、选择题
- **考频**：★★ 判别敛散性是重点

## 核心知识点

**无穷限**：∫(a,+∞) f(x)dx = lim(b→+∞) ∫(a,b) f(x)dx

**无界函数**：∫(a,b) f(x)dx，f在某点无界

**比较判别法**：0≤f(x)≤g(x)，若∫g收敛则∫f收敛

**p积分**：∫(1,+∞) 1/x^p dx，p>1收敛，p≤1发散

## 练习题

**1. 选择题**：∫(1,+∞) 1/x² dx 收敛还是发散？

## 参考资料

《高等数学》（同济大学）第5章`,
  quizzes: [
    { id: 'ca-q-03-04a', type: 'choice', question: '∫(1,+∞) 1/x^p dx 在什么条件下收敛？', options: ['p>1', 'p<1', 'p=1', 'p>0'], answer: 'p>1', explanation: 'p积分在p>1时收敛，p≤1时发散。' },
  ],
  references: ['《高等数学》（同济大学）第5章'],
};

// ========== Module 4: 多元微积分 ==========

const ca_04_01: Topic = {
  id: 'ca-04-01',
  moduleId: 'pe-exam-303-calculus',
  title: '多元函数微分',
  description: '偏导数、全微分、多元复合函数求导、隐函数求导',
  content: `# 多元函数微分

<Glossary terms="%5B%7B%22term%22%3A%22%E5%81%8F%E5%AF%BC%E6%95%B0%22%2C%22english%22%3A%22Partial%20Derivative%22%2C%22definition%22%3A%22%E5%AF%B9%E6%9F%90%E4%B8%80%E4%B8%AA%E8%87%AA%E5%8F%98%E9%87%8F%E6%B1%82%E5%AF%BC%EF%BC%8C%E5%85%B6%E4%BD%99%E5%8F%98%E9%87%8F%E7%9C%8B%E4%BD%9C%E5%B8%B8%E6%95%B0%22%7D%2C%7B%22term%22%3A%22%E5%85%A8%E5%BE%AE%E5%88%86%22%2C%22english%22%3A%22Total%20Differential%22%2C%22definition%22%3A%22dz%3D(%E2%88%82z%2F%E2%88%82x)dx%2B(%E2%88%82z%2F%E2%88%82y)dy%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★★ 多元微分是重点

## 核心知识点

**偏导数**：对某一变量求导，其余变量看作常数

**全微分**：dz=(∂z/∂x)dx+(∂z/∂y)dy

**链式法则**：z=f(u,v), u=u(x,y), v=v(x,y)，则∂z/∂x=(∂z/∂u)(∂u/∂x)+(∂z/∂v)(∂v/∂x)

**隐函数求导**：F(x,y,z)=0，则∂z/∂x=-F_x/F_z

## 练习题

**1. 计算题**：求 z=x²y+xy² 的偏导数

## 参考资料

《高等数学》（同济大学）第9章`,
  quizzes: [
    { id: 'ca-q-04-01a', type: 'short-answer', question: '什么是偏导数？', answer: '对某一变量求导时，将其余变量看作常数。', explanation: '偏导数是多元函数微分的基础。' },
  ],
  references: ['《高等数学》（同济大学）第9章'],
};

const ca_04_02: Topic = {
  id: 'ca-04-02',
  moduleId: 'pe-exam-303-calculus',
  title: '二重积分',
  description: '二重积分的定义、性质、计算方法',
  content: `# 二重积分

<Glossary terms="%5B%7B%22term%22%3A%22%E4%BA%8C%E9%87%8D%E7%A7%AF%E5%88%86%22%2C%22english%22%3A%22Double%20Integral%22%2C%22definition%22%3A%22%E2%88%AC%E2%82%91f(x%2Cy)d%CF%83%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★★ 二重积分计算是重点

## 核心方法

**直角坐标**：化为累次积分 ∫∫f(x,y)dxdy

**极坐标**：x=r cosθ, y=r sinθ, dσ=r dr dθ

**交换积分次序**：改变积分顺序简化计算

**对称性**：利用区域和被积函数的对称性简化计算

## 练习题

**1. 计算题**：求 ∫∫(D) xy dσ，D由x=0, y=0, x+y=1围成

## 参考资料

《高等数学》（同济大学）第10章`,
  quizzes: [
    { id: 'ca-q-04-02a', type: 'short-answer', question: '二重积分在极坐标下的面积元素是什么？', answer: 'dσ = r dr dθ', explanation: '极坐标下需要乘以雅可比行列式r。' },
  ],
  references: ['《高等数学》（同济大学）第10章'],
};

// ========== Module 5: 微分方程 ==========

const ca_05_01: Topic = {
  id: 'ca-05-01',
  moduleId: 'pe-exam-303-calculus',
  title: '一阶微分方程',
  description: '可分离变量、齐次方程、一阶线性方程',
  content: `# 一阶微分方程

<Glossary terms="%5B%7B%22term%22%3A%22%E5%BE%AE%E5%88%86%E6%96%B9%E7%A8%8B%22%2C%22english%22%3A%22Differential%20Equation%22%2C%22definition%22%3A%22%E5%90%AB%E6%9C%89%E6%9C%AA%E7%9F%A5%E5%87%BD%E6%95%B0%E5%AF%BC%E6%95%B0%E7%9A%84%E6%96%B9%E7%A8%8B%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★★ 微分方程是必考内容

## 核心类型

**可分离变量**：f(x)dx=g(y)dy，两边积分

**齐次方程**：y'=f(y/x)，令u=y/x化为可分离变量

**一阶线性**：y'+P(x)y=Q(x)，公式：y=e^(-∫Pdx)[∫Q·e^(∫Pdx)dx+C]

## 练习题

**1. 计算题**：求 y'+y=e^x 的通解

## 参考资料

《高等数学》（同济大学）第7章`,
  quizzes: [
    { id: 'ca-q-05-01a', type: 'short-answer', question: '一阶线性微分方程的通解公式是什么？', answer: 'y=e^(-∫Pdx)[∫Q·e^(∫Pdx)dx+C]', explanation: '这是求解一阶线性微分方程的标准公式。' },
  ],
  references: ['《高等数学》（同济大学）第7章'],
};

const ca_05_02: Topic = {
  id: 'ca-05-02',
  moduleId: 'pe-exam-303-calculus',
  title: '二阶常系数线性方程',
  description: '齐次方程、非齐次方程、特解的求法',
  content: `# 二阶常系数线性方程

<Glossary terms="%5B%7B%22term%22%3A%22%E7%89%B9%E5%BE%81%E6%96%B9%E7%A8%8B%22%2C%22english%22%3A%22Characteristic%20Equation%22%2C%22definition%22%3A%22r%C2%B2%2Bpr%2Bq%3D0%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★ 常考类型

## 核心方法

**齐次** y''+py'+qy=0：
- 特征方程 r²+pr+q=0
- 两个不等实根：y=C₁e^(r₁x)+C₂e^(r₂x)
- 重根：y=(C₁+C₂x)e^(rx)
- 共轭复根α±βi：y=e^(αx)(C₁cos βx+C₂sin βx)

**非齐次** y''+py'+qy=f(x)：通解=齐次通解+非齐次特解

## 练习题

**1. 计算题**：求 y''-3y'+2y=0 的通解

## 参考资料

《高等数学》（同济大学）第7章`,
  quizzes: [
    { id: 'ca-q-05-02a', type: 'short-answer', question: '二阶常系数齐次方程的特征方程有重根时，通解是什么形式？', answer: 'y=(C₁+C₂x)e^(rx)，其中r是重根。', explanation: '重根时需要乘以x。' },
  ],
  references: ['《高等数学》（同济大学）第7章'],
};

// ========== Module 6: 无穷级数 ==========

const ca_06_01: Topic = {
  id: 'ca-06-01',
  moduleId: 'pe-exam-303-calculus',
  title: '常数项级数',
  description: '级数的概念、审敛法、绝对收敛与条件收敛',
  content: `# 常数项级数

<Glossary terms="%5B%7B%22term%22%3A%22%E7%BA%A7%E6%95%B0%22%2C%22english%22%3A%22Series%22%2C%22definition%22%3A%22%E2%88%91a%E2%82%99%EF%BC%8C%E9%83%A8%E5%88%86%E5%92%8C%E6%95%B0%E5%88%97%E7%9A%84%E6%9E%81%E9%99%90%22%7D%2C%7B%22term%22%3A%22%E6%94%B6%E6%95%9B%22%2C%22english%22%3A%22Convergence%22%2C%22definition%22%3A%22%E9%83%A8%E5%88%86%E5%92%86%E6%95%B0%E5%88%97%E6%9C%89%E6%9E%81%E9%99%90%22%7D%5D" />

## 考情分析

- **题型**：选择题、计算题
- **考频**：★★★ 级数是难点

## 核心审敛法

**比较审敛法**：与已知级数比较

**比值审敛法**：lim aₙ₊₁/aₙ = ρ，ρ<1收敛，ρ>1发散

**根值审敛法**：lim ⁿ√aₙ = ρ

**莱布尼茨判别法**：交错级数，aₙ递减趋于0则收敛

**绝对收敛与条件收敛**：|aₙ|收敛→绝对收敛→原级数收敛

## 练习题

**1. 选择题**：∑1/n² 收敛还是发散？

## 参考资料

《高等数学》（同济大学）第11章`,
  quizzes: [
    { id: 'ca-q-06-01a', type: 'choice', question: '∑1/n² 是（）', options: ['收敛', '发散', '条件收敛', '不确定'], answer: '收敛', explanation: '这是p级数，p=2>1，收敛。' },
  ],
  references: ['《高等数学》（同济大学）第11章'],
};

const ca_06_02: Topic = {
  id: 'ca-06-02',
  moduleId: 'pe-exam-303-calculus',
  title: '幂级数',
  description: '幂级数的收敛域、展开与求和',
  content: `# 幂级数

<Glossary terms="%5B%7B%22term%22%3A%22%E5%B9%82%E7%BA%A7%E6%95%B0%22%2C%22english%22%3A%22Power%20Series%22%2C%22definition%22%3A%22%E2%88%91a%E2%82%99x%5En%22%7D%2C%7B%22term%22%3A%22%E6%94%B6%E6%95%9B%E5%8D%8A%E5%BE%84%22%2C%22english%22%3A%22Radius%20of%20Convergence%22%2C%22definition%22%3A%22R%3D1%2F(lim%20%7Ca%E2%82%99%E2%82%8A%E2%82%81%2Fa%E2%82%99%7C)%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★★ 幂级数是重点

## 核心知识点

**收敛半径**：R=1/(lim |aₙ₊₁/aₙ|)

**常见展开**：
- e^x = ∑x^n/n!
- sin x = ∑(-1)^n x^(2n+1)/(2n+1)!
- cos x = ∑(-1)^n x^(2n)/(2n)!
- 1/(1-x) = ∑x^n, |x|<1
- ln(1+x) = ∑(-1)^(n+1) x^n/n

## 练习题

**1. 计算题**：求 ∑x^n/n! 的收敛域

## 参考资料

《高等数学》（同济大学）第11章`,
  quizzes: [
    { id: 'ca-q-06-02a', type: 'short-answer', question: 'e^x的麦克劳林展开式是什么？', answer: 'e^x = ∑(n=0→∞) x^n/n! = 1 + x + x²/2! + x³/3! + ...', explanation: '这是最常用的幂级数展开之一。' },
  ],
  references: ['《高等数学》（同济大学）第11章'],
};

// ========== Module 7: 差分方程 ==========

const ca_07_01: Topic = {
  id: 'ca-07-01',
  moduleId: 'pe-exam-303-calculus',
  title: '差分方程',
  description: '差分的概念、一阶差分方程、二阶常系数差分方程',
  content: `# 差分方程

<Glossary terms="%5B%7B%22term%22%3A%22%E5%B7%AE%E5%88%86%22%2C%22english%22%3A%22Difference%22%2C%22definition%22%3A%22%CE%94y%E2%82%99%3Dy%E2%82%99%E2%82%8A%E2%82%81-y%E2%82%99%22%7D%2C%7B%22term%22%3A%22%E5%B7%AE%E5%88%86%E6%96%B9%E7%A8%8B%22%2C%22english%22%3A%22Difference%20Equation%22%2C%22definition%22%3A%22%E5%90%AB%E6%9C%89%E6%9C%AA%E7%9F%A5%E5%BA%8F%E5%88%97%E5%B7%AE%E5%88%86%E7%9A%84%E6%96%B9%E7%A8%8B%22%7D%5D" />

## 考情分析

- **题型**：计算题
- **考频**：★ 数三特有内容

## 核心知识点

**差分**：Δyₙ = yₙ₊₁ - yₙ

**一阶线性差分方程**：yₙ₊₁ + ayₙ = f(n)

**齐次通解**：yₙ = C·(-a)^n

**特解**：根据f(n)的形式设特解

## 练习题

**1. 计算题**：求 yₙ₊₁ - 2yₙ = 3 的通解

## 参考资料

《高等数学》（同济大学）差分方程附录`,
  quizzes: [
    { id: 'ca-q-07-01a', type: 'short-answer', question: '什么是差分？', answer: '差分Δyₙ = yₙ₊₁ - yₙ，是离散情形下的"导数"。', explanation: '差分是差分方程的基本概念。' },
  ],
  references: ['《高等数学》（同济大学）差分方程附录'],
};

export const topics: Topic[] = [
  ca_01_01, ca_01_02, ca_01_03,
  ca_02_01, ca_02_02, ca_02_03,
  ca_03_01, ca_03_02, ca_03_03, ca_03_04,
  ca_04_01, ca_04_02,
  ca_05_01, ca_05_02,
  ca_06_01, ca_06_02,
  ca_07_01,
];
