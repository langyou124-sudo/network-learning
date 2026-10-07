import { Topic } from '@/types';

export const topics: Topic[] = [
  {
    id: 'sd-15-01',
    moduleId: 'sd-cpp-java',
    title: 'C++面向对象程序设计',
    description: '类与对象、构造析构、继承、多态、虚函数、运算符重载',
    content: `# C++面向对象程序设计

## 考情分析

- **分值**：下午题"面向对象程序设计"大题（C++/Java 二选一）中 C++ 部分通常 5 个程序填空，每空 3 分左右；上午题偶有 1～2 分概念题（虚函数、运算符重载限制）
- **题型**：程序填空（补构造函数、补虚函数声明、补运算符重载、补基类/派生类成员）、简答（说明多态机制、说明拷贝与深浅拷贝）
- **考频**：★★★★ 下午题常客。考点集中：**虚函数与动态绑定、构造析构顺序、拷贝构造、运算符重载规则**，代码不长但要求语法精确

## 一、核心概念

### 1. 类与对象

类是对象的模板，对象是类的实例。类定义由**数据成员**与**成员函数**组成，配合访问控制：

| 访问控制 | 类内 | 派生类 | 类外 |
|----------|------|--------|------|
| public | 可 | 可 | 可 |
| protected | 可 | 可 | 否 |
| private | 可 | 否 | 否 |

要点：**class 默认 private，struct 默认 public**（二者唯一本质区别）；成员函数内可用 **this 指针**指向调用对象；**静态成员**属于类而非对象，需在类外初始化，静态成员函数没有 this。

<Glossary terms="%5B%7B%22term%22%3A%22%E5%A4%9A%E6%80%81%22%2C%22english%22%3A%22Polymorphism%22%2C%22definition%22%3A%22%E5%90%8C%E4%B8%80%E4%B8%AA%E6%93%8D%E4%BD%9C%E4%BD%9C%E7%94%A8%E4%BA%8E%E4%B8%8D%E5%90%8C%E5%AF%B9%E8%B1%A1%E6%97%B6%E4%BA%A7%E7%94%9F%E4%B8%8D%E5%90%8C%E8%A1%8C%E4%B8%BA%E3%80%82C%2B%2B%20%E9%80%9A%E8%BF%87%E8%99%9A%E5%87%BD%E6%95%B0%E9%85%8D%E5%90%88%E5%9F%BA%E7%B1%BB%E6%8C%87%E9%92%88%E6%88%96%E5%BC%95%E7%94%A8%EF%BC%8C%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E4%BE%9D%E6%8D%AE%E5%AF%B9%E8%B1%A1%E5%AE%9E%E9%99%85%E7%B1%BB%E5%9E%8B%E8%B0%83%E7%94%A8%E7%9B%B8%E5%BA%94%E5%87%BD%E6%95%B0%E7%89%88%E6%9C%AC%EF%BC%8C%E5%AE%9E%E7%8E%B0%E8%BF%90%E8%A1%8C%E6%97%B6%E5%A4%9A%E6%80%81%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E8%99%9A%E5%87%BD%E6%95%B0%22%2C%22english%22%3A%22Virtual%20Function%22%2C%22definition%22%3A%22%E5%9C%A8%E5%9F%BA%E7%B1%BB%E4%B8%AD%E7%94%A8%20virtual%20%E5%A3%B0%E6%98%8E%E7%9A%84%E6%88%90%E5%91%98%E5%87%BD%E6%95%B0%EF%BC%8C%E6%B4%BE%E7%94%9F%E7%B1%BB%E5%8F%AF%E8%A6%86%E7%9B%96%E5%AE%83%EF%BC%9B%E9%80%9A%E8%BF%87%E5%9F%BA%E7%B1%BB%E6%8C%87%E9%92%88%E6%88%96%E5%BC%95%E7%94%A8%E8%B0%83%E7%94%A8%E6%97%B6%E6%89%A7%E8%A1%8C%E5%8A%A8%E6%80%81%E7%BB%91%E5%AE%9A%EF%BC%8C%E8%BF%90%E8%A1%8C%E6%97%B6%E5%86%B3%E5%AE%9A%E8%B0%83%E7%94%A8%E5%93%AA%E4%B8%AA%E7%89%88%E6%9C%AC%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%8A%A8%E6%80%81%E7%BB%91%E5%AE%9A%22%2C%22english%22%3A%22Dynamic%20Binding%22%2C%22definition%22%3A%22%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8%E5%9C%A8%E7%A8%8B%E5%BA%8F%E8%BF%90%E8%A1%8C%E6%97%B6%E6%89%8D%E4%BE%9D%E6%8D%AE%E5%AF%B9%E8%B1%A1%E5%AE%9E%E9%99%85%E7%B1%BB%E5%9E%8B%E7%A1%AE%E5%AE%9A%E7%9B%AE%E6%A0%87%E5%87%BD%E6%95%B0%E7%89%88%E6%9C%AC%EF%BC%8C%E4%B8%8E%E7%BC%96%E8%AF%91%E6%9C%9F%E7%A1%AE%E5%AE%9A%E7%9A%84%E9%9D%99%E6%80%81%E7%BB%91%E5%AE%9A%E7%9B%B8%E5%AF%B9%EF%BC%8C%E6%98%AF%E8%BF%90%E8%A1%8C%E6%97%B6%E5%A4%9A%E6%80%81%E7%9A%84%E5%AE%9E%E7%8E%B0%E6%9C%BA%E5%88%B6%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E7%BA%AF%E8%99%9A%E5%87%BD%E6%95%B0%22%2C%22english%22%3A%22Pure%20Virtual%20Function%22%2C%22definition%22%3A%22%E5%BD%A2%E5%A6%82%20virtual%20void%20f()%20%3D%200%20%E7%9A%84%E8%99%9A%E5%87%BD%E6%95%B0%EF%BC%8C%E6%B2%A1%E6%9C%89%E5%87%BD%E6%95%B0%E4%BD%93%E3%80%82%E5%90%AB%E7%BA%AF%E8%99%9A%E5%87%BD%E6%95%B0%E7%9A%84%E7%B1%BB%E6%98%AF%E6%8A%BD%E8%B1%A1%E7%B1%BB%EF%BC%8C%E4%B8%8D%E8%83%BD%E5%AE%9E%E4%BE%8B%E5%8C%96%EF%BC%8C%E5%8F%AA%E8%83%BD%E4%BD%9C%E4%B8%BA%E5%9F%BA%E7%B1%BB%E8%A2%AB%E7%BB%A7%E6%89%BF%E3%80%82%22%7D%5D"/>

### 2. 构造函数与析构函数

**构造函数**：与类同名、无返回类型、可重载。对象创建时自动调用。三类常见形态：
- **默认构造**：无参（或所有参数带默认值），每个类若未定义任何构造函数，编译器自动生成一个
- **有参构造**：按参数区分，支持重载
- **拷贝构造**：形如 \`A(const A& other)\`，用已有对象初始化新对象时调用

拷贝构造的三种触发时机：**用已有对象初始化新对象**、**对象作函数参数按值传递**、**函数按值返回对象**。

**初始化列表**：构造函数冒号后对成员初始化，效率高于在函数体内赋值；**const 成员、引用成员、无默认构造的成员对象**必须用初始化列表。

**析构函数** \`~A()\`：无参、不可重载、对象销毁时自动调用，用于释放资源。析构顺序与构造顺序**严格相反**。

**深拷贝与浅拷贝**：编译器默认生成的拷贝构造是浅拷贝（逐成员复制，指针只复制地址）。含动态内存的类必须自定义拷贝构造做**深拷贝**（重新分配并复制内容），否则两个对象共指一块内存，析构时会重复释放。

### 3. 继承与派生

**继承方式**（public/protected/private）决定基类成员在派生类中的访问级别：public 继承最常用，保持基类接口不变。

**赋值兼容规则**（公有继承下）：派生类对象可赋值给基类对象（对象切片，只保留基类部分）、可初始化基类引用、基类指针可指向派生类对象。反向不成立。

**构造与析构顺序**：创建派生类对象时，先调用**基类构造**，再调用**成员对象构造**，最后执行**派生类构造体**；析构严格相反。派生类构造函数用初始化列表显式调用基类有参构造。

**名字隐藏**：派生类定义与基类同名的非虚函数会**隐藏**基类所有同名重载（不是覆盖），可用 \`Base::f()\` 限定调用。

**多重继承**：可能产生二义性（菱形继承中基类被继承两份），用**虚基类** \`class B : virtual public A\` 保证公共基类只有一份。

## 二、关键原理/方法

### 1. 虚函数与动态绑定（最高频考点）

基类中用 **virtual** 声明的成员函数是虚函数，派生类中**同名同参数**的函数自动成为虚函数（可写可不写 virtual）构成**覆盖（override）**。

**动态绑定的四个条件**，缺一不可：
1. 公有继承体系
2. 基类中声明为 virtual（虚函数）
3. 派生类覆盖了该函数（同名、同参、同返回类型协变）
4. 通过**基类指针或引用**调用

若用对象本身（而非指针/引用）调用，编译期即确定版本，是**静态绑定**。

**纯虚函数与抽象类**：\`virtual void f() = 0;\` 为纯虚函数，无函数体。含纯虚函数的类是**抽象类**，**不能实例化**，只能作基类；派生类若不覆盖全部纯虚函数，仍是抽象类。

**虚析构函数**：基类析构函数应声明为 \`virtual ~Base()\`。否则通过基类指针 \`delete\` 派生类对象时只调用基类析构，派生类资源泄漏——这是下午题反复考的坑。

\`\`\`
class Base {
public:
    virtual void show() { cout << "Base"; }
    virtual ~Base() {}
};
class Derived : public Base {
public:
    void show() { cout << "Derived"; }   // 覆盖
};
int main() {
    Base *p = new Derived();
    p->show();      // 输出 Derived：虚函数 + 基类指针 → 动态绑定
    delete p;       // 基类析构是虚函数 → Derived、Base 析构都正确调用
}
\`\`\`

### 2. 运算符重载

本质是**函数重载**，关键字 \`operator\`。规则必须记死：
- **不能重载**的 5 个运算符：作用域解析 \`::\`、成员访问 \`.\`、成员指针访问 \`.*\`、三目条件 \`?:\`、\`sizeof\`
- **只能重载为成员函数**的 4 个：\`=\`、\`[]\`、\`()\`、\`->\`
- 重载**不改变**优先级、结合性、操作数个数
- \`++\` 前置 \`operator++()\`，后置 \`operator++(int)\`（int 仅作标记区分）
- 流插入 \`<<\` 一般重载为**友元函数**（左操作数是 ostream）

### 3. 指针与引用

| 对比项 | 引用 | 指针 |
|--------|------|------|
| 初始化 | 必须初始化 | 可不初始化 |
| 改绑 | 不能改绑其他对象 | 可以改指向 |
| 空值 | 无空引用 | 可为空 nullptr |
| 本质 | 对象别名 | 存放地址的变量 |

动态内存：\`new\` 分配、\`delete\` 释放、数组用 \`delete[]\`。基类指针指向派生类对象后，**虚函数调用走动态绑定，非虚函数走静态绑定**（按指针类型）。

## 三、常考题型与解题方法

**题型 1：补虚函数/纯虚函数声明**。方法：看类是否抽象（有无 "= 0"）、调用是否走基类指针。填空常考 \`virtual\`、\`= 0\`、虚析构 \`virtual ~Base()\`。

**题型 2：写出程序输出**。方法：按"构造顺序正向、析构顺序逆向"排；调用处判断是静态绑定（对象调用、非虚）还是动态绑定（基类指针/引用 + 虚函数）。

**题型 3：补拷贝构造函数**。方法：形参必须是 \`const 类名&\`；含指针成员时写深拷贝（先分配再复制内容），并在析构中释放。

**题型 4：补运算符重载**。方法：先判断该运算符能否重载、必须是成员还是友元；前置/后置 \`++\` 靠 int 参数区分；返回类型看是否需要连续运算（通常返回引用或对象）。

**题型 5：简答多态机制**。答题模板：多态的定义 → 实现前提（虚函数 + 基类指针/引用 + 覆盖）→ 动态绑定过程（运行时查虚表）→ 举例输出差异。

## 四、典型例题

**例 1（输出）** 下列程序的输出是（）。
\`\`\`
class Base {
public:
    Base() { cout << "B"; }
    virtual ~Base() { cout << "~B"; }
    virtual void show() { cout << "Base"; }
};
class Derived : public Base {
public:
    Derived() { cout << "D"; }
    ~Derived() { cout << "~D"; }
    void show() { cout << "Derived"; }
};
int main() {
    Base *p = new Derived();
    p->show();
    delete p;
    return 0;
}
\`\`\`
A. BD~B~D B. BDDerived~B~D C. BDDerived~D~B D. BD~D~B

**解析**：选 C。构造顺序：先基类构造 B，再派生类构造 D；\`p->show()\` 是虚函数经基类指针调用，动态绑定输出 Derived；\`delete p\` 时基类析构是虚函数，先派生析构 ~D 再基类析构 ~B。总输出 BDDerived~D~B。若基类析构不是虚函数，将输出 BDDerived~B（~D 不执行）。

**例 2（填空）** 补全纯虚函数声明：
\`\`\`
class Shape {
public:
    virtual double area() = 0;   // 纯虚函数
    virtual ~Shape() {}
};
class Circle : public Shape {
    double r;
public:
    Circle(double r) : r(r) {}
    double area() { return 3.14 * r * r; }
};
\`\`\`
问：Shape 类因含 ______ 而成为抽象类，不能被 ______；Circle 通过 ______ 关键字继承 Shape。

**解析**：纯虚函数；实例化；public（或"公有"）。注意 Circle 必须覆盖 area() 才能实例化，否则仍是抽象类。

**例 3（简答）** 说明 C++ 中虚函数实现运行时多态的机制，并解释为什么基类析构函数通常声明为虚函数。

**解析**：虚函数在类中用 virtual 声明，派生类覆盖后，编译器为每个含虚函数的类生成虚函数表（vtable），对象内含虚表指针。通过基类指针或引用调用虚函数时，程序运行时依据对象实际类型查表确定调用版本，即动态绑定。基类析构声明为 virtual，是为了通过基类指针删除派生类对象时能正确调用派生类析构函数释放资源，否则只调用基类析构，造成派生类资源泄漏。

## 五、复习清单

- 必背 5 个不能重载的运算符：\`::\`、\`.\`、\`.*\`、\`?:\`、\`sizeof\`；4 个只能成员重载：\`=\`、\`[]\`、\`()\`、\`->\`
- 动态绑定四条件：公有继承、虚函数、覆盖、基类指针/引用调用
- 构造顺序"基类→成员→派生"，析构顺序严格相反
- 拷贝构造形参固定为 \`const 类名&\`；含指针必须深拷贝
- 虚析构是 delete 基类指针不出错的前提
- 下午题填空写关键字要准：virtual、= 0、const、this、operator
`,
    quizzes: [
      {
        id: 'sd-15-01-q1',
        type: 'choice',
        question:
          '以下程序的输出是（）。\nclass Base {\npublic:\n    virtual void show() { cout << "Base"; }\n};\nclass Derived : public Base {\npublic:\n    void show() { cout << "Derived"; }\n};\nint main() {\n    Base *p = new Derived();\n    p->show();\n    delete p;\n    return 0;\n}',
        options: ['Base', 'Derived', '编译错误', '运行时错误'],
        answer: 'B',
        explanation:
          'show() 在基类中声明为 virtual，派生类同名同参覆盖；通过基类指针 p 调用，满足动态绑定四条件，运行时按对象实际类型 Derived 调用 Derived::show()，输出 Derived。',
      },
      {
        id: 'sd-15-01-q2',
        type: 'choice',
        question:
          '基类 Base 的析构函数不是虚函数时，执行 Base *p = new Derived(); delete p;（Derived 公有继承 Base）会发生（）。',
        options: [
          '正常依次调用 Derived 与 Base 的析构函数',
          '只调用 Base 的析构函数，Derived 的析构函数不被调用，可能造成资源泄漏',
          '编译错误',
          '运行时抛出异常',
        ],
        answer: 'B',
        explanation:
          '非虚析构函数时 delete 基类指针只按静态类型调用 Base::~Base()，派生类析构函数不执行，派生类中动态分配的资源无法释放。避免方法是把基类析构声明为 virtual。',
      },
      {
        id: 'sd-15-01-q3',
        type: 'fill',
        question:
          'C++ 中声明虚函数使用 ______ 关键字；声明纯虚函数时在函数声明之后加上 ______。',
        answer: [['virtual'], ['= 0', '=0', '0']],
        explanation:
          '虚函数声明为 virtual 返回类型 函数名(参数)；纯虚函数在声明后加 = 0（无函数体），如 virtual void f() = 0;。含纯虚函数的类是抽象类。',
      },
      {
        id: 'sd-15-01-q4',
        type: 'choice',
        question:
          '设有 class A { public: A(){cout<<"A";} ~A(){cout<<"~A";} };  class B : public A { public: B(){cout<<"B";} ~B(){cout<<"~B";} }; 执行 B b; 后程序输出为（）。',
        options: ['AB~A~B', 'AB~B~A', 'BA~B~A', 'BA~A~B'],
        answer: 'B',
        explanation:
          '创建派生类对象时先调用基类构造 A 输出 A，再调用派生类构造 B 输出 B；析构顺序与构造顺序严格相反，先 ~B 后 ~A。故输出 AB~B~A。',
      },
      {
        id: 'sd-15-01-q5',
        type: 'fill',
        question:
          'C++ 中不能重载的运算符包括作用域解析运算符 ______、成员访问运算符、成员指针访问运算符、三目条件运算符 ______ 以及 sizeof。',
        answer: [['::', '作用域解析运算符'], ['?:', '三目运算符', '三目条件运算符', '条件运算符']],
        explanation:
          '不能重载的 5 个运算符是 :: 、. 、.* 、?: 、sizeof。其余运算符都可以重载，但不能改变优先级、结合性与操作数个数。',
      },
      {
        id: 'sd-15-01-q6',
        type: 'choice',
        question: '下列关于 C++ 引用的叙述中，错误的是（）。',
        options: [
          '引用必须在定义时初始化',
          '引用初始化后不能再绑定到另一个对象',
          '可以显式定义引用的引用',
          '使用引用传递参数可以避免对象拷贝的开销',
        ],
        answer: 'C',
        explanation:
          'C++ 不允许显式定义"引用的引用"（模板实例化中的引用折叠不属于显式定义）。引用必须初始化、不能改绑、不存在空引用，这些都是引用与指针的核心区别；按引用传参避免拷贝是引用的主要用途之一。',
      },
      {
        id: 'sd-15-01-q7',
        type: 'short-answer',
        question:
          '什么是 C++ 的运行时多态？说明其实现机制（虚函数、虚表），并写出一个体现多态的最小代码示例及其输出。',
        answer:
          '运行时多态：同一操作作用于不同对象产生不同行为，调用在运行时才绑定到具体实现。机制：基类用 virtual 声明虚函数，派生类覆盖后，编译器为各类生成虚函数表 vtable，对象内含虚表指针；通过基类指针或引用调用虚函数时运行时按对象实际类型查表确定版本（动态绑定）。示例：Base *p = new Derived(); p->show(); 若 Base::show 输出 Base、Derived::show 输出 Derived，则输出 Derived。前提：公有继承 + 虚函数 + 覆盖 + 基类指针/引用调用，四者缺一不可。',
        explanation:
          '评分要点：多态定义 1.5 分；虚函数/虚表/动态绑定机制 2 分；示例代码与输出 1.5 分；答出动态绑定四条件可加分。只写"重载也算多态"不给机制分。',
      },
    ],
    references: [
      '《软件设计师教程（第5版）》清华大学出版社',
      '《C++ Primer（第5版）》Stanley B. Lippman 电子工业出版社',
    ],
  },
  {
    id: 'sd-15-02',
    moduleId: 'sd-cpp-java',
    title: 'Java面向对象程序设计',
    description: '类与对象、继承、接口、多态、异常处理、集合框架',
    content: `# Java面向对象程序设计

## 考情分析

- **分值**：下午题"面向对象程序设计"大题（与 C++ 二选一），Java 部分 5 个填空左右；上午题考重载与覆盖区别、异常分类、集合类特点
- **题型**：程序填空（补 extends/implements、补异常处理语句、补集合操作）、选择（重载覆盖判断、输出判断）、简答（重载与覆盖区别、接口与抽象类区别）
- **考频**：★★★★ 与 C++ 同题二选一。Java 语法严格，填空常考**关键字拼写**：extends、implements、abstract、throw、throws、catch、final

## 一、核心概念

### 1. 类与对象

Java 一切皆对象（基本类型除外），类由**属性、方法、构造方法、初始化块**组成。

- **构造方法**：与类同名、无返回类型、可重载；\`this(...)\` 调用本类其他构造，\`super(...)\` 调用父类构造，二者都必须位于构造体**第一行**且不能同时出现
- **访问修饰符**：private（类内）、default（包内）、protected（包内 + 不同包的子类）、public（所有）
- **static**：属类不属对象，静态方法不能直接访问实例成员；**final**：修饰类（不可继承）、方法（不可覆盖）、变量（常量）
- **this**：指向当前对象，用于区分同名成员与参数

### 2. 继承与实现

Java 是**单继承**：一个类只能 \`extends\` 一个父类，但可以 \`implements\` 多个接口。

- 子类构造必先调用父类构造（隐式 super() 或显式 super(参数)）
- **方法覆盖（override）**：子类定义与父类**同名、同参数**的方法，运行时动态绑定调用子类版本；要求访问权限**不能更严**、受检异常**不能扩大**、返回类型相同或协变
- **名字隐藏**：子类定义同名不同参方法是重载；同名同参的 static 方法是隐藏不是覆盖

### 3. 抽象类与接口

| 对比项 | 抽象类 abstract class | 接口 interface |
|--------|----------------------|----------------|
| 关键字 | extends 继承（单） | implements 实现（多） |
| 方法 | 可有抽象方法与具体方法 | 方法默认 public abstract（Java 8 起可 default/static） |
| 变量 | 任意 | 默认 public static final |
| 构造方法 | 有（供子类调用） | 无 |
| 多继承 | 不支持 | 支持（多实现） |

抽象类不能实例化，抽象方法无方法体；子类覆盖全部抽象方法后才能实例化。接口是更纯粹的"能力"约定，Java 8 后可有 \`default\` 方法提供默认实现。

<Glossary terms="%5B%7B%22term%22%3A%22%E6%96%B9%E6%B3%95%E8%A6%86%E7%9B%96%22%2C%22english%22%3A%22Method%20Overriding%22%2C%22definition%22%3A%22%E5%AD%90%E7%B1%BB%E5%AE%9A%E4%B9%89%E4%B8%8E%E7%88%B6%E7%B1%BB%E5%90%8C%E5%90%8D%E3%80%81%E5%90%8C%E5%8F%82%E6%95%B0%E5%88%97%E8%A1%A8%E7%9A%84%E6%96%B9%E6%B3%95%E4%BB%A5%E6%8F%90%E4%BE%9B%E6%96%B0%E5%AE%9E%E7%8E%B0%EF%BC%8C%E8%BF%90%E8%A1%8C%E6%97%B6%E5%8A%A8%E6%80%81%E7%BB%91%E5%AE%9A%E8%B0%83%E7%94%A8%E5%AD%90%E7%B1%BB%E7%89%88%E6%9C%AC%E3%80%82%E8%A6%81%E6%B1%82%E8%AE%BF%E9%97%AE%E6%9D%83%E9%99%90%E4%B8%8D%E8%83%BD%E6%9B%B4%E4%B8%A5%E3%80%81%E5%8F%97%E6%A3%80%E5%BC%82%E5%B8%B8%E4%B8%8D%E8%83%BD%E6%89%A9%E5%A4%A7%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E6%96%B9%E6%B3%95%E9%87%8D%E8%BD%BD%22%2C%22english%22%3A%22Method%20Overloading%22%2C%22definition%22%3A%22%E5%90%8C%E4%B8%80%E4%B8%AA%E7%B1%BB%E4%B8%AD%E6%96%B9%E6%B3%95%E5%90%8D%E7%9B%B8%E5%90%8C%E4%BD%86%E5%8F%82%E6%95%B0%E5%88%97%E8%A1%A8%E4%B8%8D%E5%90%8C%EF%BC%88%E7%B1%BB%E5%9E%8B%E3%80%81%E4%B8%AA%E6%95%B0%E6%88%96%E9%A1%BA%E5%BA%8F%EF%BC%89%EF%BC%8C%E7%BC%96%E8%AF%91%E6%9C%9F%E9%9D%99%E6%80%81%E7%BB%91%E5%AE%9A%E3%80%82%E4%BB%85%E8%BF%94%E5%9B%9E%E5%80%BC%E4%B8%8D%E5%90%8C%E4%B8%8D%E6%9E%84%E6%88%90%E9%87%8D%E8%BD%BD%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E6%8E%A5%E5%8F%A3%22%2C%22english%22%3A%22Interface%22%2C%22definition%22%3A%22%E4%B8%80%E7%A7%8D%E5%BC%95%E7%94%A8%E7%B1%BB%E5%9E%8B%EF%BC%8C%E6%96%B9%E6%B3%95%E9%BB%98%E8%AE%A4%20public%20abstract%EF%BC%88Java%208%20%E5%90%8E%E5%8F%AF%E6%9C%89%20default%2Fstatic%20%E6%96%B9%E6%B3%95%EF%BC%89%EF%BC%8C%E5%AD%97%E6%AE%B5%E9%BB%98%E8%AE%A4%20public%20static%20final%E3%80%82%E7%B1%BB%E7%94%A8%20implements%20%E5%AE%9E%E7%8E%B0%EF%BC%8C%E5%8F%AF%E5%AE%9E%E7%8E%B0%E5%A4%9A%E4%B8%AA%E6%8E%A5%E5%8F%A3%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%8F%97%E6%A3%80%E5%BC%82%E5%B8%B8%22%2C%22english%22%3A%22Checked%20Exception%22%2C%22definition%22%3A%22Exception%20%E4%B8%AD%E9%99%A4%20RuntimeException%20%E4%BB%A5%E5%A4%96%E7%9A%84%E5%BC%82%E5%B8%B8%EF%BC%8C%E7%BC%96%E8%AF%91%E6%9C%9F%E5%BF%85%E9%A1%BB%E7%94%A8%20try-catch%20%E6%8D%95%E8%8E%B7%E6%88%96%E7%94%A8%20throws%20%E5%A3%B0%E6%98%8E%EF%BC%8C%E5%90%A6%E5%88%99%E6%97%A0%E6%B3%95%E9%80%9A%E8%BF%87%E7%BC%96%E8%AF%91%E3%80%82%22%7D%5D"/>

### 4. 多态与动态绑定

Java 的多态即**方法覆盖 + 向上转型**：

\`\`\`
class Animal {
    void cry() { System.out.print("Animal "); }
}
class Dog extends Animal {
    void cry() { System.out.print("Dog "); }
}
public class Test {
    public static void main(String[] args) {
        Animal a = new Dog();   // 向上转型，编译类型 Animal，运行类型 Dog
        a.cry();                // 输出 Dog：实例方法覆盖走动态绑定
    }
}
\`\`\`

要点：**实例方法**看运行类型（动态绑定）；**属性与 static 方法**看编译类型（静态绑定，static 是隐藏不是覆盖）。向下转型需 \`instanceof\` 判断，否则可能 ClassCastException。

### 5. 异常处理

异常体系：\`Throwable\` 派生 \`Error\`（严重错误，不处理）与 \`Exception\`；Exception 又分**受检异常**（编译期必须捕获或声明，如 IOException）与**非受检异常**（RuntimeException 及其子类，如 NullPointerException、IndexOutOfBoundsException，可不处理）。

\`\`\`
try {
    // 可能抛出异常的代码
} catch (IOException e) {
    // 捕获处理，子类 catch 在前
} catch (Exception e) {
    // 父类 catch 在后
} finally {
    // 无论是否异常都会执行（除 JVM 退出），常用于释放资源
}
\`\`\`

- **throw** 语句抛出一个异常对象；**throws** 在方法签名上声明可能抛出的受检异常
- finally 块**总会执行**（return 也会先执行 finally）；try-with-resources 自动关闭 AutoCloseable 资源
- 自定义异常继承 Exception（受检）或 RuntimeException（非受检）

### 6. 集合框架

| 集合类 | 结构 | 特点 | 常用操作 |
|--------|------|------|----------|
| ArrayList | 动态数组 | 随机访问 O(1)，中间插入删除 O(n) | add / get / remove |
| LinkedList | 双向链表 | 插入删除 O(1)，随机访问 O(n) | addFirst / removeLast |
| HashMap | 散列表 | 键唯一、无序，允许一个 null 键 | put / get / containsKey |
| HashSet | 基于 HashMap | 元素唯一、无序 | add / contains |

- **List**（有序可重复）→ ArrayList、LinkedList；**Set**（无序不重复）→ HashSet、TreeSet（有序）；**Map**（键值对）→ HashMap、TreeMap
- 迭代器 \`Iterator\` 遍历时删除元素须用 \`it.remove()\`，直接调集合 remove 会 ConcurrentModificationException
- 泛型 \`<E>\` 提供编译期类型安全

## 二、关键原理/方法

### 1. 重载（Overload）与覆盖（Override）区别（必背）

| 对比项 | 重载 Overload | 覆盖 Override |
|--------|---------------|---------------|
| 发生位置 | 同一个类中 | 子类与父类之间 |
| 方法名 | 相同 | 相同 |
| 参数列表 | 必须不同 | 必须相同 |
| 返回类型 | 无关（仅返回值不同不构成重载） | 相同或协变 |
| 访问权限 | 无要求 | 不能比父类更严 |
| 绑定时机 | 编译期静态绑定 | 运行期动态绑定 |

记忆：**重载看参数，覆盖看父子；重载编译期定，覆盖运行期定**。

### 2. 接口与抽象类的选用

- 要"是什么"（is-a，共享代码与状态）→ 抽象类
- 要"能做什么"（can-do，能力契约、支持多实现）→ 接口
- Java 8 后接口 default 方法让接口可演进，但**接口不能有构造方法、不能有实例状态**

### 3. 异常处理的答题套路

程序填空见 \`try\` 块内抛异常处填 **throw new XxxException(...)**；见方法声明后填 **throws XxxException**；见资源回收处填 **finally** 或 catch。catch 块顺序：**子类异常在前、父类异常在后**，否则编译错误。

## 三、常考题型与解题方法

**题型 1：补 extends / implements / abstract / super**。方法：看类是否抽象（有无 abstract 方法）、是否实现接口；构造第一行必须是 super 或 this。

**题型 2：判断输出（多态）**。方法：先看调用方式——实例方法按运行类型（new 出来的类），属性与 static 方法按编译类型（引用声明的类）。

**题型 3：补异常处理语句**。方法：区分 throw（抛对象）与 throws（声明）；finally 用于释放资源；受检异常必须处理或声明。

**题型 4：集合类选型**。方法：按需求过滤——要随机访问选 ArrayList，要频繁插删选 LinkedList，要键值映射与唯一键选 HashMap，要唯一元素选 HashSet。

**题型 5：简答重载与覆盖区别**。直接按上表作答，六个维度（位置、方法名、参数、返回、访问权限、绑定时机）逐条对比。

## 四、典型例题

**例 1（选择）** 下列关于方法重载与方法覆盖的叙述，正确的是（）。
A. 重载发生在父子类之间，覆盖发生在同一个类中
B. 覆盖要求方法名与参数列表都相同，重载要求方法名相同而参数列表不同
C. 覆盖时子类方法的访问权限可以比父类更严格
D. 重载在运行时决定调用哪个方法

**解析**：选 B。A 正好说反；C 覆盖要求访问权限不能更严；D 重载是编译期静态绑定。重载看参数差异，覆盖看父子类同名同参。

**例 2（输出）** 写出下列程序的返回值：
\`\`\`
public static int f() {
    int i = 1;
    try {
        return i;
    } finally {
        i = 2;
    }
}
\`\`\`

**解析**：返回 1。return 语句先计算返回值 1 并保存，随后执行 finally（i 改为 2 不影响已保存的返回值），最后返回。若 finally 中也有 return，才会覆盖 try 中的返回值（应避免）。

**例 3（填空）** Java 中实现继承使用 ______ 关键字，实现接口使用 ______ 关键字；接口中的方法默认为 public abstract，字段默认为 public static ______。

**解析**：extends、implements、final。单继承多实现是 Java 与 C++ 多继承的最大区别；接口字段是隐式常量。

**例 4（简答）** 简述 Java 中受检异常与非受检异常的区别，并说明 throw 与 throws 的用法差异。

**解析**：受检异常是 Exception 中除 RuntimeException 以外的异常（如 IOException、SQLException），编译期强制要求用 try-catch 捕获或用 throws 声明，否则不能通过编译；非受检异常是 RuntimeException 及其子类（如 NullPointerException、ArrayIndexOutOfBoundsException），编译器不强制处理，通常由程序逻辑缺陷引起。throw 用于方法体内抛出一个异常对象（后接 new 异常实例）；throws 用于方法签名上声明该方法可能抛出的受检异常，由调用者处理。二者一字之差、位置与作用完全不同。

## 五、复习清单

- 重载与覆盖六维对比表必须能默写
- 单继承 extends、多实现 implements；构造第一行 super 或 this 二选一
- 实例方法动态绑定（看运行类型），属性与 static 静态绑定（看编译类型）
- throw 抛对象、throws 声明异常；finally 总会执行
- 受检异常必须捕获或声明；RuntimeException 是非受检
- 集合选型：随机访问 ArrayList、插删 LinkedList、键值 HashMap、唯一 HashSet
`,
    quizzes: [
      {
        id: 'sd-15-02-q1',
        type: 'choice',
        question: '下列关于方法重载（Overload）与方法覆盖（Override）的叙述，正确的是（）。',
        options: [
          '重载发生在父子类之间，覆盖发生在同一个类中',
          '覆盖要求方法名与参数列表都相同，重载要求方法名相同而参数列表不同',
          '覆盖时子类方法的访问权限可以比父类更严格',
          '重载在运行时决定调用哪个方法',
        ],
        answer: 'B',
        explanation:
          '重载发生在同一个类中，靠参数列表差异区分，编译期静态绑定；覆盖发生在父子类之间，方法名与参数列表必须相同，运行期动态绑定，且访问权限不能比父类更严、受检异常不能扩大。',
      },
      {
        id: 'sd-15-02-q2',
        type: 'choice',
        question:
          '下列方法的返回值是（）。\npublic static int f() {\n    int i = 1;\n    try {\n        return i;\n    } finally {\n        i = 2;\n    }\n}',
        options: ['1', '2', '编译错误', '0'],
        answer: 'A',
        explanation:
          'return 语句先求值并暂存返回值 1，再执行 finally（i = 2 只改局部变量，不影响已暂存的返回值），最后返回 1。若 finally 中出现 return 才会覆盖 try 的返回值。',
      },
      {
        id: 'sd-15-02-q3',
        type: 'fill',
        question:
          'Java 中实现继承使用 ______ 关键字，实现接口使用 ______ 关键字；一个类只能继承一个父类，但可以实现多个接口。',
        answer: [['extends'], ['implements', 'implement']],
        explanation:
          'extends 表示继承（Java 单继承，只能一个父类），implements 表示实现接口（可以多个）。注意拼写：implements 结尾是 s。',
      },
      {
        id: 'sd-15-02-q4',
        type: 'fill',
        question:
          'Java 中用 ______ 语句抛出一个异常对象；若方法内不处理受检异常，必须在方法签名上用 ______ 声明该方法可能抛出的异常。',
        answer: [['throw'], ['throws']],
        explanation:
          'throw 后接异常对象（throw new IOException()），用在方法体内；throws 后接异常类名列表，用在方法签名上声明可能抛出的受检异常，由调用者处理。一字之差，位置与作用不同。',
      },
      {
        id: 'sd-15-02-q5',
        type: 'choice',
        question:
          '设有 class Animal { void cry(){ System.out.print("Animal "); } }，class Dog extends Animal { void cry(){ System.out.print("Dog "); } }，执行 Animal a = new Dog(); a.cry(); 输出为（）。',
        options: ['Animal', 'Dog', 'Animal Dog', '编译错误'],
        answer: 'B',
        explanation:
          'cry() 是实例方法且被子类覆盖，引用 a 虽声明为 Animal，但运行类型是 Dog，动态绑定调用 Dog 类的 cry()，输出 Dog。若调用的是属性或 static 方法才看编译类型 Animal。',
      },
      {
        id: 'sd-15-02-q6',
        type: 'fill',
        question: 'Java 中所有类的根类是 ______，所有异常类的根类是 ______。',
        answer: [['Object', 'java.lang.Object'], ['Throwable', 'java.lang.Throwable']],
        explanation:
          'Object 是类层次的根，所有类直接或间接继承它；Throwable 是异常体系的根，派生 Error 与 Exception 两大分支，Exception 又分受检与非受检（RuntimeException 为非受检）。',
      },
      {
        id: 'sd-15-02-q7',
        type: 'choice',
        question: '下列关于 Java 接口的叙述，错误的是（）。',
        options: [
          '接口中的方法默认是 public abstract',
          '接口中的变量默认是 public static final',
          '一个类可以实现多个接口',
          '接口可以包含构造方法',
        ],
        answer: 'D',
        explanation:
          '接口不能有构造方法，也不能有实例状态；接口方法默认 public abstract（Java 8 起可有 default/static 方法），字段默认 public static final；类用 implements 可实现多个接口。',
      },
      {
        id: 'sd-15-02-q8',
        type: 'short-answer',
        question:
          '简述 Java 中方法重载与方法覆盖的区别（从发生位置、参数列表、返回类型、访问权限、绑定时机等方面作答）。',
        answer:
          '1. 发生位置：重载在同一个类中，覆盖在子类与父类之间。2. 方法名：两者都相同。3. 参数列表：重载必须不同（类型、个数或顺序），覆盖必须相同。4. 返回类型：重载无要求（仅返回值不同不构成重载），覆盖要求相同或协变。5. 访问权限：重载无要求，覆盖不能比父类更严，受检异常不能扩大。6. 绑定时机：重载编译期静态绑定，覆盖运行期动态绑定（体现多态）。记忆：重载看参数、覆盖看父子；重载编译定、覆盖运行定。',
        explanation:
          '评分要点：六个维度每点 1 分，答出"重载编译期/覆盖运行期动态绑定"是关键得分点；仅举例子不作对比最多得一半分。',
      },
    ],
    references: [
      '《软件设计师教程（第5版）》清华大学出版社',
      '《Java核心技术 卷I》Cay S. Horstmann 机械工业出版社',
    ],
  },
];
