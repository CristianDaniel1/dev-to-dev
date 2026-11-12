import type { ResourceFilters } from '../interfaces/resource-filters.interface';

/** Orders of the resource list: curated (featured first, then authored order) or by name. */
export const RESOURCE_SORTS = ['curated', 'name'] as const;

/** Filters with nothing selected: every resource in curated order. */
export const EMPTY_RESOURCE_FILTERS: ResourceFilters = {
  query: '',
  type: null,
  pricing: null,
  language: null,
  tech: null,
  onlyFavorites: false,
  sort: 'curated',
};

/** Query value that turns the favorites filter on. */
export const ONLY_FAVORITES_PARAM = '1';
