import type { ProgressState } from '@/core/interfaces/progress.interface';
import { isMastered } from '@/core/lib/progress';
import { dueQuestions } from '@/core/lib/review-queue';
import type { ProgressOverview } from '../interfaces/progress-overview.interface';

/**
 * Computes the headline numbers of the progress page.
 *
 * @param state - The user's progress.
 * @param now - Current time, in milliseconds.
 * @returns Answered, mastered and due questions, and the number of sessions.
 */
export const progressOverview = (state: ProgressState, now: number): ProgressOverview => {
  const entries = Object.values(state.questions);
  return {
    answered: entries.length,
    mastered: entries.filter(isMastered).length,
    due: dueQuestions(state.questions, now).length,
    sessions: state.sessions.length,
  };
};
