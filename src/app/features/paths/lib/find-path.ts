import { LEARNING_PATHS } from '@/shared/generated/paths';
import type { LearningPath } from '@/shared/interfaces/path.interface';

/**
 * Finds a learning path.
 *
 * @param slug - Path slug from the URL.
 * @returns The path, or `undefined` when the slug is unknown.
 */
export const findPath = (slug: string | null | undefined): LearningPath | undefined =>
  LEARNING_PATHS.find((path) => path.slug === slug);
