import { Module } from '@/types';
import { modulesMeta } from './modules';
import { topic_01 } from './topics/topic-01';
import { topic_02 } from './topics/topic-02';
import { topic_03 } from './topics/topic-03';
import { topic_04 } from './topics/topic-04';
import { topic_05 } from './topics/topic-05';
import { topic_06 } from './topics/topic-06';
import { topic_07 } from './topics/topic-07';
import { topic_08 } from './topics/topic-08';
import { topic_09 } from './topics/topic-09';
import { topic_10 } from './topics/topic-10';
import { topic_11 } from './topics/topic-11';
import { topic_12 } from './topics/topic-12';
import { topic_13 } from './topics/topic-13';
import { topic_14 } from './topics/topic-14';
import { topic_15 } from './topics/topic-15';
import { topic_16 } from './topics/topic-16';
import { topic_17 } from './topics/topic-17';
import { topic_18 } from './topics/topic-18';
import { topic_19 } from './topics/topic-19';
import { topic_20 } from './topics/topic-20';
import { topic_21 } from './topics/topic-21';
import { topic_22 } from './topics/topic-22';
import { topic_06_01 } from './topics/topic-06-01';
import { topic_06_02 } from './topics/topic-06-02';
import { topic_06_03 } from './topics/topic-06-03';
import { topic_06_04 } from './topics/topic-06-04';
import { topic_07_01 } from './topics/topic-07-01';
import { topic_07_02 } from './topics/topic-07-02';
import { topic_07_03 } from './topics/topic-07-03';
import { topic_07_04 } from './topics/topic-07-04';
import { topic_08_01 } from './topics/topic-08-01';
import { topic_08_02 } from './topics/topic-08-02';
import { topic_08_03 } from './topics/topic-08-03';
import { topic_08_04 } from './topics/topic-08-04';
import { topic_09_01 } from './topics/topic-09-01';
import { topic_09_02 } from './topics/topic-09-02';
import { topic_09_03 } from './topics/topic-09-03';
import { topic_10_01 } from './topics/topic-10-01';
import { topic_10_02 } from './topics/topic-10-02';
import { topic_10_03 } from './topics/topic-10-03';
import { topic_10_04 } from './topics/topic-10-04';
import { topic_41 } from './topics/topic-41';
import { topic_42 } from './topics/topic-42';
import { topic_43 } from './topics/topic-43';
import { topic_44 } from './topics/topic-44';
import { topic_45 } from './topics/topic-45';
import { topic_46 } from './topics/topic-46';
import { topic_50 } from './topics/topic-50';
import { topic_47 } from './topics/topic-47';
import { topic_48 } from './topics/topic-48';
import { topic_49 } from './topics/topic-49';
import { topic_51 } from './topics/topic-51';
import { topic_52 } from './topics/topic-52';
import { topic_53 } from './topics/topic-53';
import { topic_54 } from './topics/topic-54';
import { topic_55 } from './topics/topic-55';
import { topic_56 } from './topics/topic-56';
import { topic_57 } from './topics/topic-57';
import { topic_58 } from './topics/topic-58';
import { topic_59 } from './topics/topic-59';
import { topic_60 } from './topics/topic-60';
import { topic_61 } from './topics/topic-61';
import { topic_62 } from './topics/topic-62';

const topicMap: Record<string, { title: string; description: string; content: string; quizzes: { id: string; type: string; question: string; options?: string[]; answer: string | string[]; explanation: string }[]; references: string[] }> = {
  'topic-01': topic_01,
  'topic-02': topic_02,
  'topic-03': topic_03,
  'topic-04': topic_04,
  'topic-05': topic_05,
  'topic-06': topic_06,
  'topic-07': topic_07,
  'topic-08': topic_08,
  'topic-09': topic_09,
  'topic-10': topic_10,
  'topic-11': topic_11,
  'topic-12': topic_12,
  'topic-13': topic_13,
  'topic-14': topic_14,
  'topic-15': topic_15,
  'topic-16': topic_16,
  'topic-17': topic_17,
  'topic-18': topic_18,
  'topic-19': topic_19,
  'topic-20': topic_20,
  'topic-21': topic_21,
  'topic-22': topic_22,
  'topic-06-01': topic_06_01,
  'topic-06-02': topic_06_02,
  'topic-06-03': topic_06_03,
  'topic-06-04': topic_06_04,
  'topic-07-01': topic_07_01,
  'topic-07-02': topic_07_02,
  'topic-07-03': topic_07_03,
  'topic-07-04': topic_07_04,
  'topic-08-01': topic_08_01,
  'topic-08-02': topic_08_02,
  'topic-08-03': topic_08_03,
  'topic-08-04': topic_08_04,
  'topic-09-01': topic_09_01,
  'topic-09-02': topic_09_02,
  'topic-09-03': topic_09_03,
  'topic-10-01': topic_10_01,
  'topic-10-02': topic_10_02,
  'topic-10-03': topic_10_03,
  'topic-10-04': topic_10_04,
  'topic-41': topic_41,
  'topic-42': topic_42,
  'topic-43': topic_43,
  'topic-44': topic_44,
  'topic-45': topic_45,
  'topic-46': topic_46,
  'topic-50': topic_50,
  'topic-47': topic_47,
  'topic-48': topic_48,
  'topic-49': topic_49,
  'topic-51': topic_51,
  'topic-52': topic_52,
  'topic-53': topic_53,
  'topic-54': topic_54,
  'topic-55': topic_55,
  'topic-56': topic_56,
  'topic-57': topic_57,
  'topic-58': topic_58,
  'topic-59': topic_59,
  'topic-60': topic_60,
  'topic-61': topic_61,
  'topic-62': topic_62,
};

export const networkModules: Module[] = modulesMeta.map(mod => ({
  id: mod.id,
  title: mod.title,
  description: mod.description,
  icon: mod.icon,
  topics: mod.topicIds.map(tid => ({
    id: tid,
    moduleId: mod.id,
    title: topicMap[tid].title,
    description: topicMap[tid].description,
    content: topicMap[tid].content,
    quizzes: topicMap[tid].quizzes,
    references: topicMap[tid].references
  }))
}));
