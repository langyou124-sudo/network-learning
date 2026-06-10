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
];

export function getSubjectById(id: string) {
  return subjects.find(s => s.id === id);
}
