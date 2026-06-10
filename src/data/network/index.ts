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

const topicMap: Record<string, { title: string; description: string; content: string; quizzes: any[]; references: string[] }> = {
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
