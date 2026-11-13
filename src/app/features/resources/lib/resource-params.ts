import {
  PRICINGS,
  RESOURCE_LANGUAGES,
  RESOURCE_TECHS,
  RESOURCE_TYPES,
} from '@/shared/constants/resource.constants';
import { valueFromParam } from '@/shared/lib/param-value';
import {
  EMPTY_RESOURCE_FILTERS,
  ONLY_FAVORITES_PARAM,
  RESOURCE_SORTS,
} from '../constants/resource-filters.constants';
import {
  LANGUAGE_PARAMS,
  PRICING_PARAMS,
  RESOURCE_TYPE_PARAMS,
  SORT_PARAMS,
} from '../data/resource-params.data';
import type {
  ResourceFilters,
  ResourceQueryInput,
  ResourceQueryParams,
} from '../interfaces/resource-filters.interface';

/**
 * Turns the query params of a resource list page into filters. Unknown values are ignored.
 *
 * @param query - Raw query params from the URL.
 * @returns The filters to apply.
 */
export const toResourceFilters = (query: ResourceQueryInput): ResourceFilters => ({
  query: query.q?.trim() ?? '',
  type: valueFromParam(RESOURCE_TYPES, RESOURCE_TYPE_PARAMS, query.tipo),
  pricing: valueFromParam(PRICINGS, PRICING_PARAMS, query.preco),
  language: valueFromParam(RESOURCE_LANGUAGES, LANGUAGE_PARAMS, query.idioma),
  tech: RESOURCE_TECHS.find((tech) => tech === query.tech) ?? null,
  onlyFavorites: query.favoritos === ONLY_FAVORITES_PARAM,
  sort: valueFromParam(RESOURCE_SORTS, SORT_PARAMS, query.ordem) ?? EMPTY_RESOURCE_FILTERS.sort,
});

/**
 * Turns filters into query params, leaving defaults out so shared links stay short.
 *
 * @param filters - Filters chosen by the user.
 * @returns Query params; `null` values are removed from the URL.
 */
export const toResourceQuery = (filters: ResourceFilters): ResourceQueryParams => ({
  q: filters.query.trim() || null,
  tipo: filters.type ? RESOURCE_TYPE_PARAMS[filters.type] : null,
  preco: filters.pricing ? PRICING_PARAMS[filters.pricing] : null,
  idioma: filters.language ? LANGUAGE_PARAMS[filters.language] : null,
  tech: filters.tech,
  favoritos: filters.onlyFavorites ? ONLY_FAVORITES_PARAM : null,
  ordem: filters.sort === EMPTY_RESOURCE_FILTERS.sort ? null : SORT_PARAMS[filters.sort],
});

/**
 * Counts the filters set besides the search text and the order, for the mobile filter button.
 *
 * @param filters - Current filters.
 * @returns How many of type, pricing, language, tech and favorites are set.
 */
export const countActiveFilters = (filters: ResourceFilters): number =>
  [filters.type, filters.pricing, filters.language, filters.tech, filters.onlyFavorites].filter(
    Boolean,
  ).length;

/**
 * Tells whether any filter narrows the list (the order does not count).
 *
 * @param filters - Current filters.
 * @returns True when at least one filter is set.
 */
export const hasActiveFilters = (filters: ResourceFilters): boolean =>
  Boolean(
    filters.query ||
    filters.type ||
    filters.pricing ||
    filters.language ||
    filters.tech ||
    filters.onlyFavorites,
  );
