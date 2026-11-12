import type { Level, TechSummary } from '@/shared/interfaces/content.interface';

/**
 * Counts the questions of a tech that match the chosen topics and level.
 *
 * @param tech - Tech summary from the catalog.
 * @param topics - Selected topic slugs; empty means every topic.
 * @param level - Selected level, or `null` for every level.
 * @returns How many questions match.
 */
export const countAvailable = (
  tech: TechSummary,
  topics: readonly string[],
  level: Level | null,
): number =>
  tech.topics
    .filter((topic) => !topics.length || topics.includes(topic.slug))
    .reduce((sum, topic) => sum + (level ? topic.levelCounts[level] : topic.questionCount), 0);
