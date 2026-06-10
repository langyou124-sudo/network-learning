import { Module } from '@/types';
import { networkEngineerModules } from './network-engineer';
import { softwareDesignerModules } from './software-designer';

export { networkEngineerModules } from './network-engineer';
export { softwareDesignerModules } from './software-designer';

export const ruankaoModules: Module[] = [
  ...networkEngineerModules,
  ...softwareDesignerModules,
];
