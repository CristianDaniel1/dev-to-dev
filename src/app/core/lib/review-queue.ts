import type { QuestionProgress } from '../interfaces/progress.interface';

/** A question waiting for review, with its id. */
export interface DueEntry extends QuestionProgress {
  id: string;
}

/**
 * Lists the questions whose review time has come, the most overdue first.
 *
 * @param questions - Progress by question id.
 * @param now - Current time, in milliseconds.
 * @returns The due questions.
 */
export const dueQuestions = (
  questions: Readonly<Record<string, QuestionProgress>>,
  now: number,
): DueEntry[] =>
  Object.entries(questions)
    .filter(([, progress]) => progress.nextReviewAt <= now)
    .map(([id, progress]) => ({ ...progress, id }))
    .sort((left, right) => left.nextReviewAt - right.nextReviewAt);

/**
 * Finds when the next question becomes due, among those not due yet.
 *
 * @param questions - Progress by question id.
 * @param now - Current time, in milliseconds.
 * @returns The earliest future review time, or `null` when nothing is scheduled.
 */
export const nextReviewTime = (
  questions: Readonly<Record<string, QuestionProgress>>,
  now: number,
): number | null => {
  const upcoming = Object.values(questions)
    .map((progress) => progress.nextReviewAt)
    .filter((time) => time > now);
  return upcoming.length ? Math.min(...upcoming) : null;
};
