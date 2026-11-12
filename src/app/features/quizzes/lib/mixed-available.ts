import type { Level, TechSummary } from '@/shared/interfaces/content.interface';

/**
 * Counts the questions available across several techs for a level.
 *
 * @param techs - Chosen techs.
 * @param level - Chosen level, or `null` for every level.
 * @returns How many questions match.
 */
export const countMixedAvailable = (techs: readonly TechSummary[], level: Level | null): number =>
  techs.reduce((sum, tech) => sum + (level ? tech.levelCounts[level] : tech.questionCount), 0);
