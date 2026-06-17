// 马克思主义课程类型定义
// These types are used internally for essay question management.
// For the main app, topics export quizzes with type: 'short-answer' (compatible with @/types Quiz).

export interface EssayQuestion {
  id: string;
  moduleId: string;
  moduleTitle: string;
  question: string;
  keyPoints: string[];  // 标准答案要点（不展示给学生）
  difficulty: 'basic' | 'intermediate' | 'advanced';
  tags: string[];  // 知识点标签
}

export interface EssayAnswer {
  questionId: string;
  studentAnswer: string;
  submittedAt: string;
}

export interface AIEvaluation {
  score: number;  // 1-10
  strengths: string[];
  weaknesses: string[];
  keyPointsCovered: string[];
  keyPointsMissed: string[];
  modelAnswer: string;
  deepAnalysis: string;  // 马克思视角的深度解析
}
