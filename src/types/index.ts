// 课程模块
export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: Topic[];
}

// 课题
export interface Topic {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  content: string; // Markdown 内容
  quizzes: Quiz[];
  references: string[];
}

// 练习题
export interface Quiz {
  id: string;
  type: 'choice' | 'fill' | 'short-answer';
  question: string;
  options?: string[]; // 选择题选项
  answer: string | string[];
  explanation: string;
}

// 学习进度
export interface Progress {
  completedTopics: string[]; // 已完成的课题ID
  quizScores: Record<string, {
    correct: number;
    total: number;
    date: string;
  }>;
  weakPoints: string[]; // 薄弱知识点
  notes: Record<string, string>; // 课题ID -> 笔记内容
  lastStudyDate: string;
  totalStudyHours: number;
}

// 错题记录
export interface MistakeRecord {
  quizId: string;
  topicId: string;
  question: string;
  userAnswer: string | string[];
  correctAnswer: string | string[];
  date: string;
  reviewed: boolean;
}
