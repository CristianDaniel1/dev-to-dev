import type { ResolveFn } from '@angular/router';
import type { RouteSeo } from '@/core/interfaces/route-seo.interface';
import { findCategory } from '../lib/find-category';
import { resourceCountLabel } from '../lib/resource-count-label';

/**
 * Resolves the SEO data of a resource category.
 *
 * @param route - Route with the `categoria` param.
 * @returns A description with the resource count, or `noIndex` for unknown categories.
 */
export const categorySeoResolver: ResolveFn<RouteSeo> = (route) => {
  const category = findCategory(route.paramMap.get('categoria'));
  if (!category) return { noIndex: true };
  return {
    description: `${category.description} ${resourceCountLabel(category.resourceCount)} selecionados, cada um com o motivo da recomendação.`,
  };
};
