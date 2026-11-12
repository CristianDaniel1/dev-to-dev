import type {
  Pricing,
  ResourceLanguage,
  ResourceTech,
  ResourceType,
} from '@/shared/interfaces/resource.interface';
import type { RESOURCE_SORTS } from '../constants/resource-filters.constants';

export type ResourceSort = (typeof RESOURCE_SORTS)[number];

/** Filters of the resource list; `null` means "any". */
export interface ResourceFilters {
  query: string;
  type: ResourceType | null;
  pricing: Pricing | null;
  language: ResourceLanguage | null;
  tech: ResourceTech | null;
  onlyFavorites: boolean;
  sort: ResourceSort;
}

/** Raw query params of a resource list page, as read from the URL. */
export interface ResourceQueryInput {
  q?: string | null;
  tipo?: string | null;
  preco?: string | null;
  idioma?: string | null;
  tech?: string | null;
  favoritos?: string | null;
  ordem?: string | null;
}

/** Query params written to the URL; `null` values are left out. */
export type ResourceQueryParams = Required<{
  [Key in keyof ResourceQueryInput]: string | null;
}>;
