import type { QuestionProgress } from '../interfaces/progress.interface';
import { dueQuestions, nextReviewTime } from './review-queue';

const entry = (nextReviewAt: number): QuestionProgress => ({
  tech: 'html',
  topic: 'fundamentos',
  attempts: 1,
  correctCount: 0,
  lastCorrect: false,
  lastConfidence: 'sure',
  box: 1,
  lastAnsweredAt: 0,
  nextReviewAt,
});

describe('review queue', () => {
  const questions = { late: entry(50), later: entry(10), future: entry(500), soon: entry(200) };

  it('lists due questions, most overdue first', () => {
    expect(dueQuestions(questions, 100).map((due) => due.id)).toEqual(['later', 'late']);
  });

  it('finds the next review time', () => {
    expect(nextReviewTime(questions, 100)).toBe(200);
    expect(nextReviewTime({ late: entry(50) }, 100)).toBeNull();
  });
});
