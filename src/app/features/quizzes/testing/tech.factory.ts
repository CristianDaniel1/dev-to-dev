import type { LevelCounts, TechSummary, TopicSummary } from '@/shared/interfaces/content.interface';

/**
 * Builds a topic summary for tests.
 *
 * @param slug - Topic slug.
 * @param levelCounts - Questions per level.
 * @returns The topic summary.
 */
export const makeTopic = (slug: string, levelCounts: LevelCounts): TopicSummary => ({
  slug,
  name: slug.charAt(0).toUpperCase() + slug.slice(1),
  description: '',
  questionCount: levelCounts.beginner + levelCounts.intermediate + levelCounts.advanced,
  levelCounts,
});

/**
 * Builds a tech summary for tests; counts are derived from the topics.
 *
 * @param topics - Topics of the tech.
 * @returns The tech summary.
 */
export const makeTech = (topics: TopicSummary[]): TechSummary => ({
  slug: 'html',
  name: 'HTML',
  description: '',
  area: 'frontend',
  badge: 'HTML',
  color: '#c4401c',
  onColor: '#ffffff',
  questionCount: topics.reduce((sum, topic) => sum + topic.questionCount, 0),
  levelCounts: {
    beginner: topics.reduce((sum, topic) => sum + topic.levelCounts.beginner, 0),
    intermediate: topics.reduce((sum, topic) => sum + topic.levelCounts.intermediate, 0),
    advanced: topics.reduce((sum, topic) => sum + topic.levelCounts.advanced, 0),
  },
  topics,
});
