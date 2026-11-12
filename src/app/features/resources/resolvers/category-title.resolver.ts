import type { ResolveFn } from '@angular/router';
import { findCategory } from '../lib/find-category';

/**
 * Resolves the page title of a resource category.
 *
 * @param route - Route with the `categoria` param.
 * @returns The category name, or a not-found title.
 */
export const categoryTitleResolver: ResolveFn<string> = (route) =>
  findCategory(route.paramMap.get('categoria'))?.name ?? 'Categoria não encontrada';
