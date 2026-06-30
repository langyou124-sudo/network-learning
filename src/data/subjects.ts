export interface Subject {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
  status: 'active' | 'coming';
  moduleCount: number;
}

export const subjects: Subject[] = [
  {
    id: 'network',
    title: '网络工程',
    description: '从网络基础到运维实战，10大模块循序渐进',
    icon: '📐',
    href: '/learn/network',
    status: 'active',
    moduleCount: 10,
  },
  {
    id: 'ruankao',
    title: '软考备考',
    description: '覆盖初级/中级/高级全级别软考科目',
    icon: '📝',
    href: '/learn/ruankao',
    status: 'active',
    moduleCount: 6,
  },
  {
    id: 'pe-exam-802',
    title: '802经济学综合',
    description: '政治经济学(50分) + 微观经济学(50分) + 宏观经济学(50分)',
    icon: '💰',
    href: '/learn/pe-exam-802',
    status: 'active',
    moduleCount: 3,
  },
  {
    id: 'pe-exam-303',
    title: '303数学三',
    description: '微积分(90分) + 线性代数(30分) + 概率论(30分)',
    icon: '📐',
    href: '/learn/pe-exam-303',
    status: 'active',
    moduleCount: 3,
  },
];

export function getSubjectById(id: string) {
  return subjects.find(s => s.id === id);
}
