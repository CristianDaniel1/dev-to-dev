import type { OptionState } from '@/features/quizzes';

/**
 * Works out how a sample question option should look.
 *
 * @param optionId - Option to style.
 * @param correctId - Id of the right option.
 * @param selectedId - Id the user picked, or `null` before answering.
 * @returns The visual state, using the same states as the real quiz.
 */
export const demoOptionState = (
  optionId: string,
  correctId: string,
  selectedId: string | null,
): OptionState => {
  if (selectedId === null) return 'idle';
  if (optionId === correctId) return 'correct';
  return optionId === selectedId ? 'wrong' : 'dimmed';
};
