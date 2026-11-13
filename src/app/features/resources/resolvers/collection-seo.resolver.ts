import type { ResolveFn } from '@angular/router';
import type { RouteSeo } from '@/core/interfaces/route-seo.interface';
import { RESOURCE_LIBRARY } from '@/shared/generated/resource-library';
import { collectionEntries } from '../lib/collection-entries';
import { resourceListJsonLd } from '../lib/resource-list-json-ld';

/**
 * Resolves the SEO data of a collection.
 *
 * @param route - Route with the `colecao` param.
 * @returns The collection description and its resources as structured data, or `noIndex` for
 *   unknown collections.
 */
export const collectionSeoResolver: ResolveFn<RouteSeo> = (route) => {
  const slug = route.paramMap.get('colecao');
  const collection = RESOURCE_LIBRARY.collections.find((candidate) => candidate.slug === slug);
  if (!collection) return { noIndex: true };
  const resources = collectionEntries(collection, RESOURCE_LIBRARY.resources).map(
    (entry) => entry.resource,
  );
  const page = {
    name: collection.name,
    description: collection.description,
    path: `/recursos/colecoes/${collection.slug}`,
  };
  return { description: collection.description, jsonLd: resourceListJsonLd(page, resources) };
};
