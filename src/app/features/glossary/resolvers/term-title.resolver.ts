import type { ResolveFn } from '@angular/router';
import { findTerm } from '../lib/find-term';

/**
 * Resolves the page title of a glossary term.
 *
 * @param route - Route with the `termo` param.
 * @returns "<term>: o que é", or a not-found title.
 */
export const termTitleResolver: ResolveFn<string> = (route) => {
  const term = findTerm(route.paramMap.get('termo'));
  return term ? `${term.term}: o que é` : 'Termo não encontrado';
};
