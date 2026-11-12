import type { QuestionProgress } from '@/core/interfaces/progress.interface';
import { createRandom } from './random';
import type { QuestionFilters } from '../interfaces/session.interface';
import { selectQuestions } from './select-questions';
import { makeQuestion } from '../testing/question.factory';

const QUESTIONS = [
  makeQuestion({ id: 'q1', topic: 'fundamentos', level: 'beginner' }),
  makeQuestion({ id: 'q2', topic: 'fundamentos', level: 'advanced' }),
  makeQuestion({ id: 'q3', topic: 'semantica', level: 'beginner' }),
  makeQuestion({ id: 'q4', topic: 'semantica', level: 'intermediate' }),
];

const NO_FILTERS: QuestionFilters = { topics: [], level: null, onlyUnanswered: false, ids: [] };

const progressFor = (lastCorrect: boolean, box: number): QuestionProgress => ({
  tech: 'html',
  topic: 'fundamentos',
  attempts: 1,
  correctCount: lastCorrect ? 1 : 0,
  lastCorrect,
  lastConfidence: 'sure',
  box,
  lastAnsweredAt: 0,
  nextReviewAt: 0,
});

const ids = (questions: { id: string }[]) => questions.map((question) => question.id).sort();

describe('selectQuestions', () => {
  it('filters by topic and level', () => {
    const result = selectQuestions(
      QUESTIONS,
      { ...NO_FILTERS, topics: ['semantica'], level: 'beginner' },
      {},
      null,
      createRandom(1),
    );
    expect(ids(result)).toEqual(['q3']);
  });

  it('respects the limit', () => {
    expect(selectQuestions(QUESTIONS, NO_FILTERS, {}, 2, createRandom(1))).toHaveLength(2);
  });

  it('skips answered questions when asked to', () => {
    const result = selectQuestions(
      QUESTIONS,
      { ...NO_FILTERS, onlyUnanswered: true },
      { q1: progressFor(true, 2), q2: progressFor(false, 1) },
      null,
      createRandom(1),
    );
    expect(ids(result)).toEqual(['q3', 'q4']);
  });

  it('puts unseen first, then missed, then the least mastered', () => {
    const result = selectQuestions(
      QUESTIONS,
      NO_FILTERS,
      { q1: progressFor(true, 5), q2: progressFor(false, 1), q3: progressFor(true, 2) },
      null,
      createRandom(3),
    );
    expect(result.map((question) => question.id)).toEqual(['q4', 'q2', 'q3', 'q1']);
  });

  it('uses explicit ids and ignores the other filters', () => {
    const result = selectQuestions(
      QUESTIONS,
      { ...NO_FILTERS, ids: ['q2', 'q4'], level: 'beginner' },
      {},
      1,
      createRandom(1),
    );
    expect(ids(result)).toEqual(['q2', 'q4']);
  });
});
