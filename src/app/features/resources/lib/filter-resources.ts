import type { Resource } from '@/shared/interfaces/resource.interface';
import type { ResourceFilters } from '../interfaces/resource-filters.interface';
import { normalizeText } from '@/shared/lib/normalize-text';

const searchableText = (resource: Resource): string =>
  normalizeText(
    [resource.name, resource.domain, resource.description, resource.why, ...resource.techs].join(
      ' ',
    ),
  );

const matchesQuery = (resource: Resource, query: string): boolean => {
  const text = searchableText(resource);
  return normalizeText(query)
    .split(/\s+/)
    .every((word) => text.includes(word));
};

/**
 * Keeps the resources that pass every filter. The search matches every word of the query in
 * the name, domain, description, reason or techs, ignoring case and accents.
 *
 * @param resources - Resources to filter.
 * @param filters - Filters chosen by the user (the order is ignored here).
 * @param favoriteIds - Ids saved as favorites.
 * @returns The matching resources, in their original order.
 */
export const filterResources = (
  resources: readonly Resource[],
  filters: ResourceFilters,
  favoriteIds: ReadonlySet<string>,
): Resource[] =>
  resources.filter(
    (resource) =>
      (!filters.type || resource.type === filters.type) &&
      (!filters.pricing || resource.pricing === filters.pricing) &&
      (!filters.language || resource.languages.includes(filters.language)) &&
      (!filters.tech || resource.techs.includes(filters.tech)) &&
      (!filters.onlyFavorites || favoriteIds.has(resource.id)) &&
      (!filters.query || matchesQuery(resource, filters.query)),
  );
