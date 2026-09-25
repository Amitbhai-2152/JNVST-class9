import type { Question, Difficulty, QuestionType, ID } from '../types';
import { allQuestions } from './questions';
import { subjects, chapters, topics } from './curriculum';

export const QUESTION_BANK_VERSION = 1 as const;

export type QuestionBankQuestion = Question;

export interface QuestionBankTaxonomy {
  subjects: typeof subjects;
  chapters: typeof chapters;
  topics: typeof topics;
}

export interface QuestionBankStats {
  total: number;
  bySubject: Record<string, number>;
  byDifficulty: Record<Difficulty, number>;
  byType: Record<QuestionType, number>;
}

export interface QuestionBankValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export const questionBankTaxonomy: QuestionBankTaxonomy = {
  subjects,
  chapters,
  topics,
};

export const questionBank: readonly QuestionBankQuestion[] = allQuestions;

export const questionBankById = new Map<ID, QuestionBankQuestion>(
  questionBank.map((question) => [question.id, question]),
);

const emptyDifficultyCounts = (): Record<Difficulty, number> => ({
  easy: 0,
  medium: 0,
  hard: 0,
  challenge: 0,
});

const emptyTypeCounts = (): Record<QuestionType, number> => ({
  mcq: 0,
  'true-false': 0,
  'multiple-select': 0,
  passage: 0,
});

export const questionBankStats: QuestionBankStats = questionBank.reduce(
  (stats, question) => {
    stats.bySubject[question.subjectId] = (stats.bySubject[question.subjectId] ?? 0) + 1;
    stats.byDifficulty[question.difficulty] += 1;
    stats.byType[question.type] += 1;
    return stats;
  },
  {
    total: 0,
    bySubject: {},
    byDifficulty: emptyDifficultyCounts(),
    byType: emptyTypeCounts(),
  } satisfies QuestionBankStats,
);

questionBankStats.total = questionBank.length;

const subjectIds = new Set(subjects.map((subject) => subject.id));
const chapterById = new Map(chapters.map((chapter) => [chapter.id, chapter]));
const topicById = new Map(topics.map((topic) => [topic.id, topic]));

export function validateQuestionBank(): QuestionBankValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  const seenIds = new Set<string>();

  for (const question of questionBank) {
    if (seenIds.has(question.id)) {
      errors.push(`Duplicate question ID: ${question.id}`);
    }
    seenIds.add(question.id);

    if (!subjectIds.has(question.subjectId)) {
      errors.push(`Unknown subjectId ${question.subjectId} on ${question.id}`);
    }

    const chapter = chapterById.get(question.chapterId);
    if (!chapter) {
      errors.push(`Unknown chapterId ${question.chapterId} on ${question.id}`);
    } else if (chapter.subjectId !== question.subjectId) {
      errors.push(`Subject/chapter mismatch on ${question.id}`);
    }

    const topic = topicById.get(question.topicId);
    if (!topic) {
      errors.push(`Unknown topicId ${question.topicId} on ${question.id}`);
    } else {
      if (topic.chapterId !== question.chapterId) {
        errors.push(`Chapter/topic mismatch on ${question.id}`);
      }
    }

    if (question.options.length !== 4) {
      warnings.push(`Expected 4 options for JNVST-style question ${question.id}; found ${question.options.length}`);
    }

    const optionIds = new Set(question.options.map((option) => option.id));
    const duplicateOptionIds = question.options
      .map((option) => option.id)
      .filter((id, index, ids) => ids.indexOf(id) !== index);
    if (duplicateOptionIds.length) {
      errors.push(`Duplicate option ID on ${question.id}`);
    }

    if (question.correctOptionIds.length < 1) {
      errors.push(`No correct option on ${question.id}`);
    }

    for (const correctId of question.correctOptionIds) {
      if (!optionIds.has(correctId)) {
        errors.push(`Correct option ${correctId} is missing on ${question.id}`);
      }
    }

    if (!question.textPlain && !question.text?.length) {
      errors.push(`Missing question text on ${question.id}`);
    }

    if (!question.tags.length) {
      warnings.push(`Question has no tags: ${question.id}`);
    }
  }

  if (questionBankById.size !== questionBank.length) {
    errors.push('Question ID index size does not match question-bank size');
  }

  return { valid: errors.length === 0, errors, warnings };
}
