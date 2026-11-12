import type { AnswerRecord } from '../interfaces/scoring.interface';
import { makeQuestion } from '../testing/question.factory';
import { makeTopic } from '../testing/tech.factory';
import { isAnswerCorrect, needsReview, summarizeSession } from './scoring';

const TOPICS = [
  makeTopic('fundamentos', { beginner: 2, intermediate: 0, advanced: 0 }),
  makeTopic('semantica', { beginner: 1, intermediate: 0, advanced: 0 }),
  makeTopic('formularios', { beginner: 0, intermediate: 0, advanced: 0 }),
];

describe('isAnswerCorrect', () => {
  it('accepts an exact match regardless of order', () => {
    const question = makeQuestion({ kind: 'multiple', correct: ['a', 'c'] });
    expect(isAnswerCorrect(question, ['c', 'a'])).toBe(true);
  });

  it('rejects partial or extra selections', () => {
    const question = makeQuestion({ kind: 'multiple', correct: ['a', 'c'] });
    expect(isAnswerCorrect(question, ['a'])).toBe(false);
    expect(isAnswerCorrect(question, ['a', 'b', 'c'])).toBe(false);
  });
});

describe('needsReview', () => {
  it('flags wrong answers and lucky guesses only', () => {
    const base = { questionId: 'q1', selected: ['a'] };
    expect(needsReview({ ...base, correct: false, confidence: 'sure' })).toBe(true);
    expect(needsReview({ ...base, correct: true, confidence: 'guess' })).toBe(true);
    expect(needsReview({ ...base, correct: true, confidence: 'unsure' })).toBe(false);
  });
});

describe('summarizeSession', () => {
  const questions = [
    makeQuestion({ id: 'q1', topic: 'fundamentos' }),
    makeQuestion({ id: 'q2', topic: 'fundamentos' }),
    makeQuestion({ id: 'q3', topic: 'semantica' }),
  ];
  const answers: AnswerRecord[] = [
    { questionId: 'q1', selected: ['a'], correct: true, confidence: 'sure' },
    { questionId: 'q2', selected: ['b'], correct: false, confidence: 'unsure' },
    { questionId: 'q3', selected: ['a'], correct: true, confidence: 'guess' },
  ];

  it('computes score, percentage and lucky guesses', () => {
    const summary = summarizeSession(questions, answers, TOPICS);
    expect(summary).toMatchObject({ total: 3, correct: 2, percentage: 67, luckyGuesses: 1 });
  });

  it('groups by topic in catalog order and skips topics without questions', () => {
    const summary = summarizeSession(questions, answers, TOPICS);
    expect(summary.byTopic).toEqual([
      { slug: 'fundamentos', name: 'Fundamentos', correct: 1, total: 2 },
      { slug: 'semantica', name: 'Semantica', correct: 1, total: 1 },
    ]);
  });

  it('lists wrong answers and lucky guesses for review', () => {
    expect(summarizeSession(questions, answers, TOPICS).missedIds).toEqual(['q2', 'q3']);
  });
});
