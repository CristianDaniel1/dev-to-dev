import { RESOURCE_INDEX } from '@/shared/generated/resource-index';
import type { ResourceCategory } from '@/shared/interfaces/resource.interface';

/**
 * Finds a resource category.
 *
 * @param slug - Category slug from the URL.
 * @returns The category, or `undefined` when the slug is unknown.
 */
export const findCategory = (slug: string | null | undefined): ResourceCategory | undefined =>
  RESOURCE_INDEX.categories.find((category) => category.slug === slug);
