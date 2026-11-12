import { CATALOG } from '../generated/catalog';

/**
 * Lists the `tech` route param of every published tech, for prerendering.
 *
 * @returns One params object per tech.
 */
export const techPrerenderParams = async (): Promise<Record<string, string>[]> =>
  CATALOG.techs.map((tech) => ({ tech: tech.slug }));
