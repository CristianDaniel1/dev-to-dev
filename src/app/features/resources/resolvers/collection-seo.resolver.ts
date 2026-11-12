import type { ResolveFn } from '@angular/router';
import type { RouteSeo } from '@/core/interfaces/route-seo.interface';
import { findCollection } from '../lib/find-collection';

/**
 * Resolves the SEO data of a collection.
 *
 * @param route - Route with the `colecao` param.
 * @returns The collection description, or `noIndex` for unknown collections.
 */
export const collectionSeoResolver: ResolveFn<RouteSeo> = (route) => {
  const collection = findCollection(route.paramMap.get('colecao'));
  return collection ? { description: collection.description } : { noIndex: true };
};
