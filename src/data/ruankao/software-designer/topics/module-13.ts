import { Topic } from '@/types';

export const topics: Topic[] = [
  {
    id: 'sd-13-01',
    moduleId: 'sd-professional-english',
    title: '计算机专业英语阅读技巧',
    description: '软考英语题型、解题步骤、常见陷阱',
    content: `# 计算机专业英语阅读技巧

## 考情分析

- **分值**：上午固定 5 分，通常为 1 篇计算机相关短文（约 150～250 词）+ 5 道单选。
- **题型**：词义/短语题、选词填空题、主旨大意题、细节理解题、简单推断题。
- **题材**：软件工程、面向对象、数据库、网络与安全、新技术（云计算、大数据、人工智能）等，均出自计算机领域，不考文学或时事。
- **特点**：篇幅不长，但句子偏长、被动语态多、术语密集。拿分关键不是词汇量有多大，而是定位与排除是否高效。

## 一、五大题型

| 题型 | 提问方式 | 解题关键 |
|------|----------|----------|
| 词义/短语题 | The word "..." is closest in meaning to / refers to | 联系上下文语境，警惕熟词僻义 |
| 选词填空题 | The best word for the blank is | 看前后逻辑与固定搭配，兼顾词性 |
| 主旨大意题 | The main idea / best title of the passage is | 读首尾段与各段首句，抓中心 |
| 细节理解题 | According to the passage, which ... | 定位原文同义复现处，逐项比对 |
| 推断题 | It can be inferred / implied that | 只推一步，不扩大不绝对化 |

## 二、解题三步法（务必按步骤做）

**第一步：先读题干与选项，预判题型、划关键词。**
不要一上来就通读全文。先看题目问什么（词义？主旨？细节？），并圈出题干中的人名、术语、数字、大写词等定位锚点。

**第二步：回到原文定位，抓同义复现与信号词。**
带着锚点回到原文，找到与题干/选项意思相近的句子（同义改写是命题常态）。重点盯转折、因果、举例、总结等信号词，其前后常是答案所在。

**第三步：排除干扰项，比对确认。**
用"原文是否有据"逐一排除。绝对化词（all / only / must / never）往往是干扰项；正确答案通常是原文的同义改写，而非原词照搬。

> 口诀：**先题后文、定位比对、排除干扰**。定位尽量控制在每题 1 分钟内，卡住就先跳过做记号。

## 三、定位信号词（看到就圈）

| 逻辑关系 | 常见信号词 | 作用 |
|----------|------------|------|
| 转折 | but, however, yet, nevertheless, on the contrary, whereas | 其后多为作者真正观点，最高频考点 |
| 因果 | because, since, as a result, therefore, thus, consequently, due to | 因果关系常被设为细节题 |
| 递进/并列 | moreover, furthermore, in addition, besides, also | 补充同向信息 |
| 举例 | for example, for instance, such as | 例子服务于前一句观点 |
| 总结 | in conclusion, in short, to sum up, in a word | 常出主旨题 |
| 对比 | while, unlike, by contrast, compared with | 对比双方的特征不要张冠李戴 |
| 条件 | if, unless, provided that, as long as | 条件范围不要扩大或缩小 |

## 四、常见陷阱（干扰项设计手法）

1. **偷换概念 / 扩大缩小范围**：把部分说成全部、把可能说成必然。见到 all、only、must、never、always 等绝对化词要高度警惕。
2. **张冠李戴**：把 A 对象的特征、数据或观点安到 B 头上。
3. **无中生有**：选项本身表述正确，但原文根本没提，属文外正确、文内无据。
4. **过度推断**：由原文不能必然推出的结论，选项却说成事实。
5. **答非所问**：选项内容正确，但与题干所问无关（如问原因却答结果）。

## 五、长难句与常见语法点

计算机英语长句多，读懂结构比逐词翻译更重要。

### 1. 被动语态（Passive Voice）
形式为 **be + 过去分词**，主语是动作的承受者。科技英语大量使用被动以突出客观对象。
> The data **is processed** by the CPU.（数据被 CPU 处理。）主动态为 The CPU processes the data.

### 2. 定语从句（Attributive Clause）
由 which / that / who / whose 等引导，修饰其前的名词（先行词），常译为"……的"。
> The compiler, **which translates source code into object code**, is essential.（把源代码翻译为目标代码的编译器是必备工具。）

### 3. which / that 指代
非限制性定语从句（逗号隔开）中，which 一般指代紧邻的前一个名词；限制性定语从句中 that/which 指代其修饰的先行词。判断指代看它修饰哪个名词，而不是看中文顺不顺。

### 4. 后置定语
分词短语（done / doing）、介词短语、不定式放在名词之后作定语，是长句变长的主因。
> The methods **used in this program** are efficient.（本程序所用的方法是高效的。）

### 5. 形式主语 it
句首的 it 常代替后面的真实主语（不定式或从句）。
> **It** is important **to backup data**.（备份数据很重要；it 是形式主语，真实主语是 to backup data。）

## 六、实战片段与思路

> Cloud computing lets users access computing resources over the Internet instead of owning them locally. Companies can scale their services up or down quickly, paying only for what they use. **However**, storing data on remote servers raises concerns about security and privacy.

- 主旨应覆盖：定义（按需经 Internet 使用资源）+ 优势（弹性伸缩、按量付费）+ however 转折后的隐忧（安全与隐私）。
- 若问 However 之后作者强调什么 → 安全与隐私问题。
- 若问 main idea → 需覆盖三方面，勿只抓局部而漏掉转折后的内容。

<Glossary terms="%5B%7B%22term%22%3A%22%E8%A2%AB%E5%8A%A8%E8%AF%AD%E6%80%81%22%2C%22english%22%3A%22Passive%20Voice%22%2C%22definition%22%3A%22%E8%B0%93%E8%AF%AD%E7%94%A8%20be%20%2B%20%E8%BF%87%E5%8E%BB%E5%88%86%E8%AF%8D%EF%BC%8C%E4%B8%BB%E8%AF%AD%E6%98%AF%E5%8A%A8%E4%BD%9C%E7%9A%84%E6%89%BF%E5%8F%97%E8%80%85%E3%80%82%E8%AE%A1%E7%AE%97%E6%9C%BA%E8%8B%B1%E8%AF%AD%E5%A4%A7%E9%87%8F%E4%BD%BF%E7%94%A8%E8%A2%AB%E5%8A%A8%E8%AF%AD%E6%80%81%E4%BB%A5%E7%AA%81%E5%87%BA%E5%AE%A2%E8%A7%82%E5%AF%B9%E8%B1%A1%EF%BC%8C%E4%BE%8B%E5%A6%82%20The%20data%20is%20processed%20by%20the%20CPU%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%AE%9A%E8%AF%AD%E4%BB%8E%E5%8F%A5%22%2C%22english%22%3A%22Attributive%20Clause%22%2C%22definition%22%3A%22%E4%BF%AE%E9%A5%B0%E5%90%8D%E8%AF%8D%E7%9A%84%E4%BB%8E%E5%8F%A5%EF%BC%8C%E5%B8%B8%E7%94%A8%20which%20%2F%20that%20%2F%20who%20%2F%20whose%20%E5%BC%95%E5%AF%BC%EF%BC%8C%E4%BD%8D%E4%BA%8E%E8%A2%AB%E4%BF%AE%E9%A5%B0%E8%AF%8D%EF%BC%88%E5%85%88%E8%A1%8C%E8%AF%8D%EF%BC%89%E4%B9%8B%E5%90%8E%EF%BC%8C%E5%B8%B8%E8%AF%91%E4%B8%BA%E2%80%9C%E2%80%A6%E2%80%A6%E7%9A%84%E2%80%9D%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E8%BD%AC%E6%8A%98%E8%AF%8D%22%2C%22english%22%3A%22Contrast%20Connective%22%2C%22definition%22%3A%22%E5%A6%82%20but%E3%80%81however%E3%80%81yet%E3%80%81nevertheless%EF%BC%8C%E8%A1%A8%E7%A4%BA%E8%BD%AC%E6%8A%98%EF%BC%8C%E5%85%B6%E5%90%8E%E5%B8%B8%E6%98%AF%E4%BD%9C%E8%80%85%E7%9C%9F%E6%AD%A3%E8%A7%82%E7%82%B9%EF%BC%8C%E6%98%AF%E9%98%85%E8%AF%BB%E7%90%86%E8%A7%A3%E7%9A%84%E6%9C%80%E9%AB%98%E9%A2%91%E5%87%BA%E9%A2%98%E7%82%B9%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E4%B8%BB%E6%97%A8%E5%8F%A5%22%2C%22english%22%3A%22Topic%20Sentence%22%2C%22definition%22%3A%22%E6%A6%82%E6%8B%AC%E6%AE%B5%E8%90%BD%E6%88%96%E5%85%A8%E6%96%87%E4%B8%AD%E5%BF%83%E6%80%9D%E6%83%B3%E7%9A%84%E5%8F%A5%E5%AD%90%EF%BC%8C%E5%B8%B8%E5%87%BA%E7%8E%B0%E5%9C%A8%E6%AE%B5%E9%A6%96%E6%88%96%E6%AE%B5%E5%B0%BE%EF%BC%8C%E6%98%AF%E8%A7%A3%E7%AD%94%E4%B8%BB%E6%97%A8%E9%A2%98%E7%9A%84%E5%85%B3%E9%94%AE%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%90%8C%E4%BD%8D%E8%AF%AD%22%2C%22english%22%3A%22Appositive%22%2C%22definition%22%3A%22%E5%AF%B9%E5%90%8D%E8%AF%8D%E8%BF%9B%E8%A1%8C%E8%A7%A3%E9%87%8A%E8%AF%B4%E6%98%8E%E7%9A%84%E6%88%90%E5%88%86%EF%BC%8C%E5%B8%B8%E7%94%B1%E9%80%97%E5%8F%B7%E6%88%96%20that%20is%20%E5%BC%95%E5%87%BA%EF%BC%8C%E6%98%AF%E7%8C%9C%E6%B5%8B%E7%94%9F%E8%AF%8D%E8%AF%8D%E4%B9%89%E7%9A%84%E9%87%8D%E8%A6%81%E7%BA%BF%E7%B4%A2%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%BD%A2%E5%BC%8F%E4%B8%BB%E8%AF%AD%22%2C%22english%22%3A%22Formal%20Subject%22%2C%22definition%22%3A%22%E5%8F%A5%E9%A6%96%E7%9A%84%20it%20%E4%BB%A3%E6%9B%BF%E5%90%8E%E9%9D%A2%E7%9A%84%E7%9C%9F%E5%AE%9E%E4%B8%BB%E8%AF%AD%EF%BC%88%E4%B8%8D%E5%AE%9A%E5%BC%8F%E6%88%96%E4%BB%8E%E5%8F%A5%EF%BC%89%E3%80%82%E4%BE%8B%E5%A6%82%20It%20is%20important%20to%20backup%20data%20%E4%B8%AD%20it%20%E6%98%AF%E5%BD%A2%E5%BC%8F%E4%B8%BB%E8%AF%AD%EF%BC%8Cto%20backup%20data%20%E6%98%AF%E7%9C%9F%E5%AE%9E%E4%B8%BB%E8%AF%AD%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%90%8E%E7%BD%AE%E5%AE%9A%E8%AF%AD%22%2C%22english%22%3A%22Postpositive%20Modifier%22%2C%22definition%22%3A%22%E4%BD%8D%E4%BA%8E%E8%A2%AB%E4%BF%AE%E9%A5%B0%E5%90%8D%E8%AF%8D%E4%B9%8B%E5%90%8E%E7%9A%84%E5%AE%9A%E8%AF%AD%EF%BC%8C%E5%8F%AF%E7%94%B1%E5%88%86%E8%AF%8D%E7%9F%AD%E8%AF%AD%E3%80%81%E4%BB%8B%E8%AF%8D%E7%9F%AD%E8%AF%AD%E6%88%96%E4%B8%8D%E5%AE%9A%E5%BC%8F%E5%85%85%E5%BD%93%EF%BC%8C%E6%98%AF%E9%80%A0%E6%88%90%E9%95%BF%E9%9A%BE%E5%8F%A5%E7%9A%84%E4%B8%BB%E8%A6%81%E5%8E%9F%E5%9B%A0%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E8%BF%9E%E6%8E%A5%E8%AF%8D%22%2C%22english%22%3A%22Connective%22%2C%22definition%22%3A%22%E8%BF%9E%E6%8E%A5%E5%8F%A5%E4%B8%8E%E5%8F%A5%E3%80%81%E6%AE%B5%E4%B8%8E%E6%AE%B5%E7%9A%84%E8%AF%8D%E8%AF%AD%EF%BC%8C%E8%A1%A8%E7%A4%BA%E5%9B%A0%E6%9E%9C%E3%80%81%E9%80%92%E8%BF%9B%E3%80%81%E4%B8%BE%E4%BE%8B%E3%80%81%E6%80%BB%E7%BB%93%E7%AD%89%E9%80%BB%E8%BE%91%E5%85%B3%E7%B3%BB%EF%BC%8C%E6%98%AF%E5%AE%9A%E4%BD%8D%E7%AD%94%E6%A1%88%E7%9A%84%E4%BF%A1%E5%8F%B7%E3%80%82%22%7D%5D" />

## 备考建议

1. 每天坚持读 1～2 段计算机英文短文（教材英文摘要、RFC 简介、技术博客均可），保持语感。
2. 整理"信号词 + 语法点"卡片，重点突破被动语态与定语从句的识别。
3. 做真题时刻意练习"先题后文"，把每道错题按陷阱类型归类复盘。
4. 词汇以计算机高频术语为核心（见下一课题），不必死磕生僻文学词。
`,
    quizzes: [
      {
        id: 'sd-13-01-q1',
        type: 'choice',
        question: '在句子 "The software is robust enough to handle unexpected input without crashing." 中，单词 robust 的含义最接近（）。',
        options: ['冗余的', '健壮的、鲁棒的', '灵活的', '昂贵的'],
        answer: 'B',
        explanation:
          'robust 意为"健壮的、鲁棒的"，指系统在意外/异常输入下仍能稳定运行。A 冗余是 redundant，C 灵活是 flexible，D 昂贵是 expensive。',
      },
      {
        id: 'sd-13-01-q2',
        type: 'choice',
        question: '解答软考专业英语阅读理解题，最推荐的解题步骤是（）。',
        options: [
          '先逐字翻译全文，再看题干',
          '只阅读文章首尾两段即可作答',
          '先读题干与选项、预判题型并划关键词，再回原文定位比对',
          '先看选项再凭常识作答，不必回原文',
        ],
        answer: 'C',
        explanation:
          '正确做法是"先题后文、定位比对"：先读题干与选项确定题型与关键词，再回原文定位同义复现处，最后排除干扰。逐字翻译浪费时间，凭常识易落入"无中生有"陷阱。',
      },
      {
        id: 'sd-13-01-q3',
        type: 'fill',
        question: '句子 "The data is processed by the CPU." 中，谓语使用的是 ______ 语态；主语 The data 实际上是动作 process 的 ______。',
        answer: [
          ['被动', '被动语态'],
          ['承受者', '宾语', '受事', '对象'],
        ],
        explanation:
          '计算机英语大量使用被动语态（be + 过去分词），主语是动作的承受者（即主动态中的宾语）。此句主动形式为 The CPU processes the data。',
      },
      {
        id: 'sd-13-01-q4',
        type: 'choice',
        question: '句子 "The compiler, which translates source code into object code, is an essential tool." 中，关系代词 which 指代的是（）。',
        options: ['source code', 'object code', 'an essential tool', 'The compiler'],
        answer: 'D',
        explanation:
          'which 引导非限制性定语从句，修饰紧邻的先行词 The compiler，全句意为"编译器——它把源代码翻译成目标代码——是必备工具"。定语从句一般指代其前面的名词（先行词）。',
      },
      {
        id: 'sd-13-01-q5',
        type: 'fill',
        question: '在阅读理解中，but、however、nevertheless 等词通常表示 ______ 关系，其后内容往往是作者真正观点和出题点。',
        answer: ['转折', '转折关系'],
        explanation:
          '这些是转折连接词，表示与前文相反或对比的逻辑。作者的真实态度、结论常在其后，是最高频的出题点，务必圈出并重点阅读其后句子。',
      },
      {
        id: 'sd-13-01-q6',
        type: 'short-answer',
        question: '专业英语阅读理解的干扰选项常有哪些设计手法？请列举至少三种并简要说明。',
        answer:
          '常见干扰项手法：1）偷换概念/扩大缩小范围——把部分说成全部、把可能说成必然，绝对化词 all/only/must/never 要警惕；2）张冠李戴——把 A 的特征、数据或观点安到 B 上；3）无中生有——选项本身正确但原文未提及；4）过度推断——由原文不能必然推出的结论；5）答非所问——选项内容正确但与题干所问无关。',
        explanation: '评分要点：每种手法约 1.5 分，答出三种及以上且说明清楚即可得满分；只列名称未说明可酌情给分。',
      },
      {
        id: 'sd-13-01-q7',
        type: 'choice',
        question: '阅读短文并回答。 "Cloud computing lets users access computing resources over the Internet instead of owning them locally. Companies can scale their services up or down quickly, paying only for what they use. However, storing data on remote servers raises concerns about security and privacy." 本文主要讨论的是（）。',
        options: [
          '本地计算机的硬件升级方法',
          '云计算的定义、优势与潜在的安全隐忧',
          'Internet 的历史与发展',
          '数据压缩的具体算法',
        ],
        answer: 'B',
        explanation:
          '首句给出云计算定义（按需通过 Internet 使用计算资源），第二句讲优势（弹性伸缩、按量付费），末句 however 转折指出安全与隐私隐忧。B 全面概括，符合主旨。A/C/D 或无中生有或偏离主题。',
      },
    ],
    references: ['《软件设计师教程（第5版）》清华大学出版社', '《计算机专业英语》清华大学出版社'],
  },
  {
    id: 'sd-13-02',
    moduleId: 'sd-professional-english',
    title: '高频计算机英语词汇',
    description: '软考常考的计算机术语、缩写与近义词辨析',
    content: `# 高频计算机英语词汇

## 考情分析

- **分值**：词汇与短语题约占英语题一半，另与阅读题交叉考词义辨析。
- **重点**：计算机常用术语、缩写、近义词/易混词辨析、常见词缀。
- **方法**：按"术语 → 缩写 → 辨析 → 词缀"成体系记忆，结合阅读语境巩固，忌孤立背单词表。

## 一、高频动词（Verbs）

| 单词 | 中文 | 单词 | 中文 |
|------|------|------|------|
| compile | 编译 | interpret | 解释、口译 |
| execute | 执行 | allocate | 分配 |
| encrypt | 加密 | decrypt | 解密 |
| authenticate | 认证 | authorize | 授权 |
| inherit | 继承 | encapsulate | 封装 |
| instantiate | 实例化 | deploy | 部署 |
| maintain | 维护 | optimize | 优化 |
| iterate | 迭代 | debug | 调试 |
| integrate | 集成 | migrate | 迁移 |
| parse | 解析 | validate | 验证 |
| verify | 核实、验证 | compress | 压缩 |
| implement | 实现 | refactor | 重构 |
| override | 覆盖、重写 | overload | 重载 |
| synchronize | 同步 | initialize | 初始化 |

## 二、高频名词（Nouns）

| 单词 | 中文 | 单词 | 中文 |
|------|------|------|------|
| algorithm | 算法 | bandwidth | 带宽 |
| middleware | 中间件 | scalability | 可扩展性 |
| encapsulation | 封装 | polymorphism | 多态 |
| inheritance | 继承 | abstraction | 抽象 |
| database | 数据库 | firewall | 防火墙 |
| protocol | 协议 | latency | 延迟 |
| throughput | 吞吐量 | repository | 仓库、库 |
| framework | 框架 | interface | 接口 |
| exception | 异常 | thread | 线程 |
| process | 进程 | deadlock | 死锁 |
| compiler | 编译器 | interpreter | 解释器 |
| syntax | 语法 | semantics | 语义 |
| variable | 变量 | constant | 常量 |
| array | 数组 | pointer | 指针 |
| recursion | 递归 | module | 模块 |
| component | 组件 | attribute | 属性 |
| method | 方法 | function | 函数 |

## 三、高频形容词/副词

| 单词 | 中文 | 单词 | 中文 |
|------|------|------|------|
| asynchronous | 异步 | synchronous | 同步 |
| robust | 健壮、鲁棒 | redundant | 冗余 |
| distributed | 分布式 | concurrent | 并发 |
| portable | 可移植 | scalable | 可扩展 |
| secure | 安全 | efficient | 高效 |
| reliable | 可靠 | flexible | 灵活 |
| dynamic | 动态 | static | 静态 |
| virtual | 虚拟 | physical | 物理 |

> **易错提醒**：asynchronous 是"异步"（与 synchronous 同步相对），不是"异常"；"异常"是 exception。命题常在此设混淆项，务必分清。

## 四、高频缩写（Abbreviations）

| 缩写 | 全称 | 中文 |
|------|------|------|
| CPU | Central Processing Unit | 中央处理器 |
| RAM | Random Access Memory | 随机存取存储器 |
| ROM | Read-Only Memory | 只读存储器 |
| OS | Operating System | 操作系统 |
| DBMS | Database Management System | 数据库管理系统 |
| SQL | Structured Query Language | 结构化查询语言 |
| HTTP | Hypertext Transfer Protocol | 超文本传输协议 |
| FTP | File Transfer Protocol | 文件传输协议 |
| SMTP | Simple Mail Transfer Protocol | 简单邮件传输协议 |
| TCP | Transmission Control Protocol | 传输控制协议 |
| UDP | User Datagram Protocol | 用户数据报协议 |
| IP | Internet Protocol | 网际协议 |
| API | Application Programming Interface | 应用程序编程接口 |
| SDK | Software Development Kit | 软件开发工具包 |
| XML | Extensible Markup Language | 可扩展标记语言 |
| HTML | Hypertext Markup Language | 超文本标记语言 |
| IDE | Integrated Development Environment | 集成开发环境 |
| OOP | Object-Oriented Programming | 面向对象程序设计 |
| UML | Unified Modeling Language | 统一建模语言 |
| GUI | Graphical User Interface | 图形用户界面 |
| LAN | Local Area Network | 局域网 |
| WAN | Wide Area Network | 广域网 |
| DNS | Domain Name System | 域名系统 |
| VPN | Virtual Private Network | 虚拟专用网 |
| AES | Advanced Encryption Standard | 高级加密标准 |

## 五、近义词 / 易混词辨析（高频考点）

| 词组 | 辨析 |
|------|------|
| method / function / procedure | method 是类中的"方法"；function 是可独立调用的"函数"；procedure 是"过程、步骤"。 |
| attribute / property / field | 均有"属性/字段"意，OO 中 attribute 与 property 常混用，field 多指数据成员。 |
| compiler / interpreter | compiler"编译器"整体翻译为目标代码；interpreter"解释器"逐句翻译并执行。 |
| process / thread | process"进程"是资源分配单位；thread"线程"是 CPU 调度单位，进程内可有多个线程。 |
| encrypt / encode / compress | encrypt"加密"（需密钥解密）；encode"编码"（如 UTF-8）；compress"压缩"（减少体积）。 |
| inherit / implement | inherit"继承"类；implement"实现"接口。 |
| override / overload | override"重写/覆盖"是父子类同名同参、动态绑定；overload"重载"是同类同名不同参、静态绑定。 |
| verify / validate | verify"核实"做得对不对；validate"验证"做得对不对的要求/规范（做了该做的没）。 |
| fault / error / failure | fault"故障/缺陷"导致 error"差错"，最终表现为 failure"失效"；bug 通俗指程序缺陷。 |
| abstract / concrete | abstract"抽象的"（抽象类不可实例化）；concrete"具体的"。 |

## 六、常见词缀（用来猜生词）

| 词缀 | 含义 | 例词 |
|------|------|------|
| -tion / -sion | 名词（行为、结果） | encryption, iteration, recursion |
| -ment | 名词 | deployment, implementation |
| -able / -ible | 形容词（可……的） | portable, scalable, reliable |
| -ive | 形容词 | interactive, responsive |
| -ize / -ise | 动词（使……化） | optimize, initialize, synchronize |
| -ly | 副词 | efficiently, securely |
| -er / -or | 名词（人/器） | compiler, interpreter |
| re- | 前缀（再、重新） | refactor, reuse, restart |

## 七、语境巩固（真题式）

> Modern applications are often built as distributed systems. Each component communicates through well-defined interfaces, and middleware helps them work together. To protect sensitive data, developers use encryption and strict authentication.

- interfaces：本文语境中指"接口（组件交互的规范）"，而非"用户界面（GUI）"。
- middleware：中间件；encryption：加密；authentication：认证。

<Glossary terms="%5B%7B%22term%22%3A%22%E5%B0%81%E8%A3%85%22%2C%22english%22%3A%22Encapsulation%22%2C%22definition%22%3A%22%E6%8A%8A%E6%95%B0%E6%8D%AE%E4%B8%8E%E6%93%8D%E4%BD%9C%E6%95%B0%E6%8D%AE%E7%9A%84%E6%96%B9%E6%B3%95%E6%8D%86%E7%BB%91%E5%9C%A8%E4%B8%80%E8%B5%B7%E5%B9%B6%E9%9A%90%E8%97%8F%E5%86%85%E9%83%A8%E7%BB%86%E8%8A%82%EF%BC%8C%E5%8F%AA%E6%9A%B4%E9%9C%B2%E5%BF%85%E8%A6%81%E6%8E%A5%E5%8F%A3%EF%BC%8C%E6%98%AF%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%89%B9%E5%BE%81%E4%B9%8B%E4%B8%80%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E7%BB%A7%E6%89%BF%22%2C%22english%22%3A%22Inheritance%22%2C%22definition%22%3A%22%E5%AD%90%E7%B1%BB%E8%87%AA%E5%8A%A8%E6%8B%A5%E6%9C%89%E7%88%B6%E7%B1%BB%E7%9A%84%E5%B1%9E%E6%80%A7%E5%92%8C%E6%96%B9%E6%B3%95%EF%BC%8C%E5%AE%9E%E7%8E%B0%E4%BB%A3%E7%A0%81%E5%A4%8D%E7%94%A8%E4%B8%8E%E5%B1%82%E6%AC%A1%E5%88%86%E7%B1%BB%EF%BC%8C%E6%98%AF%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%89%B9%E5%BE%81%E4%B9%8B%E4%B8%80%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%A4%9A%E6%80%81%22%2C%22english%22%3A%22Polymorphism%22%2C%22definition%22%3A%22%E5%90%8C%E4%B8%80%E6%93%8D%E4%BD%9C%E4%BD%9C%E7%94%A8%E4%BA%8E%E4%B8%8D%E5%90%8C%E5%AF%B9%E8%B1%A1%E5%8F%AF%E4%BA%A7%E7%94%9F%E4%B8%8D%E5%90%8C%E7%BB%93%E6%9E%9C%EF%BC%8C%E5%B8%B8%E9%80%9A%E8%BF%87%E9%87%8D%E8%BD%BD%E4%B8%8E%E9%87%8D%E5%86%99%E5%AE%9E%E7%8E%B0%EF%BC%8C%E6%98%AF%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%89%B9%E5%BE%81%E4%B9%8B%E4%B8%80%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E6%8A%BD%E8%B1%A1%22%2C%22english%22%3A%22Abstraction%22%2C%22definition%22%3A%22%E6%8A%BD%E5%8F%96%E4%BA%8B%E7%89%A9%E5%85%B1%E5%90%8C%E7%9A%84%E6%9C%AC%E8%B4%A8%E7%89%B9%E5%BE%81%E8%80%8C%E5%BF%BD%E7%95%A5%E9%9D%9E%E6%9C%AC%E8%B4%A8%E7%BB%86%E8%8A%82%EF%BC%8C%E6%98%AF%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%89%B9%E5%BE%81%E4%B9%8B%E4%B8%80%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E7%B1%BB%22%2C%22english%22%3A%22Class%22%2C%22definition%22%3A%22%E5%AF%B9%E4%B8%80%E7%B1%BB%E5%AF%B9%E8%B1%A1%E5%85%B1%E5%90%8C%E5%B1%9E%E6%80%A7%E5%92%8C%E8%A1%8C%E4%B8%BA%E7%9A%84%E6%8A%BD%E8%B1%A1%E6%8F%8F%E8%BF%B0%EF%BC%8C%E6%98%AF%E5%88%9B%E5%BB%BA%E5%AF%B9%E8%B1%A1%E7%9A%84%E6%A8%A1%E6%9D%BF%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%AF%B9%E8%B1%A1%22%2C%22english%22%3A%22Object%22%2C%22definition%22%3A%22%E7%B1%BB%E7%9A%84%E4%B8%80%E4%B8%AA%E5%85%B7%E4%BD%93%E5%AE%9E%E4%BE%8B%EF%BC%8C%E6%8B%A5%E6%9C%89%E7%8A%B6%E6%80%81%EF%BC%88%E5%B1%9E%E6%80%A7%EF%BC%89%E5%92%8C%E8%A1%8C%E4%B8%BA%EF%BC%88%E6%96%B9%E6%B3%95%EF%BC%89%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E9%87%8D%E8%BD%BD%22%2C%22english%22%3A%22Overloading%22%2C%22definition%22%3A%22%E5%90%8C%E4%B8%80%E7%B1%BB%E4%B8%AD%E6%96%B9%E6%B3%95%E5%90%8D%E7%9B%B8%E5%90%8C%E4%BD%86%E5%8F%82%E6%95%B0%E5%88%97%E8%A1%A8%E4%B8%8D%E5%90%8C%EF%BC%8C%E7%BC%96%E8%AF%91%E6%9C%9F%E6%A0%B9%E6%8D%AE%E5%8F%82%E6%95%B0%E9%9D%99%E6%80%81%E7%BB%91%E5%AE%9A%E5%85%B7%E4%BD%93%E6%96%B9%E6%B3%95%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E9%87%8D%E5%86%99%22%2C%22english%22%3A%22Overriding%22%2C%22definition%22%3A%22%E5%AD%90%E7%B1%BB%E9%87%8D%E6%96%B0%E5%AE%9A%E4%B9%89%E7%88%B6%E7%B1%BB%E7%9A%84%E5%90%8C%E5%90%8D%E5%90%8C%E5%8F%82%E6%95%B0%E6%96%B9%E6%B3%95%EF%BC%8C%E8%BF%90%E8%A1%8C%E6%9C%9F%E6%A0%B9%E6%8D%AE%E5%AF%B9%E8%B1%A1%E5%AE%9E%E9%99%85%E7%B1%BB%E5%9E%8B%E5%8A%A8%E6%80%81%E7%BB%91%E5%AE%9A%EF%BC%8C%E4%BD%93%E7%8E%B0%E5%A4%9A%E6%80%81%E3%80%82%E6%B3%A8%E6%84%8F%E5%8B%BF%E4%B8%8E%E2%80%9C%E9%87%8D%E8%BD%BD%EF%BC%88overload%EF%BC%89%E2%80%9D%E6%B7%B7%E6%B7%86%E3%80%82%22%7D%5D" />
<Glossary terms="%5B%7B%22term%22%3A%22%E7%AE%97%E6%B3%95%22%2C%22english%22%3A%22Algorithm%22%2C%22definition%22%3A%22%E8%A7%A3%E5%86%B3%E7%89%B9%E5%AE%9A%E9%97%AE%E9%A2%98%E7%9A%84%E6%9C%89%E9%99%90%E3%80%81%E7%A1%AE%E5%AE%9A%E7%9A%84%E6%AD%A5%E9%AA%A4%E5%BA%8F%E5%88%97%EF%BC%8C%E6%98%AF%E7%A8%8B%E5%BA%8F%E8%AE%BE%E8%AE%A1%E7%9A%84%E6%A0%B8%E5%BF%83%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%B8%A6%E5%AE%BD%22%2C%22english%22%3A%22Bandwidth%22%2C%22definition%22%3A%22%E5%8D%95%E4%BD%8D%E6%97%B6%E9%97%B4%E5%86%85%E4%BF%A1%E9%81%93%E8%83%BD%E4%BC%A0%E8%BE%93%E7%9A%84%E6%95%B0%E6%8D%AE%E9%87%8F%EF%BC%8C%E5%B8%B8%E4%BB%A5%20bps%EF%BC%88%E6%AF%94%E7%89%B9%E6%AF%8F%E7%A7%92%EF%BC%89%E8%A1%A1%E9%87%8F%EF%BC%8C%E6%98%AF%E7%BD%91%E7%BB%9C%E6%80%A7%E8%83%BD%E7%9A%84%E9%87%8D%E8%A6%81%E6%8C%87%E6%A0%87%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E4%B8%AD%E9%97%B4%E4%BB%B6%22%2C%22english%22%3A%22Middleware%22%2C%22definition%22%3A%22%E4%BD%8D%E4%BA%8E%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E4%B8%8E%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E4%B9%8B%E9%97%B4%E7%9A%84%E8%BD%AF%E4%BB%B6%EF%BC%8C%E5%B8%AE%E5%8A%A9%E5%88%86%E5%B8%83%E5%BC%8F%E7%B3%BB%E7%BB%9F%E4%B8%AD%E5%90%84%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1%E4%B8%8E%E5%8D%8F%E5%90%8C%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%8F%AF%E6%89%A9%E5%B1%95%E6%80%A7%22%2C%22english%22%3A%22Scalability%22%2C%22definition%22%3A%22%E7%B3%BB%E7%BB%9F%E9%80%9A%E8%BF%87%E5%A2%9E%E5%8A%A0%E8%B5%84%E6%BA%90%E6%9D%A5%E5%BA%94%E5%AF%B9%E5%A2%9E%E9%95%BF%E7%9A%84%E8%B4%9F%E8%BD%BD%E8%80%8C%E4%BF%9D%E6%8C%81%E6%80%A7%E8%83%BD%E7%9A%84%E8%83%BD%E5%8A%9B%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%BC%82%E6%AD%A5%22%2C%22english%22%3A%22Asynchronous%22%2C%22definition%22%3A%22%E6%93%8D%E4%BD%9C%E4%B8%8D%E7%AD%89%E5%BE%85%E5%AF%B9%E6%96%B9%E5%AE%8C%E6%88%90%E5%8D%B3%E5%8F%AF%E7%BB%A7%E7%BB%AD%E6%89%A7%E8%A1%8C%EF%BC%8C%E4%B8%8E%E5%90%8C%E6%AD%A5%EF%BC%88synchronous%EF%BC%89%E7%9B%B8%E5%AF%B9%E3%80%82%E6%B3%A8%E6%84%8F%E5%8B%BF%E4%B8%8E%E2%80%9C%E5%BC%82%E5%B8%B8%EF%BC%88exception%EF%BC%89%E2%80%9D%E6%B7%B7%E6%B7%86%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%8A%A0%E5%AF%86%22%2C%22english%22%3A%22Encryption%22%2C%22definition%22%3A%22%E6%8C%89%E6%9F%90%E7%A7%8D%E7%AE%97%E6%B3%95%E6%8A%8A%E6%98%8E%E6%96%87%E8%BD%AC%E6%8D%A2%E4%B8%BA%E5%AF%86%E6%96%87%EF%BC%8C%E9%98%B2%E6%AD%A2%E4%BF%A1%E6%81%AF%E8%A2%AB%E6%9C%AA%E6%8E%88%E6%9D%83%E8%80%85%E8%AF%BB%E6%87%82%EF%BC%8C%E8%A7%A3%E5%AF%86%EF%BC%88decryption%EF%BC%89%E4%B8%BA%E5%85%B6%E9%80%86%E8%BF%87%E7%A8%8B%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E7%BC%96%E8%AF%91%22%2C%22english%22%3A%22Compile%22%2C%22definition%22%3A%22%E6%8A%8A%E9%AB%98%E7%BA%A7%E8%AF%AD%E8%A8%80%E6%BA%90%E7%A8%8B%E5%BA%8F%E7%BF%BB%E8%AF%91%E6%88%90%E7%9B%AE%E6%A0%87%E4%BB%A3%E7%A0%81%E7%9A%84%E8%BF%87%E7%A8%8B%E6%88%96%E7%A8%8B%E5%BA%8F%EF%BC%8C%E4%B8%8E%E2%80%9C%E8%A7%A3%E9%87%8A%EF%BC%88interpret%EF%BC%89%E2%80%9D%E7%9B%B8%E5%AF%B9%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%BC%82%E5%B8%B8%22%2C%22english%22%3A%22Exception%22%2C%22definition%22%3A%22%E7%A8%8B%E5%BA%8F%E8%BF%90%E8%A1%8C%E4%B8%AD%E5%87%BA%E7%8E%B0%E7%9A%84%E6%84%8F%E5%A4%96%E4%BA%8B%E4%BB%B6%E6%88%96%E9%94%99%E8%AF%AF%E6%83%85%E5%86%B5%EF%BC%8C%E5%B8%B8%E9%80%9A%E8%BF%87%20try-catch%20%E7%AD%89%E6%9C%BA%E5%88%B6%E6%8D%95%E8%8E%B7%E5%A4%84%E7%90%86%E3%80%82%E6%B3%A8%E6%84%8F%E5%8B%BF%E4%B8%8E%E2%80%9C%E5%BC%82%E6%AD%A5%EF%BC%88asynchronous%EF%BC%89%E2%80%9D%E6%B7%B7%E6%B7%86%E3%80%82%22%7D%5D" />

## 备考建议

1. 词汇按"术语—缩写—辨析"三张表滚动复习，重点记易混词（override/overload、encrypt/encode、asynchronous/exception）。
2. 把生词放进句子/语境记，而非死背中文；阅读中遇到的术语随手记入生词本。
3. 缩写记"全称 + 中文"，考试常考全称还原或中文对应。
`,
    quizzes: [
      {
        id: 'sd-13-02-q1',
        type: 'choice',
        question: '在面向对象程序设计中，单词 "inheritance" 的含义是（）。',
        options: ['封装', '多态', '继承', '抽象'],
        answer: 'C',
        explanation:
          'inheritance 即"继承"，指子类拥有父类的属性与方法。封装是 encapsulation，多态是 polymorphism，抽象是 abstraction。',
      },
      {
        id: 'sd-13-02-q2',
        type: 'choice',
        question: '下列关于单词 "asynchronous" 的解释，正确的是（）。',
        options: [
          '意为"异常的"，等同于 exception',
          '意为"对称的"，指数据结构对称',
          '意为"异步的"，与 synchronous（同步的）相对',
          '意为"异构的"，指硬件异构',
        ],
        answer: 'C',
        explanation:
          'asynchronous = 异步的，指操作无需等待对方完成即可继续，与 synchronous（同步）相对。它与"异常（exception，程序运行中的意外事件）"是完全不同的概念，这是常见混淆点。对称是 symmetric，异构是 heterogeneous。',
      },
      {
        id: 'sd-13-02-q3',
        type: 'fill',
        question: '英语单词 "middleware" 的中文意思是 ______；"scalability" 的中文意思是 ______。',
        answer: [
          ['中间件', '中介软件'],
          ['可扩展性', '可伸缩性', '可扩展'],
        ],
        explanation:
          'middleware = 中间件，位于操作系统与应用之间、辅助分布式通信的软件；scalability = 可扩展性（可伸缩性），指系统通过增加资源应对更大负载的能力。',
      },
      {
        id: 'sd-13-02-q4',
        type: 'choice',
        question: '关于 "compile" 与 "interpret"，下列说法正确的是（）。',
        options: [
          'compile 与 interpret 是同义词，都指编译',
          'compile 指"压缩"，interpret 指"解释"',
          'interpret 指"编译"，compile 指"执行"',
          'compile 指"编译"（把源程序整体翻译为目标代码），interpret 指"解释"（逐句翻译并执行）',
        ],
        answer: 'D',
        explanation:
          'compile = 编译，一次性把源程序翻译成目标代码；interpret = 解释，逐句翻译并立即执行。二者是两种不同的翻译方式。压缩是 compress，执行是 execute。',
      },
      {
        id: 'sd-13-02-q5',
        type: 'choice',
        question: '缩写 "API" 的全称与含义是（）。',
        options: [
          'Automatic Program Integration，自动程序集成',
          'Application Programming Interface，应用程序编程接口',
          'Applied Program Instruction，应用编程指令',
          'Advanced Peripheral Interface，高级外设接口',
        ],
        answer: 'B',
        explanation:
          'API = Application Programming Interface（应用程序编程接口），是软件组件之间交互的约定与定义，属高频考点。其余均为编造的干扰全称。',
      },
      {
        id: 'sd-13-02-q6',
        type: 'fill',
        question: '在面向对象中，"同一类中方法名相同但参数列表不同"称为方法的 ______；"子类重新定义父类的同名同参数方法"称为方法的 ______。',
        answer: [
          ['重载', 'overload', 'overloading'],
          ['重写', '覆盖', 'override', 'overriding'],
        ],
        explanation:
          'overload（重载）发生在同一类，方法名相同、参数不同，编译期静态绑定；override（重写/覆盖）发生在父子类之间，方法名与参数相同，运行期动态绑定、体现多态。这是最高频的面向对象词义辨析。',
      },
      {
        id: 'sd-13-02-q7',
        type: 'choice',
        question: '阅读短文并回答。 "Modern applications are often built as distributed systems. Each component communicates through well-defined interfaces, and middleware helps them work together. To protect sensitive data, developers use encryption and strict authentication." 根据上下文，"interfaces" 在文中最接近的含义是（）。',
        options: ['界面（用户看到的画面）', '网际互联', '接口（组件交互的规范）', '内部故障'],
        answer: 'C',
        explanation:
          '在"组件通过明确定义的 interfaces 通信"的语境中，interface 指"接口"，即组件间交互的规范与约定，而非人机"用户界面（GUI）"。这是计算机英语中 interface 的常见义项。',
      },
    ],
    references: ['《软件设计师教程（第5版）》清华大学出版社', '《计算机专业英语》清华大学出版社'],
  },
];
