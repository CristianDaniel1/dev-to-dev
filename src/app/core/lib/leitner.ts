import { DAY_MS, MAX_LEITNER_BOX, REVIEW_INTERVAL_DAYS } from '../constants/progress.constants';
import type { Confidence } from '../interfaces/progress.interface';

/**
 * Computes the next Leitner box after an answer: wrong answers and lucky guesses go back to
 * box 1, unsure right answers stay, confident right answers move up.
 *
 * @param box - Current box (0 when never answered).
 * @param correct - Whether the answer was right.
 * @param confidence - How sure the user was.
 * @returns The new box, from 1 to the maximum.
 */
export const nextBox = (box: number, correct: boolean, confidence: Confidence): number => {
  if (!correct || confidence === 'guess') return 1;
  if (confidence === 'unsure') return Math.max(box, 1);
  return Math.min(box + 1, MAX_LEITNER_BOX);
};

/**
 * Computes when a question in a box should be reviewed again.
 *
 * @param box - Leitner box of the question.
 * @param now - Current time, in milliseconds.
 * @returns The review time, in milliseconds.
 */
export const nextReviewAt = (box: number, now: number): number => {
  const days = REVIEW_INTERVAL_DAYS[Math.min(Math.max(box, 0), MAX_LEITNER_BOX)] ?? 0;
  return now + days * DAY_MS;
};
