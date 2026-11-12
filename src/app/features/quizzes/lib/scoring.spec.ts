import type { AnswerRecord } from '../interfaces/scoring.interface';
import type { ScoreGroup } from '../interfaces/session-scope.interface';
import { makeQuestion } from '../testing/question.factory';
import { isAnswerCorrect, needsReview, summarizeSession } from './scoring';

const GROUPS: ScoreGroup[] = [
  { key: 'fundamentos', name: 'Fundamentos', color: '#000000' },
  { key: 'semantica', name: 'Semântica', color: '#000000' },
  { key: 'formularios', name: 'Formulários', color: '#000000' },
];
const BY_TOPIC = (question: { topic: string }) => question.topic;

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
    const summary = summarizeSession(questions, answers, GROUPS, BY_TOPIC);
    expect(summary).toMatchObject({ total: 3, correct: 2, percentage: 67, luckyGuesses: 1 });
  });

  it('groups in the given order and skips empty groups', () => {
    const summary = summarizeSession(questions, answers, GROUPS, BY_TOPIC);
    expect(summary.byGroup).toEqual([
      { key: 'fundamentos', name: 'Fundamentos', color: '#000000', correct: 1, total: 2 },
      { key: 'semantica', name: 'Semântica', color: '#000000', correct: 1, total: 1 },
    ]);
  });

  it('counts unanswered questions as wrong and lists them for review', () => {
    const summary = summarizeSession(questions, answers.slice(0, 1), GROUPS, BY_TOPIC);
    expect(summary).toMatchObject({ total: 3, correct: 1, unanswered: 2 });
    expect(summary.missedIds).toEqual(['q2', 'q3']);
  });

  it('lists wrong answers and lucky guesses for review', () => {
    expect(summarizeSession(questions, answers, GROUPS, BY_TOPIC).missedIds).toEqual(['q2', 'q3']);
  });
});
