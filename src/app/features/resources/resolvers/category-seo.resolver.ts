import type { ResolveFn } from '@angular/router';
import type { RouteSeo } from '@/core/interfaces/route-seo.interface';
import { RESOURCE_LIBRARY } from '@/shared/generated/resource-library';
import { findCategory } from '../lib/find-category';
import { resourceCountLabel } from '../lib/resource-count-label';
import { resourceListJsonLd } from '../lib/resource-list-json-ld';

/**
 * Resolves the SEO data of a resource category.
 *
 * @param route - Route with the `categoria` param.
 * @returns A description with the resource count and the list as structured data, or `noIndex`
 *   for unknown categories.
 */
export const categorySeoResolver: ResolveFn<RouteSeo> = (route) => {
  const category = findCategory(route.paramMap.get('categoria'));
  if (!category) return { noIndex: true };
  const description = `${category.description} ${resourceCountLabel(category.resourceCount)} selecionados, cada um com o motivo da recomendação.`;
  const resources = RESOURCE_LIBRARY.resources.filter(
    (resource) => resource.category === category.slug,
  );
  const page = { name: category.name, description, path: `/recursos/${category.slug}` };
  return { description, jsonLd: resourceListJsonLd(page, resources) };
};
