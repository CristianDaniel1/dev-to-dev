import { MAX_LEITNER_BOX, REVIEW_INTERVAL_DAYS } from '@/core/constants/progress.constants';
import type { QuestionProgress } from '@/core/interfaces/progress.interface';
import type { LeitnerBoxView } from '../interfaces/leitner-box.interface';

/**
 * Describes boxes 1 to 5 with their review interval and, optionally, how many questions each
 * one holds.
 *
 * @param questions - Progress by question id, or `null` to leave the counts out.
 * @returns One entry per box.
 */
export const leitnerBoxes = (
  questions: Readonly<Record<string, QuestionProgress>> | null,
): LeitnerBoxView[] => {
  const entries = questions ? Object.values(questions) : [];
  return Array.from({ length: MAX_LEITNER_BOX }, (_, index) => {
    const box = index + 1;
    return {
      box,
      days: REVIEW_INTERVAL_DAYS[box] ?? 0,
      count: questions ? entries.filter((entry) => entry.box === box).length : null,
    };
  });
};
