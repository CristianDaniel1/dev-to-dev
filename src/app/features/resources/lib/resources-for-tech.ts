import type { Resource } from '@/shared/interfaces/resource.interface';
import { sortResources } from './sort-resources';

/**
 * Picks the resources tagged with a tech, featured first.
 *
 * @param resources - Every resource.
 * @param tech - Tech slug, e.g. 'css'.
 * @param limit - Maximum number of resources.
 * @returns Up to `limit` resources.
 */
export const resourcesForTech = (
  resources: readonly Resource[],
  tech: string,
  limit: number,
): Resource[] =>
  sortResources(
    resources.filter((resource) => resource.techs.some((tag) => tag === tech)),
    'curated',
  ).slice(0, limit);
