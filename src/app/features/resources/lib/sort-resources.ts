import type { Resource } from '@/shared/interfaces/resource.interface';
import type { ResourceSort } from '../interfaces/resource-filters.interface';

const byName = (left: Resource, right: Resource): number =>
  left.name.localeCompare(right.name, 'pt-BR', { sensitivity: 'base' });

const featuredFirst = (left: Resource, right: Resource): number =>
  Number(right.featured) - Number(left.featured);

/**
 * Orders resources without changing the input. The curated order puts featured resources first
 * and keeps the authored order otherwise.
 *
 * @param resources - Resources to order.
 * @param sort - Chosen order.
 * @returns A new, ordered array.
 */
export const sortResources = (resources: readonly Resource[], sort: ResourceSort): Resource[] =>
  [...resources].sort(sort === 'name' ? byName : featuredFirst);
