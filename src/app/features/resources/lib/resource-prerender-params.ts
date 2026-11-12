import { RESOURCE_INDEX } from '@/shared/generated/resource-index';

/**
 * Lists the `categoria` route param of every category, for prerendering.
 *
 * @returns One params object per category.
 */
export const categoryPrerenderParams = async (): Promise<Record<string, string>[]> =>
  RESOURCE_INDEX.categories.map((category) => ({ categoria: category.slug }));

/**
 * Lists the `colecao` route param of every collection, for prerendering.
 *
 * @returns One params object per collection.
 */
export const collectionPrerenderParams = async (): Promise<Record<string, string>[]> =>
  RESOURCE_INDEX.collections.map((collection) => ({ colecao: collection.slug }));
