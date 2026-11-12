import type { ProgressState, QuestionProgress } from '../interfaces/progress.interface';

/**
 * Checks whether a value read from storage has the progress shape.
 *
 * @param value - Parsed stored value.
 * @returns True when it is a version 1 progress state.
 */
export const isProgressState = (value: unknown): value is ProgressState => {
  if (typeof value !== 'object' || !value) return false;
  const candidate = value as Partial<ProgressState>;
  return (
    candidate.version === 1 &&
    typeof candidate.questions === 'object' &&
    !!candidate.questions &&
    Array.isArray(candidate.sessions)
  );
};

/**
 * Tells whether a question counts as mastered.
 *
 * @param progress - Progress of the question.
 * @returns True when the last answer was right and not a guess.
 */
export const isMastered = (progress: QuestionProgress): boolean =>
  progress.lastCorrect && progress.lastConfidence !== 'guess';
