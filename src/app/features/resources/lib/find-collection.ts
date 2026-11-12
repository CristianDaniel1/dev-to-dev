import { RESOURCE_INDEX } from '@/shared/generated/resource-index';
import type { CollectionSummary } from '@/shared/interfaces/resource.interface';

/**
 * Finds a collection summary.
 *
 * @param slug - Collection slug from the URL.
 * @returns The collection, or `undefined` when the slug is unknown.
 */
export const findCollection = (slug: string | null | undefined): CollectionSummary | undefined =>
  RESOURCE_INDEX.collections.find((collection) => collection.slug === slug);
