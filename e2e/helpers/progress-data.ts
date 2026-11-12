import type { Page } from '@playwright/test';
import {
  KNOWN_QUESTIONS_TECH,
  KNOWN_QUESTIONS_TOPIC,
  PROGRESS_STORAGE_KEY,
} from '../constants/e2e.constants';

/** One day, in milliseconds. */
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Builds a stored progress where each question was missed yesterday, so it is due for review.
 *
 * @param questionIds - Ids of known questions.
 * @returns A progress state in the app's storage format.
 */
export const dueProgress = (questionIds: readonly string[]): object => {
  const yesterday = Date.now() - DAY_MS;
  return {
    version: 1,
    questions: Object.fromEntries(
      questionIds.map((id) => [
        id,
        {
          tech: KNOWN_QUESTIONS_TECH,
          topic: KNOWN_QUESTIONS_TOPIC,
          attempts: 1,
          correctCount: 0,
          lastCorrect: false,
          lastConfidence: 'sure',
          box: 1,
          lastAnsweredAt: yesterday,
          nextReviewAt: yesterday,
        },
      ]),
    ),
    sessions: [
      { tech: KNOWN_QUESTIONS_TECH, kind: 'practice', total: 2, correct: 0, finishedAt: yesterday },
    ],
  };
};

/**
 * Stores a progress before the app loads, as if the user had practiced before.
 *
 * @param page - Page that will open the app.
 * @param state - Progress in the app's storage format.
 */
export const seedProgress = async (page: Page, state: object): Promise<void> => {
  await page.addInitScript(
    ([key, value]) => {
      if (!sessionStorage.getItem('e2e:seeded')) {
        localStorage.setItem(key, value);
        sessionStorage.setItem('e2e:seeded', '1');
      }
    },
    [PROGRESS_STORAGE_KEY, JSON.stringify(state)] as const,
  );
};
