import type { ProgressState, QuestionProgress } from '@/core/interfaces/progress.interface';
import { progressOverview } from './progress-overview';

const entry = (overrides: Partial<QuestionProgress>): QuestionProgress => ({
  tech: 'html',
  topic: 'fundamentos',
  attempts: 1,
  correctCount: 1,
  lastCorrect: true,
  lastConfidence: 'sure',
  box: 2,
  lastAnsweredAt: 0,
  nextReviewAt: 1000,
  ...overrides,
});

describe('progressOverview', () => {
  it('counts answered, mastered, due and sessions', () => {
    const state: ProgressState = {
      version: 1,
      questions: {
        a: entry({}),
        b: entry({ lastConfidence: 'guess', nextReviewAt: 10 }),
        c: entry({ lastCorrect: false, nextReviewAt: 20 }),
      },
      sessions: [{ tech: 'html', total: 3, correct: 1, finishedAt: 0 }],
    };
    expect(progressOverview(state, 100)).toEqual({ answered: 3, mastered: 1, due: 2, sessions: 1 });
  });
});
