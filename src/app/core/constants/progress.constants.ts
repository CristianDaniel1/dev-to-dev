import type { ProgressState } from '../interfaces/progress.interface';

/** Highest Leitner box; a question there is considered mastered. */
export const MAX_LEITNER_BOX = 5;

/** Days until the next review for each Leitner box (index = box; box 0 = never answered). */
export const REVIEW_INTERVAL_DAYS: readonly number[] = [0, 1, 3, 7, 14, 30];

/** One day, in milliseconds. */
export const DAY_MS = 24 * 60 * 60 * 1000;

/** Maximum number of finished sessions kept in history. */
export const MAX_SESSION_HISTORY = 50;

/** Progress of a user who has never answered anything. */
export const EMPTY_PROGRESS_STATE: ProgressState = { version: 1, questions: {}, sessions: [] };
