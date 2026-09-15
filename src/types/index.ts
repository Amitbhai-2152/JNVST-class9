export type ID = string;
export type Difficulty = 'easy' | 'medium' | 'hard' | 'challenge';
export type QuestionType = 'mcq' | 'true-false' | 'multiple-select' | 'passage';

export interface Subject {
  id: ID;
  title: string;
  description: string;
  iconRef: string;
  order: number;
  chapterIds: ID[];
}

export interface Chapter {
  id: ID;
  subjectId: ID;
  title: string;
  order: number;
  topicIds: ID[];
}

export interface Topic {
  id: ID;
  chapterId: ID;
  title: string;
  order: number;
  lessonIds: ID[];
  practiceQuestionIds: ID[];
}

export type ContentBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; style: 'bullet' | 'number'; items: string[] }
  | { type: 'formula'; expression: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'image'; src: string; alt: string; caption?: string }
  | { type: 'callout'; style: 'info' | 'warning' | 'important' | 'example'; title?: string; text: string }
  | { type: 'step-by-step'; steps: string[] };

export interface Lesson {
  id: ID;
  topicId: ID;
  title: string;
  objectives: string[];
  content: ContentBlock[];
  estimatedMinutes: number;
}

export interface QuestionOption { id: ID; text: string; }

export interface Question {
  id: ID;
  type: QuestionType;
  subjectId: ID;
  chapterId: ID;
  topicId: ID;
  passageId?: ID;
  text: ContentBlock[];
  textPlain?: string;
  options: QuestionOption[];
  correctOptionIds: ID[];
  explanation: ContentBlock[];
  difficulty: Difficulty;
  tags: string[];
  metadata?: { source?: string; year?: number };
}

export interface QuestionAttempt {
  selectedOptionIds: ID[];
  isCorrect: boolean;
  timestamp: number;
  mode: 'practice' | 'mock-test' | 'revision';
}

export interface MockTestResult {
  id: ID;
  score: number;
  totalMarks: number;
  timestamp: number;
  answers: Record<ID, ID[]>;
  sectionScores: Record<ID, number>;
}

export interface ProgressState {
  lessonActivity: Record<ID, { status: 'completed' | 'in-progress'; lastAccessed: number }>;
  questionAttempts: Record<ID, QuestionAttempt[]>;
  bookmarks: { questionIds: ID[]; lessonIds: ID[] };
  revisionHistory: Array<{ entityType: 'topic' | 'lesson' | 'question' | 'mock-test'; entityId: ID; timestamp: number }>;
  recentlyStudied: Array<{ id: ID; title: string; type: 'lesson' | 'topic'; timestamp: number }>;
  mockTestResults: MockTestResult[];
}
