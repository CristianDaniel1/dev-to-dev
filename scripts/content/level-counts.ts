import type { LevelCounts, Question } from '../../src/app/shared/interfaces/content.interface';

/**
 * Counts questions per difficulty level.
 *
 * @param questions - Questions to count.
 * @returns The count of each level.
 */
export const countLevels = (questions: readonly Question[]): LevelCounts => {
  const counts: LevelCounts = { beginner: 0, intermediate: 0, advanced: 0 };
  for (const question of questions) counts[question.level]++;
  return counts;
};
