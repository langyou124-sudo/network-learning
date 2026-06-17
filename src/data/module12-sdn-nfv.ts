import { Module } from '@/types';
import { topic_51 } from './sdn-nfv/topics/topic-51';
import { topic_52 } from './sdn-nfv/topics/topic-52';
import { topic_53 } from './sdn-nfv/topics/topic-53';
import { topic_54 } from './sdn-nfv/topics/topic-54';

export const sdnNfv: Module = {
  id: 'sdn-nfv',
  title: 'SDN与NFV',
  description: '软件定义网络与网络功能虚拟化',
  icon: '🎛️',
  topics: [topic_51, topic_52, topic_53, topic_54],
};
