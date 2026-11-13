import { LEARNING_PATHS } from '@/shared/generated/paths';

/**
 * Lists the `trilha` route param of every learning path, for prerendering.
 *
 * @returns One params object per path.
 */
export const pathPrerenderParams = async (): Promise<Record<string, string>[]> =>
  LEARNING_PATHS.map((path) => ({ trilha: path.slug }));
