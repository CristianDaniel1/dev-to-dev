import type { ResolveFn } from '@angular/router';
import { findCollection } from '../lib/find-collection';

/**
 * Resolves the page title of a collection.
 *
 * @param route - Route with the `colecao` param.
 * @returns The collection name, or a not-found title.
 */
export const collectionTitleResolver: ResolveFn<string> = (route) =>
  findCollection(route.paramMap.get('colecao'))?.name ?? 'Coleção não encontrada';
